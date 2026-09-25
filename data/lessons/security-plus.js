/* Lessons for CompTIA Security+ (SY0-701): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("security-plus", [
 {
  "t": "Control categories: technical, managerial, operational, physical",
  "body": [
   "A security control is anything an organization puts in place to reduce risk: a firewall rule, a written policy, a guard at the door, a training session. Security+ asks you to sort controls in two independent ways. The first is the control category, which answers the question 'how is this control implemented, and who or what carries it out?' The SY0-701 objectives name four categories: technical, managerial, operational and physical. The second way, control type, answers 'what does it do?' and is covered in the next lesson.",
   "Technical controls (sometimes called logical controls) are implemented by systems: hardware, software or firmware that enforces a rule automatically. Examples include firewalls, antivirus and endpoint detection and response (EDR) agents, encryption, multifactor authentication (MFA), operating system permissions and intrusion prevention systems. Once configured, a technical control keeps working without a person making a decision each time.",
   "Managerial controls (also called administrative controls) are about direction and oversight. They are the decisions and documents that shape how security is run: security policies, risk assessments, the risk register, vendor assessments, security awareness program design, and procedures for hiring. If a control lives mainly on paper and describes what should happen or how risk is governed, it is probably managerial.",
   "Operational controls are carried out by people as part of day-to-day work. A guard checking badges, a help desk analyst following an identity verification procedure before resetting a password, staff running backups, and employees attending awareness training are all operational. The difference from managerial can feel subtle: the policy that says 'all visitors must be escorted' is managerial, while the receptionist actually escorting visitors is operational.",
   "Physical controls protect the tangible environment: fences, bollards, locks, mantraps (access control vestibules), lighting, badge readers, cameras and locked server racks. They stop or record people and vehicles moving through space. Note that a badge reader is both a physical control and uses technology; on the exam, focus on what the control mainly protects. A door lock that keeps people out of a room is physical.",
   "To categorize a control in a question, ask three things in order. Is it a machine enforcing a rule on data or systems? Technical. Is it a person doing a task as part of normal operations? Operational. Is it a plan, policy or assessment that governs the program? Managerial. Does it protect a space or object you can touch? Physical. Remember that every control also has a type, so a single control can be, for example, 'physical and deterrent' or 'technical and preventive'. Exam questions often give you a scenario and ask for one or the other, so read carefully which dimension they want."
  ],
  "terms": [
   [
    "Technical control",
    "A control implemented by hardware, software or firmware, such as a firewall, encryption or MFA."
   ],
   [
    "Managerial control",
    "An administrative control that directs or oversees security, such as a policy, risk assessment or procedure design."
   ],
   [
    "Operational control",
    "A control carried out by people in day-to-day work, such as guards, backups being run or awareness training delivered."
   ],
   [
    "Physical control",
    "A control that protects facilities and hardware, such as fences, locks, bollards and access control vestibules."
   ]
  ],
  "example": "A hospital writes an acceptable use policy (managerial), trains nurses to lock workstations and assigns staff to review visitor logs (operational), enforces screen locks and full disk encryption on laptops (technical), and installs badge readers on the medication room door (physical).",
  "tip": "Category is about how a control is implemented; type is about what it does. If a question says 'which category', do not answer with preventive or detective.",
  "check": [
   [
    "A company requires every vendor to complete a security questionnaire before a contract is signed. Which control category is this?",
    "Managerial. It is an assessment and governance activity that directs how risk is handled, not a system or a physical barrier."
   ],
   [
    "A security guard checks IDs at the lobby. Which category is it?",
    "Operational, because a person performs it as part of daily operations. (By type it is preventive and also deterrent.)"
   ],
   [
    "Is a firewall rule set a technical or managerial control?",
    "Technical. It is enforced by a device automatically, even though a policy may have required it."
   ]
  ]
 },
 {
  "t": "Control types: preventive, deterrent, detective, corrective, compensating, directive",
  "body": [
   "Where the control category describes how a control is implemented, the control type describes what the control does in relation to an incident. Security+ lists six types: preventive, deterrent, detective, corrective, compensating and directive. Thinking about them as a timeline helps: some act before an incident, some during, and some after.",
   "Preventive controls stop an incident from happening at all. A firewall blocking a port, a locked door, MFA, and account permissions that deny access are preventive. Deterrent controls do not physically stop anything; they discourage an attacker by making the attempt look risky or unattractive. Warning signs, a login banner stating that activity is monitored, visible cameras and lighting are deterrents. The key test is: could a determined attacker simply ignore it? If yes, it is a deterrent rather than preventive.",
   "Detective controls identify and record that something happened or is happening. Log review, a security information and event management (SIEM) system raising an alert, an intrusion detection system (IDS), motion sensors and camera recordings reviewed later are detective. They do not stop the event, but they tell you it occurred so you can respond.",
   "Corrective controls reduce the impact after an event and return things to normal. Restoring from backups, reimaging an infected laptop, patching the exploited vulnerability, and an incident response playbook being executed are corrective. Some sources also mention recovery controls as a related idea; on SY0-701 the listed term is corrective.",
   "Compensating controls are alternatives used when the preferred control cannot be implemented, often for cost or technical reasons. If a legacy medical device cannot be patched, isolating it on its own network segment with strict firewall rules compensates for the missing patch. Compensating controls are commonly discussed with compliance frameworks, where you must show that the risk is still reduced to an acceptable level.",
   "Directive controls tell people what to do or not do. They rely on people choosing to follow them: a policy that says 'store confidential files only on the approved share', a sign reading 'authorized personnel only', or a procedure in an onboarding document. Directive and deterrent are easy to confuse. A directive control instructs; a deterrent control discourages through fear of consequences.",
   "Remember that one control can have more than one type. A visible camera is both a deterrent (people behave because they see it) and detective (it records events). On the exam, pick the type that best matches the wording of the scenario, usually the purpose the question stresses."
  ],
  "terms": [
   [
    "Preventive control",
    "A control that stops an incident before it happens, such as a firewall rule or door lock."
   ],
   [
    "Deterrent control",
    "A control that discourages an attack without physically stopping it, such as a warning sign or login banner."
   ],
   [
    "Detective control",
    "A control that identifies or records an event, such as log monitoring, an IDS or motion sensors."
   ],
   [
    "Corrective control",
    "A control that limits damage and restores normal operation after an event, such as restoring backups."
   ],
   [
    "Compensating control",
    "An alternative control used when the primary control is not feasible, reducing risk to an acceptable level."
   ],
   [
    "Directive control",
    "A control that instructs people what to do, such as a policy or procedure."
   ]
  ],
  "example": "An old factory controller runs software that can no longer be updated. The team cannot apply the preferred control (patching), so they place the controller on an isolated VLAN with an allow list that permits only the engineering workstation. That segmentation is a compensating control.",
  "tip": "If a determined person could walk past it, it is deterrent, not preventive. If it replaces a control you cannot use, it is compensating.",
  "check": [
   [
    "A login banner warns that unauthorized access is prosecuted. Which control type is it?",
    "Deterrent. It discourages misuse but does not technically stop anyone from logging in."
   ],
   [
    "After ransomware hits a file server, the team restores from last night's backup. Which type is the restore?",
    "Corrective. It reduces the impact and returns the system to normal after the incident."
   ],
   [
    "What makes a control compensating rather than simply preventive?",
    "It is used in place of a required or preferred control that cannot be implemented, providing equivalent risk reduction."
   ]
  ]
 },
 {
  "t": "CIA triad, AAA, non-repudiation",
  "body": [
   "The CIA triad is the basic model for what security protects. Confidentiality means only authorized people can read information. Integrity means information is accurate and has not been changed without authorization. Availability means systems and data are accessible to authorized users when they need them. Almost every control and attack on the exam can be tied back to one of these three. Encryption protects confidentiality, hashing and digital signatures protect integrity, and redundancy, backups and DDoS protection support availability.",
   "The three goals can pull against each other. Locking data down tightly improves confidentiality but can hurt availability if legitimate users cannot reach it. A good security design balances them according to what the business needs. A public website cares most about availability and integrity; a medical records system cares heavily about confidentiality and integrity.",
   "Non-repudiation means a person cannot credibly deny having performed an action, such as sending a message or approving a transaction. It is achieved mainly with digital signatures: only the holder of a private key could have created the signature, and anyone with the matching public key can verify it. Non-repudiation combines integrity (the message has not changed) with proof of origin (who created it). A shared password cannot provide non-repudiation, because several people could have used it.",
   "AAA stands for authentication, authorization and accounting. Before these comes identification, where a subject claims an identity, usually with a username. Authentication proves that claim using factors: something you know (password, PIN), something you have (a phone, smart card or hardware token), something you are (fingerprint, face), and sometimes somewhere you are (location). Authorization then decides what the authenticated subject is allowed to do, based on permissions, roles or policies. Accounting records what the subject actually did, through logs and audit trails, so activity can be reviewed and billed or investigated.",
   "Security+ also talks about authenticating systems, not only people. Devices can authenticate using certificates, for example a laptop presenting a machine certificate to join the corporate Wi-Fi, or a server proving its identity to a browser with a TLS certificate. Authorization models such as role-based access control come later in the course, but they all plug into the authorization step of AAA.",
   "In practice, AAA is often provided by a central service. RADIUS and TACACS+ are protocols used so that network devices such as VPN concentrators, switches and wireless controllers can check credentials against a central directory and log sessions, rather than each device keeping its own user list."
  ],
  "terms": [
   [
    "Confidentiality",
    "Ensuring information is disclosed only to authorized people, systems or processes."
   ],
   [
    "Integrity",
    "Ensuring information is accurate and has not been altered without authorization."
   ],
   [
    "Availability",
    "Ensuring systems and data are accessible to authorized users when needed."
   ],
   [
    "Non-repudiation",
    "Assurance that someone cannot deny an action they performed, typically provided by digital signatures."
   ],
   [
    "AAA",
    "Authentication, authorization and accounting: proving identity, granting permissions and recording activity."
   ]
  ],
  "example": "A finance manager signs a wire approval with a smart card. The signature proves who approved it and that the amount was not changed afterward (integrity and non-repudiation), the payment system checks that her role may approve wires (authorization), and every step is logged (accounting).",
  "tip": "Hashing alone gives integrity but not non-repudiation. For non-repudiation you need a digital signature tied to one person's private key.",
  "check": [
   [
    "An attacker floods a web server so customers cannot load it. Which part of the CIA triad is affected?",
    "Availability, because legitimate users cannot access the service."
   ],
   [
    "What is the difference between authentication and authorization?",
    "Authentication proves who you are; authorization determines what you are allowed to do once your identity is proven."
   ],
   [
    "Why does a shared admin account undermine accounting and non-repudiation?",
    "Actions cannot be tied to one individual, so logs cannot prove who did what and anyone can deny responsibility."
   ]
  ]
 },
 {
  "t": "Zero trust: control plane vs data plane, policy engine, PEP",
  "body": [
   "Traditional networks followed a castle-and-moat model: strong defenses at the perimeter, and anything already inside was largely trusted. That model breaks down when users work remotely, applications run in the cloud, and attackers who get one foothold can move laterally. Zero trust replaces implicit trust with the principle 'never trust, always verify'. Every request to access a resource is evaluated on its own merits, no matter where it comes from, and access is granted with least privilege for only as long as needed.",
   "Zero trust decisions rely on many signals. Adaptive identity considers who the user is plus context such as device health, location, time and behavior. Threat scope reduction means limiting what any single identity or device can reach, so a compromise has a small blast radius. Policy-driven access control means rules are defined centrally and applied consistently rather than configured separately on every device.",
   "SY0-701 describes zero trust architecture in two planes. The control plane is where decisions are made and managed. It contains the policy engine, which evaluates a request against policy and threat intelligence and decides grant, deny or revoke, and the policy administrator, which takes that decision and communicates it by setting up or tearing down the connection, for example by issuing a session token or credentials. Together they are sometimes called the policy decision point.",
   "The data plane is where the actual traffic flows between the subject (a user, device or application) and the resource. Its key component is the policy enforcement point (PEP). The PEP sits in the path of the traffic, like a gatekeeper. It forwards the access request to the control plane, then enforces whatever decision comes back: allowing the connection, blocking it or terminating it later if the policy administrator says so. The data plane also includes the concept of implicit trust zones: areas behind a PEP where traffic is trusted, which zero trust tries to make as small as possible.",
   "A simple way to remember the split: the control plane thinks, the data plane does. The policy engine decides, the policy administrator relays and configures, and the PEP enforces. In a real product this might look like an identity provider and conditional access rules (control plane) working with an identity-aware proxy or secure access gateway (PEP) in front of an internal web app.",
   "Zero trust is a strategy, not a single product. It is typically built from strong identity and MFA, device posture checks, microsegmentation, encryption of traffic everywhere, and continuous monitoring so that trust can be withdrawn mid-session if risk changes."
  ],
  "terms": [
   [
    "Zero trust",
    "A security model that grants no implicit trust based on network location and verifies every access request."
   ],
   [
    "Control plane",
    "The part of a zero trust architecture that makes and manages access decisions, including the policy engine and policy administrator."
   ],
   [
    "Policy engine",
    "The component that evaluates a request against policy and signals and decides to grant, deny or revoke access."
   ],
   [
    "Policy enforcement point (PEP)",
    "The data plane gateway that sits in the traffic path and enforces the control plane's decision."
   ],
   [
    "Data plane",
    "The part of the architecture where traffic between subjects and resources actually flows and is enforced."
   ]
  ],
  "example": "An employee on hotel Wi-Fi opens the internal HR portal. A gateway in front of the portal (the PEP) sends the request to the policy engine, which checks her identity, MFA result and that her laptop is encrypted and patched. The policy administrator issues a short-lived session, and the PEP lets that one connection through.",
  "tip": "Policy engine decides, policy administrator communicates, PEP enforces. The PEP is the only one of the three in the data plane.",
  "check": [
   [
    "Which zero trust component actually blocks or allows traffic?",
    "The policy enforcement point (PEP), which sits in the data plane."
   ],
   [
    "In which plane is the policy engine located?",
    "The control plane, where access decisions are made and managed."
   ],
   [
    "Why does zero trust reduce lateral movement?",
    "Because being inside the network grants no automatic trust; every request to each resource is verified and limited to least privilege."
   ]
  ]
 },
 {
  "t": "Physical security and deception tech (honeypots, honeynets, honeytokens)",
  "body": [
   "Physical security protects people, facilities and hardware. If an attacker can walk up to a server and remove its drives, most logical controls are bypassed, so the exam expects you to know the common physical controls and what each one is good for.",
   "Bollards are short sturdy posts that stop vehicles from reaching a building entrance while letting people through. Fences mark boundaries and slow intruders. An access control vestibule (older name: mantrap) is a small space with two doors where only one can open at a time, which prevents tailgating, the act of following an authorized person through a door. Security guards add human judgment and can verify identity, while video surveillance (CCTV) acts as both deterrent and detective control. Lighting deters intruders and helps cameras. Access badges tie entry to identity and create logs.",
   "Sensors detect physical events: infrared sensors detect body heat, pressure sensors detect weight on a floor or window, microwave sensors detect movement using reflected signals, and ultrasonic sensors use sound waves. The exam may give you a scenario and ask which sensor fits; focus on what each one measures.",
   "Deception technology takes a different approach. Instead of only blocking attackers, you plant attractive fakes and watch who touches them. Because no legitimate user has a reason to interact with a decoy, any interaction is a high-confidence alert with very few false positives.",
   "A honeypot is a single decoy system, for example a server that looks like a vulnerable database, designed to attract attackers so you can detect them and study their tools and techniques. A honeynet is a network of honeypots, which can simulate a whole environment and show how an attacker moves between systems. A honeyfile is a decoy file with an enticing name such as 'passwords.xlsx' placed on a share; opening it triggers an alert. A honeytoken is a piece of fake data, such as a dummy credential, API key, database record or email address, planted somewhere it should never be used. If that token ever shows up in a login attempt or in a leaked data dump, you know exactly where the breach came from.",
   "DNS sinkholing is also listed with deception and disruption: requests for known malicious domains are answered with an address you control, so infected hosts reveal themselves and cannot reach the real command server. Honeypots must be isolated from production so an attacker cannot use them as a launch point. In a lab you might run a simple honeypot service on an unused port and watch its log fill with scanning attempts from the internet."
  ],
  "terms": [
   [
    "Access control vestibule",
    "A two-door entry space where only one door opens at a time, preventing tailgating; formerly called a mantrap."
   ],
   [
    "Honeypot",
    "A decoy system built to attract and detect attackers and record their activity."
   ],
   [
    "Honeynet",
    "A network of honeypots that simulates a larger environment."
   ],
   [
    "Honeytoken",
    "Fake data, such as a dummy credential or record, whose use signals a compromise."
   ],
   [
    "Bollard",
    "A short, sturdy post that blocks vehicles from reaching a building or area."
   ]
  ],
  "example": "A security team adds a fake service account called 'svc_backup_admin' to the directory with no real use. Weeks later the SIEM alerts that someone tried to log in with it from a workstation in accounting. The honeytoken reveals that an attacker has dumped credentials from that machine.",
  "tip": "Honeypot = one decoy system, honeynet = many, honeyfile = a decoy file, honeytoken = fake data or credentials. Interaction with any of them is suspicious by definition.",
  "check": [
   [
    "What physical control stops tailgating most directly?",
    "An access control vestibule, because only one door opens at a time and each person must badge through."
   ],
   [
    "Why do honeytokens produce few false positives?",
    "Legitimate users have no reason to use them, so any use indicates unauthorized activity."
   ],
   [
    "What is the difference between a honeypot and a honeynet?",
    "A honeypot is a single decoy system; a honeynet is a network of decoy systems."
   ]
  ]
 },
 {
  "t": "Change management: approval, CAB, impact analysis, backout plan, maintenance window",
  "body": [
   "Change management is the formal process an organization uses to make changes to systems in a controlled way. It matters for security because unplanned or poorly tested changes cause outages (an availability problem) and can quietly open holes, such as a firewall rule that was meant to be temporary. A good process makes changes predictable, reviewed and reversible.",
   "A typical change starts with a request that describes what will change, why, and who owns it. The ownership piece matters: every change should have a clear owner accountable for it, and stakeholders, the people and teams affected, should be identified and consulted. Next comes impact analysis, which asks what could go wrong, which systems and users are affected, what the risk is if the change fails, and what the risk is of not making the change at all.",
   "The request then goes for approval. In many organizations this is done by a change advisory board (CAB), a group representing IT operations, security, application owners and the business. The CAB reviews the plan, risk, test results and scheduling before approving. Minor, low-risk, pre-approved changes (standard changes) may skip the full board, while emergency changes follow an expedited path and are reviewed afterward.",
   "Testing results should be part of the request: changes are tried in a test or staging environment before production. Every change also needs a backout plan, the documented steps to roll the system back to its previous state if something fails. Without a backout plan, a failed change can turn into a long outage. Snapshots, configuration backups and version control make backouts practical.",
   "Changes are scheduled into a maintenance window, a pre-agreed time when disruption has the least business impact, often at night or on weekends, and users are notified in advance. Standard operating procedures describe exactly how routine changes are carried out.",
   "Security+ also covers the technical implications of a change. A change may require a service or application restart, may cause downtime, may need an allow or deny list updated, or may involve legacy applications and dependencies that break unexpectedly. Afterward, documentation must be updated: network diagrams, policies, procedures, and version control records, so the next person knows the real current state. Out-of-date documentation is a real security weakness because incident responders rely on it.",
   "In your lab work, you practise this discipline even alone: take a snapshot before editing a configuration, write down the rollback step, make the change, test it, and record what you did."
  ],
  "terms": [
   [
    "Change advisory board (CAB)",
    "A group that reviews, prioritizes and approves proposed changes."
   ],
   [
    "Impact analysis",
    "An assessment of what a change affects and the risks of making or not making it."
   ],
   [
    "Backout plan",
    "Documented steps to reverse a change and restore the previous state if it fails."
   ],
   [
    "Maintenance window",
    "An agreed time period when changes can be made with minimal business disruption."
   ],
   [
    "Stakeholder",
    "A person or group affected by or interested in a change who should be consulted."
   ]
  ],
  "example": "A team wants to upgrade the VPN appliance firmware. They document the change, analyze impact on remote staff, test it in the lab, get CAB approval, schedule it for Saturday 2 a.m., save the current config as a backout plan, and update the network diagram afterward.",
  "tip": "If a question asks what to prepare in case a change fails, the answer is a backout plan. If it asks who approves changes, it is the CAB.",
  "check": [
   [
    "What is the purpose of a backout plan?",
    "To restore the system to its previous working state if the change fails or causes problems."
   ],
   [
    "Why are changes scheduled in maintenance windows?",
    "To minimize disruption to users and the business if downtime or problems occur."
   ],
   [
    "Why should documentation be updated after a change?",
    "So diagrams, procedures and configurations reflect reality; outdated documentation misleads troubleshooting and incident response."
   ]
  ]
 },
 {
  "t": "Symmetric vs asymmetric encryption, key exchange",
  "body": [
   "Encryption turns readable plaintext into unreadable ciphertext using an algorithm and a key, and decryption reverses it. The algorithm is usually public; the secrecy lives in the key. There are two families of encryption, and knowing when each is used is one of the most tested ideas in Domain 1.",
   "Symmetric encryption uses the same shared secret key to encrypt and decrypt. It is fast and efficient, which makes it ideal for encrypting large amounts of data: disks, files, database fields and the bulk of network traffic. The Advanced Encryption Standard (AES) is the common modern example, with key lengths of 128, 192 or 256 bits. Older symmetric algorithms such as DES and 3DES are considered weak or deprecated. Symmetric encryption has one big problem: key distribution. Both sides need the same key, and you cannot safely send it over the same untrusted channel you are trying to protect. It also scales poorly, because every pair of people needs its own key.",
   "Asymmetric encryption, also called public key cryptography, uses a mathematically related key pair. The public key can be shared with anyone; the private key is kept secret by its owner. Data encrypted with the public key can only be decrypted with the matching private key. Common asymmetric algorithms include RSA and elliptic curve cryptography (ECC), which offers similar strength with shorter keys and is attractive for mobile and low-power devices. Asymmetric operations are much slower than symmetric ones, so they are not used for bulk data.",
   "Key exchange solves symmetric encryption's distribution problem. Diffie-Hellman (DH) and its elliptic curve version (ECDH) let two parties who have never met agree on a shared secret over a public channel without ever sending that secret. An eavesdropper who sees all the exchanged values still cannot compute the key. Alternatively, one side can generate a random symmetric key and send it encrypted with the other side's public key.",
   "Real protocols combine both families in what is called a hybrid approach. When your browser connects over HTTPS, TLS uses asymmetric cryptography to authenticate the server via its certificate and a key exchange (typically ephemeral ECDH) to agree on a session key. From then on, the fast symmetric session key (for example AES) encrypts the actual traffic. Using ephemeral keys that are discarded after each session provides perfect forward secrecy: if the server's long-term private key is stolen later, past recorded sessions still cannot be decrypted.",
   "Other terms you may see: a block cipher encrypts fixed-size blocks (AES), while a stream cipher encrypts data a bit or byte at a time. Key length matters, because longer keys make brute-force attacks exponentially harder."
  ],
  "terms": [
   [
    "Symmetric encryption",
    "Encryption that uses one shared secret key for both encryption and decryption, such as AES."
   ],
   [
    "Asymmetric encryption",
    "Encryption that uses a public and private key pair, such as RSA or ECC."
   ],
   [
    "Diffie-Hellman",
    "A key exchange method that lets two parties derive a shared secret over an untrusted channel without transmitting it."
   ],
   [
    "Session key",
    "A temporary symmetric key used to encrypt one communication session."
   ],
   [
    "Perfect forward secrecy",
    "A property where compromise of a long-term key does not expose past session keys, achieved with ephemeral key exchange."
   ]
  ],
  "example": "When you log in to online banking, the TLS handshake uses the bank's certificate and an ECDH key exchange to agree on a session key. Your account data then travels encrypted with AES using that session key, which is thrown away when the session ends.",
  "tip": "Bulk data means symmetric. Key exchange, digital signatures and identity mean asymmetric. HTTPS uses both, which is why it is called hybrid.",
  "check": [
   [
    "Why is symmetric encryption used for bulk data instead of asymmetric?",
    "It is far faster and more efficient; asymmetric operations are computationally expensive."
   ],
   [
    "What problem does Diffie-Hellman solve?",
    "It lets two parties agree on a shared secret key over an insecure channel without sending the key itself."
   ],
   [
    "Which key decrypts data that was encrypted with someone's public key?",
    "The matching private key, held only by that person."
   ]
  ]
 },
 {
  "t": "Hashing, salting, key stretching",
  "body": [
   "A hash function takes input of any size and produces a fixed-length output called a hash or digest. Good cryptographic hashes are one-way (you cannot recover the input from the hash), deterministic (the same input always gives the same hash), and sensitive to change (flipping one bit of input changes the output completely). They should also be collision resistant, meaning it is impractical to find two different inputs with the same hash. Hashing is not encryption: there is no key and nothing to decrypt.",
   "Hashes are used mainly for integrity. If you download a file and compute its SHA-256 hash, you can compare it with the value the publisher lists; a match means the file was not altered. Common algorithms include the SHA-2 family (SHA-256, SHA-512) and SHA-3. MD5 and SHA-1 are older and have known collision weaknesses, so they should not be trusted for security purposes. On Linux you can run `sha256sum file.iso`, and on Windows `Get-FileHash file.iso` in PowerShell.",
   "Hashes are also how systems store passwords. Instead of saving the password, the system saves its hash, and at login it hashes what you type and compares. If the database is stolen, attackers do not get plain passwords directly. However, plain hashes are still vulnerable. Because hashing is deterministic, two users with the same password have the same hash, and attackers can use precomputed rainbow tables, huge lists of hashes for common passwords, to look them up instantly.",
   "Salting defends against this. A salt is a random value, unique per password, that is combined with the password before hashing and stored alongside the hash. Now identical passwords produce different hashes, and precomputed rainbow tables become useless because the attacker would need a table for every possible salt. The salt is not secret; its job is uniqueness.",
   "Key stretching makes each guess slower. Instead of hashing once, the system runs the hash (or a special algorithm) many thousands of times or deliberately uses lots of memory. A legitimate login barely notices the delay, but an attacker trying billions of guesses is slowed enormously. Common key stretching algorithms are PBKDF2, bcrypt, scrypt and Argon2. These are designed for passwords, unlike general-purpose fast hashes such as SHA-256.",
   "Related terms: an HMAC (hash-based message authentication code) combines a hash with a secret key so the receiver can verify both integrity and that the sender knew the key. A pepper is a secret value added to all passwords and stored separately from the database, adding protection if only the database is stolen."
  ],
  "terms": [
   [
    "Hash",
    "A fixed-length, one-way digest of data used to verify integrity."
   ],
   [
    "Salt",
    "A random, per-password value added before hashing so identical passwords produce different hashes and rainbow tables fail."
   ],
   [
    "Key stretching",
    "Repeatedly or expensively processing a password (PBKDF2, bcrypt, scrypt, Argon2) to slow down brute-force guessing."
   ],
   [
    "Rainbow table",
    "A precomputed lookup table of hashes for many possible passwords."
   ],
   [
    "Collision",
    "When two different inputs produce the same hash output."
   ]
  ],
  "example": "Two employees both choose 'Summer2026'. Because the system adds a unique salt to each before hashing with bcrypt, their stored hashes look completely different. When the database later leaks, attackers cannot use a rainbow table and must slowly guess each hash individually.",
  "tip": "Salting defeats rainbow tables; key stretching slows brute force. Hashing gives integrity, never confidentiality, because it is not reversible.",
  "check": [
   [
    "Why does a salt defeat rainbow tables?",
    "Each password is combined with a unique random value, so precomputed hashes of common passwords no longer match the stored hashes."
   ],
   [
    "Name two key stretching algorithms.",
    "Any two of PBKDF2, bcrypt, scrypt or Argon2."
   ],
   [
    "Which CIA goal does hashing a downloaded file support?",
    "Integrity, by confirming the file has not been altered."
   ]
  ]
 },
 {
  "t": "Encryption levels: full disk, partition, file, database, record",
  "body": [
   "Data at rest can be encrypted at different levels, from the whole drive down to a single field in a database. Each level protects against different threats, and choosing the right one is a common exam scenario. The guiding question is: who or what do you need to protect the data from, and when is it decrypted?",
   "Full disk encryption (FDE) encrypts an entire storage device, including the operating system, swap space and temporary files. BitLocker on Windows and FileVault on macOS are examples, and some drives do it in hardware as self-encrypting drives (SEDs). FDE protects against physical loss: if a laptop is stolen and powered off, the thief sees only ciphertext. The limitation is that once the system is booted and unlocked, data is transparently decrypted for anyone using the machine, including malware running as the logged-in user. FDE often uses a Trusted Platform Module (TPM) to protect the key.",
   "Partition or volume encryption encrypts only a specific partition or volume, for example a data volume on a server while the system volume stays unencrypted. It is useful when only some storage holds sensitive data or when different volumes need different keys.",
   "File-level encryption encrypts individual files or folders, such as with Windows Encrypting File System (EFS) or encrypting a single archive with a password. Protection can travel with the file and can be tied to specific users, so another user logged into the same computer still cannot open it. It is more granular but harder to manage at scale, and users may forget to use it.",
   "Volume-level and file-level approaches do not protect data inside a running database, because the database engine decrypts the storage to work with it. Database encryption addresses that. Transparent database encryption encrypts the database files on disk without changing applications. Record-level or column-level (field-level) encryption goes further, encrypting specific rows or columns, such as credit card numbers or national ID numbers, so that even database administrators or an attacker who runs queries sees ciphertext unless they hold the right key.",
   "Remember the other data states too. Data in transit is protected with protocols like TLS and IPsec, and data in use (in memory while being processed) is the hardest to protect, using technologies such as secure enclaves. Transport encryption and data-at-rest encryption complement each other; one does not replace the other.",
   "As a rule of thumb: stolen laptop, think full disk encryption. Sensitive fields in an application, think record or column encryption. Specific shared files, think file-level encryption."
  ],
  "terms": [
   [
    "Full disk encryption (FDE)",
    "Encryption of an entire storage device, protecting data if the device is lost or stolen while powered off."
   ],
   [
    "Self-encrypting drive (SED)",
    "A drive that performs encryption in its own hardware."
   ],
   [
    "File-level encryption",
    "Encryption applied to individual files or folders, often tied to specific users."
   ],
   [
    "Transparent database encryption",
    "Encryption of database files at rest without changes to the applications that use the database."
   ],
   [
    "Record-level encryption",
    "Encryption of individual rows or fields in a database so specific sensitive data stays protected even from authorized database users."
   ]
  ],
  "example": "A clinic encrypts staff laptops with BitLocker in case they are stolen, and its patient database encrypts the social security number column so that reports run by support staff show ciphertext for that field while still listing names and appointments.",
  "tip": "FDE protects a powered-off, lost device but not a running, logged-in system. If insiders or DBAs must not read a field, choose record or column encryption.",
  "check": [
   [
    "A company's main risk is laptops being lost in taxis. Which encryption level fits best?",
    "Full disk encryption, which protects all data on the device when it is powered off."
   ],
   [
    "Why does full disk encryption not stop malware on a logged-in laptop from reading files?",
    "Once the disk is unlocked at boot, data is transparently decrypted for any process running on the system."
   ],
   [
    "Which level protects a credit card column from database administrators?",
    "Record, column or field-level encryption within the database."
   ]
  ]
 },
 {
  "t": "Obfuscation: steganography, tokenization, data masking",
  "body": [
   "Obfuscation means making data hard to understand or find without necessarily encrypting it. Security+ groups three techniques under this heading: steganography, tokenization and data masking. They solve different problems, and exam questions usually describe a scenario and ask which one is in use.",
   "Steganography hides the existence of a message inside something ordinary, most often an image, audio or video file. For example, the least significant bits of pixels in a photo can be altered to carry hidden data without visibly changing the picture. The goal is concealment: an observer does not realize there is a message at all. Encryption, by contrast, makes a message unreadable but obvious. Attackers sometimes use steganography to smuggle data out of a network or to hide malicious code inside innocent-looking files, which is why data loss prevention and malware tools may analyze images. Steganography can be combined with encryption for extra protection.",
   "Tokenization replaces a sensitive value with a random substitute called a token that has no mathematical relationship to the original. The real value is stored in a secure token vault, and only the vault can map the token back. Payment systems use this heavily: a merchant stores a token instead of the credit card number, so a breach of the merchant's database exposes only useless tokens. Because the token is not derived from the data, it cannot be decrypted; you must query the vault. Tokenization also reduces how many systems handle the real data, which shrinks compliance scope.",
   "Data masking hides part or all of a value when it is displayed or copied, for example showing '****-****-****-1234' on a receipt or a support screen. Static masking permanently replaces real values with realistic fake ones, which is useful when creating copies of production data for developers and testers. Dynamic masking hides values on the fly depending on who is looking, so a customer service agent sees only the last four digits while the billing system still uses the full number.",
   "Compare them carefully. Encryption is reversible with a key. Hashing is one-way and used for integrity. Tokenization is reversible only through the vault lookup. Masking typically hides data from viewers, and static masking is not reversible. Steganography hides that data exists at all.",
   "These techniques support privacy regulations and the principle of data minimization: people and systems should see only the sensitive data they genuinely need."
  ],
  "terms": [
   [
    "Steganography",
    "Hiding data within another file or medium so its existence is concealed."
   ],
   [
    "Tokenization",
    "Replacing sensitive data with a random token and storing the original in a secure vault."
   ],
   [
    "Data masking",
    "Obscuring all or part of a data value, such as showing only the last four digits of a card number."
   ],
   [
    "Token vault",
    "The protected system that maps tokens back to the original sensitive values."
   ]
  ],
  "example": "An online store never stores card numbers. Its payment provider returns a token for each card, which the store saves for repeat purchases. When attackers later breach the store's database, they find only tokens that are worthless outside the provider's vault.",
  "tip": "No mathematical relationship to the original and a vault lookup means tokenization. Showing only the last four digits means masking. A hidden message inside an image means steganography.",
  "check": [
   [
    "Why can a stolen token not be decrypted?",
    "It is a random substitute with no mathematical link to the original value; only the token vault can map it back."
   ],
   [
    "A developer needs realistic test data without real customer information. Which technique fits?",
    "Static data masking, which replaces real values with realistic fake ones."
   ],
   [
    "How does steganography differ from encryption?",
    "Steganography hides that a message exists; encryption makes a visible message unreadable."
   ]
  ]
 },
 {
  "t": "Public/private keys, key escrow",
  "body": [
   "Asymmetric cryptography depends on key pairs. The two keys are generated together and are mathematically linked, but you cannot practically derive the private key from the public key. The public key is meant to be shared openly, often inside a digital certificate. The private key must stay under the owner's sole control, because anyone holding it can impersonate the owner and read messages meant for them.",
   "How the keys are used depends on the goal. For confidentiality, the sender encrypts with the recipient's public key, and only the recipient's private key can decrypt. For authenticity and integrity, the owner signs with their own private key, and anyone can verify the signature with the owner's public key. A useful memory aid: encrypt to someone with their public key, sign as yourself with your private key.",
   "Because the private key is so important, protecting it is a core part of key management. Keys may be stored in software keystores protected by a passphrase, on smart cards, in a Trusted Platform Module (TPM) on a laptop, or in a hardware security module (HSM) for servers and certificate authorities. Key management also covers generation with good randomness, distribution, rotation (replacing keys periodically), revocation when a key is compromised, and secure destruction at end of life.",
   "Key escrow is an arrangement where a copy of an encryption key is held by a trusted third party or a designated internal function, so data can be recovered if the original key is lost or if there is a legitimate need, such as a legal requirement or an employee leaving the company. Without escrow, data encrypted by someone who then leaves or loses their key could be permanently inaccessible. A familiar example is storing BitLocker recovery keys in a central directory so the help desk can unlock a laptop.",
   "Escrow introduces its own risk: the escrowed keys become a very valuable target. Escrow systems therefore need strong access controls, auditing, and often separation of duties or multiple-person approval (sometimes called M of N control) so no single administrator can retrieve a key alone. You may also see the related term key recovery agent, a role authorized to recover keys.",
   "Keep in mind that escrow is normally applied to encryption keys, not signing keys. If someone else held a copy of your signing key, you could argue that they signed a document, which would weaken non-repudiation."
  ],
  "terms": [
   [
    "Public key",
    "The shareable half of a key pair, used to encrypt data to its owner or to verify the owner's signatures."
   ],
   [
    "Private key",
    "The secret half of a key pair, used to decrypt data or create digital signatures; it must never be shared."
   ],
   [
    "Key escrow",
    "Storing a copy of an encryption key with a trusted party so data can be recovered when needed."
   ],
   [
    "Key management",
    "The lifecycle of keys: generation, storage, distribution, rotation, revocation and destruction."
   ]
  ],
  "example": "An engineer who encrypted design files leaves the company unexpectedly. Because the organization escrowed encryption keys in its key management system, a recovery agent, with a second manager's approval, retrieves the key and restores access to the files.",
  "tip": "To send someone a secret, use their public key. To sign, use your own private key. Escrow is for recovering encryption keys and should not be applied to signing keys used for non-repudiation.",
  "check": [
   [
    "Alice wants to send Bob a confidential message. Which key does she encrypt with?",
    "Bob's public key, so only Bob's private key can decrypt it."
   ],
   [
    "What problem does key escrow solve?",
    "It allows encrypted data to be recovered if a key is lost or its owner is unavailable."
   ],
   [
    "What risk does key escrow introduce, and how is it reduced?",
    "The escrow store becomes a high-value target; it is protected with strong access controls, auditing and multi-person approval."
   ]
  ]
 },
 {
  "t": "Certificates: CA, CSR, root of trust, self-signed, wildcard, SAN",
  "body": [
   "A public key alone does not tell you who owns it. A digital certificate solves that by binding a public key to an identity, such as a website's domain name or a person's email address, and having a trusted party vouch for that binding by signing it. Most certificates follow the X.509 standard and include the subject, the public key, the issuer, a serial number, a validity period, allowed uses and the issuer's signature.",
   "A certificate authority (CA) is the trusted organization that issues and signs certificates. Public CAs issue certificates that browsers and operating systems trust automatically; private or internal CAs are run by organizations for their own devices and users. Trust flows through a chain. At the top is a root CA whose self-signed root certificate is pre-installed in your operating system or browser trust store; this is the root of trust. Roots are kept offline and well protected, so they usually sign intermediate CA certificates, and intermediates sign the end-entity certificates for servers and users. When your browser checks a site, it walks the chain from the server certificate up to a trusted root.",
   "To obtain a certificate, you generate a key pair and create a certificate signing request (CSR). The CSR contains your public key and identity details and is signed with your private key to prove you hold it. The private key never leaves your system. The CA validates your identity or domain control and returns a signed certificate. You can see this in a lab with a tool such as OpenSSL, where one command creates a key and another produces a CSR file.",
   "A self-signed certificate is signed by its own private key rather than by a CA. It provides encryption but no third-party identity assurance, so browsers show a warning unless you manually trust it. Self-signed certificates are fine for labs and some internal testing but not for public services.",
   "Certificates can cover more than one name. A wildcard certificate uses an asterisk, such as *.example.com, to cover any single-level subdomain like www.example.com and mail.example.com, though not example.com itself or deeper names like a.b.example.com unless listed. It is convenient, but if its private key is stolen, every subdomain is exposed. The Subject Alternative Name (SAN) extension lists specific additional names, such as example.com, www.example.com and example.net, in one certificate. Modern browsers rely on the SAN field to match hostnames.",
   "Other terms you may meet: certificate pinning, where an application only accepts a specific certificate or key, and third-party versus internal CAs. The key idea throughout is that trust in a certificate is only as good as trust in its issuing chain."
  ],
  "terms": [
   [
    "Certificate authority (CA)",
    "A trusted entity that issues and digitally signs certificates."
   ],
   [
    "Certificate signing request (CSR)",
    "A request containing a public key and identity details sent to a CA to obtain a certificate."
   ],
   [
    "Root of trust",
    "The inherently trusted starting point, such as a root CA certificate in the trust store, from which trust in other certificates is derived."
   ],
   [
    "Wildcard certificate",
    "A certificate that secures all single-level subdomains of a domain, such as *.example.com."
   ],
   [
    "Subject Alternative Name (SAN)",
    "A certificate extension listing additional hostnames or identities the certificate is valid for."
   ]
  ],
  "example": "A company needs one certificate for example.com, www.example.com and shop.example.org. A wildcard for *.example.com would not cover example.com itself or the separate domain example.org, so they request a SAN certificate listing all three names, generate the CSR on the web server, and install the signed certificate with its intermediate chain.",
  "tip": "A wildcard covers many subdomains of one domain; a SAN lists specific names, even across different domains. Self-signed means no CA vouches for it.",
  "check": [
   [
    "What does a CSR contain, and what does it not contain?",
    "It contains the public key and identity details; it never contains the private key."
   ],
   [
    "Would *.example.com cover login.eu.example.com?",
    "No. A wildcard covers only one subdomain level, such as eu.example.com, not deeper names."
   ],
   [
    "Why do browsers warn about self-signed certificates?",
    "They are not signed by a CA in the trust store, so there is no chain to a trusted root verifying the identity."
   ]
  ]
 },
 {
  "t": "Revocation: CRL vs OCSP, OCSP stapling",
  "body": [
   "Certificates have an expiry date, but sometimes a certificate must stop being trusted before then. The private key might be stolen, the server might be decommissioned, an employee holding a user certificate might leave, or the CA might discover the certificate was issued in error. Revocation is how a CA announces that a certificate is no longer valid, and clients need a way to check that status before trusting a certificate.",
   "The original method is the certificate revocation list (CRL). The CA periodically publishes a signed list of the serial numbers of revoked certificates, along with the reason and date. Clients download the CRL from a location named in the certificate (the CRL distribution point) and check whether the certificate's serial number appears. CRLs are simple and work offline once downloaded, but they have drawbacks: lists can grow large, and because they are published on a schedule, a newly revoked certificate may not appear until the next update, leaving a window where it is still accepted.",
   "The Online Certificate Status Protocol (OCSP) answers the question for one certificate at a time. The client sends the certificate's serial number to the CA's OCSP responder and receives a signed response of good, revoked or unknown. This is faster and closer to real time than downloading a whole list. However, it adds a network request to every connection, it creates load on the CA, and it has a privacy issue: the CA learns which sites each client is visiting. If the responder is unreachable, many clients 'soft fail' and accept the certificate anyway, which weakens the check.",
   "OCSP stapling fixes most of these problems. Instead of every client asking the CA, the web server itself periodically obtains a signed, time-stamped OCSP response for its own certificate and 'staples' it to the TLS handshake. The client verifies the CA's signature on the stapled response, so the server cannot forge it. The result is faster connections, less load on the CA, and no leak of browsing information to the CA.",
   "Also know the difference between revoked and suspended. A suspended certificate is placed on hold temporarily, for example while an investigation happens, and can later be reinstated; a revoked certificate is permanently invalid. And do not confuse revocation with expiry: an expired certificate simply reached the end of its validity period.",
   "In practice, you can see revocation information in a certificate's details in a browser or with OpenSSL, where the CRL distribution point and the OCSP responder address (in the Authority Information Access field) are listed."
  ],
  "terms": [
   [
    "Certificate revocation list (CRL)",
    "A signed list, published periodically by a CA, of serial numbers of certificates it has revoked."
   ],
   [
    "OCSP",
    "Online Certificate Status Protocol, which lets a client query the real-time status of a single certificate."
   ],
   [
    "OCSP stapling",
    "The server attaches a recent CA-signed OCSP response to the TLS handshake so clients need not contact the CA."
   ],
   [
    "Suspension",
    "A temporary hold on a certificate that can later be lifted, unlike permanent revocation."
   ]
  ],
  "example": "A company discovers its web server was breached and the private key may have been copied. It asks the CA to revoke the certificate, installs a new one with a fresh key, and relies on OCSP stapling so visitors' browsers get current status without each one querying the CA.",
  "tip": "CRL = download a whole list on a schedule. OCSP = ask about one certificate in near real time. Stapling = the server fetches and presents the OCSP response itself, improving speed and privacy.",
  "check": [
   [
    "What is a main disadvantage of CRLs?",
    "They are published periodically and can be large, so a recently revoked certificate may still be accepted until the next update."
   ],
   [
    "How does OCSP stapling improve privacy?",
    "Clients no longer contact the CA for each site, so the CA does not learn which sites users visit."
   ],
   [
    "Why can't a malicious server fake a stapled OCSP response?",
    "The response is signed by the CA, and the client verifies that signature."
   ]
  ]
 },
 {
  "t": "Digital signatures",
  "body": [
   "A digital signature proves who created a piece of data and that it has not been changed since. It provides three of the security goals you have met so far: integrity, authentication of the origin, and non-repudiation. It does not provide confidentiality; a signed document can still be read by anyone unless it is also encrypted.",
   "Signing works by combining hashing with asymmetric cryptography. First, the sender hashes the message, producing a short digest. Second, the sender uses their private key to sign that digest. The resulting signature is sent along with the message. Hashing first is important because asymmetric operations are slow, and signing a fixed-size digest is far more efficient than signing a large file.",
   "Verification is the reverse. The recipient computes their own hash of the message they received. Then they use the sender's public key to verify the signature, which confirms the signature was created over a particular digest by the matching private key. If the digests match, two things are proven: the message has not been altered (integrity) and it was signed by whoever holds that private key (authenticity). Because only the owner should hold the private key, they cannot plausibly deny signing (non-repudiation). If even one bit of the message changed, the hashes would not match and verification fails.",
   "How does the recipient know the public key really belongs to the sender? That is where certificates come in. The sender's public key is usually delivered in a certificate issued by a trusted CA, so verifying a signature often includes validating the certificate chain and checking revocation.",
   "Digital signatures are everywhere. Code signing lets operating systems verify that software comes from the named publisher and was not tampered with after signing, and many systems warn or block when code is unsigned. Email security standards such as S/MIME sign messages. DNSSEC signs DNS records so resolvers can detect forged answers. Signed firmware and secure boot check that low-level code comes from the vendor. Document signing platforms use signatures for contracts.",
   "Compare digital signatures to related tools. A plain hash gives integrity but anyone can recompute a hash for a modified file, so it does not prove who created it. An HMAC uses a shared secret key, so it proves the message came from someone with the key, but since both sides share it, it cannot provide non-repudiation. Only a signature tied to one person's private key does."
  ],
  "terms": [
   [
    "Digital signature",
    "A value created with a private key over a hash of data that proves integrity, origin and non-repudiation."
   ],
   [
    "Code signing",
    "Digitally signing software so users and operating systems can verify its publisher and that it is unaltered."
   ],
   [
    "Message digest",
    "The fixed-length hash of a message that is signed rather than the whole message."
   ],
   [
    "Verification",
    "Using the signer's public key and a recomputed hash to confirm a signature is valid."
   ]
  ],
  "example": "Before installing a driver, Windows checks its code signature. The vendor had hashed the driver and signed the hash with its private key. Windows recomputes the hash, verifies the signature with the vendor's public key from its certificate, and would refuse the driver if an attacker had modified it.",
  "tip": "Sign with the sender's private key, verify with the sender's public key. Signatures give integrity, authentication and non-repudiation, but not confidentiality.",
  "check": [
   [
    "Which key does the recipient use to verify a digital signature?",
    "The sender's public key."
   ],
   [
    "Why can an HMAC not provide non-repudiation?",
    "Both parties share the same secret key, so either could have produced the HMAC."
   ],
   [
    "What happens to verification if a signed file is changed by one byte?",
    "The recomputed hash no longer matches the signed digest, so verification fails."
   ]
  ]
 },
 {
  "t": "TPM, HSM, secure enclave, key management system",
  "body": [
   "Cryptography is only as strong as the protection of its keys. If a private key sits in a plain file on disk, malware or a thief can copy it. Security+ covers several hardware and software tools designed to generate, store and use keys while keeping them out of reach.",
   "A Trusted Platform Module (TPM) is a chip, or firmware equivalent, built into a computer's motherboard. It can generate and store keys securely, and those keys generally cannot be exported. A TPM supports secure and measured boot by recording hashes of the boot components in special registers; if the firmware or bootloader has been tampered with, the measurements change. Full disk encryption tools such as BitLocker use the TPM to release the disk key only when the boot measurements match, so moving the drive to another computer or altering the bootloader prevents automatic unlocking. A TPM also supports remote attestation, where a device proves its boot state to a management server. A TPM is tied to one device.",
   "A hardware security module (HSM) is a dedicated, tamper-resistant device (an appliance, an expansion card or a cloud service) built to generate, store and use keys at high volume. Certificate authorities, banks and payment processors use HSMs to protect their most sensitive keys, such as CA signing keys. HSMs perform cryptographic operations internally so keys never leave in plaintext, often accelerate cryptographic processing, and are designed to detect physical tampering and erase keys if attacked. The simple distinction: TPM is per-device and built in; HSM is enterprise-scale and serves many systems.",
   "A secure enclave is an isolated, protected area of a processor that runs code and handles data separately from the main operating system. Even if the operating system is compromised, the enclave's memory stays protected. Phones and computers use secure enclaves to store biometric data and payment keys, and enclaves are one of the main ways to protect data in use, while it is being processed.",
   "A key management system (KMS) is the centralized service that manages the lifecycle of keys across an organization: generating keys, storing them (often backed by an HSM), controlling who and what can use them, rotating them on a schedule, logging all key usage, and revoking or destroying them when needed. Cloud providers offer KMS services that let you encrypt storage and databases with keys you control. The KMS brings policy and auditing to key usage, while the HSM supplies the hardened storage underneath.",
   "When choosing among them in a question, look for clues: 'laptop', 'boot integrity' or 'BitLocker' points to TPM; 'certificate authority', 'high volume' or 'tamper resistant appliance' points to HSM; 'isolated processor area' or 'data in use' points to secure enclave; 'central rotation and auditing of keys' points to a KMS."
  ],
  "terms": [
   [
    "Trusted Platform Module (TPM)",
    "A chip on a device's motherboard that securely stores keys and supports secure and measured boot."
   ],
   [
    "Hardware security module (HSM)",
    "A dedicated, tamper-resistant device that securely generates, stores and uses cryptographic keys at enterprise scale."
   ],
   [
    "Secure enclave",
    "An isolated processor area that protects code and data from the main operating system, even while in use."
   ],
   [
    "Key management system (KMS)",
    "A centralized service for managing the full lifecycle, access and auditing of cryptographic keys."
   ]
  ],
  "example": "A company's internal CA stores its signing key in an HSM, employee laptops keep BitLocker keys in their TPMs, the phones used for MFA protect biometric templates in a secure enclave, and the cloud team uses the provider's KMS to rotate the database encryption keys every year.",
  "tip": "TPM = one device, built in, boot integrity. HSM = dedicated enterprise appliance for many keys. Do not swap them on the exam.",
  "check": [
   [
    "Which technology would protect a certificate authority's root signing key?",
    "A hardware security module (HSM)."
   ],
   [
    "How does a TPM help detect a tampered bootloader?",
    "It measures boot components into its registers; changed measurements mean the TPM will not release keys and attestation fails."
   ],
   [
    "What does a KMS add beyond secure key storage?",
    "Centralized lifecycle management: access control, rotation, auditing and revocation of keys."
   ]
  ]
 },
 {
  "t": "OSI layers and where attacks happen",
  "body": [
   "The Open Systems Interconnection (OSI) model divides network communication into seven layers. Knowing the layers helps you describe where a device works, where an attack happens and which control defends against it. A common memory aid from the bottom up is 'Please Do Not Throw Sausage Pizza Away': Physical, Data link, Network, Transport, Session, Presentation, Application.",
   "Layer 1, Physical, is the cabling, radio signals and connectors that carry bits. Attacks here include cutting cables, wiretapping, jamming wireless signals, and plugging rogue devices into open wall jacks. Defenses are physical: locked wiring closets, disabled unused ports, and shielding. Layer 2, Data link, moves frames within a local network using MAC addresses; switches work here. Layer 2 attacks include MAC flooding (overwhelming a switch's address table so it floods traffic), MAC spoofing, ARP poisoning and VLAN hopping. Port security, 802.1X network access control and dynamic ARP inspection help.",
   "Layer 3, Network, routes packets between networks using IP addresses; routers and many firewalls operate here. IP spoofing, route manipulation and ICMP-based floods live here, along with IPsec as a Layer 3 protection. Layer 4, Transport, handles end-to-end delivery with TCP (connection-oriented and reliable) and UDP (connectionless and fast), and it is where port numbers live. SYN floods, which exhaust a server by leaving many half-open TCP connections, and port scanning are Layer 4 activities. Stateful firewalls track Layer 4 connections.",
   "Layer 5, Session, manages sessions between applications, and session hijacking is associated with it. Layer 6, Presentation, handles data formatting, character encoding, compression and encryption; TLS is often described in relation to layers 5 and 6. Layer 7, Application, is where users and applications interact with the network: HTTP, DNS, SMTP and so on. Many modern attacks happen here, including SQL injection, cross-site scripting, phishing links and application-layer DDoS attacks that send expensive but legitimate-looking requests. Web application firewalls (WAFs) and next-generation firewalls inspect Layer 7.",
   "The exam often uses layer numbers as shorthand. 'A Layer 4 firewall' filters on IP addresses, protocols and ports. 'A Layer 7 firewall' can understand the application, for example blocking a specific web request pattern or a particular app regardless of port. A 'Layer 2 attack' stays inside a broadcast domain, which is why segmentation with VLANs and routing limits its reach.",
   "You will also meet the simpler TCP/IP model, which merges the top three OSI layers into one application layer and the bottom two into a link layer. Security+ questions mostly use OSI numbers, so it is worth memorizing all seven with an example device and an example attack for each."
  ],
  "terms": [
   [
    "OSI model",
    "A seven-layer reference model describing how network communication is divided into functions."
   ],
   [
    "Layer 2 (Data link)",
    "The layer that moves frames using MAC addresses within a local network; switches operate here."
   ],
   [
    "Layer 4 (Transport)",
    "The layer that handles end-to-end delivery with TCP and UDP and uses port numbers."
   ],
   [
    "Layer 7 (Application)",
    "The layer where applications and protocols such as HTTP and DNS operate; WAFs inspect traffic here."
   ],
   [
    "SYN flood",
    "A denial-of-service attack that sends many TCP connection requests without completing the handshake."
   ]
  ],
  "example": "An online shop's traditional firewall allows port 443 but cannot see that incoming requests contain SQL injection attempts. The team adds a web application firewall that inspects the HTTP content at Layer 7 and blocks the malicious requests while allowing normal traffic.",
  "tip": "Map attacks to layers: MAC flooding and ARP poisoning are Layer 2, IP spoofing is Layer 3, SYN floods and port scans are Layer 4, SQL injection and XSS are Layer 7.",
  "check": [
   [
    "At which OSI layer does a switch forward traffic using MAC addresses?",
    "Layer 2, the data link layer."
   ],
   [
    "Which layer's attack is a SYN flood?",
    "Layer 4, the transport layer, because it abuses the TCP handshake."
   ],
   [
    "Why can a Layer 7 firewall block something a Layer 4 firewall cannot?",
    "It inspects application content, such as HTTP requests, rather than only addresses, protocols and ports."
   ]
  ]
 },
 {
  "t": "Secure vs insecure protocols: SSH/Telnet, SFTP/FTP, LDAPS/LDAP, HTTPS/HTTP, SNMPv3",
  "body": [
   "Many older network protocols were designed when networks were small and trusted, so they send everything, including usernames and passwords, in cleartext. Anyone who can capture the traffic, for example with a packet analyzer on the same network or a compromised router along the path, can read it. The exam repeatedly asks you to pick the secure replacement for an insecure protocol, so learn them as pairs.",
   "Telnet provides remote command-line access on TCP port 23 and sends credentials and commands in cleartext. Secure Shell (SSH), on TCP port 22, replaces it with encrypted, authenticated sessions and supports key-based login. In a lab, you connect with `ssh user@host` rather than `telnet host`. SSH also underpins secure file transfer.",
   "File Transfer Protocol (FTP) uses TCP ports 20 and 21 and sends credentials and data unencrypted. There are two secure replacements that are easy to confuse. SFTP (SSH File Transfer Protocol) runs over SSH on port 22; it is a different protocol from FTP. FTPS is FTP with TLS added. Similarly, TFTP (Trivial FTP) has no authentication at all and should be limited to tightly controlled uses.",
   "Lightweight Directory Access Protocol (LDAP) queries directory services such as Active Directory on port 389. Simple binds over plain LDAP can expose credentials. LDAPS is LDAP over TLS, traditionally on port 636. HTTP on port 80 sends web traffic in cleartext; HTTPS is HTTP over TLS on port 443, which encrypts the traffic and authenticates the server with a certificate. Similarly, email protocols have secure versions: SMTP with TLS for submission, IMAPS and POP3S for retrieval.",
   "Simple Network Management Protocol (SNMP) monitors and manages network devices. SNMPv1 and v2c authenticate with 'community strings', which act like shared passwords, are sent in cleartext and are often left at defaults such as 'public'. SNMPv3 adds authentication, integrity and encryption, so it is the secure choice. Other secure pairs worth knowing include DNS versus DNSSEC (which adds integrity to DNS records through signatures) and RDP with Network Level Authentication and encryption rather than exposing it openly.",
   "When you secure a service, also disable the insecure version rather than running both, otherwise an attacker may force or trick clients into using the weaker one. And note that TLS is the modern name; SSL is its deprecated predecessor, and you should treat any SSL version as insecure."
  ],
  "terms": [
   [
    "SSH",
    "Secure Shell, an encrypted remote access protocol on TCP port 22 that replaces Telnet."
   ],
   [
    "SFTP",
    "SSH File Transfer Protocol, secure file transfer running over SSH on port 22."
   ],
   [
    "FTPS",
    "FTP secured with TLS."
   ],
   [
    "LDAPS",
    "LDAP over TLS, traditionally on port 636, protecting directory queries and credentials."
   ],
   [
    "SNMPv3",
    "The version of SNMP that adds authentication and encryption, replacing cleartext community strings."
   ]
  ],
  "example": "An audit finds network switches managed with Telnet and monitored with SNMPv2c using the community string 'public'. The team enables SSH and disables Telnet, moves monitoring to SNMPv3 with authentication and encryption, and restricts management access to an admin VLAN.",
  "tip": "SFTP runs over SSH on port 22; FTPS is FTP plus TLS. The exam likes to test that difference, and that SNMPv3 is the only secure SNMP version.",
  "check": [
   [
    "What is the secure replacement for Telnet?",
    "SSH, which encrypts the session on TCP port 22."
   ],
   [
    "Why are SNMPv1 and v2c considered insecure?",
    "They use community strings sent in cleartext and provide no encryption."
   ],
   [
    "A company needs to secure directory queries to Active Directory. Which protocol should it use?",
    "LDAPS, which wraps LDAP in TLS."
   ]
  ]
 },
 {
  "t": "Key ports: 22, 25, 53, 80, 443, 389, 636, 3389",
  "body": [
   "A port number identifies which service on a host should receive network traffic. The IP address gets a packet to the right machine; the port gets it to the right program. Well-known ports (0 to 1023) are assigned to common services, and knowing the most important ones lets you read firewall rules, understand scan results and spot suspicious traffic. Security+ expects you to recognize these by heart.",
   "Port 22 (TCP) is SSH, used for encrypted remote administration and also for SFTP and SCP file transfer. Because it offers administrative access, it is heavily scanned and brute-forced on the internet; restrict who can reach it and prefer key-based authentication. Port 25 (TCP) is SMTP, used for sending mail between mail servers. Many networks block outbound port 25 from ordinary workstations, because malware that sends spam or exfiltrates data may use it directly. Mail clients typically submit mail on port 587 with authentication and TLS.",
   "Port 53 is DNS. It uses UDP for most queries and TCP for zone transfers and large responses. DNS traffic is almost always allowed through firewalls, which is why attackers sometimes abuse it for tunneling data out of a network. Unexpected hosts running their own DNS servers or very large volumes of unusual DNS queries are worth investigating.",
   "Port 80 (TCP) is HTTP, unencrypted web traffic, and port 443 (TCP) is HTTPS, web traffic protected by TLS. Most sites redirect port 80 to 443. Port 443 is also used by many other services and VPNs because it is rarely blocked, which again means attackers like to hide there.",
   "Port 389 is LDAP, used to query directory services such as Active Directory, and port 636 is LDAPS, LDAP over TLS. Port 3389 (TCP) is the Remote Desktop Protocol (RDP), Microsoft's graphical remote access protocol. Exposing RDP directly to the internet is a common way ransomware groups gain entry, through password guessing or unpatched vulnerabilities, so it should sit behind a VPN or gateway with MFA.",
   "A few more are worth knowing even though they are not in the topic title: 21 (FTP), 23 (Telnet), 123 (NTP), 161 and 162 (SNMP), 445 (SMB file sharing) and 1812 (RADIUS). In a lab, a port scan with a tool like Nmap produces a list such as '22/tcp open ssh, 3389/tcp open ms-wbt-server'; you should immediately know what each service is and whether it should be exposed. Only scan systems you own or are authorized to test.",
   "A good memory approach is to pair the insecure and secure versions: 23 and 22, 80 and 443, 389 and 636."
  ],
  "terms": [
   [
    "Port",
    "A number that identifies a specific service or application on a host for TCP or UDP traffic."
   ],
   [
    "Port 3389",
    "The default port for Remote Desktop Protocol (RDP)."
   ],
   [
    "Port 53",
    "The DNS port, using UDP for queries and TCP for zone transfers and large responses."
   ],
   [
    "Port 636",
    "The traditional port for LDAPS, LDAP secured with TLS."
   ]
  ],
  "example": "A firewall review finds an inbound rule allowing any internet address to reach port 3389 on a file server. The analyst recognizes it as RDP exposed to the internet, removes the rule, and requires staff to connect through the VPN with MFA before using Remote Desktop.",
  "tip": "Pairs help: 22 SSH, 23 Telnet; 80 HTTP, 443 HTTPS; 389 LDAP, 636 LDAPS. 25 is SMTP, 53 is DNS and 3389 is RDP.",
  "check": [
   [
    "Which port and protocol does Remote Desktop use?",
    "TCP port 3389, RDP."
   ],
   [
    "Why might an analyst be concerned about many workstations connecting outbound on port 25?",
    "Port 25 is SMTP; ordinary workstations should not send mail directly, so it may indicate spam-sending malware or exfiltration."
   ],
   [
    "When does DNS use TCP instead of UDP?",
    "For zone transfers and responses too large for a normal UDP reply."
   ]
  ]
 },
 {
  "t": "ARP, DNS, DHCP and their attacks",
  "body": [
   "Three quiet protocols make every network work, and all three were designed with little built-in security. Understanding how they normally work makes their attacks easy to recognize.",
   "The Address Resolution Protocol (ARP) maps an IP address to a MAC address on the local network. When your computer wants to reach the gateway at 192.168.1.1, it broadcasts 'who has 192.168.1.1?' and the gateway replies with its MAC address, which your computer caches. ARP has no authentication, and hosts accept replies even when they did not ask. In ARP poisoning (ARP spoofing), an attacker on the same network sends forged replies claiming that the gateway's IP address belongs to the attacker's MAC address. Victims then send their traffic to the attacker, who can read or alter it before forwarding it on. This is a classic on-path (man-in-the-middle) attack. Signs include duplicate MAC addresses for different IPs in `arp -a` output. Defenses include dynamic ARP inspection on switches, static ARP entries for critical hosts, segmentation, and encrypting traffic so intercepted data is useless.",
   "The Domain Name System (DNS) translates names like www.example.com into IP addresses. Your device asks a resolver, which queries other DNS servers and caches answers. In DNS poisoning (cache poisoning), an attacker inserts false records into a resolver's cache so users are silently sent to a malicious server. Attackers can also change the hosts file on a victim machine, compromise the domain's registration account (domain hijacking), or change a device's configured DNS server. DNSSEC defends by signing DNS records so resolvers can detect forged answers. DNS is also abused for tunneling, hiding data inside queries to sneak it out of a network, and for amplification DDoS, where small spoofed queries produce large responses aimed at a victim. Monitoring DNS logs is one of the most valuable detective controls you can run.",
   "The Dynamic Host Configuration Protocol (DHCP) automatically gives devices an IP address, subnet mask, default gateway and DNS server. A client broadcasts a discover message, and a server offers a lease. A rogue DHCP server, whether malicious or someone's home router plugged in by mistake, can answer first and hand out itself as the gateway or DNS server, putting the attacker on-path for all traffic. DHCP starvation floods the real server with requests using fake MAC addresses until its address pool is exhausted, causing a denial of service or clearing the way for a rogue server. DHCP snooping on switches defends against both by allowing DHCP server responses only from trusted ports and limiting request rates.",
   "Notice the pattern: each attack exploits the fact that the protocol trusts whoever answers. Switch features (dynamic ARP inspection, DHCP snooping, port security), DNSSEC, network access control and encryption with TLS are the core mitigations, and all three attacks require some kind of local or upstream position, which is another reason segmentation matters."
  ],
  "terms": [
   [
    "ARP poisoning",
    "Sending forged ARP replies to associate the attacker's MAC address with another host's IP address, enabling on-path attacks."
   ],
   [
    "DNS poisoning",
    "Inserting false records into a DNS cache so users are redirected to malicious addresses."
   ],
   [
    "Rogue DHCP server",
    "An unauthorized DHCP server that hands out incorrect settings, such as a malicious gateway or DNS server."
   ],
   [
    "DHCP snooping",
    "A switch feature that allows DHCP server responses only on trusted ports."
   ],
   [
    "DNSSEC",
    "DNS Security Extensions, which digitally sign DNS records so resolvers can verify their authenticity and integrity."
   ]
  ],
  "example": "Several users on a floor suddenly get certificate warnings on every website. An analyst finds that their default gateway MAC address in the ARP cache matches a desktop PC rather than the router, indicating ARP poisoning. The switch port is shut down and dynamic ARP inspection is enabled.",
  "tip": "ARP poisoning is Layer 2 and local-network only. If users are redirected to a fake site even with correct ARP entries, suspect DNS poisoning. If clients receive the wrong gateway, suspect a rogue DHCP server.",
  "check": [
   [
    "Which switch feature stops a rogue DHCP server from handing out addresses?",
    "DHCP snooping, which only trusts DHCP responses from designated ports."
   ],
   [
    "What does DNSSEC protect against?",
    "Forged or altered DNS answers such as cache poisoning, by letting resolvers verify signatures on records."
   ],
   [
    "Why does ARP poisoning work?",
    "ARP has no authentication and hosts accept unsolicited replies, so an attacker can falsely claim another IP's MAC address."
   ]
  ]
 },
 {
  "t": "Actors: nation-state, organized crime, hacktivist, insider, unskilled attacker, shadow IT",
  "body": [
   "A threat actor is the person or group behind an attack. Security+ asks you to recognize the main types and describe them by a few attributes: whether they are internal or external, their level of resources and funding, and their level of sophistication or capability. Knowing the likely actor helps you choose defenses, because a bored teenager and a foreign intelligence service require very different levels of protection.",
   "Nation-state actors are sponsored by governments. They are external, extremely well funded and highly sophisticated, able to develop custom tools and exploit previously unknown vulnerabilities. They are patient and persistent, often staying hidden for long periods, which is why the term advanced persistent threat (APT) is closely associated with them. Their targets include government agencies, defense contractors, critical infrastructure and companies with valuable intellectual property.",
   "Organized crime groups are external and well resourced, run like businesses with specialized roles. Their motivation is overwhelmingly financial: ransomware, extortion, fraud, and stealing and selling data. They can be quite sophisticated and may buy tools and access from other criminals.",
   "Hacktivists attack to promote a political or social cause. They are external, usually moderately resourced, and their methods tend to be visible: website defacement, DDoS attacks, and leaking data to embarrass a target. Their sophistication varies widely.",
   "An insider threat comes from someone with legitimate access: an employee, contractor or partner. Insiders are dangerous because they are already past many controls and know where valuable data lives. They may be malicious, motivated by revenge or money, or unintentional, making mistakes such as sending data to the wrong recipient or falling for phishing. Their resources are usually limited, but their access is significant. Defenses include least privilege, separation of duties, monitoring and good offboarding.",
   "An unskilled attacker (older term: script kiddie) uses tools and scripts written by others without deeply understanding them. They are external, have low resources and low sophistication, and often act for curiosity or notoriety. They still cause real damage when basic hygiene such as patching is missing.",
   "Shadow IT is not a malicious actor in the usual sense. It refers to employees or departments using hardware, software or cloud services without IT's approval, such as a team signing up for a file sharing service on a personal credit card. It is internal and usually well intentioned, but it creates unmanaged, unmonitored systems that may hold company data without proper security. The answer is usually governance and offering approved alternatives, not punishment alone."
  ],
  "terms": [
   [
    "Nation-state actor",
    "A government-sponsored attacker with high resources and sophistication, often conducting long-term espionage."
   ],
   [
    "Advanced persistent threat (APT)",
    "A skilled, well-resourced attacker that maintains long-term, stealthy access to a target."
   ],
   [
    "Insider threat",
    "A risk posed by someone with legitimate access who misuses it, intentionally or accidentally."
   ],
   [
    "Unskilled attacker",
    "An attacker with low skill who relies on existing tools and scripts."
   ],
   [
    "Shadow IT",
    "Technology used within an organization without the approval or knowledge of the IT department."
   ]
  ],
  "example": "A marketing team starts storing customer lists in an unapproved cloud spreadsheet service to move faster. No one in IT knows it exists, so it has no MFA and a public sharing link. This shadow IT exposes data without any attacker being involved at first.",
  "tip": "Match attributes: highest resources and patience means nation-state; money means organized crime; a cause means hacktivist; legitimate access means insider; low skill with borrowed tools means unskilled attacker.",
  "check": [
   [
    "Which actor type is most associated with APTs?",
    "Nation-state actors, because they have the resources and patience for long-term stealthy operations."
   ],
   [
    "Why are insiders especially dangerous?",
    "They already have legitimate access and knowledge of systems, so many perimeter controls do not apply to them."
   ],
   [
    "Is shadow IT usually malicious?",
    "No. It is typically well-intentioned staff using unapproved technology, but it creates unmanaged security risk."
   ]
  ]
 },
 {
  "t": "Motivations: espionage, financial, disruption, ideology",
  "body": [
   "Understanding why an attacker acts helps you predict what they will target and how. Security+ lists several motivations: data exfiltration, espionage, service disruption, blackmail, financial gain, philosophical or political beliefs, ethical reasons, revenge, chaos and war. The main themes in this topic are espionage, financial gain, disruption and ideology.",
   "Espionage is the stealthy gathering of secrets: government plans, military information, trade secrets, research data or negotiation positions. Espionage attackers want to stay hidden for as long as possible, so they favor quiet persistence, careful movement through the network and slow, low-volume data exfiltration rather than noisy damage. Nation-states are the classic espionage actors, although corporate espionage by competitors or insiders also happens. Defenses emphasize detection: monitoring for unusual outbound traffic, protecting intellectual property with data loss prevention and access controls, and threat hunting.",
   "Financial motivation is the most common driver of attacks overall. Organized crime and many individual attackers want money through ransomware, extortion (threatening to leak stolen data), business email compromise and wire fraud, stealing payment card data, selling credentials and data, or hijacking computing resources for cryptocurrency mining. Financially motivated attackers usually take the path of least resistance and move on if a target is too hard, so strong basic hygiene deters many of them.",
   "Disruption aims to stop an organization from operating, attacking availability. Examples are DDoS attacks against websites, wiping data with destructive malware, or attacking industrial control systems. Disruption can serve other motives: a hacktivist may take a site offline to make a point, a nation-state may disrupt infrastructure as part of war or conflict, and a disgruntled former employee may sabotage systems out of revenge. Some attackers simply seek chaos.",
   "Ideology, which the objectives also call philosophical or political beliefs, drives hacktivists. They want publicity for a cause, so they choose visible actions like defacements, doxing and leaks. Ethical motivation is related but distinct: an ethical hacker or security researcher looks for vulnerabilities to get them fixed, ideally through responsible disclosure and with permission.",
   "On the exam, look for clues in the scenario. A demand for payment points to financial motivation. Data quietly leaving over months points to espionage. A defaced homepage with a political slogan points to ideology. A website knocked offline during an important event points to disruption. The actor and the motivation usually go together, and questions may ask for either."
  ],
  "terms": [
   [
    "Espionage",
    "Covertly gathering sensitive information, such as state secrets or intellectual property."
   ],
   [
    "Financial motivation",
    "Attacking to obtain money, for example through ransomware, fraud or selling stolen data."
   ],
   [
    "Service disruption",
    "An attack goal of preventing an organization from operating, targeting availability."
   ],
   [
    "Data exfiltration",
    "The unauthorized transfer of data out of an organization."
   ]
  ],
  "example": "An engineering firm discovers that a small amount of encrypted traffic has been leaving a design server every night for eight months, carrying CAD files to an overseas host. No ransom was demanded and nothing was damaged, which points to espionage rather than financial crime.",
  "tip": "Quiet and long-term means espionage; payment demands mean financial; knocking things offline means disruption; public messages for a cause mean ideology.",
  "check": [
   [
    "Ransomware operators are usually driven by which motivation?",
    "Financial gain."
   ],
   [
    "Why do espionage attackers avoid damaging systems?",
    "Damage would reveal their presence; their goal is to stay hidden and keep collecting information."
   ],
   [
    "A group defaces a company website with a political message. What motivation and actor type are most likely?",
    "Ideology (philosophical or political beliefs), typically a hacktivist."
   ]
  ]
 },
 {
  "t": "Threat vectors: email, SMS, voice, removable media, supply chain, open ports",
  "body": [
   "A threat vector is the path or method an attacker uses to get into a target, and the attack surface is the total set of such paths. Reducing the attack surface, meaning closing unneeded paths and hardening the rest, is one of the most effective security strategies. Security+ lists message-based, image-based, file-based, voice, removable media, vulnerable software, unsupported systems, unsecure networks, open service ports, default credentials and supply chain vectors.",
   "Message-based vectors are the most common. Email carries phishing links, malicious attachments and business email compromise. SMS (text messages) carries smishing links, often pretending to be deliveries or banks, and is harder to filter on personal phones. Instant messaging and collaboration tools carry the same risks. Image-based and file-based vectors hide malicious content in files, such as documents with malicious macros or images crafted to exploit a viewer. Defenses include email filtering, sandboxing attachments, disabling macros by default, and user training.",
   "Voice calls are used for vishing: an attacker phones pretending to be IT support, a bank or an executive to trick people into revealing passwords, approving MFA prompts or making payments. Caller ID can be spoofed, so verification procedures such as calling back on a known number matter.",
   "Removable media, such as USB drives, can carry malware directly past network defenses, or be used to steal data. Attackers sometimes drop infected drives in parking lots hoping someone plugs one in, a technique called baiting. Controls include disabling autorun, blocking or restricting USB storage by policy, and endpoint scanning.",
   "Supply chain vectors attack you through someone you trust: a software vendor whose update is compromised, a managed service provider (MSP) with remote access to your systems, or hardware that was tampered with before delivery. These attacks are powerful because the malicious code arrives signed and expected. Vendor assessments, least-privilege access for providers, verifying software integrity and monitoring third-party connections all help.",
   "Open service ports expose listening services to the network or internet. Each open port is a potential entry point, especially when it runs vulnerable or unnecessary software, such as an exposed RDP or database port. Closely related vectors are default credentials (devices still using the factory username and password), unsupported systems that no longer receive patches, vulnerable software, and unsecure networks such as open Wi-Fi, weak wired network access and Bluetooth. Regular port scans of your own environment, closing unneeded ports, firewall rules and patching reduce this surface.",
   "When answering exam questions, first identify how the attacker got in, then pick the control that closes that specific path."
  ],
  "terms": [
   [
    "Threat vector",
    "The path or method an attacker uses to gain access to a target."
   ],
   [
    "Attack surface",
    "All the points where an attacker could try to enter or extract data from a system or organization."
   ],
   [
    "Supply chain attack",
    "An attack that compromises a target through a trusted vendor, supplier, software update or service provider."
   ],
   [
    "Baiting",
    "Leaving infected removable media or enticing items where victims will find and use them."
   ]
  ],
  "example": "Attackers compromise a small IT managed service provider and use its remote management tool to push ransomware to dozens of client companies at once. None of the clients were attacked directly; the supply chain was the vector.",
  "tip": "Identify the vector first: a text message is SMS (smishing), a phone call is voice (vishing), a trusted vendor's update is supply chain, and a factory password on a device is default credentials.",
  "check": [
   [
    "What is the difference between a threat vector and the attack surface?",
    "A threat vector is one path of attack; the attack surface is the total set of possible paths."
   ],
   [
    "Why are supply chain attacks hard to detect?",
    "Malicious code or access arrives through a trusted, often signed, channel that the victim expects and allows."
   ],
   [
    "Name two controls that reduce the removable media vector.",
    "Disabling autorun, blocking or restricting USB storage devices, endpoint scanning of media, or user awareness training."
   ]
  ]
 },
 {
  "t": "Social engineering: phishing, vishing, smishing, pretexting, BEC, watering hole, typosquatting",
  "body": [
   "Social engineering attacks people rather than technology. It works by exploiting trust, fear, urgency, curiosity and the wish to be helpful. Because it sidesteps technical controls, it remains one of the most common ways breaches start. Recognizing the variants, and the psychological levers behind them, is central to Domain 2.",
   "Phishing is a fraudulent message, usually email, that tries to make the recipient click a malicious link, open an attachment or enter credentials on a fake site. Spear phishing targets a specific person or group using researched details, and whaling targets senior executives. Vishing is voice phishing over phone calls, and smishing is SMS phishing through text messages, often with a shortened link. Warning signs include urgency ('your account will be closed today'), unusual requests, mismatched sender addresses and links whose real destination differs from the text.",
   "Pretexting is creating a believable story, the pretext, to justify a request. The attacker might pose as a new employee, an auditor or a help desk technician who needs your password to fix a problem. Pretexting underpins many other attacks. Impersonation means pretending to be someone the victim trusts. Defenses include identity verification procedures and a culture where it is normal to call someone back on a known number.",
   "Business email compromise (BEC) targets organizations' money. An attacker either takes over a real executive's or supplier's mailbox, or impersonates one convincingly, then asks finance staff to pay an invoice to a new bank account or send gift cards. BEC emails often contain no link or malware at all, so filters may miss them. Out-of-band verification of payment changes and dual approval for transfers are key controls.",
   "A watering hole attack compromises a website that the target group is known to visit, such as an industry forum or a supplier portal, and uses it to infect visitors. Instead of reaching out to victims, the attacker waits for them to come, like a predator waiting at a watering hole. Patching browsers, isolating browsing and monitoring endpoints help.",
   "Typosquatting (URL hijacking) registers domain names that are common misspellings or look-alikes of real ones, such as examp1e.com, to catch users who mistype or do not look closely. Related techniques include brand impersonation, misinformation and disinformation campaigns, and pharming, which redirects users to fake sites even when they type the correct address, for example through DNS poisoning.",
   "The most effective defenses combine technology (email filtering, sender authentication with SPF, DKIM and DMARC, MFA, blocking known bad domains) with regular awareness training and phishing simulations, plus a simple, blame-free way for staff to report suspicious messages."
  ],
  "terms": [
   [
    "Phishing",
    "Fraudulent messages that trick recipients into revealing information, clicking malicious links or opening malware."
   ],
   [
    "Pretexting",
    "Using a fabricated scenario to persuade a victim to provide information or access."
   ],
   [
    "Business email compromise (BEC)",
    "Fraud using a compromised or impersonated business email account to redirect payments or data."
   ],
   [
    "Watering hole attack",
    "Compromising a website frequently visited by a target group to infect its visitors."
   ],
   [
    "Typosquatting",
    "Registering misspelled or look-alike domains to deceive users."
   ]
  ],
  "example": "An accounts payable clerk receives an email that appears to come from a long-time supplier asking that future invoices be paid to a new bank account. Following policy, she calls the supplier on the number in the vendor file and learns they sent no such request. The BEC attempt fails.",
  "tip": "Channel names give it away: vishing is voice, smishing is SMS. BEC is about payments and often has no malicious link or attachment. Watering hole means the attacker compromises a site the victims already visit.",
  "check": [
   [
    "An attacker compromises an industry association website to infect member companies. What attack is this?",
    "A watering hole attack."
   ],
   [
    "What is the best control against a BEC request to change a supplier's bank details?",
    "Out-of-band verification using known contact details, plus dual approval for payment changes."
   ],
   [
    "What is the difference between phishing and spear phishing?",
    "Phishing is broad and untargeted; spear phishing is tailored to a specific person or group."
   ]
  ]
 },
 {
  "t": "OWASP Top 10: broken access control, injection, misconfiguration, integrity failures, SSRF",
  "body": [
   "The Open Worldwide Application Security Project (OWASP) is a nonprofit community that publishes free guidance on web application security. Its best known document, the OWASP Top 10, ranks the most critical categories of web application risk and is updated every few years. Security+ does not require you to memorize the ranking, but you should recognize the major categories and what defends against each.",
   "Broken access control means users can act outside their intended permissions. Examples include changing an ID in a URL to view another customer's order (an insecure direct object reference), reaching admin pages by guessing their path, or elevating privileges by modifying a request. It is consistently among the most serious risks. The fix is to enforce authorization on the server for every request, deny by default, and never rely on hiding links or on checks performed only in the browser.",
   "Injection happens when untrusted input is sent to an interpreter as part of a command or query, so the input changes the command's meaning. SQL injection, operating system command injection and LDAP injection are examples. The core defenses are parameterized queries (prepared statements), input validation on the server, and using safe APIs rather than building commands by joining strings. Cross-site scripting is also grouped under injection in recent OWASP lists.",
   "Security misconfiguration covers insecure settings: default accounts left enabled, unnecessary features installed, verbose error messages that reveal stack traces, missing security headers, directory listing turned on, or cloud storage left open to the public. Defenses are hardened baseline configurations, automated configuration checks, and removing anything not needed.",
   "Software and data integrity failures happen when code or data is trusted without verifying it. Examples are applications that download updates or plugins without checking signatures, insecure build pipelines that let attackers insert code, and deserialization of untrusted data. Code signing, verifying hashes, securing the CI/CD pipeline and using trusted repositories address this category.",
   "Server-side request forgery (SSRF) tricks a server into making requests on the attacker's behalf. If an application fetches a URL supplied by the user, for example to preview an image, an attacker might supply an internal address so the server retrieves data from internal systems or a cloud metadata service that the attacker cannot reach directly. Defenses include validating and allow-listing destinations, blocking requests to internal address ranges, and segmenting the network so the web server cannot reach sensitive internal services.",
   "Other categories on the 2021 list include cryptographic failures, insecure design, vulnerable and outdated components, identification and authentication failures, and security logging and monitoring failures. Category names and groupings shift between editions (the 2025 edition, for example, folds SSRF into broken access control), so learn the concepts rather than the exact list. A web application firewall can help catch some attacks, but it supplements secure coding rather than replacing it."
  ],
  "terms": [
   [
    "OWASP Top 10",
    "A regularly updated list of the most critical web application security risk categories."
   ],
   [
    "Broken access control",
    "Failures that let users act outside their intended permissions, such as viewing other users' data."
   ],
   [
    "Injection",
    "Sending untrusted input to an interpreter so that it is executed as part of a command or query."
   ],
   [
    "Server-side request forgery (SSRF)",
    "An attack that makes a server send requests to unintended locations, often internal systems."
   ],
   [
    "Integrity failure",
    "Trusting code, updates or data without verifying that they are authentic and unaltered."
   ]
  ],
  "example": "A customer notices that changing order=1001 to order=1002 in a shop's URL shows someone else's order. The developers fix this broken access control by checking on the server that the logged-in user owns each order before returning it.",
  "tip": "Changing an ID to see someone else's data is broken access control. A server fetching an attacker-chosen internal URL is SSRF. Unsigned updates being trusted is an integrity failure.",
  "check": [
   [
    "What is the primary defense against injection flaws?",
    "Parameterized queries or safe APIs combined with server-side input validation."
   ],
   [
    "Why is SSRF dangerous in cloud environments?",
    "The server can be tricked into reaching internal services, such as instance metadata, that hold credentials or sensitive data unreachable from the internet."
   ],
   [
    "Give an example of security misconfiguration.",
    "Default admin accounts left enabled, verbose error messages, directory listing, or publicly readable cloud storage."
   ]
  ]
 },
 {
  "t": "SQL injection, XSS (stored/reflected), CSRF",
  "body": [
   "These three web application attacks appear on almost every Security+ exam. Each abuses a different kind of trust, and the defenses differ, so learn to tell them apart.",
   "SQL injection (SQLi) targets the database behind an application. It happens when an application builds a database query by joining user input directly into the query text. If the input contains SQL syntax, such as quote characters and extra conditions, the database treats part of the input as instructions. An attacker might bypass a login, read tables they should not see, or modify and delete data. Signs in logs include SQL keywords, quote characters and comment markers in form fields or URL parameters, and database error messages returned to users. The main defense is parameterized queries (prepared statements), where the query structure is fixed and user input is passed separately as data that can never change the command. Input validation, least-privilege database accounts and a web application firewall add layers.",
   "```python\n# Safe: the input is passed as a parameter, never joined into the SQL text\ncursor.execute(\"SELECT * FROM users WHERE email = %s\", (email,))\n```",
   "Cross-site scripting (XSS) targets the users of a website. The attacker gets the site to deliver the attacker's script to other people's browsers, where it runs with the site's trust. The script can steal session cookies, capture keystrokes, change page content or perform actions as the user. In stored (persistent) XSS, the malicious script is saved on the server, for example in a comment or profile field, and runs for everyone who views that page, which makes it more dangerous. In reflected XSS, the script is included in a crafted link; the server echoes it back in the response, so it runs only for the person who clicks that link, usually delivered by phishing. A third type, DOM-based XSS, happens entirely in client-side code. Defenses are output encoding (escaping user data when it is displayed), input validation, a Content Security Policy header that limits where scripts can load from, and marking session cookies HttpOnly so scripts cannot read them.",
   "Cross-site request forgery (CSRF, sometimes pronounced 'sea-surf') tricks a logged-in user's browser into sending an unwanted request to a site that trusts that user. Because browsers automatically attach the site's cookies, a hidden form on a malicious page can make the victim's browser submit, for example, a password change or funds transfer on a banking site where they are still logged in. The attacker never sees the response; they just cause the action. Defenses include anti-CSRF tokens (unique, unpredictable values in each form that the attacker cannot know), SameSite cookie attributes, and requiring re-authentication for sensitive actions.",
   "The easy way to remember the difference: XSS abuses the user's trust in a website (the site sends the user bad script). CSRF abuses the website's trust in the user's browser (the browser sends the site a forged request). SQL injection abuses the application's trust in its input when talking to the database."
  ],
  "terms": [
   [
    "SQL injection",
    "Inserting SQL syntax into application input so that it alters the database query that is executed."
   ],
   [
    "Stored XSS",
    "Cross-site scripting where the malicious script is saved on the server and runs for every viewer of the affected page."
   ],
   [
    "Reflected XSS",
    "Cross-site scripting where the script is carried in a request, such as a crafted link, and echoed back to that user only."
   ],
   [
    "CSRF",
    "Cross-site request forgery, which makes an authenticated user's browser send an unwanted request to a trusted site."
   ],
   [
    "Parameterized query",
    "A database query whose structure is fixed, with user input supplied separately as data."
   ]
  ],
  "example": "A forum lets users post comments without encoding them. An attacker posts a comment containing script, and every visitor who reads the thread has the script run in their browser. The developers fix this stored XSS by encoding all output and adding a Content Security Policy.",
  "tip": "Stored XSS affects everyone who views the page; reflected XSS affects whoever clicks the crafted link. CSRF is stopped with anti-CSRF tokens; SQL injection is stopped with parameterized queries.",
  "check": [
   [
    "What makes stored XSS more dangerous than reflected XSS?",
    "The script is saved on the server and runs for every user who views the page, without each victim needing to click a crafted link."
   ],
   [
    "How does an anti-CSRF token prevent forged requests?",
    "The server requires a secret, per-session or per-form value that an attacker's page cannot know or read, so forged requests lack it and are rejected."
   ],
   [
    "Which log clue suggests SQL injection attempts?",
    "Form fields or URL parameters containing SQL keywords, quote characters or comment markers, often with database errors in responses."
   ]
  ]
 },
 {
  "t": "Buffer overflow, race conditions (TOCTOU), memory injection",
  "body": [
   "Some of the most serious vulnerabilities come from how programs manage memory and timing. You do not need to write exploits for Security+, but you should understand how these flaws arise, what their results look like and how they are prevented.",
   "A buffer is a fixed-size area of memory set aside to hold data, such as a 64-character field for a username. A buffer overflow happens when a program writes more data into the buffer than it can hold and does not check the length. The extra data spills into adjacent memory, overwriting other variables or control information such as the address the program will return to when a function finishes. The results range from a crash (a denial of service) to an attacker redirecting the program to run code of their choosing, often with the program's privileges. Languages that manage memory manually, such as C and C++, are most prone to this. Defenses include bounds checking and input validation in code, memory-safe languages, and operating system protections: data execution prevention (DEP), which marks memory areas as non-executable, and address space layout randomization (ASLR), which places code at unpredictable addresses so an attacker cannot reliably jump to it. Patching removes known overflow flaws.",
   "A race condition occurs when a program's outcome depends on the timing or order of events that it does not control, such as two processes or threads touching the same resource at once. A specific and commonly tested form is time-of-check to time-of-use (TOCTOU). The program checks something, for example that a user may write to a file or that an account has enough balance, and then later uses it. If the resource can change between the check and the use, an attacker can swap it in that gap. A classic illustration: a privileged program checks that a file is safe, then an attacker quickly replaces it with a link to a sensitive system file before the program opens it. Defenses include locking resources, making check-and-use a single atomic operation, and designing code to avoid shared state.",
   "Memory injection means inserting malicious code into the memory space of a legitimate, running process and executing it there. DLL injection, where a process is made to load a malicious library, and process hollowing, where a legitimate process's code is replaced in memory, are examples. Because the malicious code runs inside a trusted process and often never touches the disk as a file, it can evade traditional antivirus that scans files. This is closely linked to fileless malware. Endpoint detection and response (EDR) tools that monitor process behavior, application allow listing, least privilege and keeping systems patched help detect and prevent it.",
   "All three categories share a theme: the program trusts that data or state is what it expects. Secure coding, input validation and platform protections together close these gaps."
  ],
  "terms": [
   [
    "Buffer overflow",
    "Writing more data to a memory buffer than it can hold, overwriting adjacent memory and potentially enabling code execution."
   ],
   [
    "Race condition",
    "A flaw where a program's result depends on uncontrolled timing or ordering of events."
   ],
   [
    "TOCTOU",
    "Time-of-check to time-of-use, a race condition where a resource changes between being checked and being used."
   ],
   [
    "Memory injection",
    "Placing malicious code into a legitimate process's memory and executing it there."
   ],
   [
    "ASLR",
    "Address space layout randomization, which randomizes memory locations to make exploitation harder."
   ]
  ],
  "example": "A banking app checks that an account has enough funds and then, a moment later, deducts the withdrawal. An attacker sends two withdrawal requests at the same instant; both pass the check before either deduction happens, overdrawing the account. The fix is to lock the account record so check and deduction occur atomically.",
  "tip": "TOCTOU is about the gap between checking and using. Buffer overflow is about writing past a memory boundary. DEP and ASLR are the operating system defenses most associated with buffer overflows.",
  "check": [
   [
    "What does DEP do to reduce buffer overflow risk?",
    "It marks data areas of memory as non-executable, so injected data cannot be run as code."
   ],
   [
    "What is the core problem in a TOCTOU vulnerability?",
    "The resource can change between the time it is checked and the time it is used."
   ],
   [
    "Why can memory injection evade file-based antivirus?",
    "The malicious code runs inside a legitimate process in memory and may never be written to disk as a file."
   ]
  ]
 },
 {
  "t": "Threat modeling",
  "body": [
   "Threat modeling is a structured way of thinking about what could go wrong with a system before attackers find out for you. It is best done during design, when fixing problems is cheapest, and revisited when the system changes. The basic questions are simple: what are we building, what can go wrong, what are we going to do about it, and did we do a good job?",
   "A typical process starts by describing the system, often with a data flow diagram that shows components, data stores, users and external systems, and the trust boundaries between them. A trust boundary is anywhere data crosses from one level of trust to another, such as from the internet to a web server or from an application to its database. Threats cluster at trust boundaries. Next, you identify assets worth protecting and the attack surface, then list threats, rate them, and choose mitigations.",
   "Frameworks help you be systematic. STRIDE, developed at Microsoft, gives six threat categories to check against each component: Spoofing (pretending to be someone else, countered by authentication), Tampering (modifying data, countered by integrity controls), Repudiation (denying an action, countered by logging and signatures), Information disclosure (countered by encryption and access control), Denial of service (countered by availability controls), and Elevation of privilege (countered by authorization and least privilege). Notice how the categories map neatly to CIA and AAA. Attack trees are another approach, placing an attacker's goal at the root and branching into the different ways it could be achieved. Rating methods such as likelihood times impact help prioritize.",
   "Threat modeling also draws on threat intelligence about how real attackers behave. MITRE ATT&CK is a widely used knowledge base of adversary tactics and techniques observed in real attacks, organized from initial access through to impact. It helps defenders ask 'which of these techniques could be used against our system, and would we detect them?' The Cyber Kill Chain and the Diamond Model of intrusion analysis are other frameworks you may see referenced when describing attacks.",
   "Good threat models consider the likely threat actors and their motivations and capabilities, which connects this topic to the earlier lessons. A small online store worries mostly about financially motivated criminals and automated attacks, while a defense contractor must consider nation-state espionage.",
   "The output is a prioritized list of threats with chosen responses: mitigate with a control, transfer (for example through insurance or a contract), accept with documented approval, or avoid by changing the design. The model is a living document, updated as the system and the threat landscape change."
  ],
  "terms": [
   [
    "Threat modeling",
    "A structured process for identifying, rating and mitigating potential threats to a system."
   ],
   [
    "STRIDE",
    "A threat categorization: spoofing, tampering, repudiation, information disclosure, denial of service and elevation of privilege."
   ],
   [
    "Trust boundary",
    "A point where data or execution moves between different levels of trust."
   ],
   [
    "MITRE ATT&CK",
    "A knowledge base of real-world adversary tactics and techniques used for threat modeling and detection."
   ],
   [
    "Attack tree",
    "A diagram with an attacker's goal at the root and the ways to achieve it as branches."
   ]
  ],
  "example": "Before launching a mobile banking feature, the team draws a data flow diagram, marks the trust boundary between the phone app and the API, and walks through STRIDE. They realize a stolen session token could be replayed (spoofing), so they add token binding and short token lifetimes.",
  "tip": "If a question lists spoofing, tampering, repudiation, information disclosure, denial of service and elevation of privilege, the answer is STRIDE. If it asks for a catalog of real attacker techniques, the answer is MITRE ATT&CK.",
  "check": [
   [
    "When is threat modeling most cost-effective?",
    "During the design phase, before code is written, when changes are cheapest."
   ],
   [
    "Which STRIDE category is countered by logging and digital signatures?",
    "Repudiation."
   ],
   [
    "What is a trust boundary and why does it matter?",
    "A point where data crosses between levels of trust; threats concentrate there, so controls are placed there."
   ]
  ]
 },
 {
  "t": "Malware: ransomware, trojan, worm, spyware, rootkit, logic bomb, keylogger, fileless",
  "body": [
   "Malware is any software designed to harm, spy on or gain unauthorized control of a system. Security+ asks you to recognize malware types from their behavior, so focus on what each one does and how it spreads.",
   "Ransomware encrypts a victim's files or systems and demands payment for the decryption key. Modern groups often steal data first and threaten to publish it (double extortion), so good backups alone do not remove all the harm. Indicators include mass file renaming, new file extensions, ransom notes and spikes in disk activity. Offline or immutable backups, patching, MFA on remote access, EDR and segmentation are key defenses.",
   "A trojan pretends to be legitimate software, such as a free utility or a cracked game, while carrying hidden malicious functions. It does not spread on its own; the user installs it. A remote access trojan (RAT) gives the attacker ongoing remote control of the system. A worm, by contrast, self-replicates across networks without user action, usually by exploiting a vulnerability in a network service. Worms can spread extremely fast, so patching and segmentation are critical. A virus, which you may also see, attaches to files and needs a user to run the infected file to spread.",
   "Spyware secretly collects information about the user, such as browsing activity, credentials and personal data. A keylogger is a form of spyware that records keystrokes to capture passwords and messages; it can be software or a small hardware device inserted between keyboard and computer. MFA reduces the value of stolen passwords. Adware and bloatware are unwanted software that degrade performance and privacy.",
   "A rootkit hides itself and other malware by modifying the operating system, kernel or even firmware, so standard tools report that nothing is wrong. Rootkits often give privileged, persistent access. Because the infected system cannot be trusted to report on itself, detection may require scanning from outside it, secure and measured boot can reveal boot-level tampering, and remediation is often a full reimage.",
   "A logic bomb is malicious code that lies dormant until a specific condition triggers it, such as a date or an event like a particular employee's account being disabled. It is often planted by insiders, for example as revenge. Code reviews, change management and separation of duties help prevent it.",
   "Fileless malware runs in memory and abuses built-in tools such as PowerShell, WMI or scripting engines rather than dropping a traditional executable. It is sometimes called 'living off the land'. Because there are few files to scan, detection relies on behavioral monitoring, script logging, EDR and application control. Other terms to know are bots and botnets (infected machines controlled together, often for DDoS or spam) and malware indicators such as unusual outbound connections, new scheduled tasks and disabled security tools."
  ],
  "terms": [
   [
    "Ransomware",
    "Malware that encrypts or locks data and demands payment for its release."
   ],
   [
    "Trojan",
    "Malware disguised as legitimate software that the user installs."
   ],
   [
    "Worm",
    "Self-replicating malware that spreads across networks without user interaction."
   ],
   [
    "Rootkit",
    "Malware that hides itself and gains privileged, persistent access by modifying the operating system or firmware."
   ],
   [
    "Logic bomb",
    "Malicious code that activates when a specific condition or date is met."
   ],
   [
    "Fileless malware",
    "Malware that runs in memory and abuses legitimate system tools instead of relying on files on disk."
   ]
  ],
  "example": "Three weeks after a database administrator is fired, the company's payroll tables are deleted at midnight on the first of the month. Investigators find a scheduled script he wrote that checked whether his account still existed and deleted data when it did not: a logic bomb.",
  "tip": "Needs a user to install it and looks legitimate: trojan. Spreads by itself over the network: worm. Hides from the operating system: rootkit. Waits for a trigger: logic bomb. Lives in memory and uses built-in tools: fileless.",
  "check": [
   [
    "What is the key difference between a worm and a trojan?",
    "A worm self-replicates across networks without user action; a trojan relies on a user installing software that appears legitimate."
   ],
   [
    "Why is reimaging often recommended after a rootkit infection?",
    "The rootkit compromises the operating system itself, so the system's own tools cannot be trusted to confirm it was removed."
   ],
   [
    "Which malware type is best detected by behavioral monitoring of PowerShell and memory activity?",
    "Fileless malware."
   ]
  ]
 },
 {
  "t": "Password attacks: spraying, brute force, credential stuffing",
  "body": [
   "Passwords remain the most common way to authenticate, so attacks against them are constant. Security+ expects you to recognize the main techniques from their patterns in logs and to choose the right defenses.",
   "A brute force attack tries many possible passwords against an account until one works. Online brute force happens against a live login page or service, where each attempt is visible and can be limited. Account lockout policies, rate limiting, CAPTCHA and MFA defeat it. Offline brute force happens when an attacker has stolen a file or database of password hashes and guesses on their own hardware, where no lockout applies. Here the defenses are strong hashing with salts and key stretching and long passwords, because the attacker can try guesses at high speed. A dictionary attack is a smarter brute force that tries common words, leaked passwords and variations first.",
   "Password spraying flips brute force around. Instead of many passwords against one account, it tries one or a few very common passwords, such as a season plus a year, against many accounts, and then waits before trying the next password. Because each account sees only one or two failures, it stays under lockout thresholds. In logs, spraying shows up as failed logins across many different usernames from one source, or a distributed set of sources, with a small number of attempts per account. Defenses include MFA, banned password lists that block common choices, smart lockout that looks at patterns across accounts, and alerting on the pattern itself.",
   "Credential stuffing uses username and password pairs stolen from one breach to log into other, unrelated services, betting on password reuse. Attackers automate this with lists containing millions of pairs. Signs include a high volume of login attempts with many different usernames, an unusually high success rate compared with random guessing, and logins from many IP addresses or hosting providers. Defenses include MFA, checking new passwords against known-breached lists, bot detection, and educating users not to reuse passwords, supported by password managers.",
   "Hash-focused attacks relate to this topic too. A rainbow table attack looks up precomputed hashes and is defeated by salting. Pass-the-hash, a Windows lateral movement technique, reuses a captured password hash to authenticate without cracking it.",
   "One control stands above the rest: multifactor authentication. Even if an attacker guesses, sprays or stuffs the correct password, they still need the second factor. Phishing-resistant MFA, such as FIDO2 security keys, is stronger than SMS codes. Combine MFA with long passphrases, password managers and monitoring for the patterns above.",
   "A final exam trap: account lockout stops online brute force but can be abused. An attacker who deliberately triggers lockouts on many accounts creates a denial of service, which is why lockout thresholds are tuned and paired with other controls."
  ],
  "terms": [
   [
    "Brute force attack",
    "Trying many possible passwords until the correct one is found, online or offline."
   ],
   [
    "Password spraying",
    "Trying a few common passwords against many accounts to avoid lockouts."
   ],
   [
    "Credential stuffing",
    "Using username and password pairs leaked from one breach to log into other services."
   ],
   [
    "Dictionary attack",
    "Guessing passwords from a list of common words, leaked passwords and variations."
   ],
   [
    "Account lockout",
    "A control that disables login after a set number of failed attempts."
   ]
  ],
  "example": "A SIEM alert shows 2,000 failed logins in an hour, each against a different employee account, each using the same password guess, all from a single cloud IP address. No account hit the lockout threshold. The pattern identifies password spraying, and the team blocks the IP and confirms MFA covers all accounts.",
  "tip": "One account, many passwords: brute force. Many accounts, one password: spraying. Real leaked pairs from another site: credential stuffing. MFA is the best single answer for all three.",
  "check": [
   [
    "Why does password spraying evade account lockout?",
    "It tries only one or a few passwords per account, staying below the failed-attempt threshold."
   ],
   [
    "What user behavior does credential stuffing exploit?",
    "Password reuse across different services."
   ],
   [
    "Why doesn't account lockout help against offline brute force?",
    "The attacker is guessing against stolen hashes on their own hardware, not against the live login system."
   ]
  ]
 },
 {
  "t": "Crypto attacks: downgrade, collision, birthday",
  "body": [
   "Cryptographic algorithms that are strong on paper can still be attacked through weak choices, old versions or mathematical shortcuts. Security+ focuses on three: downgrade, collision and birthday attacks. The general lesson is that you should use current algorithms and disable weak ones completely.",
   "A downgrade attack forces two parties to use an older, weaker protocol version or cipher than both actually support. Many protocols negotiate the strongest option both sides share, and attackers in an on-path position can interfere with that negotiation, for example by tampering with or blocking the initial handshake so that systems fall back to an old version of SSL or TLS or to a weak cipher suite with known flaws. Once downgraded, the attacker can exploit the weakness to read or modify traffic. SSL stripping is a related idea where an attacker in the middle keeps the victim on plain HTTP while talking HTTPS to the real server. Defenses include disabling legacy protocol versions and weak ciphers on servers and clients, using modern TLS versions that include downgrade protections, and HTTP Strict Transport Security (HSTS), which tells browsers to use only HTTPS for a site.",
   "A collision occurs when two different inputs produce the same hash. Because a hash is shorter than its possible inputs, collisions must exist in theory; a secure hash makes finding them computationally impractical. A collision attack finds such a pair deliberately. That breaks the trust we put in hashes and signatures: if an attacker can create a harmless document and a malicious one with the same hash, a signature on the harmless one is also valid for the malicious one. MD5 and SHA-1 have demonstrated practical collision attacks, which is why they have been retired for certificates and signatures and replaced by SHA-256 and other SHA-2 or SHA-3 functions.",
   "The birthday attack explains why collisions are easier to find than you might expect. It is based on the birthday paradox: in a group of only 23 people, there is about a 50 percent chance that two share a birthday, even though there are 365 possible days. Similarly, finding any two inputs with the same hash takes roughly the square root of the number of possible hash values, not the full number. For a hash with an n-bit output, that means about 2 to the power of n/2 attempts. This is why longer hash outputs are needed; a 128-bit hash provides only about 64 bits of collision resistance.",
   "Other cryptographic concerns you may meet include weak or short keys, poor random number generation and implementations that leak information through timing. The practical takeaways are consistent: disable legacy protocols and ciphers, choose modern hash algorithms with long outputs, use adequate key lengths, and keep cryptographic libraries patched."
  ],
  "terms": [
   [
    "Downgrade attack",
    "Forcing a connection to use an older, weaker protocol version or cipher that can then be exploited."
   ],
   [
    "Collision",
    "Two different inputs that produce the same hash value."
   ],
   [
    "Birthday attack",
    "An attack that exploits probability to find hash collisions far faster than trying every possible value."
   ],
   [
    "HSTS",
    "HTTP Strict Transport Security, a header telling browsers to connect to a site only over HTTPS."
   ]
  ],
  "example": "A security scan of a company web server reports that it still accepts old SSL and early TLS versions with weak ciphers. Even though modern browsers prefer strong settings, an on-path attacker could try to force a downgrade. The team disables the legacy versions and weak ciphers and enables HSTS.",
  "tip": "Forced to an older protocol: downgrade. Two inputs, same hash: collision. The birthday paradox is why hash outputs need to be long; it halves the effective strength against collisions.",
  "check": [
   [
    "What is the best defense against protocol downgrade attacks?",
    "Disable legacy protocol versions and weak ciphers entirely so there is nothing weaker to fall back to, and use HSTS for websites."
   ],
   [
    "Why are MD5 and SHA-1 no longer trusted for digital signatures?",
    "Practical collision attacks exist, so attackers can create different data with the same hash."
   ],
   [
    "Roughly how many attempts does a birthday attack need against an n-bit hash?",
    "About 2 to the power of n/2, the square root of the number of possible outputs."
   ]
  ]
 },
 {
  "t": "Indicators: impossible travel, account lockout, resource consumption, missing logs",
  "body": [
   "Indicators of malicious activity are the clues that tell an analyst something may be wrong. Security+ lists several, and exam questions often describe a log excerpt or a user complaint and ask what it suggests. No single indicator proves an attack, so the skill is recognizing patterns and knowing what to investigate next.",
   "Impossible travel occurs when one account logs in from two locations that are too far apart for a person to travel between in the time elapsed, such as London at 9:00 and Singapore at 9:20. It strongly suggests that credentials have been stolen and used by someone else, though VPNs and cloud proxies can cause false positives. Concurrent session usage, the same account active in two places at once when that should not happen, is a closely related indicator. Identity providers and SIEM tools can flag both automatically.",
   "Account lockout is an indicator when a user is locked out without having mistyped their password. It suggests someone else is guessing, for example through brute force or password spraying. A sudden wave of lockouts across many accounts may be an attack, or even a deliberate attempt to deny service. The help desk is often the first to notice, which is one reason they should report patterns to security.",
   "Resource consumption means unusual use of CPU, memory, disk, or network bandwidth. A server running at full CPU may be infected with cryptomining malware. A spike in outbound traffic, especially at odd hours or to unfamiliar destinations, may indicate data exfiltration. Rapid disk activity with files being rewritten may indicate ransomware encryption. Resource inaccessibility, such as files that suddenly cannot be opened or a service that stops responding, is also listed as an indicator.",
   "Missing logs are an indicator because attackers often delete or disable logging to hide their tracks. Gaps in time, a log service that was stopped, cleared event logs (Windows records an event when the security log is cleared) or logs that stop arriving at the SIEM from one host should all raise suspicion. Sending logs to a central, protected collector in real time makes tampering much harder. Out-of-cycle logging, activity recorded at times when nothing should be happening, is another listed indicator.",
   "Other indicators in the objectives include blocked content (security tools reporting blocked downloads or sites for a user), published or documented evidence (your data appearing on a leak site or an attacker publicly claiming a breach), and signs like new unknown accounts, disabled security software or unexpected configuration changes.",
   "When you see one of these indicators in a lab or the exam, think about the likely cause and the next step: verify with the user, check related logs, correlate with other alerts in the SIEM, and follow the incident response process if the evidence holds up."
  ],
  "terms": [
   [
    "Impossible travel",
    "Logins for one account from locations too far apart to be reached in the elapsed time, suggesting credential compromise."
   ],
   [
    "Resource consumption",
    "Abnormal use of CPU, memory, storage or bandwidth that may indicate malware or exfiltration."
   ],
   [
    "Missing logs",
    "Gaps or deletions in log data that may indicate an attacker covering their tracks."
   ],
   [
    "Concurrent session usage",
    "The same account active in multiple places at once when that is not expected."
   ],
   [
    "Indicator of compromise (IoC)",
    "Evidence suggesting a system or network may have been breached."
   ]
  ],
  "example": "An identity alert shows a sales manager signing in from her usual city at 8:05 and from another continent at 8:25. She confirms she was not traveling or using a VPN. The analyst revokes her sessions, resets her password, reviews her mailbox rules and checks where the stolen credentials came from.",
  "tip": "Impossible travel points to stolen credentials. Unexplained lockouts point to password guessing. High CPU or bandwidth points to cryptomining or exfiltration. Gaps in logs point to an attacker hiding activity.",
  "check": [
   [
    "A user is locked out every morning even though she has not tried to log in. What might this indicate?",
    "Someone else is attempting to authenticate as her, such as a brute force or password spraying attack."
   ],
   [
    "Why is a cleared security event log suspicious?",
    "Attackers clear or disable logs to hide their activity, so an unexplained clearing suggests tampering."
   ],
   [
    "What might a sustained CPU spike on an idle server indicate?",
    "Malware such as a cryptominer using the server's resources."
   ]
  ]
 },
 {
  "t": "Segmentation and isolation",
  "body": [
   "A flat network, where every device can reach every other device, lets an attacker who compromises one laptop move freely toward servers, databases and domain controllers. Segmentation divides a network into smaller zones with controlled paths between them, and isolation cuts certain systems off almost entirely. Both limit the blast radius of a compromise and are among the most important mitigations in Domain 2.",
   "Segmentation can be implemented at several levels. Physically, you can use separate switches and cabling. Logically, virtual LANs (VLANs) split one physical switch into multiple broadcast domains, so the finance VLAN and the guest VLAN cannot talk directly. Traffic between segments then passes through a router or firewall, where access control lists and firewall rules decide what is allowed. Subnetting at Layer 3 supports the same design. A screened subnet (formerly called a DMZ) is a segment that holds internet-facing services such as web servers, separated from both the internet and the internal network.",
   "Microsegmentation takes the idea further, applying policy down to individual workloads or applications, often with software-defined networking or host-based firewalls in data centers and clouds. It fits naturally with zero trust, because every connection between workloads must be explicitly permitted. In cloud environments, virtual private clouds, security groups and separate accounts or subscriptions provide segmentation.",
   "Isolation is a stronger form of separation. An air-gapped network has no network connection to other networks at all, used for some industrial, military and highly sensitive systems; data moves only through tightly controlled media. Isolation is also a response action: when a host is suspected of compromise, EDR tools or switch configuration can quarantine it so it can still be investigated but cannot spread infection or talk to attackers. Sandboxing isolates an untrusted program or file so it runs in a contained environment where its behavior can be observed without harming the real system. Containerization and virtualization provide isolation between workloads on the same hardware.",
   "Segmentation supports many goals at once. It contains malware and lateral movement, protects sensitive systems like payment card environments (reducing compliance scope), isolates vulnerable legacy or IoT devices that cannot be patched, and makes monitoring easier because traffic between zones is a natural place to inspect. Common segments include user workstations, servers, management interfaces, guest Wi-Fi, IoT devices and operational technology.",
   "Segmentation only helps if the rules between segments are tight. A VLAN design with 'allow any' rules between every zone is effectively still flat. Design rules with least privilege: permit only the specific sources, destinations and ports each flow needs."
  ],
  "terms": [
   [
    "Segmentation",
    "Dividing a network into zones with controlled communication between them to limit the spread of attacks."
   ],
   [
    "VLAN",
    "A virtual LAN that logically separates devices on the same physical switch into different broadcast domains."
   ],
   [
    "Microsegmentation",
    "Fine-grained segmentation that applies security policy to individual workloads or applications."
   ],
   [
    "Air gap",
    "Physical isolation of a network or system from all other networks."
   ],
   [
    "Screened subnet",
    "A network segment for public-facing services, separated from both the internet and the internal network; formerly called a DMZ."
   ]
  ],
  "example": "A hospital places its infusion pumps, which cannot run endpoint agents, on their own VLAN. The firewall allows them to talk only to the pump management server on one port. When ransomware later hits an office PC, it cannot reach the pumps.",
  "tip": "Segmentation limits lateral movement. If a device cannot be patched, segmentation or isolation is usually the compensating control the exam wants.",
  "check": [
   [
    "How does segmentation reduce the impact of a compromised workstation?",
    "It restricts which other systems the workstation can reach, limiting lateral movement."
   ],
   [
    "What is the difference between segmentation and an air gap?",
    "Segmentation controls communication between zones; an air gap removes any network connection entirely."
   ],
   [
    "Why is quarantining a suspected infected host a form of isolation?",
    "It cuts the host off from other systems so malware cannot spread or communicate, while keeping it available for investigation."
   ]
  ]
 },
 {
  "t": "Least privilege, access control lists",
  "body": [
   "The principle of least privilege says every user, process and system should have only the minimum access needed to do its job, and only for as long as it is needed. It is one of the most important ideas in security because it limits the damage from mistakes, malware and compromised accounts. If a receptionist's account is phished, least privilege means the attacker gets a receptionist's access, not a domain administrator's.",
   "Applying least privilege looks like this in practice. Users do daily work with standard accounts and use a separate administrative account only when needed. Service accounts get only the permissions the service requires. Access is granted by role rather than copied from a colleague. Temporary access, such as a contractor's project, expires automatically. Just-in-time access and privileged access management (PAM) tools provide elevated rights only for a limited time and log their use. Regular access reviews remove permissions that have built up over time, a problem called privilege creep, which is common when people change roles and keep old access.",
   "An access control list (ACL) is one of the main tools for enforcing least privilege. An ACL is an ordered list of rules attached to a resource that specifies who or what is allowed or denied access and what they may do. There are two common kinds. File system and object ACLs, such as NTFS permissions on a Windows folder, list users or groups with permissions like read, write, modify or full control. Network ACLs on routers, switches and firewalls list rules that permit or deny traffic based on source and destination IP address, protocol and port.",
   "Network ACLs are processed from the top down, and the first matching rule wins. For that reason, specific rules go above general ones. Most ACLs end with an implicit deny: any traffic that does not match an explicit permit is dropped. That behavior supports least privilege, because only what you deliberately allow gets through. A typical rule might read, in plain language, 'permit TCP from the admin subnet to the server subnet on port 22', followed by nothing else for SSH, so every other source is denied.",
   "Well-run ACLs assign permissions to groups rather than individual users, which makes changes and reviews easier. They should be documented, reviewed as part of change management, and tested, because an overly broad rule such as 'permit any any' silently defeats the purpose.",
   "Least privilege also applies to applications and systems: a web application's database account should not be a database administrator, and a container should not run as root. When the exam asks for the principle that limits the impact of a compromised account, the answer is least privilege."
  ],
  "terms": [
   [
    "Least privilege",
    "Granting only the minimum access needed to perform a task, for the minimum time."
   ],
   [
    "Access control list (ACL)",
    "An ordered list of rules on a resource or network device that permits or denies access."
   ],
   [
    "Implicit deny",
    "The default rule at the end of an ACL that blocks anything not explicitly permitted."
   ],
   [
    "Privilege creep",
    "The gradual accumulation of unnecessary permissions as users change roles."
   ],
   [
    "Privileged access management (PAM)",
    "Tools and processes that control, time-limit and monitor use of elevated accounts."
   ]
  ],
  "example": "During a quarterly access review, a manager sees that an employee who moved from payroll to marketing two years ago still has write access to the payroll share. The access is removed, reducing privilege creep and the risk if her account is ever compromised.",
  "tip": "Network ACLs are read top down, first match wins, and end with an implicit deny. Put specific rules before general ones.",
  "check": [
   [
    "What happens to traffic that matches no rule in a typical network ACL?",
    "It is dropped by the implicit deny at the end of the list."
   ],
   [
    "Why should administrators use separate accounts for admin tasks?",
    "Daily activities like email and browsing then run without elevated rights, limiting damage if that account is compromised."
   ],
   [
    "What control detects and fixes privilege creep?",
    "Regular access reviews (recertification) that remove permissions no longer needed."
   ]
  ]
 },
 {
  "t": "Application allow listing",
  "body": [
   "Application allow listing (older term: whitelisting) is a control that lets only approved applications run on a system. Everything else is blocked by default. It is the opposite of a deny list (blacklist), which allows everything except known bad software. Security+ treats allow listing as a strong mitigation because it stops unknown malware, including new variants that antivirus signatures have never seen.",
   "The difference in philosophy matters. A deny list must know about a threat to block it, so it always lags behind attackers. An allow list does not need to know what the threat is; if the software is not on the approved list, it does not run. This fits the implicit-deny idea from access control lists and the principle of least privilege applied to software.",
   "Allow list rules can identify applications in several ways. A hash rule allows a file only if its cryptographic hash matches an approved value, which is very precise but must be updated whenever the program is updated. A publisher or certificate rule allows software signed by a trusted vendor's code signing certificate, which survives updates from that vendor. A path rule allows programs that run from specific folders, such as Program Files, which is easy to manage but weaker if users or malware can write files into those folders. Many organizations combine these approaches.",
   "On Windows, tools such as AppLocker and Windows Defender Application Control implement allow listing, typically deployed through Group Policy or device management. On other platforms, endpoint protection suites and mobile device management provide similar controls. A good rollout starts in audit mode, where the tool logs what would have been blocked without actually blocking it, so you can build an accurate list before enforcing.",
   "The main challenge is operational. Organizations with many different applications and frequent updates must maintain the list, and a poorly maintained list frustrates users and causes help desk tickets. Allow listing is easiest on fixed-purpose systems such as servers, kiosks, point-of-sale terminals and industrial control workstations, where the set of software rarely changes. It is also valuable against fileless and script-based attacks when the policy covers scripts and interpreters such as PowerShell.",
   "Deny lists still have a place, for example blocking specific unwanted applications or known malicious domains, and they are easier to maintain. On the exam, if the goal is to prevent unknown or zero-day malware from executing on a stable system, choose application allow listing."
  ],
  "terms": [
   [
    "Application allow listing",
    "Permitting only explicitly approved applications to run and blocking everything else."
   ],
   [
    "Deny list",
    "Blocking specified known-bad items while allowing everything else."
   ],
   [
    "Hash rule",
    "An allow list rule that identifies an approved file by its cryptographic hash."
   ],
   [
    "Publisher rule",
    "An allow list rule that permits software signed by a trusted vendor's certificate."
   ],
   [
    "Audit mode",
    "A mode where an application control policy logs what it would block without enforcing it."
   ]
  ],
  "example": "A retailer's point-of-sale terminals need only the checkout software and a few system tools. The team enables application allow listing using publisher rules. When a phishing-delivered malware sample is later copied to one terminal, it simply fails to launch because it is not on the list.",
  "tip": "Allow listing blocks unknown threats by default; deny listing only blocks what it already knows. Allow listing works best on systems whose software rarely changes.",
  "check": [
   [
    "Why is allow listing effective against zero-day malware?",
    "Anything not explicitly approved is blocked, so new malware is stopped even without a signature."
   ],
   [
    "What is the drawback of hash-based allow list rules?",
    "Every software update changes the hash, so the list must be updated each time."
   ],
   [
    "Why start an allow listing rollout in audit mode?",
    "To see what would be blocked and build an accurate list before enforcement disrupts users."
   ]
  ]
 },
 {
  "t": "Patching, encryption, monitoring",
  "body": [
   "This topic groups three mitigation techniques that underpin almost every security program. They are basic, but most breaches trace back to one of them being neglected: an unpatched system, unencrypted data or activity nobody was watching.",
   "Patching fixes known vulnerabilities in operating systems, applications and firmware. Attackers routinely exploit vulnerabilities for which patches have been available for months, so a fast, reliable patch process removes a large share of risk. A mature process includes an up-to-date asset inventory (you cannot patch what you do not know about), vulnerability scanning to find missing patches, prioritization by severity and exposure (internet-facing and actively exploited issues first), testing patches before broad deployment, scheduled rollout through change management with a backout plan, and verification afterward. Automation helps enormously. Firmware on network devices, printers and IoT devices is easy to forget. When a patch cannot be applied, for example on legacy or end-of-life systems, compensating controls such as segmentation are required.",
   "Encryption protects confidentiality, and sometimes integrity, when other controls fail. Encrypt data at rest with full disk, volume, database or file encryption so stolen devices and copied databases do not expose data. Encrypt data in transit with TLS, SSH, IPsec VPNs and secure protocols rather than cleartext ones. Good encryption depends on key management: keys stored in TPMs, HSMs or a KMS, rotated and protected by access control. Encryption also has a limit to remember: it does not help if an attacker controls an authorized account or a running, unlocked system, which is why it is combined with other controls.",
   "Monitoring provides visibility. Without it, attacks may run for months unnoticed. Monitoring includes collecting logs from endpoints, servers, network devices and cloud services into a security information and event management (SIEM) system that correlates events and raises alerts; endpoint detection and response (EDR) on hosts; intrusion detection and prevention systems on the network; and file integrity monitoring on critical files. Monitoring is only useful if alerts are tuned to reduce false positives and someone reviews and responds to them. Baselines of normal behavior make anomalies, like the indicators in the earlier lesson, stand out.",
   "These three work as layers, an example of defense in depth. Patching reduces the number of doors an attacker can open. Encryption reduces what they gain if they get in. Monitoring lets you notice and respond quickly. The exam often gives a scenario and asks which mitigation best addresses it: a known vulnerability calls for patching, exposed sensitive data calls for encryption, and undetected activity calls for monitoring.",
   "In your labs, you will see these directly: running an update command such as `sudo apt update && sudo apt upgrade` on Linux, enabling BitLocker, and reading events in a log viewer or SIEM dashboard."
  ],
  "terms": [
   [
    "Patch management",
    "The process of identifying, testing, deploying and verifying software and firmware updates."
   ],
   [
    "SIEM",
    "Security information and event management, a system that collects and correlates logs and raises alerts."
   ],
   [
    "EDR",
    "Endpoint detection and response, software that monitors endpoint behavior to detect and respond to threats."
   ],
   [
    "Defense in depth",
    "Layering multiple independent controls so that one failure does not lead to compromise."
   ],
   [
    "End-of-life system",
    "A product that no longer receives vendor updates or support."
   ]
  ],
  "example": "A vulnerability scan shows a critical, actively exploited flaw on an internet-facing VPN appliance. The team patches it first in an emergency change, confirms through a rescan that it is fixed, and adds a SIEM alert for logins to the appliance from unusual countries in case it was exploited before patching.",
  "tip": "Known vulnerability: patch. Data exposure risk: encrypt. Undetected activity: monitor. If a system cannot be patched, choose a compensating control like segmentation.",
  "check": [
   [
    "Why is an asset inventory essential for patching?",
    "You cannot patch systems you do not know exist, so unknown assets stay vulnerable."
   ],
   [
    "Which patches should typically be prioritized first?",
    "Critical vulnerabilities on internet-facing systems, especially those known to be actively exploited."
   ],
   [
    "What does a SIEM add beyond individual system logs?",
    "Centralized collection and correlation across sources, with alerting on suspicious patterns."
   ]
  ]
 },
 {
  "t": "Hardening: disable ports/services, change defaults, remove unused software",
  "body": [
   "Hardening means reducing a system's attack surface and configuring it securely before and throughout its use. Out of the box, many operating systems, network devices and applications are configured for easy setup rather than security: extra services are running, default accounts exist and convenient but risky features are enabled. Hardening reverses that.",
   "Disabling unnecessary ports and services is the first step. Every listening service is a potential entry point and something to patch. If a server only needs to serve web pages, it should not also be running file sharing, remote desktop, an FTP server or an old management interface. You can list listening ports with commands such as `ss -tulpn` on Linux or `netstat -ano` on Windows, or scan the host from another machine you control, then stop and disable anything not required. Host-based firewalls add a second layer by blocking ports that should not be reachable. On switches, disable unused physical ports so no one can simply plug in a rogue device.",
   "Changing defaults is next. Default usernames and passwords for routers, cameras, printers, databases and admin consoles are publicly documented, and automated attacks try them constantly; some IoT botnets were built almost entirely this way. Change default passwords to strong unique ones, rename or disable default administrator accounts where possible, and change other risky defaults such as SNMP community strings, default Wi-Fi network settings and sample web pages. Some regulations now discourage devices shipping with universal default passwords, but you should always verify.",
   "Removing unused software reduces the amount of code that can contain vulnerabilities. Preinstalled trial software (bloatware), old runtimes, unused browser plugins, sample applications and development tools on production servers should be uninstalled. Software that is not installed does not need patching and cannot be exploited.",
   "Hardening is usually guided by secure baselines: documented, tested configurations for each system type. Organizations build them from vendor guides and industry benchmarks such as the Center for Internet Security (CIS) Benchmarks or government security technical implementation guides. Baselines are then deployed consistently with tools such as Group Policy, configuration management or infrastructure as code, and systems are regularly checked for drift from the baseline. Other hardening steps include enabling host firewalls and endpoint protection, applying encryption, enforcing strong authentication, configuring logging, and patching.",
   "Hardening applies everywhere: workstations, servers, mobile devices, network equipment, cloud resources, embedded and IoT devices, and industrial systems. The goal and method are the same each time: know what the system must do, allow only that, and remove or lock down everything else."
  ],
  "terms": [
   [
    "Hardening",
    "Reducing a system's attack surface and applying secure configuration settings."
   ],
   [
    "Secure baseline",
    "A documented, approved secure configuration used as the standard for a type of system."
   ],
   [
    "Default credentials",
    "Factory-set usernames and passwords that are publicly known and must be changed."
   ],
   [
    "Configuration drift",
    "Gradual deviation of a system's settings from its approved baseline."
   ],
   [
    "CIS Benchmarks",
    "Consensus-based secure configuration guides for many operating systems, applications and devices."
   ]
  ],
  "example": "Before deploying a new web server, an administrator applies the organization's baseline: she disables the unused FTP and print services, closes all ports except 443 and a restricted SSH port, removes sample web applications, changes the default admin account, and enables logging to the SIEM.",
  "tip": "If the question is about reducing attack surface, the answer is usually hardening: disable unneeded services and ports, change default credentials and remove unused software.",
  "check": [
   [
    "Why should unused services be disabled even if they are patched?",
    "Each running service is an extra entry point that may have future vulnerabilities or be misconfigured; removing it shrinks the attack surface."
   ],
   [
    "What makes default credentials so dangerous?",
    "They are publicly documented, so attackers and automated tools can try them against any exposed device."
   ],
   [
    "What is a secure baseline used for?",
    "It defines the approved secure configuration for a system type so systems can be built consistently and checked for drift."
   ]
  ]
 },
 {
  "t": "Cloud: IaaS/PaaS/SaaS and shared responsibility",
  "body": [
   "Cloud computing means renting computing resources from a provider instead of buying and running them yourself. The provider owns the data centers, hardware and a growing share of the software stack, and you pay for what you use. For security, the key question is always the same: who is responsible for protecting each layer? The answer depends on the service model you choose, and the exam expects you to know it layer by layer.",
   "Infrastructure as a Service (IaaS) gives you virtual machines, virtual networks and storage. The provider secures the physical facility, the hardware and the hypervisor. You are responsible for everything you build on top: the guest operating system and its patches, installed applications, firewall rules (often called security groups), identities and the data itself. IaaS gives you the most control and therefore the most responsibility.",
   "Platform as a Service (PaaS) gives you a managed runtime, such as an application hosting platform or a managed database. The provider now also patches the operating system and the platform software. You still own your application code, its configuration, the accounts that can reach it and your data. Software as a Service (SaaS) is a finished application you log into, such as web-based email or a customer relationship management system. The provider runs almost everything; you remain responsible for who has accounts, how they authenticate, how sharing and other settings are configured, and what data you put in.",
   "The shared responsibility model is the written split of these duties. A useful summary: the provider is responsible for security of the cloud, and the customer is responsible for security in the cloud. Across every model, the customer always keeps responsibility for data, identities and access decisions. That is why many real cloud breaches come from customer mistakes such as a storage bucket left open to the public, overly broad administrator roles or missing multifactor authentication (MFA), not from the provider being hacked.",
   "You will also see deployment models. A public cloud is shared by many customers (multitenancy) with logical separation. A private cloud is dedicated to one organization. A community cloud is shared by organizations with common needs, and a hybrid cloud combines on-premises or private resources with public cloud. Tools such as a cloud access security broker (CASB) sit between users and cloud services to give visibility and enforce policy, for example blocking uploads of sensitive files to unapproved SaaS apps.",
   "In a lab or console you will see the customer side of this split: creating identity and access management (IAM) users and roles, setting security group rules, enabling encryption on storage and turning on logging. Those are all your responsibility, whatever the model."
  ],
  "terms": [
   [
    "IaaS",
    "Infrastructure as a Service: rented virtual machines, networks and storage; the customer manages the OS and above."
   ],
   [
    "PaaS",
    "Platform as a Service: a managed runtime or database; the customer manages code, configuration, access and data."
   ],
   [
    "SaaS",
    "Software as a Service: a complete hosted application; the customer manages accounts, settings and data."
   ],
   [
    "Shared responsibility model",
    "The division of security duties between cloud provider and customer, which shifts with the service model."
   ],
   [
    "CASB",
    "Cloud access security broker: a control point that gives visibility and enforces policy on cloud service use."
   ]
  ],
  "example": "A company moves its file shares to a public cloud storage service. An engineer testing a website makes one storage bucket publicly readable and forgets to change it back. Months later a researcher finds customer records exposed. The provider's infrastructure worked correctly; the breach came from a customer-side configuration, which the shared responsibility model places squarely on the company.",
  "tip": "If a question asks who patches the guest OS in IaaS, the answer is the customer. In every model, the customer is responsible for data and access, so misconfiguration questions point back to the customer.",
  "check": [
   [
    "In a PaaS deployment, who is responsible for patching the underlying operating system?",
    "The cloud provider. In PaaS the provider manages the OS and runtime; the customer manages application code, configuration, access and data."
   ],
   [
    "Which responsibility stays with the customer in IaaS, PaaS and SaaS alike?",
    "Protecting its data and managing identities and access, including who has accounts and what permissions they hold."
   ],
   [
    "What tool would give an organization visibility into which SaaS apps employees use and block risky uploads?",
    "A cloud access security broker (CASB), which sits between users and cloud services to monitor and enforce policy."
   ]
  ]
 },
 {
  "t": "IaC, serverless, microservices, containers",
  "body": [
   "Modern applications are rarely one big program on one server. They are built from small parts, deployed automatically and often run on infrastructure the team never touches directly. Each of these architecture choices changes where risk lives, and Security+ asks you to recognize the benefits and the new attack surface of each.",
   "Infrastructure as code (IaC) means describing servers, networks and permissions in text files (templates or scripts) that a tool reads to build the environment. The security benefit is consistency: the same reviewed file produces the same secure configuration every time, which reduces configuration drift and makes changes auditable through version control. The risk is that a mistake in a template is copied everywhere at once, and that secrets such as passwords or keys sometimes end up hard-coded in the files. Scanning templates before deployment and keeping secrets in a dedicated secrets manager address both.",
   "Serverless computing (often function as a service) lets you upload a small function that the provider runs only when an event triggers it. You do not manage any operating system, so patching the server is no longer your job. Your remaining concerns are the function code, its dependencies, the permissions it is granted and the events that can trigger it. A common mistake is giving a function far broader access than it needs, which breaks least privilege.",
   "Microservices split an application into many small services that talk to each other over the network, usually through application programming interfaces (APIs). This improves scalability and lets teams update one part without redeploying everything. The trade-off is many more network connections to secure: each service needs authentication, authorization and encrypted communication, and the APIs themselves become targets. An API gateway often centralizes authentication and rate limiting.",
   "Containers package an application with its libraries and settings into an image that runs in an isolated space on a shared host kernel. Containers are lighter than virtual machines because they do not each carry a full operating system, but that shared kernel means isolation is weaker than a hypervisor provides. Key controls are using trusted, minimal base images, scanning images for known vulnerabilities, not running containers as root, and keeping the host and orchestration platform patched. Orchestration tools such as Kubernetes schedule and manage many containers and have their own access controls that must be locked down.",
   "The common thread is that these approaches move security earlier, into code and configuration. Reviewing templates, images and permissions before deployment is much cheaper than finding a problem in production."
  ],
  "terms": [
   [
    "Infrastructure as code (IaC)",
    "Defining and building infrastructure from version-controlled configuration files instead of manual setup."
   ],
   [
    "Serverless",
    "A model where the provider runs event-triggered code without the customer managing servers or operating systems."
   ],
   [
    "Microservices",
    "An architecture that splits an application into small independent services communicating through APIs."
   ],
   [
    "Container",
    "A lightweight package of an application and its dependencies that runs isolated on a shared host kernel."
   ],
   [
    "Configuration drift",
    "The gradual divergence of systems from their intended, documented configuration."
   ]
  ],
  "example": "A development team builds its cloud network from an IaC template. A reviewer notices the template opens remote administration to the whole internet and contains an embedded database password. Fixing the template once, and moving the password to a secrets manager, corrects every future deployment instead of dozens of servers one by one.",
  "tip": "Containers share the host kernel; virtual machines each have their own OS on a hypervisor. If a question stresses stronger isolation, VMs win; if it stresses lightweight and portable, containers win.",
  "check": [
   [
    "What is the main security benefit of infrastructure as code?",
    "Consistent, repeatable and reviewable configurations that reduce drift and human error, with changes tracked in version control."
   ],
   [
    "In a serverless model, which security task no longer belongs to the customer?",
    "Patching and managing the underlying servers and operating systems. The customer still owns code, dependencies and permissions."
   ],
   [
    "Why is container isolation considered weaker than VM isolation?",
    "Containers share the host operating system kernel, so a kernel flaw can affect all containers, whereas each VM runs its own OS on a hypervisor."
   ]
  ]
 },
 {
  "t": "Virtualization risks: VM escape, sprawl",
  "body": [
   "Virtualization lets one physical server run many virtual machines (VMs). A thin layer of software called the hypervisor divides the hardware and keeps each VM separate. A Type 1 (bare-metal) hypervisor runs directly on the hardware and is typical in data centers and clouds. A Type 2 (hosted) hypervisor runs as an application on top of a normal operating system, like desktop virtualization software on a laptop. Virtualization saves money and makes systems easy to copy and restore, but it introduces risks you must recognize.",
   "VM escape is the most serious. It happens when an attacker who controls one guest VM exploits a flaw in the hypervisor or virtual hardware to break out and run code on the host, or reach other VMs on it. Because a single host may run workloads for many departments or, in a cloud, many customers, an escape defeats the isolation everything else depends on. Defenses are keeping hypervisors patched, disabling unneeded virtual devices and shared features (such as shared clipboards and folders between host and guest), and separating workloads of very different sensitivity onto different hosts.",
   "Resource reuse is a related concern. When a VM is deleted, its memory and disk space are reassigned to other VMs. If that space is not properly cleared, remnants of the old data could be exposed. Hypervisors and cloud providers are designed to prevent this, but it is a recognized risk category.",
   "VM sprawl is an operational problem that becomes a security one. Because creating a VM takes minutes, organizations accumulate VMs nobody tracks: test machines, old copies and forgotten projects. Unmanaged VMs are not patched or monitored, may hold sensitive data and can become an easy entry point. The fix is governance: an inventory of every VM with an owner, approval processes for creating them, regular reviews and automatic expiry for temporary ones.",
   "Snapshots, which capture a VM's state at a point in time, are useful for quick rollback but can also hold old, unpatched configurations or sensitive data, so they need the same protection and retention rules as backups.",
   "On the exam, match symptoms to terms: breaking out of a guest to the host is VM escape; too many unmanaged VMs is sprawl; leftover data from a previous tenant is resource reuse."
  ],
  "terms": [
   [
    "Hypervisor",
    "Software that creates and runs virtual machines and isolates them from one another."
   ],
   [
    "VM escape",
    "An attack in which code in a guest VM breaks isolation to reach the hypervisor, host or other VMs."
   ],
   [
    "VM sprawl",
    "Uncontrolled growth of virtual machines that are not tracked, patched or monitored."
   ],
   [
    "Type 1 hypervisor",
    "A bare-metal hypervisor that runs directly on hardware without a host OS."
   ],
   [
    "Snapshot",
    "A saved copy of a VM's state at a moment in time, used for rollback."
   ]
  ],
  "example": "During an audit, a hospital finds 40 VMs with no listed owner. Several run an outdated operating system and one contains a copy of a patient database from a finished project. The team builds an inventory, assigns owners, deletes what is not needed and requires expiry dates on all new test VMs.",
  "tip": "VM escape is about isolation failing at the hypervisor; sprawl is about lost control and inventory. Patching the hypervisor addresses escape; asset management addresses sprawl.",
  "check": [
   [
    "What makes VM escape especially dangerous in a public cloud?",
    "The host may run VMs for many customers, so breaking out of one guest could expose other tenants' workloads and data."
   ],
   [
    "Which control best addresses VM sprawl?",
    "Asset management and governance: an inventory with owners, approval for new VMs, regular reviews and decommissioning of unused ones."
   ]
  ]
 },
 {
  "t": "ICS/SCADA, IoT, embedded, RTOS",
  "body": [
   "Not every computer looks like a laptop or server. Many run inside machines, factories, buildings and consumer gadgets. They share traits that make them hard to secure: long lifespans, limited processing power, rare updates and a focus on reliability and safety rather than confidentiality. Security+ expects you to know the categories and the compensating controls used to protect them.",
   "Industrial control systems (ICS) monitor and control physical processes such as power generation, water treatment and manufacturing. Supervisory control and data acquisition (SCADA) is a type of ICS that manages equipment spread over large areas, such as pipelines or electrical grids, from a central control center. Components include programmable logic controllers (PLCs), which directly operate valves and motors, and human-machine interfaces (HMIs), the screens operators use. In these environments availability and safety come first: shutting down a plant to install a patch may be impossible or dangerous, and many systems run for decades.",
   "The Internet of Things (IoT) means everyday devices with network connections: cameras, smart thermostats, medical monitors and building sensors. Common weaknesses are default or hard-coded passwords, unencrypted communications, no update mechanism and vendors who stop supporting the product. Embedded systems are computers built into a larger device to do one job, like the controller in a printer or a car. A real-time operating system (RTOS) is designed to respond to events within strict timing limits, which is why it appears in vehicles, aircraft, medical devices and industrial controllers. Security features that add delay, such as heavy scanning, may not be acceptable.",
   "Because you often cannot patch or install agents on these devices, the main defenses are compensating controls. Network segmentation places them on separate networks or VLANs with tightly filtered connections to the corporate network. Highly critical systems may be air-gapped, meaning physically disconnected from other networks. Other controls include changing default credentials, disabling unused services, monitoring traffic for unusual behavior, strict vendor remote-access procedures and planning for device replacement when support ends.",
   "Keep in mind the priority shift: for ordinary IT the CIA triad is often read as confidentiality first, but for ICS and many embedded systems availability and integrity (plus human safety) usually matter most."
  ],
  "terms": [
   [
    "ICS",
    "Industrial control system: computers and devices that monitor and control physical industrial processes."
   ],
   [
    "SCADA",
    "Supervisory control and data acquisition: an ICS type that centrally manages geographically distributed equipment."
   ],
   [
    "PLC",
    "Programmable logic controller: a rugged industrial computer that directly controls machinery."
   ],
   [
    "RTOS",
    "Real-time operating system: an OS that guarantees responses within strict time limits."
   ],
   [
    "Air gap",
    "Physical isolation of a system from untrusted networks."
   ]
  ],
  "example": "A water utility cannot patch the old operating system on its treatment plant HMIs without vendor recertification. It places them in an isolated network segment, allows only specific protocols from one monitored jump host, disables USB ports and watches the segment with a passive monitoring sensor.",
  "tip": "When a question says a device cannot be patched, look for segmentation, isolation or another compensating control rather than 'install the latest update'.",
  "check": [
   [
    "Why are ICS environments often slow to apply patches?",
    "They prioritize availability and safety; downtime for patching may disrupt critical processes, and vendors may need to certify changes."
   ],
   [
    "What is the most common compensating control for vulnerable IoT devices?",
    "Network segmentation, placing them on isolated networks or VLANs with tightly restricted traffic, plus changing default credentials."
   ],
   [
    "What distinguishes an RTOS from a general-purpose OS?",
    "An RTOS guarantees responses within strict timing limits, which matters for vehicles, medical devices and industrial control."
   ]
  ]
 },
 {
  "t": "On-prem vs cloud vs hybrid trade-offs",
  "body": [
   "Where you run your systems is a security decision, not just a budget one. On-premises (on-prem) means your own hardware in your own facility. Cloud means a provider's infrastructure accessed over the network. Hybrid combines both, such as keeping a sensitive database on-prem while running a public website in the cloud. Security+ asks you to weigh these options against considerations like control, cost, responsiveness, scalability and compliance.",
   "On-prem gives you the most control. You decide on every piece of hardware, who enters the building and how data is handled, which can make some regulatory requirements easier to prove. The costs are that you pay up front for capacity (capital expense), you are responsible for everything from power and cooling to patching, and scaling up takes time to buy and install equipment. Physical security, staffing and disaster recovery are all yours.",
   "Cloud shifts much of that work to the provider. You gain fast scalability, pay-as-you-go pricing (operational expense), access to built-in redundancy across regions and security tools you would struggle to build yourself. The trade-offs are reduced control and visibility, dependence on the provider's availability and practices (vendor lock-in), and data sovereignty questions: laws may require certain data to stay within a country, so you must know where the provider stores it. The shared responsibility model means misconfiguration risk stays with you.",
   "Hybrid tries to get the best of both, but adds complexity. You now have two environments with different tools, identity systems and logging, and the connection between them must be secured. Consistent policy across both, centralized identity (for example single sign-on) and unified monitoring are the usual answers. Multi-cloud, using more than one provider, adds resilience and bargaining power but multiplies this complexity.",
   "The exam's architecture considerations are worth knowing by name: availability, resilience, cost, responsiveness, scalability, ease of deployment, ease of recovery, patch availability, inability to patch, power and compute. Match the requirement to the model. Need to scale quickly for seasonal load? Cloud. Must keep full physical control of classified data? On-prem. Need both? Hybrid.",
   "Also remember that moving to the cloud does not remove the need for a risk assessment; it changes which risks you manage directly and which you manage through contracts and provider assurances."
  ],
  "terms": [
   [
    "On-premises",
    "Infrastructure owned and operated in the organization's own facilities."
   ],
   [
    "Hybrid cloud",
    "An environment combining on-premises or private resources with public cloud services."
   ],
   [
    "Data sovereignty",
    "The principle that data is subject to the laws of the country where it is stored."
   ],
   [
    "Vendor lock-in",
    "Dependence on one provider that makes switching difficult or costly."
   ]
  ],
  "example": "A retailer keeps its payment processing on-prem, where it has tight control for compliance audits, but runs its marketing website in the cloud so it can scale during holiday sales. It connects them with an encrypted site-to-site VPN and uses one identity provider for staff access to both.",
  "tip": "Data sovereignty questions usually point to knowing or restricting the geographic region where cloud data is stored, not to encryption alone.",
  "check": [
   [
    "Which model best suits a workload with large, unpredictable spikes in demand?",
    "Cloud, because it scales quickly and charges for what is used, without buying hardware for peak load."
   ],
   [
    "What is a key security challenge introduced by hybrid environments?",
    "Complexity: keeping identity, policy, logging and monitoring consistent across two different environments and securing the link between them."
   ]
  ]
 },
 {
  "t": "Firewalls (L4/L7, NGFW), WAF, UTM",
  "body": [
   "A firewall enforces rules about which network traffic may pass between zones, such as between the internet and your internal network. Rules are processed in order, typically top to bottom, and the first match wins. A well-built rule set ends with an implicit or explicit deny: anything not specifically allowed is blocked. That default-deny approach is a core exam idea.",
   "Firewalls differ by how deeply they look at traffic, which maps to layers of the OSI model. A Layer 4 (transport layer) firewall makes decisions on source and destination IP addresses, port numbers and protocol (TCP or UDP). A stateless packet filter judges each packet alone; a stateful firewall tracks connections, so it knows a reply belongs to a session your user started and can drop unsolicited packets. Layer 4 filtering is fast but cannot tell what application is inside an allowed port. Anything can ride over port 443.",
   "A Layer 7 (application layer) firewall understands the application protocol itself. It can tell web browsing from file-sharing tunneled over the same port, and allow or block based on the application, user or content. A next-generation firewall (NGFW) combines stateful filtering with application awareness, often integrated intrusion prevention, user identity and, if configured, decryption of TLS traffic for inspection.",
   "A web application firewall (WAF) is specialized: it sits in front of web applications and inspects HTTP requests for attacks such as SQL injection and cross-site scripting. A normal firewall protects networks; a WAF protects a website or API. It is often the fastest way to shield an application with a known flaw while developers fix the code.",
   "Unified threat management (UTM) is an all-in-one appliance combining firewall, intrusion prevention, antivirus, content filtering, VPN and sometimes spam filtering. It suits small and midsize organizations that want one box to manage. The trade-offs are a single point of failure and possible performance limits when every feature is on.",
   "A sample rule set in a lab might read like this, evaluated top to bottom:",
   "```text\n1  ALLOW  TCP  any       -> 10.0.5.10  443   (public web server)\n2  ALLOW  TCP  10.0.1.0/24 -> 10.0.5.20  22   (admins to jump host)\n3  DENY   IP   any       -> any        any   (default deny)\n```"
  ],
  "terms": [
   [
    "Stateful firewall",
    "A firewall that tracks connection state and allows return traffic for established sessions."
   ],
   [
    "NGFW",
    "Next-generation firewall: combines stateful filtering with application awareness, user identity and often IPS."
   ],
   [
    "WAF",
    "Web application firewall: inspects HTTP traffic to block web attacks like SQL injection and XSS."
   ],
   [
    "UTM",
    "Unified threat management: a single appliance bundling firewall, IPS, antivirus, filtering and VPN."
   ],
   [
    "Implicit deny",
    "The rule that traffic not explicitly permitted is blocked."
   ]
  ],
  "example": "An online store discovers its search page is vulnerable to SQL injection. The code fix will take two weeks. The security team enables WAF rules that block injection patterns on that page, protecting customers while developers correct the code.",
  "tip": "Protecting a web application from injection or XSS means WAF. Controlling by port and IP means Layer 4. Identifying applications regardless of port means Layer 7 or NGFW.",
  "check": [
   [
    "Why can't a Layer 4 firewall stop a malicious application using port 443?",
    "It only sees addresses, ports and protocol, not the application content, so any traffic on an allowed port passes."
   ],
   [
    "What does rule order matter for in a firewall?",
    "Rules are processed top to bottom and the first match applies, so a broad allow above a specific deny will override it."
   ],
   [
    "When is a UTM appliance a good fit?",
    "For smaller organizations wanting many security functions managed in one device, accepting the single-point-of-failure and performance trade-offs."
   ]
  ]
 },
 {
  "t": "IDS vs IPS, inline vs tap",
  "body": [
   "An intrusion detection system (IDS) watches traffic or activity and alerts when it sees something suspicious. An intrusion prevention system (IPS) does the same analysis but can also act, dropping malicious packets or resetting connections before they reach the target. The difference is detection versus prevention, and it follows directly from where the device sits.",
   "An IPS must be inline, meaning traffic physically passes through it on its way to the destination. That placement lets it block, but it also means the IPS adds a little latency and becomes a potential point of failure: if it crashes or is overwhelmed, traffic may stop (or pass uninspected, depending on its fail mode). An IDS is usually placed out of band, receiving a copy of the traffic. Because it only sees a copy, it cannot stop an attack in progress, but it also cannot disrupt the network if it fails.",
   "The copy can come from two sources. A switch port analyzer (SPAN) or port mirror configures a switch to send copies of traffic from chosen ports to the monitoring port. It is cheap and flexible but can drop packets when the switch is busy. A network tap is a hardware device inserted into a cable that copies all traffic passively and reliably. Taps are preferred when you need a complete copy, for example for forensics.",
   "Detection methods matter too. Signature-based detection compares traffic to patterns of known attacks: accurate for known threats, blind to new ones until signatures are updated. Anomaly-based (behavior-based) detection learns a baseline of normal activity and flags deviations: it can catch new attacks but produces more false positives. Many products combine both. There are also host-based versions (HIDS and HIPS) that run on an individual system and can see things network sensors cannot, such as file changes and decrypted traffic.",
   "Tuning is the ongoing work. A false positive is an alert on harmless activity; a false negative is a missed real attack. Too many false positives cause alert fatigue, and in an IPS they can block legitimate business traffic, which is why new IPS rules are often run in detect-only mode first."
  ],
  "terms": [
   [
    "IDS",
    "Intrusion detection system: monitors and alerts on suspicious activity without blocking it."
   ],
   [
    "IPS",
    "Intrusion prevention system: an inline system that can block malicious traffic in real time."
   ],
   [
    "Network tap",
    "A hardware device that passively copies all traffic on a link to a monitoring device."
   ],
   [
    "SPAN / port mirror",
    "A switch feature that copies traffic from selected ports to a monitoring port."
   ],
   [
    "Signature-based detection",
    "Detection by matching known attack patterns."
   ],
   [
    "Anomaly-based detection",
    "Detection of deviations from a learned baseline of normal behavior."
   ]
  ],
  "example": "A company deploys a new IPS inline at its internet edge but runs it in alert-only mode for two weeks. Tuning reveals a rule that would have blocked its payroll provider's legitimate uploads. After adjusting the rule, the team switches the IPS to blocking mode with confidence.",
  "tip": "Inline equals can block (IPS); passive copy via tap or SPAN equals alert only (IDS). If a question needs zero impact on traffic flow, choose passive monitoring.",
  "check": [
   [
    "Why can an IDS connected to a SPAN port not stop an attack?",
    "It receives only a copy of the traffic, so the original packets reach their destination regardless of what the IDS sees."
   ],
   [
    "Which detection method is more likely to catch a brand-new attack, and what is its downside?",
    "Anomaly-based detection, because it flags deviations from normal behavior; its downside is a higher rate of false positives."
   ],
   [
    "Why would you choose a hardware tap over a SPAN port?",
    "A tap passively copies all traffic reliably, while a busy switch may drop mirrored packets."
   ]
  ]
 },
 {
  "t": "Fail-open vs fail-closed",
  "body": [
   "Every security control eventually fails: power drops, software crashes, a license expires or a device is overwhelmed. The design question is what happens at that moment. A fail-open device lets everything through when it fails. A fail-closed device blocks everything when it fails. Neither is always right; the choice depends on whether availability or security matters more for that particular control.",
   "Fail-closed (also called fail-secure) favors confidentiality and integrity. If an inline intrusion prevention system (IPS) or firewall configured to fail closed crashes, traffic stops. No uninspected traffic slips through, but the business may be offline until the device is repaired. This makes sense where exposure is worse than downtime, such as the boundary in front of a sensitive database or a payment system.",
   "Fail-open favors availability. If a fail-open IPS fails, traffic keeps flowing without inspection. Users notice nothing, but attacks could pass unseen for as long as the device is down. Many network appliances offer a hardware bypass feature for exactly this reason, used where uptime is critical and other layers of defense exist.",
   "Physical security adds an important twist, because human life can be at stake. The terms fail-safe and fail-secure are used for doors and locks. A fail-safe lock unlocks when power is lost, so people can escape a fire; fire and life-safety codes often require this on exit routes. A fail-secure lock stays locked when power is lost, protecting a server room or vault. Remember that life safety always outranks protecting assets, so an exam question about emergency exits points to fail-safe (open) behavior.",
   "Good design reduces how often this choice matters. Redundant pairs of devices (high availability) let a second unit take over when the first fails. Monitoring and alerts make sure a fail-open condition is noticed quickly, so the unprotected window is short. And documenting the chosen failure mode for each control ensures incident responders know what to expect.",
   "When you read a scenario, ask two questions: what is harmed more, an outage or an undetected breach? And is anyone's physical safety involved? Those answers point you to the right mode."
  ],
  "terms": [
   [
    "Fail-open",
    "A failure mode where a control allows all traffic or access when it stops working, preserving availability."
   ],
   [
    "Fail-closed",
    "A failure mode where a control blocks all traffic or access when it stops working, preserving security."
   ],
   [
    "Fail-safe lock",
    "A physical lock that releases on power loss so people can exit safely."
   ],
   [
    "Fail-secure lock",
    "A physical lock that stays locked on power loss to protect assets."
   ]
  ],
  "example": "A hospital places an inline IPS in front of its patient-monitoring network. Because an outage could interrupt care, it configures the IPS to fail open with a hardware bypass and adds an alert that pages the on-call engineer the moment bypass engages. In front of its billing database, where a breach is the bigger risk, a firewall is set to fail closed.",
  "tip": "Doors on escape routes fail safe (unlock) because life safety comes first. For network controls, pick fail-closed when confidentiality matters most and fail-open when availability matters most.",
  "check": [
   [
    "An inline IPS fails and all traffic stops. Which failure mode was configured?",
    "Fail-closed. It blocked traffic rather than letting it pass uninspected."
   ],
   [
    "Why would a building's emergency exit doors be set to unlock on power failure?",
    "Life safety takes priority; fail-safe behavior lets people evacuate during a fire or outage."
   ]
  ]
 },
 {
  "t": "802.1X, NAC, port security",
  "body": [
   "Anyone who can plug a cable into an office wall jack or join the Wi-Fi is, physically, on your network. Port-based access controls decide whether that device should get real access. Security+ tests three related tools: port security, IEEE 802.1X and network access control (NAC).",
   "Port security is a switch feature that limits which devices can use a port based on their media access control (MAC) address. You can allow only specific MAC addresses, or allow only the first one or two addresses the switch learns, and choose what happens on a violation: drop the traffic, log it, or shut the port down. It stops casual plug-ins and some MAC flooding attacks, but MAC addresses are easy to spoof, so it is a basic control rather than strong authentication.",
   "IEEE 802.1X is port-based network access control using real authentication. It has three roles. The supplicant is the software on the device asking for access. The authenticator is the switch or wireless access point, which blocks all traffic except authentication messages until the user or device is approved. The authentication server, usually a RADIUS server, checks credentials against a directory and tells the authenticator to allow or deny. The messages use the Extensible Authentication Protocol (EAP), which supports methods ranging from passwords inside an encrypted tunnel to digital certificates. The same framework secures enterprise Wi-Fi.",
   "Network access control (NAC) goes further by checking the health, or posture, of a device before and during access. A NAC policy might require current antivirus, a supported operating system version and disk encryption. Devices that fail can be placed in a quarantine or remediation VLAN where they can reach only update servers. NAC may use a persistent agent installed on managed devices, a dissolvable agent that runs once and removes itself (useful for guests), or agentless checks that query the device over the network.",
   "These layers stack. Port security is simple and local to the switch. 802.1X answers who you are. NAC adds whether your device is safe enough, and can assign different network access based on role, for example employees to the corporate VLAN and visitors to a guest VLAN."
  ],
  "terms": [
   [
    "802.1X",
    "An IEEE standard for port-based authentication that blocks network access until a device or user is authenticated."
   ],
   [
    "Supplicant",
    "The client software requesting access in 802.1X."
   ],
   [
    "Authenticator",
    "The switch or access point that enforces 802.1X by relaying authentication and controlling the port."
   ],
   [
    "NAC",
    "Network access control: evaluates identity and device health before granting network access."
   ],
   [
    "Port security",
    "A switch feature that restricts a port to specific or a limited number of MAC addresses."
   ]
  ],
  "example": "A visitor plugs a personal laptop into a conference room jack. The switch, using 802.1X, sees no valid credentials and places the port in a guest VLAN that reaches only the internet. Meanwhile an employee laptop missing security updates authenticates successfully, but NAC posture checks send it to a remediation VLAN until it installs them.",
  "tip": "Know the three 802.1X roles: supplicant (client), authenticator (switch or AP), authentication server (RADIUS). If a question mentions checking antivirus or patch status before access, the answer is NAC.",
  "check": [
   [
    "In 802.1X, which component actually verifies the credentials?",
    "The authentication server, typically a RADIUS server, which tells the authenticator whether to allow the connection."
   ],
   [
    "Why is port security based on MAC addresses considered weak on its own?",
    "MAC addresses can be easily spoofed, so an attacker can impersonate an allowed device."
   ],
   [
    "What does NAC add beyond authentication?",
    "Posture assessment: checking device health such as patches and antivirus, and quarantining devices that fail."
   ]
  ]
 },
 {
  "t": "VPN, IPsec, TLS, SD-WAN, SASE, jump servers, proxies",
  "body": [
   "Organizations need to connect users and sites across untrusted networks like the internet, and to control how traffic reaches sensitive systems. This lesson covers the building blocks for secure connectivity and controlled access.",
   "A virtual private network (VPN) creates an encrypted tunnel over an untrusted network. A site-to-site VPN connects two networks, such as a branch office and headquarters, usually between firewalls or routers. A remote-access VPN connects an individual user's device to the corporate network. In a full-tunnel configuration all of the user's traffic goes through the VPN; in split tunnel only corporate traffic does, which saves bandwidth but means internet traffic bypasses corporate security controls.",
   "Internet Protocol Security (IPsec) is a suite that secures traffic at the network layer. Authentication Header (AH) provides integrity and authentication but not encryption. Encapsulating Security Payload (ESP) provides encryption as well as integrity. Internet Key Exchange (IKE) negotiates the keys and security associations. Transport mode protects only the payload and is used between two hosts; tunnel mode encrypts the whole original packet and wraps it in a new one, which is typical for site-to-site VPNs. Transport Layer Security (TLS) protects individual application sessions, such as HTTPS, and can also be used for VPNs that work through a web browser or over the standard HTTPS port, which passes most firewalls easily.",
   "Software-defined wide area network (SD-WAN) replaces expensive dedicated circuits between sites with centrally managed connections over ordinary internet links, choosing paths intelligently. Secure access service edge (SASE) combines SD-WAN-style networking with cloud-delivered security services, such as secure web gateways, cloud access security brokers, firewall as a service and zero trust network access, so users get consistent protection wherever they connect.",
   "A jump server (or jump box) is a hardened system that administrators must connect to first before reaching sensitive servers. It narrows administrative access to one monitored entry point. A proxy server makes requests on behalf of clients. A forward proxy sits in front of users going out to the internet, where it can filter content, cache and log. A reverse proxy sits in front of servers, receiving inbound requests and passing them on, which hides internal servers and allows load balancing and TLS offloading."
  ],
  "terms": [
   [
    "IPsec",
    "A protocol suite that authenticates and encrypts IP packets, using AH, ESP and IKE."
   ],
   [
    "Tunnel mode",
    "IPsec mode that encrypts the entire original packet inside a new one, typical for site-to-site VPNs."
   ],
   [
    "SASE",
    "Secure access service edge: cloud-delivered networking and security services combined for users anywhere."
   ],
   [
    "Jump server",
    "A hardened, monitored host used as the single gateway for administrative access to sensitive systems."
   ],
   [
    "Reverse proxy",
    "A server that receives inbound requests on behalf of internal servers and forwards them."
   ],
   [
    "Split tunnel",
    "A VPN configuration that sends only corporate traffic through the tunnel."
   ]
  ],
  "example": "Administrators at a bank may no longer connect directly to database servers. They first connect over the VPN, then log in with MFA to a jump server that records every session, and only from there can they reach the databases. Firewall rules allow database administration traffic solely from the jump server's address.",
  "tip": "AH gives integrity without encryption; ESP gives encryption. Forward proxy protects and controls outbound clients; reverse proxy fronts inbound traffic to servers.",
  "check": [
   [
    "Which IPsec component provides confidentiality?",
    "Encapsulating Security Payload (ESP). AH provides integrity and authentication only."
   ],
   [
    "What is the security downside of a split-tunnel VPN?",
    "The user's internet traffic bypasses corporate inspection and filtering, so threats on that path are not seen by company controls."
   ],
   [
    "What is the purpose of a jump server?",
    "To provide one hardened, monitored point through which all administrative access to sensitive systems must pass."
   ]
  ]
 },
 {
  "t": "Data types and classifications",
  "body": [
   "You cannot protect data well until you know what you have and how much it matters. Data classification is the process of labeling data by its sensitivity and value so that the right controls are applied. Without it, organizations either overprotect everything, which is expensive, or underprotect what matters most.",
   "Security+ lists several data types. Regulated data is governed by laws or industry rules, such as health information or payment card data. Personally identifiable information (PII) identifies a person, such as a name combined with a national ID number. Protected health information (PHI) is health data linked to a person. Financial information covers account and card numbers. Trade secrets are confidential business information that gives a competitive advantage, like a formula or process. Intellectual property (IP) includes creations protected by patents, copyrights and trademarks. Legal information includes contracts and case files. Data may also be described as human-readable or non-human-readable (such as encoded or binary data that needs software to interpret).",
   "Classification schemes group data into levels. Commercial organizations commonly use labels like public, private or internal, sensitive, confidential and restricted or critical. Government schemes use labels such as unclassified, confidential, secret and top secret. The exact names vary; what matters is that each level has defined handling rules for storage, sharing, encryption, retention and disposal.",
   "Roles make classification work. The data owner, usually a senior business person, is accountable for the data and decides its classification. The data custodian or steward implements and maintains the controls, such as backups and permissions, day to day. Users must follow the handling rules. Labels should be visible where possible, for example in document headers or file metadata, so that tools like data loss prevention can read and enforce them.",
   "Data sovereignty and geographic restrictions also affect handling: some data must stay within a particular country or region by law. Classification should be reviewed over time, because the value of data changes; quarterly financial results are highly sensitive before release and public afterwards."
  ],
  "terms": [
   [
    "Data classification",
    "Labeling data by sensitivity and value so appropriate protections are applied."
   ],
   [
    "PII",
    "Personally identifiable information: data that can identify a specific person."
   ],
   [
    "PHI",
    "Protected health information: health data linked to an identifiable individual."
   ],
   [
    "Data owner",
    "The person accountable for a data set who decides its classification and access."
   ],
   [
    "Data custodian",
    "The person or team who implements and maintains protections for data day to day."
   ]
  ],
  "example": "A manufacturer labels its product formulas as restricted, its internal procedures as internal and its brochures as public. Restricted files must be encrypted, can only be shared with named staff and are automatically blocked by DLP if someone tries to email them outside the company.",
  "tip": "The data owner decides classification; the custodian implements the controls. Exam questions often swap these roles to trick you.",
  "check": [
   [
    "Who is responsible for deciding the classification of a data set?",
    "The data owner, typically a senior business stakeholder accountable for that data."
   ],
   [
    "Why should data classification be reviewed periodically?",
    "The sensitivity and value of data change over time, so labels and controls may need to be raised or lowered."
   ]
  ]
 },
 {
  "t": "Data states: at rest, in transit, in use",
  "body": [
   "Data exists in three states, and each needs different protection. Thinking in states helps you see gaps: a file can be strongly encrypted on disk yet sent in plain text across the network, or safe in transit yet exposed in memory while being processed.",
   "Data at rest is stored: on hard drives, solid-state drives, USB sticks, backups, databases and cloud storage. The main threats are theft of the device or media and unauthorized access to storage. Protections include full-disk encryption, which encrypts the whole drive so a stolen laptop reveals nothing without the key; file- or folder-level encryption for specific items; database encryption, including column-level encryption for fields like card numbers; and access controls and permissions. A trusted platform module (TPM) chip in the computer often protects the disk encryption keys.",
   "Data in transit (also called in motion) is moving across a network, whether between your browser and a website or between two data centers. Threats include eavesdropping and on-path attacks that intercept or alter traffic. Protections include TLS for web and application traffic, IPsec and VPNs for network links, and secure protocols such as SSH instead of Telnet and SFTP instead of plain FTP.",
   "Data in use is being actively processed in memory (RAM) or by the CPU. To compute on data, systems normally decrypt it, which makes this the hardest state to protect. Attacks include malware reading process memory and memory scraping. Protections include secure enclaves or trusted execution environments that isolate sensitive computation in hardware, strict access controls on what processes can run, and techniques that let data be processed without being fully exposed, such as tokenization and masking in applications.",
   "Also consider where the data physically lives. Geographic restrictions and data sovereignty laws may require data at rest to stay within a country. Geolocation-based access controls can restrict data access depending on where a user is connecting from.",
   "A complete data protection plan covers all three states. When a question describes a scenario, first identify which state the data is in, then choose the control that fits that state."
  ],
  "terms": [
   [
    "Data at rest",
    "Data stored on media such as disks, databases or backups."
   ],
   [
    "Data in transit",
    "Data moving across a network between systems."
   ],
   [
    "Data in use",
    "Data actively being processed in memory or by a CPU."
   ],
   [
    "Full-disk encryption",
    "Encryption of an entire storage device so its contents are unreadable without the key."
   ],
   [
    "Secure enclave",
    "A hardware-isolated area of a processor that protects code and data while in use."
   ]
  ],
  "example": "A clinic encrypts its laptops with full-disk encryption (at rest), requires TLS for its patient portal (in transit) and runs its prescription system on servers that restrict which processes can access application memory (in use). When a laptop is stolen from a car, the patient data on it stays unreadable.",
  "tip": "Match the control to the state: full-disk or database encryption for at rest, TLS/IPsec/VPN for in transit, secure enclaves and memory protections for in use.",
  "check": [
   [
    "A stolen laptop is the main concern. Which data state and control apply?",
    "Data at rest; full-disk encryption protects it if the device is lost or stolen."
   ],
   [
    "Why is data in use the hardest state to protect?",
    "It usually must be decrypted in memory to be processed, so it is exposed to anything that can read that memory."
   ]
  ]
 },
 {
  "t": "Protection: encryption, hashing, masking, tokenization, DLP",
  "body": [
   "Several techniques protect data, and exam questions often hinge on picking the right one. The key is to ask whether the original value needs to be recovered, by whom, and whether the data needs to keep its format.",
   "Encryption transforms data into ciphertext using an algorithm and a key; anyone with the correct key can reverse it. It is the right choice when authorized people or systems need the original data back, such as stored documents or network traffic. Its security depends on protecting the keys, so key management matters as much as the algorithm.",
   "Hashing runs data through a one-way function that produces a fixed-length digest. You cannot recover the original from the hash, and even a tiny change to the input produces a very different digest. Hashing is used for integrity checks (comparing a file's hash to a known good value) and for storing passwords, where the system hashes what the user types and compares hashes. Passwords should be salted, meaning a unique random value is added before hashing, so identical passwords do not produce identical hashes and precomputed tables are useless.",
   "Masking hides part of the data while leaving it usable for display, such as showing only the last four digits of a card number on a receipt. Static masking creates a permanently altered copy, often for test environments; dynamic masking hides values on the fly based on who is viewing. Tokenization replaces a sensitive value with a random token that has no mathematical relationship to the original. The mapping is kept in a secure token vault. Payment systems use tokenization so that merchants store tokens rather than real card numbers, which shrinks what an attacker could steal.",
   "Other techniques on the objectives include obfuscation (making data or code harder to understand), segmentation (keeping sensitive data in separate systems), permission restrictions and geographic restrictions.",
   "Data loss prevention (DLP) is different: it is a detection and enforcement system rather than a transformation. DLP identifies sensitive data using patterns, keywords, fingerprints or classification labels, then monitors endpoints, networks, email and cloud services to block, warn or log when that data leaves approved channels. Endpoint DLP can stop copying to USB drives; network DLP inspects outbound traffic; cloud DLP watches SaaS apps."
  ],
  "terms": [
   [
    "Hashing",
    "A one-way function producing a fixed-length digest used for integrity checks and password storage."
   ],
   [
    "Salt",
    "A random value added to a password before hashing so identical passwords yield different hashes."
   ],
   [
    "Tokenization",
    "Replacing sensitive data with a non-sensitive token mapped to the original in a secure vault."
   ],
   [
    "Data masking",
    "Hiding part or all of a data value while keeping it usable for display or testing."
   ],
   [
    "DLP",
    "Data loss prevention: tools that detect and block unauthorized movement of sensitive data."
   ]
  ],
  "example": "An online shop's payment provider returns a token instead of the customer's card number. The shop stores only the token for repeat purchases, masks the card on order pages to show the last four digits, hashes customer passwords with a salt and uses DLP to block emails containing card-number patterns.",
  "tip": "Need the original back with a key: encryption. Never need it back: hashing. Keep format but remove real value from systems: tokenization. Hide part on screen: masking.",
  "check": [
   [
    "Why is hashing, not encryption, used for storing passwords?",
    "The system never needs to recover the password; it only compares hashes, and a one-way function means a stolen database does not directly reveal passwords."
   ],
   [
    "How does tokenization differ from encryption?",
    "A token has no mathematical relationship to the original and can only be mapped back through a secure vault, while ciphertext can be decrypted with the key."
   ],
   [
    "An employee tries to copy a file of customer records to a USB drive and is blocked. What control did this?",
    "Endpoint data loss prevention (DLP)."
   ]
  ]
 },
 {
  "t": "Resilience: HA, clustering, load balancing, RAID",
  "body": [
   "Availability is the A in the CIA triad, and resilience is how you keep systems running when parts fail. The core idea is to remove single points of failure: any one component whose loss takes the whole service down. Security+ tests the main techniques and when each applies.",
   "High availability (HA) is a design goal: a system that stays up with minimal downtime, often described as a percentage of uptime. You achieve it with redundancy, having more than one of each critical component, such as dual power supplies, multiple network links, redundant firewalls and more than one server. Uninterruptible power supplies (UPS) bridge short outages and give generators time to start.",
   "Clustering groups several servers so they act as one service. In an active-passive cluster, one node does the work while another stands by and takes over through failover if the first fails. In an active-active cluster, all nodes handle work at the same time, giving both more capacity and redundancy. The nodes typically share storage or replicate data so a takeover does not lose information.",
   "Load balancing distributes incoming requests across multiple servers. A load balancer can use simple methods like round-robin, sending each new request to the next server in turn, or smarter ones based on current load or response time. It also performs health checks and stops sending traffic to failed servers, so it provides both performance and availability. Session persistence (affinity) keeps a user's requests on the same server when the application needs it.",
   "Redundant Array of Independent Disks (RAID) protects against disk failure. RAID 0 stripes data across disks for speed but has no redundancy: one failed disk loses everything. RAID 1 mirrors data onto two disks, so either can fail. RAID 5 stripes data with distributed parity across at least three disks and survives one disk failure. RAID 6 uses double parity and survives two. RAID 10 (1+0) mirrors pairs and stripes across them, combining speed and redundancy. Remember that RAID is not a backup: if a file is deleted or encrypted by ransomware, RAID faithfully mirrors the damage.",
   "Other resilience ideas include platform diversity (using different vendors or technologies so one flaw does not hit everything), multi-cloud, geographic dispersal of data centers, and capacity planning for people, technology and infrastructure. Testing failover regularly proves the design works."
  ],
  "terms": [
   [
    "High availability",
    "Designing systems to remain operational with minimal downtime through redundancy."
   ],
   [
    "Failover",
    "Automatic switching to a standby component when the active one fails."
   ],
   [
    "Load balancer",
    "A device or service that distributes requests across multiple servers and removes failed ones."
   ],
   [
    "RAID 5",
    "Disk striping with distributed parity that survives one disk failure and needs at least three disks."
   ],
   [
    "Single point of failure",
    "A component whose failure stops the entire system."
   ]
  ],
  "example": "An online booking site runs four web servers behind a pair of load balancers. When one server crashes during a busy weekend, health checks remove it and the other three absorb the traffic. The database runs as an active-passive cluster on RAID 10 storage, and customers never notice the failure.",
  "tip": "RAID 0 has no fault tolerance, RAID 1 mirrors, RAID 5 survives one disk, RAID 6 survives two. And RAID is never a substitute for backups.",
  "check": [
   [
    "What is the difference between active-active and active-passive clustering?",
    "In active-active all nodes serve traffic simultaneously; in active-passive a standby node only takes over when the active one fails."
   ],
   [
    "Why is RAID not a backup?",
    "It protects against disk hardware failure only; deletions, corruption or ransomware encryption are copied across the array immediately."
   ],
   [
    "Which RAID level offers speed but no redundancy?",
    "RAID 0 (striping)."
   ]
  ]
 },
 {
  "t": "Backups, sites (hot/warm/cold), RPO/RTO",
  "body": [
   "Resilience keeps systems running through small failures; backups and recovery sites let you recover from big ones: ransomware, fire, flood or a data center outage. Two metrics drive every design decision here, so start with them.",
   "The recovery point objective (RPO) is the maximum amount of data, measured in time, that the business can afford to lose. An RPO of four hours means backups or replication must happen at least every four hours. The recovery time objective (RTO) is the maximum time a system can be down before the impact is unacceptable. Related terms are mean time between failures (MTBF), a measure of reliability, and mean time to repair (MTTR), the average time to fix a failure. A business impact analysis sets these targets for each system.",
   "Backup types differ in what they copy. A full backup copies everything; it is the simplest to restore but slowest to create. An incremental backup copies only what changed since the last backup of any kind, so it is fast to create but a restore needs the last full plus every incremental since. A differential backup copies everything changed since the last full, so it grows each day, but a restore needs only the last full and the latest differential. Snapshots capture a point-in-time state quickly, and replication or journaling continuously copies changes to another system for very low RPOs.",
   "Where backups live matters. The widely taught 3-2-1 practice is three copies of data, on two different types of media, with one copy offsite. For ransomware, at least one copy should be offline or immutable (unable to be changed or deleted for a set period). Backups must be encrypted and, most importantly, tested: a backup you have never restored is only a hope.",
   "Recovery sites differ by readiness and cost. A hot site is a fully equipped duplicate with current data that can take over in minutes or hours: fastest and most expensive. A warm site has hardware and connectivity but needs data restored and configuration before use, taking hours to days. A cold site is space with power and cooling but little or no equipment, taking days or weeks to bring up: cheapest and slowest. Cloud-based recovery and mobile sites are other options, and geographic dispersal keeps a regional disaster from hitting both primary and backup sites.",
   "Continuity of operations planning ties this together, and testing methods include tabletop exercises, simulations, parallel processing and failover tests."
  ],
  "terms": [
   [
    "RPO",
    "Recovery point objective: the maximum acceptable data loss, measured as time since the last good copy."
   ],
   [
    "RTO",
    "Recovery time objective: the maximum acceptable time to restore a system after an outage."
   ],
   [
    "Incremental backup",
    "Copies only data changed since the last backup of any type."
   ],
   [
    "Differential backup",
    "Copies all data changed since the last full backup."
   ],
   [
    "Hot site",
    "A fully equipped, up-to-date alternate site ready to take over almost immediately."
   ],
   [
    "Cold site",
    "An alternate facility with basic infrastructure but no ready equipment or data."
   ]
  ],
  "example": "A payroll company decides it can lose at most one hour of data and must be running again within eight hours. It replicates its database hourly to a warm site in another region and keeps weekly immutable backups offline. A quarterly test restore confirms the eight-hour RTO is achievable.",
  "tip": "RPO is about data loss (how far back), RTO is about downtime (how long to recover). Hot is fastest and costliest; cold is slowest and cheapest.",
  "check": [
   [
    "A business can tolerate losing no more than 15 minutes of transactions. Which metric does this define?",
    "The recovery point objective (RPO)."
   ],
   [
    "Restoring from incremental backups requires which sets?",
    "The last full backup plus every incremental backup taken since, in order."
   ],
   [
    "Which recovery site type is cheapest but slowest to activate?",
    "A cold site."
   ]
  ]
 },
 {
  "t": "Secure baselines, mobile (MDM, BYOD, COPE, CYOD)",
  "body": [
   "A secure baseline is the approved, documented security configuration for a type of system: which services are enabled, which settings are required, which accounts exist and what logging is on. Baselines turn good intentions into something you can apply and verify. The life cycle has three steps: establish the baseline (often starting from vendor guides or industry benchmarks such as those from the Center for Internet Security), deploy it consistently using tools like group policy or configuration management, and maintain it by monitoring for drift and updating it as threats and software change.",
   "Hardening is the work of applying a baseline: removing unnecessary software and services, closing unused ports, changing default passwords, enabling host firewalls and encryption, and applying patches. Different targets need different hardening. Workstations and servers, network devices, cloud infrastructure, ICS and embedded systems, and mobile devices each have their own guides.",
   "Mobile devices are special because they leave the building, get lost and often mix personal and work use. Mobile device management (MDM) is software that lets an organization enroll devices and enforce policy remotely: require a screen lock and encryption, push apps and settings, restrict features like the camera, and remotely lock or wipe a lost device. Many MDM tools can create a containerized work profile that separates business apps and data from personal ones, so a selective wipe removes only company data.",
   "Deployment models describe who owns the device. Bring your own device (BYOD) lets employees use personal devices for work; it is cheap and convenient but gives the company the least control and raises privacy concerns. Corporate-owned, personally enabled (COPE) means the company buys and controls the device but allows some personal use. Choose your own device (CYOD) lets the employee pick from an approved list of models that the company owns and manages. A fully corporate-owned, business-only model offers the most control.",
   "Mobile connection methods also carry risk: Bluetooth pairing, near-field communication (NFC) and public Wi-Fi. Sideloading apps from outside official stores and jailbreaking or rooting a device bypass built-in protections, and MDM can detect and block these conditions."
  ],
  "terms": [
   [
    "Secure baseline",
    "A documented, approved security configuration used as the standard for a class of systems."
   ],
   [
    "MDM",
    "Mobile device management: software for enrolling devices and enforcing policies like encryption and remote wipe."
   ],
   [
    "BYOD",
    "Bring your own device: employees use personally owned devices for work."
   ],
   [
    "COPE",
    "Corporate-owned, personally enabled: company-owned devices that allow limited personal use."
   ],
   [
    "CYOD",
    "Choose your own device: employees select from approved company-owned models."
   ],
   [
    "Jailbreaking/rooting",
    "Removing a mobile OS's built-in restrictions, which weakens its security model."
   ]
  ],
  "example": "A sales rep loses a BYOD phone at an airport. Because the phone is enrolled in MDM with a work profile, IT issues a selective wipe that deletes company email and files without touching the rep's personal photos, and the device's enforced encryption protected the data in the meantime.",
  "tip": "BYOD means least control and most privacy concern; COPE means company-owned with personal use allowed; CYOD means user picks from an approved list. Selective wipe via containerization is the classic BYOD answer.",
  "check": [
   [
    "What are the three phases of managing a secure baseline?",
    "Establish it, deploy it consistently, and maintain it by monitoring for drift and updating it."
   ],
   [
    "Which mobile model gives the company ownership while allowing some personal use?",
    "COPE (corporate-owned, personally enabled)."
   ],
   [
    "How can MDM protect company data on a lost BYOD phone without erasing personal content?",
    "By using a containerized work profile and performing a selective (enterprise) wipe of only the business container."
   ]
  ]
 },
 {
  "t": "Wireless: WPA3, SAE, RADIUS, EAP",
  "body": [
   "Wireless networks broadcast through walls into parking lots, so anyone nearby can try to listen or connect. Strong encryption and authentication are what keep that open medium private. Security+ focuses on Wi-Fi Protected Access version 3 (WPA3), how it authenticates, and the enterprise components behind it.",
   "Older standards are important as contrast. Wired Equivalent Privacy (WEP) is broken and must never be used. WPA2 with a pre-shared key (PSK, the familiar Wi-Fi password) uses a four-way handshake that an attacker can capture and then try to crack offline by guessing passwords as fast as their hardware allows. Weak passphrases fall quickly.",
   "WPA3 improves on this. WPA3-Personal replaces the PSK handshake with Simultaneous Authentication of Equals (SAE), a key exchange (based on the Dragonfly method) in which both sides prove they know the password without exposing anything an eavesdropper can test offline. That resists offline dictionary attacks and provides forward secrecy, so capturing traffic today and learning the password later does not reveal old sessions. WPA3 also requires Protected Management Frames, which make it harder to forcibly disconnect clients. WPA3-Enterprise offers a stronger cryptographic mode for sensitive environments.",
   "Enterprise Wi-Fi does not use one shared password. Instead it uses IEEE 802.1X: each user or device authenticates individually through the access point to an authentication server, usually Remote Authentication Dial-In User Service (RADIUS). RADIUS checks credentials against a directory and returns an accept or reject, and can assign the user to a VLAN. Because each user has their own credentials, you can revoke one person's access without changing the password for everyone.",
   "The authentication conversation uses the Extensible Authentication Protocol (EAP), a framework with several methods. EAP-TLS uses digital certificates on both the client and server; it is the strongest common option but requires managing client certificates. Protected EAP (PEAP) and EAP-TTLS create a TLS tunnel using only a server certificate, then send a username and password inside it. EAP-FAST, developed by Cisco, uses a protected access credential instead of certificates to build its tunnel.",
   "Other wireless considerations include site surveys and heat maps to place access points and reduce signal leakage, and watching for rogue access points and evil twins that imitate your network name."
  ],
  "terms": [
   [
    "WPA3",
    "Wi-Fi Protected Access 3, the current Wi-Fi security standard with SAE and protected management frames."
   ],
   [
    "SAE",
    "Simultaneous Authentication of Equals: WPA3-Personal's key exchange that resists offline password guessing."
   ],
   [
    "RADIUS",
    "A protocol and server for centralized authentication, authorization and accounting of network access."
   ],
   [
    "EAP-TLS",
    "An EAP method using certificates on both client and server for mutual authentication."
   ],
   [
    "PEAP",
    "Protected EAP: tunnels password-based authentication inside TLS using a server certificate."
   ]
  ],
  "example": "A university moves staff Wi-Fi from a shared WPA2 password to WPA3-Enterprise with 802.1X. Each staff member signs in with their own account, checked by RADIUS. When an employee leaves, disabling their directory account removes their Wi-Fi access immediately, with no need to change a password for everyone.",
  "tip": "SAE is the answer for resisting offline dictionary attacks on a Wi-Fi passphrase. EAP-TLS requires client certificates; PEAP and EAP-TTLS need only a server certificate.",
  "check": [
   [
    "What weakness of WPA2-PSK does SAE address?",
    "An attacker can capture the WPA2 handshake and crack the passphrase offline; SAE prevents offline dictionary attacks and adds forward secrecy."
   ],
   [
    "In enterprise Wi-Fi, what role does the RADIUS server play?",
    "It is the authentication server that verifies each user's credentials and tells the access point to allow or deny access."
   ],
   [
    "Which EAP method requires certificates on both client and server?",
    "EAP-TLS."
   ]
  ]
 },
 {
  "t": "Asset management and disposal (sanitize, destroy, certify)",
  "body": [
   "You cannot protect what you do not know you have. Asset management tracks every hardware and software asset through its life: acquisition, assignment, use, and finally disposal. Each stage has security implications, and the exam covers them in order.",
   "Acquisition and procurement is where security starts: buying from reputable suppliers, checking that products meet security requirements and are supported. Assignment and accounting record each asset in an inventory with an owner (the person accountable for it) and a classification based on the data it handles. Monitoring and asset tracking keep the inventory accurate, using methods such as asset tags, automated discovery scans and enumeration of what is connected to the network. An accurate inventory is the foundation for patching, vulnerability scanning and incident response.",
   "Disposal and decommissioning is where much data is lost. Drives, phones, printers and copiers all store data, and simply deleting files or reformatting a drive usually leaves recoverable information. Sanitization means removing data so it cannot be recovered. Methods include overwriting (writing patterns over every sector), cryptographic erase (destroying the encryption key of a self-encrypting or fully encrypted drive so the data becomes unreadable), and degaussing (using a strong magnetic field to erase magnetic media; this does not work on solid-state drives and usually leaves hard disks unusable). Sanitized equipment can often be reused or resold.",
   "Destruction physically ensures data is gone, and the device with it: shredding, pulverizing, drilling, incinerating or pulping paper. Destruction is appropriate for the most sensitive data or when media cannot be reliably sanitized. Solid-state drives are harder to overwrite reliably because of how they spread writes, so cryptographic erase or physical shredding is usually recommended for them.",
   "Certification closes the loop. When a third party handles disposal, the organization should obtain a certificate of destruction or sanitization listing the assets (often by serial number), the method used and the date. This documentation proves compliance to auditors and regulators. Data retention requirements also apply: some records must be kept for a set period before they can be destroyed, and legal holds pause destruction entirely."
  ],
  "terms": [
   [
    "Asset inventory",
    "An up-to-date record of hardware and software assets, their owners and classifications."
   ],
   [
    "Sanitization",
    "Removing data from media so it cannot be recovered, allowing possible reuse."
   ],
   [
    "Degaussing",
    "Erasing magnetic media with a strong magnetic field; ineffective on SSDs."
   ],
   [
    "Cryptographic erase",
    "Destroying the encryption key so encrypted data on a drive becomes unrecoverable."
   ],
   [
    "Certificate of destruction",
    "Documentation from a disposal vendor proving specific media were destroyed or sanitized."
   ]
  ],
  "example": "A law firm retires 200 laptops. Their drives were fully encrypted, so IT performs a cryptographic erase and resells the laptops. Drives from its document server, which held privileged case files, are sent to a vendor for shredding, and the firm files the vendor's certificate of destruction listing every serial number.",
  "tip": "Reformatting or deleting is not sanitization. Degaussing does not work on SSDs. If a question asks how to prove disposal happened, the answer is a certificate of destruction.",
  "check": [
   [
    "Why is degaussing a poor choice for solid-state drives?",
    "SSDs store data electronically rather than magnetically, so a magnetic field does not reliably erase them."
   ],
   [
    "What document should an organization obtain from a third-party disposal vendor?",
    "A certificate of destruction (or sanitization) listing the assets, method and date."
   ]
  ]
 },
 {
  "t": "Vulnerability scanning: credentialed, false positives, CVSS, CVE",
  "body": [
   "Vulnerability management is the ongoing cycle of finding weaknesses, prioritizing them, fixing them and confirming the fix. Scanning is how you find them at scale. A vulnerability scanner probes systems, identifies software versions and configurations, and compares what it finds to a database of known flaws.",
   "A non-credentialed scan looks at systems from the outside, the way an attacker on the network would, seeing only open ports, banners and exposed services. A credentialed scan logs in with an account, so it can read installed software versions, patch levels and configuration settings directly. Credentialed scans are far more accurate and find much more, which is why they are preferred for internal vulnerability management; use a dedicated, tightly controlled scanning account. Scans can also be agent-based, with software on each host reporting in, which suits laptops that are often off the network.",
   "Common Vulnerabilities and Exposures (CVE) is a public list that gives each known vulnerability a unique identifier, such as CVE followed by a year and a number. It lets scanners, vendors and teams refer to the same issue precisely. The Common Vulnerability Scoring System (CVSS) rates severity on a scale from 0.0 to 10.0 using factors such as how the flaw is reached (attack vector), how hard it is to exploit, whether privileges or user interaction are needed, and the impact on confidentiality, integrity and availability. Scores map to ratings of none, low, medium, high and critical.",
   "Scanners make mistakes. A false positive is a reported vulnerability that does not actually exist, for example because a patch was backported without changing the version number. A false negative is a real vulnerability the scanner missed, which is more dangerous because nobody looks for it. Validate findings by checking the system directly, reviewing logs or correlating with other tools.",
   "Prioritization should not rely on CVSS alone. Consider exposure (internet-facing or internal), asset value, whether the flaw is being actively exploited, and your environment. When a patch is not possible, apply compensating controls such as segmentation or a WAF rule, or formally accept the risk through an exception. Finally, rescan to verify remediation and report the results."
  ],
  "terms": [
   [
    "Credentialed scan",
    "A scan that logs into hosts to read software versions and configuration, giving more accurate results."
   ],
   [
    "CVE",
    "Common Vulnerabilities and Exposures: unique public identifiers for known vulnerabilities."
   ],
   [
    "CVSS",
    "Common Vulnerability Scoring System: a 0.0 to 10.0 severity score based on exploitability and impact."
   ],
   [
    "False positive",
    "A reported finding that is not actually a vulnerability."
   ],
   [
    "False negative",
    "A real vulnerability that the scan failed to detect."
   ]
  ],
  "example": "A scan flags 30 web servers with a critical CVE. The analyst checks one server and finds the vendor backported the fix without changing the version string, so the finding is a false positive on 28 of them. The two truly vulnerable servers are internet-facing, so they are patched first and rescanned to confirm.",
  "tip": "Credentialed scans reduce false positives and find more. A false negative is worse than a false positive because it hides real risk. CVE identifies; CVSS scores.",
  "check": [
   [
    "Why does a credentialed scan find more than a non-credentialed scan?",
    "It logs in and reads installed software, patch levels and settings directly instead of guessing from external responses."
   ],
   [
    "What is the difference between CVE and CVSS?",
    "CVE gives each known vulnerability a unique identifier; CVSS rates its severity on a 0.0 to 10.0 scale."
   ],
   [
    "What should you do after remediating a vulnerability?",
    "Rescan or otherwise verify that the fix worked, then document and report it."
   ]
  ]
 },
 {
  "t": "Pen testing and recon: passive vs active",
  "body": [
   "A penetration test (pen test) is an authorized, simulated attack that shows how far a real attacker could get. Unlike a vulnerability scan, which lists possible weaknesses, a pen test tries to exploit them and chain them together to demonstrate actual impact. The word authorized is essential: before any testing starts, the organization and testers agree on rules of engagement, a written document defining scope (which systems, networks and methods are allowed), timing, contacts, how sensitive data will be handled and what to do if something breaks. Testing without permission is a crime, whatever the intent.",
   "Tests differ by how much the tester knows. In a known-environment test (formerly white box), testers receive full information such as network diagrams and source code, allowing thorough coverage. In an unknown-environment test (black box), they start with nothing, like an outside attacker. A partially known environment (gray box) is in between. Tests can also be framed by team: a red team attacks, a blue team defends, a purple team has both working together to improve detection, and a white team runs and referees the exercise.",
   "Reconnaissance is the information-gathering phase. Passive reconnaissance collects information without directly touching the target's systems: searching public websites, social media, job postings, DNS records held by third parties, public certificate logs and business filings. This is often called open-source intelligence (OSINT). Because nothing is sent to the target, it is very hard to detect. Active reconnaissance interacts directly with the target, for example scanning ports, sweeping for live hosts or probing services to identify versions. It yields more precise information but generates traffic that firewalls, IDS and logs can detect.",
   "After reconnaissance, a typical test moves through gaining initial access, escalating privileges, moving laterally to other systems (sometimes pivoting through a compromised host to reach networks not directly reachable), and establishing persistence, all within the agreed scope. The test ends with cleanup, removing any tools or accounts created, and a report that explains findings, evidence, risk and recommended fixes.",
   "Other exercise types on the exam include physical penetration tests, offensive and defensive exercises, integrated testing, and bug bounty programs, in which outside researchers are invited to report flaws under published rules in exchange for recognition or payment."
  ],
  "terms": [
   [
    "Rules of engagement",
    "The written agreement defining a pen test's scope, methods, timing, contacts and limits."
   ],
   [
    "Passive reconnaissance",
    "Gathering information about a target without directly interacting with its systems."
   ],
   [
    "Active reconnaissance",
    "Gathering information by directly probing the target, such as port scanning."
   ],
   [
    "Known environment",
    "A test in which the tester receives full information about the target in advance."
   ],
   [
    "Lateral movement",
    "Moving from one compromised system to others within a network."
   ],
   [
    "OSINT",
    "Open-source intelligence: information gathered from publicly available sources."
   ]
  ],
  "example": "Before an unknown-environment test of a retailer, testers spend a week on passive recon: they learn the email address format from press releases, identify the VPN product from a job posting and find subdomains in public certificate logs. Only then, and only against addresses listed in the rules of engagement, do they begin active port scanning.",
  "tip": "If the target could detect it, it is active; if it uses only public or third-party sources, it is passive. No valid rules of engagement means it is not a pen test.",
  "check": [
   [
    "Is searching a company's job postings for technology names active or passive recon?",
    "Passive, because it uses public information without interacting with the company's systems."
   ],
   [
    "What document must be agreed before a pen test begins?",
    "The rules of engagement, which define scope, allowed methods, timing and contacts."
   ],
   [
    "What is the difference between a vulnerability scan and a pen test?",
    "A scan identifies possible weaknesses; a pen test actively attempts to exploit and chain them to show real impact."
   ]
  ]
 },
 {
  "t": "Logs, SIEM correlation, alerting, SCAP, NetFlow",
  "body": [
   "Logs are the record of what happened on your systems: logins, errors, configuration changes, network connections and application events. Without them you cannot detect attacks, investigate incidents or prove compliance. But logs live on hundreds of devices in different formats, and nobody can read them all by hand. That is the problem a security information and event management (SIEM) system solves.",
   "A SIEM collects logs from many sources, such as firewalls, servers, endpoints, cloud services and applications, often through agents or the syslog protocol. It normalizes them into a common format, stores them for searching and retention, and synchronizes timestamps so events line up. Accurate time across systems, usually through Network Time Protocol (NTP), is essential; otherwise you cannot reconstruct a sequence of events.",
   "Correlation is the SIEM's key capability. A single failed login is noise; fifty failed logins across many accounts from one address, followed by a success and then a large data transfer, is a story. Correlation rules link related events across different sources to identify patterns like that. When a rule matches, the SIEM raises an alert. Tuning matters: rules that are too sensitive flood analysts with false positives and cause alert fatigue, while rules that are too loose miss attacks. Alert response usually involves triage, investigation, and then escalation or closure, and dashboards and reports summarize trends.",
   "The Security Content Automation Protocol (SCAP) is a set of standards, maintained by the US National Institute of Standards and Technology (NIST), that lets security tools exchange information in consistent, machine-readable ways. It includes common naming for vulnerabilities (CVE), platforms and configurations, a scoring system (CVSS) and a language for writing configuration checklists. SCAP lets you automatically check systems against a secure baseline and compare results across different vendors' tools. Benchmarks describe what secure settings should be.",
   "NetFlow (and similar formats such as IPFIX and sFlow) records metadata about network conversations: source and destination addresses and ports, protocol, time and amount of data, but not the content. Flow data is compact enough to keep for long periods and is excellent for spotting unusual volumes, connections to suspicious addresses, beaconing or large outbound transfers. When you need the actual content, you turn to full packet capture, which is far larger.",
   "Other monitoring tools on the objectives include agents and agentless collection, vulnerability scanners, antivirus, DLP and simple network management protocol (SNMP) traps."
  ],
  "terms": [
   [
    "SIEM",
    "Security information and event management: a system that centralizes, correlates and alerts on logs."
   ],
   [
    "Correlation",
    "Linking related events across multiple sources to identify meaningful patterns."
   ],
   [
    "SCAP",
    "Security Content Automation Protocol: NIST standards for automated, consistent security checking and reporting."
   ],
   [
    "NetFlow",
    "A format for recording network flow metadata such as addresses, ports and byte counts without payloads."
   ],
   [
    "Alert fatigue",
    "Desensitization caused by too many alerts, leading analysts to miss real threats."
   ]
  ],
  "example": "A SIEM rule correlates a VPN login from an unusual country with a successful login on the same account from the office ten minutes earlier. The combination is physically impossible, so the SIEM alerts. NetFlow then shows the VPN session sending gigabytes to an external host, and the analyst disables the account.",
  "tip": "NetFlow shows who talked to whom and how much, never the content. SIEM correlation depends on synchronized time. SCAP is about automated, standardized configuration and vulnerability checking.",
  "check": [
   [
    "What does NetFlow record, and what does it not record?",
    "It records flow metadata such as addresses, ports, protocol, timing and volume, but not the packet contents."
   ],
   [
    "Why is time synchronization important for a SIEM?",
    "Correlation and investigations depend on putting events from different systems in the correct order."
   ]
  ]
 },
 {
  "t": "Email security: SPF, DKIM, DMARC",
  "body": [
   "The original email protocol, Simple Mail Transfer Protocol (SMTP), has no built-in way to verify who sent a message. Anyone can put any address in the From line, which is exactly what phishing and business email compromise rely on. Three DNS-based standards work together to let receiving mail servers check whether a message claiming to come from your domain is legitimate.",
   "Sender Policy Framework (SPF) is a DNS TXT record listing which mail servers are allowed to send mail for your domain. A receiving server checks the connecting server's IP address against that list. If it is not listed, the message fails SPF. SPF has limits: it checks the envelope sender used in the SMTP conversation rather than the visible From address, and it often breaks when mail is forwarded.",
   "DomainKeys Identified Mail (DKIM) adds a digital signature. The sending server signs selected headers and the message body with a private key, and publishes the matching public key in DNS. The receiving server retrieves the public key and verifies the signature, which proves the message was sent by an authorized server for that domain and was not altered in transit. DKIM signatures often survive forwarding.",
   "Domain-based Message Authentication, Reporting and Conformance (DMARC) ties them together. A DMARC record in DNS tells receivers what to do when a message fails: a policy of none (only monitor), quarantine (send to spam) or reject (refuse it). DMARC also requires alignment, meaning the domain that passed SPF or DKIM must match the visible From domain, which closes the gap attackers used to exploit. Finally, DMARC provides reporting: receivers send summary reports back to the domain owner, showing who is sending mail using the domain. Organizations usually start at none, review reports to find all legitimate senders, then move to quarantine and finally reject.",
   "A simplified set of records looks like this:",
   "```text\nexample.com.                  TXT \"v=spf1 ip4:203.0.113.10 include:_spf.mailvendor.example -all\"\nsel1._domainkey.example.com.  TXT \"v=DKIM1; k=rsa; p=<public key>\"\n_dmarc.example.com.           TXT \"v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com\"\n```",
   "Other email controls include secure email gateways that filter spam, malware and malicious links, TLS encryption between mail servers, and user training to spot what technical controls miss."
  ],
  "terms": [
   [
    "SPF",
    "Sender Policy Framework: a DNS record listing servers authorized to send mail for a domain."
   ],
   [
    "DKIM",
    "DomainKeys Identified Mail: a cryptographic signature verifying a message's sending domain and integrity."
   ],
   [
    "DMARC",
    "A DNS policy that uses SPF and DKIM with alignment to tell receivers how to handle failing mail and to send reports."
   ],
   [
    "Alignment",
    "The DMARC requirement that the domain authenticated by SPF or DKIM matches the visible From domain."
   ]
  ],
  "example": "Attackers send invoices that appear to come from a supplier's domain. The supplier had published SPF and DKIM but no DMARC, so many receivers delivered the fakes. After the supplier publishes a DMARC reject policy, receiving servers refuse messages that fail alignment, and the reports reveal the attackers' sending servers.",
  "tip": "SPF says which servers may send; DKIM proves the message is signed and unaltered; DMARC says what to do on failure and sends reports. All three are published in DNS.",
  "check": [
   [
    "Which standard uses a digital signature to prove a message was not altered?",
    "DKIM (DomainKeys Identified Mail)."
   ],
   [
    "What three policy actions can a DMARC record specify?",
    "None (monitor only), quarantine, and reject."
   ],
   [
    "Why is DMARC needed if SPF and DKIM already exist?",
    "It requires alignment with the visible From domain, tells receivers how to handle failures and provides reporting to the domain owner."
   ]
  ]
 },
 {
  "t": "EDR/XDR, DLP, UEBA",
  "body": [
   "Traditional antivirus compares files to signatures of known malware. Modern attacks often use new malware, legitimate system tools or stolen credentials, which signatures miss. The tools in this lesson focus on behavior and context instead.",
   "Endpoint detection and response (EDR) is software on laptops, desktops and servers that continuously records activity, such as processes starting, files changing, registry edits and network connections, and sends it for analysis. It looks for suspicious behavior, for example a word processor launching a command shell, or a process encrypting many files quickly. When it finds something, it alerts and supports response: isolating the host from the network while keeping it reachable by the security team, killing processes, quarantining files and providing a timeline for investigation. EDR is detection and response, not just prevention.",
   "Extended detection and response (XDR) broadens this approach beyond endpoints. It collects and correlates telemetry from endpoints, network sensors, email, identity systems and cloud services in one platform, so an analyst sees a phishing email, the malicious attachment running on a laptop and the attacker's login to a cloud app as one connected incident. XDR overlaps with a SIEM, but it is usually more focused on detection and response with built-in analytics, while a SIEM is broader log collection, retention and compliance reporting.",
   "Data loss prevention (DLP) watches for sensitive data leaving approved places. It identifies data with pattern matching (such as card-number formats), keywords, document fingerprints or classification labels. Endpoint DLP controls actions like copying to USB or printing; network DLP inspects outbound traffic; cloud DLP monitors SaaS storage and sharing. Actions include blocking, warning the user, encrypting or logging.",
   "User and entity behavior analytics (UEBA) builds a baseline of normal behavior for users and devices (entities), then uses statistics and machine learning to flag deviations: an accountant logging in at 3 a.m., a server suddenly contacting many other hosts, or a user downloading far more files than usual. UEBA is especially good at spotting insider threats and compromised accounts, where the activity uses valid credentials and looks legitimate on its own.",
   "These tools feed each other and the SIEM or SOAR platform, and they reduce dwell time, the period an attacker remains undetected."
  ],
  "terms": [
   [
    "EDR",
    "Endpoint detection and response: endpoint software that records behavior, detects threats and supports response like isolation."
   ],
   [
    "XDR",
    "Extended detection and response: correlates detection data across endpoints, network, email, identity and cloud."
   ],
   [
    "UEBA",
    "User and entity behavior analytics: detects anomalies from baselines of normal user and device behavior."
   ],
   [
    "Host isolation",
    "Cutting an endpoint off from the network except for security management during an incident."
   ]
  ],
  "example": "UEBA flags that an engineer's account downloaded 40 times its usual volume from the code repository late at night. EDR on the engineer's laptop shows an unfamiliar remote-access tool running, and the analyst isolates the laptop. The account had been compromised through a phishing email that XDR links to the same incident.",
  "tip": "Behavior-based detection on the device is EDR; correlation across many security layers is XDR; unusual user or account behavior against a baseline is UEBA; sensitive data leaving is DLP.",
  "check": [
   [
    "What EDR response action stops a compromised laptop from spreading malware while allowing investigation?",
    "Host isolation, which blocks network traffic except for the security team's management connection."
   ],
   [
    "Why is UEBA effective against insider threats?",
    "It detects deviations from a user's normal behavior even when the activity uses valid credentials and permissions."
   ]
  ]
 },
 {
  "t": "IAM: provisioning, SSO, SAML, OAuth, OpenID Connect, LDAP",
  "body": [
   "Identity and access management (IAM) covers how accounts are created, how people prove who they are, what they may access and how access is removed. Getting it right prevents a huge share of breaches, because stolen or excessive access is involved in so many of them.",
   "Provisioning is creating accounts and granting access when someone joins or changes role; deprovisioning is removing it when they leave. Ideally both are automated from the human resources system, so access is granted based on role and removed promptly. Orphaned accounts left behind after someone departs are a classic risk. Regular access reviews (recertification) confirm people still need what they have, which fights permission creep. Identity proofing verifies that a person is who they claim to be before an account is issued.",
   "Single sign-on (SSO) lets a user authenticate once with an identity provider (IdP) and then access many applications, called service providers or relying parties, without logging in again. Fewer passwords means fewer weak or reused ones, and security teams can enforce MFA and disable access in one place. The risk is concentration: the IdP becomes a high-value target. Federation extends trust across organizations, so a partner's users can use their own company logins to reach your app.",
   "Security Assertion Markup Language (SAML) is an XML-based standard for exchanging authentication and authorization data between an IdP and a service provider. After you log in, the IdP sends a digitally signed assertion stating who you are, which the application trusts. SAML is common for enterprise web SSO. Open Authorization (OAuth) is about authorization, not authentication: it lets a user grant an application limited access to their resources on another service without sharing their password, using access tokens with defined scopes, such as letting a scheduling app read your calendar. OpenID Connect (OIDC) adds an authentication layer on top of OAuth, providing an identity token so applications can verify who the user is. It is widely used for consumer and mobile logins.",
   "Lightweight Directory Access Protocol (LDAP) is used to query and modify directory services, which store users, groups and other objects in a hierarchy. It commonly runs on port 389; LDAPS (LDAP over TLS) uses port 636 and should be preferred so credentials are not sent in clear text. Active Directory is a widely used directory that supports LDAP.",
   "Access control models tie in: role-based access control assigns permissions by job role, attribute-based uses attributes like department and location, and least privilege should guide all of them."
  ],
  "terms": [
   [
    "Provisioning",
    "Creating accounts and granting access based on a user's role."
   ],
   [
    "SSO",
    "Single sign-on: one authentication gives access to multiple applications."
   ],
   [
    "SAML",
    "An XML-based standard for exchanging signed authentication assertions between an identity provider and service provider."
   ],
   [
    "OAuth",
    "An authorization framework that grants applications limited, token-based access without sharing passwords."
   ],
   [
    "OpenID Connect",
    "An identity layer on top of OAuth that provides user authentication."
   ],
   [
    "LDAP",
    "A protocol for querying and managing directory services; LDAPS secures it with TLS."
   ]
  ],
  "example": "When a new analyst is hired, the HR system triggers automatic provisioning: a directory account, group membership for the analyst role and SSO access through the company IdP to email, the SIEM and the ticketing system via SAML. When she leaves, disabling her one directory account removes access to all of them at once.",
  "tip": "OAuth is authorization (what an app may access); OIDC adds authentication (who you are); SAML is XML-based assertions common in enterprise SSO. LDAPS on 636 is the secure form of LDAP.",
  "check": [
   [
    "Which standard lets an app access your photos on another service without learning your password?",
    "OAuth, which issues scoped access tokens for authorization."
   ],
   [
    "What does OpenID Connect add to OAuth?",
    "An authentication layer with an identity token, so the application can verify who the user is."
   ],
   [
    "What risk does automated deprovisioning reduce?",
    "Orphaned accounts that remain active after a person leaves and could be misused."
   ]
  ]
 },
 {
  "t": "MFA factors, PAM, just-in-time access",
  "body": [
   "Passwords alone are guessed, phished, reused and leaked. Multifactor authentication (MFA) requires two or more different types of evidence, so stealing one is not enough. The word different is the point: two passwords are still one factor.",
   "The factor categories are something you know (a password or PIN), something you have (a phone app, hardware token or smart card), something you are (a fingerprint, face or other biometric) and somewhere you are (location, such as a network or GPS region). Some sources also mention something you do, such as typing rhythm. Methods vary in strength. SMS codes are better than nothing but can be intercepted or redirected through SIM swapping. Authenticator apps generate time-based one-time passwords (TOTP) or counter-based ones (HOTP). Push notifications are convenient but can be abused through MFA fatigue, where attackers send repeated prompts hoping a user approves one; number matching helps. Hardware security keys and passkeys based on public-key cryptography (FIDO2) are phishing-resistant because they verify the website they are talking to.",
   "Biometrics have their own vocabulary. The false acceptance rate (FAR) is how often an impostor is accepted; the false rejection rate (FRR) is how often a legitimate user is rejected. Tightening one loosens the other, and the crossover error rate (CER), where they are equal, is used to compare systems: lower is better.",
   "Privileged access management (PAM) protects the accounts that can do the most damage: administrators, service accounts and root. A PAM solution typically stores privileged credentials in a secure vault, checks them out to approved users, rotates passwords automatically after use, and records privileged sessions for audit. Administrators use a normal account for daily work and a separate privileged account only when needed.",
   "Just-in-time (JIT) access goes further by removing standing privileges entirely. Instead of an administrator permanently holding admin rights, they request elevation for a specific task, it is approved (sometimes automatically based on policy), and the rights expire after a set time. Ephemeral credentials are created for a single use or session. This shrinks the window in which a stolen account could be abused and supports least privilege and zero trust."
  ],
  "terms": [
   [
    "MFA",
    "Multifactor authentication: requiring two or more different factor types to authenticate."
   ],
   [
    "TOTP",
    "Time-based one-time password: a short-lived code generated from a shared secret and the current time."
   ],
   [
    "Crossover error rate",
    "The point where a biometric system's false acceptance and false rejection rates are equal; lower is better."
   ],
   [
    "PAM",
    "Privileged access management: vaulting, controlling, rotating and monitoring privileged credentials."
   ],
   [
    "Just-in-time access",
    "Granting elevated privileges only when needed and for a limited time."
   ]
  ],
  "example": "A database administrator needs to apply a schema change. She requests admin access in the PAM portal, which a manager approves for two hours. The vault injects a password she never sees, records the session, and rotates the password when the window closes, so there is no standing admin credential to steal.",
  "tip": "A password plus a PIN is single-factor (both are something you know). Phishing-resistant MFA means FIDO2 hardware keys or passkeys. Removing standing admin rights points to just-in-time access.",
  "check": [
   [
    "Is a password combined with a security question considered MFA?",
    "No. Both are something you know, so it is still a single factor."
   ],
   [
    "What does a lower crossover error rate indicate about a biometric system?",
    "Better overall accuracy, since the false acceptance and false rejection rates balance at a lower value."
   ],
   [
    "How does just-in-time access reduce risk?",
    "Privileges exist only for the approved task and time, so there are no permanent admin rights for an attacker to steal."
   ]
  ]
 },
 {
  "t": "IR process: preparation, detection, analysis, containment, eradication, recovery, lessons learned",
  "body": [
   "Incident response (IR) is the organized way an organization handles a security incident, such as malware outbreak, data breach or compromised account, to limit damage and recover quickly. Security+ uses a sequence of phases. Knowing the order and what belongs in each phase is heavily tested, so learn them as a story.",
   "Preparation happens before anything goes wrong. It includes writing an incident response plan and policy, forming an incident response team with defined roles, setting up communication channels (including out-of-band ones in case email is compromised), gathering tools such as forensic software and clean media, and training and exercising. Good preparation also means having logging and monitoring in place, because you cannot detect what you do not record.",
   "Detection is recognizing that an incident may be happening, from sources like SIEM alerts, EDR, user reports or a third party notifying you. Analysis confirms whether it is a real incident, determines its scope and severity, identifies affected systems and accounts, and prioritizes the response. Indicators of compromise, timelines and correlation across logs are the analyst's tools. Many false alarms end here.",
   "Containment limits the spread and damage. Short-term containment might isolate an infected host from the network, disable a compromised account or block a malicious domain. Longer-term containment keeps business running while you prepare a full fix, for example moving services to clean systems. Isolation and segmentation are the key techniques. Preserve evidence as you go, because hasty actions can destroy it.",
   "Eradication removes the cause: deleting malware, closing the vulnerability that was exploited, removing attacker accounts and backdoors, and resetting compromised credentials. Recovery restores systems to normal operation, often by rebuilding from known-good images and restoring clean backups, then monitoring closely to confirm the attacker is gone before returning to full production.",
   "Lessons learned is the final phase: a review meeting held soon after the incident to ask what happened, what worked, what did not and what should change. Results feed back into preparation, updating the plan, controls and training. Skipping this step means repeating the same incident.",
   "Around all of this sit training, testing through tabletop exercises and simulations, root cause analysis and threat hunting."
  ],
  "terms": [
   [
    "Incident response plan",
    "A documented set of procedures and roles for handling security incidents."
   ],
   [
    "Containment",
    "Actions that limit an incident's spread and damage, such as isolating hosts."
   ],
   [
    "Eradication",
    "Removing the root cause and all attacker artifacts from the environment."
   ],
   [
    "Recovery",
    "Restoring affected systems to normal, verified operation."
   ],
   [
    "Lessons learned",
    "A post-incident review that improves future response and controls."
   ]
  ],
  "example": "A help desk ticket reports ransom notes on two file servers (detection). The analyst confirms encryption activity spreading from one workstation (analysis). The team isolates the workstation and servers (containment), removes the malware and patches the exploited VPN flaw (eradication), restores files from immutable backups (recovery) and later adds MFA to the VPN after the review (lessons learned).",
  "tip": "Order matters: preparation, detection, analysis, containment, eradication, recovery, lessons learned. If a question asks what to do first when an active infection is confirmed and spreading, containment usually comes before eradication.",
  "check": [
   [
    "Which phase includes isolating an infected host from the network?",
    "Containment."
   ],
   [
    "In which phase would you remove malware and close the exploited vulnerability?",
    "Eradication."
   ],
   [
    "What is the purpose of the lessons learned phase?",
    "To review the incident and improve plans, controls and training so the same problem is less likely to recur."
   ]
  ]
 },
 {
  "t": "Tabletop exercises and simulations",
  "body": [
   "An incident response plan that has never been exercised is untested theory. People forget their roles, contact lists go stale and hidden assumptions only show up under pressure. Exercises find these problems while the stakes are low, and Security+ expects you to know the main types and what each is good for.",
   "A tabletop exercise is a discussion-based session. Key people, often from IT, security, legal, communications and management, sit together (in person or virtually) while a facilitator walks through a realistic scenario, such as ransomware on the finance network. At each stage the facilitator adds new developments, called injects, and asks participants what they would do, who they would call and what information they would need. No systems are touched. Tabletops are cheap, low-risk and excellent for testing decision making, communication and whether the plan's roles make sense.",
   "A walkthrough is similar but more procedural: participants step through the plan's documented actions to confirm they are complete and accurate. A simulation goes further by having participants actually perform response actions in a realistic but controlled environment, such as a practice network or cyber range, or by responding to a simulated phishing campaign or planted alerts. Simulations test technical skills and tools as well as decisions, but take more preparation.",
   "For continuity and disaster recovery, other tests include parallel processing, in which a backup system runs alongside the primary to verify it produces the same results, and failover tests, in which the organization actually switches to backup systems or a recovery site. Failover tests give the most confidence but carry real risk of disruption, so they are carefully scheduled.",
   "Every exercise should end with an after-action review that records gaps, assigns owners to fix them and sets dates. Common findings are outdated contact lists, unclear authority to take systems offline, missing access to logs, and uncertainty about when to involve legal counsel or notify regulators and customers. Rotating scenarios and involving new staff keeps exercises valuable over time."
  ],
  "terms": [
   [
    "Tabletop exercise",
    "A discussion-based walkthrough of an incident scenario without affecting real systems."
   ],
   [
    "Inject",
    "A new scenario development introduced during an exercise to test responses."
   ],
   [
    "Simulation",
    "An exercise in which participants carry out response actions in a realistic, controlled environment."
   ],
   [
    "Failover test",
    "A test that actually switches operations to backup systems or sites."
   ],
   [
    "After-action review",
    "A post-exercise review documenting gaps and assigning improvements."
   ]
  ],
  "example": "During a tabletop, the facilitator announces that attackers are threatening to publish stolen customer data. The team realizes nobody knows who has authority to approve a public statement, and legal counsel is not on the contact list. Both gaps are fixed within a week, long before a real incident exposes them.",
  "tip": "Tabletop means discussion only, no systems touched, lowest cost and risk. If a question asks for the least disruptive way to test the IR plan with management, choose a tabletop.",
  "check": [
   [
    "What distinguishes a tabletop exercise from a simulation?",
    "A tabletop is discussion-based with no real actions on systems; a simulation has participants perform response actions in a controlled environment."
   ],
   [
    "Which DR test gives the most confidence but carries the most operational risk?",
    "A full failover test, because operations actually move to backup systems or sites."
   ]
  ]
 },
 {
  "t": "Forensics: order of volatility, chain of custody, legal hold, acquisition",
  "body": [
   "Digital forensics is the careful collection, preservation and analysis of digital evidence so that findings are reliable and, if needed, acceptable in court or disciplinary proceedings. The guiding principle is to preserve evidence exactly as it was and to be able to prove that you did.",
   "The order of volatility tells you what to collect first: the most short-lived data before the most durable. A commonly taught order is CPU registers and cache; then routing tables, ARP cache, the process table and kernel statistics; then system memory (RAM); then temporary file systems and swap space; then data on disk; then remote logging and monitoring data; then physical configuration and network topology; and finally archival media such as backups. The practical lesson: capture memory before you shut a system down, because powering off destroys running processes, network connections and possibly encryption keys held in RAM.",
   "Acquisition is making a forensic copy. For disks you create a bit-for-bit image, including deleted and unallocated space, usually with a write blocker attached so the original cannot be changed. You then compute a cryptographic hash of the original and the image; matching hashes prove the copy is exact, and rechecking later proves it has not changed. Analysis is performed on copies, never the original. Other sources to acquire include memory captures, virtual machine snapshots, cloud logs and network captures. Record system time offsets, since clocks may differ.",
   "Chain of custody is the documented history of who collected each piece of evidence, when, where and how, and every person who handled it afterwards. Each transfer is signed and dated, and evidence is stored securely with tamper-evident seals. A gap in the chain lets the other side argue the evidence could have been altered, which can make it inadmissible.",
   "A legal hold (litigation hold) is an instruction, usually from legal counsel, to preserve all data relevant to a lawsuit or investigation, suspending normal deletion and retention schedules. Ignoring it can bring serious legal penalties. Related ideas are e-discovery, the process of identifying and producing electronic information for legal proceedings; admissibility; and preservation. Reports should be factual and describe methods so another examiner could reproduce the results."
  ],
  "terms": [
   [
    "Order of volatility",
    "The sequence for collecting evidence from most volatile (short-lived) to least volatile."
   ],
   [
    "Chain of custody",
    "Documentation of every person who handled evidence, when and why, proving its integrity."
   ],
   [
    "Legal hold",
    "A directive to preserve relevant data for litigation, overriding normal deletion schedules."
   ],
   [
    "Write blocker",
    "A device or tool that prevents any writes to evidence media during acquisition."
   ],
   [
    "Forensic image",
    "A bit-for-bit copy of storage media verified by hashing."
   ]
  ],
  "example": "Responders find a server suspected of hosting an attacker's tools. Instead of shutting it down, they first capture RAM, revealing an active connection and an injected process, then take a disk image through a write blocker, hash both, seal the drive in an evidence bag and start a chain-of-custody form signed at each handoff.",
  "tip": "Collect RAM before disk, and disk before backups. Hashes prove integrity; chain of custody proves handling. A legal hold overrides retention policy.",
  "check": [
   [
    "Why should memory be captured before powering off a compromised system?",
    "RAM is volatile; powering off destroys running processes, network connections and any keys or malware that exist only in memory."
   ],
   [
    "How do investigators prove a forensic image is an exact copy?",
    "By hashing the original and the image and showing the hash values match."
   ],
   [
    "What happens to normal data deletion schedules under a legal hold?",
    "They are suspended for the relevant data, which must be preserved until the hold is lifted."
   ]
  ]
 },
 {
  "t": "Automation and SOAR playbooks",
  "body": [
   "Security teams face more alerts than people can handle, and many response steps are the same every time: look up an IP address, check a file hash, disable an account, open a ticket. Automation and orchestration let machines do the repetitive work so analysts can focus on judgment.",
   "Security orchestration, automation and response (SOAR) is a platform that connects security tools through their APIs and runs predefined workflows. Orchestration means coordinating multiple tools together; automation means performing tasks without manual steps; response means taking action. A SOAR platform often receives alerts from a SIEM, enriches them with context, carries out steps and records everything in a case.",
   "A playbook is the documented set of steps for a specific type of incident, such as phishing, malware on an endpoint or a compromised account. A runbook is a closely related term, often used for a more detailed, step-by-step procedure, sometimes fully automated. A phishing playbook might extract links and attachments from a reported email, check them against threat intelligence, search for the same message in other mailboxes, delete it everywhere if malicious, block the sender and URL, and notify the user, with a human approval step before the most disruptive actions.",
   "Security+ lists benefits and considerations of automation and scripting. Benefits include efficiency and time saved, enforcing baselines consistently, standard infrastructure configurations, scaling securely, employee retention (less tedious work), faster reaction time and acting as a workforce multiplier. Common use cases include user provisioning and deprovisioning, resource provisioning, guard rails that stop unsafe changes, security groups, ticket creation and escalation, enabling and disabling services and access, continuous integration and testing, and integrations through APIs.",
   "Considerations are the risks. Automation adds complexity and cost, and poorly designed workflows can create a single point of failure or take damaging actions at machine speed, such as blocking a critical business partner. Technical debt builds up when scripts are not maintained, and ongoing supportability requires documentation and ownership. The usual answer is to start with low-risk, high-volume tasks, test playbooks thoroughly, include human approval for high-impact steps and review results."
  ],
  "terms": [
   [
    "SOAR",
    "Security orchestration, automation and response: a platform that runs automated, integrated response workflows."
   ],
   [
    "Playbook",
    "A documented response procedure for a specific incident type, often automated in SOAR."
   ],
   [
    "Orchestration",
    "Coordinating multiple tools and systems to work together in a workflow."
   ],
   [
    "Guard rail",
    "An automated control that prevents unsafe configurations or actions."
   ],
   [
    "Workforce multiplier",
    "The effect of automation letting a small team handle far more work."
   ]
  ],
  "example": "A SOAR playbook receives a SIEM alert for malware on a laptop. It automatically pulls the file hash reputation, isolates the host through EDR, disables the user's sessions and opens a ticket with all findings attached. The on-call analyst reviews the case five minutes later with the containment already done.",
  "tip": "Know the automation considerations on the objectives: complexity, cost, single point of failure, technical debt and ongoing supportability. A playbook defines the steps; SOAR executes them across tools.",
  "check": [
   [
    "What is the difference between orchestration and automation?",
    "Automation performs individual tasks without manual work; orchestration coordinates multiple tools and tasks into a larger workflow."
   ],
   [
    "Name two risks of security automation.",
    "Examples: added complexity and cost, becoming a single point of failure, taking harmful actions at scale, and technical debt from unmaintained scripts."
   ]
  ]
 },
 {
  "t": "Investigation data sources",
  "body": [
   "During an investigation, your job is to reconstruct what happened, and every system leaves different traces. Security+ expects you to know which data source answers which question, so think of each as a witness with its own view.",
   "Firewall logs show allowed and blocked connections: source and destination addresses, ports and times. They answer whether traffic reached a system and whether a block happened. Application logs record events inside a program, such as user actions, errors and transactions. Endpoint logs, including operating system security logs, show logins, process creation, privilege use and service changes on a specific host. On Windows, the Security event log records successful and failed logons; on Linux, authentication logs play the same role. OS-specific security logs help show who did what locally.",
   "IPS and IDS logs show detected attack signatures or anomalies and whether traffic was blocked. Network logs from routers, switches and wireless controllers show connections, device associations and configuration changes. Metadata is data about data: email headers showing the route a message took, file metadata showing author and timestamps, image metadata showing device or location, and mobile metadata. Metadata is often decisive in phishing and insider investigations.",
   "Vulnerability scan results tell you whether an attacked system had known weaknesses. Automated reports and dashboards from the SIEM summarize trends and alerts across many sources. Packet captures record the full content of network traffic; they are the most detailed source, showing exactly what was sent, but are large and only useful if collection was running at the time. Flow data such as NetFlow gives lighter-weight metadata about conversations.",
   "Choosing well saves time. To learn which account logged in to a server at 2 a.m., check endpoint or OS security logs. To learn whether a laptop contacted a known malicious address, check firewall, DNS or proxy logs. To see the exact commands sent to a web server, check packet captures or web application logs. To see where a spoofed email really came from, examine its headers.",
   "Remember that attackers try to clear logs, so centralizing logs to a SIEM or log server, protecting their integrity and retaining them long enough are part of preparation. Consistent time across sources is essential for building a timeline."
  ],
  "terms": [
   [
    "Packet capture",
    "A recording of full network traffic contents, the most detailed but largest network data source."
   ],
   [
    "Metadata",
    "Data describing other data, such as email headers or file timestamps."
   ],
   [
    "Firewall log",
    "A record of connections a firewall allowed or blocked."
   ],
   [
    "Endpoint log",
    "Events recorded on a host, such as logins, process starts and privilege use."
   ],
   [
    "Dashboard",
    "A visual summary of security data and alerts, typically from a SIEM."
   ]
  ],
  "example": "An employee reports a suspicious wire-transfer request from the CEO. The analyst examines the email headers (metadata) and finds it came from an unrelated external server. Firewall and proxy logs show two other employees clicked a link in similar messages, and endpoint logs confirm one of them ran a downloaded file, which becomes the focus of containment.",
  "tip": "Match question to source: who logged in means OS or endpoint logs; what was sent means packet capture; where an email came from means headers (metadata); was a connection blocked means firewall logs.",
  "check": [
   [
    "Which data source shows the full contents of network communication?",
    "A packet capture."
   ],
   [
    "Where would you look to find the true origin of a spoofed email?",
    "In the email's metadata, specifically the message headers showing the servers it passed through."
   ]
  ]
 },
 {
  "t": "Policies, standards, procedures, guidelines",
  "body": [
   "Governance documents turn management's intentions into consistent behavior across an organization. The exam tests the differences between four types, and it helps to think of them as layers from why down to how.",
   "A policy is a high-level statement of management's intent and requirements, approved by senior leadership. It says what must happen and why, but not how. Policies change rarely and apply broadly. Examples on the objectives include an acceptable use policy (AUP), which defines how employees may use company systems; information security policies; business continuity and disaster recovery policies; an incident response policy; the software development life cycle (SDLC) policy; and a change management policy.",
   "A standard sets specific, mandatory requirements that support a policy. Where a policy says sensitive data must be protected, a standard might say laptops must use full-disk encryption with a specific algorithm strength, or passwords must meet defined length and complexity. Standards make compliance measurable. The objectives mention password, access control, physical security and encryption standards. Organizations may also adopt external standards, such as those from NIST or the International Organization for Standardization (ISO).",
   "A procedure is a step-by-step set of instructions for performing a task in line with the policy and standards, such as how to onboard a new employee, how to request a change, or how to respond to a lost device. Procedures are mandatory too, and they change more often as tools change. Playbooks for incident response are a kind of procedure. Onboarding and offboarding procedures are frequently tested.",
   "A guideline is a recommendation, not a requirement. It offers advice and best practices where flexibility is appropriate, such as suggestions for creating memorable passphrases or for working securely while traveling.",
   "Governance also involves structures and roles: boards and committees, centralized versus decentralized governance, and government entities. The roles of owner, controller, processor and custodian define who is accountable and who acts. Documents need regular review, monitoring, and updating when laws, technology or business needs change."
  ],
  "terms": [
   [
    "Policy",
    "A high-level, management-approved statement of intent and requirements."
   ],
   [
    "Standard",
    "A specific, mandatory requirement that supports a policy."
   ],
   [
    "Procedure",
    "Mandatory step-by-step instructions for performing a task."
   ],
   [
    "Guideline",
    "A non-mandatory recommendation or best practice."
   ],
   [
    "Acceptable use policy",
    "A policy defining permitted and prohibited use of organizational systems."
   ]
  ],
  "example": "A company's data protection policy states that customer data must be kept confidential. The encryption standard requires full-disk encryption on all laptops. The laptop setup procedure lists the exact steps to enable and verify it, and a guideline suggests using a passphrase made of several unrelated words for the disk unlock password.",
  "tip": "Only guidelines are optional. Policy says what and why, standard says what specifically, procedure says how step by step.",
  "check": [
   [
    "Which document type is non-mandatory?",
    "A guideline."
   ],
   [
    "A document requires all passwords to be at least a set number of characters. Is it a policy, standard or procedure?",
    "A standard, because it sets a specific, measurable mandatory requirement supporting a policy."
   ]
  ]
 },
 {
  "t": "Risk: register, appetite, tolerance, SLE/ARO/ALE",
  "body": [
   "Risk management is how an organization decides which threats deserve attention and money. Risk is usually described as the combination of likelihood (how probable an event is) and impact (how bad it would be). The process runs in a cycle: identify risks, assess them, choose how to treat them and monitor them over time. Assessments can be one-time, ad hoc, recurring or continuous.",
   "Qualitative risk assessment uses ratings such as low, medium and high, often plotted on a heat map of likelihood against impact. It is quick and useful when numbers are not available. Quantitative assessment assigns monetary values so risks can be compared with the cost of controls. Security+ expects you to calculate three values.",
   "Single loss expectancy (SLE) is the expected cost of one occurrence: SLE = asset value (AV) x exposure factor (EF). The exposure factor is the percentage of the asset lost in one event. Annualized rate of occurrence (ARO) is how many times the event is expected per year; once every four years is an ARO of 0.25. Annualized loss expectancy (ALE) is the expected yearly cost: ALE = SLE x ARO.",
   "```text\nAV  = $200,000 (warehouse)     EF = 25%   ->  SLE = $50,000\nARO = 0.5 (once every 2 years)            ->  ALE = $50,000 x 0.5 = $25,000 per year\n```",
   "ALE helps judge controls: spending more per year on a control than the ALE it removes rarely makes financial sense.",
   "A risk register is the central record of identified risks. Each entry typically includes a description, the risk owner (the person accountable for managing it), likelihood and impact ratings, key risk indicators (metrics that signal the risk is rising), the chosen treatment and the current status. The register makes risk visible to management and is reviewed regularly. Inherent risk is the level before controls; residual risk is what remains after controls are applied.",
   "Risk appetite is the broad amount and type of risk an organization is willing to pursue to meet its goals. It can be described as expansionary (willing to take more risk for growth), neutral or conservative. Risk tolerance is narrower: the acceptable variation around that appetite for a specific area or objective, often expressed as a threshold, for example no more than a set amount of unplanned downtime per month. Risk threshold is the specific point that triggers action. Business impact analysis connects here too, with RTO, RPO, MTTR and MTBF."
  ],
  "terms": [
   [
    "SLE",
    "Single loss expectancy: asset value times exposure factor, the cost of one event."
   ],
   [
    "ARO",
    "Annualized rate of occurrence: expected number of occurrences per year."
   ],
   [
    "ALE",
    "Annualized loss expectancy: SLE times ARO, the expected yearly loss."
   ],
   [
    "Risk register",
    "A document recording identified risks, owners, ratings, treatments and status."
   ],
   [
    "Risk appetite",
    "The overall amount of risk an organization is willing to accept in pursuit of its goals."
   ],
   [
    "Residual risk",
    "Risk remaining after controls have been applied."
   ]
  ],
  "example": "Laptop theft costs a firm $3,000 per incident (SLE) and happens about eight times a year (ARO), so the ALE is $24,000. A full-disk encryption and tracking solution costing $10,000 a year that greatly reduces the loss is easy to justify, and the decision is recorded in the risk register with the IT manager as risk owner.",
  "tip": "Memorize SLE = AV x EF and ALE = SLE x ARO. Convert 'once every N years' to ARO = 1/N. Appetite is the broad willingness; tolerance is the acceptable deviation for a specific objective.",
  "check": [
   [
    "An asset worth $100,000 loses 40% of its value per incident, and incidents occur once every five years. What is the ALE?",
    "SLE = $100,000 x 0.40 = $40,000; ARO = 0.2; ALE = $40,000 x 0.2 = $8,000 per year."
   ],
   [
    "What is the difference between inherent and residual risk?",
    "Inherent risk exists before controls; residual risk is what remains after controls are applied."
   ],
   [
    "What does a risk register record for each risk?",
    "Typically a description, owner, likelihood and impact, key risk indicators, chosen treatment and status."
   ]
  ]
 },
 {
  "t": "Risk treatment: accept, avoid, transfer, mitigate",
  "body": [
   "Once a risk has been identified and assessed, someone must decide what to do about it. There are four classic treatment strategies, and questions typically describe an action and ask you to name the strategy.",
   "Mitigate (also called remediate or reduce) means applying controls that lower the likelihood or impact of the risk. Installing patches, adding MFA, deploying a firewall, training staff and keeping backups are all mitigation. This is the most common treatment in security work. Mitigation rarely removes risk completely, so some residual risk remains.",
   "Transfer (sometimes called sharing) shifts the financial impact to another party. The most common example is buying cybersecurity insurance; outsourcing a function to a provider under a contract with liability terms is another. Transfer moves the financial burden, but not the accountability: if customer data is breached at your vendor, your organization still owns the relationship with its customers and regulators and still suffers reputational damage.",
   "Avoid means eliminating the risk by stopping the activity that creates it: not launching a risky product, retiring an insecure legacy system or deciding not to store a particular type of data at all. Avoidance is effective but may mean giving up the benefit the activity would have provided.",
   "Accept means acknowledging the risk and choosing to take no further action, usually because the cost of treating it exceeds the expected loss, or because it falls within risk appetite. Acceptance must be a deliberate, documented decision by someone with authority, not simply ignoring the problem. Security+ also covers exceptions and exemptions: formal, time-limited approvals to deviate from a policy or standard, such as allowing an unsupported system to run for six more months while a replacement is built, often with compensating controls. Exceptions should be recorded in the risk register and reviewed.",
   "In practice, organizations combine strategies: mitigate a risk to reduce it, transfer part of what remains through insurance, and accept the rest. Whatever is chosen, the risk owner documents it and the risk is monitored, since changes in threats or the business may call for a different treatment later."
  ],
  "terms": [
   [
    "Mitigate",
    "Reducing a risk's likelihood or impact through controls."
   ],
   [
    "Transfer",
    "Shifting financial impact of a risk to another party, such as an insurer."
   ],
   [
    "Avoid",
    "Eliminating a risk by not doing the activity that creates it."
   ],
   [
    "Accept",
    "Formally acknowledging a risk and choosing not to act further."
   ],
   [
    "Exception",
    "A formal, documented, usually time-limited approval to deviate from a policy or standard."
   ]
  ],
  "example": "A small online retailer faces the risk of a data breach. It mitigates by moving card handling to a payment processor and enabling MFA, transfers part of the remaining financial risk by buying cyber insurance, avoids some risk by deciding not to store customer birth dates, and accepts the small leftover risk in a signed decision by the owner.",
  "tip": "Insurance equals transfer. Stopping the activity equals avoid. Adding controls equals mitigate. Doing nothing on purpose, documented, equals accept. Transfer never moves accountability.",
  "check": [
   [
    "A company stops offering a product feature because it would require storing sensitive health data. Which strategy is this?",
    "Avoidance, because the activity creating the risk is eliminated."
   ],
   [
    "Does buying cyber insurance remove an organization's responsibility for a breach?",
    "No. It transfers some financial impact, but the organization remains accountable to customers and regulators and still suffers reputational harm."
   ]
  ]
 },
 {
  "t": "Third-party risk: SLA, MOU, MSA, SOW, NDA, right to audit",
  "body": [
   "Organizations rely on vendors for cloud hosting, software, payroll, support and much more. Every vendor with access to your systems or data extends your attack surface; many major breaches began at a supplier. Third-party risk management covers choosing vendors carefully, writing the right agreements and monitoring vendors over time.",
   "Vendor assessment starts before signing. Due diligence examines the vendor's security practices, financial stability, reputation and legal compliance. Methods include security questionnaires, reviewing independent audit reports or certifications, penetration test results, evidence of internal audits and, for critical suppliers, supply chain analysis to understand their own suppliers. Watch for conflicts of interest. After signing, vendor monitoring continues with periodic reassessment and review of performance and incidents.",
   "Agreements formalize expectations. A service-level agreement (SLA) defines measurable performance commitments, such as uptime percentage, support response times and the penalties or credits if they are missed. A memorandum of understanding (MOU) records a mutual intent to cooperate; it is usually less formal and often not legally binding. A memorandum of agreement (MOA) is more formal, setting out specific responsibilities. A master service agreement (MSA) sets the general terms for an ongoing relationship, such as liability, confidentiality and payment, so future projects need not renegotiate them. A statement of work (SOW) or work order describes a particular project under that relationship: its deliverables, timeline and cost. A business partners agreement (BPA) defines how two partners work together, including profit sharing and responsibilities.",
   "A non-disclosure agreement (NDA) legally obliges a party to keep shared information confidential. It is standard before sharing sensitive details during vendor evaluation or with contractors. A right-to-audit clause gives your organization the contractual right to audit the vendor's controls, or to receive independent audit results, to verify they meet agreed security requirements. Without it, you may have no way to check.",
   "Contracts should also address security requirements, breach notification timelines, data ownership, what happens to data at the end of the relationship and rules of engagement for any security testing. Remember from the previous lesson: outsourcing transfers work, not accountability."
  ],
  "terms": [
   [
    "SLA",
    "Service-level agreement: measurable performance commitments such as uptime and response time."
   ],
   [
    "MOU",
    "Memorandum of understanding: a usually non-binding statement of intent to cooperate."
   ],
   [
    "MSA",
    "Master service agreement: general terms governing an ongoing vendor relationship."
   ],
   [
    "SOW",
    "Statement of work: specific deliverables, timeline and cost for a project."
   ],
   [
    "NDA",
    "Non-disclosure agreement: a legal duty to keep shared information confidential."
   ],
   [
    "Right-to-audit clause",
    "A contract term allowing the customer to audit or verify a vendor's controls."
   ]
  ],
  "example": "Before choosing a payroll provider, a company signs NDAs with three candidates, sends a security questionnaire and reviews their audit reports. It signs an MSA with the winner, including a right-to-audit clause and a 72-hour breach notification requirement, an SLA guaranteeing uptime during pay periods and a SOW for the initial data migration.",
  "tip": "SLA equals measurable performance; MOU equals intent, often non-binding; MSA equals general terms; SOW equals specific project work; NDA equals confidentiality; right to audit equals verification.",
  "check": [
   [
    "Which agreement defines uptime guarantees and penalties for missing them?",
    "A service-level agreement (SLA)."
   ],
   [
    "Which contract clause allows you to verify a vendor's security controls?",
    "A right-to-audit clause."
   ],
   [
    "How does an MSA relate to a SOW?",
    "The MSA sets general terms for the relationship; each SOW defines the deliverables, timeline and cost of a specific project under it."
   ]
  ]
 },
 {
  "t": "Compliance, privacy roles (controller, processor), audits",
  "body": [
   "Compliance means meeting the requirements of laws, regulations, contracts and standards that apply to the organization. Non-compliance can lead to fines, sanctions, loss of licenses, contractual penalties and reputational damage. Security+ expects you to understand compliance monitoring and reporting, privacy roles, and the different kinds of audits and assessments.",
   "Compliance monitoring includes due diligence (investigating and understanding the requirements and risks) and due care (acting on that knowledge by implementing and maintaining appropriate controls). Organizations produce internal compliance reports for management and external reports for regulators, and may use attestation, in which a responsible officer formally affirms that controls are in place. Automation, such as continuous configuration checks, makes monitoring more reliable.",
   "Privacy laws protect personal data, and they depend on where the data subjects live and where data is processed. Some apply locally or regionally, others nationally or globally; the European Union's General Data Protection Regulation (GDPR) is the best-known example. Roles define who is responsible. The data subject is the person the data is about. The data controller decides why and how personal data is processed and is primarily accountable for complying with privacy law. The data processor processes data on the controller's behalf and according to its instructions, such as a payroll or cloud email provider. The data custodian or steward manages data day to day, and the data owner is accountable for a data set within the organization. Rights such as the right to be forgotten (asking for one's data to be erased) and ideas like data inventory and retention also apply.",
   "Audits and assessments verify controls. An internal audit is performed by the organization's own audit function, which should be independent from the teams it examines and often reports to an audit committee. Self-assessments are done by the team itself. An external audit is performed by an independent outside party, often required by regulators or customers, and provides stronger assurance. Regulatory examinations are conducted by government bodies. Independent third-party audits, penetration tests and assessments by customers are other forms. Attestation reports from auditors provide assurance about a service organization's controls.",
   "When audits find gaps, the organization documents a remediation plan with owners and dates, then verifies closure."
  ],
  "terms": [
   [
    "Data controller",
    "The entity that decides the purposes and means of processing personal data."
   ],
   [
    "Data processor",
    "An entity that processes personal data on behalf of and under instructions from the controller."
   ],
   [
    "Data subject",
    "The individual whom personal data is about."
   ],
   [
    "Due care",
    "Taking reasonable, ongoing action to implement and maintain appropriate controls."
   ],
   [
    "Attestation",
    "A formal statement affirming that controls or reports are accurate and in place."
   ]
  ],
  "example": "A clothing retailer collects customer addresses and uses a cloud email marketing service to send newsletters. The retailer is the data controller because it decides what data to collect and why. The marketing service is the processor, acting on the retailer's instructions. When a customer asks to be forgotten, the retailer must ensure both its own systems and the processor delete the data.",
  "tip": "Controller decides why and how; processor acts on instructions. External audits by independent parties give stronger assurance than internal audits or self-assessments.",
  "check": [
   [
    "A company uses a cloud payroll service to pay its staff. Which is the controller and which is the processor?",
    "The company is the controller because it decides the purpose; the payroll service is the processor acting on its instructions."
   ],
   [
    "What is the difference between due diligence and due care?",
    "Due diligence is investigating and understanding risks and requirements; due care is acting on them by implementing and maintaining controls."
   ]
  ]
 },
 {
  "t": "Security awareness and phishing simulations",
  "body": [
   "Technology cannot stop every attack; many incidents begin with a person clicking a link, approving a fraudulent payment or sharing a password. Security awareness programs aim to change behavior so people recognize threats, avoid risky actions and report problems quickly. The goal is a workforce that acts as an extra layer of detection rather than the weakest link.",
   "Security+ lists the topics a program should cover: policies and handbooks, situational awareness, insider threat, password management, removable media and cables, social engineering, operational security, and working in hybrid or remote environments. Training should be tailored to roles. Everyone needs the basics, while developers need secure coding, help desk staff need to verify identities before resetting passwords, and finance staff need to recognize business email compromise and payment fraud.",
   "Phishing campaigns and simulations are a central tool. The security team sends realistic but harmless phishing emails to employees to measure how many click, enter credentials or report the message. Someone who clicks is typically shown immediate, short training explaining the clues they missed. The most important metric is not the click rate alone but the reporting rate and how quickly reports arrive, because a single fast report lets the security team pull a real phishing email from every mailbox. Simulations should be run ethically, varying difficulty and avoiding cruel lures, since the aim is learning, not embarrassment.",
   "Teach people to recognize the signs: urgency or threats, unexpected attachments, mismatched sender addresses or link destinations, requests for credentials or gift cards, and changes to payment details. They should know how to report, usually a report button in the email client, and that reporting a mistake quickly will be welcomed, not punished. Anomalous behavior recognition also matters: noticing behavior that is risky, unexpected or unintentional, such as a colleague asking to borrow a badge.",
   "Programs follow a cycle: initial training at onboarding, recurring training, and reporting and monitoring of results so the program can be adjusted. Development and execution should be measured with metrics such as completion rates, simulation results and incident trends. A program that is short, frequent, relevant and supportive changes behavior far more than one long annual presentation."
  ],
  "terms": [
   [
    "Security awareness training",
    "Education that helps people recognize and respond appropriately to security threats."
   ],
   [
    "Phishing simulation",
    "A controlled, harmless fake phishing campaign used to measure and improve user behavior."
   ],
   [
    "Reporting rate",
    "The proportion of users who report a suspicious message, a key awareness metric."
   ],
   [
    "Business email compromise",
    "Fraud using a compromised or spoofed business email account to trick staff into payments or data disclosure."
   ],
   [
    "Insider threat",
    "Risk from people inside the organization, whether malicious or accidental."
   ]
  ],
  "example": "After quarterly phishing simulations begin, a company's click rate falls slowly, but its reporting rate rises from a small minority to most employees. When a real credential-phishing email arrives, three staff report it within minutes, and the security team removes it from all mailboxes before anyone else enters a password.",
  "tip": "Reporting speed and rate often matter more than click rate. Role-based training goes to people with elevated risk, and simulations should educate, not shame.",
  "check": [
   [
    "Why is the reporting rate an important phishing simulation metric?",
    "Quick reports let the security team detect and remove real phishing emails organization-wide before more people fall for them."
   ],
   [
    "What should happen immediately when a user clicks a simulated phishing link?",
    "They should receive brief, just-in-time training explaining the warning signs they missed."
   ]
  ]
 }
]);
