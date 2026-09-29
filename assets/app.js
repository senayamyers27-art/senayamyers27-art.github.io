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
    const stack = `<div class="stack" aria-hidden="true">${c.domains.map(d => `<i data-style="--c:${dc(d.id)};flex:${esc(d.w)}"></i>`).join("")}</div>`;
    const badge = c.status === "verified" ? `<span class="badge ok">Weights verified</span>` : `<span class="badge check">Weights to confirm</span>`;
    let foot;
    if (built) {
      const p = loadProgress(id);
      const s = Object.values(p.stats).reduce((a, x) => ({ c: a.c + x.c, t: a.t + x.t }), { c: 0, t: 0 });
      const plan = buildPlan(c);
      const labCount = new Set(plan.weeks.flatMap(w => w.labRefs || []).filter(l => labs[l])).size;
      const days = Object.values(p.checks).filter(Boolean).length;
      foot = `<span>${plan.weeks.length} weeks · ${esc(c.qCount) ?? (c.questions || []).length} questions${labCount ? ` · ${labCount} labs` : ""}</span><span>${s.t ? `${Math.round(100 * s.c / s.t)}% of ${esc(s.t)} answered` : days ? `${days} days checked` : "Not started"}</span>`;
    } else foot = `<span>Study plan not written yet</span>`;
    const inner = `<span class="vendor">${esc(c.vendor)} · ${esc(c.exam)}</span>
      <h2>${esc(c.name)}</h2>
      <p>${esc(c.blurb)}</p>
      ${built ? CertHub.activeNotices(c).slice(0, 1).map(n => `<p class="note" data-style="color:var(--ink)">${esc(n.text)}</p>`).join("") : ""}
      ${stack}
      <div class="cardfoot">${badge}${foot}</div>`;
    return built ? `<a class="card" href="#${esc(id)}">${inner}</a>` : `<div class="card" aria-disabled="true" data-style="opacity:.7">${inner}</div>`;
  }
  /* ---------- career tracks ---------- */
  const TRACKS = CertHub.tracks || [{ id: "all", name: "All", certs: CertHub.catalog }];
  const TRACK_KEY = "certhub:track";
  const curTrack = () => { const t = CertHub.store.get(TRACK_KEY) || "all"; return t === "all" || TRACKS.some(x => x.id === t) ? t : "all"; };
  /* ---------- dashboard: every certification you've started, on one page ---------- */
  function startedCerts() {
    let ready = {}; try { ready = JSON.parse(CertHub.store.get("certhub:ready") || "{}") || {}; } catch (e) {}
    return Object.values(certs).map(c => {
      const p = loadProgress(c.id);
      if (!p.start) return null;
      const last = Math.max(0, ...(p.history || []).map(h => h.at || 0));
      const used = last || Object.keys(p.read || {}).length || Object.keys(p.stats || {}).length || Object.values(p.checks || {}).some(Boolean);
      if (!used) return null;
      const weeks = buildPlan(c).weeks.length;
      const wk = Math.min(weeks, Math.max(1, Math.floor((U.today() - U.parseD(p.start)) / U.DAY / 7) + 1));
      const due = Object.values(p.review || {}).filter(r => r.due <= U.today().getTime() + 1000).length;
      const s = Object.values(p.stats || {}).reduce((a, x) => ({ c: a.c + x.c, t: a.t + x.t }), { c: 0, t: 0 });
      const days = p.examDate ? Math.ceil((U.parseD(p.examDate) - U.today()) / U.DAY) : null;
      const r = ready[c.id] && isFinite(ready[c.id].score) ? Math.round(ready[c.id].score) : null;
      return { c, p, last, weeks, wk, due, acc: s.t ? Math.round(100 * s.c / s.t) : null, answered: s.t, days, ready: r };
    }).filter(Boolean).sort((a, b) => b.last - a.last);
  }
  const readyColor = r => r >= 80 ? "var(--ok)" : r >= 60 ? "var(--warn)" : "var(--bad)";
  function dashCard(x) {
    const id = esc(x.c.id);
    const ring = CertHub.fx.ring(x.ready ?? 0, x.ready == null ? "var(--line)" : readyColor(x.ready), x.ready == null ? `<span aria-hidden="true">–</span>` : `<span data-count="${esc(x.ready)}">${esc(x.ready)}</span><small>/100</small>`);
    const exam = x.days == null ? "" : x.days > 0 ? `<strong>${esc(x.days)}</strong> day${x.days === 1 ? "" : "s"} to the exam` : x.days === 0 ? "<strong>Exam day.</strong> Good luck!" : "Exam date passed";
    return `<div class="panel dashcard" data-style="--c:${dc(x.c.domains[0].id)}">
      <div class="dashtop">${ring}<div class="grow"><span class="vendor">${esc(x.c.vendor)} · ${esc(x.c.exam)}</span><h2><a href="#${id}.week">${esc(x.c.short || x.c.name)}</a></h2>
        <p class="note">${x.ready == null ? `Readiness appears after you open <a href="#${id}.progress">Progress</a>.` : `Exam readiness ${esc(x.ready)}/100.`}</p></div></div>
      <ul class="dashstats">
        <li>${exam || `<a href="#${id}.progress">Set your exam date</a>`}</li>
        <li>Week <strong>${esc(x.wk)}</strong> of ${esc(x.weeks)}</li>
        <li>${x.acc == null ? "No questions answered yet" : `<strong>${esc(x.acc)}%</strong> of ${esc(x.answered)} answered correctly`}</li>
        <li>${x.due ? `<strong>${esc(x.due)}</strong> review${x.due === 1 ? "" : "s"} due` : "Review queue clear"}</li>
      </ul>
      <div class="track" aria-hidden="true"><i data-style="width:${Math.round(100 * x.wk / x.weeks)}%;background:var(--c)"></i></div>
      <div class="btns"><a class="btn sm" href="#${id}.week">Today's plan</a><a class="btn ghost sm" href="#${id}.practice">Practice</a><a class="btn ghost sm" href="#${id}.progress">Progress</a></div></div>`;
  }
  function dashboardView() {
    const list = startedCerts(), st = CertHub.activity.streak();
    const lp = loadLabProgress(), doneLabs = labOrder.filter(id => labs[id] && labStatus(labs[id], lp).state === "done").length;
    if (!list.length) return `<h1>Your dashboard</h1><p class="meta">Every certification you study shows up here with its readiness, exam countdown and what's due.</p>
      <div class="panel startcard"><div class="grow"><strong>Nothing started yet</strong><br><span class="note">Pick a certification and open its plan. It appears here as soon as you answer a question, read a lesson or check off a day.</span></div><a class="btn sm" href="#home">Pick a certification</a></div>`;
    const next = list.filter(x => x.days != null && x.days >= 0).sort((a, b) => a.days - b.days)[0];
    const due = list.reduce((n, x) => n + x.due, 0);
    const flame = st.current ? CertHub.fx.icon("flame", st.current >= 7 ? "flame l3" : st.current >= 3 ? "flame l2" : "flame") : "";
    const saved = CertHub.sync && CertHub.sync.me && CertHub.sync.me.user;
    return `<h1>Your dashboard</h1><p class="meta">${list.length} certification${list.length === 1 ? "" : "s"} in progress. ${saved ? "Saved to your profile." : "Saved in this browser only."}</p>
      ${/* html: fixed markup with esc() */ CertHub.sync ? CertHub.sync.savePrompt() : ""}
      <div class="dashsum">
        <div class="panel"><span class="note">Study streak</span><strong class="dashnum">${flame}<span data-count="${esc(st.current)}">${esc(st.current)}</span> day${st.current === 1 ? "" : "s"}</strong><span class="note">${st.today ? "Studied today." : "Study today to keep it going."}</span></div>
        <div class="panel"><span class="note">Next exam</span><strong class="dashnum">${next ? `<span data-count="${esc(next.days)}">${esc(next.days)}</span> day${next.days === 1 ? "" : "s"}` : "–"}</strong><span class="note">${next ? esc(`${next.c.short} ${next.c.exam}`) : "No upcoming exam date"}</span></div>
        <div class="panel"><span class="note">Reviews due</span><strong class="dashnum"><span data-count="${esc(due)}">${esc(due)}</span></strong><span class="note">${due ? `<a href="#review">Start the daily review</a>` : "All caught up"}</span></div>
        <div class="panel"><span class="note">Badges</span><strong class="dashnum">${CertHub.fx.icon("medal")}<span data-count="${esc(CertHub.achievements ? CertHub.achievements.earned().length : 0)}">${esc(CertHub.achievements ? CertHub.achievements.earned().length : 0)}</span></strong><span class="note"><a href="#achievements">See achievements</a></span></div>
        <div class="panel"><span class="note">Labs finished</span><strong class="dashnum"><span data-count="${esc(doneLabs)}">${esc(doneLabs)}</span></strong><span class="note"><a href="#${doneLabs ? "portfolio" : "labs"}">${doneLabs ? "See your portfolio" : "Browse labs"}</a></span></div>
      </div>
      <div class="dashgrid habits">${CertHub.habits ? CertHub.habits.recapHtml() + CertHub.habits.goalHtml() + CertHub.habits.focusHtml() : ""}</div>
      <h2>Certifications</h2>
      <div class="dashgrid">${list.map(dashCard).join("")}</div>
      <p class="note">Readiness is an estimate from your quizzes, lessons and practice exams, updated when you open a certification. <a href="#home">Add another certification</a>.</p>`;
  }
  // Certifications with saved progress, newest activity first: jump back in.
  function continueHtml() {
    const rows = startedCerts().slice(0, 4);
    if (!rows.length) return "";
    return `<h2>Continue studying</h2><div class="panel">${rows.map(r => `<div class="row"><div class="grow"><a href="#${esc(r.c.id)}.week"><strong>${esc(r.c.short)} ${esc(r.c.exam)}</strong></a><br><span class="note">Week ${esc(r.wk)}${r.days != null && r.days >= 0 ? ` · ${esc(r.days)} days to the exam` : ""}${r.due ? ` · ${esc(r.due)} review${r.due > 1 ? "s" : ""} due` : ""}</span></div><a class="btn sm" href="#${esc(r.c.id)}.week">Today's plan</a></div>`).join("")}
      <div class="btns"><a class="btn ghost sm" href="#dashboard">Open your dashboard</a></div></div>`;
  }
  function trackPicker() {
    const cur = curTrack();
    return `<div class="trackpick" role="group" aria-labelledby="tracks-h">${[["all", "All tracks"], ...TRACKS.map(t => [t.id, t.name])].map(([id, name]) => `<button type="button" class="chipbtn" data-track="${esc(id)}" aria-pressed="${cur === id}">${CertHub.fx.icon(id)}${esc(name)}</button>`).join("")}</div>`;
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
    const chips = (name, list, cur) => `<div class="trackpick" role="group" aria-label="${esc(name)}">${list.map(([k, l]) => `<button type="button" class="chipbtn" data-pick="${name === "Goal" ? "g" : "l"}:${esc(k)}" aria-pressed="${cur === k}">${esc(l)}</button>`).join("")}</div>`;
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
    t.scrollIntoView({ behavior: CertHub.fx.calm() ? "auto" : "smooth" }); t.focus({ preventScroll: true });
  });
  // Reading and sound settings (Appearance): each button sets one saved preference and an attribute on <html>.
  const PREFS = { size: ["certhub:size", "data-size", ["md", "lg", "xl"]], read: ["certhub:easyread", "data-read", ["off", "on"]], contrast: ["certhub:contrast", "data-contrast", ["normal", "more"]], sound: ["certhub:sound", null, ["off", "on"]],
    motion: ["certhub:motion", "data-motion", ["auto", "reduce"]], links: ["certhub:links", "data-links", ["off", "on"]], focusring: ["certhub:focusring", "data-focusring", ["normal", "strong"]],
    keys: ["certhub:keys", null, ["on", "off"]], time: ["certhub:extratime", null, ["1", "1.5", "2"]] };
  const pref = k => { const [key, , vals] = PREFS[k], v = CertHub.store.get(key); return vals.includes(v) ? v : vals[0]; };
  document.addEventListener("click", e => {
    const b = e.target.closest("button[data-pref]"); if (!b) return;
    const [k, v] = b.dataset.pref.split(":"), p = PREFS[k]; if (!p || !p[2].includes(v)) return;
    CertHub.store.set(p[0], v);
    const root = document.documentElement;
    if (p[1]) { const attr = k === "read" ? (v === "on" ? "easy" : "") : v === p[2][0] ? "" : v; if (attr) root.setAttribute(p[1], attr); else root.removeAttribute(p[1]); }
    document.querySelectorAll(`[data-pref^="${k}:"]`).forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    if (k === "sound" && v === "on") CertHub.fx.sound("right");
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

  /* ---------- settings (#settings): every preference in one place, all saved in this browser ---------- */
  const THEME_LABEL = { auto: "Auto", light: "Light", dark: "Dark" };
  const curTheme = () => { const t = CertHub.store.get("certhub:theme"); return THEME_LABEL[t] ? t : "auto"; };
  function storageSummary() {
    const keys = CertHub.store.keys().filter(k => k.startsWith("certhub:"));
    const bytes = keys.reduce((a, k) => a + k.length + (CertHub.store.get(k) || "").length, 0) * 2;
    return { keys: keys.length, kb: Math.max(1, Math.round(bytes / 1024)) };
  }
  const SET_TABS = [["general", "General"], ["accessibility", "Accessibility"], ["study", "Study"], ["data", "Your data"], ["account", "Account"], ["about", "About"]];
  function settingsView(tab) {
    const acct = CertHub.sync && CertHub.sync.enabled, me = acct && CertHub.sync.me, signed = !!(me && me.user);
    const tabs = SET_TABS.filter(([k]) => k !== "account" || acct);
    if (!tabs.some(([k]) => k === tab)) tab = "general";
    const chips = (group, label, cur, opts) => `<div class="trackpick" role="group" aria-label="${esc(label)}">${opts.map(([v, l]) => `<button type="button" class="chipbtn" data-set="${esc(group)}:${esc(v)}" aria-pressed="${cur === v}">${esc(l)}</button>`).join("")}</div>`;
    const prefChips = (k, label, opts, note) => `<p class="pickq">${esc(label)}</p><div class="trackpick" role="group" aria-label="${esc(label)}">${opts.map(([v, l]) => `<button type="button" class="chipbtn" data-pref="${esc(k)}:${esc(v)}" aria-pressed="${pref(k) === v}">${esc(l)}</button>`).join("")}</div>${note ? `<p class="note" data-style="margin:4px 0 0">${esc(note)}</p>` : ""}`;
    const head = `<h1>Settings</h1>
    <p class="meta">Saved in this browser${signed ? " (your study progress also syncs to your account)" : ""}. Changes apply right away.</p>
    <nav class="settabs" aria-label="Settings sections">${tabs.map(([k, l]) => `<a href="#settings.${esc(k)}"${k === tab ? ' aria-current="page"' : ""}>${esc(l)}</a>`).join("")}</nav>`;
    let body = "";
    if (tab === "general") {
      body = `<h2>Appearance</h2>
      <div class="panel">
        <p class="pickq">Theme</p>
        ${chips("theme", "Theme", curTheme(), [["auto", "Match my device"], ["light", "Light"], ["dark", "Dark"]])}
        <p class="pickq">Accent color</p>
        <div class="swatches" role="group" aria-label="Accent color">${CertHub.ACCENTS.map(([k, l, c]) => `<button type="button" class="chipbtn swatch" data-accent="${esc(k)}" aria-pressed="${CertHub.accent() === k}" data-style="--sw:${esc(c)}"><i aria-hidden="true"></i>${esc(l)}</button>`).join("")}</div>
        <p class="note" data-style="margin:8px 0 0">Text size, contrast, motion and more are on the <a href="#settings.accessibility">Accessibility</a> tab.</p>
      </div>
      <h2>Language</h2>
      <div class="panel">
        ${chips("lang", "Language", CertHub.i18n.lang(), [["en", "English"], ["es", "Español"]])}
        <p class="note" data-style="margin:8px 0 0">Spanish covers the interface and, where translated, lessons, questions and labs. The page reloads to switch.</p>
      </div>`;
    } else if (tab === "accessibility") {
      body = `<h2>Seeing and reading</h2>
      <div class="panel">
        ${prefChips("size", "Text size", [["md", "Normal"], ["lg", "Large"], ["xl", "Larger"]], "Browser zoom also works, up to 400 percent, and the layout reflows to fit.")}
        ${prefChips("read", "Easy-read spacing", [["off", "Off"], ["on", "On"]], "A plainer font with wider letter, word and line spacing, which many readers with dyslexia find easier.")}
        ${prefChips("contrast", "Contrast", [["normal", "Normal"], ["more", "High"]], "Darker text, stronger borders and no faint gray text.")}
        ${prefChips("links", "Underline links", [["off", "Off"], ["on", "On"]], "So links don't rely on color alone.")}
        ${prefChips("focusring", "Keyboard focus outline", [["normal", "Standard"], ["strong", "Extra visible"]], "A thicker, two-color outline around whatever has keyboard focus.")}
      </div>
      <h2>Motion and sound</h2>
      <div class="panel">
        ${prefChips("motion", "Animation", [["auto", "Match my device"], ["reduce", "Reduce motion"]], "Reduce motion turns off confetti, fades, count-ups, moving progress bars and smooth scrolling, whatever your device is set to.")}
        ${prefChips("sound", "Sound effects", [["off", "Off"], ["on", "On"]], "Short sounds for right and wrong answers. They stay off while motion is reduced.")}
      </div>
      <h2>Keyboard</h2>
      <div class="panel">
        ${prefChips("keys", "Single-key shortcuts in quizzes", [["on", "On"], ["off", "Off"]], "Turn these off if you use speech input or a screen reader and keys trigger answers by accident. Tab, Enter and Space still work everywhere.")}
        <dl class="terms keys">
          <dt><kbd>A</kbd>–<kbd>D</kbd> or <kbd>1</kbd>–<kbd>4</kbd></dt><dd>Choose an answer</dd>
          <dt><kbd>Enter</kbd> or <kbd>N</kbd></dt><dd>Next question</dd>
          <dt><kbd>B</kbd></dt><dd>Previous question (tests)</dd>
          <dt><kbd>F</kbd></dt><dd>Flag a question for review (tests)</dd>
          <dt><kbd>G</kbd></dt><dd>Mark an answer as a guess</dd>
        </dl>
      </div>
      <h2>Timed tests</h2>
      <div class="panel">
        ${prefChips("time", "Extra time", [["1", "Standard"], ["1.5", "Time and a half"], ["2", "Double time"]], "Applies to checkpoints, practice exams and the placement test. If you need extra time on the real exam, ask the exam provider for testing accommodations well before you book: CompTIA, ISC2, Cisco, Microsoft, AWS and the others all have a request process.")}
      </div>
      <h2>Also built in</h2>
      <div class="panel"><ul class="clean">
        <li>Works with screen readers (VoiceOver, NVDA, JAWS, TalkBack) and keyboard only. Every page has a "Skip to content" link.</li>
        <li>Listen mode reads lessons aloud, and overview videos can be played with the device's voice.</li>
        <li>Light and dark themes, and colors checked for contrast in both.</li>
        <li>Charts and colored domain labels always have text as well.</li>
      </ul>
      <p class="note" data-style="margin:0">Something hard to use? <a href="${esc(CertHub.reportUrl("Accessibility problem", "Page:\\nWhat you use (screen reader, zoom, keyboard, voice…):\\nWhat went wrong:"))}" target="_blank" rel="noopener">Report an accessibility problem</a>.</p></div>`;
    } else if (tab === "study") {
      const name = CertHub.store.get("certhub:name") || "";
      body = `<h2>Weekly goal</h2>
      ${CertHub.habits ? CertHub.habits.goalHtml() : ""}
      <h2>Reminders and certificates</h2>
      <div class="panel">
        <div class="row"><div class="grow"><strong>Daily reminder</strong><br><span class="note">Adds a repeating event to your calendar app. Nothing is sent to us.</span></div><button type="button" class="btn ghost sm" data-gact="reminder">Add to calendar</button></div>
        <div class="row"><div class="grow"><label for="set-name"><strong>Name on certificates of completion</strong></label><br><span class="note">Shown on the certificates you can print when you finish a plan.</span>
          <input type="text" id="set-name" class="textin" maxlength="60" autocomplete="name" value="${esc(name)}" placeholder="Your name"></div></div>
      </div>`;
    } else if (tab === "data") {
      const st = storageSummary();
      body = `<h2>Backups</h2>
      <div class="panel">
        <p class="note" data-style="margin:0">This browser holds ${/* num */ st.keys} saved item${st.keys === 1 ? "" : "s"} (about ${/* num */ st.kb} KB): progress, lab notes, badges and settings. Back up to move them to another device or browser.</p>
        <div class="btns"><button type="button" class="btn ghost sm no-framed" data-gact="download">Download backup</button><button type="button" class="btn ghost sm" data-gact="copybackup">Copy backup</button><label class="btn ghost sm" for="imp">Restore from file</label><input type="file" id="imp" accept="application/json" class="hide"><button type="button" class="btn ghost sm" data-gact="pasterestore">Restore from text</button></div>
      </div>
      <h2>Erase</h2>
      <div class="panel"><div class="row dangerrow"><div class="grow"><strong>Erase everything on this device</strong><br><span class="note">Removes all progress, notes, badges and settings from this browser. ${signed ? "Your account keeps its copy, and it syncs back here the next time you sign in on this browser." : "This can't be undone, so download a backup first."}</span></div><button type="button" class="btn ghost sm danger" data-set="erase:all">Erase</button></div></div>`;
    } else if (tab === "account") {
      body = `<h2>Account</h2><div class="panel">${signed
        ? `<div class="row"><div class="grow"><strong class="nocap">${esc(me.user.displayName || me.user.email)}</strong><br><span class="note">${esc(me.user.email)}</span></div><a class="btn ghost sm" href="#profile">Profile</a></div>
           <div class="row"><div class="grow"><strong>Sign-in, devices, sync and Pro</strong><br><span class="note">Passkeys, connected Google, Facebook or LinkedIn, signed-in devices, download or delete account data.</span></div><a class="btn ghost sm" href="#account">Account settings</a></div>`
        : `<div class="row"><div class="grow"><strong>Optional account</strong><br><span class="note">Sync your progress across devices. Sign in with Google, Facebook, LinkedIn or your email.</span></div><span class="btns" data-style="margin:0"><a class="btn sm" href="#login">Log in</a><a class="btn ghost sm" href="#signup">Sign up</a></span></div>`}</div>`;
    } else {
      body = `<h2>App and about</h2>
      <div class="panel">
        <div class="row"><div class="grow"><strong>Install the app</strong><br><span class="note">Add StudyToCert to your home screen and study offline.</span></div><a class="btn ghost sm" href="#install">Install</a></div>
        <div class="row"><div class="grow"><strong>What's new</strong><br><span class="note">Recent additions and fixes.</span></div><a class="btn ghost sm" href="#whats-new">See what's new</a></div>
        <div class="row"><div class="grow"><strong>Privacy, terms and security</strong><br><span class="note">What's stored, where, and how it's protected.</span></div><span class="btns" data-style="margin:0"><a class="btn ghost sm" href="#privacy">Privacy</a><a class="btn ghost sm" href="#terms">Terms</a><a class="btn ghost sm" href="#security">Security</a></span></div>
        <div class="row"><div class="grow"><strong>Report a problem</strong><br><span class="note">Found a mistake in a lesson or question, or something broken?</span></div><a class="btn ghost sm" href="${esc(CertHub.reportUrl("Problem report", "Page:\\nWhat happened:\\nWhat you expected:"))}" target="_blank" rel="noopener">Report</a></div>
      </div>`;
    }
    return head + body;
  }
  document.addEventListener("click", async e => {
    const b = e.target.closest("button[data-set]"); if (!b) return;
    const [k, v] = b.dataset.set.split(":");
    if (k === "theme" && THEME_LABEL[v]) {
      CertHub.store.set("certhub:theme", v); CertHub.applyTheme(v);
      const t = document.getElementById("theme"); if (t) { t.textContent = THEME_LABEL[v]; t.setAttribute("aria-label", `Color theme: ${THEME_LABEL[v]}. Change theme`); }
      document.querySelectorAll('[data-set^="theme:"]').forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    }
    if (k === "lang" && (v === "en" || v === "es") && v !== CertHub.i18n.lang()) CertHub.i18n.set(v);
    if (k === "erase") {
      if (!(await ui.confirm("Erase all progress, notes, badges and settings saved in this browser? This can't be undone.", { ok: "Erase everything", cancel: "Cancel", danger: true }))) return;
      CertHub.store.keys().forEach(x => CertHub.store.remove(x));
      location.hash = "home"; location.reload();
    }
  });
  document.addEventListener("change", e => {
    if (e.target.id !== "set-name") return;
    CertHub.store.set("certhub:name", e.target.value.trim()); ui.toast("Name saved.");
  });

  /* ---------- for teachers, schools and bootcamps ---------- */
  function schoolsView() {
    const n = CertHub.catalog.filter(id => certs[id]).length, fb = CertHub.reportUrl("Using StudyToCert in a class", "School or program:\nCertifications you teach:\nWhat would help:");
    const item = (h, t, href, link) => `<div class="panel"><strong>${esc(h)}</strong><p class="note" data-style="margin:4px 0 0">${esc(t)}${href ? ` <a href="${esc(href)}">${esc(link)}</a>` : ""}</p></div>`;
    return `<h1>For teachers, schools and bootcamps</h1>
      <p class="meta">StudyToCert is free to use in class: no accounts for students, no ads and no tracking. Everything runs in the browser, and students' progress stays on their own devices.</p>
      <h2>What you can use</h2>
      <div class="dashgrid">
        ${item(`Week-by-week plans for ${n} certifications`, "Each plan has lessons, a quiz per week, timed checkpoints and a practice exam weighted like the real one. Point students at the week you're teaching.", "#home", "Browse certifications")}
        ${item("Printable materials", "Cheat sheets, key-term flashcards to cut out and a study planner, all ready to print or save as PDF.", "#security-plus.cheat", "See a cheat sheet")}
        ${item("Hands-on labs without installs", "Real Linux servers run in the browser for Linux+, Security+, CySA+ and Network+ practice, with graded labs checked inside the machine.", "#vm", "Open the practice VMs")}
        ${item("Blue-team exercises for class discussion", "Log puzzles and incident response tabletops work well projected on a screen: the class decides each step, then reads why.", "#tabletop", "Try a tabletop")}
        ${item("Quick games for warm-ups", "Sixty-second rounds on subnetting, ports, acronyms, OSI layers and commands.", "#games", "Play a game")}
        ${item("Works offline and on phones", "Students can install it like an app and keep studying without a connection.", "#install", "How to install")}
      </div>
      <h2>Good to know</h2>
      <div class="panel"><ul class="clean">
        <li>Students can back up their progress to a file and restore it on another device.</li>
        <li>Practice questions are written from the official exam objectives, not copied from real exams.</li>
        <li>This site isn't affiliated with any certification vendor, and it isn't an official training partner.</li>
      </ul></div>
      ${fb ? `<p><a class="btn" href="${esc(fb)}" target="_blank" rel="noopener">Tell us how you use it</a></p>` : ""}`;
  }
  /* ---------- exam changes: every certification's current notices and when it was last checked ---------- */
  function examChangesView() {
    const list = CertHub.catalog.map(id => certs[id]).filter(Boolean);
    const withNotes = list.map(c => ({ c, notes: CertHub.activeNotices(c) })).filter(x => x.notes.length);
    const fmt = d => { try { return U.parseD(d).toLocaleDateString(CertHub.i18n.lang() === "es" ? "es" : "en", { year: "numeric", month: "short", day: "numeric" }); } catch (e) { return d; } };
    return `<h1>Exam changes</h1><p class="meta">New exam versions, retirements and other changes that affect what you study, for every certification on this site. Always confirm dates with the vendor before you book.</p>
      <h2>Current notices</h2>
      ${withNotes.length ? withNotes.map(x => `<div class="panel"><div class="flex"><a href="#${esc(x.c.id)}.about"><strong>${esc(x.c.short || x.c.name)} ${esc(x.c.exam)}</strong></a><span class="note">${esc(x.c.vendor)}</span></div>${x.notes.map(n => `<p data-style="margin:6px 0 0">${esc(n.text)}</p>`).join("")}</div>`).join("") : `<p class="note">No current notices.</p>`}
      <h2>When each certification was last checked</h2>
      <div class="panel tablewrap"><table class="plain"><thead><tr><th scope="col">Certification</th><th scope="col">Exam</th><th scope="col">Last checked</th><th scope="col">Domain weights</th></tr></thead><tbody>
        ${list.map(c => `<tr><td><a href="#${esc(c.id)}">${esc(c.short || c.name)}</a></td><td>${esc(c.exam)}</td><td>${c.lastVerified ? esc(fmt(c.lastVerified)) : "–"}</td><td>${c.status === "verified" ? "Verified" : "To confirm"}</td></tr>`).join("")}
      </tbody></table></div>
      <p class="note">Spotted a change we missed? Use "Report a mistake" on any lesson or question.</p>`;
  }
  /* ---------- what's new (data/news.js) ---------- */
  const NEWS = () => (Array.isArray(CertHub.news) ? CertHub.news : []).filter(n => n && /^\d{4}-\d{2}-\d{2}$/.test(n.date) && n.title && Array.isArray(n.items));
  const newsDate = d => { try { return new Date(d + "T12:00:00").toLocaleDateString(CertHub.i18n.lang() === "es" ? "es" : "en", { year: "numeric", month: "long", day: "numeric" }); } catch (e) { return d; } };
  // Spanish mode shows each entry's own Spanish text (marked as content so the interface dictionary leaves it alone).
  const loc = n => CertHub.i18n.lang() === "es" && n.es && n.es.title && Array.isArray(n.es.items) ? n.es : n;
  function newsView() {
    return `<h1>What's new</h1><p class="meta">New certifications, features and content, newest first.</p>
    ${NEWS().map(n => { const t = loc(n); return `<section class="panel"${t !== n ? " data-content" : ""}><p class="note" data-style="margin:0">${esc(newsDate(n.date))}</p><h2 data-style="margin-top:4px">${esc(t.title)}</h2><ul class="clean">${t.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul></section>`; }).join("")}`;
  }
  function newsCard() {
    const n = NEWS()[0]; if (!n) return "";
    const t = loc(n);
    return `<p class="note newsline"><strong>New:</strong> <span${t !== n ? " data-content" : ""}>${esc(t.title)}.</span> <a href="#whats-new">See what's new</a></p>`;
  }

  // The home page's illustration: a path through the career tracks to a certification, with a dot travelling it.
  function heroArt() {
    const node = (x, y, ico, c) => `<g class="node" data-style="--c:var(${/* safe: a fixed color token */ c})"><circle cx="${/* num */ x}" cy="${/* num */ y}" r="17"/><g transform="translate(${x - 10} ${y - 10})">${CertHub.fx.icon(ico)}</g></g>`;
    return `<div class="heroart" aria-hidden="true"><svg viewBox="0 0 420 285" focusable="false">
      <path class="path" d="M30 250 C 110 250, 90 170, 170 170 S 250 90, 330 90 S 380 30, 390 20"/>
      <path class="flow" d="M30 250 C 110 250, 90 170, 170 170 S 250 90, 330 90 S 380 30, 390 20"/>
      <circle class="traveler" r="6"/>
      <g class="node" data-style="--c:var(--d0)"><circle cx="30" cy="250" r="9"/></g>
      ${node(100, 210, "network", "--d1")}${node(170, 170, "cybersecurity", "--d2")}${node(250, 130, "cloud", "--d3")}${node(330, 90, "data-ai", "--d5")}
      <g class="node goal"><circle cx="390" cy="20" r="19"/><g transform="translate(380 10)">${CertHub.fx.icon("medal")}</g></g>
      <text x="30" y="278" text-anchor="middle">Start</text><text x="360" y="58" text-anchor="middle">Certified</text>
    </svg></div>`;
  }
  function homeView() {
    const lp = loadLabProgress();
    const labList = labOrder.map(id => labs[id]);
    const doneLabs = labList.filter(l => labStatus(l, lp).state === "done").length;
    const start = labs["lab-home-lab"];
    const nCerts = CertHub.catalog.filter(id => certs[id]).length;
    return `<section class="hero withart"><div>
      <h1>Study to certify: free plans for ${nCerts} IT, cloud and cybersecurity certifications</h1>
      <p class="meta">Pick a certification and get a week-by-week plan: short lessons, hands-on labs, quizzes, timed checkpoints, a practice exam weighted like the real one and spaced review. No sign-up and no ads. Your progress stays in your browser.</p>
      ${newsCard()}
      <div class="btns"><button type="button" class="btn" data-jump="pick">Pick your first certification</button><button type="button" class="btn ghost" data-jump="tracks-h">See all ${nCerts} certifications</button><a class="btn ghost" href="#labs">Browse ${labList.length} labs</a>${doneLabs ? `<a class="btn ghost" href="#portfolio">Your portfolio (${doneLabs})</a>` : ""}</div>
    </div>
      ${heroArt()}
    </section>
    ${CertHub.install.installed() ? "" : `<div class="panel installcard"><div class="grow"><strong>Get the app on your phone</strong><br><span class="note">Install it from your browser: it opens full screen and works offline. No app store needed.</span></div><div class="btns" data-style="margin:0">${CertHub.install.prompt ? `<button type="button" class="btn sm" data-gact="install">Install</button>` : ""}<a class="btn ghost sm" href="#install">How to install</a></div></div>`}
    ${CertHub.review ? CertHub.review.homeCard() : ""}
    <div class="panel installcard gamescard"><div class="grow"><strong>Quick games</strong><br><span class="note">Sixty-second rounds on subnetting, ports, acronyms, OSI layers and commands.</span></div><a class="btn ghost sm" href="#games">Play</a></div>
    ${continueHtml()}
    ${pickerHtml()}
    <h2 id="tracks-h">Certifications by career track</h2>
    <p class="note"><a href="#careers">Career paths</a>: which certification to take first, the jobs each track leads to, and interview practice. <a href="#exam-day">Exam-day guides</a>: scoring, question types and what to expect on test day. <a href="#exam-changes">Exam changes</a>: new versions and retirements.</p>
    ${trackPicker()}
    <div id="trackcards">${trackCards()}</div>
    <h2>Your progress</h2>
    <p class="note"><a href="#dashboard">Your dashboard</a>: readiness, exam countdowns and reviews for every certification you're studying, on one page. <a href="#achievements">Achievements</a>: badges for streaks, scores, labs and games.</p>
    ${(() => { const st = CertHub.activity.streak(); return `<div class="panel startcard"><div class="grow"><strong>${st.current ? `${CertHub.fx.icon("flame", st.current >= 7 ? "flame l3" : st.current >= 3 ? "flame l2" : "flame")} ${esc(st.current)}-day study streak` : "Start a study streak"}</strong><br><span class="note">${st.current ? (st.today ? "You studied today. " : "Study today to keep it going. ") : "Answer a question or read a lesson each day. "}${st.best ? `Best: ${esc(st.best)} days.` : ""}</span></div><button type="button" class="btn ghost sm" data-gact="reminder">Set a daily reminder</button></div>`; })()}
    <div class="panel">
      ${/* html: fixed markup with esc() */ CertHub.sync ? CertHub.sync.savePrompt() : ""}
      <p class="note" data-style="margin:0">${CertHub.sync && CertHub.sync.me && CertHub.sync.me.user ? "Your work is saved to your profile and in this browser. You can also download a backup." : "Progress, lab notes and checkmarks are saved in this browser only. Nothing is sent anywhere unless you save them to a profile. Back up to move them to another device."}</p>
      <div class="btns"><button type="button" class="btn ghost sm no-framed" data-gact="download">Download backup</button><button type="button" class="btn ghost sm" data-gact="copybackup">Copy backup</button><label class="btn ghost sm" for="imp">Restore from file</label><input type="file" id="imp" accept="application/json" class="hide"><button type="button" class="btn ghost sm" data-gact="pasterestore">Restore from text</button></div>
    </div>
    ${newsHtml()}
    <div class="panel installcard"><div class="grow"><strong>Settings</strong><br><span class="note">Theme, accent color, text size, language, weekly goal, sounds and backups.</span></div><a class="btn ghost sm" href="#settings">Open settings</a></div>
`;
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
    $("#tabs").innerHTML = navItems().map(([k, l]) => `<a role="tab" href="#${esc(k)}" aria-selected="${cur === k}">${esc(l)}</a>`).join("");
    $("#count").innerHTML = "";
  }
  // Route tokens come from the URL, so only look them up as the objects' own keys
  // (never inherited ones like "constructor" or "__proto__").
  const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  const POLICY_TITLES = { privacy: "Privacy Policy", terms: "Terms of Use", security: "Security", install: "Install the App", support: "Support" };
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
  const LIGHT = new Set(["home", "dashboard", "achievements", "exam-changes", "schools", "whats-new", "review", "privacy", "terms", "security", "install", "support", "exam-day", "account", "login", "signup", "profile", "settings"]);
  function route() {
    let raw = "";
    try { raw = decodeURIComponent(location.hash.replace(/^#/, "")); } catch (e) { raw = ""; }
    raw = raw || document.body.dataset.route || "home";
    let [head, tab] = raw.split(".");
    if (!/^[a-z0-9-]{1,64}$/.test(head || "")) head = "home";
    if (tab && !/^([a-z]{1,16}|video-l[a-z0-9]{1,14})$/.test(tab)) tab = "";
    // The home page and a few light pages only need the lab index; everything else waits for the full labs.
    if ((!CertHub.labsLoaded() && !LIGHT.has(head) && !/^(vm|games?|log-puzzles|tabletop|net-design)(-|$)/.test(head)) || (own(certs, head) && certs[head].lite)) {
      $("#app").innerHTML = `${CertHub.fx.skeleton()}`;
      const want = location.hash;
      Promise.all([CertHub.loadLabs(), own(certs, head) ? CertHub.loadPlan(head) : true]).then(r => {
        if (location.hash !== want) return;
        if (r.every(Boolean)) route(); else $("#app").innerHTML = `<p class="meta" role="status">This page couldn't load. Check your connection and try again.</p>`;
      });
      return;
    }
    const prev = view;
    if (prev.startsWith("lab-") || prev.startsWith("cap-")) CertHub.labViews.leave();
    if (/^vm(-|$)/.test(prev) && CertHub.vm) CertHub.vm.leave();
    if (/^games?(-|$)/.test(prev) && CertHub.games) CertHub.games.leave();
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
      else if ((head === "login" || head === "signup") && CertHub.accountViews) { topNav("account"); $("#app").innerHTML = CertHub.accountViews.login(head); title = head === "signup" ? "Sign Up" : "Log In"; view = head; }
      else if (head === "profile" && CertHub.accountViews) { topNav("account"); CertHub.accountViews.profile(); title = "Your Profile"; view = head; }
      else if (head === "account" && CertHub.accountViews) { topNav("account"); $("#app").innerHTML = CertHub.accountViews.account(); title = "Account"; view = "account"; }
      else if (/^join-[a-km-np-z2-9]{10}$/.test(head) && CertHub.accountViews) { topNav("account"); CertHub.accountViews.join(head.slice(5)); title = "Join a Class"; view = head; }
      else if (/^class-[0-9a-f]{24}$/.test(head) && CertHub.accountViews) { topNav("account"); CertHub.accountViews.classRoster(head.slice(6)); title = "Class Roster"; view = head; }
      else if (/^cohort-[0-9a-f]{24}$/.test(head) && CertHub.accountViews) { topNav("account"); CertHub.accountViews.cohort(head.slice(7)); title = "Cohort Progress"; view = head; }
      else if (/^cap-[a-z0-9-]{1,60}$/.test(head) && CertHub.pro) { topNav("labs"); CertHub.pro.capstoneView(head); title = "Capstone project"; view = head; }
      else if (head === "frameworks" && CertHub.frameworksView) { topNav("frameworks"); $("#app").innerHTML = CertHub.frameworksView(); title = "Frameworks"; view = "frameworks"; }
      else if ((head === "exam-day" || /^exam-day-[a-z]{2,20}$/.test(head)) && CertHub.examDay) { topNav("careers"); CertHub.examDay.show(head); title = "Exam-Day Guides"; view = head; }
      else if ((head === "careers" || head === "job-outlook" || /^career-[a-z]{2,20}$/.test(head)) && CertHub.careerViews) { topNav("careers"); CertHub.careerViews.show(head); title = "Career Paths"; view = head; }
      else if (head === "vm" || /^vm-(net|exam|lab-[a-z0-9-]{1,40})$/.test(head)) {
        topNav("labs"); view = head;
        if (CertHub.vm) title = CertHub.vm.show(head);
        else { title = "Practice VMs"; $("#app").innerHTML = `${CertHub.fx.skeleton()}`; CertHub.loadScript("assets/vm.js").then(ok => { if (location.hash === "#" + head && CertHub.vm) document.title = `${CertHub.vm.show(head)} · StudyToCert`; else if (!ok) $("#app").innerHTML = `<p class="meta" role="status">This page couldn't load. Check your connection and try again.</p>`; }); }
      }
      else if (head === "achievements" && CertHub.achievements) { topNav("home"); $("#app").innerHTML = CertHub.achievements.view(); title = "Achievements"; view = head; }
      else if (head === "schools") { topNav(""); $("#app").innerHTML = schoolsView(); title = "For Teachers and Schools"; view = head; }
      else if (head === "exam-changes") { topNav("home"); $("#app").innerHTML = examChangesView(); title = "Exam Changes"; view = head; }
      else if (head === "dashboard") { topNav("home"); $("#app").innerHTML = dashboardView(); title = "Your Dashboard"; view = head; }
      else if (head === "games" || /^game-[a-z]{2,20}$/.test(head)) {
        topNav("labs"); view = head;
        if (CertHub.games) title = CertHub.games.show(head);
        else { title = "Quick Games"; $("#app").innerHTML = `${CertHub.fx.skeleton()}`; CertHub.loadScript("assets/games.js").then(ok => { if (location.hash === "#" + head && CertHub.games) document.title = `${CertHub.games.show(head)} · StudyToCert`; else if (!ok) $("#app").innerHTML = `<p class="meta" role="status">This page couldn't load. Check your connection and try again.</p>`; }); }
      }
      else if (head === "net-design") {
        topNav("labs"); view = head;
        if (CertHub.netdesign) title = CertHub.netdesign.show();
        else { title = "Network Design Puzzles"; $("#app").innerHTML = `${CertHub.fx.skeleton()}`; CertHub.loadScript("assets/netdesign.js").then(ok => { if (location.hash === "#" + head && CertHub.netdesign) document.title = `${CertHub.netdesign.show()} · StudyToCert`; else if (!ok) $("#app").innerHTML = `<p class="meta" role="status">This page couldn't load. Check your connection and try again.</p>`; }); }
      }
      else if (head === "log-puzzles" || head === "tabletop" || /^tabletop-[a-z-]{2,30}$/.test(head)) {
        topNav("labs"); view = head;
        if (CertHub.blueteam) title = CertHub.blueteam.show(head);
        else { title = "Blue-team practice"; $("#app").innerHTML = `${CertHub.fx.skeleton()}`; CertHub.loadScript("assets/blueteam.js").then(ok => { if (location.hash === "#" + head && CertHub.blueteam) document.title = `${CertHub.blueteam.show(head)} · StudyToCert`; else if (!ok) $("#app").innerHTML = `<p class="meta" role="status">This page couldn't load. Check your connection and try again.</p>`; }); }
      }
      else if (head === "settings") { topNav(""); $("#app").innerHTML = settingsView(tab); title = tab === "accessibility" ? "Accessibility Settings" : "Settings"; view = head; }
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
    if (CertHub.achievements) setTimeout(() => { try { CertHub.achievements.checkNew(); if (CertHub.habits) CertHub.habits.check(); } catch (e) {} }, 600);
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
    if (e.target.id !== "imp" || (view !== "home" && view !== "settings") || !e.target.files[0]) return;
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
  // Tab bars scroll sideways on phones: keep the selected tab in view and fade the edges that have more tabs past them.
  function tabBar() {
    const nav = document.getElementById("tabs"); if (!nav) return;
    const fade = () => { const max = nav.scrollWidth - nav.clientWidth; nav.classList.toggle("fl", nav.scrollLeft > 4); nav.classList.toggle("fr", max > 4 && nav.scrollLeft < max - 4); };
    const show = () => {
      const t = nav.querySelector('[aria-selected="true"]');
      if (t && nav.scrollWidth > nav.clientWidth) nav.scrollLeft = t.offsetLeft - nav.offsetLeft - (nav.clientWidth - t.offsetWidth) / 2;
      fade();
    };
    nav.addEventListener("scroll", fade, { passive: true });
    window.addEventListener("resize", fade);
    new MutationObserver(show).observe(nav, { childList: true, subtree: true, attributes: true, attributeFilter: ["aria-selected"] });
    show();
  }
  // Browser-tab titles in title case, whichever script sets them: the first letter of every word capitalized.
  const titleCase = t => t.replace(/(^|[\s(“"/·:])(\p{Ll})/gu, (m, a, b) => a + b.toUpperCase());
  function titleCaseTitles() {
    const el = document.querySelector("title"); if (!el) return;
    const fix = () => { const t = titleCase(document.title); if (t !== document.title) document.title = t; };
    new MutationObserver(fix).observe(el, { childList: true, characterData: true, subtree: true }); fix();
  }
  CertHub.titleCase = titleCase;
  document.addEventListener("DOMContentLoaded", () => { CertHub.themeButton(); langButton(); tabBar(); titleCaseTitles(); CertHub.i18n.start().then(route, route); });
})();
