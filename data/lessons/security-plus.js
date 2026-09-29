/* Lessons for CompTIA Security+ (SY0-701): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("security-plus", [
 {
  "t": "Control categories: technical, managerial, operational, physical",
  "body": [
   "A security control is anything an organization puts in place to reduce risk: a firewall rule, a written policy, a guard at the door, a training session. Security+ asks you to sort controls in two independent ways. The first is the control category, which answers 'how is this control implemented, and who or what carries it out?' The SY0-701 objectives name four categories: technical, managerial, operational and physical. The second way, control type, answers 'what does it do?' (preventive, detective and so on) and is covered in the next lesson. Categories matter because a healthy security program uses all four. A company with excellent firewalls but no policies, no trained staff and an unlocked server room is still easy to breach, and auditors look for balance across categories.",
   "Technical controls (sometimes called logical controls) are implemented by systems: hardware, software or firmware that enforces a rule automatically. Examples include firewalls, antivirus and endpoint detection and response (EDR) agents, encryption, multifactor authentication (MFA), operating system permissions, access control lists and intrusion prevention systems. Once configured, a technical control keeps working without a person deciding each time. That consistency is their strength; their weakness is that they only enforce what someone configured, so a wrong rule is enforced just as faithfully as a right one.",
   "Managerial controls (also called administrative controls) are about direction and oversight. They are the decisions and documents that shape how security is run: security policies, risk assessments, the risk register, vendor risk assessments, the design of the awareness program, background check requirements and change management policy. If a control lives mainly on paper and describes what should happen or how risk is governed, it is probably managerial. Managerial controls rarely stop an attack directly; instead they decide which other controls exist and who is accountable for them.",
   "Operational controls are carried out by people as part of day-to-day work. A guard checking badges, a help desk analyst following an identity verification procedure before resetting a password, staff running and testing backups, and employees attending awareness training are all operational. The line with managerial can feel subtle, so use this test: the policy that says 'all visitors must be escorted' is managerial, while the receptionist actually escorting visitors is operational. Managerial controls decide; operational controls do.",
   "Physical controls protect the tangible environment: fences, bollards, locks, access control vestibules (mantraps), lighting, badge readers, cameras, fire suppression and locked server racks. They stop, slow or record people and vehicles moving through space. A badge reader is physical even though it contains electronics, because what it mainly protects is a doorway. Likewise a camera is a physical control. Do not let the presence of technology push you toward 'technical'; ask what the control guards. If it guards a space or an object you can touch, it is physical.",
   "Here is a quick walk-through with one risk: laptops being stolen from an office. A policy requiring laptops to be locked away overnight is managerial. The cleaning crew supervisor checking desks each evening is operational. The cable locks and locked office doors are physical. Full disk encryption, which keeps the data unreadable if a laptop is taken anyway, is technical. Four categories, one risk, layered together. This is defense in depth expressed through categories, and it is exactly how you should think when a question asks which additional control would best close a gap.",
   "Common mistakes: first, confusing category with type. 'Preventive' is never a category, and 'physical' is never a type. Every control has one of each, so a door lock is a physical, preventive control, and a camera is a physical, detective (and deterrent) control. Second, calling training managerial. Designing the program is managerial; delivering and attending training is operational. Third, labeling anything with a computer in it as technical. A badge reader or CCTV system is still physical. Fourth, assuming a control can only ever belong to one category. Some controls blend, and the exam usually asks for the best fit, so pick the category that matches the control's main purpose.",
   "Exam questions usually describe a control and ask which category it belongs to, or give a scenario and ask which category of control is missing. Clue words help: 'configured', 'software', 'enforced by the system' point to technical; 'policy', 'assessment', 'governance', 'plan' point to managerial; 'performed by staff', 'procedure', 'guard', 'training session' point to operational; 'fence', 'lock', 'lighting', 'building' point to physical. When two answers look plausible, reread the question for the word 'implemented by' or 'carried out by', because that is what category measures."
  ],
  "terms": [
   [
    "Technical control",
    "A control enforced by hardware, software or firmware, such as a firewall, encryption or MFA."
   ],
   [
    "Managerial control",
    "A control that directs or governs security, such as a policy, risk assessment or vendor assessment; also called administrative."
   ],
   [
    "Operational control",
    "A control carried out by people in daily work, such as guards, backup procedures or delivering training."
   ],
   [
    "Physical control",
    "A control that protects tangible spaces and objects, such as fences, locks, bollards and cameras."
   ],
   [
    "Control category",
    "How a control is implemented and by whom; separate from control type, which describes what it does."
   ],
   [
    "Defense in depth",
    "Layering several different controls so that the failure of one does not expose the asset."
   ]
  ],
  "example": "After a break-in at a branch office, a company reviews its controls. It finds it had strong technical controls (encrypted laptops and MFA) but no written physical security policy (managerial), no one checking that doors were locked at close (operational), and a rear door with a broken lock (physical). The remediation plan adds one fix in each category rather than buying another software tool, because the gap was never technical.",
  "tip": "Category asks 'how is it implemented', type asks 'what does it do'. If an answer choice mixes the two lists, such as 'preventive' offered for a category question, eliminate it.",
  "check": [
   [
    "A company writes a rule that all servers must be patched within 14 days. An administrator then applies the patches each month. Which category is each?",
    "The rule is managerial because it directs what should happen; the administrator applying patches is operational because a person performs the task."
   ],
   [
    "Is a badge reader on a server room door a technical or physical control?",
    "Physical, because its main purpose is to control entry to a physical space, even though it uses electronics."
   ],
   [
    "An auditor finds firewalls, EDR and encryption but no risk assessment. Which category is weak?",
    "Managerial, because nothing governs or justifies which controls are needed."
   ],
   [
    "Why is 'detective' not a valid answer when asked for a control category?",
    "Detective is a control type describing what a control does, not a category describing how it is implemented."
   ]
  ]
 },
 {
  "t": "Control types: preventive, deterrent, detective, corrective, compensating, directive",
  "body": [
   "Control types describe what a control does to a threat, independent of how it is implemented. SY0-701 lists six: preventive, deterrent, detective, corrective, compensating and directive. Every control has a category (technical, managerial, operational or physical) and a type, and exam questions deliberately mix the two lists, so knowing both vocabularies precisely is worth easy points. Understanding types also helps real design work: a good program stops what it can, notices what it cannot stop, and fixes the damage when something gets through.",
   "Preventive controls stop an incident from happening at all. Firewall rules that block traffic, locked doors, MFA, input validation and separation of duties are preventive. Deterrent controls discourage an attacker from trying, but do not physically or technically stop them. Warning signs, visible cameras, login banners that warn of prosecution and lighting around a building are deterrents. The key difference: a preventive control still works against someone who ignores it, while a deterrent only works if the attacker is put off. A fence prevents; a 'trespassers will be prosecuted' sign deters.",
   "Detective controls identify and record that something happened or is happening. Intrusion detection systems (IDS), log review, security information and event management (SIEM) alerts, audits, file integrity monitoring and motion sensors are detective. They do not stop the event, but they let you respond. Corrective controls fix or reduce damage after an incident: restoring from backup, reimaging an infected host, applying a patch after exploitation, or an intrusion prevention system (IPS) terminating a malicious session. Detective finds; corrective repairs.",
   "Compensating controls are alternatives used when the preferred control is not possible or practical. If a legacy medical device cannot be patched, isolating it on its own network segment with tight firewall rules compensates for the missing patch. If a small team cannot fully separate duties, extra management review of logs compensates. A compensating control should address the same risk to a similar degree, and it is usually documented as a formal exception. Directive controls tell people what to do or not do: policies, acceptable use agreements, procedures, signs saying 'authorized personnel only' and training instructions. They rely on people choosing to comply.",
   "A worked walk-through makes the lifecycle clear. Imagine ransomware aimed at a file server. Email filtering and application allow listing are preventive. A policy forbidding users from running unapproved software is directive. The login banner warning that activity is monitored is deterrent. EDR raising an alert when files are being mass-encrypted is detective. Restoring the files from immutable backups is corrective. And if the file server runs an old operating system that cannot receive the vendor's fix, putting it behind a restrictive firewall is compensating. One threat, six types, and a question could ask about any of them.",
   "Many controls have more than one type, and the exam wants the best fit for the scenario. A visible camera is detective because it records, and deterrent because people see it. A guard can deter, detect and prevent. When a question describes a single function, answer that function. 'Cameras were installed so incidents could be reviewed later' is detective. 'Cameras were mounted in plain view to discourage theft' is deterrent. Read the purpose in the sentence rather than picking the control's most famous role.",
   "Common mistakes: calling an IDS preventive (it detects; an IPS placed inline can prevent); calling backups preventive (backups do not stop the incident, they support recovery, so the restore is corrective, though some texts also call backups a recovery control); confusing deterrent and directive (deterrent discourages attackers with consequences; directive instructs people who are expected to comply, usually insiders); and assuming a compensating control is just any extra control. Compensating specifically replaces a control that cannot be used as intended.",
   "Question framing tends to follow clue words. 'Stop', 'block', 'prevent' point to preventive. 'Discourage', 'warn', 'visible' point to deterrent. 'Identify', 'alert', 'log', 'discover', 'after the fact review' point to detective. 'Restore', 'remediate', 'recover', 'fix' point to corrective. 'Cannot be patched', 'alternative', 'legacy', 'exception' point to compensating. 'Policy', 'instruct', 'must', 'acceptable use' point to directive. When a scenario says a requirement cannot be met and asks what to do, compensating is almost always the answer."
  ],
  "terms": [
   [
    "Preventive control",
    "Stops an incident before it happens, such as a firewall rule, lock or MFA."
   ],
   [
    "Deterrent control",
    "Discourages an attacker from trying, such as a warning sign, visible camera or login banner."
   ],
   [
    "Detective control",
    "Identifies or records an incident, such as an IDS, SIEM alert, audit or log review."
   ],
   [
    "Corrective control",
    "Limits damage and restores normal operation after an incident, such as restoring backups or reimaging."
   ],
   [
    "Compensating control",
    "An alternative control used when the primary control cannot be implemented, addressing the same risk."
   ],
   [
    "Directive control",
    "Instructs people on required behavior, such as a policy, procedure or acceptable use agreement."
   ]
  ],
  "example": "A hospital runs an imaging system on an operating system the vendor no longer patches, and replacing it would cost millions. The security team places it on an isolated VLAN, allows only the imaging workstations to reach it, and adds extra monitoring of its traffic. They document these compensating controls in a risk exception signed by the business owner, and review the exception every quarter until the device is replaced.",
  "tip": "When a question says the normal control 'cannot' be applied, look for compensating. When a control only discourages but would not physically stop a determined attacker, it is deterrent, not preventive.",
  "check": [
   [
    "An IDS alerts on suspicious traffic but does not block it. What type of control is it?",
    "Detective, because it identifies and reports the activity without stopping it."
   ],
   [
    "A company cannot enable MFA on a legacy application, so it restricts access to that app to a single jump server with MFA. What type of control is this?",
    "Compensating, because it provides an alternative way to reduce the same risk when the preferred control is not possible."
   ],
   [
    "A sign reading 'Visitors must sign in at reception' is posted in the lobby. Is it deterrent or directive?",
    "Directive, because it instructs people what to do rather than threatening consequences to discourage an attacker."
   ],
   [
    "Why is restoring from backup considered corrective rather than preventive?",
    "It does not stop the incident; it repairs the damage and returns systems to normal afterward."
   ]
  ]
 },
 {
  "t": "CIA triad, AAA, non-repudiation",
  "body": [
   "The CIA triad is the basic model for what security protects. Confidentiality means only authorized people can read information. Integrity means information is accurate and has not been changed without authorization. Availability means systems and data are there when authorized users need them. Nearly every control you study maps to one or more of these goals, and many exam questions quietly ask 'which part of the triad is affected?' Some texts use DAD (disclosure, alteration, destruction or denial) for the opposite of CIA, which helps you map an attack to the goal it harms.",
   "Each goal has typical controls. Confidentiality relies on encryption, access controls, data classification and masking. Integrity relies on hashing, digital signatures, file integrity monitoring and change control. Availability relies on redundancy, backups, patching, load balancing, capacity planning and distributed denial-of-service (DDoS) protection. Goals can pull against each other: tighter access controls improve confidentiality but can hurt availability if legitimate users are locked out, and a hospital may deliberately favor availability for clinical systems. Security design is often about balancing these trade-offs for the business. The right balance comes from asking what the data or system is used for: a public marketing website needs integrity and availability far more than confidentiality, while a database of medical records needs all three.",
   "AAA stands for authentication, authorization and accounting, the framework that controls and records access. It usually follows identification, where a subject claims an identity such as a username. Authentication proves that claim, with a password, token, certificate or biometric. Authorization decides what the authenticated subject may do, based on permissions, roles or attributes. Accounting records what the subject actually did, through logs and audit trails, so activity can be reviewed and billed. Protocols such as RADIUS and TACACS+ provide centralized AAA for network devices and remote access.",
   "Walk through a login to see the steps in order. You type 'jsmith' (identification). You enter a password and approve a push notification on your phone (authentication with two factors). The system checks your group membership and lets you open the finance share but not the HR share (authorization). The file server logs that jsmith opened budget.xlsx at 09:14 from a specific workstation (accounting). If any step is weak, the others suffer: strong authorization means little if authentication can be bypassed, and good authentication means little without accounting to investigate misuse.",
   "SY0-701 also names the authentication of systems, not only people. Devices can authenticate with certificates or a Trusted Platform Module (TPM), and services authenticate to each other with keys or tokens. Authorization models include role-based, attribute-based, rule-based, mandatory and discretionary access control, covered later. For now, remember that authorization always comes after authentication; a system cannot decide what you may do until it knows who you are. Also remember that accounting only helps if logs are protected from tampering and actually reviewed, which is why they are often sent to a central system that ordinary administrators cannot alter.",
   "Non-repudiation means a person cannot credibly deny having performed an action, such as sending a message or approving a transaction. It is usually achieved with digital signatures: only the holder of a private key could have created the signature, and anyone with the matching public key can verify it. Non-repudiation combines integrity (the message has not changed since signing) with proof of origin. A shared password or a symmetric key cannot provide it, because more than one party holds the secret, so either could have produced the message.",
   "Common mistakes: thinking hashing provides confidentiality (it provides integrity; a hash does not hide the data, it detects change); thinking encryption alone provides integrity (encryption hides content, but you need a hash, message authentication code or signature to detect tampering); confusing authentication with authorization; and assuming logs alone give non-repudiation. Logs support accounting, but a user can argue someone else used their account, while a signature created with a private key only they control is much harder to deny.",
   "Exam framing: questions often describe an incident and ask which CIA element was affected. A DDoS or ransomware lockout hits availability. A leaked database hits confidentiality. A changed payroll record hits integrity. For AAA, clue words are 'prove identity' (authentication), 'permissions' or 'what they can access' (authorization), and 'track', 'log' or 'audit trail' (accounting). If a question asks how to prove who sent something or to prevent denial of an action, the answer is a digital signature."
  ],
  "terms": [
   [
    "Confidentiality",
    "Ensuring only authorized parties can access information."
   ],
   [
    "Integrity",
    "Ensuring information is accurate and unchanged except by authorized processes."
   ],
   [
    "Availability",
    "Ensuring systems and data are accessible to authorized users when needed."
   ],
   [
    "Authentication",
    "Proving a claimed identity, for example with a password, token, certificate or biometric."
   ],
   [
    "Authorization",
    "Determining what an authenticated subject is allowed to do."
   ],
   [
    "Accounting",
    "Recording user activity so it can be reviewed, audited or billed."
   ],
   [
    "Non-repudiation",
    "Assurance that someone cannot deny an action, typically provided by digital signatures."
   ]
  ],
  "example": "A manager claims she never approved a large wire transfer. The payment system requires approvers to sign each transaction with a private key stored on a smart card, and the log shows her card and PIN were used at her workstation. Because only she holds that key and the signature verifies against her certificate, the company has non-repudiation. Accounting logs show the time and device, and integrity is confirmed because the signed amount matches the amount paid.",
  "tip": "Hashing gives integrity, encryption gives confidentiality, and digital signatures give integrity plus non-repudiation. Symmetric encryption can never give non-repudiation because both parties share the key.",
  "check": [
   [
    "A ransomware attack encrypts a file server and the business cannot work. Which CIA goal was primarily harmed?",
    "Availability, because authorized users cannot access the data when they need it."
   ],
   [
    "A user logs in successfully but is denied access to the payroll folder. Which AAA function denied access?",
    "Authorization, because the user was already authenticated and the system decided what they may access."
   ],
   [
    "Why can a message authentication code built from a shared secret key not provide non-repudiation?",
    "Both sender and receiver hold the same key, so either could have created the code and the sender can deny it."
   ],
   [
    "An attacker silently changes prices in a product database. Which CIA goal is affected and which control would detect it?",
    "Integrity; hashing or file and database integrity monitoring would detect the unauthorized change."
   ]
  ]
 },
 {
  "t": "Zero trust: control plane vs data plane, policy engine, PEP",
  "body": [
   "Zero trust is a security model built on the idea 'never trust, always verify'. Older networks relied on a strong perimeter: once you were inside the office network or connected to the VPN, you were largely trusted. That fails when an attacker phishes one user and then moves freely inside. Zero trust removes implicit trust based on network location. Every request to access a resource is evaluated on its own, using identity, device health and context, and access is granted with least privilege for just that session. It matters because users, devices and data now live everywhere, in offices, homes and clouds, so 'inside' no longer means 'safe'.",
   "SY0-701 describes zero trust as having two planes. The control plane is where access decisions are made and policy is managed. The data plane is where the actual traffic between users and resources flows and where decisions are enforced. Separating them means the logic that decides who gets in is protected and centralized, while enforcement can happen close to each resource. You will see a similar split in networking, where routers' control plane builds routing tables and the data plane forwards packets.",
   "The control plane contains the policy engine and the policy administrator. The policy engine makes the decision: it takes the request, evaluates it against policy and inputs such as identity, group membership, device posture, threat intelligence, location and time, and returns grant, deny or revoke. The policy administrator acts on that decision by establishing or shutting down the communication path, for example issuing a session token or telling the enforcement point to open a connection. Together the engine and administrator are often called the policy decision point (PDP).",
   "The data plane contains the policy enforcement point (PEP). The PEP sits between the subject (the user or device) and the resource, and it enables, monitors and terminates connections based on instructions from the control plane. A PEP might be a gateway, an identity-aware proxy, an agent on a device or a microsegmentation firewall. The subject never talks directly to the resource without passing through a PEP. Zero trust also defines implicit trust zones: the area behind the PEP where traffic is trusted after the check. Good designs make these zones as small as possible.",
   "Walk through a request. A contractor opens the company's project tracker from a laptop. The request reaches the PEP, an access proxy, which forwards details to the policy engine. The engine checks that the user authenticated with MFA, that the laptop is managed and patched, that the user's role allows the tracker, and that the login location is normal. It decides 'grant, read-only'. The policy administrator tells the PEP to open a session limited to that application. Twenty minutes later EDR reports malware on the laptop; the engine re-evaluates and the administrator tells the PEP to cut the session. That continuous evaluation is the heart of zero trust.",
   "Key concepts the objectives list include adaptive identity (authentication strength that changes with risk, such as asking for another factor when a login looks unusual), threat scope reduction (limiting what any single identity or device can reach), policy-driven access control, and subject/system versus the resource being protected. Microsegmentation and software-defined perimeters are common ways to build zero trust in practice.",
   "Common mistakes: thinking zero trust is a product you can buy (it is an architecture and a strategy, built from many tools); thinking it means authenticating once more strongly (it means evaluating every request and continuing to evaluate during the session); mixing up which plane each component lives in; and assuming zero trust removes the need for encryption or segmentation. It relies on both.",
   "Exam questions typically name a component and ask what it does, or describe a function and ask which component performs it. Remember: the engine decides, the administrator executes the decision by creating or tearing down the path, and the enforcement point lets traffic through or blocks it. 'Makes the decision' is the policy engine. 'Establishes or terminates the session' is the policy administrator. 'Sits in the path', 'gateway' or 'enforces' is the PEP, in the data plane. Clue phrases such as 'no implicit trust based on network location' or 'continuous verification' point to zero trust itself."
  ],
  "terms": [
   [
    "Zero trust",
    "A security model that removes implicit trust based on network location and verifies every access request."
   ],
   [
    "Control plane",
    "The part of a zero trust architecture that manages policy and makes access decisions."
   ],
   [
    "Data plane",
    "The part of a zero trust architecture where traffic flows and access decisions are enforced."
   ],
   [
    "Policy engine",
    "The control plane component that evaluates a request against policy and decides to grant, deny or revoke."
   ],
   [
    "Policy administrator",
    "The control plane component that carries out the engine's decision by establishing or ending sessions."
   ],
   [
    "Policy enforcement point (PEP)",
    "The data plane component between subject and resource that allows, monitors or terminates connections."
   ],
   [
    "Adaptive identity",
    "Adjusting authentication requirements based on risk signals such as location, device and behavior."
   ],
   [
    "Implicit trust zone",
    "The area behind a PEP where traffic is trusted after passing the check; kept as small as possible."
   ]
  ],
  "example": "A company replaces its always-on VPN with an access proxy in front of each internal web application. Every request is evaluated by a central policy engine that checks MFA, device compliance from the endpoint management system and the user's role. When a sales laptop falls out of compliance because its disk encryption was disabled, the engine revokes access and the proxy blocks the next request, even though the user's password and MFA were still valid.",
  "tip": "Decision is control plane (policy engine and policy administrator); enforcement is data plane (PEP). If an answer puts the PEP in the control plane, it is wrong.",
  "check": [
   [
    "Which zero trust component actually decides whether a user may access a resource?",
    "The policy engine, in the control plane, evaluates the request against policy and returns grant, deny or revoke."
   ],
   [
    "A gateway between users and an application blocks a session after being told to. Which component is it and in which plane?",
    "The policy enforcement point, which lives in the data plane."
   ],
   [
    "Why does zero trust keep evaluating a session after the user has logged in?",
    "Conditions change, such as a device becoming infected, so continuous verification lets access be revoked when risk rises."
   ],
   [
    "How does zero trust differ from a traditional perimeter model?",
    "It grants no trust based on network location; every request is verified using identity, device and context."
   ]
  ]
 },
 {
  "t": "Physical security and deception tech (honeypots, honeynets, honeytokens)",
  "body": [
   "Physical security protects buildings, rooms and equipment, and it matters because a person with physical access can bypass many technical controls: they can steal a laptop, plug a rogue device into a network port, or read a password taped to a monitor. SY0-701 expects you to know the common physical controls, what each is good for, and how they layer from the outside of a site inward. Think of rings: the perimeter, the building, restricted areas inside, and finally the individual rack or device.",
   "At the perimeter, bollards (short, sturdy posts) stop vehicles from ramming entrances, fences mark and restrict the boundary, and lighting deters intruders and helps cameras. Video surveillance (CCTV) records and can deter, and security guards add human judgment and can respond. Entry points use access badges, often with proximity cards, and an access control vestibule, sometimes called a mantrap, which is a small space with two doors where only one can open at a time. Vestibules defeat tailgating (following someone through a door without their knowledge) and piggybacking (following with their consent).",
   "Sensors extend coverage where people cannot watch. Infrared sensors detect heat, pressure sensors detect weight on a floor or mat, microwave sensors detect motion by reflected signals, and ultrasonic sensors use sound waves. Inside the building, locked server rooms, locking racks and cable locks protect equipment, and visitor logs plus escort rules track who is present. Remember that physical controls are also judged against safety: a door must often fail open in a fire so people can escape, which affects how you design locks. Environmental controls such as fire suppression, temperature and humidity monitoring, and protected power also belong in the physical layer because they keep equipment available.",
   "Deception technology takes a different approach. Instead of only keeping attackers out, it gives them something tempting and fake, so any interaction is a strong signal of malicious activity. A honeypot is a single decoy system, such as a fake server with seemingly vulnerable services, that has no legitimate business use. Because nobody should touch it, every connection is suspicious, which makes alerts high-quality with very few false positives. A honeynet is a network of honeypots that imitates a realistic environment, letting defenders observe attacker behavior across several systems.",
   "Honeytokens (also called honeyfiles or canary tokens in some tools) are fake pieces of data rather than whole systems: a fake administrator account in the directory, a bogus database record, fake AWS-style credentials in a configuration file, or a document named 'passwords.xlsx' that alerts when opened. If the token is used or the file is opened, you know someone is where they should not be. DNS sinkholes, which redirect known-bad domains to a controlled address, are another deceptive or disruption technique listed in the objectives.",
   "Here is how a team might deploy deception. They create a fake service account called 'svc_backup_admin' with no real permissions and monitor for any login attempts. They place a document named 'VPN credentials' on a file share with a tracking beacon. They stand up a honeypot server in the same subnet as the real database servers and send its logs to the SIEM. Nothing legitimate uses any of these, so the alert rule is simple: any activity at all is an incident to investigate.",
   "Common mistakes: believing honeypots prevent attacks (they are primarily detective and help gather intelligence about attacker techniques); placing a honeypot where it can be used to attack real systems (it must be isolated and carefully monitored); confusing a honeynet with a honeypot; and forgetting that deception needs monitoring to have any value. On the physical side, people often mix up tailgating and piggybacking, or forget that a vestibule, not a badge reader alone, is the control that stops them.",
   "Exam questions tend to describe a goal. 'Detect an attacker already inside the network with few false positives' points to a honeypot or honeytoken. 'Observe attacker behavior across multiple fake systems' points to a honeynet. 'Alert if stolen data or credentials are used' points to a honeytoken. For physical questions, 'stop vehicles' is bollards, 'prevent tailgating' is an access control vestibule, and 'detect body heat in a dark room' is an infrared sensor."
  ],
  "terms": [
   [
    "Bollard",
    "A short, sturdy post that blocks vehicles from reaching entrances or buildings."
   ],
   [
    "Access control vestibule",
    "A small room with two interlocking doors that allows one person through at a time; also called a mantrap."
   ],
   [
    "Tailgating",
    "Following an authorized person through a secured entrance without their knowledge; piggybacking is with their consent."
   ],
   [
    "Honeypot",
    "A decoy system with no legitimate use, designed to attract attackers and detect their activity."
   ],
   [
    "Honeynet",
    "A network of honeypots that simulates a real environment to observe attacker behavior."
   ],
   [
    "Honeytoken",
    "Fake data, such as a bogus account, record or credential, that triggers an alert when used or accessed."
   ],
   [
    "DNS sinkhole",
    "A DNS server configuration that returns a controlled address for known-malicious domains to disrupt and detect malware."
   ]
  ],
  "example": "A retailer seeds its customer database with ten fake customer records whose email addresses exist only for this purpose. Months later, one of those addresses receives a phishing email. That tells the security team the database was copied, even though no other alert fired, and they begin an investigation that finds a compromised developer account. In the same review, they add a vestibule at the data center entrance after badge logs show frequent tailgating.",
  "tip": "Honeypot is a fake system, honeynet is a fake network of systems, honeytoken is fake data. All are primarily detective: any interaction is suspicious because nothing legitimate should touch them.",
  "check": [
   [
    "Why do honeypots produce very few false positives?",
    "They have no legitimate business purpose, so any access to them is likely unauthorized."
   ],
   [
    "Which control best stops an unauthorized person from following an employee through a secure door?",
    "An access control vestibule (mantrap), which only lets one person through at a time."
   ],
   [
    "A fake 'domain admin' account exists solely to alert when someone tries to log in with it. What is it?",
    "A honeytoken, a piece of fake data or credential used to detect intrusion."
   ],
   [
    "What must be in place for deception technology to provide any value?",
    "Monitoring and alerting, so interactions with the decoys are noticed and investigated."
   ]
  ]
 },
 {
  "t": "Change management: approval, CAB, impact analysis, backout plan, maintenance window",
  "body": [
   "Change management is the formal process for proposing, approving, testing, implementing and documenting changes to systems. It matters for security because unplanned or poorly tested changes cause outages (an availability problem), open accidental holes such as a firewall rule left too broad, and make incidents harder to investigate because nobody knows what changed. A good process lets the organization change quickly and safely at the same time. SY0-701 treats change management as part of security operations, not just IT administration.",
   "A typical change moves through clear steps. Someone submits a request describing what will change, why, and which systems are affected. An owner is identified: the person or team accountable for the system. Stakeholders, meaning anyone the change affects, are consulted; that includes business users who will notice downtime, not only technical teams. An impact analysis estimates the risk: what could break, which services depend on the system, and how long an outage would last. A test is run in a non-production environment where possible. Then the change is approved or rejected, scheduled, implemented, verified, and documented.",
   "The change advisory board (CAB) is the group that reviews and approves significant changes. It usually includes representatives from IT operations, security, the application owners and the business. The CAB weighs the impact analysis against the benefit, checks that testing and a backout plan exist, and makes sure changes do not collide with each other or with busy business periods. Standard, low-risk changes can be pre-approved, and emergency changes follow a faster path with review afterward, but they are still recorded.",
   "A backout plan (rollback plan) describes exactly how to return to the previous working state if the change fails. It might be restoring a configuration backup, reverting a virtual machine snapshot or reinstalling the previous software version. A maintenance window is a pre-agreed period, often overnight or at a weekend, when changes are allowed because business impact will be lowest. A change that cannot be finished and verified within the window should be backed out rather than left half done. The backout plan should be tested where possible, because a rollback that has never been tried may fail at exactly the moment it is needed, turning a failed change into a long outage.",
   "Consider a worked example. A team wants to upgrade the web server's TLS library. Their request lists the servers, the reason (a vulnerability), and dependencies such as the load balancer and an old partner integration. Impact analysis notes that disabling old protocol versions may break that partner. They test in staging, confirm the partner connects, document the steps, and attach a backout plan. The CAB approves the change for Saturday 01:00 to 03:00. During the window the upgrade succeeds and the team verifies the site, so the backout plan is not needed; the ticket is closed and documentation updated.",
   "SY0-701 also lists technical implications you must think about: allow lists and deny lists that may need updating, restricted activities during a change, planned downtime, service or application restarts, legacy applications that may not tolerate the change, and dependencies between systems. Afterward, documentation must be updated, including diagrams, policies and procedures, and version control should track changes to code and configuration so you can see exactly what changed and when.",
   "Common mistakes: treating the CAB as the people who perform the change (they approve; technicians implement); skipping the backout plan because the change 'is simple'; confusing impact analysis (what could go wrong and how badly) with a test (proving it works); and forgetting that emergency changes still need documentation. Another trap is thinking change management only slows things down. Its real value is fewer self-inflicted outages and a clear record for incident investigations.",
   "Exam questions usually describe a symptom and ask what was missing. 'A change caused an outage and the team could not quickly restore service' points to a missing backout plan. 'An update broke a dependent application nobody had considered' points to a missing impact analysis. 'Changes were made during business hours and disrupted customers' points to not using a maintenance window. 'Who approves the change?' is the CAB, and 'unauthorized change discovered in a configuration' points to a failure of the change management process itself."
  ],
  "terms": [
   [
    "Change management",
    "The formal process for requesting, approving, testing, implementing and documenting changes."
   ],
   [
    "Change advisory board (CAB)",
    "The group that reviews and approves or rejects significant changes."
   ],
   [
    "Impact analysis",
    "An assessment of what a change could affect, how badly and how likely, before it is approved."
   ],
   [
    "Backout plan",
    "Documented steps to return a system to its previous state if a change fails."
   ],
   [
    "Maintenance window",
    "A pre-agreed time when changes are allowed because business impact is lowest."
   ],
   [
    "Stakeholder",
    "Anyone affected by a change who should be consulted or informed."
   ],
   [
    "Version control",
    "Tracking changes to code or configuration over time so they can be reviewed and reverted."
   ]
  ],
  "example": "A network engineer changes a core switch configuration at 14:00 on a weekday without a ticket, and the finance VLAN loses connectivity for two hours. The post-incident review finds no impact analysis, no approval, no saved configuration to roll back to and no maintenance window. The company enforces the change process: all network changes now need CAB approval, a saved backup configuration as the backout plan, and scheduling in the Sunday maintenance window unless declared an emergency.",
  "tip": "If a question says a failed change could not be reversed quickly, the missing piece is the backout plan. If it says a dependency broke unexpectedly, the missing piece is impact analysis.",
  "check": [
   [
    "What is the purpose of a backout plan?",
    "To restore the previous working state quickly if a change fails or causes problems."
   ],
   [
    "A patch is approved but applied at noon, disrupting customers. Which change management element was ignored?",
    "The maintenance window, which schedules changes for low-impact times."
   ],
   [
    "Why is change management considered a security control?",
    "It prevents unauthorized or untested changes that can create vulnerabilities or outages, and it provides a record for investigations."
   ],
   [
    "Who approves a significant change, and who usually implements it?",
    "The change advisory board approves it; technical staff or the system owner's team implement it."
   ]
  ]
 },
 {
  "t": "Symmetric vs asymmetric encryption, key exchange",
  "body": [
   "Encryption turns readable plaintext into unreadable ciphertext using an algorithm and a key, so only someone with the right key can turn it back. It protects confidentiality for data at rest (on disks and in databases) and in transit (across networks). Security+ expects you to know the two families of encryption, what each is good at, and how real systems combine them. Nearly every secure protocol you will meet, from HTTPS to VPNs to encrypted messaging, is a combination of the ideas in this lesson.",
   "Symmetric encryption uses one shared secret key for both encryption and decryption. It is fast and efficient, so it is used for bulk data such as whole disks, files, and the body of a network session. The Advanced Encryption Standard (AES), with 128-, 192- or 256-bit keys, is the modern standard; older algorithms such as DES and 3DES are deprecated because their keys are too short or they are too slow. Symmetric ciphers come as block ciphers, which encrypt fixed-size blocks (AES uses 128-bit blocks), and stream ciphers, which encrypt data one bit or byte at a time (such as ChaCha20). The big weakness of symmetric encryption is key distribution: both sides need the same secret, and sending it safely to someone you have never met is hard. It also scales poorly, because every pair of people needs its own key, so n people need n(n-1)/2 keys.",
   "Asymmetric encryption, also called public key cryptography, uses a mathematically linked key pair. The public key can be shared with anyone; the private key is kept secret by its owner. Data encrypted with the public key can only be decrypted with the matching private key, so anyone can send you a confidential message without a prior shared secret. Used the other way around, a private key creates digital signatures that anyone can verify with the public key. Common algorithms are RSA, which relies on the difficulty of factoring large numbers, and elliptic curve cryptography (ECC), which offers similar strength with much smaller keys and so suits mobile and low-power devices. Asymmetric encryption is far slower than symmetric, so it is not used for bulk data.",
   "Real systems use a hybrid approach that gets the best of both. Asymmetric cryptography is used briefly to authenticate the parties and agree on a random symmetric session key; the session key then encrypts all the actual data quickly. Transport Layer Security (TLS), which protects HTTPS, works this way, as do IPsec VPNs and S/MIME email. The process of safely establishing that shared session key is called key exchange.",
   "Here is a simplified TLS walk-through. Your browser connects to a bank's website. The server sends its certificate, which contains its public key and is signed by a certificate authority your browser trusts. The browser and server then run an ephemeral Diffie-Hellman exchange (usually the elliptic curve version, ECDHE). Each side generates a temporary key pair, they swap public values, and each independently computes the same shared secret, which is never sent across the network. The server signs its part of the exchange with its private key to prove it is really the bank. Both sides derive symmetric session keys, and from then on AES or ChaCha20 protects the traffic.",
   "Diffie-Hellman (DH) is a key agreement protocol, not an encryption algorithm: it lets two parties create a shared secret over an untrusted network. On its own it does not authenticate anyone, which is why it is paired with certificates and signatures. Using fresh ephemeral keys for each session provides perfect forward secrecy (PFS): if the server's long-term private key is stolen later, past recorded sessions still cannot be decrypted, because their session keys were never derived from that long-term key. Key length also matters; longer keys resist brute force better, and the exam may say that ECC gives equivalent security to RSA with shorter keys.",
   "Common mistakes: saying asymmetric encryption is used to encrypt large files (it is used to protect keys and create signatures); thinking you encrypt with your own private key to keep a message secret (you encrypt with the recipient's public key, and sign with your own private key); believing Diffie-Hellman encrypts data; and assuming longer is always practical, when very long keys cost performance. Another misconception is that symmetric encryption is weaker. AES-256 is extremely strong; its challenge is key distribution, not strength.",
   "Exam questions often ask which to choose. 'Fast', 'bulk', 'large volume', 'full disk' point to symmetric (AES). 'No pre-shared secret', 'many users', 'digital signature', 'key pair' point to asymmetric (RSA or ECC). 'Low-power device' or 'smaller key size' point to ECC. 'Establish a shared key over an insecure channel' points to Diffie-Hellman, and 'past sessions stay safe if the server key is compromised' points to perfect forward secrecy."
  ],
  "terms": [
   [
    "Symmetric encryption",
    "Encryption that uses the same secret key to encrypt and decrypt; fast and suited to bulk data."
   ],
   [
    "Asymmetric encryption",
    "Encryption that uses a public/private key pair; slower but solves key distribution and enables signatures."
   ],
   [
    "AES",
    "Advanced Encryption Standard, the current standard symmetric block cipher with 128-, 192- or 256-bit keys."
   ],
   [
    "ECC",
    "Elliptic curve cryptography, an asymmetric approach offering strong security with smaller keys."
   ],
   [
    "Diffie-Hellman",
    "A key agreement method that lets two parties derive a shared secret over an untrusted network."
   ],
   [
    "Session key",
    "A temporary symmetric key used to encrypt one communication session."
   ],
   [
    "Perfect forward secrecy",
    "Use of ephemeral keys so that compromise of a long-term key does not expose past sessions."
   ]
  ],
  "example": "A company's customer portal uses TLS. When a customer connects, the server proves its identity with its RSA certificate, and the two sides use ECDHE to agree a session key that is never transmitted. The rest of the session, including uploaded documents, is encrypted with AES-GCM. A year later the server's private key is leaked in a backup; because the portal used ephemeral key exchange, recorded past sessions still cannot be decrypted.",
  "tip": "Symmetric for speed and bulk data, asymmetric for key exchange and signatures, and hybrid in practice. To send a secret, use the recipient's public key; to sign, use your own private key.",
  "check": [
   [
    "Why don't systems encrypt large files directly with RSA?",
    "Asymmetric encryption is much slower than symmetric, so it is used to protect a symmetric key that encrypts the data."
   ],
   [
    "What problem does Diffie-Hellman solve, and what does it not do on its own?",
    "It lets two parties agree on a shared secret over an insecure network; on its own it does not authenticate either party."
   ],
   [
    "Fifty employees each need a private channel with every other employee using only symmetric keys. Why is this a problem?",
    "It requires a separate shared key for every pair (1,225 keys), which is hard to distribute and manage securely."
   ],
   [
    "What does perfect forward secrecy protect against?",
    "Decryption of previously recorded sessions if the server's long-term private key is later compromised."
   ]
  ]
 },
 {
  "t": "Hashing, salting, key stretching",
  "body": [
   "A hash function takes input of any size and produces a fixed-length output called a hash, digest or fingerprint. The same input always gives the same hash, but even a one-character change produces a completely different result. A good cryptographic hash is one-way, meaning you cannot work backward from the hash to the input, and collision-resistant, meaning it is infeasible to find two different inputs with the same hash. Hashing protects integrity, not confidentiality: it does not hide data, it lets you detect whether data has changed. It is also the foundation of how systems should store passwords.",
   "Common algorithms you should recognize: SHA-256 and the rest of the SHA-2 family, and SHA-3, are current and trusted. MD5 and SHA-1 are broken for collision resistance and should not be used for security purposes, though you may still see MD5 used as a quick checksum. A hash-based message authentication code (HMAC) combines a hash with a secret key, so it proves both integrity and that the sender knew the key, which is how many protocols protect messages in transit. Hashes also appear in digital signatures (the signer signs a hash of the document rather than the whole document), in blockchain records, in forensic evidence handling (an investigator hashes a disk image to prove it has not changed since acquisition), and in file integrity monitoring tools that alert when system files change.",
   "File integrity is the simplest use. A vendor publishes the SHA-256 hash of an installer; after you download it you compute the hash yourself and compare. If they match, the file was not corrupted or tampered with. There is an important catch: if an attacker can replace both the installer and the hash on the same web page, the check proves nothing, which is why vendors also sign their releases. On Linux or Windows you might compute the hash like this:",
   "```\nsha256sum installer.iso\n# Windows PowerShell\nGet-FileHash .\\installer.iso -Algorithm SHA256\n```",
   "Passwords should never be stored in plaintext or with reversible encryption. Instead the system stores a hash; at login it hashes what you typed and compares. Plain hashes have weaknesses, though. Identical passwords produce identical hashes, so an attacker who steals the database can see which users share a password, and can use precomputed rainbow tables (huge lookup tables of hash-to-password pairs) to reverse common passwords instantly. A salt fixes this. A salt is a random value, unique per user, added to the password before hashing and stored alongside the hash. It does not need to be secret; its job is to make every hash unique so precomputed tables are useless and each password must be attacked separately.",
   "Key stretching makes each guess slow. Instead of hashing once, a key stretching function runs the hash many thousands of times, or uses a deliberately memory-hard design, so checking one guess takes, say, a fraction of a second. That is unnoticeable to a user logging in but devastating to an attacker trying billions of guesses offline. Algorithms built for this include PBKDF2, bcrypt, scrypt and Argon2. A modern password store therefore uses a per-user salt plus a key stretching algorithm. Some systems also add a pepper, a secret value kept separately from the database, as an extra layer.",
   "Common mistakes: calling hashing encryption (encryption is reversible with a key; hashing is not meant to be reversed); thinking the salt must be kept secret (it is stored in the clear next to the hash); believing a salt slows down brute force (it defeats precomputation and hides duplicates; key stretching is what slows each guess); and using a fast hash such as plain SHA-256 for passwords, which is fine for file integrity but far too fast for password storage. People also assume a longer hash output means a hash can store more data; a hash is always the same length no matter how big the input, which is exactly why collisions must exist in theory and why only collision-resistant algorithms should be trusted.",
   "Exam questions usually ask for the best control. 'Verify a download was not modified' points to hashing. 'Defeat rainbow tables' or 'identical passwords have different hashes' points to salting. 'Make brute force attacks slower' or 'increase the work factor' points to key stretching (bcrypt, PBKDF2, Argon2). 'Integrity and authentication of a message with a shared key' points to HMAC. If an option says to 'decrypt the password hash', eliminate it."
  ],
  "terms": [
   [
    "Hash",
    "A fixed-length, one-way output of a hash function used to verify integrity."
   ],
   [
    "Collision",
    "Two different inputs that produce the same hash, which breaks a hash function's security."
   ],
   [
    "Salt",
    "A random, per-user value added to a password before hashing to make each hash unique."
   ],
   [
    "Rainbow table",
    "A precomputed table of hashes and matching passwords used to reverse unsalted hashes quickly."
   ],
   [
    "Key stretching",
    "Repeating or strengthening a hash so each guess is slow, using algorithms like PBKDF2, bcrypt or Argon2."
   ],
   [
    "HMAC",
    "A hash-based message authentication code that combines a hash with a secret key for integrity and authenticity."
   ],
   [
    "Pepper",
    "A secret value added to passwords before hashing that is stored separately from the password database."
   ]
  ],
  "example": "An attacker steals a web application's user table. Because the developers used bcrypt with a unique salt for each account, two users with the password 'Summer2024' have different hashes, rainbow tables are useless, and each guess takes the attacker hundreds of milliseconds per account. The company still forces a password reset, but most strong passwords remain uncracked while the incident is contained.",
  "tip": "Salt defeats rainbow tables and hides duplicate passwords; key stretching slows brute force. Hashing is for integrity and is never 'decrypted'.",
  "check": [
   [
    "Two users choose the same password. Without salting, what can an attacker who steals the database learn?",
    "That both accounts share a password, because their hashes are identical, and cracking one cracks both."
   ],
   [
    "Why is SHA-256 a good choice for checking a downloaded file but a poor choice alone for storing passwords?",
    "It is fast, which is good for integrity checks but lets attackers test billions of password guesses quickly."
   ],
   [
    "Does a salt need to be kept secret? Why or why not?",
    "No; it is stored with the hash, and its purpose is to make each hash unique rather than to be a secret."
   ],
   [
    "Which control increases the time needed for each password guess?",
    "Key stretching, such as bcrypt, PBKDF2 or Argon2."
   ]
  ]
 },
 {
  "t": "Encryption levels: full disk, partition, file, database, record",
  "body": [
   "Encryption can be applied at different levels of granularity, from an entire drive down to a single field in a database. Choosing the right level matters because each one protects against different threats and has different costs in performance and management. The key question to ask is: when is the data decrypted, and who can see it once it is? A control that protects a stolen laptop may do nothing against an attacker who logs in as a valid user. SY0-701 lists full disk, partition, volume, file, database and record encryption, plus transport encryption for data in motion.",
   "Full disk encryption (FDE) encrypts everything on a drive, including the operating system, swap space and temporary files. Examples are BitLocker on Windows and FileVault on macOS, usually tied to a Trusted Platform Module (TPM) that releases the key only if the boot process has not been tampered with. Self-encrypting drives (SEDs) do the same in the drive's hardware, often following the Opal standard. FDE is excellent for lost or stolen devices: without the key, the disk is unreadable. Its limitation is that once the system has booted and a user has logged in, the data is transparently decrypted for anyone using the machine, including malware running as that user.",
   "Partition and volume encryption protect a specific partition or logical volume rather than the whole disk, for example a separate data volume on a server. Volume-level encryption is also common in cloud storage, where the provider encrypts a block storage volume. File-level encryption protects individual files or folders, such as the Windows Encrypting File System (EFS) or encrypting a file with a tool before emailing it. File encryption stays attached to the file even if it is copied elsewhere (depending on the tool), and it can be tied to specific users, so it protects against other users of the same machine.",
   "Database encryption protects data inside a database. Transparent data encryption (TDE) encrypts the database files on disk, protecting against someone stealing the files or backups, but the database engine decrypts data for any authorized query. Record-level or column-level (field-level) encryption goes further, encrypting specific sensitive fields such as credit card numbers or national ID numbers, sometimes with keys held by the application rather than the database. Then even a database administrator browsing the tables sees only ciphertext.",
   "A worked example shows why layers help. A healthcare company runs patient records on a server. BitLocker on the server protects the disks if hardware is stolen or a drive is returned for repair. TDE protects the database files and backups if they are copied off the server. Column-level encryption on the diagnosis and ID number fields protects against an administrator or an attacker with SQL access reading the most sensitive values. And TLS protects the data as it moves to the clinicians' browsers. Each layer covers a gap the others leave.",
   "The trade-offs follow a pattern. Broader encryption (full disk) is simple to deploy and invisible to users but only protects data when the device is off or locked. Narrower encryption (record or field) protects against more insiders and compromised accounts but is more complex: applications must be changed, searching and indexing encrypted fields is harder, and key management becomes critical. Key management runs through every level; if the key is stored next to the data with no protection, the encryption adds little.",
   "Common mistakes: believing FDE protects data from malware or a remote attacker on a running, logged-in system (it does not); assuming TDE stops a malicious DBA (the database decrypts for authorized queries, so it does not); and forgetting that data copied off an encrypted disk to a USB drive or email is no longer protected unless it is encrypted at the file level too. Also remember that encryption at rest does nothing for data in transit; you still need TLS or a VPN.",
   "Exam framing: 'lost or stolen laptop' points to full disk encryption. 'Protect a single sensitive file shared by email' points to file encryption. 'Protect database files and backups' points to database-level (transparent) encryption. 'Protect credit card numbers even from administrators' or 'encrypt only specific fields' points to record, column or field-level encryption. Look for who the attacker is and what access they have, then pick the narrowest level that still protects against them."
  ],
  "terms": [
   [
    "Full disk encryption (FDE)",
    "Encrypting an entire drive, including the OS, so data is unreadable without the key when the device is off."
   ],
   [
    "Self-encrypting drive (SED)",
    "A drive that performs full disk encryption in its own hardware."
   ],
   [
    "Volume encryption",
    "Encrypting a specific partition or logical volume rather than the whole disk."
   ],
   [
    "File-level encryption",
    "Encrypting individual files or folders, often tied to specific users."
   ],
   [
    "Transparent data encryption (TDE)",
    "Database encryption of data and log files at rest, decrypted automatically for authorized queries."
   ],
   [
    "Record-level encryption",
    "Encrypting individual records or fields, such as card numbers, within a database."
   ]
  ],
  "example": "A payment processor already uses full disk encryption on every server, but an audit finds that database administrators can read full card numbers. The company adds column-level encryption to the card number field, with keys held in a hardware security module that only the payment application can use. Administrators can still maintain the database, but queries run by them return ciphertext for that column.",
  "tip": "Match the level to the threat: stolen device means full disk; single file sharing means file-level; insider or compromised DB account reading sensitive fields means record or column-level.",
  "check": [
   [
    "A laptop with full disk encryption is infected with malware while the user is logged in. Does FDE protect the files from the malware?",
    "No; once the system is booted and unlocked, files are decrypted transparently for any process running as the user."
   ],
   [
    "Why might a company choose field-level encryption over transparent database encryption for credit card numbers?",
    "Field-level encryption keeps card numbers unreadable even to administrators and attackers with database access, while TDE decrypts for any authorized query."
   ],
   [
    "What is a practical downside of record-level encryption?",
    "It adds complexity: applications must handle keys, and searching or indexing encrypted fields is harder."
   ],
   [
    "A user copies a file from an encrypted laptop to a USB stick. Is the copy still protected by FDE?",
    "No; FDE only protects data on that disk. The copy needs file-level or USB drive encryption."
   ]
  ]
 },
 {
  "t": "Obfuscation: steganography, tokenization, data masking",
  "body": [
   "Obfuscation means making data hard to understand or recognize, without necessarily using encryption. Security+ groups three techniques under this heading: steganography, tokenization and data masking. Each hides information in a different way and for a different purpose, and exam questions test whether you can pick the right one for a scenario. They matter because encryption is not always the best fit: sometimes you need to use data without exposing it, test with realistic data, or detect hidden communications.",
   "Steganography hides the existence of a message by concealing it inside something ordinary, such as an image, audio file, video or even network traffic. For example, data can be hidden in the least significant bits of pixel colors in a picture; the image looks unchanged to a human eye. Encryption hides what a message says; steganography hides that a message exists at all. Attackers use it to smuggle data out of an organization or to hide malware commands inside images, so defenders should know it as something to detect: unusual file sizes, images with odd statistical properties, or large volumes of image uploads to strange destinations. Legitimate uses include digital watermarking to prove ownership.",
   "Tokenization replaces a sensitive value with a random substitute called a token that has no mathematical relationship to the original. The real value is stored in a secure token vault, and only the vault can map the token back. Because there is no key or algorithm to reverse, stealing tokens is useless to an attacker. Payment systems use tokenization heavily: a merchant stores a token instead of the real card number, which greatly reduces how much of its environment falls under Payment Card Industry Data Security Standard (PCI DSS) requirements. Mobile payment wallets also use tokens so the real card number is never shared with the merchant.",
   "Data masking hides part or all of a value so that people or systems see only what they need. A customer service screen might show a card number as '**** **** **** 4821' or an ID number as 'XXX-XX-6789'. Static masking permanently replaces real data in a copy, commonly used to build realistic test or development databases without exposing real customer details. Dynamic masking hides data on the fly at display time based on the viewer's role, while the stored data stays intact. Masking is usually one-way in the copy you are looking at; you cannot recover the original from it.",
   "Let's walk through one company using all three ideas. An online store processes a card: the payment gateway returns a token such as 'tok_8Fq2...', which the store saves in its order database instead of the card number. Support agents see only the last four digits because of dynamic masking in the support tool. Developers test new features against a nightly copy of the database in which names, emails and addresses have been replaced by static masking. Meanwhile the security team's data loss prevention (DLP) tools watch for large image uploads to unusual sites, because steganography could be used to smuggle data out.",
   "The distinctions the exam tests are about reversibility and purpose. Encryption is reversible by anyone with the key. Tokenization is reversible only through the vault, and tokens themselves contain nothing of value. Masking is generally not reversible from the masked output. Hashing is not reversible at all. Steganography is about concealment, not protection; if the hidden data is found and not also encrypted, it can be read.",
   "Common mistakes: thinking tokenization is a type of encryption (it is not; there is no key to steal, only a lookup in a protected vault); assuming masking protects the stored data (dynamic masking only changes what is displayed, so the database itself still needs protection); treating steganography as a strong security control (it is security through obscurity and is mostly relevant on the exam as a data exfiltration or covert channel technique); and confusing static masking with tokenization. If the original must be recoverable later for business use, tokenization fits; if it never needs to be recovered, masking fits.",
   "Exam clue words: 'hidden inside an image', 'conceal the existence of data', 'covert' point to steganography. 'Replace card numbers with a surrogate value', 'reduce PCI scope', 'token vault' point to tokenization. 'Show only the last four digits', 'realistic test data without real customer information' point to data masking. When a question asks which method lets a system later retrieve the original card number while storing nothing sensitive locally, choose tokenization."
  ],
  "terms": [
   [
    "Obfuscation",
    "Making data difficult to understand or recognize, with or without encryption."
   ],
   [
    "Steganography",
    "Hiding data inside another file or medium so its existence is concealed."
   ],
   [
    "Tokenization",
    "Replacing a sensitive value with a random token that can only be mapped back through a secure vault."
   ],
   [
    "Token vault",
    "The protected system that stores the mapping between tokens and original sensitive values."
   ],
   [
    "Data masking",
    "Hiding part or all of a data value, such as showing only the last four digits of a card."
   ],
   [
    "Static masking",
    "Permanently replacing sensitive values in a copy of data, often for testing."
   ],
   [
    "Dynamic masking",
    "Hiding data at display time based on the viewer's role while stored data stays unchanged."
   ]
  ],
  "example": "A subscription service wants to charge customers monthly without storing card numbers. It sends each card to its payment provider once and receives a token, which it stores for future charges. When attackers later breach the service's database, they get only tokens that are useless outside the provider's vault, and the company's PCI assessment scope is much smaller because card numbers never touch its systems.",
  "tip": "Tokenization has no key or math link to the original, so stolen tokens are worthless; masking hides data on display or in copies; steganography hides that data exists at all.",
  "check": [
   [
    "A developer needs a realistic copy of production data for testing without real customer names. Which technique fits?",
    "Static data masking, which replaces real values in the test copy with realistic but fake data."
   ],
   [
    "Why does tokenization reduce PCI DSS scope?",
    "Systems store tokens instead of card numbers, so they no longer hold cardholder data and fall outside much of the standard's scope."
   ],
   [
    "How does steganography differ from encryption?",
    "Encryption makes a message unreadable; steganography hides the fact that a message exists at all."
   ],
   [
    "Does dynamic masking protect data if an attacker steals the database files?",
    "No; it only affects what is displayed to users, so the stored data remains unmasked and needs other protection."
   ]
  ]
 },
 {
  "t": "Public/private keys, key escrow",
  "body": [
   "Public key cryptography depends on key pairs. Each pair has a public key, which can be shared freely, and a private key, which must stay secret with its owner. The two are mathematically related so that what one key does, only the other can undo, yet the private key cannot practically be worked out from the public key. Managing these keys properly, including how they are created, stored, shared, backed up, rotated and destroyed, is as important as the algorithms themselves. Most real-world cryptographic failures come from poor key management rather than broken math.",
   "There are two main uses of the pair and it is essential to get the direction right. For confidentiality, the sender encrypts with the recipient's public key, and only the recipient's private key can decrypt. For authentication, integrity and non-repudiation, the owner signs with their own private key, and anyone can verify the signature with the owner's public key. A simple memory aid: to keep something secret for Bob, use Bob's public key; to prove something came from Alice, Alice uses her private key.",
   "Public keys are distributed inside digital certificates, which bind a public key to an identity (a person, server or device) and are signed by a certificate authority (CA). That binding matters: without it, an attacker could hand you their own public key while claiming to be your bank. The collection of CAs, certificates, policies and processes that makes this work is called a public key infrastructure (PKI), covered in the next lesson.",
   "The key lifecycle includes several steps. Generation should use a strong random number source and, for high-value keys, happen inside secure hardware such as a hardware security module (HSM) or TPM. Storage should protect the private key with strong access control, and ideally make it non-exportable. Distribution only ever involves public keys. Rotation replaces keys periodically or after suspected compromise. Revocation tells others a key should no longer be trusted, and destruction securely removes old keys when they are no longer needed. Keys are often classified by use; separate keys for signing and encryption are common good practice.",
   "Key escrow means a copy of a private or secret key is held by a trusted third party or a secure internal system so it can be recovered if needed. Organizations use escrow when losing a key would mean losing data: if an employee's encryption key is lost or the employee leaves, the company can still decrypt business files. BitLocker recovery keys stored in a directory service or device management system are a common real-world example. Escrow is also discussed in the context of lawful access by authorities.",
   "Walk through a practical case. A company issues each employee an email encryption certificate. When generated, the encryption private key is archived in the company's key recovery system, protected so that recovery requires two authorized administrators (dual control). An employee leaves suddenly, and legal needs to read encrypted messages in her mailbox. Two administrators follow the documented procedure, recover the key, and the recovery is logged. Her signing key, however, was never escrowed, because escrowing it would let someone else create signatures in her name and destroy non-repudiation.",
   "Common mistakes: encrypting with your own private key to keep something confidential (that creates a signature, which anyone can verify, so it hides nothing); sharing the private key with a colleague to 'help out'; assuming escrow is risk-free (the escrow store becomes a high-value target and needs strong protection, separation of duties and auditing); and escrowing signing keys. Escrow suits encryption keys, where recovery of data matters, not signing keys, where exclusive control matters.",
   "Exam framing: questions ask which key is used for a task. 'Send a confidential message to Bob' is Bob's public key. 'Decrypt a message sent to you' is your private key. 'Sign a document' is the signer's private key, and 'verify a signature' is the signer's public key. 'Recover encrypted data after an employee leaves or loses a key' points to key escrow or key recovery. 'Protect the escrow process from a single rogue administrator' points to M of N control or dual control."
  ],
  "terms": [
   [
    "Public key",
    "The shareable half of a key pair, used to encrypt data for the owner or verify the owner's signatures."
   ],
   [
    "Private key",
    "The secret half of a key pair, used to decrypt data sent to the owner or create digital signatures."
   ],
   [
    "Key pair",
    "A mathematically linked public and private key used in asymmetric cryptography."
   ],
   [
    "Key escrow",
    "Storing a copy of a key with a trusted party or system so it can be recovered when needed."
   ],
   [
    "Key rotation",
    "Replacing keys periodically or after suspected compromise to limit exposure."
   ],
   [
    "Dual control",
    "Requiring two or more authorized people to perform a sensitive action, such as recovering an escrowed key."
   ],
   [
    "Public key infrastructure (PKI)",
    "The CAs, certificates, policies and processes used to manage and trust public keys."
   ]
  ],
  "example": "A laptop's BitLocker-protected drive will not unlock after a motherboard replacement because the TPM no longer matches. The help desk retrieves the 48-digit recovery key that was automatically escrowed to the company's device management system when the drive was encrypted. The user is back to work in minutes, and the retrieval is logged for audit.",
  "tip": "Encrypt with the recipient's public key; sign with your own private key. Escrow encryption keys for recovery, but never signing keys, because that would undermine non-repudiation.",
  "check": [
   [
    "Alice wants to send Bob a confidential file. Which key does she use to encrypt it?",
    "Bob's public key, so only Bob's private key can decrypt it."
   ],
   [
    "Why should a company not escrow employees' signing keys?",
    "If someone else can use the signing key, the employee could deny signing, which undermines non-repudiation."
   ],
   [
    "What is the main risk of key escrow?",
    "The escrow system becomes a valuable target; if compromised, many keys and much encrypted data are exposed."
   ],
   [
    "An employee leaves and their encrypted files must be read. What makes this possible?",
    "Key escrow or key recovery, where a copy of the encryption key was securely stored in advance."
   ]
  ]
 },
 {
  "t": "Certificates: CA, CSR, root of trust, self-signed, wildcard, SAN",
  "body": [
   "A digital certificate is an electronic document that binds a public key to an identity, such as a website's domain name, a person or a device. It is digitally signed by a certificate authority (CA) that vouches for that binding. When your browser connects to a site over HTTPS, it checks the certificate to confirm it is talking to the real site and not an impostor. Most certificates follow the X.509 standard and contain fields such as the subject (who it is for), the issuer (which CA signed it), a serial number, validity dates, the public key, allowed key usages and the CA's signature.",
   "Trust works as a chain. A root CA sits at the top; its certificate is self-signed and comes preinstalled in operating systems and browsers, forming the root of trust. For safety, root CAs are usually kept offline and sign intermediate CAs, which in turn issue certificates to servers and users. When your browser receives a server certificate, it follows the chain: the server certificate was signed by an intermediate, which was signed by a root the browser already trusts. If any link fails to verify, has expired or has been revoked, you see a warning. Servers must send the intermediate certificates along with their own, or some clients cannot build the chain.",
   "To obtain a certificate you create a certificate signing request (CSR). You first generate a key pair on your server, then create a CSR containing your public key and identity details such as the common name and organization, and sign the CSR with your private key. The private key never leaves your server. The CA validates that you control the domain (and, for higher-assurance certificates, that your organization exists), then issues a signed certificate. A typical command looks like this:",
   "```\nopenssl req -new -newkey rsa:2048 -nodes \\\n  -keyout www.example.com.key \\\n  -out www.example.com.csr \\\n  -subj \"/CN=www.example.com/O=Example Ltd\"\n```",
   "Certificates come in several forms. A self-signed certificate is signed by its own private key rather than a trusted CA. It encrypts traffic just as well, but browsers and clients do not trust it by default, so it suits labs, internal testing or devices where you control the trust store; it is a poor choice for public websites. Organizations can also run an internal (private) CA for their own devices and users. A wildcard certificate covers all first-level subdomains of a domain with an entry such as *.example.com, so it matches www.example.com and mail.example.com but not example.com itself or a.b.example.com. A Subject Alternative Name (SAN) certificate lists several specific names, even from different domains, such as example.com, www.example.com and shop.example.net. Modern browsers rely on the SAN field for name matching.",
   "Other terms appear in the objectives. Certificates can be pinned by applications that expect a specific key. A third-party CA is a public, commercial or nonprofit CA whose roots are widely trusted. Key usage fields limit what a certificate may do, such as server authentication, code signing or email protection. Certificate expiration is a common cause of outages, which is why organizations track certificates in an inventory and automate renewal where possible. Certificate transparency logs, public records of issued certificates, let domain owners spot certificates issued for their names that they never requested.",
   "Common mistakes: thinking a self-signed certificate provides no encryption (it encrypts fine; it lacks trusted identity verification); believing a wildcard covers multiple levels of subdomains or the bare domain; sending the private key to the CA (only the CSR, which contains the public key, is sent); and assuming the root CA signs every server certificate directly (intermediates do that in most real hierarchies). Another risk is wildcard overuse: if the one private key is stolen from any server, every subdomain can be impersonated.",
   "Exam clue words: 'many subdomains of one domain' points to a wildcard. 'Several different domain names on one certificate' points to SAN. 'Internal lab or test system, no need for public trust' points to self-signed or internal CA. 'Request sent to the CA containing the public key' is the CSR. 'Preinstalled trust anchor' or 'top of the chain' is the root of trust. 'Browser warning because the chain is incomplete' points to a missing intermediate certificate."
  ],
  "terms": [
   [
    "Certificate authority (CA)",
    "A trusted entity that validates identities and signs digital certificates."
   ],
   [
    "Certificate signing request (CSR)",
    "A request containing a public key and identity details, sent to a CA to obtain a certificate."
   ],
   [
    "Root of trust",
    "The trusted anchor, usually a root CA certificate preinstalled in the trust store, from which trust chains are built."
   ],
   [
    "Intermediate CA",
    "A CA signed by the root that issues end-entity certificates, keeping the root offline."
   ],
   [
    "Self-signed certificate",
    "A certificate signed with its own private key rather than by a trusted CA."
   ],
   [
    "Wildcard certificate",
    "A certificate for all first-level subdomains of a domain, such as *.example.com."
   ],
   [
    "Subject Alternative Name (SAN)",
    "A certificate field listing multiple specific host names or domains the certificate is valid for."
   ]
  ],
  "example": "A company runs example.com, www.example.com and its newly acquired brand shop-example.net. Instead of three separate certificates, it requests one SAN certificate listing all three names. For its many internal test servers it uses certificates from its own internal CA, whose root is pushed to company laptops through group policy, so employees get no warnings but outsiders are not asked to trust those systems.",
  "tip": "Wildcard means one level of subdomains under a single domain; SAN means a list of specific names, possibly across different domains.",
  "check": [
   [
    "Does *.example.com cover example.com and dev.app.example.com?",
    "No; a wildcard covers only one level of subdomain, such as www.example.com, not the bare domain or deeper levels."
   ],
   [
    "What does a CSR contain, and what does it deliberately not contain?",
    "It contains the public key and identity details, signed by the requester; it never contains the private key."
   ],
   [
    "Why do most public CAs use intermediate CAs rather than signing server certificates with the root?",
    "So the root key can stay offline and protected; if an intermediate is compromised it can be revoked without replacing the root."
   ],
   [
    "Users see certificate warnings for an internal web app that uses a self-signed certificate. What is the proper fix?",
    "Issue the certificate from a trusted internal or public CA, or distribute the internal CA root to managed devices, rather than telling users to click through."
   ]
  ]
 },
 {
  "t": "Revocation: CRL vs OCSP, OCSP stapling",
  "body": [
   "Certificates have an expiration date, but sometimes a certificate must stop being trusted before then. The private key may have been stolen, the domain sold, the employee who held it may have left, or the CA may have issued it by mistake. Revocation is how a CA announces 'do not trust this certificate any more'. It matters because a stolen private key with a still-trusted certificate lets an attacker impersonate a site or person perfectly until the certificate is revoked and clients actually check. Security+ tests the two main checking methods and the improvement called OCSP stapling. A related idea is certificate suspension, sometimes called a hold, which temporarily marks a certificate as untrusted and can later be lifted, whereas revocation is permanent.",
   "A certificate revocation list (CRL) is a file published and signed by the CA that lists the serial numbers of revoked certificates, with the revocation date and often a reason code (such as key compromise or superseded). Each certificate includes a CRL distribution point telling clients where to download the list. The client downloads the CRL, verifies the CA's signature on it, and checks whether the certificate's serial number appears. CRLs are simple and can be cached, but they have drawbacks: they can grow large, they are only as current as the last publication (a certificate revoked an hour ago might not appear until the next update), and clients must download the whole list to check one certificate.",
   "The Online Certificate Status Protocol (OCSP) answers the question for a single certificate in real time. The client sends the certificate's serial number to the CA's OCSP responder, and the responder returns a signed answer: good, revoked or unknown. This is faster and more current than downloading a whole CRL. Its drawbacks are that every client must contact the responder, adding delay to connections and load on the CA, and it leaks privacy: the CA learns which sites each user visits. If the responder is unreachable, many browsers 'soft fail' and accept the certificate anyway, which weakens the protection. Attackers who can block traffic to the responder can take advantage of that behavior.",
   "OCSP stapling fixes most of these problems. Instead of every client asking the CA, the web server itself periodically requests a signed OCSP response for its own certificate and caches it. During the TLS handshake, the server 'staples' this time-stamped, CA-signed response to the certificate it sends. The client verifies the CA's signature on the stapled response and has current revocation status without contacting the CA. Because the response is signed by the CA, the server cannot forge a 'good' status. Result: faster connections, less load on the CA, and no privacy leak. Stapled responses have a short validity period, so the server must refresh them regularly; if it serves an expired response, clients may reject it or fall back to asking the CA directly. Some certificates are issued with a 'must-staple' flag, which tells clients to refuse the connection if no valid stapled response is provided, closing the soft-fail gap.",
   "Here is a practical walk-through. A company discovers that its web server's private key was copied from a misconfigured backup. The administrator asks the CA to revoke the certificate with the reason 'key compromise', generates a new key pair and CSR, and installs the new certificate. The CA adds the old serial number to its next CRL and its OCSP responder immediately begins answering 'revoked'. You can check a certificate's status from the command line, for example:",
   "```\nopenssl ocsp -issuer intermediate.pem -cert server.pem \\\n  -url <OCSP responder URL from the certificate>\n# stapling check during a TLS handshake\nopenssl s_client -connect www.example.com:443 -status\n```",
   "Common mistakes: thinking expiration and revocation are the same (expiration is planned, revocation is early withdrawal of trust); thinking OCSP stapling means the server decides the status (the CA still signs the response; the server only delivers it); forgetting that CRLs can be out of date between publications; and assuming revocation happens automatically when a key is stolen. Someone must request it, and the organization must also replace the certificate, otherwise the site will simply stop working. Revocation also only protects clients that actually check.",
   "Exam clue words: 'downloadable list of revoked serial numbers' or 'published periodically' points to CRL. 'Real-time status check of a single certificate' points to OCSP. 'Server includes the signed status in the handshake', 'reduce load on the CA' or 'improve privacy and performance' points to OCSP stapling. If a question asks what to do first when a private key is compromised, revoke the certificate and then reissue with a new key pair."
  ],
  "terms": [
   [
    "Revocation",
    "Invalidating a certificate before its expiration date, for example after key compromise."
   ],
   [
    "Certificate revocation list (CRL)",
    "A CA-signed list of revoked certificate serial numbers published periodically."
   ],
   [
    "CRL distribution point",
    "A field in a certificate that tells clients where to download the CRL."
   ],
   [
    "OCSP",
    "Online Certificate Status Protocol, which returns the real-time status of a single certificate."
   ],
   [
    "OCSP responder",
    "The CA server that answers OCSP requests with signed good, revoked or unknown responses."
   ],
   [
    "OCSP stapling",
    "The server attaches a recent CA-signed OCSP response to its certificate during the TLS handshake."
   ],
   [
    "Soft fail",
    "A client behavior that accepts a certificate when revocation status cannot be checked."
   ]
  ],
  "example": "A popular site with millions of visitors enables OCSP stapling after noticing that page loads stall whenever the CA's OCSP responder is slow. Now the web server fetches a fresh signed status every few hours and includes it in each handshake. Visitors' browsers verify the CA's signature on the stapled response, connections are faster, and the CA no longer sees a request from each visitor.",
  "tip": "CRL is a whole list downloaded periodically; OCSP is a per-certificate real-time query; stapling moves the OCSP query to the server, which delivers the CA-signed answer in the handshake.",
  "check": [
   [
    "Why might a CRL fail to show a certificate that was revoked this morning?",
    "CRLs are published periodically, so the revocation may not appear until the next list is issued."
   ],
   [
    "In OCSP stapling, why can't a malicious server lie that its revoked certificate is good?",
    "The stapled response is signed by the CA, and the client verifies that signature, so the server cannot forge it."
   ],
   [
    "Name two drawbacks of plain OCSP that stapling addresses.",
    "Each client contacting the CA adds latency and load, and it reveals to the CA which sites users visit."
   ],
   [
    "A server's private key is stolen. What two actions are needed?",
    "Revoke the existing certificate and issue a new certificate with a newly generated key pair."
   ]
  ]
 },
 {
  "t": "Digital signatures",
  "body": [
   "A digital signature is the electronic equivalent of a tamper-evident seal plus a signature on paper, but mathematically much stronger. It proves three things about a message, file or piece of software: integrity (it has not changed since it was signed), authentication of origin (it came from the holder of a particular private key), and non-repudiation (the signer cannot credibly deny signing, because only they hold that key). Digital signatures protect software updates, email, documents, code, DNS records and the certificates that underpin HTTPS. They are also becoming a legal instrument: many jurisdictions accept properly implemented electronic signatures on contracts, and auditors rely on signed logs and records. Understanding exactly what a signature proves, and what it does not, keeps you from over- or under-trusting it.",
   "Signing works by combining hashing with asymmetric cryptography. Step one: the sender runs the message through a hash function such as SHA-256, producing a short digest. Step two: the sender uses their private key to sign that digest, creating the signature. Step three: the message and signature are sent together. Hashing first is efficient because the slow asymmetric operation only has to process a small digest, not the entire message.",
   "Verification reverses the process. The recipient hashes the received message with the same hash algorithm. Separately, they use the sender's public key to check the signature, which reveals the digest the sender signed. If the two digests match, the message is intact and was signed by the matching private key. If even one bit of the message changed, the hashes will not match and verification fails. Verification also fails if the wrong public key is used, if the signature was made with a different private key, or if the hash algorithm does not match, and a careful system treats any failure as untrusted rather than guessing which problem occurred. The recipient gets the sender's public key from a certificate, which links it to an identity through a trusted CA; without that link, you know the message came from 'some key' but not whose.",
   "A worked example: a software vendor releases an update. Its build server hashes the installer and signs the hash with the vendor's code-signing private key, which is stored in a hardware security module. Customers' operating systems verify the signature with the vendor's public key from its code-signing certificate before installing. If an attacker modifies the installer on a mirror site, the hash no longer matches and the system blocks installation or warns loudly. Many package managers do this automatically, refusing to install packages whose signatures do not verify against the distribution's trusted keys. On Linux you might verify a downloaded release manually like this:",
   "```\ngpg --verify release.tar.gz.sig release.tar.gz\n# Good signature from \"Example Project Release Key\"\n```",
   "Signatures are used across many technologies the exam mentions. Code signing protects executables, drivers and scripts. S/MIME and PGP sign email. DNSSEC signs DNS records. Document signing protects contracts and PDFs. Certificates themselves are signed by CAs, and the TLS handshake uses signatures to prove the server holds its private key. Common algorithms are RSA signatures, ECDSA (the elliptic curve digital signature algorithm) and EdDSA. Note that a digital signature does not encrypt the message; anyone can still read a signed but unencrypted email. If you need both secrecy and proof of origin, you sign with your private key and also encrypt with the recipient's public key.",
   "Common mistakes: saying the sender signs with the recipient's public key or their own public key (signing always uses the signer's private key); believing a signature keeps content confidential (it does not); confusing a digital signature with a scanned image of a handwritten signature (which proves nothing cryptographically); and forgetting that a signature is only as trustworthy as the protection of the private key. If the key is stolen, the attacker can sign malware that appears legitimate, which is why code-signing keys belong in HSMs and stolen keys must be revoked quickly.",
   "Exam questions typically ask which key signs and which verifies, or which security goal a signature provides. 'Prove the sender cannot deny sending' is non-repudiation, provided by a digital signature. 'Verify the software came from the vendor and was not altered' is code signing. 'Which key verifies the signature?' is the sender's public key. A question about hashing alone giving non-repudiation is a trap: a hash detects change, but anyone can compute a hash, so only a signature ties it to a person."
  ],
  "terms": [
   [
    "Digital signature",
    "A value created with a private key over a message's hash, proving integrity, origin and non-repudiation."
   ],
   [
    "Message digest",
    "The fixed-length hash of a message that is actually signed."
   ],
   [
    "Signing",
    "Using the signer's private key to create a signature over a digest."
   ],
   [
    "Verification",
    "Using the signer's public key to check a signature against a freshly computed hash."
   ],
   [
    "Code signing",
    "Digitally signing software so users can verify its publisher and that it was not modified."
   ],
   [
    "ECDSA",
    "Elliptic Curve Digital Signature Algorithm, a common signature algorithm using elliptic curve keys."
   ]
  ],
  "example": "A finance team receives an email from the CFO asking for an urgent payment change. The company requires S/MIME signatures on all payment instructions, and this message is unsigned while the CFO's real messages always carry a valid signature from her company-issued certificate. The team treats it as suspected business email compromise, calls the CFO on a known number, and confirms she never sent it.",
  "tip": "Sign with the sender's private key; verify with the sender's public key. A signature gives integrity, authentication and non-repudiation, but not confidentiality.",
  "check": [
   [
    "Which key does a recipient use to verify a digital signature?",
    "The sender's public key, usually obtained from the sender's certificate."
   ],
   [
    "Why is the message hashed before signing?",
    "Asymmetric operations are slow, so signing a small fixed-length digest is far more efficient than signing the whole message."
   ],
   [
    "An attacker changes one character in a signed contract. What happens during verification?",
    "The recipient's computed hash no longer matches the signed digest, so verification fails."
   ],
   [
    "Does a digitally signed email keep its contents secret?",
    "No; signing proves origin and integrity, but the message must also be encrypted to be confidential."
   ]
  ]
 },
 {
  "t": "TPM, HSM, secure enclave, key management system",
  "body": [
   "Cryptography is only as strong as the protection of its keys. If a private key sits in a plain file on disk, malware or a thief can copy it and every protection built on it collapses. Hardware-based key protection solves this by generating, storing and using keys inside tamper-resistant hardware, so the key material never appears in normal memory where software could steal it. SY0-701 names four related technologies: the Trusted Platform Module (TPM), the hardware security module (HSM), the secure enclave, and the key management system (KMS). Knowing which one fits which scenario is the main exam skill.",
   "A TPM is a small chip (or firmware equivalent) on a computer's motherboard. It securely stores keys and measurements for that one device. During boot it records hashes of the firmware, bootloader and operating system components in platform configuration registers; this is called measured boot. The TPM can 'seal' a key so it is released only if those measurements match the known-good state. BitLocker uses exactly this: if someone tampers with the boot process or moves the drive to another computer, the TPM will not release the key. TPMs also support remote attestation (proving the device's state to a server) and store keys for device identity and Windows Hello.",
   "An HSM is a dedicated, high-performance cryptographic device used by organizations, either as a network appliance, a plug-in card or a cloud service. It generates, stores and uses keys for many systems and applications: CA signing keys, code-signing keys, payment processing keys, and database encryption keys. HSMs are built to be tamper-resistant and often tamper-evident or tamper-responsive, erasing keys if the case is opened. They are frequently validated against standards such as FIPS 140, and they speed up cryptographic operations by offloading them from servers. Keys in an HSM are typically non-exportable: applications ask the HSM to sign or decrypt, and only the result comes back.",
   "A secure enclave is an isolated, protected area within a processor (or a separate security coprocessor) that runs sensitive code and holds secrets apart from the main operating system. Even if the OS is compromised, code outside the enclave cannot read its memory. Phones use secure enclaves to hold biometric templates and payment keys, and servers use trusted execution environments for confidential computing, where data is protected even while it is being processed (data in use).",
   "A key management system (KMS) is the software and processes that manage keys across their lifecycle: creation, distribution, rotation, access control, auditing, revocation and destruction. Cloud providers offer KMS services that let you create keys, grant specific services permission to use them, rotate them automatically and log every use. A KMS is often backed by HSMs underneath, so think of the KMS as the manager and the HSM as the vault.",
   "Walk through a realistic design. An online bank issues laptops with TPMs so disk encryption keys are sealed to the device's boot state. Its mobile app stores a device key in the phone's secure enclave, unlocked only by the customer's fingerprint. Its internal CA and payment signing keys live in a clustered pair of HSMs in two data centers. Its cloud databases are encrypted with keys managed by the cloud KMS, which rotates keys yearly, restricts use to the database service, and logs every decrypt call to the SIEM.",
   "Common mistakes: confusing TPM and HSM (a TPM protects one device; an HSM serves many systems and applications at enterprise scale); thinking a KMS is a physical chip (it is a management system, though it may use HSMs); and assuming hardware makes misuse impossible. If an attacker controls an application that is authorized to use an HSM key, they can ask the HSM to sign things. Access control and monitoring of key use still matter.",
   "Exam clue words: 'chip on the motherboard', 'measured boot', 'full disk encryption tied to the device', 'attestation' point to TPM. 'Centralized', 'high-volume', 'CA signing keys', 'tamper-resistant appliance', 'FIPS validated' point to HSM. 'Isolated area of the processor', 'biometric data on a phone' or 'protect data in use' point to a secure enclave. 'Create, rotate and audit keys across services' or 'cloud key service' points to a KMS."
  ],
  "terms": [
   [
    "Trusted Platform Module (TPM)",
    "A chip on a device's motherboard that securely stores keys and boot measurements for that device."
   ],
   [
    "Measured boot",
    "Recording hashes of boot components so their integrity can be checked or attested."
   ],
   [
    "Hardware security module (HSM)",
    "A tamper-resistant appliance or service that generates, stores and uses keys for many systems."
   ],
   [
    "Secure enclave",
    "An isolated, protected processor environment that keeps secrets and code separate from the main OS."
   ],
   [
    "Key management system (KMS)",
    "Software and processes that manage keys through their lifecycle, including rotation and auditing."
   ],
   [
    "Remote attestation",
    "A device proving its boot and configuration state to a remote server, typically using its TPM."
   ],
   [
    "Non-exportable key",
    "A key that can be used inside secure hardware but never extracted from it."
   ]
  ],
  "example": "A certificate authority's root signing key is generated inside an offline HSM that is kept in a safe and only powered on for ceremonies requiring three of five key custodians. Day-to-day certificate issuance uses an intermediate CA key held in an online HSM cluster. Even the CA's own administrators never see the raw key material; they can only ask the HSM to sign, and every request is logged.",
  "tip": "TPM equals one device (boot integrity, disk encryption); HSM equals enterprise-scale key vault and crypto processor; KMS equals lifecycle management; secure enclave equals isolated processor area for secrets and data in use.",
  "check": [
   [
    "A laptop's drive can only be decrypted if the boot process has not been tampered with. Which component makes this possible?",
    "The TPM, which seals the encryption key to measurements of the boot process."
   ],
   [
    "A company needs to protect its CA and code-signing keys and perform thousands of signatures per hour. What should it use?",
    "A hardware security module, which provides tamper-resistant key storage and high-performance cryptographic operations."
   ],
   [
    "How does a KMS differ from an HSM?",
    "A KMS manages keys across their lifecycle (creation, rotation, access, auditing); an HSM is the hardened hardware that stores and uses keys, and a KMS often uses HSMs underneath."
   ],
   [
    "Why does using an HSM not remove the need for access control?",
    "An attacker who compromises an application authorized to use the HSM can request operations with its keys, even without extracting them."
   ]
  ]
 },
 {
  "t": "OSI layers and where attacks happen",
  "body": [
   "The Open Systems Interconnection (OSI) model splits network communication into seven layers, each with a specific job. It is a conceptual model, not a protocol, but it gives security professionals a shared vocabulary: saying 'this is a Layer 2 attack' or 'we need a Layer 7 firewall' immediately tells colleagues what is involved. Security+ uses the layers to describe where attacks occur and which controls work there. A common memory aid from Layer 1 upward is 'Please Do Not Throw Sausage Pizza Away'.",
   "The layers, from bottom to top: Layer 1, Physical, carries raw bits over cables, fiber and radio. Layer 2, Data Link, moves frames between devices on the same local network using MAC addresses; switches work here. Layer 3, Network, routes packets between networks using IP addresses; routers work here. Layer 4, Transport, provides end-to-end delivery with TCP (reliable, connection-oriented) or UDP (fast, connectionless) and uses port numbers. Layer 5, Session, manages sessions between applications. Layer 6, Presentation, handles data formats, character encoding and often encryption. Layer 7, Application, is where protocols such as HTTP, DNS, SMTP and SSH operate for users and programs.",
   "When data is sent, each layer wraps the data from the layer above with its own header, which is called encapsulation. An HTTP request (Layer 7) is placed inside a TCP segment with source and destination ports (Layer 4), inside an IP packet with source and destination addresses (Layer 3), inside an Ethernet frame with MAC addresses (Layer 2), and finally sent as electrical or radio signals (Layer 1). The receiver unwraps each layer in reverse. Security devices inspect different depths of this stack, which is why a basic firewall sees IP addresses and ports but a web application firewall can read the HTTP request itself. The deeper a device inspects, the more it can understand, but the more processing it needs and the more it must decrypt.",
   "Attacks line up with layers. At Layer 1: cutting cables, wiretapping, radio jamming and physically plugging in a rogue device. At Layer 2: ARP poisoning, MAC flooding (filling a switch's address table so it floods traffic), MAC spoofing and VLAN hopping. At Layer 3: IP spoofing, ICMP floods and route manipulation. At Layer 4: SYN floods (exhausting a server with half-open TCP connections) and port scanning. At Layers 5 and 6: session hijacking and TLS downgrade or stripping attacks. At Layer 7: SQL injection, cross-site scripting, DNS poisoning, phishing content and application-level DDoS such as HTTP floods.",
   "Controls also map to layers. Locks, cable protection and shielding work at Layer 1. Port security, 802.1X, dynamic ARP inspection and VLANs work at Layer 2. Routers with ACLs and IPsec work at Layer 3. Stateful firewalls filtering on ports and connection state operate at Layer 4. TLS protects data at roughly Layers 5 and 6 (you may see it described as Layer 4 to 7 in different sources). Web application firewalls, next-generation firewalls with application awareness, email filters and secure coding work at Layer 7.",
   "Walk through a troubleshooting example. Users report a web shop is slow. The team checks the link lights and interface errors (Layer 1 and 2), finds normal traffic volumes at the router (Layer 3), sees no unusual SYN rates on the firewall (Layer 4), and finally finds thousands of legitimate-looking HTTP requests for the search page from many IPs. That is a Layer 7 DDoS, so a network-level rate limit on packets will not help much; a WAF rule or CDN challenge that understands HTTP is the right control.",
   "Common mistakes: placing switches at Layer 3 (standard switches are Layer 2, though 'Layer 3 switches' also route); thinking a traditional port-based firewall can stop SQL injection (it cannot see inside the application payload); confusing TCP and UDP roles; and assuming encryption at one layer protects everything. TLS protects application data, but IP addresses and ports remain visible to anyone on the path.",
   "Exam clue words: 'MAC address', 'switch', 'ARP' mean Layer 2. 'IP address', 'router', 'routing' mean Layer 3. 'Port', 'TCP handshake', 'SYN' mean Layer 4. 'HTTP', 'URL', 'SQL', 'application payload' mean Layer 7. When asked which device can stop an attack, match the device's inspection depth to the layer the attack lives in."
  ],
  "terms": [
   [
    "OSI model",
    "A seven-layer conceptual model describing how network communication is divided into functions."
   ],
   [
    "Encapsulation",
    "Wrapping data from a higher layer with each lower layer's header as it moves down the stack."
   ],
   [
    "Layer 2 (Data Link)",
    "The layer that moves frames between devices on the same local network using MAC addresses."
   ],
   [
    "Layer 3 (Network)",
    "The layer that routes packets between networks using IP addresses."
   ],
   [
    "Layer 4 (Transport)",
    "The layer that provides end-to-end delivery using TCP or UDP and port numbers."
   ],
   [
    "Layer 7 (Application)",
    "The layer where user-facing protocols such as HTTP, DNS and SMTP operate."
   ],
   [
    "SYN flood",
    "A Layer 4 denial-of-service attack that exhausts a server with half-open TCP connections."
   ]
  ],
  "example": "A university sees its switches flooding all traffic to every port in one building, letting any student capture classmates' traffic. Investigation shows a device sending thousands of frames with random source MAC addresses, filling the switch's MAC address table. The network team enables port security to limit the number of MAC addresses per port, a Layer 2 control for a Layer 2 attack.",
  "tip": "Match the control to the layer: Layer 2 attacks need switch features, Layer 3 and 4 attacks need routers and firewalls, and Layer 7 attacks like SQL injection or HTTP floods need a WAF or application-aware controls.",
  "check": [
   [
    "At which OSI layer does ARP poisoning occur, and why?",
    "Layer 2, because it manipulates the mapping of IP addresses to MAC addresses on the local network."
   ],
   [
    "Why can't a basic port-filtering firewall stop SQL injection on an allowed web port?",
    "It only inspects Layer 3 and 4 information such as IP addresses and ports, not the application payload where the injection lives."
   ],
   [
    "A server is overwhelmed by half-open TCP connections. Which layer is targeted?",
    "Layer 4, the transport layer, through a SYN flood."
   ],
   [
    "What does encapsulation mean in the OSI model?",
    "Each layer adds its own header around the data from the layer above as data moves down the stack for transmission."
   ]
  ]
 },
 {
  "t": "Secure vs insecure protocols: SSH/Telnet, SFTP/FTP, LDAPS/LDAP, HTTPS/HTTP, SNMPv3",
  "body": [
   "Many of the internet's oldest protocols were designed for trusted networks and send everything, including usernames and passwords, in cleartext. Anyone who can capture the traffic, for example on shared Wi-Fi or after an ARP poisoning attack, can read it. Security+ expects you to know each insecure protocol, its secure replacement, and the ports they use. The secure versions add three things through encryption and authentication: confidentiality (eavesdroppers cannot read the traffic), integrity (changes in transit are detected) and server, and sometimes client, authentication (you know you reached the real system). Knowing the pairs matters because 'replace X with Y' is one of the most common exam question patterns and one of the quickest wins in real hardening work.",
   "Remote administration: Telnet (TCP 23) gives a remote command line but sends everything, including the login, in cleartext. Secure Shell (SSH, TCP 22) replaces it with an encrypted, authenticated session and supports key-based login. File transfer: File Transfer Protocol (FTP, TCP 20 and 21) sends credentials and files in cleartext. SSH File Transfer Protocol (SFTP) runs over SSH on TCP 22. FTPS is a different protocol: FTP with TLS added (commonly on TCP 990 for implicit mode). Secure copy (SCP) also runs over SSH. Do not confuse SFTP with FTPS; they are different protocols that both protect file transfers. SFTP is often easier to firewall because it uses a single port, while FTPS inherits FTP's separate control and data channels, which can complicate firewall rules and NAT.",
   "Web: HTTP (TCP 80) is cleartext; HTTPS (TCP 443) is HTTP inside TLS, providing encryption, integrity and server authentication through certificates. HTTP Strict Transport Security (HSTS) tells browsers to always use HTTPS for a site, defeating attempts to downgrade users to HTTP. Directory services: Lightweight Directory Access Protocol (LDAP, TCP 389) queries directories such as Active Directory and can expose credentials when using simple binds. LDAPS (TCP 636) wraps LDAP in TLS; LDAP can also be upgraded on port 389 using StartTLS.",
   "Network management: Simple Network Management Protocol (SNMP, UDP 161 for queries and 162 for traps) monitors and configures network devices. SNMPv1 and v2c authenticate with community strings, which are effectively passwords sent in cleartext, and the defaults 'public' and 'private' are notorious. SNMPv3 adds real authentication, integrity and encryption, with per-user credentials. Other pairs the exam likes: email protocols can use TLS (SMTPS or STARTTLS, IMAPS on 993, POP3S on 995), DNS can be protected with DNSSEC for integrity, time can be protected with authenticated NTP, and SRTP (Secure Real-time Transport Protocol) secures voice and video traffic. The general rule is the same everywhere: if a protocol has a version that adds TLS, SSH or built-in cryptography, the exam expects you to choose that version.",
   "Here is a hardening walk-through for a switch. You check which management services are enabled, turn off Telnet and plain HTTP, turn on SSH and HTTPS, and replace SNMPv2c with SNMPv3 using authentication and privacy (encryption). On many network devices the configuration looks roughly like this:",
   "```\nno ip http server\nip http secure-server\nline vty 0 15\n transport input ssh\nsnmp-server group NETOPS v3 priv\nsnmp-server user monitor NETOPS v3 auth sha <secret> priv aes 128 <secret>\n```",
   "Common mistakes: believing a secure protocol fixes weak passwords (SSH with password 'admin' is still weak; use keys or strong credentials and MFA where possible); thinking SFTP is FTP over SSL (it is not; that is FTPS); leaving the insecure protocol enabled alongside the secure one, which lets attackers or misconfigured clients fall back to it; and forgetting that SNMPv3 must be configured with the 'priv' (privacy) level to encrypt, not just 'auth'. Also, HTTPS on a site does not mean the site is trustworthy, only that the connection is encrypted to whoever holds the certificate.",
   "Exam clue words: 'cleartext credentials captured', 'packet capture shows password' point to an insecure protocol that must be replaced. 'Encrypted remote command line' is SSH. 'Encrypted file transfer over the same port as remote shell' is SFTP. 'Secure directory queries' is LDAPS on 636. 'Secure monitoring of network devices' is SNMPv3. When a question lists ports, 22, 443, 636 and 993 are secure options; 21, 23, 80 and 389 are the insecure counterparts."
  ],
  "terms": [
   [
    "Telnet",
    "A cleartext remote terminal protocol on TCP 23, replaced by SSH."
   ],
   [
    "SSH",
    "Secure Shell, an encrypted remote access and tunneling protocol on TCP 22."
   ],
   [
    "SFTP",
    "SSH File Transfer Protocol, which transfers files over an encrypted SSH connection."
   ],
   [
    "FTPS",
    "FTP secured with TLS, a different protocol from SFTP."
   ],
   [
    "LDAPS",
    "LDAP over TLS, typically on TCP 636, protecting directory queries and binds."
   ],
   [
    "SNMPv3",
    "The version of SNMP that adds authentication, integrity and encryption with per-user credentials."
   ],
   [
    "HSTS",
    "HTTP Strict Transport Security, which tells browsers to use only HTTPS for a site."
   ]
  ],
  "example": "During a penetration test, the tester captures network traffic on a management VLAN and recovers the switch administrator's password from a Telnet session and the SNMP community string 'private'. The report recommends disabling Telnet in favor of SSH with key-based authentication, moving to SNMPv3 with authentication and encryption, and restricting management access to a dedicated jump server.",
  "tip": "SFTP runs over SSH on port 22; FTPS is FTP plus TLS. Both are secure, but they are different protocols, and the exam loves to swap them.",
  "check": [
   [
    "A packet capture shows an administrator's password in cleartext during a remote login on port 23. What should replace this protocol?",
    "SSH on port 22, which encrypts the whole session including credentials."
   ],
   [
    "What is the difference between SFTP and FTPS?",
    "SFTP is a file transfer protocol that runs over SSH; FTPS is traditional FTP with TLS encryption added."
   ],
   [
    "Why is SNMPv2c considered insecure?",
    "It authenticates with community strings sent in cleartext and offers no encryption, so anyone capturing traffic can read or reuse them."
   ],
   [
    "An organization enables SSH but leaves Telnet running. Why is this still a problem?",
    "Users or attackers can still connect with Telnet, exposing credentials in cleartext; insecure services must be disabled, not just supplemented."
   ]
  ]
 },
 {
  "t": "Key ports: 22, 25, 53, 80, 443, 389, 636, 3389",
  "body": [
   "A port number identifies which service on a host should receive network traffic. The IP address gets data to the right machine; the port gets it to the right program. Well-known ports (0 to 1023) are assigned to standard services, and Security+ expects you to recognize the important ones instantly. Ports matter for security because every open port is a potential entry point: firewall rules, scan results, log entries and hardening tasks are all written in terms of ports, so reading them fluently is a practical skill as well as an exam one.",
   "The core list in this lesson. Port 22 (TCP) is SSH, and also SFTP and SCP, for secure remote administration and file transfer. Port 25 (TCP) is SMTP, the Simple Mail Transfer Protocol, used between mail servers to deliver email. Port 53 is DNS, using UDP for most queries and TCP for zone transfers and large responses. Port 80 (TCP) is HTTP, unencrypted web traffic. Port 443 (TCP) is HTTPS, web traffic inside TLS; newer HTTP/3 also uses UDP 443. Port 389 is LDAP for directory queries. Port 636 is LDAPS, LDAP over TLS. Port 3389 (TCP) is the Remote Desktop Protocol (RDP), used for graphical remote access to Windows systems. A quick way to organize them: 22, 443 and 636 are the encrypted choices; 80 and 389 are their cleartext counterparts; 25 and 53 are infrastructure services every network depends on; and 3389 is a high-value remote access target.",
   "A few more are worth knowing because they appear in scenarios: 20 and 21 FTP, 23 Telnet, 67 and 68 DHCP, 88 Kerberos, 110 POP3 and 995 POP3S, 143 IMAP and 993 IMAPS, 123 NTP, 161 and 162 SNMP, 445 SMB (Windows file sharing), 514 syslog, 587 SMTP submission from mail clients (usually with STARTTLS), 1812 and 1813 RADIUS, 3306 MySQL and 1433 Microsoft SQL Server. You do not need to memorize every port in existence, but you should know the insecure ones and their secure counterparts.",
   "Here is how ports show up in practice. A scan of a server might produce output like this, and each open port is a question: should this be reachable, and from where?",
   "```\nPORT     STATE SERVICE\n22/tcp   open  ssh\n80/tcp   open  http\n443/tcp  open  https\n3389/tcp open  ms-wbt-server\n```",
   "On the host itself, `netstat -ano` on Windows or `ss -tulpn` on Linux lists listening ports and the process behind each, which helps you find the program responsible for an unexpected open port. Security thinking about ports follows a few rules. Close or block anything the host does not need, which is part of hardening. Prefer the secure version (443 over 80, 636 over 389, 22 over 23). Never expose management ports such as 22, 3389, 445 or database ports directly to the internet; put them behind a VPN, a jump server or zero trust access, and restrict source addresses. RDP on 3389 exposed to the internet is one of the most common ransomware entry points, through password guessing and credential stuffing. Unexpected outbound traffic matters too: a workstation sending SMTP on port 25 directly to the internet may be infected with spam-sending malware, which is why many networks block outbound 25 except from mail servers.",
   "Common mistakes: assuming a service always runs on its standard port (administrators can move services, and attackers tunnel traffic over 443 or 53 to blend in, so firewalls that only look at ports can be fooled); believing that moving RDP to a nonstandard port secures it (that is obscurity, not a control); mixing up 389 and 636; and forgetting that DNS uses both UDP and TCP on 53. Remember also that a port being open on a scan does not mean the service is vulnerable, only that it is reachable.",
   "Exam questions often give a log line or firewall rule and ask what is happening, or ask which port to open or block. 'Allow secure directory lookups' is 636. 'Block remote desktop from the internet' is 3389. 'Mail server to mail server' is 25. 'Encrypted remote shell' is 22. 'Zone transfer' is TCP 53. Unusually large volumes of DNS traffic on 53 to a single external domain can indicate DNS tunneling, a detection clue that combines ports with behavior."
  ],
  "terms": [
   [
    "Port",
    "A number that identifies a specific service or application on a host."
   ],
   [
    "Port 22",
    "SSH, SFTP and SCP for encrypted remote access and file transfer."
   ],
   [
    "Port 25",
    "SMTP, used to deliver email between mail servers."
   ],
   [
    "Port 53",
    "DNS, using UDP for most queries and TCP for zone transfers and large responses."
   ],
   [
    "Ports 389 and 636",
    "LDAP (cleartext or StartTLS) and LDAPS (LDAP over TLS) respectively."
   ],
   [
    "Port 3389",
    "Remote Desktop Protocol for graphical remote access to Windows systems."
   ],
   [
    "Port 443",
    "HTTPS, web traffic protected by TLS."
   ]
  ],
  "example": "A firewall review finds a rule allowing any internet address to reach TCP 3389 on a finance server, created years ago for a vendor. Authentication logs show thousands of failed logins from around the world each day. The team removes the rule, requires the vendor to connect through the VPN and a jump server with MFA, and adds an alert for any future rule that exposes 3389, 22 or 445 to the internet.",
  "tip": "Know the secure-versus-insecure pairs by port: 22 vs 23, 443 vs 80, 636 vs 389, 993 vs 143, 995 vs 110. If a question asks which port to allow for secure directory access, the answer is 636, not 389.",
  "check": [
   [
    "A workstation is sending large amounts of outbound traffic on TCP 25 to many external IPs. What does that suggest?",
    "It may be infected with spam-sending malware, since normal workstations send mail through the company mail server, not directly on port 25."
   ],
   [
    "Why is exposing port 3389 to the internet dangerous?",
    "It exposes RDP to password guessing and credential stuffing, a common ransomware entry point; it should sit behind a VPN, jump server or similar control."
   ],
   [
    "Which port provides LDAP over TLS?",
    "636."
   ],
   [
    "Does blocking a port guarantee a service cannot be reached through the firewall?",
    "No; services can be moved to other ports or tunneled through allowed ones such as 443, so application-aware inspection is also needed."
   ]
  ]
 },
 {
  "t": "ARP, DNS, DHCP and their attacks",
  "body": [
   "Three quiet protocols make every network work, and all three were designed with little built-in security. The Address Resolution Protocol (ARP) finds the hardware address of a device on the local network, the Domain Name System (DNS) turns names into IP addresses, and the Dynamic Host Configuration Protocol (DHCP) hands out network settings. Each one trusts whoever answers, so an attacker who can answer first, or answer falsely, can redirect traffic. Understanding how they normally work makes their attacks easy to recognize, and Security+ regularly asks you to match symptoms to the right attack and the right defense.",
   "ARP maps an IP address to a MAC address on the local network. When your computer wants to reach the gateway at 192.168.1.1, it broadcasts 'who has 192.168.1.1?' and the gateway replies with its MAC address, which your computer caches. ARP has no authentication, and hosts accept replies even when they did not ask. In ARP poisoning (ARP spoofing), an attacker on the same network segment sends forged replies claiming that the gateway's IP address belongs to the attacker's MAC address. Victims then send their traffic to the attacker, who can read or alter it before forwarding it on. This is a classic on-path attack (formerly called man-in-the-middle). Because ARP is a Layer 2 protocol, the attacker must be on the same local segment or VLAN.",
   "DNS translates names like www.example.com into IP addresses. Your device asks a recursive resolver, which queries other DNS servers and caches the answers for a time set by each record's time to live. In DNS poisoning (cache poisoning), an attacker inserts false records into a resolver's cache so users are silently sent to a malicious server. Related attacks change the hosts file on a victim machine, compromise the domain's registrar account to point the whole domain elsewhere (domain hijacking), or change a device's configured DNS server so all lookups go to the attacker. DNS is also abused for tunneling, hiding data inside queries to sneak it out of a network, and for amplification DDoS, where small spoofed queries produce large responses aimed at a victim. DNS Security Extensions (DNSSEC) defend against forged answers by signing records so resolvers can verify them.",
   "DHCP automatically gives devices an IP address, subnet mask, default gateway and DNS server. A client broadcasts a discover message, servers offer a lease, the client requests one and the server acknowledges it (often remembered as DORA: discover, offer, request, acknowledge). A rogue DHCP server, whether malicious or someone's home router plugged in by mistake, can answer first and hand out itself as the gateway or DNS server, putting the attacker on-path for all traffic. DHCP starvation floods the real server with requests using fake MAC addresses until its address pool is exhausted, causing a denial of service or clearing the way for a rogue server.",
   "Defenses are mostly switch features plus encryption. Dynamic ARP inspection (DAI) checks ARP messages against a trusted table of IP-to-MAC bindings and drops forged ones. DHCP snooping lets DHCP server responses come only from trusted ports (the uplink to the real server) and builds the binding table DAI uses. Port security limits how many MAC addresses a port can learn, which blunts starvation attacks. DNSSEC, secure resolvers, DNS filtering and registrar account protection (MFA and registry lock) protect DNS. Encrypting traffic with TLS means that even if an attacker gets on-path, they see only ciphertext and cannot impersonate servers without a valid certificate.",
   "Here is a walk-through of detecting ARP poisoning. Several users report certificate warnings on every site. An analyst runs `arp -a` on an affected workstation and sees that the gateway's IP and another host's IP share the same MAC address, which should never happen:",
   "```\narp -a\n  192.168.1.1     aa-bb-cc-11-22-33   dynamic\n  192.168.1.57    aa-bb-cc-11-22-33   dynamic\n```\n",
   "Common mistakes: thinking ARP poisoning works across the internet (it is local-only); confusing DNS poisoning with a rogue DHCP server (in the first the resolver's answers are false; in the second the client is told to use the wrong resolver or gateway); assuming DNSSEC encrypts queries (it provides integrity and authenticity, not confidentiality; DNS over HTTPS or TLS provides privacy). Exam clue words: 'duplicate MAC addresses', 'gateway MAC changed' point to ARP poisoning. 'Correct URL typed, wrong site, other users of the same resolver affected' points to DNS poisoning. 'Clients receiving wrong gateway or IP range' points to a rogue DHCP server, and 'address pool exhausted' points to DHCP starvation. The defense pairs are DAI for ARP, DHCP snooping for DHCP, and DNSSEC for DNS."
  ],
  "terms": [
   [
    "ARP poisoning",
    "Sending forged ARP replies to associate the attacker's MAC address with another host's IP, enabling on-path attacks."
   ],
   [
    "DNS poisoning",
    "Inserting false records into a DNS resolver's cache so users are redirected to malicious addresses."
   ],
   [
    "Rogue DHCP server",
    "An unauthorized DHCP server that hands out incorrect settings such as a malicious gateway or DNS server."
   ],
   [
    "DHCP starvation",
    "Exhausting a DHCP server's address pool with requests from fake MAC addresses."
   ],
   [
    "DHCP snooping",
    "A switch feature that allows DHCP server responses only on trusted ports."
   ],
   [
    "Dynamic ARP inspection",
    "A switch feature that drops ARP messages that do not match trusted IP-to-MAC bindings."
   ],
   [
    "DNSSEC",
    "DNS Security Extensions, which digitally sign DNS records so resolvers can verify their authenticity and integrity."
   ]
  ],
  "example": "Several users on one floor suddenly get certificate warnings on every website. The analyst finds that the default gateway's MAC address in their ARP caches matches a desktop PC rather than the router, and the switch logs show that PC's port sending a stream of unsolicited ARP replies. The port is shut down, the PC is taken for forensic analysis, and dynamic ARP inspection with DHCP snooping is enabled on all access switches so forged replies are dropped in future.",
  "tip": "ARP poisoning is Layer 2 and local-network only. If users reach a fake site even with correct ARP entries, suspect DNS poisoning. If clients receive the wrong gateway, suspect a rogue DHCP server.",
  "check": [
   [
    "Which switch feature stops a rogue DHCP server from handing out addresses?",
    "DHCP snooping, which only trusts DHCP server responses from designated ports."
   ],
   [
    "What does DNSSEC protect against, and what does it not provide?",
    "It protects against forged or altered DNS answers such as cache poisoning; it does not encrypt DNS queries for privacy."
   ],
   [
    "Why does ARP poisoning work at all?",
    "ARP has no authentication and hosts accept unsolicited replies, so an attacker can falsely claim another IP's MAC address."
   ],
   [
    "Why does TLS limit the damage of an on-path attacker created by ARP or DNS attacks?",
    "The attacker sees only encrypted traffic and cannot present a valid certificate for the real site, so users get warnings instead of silent interception."
   ]
  ]
 },
 {
  "t": "Actors: nation-state, organized crime, hacktivist, insider, unskilled attacker, shadow IT",
  "body": [
   "A threat actor is the person or group behind an attack. Security+ asks you to identify actors from a scenario and to understand how their resources, sophistication, location and goals shape what they do. This matters in practice because defending against a teenager with downloaded tools is very different from defending against a government intelligence agency. Threat intelligence reports describe actors in exactly these terms, and risk assessments use them to decide which scenarios deserve the most money and attention.",
   "The objectives describe actors using a few attributes. Internal or external: is the actor inside the organization (employees, contractors, partners with access) or outside? Resources and funding: how much money, time and staff do they have? Level of sophistication and capability: can they write custom malware and find zero-day vulnerabilities, or do they use existing tools? Each actor type has a typical profile on these attributes, although real actors vary. The lines also blur in practice: some nation-states work with or tolerate criminal groups, criminal groups sell access to other attackers, and a skilled insider can be recruited by an outside actor. Treat the categories as the exam does, as the best description of the behavior in front of you.",
   "Nation-state actors are government-sponsored groups, often military or intelligence units, or contractors working for them. They have the highest resources and sophistication, can develop zero-day exploits, and are patient. They commonly conduct advanced persistent threat (APT) campaigns, where they gain access and stay hidden for months to steal information or position themselves to disrupt critical infrastructure. Their targets include governments, defense contractors, energy, telecoms and technology firms. Organized crime groups are motivated mainly by money. They are well funded and increasingly professional, running ransomware operations (including ransomware-as-a-service affiliate programs), business email compromise, card fraud and extortion. They pick targets for profit and move fast once inside.",
   "Hacktivists attack to promote a political or social cause. Their typical tools are website defacement, distributed denial-of-service (DDoS) attacks and leaking stolen documents to embarrass a target. Their resources vary widely, from loose online collectives to skilled small teams. Unskilled attackers (older materials call them script kiddies) use tools and exploits written by others, with little understanding of how they work. They are low in sophistication and resources, but they are numerous and opportunistic, and freely available tools can still do real damage to unpatched systems.",
   "Insider threats come from people who already have legitimate access: employees, former employees whose access was not removed, contractors and partners. They may be malicious (stealing data before joining a competitor, sabotage after being disciplined) or unintentional (mistakes, falling for phishing, misconfiguring a cloud storage bucket). Insiders are dangerous because they bypass perimeter controls and know where valuable data lives. Shadow IT means systems, devices or cloud services used without the IT or security team's approval, such as a department signing up for an unapproved file-sharing service. It is usually well-intentioned, but it creates unmanaged, unmonitored assets and data outside company controls.",
   "Walk through an attribution exercise. An incident report says: attackers were in the network for eleven months, used a previously unknown vulnerability in a VPN appliance, moved carefully to avoid detection, and exfiltrated engineering designs without demanding money. Long dwell time, a zero-day, stealth and intellectual property theft with no ransom point strongly to a nation-state APT. Compare a second report: files encrypted overnight, a ransom note demanding cryptocurrency, and a threat to publish stolen data. That is organized crime, likely a ransomware affiliate.",
   "Common mistakes: assuming all insiders are malicious (many insider incidents are accidents); treating shadow IT as an attacker (it is an internal risk created by well-meaning people); assuming unskilled attackers are harmless; and deciding by target alone rather than by behavior, since a hospital could be hit by organized crime, a hacktivist or a nation-state. Look at goal, method and resources together. Finally, remember that sophistication is judged by what the attacker could build, not by how much damage was done; an unskilled attacker can cause a large outage by running a public exploit against an unpatched server.",
   "Exam clue words: 'government-funded', 'APT', 'zero-day', 'long-term', 'espionage' point to nation-state. 'Ransom', 'profit', 'fraud' point to organized crime. 'Defacement', 'cause', 'protest', 'leak to embarrass' point to hacktivist. 'Downloaded tools', 'little skill' point to unskilled attacker. 'Legitimate access', 'employee', 'former contractor' point to insider. 'Unapproved cloud app' or 'department bought its own service' points to shadow IT."
  ],
  "terms": [
   [
    "Threat actor",
    "The individual or group responsible for a threat or attack."
   ],
   [
    "Nation-state actor",
    "A government-sponsored group with high resources and sophistication, often conducting espionage or sabotage."
   ],
   [
    "Advanced persistent threat (APT)",
    "A long-term, stealthy campaign by a skilled, well-resourced actor that maintains access to a target."
   ],
   [
    "Organized crime",
    "Financially motivated criminal groups running operations such as ransomware and fraud."
   ],
   [
    "Hacktivist",
    "An actor who attacks to promote a political or social cause, often through defacement, DDoS or leaks."
   ],
   [
    "Unskilled attacker",
    "An attacker who relies on tools and exploits created by others; formerly called a script kiddie."
   ],
   [
    "Insider threat",
    "A risk from someone with legitimate access, whether malicious or accidental."
   ],
   [
    "Shadow IT",
    "Technology used within an organization without approval from IT or security."
   ]
  ],
  "example": "A marketing team signs up for a free online design platform and uploads the unreleased product catalog and customer lists so they can collaborate with an agency. Nobody in IT knows the service exists, it has no single sign-on or MFA, and it is not covered by data loss prevention. When a team member's reused password is compromised, the data is exposed. The incident is traced to shadow IT, and the company responds with an approved alternative and a simple request process for new tools.",
  "tip": "Decide by motivation and resources, not by the target: espionage with long dwell time and zero-days is nation-state, money is organized crime, a cause is a hacktivist, and legitimate access is an insider.",
  "check": [
   [
    "Attackers remain hidden in a defense contractor's network for a year and steal designs without demanding payment. Which actor is most likely?",
    "A nation-state actor running an APT campaign, based on stealth, persistence and espionage goals."
   ],
   [
    "Why is shadow IT a security risk even when employees mean well?",
    "The systems are unmanaged and unmonitored, so they may lack security controls and hold company data outside approved protections."
   ],
   [
    "An employee accidentally emails a spreadsheet of customer records to the wrong external address. Is this an insider threat?",
    "Yes, an unintentional insider threat, because it comes from someone with legitimate access."
   ],
   [
    "What distinguishes an unskilled attacker from other actors?",
    "They rely on tools and exploits made by others and have limited skill and resources, though they can still cause damage."
   ]
  ]
 },
 {
  "t": "Motivations: espionage, financial, disruption, ideology",
  "body": [
   "Understanding why an attacker acts helps you predict what they will target and how they will behave once inside. A financially motivated criminal wants a fast payout and will move quickly; a spy wants to stay hidden for as long as possible. Security+ lists a range of motivations and expects you to infer the most likely one from a scenario. In real work, motivation shapes threat models, helps prioritize defenses, and helps incident responders guess what an attacker will do next. A company that makes consumer software might worry most about financially motivated attackers, while a defense supplier must plan for espionage, and a utility must plan for disruption and even war.",
   "The SY0-701 objectives list these motivations: data exfiltration, espionage, service disruption, blackmail, financial gain, philosophical or political beliefs, ethical reasons, revenge, disruption or chaos, and war. They overlap with the actor types from the previous lesson, but they are not the same thing. An actor type describes who the attacker is; a motivation describes why they are doing it. The same insider could be motivated by revenge or by money, and the same nation-state could pursue espionage in peacetime and destruction in war.",
   "Espionage is gathering secret information: trade secrets, designs, negotiating positions, government plans or personal data about people of interest. It is typical of nation-states and sometimes competitors. Espionage attackers value stealth and persistence, so they avoid noisy actions, clean up logs and may stay for months. Data exfiltration, moving data out of the victim's environment, is often the means, and it can serve espionage, extortion or sale on criminal markets.",
   "Financial gain is the most common motivation overall. It drives ransomware, business email compromise, payment card theft, cryptocurrency theft, cryptojacking (secretly using a victim's computers to mine cryptocurrency) and selling stolen data. Blackmail and extortion are financial motivations with a threat attached: pay or we will publish your data, or keep your systems down. Modern ransomware often combines encryption with data theft, called double extortion, so that restoring from backups does not remove the pressure to pay.",
   "Disruption and service disruption aim to stop an organization from operating: DDoS attacks, destructive wiper malware, or attacks on industrial control systems. Chaos-driven attackers may simply want attention or to cause harm. War brings disruption to its most serious form, with state actors targeting power grids, telecommunications and logistics. Philosophical or political beliefs (ideology) drive hacktivists, who deface websites, leak documents or launch DDoS attacks to promote a cause. Ethical reasons motivate people who break in to expose wrongdoing or demonstrate a flaw; if they act without permission it is still unauthorized. Revenge usually drives disgruntled current or former insiders, who may delete data, sabotage systems or leak information.",
   "Walk through a scenario analysis. A company's website is defaced with messages criticizing its environmental record, and a list of internal emails about a controversial project is posted online. Nothing is encrypted and no ransom is requested. The clues are public messaging, a cause and embarrassment rather than profit, so the motivation is philosophical or political, typical of hacktivists. If instead the emails were quietly copied over months and never published, espionage would be more likely; if a message demanded payment to prevent publication, it would be financial gain through blackmail.",
   "Common mistakes: equating motivation with actor (they are related but separate questions); assuming ransomware is always about disruption (its goal is money; disruption is the lever); and picking 'espionage' whenever data is stolen. Data theft followed by a ransom demand is financial; data theft followed by silence is more likely espionage; data theft followed by public release to shame the victim is ideological or revenge.",
   "Exam clue words: 'steal secrets', 'long-term access', 'intellectual property' point to espionage. 'Ransom', 'sell data', 'cryptojacking', 'wire transfer' point to financial gain. 'Take offline', 'wiper', 'DDoS', 'cause outages' point to disruption. 'Cause', 'protest', 'deface' point to philosophical or political beliefs. 'Fired employee', 'grievance' point to revenge. When two motivations seem possible, choose the one that explains what the attacker did after gaining access. Motivation also guides the response: against financially motivated ransomware you prioritize backups and containment speed, while against espionage you focus on scoping how long the attacker has been present and what data was reached."
  ],
  "terms": [
   [
    "Espionage",
    "Covertly gathering secret or sensitive information for a government or competitor."
   ],
   [
    "Data exfiltration",
    "Unauthorized transfer of data out of an organization's environment."
   ],
   [
    "Financial gain",
    "Attacking for money, through ransomware, fraud, theft or selling data."
   ],
   [
    "Blackmail (extortion)",
    "Threatening to release data or continue harm unless the victim pays or complies."
   ],
   [
    "Double extortion",
    "Ransomware that both encrypts data and threatens to publish stolen copies."
   ],
   [
    "Service disruption",
    "Attacking to make systems or services unavailable."
   ],
   [
    "Cryptojacking",
    "Secretly using a victim's computing resources to mine cryptocurrency."
   ]
  ],
  "example": "A system administrator is dismissed after a dispute and, because her account was not disabled promptly, logs in that evening and deletes several production databases. She demands nothing and posts no data. The motivation is revenge, and the incident review identifies the root cause as a slow offboarding process, leading to a rule that access is revoked at the moment of termination.",
  "tip": "Look at what the attacker did after getting in: quiet theft over time suggests espionage, a ransom demand suggests financial gain, public embarrassment suggests ideology, and a grievance suggests revenge.",
  "check": [
   [
    "Ransomware encrypts a hospital's systems and demands cryptocurrency. What is the primary motivation?",
    "Financial gain; the disruption is the lever used to force payment."
   ],
   [
    "Attackers copy research data over many months and never contact the victim. Which motivation fits best?",
    "Espionage, because the attacker values stealth and long-term access to secret information."
   ],
   [
    "Why do ransomware groups also steal data before encrypting it?",
    "Double extortion: even if the victim restores from backups, the threat of publishing the data still pressures them to pay."
   ],
   [
    "How are actor type and motivation different?",
    "Actor type describes who is attacking, such as an insider or nation-state; motivation describes why, such as revenge or espionage."
   ]
  ]
 },
 {
  "t": "Threat vectors: email, SMS, voice, removable media, supply chain, open ports",
  "body": [
   "A threat vector (also called an attack vector) is the path or method an attacker uses to reach a target. The attack surface is the total set of vectors available against an organization: every email inbox, exposed service, device, supplier connection and user who can be tricked. Reducing the attack surface means closing or controlling as many vectors as possible. Security+ lists a set of common vectors and expects you to identify them in scenarios and pick sensible defenses for each.",
   "Message-based vectors are the most common way in. Email carries phishing links, malicious attachments and business email compromise. Short Message Service (SMS) carries smishing texts pretending to be delivery companies or banks. Instant messaging and collaboration apps can deliver the same lures, often with more implicit trust because they feel internal. Image-based and file-based vectors hide malicious content in files such as documents with macros, disk images or shortcut files. Voice calls (vishing) let attackers impersonate the help desk, a bank or an executive, increasingly with synthetic voices. Defenses include email filtering, attachment sandboxing, blocking risky file types, DMARC and related email authentication, awareness training and clear verification procedures.",
   "Removable media, such as USB drives, can carry malware directly past network defenses, and attackers sometimes leave infected drives in parking lots hoping curious employees plug them in (a technique called baiting). Some malicious USB devices pretend to be keyboards and type commands the moment they are connected. Defenses include disabling autorun, device control policies in the endpoint agent that block unapproved storage, scanning media before use and training. Unsecured networks are another vector: open or weakly protected Wi-Fi, rogue access points, and wired ports in public areas give attackers a foothold. Bluetooth can also be abused on nearby devices.",
   "Vulnerable software and unsupported systems give attackers known weaknesses to exploit. Client-based software is installed on endpoints and may be exploited through what a user opens; agentless or web-based software shifts the risk to the server. Unsupported systems and applications, those past end of life, receive no patches, so any new vulnerability stays open forever. Open service ports and default credentials are closely related: a service exposed to the internet on an open port, especially with a default username and password, is often found by automated scanning within hours.",
   "Supply chain vectors target the organization through someone it trusts. Managed service providers (MSPs) often have privileged remote access to many customers at once, so compromising one MSP can reach dozens of victims. Vendors and suppliers may ship compromised hardware or software; a malicious update inserted into a legitimate vendor's build process is especially dangerous because it arrives signed and trusted. Defenses include vendor risk assessments, least privilege for third-party access, monitoring of vendor connections, software bills of materials (SBOMs), verifying update integrity and segmenting third-party systems.",
   "Walk through a mapping exercise. An organization lists its exposures: staff receive email and texts (email and SMS vectors), a legacy file server runs an unsupported operating system (unsupported system), the building has a lobby with a live network jack (unsecured network), a remote management tool on port 3389 is reachable from the internet with a default admin password (open port and default credentials), and an MSP has permanent VPN access (supply chain). Each item gets a control: filtering and training, isolation and replacement, disabling the lobby port, closing 3389 and changing credentials, and just-in-time access for the MSP.",
   "Common mistakes: confusing a vector (how the attacker gets in) with a vulnerability (the weakness exploited) or a threat actor (who is attacking); assuming supply chain only means physical goods (software updates and service providers count); and treating removable media as an outdated risk. Another mistake is focusing on one vector: attackers choose the easiest path, so the weakest vector sets your real exposure.",
   "Exam clue words: 'text message' is SMS or smishing; 'phone call' is voice or vishing; 'USB found in the parking lot' is removable media; 'vendor update', 'MSP', 'third-party library' is supply chain; 'default password on an internet-facing device' is default credentials; 'service reachable from the internet' is an open service port; 'end of life', 'no longer receives patches' is an unsupported system. When asked how to reduce the attack surface, pick the answer that removes an unnecessary vector rather than one that only monitors it."
  ],
  "terms": [
   [
    "Threat vector",
    "The path or method an attacker uses to reach a target; also called an attack vector."
   ],
   [
    "Attack surface",
    "The total set of points where an attacker could try to enter or extract data."
   ],
   [
    "Smishing",
    "Phishing delivered by SMS text message."
   ],
   [
    "Vishing",
    "Phishing conducted over voice calls."
   ],
   [
    "Baiting",
    "Leaving infected media or offering something tempting so a victim introduces malware themselves."
   ],
   [
    "Supply chain attack",
    "Compromising a target through a trusted supplier, vendor, software update or service provider."
   ],
   [
    "Unsupported system",
    "A system past end of life that no longer receives security updates."
   ],
   [
    "Default credentials",
    "Factory-set usernames and passwords that attackers know and try first."
   ]
  ],
  "example": "Attackers compromise a small IT managed service provider and use its remote monitoring tool, which has administrator access to every client, to push ransomware to forty customer networks in one night. None of the victims were phished directly; the vector was the supply chain. Afterward, affected clients require the MSP to use MFA, restrict its access to specific hours and systems, and log every remote session to their own SIEM.",
  "tip": "Distinguish vector, vulnerability and actor: the vector is how they got in (email, USB, MSP), the vulnerability is the weakness they used, and the actor is who they are.",
  "check": [
   [
    "An employee plugs in a USB drive found in the parking lot and malware runs. What vector was used, and what technical control would help?",
    "Removable media (baiting); device control that blocks unapproved USB storage and disabling autorun."
   ],
   [
    "Why are managed service providers attractive supply chain targets?",
    "They often hold privileged remote access to many customers, so one compromise reaches many victims."
   ],
   [
    "What makes an unsupported operating system a lasting threat vector?",
    "It no longer receives patches, so newly discovered vulnerabilities remain exploitable indefinitely."
   ],
   [
    "What is the difference between reducing the attack surface and monitoring it?",
    "Reducing removes or closes vectors, such as disabling unused services; monitoring only detects use of vectors that remain open."
   ]
  ]
 },
 {
  "t": "Social engineering: phishing, vishing, smishing, pretexting, BEC, watering hole, typosquatting",
  "body": [
   "Social engineering manipulates people into doing something that helps an attacker: revealing a password, approving a payment, opening a file or holding a door. It works because it targets human instincts rather than technical flaws, so a fully patched network can still be breached through one convincing email. Security+ expects you to recognize each technique by its channel and method, and to know which controls reduce the risk. Most real breaches involve a human element at some point, which is why this topic is always well represented on the exam.",
   "Attackers lean on a small set of psychological principles. Authority: the message appears to come from a boss, the IT department or the police. Urgency: act now or the account will be closed. Scarcity: only a few left. Social proof: everyone else has already done this. Familiarity and liking: the attacker is friendly or seems to be a known contact. Intimidation: threats of consequences. Trust: impersonating a known supplier. Learning to spot these pressures is the core of awareness training, because the channel changes but the pressures stay the same.",
   "The channel-based techniques are phishing (fraudulent email aimed at many people), spear phishing (targeted at a specific person or group, using personal details), whaling (spear phishing aimed at senior executives), vishing (voice calls), and smishing (SMS texts). Pretexting is creating a believable invented scenario to justify a request: 'I'm from the auditors and need the vendor list by noon' or 'I'm the new contractor and my badge isn't working'. Impersonation is pretending to be a specific person or role, and it is often the tool that makes the pretext believable.",
   "Business email compromise (BEC) targets money directly. An attacker compromises or convincingly spoofs an executive's or supplier's email, then asks the finance team to pay a fake invoice, change a supplier's bank details, or buy gift cards. BEC often uses no malware at all, so antivirus sees nothing. Defenses are process controls: verify any payment or bank detail change through a known phone number (out-of-band verification), require dual approval for payments, and flag external email and lookalike domains.",
   "Some techniques wait for the victim to come to them. A watering hole attack compromises a website that the target group is known to visit, such as an industry forum or a supplier portal, so visitors are infected. Typosquatting (URL hijacking) registers domains that are common misspellings of real ones, such as 'examp1e.com', to catch typos or make phishing links look legitimate. Brand impersonation copies a company's look and logos in emails or fake sites. Misinformation and disinformation campaigns spread false information, the latter deliberately, to manipulate people or damage reputations. Physical techniques include tailgating, shoulder surfing and dumpster diving.",
   "Walk through a realistic attack chain. An attacker researches a company on professional networking sites and finds the finance team. She registers a typosquatted domain one letter off from a real supplier, sends a spear phishing email from it saying the supplier's bank has changed, and follows up with a vishing call pretending to be the supplier's accountant to add urgency. The defense that stops her is not a filter but a process: the finance clerk calls the supplier using the number already on file, discovers the request is false, and reports it to security, who block the domain.",
   "Common mistakes: confusing whaling (target is an executive) with BEC (goal is fraudulent payment, often by impersonating an executive); confusing pretexting (the invented story) with impersonation (the false identity); thinking training alone is enough (technical controls such as email authentication, link rewriting and MFA reduce what a successful lure can achieve); and assuming a watering hole involves contacting the victim at all. Also, not every suspicious request is a scam; the right response is verification through a separate trusted channel, not ignoring it.",
   "Exam clue words: 'text message' is smishing; 'phone call' is vishing; 'CEO or CFO targeted' is whaling; 'wire transfer', 'change bank details', 'invoice' is BEC; 'invented scenario to justify the request' is pretexting; 'compromised a site the victims frequently visit' is watering hole; 'misspelled domain' is typosquatting. When asked for the best control against BEC, choose out-of-band verification of payment requests."
  ],
  "terms": [
   [
    "Phishing",
    "Fraudulent messages, usually email, that trick recipients into revealing information or running malware."
   ],
   [
    "Spear phishing",
    "Phishing targeted at a specific person or group using tailored details."
   ],
   [
    "Whaling",
    "Spear phishing aimed at senior executives."
   ],
   [
    "Pretexting",
    "Creating an invented but believable scenario to justify a request for information or access."
   ],
   [
    "Business email compromise (BEC)",
    "Using a compromised or spoofed business email account to trick staff into sending money or data."
   ],
   [
    "Watering hole attack",
    "Compromising a website the target group commonly visits in order to infect its visitors."
   ],
   [
    "Typosquatting",
    "Registering misspelled versions of real domains to catch typos or make phishing look legitimate."
   ],
   [
    "Out-of-band verification",
    "Confirming a request through a separate, trusted channel such as a known phone number."
   ]
  ],
  "example": "An accounts payable clerk receives an email that appears to come from a long-time supplier asking to update its bank details before the next invoice is paid. The sender's domain is one letter different from the real one, and the message stresses that the change must happen today. Following company policy, the clerk calls the supplier on the number stored in the vendor file and learns the request is fraudulent. The attempted BEC is reported, the domain is blocked, and the finance team shares the example in its next training session.",
  "tip": "BEC is about fraudulent payments and often uses no malware, so the best control is a process: out-of-band verification and dual approval for payment or bank changes.",
  "check": [
   [
    "An attacker calls the help desk claiming to be a traveling executive who needs an urgent password reset. Which techniques are involved?",
    "Vishing combined with pretexting and impersonation, using authority and urgency."
   ],
   [
    "Attackers compromise an industry association website so members who visit are infected. What is this called?",
    "A watering hole attack."
   ],
   [
    "Why might antivirus fail to detect business email compromise?",
    "BEC often contains no malware; it relies on convincing text that persuades staff to send money or change details."
   ],
   [
    "What is the difference between whaling and BEC?",
    "Whaling describes the target (senior executives); BEC describes the goal and method (fraudulent payments via a compromised or spoofed business email)."
   ]
  ]
 },
 {
  "t": "OWASP Top 10: broken access control, injection, misconfiguration, integrity failures, SSRF",
  "body": [
   "The Open Worldwide Application Security Project (OWASP) is a nonprofit community that publishes free guidance on web application security. Its best-known document, the OWASP Top 10, ranks the most critical categories of web application security risk based on real-world data. It is updated every few years, so the exact order and names change, but the core categories are durable and Security+ expects you to recognize them and their defenses. Developers use the list to prioritize secure coding, and security teams use it to scope testing and code review.",
   "Broken access control has been at the top of recent editions. It means users can act outside their intended permissions: viewing another customer's account by changing an ID in the URL (an insecure direct object reference), reaching admin pages without being an administrator, or modifying data they should only read. It happens when authorization is checked in the user interface but not on the server, or not checked for every request. Defenses: deny by default, enforce authorization on the server for every request, check that the logged-in user owns the record they ask for, and log and alert on access control failures.",
   "Injection happens when untrusted input is sent to an interpreter as part of a command or query, so the interpreter treats data as code. SQL injection against databases is the classic case; others include operating system command injection and LDAP injection. Cross-site scripting (XSS) is grouped under injection in recent editions. The primary defenses are parameterized queries (prepared statements), which keep data and code separate, plus server-side input validation, output encoding and least-privilege database accounts. Security misconfiguration covers insecure defaults, unnecessary features left enabled, default accounts, verbose error messages that reveal stack traces, missing security headers and publicly readable cloud storage. Defenses are hardened baselines, automated configuration checks and removing anything not needed.",
   "Software and data integrity failures occur when code or data is trusted without verifying it. Examples include applications that install updates without checking signatures, build pipelines that pull dependencies from untrusted sources, and insecure deserialization, where an application reconstructs objects from attacker-controlled data. The 2020-era supply chain attacks that inserted malicious code into legitimate vendor updates are the textbook example. Defenses: digital signatures on updates and packages, trusted repositories, dependency pinning and review, and securing the CI/CD pipeline.",
   "Server-side request forgery (SSRF) tricks a server into making requests on the attacker's behalf. If an application fetches a URL supplied by the user, such as a link preview or an image import feature, an attacker may point it at internal addresses the attacker cannot reach directly, such as internal admin panels or a cloud provider's instance metadata service, which can expose credentials. Defenses: validate and allow-list destination addresses, block requests to internal and metadata ranges, disable unneeded URL schemes, and segment the server's network access. Other Top 10 categories include cryptographic failures, insecure design, vulnerable and outdated components, identification and authentication failures, and security logging and monitoring failures.",
   "Walk through a code review example. A developer's endpoint returns an invoice using `/invoice?id=1043`. The reviewer notices the server fetches the invoice by ID but never checks that invoice 1043 belongs to the logged-in customer, which is broken access control. The same endpoint builds its SQL by concatenating the ID string, which is injection risk. The fix is a parameterized query plus an ownership check on every request:",
   "```\n-- vulnerable pattern: query built by string concatenation\n-- safer pattern: parameterized query plus ownership check\nSELECT * FROM invoices WHERE id = ? AND customer_id = ?\n```",
   "Common mistakes: relying on client-side checks or hidden form fields for authorization; believing input validation alone stops injection (parameterization is the primary control); confusing SSRF (the server makes the malicious request) with CSRF (the victim's browser makes it); and thinking a WAF fixes insecure code (it helps as a compensating layer, but the code should be fixed). Exam clue words: 'change the ID in the URL to see another user's data' is broken access control; 'input passed to a query or command' is injection; 'default settings, verbose errors, open storage' is misconfiguration; 'unsigned updates, deserialization, compromised pipeline' is integrity failure; 'server fetches an internal or metadata URL' is SSRF."
  ],
  "terms": [
   [
    "OWASP Top 10",
    "A regularly updated list of the most critical web application security risk categories."
   ],
   [
    "Broken access control",
    "Failures that let users act outside their intended permissions, such as viewing others' records."
   ],
   [
    "Insecure direct object reference",
    "Accessing an object by changing an identifier because the server does not check authorization."
   ],
   [
    "Injection",
    "Sending untrusted input to an interpreter so it is executed as part of a command or query."
   ],
   [
    "Security misconfiguration",
    "Insecure defaults, unnecessary features, verbose errors or open storage that weaken an application."
   ],
   [
    "Software and data integrity failure",
    "Trusting code, updates or data without verifying their integrity, such as unsigned updates or insecure deserialization."
   ],
   [
    "Server-side request forgery (SSRF)",
    "Tricking a server into making requests to destinations the attacker chooses, often internal systems."
   ]
  ],
  "example": "A photo-sharing site lets users import a picture by pasting a URL. A tester supplies an internal address and finds the server returns data from the cloud provider's instance metadata service, including temporary credentials. The team fixes the SSRF by allow-listing external image hosts, blocking private and metadata address ranges, and moving the import feature to an isolated service with no access to internal networks or credentials.",
  "tip": "SSRF means the server is tricked into making the request; CSRF means the user's browser is tricked. For injection, the best answer is almost always parameterized queries, not just input validation.",
  "check": [
   [
    "A user changes 'account=500' to 'account=501' in a URL and sees another customer's statement. Which category is this, and what is the fix?",
    "Broken access control (an insecure direct object reference); the server must verify on every request that the user is authorized for that record."
   ],
   [
    "Why are parameterized queries more effective against SQL injection than filtering bad characters?",
    "They keep code and data separate so input is never executed as SQL, while filters can be bypassed with encoding tricks."
   ],
   [
    "An application installs updates downloaded over HTTP without checking signatures. Which category applies?",
    "Software and data integrity failures, because code is trusted without verification."
   ],
   [
    "What internal resource do SSRF attacks against cloud servers often target, and why?",
    "The instance metadata service, because it can expose temporary credentials and configuration for the cloud environment."
   ]
  ]
 },
 {
  "t": "SQL injection, XSS (stored/reflected), CSRF",
  "body": [
   "Three web application attacks appear on almost every Security+ exam: SQL injection, cross-site scripting (XSS) and cross-site request forgery (CSRF). All three abuse the way a web application trusts either the data it receives or the browser that sends it. They matter because web applications are exposed to the whole internet, and a single vulnerable form can leak an entire customer database or let an attacker act as a logged-in user. The exam focuses on telling them apart and picking the right defense for each, rather than on writing the attacks.",
   "SQL injection (SQLi) happens when an application builds a database query by pasting user input directly into the SQL text. If the input contains SQL syntax, the database executes it as part of the query. An attacker can use this to bypass a login, read tables they should not see, change or delete data, and sometimes run commands on the database server. Signs in logs include SQL keywords, quote characters and comment sequences inside form fields or URL parameters, and database error messages returned to users. The primary defense is parameterized queries (prepared statements), where the query structure is fixed and user input is passed separately as data, so it can never change the command. Supporting controls are server-side input validation, stored procedures used safely, least-privilege database accounts, generic error messages and a web application firewall (WAF) as an extra layer.",
   "Cross-site scripting (XSS) happens when an application includes untrusted input in a web page without encoding it, so the victim's browser runs attacker-supplied script as if it came from the trusted site. That script can steal session cookies, capture keystrokes, change page content or make requests as the user. In reflected XSS, the malicious input is part of a request, often a crafted link, and the server immediately reflects it back in the response to that one victim; the attacker must trick each victim into clicking. In stored (persistent) XSS, the input is saved by the application, for example in a comment, profile field or support ticket, and served to every user who views that content, which makes it more dangerous. DOM-based XSS occurs entirely in the browser when client-side script writes untrusted data into the page.",
   "XSS defenses center on output encoding: converting special characters into safe equivalents for the context (HTML, attribute, JavaScript or URL) so the browser displays them as text instead of executing them. Input validation, a Content Security Policy (CSP) header that restricts which scripts a page may run, and marking session cookies HttpOnly (so scripts cannot read them) add layers. Modern web frameworks encode output by default, and many XSS bugs appear when developers bypass that behavior.",
   "Cross-site request forgery (CSRF, sometimes pronounced 'sea-surf') tricks a victim's browser into sending an unwanted request to a site where the victim is already logged in. Because browsers automatically attach cookies to requests, the target site sees a valid session and performs the action, such as changing an email address or transferring money. The attacker never sees the response; they only cause the action. Defenses: anti-CSRF tokens (a random, unpredictable value tied to the session that must be included with each state-changing request), SameSite cookie attributes that stop cookies being sent on cross-site requests, re-authentication for sensitive actions, and checking the Origin or Referer header.",
   "Here is the core SQLi fix as a developer would see it in a code review. The vulnerable pattern builds a string; the safe pattern uses a placeholder and passes the value separately:",
   "```\n# vulnerable: user input becomes part of the SQL text\nquery = \"SELECT * FROM users WHERE name = '\" + name + \"'\"\n# safe: parameterized query, input is always treated as data\ncursor.execute(\"SELECT * FROM users WHERE name = %s\", (name,))\n```",
   "Common mistakes: confusing XSS with CSRF (XSS runs the attacker's script in the victim's browser and abuses the user's trust in a site; CSRF makes the browser send a request and abuses the site's trust in the browser); thinking HTTPS stops these attacks (it does not; they travel inside legitimate encrypted sessions); and relying on client-side validation, which attackers simply bypass. Exam clue words: 'database', 'query', 'login bypass', 'single quote in input' point to SQL injection. 'Script in a comment shown to all visitors' is stored XSS. 'Malicious link that reflects input back' is reflected XSS. 'Unwanted action performed using the victim's existing session' is CSRF. Match defenses: parameterized queries for SQLi, output encoding and CSP for XSS, anti-CSRF tokens and SameSite cookies for CSRF."
  ],
  "terms": [
   [
    "SQL injection",
    "Inserting SQL syntax into input that an application places into a database query, changing the query's meaning."
   ],
   [
    "Parameterized query",
    "A query with fixed structure where user input is passed separately as data; also called a prepared statement."
   ],
   [
    "Reflected XSS",
    "Script supplied in a request that the server immediately includes in its response to that victim."
   ],
   [
    "Stored XSS",
    "Script saved by the application and served to every user who views the affected content."
   ],
   [
    "Output encoding",
    "Converting special characters so browsers display untrusted data as text rather than executing it."
   ],
   [
    "CSRF",
    "Cross-site request forgery, which makes a logged-in user's browser send an unwanted request to a trusted site."
   ],
   [
    "Anti-CSRF token",
    "A random value tied to the session that must accompany state-changing requests, which attackers cannot guess."
   ]
  ],
  "example": "A support portal lets customers add notes to tickets. A tester adds a note containing harmless test script and finds that it runs in the browser of every support agent who opens the ticket, a stored XSS flaw that could steal agent sessions. The developers switch the notes view to the framework's automatic output encoding, add a Content Security Policy, and set the session cookie to HttpOnly and SameSite. They also find a password-change form without an anti-CSRF token and fix that too.",
  "tip": "Stored XSS is saved on the server and hits every viewer; reflected XSS bounces off the server in one crafted request. CSRF abuses the site's trust in the user's browser, while XSS abuses the user's trust in the site.",
  "check": [
   [
    "Why do parameterized queries stop SQL injection?",
    "They fix the query's structure in advance and pass input only as data, so input can never be interpreted as SQL commands."
   ],
   [
    "A malicious script placed in a forum post runs for every visitor. Is this stored or reflected XSS?",
    "Stored (persistent) XSS, because the script is saved by the application and served to all viewers."
   ],
   [
    "Why can a CSRF attack succeed even though the attacker never learns the victim's password?",
    "The victim's browser automatically sends its valid session cookie with the forged request, so the site treats it as legitimate."
   ],
   [
    "Does moving a site to HTTPS prevent XSS or CSRF?",
    "No; HTTPS protects data in transit, but these attacks happen through legitimate requests and page content inside the encrypted session."
   ]
  ]
 },
 {
  "t": "Buffer overflow, race conditions (TOCTOU), memory injection",
  "body": [
   "Some of the most serious vulnerabilities live not in web forms but in how programs manage memory and timing. Buffer overflows, race conditions and memory injection can let an attacker crash a program, bypass checks, or run their own code with the program's privileges. Security+ does not expect you to write exploits, but it does expect you to recognize these flaws in a scenario, understand why they happen, and know the defenses that operating systems and developers use against them.",
   "A buffer is a fixed-size area of memory reserved to hold data, such as a 64-character username field. A buffer overflow occurs when a program writes more data into the buffer than it can hold and does not check the length. The extra data spills into adjacent memory, overwriting other variables or control information such as the return address that tells the program where to go next. The result may be a crash (a denial of service) or, if the attacker carefully controls what is overwritten, redirection of the program to run attacker-chosen code. Overflows are most common in languages like C and C++ that let programs manage memory directly without automatic bounds checking. Signs include crashes after unusually long input and logs showing oversized or repeated characters in fields.",
   "Defenses against overflows come from both developers and the platform. Developers validate input length, use safe functions that take a maximum size, and increasingly choose memory-safe languages such as Rust, Go, Java or C#. Operating systems add data execution prevention (DEP), which marks data areas of memory as non-executable, and address space layout randomization (ASLR), which places code and data at unpredictable addresses so an attacker cannot reliably know where to jump. Compilers add stack canaries, guard values that are checked before a function returns and that reveal if the stack was overwritten. Patching quickly matters because these flaws are often found in widely used software.",
   "A race condition occurs when a program's outcome depends on the timing of events, and an attacker can change something between two steps. The classic form is time-of-check to time-of-use (TOCTOU). A program checks something, such as 'does this user have permission to write this file?' and then, a moment later, uses it. If the attacker can swap the file for a different one, for example by replacing it with a link to a sensitive system file in that gap, the program acts on something it never checked. Race conditions also appear in financial systems, where two withdrawals processed at the same moment might both pass a balance check. Defenses include making check-and-use a single atomic operation, using proper locking, avoiding reliance on file names that can change, and designing transactions to be consistent.",
   "Memory injection means placing malicious code into the memory of a running, legitimate process and executing it there. Techniques include DLL injection, where a process is forced to load a malicious library, and process hollowing, where a legitimate process is started, its code is replaced in memory, and it continues running under a trusted name. Because the code runs inside a trusted process and may never be written to disk, it can evade traditional file-based antivirus. It is closely associated with fileless malware. Defenses include endpoint detection and response (EDR) tools that watch for suspicious memory writes and cross-process behavior, application allow listing, least privilege (so processes cannot open other processes' memory), and keeping systems patched.",
   "Walk through how these might appear in an investigation. An EDR alert shows that a normal system process opened a handle to a browser process, wrote a block of memory into it and started a new thread there. No new files were created on disk. That pattern, one process writing and executing code inside another, is memory injection. In another case a web server crashes repeatedly and each crash follows a request with a header thousands of characters long, suggesting a buffer overflow attempt. Each observation maps to a flaw type and a response: isolate the host, collect memory, and patch or harden the vulnerable software.",
   "Common mistakes: thinking ASLR or DEP fixes the underlying bug (they make exploitation harder, but the flaw should still be patched); believing buffer overflows only cause crashes; confusing a race condition with a denial of service; and assuming antivirus will catch memory injection just because it catches malicious files. Exam clue words: 'more data than the buffer can hold', 'overwrites adjacent memory', 'return address' point to buffer overflow. 'Between the check and the use', 'timing', 'file swapped after validation' point to TOCTOU race conditions. 'Code inserted into a running process', 'DLL injection', 'no file on disk' point to memory injection. Defenses to match: input bounds checking, DEP and ASLR for overflows; atomic operations and locking for race conditions; EDR and allow listing for memory injection."
  ],
  "terms": [
   [
    "Buffer overflow",
    "Writing more data to a buffer than it can hold, overwriting adjacent memory."
   ],
   [
    "Race condition",
    "A flaw where the result depends on the timing of events that an attacker can influence."
   ],
   [
    "TOCTOU",
    "Time-of-check to time-of-use, a race condition where a resource changes between being checked and being used."
   ],
   [
    "Memory injection",
    "Placing and running malicious code inside the memory of a legitimate running process."
   ],
   [
    "DLL injection",
    "Forcing a running process to load a malicious dynamic link library."
   ],
   [
    "ASLR",
    "Address space layout randomization, which randomizes memory locations to make exploitation harder."
   ],
   [
    "DEP",
    "Data execution prevention, which marks data regions of memory as non-executable."
   ]
  ],
  "example": "A printing service on Linux runs as root and checks that a user owns a file before copying it into a spool directory. A researcher shows that, in the split second between the ownership check and the copy, the file can be replaced with a link to a protected system file. The vendor fixes this TOCTOU race by opening the file once and performing the check on the open file handle, so the same object is checked and used, and administrators apply the update.",
  "tip": "TOCTOU is about the gap between checking and using, so the fix is to make them one atomic step. Buffer overflows are about writing past a fixed size, so the fix is bounds checking, helped by DEP and ASLR.",
  "check": [
   [
    "How does ASLR make buffer overflow exploitation harder?",
    "It randomizes where code and data sit in memory, so an attacker cannot reliably predict the address to redirect execution to."
   ],
   [
    "A program verifies a file's permissions and then opens it by name moments later. Why is this risky?",
    "It creates a TOCTOU window where the file can be swapped between the check and the use."
   ],
   [
    "Why can memory injection evade traditional antivirus?",
    "The malicious code runs inside a legitimate process's memory and may never be written to disk as a file to scan."
   ],
   [
    "Which programming choice reduces the risk of buffer overflows at the source?",
    "Using memory-safe languages or safe functions that enforce bounds checking."
   ]
  ]
 },
 {
  "t": "Threat modeling",
  "body": [
   "Threat modeling is a structured way of thinking about what could go wrong with a system before attackers find out for you. You describe the system, identify threats against it, decide which matter most, and plan controls. It is most valuable early, during design, when changing the architecture is cheap, but it also helps when reviewing existing systems or major changes. Security+ touches threat modeling in several places: threat actors and vectors, secure development, risk management and attack frameworks. The core skill is asking 'who would attack this, how, and what would it cost us?'",
   "A common four-question approach guides most methods. What are we working on? Draw the system, often as a data flow diagram showing users, processes, data stores, external systems and the flows between them, with trust boundaries marking where data crosses from one level of trust to another (for example from the internet into the web server). What can go wrong? List threats at each element and boundary. What are we going to do about it? Choose mitigations, or decide to accept, transfer or avoid a risk. Did we do a good job? Review the model after changes, incidents and testing.",
   "Frameworks help you avoid missing categories of threat. STRIDE, developed at Microsoft, names six threat types: Spoofing (pretending to be someone else, countered by authentication), Tampering (changing data, countered by integrity controls), Repudiation (denying actions, countered by logging and signatures), Information disclosure (leaking data, countered by confidentiality controls), Denial of service (countered by availability controls), and Elevation of privilege (gaining rights you should not have, countered by authorization). Attack trees break a goal such as 'steal customer data' into branches of ways to achieve it, which helps show the cheapest path for an attacker. PASTA is a risk-centered, seven-stage process that ties threats to business impact.",
   "Threat intelligence frameworks make models realistic. MITRE ATT&CK is a public knowledge base of real attacker tactics (the goal, such as initial access or persistence) and techniques (how they do it), gathered from observed intrusions. Defenders use it to map which techniques their controls detect and where gaps remain. The Cyber Kill Chain describes intrusion stages from reconnaissance through weaponization, delivery, exploitation, installation, command and control, to actions on objectives; breaking any link stops the attack. The Diamond Model of Intrusion Analysis links adversary, capability, infrastructure and victim for each event.",
   "Walk through a small example. A team designs a mobile app that lets customers view bills. The data flow diagram shows the app, an API gateway, a billing service and a database, with trust boundaries between the phone and the internet-facing API and between the API and internal services. Applying STRIDE at the API boundary: spoofing (stolen tokens), tampering (changed account IDs in requests), repudiation (no logs of who viewed which bill), information disclosure (verbose errors), denial of service (request floods) and elevation of privilege (customer calling admin endpoints). Mitigations follow: short-lived OAuth tokens, server-side ownership checks, audit logging, generic errors, rate limiting and role checks. Each item goes into the backlog with an owner.",
   "Threat modeling connects directly to risk management. Each threat can be rated for likelihood and impact, sometimes with a scheme such as the Common Vulnerability Scoring System for known flaws or a simple high, medium, low scale. The output is a list of threats, the controls that address them, and the residual risk that remains. That list feeds the risk register, test plans for penetration testers, and detection rules for the security operations center.",
   "Common mistakes: treating threat modeling as a one-time document instead of a living model updated as the system changes; modeling only technical threats and ignoring insiders, suppliers and process abuse; trying to model everything at once instead of focusing on the most valuable assets and exposed boundaries; and confusing a threat (a potential cause of harm) with a vulnerability (a weakness) or a risk (the likelihood and impact of a threat exploiting a vulnerability). Another mistake is doing it without the people who build the system; developers know where the shortcuts are.",
   "Exam clue words: 'identify threats during design' points to threat modeling. 'Spoofing, tampering, repudiation' points to STRIDE. 'Tactics and techniques of real adversaries' points to MITRE ATT&CK. 'Stages from reconnaissance to actions on objectives' points to the Cyber Kill Chain. 'Adversary, infrastructure, capability, victim' points to the Diamond Model. 'Where data crosses between different levels of trust' is a trust boundary."
  ],
  "terms": [
   [
    "Threat modeling",
    "A structured process for identifying and prioritizing threats to a system and planning mitigations."
   ],
   [
    "Data flow diagram",
    "A diagram showing how data moves between users, processes and stores, used as the basis for a threat model."
   ],
   [
    "Trust boundary",
    "A point where data moves between areas with different levels of trust."
   ],
   [
    "STRIDE",
    "A threat categorization: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege."
   ],
   [
    "Attack tree",
    "A diagram breaking an attacker's goal into the alternative ways it could be achieved."
   ],
   [
    "MITRE ATT&CK",
    "A public knowledge base of real-world adversary tactics and techniques."
   ],
   [
    "Cyber Kill Chain",
    "A model of intrusion stages from reconnaissance to actions on objectives."
   ]
  ],
  "example": "Before launching a new payroll integration with a third-party provider, a company runs a threat modeling workshop with developers, the payroll owner and security. The data flow diagram shows a nightly file transfer across a trust boundary to the provider. Using STRIDE, they identify tampering with the file in transit and repudiation of changes, and add file signing, SFTP with key authentication and logging of every transfer before go-live.",
  "tip": "Map STRIDE letters to the security property they violate: spoofing breaks authentication, tampering breaks integrity, repudiation breaks non-repudiation, information disclosure breaks confidentiality, denial of service breaks availability, elevation of privilege breaks authorization.",
  "check": [
   [
    "When is threat modeling most cost-effective, and why?",
    "During design, because architectural changes are far cheaper before the system is built."
   ],
   [
    "An attacker changes an order total in a request before it reaches the server. Which STRIDE category is this?",
    "Tampering, a violation of integrity."
   ],
   [
    "How do defenders use MITRE ATT&CK in practice?",
    "They map known adversary techniques to their detections and controls to find gaps in coverage."
   ],
   [
    "What is a trust boundary and why do threat models focus on it?",
    "A point where data crosses between different trust levels; many threats occur there because input from a less trusted zone must be validated."
   ]
  ]
 },
 {
  "t": "Malware: ransomware, trojan, worm, spyware, rootkit, logic bomb, keylogger, fileless",
  "body": [
   "Malware is malicious software: any code designed to harm systems, steal data or give an attacker control. Security+ tests malware by behavior, so the skill is reading a short description of what something does and naming it. Many real samples combine several behaviors (a trojan that installs a keylogger and then spreads like a worm), so exam questions usually describe the defining behavior you should key on. Knowing the categories also tells you what to look for during an investigation and which controls help most.",
   "Ransomware encrypts a victim's files or systems and demands payment, usually in cryptocurrency, for the decryption key. Modern groups also steal data first and threaten to publish it (double extortion). It spreads through phishing, exposed remote access, stolen credentials and vulnerable internet-facing systems. The strongest defenses are offline or immutable backups that are regularly tested, patching, MFA on remote access, least privilege, segmentation and EDR. A trojan is malware disguised as legitimate software, such as a free utility or a cracked game, that the user installs willingly. A remote access trojan (RAT) gives the attacker ongoing remote control. Trojans do not self-replicate; they rely on deception.",
   "A virus attaches itself to a host file or program and spreads when that file is run or shared, so it needs human action. A worm spreads by itself across networks, usually by exploiting a vulnerability in a network service, with no user action required. Worms can spread extremely fast and cause heavy network load; patching and segmentation are key defenses. Spyware secretly gathers information about a user, such as browsing activity, credentials or location. Bloatware is unwanted software preinstalled by a vendor that wastes resources and can add vulnerabilities; it is not always malicious but increases the attack surface.",
   "A keylogger records keystrokes to capture passwords, messages and card numbers, then sends them to the attacker; it can be software or a small hardware device between keyboard and computer. MFA limits the value of stolen passwords. A rootkit hides deep in the operating system, sometimes in the kernel or firmware, to conceal itself and other malware from users and security tools while keeping privileged access. Because the infected system cannot be trusted to report on itself, detection often requires booting from trusted external media, and remediation usually means reimaging. Secure boot and measured boot help prevent rootkits from loading. A logic bomb is code planted inside a legitimate program that triggers a malicious action when a condition is met, such as a date or an employee's name being removed from the payroll; it is strongly associated with malicious insiders.",
   "Fileless malware runs in memory and abuses legitimate built-in tools such as PowerShell, Windows Management Instrumentation (WMI) or macros, often storing its persistence in the registry or scheduled tasks rather than as a normal executable file. Because there is little or nothing on disk to scan, signature-based antivirus struggles. Defenses include EDR with behavioral detection, PowerShell logging and constrained language mode, restricting scripting to those who need it, application allow listing and disabling Office macros from the internet.",
   "Walk through an indicator-based identification. Symptom set one: files across shared drives are renamed with a new extension and a text file demanding payment appears in every folder; that is ransomware. Set two: dozens of servers on the network are infected within minutes, all running the same unpatched service, and no users opened anything; that is a worm. Set three: security tools report a clean system, yet network monitoring shows the host beaconing to an unknown IP, and a scan from a boot USB finds hidden drivers; that is a rootkit. Set four: a script in the payroll system deletes records the day after a developer's account is disabled; that is a logic bomb.",
   "Common mistakes: confusing viruses and worms (the worm needs no user action); calling any unwanted program a trojan (trojans specifically masquerade as something useful); thinking antivirus alone handles fileless malware or rootkits; and believing paying the ransom guarantees recovery. Law enforcement agencies generally advise against paying, and decryption often fails or is partial.",
   "Exam clue words: 'encrypted files and payment demand' is ransomware; 'disguised as legitimate software' is a trojan; 'spreads without user interaction' is a worm; 'records keystrokes' is a keylogger; 'hides its presence, kernel level, hides other malware' is a rootkit; 'triggers on a date or event' is a logic bomb; 'runs in memory, uses PowerShell, no files on disk' is fileless; 'tracks user activity' is spyware."
  ],
  "terms": [
   [
    "Ransomware",
    "Malware that encrypts data or systems and demands payment for recovery, often also stealing data."
   ],
   [
    "Trojan",
    "Malware disguised as legitimate software that the user installs willingly."
   ],
   [
    "Worm",
    "Self-replicating malware that spreads across networks without user action."
   ],
   [
    "Rootkit",
    "Malware that hides deep in the OS or firmware to conceal itself and maintain privileged access."
   ],
   [
    "Logic bomb",
    "Malicious code that triggers when a specific condition, such as a date or event, occurs."
   ],
   [
    "Keylogger",
    "Software or hardware that records keystrokes to capture sensitive input."
   ],
   [
    "Fileless malware",
    "Malware that runs in memory and abuses legitimate tools, leaving little or nothing on disk."
   ],
   [
    "Spyware",
    "Malware that secretly monitors and collects information about a user."
   ]
  ],
  "example": "An EDR console flags a Word document that launched PowerShell, which then downloaded and ran code entirely in memory and created a scheduled task to re-run itself at logon. Antivirus scans find no malicious files. The analyst identifies fileless malware, isolates the host, collects a memory image, removes the scheduled task and blocks macros in documents downloaded from the internet across the organization.",
  "tip": "Virus needs a user to run an infected file; worm spreads by itself. Logic bomb waits for a condition; rootkit hides itself. Fileless malware lives in memory and abuses built-in tools.",
  "check": [
   [
    "Malware spreads to hundreds of unpatched servers in an hour with no user clicking anything. What type is it?",
    "A worm, because it self-replicates across the network without user action."
   ],
   [
    "Why is reimaging often recommended after a rootkit infection?",
    "The rootkit can hide itself from the OS and tools, so the system can no longer be trusted to report or clean itself."
   ],
   [
    "A former developer's code deletes records on the first day of the month after his departure. What is this?",
    "A logic bomb, triggered by a date condition."
   ],
   [
    "Why do traditional signature-based tools struggle with fileless malware?",
    "It runs in memory and uses legitimate built-in tools, leaving few or no malicious files on disk to scan."
   ]
  ]
 },
 {
  "t": "Password attacks: spraying, brute force, credential stuffing",
  "body": [
   "Passwords remain the most common form of authentication, and attackers have several reliable ways to guess or reuse them. Security+ expects you to recognize the main password attacks from their patterns in logs and to choose the right defense for each. The difference between them is mostly about how many passwords are tried against how many accounts, and where the guesses come from. Once you can picture that pattern, both identifying the attack and picking the control become straightforward.",
   "A brute force attack tries many passwords against one account, potentially every possible combination. Online brute force targets a live login page or service, so it is slow and noisy and is stopped by account lockout, rate limiting and MFA. Offline brute force happens after an attacker steals a file of password hashes; they can then guess at full speed on their own hardware with no lockout at all. This is why salted, slow hashing with key stretching (bcrypt, scrypt, Argon2, PBKDF2) matters: it makes each offline guess expensive. A dictionary attack is a smarter brute force that tries common passwords, words and known leaked passwords, often with rules that add numbers and symbols. Hybrid attacks combine both approaches.",
   "Password spraying flips the pattern. Instead of many passwords against one account, the attacker tries one or a few very common passwords (such as a season and year) against many accounts. Because each account sees only one or two failures, account lockout thresholds are never reached, and the attack slips under simple detection. Spraying is especially effective against large organizations with predictable username formats and cloud login portals. Detection requires looking across accounts: many accounts each failing once or twice from the same source or at the same time is the signature. Defenses are MFA, banning common and breached passwords, smart lockout and monitoring for distributed failures.",
   "Credential stuffing uses real username and password pairs stolen from a breach of some other website. Because many people reuse passwords, attackers use automated tools to try those pairs against other sites, such as banking, email and retail. The success rate per pair is low, but with millions of pairs the results add up. Logs show many different accounts attempted, often with a relatively high success rate compared to spraying, and traffic from many IP addresses or botnets. Defenses are MFA, checking passwords against known-breached lists, bot detection and rate limiting, and user education about password managers and never reusing passwords.",
   "Walk through reading an authentication log. Pattern A: account 'jlee' has 3,000 failed logins in ten minutes from one IP, then locks out; that is online brute force. Pattern B: 4,000 different accounts each have exactly one failed login with the same password guess within an hour, all from a small group of addresses; that is password spraying. Pattern C: 20,000 different username and password pairs are tried from many residential IPs, and 200 succeed on accounts whose passwords appear in a public breach; that is credential stuffing. Pattern D: no failed logins at all, but hashes were stolen last week and several accounts now log in from new countries; that suggests offline cracking.",
   "Password policy has shifted in recent years. Current guidance, such as the NIST digital identity guidelines, favors length over complexity, screening new passwords against lists of known-compromised and common passwords, not forcing regular changes without evidence of compromise, and allowing password managers. Passwordless options such as passkeys and FIDO2 security keys remove the shared secret entirely and resist phishing. Security+ lists password best practices including length, complexity, reuse restrictions, expiration and age, and you should also know the trend toward passwordless authentication.",
   "Common mistakes: believing account lockout stops spraying (it does not, because each account gets too few attempts); thinking lockout helps against offline attacks (the attacker is not using your login page); confusing credential stuffing with brute force (stuffing uses known real credentials from other breaches); and assuming complex password rules alone solve the problem, when MFA is the single most effective control. Another mistake is setting lockout so aggressively that attackers can lock out every account on purpose, which becomes a denial of service.",
   "Exam clue words: 'one password against many accounts', 'avoids lockout' is spraying; 'many passwords against one account' is brute force; 'credentials from a previous breach on another site', 'password reuse' is credential stuffing; 'stolen hash file', 'no lockout applies' is offline cracking; 'common words list' is dictionary. When asked for the best single defense against all of these, choose MFA."
  ],
  "terms": [
   [
    "Brute force attack",
    "Trying many possible passwords against an account until one works."
   ],
   [
    "Dictionary attack",
    "A guessing attack using lists of common words and known passwords."
   ],
   [
    "Password spraying",
    "Trying a few common passwords against many accounts to avoid lockout."
   ],
   [
    "Credential stuffing",
    "Using username and password pairs stolen from one breach to log in to other services."
   ],
   [
    "Offline attack",
    "Cracking stolen password hashes on the attacker's own hardware, where no lockout applies."
   ],
   [
    "Account lockout",
    "Disabling an account temporarily after a set number of failed login attempts."
   ],
   [
    "Passwordless authentication",
    "Logging in without a shared password, for example with passkeys or FIDO2 security keys."
   ]
  ],
  "example": "A cloud email tenant shows about 6,000 accounts each receiving one failed login within two hours, all with the same password attempt and from a handful of hosting-provider IP addresses. No account locks out. The security team recognizes password spraying, blocks the source addresses, enforces MFA for the remaining users who had not enrolled, and adds a banned-password list that rejects season-and-year passwords.",
  "tip": "Account lockout defeats online brute force but not spraying or offline cracking. MFA is the best general answer, and 'one password, many accounts' always means spraying.",
  "check": [
   [
    "Why does password spraying avoid account lockout?",
    "Each account receives only one or a few attempts, staying under the lockout threshold."
   ],
   [
    "An attacker uses passwords leaked from a gaming site to log in to employees' corporate email. What is this attack, and why does it work?",
    "Credential stuffing; it works because people reuse the same password across services."
   ],
   [
    "Why doesn't account lockout protect against offline brute force?",
    "The attacker is guessing against stolen hashes on their own hardware, not through the login system that enforces lockout."
   ],
   [
    "Which control most effectively reduces the impact of all three attacks?",
    "Multifactor authentication, because a correct password alone is not enough to log in."
   ]
  ]
 },
 {
  "t": "Crypto attacks: downgrade, collision, birthday",
  "body": [
   "Strong cryptographic algorithms are rarely broken head-on. Attackers instead look for ways around them: forcing systems to use weaker options, exploiting weaknesses in older hash functions, or taking advantage of the mathematics of probability. Security+ names three cryptographic attacks you should recognize: downgrade, collision and birthday attacks. Understanding them explains why old protocols and algorithms are retired, and why configuration matters as much as algorithm choice.",
   "A downgrade attack tricks two parties into negotiating a weaker protocol version or cipher than both actually support. Many protocols, including TLS, begin with a negotiation where client and server agree on the best version and cipher they both support. An on-path attacker who can interfere with that negotiation may make each side believe the other only supports an old, vulnerable option, such as an outdated SSL or TLS version or an export-grade cipher. Once downgraded, the attacker can exploit the weaker protocol's known flaws. SSL stripping is a related attack that rewrites HTTPS links to plain HTTP so the user never gets an encrypted connection at all.",
   "Defenses against downgrades are mostly configuration. Disable old protocol versions (SSL 2.0, SSL 3.0, TLS 1.0 and 1.1) and weak cipher suites on servers and clients, so there is nothing weak to fall back to. TLS 1.3 includes built-in downgrade protection and removes many legacy options. For websites, HTTP Strict Transport Security (HSTS) tells browsers to always use HTTPS, defeating SSL stripping, and HSTS preload lists protect even the first visit. Regularly scanning your servers' TLS configuration shows whether weak options are still enabled.",
   "A collision occurs when two different inputs produce the same hash. A good cryptographic hash should make collisions infeasible to find. When researchers show practical ways to create collisions, as has been done for MD5 and SHA-1, the algorithm can no longer be trusted for security. The danger is forgery: if an attacker can create a harmless document and a malicious one with the same hash, a signature on the harmless version is also valid for the malicious one, because signatures are made over the hash. Real attacks have used MD5 collisions to forge certificates. The defense is to use collision-resistant algorithms such as SHA-256, SHA-384 or SHA-3 and to stop accepting MD5 and SHA-1 for signatures.",
   "The birthday attack is based on the birthday paradox: in a room of just 23 people, there is about a 50 percent chance that two share a birthday, far fewer than most people expect. The same math applies to hashes. Finding any two inputs that collide takes roughly the square root of the number of possible hash values, not the full number. For an n-bit hash, that is about 2 to the power of n/2 attempts. So a 128-bit hash like MD5 offers only about 64 bits of collision resistance, which is within reach of modern computing. The defense is simply longer hash outputs: SHA-256 gives about 128 bits of collision resistance, which is far beyond practical attack.",
   "Walk through a hardening check. A security team scans its public web servers and finds one still accepting TLS 1.0 with an old cipher suite for 'compatibility'. They confirm with logs that no real clients use it, disable it, enable TLS 1.2 and 1.3 only, and turn on HSTS. A tool such as the following command shows which protocol a server will negotiate:",
   "```\nopenssl s_client -connect www.example.com:443 -tls1_1\n# a handshake failure here is the desired result once old versions are disabled\n```",
   "Common mistakes: thinking a strong algorithm protects you if weak ones are still enabled (downgrade attacks target the weakest option offered); treating a collision as the same as reversing a hash (a collision finds two inputs with equal hashes, it does not recover the original input); believing the birthday attack is about guessing people's birthdays; and assuming the attack requires the full 2^n work. Exam clue words: 'forced to use an older, weaker protocol', 'negotiation', 'fallback' point to a downgrade. 'Two different files with the same hash' is a collision. 'Probability', 'square root', 'shorter hash is more vulnerable' point to a birthday attack. The fixes are to disable legacy protocols and use HSTS for downgrades, and to use modern, longer hash functions for collision and birthday attacks."
  ],
  "terms": [
   [
    "Downgrade attack",
    "Forcing parties to negotiate a weaker protocol version or cipher than both support."
   ],
   [
    "SSL stripping",
    "Rewriting HTTPS connections or links to plain HTTP so traffic is not encrypted."
   ],
   [
    "Collision",
    "Two different inputs that produce the same hash value."
   ],
   [
    "Birthday attack",
    "Exploiting probability to find hash collisions in roughly the square root of the possible hash values."
   ],
   [
    "Collision resistance",
    "The property that it is infeasible to find two inputs with the same hash."
   ],
   [
    "HSTS",
    "HTTP Strict Transport Security, a header that tells browsers to use only HTTPS for a site."
   ]
  ],
  "example": "An auditor finds that an internal code-signing process still uses SHA-1. Because practical SHA-1 collisions have been demonstrated, an attacker could in principle prepare a benign and a malicious file with the same hash, get the benign one signed, and reuse the signature. The team migrates signing to SHA-256, re-signs current releases and configures endpoints to reject SHA-1 signatures.",
  "tip": "Downgrade attacks exploit whatever weak option is still enabled, so the fix is to disable it. Birthday attacks halve a hash's effective strength against collisions, so the fix is a longer, modern hash.",
  "check": [
   [
    "Why does disabling old TLS versions protect against downgrade attacks?",
    "If weak versions are not supported, there is nothing weaker for an attacker to force the connection down to."
   ],
   [
    "What makes a collision dangerous for digital signatures?",
    "Signatures are made over the hash, so if two documents share a hash, a signature on one is valid for the other."
   ],
   [
    "Approximately how much work does a birthday attack need against a 128-bit hash?",
    "About 2 to the power of 64 attempts, the square root of the number of possible values."
   ],
   [
    "Is finding a collision the same as reversing a hash to its original input?",
    "No; a collision finds two inputs that share a hash, while reversing (a preimage attack) finds an input for a given hash."
   ]
  ]
 },
 {
  "t": "Indicators: impossible travel, account lockout, resource consumption, missing logs",
  "body": [
   "An indicator of malicious activity is an observable clue that something is wrong: an odd login, a spike in traffic, a log that should be there but is not. Security+ lists a set of indicators that often signal an attack in progress, and exam questions typically describe one or two of them and ask what is happening or what to investigate. Recognizing indicators is the everyday work of security operations center (SOC) analysts, who see them in the security information and event management (SIEM) system, identity provider logs and endpoint alerts. The goal is to connect the clue to a likely cause and a sensible next step.",
   "Impossible travel means one account logs in from two places too far apart to travel between in the time elapsed, such as London at 09:00 and Singapore at 09:20. It strongly suggests the credentials or session token are being used by someone else. Be aware of false positives: VPNs, cloud proxies and mobile networks can make a legitimate user appear in another country. Concurrent session usage is a related indicator, where the same account is active from two devices or locations at once when that is unusual for the user. Response usually means verifying with the user, revoking sessions, resetting credentials and checking MFA settings for attacker-added devices.",
   "Account lockout indicators appear when accounts lock because of repeated failed logins. One user locking themselves out after a password change is normal. Many accounts locking at once, or a single privileged account locking repeatedly, suggests brute force or password spraying. Blocked content is another indicator: the web proxy, email gateway or endpoint agent blocking attempts to reach known-malicious sites or run blocked files shows that something, perhaps malware, is trying. Out-of-cycle logging, meaning activity at unusual times such as an accountant logging in at 03:00 on a Sunday, can reveal stolen credentials or an insider.",
   "Resource consumption indicators include unexpectedly high CPU, memory, disk or network use. A server whose CPU is pinned at 100 percent overnight might be running a cryptominer; a workstation sending gigabytes outbound might be exfiltrating data; a disk filling rapidly might be ransomware writing encrypted copies or an attacker staging stolen data. Resource inaccessibility, where files suddenly cannot be opened or services stop responding, is a classic ransomware or denial-of-service sign.",
   "Missing logs are among the most important indicators, because attackers often clear or disable logging to cover their tracks. A gap in a server's security log, a log file that is suddenly much smaller than usual, the audit service being stopped, or a Windows 'audit log was cleared' event (event ID 1102) should prompt immediate investigation. Centralizing logs in a SIEM or a write-once store protects against this, because the attacker cannot easily erase copies they cannot reach. Other indicators the objectives mention include published or documented evidence of compromise, such as your data appearing on a leak site, and unusual account changes like new administrator accounts or disabled MFA.",
   "Walk through a triage example. The SIEM raises three alerts within an hour for the same finance user: an impossible travel login from a foreign country, an inbox rule that forwards all mail containing 'invoice' to an external address, and the user's MFA method changed to a new phone. Separately, the mail server's audit logging stopped for twenty minutes. Together these indicators point to a compromised account being prepared for business email compromise, with the attacker trying to hide. The analyst disables the account, revokes sessions, removes the rule and the new MFA device, and restores audit logging before investigating how the credentials were stolen.",
   "Common mistakes: treating a single indicator as proof (indicators suggest, investigation confirms, and correlation across sources raises confidence); ignoring indicators because they are 'probably the VPN'; and forgetting that the absence of data, missing logs, is itself an indicator. Another trap is confusing indicators of compromise (IoCs), which are specific artifacts such as file hashes, malicious IP addresses and domains, with behavioral indicators such as impossible travel. Both are valuable, but behavioral indicators still work when attackers change their tools.",
   "Exam clue words: 'logins from two distant countries minutes apart' is impossible travel; 'many accounts locked at once' suggests password spraying or brute force; 'CPU at 100 percent, unknown process' suggests cryptomining; 'gaps in logs' or 'log cleared' suggests an attacker covering tracks; 'files cannot be opened' suggests ransomware; 'activity outside normal hours' is out-of-cycle logging. When asked for the next step, pick the action that verifies and contains, such as disabling the account or isolating the host, before deep analysis."
  ],
  "terms": [
   [
    "Indicator",
    "An observable clue that suggests malicious activity may be occurring."
   ],
   [
    "Impossible travel",
    "Logins from locations too far apart to reach in the time between them."
   ],
   [
    "Concurrent session usage",
    "The same account active in multiple places at once when that is not normal."
   ],
   [
    "Resource consumption",
    "Unusual CPU, memory, disk or network use that may signal malware or exfiltration."
   ],
   [
    "Missing logs",
    "Gaps or deletions in logging, often caused by attackers covering their tracks."
   ],
   [
    "Out-of-cycle logging",
    "Activity recorded at unusual times for the user or system."
   ],
   [
    "Indicator of compromise (IoC)",
    "A specific artifact, such as a hash, IP address or domain, linked to known malicious activity."
   ]
  ],
  "example": "A monitoring dashboard shows a database server's CPU at 95 percent every night between 01:00 and 05:00, with steady outbound connections to an unfamiliar host on a nonstandard port. No jobs are scheduled at that time. The analyst finds an unknown process running under the web service account, identifies it as a cryptominer installed through an unpatched web application, isolates the server, and adds an alert for sustained CPU use outside business hours.",
  "tip": "Missing or cleared logs are an indicator in their own right. When one indicator appears, look for others on the same account or host; correlation is what turns a clue into an incident.",
  "check": [
   [
    "A user appears to log in from New York and then Tokyo fifteen minutes later. What does this indicate and what could cause a false positive?",
    "Impossible travel, suggesting stolen credentials; a VPN or cloud proxy could make a legitimate login appear in another country."
   ],
   [
    "Why are missing logs a strong indicator of compromise?",
    "Attackers frequently clear or disable logging to hide their activity, so unexplained gaps suggest someone is covering tracks."
   ],
   [
    "Hundreds of accounts lock out within minutes. What attack is likely?",
    "A brute force or password-spraying attempt across many accounts."
   ],
   [
    "How does sending logs to a central SIEM help against log tampering?",
    "Copies are stored off the compromised host, so an attacker who clears local logs cannot easily erase the central record."
   ]
  ]
 },
 {
  "t": "Segmentation and isolation",
  "body": [
   "Segmentation divides a network into smaller zones and controls the traffic between them. Its purpose is containment: if an attacker compromises one device, segmentation limits how far they can move (lateral movement) and what they can reach. A flat network, where every device can talk to every other device, lets a single infected laptop reach the payroll database, the backups and the building control system. Security+ treats segmentation as one of the core mitigation techniques, alongside isolation, which is the stronger form of separation for high-risk or compromised systems.",
   "Segmentation is built in layers. Physical segmentation uses separate switches and cabling. Virtual local area networks (VLANs) separate traffic logically on shared switches, placing, for example, user workstations, servers, voice phones and guest Wi-Fi in different broadcast domains. Traffic between VLANs must pass through a router or firewall, where access control lists (ACLs) and firewall rules decide what is allowed. A screened subnet (formerly called a DMZ) holds internet-facing servers such as web and mail servers in their own zone between the internet and the internal network, so a compromised web server does not give direct access inside.",
   "Microsegmentation takes the idea down to the individual workload. Instead of broad zones, policies are applied per application or even per virtual machine or container, often by software-defined networking or host-based firewalls, so that the web tier can talk only to the application tier on one port, and the application tier only to the database. It is a key building block of zero trust. In cloud environments the same concepts appear as virtual private clouds, subnets and security groups. Traffic is often described by direction: north-south traffic enters or leaves the data center, while east-west traffic moves between systems inside it. Traditional perimeter firewalls watch north-south traffic well, but attackers moving laterally generate east-west traffic, which is exactly what microsegmentation controls.",
   "Isolation separates a system completely or almost completely. An air-gapped network has no connection to other networks at all, used for highly sensitive systems such as some industrial control or classified environments; data moves only by carefully controlled removable media. Isolation is also an incident response action: quarantining an infected host by moving it to an isolation VLAN or using the EDR agent's network containment feature, which cuts it off from everything except the security tools. Sandboxing isolates untrusted code or files so they can run or be analyzed without touching the real system. Browsers, email security gateways and malware analysts all use sandboxes, and virtualization or containers can provide similar separation for workloads that must not affect each other.",
   "Walk through designing segments for a mid-sized company. Users go in one VLAN, servers in another, printers and IoT devices in a third, guests on an internet-only network, and the payment card systems in a dedicated zone to shrink the scope of PCI DSS assessment. Firewall rules between zones follow deny by default: users may reach servers on specific application ports; printers may receive print jobs but not start connections to servers; guests may reach only the internet. A rule might look like this in pseudo-configuration:",
   "```\n# allow users to the web app tier only\npermit tcp 10.10.0.0/16 -> 10.20.5.0/24 port 443\n# block IoT from initiating to servers\ndeny ip 10.30.0.0/16 -> 10.20.0.0/16\n# default\ndeny ip any -> any log\n```",
   "Segmentation is only as good as its rules and monitoring. Overly broad rules such as 'any to any' between zones undo the benefit, and exceptions added during projects tend to stay forever unless reviewed. Traffic between segments is also a great place to monitor, because lateral movement has to cross those boundaries. Common mistakes: assuming VLANs alone provide security (without filtering between them, traffic can still be routed freely); confusing segmentation (controlled communication) with isolation (little or no communication); and forgetting management interfaces, which should live on their own restricted network.",
   "Exam clue words: 'limit lateral movement', 'contain a breach', 'separate IoT from corporate' point to segmentation. 'Per-workload policy' or 'east-west traffic between servers' points to microsegmentation. 'No network connection at all' is an air gap. 'Quarantine an infected host' is isolation or containment. 'Reduce the number of systems in scope for PCI DSS' points to segmenting the cardholder data environment. When a legacy system cannot be patched, isolation or segmentation is usually the best compensating control."
  ],
  "terms": [
   [
    "Segmentation",
    "Dividing a network into zones and controlling traffic between them to limit an attacker's reach."
   ],
   [
    "VLAN",
    "A virtual LAN that logically separates traffic on shared switch hardware."
   ],
   [
    "Screened subnet",
    "A zone between the internet and the internal network for public-facing servers; formerly called a DMZ."
   ],
   [
    "Microsegmentation",
    "Fine-grained segmentation that applies policy to individual workloads or applications."
   ],
   [
    "Lateral movement",
    "An attacker moving from one compromised system to others within a network."
   ],
   [
    "Air gap",
    "Physical isolation of a system or network from all other networks."
   ],
   [
    "Isolation",
    "Separating a system so it cannot communicate, used for high-risk systems or during incident response."
   ]
  ],
  "example": "A manufacturer's office network is hit by ransomware through a phishing email. The file servers are encrypted, but the factory's control systems keep running because they sit in a separate segment with only one tightly controlled connection to a historian server, and that connection is blocked automatically when the SOC isolates the office VLAN. Production continues while IT restores office systems from backup.",
  "tip": "VLANs create separation, but firewalls or ACLs between them create security. If a question asks how to limit lateral movement or protect an unpatchable device, segmentation or isolation is usually the answer.",
  "check": [
   [
    "Why does a flat network increase the impact of a single compromised laptop?",
    "Every device can reach every other device, so the attacker can move laterally to servers and sensitive systems."
   ],
   [
    "What is the difference between segmentation and isolation?",
    "Segmentation controls and restricts communication between zones; isolation cuts a system off almost entirely."
   ],
   [
    "How can segmentation reduce PCI DSS assessment scope?",
    "Placing cardholder data systems in a tightly controlled segment means systems outside it are not in scope if they cannot reach it."
   ],
   [
    "Why is microsegmentation associated with zero trust?",
    "It applies policy to each workload, removing implicit trust between systems in the same network zone."
   ]
  ]
 },
 {
  "t": "Least privilege, access control lists",
  "body": [
   "The principle of least privilege says that every user, process and system should have only the access it needs to do its job, and no more, for only as long as it needs it. It matters because excess access turns small incidents into large ones: if a phished user is a local administrator, the malware runs as administrator; if a web application's database account can drop tables, a SQL injection flaw can destroy data. Least privilege does not stop every attack, but it limits the blast radius of the attacks that succeed.",
   "Least privilege applies everywhere. Users get standard accounts for daily work and separate privileged accounts, used only when needed, for administration. Service accounts get only the permissions their application uses. Applications run as low-privilege users rather than root or SYSTEM. Cloud roles grant specific actions on specific resources instead of broad administrator policies. Related principles support it: need to know (access to specific information only when required for a task), separation of duties (no single person controls a whole sensitive process), and just-in-time access (privileges granted temporarily when requested and removed automatically).",
   "Access control lists (ACLs) are one of the main tools that implement least privilege. An ACL is an ordered list of rules attached to a resource that says who or what is allowed or denied which kind of access. File system ACLs, such as NTFS permissions on Windows or POSIX ACLs on Linux, list users and groups with rights like read, write, modify and execute. Network ACLs on routers, switches and cloud subnets list permit and deny rules based on source and destination addresses, protocols and ports. The concept is the same: explicit rules attached to a resource, evaluated when access is attempted. Cloud platforms add their own versions, such as network ACLs on subnets and security groups on instances, and identity policies that list which actions a role may perform on which resources.",
   "Network ACLs are usually processed top-down, and the first matching rule wins. Most end with an implicit deny: anything not explicitly permitted is blocked. That makes rule order critical. A broad permit placed above a specific deny means the deny is never reached. On file systems, Windows evaluates the combination of permissions from all a user's groups, and an explicit deny normally overrides an allow. Managing access through groups rather than individual users keeps ACLs readable and makes changes safer. When a new analyst joins, you add them to the 'Finance-Read' group instead of editing dozens of individual ACL entries, and when they leave, one removal takes away all of that access at once.",
   "Here is a worked example of a network ACL protecting a database subnet. The goal is to allow only the application servers to reach the database on its port, allow the monitoring server to check it, and block everything else while logging attempts:",
   "```\naccess-list DB-IN permit tcp 10.20.5.0 0.0.0.255 host 10.30.1.10 eq 1433\naccess-list DB-IN permit icmp host 10.99.0.5 host 10.30.1.10\naccess-list DB-IN deny   ip any any log\n```\n",
   "Least privilege decays over time through privilege creep: people change roles, keep old permissions, and gain new ones, until a long-serving employee can reach almost everything. Regular access reviews (recertification), where managers confirm each person's access is still needed, are the control that counters creep. Automated provisioning tied to roles, and prompt deprovisioning when people leave, keep permissions aligned with jobs. Monitoring privileged account use and alerting on new admin group members help catch misuse. Privileged access management (PAM) tools go further by vaulting administrator credentials, checking them out only for approved tasks and recording the sessions.",
   "Common mistakes: granting broad access 'temporarily' and never removing it; confusing ACLs with firewalls in general (a firewall uses rules like an ACL but may also track connection state and inspect applications); placing rules in the wrong order; forgetting the implicit deny; and thinking least privilege only applies to people, when service accounts and applications are often the most over-privileged. Exam clue words: 'only the permissions needed for the job' is least privilege; 'employee kept access from a previous role' is privilege creep, fixed by access reviews; 'rule order', 'permit and deny entries', 'implicit deny' point to ACLs; 'no single person can complete the process alone' is separation of duties."
  ],
  "terms": [
   [
    "Least privilege",
    "Granting only the minimum access needed to perform a task, for only as long as needed."
   ],
   [
    "Access control list (ACL)",
    "An ordered list of rules on a resource specifying which subjects are allowed or denied which access."
   ],
   [
    "Implicit deny",
    "The default rule that blocks anything not explicitly permitted."
   ],
   [
    "Privilege creep",
    "The gradual accumulation of unnecessary access as users change roles."
   ],
   [
    "Access review",
    "A periodic check where owners confirm that each user's access is still required."
   ],
   [
    "Need to know",
    "Restricting access to information to those who require it for a specific task."
   ],
   [
    "Separation of duties",
    "Splitting a sensitive process among several people so no one can complete it alone."
   ]
  ],
  "example": "An access review at a hospital finds that a nurse who moved into a billing role three years ago still has full access to clinical records, plus new billing permissions and an old membership in a server administrators group from a project. Her manager removes the clinical and admin rights, keeping only billing access. The company then automates role-based provisioning so that a role change triggers removal of the old role's access.",
  "tip": "ACLs are processed top-down with first match wins and an implicit deny at the end. If a specific deny is placed after a broad permit, the deny never takes effect.",
  "check": [
   [
    "How does least privilege reduce the impact of a successful phishing attack?",
    "Malware runs with the victim's limited rights, so it cannot install drivers, change system settings or reach data the user cannot access."
   ],
   [
    "A router ACL permits all traffic from 10.0.0.0/8 on line 1 and denies host 10.1.1.5 on line 2. Is 10.1.1.5 blocked?",
    "No; the first matching rule (the broad permit) applies, so the deny is never reached."
   ],
   [
    "Which control best addresses privilege creep?",
    "Regular access reviews (recertification), supported by role-based provisioning and deprovisioning."
   ],
   [
    "Why should administrators use separate accounts for administrative work?",
    "So everyday activities like email and browsing run without admin rights, limiting damage if those activities lead to compromise."
   ]
  ]
 },
 {
  "t": "Application allow listing",
  "body": [
   "Application allow listing (formerly called whitelisting) permits only approved software to run on a system and blocks everything else by default. It flips the traditional antivirus model. Antivirus uses a deny list: it tries to recognize known-bad programs and blocks them, which means brand-new malware, custom tools and many fileless techniques can slip through. An allow list instead asks 'is this program known and approved?' and refuses anything that is not, whether or not anyone has seen it before. That makes it one of the most effective controls against ransomware and unauthorized software. Government and industry security guidance consistently lists it among the highest-value defensive measures, precisely because it does not depend on recognizing the attacker's tools.",
   "Allow lists can identify approved applications in several ways, with different strengths. A file hash rule approves one exact file; it is very precise, but every update changes the hash, so rules must be updated with each patch. A publisher or certificate rule approves any software signed by a trusted vendor, which survives updates and is easier to maintain, but trusts everything that vendor signs. A path rule approves anything in a location such as C:\\Program Files; it is simple but weak if users can write to that folder. Many deployments combine publisher rules for commercial software with hash rules for specific tools and carefully chosen path rules for protected locations.",
   "Tools that implement allow listing include Windows Defender Application Control and AppLocker on Windows, similar controls in endpoint management and EDR platforms, and mechanisms on macOS and Linux. Mobile platforms work largely on this model already, allowing only signed apps from approved stores unless a device is jailbroken or sideloading is enabled. In servers and industrial systems, which run a small, stable set of software, allow listing is especially practical and effective.",
   "Deployment needs care, because a strict allow list can block legitimate work. The usual approach is: inventory the software actually in use, build rules from that inventory, run in audit mode (logging what would be blocked without blocking it), review and fix the gaps, then switch to enforcement. After that, a change process handles new software requests and updates. Starting with high-value, stable systems such as servers, kiosks and point-of-sale terminals gives quick wins before tackling varied user desktops. Developers and IT staff, who legitimately run many tools, usually need a more flexible policy or separate managed workstations, and the exception process should be quick enough that people do not look for ways around it.",
   "Walk through a practical scenario. A company's finance workstations are targeted by ransomware delivered as email attachments and by users installing unapproved remote access tools. The team deploys an allow list in audit mode for two weeks, learns that finance uses about thirty applications, creates publisher rules for the major vendors and hash rules for two in-house tools, and blocks execution from user-writable folders such as Downloads and Temp. In enforcement mode, a test ransomware sample dropped into Downloads cannot run, and a user's attempt to install an unapproved remote tool is blocked and logged for the help desk.",
   "Allow listing should cover more than executables. Scripts (PowerShell, JavaScript, VBScript), installers, libraries and macros can all run code, and attackers use them precisely because older allow lists ignored them. Attackers also abuse legitimate, allowed programs, sometimes called living off the land, by using trusted system tools to download or run malicious content. Good allow list policies therefore restrict or monitor built-in tools that ordinary users do not need, and combine allow listing with EDR to watch behavior.",
   "Common mistakes: confusing allow listing with deny listing (allow list blocks everything not approved; deny list blocks only what is known bad); using path rules on folders that users can write to; forgetting that hash rules break when software updates; deploying straight to enforcement without audit mode and causing outages; and assuming allow listing replaces patching (approved applications can still have vulnerabilities).",
   "Exam clue words: 'only approved applications can run', 'block unknown or zero-day malware', 'prevent users installing unauthorized software' point to application allow listing. 'Block known malicious files' points to a deny list or antivirus. 'Fixed-function systems such as kiosks, point of sale, industrial controllers' are classic allow listing candidates. When a question asks for the most effective control against unknown executables, allow listing beats antivirus."
  ],
  "terms": [
   [
    "Application allow listing",
    "Permitting only approved software to run and blocking everything else by default."
   ],
   [
    "Deny listing",
    "Blocking specific known-bad software while allowing everything else."
   ],
   [
    "Hash rule",
    "An allow list rule that approves a file by its exact cryptographic hash."
   ],
   [
    "Publisher rule",
    "An allow list rule that approves software signed by a trusted vendor's certificate."
   ],
   [
    "Path rule",
    "An allow list rule that approves programs in a specific folder location."
   ],
   [
    "Audit mode",
    "Running an allow list policy that logs would-be blocks without enforcing them."
   ],
   [
    "Living off the land",
    "Attackers using legitimate built-in tools to avoid detection and bypass controls."
   ]
  ],
  "example": "A retailer's point-of-sale terminals run the same five applications everywhere. After a competitor suffers card-skimming malware, the retailer deploys a strict allow list on every terminal using publisher and hash rules. Months later, an attacker who obtains a store manager's credentials copies a memory-scraping tool onto a terminal, but it is blocked from executing and an alert reaches the SOC within minutes.",
  "tip": "Allow listing is default-deny for software, so it stops unknown and zero-day executables that signature-based antivirus misses. Hash rules are precise but break on updates; publisher rules survive updates.",
  "check": [
   [
    "Why is application allow listing more effective than antivirus against brand-new malware?",
    "It blocks anything not explicitly approved, so it does not need to recognize the malware as bad."
   ],
   [
    "What is the main maintenance drawback of hash-based allow list rules?",
    "Every software update changes the file's hash, so rules must be updated each time."
   ],
   [
    "Why should allow lists be deployed in audit mode first?",
    "To discover which legitimate software would be blocked and fix rules before enforcement causes outages."
   ],
   [
    "Why is a path rule for a user-writable folder dangerous?",
    "Users or malware could place any program in that folder and it would be allowed to run."
   ]
  ]
 },
 {
  "t": "Patching, encryption, monitoring",
  "body": [
   "Three routine controls prevent or limit a huge share of real incidents: keeping software patched, encrypting data, and monitoring systems for signs of trouble. None is glamorous, and all of them are easy to do badly. Security+ lists them among the core mitigation techniques, and exam questions often present a scenario where one of them was missing and ask which would have helped most. Thinking about each in terms of what it prevents, detects or limits helps you choose.",
   "Patching fixes known vulnerabilities in operating systems, applications, firmware and devices. Many breaches exploit vulnerabilities for which a patch had been available for months. A good patch management process runs as a cycle: maintain an accurate asset inventory, learn about new patches and vulnerabilities, assess and prioritize them (considering severity, whether exploitation is happening in the wild, and how exposed the system is), test in a non-production environment, deploy through change management within a maintenance window, and verify success with scanning. Critical internet-facing systems and actively exploited vulnerabilities go first, sometimes as emergency changes. Automated patch tools and update rings, where a small pilot group gets patches before everyone else, speed this up while catching problems early.",
   "Patching has real obstacles. Some systems cannot be patched quickly because a vendor must certify updates, the system runs a critical process, or it is past end of life and gets no updates at all. In those cases compensating controls apply: segmentation, virtual patching through an intrusion prevention system or web application firewall rule that blocks the exploit pattern, disabling the vulnerable feature, or extra monitoring. Firmware on network devices, printers and IoT equipment is often forgotten and deserves a place in the process.",
   "Encryption protects confidentiality and, with the right modes, integrity. At rest, full disk encryption protects lost devices, database and file encryption protect stored data, and encrypted backups protect copies. In transit, TLS protects web and API traffic, VPNs protect remote access and site links, and SSH protects administration. Encryption is only as good as its key management: keys should be stored in a KMS or HSM, rotated, access-controlled and never hard-coded in source code. Encryption also helps with compliance, and many breach notification laws treat properly encrypted data differently when a device is lost.",
   "Monitoring gives you visibility, so you can detect what prevention missed. It includes collecting logs from systems, applications, firewalls and identity providers into a SIEM; endpoint monitoring through EDR; network monitoring with flow data and intrusion detection; and monitoring of availability and performance. Monitoring is only useful if someone or something acts on it: alerts must be tuned to reduce noise, routed to people who respond, and backed by playbooks. Monitoring also closes the loop on the other two controls, for example by confirming that patches applied and that encryption remains enabled across the fleet.",
   "Walk through a scenario that uses all three. A critical vulnerability is announced in a VPN appliance and is being exploited widely. The team finds three affected appliances in its inventory, applies the vendor's patch to two of them that night as an emergency change, and cannot patch the third until a hardware upgrade next week. For that one they apply the vendor's mitigation, restrict management access, and add SIEM rules for the known indicators. Traffic through the VPN is already encrypted with strong settings, and logs from all appliances are monitored so that any exploitation attempt before patching would be noticed.",
   "Common mistakes: treating patching as purely a technical task without inventory, testing and verification; assuming encryption protects data while a system is running and unlocked; storing encryption keys next to the encrypted data; collecting logs nobody reviews; and deploying monitoring without time synchronization, which makes correlating events across systems unreliable. Another common trap is patching only operating systems and forgetting third-party applications, browsers, libraries and firmware.",
   "Exam clue words: 'known vulnerability with an available fix' points to patching; 'cannot patch yet' points to a compensating control such as segmentation or virtual patching; 'stolen laptop' or 'intercepted traffic' points to encryption; 'the breach went unnoticed for months' or 'no alert was generated' points to monitoring. When asked what to do first with a newly announced critical vulnerability, the usual order is identify affected assets, then prioritize and patch or mitigate."
  ],
  "terms": [
   [
    "Patch management",
    "The process of identifying, testing, deploying and verifying software updates."
   ],
   [
    "Virtual patching",
    "Blocking exploitation of a vulnerability with a network control, such as an IPS or WAF rule, until a real patch is applied."
   ],
   [
    "End of life",
    "The point after which a vendor stops providing updates for a product."
   ],
   [
    "Encryption at rest",
    "Encrypting stored data on disks, databases or backups."
   ],
   [
    "Encryption in transit",
    "Encrypting data as it moves across networks, for example with TLS or a VPN."
   ],
   [
    "SIEM",
    "Security information and event management, which collects, correlates and alerts on logs from many sources."
   ],
   [
    "Asset inventory",
    "An accurate list of hardware and software, needed to know what to patch and monitor."
   ]
  ],
  "example": "A company learns that attackers stole customer data through a web server running a content management plugin with a two-year-old vulnerability. The post-incident review finds no inventory entry for the server, so it was never patched; the database backups on it were unencrypted; and although the web server generated error logs during the attack, they were not collected by the SIEM. The remediation plan fixes the inventory gap, adds the server to patching, encrypts backups, and forwards its logs.",
  "tip": "If a question mentions a vulnerability that cannot be patched yet, look for compensating controls like segmentation or virtual patching, not 'accept the risk' unless the scenario says it is formally approved.",
  "check": [
   [
    "Why is an accurate asset inventory the first step of patch management?",
    "You cannot patch or monitor systems you do not know exist."
   ],
   [
    "An appliance cannot be patched for two weeks. Name two compensating measures.",
    "Restrict or segment network access to it, apply vendor mitigations or an IPS/WAF virtual patch, and increase monitoring for exploitation."
   ],
   [
    "Why is time synchronization important for monitoring?",
    "Accurate, consistent timestamps are needed to correlate events from different systems in the SIEM and in investigations."
   ],
   [
    "Does encryption at rest protect data from an attacker who has compromised the running server?",
    "Usually not; the data is decrypted for authorized processes on a running system, so other controls are needed."
   ]
  ]
 },
 {
  "t": "Hardening: disable ports/services, change defaults, remove unused software",
  "body": [
   "Hardening is the process of reducing a system's attack surface by removing or disabling everything it does not need and securing what remains. Systems usually ship with convenience in mind: many services enabled, default accounts and passwords, sample files and extra software. Each of those is a potential entry point. Hardening applies to servers, workstations, network devices, mobile devices, cloud resources, databases and embedded or IoT devices, and Security+ expects you to know the common steps and why each one matters.",
   "Disabling unnecessary ports and services is the first step. Every running service is code that might have a vulnerability, and every listening port is reachable by attackers on the network. If a web server does not need file sharing, printing, remote registry or an old management protocol, turn them off, and uninstall them if possible. Host-based firewalls then block any remaining ports that do not need to be reachable. On Linux you can list listening services and disable one like this:",
   "```\nss -tulpn                 # list listening ports and their processes\nsudo systemctl disable --now telnet.socket\nsudo systemctl list-unit-files --state=enabled\n```",
   "Changing default settings and credentials is next. Default usernames and passwords for routers, cameras, databases and admin consoles are published in manuals and are the first thing automated attack tools try. Change them before a device goes on the network, disable or rename default administrator accounts where possible, and turn off features like guest access and sample applications. Default configurations can also be insecure in subtler ways, such as permissive file shares, verbose error messages, old protocol versions or logging turned off. Each of these should be reviewed against the baseline rather than accepted because it came out of the box.",
   "Removing unused software reduces what has to be patched and what can be exploited. Old browser plugins, trial software, unused development tools, bloatware preinstalled by a vendor and outdated runtime environments are common culprits. Less software means fewer vulnerabilities, a smaller patching workload and fewer tools an attacker can abuse once inside. Other hardening steps include applying patches, enabling host-based firewalls and endpoint protection, encrypting storage, configuring secure logging, enforcing strong authentication, restricting administrative rights and securing the boot process with Secure Boot.",
   "Organizations do not harden each system from scratch. They use secure baselines and benchmarks, such as the Center for Internet Security (CIS) Benchmarks or vendor security guides and government technical implementation guides, which list specific recommended settings. The baseline is applied automatically through group policy, configuration management tools or infrastructure as code, and systems are checked against it regularly so any drift is detected and corrected. Hardening each category of device has its own emphasis: network devices need management interfaces restricted and insecure protocols disabled, while embedded and IoT devices often need default credentials changed and firmware updated because they have limited settings.",
   "Walk through hardening a new Windows file server. Start from the organization's CIS-based baseline image. Remove roles and features not required, leaving only file services. Disable old SMB version 1. Rename the built-in administrator account, set a strong unique password managed by a local administrator password solution, and restrict remote desktop to a management subnet. Enable the host firewall allowing only SMB from user subnets and management ports from the admin network. Enable disk encryption, audit logging forwarded to the SIEM and EDR. Finally, scan the server against the baseline and record any justified exceptions.",
   "Common mistakes: hardening once and never checking for drift; disabling a service in the running configuration but leaving it set to start at boot; changing a default password on one interface but not others such as web, SSH and SNMP; and hardening so aggressively without testing that business applications break, which leads to controls being rolled back entirely. Hardening should be tested and documented like any change. Exam clue words: 'reduce attack surface', 'disable unused services', 'close unnecessary ports' point to hardening. 'Device still using the manufacturer's password' points to changing default credentials. 'Standard secure configuration applied to all servers' points to a secure baseline. 'Configuration has changed from the approved state' is configuration drift. When a question asks for the first thing to do when deploying a new IoT device, changing default credentials is usually the answer."
  ],
  "terms": [
   [
    "Hardening",
    "Reducing a system's attack surface by removing unneeded components and securing its configuration."
   ],
   [
    "Attack surface",
    "All the points where an attacker could try to enter or extract data from a system."
   ],
   [
    "Default credentials",
    "Factory-set usernames and passwords that are publicly known and must be changed."
   ],
   [
    "Secure baseline",
    "A documented, approved secure configuration applied consistently to systems."
   ],
   [
    "CIS Benchmarks",
    "Consensus-based secure configuration guides published by the Center for Internet Security."
   ],
   [
    "Configuration drift",
    "Gradual deviation of a system's settings from its approved baseline."
   ],
   [
    "Host-based firewall",
    "Firewall software on an individual system that controls its inbound and outbound traffic."
   ]
  ],
  "example": "A security camera vendor ships cameras with a web interface, Telnet and an undocumented debug service enabled, all using the password 'admin'. Before installing 200 cameras, a company updates their firmware, changes every password to a unique value, disables Telnet and the debug service, places the cameras on an isolated VLAN, and allows only the video management server to connect to them.",
  "tip": "Hardening means removing and restricting: fewer services, fewer ports, fewer accounts, less software, and no default passwords. A baseline plus drift detection keeps it that way.",
  "check": [
   [
    "Why does removing unused software improve security even if it is not running?",
    "It eliminates vulnerabilities that could be exploited later, reduces patching workload and removes tools attackers could abuse."
   ],
   [
    "What is configuration drift and how is it detected?",
    "Deviation of settings from the approved baseline over time; it is detected by regularly scanning systems against the baseline."
   ],
   [
    "What is usually the first hardening step for a newly purchased network device?",
    "Change default credentials, and update firmware, before connecting it to the production network."
   ],
   [
    "A service is stopped but still set to start automatically. Is the system hardened against it?",
    "No; it will start again at reboot, so it must be disabled or removed, not just stopped."
   ]
  ]
 },
 {
  "t": "Cloud: IaaS/PaaS/SaaS and shared responsibility",
  "body": [
   "Cloud computing delivers computing resources on demand over a network, paid for by use, from a provider that runs the underlying data centers. Its defining traits are self-service, broad network access, pooled resources shared among many customers (multitenancy), rapid elasticity (scaling up and down quickly) and measured service. For security, the most important question in any cloud scenario is: who is responsible for securing which part? The answer depends on the service model, and misunderstanding it causes many real cloud breaches, such as storage buckets left open to the internet because the customer assumed the provider handled it.",
   "Infrastructure as a Service (IaaS) provides virtual machines, storage and networks. The provider secures the physical data center, hardware, and the virtualization layer. The customer is responsible for everything they build on top: the guest operating system and its patches, applications, data, identity and access, network rules such as security groups, and encryption settings. IaaS gives the most control and the most responsibility; it feels like running your own servers without owning the building.",
   "Platform as a Service (PaaS) provides a managed platform for running applications, such as a managed database, application hosting service or serverless functions. The provider also manages the operating system and runtime, including patching them. The customer is responsible for their application code, its configuration, data, and who can access it. Software as a Service (SaaS) provides a complete application, such as email, customer relationship management or file sharing. The provider runs almost everything; the customer remains responsible for their data, user accounts and access (including MFA and removing leavers), and configuration choices such as sharing settings.",
   "The shared responsibility model summarizes this split. A useful rule: the provider is responsible for security of the cloud (facilities, hardware, core infrastructure), and the customer is responsible for security in the cloud (what they put there and how they configure it). As you move from IaaS to PaaS to SaaS, the provider takes on more layers and the customer fewer, but in every model the customer is responsible for their data, identities and access. Providers publish responsibility matrices, and contracts and service level agreements should make any unusual splits explicit.",
   "Deployment models describe who uses the cloud. Public cloud is shared by many customers on a provider's infrastructure. Private cloud serves one organization, on premises or hosted. Community cloud is shared by organizations with common requirements, such as government agencies. Hybrid cloud combines on-premises or private systems with public cloud. Multicloud means using services from more than one provider, which avoids dependence on one vendor but adds complexity. Cloud security tools you may see include cloud access security brokers (CASBs), which give visibility and policy control over SaaS use, and cloud security posture management (CSPM), which checks configurations for mistakes.",
   "Walk through assigning responsibility for a breach. A company hosts a web application on IaaS virtual machines, stores uploads in object storage and uses a SaaS email service. An attacker exploits an unpatched web server, reads uploads from a storage bucket that was configured as public, and phishes an employee whose email account has no MFA. Who is responsible? The customer, for all three: guest OS patching in IaaS, the storage access configuration, and identity settings in SaaS. The provider would be responsible if, say, a flaw in its hypervisor let another tenant read the company's memory.",
   "Common mistakes: assuming the provider patches the operating system in IaaS (it does not); assuming SaaS means the provider protects your data from your own users' mistakes; believing moving to the cloud transfers all risk; and forgetting that compliance obligations stay with the organization even if a provider holds the data. Another mistake is ignoring the management plane: the cloud console and its administrator accounts are extremely powerful, so they need MFA, least privilege and logging.",
   "Exam clue words: 'customer manages the operating system' is IaaS; 'customer only deploys code' is PaaS; 'complete application delivered to users' is SaaS. 'Who patches the guest OS?' in IaaS is the customer. 'Who is responsible for data classification and user access in SaaS?' is always the customer. 'Visibility and control over employees' use of SaaS apps' points to a CASB. 'Misconfigured storage made public' is a customer-side responsibility failure."
  ],
  "terms": [
   [
    "IaaS",
    "Infrastructure as a Service, providing virtual machines, storage and networks; the customer manages the OS and above."
   ],
   [
    "PaaS",
    "Platform as a Service, providing a managed platform where the customer deploys code and manages data and access."
   ],
   [
    "SaaS",
    "Software as a Service, a complete application run by the provider; the customer manages data, users and settings."
   ],
   [
    "Shared responsibility model",
    "The division of security duties between cloud provider and customer, varying by service model."
   ],
   [
    "Multitenancy",
    "Multiple customers sharing the same underlying cloud infrastructure while logically separated."
   ],
   [
    "Hybrid cloud",
    "A combination of on-premises or private infrastructure with public cloud services."
   ],
   [
    "CASB",
    "Cloud access security broker, which provides visibility and policy enforcement for cloud and SaaS use."
   ]
  ],
  "example": "A startup runs its product on a PaaS application platform and a managed database. When a critical vulnerability is announced in the runtime language, the provider patches the platform within hours with no action from the startup. A month later, a developer commits a database password to a public code repository; that exposure is entirely the startup's responsibility, and it responds by rotating the password, moving secrets into the provider's secrets manager, and adding secret scanning to its build pipeline.",
  "tip": "Provider secures the cloud; customer secures what is in the cloud. In every model, including SaaS, the customer owns its data, identities and access configuration.",
  "check": [
   [
    "In IaaS, who is responsible for patching the guest operating system?",
    "The customer, because IaaS only provides the infrastructure and virtualization layer."
   ],
   [
    "A SaaS file-sharing service is breached because a user shared a folder publicly. Whose responsibility was this?",
    "The customer's, because data and sharing configuration remain the customer's responsibility in SaaS."
   ],
   [
    "How does the customer's responsibility change from IaaS to SaaS?",
    "It shrinks, since the provider manages more layers, but the customer always keeps responsibility for data, identities and access."
   ],
   [
    "Why is the cloud management console a high-value target?",
    "Its administrator accounts can change or delete entire environments, so they need MFA, least privilege and logging."
   ]
  ]
 },
 {
  "t": "IaC, serverless, microservices, containers",
  "body": [
   "Modern applications are built and run very differently from a single server in a rack. Infrastructure as code (IaC), serverless functions, microservices and containers let teams deploy quickly and consistently, but each shifts where security risks live. Security+ expects you to understand what each architecture is, what its security advantages are, and what new risks it brings. The theme running through all of them is that automation spreads both good and bad configurations at speed, so securing the templates, images and pipelines matters as much as securing the running systems.",
   "Infrastructure as code means defining servers, networks, firewall rules and cloud resources in text files, such as Terraform or cloud formation templates, which tools then use to build the environment automatically. The benefits for security are consistency (every environment is built the same way), version control (every change is recorded and can be reviewed), repeatability and the ability to scan templates for mistakes before anything is deployed. The risk is that a single insecure template, such as one that opens a database to the internet or embeds a secret, is copied everywhere. Good practice is code review, automated policy scanning in the pipeline, keeping secrets out of the templates, and detecting drift when someone changes resources by hand. Here is a short example of what IaC looks like, with the kind of comment a reviewer would add. A rule like this, reviewed in a pull request before deployment, is far easier to catch than a setting changed by hand in a console:",
   "```\nresource \"aws_security_group_rule\" \"db_in\" {\n  type        = \"ingress\"\n  from_port   = 5432\n  to_port     = 5432\n  protocol    = \"tcp\"\n  cidr_blocks = [\"10.20.0.0/16\"]   # reviewer: never 0.0.0.0/0 for a database\n}\n```",
   "Serverless computing lets developers run code as functions triggered by events, such as an uploaded file or an API call, without managing servers at all; the provider handles the operating system, scaling and patching. Security benefits include no servers to patch and short-lived execution. Risks shift to the code, its dependencies, its permissions and its event inputs: an over-privileged function can be abused to access far more than it needs, and every trigger is an input that must be validated. Visibility can also be harder, so logging and monitoring need deliberate setup. Because functions are billed per use, attackers who abuse them can also run up large costs, a form of denial of wallet, so spending alerts and concurrency limits act as security controls too.",
   "Microservices break an application into many small, independent services that communicate over APIs, each owning a specific function such as payments or search. They can be updated independently and failures are contained, which improves resilience. But they multiply the number of APIs, network connections and credentials, so service-to-service authentication (often with mutual TLS or tokens), authorization, API gateways, rate limiting and consistent logging become critical. A single vulnerable service can become a stepping stone to others if internal traffic is trusted blindly.",
   "Containers package an application with its libraries and settings into an image that runs the same way anywhere, sharing the host operating system's kernel. They are lighter than virtual machines and start quickly; orchestration platforms such as Kubernetes manage them at scale. Security concerns include vulnerable or untrusted base images, secrets baked into images, containers running as root or with excess privileges, and the shared kernel, which means a kernel flaw or container escape can affect every container on the host. Defenses: use minimal, trusted base images, scan images in the pipeline, sign images, run as non-root, apply resource limits and network policies, and keep hosts patched.",
   "Common mistakes: believing serverless means 'no security responsibility' (you still own code, data, permissions and configuration); treating containers as strongly isolated as virtual machines (they share the kernel); fixing problems in running containers rather than rebuilding the image (containers should be immutable, so fix the image and redeploy); and assuming IaC is secure because it is automated. Automation makes mistakes consistent as well as good settings consistent.",
   "Exam clue words: 'define infrastructure in templates', 'version-controlled configuration' point to IaC. 'Event-driven functions with no server management' is serverless. 'Application split into small independent services' is microservices. 'Packaged application sharing the host kernel' is containers. When asked for the key risk of containers compared to VMs, answer the shared kernel; for serverless, answer function permissions and code dependencies; for IaC, answer insecure templates replicated at scale."
  ],
  "terms": [
   [
    "Infrastructure as code (IaC)",
    "Defining and deploying infrastructure through machine-readable templates rather than manual setup."
   ],
   [
    "Serverless",
    "Running event-triggered functions without managing servers; the provider handles the underlying platform."
   ],
   [
    "Microservices",
    "An architecture that splits an application into small, independent services communicating over APIs."
   ],
   [
    "Container",
    "A lightweight package of an application and its dependencies that shares the host operating system kernel."
   ],
   [
    "Container image",
    "The template from which containers are created, which should be scanned and trusted."
   ],
   [
    "Orchestration",
    "Automated deployment, scaling and management of containers, for example with Kubernetes."
   ],
   [
    "Immutable infrastructure",
    "Replacing components with new versions rather than modifying them in place."
   ]
  ],
  "example": "A security scan of a company's container registry finds that its standard base image includes an outdated library with a critical vulnerability, and that 140 running containers were built from it. Instead of patching each container, the team updates the base image, rebuilds every application image through the pipeline, and redeploys. They also add an automated scan that blocks any image with critical vulnerabilities from being deployed in future.",
  "tip": "Containers share the host kernel, so they are less isolated than virtual machines. With IaC, one bad template is replicated everywhere, so scan templates before deployment.",
  "check": [
   [
    "What is a key security advantage of infrastructure as code?",
    "Consistent, version-controlled configurations that can be reviewed and scanned before deployment."
   ],
   [
    "Why is running a container as root risky?",
    "If an attacker escapes the container, root privileges plus the shared kernel can let them compromise the host and other containers."
   ],
   [
    "In serverless computing, which security responsibilities stay with the customer?",
    "The function code, its dependencies, its permissions, input validation and the data it handles."
   ],
   [
    "Why do microservices increase the importance of API security?",
    "They multiply the number of service-to-service connections and APIs, each needing authentication, authorization and monitoring."
   ]
  ]
 },
 {
  "t": "Virtualization risks: VM escape, sprawl",
  "body": [
   "Virtualization lets one physical server run many virtual machines (VMs), each with its own operating system, managed by a hypervisor. It is the foundation of modern data centers and public cloud. It saves money and makes systems easy to create, copy and move, but it introduces its own risks. Security+ focuses on two named risks, VM escape and VM sprawl, plus resource reuse and the security of the hypervisor itself. Understanding them helps you see why hypervisors must be patched promptly and why every VM needs an owner.",
   "There are two types of hypervisor. A Type 1 (bare-metal) hypervisor runs directly on the hardware, as in enterprise and cloud platforms; it has a small attack surface and high performance. A Type 2 (hosted) hypervisor runs as an application on a normal operating system, as with desktop virtualization software used for labs and testing; it inherits the host OS's vulnerabilities. In both cases the hypervisor is the component that keeps VMs separated, so its security is critical: if it fails, the isolation between VMs fails.",
   "VM escape is an attack in which code running inside a VM breaks out of the virtual machine and interacts with the hypervisor or host directly. From there, an attacker could access or control other VMs on the same host. VM escape usually requires exploiting a vulnerability in the hypervisor or in the virtual devices it emulates, such as a virtual network card or graphics adapter. It is rare but serious, especially in multitenant environments where VMs of different customers share hardware. Defenses include patching hypervisors quickly, removing unnecessary virtual hardware from VMs, limiting features such as shared folders and clipboard sharing, isolating high-risk VMs on separate hosts, and monitoring the host.",
   "VM sprawl is the uncontrolled growth of virtual machines. Because VMs are so easy to create, test servers, forgotten projects and old copies pile up. Nobody patches them, they may not appear in inventory or monitoring, and they may still hold sensitive data or old credentials. Each one is an unmanaged part of the attack surface and also wastes resources and licenses. Defenses are process-based: require approval and an owner for new VMs, tag VMs with owner and purpose, set expiration dates for temporary VMs, run regular discovery and inventory reconciliation, and decommission unused machines securely.",
   "Resource reuse is a related risk. When memory, storage or other resources are released by one VM and reassigned to another, any data left in them could be exposed if not properly cleared. Hypervisors and cloud providers are responsible for wiping resources before reuse, which is one reason providers' isolation guarantees matter. Snapshots are another consideration: they are convenient for rollback, but they may contain sensitive data and old unpatched states, so they must be protected, encrypted and eventually deleted.",
   "Walk through an audit that finds sprawl. A company's hypervisor management console lists 410 VMs, but the asset inventory lists 290. Investigation finds 120 VMs with no owner, including 30 still running an operating system that reached end of life, several copies of a production database made for testing, and a web server from a finished marketing campaign still reachable from the internet. The team contacts owners where possible, shuts down and archives orphaned VMs for thirty days, deletes them securely afterward, and introduces mandatory tags and a monthly reconciliation.",
   "Common mistakes: confusing VM escape with a VM simply being compromised (escape specifically means breaking out to the hypervisor or host); thinking VM sprawl is only a cost problem; assuming that because VMs are isolated, a vulnerable VM cannot affect others (it can if the hypervisor is flawed or the VMs share networks without controls); and forgetting to include VMs and snapshots in backup, patching and monitoring processes. Containers have an analogous risk, container escape, which is often easier because containers share the host kernel.",
   "Exam clue words: 'code inside a guest affects the host or other guests', 'breaks out of the virtual machine' point to VM escape, fixed mainly by hypervisor patching. 'Many unmanaged or forgotten VMs', 'VMs not in inventory', 'unpatched test machines' point to VM sprawl, fixed by governance and inventory. 'Data from a previous tenant found in allocated storage' points to resource reuse. Type 1 is bare-metal and more secure; Type 2 runs on a host OS."
  ],
  "terms": [
   [
    "Hypervisor",
    "Software that creates and manages virtual machines and keeps them isolated from each other."
   ],
   [
    "Type 1 hypervisor",
    "A bare-metal hypervisor that runs directly on hardware."
   ],
   [
    "Type 2 hypervisor",
    "A hosted hypervisor that runs as an application on a normal operating system."
   ],
   [
    "VM escape",
    "An attack in which code breaks out of a virtual machine to reach the hypervisor, host or other VMs."
   ],
   [
    "VM sprawl",
    "Uncontrolled growth of virtual machines that are unmanaged, unpatched or forgotten."
   ],
   [
    "Resource reuse",
    "The risk that data remains in memory or storage reassigned from one VM or tenant to another."
   ],
   [
    "Snapshot",
    "A saved state of a VM at a point in time, which may contain sensitive data and old vulnerabilities."
   ]
  ],
  "example": "A hypervisor vendor publishes an urgent fix for a flaw in an emulated network adapter that could allow code in a guest VM to run on the host. A hosting company that runs VMs for many customers schedules emergency maintenance, live-migrates workloads off each host, patches it, and moves the workloads back. Until patching finishes, it switches customer VMs to a different virtual adapter type that is not affected.",
  "tip": "VM escape is fixed mainly by patching the hypervisor and minimizing virtual hardware. VM sprawl is a governance problem, fixed by inventory, ownership and lifecycle rules.",
  "check": [
   [
    "Why is VM escape especially dangerous in a public cloud?",
    "Other customers' VMs may share the same host, so escaping to the hypervisor could expose many tenants."
   ],
   [
    "What makes VM sprawl a security problem, not just a cost problem?",
    "Forgotten VMs go unpatched and unmonitored, may hold sensitive data, and expand the attack surface."
   ],
   [
    "Which type of hypervisor has the smaller attack surface, and why?",
    "Type 1, because it runs directly on hardware without a full host operating system underneath."
   ],
   [
    "Name two controls that reduce VM sprawl.",
    "Require approval and owner tags for new VMs, set expiration dates, and regularly reconcile VMs against the inventory."
   ]
  ]
 },
 {
  "t": "ICS/SCADA, IoT, embedded, RTOS",
  "body": [
   "Not every computer looks like a laptop or server. Industrial control systems, smart devices and embedded computers run power grids, factories, hospitals, buildings and cars. They are often built for reliability and long life rather than security, and many cannot easily be patched or monitored. Security+ expects you to know what these systems are, why they are hard to secure, and which mitigations work when the usual controls cannot be applied. The stakes are high because attacks on these systems can cause physical harm, not only data loss.",
   "Industrial control systems (ICS) monitor and control physical processes such as manufacturing lines, water treatment and power generation. Supervisory control and data acquisition (SCADA) systems are a type of ICS that manage processes spread over large areas, such as pipelines or electrical grids, using central servers, human-machine interfaces (HMIs) and field devices like programmable logic controllers (PLCs). These environments prioritize availability and safety above confidentiality: stopping a process to patch it can be costly or dangerous. They often run old operating systems, use industrial protocols designed without authentication, and have lifespans of decades.",
   "The Internet of Things (IoT) covers network-connected devices such as cameras, smart speakers, thermostats, medical monitors, sensors and building controls. IoT devices are cheap, numerous and frequently insecure: default or hard-coded passwords, no update mechanism, unencrypted communications and weak vendor support. Compromised IoT devices are recruited into botnets that launch large DDoS attacks, and they can serve as footholds into corporate networks. Embedded systems are computers built into another product for a dedicated function, such as a printer's controller, a car's engine management unit or a smart TV. A real-time operating system (RTOS) is an operating system designed to respond to events within strict, predictable time limits, used in embedded systems such as medical devices, vehicles and industrial controllers. Delays could be dangerous, so heavy security software is often not an option.",
   "Common constraints across these systems include limited processing power, memory and battery (making strong encryption or security agents impractical), inability to patch easily or at all, proprietary or long-unsupported software, physical exposure in the field, and vendors who control updates. The objectives describe these as constraints such as power, compute, network, cryptographic capability, inability to patch, authentication and cost. The response is to wrap them in protective layers rather than rely on the device itself. Newer approaches help at the source: secure boot on embedded chips, signed firmware updates delivered over the air, and industry standards and certification labels that commit vendors to supporting updates for a stated period.",
   "Mitigations therefore focus on the network and the process. Segment these systems onto isolated networks, using firewalls and one-way data diodes where appropriate, and never expose them directly to the internet. Change default credentials and disable unneeded services. Update firmware when the vendor allows, through a tested process. Use monitoring designed for industrial protocols to detect unusual commands. Control physical access and removable media. Keep an inventory, because you cannot protect devices you do not know about. For purchasing, include security requirements such as update support and no hard-coded passwords in contracts.",
   "Walk through securing a hospital's connected medical devices. The inventory finds 600 devices, including infusion pumps running an RTOS and imaging systems on an unsupported desktop OS that the manufacturer must certify any changes to. The hospital places each device class in its own VLAN, allows only the specific servers they need, blocks internet access, monitors their traffic for anything unusual, and works with manufacturers to schedule certified updates. Where patching is impossible, those network restrictions serve as documented compensating controls.",
   "Common mistakes: applying office IT practices directly, such as aggressive scanning or automatic reboots, which can crash sensitive industrial or medical devices; assuming devices are safe because they are 'not on the internet' when they are reachable from corporate networks; forgetting IoT devices in the inventory; and ranking confidentiality first in ICS, where availability and safety come first. Another is buying devices without asking how long the vendor will support them; a cheap camera with no update path becomes a permanent liability.",
   "Exam clue words: 'PLC', 'HMI', 'pipeline', 'power grid', 'wide geographic area' point to SCADA/ICS. 'Smart devices', 'botnet of cameras', 'default passwords on consumer devices' point to IoT. 'Strict timing, deterministic response' points to RTOS. 'Cannot be patched' plus 'best mitigation' almost always points to segmentation or isolation as a compensating control."
  ],
  "terms": [
   [
    "Industrial control system (ICS)",
    "Systems that monitor and control physical industrial processes."
   ],
   [
    "SCADA",
    "Supervisory control and data acquisition, an ICS type that manages geographically distributed processes."
   ],
   [
    "PLC",
    "Programmable logic controller, a rugged computer that controls machinery in industrial settings."
   ],
   [
    "IoT",
    "Internet of Things, network-connected everyday devices such as cameras, sensors and smart appliances."
   ],
   [
    "Embedded system",
    "A computer built into another device to perform a dedicated function."
   ],
   [
    "RTOS",
    "Real-time operating system, designed to respond to events within strict, predictable time limits."
   ],
   [
    "Data diode",
    "A device that allows network traffic to flow in only one direction."
   ]
  ],
  "example": "A water utility's SCADA network was once reachable from the corporate network for convenience. After a sector-wide warning about attacks on remote access tools, the utility removes that path, installs a data diode so plant data flows one way to the business historian, requires engineers to connect through a jump host with MFA for maintenance, and deploys industrial protocol monitoring to alert on unexpected commands to its PLCs.",
  "tip": "For ICS and SCADA, availability and safety come first. When a device cannot be patched, segmentation and isolation are the go-to compensating controls.",
  "check": [
   [
    "Why are ICS environments often slower to patch than office IT?",
    "Stopping processes can be dangerous or costly, vendors must certify changes, and systems run for decades on old software."
   ],
   [
    "What makes IoT devices attractive to botnet operators?",
    "They are numerous, often use default credentials, rarely get updates and have constant network connections."
   ],
   [
    "What defines a real-time operating system?",
    "It guarantees responses within strict, predictable time limits, which is vital for safety-critical embedded systems."
   ],
   [
    "Why might a routine vulnerability scan be risky on an industrial network?",
    "Some industrial devices are fragile and can crash or behave unpredictably when scanned, disrupting physical processes."
   ]
  ]
 },
 {
  "t": "On-prem vs cloud vs hybrid trade-offs",
  "body": [
   "Organizations can run systems on premises (in their own data centers), in the cloud, or in a hybrid of both. There is no universally best choice; each has trade-offs in control, cost, responsibility, resilience and compliance. Security+ asks you to weigh these considerations in scenarios, such as choosing where to host a sensitive workload or recognizing the risks a hybrid design introduces. The key is to match the architecture to the organization's requirements rather than to follow fashion.",
   "On-premises infrastructure gives the organization full control over hardware, networks, physical security and data location. That suits strict regulatory or data sovereignty requirements, specialized hardware, very predictable workloads and systems that must keep working without internet access. The costs are high up-front capital spending, slower scaling (buying and installing hardware takes weeks), and the organization bearing full responsibility for everything from power and cooling to patching and disaster recovery. Security depends entirely on the organization's own skills and budget. For a small company with no dedicated staff, that can mean weaker protection than a cloud provider offers; for a large, well-funded team, it can mean exactly the tailored controls it needs.",
   "Cloud infrastructure trades some control for scale and speed. Resources can be created in minutes and scaled automatically, costs move to pay-as-you-go operating expenses, and providers offer built-in redundancy across multiple data centers and regions, plus mature security tools. Responsibility is shared: the provider secures the underlying infrastructure, and the customer secures its configuration, data and identities. Concerns include less visibility into the provider's environment, dependence on the provider (vendor lock-in), data residency questions, the risk of misconfiguration, and costs that can grow unexpectedly.",
   "Hybrid architectures combine on-premises or private systems with public cloud, connected by VPNs or dedicated links. They let organizations keep sensitive or legacy systems in-house while using the cloud for elastic or new workloads, or use the cloud for disaster recovery. The trade-off is complexity: two environments with different tools, identity systems that must be integrated, consistent policies that must be enforced across both, and more connections to secure. Visibility gaps between environments are a common weakness, and misconfigured links can expose internal networks to the cloud. Teams also need skills in both worlds, which is a real cost that is easy to overlook when planning a migration.",
   "The SY0-701 objectives list considerations for comparing architectures: availability, resilience, cost, responsiveness, scalability, ease of deployment, risk transference, ease of recovery, patch availability, inability to patch, power and compute constraints. Also consider centralized versus decentralized designs: centralized systems are easier to manage and secure consistently but create single points of failure, while decentralized ones are more resilient but harder to govern. Data sovereignty, meaning data is subject to the laws of the country where it is stored, can decide where some data may live.",
   "Walk through a decision. A regional hospital wants a new patient portal and must also modernize its electronic health record (EHR). The portal needs to scale during flu season and be reachable from anywhere, so it is built in a public cloud region within the hospital's country, satisfying data sovereignty. The EHR depends on on-site medical devices and must keep working if the internet link fails, so it stays on premises, with backups replicated to the cloud for disaster recovery. The result is hybrid, and the hospital invests in a single identity provider with MFA and a SIEM that collects logs from both environments to close visibility gaps.",
   "Common mistakes: thinking cloud is automatically more or less secure than on premises (it depends on configuration and responsibilities); assuming that moving to the cloud transfers compliance responsibility; ignoring egress costs and lock-in when planning; and underestimating hybrid complexity. Another mistake is treating the cloud as 'someone else's problem' for availability; a single-region deployment can still go down, so resilience must be designed. Finally, remember risk transference: using a provider shifts some operational risk to them through contracts and SLAs, but it never shifts accountability for your data.",
   "Exam clue words: 'full control', 'data must not leave the premises', 'air-gapped' point to on premises. 'Rapid scaling', 'pay as you go', 'global availability' point to cloud. 'Keep legacy systems in-house while using cloud for new services' or 'cloud as disaster recovery site' point to hybrid. 'Data must stay within a country' is data sovereignty. 'Consistent policy across environments is hard' is a hybrid drawback."
  ],
  "terms": [
   [
    "On-premises",
    "Infrastructure owned and operated by the organization in its own facilities."
   ],
   [
    "Hybrid cloud",
    "An architecture combining on-premises or private infrastructure with public cloud services."
   ],
   [
    "Vendor lock-in",
    "Dependence on one provider's services that makes switching costly or difficult."
   ],
   [
    "Data sovereignty",
    "The principle that data is subject to the laws of the country where it is stored."
   ],
   [
    "Scalability",
    "The ability to increase or decrease capacity to match demand."
   ],
   [
    "Capital expenditure (CapEx)",
    "Up-front spending on assets such as servers, typical of on-premises infrastructure."
   ],
   [
    "Operating expenditure (OpEx)",
    "Ongoing pay-as-you-go spending, typical of cloud services."
   ]
  ],
  "example": "A retailer's online store struggles every holiday season on its on-premises servers, which sit idle the rest of the year. It moves the storefront to cloud autoscaling, keeping its payment processing on premises for now because of existing compliance work. The first year's review finds the hybrid setup works but that a site-to-site VPN rule allowed the cloud network to reach far more of the internal network than needed, which is tightened.",
  "tip": "No model is automatically most secure. Look for the scenario's deciding requirement: control and sovereignty point to on premises, elasticity points to cloud, and a mix of legacy and new points to hybrid.",
  "check": [
   [
    "What is the main security drawback of hybrid environments?",
    "Complexity: policies, identity and monitoring must be kept consistent across two environments with more connections to secure."
   ],
   [
    "A regulator requires that citizen data never leave the country. How does this affect cloud choices?",
    "Data must be stored in a provider region within that country, or kept on premises, to meet data sovereignty rules."
   ],
   [
    "Why might a factory keep its control systems on premises even if other workloads move to cloud?",
    "They need to work without internet access, have strict latency and safety requirements, and may not be supported in the cloud."
   ],
   [
    "Does using a cloud provider transfer compliance responsibility?",
    "No; the organization remains accountable for compliance, though the provider covers some controls under shared responsibility."
   ]
  ]
 },
 {
  "t": "Firewalls (L4/L7, NGFW), WAF, UTM",
  "body": [
   "A firewall enforces rules about which network traffic may pass between zones, such as between the internet and an internal network or between internal segments. Firewalls differ mainly in how deeply they look at traffic, and Security+ tests whether you can match the right type to a threat. The layer numbers refer to the OSI model: a Layer 4 firewall decides using addresses, protocols and ports, while a Layer 7 firewall understands the application data itself. Choosing correctly means knowing what each can see and what it cannot.",
   "Stateless packet filters check each packet on its own against rules for source and destination IP address, protocol and port. They are fast but easily confused, because they do not remember connections. Stateful firewalls, the common Layer 4 type, track the state of each connection in a table: when an internal user starts a connection to a web server, the firewall remembers it and allows the matching return traffic automatically, while blocking unsolicited inbound packets. Layer 4 firewalls are efficient and effective at enforcing which services can talk to which, but they cannot tell whether traffic on an allowed port is actually malicious.",
   "Layer 7 (application-layer) firewalls understand application protocols. They can recognize that traffic on port 443 is a specific application, look inside the content (after decrypting TLS if configured to do so) and apply rules based on application, user or content. A next-generation firewall (NGFW) combines stateful filtering with application awareness, user identity integration, intrusion prevention and threat intelligence, and often TLS inspection and URL filtering. With an NGFW you can write rules like 'allow the finance group to use the approved file-sharing app but block uploads to personal cloud storage', which a port-based firewall cannot express.",
   "A web application firewall (WAF) is a specialized Layer 7 firewall that protects web applications. It sits in front of web servers and inspects HTTP and HTTPS requests and responses for attacks such as SQL injection, cross-site scripting, path traversal and malicious bots. It can also provide virtual patching, blocking exploitation of a known flaw until the application is fixed. A WAF protects servers you host; it is not a general network firewall and does not protect users' web browsing. Unified threat management (UTM) appliances combine many functions in one box: firewall, intrusion prevention, antivirus scanning, content and URL filtering, VPN, and sometimes spam filtering. UTM suits small and medium organizations that want simple management; the trade-offs are a single point of failure and possible performance limits when every feature is enabled.",
   "Firewall rules are processed in order, usually top-down with first match wins, and end with an implicit deny. Good rule sets are specific (source, destination, port and application), documented with a business reason and owner, reviewed regularly, and log denied and sensitive allowed traffic. Placement matters too: perimeter firewalls between the internet and screened subnet, internal firewalls between segments, and host-based firewalls on individual systems give layered protection.",
   "Walk through choosing controls for an online store. A stateful firewall allows only ports 80 and 443 from the internet to the web servers in the screened subnet and blocks everything else. A WAF in front of the web servers blocks SQL injection and XSS attempts in the HTTP requests that the stateful firewall allowed through. An NGFW between the office network and the internet identifies applications, blocks known-malicious sites and prevents staff from using unapproved file-sharing services. Each layer covers a gap in the others.",
   "Common mistakes: expecting a Layer 4 firewall to stop application attacks on allowed ports; thinking a WAF protects employees' web browsing (it protects the web application server); confusing a UTM (many functions in one appliance, often for smaller organizations) with an NGFW (deep application awareness at enterprise scale), although modern products overlap; and forgetting that encrypted traffic cannot be inspected at Layer 7 unless the firewall performs TLS inspection, which itself requires careful handling of privacy and certificates.",
   "Exam clue words: 'ports and IP addresses', 'connection state' point to Layer 4 stateful firewalls. 'Identify applications regardless of port', 'user-based rules', 'integrated IPS' point to NGFW. 'Protect a web application from SQL injection and XSS' points to WAF. 'All-in-one device for a small business' points to UTM. 'Allowed traffic on port 443 still delivered an attack' means you need Layer 7 inspection."
  ],
  "terms": [
   [
    "Stateless packet filter",
    "A firewall that evaluates each packet independently against address, protocol and port rules."
   ],
   [
    "Stateful firewall",
    "A firewall that tracks connection state and allows return traffic for established connections."
   ],
   [
    "Layer 7 firewall",
    "A firewall that understands and filters based on application protocols and content."
   ],
   [
    "Next-generation firewall (NGFW)",
    "A firewall combining stateful inspection, application awareness, user identity and integrated IPS."
   ],
   [
    "Web application firewall (WAF)",
    "A firewall that inspects HTTP/HTTPS traffic to protect web applications from attacks like SQL injection."
   ],
   [
    "Unified threat management (UTM)",
    "An all-in-one appliance combining firewall, IPS, antivirus, filtering and VPN functions."
   ],
   [
    "TLS inspection",
    "Decrypting and re-encrypting TLS traffic so a security device can inspect its contents."
   ]
  ],
  "example": "A small accounting firm with no dedicated security staff replaces its old router and separate antivirus gateway with a single UTM appliance that provides firewalling, VPN, web filtering and intrusion prevention, managed through one console. Its larger client, a bank, uses NGFWs between internal segments and a separate WAF cluster in front of its online banking application, because it needs deeper inspection and more throughput than an all-in-one box provides.",
  "tip": "A WAF protects web servers from web attacks; an NGFW protects networks with application awareness; a Layer 4 firewall only sees addresses, ports and connection state.",
  "check": [
   [
    "Why can't a stateful Layer 4 firewall stop SQL injection sent to an allowed web port?",
    "It only examines addresses, ports and connection state, not the HTTP request content where the injection lives."
   ],
   [
    "What does a stateful firewall do that a stateless packet filter does not?",
    "It tracks connections and automatically allows legitimate return traffic while blocking unsolicited inbound packets."
   ],
   [
    "A small office wants one device for firewall, VPN, antivirus scanning and web filtering. What fits?",
    "A unified threat management (UTM) appliance."
   ],
   [
    "Why does an NGFW often need TLS inspection to be fully effective?",
    "Most traffic is encrypted, so without decrypting it the firewall cannot see content to identify threats inside."
   ]
  ]
 },
 {
  "t": "IDS vs IPS, inline vs tap",
  "body": [
   "An intrusion detection system (IDS) watches traffic or activity and raises alerts when it sees something suspicious. An intrusion prevention system (IPS) does the same analysis but can also act automatically, dropping malicious packets, resetting connections or blocking a source address. The difference comes down to placement and action: an IDS observes a copy of traffic and tells you; an IPS sits in the traffic path and stops it. Security+ regularly tests this distinction, along with how these systems detect attacks and what happens when they make mistakes.",
   "Placement determines what a device can do. An IPS is deployed inline, meaning traffic physically flows through it, so it can block before packets reach their destination. The cost is that it adds a small delay and becomes a potential point of failure, which raises the question of whether it should fail open or fail closed. An IDS is usually deployed passively, receiving a copy of traffic from a network tap (a hardware device that copies all traffic on a link) or from a switch port analyzer (SPAN) or mirror port configured on a switch. Because it only sees a copy, a passive IDS cannot stop traffic and cannot slow the network down, but it can alert and feed other systems. Taps are more reliable than SPAN ports, which may drop packets when a switch is busy.",
   "Systems can also be network-based or host-based. A network-based IDS or IPS (NIDS or NIPS) monitors traffic on a network segment. A host-based IDS or IPS (HIDS or HIPS) runs on an individual system and watches its logs, file changes, processes and local traffic. Host-based systems can see activity after decryption on the endpoint, which network sensors may miss when traffic is encrypted. Modern endpoint detection and response (EDR) tools include many host-based intrusion prevention features.",
   "Detection methods are the next distinction. Signature-based detection matches traffic against patterns of known attacks, like antivirus signatures. It is accurate for known threats and produces few false positives, but it cannot detect new attacks without a signature and must be kept updated. Anomaly-based (behavior-based) detection first learns a baseline of normal activity and then alerts on significant deviations, such as a server suddenly sending large volumes of data at night. It can catch new or unknown attacks but tends to generate more false positives and needs tuning. Heuristic and policy-based methods are variations, and many products combine approaches.",
   "Accuracy is described with four outcomes. A true positive is a real attack correctly flagged. A false positive is legitimate activity wrongly flagged as an attack; too many of these cause alert fatigue, and with an IPS they block legitimate business traffic. A false negative is a real attack that goes undetected, which is the most dangerous outcome because nobody knows to respond. A true negative is normal traffic correctly left alone. Tuning aims to reduce false positives without creating false negatives.",
   "Walk through a deployment decision. A company wants to watch its internet link without any risk of disrupting traffic while it learns what normal looks like. It installs a network tap and a passive IDS, tunes its rules for a month, and reviews alerts. Once confident in the rules, it moves protection inline for the web servers' segment as an IPS in blocking mode for high-confidence signatures, and leaves lower-confidence rules in alert-only mode. That staged approach avoids blocking customers with false positives on day one.",
   "Common mistakes: expecting an IDS to block attacks; forgetting that a network IDS cannot see inside encrypted traffic unless it is decrypted somewhere; assuming anomaly-based detection is always better (it catches new attacks but produces more noise); and ignoring false negatives because nothing seems to be happening. Remember too that an inline IPS failure affects availability, so its failure mode must be chosen deliberately.",
   "Exam clue words: 'alerts only', 'passive', 'receives a copy of traffic', 'SPAN port' or 'tap' point to IDS. 'Blocks', 'drops', 'inline', 'in the traffic path' point to IPS. 'Known attack patterns' is signature-based; 'deviation from a baseline' is anomaly-based. 'Legitimate traffic blocked' is a false positive; 'attack missed' is a false negative. When asked which detection type can find a zero-day attack, choose anomaly or behavior-based."
  ],
  "terms": [
   [
    "IDS",
    "Intrusion detection system, which monitors and alerts on suspicious activity without blocking it."
   ],
   [
    "IPS",
    "Intrusion prevention system, which sits inline and can block malicious traffic automatically."
   ],
   [
    "Inline",
    "Deployed directly in the traffic path so traffic must pass through the device."
   ],
   [
    "Network tap",
    "A hardware device that copies all traffic on a network link to a monitoring tool."
   ],
   [
    "SPAN port",
    "A switch port configured to mirror traffic from other ports to a monitoring device."
   ],
   [
    "Signature-based detection",
    "Detecting attacks by matching known patterns."
   ],
   [
    "Anomaly-based detection",
    "Detecting attacks by spotting deviations from a learned baseline of normal behavior."
   ],
   [
    "False negative",
    "A real attack that the system fails to detect."
   ]
  ],
  "example": "An online retailer places an IPS inline in front of its web servers with signature rules in blocking mode. After a signature update, the IPS starts dropping legitimate checkout requests containing a certain product code, a false positive that costs sales for an hour. The team adds an exception for that pattern, then moves new signatures into alert-only mode for a day before enabling blocking, so false positives are caught before they affect customers.",
  "tip": "IDS equals passive and alerts (copy via tap or SPAN); IPS equals inline and blocks. A false negative is the most dangerous error because nobody knows an attack happened.",
  "check": [
   [
    "Why can't a passive IDS connected to a SPAN port block an attack?",
    "It only receives a copy of the traffic, so the original packets reach their destination regardless."
   ],
   [
    "Which detection method is more likely to spot a brand-new attack, and what is its downside?",
    "Anomaly-based detection, which can catch unknown attacks but tends to produce more false positives."
   ],
   [
    "What is the operational risk of deploying an IPS inline?",
    "It can block legitimate traffic through false positives and becomes a potential point of failure that affects availability."
   ],
   [
    "Why might a host-based IDS detect something a network IDS misses?",
    "It sees activity on the endpoint after decryption, including file, process and log changes that network sensors cannot see."
   ]
  ]
 },
 {
  "t": "Fail-open vs fail-closed",
  "body": [
   "Every security device and control eventually fails: power is lost, software crashes, a sensor breaks or a license expires. The failure mode decides what happens then. A fail-open (fail-safe in some contexts) device allows traffic or access when it fails, keeping things working but without protection. A fail-closed (fail-secure) device blocks traffic or access when it fails, keeping things protected but stopping legitimate use. Choosing between them is a deliberate trade-off between availability and security, and Security+ tests whether you can make that choice for a given scenario.",
   "For network security devices, the question usually applies to inline systems such as an IPS, next-generation firewall or web application firewall. If an inline IPS fails open, traffic keeps flowing without inspection; business continues, but attacks could pass unseen during the outage. If it fails closed, all traffic through it stops; nothing malicious gets through, but neither does anything legitimate, which could halt a business. Many inline devices use hardware bypass modules that physically connect the network ports together when the device loses power, which is a fail-open design.",
   "The choice depends on what matters more for that specific system. A firewall protecting a network segment that holds highly sensitive data, such as a payment processing environment, usually fails closed: an outage is better than exposure. An IPS protecting a hospital's clinical network might fail open, because blocking all traffic could stop patient care, and other layers of defense remain. The decision should come from a risk assessment and be documented, not left to a vendor default.",
   "Physical security uses the same terms, and here safety adds an important twist. Electronic door locks can be fail-safe, unlocking when power is lost, or fail-secure, staying locked when power is lost. Doors on emergency exit routes must usually fail safe (open) so people can escape during a fire or power failure; life safety always wins, and building codes often require it. A server room or safe door may fail secure, staying locked, as long as people inside can still exit, because protecting the assets matters most and nobody needs to escape through it. Watch the terminology: in physical security, 'fail-safe' means the safe state for people, which is unlocked.",
   "Failure modes also apply to software and authentication. If a system cannot reach its authorization server, does it let everyone in or deny everyone? A secure default is fail closed: deny access when the decision cannot be made. Similarly, an application that encounters an error during an access check should deny the request, not skip the check. Many vulnerabilities come from code that 'fails open' by accident, for example returning success when an exception occurs.",
   "Walk through designing an IPS deployment for an online store. The store's revenue depends on the website being up, and it has a WAF and hardened servers behind the IPS. The team chooses fail-open with a bypass module for the IPS, so a device failure does not take the site down, and configures monitoring to alert the SOC immediately if the IPS enters bypass. For the separate segment holding the card data vault, the firewall is set to fail closed, and a redundant pair of firewalls in high-availability mode reduces the chance that failing closed ever causes an outage.",
   "Redundancy is how organizations avoid having to choose too painfully. Clustering or pairing inline devices means one can fail while the other continues inspecting traffic, so you get both availability and security. Monitoring matters too: a device that has silently failed open provides a false sense of security, so alerts on bypass mode, health checks and regular testing are essential. Common mistakes: assuming fail-closed is always more secure and therefore always correct (it can cause severe availability problems or even safety risks); mixing up fail-safe and fail-secure for doors; and forgetting to test what actually happens when a device fails.",
   "Exam clue words: 'availability is most important', 'must not disrupt operations' point to fail-open. 'Confidentiality is most important', 'protect sensitive data even if it causes an outage' point to fail-closed. 'Emergency exit door during a fire' points to fail-safe (unlocked). 'Vault or server room door during power loss' points to fail-secure (locked). If a question mentions life safety, choose the option that protects people."
  ],
  "terms": [
   [
    "Fail-open",
    "A failure mode where a device allows traffic or access when it fails, favoring availability."
   ],
   [
    "Fail-closed",
    "A failure mode where a device blocks traffic or access when it fails, favoring security."
   ],
   [
    "Fail-safe (physical)",
    "A lock that unlocks on power loss so people can exit safely."
   ],
   [
    "Fail-secure (physical)",
    "A lock that stays locked on power loss to protect assets."
   ],
   [
    "Bypass module",
    "Hardware that passes traffic around an inline device if it fails, a fail-open design."
   ],
   [
    "High availability pair",
    "Two redundant devices where one takes over if the other fails."
   ]
  ],
  "example": "During a power failure at a data center, the badge-controlled doors on the fire exit corridor unlock automatically (fail-safe) so staff can leave, while the cage doors around customer racks stay locked (fail-secure). Meanwhile the inline IPS on the internet link, configured to fail open with a bypass module, keeps traffic flowing on generator power even though its inspection engine has crashed, and the SOC receives an alert that the IPS is in bypass.",
  "tip": "Fail-open favors availability; fail-closed favors confidentiality and integrity. For doors, life safety wins: exit routes fail safe (unlocked).",
  "check": [
   [
    "An inline IPS protecting a hospital's clinical network fails. Why might the organization choose fail-open?",
    "Blocking all traffic could disrupt patient care, so availability is prioritized while other controls remain in place."
   ],
   [
    "Should an emergency exit door's electronic lock be fail-safe or fail-secure?",
    "Fail-safe, so it unlocks during a power failure and people can escape."
   ],
   [
    "How can an organization reduce the downside of a fail-closed firewall?",
    "Deploy redundant firewalls in a high-availability pair so one failure does not stop traffic."
   ],
   [
    "Why is monitoring essential for fail-open devices?",
    "A device that fails open silently stops protecting the network, so alerts are needed to fix it quickly."
   ]
  ]
 },
 {
  "t": "802.1X, NAC, port security",
  "body": [
   "Anyone who can plug a device into a network jack or join a Wi-Fi network gains a foothold for attacks. Network access control technologies decide who and what may connect, and in what state, before granting access. Security+ focuses on three related tools: IEEE 802.1X for port-based authentication, network access control (NAC) for checking device health and applying policy, and switch port security for limiting which devices can use a port. They work at the edge of the network, where devices first connect.",
   "802.1X is an IEEE standard for port-based network access control, used on both wired switches and Wi-Fi. It has three roles. The supplicant is the device or software asking to connect, such as a laptop. The authenticator is the network device controlling access, such as a switch or wireless access point. The authentication server, usually a RADIUS server, checks credentials against a directory and decides. Until authentication succeeds, the authenticator allows only authentication traffic (using EAP, the Extensible Authentication Protocol); everything else is blocked. On success, the port opens, often placing the device in a specific VLAN based on its identity.",
   "802.1X can use different EAP methods. EAP-TLS uses certificates on both the client and the server, providing strong mutual authentication and resisting credential theft; it is considered the most secure but requires managing client certificates. PEAP and EAP-TTLS create a TLS tunnel using the server's certificate and then send a username and password inside it. The key security point is that clients must validate the server certificate, or an attacker running a fake access point could capture credentials.",
   "Network access control (NAC) adds posture assessment and policy. When a device connects, the NAC system checks who the user is and what state the device is in: is antivirus running and updated, is the operating system patched, is disk encryption on, is the device company-managed? Based on the answers, NAC grants full access, places the device in a quarantine or remediation network where it can get updates, or denies access. Checks can use a persistent agent installed on managed devices, a dissolvable agent that runs once and removes itself (useful for guests), or agentless methods that scan the device from the network. NAC often uses 802.1X as its enforcement mechanism, but it can also work with other methods.",
   "Port security is a simpler switch feature that limits access based on MAC addresses. An administrator can restrict how many MAC addresses a switch port may learn, specify which MAC addresses are allowed (sticky learning can remember the first ones seen), and choose what happens on a violation: shut the port down, drop the traffic, or log an alert. Port security blocks casual plugging in of unauthorized devices and blunts MAC flooding attacks. Its weakness is that MAC addresses are easy to spoof, so it is not strong authentication on its own. An example switch configuration:",
   "```\ninterface Gi1/0/12\n switchport mode access\n switchport port-security\n switchport port-security maximum 2\n switchport port-security mac-address sticky\n switchport port-security violation shutdown\n```",
   "Walk through a combined design. Office wall ports use 802.1X with EAP-TLS: company laptops present device certificates and land in the corporate VLAN. The NAC system checks posture, and a laptop missing critical patches is placed in a remediation VLAN that can only reach the update servers until it is compliant. Printers, which cannot run 802.1X, are identified by MAC address authentication and placed in a restricted printer VLAN, and their ports use port security limited to one MAC. Unused ports are disabled entirely. A visitor who plugs a personal laptop into a meeting room jack gets only the guest network.",
   "Common mistakes: confusing the 802.1X roles (the switch or access point is the authenticator, not the authentication server); relying on MAC filtering or port security as strong authentication; forgetting to disable unused wall ports; and not validating server certificates in PEAP. Exam clue words: 'supplicant, authenticator, authentication server' and 'RADIUS' point to 802.1X. 'Check antivirus and patch status before granting access', 'quarantine noncompliant devices' point to NAC. 'Limit MAC addresses per switch port', 'shut down port on violation' point to port security. 'Agent that runs once and removes itself' is a dissolvable NAC agent."
  ],
  "terms": [
   [
    "802.1X",
    "An IEEE standard for port-based network access control using EAP and usually RADIUS."
   ],
   [
    "Supplicant",
    "The device or software requesting network access in 802.1X."
   ],
   [
    "Authenticator",
    "The switch or access point that enforces 802.1X by controlling the port."
   ],
   [
    "Authentication server",
    "The server, usually RADIUS, that checks credentials and approves or denies access."
   ],
   [
    "EAP-TLS",
    "An EAP method using certificates on both client and server for mutual authentication."
   ],
   [
    "Network access control (NAC)",
    "Checking identity and device posture before granting network access and enforcing policy."
   ],
   [
    "Port security",
    "A switch feature that restricts which and how many MAC addresses can use a port."
   ],
   [
    "Dissolvable agent",
    "A temporary NAC agent that checks a device's posture and then removes itself."
   ]
  ],
  "example": "A contractor plugs a personal laptop into a conference room network jack. The switch, acting as the 802.1X authenticator, finds no valid certificate, and the NAC policy places the laptop on the guest VLAN with internet access only. Later, an employee's company laptop that has not received updates for two months is placed in a remediation VLAN until the patch agent brings it into compliance, and then it is automatically moved to the corporate network.",
  "tip": "In 802.1X, supplicant is the client, authenticator is the switch or AP, and authentication server is RADIUS. Port security uses MAC addresses, which can be spoofed, so it is weaker than 802.1X.",
  "check": [
   [
    "In 802.1X, what role does a wireless access point play?",
    "The authenticator, which relays authentication and opens or keeps closed the connection based on the server's decision."
   ],
   [
    "What does NAC posture assessment check?",
    "Device health such as antivirus status, patch level, encryption and whether the device is managed, before granting access."
   ],
   [
    "Why is port security alone not strong authentication?",
    "It relies on MAC addresses, which attackers can easily spoof."
   ],
   [
    "Why is EAP-TLS considered more secure than password-based EAP methods?",
    "It uses certificates on both client and server, providing mutual authentication without reusable passwords."
   ]
  ]
 },
 {
  "t": "VPN, IPsec, TLS, SD-WAN, SASE, jump servers, proxies",
  "body": [
   "Remote users, branch offices and cloud services all need secure connections, and SY0-701 lists several technologies that provide or control them. A virtual private network (VPN) creates an encrypted tunnel across an untrusted network such as the internet, so traffic between two points is protected from eavesdropping and tampering. The main questions are which protocol builds the tunnel, where the tunnel ends, and how much traffic goes through it. Newer architectures such as SD-WAN and SASE change how branch and remote traffic is routed and secured, while jump servers and proxies control specific kinds of access.",
   "There are two common VPN designs. A site-to-site VPN connects whole networks, such as a branch office to headquarters, usually between firewalls or routers, and users do not notice it. A remote access VPN connects an individual device to the organization's network through client software. In a full tunnel, all of the user's traffic, including internet browsing, goes through the VPN to be inspected by corporate security tools. In a split tunnel, only traffic for corporate resources goes through the VPN and internet traffic goes directly out; this saves bandwidth but leaves internet traffic outside corporate protection.",
   "IPsec (Internet Protocol Security) protects traffic at the network layer and is common for site-to-site VPNs. It uses the Internet Key Exchange (IKE) to negotiate keys and security associations. It has two main protocols: Authentication Header (AH), which provides integrity and authentication but no encryption, and Encapsulating Security Payload (ESP), which provides encryption as well as integrity and authentication. It has two modes: transport mode protects only the payload of each packet and is used host-to-host, while tunnel mode encrypts the entire original packet and wraps it in a new one, which is used between gateways in site-to-site VPNs. TLS VPNs (often still called SSL VPNs) use the same TLS that protects HTTPS and are popular for remote access because TLS on port 443 passes through most firewalls, and some can work through a browser.",
   "Software-defined wide area networking (SD-WAN) manages connections between branches and data centers or clouds using software policy, choosing between multiple links such as broadband, 4G or 5G and MPLS based on performance and cost. It lets branches reach cloud services directly instead of backhauling all traffic to headquarters. Secure access service edge (SASE) combines networking like SD-WAN with cloud-delivered security services, such as secure web gateway, cloud access security broker, firewall as a service and zero trust network access, so users and branches get consistent security wherever they connect, enforced close to them in the provider's cloud.",
   "A jump server (jump box or bastion host) is a hardened system that administrators must connect to first before they can reach sensitive servers. It centralizes administrative access, so it can require MFA, record sessions, and be the only system allowed through the firewall to management ports. A proxy server makes requests on behalf of clients. A forward proxy sits in front of users and filters or caches their outbound web traffic, enforcing acceptable use and blocking malicious sites. A reverse proxy sits in front of servers, receiving inbound requests and passing them to back-end servers, often providing load balancing, TLS termination and WAF protection. A transparent proxy intercepts traffic without client configuration, while an explicit proxy requires clients to be configured to use it.",
   "Walk through a remote administration design. Engineers working from home connect with a TLS remote access VPN using certificates and MFA, landing in a network zone that can reach only the jump server. They log in to the jump server with MFA through a privileged access management tool that records their session, and from there they reach production servers over SSH or RDP. Production servers accept management connections only from the jump server's address. General internet browsing from company laptops goes through a SASE provider's secure web gateway whether users are at home or in the office.",
   "Common mistakes: confusing AH (no encryption) with ESP (encryption); mixing up transport mode and tunnel mode; thinking split tunneling is more secure (it exposes internet traffic outside corporate controls); confusing forward and reverse proxies; and treating a jump server as a normal server rather than a hardened, monitored choke point. If the jump server is compromised, so is administrative access, so it needs the strongest protection.",
   "Exam clue words: 'connect two offices' is site-to-site VPN; 'encrypts the entire original packet' is IPsec tunnel mode; 'integrity without confidentiality' is AH; 'remote access over 443 through restrictive firewalls' is a TLS VPN; 'all traffic inspected by corporate controls' is full tunnel; 'combines networking with cloud-delivered security' is SASE; 'hardened host for administrative access' is a jump server; 'protects web servers, load balances inbound traffic' is a reverse proxy; 'filters users' outbound web traffic' is a forward proxy."
  ],
  "terms": [
   [
    "Site-to-site VPN",
    "An encrypted tunnel connecting two networks, typically between gateways."
   ],
   [
    "Split tunnel",
    "A VPN setup where only corporate traffic uses the tunnel and other traffic goes directly to the internet."
   ],
   [
    "IPsec tunnel mode",
    "IPsec mode that encrypts the entire original packet and adds a new header, used between gateways."
   ],
   [
    "ESP",
    "Encapsulating Security Payload, the IPsec protocol that provides encryption plus integrity and authentication."
   ],
   [
    "SD-WAN",
    "Software-defined WAN, which manages and routes traffic across multiple links using policy."
   ],
   [
    "SASE",
    "Secure access service edge, which combines SD-WAN style networking with cloud-delivered security services."
   ],
   [
    "Jump server",
    "A hardened host that administrators connect through to reach sensitive systems."
   ],
   [
    "Reverse proxy",
    "A server that receives inbound requests on behalf of back-end servers."
   ]
  ],
  "example": "A company with 40 retail branches replaces expensive dedicated circuits with SD-WAN over two broadband links per store, and routes store and remote worker traffic through a SASE provider that applies web filtering, firewall policy and zero trust access to internal apps. Administrators managing the point-of-sale servers must still connect through a single jump server that requires MFA and records every session.",
  "tip": "IPsec: AH gives integrity only, ESP adds encryption; tunnel mode wraps the whole packet (site-to-site), transport mode protects only the payload (host-to-host).",
  "check": [
   [
    "What is the security trade-off of a split-tunnel VPN?",
    "It saves bandwidth, but internet traffic bypasses corporate security inspection."
   ],
   [
    "Which IPsec protocol provides confidentiality?",
    "ESP (Encapsulating Security Payload); AH provides integrity and authentication only."
   ],
   [
    "What is the difference between a forward proxy and a reverse proxy?",
    "A forward proxy acts for internal clients making outbound requests; a reverse proxy acts for servers receiving inbound requests."
   ],
   [
    "Why route administrative access through a jump server?",
    "It creates a single hardened, monitored point where MFA and session recording can be enforced and firewall rules kept tight."
   ]
  ]
 },
 {
  "t": "Data types and classifications",
  "body": [
   "You cannot protect data well if you do not know what it is or how sensitive it is. Data classification labels information by its sensitivity and value so the organization can apply the right controls: stronger encryption, tighter access and careful handling for the most sensitive data, and lighter controls for public information. Classification also drives retention, disposal and incident response decisions. Security+ tests both the types of data you will encounter and the classification labels commonly used by businesses and governments.",
   "Data types describe what the data is. Regulated data is governed by laws or industry rules, such as payment card data under PCI DSS or health information under healthcare laws. Personally identifiable information (PII) is any information that can identify a person, such as name with date of birth, national ID number, address or biometric data. Protected health information (PHI) is health-related data tied to an individual. Financial information includes account and card numbers and financial records. Trade secrets are confidential business information that gives a competitive advantage, such as formulas or processes. Intellectual property (IP) includes patents, copyrights and trademarks. Legal information covers contracts, case files and privileged communications. Human-readable and non-human-readable data (such as encoded or binary data) matters for tools like data loss prevention, which must recognize sensitive data in different forms.",
   "Commercial classification schemes vary by organization but commonly include public (safe to release, such as marketing material), private or internal (for employees only, such as internal procedures), sensitive (could cause some harm if disclosed), confidential (serious harm if disclosed, such as customer data or contracts), restricted (the highest business level, with the tightest controls) and critical (essential to operations). Government schemes typically use unclassified, confidential, secret and top secret, based on potential damage to national security.",
   "Classification is a process with clear roles. The data owner, usually a senior business manager, decides the classification and who may access the data. The data custodian or steward, often IT, implements the controls the owner requires, such as backups, encryption and permissions. Users handle data according to its label. Labels should be applied visibly (headers, footers, watermarks) and as metadata tags so tools like data loss prevention can act on them automatically. Data should be reclassified when its sensitivity changes; for example, quarterly results are confidential before publication and public afterward.",
   "Data sovereignty and geographic considerations also apply. Data may be subject to the laws of the country where it is stored or where the people it describes live, which affects where it can be hosted and how it can be transferred. Some data types, such as PHI or government data, come with specific handling rules regardless of internal labels. Privacy laws such as the EU General Data Protection Regulation (GDPR) restrict transferring personal data to other countries without adequate safeguards, so a classification program should record where data lives, not just how sensitive it is. Knowing both makes it far easier to answer a regulator, a customer or an incident responder who asks what was exposed.",
   "Walk through classifying files in a small company. The price list on the website is public. The employee handbook is internal. The customer database with names, emails and purchase histories is confidential, because it contains PII and is regulated by privacy law. The source code for the company's proprietary software is restricted, as it is a trade secret. Each label maps to handling rules: confidential data must be encrypted at rest and in transit and accessed only by approved roles; restricted data additionally requires MFA and is monitored by DLP to prevent it leaving the company.",
   "Common mistakes: letting IT decide classification (the data owner decides, IT implements); creating too many levels, which confuses staff and leads to inconsistent labeling; never reclassifying data; classifying but not linking labels to specific controls; and assuming PII only means obvious identifiers. Combinations of data, such as postcode plus date of birth plus gender, can identify people even when each item alone does not.",
   "Exam clue words: 'information that identifies a person' is PII; 'health records' is PHI; 'secret recipe or process' is a trade secret; 'who decides the classification' is the data owner; 'who implements backups and permissions' is the custodian; 'highest commercial sensitivity' is restricted or confidential depending on the scheme; 'government's highest level' is top secret. When asked why classify, the answer is to apply appropriate, proportionate controls."
  ],
  "terms": [
   [
    "Data classification",
    "Labeling data by sensitivity and value so appropriate controls can be applied."
   ],
   [
    "PII",
    "Personally identifiable information that can identify an individual."
   ],
   [
    "PHI",
    "Protected health information, health data linked to an individual."
   ],
   [
    "Regulated data",
    "Data governed by laws or industry standards, such as card data or health records."
   ],
   [
    "Trade secret",
    "Confidential business information that provides a competitive advantage."
   ],
   [
    "Data owner",
    "The senior person accountable for data who decides its classification and access."
   ],
   [
    "Data custodian",
    "The role, often IT, that implements and maintains the controls the owner requires."
   ]
  ],
  "example": "A research company labels its experimental drug formulas as restricted, its internal project plans as confidential, and its published papers as public. The DLP system reads the restricted label from document metadata and blocks those files from being emailed outside the company or copied to USB drives. When a paper is published, the data owner reclassifies the related draft as public so staff can share it freely.",
  "tip": "The data owner decides the classification; the custodian implements the controls. Classification exists so that controls are proportional to sensitivity.",
  "check": [
   [
    "Who should decide a data set's classification, and who implements the protection?",
    "The data owner decides; the data custodian (often IT) implements the controls."
   ],
   [
    "Why might a list of postcodes, birth dates and genders be treated as PII?",
    "Combined, those attributes can identify individuals even without names."
   ],
   [
    "Why should classification labels be applied as metadata as well as visible markings?",
    "Metadata lets automated tools such as DLP recognize the data and enforce policy."
   ],
   [
    "Give an example of when data should be reclassified.",
    "Financial results that are confidential before announcement become public after they are released."
   ]
  ]
 },
 {
  "t": "Data states: at rest, in transit, in use",
  "body": [
   "Data exists in three states, and each needs different protection. Data at rest is stored: on disks, in databases, in backups, on USB drives and in cloud storage. Data in transit (or in motion) is moving across a network, between a browser and a web server, between data centers or from a phone to a cloud service. Data in use is being actively processed: loaded into memory, displayed on a screen or used by an application's CPU. Security+ expects you to match each state with the controls that fit it, and to spot which state a scenario is describing.",
   "Data at rest is protected mainly by encryption and access control. Full disk encryption protects lost or stolen devices; file, database and field-level encryption protect specific information; and encrypted backups protect copies. Access controls, permissions and data classification ensure only authorized people can open stored data, even on systems where it is decrypted for use. Other techniques such as tokenization, masking and secure deletion also apply to stored data. Physical protection of the storage media matters too.",
   "Data in transit is protected by encrypting the connection. TLS protects web traffic, APIs and email transport; VPNs using IPsec or TLS protect remote access and site-to-site links; SSH protects administrative sessions and file transfers with SFTP. Integrity checks and certificates ensure the data is not altered and is reaching the right destination. Without these protections, anyone on the path, such as someone on the same public Wi-Fi or an attacker who has poisoned ARP or DNS, can read or change the data.",
   "Data in use is the hardest state to protect, because systems usually need data in plaintext to work with it. Protections include access control and least privilege (limiting who and what can access data while it is loaded), memory protection features in the operating system, screen privacy filters and session timeouts for what is displayed, data masking in applications so users see only what they need, and endpoint detection that watches for memory-scraping malware. Newer confidential computing technologies use hardware trusted execution environments, such as secure enclaves, to keep data encrypted in memory except inside a protected area of the processor. Homomorphic encryption, which allows some calculations on encrypted data, is an emerging technique.",
   "Walk through one piece of data moving through all three states. A patient enters her insurance number on a clinic's web portal. As she submits it, TLS protects it in transit to the server. The application processes it in memory to check eligibility; it is in use, protected by the server's access controls and hardening. It is then stored in the database, at rest, where column-level encryption protects it, and nightly backups are encrypted as well. When a receptionist views the record, the number is masked to show only the last four digits, protecting it while in use on screen. When the backup is copied to an offsite provider, it is in transit again, over an encrypted link.",
   "Different threats target each state. Stolen laptops, lost backup tapes and exposed storage buckets threaten data at rest. Eavesdropping, on-path attacks and downgrade attacks threaten data in transit. Memory-scraping malware on point-of-sale systems, screen capture, shoulder surfing and malicious insiders threaten data in use. Understanding the state helps you see which control would have prevented a breach.",
   "Common mistakes: assuming full disk encryption protects data being processed on a running system (it protects data at rest only); thinking TLS protects data once it arrives and is stored (it protects the transfer, not storage); ignoring data in use because it is hard; and forgetting that data changes state repeatedly during its lifecycle, so it needs protection in every state, not just one. Also, internal networks are not automatically safe for data in transit, which is why zero trust encourages encrypting internal traffic too.",
   "Exam clue words: 'stored', 'database', 'backup tape', 'lost laptop' point to data at rest. 'Network', 'transmission', 'sent between', 'intercepted' point to data in transit. 'Memory', 'processing', 'RAM scraping', 'on screen' point to data in use. Match controls: encryption and access control for at rest; TLS, VPN and SSH for in transit; access control, masking, secure enclaves and endpoint protection for in use."
  ],
  "terms": [
   [
    "Data at rest",
    "Data stored on disks, databases, backups or other media."
   ],
   [
    "Data in transit",
    "Data moving across a network; also called data in motion."
   ],
   [
    "Data in use",
    "Data being actively processed in memory or displayed."
   ],
   [
    "Transport encryption",
    "Protecting data in transit with protocols such as TLS, IPsec or SSH."
   ],
   [
    "Confidential computing",
    "Using hardware trusted execution environments to protect data while it is processed."
   ],
   [
    "Memory scraping",
    "Malware that reads sensitive data from a system's memory while it is in use."
   ]
  ],
  "example": "A restaurant chain encrypts card data in transit from its terminals and stores only tokens at rest, yet attackers still steal card numbers. Investigation finds memory-scraping malware on the point-of-sale systems that captured card data in plaintext in memory during processing, the brief moment the data was in use. The chain moves to point-to-point encryption, where the card reader encrypts the number before it ever reaches the terminal's memory.",
  "tip": "Encryption at rest does nothing for data in transit, and neither helps data in use. Identify the state in the question, then pick the control that fits it.",
  "check": [
   [
    "Which data state does memory-scraping malware target?",
    "Data in use, while it is in plaintext in memory being processed."
   ],
   [
    "An attacker on public Wi-Fi intercepts unencrypted login details. Which state was unprotected, and what control would help?",
    "Data in transit; encrypting the connection with TLS or a VPN."
   ],
   [
    "Does full disk encryption protect files from malware on a running, logged-in laptop?",
    "No; FDE protects data at rest when the device is off or locked, not while the system is running."
   ],
   [
    "Why is data in use the hardest state to protect?",
    "Applications usually need data decrypted to process it, so it must rely on access control, memory protection and specialized hardware."
   ]
  ]
 },
 {
  "t": "Protection: encryption, hashing, masking, tokenization, DLP",
  "body": [
   "Once you know what data you have and how sensitive it is, you choose methods to protect it. Security+ lists several data protection methods: encryption, hashing, masking, tokenization, obfuscation, segmentation, permission restrictions and geographic restrictions, along with data loss prevention (DLP) tools that watch data as it moves. Each method protects data in a different way, and exam questions often describe a requirement and ask which method fits best. The deciding questions are usually: must the original data be recoverable, by whom, and where does it need to be usable?",
   "Encryption transforms data so only holders of the right key can read it, and it is reversible with that key. Use it when authorized people or systems need the original data back: stored files, databases, backups and network traffic. Its strength depends on the algorithm and, above all, on key management. Hashing is one-way: it produces a fixed-length fingerprint that cannot be turned back into the original. Use it to verify integrity (has this file changed?) and to store passwords (with salts and key stretching), never when you need the original data back.",
   "Masking hides part or all of a value, such as showing only the last four digits of a card or account number. It lets staff do their jobs without seeing full sensitive values, and static masking creates realistic test data from production copies. Tokenization replaces a sensitive value with a random token that has no mathematical link to the original; the mapping lives in a secure token vault, and only systems authorized to query the vault can recover the real value. It is widely used for payment card numbers because it removes real card data from most systems and shrinks compliance scope.",
   "Other methods round out the list. Segmentation places sensitive data in isolated network zones or separate databases. Permission restrictions use access controls so only authorized roles can read or change data. Geographic restrictions limit where data may be stored or accessed from, for example keeping data in one country for data sovereignty or blocking logins from countries where the company does not operate (geofencing). Obfuscation more generally makes data hard to understand, which includes techniques like steganography and code obfuscation.",
   "Data loss prevention (DLP) detects and stops sensitive data from leaving authorized locations. DLP tools identify sensitive content using patterns (such as card number formats with checksum validation), keywords, document fingerprints, classification labels and machine learning, then apply policy: block, encrypt, quarantine, alert or ask the user to justify. Endpoint DLP runs on devices and can control USB copying, printing and uploads. Network DLP inspects traffic leaving the network, including email and web uploads (often requiring TLS inspection). Cloud DLP scans and controls data in SaaS and cloud storage, often through a CASB. DLP can protect data at rest (discovery scans that find sensitive files in the wrong places), in transit and in use.",
   "Walk through choosing methods for a customer support system. Agents need to confirm a customer's identity but should not see full card numbers, so the support screen uses masking. The billing system must charge the card again next month without storing the number, so it uses tokenization with the payment provider. The database backups contain customer addresses and must be restorable, so they use encryption. Customer passwords are stored with salted, stretched hashing. And DLP on email and endpoints blocks anyone from sending spreadsheets with many card or national ID numbers outside the company.",
   "Common mistakes: choosing hashing when the data must be retrieved (hashes cannot be reversed); treating tokenization as encryption (there is no key to steal; the vault is the protected asset); thinking masking protects the underlying stored data (dynamic masking only changes display); deploying DLP in blocking mode immediately without tuning, which can disrupt business with false positives; and assuming DLP can see inside encrypted traffic without inspection. DLP is best rolled out in monitor mode first, then tightened.",
   "Exam clue words: 'must be decrypted later by authorized users' is encryption; 'verify integrity', 'store passwords' is hashing; 'display only last four digits', 'test data' is masking; 'replace card number with a surrogate', 'reduce PCI scope' is tokenization; 'prevent sensitive data leaving', 'block USB copy of confidential files', 'scan outbound email for ID numbers' is DLP; 'keep data within a country' is a geographic restriction."
  ],
  "terms": [
   [
    "Encryption",
    "Reversible transformation of data using a key so only authorized holders can read it."
   ],
   [
    "Hashing",
    "One-way transformation producing a fixed-length value, used for integrity checks and password storage."
   ],
   [
    "Data masking",
    "Hiding part or all of a sensitive value from view."
   ],
   [
    "Tokenization",
    "Replacing sensitive data with a random token mapped back only through a secure vault."
   ],
   [
    "Data loss prevention (DLP)",
    "Tools and policies that detect and stop sensitive data from leaving authorized locations."
   ],
   [
    "Endpoint DLP",
    "DLP running on devices to control actions such as USB copying, printing and uploads."
   ],
   [
    "Geographic restriction",
    "Limiting where data may be stored or accessed from, for example by country."
   ]
  ],
  "example": "An HR assistant tries to email a spreadsheet containing 300 employees' national ID numbers to a personal webmail address so she can work from home. The endpoint DLP agent recognizes the ID number pattern, blocks the upload, and shows a message explaining the policy and offering the approved secure file-sharing option. The security team receives an alert, reviews it, confirms the intent was not malicious, and uses it as an example in the next awareness session.",
  "tip": "Ask whether the original must come back. Yes, by key holders: encryption. Yes, through a vault only: tokenization. No, just verify: hashing. Just hide on screen: masking. Stop it leaving: DLP.",
  "check": [
   [
    "A system must verify passwords but should never be able to recover them. Which method fits?",
    "Hashing with salts and key stretching."
   ],
   [
    "Why is tokenization attractive for payment card data?",
    "Tokens have no mathematical link to card numbers, so stolen tokens are useless and systems holding only tokens fall outside much of PCI DSS scope."
   ],
   [
    "Which tool would stop an employee copying confidential files to a USB drive?",
    "Endpoint DLP enforcing a policy on removable media."
   ],
   [
    "Why is DLP often deployed in monitor mode first?",
    "To tune detection rules and avoid blocking legitimate business activity with false positives."
   ]
  ]
 },
 {
  "t": "Resilience: HA, clustering, load balancing, RAID",
  "body": [
   "Resilience is a system's ability to keep working, or recover quickly, when components fail. It supports availability, the A in the CIA triad. Hardware breaks, software crashes, power fails and attacks happen, so resilient designs remove single points of failure: any one component whose failure would stop the whole service. Security+ covers the main building blocks: high availability, clustering, load balancing, RAID, plus power resilience and platform diversity. You should be able to say which one addresses which failure.",
   "High availability (HA) is the goal of keeping a service running with minimal downtime, often expressed as a percentage of uptime such as 99.99 percent (about 53 minutes of downtime a year). HA is achieved through redundancy: duplicate servers, network links, power supplies and data centers, with automatic failover so a backup component takes over when the primary fails. Redundancy costs money, so the level of HA should match the business impact of downtime identified in a business impact analysis.",
   "Clustering groups multiple servers so they act as one system. In an active-passive cluster, one node handles the workload while another stands by, ready to take over if the active node fails; it is simpler but leaves capacity idle. In an active-active cluster, all nodes handle work at the same time, providing both capacity and redundancy; if one fails, the others carry the load, provided they have enough spare capacity. Clusters usually share storage or replicate data between nodes and use heartbeat signals to detect failures.",
   "Load balancing distributes incoming requests across multiple servers. A load balancer sits in front of a server pool, sends each request to a healthy server using a method such as round robin, least connections or weighted distribution, and runs health checks so it stops sending traffic to failed servers. This improves performance and availability together. Some applications need session persistence (sticky sessions), where a user keeps going to the same server. Load balancers are often also the place where TLS is terminated and where a WAF is applied, and they themselves should be deployed in redundant pairs so they do not become the single point of failure.",
   "RAID (redundant array of independent disks) combines disks for performance, redundancy or both. RAID 0 stripes data across disks for speed but has no redundancy; one failed disk loses everything. RAID 1 mirrors data on two disks, so either can fail. RAID 5 stripes data with distributed parity across at least three disks and survives one disk failure. RAID 6 uses double parity and survives two disk failures. RAID 10 (1+0) combines mirroring and striping for speed and redundancy, needing at least four disks. RAID protects against disk failure, not against deletion, corruption, ransomware or site disasters, so it is never a substitute for backups.",
   "Other resilience measures appear in the objectives. Power resilience uses uninterruptible power supplies (UPS) to bridge short outages and allow clean shutdowns, generators for long outages, and dual power supplies fed from separate circuits through power distribution units. Platform diversity (using different vendors, operating systems or cloud providers) prevents one flaw or outage from taking down everything. Multi-cloud and geographic dispersion spread workloads across regions so a regional disaster does not stop service. Capacity planning ensures there are enough people, technology and infrastructure to handle demand and failures.",
   "Walk through a design for an online store. Two load balancers in an active-passive pair front six web servers, spread across two availability zones. The database runs as a cluster with synchronous replication between zones. Each server has RAID 1 for its operating system disks and dual power supplies. The data center has UPS and generator backup. If a disk fails, RAID keeps the server running; if a server fails, the load balancer routes around it; if a zone fails, the other zone carries the load. Separately, nightly backups protect against corruption and ransomware, which none of these redundancy measures address.",
   "Common mistakes: calling RAID a backup; forgetting the load balancer can itself be a single point of failure; assuming active-active always survives a node failure without capacity planning; and confusing high availability with disaster recovery (HA keeps a service running through component failures; disaster recovery restores it after a major event). Exam clue words: 'distribute requests across servers' is load balancing; 'standby node takes over' is active-passive clustering; 'survives two disk failures' is RAID 6; 'mirroring' is RAID 1; 'striping with no redundancy' is RAID 0; 'brief power loss' is UPS; 'extended outage' is a generator."
  ],
  "terms": [
   [
    "High availability",
    "Designing systems to keep running with minimal downtime through redundancy and failover."
   ],
   [
    "Single point of failure",
    "A component whose failure stops the whole system."
   ],
   [
    "Active-passive cluster",
    "A cluster where a standby node takes over if the active node fails."
   ],
   [
    "Active-active cluster",
    "A cluster where all nodes handle workload simultaneously."
   ],
   [
    "Load balancer",
    "A device or service that distributes requests across multiple servers and checks their health."
   ],
   [
    "RAID 5",
    "Disk striping with distributed parity across three or more disks, surviving one disk failure."
   ],
   [
    "RAID 6",
    "Disk striping with double parity, surviving two simultaneous disk failures."
   ],
   [
    "UPS",
    "Uninterruptible power supply, providing short-term battery power during outages."
   ]
  ],
  "example": "A company's file server uses RAID 5, and the team assumes the data is safe. When ransomware encrypts the shares, RAID faithfully keeps the encrypted files redundant across all disks. Recovery comes only from the offline backups, which were three days old. Afterward, the company keeps RAID for disk failures but adds immutable daily backups and a clear distinction in its documentation between redundancy and backup.",
  "tip": "RAID protects against disk failure only; it is never a backup. Load balancers and clusters protect against server failure; backups protect against deletion, corruption and ransomware.",
  "check": [
   [
    "Why is RAID not a substitute for backups?",
    "RAID copies every change, including deletions, corruption and ransomware encryption, so it only protects against disk failure."
   ],
   [
    "What is the difference between active-active and active-passive clustering?",
    "In active-active all nodes serve traffic; in active-passive a standby node waits to take over when the active one fails."
   ],
   [
    "A RAID array must survive two simultaneous disk failures. Which level fits?",
    "RAID 6, whose double parity lets the array keep working with any two disks failed."
   ],
   [
    "How can a load balancer become a single point of failure, and how is that fixed?",
    "If only one exists, its failure stops all traffic; deploying load balancers in a redundant pair fixes this."
   ]
  ]
 },
 {
  "t": "Backups, sites (hot/warm/cold), RPO/RTO",
  "body": [
   "Backups and recovery sites are how an organization survives events that redundancy cannot handle: ransomware, accidental deletion, corruption, fire, flood or the loss of an entire data center. Planning starts with a business impact analysis (BIA), which identifies critical processes and how much downtime and data loss the business can tolerate. Those tolerances become recovery objectives, and the objectives decide which backup methods and recovery sites are worth paying for. Security+ tests the terminology precisely, so learn the definitions carefully.",
   "The recovery point objective (RPO) is the maximum acceptable amount of data loss, measured in time. An RPO of four hours means the business can afford to lose at most four hours of data, so backups or replication must happen at least every four hours. The recovery time objective (RTO) is the maximum acceptable time to restore a service after an outage. An RTO of eight hours means the service must be running again within eight hours. Two related metrics describe reliability: mean time between failures (MTBF), the average time a component runs before failing, and mean time to repair (MTTR), the average time to fix it. Memory aid: RPO looks backward at data; RTO looks forward at downtime.",
   "Backup types differ in what they copy. A full backup copies all selected data; it is simplest to restore but takes the most time and storage. An incremental backup copies only data changed since the last backup of any type; backups are fast and small, but a restore needs the last full backup plus every incremental since. A differential backup copies everything changed since the last full backup; each differential grows through the week, but a restore needs only the last full plus the latest differential. Snapshots capture the state of a system or volume at a point in time and are quick to create and restore, while replication and journaling continuously copy changes to another system for very low RPOs.",
   "Where and how backups are stored matters as much as how often they run. The 3-2-1 rule recommends three copies of data, on two different types of media, with one copy offsite. Against ransomware, at least one copy should be offline, air-gapped or immutable (write-once storage that cannot be changed or deleted for a set period), because attackers deliberately seek out and destroy reachable backups. Backups should be encrypted, access to them restricted, and restores tested regularly; a backup that has never been restored is an assumption, not a plan.",
   "Recovery sites provide somewhere to run operations if the main site is lost. A hot site is a fully equipped, running duplicate with current data, ready to take over within minutes or hours; it is the most expensive and supports the shortest RTO. A warm site has hardware and connectivity in place but needs data restored and systems configured, taking hours to days; it balances cost and speed. A cold site provides space, power and cooling but little or no equipment, taking days to weeks to bring online; it is cheapest. Cloud-based recovery and mobile sites are further options, and geographic dispersion keeps the recovery site far enough away not to share the same disaster.",
   "Walk through choosing a strategy. An online retailer's BIA says the order system must be back within one hour (RTO) and can lose no more than five minutes of orders (RPO). Nightly backups alone cannot meet a five-minute RPO, so the database is continuously replicated to a hot site in another region, with nightly immutable backups for ransomware protection. The internal wiki has an RTO of three days and an RPO of 24 hours, so nightly backups and restoration to a cold or cloud environment when needed are enough. Matching the method to the objective avoids overspending on low-priority systems.",
   "Common mistakes: swapping RPO and RTO; thinking incremental restores are faster than differential (they are slower because more sets are needed); relying on backups that are online and reachable by the same credentials attackers steal; never testing restores; and placing the recovery site close enough to share the same flood zone or power grid. Also remember that recovery exercises, from tabletop walk-throughs to full failover tests, prove the plan works.",
   "Exam clue words: 'maximum data loss' is RPO; 'maximum downtime' is RTO; 'average time between failures' is MTBF; 'fastest recovery, highest cost' is a hot site; 'space and power only' is a cold site; 'hardware ready but data must be restored' is a warm site; 'changes since last full backup' is differential; 'changes since last backup of any kind' is incremental; 'cannot be altered or deleted' is immutable."
  ],
  "terms": [
   [
    "RPO",
    "Recovery point objective, the maximum acceptable data loss measured in time."
   ],
   [
    "RTO",
    "Recovery time objective, the maximum acceptable time to restore a service."
   ],
   [
    "MTBF",
    "Mean time between failures, the average time a component operates before failing."
   ],
   [
    "Incremental backup",
    "A backup of data changed since the last backup of any type."
   ],
   [
    "Differential backup",
    "A backup of data changed since the last full backup."
   ],
   [
    "Hot site",
    "A fully equipped, up-to-date recovery site ready to take over quickly."
   ],
   [
    "Cold site",
    "A recovery site with space and power but little or no equipment."
   ],
   [
    "Immutable backup",
    "A backup that cannot be modified or deleted for a defined retention period."
   ]
  ],
  "example": "A law firm is hit by ransomware that also deletes the backups on its network-attached storage, which used the same domain administrator credentials. Fortunately, a weekly copy had been sent to immutable cloud storage. The firm restores from that copy but loses five days of work, far beyond its one-day RPO. It moves to daily immutable backups with separate credentials and tests a restore every month.",
  "tip": "RPO equals how much data you can lose (points back in time); RTO equals how long you can be down. Differential restores need full plus latest differential; incremental restores need full plus every incremental.",
  "check": [
   [
    "A business can tolerate losing two hours of transactions. Which objective is this, and what does it imply?",
    "An RPO of two hours; backups or replication must occur at least every two hours."
   ],
   [
    "Why is a differential restore faster than an incremental restore?",
    "It needs only the last full backup and the latest differential, while incremental needs the full plus every incremental since."
   ],
   [
    "Which recovery site supports the shortest RTO?",
    "A hot site, which is fully equipped and has current data."
   ],
   [
    "Why do immutable or offline backups matter against ransomware?",
    "Attackers target reachable backups; immutable or offline copies cannot be encrypted or deleted by them."
   ]
  ]
 },
 {
  "t": "Secure baselines, mobile (MDM, BYOD, COPE, CYOD)",
  "body": [
   "A secure baseline is a documented, approved configuration that every system of a given type must meet: which services run, which settings are enforced, which software is installed and how logging works. Baselines turn hardening from a one-off effort into a repeatable standard. The lifecycle has three steps the exam names: establish the baseline (often from CIS Benchmarks or vendor guides, adjusted for business needs), deploy it (through group policy, configuration management tools, images or infrastructure as code), and maintain it (scan for drift, update the baseline when new threats or versions appear, and re-apply it). Mobile devices need baselines too, and managing them depends heavily on who owns the device.",
   "Mobile devices are small, always connected, easily lost, and full of sensitive data such as email, documents and authentication apps. Mobile device management (MDM) software lets an organization enroll devices and enforce policies centrally: require a passcode and screen lock, enforce encryption, push or block apps, configure Wi-Fi and VPN, restrict features like the camera or USB storage, detect jailbroken or rooted devices, and remotely lock or wipe a lost device. Unified endpoint management (UEM) extends this to laptops and desktops. Mobile application management (MAM) manages specific apps and their data rather than the whole device.",
   "Deployment models describe ownership and control. With bring your own device (BYOD), employees use their personal devices for work. It saves money and users like it, but the organization has limited control, privacy is sensitive (the company should not see personal photos or wipe personal data), and devices may be unpatched. BYOD usually relies on containerization, which separates work apps and data into a managed container that can be wiped without touching personal content, and on MAM rather than full MDM.",
   "With corporate-owned, personally enabled (COPE), the company buys and owns the device, manages it fully, and allows reasonable personal use. The organization has strong control, can wipe the whole device, and can enforce consistent security. With choose your own device (CYOD), employees pick from a list of approved devices that the company buys and manages; it balances user choice with support and security. A fully corporate-owned device with no personal use gives maximum control but less flexibility.",
   "Mobile threats and settings the exam mentions include jailbreaking (iOS) and rooting (Android), which remove the operating system's security restrictions and should cause an MDM to block the device; sideloading, installing apps from outside the official store; and connection methods such as Bluetooth, Wi-Fi, NFC and cellular, each of which can be restricted. Location-based controls such as geofencing can enable or disable features when a device enters or leaves an area, and remote wipe protects data on lost or stolen devices. Keeping mobile operating systems updated matters as much as on laptops; MDM can report devices running outdated versions and block them until they update, and older devices that no longer receive updates from the manufacturer should be retired from work use.",
   "Walk through designing a mobile policy. Executives and field engineers get COPE phones with full MDM enrollment: encryption required, six-digit passcodes, automatic OS updates, managed apps only from an approved list, and full remote wipe. Other staff may use BYOD phones for email and chat through a managed work container: the company can require a passcode and wipe only the container, and it cannot see personal apps. Any device detected as jailbroken or rooted loses access to company data automatically. The baseline is reviewed each time a major mobile OS version is released, because new versions add both new security features and new settings that need a decision.",
   "Common mistakes: confusing COPE and CYOD (COPE is about personal use of a company device; CYOD is about choosing from an approved list); assuming MDM gives full control over BYOD devices (legally and practically, it should be limited to the work profile); forgetting that baselines need maintenance; and applying one baseline to every device regardless of role. Another trap is treating jailbroken devices as just a user preference; they bypass core OS protections and should be blocked.",
   "Exam clue words: 'standard configuration applied to all servers' is a secure baseline; 'enforce passcodes and remote wipe' is MDM; 'employee-owned device' is BYOD; 'company-owned, personal use allowed' is COPE; 'pick from approved list' is CYOD; 'separate work and personal data' is containerization; 'bypass OS restrictions on iPhone' is jailbreaking; on Android it is rooting."
  ],
  "terms": [
   [
    "Secure baseline",
    "An approved secure configuration that systems of a given type must meet, established, deployed and maintained."
   ],
   [
    "MDM",
    "Mobile device management, software that enforces policies and can lock or wipe mobile devices."
   ],
   [
    "BYOD",
    "Bring your own device, where employees use personal devices for work."
   ],
   [
    "COPE",
    "Corporate-owned, personally enabled: company devices that allow personal use."
   ],
   [
    "CYOD",
    "Choose your own device: employees select from a list of approved company-managed devices."
   ],
   [
    "Containerization",
    "Separating work apps and data from personal content on a device."
   ],
   [
    "Jailbreaking/rooting",
    "Removing OS restrictions on iOS (jailbreaking) or Android (rooting), bypassing built-in security."
   ]
  ],
  "example": "A sales representative loses her personal phone, which she uses under the company's BYOD program. The MDM administrator issues a selective wipe that removes only the work container holding email, contacts and sales documents, leaving her personal photos untouched. Because the container required its own passcode and encryption, the company confirms that no customer data was exposed before the wipe.",
  "tip": "BYOD means the user owns it, so use containerization and selective wipe. COPE means the company owns it but allows personal use. CYOD means the user chooses from an approved list.",
  "check": [
   [
    "Which deployment model gives the organization the most control while still allowing personal use?",
    "COPE, because the company owns and fully manages the device but permits personal use."
   ],
   [
    "Why is containerization important for BYOD?",
    "It separates work data from personal data so the company can protect and wipe work data without intruding on personal content."
   ],
   [
    "What should an MDM do when it detects a jailbroken device?",
    "Block the device's access to company data or apps, because jailbreaking bypasses OS security controls."
   ],
   [
    "What are the three stages of managing a secure baseline?",
    "Establish it, deploy it to systems, and maintain it by checking for drift and updating it."
   ]
  ]
 },
 {
  "t": "Wireless: WPA3, SAE, RADIUS, EAP",
  "body": [
   "Wireless networks broadcast through walls and into parking lots, so anyone within range can try to connect or capture traffic. Strong wireless security relies on encryption to protect traffic and authentication to control who joins. Security+ focuses on Wi-Fi Protected Access 3 (WPA3), its Simultaneous Authentication of Equals (SAE) handshake, and enterprise authentication using RADIUS and the Extensible Authentication Protocol (EAP). It also expects you to know why older options are no longer acceptable.",
   "A little history explains the current choices. Wired Equivalent Privacy (WEP) was badly broken and must never be used. WPA was an interim fix. WPA2 introduced strong AES-based encryption (CCMP) and served for many years, but WPA2-Personal, which uses a pre-shared key (PSK) or passphrase, has a weakness: an attacker who captures the four-way handshake when a device connects can take it away and try to guess the passphrase offline at high speed. Weak passphrases fall quickly. WPA2 is still found widely, but WPA3 is the current standard.",
   "WPA3-Personal replaces the pre-shared key handshake with Simultaneous Authentication of Equals (SAE), a password-authenticated key exchange based on the Dragonfly protocol. With SAE, both sides prove they know the password without exposing anything that can be captured and cracked offline; each guess requires a live interaction with the access point, which defeats offline dictionary attacks. SAE also provides forward secrecy, so if the password is later discovered, previously captured traffic still cannot be decrypted. WPA3 also mandates Protected Management Frames, which help prevent attackers from forging disconnect messages, and WPA3-Enterprise offers an optional 192-bit security mode for high-security environments.",
   "Enterprise mode uses 802.1X instead of a shared password, so each user or device authenticates individually and can be revoked individually. The wireless access point acts as the authenticator and passes the authentication to a RADIUS (Remote Authentication Dial-In User Service) server, which checks credentials against a directory and tells the access point whether to allow access, often assigning a VLAN as well. RADIUS also provides accounting logs of who connected and when. EAP is the framework carrying the authentication. EAP-TLS uses certificates on both sides and is the strongest option. PEAP and EAP-TTLS use a server certificate to build a TLS tunnel and then authenticate the user with a password inside it. EAP-FAST, developed by Cisco, uses protected access credentials instead of certificates.",
   "Other wireless concepts appear in the objectives and in scenarios. Captive portals present a web page (terms of use or login) before granting guest access; they are about access control, not encryption. Site surveys and heat maps show signal coverage, helping place access points so the signal covers the building without spilling far outside. Wireless attacks include rogue access points (unauthorized access points connected to the corporate network), evil twins (fake access points with the same network name to lure users), and deauthentication or jamming attacks that disrupt connections. Wireless intrusion prevention systems detect rogue and evil twin access points.",
   "Walk through securing an office network. Staff laptops use WPA3-Enterprise with EAP-TLS, receiving device certificates from the company CA through MDM; the RADIUS server places them in the corporate VLAN. Company phones use the same method. Guests use a separate WPA3-Personal network with SAE and a passphrase that changes monthly, plus a captive portal with acceptable use terms, isolated to internet access only. A site survey adjusts power levels so the signal does not reach far into the parking lot, and the wireless controller alerts on rogue access points.",
   "Common mistakes: thinking a captive portal encrypts traffic (it does not); assuming WPA3-Personal makes weak passwords safe (it stops offline cracking, but a guessable password can still be tried online, just much more slowly); confusing RADIUS (the authentication server) with EAP (the authentication framework); letting clients skip server certificate validation in PEAP, which lets evil twins capture credentials; and relying on hiding the network name or MAC filtering, which are easily bypassed.",
   "Exam clue words: 'resistant to offline dictionary attacks', 'replaces PSK' point to SAE and WPA3. 'Individual user credentials', 'centralized authentication' point to 802.1X with RADIUS (enterprise mode). 'Certificates on both client and server' is EAP-TLS. 'Tunnel with server certificate, then password' is PEAP or EAP-TTLS. 'Fake access point with the company SSID' is an evil twin. 'Unauthorized access point plugged into the network' is a rogue AP."
  ],
  "terms": [
   [
    "WPA3",
    "The current Wi-Fi security standard, using SAE for personal mode and stronger enterprise options."
   ],
   [
    "SAE",
    "Simultaneous Authentication of Equals, the WPA3 handshake that resists offline password cracking."
   ],
   [
    "Pre-shared key (PSK)",
    "A shared passphrase used in WPA2-Personal, vulnerable to offline cracking after handshake capture."
   ],
   [
    "RADIUS",
    "A centralized authentication, authorization and accounting protocol used for enterprise Wi-Fi and network access."
   ],
   [
    "EAP",
    "Extensible Authentication Protocol, a framework for authentication methods used with 802.1X."
   ],
   [
    "EAP-TLS",
    "An EAP method with certificate-based mutual authentication."
   ],
   [
    "Evil twin",
    "A malicious access point impersonating a legitimate network name to intercept users."
   ],
   [
    "Captive portal",
    "A web page that users must interact with before gaining network access."
   ]
  ],
  "example": "A penetration tester captures WPA2-Personal handshakes from a company's warehouse Wi-Fi and cracks the eight-character passphrase offline in under an hour. The company responds by moving staff devices to WPA3-Enterprise with EAP-TLS certificates issued through its MDM and RADIUS server, and by moving scanners that only support personal mode to a WPA3-Personal network with SAE and a long random passphrase on an isolated VLAN.",
  "tip": "SAE is WPA3's answer to offline cracking of pre-shared keys. For individual accountability, choose enterprise mode with 802.1X, RADIUS and ideally EAP-TLS.",
  "check": [
   [
    "Why is WPA2-Personal vulnerable to offline password cracking?",
    "An attacker can capture the four-way handshake and test passphrase guesses against it offline without contacting the network."
   ],
   [
    "How does SAE prevent offline dictionary attacks?",
    "It never exposes data that can be checked offline, so each password guess requires a live exchange with the access point."
   ],
   [
    "In enterprise Wi-Fi, what role does the RADIUS server play?",
    "It authenticates each user or device against a directory, authorizes access and records accounting data."
   ],
   [
    "Why must clients validate the server certificate when using PEAP?",
    "Otherwise an evil twin access point can pretend to be the network and capture user credentials."
   ]
  ]
 },
 {
  "t": "Asset management and disposal (sanitize, destroy, certify)",
  "body": [
   "Asset management means knowing what hardware, software and data the organization has, where it is, who owns it and what state it is in, from purchase to disposal. It underpins almost every other control: you cannot patch, monitor, back up or protect assets you do not know exist. Disposal is the last and often-forgotten stage, and it is where data breaches quietly happen, when old drives, phones and printers leave the building still full of sensitive data. Security+ tests the asset lifecycle and the precise meanings of sanitization, destruction and certification.",
   "The lifecycle starts with acquisition and procurement: buying from trusted suppliers, checking security requirements and recording the purchase. Next comes assignment and accounting: each asset gets an owner who is accountable for it, and it is classified by its importance and the sensitivity of the data it handles. Monitoring and asset tracking keep the inventory accurate through enumeration (discovering what is on the network, for example with scanning or endpoint agents) and inventory records that include location, owner, configuration and software. Changes, moves and repairs are recorded. Finally comes decommissioning and disposal.",
   "Sanitization removes data from storage media so it cannot be recovered, while allowing the media to be reused. Methods include overwriting (writing patterns over every sector, suitable for traditional hard disk drives), secure erase commands built into drives, and cryptographic erase, where data on an encrypted drive is made unreadable by destroying its encryption key. Degaussing uses a powerful magnetic field to erase magnetic media such as hard disks and tapes, which usually also makes the drive unusable. Solid-state drives (SSDs) and flash memory spread data across cells in ways that make simple overwriting unreliable, so manufacturer secure erase or cryptographic erase is preferred, or physical destruction for highly sensitive data.",
   "Destruction physically ensures media can never be read again. Methods include shredding (industrial shredders that cut drives into small pieces), pulverizing, drilling or crushing, and incineration for paper and some media. Destruction is chosen when media contained highly sensitive data, when it cannot be reliably sanitized, or when it will not be reused anyway. Paper records need destruction too: cross-cut shredding, pulping or burning.",
   "Certification provides proof. When a third-party vendor handles disposal, it should issue a certificate of destruction or sanitization listing each asset (for example, by serial number), the method used, the date and who performed it. This documentation supports audits and regulatory compliance and provides evidence if a breach is later alleged. Organizations should also verify vendors, for example by reviewing their processes, and track the chain of custody as assets leave. Data retention requirements matter here: some data must be kept for a legal minimum period and some must be deleted after a maximum period, and a legal hold overrides normal disposal when litigation is expected.",
   "Walk through a refresh project. A company replaces 500 laptops. Each is checked off against the inventory by serial number. Because all drives used full disk encryption, IT performs a cryptographic erase plus the manufacturer's secure erase, then sends the laptops to a certified reseller for reuse. Twenty drives from finance servers that held payment data are instead shredded on site by a disposal vendor, which provides a certificate of destruction listing every serial number. The inventory is updated to show each asset as disposed, with the certificate attached. Two laptops belonging to employees involved in a lawsuit are set aside under legal hold.",
   "Common mistakes: believing that deleting files or formatting a drive removes data (it usually only removes pointers, and data can be recovered with simple tools); overwriting SSDs as if they were hard disks; forgetting devices with hidden storage such as printers, copiers, network devices and phones; disposing of assets without updating the inventory; and accepting a vendor's word instead of a certificate. Another is losing track of assets during the lifecycle: laptops handed to departing staff, drives pulled for repair and sent to the manufacturer under warranty, or cloud storage and virtual machines that nobody decommissions. Many organizations keep failed drives rather than returning them for warranty replacement precisely so that data never leaves their control.",
   "Exam questions usually describe what will happen to the media next and how sensitive its data was. 'Reuse the drive' points to sanitization; 'most secure, drive will not be reused' points to physical destruction; 'proof for auditors' points to a certificate of destruction; 'magnetic field' is degaussing; 'destroy the encryption key' is cryptographic erase; 'discover all devices on the network' is enumeration."
  ],
  "terms": [
   [
    "Asset management",
    "Tracking hardware, software and data through their lifecycle with owners and inventory records."
   ],
   [
    "Enumeration",
    "Discovering and listing assets, for example through network scans or agents."
   ],
   [
    "Sanitization",
    "Removing data from media so it cannot be recovered, allowing reuse."
   ],
   [
    "Cryptographic erase",
    "Sanitizing an encrypted drive by securely destroying its encryption key."
   ],
   [
    "Degaussing",
    "Erasing magnetic media with a strong magnetic field."
   ],
   [
    "Destruction",
    "Physically destroying media by shredding, pulverizing or incineration."
   ],
   [
    "Certificate of destruction",
    "Documented proof from a disposal provider that specific assets were destroyed or sanitized."
   ]
  ],
  "example": "A hospital sells old multifunction copiers to a used-equipment dealer without wiping them. A journalist buys one and finds thousands of scanned patient records on its internal hard drive. The hospital faces regulatory penalties and adds copiers, printers and network devices to its asset inventory, requires drive sanitization or removal before any device leaves, and now accepts disposals only with a certificate listing each device's serial number.",
  "tip": "Sanitize when the media will be reused; destroy when it will not or the data is highly sensitive; certify to prove it. Formatting or deleting is never sanitization.",
  "check": [
   [
    "Why is overwriting less reliable for SSDs than for hard disks?",
    "SSDs spread writes across cells through wear leveling and keep spare areas, so overwriting may not reach all stored data."
   ],
   [
    "What does a certificate of destruction provide?",
    "Documented evidence of which assets were destroyed or sanitized, how, when and by whom, for audits and compliance."
   ],
   [
    "Why does cryptographic erase work on a fully encrypted drive?",
    "Without the key, the encrypted data is unreadable, so securely destroying the key effectively erases the data."
   ],
   [
    "What should happen to a device that would normally be disposed of but relates to pending litigation?",
    "It must be preserved under legal hold rather than sanitized or destroyed."
   ]
  ]
 },
 {
  "t": "Vulnerability scanning: credentialed, false positives, CVSS, CVE",
  "body": [
   "A vulnerability is a weakness that could be exploited: missing patches, insecure configurations, default passwords, outdated software. Vulnerability scanning uses automated tools to check systems for known weaknesses and report them, so they can be fixed before attackers find them. It is a core part of vulnerability management, the ongoing cycle of identifying, analyzing, prioritizing, remediating and verifying. Security+ expects you to understand how scans are run, how to read and prioritize results, and the standard names and scores used to describe vulnerabilities.",
   "Scans differ in how much access they have. A non-credentialed (unauthenticated) scan looks at a system from the network as an outsider would, seeing open ports, service banners and responses. It shows what an attacker without credentials could see, but it misses a lot, such as missing patches in installed software. A credentialed (authenticated) scan logs in to the system with an account, so it can inspect installed software versions, patch levels, registry settings and configuration files. Credentialed scans are far more accurate and find more real issues with fewer false positives. The scan account should have only the permissions needed and be protected carefully. Agent-based scanning installs a small agent on each host that reports continuously, useful for laptops that are rarely on the office network.",
   "Scans can also be internal (from inside the network) or external (from the internet, showing what outsiders see), and intrusive or non-intrusive depending on whether they attempt actions that could disrupt fragile systems. Application scanners and static and dynamic analysis tools test software, and package monitoring checks third-party libraries for known flaws. Scans should be scheduled regularly and after significant changes, with care taken around sensitive systems such as industrial controllers.",
   "Results must be validated. A false positive is a reported vulnerability that does not actually exist, for example flagging an old version number when the vendor backported the fix. False positives waste time and erode trust in the tool. A false negative is a real vulnerability the scan missed, which is more dangerous because nobody fixes it. Credentialed scans, updated plugins and manual verification reduce both. Scan tools are only as good as their vulnerability feeds, so keeping plugins and signatures updated before every scan is part of the process, not an afterthought. A true positive is a real issue correctly reported. Analysts confirm findings by checking versions, configurations or vendor advisories before assigning work.",
   "Common Vulnerabilities and Exposures (CVE) is a public list that gives each publicly known vulnerability a unique identifier, such as CVE-2024-12345, so everyone refers to the same issue. The Common Vulnerability Scoring System (CVSS) rates severity from 0.0 to 10.0 using metrics such as attack vector, complexity, privileges required, user interaction and impact on confidentiality, integrity and availability. Scores map to ratings: low, medium, high and critical (9.0 to 10.0). The National Vulnerability Database publishes CVSS scores for CVEs, and lists of known exploited vulnerabilities show which ones attackers are actively using.",
   "Prioritization uses more than the CVSS base score. Consider exposure (internet-facing or internal), asset value and data sensitivity, whether an exploit exists and is being used in the wild, available compensating controls, and the organization's risk tolerance. A 'high' vulnerability on an internet-facing payment server may deserve faster action than a 'critical' one on an isolated lab machine. After remediation, rescan to verify the fix, and document exceptions where risk is formally accepted. Tracking metrics such as the number of open critical findings and average time to remediate shows whether the program is improving. Here is a simplified line of scanner output an analyst might triage:",
   "```\nHost 10.20.5.14  CVE-2024-XXXXX  CVSS 9.8 Critical\nApache HTTP Server < patched version, remote code execution\nExposure: internet-facing  Exploit: public  Action: patch within 48h\n```",
   "Common mistakes: relying only on non-credentialed scans; treating every finding as real without validation; prioritizing purely by CVSS score; scanning but never verifying fixes; and confusing CVE (the identifier) with CVSS (the score). Exam clue words: 'logs in to check patch levels', 'most accurate' point to credentialed scans; 'outsider's view' is non-credentialed; 'reported but does not exist' is a false positive; 'exists but not reported' is a false negative; 'unique identifier' is CVE; 'severity score from 0 to 10' is CVSS. If asked what to do after applying a patch, the answer is rescan to confirm."
  ],
  "terms": [
   [
    "Vulnerability scan",
    "An automated check of systems for known weaknesses such as missing patches or misconfigurations."
   ],
   [
    "Credentialed scan",
    "A scan that logs in to systems for deeper, more accurate results."
   ],
   [
    "Non-credentialed scan",
    "A scan without login access, showing what an outsider can see."
   ],
   [
    "False positive",
    "A reported vulnerability that does not actually exist."
   ],
   [
    "False negative",
    "A real vulnerability that a scan fails to report."
   ],
   [
    "CVE",
    "Common Vulnerabilities and Exposures, unique public identifiers for known vulnerabilities."
   ],
   [
    "CVSS",
    "Common Vulnerability Scoring System, a 0.0 to 10.0 severity rating for vulnerabilities."
   ]
  ],
  "example": "A quarterly non-credentialed scan reports a server as clean, but a newly configured credentialed scan finds 37 missing patches, including a critical remote code execution flaw in a library the outside scan could not see. The team patches the critical items first on internet-facing systems, marks two findings as false positives after confirming vendor backports, and rescans to verify.",
  "tip": "Credentialed scans are more accurate and produce fewer false positives. CVE names the vulnerability; CVSS scores its severity; context decides priority.",
  "check": [
   [
    "Why does a credentialed scan find more vulnerabilities than a non-credentialed scan?",
    "It can inspect installed software, patch levels and configuration from inside the system, not just what is visible over the network."
   ],
   [
    "Which is more dangerous, a false positive or a false negative, and why?",
    "A false negative, because a real vulnerability goes unnoticed and unfixed."
   ],
   [
    "Why shouldn't CVSS base score alone decide remediation order?",
    "Priority also depends on exposure, asset value, active exploitation and compensating controls."
   ],
   [
    "What should happen after a vulnerability is remediated?",
    "Rescan or otherwise verify that the fix worked, then close the finding."
   ]
  ]
 },
 {
  "t": "Pen testing and recon: passive vs active",
  "body": [
   "A penetration test (pen test) is an authorized, simulated attack on systems to find and demonstrate exploitable weaknesses before real attackers do. Unlike a vulnerability scan, which lists possible weaknesses, a pen test tries to exploit them and chain them together to show real impact, such as reaching sensitive data. Security+ covers the types of tests, the rules that make them legal and safe, and the difference between passive and active reconnaissance. The single most important point is authorization: without written permission, the same activities are illegal attacks.",
   "Before testing begins, the scope and rules of engagement are agreed in writing. They define which systems, networks and applications are in scope and which are off limits, the testing window, permitted techniques (is social engineering or denial of service allowed?), how to handle sensitive data found, emergency contacts, and what happens if testers find evidence of a real attacker. Legal authorization, often a signed permission letter, protects both the tester and the organization.",
   "Tests vary by how much the testers know. In a known-environment test (formerly called white box), testers get full information such as network diagrams, source code and credentials, allowing thorough coverage efficiently. In an unknown-environment test (black box), testers start with little or no information, simulating an outside attacker; it is realistic but may miss areas. A partially known environment test (gray box) sits between them, often simulating an insider or a user with an account. Tests can also be physical, offensive (red team), defensive (blue team), or integrated, where attackers and defenders collaborate to improve detection (purple team).",
   "Reconnaissance is the information-gathering phase. Passive reconnaissance collects information without directly interacting with the target's systems, so the target cannot detect it. Examples include open-source intelligence (OSINT) such as the company website, job postings that reveal technologies used, social media, public DNS and domain registration records, certificate transparency logs and search engine results. Active reconnaissance interacts directly with target systems, for example port scanning, service and version detection, vulnerability scanning and banner grabbing. It gives more precise information but can be logged and detected by the target. Passive typically comes first, then active once the scope allows it.",
   "After reconnaissance, a typical test proceeds through scanning and enumeration, gaining initial access by exploiting a weakness, then post-exploitation activities such as privilege escalation, lateral movement (pivoting from one compromised system to others), and persistence, where authorized. Testers document everything. The engagement ends with cleanup, removing any tools, accounts or changes made, and a report that explains findings, evidence, business impact, risk ratings and recommended fixes, often with an executive summary for leadership.",
   "Walk through a small engagement. The scope allows external testing of a company's public web applications and email phishing of the IT department. Testers begin passively, finding employee names and the email address format on the company website and professional networking sites, and discovering subdomains in certificate transparency logs. Actively, they then scan the in-scope IP ranges, find an outdated content management system, and exploit a known vulnerability to gain a foothold, stopping to inform the contact when they reach a server holding customer data, as the rules of engagement require. The report ranks this as critical and recommends patching, a WAF rule and network segmentation.",
   "Common mistakes: calling port scanning passive (it touches the target, so it is active); assuming a pen test and a vulnerability scan are the same; testing outside the agreed scope, which can be illegal and disruptive; and forgetting cleanup. Testers also have to be careful with production systems; exploits can crash services, so fragile systems may be tested in maintenance windows or excluded. Bug bounty programs are a related concept: organizations invite outside researchers to report vulnerabilities for rewards under published rules, which provides continuous testing from many perspectives.",
   "Exam clue words: 'without interacting with the target', 'OSINT', 'public records', 'social media' point to passive reconnaissance. 'Port scan', 'banner grab', 'ping sweep' point to active reconnaissance. 'Full knowledge of the environment' is known environment; 'no prior knowledge' is unknown environment; 'some knowledge' is partially known. 'Defines what may be tested and how' is rules of engagement. 'Moving from one compromised host to another' is pivoting or lateral movement."
  ],
  "terms": [
   [
    "Penetration test",
    "An authorized simulated attack that exploits weaknesses to show real-world impact."
   ],
   [
    "Rules of engagement",
    "The written agreement defining scope, methods, timing and limits of a test."
   ],
   [
    "Known environment",
    "A test where testers receive full information about the target; formerly white box."
   ],
   [
    "Unknown environment",
    "A test where testers start with little or no information; formerly black box."
   ],
   [
    "Passive reconnaissance",
    "Gathering information without directly interacting with target systems, such as OSINT."
   ],
   [
    "Active reconnaissance",
    "Gathering information by directly probing target systems, such as port scanning."
   ],
   [
    "Pivoting",
    "Using a compromised system as a stepping stone to reach other systems."
   ],
   [
    "OSINT",
    "Open-source intelligence gathered from publicly available sources."
   ]
  ],
  "example": "Before an external test, a tester reviews the target company's job postings, which mention a specific VPN product and email platform, and searches certificate transparency logs to list its subdomains, all without sending a single packet to the company. Only after the rules of engagement start date does she scan the listed IP ranges, and she stops immediately when a scan reveals systems belonging to a hosting neighbor that are outside the agreed scope.",
  "tip": "Passive recon never touches the target (OSINT, public records); active recon does (scans, banner grabs). No written authorization means it is not a pen test, it is an attack.",
  "check": [
   [
    "Is reviewing a company's DNS records and job postings passive or active reconnaissance?",
    "Passive, because it uses public information without interacting with the company's systems."
   ],
   [
    "What does a pen test provide that a vulnerability scan does not?",
    "Proof of exploitability and impact, including how weaknesses can be chained together."
   ],
   [
    "Why is a partially known environment test often used?",
    "It balances realism with efficiency, often simulating an insider or a user with some knowledge or access."
   ],
   [
    "What must be in place before any testing starts?",
    "Written authorization and agreed rules of engagement defining scope, methods and limits."
   ]
  ]
 },
 {
  "t": "Logs, SIEM correlation, alerting, SCAP, NetFlow",
  "body": [
   "Logs are the records systems keep of what happened: logins, file access, configuration changes, network connections, errors. They are the raw material for detecting attacks, investigating incidents and proving compliance. On their own, logs are scattered across hundreds of systems in different formats. Security operations centralizes and analyzes them, often in a security operations center (SOC) staffed around the clock, and Security+ expects you to know the tools and data sources involved: security information and event management (SIEM), correlation and alerting, the Security Content Automation Protocol (SCAP) and NetFlow.",
   "Log sources include operating systems (Windows event logs, Linux syslog and auth logs), applications and web servers, firewalls, IDS and IPS, endpoint agents, authentication systems, DNS servers, cloud platforms and email gateways. Most network devices send logs using the syslog protocol. For logs to be useful they must be collected reliably, stored securely (so attackers cannot alter them), retained for the required period, and time-synchronized with the Network Time Protocol (NTP) so events from different systems can be put in the right order.",
   "A SIEM collects logs from many sources (aggregation), parses them into a consistent format (normalization), and stores them for searching and reporting. Its key feature is correlation: linking related events across sources to reveal patterns no single log shows. For example, five failed VPN logins, then a successful one from a new country, then a large download from the file server by the same account within twenty minutes, together indicate a probable account compromise. Correlation rules and analytics generate alerts; dashboards show trends; and reports support compliance. SIEMs also support threat hunting and investigations by letting analysts search across all data.",
   "Alerting must be tuned. If rules are too sensitive, analysts drown in false positives and start ignoring alerts (alert fatigue); too loose, and real attacks pass unnoticed. Good practice includes setting thresholds that fit the environment, assigning severity, enriching alerts with context such as asset owner and threat intelligence, suppressing known benign activity, and routing alerts to the right responders with playbooks. Response actions may include quarantining a host or disabling an account, sometimes automated through security orchestration, automation and response (SOAR).",
   "SCAP, the Security Content Automation Protocol, is a set of standards maintained by NIST for expressing and automating security checks in a common, machine-readable way. It includes formats for describing configuration checklists and benchmarks, vulnerability identifiers (CVE), platform names and severity scores (CVSS). SCAP-compatible scanners can read a benchmark and automatically check whether systems comply with it, producing consistent results across tools. That matters when an auditor asks you to prove that every server meets the hardening standard: instead of manual spot checks, you run an automated SCAP scan and produce a report showing which settings pass and fail on each system. Benchmarks such as those from CIS are often available in SCAP format.",
   "NetFlow, originally from Cisco, and similar flow formats such as IPFIX and sFlow record metadata about network conversations rather than full packet contents: source and destination IP addresses and ports, protocol, start time, duration, and the number of packets and bytes. Flow data is compact enough to keep for long periods, so it shows who talked to whom and how much, making it excellent for spotting unusual traffic volumes, data exfiltration, beaconing to command-and-control servers and scanning. Its limitation is that it does not show the content; for that you need full packet capture, which is far more storage-hungry and is usually kept only briefly or for specific segments. A flow record might look like this:",
   "```\n2025-03-02 02:14:07  10.20.5.14:51522 -> 203.0.113.45:443  TCP  pkts 91200  bytes 4.3G  dur 3h12m\n```",
   "Common mistakes: collecting logs but never reviewing them; storing logs only on the systems that generate them (attackers delete them); unsynchronized clocks that make timelines impossible; confusing NetFlow (metadata) with packet capture (full content); and treating SCAP as a scanner rather than a set of standards. Exam clue words: 'correlate events from many sources', 'central log analysis' point to SIEM; 'too many alerts, analysts ignore them' points to tuning and alert fatigue; 'automated configuration compliance checking with standard formats' points to SCAP; 'who talked to whom and how much, without content' points to NetFlow; 'central collection of device logs' points to syslog."
  ],
  "terms": [
   [
    "SIEM",
    "Security information and event management, which aggregates, normalizes, correlates and alerts on log data."
   ],
   [
    "Correlation",
    "Linking related events from different sources to identify patterns such as an attack."
   ],
   [
    "Log aggregation",
    "Collecting logs from many systems into a central location."
   ],
   [
    "Alert fatigue",
    "Analysts becoming desensitized to alerts because of excessive false positives."
   ],
   [
    "SCAP",
    "Security Content Automation Protocol, NIST standards for automated, consistent security checks."
   ],
   [
    "NetFlow",
    "A protocol that records metadata about network flows, such as addresses, ports and byte counts."
   ],
   [
    "Syslog",
    "A standard protocol for sending log messages to a central collector."
   ]
  ],
  "example": "NetFlow data shows a database server sending 4 GB to an unfamiliar external IP address at 2 a.m., which is unusual. The SIEM correlates this with a new administrator login to that server an hour earlier from a workstation that had triggered a malware alert. The combined alert gives analysts enough context to isolate both machines within minutes and begin an investigation.",
  "tip": "SIEM correlates logs; NetFlow shows traffic metadata without content; SCAP standardizes automated compliance checks. Synchronized time is essential for all of them.",
  "check": [
   [
    "What can NetFlow show that makes it useful for detecting exfiltration, and what can't it show?",
    "It shows volumes and destinations of traffic over time, but not the content of the packets."
   ],
   [
    "Why is time synchronization important for a SIEM?",
    "Correlation and investigation timelines depend on accurate timestamps across all log sources."
   ],
   [
    "What problem does SIEM correlation solve?",
    "It links events across many systems to reveal attacks that no single log would show."
   ],
   [
    "What is SCAP used for?",
    "Expressing security checks in standard formats so tools can automatically and consistently assess configuration compliance and vulnerabilities."
   ]
  ]
 },
 {
  "t": "Email security: SPF, DKIM, DMARC",
  "body": [
   "Email was designed without any way to prove who sent a message. The From address that users see can be set to anything, which is why phishing and business email compromise so often impersonate trusted domains. Three complementary DNS-based standards fix much of this problem: Sender Policy Framework (SPF), DomainKeys Identified Mail (DKIM) and Domain-based Message Authentication, Reporting and Conformance (DMARC). Security+ expects you to know what each one checks, how they work together, and what they do not protect against.",
   "SPF lets a domain owner publish a list of mail servers allowed to send email for that domain, as a TXT record in DNS. When a receiving server gets a message, it checks the sending server's IP address against the SPF record of the domain used in the message's envelope sender. If the IP is not listed, SPF fails. SPF records end with a qualifier such as '-all' (hard fail: reject mail from anything not listed) or '~all' (soft fail: accept but mark as suspicious). SPF's limitations: it checks the envelope sender, not necessarily the visible From address, and it often breaks when mail is forwarded.",
   "DKIM adds a digital signature to outgoing email. The sending server signs selected headers and the body with a private key, and publishes the matching public key in DNS under a selector name. The receiving server retrieves the public key and verifies the signature. A valid signature proves the message was sent by a server authorized by that domain and that the signed parts were not altered in transit. DKIM survives most forwarding because the signature travels with the message, but it does not by itself tell receivers what to do when a signature is missing or invalid.",
   "DMARC ties the two together and adds policy and reporting. A DMARC record tells receivers to check that the domain in the visible From address aligns with the domain validated by SPF or DKIM, and what to do if neither passes: p=none (monitor only), p=quarantine (send to spam), or p=reject (refuse the message). DMARC also asks receivers to send aggregate reports back to the domain owner, showing who is sending mail using the domain, which helps find both legitimate services that need adding and attackers spoofing the domain. Organizations usually start at p=none, fix their legitimate senders, then move to quarantine and reject. Here are simplified examples of the three DNS records for a domain:",
   "```\nexample.com.                 TXT \"v=spf1 ip4:203.0.113.10 include:mail.provider.example -all\"\nsel1._domainkey.example.com. TXT \"v=DKIM1; k=rsa; p=<public key>\"\n_dmarc.example.com.          TXT \"v=DMARC1; p=reject; rua=mailto:dmarc-reports@example.com\"\n```",
   "Walk through what a receiving server does with one incoming message claiming to be from billing@example.com. It looks up example.com's SPF record and checks whether the connecting server's IP is listed. It finds the DKIM-Signature header, fetches the public key for the named selector from DNS, and verifies the signature. It then fetches the DMARC record and checks alignment: does the domain in the visible From address match the domain that passed SPF or DKIM? If at least one passes and aligns, the message passes DMARC. If neither does, the receiver applies the published policy, rejecting the message when the policy is p=reject, and later includes the result in the aggregate report it sends to the domain owner.",
   "Other email security controls work alongside these. Secure email gateways filter spam, malware and phishing; attachment sandboxing opens suspicious files safely; URL rewriting checks links when clicked; TLS protects mail in transit between servers; and S/MIME or PGP provide end-to-end encryption and signatures for individual messages. Labeling external email and training users helps against lookalike domains, which SPF, DKIM and DMARC cannot stop, because an attacker can set all three up correctly for their own typosquatted domain.",
   "Common mistakes: thinking SPF, DKIM and DMARC encrypt email (they authenticate the sending domain; they do not provide confidentiality); believing they stop all phishing (lookalike domains and compromised legitimate accounts pass); confusing which one signs (DKIM) and which one lists servers (SPF); and leaving DMARC at p=none forever, which only monitors. Exam clue words: 'list of authorized sending IP addresses' is SPF; 'digital signature on the message, public key in DNS' is DKIM; 'policy telling receivers to reject or quarantine, plus reports' is DMARC; 'attackers spoofing our exact domain' points to implementing all three with DMARC at reject."
  ],
  "terms": [
   [
    "SPF",
    "Sender Policy Framework, a DNS record listing servers authorized to send email for a domain."
   ],
   [
    "DKIM",
    "DomainKeys Identified Mail, which signs email with a private key and publishes the public key in DNS."
   ],
   [
    "DMARC",
    "A DNS policy that checks SPF/DKIM alignment with the From domain, sets handling and requests reports."
   ],
   [
    "Alignment",
    "The DMARC requirement that the visible From domain matches the domain authenticated by SPF or DKIM."
   ],
   [
    "DMARC policy",
    "The action receivers take on failing mail: none, quarantine or reject."
   ],
   [
    "Secure email gateway",
    "A system that filters inbound and outbound email for spam, malware and phishing."
   ],
   [
    "S/MIME",
    "A standard for signing and encrypting individual email messages with certificates."
   ]
  ],
  "example": "A company notices customers receiving invoices that appear to come from its exact domain. It publishes an SPF record listing its mail servers and cloud email provider, enables DKIM signing, and sets DMARC to p=none with reporting. The reports reveal a forgotten marketing service that also sends mail for the domain; after adding it to SPF and enabling its DKIM, the company moves DMARC to p=reject, and the spoofed invoices stop reaching customers' inboxes.",
  "tip": "SPF lists who may send, DKIM signs what was sent, DMARC decides what to do when they fail and reports back. None of them encrypt email or stop lookalike domains.",
  "check": [
   [
    "What does SPF check?",
    "Whether the sending server's IP address is authorized in the SPF record of the sender's domain."
   ],
   [
    "Why does DKIM survive email forwarding better than SPF?",
    "The signature travels inside the message, so it still verifies even when a different server relays it."
   ],
   [
    "What does a DMARC policy of p=reject tell receiving servers?",
    "To refuse messages that fail DMARC authentication and alignment for that domain."
   ],
   [
    "Why can't SPF, DKIM and DMARC stop phishing from 'examp1e.com' pretending to be 'example.com'?",
    "The attacker controls the lookalike domain and can configure valid records for it; these standards only protect the exact domain."
   ]
  ]
 },
 {
  "t": "EDR/XDR, DLP, UEBA",
  "body": [
   "Traditional antivirus compares files against signatures of known malware. Modern attacks use fileless techniques, legitimate admin tools and stolen credentials that signatures cannot catch. The newer tools on the Security+ objectives watch behavior instead: what processes do, where data goes and how users normally act. Endpoint detection and response (EDR), extended detection and response (XDR), data loss prevention (DLP) and user and entity behavior analytics (UEBA) each focus on a different question, and exam questions test whether you can match a scenario to the right one.",
   "EDR runs an agent on each endpoint, such as laptops, desktops and servers, that continuously records activity: processes started, command lines, file changes, registry edits, network connections and memory operations. It sends this telemetry to a central console, where detection rules and behavioral analytics look for malicious patterns, for example a word processor launching PowerShell that downloads code. EDR also provides response: isolating a host from the network, killing processes, deleting files, collecting forensic data and rolling back changes. Analysts use it to investigate incidents and hunt for threats across all endpoints at once.",
   "XDR extends the same idea beyond endpoints. It collects and correlates telemetry from endpoints, network traffic, email, identity systems and cloud workloads in one platform, so a single incident view might show the phishing email, the user's click, the malware on the laptop and the attacker's sign-in to a cloud app. The aim is faster, more accurate detection with fewer disconnected alerts. XDR overlaps with SIEM, but it is typically more focused on detection and response with built-in analytics, while a SIEM collects a broader range of logs for search, compliance and custom correlation.",
   "DLP focuses on data rather than attackers. It identifies sensitive information, using patterns such as card number formats, keywords, document fingerprints and classification labels, and enforces policies on where that data may go. Endpoint DLP controls copying to USB, printing and uploads; network DLP inspects outbound traffic such as email and web uploads; cloud DLP controls data in SaaS and cloud storage. Actions include block, encrypt, quarantine, alert, or prompt the user for justification. DLP catches both malicious exfiltration and well-meaning mistakes, such as emailing a customer list to a personal account.",
   "UEBA builds baselines of normal behavior for users and entities (such as hosts, service accounts and applications) and flags significant deviations using statistics and machine learning. Examples: an accountant who normally downloads a few files suddenly downloads thousands; a service account that never logs in interactively does so at 3 a.m.; a user who always works from one city logs in from two continents in an hour. UEBA is especially good at detecting compromised accounts and insider threats, which look like legitimate users to rule-based tools. It is often built into SIEM and XDR platforms and assigns risk scores that rise as unusual events accumulate.",
   "Walk through how the tools work together in one incident. UEBA raises a user's risk score after an unusual login time and location. EDR on that user's laptop detects a script collecting documents into an archive. DLP blocks the archive's upload to a personal cloud storage site because it contains files labeled confidential. XDR correlates all three into a single incident, and the analyst uses EDR to isolate the laptop and the identity system to disable the account. Each tool saw part of the story; together they stopped the exfiltration.",
   "Common mistakes: thinking EDR is just antivirus (its value is visibility and response, not only blocking); confusing XDR with SIEM (they overlap, but XDR is a detection and response platform across specific integrated sources, while SIEM is broader log management and correlation); assuming DLP stops a determined attacker who encrypts data first; and expecting UEBA to work on day one, when it needs time to learn baselines and tuning to limit false positives.",
   "Exam clue words: 'agent records process activity, isolates infected host' is EDR; 'correlates endpoint, network, email and cloud telemetry' is XDR; 'prevent sensitive data leaving', 'block USB copy of card numbers' is DLP; 'baseline of normal user behavior', 'insider threat', 'compromised account acting unusually' is UEBA. When asked for the best tool to detect fileless malware on laptops, choose EDR."
  ],
  "terms": [
   [
    "EDR",
    "Endpoint detection and response, agents that record endpoint activity and enable detection, investigation and response."
   ],
   [
    "XDR",
    "Extended detection and response, correlating telemetry across endpoints, network, email, identity and cloud."
   ],
   [
    "DLP",
    "Data loss prevention, tools that identify sensitive data and control where it can go."
   ],
   [
    "UEBA",
    "User and entity behavior analytics, which baselines normal behavior and flags deviations."
   ],
   [
    "Telemetry",
    "Detailed activity data collected from systems for analysis."
   ],
   [
    "Host isolation",
    "Cutting an endpoint off from the network, except the security console, to contain a threat."
   ],
   [
    "Behavioral baseline",
    "A model of normal activity against which anomalies are measured."
   ]
  ],
  "example": "A developer's account, normally active 9 to 6 in one office, starts cloning dozens of code repositories at 1 a.m. from an unfamiliar IP address. UEBA raises a high risk score, and XDR links it to a phishing email the developer clicked two days earlier and a new browser extension EDR flagged on his laptop. The SOC revokes his sessions, resets his credentials and MFA, and isolates the laptop while it investigates.",
  "tip": "EDR watches endpoints and responds; XDR correlates across many sources; DLP watches data leaving; UEBA watches users and entities for abnormal behavior.",
  "check": [
   [
    "Which tool would best detect a legitimate employee account suddenly downloading unusual volumes of data?",
    "UEBA, which flags deviations from the account's normal behavioral baseline."
   ],
   [
    "What can EDR do that traditional antivirus typically cannot?",
    "Record detailed endpoint activity for investigation and respond by isolating hosts, killing processes and rolling back changes, including against fileless attacks."
   ],
   [
    "How does XDR differ from EDR?",
    "XDR correlates telemetry from endpoints plus network, email, identity and cloud sources, not just endpoints."
   ],
   [
    "An employee tries to upload a file full of card numbers to personal cloud storage. Which tool should stop this?",
    "DLP, which recognizes sensitive data and blocks it from leaving approved locations."
   ]
  ]
 },
 {
  "t": "IAM: provisioning, SSO, SAML, OAuth, OpenID Connect, LDAP",
  "body": [
   "Identity and access management (IAM) covers how an organization creates digital identities, proves who people are, decides what they can access, and removes access when it is no longer needed. It is central to modern security because identity has become the main perimeter: with cloud services and remote work, a stolen login is often more valuable to an attacker than a network foothold. Security+ tests the identity lifecycle and a group of protocols with easily confused names: SSO, SAML, OAuth, OpenID Connect and LDAP.",
   "The identity lifecycle starts with provisioning: creating accounts and granting access when someone joins or changes role, ideally automatically from the HR system and based on role so access is consistent. Identity proofing verifies that the person is who they claim to be before an account is issued. Ongoing management includes password resets, role changes and periodic access reviews. Deprovisioning removes or disables access promptly when someone leaves or no longer needs it; delayed deprovisioning leaves orphaned accounts that attackers and disgruntled former staff can use. Permission assignments should follow least privilege.",
   "Single sign-on (SSO) lets a user authenticate once to an identity provider (IdP) and then access many applications without logging in again to each. It improves user experience, reduces password reuse and lets security teams enforce MFA and policies in one place, and disable access everywhere at once. The trade-off is concentration: the IdP becomes a critical, high-value system, so it needs strong protection and high availability. Federation extends trust between different organizations or domains, so users from one can access resources in another using their home credentials.",
   "SAML (Security Assertion Markup Language) is an XML-based standard for exchanging authentication and authorization data between an identity provider and a service provider (the application). When a user tries to open a SaaS application, the application redirects them to the IdP; the IdP authenticates them and sends back a digitally signed SAML assertion stating who they are and possibly their attributes, and the application grants access. SAML is widely used for enterprise web SSO. OAuth 2.0 is an authorization framework, not an authentication protocol: it lets a user grant an application limited access to their resources on another service without sharing their password, using access tokens with defined scopes. When you allow a calendar app to read your email contacts, that is OAuth. OpenID Connect (OIDC) is an authentication layer built on top of OAuth 2.0; it adds an ID token, usually a JSON Web Token (JWT), that tells the application who the user is. 'Sign in with' buttons on consumer sites generally use OIDC.",
   "LDAP (Lightweight Directory Access Protocol) is used to query and modify directory services, such as Microsoft Active Directory, that store information about users, groups and devices in a hierarchical structure. Applications use LDAP to look up users and check group memberships, and to authenticate through binds. Plain LDAP on port 389 can expose credentials, so LDAPS on port 636 or StartTLS should be used. Kerberos, the ticket-based protocol used by Active Directory for authentication within a Windows domain, is a related concept often paired with LDAP.",
   "Walk through a login. An employee opens the company's cloud HR application. The application (service provider) redirects her to the company IdP. The IdP checks her password and MFA, confirms her account is active in the directory via LDAP, and returns a signed SAML assertion. The HR app trusts the assertion and logs her in. Later, she connects a mobile expense app that needs to read receipts from her cloud storage; the storage service uses OAuth to issue the expense app a token limited to reading receipts, and the expense app uses OIDC to know which user she is. When she leaves the company, disabling her one identity in the IdP removes access to all of these apps.",
   "Common mistakes: calling OAuth an authentication protocol (it is for authorization; OIDC adds authentication); confusing SAML (XML assertions, enterprise SSO) with OIDC (JSON tokens, built on OAuth, common in web and mobile apps); assuming SSO reduces security (it usually improves it when the IdP is protected with MFA); and forgetting that LDAP without TLS sends data in cleartext. Exam clue words: 'XML assertion from identity provider to service provider' is SAML; 'grant an app limited access without sharing password', 'tokens with scopes' is OAuth; 'authentication layer on OAuth', 'ID token' is OIDC; 'query a directory for users and groups' is LDAP; 'log in once, access many apps' is SSO; 'trust across organizations' is federation; 'remove access when an employee leaves' is deprovisioning."
  ],
  "terms": [
   [
    "Provisioning",
    "Creating accounts and granting access when a user joins or changes role."
   ],
   [
    "Deprovisioning",
    "Removing or disabling access when it is no longer needed."
   ],
   [
    "Single sign-on (SSO)",
    "Authenticating once to access multiple applications."
   ],
   [
    "Identity provider (IdP)",
    "The system that authenticates users and issues assertions or tokens to applications."
   ],
   [
    "SAML",
    "An XML-based standard for sending signed authentication assertions from an IdP to a service provider."
   ],
   [
    "OAuth 2.0",
    "An authorization framework that grants applications limited access to resources using tokens."
   ],
   [
    "OpenID Connect",
    "An authentication layer on OAuth 2.0 that provides an ID token identifying the user."
   ],
   [
    "LDAP",
    "A protocol for querying and modifying directory services such as Active Directory."
   ]
  ],
  "example": "A company discovers that a contractor who left three months ago can still log into four SaaS tools, because each had a separate local account that was never removed. It moves all four applications behind its identity provider using SAML SSO, links account creation and removal to the HR system, and requires MFA at the IdP. Now, when a person leaves, disabling one identity immediately removes access to every connected application.",
  "tip": "OAuth is authorization (what an app may access); OpenID Connect adds authentication (who the user is); SAML is XML-based SSO common in enterprises; LDAP queries directories.",
  "check": [
   [
    "Why is OAuth alone not considered an authentication protocol?",
    "It grants access tokens for resources but does not by itself tell the application who the user is; OpenID Connect adds that."
   ],
   [
    "What is the main security benefit of SSO, and its main risk?",
    "Central control, including MFA and one-step access removal; the risk is that the identity provider becomes a single high-value target."
   ],
   [
    "In a SAML exchange, what does the identity provider send to the service provider?",
    "A digitally signed assertion stating the user's identity and possibly attributes."
   ],
   [
    "Why should LDAP traffic use LDAPS or StartTLS?",
    "Plain LDAP can send credentials and directory data in cleartext."
   ]
  ]
 },
 {
  "t": "MFA factors, PAM, just-in-time access",
  "body": [
   "Passwords alone are easy to steal, guess or reuse. Multifactor authentication (MFA) requires two or more different types of evidence before granting access, so a stolen password is not enough. Privileged access management (PAM) adds extra protection to the most powerful accounts, such as domain administrators, root and cloud administrators, which attackers target because they unlock everything. Just-in-time (JIT) access reduces the time those privileges exist at all. Together they are among the most effective controls against account takeover and ransomware, and Security+ tests the details of each.",
   "Authentication factors fall into categories. Something you know: a password, PIN or security question answer. Something you have: a smartphone authenticator app, hardware security key, smart card or a phone receiving a code. Something you are: biometrics such as fingerprint, face or iris. Somewhere you are: location, based on GPS, IP address or network, which is usually used as an additional condition rather than a standalone factor. True MFA combines different categories. A password plus a PIN is two things you know, so it is not multifactor; a password plus a code from a phone app is.",
   "Not all second factors are equally strong. SMS codes are better than nothing but can be intercepted through SIM swapping or phishing. Time-based one-time passwords (TOTP) from authenticator apps are stronger. Push notifications are convenient, but attackers exploit MFA fatigue by sending repeated prompts until a tired user approves one, which is why number matching (typing a number shown on the login screen into the app) is now common. The strongest options are phishing-resistant methods based on public key cryptography, such as FIDO2 security keys and passkeys, which bind authentication to the real website so a fake login page cannot relay it. Biometrics have their own measures: the false acceptance rate (FAR, wrongly accepting an impostor), false rejection rate (FRR, wrongly rejecting the real user) and the crossover error rate (CER) where the two are equal; a lower CER means a more accurate system.",
   "Privileged access management controls, monitors and audits the use of privileged accounts. Key features include a password vault that stores privileged credentials, rotates them automatically (often after each use) so no human knows them long-term, and checks them out only to approved users; session brokering and recording, so administrators connect through the PAM system and every action is logged and can be replayed; approval workflows; and separation between normal user accounts and admin accounts. PAM also covers service accounts and secrets used by applications, which are often over-privileged and rarely rotated.",
   "Just-in-time access grants privileges only when needed and for a limited time, instead of leaving them permanently assigned (standing privileges). An administrator requests elevated rights for a specific task, the request is approved automatically or by a manager, the rights are granted for perhaps an hour, and then they are removed automatically. Ephemeral credentials, which exist only for a single session or task, follow the same idea. If an attacker compromises an admin's account outside that window, there are no standing privileges to abuse. JIT supports the principle of least privilege and the zero trust idea of minimizing implicit trust.",
   "Walk through a privileged task. A database administrator needs to apply an emergency patch at 22:00. She signs in to the PAM portal with her normal account, a password and a FIDO2 security key. She requests production database admin access for two hours with the change ticket number. The request is auto-approved because the ticket is valid. PAM opens a recorded session to the server using a vaulted credential she never sees. At midnight access expires, the vault rotates the credential, and the recording is available for review. If her laptop had been compromised the day before, the attacker would have found no standing admin rights and no stored admin password.",
   "Common mistakes: counting two factors from the same category as MFA; treating all MFA methods as equally strong; assuming MFA cannot be bypassed (phishing proxies and fatigue attacks target weaker methods); leaving privileged accounts with permanent rights and static passwords; and forgetting service accounts. Another misconception is that PAM is only a password vault; its session monitoring and JIT features are just as important.",
   "Exam clue words: 'fingerprint' is something you are; 'smart card' or 'hardware token' is something you have; 'PIN' is something you know; 'GPS location' is somewhere you are; 'user approved a flood of push prompts' is MFA fatigue; 'phishing-resistant' points to FIDO2 or passkeys; 'vault, rotate and record admin sessions' is PAM; 'temporary elevation that expires automatically' is just-in-time access; 'no permanent admin rights' means removing standing privileges."
  ],
  "terms": [
   [
    "Multifactor authentication (MFA)",
    "Authentication requiring two or more factors from different categories."
   ],
   [
    "Something you have",
    "A possession factor such as a phone app, hardware key or smart card."
   ],
   [
    "Something you are",
    "A biometric factor such as fingerprint, face or iris."
   ],
   [
    "MFA fatigue",
    "An attack that floods a user with push prompts until they approve one."
   ],
   [
    "FIDO2/passkeys",
    "Phishing-resistant authentication using public key cryptography bound to the real site."
   ],
   [
    "Privileged access management (PAM)",
    "Tools and processes that vault, control, monitor and audit privileged accounts."
   ],
   [
    "Just-in-time access",
    "Granting elevated privileges only when needed and removing them automatically after a set time."
   ],
   [
    "Crossover error rate (CER)",
    "The point where a biometric system's false acceptance and false rejection rates are equal."
   ]
  ],
  "example": "An attacker phishes a help desk technician's password and then sends dozens of MFA push prompts late at night until the technician approves one to make them stop. Because the organization uses JIT access, the technician's account has no standing admin rights, so the attacker can only reach email. The company switches to number-matching push for all staff and FIDO2 security keys for administrators, and blocks the attacker's session.",
  "tip": "MFA means different categories: password plus PIN is still single-factor. Phishing-resistant MFA (FIDO2, passkeys) beats SMS and simple push, and JIT removes standing privileges attackers could steal.",
  "check": [
   [
    "A system requires a password and a PIN. Is this MFA? Why?",
    "No; both are something you know, so it is single-factor authentication with two items."
   ],
   [
    "How does number matching help against MFA fatigue attacks?",
    "The user must type a number shown on the real login screen, so they cannot approve a prompt they did not initiate by simply tapping approve."
   ],
   [
    "What does a PAM vault do with privileged passwords?",
    "Stores them securely, checks them out to approved users and rotates them automatically, often after each use."
   ],
   [
    "How does just-in-time access reduce risk?",
    "Privileges exist only briefly for approved tasks, so a compromised account usually has no standing admin rights to abuse."
   ]
  ]
 },
 {
  "t": "IR process: preparation, detection, analysis, containment, eradication, recovery, lessons learned",
  "body": [
   "Incident response (IR) is the organized way an organization handles security incidents, from a single infected laptop to a major ransomware attack. A defined process means people know their roles, act quickly, preserve evidence and avoid making things worse under pressure. SY0-701 lists the stages as preparation, detection, analysis, containment, eradication, recovery and lessons learned. Exam questions often describe an action and ask which phase it belongs to, or ask what should happen next, so learn both the order and what belongs in each phase.",
   "Preparation happens before any incident. It includes writing an incident response plan and playbooks for common scenarios, forming the incident response team with clear roles (incident lead, technical analysts, communications, legal, management), setting up communication channels that still work if email is compromised, deploying tools such as EDR, SIEM and forensic kits, gathering contact lists (including law enforcement, insurers and outside IR firms), and training through exercises. Preparation also includes hardening systems and having good backups, because every control you have in place before an incident makes response easier.",
   "Detection is noticing that something may be wrong, through SIEM alerts, EDR detections, user reports, threat intelligence or third-party notification. Analysis confirms whether an event is really an incident, determines its scope (which systems, accounts and data are involved), and assesses its severity and impact so it can be prioritized. Analysts use logs, endpoint data, network data and indicators of compromise to build a timeline. Good analysis prevents both under-reacting to a serious attack and over-reacting to a false positive. It also decides who must be told: senior management, legal counsel, and, where laws or contracts require it, regulators, customers or law enforcement, often within fixed deadlines.",
   "Containment limits the damage and stops the incident spreading. Short-term containment might mean isolating an infected host with EDR, disabling a compromised account, blocking a malicious IP or domain, or taking a system offline. Longer-term containment might move affected systems to an isolated segment while the investigation continues. Containment decisions balance stopping the attacker against preserving evidence and keeping the business running; for example, pulling the power on a server destroys memory evidence, while isolating it from the network preserves it.",
   "Eradication removes the cause: deleting malware, closing the vulnerability that was exploited, removing attacker accounts and persistence mechanisms, and resetting compromised credentials. Often the safest approach is to reimage systems from known-good images rather than trying to clean them. Recovery restores systems to normal operation: restoring data from clean backups, rebuilding servers, bringing systems back online in stages, and monitoring closely for signs that the attacker is still present or returns. Recovery ends when business operations are back to normal.",
   "Lessons learned is the post-incident review, ideally held within days while memories are fresh. The team asks what happened, what went well, what went poorly, how detection and response could have been faster, and what should change: new controls, updated playbooks, training or policy changes. The findings are documented and tracked to completion. Many organizations also perform a root cause analysis to identify the underlying reason the incident was possible, not just its trigger. The incident report also records the timeline, actions taken and costs, which supports insurance claims, regulatory questions and future planning. Note that some frameworks, such as NIST's, group these steps slightly differently, but the sequence and purpose are the same.",
   "Walk through a ransomware incident. Preparation: offline backups and an IR retainer were already in place. Detection: EDR alerts on mass file renames on a file server at 02:00. Analysis: the analyst confirms encryption activity and finds the source workstation and the compromised account. Containment: the file server and workstation are isolated and the account disabled. Eradication: the phishing email is purged from all mailboxes, the malware and scheduled tasks removed, affected machines reimaged and passwords reset. Recovery: files are restored from backup and systems monitored. Lessons learned: the team adds attachment sandboxing and speeds up alert escalation.",
   "Common mistakes: jumping to eradication before containment (the attacker keeps spreading while you clean); wiping systems before collecting evidence; skipping lessons learned; and confusing containment (stop the spread) with eradication (remove the cause). Exam clue words: 'write the plan, train, acquire tools' is preparation; 'confirm and scope' is analysis; 'isolate', 'disconnect', 'disable account' is containment; 'remove malware', 'patch the exploited flaw' is eradication; 'restore from backup', 'return to production' is recovery; 'post-incident review' is lessons learned."
  ],
  "terms": [
   [
    "Incident response plan",
    "A documented approach defining roles, procedures and communications for handling incidents."
   ],
   [
    "Playbook",
    "Step-by-step procedures for responding to a specific type of incident."
   ],
   [
    "Detection",
    "Identifying that a potential security incident may be occurring."
   ],
   [
    "Containment",
    "Limiting the scope and spread of an incident, such as isolating systems or disabling accounts."
   ],
   [
    "Eradication",
    "Removing the cause of an incident, such as malware, attacker accounts and exploited vulnerabilities."
   ],
   [
    "Recovery",
    "Restoring systems and operations to normal and monitoring for recurrence."
   ],
   [
    "Lessons learned",
    "The post-incident review that identifies improvements to prevent or better handle future incidents."
   ],
   [
    "Root cause analysis",
    "Identifying the underlying reason an incident was possible."
   ]
  ],
  "example": "A SOC analyst sees an alert that a finance user's account signed in from an unusual country and created a mail forwarding rule. After confirming it is not legitimate (analysis), she disables the account and revokes its sessions (containment), removes the forwarding rule, resets the password and MFA, and checks for other changes (eradication). The account is restored with monitoring (recovery), and the review finds that the user fell for a phishing page, so the company rolls out phishing-resistant MFA for finance (lessons learned).",
  "tip": "Contain before you eradicate: stop the spread first, then remove the cause. And preserve evidence during containment when possible, for example by isolating a host rather than powering it off.",
  "check": [
   [
    "Isolating an infected laptop from the network belongs to which phase?",
    "Containment."
   ],
   [
    "Why is it usually a mistake to reimage an infected server before containment and evidence collection?",
    "The attacker may still be active elsewhere, and valuable evidence about how they got in and what they did would be lost."
   ],
   [
    "What is the main output of the lessons learned phase?",
    "Documented improvements to controls, processes, playbooks or training, tracked to completion."
   ],
   [
    "During which phase are the IR plan, team roles and communication channels established?",
    "Preparation."
   ]
  ]
 },
 {
  "t": "Tabletop exercises and simulations",
  "body": [
   "An incident response plan that has never been practiced usually fails in a real incident: contact lists are out of date, people do not know their roles, and critical decisions have no owner. Exercises test plans, train people and reveal gaps in a safe setting. Security+ covers the main types of exercise, from simple discussion to full simulations, and asks you to choose the right one for a goal and a budget. The same exercise types are used for incident response, business continuity and disaster recovery plans.",
   "A tabletop exercise is a discussion-based session where the team walks through a scenario, such as 'ransomware has encrypted the file servers and a ransom note demands payment', and talks through what they would do at each stage. A facilitator introduces the scenario and then adds developments, called injects, such as 'a journalist calls asking for comment' or 'backups are also found to be encrypted'. No systems are touched. Tabletops are inexpensive, low risk and good at revealing gaps in roles, communication, decision-making and coordination between technical teams, management, legal and communications.",
   "A walkthrough is a similar low-risk review in which participants step through the plan's procedures, often in order, checking that each step makes sense and that the people named know what they would do. Where a tabletop discusses a realistic scenario, a walkthrough focuses on verifying the plan document itself, for example confirming that each phone number works, each system named still exists and each step has an owner.",
   "Simulations go further. A simulation creates realistic conditions, for example a phishing simulation that sends fake phishing emails to staff to test how many click and report, or a technical simulation in a test environment where the team must actually detect and respond to simulated attack activity. Simulations test whether people and tools perform, not just whether they know the plan. Red team exercises, where authorized testers act as real attackers while the blue team defends, and purple team exercises, where both collaborate to improve detection, are advanced forms.",
   "For continuity and disaster recovery, more intensive tests exist. A parallel processing test runs systems at the recovery site alongside the primary site with real data to confirm the backup environment works, without interrupting production. A failover test actually switches operations to the backup systems or site to prove recovery works end to end; it gives the most confidence but carries the most risk and cost. Organizations usually progress from tabletops to simulations to parallel and failover tests as their plans mature. Frequency matters too: plans change as staff, systems and threats change, so most organizations exercise at least once a year and after major changes such as a merger or a move to a new cloud platform.",
   "Good exercises follow a structure. Set clear objectives (for example, 'test escalation to executives within one hour'), choose a realistic scenario based on likely threats, involve the right participants including non-technical roles, record decisions and problems as they happen, and hold an after-action review. The output is a list of gaps and improvements with owners and deadlines, which feeds back into the plan, just like the lessons learned phase of a real incident.",
   "Walk through a tabletop at a hospital. The scenario: the electronic health record system is encrypted by ransomware on a Saturday night. As injects arrive, the team discovers that the on-call list has two people who left the organization, no one is sure who can authorize diverting ambulances, and the legal team does not know when regulators must be notified. None of this required touching a single system to find. The hospital updates its contact list, assigns decision rights and adds notification timelines to the plan, then schedules a technical simulation of restoring the system from backup.",
   "Common mistakes: treating the exercise as a test people can fail (the goal is to find weaknesses in the plan, not blame individuals); involving only IT; not documenting findings; and running the same scenario every year. Exam clue words: 'discussion-based', 'conference room', 'walk through a scenario', 'no systems affected' point to a tabletop exercise. 'Realistic conditions', 'fake phishing emails', 'practice detection with simulated attacks' point to a simulation. 'Run recovery systems alongside production' is a parallel test. 'Actually switch to the backup site' is a failover test. The lowest-cost, lowest-risk option is always the tabletop."
  ],
  "terms": [
   [
    "Tabletop exercise",
    "A discussion-based walkthrough of a scenario to test a plan without touching systems."
   ],
   [
    "Inject",
    "A new development introduced during an exercise to test participants' responses."
   ],
   [
    "Walkthrough",
    "A step-by-step review of plan procedures to confirm they are complete and understood."
   ],
   [
    "Simulation",
    "An exercise that recreates realistic conditions, such as a phishing campaign or simulated attack."
   ],
   [
    "Parallel processing test",
    "Running recovery systems alongside production to confirm they work without interrupting operations."
   ],
   [
    "Failover test",
    "Actually switching operations to backup systems or sites to prove recovery works."
   ],
   [
    "After-action review",
    "The post-exercise discussion that records lessons and assigns improvements."
   ]
  ],
  "example": "A retail company runs a two-hour tabletop on a card data breach discovered during the holiday season. The facilitator's injects include a payment brand demanding a forensic investigation and a social media post going viral. The exercise reveals that nobody had authority to take the online store offline and that the approved forensic firm's contract had expired. Both issues are fixed before the real holiday season begins.",
  "tip": "Tabletop equals discussion only, lowest cost and risk. Simulations and failover tests exercise real people and systems, giving more confidence at more cost and risk.",
  "check": [
   [
    "What is the main advantage of a tabletop exercise?",
    "It tests roles, decisions and communication at low cost and with no risk to production systems."
   ],
   [
    "What is an inject in an exercise?",
    "A new piece of information or development introduced during the scenario to test how participants respond."
   ],
   [
    "Which test gives the most confidence that a disaster recovery site works, and what is its downside?",
    "A full failover test; it carries the most risk and cost because operations actually move to the backup environment."
   ],
   [
    "Why should non-technical staff such as legal and communications join incident exercises?",
    "Real incidents require their decisions, such as notification and public statements, and gaps in those areas are common."
   ]
  ]
 },
 {
  "t": "Forensics: order of volatility, chain of custody, legal hold, acquisition",
  "body": [
   "Digital forensics is the collection, preservation and analysis of digital evidence in a way that can stand up to scrutiny, whether in court, in a regulatory inquiry, or in an internal disciplinary process. Even when no one expects a court case, following forensic principles means the investigation's conclusions can be trusted. Security+ focuses on the procedures that protect evidence: collecting it in the right order, keeping a documented chain of custody, preserving it under legal hold, and acquiring copies without altering the original.",
   "The order of volatility guides what to collect first. Some evidence disappears quickly, for example when a system is shut down, while other evidence persists for years. Collect the most volatile first. A typical order, from most to least volatile: CPU registers and cache; memory (RAM), including running processes, network connections and encryption keys; temporary system state such as routing tables and the ARP cache; temporary file systems and swap; data on disk; remote logging and monitoring data; physical configuration and network topology; and finally archival media such as backups. This is why investigators often capture memory before powering off a system: shutting it down would destroy running malware, open connections and possibly decryption keys.",
   "Acquisition means creating forensic copies of evidence. For disks, investigators use a hardware or software write blocker to prevent any changes to the original, then create a bit-by-bit image that includes deleted files and unallocated space. They compute a cryptographic hash, such as SHA-256, of the original and of the image; matching hashes prove the copy is exact, and rehashing later proves nothing changed. Analysis is done on copies, never the original. Memory is captured with specialized tools, and cloud and virtual environments may be acquired through snapshots and provider logs. Every step is documented with timestamps.",
   "Chain of custody is the documented record of who collected, handled, transferred and stored each piece of evidence, when and why, from the moment it is collected until it is presented or disposed of. Evidence is labeled, sealed in tamper-evident bags, and stored securely, and each handoff is signed. If the chain is broken, for example if a drive sat unlogged on a desk for a day, the evidence may be challenged or ruled inadmissible because no one can prove it was not altered.",
   "A legal hold (litigation hold) is an instruction to preserve all relevant data, including emails, files, logs and devices, when litigation or an investigation is reasonably expected. It overrides normal retention and deletion policies, so automated deletion must be suspended for the affected data and people. Failing to preserve data under a legal hold can lead to severe legal penalties. E-discovery is the process of identifying, collecting and producing electronic information for legal proceedings. Other forensic concepts include preservation (keeping evidence in its original state), reporting (clear, factual documentation of findings and methods) and admissibility (whether evidence meets legal standards).",
   "Walk through a response to suspected data theft by an employee. HR and legal issue a legal hold covering the employee's mailbox, file shares and laptop. A forensic analyst arrives while the laptop is still running, photographs the screen, captures RAM with a memory acquisition tool and records the hash. She then shuts the laptop down, removes the drive, connects it through a write blocker and creates a disk image, hashing both the original and the image:",
   "```\nsha256sum /dev/sdb        > original.sha256\nsha256sum laptop01.img    > image.sha256\n# the two values must match; analysis is performed only on the image\n```",
   "Each item is then bagged, labeled and logged on a chain of custody form as it passes to the evidence locker, and the analyst's notes record every command and timestamp. Common mistakes: shutting down a system before capturing memory; analyzing the original drive instead of a copy; forgetting to hash evidence; incomplete chain of custody records; and continuing routine deletion after a legal hold. Exam clue words: 'collect RAM before disk' is order of volatility; 'who handled the evidence and when' is chain of custody; 'suspend deletion because of a lawsuit' is legal hold; 'prevent writes to the original drive' is a write blocker; 'prove the image matches the original' is hashing; 'bit-by-bit copy including deleted space' is a forensic image."
  ],
  "terms": [
   [
    "Order of volatility",
    "Collecting evidence from the most short-lived sources first, such as memory before disk."
   ],
   [
    "Chain of custody",
    "Documented record of every person who handled evidence, when and why."
   ],
   [
    "Legal hold",
    "An instruction to preserve relevant data when litigation or investigation is expected, overriding normal deletion."
   ],
   [
    "Acquisition",
    "Collecting evidence, typically by creating forensic copies of media or memory."
   ],
   [
    "Write blocker",
    "A device or tool that prevents any changes to original evidence during acquisition."
   ],
   [
    "Forensic image",
    "A bit-by-bit copy of storage, including deleted files and unallocated space."
   ],
   [
    "E-discovery",
    "Identifying, collecting and producing electronic information for legal proceedings."
   ]
  ],
  "example": "After a breach, a company's IT staff eager to help reboot the compromised server and copy log files onto a shared USB stick. When the case goes to court, the defense challenges the evidence: memory was lost by the reboot, the USB stick has no hash or chain of custody record, and several people used it. The company now requires that only trained responders handle potential evidence, using write blockers, hashing and chain of custody forms.",
  "tip": "Memory before disk (order of volatility); hash everything; work on copies; log every handoff (chain of custody); and when litigation is expected, suspend deletion (legal hold).",
  "check": [
   [
    "Why is RAM usually captured before a system is powered off?",
    "RAM is volatile; shutting down destroys running processes, network connections and possibly encryption keys held in memory."
   ],
   [
    "What is the purpose of hashing a forensic image?",
    "To prove the image is an exact copy of the original and that it has not changed since acquisition."
   ],
   [
    "What could happen if the chain of custody is incomplete?",
    "The evidence may be challenged or ruled inadmissible because its integrity cannot be proven."
   ],
   [
    "What must an organization do with its normal email deletion policy when a legal hold is issued?",
    "Suspend deletion for the relevant data and people so that evidence is preserved."
   ]
  ]
 },
 {
  "t": "Automation and SOAR playbooks",
  "body": [
   "Security teams face more alerts, systems and routine tasks than people can handle manually. Automation uses scripts and tools to perform repetitive tasks consistently and quickly, and orchestration connects many tools so they work together in a defined sequence. Security orchestration, automation and response (SOAR) platforms bring these together for security operations, running playbooks that respond to alerts in seconds instead of hours. Security+ covers both the benefits and the risks of automation, and the concept of playbooks and runbooks.",
   "Automation is useful across security work, not only in incident response. Examples the objectives mention include user provisioning and deprovisioning, resource provisioning, guard rails (automated checks that stop insecure configurations from being deployed), creating security groups, ticket creation and escalation, enabling or disabling services and access, continuous integration and testing, and integrations through application programming interfaces (APIs). A script that disables an employee's accounts across every system the moment HR marks them as terminated is a simple but powerful piece of automation. Another is a pipeline guard rail that refuses to deploy a cloud storage bucket configured for public access, catching the mistake before it ever reaches production.",
   "A SOAR platform integrates with other security tools, such as the SIEM, EDR, firewalls, email gateways, threat intelligence feeds, identity providers and ticketing systems, through their APIs. When an alert arrives, a playbook runs: a defined workflow of automated and manual steps. A playbook for a suspicious email might extract the links and attachments, check them against threat intelligence, detonate the attachment in a sandbox, search all mailboxes for the same message, delete it everywhere if malicious, block the sender's domain, and open a ticket with the results for an analyst. Playbooks are often designed so that low-risk steps are automatic, while high-impact steps such as isolating a server wait for human approval. Every action the playbook takes is logged, which also produces a clean record for the incident report.",
   "People sometimes distinguish playbooks from runbooks. A playbook describes the overall response to a type of incident, including decisions, roles and communications. A runbook is a more detailed, step-by-step procedure for a specific technical task, which may be fully automated. In practice the terms overlap, and exam questions usually treat both as documented, repeatable procedures that support consistent response.",
   "The benefits of automation are clear: efficiency and time saved, enforced baselines and consistency (the same steps every time, without skipped steps at 3 a.m.), standard infrastructure configurations, faster reaction time, scaling without adding staff in proportion, and freeing analysts from repetitive work so they can focus on complex investigations, which improves retention. The objectives also list important considerations: complexity (many integrations can break), cost, single points of failure (if the SOAR platform or a key script fails, everything that depends on it fails), technical debt (quick scripts that no one maintains), and ongoing supportability.",
   "Walk through a phishing playbook in action. An employee reports a suspicious email with the report button. SOAR retrieves the message, finds a link to a newly registered domain, and threat intelligence rates it as malicious. The playbook automatically searches all mailboxes, finds the same email in 42 inboxes, and deletes it; adds the domain to the web proxy block list; checks proxy logs and finds that three users clicked; and creates a high-priority ticket asking an analyst to approve resetting those three users' passwords and revoking their sessions. The whole automated part takes under two minutes.",
   "Common mistakes: automating a poorly understood process (automation makes a bad process fail faster); letting automation take disruptive actions without guard rails or approval, which can cause outages from a false positive; failing to maintain integrations when tools change; and assuming SOAR replaces analysts. It handles the routine so analysts can do the judgment work.",
   "Exam clue words: 'integrate tools and automate response workflows' is SOAR; 'documented sequence of response steps for an incident type' is a playbook; 'detailed technical procedure' is a runbook; 'prevent insecure configurations from being deployed automatically' is a guard rail; 'reduce analyst workload and response time' is a benefit of automation; 'script breaks and no one knows how it works' is technical debt or supportability; 'if the platform fails, responses stop' is a single point of failure."
  ],
  "terms": [
   [
    "Automation",
    "Using scripts and tools to perform tasks without manual effort."
   ],
   [
    "Orchestration",
    "Coordinating multiple tools and automated tasks into a workflow."
   ],
   [
    "SOAR",
    "Security orchestration, automation and response platforms that integrate tools and run response playbooks."
   ],
   [
    "Playbook",
    "A documented response workflow for a type of incident, combining automated and manual steps."
   ],
   [
    "Runbook",
    "A detailed step-by-step procedure for a specific operational or technical task."
   ],
   [
    "Guard rail",
    "An automated control that prevents insecure configurations or actions."
   ],
   [
    "Technical debt",
    "The future cost of maintaining quick or poorly designed solutions such as unmanaged scripts."
   ]
  ],
  "example": "A SOC receives 300 phishing reports a week, each taking an analyst about 20 minutes to check. After building a SOAR playbook that analyzes reported messages, purges malicious ones from all mailboxes and blocks bad domains, most reports are handled in under two minutes and analysts only review the few that need judgment. Six months later, an email platform update breaks the integration; because the team documented and monitored the playbook, they spot the failure within an hour.",
  "tip": "Automation brings speed, consistency and scale, but watch for complexity, cost, single points of failure and technical debt. High-impact actions should keep a human approval step.",
  "check": [
   [
    "What is the difference between automation and orchestration?",
    "Automation performs individual tasks without manual effort; orchestration coordinates many tools and tasks into one workflow."
   ],
   [
    "Why might a playbook require human approval before isolating a production server?",
    "A false positive could cause a costly outage, so high-impact actions benefit from human judgment."
   ],
   [
    "Name two risks of heavy security automation.",
    "Complexity, cost, single points of failure, technical debt and ongoing supportability issues."
   ],
   [
    "How does automation help analyst retention?",
    "It removes repetitive tasks, letting analysts focus on more interesting, complex work and reducing burnout."
   ]
  ]
 },
 {
  "t": "Investigation data sources",
  "body": [
   "When an alert fires or an incident is suspected, analysts need evidence to understand what happened. Different data sources reveal different parts of the story, and knowing which source answers which question is a core skill for both the exam and real work. Security+ lists log data (firewall, application, endpoint, OS security, IPS/IDS, network, metadata) and other data sources such as vulnerability scans, automated reports, dashboards and packet captures. Good investigations combine several sources to build a reliable timeline. The time to think about data sources is before an incident: if a log is not collected, or is kept for only seven days, it will not be there when you need it three weeks later.",
   "Firewall logs record allowed and denied connections, with source and destination addresses, ports, protocols and actions. They answer questions like 'did this host connect to that suspicious IP?' and 'was traffic to this port blocked?'. Application logs come from web servers, databases and business applications, showing requests, errors, logins and transactions; web server logs, for example, show each request's URL, source IP and response code, which helps detect injection attempts or scanning. Endpoint logs, often from EDR, capture process creation, command lines, file changes and registry modifications, answering 'what ran on this machine?'. OS security logs, such as the Windows Security event log or Linux auth logs, record logins, privilege use, account changes and policy changes.",
   "IDS and IPS logs record detected attacks and blocked traffic with signature names and severity, which help identify attack types. Network logs from switches, routers, DNS servers, DHCP servers and proxies show which devices were where and what they looked up; DNS logs are especially valuable for spotting malware contacting command-and-control domains. Metadata is data about data: email headers (sender, route, timestamps), file properties (author, creation and modification times), and network flow records. Metadata can reveal a lot even without content, such as who emailed whom and when.",
   "Other sources support investigations too. Vulnerability scan results show which weaknesses existed on a system, helping explain how an attacker might have gotten in. Automated reports and dashboards from the SIEM and other tools summarize trends and help spot anomalies. Packet captures record full network traffic, including content where it is not encrypted, giving the deepest detail about exactly what was sent, but they require a lot of storage and are usually kept only briefly or captured on demand. Identity provider logs, cloud audit logs and email gateway logs are increasingly central as more work moves to cloud services. Cloud audit logs, for example, record every administrative action taken in a cloud account, such as who created a user, changed a firewall rule or downloaded a storage object.",
   "Here is how a few of these sources might look for the same event, a user downloading and running a malicious file:",
   "```\n# proxy log\n10:02:14 user=jlee GET files.example-bad.net/invoice.exe 200\n# EDR (endpoint)\n10:02:40 process=invoice.exe parent=explorer.exe user=jlee\n# DNS log\n10:03:05 client=10.1.4.22 query=c2.example-bad.net\n# firewall\n10:03:06 ALLOW 10.1.4.22:50122 -> 198.51.100.7:443\n```",
   "Walk through combining sources to answer investigation questions. How did it start? The email gateway and proxy logs show the user clicked a link and downloaded a file. What ran? The EDR log shows the file executing and spawning PowerShell. Did it phone home? DNS and firewall logs show connections to a suspicious domain. Did the attacker log in elsewhere? OS security logs on the file server show a login from that workstation using the user's account. How much data left? NetFlow shows the volume sent to the external address. Each source answers one question; together they give the full timeline. Synchronized clocks across systems make this possible.",
   "Common mistakes: relying on a single source; discovering during an incident that key logs were never collected or were kept too briefly; forgetting that encrypted traffic limits what packet captures show; and ignoring metadata. Exam clue words: 'which process launched' is endpoint or EDR logs; 'was the connection allowed or blocked' is firewall logs; 'failed logins and privilege changes' is OS security logs; 'what domains were looked up' is DNS logs; 'full content of network traffic' is packet capture; 'email sender, route and timestamps' is metadata from headers; 'which requests hit the web server' is application logs; 'what weaknesses existed' is vulnerability scan data."
  ],
  "terms": [
   [
    "Firewall log",
    "A record of allowed and denied network connections with addresses, ports and actions."
   ],
   [
    "Application log",
    "Events recorded by applications, such as requests, errors, logins and transactions."
   ],
   [
    "Endpoint log",
    "Activity recorded on a device, such as processes, file changes and registry edits."
   ],
   [
    "OS security log",
    "Operating system records of logins, privilege use and account or policy changes."
   ],
   [
    "Metadata",
    "Data about data, such as email headers or file timestamps."
   ],
   [
    "Packet capture",
    "A recording of full network packets, including content where not encrypted."
   ],
   [
    "DNS log",
    "Records of domain name lookups, useful for spotting malicious domains."
   ]
  ],
  "example": "An analyst investigating possible data theft checks the file server's OS security logs and finds a login by a marketing user at 23:40, which is unusual. EDR logs on that user's laptop show a compression tool creating a large archive, proxy logs show an upload to a personal cloud storage site, and email headers show the user forwarded a job offer from a competitor that afternoon. The combined picture supports an insider data theft case, and HR and legal are brought in under a legal hold.",
  "tip": "Match the question to the source: 'what ran' is endpoint logs, 'what connected' is firewall and NetFlow, 'what was looked up' is DNS, 'what exactly was sent' is packet capture, 'who logged in' is OS security or identity logs.",
  "check": [
   [
    "Which data source would best show that malware tried to contact a command-and-control domain?",
    "DNS logs, supported by firewall or proxy logs showing the connection."
   ],
   [
    "Why are packet captures not always the most practical source?",
    "They require large amounts of storage, are often kept only briefly, and encrypted traffic limits what they reveal."
   ],
   [
    "An analyst needs to know which process created a suspicious file. Where should they look?",
    "Endpoint logs, typically from EDR, which record process creation and file activity."
   ],
   [
    "Why is time synchronization essential when combining data sources?",
    "Accurate timestamps are needed to put events from different systems into a reliable timeline."
   ]
  ]
 },
 {
  "t": "Policies, standards, procedures, guidelines",
  "body": [
   "Security governance relies on a hierarchy of documents that tell people what is required and how to do it. Security+ expects you to distinguish four types: policies, standards, procedures and guidelines. The differences are about scope, detail and whether the document is mandatory. Getting them right matters in practice, because a well-organized document set lets an organization change technical details without rewriting its high-level commitments, and lets auditors trace every control back to a requirement.",
   "A policy is a high-level statement of management's intent and direction, approved by senior leadership. It says what must be achieved and why, not the technical detail of how. Policies are mandatory and change rarely. Examples the objectives list include the acceptable use policy (AUP), which defines what users may and may not do with company systems; the information security policy; business continuity and disaster recovery policies; the incident response policy; the software development lifecycle (SDLC) policy; and the change management policy. A policy might say: 'All sensitive data must be encrypted at rest and in transit.'",
   "A standard is a mandatory, specific requirement that supports a policy by defining exactly what is acceptable. Standards make policies measurable. Following the encryption policy above, a standard might require AES-256 for data at rest and TLS 1.2 or higher for data in transit. Other standards the objectives mention cover passwords, access control, physical security and encryption. Standards may be internal or adopted from external bodies such as ISO or NIST. Because technology changes, standards are updated more often than policies.",
   "A procedure is a detailed, step-by-step set of instructions for carrying out a specific task in a consistent way. Procedures are usually mandatory for the people doing the task. Examples include the steps to onboard or offboard an employee, to perform a change under change management, or to respond to a specific incident type (playbooks). A procedure for encryption might explain exactly how to enable disk encryption on a new laptop and where to store the recovery key.",
   "A guideline is a recommendation or best-practice advice that is not mandatory. Guidelines help people make good decisions where rigid rules do not fit, such as advice on choosing a strong passphrase or on securely working from a café. They give flexibility while still pointing people in the right direction. If a question asks which document is optional, the answer is a guideline. Guidelines are also useful where the organization wants to encourage good habits without creating a rule it cannot realistically enforce or audit.",
   "Governance also involves structures and roles. Boards and committees set direction and oversee risk; government entities and regulators impose external requirements; and the organization may be centralized (decisions made by one central team) or decentralized (business units decide within limits). Roles include owners (accountable for data or systems), controllers and processors (for personal data), custodians or stewards (who implement controls day to day). Documents must be reviewed regularly, approved by the right authority, communicated, and monitored for compliance, with exceptions handled through a formal process. External considerations shape them too: regulatory, legal, industry, local, national and global requirements may all dictate what a policy or standard must say, so governance teams track those obligations and update documents when laws change.",
   "Walk through how the four documents connect for passwords. The policy says access to company systems must use strong authentication. The standard says passwords must be at least 14 characters, checked against a list of breached passwords, and combined with MFA for remote access. The procedure explains step by step how the help desk verifies identity before resetting a password. The guideline suggests using a password manager and memorable passphrases made of several random words. If the company later adopts passkeys, it updates the standard and procedure, but the policy stays the same.",
   "Common mistakes: calling a policy a procedure because it is detailed; thinking guidelines are mandatory; putting specific technical settings into policies, which then need constant revision; and failing to review documents so they no longer match reality. Exam clue words: 'high-level statement of intent approved by management' is a policy; 'specific mandatory requirement such as a minimum key length' is a standard; 'step-by-step instructions' is a procedure; 'recommended, optional' is a guideline; 'what users may do with company systems' is the acceptable use policy."
  ],
  "terms": [
   [
    "Policy",
    "A high-level, mandatory statement of management's intent and direction."
   ],
   [
    "Standard",
    "A mandatory, specific requirement that supports a policy, such as a minimum key length."
   ],
   [
    "Procedure",
    "Detailed step-by-step instructions for performing a task consistently."
   ],
   [
    "Guideline",
    "Recommended, non-mandatory advice or best practice."
   ],
   [
    "Acceptable use policy (AUP)",
    "A policy defining permitted and prohibited use of organizational systems and data."
   ],
   [
    "Governance",
    "The structures, roles and processes by which an organization directs and oversees security."
   ],
   [
    "Policy exception",
    "A formally approved, documented deviation from a policy or standard, usually with compensating controls."
   ]
  ],
  "example": "An auditor asks a company how it enforces its policy that remote access must be secure. The company shows its remote access standard (VPN with certificate authentication and MFA, TLS 1.2 minimum), the procedure the help desk uses to issue VPN certificates, and a guideline advising staff to avoid public computers. The auditor can trace the policy to measurable requirements and repeatable steps, and the audit finding is closed.",
  "tip": "Policy says what and why; standard says exactly what is required; procedure says how, step by step; guideline recommends. Only the guideline is optional.",
  "check": [
   [
    "A document states that all laptops must use AES-256 full disk encryption. Is this a policy or a standard?",
    "A standard, because it sets a specific, measurable mandatory requirement."
   ],
   [
    "Which document type is not mandatory?",
    "A guideline."
   ],
   [
    "Why should specific technical settings be kept out of policies?",
    "Technology changes often; putting details in standards and procedures lets them be updated without rewriting high-level, board-approved policies."
   ],
   [
    "Step-by-step instructions for offboarding an employee are an example of which document?",
    "A procedure."
   ]
  ]
 },
 {
  "t": "Risk: register, appetite, tolerance, SLE/ARO/ALE",
  "body": [
   "Risk is the possibility that a threat will exploit a vulnerability and cause harm to an asset. Risk management is how an organization identifies, measures and decides what to do about those possibilities, so it can spend its security budget where it matters most. Security+ tests the vocabulary of risk management, the tools used to track risk, and the quantitative formulas SLE, ARO and ALE. Expect at least one calculation question, so practice the math until it is automatic.",
   "Risk is often described as likelihood multiplied by impact. Likelihood (or probability) is how likely an event is; impact is how much damage it would cause. Risk assessment can be qualitative, using ratings such as low, medium and high, often shown in a heat map, or quantitative, using numbers and money. Qualitative assessment is faster and works when data is scarce; quantitative gives dollar values that support cost-benefit decisions. Assessments may be ad hoc, one-time, recurring or continuous. Inherent risk is the risk before controls; residual risk is what remains after controls are applied.",
   "The risk register is a central record of identified risks, usually a table or tool. Each entry typically includes a description, the risk owner (the person accountable for managing it), likelihood, impact, overall risk score, existing controls, planned treatment, key risk indicators (KRIs, metrics that warn when a risk is increasing) and status. The register lets leadership see the organization's risk landscape and track treatments over time. Risk appetite is the amount and type of risk an organization is willing to pursue or accept in pursuit of its goals, often described as expansionary, conservative or neutral. Risk tolerance is the acceptable variation around that appetite for a specific risk or objective, the practical limits before action is required. Risk threshold is similar: the level at which a risk must be escalated or treated.",
   "Quantitative risk analysis uses a few formulas. Asset value (AV) is the value of the asset. Exposure factor (EF) is the percentage of the asset's value lost in one incident. Single loss expectancy (SLE) is the expected cost of one occurrence: SLE = AV × EF. Annualized rate of occurrence (ARO) is how many times per year the event is expected to happen; once every four years is 0.25. Annualized loss expectancy (ALE) is the expected yearly cost: ALE = SLE × ARO.",
   "A worked example: a customer database is valued at $400,000. A breach is expected to cost 50 percent of its value (EF = 0.5), so SLE = $400,000 × 0.5 = $200,000. Such a breach is expected once every five years, so ARO = 0.2, and ALE = $200,000 × 0.2 = $40,000 per year. A control costing $15,000 per year that reduces the ARO to 0.05 would lower the ALE to $10,000. The savings of $30,000 a year exceed the control's cost of $15,000, so the control is cost-effective.",
   "```\nSLE = AV x EF          = 400,000 x 0.5  = 200,000\nALE = SLE x ARO        = 200,000 x 0.2  = 40,000 / year\nNew ALE with control   = 200,000 x 0.05 = 10,000 / year\nValue of control       = 40,000 - 10,000 - 15,000 = 15,000 / year\n```",
   "Business impact analysis connects to risk: mean time to repair, recovery objectives and critical functions all inform the impact side. Risk reporting summarizes the register for leadership, highlighting risks outside tolerance. Common mistakes: confusing ARO with a probability between 0 and 1 in all cases (an event happening three times a year has ARO = 3); multiplying AV by ARO directly and skipping the SLE; mixing up appetite (the overall amount of risk the organization wants) and tolerance (the acceptable deviation for specific risks); and forgetting that residual risk always remains after controls.",
   "Exam clue words: 'cost of a single incident' is SLE; 'how often per year' is ARO; 'expected yearly loss' is ALE; 'percentage of value lost' is exposure factor; 'central list of risks with owners and status' is the risk register; 'how much risk the organization is willing to take on overall' is risk appetite; 'acceptable deviation for a specific risk' is risk tolerance; 'risk remaining after controls' is residual risk; 'metric that warns of rising risk' is a key risk indicator. For calculation questions, always compute SLE first, then ALE."
  ],
  "terms": [
   [
    "Risk register",
    "A central record of risks with owners, ratings, controls, treatments and status."
   ],
   [
    "Risk appetite",
    "The amount and type of risk an organization is willing to pursue or accept overall."
   ],
   [
    "Risk tolerance",
    "The acceptable variation in risk around the appetite for specific risks or objectives."
   ],
   [
    "Single loss expectancy (SLE)",
    "The expected cost of one occurrence: asset value times exposure factor."
   ],
   [
    "Annualized rate of occurrence (ARO)",
    "The expected number of occurrences per year."
   ],
   [
    "Annualized loss expectancy (ALE)",
    "The expected yearly loss: SLE times ARO."
   ],
   [
    "Exposure factor (EF)",
    "The percentage of an asset's value lost in a single incident."
   ],
   [
    "Residual risk",
    "The risk that remains after controls are applied."
   ]
  ],
  "example": "A company's laptops are each worth $2,000 including data recovery costs, and it loses about 30 a year. With EF = 1 (the whole laptop is lost), SLE = $2,000 and ALE = $2,000 × 30 = $60,000. A proposal for cable locks and a tracking service costing $12,000 a year is expected to cut losses to 10 per year, an ALE of $20,000. Leadership approves it because it saves $40,000 in expected losses for $12,000 in cost.",
  "tip": "SLE = AV × EF; ALE = SLE × ARO. A control is worth it when the reduction in ALE is greater than the control's annual cost.",
  "check": [
   [
    "A server worth $50,000 would lose 40 percent of its value in a flood expected once every 10 years. What are the SLE and ALE?",
    "SLE = $50,000 × 0.4 = $20,000; ALE = $20,000 × 0.1 = $2,000 per year."
   ],
   [
    "What is the difference between risk appetite and risk tolerance?",
    "Appetite is the overall level of risk the organization is willing to accept; tolerance is the acceptable deviation for specific risks before action is needed."
   ],
   [
    "Why does the risk register assign an owner to each risk?",
    "So a specific person is accountable for monitoring the risk and ensuring its treatment is carried out."
   ],
   [
    "An event happens twice a year. What is its ARO?",
    "2."
   ]
  ]
 },
 {
  "t": "Risk treatment: accept, avoid, transfer, mitigate",
  "body": [
   "After risks are identified and analyzed, the organization must decide what to do about each one. This decision is called risk treatment or risk response, and Security+ lists four main strategies: accept, avoid, transfer and mitigate. No organization can eliminate all risk, so the goal is to bring each risk within the organization's risk appetite at a sensible cost. Exam questions usually describe an action and ask which strategy it represents, so focus on recognizing each strategy from a scenario.",
   "Mitigate (also called reduce) means applying controls to lower the likelihood or impact of a risk. Installing patches, adding MFA, deploying EDR, training staff, segmenting networks and keeping backups are all mitigation. It is the most common response. Mitigation rarely removes a risk completely; what remains is residual risk, which is then accepted, further mitigated or transferred. The cost of mitigating controls should be justified by the reduction in expected loss. In quantitative terms, a control is worthwhile when the drop in annualized loss expectancy is larger than the control's annual cost, which ties this lesson directly to the SLE, ARO and ALE calculations.",
   "Transfer (sometimes called sharing) shifts the financial impact of a risk to another party. The classic example is buying cybersecurity insurance, which pays for costs such as incident response, legal fees and business interruption after a breach. Contracts can also transfer risk, for example outsourcing a function to a provider with indemnification clauses. Transfer does not transfer accountability or reputational damage: if customer data is breached at your provider, customers and regulators still hold you responsible, so transfer is usually combined with other controls.",
   "Avoid means eliminating the risk by not doing the risky activity at all: not launching a feature, not entering a market, not collecting certain data, or retiring a legacy system instead of keeping it running. Avoidance removes the risk completely but also removes whatever benefit the activity would have provided. For example, a company that decides not to store customers' card numbers, using a payment provider instead, avoids the risk of storing card data itself.",
   "Accept means acknowledging the risk and choosing to take no further action, usually because the cost of treating it outweighs the potential loss or because the risk is already within appetite. Acceptance should be a conscious, documented decision by someone with authority, recorded in the risk register and reviewed periodically, not simply ignoring a risk. Risks outside the organization's tolerance generally should not be accepted without escalation to senior leadership, because the decision commits the whole organization to living with the consequences. The objectives also mention exemptions and exceptions: an exception is a formally approved, time-limited deviation from a policy or standard (for example, a system that cannot meet the patching standard), usually with compensating controls; an exemption releases something from a requirement entirely.",
   "Walk through choosing treatments for four risks at an online retailer. Ransomware on the file servers: mitigate with EDR, backups and segmentation, and transfer residual financial impact through cyber insurance. A proposed feature to store customers' ID documents that the business does not really need: avoid by not collecting them. Minor defacement risk on a static marketing site that costs little to restore: accept, documented by the marketing director as risk owner. A legacy warehouse system that cannot meet the patching standard until next year: grant a documented exception with compensating controls (segmentation and extra monitoring), with an expiry date.",
   "Common mistakes: believing insurance or outsourcing transfers all responsibility (accountability stays with the organization); treating acceptance as doing nothing without documentation or authority; confusing avoidance (stop the activity) with mitigation (keep doing it more safely); and thinking one strategy per risk is the rule, when combining mitigation with transfer and acceptance of the residual is normal.",
   "Exam clue words: 'buy cyber insurance', 'outsource with contractual liability' is transfer; 'implement a control', 'patch', 'add MFA' is mitigate; 'stop offering the service', 'do not collect the data', 'decommission the system' is avoid; 'the cost of the control exceeds the potential loss, so leadership signs off' is accept; 'temporary approved deviation from policy with compensating controls' is an exception. If a question asks who should accept a risk, the answer is the risk or business owner with appropriate authority, not the security analyst."
  ],
  "terms": [
   [
    "Risk treatment",
    "The decision on how to respond to an identified risk."
   ],
   [
    "Mitigate",
    "Reduce a risk's likelihood or impact by applying controls."
   ],
   [
    "Transfer",
    "Shift the financial impact of a risk to another party, such as an insurer."
   ],
   [
    "Avoid",
    "Eliminate a risk by not performing the risky activity."
   ],
   [
    "Accept",
    "Formally acknowledge a risk and take no further action, usually because treatment costs more than the potential loss."
   ],
   [
    "Risk exception",
    "A formally approved, time-limited deviation from a policy or standard, often with compensating controls."
   ],
   [
    "Cyber insurance",
    "Insurance that covers financial losses from cyber incidents, a common form of risk transfer."
   ]
  ],
  "example": "A hospital's risk committee reviews an old medical imaging system that cannot be patched. Replacing it costs $2 million, and the business cannot stop using it this year, so avoidance is not possible yet. The committee mitigates by isolating it on its own VLAN with strict firewall rules, transfers part of the financial risk through its cyber insurance policy, and formally accepts the residual risk with a documented exception signed by the chief medical officer, due for review in six months.",
  "tip": "Insurance transfers financial impact but never accountability. Acceptance must be documented and approved by someone with authority; otherwise the risk is simply being ignored.",
  "check": [
   [
    "A company decides not to launch a mobile app because the data it would collect creates too much risk. Which strategy is this?",
    "Avoidance, because it eliminates the risk by not doing the activity."
   ],
   [
    "Does buying cyber insurance transfer responsibility for a data breach to the insurer?",
    "No; it transfers some financial impact, but accountability, regulatory duties and reputational harm remain with the organization."
   ],
   [
    "What should accompany a decision to accept a risk?",
    "Documentation in the risk register and approval by an owner with appropriate authority, plus periodic review."
   ],
   [
    "A company adds MFA to reduce the chance of account takeover. Which strategy is this?",
    "Mitigation, because it applies a control to lower the likelihood of the risk."
   ]
  ]
 },
 {
  "t": "Third-party risk: SLA, MOU, MSA, SOW, NDA, right to audit",
  "body": [
   "Organizations depend on many third parties: cloud providers, software vendors, managed service providers, payment processors, contractors and suppliers. Each one can introduce risk, because a vendor's weakness can become your breach. Many major incidents have started at a supplier, such as a compromised software update or a managed service provider's remote access tool. Third-party risk management (also called vendor risk management) is the process of assessing, contracting with, monitoring and eventually offboarding vendors so that their risks stay within your appetite. Security+ tests the agreement types and the assessment methods used.",
   "Assessment starts before signing. Vendor due diligence reviews a supplier's security posture, financial health, reputation and legal history. Methods include security questionnaires, reviewing independent audit reports and certifications (such as SOC 2 reports or ISO 27001 certification), evidence of internal audits, penetration test summaries, and in some cases on-site assessments. Supply chain analysis looks further upstream at the vendor's own suppliers. Vendors are often tiered by risk: one that holds sensitive data or has privileged network access gets far more scrutiny than a stationery supplier. Watch for conflicts of interest in vendor selection.",
   "Agreements define the relationship and its protections. A service level agreement (SLA) specifies measurable performance commitments, such as 99.9 percent uptime, response times for support tickets or incident notification within a set number of hours, and the penalties or credits if they are missed. A memorandum of understanding (MOU) records a mutual agreement of intent between parties; it is usually less formal and often not legally binding. A memorandum of agreement (MOA) is similar but more specific and can be binding. A master service agreement (MSA) sets the general terms for an ongoing relationship, such as liability, confidentiality and payment, so future projects do not need a new full contract. A statement of work (SOW) or work order defines the specific tasks, deliverables, timeline and cost for a particular project under the MSA.",
   "A non-disclosure agreement (NDA) legally requires parties to keep shared information confidential; it is often signed before sharing details during vendor evaluation. A business partners agreement (BPA) governs a partnership, including each party's responsibilities and profit sharing. Contracts should also include a right-to-audit clause, which lets the customer, or an independent auditor on its behalf, assess the vendor's security controls and compliance; without it, the vendor can refuse. Other important clauses cover breach notification timelines, data ownership, data location, subcontractor use, and what happens to data when the contract ends.",
   "Monitoring continues after signing. Vendors are reassessed periodically and after significant changes; performance is tracked against the SLA; questionnaires and audit reports are refreshed; and external signals such as news of a breach at the vendor trigger review. Rules of engagement define how a vendor's staff may interact with your systems, such as for penetration testers. When the relationship ends, offboarding ensures access is removed and data is returned or securely destroyed, ideally with certification.",
   "Walk through onboarding a payroll provider. The company signs an NDA, then sends a security questionnaire and requests the provider's SOC 2 Type II report. Because the provider will hold employee bank details and national ID numbers, it is rated high risk. The MSA includes confidentiality terms, a right-to-audit clause, breach notification within 72 hours and data return on termination. An SLA commits to payroll processing accuracy and uptime, and a SOW defines the migration project. Each year the company reviews the latest SOC 2 report and the SLA results.",
   "Common mistakes: confusing SLA (performance measures) with MSA (overall terms) and SOW (specific project work); treating an MOU as legally binding when it usually is not; forgetting the right-to-audit clause; assessing vendors only once; and neglecting offboarding. Another is assuming that a well-known vendor must be secure; size and reputation are not evidence, and even large providers publish audit reports precisely so customers can check rather than assume.",
   "Exam questions usually give a document's purpose and ask for its name. Clue words: 'guaranteed uptime and response times' is an SLA; 'non-binding statement of shared intent' is an MOU; 'general terms for future work' is an MSA; 'specific deliverables and timeline for a project' is a SOW; 'keep shared information secret' is an NDA; 'ability to inspect the vendor's controls' is right to audit."
  ],
  "terms": [
   [
    "Service level agreement (SLA)",
    "A contract defining measurable service levels, such as uptime and response times, and penalties for missing them."
   ],
   [
    "Memorandum of understanding (MOU)",
    "A usually non-binding document recording shared intent between parties."
   ],
   [
    "Master service agreement (MSA)",
    "A contract setting general terms for an ongoing relationship and future work."
   ],
   [
    "Statement of work (SOW)",
    "A document defining specific tasks, deliverables, timeline and cost for a project."
   ],
   [
    "Non-disclosure agreement (NDA)",
    "A legal agreement to keep shared information confidential."
   ],
   [
    "Right-to-audit clause",
    "A contract term allowing the customer or its auditor to assess the vendor's controls."
   ],
   [
    "Vendor due diligence",
    "Assessing a supplier's security, financial and legal standing before and during a relationship."
   ]
  ],
  "example": "A marketing agency is hired to run a customer campaign using the company's customer list. Before sharing any data, the company signs an NDA, checks the agency's security questionnaire answers, and adds a SOW under the existing MSA stating that data will be deleted within 30 days of campaign completion, with a right-to-audit clause. When the campaign ends, the company requests and receives a certificate confirming deletion.",
  "tip": "SLA is about measurable performance, MSA sets the general terms, SOW defines specific work, MOU is usually non-binding intent, NDA is confidentiality, and right to audit lets you verify the vendor's controls.",
  "check": [
   [
    "A contract guarantees 99.95 percent uptime and service credits if it is missed. What type of agreement is this?",
    "A service level agreement (SLA)."
   ],
   [
    "Why is a right-to-audit clause important in vendor contracts?",
    "It gives the customer the contractual ability to verify the vendor's security controls rather than relying only on the vendor's claims."
   ],
   [
    "How do an MSA and a SOW relate?",
    "The MSA sets general terms for the relationship, and each SOW defines the specific work, deliverables and costs for a project under it."
   ],
   [
    "Why should vendors be reassessed periodically rather than only at onboarding?",
    "Their security posture, ownership, services and threats change over time, so risk must be monitored continuously."
   ]
  ]
 },
 {
  "t": "Compliance, privacy roles (controller, processor), audits",
  "body": [
   "Compliance means meeting the requirements of laws, regulations, contracts and industry standards that apply to an organization. Failing to comply can bring fines, sanctions, loss of licenses, contractual penalties and reputational damage. Privacy laws are a large part of this, and they define specific roles for organizations that handle personal data. Audits and assessments provide evidence that controls exist and work. Security+ tests compliance monitoring and reporting, privacy roles and concepts, and the types of audits and attestations.",
   "Compliance is an ongoing process. Organizations identify which requirements apply, map them to controls, monitor compliance through due diligence and due care, and report internally to leadership and externally to regulators or customers. Due diligence is investigating and understanding risks and obligations; due care is acting responsibly to meet them. Consequences of non-compliance listed in the objectives include fines, sanctions, reputational damage, loss of license and contractual impacts. Automation helps by continuously checking configurations against requirements and generating evidence.",
   "Privacy roles define responsibility for personal data. The data subject is the individual the data is about. The data controller decides why and how personal data is processed; it is primarily accountable for complying with privacy law. The data processor processes personal data on behalf of the controller and only according to its instructions, such as a payroll company or cloud email provider. For example, when a retailer uses a marketing platform to send emails to its customers, the retailer is the controller and the platform is the processor. Organizations often appoint a data protection officer (DPO) to oversee privacy compliance. Other roles include the data owner (accountable for a data set inside the organization) and data custodian or steward.",
   "Privacy concepts include the right to be forgotten (data subjects can request deletion of their data in some jurisdictions, notably under the EU General Data Protection Regulation, GDPR), data inventory and retention (knowing what personal data you hold and keeping it no longer than needed), data minimization (collecting only what is necessary), purpose limitation, and legal implications that vary by local, national and global jurisdiction. Some laws cover specific sectors, such as health information, while others, like GDPR, cover personal data broadly and apply to organizations anywhere that handle data about people in the EU.",
   "Audits and assessments verify controls. Internal audits are performed by the organization's own audit function, which should be independent of the teams being audited and report to an audit committee. Self-assessments are done by the teams themselves as a lighter check. External audits are performed by independent third parties, such as regulators, examiners or independent audit firms, and carry more weight with customers and regulators. An attestation is a formal statement by an auditor, or by management, that controls meet stated criteria; SOC 2 reports are a common example for service providers. Penetration tests are another assessment type, and can be physical, offensive, defensive or integrated.",
   "Walk through a privacy request. A customer in the EU emails an online store asking for all her personal data to be deleted. The store, as the data controller, verifies her identity, finds her data using its data inventory, deletes it from its systems except where the law requires retention (for example, invoices kept for tax purposes), and instructs its processors, the email marketing platform and the delivery partner, to delete her data too. The request and actions are logged as evidence for regulators and auditors.",
   "Common mistakes: assuming the processor carries the main legal responsibility (the controller is primarily accountable, though processors have obligations too); thinking outsourcing processing removes compliance duties; confusing internal audits with self-assessments; and treating compliance as the same as security. An organization can be compliant with a standard and still be breached; compliance sets a floor, not a ceiling.",
   "Exam clue words: 'decides the purposes and means of processing' is the controller; 'processes data on the controller's behalf' is the processor; 'the person the data describes' is the data subject; 'request deletion of personal data' is the right to be forgotten; 'independent third party verifies controls' is an external audit; 'formal statement that controls meet criteria' is an attestation; 'collect only what is needed' is data minimization; 'acting responsibly to meet obligations' is due care."
  ],
  "terms": [
   [
    "Compliance",
    "Meeting the requirements of applicable laws, regulations, contracts and standards."
   ],
   [
    "Data controller",
    "The organization that decides why and how personal data is processed and is primarily accountable."
   ],
   [
    "Data processor",
    "An organization that processes personal data on the controller's behalf and instructions."
   ],
   [
    "Data subject",
    "The individual whom personal data describes."
   ],
   [
    "Right to be forgotten",
    "A data subject's right in some jurisdictions to have their personal data erased."
   ],
   [
    "Attestation",
    "A formal statement that controls meet specified criteria, such as a SOC 2 report."
   ],
   [
    "External audit",
    "An independent third-party examination of an organization's controls or compliance."
   ],
   [
    "Due care",
    "Acting responsibly to meet security and legal obligations."
   ]
  ],
  "example": "A software company that stores customers' HR data in the cloud acts as a data processor for its customers, who are the controllers. To win enterprise contracts, it undergoes an annual SOC 2 Type II audit by an independent firm, whose attestation report customers review during vendor due diligence. When one customer asks the company to delete an ex-employee's records under the right to be forgotten, the company follows the customer's instructions and confirms deletion in writing.",
  "tip": "The controller decides why and how personal data is used and is primarily accountable; the processor acts on the controller's instructions. External audits by independent parties carry more weight than internal ones.",
  "check": [
   [
    "A company uses a cloud service to store its customers' personal data. Which is the controller and which is the processor?",
    "The company is the controller because it decides the purpose; the cloud service is the processor acting on its instructions."
   ],
   [
    "What is the difference between an internal audit and an external audit?",
    "Internal audits are performed by the organization's own independent audit function; external audits are performed by independent third parties such as regulators or audit firms."
   ],
   [
    "Why is compliance not the same as security?",
    "Compliance shows that required controls exist at a point in time, but it sets a minimum; an organization can be compliant and still vulnerable."
   ],
   [
    "What is data minimization?",
    "Collecting and keeping only the personal data that is necessary for a specific purpose."
   ]
  ]
 },
 {
  "t": "Security awareness and phishing simulations",
  "body": [
   "People are part of every security system, and attackers target them because it is often easier to trick a person than to break a technical control. Security awareness programs teach people to recognize threats, follow policy and report problems quickly. The aim is not to turn everyone into security experts but to change behavior: pause before clicking, verify unusual requests, protect data and report anything suspicious. Security+ covers what a program should include, how phishing simulations work, and how to measure whether training is actually changing behavior.",
   "Content should cover the threats people actually face. Phishing and its variants (spear phishing, smishing, vishing, business email compromise) are central, taught by showing common signs: unexpected urgency, mismatched sender or link domains, requests for credentials or payment changes, unusual attachments. Other topics include anomalous behavior recognition (spotting risky, unexpected or unintentional behavior by colleagues or systems), password management and MFA, removable media and cables, social engineering in person, insider threat awareness, operational security (not oversharing about work on social media), hybrid and remote work risks such as public Wi-Fi, policy and handbook requirements, and situational awareness in the physical workplace.",
   "Delivery matters as much as content. Short, frequent training works better than a single annual session. Onboarding training gives new starters the basics, and recurring training keeps knowledge fresh. Role-based training targets people with higher risk or privileges: finance staff learn about payment fraud and BEC, developers learn secure coding, administrators learn about privileged account protection, and executives learn about whaling and targeted attacks. Just-in-time training delivers a short lesson at the moment someone makes a mistake, which is when people are most receptive.",
   "Phishing simulations send realistic but harmless fake phishing emails to staff to measure and improve their responses. When a user clicks a simulated link, they typically see a brief explanation of the warning signs they missed. When they report the message using the report button, they get positive feedback. Simulations should reflect real threats the organization faces, vary in difficulty, and run regularly. They should educate, not shame: publicly naming people who clicked damages trust and makes people less likely to report real mistakes quickly.",
   "Measuring effectiveness means tracking metrics over time, not just completion of training. Useful metrics include click rate on simulations, credential submission rate, reporting rate (the percentage of recipients who report the simulated phish), time to first report, repeat clickers, and real-world indicators such as the number of genuine phishing emails reported and incidents caused by human error. Reporting rate and speed often matter more than click rate: if one person reports a real phishing email within two minutes, the security team can remove it from every inbox before others click. Programs also include initial and recurring assessments, and results guide which topics or groups need more attention.",
   "Walk through a year of an awareness program. In January, a baseline simulation finds a 22 percent click rate and a 6 percent report rate. The company deploys a report button in email clients, monthly five-minute micro-lessons, role-based BEC training for finance and just-in-time lessons for clickers. By December, the click rate is 7 percent, the report rate is 55 percent, and the median time to first report on real phishing is four minutes. When a real credential phishing campaign arrives, early reports let the SOC purge it from mailboxes and block the domain before anyone enters a password.",
   "Common mistakes: treating awareness as a once-a-year compliance video; measuring only training completion; punishing clickers, which discourages reporting; using unrealistic simulations that are either impossible to spot or trivially obvious; and not training non-office staff or executives. Another mistake is relying on awareness alone; technical controls like email filtering and phishing-resistant MFA must back it up, because some percentage of people will always click.",
   "Exam clue words: 'fake phishing emails sent to staff to test them' is a phishing simulation; 'training tailored to finance or administrators' is role-based training; 'lesson shown immediately after a mistake' is just-in-time training; 'percentage of users who report' is reporting rate; 'recognize unusual behavior by coworkers or systems' is anomalous behavior recognition; 'policies and handbooks employees must follow' is policy training. When asked for the best measure of a program's effectiveness, choose behavior-based metrics such as reporting rate over training completion."
  ],
  "terms": [
   [
    "Security awareness training",
    "Education that helps people recognize threats, follow policy and report issues."
   ],
   [
    "Phishing simulation",
    "A harmless fake phishing campaign used to measure and improve staff responses."
   ],
   [
    "Reporting rate",
    "The percentage of recipients who report a phishing email, simulated or real."
   ],
   [
    "Role-based training",
    "Training tailored to the risks of specific roles, such as finance, developers or executives."
   ],
   [
    "Just-in-time training",
    "A short lesson delivered at the moment a user makes a mistake."
   ],
   [
    "Anomalous behavior recognition",
    "Training people to notice risky, unexpected or unintentional behavior that may indicate a threat."
   ],
   [
    "Click rate",
    "The percentage of recipients who click a link in a phishing simulation."
   ]
  ],
  "example": "A company's first phishing simulation shows that 30 percent of finance staff click a fake invoice link and almost no one reports it. Over six months, finance receives role-based BEC training and monthly simulations with just-in-time lessons, and a one-click report button is added to email. When a real fake-invoice email arrives, three finance staff report it within five minutes, and the security team removes it from all 2,000 mailboxes before anyone pays.",
  "tip": "Reporting rate and speed often matter more than click rate, because one fast report lets the security team protect everyone. Simulations should educate, not shame.",
  "check": [
   [
    "Why is the reporting rate an important phishing simulation metric?",
    "Quick reports let the security team detect and remove real phishing emails organization-wide before more people fall for them."
   ],
   [
    "What should happen immediately when a user clicks a simulated phishing link?",
    "They should receive brief, just-in-time training explaining the warning signs they missed."
   ],
   [
    "Why is punishing employees who click simulated phishing links counterproductive?",
    "It discourages people from reporting real mistakes quickly, which delays response to genuine attacks."
   ],
   [
    "Why does the finance team often receive role-based training?",
    "They are prime targets for business email compromise and payment fraud, so they need specific skills to verify payment requests."
   ]
  ]
 }
], { reviewed: "2026-09-25" });
