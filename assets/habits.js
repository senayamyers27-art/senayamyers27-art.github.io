/* Study habits: a weekly goal (days a week), a weekly recap you can share, and a focus timer that counts
   toward your streak. Everything stays in this browser. Shown on the dashboard (#dashboard). */
(function () {
  const { U, store } = CertHub;
  const { $, esc } = U;
  const json = (k, d) => { try { const v = JSON.parse(store.get(k) || "null"); return v == null ? d : v; } catch (e) { return d; } };
  const GOALS = [0, 3, 4, 5, 7];
  const goal = () => { const g = +store.get("certhub:goal"); return GOALS.includes(g) ? g : 0; };
  // Monday of the week containing d.
  const monday = d => U.addDays(d, -((d.getDay() + 6) % 7));

  function week(offset = 0) {
    const start = U.addDays(monday(U.today()), 7 * offset), days = new Set(CertHub.activity.days()), q = CertHub.activity.qlog(), focus = json("certhub:focus", {});
    let studied = 0, questions = 0, minutes = 0;
    for (let i = 0; i < 7; i++) { const k = U.iso(U.addDays(start, i)); if (days.has(k)) studied++; questions += q[k] || 0; minutes += focus[k] || 0; }
    return { start, studied, questions, minutes };
  }
  // Readiness now and about a week ago, per certification, from the daily history the certification page keeps.
  function readinessMoves() {
    const hist = json("certhub:readyhist", {}), weekAgo = U.iso(U.addDays(U.today(), -7));
    return Object.entries(hist).map(([id, pts]) => {
      if (!Array.isArray(pts) || !pts.length || !CertHub.certs[id]) return null;
      const now = pts[pts.length - 1][1], before = (pts.filter(p => p[0] <= weekAgo).pop() || pts[0])[1];
      return { c: CertHub.certs[id], now, delta: now - before };
    }).filter(Boolean).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  }

  function goalHtml() {
    const g = goal(), w = week();
    return `<div class="panel goalcard"><div class="flex"><strong>Weekly goal</strong><span class="note">${g ? `${esc(Math.min(w.studied, g))} of ${esc(g)} days this week` : "No goal set"}</span></div>
      ${g ? `<div class="track" aria-hidden="true"><i data-style="width:${Math.round(100 * Math.min(1, w.studied / g))}%"></i></div>` : ""}
      <div class="trackpick" role="group" aria-label="Study days a week">${GOALS.map(n => `<button type="button" class="chipbtn" data-goal="${/* num */ n}" aria-pressed="${g === n}">${/* html: a number of days or "None" */ n ? `${/* num */ n} days` : "None"}</button>`).join("")}</div>
      <p class="note" data-style="margin:6px 0 0">A study day is any day you answer a question, read a lesson, finish a focus session or check off a plan day. One missed day a week doesn't break your streak.</p></div>`;
  }
  function recapHtml() {
    const w = week(), last = week(-1), moves = readinessMoves().slice(0, 2);
    const cmp = (a, b) => b ? (a > b ? ` <span class="up">▲ ${esc(a - b)}</span>` : a < b ? ` <span class="down">▼ ${esc(b - a)}</span>` : "") : "";
    return `<div class="panel recap"><div class="flex"><strong>This week</strong><button type="button" class="btn ghost sm" data-habit="sharerecap">Share</button></div>
      <ul class="dashstats">
        <li><strong>${esc(w.studied)}</strong> day${w.studied === 1 ? "" : "s"} studied${cmp(w.studied, last.studied)}</li>
        <li><strong>${esc(w.questions)}</strong> question${w.questions === 1 ? "" : "s"} answered${cmp(w.questions, last.questions)}</li>
        <li><strong>${esc(w.minutes)}</strong> focus minutes${cmp(w.minutes, last.minutes)}</li>
        ${moves.map(m => `<li>${esc(m.c.short)} readiness <strong>${esc(m.now)}</strong>${m.delta ? ` <span class="${m.delta > 0 ? "up" : "down"}">${m.delta > 0 ? "▲" : "▼"} ${esc(Math.abs(m.delta))}</span>` : ""}</li>`).join("")}
      </ul><p class="note" data-style="margin:0">Compared with last week. Weeks start on Monday.</p></div>`;
  }

  /* ---------- focus timer: a floating pill that survives page changes and reloads ---------- */
  const FKEY = "certhub:focusend";
  let ftimer = null;
  function focusStart(min) {
    store.set(FKEY, JSON.stringify({ end: Date.now() + min * 60000, min }));
    focusTick();
  }
  function focusStop(done) {
    const f = json(FKEY, null); store.set(FKEY, "null"); clearInterval(ftimer); ftimer = null;
    const pill = document.getElementById("focuspill"); if (pill) pill.remove();
    if (done && f) {
      const log = json("certhub:focus", {}), k = U.iso(new Date()), cut = U.iso(U.addDays(U.today(), -60));
      log[k] = (log[k] || 0) + f.min; Object.keys(log).forEach(x => { if (x < cut) delete log[x]; });
      store.set("certhub:focus", JSON.stringify(log));
      CertHub.activity.mark();
      CertHub.fx.celebrate({ title: "Focus session done", sub: `${f.min} minutes. Take a short break.` });
      if (location.hash === "#dashboard") CertHub.rerender();
    }
  }
  function focusTick() {
    const f = json(FKEY, null);
    if (!f || !f.end) return;
    let pill = document.getElementById("focuspill");
    if (!pill) {
      pill = document.createElement("div"); pill.id = "focuspill"; pill.className = "focuspill";
      pill.innerHTML = `<span aria-hidden="true">⏱</span> <span class="ft" role="timer" aria-label="Focus time left"></span><button type="button" class="linkbtn" data-habit="focusstop">Stop</button>`;
      document.body.appendChild(pill);
    }
    const left = Math.max(0, Math.round((f.end - Date.now()) / 1000));
    pill.querySelector(".ft").textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;
    if (left <= 0) return focusStop(true);
    if (!ftimer) ftimer = setInterval(focusTick, 1000);
  }
  function focusHtml() {
    return `<div class="panel focuscard"><strong>Focus timer</strong><br><span class="note">Put your phone face down and study one thing. A finished session counts as a study day.</span>
      <div class="btns">${[15, 25, 45].map(m => `<button type="button" class="btn ${m === 25 ? "" : "ghost "}sm" data-habit="focus" data-min="${/* num */ m}">${/* num */ m} minutes</button>`).join("")}</div></div>`;
  }

  // Celebrate reaching the weekly goal, once per week.
  function check() {
    const g = goal(); if (!g) return;
    const w = week(), k = U.iso(w.start);
    if (w.studied >= g && store.get("certhub:goalhit") !== k) {
      store.set("certhub:goalhit", k);
      CertHub.fx.celebrate({ title: "Weekly goal reached!", sub: `${w.studied} study days this week.` });
    }
  }

  document.addEventListener("click", e => {
    const b = e.target.closest("[data-goal],[data-habit]"); if (!b) return;
    if (b.dataset.goal != null) {
      store.set("certhub:goal", String(+b.dataset.goal));
      const box = b.closest(".goalcard"); if (box) box.outerHTML = goalHtml();
      return;
    }
    const a = b.dataset.habit;
    if (a === "focus") focusStart(+b.dataset.min || 25);
    if (a === "focusstop") focusStop(false);
    if (a === "sharerecap") {
      const w = week();
      CertHub.fx.shareCard({ kicker: "My study week", title: `${w.studied} day${w.studied === 1 ? "" : "s"} studied`, pct: Math.round(100 * w.studied / 7), ringColor: "var(--ok)", big: `${w.studied}/7`,
        line1: `${w.questions} questions · ${w.minutes} focus minutes`, line2: "Free study plans at StudyToCert", file: "studytocert-my-week", text: `This week on StudyToCert: ${w.studied} study days and ${w.questions} questions.` });
    }
  });
  document.addEventListener("DOMContentLoaded", focusTick);

  CertHub.habits = { goalHtml, recapHtml, focusHtml, check, week, focusStart };
})();
