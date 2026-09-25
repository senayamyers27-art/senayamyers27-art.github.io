CertHub.addPbqs("cysa-plus", [
  { id: "ssh-spray-log", d: 1, type: "select", title: "Spot password spraying in auth.log",
    prompt: "You are reviewing /var/log/auth.log on an internet-facing Ubuntu server. Select every log line that is part of a password-spraying attempt.",
    context: "Mar 04 02:11:05 web01 sshd[2211]: Accepted publickey for deploy from 10.0.5.20 port 50122 ssh2\nMar 04 02:14:31 web01 sshd[2240]: Failed password for invalid user admin from 203.0.113.45 port 41822 ssh2\nMar 04 02:14:33 web01 sshd[2242]: Failed password for jsmith from 203.0.113.45 port 41830 ssh2\nMar 04 02:14:35 web01 sshd[2244]: Failed password for mlopez from 203.0.113.45 port 41838 ssh2\nMar 04 02:14:37 web01 sshd[2246]: Failed password for invalid user oracle from 203.0.113.45 port 41846 ssh2\nMar 04 02:20:10 web01 sshd[2301]: Failed password for bchen from 10.0.5.31 port 50410 ssh2\nMar 04 02:20:18 web01 sshd[2303]: Accepted password for bchen from 10.0.5.31 port 50412 ssh2\nMar 04 02:25:01 web01 CRON[2400]: pam_unix(cron:session): session opened for user root by (uid=0)",
    options: [
      "02:11:05 Accepted publickey for deploy from 10.0.5.20",
      "02:14:31 Failed password for invalid user admin from 203.0.113.45",
      "02:14:33 Failed password for jsmith from 203.0.113.45",
      "02:14:35 Failed password for mlopez from 203.0.113.45",
      "02:14:37 Failed password for invalid user oracle from 203.0.113.45",
      "02:20:10 Failed password for bchen from 10.0.5.31",
      "02:20:18 Accepted password for bchen from 10.0.5.31",
      "02:25:01 CRON session opened for user root"
    ],
    answers: [1, 2, 3, 4],
    explain: "Password spraying tries one or a few common passwords against many different accounts, so the signature is a single source (203.0.113.45) failing once each against admin, jsmith, mlopez and oracle within seconds. The bchen lines are one typo from an internal address followed by a success, which is normal user behavior. The key-based deploy login and the root cron session are routine. Contrast this with brute force, which hammers one account with many passwords."
  },
  { id: "event-id-match", d: 1, type: "match", title: "Match Windows and Sysmon event IDs",
    prompt: "You are building SIEM searches for a Windows domain. Match each event ID to what it records.",
    pairs: [
      ["Security 4624", "Successful logon"],
      ["Security 4625", "Failed logon"],
      ["Security 4688", "New process created"],
      ["Security 4720", "User account created"],
      ["Security 4698", "Scheduled task created"],
      ["Security 1102", "Security audit log cleared"],
      ["Sysmon 3", "Network connection made by a process"]
    ],
    extra: ["Account locked out", "Kerberos TGT requested"],
    explain: "4624 and 4625 are the successful and failed logon pair used to detect brute force and spraying. 4688 logs process creation (enable command-line auditing to see arguments), 4720 flags new accounts that may be attacker backdoors, and 4698 catches scheduled-task persistence. 1102 means someone cleared the Security log, a strong anti-forensics indicator. Sysmon Event ID 3 ties a network connection to the process image, which firewall logs cannot do. Account lockout is 4740 and a Kerberos TGT request is 4768."
  },
  { id: "phish-header-fill", d: 1, type: "fill", title: "Read a phishing email's authentication results",
    prompt: "A user reported this payroll email. Read the headers and fill in the values.",
    context: "Received: from mail.payroll-example.net (mail.payroll-example.net [198.51.100.23])\n        by mx.example.com with ESMTPS; Tue, 11 Mar 2026 08:02:44 +0000\nAuthentication-Results: mx.example.com;\n        spf=fail (mx.example.com: domain of bounce@payroll-example.net does not designate 198.51.100.23 as permitted sender) smtp.mailfrom=payroll-example.net;\n        dkim=none (message not signed);\n        dmarc=fail (p=REJECT sp=REJECT dis=NONE) header.from=example.com\nReturn-Path: <bounce@payroll-example.net>\nFrom: \"Example Payroll\" <payroll@example.com>\nReply-To: <payroll-desk@example.net>\nSubject: Action required: confirm your direct deposit details",
    fields: [
      { label: "IP address of the server that handed the message to mx.example.com", answers: ["198.51.100.23"] },
      { label: "SPF result", answers: ["fail", "failed"] },
      { label: "DMARC policy published by example.com (none, quarantine or reject)", answers: ["reject", "p=reject"] },
      { label: "Domain that replies will actually go to", answers: ["example.net"] }
    ],
    explain: "The last Received header added by your own MX shows the true sending IP, 198.51.100.23. SPF failed because that IP is not authorized for the envelope sender domain, and there is no DKIM signature, so nothing aligns with the From domain example.com and DMARC fails. The published policy is p=REJECT, which the receiving server should have enforced. The Reply-To points to example.net, a classic trick so the victim's reply lands with the attacker even though the From line looks internal."
  },
  { id: "web-log-injection", d: 1, type: "select", title: "Find attack strings in a web access log",
    prompt: "Select every request in this web server access log that shows an injection or traversal attempt.",
    context: "198.51.100.14 - - [12/Mar/2026:10:01:12 +0000] \"GET /products.php?id=42 HTTP/1.1\" 200 5120\n198.51.100.14 - - [12/Mar/2026:10:01:15 +0000] \"GET /products.php?id=42%27%20OR%20%271%27%3D%271 HTTP/1.1\" 500 312\n203.0.113.88 - - [12/Mar/2026:10:02:40 +0000] \"GET /search?q=%3Cscript%3Ealert(1)%3C%2Fscript%3E HTTP/1.1\" 200 2210\n192.168.20.5 - - [12/Mar/2026:10:03:02 +0000] \"GET /images/logo.png HTTP/1.1\" 304 0\n203.0.113.88 - - [12/Mar/2026:10:03:30 +0000] \"GET /download?file=..%2F..%2F..%2Fetc%2Fpasswd HTTP/1.1\" 403 199\n192.168.20.9 - - [12/Mar/2026:10:04:11 +0000] \"POST /login HTTP/1.1\" 302 0\n203.0.113.88 - - [12/Mar/2026:10:05:47 +0000] \"GET /ping.php?host=127.0.0.1%3Bid HTTP/1.1\" 200 88\n192.168.20.9 - - [12/Mar/2026:10:06:02 +0000] \"GET /search?q=running+shoes HTTP/1.1\" 200 4410",
    options: [
      "10:01:12 GET /products.php?id=42",
      "10:01:15 GET /products.php?id=42' OR '1'='1 (URL-encoded)",
      "10:02:40 GET /search?q=<script>alert(1)</script> (URL-encoded)",
      "10:03:02 GET /images/logo.png",
      "10:03:30 GET /download?file=../../../etc/passwd (URL-encoded)",
      "10:04:11 POST /login",
      "10:05:47 GET /ping.php?host=127.0.0.1;id (URL-encoded)",
      "10:06:02 GET /search?q=running+shoes"
    ],
    answers: [1, 2, 4, 6],
    explain: "Decode the URL encoding first (%27 is a quote, %3C and %3E are angle brackets, %2F is a slash, %3B is a semicolon). The always-true OR clause is SQL injection, and the 500 error suggests the query broke. The script tag is reflected XSS, the ../ sequences are directory traversal (blocked with a 403), and the semicolon followed by id is OS command injection against the ping page. The remaining lines are ordinary page, image, login and search traffic."
  },
  { id: "cvss-vector-fill", d: 2, type: "fill", title: "Decode a CVSS vector",
    prompt: "A scanner report lists CVSS:3.1/AV:A/AC:H/PR:L/UI:R/S:U/C:H/I:N/A:N for a finding. Fill in each metric value.",
    fields: [
      { label: "Attack Vector", answers: ["Adjacent", "Adjacent network", "Adjacent Network"] },
      { label: "Privileges Required", answers: ["Low"] },
      { label: "User Interaction", answers: ["Required"] },
      { label: "Scope", answers: ["Unchanged"] },
      { label: "The only impact metric rated High (Confidentiality, Integrity or Availability)", answers: ["Confidentiality", "C"] }
    ],
    explain: "AV:A means the attacker must be on the same broadcast or logical network segment (adjacent), not anywhere on the internet (N) or on the box itself (L). PR:L needs a basic user account, UI:R needs a victim to take some action, and S:U means the impact stays within the vulnerable component. Only C:H is high, so this is an information-disclosure flaw with no integrity or availability impact. Those restrictions keep the base score well below a network-reachable, no-interaction 9.8."
  },
  { id: "vuln-tool-match", d: 2, type: "match", title: "Pick the right assessment method",
    prompt: "Match each requirement to the assessment method or tool that best fits it.",
    pairs: [
      ["Review Java source code for injection flaws without running the app", "Static application security testing (SAST)"],
      ["Crawl and automatically attack a running staging web app", "Dynamic application security testing (DAST)"],
      ["Find known-vulnerable open-source libraries pulled in by dependencies", "Software composition analysis (SCA)"],
      ["Send malformed, randomized input to a file parser to find crashes", "Fuzzing"],
      ["Continuously flag public storage buckets and open security groups", "Cloud security posture management (CSPM)"],
      ["Inventory PLCs on a live production line without sending traffic to them", "Passive network monitoring"]
    ],
    extra: ["Ping sweep", "Tabletop exercise"],
    explain: "SAST reads code at rest, while DAST tests the running application from the outside. SCA matches third-party components against known CVEs, which neither SAST nor DAST does well. Fuzzing throws unexpected input at a program to find crashes and memory bugs. CSPM continuously checks cloud configuration, and passive monitoring is preferred in OT because active probes can crash fragile PLCs. A ping sweep is active discovery and a tabletop is an IR exercise, so neither fits."
  },
  { id: "nmap-exposure", d: 2, type: "select", title: "Flag insecure services in nmap output",
    prompt: "This nmap service scan targets a DMZ file and web server. Select every service that should be reported as an insecure configuration needing remediation.",
    context: "$ nmap -sS -sU -sV -sC -p T:21,22,23,80,443,U:161 192.0.2.40\nPORT    STATE SERVICE  VERSION\n21/tcp  open  ftp      vsftpd 3.0.5\n| ftp-anon: Anonymous FTP login allowed (FTP code 230)\n22/tcp  open  ssh      OpenSSH 9.6p1 (protocol 2.0)\n23/tcp  open  telnet   Linux telnetd\n80/tcp  open  http     nginx 1.26.1\n|_http-title: 301 Moved Permanently (redirects to HTTPS on 443)\n443/tcp open  ssl/http nginx 1.26.1\n| ssl-enum-ciphers: TLSv1.3 only, least strength: A\n161/udp open  snmp     SNMPv1 server (net-snmp)\n| snmp-info: community string: public",
    options: [
      "21/tcp FTP with anonymous login allowed",
      "22/tcp OpenSSH 9.6p1",
      "23/tcp Telnet",
      "80/tcp HTTP that redirects to HTTPS",
      "443/tcp HTTPS offering only TLS 1.3",
      "161/udp SNMP answering to the community string public"
    ],
    answers: [0, 2, 5],
    explain: "Anonymous FTP lets anyone read (and possibly write) files, and FTP sends credentials in cleartext anyway, so disable anonymous access and move to SFTP. Telnet sends all credentials in cleartext and should be replaced by the SSH service already running. SNMPv1 with the default community string public exposes device details to anyone who asks; use SNMPv3 with authentication and encryption. A current OpenSSH, an HTTP-to-HTTPS redirect and TLS 1.3-only HTTPS are all acceptable."
  },
  { id: "kill-chain-match", d: 3, type: "match", title: "Map an intrusion to the Cyber Kill Chain",
    prompt: "An incident report describes these attacker actions. Match each one to its Lockheed Martin Cyber Kill Chain phase.",
    pairs: [
      ["Harvested finance staff names and titles from the company's public website", "Reconnaissance"],
      ["Built an invoice document with a malicious macro that fetches a loader", "Weaponization"],
      ["Emailed the invoice document to six finance employees", "Delivery"],
      ["The macro ran when a user clicked Enable Content", "Exploitation"],
      ["The loader added a registry Run key pointing to its executable", "Installation"],
      ["The implant contacted 203.0.113.50 over HTTPS every 60 seconds for tasks", "Command and control"],
      ["Staff design files were compressed and uploaded to attacker storage", "Actions on objectives"]
    ],
    explain: "The Kill Chain runs reconnaissance, weaponization, delivery, exploitation, installation, command and control, then actions on objectives. Gathering names is recon, and pairing the macro with the loader happens before anything reaches the victim, which is weaponization. Sending the email is delivery, code running on the endpoint is exploitation, and the Run key is persistence in the installation phase. Regular beaconing for tasks is C2, and stealing the design files is the attacker's goal, actions on objectives."
  },
  { id: "ir-malware-order", d: 3, type: "order", title: "Sequence the response to an infected workstation",
    prompt: "EDR flags a workstation for ransomware-like behavior. Put these incident response activities in the correct order.",
    steps: [
      "Maintain an approved ransomware playbook and test EDR network isolation (before any incident)",
      "Validate the alert and confirm the workstation is compromised",
      "Isolate the workstation from the network using EDR containment",
      "Remove the malware, its scheduled task and the attacker-created account",
      "Reimage or restore from a clean backup, then monitor before returning it to the user",
      "Hold a lessons-learned review and update the playbook"
    ],
    explain: "This follows the NIST incident response life cycle: preparation, detection and analysis, containment, eradication, recovery and post-incident activity. Containment comes before eradication so the malware cannot spread while you clean up. Recovery uses a known-good image or backup and extra monitoring to confirm the threat is gone. The lessons-learned review closes the loop by feeding improvements back into preparation."
  },
  { id: "volatility-order", d: 3, type: "order", title: "Collect evidence by order of volatility",
    prompt: "You must collect evidence from a running compromised Linux server. Order these sources from MOST volatile to LEAST volatile.",
    steps: [
      "CPU registers and cache",
      "RAM: running processes, network connections, ARP and routing tables",
      "Temporary file systems such as a tmpfs-mounted /tmp",
      "Local disk (forensic image)",
      "Remote logs already forwarded to the SIEM",
      "Archived backup tapes"
    ],
    explain: "Following the order of volatility (RFC 3227), collect what disappears fastest first. Registers and cache change in nanoseconds, and RAM is lost at power-off along with process, connection and ARP state. A tmpfs /tmp lives in memory and is gone on reboot, while the disk persists but can still be altered by the running system. Remote SIEM logs and archived backups are the most stable because the attacker on this host has the least ability to change them."
  },
  { id: "report-audience-match", d: 4, type: "match", title: "Tailor incident reporting to each audience",
    prompt: "After a breach involving customer PII, match each stakeholder to the information they most need from the security team.",
    pairs: [
      ["Board of directors", "Business impact, risk trend and decisions or funding needed"],
      ["System administrators", "Affected hosts, CVE IDs, evidence and remediation steps"],
      ["Legal counsel", "What data was exposed, for notification obligations and legal hold"],
      ["Public relations", "Approved facts for the public statement and media inquiries"],
      ["Human resources", "Evidence of employee involvement for any disciplinary action"]
    ],
    extra: ["Raw packet captures and SIEM queries"],
    explain: "Executives and the board need business impact and decisions, not technical detail. Administrators need actionable specifics to fix the problem. Legal counsel decides breach-notification duties and preserves evidence, PR gives the organization one accurate public voice, and HR handles employment actions when an insider is involved. Raw packet captures and queries belong in a technical appendix, not in any of these audiences' summaries."
  },
  { id: "mttr-sla-fill", d: 4, type: "fill", title: "Calculate remediation metrics",
    prompt: "Policy says critical vulnerabilities must be remediated within 15 days. Use the table to fill in the metrics for last month's critical findings.",
    context: "Finding   Discovered   Remediated   \n--------  -----------  -----------\nVULN-101  2026-01-02   2026-01-10\nVULN-102  2026-01-03   2026-01-25\nVULN-103  2026-01-05   2026-01-11\nVULN-104  2026-01-08   2026-01-20",
    fields: [
      { label: "Mean time to remediate (days)", answers: ["12", "12 days"] },
      { label: "Number of findings that breached the 15-day SLA", answers: ["1", "one"] },
      { label: "SLA compliance rate (%)", answers: ["75", "75%", "75 %"] }
    ],
    explain: "Days open are 8, 22, 6 and 12, which total 48, so the mean time to remediate is 48 / 4 = 12 days. Only VULN-102 took longer than 15 days, so 3 of 4 findings met the SLA for 75% compliance. Reporting both numbers matters: a healthy average can hide individual findings that stayed open far too long, which is why SLA compliance is tracked separately."
  }
]);
