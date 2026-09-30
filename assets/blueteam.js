/* Blue Team in the browser (no VM): log puzzles (#log-puzzles) and incident-response tabletop exercises
   (#tabletop, #tabletop-<id>). Log puzzles show a short excerpt: pick the line that matters and read why.
   Tabletops are choose-your-path scenarios that follow the incident response phases (NIST SP 800-61):
   every choice is explained, and the best path is scored. All data is invented for practice. Loaded on first visit. */
(function () {
  const { U, store } = CertHub;
  const { $, esc } = U;
  const KEY = "certhub:blueteam";
  const saved = () => { try { return JSON.parse(store.get(KEY) || "{}") || {}; } catch (e) { return {}; } };
  const save = s => store.set(KEY, JSON.stringify(s));

  /* ---------- log puzzles: [id, title, source, lines, answer index (0-based), why] ---------- */
  const PUZZLES = [
    ["win-bruteforce", "Windows sign-ins", "Windows Security log (event ID, account, source address)", [
      "09:12:01 4624 Logon success  user=j.smith   src=10.1.4.22   type=2 (interactive)",
      "09:40:17 4625 Logon failure  user=admin     src=203.0.113.9 type=3 (network)",
      "09:40:18 4625 Logon failure  user=admin     src=203.0.113.9 type=3 (network)",
      "09:40:19 4625 Logon failure  user=backup    src=203.0.113.9 type=3 (network)",
      "09:40:21 4625 Logon failure  user=backup    src=203.0.113.9 type=3 (network)",
      "09:40:24 4624 Logon success  user=backup    src=203.0.113.9 type=3 (network)",
      "09:55:03 4624 Logon success  user=m.lopez   src=10.1.4.31   type=2 (interactive)"
    ], 5, "Event 4625 is a failed logon and 4624 a successful one. Several fast failures from one outside address, across different accounts, then a success for one of them: that's a password-guessing attack that worked. Disable the backup account, block the address and find out what it did next."],
    ["linux-sudo", "Who became root?", "Linux auth log", [
      "Mar 3 08:01:12 web01 sshd[901]: Accepted publickey for deploy from 10.0.0.5 port 50211",
      "Mar 3 08:01:40 web01 sudo: deploy : TTY=pts/0 ; PWD=/srv/app ; USER=root ; COMMAND=/usr/bin/systemctl restart app",
      "Mar 3 13:22:09 web01 sshd[1440]: Accepted password for www-data from 198.51.100.61 port 40022",
      "Mar 3 13:22:31 web01 sudo: www-data : TTY=pts/1 ; PWD=/tmp ; USER=root ; COMMAND=/bin/bash",
      "Mar 3 17:30:02 web01 CRON[2210]: (root) CMD (/usr/local/bin/backup.sh)"
    ], 3, "The web server's own account (www-data) normally never logs in over SSH or runs sudo. Here it logged in with a password from an outside address and opened a root shell from /tmp. That points to a compromised or misconfigured service account: it should have no password, no login shell and no sudo rights."],
    ["dns-tunnel", "Odd DNS queries", "DNS resolver log (client, query name, type)", [
      "10.2.0.14  www.example.com                                   A",
      "10.2.0.14  login.microsoftonline.com                         A",
      "10.2.0.33  aGVsbG8gd29ybGQgdGhpcyBpcyBkYXRh.x7.example.net     TXT",
      "10.2.0.33  ZXhmaWwgcGFydCB0d28gb2YgbWFueQ.x7.example.net       TXT",
      "10.2.0.21  updates.vendor.example                             AAAA"
    ], 2, "Long, random-looking subdomains (here base64 text) sent again and again to one domain, often as TXT queries, are a classic sign of DNS tunneling: data hidden in DNS lookups to slip past the firewall. Look at 10.2.0.33, block the domain at the resolver and check which process makes the queries."],
    ["impossible-travel", "Cloud sign-ins", "Identity provider sign-in log (user, time UTC, location, result)", [
      "a.chen   07:58  Chicago, US        success  (MFA)",
      "a.chen   08:04  Chicago, US        success  (token refresh)",
      "a.chen   08:19  Lagos, NG          success  (legacy authentication, no MFA)",
      "r.patel  08:25  Austin, US         failure  (wrong password)",
      "r.patel  08:26  Austin, US         success  (MFA)"
    ], 2, "The same account signed in from two places far apart within 15 minutes (impossible travel), and the second sign-in used legacy authentication, which skips MFA. Revoke a.chen's sessions, reset the password, block legacy authentication and check mailbox rules for forwarding."],
    ["encoded-powershell", "Process creation", "Windows process creation events (4688), parent → child and command line", [
      "explorer.exe → chrome.exe",
      "services.exe → svchost.exe -k netsvcs",
      "WINWORD.EXE → powershell.exe -nop -w hidden -enc VwByAGkAdABlAC0ATwB1AHQAcAB1AHQAIAAiAGgAaQAiAA==",
      "explorer.exe → notepad.exe C:\\Users\\m.lopez\\notes.txt",
      "svchost.exe → taskhostw.exe"
    ], 2, "Word starting PowerShell with a hidden window and an encoded (-enc) command is a classic sign of a malicious document macro. Isolate the computer, keep the document for analysis, and block Office from creating child processes (an attack surface reduction rule). This encoded text only says Write-Output \"hi\", but a real one would download more."],
    ["port-scan", "Firewall log", "Perimeter firewall log (source, destination port, action)", [
      "192.0.2.50   → 443   allow",
      "192.0.2.51   → 443   allow",
      "203.0.113.77 → 21    deny",
      "203.0.113.77 → 22    deny",
      "203.0.113.77 → 23    deny",
      "203.0.113.77 → 25    deny",
      "203.0.113.77 → 3389  deny"
    ], 2, "One address trying many different ports in quick order is a port scan: reconnaissance to find open services. The firewall denied them, so no harm yet, but it's worth an alert, a block list entry and a check that nothing else from that address got through. The first probe is where the scan starts."],
    ["new-service", "System changes", "Windows System and Security logs", [
      "02:10:44 4672 Special privileges assigned  user=svc_sql",
      "02:11:02 7045 Service installed  name=WinUpdSvc  path=C:\\Users\\Public\\wupd.exe  start=auto",
      "02:11:30 4720 User account created  user=helpdesk2",
      "02:11:31 4732 Member added to group  user=helpdesk2  group=Administrators",
      "02:12:05 1102 The audit log was cleared  user=svc_sql"
    ], 4, "Every line here is suspicious at 2 a.m. (a service running from a public folder, a new admin account), but clearing the audit log (1102) is the attacker covering their tracks and the strongest sign of compromise. Treat the host as compromised, collect what logs remain from your SIEM and start incident response."],
    ["web-shell", "Web server requests", "Web access log (address, request, status)", [
      "192.0.2.14  GET /index.html                     200",
      "192.0.2.14  GET /images/logo.png                200",
      "198.51.100.8 POST /upload.php (file=avatar.php)  200",
      "198.51.100.8 GET /uploads/avatar.php?cmd=whoami  200",
      "192.0.2.19  GET /contact.html                   200"
    ], 3, "A .php file was uploaded through the avatar upload, then requested with a cmd parameter and returned 200. That's a web shell: the attacker can now run commands on the server. Take the site offline or block the path, remove the file, and fix the upload to accept only images and never execute them."],
    ["s3-public", "Cloud storage policy", "AWS S3 bucket policy for the bucket holding payroll exports", [
      "{ \"Version\": \"2012-10-17\",",
      "  \"Statement\": [{",
      "    \"Effect\": \"Allow\",",
      "    \"Principal\": \"*\",",
      "    \"Action\": \"s3:GetObject\",",
      "    \"Resource\": \"arn:aws:s3:::payroll-exports/*\"",
      "  }] }"
    ], 3, "A principal of \"*\" means anyone on the internet: combined with s3:GetObject, every payroll file can be downloaded by anyone who guesses a name. Remove the statement, keep S3 Block Public Access on for the account, and grant access to specific roles instead."],
    ["sg-ssh", "Cloud firewall rules", "Inbound rules of the security group on a web server", [
      "Type HTTPS   Protocol TCP  Port 443   Source 0.0.0.0/0          (public website)",
      "Type SSH     Protocol TCP  Port 22    Source 0.0.0.0/0          (admin access)",
      "Type Custom  Protocol TCP  Port 5432  Source sg-0app1 (app tier) (database)",
      "Type ICMP    Protocol ICMP Echo       Source 10.0.0.0/16        (internal ping)"
    ], 1, "SSH open to 0.0.0.0/0 invites password guessing and exploit attempts from the whole internet. HTTPS being public is the point of a website; SSH isn't. Limit it to the admin network or a VPN, or remove it and use a managed session service (for example AWS Systems Manager Session Manager or Azure Bastion)."],
    ["iam-star", "Cloud permissions", "IAM policy attached to the user account the build pipeline uses", [
      "{ \"Version\": \"2012-10-17\",",
      "  \"Statement\": [",
      "    { \"Effect\": \"Allow\", \"Action\": [\"s3:PutObject\"], \"Resource\": \"arn:aws:s3:::build-artifacts/*\" },",
      "    { \"Effect\": \"Allow\", \"Action\": \"*\", \"Resource\": \"*\" }",
      "  ] }"
    ], 3, "Action \"*\" on Resource \"*\" is full administrator access. If the pipeline's credentials leak, the attacker owns the account. Least privilege: keep only what the pipeline needs (the first statement), and give pipelines a role with short-lived credentials rather than a user with long-lived keys."],
    ["k8s-privileged", "Container settings", "Kubernetes pod spec for a web container", [
      "apiVersion: v1",
      "kind: Pod",
      "spec:",
      "  containers:",
      "  - name: web",
      "    image: nginx:1.27",
      "    securityContext:",
      "      privileged: true",
      "    ports: [{ containerPort: 8080 }]"
    ], 7, "A privileged container has almost the same access to the node as root on the host: an attacker who gets into the web app can escape the container. A web server never needs it. Remove it, run as a non-root user, and enforce the Pod Security Standards (restricted) on the namespace."]
  ];

  /* ---------- tabletop exercises ---------- */
  // Each scenario: nodes keyed by id. A node has text and choices [label, next, points (0-2), why]. Ending nodes have end: true.
  const TABLETOPS = [
    { id: "ransomware", title: "Ransomware on the file server", level: "Intermediate", certs: "Security+, CySA+, CISSP", blurb: "Monday 7:40 a.m.: staff can't open shared files, and there's a ransom note on the file server.", nodes: {
      start: { phase: "Detection and analysis", text: "Several people report files on the shared drive now end in .locked, and a file called READ_ME.txt demands payment in cryptocurrency. The file server is still on the network. What do you do first?", choices: [
        ["Disconnect the file server from the network, but leave it powered on", "scope", 2, "Right. Isolating stops the encryption spreading to more shares and machines, and leaving it on keeps memory evidence (running processes, keys) that a shutdown would lose."],
        ["Shut the file server down immediately", "scope", 1, "It stops the damage, but you lose what's in memory, which can help the investigation or even recovery. Network isolation is usually better."],
        ["Contact the attackers to ask for the price", "scope", 0, "Not first. Talking to attackers is a decision for leadership, legal counsel and often law enforcement, after containment. Right now the encryption may still be spreading."]
      ] },
      scope: { phase: "Detection and analysis", text: "The server is isolated. The security tool shows the same encrypting program on two laptops in finance. What next?", choices: [
        ["Isolate those two laptops too and look for the first infected machine", "notify", 2, "Yes. Contain every affected host, then find patient zero: how the attackers got in tells you what else to check and fix."],
        ["Reimage the two laptops right away", "notify", 1, "They do need rebuilding, but not before you've captured what you need to learn how the attack started. Isolate first, collect evidence, then rebuild."],
        ["Wait to see whether more machines show symptoms", "notify", 0, "Waiting lets the attack spread. Contain what you know about now."]
      ] },
      notify: { phase: "Containment", text: "The infection came from a phishing email opened on one finance laptop last Friday. Who needs to know now?", choices: [
        ["Follow the incident response plan: management, legal and, if personal data may be involved, the privacy officer; consider law enforcement", "recover", 2, "Right. The plan names who to call. Legal and privacy teams decide on notification duties (many laws have deadlines), and law enforcement may have decryptors or intelligence."],
        ["Only the IT team, to avoid panic", "recover", 0, "Keeping it inside IT risks missing legal notification deadlines and leaves decision-makers blind. Follow the communication plan."],
        ["Post an update on the company's public social media", "recover", 0, "Public statements come later, through the communications team and legal, with facts confirmed."]
      ] },
      recover: { phase: "Eradication and recovery", text: "The backups are offline copies from Sunday night, and they aren't encrypted. How do you recover?", choices: [
        ["Rebuild the affected machines, patch and reset credentials, then restore from the clean backups and watch closely", "lessons", 2, "Right. Remove the attacker's access before restoring (they may still hold passwords), restore from known-good backups, and monitor for signs they're back."],
        ["Restore the backups onto the existing servers right away", "lessons", 1, "Faster, but if the attacker still has access or a backdoor on those servers, they can encrypt the restored files again."],
        ["Pay the ransom, since it may be faster", "lessons", 0, "With clean backups there's no reason to pay, and paying funds crime, may break sanctions laws and doesn't guarantee working decryption."]
      ] },
      lessons: { phase: "Post-incident activity", end: true, text: "Files are restored and the business is running. Hold a lessons-learned meeting within two weeks: what worked (offline backups), what didn't (the phishing email got through, and the encryption reached a shared drive), and what to change: email filtering, phishing training, least-privilege access to shares, and faster isolation." }
    } },
    { id: "phishing", title: "An employee entered their password on a fake page", level: "Beginner", certs: "Security+, ISC2 CC, SC-200", blurb: "An employee reports they typed their password into a login page from an email, and it didn't work.", nodes: {
      start: { phase: "Detection and analysis", text: "At 10:15 an employee calls: an email about a \"shared invoice\" took them to a Microsoft-looking login page. They entered their password and nothing happened. What first?", choices: [
        ["Reset their password and revoke all their sign-in sessions", "check", 2, "Right. Assume the password is stolen. Revoking sessions matters as much as the reset: the attacker may already have a session token that keeps working after a password change."],
        ["Tell them not to worry, since the page didn't work", "check", 0, "The page \"not working\" is typical: it collected the password and then failed on purpose. Treat it as a compromise."],
        ["Ask them to forward the email to everyone as a warning", "check", 0, "Forwarding spreads the malicious link. Report it to security instead, who can remove it from every mailbox."]
      ] },
      check: { phase: "Detection and analysis", text: "Their account shows a sign-in at 10:09 from another country, which passed MFA after they approved a push notification they didn't expect. What do you check?", choices: [
        ["Sign-in logs, new mailbox rules (forwarding or deletion), new MFA methods and app consents added since 10:09", "wider", 2, "Yes. Attackers commonly add inbox rules to hide replies, register their own MFA method, or grant an app access so they keep a way in after the reset."],
        ["Nothing more: the password is already reset", "wider", 0, "A reset doesn't undo inbox rules, added MFA devices or consented apps. Check for persistence."],
        ["Their computer only", "wider", 1, "Worth checking, but this attack was on the cloud account. The account's settings and logs matter most."]
      ] },
      wider: { phase: "Containment", text: "You find a forwarding rule sending mail to an outside address, and the same phishing email went to 40 other people. What next?", choices: [
        ["Remove the rule, purge the email from all mailboxes, block the sender and link, and check who else clicked", "lessons", 2, "Right. Clean up this account, then treat it as an incident for the whole organization: find every recipient who clicked or entered a password."],
        ["Remove the rule and close the ticket", "lessons", 0, "Forty other people received it. Some may have entered their password too."],
        ["Block the external forwarding address only", "lessons", 1, "Helpful, but it leaves the email in 40 inboxes and doesn't find other victims."]
      ] },
      lessons: { phase: "Post-incident activity", end: true, text: "Lessons: the employee reported quickly, which limited the damage, so thank them. Changes to consider: number matching or phishing-resistant MFA (passkeys or security keys) instead of simple push approval, blocking automatic forwarding outside the organization, and a reminder that a login page from an email link is never safe." }
    } },
    { id: "lost-laptop", title: "A lost laptop", level: "Beginner", certs: "Security+, A+, ISC2 CC", blurb: "A manager left their work laptop on a train. It holds customer spreadsheets.", nodes: {
      start: { phase: "Detection and analysis", text: "A sales manager reports their laptop was left on a train an hour ago. It has customer spreadsheets with names and phone numbers. What do you check first?", choices: [
        ["Whether the disk is encrypted, and when the laptop last checked in to device management", "act", 2, "Right. Full-disk encryption (BitLocker or FileVault) turns this from a likely data breach into a lost piece of hardware, so it decides everything that follows."],
        ["Whether the manager remembers their password", "act", 0, "Their password isn't the question. What matters is whether someone who finds the laptop can read the disk."],
        ["Order a replacement laptop", "act", 1, "Needed eventually, but it doesn't reduce the risk of the lost one."]
      ] },
      act: { phase: "Containment", text: "Device management shows the laptop is encrypted, but it was last seen online 50 minutes ago. What do you do?", choices: [
        ["Send a remote lock and wipe, disable its certificates and revoke the manager's sessions", "report", 2, "Right. The wipe runs the next time it connects; revoking sessions and device certificates stops it reaching company systems even if someone gets past the lock screen."],
        ["Wait a day in case someone hands it in", "report", 0, "Waiting gives a finder more time. You can still recover files from backup if it turns up."],
        ["Change the Wi-Fi password at the office", "report", 0, "That doesn't address the risk: the laptop can connect from anywhere."]
      ] },
      report: { phase: "Post-incident activity", end: true, text: "Record the incident, then let the privacy officer decide on notifications. Because the disk was encrypted, many privacy laws don't require notifying customers, but that's their call to make. Lessons: confirm encryption is enforced on every laptop, keep customer data in managed cloud storage rather than on the laptop, and make reporting a lost device quick and blame-free." }
    } }
  ];
  const tByid = id => TABLETOPS.find(t => t.id === id);

  /* ---------- views ---------- */
  let P = null, T = null;
  function puzzlesView() {
    const s = saved(), done = PUZZLES.filter(p => s["p:" + p[0]]).length;
    const i = P ? P.i : 0, p = PUZZLES[i], picked = P && P.picked;
    return `<p class="crumbs"><a href="#labs">Labs</a> / Log puzzles</p><h1>Log puzzles</h1>
      <p class="meta">Short excerpts from real kinds of logs and cloud settings. Pick the line an analyst should act on, then read why. ${esc(done)} of ${PUZZLES.length} solved. All names and addresses are invented.</p>
      <div class="panel"><div class="flex"><strong>${esc(i + 1)}. ${esc(p[1])}</strong><span class="note">${esc(p[2])}</span></div>
        <ol class="loglines" start="1">${p[3].map((l, k) => `<li><button type="button" class="logline${picked != null ? (k === p[4] ? " right" : k === picked ? " wrong" : "") : ""}" data-logpick="${/* num */ k}"${picked != null ? " disabled" : ""}><code>${esc(l)}</code></button></li>`).join("")}</ol>
        ${picked != null ? `<div class="expl" role="status" data-style="--c:${picked === p[4] ? "var(--ok)" : "var(--bad)"}"><strong data-ui>${picked === p[4] ? "Right." : `Not quite: it's line ${esc(p[4] + 1)}.`}</strong> ${esc(p[5])}</div>` : `<p class="note">Select a line.</p>`}
        <div class="btns">${i > 0 ? `<button type="button" class="btn ghost" data-bt="pprev">Previous</button>` : ""}${i < PUZZLES.length - 1 ? `<button type="button" class="btn" data-bt="pnext">Next puzzle</button>` : `<a class="btn" href="#tabletop">Try a tabletop exercise</a>`}</div></div>`;
  }
  function tabletopHub() {
    const s = saved();
    return `<p class="crumbs"><a href="#labs">Labs</a> / Tabletop exercises</p><h1>Incident response tabletops</h1>
      <p class="meta">Talk-through exercises: an incident unfolds, and you choose what the response team does at each step. Every choice is explained, following the incident response phases (preparation, detection and analysis, containment, eradication and recovery, post-incident activity). Good for Security+, CySA+ and CISSP, and for a team meeting.</p>
      <div class="cards">${TABLETOPS.map(t => { const best = s["t:" + t.id]; return `<a class="card" href="#tabletop-${esc(t.id)}"><span class="vendor">${esc(t.level)} · ${esc(t.certs)}</span><h2>${esc(t.title)}</h2><p>${esc(t.blurb)}</p><div class="cardfoot"><span>${Object.values(t.nodes).filter(n => !n.end).length} decisions</span><span>${best != null ? `Best: <strong>${esc(best)}%</strong>` : "Not tried yet"}</span></div></a>`; }).join("")}</div>`;
  }
  function tabletopView(t) {
    if (!T || T.id !== t.id) T = { id: t.id, node: "start", got: 0, max: 0, log: [], order: {} };
    const n = t.nodes[T.node];
    // Show the choices in a random order, so the best one isn't always in the same place.
    const order = n.choices ? (T.order[T.node] || (T.order[T.node] = n.choices.map((_, k) => k).sort(() => Math.random() - .5))) : [];
    const history = T.log.map(h => `<div class="ttstep"><span class="note">${esc(h.phase)}</span><p>${esc(h.text)}</p><p><strong data-ui>You chose:</strong> ${esc(h.label)}</p><div class="expl" data-style="--c:${h.pts === 2 ? "var(--ok)" : h.pts === 1 ? "var(--warn)" : "var(--bad)"}">${esc(h.why)}</div></div>`).join("");
    if (n.end) {
      const pct = T.max ? Math.round(100 * T.got / T.max) : 0;
      return `<p class="crumbs"><a href="#labs">Labs</a> / <a href="#tabletop">Tabletops</a> / ${esc(t.title)}</p><h1>${esc(t.title)}</h1>${history}
        <div class="panel"><span class="note">${esc(n.phase)}</span><p>${esc(n.text)}</p>
          <div class="ringrow">${CertHub.fx.ring(pct, pct >= 80 ? "var(--ok)" : pct >= 50 ? "var(--warn)" : "var(--bad)", `<span data-count="${esc(pct)}">${esc(pct)}</span><small>%</small>`)}<p class="meta">${esc(T.got)} of ${esc(T.max)} points for the choices you made.</p></div>
          <div class="btns"><button type="button" class="btn" data-bt="restart">Try again</button><a class="btn ghost" href="#tabletop">Other exercises</a></div></div>`;
    }
    return `<p class="crumbs"><a href="#labs">Labs</a> / <a href="#tabletop">Tabletops</a> / ${esc(t.title)}</p><h1>${esc(t.title)}</h1>${history}
      <div class="panel"><span class="chip" data-style="--c:var(--accent)">${esc(n.phase)}</span><p class="qtext">${esc(n.text)}</p>
        ${order.map(k => `<button type="button" class="opt" data-ttpick="${/* num */ k}">${esc(n.choices[k][0])}</button>`).join("")}</div>`;
  }

  document.addEventListener("click", e => {
    const b = e.target.closest("[data-logpick],[data-bt],[data-ttpick]"); if (!b || !$("#btbox")) return;
    const box = $("#btbox");
    if (b.dataset.logpick != null) {
      P = P || { i: 0 }; if (P.picked != null) return;
      P.picked = +b.dataset.logpick;
      const p = PUZZLES[P.i];
      if (P.picked === p[4]) { const s = saved(); s["p:" + p[0]] = 1; save(s); CertHub.activity.mark(); CertHub.fx.sound("right"); if (PUZZLES.every(x => s["p:" + x[0]])) CertHub.fx.celebrate({ title: "All log puzzles solved!", sub: "Try a tabletop exercise next." }); }
      else CertHub.fx.sound("wrong");
      box.innerHTML = puzzlesView(); return;
    }
    if (b.dataset.bt === "pnext" || b.dataset.bt === "pprev") { P = { i: Math.max(0, Math.min(PUZZLES.length - 1, (P ? P.i : 0) + (b.dataset.bt === "pnext" ? 1 : -1))) }; box.innerHTML = puzzlesView(); window.scrollTo(0, 0); return; }
    const t = T && tByid(T.id); if (!t) return;
    if (b.dataset.bt === "restart") { T = null; box.innerHTML = tabletopView(t); return; }
    if (b.dataset.ttpick != null) {
      const n = t.nodes[T.node], c = n.choices[+b.dataset.ttpick]; if (!c) return;
      T.log.push({ phase: n.phase, text: n.text, label: c[0], why: c[3], pts: c[2] });
      T.got += c[2]; T.max += 2; T.node = c[1];
      if (t.nodes[T.node].end) {
        const pct = Math.round(100 * T.got / T.max), s = saved(); s["t:" + t.id] = Math.max(s["t:" + t.id] || 0, pct); save(s);
        CertHub.activity.mark();
        if (pct === 100) CertHub.fx.celebrate({ title: "Textbook response!", sub: t.title });
      }
      box.innerHTML = tabletopView(t);
      const last = box.querySelectorAll(".ttstep"); if (last.length) last[last.length - 1].scrollIntoView({ block: "start" });
    }
  });

  // Spanish mode: swap in the Spanish text (data/blueteam-es.js) once it has loaded. Log lines stay as they are.
  let esApplied = false, esTried = false;
  function applyEs() {
    const es = CertHub.blueteamEs; if (esApplied || !es) return; esApplied = true;
    PUZZLES.forEach(p => { const t = es.puzzles && es.puzzles[p[0]]; if (t) { p[1] = t[0]; p[2] = t[1]; p[5] = t[2]; } });
    TABLETOPS.forEach(tt => {
      const t = es.tabletops && es.tabletops[tt.id]; if (!t) return;
      tt.title = t.title || tt.title; tt.blurb = t.blurb || tt.blurb;
      Object.entries(tt.nodes).forEach(([k, n]) => {
        const e = t.nodes && t.nodes[k]; if (!e) return;
        n.text = e.text || n.text;
        if (n.choices && e.choices) n.choices.forEach((c, i) => { if (e.choices[i]) { c[0] = e.choices[i][0]; c[3] = e.choices[i][1]; } });
        if (es.phases && es.phases[n.phase]) n.phase = es.phases[n.phase];
      });
    });
  }
  // Returns the page title. head: "log-puzzles", "tabletop" or "tabletop-<id>".
  function show(head) {
    if (CertHub.i18n.lang() === "es" && !CertHub.blueteamEs && !esTried) {
      esTried = true; // one try: offline, the English text is shown
      CertHub.loadScript("data/blueteam-es.js").then(ok => { if (ok && location.hash === "#" + head) document.title = `${show(head)} · StudyToCert`; });
    }
    applyEs();
    if (head === "log-puzzles") { P = { i: 0 }; $("#app").innerHTML = `<div id="btbox">${puzzlesView()}</div>`; return "Log Puzzles"; }
    const t = head.startsWith("tabletop-") && tByid(head.slice(9));
    if (t) { T = null; $("#app").innerHTML = `<div id="btbox">${tabletopView(t)}</div>`; return t.title; }
    $("#app").innerHTML = `<div id="btbox">${tabletopHub()}</div>`; return "Tabletop Exercises";
  }
  CertHub.blueteam = { show, puzzles: PUZZLES.length, tabletops: TABLETOPS.map(t => t.id) };
})();
