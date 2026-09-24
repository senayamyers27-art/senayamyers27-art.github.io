/* ISC2 Certified in Cybersecurity (CC), outline effective Sept 1, 2026. Generated plan (no hand-written weeks). */
CertHub.register({
  id: "isc2-cc",
  vendor: "ISC2",
  name: "ISC2 Certified in Cybersecurity",
  short: "CC",
  exam: "2026 outline",
  blurb: "Entry-level ISC2 certification: security principles, governance, identity and access, networking and cloud, and security operations with incident response.",
  status: "verified",
  statusNote: "Weights confirmed against ISC2's updated CC outline (effective Sept 1, 2026) on Sept 24, 2026. Official weights 24 / 17.3 / 20 / 21.3 / 17.3%, rounded here to whole percents.",
  lastVerified: "2026-09-24",
  notices: [{"from": "2026-09-24", "until": "2026-12-31", "text": "ISC2 updated the CC exam outline on Sept 1, 2026. This plan follows the new five domains."}],
  examInfo: { questions: "100–125 (CAT)", minutes: 120, pass: "700 out of 1000" },
  examSim: { questions: 100, minutes: 120 },
  sources: [
    { label: "ISC2 CC certification exam outline", url: "https://www.isc2.org/certifications/cc/cc-certification-exam-outline" },
    { label: "ISC2: Inside the updated CC exam (Aug 2026)", url: "https://www.isc2.org/Insights/2026/08/inside-the-updated-isc2-cc-exam" }
  ],
  planWeeks: 8,
  domains: [
    {
      id: 1,
      name: "Security principles",
      w: 24,
      topics: [
        "Cybersecurity concepts: confidentiality, integrity, availability",
        "Authentication, authorization and accounting (AAA), non-repudiation, privacy",
        "Authentication factors and multi-factor authentication",
        "Risk terms: asset, threat, vulnerability, likelihood, impact",
        "Risk assessment (qualitative vs quantitative) and treatment: avoid, mitigate, transfer, accept",
        "Security controls: administrative, technical, physical; preventive, detective, corrective, deterrent",
        "ISC2 Code of Ethics: preamble and four canons",
        "CIA applied to AI systems: data poisoning, transparency and bias"
      ],
      notes: ["Outline Domain 1 (Sept 2026)", "ISC2 Code of Ethics"],
      labs: [
        "Pick three apps you use daily and write one sentence each on how confidentiality, integrity and availability apply to them.",
        "Hash a text file with sha256sum (Linux/macOS) or Get-FileHash (Windows), change one character, hash again and note the difference.",
        "Build a five-row risk register in a free spreadsheet: asset, threat, vulnerability, likelihood, impact, treatment."
      ]
    },
    {
      id: 2,
      name: "Security governance",
      w: 17,
      topics: [
        "Governance, risk and compliance (GRC) and the role of leadership",
        "Policies, standards, procedures, baselines and guidelines",
        "Laws, regulations and contractual requirements (e.g. GDPR, HIPAA, PCI DSS)",
        "Risk appetite, risk tolerance and ownership of risk",
        "Third-party and vendor risk",
        "Security awareness training and cybersecurity culture",
        "Measuring the program: metrics, key risk indicators (KRIs), dashboards and reports"
      ],
      notes: ["Outline Domain 2 (Sept 2026)"],
      labs: [
        "Download a free SANS policy template (e.g. Acceptable Use) and mark which lines are policy, standard or procedure.",
        "Draft a one-page security dashboard for a small business with three metrics and two KRIs.",
        "Take a free phishing quiz (e.g. Google's Phishing Quiz) and write down what cues you used."
      ]
    },
    {
      id: 3,
      name: "Identity & access management concepts",
      w: 20,
      topics: [
        "Identification, authentication, authorization and accounting",
        "Least privilege, need to know and separation of duties",
        "Identity lifecycle: provisioning, role changes, deprovisioning, privilege creep",
        "Access models: DAC, MAC, RBAC and rule-based",
        "Privileged access management and separate admin accounts",
        "Single sign-on and federation basics",
        "Physical access controls: badges, access control vestibules, guards, CCTV, tailgating",
        "Periodic access reviews"
      ],
      notes: ["Outline Domain 3 (Sept 2026)"],
      labs: [
        "On Windows or Linux, create a standard user and a group, grant the group read-only access to a folder, and test it as the user.",
        "Turn on MFA with a free authenticator app for one personal account and write down which factor types are involved.",
        "Map five job roles at a small clinic to the minimum permissions each needs (RBAC table)."
      ]
    },
    {
      id: 4,
      name: "Networking & cloud security concepts",
      w: 22,
      topics: [
        "OSI and TCP/IP models, IP addressing, common ports (22, 25, 53, 80, 443, 3389)",
        "Network threats: DoS/DDoS, man-in-the-middle, malware, spoofing, side-channel",
        "Defenses: firewalls, IDS/IPS, antivirus, VPN",
        "Network design: segmentation, VLANs, DMZ, micro-segmentation, defense in depth",
        "Zero trust: never trust, always verify",
        "Cloud characteristics (on-demand, elasticity, measured service) and service models (IaaS, PaaS, SaaS)",
        "Deployment models: public, private, community, hybrid",
        "Shared responsibility model and on-premises data center considerations"
      ],
      notes: ["Outline Domain 4 (Sept 2026)"],
      labs: [
        "Run ipconfig/ip addr and nslookup, then capture a DNS lookup in Wireshark and identify source port, destination port 53 and protocol.",
        "Scan your own machine with Nmap (nmap -sT localhost) and match each open port to its service.",
        "Draw a shared responsibility table for IaaS, PaaS and SaaS showing who patches the OS, app and data access."
      ]
    },
    {
      id: 5,
      name: "Security operations & incident response",
      w: 17,
      topics: [
        "Data security: classification, labeling, retention and secure destruction",
        "Encryption (symmetric vs asymmetric) and hashing",
        "Logging, monitoring and SIEM; event triage",
        "System hardening, configuration management, patching and change management",
        "Vulnerability management and security testing basics",
        "Incident response lifecycle: preparation, detection and analysis, containment, eradication, recovery, lessons learned",
        "Business continuity and disaster recovery: BIA, RTO, RPO, backups and alternate sites",
        "Best-practice policies (AUP, BYOD, password, privacy) and security awareness"
      ],
      notes: ["Outline Domain 5 (Sept 2026)", "NIST SP 800-61 incident handling (free)"],
      labs: [
        "Open Windows Event Viewer (or journalctl on Linux), find failed login events and note time, account and source.",
        "Apply the free CIS Benchmark checklist idea to your own laptop: list five settings to harden and change two of them.",
        "Write a one-page incident response playbook for a phishing email that a user clicked, following the six NIST phases."
      ]
    }
  ],
  study: {
    1: [
      ["Explain the CIA triad with one example of an attack on each.", "Confidentiality: data theft or eavesdropping. Integrity: altering records or poisoning AI training data. Availability: DDoS or ransomware making systems unusable."],
      ["What is the difference between a threat, a vulnerability and a risk?", "A threat is something that can cause harm, a vulnerability is a weakness it can exploit, and risk is the likelihood and impact of that threat exploiting the vulnerability."],
      ["Give one example each of avoiding, mitigating, transferring and accepting a risk.", "Avoid: stop offering the risky service. Mitigate: add MFA. Transfer: buy cyber insurance. Accept: document a low risk and do nothing more."],
      ["List the four canons of the ISC2 Code of Ethics in order.", "Protect society, the common good and infrastructure; act honorably, honestly, justly, responsibly and legally; provide diligent and competent service to principals; advance and protect the profession."],
      ["Why is a password plus a PIN not true multi-factor authentication?", "Both are something you know, so it is one factor type used twice. MFA needs different types, such as something you know plus something you have or are."]
    ],
    2: [
      ["How do policies, standards, procedures and guidelines differ?", "Policies state management's high-level intent; standards set mandatory specific requirements; procedures give step-by-step instructions; guidelines are optional recommendations."],
      ["What is a key risk indicator and how is it different from a regular metric?", "A KRI is a metric chosen to warn early that risk exposure is rising (e.g. rising number of unpatched critical systems), whereas many metrics just report activity."],
      ["Who owns risk in an organization and why?", "Senior management and the board, because they set risk appetite and are accountable for business outcomes; security teams advise and implement."],
      ["Name three ways to build a positive security culture.", "Visible leadership support, regular short awareness training with real examples, and easy no-blame reporting of mistakes and suspicious activity."],
      ["What should you check before a vendor handles your customer data?", "Its security posture (assessments or certifications), contractual security and breach-notification terms, and compliance with laws that apply to the data."]
    ],
    3: [
      ["Put identification, authentication, authorization and accounting in order with an example of each.", "Identification: typing a username. Authentication: proving it with a password and MFA. Authorization: being allowed into the HR folder. Accounting: logs recording what you did."],
      ["Compare DAC, MAC and RBAC in one sentence each.", "DAC: the owner decides who gets access. MAC: the system enforces access by labels and clearances. RBAC: access is granted through job roles."],
      ["What is privilege creep and how do you prevent it?", "Users collecting permissions as they move between roles; prevent it with role-based provisioning, removing old access on transfer, and periodic access reviews."],
      ["Why should admins have separate privileged accounts?", "Daily tasks like email and browsing then run with low privilege, so phishing or malware cannot immediately use admin rights, and admin actions are easier to audit."],
      ["Name three physical access controls and the threat each addresses.", "Badge readers (unauthorized entry), access control vestibules (tailgating), CCTV and guards (deterring and detecting intruders)."]
    ],
    4: [
      ["Match these ports to services: 22, 53, 80, 443, 3389.", "22 SSH, 53 DNS, 80 HTTP, 443 HTTPS, 3389 RDP."],
      ["What is the difference between an IDS and an IPS?", "An IDS monitors and alerts on suspicious traffic; an IPS sits inline and can block it."],
      ["Explain zero trust in two sentences.", "No user or device is trusted just because it is inside the network. Every request is verified for identity, device health and need, and access is kept to the minimum."],
      ["In SaaS, what security responsibilities stay with the customer?", "Managing user identities and access, protecting and classifying the data put into the service, and configuring the app's security settings."],
      ["Why segment a network?", "Segmentation limits lateral movement, so a compromise in one zone (e.g. IoT or guest Wi-Fi) cannot easily reach sensitive systems."]
    ],
    5: [
      ["Name the NIST incident response phases in order.", "Preparation; detection and analysis; containment, eradication and recovery; post-incident activity (lessons learned)."],
      ["What is the difference between RTO and RPO?", "RTO is the maximum acceptable downtime before a function is restored; RPO is the maximum acceptable data loss measured in time since the last good backup."],
      ["Hashing vs encryption: what does each protect?", "Hashing is one-way and verifies integrity; encryption is reversible with a key and protects confidentiality."],
      ["List four steps to harden a new server.", "Remove unneeded services and software, change default accounts and passwords, apply patches, and enable logging and host firewall rules from a secure baseline."],
      ["Why send logs to a central SIEM?", "It keeps copies attackers cannot easily erase, correlates events across systems, and alerts analysts to patterns a single log would miss."]
    ]
  },
  // [id, week, domain, question, [4 options], answer index, explanation, source]
  questions: [
    ["ic1", 0, 1, "A hospital must ensure patient records are not changed without authorization. Which security principle is the main concern?", ["Confidentiality", "Availability", "Integrity", "Non-repudiation"], 2, "Integrity protects data from unauthorized or accidental modification.", "Outline Domain 1"],
    ["ic2", 0, 1, "In AAA, what does accounting provide?", ["A record of what a user did so actions can be traced", "Proof of who the user is", "A decision about what the user may access", "Encryption of the user's session"], 0, "Accounting logs user activity for auditing and tracing; authentication proves identity and authorization grants access.", "Outline Domain 1"],
    ["ic3", 0, 1, "A company buys cyber insurance to cover losses from a data breach. Which risk treatment is this?", ["Avoidance", "Mitigation", "Acceptance", "Transference"], 3, "Insurance shifts the financial impact of the risk to another party, which is transference.", "Outline Domain 1"],
    ["ic4", 0, 1, "Which of the following is an administrative (managerial) control?", ["Firewall", "Acceptable use policy", "Door lock", "Disk encryption"], 1, "Policies are administrative controls; firewalls and encryption are technical, and locks are physical.", "Outline Domain 1"],
    ["ic5", 0, 1, "An ISC2 member learns that a colleague is falsely claiming to hold the CC certification. What is the best action?", ["Ignore it because it is not their business", "Report it through ISC2's ethics complaint process", "Post the colleague's name on social media", "Ask the colleague to share their exam questions"], 1, "The Code of Ethics calls for acting honorably and advancing the profession, which includes reporting misrepresentation through proper channels.", "Outline Domain 1"],
    ["ic6", 0, 1, "Which term describes the combination of the likelihood of a threat exploiting a weakness and the impact if it does?", ["Vulnerability", "Threat", "Asset", "Risk"], 3, "Risk is measured by likelihood and impact.", "Outline Domain 1"],
    ["ic7", 0, 1, "A user logs in with a password and a fingerprint scan. Which factor types are used?", ["Something you know and something you are", "Something you have and something you are", "Two knowledge factors", "Something you know and somewhere you are"], 0, "A password is knowledge and a fingerprint is a biometric (inherence) factor.", "Outline Domain 1"],
    ["ic8", 0, 1, "An unpatched web server that an attacker could exploit is an example of a:", ["Threat", "Risk", "Vulnerability", "Control"], 2, "A vulnerability is a weakness that a threat could exploit.", "Outline Domain 1"],
    ["ic9", 0, 1, "Security staff review camera footage to find out who entered a server room after hours. What type of control is the camera acting as?", ["Preventive", "Deterrent", "Detective", "Corrective"], 2, "Reviewing footage to identify what happened is a detective function.", "Outline Domain 1"],
    ["ic10", 0, 1, "Which technology best provides non-repudiation for an email?", ["Digital signature", "Symmetric encryption", "Unkeyed hashing", "Load balancing"], 0, "A digital signature made with the sender's private key proves who sent the message, so the sender cannot credibly deny it.", "Outline Domain 1"],
    ["ic11", 0, 1, "Which document states management's high-level security intent and is mandatory?", ["Guideline", "Procedure", "Baseline", "Policy"], 3, "A policy is the high-level mandatory statement of intent; the other documents support it.", "Outline Domain 1"],
    ["ic12", 0, 1, "A company must protect personal data because the government requires it by law. What is the source of this requirement?", ["An internal guideline", "Legislation or regulation", "An industry best practice", "A vendor recommendation"], 1, "Requirements imposed by government, such as GDPR, come from laws and regulations and are not optional.", "Outline Domain 1"],
    ["ic13", 0, 1, "An attacker slips manipulated records into the data used to train a company's AI model. Which principle is mainly threatened?", ["Availability", "Integrity", "Accounting", "Non-repudiation"], 1, "Data poisoning corrupts the training data, which attacks its integrity and the trustworthiness of the model's output.", "Outline Domain 1"],
    ["ic14", 0, 1, "Which approach does a qualitative risk assessment use?", ["Exact dollar values such as annualized loss expectancy", "Only historical breach costs", "Hash values of critical files", "Ratings such as high, medium and low"], 3, "Qualitative assessment ranks risks with descriptive ratings; quantitative assessment uses monetary values.", "Outline Domain 1"],

    ["ic15", 0, 2, "Which measure is designed to warn leadership early that risk exposure is increasing?", ["Key risk indicator (KRI)", "Recovery point objective", "Service level agreement", "Mean time to repair"], 0, "KRIs are metrics chosen specifically to signal rising risk before it becomes an incident.", "Outline Domain 2"],
    ["ic16", 0, 2, "What is the main purpose of security governance?", ["Tuning firewall rules daily", "Making users choose strong passwords", "Ensuring security activities align with business objectives under leadership oversight", "Running nightly backups"], 2, "Governance sets direction, accountability and oversight so security supports business goals.", "Outline Domain 2"],
    ["ic17", 0, 2, "What does an organization's risk appetite describe?", ["The number of vulnerabilities found in scans", "The cost of a security control", "The amount of risk it is willing to accept to pursue its goals", "The total value of its assets"], 2, "Risk appetite is the level of risk leadership is willing to accept.", "Outline Domain 2"],
    ["ic18", 0, 2, "Which approach is most effective for building a strong security culture?", ["Ongoing awareness training backed by visible leadership support", "A one-time onboarding slide deck", "Publicly shaming employees who click phishing links", "Emailing the policy once a year"], 0, "Culture grows from continuous, relevant training and leaders who model the behavior; shaming discourages reporting.", "Outline Domain 2"],
    ["ic19", 0, 2, "In GRC, what does compliance mean?", ["Buying the newest security tools", "Never having an incident", "Hiring a chief information security officer", "Meeting the requirements of applicable laws, regulations, standards and contracts"], 3, "Compliance is conformance with external and internal requirements, such as PCI DSS or HIPAA.", "Outline Domain 2"],
    ["ic20", 0, 2, "The click rate on simulated phishing emails falls from 20% to 5% over a year. What does this metric mainly show?", ["Email server availability", "Effectiveness of the security awareness program", "Encryption strength", "Patch compliance"], 1, "Phishing simulation results are a common measure of how well awareness training is changing behavior.", "Outline Domain 2"],
    ["ic21", 0, 2, "Who is ultimately accountable for accepting risk in an organization?", ["The help desk", "Senior management and the board", "Individual end users", "The external auditor"], 1, "Senior leadership owns risk decisions; security teams advise and auditors assess.", "Outline Domain 2"],
    ["ic22", 0, 2, "Which governance document gives step-by-step instructions for completing a task?", ["Policy", "Guideline", "Baseline", "Procedure"], 3, "Procedures are detailed, step-by-step instructions that implement policies and standards.", "Outline Domain 2"],
    ["ic23", 0, 2, "A security manager is preparing a report for executives. What should it focus on?", ["Risk and program metrics summarized in business terms", "Every raw log entry from the SIEM", "The full list of firewall rules", "Application source code"], 0, "Executive reporting should translate security status into business risk so leaders can decide.", "Outline Domain 2"],
    ["ic24", 0, 2, "A new vendor will process the company's customer data. What should happen before the contract is signed?", ["Give the vendor full administrator access", "Skip review because the vendor is inexpensive", "Assess the vendor's security and include security requirements in the contract", "Wait until an incident occurs to review the vendor"], 2, "Third-party risk management assesses vendors up front and writes security and notification terms into the contract.", "Outline Domain 2"],

    ["ic25", 0, 3, "Which statement best describes least privilege?", ["All IT staff get administrator rights", "Everyone gets the same access for simplicity", "Users get only the access they need to do their job", "Access is granted based on seniority"], 2, "Least privilege limits each user to the minimum access their job requires.", "Outline Domain 3"],
    ["ic26", 0, 3, "Which is an example of separation of duties?", ["One employee creates vendor payments and a different employee approves them", "One administrator holds every password", "Team members share one login", "A manager approves their own expense report"], 0, "Splitting a sensitive task between people prevents one person from committing and hiding fraud.", "Outline Domain 3"],
    ["ic27", 0, 3, "In which access control model are permissions assigned to job functions and users gain them by being placed in those functions?", ["Discretionary access control", "Mandatory access control", "Time-based access control", "Role-based access control"], 3, "RBAC grants permissions to roles, and users inherit them through role membership.", "Outline Domain 3"],
    ["ic28", 0, 3, "A military system grants access by comparing classification labels on data with users' clearances. Which model is this?", ["Discretionary access control", "Mandatory access control", "Role-based access control", "Rule-based access control"], 1, "MAC is enforced by the system using labels and clearances, not by data owners.", "Outline Domain 3"],
    ["ic29", 0, 3, "A user shares a folder and chooses which coworkers can open it. Which model is this?", ["Mandatory access control", "Discretionary access control", "Role-based access control", "Attribute labels set by the system"], 1, "In DAC the owner of a resource decides who can access it.", "Outline Domain 3"],
    ["ic30", 0, 3, "An employee is terminated today. What is the most important identity action?", ["Reset their password next quarter", "Move the account to another department", "Leave the account active for handover", "Disable or remove their access promptly"], 3, "Timely deprovisioning prevents a former employee from using access they no longer should have.", "Outline Domain 3"],
    ["ic31", 0, 3, "What is privilege creep?", ["Users keep accumulating permissions as they change roles", "An attacker brute-forces a password", "A badge reader fails open during a power cut", "A firewall blocks legitimate traffic"], 0, "Privilege creep happens when old access is not removed after role changes; access reviews catch it.", "Outline Domain 3"],
    ["ic32", 0, 3, "What is the main purpose of a periodic access review?", ["Speeding up user logins", "Installing missing patches", "Confirming users still need the access they have", "Resetting every password"], 2, "Access reviews verify that current permissions are still appropriate and remove what is not.", "Outline Domain 3"],
    ["ic33", 0, 3, "An access control vestibule (mantrap) at a data center entrance mainly prevents:", ["Phishing", "SQL injection", "Tailgating", "Malware infections"], 2, "A vestibule lets only one authenticated person through at a time, stopping people from following someone in.", "Outline Domain 3"],
    ["ic34", 0, 3, "A user types their username at a login screen. Which step is this?", ["Identification", "Authentication", "Authorization", "Accounting"], 0, "Claiming an identity is identification; proving it with a password or factor is authentication.", "Outline Domain 3"],
    ["ic35", 0, 3, "What is the main benefit of single sign-on (SSO)?", ["It removes the need for authentication", "It guarantees no breaches", "It eliminates the need for MFA", "Users authenticate once to access multiple systems"], 3, "SSO lets one authentication grant access to many applications, reducing password fatigue.", "Outline Domain 3"],
    ["ic36", 0, 3, "What is the best practice for system administrators' privileged access?", ["Use the admin account for daily email", "Use a separate admin account only for admin tasks, protected with MFA", "Share one admin account among the team", "Turn off logging for admin accounts"], 1, "Separate, MFA-protected admin accounts limit exposure and keep admin actions attributable.", "Outline Domain 3"],

    ["ic37", 0, 4, "Which port does HTTPS use by default?", ["80", "443", "22", "25"], 1, "HTTPS uses TCP 443; 80 is HTTP, 22 is SSH and 25 is SMTP.", "Outline Domain 4"],
    ["ic38", 0, 4, "At which OSI layer does IP routing take place?", ["Physical", "Data link", "Transport", "Network"], 3, "Routing by IP address happens at Layer 3, the network layer.", "Outline Domain 4"],
    ["ic39", 0, 4, "Which protocol should replace Telnet for secure remote administration?", ["SSH on port 22", "FTP on port 21", "HTTP on port 80", "SNMP on port 161"], 0, "SSH encrypts the session, while Telnet sends everything, including passwords, in clear text.", "Outline Domain 4"],
    ["ic40", 0, 4, "A company uses a SaaS email service. Which security responsibility remains with the company?", ["Physical security of the data center", "Patching the provider's hypervisors", "Managing user access and the data it stores", "Writing the application's code"], 2, "Under shared responsibility, SaaS customers still own their identities, access settings and data.", "Outline Domain 4"],
    ["ic41", 0, 4, "A distributed denial-of-service (DDoS) attack mainly targets which principle?", ["Confidentiality", "Integrity", "Availability", "Non-repudiation"], 2, "DDoS floods a service so legitimate users cannot reach it.", "Outline Domain 4"],
    ["ic42", 0, 4, "What is the core idea of zero trust?", ["Never trust, always verify each access request", "Trust every device inside the perimeter", "Allow access only through a VPN", "Disable logging to improve speed"], 0, "Zero trust removes implicit trust based on network location and verifies every request.", "Outline Domain 4"],
    ["ic43", 0, 4, "An organization places its smart cameras and other IoT devices on their own VLAN. What is this?", ["Load balancing", "Port forwarding", "Network address translation", "Network segmentation to limit lateral movement"], 3, "Segmentation isolates less-trusted devices so a compromise cannot easily spread.", "Outline Domain 4"],
    ["ic44", 0, 4, "What can an intrusion prevention system (IPS) do that an intrusion detection system (IDS) cannot?", ["Record suspicious traffic", "Block malicious traffic inline", "Encrypt network traffic", "Assign IP addresses"], 1, "An IPS sits in the traffic path and can drop malicious packets; an IDS only alerts.", "Outline Domain 4"],
    ["ic45", 0, 4, "Several hospitals share a cloud built for their common regulatory needs. Which deployment model is this?", ["Public", "Community", "Private", "Hybrid"], 1, "A community cloud is shared by organizations with common concerns such as compliance.", "Outline Domain 4"],
    ["ic46", 0, 4, "An employee works from coffee shop Wi-Fi. What best protects against man-in-the-middle attacks?", ["Choosing a network with a longer name", "Turning off the host firewall", "Disabling automatic updates", "Using a VPN or other encrypted connection"], 3, "Encrypting traffic end to end keeps an attacker on the same network from reading or altering it.", "Outline Domain 4"],
    ["ic47", 0, 4, "What is a DMZ (screened subnet)?", ["A network segment for public-facing servers, separated from the internal network", "A wireless encryption protocol", "A type of malware", "An alternate recovery site"], 0, "A DMZ hosts internet-facing services while firewalls keep them apart from internal systems.", "Outline Domain 4"],
    ["ic48", 0, 4, "Which describes Infrastructure as a Service (IaaS)?", ["The provider manages the operating system and application", "The customer rents a finished application", "The customer rents virtual machines, storage and networking and manages the OS and apps", "The customer only rents rack space for its own hardware"], 2, "In IaaS the provider runs the physical infrastructure while the customer manages everything from the OS up.", "Outline Domain 4"],
    ["ic49", 0, 4, "Which cloud characteristic lets resources grow and shrink automatically with demand?", ["Measured service", "Broad network access", "Rapid elasticity", "Resource pooling"], 2, "Rapid elasticity is the ability to scale resources quickly up or down.", "Outline Domain 4"],
    ["ic50", 0, 4, "What does defense in depth mean?", ["Using multiple layers of controls so one failure does not expose assets", "Relying on one strong firewall", "Using only encryption", "Relying only on user training"], 0, "Layered controls mean an attacker must defeat several defenses, not just one.", "Outline Domain 4"],

    ["ic51", 0, 5, "Which incident response phase comes first?", ["Containment", "Eradication", "Recovery", "Preparation"], 3, "Preparation (plans, team, tools, training) happens before any incident is detected.", "Outline Domain 5"],
    ["ic52", 0, 5, "Which algorithm would you use to check that a downloaded file was not altered?", ["AES", "SHA-256", "RSA", "TLS"], 1, "SHA-256 is a hash function; matching hashes show the file is unchanged.", "Outline Domain 5"],
    ["ic53", 0, 5, "Why do organizations send logs to a central SIEM?", ["To make laptops faster", "To correlate events across systems and alert on suspicious patterns", "To replace backups", "To encrypt hard drives"], 1, "A SIEM aggregates and correlates logs, making attacks spanning several systems visible.", "Outline Domain 5"],
    ["ic54", 0, 5, "Which activity is part of system hardening?", ["Installing every optional service", "Keeping default passwords", "Disabling logging", "Removing unneeded services, changing defaults and applying patches"], 3, "Hardening reduces the attack surface by removing what is not needed and securing what remains.", "Outline Domain 5"],
    ["ic55", 0, 5, "What does a recovery point objective (RPO) define?", ["The maximum acceptable data loss, measured in time", "The maximum acceptable downtime", "The total cost of recovery", "The number of backup copies kept"], 0, "RPO sets how much data, in time, can be lost; RTO sets how long systems can be down.", "Outline Domain 5"],
    ["ic56", 0, 5, "A team has contained ransomware, removed it and restored systems. What should it do next?", ["Detection", "Preparation", "Hold a lessons-learned review", "Identification"], 2, "Post-incident activity captures what went well and what to improve, closing the lifecycle.", "Outline Domain 5"],
    ["ic57", 0, 5, "What does a data classification label mainly determine?", ["Which hardware vendor to buy", "The file size limit", "How the data must be handled, such as encryption and who may access it", "Which backup brand to use"], 2, "Classification drives handling rules for protection, access, retention and destruction.", "Outline Domain 5"],
    ["ic58", 0, 5, "A company is disposing of laptops with SSDs that held sensitive data. What is the best method?", ["Physical destruction or cryptographic erasure", "Deleting the files", "A quick format", "Renaming the folders"], 0, "Deleting or formatting leaves recoverable data; destruction or crypto-erase makes it unrecoverable.", "Outline Domain 5"],
    ["ic59", 0, 5, "Alice wants to send Bob a confidential message using asymmetric encryption. Which key does she encrypt with?", ["Alice's private key", "Alice's public key", "Bob's private key", "Bob's public key"], 3, "Encrypting with Bob's public key means only Bob's private key can decrypt it.", "Outline Domain 5"],
    ["ic60", 0, 5, "What is the purpose of a business continuity plan?", ["To restore only IT systems", "To keep critical business functions running during and after a disruption", "To discipline staff after incidents", "To replace the incident response plan"], 1, "BCP keeps essential operations going; disaster recovery focuses on restoring IT.", "Outline Domain 5"]
  ]
});
