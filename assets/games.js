/* Quick games (#games, #game-<id>): 60-second rounds of multiple choice on facts worth knowing cold.
   Subnetting questions are generated and checked by calculation; ports, acronyms and OSI layers come from
   the fixed lists below. Best scores stay in this browser (certhub:games). Loaded on first visit to a game page. */
(function () {
  const { U, store, ui } = CertHub;
  const { $, esc } = U;
  const KEY = "certhub:games", ROUND = 60;
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  // Four options: the answer plus three different wrong ones.
  const options = (answer, pool) => shuffle([answer, ...shuffle([...new Set(pool.filter(x => x !== answer))]).slice(0, 3)]);

  /* ---------- subnetting (computed) ---------- */
  const ip = n => [24, 16, 8, 0].map(s => (n >>> s) & 255).join(".");
  const maskOf = p => p === 0 ? 0 : (0xFFFFFFFF << (32 - p)) >>> 0;
  function subnetQ() {
    const kind = pick(["hosts", "mask", "network", "broadcast"]);
    if (kind === "hosts") {
      const p = 16 + Math.floor(Math.random() * 15); // /16 to /30
      const hosts = n => Math.pow(2, 32 - n) - 2;
      const a = hosts(p);
      return { q: `How many usable host addresses are in a /${p} network?`, a: String(a), o: options(String(a), [p - 1, p + 1, p - 2, p + 2].filter(n => n >= 8 && n <= 30).map(n => String(hosts(n))).concat(String(a + 2), String(Math.pow(2, 32 - p)))) };
    }
    if (kind === "mask") {
      const p = 8 + Math.floor(Math.random() * 23); // /8 to /30
      const a = ip(maskOf(p));
      return { q: `Which subnet mask is /${p}?`, a, o: options(a, [p - 1, p + 1, p - 2, p + 2, p + 8, p - 8].filter(n => n >= 1 && n <= 32).map(n => ip(maskOf(n)))) };
    }
    const p = 20 + Math.floor(Math.random() * 11); // /20 to /30
    const base = pick([[10, 0, 0, 0], [172, 16, 0, 0], [192, 168, 0, 0]]);
    const addr = ((base[0] << 24) | (base[1] << 16) | (Math.floor(Math.random() * 256) << 8) | Math.floor(Math.random() * 256)) >>> 0;
    const net = (addr & maskOf(p)) >>> 0, bc = (net | (~maskOf(p) >>> 0)) >>> 0, size = Math.pow(2, 32 - p);
    const wrong = [net + size, net - size, bc, net + 1, bc - 1, (addr & maskOf(p - 1)) >>> 0, (addr & maskOf(Math.min(30, p + 1))) >>> 0].map(n => ip(n >>> 0));
    if (kind === "network") { const a = ip(net); return { q: `What is the network address of ${ip(addr)}/${p}?`, a, o: options(a, wrong) }; }
    const a = ip(bc);
    return { q: `What is the broadcast address of ${ip(addr)}/${p}?`, a, o: options(a, [net, bc + 1, bc - 1, bc + size, net + size - 2, (addr | (~maskOf(Math.min(30, p + 1)) >>> 0)) >>> 0].map(n => ip(n >>> 0))) };
  }

  /* ---------- well-known ports ---------- */
  const PORTS = [
    ["20/21", "FTP"], ["22", "SSH and SFTP"], ["23", "Telnet"], ["25", "SMTP"], ["53", "DNS"], ["67/68", "DHCP"], ["69", "TFTP"],
    ["80", "HTTP"], ["88", "Kerberos"], ["110", "POP3"], ["123", "NTP"], ["137-139", "NetBIOS"], ["143", "IMAP"], ["161/162", "SNMP"],
    ["389", "LDAP"], ["443", "HTTPS"], ["445", "SMB"], ["514", "Syslog"], ["587", "SMTP submission"], ["636", "LDAPS"],
    ["993", "IMAPS"], ["995", "POP3S"], ["1433", "Microsoft SQL Server"], ["3306", "MySQL"], ["3389", "RDP"], ["5060/5061", "SIP"]
  ];
  function portQ() {
    const [port, svc] = pick(PORTS);
    return Math.random() < .5
      ? { q: `Which service uses port ${port}?`, a: svc, o: options(svc, PORTS.map(p => p[1])) }
      : { q: `Which port does ${svc} use by default?`, a: port, o: options(port, PORTS.map(p => p[0])) };
  }

  /* ---------- acronyms ---------- */
  const ACRONYMS = [
    ["AAA", "Authentication, authorization and accounting"], ["ACL", "Access control list"], ["AES", "Advanced Encryption Standard"],
    ["APT", "Advanced persistent threat"], ["BYOD", "Bring your own device"], ["CIA", "Confidentiality, integrity and availability"],
    ["CVE", "Common Vulnerabilities and Exposures"], ["CVSS", "Common Vulnerability Scoring System"], ["DLP", "Data loss prevention"],
    ["DMZ", "Demilitarized zone (screened subnet)"], ["EDR", "Endpoint detection and response"], ["HIDS", "Host-based intrusion detection system"],
    ["IAM", "Identity and access management"], ["IDS", "Intrusion detection system"], ["IPS", "Intrusion prevention system"],
    ["MFA", "Multifactor authentication"], ["MTTR", "Mean time to repair (or recover)"], ["NAC", "Network access control"],
    ["NAT", "Network address translation"], ["PKI", "Public key infrastructure"], ["RBAC", "Role-based access control"],
    ["RPO", "Recovery point objective"], ["RTO", "Recovery time objective"], ["SIEM", "Security information and event management"],
    ["SLA", "Service-level agreement"], ["SOAR", "Security orchestration, automation and response"], ["SOC", "Security operations center"],
    ["SSO", "Single sign-on"], ["TLS", "Transport Layer Security"], ["VLAN", "Virtual local area network"], ["VPN", "Virtual private network"],
    ["WAF", "Web application firewall"], ["XDR", "Extended detection and response"], ["ZTNA", "Zero trust network access"]
  ];
  function acronymQ() {
    const [ab, full] = pick(ACRONYMS);
    return Math.random() < .6
      ? { q: `What does ${ab} stand for?`, a: full, o: options(full, ACRONYMS.map(x => x[1])) }
      : { q: `Which acronym means "${full}"?`, a: ab, o: options(ab, ACRONYMS.map(x => x[0])) };
  }

  /* ---------- OSI layers ---------- */
  const LAYERS = ["1 Physical", "2 Data link", "3 Network", "4 Transport", "5 Session", "6 Presentation", "7 Application"];
  const OSI = [
    ["Cables, connectors and bits on the wire", 1], ["A hub", 1], ["Fiber-optic signaling", 1],
    ["MAC addresses", 2], ["A switch forwarding frames", 2], ["Ethernet frames", 2], ["VLAN tags (802.1Q)", 2],
    ["IP addresses", 3], ["A router choosing a path", 3], ["ICMP (ping)", 3], ["Packets", 3],
    ["TCP", 4], ["UDP", 4], ["Port numbers", 4], ["Segments", 4],
    ["Setting up, managing and ending sessions between applications", 5],
    ["Translating data formats, such as character encoding", 6],
    ["HTTP", 7], ["DNS", 7], ["SMTP", 7], ["FTP", 7]
  ];
  function osiQ() {
    const [thing, n] = pick(OSI);
    return { q: `Which OSI layer? ${thing}`, a: LAYERS[n - 1], o: options(LAYERS[n - 1], LAYERS) };
  }

  /* ---------- commands: what each one does (Linux, Windows PowerShell and cmd, Cisco IOS) ---------- */
  const COMMANDS = [
    ["ls -la", "List all files, including hidden ones, with details (Linux)"], ["chmod 640 file", "Set permissions to owner read/write, group read (Linux)"],
    ["chown alice:devs file", "Change a file's owner and group (Linux)"], ["ps aux", "List every running process (Linux)"],
    ["ss -ltnp", "Show listening TCP ports and the programs using them (Linux)"], ["journalctl -u ssh", "Show the log for one systemd service (Linux)"],
    ["systemctl enable --now nginx", "Start a service and make it start at boot (Linux)"], ["grep -r error /var/log", "Search files under a folder for text (Linux)"],
    ["tail -f /var/log/syslog", "Follow a log file as new lines arrive (Linux)"], ["df -h", "Show free disk space in readable units (Linux)"],
    ["sudo -l", "List the commands you may run with sudo (Linux)"], ["dig example.com MX", "Look up a domain's mail server records (Linux)"],
    ["ipconfig /all", "Show full IP settings for every adapter (Windows)"], ["ipconfig /flushdns", "Clear the local DNS cache (Windows)"],
    ["netstat -ano", "Show connections and listening ports with process IDs (Windows)"], ["tracert 8.8.8.8", "Show each router on the path to an address (Windows)"],
    ["gpupdate /force", "Reapply Group Policy now (Windows)"], ["sfc /scannow", "Check and repair protected system files (Windows)"],
    ["Get-Service", "List services and their status (PowerShell)"], ["Get-Process", "List running processes (PowerShell)"],
    ["Get-LocalUser", "List local user accounts (PowerShell)"], ["Get-WinEvent -LogName Security", "Read events from the Security log (PowerShell)"],
    ["Test-NetConnection host -Port 443", "Check whether a TCP port on a host answers (PowerShell)"], ["Get-ExecutionPolicy", "Show whether scripts are allowed to run (PowerShell)"],
    ["show ip interface brief", "List interfaces with their IP address and up/down status (Cisco IOS)"], ["show running-config", "Show the configuration in use now (Cisco IOS)"],
    ["copy running-config startup-config", "Save the current configuration so it survives a reboot (Cisco IOS)"], ["show vlan brief", "List VLANs and the ports in each (Cisco IOS)"],
    ["show ip route", "Show the routing table (Cisco IOS)"], ["show mac address-table", "Show which MAC addresses were learned on which ports (Cisco IOS)"],
    ["switchport mode access", "Make a switch port carry a single VLAN (Cisco IOS)"], ["show cdp neighbors", "List directly connected Cisco devices (Cisco IOS)"]
  ];
  function commandQ() {
    const [cmd, what] = pick(COMMANDS);
    return Math.random() < .5
      ? { q: `What does \`${cmd}\` do?`, a: what, o: options(what, COMMANDS.map(c => c[1])) }
      : { q: `Which command does this? ${what}`, a: cmd, o: options(cmd, COMMANDS.map(c => c[0])) };
  }

  const GAMES = [
    { id: "subnet", name: "Subnet sprint", blurb: "Usable hosts, masks, network and broadcast addresses.", icon: "network", make: subnetQ, certs: "Network+, CCNA, Security+" },
    { id: "ports", name: "Port match", blurb: "Well-known ports and the services that use them.", icon: "sysadmin", make: portQ, certs: "Network+, Security+, A+" },
    { id: "acronyms", name: "Acronym rush", blurb: "Security and networking acronyms, both ways.", icon: "cybersecurity", make: acronymQ, certs: "Security+, CySA+, ISC2 CC" },
    { id: "commands", name: "Command match", blurb: "Linux, Windows, PowerShell and Cisco IOS commands and what they do.", icon: "software", make: commandQ, certs: "Linux+, A+, CCNA, Security+" },
    { id: "osi", name: "OSI stack", blurb: "Which layer each device, protocol and unit belongs to.", icon: "data-ai", make: osiQ, certs: "Network+, A+, CCST" }
  ];
  const byId = id => GAMES.find(g => g.id === id);

  const scores = () => { try { const s = JSON.parse(store.get(KEY) || "{}"); return s && typeof s === "object" ? s : {}; } catch (e) { return {}; } };
  const saveScore = (id, score) => { const s = scores(), prev = s[id] || { best: 0, plays: 0 }; s[id] = { best: Math.max(prev.best || 0, score), plays: (prev.plays || 0) + 1, last: Date.now() }; store.set(KEY, JSON.stringify(s)); return score > (prev.best || 0) && prev.plays > 0; };

  function hub() {
    const s = scores();
    return `<p class="crumbs"><a href="#labs">Labs</a> / Games</p><h1>Quick games</h1>
      <p class="meta">Sixty seconds of rapid-fire questions on the facts exams expect you to know cold. Play one while the kettle boils. Use the number keys 1 to 4 to answer.</p>
      <div class="cards gamegrid">${GAMES.map(g => `<a class="card gamecard" href="#game-${esc(g.id)}"><span class="trackico">${CertHub.fx.icon(g.icon)}</span><h2>${esc(g.name)}</h2><p>${esc(g.blurb)}</p>
        <div class="cardfoot"><span>${esc(g.certs)}</span><span>${s[g.id] ? `Best: <strong>${esc(s[g.id].best)}</strong>` : "Not played yet"}</span></div></a>`).join("")}</div>`;
  }

  let G = null; // the round in progress
  function stop() { if (G) { clearInterval(G.timer); G = null; } }
  function intro(g) {
    const s = scores()[g.id];
    return `<p class="crumbs"><a href="#labs">Labs</a> / <a href="#games">Games</a> / ${esc(g.name)}</p><h1>${esc(g.name)}</h1>
      <p class="meta">${esc(g.blurb)} As many as you can in ${ROUND} seconds. A wrong answer costs 3 seconds.</p>
      ${s ? `<p class="note">Your best: <strong>${esc(s.best)}</strong> · played ${esc(s.plays)} time${s.plays === 1 ? "" : "s"}</p>` : ""}
      <div class="btns"><button type="button" class="btn" data-game="start">Start</button><a class="btn ghost" href="#games">All games</a></div>`;
  }
  function questionHtml() {
    const q = G.q;
    return `<div class="gamebar"><span>Score <strong id="gscore">${esc(G.score)}</strong>${G.combo > 2 ? ` <span class="chip" data-style="--c:var(--ok)">${esc(G.combo)} in a row</span>` : ""}</span><span class="timer" id="gtime" aria-label="Seconds left">${esc(G.left)}</span></div>
      <div class="track gametrack" aria-hidden="true"><i id="gtrack" data-style="width:${Math.round(100 * G.left / ROUND)}%"></i></div>
      <div class="panel"><p class="qtext" id="gq">${esc(q.q)}</p><div class="opts">${q.o.map((o, k) => `<button type="button" class="opt" data-gopt="${k}"><span class="key" aria-hidden="true">${k + 1}</span> ${esc(o)}</button>`).join("")}</div></div>
      <p class="note" id="gfeed" role="status" aria-live="polite"></p>`;
  }
  function next() { G.q = G.g.make(); G.locked = false; $("#gamebox").innerHTML = questionHtml(); const b = document.querySelector("[data-gopt]"); if (b) b.focus({ preventScroll: true }); }
  function tick() {
    if (!G) return;
    G.left = Math.max(0, ROUND - Math.floor((Date.now() - G.t0) / 1000) - G.penalty);
    const t = $("#gtime"), tr = $("#gtrack");
    if (!t) return stop();
    t.textContent = G.left; if (tr) tr.style.width = Math.round(100 * G.left / ROUND) + "%";
    if (G.left <= 0) finish();
  }
  function start(g) {
    stop();
    G = { g, score: 0, asked: 0, combo: 0, penalty: 0, t0: Date.now(), left: ROUND, q: null, locked: false, misses: [] };
    G.timer = setInterval(tick, 250);
    next();
  }
  function answer(k) {
    if (!G || G.done || G.locked || !G.q) return;
    G.locked = true; G.asked++;
    const q = G.q, ok = q.o[k] === q.a, btns = document.querySelectorAll("[data-gopt]");
    btns.forEach((b, i) => { if (q.o[i] === q.a) b.classList.add("right"); else if (i === k) b.classList.add("wrong"); });
    CertHub.fx.sound(ok ? "right" : "wrong");
    if (ok) { G.score++; G.combo++; } else { G.combo = 0; G.penalty += 3; if (G.misses.length < 8) G.misses.push(q); }
    const f = $("#gfeed"); if (f) f.textContent = ok ? "Correct." : `Answer: ${q.a}`;
    const s = $("#gscore"); if (s) s.textContent = G.score;
    setTimeout(() => { if (G && G.left > 0) next(); }, ok ? 350 : 1100);
  }
  function finish() {
    const g = G.g, score = G.score, asked = G.asked, misses = G.misses;
    stop();
    const best = saveScore(g.id, score);
    if (asked) { CertHub.activity.mark(); CertHub.activity.q(asked); }
    if (best) CertHub.fx.celebrate({ title: "New best score!", sub: `${score} on ${g.name}` });
    const box = $("#gamebox"); if (!box) return;
    box.innerHTML = `<div class="panel"><div class="ringrow">${CertHub.fx.ring(asked ? Math.round(100 * score / asked) : 0, "var(--accent)", `<span data-count="${esc(score)}">${esc(score)}</span><small>correct</small>`)}<p class="meta">${esc(score)} of ${esc(asked)} answered correctly.${best ? " A new personal best." : ""}</p></div>
      <div class="btns"><button type="button" class="btn" data-game="start">Play again</button><button type="button" class="btn ghost" data-game="share">Share my score</button><a class="btn ghost" href="#games">All games</a></div></div>
      ${misses.length ? `<h2>Worth another look</h2><div class="panel"><ul class="clean">${misses.map(q => `<li>${esc(q.q)} <strong>${esc(q.a)}</strong></li>`).join("")}</ul></div>` : ""}`;
    G = { done: true, g, score, asked };
  }

  document.addEventListener("click", e => {
    const b = e.target.closest("[data-game],[data-gopt]"); if (!b || !$("#gamebox")) return;
    if (b.dataset.gopt != null) return answer(+b.dataset.gopt);
    const g = byId(($("#gamebox").dataset.gid) || "");
    if (!g) return;
    if (b.dataset.game === "start") start(g);
    if (b.dataset.game === "share" && G && G.done) CertHub.fx.shareCard({ kicker: "Quick games", title: g.name, pct: G.asked ? Math.round(100 * G.score / G.asked) : 0, ringColor: "var(--accent)", big: String(G.score), line1: `${G.score} of ${G.asked} correct in ${ROUND} seconds`, line2: "Free study plans at StudyToCert", file: `studytocert-${g.id}-${G.score}`, text: `I got ${G.score} in ${ROUND} seconds on ${g.name} at StudyToCert.` });
  });
  document.addEventListener("keydown", e => {
    if (!G || G.done || !G.q || e.altKey || e.ctrlKey || e.metaKey || /^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || "")) return;
    const k = "1234".indexOf(e.key);
    if (k >= 0 && k < G.q.o.length) { e.preventDefault(); answer(k); }
  });

  // Returns the page title. head: "games" or "game-<id>".
  function show(head) {
    stop();
    if (head === "games") { $("#app").innerHTML = hub(); return "Quick Games"; }
    const g = byId(head.slice(5));
    if (!g) { $("#app").innerHTML = hub(); return "Quick Games"; }
    $("#app").innerHTML = `<div id="gamebox" data-gid="${esc(g.id)}">${intro(g)}</div>`;
    return g.name;
  }
  CertHub.games = { show, leave: stop, list: GAMES.map(g => ({ id: g.id, name: g.name })), scores, _q: { subnetQ, portQ, acronymQ, osiQ, commandQ } };
})();
