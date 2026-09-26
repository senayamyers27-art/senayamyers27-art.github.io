/* Practice VMs: real Linux machines (Ubuntu 24.04 with systemd, SSH, LVM, iptables...) running in the page with the
   v86 emulator. Everything runs on the learner's device; the VMs have no internet but can reach each other.
   Pages: #vm (hub and free practice), #vm-net (two networked machines), #vm-lab-<id> (graded labs from
   data/vmlabs.js), #vm-exam (timed exam). Files: vendor/vm/ (tools/vm/build-vm.sh). Loaded on demand by app.js.
   Each VM starts from a saved snapshot (state.bin.zst); a checker service on the second serial port runs
   setup and grading commands as root, away from the learner's terminal. */
(function () {
  const { U } = CertHub;
  const { $, esc } = U;
  const V = "vendor/vm/", LABS_KEY = "certhub:vmlabs", EXAM_KEY = "certhub:vmexam";
  const HOSTS = { lab: { name: "lab", ip: "10.10.0.30/24", mac: "1e" }, server: { name: "server", ip: "10.10.0.10/24", mac: "0a" }, client: { name: "client", ip: "10.10.0.20/24", mac: "14" } };
  const inline = x => esc(x).replace(/`([^`\n]+)`/g, "<code>$1</code>");
  const store = { get: (k, d) => { try { return JSON.parse(CertHub.store.get(k) || "null") || d; } catch (e) { return d; } }, set: (k, v) => CertHub.store.set(k, JSON.stringify(v)) };
  let S = null; // the current VM session: { page, vms: {host: vm}, lab, exam, timer }
  let cfgP = null, stateP = null;

  /* ---------- loading ---------- */
  const loadCss = href => new Promise(res => { if (document.querySelector(`link[href="${href}"]`)) return res(); const l = document.createElement("link"); l.rel = "stylesheet"; l.href = href; l.onload = l.onerror = () => res(); document.head.appendChild(l); });
  // Lab data, with the Spanish text (data/vmlabs-es.js) laid over it in Spanish mode. Commands in steps are the same
  // in both languages, so only titles, intros, steps and check labels are replaced.
  let labsLoading = null;
  const loadLabs = () => labsLoading || (labsLoading = CertHub.loadScript("data/vmlabs.js").then(() => {
    if (CertHub.i18n.lang() !== "es") return;
    return CertHub.loadScript("data/vmlabs-es.js").then(() => {
      const es = CertHub.vmLabsEs || {};
      CertHub.vmLabs.labs.forEach(l => {
        const t = es[l.id];
        if (!t || (t.steps || []).length !== l.steps.length || (t.checks || []).length !== l.checks.length) return;
        Object.assign(l, { title: t.title, intro: t.intro, steps: t.steps });
        l.checks.forEach((c, i) => { c.label = t.checks[i]; });
      });
    }, () => {});
  }));
  const libs = () => Promise.all([CertHub.loadScript(V + "xterm.js"), CertHub.loadScript(V + "libv86.js"), loadLabs(), loadCss(CertHub.BASE + V + "xterm.css")])
    .then(r => { if (!r[0] || !r[1] || !window.V86 || !window.Terminal) throw new Error("The VM couldn't load. Check your connection and try again."); });
  const config = () => cfgP || (cfgP = fetch(CertHub.BASE + V + "config.json").then(r => r.json()).catch(e => { cfgP = null; throw e; }));
  // The snapshot is fetched once per page visit and shared by every VM on the page.
  function snapshot(progress) {
    if (!stateP) stateP = (async () => {
      const r = await fetch(CertHub.BASE + V + "state.bin.zst");
      if (!r.ok || !r.body) throw new Error("The VM couldn't download. Check your connection and try again.");
      const total = +r.headers.get("content-length") || 0, reader = r.body.getReader(), parts = []; let got = 0;
      for (;;) { const { done, value } = await reader.read(); if (done) break; parts.push(value); got += value.length; progress && progress(got, total); }
      const out = new Uint8Array(got); let o = 0; parts.forEach(p => { out.set(p, o); o += p.length; });
      return out.buffer;
    })().catch(e => { stateP = null; throw e; });
    return stateP;
  }
  const b64 = s => btoa(unescape(encodeURIComponent(s)));
  const unb64 = s => { try { return decodeURIComponent(escape(atob(s))); } catch (e) { return ""; } };

  /* ---------- one VM ---------- */
  // Columns that fit the box, from xterm's measured character width (about 9 px at the default font).
  const cellW = t => { try { return t._core._renderService.dimensions.css.cell.width || 9; } catch (e) { return 9; } };
  const termSize = (box, rows, t) => ({ cols: Math.max(40, Math.min(160, Math.floor((box.clientWidth - 20) / cellW(t)))), rows });
  function makeVM(host, box, cfg, init, rows) {
    const hda = init.hda || new ArrayBuffer(cfg.diskMB << 20), hdb = init.hdb || new ArrayBuffer(cfg.diskMB << 20);
    const base = CertHub.BASE + V;
    const emu = new window.V86({
      wasm_path: base + "v86.wasm", memory_size: cfg.memoryMB << 20, vga_memory_size: 2 << 20,
      bios: { url: base + "seabios.bin" }, vga_bios: { url: base + "vgabios.bin" }, initial_state: { buffer: init.state },
      hda: { buffer: hda }, hdb: { buffer: hdb }, uart1: true, net_device: { type: "virtio", relay_url: "inbrowser", id: 0 },
      serial_container_xtermjs: box, autostart: true, disable_keyboard: true, disable_mouse: true, disable_speaker: true
    });
    const vm = { host, emu, hda, hdb, box, n: 0 }, pending = {}; let line = "";
    emu.add_listener("serial1-output-byte", b => {
      if (b !== 10) { if (line.length < 20000) line += String.fromCharCode(b); return; }
      const m = line.match(/^@@(\d+) (\d+) (\S*)/); line = "";
      if (m && pending[m[1]]) { pending[m[1]]({ rc: +m[2], out: unb64(m[3]) }); delete pending[m[1]]; }
    });
    // Run a command as root through the checker service (not in the learner's terminal).
    vm.run = (cmd, ms = 150000) => new Promise((res, rej) => {
      const id = String(++vm.n); pending[id] = res;
      emu.serial_send_bytes(1, new TextEncoder().encode(`${id} ${b64(cmd)}\n`));
      setTimeout(() => { if (pending[id]) { delete pending[id]; rej(new Error("The VM didn't answer.")); } }, ms);
    });
    vm.ready = new Promise(r => emu.add_listener("emulator-started", r)).then(() => new Promise(r => setTimeout(r, 300))).then(() => {
      const t = emu.serial_adapter && emu.serial_adapter.term, { cols, rows: rws } = termSize(box, rows, t);
      if (t && (t.cols !== cols || t.rows !== rws)) t.resize(cols, rws);
      const h = HOSTS[host], now = `date -s @${Math.floor(Date.now() / 1000)} >/dev/null; echo '${rws} ${cols}' > /run/vm-size; chmod 440 /etc/sudoers`; // (the saved image has 644; visudo -c wants 440)
      // A resumed save keeps its own names, addresses and session; a fresh VM gets its identity and a new login.
      return vm.run(init.saved ? `${now}; stty -F /dev/ttyS0 rows ${rws} cols ${cols}`
        : `${now}; hostname ${h.name}; echo ${h.name} > /etc/hostname; sed -i 's/^127.0.1.1.*/127.0.1.1\\t${h.name}/' /etc/hosts; ip link set eth0 down; ip link set eth0 address 02:00:0a:0a:00:${h.mac}; ip addr flush dev eth0; ip addr add ${h.ip} dev eth0; ip link set eth0 up; systemctl restart serial-getty@ttyS0`);
    });
    vm.type = text => { emu.serial0_send(text); const t = emu.serial_adapter && emu.serial_adapter.term; box.scrollIntoView({ block: "nearest" }); t && t.focus && t.focus(); };
    vm.destroy = () => { try { emu.destroy(); } catch (e) {} };
    return vm;
  }

  /* ---------- sessions ---------- */
  const status = t => { const s = $("#vmstatus"); if (s) s.textContent = t; };
  function leave() {
    if (!S) return;
    clearInterval(S.timer); Object.values(S.vms || {}).forEach(v => v.destroy());
    S = null;
  }
  // Start one or more VMs into the terminal boxes on the page (data-vmbox="host").
  async function start(hosts, opts = {}) {
    const page = location.hash;
    leave(); S = { page, vms: {}, starting: true, ...opts.session };
    const btn = $("#vmgo"); if (btn) btn.disabled = true;
    try {
      status("Loading the emulator…");
      await libs();
      const cfg = await config();
      const init = opts.init || { state: await snapshot((got, total) => status(total ? `Downloading the VM: ${Math.round(100 * got / total)}% of ${Math.round(total / 1048576)} MB` : `Downloading the VM: ${Math.round(got / 1048576)} MB`)) };
      if (!S || S.page !== page) return null;
      status("Starting…");
      document.querySelectorAll("[data-vmbox]").forEach(b => { b.hidden = false; });
      hosts.forEach(h => { const box = document.querySelector(`[data-vmbox="${h}"]`); S.vms[h] = makeVM(h, box, cfg, { ...init, state: opts.init ? init.state : init.state.slice(0) }, hosts.length > 1 ? 18 : 24); });
      await Promise.all(Object.values(S.vms).map(v => v.ready));
      if (opts.setup) await S.vms[hosts[0]].run(opts.setup);
      S.starting = false;
      status(hosts.length > 1 ? "Ready. Click in a terminal to type." : "Ready. Click in the terminal and type.");
      document.querySelectorAll("[data-vmafter]").forEach(b => { b.hidden = false; });
      return S;
    } catch (e) {
      status(e.message || "The VM couldn't start."); if (btn) btn.disabled = false;
      leave(); return null;
    }
  }

  /* ---------- saving (free practice) ---------- */
  const idb = () => new Promise((res, rej) => { const r = indexedDB.open("studytocert-vm", 1); r.onupgradeneeded = () => r.result.createObjectStore("saves"); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  const idbDo = (mode, fn) => idb().then(db => new Promise((res, rej) => { const req = fn(db.transaction("saves", mode).objectStore("saves")); req.onsuccess = () => res(req.result); req.onerror = () => rej(req.error); }));
  const gz = buf => new Response(new Blob([buf]).stream().pipeThrough(new CompressionStream("gzip"))).blob();
  const gunzip = blob => new Response(blob.stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();
  const canSave = () => typeof CompressionStream === "function" && typeof indexedDB !== "undefined";
  async function saveVM() {
    const vm = S && S.vms.lab; if (!vm || S.starting) return;
    status("Saving your VM… (the terminal pauses for a few seconds)");
    try {
      const state = await vm.emu.save_state();
      const rec = { when: Date.now(), state: await gz(state), hda: await gz(vm.hda), hdb: await gz(vm.hdb) };
      await idbDo("readwrite", s => s.put(rec, "free"));
      if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
      status(`Saved at ${new Date(rec.when).toLocaleTimeString()}. Resume it any time from this page.`);
      drawSaveInfo();
    } catch (e) { status("Saving didn't work in this browser. Your VM is still running."); }
  }
  async function resumeVM() {
    let rec; try { rec = await idbDo("readonly", s => s.get("free")); } catch (e) {}
    if (!rec) { status("There's no saved VM."); return; }
    status("Opening your saved VM…");
    try {
      const init = { saved: true, state: await gunzip(rec.state), hda: await gunzip(rec.hda), hdb: await gunzip(rec.hdb) };
      await start(["lab"], { init });
    } catch (e) { status("The saved VM couldn't be opened. You can delete it and start fresh."); }
  }
  async function drawSaveInfo() {
    const el = $("#vmsaveinfo"); if (!el || !canSave()) return;
    let rec = null; try { rec = await idbDo("readonly", s => s.get("free")); } catch (e) {}
    el.innerHTML = rec ? `<span class="note">Saved VM from ${esc(new Date(rec.when).toLocaleString())}.</span> <button type="button" class="btn ghost sm" data-vm="resume">Resume it</button> <button type="button" class="btn ghost sm" data-vm="delsave">Delete it</button>` : "";
  }

  /* ---------- offline ---------- */
  function goOffline() {
    status("Downloading the VM for offline use…");
    const done = ok => status(ok ? "The VM is saved on this device and works offline." : "The download didn't finish. Try again on a steady connection.");
    if (!("serviceWorker" in navigator)) { done(false); return; }
    // The service worker keeps the VM's files in their own cache (see tools/build.js, VM_CACHE).
    const timer = setTimeout(() => done(false), 600000);
    navigator.serviceWorker.ready.then(reg => {
      const ch = new MessageChannel(); ch.port1.onmessage = e => { clearTimeout(timer); done(!!(e.data && e.data.ok)); };
      reg.active.postMessage({ type: "cache-vm" }, [ch.port2]);
    }, () => { clearTimeout(timer); done(false); });
  }

  /* ---------- views ---------- */
  const labs = () => (CertHub.vmLabs && CertHub.vmLabs.labs) || [];
  const done = () => store.get(LABS_KEY, {});
  const certName = id => (CertHub.certs[id] && CertHub.certs[id].short) || id;
  const terms = hosts => `<div class="vmterms${hosts.length > 1 ? " two" : ""}">${hosts.map(h => `<div class="vmcol">${hosts.length > 1 ? `<p class="vmhost"><strong>${esc(h)}</strong> <span class="note">${esc(HOSTS[h].ip.replace("/24", ""))}</span></p>` : ""}<div class="vmterm" data-vmbox="${esc(h)}" hidden></div></div>`).join("")}</div>`;
  const facts = `<div class="panel vminfo"><ul class="clean">
      <li>You're logged in as <code>student</code> (password <code>student</code>) with <code>sudo</code>. The root password is <code>root</code>.</li>
      <li>Real Ubuntu 24.04 tools with systemd, SSH, iptables, LVM, cron and two empty disks (<code>/dev/sda</code>, <code>/dev/sdb</code>).</li>
      <li>It all runs on your device. Nothing you type is sent anywhere, and the VMs have no internet access.</li>
      <li>The first start downloads about 40 MB (then it's cached). A computer with 4 GB of memory or more works best.</li>
    </ul></div>`;

  const labGrid = (list, d) => `<div class="labgrid">${list.map(l => `<a class="labcard" href="#vm-lab-${esc(l.id)}"><span class="labtop"><span class="chip">${l.mode === "network" ? "2 VMs" : "1 VM"}</span>${d[l.id] ? `<span class="chip done">Done</span>` : ""}</span><strong>${esc(l.title)}</strong><span class="note">${esc(l.level)} · about ${esc(l.minutes)} min · ${esc(l.certs.map(certName).join(", "))}</span></a>`).join("")}</div>`;

  function hubView() {
    const d = done(), best = store.get(EXAM_KEY, {}).best;
    return `<p class="crumbs"><a href="#labs">Labs</a> / Practice VMs</p>
    <h1>Practice VMs</h1>
    <p class="meta">Real Linux servers in your browser for Linux+, RHCSA, A+, Server+, Security+, CySA+ and Network+: free practice, two networked machines, graded admin and blue-team labs, and a timed exam. Nothing to install.</p>
    ${facts}
    <h2>Free practice</h2>
    <div class="btns"><button type="button" class="btn" data-vm="free" id="vmgo">Start a VM</button><button type="button" class="btn ghost" data-vm="save" data-vmafter hidden>Save my VM</button><button type="button" class="btn ghost" data-vm="restart" data-vmafter hidden>Start fresh</button></div>
    <p id="vmsaveinfo"></p>
    <p class="note" id="vmstatus" role="status" aria-live="polite"></p>
    ${terms(["lab"])}
    <h2>Two networked machines</h2>
    <div class="panel installcard vmcard"><div class="grow"><strong>server and client on one network</strong><br><span class="note">Practice SSH, firewalls, web servers and troubleshooting between two machines.</span></div><a class="btn sm" href="#vm-net">Open</a></div>
    <h2>Admin labs</h2>
    <p class="note">Each lab starts a fresh VM, walks you through a real admin task and checks your work inside the machine. ${Object.keys(d).length} of ${labs().length} done.</p>
    ${labGrid(labs().filter(l => l.group !== "blue"), d)}
    <h2>Blue-team labs</h2>
    <p class="note">Defend a server: investigate an attack in the logs, harden SSH, check file integrity, audit sudo rights and permissions, and remove an unknown listener. Each scenario is staged in the VM for you.</p>
    ${labGrid(labs().filter(l => l.group === "blue"), d)}
    <h2>VM exam</h2>
    <div class="panel installcard vmcard"><div class="grow"><strong>Timed performance exam</strong><br><span class="note">${CertHub.vmLabs ? `${esc(CertHub.vmLabs.exam.tasks)} random admin tasks in ${esc(CertHub.vmLabs.exam.minutes)} minutes, scored inside the VM.` : "Random admin tasks against the clock, scored inside the VM."}${best != null ? ` Your best: ${esc(best)}%.` : ""}</span></div><a class="btn sm" href="#vm-exam">Take the exam</a></div>
    <h2>Use it offline</h2>
    <p class="note">Download the VM once and it keeps working without a connection. <button type="button" class="btn ghost sm" data-vm="offline">Download for offline use</button></p>
    <p class="note">Built from Ubuntu 24.04 packages and the v86 emulator. <a href="${V}NOTICE.txt">Open-source notice</a> · <a href="${V}SOURCES.txt">Package versions</a></p>`;
  }
  function netView() {
    return `<p class="crumbs"><a href="#vm">Practice VMs</a> / Two networked machines</p>
    <h1>Two networked machines</h1>
    <p class="meta"><strong>server</strong> (10.10.0.10) and <strong>client</strong> (10.10.0.20) share a private network. Try <code>ping server</code>, <code>ssh student@server</code>, <code>ss -tlnp</code>, <code>sudo iptables -L</code> or <code>busybox httpd</code>. This uses about twice the memory of one VM.</p>
    <div class="btns"><button type="button" class="btn" data-vm="pair" id="vmgo">Start both machines</button><button type="button" class="btn ghost" data-vm="restart" data-vmafter hidden>Start fresh</button></div>
    <p class="note" id="vmstatus" role="status" aria-live="polite"></p>
    ${terms(["server", "client"])}`;
  }
  // Inline code in lab steps becomes a button that types it into the right machine ("On client: ..." steps).
  const stepHtml = (s, lab) => {
    const host = lab.mode === "network" ? (/^(On|En) client:/i.test(s) ? "client" : "server") : "lab";
    return esc(s).replace(/`([^`\n]+)`/g, (m, c) => `<button type="button" class="vmcode" data-vmtype="${/* html: already escaped by esc(s) */ c}" data-vmhost="${host}" title="Type it into ${host}">${/* html: already escaped by esc(s) */ c}</button>`);
  };
  function labView(lab) {
    const hosts = lab.mode === "network" ? ["server", "client"] : ["lab"], d = done()[lab.id];
    return `<p class="crumbs"><a href="#vm">Practice VMs</a> / Graded lab</p>
    <h1>${esc(lab.title)}</h1>
    <p class="meta">${esc(lab.level)} · about ${esc(lab.minutes)} minutes · ${lab.mode === "network" ? "2 VMs" : "1 VM"} · ${esc(lab.certs.map(certName).join(", "))}${d ? ` · <span class="chip done">Done</span>` : ""}</p>
    <p class="lede">${inline(lab.intro)}</p>
    <h2>Steps</h2>
    <ol class="vmsteps">${lab.steps.map(s => `<li>${stepHtml(s, lab)}</li>`).join("")}</ol>
    <p class="note">Tip: click a command to type it into the terminal, then press Enter. You don't have to follow the steps exactly; the checks look at the result.</p>
    <div class="btns"><button type="button" class="btn" data-vm="lab" id="vmgo">Start the lab</button><button type="button" class="btn" data-vm="check" data-vmafter hidden>Check my work</button><button type="button" class="btn ghost" data-vm="restart" data-vmafter hidden>Start over</button></div>
    <p class="note" id="vmstatus" role="status" aria-live="polite"></p>
    <div id="vmresults" aria-live="polite"></div>
    ${terms(hosts)}`;
  }
  function examIntro() {
    const ex = CertHub.vmLabs.exam, r = store.get(EXAM_KEY, {});
    return `<p class="crumbs"><a href="#vm">Practice VMs</a> / VM exam</p>
    <h1>VM exam</h1>
    <p class="meta">${esc(ex.tasks)} admin tasks picked at random, ${esc(ex.minutes)} minutes, one VM. Like the performance-based parts of Linux+ and RHCSA: no step-by-step hints, and every task is checked inside the machine when you submit. ${esc(ex.pass)}% passes.</p>
    ${r.last ? `<p class="note">Last attempt: ${esc(r.last.score)}% on ${esc(new Date(r.last.when).toLocaleDateString())}. Best: ${esc(r.best)}%.</p>` : ""}
    <div class="btns"><button type="button" class="btn" data-vm="exam" id="vmgo">Start the exam</button></div>
    <p class="note" id="vmstatus" role="status" aria-live="polite"></p>
    <div id="vmexam"></div>
    ${terms(["lab"])}`;
  }
  const clock = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  function examPanel() {
    const e = S.exam, left = Math.max(0, Math.round((e.end - Date.now()) / 1000));
    return `<div class="panel"><div class="flex"><strong>Tasks</strong><span class="timer" aria-label="Time left">${clock(left)}</span></div>
      <ol class="vmsteps">${e.labs.map(l => `<li><strong>${esc(l.title)}.</strong> ${inline(l.intro)}</li>`).join("")}</ol>
      <div class="btns"><button type="button" class="btn" data-vm="submit">Submit the exam</button></div></div>`;
  }

  async function runChecks(lab) {
    const out = [];
    for (const c of lab.checks) {
      const vm = S.vms[c.vm || (lab.mode === "network" ? "server" : "lab")];
      let ok = false; try { ok = (await vm.run(c.cmd, 60000)).rc === 0; } catch (e) {}
      out.push({ c, ok });
    }
    return out;
  }
  async function checkLab(lab) {
    if (!S || S.starting) return;
    const box = $("#vmresults"); status("Checking your work…");
    const res = await runChecks(lab); if (!S) return;
    const passed = res.filter(r => r.ok).length, all = passed === res.length;
    box.innerHTML = `<div class="panel" data-style="--c:${all ? "var(--ok)" : "var(--warn)"}"><p><strong>${all ? "Lab complete. Nice work." : `${passed} of ${res.length} checks pass.`}</strong></p><ul class="checks">${res.map(r => `<li class="${r.ok ? "ok" : "no"}"><span aria-hidden="true">${r.ok ? "✓" : "✗"}</span> ${esc(r.c.label)}<span class="sr-only">${r.ok ? " (passed)" : " (not yet)"}</span></li>`).join("")}</ul></div>`;
    status(all ? "All checks pass." : "Keep going, then check again.");
    CertHub.activity.mark();
    if (all) { const d = done(); d[lab.id] = { when: Date.now() }; store.set(LABS_KEY, d); }
  }
  async function submitExam() {
    if (!S || !S.exam || S.exam.submitted) return;
    S.exam.submitted = true; clearInterval(S.timer);
    const box = $("#vmexam"); status("Scoring your exam inside the VM…");
    let got = 0, total = 0; const rows = [];
    for (const lab of S.exam.labs) {
      const res = await runChecks(lab); if (!S) return;
      const scored = res.filter(r => !r.c.keep), p = scored.filter(r => r.ok).length;
      got += p; total += scored.length; rows.push({ lab, p, n: scored.length, res });
    }
    const score = total ? Math.round(100 * got / total) : 0, pass = score >= CertHub.vmLabs.exam.pass;
    const r = store.get(EXAM_KEY, {}); r.last = { score, when: Date.now() }; r.best = Math.max(r.best || 0, score); store.set(EXAM_KEY, r);
    CertHub.activity.mark();
    box.innerHTML = `<div class="panel" data-style="--c:${pass ? "var(--ok)" : "var(--bad)"}"><div class="big">${score}%</div><p class="meta">${pass ? "Pass." : "Not a pass yet."} ${got} of ${total} checks across ${rows.length} tasks.</p>
      ${rows.map(x => `<h3>${esc(x.lab.title)} <small class="note">${esc(x.p)}/${esc(x.n)}</small></h3><ul class="checks">${x.res.filter(r => !r.c.keep || !r.ok).map(r => `<li class="${r.ok ? "ok" : "no"}"><span aria-hidden="true">${r.ok ? "✓" : "✗"}</span> ${esc(r.c.label)}</li>`).join("")}</ul><p class="note"><a href="#vm-lab-${esc(x.lab.id)}">Practice this lab</a></p>`).join("")}
      <div class="btns"><button type="button" class="btn" data-vm="exam">Take another exam</button></div></div>`;
    status("Exam scored. The VM stays open so you can look around.");
  }

  function show(head) {
    leave();
    const app = $("#app");
    const draw = () => {
      if (head === "vm") { app.innerHTML = hubView(); drawSaveInfo(); return "Practice VMs"; }
      if (head === "vm-net") { app.innerHTML = netView(); return "Two Networked Machines"; }
      if (head === "vm-exam") { app.innerHTML = examIntro(); return "VM Exam"; }
      const lab = labs().find(l => "vm-lab-" + l.id === head);
      if (lab) { app.innerHTML = labView(lab); return lab.title; }
      app.innerHTML = `<p class="meta">That lab doesn't exist. <a href="#vm">All practice VMs</a></p>`; return "Practice VMs";
    };
    if (CertHub.vmLabs) return draw();
    app.innerHTML = `<p class="meta" role="status">Loading…</p>`;
    loadLabs().then(() => { if (location.hash === "#" + head) document.title = `${draw()} · StudyToCert`; });
    return "Practice VMs";
  }

  document.addEventListener("click", e => {
    const t = e.target.closest("[data-vm],[data-vmtype]"); if (!t || !document.querySelector("[data-vmbox]")) return;
    const head = location.hash.slice(1), lab = labs().find(l => "vm-lab-" + l.id === head);
    if (t.dataset.vmtype != null) {
      const vm = S && S.vms[t.dataset.vmhost] || (S && Object.values(S.vms)[0]);
      if (!vm || S.starting) { status("Start the VM first, then click the command again."); return; }
      vm.type(t.dataset.vmtype); return;
    }
    const a = t.dataset.vm;
    if (a === "free") start(["lab"]);
    if (a === "pair") start(["server", "client"]);
    if (a === "lab" && lab) { $("#vmresults").innerHTML = ""; start(lab.mode === "network" ? ["server", "client"] : ["lab"], { setup: lab.setup }); }
    if (a === "check" && lab) checkLab(lab);
    if (a === "restart") { const hosts = Object.keys((S && S.vms) || {}); if (hosts.length) { const r = $("#vmresults"); if (r) r.innerHTML = ""; start(hosts, { setup: lab && lab.setup }); } }
    if (a === "save") saveVM();
    if (a === "resume") resumeVM();
    if (a === "delsave") idbDo("readwrite", s => s.delete("free")).then(() => { status("Saved VM deleted."); drawSaveInfo(); }, () => {});
    if (a === "offline") goOffline();
    if (a === "submit") submitExam();
    if (a === "exam") {
      const ex = CertHub.vmLabs.exam, pool = ex.pool.map(id => labs().find(l => l.id === id)).filter(Boolean);
      const pick = U.shuffle(pool).slice(0, ex.tasks), setup = pick.map(l => l.setup).filter(Boolean).join("; ");
      $("#vmexam").innerHTML = "";
      start(["lab"], { setup: setup || undefined, session: { exam: { labs: pick, end: 0 } } }).then(s => {
        if (!s || !s.exam) return;
        s.exam.end = Date.now() + ex.minutes * 60000;
        $("#vmexam").innerHTML = examPanel();
        s.timer = setInterval(() => { if (!S || !S.exam) return; const el = document.querySelector("#vmexam .timer"); if (el) el.textContent = clock(Math.max(0, Math.round((S.exam.end - Date.now()) / 1000))); if (Date.now() >= S.exam.end) submitExam(); }, 1000);
      });
    }
  });

  CertHub.vm = { show, leave, session: () => S };
})();
