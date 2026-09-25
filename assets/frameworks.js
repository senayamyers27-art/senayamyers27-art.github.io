/* Frameworks page (#frameworks) and NICE work roles for labs. Data: data/frameworks.js. */
(function () {
  const { U } = CertHub;
  const { esc } = U;
  const FW = CertHub.frameworks || [], ROLES = CertHub.niceRoles || [], LAB_ROLES = CertHub.labRoles || {};
  const KINDS = ["Governance & risk", "Controls & standards", "Threat & detection", "Secure development", "Privacy & compliance", "Networking models & standards", "IT service & operations", "Software delivery", "Cloud architecture", "Careers"];
  const roleById = Object.fromEntries(ROLES.map(r => [r.id, r]));

  // Labs whose content mentions a framework, found from the lab text itself so it stays current.
  const labText = {};
  const textOf = l => labText[l.id] || (labText[l.id] = JSON.stringify(l));
  function labsFor(fw) {
    let re; try { re = new RegExp(fw.match); } catch (e) { return []; }
    return CertHub.labOrder.map(id => CertHub.labs[id]).filter(l => l && re.test(textOf(l)));
  }
  const rolesFor = lab => (LAB_ROLES[lab.id] || []).map(id => roleById[id]).filter(Boolean);
  const labsForRole = roleId => CertHub.labOrder.filter(id => (LAB_ROLES[id] || []).includes(roleId)).map(id => CertHub.labs[id]).filter(Boolean);

  function view() {
    const certs = CertHub.certs;
    return `<h1>Frameworks</h1>
    <p class="meta">${FW.length} frameworks and standards that come up on the exams and on the job: what each one is, its parts, when to use it, which exams test it and which labs put it into practice. Checked ${esc(U.fmtLong(U.parseD(CertHub.frameworksChecked)))}; always confirm details with the official source.</p>
    <p class="note">Jump to: ${KINDS.map(k => `<a href="#fw-${esc(k.toLowerCase().replace(/[^a-z]+/g, "-"))}" data-jump>${esc(k)}</a>`).join(" · ")} · <a href="#fw-roles" data-jump>Job roles</a></p>
    ${KINDS.map(k => {
      const here = FW.filter(f => f.kind === k);
      if (!here.length) return "";
      return `<h2 id="fw-${esc(k.toLowerCase().replace(/[^a-z]+/g, "-"))}">${esc(k)}</h2>` + here.map(f => {
        const labs = labsFor(f).slice(0, 8);
        return `<details class="week fw" id="fw-${esc(f.id)}"><summary><span class="grow"><strong>${esc(f.name)}</strong><br><span class="note">${esc(f.org)}</span></span></summary>
        <p>${esc(f.what)}</p>
        <h3>Key parts</h3><ul class="clean">${f.parts.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
        <p><strong>Use it when:</strong> ${esc(f.useWhen)}</p>
        ${f.exams.length ? `<p class="fwexams"><strong>On these exams:</strong> ${f.exams.filter(id => certs[id]).map(id => `<a class="chip" style="--c:var(--ink)" href="#${esc(id)}">${esc(certs[id].short)}</a>`).join(" ")}</p>` : ""}
        ${labs.length ? `<p><strong>Practice it:</strong> ${labs.map(l => `<a href="#${esc(l.id)}">${esc(l.title)}</a>`).join(" · ")}</p>` : ""}
        ${f.url ? `<p class="note"><a href="${esc(f.url)}" target="_blank" rel="noopener">Official source</a></p>` : ""}
        </details>`;
      }).join("");
    }).join("")}
    <h2 id="fw-roles">Job roles (NICE Framework)</h2>
    <p class="note">Work roles from the NICE Workforce Framework for Cybersecurity, with common job titles and the labs that build each one's skills. Filter the <a href="#labs">lab library</a> by role to plan a path.</p>
    <div class="panel">${ROLES.map(r => { const n = labsForRole(r.id).length; return `<div class="row"><div class="grow"><strong>${esc(r.name)}</strong> <span class="note">· ${esc(r.category)}</span><br><span class="note">${esc(r.titles)}</span><p style="margin:4px 0 0">${esc(r.about)}</p></div><button type="button" class="btn ghost sm" data-role-labs="${esc(r.id)}">${n} lab${n === 1 ? "" : "s"}</button></div>`; }).join("")}</div>`;
  }

  // "Jump to" links scroll within the page instead of changing the route.
  document.addEventListener("click", e => {
    const a = e.target.closest("a[data-jump]");
    if (a) { e.preventDefault(); const t = document.getElementById(a.getAttribute("href").slice(1)); if (t) { if (t.tagName === "DETAILS") t.open = true; t.scrollIntoView({ block: "start" }); } return; }
    const b = e.target.closest("[data-role-labs]");
    if (b && CertHub.labViews && CertHub.labViews.filterRole) { CertHub.labViews.filterRole(b.dataset.roleLabs); location.hash = "labs"; }
  });

  CertHub.frameworksView = view;
  CertHub.nice = { roles: ROLES, rolesFor, labsForRole };
})();
