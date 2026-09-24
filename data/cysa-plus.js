/* CompTIA CySA+ CS0-004 — generated plan (no hand-written weeks). */
CertHub.register({
  id: "cysa-plus",
  vendor: "CompTIA",
  name: "CompTIA CySA+",
  short: "CySA+",
  exam: "CS0-004",
  blurb: "Blue-team analyst certification: security operations, vulnerability management, incident response and reporting.",
  status: "verified",
  statusNote: "Weights verified Sept 24, 2026 against the CS0-004 outline (launched June 23, 2026). CS0-003 retires Nov 22, 2026.",
  lastVerified: "2026-09-24",
  notices: [{"from": "2026-09-24", "until": "2026-11-22", "text": "CS0-003 retires Nov 22, 2026. This plan covers CS0-004, which launched June 23, 2026."}],
  examInfo: { questions: "Max 85 (multiple choice and PBQs)", minutes: 165, pass: "750 on a 100–900 scale" },
  examSim: { questions: 85, minutes: 165 },
  sources: [{ label: "CompTIA CySA+ CS0-004 exam objectives", url: "https://www.comptia.org/certifications/cybersecurity-analyst" }],
  planWeeks: 12,
  domains: [
    {
      "id": 1,
      "name": "Security operations",
      "w": 34,
      "topics": [
        "System and network architecture: on-prem, cloud, hybrid, serverless, containers, segmentation, zero trust, SASE",
        "Identity and access: MFA, SSO, federation, PAM, just-in-time access, CASB",
        "Logging: log ingestion, time synchronization (NTP), log levels, Windows Event IDs, Sysmon, Linux auth logs",
        "Network indicators: beaconing, unusual bandwidth, irregular peer-to-peer traffic, rogue devices, scans, unexpected ports",
        "Host indicators: unusual processes, masquerading binaries, unauthorized software, persistence (services, scheduled tasks, run keys)",
        "Application indicators: anomalous activity, new accounts, unexpected output, injection strings in web logs",
        "Tools: SIEM, SOAR, EDR, Wireshark/tcpdump, sandboxing, CyberChef, reputation and WHOIS lookups",
        "Email analysis: headers, SPF, DKIM, DMARC, impersonation and malicious attachments",
        "Threat intelligence: actor types, TTPs, confidence (timeliness, relevancy, accuracy), open vs closed sources, ISACs, STIX/TAXII",
        "Threat hunting: hypotheses, IoC collection, focus areas, active defense and honeypots",
        "Process improvement: standardizing processes, automation and orchestration, tuning alerts, single pane of glass, safe use of AI assistants"
      ],
      "notes": ["Objectives 1.1–1.5", "CompTIA CS0-004 exam objectives PDF, Domain 1"],
      "labs": [
        "Open a sample malware-traffic PCAP (malware-traffic-analysis.net) in Wireshark. Use Statistics > Conversations and I/O Graph to find beaconing, then write down the C2 IP, interval and user agent.",
        "Install Splunk Free (or use Security Onion), ingest Windows Security and Sysmon logs from a lab VM and build searches for Event IDs 4625, 4624, 4688 and Sysmon 1/3.",
        "Paste three obfuscated strings (Base64, hex, gzip+Base64) into CyberChef and decode each; save the recipe you used.",
        "Complete a free TryHackMe or Blue Team Labs Online phishing-analysis room: parse the headers, check SPF/DKIM/DMARC results and extract every IoC."
      ]
    },
    {
      "id": 2,
      "name": "Vulnerability management",
      "w": 26,
      "topics": [
        "Asset discovery and scan types: active vs passive, credentialed vs non-credentialed, agent vs agentless, internal vs external",
        "Special environments: OT/ICS, cloud, mobile and scanning without disrupting production",
        "Scanner and tool output: Nessus/OpenVAS reports, nmap, web app scanners, SAST, DAST, SCA, fuzzing, cloud posture tools",
        "Validating results: true/false positives and negatives, backported patches",
        "Prioritization: CVSS base metrics and vectors, EPSS, CISA KEV, asset value, exploitability, context",
        "Common software vulnerabilities: injection, XSS, SSRF, IDOR, broken access control, buffer overflow, insecure cookies",
        "Recommending controls: input validation, output encoding, parameterized queries, memory protections, secure coding",
        "Compensating controls, segmentation and exceptions for systems that cannot be patched",
        "Vulnerability response: patching, configuration management, change management, maintenance windows",
        "Risk management: accept, avoid, transfer, mitigate; inhibitors to remediation (legacy systems, business process interruption, MOUs/SLAs)"
      ],
      "notes": ["Objectives 2.1–2.5", "CompTIA CS0-004 exam objectives PDF, Domain 2"],
      "labs": [
        "Install Greenbone Community Edition (OpenVAS) and scan a Metasploitable 2 VM twice, once unauthenticated and once with credentials. Compare the finding counts.",
        "Run nmap -sV -sC and --script vuln against the same VM and map three open services to CVEs in the NVD.",
        "Take five findings from your scan, look up each CVSS vector, EPSS score and whether it is in the CISA KEV catalog, then rank them and justify the order.",
        "Point OWASP ZAP (baseline scan) at DVWA or OWASP Juice Shop and sort the alerts into true and false positives."
      ]
    },
    {
      "id": 3,
      "name": "Incident response & management",
      "w": 24,
      "topics": [
        "Attack frameworks: Cyber Kill Chain, Diamond Model, MITRE ATT&CK, OWASP Testing Guide, OSSTMM",
        "IR lifecycle (NIST SP 800-61): preparation; detection and analysis; containment, eradication and recovery; post-incident activity",
        "Detection and analysis: IoCs, scoping, impact, severity and triage",
        "Evidence acquisition: order of volatility, chain of custody, legal hold, forensic imaging and hash validation",
        "Memory and disk analysis basics: Volatility, FTK Imager, Autopsy",
        "Containment strategies: isolation, segmentation, and when to watch before acting",
        "Eradication and recovery: reimaging, removing persistence, restoring from clean backups, patching the entry point",
        "Preparation: IR plan, playbooks, tools, training, tabletop exercises, out-of-band communication",
        "Post-incident activity: root cause analysis, lessons learned, updating playbooks and controls"
      ],
      "notes": ["Objectives 3.1–3.3", "NIST SP 800-61 (incident handling guide)"],
      "labs": [
        "Pick a public breach write-up (e.g. a CISA advisory) and map each attacker step to a MITRE ATT&CK technique ID using the ATT&CK Navigator.",
        "Capture RAM from a lab Windows VM with DumpIt or FTK Imager, then run Volatility 3 windows.pslist, windows.netscan and windows.malfind.",
        "Image a small USB drive with FTK Imager, record SHA-256 hashes of source and image, and fill in a one-page chain-of-custody form.",
        "Write a one-page phishing playbook covering all four NIST phases, then run it as a 30-minute tabletop with a friend or classmate."
      ]
    },
    {
      "id": 4,
      "name": "Reporting & communication",
      "w": 16,
      "topics": [
        "Vulnerability reports: affected hosts, risk scores, mitigation, recurrence, prioritization",
        "Compliance reports, action plans, exceptions and compensating controls",
        "Metrics and KPIs: trends, top 10 lists, critical vulnerabilities, zero-days, SLA compliance",
        "Stakeholder identification and communication: technical teams, system owners, executives",
        "Incident response communication: legal, HR, public relations, regulators, law enforcement, customers",
        "Incident declaration and escalation paths",
        "Incident reports: executive summary, who/what/when/where/why, timeline, impact, scope, evidence, recommendations",
        "Root cause analysis and lessons learned feeding back into reporting",
        "Response metrics: mean time to detect, respond and remediate; alert volume"
      ],
      "notes": ["Objectives 4.1–4.2", "CompTIA CS0-004 exam objectives PDF, Domain 4"],
      "labs": [
        "Turn your OpenVAS results into two reports: a one-page executive summary and a technical remediation list with hosts, CVEs and fix steps.",
        "Build a Splunk Free dashboard with open vulnerabilities by severity, remediation SLA status and MTTR over time.",
        "Write a full incident report (executive summary, timeline, scope, impact, root cause, recommendations) for the PCAP you analyzed in Domain 1."
      ]
    }
  ],

  study: {
    1: [
      ["How do you tell beaconing apart from normal traffic in a PCAP or NetFlow data?", "Look for connections to the same destination at regular intervals with similar packet sizes, often at odd hours and to rare or newly registered domains. Some jitter may be added to hide the pattern."],
      ["Why does NTP matter for a SIEM?", "Correlation depends on timestamps. If sources are not synced to a common time source, events appear out of order and timelines are wrong."],
      ["Explain STIX and TAXII in one sentence each.", "STIX is a structured language for describing threat intelligence (indicators, actors, TTPs). TAXII is the protocol used to exchange STIX data between systems."],
      ["What is the Pyramid of Pain and what does it tell a hunter?", "It ranks indicators by how hard they are for an attacker to change: hashes and IPs are trivial, domains and artifacts harder, TTPs hardest. Detecting TTPs causes attackers the most pain."],
      ["Walk through the steps of a threat hunt.", "Form a hypothesis from intel or ATT&CK, pick the data you need, search and analyze it, confirm or refute the hypothesis, then turn findings into new detections and document them."],
      ["What do SPF, DKIM and DMARC each check?", "SPF: whether the sending server is authorized for the envelope domain. DKIM: a signature proving the message was not altered and came from the signing domain. DMARC: alignment with the From domain plus the policy (none, quarantine, reject) and reporting."],
      ["When does SOAR help and when does it not?", "It helps with repetitive, well-defined tasks such as enrichment, ticketing and blocking known-bad IoCs. It does not replace analyst judgment on novel or ambiguous incidents, and bad playbooks just automate mistakes."]
    ],
    2: [
      ["Credentialed vs non-credentialed scan: when would you choose each?", "Credentialed gives an inside view with accurate patch and configuration data and fewer false positives. Non-credentialed shows what an unauthenticated attacker sees from the network."],
      ["Decode this CVSS vector: AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H.", "Network attack vector, low complexity, no privileges, no user interaction, unchanged scope, and high impact on confidentiality, integrity and availability. That is a 9.8 critical."],
      ["Beyond CVSS, what should drive prioritization?", "Whether it is being exploited (CISA KEV), likelihood of exploitation (EPSS), asset criticality and data sensitivity, exposure (internet-facing or not) and existing compensating controls."],
      ["A scanner flags a server as vulnerable, but the admin says it was patched. How do you validate?", "Check the actual package or build version and vendor advisory (backports often keep old version strings), rerun a credentialed scan, and review evidence in the finding. If patched, mark it a false positive and document why."],
      ["What can you do with a legacy system that cannot be patched?", "Apply compensating controls: segment it, restrict access with ACLs, add monitoring, remove unneeded services, and document a risk exception with an owner and review date."],
      ["Name the fix for each: SQL injection, XSS, buffer overflow, SSRF.", "SQLi: parameterized queries. XSS: output encoding plus input validation (and a CSP). Buffer overflow: bounds checking, safe functions, ASLR/DEP. SSRF: allow-list destinations and block internal/metadata addresses."],
      ["Give three inhibitors to remediation.", "Legacy or end-of-life systems, business process interruption or downtime concerns, and contractual limits such as MOUs or SLAs (also proprietary systems and organizational governance)."]
    ],
    3: [
      ["List the NIST incident response phases in order.", "Preparation; detection and analysis; containment, eradication and recovery; post-incident activity (lessons learned)."],
      ["Name the four vertices of the Diamond Model.", "Adversary, capability, infrastructure and victim."],
      ["What is the order of volatility, and why does it matter?", "Collect the most short-lived data first: CPU registers and cache, memory, network state and running processes, then disk, then remote logs and backups. Waiting or powering off destroys volatile evidence."],
      ["Why hash a forensic image?", "Hashing the source and the copy (e.g. SHA-256) proves the image is an exact copy and that the evidence has not changed since acquisition."],
      ["Containment vs eradication vs recovery: give one action for each.", "Containment: isolate the infected host. Eradication: remove malware and persistence, disable compromised accounts. Recovery: restore from a clean backup, patch, and monitor before returning to production."],
      ["What should come out of a lessons-learned meeting?", "A timeline, root cause, what worked and what didn't, and concrete actions: updated playbooks, new detections, control changes and owners with due dates."]
    ],
    4: [
      ["How does a report for executives differ from one for system administrators?", "Executives get business risk, impact, trends and decisions needed, in plain language. Administrators get affected hosts, CVEs, evidence and step-by-step remediation."],
      ["Define MTTD and MTTR.", "Mean time to detect: average time from compromise or vulnerability appearing to identification. Mean time to respond/remediate: average time from detection to containment or fix."],
      ["Which stakeholders are commonly involved in incident communication?", "Legal, HR (for insider cases), public relations, executive leadership, regulators, law enforcement and affected customers, following the IR plan's communication plan."],
      ["What belongs in an incident report?", "Executive summary; who, what, when, where, why; timeline; scope and impact; evidence; root cause; actions taken; recommendations and lessons learned."],
      ["What does a recurring vulnerability in reports usually point to?", "A process problem such as an unpatched golden image or template, missing configuration management, or a fix applied manually instead of at the source."]
    ]
  },

  final: {
    topics: ["Take two full timed 85-question practice exams", "Review every missed question by objective number", "Redo the performance-based tasks: log analysis, CVSS prioritization, IR ordering", "Reread weak objectives from the official CS0-004 PDF"],
    lab: "Do a full blue-team room end to end (TryHackMe or Blue Team Labs Online free tier): detect, investigate, contain and write the incident report."
  },

  questions: [
    ["cy1",0,1,"An analyst sees a workstation sending hundreds of DNS queries per minute to a single external domain. Each query has a long, random-looking subdomain. What is the most likely explanation?",["DNS cache poisoning","DNS tunneling used for command and control or exfiltration","Domain generation algorithm lookups against many different domains","Normal content delivery network traffic"],1,"Encoding data in long subdomains of one domain is a classic DNS tunneling pattern. A DGA produces many different domains rather than many subdomains of one.","Objective 1.2"],
    ["cy2",0,1,"NetFlow shows a host connecting to the same external IP every 60 seconds, around the clock, with nearly identical packet sizes. What does this most likely indicate?",["Beaconing to a command-and-control server","A port scan","ARP spoofing","Scheduled backup traffic"],0,"Regular intervals and uniform sizes to one destination are the signature of malware beaconing.","Objective 1.2"],
    ["cy3",0,1,"An analyst needs to know which process on a Windows endpoint opened a suspicious outbound connection. Which log source is best?",["Perimeter firewall logs","DHCP logs","Sysmon network connection events (Event ID 3)","NetFlow records"],2,"Sysmon Event ID 3 records the process image that made each network connection. Firewall and NetFlow data show IPs and ports but not the process.","Objective 1.3"],
    ["cy4",0,1,"Windows Security logs show 300 Event ID 4625 entries for one account from a single external IP, followed by an Event ID 4624 for the same account and IP. What most likely happened?",["The account lockout policy worked as designed","Privilege escalation through a service account","The attacker cleared the audit log","A password-guessing attack succeeded"],3,"4625 is a failed logon and 4624 a successful one; many failures then a success from the same source indicates a successful brute-force or guessing attack.","Objective 1.2"],
    ["cy5",0,1,"Tier 1 analysts spend most of each shift manually looking up sender reputation, URLs and attachment hashes for reported phishing emails. What is the best way to improve efficiency?",["Add more SIEM correlation rules","Hire more tier 1 analysts","Use a SOAR playbook to automate the enrichment steps","Increase log retention"],2,"Repetitive, well-defined enrichment is exactly what SOAR automation and orchestration are for.","Objective 1.5"],
    ["cy6",0,1,"A threat hunting team wants detections that will be hardest for an adversary to evade by changing their tools. What should they focus on?",["File hashes","IP addresses","Domain names","Tactics, techniques and procedures"],3,"On the Pyramid of Pain, TTPs are the hardest indicators for an attacker to change; hashes and IPs are trivial to change.","Objective 1.4"],
    ["cy7",0,1,"Two organizations want to automatically exchange threat intelligence between their platforms over HTTPS. Which standard defines the transport protocol for this?",["STIX","TAXII","OpenIOC","YARA"],1,"TAXII is the transport protocol for sharing threat intelligence; STIX is the data format being carried.","Objective 1.4"],
    ["cy8",0,1,"After reading a report that attackers in its sector are abusing built-in admin tools, a SOC decides to search its environment proactively. What should the team do first?",["Develop a hypothesis based on the threat intelligence","Wait for the SIEM to generate alerts","Reimage all administrator workstations","Run a full vulnerability scan"],0,"Threat hunting starts with a hypothesis that guides which data to collect and search.","Objective 1.4"],
    ["cy9",0,1,"EDR shows winword.exe spawning powershell.exe with the -EncodedCommand parameter shortly after a user opened an invoice attachment. What is the most likely cause?",["A normal Office update process","A malicious macro launching encoded PowerShell","A memory leak in Word","The user running a scheduled task"],1,"Office apps should not spawn PowerShell; an encoded command right after opening an attachment points to a malicious macro.","Objective 1.2"],
    ["cy10",0,1,"An analyst finds a string in a web log that appears to be Base64-encoded, gzip-compressed data. Which free tool is best suited to decode it quickly?",["Nmap","Hashcat","CyberChef","Metasploit"],2,"CyberChef chains decoding operations such as From Base64 and Gunzip in one recipe.","Objective 1.3"],
    ["cy11",0,1,"Which email authentication mechanism lets a domain owner publish a policy telling receivers to quarantine or reject messages that fail alignment checks?",["SPF","DKIM","DMARC","S/MIME"],2,"DMARC builds on SPF and DKIM, checks alignment with the From domain and publishes a none/quarantine/reject policy.","Objective 1.3"],
    ["cy12",0,1,"An analyst wants to see what a suspicious attachment does when executed, including files dropped and domains contacted, without risking production systems. What is the best approach?",["Open it on the analyst workstation with antivirus disabled","Submit only its hash to a reputation service","Detonate it in an isolated sandbox","Email it to the vendor for review"],2,"A sandbox safely observes runtime behavior. A hash lookup only helps if the file is already known.","Objective 1.3"],
    ["cy13",0,1,"While building a timeline in the SIEM, an analyst notices a firewall event appears to happen before the phishing email that caused it. What is the most likely cause?",["Log retention is too short","The SIEM license limit was reached","Verbose logging is enabled","The systems are not synchronized to a common time source"],3,"Without NTP synchronization, timestamps drift and correlated events appear out of order.","Objective 1.1"],
    ["cy14",0,1,"A company with a mostly remote workforce wants to combine SD-WAN with cloud-delivered secure web gateway, CASB and zero trust network access. Which architecture fits?",["Secure access service edge (SASE)","VLAN segmentation","Network access control","A jump box"],0,"SASE converges networking (SD-WAN) and cloud-delivered security services such as SWG, CASB and ZTNA.","Objective 1.1"],
    ["cy15",0,1,"Auditors find that 40 administrators hold permanent domain admin rights. Which control best reduces this standing privilege?",["A shared administrator account","Privileged access management with just-in-time elevation","Longer password requirements","Single sign-on"],1,"PAM with just-in-time access grants elevated rights only when needed and for a limited time.","Objective 1.1"],
    ["cy16",0,1,"At 3 a.m., a finance file server uploads 40 GB to a consumer cloud storage service it has never contacted before. Which indicator does this best match?",["Data exfiltration","Denial of service","Rogue device","Beaconing"],0,"A large, unusual outbound transfer to a new destination at an odd hour is a data exfiltration indicator.","Objective 1.2"],
    ["cy17",0,1,"A switch reports a new MAC address with an unknown vendor OUI on a conference room port. Which control would best prevent unauthorized devices from getting network access this way?",["A stronger Wi-Fi passphrase","A host-based intrusion detection system","Data loss prevention","802.1X port-based network access control"],3,"802.1X/NAC requires devices to authenticate before a wired port grants access.","Objective 1.1"],
    ["cy18",0,1,"A web server log contains the request: /products.php?id=5' OR '1'='1. Which attack is being attempted?",["Cross-site scripting","Directory traversal","SQL injection","Command injection"],2,"The quote and always-true OR condition are aimed at altering a SQL query.","Objective 1.2"],
    ["cy19",0,1,"A web server log contains GET /download?file=../../../../etc/passwd. Which attack is this?",["Server-side request forgery","XML external entity injection","Cross-site request forgery","Directory traversal"],3,"Repeated ../ sequences try to climb out of the web root to read arbitrary files.","Objective 1.2"],
    ["cy20",0,1,"On a compromised host, an analyst finds a new service and a registry Run key that both launch the same unsigned executable at startup. What attacker goal do these serve?",["Lateral movement","Persistence","Reconnaissance","Exfiltration"],1,"Services and Run keys make malware survive reboots, which is persistence.","Objective 1.2"],
    ["cy21",0,1,"A SOC receives thousands of alerts a day, and analysts close over 90% as false positives. What is the best first improvement?",["Disable the noisiest data sources in the SIEM","Forward all alerts to management","Tune the detection rules and suppress known benign activity","Lower the alert thresholds"],2,"Tuning rules to reduce false positives improves alert fidelity without losing visibility.","Objective 1.5"],
    ["cy22",0,1,"A regional hospital wants threat intelligence specific to healthcare, shared by peer organizations. Which source is best?",["The Information Sharing and Analysis Center (ISAC) for its sector","Dark web forums","A general antivirus vendor blog","Social media OSINT only"],0,"ISACs share sector-specific intelligence among member organizations.","Objective 1.4"],
    ["cy23",0,1,"An investigation finds that attackers used custom malware, stayed hidden in a defense contractor's network for 14 months and quietly stole engineering designs. Which threat actor type is most likely?",["Script kiddie","Hacktivist","Nation-state advanced persistent threat","Unintentional insider"],2,"Long dwell time, custom tooling and theft of defense IP are hallmarks of a well-resourced nation-state APT.","Objective 1.4"],
    ["cy24",0,1,"A paid intelligence feed delivers indicators that are months old, and most of the IPs are no longer malicious by the time they arrive. Which quality attribute is the feed failing on?",["Relevancy","Confidence level","Accuracy of attribution","Timeliness"],3,"Intelligence that arrives after it is useful fails on timeliness.","Objective 1.4"],
    ["cy25",0,1,"An analyst wants to review SSH login attempts on an Ubuntu server. Which file should they check first?",["/var/log/auth.log","/etc/shadow","/var/log/dmesg","/etc/hosts"],0,"On Debian and Ubuntu, authentication events including SSH logins are written to /var/log/auth.log.","Objective 1.3"],
    ["cy26",0,1,"Task Manager shows svchost.exe running from C:\\Users\\Public\\ rather than C:\\Windows\\System32. What is the most likely explanation?",["Normal Windows behavior","A driver update in progress","A corrupted page file","Malware masquerading as a legitimate system process"],3,"The real svchost.exe runs from System32; the same name in a user-writable folder is a masquerading indicator.","Objective 1.2"],
    ["cy27",0,1,"A SOC starts using an AI assistant to summarize alerts and suggest next steps. Which practice is most appropriate?",["Let it close alerts automatically with no human review","Verify its conclusions against the underlying logs before acting","Paste full customer records into any public chatbot for better context","Turn off logging of the assistant's actions"],1,"AI output can be wrong, so analysts must validate it against source data; sensitive data should not go to unapproved tools.","Objective 1.5"],

    ["cy28",0,2,"A team wants the most accurate list of missing patches and weak configurations on its Windows servers, with the fewest false positives. Which scan should it run?",["Non-credentialed external scan","Credentialed scan","Passive network monitoring only","Ping sweep"],1,"Credentialed scans log in and read installed versions and settings directly, which improves accuracy.","Objective 2.1"],
    ["cy29",0,2,"Most employees use laptops that are rarely on the corporate network. Which scanning approach gives the best coverage?",["Agent-based scanning","Agentless scanning from headquarters","External perimeter scanning","Quarterly manual review"],0,"Agents scan locally and report in whenever the device has internet access, even off the corporate network.","Objective 2.1"],
    ["cy30",0,2,"A manufacturer needs to find vulnerabilities on PLCs in a live production network where a crash would halt the line. What is the best approach?",["Aggressive active scan during production hours","Fuzzing the PLCs","Passive discovery and monitoring","Running exploit modules to confirm findings"],2,"OT devices can fail under active scanning, so passive techniques are preferred in production.","Objective 2.1"],
    ["cy31",0,2,"A finding has the CVSS vector AV:N/AC:L/PR:N/UI:N. What does this tell the analyst?",["It requires physical access and a logged-in user","It can only be exploited from the local subnet by an admin","It needs a user to click a link but no privileges","It can be exploited remotely, with low complexity, no privileges and no user interaction"],3,"AV:N is network, AC:L low complexity, PR:N no privileges, UI:N no user interaction.","Objective 2.3"],
    ["cy32",0,2,"Two vulnerabilities both score CVSS 9.8. One is on an internet-facing VPN appliance and listed in the CISA KEV catalog; the other is on an isolated lab host. Which should be remediated first?",["The lab host, because it is easier to patch","Both at the same time in alphabetical order","The VPN appliance listed in the KEV catalog","Neither until the next quarterly window"],2,"Known exploitation plus internet exposure makes the VPN appliance the higher real-world risk.","Objective 2.3"],
    ["cy33",0,2,"A scanner flags an Apache vulnerability on a RHEL server based on the version banner. The admin shows that Red Hat backported the fix into the installed package. How should the finding be classified?",["True positive","False positive","False negative","True negative"],1,"The scanner reported a vulnerability that is not actually present, which is a false positive.","Objective 2.2"],
    ["cy34",0,2,"A legacy medical device runs an unsupported OS that the vendor will not allow to be patched. What is the best action?",["Segment the device and restrict access to it as a compensating control","Accept the risk with no documentation","Exclude the device from future scans","Disable logging to improve performance"],0,"When patching isn't possible, compensating controls such as segmentation and access restrictions reduce risk; the exception should be documented.","Objective 2.5"],
    ["cy35",0,2,"Which scoring system estimates the probability that a vulnerability will be exploited in the wild in the next 30 days?",["CVSS base score","EPSS","CWE","CPE"],1,"The Exploit Prediction Scoring System (EPSS) estimates exploitation likelihood; CVSS measures severity.","Objective 2.3"],
    ["cy36",0,2,"A development team wants to find vulnerabilities by analyzing source code without running the application. Which technique should it use?",["Dynamic application security testing","Fuzzing","Static application security testing","Penetration testing"],2,"SAST analyzes code at rest; DAST and fuzzing test a running application.","Objective 2.2"],
    ["cy37",0,2,"An nmap -sV scan of a network switch shows 23/tcp open telnet. What should the analyst recommend?",["Change the telnet port to 2323","Add a login banner","Block ICMP to the switch","Disable telnet and manage the switch over SSH"],3,"Telnet sends credentials in cleartext; SSH provides encrypted management.","Objective 2.2"],
    ["cy38",0,2,"A company wants continuous checks for misconfigurations such as publicly readable storage buckets and overly permissive security groups across its cloud accounts. Which tool fits best?",["Cloud security posture management (CSPM)","Web application firewall","Host-based intrusion detection","An OT protocol scanner"],0,"CSPM tools continuously assess cloud configurations against best practices.","Objective 2.2"],
    ["cy39",0,2,"A critical patch is ready, but the business owner refuses to install it during quarter-end close because any downtime would delay financial reporting. What does this represent?",["A false positive","Risk transference","A zero-day vulnerability","An inhibitor to remediation due to business process interruption"],3,"Concern about disrupting business processes is a common inhibitor to remediation.","Objective 2.5"],
    ["cy40",0,2,"A DAST scan confirms stored cross-site scripting in a blog's comment field. What is the best mitigation?",["Enable TLS on the site","Implement account lockout","Apply output encoding and validate input","Use parameterized queries"],2,"Encoding output (and validating input) prevents injected script from executing in browsers. Parameterized queries address SQL injection.","Objective 2.4"],
    ["cy41",0,2,"A code review finds a login query built by concatenating user input into a SQL string. What is the most effective fix?",["Hide error messages from users","Use parameterized queries (prepared statements)","Encode the output as HTML","Move the database to a separate server"],1,"Parameterized queries keep user input as data so it can't change the SQL statement.","Objective 2.4"],
    ["cy42",0,2,"A web app fetches any URL a user supplies. A tester makes it request http://169.254.169.254/latest/meta-data/ and gets cloud credentials back. Which vulnerability is this?",["Cross-site request forgery","XML external entity injection","Insecure direct object reference","Server-side request forgery"],3,"The server is tricked into requesting an internal resource (the cloud metadata service), which is SSRF.","Objective 2.4"],
    ["cy43",0,2,"A user changes the URL from /account?id=1001 to /account?id=1002 and sees another customer's billing details. Which vulnerability is this?",["Insecure direct object reference","Buffer overflow","Race condition","Session fixation"],0,"The app exposes objects by ID without checking authorization, which is IDOR (broken access control).","Objective 2.4"],
    ["cy44",0,2,"Which pair of operating system protections makes exploiting a buffer overflow harder?",["Address space layout randomization and data execution prevention","Input masking and autocomplete","Code signing and certificate pinning","SPF and DKIM"],0,"ASLR randomizes memory locations and DEP blocks code execution from data regions.","Objective 2.4"],
    ["cy45",0,2,"After reviewing ransomware risk, leadership buys a cyber insurance policy. Which risk response is this?",["Acceptance","Avoidance","Mitigation","Transference"],3,"Insurance shifts financial impact to a third party, which is risk transference.","Objective 2.5"],
    ["cy46",0,2,"Weekly vulnerability scans are slowing production databases during business hours. What is the best change?",["Stop scanning the databases","Switch to annual scans","Schedule scans off-hours and throttle scan intensity","Scan only from outside the firewall"],2,"Scheduling and throttling keeps coverage while reducing operational impact.","Objective 2.1"],
    ["cy47",0,2,"A team needs to find known-vulnerable open-source libraries pulled into its application through dependencies. Which tool type is best?",["Software composition analysis","Static application security testing","Web application firewall","Data loss prevention"],0,"SCA inventories third-party components and matches them against known vulnerabilities.","Objective 2.2"],
    ["cy48",0,2,"A web scan reports that the session cookie lacks the Secure and HttpOnly flags. What is the best recommendation?",["Shorten the cookie name","Set the Secure and HttpOnly flags so the cookie is sent only over HTTPS and not readable by scripts","Store the session ID in the URL instead","Disable cookies site-wide"],1,"Secure stops the cookie going over plain HTTP; HttpOnly stops JavaScript (for example XSS) from reading it.","Objective 2.4"],

    ["cy49",0,3,"An attacker emails a malicious attachment to targeted employees. Which Cyber Kill Chain phase is this?",["Reconnaissance","Weaponization","Delivery","Exploitation"],2,"Transmitting the weapon to the target (email, USB, web) is the delivery phase.","Objective 3.1"],
    ["cy50",0,3,"An analyst documents the attacker's command-and-control servers and domains. In the Diamond Model, which feature do these belong to?",["Adversary","Capability","Victim","Infrastructure"],3,"C2 servers and domains are infrastructure; malware and exploits are capability.","Objective 3.1"],
    ["cy51",0,3,"An analyst wants to label observed credential dumping from LSASS with a standard technique ID to compare against detection coverage. Which framework should they use?",["MITRE ATT&CK","OWASP Testing Guide","NIST Cybersecurity Framework","Cyber Kill Chain"],0,"ATT&CK catalogs adversary techniques with IDs, such as T1003 for OS credential dumping.","Objective 3.1"],
    ["cy52",0,3,"After isolating an infected host, the team removes the malware, deletes the attacker's backdoor account and removes the scheduled task it created. Which phase is this?",["Containment","Eradication","Recovery","Preparation"],1,"Removing the threat and its persistence is eradication.","Objective 3.2"],
    ["cy53",0,3,"Ransomware is actively encrypting file shares from several workstations on one floor. What should the responders do first?",["Pay the ransom to stop the spread","Power off every server company-wide","Start restoring from backup onto the infected hosts","Isolate the affected hosts from the network"],3,"Isolation contains the spread while keeping evidence; restoring before containment risks reinfection.","Objective 3.2"],
    ["cy54",0,3,"A responder can collect only one source before a compromised server is shut down. Following the order of volatility, which should they collect?",["Hard disk image","Memory (RAM)","Backup tapes","Archived logs on the SIEM"],1,"RAM is lost at power-off, while disk, backups and remote logs persist.","Objective 3.2"],
    ["cy55",0,3,"What is the main purpose of a chain of custody form?",["To record who handled evidence, when and why, so its integrity can be shown","To encrypt evidence at rest","To list the incident's root cause","To notify customers of a breach"],0,"Chain of custody documents every transfer and access so evidence remains trustworthy and admissible.","Objective 3.2"],
    ["cy56",0,3,"After creating a forensic image of a laptop drive, how should the investigator prove the image is an exact copy?",["Compare the file counts","Check the drive's serial number","Compare SHA-256 hashes of the original drive and the image","Open several files and compare them visually"],2,"Matching cryptographic hashes show the image is bit-for-bit identical to the source.","Objective 3.2"],
    ["cy57",0,3,"Two weeks after an incident closes, the team meets to review the timeline, identify what went wrong and update the playbooks. Which phase is this?",["Preparation","Detection and analysis","Containment","Post-incident activity"],3,"Lessons learned and improvements happen in post-incident activity.","Objective 3.3"],
    ["cy58",0,3,"The IR team runs a tabletop exercise walking through a simulated data breach with leadership. Which phase does this support?",["Preparation","Detection and analysis","Eradication","Recovery"],0,"Training and exercises before an incident happens are part of preparation.","Objective 3.3"],
    ["cy59",0,3,"After confirming one infected laptop, an analyst searches EDR telemetry for the same malware hash and C2 domain across all endpoints. What is the main goal?",["Eradicate the malware","Determine the scope of the incident","Complete the lessons-learned report","Notify regulators"],1,"Hunting for the same IoCs across the environment establishes how far the incident has spread.","Objective 3.2"],
    ["cy60",0,3,"Legal counsel expects a lawsuit over an incident. What ensures relevant emails and logs are not deleted by normal retention policies?",["A legal hold","A data retention purge","A chain of custody form","A right-to-erasure request"],0,"A legal hold suspends normal deletion so relevant data is preserved.","Objective 3.2"],
    ["cy61",0,3,"Before returning a server restored from backup to production after a ransomware attack, what should the team confirm?",["That the server has a new hostname","That the ransom note was deleted","That the backup predates the compromise and the entry point has been fixed","That antivirus was reinstalled from the same backup"],2,"Restoring a backup that contains the attacker's foothold, or leaving the entry point open, invites reinfection.","Objective 3.2"],
    ["cy62",0,3,"After an incident, the team determines the attacker first got in through an unpatched VPN appliance. What activity is this?",["Containment","Triage","Root cause analysis","Threat modeling"],2,"Identifying the underlying cause of the incident is root cause analysis, done in post-incident activity.","Objective 3.3"],
    ["cy63",0,3,"In the final stage of an intrusion, the attacker compresses and exfiltrates customer databases. Which Cyber Kill Chain phase is this?",["Installation","Actions on objectives","Command and control","Delivery"],1,"Achieving the attacker's goal, such as data theft, is actions on objectives.","Objective 3.1"],
    ["cy64",0,3,"Responders suspect a skilled attacker would notice an abrupt disconnect. They move the compromised host to a restricted, heavily monitored VLAN to limit damage while gathering intelligence. Which approach is this?",["Containment through segmentation","Eradication","Recovery","Reverse engineering"],0,"Segmentation limits what the host can reach while allowing monitoring, which is a containment strategy.","Objective 3.2"],
    ["cy65",0,3,"During an incident, responders believe the attacker can read corporate email. How should the IR team coordinate?",["Continue using corporate email but mark messages urgent","Post updates in the company-wide chat","Wait until the attacker is removed before communicating","Use a pre-arranged out-of-band communication channel"],3,"If normal channels may be compromised, the IR plan should specify a separate, out-of-band channel.","Objective 3.3"],
    ["cy66",0,3,"An analyst has a memory dump from a compromised Windows host and wants to list processes, network connections and injected code. Which tool fits?",["Nessus","Nmap","Burp Suite","Volatility"],3,"Volatility is a memory forensics framework with plugins such as pslist, netscan and malfind.","Objective 3.2"],
    ["cy67",0,3,"Which document gives responders step-by-step actions for one specific incident type, such as a phishing report?",["Acceptable use policy","Playbook","Business impact analysis","Service level agreement"],1,"Playbooks are scenario-specific procedures created during preparation.","Objective 3.3"],

    ["cy68",0,4,"The CISO asks for a quarterly vulnerability report for the board. What should it emphasize?",["Full raw scanner output for every host","Plugin IDs and port numbers","Business risk, trends over time and decisions or resources needed","Command-line remediation steps"],2,"Executives need risk in business terms and trends, not technical detail.","Objective 4.1"],
    ["cy69",0,4,"Which metric shows how long, on average, critical vulnerabilities stay open after they are found?",["Mean time to detect","Mean time to remediate","Number of scans completed","Scanner false positive rate"],1,"Mean time to remediate measures the average time from discovery to fix.","Objective 4.1"],
    ["cy70",0,4,"Leadership wants to know the average time between an attacker's initial compromise and the SOC identifying it. Which metric is this?",["Recovery time objective","Recovery point objective","Mean time to respond","Mean time to detect"],3,"Mean time to detect measures how quickly incidents are identified.","Objective 4.2"],
    ["cy71",0,4,"An investigation shows an employee may have deliberately copied customer data before resigning. Besides legal, which stakeholder should be involved?",["Human resources","Marketing","Facilities","Vendor sales"],0,"Insider cases involve employment actions, so HR must be part of the communication.","Objective 4.2"],
    ["cy72",0,4,"A breach exposed customer PII from several states. Who should determine whether regulators and customers must be notified?",["The tier 1 analyst who found it","Legal counsel and compliance","The help desk","Network engineering"],1,"Legal and compliance interpret notification laws and regulatory obligations.","Objective 4.2"],
    ["cy73",0,4,"A reporter calls a SOC analyst asking about a rumored breach. What should the analyst do?",["Confirm the details to prevent rumors","Deny any incident occurred","Refer the reporter to the designated public relations contact","Share the incident timeline off the record"],2,"Media communication goes through PR or a designated spokesperson so the organization speaks with one accurate voice.","Objective 4.2"],
    ["cy74",0,4,"A system owner cannot patch a critical vulnerability for six months because of a vendor dependency. What should the vulnerability report record?",["Mark the finding as a false positive","Remove the finding from the report","Lower the CVSS score","A documented exception with compensating controls, an owner and an expiry date"],3,"Exceptions must be formally recorded with the controls in place and a review date so the risk stays visible.","Objective 4.1"],
    ["cy75",0,4,"What belongs in the executive summary of an incident report?",["A short account of what happened, the business impact, current status and key recommendations","Full packet captures","Every command the responders ran","Raw SIEM queries"],0,"The executive summary gives decision-makers the essentials; technical detail goes in later sections or appendices.","Objective 4.2"],
    ["cy76",0,4,"Monthly reports show the same OpenSSL vulnerability reappearing on newly built virtual machines even after each is patched. What should the analyst recommend?",["Stop scanning new VMs","Raise the severity threshold for reporting","Update the golden image or template used to build the VMs","Patch each VM faster after deployment"],2,"Recurrence on new builds points to a vulnerable base image; fixing it at the source stops recurrence.","Objective 4.1"],
    ["cy77",0,4,"Policy requires critical vulnerabilities to be fixed within 15 days. A dashboard shows 40% of criticals exceeded that window last quarter. What is this dashboard measuring?",["Mean time to detect","Compliance with remediation SLAs","Scanner coverage","Risk acceptance rate"],1,"Tracking fixes against a required time window is SLA compliance.","Objective 4.1"],
    ["cy78",0,4,"Why should the final incident report include the root cause and recommendations?",["To help prevent the same incident from happening again","To assign blame to individual employees","To satisfy the SIEM license terms","To replace the chain of custody documentation"],0,"Root cause and recommendations drive the fixes and control changes that prevent recurrence.","Objective 4.2"],
    ["cy79",0,4,"A tier 1 analyst confirms that a server is actively being exploited. According to a typical IR plan, what should happen next?",["Post the details on the company intranet","Email all employees about the attack","Wait until the end of the shift to write it up","Escalate to the incident response lead through the defined escalation path"],3,"Incident declaration and escalation should follow the IR plan's defined path so the right people act quickly.","Objective 4.2"],
    ["cy80",0,4,"The system administrators who will fix findings receive a vulnerability report. What do they need most?",["Only an overall risk grade","Affected hosts, CVE IDs, evidence and remediation steps","Projected impact on the stock price","A list of every scan ever run"],1,"Technical audiences need actionable details to remediate each finding.","Objective 4.1"]
  ]
});
