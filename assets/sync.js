/* Optional accounts: sign-in, progress sync across devices, Pro and organizations.
   Everything here is inert unless site.config.json sets "apiOrigin"; the site then keeps
   working exactly as before for anyone who never signs in. */
(function () {
  const { U, store, ui } = CertHub;
  const { $, esc } = U;
  const API = (CertHub.site && CertHub.site.apiUrl) || "";

  /* ---------- merge rules (pure; also used by tests) ---------- */
  const isObj = v => v && typeof v === "object" && !Array.isArray(v);
  function mergePlan(local, server) {
    const a = isObj(local) ? local : {}, b = isObj(server) ? server : {};
    const out = { ...b, ...a };
    // Checked study days: once checked on any device, stay checked.
    out.checks = { ...(b.checks || {}), ...(a.checks || {}) };
    for (const k of Object.keys(out.checks)) out.checks[k] = !!((a.checks || {})[k] || (b.checks || {})[k]);
    // Lessons marked read: once read on any device, stay read.
    out.read = { ...(b.read || {}), ...(a.read || {}) };
    for (const k of Object.keys(out.read)) out.read[k] = !!((a.read || {})[k] || (b.read || {})[k]);
    // Quiz stats per domain: keep whichever device has answered more.
    out.stats = {};
    for (const d of new Set([...Object.keys(a.stats || {}), ...Object.keys(b.stats || {})])) {
      const x = (a.stats || {})[d], y = (b.stats || {})[d];
      out.stats[d] = !x ? y : !y ? x : (y.t > x.t ? y : x);
    }
    // Accuracy by exam objective (Pro score report): same rule as the domain stats.
    out.objs = {};
    for (const o of new Set([...Object.keys(a.objs || {}), ...Object.keys(b.objs || {})])) {
      const x = (a.objs || {})[o], y = (b.objs || {})[o];
      out.objs[o] = !x ? y : !y ? x : (y.t > x.t ? y : x);
    }
    // Review queue and flashcard schedule: per item, keep the entry that's due later (further along).
    const later = (x, y) => { const o = { ...(y || {}) }; for (const [k, r] of Object.entries(x || {})) { const s = o[k]; o[k] = !s || (r.due || 0) >= (s.due || 0) ? r : s; } return o; };
    out.review = later(a.review, b.review);
    out.cards = later(a.cards, b.cards);
    // History: union by time, newest 60.
    const seen = new Set();
    out.history = [...(a.history || []), ...(b.history || [])].filter(h => h && !seen.has(h.at + "|" + h.title) && seen.add(h.at + "|" + h.title)).sort((x, y) => y.at - x.at).slice(0, 60);
    out.start = a.start || b.start || null;
    out.examDate = a.examDate || b.examDate || null;
    return out;
  }
  function mergeLabs(local, server) {
    const a = isObj(local) ? local : {}, b = isObj(server) ? server : {};
    const out = {};
    for (const id of new Set([...Object.keys(a), ...Object.keys(b)])) {
      const x = a[id] || {}, y = b[id] || {};
      const union = k => { const o = { ...(y[k] || {}), ...(x[k] || {}) }; for (const i of Object.keys(o)) o[i] = !!((x[k] || {})[i] || (y[k] || {})[i]); return o; };
      const m = { ...y, ...x, steps: union("steps"), verify: union("verify") };
      const starts = [x.started, y.started].filter(Boolean), dones = [x.done, y.done].filter(Boolean);
      if (starts.length) m.started = Math.min(...starts);
      if (dones.length) m.done = Math.min(...dones); else delete m.done;
      // Notes: the most recently edited copy wins; with no timestamps, keep both texts.
      const xn = x.notes || "", yn = y.notes || "";
      if (xn !== yn) {
        if (x.notesAt && y.notesAt) { m.notes = x.notesAt >= y.notesAt ? xn : yn; m.notesAt = Math.max(x.notesAt, y.notesAt); }
        else if (x.notesAt || y.notesAt) { m.notes = x.notesAt ? xn : yn; m.notesAt = x.notesAt || y.notesAt; }
        else m.notes = !yn || xn.includes(yn) ? xn : !xn || yn.includes(xn) ? yn : `${xn}\n\n--- From another device ---\n${yn}`;
      }
      out[id] = m;
    }
    return out;
  }
  const mergeDoc = (docKey, local, server) => docKey === "labs" ? mergeLabs(local, server) : mergePlan(local, server);

  /* ---------- API client ---------- */
  async function api(method, path, body) {
    const res = await fetch(API + path, {
      method, credentials: "include", cache: "no-store",
      headers: body !== undefined ? { "Content-Type": "application/json" } : {},
      body: body !== undefined ? JSON.stringify(body) : undefined
    });
    let data = {};
    try { data = await res.json(); } catch (e) {}
    if (!res.ok && res.status !== 409) { const err = new Error(data.message || "Something went wrong. Try again."); err.status = res.status; err.code = data.error; throw err; }
    return { status: res.status, data };
  }

  /* ---------- sync engine ---------- */
  const STATE_KEY = "certhub:sync";
  const state = () => { try { return JSON.parse(store.get(STATE_KEY) || "{}"); } catch (e) { return {}; } };
  const saveState = s => store.set(STATE_KEY, JSON.stringify(s));
  const docKeyFor = storageKey => storageKey === "certhub:v1:labs" ? "labs" : storageKey.replace(/^certhub:v1:/, "cert:");
  const storageKeyFor = docKey => docKey === "labs" ? "certhub:v1:labs" : "certhub:v1:" + docKey.slice(5);
  const localDocs = () => store.keys().filter(k => /^certhub:v1:[a-z0-9-]{1,40}$/.test(k));
  const readLocal = k => { try { return JSON.parse(store.get(k) || "null"); } catch (e) { return null; } };

  let me = null, syncing = false, pushTimer = null, lastError = "";
  // Other modules (Pro) listen for "certhub:me" to react to sign-in, sign-out and plan changes.
  const setMe = v => { me = v; document.dispatchEvent(new Event("certhub:me")); };
  const pending = new Set();

  async function refreshMe() {
    if (!API) return null;
    try { setMe((await api("GET", "/v1/me")).data); } catch (e) { setMe(null); }
    return me;
  }
  const signedIn = () => !!(me && me.user);

  async function put(docKey, body, baseVersion, tries = 2) {
    const r = await api("PUT", `/v1/progress/${docKey}`, { baseVersion, body });
    if (r.status === 409 && tries > 0) {
      const merged = mergeDoc(docKey, body, r.data.body);
      store.set(storageKeyFor(docKey), JSON.stringify(merged));
      return put(docKey, merged, r.data.version, tries - 1);
    }
    if (r.status === 409) throw new Error("Progress kept changing on another device. It will sync on the next try.");
    return r.data.version;
  }

  async function syncAll() {
    if (!API || !signedIn() || syncing) return;
    if (CertHub.certView && CertHub.certView.busy) { setTimeout(syncAll, 15000); return; } // finish the quiz first
    syncing = true; lastError = ""; renderStatus();
    let changedLocally = false;
    try {
      const st = state(); st.versions = st.versions || {};
      const server = Object.fromEntries(((await api("GET", "/v1/progress")).data.docs || []).map(d => [d.key, d]));
      const keys = new Set([...localDocs().map(docKeyFor), ...Object.keys(server)]);
      for (const k of keys) {
        const sk = storageKeyFor(k), local = readLocal(sk), s = server[k];
        if (!s) { if (local) st.versions[k] = await put(k, local, 0); continue; }
        if (!local) { store.set(sk, JSON.stringify(s.body)); st.versions[k] = s.version; changedLocally = true; continue; }
        const merged = mergeDoc(k, local, s.body);
        if (JSON.stringify(merged) !== JSON.stringify(local)) { store.set(sk, JSON.stringify(merged)); changedLocally = true; }
        st.versions[k] = JSON.stringify(merged) !== JSON.stringify(s.body) ? await put(k, merged, s.version) : s.version;
      }
      st.lastSync = Date.now(); st.email = me.user.email;
      saveState(st);
      if (changedLocally) { if (CertHub.certView && CertHub.certView.reload) CertHub.certView.reload(); }
    } catch (e) { lastError = e.message; }
    syncing = false; renderStatus();
    if (changedLocally && location.hash.replace("#", "").match(/^(labs|lab-|portfolio|home|$)/)) CertHub.rerender();
  }

  async function pushPending() {
    if (!signedIn() || syncing || !pending.size) return;
    if (CertHub.certView && CertHub.certView.busy) { pushTimer = setTimeout(pushPending, 10000); return; }
    const st = state(); st.versions = st.versions || {};
    for (const sk of [...pending]) {
      pending.delete(sk);
      const k = docKeyFor(sk), body = readLocal(sk);
      if (!body) continue;
      try { st.versions[k] = await put(k, body, st.versions[k] || 0); } catch (e) { lastError = e.message; pending.add(sk); }
    }
    st.lastSync = Date.now(); saveState(st); renderStatus();
  }

  CertHub.sync = {
    mergePlan, mergeLabs, mergeDoc,
    changed(storageKey) {
      if (!API || !signedIn() || !/^certhub:v1:/.test(storageKey)) return;
      pending.add(storageKey);
      clearTimeout(pushTimer); pushTimer = setTimeout(pushPending, 2500);
    },
    syncAll, refreshMe, get me() { return me; }, get enabled() { return !!API; }
  };

  /* ---------- account page ---------- */
  function renderStatus() {
    const el = document.getElementById("syncstatus"); if (!el) return;
    const st = state();
    el.textContent = syncing ? "Syncing…" : lastError ? `Not synced: ${lastError}` : st.lastSync ? `Synced ${new Date(st.lastSync).toLocaleString()}` : "Not synced yet";
  }
  const PLAN = { free: "Free", pro: "Pro", org: "Organization" };
  const PRICE = (CertHub.site && CertHub.site.pro) || {};
  // What Pro adds. Everything else on the site stays free.
  const proPitch = () => `<p style="margin:0">Everything on the site stays free. Pro adds:</p><ul class="clean">
      <li>About 300 extra practice questions per certification, with explanations</li>
      <li>Full-length timed exams at the real exam's length, with a pass estimate</li>
      <li>A score report: weakest domains and objectives, trend and exam readiness</li>
      <li>Flashcards with spaced repetition, and printable study guides</li>
      <li>Capstone projects with grading rubrics for your portfolio</li></ul>`;

  function accountView() {
    if (!API) return `<h1>Account</h1><div class="status">Accounts aren't available on this site yet. Everything still works without one: your progress is saved on this device.</div>`;
    if (!signedIn()) {
      return `<h1>Sign in</h1>
      <p class="meta">An account is optional. It syncs your progress, lab notes and portfolio across your phone and computer. Without one, everything stays on this device.</p>
      <form id="signin-form" class="panel" novalidate>
        <label for="signin-email"><strong>Email</strong></label>
        <input type="email" id="signin-email" autocomplete="email" required placeholder="you@example.com" class="textin">
        <div class="btns"><button type="submit" class="btn">Email me a sign-in link</button></div>
        <p class="note" id="signin-msg" role="status"></p>
      </form>
      <p class="note">No password. We email a link that signs you in once and expires in 15 minutes. Accounts are for ages 13 and up. See the <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
      ${me && me.billing ? `<h2>Pro</h2><div class="panel">${proPitch()}<p class="note" style="margin:0">${PRICE.monthly ? `${esc(PRICE.monthly)} a month or ${esc(PRICE.yearly)} a year. ` : ""}Sign in first, then upgrade from this page.</p></div>` : ""}`;
    }
    const u = me.user, plan = me.plan || "free";
    const orgs = me.orgs || [];
    return `<h1>Account</h1>
    <div class="panel">
      <div class="row"><div class="grow"><strong>${esc(u.email)}</strong><br><span class="note">Plan: ${esc(PLAN[plan] || plan)}</span></div><button type="button" class="btn ghost sm" data-aact="signout">Sign out</button></div>
      <div class="row"><div class="grow"><strong>Sync</strong><br><span class="note" id="syncstatus"></span></div><button type="button" class="btn sm" data-aact="sync">Sync now</button></div>
    </div>
    ${plan === "org" ? `<h2>Pro</h2><div class="panel"><p style="margin:0">Your organization's plan includes every Pro feature.</p></div>` : me.billing ? `<h2>Pro</h2><div class="panel">${plan === "pro"
      ? `<p style="margin:0">You have Pro. Thanks for supporting the site. Manage or cancel your plan any time.</p><div class="btns"><button type="button" class="btn ghost" data-aact="portal">Manage billing</button></div>`
      : `${proPitch()}<div class="btns"><button type="button" class="btn" data-aact="upgrade" data-interval="month">${PRICE.monthly ? `${esc(PRICE.monthly)} a month` : "Upgrade monthly"}</button><button type="button" class="btn ghost" data-aact="upgrade" data-interval="year">${PRICE.yearly ? `${esc(PRICE.yearly)} a year` : "Upgrade yearly"}</button></div><p class="note" style="margin:0">Cancel any time from Manage billing. 7-day refund on your first payment. Payments are handled by Stripe.</p>`}</div>` : ""}
    <h2>Organizations</h2>
    <div class="panel">${orgs.length ? orgs.map(o => `<div class="row"><div class="grow"><strong>${esc(o.name)}</strong><br><span class="note">${esc(o.role)}${o.active ? "" : " · no active seats"}</span></div>${o.role !== "learner" ? `<button type="button" class="btn ghost sm" data-aact="manage" data-org="${esc(o.id)}">Manage</button>` : ""}</div>`).join("") : `<p class="note" style="margin:0">You're not in an organization. If your school or employer gave you an invite link, open it and you'll join automatically.</p>`}
      <details class="sq"><summary>Create an organization (for instructors)</summary>
        <form id="org-form"><input type="text" id="org-name" maxlength="80" placeholder="e.g. UTD Cybersecurity Bootcamp" class="textin" required><div class="btns"><button type="submit" class="btn sm">Create</button></div></form>
      </details>
    </div>
    <div id="orgpanel"></div>
    <h2>Classes</h2>
    <div id="classpanel"><p class="note">Loading…</p></div>
    <h2>Your data</h2>
    <div class="panel">
      <div class="btns" style="margin-top:0"><button type="button" class="btn ghost sm" data-aact="export">Download my account data</button><button type="button" class="btn ghost sm" data-aact="delete">Delete my account</button></div>
      <p class="note" style="margin:0">Deleting your account removes everything stored on the server. Progress on this device stays unless you clear it.</p>
    </div>`;
  }

  async function orgPanel(orgId) {
    const el = document.getElementById("orgpanel"); if (!el) return;
    el.innerHTML = `<p class="note">Loading…</p>`;
    try {
      const { data } = await api("GET", `/v1/orgs/${orgId}/cohorts`);
      const certs = Object.values(CertHub.certs);
      el.innerHTML = `<h2>Cohorts</h2>
      <p class="note">${+data.members} member${data.members === 1 ? "" : "s"} · ${+data.seats} seat${data.seats === 1 ? "" : "s"}</p>
      <div class="panel">${data.cohorts.length ? data.cohorts.map(c => `<div class="row"><div class="grow"><strong>${esc(c.name)}</strong><br><span class="note">${esc((CertHub.certs[c.certId] || {}).short || c.certId)} · ${+c.learners} learner${c.learners === 1 ? "" : "s"}</span></div><a class="btn ghost sm" href="#cohort-${esc(c.id.replace(/^coh_/, ""))}">Progress</a><button type="button" class="btn ghost sm" data-aact="invite" data-org="${esc(orgId)}" data-cohort="${esc(c.id)}">Invite link</button></div>`).join("") : `<p class="note" style="margin:0">No cohorts yet.</p>`}
        <details class="sq"><summary>New cohort</summary>
          <form id="cohort-form" data-org="${esc(orgId)}">
            <input type="text" id="cohort-name" maxlength="80" placeholder="Cohort name" class="textin" required>
            <select id="cohort-cert">${certs.map(c => `<option value="${esc(c.id)}">${esc(c.short)} ${esc(c.exam)}</option>`).join("")}</select>
            <div class="btns"><button type="submit" class="btn sm">Create cohort</button></div>
          </form>
        </details>
      </div>`;
    } catch (e) { el.innerHTML = `<div class="status warn">${esc(e.message)}</div>`; }
  }

  async function cohortView(hexId) {
    const id = "coh_" + hexId;
    $("#app").innerHTML = `<p class="crumbs"><a href="#account">Account</a> / Cohort</p><h1>Cohort progress</h1><p class="note">Loading…</p>`;
    try {
      const { data } = await api("GET", `/v1/cohorts/${id}/summary`);
      const cert = CertHub.certs[data.cohort.certId];
      $("#app").innerHTML = `<p class="crumbs"><a href="#account">Account</a> / Cohort</p>
      <h1>${esc(data.cohort.name)}</h1>
      <p class="meta">${esc(cert ? `${cert.short} ${cert.exam}` : data.cohort.certId)} · ${data.learners.length} learner${data.learners.length === 1 ? "" : "s"}. Shows progress numbers only; learners' lab notes stay private.</p>
      <div class="btns"><button type="button" class="btn ghost sm" data-aact="csv" data-cohort="${esc(id)}">Download CSV</button></div>
      <div class="scroll" tabindex="0" role="region" aria-label="Table (scrolls sideways on small screens)"><table class="sectable"><thead><tr><th>Learner</th><th>Answered</th><th>Accuracy</th><th>Days</th><th>Labs done</th><th>Last test</th><th>Last active</th></tr></thead><tbody>
      ${data.learners.map(l => `<tr><td>${esc(l.email)}</td><td>${+l.answered}</td><td>${l.accuracy == null ? "–" : +l.accuracy + "%"}</td><td>${+l.daysChecked}</td><td>${+l.labsDone}</td><td>${l.lastScore == null ? "–" : +l.lastScore + "%"}</td><td>${l.lastActive ? new Date(l.lastActive).toLocaleDateString() : "–"}</td></tr>`).join("") || `<tr><td colspan="7">No learners yet. Share an invite link.</td></tr>`}
      </tbody></table></div>`;
    } catch (e) { $("#app").innerHTML += `<div class="status warn">${esc(e.message)}</div>`; }
  }

  /* ---------- classes (free): teachers see a progress summary of students who agreed ---------- */
  const CODE_RE = /^[a-km-np-z2-9]{10}$/;
  const certLabel = id => { const c = id && CertHub.certs[id]; return c ? `${c.short} ${c.exam}` : id || ""; };
  const joinLink = code => `${CertHub.BASE || location.origin + "/"}#join-${code}`;
  const certOptions = (sel, blank) => (blank ? `<option value="">${esc(blank)}</option>` : "") + Object.values(CertHub.certs).map(c => `<option value="${esc(c.id)}"${c.id === sel ? " selected" : ""}>${esc(c.short)} ${esc(c.exam)}</option>`).join("");
  const plural = (n, w) => `${+n} ${w}${n === 1 ? "" : "s"}`;
  // What a student shares, shown before they agree (keep in step with api/src/classes.js).
  const SHARED = `<ul class="clean"><li>The name you enter below (and your email only if you tick the box)</li>
    <li>Which certifications you study, and for each: exam readiness, lessons read, best practice exam score, questions answered, hands-on exercises done and when you were last active</li>
    <li>How many labs you've finished</li></ul>
    <p class="note" style="margin:0">Not shared: your answers, review queue, lab notes or write-ups. You can leave the class at any time from the Account page, which stops sharing at once.</p>`;

  async function classPanel() {
    const el = document.getElementById("classpanel"); if (!el) return;
    try {
      const { data } = await api("GET", "/v1/classes");
      el.innerHTML = `<div class="panel">
        <p style="margin:0"><strong>Classes you're in</strong></p>
        ${data.joined.length ? data.joined.map(j => `<div class="row"><div class="grow"><strong>${esc(j.name)}</strong><br><span class="note">Teacher: ${esc(j.teacherName)}${j.certId ? ` · ${esc(certLabel(j.certId))}` : ""} · you appear as ${esc(j.displayName)}${j.showEmail ? " (with your email)" : ""}</span></div><button type="button" class="btn ghost sm" data-aact="leaveclass" data-class="${esc(j.id)}" data-name="${esc(j.name)}">Leave</button></div>`).join("") : `<p class="note" style="margin:0">None. Your teacher shares a join link or code; your progress is shared only after you agree.</p>`}
        <form id="classcode-form" class="row" novalidate>
          <div class="grow"><label for="classcode-in">Class code</label><input type="text" id="classcode-in" class="textin" maxlength="16" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="e.g. k7m2qx9fab"></div>
          <button type="submit" class="btn sm">Join a class</button>
        </form>
      </div>
      <div class="panel">
        <p style="margin:0"><strong>Classes you teach</strong> <span class="note">Free. Up to ${+data.limit}.</span></p>
        ${data.teaching.length ? data.teaching.map(c => `<div class="row"><div class="grow"><strong>${esc(c.name)}</strong><br><span class="note">${c.certId ? `${esc(certLabel(c.certId))} · ` : ""}${plural(c.students, "student")} · code <code>${esc(c.code)}</code></span></div><a class="btn ghost sm" href="#class-${esc(c.id.replace(/^cls_/, ""))}">Roster</a><button type="button" class="btn ghost sm" data-aact="copyjoin" data-code="${esc(c.code)}">Copy join link</button></div>`).join("") : `<p class="note" style="margin:0">Create a class, then share its join link with your students. You'll see a progress summary for each student who agrees.</p>`}
        ${data.teaching.length < data.limit ? `<details class="sq"><summary>Create a class</summary>
          <form id="class-form">
            <label for="class-name">Class name</label><input type="text" id="class-name" class="textin" maxlength="80" required placeholder="e.g. Period 3 Security+">
            <label for="class-teacher">Your name, as students will see it</label><input type="text" id="class-teacher" class="textin" maxlength="60" required placeholder="e.g. Ms. Rivera" autocomplete="name">
            <label for="class-cert">Certification (optional)</label><select id="class-cert" class="textin">${certOptions("", "Any certification")}</select>
            <div class="btns"><button type="submit" class="btn sm">Create class</button></div>
          </form></details>` : ""}
      </div>`;
    } catch (e) { el.innerHTML = `<div class="status warn">${esc(e.message)}</div>`; }
  }

  const JOIN_KEY = "certhub:join";
  async function joinView(code) {
    const shell = body => { $("#app").innerHTML = `<p class="crumbs"><a href="#account">Account</a> / Join a class</p>${body}`; };
    if (!API) return shell(`<h1>Join a class</h1><div class="status">Accounts aren't available on this site, so classes aren't either.</div>`);
    if (!signedIn()) {
      try { sessionStorage.setItem(JOIN_KEY, code); } catch (e) {}
      return shell(`<h1>Join a class</h1><p class="meta">Sign in first (it's free), then you'll come back here to see the class and decide whether to join.</p><div class="btns"><a class="btn" href="#account">Sign in</a></div>`);
    }
    shell(`<h1>Join a class</h1><p class="note">Loading…</p>`);
    try {
      const { data } = await api("GET", `/v1/classes/join/${code}`);
      if (location.hash.replace("#", "") !== "join-" + code) return; // moved on while loading
      const c = data.class, cert = c.certId ? ` · ${esc(certLabel(c.certId))}` : "";
      if (data.isTeacher) return shell(`<h1>${esc(c.name)}</h1><p class="meta">You teach this class${cert}. Share this page's link with your students.</p><div class="btns"><a class="btn" href="#account">Back to Account</a></div>`);
      shell(`<h1>Join ${esc(c.name)}</h1>
      <p class="meta">Teacher: <strong>${esc(c.teacherName)}</strong>${cert}${data.isMember ? ". You're already in this class; joining again updates your name and email choice." : ""}</p>
      <form id="join-form" class="panel" data-code="${esc(code)}" novalidate>
        <p style="margin:0"><strong>If you join, ${esc(c.teacherName)} will see:</strong></p>
        ${SHARED}
        <label for="join-name"><strong>Your name, as your teacher will see it</strong></label>
        <input type="text" id="join-name" class="textin" maxlength="60" required autocomplete="name">
        <label class="simopt"><input type="checkbox" id="join-email"><span>Also show my email address (${esc(me.user.email)}) to the teacher</span></label>
        <label class="simopt"><input type="checkbox" id="join-consent" required><span>I agree to share this progress summary with ${esc(c.teacherName)} until I leave the class.</span></label>
        <div class="btns"><button type="submit" class="btn">Join class</button><a class="btn ghost" href="#account">Cancel</a></div>
        <p class="note" id="join-msg" role="status"></p>
      </form>`);
    } catch (e) { shell(`<h1>Join a class</h1><div class="status warn">${esc(e.message)}</div><div class="btns"><a class="btn ghost" href="#account">Back to Account</a></div>`); }
  }

  const fmtDate = t => (t ? new Date(t).toLocaleDateString() : "–");
  const pct = v => (v == null ? "–" : `${+v}%`);
  async function classView(hexId) {
    const id = "cls_" + hexId;
    const crumbs = `<p class="crumbs"><a href="#account">Account</a> / Class</p>`;
    $("#app").innerHTML = `${crumbs}<h1>Class roster</h1><p class="note">Loading…</p>`;
    try {
      const { data } = await api("GET", `/v1/classes/${id}/roster`);
      if (location.hash.replace("#", "") !== "class-" + hexId) return;
      const c = data.class, n = data.students.length;
      const rows = data.students.map(s => {
        const who = `<strong>${esc(s.displayName)}</strong>${s.email ? `<br><span class="note">${esc(s.email)}</span>` : ""}`;
        const remove = `<button type="button" class="btn ghost sm" data-aact="removestudent" data-class="${esc(c.id)}" data-member="${esc(s.memberId)}" data-name="${esc(s.displayName)}" aria-label="Remove ${esc(s.displayName)} from the class">Remove</button>`;
        const certs = s.certs.length ? s.certs : [null];
        return certs.map((x, i) => `<tr>${i === 0 ? `<td rowspan="${certs.length}">${who}</td>` : ""}${x
          ? `<td>${esc(certLabel(x.certId))}</td><td>${x.readiness == null ? "–" : `${+x.readiness}/100`}</td><td>${+x.lessonsRead}${x.lessonsTotal == null ? "" : ` / ${+x.lessonsTotal}`}</td><td>${pct(x.bestExam)}</td><td>${+x.answered}</td><td>${+x.handsOn}</td>`
          : `<td colspan="6"><span class="note">No synced progress yet</span></td>`}${i === 0 ? `<td rowspan="${certs.length}">${+s.labsDone}</td><td rowspan="${certs.length}">${fmtDate(s.lastActive)}</td><td rowspan="${certs.length}">${remove}</td>` : ""}</tr>`).join("");
      }).join("");
      $("#app").innerHTML = `${crumbs}
      <h1>${esc(c.name)}</h1>
      <p class="meta">${c.certId ? `${esc(certLabel(c.certId))} · ` : ""}${plural(n, "student")} · you appear as ${esc(c.teacherName)}. Students share these numbers only after agreeing, and can leave at any time. Their answers and lab notes stay private.</p>
      <div class="panel">
        <div class="row"><div class="grow"><strong>Join code</strong><br><code>${esc(c.code)}</code></div><button type="button" class="btn sm" data-aact="copyjoin" data-code="${esc(c.code)}">Copy join link</button><button type="button" class="btn ghost sm" data-aact="rotatecode" data-class="${esc(c.id)}">New code</button></div>
        <details class="sq"><summary>Rename or change the class</summary>
          <form id="classedit-form" data-class="${esc(c.id)}">
            <label for="classedit-name">Class name</label><input type="text" id="classedit-name" class="textin" maxlength="80" required value="${esc(c.name)}">
            <label for="classedit-teacher">Your name, as students see it</label><input type="text" id="classedit-teacher" class="textin" maxlength="60" required value="${esc(c.teacherName)}">
            <label for="classedit-cert">Certification</label><select id="classedit-cert" class="textin">${certOptions(c.certId, "Any certification")}</select>
            <div class="btns"><button type="submit" class="btn sm">Save</button><button type="button" class="btn ghost sm" data-aact="deleteclass" data-class="${esc(c.id)}" data-name="${esc(c.name)}">Delete class</button></div>
          </form>
        </details>
      </div>
      <div class="btns"><button type="button" class="btn ghost sm" data-aact="classcsv" data-class="${esc(c.id)}">Download CSV</button></div>
      <div class="scroll" tabindex="0" role="region" aria-label="Class roster (scrolls sideways on small screens)"><table class="sectable"><thead><tr><th scope="col">Student</th><th scope="col">Certification</th><th scope="col">Readiness</th><th scope="col">Lessons read</th><th scope="col">Best practice exam</th><th scope="col">Questions answered</th><th scope="col">Hands-on done</th><th scope="col">Labs done</th><th scope="col">Last active</th><th scope="col"><span class="sr-only">Actions</span></th></tr></thead><tbody>
      ${rows || `<tr><td colspan="10">No students yet. Share the join link; students appear here after they agree to share.</td></tr>`}
      </tbody></table></div>`;
    } catch (e) { $("#app").innerHTML = `${crumbs}<h1>Class roster</h1><div class="status warn">${esc(e.message)}</div>`; }
  }

  function download(name, text, type) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  /* ---------- events ---------- */
  document.addEventListener("submit", async e => {
    const f = e.target;
    if (!["signin-form", "org-form", "cohort-form", "class-form", "classcode-form", "join-form", "classedit-form"].includes(f.id)) return;
    e.preventDefault();
    try {
      if (f.id === "signin-form") {
        const msg = $("#signin-msg");
        msg.textContent = "Sending…";
        const { data } = await api("POST", "/v1/auth/magic-link", { email: $("#signin-email").value });
        msg.textContent = data.message;
        if (data.devLink) msg.innerHTML = `${esc(data.message)} <a href="${esc(data.devLink)}">Development sign-in link</a>`;
      } else if (f.id === "org-form") {
        const { data } = await api("POST", "/v1/orgs", { name: $("#org-name").value });
        await refreshMe(); CertHub.rerender(); setTimeout(() => orgPanel(data.id), 50);
      } else if (f.id === "class-form") {
        const { data } = await api("POST", "/v1/classes", { name: $("#class-name").value, teacherName: $("#class-teacher").value, certId: $("#class-cert").value || null });
        ui.toast(`Class created. Join code: ${data.code}`); classPanel();
      } else if (f.id === "classcode-form") {
        const code = $("#classcode-in").value.toLowerCase().replace(/[^a-z0-9]/g, "");
        if (!CODE_RE.test(code)) throw new Error("Class codes are 10 letters and numbers. Check it with your teacher.");
        location.hash = "join-" + code;
      } else if (f.id === "join-form") {
        const msg = $("#join-msg");
        if (!$("#join-name").value.trim()) { msg.textContent = "Enter your name."; $("#join-name").focus(); return; }
        if (!$("#join-consent").checked) { msg.textContent = "Tick the box to agree to share your progress summary, or choose Cancel."; $("#join-consent").focus(); return; }
        const code = f.dataset.code;
        if (!CODE_RE.test(code)) return;
        const { data } = await api("POST", `/v1/classes/join/${code}`, { displayName: $("#join-name").value, showEmail: $("#join-email").checked, consent: true });
        ui.toast(`You joined ${data.class.name}.`);
        syncAll(); location.hash = "account";
      } else if (f.id === "classedit-form") {
        await api("PUT", `/v1/classes/${f.dataset.class}`, { name: $("#classedit-name").value, teacherName: $("#classedit-teacher").value, certId: $("#classedit-cert").value || null });
        ui.toast("Class saved."); classView(f.dataset.class.slice(4));
      } else {
        await api("POST", `/v1/orgs/${f.dataset.org}/cohorts`, { name: $("#cohort-name").value, certId: $("#cohort-cert").value });
        orgPanel(f.dataset.org);
      }
    } catch (err) { ui.toast(err.message); if (f.id === "signin-form") $("#signin-msg").textContent = err.message; }
  });

  document.addEventListener("click", async e => {
    const b = e.target.closest("[data-aact]"); if (!b) return;
    const a = b.dataset.aact;
    try {
      if (a === "signout") { await api("POST", "/v1/auth/logout", {}); setMe(null); ui.toast("Signed out. Your progress stays on this device."); CertHub.rerender(); }
      if (a === "sync") await syncAll();
      if (a === "upgrade" || a === "portal") {
        const { data } = await api("POST", a === "upgrade" ? "/v1/billing/checkout" : "/v1/billing/portal", a === "upgrade" ? { plan: "pro", interval: b.dataset.interval } : {});
        if (/^https:\/\//.test(data.url)) location.href = data.url;
      }
      if (a === "manage") orgPanel(b.dataset.org);
      if (a === "invite") {
        const { data } = await api("POST", `/v1/orgs/${b.dataset.org}/invites`, { role: "learner", cohortId: b.dataset.cohort, maxUses: 100, days: 30 });
        ui.copy(data.link, "invite link (valid 30 days)");
      }
      if (a === "csv") {
        const res = await fetch(`${API}/v1/cohorts/${b.dataset.cohort}/summary.csv`, { credentials: "include" });
        if (!res.ok) throw new Error("Couldn't download the CSV.");
        download("cohort-progress.csv", await res.text(), "text/csv");
      }
      if (a === "copyjoin" && CODE_RE.test(b.dataset.code)) ui.copy(joinLink(b.dataset.code), "class join link");
      if (a === "rotatecode") {
        if (!(await ui.confirm("Make a new join code? The old code and link stop working. Students already in the class stay.", { ok: "New code", cancel: "Keep this one" }))) return;
        await api("POST", `/v1/classes/${b.dataset.class}/code`, {});
        ui.toast("New join code ready."); classView(b.dataset.class.slice(4));
      }
      if (a === "deleteclass") {
        if (!(await ui.confirm(`Delete the class "${b.dataset.name}"? Students are removed and stop sharing. This can't be undone.`, { ok: "Delete class", cancel: "Keep it", danger: true }))) return;
        await api("DELETE", `/v1/classes/${b.dataset.class}`);
        ui.toast("Class deleted."); location.hash = "account";
      }
      if (a === "removestudent") {
        if (!(await ui.confirm(`Remove ${b.dataset.name} from the class? They stop sharing their progress with you.`, { ok: "Remove", cancel: "Cancel", danger: true }))) return;
        await api("DELETE", `/v1/classes/${b.dataset.class}/students/${b.dataset.member}`);
        ui.toast("Student removed."); classView(b.dataset.class.slice(4));
      }
      if (a === "leaveclass") {
        if (!(await ui.confirm(`Leave "${b.dataset.name}"? Your teacher will no longer see your progress.`, { ok: "Leave class", cancel: "Stay" }))) return;
        await api("DELETE", `/v1/classes/${b.dataset.class}/membership`);
        ui.toast("You left the class. Sharing has stopped."); classPanel();
      }
      if (a === "classcsv") {
        const res = await fetch(`${API}/v1/classes/${b.dataset.class}/roster.csv`, { credentials: "include", cache: "no-store" });
        if (!res.ok) throw new Error("Couldn't download the CSV.");
        const text = await res.text();
        if (document.documentElement.classList.contains("framed")) ui.showText(text, "Class roster (CSV)"); else download("class-roster.csv", text, "text/csv");
      }
      if (a === "export") {
        const { data } = await api("GET", "/v1/account/export");
        const text = JSON.stringify(data, null, 1);
        if (document.documentElement.classList.contains("framed")) ui.showText(text, "Your account data"); else download("cyber-cert-study-account.json", text, "application/json");
      }
      if (a === "delete") {
        const email = me.user.email;
        if (!(await ui.confirm(`Delete your account (${email}) and everything stored on the server? This can't be undone. Your progress on this device stays.`, { ok: "Delete account", cancel: "Keep it", danger: true }))) return;
        await api("DELETE", "/v1/account", { confirm: email });
        setMe(null); store.set(STATE_KEY, "{}"); ui.toast("Account deleted."); CertHub.rerender();
      }
    } catch (err) { ui.toast(err.message); }
  });

  // Sign-in links and invite links land here: /?signin=<token>#account, /?invite=<code>#account
  async function handleLanding() {
    const q = new URLSearchParams(location.search);
    const signin = q.get("signin"), invite = q.get("invite");
    if (!signin && !invite) return;
    history.replaceState(null, "", location.pathname + location.hash); // don't leave tokens in the address bar
    if (invite && /^[0-9a-f]{32}$/.test(invite)) try { sessionStorage.setItem("certhub:invite", invite); } catch (e) {}
    if (signin && /^[0-9a-f]{64}$/.test(signin)) {
      try { await api("POST", "/v1/auth/magic-link/verify", { token: signin }); ui.toast("Signed in."); }
      catch (e) { ui.toast(e.message); }
    }
  }
  async function acceptPendingInvite() {
    let code = null;
    try { code = sessionStorage.getItem("certhub:invite"); } catch (e) {}
    if (!code || !signedIn()) return;
    try { sessionStorage.removeItem("certhub:invite"); } catch (e) {}
    try { const { data } = await api("POST", `/v1/invites/${code}/accept`, {}); ui.toast(`You joined ${data.org.name}.`); await refreshMe(); }
    catch (e) { ui.toast(e.message); }
  }

  CertHub.accountViews = {
    account: () => { setTimeout(() => { renderStatus(); if (signedIn()) classPanel(); }, 0); return accountView(); },
    cohort: cohortView,
    join: joinView,
    classRoster: classView
  };

  if (API) document.addEventListener("DOMContentLoaded", async () => {
    await handleLanding();
    await refreshMe();
    await acceptPendingInvite();
    // Opened a class join link before signing in: go back to it (joining still needs consent there).
    let join = null;
    try { join = sessionStorage.getItem(JOIN_KEY); if (join && signedIn()) sessionStorage.removeItem(JOIN_KEY); } catch (e) {}
    if (join && signedIn() && CODE_RE.test(join) && !/^#?join-/.test(location.hash)) location.hash = "join-" + join;
    const onAccount = /^#?account/.test(location.hash);
    if (onAccount || signedIn()) CertHub.rerender();
    if (signedIn()) {
      syncAll();
      document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") syncAll(); });
    }
  });
})();
