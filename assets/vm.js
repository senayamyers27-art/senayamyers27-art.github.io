/* Practice VM (#vm): a real Linux (Ubuntu 24.04 tools on a small 32-bit kernel) running in the page with the
   v86 emulator. Everything runs on the learner's device: no server, no internet inside the VM, and it resets
   when the page is left. Files: vendor/vm/ (built by tools/vm/build-vm.sh). Loaded on demand by app.js. */
(function () {
  const { U } = CertHub;
  const { $, esc } = U;
  const V = "vendor/vm/";
  let emu = null, booted = false, starting = false;

  // Short guided exercises. "Type it" sends the command to the VM, so learners can see it run.
  const TASKS = [
    ["Who am I and what can I do?", ["whoami; id", "sudo -l", "cat /etc/os-release"]],
    ["Users and groups", ["sudo useradd -m -s /bin/bash alex", "sudo passwd alex", "sudo groupadd devs && sudo usermod -aG devs alex", "id alex; getent group devs"]],
    ["Permissions", ["mkdir -p ~/share && touch ~/share/report.txt", "chmod 640 ~/share/report.txt && ls -l ~/share", "sudo chown alex:devs ~/share/report.txt && ls -l ~/share", "umask"]],
    ["Processes", ["ps aux --sort=-%mem | head", "sleep 300 & jobs", "pgrep -a sleep", "kill %1; jobs"]],
    ["Scheduled jobs", ["crontab -l", "(echo '*/5 * * * * date >> ~/cron.log') | crontab -", "crontab -l"]],
    ["Storage", ["dd if=/dev/zero of=~/disk.img bs=1M count=16", "LOOP=$(sudo losetup -f --show ~/disk.img); echo $LOOP", "sudo mkfs.ext2 -q $LOOP && sudo mkdir -p /data && sudo mount $LOOP /data", "df -h /data; lsblk"]],
    ["Logs and the network", ["tail -n 20 /var/log/syslog", "sudo grep -i sudo /var/log/syslog | tail -5", "ip addr; ip route", "ss -tulpn"]]
  ];

  function view() {
    return `<p class="crumbs"><a href="#labs">Labs</a> / Practice VM</p>
    <h1>Practice VM</h1>
    <p class="meta">A real Linux machine in your browser: Ubuntu 24.04 command-line tools on a Linux 6.8 kernel. Practice users, permissions, processes, cron, storage and logs for Linux+, RHCSA, A+ and Server+, with nothing to install.</p>
    <div class="panel vminfo"><ul class="clean">
      <li>You're logged in as <code>student</code> (password <code>student</code>) and can use <code>sudo</code>. The root password is <code>root</code>.</li>
      <li>It runs entirely on your device. Nothing you type is sent anywhere, and the VM has no internet access.</li>
      <li>The first start downloads about 17 MB, so wait for Wi-Fi if you're on mobile data. Starting takes 10 to 30 seconds. A computer works best.</li>
      <li>The VM resets when you leave this page or reload it, so copy anything you want to keep.</li>
    </ul></div>
    <div class="btns"><button type="button" class="btn" data-vm="start" id="vmstart">Start the VM</button><button type="button" class="btn ghost" data-vm="restart" id="vmrestart" hidden>Restart</button></div>
    <p class="note" id="vmstatus" role="status" aria-live="polite"></p>
    <div class="vmterm" id="vmterm" hidden></div>
    <h2>Things to try</h2>
    <p class="note">Press <strong>Type it</strong> to send a command to the VM, then press Enter in the terminal to run it. Or type your own.</p>
    ${TASKS.map(([t, cmds]) => `<details class="panel vmtask"><summary><strong>${esc(t)}</strong></summary><ul class="clean">${cmds.map(c => `<li class="vmcmd"><code>${esc(c)}</code> <button type="button" class="btn ghost sm" data-vmtype="${esc(c)}">Type it</button></li>`).join("")}</ul></details>`).join("")}
    <p class="note">Built from Ubuntu 24.04 packages and the v86 emulator. <a href="${V}NOTICE.txt">Open-source notice</a> · <a href="${V}SOURCES.txt">Package versions</a></p>`;
  }

  const status = t => { const s = $("#vmstatus"); if (s) s.textContent = t; };
  const loadCss = href => new Promise(res => { if (document.querySelector(`link[href="${href}"]`)) return res(); const l = document.createElement("link"); l.rel = "stylesheet"; l.href = href; l.onload = l.onerror = () => res(); document.head.appendChild(l); });

  function start() {
    if (emu || starting) return;
    starting = true;
    const btn = $("#vmstart"); if (btn) btn.disabled = true;
    status("Loading the emulator…");
    Promise.all([CertHub.loadScript(V + "xterm.js"), CertHub.loadScript(V + "libv86.js"), loadCss(CertHub.BASE + V + "xterm.css")]).then(([a, b]) => {
      starting = false;
      if (!a || !b || !window.V86 || !window.Terminal) { status("The VM couldn't load. Check your connection and try again."); if (btn) btn.disabled = false; return; }
      if (!$("#vmterm")) return; // left the page while loading
      const box = $("#vmterm"); box.hidden = false;
      const base = CertHub.BASE + V, { cols, rows } = termSize(box);
      emu = new window.V86({
        wasm_path: base + "v86.wasm", memory_size: 256 * 1024 * 1024, vga_memory_size: 2 * 1024 * 1024,
        bios: { url: base + "seabios.bin" }, vga_bios: { url: base + "vgabios.bin" },
        bzimage: { url: base + "bzImage" }, initrd: { url: base + "initrd.img" },
        // The login profile reads vmrows/vmcols to size the terminal (tools/vm/overlay/etc/profile.d/vm.sh).
        cmdline: `console=ttyS0 quiet tsc=reliable random.trust_cpu=on vmrows=${rows} vmcols=${cols}`,
        serial_container_xtermjs: box, disable_keyboard: true, disable_mouse: true, disable_speaker: true, autostart: true
      });
      emu.add_listener("download-progress", e => { if (e && e.total) status(`Downloading ${Math.round(100 * e.loaded / e.total)}% (${e.file_name ? e.file_name.split("/").pop() : "files"})…`); });
      emu.add_listener("emulator-started", () => status("Starting Linux…"));
      let tail = "";
      emu.add_listener("serial0-output-byte", b => {
        if (booted) return;
        tail = (tail + String.fromCharCode(b)).slice(-40);
        if (/student@lab:~\$ $/.test(tail.replace(/\x1b\[[0-9;?]*[a-zA-Z]|\x1b\][^\x07]*\x07/g, ""))) {
          booted = true; status("Ready. Click in the terminal and type.");
          const r = $("#vmrestart"); if (r) r.hidden = false;
          fitTerm();
        }
      });
    });
  }
  // The terminal keeps the size it had at start (the guest is told at boot); about 8.4 px per character.
  const termSize = box => ({ cols: Math.max(40, Math.min(160, Math.floor((box.clientWidth - 16) / 8.4))), rows: 26 });
  function fitTerm() {
    const a = emu && emu.serial_adapter, t = a && a.term, box = $("#vmterm");
    if (!t || !box) return;
    const { cols, rows } = termSize(box);
    if (t.cols !== cols || t.rows !== rows) t.resize(cols, rows);
    t.focus && t.focus();
  }

  function leave() {
    if (emu) { try { emu.destroy(); } catch (e) {} }
    emu = null; booted = false; starting = false;
  }

  document.addEventListener("click", e => {
    const b = e.target.closest("[data-vm],[data-vmtype]"); if (!b || !$("#vmterm")) return;
    if (b.dataset.vm === "start") start();
    if (b.dataset.vm === "restart" && emu) { booted = false; status("Restarting…"); emu.restart(); }
    if (b.dataset.vmtype != null) {
      if (!emu) { start(); status("Start the VM first, then press Type it again."); return; }
      if (!booted) { status("Wait for the VM to finish starting."); return; }
      emu.serial0_send(b.dataset.vmtype);
      const box = $("#vmterm"); box.scrollIntoView({ block: "nearest", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      const t = emu.serial_adapter && emu.serial_adapter.term; t && t.focus && t.focus();
    }
  });

  CertHub.vm = { view, leave, emulator: () => emu };
})();
