/* Certification view: plan, weekly quizzes, checkpoint tests, practice exam, spaced
   review (1, 3, 7, 14 days), linked labs and progress by domain, saved in localStorage.
   The app router (app.js) calls CertHub.certView.open(id, tab). */
(function () {
  const { U, buildPlan, loadProgress, saveProgress } = CertHub;
  const { $, esc, DAY, today, parseD, fmt, fmtLong, shuffle, dc } = U;
  const INTERVALS = [1, 3, 7, 14];

  let C, PLAN, W, DOM, Q, S, FREE_Q, PRO = null;
  let SIMS = null; // exam simulations for this certification: a list, false when there are none, null while loading
  let LES = null, LES_ES = null;
  // Lesson language: "en" or "es" (Spanish translation where it exists), remembered in this browser.
  let LANG = (CertHub.store.get("certhub:lang") === "es") ? "es" : "en";
  const ES_UI = { "Key terms": "Términos clave", "Real-world example": "Ejemplo real", "Exam tip:": "Consejo para el examen:", "Check yourself": "Comprueba lo que sabes", "Answer out loud first, then open to check.": "Responde en voz alta y luego ábrelo para comprobar.", "▶ Watch the overview": "▶ Ver el resumen", "Mark as read": "Marcar como leído", "Read ✓ (mark unread)": "Leído ✓ (marcar como no leído)", "Read": "Leído" };
  const tr = x => LANG === "es" && LES_ES ? (ES_UI[x] || x) : x;
  // The lesson to show for a topic: the Spanish translation when chosen and available.
  const lessonOf = t => (LANG === "es" && LES_ES && LES_ES.get(t)) || (LES && LES.get(t)); // lessons for this certification: a Map by topic text, false when there are none yet, null while loading
  let active = false;
  const TAB_IDS = ["week", "learn", "plan", "practice", "labs", "progress", "guide", "about", "cheat"];
  const Pro = () => CertHub.pro || { available: false, active: false };
  const toQ = ([id, w, d, q, o, a, e, src, why]) => ({ id, w, d, q, o, a, e, src, why: Array.isArray(why) && why.length === 4 ? why : null });

  function open(id, tab) {
    if (C && C.id === id && S) {
      // Same certification: switch tabs but keep any quiz in progress.
      active = true;
      if (TAB_IDS.includes(tab) && tab !== S.tab) { S.tab = tab; if (tab === "week") S.viewWeek = null; }
      render(); return true;
    }
    if (!Object.prototype.hasOwnProperty.call(CertHub.certs, id)) return false;
    C = CertHub.certs[id];
    active = true;
    PLAN = buildPlan(C);
    W = PLAN.weeks;
    DOM = Object.fromEntries(C.domains.map(d => [d.id, d]));
    // Week 0 questions are placed by domain.
    FREE_Q = (C.questions || []).map(toQ);
    Q = FREE_Q;
    PRO = null;
    if (!Array.isArray(C.questions)) {
      // The question bank loads separately; redraw once it arrives.
      CertHub.loadQuestions(id).then(qs => {
        if (!C || C.id !== id || !qs) return;
        FREE_Q = qs.map(toQ);
        Q = FREE_Q.concat(PRO ? PRO.questions : []);
        if (active && !(S.quiz && !S.quiz.done)) render();
      }, e => { if (active && C.id === id) CertHub.ui.toast(e.message); });
    }
    SIMS = null;
    CertHub.loadPbqs(id).then(l => { if (!C || C.id !== id) return; SIMS = l || false; if (active && S.tab === "practice" && !(S.quiz && !S.quiz.done)) render(); });
    LES = null;
    LES_ES = null;
    if (LANG === "es") CertHub.loadLessons(id, "es").then(m => { if (!C || C.id !== id) return; LES_ES = m; if (active && (S.tab === "week" || S.tab === "learn")) render(); });
    CertHub.loadLessons(id).then(m => {
      if (!C || C.id !== id) return;
      LES = m || false;
      if (active && !(S.quiz && !S.quiz.done) && (S.tab === "week" || S.tab === "learn")) render();
    });
    const p = loadProgress(C.id);
    if (!p.start) p.start = C.start || U.iso(U.nextMonday(today()));
    if (!p.examDate) p.examDate = C.examDate || U.iso(U.addDays(parseD(p.start), W.length * 7 + 1));
    S = { tab: TAB_IDS.includes(tab) ? tab : "week", viewWeek: null, quiz: null, fc: null, p };
    saveProgress(C.id, p);
    render();
    loadPro();
    return true;
  }
  // Pro members get the extra question bank, flashcards and study guide for this certification.
  function loadPro() {
    const id = C.id;
    if (!Pro().active) { if (PRO) { PRO = null; Q = FREE_Q; if (active) render(); } return; }
    if (PRO) return;
    Pro().load(id).then(b => {
      if (!b || !C || C.id !== id || PRO) return;
      const doms = new Set(C.domains.map(d => d.id));
      const ok = x => Array.isArray(x) && typeof x[0] === "string" && doms.has(x[2]) && Array.isArray(x[4]) && x[4].length === 4 && x[5] >= 0 && x[5] < 4;
      PRO = { questions: (Array.isArray(b.questions) ? b.questions : []).filter(ok).map(toQ),
        flashcards: (Array.isArray(b.flashcards) ? b.flashcards : []).filter(f => Array.isArray(f) && doms.has(f[0]) && f[1] && f[2]),
        guide: Array.isArray(b.guide) ? b.guide : [] };
      Q = FREE_Q.concat(PRO.questions); // FREE_Q may still be loading; its loader adds PRO back in
      if (active && !(S.quiz && !S.quiz.done)) render();
    });
  }
  function close() { active = false; clearTimeout(tickT); }

  const DAYS = () => [
    ["Mon", "Read this week's lessons below and mark each one read"],
    ["Tue", C.videoTip || "Watch videos or read the matching chapters of a study guide for this week's topics"],
    ["Wed", "Answer each lesson's \"Check yourself\" questions out loud before revealing them"],
    ["Thu", "Hands-on: this week's lab (step-by-step below)"],
    ["Fri", "Take the weekly quiz (10 questions)"],
    ["Sat", "Clear your review queue, then any checkpoint test"],
    ["Sun", "Rest, or 15 minutes of review only"]
  ];
  const weekStart = n => U.addDays(parseD(S.p.start), (n - 1) * 7);
  const weekNow = () => Math.min(W.length, Math.max(1, Math.floor((today() - parseD(S.p.start)) / DAY / 7) + 1));
  let saveT;
  const save = () => { clearTimeout(saveT); saveT = setTimeout(() => saveProgress(C.id, S.p), 300); };

  /* ---------- stats & spaced review ---------- */
  function record(q, ok, fromReview) {
    CertHub.activity.mark();
    const st = S.p.stats[q.d] || (S.p.stats[q.d] = { c: 0, t: 0 });
    st.t++; if (ok) st.c++;
    // Objective-level accuracy for the score report, when the question names its objective.
    const obj = String(q.src || "").match(/^(\d{1,2}\.\d{1,2})\b/);
    if (obj) { const objs = S.p.objs || (S.p.objs = {}); const o = objs[obj[1]] || (objs[obj[1]] = { c: 0, t: 0 }); o.t++; if (ok) o.c++; }
    const r = S.p.review[q.id];
    const t = today().getTime();
    if (!ok) S.p.review[q.id] = { box: 0, due: t + DAY };
    else if (r && fromReview) {
      const box = r.box + 1;
      if (box >= INTERVALS.length) delete S.p.review[q.id];
      else S.p.review[q.id] = { box, due: t + INTERVALS[box] * DAY };
    }
  }
  const dueIds = () => Object.entries(S.p.review).filter(([id, r]) => r.due <= today().getTime() + 1000 && Q.some(q => q.id === id)).map(([id]) => id);

  /* ---------- question selection ---------- */
  const pickFor = (filter, n) => shuffle(Q.filter(filter)).slice(0, n);
  function weeklyQs(n) {
    const wk = W[n - 1];
    let qs = shuffle(Q.filter(q => q.w === n));
    if (qs.length < 10) {
      // Domains with several weeks rotate through their unpinned questions.
      const pool = Q.filter(q => !q.w && (wk.dom ? q.d === wk.dom : true));
      const sameDom = W.filter(w => w.dom === wk.dom && wk.dom);
      const idx = sameDom.indexOf(wk);
      const slice = sameDom.length > 1 ? pool.filter((_, i) => i % sameDom.length === idx) : pool;
      qs = qs.concat(shuffle(slice), shuffle(pool.filter(q => !slice.includes(q))));
    }
    qs = Array.from(new Set(qs)).slice(0, 10);
    // Top up with earlier weeks' material, then anything else from this week's domain.
    if (qs.length < 10) qs = qs.concat(pickFor(q => !qs.includes(q) && (q.w ? q.w < n : W.some(w => w.n < n && w.dom === q.d)), 10 - qs.length));
    if (qs.length < 10 && wk.dom) qs = qs.concat(pickFor(q => !qs.includes(q) && q.d === wk.dom, 10 - qs.length));
    // Small domains (a few questions in week 1): fill up from the rest of the bank.
    if (qs.length < 10) qs = qs.concat(pickFor(q => !qs.includes(q), 10 - qs.length));
    return shuffle(qs);
  }
  // Pro: the real exam's length, weighted by domain, topped up from any domain if one runs short.
  function fullExamQs() {
    const N = C.examSim.questions;
    let out = [];
    C.domains.forEach(d => { out = out.concat(pickFor(q => q.d === d.id, Math.round(N * d.w / 100))); });
    if (out.length < N) out = out.concat(pickFor(q => !out.includes(q), N - out.length));
    return shuffle(out.slice(0, N));
  }
  function examQs() {
    const N = C.examSim.questions;
    let out = [];
    C.domains.forEach(d => { out = out.concat(pickFor(q => q.d === d.id, Math.round(N * d.w / 100))); });
    return shuffle(out);
  }

  /* ---------- quiz engine ---------- */
  function startQuiz(o) {
    if (!o.qs.length) { CertHub.ui.toast("No questions available yet for this set."); return; }
    // Shuffle answer options every time so position never gives the answer away.
    o.qs = o.qs.map(q => { const idx = shuffle(q.o.map((_, i) => i)); return { ...q, o: idx.map(i => q.o[i]), a: idx.indexOf(q.a), why: q.why ? idx.map(i => q.why[i]) : null }; });
    S.quiz = { ...o, i: 0, ans: [], picked: null, revealed: false, end: o.minutes ? Date.now() + o.minutes * 60000 : null, done: false };
    S.tab = "practice"; render(); window.scrollTo(0, 0);
  }
  let tickT;
  function tick() {
    clearTimeout(tickT);
    const z = S.quiz; if (!z || z.done || !z.end) return;
    const left = z.end - Date.now();
    const el = $("#timer");
    if (el) { const s = Math.max(0, Math.floor(left / 1000)); el.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; }
    if (left <= 0) return finishQuiz();
    tickT = setTimeout(tick, 1000);
  }
  function choose(k) {
    const z = S.quiz; if (z.revealed) return;
    z.picked = k;
    if (z.mode === "learn") { z.revealed = true; const q = z.qs[z.i]; z.ans[z.i] = k; record(q, k === q.a, z.review); save(); }
    render();
  }
  function next() {
    const z = S.quiz;
    if (z.mode === "test") z.ans[z.i] = z.picked;
    z.i++; z.picked = z.mode === "test" ? (z.ans[z.i] ?? null) : null; z.revealed = false;
    if (z.i >= z.qs.length) return finishQuiz();
    render(); window.scrollTo(0, 0);
  }
  function prev() { const z = S.quiz; z.ans[z.i] = z.picked; z.i = Math.max(0, z.i - 1); z.picked = z.ans[z.i] ?? null; render(); }
  function finishQuiz() {
    const z = S.quiz; if (!z || z.done) return;
    if (z.mode === "test") { if (z.i < z.qs.length) z.ans[z.i] = z.picked; z.qs.forEach((q, i) => record(q, z.ans[i] === q.a, false)); }
    z.done = true; clearTimeout(tickT);
    z.score = z.qs.filter((q, i) => z.ans[i] === q.a).length;
    if (z.kind === "placement") {
      const dom = {};
      C.domains.forEach(d => { const qs = z.qs.map((q, i) => [q, i]).filter(([q]) => q.d === d.id); if (qs.length) dom[d.id] = Math.round(100 * qs.filter(([q, i]) => z.ans[i] === q.a).length / qs.length); });
      S.p.placement = { at: Date.now(), dom };
    }
    S.p.history.unshift({ at: Date.now(), title: z.title, score: z.score, total: z.qs.length, ...(z.kind ? { kind: z.kind } : {}) });
    S.p.history = S.p.history.slice(0, 60);
    save(); render(); window.scrollTo(0, 0);
  }
  async function quitQuiz() {
    if (S.quiz && !S.quiz.done) {
      const test = S.quiz.mode === "test";
      const ok = await CertHub.ui.confirm(test ? "Leave this test? It won't be scored." : "Leave this quiz? Answers so far are already saved.", { ok: test ? "Leave test" : "Leave quiz", cancel: "Keep going" });
      if (!ok) return;
    }
    S.quiz = null; clearTimeout(tickT); render();
  }

  /* ---------- views ---------- */
  const TABS = [["week", "This week"], ["learn", "Lessons"], ["plan", "Plan"], ["practice", "Quizzes & tests"], ["labs", "Labs"], ["progress", "Progress"], ["guide", "Flashcards & guide"], ["about", "About the exam"]];
  // The Pro tab only shows where Pro can be bought.
  const tabs = () => TABS.filter(([k]) => k !== "guide" || Pro().available);
  function renderTabs() {
    $("#tabs").innerHTML = tabs().map(([k, l]) => `<button role="tab" aria-selected="${S.tab === k}" data-tab="${k}">${k === "plan" ? `${W.length}-week plan` : l}</button>`).join("");
    const days = Math.ceil((parseD(S.p.examDate) - today()) / DAY);
    $("#count").innerHTML = days >= 0 ? `<b>${days}</b> days<span class="wide"> to exam</span>` : "Exam passed";
  }
  const domName = d => d ? `D${d} ${DOMAINS_SHORT(d)}` : "All domains";
  const DOMAINS_SHORT = d => DOM[d].name;
  function routeMap(active) {
    const now = weekNow();
    return `<div class="route" aria-label="${W.length}-week route"><div class="line" style="min-width:${Math.max(W.length * 40, 300)}px">${W.map(w => {
      const done = DAYS().every((_, i) => S.p.checks[`${w.n}-${i}`]) || (w.n < now && today() >= parseD(S.p.start));
      return `<button class="stop ${done ? "done" : ""} ${w.n === active ? "now" : ""}" style="--c:${dc(w.dom)}" data-week="${w.n}" aria-label="Week ${w.n}: ${esc(w.title)}"><span class="dot">${w.n}</span><small>${fmt(weekStart(w.n))}</small></button>`;
    }).join("")}</div></div>
    <div class="legend">${C.domains.map(d => `<span style="--c:${dc(d.id)}">D${d.id} ${esc(d.name)}</span>`).join("")}</div>`;
  }
  function checkBanner() {
    return C.status === "verified" ? "" : `<div class="status warn"><strong>Check before relying on this.</strong> ${esc(C.statusNote || "Domain weights haven't been confirmed against the current official outline.")}</div>`;
  }
  const noticeHtml = () => CertHub.activeNotices(C).map(n => `<div class="status notice">${esc(n.text)}</div>`).join("");
  const weekLabs = w => (w.labRefs || []).map(id => CertHub.labs[id]).filter(Boolean);
  // Every linked lab once, at the first week that uses it.
  function planLabs() {
    const seen = new Map();
    W.forEach(w => weekLabs(w).forEach(l => { if (!seen.has(l.id)) seen.set(l.id, { lab: l, week: w }); }));
    return [...seen.values()];
  }
  function weekView() {
    const n = S.viewWeek || weekNow(); const w = W[n - 1];
    const labs = weekLabs(w);
    const due = dueIds().length;
    const cp = PLAN.checkpoints.find(c => c.after === n);
    const pre = today() < parseD(S.p.start);
    return `${routeMap(n)}
    <h1>Week ${n}: ${esc(w.title)}</h1>
    <p class="meta">${fmt(weekStart(n))} – ${fmt(U.addDays(weekStart(n), 6))}${pre && n === 1 ? " · starts " + fmtLong(weekStart(1)) : ""}</p>
    <p style="margin:10px 0 0"><span class="chip" style="--c:${dc(w.dom)}">${w.dom ? `Domain ${w.dom} · ${DOM[w.dom].w}% of exam` : "All domains"}</span> <span class="note">${esc(w.obj)}</span></p>
    ${noticeHtml()}
    ${n === 1 ? checkBanner() : ""}
    ${!S.p.placement && !S.p.history.length ? `<div class="panel startcard"><div class="grow"><strong>New to ${esc(C.short)}?</strong><br><span class="note">Take a short placement test to find what you already know and which weeks to focus on.</span></div><button class="btn sm" data-act="placement">Take the placement test</button></div>` : ""}
    ${n === weekNow() && !pre ? todayHtml(w, n) : ""}
    ${streakHtml()}
    ${w.light ? `<div class="status">Holiday week. Keep it to about 30 minutes a day.</div>` : ""}
    <div class="btns">
      <button class="btn" data-act="weekly" data-w="${n}">Take week ${n} quiz</button>
      ${due ? `<button class="btn ghost" data-act="review">Review ${due} due</button>` : ""}
      ${cp ? `<button class="btn ghost" data-act="checkpoint" data-d="${cp.dom}">Checkpoint test: Domain ${cp.dom}</button>` : ""}
      ${n === W.length ? `<button class="btn ghost" data-act="exam">Full practice exam</button>` : ""}
    </div>
    ${weekLessons(w)}
    <h2>Hands-on labs</h2>
    ${labs.length ? `<p class="note">Step-by-step, in your own home lab. Each one ends with a portfolio write-up and a resume bullet.</p>
    <div class="labgrid">${labs.map(l => CertHub.labCard(l)).join("")}</div>` : ""}
    ${w.lab ? `<div class="panel"><strong>Quick exercise</strong><p style="margin:6px 0 0">${esc(w.lab)}</p></div>` : ""}
    ${w.notes && w.notes.length ? `<h2>${esc(C.notesLabel || "Reread")}</h2><div class="panel"><ul class="clean">${w.notes.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>` : ""}
    <h2>Daily plan</h2>
    <div class="panel"><ul class="days">${DAYS().map(([d, t], i) => { const k = `${n}-${i}`; const c = !!S.p.checks[k]; const text = i === 3 ? "Hands-on: " + (labs.length ? labs.map(l => l.title).join("; ") : w.lab) : t; return `<li class="${c ? "checked" : ""}"><label><input type="checkbox" data-check="${k}" ${c ? "checked" : ""}><span class="d">${d}</span><span class="t">${esc(text)}</span></label></li>`; }).join("")}</ul></div>
    ${w.study && w.study.length ? `<h2>Study questions</h2>
    <p class="note">Answer out loud first, then open to check.</p>
    <div class="panel">${w.study.map(([q, a]) => `<details class="sq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>` : ""}`;
  }
  /* ---------- lessons ---------- */
  const lessonKey = t => "l" + [...String(t)].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7).toString(36);
  const isRead = t => !!(S.p.read && S.p.read[lessonKey(t)]);
  // Lesson text: `code` inline, and paragraphs that start with ``` are code blocks.
  const inline = x => esc(x).replace(/`([^`\n]+)`/g, "<code>$1</code>");
  const para = x => /^```/.test(x) ? `<pre class="code" tabindex="0"><code>${esc(x.replace(/^```[a-z]*\n?/i, "").replace(/\n?```$/, ""))}</code></pre>` : `<p>${inline(x)}</p>`;
  function readBtn(t) {
    const r = isRead(t);
    return `<button class="btn sm ${r ? "ghost" : ""}" data-act="read" data-k="${lessonKey(t)}" aria-pressed="${r}">${r ? tr("Read ✓ (mark unread)") : tr("Mark as read")}</button>`;
  }
  function lessonHtml(t, n) {
    const l = lessonOf(t);
    if (!l) return `<li class="lesson-none">${esc(t)}</li>`;
    const r = isRead(t);
    return `<li><details class="lesson" data-k="${lessonKey(t)}"${l.tt ? ` lang="es"` : ""}><summary><span class="grow">${esc(l.tt || t)}</span>${r ? `<span class="chip done">${tr("Read")}</span>` : ""}</summary>
      <div class="lbody">
        <div class="btns" style="margin-top:0"><button type="button" class="btn ghost sm" data-act="video" data-k="${lessonKey(t)}">${tr("▶ Watch the overview")}</button></div>
        ${(l.body || []).map((x, i) => para(x) + (i === 0 ? diagramHtml(t) : "")).join("")}
        ${l.terms && l.terms.length ? `<h3>${tr("Key terms")}</h3><dl class="terms">${l.terms.map(([a, b]) => `<dt>${inline(a)}</dt><dd>${inline(b)}</dd>`).join("")}</dl>` : ""}
        ${l.example ? `<div class="panel ex"><strong>${tr("Real-world example")}</strong>${[].concat(l.example).map(para).join("")}</div>` : ""}
        ${l.tip ? `<div class="status notice"><strong>${tr("Exam tip:")}</strong> ${inline(l.tip)}</div>` : ""}
        ${l.check && l.check.length ? `<h3>${tr("Check yourself")}</h3><p class="note">${tr("Answer out loud first, then open to check.")}</p>${l.check.map(([q, a]) => `<details class="sq"><summary>${inline(q)}</summary><p>${inline(a)}</p></details>`).join("")}` : ""}
        <div class="btns">${readBtn(t)}${n ? `<button class="btn ghost sm" data-act="weekly" data-w="${n}">Quiz me on week ${n}</button>` : ""}</div>
        ${reportLink(`${C.short} lesson: ${t.slice(0, 80)}`, `Certification: ${C.name} (${C.exam})\nLesson: ${t}`)}
      </div></details></li>`;
  }
  // The lesson that best covers a question: same week (or domain), most shared words.
  const STOP = new Set("about after also another because been before being between both could does each from have into itself just more most much must only other over same should since some such than that their them then there these they this those through under uses using very what when where which while will with within would your which true false following best describes scenario question company administrator user users".split(" "));
  const words = x => new Set(String(x).toLowerCase().replace(/[^a-z0-9.+#/-]+/g, " ").split(" ").map(w => w.replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, "")).filter(w => (w.length >= 4 || /^[a-z0-9]{2,3}$/.test(w) && /\d|^[a-z]{2,3}$/.test(w) && w.length >= 3) && !STOP.has(w)));
  const lessonIdx = new Map();
  function lessonFor(q) {
    if (!LES) return null;
    if (lessonIdx.has(q.id)) return lessonIdx.get(q.id);
    const ts = (q.w && W[q.w - 1] ? lessonTopics(W[q.w - 1]) : W.filter(w => w.dom === q.d).flatMap(lessonTopics)).filter(t => LES.has(t));
    const qw = words(q.q + " " + q.e + " " + (q.o[q.a] || ""));
    let best = null, top = 1;
    ts.forEach(t => {
      const l = LES.get(t);
      const title = words(t), terms = words((l.terms || []).map(x => x[0]).join(" "));
      let sc = 0; qw.forEach(w => { if (title.has(w)) sc += 2; else if (terms.has(w)) sc += 1.5; });
      if (sc > top) { top = sc; best = t; }
    });
    lessonIdx.set(q.id, best);
    return best;
  }
  // Why the chosen wrong answer is wrong, then the other wrong options behind a disclosure.
  function whyHtml(q, picked) {
    if (!q.why) return "";
    const mine = picked != null && picked !== q.a && q.why[picked] ? `<br><strong>Why "${esc(q.o[picked])}" is wrong:</strong> ${esc(q.why[picked])}` : "";
    const others = q.o.map((o, i) => [o, i]).filter(([, i]) => i !== q.a && i !== picked && q.why[i]);
    return mine + (others.length ? `<details class="whys"><summary>Why the other options are wrong</summary><ul class="clean">${others.map(([o, i]) => `<li><strong>${esc(o)}</strong>: ${esc(q.why[i])}</li>`).join("")}</ul></details>` : "");
  }
  const lessonLink = q => { const t = lessonFor(q); return t ? `<button type="button" class="linkbtn" data-act="golesson" data-k="${lessonKey(t)}">Review the lesson: ${esc(t.length > 70 ? t.slice(0, 68) + "…" : t)}</button>` : ""; };
  const reportLink = (title, body) => { const u = CertHub.reportUrl(title, body); return u ? `<a class="report" href="${esc(u)}" target="_blank" rel="noopener">Report a mistake</a>` : ""; };
  const qReport = q => reportLink(`${C.short}: question ${q.id}`, `Certification: ${C.name} (${C.exam})\nQuestion ${q.id}: ${q.q}\nMarked answer: ${q.o[q.a]}`);
  const diagramHtml = t => CertHub.diagramsFor(C.id, t).map(d => `<figure class="diagram">${d.svg.replace(/^<svg /, `<svg role="img" aria-label="${esc(d.alt)}" focusable="false" `)}<figcaption>${esc(d.title)}</figcaption></figure>`).join("");
  const lessonTopics = w => w.dom ? w.topics.filter(t => !/^Checkpoint test/i.test(t)) : [];
  function weekLessons(w) {
    const ts = lessonTopics(w);
    const head = `<h2>This week's lessons</h2>`;
    if (LES === null && ts.length) return head + `<p class="note">Loading lessons…</p><div class="panel wk" style="--c:${dc(w.dom)}"><ul class="clean">${w.topics.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>`;
    if (!LES || !ts.some(t => LES.has(t))) return `<h2>What you're covering</h2><div class="panel wk" style="--c:${dc(w.dom)}"><ul class="clean">${w.topics.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>`;
    const done = ts.filter(t => LES.has(t) && isRead(t)).length, all = ts.filter(t => LES.has(t)).length;
    return head + `<p class="note">Open each topic to read its lesson: an explanation, key terms, a real-world example, an exam tip and questions to check yourself. ${done} of ${all} read.</p>
    <div class="panel wk" style="--c:${dc(w.dom)}"><ul class="clean lessons">${w.topics.map(t => lessonHtml(t, 0)).join("")}</ul></div>`;
  }
  /* ---------- lesson overview video: narrated slides built from the lesson ---------- */
  const plain = x => String(x || "").replace(/`/g, "");
  const sentences = x => plain(x).split(/(?<=[.!?])\s+(?=[A-Z0-9"(])/).filter(Boolean);
  const first = (x, n) => sentences(x).slice(0, n).join(" ");
  function overviewSlides(t) {
    const l = lessonOf(t), d = DOM[(W.find(w => w.topics.includes(t)) || {}).dom] || null, es = !!l.tt;
    const K = es ? { idea: "La idea principal", how: "Cómo funciona", terms: "Términos clave", real: "En el mundo real", tip: "Consejo para el examen", check: "Comprueba lo que sabes", pause: "Pausa y responde en voz alta; luego lee la lección completa para comprobar.", ov: "Resumen" } : { idea: "The big idea", how: "How it works", terms: "Key terms", real: "In the real world", tip: "Exam tip", check: "Check yourself", pause: "Pause and answer out loud, then read the full lesson to check.", ov: "Overview" };
    const prose = (l.body || []).filter(x => !/^```/.test(x));
    const out = [{ h: `<p class="ov-kicker">${esc(C.short)}${d ? ` · Domain ${d.id}: ${esc(d.name)}` : ""}</p><h2 class="ov-title">${esc(l.tt || t)}</h2><p class="ov-sub">${K.ov}</p>`, say: `${K.ov}. ${plain(l.tt || t)}.` }];
    if (prose[0]) out.push({ h: `<p class="ov-kicker">${K.idea}</p><p class="ov-lead">${esc(first(prose[0], 2))}</p>`, say: first(prose[0], 2) });
    const how = prose.slice(1, 4).map(x => first(x, 1)).filter(Boolean);
    if (how.length) out.push({ h: `<p class="ov-kicker">${K.how}</p><ul class="ov-list">${how.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`, say: how.join(" ") });
    CertHub.diagramsFor(C.id, t).slice(0, 1).forEach(g => out.push({ h: `<p class="ov-kicker">${esc(g.title)}</p><div class="ov-fig">${g.svg.replace(/^<svg /, `<svg role="img" aria-label="${esc(g.alt)}" focusable="false" `)}</div>`, say: g.alt }));
    const terms = (l.terms || []).slice(0, 4);
    if (terms.length) out.push({ h: `<p class="ov-kicker">${K.terms}</p><dl class="ov-terms">${terms.map(([a, b]) => `<dt>${esc(plain(a))}</dt><dd>${esc(first(b, 1))}</dd>`).join("")}</dl>`, say: K.terms + ". " + terms.map(([a, b]) => `${plain(a)}: ${first(b, 1)}`).join(" ") });
    if (l.example) out.push({ h: `<p class="ov-kicker">${K.real}</p><p class="ov-lead">${esc(first(l.example, 2))}</p>`, say: K.real + ". " + first(l.example, 2) });
    if (l.tip) out.push({ h: `<p class="ov-kicker">${K.tip}</p><p class="ov-lead">${esc(plain(l.tip))}</p>`, say: K.tip + ". " + plain(l.tip) });
    if (l.check && l.check[0]) out.push({ h: `<p class="ov-kicker">${K.check}</p><p class="ov-lead">${esc(plain(l.check[0][0]))}</p><p class="ov-sub">${K.pause}</p>`, say: K.check + ". " + plain(l.check[0][0]) + " " + K.pause });
    out.lang = es ? "es-US" : "en-US";
    return out;
  }
  function playOverview(t) {
    const slides = overviewSlides(t), tts = "speechSynthesis" in window && typeof SpeechSynthesisUtterance === "function";
    const back = document.activeElement;
    let i = 0, playing = true, rate = 1, sound = tts, timer = null, gen = 0;
    const wrap = document.createElement("div");
    wrap.className = "ov-wrap";
    wrap.innerHTML = `<div class="ov" role="dialog" aria-modal="true" aria-label="Overview video: ${esc(t)}">
      <div class="ov-top"><span class="note">Overview · ${tts ? "narrated by your device's voice" : "captions only on this device"}</span><button type="button" class="btn ghost sm" data-ov="close" aria-label="Close overview">✕</button></div>
      <div class="ov-stage" aria-live="polite"></div>
      <div class="ov-bar" aria-hidden="true"><i></i></div>
      <div class="ov-ctl"><button type="button" class="btn ghost sm" data-ov="prev" aria-label="Previous slide">⏮</button><button type="button" class="btn sm" data-ov="play"></button><button type="button" class="btn ghost sm" data-ov="next" aria-label="Next slide">⏭</button>
        ${tts ? `<button type="button" class="btn ghost sm" data-ov="sound"></button>` : ""}<button type="button" class="btn ghost sm" data-ov="rate" aria-label="Playback speed">1×</button><span class="note ov-n"></span></div></div>`;
    const $o = sel => wrap.querySelector(sel);
    const stop = () => { gen++; clearTimeout(timer); if (tts) speechSynthesis.cancel(); };
    const show = () => {
      $o(".ov-stage").innerHTML = `<div class="ov-slide">${slides[i].h}</div>`;
      $o(".ov-bar i").style.width = `${100 * (i + 1) / slides.length}%`;
      $o(".ov-n").textContent = `${i + 1} / ${slides.length}`;
      $o("[data-ov=play]").textContent = playing ? "❚❚ Pause" : "▶ Play";
      if (tts) $o("[data-ov=sound]").textContent = sound ? "Sound on" : "Sound off";
    };
    const advance = my => { if (my !== gen || !playing) return; if (i < slides.length - 1) { i++; run(); } else { playing = false; show(); } };
    const run = () => {
      stop(); show(); if (!playing) return;
      const my = gen, text = slides[i].say;
      const fallback = () => { timer = setTimeout(() => advance(my), Math.max(2500, text.split(/\s+/).length / (2.6 * rate) * 1000)); };
      if (sound) {
        const u = new SpeechSynthesisUtterance(text); u.rate = rate; u.lang = slides.lang;
        u.onend = () => { timer = setTimeout(() => advance(my), 500); };
        u.onerror = () => { if (my === gen) fallback(); };
        speechSynthesis.speak(u);
      } else fallback();
    };
    const close = () => { stop(); wrap.remove(); document.removeEventListener("keydown", onKey); if (back && back.focus) back.focus(); };
    const act = a => {
      if (a === "close") return close();
      if (a === "prev") { i = Math.max(0, i - 1); playing = true; }
      if (a === "next") { if (i < slides.length - 1) i++; playing = true; }
      if (a === "play") { if (!playing && i === slides.length - 1) i = 0; playing = !playing; }
      if (a === "sound") sound = !sound;
      if (a === "rate") { rate = rate >= 1.5 ? 0.8 : rate === 0.8 ? 1 : rate + 0.25; $o("[data-ov=rate]").textContent = rate + "×"; }
      run();
    };
    const onKey = e => {
      if (e.key === "Escape") return close();
      if (e.key === "ArrowRight") act("next"); else if (e.key === "ArrowLeft") act("prev");
      else if (e.key === " " && !e.target.closest("button")) { e.preventDefault(); act("play"); }
      else if (e.key === "Tab") { const f = [...wrap.querySelectorAll("button")]; const k = f.indexOf(document.activeElement); if (e.shiftKey && k <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && k === f.length - 1) { e.preventDefault(); f[0].focus(); } }
    };
    wrap.addEventListener("click", e => { const b = e.target.closest("[data-ov]"); if (b) act(b.dataset.ov); else if (e.target === wrap) close(); });
    document.addEventListener("keydown", onKey);
    document.body.appendChild(wrap);
    $o("[data-ov=play]").focus();
    run();
  }
  // Where to start, from the latest placement test: weakest domains first.
  // What to do today, from the plan: today's step, the next unread lessons, reviews due.
  function todayHtml(w, n) {
    const di = (today().getDay() + 6) % 7, [day, text] = DAYS()[di], k = `${n}-${di}`, doneToday = !!S.p.checks[k];
    const unread = lessonTopics(w).filter(t => LES && LES.has(t) && !isRead(t)).slice(0, di <= 1 ? 3 : 2);
    const due = dueIds().length;
    const items = [];
    unread.forEach(t => items.push(`<li>Read: <button type="button" class="linkbtn" data-act="golesson" data-k="${lessonKey(t)}">${esc(t.length > 80 ? t.slice(0, 78) + "…" : t)}</button></li>`));
    if (due) items.push(`<li><button type="button" class="linkbtn" data-act="review">Review ${due} question${due > 1 ? "s" : ""} due today</button></li>`);
    if (di === 4) items.push(`<li><button type="button" class="linkbtn" data-act="weekly" data-w="${n}">Take the week ${n} quiz</button></li>`);
    if (SIMS && SIMS.length && di === 3) { const next = SIMS.find(p => p.d === w.dom && !(S.p.sims || {})[p.id]); if (next) items.push(`<li>Try a simulation: <button type="button" class="linkbtn" data-act="gosim" data-id="${esc(next.id)}">${esc(next.title)}</button></li>`); }
    return `<div class="panel today"><div class="flex"><h2 style="margin:0">Today · ${day}</h2><label class="note"><input type="checkbox" data-check="${k}" ${doneToday ? "checked" : ""}> Done</label></div>
      <p style="margin:8px 0 6px">${esc(di === 3 ? "Hands-on: " + (weekLabs(w).map(l => l.title).join("; ") || w.lab) : text)}</p>
      ${items.length ? `<ul class="clean">${items.join("")}</ul>` : `<p class="note" style="margin:0">Nothing else due today. Nice work.</p>`}</div>`;
  }
  // Exam readiness, 0-100: weighted domain accuracy (trusted as more questions are answered), lessons read,
  // the best recent practice exam, and a penalty for an overdue review queue.
  function readiness() {
    const st = S.p.stats || {};
    const acc = C.domains.reduce((a, d) => { const x = st[d.id] || { c: 0, t: 0 }, conf = Math.min(1, x.t / 20), p = x.t ? x.c / x.t : 0; return a + d.w / 100 * (conf * p + (1 - conf) * 0.35); }, 0);
    const all = LES ? W.flatMap(w => lessonTopics(w).filter(t => LES.has(t))) : [];
    const lessonsPct = all.length ? all.filter(isRead).length / all.length : 0;
    const exams = (S.p.history || []).filter(h => h.kind === "full" || /practice exam|full-length/i.test(h.title)).slice(0, 3);
    const exam = exams.length ? Math.max(...exams.map(h => h.score / h.total)) : null;
    const due = dueIds().length;
    const score = Math.max(0, Math.min(100, Math.round(100 * (0.5 * acc + 0.15 * lessonsPct + 0.35 * (exam ?? acc * 0.9)) - Math.min(10, due / 5))));
    const tips = [];
    const weak = C.domains.map(d => ({ d, x: st[d.id] || { c: 0, t: 0 } })).filter(r => r.x.t >= 5).sort((a, b) => a.x.c / a.x.t - b.x.c / b.x.t)[0];
    if (weak && weak.x.c / weak.x.t < 0.8) tips.push(`Drill Domain ${weak.d.id} (${Math.round(100 * weak.x.c / weak.x.t)}% so far).`);
    if (C.domains.some(d => !(st[d.id] && st[d.id].t >= 10))) tips.push("Answer at least 10 questions in every domain so the score has enough to go on.");
    if (all.length && lessonsPct < 0.9) tips.push(`Read the remaining ${all.length - all.filter(isRead).length} lessons.`);
    if (exam == null) tips.push("Take a full practice exam.");
    else if (exam < 0.85) tips.push(`Get a practice exam to 85% or better (best recent: ${Math.round(100 * exam)}%).`);
    if (due > 10) tips.push(`Clear your review queue (${due} due).`);
    return { score, band: score >= 80 ? ["Ready to book", "var(--ok)"] : score >= 60 ? ["Getting close", "var(--warn)"] : ["Not yet", "var(--bad)"], tips };
  }
  function readinessHtml() {
    const r = readiness();
    return `<div class="panel ready"><div class="flex"><div><strong>Exam readiness</strong><br><span class="chip" style="--c:${r.band[1]}">${r.band[0]}</span></div><div class="big" style="margin:0">${r.score}<small>/100</small></div></div>
      <div class="track" aria-hidden="true"><i style="width:${r.score}%;background:${r.band[1]}"></i></div>
      ${r.tips.length ? `<ul class="clean">${r.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : `<p class="note" style="margin:8px 0 0">Everything points to ready. Book the exam while it's fresh.</p>`}
      <p class="note" style="margin:8px 0 0">An estimate from your quiz accuracy by domain (weighted like the exam), lessons read, recent practice exams and review backlog. It isn't the real exam's scoring.</p></div>`;
  }
  // Plan badge: every lesson read and a practice exam at 80% or better.
  function badgeState() {
    const all = LES ? W.flatMap(w => lessonTopics(w).filter(t => LES.has(t))) : [];
    const read = all.filter(isRead).length;
    const best = Math.max(0, ...(S.p.history || []).filter(h => h.kind === "full" || /practice exam|full-length/i.test(h.title)).map(h => Math.round(100 * h.score / h.total)));
    return { earned: all.length > 0 && read === all.length && best >= 80, read, total: all.length, best };
  }
  function badgeHtml() {
    const b = badgeState();
    return `<div class="panel startcard"><div class="grow"><strong>${b.earned ? `${esc(C.short)} study plan complete` : "Earn your completion badge"}</strong><br><span class="note">${b.earned ? "Download a badge to share on LinkedIn or add to your portfolio." : `Read every lesson (${b.read} of ${b.total}) and score 80% or better on a practice exam (best: ${b.best || 0}%).`}</span></div>${b.earned ? `<button class="btn sm" data-act="badge">Download badge</button>` : ""}</div>`;
  }
  // Cheat sheet: every lesson's exam tip and key terms, grouped by domain, ready to print.
  function cheatView() {
    if (LES === null) return `<h1>${esc(C.short)} cheat sheet</h1><p class="note">Loading…</p>`;
    if (!LES) return `<h1>${esc(C.short)} cheat sheet</h1><p class="note">The cheat sheet is built from the lessons, which aren't ready for this certification yet.</p>`;
    const ports = NETWORKISH.has(C.id) ? `<h2>Common ports</h2><div class="panel"><div class="scroll" tabindex="0" role="region" aria-label="Common ports table"><table class="sectable"><thead><tr><th>Protocol</th><th>Port</th></tr></thead><tbody>${PORTS.map(([a, b]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join("")}</tbody></table></div></div>` : "";
    return `<p class="crumbs no-print"><button type="button" class="linkbtn" data-tab="learn">Lessons</button> / Cheat sheet</p>
    <h1>${esc(C.short)} ${esc(C.exam)} cheat sheet</h1>
    <p class="meta">Every lesson's exam tip and key terms on one page, by domain. <button type="button" class="btn ghost sm no-print" data-act="printcheat">Print or save as PDF</button></p>
    ${C.domains.map(d => {
      const ts = W.filter(w => w.dom === d.id).flatMap(lessonTopics).filter(t => LES.has(t)); if (!ts.length) return "";
      const ls = ts.map(t => LES.get(t));
      return `<h2 style="--c:${dc(d.id)}">Domain ${d.id}: ${esc(d.name)} <small class="note">${d.w}%</small></h2>
      <div class="panel cheat"><h3>Exam tips</h3><ul class="clean">${ls.map(l => `<li>${inline(l.tip)}</li>`).join("")}</ul>
      <h3>Key terms</h3><dl class="terms">${ls.flatMap(l => l.terms || []).filter((x, i, a) => a.findIndex(y => y[0].toLowerCase() === x[0].toLowerCase()) === i).map(([a, b]) => `<dt>${inline(a)}</dt><dd>${inline(b)}</dd>`).join("")}</dl></div>`;
    }).join("")}${ports}`;
  }
  function streakHtml() {
    const st = CertHub.activity.streak();
    if (!st.current && !st.best) return "";
    return `<p class="streak note">${st.current ? `<strong>${st.current}-day study streak</strong>${st.today ? "" : ". Study today to keep it going"}` : "No study yet today"}${st.best > st.current ? ` · best ${st.best} days` : ""} · <button type="button" class="linkbtn" data-act="reminder">Set a daily reminder</button></p>`;
  }
  function placementHtml() {
    const pl = S.p.placement; if (!pl) return "";
    const rows = C.domains.filter(d => pl.dom[d.id] != null).map(d => ({ d, pct: pl.dom[d.id], week: (W.find(w => w.dom === d.id) || {}).n })).sort((a, b) => a.pct - b.pct);
    const focus = rows.filter(r => r.pct < 70), strong = rows.filter(r => r.pct >= 85);
    return `<h2>Where to start</h2><div class="panel">
      ${focus.length ? `<p style="margin:0 0 8px"><strong>Focus first on:</strong></p><ul class="clean">${focus.map(r => `<li>Domain ${r.d.id}: ${esc(r.d.name)} (${r.pct}%) ${r.week ? `<button type="button" class="linkbtn" data-open="${r.week}">Go to week ${r.week}</button>` : ""}</li>`).join("")}</ul>` : `<p style="margin:0">No weak domains. Follow the plan in order and aim for 85%+ on each checkpoint.</p>`}
      ${strong.length ? `<p class="note" style="margin:10px 0 0">You already know a lot of ${strong.map(r => `Domain ${r.d.id}`).join(", ")}. Skim those lessons and spend the saved time on your focus areas.</p>` : ""}
      <p class="note" style="margin:10px 0 0">A placement test is short, so treat this as a starting point. Retake it any time from Quizzes &amp; tests.</p></div>`;
  }
  /* ---------- exam simulations (performance-based questions) ---------- */
  const SIM_TYPE = { match: "Matching", order: "Put in order", select: "Select all that apply", fill: "Fill in" };
  function simsSection() {
    if (SIMS === null) return `<h2>Exam simulations</h2><p class="note">Loading…</p>`;
    if (!SIMS || !SIMS.length) return "";
    const res = S.p.sims || {};
    return `<h2>Exam simulations</h2>
    <p class="note">Hands-on items like the performance-based questions on the real exam: match, order, read logs and configs, and fill in values.</p>
    <div class="panel">${SIMS.map(p => { const r = res[p.id]; return `<div class="row"><div class="grow"><h3>${esc(p.title)}</h3><span class="note">${SIM_TYPE[p.type] || ""} · Domain ${esc(p.d)}${r ? ` · best ${r.best}%` : ""}</span></div><button class="btn ${r ? "ghost" : ""}" data-act="simstart" data-id="${esc(p.id)}">${r ? "Retry" : "Start"}</button></div>`; }).join("")}</div>`;
  }
  function simStart(id) {
    const p = SIMS && SIMS.find(x => x.id === id); if (!p) return;
    const st = { p, done: false };
    if (p.type === "match") { st.opts = shuffle([...new Set(p.pairs.map(x => x[1]).concat(p.extra || []))]); st.items = shuffle(p.pairs.map((_, i) => i)); st.ans = p.pairs.map(() => ""); }
    if (p.type === "order") { do { st.order = shuffle(p.steps.map((_, i) => i)); } while (p.steps.length > 1 && st.order.every((v, i) => v === i)); }
    if (p.type === "select") st.ans = new Set();
    if (p.type === "fill") st.ans = p.fields.map(() => "");
    S.sim = st; render(); window.scrollTo(0, 0);
  }
  const norm = x => String(x).trim().toLowerCase().replace(/\s+/g, " ");
  function simCheck() {
    const st = S.sim, p = st.p; let ok = 0, tot = 0;
    if (p.type === "match") { st.marks = st.ans.map((a, i) => a === p.pairs[i][1]); }
    if (p.type === "order") { st.marks = st.order.map((v, k) => v === k); }
    if (p.type === "select") { st.marks = p.options.map((_, i) => st.ans.has(i) === p.answers.includes(i)); }
    if (p.type === "fill") { st.marks = p.fields.map((f, i) => f.answers.some(a => norm(a) === norm(st.ans[i]))); }
    tot = st.marks.length; ok = st.marks.filter(Boolean).length;
    st.done = true; st.pct = Math.round(100 * ok / tot); st.ok = ok; st.tot = tot;
    const sims = S.p.sims || (S.p.sims = {}), prev = sims[p.id];
    sims[p.id] = { best: Math.max(st.pct, prev ? prev.best : 0), at: Date.now() };
    CertHub.activity.mark(); save(); render(); window.scrollTo(0, 0);
  }
  const mark = (st, i) => st.done ? (st.marks[i] ? `<span class="simok" aria-label="correct">✓</span>` : `<span class="simbad" aria-label="incorrect">✗</span>`) : "";
  function simView() {
    const st = S.sim, p = st.p, dis = st.done ? "disabled" : "";
    let body = "";
    if (p.type === "match") body = `<div class="simgrid">${st.items.map(i => `<div class="simrow"><label for="sim-${i}">${esc(p.pairs[i][0])}</label><span class="grow"><select id="sim-${i}" data-simm="${i}" ${dis}><option value="">Choose…</option>${st.opts.map(o => `<option ${st.ans[i] === o ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>${mark(st, i)}${st.done && !st.marks[i] ? `<br><span class="note">Answer: ${esc(p.pairs[i][1])}</span>` : ""}</span></div>`).join("")}</div>`;
    if (p.type === "order") body = `<ol class="simorder">${st.order.map((v, k) => `<li><span class="grow">${esc(p.steps[v])} ${mark(st, k)}${st.done && !st.marks[k] ? `<br><span class="note">Step ${k + 1} should be: ${esc(p.steps[k])}</span>` : ""}</span>${st.done ? "" : `<span class="simbtns"><button type="button" class="btn ghost sm" data-simup="${k}" ${k ? "" : "disabled"} aria-label="Move up: ${esc(p.steps[v])}">↑</button><button type="button" class="btn ghost sm" data-simdown="${k}" ${k < st.order.length - 1 ? "" : "disabled"} aria-label="Move down: ${esc(p.steps[v])}">↓</button></span>`}</li>`).join("")}</ol>`;
    if (p.type === "select") body = `<fieldset class="simsel"><legend class="sr-only">${esc(p.prompt)}</legend>${p.options.map((o, i) => `<label class="simopt"><input type="checkbox" data-sims="${i}" ${st.ans.has(i) ? "checked" : ""} ${dis}><span class="grow">${esc(o)}</span>${mark(st, i)}</label>`).join("")}</fieldset>${st.done ? `<p class="note">Correct selection: ${p.answers.map(i => esc(p.options[i])).join("; ")}</p>` : ""}`;
    if (p.type === "fill") body = `<div class="simgrid">${p.fields.map((f, i) => `<div class="simrow"><label for="simf-${i}">${esc(f.label)}</label><span class="grow"><input type="text" id="simf-${i}" data-simf="${i}" value="${esc(st.ans[i])}" autocomplete="off" autocapitalize="off" spellcheck="false" ${dis}>${mark(st, i)}${st.done && !st.marks[i] ? `<br><span class="note">Answer: ${esc(f.answers[0])}</span>` : ""}</span></div>`).join("")}</div>`;
    return `<div class="qhead"><strong>${esc(p.title)}</strong><button class="btn ghost sm" data-act="simquit">Back</button></div>
    <p class="note">${SIM_TYPE[p.type]} · Domain ${esc(p.d)}</p>
    <p class="q">${esc(p.prompt)}</p>
    ${p.context ? `<pre class="code ctx" tabindex="0">${esc(p.context)}</pre>` : ""}
    ${body}
    ${st.done ? `<div class="expl" role="status" style="--c:${st.pct === 100 ? "var(--ok)" : "var(--bad)"}"><strong>${st.ok} of ${st.tot} correct (${st.pct}%).</strong> ${esc(p.explain)}</div>` : ""}
    <div class="btns">${st.done ? `<button class="btn" data-act="simretry">Try again</button><button class="btn ghost" data-act="simquit">All simulations</button>` : `<button class="btn" data-act="simcheck">Check answers</button>`}</div>`;
  }

  /* ---------- skill drills: 60-second rounds ---------- */
  const NETWORKISH = new Set(["isc2-cc", "security-plus", "cysa-plus", "sscp", "cissp", "ccst-networking", "network-plus", "ccna", "ccnp-encor", "jncia-junos", "cwna", "a-plus-core1", "a-plus-core2", "server-plus", "linux-plus", "rhcsa", "palo-alto-ngfw", "fortinet-fortigate", "az-104", "az-802", "sc-500"]);
  const SUBNETTING = new Set(["security-plus", "ccst-networking", "network-plus", "ccna", "ccnp-encor", "jncia-junos", "a-plus-core1", "server-plus", "palo-alto-ngfw", "fortinet-fortigate", "az-104", "az-802", "isc2-cc", "sscp"]);
  const PORTS = [["FTP (data)", "20"], ["FTP (control)", "21"], ["SSH / SFTP", "22"], ["Telnet", "23"], ["SMTP", "25"], ["DNS", "53"], ["DHCP (server)", "67"], ["TFTP", "69"], ["HTTP", "80"], ["Kerberos", "88"], ["POP3", "110"], ["NTP", "123"], ["NetBIOS name service", "137"], ["IMAP", "143"], ["SNMP", "161"], ["SNMP trap", "162"], ["LDAP", "389"], ["HTTPS", "443"], ["SMB", "445"], ["Syslog", "514"], ["SMTP submission", "587"], ["LDAPS", "636"], ["IMAPS", "993"], ["POP3S", "995"], ["MS SQL Server", "1433"], ["RADIUS (authentication)", "1812"], ["MySQL", "3306"], ["RDP", "3389"], ["SIP", "5060"], ["PostgreSQL", "5432"]];
  const drillKinds = () => [
    LES ? ["terms", "Key terms", "Match definitions to terms from your lessons"] : null,
    NETWORKISH.has(C.id) ? ["ports", "Ports and protocols", "Common default ports, both directions"] : null,
    SUBNETTING.has(C.id) ? ["subnet", "Subnetting", "Network, broadcast, mask and host counts"] : null
  ].filter(Boolean);
  function drillsSection() {
    const k = drillKinds(); if (!k.length) return "";
    const best = S.p.drills || {};
    return `<h2>Skill drills</h2><p class="note">60-second rounds. Answer as many as you can; wrong answers show the right one.</p>
    <div class="panel">${k.map(([id, t, n]) => `<div class="row"><div class="grow"><h3>${t}</h3><span class="note">${n}${best[id] ? ` · best ${best[id]}` : ""}</span></div><button class="btn ghost" data-act="drillstart" data-kind="${id}">Start</button></div>`).join("")}</div>`;
  }
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const ip2s = n => [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
  function drillQuestion(kind) {
    if (kind === "ports") {
      const [name, port] = pick(PORTS), others = shuffle(PORTS.filter(p => p[0] !== name)).slice(0, 3);
      return Math.random() < 0.5
        ? { q: `Default port for ${name}?`, o: shuffle([port, ...others.map(p => p[1])].filter((v, i, a) => a.indexOf(v) === i)), a: port }
        : { q: `Port ${port} is used by…`, o: shuffle([name, ...others.map(p => p[0])]), a: name };
    }
    if (kind === "subnet") {
      const prefix = 20 + Math.floor(Math.random() * 11), base = pick([0x0A000000, 0xAC100000, 0xC0A80000]);
      const ip = (base + Math.floor(Math.random() * 65536)) >>> 0, mask = prefix ? (0xFFFFFFFF << (32 - prefix)) >>> 0 : 0;
      const net = (ip & mask) >>> 0, bc = (net | (~mask >>> 0)) >>> 0, size = 2 ** (32 - prefix), hosts = Math.max(0, size - 2);
      const f = pick(["net", "bc", "hosts", "mask"]), where = `${ip2s(ip)}/${prefix}`;
      if (f === "net") return { q: `Network address of ${where}?`, o: shuffle([...new Set([ip2s(net), ip2s(net + size), ip2s(Math.max(0, net - size)), ip2s(ip)])]).slice(0, 4), a: ip2s(net) };
      if (f === "bc") return { q: `Broadcast address of ${where}?`, o: shuffle([...new Set([ip2s(bc), ip2s(bc - 1), ip2s(bc + size), ip2s(net)])]), a: ip2s(bc) };
      if (f === "hosts") return { q: `Usable hosts in a /${prefix}?`, o: shuffle([...new Set([String(hosts), String(size), String(hosts * 2 + 2), String(Math.max(0, size / 2 - 2))])]), a: String(hosts) };
      const m = n => ip2s(n ? (0xFFFFFFFF << (32 - n)) >>> 0 : 0);
      return { q: `Subnet mask for /${prefix}?`, o: shuffle([...new Set([m(prefix), m(Math.max(8, prefix - 1)), m(Math.min(32, prefix + 1)), m(Math.max(8, prefix - 8))])]), a: m(prefix) };
    }
    const all = [...LES.values()].flatMap(l => l.terms || []).filter(([a, b]) => a.length < 60 && b.length > 20);
    const [term, def] = pick(all), others = shuffle(all.filter(x => x[0].toLowerCase() !== term.toLowerCase())).slice(0, 3);
    const hint = plain(def).split(/(?<=[.!?])\s+/)[0].replace(new RegExp(plain(term).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "____");
    return { q: hint, o: shuffle([plain(term), ...others.map(x => plain(x[0]))]), a: plain(term) };
  }
  let drillT;
  function drillStart(kind) { S.drill = { kind, end: Date.now() + 60000, score: 0, n: 0, cur: drillQuestion(kind), fb: null, done: false }; render(); drillTick(); }
  function drillTick() {
    clearTimeout(drillT);
    const d = S.drill; if (!d || d.done) return;
    const left = d.end - Date.now(), el = $("#dtimer");
    if (left <= 0) {
      d.done = true; const best = S.p.drills || (S.p.drills = {}); best[d.kind] = Math.max(best[d.kind] || 0, d.score);
      if (d.n) CertHub.activity.mark(); save(); if (S.tab === "practice") render(); return;
    }
    if (el) el.textContent = Math.ceil(left / 1000) + "s";
    drillT = setTimeout(drillTick, 250);
  }
  function drillAnswer(v) {
    const d = S.drill; if (!d || d.done || d.fb) return;
    const ok = v === d.cur.a; d.n++; if (ok) d.score++;
    d.fb = { ok, v };
    render();
    setTimeout(() => { if (S.drill === d && !d.done) { d.fb = null; d.cur = drillQuestion(d.kind); if (S.tab === "practice") render(); } }, ok ? 450 : 1400);
  }
  function drillView() {
    const d = S.drill, name = (drillKinds().find(k => k[0] === d.kind) || [])[1] || "Drill";
    if (d.done) return `<div class="qhead"><strong>${esc(name)}</strong><button class="btn ghost sm" data-act="drillquit">Done</button></div>
      <div class="panel"><div class="big">${d.score}</div><p class="meta">correct in 60 seconds (${d.n} answered). Best: ${(S.p.drills || {})[d.kind] || d.score}.</p>
      <div class="btns"><button class="btn" data-act="drillstart" data-kind="${d.kind}">Play again</button><button class="btn ghost" data-act="drillquit">Back</button></div></div>`;
    const q = d.cur;
    return `<div class="qhead"><strong>${esc(name)}</strong><span><span class="timer" id="dtimer">${Math.ceil((d.end - Date.now()) / 1000)}s</span> · ${d.score} correct · <button class="btn ghost sm" data-act="drillquit">Stop</button></span></div>
    <p class="q">${esc(q.q)}</p>
    ${q.o.map(o => { let cls = ""; if (d.fb) { if (o === q.a) cls = "right"; else if (o === d.fb.v) cls = "wrong"; } return `<button class="opt ${cls}" data-drill="${esc(o)}">${esc(o)}</button>`; }).join("")}
    <p class="note" role="status">${d.fb ? (d.fb.ok ? "Correct" : `Answer: ${esc(q.a)}`) : ""}</p>`;
  }

  function glossaryHtml(topics) {
    const seen = new Map();
    topics.forEach(t => (LES.get(t).terms || []).forEach(([a, b]) => { const k = a.toLowerCase(); if (!seen.has(k)) seen.set(k, [a, b, t]); }));
    const list = [...seen.values()].sort((x, y) => x[0].localeCompare(y[0], undefined, { sensitivity: "base" }));
    return list.length ? `<details class="week glossary"><summary><span class="grow"><strong>Glossary</strong><br><span class="note">${list.length} key terms from these lessons, A to Z</span></span></summary>
      <dl class="terms">${list.map(([a, b, t]) => `<dt>${inline(a)}</dt><dd>${inline(b)} <button type="button" class="linkbtn" data-act="golesson" data-k="${lessonKey(t)}">Lesson</button></dd>`).join("")}</dl></details>` : "";
  }
  // Filters the Lessons tab as the person types: titles, key terms and lesson text.
  function searchLessons(qs) {
    const q = qs.trim().toLowerCase(), app = $("#app");
    let shown = 0;
    app.querySelectorAll("ul.lessons > li").forEach(li => {
      const det = li.querySelector("details.lesson"); if (!det) return;
      const t = [...LES.keys()].find(x => lessonKey(x) === det.dataset.k), l = LES.get(t);
      const hay = !q ? "" : (t + " " + (l.terms || []).flat().join(" ") + " " + (l.body || []).join(" ") + " " + (l.tip || "")).toLowerCase();
      const hit = !q || q.split(/\s+/).every(w => hay.includes(w));
      li.hidden = !hit; if (hit) shown++;
    });
    app.querySelectorAll(".learn-week").forEach(sec => { sec.hidden = !!q && !sec.querySelector("ul.lessons > li:not([hidden])"); });
    app.querySelectorAll(".learn-dom").forEach(sec => { sec.hidden = !!q && !sec.querySelector(".learn-week:not([hidden])"); });
    const n = $("#lsearch-n"); if (n) n.textContent = q ? `${shown} lesson${shown === 1 ? "" : "s"} match "${qs.trim()}".` : "";
  }
  function learnView() {
    const head = `<h1>Lessons</h1>`;
    if (LES === null) return head + `<p class="note">Loading lessons…</p>`;
    if (!LES) return head + `<p class="meta">Lessons for ${esc(C.short)} are being written. Until then, use each week's topic list with a study guide or video course, then check yourself with the weekly quiz.</p>`;
    const all = W.flatMap(w => lessonTopics(w).filter(t => LES.has(t)));
    const done = all.filter(isRead).length;
    return head + `<p class="meta">A short lesson for every topic in your ${W.length}-week plan, in plan order. Read a lesson, answer its check questions, then take that week's quiz. ${done} of ${all.length} read. <a href="/${C.id}/lessons/">Open as web pages to share</a></p>
    <div class="panel bars"><div class="b"><div class="track"><i style="width:${all.length ? Math.round(100 * done / all.length) : 0}%"></i></div></div></div>
    <div class="btns no-print" style="margin-top:6px">
      <button type="button" class="btn ghost sm" data-tab="cheat">Cheat sheet</button>
      ${C.hasLessonsEs ? `<button type="button" class="btn ghost sm" data-act="lang" aria-pressed="${LANG === "es"}">${LANG === "es" ? "Read in English" : "Leer en español"}</button>` : ""}
      ${"serviceWorker" in navigator ? `<button type="button" class="btn ghost sm" data-act="offline">Save for offline</button>` : ""}
    </div>
    ${(CertHub.lessonMeta[C.id] || {}).reviewed ? `<p class="note">Lessons last reviewed ${esc(fmtLong(parseD(CertHub.lessonMeta[C.id].reviewed)))}.</p>` : ""}
    <div class="flex no-print lsearch"><label class="grow"><span class="sr-only">Search lessons</span><input type="search" id="lsearch" placeholder="Search lessons and key terms" autocomplete="off"></label><button type="button" class="btn ghost sm" data-act="printlessons">Print or save as PDF</button></div>
    <p class="note" id="lsearch-n" role="status"></p>
    ${glossaryHtml(all)}
    ${C.domains.map(d => {
      const ws = W.filter(w => w.dom === d.id && lessonTopics(w).some(t => LES.has(t)));
      if (!ws.length) return "";
      const n = ws.flatMap(lessonTopics).filter(t => LES.has(t));
      return `<section class="learn-dom"><h2 style="--c:${dc(d.id)}">Domain ${d.id}: ${esc(d.name)}</h2>
      <p class="note">${d.w}% of the exam · ${n.filter(isRead).length} of ${n.length} read</p>
      ${ws.map(w => `<div class="learn-week"><h3>Week ${w.n}${ws.length > 1 || w.title !== d.name ? `: ${esc(w.title)}` : ""}</h3>
      <div class="panel wk" style="--c:${dc(d.id)}"><ul class="clean lessons">${lessonTopics(w).map(t => lessonHtml(t, w.n)).join("")}</ul></div></div>`).join("")}</section>`;
    }).join("")}`;
  }

  function planView() {
    const now = weekNow();
    const hours = C.hoursPerWeek || "6–8";
    return `<h1>Your ${W.length}-week route</h1>
    <p class="meta">${fmtLong(weekStart(1))} to the week of ${fmtLong(weekStart(W.length))}. About ${esc(hours)} hours a week: 45–60 minutes on weekdays and a longer Saturday session. A checkpoint test closes each domain and full practice exams close the plan. Change the start date on the Progress tab.</p>
    ${checkBanner()}
    ${routeMap(now)}
    ${PLAN.phases.map(([a, b, t]) => `<h2>${esc(t)}</h2>` + W.slice(a - 1, b).map(w => `<details class="week" style="--c:${dc(w.dom)}" ${w.n === now ? "open" : ""}><summary><span class="num">W${w.n}</span><span class="grow"><strong>${esc(w.title)}</strong><br><span class="note">${fmt(weekStart(w.n))} · ${esc(w.obj)}</span></span></summary>
      <ul class="clean">${w.topics.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
      ${w.notes && w.notes.length ? `<p class="note" style="margin-top:8px">Reread: ${esc(w.notes.join(", "))}</p>` : ""}
      <div class="btns"><button class="btn ghost sm" data-open="${w.n}">Open week</button><button class="btn ghost sm" data-act="weekly" data-w="${w.n}">Quiz</button></div></details>`).join("")).join("")}`;
  }
  function practiceView() {
    if (S.quiz) return quizView();
    if (S.sim) return simView();
    if (S.drill) return drillView();
    if (!Array.isArray(C.questions)) return `<h1>Quizzes & tests</h1><p class="note">Loading questions…</p>`;
    const due = dueIds().length;
    const cnt = d => Q.filter(q => q.d === d).length;
    const ex = examQs().length;
    return `<h1>Quizzes & tests</h1>
    <p class="meta">${Q.length} questions in the bank${PRO ? ` (${FREE_Q.length} free + ${PRO.questions.length} Pro)` : ""}, written from the official exam objectives${C.id === "security-plus" ? " and your bootcamp notes" : ""}. Answer options are shuffled every time.</p>
    <h2>Quick practice</h2>
    <div class="panel">
      <div class="row"><div class="grow"><h3>Placement test</h3><span class="note">${S.p.placement ? `Last taken ${esc(fmt(new Date(S.p.placement.at)))}. Retake it to see where you stand now.` : "A few questions from every domain to find what you already know and where to start"}</span></div><button class="btn ${S.p.placement ? "ghost" : ""}" data-act="placement">${S.p.placement ? "Retake" : "Start"}</button></div>
      <div class="row"><div class="grow"><h3>Weekly quiz</h3><span class="note">10 questions with instant feedback</span></div><select id="wsel" aria-label="Week">${W.map(w => `<option value="${w.n}" ${w.n === weekNow() ? "selected" : ""}>Week ${w.n}</option>`).join("")}</select><button class="btn" data-act="weekly-sel">Start</button></div>
      <div class="row"><div class="grow"><h3>Review queue</h3><span class="note">Questions you missed, spaced 1, 3, 7 and 14 days apart</span></div><button class="btn" data-act="review" ${due ? "" : "disabled"}>${due ? `Review ${due}` : "Nothing due"}</button></div>
      <div class="row"><div class="grow"><h3>Domain drill</h3><span class="note">15 random questions</span></div><select id="dsel" aria-label="Domain">${C.domains.map(d => `<option value="${d.id}">D${d.id} (${cnt(d.id)})</option>`).join("")}</select><button class="btn" data-act="drill">Start</button></div>
    </div>
    ${simsSection()}
    ${drillsSection()}
    <h2>Checkpoint tests</h2>
    <p class="note">Timed, up to 25 questions, answers shown at the end. Aim for 80% or better before moving on.</p>
    <div class="panel">${PLAN.checkpoints.map(c => `<div class="row"><div class="grow"><h3>Domain ${c.dom}: ${esc(DOM[c.dom].name)}</h3><span class="note">End of week ${c.after} · ${Math.min(25, cnt(c.dom))} questions, ${Math.max(5, Math.round(30 * Math.min(25, cnt(c.dom)) / 25))} minutes</span></div><button class="btn ghost" data-act="checkpoint" data-d="${c.dom}">Start</button></div>`).join("")}</div>
    <h2>Full practice exam</h2>
    <div class="panel"><div class="row"><div class="grow"><h3>Exam simulation</h3><span class="note">Weighted like the real exam. ${ex} questions available now${ex < C.examSim.questions ? ` (the real exam has ${C.examSim.questions})` : ""}, ${examMinutes(ex)} minutes at the real exam's pace.</span></div><button class="btn" data-act="exam">Start</button></div>
    ${fullExamRow()}</div>
    ${Pro().available && !Pro().active ? Pro().teaser(`Get about 300 more ${C.short} questions and full-length ${C.examSim.questions}-question exams with a pass estimate.`) : ""}`;
  }
  function fullExamRow() {
    if (!Pro().available) return "";
    const N = C.examSim.questions, M = C.examSim.minutes;
    const ready = Pro().active && PRO;
    return `<div class="row"><div class="grow"><h3>Full-length exam <span class="chip pro">Pro</span></h3><span class="note">${N} questions in ${M} minutes, weighted like the real exam, with a pass estimate at the end.${Pro().active && !PRO ? " Loading the Pro question bank…" : ""}</span></div>${ready ? `<button class="btn" data-act="fullexam">Start</button>` : Pro().active ? "" : `<a class="btn ghost" href="#account">Unlock</a>`}</div>`;
  }
  // A rough pass estimate from a full-length score. Real exams use scaled scores, so this is a guide.
  const passBand = pct => pct >= 85 ? ["Likely pass", "var(--ok)"] : pct >= 75 ? ["Borderline", "var(--warn)"] : ["Not yet", "var(--bad)"];
  const examMinutes = n => Math.max(10, Math.round(C.examSim.minutes * n / C.examSim.questions));
  function quizView() {
    const z = S.quiz;
    if (z.done) {
      const pct = Math.round(100 * z.score / z.qs.length);
      return `<div class="qhead"><strong>${esc(z.title)}</strong><button class="btn ghost sm" data-act="quit">Done</button></div>
      <div class="panel"><div class="big">${pct}%</div><p class="meta">${z.score} of ${z.qs.length} correct${z.mode === "test" ? (pct >= 85 ? ". Exam-ready range." : pct >= 75 ? ". Close. Review the misses below." : ". Revisit these topics before moving on.") : ""}</p>
      ${z.kind === "full" ? `<p style="margin:8px 0 0"><span class="chip" style="--c:${passBand(pct)[1]}">${passBand(pct)[0]}</span> <span class="note">Pass estimate. Real exams use scaled scores, so treat 85%+ on full-length exams as your target.</span></p>
      <div class="bars" style="margin-top:12px">${C.domains.map(d => { const qs = z.qs.map((q, i) => [q, i]).filter(([q]) => q.d === d.id); const c = qs.filter(([q, i]) => z.ans[i] === q.a).length; const p = qs.length ? Math.round(100 * c / qs.length) : 0; return `<div class="b" style="--c:${dc(d.id)}"><div class="flex"><span>D${d.id} ${esc(d.name)}</span><strong>${c}/${qs.length}</strong></div><div class="track"><i style="width:${p}%"></i></div></div>`; }).join("")}</div>` : ""}</div>
      ${z.kind === "placement" ? placementHtml() : ""}
      <h2>Review</h2>${z.qs.map((q, i) => { const ok = z.ans[i] === q.a; return `<div class="panel" style="--c:${ok ? "var(--ok)" : "var(--bad)"}"><p style="margin:0 0 6px"><strong>${ok ? "Correct" : "Missed"}</strong> · <span class="note">${esc(domName(q.d))}</span></p><p class="qtext" style="margin:0 0 8px">${esc(q.q)}</p>${ok ? "" : `<p class="note" style="margin:0">Your answer: ${esc(z.ans[i] == null ? "none" : q.o[z.ans[i]])}</p>`}<p style="margin:4px 0 0"><strong>${esc(q.o[q.a])}</strong></p><div class="expl">${esc(q.e)}${whyHtml(q, z.ans[i])}${q.src ? `<br><small class="note">Source: ${esc(q.src)}</small>` : ""}${ok ? "" : `<br>${lessonLink(q)}`}<br>${qReport(q)}</div></div>`; }).join("")}`;
    }
    const q = z.qs[z.i];
    const opts = q.o.map((o, k) => {
      let cls = "";
      if (z.revealed) { if (k === q.a) cls = "right"; else if (k === z.picked) cls = "wrong"; }
      return `<button class="opt ${cls}" data-opt="${k}" aria-pressed="${z.picked === k}">${esc(o)}</button>`;
    }).join("");
    return `<div class="qhead"><strong>${esc(z.title)}</strong><span>${z.end ? `<span class="timer" id="timer" aria-label="Time left"></span> · ` : ""}<button class="btn ghost sm" data-act="quit">Quit</button></span></div>
    <div class="flex note"><span>Question ${z.i + 1} of ${z.qs.length}</span><span>Domain ${q.d}</span></div>
    <div class="prog" style="--c:${dc(q.d)}"><i style="width:${100 * (z.i + 1) / z.qs.length}%"></i></div>
    <p class="q">${esc(q.q)}</p>${opts}
    ${z.revealed ? `<div class="expl" role="status" style="--c:${z.picked === q.a ? "var(--ok)" : "var(--bad)"}"><strong>${z.picked === q.a ? "Correct." : "Not quite."}</strong> ${esc(q.e)}${whyHtml(q, z.picked)}${q.src ? `<br><small class="note">Source: ${esc(q.src)}</small>` : ""}${z.picked !== q.a ? `<br>${lessonLink(q)}` : ""}<br>${qReport(q)}</div>` : ""}
    <div class="btns">${z.mode === "test" && z.i > 0 ? `<button class="btn ghost" data-act="prev">Back</button>` : ""}
    ${(z.mode === "learn" && z.revealed) || z.mode === "test" ? `<button class="btn" data-act="next">${z.i + 1 === z.qs.length ? "Finish" : "Next"}</button>` : ""}
    ${z.mode === "test" ? `<button class="btn ghost" data-act="finish">Submit test</button>` : ""}</div>`;
  }
  function labsView() {
    const all = planLabs();
    const lp = CertHub.loadLabProgress();
    const done = all.filter(x => CertHub.labStatus(x.lab, lp).state === "done").length;
    return `<h1>${esc(C.short)} labs</h1>
    <p class="meta">${all.length} hands-on labs linked to this plan · ${done} finished. They use free tools in your own home lab and build a portfolio as you go. <a href="#labs">All labs</a> · <a href="#portfolio">Your portfolio</a></p>
    ${all.length ? PLAN.phases.map(([a, b, t]) => {
      const here = all.filter(x => x.week.n >= a && x.week.n <= b);
      return here.length ? `<h2>${esc(t)}</h2><div class="labgrid">${here.map(x => CertHub.labCard(x.lab, `Week ${x.week.n}`)).join("")}</div>` : "";
    }).join("") : `<p class="note">No labs are linked to this plan yet.</p>`}`;
  }
  function progressView() {
    const st = S.p.stats;
    const rows = C.domains.map(d => { const s = st[d.id] || { c: 0, t: 0 }; return { d: d.id, pct: s.t ? Math.round(100 * s.c / s.t) : null, ...s }; });
    const tried = rows.filter(r => r.t >= 5);
    const weak = tried.length ? tried.reduce((a, b) => a.pct <= b.pct ? a : b) : null;
    const doneDays = Object.entries(S.p.checks).filter(([k, v]) => v && +k.split("-")[0] <= W.length).length;
    return `<h1>Progress</h1>
    <p class="meta">${doneDays} of ${W.length * 7} study days checked off · ${dueIds().length} questions due for review · ${Object.keys(S.p.review).length} in the review queue</p>
    ${readinessHtml()}
    ${badgeHtml()}
    <div class="panel startcard"><div class="grow"><strong>Study streak: ${CertHub.activity.streak().current} day${CertHub.activity.streak().current === 1 ? "" : "s"}</strong><br><span class="note">Best: ${CertHub.activity.streak().best} days. A day counts when you answer a question, read a lesson or check off a study day.</span></div><button class="btn ghost sm" data-act="reminder">Set a daily reminder</button></div>
    ${weak ? `<div class="status">Weakest so far: <strong>Domain ${weak.d}</strong> at ${weak.pct}%. <button class="btn ghost sm" style="margin-left:6px" data-act="drill-d" data-d="${weak.d}">Drill it</button></div>` : ""}
    <h2>Accuracy by domain</h2>
    <div class="panel bars">${rows.map(r => `<div class="b" style="--c:${dc(r.d)}"><div class="flex"><span>D${r.d} ${esc(DOM[r.d].name)} <span class="note">(${DOM[r.d].w}%)</span></span><strong>${r.pct == null ? "–" : r.pct + "%"}</strong></div><div class="track"><i style="width:${r.pct || 0}%"></i></div><span class="note">${r.c}/${r.t} answered</span></div>`).join("")}</div>
    ${Pro().available ? (Pro().active ? scoreReport(rows) : `<h2>Score report <span class="chip pro">Pro</span></h2>` + Pro().teaser("See your predicted score, weakest exam objectives, your trend over time and whether you're ready to book.")) : ""}
    <h2>Recent quizzes and tests</h2>
    <div class="panel">${S.p.history.length ? S.p.history.slice(0, 15).map(h => `<div class="row"><div class="grow">${esc(h.title)}<br><span class="note">${new Date(h.at).toLocaleDateString()}</span></div><strong>${Math.round(100 * h.score / h.total)}%</strong></div>`).join("") : `<p class="note" style="margin:0">Take this week's quiz to start tracking.</p>`}</div>
    <h2>Dates</h2>
    <div class="panel">
      <div class="row"><div class="grow"><label for="start">Plan start</label><br><span class="note">Week 1 begins on this day. Pick a Monday.</span></div><input type="date" id="start" value="${esc(S.p.start)}"></div>
      <div class="row"><div class="grow"><label for="exam">Your target test date</label><br><span class="note">${esc(C.short)} ${esc(C.exam)}</span></div><input type="date" id="exam" value="${esc(S.p.examDate)}"></div>
    </div>
    <h2>Your data</h2>
    <div class="panel"><p class="note" style="margin:0">Progress is saved only in this browser. Back it up to move it to another device.</p>
      <div class="btns"><button class="btn ghost sm no-framed" data-act="export">Download backup</button><button class="btn ghost sm" data-act="copybackup">Copy backup</button><label class="btn ghost sm" for="imp">Restore from file</label><input type="file" id="imp" accept="application/json" class="hide"><button class="btn ghost sm" data-act="pasterestore">Restore from text</button><button class="btn ghost sm" data-act="reset">Reset ${esc(C.short)} progress</button></div>
      <p class="note" id="datamsg" role="status"></p></div>`;
  }
  /* ---------- Pro: score report ---------- */
  function scoreReport(rows) {
    const answered = rows.reduce((a, r) => a + r.t, 0);
    const head = `<h2>Score report <span class="chip pro">Pro</span></h2>`;
    if (answered < 30) return head + `<div class="panel"><p class="note" style="margin:0">Answer at least 30 questions (${answered} so far) to get a predicted score. Weekly quizzes, drills and full-length exams all count.</p></div>`;
    // Predicted score: accuracy in each domain weighted by that domain's share of the exam.
    const seen = rows.filter(r => r.t >= 10);
    const wsum = seen.reduce((a, r) => a + DOM[r.d].w, 0);
    const predicted = wsum ? Math.round(seen.reduce((a, r) => a + DOM[r.d].w * r.c / r.t, 0) / wsum * 100) : null;
    const coverage = seen.reduce((a, r) => a + DOM[r.d].w, 0);
    const fulls = S.p.history.filter(h => h.kind === "full");
    const lastFull = fulls[0] ? Math.round(100 * fulls[0].score / fulls[0].total) : null;
    const weakDom = rows.filter(r => r.t >= 10 && r.pct < 75);
    let verdict, color, advice;
    if (predicted >= 85 && coverage === 100 && !weakDom.length && lastFull != null && lastFull >= 85) { verdict = "Ready to book"; color = "var(--ok)"; advice = "Your practice covers every domain and your latest full-length exam is in the passing range. Keep reviewing daily until exam day."; }
    else if (predicted >= 75) { verdict = "Almost ready"; color = "var(--warn)"; advice = [coverage < 100 ? "answer at least 10 questions in every domain" : "", weakDom.length ? `bring ${weakDom.map(r => `Domain ${r.d}`).join(", ")} above 75%` : "", lastFull == null ? "take a full-length exam" : lastFull < 85 ? "score 85%+ on a full-length exam" : ""].filter(Boolean).join(", then ").replace(/^./, c => c.toUpperCase()) + "."; }
    else { verdict = "Not ready yet"; color = "var(--bad)"; advice = "Work through the weekly plan and drill your weakest domains before taking full-length exams."; }
    // Trend: last 10 scored quizzes and tests, oldest first.
    const recent = S.p.history.slice(0, 10).reverse();
    const avg = list => list.length ? Math.round(list.reduce((a, h) => a + 100 * h.score / h.total, 0) / list.length) : null;
    const last5 = avg(S.p.history.slice(0, 5)), prev5 = avg(S.p.history.slice(5, 10));
    const objs = Object.entries(S.p.objs || {}).filter(([, o]) => o.t >= 3).map(([k, o]) => ({ k, pct: Math.round(100 * o.c / o.t), t: o.t })).sort((a, b) => a.pct - b.pct || b.t - a.t).slice(0, 6);
    return head + `<div class="panel">
      <div class="row"><div class="grow"><span class="note">Predicted score</span><div class="big">${predicted == null ? "–" : predicted + "%"}</div><span class="note">From ${answered} answers, weighted by exam domain${coverage < 100 ? `; covers ${coverage}% of the exam so far` : ""}.</span></div>
      <div><span class="chip" style="--c:${color}">${verdict}</span></div></div>
      <p style="margin:10px 0 0">${esc(advice)}</p>
      ${lastFull != null ? `<p class="note" style="margin:6px 0 0">Latest full-length exam: ${lastFull}% (${fulls.length} taken).</p>` : ""}
    </div>
    ${recent.length >= 2 ? `<h3>Trend</h3><div class="panel"><div class="trend" role="img" aria-label="Last ${recent.length} scores">${recent.map(h => { const p = Math.round(100 * h.score / h.total); return `<span class="tbar" style="height:${Math.max(4, p)}%;--c:${p >= 85 ? "var(--ok)" : p >= 75 ? "var(--warn)" : "var(--bad)"}" title="${esc(h.title)}: ${p}%"></span>`; }).join("")}</div>
      <p class="note" style="margin:8px 0 0">Last ${recent.length} quizzes and tests, oldest to newest.${last5 != null && prev5 != null ? ` Average ${last5}% for the latest 5, ${last5 >= prev5 ? "up" : "down"} ${Math.abs(last5 - prev5)} points on the 5 before.` : ""}</p></div>` : ""}
    ${objs.length ? `<h3>Weakest objectives</h3><div class="panel">${objs.map(o => `<div class="row"><div class="grow">Objective ${esc(o.k)}<br><span class="note">${o.t} answered</span></div><strong>${o.pct}%</strong></div>`).join("")}<p class="note" style="margin:8px 0 0">Look these up in the official exam objectives and reread them before your next drill.</p></div>` : ""}`;
  }

  /* ---------- Pro: flashcards and study guide ---------- */
  // Stable key for a card (content order can change between updates).
  const cardKey = f => "c" + [...String(f[1])].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7).toString(36);
  function guideView() {
    const intro = `<h1>Flashcards & study guide <span class="chip pro">Pro</span></h1>`;
    if (!Pro().active) return intro + `<p class="meta">Flashcards for every domain with spaced repetition, and a study guide you can print.</p>` + Pro().teaser(`Unlock ${C.short} flashcards and the printable study guide.`);
    if (!PRO) return intro + `<p class="note">Loading…</p>`;
    const cards = PRO.flashcards, sched = S.p.cards || {};
    const now = today().getTime() + 1000;
    const dueN = d => cards.filter(f => (!d || f[0] === d) && (!sched[cardKey(f)] || sched[cardKey(f)].due <= now)).length;
    const learned = cards.filter(f => sched[cardKey(f)] && sched[cardKey(f)].box >= 2).length;
    const guide = C.domains.map(d => ({ d, g: PRO.guide.find(x => x && x.domain === d.id) })).filter(x => x.g);
    return intro + `<p class="meta">${cards.length} flashcards · ${learned} learned · ${dueN(0)} due today. Cards you know come back after 1, 3, 7 and 14 days; cards you miss come back tomorrow.</p>
    ${S.fc ? flashcardHtml() : cards.length ? `<div class="panel no-print"><div class="row"><div class="grow"><h3>Study flashcards</h3><span class="note">Up to 20 due cards at a time</span></div><select id="fcsel" aria-label="Domain"><option value="0">All domains (${dueN(0)} due)</option>${C.domains.map(d => `<option value="${d.id}">D${d.id} ${esc(d.name)} (${dueN(d.id)})</option>`).join("")}</select><button class="btn" data-act="fcstart">Start</button></div></div>` : `<p class="note">No flashcards for ${esc(C.short)} yet.</p>`}
    ${guide.length ? `<div class="flex no-print" style="margin-top:28px"><h2 style="margin:0">Study guide</h2><button class="btn ghost sm" data-act="printguide">Print or save as PDF</button></div>
    <div class="guide">${guide.map(({ d, g }) => `<details class="week" style="--c:${dc(d.id)}"><summary><span class="num">D${d.id}</span><span class="grow"><strong>${esc(d.name)}</strong><br><span class="note">${d.w}% of the exam</span></span></summary>
      <p>${esc(g.summary || "")}</p>
      ${(Array.isArray(g.sections) ? g.sections : []).map(sec => `<h3>${esc(sec.title || "")}</h3><ul class="clean">${(Array.isArray(sec.points) ? sec.points : []).map(x => `<li>${esc(x)}</li>`).join("")}</ul>`).join("")}
      ${Array.isArray(g.examTips) && g.examTips.length ? `<div class="status notice"><strong>Exam tips</strong><ul class="clean">${g.examTips.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>` : ""}
    </details>`).join("")}</div>` : ""}`;
  }
  function flashcardHtml() {
    const fc = S.fc;
    if (fc.i >= fc.deck.length) return `<div class="panel"><div class="big">${fc.known}/${fc.seen}</div><p class="meta">cards known on the first try this session.</p><div class="btns"><button class="btn" data-act="fcdone">Done</button></div></div>`;
    const f = fc.deck[fc.i];
    return `<div class="qhead"><strong>Flashcards</strong><span class="note">${fc.i + 1} of ${fc.deck.length} · <button class="btn ghost sm" data-act="fcdone">Stop</button></span></div>
    <div class="flashcard ${fc.flipped ? "flipped" : ""}" style="--c:${dc(f[0])}">
      <span class="note">Domain ${f[0]}</span>
      <p class="q">${esc(f[1])}</p>
      ${fc.flipped ? `<div class="expl">${esc(f[2])}</div>` : ""}
    </div>
    <div class="btns">${fc.flipped ? `<button class="btn" data-act="fcknow">Got it</button><button class="btn ghost" data-act="fcagain">Again</button>` : `<button class="btn" data-act="fcflip">Show answer</button>`}</div>`;
  }
  function fcGrade(knew) {
    const fc = S.fc, f = fc.deck[fc.i], k = cardKey(f);
    const cards = S.p.cards || (S.p.cards = {});
    const t = today().getTime();
    if (!fc.graded.has(k)) { fc.graded.add(k); fc.seen++; if (knew) fc.known++; }
    if (knew) { const box = Math.min(((cards[k] || {}).box ?? -1) + 1, INTERVALS.length - 1); cards[k] = { box, due: t + INTERVALS[box] * DAY }; }
    else { cards[k] = { box: 0, due: t + DAY }; fc.deck.push(f); } // see it again this session
    fc.i++; fc.flipped = false; save(); render();
  }

  function aboutView() {
    const x = C.examInfo || {};
    return `<h1>${esc(C.name)} ${esc(C.exam)}</h1>
    <p class="meta">${esc(C.blurb || "")}</p>
    ${C.status === "verified" ? `<div class="status">${esc(C.statusNote || "")}</div>` : checkBanner()}
    ${noticeHtml()}
    ${C.lastVerified ? `<p class="note">Exam details last checked ${esc(fmtLong(parseD(C.lastVerified)))}.</p>` : ""}
    <h2>Exam format</h2>
    <div class="panel">
      <div class="row"><span>Questions</span><strong>${esc(x.questions || "–")}</strong></div>
      <div class="row"><span>Time</span><strong>${x.minutes ? esc(x.minutes) + " minutes" : "–"}</strong></div>
      <div class="row"><span>Passing score</span><strong>${esc(x.pass || "–")}</strong></div>
      ${x.extra ? `<div class="row"><span class="note">${esc(x.extra)}</span></div>` : ""}
    </div>
    <h2>Domains and weights</h2>
    <div class="panel bars">${C.domains.map(d => `<div class="b" style="--c:${dc(d.id)}"><div class="flex"><span>D${d.id} ${esc(d.name)}</span><strong>${d.w}%</strong></div><div class="track"><i style="width:${d.w}%"></i></div></div>`).join("")}</div>
    <h2>Official sources</h2>
    <div class="panel"><ul class="clean">${(C.sources || []).map(s => `<li><a href="${esc(s.url)}" rel="noopener" target="_blank">${esc(s.label)}</a></li>`).join("")}</ul>
    <p class="note">Always check the vendor's current objectives before booking. Exams are revised every few years.</p></div>`;
  }
  function render() {
    renderTabs();
    if (S.tab === "guide" && !Pro().available) S.tab = "week";
    const v = { cheat: cheatView, week: weekView, learn: learnView, plan: planView, practice: practiceView, labs: labsView, progress: progressView, guide: guideView, about: aboutView }[S.tab];
    $("#app").innerHTML = v();
    if (S.openLesson && S.tab === "learn") {
      const det = document.querySelector(`#app details.lesson[data-k="${S.openLesson}"]`);
      if (det) { S.openLesson = null; det.open = true; det.scrollIntoView({ block: "start" }); det.querySelector("summary").focus({ preventScroll: true }); }
    }
    if (S.quiz && !S.quiz.done && S.quiz.end && S.tab === "practice") tick();
  }

  /* ---------- events (delegated once; only act while this view is open) ---------- */
  document.addEventListener("click", e => {
    if (!active) return;
    const t = e.target.closest("button"); if (!t || !t.closest("#app, #tabs")) return;
    if (t.dataset.tab) { location.hash = `${C.id}.${t.dataset.tab}`; return; }
    if (t.dataset.week) { S.viewWeek = +t.dataset.week; S.tab = "week"; render(); return; }
    if (t.dataset.open) { S.viewWeek = +t.dataset.open; S.tab = "week"; history.replaceState(null, "", `#${C.id}.week`); render(); window.scrollTo(0, 0); return; }
    if (t.dataset.opt != null) return choose(+t.dataset.opt);
    if (t.dataset.drill != null) return drillAnswer(t.dataset.drill);
    if (t.dataset.simup != null || t.dataset.simdown != null) {
      const o = S.sim.order, k = +(t.dataset.simup ?? t.dataset.simdown), j = t.dataset.simup != null ? k - 1 : k + 1;
      [o[k], o[j]] = [o[j], o[k]]; render();
      const b = document.querySelector(`[data-${t.dataset.simup != null ? "simup" : "simdown"}="${j}"]`) || document.querySelector(`[data-simup="${j}"],[data-simdown="${j}"]`); if (b) b.focus();
      return;
    }
    const a = t.dataset.act; if (!a) return;
    const d = +t.dataset.d;
    const cp = dom => { const qs = pickFor(q => q.d === dom, 25); startQuiz({ title: `Checkpoint: Domain ${dom}`, qs, mode: "test", minutes: Math.max(5, Math.round(30 * qs.length / 25)) }); };
    const drill = dom => startQuiz({ title: `Domain ${dom} drill`, qs: pickFor(q => q.d === dom, 15), mode: "learn" });
    const acts = {
      weekly: () => startQuiz({ title: `Week ${t.dataset.w} quiz`, qs: weeklyQs(+t.dataset.w), mode: "learn" }),
      "weekly-sel": () => { const n = +$("#wsel").value; startQuiz({ title: `Week ${n} quiz`, qs: weeklyQs(n), mode: "learn" }); },
      review: () => { const ids = dueIds(); startQuiz({ title: "Review queue", qs: shuffle(Q.filter(q => ids.includes(q.id))).slice(0, 20), mode: "learn", review: true }); },
      drill: () => drill(+$("#dsel").value),
      "drill-d": () => drill(d),
      checkpoint: () => cp(d),
      exam: () => { const qs = examQs(); startQuiz({ title: "Practice exam", qs, mode: "test", minutes: examMinutes(qs.length) }); },
      fullexam: () => { if (!PRO) return; startQuiz({ title: "Full-length exam", qs: fullExamQs(), mode: "test", minutes: C.examSim.minutes, kind: "full" }); },
      fcstart: () => {
        const dom = +$("#fcsel").value, sched = S.p.cards || {}, now = today().getTime() + 1000;
        const due = PRO.flashcards.filter(f => (!dom || f[0] === dom) && (!sched[cardKey(f)] || sched[cardKey(f)].due <= now));
        if (!due.length) { CertHub.ui.toast("Nothing due in this domain. Come back tomorrow."); return; }
        S.fc = { deck: shuffle(due).slice(0, 20), i: 0, flipped: false, known: 0, seen: 0, graded: new Set() }; render(); window.scrollTo(0, 0);
      },
      fcflip: () => { S.fc.flipped = true; render(); },
      fcknow: () => fcGrade(true),
      fcagain: () => fcGrade(false),
      fcdone: () => { S.fc = null; render(); },
      simstart: () => simStart(t.dataset.id),
      gosim: () => { S.tab = "practice"; history.replaceState(null, "", `#${C.id}.practice`); simStart(t.dataset.id); },
      printcheat: () => window.print(),
      lang: () => {
        LANG = LANG === "es" ? "en" : "es"; CertHub.store.set("certhub:lang", LANG);
        if (LANG === "es" && !LES_ES) { const id = C.id; CertHub.loadLessons(id, "es").then(m => { if (C && C.id === id) { LES_ES = m; render(); } }); }
        render();
      },
      offline: () => {
        const base = CertHub.BASE, urls = [`data/lessons/${C.id}.js`, "data/diagrams.js", `data/gen/${C.id}-q.js`].concat(C.hasLessonsEs ? [`data/lessons-es/${C.id}.js`] : [], C.hasPbqs ? [`data/pbq/${C.id}.js`] : []).map(u => base + u);
        const ctl = navigator.serviceWorker && navigator.serviceWorker.controller;
        if (!ctl) { CertHub.ui.toast("Offline saving needs the installed app or a second visit. Reload and try again."); return; }
        const ch = new MessageChannel();
        ch.port1.onmessage = e => CertHub.ui.toast(e.data && e.data.ok ? `${C.short} lessons, questions and simulations are saved for offline study.` : "Couldn't save for offline. Check your connection and try again.");
        ctl.postMessage({ type: "cache-urls", urls }, [ch.port2]);
      },
      badge: () => { const b = badgeState(); CertHub.makeBadge({ title: `${C.short} ${C.exam}`, line1: "Study plan complete", line2: `${b.total} lessons · best practice exam ${b.best}%`, file: `${C.id}-study-plan-badge.png` }); },
      simcheck: simCheck,
      simretry: () => simStart(S.sim.p.id),
      simquit: () => { S.sim = null; render(); },
      drillstart: () => drillStart(t.dataset.kind),
      drillquit: () => { clearTimeout(drillT); S.drill = null; render(); },
      golesson: () => {
        const k = t.dataset.k;
        S.openLesson = k; S.tab = "learn"; history.replaceState(null, "", `#${C.id}.learn`); render();
      },
      video: () => { const tt = LES && [...LES.keys()].find(x => lessonKey(x) === t.dataset.k); if (tt) playOverview(tt); },
      printlessons: () => { document.querySelectorAll("#app details").forEach(d => { d.open = true; }); window.print(); },
      placement: () => {
        const per = Math.max(2, Math.min(5, Math.floor(24 / C.domains.length)));
        const qs = C.domains.flatMap(d => pickFor(q => q.d === d.id, per));
        startQuiz({ title: "Placement test", qs, mode: "test", minutes: Math.max(8, Math.round(qs.length * 1.1)), kind: "placement" });
      },
      reminder: () => CertHub.addReminder(`Study ${C.short}`, location.href.split("#")[0] + `#${C.id}.week`),
      read: () => {
        const k = t.dataset.k, rd = S.p.read || (S.p.read = {});
        if (rd[k]) delete rd[k]; else { rd[k] = true; CertHub.activity.mark(); }
        save();
        // Update in place so the open lesson stays open.
        const det = t.closest("details.lesson"), r = !!rd[k];
        t.outerHTML = `<button class="btn sm ${r ? "ghost" : ""}" data-act="read" data-k="${k}" aria-pressed="${r}">${r ? "Read ✓ (mark unread)" : "Mark as read"}</button>`;
        if (det) {
          const chip = det.querySelector(":scope > summary .chip");
          if (r && !chip) det.querySelector(":scope > summary").insertAdjacentHTML("beforeend", `<span class="chip done">Read</span>`);
          if (!r && chip) chip.remove();
          if (r) { det.open = false; det.querySelector(":scope > summary").focus(); }
        }
      },
      printguide: () => { document.querySelectorAll(".guide details").forEach(d => { d.open = true; }); window.print(); },
      next, prev, quit: quitQuiz,
      finish: async () => {
        const unanswered = S.quiz.qs.length - S.quiz.ans.filter((x, i) => x != null || (i === S.quiz.i && S.quiz.picked != null)).length;
        if (await CertHub.ui.confirm(unanswered > 0 ? `Submit now? ${unanswered} question${unanswered > 1 ? "s are" : " is"} unanswered and will count as wrong.` : "Submit the test now?", { ok: "Submit test", cancel: "Keep working" })) {
          S.quiz.ans[S.quiz.i] = S.quiz.picked; S.quiz.i = S.quiz.qs.length; finishQuiz();
        }
      },
      export: () => { saveProgress(C.id, S.p); CertHub.exportAll(); },
      copybackup: () => { saveProgress(C.id, S.p); CertHub.ui.copy(CertHub.backupText(), "progress backup"); },
      pasterestore: () => CertHub.restoreFromText(),
      reset: async () => {
        if (await CertHub.ui.confirm(`Erase all ${C.short} progress in this browser? This can't be undone.`, { ok: "Erase progress", cancel: "Keep it", danger: true })) {
          const { start, examDate } = S.p; S.p = { ...CertHub.freshProgress(), start, examDate }; saveProgress(C.id, S.p); render();
        }
      }
    };
    if (acts[a]) acts[a]();
  });
  document.addEventListener("input", e => {
    if (!active) return;
    const el = e.target;
    if (el.id === "lsearch" && LES) searchLessons(el.value);
    if (S.sim && el.dataset.simf != null) S.sim.ans[+el.dataset.simf] = el.value;
  });
  document.addEventListener("change", e => {
    if (!active) return;
    const el = e.target;
    if (S.sim && el.dataset.simm != null) { S.sim.ans[+el.dataset.simm] = el.value; return; }
    if (S.sim && el.dataset.sims != null) { el.checked ? S.sim.ans.add(+el.dataset.sims) : S.sim.ans.delete(+el.dataset.sims); return; }
    const c = el.dataset && el.dataset.check;
    if (c) { if (el.checked) CertHub.activity.mark(); S.p.checks[c] = el.checked; el.closest("li").classList.toggle("checked", el.checked); save(); return; }
    if (el.id === "exam" && el.value) { S.p.examDate = el.value; save(); renderTabs(); }
    if (el.id === "start" && el.value) { S.p.start = el.value; save(); renderTabs(); }
    if (el.id === "imp" && el.files && el.files[0]) {
      CertHub.importAll(el.files[0], (err, n) => {
        if (err) { $("#datamsg").textContent = err.message; return; }
        CertHub.ui.toast(`Restored ${n} saved item${n === 1 ? "" : "s"}.`);
        setTimeout(() => location.reload(), 800);
      });
    }
  });

  CertHub.certView = {
    open, close,
    get active() { return active; },
    // A quiz or test in progress holds unsaved state; sync waits until it's finished.
    get busy() { return !!(active && S && ((S.quiz && !S.quiz.done) || S.fc || (S.sim && !S.sim.done) || (S.drill && !S.drill.done))); },
    // Sign-in or plan changed: load or drop the Pro bank for the open certification.
    proChanged() { if (C && S) { loadPro(); if (active) renderTabs(); } },
    // Re-read progress from storage after sync merged in changes from another device.
    reload() { if (C && S && !(S.quiz && !S.quiz.done)) { const { start, examDate } = S.p; S.p = loadProgress(C.id); S.p.start = S.p.start || start; S.p.examDate = S.p.examDate || examDate; if (active) render(); } },
    title: () => C ? `${C.short} ${C.exam}` : "",
    // Weeks and certifications that use a lab, for the lab page's "Used in" list.
    usesOf(labId) {
      return Object.values(CertHub.certs).flatMap(c => buildPlan(c).weeks.filter(w => (w.labRefs || []).includes(labId)).map(w => ({ cert: c, week: w.n })));
    }
  };
})();
