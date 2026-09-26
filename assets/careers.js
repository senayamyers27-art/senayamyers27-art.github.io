/* Career pages: one per track (which certifications in what order, jobs, skills, first steps and
   portfolio labs), plus interview practice for each NICE work role. Data: data/careers.js. */
(function () {
  const { U } = CertHub;
  const { $, esc } = U;
  const paras = x => String(x || "").split(/\n\n+/).map(p => `<p>${esc(p)}</p>`).join("");
  const load = () => CertHub.loadCareers();
  function shell(body) { $("#app").innerHTML = body; }
  const roleName = id => ((CertHub.niceRoles || []).find(r => r.id === id) || { name: id }).name;

  function index(list) {
    return `<h1>Career paths</h1>
    <p class="meta">Where each track leads: which certification to take first, the jobs it opens up, the skills employers ask for, and interview practice for each role.</p>
    <div class="cards">${CertHub.tracks.map(t => { const c = list.find(x => x.track === t.id); return c ? `<a class="card" href="#career-${esc(t.id)}"><strong>${esc(c.title)}</strong><span class="note">${esc(t.blurb || "")}</span><span class="note">${c.jobs.length} jobs · ${c.path.length}-step certification path</span></a>` : ""; }).join("")}</div>`;
  }
  function track(c) {
    const t = CertHub.tracks.find(x => x.id === c.track);
    const iv = CertHub.careers.interview || {};
    return `<p class="crumbs"><a href="#careers">Career paths</a> / ${esc(t.name)}</p>
    <h1>${esc(c.title)}</h1>
    <div class="prose">${paras(c.intro)}</div>
    <h2>Certification path</h2>
    <ol class="steps-list plain">${c.path.map(p => { const cert = CertHub.certs[p.cert]; return `<li><strong>${cert ? `<a href="#${esc(p.cert)}">${esc(cert.short)} ${esc(cert.exam)}</a>` : esc(p.cert)}</strong><br>${esc(p.why)}</li>`; }).join("")}</ol>
    <h2>Jobs</h2>
    <div class="panel">${c.jobs.map(j => `<div class="row"><div class="grow"><strong>${esc(j.title)}</strong> <span class="chip" style="--c:var(--d1)">${esc(j.level)}</span><br><span class="note">${esc(j.does)}</span></div></div>`).join("")}</div>
    <h2>Skills employers ask for</h2>
    <div class="panel"><ul class="clean">${c.skills.map(s => `<li>${esc(s)}</li>`).join("")}</ul></div>
    <h2>Your next 30 days</h2>
    <div class="panel"><ol class="clean">${c.firstSteps.map(s => `<li>${esc(s)}</li>`).join("")}</ol></div>
    <h2>Portfolio labs</h2>
    <div class="labgrid">${c.labs.map(id => CertHub.labs[id]).filter(Boolean).map(l => CertHub.labCard(l)).join("")}</div>
    <h2>Interview practice</h2>
    <p class="note">Answer out loud first, then open the model answer.</p>
    ${c.roles.map(r => `<h3>${esc(roleName(r))}</h3><div class="panel">${(iv[r] || []).map(([q, a]) => `<details class="sq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>`).join("")}`;
  }
  CertHub.careerViews = {
    async show(head) {
      shell(`<h1>Career paths</h1><p class="note">Loading…</p>`);
      const d = await load();
      const want = location.hash.replace(/^#/, "") || document.body.dataset.route;
      if (want !== head) return; // moved on while loading
      if (!d.list) { shell(`<h1>Career paths</h1><p class="note">Career pages couldn't load. Check your connection and try again.</p>`); return; }
      if (head === "careers") { shell(index(d.list)); document.title = "Career Paths · StudyToCert"; return; }
      const c = d.list.find(x => "career-" + x.track === head);
      if (!c) { shell(index(d.list)); return; }
      shell(track(c)); document.title = `${c.title} · StudyToCert`;
    }
  };
})();
