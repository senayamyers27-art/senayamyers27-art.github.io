/* Pro: extra question banks, full-length exams, the score report, flashcards, study guides
   and capstone projects. Paid content comes from the accounts API for Pro members and is kept
   in memory only. Everything here is inert unless site.config.json sets "apiOrigin". */
(function () {
  const { U } = CertHub;
  const { $, esc } = U;
  const API = (CertHub.site && CertHub.site.apiUrl) || "";
  const PRICE = (CertHub.site && CertHub.site.pro) || {};
  const cache = {};
  const me = () => CertHub.sync && CertHub.sync.me;

  const pro = {
    // Pro can be bought on this site (accounts are configured).
    get available() { return !!API; },
    // The signed-in person has Pro (their own plan or an organization's seat).
    get active() { const m = me(); return !!(m && m.features && m.features.includes("pro_content")); },
    price: PRICE,
    // Loads a Pro bundle: a certification id, or "capstones". Resolves to null when unavailable.
    load(name) {
      if (!pro.active || !/^[a-z0-9-]{1,40}$/.test(name)) return Promise.resolve(null);
      if (!cache[name]) {
        cache[name] = fetch(`${API}/v1/content/${name}`, { credentials: "include", cache: "no-store" })
          .then(r => r.ok ? r.json() : null).catch(() => null)
          .then(j => { if (!j || typeof j !== "object") { delete cache[name]; return null; } return j; });
      }
      return cache[name];
    },
    // One line inviting people to Pro; empty when Pro can't be bought here.
    teaser(what) {
      if (!pro.available) return "";
      const signed = !!(me() && me().user);
      return `<div class="panel pro-teaser"><span class="chip pro">Pro</span> ${esc(what)}
        <div class="btns"><a class="btn sm" href="#account">${signed ? "See Pro" : "Sign in to get Pro"}</a>${PRICE.monthly ? `<span class="note" style="align-self:center">${esc(PRICE.monthly)}/month or ${esc(PRICE.yearly)}/year</span>` : ""}</div></div>`;
    }
  };

  /* ---------- capstone projects ---------- */
  let capstones = null, capLoading = null;
  function loadCapstones() {
    if (!pro.active) return Promise.resolve(null);
    if (!capLoading) capLoading = pro.load("capstones").then(j => {
      capstones = j && Array.isArray(j.labs) ? j.labs.filter(l => l && /^cap-[a-z0-9-]{1,60}$/.test(l.id) && Array.isArray(l.steps) && Array.isArray(l.verify) && Array.isArray(l.youWillNeed)) : null;
      if (!capstones) capLoading = null;
      return capstones;
    });
    return capLoading;
  }
  function rubricHtml(lab) {
    if (!Array.isArray(lab.rubric) || !lab.rubric.length) return "";
    return `<h2>Grade your project</h2>
    <p class="note">Score your deliverable the way an instructor or hiring manager would. Aim for "Meets" on every row before you publish it.</p>
    <div class="scroll" tabindex="0" role="region" aria-label="Table (scrolls sideways on small screens)"><table class="sectable"><thead><tr><th>Criterion</th><th>Needs work</th><th>Meets</th><th>Exceeds</th></tr></thead><tbody>
    ${lab.rubric.map(r => `<tr><td><strong>${esc(r.criterion)}</strong></td>${[0, 1, 2].map(i => `<td>${esc(String((r.levels || [])[i] || "").replace(/^(Needs work|Meets|Exceeds):\s*/i, ""))}</td>`).join("")}</tr>`).join("")}
    </tbody></table></div>`;
  }
  pro.capstoneSection = function () {
    if (!pro.available) return "";
    const intro = `<h2>Capstone projects <span class="chip pro">Pro</span></h2>
    <p class="note">Multi-day guided projects that combine several labs into one portfolio piece, each with a grading rubric.</p>`;
    if (!pro.active) return intro + pro.teaser("Unlock capstone projects with rubrics: build a small SOC, secure an office network, run a vulnerability program and more.");
    if (!capstones) { loadCapstones().then(c => { if (c && /^#?labs/.test(location.hash)) CertHub.rerender(); }); return intro + `<p class="note">Loading…</p>`; }
    return intro + `<div class="labgrid">${capstones.map(l => CertHub.labCard(l, "Capstone")).join("")}</div>`;
  };
  pro.capstoneView = async function (id) {
    const shell = body => { $("#app").innerHTML = `<p class="crumbs"><a href="#labs">Labs</a> / Capstone</p>${body}`; };
    if (!pro.available) { shell(`<h1>Capstone project</h1><p class="note">Capstone projects aren't available on this site.</p>`); return; }
    if (!pro.active) { shell(`<h1>Capstone project</h1>${pro.teaser("Capstone projects are part of Pro.")}`); return; }
    shell(`<h1>Capstone project</h1><p class="note">Loading…</p>`);
    const list = await loadCapstones();
    if (location.hash.replace("#", "") !== id) return; // moved on while loading
    const lab = list && list.find(l => l.id === id);
    if (!lab) { shell(`<h1>Capstone project</h1><p class="note">This project wasn't found.</p>`); return; }
    $("#app").innerHTML = CertHub.labViews.detail(lab) + rubricHtml(lab);
    document.title = `${lab.title} · Cyber Cert Study`;
  };

  // Sign-in, sign-out and plan changes: drop or fetch paid content and redraw.
  document.addEventListener("certhub:me", () => {
    if (!pro.active) { for (const k in cache) delete cache[k]; capstones = null; capLoading = null; }
    if (CertHub.certView && CertHub.certView.proChanged) CertHub.certView.proChanged();
  });

  CertHub.pro = pro;
})();
