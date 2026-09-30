/* Lessons for CompTIA CySA+ (CS0-004): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("cysa-plus", [
 {
  "t": "System and network architecture: on-prem, cloud, hybrid, serverless, containers, segmentation, zero trust, SASE",
  "body": [
   "As a security analyst you defend whatever architecture the organization actually runs, and each model changes three things you care about: where your logs come from, who is responsible for which controls, and how far an attacker can move after getting in. The CySA+ exam expects you to recognize the common models and reason about their security trade-offs rather than configure them in detail. When a scenario describes an environment, your first job is to picture where the data lives, who manages each layer and which telemetry you can realistically collect.",
   "An on-premises (on-prem) environment is one where the organization owns the hardware, the network and the data center, so it also owns every layer of security, from physical locks to patching. Cloud environments split that work under the shared responsibility model: the provider secures the underlying facilities, hardware and virtualization, while the customer always remains responsible for its data, identities, access policies and configuration. How much else the customer handles depends on the service model. Infrastructure as a Service (IaaS) leaves the operating system and everything above it to you, Platform as a Service (PaaS) hides the operating system, and Software as a Service (SaaS) leaves you mainly with accounts, data and settings. A hybrid environment mixes on-prem and cloud, which usually means two sets of controls, two logging pipelines and identity that has to be synchronized between them.",
   "Serverless computing, such as functions that run only when an event triggers them, removes the server you would normally harden. You cannot install an agent on it, so visibility comes from the provider's logs, and the main risks move to overly broad permissions on the function's role, untrusted event input and vulnerable code dependencies. Containers package an application with its libraries and share the host's kernel. They start quickly and are easy to replace, but a vulnerable base image gets copied everywhere, a container running with excessive privileges can threaten its host, and short-lived containers may vanish before you collect evidence. Image scanning, minimal base images, non-root containers and logging from the orchestration platform are the usual controls.",
   "Segmentation divides a network into zones so that a compromise in one zone does not give access to everything. It can be done with virtual local area networks (VLANs) and firewalls between them, with a screened subnet, also called a demilitarized zone (DMZ), for internet-facing servers, or with microsegmentation, which applies policy down to individual workloads. Zero trust goes further and drops the idea that anything inside the perimeter is trustworthy. Every request is authenticated, authorized and evaluated in context (user, device health, location, sensitivity of the resource) each time, with least privilege. The architecture separates a control plane, where a policy engine and policy administrator decide, from a data plane, where policy enforcement points allow or block traffic. Secure Access Service Edge (SASE) delivers networking and security as a cloud service close to the user, combining software-defined wide area networking (SD-WAN) with a secure web gateway, a cloud access security broker, firewall as a service and zero trust network access (ZTNA).",
   "Consider a worked example. A retailer moves its web store to containers in a public cloud while payroll stays in the on-prem data center, connected by a site-to-site virtual private network (VPN) that allows all traffic. During a review you notice that a compromised container could reach the payroll database directly across that tunnel. Your recommendations follow the models above: restrict the tunnel so only the one application programming interface (API) port the store needs is allowed, run containers as non-root from a scanned minimal image, send orchestration and cloud audit logs to the security information and event management (SIEM) system, and put administrator access to both environments behind a zero trust access broker that checks user identity and device health.",
   "Common mistakes: assuming the cloud provider is responsible for customer data or misconfigured storage (it never is); treating a VPN as zero trust, when a traditional VPN grants broad network access once connected; thinking segmentation alone stops attackers, when it only limits where they can go and makes cross-zone traffic visible; and forgetting that serverless and container workloads need different visibility, because you cannot simply install the usual endpoint agent everywhere. Another trap is confusing SASE, which is an architecture delivered from the cloud, with a single product such as a firewall.",
   "Exam questions usually describe an environment and ask for the best fit. Clue words such as 'remote users, cloud applications, no central office, combined networking and security delivered from the cloud' point to SASE. 'Never trust, always verify', 'continuous verification' or 'regardless of network location' point to zero trust. 'Limit lateral movement between workloads' points to microsegmentation. 'Who is responsible for the guest operating system in IaaS' is the customer. 'Cannot install an agent' and 'event-driven code' point to serverless, and 'vulnerable base image' points to containers."
  ],
  "terms": [
   [
    "Shared responsibility model",
    "The division of security duties between a cloud provider, which secures the underlying infrastructure, and the customer, which secures its data, identities and configuration."
   ],
   [
    "Serverless",
    "A cloud model where code runs only when triggered and the provider manages all servers, so security focuses on permissions, inputs and dependencies."
   ],
   [
    "Container",
    "A lightweight package of an application and its libraries that shares the host operating system kernel."
   ],
   [
    "Microsegmentation",
    "Applying security policy between individual workloads rather than only between large network zones."
   ],
   [
    "Zero trust",
    "A model that verifies every access request in context and grants least privilege, regardless of network location."
   ],
   [
    "Policy enforcement point",
    "The zero trust component in the data plane that allows or blocks a connection based on the policy engine's decision."
   ],
   [
    "SASE",
    "Secure Access Service Edge, a cloud-delivered combination of SD-WAN and security services such as secure web gateway, CASB, firewall as a service and ZTNA."
   ]
  ],
  "example": "A retailer runs its web store in cloud containers and payroll on-prem, joined by a VPN that allows any traffic. An analyst finds that a compromised container could reach the payroll database. The team restricts the tunnel to one API port, rebuilds images from a minimal scanned base running as non-root, forwards orchestration and cloud audit logs to the SIEM, and requires a zero trust broker with device checks for all admin access.",
  "tip": "If a scenario stresses remote users and cloud apps with networking and security delivered from the cloud, choose SASE. If it stresses verifying every request regardless of location, choose zero trust. The customer always owns data and configuration in the cloud.",
  "check": [
   [
    "In an IaaS deployment, who is responsible for patching the guest operating system?",
    "The customer, because in IaaS the provider secures only the physical infrastructure and virtualization layer."
   ],
   [
    "Why is visibility harder for serverless functions than for virtual machines?",
    "There is no server you manage, so you cannot install an endpoint agent and must rely on the provider's logs and the function's own logging."
   ],
   [
    "What does microsegmentation add beyond VLAN-based segmentation?",
    "It enforces policy between individual workloads, limiting lateral movement even between systems in the same zone."
   ],
   [
    "A company wants SD-WAN, secure web gateway and ZTNA delivered as one cloud service for a remote workforce. What is this called?",
    "Secure Access Service Edge (SASE)."
   ]
  ]
 },
 {
  "t": "Identity and access: MFA, SSO, federation, PAM, just-in-time access, CASB",
  "body": [
   "Most modern intrusions involve stolen or misused credentials, so identity is often called the new perimeter. An attacker who logs in with a valid account looks, at first glance, like a normal user, which is why identity controls and the logs they produce are central to an analyst's work. For CySA+ you need to know how each identity control works, which threat it counters, what its logs look like and which weaknesses attackers target.",
   "Multifactor authentication (MFA) requires factors from at least two different categories: something you know (a password or PIN), something you have (a phone, hardware token or smart card) and something you are (a fingerprint or face). Two passwords are still one factor. Not all MFA is equal. Codes sent by SMS can be intercepted through SIM swapping, and push notifications can be abused through MFA fatigue, where an attacker who already has the password sends repeated prompts until the user approves one. Number matching reduces fatigue attacks, and phishing-resistant methods such as FIDO2 security keys or passkeys bind the login to the genuine site, so a fake site cannot relay them. In logs, watch for many denied prompts followed by an approval, or a new MFA device registered right after a suspicious login.",
   "Single sign-on (SSO) lets a user authenticate once and reach many applications. Federation extends that trust across organizations or domains: an identity provider (IdP) authenticates the user and sends a signed assertion or token to a service provider (SP), which trusts the IdP instead of storing its own passwords. Security Assertion Markup Language (SAML) is common for enterprise web apps, OAuth 2.0 handles delegated authorization (letting an app act on your behalf without your password), and OpenID Connect (OIDC) adds an authentication layer on top of OAuth. SSO reduces password reuse and centralizes logging and account disabling, but it also makes the IdP a high-value target, because one stolen session token can open many doors.",
   "Privileged access management (PAM) protects administrator, root and service accounts. A PAM system vaults credentials, rotates them automatically, requires check-out with approval, records privileged sessions and can inject credentials without revealing them to the user. Just-in-time (JIT) access removes standing privilege: a user requests elevation for a specific task and time window, and the rights disappear automatically afterward. A cloud access security broker (CASB) sits between users and cloud services to provide visibility and control. It discovers shadow IT (unsanctioned apps), enforces policies such as blocking uploads of sensitive data, detects risky behavior and checks compliance, working through API connections to sanctioned services, inline proxies, or both.",
   "Consider a worked example. At 02:14 an analyst sees 25 declined MFA push prompts for a finance user, followed at 02:41 by one approval from the same unfamiliar country. Minutes later the mailbox gains a rule forwarding messages containing 'invoice' to an external address. The pattern is MFA fatigue after password theft. The response is to disable the account, revoke active sessions and refresh tokens, reset the password, remove the forwarding rule and any newly registered MFA devices, and review what was accessed. Longer term, the organization moves finance staff to number matching or FIDO2 keys and alerts on bursts of denied prompts.",
   "Common mistakes: counting a password plus a security question as MFA (both are something you know); assuming SSO itself is a security weakness rather than recognizing it concentrates risk in the IdP; confusing OAuth, which is authorization, with authentication; believing a password reset alone ends an incident, when stolen session tokens may still be valid; and treating PAM and JIT as the same thing. PAM manages and monitors privileged credentials, while JIT is about granting privilege only when needed. They work well together.",
   "Exam questions often name a threat and ask for the matching control. 'Password theft' or 'credential stuffing' points to MFA; 'repeated push prompts' points to MFA fatigue and a fix such as number matching or phishing-resistant MFA. 'Users have too many passwords' points to SSO; 'trust between two organizations' points to federation. 'Eliminate standing admin rights' points to just-in-time access, while 'vault, rotate and record admin sessions' points to PAM. 'Shadow IT' or 'control data going to cloud apps' points to a CASB. If two answers both seem reasonable, pick the one that removes the specific weakness the scenario describes."
  ],
  "terms": [
   [
    "MFA",
    "Multifactor authentication, which requires factors from at least two different categories: know, have and are."
   ],
   [
    "MFA fatigue",
    "An attack in which repeated push prompts are sent until a tired or confused user approves one."
   ],
   [
    "Federation",
    "A trust relationship in which a service provider accepts identity assertions from an external identity provider."
   ],
   [
    "OpenID Connect",
    "An authentication layer built on OAuth 2.0 that tells an application who the user is."
   ],
   [
    "PAM",
    "Privileged access management, which vaults, rotates, controls and records use of high-privilege accounts."
   ],
   [
    "Just-in-time access",
    "Granting elevated rights only for a specific task and time window, then removing them automatically."
   ],
   [
    "CASB",
    "Cloud access security broker, a control point that gives visibility and policy enforcement over cloud service use."
   ]
  ],
  "example": "An analyst sees 25 declined MFA push prompts for a finance user between 2 and 3 a.m., then one approval, then a new mailbox rule forwarding invoices to an outside address. The account is disabled, sessions and tokens revoked, the password reset and the rule removed. The organization then moves finance staff to number matching and FIDO2 keys and adds a SIEM alert for bursts of denied prompts.",
  "tip": "OAuth is authorization; SAML and OpenID Connect handle authentication. When a question asks how to remove standing admin rights, choose just-in-time access rather than simply adding MFA or PAM.",
  "check": [
   [
    "Why is a password plus a PIN not multifactor authentication?",
    "Both are something you know, so they come from the same factor category."
   ],
   [
    "What log pattern suggests an MFA fatigue attack?",
    "Many denied or ignored push prompts in a short period, followed by an approval, often at an odd hour or from an unusual location."
   ],
   [
    "In federation, which party authenticates the user and which party trusts the result?",
    "The identity provider authenticates the user; the service provider trusts the signed assertion or token it receives."
   ],
   [
    "Which control would discover employees using unsanctioned cloud file-sharing apps?",
    "A cloud access security broker (CASB), which provides shadow IT discovery and cloud usage policy enforcement."
   ]
  ]
 },
 {
  "t": "Logging: log ingestion, time synchronization (NTP), log levels, Windows Event IDs, Sysmon, Linux auth logs",
  "body": [
   "Logs are the analyst's primary evidence. If a system does not log an event, or the log never reaches your central platform, you cannot detect it or investigate it later. CySA+ expects you to know how logs are collected, why their timestamps must agree, how severity levels work and which specific events on Windows and Linux tell you something important.",
   "Log ingestion is the process of collecting logs from sources such as servers, firewalls, endpoints and cloud services and bringing them into a central store such as a security information and event management (SIEM) system. Sources may push events via syslog, agents or forwarders, or the platform may pull them through application programming interfaces (APIs). During ingestion, logs are parsed and normalized so that fields like source IP and username mean the same thing across vendors. Centralizing logs also protects them, because an attacker who clears local logs cannot easily erase the copy already sent away. Watch for ingestion gaps: a source that suddenly stops sending may be broken, or may have been silenced by an attacker.",
   "Time synchronization is essential for correlation. If a firewall is three minutes ahead of a domain controller, a timeline built from both will show events in the wrong order. The Network Time Protocol (NTP) keeps clocks aligned to a reliable time source, and best practice is to record timestamps in Coordinated Universal Time (UTC) or with an explicit time zone offset. Syslog defines severity levels from 0 to 7: emergency, alert, critical, error, warning, notice, informational and debug. Lower numbers are more severe. Logging only high severities saves storage but can hide useful detail, and debug is rarely left on in production because of volume and the chance of recording sensitive data.",
   "On Windows, the Security log records key events by ID. The most useful are 4624 successful logon, 4625 failed logon, 4634 or 4647 logoff, 4648 logon with explicit credentials, 4672 special privileges assigned to a new logon, 4688 new process created, 4720 user account created, 4728 or 4732 member added to a security group, 4740 account locked out and 1102 audit log cleared. Event 7045 in the System log records a new service installed. System Monitor (Sysmon), a free Microsoft Sysinternals tool, adds richer telemetry controlled by an XML configuration: ID 1 process creation with command line, hashes and parent; 3 network connection; 7 image loaded; 8 CreateRemoteThread; 10 process access, such as a tool reading LSASS memory; 11 file created; 12 to 14 registry events; and 22 DNS query. On Linux, authentication events go to `/var/log/auth.log` on Debian and Ubuntu or `/var/log/secure` on Red Hat family systems, and systemd hosts can be queried with `journalctl`. Look for `Failed password`, `Accepted publickey` and `sudo` lines; `last` and `lastb` summarize successful and failed logins.",
   "Consider a worked example. During a password-spraying investigation you find hundreds of 4625 events across many different accounts from one IP address within an hour, then a 4624 with logon type 10 (remote interactive) for one account. The VPN appliance logs show the same user connecting, but its timestamps seem to come after the logon. You discover the appliance was not using NTP and ran eight minutes slow. After correcting for the offset, the timeline shows the VPN session from the spraying IP arrived just before the successful logon, which proves the account was compromised. The fix list includes pointing the appliance at the NTP servers.",
   "Common mistakes: reading syslog levels backwards (0 is the most severe, 7 is debug); mixing up 4624 and 4625; assuming a burst of 4625 events on one account is spraying (spraying is few attempts across many accounts, while brute force is many attempts on one account); forgetting that Sysmon must be installed and configured, since it is not on by default; and ignoring 1102, which is rarely benign because clearing the audit log is a classic anti-forensics step.",
   "Exam questions often hand you an event ID or a log line and ask what happened. Many 4625s followed by a 4624 suggests a successful password attack. 4720 or 4732 outside a change ticket suggests persistence or privilege escalation. 1102 means the audit log was cleared. Sysmon 1 with an odd parent process, or Sysmon 10 targeting LSASS, suggests malicious execution or credential dumping. 'Events appear out of order across devices' points to NTP. 'Failed password for invalid user' in auth.log points to SSH guessing."
  ],
  "terms": [
   [
    "Log ingestion",
    "Collecting logs from many sources into a central platform, then parsing and normalizing them."
   ],
   [
    "Normalization",
    "Mapping fields from different vendors' logs into a common format so they can be searched and correlated together."
   ],
   [
    "NTP",
    "Network Time Protocol, which synchronizes system clocks so timestamps from different devices can be correlated."
   ],
   [
    "Syslog severity",
    "A 0 to 7 scale where 0 is emergency and 7 is debug, with lower numbers being more severe."
   ],
   [
    "Event ID 4625",
    "The Windows Security log event for a failed logon attempt."
   ],
   [
    "Sysmon",
    "A Microsoft Sysinternals tool that logs detailed process, network, file and registry activity to the Windows event log."
   ],
   [
    "auth.log / secure",
    "The Linux files that record authentication events on Debian-family and Red Hat-family systems respectively."
   ]
  ],
  "example": "During a password-spraying investigation, an analyst finds hundreds of 4625 events across many accounts from one IP, then a 4624 logon type 10 for one account. The VPN appliance was not using NTP and its clock was eight minutes slow, so the analyst corrected the offset before proving the VPN session came from the spraying IP. Remediation included resetting the account and configuring NTP on every network appliance.",
  "tip": "Know the most tested IDs: 4624 success, 4625 failure, 4688 process creation, 4720 account created, 4732 group membership change, 1102 log cleared, 7045 service installed, and Sysmon 1 process creation and 3 network connection. Syslog level 0 is the most severe.",
  "check": [
   [
    "Why must all logging sources use NTP?",
    "So their timestamps agree, allowing events from different devices to be placed in the correct order during correlation."
   ],
   [
    "Which syslog severity number is the most severe, and what is it called?",
    "Level 0, emergency."
   ],
   [
    "What does Windows event 1102 indicate and why is it suspicious?",
    "The Security audit log was cleared, which attackers often do to hide their activity."
   ],
   [
    "Where would you look for SSH login failures on an Ubuntu server?",
    "In /var/log/auth.log, or with journalctl for the ssh service on systemd hosts."
   ]
  ]
 },
 {
  "t": "Network indicators: beaconing, unusual bandwidth, irregular peer-to-peer traffic, rogue devices, scans, unexpected ports",
  "body": [
   "Network indicators are patterns in traffic that suggest compromise. They matter because malware almost always has to communicate: to receive commands, to spread, or to send stolen data out. You find these patterns in firewall logs, NetFlow or similar flow records, proxy and Domain Name System (DNS) logs, and packet captures. Most network indicators only make sense against a baseline, meaning a picture of what normal traffic looks like for that host, subnet or time of day.",
   "Beaconing is regular outbound communication from an infected host to a command-and-control (C2) server, checking in for instructions. The classic sign is connections to the same destination at a steady interval, such as every 60 seconds, often with similar packet sizes, continuing overnight and at weekends when nobody is working. Attackers add jitter, which is random variation in timing, to hide the pattern, so analysts look at the overall distribution of intervals, how rare the destination is across the organization, unusual user agents and long, random-looking DNS names. Unusual bandwidth consumption can mean data exfiltration, a denial-of-service attack or a host being used for illegitimate purposes. Direction matters: large inbound transfers are normal for downloads, but large outbound transfers from a server or user machine, especially at odd hours, deserve attention.",
   "Irregular peer-to-peer (P2P) traffic is direct communication between clients rather than client to server. In a corporate network, workstations rarely need to talk to each other directly, so workstation-to-workstation Server Message Block (SMB), Remote Desktop Protocol (RDP) or Windows Remote Management (WinRM) traffic may indicate lateral movement or a worm. External P2P may indicate unauthorized file sharing or botnets using P2P for C2. Rogue devices are unauthorized hardware on the network: an unknown laptop, a personal wireless access point plugged into a wall jack, or a rogue Dynamic Host Configuration Protocol (DHCP) server handing out a malicious gateway. Detection methods include comparing DHCP leases and MAC addresses against the asset inventory, wireless surveys, switch port monitoring and network access control (NAC), which checks devices before admitting them.",
   "Scans and sweeps have distinct shapes. A port scan is one source contacting many ports on one host; a sweep is one source contacting the same port across many hosts. Internally, a scan from a user workstation is a strong sign of attacker discovery unless it matches an approved vulnerability scanner. Unexpected ports are services listening or communicating where they should not, such as a workstation listening on a high port or outbound traffic to an unusual port on the internet. Remember that a port number alone does not prove which protocol is in use: attackers often run C2 over port 443 to blend in with web traffic, and legitimate services sometimes run on nonstandard ports, so inspect the traffic itself when you can.",
   "Consider a worked example. Reviewing proxy logs, you notice a laptop contacting an unfamiliar domain every 300 seconds, plus or minus about 10, for three days, including the weekend, with the same small response size each time. A frequency count across the organization shows that no other host has ever visited the domain, and WHOIS shows it was registered last week. These are strong beaconing indicators. You isolate the laptop through the endpoint detection and response (EDR) console, which reveals a scheduled task launching an unknown executable. You then block the domain at the proxy and DNS resolver and search all logs for other hosts contacting it.",
   "Common mistakes: treating every high-bandwidth event as exfiltration without checking direction and baseline; assuming traffic on port 443 is safe because it is 'HTTPS'; dismissing irregular intervals as not beaconing, when jitter is deliberate; confusing a port scan (many ports, one host) with a sweep (one port, many hosts); and forgetting that authorized scanners also generate scan traffic, so confirm the source against your scanner inventory before escalating.",
   "Exam questions describe traffic and ask what it indicates. 'Regular intervals', 'same small size', 'rare destination' point to beaconing. 'Large outbound transfer at 2 a.m. to cloud storage' points to exfiltration. 'Workstation connecting to many other workstations over SMB' points to lateral movement. 'Unknown MAC address' or 'second DHCP server' points to a rogue device, with NAC as a typical control. 'One host probing port 22 across the subnet' is a sweep, and 'high port listening on a desktop' is an unexpected port worth investigating."
  ],
  "terms": [
   [
    "Beaconing",
    "Periodic outbound check-ins from a compromised host to a command-and-control server."
   ],
   [
    "Jitter",
    "Random variation added to beacon timing to make the pattern harder to detect."
   ],
   [
    "Baseline",
    "A record of normal activity used to recognize deviations."
   ],
   [
    "NetFlow",
    "Flow records summarizing who talked to whom, on which ports, for how long and how much data was sent, without full packet content."
   ],
   [
    "Rogue device",
    "Unauthorized hardware connected to the network, such as an unknown laptop, access point or DHCP server."
   ],
   [
    "Port scan",
    "One source probing many ports on a single host to find listening services."
   ],
   [
    "Network access control (NAC)",
    "A control that checks a device's identity and health before allowing it onto the network."
   ]
  ],
  "example": "Proxy logs show a laptop contacting an unfamiliar domain every 300 seconds, plus or minus 10, for three days including weekends, always with the same small response size. No other host in the company visits the domain, which was registered a week earlier. The laptop is isolated, EDR finds a scheduled task launching an unknown executable, and the domain is blocked at the proxy and DNS resolver.",
  "tip": "Regular intervals to one rare destination point to beaconing; one source touching many internal hosts on the same port points to a sweep or lateral movement; large outbound volume at odd hours points to exfiltration. A port number alone never proves the protocol.",
  "check": [
   [
    "Why do attackers add jitter to beacons, and how do analysts still find them?",
    "To break up the regular timing; analysts look at interval distributions, destination rarity and consistent sizes instead of exact periods."
   ],
   [
    "What is the difference between a port scan and a sweep?",
    "A port scan probes many ports on one host; a sweep probes one port across many hosts."
   ],
   [
    "Why is workstation-to-workstation SMB traffic suspicious in most enterprises?",
    "Workstations normally talk to servers, not each other, so direct SMB between them can indicate lateral movement or a worm."
   ],
   [
    "Which control helps stop rogue devices from joining the wired network?",
    "Network access control (NAC), which authenticates and checks devices before granting access."
   ]
  ]
 },
 {
  "t": "Host indicators: unusual processes, masquerading binaries, unauthorized software, persistence (services, scheduled tasks, run keys)",
  "body": [
   "Host indicators are signs of compromise on an individual endpoint or server. Network indicators tell you that something is talking; host indicators tell you what is running, how it got there and how it survives a reboot. Your main sources are endpoint detection and response (EDR) tools, System Monitor (Sysmon) and operating system logs, plus built-in commands when you are looking at a single machine.",
   "Unusual processes stand out by their name, location, parent, user account or behavior. Parent-child relationships are especially telling. Microsoft Word spawning `powershell.exe` or `cmd.exe` suggests a malicious macro, and a web server process spawning a shell suggests a web shell. Other red flags include processes running from temporary or user-writable folders, executables with no description or digital signature, long encoded command lines and sustained high CPU use that could indicate cryptomining. On Windows you can inspect processes with Task Manager, Sysinternals Process Explorer or `tasklist`; on Linux with `ps aux` and `top`.",
   "Masquerading is when malware disguises itself as a legitimate program. Common tricks include using a real system name in the wrong folder (a genuine `svchost.exe` lives in System32 and is started by `services.exe`, not from a user's AppData folder), slightly misspelled names such as `scvhost.exe`, double extensions like `invoice.pdf.exe`, and renamed copies of legitimate admin tools. Checking the full path, digital signature, file hash and parent process usually exposes it. Unauthorized software is anything not approved for the environment: remote access tools, password crackers, hacking utilities or simply unlicensed apps. It may be installed by an attacker or by a well-meaning user who created risk without malice. Application allow listing and software inventory tools help detect and prevent it.",
   "Persistence is how an attacker keeps access after reboots or logoffs. On Windows the most common mechanisms are new services (System log event 7045, Security event 4697), scheduled tasks (Security event 4698 when task auditing is enabled; list them with `schtasks /query`) and Run keys in the registry, such as `HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run` and the matching `HKCU` key, which launch programs at logon. Other options include startup folders, Windows Management Instrumentation (WMI) event subscriptions and new accounts. On Linux, check cron jobs, systemd service units, shell profile files and unexpected SSH keys in `authorized_keys`. The Sysinternals Autoruns tool lists nearly every Windows autostart location in one view, which makes it a fast way to spot something new.",
   "When you triage a host, work through a consistent order so nothing is missed. First, list running processes with their paths, parents, users and command lines. Second, review network connections with `netstat` or `ss` and tie each to a process. Third, enumerate autostart locations: services, scheduled tasks, Run keys, startup folders, cron jobs and systemd units. Fourth, compare installed software against the approved inventory. For each suspicious item, record its hash and check reputation, then compare against a known-good system of the same build; a difference that exists on only one machine is often the most interesting lead.",
   "Consider a worked example. EDR flags `svchost.exe` running from `C:\\Users\\Public` with `winword.exe` as its parent. Because the real svchost runs from System32 under services.exe, you already suspect masquerading. Before cleaning anything you collect evidence: the file's hash, path, signature status, creation time, the parent document and a memory capture if policy requires one. Autoruns shows a Run key pointing to the same file, and the task scheduler holds a task that re-creates it every hour. You remove both persistence mechanisms, quarantine the file, search the whole fleet for the same hash, path and task name, and add a detection rule for Office applications spawning executables from Public folders.",
   "Common mistakes: deciding a process is safe because its name is familiar, without checking path and parent; removing the malware before collecting evidence and searching for other infected hosts; cleaning the payload but missing a second persistence mechanism, so the infection returns; treating unauthorized software as always malicious rather than a policy issue to investigate; and forgetting Linux persistence locations such as cron and `authorized_keys`.",
   "Exam questions often hinge on location and parent. 'Correct system name, wrong folder' or 'misspelled system binary' points to masquerading. 'Office application spawned PowerShell' points to a malicious document. 'Event 7045' means a new service was installed; 'Run key' or 'scheduled task that recreates a file' points to persistence. 'Unapproved remote access tool on a workstation' points to unauthorized software, with application allow listing as the preventive control. 'Sustained high CPU with no user activity' suggests cryptomining."
  ],
  "terms": [
   [
    "Masquerading",
    "Disguising malware as a legitimate program through a trusted name, misspelling, double extension or renamed tool."
   ],
   [
    "Parent-child process",
    "The relationship between a process and the one that launched it, which often reveals malicious execution chains."
   ],
   [
    "Persistence",
    "Any mechanism that lets an attacker's code survive reboots, logoffs or credential changes."
   ],
   [
    "Run key",
    "A registry location whose entries launch programs automatically at startup or user logon."
   ],
   [
    "Event ID 7045",
    "The Windows System log event recording that a new service was installed."
   ],
   [
    "Autoruns",
    "A Sysinternals tool that lists programs configured to start automatically across many Windows locations."
   ],
   [
    "Application allow listing",
    "A control that permits only approved software to run, blocking unauthorized programs."
   ]
  ],
  "example": "EDR flags svchost.exe running from C:\\Users\\Public with a parent of winword.exe. The real svchost runs from System32 under services.exe. The analyst collects the hash and parent document, finds a Run key pointing to the same file and a scheduled task that re-creates it hourly, removes both after collecting evidence, and hunts for the hash and task name across the fleet.",
  "tip": "A correct system name in the wrong folder or under the wrong parent is masquerading. Event 7045 means a new service was installed, and always look for more than one persistence mechanism before declaring a host clean.",
  "check": [
   [
    "Which parent process normally starts svchost.exe, and from which folder does it run?",
    "services.exe starts it, and it runs from C:\\Windows\\System32."
   ],
   [
    "Why is Word launching powershell.exe suspicious?",
    "Word has no normal reason to start a shell, so it usually means a malicious macro or document exploit."
   ],
   [
    "Name three Windows persistence mechanisms.",
    "New services, scheduled tasks and registry Run keys; others include startup folders and WMI event subscriptions."
   ],
   [
    "What should you do before removing a suspicious binary?",
    "Collect evidence such as hash, path, signature, parent and timestamps, then search other hosts for the same indicators."
   ]
  ]
 },
 {
  "t": "Application indicators: anomalous activity, new accounts, unexpected output, injection strings in web logs",
  "body": [
   "Application indicators are signs of compromise that show up in how software behaves rather than in raw network or host activity. They are often the first clue that a web application, database or business system is under attack, because an attacker who abuses an application may never drop a file or open an unusual port. Recognizing them requires you to know what normal looks like for that specific application: its usual users, its usual request patterns, its usual error rate and its usual response sizes.",
   "Anomalous activity means behavior that departs from the application's baseline. Examples include a user exporting thousands of records when they normally view a handful, logins at unusual hours or from new countries, a sudden spike in errors, or application programming interface (API) calls in an order no real client would make. Application logs, database audit logs and web server access logs record this. HTTP status codes are a quick guide: a flood of 401 (unauthorized) or 403 (forbidden) responses suggests brute forcing or probing of access controls, many 404 (not found) responses suggest content discovery or scanning, and a burst of 500 (internal server error) responses may mean someone is sending malformed input to find a weakness.",
   "New accounts are a classic indicator, especially ones with administrative rights created outside the normal provisioning process, at odd times, or with names that imitate service accounts. Attackers create accounts so they keep access even if the original entry point is closed. Compare account creation events with change tickets and human resources records. Unexpected privilege changes, such as a regular user suddenly holding an admin role, deserve the same attention. Unexpected output is when an application returns something it should not: database error messages revealing table names, stack traces, other users' data, directory listings or unusually large responses. Output anomalies can mean an attacker has found an injection flaw or broken access control, or that data is being pulled out through the application itself.",
   "Injection strings in web logs are fragments of attack input visible in URLs, parameters or headers. Your goal is to recognize them, not craft them. Structured Query Language (SQL) injection attempts show quote characters combined with SQL keywords such as `OR 1=1` or `UNION SELECT`, or comment markers like `--`. Cross-site scripting (XSS) attempts contain `<script>` tags or event handler attributes like `onerror=`. Directory traversal appears as repeated `../` sequences, often URL-encoded as `%2e%2e%2f`, aiming at files such as `/etc/passwd`. Command injection shows shell metacharacters like `;`, `|` or `&&` followed by operating system commands. Attackers encode input to slip past filters, so decoding it with a tool such as CyberChef is often your first step. Crucially, a payload in a log proves an attempt, not success.",
   "Consider a worked example. A web access log shows one IP address requesting `/products?id=5` followed by URL-encoded text that decodes to a quote and a `UNION SELECT` clause, dozens of times in ten minutes. Most requests return 500, which tells you the attacker is probing. The last few return 200 with responses ten times larger than the normal product page, which strongly suggests the injection worked and data was returned. You block the IP at the web application firewall (WAF) as a short-term step, preserve the logs, check the database audit log for the queries that ran, notify the developers that the parameter needs a parameterized query, and assess which data may have been exposed.",
   "Common mistakes: treating every injection string as a breach, when most are automated probes that fail; ignoring response codes and sizes, which are the best evidence of success; forgetting to decode payloads, so encoded attacks go unnoticed; assuming a new admin account is legitimate because it has a plausible name; and looking only at errors while missing quiet anomalies, such as a valid user downloading far more data than usual.",
   "Exam questions often show log lines and ask what is happening. After decoding, `' OR 1=1` or `UNION SELECT` means SQL injection, `<script>` or `onerror=` means XSS, `../` means directory traversal and `;` or `|` followed by a command means command injection. 'Status 200 with abnormally large response after many 500s' suggests a successful attack. 'Admin account created at 3 a.m. with no ticket' points to persistence. 'Stack trace shown to users' points to unexpected output and poor error handling."
  ],
  "terms": [
   [
    "Baseline",
    "The normal pattern of users, requests, errors and response sizes for an application."
   ],
   [
    "Anomalous activity",
    "Application behavior that departs noticeably from its baseline, such as bulk exports or odd-hour logins."
   ],
   [
    "Unexpected output",
    "Responses an application should never produce, such as stack traces, database errors or other users' data."
   ],
   [
    "Directory traversal",
    "An attack using sequences like ../ to reach files outside the intended web directory."
   ],
   [
    "URL encoding",
    "Representing characters as a percent sign and two hex digits, such as %27 for a single quote, which attackers use to hide input."
   ],
   [
    "Stack trace",
    "A detailed error listing of the code path that failed, which leaks internal information when shown to users."
   ]
  ],
  "example": "A web access log shows one IP requesting /products?id=5 with an encoded UNION SELECT clause dozens of times. Most requests return 500, but the last few return 200 with responses ten times larger than normal. The analyst treats this as likely successful SQL injection, blocks the IP at the WAF, checks the database audit log for executed queries, and asks developers to fix the query with parameters.",
  "tip": "A payload in a log proves an attempt, not success. Look at the response code, response size and what the same source did next. Decode first, then match the pattern: quote plus SQL keyword for SQLi, script tags for XSS, ../ for traversal.",
  "check": [
   [
    "What does a large number of HTTP 403 responses to one client suggest?",
    "The client is probing or trying to bypass access controls on resources it is not allowed to reach."
   ],
   [
    "Which log evidence suggests a SQL injection attempt succeeded?",
    "A change from errors to 200 responses with abnormally large sizes, plus matching unusual queries in the database audit log."
   ],
   [
    "What does %2e%2e%2f decode to and what attack does it indicate?",
    "It decodes to ../, indicating a directory traversal attempt."
   ],
   [
    "Why is an admin account created outside the provisioning process an indicator of compromise?",
    "Attackers create accounts to keep access, and legitimate accounts should match a change ticket or HR request."
   ]
  ]
 },
 {
  "t": "Tools: SIEM, SOAR, EDR, Wireshark/tcpdump, sandboxing, CyberChef, reputation and WHOIS lookups",
  "body": [
   "CySA+ tests whether you can pick the right tool for a task and interpret what it shows. You do not need to master every product, but you do need to know what each category does, what data it works on and where its limits are. Many scenario questions describe an investigation step and ask which tool fits, so think of each tool in terms of the question it answers.",
   "A security information and event management (SIEM) system collects logs from across the environment, normalizes them, correlates related events, raises alerts based on rules, and provides search for investigations and long-term retention for compliance. Examples include Splunk, Microsoft Sentinel, Elastic Security and the open-source Security Onion stack. A SIEM is only as good as its data sources and detection rules. Security orchestration, automation and response (SOAR) builds on alerts by running playbooks: enriching an alert with threat intelligence, opening a ticket, disabling an account or isolating a host. In short, the SIEM detects and correlates, and SOAR automates the response. Endpoint detection and response (EDR) agents record detailed host activity (processes, files, registry, network connections), detect malicious behavior rather than only known signatures, and let responders isolate a machine, kill processes and collect files remotely. Extended detection and response (XDR) correlates EDR data with network, email and cloud telemetry.",
   "Wireshark is a graphical packet analyzer, and tcpdump is a command-line packet capture tool common on Linux and network appliances. A typical workflow is to capture on a server with tcpdump, where installing a graphical tool would be impractical, then copy the file to your analysis workstation and open it in Wireshark. Capture filters limit what is recorded, which keeps files small on busy links.",
   "```bash\n# capture traffic to or from one host into a file\ntcpdump -i eth0 -w capture.pcap host 10.0.0.5\n```",
   "In Wireshark, display filters such as `http.request`, `dns` or `ip.addr == 10.0.0.5` narrow the view, Follow TCP Stream reconstructs a conversation, and Statistics > Conversations summarizes who talked to whom. Encrypted traffic limits you to metadata such as addresses, ports, TLS server names and timing. A sandbox is an isolated environment where you detonate a suspicious file or URL and watch what it does: files dropped, registry changes, processes created and network connections. Some malware detects virtual machines and stays dormant, so a clean sandbox result is not proof of safety. CyberChef is a browser-based tool for decoding and transforming data with chained recipes such as Base64, hex, URL decoding, XOR and decompression. Reputation lookups check an IP address, domain, URL or file hash against intelligence services, and WHOIS shows domain registration details such as registrar, creation date and name servers.",
   "Consider a worked example. The SIEM raises an alert for PowerShell running with a long encoded command on a finance laptop. You paste the string into CyberChef, apply Base64 decoding and a text decoding step, and find a command that downloads a file from an unfamiliar domain. WHOIS shows the domain was registered yesterday, and a reputation service lists it as malicious. You use the EDR console to isolate the laptop and pull the downloaded file, submit that file to a sandbox, which shows it creating a scheduled task and beaconing out, and then let a SOAR playbook block the domain at the proxy and search the SIEM for other hosts that resolved it.",
   "Common mistakes: expecting a SIEM to take response actions by itself (that is SOAR's role, although many platforms bundle both); trusting a clean sandbox report as proof a file is safe; assuming packet capture shows content in encrypted traffic; relying on WHOIS registrant names, which are often hidden by privacy services; and uploading sensitive internal files to public sandboxes or reputation sites, which can leak data and tip off an attacker.",
   "Exam questions map tasks to tools. 'Aggregate and correlate logs from many sources' is SIEM. 'Automate response steps across products using playbooks' is SOAR. 'Isolate one infected laptop and see its process tree' is EDR. 'Capture packets on a headless Linux server' is tcpdump, and 'analyze a capture graphically and follow a stream' is Wireshark. 'Observe a file's behavior safely' is a sandbox. 'Decode Base64 or URL-encoded data' is CyberChef. 'When was this domain registered' is WHOIS."
  ],
  "terms": [
   [
    "SIEM",
    "Security information and event management, a platform that collects, normalizes, correlates and alerts on log data."
   ],
   [
    "SOAR",
    "Security orchestration, automation and response, a platform that runs playbooks to enrich alerts and automate response actions."
   ],
   [
    "EDR",
    "Endpoint detection and response, an agent-based tool that records host activity, detects malicious behavior and supports remote response."
   ],
   [
    "tcpdump",
    "A command-line packet capture tool that can save traffic to a pcap file for later analysis."
   ],
   [
    "Sandbox",
    "An isolated environment for safely executing a suspicious file or URL to observe its behavior."
   ],
   [
    "CyberChef",
    "A browser-based tool that decodes and transforms data through chained operations such as Base64 and XOR."
   ],
   [
    "WHOIS",
    "A lookup that returns domain registration details such as registrar, creation date and name servers."
   ]
  ],
  "example": "A SIEM alert fires for PowerShell with a long encoded command. The analyst decodes it in CyberChef, finds a download URL, checks the domain in WHOIS (registered yesterday) and a reputation service (flagged as malicious), and uses the EDR console to isolate the host. A sandbox run of the downloaded file shows a scheduled task being created, and a SOAR playbook blocks the domain at the proxy.",
  "tip": "SIEM aggregates and correlates; SOAR automates response across tools; EDR sees and acts on a single host. A clean sandbox result does not prove a file is safe, because some malware detects virtual environments.",
  "check": [
   [
    "Which tool would you use to automatically enrich an alert and disable a user account?",
    "A SOAR platform running a playbook."
   ],
   [
    "Why might a sandbox show no malicious behavior for real malware?",
    "The malware may detect the virtual environment, wait for user activity or delay execution to evade analysis."
   ],
   [
    "What does Wireshark's Follow TCP Stream do?",
    "It reassembles the packets of one TCP conversation so you can read the exchanged data in order."
   ],
   [
    "A phishing domain was created two days ago. Which lookup reveals this?",
    "A WHOIS lookup, which shows the domain's creation date and registrar."
   ]
  ]
 },
 {
  "t": "Email analysis: headers, SPF, DKIM, DMARC, impersonation and malicious attachments",
  "body": [
   "Email remains one of the most common ways attackers gain a foothold, through phishing links, malicious attachments and business email compromise. Analysts are often asked to decide whether a reported message is legitimate, and the answer usually lies in the message headers and the authentication results rather than in how convincing the text looks.",
   "Every email carries headers that record its journey. The From header is what the user sees, and it is easy to forge. The envelope sender, shown as Return-Path, is used for bounces and for SPF checks. Reply-To controls where replies go; a mismatch such as From showing your chief executive and Reply-To pointing to a free webmail address is a classic sign of impersonation. Received headers are added by each mail server along the path with the newest on top, so you read them from the bottom up to trace the message from its origin. The Message-ID and the Authentication-Results header, which summarizes SPF, DKIM and DMARC outcomes, are also valuable.",
   "Sender Policy Framework (SPF) is a Domain Name System (DNS) TXT record listing which mail servers may send for a domain. The receiving server checks whether the connecting server's IP address is authorized for the envelope sender's domain. A record ending in `-all` asks receivers to fail anything unlisted (hard fail), while `~all` requests a soft fail. SPF alone does not protect the visible From address. DomainKeys Identified Mail (DKIM) adds a digital signature: the sending server signs selected headers and the body with a private key, and the receiver retrieves the public key from DNS using the selector and domain named in the DKIM-Signature header. A valid signature proves the message was sent with that domain's authority and was not altered in transit.",
   "Domain-based Message Authentication, Reporting and Conformance (DMARC) ties the two together. It requires that SPF or DKIM pass and that the passing domain aligns with the visible From domain. The DMARC record in DNS sets a policy for failures, `p=none` (monitor only), `p=quarantine` (treat as suspicious, often sending to spam) or `p=reject`, and can request aggregate reports so domain owners see who is sending as them. Impersonation takes several forms: display name spoofing (a real name with an outside address), lookalike domains using swapped or similar characters, compromised real accounts, and business email compromise (BEC), where an attacker poses as an executive or supplier to request payments or data. Note that a compromised real account or a lookalike domain the attacker owns can pass SPF, DKIM and DMARC, so passing results do not prove a message is safe.",
   "Malicious attachments include macro-enabled Office files, archives or disk images containing executables, HTML files that open fake login pages and PDFs with embedded links. Analyze them safely: calculate hashes and check reputation, detonate in a sandbox and never open them on your own workstation. Links can be expanded and checked with reputation services without clicking.",
   "Consider a worked example. A user reports an invoice email from a regular supplier. The headers show SPF fail, no DKIM signature and a From domain of `vendor-billing.co` rather than the supplier's real domain, with Reply-To set to a webmail address. The attached `.html` file opens a fake sign-in page. You block the sender domain, purge the message from every mailbox, check proxy logs for users who visited the page, and reset credentials for anyone who entered them. Finally, you tell the finance team to confirm any change of bank details with the supplier by phone.",
   "Common mistakes: trusting the From header; reading Received headers top down and misidentifying the origin; believing SPF protects the visible From address (only DMARC alignment does); assuming DMARC `p=none` blocks anything, when it only monitors; treating a pass on all three checks as proof of safety; and opening attachments on a production workstation 'just to see'.",
   "Exam questions test what each protocol protects. 'Which servers may send for a domain' is SPF. 'Message integrity and signing domain' is DKIM. 'Alignment with the visible From and a policy for failures' is DMARC. 'Trace the origin' means reading Received headers from the bottom up. 'Reply-To differs from From' and 'urgent payment request from an executive' point to BEC. 'Safely determine what an attachment does' points to a sandbox."
  ],
  "terms": [
   [
    "Received header",
    "A header added by each mail server that handles a message, read bottom to top to trace its path."
   ],
   [
    "Return-Path",
    "The envelope sender address used for bounces and checked by SPF."
   ],
   [
    "SPF",
    "Sender Policy Framework, a DNS record listing servers authorized to send mail for a domain."
   ],
   [
    "DKIM",
    "DomainKeys Identified Mail, a digital signature proving a message came from the signing domain and was not altered."
   ],
   [
    "DMARC",
    "A DNS policy requiring SPF or DKIM to pass with alignment to the From domain, and telling receivers how to handle failures."
   ],
   [
    "Business email compromise",
    "Fraud in which an attacker impersonates an executive or supplier by email to obtain payments or data."
   ],
   [
    "Lookalike domain",
    "A domain registered to resemble a legitimate one through misspellings or similar characters."
   ]
  ],
  "example": "A user reports an invoice email from a vendor. The headers show SPF fail, no DKIM signature and a From domain of vendor-billing.co instead of the real vendor domain, with Reply-To set to a webmail address. The attached .html file opens a fake login page. The analyst blocks the sender domain, purges the message from all mailboxes, checks proxy logs for anyone who visited the page and resets their credentials.",
  "tip": "SPF checks the sending server, DKIM checks integrity and the signing domain, DMARC checks alignment with the visible From and sets policy. Received headers are read from the bottom up, and passing all three does not prove a message is safe.",
  "check": [
   [
    "Which email authentication method protects the address users actually see in the From field?",
    "DMARC, because it requires SPF or DKIM to pass with a domain that aligns with the visible From."
   ],
   [
    "How do you find the originating server in the Received headers?",
    "Read them from the bottom up; the lowest Received header was added first, closest to the origin."
   ],
   [
    "What does a DMARC policy of p=none do?",
    "It only monitors and reports; it does not quarantine or reject failing messages."
   ],
   [
    "Why can a phishing email pass SPF, DKIM and DMARC?",
    "It may come from a compromised real account or from a lookalike domain the attacker controls and has configured correctly."
   ]
  ]
 },
 {
  "t": "Threat intelligence: actor types, TTPs, confidence (timeliness, relevancy, accuracy), open vs closed sources, ISACs, STIX/TAXII",
  "body": [
   "Threat intelligence is information about adversaries and their methods that has been collected, analyzed and put into context so defenders can make decisions. Raw data, such as a list of IP addresses, is not intelligence until someone evaluates it and connects it to your organization. Good intelligence answers practical questions: who is likely to target us, how do they operate, and what should we look for or fix first.",
   "Knowing who might attack you shapes what you defend. Nation-state actors, often associated with advanced persistent threats (APTs), are well funded and patient and pursue espionage, disruption or prepositioning in critical infrastructure. Organized crime groups are financially motivated and run ransomware, fraud and data theft, sometimes as a service for affiliates. Hacktivists act for political or social causes, often with defacement, leaks or denial of service. Insider threats are employees or contractors, either malicious or careless. Unskilled attackers use existing tools with little understanding. Supply chain attackers compromise a vendor or software component to reach many downstream targets.",
   "TTPs stands for tactics, techniques and procedures. Tactics are the attacker's goals, such as initial access or persistence; techniques are how they achieve them, such as phishing or scheduled tasks; and procedures are the specific way a particular group implements a technique. The MITRE ATT&CK framework catalogs tactics and techniques in exactly this way. TTPs are more valuable than simple indicators of compromise (IoCs) because an attacker can change an IP address in minutes, but changing how they operate is costly. The pyramid of pain illustrates this, with hashes and IP addresses at the easy-to-change bottom and TTPs at the top.",
   "Intelligence must be judged for confidence. CySA+ emphasizes three qualities: timeliness (is it current enough to act on, since indicators go stale quickly), relevancy (does it apply to your industry, technology and geography) and accuracy (is it correct, from a reliable source, and corroborated). Open-source intelligence (OSINT) comes from public sources such as government advisories, security blogs, public feeds, social media and vendor reports; it is free but varies in quality. Closed or proprietary sources include paid commercial feeds, private sharing communities and your own internal telemetry, which tend to be more curated but cost money or require membership. Information Sharing and Analysis Centers (ISACs) are sector-specific communities, for example for finance, health care or energy, where members share threats relevant to their industry, often under agreed handling rules such as the Traffic Light Protocol (TLP). To share automatically between tools, Structured Threat Information eXpression (STIX) is a standardized language for describing indicators, malware, actors and their relationships, and Trusted Automated eXchange of Intelligence Information (TAXII) is the protocol that transports STIX data over HTTPS.",
   "Consider a worked example. A regional hospital's analyst receives an ISAC alert that a ransomware group is exploiting a remote access appliance used by several member hospitals. You check the three confidence qualities: the alert is from this week (timely), the hospital runs that appliance (relevant), and a government advisory says the same thing (corroborated, so likely accurate). You prioritize patching the appliance, ingest the shared indicators through the TAXII feed into the SIEM, and, knowing the group rotates infrastructure daily, hunt for the listed TTPs, such as new remote access tools and scheduled tasks, rather than relying only on the IP addresses.",
   "Common mistakes: treating a raw feed as intelligence without judging relevance; blocking every indicator in a large feed and breaking legitimate services because of stale or inaccurate entries; confusing STIX and TAXII; assuming paid sources are always more accurate than open ones; and focusing only on IoCs when the durable value lies in TTPs and behavior-based detection.",
   "Exam questions test vocabulary and judgment. 'Financially motivated, ransomware' points to organized crime; 'patient, well funded, espionage' points to a nation-state; 'political message, defacement' points to hacktivists. 'Data format for threat information' is STIX, and 'transport protocol for sharing it' is TAXII. 'Sector-specific sharing community' is an ISAC. 'Indicators from last year' fails timeliness; 'threat to software you do not run' fails relevancy; 'uncorroborated single source' raises accuracy concerns. When a question asks which intelligence to act on first, choose the item that is recent, applies to your environment and is confirmed by more than one reliable source."
  ],
  "terms": [
   [
    "TTPs",
    "Tactics, techniques and procedures: the goals, methods and specific implementations an adversary uses."
   ],
   [
    "Advanced persistent threat",
    "A well-resourced, usually state-linked actor that maintains long-term covert access to targets."
   ],
   [
    "Pyramid of pain",
    "A model showing that indicators such as hashes and IPs are easy for attackers to change, while TTPs are hard to change."
   ],
   [
    "Confidence",
    "A judgment of intelligence quality based on timeliness, relevancy and accuracy."
   ],
   [
    "ISAC",
    "Information Sharing and Analysis Center, a sector-specific community that shares threat information among members."
   ],
   [
    "STIX",
    "Structured Threat Information eXpression, a standard format for describing threat intelligence objects and relationships."
   ],
   [
    "TAXII",
    "Trusted Automated eXchange of Intelligence Information, a protocol for transporting STIX data between systems."
   ]
  ],
  "example": "A hospital analyst receives an ISAC alert that a ransomware group is exploiting a remote-access appliance used by member hospitals. The alert is recent, relevant to the hospital's technology and corroborated by a government advisory, so the analyst prioritizes patching, ingests the indicators via TAXII, and hunts for the group's TTPs rather than only its IPs, which it rotates daily.",
  "tip": "STIX is the data format and TAXII is the transport; mixing them up is a common exam trap. TTPs sit at the top of the pyramid of pain because they are hardest for attackers to change.",
  "check": [
   [
    "What are the three confidence qualities CySA+ uses to judge intelligence?",
    "Timeliness, relevancy and accuracy."
   ],
   [
    "Why are TTPs more useful for long-term detection than IP addresses?",
    "Attackers can change IPs and hashes quickly, but changing how they operate is costly, so TTP-based detections last longer."
   ],
   [
    "Which actor type is financially motivated and commonly runs ransomware?",
    "Organized crime groups."
   ],
   [
    "What is the relationship between STIX and TAXII?",
    "STIX defines how threat information is structured; TAXII defines how it is transported between systems."
   ]
  ]
 },
 {
  "t": "Threat hunting: hypotheses, IoC collection, focus areas, active defense and honeypots",
  "body": [
   "Threat hunting is the proactive search for attackers who have evaded existing detections. Instead of waiting for an alert, a hunter assumes compromise may already exist and goes looking for evidence. Hunting matters because no set of detection rules is complete, and skilled attackers deliberately use legitimate tools and valid accounts to stay below alerting thresholds. A good hunt either finds something or improves detection, so it is never wasted effort.",
   "Hunts begin with a hypothesis: a testable statement about attacker behavior in your environment. Hypotheses come from threat intelligence (a group targeting our sector uses scheduled tasks for persistence), from known gaps (we have no alerting on new services on servers), from the MITRE ATT&CK framework, or from situational awareness such as a newly disclosed vulnerability in software you run. A good hypothesis states what you expect to see if it is true and which data will show it. For example: if attackers are using stolen credentials over the virtual private network (VPN), we will see logins from impossible travel locations or at unusual hours for those users.",
   "Next comes data and indicator of compromise (IoC) collection. IoCs are artifacts that suggest an intrusion: file hashes, IP addresses, domains, registry keys, mutexes or unusual user agents. Hunters gather IoCs from intelligence and from the hunt itself, then search logs, endpoint detection and response (EDR) telemetry, network data and sometimes memory. Many hunts rely on stacking, also called frequency analysis: counting how often something occurs across the fleet and investigating rare outliers, such as an autorun entry found on only one of 2,000 machines. Focus areas keep hunts manageable. Common ones include configurations and misconfigurations, isolated or high-value networks, business-critical assets, privileged accounts, persistence locations, outbound connections and lateral movement paths. Prioritize where an attacker would do the most damage or where you have the least visibility.",
   "Active defense means engaging with attackers inside your own environment to detect, slow or learn from them, rather than only blocking at the edge. It does not mean hacking back, which is generally illegal and risky. Deception is a key active defense tool. A honeypot is a decoy system that looks valuable but has no legitimate use, so any interaction with it is suspicious by definition. A honeynet is a network of such decoys. Smaller deception items include honeytokens or honey credentials (fake accounts or keys planted where only an intruder would find them) and honeyfiles. Because legitimate users never touch these, their alerts have very low false positive rates. Honeypots must be isolated and monitored so an attacker cannot use them as a stepping stone to real systems.",
   "Consider a worked example. Intelligence says a group targeting your industry abuses Windows Management Instrumentation (WMI) event subscriptions for persistence. Your hypothesis: if that group is present, some endpoints will have WMI consumers that do not exist in the standard build. You query EDR data for WMI consumers across 3,000 endpoints and stack the results. 2,996 hosts share the same two consumers; four have an extra one that launches PowerShell. Investigation confirms compromise on those four, which moves into incident response. After the hunt you document the method, add a permanent detection rule for new WMI consumers, and plant a honey credential on file servers to catch the next attempt at credential harvesting.",
   "Common mistakes: starting a hunt with no hypothesis and simply browsing data; confusing hunting with incident response, which is reactive and starts from an alert; treating a hunt that finds nothing as a failure instead of documenting the coverage it proved; deploying honeypots on production networks without isolation; and describing hack-back as active defense.",
   "Exam questions contrast proactive and reactive work. 'Assume breach and search for undetected activity' is threat hunting. 'Begin with a testable statement' is a hypothesis. 'Find the rare outlier across all hosts' points to stacking or frequency analysis. 'Decoy system with no legitimate purpose' is a honeypot; 'fake credentials that alert when used' is a honeytoken. 'Any access is suspicious' points to deception. 'Retaliating against the attacker's systems' is hack-back and is not an acceptable answer. Also expect questions on what happens after a hunt: the right answer usually involves documenting findings and turning what worked into a new automated detection."
  ],
  "terms": [
   [
    "Threat hunting",
    "A proactive, hypothesis-driven search for threats that existing detections have missed."
   ],
   [
    "Hypothesis",
    "A testable statement about possible attacker activity that defines what data to examine and what to expect."
   ],
   [
    "IoC",
    "Indicator of compromise, an artifact such as a hash, IP, domain or registry key that suggests intrusion."
   ],
   [
    "Stacking",
    "Counting occurrences of an attribute across many systems to find rare, suspicious outliers."
   ],
   [
    "Active defense",
    "Engaging adversaries inside your own environment through deception and monitoring, without attacking their systems."
   ],
   [
    "Honeypot",
    "A decoy system with no legitimate use, so any interaction with it indicates suspicious activity."
   ],
   [
    "Honeytoken",
    "A fake credential, record or file planted to trigger an alert when an intruder uses or opens it."
   ]
  ],
  "example": "Based on intelligence that a group abuses WMI event subscriptions, a hunter queries EDR data for WMI consumers across all endpoints. Of 3,000 hosts, 2,996 have the same two consumers; four have an extra one that launches PowerShell. Investigation confirms a compromise, and the team adds a permanent detection rule for new WMI consumers and plants honey credentials on file servers.",
  "tip": "Hunting is proactive and starts with a hypothesis; incident response is reactive and starts with an alert. Any access to a honeypot or honeytoken is suspicious because it has no legitimate use, and active defense never means hacking back.",
  "check": [
   [
    "What makes a good threat hunting hypothesis?",
    "It is testable, describes the attacker behavior expected, and names the data that would confirm or refute it."
   ],
   [
    "How does stacking help a hunter?",
    "It reveals rare outliers, such as a persistence entry present on only a few hosts, that deserve investigation."
   ],
   [
    "Why do honeypot alerts have a low false positive rate?",
    "Legitimate users have no reason to interact with a decoy, so almost any activity is suspicious."
   ],
   [
    "Is hacking back considered active defense for exam purposes?",
    "No; active defense happens within your own environment, while hacking back is generally illegal and risky."
   ]
  ]
 },
 {
  "t": "Process improvement: standardizing processes, automation and orchestration, tuning alerts, single pane of glass, safe use of AI assistants",
  "body": [
   "A security operations center (SOC) can have excellent tools and still fail if analysts drown in alerts, handle the same incident differently every time, or spend hours on copy-and-paste tasks. Process improvement is about making security operations consistent, efficient and measurable, so that people spend their time on judgment rather than repetition. CySA+ treats this as part of the analyst's job: you are expected to notice what slows the team down and recommend a better way.",
   "Standardizing processes starts with documenting how common work is done: the triage steps for a phishing report, escalation criteria, the evidence each case requires and the ticket fields to fill in. Standard operating procedures (SOPs) and playbooks mean that a new analyst on the night shift follows the same steps as a senior analyst, results can be audited and gaps are easier to see. Standardization is also the prerequisite for automation, because you cannot automate a process nobody has defined. Metrics such as mean time to detect (MTTD) and mean time to respond (MTTR) then show whether changes actually help.",
   "Automation performs individual repetitive tasks without human involvement, such as looking up a hash's reputation, pulling WHOIS data or resetting a password. Orchestration connects many tools and automated tasks into one coordinated workflow, usually through a security orchestration, automation and response (SOAR) platform and application programming interfaces (APIs). An alert arrives, is enriched with intelligence, compared against asset data, assigned a priority and, if it meets clear criteria, a host is isolated and a ticket opened. Good candidates for automation are high-volume, low-judgment, well-understood tasks. Keep a human in the loop for actions with major business impact, and test automations carefully, since a faulty playbook can lock out legitimate users at scale.",
   "Alert tuning reduces noise so analysts can focus on real threats. Alert fatigue sets in when most alerts are false positives and analysts start ignoring or rushing them. Tuning methods include adjusting thresholds, adding context such as asset criticality, suppressing known benign activity with narrowly scoped exceptions, deduplicating related alerts into one case and retiring rules that never produce true positives. Overly broad suppression creates false negatives, so track each rule's true positive rate over time. A single pane of glass is one interface that brings together data and controls from multiple tools, such as a security information and event management (SIEM) or extended detection and response (XDR) console showing endpoint, network, email and cloud alerts together. It reduces context switching, though full integration depends on APIs and consistent data formats.",
   "Artificial intelligence (AI) assistants built on large language models (LLMs) can summarize alerts, explain unfamiliar commands, draft reports and suggest search queries. Use them safely. Do not paste sensitive data such as customer records, credentials or internal incident details into tools that are not approved for that data. Verify outputs, because models can produce confident but wrong answers, including invented commands or event IDs. Watch for prompt injection, where content you are analyzing, such as a phishing email or web page, contains hidden instructions aimed at the assistant. Follow your organization's acceptable use policy, and treat AI output as a draft from a junior helper rather than an authoritative source.",
   "Consider a worked example. A SOC receives about 400 user-reported phishing emails a week, and each takes an analyst around 15 minutes of manual checks. The team first writes a standard procedure listing every check and the criteria for escalation. They then build a SOAR playbook that extracts URLs and attachments, checks reputation, detonates files in a sandbox, closes obvious spam automatically with a note to the reporter, and routes only suspicious messages to an analyst. A human still approves any action that purges mail from every mailbox. Handling time drops sharply, results become consistent, and the saved hours go into tuning the three noisiest SIEM rules.",
   "Common mistakes: automating a process before it is documented and agreed; confusing automation (one task) with orchestration (many tools and tasks coordinated); tuning by disabling rules or suppressing whole subnets, which hides real attacks; assuming a single pane of glass removes the need for underlying tools; and trusting AI summaries without checking them, or pasting confidential incident data into an unapproved public tool.",
   "Exam questions describe an operational pain and ask for the fix. 'Analysts handle the same alert type differently' points to standardized procedures or playbooks. 'Repetitive enrichment steps take too long' points to automation, and 'coordinate actions across the firewall, EDR and ticketing system' points to orchestration with SOAR. 'Analysts ignore alerts because most are false positives' points to alert tuning. 'Too many consoles' points to a single pane of glass. For AI questions, the safe answer protects sensitive data, validates output and follows policy."
  ],
  "terms": [
   [
    "Standard operating procedure",
    "A documented, repeatable set of steps for handling a common task consistently."
   ],
   [
    "Automation",
    "Performing a single repetitive task by machine without human involvement."
   ],
   [
    "Orchestration",
    "Coordinating multiple tools and automated tasks into one workflow, usually through a SOAR platform."
   ],
   [
    "Alert fatigue",
    "Reduced analyst attention caused by a high volume of alerts, especially false positives."
   ],
   [
    "Alert tuning",
    "Adjusting detection rules, thresholds and exceptions to reduce noise without missing real threats."
   ],
   [
    "Single pane of glass",
    "One interface that presents data and controls from many security tools together."
   ],
   [
    "Prompt injection",
    "Hidden instructions inside content given to an AI assistant that try to change its behavior."
   ]
  ],
  "example": "A SOC receives 400 phishing reports a week, each taking 15 minutes of manual checks. The team writes a standard procedure, then builds a SOAR playbook that extracts URLs and attachments, checks reputation, detonates files in a sandbox and closes obvious spam automatically, sending only suspicious messages to analysts. Handling time drops sharply and response becomes consistent, while a human still approves organization-wide mail purges.",
  "tip": "Automation is a single task; orchestration ties many tasks and tools together. Standardize before you automate, tune with narrow exceptions rather than disabling rules, and for AI questions choose protecting sensitive data and validating output.",
  "check": [
   [
    "Why should a process be standardized before it is automated?",
    "Automation needs a defined, agreed set of steps and decision criteria; automating an undefined process just repeats inconsistency faster."
   ],
   [
    "What is the main risk of tuning alerts too aggressively?",
    "Real attacks may be suppressed, creating false negatives."
   ],
   [
    "Give an example of orchestration rather than simple automation.",
    "A SOAR playbook that enriches an alert, checks asset criticality, isolates a host through EDR and opens a ticket in one workflow."
   ],
   [
    "Name two safe practices when using an AI assistant in the SOC.",
    "Do not paste sensitive data into unapproved tools, and verify the assistant's output before acting on it."
   ]
  ]
 },
 {
  "t": "Asset discovery and scan types: active vs passive, credentialed vs non-credentialed, agent vs agentless, internal vs external",
  "body": [
   "You cannot protect or scan what you do not know exists. Vulnerability management therefore starts with asset discovery: building and maintaining an inventory of hosts, applications, cloud resources and devices, together with their owners and criticality. Unknown assets, such as a forgotten test server or a cloud instance someone launched for a project and never removed, are often the ones that get breached, because nobody patches or monitors them.",
   "Discovery draws on several sources: network scans such as nmap ping sweeps, Dynamic Host Configuration Protocol (DHCP) and Domain Name System (DNS) records, switch and router tables, cloud provider application programming interfaces (APIs), endpoint management tools and the configuration management database (CMDB). Comparing these sources reveals shadow IT and gaps in coverage; a host that appears in DHCP leases but not in the CMDB is worth chasing. Discovery should be continuous rather than annual, because environments change daily. Once assets are known, you choose how to scan them, and the exam tests the trade-offs between scan types in pairs.",
   "Active scanning sends probes to targets and analyzes their responses. It is thorough and fast at finding services and vulnerabilities, but it generates traffic, can trigger intrusion alerts and may disrupt fragile systems. Passive scanning, or passive monitoring, listens to existing network traffic and infers which hosts, operating systems and software versions are present without sending anything. It is safe for sensitive environments such as industrial control systems, but it only sees systems that communicate and gives less detail. A non-credentialed scan examines a system from the outside, as an unauthenticated attacker would, seeing only exposed services and banners. A credentialed (authenticated) scan logs into the target with an account, ideally one created for scanning with only the rights it needs, and inspects installed software, patch levels and configuration directly. Credentialed scans are far more accurate and produce fewer false positives, but the scan account must be protected carefully because it can reach many systems.",
   "Agent-based scanning installs software on each host that assesses the system locally and reports back. Agents suit laptops that are often off the corporate network and reduce network load, but they must be deployed and maintained and cannot run on devices that do not support them. Agentless scanning runs from a central scanner over the network, which is simpler to deploy and works on network gear and appliances, but depends on connectivity and credentials at scan time. Internal scans run from inside the network and show what an insider or an attacker who has already gotten in could reach. External scans run from outside the perimeter and show the internet-facing attack surface. Some compliance programs, such as the Payment Card Industry Data Security Standard (PCI DSS), require both, with external scans performed by an approved vendor.",
   "Consider a worked example. A company's quarterly non-credentialed scan shows only a few medium findings, and management assumes patching is in good shape. You switch the internal scan to credentialed mode with a dedicated, monitored service account, and the number of missing patches jumps dramatically because the scanner can now read installed software versions. You also notice that remote staff laptops rarely connect to the virtual private network (VPN) during scan windows and have never been scanned, so you deploy agents to them. Finally, you add a monthly external scan to confirm that only the web server and mail gateway are visible from the internet.",
   "Common mistakes: assuming a quiet non-credentialed scan means systems are patched; using a domain administrator account for credentialed scans instead of a least-privilege dedicated account; running aggressive active scans against fragile devices; believing passive monitoring finds everything, when silent hosts stay invisible; and treating an internal scan as a substitute for an external one, or the reverse, when each answers a different question.",
   "Exam questions usually describe a constraint and ask which scan type fits. 'Most accurate results, fewest false positives, see installed patches' points to credentialed scanning. 'See what an unauthenticated attacker sees' points to non-credentialed. 'Fragile or sensitive systems, cannot send probes' points to passive monitoring. 'Laptops rarely on the network' points to agent-based scanning. 'Network appliances where software cannot be installed' points to agentless. 'What is exposed to the internet' points to an external scan, and 'what could an attacker reach after getting in' points to an internal scan."
  ],
  "terms": [
   [
    "Asset inventory",
    "A maintained list of hardware, software and cloud resources with owners and criticality."
   ],
   [
    "Active scanning",
    "Sending probes to systems and analyzing their responses to find services and vulnerabilities."
   ],
   [
    "Passive scanning",
    "Identifying hosts and software by observing existing network traffic without sending probes."
   ],
   [
    "Credentialed scan",
    "A scan that logs into targets to inspect installed software, patches and configuration directly."
   ],
   [
    "Non-credentialed scan",
    "A scan performed without logging in, showing only what is exposed to an unauthenticated attacker."
   ],
   [
    "Agent-based scanning",
    "Assessment by software installed on each host that reports results to a central console."
   ],
   [
    "External scan",
    "A scan run from outside the network perimeter to show the internet-facing attack surface."
   ]
  ],
  "example": "A company's quarterly non-credentialed scan shows few issues, but after switching to credentialed scans with a dedicated service account the count of missing patches jumps dramatically because the scanner can now see installed software. The team also deploys agents to remote laptops that rarely connect to the VPN during scan windows, closing a long-standing gap.",
  "tip": "For the most accurate results with fewest false positives, choose a credentialed scan. For fragile systems where probes are risky, choose passive monitoring. For devices that are rarely on the network, choose agents.",
  "check": [
   [
    "Why do credentialed scans produce fewer false positives than non-credentialed scans?",
    "They read installed software and patch levels directly instead of guessing from banners and exposed services."
   ],
   [
    "What is the main limitation of passive scanning?",
    "It only sees hosts and software that generate traffic, and it gives less detail than active probing."
   ],
   [
    "Which scan approach suits laptops that are usually off the corporate network?",
    "Agent-based scanning, because the agent assesses the device locally and reports whenever it connects."
   ],
   [
    "What question does an external scan answer that an internal scan does not?",
    "What an attacker on the internet can see and reach before getting inside the network."
   ]
  ]
 },
 {
  "t": "Special environments: OT/ICS, cloud, mobile and scanning without disrupting production",
  "body": [
   "Standard vulnerability scanning assumes ordinary servers and workstations that tolerate being probed. Several environments break that assumption, and CySA+ expects you to adjust your approach so that the act of finding weaknesses does not itself cause an outage. The guiding question is always the same: what could this scan break, and is there a safer way to get the same information?",
   "Operational technology (OT) is the hardware and software that monitors and controls physical processes: manufacturing lines, power distribution, water treatment and building systems. Industrial control systems (ICS) include supervisory control and data acquisition (SCADA) systems that manage geographically spread processes, programmable logic controllers (PLCs) that run machinery, and human-machine interfaces (HMIs) that operators use. These systems prioritize availability and safety over confidentiality, often run for many years on legacy operating systems, and use industrial protocols such as Modbus and DNP3 that were designed without authentication. Some devices can crash or behave unpredictably when hit by an aggressive scan, which could stop a production line or, in the worst case, create a safety hazard.",
   "For OT, prefer passive monitoring tools that learn assets and vulnerabilities from observed traffic, consult vendor advisories and firmware lists, and perform any active testing only on test systems or during planned downtime with operators present. Segmentation is a primary defense because many devices cannot be patched quickly: place OT in its own zone behind firewalls, with tightly controlled connections to the IT network, often through a DMZ between the two. In the cloud, you usually cannot scan the provider's infrastructure, and providers publish rules about what customers may test, so check the policy first. Cloud workloads change rapidly, with instances created and destroyed automatically, so point-in-time network scans miss much of the environment. Cloud-native approaches work better: agents inside instances, scanning container images in registries and build pipelines, and cloud security posture management (CSPM) tools that read configuration through the provider's APIs to find problems such as public storage buckets or overly permissive security groups.",
   "Mobile devices are rarely on the corporate network and cannot be scanned like servers. Organizations instead use mobile device management (MDM) or unified endpoint management (UEM) to report operating system versions, patch levels, jailbreak or root status and installed apps, and to enforce compliance policies such as blocking access to email from out-of-date devices. Mobile application security is assessed by vetting and testing the app itself. General techniques for scanning without disrupting production include scheduling scans during maintenance windows or low-use periods; throttling scan speed and concurrency; disabling dangerous checks such as denial-of-service tests; starting with discovery before full vulnerability checks; excluding fragile hosts and handling them separately; preferring credentialed or agent scans that do less network probing; testing scan policies in a lab first; and notifying system owners and the SOC so a scan is not mistaken for an attack.",
   "Consider a worked example. A utility wants vulnerability data for its substations, and the IT team proposes pointing the corporate scanner at the PLC network. You recommend against it. Instead, the team deploys a passive OT monitoring sensor on a switch SPAN (mirror) port, which identifies device models and firmware versions from normal traffic. Those versions are matched against vendor advisories, and the vulnerable controllers are scheduled for firmware updates during the next planned outage, with engineers on site. Meanwhile, firewall rules between the corporate network and the OT zone are tightened so only the historian server can connect.",
   "Common mistakes: running a default full-strength scan against OT or medical devices; assuming the cloud provider scans your workloads for you; scanning a cloud provider's infrastructure without checking its testing policy; relying on network scans for mobile devices instead of MDM; and forgetting to notify the SOC, which then spends hours investigating an approved scan as if it were an attack.",
   "Exam questions in this area reward caution. 'OT or ICS, availability and safety critical' points to passive monitoring, segmentation or testing during scheduled downtime, never an aggressive active scan. 'Short-lived cloud instances' points to agents, image scanning or CSPM. 'Public storage bucket or permissive security group' points to CSPM. 'Check patch level and jailbreak status of phones' points to MDM. 'Scan caused a production outage' points to throttling, maintenance windows and excluding fragile hosts."
  ],
  "terms": [
   [
    "Operational technology (OT)",
    "Systems that monitor and control physical processes, where availability and safety come first."
   ],
   [
    "SCADA",
    "Supervisory control and data acquisition, systems that monitor and control geographically distributed industrial processes."
   ],
   [
    "PLC",
    "Programmable logic controller, a ruggedized computer that directly controls industrial machinery."
   ],
   [
    "CSPM",
    "Cloud security posture management, tools that read cloud configuration through APIs to find misconfigurations."
   ],
   [
    "MDM",
    "Mobile device management, which inventories mobile devices and enforces security and compliance policies on them."
   ],
   [
    "Scan throttling",
    "Limiting scan speed and parallel connections to reduce the load placed on target systems."
   ],
   [
    "SPAN port",
    "A switch port that mirrors traffic to a monitoring device for passive analysis."
   ]
  ],
  "example": "A utility wants vulnerability data for its substations. Instead of pointing a network scanner at PLCs, the team deploys a passive OT monitoring sensor on a SPAN port, which identifies device models and firmware versions from traffic. Firmware versions are matched against vendor advisories, remediation is scheduled for the next planned outage, and firewall rules between IT and OT are tightened meanwhile.",
  "tip": "In OT/ICS scenarios availability and safety come first; the best answer is usually passive monitoring, segmentation or testing during scheduled downtime, never an aggressive active scan. For cloud, think agents, image scanning and CSPM.",
  "check": [
   [
    "Why is aggressive active scanning dangerous in an ICS environment?",
    "Fragile controllers may crash or behave unpredictably, halting production or creating safety hazards."
   ],
   [
    "Why do point-in-time network scans miss much of a cloud environment?",
    "Instances are created and destroyed automatically, so many workloads do not exist when the scan runs."
   ],
   [
    "What should you check before scanning resources hosted by a cloud provider?",
    "The provider's policy on what customers are permitted to test."
   ],
   [
    "List three ways to reduce the chance that a scan disrupts production.",
    "Schedule it in a maintenance window, throttle speed and concurrency, and disable dangerous checks such as denial-of-service tests."
   ]
  ]
 },
 {
  "t": "Scanner and tool output: Nessus/OpenVAS reports, nmap, web app scanners, SAST, DAST, SCA, fuzzing, cloud posture tools",
  "body": [
   "Much of the CySA+ vulnerability domain is about reading output: given a scan report or command result, what does it tell you and what should you do next? Performance-based questions often show you tool output directly, so you need to recognize the parts of a report, the meaning of port states and the strengths of each testing method.",
   "Nessus, a commercial scanner, and OpenVAS, the open-source scanner in the Greenbone suite, produce similar reports. Each finding typically lists a plugin or test ID, a title, a severity (critical, high, medium, low or informational), a Common Vulnerability Scoring System (CVSS) score, the affected host and port, a description, the evidence the scanner saw (such as a version banner or a missing patch), references to Common Vulnerabilities and Exposures (CVE) identifiers and a recommended solution. Read the evidence section carefully, because it tells you whether the finding came from a version string, an actual test or an authenticated check, which helps you judge its accuracy.",
   "nmap is the standard network discovery and port scanning tool. Common options include `-sS` (TCP SYN scan), `-sT` (full TCP connect), `-sU` (UDP), `-sV` (service and version detection), `-O` (operating system detection), `-p` (port selection), `-Pn` (skip host discovery) and `-A` (aggressive: OS detection, version detection, default scripts and traceroute). Port states are open (a service is listening), closed (reachable but nothing listening) and filtered (no response or an administrative block, usually a firewall). The Nmap Scripting Engine, invoked with `--script` or `-sC`, runs additional checks, including vulnerability scripts.",
   "```text\nPORT     STATE    SERVICE  VERSION\n22/tcp   open     ssh      OpenSSH 8.9p1\n80/tcp   open     http     nginx\n3389/tcp filtered ms-wbt-server\n```",
   "Web application scanners such as OWASP ZAP, Burp Suite's scanner or Nikto crawl a site and test for issues like injection, cross-site scripting, missing security headers and outdated components, producing many findings that need manual validation. The exam distinguishes testing methods by when and how they look at code. Static application security testing (SAST) analyzes source code or binaries without running them, finding unsafe functions or unvalidated input early in development, but it can produce false positives and cannot see runtime configuration. Dynamic application security testing (DAST) tests the running application from outside, like an attacker, finding real exploitable behavior but only on reachable paths. Software composition analysis (SCA) inventories third-party and open-source libraries, often producing a software bill of materials (SBOM), and flags components with known vulnerabilities or license problems. Fuzzing sends large volumes of malformed or unexpected input to trigger crashes, which is especially good at finding memory corruption and input handling bugs. Cloud posture tools, including cloud security posture management (CSPM) products and provider-native services, report misconfigurations such as publicly readable storage, disabled logging, unencrypted volumes, root accounts without MFA and overly permissive identity policies, often mapped to benchmarks such as the CIS Benchmarks.",
   "Consider a worked example. A development pipeline runs SAST on every commit, SCA on dependencies and DAST nightly against a staging site. SCA flags a logging library with a critical known vulnerability, so the team upgrades the dependency. SAST flags a database query built by joining strings with user input. DAST then confirms that the same search parameter is injectable in the running application, which turns a possible issue into a confirmed one. Meanwhile an nmap scan of the staging server shows port 3389 filtered, telling you a firewall is blocking it rather than the service being absent. Each tool found something the others would have missed.",
   "Common mistakes: treating every scanner finding as confirmed without reading the evidence; confusing closed (host answered, nothing listening) with filtered (something blocked the probe); expecting SAST to find runtime misconfigurations or DAST to see code paths it cannot reach; thinking SCA examines your own code rather than third-party components; and running fuzzers or aggressive web scans against production without approval.",
   "Exam questions often show output and ask for an interpretation. 'Filtered' usually means a firewall. '-sV' reveals service versions, '-O' the operating system and '-sU' UDP services. 'Analyze source code without executing it, early in development' is SAST. 'Test the running application from outside' is DAST. 'Vulnerable open-source library' or 'SBOM' is SCA. 'Malformed random input causing crashes' is fuzzing. 'Public storage bucket found through the provider's API' is a cloud posture tool."
  ],
  "terms": [
   [
    "Plugin",
    "A scanner test that checks for a specific vulnerability or configuration issue and produces a finding."
   ],
   [
    "Filtered port",
    "An nmap state meaning probes got no useful response, usually because a firewall is blocking them."
   ],
   [
    "SAST",
    "Static application security testing, which analyzes code without running it."
   ],
   [
    "DAST",
    "Dynamic application security testing, which tests a running application from the outside."
   ],
   [
    "SCA",
    "Software composition analysis, which identifies third-party components and their known vulnerabilities and licenses."
   ],
   [
    "SBOM",
    "Software bill of materials, a list of the components and versions that make up a piece of software."
   ],
   [
    "Fuzzing",
    "Sending large volumes of malformed or unexpected input to a program to reveal crashes and input handling flaws."
   ]
  ],
  "example": "A developer's pipeline runs SAST on each commit, SCA on dependencies and DAST nightly against a staging site. SCA flags a logging library with a critical known vulnerability, SAST flags a SQL query built with string concatenation, and DAST confirms the injection is reachable. Each tool found something the others could miss, and the team fixes the query and upgrades the library.",
  "tip": "SAST is white-box and early (code at rest); DAST is black-box and later (running app); SCA is about third-party components; fuzzing is about malformed input. In nmap, filtered usually means a firewall is in the way, while closed means the host answered but nothing is listening.",
  "check": [
   [
    "What is the difference between a closed and a filtered port in nmap output?",
    "Closed means the host responded but no service is listening; filtered means the probe was blocked or unanswered, usually by a firewall."
   ],
   [
    "Which testing method finds a vulnerable open-source library in your application?",
    "Software composition analysis (SCA)."
   ],
   [
    "Why might DAST miss a flaw that SAST finds?",
    "DAST only exercises code paths reachable from outside the running application, while SAST reviews all the source code."
   ],
   [
    "Which section of a Nessus finding helps you judge whether it is accurate?",
    "The evidence or output section, which shows what the scanner observed, such as a version banner or missing patch."
   ]
  ]
 },
 {
  "t": "Validating results: true/false positives and negatives, backported patches",
  "body": [
   "Scanners and detection tools are not perfect, so analysts must validate findings before acting on them. Sending a system owner a list of findings that turn out to be false wastes their time and erodes trust in the security team, while missing real issues leaves the organization exposed. Validation is the step that turns raw tool output into findings people can rely on.",
   "Four outcomes describe any detection. A true positive is a real issue correctly reported: the scanner says a vulnerability exists, and it does. A false positive is an alert for something that is not actually present. A true negative is correctly reporting nothing where nothing exists. A false negative is the most dangerous outcome: a real vulnerability or attack goes unreported, giving false confidence. The same terms apply to intrusion detection and SIEM rules as well as vulnerability scans. Reducing false positives by making a tool less sensitive tends to increase false negatives, so tuning is always a balance between the two.",
   "Common causes of false positives in vulnerability scans include banner-based detection, where the scanner reads a version string and assumes vulnerability without testing; non-credentialed scans that must guess; compensating controls or configuration settings the scanner cannot see, such as a vulnerable feature being disabled; and backported patches. Common causes of false negatives include scans that fail to authenticate, hosts that were offline or excluded, firewalls blocking probes, outdated plugin feeds and vulnerabilities for which no check exists yet.",
   "A backported patch is a security fix that a vendor, often a Linux distribution such as Red Hat or Debian, applies to an older version of a package without changing the upstream version number. Distributions do this to keep systems stable while still fixing security flaws. A server might therefore report an older Apache or OpenSSH version string while actually containing the fix. A scanner that relies only on the version banner will flag it as vulnerable, producing a false positive. To validate, check the distribution's package changelog or security advisory for the relevant CVE, compare the full installed package release with the fixed release the vendor lists, or run a credentialed scan that checks installed package versions rather than banners. The general validation toolkit also includes reviewing the evidence in the finding, checking configuration directly on the host, correlating with other sources such as the asset inventory, endpoint detection and response (EDR) or a second scanner, confirming with the system owner, and, where authorized and safe, manually testing whether the condition exists.",
   "Consider a worked example. A scan flags a critical OpenSSH vulnerability on a Red Hat Enterprise Linux server, based on the version banner. Before opening a ticket, you log in with read-only access and query the installed package with the package manager, then look up the CVE in the vendor's security advisory. The advisory lists a fixed package release, and the installed release is equal to or newer than it, so the fix was backported. You record the finding as a false positive in the scanner, attach the evidence, and set the exception to be reviewed at the next quarterly cycle. You also recommend switching that subnet to credentialed scanning so the issue does not recur.",
   "Also watch for scan failures that masquerade as clean results. If a report shows no findings on a host that you know runs dozens of services, check whether authentication failed or the host was unreachable. A clean report is only meaningful if the scan actually ran correctly, so review scan logs and authentication success rates as part of validation.",
   "Common mistakes: assuming an old version string always means a vulnerable system; marking findings as false positives without documented evidence; suppressing a finding permanently instead of reviewing exceptions periodically; treating a clean scan as proof of security without confirming the scan authenticated; and forgetting that a false negative is worse than a false positive, because it hides real risk.",
   "Exam questions often give a scenario and ask you to classify it or choose the validation step. 'Scanner reports a vulnerability that is not present' is a false positive. 'An attack occurred but no alert fired' is a false negative. 'Old version banner on a fully patched Linux server' points to a backported patch. 'How to confirm' usually points to checking vendor advisories and installed package details or running a credentialed scan. 'Report shows zero findings on a busy server' points to checking whether the scan authenticated."
  ],
  "terms": [
   [
    "True positive",
    "A detection that correctly reports a real issue."
   ],
   [
    "False positive",
    "A detection that reports an issue that does not actually exist."
   ],
   [
    "True negative",
    "Correctly reporting no issue where none exists."
   ],
   [
    "False negative",
    "A real issue that the tool fails to report, the most dangerous outcome."
   ],
   [
    "Backported patch",
    "A security fix applied to an older package version without changing its upstream version number."
   ],
   [
    "Banner grabbing",
    "Identifying software and versions from the text a service returns when a connection is made."
   ],
   [
    "Validation",
    "Confirming a finding with additional evidence before treating it as real."
   ]
  ],
  "example": "A scan flags a critical OpenSSH vulnerability on a Red Hat server based on its version banner. The analyst checks the installed package and the vendor's advisory, finds that the package release includes the backported fix for that CVE, and records the finding as a false positive with evidence attached and a review date, then moves the subnet to credentialed scanning.",
  "tip": "If a Linux server shows an old version banner but is patched through its vendor, think backported patch and false positive. A false negative is the worst outcome because it hides real risk, and a clean report means nothing if authentication failed.",
  "check": [
   [
    "Which of the four outcomes is most dangerous, and why?",
    "A false negative, because a real vulnerability or attack goes unreported and gives false confidence."
   ],
   [
    "Why do backported patches cause scanner false positives?",
    "The vendor fixes the flaw without changing the upstream version number, so banner-based checks still see a vulnerable-looking version."
   ],
   [
    "How can you confirm a suspected backport?",
    "Compare the installed package release with the fixed release in the vendor's advisory or changelog, or run a credentialed scan."
   ],
   [
    "A scan shows no findings on a server running many services. What should you check first?",
    "Whether the scan authenticated successfully and could reach the host, since a failed scan can look clean."
   ]
  ]
 },
 {
  "t": "Prioritization: CVSS base metrics and vectors, EPSS, CISA KEV, asset value, exploitability, context",
  "body": [
   "Every organization has more vulnerabilities than it can fix immediately, so prioritization decides where effort goes first. Good prioritization combines three views: how severe a vulnerability is in general, how likely it is to be exploited, and how much it matters in your particular environment. An analyst who sorts a scan report by severity score alone will often spend the week on the wrong problems.",
   "The Common Vulnerability Scoring System (CVSS) rates severity from 0.0 to 10.0. In CVSS v3.x the qualitative ratings are none (0.0), low (0.1 to 3.9), medium (4.0 to 6.9), high (7.0 to 8.9) and critical (9.0 to 10.0). Base metrics describe the vulnerability itself. The exploitability metrics are attack vector (AV: network N, adjacent A, local L, physical P), attack complexity (AC: low or high), privileges required (PR: none, low or high) and user interaction (UI: none or required). Scope (S: unchanged or changed) indicates whether exploitation can affect components beyond the vulnerable one. The impact metrics are confidentiality, integrity and availability (C, I, A), each rated high, low or none. Scores are shared as vector strings, and you should be able to read one at a glance, like the example below.",
   "```text\nCVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H\n```",
   "This means remotely exploitable over the network, low complexity, no privileges and no user interaction needed, scope unchanged, with high impact to confidentiality, integrity and availability, which scores 9.8. Changing AV to P (physical access required) or UI to R (a user must take an action) would lower the score. CVSS v4.0 also exists; it adds and renames some metrics, such as splitting attack requirements out from complexity, but the core ideas of exploitability and impact are the same. Beyond the base score, temporal metrics in v3.x (threat metrics in v4.0) adjust for things like exploit availability, and environmental metrics let you adjust for your own systems. CVSS measures severity, not likelihood. The Exploit Prediction Scoring System (EPSS), maintained by the Forum of Incident Response and Security Teams (FIRST), estimates the probability that a vulnerability will be exploited in the wild in the near future, as a value between 0 and 1. The Cybersecurity and Infrastructure Security Agency (CISA) Known Exploited Vulnerabilities (KEV) catalog lists vulnerabilities with reliable evidence of active exploitation. US federal civilian agencies must remediate them by set deadlines, and many other organizations treat KEV as a must-fix list, because confirmed exploitation removes guesswork.",
   "Context then shifts the order. Asset value and criticality matter (a domain controller or payment database versus a lab machine), as do exposure (internet-facing versus isolated), data sensitivity, existing compensating controls and exploitability in your setting: is the vulnerable feature even enabled? A sound approach is to fix items in KEV or with public exploits on exposed, critical assets first, then use CVSS, EPSS and business context to order the rest.",
   "Consider a worked example. You have two findings. The first is a CVSS 9.1 flaw on an isolated lab server with no known exploit and a very low EPSS probability. The second is a CVSS 7.5 flaw on an internet-facing virtual private network (VPN) appliance that appears in the KEV catalog. Although the first has the higher base score, you patch the VPN appliance first, because active exploitation, internet exposure and business criticality outweigh the difference in severity. The lab server goes into the normal patch cycle, and you note that its isolation acts as a compensating control in the meantime.",
   "Common mistakes: treating CVSS as a measure of risk or likelihood rather than severity; reading AV:L as 'low' when it means local; assuming a low EPSS means a vulnerability can be ignored, when it is a probability rather than a guarantee; ignoring KEV entries because their base score is only high rather than critical; and prioritizing without asset context, so a critical finding on a decommissioned test box outranks an actively exploited flaw on a customer-facing server.",
   "Exam questions often give a vector string or a pair of findings. 'AV:N/PR:N/UI:N' means an unauthenticated remote attacker needs nothing from a user, which is the most dangerous exploitability combination. 'C:H/I:H/A:H' means full impact. 'Probability of exploitation' points to EPSS. 'Evidence of active exploitation' or 'federal remediation deadline' points to CISA KEV. When a scenario compares findings, choose the one that is actively exploited, exposed and on a critical asset, even over a higher raw CVSS score."
  ],
  "terms": [
   [
    "CVSS",
    "Common Vulnerability Scoring System, a 0.0 to 10.0 scale rating the severity of a vulnerability."
   ],
   [
    "Base metrics",
    "The CVSS metrics describing a vulnerability's inherent exploitability and impact, independent of any environment."
   ],
   [
    "Vector string",
    "A compact text representation of the CVSS metric values used to calculate a score."
   ],
   [
    "Attack vector",
    "The CVSS metric for how remote an attacker can be: network, adjacent, local or physical."
   ],
   [
    "EPSS",
    "Exploit Prediction Scoring System, which estimates the probability that a vulnerability will be exploited in the wild soon."
   ],
   [
    "CISA KEV",
    "The Known Exploited Vulnerabilities catalog, listing vulnerabilities with reliable evidence of active exploitation."
   ],
   [
    "Asset criticality",
    "How important a system is to the business, which raises or lowers the priority of its vulnerabilities."
   ]
  ],
  "example": "A team has two findings: a CVSS 9.1 flaw on an isolated lab server with no known exploit, and a CVSS 7.5 flaw on an internet-facing VPN appliance that appears in the KEV catalog. They patch the VPN appliance first because active exploitation, exposure and business criticality outweigh the higher base score, and schedule the lab server for the normal patch cycle.",
  "tip": "Decode vectors: AV:N is the worst attack vector, PR:N and UI:N mean no barrier for the attacker, and C:H/I:H/A:H means full impact. CVSS measures severity, EPSS measures likelihood, and KEV confirms active exploitation, which usually outranks raw CVSS.",
  "check": [
   [
    "What does AV:L mean in a CVSS vector?",
    "Attack vector local: the attacker needs local access to the system, such as a logged-in session, not network access."
   ],
   [
    "What does EPSS measure that CVSS does not?",
    "The probability that a vulnerability will be exploited in the wild in the near future, rather than its severity."
   ],
   [
    "Why do many organizations treat the CISA KEV catalog as a must-fix list?",
    "It contains only vulnerabilities with reliable evidence of active exploitation, so the threat is confirmed."
   ],
   [
    "Name three context factors that can change a vulnerability's priority.",
    "Asset criticality, internet exposure and existing compensating controls; data sensitivity and whether the feature is enabled also matter."
   ]
  ]
 },
 {
  "t": "Common software vulnerabilities: injection, XSS, SSRF, IDOR, broken access control, buffer overflow, insecure cookies",
  "body": [
   "The CySA+ exam expects you to recognize common vulnerability classes from a description, a log entry or a snippet of scanner output, and to know which control fixes each. The Open Worldwide Application Security Project (OWASP) Top 10 is a helpful reference list for web application risks. For every class below, ask two questions: whose code ends up running or which check is missing, and what would the evidence look like?",
   "Injection happens when untrusted input is sent to an interpreter as part of a command or query, so the input changes the command's meaning. Structured Query Language (SQL) injection targets database queries and can expose, modify or delete data. Command injection passes input to an operating system shell. Other forms include Lightweight Directory Access Protocol (LDAP) injection and XML injection. The root cause is mixing code and data without separation. Cross-site scripting (XSS) is injection into a web page that another user's browser then runs. Reflected XSS bounces a payload off the server in a single request, usually through a crafted link. Stored (persistent) XSS saves the payload in the application, such as in a comment, so every visitor runs it. DOM-based XSS happens entirely in client-side script that writes untrusted data into the page. XSS is used to steal session cookies, act as the victim or show fake content. Do not confuse it with cross-site request forgery (CSRF), which tricks a logged-in user's browser into sending an unwanted request to a site that trusts it.",
   "Server-side request forgery (SSRF) makes the server itself send requests to a destination the attacker chooses, for example by supplying an internal URL to a feature that fetches images from a web address. Because the server sits inside the network, SSRF can reach internal services or cloud instance metadata endpoints that may expose temporary credentials. Insecure direct object reference (IDOR) occurs when an application uses a user-supplied identifier, such as an invoice number, to fetch a record without checking whether the user may see it. Changing the number reveals someone else's data. IDOR is one form of broken access control, which covers any failure to enforce what authenticated users may do: reaching admin pages by browsing to them directly, escalating privileges by changing a role parameter, or API endpoints with missing checks.",
   "A buffer overflow happens when a program writes more data into a memory buffer than it can hold, overwriting adjacent memory. In languages such as C and C++ without automatic bounds checking, this can crash the program or let an attacker redirect execution, sometimes leading to remote code execution. Signs include crashes on long inputs and findings from fuzzing. Insecure cookies expose session tokens. Session cookies should carry the `Secure` flag (sent only over HTTPS), `HttpOnly` (not readable by JavaScript, which limits theft through XSS) and a suitable `SameSite` value (limits cross-site sending, which helps against CSRF). Session IDs should be long and random, regenerated after login and expired properly on logout and timeout.",
   "Consider a worked example. During an authorized test, a tester logged in as customer A views their order at `/api/orders/5521`, then changes the number to 5522 and receives customer B's order, including address and phone number. The server checked that a user was logged in but never checked that the order belonged to that user. This is IDOR, a form of broken access control. The same test notices that the session cookie lacks the `HttpOnly` flag, which would make any XSS flaw far more damaging. The recommended fixes are a server-side ownership check on every object request and correct cookie flags.",
   "Common mistakes: confusing XSS (runs in the victim's browser) with CSRF (forges a request from the victim's browser) or with SQL injection (runs in the database); thinking IDOR is an authentication problem, when the user is authenticated but not authorized; assuming HTTPS alone protects cookies without the Secure and HttpOnly flags; confusing SSRF, where the server makes the request, with CSRF, where the user's browser does; and treating buffer overflows as a web-only issue.",
   "Exam questions often hinge on who executes the payload or what check is missing. 'Database returns extra rows' or 'quote and SQL keyword in the parameter' is SQL injection. 'Script runs in other users' browsers' is XSS, stored if it persists for every visitor. 'Server fetches an internal address or metadata endpoint' is SSRF. 'Changing an ID shows another user's record' is IDOR. 'Regular user reaches admin functions' is broken access control. 'Crash on very long input' is a buffer overflow. 'Cookie readable by script or sent over HTTP' is an insecure cookie."
  ],
  "terms": [
   [
    "Injection",
    "A flaw where untrusted input is interpreted as part of a command or query, changing its meaning."
   ],
   [
    "Cross-site scripting (XSS)",
    "Injection of script into a web page that then runs in other users' browsers."
   ],
   [
    "SSRF",
    "Server-side request forgery, which makes a server send requests to attacker-chosen destinations, often internal ones."
   ],
   [
    "IDOR",
    "Insecure direct object reference, where changing an identifier gives access to another user's data because authorization is not checked."
   ],
   [
    "Broken access control",
    "Any failure to enforce what an authenticated user is allowed to see or do."
   ],
   [
    "Buffer overflow",
    "Writing more data to a memory buffer than it can hold, overwriting adjacent memory."
   ],
   [
    "HttpOnly flag",
    "A cookie attribute that prevents JavaScript from reading the cookie, limiting session theft through XSS."
   ]
  ],
  "example": "A tester logged in as customer A views /api/orders/5521, then changes the number to 5522 and sees customer B's order with address and phone number. The server checks that the user is logged in but not that the order belongs to them, which is IDOR, a form of broken access control. The fix is a server-side ownership check on every request.",
  "tip": "Ask who executes the payload: the database or shell (injection), another user's browser (XSS), or the server fetching a URL (SSRF). Changing an ID to see someone else's data is IDOR. SSRF is the server making the request; CSRF is the victim's browser.",
  "check": [
   [
    "What distinguishes stored XSS from reflected XSS?",
    "Stored XSS is saved in the application and runs for every visitor; reflected XSS is returned in a single response, usually via a crafted link."
   ],
   [
    "Why is SSRF especially dangerous in cloud environments?",
    "The server can be made to query internal services or instance metadata endpoints that may expose credentials."
   ],
   [
    "Is IDOR an authentication or an authorization failure?",
    "Authorization: the user is logged in, but the application does not check whether they may access that object."
   ],
   [
    "Which cookie flags protect session tokens, and what does each do?",
    "Secure sends the cookie only over HTTPS, HttpOnly blocks JavaScript access, and SameSite limits cross-site sending."
   ]
  ]
 },
 {
  "t": "Recommending controls: input validation, output encoding, parameterized queries, memory protections, secure coding",
  "body": [
   "Finding a vulnerability is only half of an analyst's job. You also need to recommend a fix that addresses the root cause rather than just the symptom, and the exam will ask you to match each flaw to its best control. Think of layers: the primary fix removes the flaw in the code, and secondary controls such as web application firewalls (WAFs), least privilege and monitoring reduce the damage if something slips through.",
   "Input validation checks that data entering an application matches what is expected before it is used: type, length, format and range. Allow listing, which accepts only known-good patterns such as digits for a postal code, is stronger than deny listing, which blocks known-bad strings, because attackers find endless ways to encode bad input. Validation must happen on the server; client-side checks in the browser improve usability but can be bypassed easily. Validation reduces many attacks but is not enough on its own for injection or cross-site scripting (XSS), because some legitimate input contains characters that are dangerous in certain contexts, such as an apostrophe in a surname.",
   "Output encoding, also called escaping, converts special characters into a safe representation for the context where data is displayed. For HTML, characters like `<` and `>` become `&lt;` and `&gt;`, so the browser shows them as text instead of running them as markup. Encoding must match the context: HTML body, HTML attribute, JavaScript, URL and CSS each need different rules. Output encoding is the primary defense against XSS, often combined with a Content Security Policy (CSP) header that limits which scripts may run. Parameterized queries, also called prepared statements, are the primary defense against SQL injection. The query structure is defined with placeholders, and user input is supplied separately as parameters, so the database always treats it as data, never as code. Stored procedures and object-relational mappers help when they use parameters internally.",
   "```python\n# Unsafe: input becomes part of the SQL text\ncur.execute(\"SELECT * FROM users WHERE name = '\" + name + \"'\")\n# Safe: parameterized query, input passed separately\ncur.execute(\"SELECT * FROM users WHERE name = %s\", (name,))\n```",
   "Memory protections reduce the damage of buffer overflows. Address space layout randomization (ASLR) places code and data at unpredictable addresses. Data execution prevention (DEP), also called no-execute (NX), marks memory regions such as the stack as non-executable. Stack canaries are values placed before return addresses and checked before a function returns, detecting overwrites. The best fix, however, is safe code: bounds-checked functions, careful length handling or memory-safe languages. Secure coding ties it all together: a secure development lifecycle with threat modeling, code review and security testing; least privilege for application and database accounts; error handling that does not leak stack traces; secure session management; updated dependencies; no hard-coded secrets; and vetted framework features for authentication, encryption and encoding rather than home-made versions. Access control checks must be enforced on the server for every request, which is the fix for insecure direct object references (IDOR) and broken access control. For server-side request forgery (SSRF), allow list destination URLs and block requests to internal address ranges and metadata endpoints.",
   "Consider a worked example. A scan finds stored XSS in a product review form and SQL injection in the search function of an online shop. You recommend parameterized queries for the search code, context-aware output encoding when review text is displayed, a Content Security Policy to limit script sources, and server-side input validation with length limits on both fields. You also recommend that the database account used by the web application be restricted to the tables it needs. A WAF rule is added as a temporary measure while developers ship the code fixes, but you make clear it does not replace them.",
   "Common mistakes: choosing input validation as the single best fix for SQL injection or XSS, when parameterized queries and output encoding are the primary controls; relying on client-side validation; treating a WAF as a fix rather than a compensating layer; believing ASLR and DEP remove buffer overflows, when they only make exploitation harder; and assuming that hiding a URL or button is access control.",
   "Exam questions usually pair a flaw with its best control. SQL injection pairs with parameterized queries. XSS pairs with output encoding, supported by CSP. Buffer overflow pairs with bounds checking or memory-safe languages, with ASLR, DEP and canaries as mitigations. IDOR and broken access control pair with server-side authorization checks. SSRF pairs with destination allow listing. 'Stack traces shown to users' pairs with proper error handling. If an answer says 'validate input' and another names the specific primary control, the specific one is usually correct."
  ],
  "terms": [
   [
    "Input validation",
    "Checking that incoming data matches the expected type, length, format and range before it is used."
   ],
   [
    "Allow listing",
    "Accepting only input that matches known-good patterns, rather than trying to block known-bad input."
   ],
   [
    "Output encoding",
    "Converting special characters into a safe form for the context where data is displayed, preventing XSS."
   ],
   [
    "Parameterized query",
    "A database query with placeholders where user input is passed separately, so it is treated as data only."
   ],
   [
    "ASLR",
    "Address space layout randomization, which places code and data at unpredictable memory addresses."
   ],
   [
    "DEP / NX",
    "Data execution prevention, which marks memory regions such as the stack as non-executable."
   ],
   [
    "Content Security Policy",
    "An HTTP response header that restricts which sources of script and other content a browser will load."
   ]
  ],
  "example": "A scan finds stored XSS in a product review form and SQL injection in the search function. The analyst recommends parameterized queries for the search code, context-aware output encoding for review text plus a Content Security Policy, server-side input validation for both, and a least-privilege database account, with a WAF rule only as a stopgap until the code fixes ship.",
  "tip": "Best-fix pairings: SQL injection with parameterized queries, XSS with output encoding, buffer overflow with bounds checking and memory protections, IDOR with server-side authorization checks. Input validation helps everywhere but is rarely the single best answer for injection.",
  "check": [
   [
    "What is the primary defense against SQL injection?",
    "Parameterized queries (prepared statements), which keep user input separate from the SQL code."
   ],
   [
    "Why must input validation be done on the server?",
    "Client-side checks can be bypassed by sending requests directly, so only server-side validation can be trusted."
   ],
   [
    "What does output encoding do to prevent XSS?",
    "It converts characters such as < and > into safe representations so the browser displays them as text rather than running them as code."
   ],
   [
    "Do ASLR and DEP fix buffer overflows?",
    "No; they make exploitation harder, but the real fix is bounds-checked code or a memory-safe language."
   ]
  ]
 },
 {
  "t": "Compensating controls, segmentation and exceptions for systems that cannot be patched",
  "body": [
   "Sometimes the right fix for a vulnerability cannot be applied. A medical device may be certified only with a specific operating system version, an industrial controller may need a plant shutdown to update, a vendor may no longer support a product, or a patch may break a critical application. In these cases you still have to manage the risk, and CySA+ tests how you do it: with compensating controls, segmentation and a documented exception.",
   "A compensating control is an alternative safeguard that reduces risk when the primary control is not feasible. It should address the same threat, provide a comparable level of protection and be documented. Examples include restricting network access to the vulnerable service, disabling the vulnerable feature or protocol, adding an intrusion prevention system (IPS) signature or web application firewall (WAF) rule to block known exploit patterns, requiring stronger authentication in front of the system, application allow listing so only approved software runs, and increased monitoring with specific alerting for exploitation attempts. The choice depends on how the vulnerability is exploited: a network-reachable flaw calls for network restrictions, while a flaw triggered by a malicious file calls for controls on what reaches and runs on the system.",
   "Segmentation is one of the most effective compensating controls. Place unpatchable systems in their own network segment or virtual local area network (VLAN), allow only the specific connections they need through firewall rules (for example, one management workstation on one port), and block internet access entirely where possible. An isolated system is still vulnerable, but far fewer attackers can reach it. Air gapping, full physical separation from other networks, is the extreme form, used in some operational technology and classified environments, though removable media and maintenance laptops can still bridge the gap, so controls on those are part of the design.",
   "When a vulnerability will remain, organizations use a formal exception process, sometimes called a risk exception or waiver. A good exception records the vulnerability and affected systems, why it cannot be remediated, the compensating controls in place, the residual risk, who owns and accepted that risk (a business owner with authority, not the analyst), and an expiration or review date. Exceptions should never be permanent by default, because circumstances change and a patch or replacement may become possible. Your role is to identify unpatchable systems, recommend suitable compensating controls, verify that those controls actually work, and make sure the exception is tracked and revisited. Scanners should record accepted exceptions so they do not create endless duplicate tickets, while still reporting if the situation worsens, such as a new public exploit or an entry in the Known Exploited Vulnerabilities catalog.",
   "Consider a worked example. A hospital's magnetic resonance imaging (MRI) workstation runs an unsupported operating system because the device vendor has not certified an upgrade. The scanner reports several critical vulnerabilities. You recommend moving the workstation to a dedicated VLAN that only the imaging server can reach on the required port, blocking all internet access, applying application allow listing, disabling unused services and USB storage, and adding SIEM alerts for any new connection to or from the device. You then test from a user subnet to confirm the firewall really blocks access. The radiology department head signs a risk exception that expires in twelve months, pending the vendor's upgrade.",
   "Common mistakes: listing a control that does not address the actual threat, such as adding MFA for a flaw exploited without authentication; implementing segmentation but never testing it; letting the analyst or IT team accept business risk instead of the system's business owner; creating exceptions with no expiry or review date; and choosing to simply disconnect a system that the business cannot operate without. Long term, the goal is to replace or upgrade the system, so include end-of-life systems in budgeting and planning. Compensating controls should be a bridge, not a permanent crutch.",
   "Exam questions usually say a system 'cannot be patched', 'is end of life' or 'is vendor certified only on this version' and ask for the best next step. The strongest answers combine a compensating control, often segmentation or network isolation, with a documented exception approved by the risk owner and a review date. 'Who accepts the residual risk' is the business or system owner. Answers such as ignoring the finding, removing it from scans permanently or disconnecting a critical system without a plan are usually wrong."
  ],
  "terms": [
   [
    "Compensating control",
    "An alternative safeguard that reduces risk to an acceptable level when the primary control cannot be used."
   ],
   [
    "Segmentation",
    "Dividing a network into isolated zones so only necessary connections reach a system."
   ],
   [
    "Air gap",
    "Complete physical separation of a system or network from other networks."
   ],
   [
    "Risk exception",
    "A documented, approved and time-limited decision to accept a known risk that cannot currently be remediated."
   ],
   [
    "Residual risk",
    "The risk that remains after compensating controls are applied."
   ],
   [
    "Risk owner",
    "The business person with authority to accept risk for a system, usually the system or data owner."
   ],
   [
    "End of life",
    "The point after which a vendor no longer provides patches or support for a product."
   ]
  ],
  "example": "A hospital MRI workstation runs an unsupported operating system because the vendor has not certified an upgrade. The security team moves it to a dedicated VLAN that only the imaging server can reach, blocks internet access, applies application allow listing and adds alerts for any new connections, then tests the rules from a user subnet. The department head signs a risk exception that expires in twelve months.",
  "tip": "When a system cannot be patched, look for segmentation or another compensating control that addresses the same threat, plus a documented, time-limited exception accepted by the business owner. Ignoring the finding or disconnecting a critical system is usually wrong.",
  "check": [
   [
    "What makes a control a valid compensating control?",
    "It addresses the same threat as the missing control, gives comparable protection and is documented."
   ],
   [
    "Who should accept the residual risk in a risk exception?",
    "The business or system owner with authority over that risk, not the security analyst."
   ],
   [
    "Why should risk exceptions have an expiration date?",
    "Circumstances change, such as a patch becoming available or a new exploit appearing, so the decision must be revisited."
   ],
   [
    "After segmenting an unpatchable system, what should the analyst do?",
    "Verify that the firewall rules actually block unauthorized access, for example by testing from other subnets, and monitor the segment."
   ]
  ]
 },
 {
  "t": "Vulnerability response: patching, configuration management, change management, maintenance windows",
  "body": [
   "Once vulnerabilities are validated and prioritized, they have to be fixed without breaking the business. Vulnerability response is the set of processes that turns a finding into a remediated system, and it depends on cooperation between security, IT operations and system owners. Security usually identifies and prioritizes the problem, while operations teams apply the fix, so clear processes and good communication matter as much as technical skill.",
   "Patching is the most common remediation. A mature patch management process includes tracking vendor releases and advisories; evaluating which patches apply to which assets; testing patches in a non-production environment that resembles production; deploying in stages, often starting with a pilot group; verifying installation, usually by rescanning; and keeping a rollback plan in case a patch causes problems. Automated tools such as operating system update services and endpoint management platforms make patching scale, but someone still has to confirm that it happened. Emergency or out-of-band patches for actively exploited flaws may skip parts of the normal schedule, but they still follow an expedited, documented process.",
   "Configuration management addresses vulnerabilities that are not missing patches: default passwords, unnecessary services, weak protocols such as SMBv1 or old TLS versions, excessive permissions and disabled logging. The approach is to define secure baselines, often based on industry benchmarks such as the Center for Internet Security (CIS) Benchmarks or vendor security guides, apply them consistently with automation (group policy, configuration management tools, infrastructure as code) and detect drift, which is when a system changes away from its approved baseline. A configuration management database (CMDB) records assets, their configurations and their relationships, which helps you judge what a change might affect.",
   "Change management ensures that changes to production are reviewed, approved, scheduled and documented, so that fixes do not cause outages and unauthorized changes can be spotted. A typical request describes the change, the reason, affected systems, the risk, test results, implementation steps and the rollback plan. A change advisory board (CAB) often reviews significant changes. Standard, low-risk changes may be pre-approved, while emergency changes have a faster path with review afterward. Change records also help investigations: an unexplained configuration change with no ticket is a potential indicator of compromise. Maintenance windows are scheduled periods, usually during low business activity, when changes and reboots are allowed. They reduce disruption but also create delay: if the next window is three weeks away, a critical vulnerability stays open that long. Analysts help by identifying which items justify an emergency change and by recommending interim compensating controls until the window arrives.",
   "Consider a worked example. A critical remote code execution flaw in your web server platform is added to the Known Exploited Vulnerabilities (KEV) catalog on a Tuesday, and the next maintenance window is two weeks away. You recommend an emergency change for internet-facing servers. The team tests the patch on staging overnight, submits the emergency change with a rollback plan, deploys it the next evening, and rescans to confirm the fix. Internal servers, which are harder for an attacker to reach, are scheduled for the normal window with a web application firewall (WAF) rule in place meanwhile. The emergency change is reviewed by the CAB afterward.",
   "Close the loop by verifying remediation with a rescan, updating tickets and tracking metrics such as mean time to remediate against service level agreements (SLAs), for example a target number of days to fix critical findings. Repeated SLA misses on the same systems often point to a process problem, such as an owner who has no maintenance window, rather than a technical one.",
   "Common mistakes: deploying patches straight to production without testing; closing tickets without rescanning; treating a patch as the fix for a configuration problem such as a default password; assuming emergency changes need no documentation; letting a maintenance window schedule override a critical, actively exploited vulnerability with no interim control; and ignoring configuration drift until an audit finds it.",
   "Exam questions favor disciplined process. 'Before deploying a patch widely' points to testing in a similar non-production environment. 'Confirm the patch worked' points to a rescan. 'Change caused an outage and could not be reversed' points to a missing rollback plan. 'Systems slowly diverge from the approved configuration' is drift, addressed with baselines and configuration management. 'Critical exploited flaw, next window is weeks away' points to an emergency change or an interim compensating control. 'Configuration change with no ticket' should be treated as a possible security event."
  ],
  "terms": [
   [
    "Patch management",
    "The process of identifying, testing, deploying and verifying software updates."
   ],
   [
    "Secure baseline",
    "An approved, hardened configuration standard that systems are built and measured against."
   ],
   [
    "Configuration drift",
    "Gradual divergence of a system from its approved baseline configuration."
   ],
   [
    "Change management",
    "The process for requesting, reviewing, approving, scheduling and documenting changes to production."
   ],
   [
    "Change advisory board (CAB)",
    "The group that reviews and approves significant changes."
   ],
   [
    "Maintenance window",
    "A scheduled period of low business activity when changes and reboots are permitted."
   ],
   [
    "Rollback plan",
    "Documented steps to return a system to its previous state if a change fails."
   ]
  ],
  "example": "A critical remote code execution flaw in a web server platform is added to the KEV catalog. The next maintenance window is two weeks away, so the team files an emergency change, tests the patch on staging overnight, deploys it to internet-facing servers the next evening with a rollback plan ready, rescans to confirm, and schedules internal servers for the normal window with a WAF rule in place meanwhile.",
  "tip": "The exam favors testing before deployment, documented change requests with rollback plans, and rescanning to verify. An actively exploited critical flaw can justify an emergency change, and an unauthorized change with no ticket should be treated as a possible security event.",
  "check": [
   [
    "How should you verify that a vulnerability has been remediated?",
    "Rescan the affected systems, or otherwise confirm the fixed version or configuration is in place, before closing the ticket."
   ],
   [
    "What is configuration drift and how is it controlled?",
    "Systems changing away from their approved baseline over time; it is controlled with defined baselines, automated configuration management and drift detection."
   ],
   [
    "What should happen if a critical exploited vulnerability cannot wait for the next maintenance window?",
    "Use the emergency change process, or apply interim compensating controls until the patch can be deployed."
   ],
   [
    "Why is an unexplained configuration change a security concern?",
    "Changes should have an approved ticket, so one without a record may indicate an attacker or an insider acting outside process."
   ]
  ]
 },
 {
  "t": "Risk management: accept, avoid, transfer, mitigate; inhibitors to remediation (legacy systems, business process interruption, MOUs/SLAs)",
  "body": [
   "Vulnerability management lives inside a larger risk management program. Risk is the combination of the likelihood that a threat exploits a vulnerability and the impact if it does. Your scanner may report thousands of findings, but the organization has limited money, staff and maintenance time, so not every risk can or should be eliminated. The exam expects you to know the four standard risk responses, who is allowed to choose them, and the practical obstacles, called inhibitors to remediation, that delay fixes even when everyone agrees a fix is needed.",
   "Accept means acknowledging the risk and choosing not to take further action, usually because the cost of addressing it exceeds the expected loss or because it falls within the organization's risk appetite (the amount of risk leadership is willing to tolerate). Acceptance must be a documented decision by a risk owner with authority, not an analyst quietly ignoring a finding, and it should have an expiry date so it is reviewed. Avoid means eliminating the risk by stopping the activity that creates it, such as decommissioning a vulnerable service or choosing not to launch a risky feature. Transfer means shifting the financial impact to another party, most commonly through cyber insurance or contract terms with a vendor; the legal responsibility for protecting data and the reputational damage generally stay with you. Mitigate (reduce) means applying controls, such as patches, segmentation, hardening or monitoring, to lower likelihood or impact. The risk left over after controls is residual risk, and it is the residual risk that the owner ultimately accepts.",
   "In practice the responses are combined. You might mitigate most of a risk with a compensating control, transfer part of the financial exposure through insurance and formally accept what remains. The analyst's job is not to make the business decision but to inform it: describe the vulnerability, its likelihood and impact, the cost and disruption of each option, available compensating controls and the residual risk each choice leaves behind.",
   "Even when an organization wants to remediate, several inhibitors get in the way. Legacy systems may run unsupported software for which no patch exists, or applications that only work on an old platform. Upgrading can require major projects, retraining or vendor re-certification, as with medical devices and industrial control equipment. Business process interruption is the fear, often justified, that patching or reconfiguring will cause downtime in a critical process such as a production line, a trading platform or a hospital system, so owners push remediation to rare maintenance windows. Degraded functionality is a related worry: the fix works but breaks a feature users depend on.",
   "Agreements can also restrict action. A memorandum of understanding (MOU) is a less formal agreement between parties describing shared intentions and responsibilities, for example between two departments or two partner organizations sharing a network link. A service level agreement (SLA) sets measurable commitments such as uptime percentages or response times; if an SLA promises very high availability, a patch requiring downtime may risk breaching it. Vendor contracts may forbid customers from modifying systems, voiding support if you apply unapproved patches. Other inhibitors include organizational governance and slow change approval, lack of budget or staff, and proprietary systems where only the vendor can apply changes.",
   "Consider a worked example. A manufacturer's plant runs a controller application that only works on an unsupported operating system, and your scan flags several critical vulnerabilities on it. Replacing it means buying a new production line. You document the finding and the inhibitor (legacy system plus business process interruption). Management chooses to mitigate by moving the host to an isolated segment with strict firewall rules and extra monitoring, transfers part of the financial exposure through cyber insurance, and signs a risk acceptance for the residual risk for twelve months while budgeting for replacement. Nobody chose avoid, because shutting the line down would stop the business.",
   "Common mistakes: believing insurance transfers all responsibility (it transfers financial loss, not accountability or reputation); treating acceptance as doing nothing without documentation; letting the analyst accept risk instead of the system or business owner; forgetting that acceptance should be revisited; and confusing avoidance, which removes the activity entirely, with mitigation, which keeps the activity but adds controls. Another trap is assuming an inhibitor means the vulnerability can be ignored. It simply means you need a different response, usually a compensating control plus a documented exception.",
   "Exam questions usually describe an action and ask which response it represents. Clue words map cleanly: purchasing cyber insurance or outsourcing liability points to transfer; shutting down, retiring or not launching points to avoid; patching, segmenting or adding controls points to mitigate; signing off or documenting a decision to proceed points to accept. If a scenario says a fix cannot be applied because of an uptime commitment, the inhibitor is the SLA; if it says the system runs an operating system the vendor no longer supports, the inhibitor is a legacy system; if it says patching would halt production, it is business process interruption."
  ],
  "terms": [
   [
    "Risk appetite",
    "The amount and type of risk an organization is willing to pursue or tolerate to meet its goals."
   ],
   [
    "Risk acceptance",
    "A documented decision by an authorized risk owner to live with a risk without further action."
   ],
   [
    "Risk transference",
    "Shifting the financial impact of a risk to another party, such as an insurer, while accountability remains."
   ],
   [
    "Risk avoidance",
    "Eliminating a risk by stopping the activity or retiring the system that creates it."
   ],
   [
    "Residual risk",
    "The risk that remains after controls have been applied."
   ],
   [
    "Memorandum of understanding (MOU)",
    "A less formal agreement describing shared intentions and responsibilities between parties."
   ],
   [
    "Service level agreement (SLA)",
    "A contract setting measurable service commitments such as uptime or response times."
   ]
  ],
  "example": "A hospital's imaging system runs on a vendor-certified build that cannot be patched without voiding support, and a critical remote code execution flaw is found. The analyst reports the finding with the inhibitor. The system owner mitigates by placing the device on a restricted VLAN that only the imaging workstations can reach, and signs a six-month risk acceptance while the vendor certifies an update.",
  "tip": "Insurance is transfer, retiring the service is avoidance, adding controls is mitigation, and a signed decision to proceed is acceptance. Only a risk owner with authority accepts risk, never the analyst alone.",
  "check": [
   [
    "A company buys cyber insurance to cover breach costs. Which risk response is this?",
    "Transfer, because the financial impact shifts to the insurer while the company keeps responsibility for protecting data."
   ],
   [
    "An unpatched server cannot be rebooted because the contract promises customers near-continuous availability. What inhibitor is this?",
    "An SLA, since the uptime commitment makes the downtime needed for patching a potential breach of contract."
   ],
   [
    "Who should formally accept a risk that cannot be remediated?",
    "The system or business owner with authority over the risk, documented and reviewed, not the analyst who found it."
   ],
   [
    "What is residual risk?",
    "The risk left after controls are applied; it is what the owner accepts once mitigation is done."
   ]
  ]
 },
 {
  "t": "Attack frameworks: Cyber Kill Chain, Diamond Model, MITRE ATT&CK, OWASP Testing Guide, OSSTMM",
  "body": [
   "Attack frameworks give analysts a shared vocabulary for describing how attacks unfold and a structure for finding gaps in defenses. Instead of saying the attacker got in and did bad things, you can say which phase or tactic each action belongs to, compare incidents, and check whether your detections cover each stage. CySA+ expects you to know what each framework models, how they differ and when you would reach for each one.",
   "The Lockheed Martin Cyber Kill Chain describes an intrusion as seven sequential phases: reconnaissance (researching the target), weaponization (pairing an exploit with a payload), delivery (sending it, such as by email or a malicious link), exploitation (triggering the vulnerability), installation (establishing malware or persistence), command and control, often shortened to C2 (a remote channel back to the attacker), and actions on objectives (data theft, destruction or ransomware). The key idea is that breaking any link stops the attack, so defenders map controls to each phase, ideally stopping attacks as early as possible. Its limitation is that it is linear and focused on malware-based perimeter intrusions, so it fits insider threats, cloud abuse and attacks using only valid credentials less well.",
   "The Diamond Model of Intrusion Analysis describes every intrusion event with four core features at the corners of a diamond: adversary, capability (tools and malware), infrastructure (IP addresses, domains and servers used) and victim. Edges connect related features, so if you know one piece of infrastructure you can pivot to find other victims or capabilities linked to it. Meta-features include timestamp, phase, result, direction, methodology and resources. Analysts use it to link events into activity threads, cluster related intrusions and support attribution of campaigns.",
   "MITRE ATT&CK (Adversarial Tactics, Techniques and Common Knowledge) is a large, regularly updated knowledge base of real-world adversary behavior. It is organized as a matrix: columns are tactics (the adversary's goals, such as initial access, execution, persistence, privilege escalation, defense evasion, credential access, discovery, lateral movement, collection, command and control, exfiltration and impact), and cells are techniques and sub-techniques with identifiers such as `T1053` for scheduled task/job. Each entry lists procedure examples, detection ideas and mitigations. Analysts use ATT&CK to map detections and find coverage gaps, plan threat hunts, describe incidents precisely and emulate adversaries in testing. Separate matrices exist for enterprise, mobile and industrial control systems (ICS). Unlike the Kill Chain, ATT&CK tactics are not a strict sequence; attackers move among them freely.",
   "Two testing methodologies also appear in this objective. The OWASP Web Security Testing Guide, from the Open Worldwide Application Security Project, is a detailed methodology for testing web applications, grouping tests into areas such as information gathering, configuration, identity management, authentication, authorization, session management, input validation, error handling, cryptography, business logic and client-side testing. The Open Source Security Testing Methodology Manual (OSSTMM), from ISECOM, is a peer-reviewed methodology for testing operational security broadly, covering human, physical, wireless, telecommunications and data network channels, with an emphasis on measurable, repeatable results.",
   "Consider a worked example. After a phishing incident, you map it to ATT&CK: a spearphishing attachment for initial access, user execution, a registry Run key for persistence and web protocols over HTTPS for C2. Comparing that map with your SIEM (security information and event management) rules reveals no detection for Run key changes, so you add a rule based on endpoint telemetry. Using the Diamond Model, you pivot from the C2 domain (infrastructure) and discover two earlier events against other departments that used the same domain. For the leadership briefing, you describe the attack using Kill Chain phases because the linear story is easy to follow.",
   "Common mistakes: treating ATT&CK as a sequence of steps like the Kill Chain; confusing the Diamond Model's capability corner (tools) with infrastructure (where the tools were hosted or controlled from); assuming the Kill Chain covers insider threats well; and mixing up OWASP, which is about web applications, with OSSTMM, which is about operational security testing across many channels. Remember too that frameworks describe and organize; they are not detection tools in themselves.",
   "Exam wording usually gives the framework away. Seven linear phases, weaponization or breaking the chain point to the Kill Chain. Adversary, capability, infrastructure and victim, or pivoting between them, point to the Diamond Model. Tactics, techniques, procedures, technique IDs, heat maps of detection coverage or adversary emulation point to ATT&CK. A methodology for testing a web application points to the OWASP testing guide, and a scientific, broad operational security testing methodology points to OSSTMM."
  ],
  "terms": [
   [
    "Cyber Kill Chain",
    "Lockheed Martin's seven-phase linear model of an intrusion, from reconnaissance to actions on objectives."
   ],
   [
    "Diamond Model",
    "An intrusion analysis model linking adversary, capability, infrastructure and victim for each event."
   ],
   [
    "MITRE ATT&CK",
    "A knowledge base of adversary tactics and techniques used to map detections, hunts and incidents."
   ],
   [
    "Tactic",
    "In ATT&CK, the adversary's goal at a point in an attack, such as persistence or lateral movement."
   ],
   [
    "Technique",
    "In ATT&CK, a specific way an adversary achieves a tactic, identified by an ID such as T1053."
   ],
   [
    "OWASP Web Security Testing Guide",
    "A methodology for testing the security of web applications across areas like authentication and input validation."
   ],
   [
    "OSSTMM",
    "A peer-reviewed methodology for measurable testing of operational security across human, physical, wireless and network channels."
   ]
  ],
  "example": "A SOC builds an ATT&CK coverage heat map by tagging every SIEM and EDR rule with its technique ID. The map shows strong coverage of execution and C2 but almost nothing for credential access. The team prioritizes new detections for credential dumping and schedules a purple team exercise emulating a known threat group's credential access techniques to validate them.",
  "tip": "Linear phases means Kill Chain; four corners and pivoting means Diamond Model; tactics and technique IDs means ATT&CK. OWASP is for web apps, OSSTMM is broad operational security testing.",
  "check": [
   [
    "An analyst links an attacker's domain to two other victims by pivoting from infrastructure. Which framework is being used?",
    "The Diamond Model, which connects adversary, capability, infrastructure and victim so analysts can pivot between them."
   ],
   [
    "What is a key limitation of the Cyber Kill Chain?",
    "It is linear and malware- and perimeter-focused, so it fits insider threats and credential-only or cloud attacks poorly."
   ],
   [
    "You want to find gaps in detection coverage by technique. Which framework fits best?",
    "MITRE ATT&CK, because its tactics and technique IDs let you map each detection and see uncovered techniques."
   ],
   [
    "Which methodology would you choose to plan a web application assessment?",
    "The OWASP Web Security Testing Guide, since it is built specifically for testing web applications."
   ]
  ]
 },
 {
  "t": "IR lifecycle (NIST SP 800-61): preparation; detection and analysis; containment, eradication and recovery; post-incident activity",
  "body": [
   "NIST Special Publication 800-61, the Computer Security Incident Handling Guide from the National Institute of Standards and Technology, describes a lifecycle that many organizations and the CySA+ exam use as the standard model for incident response (IR). Its phases are preparation; detection and analysis; containment, eradication and recovery; and post-incident activity. The most recent revision of the document reorganizes guidance around the NIST Cybersecurity Framework functions, but the four-phase lifecycle is still the model you should know cold, because exam questions ask you to place actions into it.",
   "Preparation happens before any incident. It includes writing an incident response policy and plan, forming and training a computer security incident response team (CSIRT), defining roles and contact lists, preparing playbooks for common incident types, acquiring tools (forensic workstations, jump bags, clean media, analysis software), making sure logging and monitoring are in place, and practicing through exercises. Preventive controls that reduce the number of incidents, such as patching, hardening and awareness training, also sit here.",
   "Detection and analysis is where potential incidents are identified and confirmed. Precursors are signs that an incident may happen in the future, such as a vulnerability announcement or a threat from a hacktivist group, while indicators are signs that one may have happened or is happening, such as alerts, unusual log entries or user reports. Analysts validate alerts, determine scope and impact, prioritize based on functional impact, information impact and recoverability, document everything and notify the right people. This phase is often the hardest because real signals hide among large volumes of noise.",
   "Containment, eradication and recovery are grouped together because they overlap and loop. Containment limits damage and stops spread, for example by isolating a host or disabling an account; the strategy depends on potential damage, the need to preserve evidence, service availability and available resources. Eradication removes the threat: deleting malware, removing persistence and attacker accounts, and fixing the exploited vulnerability. Recovery restores systems to normal operation, often from clean backups or rebuilt images, with close monitoring to make sure the attacker does not return. If new evidence appears during this work, you loop back to detection and analysis.",
   "Post-incident activity includes a lessons learned meeting soon after the incident, a final report, updates to plans, playbooks and controls, and retention of evidence according to policy. Questions to answer include what happened and when, how well staff performed, what information was needed sooner, what would be done differently and which indicators to watch for in future. This phase feeds back into preparation, which is why the lifecycle is drawn as a cycle rather than a line.",
   "Consider a worked example. A SOC (security operations center) detects ransomware encrypting a file share. Analysts confirm the alert, identify the source workstation and the compromised account: detection and analysis. They disconnect the workstation using EDR (endpoint detection and response) network isolation and disable the account: containment. They remove the malware and the scheduled task that launched it and patch the exploited remote access service: eradication. They restore the share from a clean backup and watch closely for reinfection: recovery. Two weeks later a lessons learned meeting leads to blocking macros from internet files and adding a new detection rule: post-incident activity, which in turn improves preparation.",
   "Common mistakes: treating the phases as strictly sequential (analysis continues during containment, and recovery can uncover new indicators); putting playbook writing or training anywhere but preparation; confusing containment (stop the spread) with eradication (remove the cause); and skipping post-incident activity once systems are back up. Another frequent slip is placing the notification of stakeholders only at the end, when in fact notification begins during detection and analysis once an incident is confirmed.",
   "Exam questions often give a single action and ask which phase it belongs to. Map the clue words: building a jump bag, training, tabletop exercises or writing playbooks means preparation; reviewing alerts, correlating logs, determining scope or assigning severity means detection and analysis; isolating, segmenting or disabling accounts means containment; removing malware, deleting persistence or patching the entry point means eradication; restoring from backup or returning systems to production means recovery; and root cause analysis, lessons learned or updating the plan means post-incident activity. When asked what to do first on discovering a possible incident, the answer is usually to validate and analyze before acting."
  ],
  "terms": [
   [
    "NIST SP 800-61",
    "NIST's Computer Security Incident Handling Guide, source of the standard incident response lifecycle."
   ],
   [
    "CSIRT",
    "Computer security incident response team, the group responsible for handling incidents."
   ],
   [
    "Precursor",
    "A sign that an incident may occur in the future, such as a threat announcement."
   ],
   [
    "Indicator",
    "A sign that an incident may have occurred or is occurring, such as an alert or anomalous log entry."
   ],
   [
    "Containment",
    "Actions that limit damage and stop an incident from spreading."
   ],
   [
    "Eradication",
    "Removing the threat and its persistence and fixing the vulnerability that allowed it."
   ],
   [
    "Recovery",
    "Restoring affected systems to normal, verified operation while monitoring for recurrence."
   ]
  ],
  "example": "A retailer's SOC sees a web server making outbound connections to an unfamiliar host. Analysts confirm a web shell (detection and analysis), block the host at the firewall and pull the server from the load balancer (containment), rebuild it from a clean image and patch the vulnerable plugin (eradication), bring it back online under extra monitoring (recovery), then hold a lessons learned review that adds file integrity monitoring to all web servers (post-incident activity).",
  "tip": "Map actions to phases: playbooks and training are preparation, isolating a host is containment, removing malware is eradication, restoring backups is recovery, and lessons learned is post-incident activity.",
  "check": [
   [
    "A team holds a tabletop exercise to practice its ransomware playbook. Which phase is this?",
    "Preparation, because it happens before an incident to test and improve the plan."
   ],
   [
    "What is the difference between a precursor and an indicator?",
    "A precursor suggests an incident may happen in the future; an indicator suggests one has happened or is happening."
   ],
   [
    "Why are containment, eradication and recovery grouped into one phase?",
    "They overlap and often loop, and new findings during them can send you back to analysis."
   ],
   [
    "Which phase feeds improvements back into preparation?",
    "Post-incident activity, through lessons learned, updated playbooks and new controls."
   ]
  ]
 },
 {
  "t": "Detection and analysis: IoCs, scoping, impact, severity and triage",
  "body": [
   "Detection and analysis turns a raw signal into a confirmed, understood incident. It answers three questions: is this real, how big is it, and how urgent is it? Mistakes here ripple through the rest of the response. If you miss that an alert is real, the attacker keeps working; if you under-scope, you clean some systems while the attacker stays on others; if you misjudge severity, the wrong people are called too late. That is why the exam tests this phase heavily.",
   "Indicators of compromise (IoCs) are the evidence you work from: malicious file hashes, suspicious IP addresses and domains, registry keys, unusual processes, new accounts, specific log entries or user reports. Indicators of attack (IoAs) focus on behavior in progress, such as a process reading credential memory or a sudden burst of file renames, rather than a static artifact. Static IoCs are easy for attackers to change, while behaviors are harder to disguise, so good detection uses both. Once you confirm one indicator, use it to pivot: search the SIEM and EDR for the same hash, domain, account or behavior on other systems.",
   "Scoping determines how far the incident extends: which hosts, accounts, applications, networks and data are affected, and over what time frame. Start from the first confirmed indicator and work outward, looking for lateral movement, other hosts contacting the same C2 infrastructure and use of the same compromised credentials. Also work backward in time to find the initial access point and the earliest malicious activity, sometimes called patient zero. Under-scoping is dangerous: if you clean three hosts but the attacker is on a fourth, they will return.",
   "Impact describes the effect on the organization. NIST guidance frames it in three ways. Functional impact is the effect on business operations, from none to high, such as a critical service being down. Information impact is whether data confidentiality, integrity or availability was affected, such as a privacy breach of customer records or theft of intellectual property. Recoverability is how much time and resources recovery will take, from regular to not recoverable. Consider also financial, legal and reputational effects, and whether regulated data is involved, since that can trigger notification requirements. Severity combines these factors into a level, often low, medium, high and critical, defined in the IR plan; severity drives who is notified, how fast the team must respond and whether management escalation is required.",
   "Triage is the rapid sorting of incoming alerts so the most important ones get attention first. For each alert you check the asset's criticality and context, look for corroborating evidence, and decide whether it is a false positive (the alert fired but nothing malicious happened), a benign true positive (real activity that is authorized, such as a scheduled penetration test) or a true positive that needs response. Then you assign priority. Document your reasoning in the ticket as you go; notes written during triage become the foundation of the timeline and final report.",
   "Consider a worked example. An EDR alert shows a credential dumping tool on a file server. Triage marks it high priority because the server is business-critical and credential theft enables spread. Pivoting on the tool's hash and the account it ran under, you find the same tool on two more servers and logons using a domain administrator account from a workstation in accounting. Working backward, you trace that workstation's first suspicious activity to a phishing email three days earlier. Because privileged credentials are compromised and the servers hold customer data, severity is raised to critical and the incident manager is notified.",
   "Common mistakes: jumping to eradication after one infected host without scoping; treating a benign true positive as a false positive (the detection was correct; the activity was simply authorized); rating severity only on technical factors while ignoring regulated data or business function; and failing to record triage decisions. Another trap is relying only on hashes, which change trivially, instead of also hunting for the behavior that produced them.",
   "Exam questions in this area often ask for the next step. After confirming one compromised host, the answer is usually to search for the same IoCs elsewhere to determine scope. If a scenario asks how to rank several simultaneous incidents, look for functional impact, information impact and recoverability, with regulated data and critical systems raising priority. Clue words such as authorized scan, scheduled test or approved change indicate a benign true positive; an alert with no underlying malicious activity is a false positive; and malicious activity that produced no alert is a false negative, the most dangerous outcome."
  ],
  "terms": [
   [
    "Indicator of compromise (IoC)",
    "An artifact, such as a hash, domain or registry key, suggesting a system has been compromised."
   ],
   [
    "Indicator of attack (IoA)",
    "Behavioral evidence that an attack is in progress, independent of specific artifacts."
   ],
   [
    "Scoping",
    "Determining which systems, accounts, data and time frame an incident affects."
   ],
   [
    "Patient zero",
    "The first system compromised in an incident, often the initial access point."
   ],
   [
    "Functional impact",
    "The effect of an incident on the organization's ability to operate and deliver services."
   ],
   [
    "Triage",
    "Rapidly sorting and prioritizing alerts to decide which need investigation first."
   ],
   [
    "Benign true positive",
    "An alert that correctly detected real activity which turns out to be authorized."
   ]
  ],
  "example": "A SIEM rule fires for outbound traffic to a known malicious domain from one laptop. The analyst confirms a malicious browser extension, then searches proxy logs for the same domain and finds eleven more laptops, all in marketing, contacting it over the past week. The scope expands from one host to twelve, and the incident is re-rated because one of the laptops belongs to a finance manager with access to payment data.",
  "tip": "Scope before you eradicate. If a question asks what to do after confirming one infected host, search for the same IoCs elsewhere before cleaning anything.",
  "check": [
   [
    "What is the difference between an IoC and an IoA?",
    "An IoC is an artifact left by a compromise, while an IoA is behavior showing an attack in progress."
   ],
   [
    "An alert fires for a vulnerability scan run by the approved security team. How should it be classified?",
    "A benign true positive: the detection was correct, but the activity was authorized."
   ],
   [
    "Why is under-scoping dangerous?",
    "Missed systems or accounts keep the attacker's access alive, so they return after the visible hosts are cleaned."
   ],
   [
    "Name the three impact categories NIST uses to prioritize incidents.",
    "Functional impact, information impact and recoverability."
   ]
  ]
 },
 {
  "t": "Evidence acquisition: order of volatility, chain of custody, legal hold, forensic imaging and hash validation",
  "body": [
   "Evidence gathered during an incident may end up in court, in a regulator's review or in an insurance claim, and it is also what you rely on to understand what happened. Collecting it correctly means capturing it before it disappears, proving it has not been altered and documenting who handled it. The exam tests four related ideas: the order of volatility, chain of custody, legal hold, and forensic imaging with hash validation.",
   "The order of volatility tells you to collect the most short-lived data first. A common ordering, based on RFC 3227, is: CPU registers and cache; routing tables, ARP (Address Resolution Protocol) cache, process table, kernel statistics and system memory (RAM); temporary file systems; disk; remote logging and monitoring data; physical configuration and network topology; and finally archival media such as backups. In practice, this means capturing memory before you power off a machine, because RAM holds running processes, network connections, encryption keys and fileless malware that vanish at shutdown. Do not reboot or shut down a suspect system until memory has been captured, unless ongoing damage forces you to.",
   "Chain of custody is the documented record of who collected each piece of evidence, when, where and how, and every person who has handled or had access to it since. Each transfer is logged with date, time, signatures and purpose, and evidence is stored securely, often in sealed, labeled bags or restricted storage. A gap in the chain can make evidence inadmissible, because the other side can argue it may have been tampered with. Chain of custody proves handling; it does not by itself prove the data is unchanged, which is the job of hashing.",
   "A legal hold (litigation hold) is a directive, usually from legal counsel, to preserve all potentially relevant data when litigation or investigation is reasonably anticipated. It overrides normal retention and deletion schedules, so logs, emails and backups that would ordinarily be rotated out must be kept. Failing to preserve data under a legal hold can bring serious legal penalties, so the security team must know how to suspend automatic deletion in its logging and backup systems.",
   "Forensic imaging creates a bit-for-bit copy of storage media, including deleted files, slack space and unallocated space, not just a copy of visible files. You use a write blocker, hardware or software, to prevent any change to the original, and you analyze the copy, never the original. Tools such as FTK Imager or `dd` create images in raw format or forensic formats like E01, which can store case metadata and hashes. When systems cannot be taken offline, live acquisition captures memory and data from the running system, accepting that the collection tool changes the system slightly; document those changes. Hash validation then proves integrity: compute a cryptographic hash, typically SHA-256 (MD5 and SHA-1 still appear in older tools but are considered weak against deliberate tampering), of the original and of the image. Matching hashes show the image is an exact copy, and recomputing the hash later proves nothing has changed since acquisition.",
   "Consider a worked example. You respond to suspected data theft by a departing employee. The laptop is still on, so you first capture RAM with a trusted tool from clean media, noting the time. You then shut it down, remove the drive, connect it through a hardware write blocker and create an E01 image. The SHA-256 hash of the drive and the image match, and you record both on the chain of custody form. The drive is bagged, labeled, signed over to the evidence custodian and locked away. Legal issues a hold on the employee's mailbox and file shares, and you pause the log rotation that would have deleted last month's proxy logs.",
   "Common mistakes: pulling the power before capturing memory; analyzing the original drive instead of a verified copy; confusing chain of custody (who handled it) with integrity (hashes); forgetting that a legal hold must stop automated deletion; and failing to record the time zone and clock offset of the source system, which later makes timelines unreliable. Another trap is choosing disk before memory because disks hold more data. Volume is not the criterion; how quickly the data disappears is.",
   "Exam questions tend to present a choice of what to collect first or how to prove something. If asked what to capture first from a running system, choose memory (or the most volatile item listed). If asked how to prove an image is an exact copy, choose comparing hashes. If asked how to show evidence was not tampered with in handling, choose chain of custody. If legal counsel expects a lawsuit and asks you to keep everything related, the term is legal hold. If asked how to prevent changes to the original during imaging, choose a write blocker."
  ],
  "terms": [
   [
    "Order of volatility",
    "The practice of collecting evidence from most to least short-lived, such as memory before disk."
   ],
   [
    "Chain of custody",
    "A documented record of every person who collected, handled or accessed an item of evidence."
   ],
   [
    "Legal hold",
    "A directive to preserve relevant data, overriding normal deletion, when litigation is anticipated."
   ],
   [
    "Forensic image",
    "A bit-for-bit copy of storage media, including deleted and unallocated space."
   ],
   [
    "Write blocker",
    "A device or software that allows reading media while preventing any writes to it."
   ],
   [
    "Hash validation",
    "Comparing cryptographic hashes of original and copy to prove the copy is identical and unchanged."
   ],
   [
    "Live acquisition",
    "Collecting data from a running system, accepting small documented changes to capture volatile evidence."
   ]
  ],
  "example": "During a fraud investigation, a responder captures memory from a running finance server, then images its virtual disk from a snapshot. SHA-256 hashes are recorded in the case file. Months later, the hashes are recomputed before the image is shared with outside counsel, they still match, and the signed chain of custody form shows exactly who held the image at every point.",
  "tip": "Memory before disk. Matching hashes prove integrity; chain of custody proves handling. Always analyze a verified copy, never the original.",
  "check": [
   [
    "Which should be collected first from a running compromised server: RAM or the hard drive?",
    "RAM, because it is more volatile and its contents are lost at shutdown."
   ],
   [
    "What does a matching SHA-256 hash of the original drive and its image demonstrate?",
    "That the image is an exact, unaltered bit-for-bit copy of the original."
   ],
   [
    "What is the purpose of a legal hold?",
    "To preserve all potentially relevant data, suspending normal deletion, when litigation or investigation is anticipated."
   ],
   [
    "Why use a write blocker during imaging?",
    "It prevents any writes to the original media, preserving it unchanged as evidence."
   ]
  ]
 },
 {
  "t": "Memory and disk analysis basics: Volatility, FTK Imager, Autopsy",
  "body": [
   "After evidence is acquired, it has to be analyzed. CySA+ expects you to know what the common free and open-source forensic tools do and what kinds of findings they produce, rather than every command option. The three named in this objective cover different jobs: Volatility analyzes memory captures, FTK Imager acquires and previews images, and Autopsy analyzes disk images in depth.",
   "Memory analysis examines a RAM capture to reconstruct what was running at the moment of acquisition. It is valuable because some malware runs only in memory (fileless malware), because attackers inject code into legitimate processes, and because memory holds network connections, command lines and sometimes decrypted data or keys that never touch the disk. The Volatility Framework is the best-known open-source memory analysis tool. Volatility 3 uses plugins named by operating system, for example `windows.pslist` (processes from the kernel's active process list), `windows.pstree` (parent-child relationships), `windows.psscan` (scans memory for process structures, which can reveal hidden or terminated processes), `windows.netscan` (network connections and listening sockets), `windows.cmdline` (process command lines), `windows.dlllist` (loaded DLLs) and `windows.malfind` (memory regions that look like injected executable code). Reading the output is where the skill lies. Look for unusual parent-child pairs, such as a word processor or spreadsheet spawning a command shell or `rundll32.exe`; processes running from odd paths like a user's temporary folder; system process names that are slightly misspelled; network connections from processes that should not talk to the internet; and a process that appears in `psscan` but not `pslist`, which suggests a rootkit has unlinked it from the list to hide it.",
   "```text\nvol -f memory.raw windows.pstree\nvol -f memory.raw windows.netscan\nvol -f memory.raw windows.malfind\n```",
   "FTK Imager, now from Exterro (originally AccessData), is a free Windows tool for acquisition and preview. It can create forensic images of physical drives, logical drives, folders and memory, in raw (`dd`) or E01 format, and it computes and verifies hashes of the image automatically. It can also mount images read-only and let you browse files, including deleted ones, before full analysis. It is mainly a collection and triage tool, not a full analysis suite. Autopsy is an open-source graphical digital forensics platform built on The Sleuth Kit. You create a case, add a disk image as a data source and run ingest modules: file type identification, hash lookup (flagging known-bad files and filtering known-good ones), keyword search, web browser history, recent documents, email, EXIF metadata from images, deleted file recovery and a timeline view of file system activity.",
   "Disk analysis concepts you should know include file system timestamps, often summarized as MAC times (modified, accessed and changed or created, depending on the file system); deleted files that remain in unallocated space until overwritten; file carving, which recovers files from their signatures without file system metadata; slack space; and Windows artifacts such as prefetch files (evidence a program ran), the registry and event logs. Attackers sometimes alter timestamps, known as timestomping, so correlate several sources before drawing conclusions.",
   "Consider a worked example. Analyzing a memory image, you run `windows.pstree` and see `rundll32.exe` spawned by a spreadsheet process. `windows.netscan` shows that process connected to an external IP address on port 443, and `windows.malfind` flags injected code inside it. You note the process ID and time. Next you open the disk image in Autopsy, filter the timeline around that time, and find a spreadsheet attachment saved to the Downloads folder two minutes earlier, plus a prefetch entry showing when `rundll32.exe` first ran. Hash lookup of the attachment matches a known malicious sample.",
   "Common mistakes: using FTK Imager as if it were a full analysis platform; trusting `pslist` alone when a rootkit may hide processes; trusting a single timestamp when timestomping is possible; and analyzing an original drive instead of a hashed copy.",
   "Exam questions usually match a task to a tool. A RAM dump, fileless malware, injected code or hidden processes point to Volatility. Creating an image, verifying its hash or quickly previewing a drive points to FTK Imager. Building a case, keyword searching, recovering deleted files, viewing a timeline or browser history from a disk image points to Autopsy. If a scenario shows a process found by a memory scan but missing from the normal process list, the conclusion is that something is hiding it."
  ],
  "terms": [
   [
    "Volatility",
    "An open-source framework for analyzing memory captures using plugins such as pslist, netscan and malfind."
   ],
   [
    "FTK Imager",
    "A free tool for creating and hashing forensic images and previewing their contents read-only."
   ],
   [
    "Autopsy",
    "An open-source graphical forensic platform built on The Sleuth Kit for analyzing disk images."
   ],
   [
    "Fileless malware",
    "Malicious code that runs in memory or through legitimate tools without writing a conventional executable to disk."
   ],
   [
    "File carving",
    "Recovering files from raw data using their signatures, without relying on file system metadata."
   ],
   [
    "Timestomping",
    "An anti-forensic technique of altering file timestamps to mislead investigators."
   ],
   [
    "Prefetch",
    "Windows files that record program execution, useful as evidence that a program ran."
   ]
  ],
  "example": "A responder receives a memory capture from a server with suspicious outbound traffic but no malware found by antivirus. Volatility's malfind plugin shows injected code in a legitimate service process, and netscan links that process to a rare external address. The disk image, opened in Autopsy, contains no malicious executable at all, confirming a fileless attack launched through a scripting engine.",
  "tip": "Volatility is for memory, FTK Imager is primarily for acquiring and previewing images, and Autopsy is for in-depth disk image analysis with timelines and keyword search.",
  "check": [
   [
    "Which tool would you use to look for injected code in a RAM capture?",
    "Volatility, using a plugin such as malfind that flags suspicious executable memory regions."
   ],
   [
    "A process appears in psscan output but not pslist. What does that suggest?",
    "The process may be hidden by a rootkit that unlinked it from the active process list, or it has terminated."
   ],
   [
    "What is FTK Imager mainly used for?",
    "Creating forensic images with hash verification and previewing their contents, not full case analysis."
   ],
   [
    "Why should you correlate multiple artifacts before trusting a file's timestamp?",
    "Attackers can alter timestamps through timestomping, so a single value may be misleading."
   ]
  ]
 },
 {
  "t": "Containment strategies: isolation, segmentation, and when to watch before acting",
  "body": [
   "Containment limits the damage of an incident and keeps it from spreading, buying time for eradication and recovery. The right strategy depends on what the attacker is doing, how critical the affected systems are and how much you still need to learn. NIST suggests weighing potential damage and theft of resources, the need to preserve evidence, service availability, the time and resources needed, the effectiveness of the strategy and how long the solution must last, for example a temporary block for hours versus a permanent change.",
   "Isolation cuts an affected system off from the rest of the network. It can be done with EDR network containment (the host can talk only to the EDR console), by moving the switch port to a quarantine VLAN, applying host firewall rules, disabling a wireless connection or unplugging the network cable. Isolation stops lateral movement and C2 traffic while leaving the machine powered on, so volatile evidence in memory survives; in most cases that is better than turning the machine off. Account-level containment matters just as much: disable or reset compromised accounts, revoke active sessions and tokens, and rotate exposed keys, because an attacker holding valid credentials may not need the original host at all.",
   "Segmentation-based containment restricts traffic between network zones rather than cutting off single hosts. If an infection is spreading in one department, you might block traffic from that VLAN to the data center or disable SMB (Server Message Block) file sharing between segments. Segmentation designed in advance makes this fast; a flat network makes containment slow and disruptive. Other containment tools include blocking malicious IP addresses and domains at firewalls, proxies and DNS; sinkholing a C2 domain so infected hosts connect to a server you control; disabling a vulnerable service; and removing a compromised system from a load balancer.",
   "Sometimes the best immediate action is to watch before acting. If you contain too early, a skilled attacker may notice, change tactics, destroy evidence, trigger ransomware or retreat to footholds you have not found, and you lose the chance to understand the full scope. Delayed containment means monitoring the attacker closely, often with extra logging, packet capture or by steering them into a controlled environment, until you have identified all compromised systems and accounts, and then containing everything at once. This fits stealthy intrusions such as espionage where immediate damage is low, and it is often coordinated with legal counsel and sometimes law enforcement.",
   "Delayed containment carries real risk: the attacker may cause more damage or steal more data while you watch. It is not appropriate when there is active destruction, encryption, ongoing exfiltration of sensitive data or a threat to safety. The decision belongs to management with legal input, not to an individual analyst, and it must be documented. Whatever strategy you choose, preserve evidence first where possible, notify system owners, record every action with timestamps and confirm that containment worked by watching for further indicators.",
   "Consider a worked example. You discover that a sophisticated actor has been quietly reading a research team's files for weeks. There is no destructive activity, and early analysis suggests other footholds. Leadership, advised by legal, approves two days of enhanced monitoring. During that window you add full packet capture at the research segment boundary and increase endpoint logging, and you identify five compromised hosts, three accounts and a cloud application token. At an agreed time, the team isolates all five hosts through EDR, disables the accounts, revokes the token and blocks the C2 domains simultaneously, leaving the attacker no path back.",
   "Common mistakes: powering off a system as the first step and destroying memory evidence; containing only the host while leaving stolen credentials valid; containing one host at a time in a stealthy intrusion, which tips off the attacker; choosing to watch and wait during active ransomware; and letting an analyst make the delayed containment decision alone. Another mistake is assuming containment is complete without verifying that the indicators actually stopped.",
   "Exam questions usually give an incident type and ask for the best containment action. Active encryption, destructive activity, worm-like spread or data leaving in bulk point to immediate isolation. A stealthy, low-impact intrusion where the attacker's full footprint is unknown points to monitoring before acting, with management approval. If the question stresses preserving volatile evidence, choose network isolation over shutdown. If a whole department is affected, choose segmentation or blocking traffic between zones rather than isolating hosts one by one, and if credentials were stolen, choose disabling accounts and revoking sessions."
  ],
  "terms": [
   [
    "Isolation",
    "Cutting a compromised system off from the network while keeping it running for evidence."
   ],
   [
    "Quarantine VLAN",
    "A restricted network segment where suspect hosts are placed to block their normal traffic."
   ],
   [
    "Segmentation",
    "Dividing a network into zones so traffic between them can be restricted to contain spread."
   ],
   [
    "Sinkholing",
    "Redirecting a malicious domain to a server the defender controls so infected hosts cannot reach the attacker."
   ],
   [
    "Delayed containment",
    "Deliberately monitoring an attacker before acting in order to learn the full scope, then containing all at once."
   ],
   [
    "Session revocation",
    "Invalidating active logins and tokens so stolen sessions can no longer be used."
   ]
  ],
  "example": "A worm starts spreading through file shares in the finance department. The SOC blocks SMB traffic between the finance VLAN and all other segments at the core firewall within minutes, then uses EDR to isolate the infected hosts one by one while keeping them powered on so memory can be captured. The rest of the organization keeps working normally.",
  "tip": "Active ransomware or destruction means contain now. Watching before acting fits only stealthy, low-damage intrusions, needs management and legal approval, and ends with containing everything at once.",
  "check": [
   [
    "Why is network isolation usually preferred over shutting a compromised host down?",
    "It stops the attacker's traffic while keeping the host running, so volatile memory evidence is preserved."
   ],
   [
    "When is delayed containment inappropriate?",
    "When there is active destruction, encryption, ongoing sensitive data exfiltration or a safety risk."
   ],
   [
    "An attacker used a stolen password to access several systems. What containment step must accompany host isolation?",
    "Disabling or resetting the compromised account and revoking its sessions and tokens."
   ],
   [
    "What does sinkholing a C2 domain achieve?",
    "Infected hosts connect to a defender-controlled server instead of the attacker, cutting off command and control and revealing infected hosts."
   ]
  ]
 },
 {
  "t": "Eradication and recovery: reimaging, removing persistence, restoring from clean backups, patching the entry point",
  "body": [
   "Containment stops the bleeding; eradication removes the cause, and recovery returns systems to normal operation. Doing these thoroughly determines whether the attacker is truly gone or simply waiting to return. Many organizations have suffered a second incident within weeks because they cleaned the visible malware but left a backdoor, reused compromised passwords or restored infected backups.",
   "Reimaging, rebuilding a system from a known-good image, is often the most reliable eradication method. Trying to clean malware in place is risky because you may miss components, rootkits or modified system files; a fresh image from a trusted, patched source removes everything the attacker changed on that system. Reimaging does not help, though, if access came from stolen credentials, a compromised firmware layer or other systems that are still infected, so it must be combined with the other steps. For firmware-level compromise, reflashing firmware from a trusted source or replacing hardware may be needed.",
   "Removing persistence means finding and eliminating every mechanism the attacker set up to regain access: malicious services, scheduled tasks, registry Run keys, WMI (Windows Management Instrumentation) event subscriptions, web shells, cron jobs, unauthorized SSH keys, new or modified accounts, mailbox forwarding rules, OAuth application grants in cloud tenants and backdoor VPN profiles. Reset credentials for all compromised accounts and any whose passwords may have been exposed. In Active Directory compromises this can include resetting the KRBTGT account password twice, with an interval between resets, to invalidate forged Kerberos tickets. Scoping findings from detection and analysis guide this work, because anything missed becomes the attacker's way back in.",
   "Restoring from clean backups returns data and systems to service, and the important word is clean. Attackers, especially ransomware groups, may have been present for weeks, and backups taken during that time may contain their malware or persistence. Identify when the compromise began and restore from a point before it, or restore data files only and scan them before use. Protect backups from attackers with offline, immutable or segmented copies; the widely cited 3-2-1 practice keeps three copies of data on two types of media with one copy offsite. Test restores regularly so you know recovery works and how long it takes.",
   "Patching the entry point closes the door the attacker used. If they got in through an unpatched VPN appliance, a weak password on an exposed remote desktop service or a vulnerable web application, restoring systems without fixing that weakness invites immediate reinfection. The fix might be a patch, a configuration change, multifactor authentication (MFA) or removing the exposed service entirely. Recovery then includes validation and monitoring: scan restored systems, confirm they meet the security baseline, bring them back in stages, and watch closely for the attacker's IoCs for weeks afterward. Business owners confirm that services work correctly before the incident is declared resolved.",
   "Consider a worked example. A ransomware incident is traced to an unpatched remote access appliance, and log analysis shows the attacker's first logon three weeks before encryption. The team patches the appliance and enforces MFA on it, rebuilds the affected servers from gold images, resets all privileged and service account passwords, resets KRBTGT twice, and removes a malicious scheduled task found on a file server that was not encrypted. Data is restored from immutable backups taken before the first logon. The servers return to production in priority order under heightened monitoring, and the application owners sign off on each.",
   "Common mistakes: cleaning a host in place and declaring victory; restoring from the most recent backup without checking whether it predates the compromise; rebuilding servers but leaving the stolen credentials valid; forgetting cloud persistence such as OAuth grants and mail forwarding rules; and returning systems to service before the original vulnerability is fixed. Another trap is treating recovery as finished the moment systems are online; monitoring for recurrence is part of recovery.",
   "Exam questions often ask which step prevents reinfection or which backup to use. If the scenario says the attacker was present for some time before detection, the answer is a backup from before the initial compromise, not simply the latest. If malware returns after cleanup, suspect missed persistence or an unpatched entry point. If the question asks for the most reliable way to ensure a host is clean, choose reimaging from a trusted image. If forged Kerberos tickets are mentioned, the answer involves resetting the KRBTGT password twice."
  ],
  "terms": [
   [
    "Eradication",
    "Removing all attacker tools, persistence and access, and fixing the exploited weakness."
   ],
   [
    "Reimaging",
    "Rebuilding a system from a trusted, known-good image instead of cleaning it in place."
   ],
   [
    "Persistence",
    "Mechanisms an attacker installs to regain access after reboots or cleanup."
   ],
   [
    "Gold image",
    "A hardened, approved baseline image used to build or rebuild systems."
   ],
   [
    "Immutable backup",
    "A backup copy that cannot be modified or deleted during its retention period."
   ],
   [
    "3-2-1 backup practice",
    "Keeping three copies of data on two media types with one copy offsite."
   ],
   [
    "KRBTGT",
    "The Active Directory account whose key signs Kerberos tickets; resetting it twice invalidates forged tickets."
   ]
  ],
  "example": "Two weeks after a malware cleanup, the same C2 traffic reappears. Investigation finds a WMI event subscription that relaunches the malware and a VPN account the attacker created, neither of which was removed. The team rebuilds the affected hosts from gold images, deletes the rogue account, resets all related credentials and adds a detection rule for new WMI subscriptions.",
  "tip": "Reimaging beats cleaning in place, restores must come from backups taken before the compromise began, and recovery is incomplete until the original entry point is fixed and monitored.",
  "check": [
   [
    "Why is reimaging preferred over cleaning malware in place?",
    "In-place cleaning may miss components, rootkits or modified files, while a trusted image removes all changes."
   ],
   [
    "An attacker was present for a month before ransomware ran. Which backup should be restored?",
    "One taken before the initial compromise, since later backups may contain the attacker's persistence."
   ],
   [
    "Name three persistence mechanisms to check during eradication.",
    "Examples include scheduled tasks, registry Run keys, services, WMI subscriptions, web shells, new accounts and mail forwarding rules."
   ],
   [
    "What happens if systems are restored but the entry point is not fixed?",
    "The attacker can use the same weakness to get back in, causing reinfection."
   ]
  ]
 },
 {
  "t": "Preparation: IR plan, playbooks, tools, training, tabletop exercises, out-of-band communication",
  "body": [
   "Incident response is only as good as the preparation behind it. When an incident strikes, there is no time to decide who is in charge, find the right phone numbers or buy a forensic tool. Preparation is the first phase of the NIST lifecycle, and many exam questions describe a chaotic response and ask what should have been done beforehand. The pieces to know are the IR plan, playbooks, tools, training, exercises and out-of-band communication.",
   "The incident response plan is the high-level document that establishes the program. It typically covers purpose and scope, definitions of events and incidents, severity levels, roles and responsibilities (incident manager, analysts, legal, communications, management), reporting and escalation requirements, communication guidelines and metrics. It is backed by an IR policy approved by leadership that gives the team authority to act, for example to take a critical system offline without waiting for a week of approvals. Without that authority, responders stall at the worst moment.",
   "Playbooks give specific steps for common incident types: phishing, malware infection, ransomware, compromised account, data loss, denial of service and insider threat. A good playbook lists triggering conditions, triage questions, containment options, who to notify, evidence to collect and criteria for escalation. The term runbook is sometimes used interchangeably, though runbooks are often narrower, step-by-step technical procedures such as how to isolate a host in the EDR console. Playbooks make responses consistent across analysts and shifts, and they are the basis for SOAR (security orchestration, automation and response) automation.",
   "Tools must be ready before they are needed: forensic workstations, write blockers, imaging and memory capture software, clean storage media, network taps, spare hardware, documentation templates and chain of custody forms. Many teams keep a jump bag with these items. Logging, EDR coverage, a SIEM and time synchronization all need to be in place in advance, because you cannot go back and collect logs that were never recorded. Keep contact lists for internal teams, vendors, legal counsel, insurers and law enforcement current, and store a copy somewhere that will survive an outage.",
   "Training ensures people can use the plan. Responders need technical skills, and all staff need awareness of how to report suspicious activity. Exercises test the plan. A tabletop exercise is a discussion-based session in which participants talk through a scenario and their decisions without touching systems; it is low cost and good at exposing gaps in roles, authority and communication. A walkthrough reviews the plan step by step. Functional or simulation exercises and full-scale exercises involve actually performing actions in a controlled way. Every exercise should end with an after-action review that improves the plan. Out-of-band communication means using channels separate from the possibly compromised environment: if attackers control email or corporate chat, they can read your response plans. Prepare alternatives such as phone bridges, dedicated mobile devices or a separate messaging platform, and agree when to switch to them.",
   "Consider a worked example. During a tabletop exercise simulating ransomware, a facilitator announces that the file servers and email are encrypted. The team realizes that its contact list lives only on a file server, that the plan assumes coordination over corporate email, and that nobody is sure who can authorize shutting down the payment system. Actions follow: printed and offline contact sheets, an out-of-band messaging group and conference bridge, a clause in the IR policy granting the incident manager authority to isolate critical systems, and an updated ransomware playbook. Nothing was touched in production, yet the organization is far better prepared.",
   "Common mistakes: confusing a tabletop exercise with a technical simulation (tabletop is discussion only); assuming tools can be bought or logging enabled once an incident starts; writing a plan without leadership approval and authority; storing the only copy of the plan on systems likely to be affected; and running exercises without recording and acting on findings. Another trap is treating playbooks as static documents; they should be revised after every exercise and real incident.",
   "Exam wording is usually direct. Discussion-based, conference room or walking through a scenario without affecting systems means a tabletop exercise. Attackers may be monitoring email or chat means out-of-band communication. Step-by-step procedures for a specific incident type means a playbook. Responders could not act because nobody had authority points to a missing IR policy or plan. Logs were not available when needed points to a preparation failure in logging and retention."
  ],
  "terms": [
   [
    "Incident response plan",
    "The document defining the IR program's scope, roles, severity levels, escalation and communication."
   ],
   [
    "Playbook",
    "A documented set of steps for handling a specific type of incident."
   ],
   [
    "Jump bag",
    "A ready kit of tools, media, forms and contact lists for responders."
   ],
   [
    "Tabletop exercise",
    "A discussion-based walkthrough of a scenario without touching production systems."
   ],
   [
    "Out-of-band communication",
    "Using channels separate from the potentially compromised environment to coordinate a response."
   ],
   [
    "SOAR",
    "Security orchestration, automation and response platforms that automate playbook steps."
   ],
   [
    "After-action review",
    "A structured review after an exercise or incident to capture improvements."
   ]
  ],
  "example": "A company's IR plan names the security manager as incident lead but lists no deputy. During a weekend malware outbreak the manager is unreachable for hours and nobody else feels authorized to isolate the affected servers. The after-action review adds deputies for every role, 24-hour contact methods and a policy clause letting the on-call lead isolate systems without further approval.",
  "tip": "Tabletop equals discussion, no systems touched. If a scenario says attackers may be reading email or chat, the answer is out-of-band communication.",
  "check": [
   [
    "What distinguishes a tabletop exercise from a full-scale exercise?",
    "A tabletop is discussion only; a full-scale exercise actually performs response actions in a controlled way."
   ],
   [
    "Why must logging be configured during preparation?",
    "Logs that were never recorded cannot be collected later, so investigations lack evidence."
   ],
   [
    "The team suspects attackers have access to the corporate email system. How should responders coordinate?",
    "Through out-of-band channels such as a phone bridge or separate messaging platform."
   ],
   [
    "What is the purpose of an IR policy approved by leadership?",
    "It gives the response team formal authority to act, such as taking systems offline during an incident."
   ]
  ]
 },
 {
  "t": "Post-incident activity: root cause analysis, lessons learned, updating playbooks and controls",
  "body": [
   "Post-incident activity is the phase that turns a painful event into a stronger organization. Without it, the same weaknesses produce the same incidents. It happens after the incident is resolved, but ideally soon, while details are fresh, often within a couple of weeks. The two main activities are root cause analysis and the lessons learned process, and both are only valuable if they lead to changes in playbooks and controls.",
   "Root cause analysis (RCA) identifies the underlying reason an incident happened, not just the immediate trigger. The immediate cause of a ransomware outbreak may be that a user opened a malicious attachment, but root causes might include macros enabled by default, missing EDR on that endpoint and a flat network that allowed spread. Techniques include the five whys (repeatedly asking why until you reach a fundamental, fixable cause), fishbone or cause-and-effect diagrams that group contributing factors into categories such as people, process and technology, and timeline reconstruction. Good RCA focuses on systems and processes rather than blaming individuals, because blame discourages honest reporting and hides the real problems.",
   "The lessons learned meeting brings together everyone involved: responders, IT, system owners, management and sometimes legal and communications. Typical questions are exactly what happened and when; how well staff and management performed; whether documented procedures were followed and adequate; what information was needed sooner; what actions might have slowed recovery; what would be done differently; how information sharing with other groups could improve; what corrective actions would prevent similar incidents; and which precursors or indicators to watch for in future. Capture what went well as well as what went wrong, so good practices are kept.",
   "Findings must become concrete actions with owners and deadlines. Updating playbooks is one of the most direct outcomes: add missing steps, remove ones that did not work, adjust escalation criteria and add new incident types. Updating controls addresses root causes: new SIEM detection rules for the techniques observed, EDR policy changes, patching or configuration changes, MFA for exposed services, segmentation, training topics and logging changes so the next investigation has the data it needs. New IoCs go into blocklists and, where appropriate, are shared with partners such as an ISAC (information sharing and analysis center).",
   "Other post-incident tasks include completing the incident report, retaining evidence according to policy and any legal hold, calculating the cost of the incident, and recording metrics such as time to detect and time to contain. Tracking corrective actions to completion matters: a lessons learned document nobody acts on provides no protection. Post-incident activity feeds back into preparation, completing the lifecycle and making the next response faster.",
   "Consider a worked example. A data breach exposed customer records from a cloud storage bucket. The lessons learned review finds that the SOC saw an alert about unusual downloads but closed it because the playbook did not cover cloud storage. The five whys go further: the bucket was public because a developer changed a setting during testing; the change was not caught because no configuration check existed; no check existed because cloud accounts were created outside the security team's onboarding process. Actions include a cloud storage playbook, a cloud security posture management alert for public buckets, a detection rule for mass downloads, mandatory onboarding for new cloud accounts and a training session, each with an owner and due date reviewed monthly.",
   "Common mistakes: stopping the analysis at the first human error, such as a user clicking a link; running a blame-focused meeting that makes people defensive; waiting months until nobody remembers the details; producing recommendations with no owners or deadlines; and failing to feed changes back into playbooks, detections and training. Another trap is assuming post-incident activity is optional for small incidents. Even brief reviews of minor incidents reveal patterns over time.",
   "Exam questions tend to ask what should happen after recovery, or what the purpose of a lessons learned meeting is. The answer is to identify improvements and update plans and controls, not to assign blame. Asking why repeatedly signals the five whys technique; grouping causes into categories signals a fishbone diagram. If a scenario shows the same type of incident recurring, the missing piece is usually effective root cause analysis or follow-through on corrective actions. If asked which phase updates playbooks after an incident, the answer is post-incident activity."
  ],
  "terms": [
   [
    "Root cause analysis (RCA)",
    "A structured process to find the fundamental reason an incident occurred."
   ],
   [
    "Five whys",
    "An RCA technique of asking why repeatedly until reaching a fixable underlying cause."
   ],
   [
    "Fishbone diagram",
    "A cause-and-effect diagram grouping contributing factors into categories such as people, process and technology."
   ],
   [
    "Lessons learned",
    "A review after an incident capturing what worked, what did not and what to change."
   ],
   [
    "Corrective action",
    "A specific, assigned and tracked change made to prevent recurrence."
   ],
   [
    "ISAC",
    "Information sharing and analysis center, a sector group for sharing threat information among members."
   ]
  ],
  "example": "After a business email compromise, the lessons learned meeting reveals that the finance team paid a fraudulent invoice because verification by phone was not required. Root cause analysis shows the email account was taken over through a password reused from another site with no MFA. Actions: MFA for all mailboxes, a callback verification rule for bank detail changes, a detection for new inbox forwarding rules and an updated BEC playbook.",
  "tip": "Root cause is the fundamental reason, not the first thing that went wrong. Lessons learned only pay off when corrective actions are assigned, tracked and fed into playbooks and controls.",
  "check": [
   [
    "What is the main goal of a lessons learned meeting?",
    "To identify improvements to people, processes and technology, not to assign blame."
   ],
   [
    "A user clicked a phishing link. Why is that usually not the root cause?",
    "Underlying factors such as missing controls, defaults or training allowed the click to cause harm; RCA looks past the trigger."
   ],
   [
    "What makes a corrective action effective?",
    "It has a specific owner, a deadline and a way to verify completion, and it is tracked to closure."
   ],
   [
    "Which RCA technique groups causes into categories like people, process and technology?",
    "The fishbone, or Ishikawa, cause-and-effect diagram."
   ]
  ]
 },
 {
  "t": "Vulnerability reports: affected hosts, risk scores, mitigation, recurrence, prioritization",
  "body": [
   "Scanning produces data; a vulnerability report turns that data into something people can act on. A raw scanner export may list thousands of findings with no indication of who owns them or which matter most, and teams that receive it tend to ignore it. CySA+ expects you to know what belongs in a useful vulnerability report and how to read one: affected hosts, risk scores, mitigation, recurrence and prioritization, plus trends over time.",
   "Affected hosts identify exactly where each vulnerability exists: hostname, IP address, operating system, the port or service, the owning team and the asset's criticality. Group findings by asset or by owner so that each team receives a list it can act on, rather than a thousand-page export. Include enough evidence, such as the detected version or configuration value, for administrators to confirm the issue themselves; findings that cannot be verified breed arguments about false positives and slow everything down.",
   "Risk scores show how serious each finding is. Most reports include the CVSS (Common Vulnerability Scoring System) base score and severity, but a useful report adds context: whether the vulnerability appears in CISA's KEV (Known Exploited Vulnerabilities) catalog, its EPSS (Exploit Prediction Scoring System) probability, whether a public exploit exists, whether the host is internet-facing and how valuable the asset is. Many platforms combine these into their own risk rating. Explain which score drives the ordering, so readers are not confused when a CVSS 9.8 on an isolated lab server appears below a 7.5 on an internet-facing payment system that is being actively exploited.",
   "Mitigation guidance tells the reader what to do: the patch or version to install, the configuration change needed, or a workaround and compensating control if no fix exists yet. Reference each finding by its CVE (Common Vulnerabilities and Exposures) identifier so administrators can find the vendor advisory. Specific, actionable guidance speeds remediation; a generic line such as apply latest patches does not. Recurrence tracks vulnerabilities that come back after being fixed or appear repeatedly across scans. Recurring findings often point to a process problem rather than a technical one: a golden image that still contains an old library, a configuration management tool reverting settings, systems rebuilt from outdated templates, or patches that fail silently. Reports should also highlight aging items, those open past their remediation deadline.",
   "Prioritization ties everything together by ordering the work. A typical structure lists the few items needing immediate action (actively exploited, critical assets, internet-facing), then items due within the SLA for their severity, then lower-risk items and accepted exceptions. Remediation SLAs, such as a defined number of days for critical versus high findings, are set by policy and shown alongside each finding with its due date. Reports should also show trends over time, such as new, fixed and still-open vulnerabilities per period, since a single snapshot says little about whether the program is improving.",
   "Consider a worked example. Your monthly scan finds 4,300 vulnerabilities across 900 hosts. Rather than sending the export, you group findings by owning team. The web team's section opens with two internet-facing servers running a version of a content management plugin listed in the KEV catalog, with the exact fixed version and a due date of this week. Below that sit high findings due within the policy window, then medium items. A recurrence note shows that the same outdated compression library has reappeared on twelve newly built servers for three months running, and you trace it to the base image. Fixing the image, not the twelve servers, is your key recommendation.",
   "Common mistakes: sorting purely by CVSS base score and ignoring exploitation and exposure; sending one giant report to everyone instead of owner-specific lists; giving vague mitigation advice; treating recurring findings as individual host failures rather than signs of a process or image problem; and presenting only a snapshot with no trend. Another trap is omitting accepted exceptions entirely; they should be listed separately so everyone knows the risk is known and approved rather than forgotten.",
   "Exam questions often show a report excerpt and ask what to do first or what a pattern means. Internet-facing, actively exploited, KEV-listed or high EPSS points to the top priority even if another item has a higher base score. The same vulnerability returning on newly deployed systems points to the image or template. Findings open past their due date point to SLA or aging tracking. If a question asks what makes a report actionable, look for specific affected hosts, owners, evidence, clear remediation steps and due dates."
  ],
  "terms": [
   [
    "CVSS",
    "Common Vulnerability Scoring System, a standard for rating the technical severity of vulnerabilities."
   ],
   [
    "KEV catalog",
    "CISA's list of vulnerabilities known to be exploited in the wild."
   ],
   [
    "EPSS",
    "Exploit Prediction Scoring System, which estimates the probability that a vulnerability will be exploited."
   ],
   [
    "Recurrence",
    "A vulnerability that reappears after being fixed or repeatedly across scans."
   ],
   [
    "Aging",
    "How long a finding has been open, often compared against its remediation deadline."
   ],
   [
    "Remediation SLA",
    "A policy-defined time frame for fixing vulnerabilities of each severity."
   ]
  ],
  "example": "A security team notices that a critical remote desktop weakness keeps reappearing on laptops every few weeks despite being patched. Recurrence tracking in the vulnerability report shows it only appears after help desk reimaging. The root cause is an outdated deployment image, and updating it eliminates the recurrence across the fleet.",
  "tip": "Prioritize by context, not base score alone: exploited, exposed and critical assets come first. Recurring vulnerabilities usually indicate an image or process problem, not individual host failures.",
  "check": [
   [
    "Why might a CVSS 7.5 finding be prioritized above a CVSS 9.8 finding?",
    "The 7.5 may be actively exploited or on an internet-facing critical asset, while the 9.8 sits on an isolated, low-value system."
   ],
   [
    "A vulnerability keeps returning on newly built servers. What is the likely cause?",
    "An outdated golden image or build template that still contains the vulnerable component."
   ],
   [
    "What should mitigation guidance in a report include?",
    "The specific patch, version or configuration change, or a workaround and compensating control if no fix exists."
   ],
   [
    "Why include trends in a vulnerability report?",
    "A snapshot cannot show whether the program is improving; trends show new, fixed and open findings over time."
   ]
  ]
 },
 {
  "t": "Compliance reports, action plans, exceptions and compensating controls",
  "body": [
   "Many organizations must prove to regulators, auditors, customers or card brands that they meet specific security requirements. Compliance reporting shows current status against those requirements and what is being done about gaps. Analysts often supply the data, such as scan results and configuration evidence, and help write the reports. The exam focuses on four related ideas: the compliance report itself, action plans, exceptions and compensating controls.",
   "Compliance reports measure the environment against a framework or regulation. Examples include PCI DSS (Payment Card Industry Data Security Standard) for card data, HIPAA (Health Insurance Portability and Accountability Act) for US health information, GDPR (General Data Protection Regulation) for personal data of people in the EU, SOX (Sarbanes-Oxley Act) for financial reporting controls, and internal policies based on frameworks such as NIST or ISO/IEC 27001. A compliance report typically lists each requirement or control, whether it is met, partially met or not met, the evidence supporting that status (scan results, configuration exports, screenshots, policies) and any gaps. Compliance is not the same as security: a system can pass an audit and still be vulnerable, but compliance failures can bring fines, lost contracts and legal action.",
   "An action plan addresses the gaps. In US government contexts it is often called a plan of action and milestones (POA&M). Each item describes the weakness, the planned remediation, the resources required, the responsible owner, milestones and a target completion date, and it is updated as work progresses. Auditors look for realistic plans that are actually tracked, not lists of good intentions that never move. Many organizations review open action plan items at a regular governance meeting, so slipping dates are noticed and either resourced or escalated.",
   "Exceptions document requirements that will not be met for a period. A compliance exception explains which requirement is affected, why it cannot currently be met (a legacy system, a vendor constraint, a business need), the risk involved, the compensating controls in place, who approved it and when it expires. Exceptions must be approved by someone with authority to accept that risk and reviewed regularly; an exception with no expiry date tends to become permanent without anyone deciding it should.",
   "Compensating controls matter especially in compliance. Some standards, notably PCI DSS, formally allow them when a requirement cannot be met as written, provided the alternative meets the intent and rigor of the original requirement, goes beyond other existing requirements, and is documented and validated. For example, if a legacy system cannot support required encryption at rest, the organization might isolate it on a restricted segment, strictly limit and log access and monitor it closely. An assessor will want evidence that the compensating control actually works, not just a description of it.",
   "Consider a worked example. A retailer's annual PCI DSS assessment is approaching, and your scans show that three point-of-sale back-office servers run an operating system that cannot use the required disk encryption until a vendor upgrade next year. You mark the requirement as not met in the compliance report, with evidence. You then help draft an exception with an expiry date matching the vendor's timeline, signed by the CISO (chief information security officer), and describe compensating controls: the servers sit in a dedicated segment reachable only from two jump hosts, all access requires MFA and is logged to the SIEM, and file integrity monitoring alerts on any change. The action plan lists the upgrade with an owner, budget and milestones.",
   "Common mistakes: overstating compliance to look good (auditors test claims, and misrepresentation is serious); confusing an exception, which accepts a gap temporarily, with an action plan, which closes it; proposing a compensating control that is simply an existing required control relabeled; letting exceptions lapse without review; and assuming compliance equals being secure. Keep evidence organized and mapped to specific requirements so it can be produced quickly during an audit.",
   "Exam questions usually test which document or control fits a situation. A list of remediation tasks with owners, milestones and dates points to an action plan or POA&M. A documented, approved, time-limited agreement not to meet a requirement points to an exception. An alternative safeguard that meets the intent of a requirement that cannot be met as written points to a compensating control. Card data points to PCI DSS, US health data to HIPAA, EU personal data to GDPR and financial reporting to SOX."
  ],
  "terms": [
   [
    "Compliance report",
    "A report showing status against each requirement of a regulation or framework, with supporting evidence."
   ],
   [
    "POA&M",
    "Plan of action and milestones, a tracked plan listing weaknesses, remediation steps, owners and dates."
   ],
   [
    "Compliance exception",
    "A documented, approved and time-limited acceptance that a requirement will not be met."
   ],
   [
    "Compensating control",
    "An alternative safeguard that meets the intent of a requirement that cannot be met as written."
   ],
   [
    "PCI DSS",
    "Payment Card Industry Data Security Standard, the security standard for organizations handling payment card data."
   ],
   [
    "Evidence",
    "Artifacts such as scan results, configuration exports and policies that prove a control's status."
   ]
  ],
  "example": "A hospital cannot apply the latest patches to an infusion pump management server because the vendor has not certified them. The compliance report marks the patching control as partially met. An exception approved by the risk owner expires in six months, compensating controls restrict the server to a dedicated VLAN with application allow listing, and the action plan tracks the vendor certification and upgrade.",
  "tip": "An action plan closes a gap over time with owners and dates; an exception accepts a gap temporarily with approval and expiry; a compensating control reduces the risk of that gap. Compliance and security are related but not the same.",
  "check": [
   [
    "What must a compliance exception include?",
    "The affected requirement, the reason, the risk, compensating controls, the approver and an expiry date."
   ],
   [
    "What makes a control acceptable as a compensating control?",
    "It meets the intent and rigor of the original requirement, goes beyond existing requirements, and is documented and validated."
   ],
   [
    "What is a POA&M?",
    "A plan of action and milestones that tracks each weakness, its remediation, owner, resources and target dates."
   ],
   [
    "Can a system be compliant but still insecure?",
    "Yes, compliance shows specific requirements are met at a point in time, not that the system is free of risk."
   ]
  ]
 },
 {
  "t": "Metrics and KPIs: trends, top 10 lists, critical vulnerabilities, zero-days, SLA compliance",
  "body": [
   "Metrics tell you and your leadership whether the security program is working. A metric is any measured value, such as the number of open critical vulnerabilities. A key performance indicator (KPI) is a metric chosen because it reflects progress toward an important goal, usually with a target, such as the percentage of critical vulnerabilities fixed within the SLA. Good metrics lead to decisions; vanity metrics, such as the raw number of blocked connections, look impressive but change nothing.",
   "Trends matter more than snapshots. A report stating that there are 1,200 open vulnerabilities means little alone; showing that the number fell from 2,000 over six months while the asset count grew tells a real story. Common trend views include new versus remediated vulnerabilities per month, total open findings by severity, mean time to remediate and scan coverage (the percentage of assets actually scanned). Trend charts also show whether a change, such as a new patching tool, made a difference. Normalizing helps: vulnerabilities per asset is fairer than a raw count when the environment is growing.",
   "Top 10 lists focus attention. Examples include the ten most common vulnerabilities across the environment, the ten riskiest hosts, the teams with the most overdue findings or the applications with the most open critical issues. They help leadership and teams see where effort will have the greatest effect, because a single outdated library or missing configuration setting often accounts for a large share of findings; fixing it in the base image clears hundreds at once.",
   "Critical vulnerabilities deserve their own tracking because they carry the most risk: count of open critical findings, how long each has been open and how many sit on internet-facing or high-value assets. Pair severity with exploitation data, such as KEV catalog listings, so the metric reflects real risk. Zero-day vulnerabilities are flaws unknown to the vendor or for which no patch yet exists, sometimes already exploited in the wild. You cannot measure time to patch for them in the usual way, so reporting focuses on exposure (how many assets run the affected software), which compensating controls were applied and how quickly, and time to patch once a fix is released. Leaders frequently ask whether the organization is affected, and your asset inventory should answer that within hours.",
   "SLA compliance measures whether vulnerabilities are fixed within the time frames set by policy for each severity. It is typically shown as a percentage, such as the share of critical findings remediated within the required number of days, broken down by team or business unit. Low SLA compliance in one team shows where resources or processes need attention. Be careful with metrics that can be gamed: if teams are measured only on closing tickets, they may close findings without fixing them, so verify remediation with rescans before counting a finding as fixed.",
   "Consider a worked example. Your quarterly dashboard for leadership shows open critical findings falling from 85 to 30, but SLA compliance for criticals at only 70 percent, with most misses in one business unit. The top 10 list reveals that four of the ten most common findings come from one legacy Java runtime. A zero-day in a file transfer product was announced during the quarter; you report that 6 servers were exposed, a firewall restriction was applied to all of them within one day and the vendor patch was installed three days after release. The leadership ask is clear: fund the Java runtime replacement and add staff to the lagging unit.",
   "Common mistakes: reporting raw counts with no trend or normalization; ranking purely by volume and ignoring severity and exposure; measuring zero-days by time to patch before a patch exists; trusting ticket closure instead of rescans; and choosing metrics nobody acts on. Another trap is a single enterprise-wide SLA percentage that hides one team's serious backlog; break metrics down by owner.",
   "Exam questions typically ask which metric answers a question. Is the program improving over time points to trends. Where should we focus effort first points to a top 10 list. Are teams fixing findings on schedule points to SLA compliance. Are we exposed to a newly announced flaw with no patch points to zero-day exposure reporting and compensating controls. A measure tied to a goal with a target is a KPI, and a number that looks good but drives no decision is a vanity metric."
  ],
  "terms": [
   [
    "Metric",
    "Any measured value describing some aspect of security, such as open findings."
   ],
   [
    "Key performance indicator (KPI)",
    "A metric tied to an important goal, usually with a target, used to judge progress."
   ],
   [
    "Trend",
    "The direction of a metric over time, which shows improvement or decline."
   ],
   [
    "Top 10 list",
    "A ranked list, such as most common vulnerabilities or riskiest hosts, used to focus remediation."
   ],
   [
    "Zero-day vulnerability",
    "A flaw unknown to the vendor or without an available patch, possibly already exploited."
   ],
   [
    "SLA compliance",
    "The percentage of findings remediated within the policy-defined time frame for their severity."
   ],
   [
    "Scan coverage",
    "The percentage of known assets that are actually being scanned."
   ]
  ],
  "example": "A CISO asks whether investment in automated patching paid off. The analyst shows a six-month trend: mean time to remediate critical findings fell from 40 days to 12, SLA compliance for criticals rose from 55 to 92 percent, and scan coverage stayed near 98 percent, confirming that improvement was not caused by scanning fewer systems.",
  "tip": "Trends show direction, top 10 lists show where to focus, SLA compliance shows whether deadlines are met, and zero-day reporting focuses on exposure and compensating controls because no patch exists yet.",
  "check": [
   [
    "What distinguishes a KPI from an ordinary metric?",
    "A KPI is tied to an important goal and usually has a target that shows progress toward it."
   ],
   [
    "How should zero-day vulnerabilities be reported before a patch exists?",
    "By exposure (affected assets), the compensating controls applied and how quickly, then time to patch once a fix is released."
   ],
   [
    "Why verify remediation with rescans before counting SLA compliance?",
    "Teams measured on closing tickets might close findings without fixing them; rescans confirm the fix."
   ],
   [
    "Which metric type best shows leadership where to focus remediation effort?",
    "A top 10 list, such as the most common vulnerabilities or riskiest hosts."
   ]
  ]
 },
 {
  "t": "Stakeholder identification and communication: technical teams, system owners, executives",
  "body": [
   "Security findings only matter if they reach the people who can act on them, in a form they understand. A large part of an analyst's work is communication, and CySA+ tests whether you can identify stakeholders and tailor your message to each. The same vulnerability can be described as a CVE number and a registry value to an administrator, as a risk to online sales to a business owner and as one line in a risk summary to an executive.",
   "A stakeholder is anyone who has an interest in, is affected by or can influence a security issue. Identify them before you need them: for each critical system, know who operates it, who owns it from a business standpoint, who must be told when something goes wrong and who can approve changes. The asset inventory or CMDB (configuration management database) should record owners, and the IR plan should list contacts. A simple tool is a RACI chart, which shows who is responsible (does the work), accountable (owns the outcome and signs off), consulted (gives input) and informed (kept updated) for each activity.",
   "Technical teams, such as system administrators, network engineers, developers and database administrators, perform remediation. They need detail: affected hostnames and IP addresses, CVE numbers, evidence, exact versions or configuration settings, the recommended fix, deadlines and how you will verify the result. Deliver findings in their tools where possible, for example as tickets in their queue grouped by system. Be precise and avoid exaggeration; credibility with technical teams depends on accurate findings, so validate before you send.",
   "System owners, also called business or data owners, are accountable for a system and its risk even if they do not administer it. They decide remediation timing, approve downtime and accept risk when necessary. They need the business impact of a vulnerability or incident, the options available, the cost and disruption of each and what happens if they do nothing. Frame it around their operations, such as the chance that the online store goes offline, rather than protocol details. Executives and senior management need a concise, high-level view: overall risk posture, trends, major incidents, business impact, costs and the decisions or resources required from them. Use plain language, a few clear charts and specific asks; a good executive message answers what is the risk, what does it mean for the business, what are we doing and what do we need from you.",
   "Some practices apply to every audience: know your audience before writing; lead with the most important point; separate facts from assumptions; keep sensitive details on a need-to-know basis; use agreed channels and classification markings; and follow up to confirm the message was understood and action taken. Regular, predictable communication, such as a monthly vulnerability review with system owners, builds trust and reduces friction when urgent issues arise.",
   "Consider a worked example. A critical vulnerability is announced in the load balancers that front your e-commerce site. For the network team, you open a ticket listing the four affected devices, their firmware versions, the fixed version, the vendor's recommended mitigation and a 48-hour deadline. For the e-commerce system owner, you explain that attackers are actively exploiting the flaw, that patching needs a 30-minute failover window, and that the alternative is a temporary configuration workaround with slight performance cost; you ask them to choose and approve a window. For the executive team, you send three sentences: the risk, the plan with its date and the fact that no decision is needed from them unless the window slips.",
   "Common mistakes: sending the full technical scan export to executives; giving administrators vague requests without evidence; letting the analyst decide to accept risk that belongs to the system owner; confusing the accountable role (owns the outcome) with the responsible role (does the work) in a RACI chart; and sharing sensitive vulnerability details too widely. Another trap is communicating only when things go wrong, which makes every message feel like a crisis.",
   "Exam questions usually ask who should receive what or which format fits. Detailed remediation steps, hostnames and CVEs go to technical teams. Business impact, options and a request to approve downtime or accept risk go to the system owner. A brief summary of risk posture, trends and decisions needed goes to executives. If a question asks who can accept a risk, the answer is the system or business owner, not the analyst. If it describes responsible, accountable, consulted and informed roles, the tool is a RACI chart."
  ],
  "terms": [
   [
    "Stakeholder",
    "Anyone with an interest in, affected by or able to influence a security issue."
   ],
   [
    "System owner",
    "The business person accountable for a system and its risk, who approves changes and risk acceptance."
   ],
   [
    "RACI chart",
    "A matrix showing who is responsible, accountable, consulted and informed for each activity."
   ],
   [
    "CMDB",
    "Configuration management database, which records assets, their configurations and owners."
   ],
   [
    "Executive summary",
    "A brief, non-technical overview of risk, impact, actions and decisions needed."
   ],
   [
    "Need to know",
    "The principle of sharing sensitive information only with those who require it for their role."
   ]
  ],
  "example": "An analyst's monthly vulnerability report goes out in three forms: tickets with host-level detail in each engineering team's queue, a one-page risk summary per business unit showing overdue items and pending risk decisions for system owners, and a single slide for the executive committee showing the overall trend and one funding request to replace unsupported servers.",
  "tip": "Match detail to audience: technical teams get specifics, system owners get business impact and options, executives get a brief summary of risk and decisions. The system owner, not the analyst, accepts risk.",
  "check": [
   [
    "What information does a system administrator need to remediate a finding?",
    "Affected hosts, CVE or finding details, evidence, the specific fix, a deadline and how verification will be done."
   ],
   [
    "Who approves downtime and accepts residual risk for a business application?",
    "The system or business owner accountable for that application."
   ],
   [
    "In a RACI chart, what is the difference between responsible and accountable?",
    "Responsible does the work; accountable owns the outcome and signs off, and there is usually one accountable person."
   ],
   [
    "What should an executive security briefing focus on?",
    "Overall risk, business impact, trends, what is being done and the decisions or resources needed from executives."
   ]
  ]
 },
 {
  "t": "Incident response communication: legal, HR, public relations, regulators, law enforcement, customers",
  "body": [
   "During a serious incident, what the organization says, to whom and when can matter as much as the technical response. Poorly handled communication can create legal liability, alert the attacker, damage reputation or breach notification laws. The IR plan should define who communicates with each group, and most external communication should go through designated people, not individual analysts. CySA+ expects you to know the role of each party: legal, HR, public relations, regulators, law enforcement and customers.",
   "Legal counsel should be involved early in significant incidents. Lawyers assess notification obligations under breach, privacy and contract terms; advise on evidence preservation and legal holds; review public statements; coordinate with regulators and law enforcement; and manage litigation risk. In some jurisdictions, involving counsel can help protect certain investigation materials under legal privilege, which is why outside forensic firms are sometimes engaged through the legal team. Human resources (HR) becomes involved when employees are part of the incident, most obviously in insider threat cases, but also when staff personal data is exposed or discipline may follow. HR makes sure actions follow employment law, policy and any union agreements, and coordinates interviews and account terminations with security so the suspect is not tipped off and evidence is not lost.",
   "Public relations (PR) or corporate communications manages messaging to the media and the public. Consistent, accurate and timely statements protect reputation; speculation and contradictory messages damage it. Employees should be told to direct media questions to PR and to avoid discussing the incident on social media. PR works with legal so statements do not admit liability prematurely or disclose details that could help attackers.",
   "Regulators must be notified when laws or industry rules require it, such as data protection authorities, sector regulators or financial regulators. Many regulations set specific notification deadlines and content requirements, and the clock may start when the organization becomes aware of a breach, so knowing your obligations in advance is part of preparation. Legal and compliance teams usually own these notifications. Law enforcement may be contacted for criminal activity such as extortion, fraud or data theft. Involvement can help with investigation, attribution and sometimes recovery of funds, but it can also bring evidence preservation requirements and affect the timeline. The decision is normally made by management with legal advice, and evidence must be handled with proper chain of custody.",
   "Customers and other affected parties, such as partners or suppliers, may need to know what happened, what data was involved, what the organization is doing and what they should do, for example reset passwords or watch for fraud. Notifications should be clear, honest and timely, and they may be legally or contractually required. Throughout the incident, limit the spread of sensitive details internally on a need-to-know basis, and use out-of-band channels if normal systems may be compromised.",
   "Consider a worked example. Your investigation confirms that an attacker exfiltrated a database containing customer names and email addresses. You brief the incident manager, who brings in legal counsel. Legal determines which data protection authorities must be notified and by when, and engages an outside forensic firm under its direction. PR drafts a holding statement, reviewed by legal, in case the media calls. Because the attacker is demanding payment, management, advised by legal, contacts law enforcement. Customer notification emails explain what data was taken, that passwords were not affected, and how to spot phishing that uses the stolen addresses. HR is not needed until evidence suggests an employee's credentials were sold, at which point HR joins to handle that employee's interview.",
   "Common mistakes: an analyst replying to a journalist or posting on social media; notifying a regulator without legal review; confronting a suspected insider without HR and legal; discussing the incident over the compromised email system; and delaying customer notification in the hope the problem stays hidden. Another trap is assuming law enforcement involvement is automatic; it is a management decision with legal advice.",
   "Exam questions usually give a situation and ask who should be involved or who communicates. A reporter calling the SOC points to PR. Determining whether breach notification is required, or reviewing a statement, points to legal. An employee suspected of stealing data points to HR together with legal. Extortion, fraud or a crime points to law enforcement, decided by management. Statutory notification deadlines point to regulators, handled through legal and compliance. Telling affected people what to do next points to customer notification."
  ],
  "terms": [
   [
    "Legal counsel",
    "Lawyers who assess notification duties, preserve evidence, review statements and manage liability during incidents."
   ],
   [
    "Legal privilege",
    "Protection that can keep certain communications and work done at counsel's direction from disclosure."
   ],
   [
    "Public relations (PR)",
    "The function that manages external messaging to the media and public."
   ],
   [
    "Breach notification",
    "Legally or contractually required notice to regulators or individuals after certain data is exposed."
   ],
   [
    "Regulator",
    "A government or industry body that oversees compliance and may require incident notification."
   ],
   [
    "Holding statement",
    "A brief, pre-approved public statement used while facts are still being established."
   ]
  ],
  "example": "A hospital discovers that patient records were accessed by an unauthorized party. Legal counsel determines the regulatory notification requirements and deadlines, PR prepares a statement for local media, the compliance team notifies the relevant health regulator, and patients receive letters describing the exposed data and the free identity monitoring being offered. Analysts are instructed to refer all outside inquiries to PR.",
  "tip": "Analysts do not talk to the media or notify regulators on their own; those go through PR and legal. Insider cases require HR and legal. Law enforcement involvement is a management decision with legal advice.",
  "check": [
   [
    "A journalist calls an analyst asking about a breach. What should the analyst do?",
    "Decline to comment and refer the journalist to PR or corporate communications."
   ],
   [
    "Why involve HR in an insider threat investigation?",
    "To ensure actions follow employment law and policy and to coordinate interviews and terminations without tipping off the suspect."
   ],
   [
    "Who typically decides whether breach notification to a regulator is required?",
    "Legal counsel, working with compliance, based on applicable laws and contracts."
   ],
   [
    "What is a risk of involving law enforcement?",
    "It may add evidence preservation requirements and affect the response timeline and publicity, so management decides with legal advice."
   ]
  ]
 },
 {
  "t": "Incident declaration and escalation paths",
  "body": [
   "Not every alert is an incident. Declaring an incident is a formal decision that activates the incident response plan: it assigns an incident manager, mobilizes resources, starts formal documentation and triggers communication duties. Declaring too late wastes precious time while the attacker works; declaring for everything wears people out and dilutes attention. Clear criteria and escalation paths help analysts make the call quickly and confidently.",
   "Start with definitions. An event is any observable occurrence in a system or network, such as a login or a file download. An adverse event has negative consequences, such as a system crash or an unauthorized access attempt. A security incident is a violation or imminent threat of violation of security policies, acceptable use policies or standard security practices. The IR plan turns these definitions into practical declaration criteria, for example confirmed malware execution, confirmed unauthorized access to sensitive data, compromise of a privileged account or ransomware activity.",
   "Severity or priority levels determine how the incident is handled. A plan might define four levels, each with examples, a required response time, who must be notified and whether round-the-clock work is needed. Factors include functional impact, information impact (especially regulated or sensitive data), recoverability, the number of systems or users affected and whether the threat is ongoing. Severity can change as more is learned, so reassess it as the investigation progresses and record each change with the reason.",
   "An escalation path defines who is contacted, in what order and within what time frame as severity rises. A typical SOC has tiers: tier 1 analysts triage alerts and handle routine cases; tier 2 analysts perform deeper investigation; tier 3 responders and threat hunters handle complex cases. Functional escalation moves an issue to someone with more expertise or different skills, while hierarchical escalation moves it up the management chain for decisions and authority. High-severity incidents typically escalate to the incident manager, the security leader such as the CISO (chief information security officer), and then to legal, executive leadership and sometimes the board.",
   "Escalation paths should specify conditions as well as contacts: escalate if personal or payment data is involved, if a critical system is down beyond a set time, if an executive's account is compromised, or if the incident cannot be contained within a set window. They should name backups for each role in case someone is unavailable, list contact methods including out-of-band options and provide 24-hour coverage. Also plan escalation to outside parties: managed security service providers, cyber insurance carriers (many policies require prompt notice and use of approved vendors), outside counsel and incident response retainers.",
   "Consider a worked example. At 02:10 a tier 1 analyst sees an EDR alert for encoded PowerShell on a single workstation and opens a ticket. Within twenty minutes the analyst finds the same activity on a second workstation and signs of a domain administrator logon from it. That meets the plan's declaration criteria for privileged account compromise, so the analyst escalates functionally to the on-call tier 3 responder and, per the plan, the incident is declared at severity high. When the responder confirms data staging on a file server holding customer records, severity rises to critical and the path triggers hierarchical escalation: incident manager, CISO, legal counsel and the insurer's hotline. Every declaration and escalation is logged with time, person and reason.",
   "Common mistakes: waiting for complete certainty before escalating; confusing functional escalation (to expertise) with hierarchical escalation (to authority); failing to raise severity when regulated data or privileged accounts appear; having no backup contact when the primary is unavailable; and forgetting to notify the insurer early, which can affect coverage. When in doubt, escalate: it is better to involve a senior responder in a false alarm than to let a real incident grow because a junior analyst hesitated. Record when the incident was declared, by whom and why, since that time can matter for regulatory notification deadlines.",
   "Exam questions usually test definitions and direction of escalation. Any observable occurrence is an event; a policy violation or imminent threat of one is an incident. Handing a case to a more skilled analyst or a specialist team is functional escalation; involving managers or executives for decisions is hierarchical escalation. Regulated data, privileged accounts, critical systems or failure to contain within a set time are the clue words that raise severity and trigger escalation. If a scenario asks why the declaration time matters, the answer is notification deadlines and accurate records."
  ],
  "terms": [
   [
    "Event",
    "Any observable occurrence in a system or network."
   ],
   [
    "Adverse event",
    "An event with negative consequences, such as a crash or unauthorized access attempt."
   ],
   [
    "Security incident",
    "A violation or imminent threat of violation of security policies or standard practices."
   ],
   [
    "Incident declaration",
    "The formal decision that an incident exists, activating the IR plan."
   ],
   [
    "Functional escalation",
    "Moving an issue to someone with greater expertise or different skills."
   ],
   [
    "Hierarchical escalation",
    "Moving an issue up the management chain for decisions and authority."
   ],
   [
    "Escalation path",
    "A predefined sequence of contacts, conditions and time frames for raising an incident's handling level."
   ]
  ],
  "example": "A tier 1 analyst sees an alert for impossible travel on the CFO's account. The playbook says any suspected executive account compromise is escalated immediately, so the analyst hands it to tier 2 and pages the incident manager. Tier 2 confirms a malicious inbox rule forwarding invoices, the incident is declared at high severity, and legal is notified because financial records may be involved.",
  "tip": "Know event versus incident, and functional (to expertise) versus hierarchical (to management) escalation. Regulated data or privileged accounts usually raise severity and trigger escalation. When in doubt, escalate.",
  "check": [
   [
    "What is the difference between an event and an incident?",
    "An event is any observable occurrence; an incident is a violation or imminent threat of violation of security policy."
   ],
   [
    "A tier 1 analyst passes a complex malware case to a reverse engineering specialist. What type of escalation is this?",
    "Functional escalation, because it moves the case to greater expertise."
   ],
   [
    "Why should the time of incident declaration be documented?",
    "It can start regulatory notification deadlines and is needed for accurate records and metrics."
   ],
   [
    "Name two conditions that commonly trigger escalation.",
    "Examples include regulated or personal data involvement, privileged or executive account compromise, critical system outage or failure to contain in time."
   ]
  ]
 },
 {
  "t": "Incident reports: executive summary, who/what/when/where/why, timeline, impact, scope, evidence, recommendations",
  "body": [
   "An incident report is the official record of what happened and how the organization responded. It informs leadership, supports legal and regulatory needs, feeds lessons learned and becomes a reference for future incidents. It may be read by executives, auditors, lawyers, regulators and insurers, each looking for different things, so structure and accuracy matter. CySA+ expects you to know the standard sections and what goes in each.",
   "The executive summary comes first and is written for leaders who may read nothing else. In a few paragraphs it states what happened, when it was discovered, the business impact, whether the incident is contained or resolved, the root cause at a high level and the key recommendations or decisions needed. Avoid jargon and technical detail. Write it last, after the rest of the report is complete, so it accurately reflects the findings rather than early assumptions. A useful test is whether a busy executive could make the needed decision after reading only this section.",
   "The body answers the classic questions. Who: the affected users, systems and business units, the responders, and the threat actor if known, with a stated confidence level and no speculative attribution. What: the type of incident, the attacker's actions and the systems or data involved. When: the times of initial compromise, detection, containment, eradication and recovery, with time zones stated. Where: the locations, networks, hosts and cloud environments involved. Why: the root cause and contributing factors, meaning how the attacker got in and why controls did not stop them. How: the techniques used, often mapped to MITRE ATT&CK.",
   "The timeline lists events in chronological order with precise timestamps and sources, from the earliest attacker activity through response actions and closure. Distinguish attacker activity from responder actions, and normalize all times to one zone, commonly UTC (Coordinated Universal Time). Timelines built from correlated logs, EDR data and forensic artifacts are often the most valuable part of the report, and they are why consistent time synchronization across systems matters during preparation.",
   "Impact describes the effect on the organization: systems or services disrupted and for how long, data exposed or altered, number of records or individuals affected, financial costs, regulatory implications and reputational effects. Scope describes the extent: which and how many hosts, accounts, networks and data sets were involved, and equally important, what was investigated and found unaffected. The evidence section summarizes what was collected and where it is stored, including hashes, chain of custody references, logs, images and screenshots supporting each conclusion; detailed artifacts and IoC lists often go in appendices. Recommendations close the report: specific, prioritized actions to prevent recurrence and improve response, each with a suggested owner.",
   "Consider a worked example. You are writing the report for a compromised VPN account. The executive summary says that an attacker used a stolen password to access the network for six hours, reached two file servers, copied engineering drawings but no customer data, and was contained the same day; MFA on the VPN is the main recommendation. The timeline starts with a password spray against the VPN at 03:12 UTC, then the successful logon at 03:40, lateral movement at 04:05, the SIEM alert at 08:55, account disablement at 09:20 and server isolation at 09:35. Scope lists the two servers and one account affected and notes that the domain controllers were examined and found clean. Evidence references the memory images and their hashes in appendix B.",
   "Common mistakes: writing the executive summary first and never revising it; filling it with technical detail; mixing time zones in the timeline; stating attribution as fact without evidence; describing what was affected but not what was checked and found clean; blaming individuals; and giving vague recommendations such as improve security. Separate confirmed facts from assumptions throughout, and use neutral language, because the report may be read by lawyers, regulators and auditors.",
   "Exam questions often ask which section contains something or which part suits a given reader. A short, non-technical overview for leadership is the executive summary. Chronological events with timestamps is the timeline. Systems and data affected, and what was ruled out, is scope; business, financial and data effects is impact. Hashes, logs and chain of custody references are the evidence section. Specific actions with owners are recommendations. If asked when to write the executive summary, the answer is last."
  ],
  "terms": [
   [
    "Incident report",
    "The official record of an incident, its handling, impact and recommendations."
   ],
   [
    "Executive summary",
    "A brief, non-technical overview for leadership, written last."
   ],
   [
    "Timeline",
    "A chronological list of attacker and responder actions with timestamps and sources."
   ],
   [
    "Impact",
    "The effect of an incident on operations, data, finances, compliance and reputation."
   ],
   [
    "Scope",
    "The extent of an incident, including what was affected and what was confirmed unaffected."
   ],
   [
    "Recommendation",
    "A specific, prioritized action with an owner to prevent recurrence or improve response."
   ],
   [
    "UTC",
    "Coordinated Universal Time, a common reference time zone for normalizing timelines."
   ]
  ],
  "example": "A regulator asks a bank for its incident report after a card data exposure. Because the report clearly separates confirmed facts from assumptions, states scope including the systems ruled out, provides a UTC timeline tied to log sources and references hashed evidence with chain of custody, the regulator's questions are answered quickly and the bank avoids a lengthy follow-up review.",
  "tip": "The executive summary is for non-technical leaders and is written last. Timelines use one consistent time zone, scope includes what was ruled out, and recommendations must be specific with owners.",
  "check": [
   [
    "Why is the executive summary written last?",
    "So it reflects the final, verified findings of the full report rather than early assumptions."
   ],
   [
    "What should a timeline distinguish?",
    "Attacker actions from responder actions, with precise timestamps, sources and a consistent time zone."
   ],
   [
    "Why should scope include systems found unaffected?",
    "It shows what was investigated and ruled out, preventing misunderstanding about the incident's extent."
   ],
   [
    "Give an example of an actionable recommendation.",
    "Enforce MFA on the VPN within 30 days, owned by the network team, rather than a vague call to improve security."
   ]
  ]
 },
 {
  "t": "Root cause analysis and lessons learned feeding back into reporting",
  "body": [
   "Reporting is not just a record of the past; it is how an organization learns. Root cause analysis (RCA) and lessons learned produce insights, and good reporting carries those insights into decisions, metrics and future reports so that improvement is visible and measurable. The exam expects you to recognize answers that close this loop rather than simply documenting what happened.",
   "Root cause analysis looks past symptoms to the underlying reasons for an incident or a recurring vulnerability. The five whys technique asks why until you reach a cause you can fix. For example: a server was compromised because it was unpatched; it was unpatched because it was missing from the patch tool; it was missing because it was built outside the standard process; it was built outside the process because an urgent project skipped the build checklist; and that was possible because there was no enforced gate in provisioning. The last answer is the root cause. Fishbone (Ishikawa) diagrams organize contributing factors into categories such as people, process, technology and environment, which helps teams see that incidents usually have several causes.",
   "Lessons learned sessions capture what went well and what did not across people, process and technology. The output is a list of corrective and preventive actions, each with an owner, a due date and a way to verify completion. Corrective actions fix the specific problem found; preventive actions stop similar problems elsewhere. The same approach applies to vulnerability management: reviews can examine why certain findings keep recurring or why SLAs are missed.",
   "Feeding back into reporting means several things. First, the incident or vulnerability report should include the root cause and the resulting actions, not just a description of events. Second, the actions should be tracked in subsequent reports, such as a monthly security report section showing open lessons learned items and their status, so leadership can see whether promised changes happened. Third, metrics should be added or adjusted to measure the issue the RCA exposed; if an incident revealed slow detection of cloud misconfigurations, start reporting how many are found and how quickly they are fixed.",
   "Feedback also improves the reports themselves. If readers found a report confusing, if executives lacked the information needed to make a decision, or if the timeline was hard to build because logging was inconsistent, change the templates and data sources. Many teams update report templates, playbooks and dashboards as a standard lessons learned action. Over time this creates a loop: incidents and findings are analyzed, root causes are fixed, improvements are measured and reported, and reporting points to the next area to improve. Trends such as fewer repeat incidents of the same type, or reduced recurrence of the same vulnerability, show that lessons are being learned rather than simply written down.",
   "Consider a worked example. Three incidents in a year involved attackers using old accounts of former contractors. RCA shows the root cause is that the contractor offboarding process relies on managers emailing IT, with no automated link to the contract end date. Actions are assigned: HR and IT integrate contract end dates with account expiry, and security adds a weekly report of enabled accounts with no logon in 60 days. The monthly security report gains a new metric, dormant accounts disabled within policy, plus a status table for the actions. Six months later the report shows dormant accounts falling steadily and no further incidents of this type, which leadership can see directly.",
   "Common mistakes: writing lessons learned documents that nobody reads again; stopping RCA at a person's error; listing actions without owners, dates or verification; failing to add a metric that shows whether the fix worked; and never revisiting report templates even when readers struggle with them. Another trap is measuring only activity, such as the number of lessons learned meetings held, instead of outcomes, such as reduced recurrence.",
   "Exam questions often present several options after an incident and ask which best prevents recurrence or demonstrates improvement. Prefer answers that assign and track actions, update playbooks and templates, and add metrics or trend reporting that show results. Asking why repeatedly signals the five whys; categories of causes signal a fishbone diagram. A question describing the same incident happening again points to incomplete RCA or actions that were never tracked to completion."
  ],
  "terms": [
   [
    "Root cause",
    "The fundamental, fixable reason an incident or recurring problem occurred."
   ],
   [
    "Five whys",
    "An RCA technique of repeatedly asking why until reaching the underlying cause."
   ],
   [
    "Ishikawa diagram",
    "Another name for a fishbone cause-and-effect diagram that groups contributing factors."
   ],
   [
    "Corrective action",
    "A change that fixes the specific problem identified by analysis."
   ],
   [
    "Preventive action",
    "A change that stops similar problems from arising elsewhere."
   ],
   [
    "Feedback loop",
    "The cycle in which findings drive changes that are then measured and reported."
   ]
  ],
  "example": "After repeated phishing-led compromises, RCA finds that users could not easily report suspicious emails, so reports arrived hours late. The team adds a report button, a playbook for automated triage of reported messages and a new metric, median time from first report to mailbox purge. The quarterly report shows that time dropping from hours to minutes, demonstrating the fix worked.",
  "tip": "Lessons learned only count when actions are assigned, tracked and reflected in later reports and metrics. Choose answers that close the loop over answers that only document.",
  "check": [
   [
    "What is the purpose of the five whys technique?",
    "To move past symptoms by repeatedly asking why until a fixable underlying cause is found."
   ],
   [
    "How can reporting show that a lessons learned action worked?",
    "By tracking the action's status and adding a metric or trend that shows the targeted problem decreasing."
   ],
   [
    "What is the difference between corrective and preventive actions?",
    "Corrective actions fix the specific problem found; preventive actions stop similar problems elsewhere."
   ],
   [
    "The same type of incident recurs a year later. What likely went wrong?",
    "The root cause was not fully identified or the corrective actions were not tracked to completion."
   ]
  ]
 },
 {
  "t": "Response metrics: mean time to detect, respond and remediate; alert volume",
  "body": [
   "Response metrics measure how quickly and effectively a security operation finds and handles threats. Speed matters because the longer an attacker operates undetected, the more damage they can do. These metrics help justify investment, find bottlenecks and show improvement over time, and CySA+ expects you to know what each measures and how it can mislead.",
   "Mean time to detect (MTTD) is the average time between when an incident actually starts, such as the first malicious activity, and when the organization detects it. It is often the longest interval, sometimes days or months for stealthy attacks. Improving MTTD depends on logging coverage, detection rules, threat hunting and analyst capacity. The start time is often known only after investigation, so MTTD is usually calculated after incidents close.",
   "Mean time to respond (MTTR) usually measures the average time from detection to the start of response or to containment. Some organizations split it into mean time to acknowledge (how quickly an analyst picks up an alert) and mean time to contain. Mean time to remediate, also abbreviated MTTR, measures the time from detection or discovery to full resolution, for incidents or for vulnerabilities (from detection to verified fix). Because the same abbreviation is used for different things, and in IT operations it can also mean mean time to repair or recover, reports should always define each metric precisely.",
   "Averages can mislead. One incident that took 90 days can distort a mean, so many teams also report the median and percentiles, and segment metrics by severity or incident type. A fast response time for low-severity phishing tickets should not hide a slow response to critical incidents. Always pair time metrics with quality measures, since closing incidents quickly but incorrectly is not an improvement; reopened incidents and missed findings are signs that speed is being bought with accuracy.",
   "Alert volume is the number of alerts generated over a period, often broken down by source, rule and severity. It shows analyst workload and helps with staffing. More useful than raw volume are ratios: the true positive rate (share of alerts that were real), the false positive rate, alerts per analyst per shift and the percentage of alerts escalated to incidents. A rule that fires hundreds of times a day with no true positives is a candidate for tuning or retirement. Rising volume without more staff or automation leads to alert fatigue and slower response. Related measures include dwell time (how long an attacker was present before detection; some organizations measure until eradication instead), the share of incidents detected internally versus reported by outsiders, and automation rate (alerts handled by SOAR without manual work).",
   "Consider a worked example. Your quarterly SOC report shows MTTD of 11 days, mean time to contain of 6 hours and 14,000 alerts per week with a 3 percent true positive rate. Digging in, you find one data loss prevention rule produces 6,000 of those alerts with almost no true positives, and analysts spend so much time on it that the median time to acknowledge critical alerts has crept to 50 minutes. You tune the rule, add a SOAR playbook that auto-closes known benign patterns, and fund a threat hunting program aimed at detection gaps. Next quarter alert volume falls by half, the true positive rate doubles, the critical acknowledgment median drops to 12 minutes and MTTD falls to 7 days.",
   "Common mistakes: assuming MTTR always means the same thing; reporting only means and hiding outliers; celebrating falling alert volume without checking whether detections were simply turned off; ignoring quality measures; and presenting numbers without trends or the actions that changed them. Another trap is confusing MTTD, which starts at the attacker's first activity, with time to acknowledge, which starts when the alert fires.",
   "Exam questions usually give a scenario and ask which metric improves or what a pattern means. Better logging, new detection content or threat hunting lowers MTTD. SOAR playbooks and clearer escalation lower response and containment times. High alert volume with a low true positive rate signals a need for tuning and points to alert fatigue. If a question notes that MTTR is ambiguous, the answer is to define it in the report. Long attacker presence before discovery is dwell time."
  ],
  "terms": [
   [
    "Mean time to detect (MTTD)",
    "The average time from the start of malicious activity to its detection."
   ],
   [
    "Mean time to respond (MTTR)",
    "The average time from detection to the start of response or to containment."
   ],
   [
    "Mean time to remediate",
    "The average time from detection or discovery to full, verified resolution."
   ],
   [
    "Alert volume",
    "The number of alerts generated in a period, often split by source, rule and severity."
   ],
   [
    "True positive rate",
    "The share of alerts that turn out to reflect real malicious activity."
   ],
   [
    "Dwell time",
    "How long an attacker remains in an environment before being detected."
   ],
   [
    "Alert fatigue",
    "Reduced analyst effectiveness caused by overwhelming numbers of low-value alerts."
   ]
  ],
  "example": "A managed security provider reports a mean time to respond of 20 minutes, but the customer's median for critical incidents is two hours. Segmenting by severity shows the fast average comes from thousands of automatically closed low-severity alerts. The customer renegotiates the contract to include a separate response time commitment for critical incidents, measured by median and 90th percentile.",
  "tip": "MTTD measures detection speed from the attacker's first activity; MTTR measures response or remediation speed and must be defined because the acronym is ambiguous. High alert volume with a low true positive rate signals tuning is needed.",
  "check": [
   [
    "What interval does MTTD measure?",
    "The time from when malicious activity actually began to when the organization detected it."
   ],
   [
    "Why must reports define MTTR?",
    "It can mean mean time to respond, remediate, repair or recover, so readers may interpret it differently."
   ],
   [
    "A rule generates thousands of alerts with almost no true positives. What should be done?",
    "Tune or retire the rule, since it adds workload and causes alert fatigue without improving detection."
   ],
   [
    "Why report medians or percentiles alongside means?",
    "A few extreme incidents can distort a mean, hiding typical performance or slow critical cases."
   ]
  ]
 }
], { reviewed: "2026-09-30" });
