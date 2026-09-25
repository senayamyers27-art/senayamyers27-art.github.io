/* Shared helpers for the home page and every certification page. */
(function () {
  const DAY = 86400000;
  const certs = {};
  // Where the site's files live (pages can be at / or /<cert>/), taken from this script's own URL.
  const BASE = ((document.currentScript && document.currentScript.src) || "").replace(/assets\/core\.js(\?.*)?$/, "");
  // Question banks load on demand: data/gen/<id>-q.js calls CertHub.addQuestions when it arrives.
  const qWaiting = {};
  function loadQuestions(id) {
    const c = certs[id];
    if (!c) return Promise.resolve(null);
    if (Array.isArray(c.questions)) return Promise.resolve(c.questions);
    if (!qWaiting[id]) {
      const w = {};
      w.promise = new Promise((resolve, reject) => { w.resolve = resolve; w.reject = reject; });
      qWaiting[id] = w;
      const s = document.createElement("script");
      s.src = `${BASE}data/gen/${id}-q.js`;
      s.async = true;
      s.onerror = () => { delete qWaiting[id]; s.remove(); w.reject(new Error("Couldn't load the questions. Check your connection and try again.")); };
      document.head.appendChild(s);
    }
    return qWaiting[id].promise;
  }
  function addQuestions(id, qs) {
    if (!certs[id] || !Array.isArray(qs)) return;
    certs[id].questions = qs;
    certs[id].qCount = qs.length;
    const w = qWaiting[id];
    if (w && w.resolve) w.resolve(qs);
  }

  // Lessons (free teaching text for each plan topic) load on demand too: data/lessons/<id>.js
  // calls CertHub.addLessons. Certifications without lessons yet resolve to null.
  const lessons = {}, lWaiting = {};
  function loadLessons(id) {
    if (!certs[id] || !certs[id].hasLessons) return Promise.resolve(null);
    if (lessons[id]) return Promise.resolve(lessons[id]);
    if (!lWaiting[id]) {
      lWaiting[id] = new Promise(resolve => {
        const s = document.createElement("script");
        s.src = `${BASE}data/lessons/${id}.js`;
        s.async = true;
        s.onload = () => loadDiagrams().then(() => resolve(lessons[id] || null));
        s.onerror = () => { delete lWaiting[id]; s.remove(); resolve(null); };
        document.head.appendChild(s);
      });
    }
    return lWaiting[id];
  }
  // Diagrams (data/diagrams.js) are shared by all certifications and attached to lessons by topic text.
  const diagrams = {}; let dWaiting = null;
  function loadDiagrams() {
    if (!dWaiting) dWaiting = new Promise(resolve => {
      const s = document.createElement("script");
      s.src = `${BASE}data/diagrams.js`; s.async = true;
      s.onload = () => resolve(diagrams); s.onerror = () => { s.remove(); resolve(diagrams); };
      document.head.appendChild(s);
    });
    return dWaiting;
  }
  function addDiagrams(list) {
    (Array.isArray(list) ? list : []).forEach(d => {
      if (!d || !/^[a-z0-9-]+$/.test(d.id || "") || typeof d.svg !== "string") return;
      for (const [cid, ts] of Object.entries(d.topics || {})) (ts || []).forEach(t => { const k = cid + "|" + t; (diagrams[k] = diagrams[k] || []).push(d); });
    });
  }
  const diagramsFor = (cid, t) => diagrams[cid + "|" + t] || [];
  // Lessons are matched to plan topics by their exact topic text.
  function addLessons(id, list) {
    if (!Array.isArray(list)) return;
    lessons[id] = new Map(list.filter(l => l && typeof l.t === "string").map(l => [l.t, l]));
  }

  const U = {
    DAY,
    $: s => document.querySelector(s),
    esc: s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])),
    today() { const d = new Date(); d.setHours(0, 0, 0, 0); return d; },
    iso(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; },
    parseD(s) { const [y, m, d] = String(s).split("-").map(Number); return new Date(y, m - 1, d); },
    addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; },
    fmt: d => d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    fmtLong: d => d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
    shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
    nextMonday(d) { const x = new Date(d); const k = (8 - x.getDay()) % 7 || 7; x.setDate(x.getDate() + k); return x; },
    dc: n => n ? `var(--d${((n - 1) % 9) + 1})` : "var(--d0)"
  };

  /* ---------- storage (every read and write may throw in private mode) ---------- */
  const KEY = id => "certhub:v1:" + id;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
    keys() { try { return Object.keys(localStorage).filter(k => k.startsWith("certhub:")); } catch (e) { return []; } }
  };
  function freshProgress() { return { checks: {}, stats: {}, review: {}, read: {}, history: [], start: null, examDate: null }; }
  function loadProgress(id) {
    const p = freshProgress();
    try { const raw = store.get(KEY(id)); if (raw) Object.assign(p, JSON.parse(raw)); } catch (e) {}
    return p;
  }
  // Tell the sync module (if an account is signed in) that a document changed.
  const changed = key => { try { if (window.CertHub && CertHub.sync) CertHub.sync.changed(key); } catch (e) {} };
  function saveProgress(id, p) { const ok = store.set(KEY(id), JSON.stringify(p)); changed(KEY(id)); return ok; }

  /* ---------- plan ---------- */
  // Hand-written weeks are used as-is. Otherwise the last week is a final review and the
  // rest are spread across domains by weight (largest remainder, at least one each).
  function allocate(domains, n) {
    const total = domains.reduce((a, d) => a + d.w, 0) || 1;
    const k = domains.length;
    if (n <= k) return domains.map(() => 1);
    const raw = domains.map(d => 1 + (n - k) * d.w / total);
    const out = raw.map(Math.floor);
    let left = n - out.reduce((a, b) => a + b, 0);
    raw.map((r, i) => [r - Math.floor(r), i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (left > 0) { out[i]++; left--; } });
    return out;
  }
  function split(arr, parts) {
    arr = arr || [];
    const out = [];
    for (let i = 0; i < parts; i++) out.push(arr.slice(Math.floor(i * arr.length / parts), Math.floor((i + 1) * arr.length / parts)));
    return out;
  }
  function buildPlan(c) {
    const map = (window.CertHub && window.CertHub.labMap || {})[c.id] || {};
    if (c.weeks) {
      return {
        weeks: c.weeks.map((w, i) => ({ n: i + 1, labRefs: (map.weeks || {})[i + 1] || [], ...w })),
        checkpoints: c.checkpoints || [],
        phases: c.phases || [[1, c.weeks.length, "Plan"]]
      };
    }
    const total = Math.max(c.planWeeks || 12, c.domains.length + 1);
    const counts = allocate(c.domains, total - 1);
    const weeks = [], checkpoints = [], phases = [];
    c.domains.forEach((d, di) => {
      const k = counts[di];
      const labRefs = d.labRefs || (map.domains || {})[d.id] || [];
      const topics = split(d.topics, k), study = split((c.study || {})[d.id], k), refs = split(labRefs, k);
      const first = weeks.length + 1;
      for (let j = 0; j < k; j++) {
        const labs = d.labs || [];
        weeks.push({
          n: weeks.length + 1,
          dom: d.id,
          title: k > 1 ? `${d.name} (${j + 1} of ${k})` : d.name,
          obj: (d.notes && d.notes[0]) || `Domain ${d.id}`,
          topics: topics[j].length ? topics[j] : d.topics || [],
          notes: d.notes || [],
          lab: labs.length ? labs[j % labs.length] : "Summarize this week's topics in your own words on one page.",
          study: study[j] || [],
          // Each week of a domain gets its share of the domain's labs; if there are fewer
          // labs than weeks, later weeks continue with the domain's labs in turn.
          labRefs: refs[j] && refs[j].length ? refs[j] : labRefs.length ? [labRefs[j % labRefs.length]] : [],
          checkpoint: j === k - 1
        });
      }
      checkpoints.push({ after: weeks.length, dom: d.id });
      phases.push([first, weeks.length, `Domain ${d.id}: ${d.name}`]);
    });
    const f = c.final || {};
    weeks.push({
      n: weeks.length + 1, dom: 0,
      title: "Full practice exams and final review",
      obj: "All domains",
      topics: f.topics || [
        `Two full timed practice exams (${c.examSim.questions} questions, ${c.examSim.minutes} minutes)`,
        "Review every miss, then re-quiz until the review queue is empty",
        "Re-drill your weakest domain from the Progress tab",
        "Exam logistics: ID, check-in rules, time budget per question"
      ],
      notes: ["All domains", "Your review queue and weakest domain"],
      lab: f.lab || "Target 85% or better on both practice exams before you book the real one.",
      study: f.study || []
    });
    phases.push([weeks.length, weeks.length, "Final review"]);
    return { weeks, checkpoints, phases };
  }

  /* ---------- theme ---------- */
  const THEMES = ["auto", "light", "dark"];
  function applyTheme(t) {
    const root = document.documentElement;
    if (t === "light" || t === "dark") root.setAttribute("data-theme", t); else root.removeAttribute("data-theme");
  }
  function themeButton() {
    const b = document.getElementById("theme");
    if (!b) return;
    const cur = () => store.get("certhub:theme") || "auto";
    const label = () => { b.textContent = { auto: "Auto", light: "Light", dark: "Dark" }[cur()]; b.setAttribute("aria-label", `Color theme: ${b.textContent}. Change theme`); };
    label();
    b.addEventListener("click", () => {
      const next = THEMES[(THEMES.indexOf(cur()) + 1) % THEMES.length];
      store.set("certhub:theme", next); applyTheme(next); label();
    });
  }

  /* ---------- backup (progress lives only in this browser) ---------- */
  function backupText() {
    const data = {};
    store.keys().forEach(k => { data[k] = store.get(k); });
    return JSON.stringify({ app: "certhub", v: 1, at: new Date().toISOString(), data }, null, 1);
  }
  function restoreText(text) {
    const j = JSON.parse(text);
    if (j.app !== "certhub" || typeof j.data !== "object") throw new Error("That isn't a progress backup from this site.");
    let n = 0;
    Object.entries(j.data).forEach(([k, v]) => { if (k.startsWith("certhub:") && typeof v === "string") { store.set(k, v); n++; } });
    return n;
  }
  function exportAll() {
    const blob = new Blob([backupText()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `cert-study-progress-${U.iso(new Date())}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  function importAll(file, done) {
    const r = new FileReader();
    r.onload = () => { try { done(null, restoreText(r.result)); } catch (e) { done(e); } };
    r.onerror = () => done(new Error("Couldn't read that file."));
    r.readAsText(file);
  }


  /* ---------- dated notices (exam launches, retirements) from each data file ---------- */
  // { from: "2026-09-24", until: "2026-10-20", text: "..." }: shown only between the two dates.
  function activeNotices(c, now) {
    now = now || U.today();
    return (c.notices || []).filter(n => (!n.from || U.parseD(n.from) <= now) && (!n.until || now <= U.parseD(n.until)));
  }

  /* ---------- offline support and "update ready" bar ---------- */
  function registerSW() {
    if (!("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol)) return;
    const m = document.querySelector('link[rel="manifest"]');
    if (!m) return; // embedded copies (e.g. a hosted preview) run without offline support
    const base = m.getAttribute("href").replace("manifest.webmanifest", "");
    let reloading = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => { if (reloading) location.reload(); });
    const offer = w => {
      if (!w || !navigator.serviceWorker.controller || document.getElementById("updbar")) return;
      const bar = document.createElement("div");
      bar.id = "updbar"; bar.className = "updbar"; bar.setAttribute("role", "status");
      bar.innerHTML = `<span>New questions or fixes are ready.</span><button class="btn sm" type="button">Update now</button>`;
      bar.querySelector("button").addEventListener("click", () => { reloading = true; w.postMessage("skip-waiting"); });
      document.body.appendChild(bar);
    };
    navigator.serviceWorker.register(base + "sw.js").then(reg => {
      offer(reg.waiting);
      reg.addEventListener("updatefound", () => {
        const w = reg.installing;
        w && w.addEventListener("statechange", () => { if (w.state === "installed") offer(w); });
      });
      // Look for a new version whenever the tab comes back into view.
      document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") reg.update().catch(() => {}); });
    }).catch(() => {});
  }
  document.addEventListener("DOMContentLoaded", registerSW);
  /* ---------- "Install app" ---------- */
  // Chrome, Edge and Android offer an install prompt we can trigger from our own button;
  // iPhone and iPad install only from Safari's Share menu, so we show steps instead.
  const install = {
    prompt: null,
    installed: () => { try { return matchMedia("(display-mode: standalone)").matches || navigator.standalone === true; } catch (e) { return false; } },
    platform() {
      const ua = navigator.userAgent || "";
      if (/iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) return "ios";
      if (/Android/.test(ua)) return "android";
      return "desktop";
    },
    async run() {
      if (!install.prompt) return false;
      install.prompt.prompt();
      const choice = await install.prompt.userChoice.catch(() => ({}));
      install.prompt = null;
      return choice.outcome === "accepted";
    }
  };
  window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); install.prompt = e; document.documentElement.classList.add("can-install"); if (window.CertHub && CertHub.rerender && location.hash.replace("#", "") in { "": 1, home: 1, install: 1 }) CertHub.rerender(); });
  window.addEventListener("appinstalled", () => { install.prompt = null; document.documentElement.classList.remove("can-install"); if (window.CertHub && CertHub.ui) CertHub.ui.toast("Installed. Open Cyber Cert Study from your home screen."); });

  // Inside a frame, file downloads are usually blocked, so hide download-only buttons.
  try { if (window.self !== window.top) document.documentElement.classList.add("framed"); } catch (e) { document.documentElement.classList.add("framed"); }


  /* ---------- in-page dialogs, toasts and copy (hosted pages block confirm/alert) ---------- */
  const ui = {
    confirm(message, { ok = "OK", cancel = "Cancel", danger = false } = {}) {
      return new Promise(resolve => {
        const prev = document.activeElement;
        const wrap = document.createElement("div");
        wrap.className = "modal-wrap";
        wrap.innerHTML = `<div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="modal-msg"><p id="modal-msg"></p><div class="btns"><button type="button" class="btn ${danger ? "danger" : ""}" data-v="1"></button><button type="button" class="btn ghost" data-v="0"></button></div></div>`;
        wrap.querySelector("#modal-msg").textContent = message;
        wrap.querySelector('[data-v="1"]').textContent = ok;
        wrap.querySelector('[data-v="0"]').textContent = cancel;
        const close = v => { wrap.remove(); document.removeEventListener("keydown", key); if (prev && prev.focus) prev.focus(); resolve(v); };
        const key = e => { if (e.key === "Escape") close(false); };
        wrap.addEventListener("click", e => { const b = e.target.closest("[data-v]"); if (b) close(b.dataset.v === "1"); else if (e.target === wrap) close(false); });
        document.addEventListener("keydown", key);
        document.body.appendChild(wrap);
        wrap.querySelector('[data-v="1"]').focus();
      });
    },
    toast(message) {
      let t = document.getElementById("toast");
      if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
      t.textContent = message; t.classList.add("show");
      clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2600);
    },
    // Clipboard first; if the browser refuses, select the text in a box the viewer can copy by hand.
    copy(text, label) {
      const fallback = () => ui.showText(text, label);
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => ui.toast("Copied" + (label ? `: ${label}` : "")), fallback);
        else fallback();
      } catch (e) { fallback(); }
    },
    showText(text, label) {
      const wrap = document.createElement("div");
      wrap.className = "modal-wrap";
      wrap.innerHTML = `<div class="modal wide" role="dialog" aria-modal="true" aria-label="Copy text"><p><strong></strong><br><span class="note">Select all and copy.</span></p><textarea readonly rows="10"></textarea><div class="btns"><button type="button" class="btn">Done</button></div></div>`;
      wrap.querySelector("strong").textContent = label || "Text to copy";
      const ta = wrap.querySelector("textarea"); ta.value = text;
      wrap.querySelector("button").addEventListener("click", () => wrap.remove());
      document.body.appendChild(wrap); ta.focus(); ta.select();
    }
  };

  /* ---------- lab library ---------- */
  const labs = {};
  const labOrder = [];
  const LABKEY = "certhub:v1:labs";
  function loadLabProgress() { try { return JSON.parse(store.get(LABKEY) || "{}") || {}; } catch (e) { return {}; } }
  function saveLabProgress(p) { const ok = store.set(LABKEY, JSON.stringify(p)); changed(LABKEY); return ok; }
  function labStatus(lab, p) {
    const s = (p || loadLabProgress())[lab.id];
    if (!s) return { state: "new", pct: 0 };
    if (s.done) return { state: "done", pct: 100 };
    const n = Object.values(s.steps || {}).filter(Boolean).length;
    return { state: n ? "doing" : "new", pct: Math.round(100 * n / lab.steps.length) };
  }

  /* ---------- study streak (this browser only) ---------- */
  const ACT = "certhub:activity";
  const activity = {
    days() { try { const d = JSON.parse(store.get(ACT) || "[]"); return Array.isArray(d) ? d.filter(x => /^\d{4}-\d{2}-\d{2}$/.test(x)) : []; } catch (e) { return []; } },
    // Call on real study: an answered question, a lesson read, a study day checked.
    mark() { const t = U.iso(new Date()), d = activity.days(); if (!d.includes(t)) { d.push(t); store.set(ACT, JSON.stringify(d.sort().slice(-400))); } },
    // Consecutive days ending today (or yesterday, so the streak survives until tonight), and the best run.
    streak() {
      const set = new Set(activity.days());
      const day = n => U.iso(U.addDays(U.today(), -n));
      let start = set.has(day(0)) ? 0 : set.has(day(1)) ? 1 : -1, cur = 0;
      if (start >= 0) while (set.has(day(start + cur))) cur++;
      let best = 0, run = 0, prev = null;
      [...set].sort().forEach(x => { const d = U.parseD(x); run = prev && Math.round((d - prev) / DAY) === 1 ? run + 1 : 1; best = Math.max(best, run); prev = d; });
      return { current: cur, best: Math.max(best, cur), today: set.has(day(0)) };
    }
  };

  /* ---------- calendar reminder (.ics with a daily repeating event) ---------- */
  function reminderIcs({ time = "19:00", title = "Study session", url = "", minutes = 30 }) {
    const [h, m] = time.split(":").map(Number), d = U.today();
    const pad = n => String(n).padStart(2, "0");
    const dt = x => `${x.getFullYear()}${pad(x.getMonth() + 1)}${pad(x.getDate())}T${pad(x.getHours())}${pad(x.getMinutes())}00`;
    const start = new Date(d); start.setHours(h, m, 0, 0);
    const end = new Date(start.getTime() + minutes * 60000);
    const now = new Date(), stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}00Z`;
    const txt = x => String(x).replace(/[\\;,]/g, c => "\\" + c).replace(/\n/g, "\\n");
    return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Cyber Cert Study//Reminder//EN", "BEGIN:VEVENT",
      `UID:${stamp}-${Math.random().toString(36).slice(2)}@certstudy`, `DTSTAMP:${stamp}`, `DTSTART:${dt(start)}`, `DTEND:${dt(end)}`,
      "RRULE:FREQ=DAILY", `SUMMARY:${txt(title)}`, `DESCRIPTION:${txt("Read a lesson, clear your review queue and take a quiz." + (url ? " " + url : ""))}`, url ? `URL:${url}` : "",
      "BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${txt(title)}`, "TRIGGER:-PT0M", "END:VALARM", "END:VEVENT", "END:VCALENDAR"].filter(Boolean).join("\r\n") + "\r\n";
  }
  function downloadFile(name, text, type) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  // Asks the person for a time, then saves a daily calendar event they open in their calendar app.
  function addReminder(title, url) {
    const wrap = document.createElement("div");
    wrap.className = "modal-wrap";
    wrap.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="rm-h"><p id="rm-h"><strong>Daily study reminder</strong><br><span class="note">Saves a repeating event. Open the file to add it to your phone or computer calendar, which will remind you every day.</span></p>
      <label for="rm-time">Time</label> <input type="time" id="rm-time" value="19:00">
      <div class="btns"><button type="button" class="btn" data-rm="ok">Save to calendar</button><button type="button" class="btn ghost" data-rm="cancel">Cancel</button></div></div>`;
    const close = () => { wrap.remove(); document.removeEventListener("keydown", onKey); };
    const onKey = e => { if (e.key === "Escape") close(); };
    wrap.addEventListener("click", e => {
      const b = e.target.closest("[data-rm]"); if (!b && e.target !== wrap) return;
      if (b && b.dataset.rm === "ok") downloadFile("study-reminder.ics", reminderIcs({ time: wrap.querySelector("#rm-time").value || "19:00", title, url }), "text/calendar");
      close();
    });
    document.addEventListener("keydown", onKey);
    document.body.appendChild(wrap);
    wrap.querySelector("#rm-time").focus();
  }

  // Link to open a prefilled issue for a mistake, or "" when the site has no feedback address.
  function reportUrl(title, body) {
    const f = (window.CertHub && CertHub.site && CertHub.site.feedbackUrl) || "";
    if (!f) return "";
    if (/github\.com\/[^/]+\/[^/]+\/issues\/?$/.test(f)) return `${f.replace(/\/$/, "")}/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body + "\n\nWhat's wrong, and what should it say?\n")}`;
    return f;
  }

  window.CertHub = {
    U, store, certs, buildPlan, loadProgress, saveProgress, freshProgress, applyTheme, themeButton, exportAll, importAll, activeNotices,
    backupText, restoreText, ui, install, labs, labOrder, loadLabProgress, saveLabProgress, labStatus,
    register(c) { certs[c.id] = c; if (Array.isArray(c.questions)) c.qCount = c.questions.length; },
    loadQuestions, addQuestions, loadLessons, addLessons, addDiagrams, diagramsFor, activity, reminderIcs, addReminder, reportUrl, downloadFile,
    registerLabs(list) { list.forEach(l => { if (!labs[l.id]) labOrder.push(l.id); labs[l.id] = l; }); }
  };
})();
