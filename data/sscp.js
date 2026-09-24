/* ISC2 SSCP — exam outline effective Oct 1, 2025 (CAT). Plan generated from domains. */
CertHub.register({
  id: "sscp",
  vendor: "ISC2",
  name: "ISC2 SSCP",
  short: "SSCP",
  exam: "Oct 2025 outline",
  blurb: "Hands-on security practitioner certification: access controls, risk and monitoring, incident response, crypto, networks and systems.",
  status: "verified",
  statusNote: "Domain weights verified Sept 24, 2026 against the SSCP exam outline effective Oct 1, 2025 (CAT format). Subdomain numbers in the source fields follow the published outline structure; recheck them against the PDF. Requirement: one year of cumulative paid work experience in one or more of the seven domains, or pass and become an Associate of ISC2 while earning it.",
  lastVerified: "2026-09-24",
  notices: [{"from": "2026-09-24", "until": "2027-03-31", "text": "Since Oct 1, 2025 the SSCP is adaptive (CAT): 100–125 items in 2 hours."}],
  examInfo: {"questions":"100–125 (computerized adaptive testing)","minutes":120,"pass":"700 out of 1000"},
  examSim: {"questions":125,"minutes":120},
  sources: [{"label":"ISC2 SSCP certification exam outline","url":"https://www.isc2.org/certifications/sscp/sscp-certification-exam-outline"}],
  planWeeks: 12,
  domains: [
    {
      id: 1,
      name: "Security concepts & practices",
      w: 16,
      topics: [
        "ISC2 Code of Ethics: preamble and the four canons, in priority order",
        "CIA triad, authenticity, non-repudiation and privacy",
        "Least privilege, need to know, separation of duties, job rotation, mandatory vacation",
        "Defense in depth, due care vs due diligence",
        "Control categories (technical, administrative, physical) and types (preventive, detective, corrective, deterrent, compensating, directive)",
        "Documenting and verifying functional security controls, baselines",
        "Asset management lifecycle: inventory, ownership, classification, retention, secure disposal",
        "Data roles: owner, custodian, user; media sanitization (clear, purge, destroy)",
        "Change and configuration management: request, impact analysis, approval, backout, emergency changes",
        "Security awareness and training: phishing simulations, measuring effectiveness",
        "Physical security operations: perimeter, badges, access control vestibules, CCTV, visitor logs"
      ],
      notes: [
        "Outline 1.1–1.8",
        "ISC2 Code of Ethics (isc2.org/ethics)"
      ],
      labs: [
        "Map ten controls in your home lab or workplace to category and type (e.g. host firewall = technical/preventive) in a spreadsheet, adding one compensating control for a system you can't patch.",
        "Install Snipe-IT (free, Docker) or use a spreadsheet to build an asset inventory for five devices with owner, classification, location and disposal method.",
        "Write a one-page change request for enabling the Windows or Linux host firewall: scope, impact, test plan, approval and backout steps."
      ]
    },
    {
      id: 2,
      name: "Access controls",
      w: 15,
      topics: [
        "Authentication factors: know, have, are; MFA vs multi-step",
        "Biometrics: FAR, FRR, CER",
        "Single sign-on, Kerberos, device authentication",
        "Federation and trust: SAML, OAuth 2.0, OpenID Connect, one-way/two-way and transitive trusts",
        "Internetwork trust: extranets, third-party connections, zero trust",
        "Identity lifecycle: provisioning, proofing, maintenance, entitlement, deprovisioning",
        "Access reviews, recertification and privilege creep",
        "Privileged access management, service accounts",
        "Access control models: DAC, MAC, RBAC, rule-based, ABAC",
        "Physical vs logical access controls"
      ],
      notes: [
        "Outline 2.1–2.4"
      ],
      labs: [
        "Set up TOTP MFA with a free authenticator app on a test Linux box (google-authenticator-libpam) or a free Keycloak realm and test a login.",
        "Run Keycloak in Docker, create two realms or a client app, and log in via OpenID Connect; inspect the ID token at jwt.io (test tokens only).",
        "On a Linux VM, create role groups (finance, hr), assign users and file permissions with chmod/chown and setfacl, then remove a user from a group to simulate a transfer and verify access is gone."
      ]
    },
    {
      id: 3,
      name: "Risk identification, monitoring & analysis",
      w: 15,
      topics: [
        "Risk terms: asset, threat, vulnerability, likelihood, impact",
        "Qualitative vs quantitative analysis: SLE, ARO, ALE",
        "Risk treatment: avoid, mitigate, transfer, accept; residual risk and risk registers",
        "Frameworks: NIST RMF / SP 800-30, ISO 27005",
        "Legal and regulatory concerns: privacy laws, breach notification, data residency",
        "Security assessments: vulnerability scanning (credentialed vs non-credentialed), pen testing, audits",
        "Vulnerability management: CVE/CVSS, prioritization, false positives, remediation tracking",
        "Monitoring platforms: SIEM, log sources, time synchronization, log integrity",
        "Baselines, anomalies and alert tuning",
        "Analyzing and reporting monitoring results; escalation"
      ],
      notes: [
        "Outline 3.1–3.5",
        "NIST SP 800-30 Rev. 1"
      ],
      labs: [
        "Build a five-row risk register for a small office: asset, threat, vulnerability, likelihood, impact, ALE estimate, treatment and owner.",
        "Scan a lab VM (Metasploitable 2) with Greenbone/OpenVAS Community or Nmap NSE scripts, then compare an unauthenticated and authenticated scan and triage three findings.",
        "Install Wazuh or Security Onion in a VM, forward logs from one host, trigger failed logins, and write a short analysis of the resulting alert."
      ]
    },
    {
      id: 4,
      name: "Incident response & recovery",
      w: 14,
      topics: [
        "Incident lifecycle: preparation, detection & analysis, containment, eradication, recovery, lessons learned",
        "Events vs incidents, triage and escalation",
        "Incident response plan, roles and communications",
        "Forensics: order of volatility, evidence handling, chain of custody",
        "Forensic imaging, write blockers, hash verification",
        "Legal considerations in investigations",
        "Business impact analysis: MTD, RTO, RPO",
        "BCP vs DRP; recovery sites: hot, warm, cold, cloud",
        "Backup types (full, incremental, differential) and restore testing",
        "Plan testing: checklist, tabletop, simulation, parallel, full interruption"
      ],
      notes: [
        "Outline 4.1–4.3",
        "NIST SP 800-61"
      ],
      labs: [
        "Use FTK Imager (free) or dd plus sha256sum to image a USB stick, verify the hash and fill in a chain-of-custody form.",
        "Capture memory from a Windows or Linux VM (DumpIt, winpmem or LiME) and list processes and network connections with Volatility 3.",
        "Run a 30-minute ransomware tabletop exercise (CISA tabletop packages are free): record decisions, RTO/RPO gaps and three lessons learned."
      ]
    },
    {
      id: 5,
      name: "Cryptography",
      w: 9,
      topics: [
        "Why cryptography: confidentiality, integrity, authentication, non-repudiation; data at rest, in transit, in use",
        "Symmetric (AES) vs asymmetric (RSA, ECC) and hybrid key exchange",
        "Hashing, salting, HMAC and digital signatures",
        "Key management: generation, distribution, storage, rotation, escrow, destruction; HSM and TPM",
        "Secure protocols: TLS, SSH, IPsec, S/MIME, SFTP",
        "Forward secrecy and cipher suite choices",
        "PKI: CAs, certificates, CSRs, chain of trust, CRL and OCSP",
        "Web of trust vs hierarchical trust"
      ],
      notes: [
        "Outline 5.1–5.4"
      ],
      labs: [
        "Use OpenSSL to generate an RSA key pair, create a CSR, self-sign a certificate and inspect it with openssl x509 -text.",
        "Hash a file with sha256sum, sign it with gpg --detach-sign, alter one byte and show that verification fails.",
        "Scan a test site with testssl.sh or sslscan and list protocol versions, weak ciphers and whether forward secrecy is supported."
      ]
    },
    {
      id: 6,
      name: "Network & communications security",
      w: 16,
      topics: [
        "OSI and TCP/IP models, common ports and protocols, IPv4/IPv6",
        "Network attacks: ARP poisoning, DNS poisoning, DoS/DDoS, SYN flood, on-path, spoofing",
        "Countermeasures: DAI, DNSSEC, SYN cookies, rate limiting",
        "Network access control: 802.1X, RADIUS/TACACS+, NAC posture checks, port security",
        "Segmentation: VLANs, DMZ/screened subnets, micro-segmentation, zero trust",
        "VPNs and IPsec (AH vs ESP, tunnel vs transport)",
        "Security devices: firewalls (packet, stateful, NGFW, WAF), IDS/IPS, proxies, load balancers",
        "Firewall rule design and implicit deny",
        "Wireless security: WPA2/WPA3, enterprise vs personal, rogue APs and evil twins",
        "Converged networks and VoIP security"
      ],
      notes: [
        "Outline 6.1–6.6"
      ],
      labs: [
        "Capture a TLS and a plain HTTP session in Wireshark, follow the TCP stream and note the three-way handshake and what is visible in each.",
        "Build a pfSense or OPNsense VM with LAN, DMZ and WAN interfaces; write rules allowing HTTPS to the DMZ web server and deny everything else.",
        "Run Suricata on a Linux VM with the ET Open ruleset, generate an Nmap scan from another VM and read the alerts in eve.json."
      ]
    },
    {
      id: 7,
      name: "Systems & application security",
      w: 15,
      topics: [
        "Malware types: virus, worm, trojan, ransomware, rootkit, logic bomb, fileless",
        "Malicious activity and indicators: beaconing, persistence, privilege escalation",
        "Countermeasures: antimalware, sandboxing, allow-listing, user training",
        "Endpoint security: HIDS/HIPS, EDR, host firewalls, hardening, patch management",
        "Mobile device management: MDM/UEM, BYOD vs COPE, containerization, remote wipe",
        "Cloud models and shared responsibility (IaaS, PaaS, SaaS)",
        "Cloud security: IAM, encryption, CSPM, misconfigured storage, data residency",
        "Virtualization: hypervisors, VM escape, VM sprawl, snapshots",
        "Secure application basics: input validation, OWASP Top 10"
      ],
      notes: [
        "Outline 7.1–7.5"
      ],
      labs: [
        "Run CIS-CAT Lite or Lynis against a Windows or Linux VM, fix three findings and rerun to confirm.",
        "Upload a known-benign test sample (EICAR) to a local sandbox or use ANY.RUN's free tier on a public sample report; list the processes, network calls and persistence it shows.",
        "Scan a free AWS or Azure trial account with Prowler or ScoutSuite and fix one publicly accessible storage or overly permissive IAM finding."
      ]
    }
  ],
  study: {
    1: [
      ["List the four ISC2 Code of Ethics canons in order.","Protect society, the common good and infrastructure; act honorably, honestly, justly, responsibly and legally; provide diligent and competent service to principals; advance and protect the profession. Earlier canons win when they conflict."],
      ["Explain separation of duties vs job rotation.","Separation of duties splits a sensitive task so no one person can complete it alone (prevents fraud). Job rotation moves people between roles so fraud or errors are discovered by the next person (detects)."],
      ["Give an example of each control type: preventive, detective, corrective, deterrent, compensating.","Preventive: badge reader. Detective: log review/CCTV. Corrective: restore from backup. Deterrent: warning sign. Compensating: isolating a legacy system that can't be patched."],
      ["Data owner vs data custodian?","The owner (a business manager) is accountable and sets classification and access rules. The custodian (often IT) implements and maintains the controls such as backups and permissions."],
      ["What should a change request contain?","Description and reason, affected systems, impact and risk analysis, test results, schedule, approvals, implementation steps and a backout plan."],
      ["How do you measure whether security awareness training works?","Track behaviour over time: phishing simulation click and report rates, incident reports, policy violations, not just course completion."]
    ],
    2: [
      ["Why is a password plus a security question not MFA?","Both are something you know, so it is one factor used twice. MFA needs different factor types."],
      ["FAR vs FRR and what CER tells you.","FAR: impostors accepted (type II, security risk). FRR: legitimate users rejected (type I, usability). CER is where they are equal; lower CER means a more accurate device."],
      ["SAML vs OAuth 2.0 vs OpenID Connect in one line each.","SAML: XML assertions for enterprise web SSO/federation. OAuth 2.0: delegated authorization (access tokens). OIDC: an identity (authentication) layer on OAuth 2.0 using ID tokens."],
      ["Walk through the identity lifecycle.","Request and approval, identity proofing, provisioning with least privilege, ongoing maintenance and periodic review, role changes, and prompt deprovisioning at termination."],
      ["Contrast DAC, MAC, RBAC and ABAC.","DAC: owner decides. MAC: system enforces labels and clearances. RBAC: permissions follow job roles. ABAC: policies evaluate attributes of user, resource, action and environment."],
      ["What is privilege creep and how do you stop it?","Access accumulating as people change roles. Stop it with role-based provisioning, removing old access on transfer, and periodic access recertification."]
    ],
    3: [
      ["Calculate ALE for a $100,000 asset, 40% exposure factor, once every 4 years.","SLE = 100,000 x 0.4 = 40,000. ARO = 0.25. ALE = 10,000 per year."],
      ["Name the four risk treatment options with an example of each.","Avoid (stop the activity), mitigate (add a control), transfer (insurance or outsourcing contract), accept (documented sign-off by management)."],
      ["Credentialed vs non-credentialed scans?","Credentialed scans log in and see patch levels and configuration, giving fewer false positives. Non-credentialed scans show what an outside attacker sees."],
      ["Why is time synchronization critical for monitoring?","Without consistent NTP time, events from different systems can't be correlated in order, and log evidence is weaker."],
      ["What must be in place before a penetration test?","Written authorization from someone with authority, an agreed scope, rules of engagement, timing, contacts and handling of findings."],
      ["How should vulnerabilities be prioritized?","By severity (e.g. CVSS) adjusted for exploitability, exposure and the criticality of the affected asset, not just by score or discovery order."]
    ],
    4: [
      ["List the incident response phases.","Preparation; detection and analysis; containment, eradication and recovery; post-incident activity (lessons learned)."],
      ["What is the order of volatility?","CPU registers and cache, RAM, network state and running processes, temporary files, disk, remote logs, archived backups. Collect the most volatile first."],
      ["Why does chain of custody matter?","It documents who handled evidence, when and why, proving it was not altered so it is admissible and credible."],
      ["Define MTD, RTO and RPO.","MTD: the longest a process can be down before unacceptable harm. RTO: target time to restore it (must be less than MTD). RPO: maximum acceptable data loss measured in time."],
      ["Hot vs warm vs cold site.","Hot: fully equipped with current data, hours to recover, most expensive. Warm: equipment but not current data, days. Cold: space and power only, weeks, cheapest."],
      ["Compare full, incremental and differential backups for restore.","Full: one set to restore. Incremental: last full plus every incremental since. Differential: last full plus the latest differential."]
    ],
    5: [
      ["Why do systems use both symmetric and asymmetric crypto?","Asymmetric crypto solves key exchange and signatures but is slow; symmetric crypto is fast for bulk data. Hybrid systems exchange a symmetric session key asymmetrically."],
      ["How is a digital signature created and verified?","The sender hashes the message and encrypts the hash with their private key. The receiver decrypts it with the sender's public key and compares it with their own hash."],
      ["What does salting protect against?","Precomputed (rainbow table) attacks and spotting users who share a password, because identical passwords produce different hashes."],
      ["CRL vs OCSP?","A CRL is a periodically published list of revoked certificates. OCSP answers a real-time query about one certificate; OCSP stapling lets the server supply the response."],
      ["What is forward secrecy?","Using ephemeral key exchange (DHE/ECDHE) so session keys can't be recovered later even if the server's long-term private key is compromised."],
      ["Stages of the key management lifecycle?","Generation, distribution, storage, use, rotation, backup/escrow, revocation and destruction."]
    ],
    6: [
      ["Where do ARP, IP and TCP sit in the OSI model?","ARP bridges layers 2 and 3 (usually called layer 2), IP is layer 3 (network), TCP is layer 4 (transport)."],
      ["Explain the 802.1X roles.","Supplicant (client), authenticator (switch or access point) and authentication server (usually RADIUS). The port stays closed until the server approves."],
      ["AH vs ESP in IPsec?","AH provides integrity and origin authentication but no encryption. ESP provides confidentiality and can also provide integrity and authentication."],
      ["IDS vs IPS placement and behaviour.","IDS listens passively on a span or tap and alerts. IPS sits inline and can drop traffic, so it can also block legitimate traffic if tuned badly."],
      ["What belongs in a DMZ?","Systems that must be reachable from untrusted networks, such as public web, mail relay and DNS servers, separated from the internal network by firewalls."],
      ["How do you defend against an evil twin?","WPA3/WPA2-Enterprise with server certificate validation, wireless IDS to detect rogue APs, and user training to avoid unknown networks."]
    ],
    7: [
      ["Virus vs worm vs trojan.","A virus attaches to a host file and needs user action; a worm self-propagates across networks; a trojan poses as legitimate software."],
      ["What does EDR add beyond traditional antivirus?","Continuous recording of endpoint behaviour, detection of fileless and unknown threats, investigation tools, and response actions such as host isolation."],
      ["Which MDM controls matter most for a lost device?","Enforced screen lock and encryption, remote lock and wipe, and containerized corporate data that can be selectively wiped."],
      ["Who patches what under IaaS, PaaS and SaaS?","IaaS: customer patches OS and apps. PaaS: provider patches the platform, customer secures code and data. SaaS: provider runs the app, customer manages users, access and data."],
      ["What is VM escape and how do you reduce the risk?","Code in a guest breaking out to the hypervisor or other guests. Patch hypervisors, minimize guest tools and shared features, and separate workloads by trust level."],
      ["Why is application allow-listing so effective?","Only approved executables run, so unknown malware is blocked by default rather than needing a signature."]
    ]
  },
  questions: [
    ["ss1",0,1,"Two canons of the ISC2 Code of Ethics appear to conflict in a situation you face. Which canon takes precedence?",["Provide diligent and competent service to principals","Advance and protect the profession","Protect society, the common good, necessary public trust and confidence, and the infrastructure","Act honorably, honestly, justly, responsibly, and legally"],2,"The canons are applied in order, and protecting society and the infrastructure comes first.","Outline 1.1"],
    ["ss2",0,1,"A help desk technician whose only job is resetting user passwords has Domain Admin rights. What is the BEST action?",["Grant only the delegated password-reset permission and remove Domain Admin membership","Keep Domain Admin rights but enable detailed auditing of the account","Have the technician sign an acceptable use policy","Rotate the Domain Admin password every month"],0,"Least privilege means giving only the access the job needs; auditing and policies don't remove the excess privilege.","Outline 1.2"],
    ["ss3",0,1,"Which control BEST prevents a single employee from both creating a new vendor and approving payments to it?",["Job rotation","Mandatory vacation","Need to know","Separation of duties"],3,"Separation of duties splits a sensitive process so one person can't complete it alone; the others mainly help detect fraud after the fact.","Outline 1.2"],
    ["ss4",0,1,"A legacy controller cannot support MFA, so it is placed on an isolated VLAN reachable only through a monitored jump host. What type of control is this?",["Deterrent","Compensating","Directive","Corrective"],1,"A compensating control is an alternative safeguard used when the primary control can't be implemented.","Outline 1.3"],
    ["ss5",0,1,"Which statement BEST describes defense in depth?",["Deploying the strongest available firewall at the network perimeter","Layering multiple independent controls so the failure of one does not expose the asset","Concentrating security spending on the most valuable asset","Encrypting all data so other controls become unnecessary"],1,"Defense in depth relies on several overlapping layers rather than any single strong control.","Outline 1.2"],
    ["ss6",0,1,"An attacker alters payroll amounts while the file is in transit to the bank. Which security principle has been violated?",["Confidentiality","Availability","Privacy","Integrity"],3,"Unauthorized modification of data is a loss of integrity.","Outline 1.2"],
    ["ss7",0,1,"Why should implemented security controls be tested and reviewed periodically?",["To confirm they still operate as intended as systems, threats and business needs change","Because auditors require every control to be replaced annually","To reduce the number of controls that must be documented","To shift accountability for controls from management to IT"],0,"Controls drift and environments change, so ongoing verification shows they remain effective.","Outline 1.4"],
    ["ss8",0,1,"What is the MOST important prerequisite for applying appropriate protection to information assets?",["A signed contract with a managed security provider","Full-disk encryption on every endpoint","An accurate inventory with an assigned owner and classification for each asset","A completed penetration test of the network"],2,"You can't protect what you don't know you have; ownership and classification drive which controls are applied.","Outline 1.5"],
    ["ss9",0,1,"Who is ultimately responsible for deciding the classification level of a customer database?",["The data custodian","The database administrator","The security administrator","The data owner"],3,"The data owner, a business role, is accountable for classification; custodians implement the resulting controls.","Outline 1.5"],
    ["ss10",0,1,"Solid-state drives holding confidential data are being retired and will leave the organization. Which method is MOST appropriate?",["Degaussing the drives","Physical destruction such as shredding","Performing a quick format","Deleting all partitions"],1,"Degaussing does not work on flash storage and formatting leaves recoverable data; destruction ensures the data can't be recovered.","Outline 1.5"],
    ["ss11",0,1,"A technician wants to push an urgent firewall rule change to production during business hours. What should the technician do FIRST?",["Apply the change now and document it afterwards","Apply the change and monitor for complaints","Submit it through the change management process, using the emergency change procedure if justified","Ask the firewall vendor to approve the rule"],2,"Even urgent changes need review and approval, with emergency procedures that still record impact and backout steps.","Outline 1.6"],
    ["ss12",0,1,"Which metric BEST shows that phishing awareness training is changing behaviour?",["Falling click rates and rising report rates across repeated phishing simulations","The percentage of staff who completed the training module","The number of training sessions delivered this year","Average scores on the end-of-course quiz"],0,"Completion and quiz scores measure attendance and recall, not whether people act differently.","Outline 1.7"],
    ["ss13",0,1,"Employees are holding the door open for people following them into a secure area. Which control BEST addresses this?",["An access control vestibule (mantrap) that admits one person per authentication","Additional CCTV cameras at the entrance","A warning sign about tailgating","A visitor sign-in log at reception"],0,"A vestibule physically prevents tailgating; cameras and signs only detect or deter it.","Outline 1.8"],
    ["ss14",0,2,"Which combination provides true multifactor authentication?",["A password and the answer to a security question","A fingerprint scan and a palm scan","A password and a one-time code from a hardware token","A PIN and a passphrase"],2,"MFA requires different factor types; the other options use two items from the same factor.","Outline 2.1"],
    ["ss15",0,2,"For a biometric system protecting a data center, which error rate should be minimized FIRST?",["False rejection rate","False acceptance rate","Failure-to-enroll rate","Throughput rate"],1,"False acceptances let unauthorized people in, which is the greater risk for a high-security area.","Outline 2.1"],
    ["ss16",0,2,"What is the GREATEST security risk introduced by single sign-on?",["Users must remember more passwords","Authentication traffic increases across the network","Help desk password reset calls increase","Compromise of one credential can grant access to many systems"],3,"SSO concentrates access behind one credential, so protecting it with MFA becomes critical.","Outline 2.1"],
    ["ss17",0,2,"Which standard exchanges XML-based authentication and authorization assertions between an identity provider and a service provider for browser SSO?",["LDAP","RADIUS","SAML","Kerberos"],2,"SAML defines assertions passed between an IdP and SP in federated web SSO.","Outline 2.2"],
    ["ss18",0,2,"A web application needs to verify a user's identity using the user's existing social account. Which protocol adds an authentication layer on top of OAuth 2.0 for this purpose?",["OpenID Connect","OAuth 2.0 on its own","TACACS+","NTLM"],0,"OAuth 2.0 handles delegated authorization; OpenID Connect adds ID tokens to authenticate the user.","Outline 2.2"],
    ["ss19",0,2,"Domain A trusts domain B, and domain B trusts domain C, with all trusts transitive. What is the MAIN security concern for domain A?",["Domain A users lose access to domain B","Kerberos tickets can no longer be issued in domain A","Domain C administrators must reset domain A passwords","Users in domain C may reach domain A resources without domain A approving a trust with C"],3,"Transitive trust extends access implicitly, so organizations should review and limit trust relationships.","Outline 2.2"],
    ["ss20",0,2,"An employee moves from accounts payable to marketing. What is the MOST important identity management action?",["Add marketing permissions to the existing account","Remove the accounts payable access no longer needed while provisioning the marketing role","Create a second account for the marketing role","Wait for the next quarterly access review to adjust permissions"],1,"Removing old access on transfer prevents privilege creep and preserves separation of duties.","Outline 2.3"],
    ["ss21",0,2,"A system administrator is being involuntarily terminated. When should the administrator's access be disabled?",["At the end of the employee's last working day","At or just before the time the employee is notified","After the employee returns company equipment","Within 30 days, per the standard deprovisioning SLA"],1,"Disabling access at notification removes the chance for a disgruntled privileged user to cause damage.","Outline 2.3"],
    ["ss22",0,2,"What is the PRIMARY purpose of periodic access recertification by managers?",["To force users to change their passwords","To measure how often users log in","To transfer account ownership to the security team","To detect and remove accumulated or inappropriate entitlements"],3,"Recertification confirms each user's access is still needed and catches privilege creep.","Outline 2.3"],
    ["ss23",0,2,"In which access control model does the system enforce access using sensitivity labels and clearances, with users unable to change permissions?",["Mandatory access control","Discretionary access control","Role-based access control","Rule-based access control"],0,"MAC is enforced by the system based on labels; owners can't grant access at their discretion.","Outline 2.4"],
    ["ss24",0,2,"A hospital with high staff turnover wants permissions to follow job functions such as nurse, physician and billing clerk. Which model is MOST appropriate?",["Discretionary access control","Mandatory access control","Role-based access control","Access control lists maintained per user"],2,"RBAC assigns permissions to roles, so users get the right access simply by being placed in a role.","Outline 2.4"],
    ["ss25",0,2,"Access to a report must be allowed only for finance staff using a managed device during business hours. Which model BEST supports this policy?",["Role-based access control","Discretionary access control","Mandatory access control","Attribute-based access control"],3,"ABAC evaluates attributes of the user, device and environment (like time) in one policy.","Outline 2.4"],
    ["ss26",0,3,"A server is valued at $200,000. A flood would cause 25% damage and is expected once every two years. What is the annualized loss expectancy?",["$50,000","$25,000","$100,000","$12,500"],1,"SLE = 200,000 x 0.25 = 50,000; ALE = SLE x ARO = 50,000 x 0.5 = 25,000.","Outline 3.1"],
    ["ss27",0,3,"An organization buys cyber insurance to cover losses from data breaches. Which risk treatment is this?",["Risk avoidance","Risk mitigation","Risk transfer","Risk acceptance"],2,"Insurance shifts the financial impact to a third party; it doesn't reduce the likelihood of the breach.","Outline 3.1"],
    ["ss28",0,3,"Who should formally accept the residual risk remaining after controls are applied to a business system?",["The business owner or senior manager with authority over the system","The security practitioner who performed the assessment","The external auditor","The system administrator"],0,"Risk acceptance is a management decision made by someone accountable for the business impact.","Outline 3.1"],
    ["ss29",0,3,"Which BEST describes qualitative risk analysis?",["Rating likelihood and impact with categories such as high, medium and low","Calculating SLE, ARO and ALE in monetary terms","Using automated scanners to count vulnerabilities","Relying only on insurance actuarial tables"],0,"Qualitative analysis uses relative ratings and judgment rather than monetary values.","Outline 3.1"],
    ["ss30",0,3,"Before sending logs that contain customers' personal data to a monitoring provider in another country, what should the analyst do FIRST?",["Encrypt the logs and send them","Remove the time stamps from the logs","Confirm the legal and privacy requirements for cross-border transfer with legal or compliance","Ask the provider to sign a non-disclosure agreement"],2,"Privacy and data residency laws may restrict the transfer, so obligations must be confirmed before acting.","Outline 3.2"],
    ["ss31",0,3,"Which vulnerability scan gives the MOST accurate view of missing patches on servers?",["An unauthenticated external scan","An authenticated (credentialed) scan","A ping sweep","A passive network traffic scan"],1,"Credentialed scans can read installed software and configuration directly, reducing guesswork and false positives.","Outline 3.3"],
    ["ss32",0,3,"A scanner reports a critical vulnerability on a server, but the analyst confirms the relevant patch is installed and the service is not vulnerable. What is this finding?",["A false negative","A true positive","A zero-day","A false positive"],3,"The scanner reported a vulnerability that doesn't actually exist.","Outline 3.3"],
    ["ss33",0,3,"What must be obtained BEFORE a penetration test begins?",["A list of all employee passwords","Approval from the organization's internet service provider","Written authorization with an agreed scope and rules of engagement","A copy of last year's audit report"],2,"Without written authorization and scope, testing may be illegal and can disrupt operations.","Outline 3.3"],
    ["ss34",0,3,"Which factor should MOST influence the order in which vulnerabilities are remediated?",["Severity combined with exploitability and the criticality of the affected asset","The order in which the scanner found them","The CVSS base score alone","How quickly each patch can be installed"],0,"Risk-based prioritization weighs severity against real exposure and business importance.","Outline 3.3"],
    ["ss35",0,3,"Correlating events from firewalls, servers and applications in a SIEM depends MOST on which of the following?",["Identical log formats on every device","Storing logs on the same disk as the SIEM","Using the same vendor for every device","Synchronized time across all log sources"],3,"Consistent time (NTP) lets events be placed in the correct sequence; the SIEM can normalize formats.","Outline 3.4"],
    ["ss36",0,3,"What is the BEST way to preserve log integrity if an attacker gains administrative control of a server?",["Increase the local log file size","Forward logs in real time to a centralized, access-restricted log server","Compress logs daily on the server","Set local logs to read-only for standard users"],1,"An attacker with admin rights can alter local logs; an independent central copy preserves the record.","Outline 3.4"],
    ["ss37",0,3,"To detect anomalous network activity, what must an analyst establish FIRST?",["A list of all known malware signatures","A baseline of normal activity","A penetration test report","A mandatory vacation policy"],1,"Anomalies can only be identified by comparison with what normal looks like.","Outline 3.5"],
    ["ss38",0,4,"A responder confirms ransomware is encrypting files on a workstation. What should the responder do FIRST?",["Reimage the workstation from a known-good image","Run a full antivirus scan and let the user continue","Delete the ransom note and encrypted files","Isolate the workstation from the network"],3,"Containment stops the spread; reimaging first would also destroy evidence.","Outline 4.1"],
    ["ss39",0,4,"What is the PRIMARY purpose of a lessons-learned meeting after an incident?",["To improve processes and controls so similar incidents are prevented or handled better","To identify which employee should be disciplined","To close the incident ticket","To calculate the ransom that could have been paid"],0,"The post-incident review feeds improvements back into preparation.","Outline 4.1"],
    ["ss40",0,4,"Which of the following is BEST classified as an incident rather than an event?",["A single failed login by a user","A scheduled backup job completing","A confirmed unauthorized login to the payroll server","A firewall logging a blocked connection attempt"],2,"An incident is an event that actually harms or threatens confidentiality, integrity or availability.","Outline 4.1"],
    ["ss41",0,4,"Following the order of volatility, which should be collected FIRST from a running system?",["Hard disk image","Archived backup tapes","Logs already stored on a remote syslog server","Contents of system memory (RAM)"],3,"RAM is lost when the system is powered off, so it is collected before less volatile sources.","Outline 4.2"],
    ["ss42",0,4,"What is the MAIN purpose of chain of custody documentation?",["To speed up forensic analysis","To show evidence was controlled and unaltered from collection through presentation","To encrypt evidence for storage","To identify the attacker"],1,"Documented handling supports the integrity and admissibility of evidence.","Outline 4.2"],
    ["ss43",0,4,"Before analyzing a seized hard drive, what should the investigator do?",["Boot the drive in a workstation to review files","Run antivirus on the original drive to remove malware","Create a bit-for-bit image using a write blocker, verify it by hash, and analyze the copy","Defragment the drive to make analysis faster"],2,"Working on a verified image protects the original evidence from modification.","Outline 4.2"],
    ["ss44",0,4,"Which activity determines the maximum tolerable downtime of business processes?",["Business impact analysis","Vulnerability assessment","Penetration test","Tabletop exercise"],0,"The BIA identifies critical functions and the impact of their loss over time, which sets MTD, RTO and RPO.","Outline 4.3"],
    ["ss45",0,4,"Management states that the order system can lose no more than four hours of transactions. Which metric does this define?",["Recovery point objective","Recovery time objective","Maximum tolerable downtime","Mean time between failures"],0,"RPO is the maximum acceptable data loss expressed as time.","Outline 4.3"],
    ["ss46",0,4,"Operations must resume within a few hours of a disaster at an alternate location that already has equipment and near-current data. Which option is MOST appropriate?",["Warm site","Cold site","Hot site","Reciprocal agreement with a partner company"],2,"Only a hot site is ready to take over within hours.","Outline 4.3"],
    ["ss47",0,4,"In which disaster recovery test do team members talk through their roles in a scenario without activating any systems?",["Full interruption test","Tabletop exercise","Parallel test","Failover test"],1,"A tabletop is discussion-based; the others actually run recovery systems.","Outline 4.3"],
    ["ss48",0,4,"Which backup strategy requires only the last full backup and the most recent backup set to perform a restore?",["Full plus incremental","Incremental only","Snapshot of the operating system only","Full plus differential"],3,"A differential contains all changes since the last full backup, so only the latest one is needed.","Outline 4.3"],
    ["ss49",0,5,"A policy requires that data on a stolen laptop be unreadable. Which control BEST meets this requirement?",["A strong login password","A cable lock","Full-disk encryption","Remote logging"],2,"Encryption at rest protects confidentiality even when the device is in someone else's hands.","Outline 5.1"],
    ["ss50",0,5,"Which is the BEST way to verify that a downloaded installer has not been altered?",["Compare its SHA-256 hash with the value published on the vendor's trusted site","Check that the file size is the same as the vendor's","Scan it with antivirus","Confirm the file name matches the vendor's"],0,"A cryptographic hash changes if even one bit changes, so a match proves integrity.","Outline 5.1"],
    ["ss51",0,5,"Why do secure protocols use asymmetric cryptography to exchange a symmetric session key?",["Symmetric keys cannot be used for encryption over networks","Asymmetric crypto is faster for large amounts of data","It removes the need for certificates","Asymmetric crypto solves key distribution while symmetric crypto is faster for bulk data"],3,"The hybrid approach combines the strengths of both.","Outline 5.2"],
    ["ss52",0,5,"To create a digital signature, the sender encrypts the message hash with which key?",["The sender's public key","The sender's private key","The recipient's public key","A shared symmetric key"],1,"Anyone can verify with the sender's public key, and only the sender could have produced it.","Outline 5.2"],
    ["ss53",0,5,"What is the PRIMARY purpose of adding a unique salt before hashing passwords?",["To make the hash reversible for recovery","To defeat precomputed rainbow table attacks and hide identical passwords","To encrypt the password during transmission","To shorten the stored hash"],1,"A unique salt makes each hash different, so precomputed tables are useless.","Outline 5.2"],
    ["ss54",0,5,"An administrator must manage network devices remotely. Which protocol is the BEST replacement for Telnet?",["FTP","SNMPv1","HTTP","SSH"],3,"SSH encrypts the session, including credentials, whereas Telnet sends everything in clear text.","Outline 5.3"],
    ["ss55",0,5,"Why are ECDHE cipher suites preferred for TLS?",["They provide forward secrecy, so past sessions stay protected if the server's private key is later compromised","They remove the need for server certificates","They use no public key cryptography","They make TLS compatible with SSL 2.0"],0,"Ephemeral key exchange means session keys can't be derived from the long-term key.","Outline 5.3"],
    ["ss56",0,5,"Where should the private key of an organization's root certificate authority be stored for the strongest protection?",["On the CA server's system drive","In a password-protected file on a file share","In a hardware security module kept offline","In the certificate itself"],2,"HSMs generate and protect keys in tamper-resistant hardware, and an offline root reduces exposure.","Outline 5.4"],
    ["ss57",0,5,"Which mechanism lets a client check the current revocation status of a single certificate in near real time?",["Certificate revocation list (CRL)","Certificate signing request (CSR)","Key escrow","Online Certificate Status Protocol (OCSP)"],3,"OCSP answers a query about one certificate; CRLs are published lists refreshed periodically.","Outline 5.4"],
    ["ss58",0,6,"At which OSI layer do routers make forwarding decisions based on IP addresses?",["Layer 2 (data link)","Layer 3 (network)","Layer 4 (transport)","Layer 7 (application)"],1,"IP addressing and routing happen at the network layer.","Outline 6.1"],
    ["ss59",0,6,"An attacker sends forged ARP replies so traffic for the default gateway goes to the attacker's MAC address. Which countermeasure is MOST effective?",["Enable DNSSEC","Apply SYN cookies on servers","Enable dynamic ARP inspection on the switches","Change the Wi-Fi password"],2,"DAI validates ARP packets against trusted bindings and drops forged replies.","Outline 6.2"],
    ["ss60",0,6,"Which technique helps a server withstand a SYN flood without exhausting its connection table?",["SYN cookies","Port mirroring","MAC filtering","Increasing the DHCP lease time"],0,"SYN cookies avoid storing state for half-open connections until the handshake completes.","Outline 6.2"],
    ["ss61",0,6,"Which control BEST protects clients from DNS cache poisoning?",["DNSSEC validation","Using DHCP reservations","Disabling ICMP","Using a shorter DNS time-to-live"],0,"DNSSEC signs DNS records so resolvers can verify origin and integrity.","Outline 6.2"],
    ["ss62",0,6,"Only devices with current patches and running antivirus should be allowed on the internal network. Which solution BEST meets this need?",["Static IP addressing","A web application firewall","Network access control with posture assessment","A load balancer"],2,"NAC checks device health before granting access and can quarantine non-compliant devices.","Outline 6.3"],
    ["ss63",0,6,"In an 802.1X deployment, what role does the network switch play?",["Supplicant","Authenticator","Authentication server","Certificate authority"],1,"The switch relays credentials between the supplicant and the RADIUS authentication server.","Outline 6.3"],
    ["ss64",0,6,"Where should a public-facing web server be placed?",["On the internal user VLAN","On the same subnet as the database server","Directly on the internet with no firewall","In a screened subnet (DMZ) separated from the internal network"],3,"The DMZ lets outsiders reach the server while limiting their path to internal systems.","Outline 6.4"],
    ["ss65",0,6,"Which IPsec protocol provides confidentiality for the packet payload?",["Authentication Header (AH)","Internet Key Exchange (IKE)","Encapsulating Security Payload (ESP)","Generic Routing Encapsulation (GRE)"],2,"ESP encrypts the payload; AH only provides integrity and authentication.","Outline 6.4"],
    ["ss66",0,6,"What should be the final rule in a firewall access control list?",["Deny all traffic not explicitly permitted","Allow all outbound traffic","Allow all traffic from internal networks","Log and allow all traffic"],0,"Implicit or explicit deny ensures anything not allowed by earlier rules is blocked.","Outline 6.5"],
    ["ss67",0,6,"Which device is placed inline and can automatically block malicious traffic it detects?",["Intrusion detection system on a span port","Network tap","Syslog server","Intrusion prevention system"],3,"An IPS sits in the traffic path and can drop packets; an IDS only alerts.","Outline 6.5"],
    ["ss68",0,6,"Which device is BEST suited to block SQL injection attempts against a web application?",["Packet-filtering router","Web application firewall","Network switch with port security","DHCP server"],1,"A WAF inspects HTTP requests at the application layer for attack patterns.","Outline 6.5"],
    ["ss69",0,6,"Which wireless configuration is MOST appropriate for a new enterprise deployment?",["WPA2-Personal with a shared passphrase","WPA3-Enterprise with 802.1X authentication","WEP with a 128-bit key","Open network with MAC filtering"],1,"Enterprise mode gives each user individual credentials and WPA3 provides the strongest current protection.","Outline 6.6"],
    ["ss70",0,6,"Users connect to an access point broadcasting the corporate SSID that is actually run by an attacker. What is this attack?",["Bluejacking","War driving","Jamming","Evil twin"],3,"An evil twin impersonates a legitimate AP to intercept traffic or capture credentials.","Outline 6.6"],
    ["ss71",0,7,"Which type of malware spreads across networks on its own without user action?",["Worm","Trojan","Logic bomb","Macro virus"],0,"Worms self-replicate by exploiting vulnerabilities; the others need a trigger or user action.","Outline 7.1"],
    ["ss72",0,7,"Malware modifies the operating system kernel to hide its files and processes from administrators. What is it?",["Adware","Keylogger","Rootkit","Ransomware"],2,"Rootkits subvert the OS to conceal themselves and keep privileged access.","Outline 7.1"],
    ["ss73",0,7,"Which observation is the STRONGEST indicator that an internal host is part of a botnet?",["A user reporting a slow browser","A failed Windows update","A full recycle bin","Regular outbound connections at fixed intervals to an unfamiliar domain"],3,"Periodic beaconing to unknown hosts is typical of command-and-control traffic.","Outline 7.1"],
    ["ss74",0,7,"What is the MOST effective control to prevent unauthorized executables from running on public kiosks?",["Signature-based antivirus","Application allow-listing","A host-based intrusion detection system","User awareness training"],1,"Allow-listing blocks anything not explicitly approved, including unknown malware.","Outline 7.2"],
    ["ss75",0,7,"Which endpoint tool continuously records process activity and allows a responder to isolate a host remotely?",["Host-based firewall","Disk encryption software","Endpoint detection and response (EDR)","Patch management server"],2,"EDR provides behavioural telemetry, detection and response actions such as isolation.","Outline 7.2"],
    ["ss76",0,7,"Before deploying a critical operating system patch to all production servers, what should the administrator do?",["Test the patch in a staging environment that mirrors production","Deploy it immediately to all servers at once","Wait until the vendor releases the next patch","Ask users whether they notice problems after installing"],0,"Testing catches compatibility problems before they cause outages, and supports a backout plan.","Outline 7.2"],
    ["ss77",0,7,"A company phone containing sensitive email has been lost. Which MDM capability BEST protects the data?",["Remote wipe","Geofencing","Application whitelisting","Push notifications"],0,"Remote wipe removes the data from the lost device.","Outline 7.3"],
    ["ss78",0,7,"In a BYOD program, which MDM feature BEST separates corporate data from personal data?",["Full-device remote wipe","Carrier unlocking","Containerization","Jailbreak detection"],2,"A container keeps corporate apps and data apart so they can be managed and wiped without touching personal data.","Outline 7.3"],
    ["ss79",0,7,"Under the IaaS model, who is responsible for patching the guest operating system?",["The cloud provider","The cloud customer","The hypervisor vendor","The internet service provider"],1,"In IaaS the provider secures the physical and virtualization layers; the customer manages the OS and above.","Outline 7.4"],
    ["ss80",0,7,"A misconfigured cloud storage bucket exposed customer data. Which tool BEST detects such misconfigurations continuously?",["Network intrusion detection system","Data loss prevention on endpoints","Vulnerability scanner run once a year","Cloud security posture management (CSPM)"],3,"CSPM continuously checks cloud configurations against security policies and benchmarks.","Outline 7.4"],
    ["ss81",0,7,"An attacker breaks out of a guest virtual machine to access the hypervisor. What is this called?",["VM sprawl","Hyperjacking by phishing","VM escape","Live migration"],2,"VM escape compromises the isolation between guests and the host.","Outline 7.5"],
    ["ss82",0,7,"Unmanaged virtual machines are multiplying and many are unpatched. What is the BEST control?",["A formal provisioning process with inventory and lifecycle management for VMs","Increasing host memory","Taking more frequent snapshots","Moving all VMs to one host"],0,"VM sprawl is controlled by approval, tracking and decommissioning of virtual machines.","Outline 7.5"]
  ]
});
