/* Lab library, lab pages and the portfolio. Lab content comes from data/labs-*.js;
   progress (steps, checks, notes, completion) is saved in localStorage under certhub:v1:labs. */
(function () {
  const { U, labs, labOrder, loadLabProgress, saveLabProgress, labStatus, ui } = CertHub;
  const { $, esc } = U;
  const TRACKS = ["Foundations", "Networking", "Blue team", "GRC & architecture"];
  const trackColor = t => `var(--d${{ Foundations: 1, Networking: 3, "Blue team": 2, "GRC & architecture": 5 }[t] || 6})`;
  const STATE = { new: "Not started", doing: "In progress", done: "Done" };
  const filters = { track: "", cert: "", state: "", q: "" };
  let current = null;

  const all = () => labOrder.map(id => labs[id]);
  const hours = m => m >= 60 ? `${Math.round(m / 6) / 10} h` : `${m} min`;

  function card(lab, tag) {
    const st = labStatus(lab);
    return `<a class="labcard" href="#${esc(lab.id)}" style="--c:${trackColor(lab.track)}">
      <span class="labtop"><span class="chip" style="--c:${trackColor(lab.track)}">${esc(lab.track)}</span>${tag ? `<span class="note">${esc(tag)}</span>` : ""}</span>
      <strong>${esc(lab.title)}</strong>
      <span class="note">${esc(lab.level)} · ${hours(lab.minutes)} · ${esc(lab.cost)}</span>
      <span class="labprog" aria-hidden="true"><i style="width:${st.pct}%"></i></span>
      <span class="labstate ${st.state}">${STATE[st.state]}${st.state === "doing" ? ` · ${st.pct}% of steps` : ""}</span>
    </a>`;
  }
  CertHub.labCard = card;

  /* ---------- library ---------- */
  function certsUsing(lab) { return CertHub.certView.usesOf(lab.id).map(u => u.cert.id); }
  function filtered() {
    const lp = loadLabProgress(), q = filters.q.trim().toLowerCase();
    return all().filter(l => (!filters.track || l.track === filters.track)
      && (!filters.cert || certsUsing(l).includes(filters.cert))
      && (!filters.state || labStatus(l, lp).state === filters.state)
      && (!q || (l.title + " " + l.summary + " " + l.youWillNeed.join(" ")).toLowerCase().includes(q)));
  }
  function listHtml() {
    const list = filtered();
    if (!list.length) return `<p class="note">No labs match these filters.</p>`;
    return TRACKS.map(t => { const here = list.filter(l => l.track === t); return here.length ? `<h2>${esc(t)} <span class="note">(${here.length})</span></h2><div class="labgrid">${here.map(l => card(l)).join("")}</div>` : ""; }).join("");
  }
  function libraryView() {
    const lp = loadLabProgress();
    const counts = all().reduce((a, l) => { a[labStatus(l, lp).state]++; return a; }, { new: 0, doing: 0, done: 0 });
    const first = labs["lab-home-lab"];
    return `<h1>Hands-on labs</h1>
    <p class="meta">${all().length} labs built from what security, network and GRC teams actually do day to day. Each has step-by-step instructions with exact commands, checks that prove it worked, a place for your notes, and a write-up and resume bullet for your portfolio.</p>
    <div class="figs3"><div class="fig"><b>${counts.done}</b><span>done</span></div><div class="fig"><b>${counts.doing}</b><span>in progress</span></div><div class="fig"><b>${counts.new}</b><span>not started</span></div></div>
    ${first && labStatus(first, lp).state !== "done" ? `<div class="status notice"><strong>Start here:</strong> most labs run in the home lab you build in <a href="#lab-home-lab">${esc(first.title)}</a>.</div>` : ""}
    <div class="filters">
      <label>Track <select id="f-track"><option value="">All tracks</option>${TRACKS.map(t => `<option ${filters.track === t ? "selected" : ""}>${esc(t)}</option>`).join("")}</select></label>
      <label>Certification <select id="f-cert"><option value="">All</option>${Object.values(CertHub.certs).map(c => `<option value="${esc(c.id)}" ${filters.cert === c.id ? "selected" : ""}>${esc(c.short)}</option>`).join("")}</select></label>
      <label>Status <select id="f-state"><option value="">Any</option>${Object.entries(STATE).map(([k, v]) => `<option value="${k}" ${filters.state === k ? "selected" : ""}>${v}</option>`).join("")}</select></label>
      <label class="grow">Search <input type="search" id="f-q" value="${esc(filters.q)}" placeholder="Wireshark, Splunk, VLAN…"></label>
    </div>
    <div id="lablist">${listHtml()}</div>`;
  }

  /* ---------- one lab ---------- */
  function prog() { const p = loadLabProgress(); return { p, s: p[current.id] || (p[current.id] = { steps: {}, verify: {}, notes: "" }) }; }
  function detailView(lab) {
    current = lab;
    const s = loadLabProgress()[lab.id] || { steps: {}, verify: {}, notes: "" };
    const st = labStatus(lab);
    const uses = CertHub.certView.usesOf(lab.id);
    const req = (lab.requires || []).map(id => labs[id]).filter(Boolean);
    return `<p class="crumbs"><a href="#labs">Labs</a> / ${esc(lab.track)}</p>
    <h1>${esc(lab.title)}</h1>
    <p class="meta"><span class="chip" style="--c:${trackColor(lab.track)}">${esc(lab.track)}</span> ${esc(lab.level)} · about ${hours(lab.minutes)} · ${esc(lab.cost)}</p>
    <p class="lede">${esc(lab.summary)}</p>
    <div class="panel realworld"><strong>On the job</strong><p>${esc(lab.realWorld)}</p></div>
    ${lab.safety ? `<div class="status warn"><strong>Safety:</strong> ${esc(lab.safety)}</div>` : ""}
    ${req.length ? `<p class="note">Do first: ${req.map(r => `<a href="#${esc(r.id)}">${esc(r.title)}</a> (${STATE[labStatus(r).state].toLowerCase()})`).join(", ")}</p>` : ""}
    <h2>You'll need</h2>
    <div class="panel"><ul class="clean">${lab.youWillNeed.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
    <div class="flex" style="margin-top:28px"><h2 style="margin:0">Steps</h2><span class="note" id="stepcount">${Object.values(s.steps || {}).filter(Boolean).length} of ${lab.steps.length} done</span></div>
    <div class="prog" style="--c:${trackColor(lab.track)};margin:10px 0 4px"><i id="stepbar" style="width:${st.state === "done" ? 100 : st.pct}%"></i></div>
    <ol class="steps-list">${lab.steps.map((x, i) => `<li class="${s.steps && s.steps[i] ? "checked" : ""}">
      <label class="stephead"><input type="checkbox" data-lstep="${i}" ${s.steps && s.steps[i] ? "checked" : ""}><span class="stepnum">${i + 1}</span><strong>${esc(x.title)}</strong></label>
      <div class="stepbody"><p>${esc(x.body)}</p>
      ${x.cmd ? `<div class="cmd"><pre><code>${esc(x.cmd)}</code></pre><button type="button" class="btn ghost sm copybtn" data-copy="${i}">Copy</button></div>` : ""}
      ${x.check ? `<p class="check"><strong>Check:</strong> ${esc(x.check)}</p>` : ""}</div>
    </li>`).join("")}</ol>
    <h2>Prove it worked</h2>
    <div class="panel"><ul class="days">${lab.verify.map((v, i) => `<li class="${s.verify && s.verify[i] ? "checked" : ""}"><label><input type="checkbox" data-lverify="${i}" ${s.verify && s.verify[i] ? "checked" : ""}><span class="t">${esc(v)}</span></label></li>`).join("")}</ul></div>
    <h2>Your notes and findings</h2>
    <p class="note">Write what you saw, commands that behaved differently, screenshots you took. Saved in this browser as you type, and used in your write-up.</p>
    <textarea id="labnotes" rows="7" placeholder="e.g. Lynis hardening index went from 58 to 74 after disabling password SSH and enabling ufw.">${esc(s.notes || "")}</textarea>
    <h2>For your portfolio</h2>
    <div class="panel"><strong>Deliverable</strong><p>${esc(lab.deliverable)}</p>
      <strong>Resume bullet</strong><p class="resume">${esc(lab.resume)}</p>
      <div class="btns"><button type="button" class="btn ghost sm" data-lact="copyresume">Copy resume bullet</button><button type="button" class="btn ghost sm" data-lact="copywriteup">Copy write-up (Markdown)</button></div></div>
    <div class="btns"><button type="button" class="btn" data-lact="done">${s.done ? "Mark as not done" : "Mark lab complete"}</button>${s.done ? `<span class="note" style="align-self:center">Finished ${new Date(s.done).toLocaleDateString()}</span>` : ""}</div>
    ${lab.interview && lab.interview.length ? `<h2>Interview practice</h2><div class="panel">${lab.interview.map(q => { const [a, ...b] = q.split(" — "); return `<details class="sq"><summary>${esc(a)}</summary><p>${esc(b.join(" — ") || "")}</p></details>`; }).join("")}</div>` : ""}
    ${lab.cleanup && lab.cleanup.length ? `<h2>Clean up</h2><div class="panel"><ul class="clean">${lab.cleanup.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>` : ""}
    ${lab.links && lab.links.length ? `<h2>Official docs</h2><div class="panel"><ul class="clean">${lab.links.map(l => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a></li>`).join("")}</ul></div>` : ""}
    ${uses.length ? `<h2>Part of these study plans</h2><p class="note">${uses.map(u => `<a href="#${esc(u.cert.id)}">${esc(u.cert.short)}</a> week ${u.week}`).join(" · ")}</p>` : ""}`;
  }

  function writeup(lab) {
    const s = loadLabProgress()[lab.id] || {};
    const date = s.done ? new Date(s.done).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
    return `# ${lab.title}

*${lab.track} · ${lab.level} · ${date}*

## Objective
${lab.summary}

## Why it matters on the job
${lab.realWorld}

## Environment and tools
${lab.youWillNeed.map(x => `- ${x}`).join("\n")}

## What I did
${lab.steps.map((x, i) => `${i + 1}. ${x.title}${s.steps && s.steps[i] ? "" : " *(not done)*"}`).join("\n")}

## Verification
${lab.verify.map((v, i) => `- [${s.verify && s.verify[i] ? "x" : " "}] ${v}`).join("\n")}

## Findings and notes
${(s.notes || "").trim() || "_Add your findings, screenshots and anything that surprised you._"}

## Deliverable
${lab.deliverable}

## Resume bullet
- ${lab.resume}
`;
  }

  /* ---------- portfolio ---------- */
  function portfolioView() {
    const lp = loadLabProgress();
    const done = all().filter(l => labStatus(l, lp).state === "done").sort((a, b) => lp[a.id].done - lp[b.id].done);
    const doing = all().filter(l => labStatus(l, lp).state === "doing");
    const mins = done.reduce((a, l) => a + l.minutes, 0);
    const nextUp = all().filter(l => labStatus(l, lp).state === "new" && (l.requires || []).every(r => !labs[r] || labStatus(labs[r], lp).state === "done")).slice(0, 4);
    return `<h1>Your portfolio</h1>
    <p class="meta">Finished labs become proof of hands-on experience. Copy the write-ups into a GitHub repository and the bullets into your resume.</p>
    <div class="figs3"><div class="fig"><b>${done.length}</b><span>labs finished</span></div><div class="fig"><b>${hours(mins)}</b><span>hands-on time</span></div><div class="fig"><b>${new Set(done.map(l => l.track)).size}</b><span>of 4 tracks</span></div></div>
    ${done.length ? `<div class="btns"><button type="button" class="btn" data-lact="copybullets">Copy all resume bullets</button><button type="button" class="btn ghost" data-lact="copyportfolio">Copy full portfolio (Markdown)</button></div>
    <h2>Finished labs</h2>
    <div class="panel">${done.map(l => `<div class="row"><div class="grow"><a href="#${esc(l.id)}"><strong>${esc(l.title)}</strong></a><br><span class="note">${esc(l.track)} · finished ${new Date(lp[l.id].done).toLocaleDateString()}</span><p class="resume" style="margin:6px 0 0">${esc(l.resume)}</p></div></div>`).join("")}</div>`
    : `<div class="status">No finished labs yet. Mark a lab complete and it shows up here with its resume bullet.</div>`}
    ${doing.length ? `<h2>In progress</h2><div class="labgrid">${doing.map(l => card(l)).join("")}</div>` : ""}
    ${nextUp.length ? `<h2>Good next labs</h2><div class="labgrid">${nextUp.map(l => card(l)).join("")}</div>` : ""}
    <h2>Publish it</h2>
    <ol class="steps-list plain">
      <li><strong>Create a public GitHub repository</strong> named <code>cybersecurity-portfolio</code> with a README that lists each lab and the skills it shows.</li>
      <li><strong>One folder per lab</strong>, e.g. <code>01-linux-hardening/README.md</code>, containing the write-up you copy from the lab page plus 2–4 screenshots.</li>
      <li><strong>Remove anything sensitive</strong> first: real IP addresses outside your lab, usernames, API keys, email headers with personal data.</li>
      <li><strong>Pin the repository</strong> on your GitHub profile and link it from your resume and LinkedIn "Featured" section.</li>
      <li><strong>Resume:</strong> add a "Home lab and projects" section and paste 4–6 of the bullets above, strongest first.</li>
    </ol>`;
  }
  function portfolioMarkdown() {
    const lp = loadLabProgress();
    const done = all().filter(l => labStatus(l, lp).state === "done");
    return `# Cybersecurity lab portfolio\n\n${done.map((l, i) => `${i + 1}. [${l.title}](./${String(i + 1).padStart(2, "0")}-${l.id.replace(/^lab-/, "")}/) — ${l.track}`).join("\n")}\n\n---\n\n${done.map(writeup).join("\n---\n\n")}`;
  }

  /* ---------- events ---------- */
  let noteT;
  document.addEventListener("change", e => {
    const el = e.target;
    if (el.id && el.id.startsWith("f-") && el.id !== "f-q") { filters[el.id.slice(2)] = el.value; $("#lablist").innerHTML = listHtml(); return; }
    if (!current || !$("#labnotes")) return;
    if (el.dataset.lstep != null || el.dataset.lverify != null) {
      const { p, s } = prog();
      const key = el.dataset.lstep != null ? "steps" : "verify", i = el.dataset.lstep ?? el.dataset.lverify;
      s[key] = s[key] || {}; s[key][i] = el.checked; s.started = s.started || Date.now();
      saveLabProgress(p);
      el.closest("li").classList.toggle("checked", el.checked);
      if (key === "steps") {
        const n = Object.values(s.steps).filter(Boolean).length;
        $("#stepcount").textContent = `${n} of ${current.steps.length} done`;
        if (!s.done) $("#stepbar").style.width = `${Math.round(100 * n / current.steps.length)}%`;
        if (n === current.steps.length && !s.done) ui.toast("All steps done. Tick the checks below, then mark the lab complete.");
      }
    }
  });
  document.addEventListener("input", e => {
    if (e.target.id === "f-q") { filters.q = e.target.value; clearTimeout(noteT); noteT = setTimeout(() => { $("#lablist").innerHTML = listHtml(); }, 150); return; }
    if (e.target.id === "labnotes" && current) {
      const v = e.target.value;
      clearTimeout(noteT);
      noteT = setTimeout(() => { const { p, s } = prog(); s.notes = v; s.started = s.started || Date.now(); saveLabProgress(p); }, 400);
    }
  });
  document.addEventListener("click", async e => {
    const b = e.target.closest("[data-copy],[data-lact]"); if (!b) return;
    if (b.dataset.copy != null && current) return ui.copy(current.steps[+b.dataset.copy].cmd, `step ${+b.dataset.copy + 1} command`);
    const a = b.dataset.lact;
    if (a === "copyresume") return ui.copy(current.resume, "resume bullet");
    if (a === "copywriteup") { flushNotes(); return ui.copy(writeup(current), "lab write-up"); }
    if (a === "copybullets") { const lp = loadLabProgress(); return ui.copy(all().filter(l => labStatus(l, lp).state === "done").map(l => `- ${l.resume}`).join("\n"), "resume bullets"); }
    if (a === "copyportfolio") return ui.copy(portfolioMarkdown(), "portfolio");
    if (a === "done") {
      flushNotes();
      const { p, s } = prog();
      if (s.done) { delete s.done; saveLabProgress(p); CertHub.rerender(); return; }
      const open = current.verify.length - Object.values(s.verify || {}).filter(Boolean).length;
      if (open > 0 && !(await ui.confirm(`${open} check${open > 1 ? "s aren't" : " isn't"} ticked yet. Mark the lab complete anyway?`, { ok: "Mark complete", cancel: "Not yet" }))) return;
      s.done = Date.now(); saveLabProgress(p);
      ui.toast("Lab complete. It's now in your portfolio.");
      CertHub.rerender();
    }
  });
  function flushNotes() {
    const t = $("#labnotes"); if (!t || !current) return;
    clearTimeout(noteT); const { p, s } = prog(); s.notes = t.value; saveLabProgress(p);
  }

  CertHub.labViews = { library: libraryView, detail: detailView, portfolio: portfolioView, leave() { flushNotes(); current = null; } };
})();
