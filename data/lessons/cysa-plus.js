/* Lessons for CompTIA CySA+ (CS0-004): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("cysa-plus", [
 {
  "t": "System and network architecture: on-prem, cloud, hybrid, serverless, containers, segmentation, zero trust, SASE",
  "body": [
   "As a security analyst you defend whatever architecture the organization actually runs, and each one changes where your logs come from, who is responsible for what, and where an attacker can move. The CySA+ exam expects you to recognize the common models and reason about their security trade-offs rather than configure them in detail.",
   "An on-premises environment is one where the organization owns the hardware, the network and the data center, so it also owns every layer of security, from physical locks to patching. Cloud environments split that work under the shared responsibility model: the provider secures the underlying facilities and hardware, while the customer always remains responsible for its data, identities and configuration. How much else the customer handles depends on the service model: Infrastructure as a Service (IaaS) leaves the operating system to you, Platform as a Service (PaaS) hides it, and Software as a Service (SaaS) leaves you mainly with accounts, data and settings. A hybrid environment mixes on-prem and cloud, which usually means two sets of controls, two logging pipelines and identity that has to be synchronized between them.",
   "Serverless computing (for example, functions that run only when triggered) removes the server you would normally harden. You cannot install an agent on it, so visibility comes from the provider's logs, and the main risks move to overly broad permissions, insecure event inputs and vulnerable code dependencies. Containers package an application with its libraries and share the host's kernel. They start fast and are easy to replace, but a vulnerable base image gets copied everywhere, a container running with excessive privileges can threaten the host, and short-lived containers may disappear before you collect evidence. Image scanning, minimal base images and orchestration logging are the usual controls.",
   "Segmentation divides a network into zones so that a compromise in one zone does not give access to everything. It can be done with VLANs (virtual local area networks) and firewalls between them, with a screened subnet (DMZ) for internet-facing servers, or with microsegmentation, which applies policy down to individual workloads. Good segmentation limits lateral movement and makes unusual traffic between zones stand out in your monitoring.",
   "Zero trust drops the idea that anything inside the network perimeter is trustworthy. Every request is authenticated, authorized and evaluated in context (user, device health, location, sensitivity of the resource) each time, and access is granted with least privilege. The architecture separates a control plane, where a policy engine and policy administrator make decisions, from a data plane, where policy enforcement points allow or block traffic. Secure Access Service Edge (SASE) delivers networking and security as a cloud service close to the user: it combines software-defined WAN with services such as secure web gateway, cloud access security broker, firewall as a service and zero trust network access. It suits organizations whose users and applications are no longer inside one office network."
  ],
  "terms": [
   [
    "Shared responsibility model",
    "The division of security duties between a cloud provider and its customer, which shifts with IaaS, PaaS and SaaS."
   ],
   [
    "Microsegmentation",
    "Fine-grained segmentation that applies access policy to individual workloads or applications rather than whole subnets."
   ],
   [
    "Zero trust",
    "A security model that never grants trust based on network location and verifies every access request explicitly with least privilege."
   ],
   [
    "SASE",
    "Secure Access Service Edge: cloud-delivered networking (SD-WAN) combined with security services such as SWG, CASB, FWaaS and ZTNA."
   ],
   [
    "Policy enforcement point",
    "The zero trust component in the data path that allows, blocks or ends a session based on the policy engine's decision."
   ]
  ],
  "example": "A retailer moves its web store to containers in the cloud while payroll stays on-prem. The analyst notices that a compromised container could reach the payroll database because the VPN between sites allows all traffic. The fix is to segment the link so only the specific API port is allowed and to require device and user checks through a zero trust access broker.",
  "tip": "When a question describes remote users and cloud apps with no central office and asks for combined networking and security from the cloud, the answer is SASE; when it stresses verifying every request regardless of location, the answer is zero trust.",
  "check": [
   [
    "In an IaaS deployment, who is responsible for patching the guest operating system?",
    "The customer. The provider secures the physical hosts and hypervisor, but the OS and everything above it belong to the customer in IaaS."
   ],
   [
    "Why do serverless functions change how you monitor for threats?",
    "There is no server to install an agent on, so you depend on the provider's logs and focus on permissions, inputs and code dependencies instead of host-based monitoring."
   ],
   [
    "What problem does microsegmentation solve that a flat network does not?",
    "It restricts lateral movement by applying policy to individual workloads, so one compromised system cannot freely reach others."
   ]
  ]
 },
 {
  "t": "Identity and access: MFA, SSO, federation, PAM, just-in-time access, CASB",
  "body": [
   "Most modern intrusions involve stolen or misused credentials, so identity is often called the new perimeter. As an analyst you need to know how identity controls work, which logs they produce and which weaknesses attackers target.",
   "Multifactor authentication (MFA) requires factors from at least two different categories: something you know (a password or PIN), something you have (a phone, hardware token or smart card) and something you are (a fingerprint or face). Two passwords are still one factor. Not all MFA is equal: codes sent by SMS can be intercepted through SIM swapping, and push notifications can be abused by MFA fatigue, where an attacker who already has the password sends repeated prompts until the user approves one. Phishing-resistant methods such as FIDO2 security keys or passkeys bind the login to the real site, so a fake site cannot relay them. In logs, watch for many denied push prompts followed by an approval, or MFA registrations from new devices.",
   "Single sign-on (SSO) lets a user authenticate once and reach many applications. Federation extends that trust across organizations or domains: an identity provider (IdP) authenticates the user and sends a signed assertion or token to a service provider (SP), which trusts the IdP instead of storing its own passwords. SAML (Security Assertion Markup Language) is common for enterprise web apps, OAuth 2.0 handles delegated authorization, and OpenID Connect adds an authentication layer on top of OAuth. SSO reduces password reuse and centralizes logging and account disabling, but it also makes the IdP a high-value target, because one stolen session can open many doors.",
   "Privileged access management (PAM) protects administrator, root and service accounts. A PAM system vaults credentials, rotates them, requires check-out with approval, records privileged sessions and can hand out credentials without revealing them to the user. Just-in-time (JIT) access goes further: instead of standing admin rights, a user requests elevation for a specific task and time window, and the rights are removed automatically afterward. Fewer permanent admins means fewer accounts an attacker can steal for full control.",
   "A cloud access security broker (CASB) sits between users and cloud services to give visibility and control. It can discover shadow IT (unsanctioned apps), enforce policies such as blocking uploads of sensitive data, detect risky behavior and check compliance. CASBs work through API connections to sanctioned services, through inline proxies, or both.",
   "For the exam, connect each control to its threat: MFA against password theft, SSO and federation against password sprawl, PAM and JIT against privilege abuse and lateral movement, and CASB against data leaving through cloud apps."
  ],
  "terms": [
   [
    "MFA fatigue",
    "An attack that floods a user with push approval requests until they accept one out of annoyance or confusion."
   ],
   [
    "Federation",
    "A trust relationship in which a service provider accepts authentication assertions from an external identity provider."
   ],
   [
    "PAM",
    "Privileged access management: tools and processes that vault, rotate, approve and record use of administrative credentials."
   ],
   [
    "Just-in-time access",
    "Granting elevated privileges only for a limited time and task, then revoking them automatically."
   ],
   [
    "CASB",
    "Cloud access security broker: a control point that provides visibility, data protection and policy enforcement for cloud service use."
   ]
  ],
  "example": "An analyst sees 25 declined MFA push prompts for a finance user between 2 and 3 a.m., then one approval, then a mailbox rule forwarding invoices externally. The account is disabled, sessions revoked, the password reset, and the organization moves finance staff to number-matching or FIDO2 keys to stop fatigue attacks.",
  "tip": "Know the difference between authentication (OpenID Connect, SAML) and authorization (OAuth). If a question asks for a way to eliminate standing admin rights, choose just-in-time access rather than simply adding MFA.",
  "check": [
   [
    "Is a password plus a security question multifactor authentication? Why?",
    "No. Both are something you know, so it is a single factor used twice."
   ],
   [
    "What does a CASB help an organization discover?",
    "Shadow IT, meaning cloud applications employees use without approval, plus risky data movement into cloud services."
   ],
   [
    "How does just-in-time access reduce risk compared with permanent admin accounts?",
    "Privileges exist only briefly for an approved task, so there are fewer standing privileged credentials for an attacker to steal and abuse."
   ]
  ]
 },
 {
  "t": "Logging: log ingestion, time synchronization (NTP), log levels, Windows Event IDs, Sysmon, Linux auth logs",
  "body": [
   "Logs are the analyst's primary evidence. If a system does not log an event, or the log never reaches your central platform, you cannot detect or investigate it. CySA+ expects you to know how logs are collected, why their timestamps must agree, and which specific events matter.",
   "Log ingestion is the process of collecting logs from sources (servers, firewalls, endpoints, cloud services) and bringing them into a central store such as a SIEM. Sources may push events via syslog, agents or forwarders, or the platform may pull them through APIs. During ingestion, logs are parsed and normalized so that fields like source IP and username mean the same thing across vendors. Centralizing logs also protects them, because an attacker who clears local logs cannot easily erase the copy already sent away.",
   "Time synchronization is essential for correlation. If a firewall is three minutes ahead of a domain controller, a timeline built from both will show events in the wrong order. The Network Time Protocol (NTP) keeps clocks aligned to a reliable time source, and best practice is to record timestamps in UTC (Coordinated Universal Time) or with an explicit time zone offset. Syslog also defines severity levels from 0 to 7: emergency, alert, critical, error, warning, notice, informational and debug. Lower numbers are more severe. Logging only high severities saves storage but can hide useful detail; debug is rarely left on in production.",
   "On Windows, the Security log records key events by ID. Memorize these: 4624 successful logon, 4625 failed logon, 4634 or 4647 logoff, 4648 logon with explicit credentials, 4672 special privileges assigned to a new logon (an admin-level logon), 4688 new process created, 4720 user account created, 4728 or 4732 member added to a security group, 4740 account locked out, 7045 new service installed (System log) and 1102 audit log cleared. A burst of 4625 events followed by a 4624 suggests a successful password guessing attack; a 1102 is always worth investigating.",
   "Sysmon (System Monitor) is a free Microsoft Sysinternals tool that adds much richer endpoint telemetry to the Windows event log. Its event ID 1 records process creation with command line, hashes and parent process; ID 3 records network connections; ID 7 image loads; ID 8 CreateRemoteThread; ID 10 process access (for example, a tool reading LSASS memory); ID 11 file creation; IDs 12 to 14 registry events; and ID 22 DNS queries. You control what it records with an XML configuration file.",
   "On Linux, authentication events go to `/var/log/auth.log` on Debian and Ubuntu or `/var/log/secure` on Red Hat family systems, and on systemd hosts you can also query the journal with `journalctl`. Look for lines such as `Failed password for invalid user` from sshd, `Accepted publickey`, and `sudo` entries showing which command a user ran as root. The `last` and `lastb` commands summarize successful and failed logins."
  ],
  "terms": [
   [
    "NTP",
    "Network Time Protocol: synchronizes system clocks so that timestamps from different devices can be correlated accurately."
   ],
   [
    "Normalization",
    "Converting logs from different formats into common field names and structures during ingestion."
   ],
   [
    "Event ID 4625",
    "Windows Security log event recording a failed logon attempt."
   ],
   [
    "Sysmon",
    "A Sysinternals service that logs detailed process, network, file and registry activity to the Windows event log."
   ],
   [
    "auth.log / secure",
    "Linux log files that record authentication activity such as SSH logins and sudo use."
   ]
  ],
  "example": "During a password-spraying investigation, an analyst finds hundreds of 4625 events across many accounts from one IP, then a 4624 logon type 10 (remote interactive) for one account. Because the VPN appliance's clock was not using NTP, its entries were eight minutes off, and the analyst had to correct for that before proving the VPN session came from the same IP.",
  "tip": "Expect questions that give you an event ID and ask what happened. 4624 success, 4625 failure, 4688 process creation, 4720 account created, 1102 log cleared, and Sysmon 1 process creation and 3 network connection are the most tested.",
  "check": [
   [
    "Why is NTP important for incident investigation?",
    "It keeps clocks consistent so that events from different systems can be correlated into an accurate timeline."
   ],
   [
    "Which Windows event ID indicates that the Security audit log was cleared?",
    "Event ID 1102, which often signals an attacker covering their tracks."
   ],
   [
    "Where would you look for SSH login failures on an Ubuntu server?",
    "In /var/log/auth.log (or via journalctl for the ssh service)."
   ]
  ]
 },
 {
  "t": "Network indicators: beaconing, unusual bandwidth, irregular peer-to-peer traffic, rogue devices, scans, unexpected ports",
  "body": [
   "Network indicators are patterns in traffic that suggest compromise. They matter because malware almost always has to talk to someone: to receive commands, spread, or send data out. You find them in firewall logs, NetFlow records, proxy and DNS logs, and packet captures.",
   "Beaconing is regular outbound communication from an infected host to a command-and-control (C2) server, checking in for instructions. The classic sign is connections to the same destination at a steady interval, such as every 60 seconds, often with similar packet sizes, and continuing overnight when no user is working. Attackers add jitter (random variation in timing) to hide the pattern, so analysts look at the distribution of intervals, the rarity of the destination across the organization, and odd user agents or long, random-looking DNS names.",
   "Unusual bandwidth consumption can mean data exfiltration, a denial-of-service attack, or an infected host used for illegitimate purposes. Compare against a baseline: a workstation that normally uploads a few megabytes a day and suddenly sends several gigabytes to a cloud storage provider at midnight deserves a look. The direction matters. Large inbound transfers are normal for downloads; large outbound transfers from a server or user machine are more suspicious.",
   "Irregular peer-to-peer (P2P) traffic is direct communication between clients rather than client-to-server. In a corporate network, workstations rarely need to talk to each other directly, so workstation-to-workstation SMB, RDP or WinRM traffic may indicate lateral movement or a worm. External P2P can mean file sharing or botnets that use P2P for C2.",
   "Rogue devices are unauthorized hardware on the network: an unknown laptop, a personal wireless access point plugged into a wall jack, or a rogue DHCP server handing out a malicious gateway. Detection methods include comparing DHCP leases and MAC addresses against the asset inventory, wireless surveys, switch port monitoring and network access control (NAC), which checks devices before admitting them.",
   "Scans and sweeps show up as one source contacting many ports on one host (a port scan) or one port across many hosts (a sweep). Internally, a scan from a user workstation is a strong sign of an attacker doing discovery. Unexpected ports are services listening or communicating where they should not, such as a workstation listening on a high port, outbound traffic on port 4444, or HTTPS-like traffic on a nonstandard port. Remember that a port number alone does not prove what protocol is in use; attackers often run C2 over 443 to blend in, so inspect the traffic itself when possible."
  ],
  "terms": [
   [
    "Beaconing",
    "Periodic outbound connections from a compromised host to a C2 server to receive instructions."
   ],
   [
    "Jitter",
    "Random variation added to beacon intervals to make C2 traffic harder to spot."
   ],
   [
    "Rogue device",
    "Any unauthorized device connected to the network, such as an unapproved access point or DHCP server."
   ],
   [
    "Port scan",
    "Probing many ports on a target to discover which services are listening."
   ],
   [
    "NetFlow",
    "Metadata records of network conversations (who talked to whom, when, how much) without full packet contents."
   ]
  ],
  "example": "Reviewing proxy logs, an analyst sees a laptop contacting an unfamiliar domain every 300 seconds, plus or minus 10, for three days, including weekends, with the same small response size. No other host in the company visits the domain. The laptop is isolated and EDR finds a scheduled task launching an unknown executable.",
  "tip": "Regular intervals to one rare destination point to beaconing; one source touching many internal hosts on the same port points to a sweep or lateral movement; large outbound volume at odd hours points to exfiltration.",
  "check": [
   [
    "What characteristics distinguish beaconing from normal browsing?",
    "Consistent intervals, similar packet sizes, a rare destination and activity that continues when no user is active."
   ],
   [
    "Why is workstation-to-workstation SMB traffic suspicious in many enterprises?",
    "Workstations usually talk to servers, not each other, so direct SMB between them can indicate lateral movement or a worm."
   ],
   [
    "How can an analyst detect a rogue DHCP server?",
    "By spotting DHCP offers from an unauthorized IP or MAC, clients receiving unexpected gateways, or using switch features and NAC that flag unauthorized servers."
   ]
  ]
 },
 {
  "t": "Host indicators: unusual processes, masquerading binaries, unauthorized software, persistence (services, scheduled tasks, run keys)",
  "body": [
   "Host indicators are signs of compromise on an individual endpoint or server. Where network indicators tell you something is talking, host indicators tell you what is running, how it got there and how it survives a reboot. EDR tools, Sysmon, and built-in commands are your main sources.",
   "Unusual processes stand out by their name, location, parent, user or behavior. Parent-child relationships are especially telling: Microsoft Word spawning `powershell.exe` or `cmd.exe` suggests a malicious macro, and a web server process spawning a shell suggests a web shell. Other red flags include processes running from temporary or user-writable folders, processes with no description or signature, encoded command lines, and unexpected high CPU use, which can indicate cryptomining. On Windows you can inspect processes with Task Manager, Process Explorer or `tasklist`; on Linux with `ps aux` and `top`.",
   "Masquerading is when malware disguises itself as a legitimate program. Common tricks include using a real system name in the wrong folder (a legitimate `svchost.exe` lives in System32 and is launched by `services.exe`, not from a user's AppData), slightly misspelled names such as `scvhost.exe`, double extensions like `invoice.pdf.exe`, and renamed copies of legitimate admin tools. Checking the file path, digital signature, hash and parent process usually exposes it.",
   "Unauthorized software is anything not approved for the environment: remote access tools, password crackers, hacking utilities, or simply unlicensed apps. It may be installed by an attacker, or by a user who created risk without malice. Application allow listing and software inventory tools help detect and prevent it.",
   "Persistence is how an attacker keeps access after reboots or logoffs. On Windows the most common mechanisms are new services (System log event 7045, Security event 4697), scheduled tasks (event 4698 when task auditing is enabled; list them with `schtasks /query`), and Run keys in the registry, such as `HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run` and the matching `HKCU` key, which launch programs at logon. Other options include startup folders, WMI event subscriptions and new accounts. On Linux, look at cron jobs, systemd service units, shell profile files and unauthorized SSH keys in `authorized_keys`. The Sysinternals Autoruns tool lists nearly every Windows autostart location in one place.",
   "When you find a suspicious item, gather its path, hash, signature, creation time and parent, then check reputation and search the rest of the fleet for the same indicator before cleaning it up."
  ],
  "terms": [
   [
    "Masquerading",
    "Disguising malicious files or processes with names, icons or locations that imitate legitimate ones."
   ],
   [
    "Persistence",
    "Techniques an attacker uses to keep access to a system across reboots, logoffs or credential changes."
   ],
   [
    "Run key",
    "A Windows registry location whose entries automatically launch programs when the system starts or a user logs on."
   ],
   [
    "Autoruns",
    "A Sysinternals utility that shows programs configured to start automatically across many Windows locations."
   ],
   [
    "Parent-child process",
    "The relationship between a process and the process that launched it, used to spot abnormal execution chains."
   ]
  ],
  "example": "EDR flags `svchost.exe` running from C:\\Users\\Public with a parent of `winword.exe`. The real svchost runs from System32 under services.exe. The analyst finds a Run key pointing to the same file and a scheduled task that re-creates it hourly, removes both after collecting evidence, and hunts for the file hash on other machines.",
  "tip": "Exam questions often hinge on location and parent: a correct system name in the wrong folder or under the wrong parent is masquerading. Also know that event 7045 means a new service was installed.",
  "check": [
   [
    "Name three Windows persistence mechanisms an analyst should check.",
    "Services, scheduled tasks and registry Run keys (also startup folders and WMI subscriptions)."
   ],
   [
    "Why is Excel launching PowerShell suspicious?",
    "Office applications do not normally start shells; this chain usually indicates a malicious macro or document exploit."
   ],
   [
    "What tool lists most Windows autostart locations at once?",
    "Sysinternals Autoruns."
   ]
  ]
 },
 {
  "t": "Application indicators: anomalous activity, new accounts, unexpected output, injection strings in web logs",
  "body": [
   "Application indicators are signs of compromise that show up in how software behaves rather than in raw network or host activity. They are often the first clue that a web app, database or business system is under attack, and they require you to know what normal looks like for that application.",
   "Anomalous activity means behavior that departs from the application's baseline: a user exporting thousands of records when they normally view a few, logins at unusual hours or from new countries, a sudden spike in errors, or API calls in an order no real client would make. Application logs, database audit logs and web server access logs record this. A flood of HTTP 401 or 403 responses suggests brute forcing or probing of access control, while many 500 errors may mean someone is sending malformed input to find a weakness.",
   "New accounts are a classic indicator, especially ones with administrative rights created outside the normal provisioning process, at odd times, or with names that mimic service accounts. Attackers create accounts to keep access even if the original entry point is closed. Compare account creation events with change tickets and HR records. Unexpected privilege changes, such as a regular user suddenly in an admin role, deserve the same attention.",
   "Unexpected output is when an application returns something it should not: database error messages revealing table names, stack traces, other users' data, directory listings, or unusually large responses. Output anomalies can mean an attacker has found an injection flaw or broken access control, or that data is being pulled out through the application. A sudden jump in response size for a particular endpoint is worth investigating.",
   "Injection strings in web logs are attack payload fragments visible in URLs, parameters or headers. You should recognize them, not craft them. Signs of SQL injection include quote characters followed by SQL keywords such as `OR 1=1`, `UNION SELECT`, or comment markers like `--`. Cross-site scripting attempts contain `<script>` tags or event handlers like `onerror=`. Directory traversal appears as repeated `../` sequences, often URL-encoded as `%2e%2e%2f`, aiming at files such as `/etc/passwd`. Command injection shows shell characters like `;`, `|` or `&&` followed by system commands. Attackers encode payloads to evade filters, so decoding with a tool such as CyberChef is often necessary.",
   "Finding a payload in a log proves an attempt, not success. Check the response code, response size and subsequent activity from the same source to decide whether the attack worked."
  ],
  "terms": [
   [
    "Baseline",
    "A record of normal behavior used to judge whether current activity is anomalous."
   ],
   [
    "Directory traversal",
    "An attack using sequences like ../ to access files outside the web root."
   ],
   [
    "URL encoding",
    "Representing characters as percent-hex codes, such as %27 for a single quote, which attackers use to hide payloads."
   ],
   [
    "Stack trace",
    "Detailed error output showing internal code paths, which can leak information to attackers."
   ]
  ],
  "example": "A web access log shows a single IP requesting `/products?id=5%27%20UNION%20SELECT...` dozens of times. Most requests return 500, but the last few return 200 with responses ten times larger than normal. The analyst treats this as likely successful SQL injection, blocks the IP at the WAF, and asks the developers to review the query.",
  "tip": "Learn to recognize payload patterns after URL decoding: ' OR 1=1 and UNION SELECT for SQLi, <script> for XSS, ../ for traversal, and ; or | for command injection. A 200 response with abnormal size suggests success.",
  "check": [
   [
    "What does a log entry containing %2e%2e%2f%2e%2e%2fetc%2fpasswd indicate?",
    "A directory traversal attempt, since %2e%2e%2f decodes to ../ and the target is the Linux passwd file."
   ],
   [
    "Why is a new admin account created at 3 a.m. with no change ticket an indicator of compromise?",
    "Attackers create privileged accounts for persistence, and one created outside normal processes and hours is likely unauthorized."
   ],
   [
    "Does an injection string in a log prove the attack succeeded?",
    "No. It shows an attempt; you check status codes, response sizes and follow-on activity to judge success."
   ]
  ]
 },
 {
  "t": "Tools: SIEM, SOAR, EDR, Wireshark/tcpdump, sandboxing, CyberChef, reputation and WHOIS lookups",
  "body": [
   "CySA+ tests whether you can pick the right tool for a task and interpret what it shows. You do not need to master every product, but you need to know what each category does and where its limits are.",
   "A security information and event management (SIEM) system collects logs from across the environment, normalizes them, correlates related events, raises alerts based on rules, and provides search for investigations and long-term retention for compliance. Examples include Splunk, Microsoft Sentinel, Elastic and the open-source Security Onion stack. A SIEM is only as good as its data sources and detection rules. Security orchestration, automation and response (SOAR) builds on alerts by running playbooks: enriching an alert with threat intelligence, opening a ticket, disabling an account or isolating a host automatically. SIEM detects and correlates; SOAR automates the response.",
   "Endpoint detection and response (EDR) agents record detailed activity on hosts (processes, files, registry, network connections), detect malicious behavior rather than just known signatures, and let responders isolate a machine, kill processes and collect files remotely. Extended detection and response (XDR) correlates EDR data with network, email and cloud telemetry.",
   "Wireshark is a graphical packet analyzer, and tcpdump is a command-line packet capture tool common on Linux. Use tcpdump to capture on a server, for example `tcpdump -i eth0 -w capture.pcap host 10.0.0.5`, then open the file in Wireshark. In Wireshark, display filters such as `http.request`, `dns` or `ip.addr == 10.0.0.5` narrow the view; Follow TCP Stream shows a conversation; Statistics > Conversations and Endpoints summarize who talked to whom. Encrypted traffic limits what you can see to metadata such as IPs, ports, TLS server names and timing.",
   "A sandbox is an isolated environment where you detonate a suspicious file or URL and watch what it does: files it drops, registry changes, network connections and processes it creates. Sandboxes reveal behavior safely, but some malware detects virtual environments and stays dormant, so a clean sandbox result is not proof of safety.",
   "CyberChef is a browser-based tool for decoding and transforming data with chained recipes: Base64, hex, URL decoding, XOR, decompression, timestamps and more. Analysts use it to unpack obfuscated PowerShell or encoded web payloads.",
   "Reputation lookups check an IP, domain, URL or file hash against intelligence services that record whether it has been seen in malicious activity. WHOIS lookups show domain registration details such as registrar, creation date and name servers. A domain registered two days ago that appears in a phishing email is a strong warning sign, though privacy services often hide the registrant's identity."
  ],
  "terms": [
   [
    "SIEM",
    "Security information and event management: centralized log collection, correlation, alerting and search."
   ],
   [
    "SOAR",
    "Security orchestration, automation and response: playbook-driven automation of enrichment and response actions."
   ],
   [
    "EDR",
    "Endpoint detection and response: agents that record host activity, detect threats by behavior and enable remote response."
   ],
   [
    "Sandbox",
    "An isolated environment for safely executing suspicious files to observe their behavior."
   ],
   [
    "WHOIS",
    "A lookup service returning registration details for a domain, such as registrar and creation date."
   ]
  ],
  "example": "An alert fires in the SIEM for a PowerShell process with a long encoded command. The analyst decodes it in CyberChef, finds a download URL, checks the domain in WHOIS (registered yesterday) and a reputation service (flagged as malicious), and uses the EDR console to isolate the host. A SOAR playbook then blocks the domain at the proxy.",
  "tip": "If a question asks which tool automates response steps across products, answer SOAR; which aggregates and correlates logs, SIEM; which can isolate a single infected laptop, EDR.",
  "check": [
   [
    "What is the main difference between a SIEM and a SOAR?",
    "A SIEM collects and correlates logs to detect events; a SOAR runs automated playbooks to respond to them."
   ],
   [
    "Why might a sandbox report a malicious file as clean?",
    "The malware may detect the virtual environment, wait for user interaction or delay execution, so it shows no malicious behavior during analysis."
   ],
   [
    "What does a very recent WHOIS creation date suggest about a domain in a suspicious email?",
    "Newly registered domains are often used for phishing and malware, so it raises suspicion."
   ]
  ]
 },
 {
  "t": "Email analysis: headers, SPF, DKIM, DMARC, impersonation and malicious attachments",
  "body": [
   "Email remains the most common way attackers get a foothold, through phishing links, malicious attachments and business email compromise. Analysts are often asked to decide whether a reported message is legitimate, and the answer is usually in the headers and authentication results.",
   "Every email has headers that record its journey. The From header is what the user sees, but it is easy to forge. The envelope sender (shown as Return-Path) is used for bounces and SPF checks. Reply-To controls where replies go; a mismatch such as From showing your CEO and Reply-To pointing to a free webmail address is a classic sign of impersonation. The Received headers are added by each mail server along the path, with the newest on top, so you read them from bottom to top to trace the message from its origin. The Message-ID and the Authentication-Results header, which summarizes SPF, DKIM and DMARC outcomes, are also valuable.",
   "Sender Policy Framework (SPF) is a DNS TXT record listing which mail servers may send for a domain. The receiving server checks whether the connecting server's IP is authorized for the envelope sender's domain. A record ending in `-all` means fail anything unlisted (hard fail), while `~all` means soft fail. SPF alone does not protect the visible From address.",
   "DomainKeys Identified Mail (DKIM) adds a digital signature to the message. The sending server signs selected headers and the body with a private key, and the receiver retrieves the public key from DNS using the selector and domain named in the DKIM-Signature header. A valid signature proves the message was sent with that domain's authority and not altered in transit.",
   "Domain-based Message Authentication, Reporting and Conformance (DMARC) ties the two together. It requires that SPF or DKIM pass and that the passing domain aligns with the visible From domain. The DMARC record in DNS sets a policy for failures: `p=none` (monitor only), `p=quarantine` (send to spam) or `p=reject`, and it can request aggregate reports so domain owners see who is sending as them.",
   "Impersonation takes several forms: display name spoofing (a real name with an outside address), lookalike domains using swapped or similar characters, compromised real accounts, and business email compromise, where an attacker poses as an executive or vendor to request payments. Malicious attachments include macro-enabled Office files, archives or disk images containing executables, HTML files that open fake login pages, and PDFs with links. Analyze them safely: extract hashes and check reputation, detonate in a sandbox, and never open them on your workstation. Links can be expanded and checked without clicking."
  ],
  "terms": [
   [
    "SPF",
    "Sender Policy Framework: a DNS record listing servers authorized to send mail for a domain."
   ],
   [
    "DKIM",
    "DomainKeys Identified Mail: a cryptographic signature proving a message came from the signing domain and was not altered."
   ],
   [
    "DMARC",
    "A DNS policy requiring aligned SPF or DKIM passes and telling receivers how to handle failures, with reporting."
   ],
   [
    "Received header",
    "A header added by each mail server a message passes through; read bottom to top to trace origin."
   ],
   [
    "Business email compromise",
    "Fraud in which attackers impersonate executives or vendors, often to redirect payments."
   ]
  ],
  "example": "A user reports an invoice email from a vendor. The headers show SPF fail, no DKIM signature, and a From domain of vendor-billing.co instead of the real vendor.com, with Reply-To set to a webmail address. The attached .html file opens a fake login page. The analyst blocks the sender domain, purges the message from all mailboxes and checks who clicked.",
  "tip": "Remember what each protocol protects: SPF checks the sending server, DKIM checks integrity and signing domain, DMARC checks alignment with the visible From and sets policy. Received headers are read from the bottom up.",
  "check": [
   [
    "Which DMARC policy tells receivers to refuse failing messages outright?",
    "p=reject."
   ],
   [
    "Why can a message pass SPF but still be spoofed as far as the user sees?",
    "SPF checks the envelope sender, not the visible From address; without DMARC alignment, the From can show another domain."
   ],
   [
    "In which order should you read Received headers to trace a message's origin?",
    "From bottom to top, since each server adds its header above the previous ones."
   ]
  ]
 },
 {
  "t": "Threat intelligence: actor types, TTPs, confidence (timeliness, relevancy, accuracy), open vs closed sources, ISACs, STIX/TAXII",
  "body": [
   "Threat intelligence is information about adversaries and their methods that has been collected, analyzed and put into context so defenders can make decisions. Raw data such as a list of IP addresses is not intelligence until someone evaluates it and connects it to your organization.",
   "Knowing who might attack you shapes what you defend. Nation-state actors, often called advanced persistent threats (APTs), are well funded and patient and pursue espionage or disruption. Organized crime groups are financially motivated and run ransomware, fraud and data theft, sometimes as a service for affiliates. Hacktivists act for political or social causes, often with defacement, leaks or denial of service. Insider threats are employees or contractors, either malicious or careless. Unskilled attackers (sometimes called script kiddies) use existing tools with little understanding. Supply chain attackers compromise a vendor or software component to reach many targets.",
   "TTPs stand for tactics, techniques and procedures. Tactics are the attacker's goals (such as initial access or persistence), techniques are how they achieve them (such as phishing or scheduled tasks), and procedures are the specific implementation a particular group uses. TTPs are more valuable than simple indicators because an attacker can change an IP address in minutes, but changing how they operate is costly. This idea is often shown as the pyramid of pain, with hashes and IPs at the bottom and TTPs at the top.",
   "Intelligence must be judged for confidence. CySA+ emphasizes three qualities: timeliness (is it current enough to act on, since indicators go stale quickly), relevancy (does it apply to your industry, technology and geography) and accuracy (is it correct and from a reliable source, and has it been corroborated). Low-confidence intelligence can waste analyst time or cause you to block legitimate services.",
   "Open-source intelligence (OSINT) comes from public sources: government advisories, security blogs, public threat feeds, social media and vendor reports. It is free but varies in quality. Closed or proprietary sources include paid commercial feeds, private sharing communities and internal telemetry; they may be more curated but cost money or require membership. Information Sharing and Analysis Centers (ISACs) are sector-specific communities, for example for finance, health care or energy, where members share threats relevant to their industry, typically under agreed sharing rules such as the Traffic Light Protocol.",
   "To share intelligence between tools automatically, the industry uses STIX (Structured Threat Information eXpression), a standardized language for describing threat objects such as indicators, malware, threat actors and their relationships, and TAXII (Trusted Automated eXchange of Intelligence Information), a protocol for transporting STIX data over HTTPS. A simple way to remember it: STIX is the what, TAXII is the how."
  ],
  "terms": [
   [
    "APT",
    "Advanced persistent threat: a skilled, well-resourced actor, often state-sponsored, that maintains long-term access."
   ],
   [
    "TTPs",
    "Tactics, techniques and procedures: the goals, methods and specific implementations that characterize an attacker."
   ],
   [
    "ISAC",
    "Information Sharing and Analysis Center: an industry-specific organization for sharing threat information among members."
   ],
   [
    "STIX",
    "A standardized format for describing cyber threat intelligence objects and relationships."
   ],
   [
    "TAXII",
    "A protocol for exchanging STIX-formatted threat intelligence between systems over HTTPS."
   ]
  ],
  "example": "A regional hospital's analyst receives an ISAC alert that a ransomware group is exploiting a remote-access appliance used by several member hospitals. The alert is recent, relevant to the hospital's technology and corroborated by a government advisory, so the analyst prioritizes patching and searches logs for the listed TTPs rather than only the IPs, which the group rotates daily.",
  "tip": "STIX is the data format and TAXII is the transport; mixing them up is a common exam trap. Also remember that TTPs are harder for attackers to change than IoCs such as hashes and IPs.",
  "check": [
   [
    "What three factors determine the confidence you place in a piece of threat intelligence?",
    "Timeliness, relevancy and accuracy."
   ],
   [
    "Why are TTPs more durable for detection than IP addresses?",
    "Attackers can change IPs and hashes cheaply, but changing their methods and behavior takes significant effort."
   ],
   [
    "What is an ISAC?",
    "A sector-specific community where organizations in the same industry share threat intelligence."
   ]
  ]
 },
 {
  "t": "Threat hunting: hypotheses, IoC collection, focus areas, active defense and honeypots",
  "body": [
   "Threat hunting is the proactive search for attackers who have evaded existing detections. Instead of waiting for an alert, a hunter assumes compromise may already exist and goes looking for evidence. Good hunts either find something or improve detection, so they are never wasted.",
   "Hunts begin with a hypothesis: a testable statement about attacker behavior in your environment. Hypotheses come from threat intelligence (a group targeting our sector uses scheduled tasks for persistence), from known gaps (we have no alerting on new services on servers), from the MITRE ATT&CK framework, or from situational awareness such as a newly disclosed vulnerability in software you run. A good hypothesis states what you expect to see if it is true and which data will show it, for example: if attackers are using stolen credentials over VPN, we will see logins from impossible travel locations or unusual hours.",
   "Next comes data and IoC collection. Indicators of compromise (IoCs) are artifacts that suggest an intrusion, such as file hashes, IP addresses, domains, registry keys, mutexes or unusual user agents. Hunters gather IoCs from intelligence and from the hunt itself, then search logs, EDR telemetry, network data and memory. Many hunts rely on stacking or frequency analysis: counting how often something occurs across the fleet and investigating the rare outliers, such as an autorun entry found on only one of 2,000 machines.",
   "Focus areas help keep hunts manageable. Common ones include configurations and misconfigurations, isolated or high-value networks, business-critical assets, privileged accounts, persistence locations, outbound connections and lateral movement paths. Prioritize where an attacker would do the most damage or where you have the least visibility. When a hunt ends, document the findings, create new detection rules for what worked and close visibility gaps you found.",
   "Active defense means engaging with attackers inside your own environment to detect, slow or learn from them, rather than only blocking. It does not mean hacking back, which is generally illegal and risky. A key active defense tool is deception. A honeypot is a decoy system that looks valuable but has no legitimate use, so any interaction with it is suspicious by definition. A honeynet is a network of such decoys. Smaller deception items include honeytokens or honey credentials (fake accounts or API keys planted where only an intruder would find them) and honeyfiles. Because legitimate users never touch these, alerts from them have very low false positive rates. Honeypots must be isolated so an attacker cannot use them as a stepping stone to real systems."
  ],
  "terms": [
   [
    "Threat hunting",
    "Proactive, hypothesis-driven searching for threats that existing tools have not detected."
   ],
   [
    "IoC",
    "Indicator of compromise: an artifact, such as a hash, IP or registry key, that suggests a system has been breached."
   ],
   [
    "Stacking",
    "Counting occurrences of an attribute across many systems to find rare outliers worth investigating."
   ],
   [
    "Honeypot",
    "A decoy system with no legitimate use, designed to attract and detect attackers."
   ],
   [
    "Honeytoken",
    "A fake credential, record or file planted to trigger an alert when an intruder uses or accesses it."
   ]
  ],
  "example": "Based on intelligence that a group abuses WMI event subscriptions, a hunter queries EDR data for WMI consumers across all endpoints. Of 3,000 hosts, 2,996 have the same two consumers; four have an extra one that launches PowerShell. Investigation confirms a compromise, and the team adds a permanent detection rule for new WMI consumers.",
  "tip": "Hunting is proactive and starts with a hypothesis; incident response is reactive and starts with an alert. Any access to a honeypot or honeytoken is suspicious because it has no legitimate use.",
  "check": [
   [
    "What makes a good threat hunting hypothesis?",
    "A specific, testable statement about attacker behavior, grounded in intelligence or known gaps, that names the data that would confirm it."
   ],
   [
    "Why do honeytoken alerts have low false positive rates?",
    "Legitimate users have no reason to use the fake credentials or files, so any use indicates an intruder or misuse."
   ],
   [
    "Is hacking back a form of active defense?",
    "No. Active defense operates within your own environment; attacking external systems is generally illegal and risky."
   ]
  ]
 },
 {
  "t": "Process improvement: standardizing processes, automation and orchestration, tuning alerts, single pane of glass, safe use of AI assistants",
  "body": [
   "A security operations center (SOC) can have excellent tools and still fail if analysts drown in alerts, handle the same incident differently every time, or spend hours on copy-and-paste tasks. Process improvement is about making security operations consistent, efficient and measurable.",
   "Standardizing processes starts with documenting how common work is done: triage steps for a phishing report, escalation criteria, required evidence, and ticket fields. Standard operating procedures and playbooks mean a new analyst on the night shift follows the same steps as a senior analyst, results can be audited, and gaps are easier to see. Standardization is also the prerequisite for automation, because you cannot automate a process nobody has defined.",
   "Automation performs individual repetitive tasks without human involvement, such as looking up a hash's reputation, pulling WHOIS data or resetting a password. Orchestration connects many tools and automated tasks into a coordinated workflow, usually through a SOAR platform and APIs: an alert arrives, is enriched with intelligence, compared against asset data, assigned a priority and, if it meets clear criteria, a host is isolated and a ticket opened. Good candidates for automation are high-volume, low-judgment, well-understood tasks. Keep a human in the loop for actions with major business impact, and test automations carefully, since a faulty playbook can block legitimate users at scale.",
   "Alert tuning reduces noise so analysts can focus on real threats. Alert fatigue sets in when most alerts are false positives, and analysts begin to ignore or rush them. Tuning methods include adjusting thresholds, adding context such as asset criticality, suppressing known benign activity with narrowly scoped exceptions, deduplicating related alerts into one case, and retiring rules that never produce true positives. Be careful: overly broad suppression creates false negatives. Track the true positive rate of each rule over time to guide tuning.",
   "A single pane of glass is one interface that brings together data and controls from multiple tools, such as a SIEM or XDR console that shows endpoint, network, email and cloud alerts together. It reduces context switching and speeds investigation, though in practice full integration is hard and depends on APIs and consistent data formats.",
   "AI assistants and large language models can summarize alerts, explain unfamiliar commands, draft reports and suggest queries. Use them safely: do not paste sensitive data such as customer records, credentials or internal incident details into tools that are not approved for that data; verify outputs, because models can produce confident but wrong answers; watch for prompt injection, where content being analyzed contains hidden instructions; and follow your organization's acceptable use policy. Treat AI output as a draft from a junior helper, not an authoritative source."
  ],
  "terms": [
   [
    "Automation",
    "Using technology to perform a single task without manual effort."
   ],
   [
    "Orchestration",
    "Coordinating multiple automated tasks and tools into an end-to-end workflow."
   ],
   [
    "Alert fatigue",
    "Desensitization caused by excessive, mostly false alerts, leading analysts to miss real threats."
   ],
   [
    "Single pane of glass",
    "A unified console that aggregates information and controls from multiple security tools."
   ],
   [
    "Prompt injection",
    "Hidden or malicious instructions in content that cause an AI model to behave in unintended ways."
   ]
  ],
  "example": "A SOC receives 400 phishing reports a week, each taking 15 minutes of manual checks. The team writes a standard procedure, then builds a SOAR playbook that extracts URLs and attachments, checks reputation, detonates files in a sandbox and closes obvious spam automatically, sending only suspicious messages to analysts. Handling time drops sharply and response becomes consistent.",
  "tip": "Automation is a single task; orchestration ties many tasks and tools together. For AI questions, the safe answer involves protecting sensitive data, validating outputs and following policy.",
  "check": [
   [
    "Why should processes be standardized before automating them?",
    "Automation needs defined, repeatable steps; automating an undefined process just produces inconsistent results faster."
   ],
   [
    "What risk comes with aggressive alert suppression?",
    "It can create false negatives, hiding genuine malicious activity."
   ],
   [
    "Name two safe practices for using an AI assistant in the SOC.",
    "Do not enter sensitive or confidential data into unapproved tools, and verify the AI's output before acting on it."
   ]
  ]
 },
 {
  "t": "Asset discovery and scan types: active vs passive, credentialed vs non-credentialed, agent vs agentless, internal vs external",
  "body": [
   "You cannot protect or scan what you do not know exists. Vulnerability management therefore starts with asset discovery: building and maintaining an inventory of hosts, applications, cloud resources and devices, including owners and criticality. Unknown assets, such as a forgotten test server, are often the ones that get breached.",
   "Discovery uses several sources: network scans (for example, nmap ping sweeps), DHCP and DNS records, switch and router tables, cloud provider APIs, endpoint management tools and configuration management databases. Comparing these sources reveals shadow IT and gaps in coverage. Once assets are known, you choose how to scan them, and the exam tests the trade-offs between the scan types.",
   "Active scanning sends probes to targets and analyzes their responses. It is thorough and fast at finding services and vulnerabilities, but it generates traffic, can trigger intrusion alerts and may disrupt fragile systems. Passive scanning (or passive monitoring) listens to existing network traffic and infers which hosts, operating systems and software versions are present without sending anything. It is safe for sensitive environments like industrial control systems, but it only sees what communicates and gives less detail.",
   "A non-credentialed scan looks at a system from the outside, the way an unauthenticated attacker would, seeing only exposed services and banners. A credentialed (authenticated) scan logs into the target with an account, often read-only or specifically created for scanning, and inspects installed software, patch levels and configuration directly. Credentialed scans are far more accurate and produce fewer false positives, but the scan account must be protected carefully because it has access to many systems.",
   "Agent-based scanning installs software on each host that assesses the system locally and reports back. Agents work well for laptops that are often off the corporate network and reduce network load, but they must be deployed and maintained and cannot run on devices that do not support them. Agentless scanning runs from a central scanner over the network, which is simpler to deploy and works on network gear and appliances, but depends on connectivity and credentials at scan time.",
   "Internal scans run from inside the network and show what an insider or an attacker who has already gotten in could reach. External scans run from outside the perimeter and show what the internet sees, which is the attack surface an outside attacker faces first. Some compliance programs require both, sometimes performed by approved external vendors. A mature program uses a mix: external scans for exposure, internal credentialed or agent scans for depth, and passive monitoring where active scans are too risky."
  ],
  "terms": [
   [
    "Asset inventory",
    "An up-to-date record of hardware, software and cloud resources, with owners and criticality."
   ],
   [
    "Passive scanning",
    "Identifying hosts and vulnerabilities by observing network traffic without sending probes."
   ],
   [
    "Credentialed scan",
    "A scan that authenticates to targets to inspect installed software, patches and configuration directly."
   ],
   [
    "Agent-based scanning",
    "Vulnerability assessment performed by software installed on each host, which reports results to a central server."
   ],
   [
    "External scan",
    "A scan performed from outside the network perimeter to identify internet-facing exposure."
   ]
  ],
  "example": "A company's quarterly non-credentialed scan shows few issues, but after switching to credentialed scans the count of missing patches jumps dramatically because the scanner can now see installed software. The team also deploys agents to remote laptops that rarely connect to the VPN during scan windows, closing a long-standing gap.",
  "tip": "If a question asks how to get the most accurate results with fewest false positives, choose a credentialed scan. For fragile or sensitive systems where probes are risky, choose passive monitoring.",
  "check": [
   [
    "What is the main advantage of a credentialed scan over a non-credentialed one?",
    "It sees installed software and configuration directly, giving more accurate results and fewer false positives."
   ],
   [
    "When would agent-based scanning be preferred?",
    "For mobile or remote devices that are often off the network during scan windows, or to reduce scanning traffic."
   ],
   [
    "What does an external scan tell you that an internal scan does not?",
    "Which services and vulnerabilities are exposed to the internet, the view an outside attacker has."
   ]
  ]
 },
 {
  "t": "Special environments: OT/ICS, cloud, mobile and scanning without disrupting production",
  "body": [
   "Standard vulnerability scanning assumes ordinary servers and workstations that tolerate probes. Several environments break that assumption, and CySA+ expects you to adjust your approach so that finding weaknesses does not cause outages.",
   "Operational technology (OT) is the hardware and software that monitors and controls physical processes: manufacturing lines, power distribution, water treatment and building systems. Industrial control systems (ICS) include supervisory control and data acquisition (SCADA) systems that manage geographically spread processes, programmable logic controllers (PLCs) that run machinery, and human-machine interfaces (HMIs) that operators use. These systems prioritize availability and safety over confidentiality, often run for decades on legacy operating systems, use industrial protocols such as Modbus and DNP3 that were designed without authentication, and can crash or behave unpredictably when hit by an aggressive scan. An unexpected scan could stop a production line or, in the worst case, create a safety hazard.",
   "For OT, prefer passive monitoring tools that learn assets and vulnerabilities from observed traffic, consult vendor advisories and firmware lists, and perform any active testing only on test systems or during planned downtime with operators present. Segmentation, such as placing OT behind firewalls in its own zone with tightly controlled connections to the IT network, is a primary defense because many devices cannot be patched quickly.",
   "In the cloud, you usually cannot scan the provider's infrastructure, and most providers set rules about what customers may test, so check the provider's policy first. Cloud workloads change rapidly, with instances created and destroyed automatically, so point-in-time network scans miss much of the environment. Cloud-native approaches work better: agent-based scanning inside instances, scanning container images in registries and build pipelines, and cloud security posture management tools that read configuration through the provider's APIs to find misconfigurations such as public storage buckets or overly permissive security groups.",
   "Mobile devices are rarely on the corporate network and cannot be scanned like servers. Instead, organizations use mobile device management (MDM) or unified endpoint management to report OS versions, patch levels, jailbreak or root status and installed apps, and enforce compliance policies. Mobile app security is assessed through app vetting and testing of the app itself.",
   "General techniques for scanning without disrupting production include: scheduling scans during maintenance windows or low-use periods; throttling scan speed and concurrency; disabling dangerous checks such as denial-of-service tests; starting with discovery before full vulnerability checks; excluding fragile hosts and handling them separately; using credentialed or agent scans that do less probing; testing scan policies in a lab first; and notifying system owners and the SOC so a scan is not mistaken for an attack."
  ],
  "terms": [
   [
    "OT",
    "Operational technology: systems that monitor and control physical devices and industrial processes."
   ],
   [
    "SCADA",
    "Supervisory control and data acquisition: systems that monitor and control distributed industrial processes."
   ],
   [
    "PLC",
    "Programmable logic controller: a ruggedized computer that directly controls industrial machinery."
   ],
   [
    "CSPM",
    "Cloud security posture management: tools that check cloud configurations against security best practices through provider APIs."
   ],
   [
    "MDM",
    "Mobile device management: software for enforcing policy and reporting on the security state of mobile devices."
   ]
  ],
  "example": "A utility wants vulnerability data for its substations. Instead of pointing a network scanner at PLCs, the team deploys a passive OT monitoring sensor on a SPAN port, which identifies device models and firmware versions from traffic. Firmware versions are matched against vendor advisories, and remediation is scheduled for the next planned outage.",
  "tip": "In OT/ICS scenarios, availability and safety come first; the best answer is usually passive scanning, segmentation or testing during scheduled downtime, never an aggressive active scan.",
  "check": [
   [
    "Why are active scans risky for ICS devices?",
    "Many ICS devices are fragile and not designed to handle unexpected traffic, so scans can crash them and disrupt physical processes."
   ],
   [
    "Name two ways to reduce the impact of scanning production systems.",
    "Schedule scans in maintenance windows and throttle or limit checks, excluding dangerous tests such as DoS checks."
   ],
   [
    "What tool type finds misconfigured cloud storage buckets through provider APIs?",
    "A cloud security posture management (CSPM) tool."
   ]
  ]
 },
 {
  "t": "Scanner and tool output: Nessus/OpenVAS reports, nmap, web app scanners, SAST, DAST, SCA, fuzzing, cloud posture tools",
  "body": [
   "Much of the CySA+ vulnerability domain is about reading output: given a scan report or a command result, what does it tell you and what should you do next? Performance-based questions often show you tool output directly.",
   "Nessus (a commercial scanner) and OpenVAS (the open-source scanner in the Greenbone suite) produce similar reports. Each finding typically lists the plugin or test ID, a title, severity (critical, high, medium, low, informational), a CVSS score, affected host and port, a description, the evidence the scanner saw (such as a version banner), references to CVE identifiers and a recommended solution. Read the evidence section carefully: it tells you whether the finding is based on a version number, an actual test or a missing patch, which helps you judge accuracy.",
   "nmap is the standard network discovery and port scanning tool. Common options include `-sS` (TCP SYN scan), `-sT` (full TCP connect), `-sU` (UDP), `-sV` (service and version detection), `-O` (OS detection), `-p` (port selection), `-Pn` (skip host discovery) and `-A` (aggressive: OS, version, scripts and traceroute). Port states are open (a service is listening), closed (reachable but no service) and filtered (no response or blocked, usually by a firewall). The Nmap Scripting Engine, invoked with `--script` or `-sC`, can run additional checks, including vulnerability scripts.",
   "Web application scanners (such as OWASP ZAP, Burp Suite's scanner or Nikto) crawl a site and test for issues like injection, cross-site scripting, missing security headers and outdated components. They produce many findings that need manual validation.",
   "The exam distinguishes testing methods by when and how they look at code. Static application security testing (SAST) analyzes source code or binaries without running them, finding issues such as unsafe functions or unvalidated input early in development, but it can produce false positives and does not see runtime configuration. Dynamic application security testing (DAST) tests the running application from the outside, like an attacker, finding real exploitable behavior but only on reachable code paths. Software composition analysis (SCA) inventories third-party and open-source libraries, often producing a software bill of materials (SBOM), and flags components with known vulnerabilities or license problems. Fuzzing sends large volumes of malformed, random or unexpected input to a program to trigger crashes or errors, which is especially good at finding memory corruption and input handling bugs.",
   "Cloud posture tools, including CSPM products and provider-native security services, report misconfigurations such as storage open to the public, disabled logging, unencrypted volumes, root accounts without MFA and overly permissive identity policies. Output typically maps each finding to a benchmark such as the CIS Benchmarks and identifies the affected resource, so you can route it to the right owner."
  ],
  "terms": [
   [
    "SAST",
    "Static application security testing: analyzing source code or binaries for flaws without executing them."
   ],
   [
    "DAST",
    "Dynamic application security testing: testing a running application from the outside for exploitable weaknesses."
   ],
   [
    "SCA",
    "Software composition analysis: identifying third-party components and their known vulnerabilities and licenses."
   ],
   [
    "Fuzzing",
    "Supplying large volumes of unexpected or malformed input to software to uncover crashes and bugs."
   ],
   [
    "Filtered port",
    "An nmap port state meaning probes received no response or were blocked, typically by a firewall."
   ]
  ],
  "example": "A developer's pipeline runs SAST on each commit, SCA on dependencies and DAST nightly against a staging site. SCA flags a logging library with a critical known vulnerability, SAST flags a SQL query built with string concatenation, and DAST confirms the injection is reachable. Each tool found something the others could miss.",
  "tip": "SAST is white-box and early (code at rest); DAST is black-box and later (running app); SCA is about third-party components; fuzzing is about malformed input. In nmap, filtered usually means a firewall is in the way.",
  "check": [
   [
    "An nmap result shows port 443 as filtered. What does that most likely mean?",
    "A firewall or filter is dropping the probes, so nmap cannot tell whether a service is listening."
   ],
   [
    "Which testing method would detect a vulnerable open-source library in your application?",
    "Software composition analysis (SCA)."
   ],
   [
    "What is one limitation of SAST compared with DAST?",
    "SAST does not run the application, so it can report false positives and miss runtime and configuration issues that DAST would observe."
   ]
  ]
 },
 {
  "t": "Validating results: true/false positives and negatives, backported patches",
  "body": [
   "Scanners and detection tools are not perfect, so analysts must validate findings before acting on them. Sending a system owner a list of false findings wastes their time and erodes trust, while missing real issues leaves the organization exposed.",
   "Four outcomes describe any detection. A true positive is a real issue correctly reported: the scanner says a vulnerability exists and it does. A false positive is an alert for something that is not actually present. A true negative is correctly reporting nothing where nothing exists. A false negative is the most dangerous: a real vulnerability or attack goes unreported, giving false confidence. Reducing false positives by making a tool less sensitive tends to increase false negatives, so tuning is always a balance.",
   "Common causes of false positives in vulnerability scans include banner-based detection (the scanner reads a version string and assumes vulnerability without testing), non-credentialed scans that must guess, compensating controls the scanner cannot see, and backported patches. Causes of false negatives include scans that fail to authenticate, hosts that were offline or excluded, firewalls blocking probes, outdated plugin feeds and vulnerabilities for which no check exists yet.",
   "A backported patch is a security fix that a vendor, often a Linux distribution such as Red Hat or Debian, applies to an older version of a package without changing the upstream version number. For example, a server might report an older Apache or OpenSSH version string while actually containing the fix. A scanner that relies only on the version banner will flag it as vulnerable, producing a false positive. To validate, check the distribution's package changelog or security advisory for the relevant CVE, compare the full package release number to the fixed version listed by the vendor, or run a credentialed scan that checks installed package versions rather than banners.",
   "Validation methods in general include: reviewing the evidence in the finding; checking configuration or patch status directly on the host; correlating with other sources such as asset inventory, EDR or a second scanner; confirming with the system owner; and, where authorized and safe, manually testing whether the condition exists. If a finding is confirmed false, document it and mark it as such in the scanner so it does not keep reappearing, but review those exceptions periodically.",
   "Also watch for scan failures that masquerade as clean results. If a report shows no findings on a host that you know runs dozens of services, check whether authentication failed or the host was unreachable. A clean report is only meaningful if the scan actually ran correctly."
  ],
  "terms": [
   [
    "True positive",
    "An alert or finding that correctly identifies a real issue."
   ],
   [
    "False positive",
    "An alert or finding that reports an issue that does not actually exist."
   ],
   [
    "False negative",
    "A real issue that the tool fails to detect or report."
   ],
   [
    "Backporting",
    "Applying a security fix to an older software version without changing its upstream version number."
   ]
  ],
  "example": "A scan flags a critical OpenSSH vulnerability on a Red Hat server based on its version banner. The analyst checks the installed package and the vendor's advisory, finds that the package release includes the backported fix for that CVE, and records the finding as a false positive with evidence attached.",
  "tip": "If a Linux server shows an old version banner but is fully patched from its vendor, think backported patch and false positive. A false negative is the worst outcome because it hides real risk.",
  "check": [
   [
    "Why can backported patches cause false positives?",
    "The fix is applied without changing the version string, so banner-based scanners believe the old, vulnerable version is still present."
   ],
   [
    "Which is more dangerous, a false positive or a false negative? Why?",
    "A false negative, because a real vulnerability or attack goes unnoticed and unaddressed."
   ],
   [
    "A credentialed scan suddenly reports zero findings on a busy server. What should you check?",
    "Whether authentication failed or the host was unreachable, since a failed scan can look like a clean one."
   ]
  ]
 },
 {
  "t": "Prioritization: CVSS base metrics and vectors, EPSS, CISA KEV, asset value, exploitability, context",
  "body": [
   "Every organization has more vulnerabilities than it can fix immediately, so prioritization decides where effort goes first. Good prioritization combines how severe a vulnerability is in general with how likely it is to be exploited and how much it matters in your environment.",
   "The Common Vulnerability Scoring System (CVSS) rates severity from 0.0 to 10.0. In CVSS v3.x the qualitative ratings are none (0.0), low (0.1 to 3.9), medium (4.0 to 6.9), high (7.0 to 8.9) and critical (9.0 to 10.0). The base metrics describe the vulnerability itself. Exploitability metrics are attack vector (AV: network N, adjacent A, local L, physical P), attack complexity (AC: low or high), privileges required (PR: none, low, high) and user interaction (UI: none or required). Scope (S: unchanged or changed) indicates whether exploitation affects components beyond the vulnerable one. Impact metrics are confidentiality, integrity and availability (C, I, A: high, low or none).",
   "Scores are shared as vector strings, for example `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`. You should be able to read this: remotely exploitable over the network, low complexity, no privileges or user interaction needed, with high impact to all three of confidentiality, integrity and availability. That combination is about as bad as it gets (9.8). Changing AV to P (physical access required) or UI to R (a user must click) would lower the score. CVSS v4.0 also exists and adds and renames some metrics, but the core ideas of exploitability and impact are the same. Temporal or threat metrics and environmental metrics let you adjust the base score for exploit availability and your own environment.",
   "CVSS measures severity, not likelihood. The Exploit Prediction Scoring System (EPSS), maintained by FIRST, estimates the probability that a vulnerability will be exploited in the wild in the near future, as a value between 0 and 1. A vulnerability with a high CVSS but tiny EPSS may be less urgent than a medium one with high EPSS.",
   "The CISA Known Exploited Vulnerabilities (KEV) catalog lists vulnerabilities with reliable evidence of active exploitation. US federal agencies are required to remediate them by set deadlines, and many other organizations use KEV as a must-fix list, since confirmed exploitation removes guesswork.",
   "Finally, context matters. Asset value and criticality (a domain controller or payment database versus a lab machine), exposure (internet-facing versus isolated), data sensitivity, existing compensating controls, and exploitability in your setting (is the vulnerable feature even enabled?) all shift priority. A sound approach: fix items in KEV or with public exploits on exposed, critical assets first, then use CVSS, EPSS and business context to order the rest."
  ],
  "terms": [
   [
    "CVSS",
    "Common Vulnerability Scoring System: a standard 0 to 10 severity score built from exploitability and impact metrics."
   ],
   [
    "Attack vector",
    "The CVSS metric describing how remote the attacker can be: network, adjacent, local or physical."
   ],
   [
    "Scope",
    "The CVSS metric indicating whether exploitation can affect resources beyond the vulnerable component's security authority."
   ],
   [
    "EPSS",
    "Exploit Prediction Scoring System: a probability estimate that a vulnerability will be exploited soon."
   ],
   [
    "CISA KEV",
    "A catalog of vulnerabilities known to be actively exploited, used as a high-priority remediation list."
   ]
  ],
  "example": "A team has two findings: a CVSS 9.1 flaw on an isolated lab server with no known exploit, and a CVSS 7.5 flaw on an internet-facing VPN appliance that appears in the KEV catalog. They patch the VPN appliance first because active exploitation, exposure and business criticality outweigh the higher base score.",
  "tip": "Practice decoding vector strings: AV:N is worst for attack vector, PR:N and UI:N mean no barrier for the attacker, and C:H/I:H/A:H means full impact. On scenario questions, active exploitation (KEV) and asset criticality usually outrank raw CVSS.",
  "check": [
   [
    "What does AV:L in a CVSS vector mean?",
    "Attack vector local: the attacker needs local access to the system, such as a logged-in session, to exploit it."
   ],
   [
    "How does EPSS differ from CVSS?",
    "CVSS rates severity if exploited; EPSS estimates the probability that it will actually be exploited."
   ],
   [
    "Why might a medium-severity vulnerability be fixed before a critical one?",
    "It may be actively exploited, on an internet-facing or critical asset, while the critical one is unreachable or mitigated."
   ]
  ]
 },
 {
  "t": "Common software vulnerabilities: injection, XSS, SSRF, IDOR, broken access control, buffer overflow, insecure cookies",
  "body": [
   "The CySA+ exam expects you to recognize common vulnerability classes from a description, a log entry or a snippet of scanner output, and to know which control fixes each. The OWASP Top 10 is a helpful reference list for web application risks.",
   "Injection happens when untrusted input is sent to an interpreter as part of a command or query, so the input changes the command's meaning. SQL injection targets database queries and can expose, modify or delete data. Command injection passes input to an operating system shell. Other forms include LDAP injection and XML injection. The root cause is mixing code and data without separation.",
   "Cross-site scripting (XSS) is injection into a web page that another user's browser then runs. Reflected XSS bounces a payload off the server in a single request, usually through a crafted link. Stored (persistent) XSS saves the payload in the application, such as in a comment, so every visitor runs it. DOM-based XSS happens entirely in client-side script that writes untrusted data into the page. XSS is used to steal session cookies, perform actions as the victim or show fake content. Do not confuse it with cross-site request forgery (CSRF), which tricks a logged-in user's browser into sending an unwanted request to a site that trusts it.",
   "Server-side request forgery (SSRF) makes the server itself send requests to a destination the attacker chooses, for example by supplying an internal URL to a feature that fetches images. Because the server sits inside the network, SSRF can reach internal services or cloud instance metadata endpoints that expose credentials.",
   "Insecure direct object reference (IDOR) occurs when an application uses a user-supplied identifier, such as `invoice?id=1001`, to fetch a record without checking whether the user is allowed to see it. Changing the number reveals someone else's data. IDOR is one form of broken access control, which covers any failure to enforce what authenticated users may do: accessing admin pages by browsing to them directly, privilege escalation by changing a role parameter, or missing checks on API endpoints.",
   "A buffer overflow happens when a program writes more data into a memory buffer than it can hold, overwriting adjacent memory. In languages such as C and C++ without automatic bounds checking, this can crash the program or allow an attacker to redirect execution. Signs include crashes on long inputs and fuzzing results.",
   "Insecure cookies expose session tokens. Cookies should carry the `Secure` flag (sent only over HTTPS), `HttpOnly` (not readable by JavaScript, which limits XSS theft) and a suitable `SameSite` value (limits cross-site sending, which helps against CSRF). Session IDs should be long and random, regenerated after login and expired properly."
  ],
  "terms": [
   [
    "XSS",
    "Cross-site scripting: injecting script into web pages viewed by other users, which runs in their browsers."
   ],
   [
    "SSRF",
    "Server-side request forgery: tricking a server into making requests to attacker-chosen destinations, often internal ones."
   ],
   [
    "IDOR",
    "Insecure direct object reference: access to objects by changing an identifier without authorization checks."
   ],
   [
    "Buffer overflow",
    "Writing beyond a memory buffer's boundary, which can crash a program or allow code execution."
   ],
   [
    "HttpOnly flag",
    "A cookie attribute that prevents client-side scripts from reading the cookie."
   ]
  ],
  "example": "A tester logged in as customer A views /api/orders/5521, then changes the number to 5522 and sees customer B's order with address and phone number. The server checks that the user is logged in but not that the order belongs to them, which is IDOR, a form of broken access control.",
  "tip": "Look at who executes the payload: the database or shell (injection), another user's browser (XSS), the server fetching a URL (SSRF). Changing an ID to see someone else's data is IDOR.",
  "check": [
   [
    "What is the difference between stored and reflected XSS?",
    "Stored XSS is saved by the application and served to every visitor; reflected XSS is returned immediately from a single crafted request, usually via a link."
   ],
   [
    "Why is SSRF especially dangerous in cloud environments?",
    "The server can be made to query internal services or instance metadata endpoints that may reveal credentials."
   ],
   [
    "Which cookie flag keeps a session cookie from being sent over plain HTTP?",
    "The Secure flag."
   ]
  ]
 },
 {
  "t": "Recommending controls: input validation, output encoding, parameterized queries, memory protections, secure coding",
  "body": [
   "Finding a vulnerability is only half of an analyst's job. You also need to recommend a fix that addresses the root cause, and the exam will ask you to match each flaw to its best control.",
   "Input validation checks that data entering an application matches what is expected before it is used: type, length, format and range. Allow listing (accepting only known-good patterns, such as digits for a ZIP code) is stronger than deny listing (blocking known-bad strings), because attackers find endless ways to encode bad input. Validation must happen on the server; client-side checks in the browser improve usability but can be bypassed. Validation reduces many attacks but is not enough alone for injection or XSS.",
   "Output encoding (also called escaping) converts special characters into a safe representation for the context where data is displayed. For HTML, characters like `<` and `>` become `&lt;` and `&gt;`, so the browser shows them as text instead of running them as markup. Encoding must match the context: HTML body, HTML attribute, JavaScript, URL or CSS each need different rules. Output encoding is the primary defense against XSS, often combined with a Content Security Policy (CSP) header that limits which scripts can run.",
   "Parameterized queries, also called prepared statements, are the primary defense against SQL injection. The query structure is defined with placeholders, and user input is supplied separately as parameters, so the database always treats it as data, never as SQL code. Stored procedures and object-relational mappers help when they use parameters internally. Escaping input and least-privilege database accounts are secondary layers.",
   "```python\n# Unsafe: input becomes part of the SQL text\ncur.execute(\"SELECT * FROM users WHERE name = '\" + name + \"'\")\n# Safe: parameterized query, input passed separately\ncur.execute(\"SELECT * FROM users WHERE name = %s\", (name,))\n```",
   "Memory protections reduce the damage of buffer overflows. Address space layout randomization (ASLR) places code and data at unpredictable addresses. Data execution prevention (DEP), also called no-execute (NX), marks memory regions such as the stack as non-executable. Stack canaries are values placed before return addresses that are checked before a function returns, detecting overwrites. The best fix, however, is safe code: bounds-checked functions, careful length handling, or memory-safe languages.",
   "Secure coding ties it together: follow a secure development lifecycle with threat modeling, code review and security testing; apply least privilege to application and database accounts; handle errors without leaking stack traces; manage sessions securely; keep dependencies updated; never hard-code secrets; and use vetted framework features for authentication, encryption and encoding rather than writing your own. Access control checks must be enforced on the server for every request, which is the fix for IDOR and broken access control. For SSRF, validate and allow list destination URLs and block requests to internal address ranges."
  ],
  "terms": [
   [
    "Parameterized query",
    "A database query that separates SQL code from user-supplied values, preventing SQL injection."
   ],
   [
    "Output encoding",
    "Converting special characters so data is displayed as text in a given context instead of being executed."
   ],
   [
    "ASLR",
    "Address space layout randomization: randomizing memory locations to make exploitation of memory bugs harder."
   ],
   [
    "DEP",
    "Data execution prevention: marking memory regions as non-executable so injected data cannot run as code."
   ],
   [
    "Allow listing",
    "Accepting only input that matches a defined set of known-good values or patterns."
   ]
  ],
  "example": "A scan finds stored XSS in a product review form and SQL injection in the search function. The analyst recommends parameterized queries for the search code, context-aware output encoding for review text plus a Content Security Policy, and server-side input validation for both, rather than relying on a WAF rule alone.",
  "tip": "Best-fix pairings: SQL injection with parameterized queries, XSS with output encoding, buffer overflow with bounds checking and memory protections, IDOR with server-side authorization checks. Input validation helps everywhere but is rarely the single best answer for injection.",
  "check": [
   [
    "What is the most effective control against SQL injection?",
    "Parameterized queries (prepared statements), which keep user input separate from SQL code."
   ],
   [
    "Why is client-side input validation not sufficient?",
    "Attackers can bypass the browser and send requests directly, so validation must be enforced on the server."
   ],
   [
    "How does DEP make buffer overflow exploitation harder?",
    "It marks data areas such as the stack as non-executable, so injected code placed there cannot run."
   ]
  ]
 },
 {
  "t": "Compensating controls, segmentation and exceptions for systems that cannot be patched",
  "body": [
   "Sometimes the right fix for a vulnerability cannot be applied. A medical device may be certified only with a specific OS version, an industrial controller may need a plant shutdown to update, a vendor may no longer support a product, or a patch may break a critical application. In these cases you still have to manage the risk, and CySA+ tests how.",
   "A compensating control is an alternative safeguard that reduces the risk when the primary control is not feasible. It should address the same threat, provide a comparable level of protection and be documented. Examples include restricting network access to the vulnerable service, disabling the vulnerable feature, adding an intrusion prevention system (IPS) signature or web application firewall (WAF) rule to block known exploit patterns, requiring stronger authentication in front of the system, application allow listing so only approved software runs, and increased monitoring with specific alerting for exploitation attempts.",
   "Segmentation is one of the most effective compensating controls. Place unpatchable systems in their own network segment or VLAN, allow only the specific connections they need through firewall rules (for example, one management workstation on one port), and block internet access entirely where possible. An isolated system can still be vulnerable, but far fewer attackers can reach it. Air gapping, full physical separation from other networks, is the extreme form, used in some OT and classified environments, though removable media and maintenance laptops can still bridge the gap.",
   "When a vulnerability will remain, organizations use a formal exception process (sometimes called a risk exception or waiver). A good exception records the vulnerability and affected systems, why it cannot be remediated, the compensating controls in place, the residual risk, who owns and accepted that risk (a business owner with authority, not the analyst), and an expiration or review date. Exceptions should never be permanent by default; circumstances change, and a patch or replacement may become possible.",
   "Your role as an analyst is to identify the unpatchable systems, recommend suitable compensating controls, verify that those controls actually work (for example, by confirming firewall rules block access from user networks), and make sure the exception is tracked and revisited. Scanners should be configured to note accepted exceptions so they do not generate endless duplicate tickets, while still reporting if the situation worsens, such as a new exploit appearing.",
   "Long term, the goal is usually to replace or upgrade the system. Include end-of-life systems in budgeting and planning so compensating controls stay a bridge, not a permanent crutch."
  ],
  "terms": [
   [
    "Compensating control",
    "An alternative safeguard that provides comparable risk reduction when the primary control cannot be implemented."
   ],
   [
    "Risk exception",
    "A documented, approved decision to allow a known vulnerability to remain temporarily, with justification and controls."
   ],
   [
    "Air gap",
    "Physical isolation of a system or network from other networks, including the internet."
   ],
   [
    "Virtual patching",
    "Blocking exploitation of a vulnerability with a network control such as an IPS or WAF rule instead of changing the software."
   ]
  ],
  "example": "A hospital MRI workstation runs an unsupported operating system because the vendor has not certified an upgrade. The security team moves it to a dedicated VLAN that only the imaging server can reach, blocks internet access, applies application allow listing and adds alerts for any new connections. The department head signs a risk exception that expires in twelve months, pending a vendor upgrade.",
  "tip": "When a question says a system cannot be patched, look for segmentation or another compensating control plus a documented exception; answers like simply ignoring it or disconnecting a critical system are usually wrong.",
  "check": [
   [
    "What makes a control a valid compensating control?",
    "It addresses the same risk with comparable protection when the original control cannot be implemented, and it is documented."
   ],
   [
    "What should a risk exception record include?",
    "The vulnerability and systems, justification, compensating controls, residual risk, the accountable risk owner's approval and an expiration or review date."
   ],
   [
    "Why is segmentation effective for unpatchable systems?",
    "It sharply limits who can reach the vulnerable system, reducing the likelihood of exploitation."
   ]
  ]
 },
 {
  "t": "Vulnerability response: patching, configuration management, change management, maintenance windows",
  "body": [
   "Once vulnerabilities are validated and prioritized, they have to be fixed without breaking the business. Vulnerability response is the set of processes that turns a finding into a remediated system, and it depends heavily on cooperation between security, IT operations and system owners.",
   "Patching is the most common remediation. A mature patch management process includes: tracking vendor releases and advisories; evaluating which patches apply to which assets; testing patches in a non-production environment that resembles production; deploying in stages, often starting with a pilot group; verifying installation, usually by rescanning; and keeping a rollback plan in case a patch causes problems. Automated tools such as operating system update services and endpoint management platforms make patching scale, but someone still has to confirm that it happened. Emergency or out-of-band patches for actively exploited flaws may skip parts of the normal schedule, but they should still follow an expedited, documented process.",
   "Configuration management addresses vulnerabilities that are not missing patches: default passwords, unnecessary services, weak protocols such as SMBv1 or old TLS versions, excessive permissions and disabled logging. The approach is to define secure baselines, often based on industry benchmarks such as the CIS Benchmarks or vendor security guides, apply them consistently with automation (group policy, configuration management tools, infrastructure as code) and detect drift, which is when a system changes away from its approved baseline. A configuration management database (CMDB) records assets and their configurations and relationships.",
   "Change management ensures that changes to production are reviewed, approved, scheduled and documented, so that fixes do not cause outages and unauthorized changes can be spotted. A typical request describes the change, the reason, affected systems, the risk, the test results, the implementation steps and the rollback plan. A change advisory board (CAB) often reviews significant changes. Standard, low-risk changes may be pre-approved, while emergency changes have a faster path with review afterward. From a security point of view, change records also help investigations: an unexplained configuration change with no ticket is a potential indicator of compromise.",
   "Maintenance windows are scheduled periods, usually during low business activity, when changes and reboots are allowed. They reduce disruption, but they also create delay: if the next window is three weeks away, a critical vulnerability stays open that long. Analysts help by highlighting which items justify an emergency change and by recommending interim compensating controls until the window arrives.",
   "Close the loop by verifying remediation with a rescan, updating tickets and tracking metrics such as time to remediate against service level agreements (SLAs), for example a target number of days to fix critical findings."
  ],
  "terms": [
   [
    "Patch management",
    "The process of identifying, testing, deploying and verifying software updates."
   ],
   [
    "Configuration baseline",
    "An approved, documented set of secure settings that systems are built to and measured against."
   ],
   [
    "Configuration drift",
    "Gradual deviation of a system's settings from its approved baseline."
   ],
   [
    "Change advisory board",
    "A group that reviews and approves significant changes to production systems."
   ],
   [
    "Maintenance window",
    "A scheduled time period during which changes and restarts may be made with minimal business impact."
   ]
  ],
  "example": "A critical remote code execution flaw in a web server platform is added to the KEV catalog. The next maintenance window is two weeks away, so the team files an emergency change, tests the patch on staging overnight, deploys it to internet-facing servers the next evening with a rollback plan ready, rescans to confirm, and schedules internal servers for the normal window with a WAF rule in place meanwhile.",
  "tip": "The exam favors testing before deployment, documented change requests with rollback plans, and rescanning to verify. An unauthorized change with no ticket should be treated as a possible security event.",
  "check": [
   [
    "Why should patches be tested before production deployment?",
    "Patches can break applications or services; testing in a similar environment reduces the risk of outages."
   ],
   [
    "What is configuration drift and how is it detected?",
    "Deviation from an approved baseline; it is detected by comparing current settings to the baseline with compliance scans or configuration management tools."
   ],
   [
    "How do you confirm that a vulnerability has actually been remediated?",
    "Rescan or otherwise verify the system after the fix and update the ticket with evidence."
   ]
  ]
 },
 {
  "t": "Risk management: accept, avoid, transfer, mitigate; inhibitors to remediation (legacy systems, business process interruption, MOUs/SLAs)",
  "body": [
   "Vulnerability management lives inside a larger risk management program. Risk is the combination of the likelihood that a threat exploits a vulnerability and the impact if it does. Not every risk can or should be eliminated, and the exam expects you to know the four standard responses and the practical obstacles that delay fixes.",
   "Accept means acknowledging the risk and choosing not to take further action, usually because the cost of addressing it exceeds the expected loss or because it falls within the organization's risk appetite. Acceptance must be a documented decision by someone with authority to own the risk, not an analyst quietly ignoring a finding. Avoid means eliminating the risk by stopping the activity that creates it, such as decommissioning a vulnerable service or choosing not to launch a risky feature. Transfer means shifting the financial impact to another party, most commonly through cyber insurance or contracts with a vendor; the responsibility for protecting data and the reputational damage generally stay with you. Mitigate (reduce) means applying controls, such as patches, segmentation or monitoring, to lower likelihood or impact. The risk left over after controls is residual risk.",
   "Even when an organization wants to remediate, several inhibitors get in the way. Legacy systems may run unsupported software that has no patch, or applications that only work on old platforms. Upgrading can require major projects, retraining or vendor re-certification, as with medical and industrial equipment.",
   "Business process interruption is the fear, often justified, that patching or reconfiguring will cause downtime in a critical process: a production line, a trading platform, a hospital system. Owners resist changes that might stop revenue or harm patients, so remediation is pushed to rare maintenance windows.",
   "Agreements can also restrict action. A memorandum of understanding (MOU) is a less formal agreement between parties describing shared intentions and responsibilities. A service level agreement (SLA) sets measurable commitments such as uptime percentages or response times. If an SLA promises very high availability to customers, a patch requiring downtime may risk breaching it. Contracts with vendors may also forbid customers from modifying systems, voiding support if you apply unapproved patches. Other inhibitors include organizational governance and slow approval processes, degraded functionality after a fix, lack of budget or staff, and proprietary systems where only the vendor can apply changes.",
   "The analyst's role is to present risk clearly so decision makers can choose the right response: describe the vulnerability, its likelihood and impact, the cost and disruption of fixing it, available compensating controls, and the residual risk of each option."
  ],
  "terms": [
   [
    "Risk acceptance",
    "A documented decision by an authorized owner to tolerate a risk without further action."
   ],
   [
    "Risk transference",
    "Shifting the financial consequences of a risk to another party, such as an insurer."
   ],
   [
    "Residual risk",
    "The risk that remains after controls have been applied."
   ],
   [
    "SLA",
    "Service level agreement: a contract specifying measurable service commitments such as availability or response time."
   ],
   [
    "MOU",
    "Memorandum of understanding: an agreement describing the intentions and responsibilities of two parties, usually less binding than a contract."
   ]
  ],
  "example": "A manufacturer's plant runs an old controller application that only works on an unsupported OS. Upgrading requires a new production line. Management mitigates by segmenting the network, transfers part of the financial risk through cyber insurance and formally accepts the residual risk for one year while budgeting for replacement.",
  "tip": "Buying insurance is transfer, shutting down the risky service is avoidance, applying controls is mitigation, and a signed decision to live with it is acceptance. Only a risk owner with authority can accept risk.",
  "check": [
   [
    "A company stops offering an insecure legacy FTP service. Which risk response is this?",
    "Risk avoidance, because the activity that created the risk has been eliminated."
   ],
   [
    "How can an SLA inhibit remediation?",
    "Commitments to high availability can make owners unwilling to take systems down for patching, delaying fixes."
   ],
   [
    "Does cyber insurance transfer all consequences of a breach?",
    "No. It transfers some financial impact, but legal responsibility and reputational damage largely remain with the organization."
   ]
  ]
 },
 {
  "t": "Attack frameworks: Cyber Kill Chain, Diamond Model, MITRE ATT&CK, OWASP Testing Guide, OSSTMM",
  "body": [
   "Attack frameworks give analysts a shared vocabulary for describing how attacks unfold and a structure for finding gaps in defenses. CySA+ expects you to know what each framework models and when you would use it.",
   "The Lockheed Martin Cyber Kill Chain describes an intrusion as seven sequential phases: reconnaissance (researching the target), weaponization (pairing an exploit with a payload), delivery (sending it, such as by email), exploitation (triggering the vulnerability), installation (establishing malware or persistence), command and control (remote channel to the attacker) and actions on objectives (data theft, destruction, ransomware). The key idea is that breaking any link stops the attack, so defenders map controls to each phase. Its limitation is that it is linear and focused on malware-based perimeter intrusions, so it fits insider threats and cloud attacks less well.",
   "The Diamond Model of Intrusion Analysis describes every intrusion event with four core features at the corners of a diamond: adversary, capability (tools and malware), infrastructure (IPs, domains, servers used) and victim. Edges connect related features, so if you know the infrastructure you can pivot to find other victims or capabilities linked to it. Meta-features include timestamp, phase, result, direction and methodology. Analysts use it to link events into activity threads and to attribute campaigns.",
   "MITRE ATT&CK (Adversarial Tactics, Techniques and Common Knowledge) is a large, regularly updated knowledge base of real-world adversary behavior. It is organized as a matrix: columns are tactics (the adversary's goals, such as initial access, execution, persistence, privilege escalation, defense evasion, credential access, discovery, lateral movement, collection, command and control, exfiltration and impact), and cells are techniques and sub-techniques with IDs such as T1053 for scheduled task/job. Each entry lists procedure examples, detections and mitigations. Analysts use ATT&CK to map detections and find coverage gaps, plan threat hunts, describe incidents precisely and emulate adversaries in testing. Separate matrices exist for enterprise, mobile and ICS.",
   "The OWASP Web Security Testing Guide, produced by the Open Worldwide Application Security Project, is a detailed methodology for testing web applications. It groups tests into areas such as information gathering, configuration, identity management, authentication, authorization, session management, input validation, error handling, cryptography, business logic and client-side testing. Use it when planning or evaluating a web application assessment.",
   "The Open Source Security Testing Methodology Manual (OSSTMM), from ISECOM, is a peer-reviewed methodology for testing operational security in general, not just web apps. It covers human, physical, wireless, telecommunications and data network channels and emphasizes measurable, repeatable results. Use it when you need a broad, scientific approach to security testing across an organization."
  ],
  "terms": [
   [
    "Cyber Kill Chain",
    "A seven-phase linear model of intrusion from reconnaissance to actions on objectives."
   ],
   [
    "Diamond Model",
    "An intrusion analysis model relating adversary, capability, infrastructure and victim for each event."
   ],
   [
    "MITRE ATT&CK",
    "A knowledge base of adversary tactics and techniques observed in real attacks, organized as a matrix."
   ],
   [
    "OWASP Testing Guide",
    "A comprehensive methodology for testing the security of web applications."
   ],
   [
    "OSSTMM",
    "Open Source Security Testing Methodology Manual: a methodology for measurable security testing across many channels."
   ]
  ],
  "example": "After a phishing incident, an analyst maps it to ATT&CK: phishing attachment for initial access, user execution, a Run key for persistence and HTTPS for C2. Comparing that map with the SIEM's detection rules shows no coverage for Run key changes, so a new Sysmon-based rule is added. The Diamond Model then links the C2 domain to two earlier events.",
  "tip": "Linear phases means Kill Chain; four corners of adversary, capability, infrastructure and victim means Diamond Model; tactics and technique IDs means ATT&CK. OWASP is web-app testing; OSSTMM is broad operational security testing.",
  "check": [
   [
    "What are the four core features of the Diamond Model?",
    "Adversary, capability, infrastructure and victim."
   ],
   [
    "In ATT&CK, what is the difference between a tactic and a technique?",
    "A tactic is the adversary's goal (the why); a technique is how they achieve it."
   ],
   [
    "What is a common criticism of the Cyber Kill Chain?",
    "It is linear and perimeter- and malware-focused, so it models insider and cloud-based attacks poorly."
   ]
  ]
 },
 {
  "t": "IR lifecycle (NIST SP 800-61): preparation; detection and analysis; containment, eradication and recovery; post-incident activity",
  "body": [
   "NIST Special Publication 800-61, the Computer Security Incident Handling Guide, describes a lifecycle that many organizations and the CySA+ exam use as the standard model for incident response (IR). Its phases are preparation; detection and analysis; containment, eradication and recovery; and post-incident activity. The revised version of the document aligns incident response with the NIST Cybersecurity Framework functions, but the lifecycle below is still the model you should know cold.",
   "Preparation happens before any incident. It includes writing an incident response policy and plan, forming and training a computer security incident response team (CSIRT), defining roles and contact lists, preparing playbooks for common incident types, acquiring tools (forensic workstations, jump bags, clean media, analysis software), ensuring logging and monitoring are in place, and practicing through exercises. Preventive controls that reduce the number of incidents, such as patching and hardening, also belong here.",
   "Detection and analysis is where potential incidents are identified and confirmed. Precursors are signs that an incident may happen in the future (a vulnerability announcement, threats from a hacktivist group), while indicators are signs that one may have happened or is happening (alerts, unusual logs, user reports). Analysts validate alerts, determine scope and impact, prioritize based on functional impact, information impact and recoverability, document everything and notify the right people. This phase is often the hardest because of the volume of noise.",
   "Containment, eradication and recovery are grouped together because they overlap and loop. Containment limits damage and stops spread, for example by isolating a host or disabling an account; the strategy depends on the damage risk, the need to preserve evidence, service availability and resources. Eradication removes the threat: deleting malware, closing persistence, removing attacker accounts, and fixing the exploited vulnerability. Recovery restores systems to normal operation, often from clean backups or rebuilt images, with close monitoring to make sure the attacker does not return. If new evidence appears, you loop back to detection and analysis.",
   "Post-incident activity includes a lessons learned meeting soon after the incident, a final report, updates to plans, playbooks and controls, and retention of evidence according to policy. Questions to answer include what happened and when, how well staff performed, what information was needed sooner, what would be done differently, and which indicators to watch for in the future. This phase feeds back into preparation, which is why the lifecycle is drawn as a cycle.",
   "Notice that the phases are not always strictly sequential: analysis continues during containment, and recovery can reveal new indicators. The exam often gives a scenario and asks which phase an action belongs to, so learn the typical actions of each."
  ],
  "terms": [
   [
    "CSIRT",
    "Computer security incident response team: the group responsible for handling security incidents."
   ],
   [
    "Precursor",
    "A sign that an incident may occur in the future."
   ],
   [
    "Indicator",
    "A sign that an incident may have occurred or is occurring now."
   ],
   [
    "Eradication",
    "Removing the cause of an incident, such as malware, persistence and attacker accounts."
   ],
   [
    "Lessons learned",
    "A post-incident review to identify improvements to people, processes and technology."
   ]
  ],
  "example": "A SOC detects ransomware encrypting a file share. Analysts confirm the alert and identify the source host (detection and analysis), disconnect it and disable the compromised account (containment), remove the malware and the scheduled task that launched it (eradication), restore the share from backup and monitor closely (recovery), and hold a lessons learned meeting that leads to disabling macros for most users (post-incident activity).",
  "tip": "Map actions to phases: building playbooks and training is preparation; isolating a host is containment; removing malware is eradication; restoring backups is recovery; the lessons learned meeting is post-incident activity.",
  "check": [
   [
    "Which NIST phase includes acquiring forensic tools and running tabletop exercises?",
    "Preparation."
   ],
   [
    "What is the difference between a precursor and an indicator?",
    "A precursor suggests an incident may happen in the future; an indicator suggests one has occurred or is occurring."
   ],
   [
    "Why are containment, eradication and recovery grouped as one phase?",
    "They overlap and often repeat as new information appears, rather than happening in a strict single sequence."
   ]
  ]
 },
 {
  "t": "Detection and analysis: IoCs, scoping, impact, severity and triage",
  "body": [
   "Detection and analysis turns a raw signal into a confirmed, understood incident. It answers three questions: is this real, how big is it, and how urgent is it? Mistakes here ripple through the rest of the response, so the exam tests it heavily.",
   "Indicators of compromise (IoCs) are the evidence you work from: malicious file hashes, suspicious IP addresses and domains, registry keys, unusual processes, new accounts, specific log entries or user reports. Indicators of attack (IoAs) focus on behavior in progress, such as a process dumping credential memory, rather than a static artifact. Once you confirm one IoC, use it to pivot: search the SIEM and EDR for the same hash, domain or behavior on other systems.",
   "Scoping determines how far the incident extends: which hosts, accounts, applications, networks and data are affected, and over what time frame. Start from the first confirmed indicator and work outward, looking for lateral movement, other hosts contacting the same C2 infrastructure, and use of compromised credentials. Also work backward in time to find the initial access point and the earliest malicious activity (sometimes called patient zero). Under-scoping is dangerous: if you clean three hosts but the attacker is on a fourth, they will return.",
   "Impact describes the effect on the organization. NIST guidance frames it in three ways: functional impact (effect on business operations, from none to high, such as a critical service being down), information impact (whether data confidentiality, integrity or availability was affected, such as a privacy breach of customer records or theft of intellectual property) and recoverability (how much time and resources recovery will take, from regular to not recoverable). Consider also financial, legal and reputational impact, and whether regulated data is involved, which can trigger notification requirements.",
   "Severity combines those factors into a level, often on a scale such as low, medium, high and critical, defined in the IR plan. Clear definitions matter because severity drives who is notified, how fast the team must respond and whether the incident must be escalated to management.",
   "Triage is the rapid sorting of incoming alerts and events so the most important ones get attention first. An analyst reviews each alert, checks the asset's criticality and context, looks for corroborating evidence, decides whether it is a false positive, a benign true positive (real but authorized activity, such as a scheduled penetration test) or a true positive that needs response, and assigns priority. Document your reasoning in the ticket as you go; notes written during triage become the foundation of the timeline and final report."
  ],
  "terms": [
   [
    "Scoping",
    "Determining the full extent of an incident across systems, accounts, data and time."
   ],
   [
    "Patient zero",
    "The first system or user compromised in an incident, often revealing the initial access vector."
   ],
   [
    "Functional impact",
    "The effect of an incident on the organization's ability to deliver its services."
   ],
   [
    "Triage",
    "Quickly assessing and prioritizing alerts to decide which need investigation and response first."
   ],
   [
    "Indicator of attack",
    "A behavioral sign that an attack is in progress, as opposed to a static artifact."
   ]
  ],
  "example": "An EDR alert shows credential dumping on a file server. Triage marks it high priority because the server is critical. Scoping finds the same attacker tool on two more servers and logons using a domain admin account from a workstation in accounting. Because domain admin credentials are affected and customer data is on the servers, severity is raised to critical and the incident manager is notified.",
  "tip": "Scope before you eradicate. If a question asks what to do after confirming one infected host, the answer often involves searching for the same IoCs elsewhere to determine scope.",
  "check": [
   [
    "What three categories does NIST use to assess incident impact?",
    "Functional impact, information impact and recoverability."
   ],
   [
    "Why is under-scoping dangerous?",
    "Missed compromised systems or accounts let the attacker persist and return after the response ends."
   ],
   [
    "What is a benign true positive?",
    "An alert that correctly detected real activity, but the activity is authorized, such as an approved penetration test."
   ]
  ]
 },
 {
  "t": "Evidence acquisition: order of volatility, chain of custody, legal hold, forensic imaging and hash validation",
  "body": [
   "Evidence gathered during an incident may end up in court, in a regulator's review or in an insurance claim, and it is also what you rely on to understand what happened. Collecting it correctly means capturing it before it disappears, proving it has not been altered and documenting who handled it.",
   "The order of volatility tells you to collect the most short-lived data first. A common ordering, based on RFC 3227, is: CPU registers and cache; routing tables, ARP cache, process table, kernel statistics and system memory (RAM); temporary file systems; disk; remote logging and monitoring data; physical configuration and network topology; and finally archival media such as backups. In practice, this means capturing memory before you power off a machine, because RAM holds running processes, network connections, encryption keys and fileless malware that vanish at shutdown. Pulling the plug destroys that evidence, so do not reboot or shut down a suspect system until memory has been captured, unless ongoing damage forces you to.",
   "Chain of custody is the documented record of who collected each piece of evidence, when, where and how, and every person who has handled or had access to it since. Each transfer is logged with date, time, signatures and purpose. Evidence is stored securely, often in sealed, labeled bags or restricted storage. A gap in the chain can make evidence inadmissible, because the other side can argue it may have been tampered with.",
   "A legal hold (litigation hold) is a directive, usually from legal counsel, to preserve all potentially relevant data when litigation or investigation is reasonably anticipated. It overrides normal retention and deletion schedules, so logs, emails and backups that would ordinarily be rotated out must be kept. Failing to preserve data under a legal hold can bring serious legal penalties.",
   "Forensic imaging creates a bit-for-bit copy of storage media, including deleted files and unallocated space, not just a copy of visible files. Use a write blocker (hardware or software) to prevent any change to the original, and then analyze the copy, never the original. Tools such as FTK Imager or `dd` create images in raw or forensic formats like E01. When systems cannot be taken offline, live acquisition captures memory and data from the running system, accepting that it changes the system slightly.",
   "Hash validation proves integrity. Compute a cryptographic hash, typically SHA-256 (MD5 and SHA-1 are still seen in older tools but are considered weak), of the original media and of the image. Matching hashes show the image is an exact copy. Recompute the hash later, before analysis or presentation, to prove nothing has changed. Record all hashes in your documentation and chain of custody forms."
  ],
  "terms": [
   [
    "Order of volatility",
    "The principle of collecting evidence from the most to the least short-lived sources."
   ],
   [
    "Chain of custody",
    "Documentation tracking every person who handled evidence and every transfer, to prove its integrity."
   ],
   [
    "Legal hold",
    "A requirement to preserve all potentially relevant information because of anticipated litigation or investigation."
   ],
   [
    "Write blocker",
    "A device or software that allows reading from a drive while preventing any writes to it."
   ],
   [
    "Hash validation",
    "Comparing cryptographic hashes of original and copied evidence to prove they are identical and unaltered."
   ]
  ],
  "example": "Responding to a suspected insider data theft, an analyst captures RAM from the running laptop first, then shuts it down and images the drive with a hardware write blocker. SHA-256 hashes of the drive and image match. Each item is bagged, labeled and signed over to the evidence custodian, and legal issues a hold on the employee's email and file share.",
  "tip": "Memory before disk: RAM is more volatile than storage, so capture it first. Work on a verified copy, never the original, and remember that matching hashes prove integrity while chain of custody proves handling.",
  "check": [
   [
    "Which should you collect first, the contents of RAM or a disk image? Why?",
    "RAM, because it is more volatile and is lost when the system is powered off."
   ],
   [
    "What is the purpose of hashing a forensic image?",
    "To prove the image is an exact copy of the original and has not been altered since acquisition."
   ],
   [
    "What does a legal hold require?",
    "Preservation of all potentially relevant data, suspending normal deletion or retention schedules."
   ]
  ]
 },
 {
  "t": "Memory and disk analysis basics: Volatility, FTK Imager, Autopsy",
  "body": [
   "After evidence is acquired, it has to be analyzed. CySA+ expects you to know what the common open-source and free forensic tools do and what kinds of findings they produce, rather than every command option.",
   "Memory analysis examines a RAM capture to reconstruct what was running at the moment of acquisition. It is valuable because some malware runs only in memory (fileless malware), because attackers inject code into legitimate processes, and because memory holds network connections, command history and sometimes decrypted data or keys. The Volatility Framework is the best-known open-source memory analysis tool. Volatility 3 uses plugins named by operating system, for example `windows.pslist` (list processes from the kernel's process list), `windows.pstree` (show parent-child relationships), `windows.psscan` (scan memory for process structures, which can reveal hidden or terminated processes), `windows.netscan` (network connections and listening sockets), `windows.cmdline` (command lines), `windows.dlllist` (loaded DLLs) and `windows.malfind` (memory regions with suspicious executable, injected code). A process that appears in `psscan` but not `pslist` may be hidden by a rootkit.",
   "```text\nvol -f memory.raw windows.pstree\nvol -f memory.raw windows.netscan\nvol -f memory.raw windows.malfind\n```",
   "FTK Imager, from Exterro (originally AccessData), is a free Windows tool for acquisition and preview. It can create forensic images of physical drives, logical drives, folders and memory, in raw (dd) or E01 format, and it computes and verifies hashes of the image automatically. It can also mount images read-only and let you browse files, including deleted ones, before full analysis. It is mainly a collection and triage tool, not a full analysis suite.",
   "Autopsy is an open-source graphical digital forensics platform built on The Sleuth Kit. You create a case, add a disk image as a data source and run ingest modules that analyze it: file type identification, hash lookup (flagging known-bad files and ignoring known-good ones), keyword search, web browser history, recent documents, email, EXIF metadata from images, deleted file recovery and a timeline view that shows file system activity across time. Timelines are particularly useful for answering what happened around the time of compromise.",
   "Disk analysis concepts to know include file system timestamps (often summarized as MAC times: modified, accessed and changed or created), deleted files that remain in unallocated space until overwritten, file carving (recovering files by their signatures without file system metadata), slack space, and Windows artifacts such as prefetch files (evidence a program ran), the registry and event logs. Attackers sometimes alter timestamps (timestomping), so correlate multiple sources before drawing conclusions."
  ],
  "terms": [
   [
    "Volatility",
    "An open-source framework for analyzing memory captures using plugins that list processes, connections and injected code."
   ],
   [
    "FTK Imager",
    "A free tool for creating and previewing forensic images and memory captures, with built-in hash verification."
   ],
   [
    "Autopsy",
    "An open-source graphical forensic platform, built on The Sleuth Kit, for analyzing disk images."
   ],
   [
    "File carving",
    "Recovering files from raw data based on their headers and structure, without relying on file system records."
   ],
   [
    "Timestomping",
    "Altering file timestamps to hide when malicious files were created or modified."
   ]
  ],
  "example": "Analyzing a memory image, an investigator uses windows.pstree and sees rundll32.exe spawned by an Excel process. windows.netscan shows it connected to an external IP on port 443, and windows.malfind flags injected code in the process. In Autopsy, the disk image timeline shows the Excel attachment saved to Downloads two minutes before.",
  "tip": "Volatility is for memory, Autopsy is for analyzing disk images, FTK Imager is primarily for acquiring and previewing images. A process found by a memory scan but missing from the normal process list suggests hiding.",
  "check": [
   [
    "Which tool would you use to list network connections from a Windows memory capture?",
    "Volatility, using a plugin such as windows.netscan."
   ],
   [
    "What is the primary purpose of FTK Imager?",
    "Creating and previewing forensic images and memory captures, with hash verification."
   ],
   [
    "Why might a deleted file still be recoverable in Autopsy?",
    "Deleting usually removes only the file system reference; the data stays in unallocated space until overwritten, so it can be recovered or carved."
   ]
  ]
 },
 {
  "t": "Containment strategies: isolation, segmentation, and when to watch before acting",
  "body": [
   "Containment limits the damage of an incident and keeps it from spreading, buying time for eradication and recovery. The right strategy depends on what the attacker is doing, how critical the affected systems are, and how much you still need to learn. NIST suggests weighing potential damage and theft of resources, the need to preserve evidence, service availability, the time and resources needed, the effectiveness of the strategy, and the duration of the solution.",
   "Isolation cuts an affected system off from the rest of the network. It can be done by using EDR network containment (the host can talk only to the EDR console), moving the switch port to a quarantine VLAN, applying host firewall rules, disabling a wireless connection or physically unplugging the network cable. Isolation stops lateral movement and C2 traffic while leaving the machine powered on, so volatile evidence in memory survives. It is better than turning the machine off in most cases. Account-level containment is equally important: disable or reset compromised accounts, revoke active sessions and tokens, and rotate exposed keys, because an attacker with valid credentials may not need the original host at all.",
   "Segmentation-based containment restricts traffic between network zones rather than cutting off single hosts. If an infection is spreading in one department, you might block traffic from that VLAN to the data center or disable SMB between segments. Well-designed segmentation built in advance makes this fast; a flat network makes containment slow and disruptive. Other containment tools include blocking malicious IPs and domains at firewalls, proxies and DNS, sinkholing a C2 domain so infected hosts connect to a server you control, disabling a vulnerable service, and removing a compromised system from a load balancer.",
   "Sometimes the best immediate action is to watch before acting. If you contain too early, a skilled attacker may notice, change tactics, destroy evidence, trigger ransomware or retreat to other footholds you have not found, and you lose the chance to understand the full scope. Delayed containment means monitoring the attacker's activity closely, often with extra logging, packet capture or placing the system in a controlled environment, until you have identified all compromised systems and accounts, and then containing everything at once. This approach is appropriate for stealthy intrusions such as espionage where the immediate damage is low, and it is often coordinated with legal counsel and sometimes law enforcement.",
   "Delayed containment carries real risk: the attacker may cause damage or steal more data while you watch. It is not appropriate when there is active destruction, encryption, ongoing exfiltration of sensitive data or a threat to safety. Such a decision must be made by management with legal input, not by an individual analyst, and it should be documented.",
   "Whatever strategy you choose, preserve evidence first where possible, notify system owners, record every action with timestamps, and confirm that containment actually worked by watching for further indicators."
  ],
  "terms": [
   [
    "Isolation",
    "Cutting an affected system off from the network while keeping it running to preserve evidence."
   ],
   [
    "Quarantine VLAN",
    "A restricted network segment where suspect devices are placed with minimal or no access."
   ],
   [
    "Sinkholing",
    "Redirecting traffic for a malicious domain to a controlled server to disrupt C2 and identify infected hosts."
   ],
   [
    "Delayed containment",
    "Deliberately monitoring an intruder before containing, to learn scope, when the risk of waiting is acceptable."
   ]
  ],
  "example": "A SOC discovers that a state-sponsored actor has been quietly reading a research team's files for weeks. Because immediate damage is low and the attacker likely has other footholds, leadership approves two days of enhanced monitoring. The team identifies five compromised hosts and three accounts, then isolates all hosts and resets all credentials simultaneously.",
  "tip": "For active ransomware or destructive activity, contain immediately. Watching before acting fits stealthy espionage with low immediate damage, requires management and legal approval, and aims to contain everything at once.",
  "check": [
   [
    "Why is isolating a host usually better than powering it off?",
    "Isolation stops the threat from spreading while preserving volatile evidence in memory."
   ],
   [
    "When might an organization delay containment?",
    "When the attacker is stealthy, immediate damage is low, and learning the full scope before acting outweighs the risk, with management approval."
   ],
   [
    "Besides hosts, what else often needs to be contained?",
    "Compromised accounts and credentials, by disabling accounts, revoking sessions and rotating keys."
   ]
  ]
 },
 {
  "t": "Eradication and recovery: reimaging, removing persistence, restoring from clean backups, patching the entry point",
  "body": [
   "Containment stops the bleeding; eradication removes the cause, and recovery returns systems to normal operation. Doing these thoroughly determines whether the attacker is truly gone or simply waiting to return.",
   "Reimaging (rebuilding a system from a known-good image) is often the most reliable eradication method. Trying to clean malware in place is risky because you may miss components, rootkits or modified system files. A fresh image from a trusted, patched source removes everything the attacker changed on that system. Reimaging does not help, though, if the attacker's access came from stolen credentials, a compromised firmware layer, or other systems still infected, so it must be combined with the other steps. For firmware-level compromise, reflashing or replacing hardware may be needed.",
   "Removing persistence means finding and eliminating every mechanism the attacker set up to regain access: malicious services, scheduled tasks, registry Run keys, WMI subscriptions, web shells, cron jobs, SSH keys, new or modified accounts, mailbox forwarding rules, OAuth app grants in cloud tenants and backdoor VPN profiles. Reset credentials for all compromised accounts and any accounts whose passwords may have been exposed. In Active Directory compromises this can include resetting the KRBTGT account password twice, with an interval between resets, to invalidate forged Kerberos tickets. Scoping findings from detection and analysis guide this work; anything missed becomes the attacker's way back in.",
   "Restoring from clean backups returns data and systems to service. The important word is clean. Attackers, especially ransomware groups, may have been present for weeks, and backups taken during that time may contain their malware or persistence. Identify when the compromise began and restore from a point before it, or restore data files only and scan them before use. Backups should be protected from attackers through offline, immutable or segmented copies; the widely cited 3-2-1 practice keeps three copies of data on two types of media with one copy offsite. Test restores regularly so you know recovery works and how long it takes.",
   "Patching the entry point closes the door the attacker used. If they got in through an unpatched VPN appliance, a weak password on an exposed remote desktop service, or a vulnerable web application, restoring systems without fixing that weakness invites immediate reinfection. The fix might be a patch, a configuration change, MFA or removing the exposed service.",
   "Recovery also includes validation and monitoring: scan restored systems, confirm they meet the security baseline, bring them back in stages, and watch closely for the attacker's IoCs for weeks afterward. Business owners confirm that services work correctly before the incident is declared resolved."
  ],
  "terms": [
   [
    "Eradication",
    "Removing all components of a threat, including malware, persistence and attacker access."
   ],
   [
    "Reimaging",
    "Rebuilding a system from a trusted, known-good image to remove all attacker changes."
   ],
   [
    "Immutable backup",
    "A backup copy that cannot be modified or deleted during its retention period, protecting it from ransomware."
   ],
   [
    "Entry point",
    "The initial access vector the attacker used, which must be closed to prevent reinfection."
   ]
  ],
  "example": "After a ransomware incident traced to an unpatched remote-access appliance, the team patches the appliance and enforces MFA, rebuilds the affected servers from gold images, resets all domain credentials, removes a malicious scheduled task found on a file server, and restores data from immutable backups taken before the attacker's first logon three weeks earlier.",
  "tip": "Reimaging beats cleaning in place, restores must come from backups taken before the compromise began, and recovery is incomplete until the original entry point is fixed.",
  "check": [
   [
    "Why is reimaging preferred over cleaning malware from a system?",
    "Cleaning may miss hidden components or system modifications, while a trusted image removes all attacker changes."
   ],
   [
    "Why might a recent backup not be safe to restore?",
    "It may have been taken after the compromise began and contain the attacker's malware or persistence."
   ],
   [
    "What happens if you recover systems without patching the entry point?",
    "The attacker can use the same weakness to reinfect the environment."
   ]
  ]
 },
 {
  "t": "Preparation: IR plan, playbooks, tools, training, tabletop exercises, out-of-band communication",
  "body": [
   "Incident response is only as good as the preparation behind it. When an incident strikes, there is no time to decide who is in charge, find the right phone numbers or buy a forensic tool. Preparation is the first phase of the NIST lifecycle, and many exam questions describe a chaotic response and ask what should have been done beforehand.",
   "The incident response plan is the high-level document that establishes the program. It typically includes the plan's purpose and scope, definitions of events and incidents, severity levels, roles and responsibilities (incident manager, analysts, legal, communications, management), reporting and escalation requirements, communication guidelines, and metrics. It is supported by an IR policy approved by leadership that gives the team authority to act, for example to take a critical system offline.",
   "Playbooks (sometimes called runbooks, though runbooks are often more step-by-step technical procedures) give specific steps for common incident types: phishing, malware infection, ransomware, compromised account, data loss, denial of service and insider threat. A good playbook lists the triggering conditions, triage questions, containment options, who to notify, evidence to collect and criteria for escalation. Playbooks make responses consistent and are the basis for SOAR automation.",
   "Tools must be ready before they are needed: forensic workstations, write blockers, imaging and memory capture software, clean storage media, network taps, spare hardware, documentation templates and chain of custody forms. Many teams keep a jump bag with these items. Logging, EDR coverage, a SIEM and time synchronization all need to be in place, since you cannot go back and collect logs that were never recorded. Keep contact lists for internal teams, vendors, legal counsel, insurers and law enforcement up to date.",
   "Training ensures people can use the plan. Responders need technical skills, and all staff need awareness of how to report suspicious activity. Exercises test the plan: a tabletop exercise is a discussion-based session where participants walk through a scenario around a table, talking through decisions without touching systems. It is low cost and good for finding gaps in roles and communication. A walkthrough reviews the plan step by step. Functional or simulation exercises and full-scale exercises involve actually performing actions in a controlled way. Every exercise should end with an after-action review that improves the plan.",
   "Out-of-band communication means using channels separate from the potentially compromised environment. If attackers control email or the corporate chat system, they can read your response plans. Prepare alternatives in advance, such as phone bridges, personal or dedicated mobile devices, a separate messaging platform or a separate tenant, and make sure the team knows when to switch to them."
  ],
  "terms": [
   [
    "IR plan",
    "A document establishing the incident response program, roles, severity levels and procedures."
   ],
   [
    "Playbook",
    "A documented set of steps for responding to a specific type of incident."
   ],
   [
    "Tabletop exercise",
    "A discussion-based exercise where participants talk through their response to a hypothetical scenario."
   ],
   [
    "Jump bag",
    "A prepared kit of tools, media and documents that responders can take to an incident."
   ],
   [
    "Out-of-band communication",
    "Communicating through channels independent of the potentially compromised network or systems."
   ]
  ],
  "example": "During a tabletop exercise simulating a ransomware attack, the team realizes that their contact list lives only on a file server that would be encrypted and that the plan assumes responders will coordinate over corporate email. They add printed contact sheets, set up an out-of-band messaging group and a conference bridge, and update the ransomware playbook.",
  "tip": "Tabletop equals discussion, no systems touched. If a scenario says attackers may be monitoring email, choose out-of-band communication.",
  "check": [
   [
    "What is the main difference between a tabletop exercise and a full-scale exercise?",
    "A tabletop is a discussion of a scenario; a full-scale exercise involves actually performing response actions and mobilizing resources."
   ],
   [
    "Why is out-of-band communication important during an incident?",
    "Attackers may control or monitor normal channels such as email and chat, so responders need a separate, trusted channel."
   ],
   [
    "What does a playbook provide that the IR plan does not?",
    "Specific, step-by-step actions for a particular incident type, rather than overall program structure and roles."
   ]
  ]
 },
 {
  "t": "Post-incident activity: root cause analysis, lessons learned, updating playbooks and controls",
  "body": [
   "Post-incident activity is the phase that turns a painful event into a stronger organization. Without it, the same weaknesses produce the same incidents. It happens after the incident is resolved, but ideally soon, while details are fresh, often within a couple of weeks.",
   "Root cause analysis (RCA) identifies the underlying reason an incident happened, not just the immediate trigger. The immediate cause of a ransomware outbreak may be that a user opened a malicious attachment, but the root causes might include macros enabled by default, missing EDR on that endpoint and a flat network that allowed spread. Techniques include the five whys (repeatedly asking why until you reach a fundamental cause), fishbone or cause-and-effect diagrams that group contributing factors into categories such as people, process and technology, and timeline reconstruction. Good RCA focuses on systems and processes rather than blaming individuals, because blame discourages honest reporting.",
   "The lessons learned meeting brings together everyone involved: responders, IT, system owners, management and sometimes legal and communications. Typical questions are: exactly what happened and when; how well did staff and management perform; were documented procedures followed and were they adequate; what information was needed sooner; what actions might have slowed recovery; what would we do differently; how could information sharing with other groups improve; what corrective actions would prevent similar incidents; and which precursors or indicators should be watched for in the future. Capture both what went wrong and what went well.",
   "The findings must turn into concrete actions with owners and deadlines. Updating playbooks is one of the most direct outcomes: add steps that were missing, remove ones that did not work, adjust escalation criteria and add new incident types. Updating controls addresses root causes: new detection rules in the SIEM for the techniques observed, EDR policy changes, patching or configuration changes, MFA for exposed services, segmentation, training topics, and changes to logging so the next investigation has the data it needs. New IoCs should be added to blocklists and shared with partners, such as an ISAC, where appropriate.",
   "Other post-incident tasks include completing the incident report, retaining evidence according to policy and any legal hold, calculating the cost of the incident, and recording metrics such as time to detect and time to contain. Tracking corrective actions to completion matters: a lessons learned document that nobody acts on provides no protection.",
   "Post-incident activity feeds back into the preparation phase, completing the incident response lifecycle and making the next response faster and more effective."
  ],
  "terms": [
   [
    "Root cause analysis",
    "A structured investigation to find the fundamental reason an incident occurred."
   ],
   [
    "Five whys",
    "An RCA technique of repeatedly asking why a problem occurred until the underlying cause is reached."
   ],
   [
    "Lessons learned",
    "A review after an incident to identify what worked, what did not and what to change."
   ],
   [
    "Corrective action",
    "A specific, assigned improvement intended to prevent recurrence of an incident."
   ]
  ],
  "example": "A lessons learned review of a data breach finds that the SOC saw an alert but closed it because the playbook did not cover cloud storage. Root cause analysis shows the storage bucket was public because no configuration check existed. Actions include a new cloud playbook, a CSPM alert for public buckets, a detection rule for mass downloads, and a training session, each with an owner and due date.",
  "tip": "Root cause is the fundamental reason, not the first thing that went wrong. The value of lessons learned comes from assigned, tracked corrective actions that update playbooks and controls.",
  "check": [
   [
    "What is the difference between an immediate cause and a root cause?",
    "The immediate cause is the direct trigger; the root cause is the underlying weakness that allowed it, which must be fixed to prevent recurrence."
   ],
   [
    "Why should root cause analysis avoid blaming individuals?",
    "Blame discourages honest reporting and hides the process and system failures that actually need fixing."
   ],
   [
    "Name two outputs of post-incident activity.",
    "Updated playbooks and new or improved security controls, such as detection rules; also a final incident report."
   ]
  ]
 },
 {
  "t": "Vulnerability reports: affected hosts, risk scores, mitigation, recurrence, prioritization",
  "body": [
   "Scanning produces data; a vulnerability report turns that data into something people can act on. Different audiences need different reports, but most technical vulnerability reports share the same core elements, and CySA+ expects you to know what belongs in them and how to read them.",
   "Affected hosts identify exactly where each vulnerability exists: hostname, IP address, operating system, the port or service, the owning team and the asset's criticality. Group findings by asset or by owner so that each team receives a list it can act on, rather than a thousand-page export. Include enough evidence, such as the detected version or configuration value, for administrators to confirm the issue themselves.",
   "Risk scores show how serious each finding is. Most reports include the CVSS base score and severity, but a useful report also adds context-driven risk: whether the vulnerability is in the CISA KEV catalog, its EPSS probability, whether a public exploit exists, whether the host is internet-facing and how valuable the asset is. Many platforms combine these into their own risk rating. Explain which score is being used so readers are not confused when a CVSS 9.8 appears below a 7.5 in priority.",
   "Mitigation guidance tells the reader what to do: the patch or version to install, the configuration change needed, or a workaround and compensating control if a fix is not available. Link each finding to vendor advisories by CVE identifier. Actionable, specific guidance speeds remediation; a generic line such as apply latest patches does not.",
   "Recurrence tracks vulnerabilities that come back after being fixed or that appear repeatedly across scans. Recurring findings often point to a process problem rather than a technical one: a golden image that still contains an old library, a configuration management tool reverting settings, a team that restores systems from outdated templates, or patches that fail silently. Reports should highlight recurring items and aging items (those open past their remediation deadline) because they reveal where the program is failing.",
   "Prioritization ties everything together by ordering the work. A typical structure lists the few items that need immediate action (actively exploited, critical assets, internet-facing), then items due within the SLA for their severity, then lower-risk items and accepted exceptions. Remediation SLAs, such as a defined number of days for critical versus high findings, are set by policy and shown alongside each finding with its due date.",
   "Reports should also show trends over time (new, fixed and open vulnerabilities), since a single snapshot says little about whether the program is improving."
  ],
  "terms": [
   [
    "Affected host",
    "A specific system on which a vulnerability was detected, identified by name, IP and owner."
   ],
   [
    "Recurrence",
    "The reappearance of a vulnerability that was previously remediated."
   ],
   [
    "Remediation SLA",
    "A policy-defined time limit for fixing vulnerabilities of a given severity."
   ],
   [
    "Vulnerability aging",
    "How long a finding has remained open since it was first detected."
   ]
  ],
  "example": "A monthly report shows the same outdated Java runtime on 40 newly built servers every month, although each month's servers are patched. The recurrence section points the team to the server build image, which still includes the old version. Updating the image stops the finding from coming back.",
  "tip": "Recurring vulnerabilities usually indicate a process or image problem, not a patching failure on individual hosts. Good reports are specific, grouped by owner, prioritized by context and show trends.",
  "check": [
   [
    "What does a recurring vulnerability often indicate?",
    "A process problem, such as an outdated build image or configuration being reverted, rather than a single missed patch."
   ],
   [
    "Why include asset criticality and exploit status alongside CVSS in a report?",
    "CVSS alone does not reflect likelihood or business impact; context helps readers prioritize correctly."
   ],
   [
    "What makes mitigation guidance in a report useful?",
    "Specific, actionable steps such as the exact patch, version or configuration change, referenced by CVE."
   ]
  ]
 },
 {
  "t": "Compliance reports, action plans, exceptions and compensating controls",
  "body": [
   "Many organizations must prove to regulators, auditors, customers or card brands that they meet specific security requirements. Compliance reporting shows the current status against those requirements and what is being done about gaps. Analysts often supply the data and help write these reports.",
   "Compliance reports measure the environment against a framework or regulation. Examples include the Payment Card Industry Data Security Standard (PCI DSS) for card data, HIPAA for US health information, the GDPR for personal data of people in the EU, SOX for financial reporting controls, and internal policies based on frameworks such as NIST or ISO/IEC 27001. A compliance report typically lists each requirement or control, whether it is met, partially met or not met, the evidence supporting that status (scan results, configuration exports, screenshots, policies) and any gaps. Remember that compliance is not the same as security: a system can pass an audit and still be vulnerable, but compliance failures can bring fines, lost contracts and legal action.",
   "An action plan addresses the gaps. In US government contexts this is often called a plan of action and milestones (POA&M). Each item describes the weakness, the planned remediation, the resources required, the responsible owner, milestones and a target completion date, and it is updated as work progresses. Auditors look for realistic plans that are actually tracked, not just lists of intentions.",
   "Exceptions document requirements that will not be met for a period. A compliance exception explains which requirement is affected, why it cannot currently be met (a legacy system, a vendor constraint, a business need), the risk involved, the compensating controls in place, who approved it and when it expires. Exceptions must be approved by someone with the authority to accept that risk and reviewed regularly.",
   "Compensating controls are especially important in compliance. Some standards formally allow them when a requirement cannot be met as written, provided the alternative meets the intent and rigor of the original requirement, goes beyond other existing requirements, and is documented and validated. For example, if a legacy system cannot support required encryption at rest, the organization might isolate it on a restricted segment, strictly limit and log access, and monitor it closely. An assessor will want evidence that the compensating control works.",
   "When writing compliance reports, be accurate and evidence-based. Do not overstate compliance; auditors test claims, and misrepresentation is a serious problem. Map each finding to the specific requirement it affects, and keep records organized so evidence can be produced quickly during an audit."
  ],
  "terms": [
   [
    "Compliance report",
    "A report showing the organization's status against the requirements of a regulation, standard or policy, with evidence."
   ],
   [
    "POA&M",
    "Plan of action and milestones: a document tracking remediation of identified weaknesses with owners and dates."
   ],
   [
    "Compliance exception",
    "A formally approved, time-limited deviation from a requirement, with justification and compensating controls."
   ],
   [
    "Compensating control",
    "An alternative control that meets the intent of a requirement when the original cannot be implemented."
   ]
  ],
  "example": "A PCI DSS assessment finds that a point-of-sale back-office server runs software that cannot be upgraded to support a required control. The company documents a compensating control worksheet showing network isolation, restricted and logged access and file integrity monitoring, adds a POA&M item to replace the server within nine months, and has the risk owner approve the exception.",
  "tip": "An action plan fixes a gap over time with owners and dates; an exception accepts a gap temporarily; a compensating control reduces the risk of that gap. Compliance and security are related but not the same.",
  "check": [
   [
    "What should each item in a plan of action and milestones include?",
    "The weakness, planned remediation, resources, responsible owner, milestones and target completion date."
   ],
   [
    "What makes a compensating control acceptable in a compliance context?",
    "It must meet the intent and rigor of the original requirement, be documented and be validated as effective."
   ],
   [
    "Can an organization be compliant but still insecure?",
    "Yes. Compliance shows that specific requirements are met, but it does not guarantee protection against all threats."
   ]
  ]
 },
 {
  "t": "Metrics and KPIs: trends, top 10 lists, critical vulnerabilities, zero-days, SLA compliance",
  "body": [
   "Metrics tell you and your leadership whether the security program is working. A metric is any measured value, such as the number of open critical vulnerabilities. A key performance indicator (KPI) is a metric chosen because it reflects progress toward an important goal, often with a target, such as percentage of critical vulnerabilities fixed within the SLA. Good metrics lead to decisions; vanity metrics only look impressive.",
   "Trends matter more than snapshots. A report stating that there are 1,200 open vulnerabilities means little alone; showing that the number has fallen from 2,000 over six months, while the asset count grew, tells a real story. Common trend views include new versus remediated vulnerabilities per month, total open findings by severity, mean time to remediate, and scan coverage (the percentage of assets scanned). Trend charts also show whether a change, such as a new patching tool, actually made a difference.",
   "Top 10 lists focus attention. Examples include the top 10 most common vulnerabilities across the environment, the top 10 riskiest hosts, the teams with the most overdue findings or the top 10 applications by open critical issues. They help leadership and teams see where effort will have the greatest effect, since a single outdated library or missing configuration often accounts for a large share of findings.",
   "Critical vulnerabilities deserve their own tracking because they carry the most risk: count of open critical findings, how long each has been open, and how many are on internet-facing or high-value assets. Pair severity with exploitation data, such as items in the KEV catalog, so the metric reflects real risk.",
   "Zero-day vulnerabilities are flaws unknown to the vendor or for which no patch yet exists, sometimes already exploited in the wild. You cannot measure time to patch for them in the usual way, so reporting focuses on exposure (how many assets run the affected software), the compensating controls applied and how quickly they were applied, and the time to patch once a fix is released. Leaders frequently ask are we affected, and your asset inventory and reporting should answer quickly.",
   "SLA compliance measures whether vulnerabilities are fixed within the time frames set by policy for each severity. It is typically shown as a percentage, such as the share of critical findings remediated within the required days, broken down by team or business unit. Low SLA compliance in one team highlights where resources or processes need attention. Be careful with any metric that can be gamed: if teams are measured only on closing tickets, they may close findings without fixing them, so verify remediation with rescans."
  ],
  "terms": [
   [
    "KPI",
    "Key performance indicator: a metric tied to an important goal, usually with a target, used to measure progress."
   ],
   [
    "Trend analysis",
    "Examining metrics over time to show whether performance is improving or declining."
   ],
   [
    "Zero-day",
    "A vulnerability unknown to the vendor or without an available patch, possibly already exploited."
   ],
   [
    "SLA compliance",
    "The percentage of items handled within the time frames defined by a service level agreement or policy."
   ]
  ],
  "example": "The quarterly security dashboard shows critical findings down 40 percent, but SLA compliance for critical items is only 60 percent in one business unit. A top 10 list reveals that one legacy application accounts for most of that unit's overdue criticals, so leadership funds an upgrade project rather than asking the team to work harder.",
  "tip": "Know which metric fits which question: trends show direction, top 10 lists show where to focus, SLA compliance shows whether timelines are met, and zero-day reporting focuses on exposure and compensating controls.",
  "check": [
   [
    "What is the difference between a metric and a KPI?",
    "A metric is any measurement; a KPI is a metric selected because it indicates progress toward a key goal, usually with a target."
   ],
   [
    "Why can't you report time to patch for a zero-day in the usual way?",
    "No patch exists yet, so reporting focuses on exposure and compensating controls until one is released."
   ],
   [
    "How can SLA compliance be gamed, and how do you prevent it?",
    "Teams might close tickets without fixing issues; verifying remediation with rescans prevents this."
   ]
  ]
 },
 {
  "t": "Stakeholder identification and communication: technical teams, system owners, executives",
  "body": [
   "Security findings only matter if they reach the people who can act on them, in a form they understand. A large part of an analyst's work is communication, and CySA+ Domain 4 tests whether you can identify stakeholders and tailor your message to each.",
   "A stakeholder is anyone who has an interest in, is affected by or can influence a security issue. Identify them before you need them: for each critical system, know who operates it, who owns it from a business standpoint, who must be told when something goes wrong and who can approve changes. The asset inventory or CMDB should record owners, and the IR plan should list contacts. A simple tool is a RACI chart, which shows who is responsible (does the work), accountable (owns the outcome and signs off), consulted (gives input) and informed (kept updated) for each activity.",
   "Technical teams, such as system administrators, network engineers, developers and database administrators, perform the remediation. They need detail: affected hostnames and IPs, CVE numbers, evidence, exact versions or configuration settings, the recommended fix, deadlines and how you will verify the result. Present findings in their tools where possible, for example as tickets in their queue, grouped by system. Be precise and avoid exaggeration; credibility with technical teams depends on accurate findings, so validate before you send.",
   "System owners (business or data owners) are accountable for a system and the risk associated with it, even if they do not administer it. They decide on remediation timing, approve downtime and accept risk when necessary. They need to understand the business impact of a vulnerability or incident, the options available, the cost and disruption of each, and what happens if they do nothing. Frame the conversation around their operations, for example the chance that the online store goes offline, rather than around protocol details.",
   "Executives and senior management need a concise, high-level view: overall risk posture, trends, major incidents, business impact, costs, and decisions or resources required from them. They rarely want CVE numbers. Use plain language, summaries, a few clear charts and specific asks. A good executive message answers what happened or what is the risk, what does it mean for the business, what are we doing about it, and what do we need from you.",
   "Across all audiences, follow some shared practices: know your audience before writing; lead with the most important point; separate facts from assumptions; keep sensitive details on a need-to-know basis; use agreed channels and classification markings; and follow up to confirm the message was understood and action taken. Regular, predictable communication, such as a monthly vulnerability review with owners, builds trust and reduces friction when urgent issues arise."
  ],
  "terms": [
   [
    "Stakeholder",
    "Anyone with an interest in, affected by or able to influence a security issue or decision."
   ],
   [
    "System owner",
    "The person accountable for a system and its risks, who approves changes and accepts risk."
   ],
   [
    "RACI chart",
    "A matrix showing who is responsible, accountable, consulted and informed for each task."
   ],
   [
    "Executive summary",
    "A brief, non-technical overview of findings, impact and required decisions for leadership."
   ]
  ],
  "example": "After a critical flaw is found in the customer portal, the analyst sends the web team a ticket with the CVE, affected servers, evidence and patch steps; briefs the portal's business owner on the risk of customer data exposure and the need for a two-hour maintenance window; and gives the CIO a three-sentence summary with the planned fix date and one decision needed.",
  "tip": "Match detail to audience: technical teams get specifics, system owners get business impact and options, executives get summary, risk and decisions. The system owner, not the analyst, accepts risk.",
  "check": [
   [
    "What information does a technical team need to remediate a vulnerability?",
    "Affected hosts, evidence, CVE or finding details, the specific fix, deadline and how it will be verified."
   ],
   [
    "Who typically has authority to accept risk for a system?",
    "The system owner or another accountable business leader, not the analyst."
   ],
   [
    "What should an executive briefing emphasize?",
    "Business impact, overall risk, what is being done and any decisions or resources needed, in plain language."
   ]
  ]
 },
 {
  "t": "Incident response communication: legal, HR, public relations, regulators, law enforcement, customers",
  "body": [
   "During a serious incident, what the organization says, to whom and when can matter as much as the technical response. Poorly handled communication can create legal liability, alert the attacker, damage reputation or breach notification laws. The IR plan should define who communicates with each group, and most external communication should go through designated people, not individual analysts.",
   "Legal counsel should be involved early in significant incidents. Lawyers assess notification obligations under breach and privacy laws and contracts, advise on evidence preservation and legal holds, review public statements, coordinate with regulators and law enforcement, and manage litigation risk. In some jurisdictions, involving counsel can help protect certain investigation materials under legal privilege, which is why outside forensic firms are sometimes engaged through the legal team.",
   "Human resources (HR) becomes involved when employees are part of the incident, most obviously in insider threat cases, but also when staff personal data has been exposed or employee discipline may follow. HR ensures actions follow employment law, policy and any union agreements, and coordinates interviews and account terminations with security so evidence is not tipped off or lost.",
   "Public relations (PR) or corporate communications manages messaging to the media and the public. Consistent, accurate and timely statements protect reputation; speculation and contradictory messages damage it. Employees should be told to direct media questions to PR and to avoid discussing the incident on social media. PR works with legal so statements do not admit liability or disclose details that could help attackers.",
   "Regulators must be notified when laws or industry rules require it, such as data protection authorities, sector regulators or financial regulators. Many regulations set specific notification deadlines and content requirements, and the clock may start when the organization becomes aware of a breach, so knowing your obligations in advance is part of preparation. Legal and compliance teams usually own these notifications.",
   "Law enforcement may be contacted for criminal activity such as extortion, fraud or theft of data. Involvement can help with investigation, attribution and sometimes recovery of funds, but it may also bring requirements to preserve evidence and can affect the timeline. The decision to involve law enforcement is normally made by management with legal advice, and evidence must be handled with proper chain of custody.",
   "Customers and other affected parties, such as partners or suppliers, may need to be told what happened, what data was involved, what the organization is doing and what they should do, for example reset passwords or watch for fraud. Notifications should be clear, honest and timely, and they may be legally required. Throughout, limit the spread of sensitive incident details internally on a need-to-know basis and use out-of-band channels if normal systems may be compromised."
  ],
  "terms": [
   [
    "Breach notification",
    "A legally or contractually required notice to regulators or affected individuals after certain data breaches."
   ],
   [
    "Legal privilege",
    "Legal protection that can shield certain communications and work products prepared under counsel's direction from disclosure."
   ],
   [
    "Need to know",
    "Restricting information to people who require it to do their jobs."
   ],
   [
    "Designated spokesperson",
    "The person authorized to speak for the organization to media and the public."
   ]
  ],
  "example": "A retailer finds that attackers stole customer payment data. Legal determines notification deadlines and engages an outside forensic firm, PR prepares a holding statement, the regulator and payment brands are notified by compliance, law enforcement is contacted about the extortion demand, and customers receive a letter explaining what happened and what steps to take. Analysts are instructed to refer all outside questions to PR.",
  "tip": "Analysts should not talk to the media or notify regulators on their own; those communications go through designated roles, usually PR and legal. Insider cases require HR and legal involvement.",
  "check": [
   [
    "Why should legal counsel be involved early in a significant breach?",
    "To determine notification obligations, preserve evidence properly, manage liability and review external communications."
   ],
   [
    "Which department must be involved when an employee is suspected of stealing data?",
    "Human resources, along with legal, to ensure actions comply with employment law and policy."
   ],
   [
    "What should an analyst do if a reporter calls asking about an ongoing incident?",
    "Decline to comment and refer the reporter to the designated public relations contact."
   ]
  ]
 },
 {
  "t": "Incident declaration and escalation paths",
  "body": [
   "Not every alert is an incident. Declaring an incident is a formal decision that activates the incident response plan: it assigns an incident manager, mobilizes resources, starts documentation and triggers communication duties. Declaring too late wastes time; declaring for everything wears people out and dilutes attention. Clear criteria help analysts make the call confidently.",
   "Start with definitions. An event is any observable occurrence in a system or network, such as a login or a file download. An adverse event has negative consequences, such as a system crash or unauthorized access attempt. A security incident is a violation or imminent threat of violation of security policies, acceptable use policies or standard security practices. The IR plan should turn these definitions into practical criteria, for example: confirmed malware execution, confirmed unauthorized access to sensitive data, compromise of a privileged account or ransomware activity.",
   "Severity or priority levels determine how the incident is handled. A plan might define four levels with examples for each, a required response time, who must be notified and whether the incident needs round-the-clock work. Factors include functional impact, information impact (especially regulated or sensitive data), recoverability, number of systems or users affected and whether the threat is ongoing. Severity can change as more is learned, so reassess it as the investigation progresses.",
   "An escalation path defines who is contacted, in what order and within what time frame as severity rises. A typical SOC model has tiers: tier 1 analysts triage alerts and handle routine cases; tier 2 analysts perform deeper investigation; tier 3 or incident responders and threat hunters handle complex cases. Functional escalation moves an issue to someone with more expertise, while hierarchical escalation moves it up the management chain for decisions and authority. High-severity incidents typically escalate to the incident manager, the security leader (such as the chief information security officer), and then to legal, executive leadership and sometimes the board.",
   "Escalation paths should specify conditions as well as contacts: escalate if the incident involves personal or payment data, if a critical system is down beyond a set time, if an executive's account is compromised, or if the incident cannot be contained within a set window. They should include backups for each role in case someone is unavailable, contact methods including out-of-band options, and 24-hour coverage. Also plan for escalation to outside parties: managed security providers, cyber insurance carriers (many policies require prompt notice and approved vendors), outside counsel and incident response retainers.",
   "When in doubt, escalate. It is better to involve a senior responder in a false alarm than to let a real incident grow because a junior analyst hesitated. Document when the incident was declared, by whom and why, since that time can matter for regulatory notification deadlines."
  ],
  "terms": [
   [
    "Event",
    "Any observable occurrence in a system or network."
   ],
   [
    "Incident",
    "A violation or imminent threat of violation of security policies or standard security practices."
   ],
   [
    "Escalation path",
    "The defined sequence of people and groups to notify as an incident's severity or complexity increases."
   ],
   [
    "Functional escalation",
    "Transferring an issue to someone with greater technical expertise."
   ],
   [
    "Hierarchical escalation",
    "Raising an issue to higher levels of management for authority or decisions."
   ]
  ],
  "example": "A tier 1 analyst sees an alert for unusual logins to a payroll system. After confirming the logins came from an unfamiliar country with a valid executive account, the analyst escalates to tier 2, who confirms unauthorized access to employee financial data. The incident is declared high severity, the incident manager is paged, and the playbook requires notifying the CISO, legal and HR within one hour.",
  "tip": "Know event versus incident, and functional (to expertise) versus hierarchical (to management) escalation. Involvement of regulated data or privileged accounts usually raises severity and triggers escalation.",
  "check": [
   [
    "What is the difference between an event and an incident?",
    "An event is any observable occurrence; an incident is a violation or imminent threat of violation of security policies or practices."
   ],
   [
    "What is hierarchical escalation?",
    "Raising an issue to higher management levels for decisions or authority."
   ],
   [
    "Why should the time and reason for incident declaration be documented?",
    "It establishes accountability and can start regulatory notification clocks and other obligations."
   ]
  ]
 },
 {
  "t": "Incident reports: executive summary, who/what/when/where/why, timeline, impact, scope, evidence, recommendations",
  "body": [
   "An incident report is the official record of what happened and how the organization responded. It informs leadership, supports legal and regulatory needs, feeds lessons learned and becomes a reference for future incidents. CySA+ expects you to know its standard sections and what goes in each.",
   "The executive summary comes first and is written for leaders who may read nothing else. In a few paragraphs, it states what happened, when it was discovered, the business impact, whether it is contained or resolved, the root cause at a high level and the key recommendations or decisions needed. Avoid jargon and technical detail. Write it last, after the rest of the report is complete, so it accurately reflects the findings.",
   "The body answers the classic questions. Who: the affected users, systems and business units, the responders, and the threat actor if known (with a stated confidence level; avoid speculative attribution). What: the type of incident, the attacker's actions and the systems or data involved. When: the times of initial compromise, detection, containment, eradication and recovery, with time zones stated. Where: the locations, networks, hosts and cloud environments involved. Why: the root cause and contributing factors, meaning how the attacker got in and why controls did not stop them. How: the techniques used, often mapped to MITRE ATT&CK.",
   "The timeline lists events in chronological order with precise timestamps and sources, from the earliest attacker activity through response actions and closure. Distinguish attacker activity from responder actions. Timelines built from correlated logs, EDR data and forensic artifacts are often the most valuable part of the report, and they are why consistent time synchronization matters.",
   "Impact describes the effect on the organization: systems or services disrupted and for how long, data exposed or altered, number of records or individuals affected, financial costs, regulatory implications and reputational effects. Scope describes the extent: which and how many hosts, accounts, networks and data sets were involved, and equally important, what was investigated and found to be unaffected. Stating scope limits clearly avoids misunderstandings later.",
   "The evidence section summarizes the evidence collected and where it is stored, including hashes and chain of custody references, logs, images and screenshots that support each conclusion. Detailed technical artifacts and IoC lists are often placed in appendices. Recommendations close the report: specific, prioritized actions to prevent recurrence and improve response, each with a suggested owner, such as enforcing MFA on remote access, improving logging, updating a playbook or adding detection rules.",
   "Write reports factually and objectively. Separate confirmed facts from assumptions, avoid blame, and remember that the report may be read by lawyers, regulators and auditors, so accuracy and neutral language matter."
  ],
  "terms": [
   [
    "Executive summary",
    "A brief, non-technical opening section giving leaders the essential facts, impact and recommendations."
   ],
   [
    "Timeline",
    "A chronological record of attacker and responder activity with accurate timestamps and sources."
   ],
   [
    "Scope",
    "The extent of systems, accounts and data affected, and what was examined and found unaffected."
   ],
   [
    "Recommendations",
    "Specific, prioritized actions proposed to prevent recurrence and improve response."
   ]
  ],
  "example": "A report on a business email compromise opens with a half-page executive summary: an accounts payable mailbox was accessed through a phished password, one fraudulent payment was sent, the account is secured and MFA is being enforced. The body follows with a timeline from the phishing email to the password reset, the scope (one mailbox, no other accounts accessed), the log evidence, and five recommendations.",
  "tip": "The executive summary is for non-technical leaders and is written last. Timelines must use consistent time zones, and recommendations should be specific and actionable.",
  "check": [
   [
    "Why is the executive summary usually written last?",
    "It must accurately summarize findings, impact and recommendations that are only complete once the rest of the report is done."
   ],
   [
    "Why should a report state what was found to be unaffected?",
    "Clear scope limits prevent misunderstandings and show the thoroughness and boundaries of the investigation."
   ],
   [
    "What belongs in the evidence section?",
    "A summary of collected evidence, its location, hashes and chain of custody references that support the conclusions."
   ]
  ]
 },
 {
  "t": "Root cause analysis and lessons learned feeding back into reporting",
  "body": [
   "Reporting is not just a record of the past; it is how an organization learns. Root cause analysis (RCA) and lessons learned produce insights, and good reporting carries those insights into decisions, metrics and future reports so that improvement is visible and measurable.",
   "Root cause analysis looks past symptoms to the underlying reasons for an incident or a recurring vulnerability. The five whys technique repeatedly asks why until you reach a cause you can fix; for example, a server was compromised because it was unpatched, because it was missing from the patch tool, because it was built outside the standard process, because an urgent project skipped the build checklist, because there was no enforced gate in the provisioning process. The last answer is the root cause. Fishbone (Ishikawa) diagrams organize contributing factors into categories such as people, process, technology and environment, which helps teams see that incidents usually have several causes.",
   "Lessons learned sessions capture what went well and what did not across people, process and technology. The output is a list of corrective and preventive actions, each with an owner, a due date and a way to verify completion. For vulnerability management, similar reviews can examine why certain findings keep recurring or why SLAs are missed.",
   "Feeding back into reporting means several things. First, the incident or vulnerability report should include the root cause and the resulting actions, not just a description of events. Second, the corrective actions should be tracked in subsequent reports, such as a monthly security report section showing open lessons learned actions and their status, so that leadership can see whether promised changes happened. Third, metrics should be updated or added to measure the issue exposed by the RCA; if an incident revealed slow detection of cloud misconfigurations, start reporting how many misconfigurations are found and how quickly they are fixed.",
   "Feedback also improves the reports themselves. If readers found a report confusing, if executives lacked the information they needed to make a decision, or if the timeline was hard to build because of inconsistent logging, change the report templates and data sources. Many teams update report templates, playbooks and dashboards as a standard lessons learned action.",
   "Over time this creates a loop: incidents and findings are analyzed, root causes are fixed, improvements are measured and reported, and reporting highlights the next area to improve. Showing trends such as fewer repeat incidents of the same type or reduced recurrence of the same vulnerability demonstrates that lessons are actually being learned rather than simply written down."
  ],
  "terms": [
   [
    "Root cause",
    "The fundamental underlying reason for a problem, which, if corrected, prevents recurrence."
   ],
   [
    "Fishbone diagram",
    "A cause-and-effect diagram that groups contributing factors into categories to find root causes."
   ],
   [
    "Preventive action",
    "An action taken to stop a problem from occurring again or in the first place."
   ],
   [
    "Feedback loop",
    "A cycle in which results of analysis are used to change processes, which are then measured and reviewed again."
   ]
  ],
  "example": "RCA of three separate malware incidents shows all started on laptops missing EDR because new devices were imaged without the agent. The lessons learned action adds the agent to the image and a check to provisioning. The monthly report adds a new metric, EDR coverage percentage, which rises from 88 to 99 percent over two months, and no further incidents of this type occur.",
  "tip": "Lessons learned only count when actions are assigned, tracked and reflected in later reporting and metrics. Look for answers that close the loop rather than just documenting.",
  "check": [
   [
    "How does the five whys technique find a root cause?",
    "By repeatedly asking why each cause occurred until reaching an underlying process or system issue that can be fixed."
   ],
   [
    "How should corrective actions from lessons learned appear in later reporting?",
    "They should be tracked with owners and status in subsequent reports so leadership can see they were completed."
   ],
   [
    "Give an example of a metric added because of RCA.",
    "EDR coverage percentage after incidents traced to unprotected devices, or time to fix cloud misconfigurations after a cloud breach."
   ]
  ]
 },
 {
  "t": "Response metrics: mean time to detect, respond and remediate; alert volume",
  "body": [
   "Response metrics measure how quickly and effectively a security operation finds and handles threats. Speed matters because the longer an attacker operates undetected, the more damage they can do. These metrics help justify investment, find bottlenecks and show improvement over time.",
   "Mean time to detect (MTTD) is the average time between when an incident actually starts, such as the first malicious activity, and when the organization detects it. It is often the longest interval, sometimes measured in days or months for stealthy attacks. Improving MTTD depends on logging coverage, detection rules, threat hunting and analyst capacity. Note that the start time is often only known after investigation, so MTTD is calculated after incidents close.",
   "Mean time to respond (MTTR) usually measures the average time from detection to the start of response or to containment. Some organizations split it into mean time to acknowledge (how quickly an analyst picks up an alert) and mean time to contain. Mean time to remediate, also abbreviated MTTR, measures the time from detection or discovery to full resolution, for incidents or for vulnerabilities (from detection to verified fix). Because the same abbreviation is used for different things (and in IT operations it can also mean mean time to repair or recover), reports should always define each metric precisely.",
   "Averages can mislead. One incident that took 90 days can distort a mean, so many teams also report the median and percentiles, and segment metrics by severity or incident type. A fast MTTR for low-severity phishing tickets should not hide a slow response to critical incidents. Always pair time metrics with quality measures, since closing incidents quickly but incorrectly is not an improvement.",
   "Alert volume is the number of alerts generated over a period, often broken down by source, rule and severity. Tracking it shows analyst workload and helps with staffing. More useful than raw volume are ratios: the true positive rate (share of alerts that were real), the false positive rate, alerts per analyst per shift, and the percentage of alerts escalated to incidents. A rule that fires hundreds of times a day with no true positives is a candidate for tuning or retirement. Rising alert volume without more staff or automation leads to alert fatigue and longer response times.",
   "Other related measures include dwell time (how long an attacker was present before eradication), the percentage of incidents detected internally versus reported by outsiders, automation rate (share of alerts handled by SOAR without manual work) and SLA compliance for response times by severity. Present trends over time, and connect them to actions: new detection content should lower MTTD, SOAR playbooks should lower response time and alert volume per analyst, and tuning should raise the true positive rate."
  ],
  "terms": [
   [
    "MTTD",
    "Mean time to detect: average time from the start of an incident to its detection."
   ],
   [
    "MTTR",
    "Mean time to respond or remediate: average time from detection to response or full resolution; define which in reports."
   ],
   [
    "Dwell time",
    "The length of time an attacker remains in an environment before being detected or removed."
   ],
   [
    "True positive rate",
    "The proportion of alerts that correspond to real malicious or policy-violating activity."
   ],
   [
    "Alert volume",
    "The number of alerts generated in a period, used to gauge workload and detection quality."
   ]
  ],
  "example": "A SOC's quarterly metrics show MTTD improved from 6 days to 2 days after adding Sysmon-based detections, but mean time to contain rose because alert volume doubled. Analysis shows two noisy rules generate 40 percent of alerts with a true positive rate near zero. Tuning them and adding a SOAR enrichment playbook brings containment time back down.",
  "tip": "MTTD measures detection speed; MTTR measures response or remediation speed and must be defined because the acronym is ambiguous. High alert volume with a low true positive rate signals a need for tuning.",
  "check": [
   [
    "What does mean time to detect measure?",
    "The average time between when an incident begins and when it is detected."
   ],
   [
    "Why can mean values be misleading for response metrics?",
    "Outliers can skew averages, so medians, percentiles and breakdowns by severity give a truer picture."
   ],
   [
    "What does a high alert volume with a low true positive rate suggest?",
    "Detection rules need tuning, because analysts are spending time on noise, which raises the risk of alert fatigue."
   ]
  ]
 }
]);
