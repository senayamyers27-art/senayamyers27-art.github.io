/* Certification view: plan, weekly quizzes, checkpoint tests, practice exam, spaced
   review (1, 3, 7, 14 days), linked labs and progress by domain, saved in localStorage.
   The app router (app.js) calls CertHub.certView.open(id, tab). */
(function () {
  const { U, buildPlan, loadProgress, saveProgress } = CertHub;
  const { $, esc, DAY, today, parseD, fmt, fmtLong, shuffle, dc } = U;
  const INTERVALS = [1, 3, 7, 14];

  let C, PLAN, W, DOM, Q, S, FREE_Q, PRO = null;
  let active = false;
  const TAB_IDS = ["week", "plan", "practice", "labs", "progress", "guide", "about"];
  const Pro = () => CertHub.pro || { available: false, active: false };
  const toQ = ([id, w, d, q, o, a, e, src]) => ({ id, w, d, q, o, a, e, src });

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
    ["Mon", "Read this week's objectives and reread the listed sections of your notes"],
    ["Tue", C.videoTip || "Watch videos or read the matching chapters of a study guide for this week's topics"],
    ["Wed", "Answer the study questions below out loud before revealing them"],
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
    o.qs = o.qs.map(q => { const idx = shuffle(q.o.map((_, i) => i)); return { ...q, o: idx.map(i => q.o[i]), a: idx.indexOf(q.a) }; });
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
  const TABS = [["week", "This week"], ["plan", "Plan"], ["practice", "Quizzes & tests"], ["labs", "Labs"], ["progress", "Progress"], ["guide", "Flashcards & guide"], ["about", "About the exam"]];
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
    ${w.light ? `<div class="status">Holiday week. Keep it to about 30 minutes a day.</div>` : ""}
    <div class="btns">
      <button class="btn" data-act="weekly" data-w="${n}">Take week ${n} quiz</button>
      ${due ? `<button class="btn ghost" data-act="review">Review ${due} due</button>` : ""}
      ${cp ? `<button class="btn ghost" data-act="checkpoint" data-d="${cp.dom}">Checkpoint test: Domain ${cp.dom}</button>` : ""}
      ${n === W.length ? `<button class="btn ghost" data-act="exam">Full practice exam</button>` : ""}
    </div>
    <h2>What you're covering</h2>
    <div class="panel wk" style="--c:${dc(w.dom)}"><ul class="clean">${w.topics.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>
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
    if (!Array.isArray(C.questions)) return `<h1>Quizzes & tests</h1><p class="note">Loading questions…</p>`;
    const due = dueIds().length;
    const cnt = d => Q.filter(q => q.d === d).length;
    const ex = examQs().length;
    return `<h1>Quizzes & tests</h1>
    <p class="meta">${Q.length} questions in the bank${PRO ? ` (${FREE_Q.length} free + ${PRO.questions.length} Pro)` : ""}, written from the official exam objectives${C.id === "security-plus" ? " and your bootcamp notes" : ""}. Answer options are shuffled every time.</p>
    <h2>Quick practice</h2>
    <div class="panel">
      <div class="row"><div class="grow"><h3>Weekly quiz</h3><span class="note">10 questions with instant feedback</span></div><select id="wsel" aria-label="Week">${W.map(w => `<option value="${w.n}" ${w.n === weekNow() ? "selected" : ""}>Week ${w.n}</option>`).join("")}</select><button class="btn" data-act="weekly-sel">Start</button></div>
      <div class="row"><div class="grow"><h3>Review queue</h3><span class="note">Questions you missed, spaced 1, 3, 7 and 14 days apart</span></div><button class="btn" data-act="review" ${due ? "" : "disabled"}>${due ? `Review ${due}` : "Nothing due"}</button></div>
      <div class="row"><div class="grow"><h3>Domain drill</h3><span class="note">15 random questions</span></div><select id="dsel" aria-label="Domain">${C.domains.map(d => `<option value="${d.id}">D${d.id} (${cnt(d.id)})</option>`).join("")}</select><button class="btn" data-act="drill">Start</button></div>
    </div>
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
      <h2>Review</h2>${z.qs.map((q, i) => { const ok = z.ans[i] === q.a; return `<div class="panel" style="--c:${ok ? "var(--ok)" : "var(--bad)"}"><p style="margin:0 0 6px"><strong>${ok ? "Correct" : "Missed"}</strong> · <span class="note">${esc(domName(q.d))}</span></p><p class="qtext" style="margin:0 0 8px">${esc(q.q)}</p>${ok ? "" : `<p class="note" style="margin:0">Your answer: ${esc(z.ans[i] == null ? "none" : q.o[z.ans[i]])}</p>`}<p style="margin:4px 0 0"><strong>${esc(q.o[q.a])}</strong></p><div class="expl">${esc(q.e)}${q.src ? `<br><small class="note">Source: ${esc(q.src)}</small>` : ""}</div></div>`; }).join("")}`;
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
    ${z.revealed ? `<div class="expl" role="status" style="--c:${z.picked === q.a ? "var(--ok)" : "var(--bad)"}"><strong>${z.picked === q.a ? "Correct." : "Not quite."}</strong> ${esc(q.e)}${q.src ? `<br><small class="note">Source: ${esc(q.src)}</small>` : ""}</div>` : ""}
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
    const v = { week: weekView, plan: planView, practice: practiceView, labs: labsView, progress: progressView, guide: guideView, about: aboutView }[S.tab];
    $("#app").innerHTML = v();
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
  document.addEventListener("change", e => {
    if (!active) return;
    const el = e.target;
    const c = el.dataset && el.dataset.check;
    if (c) { S.p.checks[c] = el.checked; el.closest("li").classList.toggle("checked", el.checked); save(); return; }
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
    get busy() { return !!(active && S && ((S.quiz && !S.quiz.done) || S.fc)); },
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
