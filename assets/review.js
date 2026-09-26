/* Daily review (#review): about five minutes of questions across every certification you've started.
   Questions due in each certification's spaced-review queue come first, then fresh questions from the
   weeks you've reached. Answers update the same progress and review queue as the certification page. */
(function () {
  const { U, certs, loadProgress, saveProgress, buildPlan } = CertHub;
  const { $, esc } = U;
  const DAY = U.DAY, INTERVALS = [1, 3, 7, 14], SIZE = 10;
  const inline = x => esc(x).replace(/`([^`\n]+)`/g, "<code>$1</code>");
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const toQ = ([id, w, d, q, o, a, e, src, why]) => ({ id, w, d, q, o, a, e, src, why: Array.isArray(why) && why.length === 4 ? why : null });
  let S = null;

  // Certifications with a start date and some real study, most recently used first.
  function started() {
    return Object.values(certs).map(c => {
      const p = loadProgress(c.id);
      if (!p.start) return null;
      const last = Math.max(0, ...(p.history || []).map(h => h.at || 0));
      const used = last || Object.keys(p.read || {}).length || Object.keys(p.stats || {}).length || Object.keys(p.review || {}).length;
      return used ? { c, p, last } : null;
    }).filter(Boolean).sort((a, b) => b.last - a.last);
  }
  const dueCount = p => Object.values(p.review || {}).filter(r => r.due <= U.today().getTime() + 1000).length;

  // Home page card: how many are due today.
  function homeCard() {
    const list = started();
    if (!list.length) return "";
    const due = list.reduce((n, x) => n + dueCount(x.p), 0);
    return `<div class="panel installcard reviewcard"><div class="grow"><strong>Daily review</strong><br><span class="note">${due ? `${due} question${due === 1 ? "" : "s"} due across ${list.length} certification${list.length === 1 ? "" : "s"}` : `Ten quick questions from the ${list.length === 1 ? "certification" : `${list.length} certifications`} you're studying`}. About five minutes.</span></div><a class="btn sm" href="#review">Start review</a></div>`;
  }

  function build(list) {
    const es = CertHub.i18n.lang() === "es";
    return Promise.all(list.map(x => CertHub.loadQuestions(x.c.id).then(qs => {
      if (!qs) return null;
      const Q = qs.map(toQ);
      return (es ? CertHub.loadQuestionsEs(x.c.id) : Promise.resolve(null)).then(m => {
        if (m) Q.forEach(q => { const t = m[q.id]; if (!Array.isArray(t) || !Array.isArray(t[1]) || t[1].length !== 4) return; q.q = t[0]; q.o = t[1]; if (t[2]) q.e = t[2]; if (Array.isArray(t[3]) && t[3].length === 4) q.why = t[3]; });
        const plan = buildPlan(x.c);
        const wk = Math.min(plan.weeks.length, Math.max(1, Math.floor((U.today() - U.parseD(x.p.start)) / DAY / 7) + 1));
        const now = U.today().getTime() + 1000, rv = x.p.review || {};
        const due = Q.filter(q => rv[q.id] && rv[q.id].due <= now).sort((a, b) => rv[a.id].due - rv[b.id].due);
        const fresh = shuffle(Q.filter(q => !rv[q.id] && q.w <= wk));
        return { c: x.c, due, fresh };
      });
    }, () => null))).then(parts => {
      parts = parts.filter(Boolean);
      // Due questions first, taken round-robin so every certification gets a turn, then fresh ones the same way.
      const out = [], take = key => { let more = true; while (out.length < SIZE && more) { more = false; parts.forEach(p => { if (out.length < SIZE && p[key].length) { out.push({ c: p.c, q: p[key].shift(), due: key === "due" }); more = true; } }); } };
      take("due"); take("fresh");
      return out;
    });
  }

  function record(item, ok) {
    CertHub.activity.mark();
    const p = loadProgress(item.c.id), q = item.q;
    p.stats = p.stats || {}; p.review = p.review || {};
    const st = p.stats[q.d] || (p.stats[q.d] = { c: 0, t: 0 });
    st.t++; if (ok) st.c++;
    const r = p.review[q.id], t = U.today().getTime();
    if (!ok) p.review[q.id] = { box: 0, due: t + DAY };
    else if (r && item.due) { const box = r.box + 1; if (box >= INTERVALS.length) delete p.review[q.id]; else p.review[q.id] = { box, due: t + INTERVALS[box] * DAY }; }
    saveProgress(item.c.id, p);
  }

  function view() {
    if (!S) return `<h1>Daily review</h1><p class="meta">Loading your questions…</p>`;
    if (!S.items.length) return `<h1>Daily review</h1><p class="meta">Start a study plan first. The daily review mixes questions from every certification you're studying.</p><div class="btns"><a class="btn" href="#home">Choose a certification</a></div>`;
    if (S.i >= S.items.length) {
      const by = {};
      S.items.forEach((x, i) => { const b = by[x.c.id] || (by[x.c.id] = { c: x.c, ok: 0, n: 0 }); b.n++; if (S.ans[i] === x.q.a) b.ok++; });
      const ok = S.items.filter((x, i) => S.ans[i] === x.q.a).length;
      return `<h1>Daily review done</h1><div class="panel"><div class="big">${ok} of ${S.items.length}</div><p class="meta">Missed questions come back tomorrow. The ones you got right come back later, spaced further apart each time.</p>
      <div class="bars">${Object.values(by).map(b => `<div class="b"><div class="flex"><span><a href="#${esc(b.c.id)}.week">${esc(b.c.short)}</a></span><strong>${b.ok}/${b.n}</strong></div></div>`).join("")}</div>
      <div class="btns"><button type="button" class="btn" data-rv="again">Ten more</button><a class="btn ghost" href="#home">Home</a></div></div>`;
    }
    const x = S.items[S.i], q = x.q, picked = S.ans[S.i], shown = picked != null;
    const opts = q.o.map((o, k) => { let cls = ""; if (shown) { if (k === q.a) cls = "right"; else if (k === picked) cls = "wrong"; } return `<button type="button" class="opt ${cls}" data-rvopt="${k}" aria-pressed="${picked === k}"${shown ? " disabled" : ""}>${esc(o)}</button>`; }).join("");
    const why = shown && picked !== q.a && q.why && q.why[picked] ? `<br><span data-ui><strong>Why this answer is wrong:</strong></span> ${inline(q.why[picked])}` : "";
    return `<div class="qhead"><strong>Daily review</strong><a class="btn ghost sm" href="#home">Stop</a></div>
    <div class="flex note"><span>Question ${S.i + 1} of ${S.items.length}</span><span>${esc(x.c.short)}${x.due ? " · review" : ""}</span></div>
    <div class="prog"><i style="width:${100 * (S.i + 1) / S.items.length}%"></i></div>
    <p class="q">${esc(q.q)}</p>${opts}
    ${shown ? `<div class="expl" role="status" style="--c:${picked === q.a ? "var(--ok)" : "var(--bad)"}"><strong data-ui>${picked === q.a ? "Correct." : "Not quite."}</strong> ${inline(q.e)}${why}</div><div class="btns"><button type="button" class="btn" data-rv="next">${S.i + 1 === S.items.length ? "Finish" : "Next"}</button></div>` : ""}`;
  }
  const draw = () => { const a = $("#app"); if (a && CertHub.reviewActive()) a.innerHTML = view(); };

  function show() {
    S = null;
    const list = started();
    build(list).then(items => { S = { items, i: 0, ans: [] }; draw(); }, () => { S = { items: [], i: 0, ans: [] }; draw(); });
    return view();
  }

  document.addEventListener("click", e => {
    if (!S || !CertHub.reviewActive()) return;
    const o = e.target.closest("[data-rvopt]");
    if (o && S.ans[S.i] == null) { const k = +o.dataset.rvopt; S.ans[S.i] = k; record(S.items[S.i], k === S.items[S.i].q.a); draw(); return; }
    const b = e.target.closest("[data-rv]"); if (!b) return;
    if (b.dataset.rv === "next") { S.i++; draw(); window.scrollTo(0, 0); }
    if (b.dataset.rv === "again") { $("#app").innerHTML = show(); window.scrollTo(0, 0); }
  });

  CertHub.review = { show, homeCard };
})();
