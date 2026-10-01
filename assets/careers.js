/* Career pages: one per track (which certifications in what order, jobs, skills, first steps and
   portfolio labs), plus interview practice for each NICE work role. Data: data/careers.js. */
(function () {
  const { U } = CertHub;
  const { $, esc } = U;
  const paras = x => String(x || "").split(/\n\n+/).map(p => `<p>${esc(p)}</p>`).join("");
  const load = () => CertHub.loadCareers();
  function shell(body) { $("#app").innerHTML = body; }
  const roleName = id => ((CertHub.niceRoles || []).find(r => r.id === id) || { name: id }).name;

  /* ---------- pay and job outlook (data/jobmarket.js, from the BLS Occupational Outlook Handbook) ---------- */
  const money = n => "$" + Math.round(n).toLocaleString("en-US");
  function outlookTable(rows) {
    const J = CertHub.jobMarket, es = CertHub.i18n.lang() === "es", T = x => (es && J.es && J.es[x]) || x;
    return `<div class="panel tablewrap"><table class="plain"><thead><tr><th scope="col">Occupation</th><th scope="col">Median pay (US)</th><th scope="col">Growth 2025–35</th><th scope="col">Openings a year</th></tr></thead><tbody>
      ${rows.map(([name, pay, growth, open, , url]) => `<tr><td><a href="${esc(url)}" target="_blank" rel="noopener" data-content>${esc(T(name))}</a>${J.notes[name] ? `<br><small class="note" data-content>${esc(T(J.notes[name]))}</small>` : ""}</td><td>${esc(money(pay))}</td><td class="${growth >= 0 ? "up" : "down"}">${growth > 0 ? "+" : ""}${esc(growth)}%</td><td>${esc(open.toLocaleString("en-US"))}</td></tr>`).join("")}
    </tbody></table></div>`;
  }
  function outlookView() {
    const J = CertHub.jobMarket;
    if (!J) return `<h1>Pay and Job Outlook</h1><p class="note">This page couldn't load. Check your connection and try again.</p>`;
    return `<p class="crumbs"><a href="#careers">Career Paths</a> / Pay and Job Outlook</p><h1>Pay and Job Outlook</h1>
      <p class="meta">Median pay and projected growth in the United States for the jobs these career tracks lead to. Figures are national medians: pay varies a lot by location, experience and employer, and entry-level jobs usually pay less than the median.</p>
      ${outlookTable(J.rows)}
      <p class="note">Source: <a href="https://www.bls.gov/ooh/" target="_blank" rel="noopener">${esc(J.source)}</a> (${esc(J.asOf)}). Each occupation links to its page there. Growth is compared with 3.5 percent for all jobs; negative growth can still mean many openings, because people retire and change jobs.</p>`;
  }
  function trackOutlook(id) {
    const J = CertHub.jobMarket; if (!J) return "";
    const rows = J.rows.filter(r => r[4].includes(id)); if (!rows.length) return "";
    return `<h2>Pay and Job Outlook</h2>${outlookTable(rows)}<p class="note">US figures from the Bureau of Labor Statistics (${esc(J.asOf)}). <a href="#job-outlook">All occupations and notes</a></p>`;
  }
  function index(list) {
    const compare = ((CertHub.site || {}).compare || []).filter(p => CertHub.certs[p[0]] && CertHub.certs[p[1]]);
    return `<h1>Career Paths</h1>
    <p class="meta">Where each track leads: which certification to take first, the jobs it opens up, the skills employers ask for, and interview practice for each role. <a href="#job-outlook">Pay and Job Outlook</a> for each kind of job.</p>
    <div class="cards">${CertHub.tracks.map(t => { const c = list.find(x => x.track === t.id); return c ? `<a class="card" href="#career-${esc(t.id)}"><span class="trackico">${CertHub.fx.icon(t.id)}</span><strong>${esc(c.title)}</strong><span class="note">${esc(t.blurb || "")}</span><span class="note">${c.jobs.length} jobs · ${c.path.length}-step certification path</span></a>` : ""; }).join("")}</div>
    ${/* html: built with esc() */ advisorHtml()}
    ${compare.length ? `<h2>Compare certifications</h2><p class="note">Not sure which one to take? Side-by-side comparisons of popular pairs.</p><div class="panel"><ul class="clean">${compare.map(([a, b]) => `<li><a href="/compare/${esc(a)}-vs-${esc(b)}/">${esc(CertHub.certs[a].short)} vs ${esc(CertHub.certs[b].short)}</a></li>`).join("")}</ul></div>` : ""}`;
  }
  // Premium Pro: the AI career and certification advisor (tutor mode "path" on the server). Shown whenever accounts
  // are on; the button opens the advisor for Premium Pro members and points everyone else to sign up or Plans.
  function advisorHtml() {
    if (!(CertHub.sync && CertHub.sync.enabled)) return "";
    const tracks = CertHub.tracks || [];
    return `<h2>AI Career & Certification Advisor <span class="chip premchip">Premium Pro</span></h2>
    <form id="advisor-form" class="panel" novalidate>
      <p class="note" data-style="margin-top:0">Tell the advisor about you and the job you want. It suggests a direction and the certifications to take, in order, from the plans on this site, with time estimates and the labs to build.</p>
      <label for="adv-goal"><strong>What would you like to do?</strong></label>
      <input type="text" id="adv-goal" class="textin" maxlength="300" placeholder="e.g. Get my first IT job, or move from help desk into cybersecurity">
      <div class="formgrid">
        <div><label for="adv-exp"><strong>Experience</strong></label><select id="adv-exp" class="textin"><option value="none">No IT experience yet</option><option value="some">Some (school, home lab, self-study)</option><option value="it-job">In IT, under 2 years</option><option value="it-years">In IT, 2+ years</option></select></div>
        <div><label for="adv-hours"><strong>Study hours a week</strong></label><input type="number" id="adv-hours" class="textin" min="1" max="80" step="1" inputmode="numeric" value="8"></div>
      </div>
      <fieldset><legend>Interests <span class="note">(optional)</span></legend><div class="trackpick">${tracks.map(t => `<label class="chipbtn"><input type="checkbox" name="adv-int" value="${esc(t.name)}"> ${esc(t.name)}</label>`).join("")}</div></fieldset>
      <label for="adv-bg"><strong>Your background</strong> <span class="note">(optional)</span></label>
      <input type="text" id="adv-bg" class="textin" maxlength="300" placeholder="e.g. Retail manager, good with people, built my own PC">
      <div class="formgrid">
        <div><label for="adv-certs"><strong>Certifications you have</strong> <span class="note">(optional)</span></label><input type="text" id="adv-certs" class="textin" maxlength="300" placeholder="e.g. A+, Google IT Support"></div>
        <div><label for="adv-time"><strong>Timeframe</strong></label><select id="adv-time" class="textin"><option>3 months</option><option selected>6 months</option><option>1 year</option><option>2 years or more</option></select></div>
      </div>
      <div class="btns"><button type="submit" class="btn">${CertHub.fx.icon("spark")}Get my career path</button></div>
      <p class="note" id="adv-msg" role="status" data-style="margin:0"></p>
    </form>`;
  }
  document.addEventListener("submit", async e => {
    if (e.target.id !== "advisor-form") return;
    e.preventDefault();
    const v = id => (document.getElementById(id) || {}).value || "";
    const msg = document.getElementById("adv-msg");
    const goal = v("adv-goal").trim();
    if (!goal) { msg.textContent = "Tell the advisor what you'd like to do."; document.getElementById("adv-goal").focus(); return; }
    const me = CertHub.sync.me;
    if (!(me && me.user)) { location.hash = "signup"; return; }
    if (!(CertHub.premium && CertHub.premium.active)) { msg.textContent = "The AI advisor is part of Premium Pro."; location.hash = "plans"; return; }
    if (!CertHub.tutor && !(await CertHub.loadScript("assets/tutor.js"))) { msg.textContent = "The advisor couldn't load. Check your connection and try again."; return; }
    const context = { goal, experience: v("adv-exp"), hoursPerWeek: +v("adv-hours") || null, background: v("adv-bg"), timeframe: v("adv-time"),
      interests: [...document.querySelectorAll('input[name="adv-int"]:checked')].map(x => x.value),
      certs: v("adv-certs").split(/[,;]/).map(x => x.trim()).filter(Boolean) };
    msg.textContent = "";
    CertHub.tutor.open("path", context, goal.slice(0, 80), e.target.querySelector("button"));
  });
  // A typical day in one common role for the track (data/dayinlife.js), in the interface language.
  function dayHtml(id) {
    const d = CertHub.dayInLife && CertHub.dayInLife[id]; if (!d) return "";
    const t = (CertHub.i18n.lang() === "es" && d.es) || d.en;
    return `<h2>A day in the life</h2><p class="note"><strong data-content>${esc(t.role)}</strong><br>A typical day; real days vary by employer.</p>
      <ol class="dayline" data-content>${t.day.map(([h, x]) => `<li><span class="dlh">${esc(h)}</span><span>${esc(x)}</span></li>`).join("")}</ol>`;
  }
  document.addEventListener("click", e => { if (e.target.closest("[data-print]")) window.print(); });
  // Premium Pro: a mock interview for the role with the AI interviewer (CertHub.premium in sync.js).
  function interviewBtn(c, r) {
    const b = CertHub.premium ? CertHub.premium.button("interview", "Practice with the AI interviewer", () => ({
      subtitle: `${roleName(r)} · one question at a time, with feedback`,
      context: { role: roleName(r), level: "entry", certs: c.path.map(p => CertHub.certs[p.cert] && CertHub.certs[p.cert].short).filter(Boolean).slice(0, 4) }
    })) : "";
    return b ? `<div class="btns">${b}</div>` : "";
  }
  function track(c) {
    const t = CertHub.tracks.find(x => x.id === c.track);
    const iv = CertHub.careers.interview || {};
    return `<p class="crumbs"><a href="#careers">Career Paths</a> / ${esc(t.name)}</p>
    <h1>${esc(c.title)}</h1>
    <div class="prose">${paras(c.intro)}</div>
    <p class="no-print"><button type="button" class="btn ghost sm" data-print="1">Print this career path</button></p>
    ${dayHtml(c.track)}
    <h2>Certification path</h2>
    <ol class="steps-list plain">${c.path.map(p => { const cert = CertHub.certs[p.cert]; return `<li><strong>${cert ? `<a href="#${esc(p.cert)}">${esc(cert.short)} ${esc(cert.exam)}</a>` : esc(p.cert)}</strong><br>${esc(p.why)}</li>`; }).join("")}</ol>
    <h2>Jobs</h2>
    <div class="panel">${c.jobs.map(j => `<div class="row"><div class="grow"><strong>${esc(j.title)}</strong> <span class="chip" data-style="--c:var(--d1)">${esc(j.level)}</span><br><span class="note">${esc(j.does)}</span></div></div>`).join("")}</div>
    ${trackOutlook(c.track)}
    <h2>Skills employers ask for</h2>
    <div class="panel"><ul class="clean">${c.skills.map(s => `<li>${esc(s)}</li>`).join("")}</ul></div>
    <h2>Your next 30 days</h2>
    <div class="panel"><ol class="clean">${c.firstSteps.map(s => `<li>${esc(s)}</li>`).join("")}</ol></div>
    <h2>Portfolio labs</h2>
    <div class="labgrid">${c.labs.map(id => CertHub.labs[id]).filter(Boolean).map(l => CertHub.labCard(l)).join("")}</div>
    <h2>Interview practice</h2>
    <p class="note">Answer out loud first, then open the model answer.</p>
    ${c.roles.map(r => `<h3>${esc(roleName(r))}</h3><div class="panel">${(iv[r] || []).map(([q, a]) => `<details class="sq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}${/* html: built with esc() in sync.js */ interviewBtn(c, r)}</div>`).join("")}`;
  }
  CertHub.careerViews = {
    async show(head) {
      shell(`<h1>Career Paths</h1>${CertHub.fx.skeleton()}`);
      const [d] = await Promise.all([load(), CertHub.dayInLife ? true : CertHub.loadScript("data/dayinlife.js"), CertHub.jobMarket ? true : CertHub.loadScript("data/jobmarket.js")]);
      const want = location.hash.replace(/^#/, "") || document.body.dataset.route;
      if (want !== head) return; // moved on while loading
      if (!d.list) { shell(`<h1>Career Paths</h1><p class="note">Career pages couldn't load. Check your connection and try again.</p>`); return; }
      if (head === "careers") { shell(index(d.list)); document.title = "Career Paths · StudyToCert"; return; }
      if (head === "job-outlook") { shell(outlookView()); document.title = "Pay and Job Outlook · StudyToCert"; return; }
      const c = d.list.find(x => "career-" + x.track === head);
      if (!c) { shell(index(d.list)); return; }
      shell(track(c)); document.title = `${c.title} · StudyToCert`;
    }
  };
})();
