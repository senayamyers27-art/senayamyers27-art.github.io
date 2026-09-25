/* The single-page app: routes, header and home page.
   Routes are plain hash tokens so links work anywhere, including embedded hosts:
     #home · #<cert-id> · #<cert-id>.<tab> · #labs · #lab-<id> · #portfolio */
(function () {
  const { U, certs, loadProgress, buildPlan, labs, labOrder, labStatus, loadLabProgress, ui } = CertHub;
  const { $, esc, dc } = U;
  let view = "";

  /* ---------- home ---------- */
  function certCard(id) {
    const c = certs[id] || CertHub.planned[id];
    if (!c) return "";
    const built = !!certs[id];
    const stack = `<div class="stack" aria-hidden="true">${c.domains.map(d => `<i style="--c:${dc(d.id)};flex:${d.w}"></i>`).join("")}</div>`;
    const badge = c.status === "verified" ? `<span class="badge ok">Weights verified</span>` : `<span class="badge check">Weights to confirm</span>`;
    let foot;
    if (built) {
      const p = loadProgress(id);
      const s = Object.values(p.stats).reduce((a, x) => ({ c: a.c + x.c, t: a.t + x.t }), { c: 0, t: 0 });
      const plan = buildPlan(c);
      const labCount = new Set(plan.weeks.flatMap(w => w.labRefs || []).filter(l => labs[l])).size;
      const days = Object.values(p.checks).filter(Boolean).length;
      foot = `<span>${plan.weeks.length} weeks · ${c.qCount ?? (c.questions || []).length} questions${labCount ? ` · ${labCount} labs` : ""}</span><span>${s.t ? `${Math.round(100 * s.c / s.t)}% of ${s.t} answered` : days ? `${days} days checked` : "Not started"}</span>`;
    } else foot = `<span>Study plan not written yet</span>`;
    const inner = `<span class="vendor">${esc(c.vendor)} · ${esc(c.exam)}</span>
      <h2>${esc(c.name)}</h2>
      <p>${esc(c.blurb)}</p>
      ${built ? CertHub.activeNotices(c).slice(0, 1).map(n => `<p class="note" style="color:var(--ink)">${esc(n.text)}</p>`).join("") : ""}
      ${stack}
      <div class="cardfoot">${badge}${foot}</div>`;
    return built ? `<a class="card" href="#${esc(id)}">${inner}</a>` : `<div class="card" aria-disabled="true" style="opacity:.7">${inner}</div>`;
  }
  /* ---------- career tracks ---------- */
  const TRACKS = CertHub.tracks || [{ id: "all", name: "All", certs: CertHub.catalog }];
  const TRACK_KEY = "certhub:track";
  const curTrack = () => { const t = CertHub.store.get(TRACK_KEY) || "all"; return t === "all" || TRACKS.some(x => x.id === t) ? t : "all"; };
  function trackPicker() {
    const cur = curTrack();
    return `<div class="trackpick" role="group" aria-labelledby="tracks-h">${[["all", "All tracks"], ...TRACKS.map(t => [t.id, t.name])].map(([id, name]) => `<button type="button" class="chipbtn" data-track="${esc(id)}" aria-pressed="${cur === id}">${esc(name)}</button>`).join("")}</div>`;
  }
  function trackCards() {
    const cur = curTrack();
    if (cur === "all") return TRACKS.map(t => `<h3 class="trackh">${esc(t.name)}</h3><p class="note">${esc(t.blurb || "")}</p><div class="cards">${t.certs.map(certCard).join("")}</div>`).join("");
    const t = TRACKS.find(x => x.id === cur);
    return `<p class="note">${esc(t.blurb || "")}</p><div class="cards">${t.certs.map(certCard).join("")}</div>`;
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-track]"); if (!b) return;
    CertHub.store.set(TRACK_KEY, b.dataset.track);
    document.querySelectorAll("[data-track]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    const box = document.getElementById("trackcards"); if (box) box.innerHTML = trackCards();
  });

  function homeView() {
    const lp = loadLabProgress();
    const labList = labOrder.map(id => labs[id]);
    const doneLabs = labList.filter(l => labStatus(l, lp).state === "done").length;
    const start = labs["lab-home-lab"];
    return `<section class="hero">
      <h1>Study plans and hands-on labs for IT and cybersecurity certifications</h1>
      <p class="meta">Pick a career track and a certification for a week-by-week plan with quizzes, timed checkpoint tests, a practice exam weighted like the real one, and spaced review. Every week links to step-by-step labs you do in your own home lab, so you finish with real experience and a portfolio, not just a score.</p>
      <div class="btns">${start ? `<a class="btn" href="#lab-home-lab">Start with the home lab</a>` : ""}<a class="btn ghost" href="#labs">Browse ${labList.length} labs</a><a class="btn ghost" href="#portfolio">Your portfolio${doneLabs ? ` (${doneLabs})` : ""}</a></div>
    </section>
    ${CertHub.install.installed() ? "" : `<div class="panel installcard"><div class="grow"><strong>Get the app on your phone</strong><br><span class="note">Install it from your browser: it opens full screen and works offline. No app store needed.</span></div><div class="btns" style="margin:0">${CertHub.install.prompt ? `<button type="button" class="btn sm" data-gact="install">Install</button>` : ""}<a class="btn ghost sm" href="#install">How to install</a></div></div>`}
    <h2 id="tracks-h">Certifications by career track</h2>
    ${trackPicker()}
    <div id="trackcards">${trackCards()}</div>
    <h2>Your progress</h2>
    ${(() => { const st = CertHub.activity.streak(); return `<div class="panel startcard"><div class="grow"><strong>${st.current ? `${st.current}-day study streak` : "Start a study streak"}</strong><br><span class="note">${st.current ? (st.today ? "You studied today. " : "Study today to keep it going. ") : "Answer a question or read a lesson each day. "}${st.best ? `Best: ${st.best} days.` : ""}</span></div><button type="button" class="btn ghost sm" data-gact="reminder">Set a daily reminder</button></div>`; })()}
    <div class="panel">
      <p class="note" style="margin:0">Progress, lab notes and checkmarks are saved in this browser only. Nothing is sent anywhere. Back up to move them to another device.</p>
      <div class="btns"><button type="button" class="btn ghost sm no-framed" data-gact="download">Download backup</button><button type="button" class="btn ghost sm" data-gact="copybackup">Copy backup</button><label class="btn ghost sm" for="imp">Restore from file</label><input type="file" id="imp" accept="application/json" class="hide"><button type="button" class="btn ghost sm" data-gact="pasterestore">Restore from text</button></div>
    </div>
    <div class="panel installcard supportcard"><div class="grow"><strong>Keep it free</strong><br><span class="note">No ads and no tracking. Share it, report a mistake${CertHub.site && CertHub.site.support && CertHub.site.support.url ? " or chip in" : ""} to help.</span></div><a class="btn ghost sm" href="#support">Support this site</a></div>`;
  }

  /* ---------- restore from pasted text ---------- */
  CertHub.restoreFromText = function () {
    const wrap = document.createElement("div");
    wrap.className = "modal-wrap";
    wrap.innerHTML = `<div class="modal wide" role="dialog" aria-modal="true" aria-labelledby="rt-h"><p id="rt-h"><strong>Restore from a copied backup</strong><br><span class="note">Paste the backup text. It replaces progress for the same certifications and labs.</span></p><textarea rows="8" id="rt-text"></textarea><p class="err" id="rt-err"></p><div class="btns"><button type="button" class="btn" data-rt="ok">Restore</button><button type="button" class="btn ghost" data-rt="cancel">Cancel</button></div></div>`;
    document.body.appendChild(wrap);
    wrap.querySelector("textarea").focus();
    wrap.addEventListener("click", e => {
      const b = e.target.closest("[data-rt]"); if (!b) return;
      if (b.dataset.rt === "cancel") return wrap.remove();
      try { const n = CertHub.restoreText(wrap.querySelector("textarea").value); wrap.remove(); ui.toast(`Restored ${n} saved item${n === 1 ? "" : "s"}.`); setTimeout(() => location.reload(), 800); }
      catch (err) { wrap.querySelector("#rt-err").textContent = err instanceof SyntaxError ? "That text isn't a complete backup. Copy the whole backup and try again." : err.message; }
    });
  };

  /* ---------- router ---------- */
  const NAV = [["home", "Certifications"], ["labs", "Labs"], ["portfolio", "Portfolio"], ["frameworks", "Frameworks"]];
  // The Account tab only appears when the site has an accounts API configured.
  const navItems = () => CertHub.sync && CertHub.sync.enabled ? NAV.concat([["account", "Account"]]) : NAV;
  function topNav(cur) {
    $("#tabs").innerHTML = navItems().map(([k, l]) => `<a role="tab" href="#${k}" aria-selected="${cur === k}">${l}</a>`).join("");
    $("#count").innerHTML = "";
  }
  // Route tokens come from the URL, so only look them up as the objects' own keys
  // (never inherited ones like "constructor" or "__proto__").
  const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  const POLICY_TITLES = { privacy: "Privacy Policy", terms: "Terms of Use", security: "Security", install: "Install the App", support: "Support This Site" };
  // Optional page counts (GoatCounter): no cookies, no personal data, skipped when the browser asks not to be tracked.
  let lastCounted = "";
  function countView() {
    const gc = CertHub.site && CertHub.site.analytics;
    if (!gc || navigator.doNotTrack === "1" || navigator.globalPrivacyControl) return;
    const p = location.pathname + location.hash;
    if (p === lastCounted) return; lastCounted = p;
    const q = new URLSearchParams({ p, t: document.title, r: document.referrer && !document.referrer.startsWith(location.origin) ? document.referrer : "", rnd: Math.random().toString(36).slice(2) });
    try { fetch(`${gc}/count?${q}`, { mode: "no-cors", credentials: "omit", keepalive: true, referrerPolicy: "no-referrer" }).catch(() => {}); } catch (e) {}
  }
  function route() {
    let raw = "";
    try { raw = decodeURIComponent(location.hash.replace(/^#/, "")); } catch (e) { raw = ""; }
    raw = raw || document.body.dataset.route || "home";
    let [head, tab] = raw.split(".");
    if (!/^[a-z0-9-]{1,64}$/.test(head || "")) head = "home";
    if (tab && !/^[a-z]{1,16}$/.test(tab)) tab = "";
    const prev = view;
    if (prev.startsWith("lab-") || prev.startsWith("cap-")) CertHub.labViews.leave();
    let title = "Cyber Cert Study", brand = "Cyber Cert Study";
    if (own(certs, head)) {
      CertHub.certView.open(head, tab || "week");
      view = "cert:" + head;
      brand = CertHub.certView.title();
      title = `${brand} Study Plan`;
    } else {
      CertHub.certView.close();
      if (head === "labs") { topNav("labs"); $("#app").innerHTML = CertHub.labViews.library(); title = "Hands-on Labs"; view = "labs"; }
      else if (own(labs, head)) { topNav("labs"); $("#app").innerHTML = CertHub.labViews.detail(labs[head]); title = labs[head].title; view = head; }
      else if (own(POLICY_TITLES, head)) { topNav(""); const pv = CertHub.policyViews; $("#app").innerHTML = head === "privacy" ? pv.privacy() : head === "terms" ? pv.terms() : head === "install" ? pv.install() : head === "support" ? pv.support() : pv.security(); title = POLICY_TITLES[head]; view = head; }
      else if (head === "account" && CertHub.accountViews) { topNav("account"); $("#app").innerHTML = CertHub.accountViews.account(); title = "Account"; view = "account"; }
      else if (/^cohort-[0-9a-f]{24}$/.test(head) && CertHub.accountViews) { topNav("account"); CertHub.accountViews.cohort(head.slice(7)); title = "Cohort Progress"; view = head; }
      else if (/^cap-[a-z0-9-]{1,60}$/.test(head) && CertHub.pro) { topNav("labs"); CertHub.pro.capstoneView(head); title = "Capstone project"; view = head; }
      else if (head === "frameworks" && CertHub.frameworksView) { topNav("frameworks"); $("#app").innerHTML = CertHub.frameworksView(); title = "Frameworks"; view = "frameworks"; }
      else if (head === "portfolio") { topNav("portfolio"); $("#app").innerHTML = CertHub.labViews.portfolio(); title = "Lab Portfolio"; view = "portfolio"; }
      else { topNav("home"); $("#app").innerHTML = homeView(); view = "home"; }
    }
    $("#brandname").textContent = brand;
    $("#back").hidden = view === "home";
    document.title = title === "Cyber Cert Study" ? title : `${title} · Cyber Cert Study`;
    countView();
    window.scrollTo(0, 0);
  }
  // Re-render the current view in place (after marking a lab done, for example).
  CertHub.rerender = () => { const y = window.scrollY; route(); window.scrollTo(0, y); };

  document.addEventListener("click", e => {
    const b = e.target.closest("[data-gact]"); if (!b) return;
    const a = b.dataset.gact;
    if (a === "download") CertHub.exportAll();
    if (a === "copybackup") ui.copy(CertHub.backupText(), "progress backup");
    if (a === "pasterestore") CertHub.restoreFromText();
    if (a === "reminder") CertHub.addReminder("Study for my certification", location.origin + location.pathname);
    if (a === "share") {
      const data = { title: "Cyber Cert Study", text: "Free study plans, quizzes and hands-on labs for cybersecurity certifications.", url: location.origin + "/" };
      if (navigator.share) navigator.share(data).catch(() => {}); else ui.copy(data.url, "site link");
    }
    if (a === "install") CertHub.install.run().then(ok => { if (!ok) location.hash = "install"; else CertHub.rerender(); });
  });
  document.addEventListener("change", e => {
    if (e.target.id !== "imp" || view !== "home" || !e.target.files[0]) return;
    CertHub.importAll(e.target.files[0], (err, n) => {
      if (err) return ui.toast(err.message);
      ui.toast(`Restored ${n} saved item${n === 1 ? "" : "s"}.`); setTimeout(() => location.reload(), 800);
    });
  });
  window.addEventListener("hashchange", route);
  document.addEventListener("DOMContentLoaded", () => { CertHub.themeButton(); route(); });
})();
