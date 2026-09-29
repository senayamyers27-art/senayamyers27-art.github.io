/* Achievements (#achievements): badges earned from progress already saved in this browser. Nothing new is
   tracked here; each badge is worked out from study days, quiz history, labs, the practice VMs and games. */
(function () {
  const { U, store, certs, loadProgress, labOrder, labs, labStatus, loadLabProgress } = CertHub;
  const { $, esc } = U;
  const json = (k, d) => { try { const v = JSON.parse(store.get(k) || "null"); return v == null ? d : v; } catch (e) { return d; } };

  function facts() {
    const started = Object.values(certs).map(c => ({ c, p: loadProgress(c.id) })).filter(x => x.p.start);
    const hist = started.flatMap(x => x.p.history || []);
    const answered = started.reduce((n, x) => n + Object.values(x.p.stats || {}).reduce((a, s) => a + (s.t || 0), 0), 0);
    const exams = hist.filter(h => h.kind === "full" || /practice exam|full-length/i.test(h.title || ""));
    const bestExam = Math.max(0, ...exams.map(h => Math.round(100 * h.score / h.total)));
    const perfect = hist.some(h => h.total >= 10 && h.score === h.total);
    const lp = loadLabProgress(), labsDone = labOrder.filter(id => labs[id] && labStatus(labs[id], lp).state === "done").length;
    const vmLabs = Object.keys(json("certhub:vmlabs", {})).length, vmExam = json("certhub:vmexam", {}).best || 0;
    const games = json("certhub:games", {}), gameBest = Math.max(0, ...Object.values(games).map(g => g.best || 0)), gamesPlayed = Object.keys(games).length;
    const ready = Math.max(0, ...Object.values(json("certhub:ready", {})).map(r => r.score || 0));
    const st = CertHub.activity.streak(), days = CertHub.activity.days().length;
    const certsUsed = started.filter(x => (x.p.history || []).length || Object.keys(x.p.stats || {}).length || Object.keys(x.p.read || {}).length).length;
    const lessons = started.reduce((n, x) => n + Object.keys(x.p.read || {}).length, 0);
    const weeks = started.reduce((n, x) => { const w = {}; Object.entries(x.p.checks || {}).forEach(([k, v]) => { if (v) { const wk = k.split("-")[0]; w[wk] = (w[wk] || 0) + 1; } }); return n + Object.values(w).filter(c => c >= 7).length; }, 0);
    return { answered, bestExam, perfect, labsDone, vmLabs, vmExam, gameBest, gamesPlayed, ready, best: st.best, days, certsUsed, lessons, weeks };
  }

  // [id, name, how to earn it, icon, earned(f), progress(f) as [have, need]]
  const LIST = [
    ["first-steps", "First steps", "Answer your first question.", "cybersecurity", f => f.answered >= 1, f => [f.answered, 1]],
    ["hundred", "Century", "Answer 100 questions.", "all", f => f.answered >= 100, f => [f.answered, 100]],
    ["five-hundred", "Question machine", "Answer 500 questions.", "all", f => f.answered >= 500, f => [f.answered, 500]],
    ["thousand", "Thousand club", "Answer 1,000 questions.", "all", f => f.answered >= 1000, f => [f.answered, 1000]],
    ["reader", "Bookworm", "Read 25 lessons.", "software", f => f.lessons >= 25, f => [f.lessons, 25]],
    ["streak-3", "Warming up", "Study 3 days in a row.", "flame", f => f.best >= 3, f => [f.best, 3]],
    ["streak-7", "On fire", "Study 7 days in a row.", "flame", f => f.best >= 7, f => [f.best, 7]],
    ["streak-30", "Unstoppable", "Study 30 days in a row.", "flame", f => f.best >= 30, f => [f.best, 30]],
    ["days-50", "Regular", "Study on 50 different days.", "flame", f => f.days >= 50, f => [f.days, 50]],
    ["week", "Week one", "Check off every day of a study week.", "medal", f => f.weeks >= 1, f => [f.weeks, 1]],
    ["perfect", "Flawless", "Score 100% on a quiz of 10 or more questions.", "medal", f => f.perfect, f => [f.perfect ? 1 : 0, 1]],
    ["exam-85", "Exam ready", "Score 85% or more on a practice exam.", "medal", f => f.bestExam >= 85, f => [f.bestExam, 85]],
    ["ready-80", "Ready to book", "Reach an exam readiness score of 80.", "medal", f => f.ready >= 80, f => [f.ready, 80]],
    ["two-certs", "Branching out", "Study for two certifications.", "cloud", f => f.certsUsed >= 2, f => [f.certsUsed, 2]],
    ["first-lab", "Hands on", "Finish your first lab.", "sysadmin", f => f.labsDone >= 1, f => [f.labsDone, 1]],
    ["ten-labs", "Lab regular", "Finish 10 labs.", "sysadmin", f => f.labsDone >= 10, f => [f.labsDone, 10]],
    ["vm-lab", "Root access", "Pass a graded lab in the practice VM.", "network", f => f.vmLabs >= 1, f => [f.vmLabs, 1]],
    ["vm-exam", "Performance based", "Pass the practice VM exam.", "network", f => f.vmExam >= ((CertHub.vmLabs && CertHub.vmLabs.exam && CertHub.vmLabs.exam.pass) || 70), f => [f.vmExam, 70]],
    ["gamer", "Game on", "Play all four quick games.", "data-ai", f => f.gamesPlayed >= 4, f => [f.gamesPlayed, 4]],
    ["game-20", "Speed round", "Get 20 or more in one quick game.", "data-ai", f => f.gameBest >= 20, f => [f.gameBest, 20]]
  ];

  function earned() { const f = facts(); return LIST.filter(a => a[4](f)).map(a => a[0]); }
  // Announce badges earned since the last visit to any page (called by the app after each page change).
  const SEEN = "certhub:achievements";
  function checkNew() {
    const have = earned(), seen = json(SEEN, null);
    if (!Array.isArray(seen)) { store.set(SEEN, JSON.stringify(have)); return; } // first run: don't celebrate old progress
    const fresh = have.filter(id => !seen.includes(id));
    if (!fresh.length) return;
    store.set(SEEN, JSON.stringify(have));
    const a = LIST.find(x => x[0] === fresh[0]);
    CertHub.fx.celebrate({ title: `Badge earned: ${a[1]}`, sub: a[2] });
  }

  function view() {
    const f = facts(), got = LIST.filter(a => a[4](f));
    return `<h1>Achievements</h1><p class="meta">${esc(got.length)} of ${LIST.length} badges earned. They come from the progress saved in this browser.</p>
      <div class="achgrid">${LIST.map(([id, name, how, icon, ok, prog]) => {
        const done = ok(f), [have, need] = prog(f), pct = Math.min(100, Math.round(100 * Math.min(have, need) / need));
        return `<div class="panel ach${done ? " got" : ""}"><span class="achico">${CertHub.fx.icon(icon)}</span><div class="grow"><strong>${esc(name)}</strong><br><span class="note">${esc(how)}</span>
          ${done ? `<span class="chip" data-style="--c:var(--ok)">Earned</span>` : `<div class="track" aria-hidden="true"><i data-style="width:${pct}%"></i></div><span class="note">${esc(Math.min(have, need))} / ${esc(need)}</span>`}</div></div>`;
      }).join("")}</div>`;
  }
  CertHub.achievements = { view, earned, checkNew, count: LIST.length };
})();
