/* The single-page app: routes, header and home page.
   Routes are plain hash tokens so links work anywhere, including embedded hosts:
     #home · #<cert-id> · #<cert-id>.<tab> · #labs · #lab-<id> · #portfolio */
(function () {
  const { U, certs, loadProgress, buildPlan, labs, labOrder, labStatus, loadLabProgress, ui } = CertHub;
  const { $, esc, dc } = U;
  let view = "";

  /* ---------- home ---------- */
  function certCard(id) {
    const c = certs[id] || CertHub.planned[id];
    if (!c) return "";
    const built = !!certs[id];
    const stack = `<div class="stack" aria-hidden="true">${c.domains.map(d => `<i style="--c:${dc(d.id)};flex:${d.w}"></i>`).join("")}</div>`;
    const badge = c.status === "verified" ? `<span class="badge ok">Weights verified</span>` : `<span class="badge check">Weights to confirm</span>`;
    let foot;
    if (built) {
      const p = loadProgress(id);
      const s = Object.values(p.stats).reduce((a, x) => ({ c: a.c + x.c, t: a.t + x.t }), { c: 0, t: 0 });
      const plan = buildPlan(c);
      const labCount = new Set(plan.weeks.flatMap(w => w.labRefs || []).filter(l => labs[l])).size;
      const days = Object.values(p.checks).filter(Boolean).length;
      foot = `<span>${plan.weeks.length} weeks · ${c.qCount ?? (c.questions || []).length} questions${labCount ? ` · ${labCount} labs` : ""}</span><span>${s.t ? `${Math.round(100 * s.c / s.t)}% of ${s.t} answered` : days ? `${days} days checked` : "Not started"}</span>`;
    } else foot = `<span>Study plan not written yet</span>`;
    const inner = `<span class="vendor">${esc(c.vendor)} · ${esc(c.exam)}</span>
      <h2>${esc(c.name)}</h2>
      <p>${esc(c.blurb)}</p>
      ${built ? CertHub.activeNotices(c).slice(0, 1).map(n => `<p class="note" style="color:var(--ink)">${esc(n.text)}</p>`).join("") : ""}
      ${stack}
      <div class="cardfoot">${badge}${foot}</div>`;
    return built ? `<a class="card" href="#${esc(id)}">${inner}</a>` : `<div class="card" aria-disabled="true" style="opacity:.7">${inner}</div>`;
  }
  /* ---------- career tracks ---------- */
  const TRACKS = CertHub.tracks || [{ id: "all", name: "All", certs: CertHub.catalog }];
  const TRACK_KEY = "certhub:track";
  const curTrack = () => { const t = CertHub.store.get(TRACK_KEY) || "all"; return t === "all" || TRACKS.some(x => x.id === t) ? t : "all"; };
  // Certifications with saved progress, newest activity first: jump back in.
  function continueHtml() {
    const rows = Object.values(certs).map(c => {
      let p = null; try { p = JSON.parse(CertHub.store.get("certhub:v1:" + c.id) || "null"); } catch (e) {}
      if (!p || !p.start) return null;
      const last = Math.max(0, ...(p.history || []).map(h => h.at));
      const used = last || Object.keys(p.read || {}).length || Object.keys(p.stats || {}).length || Object.values(p.checks || {}).some(Boolean);
      if (!used) return null;
      const wk = Math.max(1, Math.floor((U.today() - U.parseD(p.start)) / U.DAY / 7) + 1);
      const due = Object.values(p.review || {}).filter(r => r.due <= U.today().getTime() + 1000).length;
      return { c, wk, due, last };
    }).filter(Boolean).sort((a, b) => b.last - a.last).slice(0, 4);
    if (!rows.length) return "";
    return `<h2>Continue studying</h2><div class="panel">${rows.map(r => `<div class="row"><div class="grow"><a href="#${esc(r.c.id)}.week"><strong>${esc(r.c.short)} ${esc(r.c.exam)}</strong></a><br><span class="note">Week ${r.wk}${r.due ? ` · ${r.due} review${r.due > 1 ? "s" : ""} due` : ""}</span></div><a class="btn sm" href="#${esc(r.c.id)}.week">Today's plan</a></div>`).join("")}</div>`;
  }
  function trackPicker() {
    const cur = curTrack();
    return `<div class="trackpick" role="group" aria-labelledby="tracks-h">${[["all", "All tracks"], ...TRACKS.map(t => [t.id, t.name])].map(([id, name]) => `<button type="button" class="chipbtn" data-track="${esc(id)}" aria-pressed="${cur === id}">${esc(name)}</button>`).join("")}</div>`;
  }
  function trackCards() {
    const cur = curTrack();
    if (cur === "all") return TRACKS.map(t => `<h3 class="trackh">${esc(t.name)}</h3><p class="note">${esc(t.blurb || "")}</p><div class="cards">${t.certs.map(certCard).join("")}</div>`).join("");
    const t = TRACKS.find(x => x.id === cur);
    return `<p class="note">${esc(t.blurb || "")}</p><div class="cards">${t.certs.map(certCard).join("")}</div>`;
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-track]"); if (!b) return;
    CertHub.store.set(TRACK_KEY, b.dataset.track);
    document.querySelectorAll("[data-track]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    const box = document.getElementById("trackcards"); if (box) box.innerHTML = trackCards();
  });

  /* ---------- "Pick your first certification" guide ---------- */
  // Goal (a career track, or "not sure") and starting point -> a suggested first certification.
  const PICK_GOALS = [["unsure", "Not sure yet"], ["cybersecurity", "Cybersecurity"], ["network", "Networking"], ["sysadmin", "IT support and systems"], ["cloud", "Cloud"], ["software", "Programming"], ["data-ai", "Data and AI"]];
  const PICK_LEVELS = [["new", "New to IT"], ["some", "I know the basics"], ["work", "I work in IT"]];
  const PICKS = {
    unsure: { new: "a-plus-core1", some: "network-plus", work: "security-plus" },
    cybersecurity: { new: "isc2-cc", some: "security-plus", work: "cysa-plus" },
    network: { new: "ccst-networking", some: "network-plus", work: "ccna" },
    sysadmin: { new: "a-plus-core1", some: "linux-plus", work: "az-104" },
    cloud: { new: "aws-cloud-practitioner", some: "cloud-plus", work: "aws-saa" },
    software: { new: "pcep", some: "pcap", work: "aws-developer" },
    "data-ai": { new: "ai-900", some: "data-plus", work: "ai-102" }
  };
  const PICK_WHY = {
    new: "A good first step with no experience needed: it teaches the basics the rest of the track builds on.",
    some: "A common next step once you know the basics, and a widely recognized certification for this kind of work.",
    work: "Goes deeper into the day-to-day work of this role, building on the experience you already have."
  };
  const PICK_KEY = "certhub:pick";
  const pickState = () => { try { const v = JSON.parse(CertHub.store.get(PICK_KEY) || "{}"); return { g: PICKS[v.g] ? v.g : "", l: PICK_LEVELS.some(x => x[0] === v.l) ? v.l : "" }; } catch (e) { return { g: "", l: "" }; } };
  function pickResult() {
    const st = pickState();
    if (!st.g || !st.l) return `<p class="note">Choose one answer to each question to see a suggestion.</p>`;
    const id = PICKS[st.g][st.l];
    if (!certs[id]) return "";
    const track = TRACKS.find(t => t.id === st.g);
    const next = track ? track.certs.slice(track.certs.indexOf(id) + 1).find(x => certs[x]) : "";
    return `<p class="why"><strong>Start with ${esc(certs[id].short || certs[id].name)}.</strong> ${esc(PICK_WHY[st.l])}${next ? ` After it, a natural next step is ${esc(certs[next].short || certs[next].name)}.` : ""} <a href="#careers">Compare career paths</a>.</p><div class="cards">${certCard(id)}</div>`;
  }
  function pickerHtml() {
    const st = pickState();
    const chips = (name, list, cur) => `<div class="trackpick" role="group" aria-label="${name}">${list.map(([k, l]) => `<button type="button" class="chipbtn" data-pick="${name === "Goal" ? "g" : "l"}:${k}" aria-pressed="${cur === k}">${esc(l)}</button>`).join("")}</div>`;
    return `<h2 id="pick" tabindex="-1">Pick your first certification</h2>
    <div class="panel"><p class="pickq">What do you want to work in?</p>${chips("Goal", PICK_GOALS, st.g)}
      <p class="pickq">Where are you starting from?</p>${chips("Starting point", PICK_LEVELS, st.l)}
      <div class="pickres" id="pickres" aria-live="polite">${pickResult()}</div></div>`;
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-pick]"); if (!b) return;
    const [k, v] = b.dataset.pick.split(":"); const st = pickState(); st[k] = v;
    CertHub.store.set(PICK_KEY, JSON.stringify(st));
    document.querySelectorAll(`[data-pick^="${k}:"]`).forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    const box = document.getElementById("pickres"); if (box) box.innerHTML = pickResult();
  });
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-jump]"); if (!b) return;
    const t = document.getElementById(b.dataset.jump); if (!t) return;
    if (!t.hasAttribute("tabindex")) t.setAttribute("tabindex", "-1");
    t.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); t.focus({ preventScroll: true });
  });
  document.addEventListener("click", e => {
    const b = e.target.closest("button[data-accent]"); if (!b) return;
    CertHub.setAccent(b.dataset.accent);
    document.querySelectorAll("button[data-accent]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
  // Optional email newsletter: a link to a hosted sign-up form (site.config.json "newsletter"). Hidden when not set.
  function newsHtml() {
    const n = CertHub.site && CertHub.site.newsletter;
    if (!n || !n.url) return "";
    return `<div class="panel installcard newscard"><div class="grow"><strong>Get study tips by email</strong><br><span class="note">${esc(n.blurb || "New labs, exam changes and a study tip now and then. Unsubscribe any time.")}</span></div><a class="btn sm" href="${esc(n.url)}" target="_blank" rel="noopener">Sign up</a></div>`;
  }

  /* ---------- what's new (data/news.js) ---------- */
  const NEWS = () => (Array.isArray(CertHub.news) ? CertHub.news : []).filter(n => n && /^\d{4}-\d{2}-\d{2}$/.test(n.date) && n.title && Array.isArray(n.items));
  const newsDate = d => { try { return new Date(d + "T12:00:00").toLocaleDateString(CertHub.i18n.lang() === "es" ? "es" : "en", { year: "numeric", month: "long", day: "numeric" }); } catch (e) { return d; } };
  // Spanish mode shows each entry's own Spanish text (marked as content so the interface dictionary leaves it alone).
  const loc = n => CertHub.i18n.lang() === "es" && n.es && n.es.title && Array.isArray(n.es.items) ? n.es : n;
  function newsView() {
    return `<h1>What's new</h1><p class="meta">New certifications, features and content, newest first.</p>
    ${NEWS().map(n => { const t = loc(n); return `<section class="panel"${t !== n ? " data-content" : ""}><p class="note" style="margin:0">${esc(newsDate(n.date))}</p><h2 style="margin-top:4px">${esc(t.title)}</h2><ul class="clean">${t.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul></section>`; }).join("")}`;
  }
  function newsCard() {
    const n = NEWS()[0]; if (!n) return "";
    const t = loc(n);
    return `<p class="note newsline"><strong>New:</strong> <span${t !== n ? " data-content" : ""}>${esc(t.title)}.</span> <a href="#whats-new">See what's new</a></p>`;
  }

  function homeView() {
    const lp = loadLabProgress();
    const labList = labOrder.map(id => labs[id]);
    const doneLabs = labList.filter(l => labStatus(l, lp).state === "done").length;
    const start = labs["lab-home-lab"];
    const nCerts = CertHub.catalog.filter(id => certs[id]).length;
    return `<section class="hero">
      <h1>Study to certify: free plans for ${nCerts} IT, cloud and cybersecurity certifications</h1>
      <p class="meta">Pick a certification and get a week-by-week plan: short lessons, hands-on labs, quizzes, timed checkpoints, a practice exam weighted like the real one and spaced review. No sign-up and no ads. Your progress stays in your browser.</p>
      ${newsCard()}
      <div class="btns"><button type="button" class="btn" data-jump="pick">Pick your first certification</button><button type="button" class="btn ghost" data-jump="tracks-h">See all ${nCerts} certifications</button><a class="btn ghost" href="#labs">Browse ${labList.length} labs</a>${doneLabs ? `<a class="btn ghost" href="#portfolio">Your portfolio (${doneLabs})</a>` : ""}</div>
    </section>
    ${CertHub.install.installed() ? "" : `<div class="panel installcard"><div class="grow"><strong>Get the app on your phone</strong><br><span class="note">Install it from your browser: it opens full screen and works offline. No app store needed.</span></div><div class="btns" style="margin:0">${CertHub.install.prompt ? `<button type="button" class="btn sm" data-gact="install">Install</button>` : ""}<a class="btn ghost sm" href="#install">How to install</a></div></div>`}
    ${CertHub.review ? CertHub.review.homeCard() : ""}
    ${continueHtml()}
    ${pickerHtml()}
    <h2 id="tracks-h">Certifications by career track</h2>
    <p class="note"><a href="#careers">Career paths</a>: which certification to take first, the jobs each track leads to, and interview practice. <a href="#exam-day">Exam-day guides</a>: scoring, question types and what to expect on test day.</p>
    ${trackPicker()}
    <div id="trackcards">${trackCards()}</div>
    <h2>Your progress</h2>
    ${(() => { const st = CertHub.activity.streak(); return `<div class="panel startcard"><div class="grow"><strong>${st.current ? `${st.current}-day study streak` : "Start a study streak"}</strong><br><span class="note">${st.current ? (st.today ? "You studied today. " : "Study today to keep it going. ") : "Answer a question or read a lesson each day. "}${st.best ? `Best: ${st.best} days.` : ""}</span></div><button type="button" class="btn ghost sm" data-gact="reminder">Set a daily reminder</button></div>`; })()}
    <div class="panel">
      <p class="note" style="margin:0">Progress, lab notes and checkmarks are saved in this browser only. Nothing is sent anywhere. Back up to move them to another device.</p>
      <div class="btns"><button type="button" class="btn ghost sm no-framed" data-gact="download">Download backup</button><button type="button" class="btn ghost sm" data-gact="copybackup">Copy backup</button><label class="btn ghost sm" for="imp">Restore from file</label><input type="file" id="imp" accept="application/json" class="hide"><button type="button" class="btn ghost sm" data-gact="pasterestore">Restore from text</button></div>
    </div>
    ${newsHtml()}
    <h2>Appearance</h2>
    <div class="panel"><p class="note" style="margin:0">Accent color for buttons and highlights. Use the button at the top right to switch between light, dark and your device's setting.</p>
      <div class="swatches" role="group" aria-label="Accent color">${CertHub.ACCENTS.map(([k, l, c]) => `<button type="button" class="chipbtn swatch" data-accent="${k}" aria-pressed="${CertHub.accent() === k}" style="--sw:${c}"><i aria-hidden="true"></i>${l}</button>`).join("")}</div></div>
    <div class="panel installcard supportcard"><div class="grow"><strong>Keep it free</strong><br><span class="note">No ads and no tracking. Share it, report a mistake${CertHub.site && CertHub.site.support && CertHub.site.support.url ? " or chip in" : ""} to help.</span></div><a class="btn ghost sm" href="#support">Support this site</a></div>`;
  }

  /* ---------- restore from pasted text ---------- */
  CertHub.restoreFromText = function () {
    const wrap = document.createElement("div");
    wrap.className = "modal-wrap";
    wrap.innerHTML = `<div class="modal wide" role="dialog" aria-modal="true" aria-labelledby="rt-h"><p id="rt-h"><strong>Restore from a copied backup</strong><br><span class="note">Paste the backup text. It replaces progress for the same certifications and labs.</span></p><textarea rows="8" id="rt-text"></textarea><p class="err" id="rt-err"></p><div class="btns"><button type="button" class="btn" data-rt="ok">Restore</button><button type="button" class="btn ghost" data-rt="cancel">Cancel</button></div></div>`;
    document.body.appendChild(wrap);
    wrap.querySelector("textarea").focus();
    wrap.addEventListener("click", e => {
      const b = e.target.closest("[data-rt]"); if (!b) return;
      if (b.dataset.rt === "cancel") return wrap.remove();
      try { const n = CertHub.restoreText(wrap.querySelector("textarea").value); wrap.remove(); ui.toast(`Restored ${n} saved item${n === 1 ? "" : "s"}.`); setTimeout(() => location.reload(), 800); }
      catch (err) { wrap.querySelector("#rt-err").textContent = err instanceof SyntaxError ? "That text isn't a complete backup. Copy the whole backup and try again." : err.message; }
    });
  };

  /* ---------- router ---------- */
  const NAV = [["home", "Certifications"], ["labs", "Labs"], ["portfolio", "Portfolio"], ["careers", "Careers"], ["frameworks", "Frameworks"]];
  // The Account tab only appears when the site has an accounts API configured.
  const navItems = () => CertHub.sync && CertHub.sync.enabled ? NAV.concat([["account", "Account"]]) : NAV;
  function topNav(cur) {
    $("#tabs").innerHTML = navItems().map(([k, l]) => `<a role="tab" href="#${k}" aria-selected="${cur === k}">${l}</a>`).join("");
    $("#count").innerHTML = "";
  }
  // Route tokens come from the URL, so only look them up as the objects' own keys
  // (never inherited ones like "constructor" or "__proto__").
  const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  const POLICY_TITLES = { privacy: "Privacy Policy", terms: "Terms of Use", security: "Security", install: "Install the App", support: "Support This Site" };
  // Optional page counts (GoatCounter): no cookies, no personal data, skipped when the browser asks not to be tracked.
  let lastCounted = "";
  function countView() {
    const gc = CertHub.site && CertHub.site.analytics;
    if (!gc || navigator.doNotTrack === "1" || navigator.globalPrivacyControl) return;
    const p = location.pathname + location.hash;
    if (p === lastCounted) return; lastCounted = p;
    const q = new URLSearchParams({ p, t: document.title, r: document.referrer && !document.referrer.startsWith(location.origin) ? document.referrer : "", rnd: Math.random().toString(36).slice(2) });
    try { fetch(`${gc}/count?${q}`, { mode: "no-cors", credentials: "omit", keepalive: true, referrerPolicy: "no-referrer" }).catch(() => {}); } catch (e) {}
  }
  // A named event (e.g. a lesson rating) when page counts are on; same privacy rules as countView.
  CertHub.countEvent = (name, title) => {
    const gc = CertHub.site && CertHub.site.analytics;
    if (!gc || navigator.doNotTrack === "1" || navigator.globalPrivacyControl) return;
    const q = new URLSearchParams({ p: name, t: title || name, e: "true", rnd: Math.random().toString(36).slice(2) });
    try { fetch(`${gc}/count?${q}`, { mode: "no-cors", credentials: "omit", keepalive: true, referrerPolicy: "no-referrer" }).catch(() => {}); } catch (e) {}
  };
  const LIGHT = new Set(["home", "whats-new", "review", "vm", "privacy", "terms", "security", "install", "support", "exam-day", "account"]);
  function route() {
    let raw = "";
    try { raw = decodeURIComponent(location.hash.replace(/^#/, "")); } catch (e) { raw = ""; }
    raw = raw || document.body.dataset.route || "home";
    let [head, tab] = raw.split(".");
    if (!/^[a-z0-9-]{1,64}$/.test(head || "")) head = "home";
    if (tab && !/^([a-z]{1,16}|video-l[a-z0-9]{1,14})$/.test(tab)) tab = "";
    // The home page and a few light pages only need the lab index; everything else waits for the full labs.
    if ((!CertHub.labsLoaded() && !LIGHT.has(head)) || (own(certs, head) && certs[head].lite)) {
      $("#app").innerHTML = `<p class="meta" role="status">Loading…</p>`;
      const want = location.hash;
      Promise.all([CertHub.loadLabs(), own(certs, head) ? CertHub.loadPlan(head) : true]).then(r => {
        if (location.hash !== want) return;
        if (r.every(Boolean)) route(); else $("#app").innerHTML = `<p class="meta" role="status">This page couldn't load. Check your connection and try again.</p>`;
      });
      return;
    }
    const prev = view;
    if (prev.startsWith("lab-") || prev.startsWith("cap-")) CertHub.labViews.leave();
    if (prev === "vm" && head !== "vm" && CertHub.vm) CertHub.vm.leave();
    let title = "StudyToCert", brand = "StudyToCert";
    if (own(certs, head)) {
      CertHub.certView.open(head, tab || "week");
      view = "cert:" + head;
      brand = CertHub.certView.title();
      title = `${brand} Study Plan`;
    } else {
      CertHub.certView.close();
      if (head === "labs") { topNav("labs"); $("#app").innerHTML = CertHub.labViews.library(); title = "Hands-on Labs"; view = "labs"; }
      else if (own(labs, head)) { topNav("labs"); $("#app").innerHTML = CertHub.labViews.detail(labs[head]); title = labs[head].title; view = head; }
      else if (own(POLICY_TITLES, head)) { topNav(""); const pv = CertHub.policyViews; $("#app").innerHTML = head === "privacy" ? pv.privacy() : head === "terms" ? pv.terms() : head === "install" ? pv.install() : head === "support" ? pv.support() : pv.security(); title = POLICY_TITLES[head]; view = head; }
      else if (head === "account" && CertHub.accountViews) { topNav("account"); $("#app").innerHTML = CertHub.accountViews.account(); title = "Account"; view = "account"; }
      else if (/^join-[a-km-np-z2-9]{10}$/.test(head) && CertHub.accountViews) { topNav("account"); CertHub.accountViews.join(head.slice(5)); title = "Join a Class"; view = head; }
      else if (/^class-[0-9a-f]{24}$/.test(head) && CertHub.accountViews) { topNav("account"); CertHub.accountViews.classRoster(head.slice(6)); title = "Class Roster"; view = head; }
      else if (/^cohort-[0-9a-f]{24}$/.test(head) && CertHub.accountViews) { topNav("account"); CertHub.accountViews.cohort(head.slice(7)); title = "Cohort Progress"; view = head; }
      else if (/^cap-[a-z0-9-]{1,60}$/.test(head) && CertHub.pro) { topNav("labs"); CertHub.pro.capstoneView(head); title = "Capstone project"; view = head; }
      else if (head === "frameworks" && CertHub.frameworksView) { topNav("frameworks"); $("#app").innerHTML = CertHub.frameworksView(); title = "Frameworks"; view = "frameworks"; }
      else if ((head === "exam-day" || /^exam-day-[a-z]{2,20}$/.test(head)) && CertHub.examDay) { topNav("careers"); CertHub.examDay.show(head); title = "Exam-Day Guides"; view = head; }
      else if ((head === "careers" || /^career-[a-z]{2,20}$/.test(head)) && CertHub.careerViews) { topNav("careers"); CertHub.careerViews.show(head); title = "Career Paths"; view = head; }
      else if (head === "vm") {
        topNav("labs"); title = "Practice VM"; view = "vm";
        if (CertHub.vm) $("#app").innerHTML = CertHub.vm.view();
        else { $("#app").innerHTML = `<p class="meta" role="status">Loading…</p>`; CertHub.loadScript("assets/vm.js").then(ok => { if (location.hash === "#vm" && CertHub.vm) $("#app").innerHTML = CertHub.vm.view(); else if (!ok) $("#app").innerHTML = `<p class="meta" role="status">This page couldn't load. Check your connection and try again.</p>`; }); }
      }
      else if (head === "whats-new") { topNav(""); $("#app").innerHTML = newsView(); title = "What's New"; view = head; }
      else if (head === "review" && CertHub.review) { topNav("home"); $("#app").innerHTML = CertHub.review.show(); title = "Daily Review"; view = "review"; }
      else if (head === "portfolio") { topNav("portfolio"); $("#app").innerHTML = CertHub.labViews.portfolio(); title = "Lab Portfolio"; view = "portfolio"; }
      else { topNav("home"); $("#app").innerHTML = homeView(); view = "home"; }
    }
    const bn = $("#brandname span");
    if (brand === "StudyToCert") bn.innerHTML = "Study<b>To</b>Cert"; else bn.textContent = brand;
    $("#back").hidden = view === "home";
    document.title = title === "StudyToCert" ? title : `${title} · StudyToCert`;
    countView();
    window.scrollTo(0, 0);
  }
  // Re-render the current view in place (after marking a lab done, for example).
  CertHub.reviewActive = () => view === "review";
  CertHub.rerender = () => { const y = window.scrollY; route(); window.scrollTo(0, y); };

  document.addEventListener("click", e => {
    const b = e.target.closest("[data-gact]"); if (!b) return;
    const a = b.dataset.gact;
    if (a === "download") CertHub.exportAll();
    if (a === "copybackup") ui.copy(CertHub.backupText(), "progress backup");
    if (a === "pasterestore") CertHub.restoreFromText();
    if (a === "reminder") CertHub.addReminder("Study for my certification", location.origin + location.pathname);
    if (a === "share") {
      const data = { title: "StudyToCert", text: "Free study plans, quizzes and hands-on labs for cybersecurity certifications.", url: location.origin + "/" };
      if (navigator.share) navigator.share(data).catch(() => {}); else ui.copy(data.url, "site link");
    }
    if (a === "install") CertHub.install.run().then(ok => { if (!ok) location.hash = "install"; else CertHub.rerender(); });
  });
  document.addEventListener("change", e => {
    if (e.target.id !== "imp" || view !== "home" || !e.target.files[0]) return;
    CertHub.importAll(e.target.files[0], (err, n) => {
      if (err) return ui.toast(err.message);
      ui.toast(`Restored ${n} saved item${n === 1 ? "" : "s"}.`); setTimeout(() => location.reload(), 800);
    });
  });
  window.addEventListener("hashchange", route);
  // Language: English or Spanish (interface, lessons and questions where translated).
  function langButton() {
    const r = document.querySelector("header.top .right"); if (!r || document.getElementById("langbtn")) return;
    const es = CertHub.i18n.lang() === "es", b = document.createElement("button");
    b.type = "button"; b.id = "langbtn"; b.className = "theme"; b.lang = es ? "en" : "es";
    b.textContent = es ? "English" : "Español"; b.setAttribute("aria-label", es ? "Switch to English" : "Cambiar a español");
    b.addEventListener("click", () => CertHub.i18n.set(es ? "en" : "es"));
    r.insertBefore(b, r.querySelector("#theme"));
  }
  document.addEventListener("DOMContentLoaded", () => { CertHub.themeButton(); langButton(); CertHub.i18n.start().then(route, route); });
})();
