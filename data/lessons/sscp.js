/* Lessons for ISC2 SSCP (Oct 2025 outline): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("sscp", [
 {
  "t": "ISC2 Code of Ethics: preamble and the four canons, in priority order",
  "body": [
   "Every SSCP holder agrees to follow the ISC2 Code of Ethics, and breaking it can cost you the certification. The exam does not ask you to recite it word for word, but it does give you short workplace dilemmas and asks what the certified professional should do. To answer those well you need to know what the code says and, more importantly, the order in which its parts apply when they pull in different directions.",
   "The code opens with a preamble. In plain terms it says that the safety and welfare of society and the common good, duty to our principals, and duty to each other require that members adhere, and be seen to adhere, to the highest ethical standards of behavior. It then says that strict adherence to the code is a condition of certification. Two ideas matter here: appearance counts as well as conduct ('be seen to adhere'), and following the code is not optional once you are certified.",
   "The four canons follow, and they are listed in priority order. First: protect society, the common good, necessary public trust and confidence, and the infrastructure. Second: act honorably, honestly, justly, responsibly and legally. Third: provide diligent and competent service to principals. Fourth: advance and protect the profession. A principal is whoever you work for: your employer, a client or a customer.",
   "The ordering is the key exam skill. When two canons conflict, the higher one wins. If your employer (canon three) asks you to hide a safety-critical flaw from the public (canon one), protecting society comes first. If a client wants you to cut a legal corner, acting legally (canon two) beats serving the client. Loyalty to the profession (canon four) is real, but it never outranks honesty or public safety. A handy memory aid is 'society, self (your own honest conduct), boss, profession'.",
   "The code also shapes how complaints work. ISC2 accepts formal ethics complaints, and the right to file one is tied to the canons: broadly, anyone may complain about violations of the first two canons, principals about the third, and other certified professionals about the fourth. Complaints must be specific and are reviewed by an ethics committee, not settled informally. Knowing that a violation you witness can and sometimes should be reported is part of the professional duty.",
   "In practice, most ethical questions on the exam have one answer that is legal, honest and protects people, and several distractors that are expedient, loyal to a boss, or quietly helpful to a peer. Pick the option that a reasonable, honest professional could defend in public. Avoid answers that involve deception, even well-intended deception, and avoid answers where you take action outside your authority when a proper reporting channel exists."
  ],
  "terms": [
   [
    "Preamble",
    "The opening statement of the ISC2 Code of Ethics explaining why high ethical standards are required and that adherence is a condition of certification."
   ],
   [
    "Canon",
    "One of the four ordered principles of the code; when they conflict, the earlier canon takes priority."
   ],
   [
    "Principal",
    "The person or organization you provide professional services to, such as an employer or client."
   ],
   [
    "Ethics complaint",
    "A formal, specific allegation filed with ISC2 that a member violated the code, reviewed by an ethics committee."
   ]
  ],
  "example": "A manager asks an SSCP-certified administrator to leave a known flaw in a hospital's patient-monitoring network unreported until after a product launch. Serving the employer is canon three, but protecting society and the infrastructure is canon one, so the administrator escalates the issue through proper channels rather than staying silent.",
  "tip": "Memorize the order: protect society first, then act honorably and legally, then serve principals, then advance the profession. When two canons conflict, choose the answer that satisfies the higher-priority, lower-numbered canon (canon one beats canon three).",
  "check": [
   [
    "Which canon takes priority if serving your employer would require breaking the law?",
    "Canon two, act honorably, honestly, justly, responsibly and legally, outranks canon three, service to principals, so you must not break the law for the employer."
   ],
   [
    "What does the preamble say about adherence to the code?",
    "That members must adhere, and be seen to adhere, to the highest ethical standards, and that strict adherence is a condition of certification."
   ],
   [
    "What is canon four?",
    "Advance and protect the profession, which is the lowest of the four in priority."
   ]
  ]
 },
 {
  "t": "CIA triad, authenticity, non-repudiation and privacy",
  "body": [
   "Almost every security decision can be traced back to a small set of goals. The oldest and most tested is the CIA triad: confidentiality, integrity and availability. SSCP adds three more ideas you must separate cleanly: authenticity, non-repudiation and privacy. Exam questions often describe a control or an attack and ask which goal it serves or threatens, so the definitions need to be crisp.",
   "Confidentiality means information is disclosed only to authorized people, processes and systems. Controls include encryption, access control lists and data classification. Eavesdropping, shoulder surfing and a misconfigured public storage bucket all threaten it. Integrity means information and systems are protected from unauthorized or accidental change, and that changes can be detected. Hashes, digital signatures, input validation and change control support integrity. Availability means authorized users can reach systems and data when they need them. Redundancy, backups, patching and capacity planning support it, while denial-of-service attacks, ransomware and power failures threaten it.",
   "Authenticity means you can confirm that data, a message or a user is genuine: that it really came from the claimed source. A message authentication code or a digital signature proves authenticity of a message; a successful login proves authenticity of a user. Non-repudiation goes a step further. It means the sender cannot credibly deny having performed an action, such as signing a contract or approving a payment. Non-repudiation needs something only that person could have produced, which is why it relies on asymmetric digital signatures with a private key the signer alone controls, plus trustworthy logging and timestamps.",
   "A classic exam distinction: a shared secret key, as used in a hash-based message authentication code (HMAC), proves a message came from someone holding the key and was not altered, so it gives integrity and authenticity. It does not give non-repudiation, because both parties hold the same key and either could have produced the code. Only a signature made with a private key that one party alone holds can support non-repudiation.",
   "Privacy is related to confidentiality but not the same. Confidentiality is about keeping any sensitive information from unauthorized eyes. Privacy is about individuals' rights over their own personal information: what is collected, why, how long it is kept, who it is shared with, and whether the person consented. You can protect data perfectly well (confidentiality) and still violate privacy by collecting more than you need or using it for an undisclosed purpose.",
   "When you read a scenario, ask what went wrong or what is being protected. Data seen by the wrong person is confidentiality. Data changed is integrity. Service down is availability. Uncertainty about who sent something is authenticity. Someone denying an action is non-repudiation. Misuse of personal data is privacy."
  ],
  "terms": [
   [
    "Confidentiality",
    "Preventing disclosure of information to unauthorized people, processes or systems."
   ],
   [
    "Integrity",
    "Protecting data and systems from unauthorized or accidental modification and making changes detectable."
   ],
   [
    "Availability",
    "Ensuring authorized users have timely, reliable access to systems and data."
   ],
   [
    "Non-repudiation",
    "Assurance that a party cannot credibly deny having performed an action, typically achieved with a private-key digital signature and reliable logs."
   ],
   [
    "Privacy",
    "An individual's right to control how their personal information is collected, used, shared and retained."
   ]
  ],
  "example": "A finance clerk approves a large wire transfer, then later claims they never did. Because the approval system requires each approver to sign with a private key stored on their own smart card, and the action is recorded in a protected audit log, the company can show the approval came from the clerk's credential. That is non-repudiation at work.",
  "tip": "Symmetric tools such as HMAC give integrity and authenticity but never non-repudiation, because the key is shared. If the question asks for non-repudiation, look for a digital signature using a private key.",
  "check": [
   [
    "A ransomware attack encrypts a file server so staff cannot open files. Which CIA goal is most directly affected?",
    "Availability, because authorized users can no longer access the data when they need it."
   ],
   [
    "Why does a shared-key message authentication code not provide non-repudiation?",
    "Both parties hold the same key, so either could have created the code; you cannot prove which one did."
   ],
   [
    "How does privacy differ from confidentiality?",
    "Confidentiality protects any sensitive data from unauthorized disclosure; privacy concerns individuals' rights over how their personal data is collected, used and shared."
   ]
  ]
 },
 {
  "t": "Least privilege, need to know, separation of duties, job rotation, mandatory vacation",
  "body": [
   "These five principles are administrative ideas about how much access and power any one person should have. They limit the damage a mistake, a compromised account or a dishonest insider can do, and they create chances to catch problems. The exam frequently gives a scenario and asks which principle is being applied or violated.",
   "Least privilege means every user, process and system gets only the minimum permissions required to do its job, for only as long as needed. A help desk technician who resets passwords does not need domain administrator rights; a web server process does not need to run as root. Least privilege shrinks the attack surface: if the account is compromised, the attacker inherits only what that account could do.",
   "Need to know is narrower and applies mainly to information. Even when someone has the right clearance or role, they should see a specific piece of data only if their current task requires it. Two analysts with the same clearance may work on different cases; each needs to know only their own case files. Think of least privilege as limiting what you can do and need to know as limiting what you can see.",
   "Separation of duties (also called segregation of duties) splits a sensitive process into steps performed by different people, so no single person can complete it alone. The person who creates a vendor in the payment system should not also approve payments to that vendor; the developer who writes code should not also push it to production unreviewed. Breaking the rule would then require collusion between two or more people, which is harder and more likely to be noticed. A related idea, dual control or two-person integrity, requires two people to act together at the same moment, such as two keys to open a vault.",
   "Job rotation moves people through different roles over time. It reduces reliance on one individual, cross-trains staff for continuity, and lets a new person notice irregularities the previous holder may have been hiding. Mandatory vacation requires employees, especially in sensitive financial or administrative roles, to take consecutive days off during which someone else performs their duties. Fraud schemes often need constant attention to keep them hidden, so an enforced absence tends to expose them. Both are detective as well as deterrent controls.",
   "Watch for how these interact with operations. Strict separation of duties can be hard in a small team, so a compensating control such as management review of logs may be used instead. And least privilege must be maintained over time: when people change roles, old rights should be removed, or privilege creep undermines everything above."
  ],
  "terms": [
   [
    "Least privilege",
    "Granting only the minimum access rights needed to perform a task, for no longer than needed."
   ],
   [
    "Need to know",
    "Restricting access to specific information to people whose current duties require it, even if they are otherwise cleared."
   ],
   [
    "Separation of duties",
    "Dividing a critical process among multiple people so that no one person can complete it alone, requiring collusion to commit fraud."
   ],
   [
    "Mandatory vacation",
    "Requiring staff to take time off so others perform their duties, which can reveal hidden fraud or errors."
   ],
   [
    "Job rotation",
    "Periodically moving staff between roles to reduce single-person dependency and help detect misconduct."
   ]
  ],
  "example": "An accounts payable clerk both adds new vendors and approves invoices. During the clerk's required two-week vacation, a colleague covering the role notices payments going to a vendor with a residential address that matches the clerk's. The company then splits vendor creation and payment approval between two roles, applying separation of duties.",
  "tip": "Separation of duties prevents fraud by requiring collusion; job rotation and mandatory vacation detect it. If the question says 'no single person can complete the transaction', the answer is separation of duties.",
  "check": [
   [
    "Which principle is violated when a developer can write code and deploy it to production without review?",
    "Separation of duties, because one person controls both creation and release of a change."
   ],
   [
    "How does need to know differ from least privilege?",
    "Least privilege limits the permissions and actions a subject has; need to know limits access to particular information to what current work requires, even among people with the same clearance."
   ],
   [
    "Why is mandatory vacation considered a detective control?",
    "While the employee is away, someone else does their job and may discover irregularities that the employee had been concealing."
   ]
  ]
 },
 {
  "t": "Defense in depth, due care vs due diligence",
  "body": [
   "Defense in depth is the practice of layering several independent controls so that the failure of any one does not leave an asset exposed. No single control is perfect: firewalls get misconfigured, users click phishing links, patches arrive late. If you layer controls of different kinds, an attacker has to defeat several of them, which takes more time and creates more chances to be detected.",
   "A typical layered design, working outward in, might look like this. Data is protected by classification and encryption. Applications use input validation and secure authentication. Hosts run endpoint protection, host firewalls and are hardened and patched. The network is segmented with firewalls, access control lists and intrusion detection. The perimeter has filtering and a demilitarized zone (DMZ) for public services. The physical site has locks, badges and cameras. Wrapping around all of it are policies, training and monitoring. The layers should mix technical, administrative and physical controls, and mix preventive with detective ones, so that a gap in one type is covered by another.",
   "Defense in depth also implies diversity. If every layer depends on the same product or the same credential, one flaw can defeat them all. Using different mechanisms at different layers, such as network filtering plus application allow-listing plus logging to a separate system, avoids a single point of failure.",
   "Due care and due diligence are legal and management ideas that the exam loves to contrast. Due care is doing what a reasonable and prudent person would do in the same situation: actually implementing sensible protections and acting responsibly. Installing a firewall, enforcing strong authentication, patching known vulnerabilities and training staff are acts of due care. Failing to exercise due care can lead to a finding of negligence.",
   "Due diligence is the investigation, research and ongoing verification that informs and checks those actions. It means knowing your risks before you act and making sure controls keep working: performing a risk assessment, vetting a vendor before signing a contract, reviewing audit results, and checking that the firewall rules still match policy. A simple way to separate them: due diligence is 'do detect' (research and verify), due care is 'do correct' (act on it). Diligence comes first as understanding, care follows as action, and diligence continues as monitoring.",
   "Senior management is ultimately accountable for both. When an organization can show it researched its risks and took reasonable steps, it is in a much stronger position legally and with regulators after an incident."
  ],
  "terms": [
   [
    "Defense in depth",
    "Layering multiple, varied security controls so that the failure of one does not expose the asset."
   ],
   [
    "Due care",
    "Taking the actions a reasonable and prudent person would take to protect assets; the doing."
   ],
   [
    "Due diligence",
    "Researching, assessing and continuously verifying risks and controls; the investigating and checking."
   ],
   [
    "Negligence",
    "Failure to exercise due care, which can create legal liability after an incident."
   ]
  ],
  "example": "Before outsourcing payroll, a company reviews the provider's audit reports, security questionnaire answers and breach history; that is due diligence. It then signs a contract requiring encryption and breach notification, and turns on MFA for its own payroll admins; that is due care. Each year it re-reviews the provider's reports, continuing due diligence.",
  "tip": "Due diligence = investigate and verify (knowing); due care = implement and act (doing). If the scenario is about research, assessment or checking, choose diligence; if it is about putting a reasonable protection in place, choose care.",
  "check": [
   [
    "A company performs a risk assessment and reviews a vendor's audit report before signing. Is this due care or due diligence?",
    "Due diligence, because it is investigation and verification to understand risk before acting."
   ],
   [
    "Why should layers in a defense-in-depth design be diverse?",
    "If all layers rely on the same mechanism or product, a single flaw or bypass could defeat them all at once."
   ],
   [
    "What legal concept describes a failure to exercise due care?",
    "Negligence."
   ]
  ]
 },
 {
  "t": "Control categories (technical, administrative, physical) and types (preventive, detective, corrective, deterrent, compensating, directive)",
  "body": [
   "Security controls are safeguards that reduce risk. The SSCP exam describes each control along two separate dimensions: its category, which is how it is implemented, and its type, which is what it does in time relative to an incident. A single control always has one category and at least one type, and questions often ask you to classify one.",
   "There are three categories. Technical controls, also called logical controls, are implemented in hardware or software: firewalls, encryption, access control lists, antivirus, multifactor authentication and intrusion detection systems. Administrative controls, also called managerial controls, are policies, procedures and people-focused practices: security policies, background checks, awareness training, separation of duties and risk assessments. Physical controls protect the tangible environment: fences, locks, guards, lighting, badge readers, cameras and fire suppression.",
   "The types describe the control's function. Preventive controls stop an incident from happening: a locked door, a firewall rule, account lockout. Detective controls discover an incident that is happening or has happened: audit logs, an intrusion detection system, motion sensors, reconciliation of accounts. Corrective controls fix things after an incident and restore normal operation or reduce its impact: restoring from backup, reimaging a host, antivirus quarantining a file, patching the exploited flaw. Deterrent controls discourage an attacker by making the act look risky or unrewarding: warning banners, visible cameras, guard dogs, posted policies. Directive controls tell people what to do or not do: policies, signs saying 'authorized personnel only', acceptable use agreements. Compensating controls are alternatives used when the primary control is not feasible and provide a similar level of protection: extra monitoring and network isolation for a legacy machine that cannot be patched. Some frameworks also list recovery controls, such as backups and disaster recovery sites, which restore capability after a larger disruption.",
   "Combine the two dimensions to classify precisely. A firewall is technical and preventive. A security camera is physical and detective, and if visible also deterrent. A background check is administrative and preventive. A backup restore is technical and corrective or recovery. An acceptable use policy is administrative and directive.",
   "The difference between deterrent and preventive trips many learners. A deterrent only discourages; a determined attacker can ignore it. A preventive control physically or logically stops the action. A 'No trespassing' sign is deterrent; a locked gate is preventive. Likewise, detective and corrective controls often work in pairs: the IDS detects, the incident response process corrects."
  ],
  "terms": [
   [
    "Technical control",
    "A safeguard implemented through hardware or software, such as a firewall or encryption."
   ],
   [
    "Administrative control",
    "A safeguard based on policy, procedure or personnel management, such as training or background checks."
   ],
   [
    "Physical control",
    "A safeguard that protects facilities and hardware, such as locks, fences and guards."
   ],
   [
    "Compensating control",
    "An alternative control that provides comparable protection when the primary control cannot be implemented."
   ],
   [
    "Deterrent control",
    "A control that discourages an attack without physically preventing it, such as a warning banner."
   ]
  ],
  "example": "A factory runs an old controller that cannot be patched. The team cannot apply the normal preventive control (patching), so it places the controller on an isolated network segment with strict firewall rules and adds extra log monitoring. Those measures are compensating controls, and the firewall rules are technical and preventive.",
  "tip": "Answer two questions for any control: how is it implemented (technical, administrative, physical) and what does it do (prevent, detect, correct, deter, direct, compensate). The exam may ask for either, so read which dimension the question wants.",
  "check": [
   [
    "Classify a login warning banner by category and type.",
    "Technical (it is presented by the system) and deterrent or directive, since it discourages misuse and states rules without actually blocking access."
   ],
   [
    "Restoring a server from backup after ransomware is which control type?",
    "Corrective (or recovery), because it restores normal operation after the incident."
   ],
   [
    "What makes a control compensating?",
    "It is used in place of a primary control that is not feasible, and provides a comparable level of risk reduction."
   ]
  ]
 },
 {
  "t": "Documenting and verifying functional security controls, baselines",
  "body": [
   "Putting a control in place is only half the job. An SSCP must also document what the control is supposed to do and verify that it actually does it. Controls drift: someone adds a firewall exception, a service is reinstalled with default settings, a logging agent stops sending. Documentation and verification catch that drift before an attacker does.",
   "Documentation starts with the control's purpose and the requirement it meets, often traced to a policy, standard or regulation. For each control you record its owner, scope, how it is configured, how it is operated, and what evidence proves it is working. This record lets auditors, new team members and incident responders understand the environment without guessing. Good documentation also records known exceptions, with an approval and an expiry date, so that deviations are deliberate rather than accidental.",
   "A security baseline is a documented minimum set of security settings that every system of a given type must meet. A Windows server baseline might specify password policy, audit policy, disabled services, required patches and host firewall rules. A Linux baseline might require SSH root login disabled and specific file permissions. Organizations often start from widely used hardening guides, such as the Center for Internet Security (CIS) Benchmarks or vendor security guides, and adapt them. The baseline becomes the yardstick: any system can be compared against it, and new systems are built from it, often using golden images or configuration management tools so every build starts compliant.",
   "Verification means testing that the control functions as intended. Methods include automated configuration scans that compare systems to the baseline, vulnerability scans, reviewing logs to confirm events are captured, manual inspection, and functional tests such as attempting a blocked connection to confirm the firewall denies it. The key idea is to test the function, not just the existence: a firewall that is installed but allows all traffic, or an antivirus agent that has not updated in months, gives false comfort.",
   "Verification should happen at defined times: when a control is first deployed, after significant changes, and on a regular schedule. Results feed back into documentation and change management. When a deviation is found, it is either corrected to match the baseline or formally accepted as an exception with a risk owner's approval.",
   "In a lab you might run a benchmark scanning tool against a virtual machine, read the report of passed and failed settings, fix a few failures, then rescan to prove the change worked. That loop of document, measure, fix and remeasure is exactly what the exam means by verifying controls."
  ],
  "terms": [
   [
    "Security baseline",
    "A documented minimum set of security configurations that all systems of a given type must meet."
   ],
   [
    "Configuration drift",
    "Gradual divergence of a system's actual settings from its approved baseline over time."
   ],
   [
    "Golden image",
    "A preconfigured, hardened system image used to build new systems consistently to the baseline."
   ],
   [
    "Exception",
    "A documented, approved and usually time-limited deviation from a baseline or policy."
   ]
  ],
  "example": "A quarterly configuration scan shows that three web servers now allow SSH password logins, although the Linux baseline requires key-based authentication only. The team traces the change to a vendor support session, reverts the setting through change management, and adds a check to the monthly scan so the drift is caught sooner.",
  "tip": "Verification means proving a control works, not just that it exists. If an answer choice actually tests the function (for example, attempting a denied connection or reviewing whether logs arrive), it usually beats one that merely confirms installation.",
  "check": [
   [
    "What is a security baseline used for?",
    "As the minimum approved configuration for a class of systems, used both to build systems and to measure them for drift."
   ],
   [
    "When should controls be verified?",
    "When first deployed, after significant changes, and periodically on a set schedule."
   ],
   [
    "What should happen when a system is found to deviate from the baseline?",
    "Either correct it back to the baseline or document an approved exception with a risk owner and, ideally, an expiry date."
   ]
  ]
 },
 {
  "t": "Asset management lifecycle: inventory, ownership, classification, retention, secure disposal",
  "body": [
   "You cannot protect what you do not know you have. Asset management gives security teams an accurate picture of the hardware, software, data and services the organization depends on, who is responsible for each, how valuable or sensitive it is, and what should eventually happen to it. The SSCP exam treats this as a lifecycle, from acquisition to disposal.",
   "The lifecycle begins with inventory. Every asset is recorded when acquired: servers, laptops, network devices, cloud resources, software licenses and important data sets. Useful fields include a unique identifier, description, location, owner, classification, configuration details and support status. Inventories are kept current with automated discovery (network scans, endpoint agents, cloud account listings) plus manual processes for purchases and returns. Unknown devices found on the network, sometimes called shadow IT, are a security finding in their own right.",
   "Each asset needs an owner: a named person or role, usually a business manager, who is accountable for it. The owner decides its classification, approves who may access it and accepts the risk around it. Technical staff may operate the asset, but accountability stays with the owner.",
   "Classification labels assets, especially information, by sensitivity and value so that protections are proportional. A business might use public, internal, confidential and restricted; government schemes use levels such as confidential, secret and top secret. Classification drives handling rules: encryption requirements, who can see the data, whether it may leave the building and how it must be destroyed. Assets should be labeled or marked where practical, and classification should be reviewed, because sensitivity can change over time.",
   "Retention defines how long assets and data are kept. Retention periods come from legal, regulatory, contractual and business requirements. Keeping data too briefly may break the law or lose evidence; keeping it too long increases storage costs, legal exposure during lawsuits and the impact of a breach. A retention schedule lists each record type, its retention period and what happens at the end. A legal hold can suspend normal deletion when litigation is expected.",
   "Secure disposal ends the lifecycle. When hardware is retired or data reaches the end of its retention period, it must be removed so it cannot be recovered, using a method suited to the classification: clearing, purging or physical destruction. Disposal should be documented, often with a certificate of destruction from a vendor, and the inventory updated so the asset is marked retired. Many breaches come from disposed drives and devices that still held readable data."
  ],
  "terms": [
   [
    "Asset inventory",
    "A maintained record of an organization's hardware, software, data and services with key attributes such as owner and location."
   ],
   [
    "Asset owner",
    "The person or role accountable for an asset, who decides its classification and approves access."
   ],
   [
    "Classification",
    "Labeling assets by sensitivity and value so that protections and handling are proportional."
   ],
   [
    "Retention schedule",
    "A policy listing how long each type of record must be kept and how it is disposed of afterward."
   ],
   [
    "Legal hold",
    "An instruction to preserve specific data and suspend normal deletion because of expected litigation or investigation."
   ]
  ],
  "example": "During an audit, a company discovers twenty laptops in its inventory with no assigned owner and no disposal records. It traces them, finds that several were sold through a surplus reseller with drives intact, and changes its process so retired devices must have a sanitization record and certificate before the inventory entry can be closed.",
  "tip": "The data owner, not IT, decides classification and approves access. Retention is driven first by legal and regulatory requirements, and keeping data longer than required is a risk, not a safe default.",
  "check": [
   [
    "Who decides an information asset's classification?",
    "The asset or data owner, the business person accountable for it."
   ],
   [
    "Why is keeping data beyond its retention period a risk?",
    "It increases storage costs, legal discovery exposure and the amount of data exposed in a breach, without a business or legal need."
   ],
   [
    "What should happen to the inventory record when an asset is disposed of?",
    "It should be updated to show the asset is retired, with documentation of the sanitization or destruction method."
   ]
  ]
 },
 {
  "t": "Data roles: owner, custodian, user; media sanitization (clear, purge, destroy)",
  "body": [
   "Clear roles prevent the two classic failures in data protection: nobody taking responsibility, and the wrong person making decisions. The SSCP exam expects you to know who does what, and to recognize the correct sanitization method for a given situation.",
   "The data owner is a senior business person, such as a department head, who is accountable for a set of information. The owner decides its classification, sets requirements for its protection, approves or denies access requests and determines how long it should be kept. The owner can delegate tasks but not accountability; if the data is mishandled, the owner answers for it.",
   "The data custodian carries out the owner's decisions day to day. Custodians are usually IT or operations staff: system administrators, database administrators, backup operators. They implement access controls, run backups and restores, apply patches, maintain the storage and keep logs. The custodian does not decide who should have access; they configure the access the owner approved. A useful phrase is 'owners decide, custodians implement'.",
   "The data user is anyone who accesses the data to do their job. Users must follow policy, handle data according to its classification and report suspected misuse. Some frameworks add further roles, such as the data subject (the person the personal data is about), the data controller and data processor (terms from privacy law for the organization that decides why data is processed and the one that processes it on its behalf), and the data steward who manages data quality.",
   "When media leaves service, its data must be removed. The widely used categories, described in guidance such as NIST Special Publication 800-88, are clear, purge and destroy. Clear uses logical techniques, such as overwriting all user-addressable storage with new values or a factory reset, to protect against simple, non-invasive recovery with normal tools. It suits media that will be reused inside the organization at the same sensitivity level. Purge uses physical or logical techniques that make recovery infeasible even with advanced laboratory methods. Examples include cryptographic erase (destroying the key for a self-encrypting drive), the drive's built-in sanitize or secure erase commands, and degaussing magnetic media. Purge suits media leaving organizational control or holding sensitive data. Destroy makes the media unusable and the data unrecoverable: shredding, disintegrating, pulverizing, melting or incinerating.",
   "Media type matters. Degaussing works on magnetic media such as hard disk drives and tapes, but has no effect on solid-state drives or flash storage, which store data electronically. Simple overwriting is unreliable on SSDs because wear leveling and spare blocks keep old data in places the operating system cannot address; use the manufacturer's sanitize command, cryptographic erase, or destruction. Deleting files or quick formatting is not sanitization at all; it only removes pointers. Whatever method you choose, verify the result and record it."
  ],
  "terms": [
   [
    "Data owner",
    "The accountable business role that classifies data, sets protection requirements and approves access."
   ],
   [
    "Data custodian",
    "The role, usually IT, that implements and maintains the controls the owner specified, such as backups and access settings."
   ],
   [
    "Clear",
    "Sanitization using logical techniques such as overwriting to prevent recovery with ordinary tools."
   ],
   [
    "Purge",
    "Sanitization that makes recovery infeasible even with laboratory techniques, such as cryptographic erase or degaussing magnetic media."
   ],
   [
    "Destroy",
    "Physically rendering media unusable, such as shredding or incineration, so data cannot be recovered."
   ]
  ],
  "example": "A hospital is returning leased laptops with SSDs that held patient records. The data owner requires purge-level sanitization because the devices leave its control. IT, acting as custodian, runs the drives' built-in cryptographic erase, verifies a sample, records serial numbers and gets a signed record before shipping them back.",
  "tip": "Degaussing does nothing to SSDs or flash. For solid-state media choose cryptographic erase, the manufacturer's sanitize command or physical destruction. And remember: owners decide, custodians implement.",
  "check": [
   [
    "A database administrator grants a user access after the department head approves it. Which roles are involved?",
    "The department head is the data owner who approves access; the DBA is the custodian who implements it."
   ],
   [
    "Why is overwriting unreliable for SSDs?",
    "Wear leveling and spare blocks mean some old data sits in cells the operating system cannot address, so overwriting may not reach it."
   ],
   [
    "Which sanitization level suits a drive being reused internally at the same classification?",
    "Clear, since it protects against normal recovery tools and the media stays under organizational control."
   ]
  ]
 },
 {
  "t": "Change and configuration management: request, impact analysis, approval, backout, emergency changes",
  "body": [
   "Many outages and security gaps are self-inflicted: a rushed firewall change, an untested patch, a setting nobody remembers changing. Change management is the process that controls how changes are proposed, evaluated, approved, implemented and reviewed. Configuration management is the related discipline of knowing and controlling the approved configuration of each system. Together they protect integrity and availability and give you an audit trail.",
   "A typical change process runs like this. First, someone submits a change request (often called a request for change, RFC) describing what will change, why, which systems are affected, when it will happen, and who will do it. Second comes impact analysis: what could break, which users and services depend on the systems, does it introduce security risk, and what resources are needed. Security staff should review changes that touch controls, access or exposed services. Third, the change is tested, ideally in a non-production environment that resembles production.",
   "Fourth is approval. Depending on risk, approval may come from a manager or from a change advisory board (CAB), a group of technical, business and security representatives that reviews significant changes. Low-risk, repeatable changes are often pre-approved as standard changes. Fifth, the change is scheduled, usually within a maintenance window, and communicated to affected people. Sixth, it is implemented and verified. Finally, the configuration records and documentation are updated and the change is closed, with a post-implementation review for significant or failed changes.",
   "Every change needs a backout plan, also called a rollback plan: the tested steps to return the system to its previous state if the change fails or causes problems. The plan should say what triggers a rollback, who decides, and how long it takes. Without a backout plan, a failed change turns into an extended outage.",
   "Emergency changes are needed when waiting for the normal process would cause greater harm, for example applying an urgent patch to an actively exploited vulnerability or restoring a failed service. The process is shortened, not skipped. An authorized person, sometimes an emergency CAB, approves quickly, the change is made, and then it is fully documented and reviewed afterward. An emergency label must never become a way to bypass controls routinely.",
   "Configuration management supports all of this. A configuration management database (CMDB) records configuration items (servers, network devices, applications) and their relationships and approved baselines. Comparing live systems against the CMDB and baseline reveals unauthorized changes, which should be treated as potential security incidents until explained."
  ],
  "terms": [
   [
    "Request for change (RFC)",
    "A formal proposal describing a change, its reason, scope, schedule and risk, submitted for evaluation."
   ],
   [
    "Change advisory board (CAB)",
    "A group of stakeholders that reviews and approves significant changes."
   ],
   [
    "Backout plan",
    "Documented, tested steps to reverse a change and restore the prior state if it fails."
   ],
   [
    "Emergency change",
    "An urgent change approved and implemented through an expedited process, then documented and reviewed afterward."
   ],
   [
    "Configuration management database (CMDB)",
    "A repository of configuration items, their attributes, relationships and approved states."
   ]
  ],
  "example": "An administrator wants to enable the host firewall on a file server. The RFC lists the rule set, impact analysis notes that a legacy backup agent uses an unusual port, testing on a clone confirms backups still work with one extra rule, the CAB approves a Saturday window, and the backout plan is to disable the firewall profile if file shares become unreachable.",
  "tip": "Emergency changes still require authorization and after-the-fact documentation and review. An answer that skips approval entirely or never documents the change is wrong even in a crisis.",
  "check": [
   [
    "What is the purpose of impact analysis in change management?",
    "To identify what the change could affect, including dependent services, users and security risk, before it is approved."
   ],
   [
    "What should a backout plan contain?",
    "The trigger for rolling back, who decides, and tested steps to restore the previous configuration."
   ],
   [
    "How should an unauthorized change discovered on a server be treated?",
    "As a potential security incident until it is investigated and explained, and the system returned to its approved baseline."
   ]
  ]
 },
 {
  "t": "Security awareness and training: phishing simulations, measuring effectiveness",
  "body": [
   "People are both a common target and a strong defense. Social engineering, weak passwords and mishandled data cause a large share of incidents, and most technical controls can be undone by a user who is tricked. Security awareness and training programs aim to change behavior, not just to deliver information.",
   "It helps to separate three levels. Awareness is broad and aimed at everyone: short messages, posters, briefings and reminders that keep security in mind, such as how to spot phishing or why to lock a screen. Training teaches specific skills to people who need them for their role: how an administrator should handle privileged accounts, how developers avoid common coding flaws, how help desk staff verify callers before resetting passwords. Education is deeper and longer term, building understanding of why controls work, such as a degree or certification course. Programs should be tailored by role and risk.",
   "Good programs start at onboarding, before a new hire gets access, and continue with refreshers at least annually and whenever threats, systems or policies change. Content should be short, relevant and practical. Users should know exactly how to report something suspicious, and reporting should be easy, for instance with a report button in the mail client. A culture where people report mistakes quickly, without fear of punishment for honest errors, gives the security team valuable early warning.",
   "Phishing simulations send realistic but harmless test emails to staff to see who clicks, who enters credentials and who reports. They must be authorized in advance by management, coordinated with the email and help desk teams, and designed not to cause real harm or embarrassment. When someone clicks, the best practice is immediate, brief, private teaching at that moment rather than public shaming. Difficulty should vary over time so that the program measures real judgment, not memorization of one template.",
   "Measuring effectiveness is what turns a program from a checkbox into a control. Completion rates show reach but not learning. Better measures include click rates and credential-submission rates in simulations over time, the report rate (how many users report the simulation), time to first report, the number and quality of real incidents reported by staff, results of short assessments before and after training, and trends in incidents caused by user error. A rising report rate is often a more meaningful sign of a healthy culture than a falling click rate alone.",
   "Use the results to adjust: target extra training where departments struggle, update content to match the attacks the organization actually sees, and report metrics to management to justify the program."
  ],
  "terms": [
   [
    "Security awareness",
    "Broad, ongoing activity that keeps all staff alert to security risks and expected behaviors."
   ],
   [
    "Security training",
    "Role-specific instruction that builds the skills a person needs to perform duties securely."
   ],
   [
    "Phishing simulation",
    "An authorized test in which harmless, realistic phishing messages are sent to staff to measure and improve their responses."
   ],
   [
    "Report rate",
    "The share of users who report a suspicious or simulated message, a key measure of program effectiveness."
   ]
  ],
  "example": "After six months of monthly phishing simulations with just-in-time lessons, a company's click rate falls modestly, but its report rate triples and the average time to the first report drops to a few minutes. When a real credential-phishing campaign arrives, early reports let the security team block the sender and reset the few affected accounts within the hour.",
  "tip": "Completion percentage measures attendance, not effectiveness. Look for behavioral metrics: simulation click and report rates over time, and real incidents reported by staff.",
  "check": [
   [
    "How does awareness differ from training?",
    "Awareness is broad and aimed at everyone to keep security in mind; training builds specific skills needed for a person's role."
   ],
   [
    "What must be in place before running a phishing simulation?",
    "Management authorization and coordination with relevant teams, with a design that causes no real harm."
   ],
   [
    "Name two metrics better than training completion rates.",
    "Phishing simulation click rate and report rate trends, or the number of real incidents reported by users."
   ]
  ]
 },
 {
  "t": "Physical security operations: perimeter, badges, access control vestibules, CCTV, visitor logs",
  "body": [
   "Logical controls are useless if someone can walk in and carry out a server or plug a device into an open network port. Physical security protects people, facilities and equipment, and the SSCP practitioner is often responsible for operating these controls day to day. Life safety always comes first: physical controls must never trap people during a fire or emergency.",
   "Physical security is layered from the outside in. The perimeter includes fencing, gates, bollards that stop vehicles, lighting, landscaping that removes hiding places, and signs. Next come building entrances with locks, guards and reception. Inside, sensitive areas such as data centers and wiring closets have their own stronger access controls. Each layer should deter, delay, detect and allow a response. Crime prevention through environmental design (CPTED) uses natural surveillance, clear sight lines and defined boundaries to discourage intruders.",
   "Badges serve two purposes. Photo identification lets staff visually confirm that someone belongs, and electronic badges (proximity cards or smart cards) operate door readers that log each entry. Badge systems should be tied to the identity lifecycle, so badges are disabled promptly when people leave. Staff should wear badges visibly and be trained to challenge unbadged people politely or report them.",
   "Tailgating (following an authorized person through a door without their knowledge) and piggybacking (following with their consent) are common ways around badge readers. An access control vestibule, historically called a mantrap, counters this with two interlocking doors: the second door will not open until the first has closed, and often only one person is allowed in the space at a time, sometimes checked with weight sensors or a guard. Turnstiles serve a similar purpose at larger entrances. Fail-safe locks unlock when power fails, protecting people; fail-secure locks stay locked, protecting assets. Doors on emergency exit routes must be fail-safe or allow free exit.",
   "Closed-circuit television (CCTV) provides detection, deterrence when cameras are visible, and recorded evidence for investigations. Operational points include camera coverage of entrances and sensitive areas, adequate lighting, accurate time stamps synchronized to a reliable time source, retention periods aligned with policy, and protection of recordings from tampering. Cameras are only detective if someone monitors them or reviews footage; alerting from motion analytics helps.",
   "Visitor management ensures non-employees are identified and supervised. Visitors sign a visitor log recording their name, organization, host, purpose, and time in and out; they receive a temporary badge that is visibly different and must be returned; and they are escorted in controlled areas. Logs support investigations and emergency headcounts, and should be reviewed and retained according to policy."
  ],
  "terms": [
   [
    "Access control vestibule",
    "A small space with two interlocking doors that allows only one authorized person through at a time, preventing tailgating; formerly called a mantrap."
   ],
   [
    "Tailgating",
    "Following an authorized person through a secured entrance without their knowledge; piggybacking is the same with their consent."
   ],
   [
    "Fail-safe",
    "A lock that opens when power fails, prioritizing life safety."
   ],
   [
    "Fail-secure",
    "A lock that stays locked when power fails, prioritizing asset protection."
   ],
   [
    "Visitor log",
    "A record of each visitor's identity, host, purpose and entry and exit times."
   ]
  ],
  "example": "A data center finds that staff routinely hold the door for colleagues. It installs an access control vestibule at the server hall entrance, trains staff that each person must badge individually, and configures alerts when the door is held open beyond a set time. Camera footage with synchronized timestamps is kept for the retention period in policy.",
  "tip": "Human life always comes first. If an answer choice makes emergency exits fail-secure or blocks evacuation to protect equipment, it is wrong.",
  "check": [
   [
    "What threat does an access control vestibule mainly address?",
    "Tailgating and piggybacking, by allowing only one person through the interlocking doors at a time."
   ],
   [
    "Why must CCTV timestamps be synchronized?",
    "So footage can be correlated with badge logs and system logs and is credible as evidence."
   ],
   [
    "What should a visitor log record?",
    "The visitor's name, organization, host, purpose, badge issued, and times in and out."
   ]
  ]
 },
 {
  "t": "Authentication factors: know, have, are; MFA vs multi-step",
  "body": [
   "Authentication is proving that you are the identity you claim to be. It comes after identification (claiming an identity, such as typing a username) and before authorization (deciding what that identity may do). The strength of authentication depends largely on which kinds of evidence, called factors, are used.",
   "There are three classic factor types. Something you know is a secret held in memory: a password, a passphrase, a PIN or answers to security questions. Its weakness is that it can be guessed, phished, reused or stolen from a breached database. Something you have is a physical or digital object in your possession: a smart card, a hardware security key, a phone running an authenticator app that generates time-based one-time passwords (TOTP), or a phone receiving a one-time code. Its weakness is loss, theft or interception. Something you are is a biometric trait: fingerprint, face, iris, voice or palm vein pattern. It is hard to share but cannot be changed if compromised, and it is measured with some error. Some sources add context attributes such as somewhere you are (location) or something you do (typing rhythm), which are generally used as supporting signals rather than primary factors.",
   "Multifactor authentication (MFA) requires evidence from two or more different factor types. A password plus a code from an authenticator app is MFA (know plus have). A smart card plus a PIN is MFA (have plus know). The crucial point is that the factors must be different types. A password plus a security question is still single-factor, because both are something you know; an attacker who can phish one can often phish the other.",
   "Multi-step authentication, sometimes called multi-layer or two-step, requires several steps that may or may not use different factor types. Entering a password on one page and then answering a security question on the next is two-step but single-factor. The exam may present such a design and ask whether it is MFA; the answer depends on factor types, not the number of screens.",
   "Not all MFA is equally strong. Codes sent by SMS can be intercepted through SIM swapping and can be phished in real time. Push notifications can be abused through push fatigue, where an attacker repeatedly triggers prompts until the user approves one; number matching reduces this. Hardware security keys and passkeys based on public-key cryptography that bind the login to the real website resist phishing far better, because there is no code for the user to hand over.",
   "In a lab, setting up TOTP on a Linux box or an identity provider shows the mechanics: a shared secret is provisioned via a QR code, and both sides compute the same short code from that secret and the current time, which is why clock accuracy matters."
  ],
  "terms": [
   [
    "Authentication factor",
    "A category of evidence used to prove identity: something you know, have or are."
   ],
   [
    "Multifactor authentication (MFA)",
    "Authentication requiring two or more different factor types."
   ],
   [
    "Multi-step authentication",
    "Authentication in several sequential steps, which is not MFA unless the steps use different factor types."
   ],
   [
    "TOTP",
    "Time-based one-time password: a short code computed from a shared secret and the current time, typically by an authenticator app."
   ],
   [
    "Push fatigue",
    "An attack that floods a user with MFA push prompts hoping they approve one to make them stop."
   ]
  ],
  "example": "A company's VPN asks for a password and then a four-digit PIN. An auditor points out that both are something you know, so this is two-step, not multifactor. The company replaces the PIN with a hardware security key, giving true MFA (know plus have) and resistance to phishing.",
  "tip": "Count factor types, not steps. Two items from the same category, such as password plus PIN, are never MFA.",
  "check": [
   [
    "Is a password plus a security question multifactor authentication?",
    "No. Both are something you know, so it is single-factor, even though it has two steps."
   ],
   [
    "Which factor type is a smart card?",
    "Something you have."
   ],
   [
    "Why are hardware security keys more phishing-resistant than SMS codes?",
    "They use public-key cryptography bound to the real site, so there is no code a user can be tricked into typing into a fake site, and they are not exposed to SIM swapping."
   ]
  ]
 },
 {
  "t": "Biometrics: FAR, FRR, CER",
  "body": [
   "Biometric systems authenticate people by measuring physical or behavioral traits. Physiological biometrics include fingerprints, facial geometry, iris and retina patterns, palm and hand geometry, and vein patterns. Behavioral biometrics include voice, signature dynamics and keystroke dynamics. Because no two measurements of the same person are ever exactly identical, biometric systems must decide how close is close enough, and that decision creates errors the exam expects you to understand.",
   "The process starts with enrollment: the system captures one or more samples, extracts distinctive features and stores them as a template rather than a raw image. At authentication, a new sample is compared to the template and produces a similarity score. If the score is above a threshold, the person is accepted. The threshold is adjustable, and adjusting it trades one kind of error for another.",
   "The false rejection rate (FRR) is how often the system wrongly rejects a legitimate, enrolled user. This is a Type I error. It hurts usability and productivity: people get locked out and call the help desk. The false acceptance rate (FAR) is how often the system wrongly accepts someone who should be rejected, such as an impostor. This is a Type II error. It hurts security, because an unauthorized person gets in. For security purposes, false acceptance is the more dangerous error.",
   "Raising the sensitivity (a stricter threshold) lowers FAR but raises FRR: fewer impostors get in, but more legitimate users are turned away. Lowering sensitivity does the reverse. If you plot both rates against the sensitivity setting, the curves cross at a point called the crossover error rate (CER), also known as the equal error rate (EER). At that setting FAR equals FRR. CER is used to compare different biometric systems: the lower the CER, the more accurate the system overall. The CER does not have to be the operating point; a high-security facility may deliberately run at a stricter setting and accept more false rejections.",
   "Other practical factors matter too. Throughput is how quickly people can be processed. Acceptability is whether users are comfortable with the method; retina scanning is accurate but some find it intrusive. Enrollment time and failure-to-enroll rates vary. Spoofing, using a fake finger or a photo of a face, is countered by liveness detection. Biometric templates are sensitive personal data, often covered by privacy laws, and cannot be reissued like a password if stolen, so they must be protected carefully.",
   "Biometrics are usually best used as one factor in MFA, combined with something you have or know, rather than alone."
  ],
  "terms": [
   [
    "False rejection rate (FRR)",
    "The rate at which a legitimate user is wrongly rejected; a Type I error."
   ],
   [
    "False acceptance rate (FAR)",
    "The rate at which an unauthorized person is wrongly accepted; a Type II error."
   ],
   [
    "Crossover error rate (CER)",
    "The point where FAR equals FRR, used to compare the overall accuracy of biometric systems; lower is better. Also called equal error rate."
   ],
   [
    "Template",
    "The stored mathematical representation of a person's biometric features created at enrollment."
   ],
   [
    "Liveness detection",
    "Checks that a biometric sample comes from a live person present at the sensor rather than a replica or recording."
   ]
  ],
  "example": "A lab compares two fingerprint readers. Reader A has a CER of 2 percent and reader B has a CER of 5 percent, so reader A is more accurate overall. For the server room, the team tunes reader A to a stricter threshold than its CER, accepting that some staff will need a second attempt in exchange for fewer false acceptances.",
  "tip": "Type I = false rejection (FRR), Type II = false acceptance (FAR). FAR is the security-critical error. Lower CER means a better system.",
  "check": [
   [
    "What happens to FAR and FRR when you increase a biometric system's sensitivity?",
    "FAR decreases and FRR increases: fewer impostors are accepted but more legitimate users are rejected."
   ],
   [
    "What does a lower crossover error rate indicate?",
    "A more accurate biometric system overall."
   ],
   [
    "Which biometric error is more serious from a security point of view?",
    "False acceptance (Type II), because it lets an unauthorized person in."
   ]
  ]
 },
 {
  "t": "Single sign-on, Kerberos, device authentication",
  "body": [
   "Single sign-on (SSO) lets a user authenticate once and then access many systems without logging in again to each one. It improves usability, cuts help desk calls about forgotten passwords, and encourages stronger credentials because users only have one to remember. It also centralizes control: disabling one account removes access everywhere. The trade-off is that SSO credentials become a single point of compromise, sometimes called the keys to the kingdom, so they must be protected with MFA, monitoring and a resilient authentication service.",
   "Kerberos is the classic SSO protocol for internal networks and is the default authentication protocol in Microsoft Active Directory domains. It uses symmetric cryptography and a trusted third party called the key distribution center (KDC). The KDC has two logical parts: the authentication service (AS) and the ticket-granting service (TGS). It shares a secret key with every user and service in its realm.",
   "The flow works like this. The user logs in, and the client proves knowledge of the user's key to the AS. The AS returns a ticket-granting ticket (TGT), encrypted so only the KDC can read it, plus a session key. When the user wants a service, such as a file server, the client presents the TGT to the TGS and receives a service ticket for that server. The client then presents the service ticket to the server, which can decrypt it with its own key and trust the user's identity. The user's password is never sent across the network, and the user never re-enters it while the TGT is valid.",
   "Kerberos depends on time. Tickets carry timestamps and lifetimes to prevent replay, so clocks on clients, servers and the KDC must be synchronized, usually through the Network Time Protocol (NTP). If clocks drift beyond the allowed skew (five minutes by default in Active Directory), authentication fails. The KDC is also a single point of failure and a high-value target, so organizations run redundant domain controllers and protect them tightly. Attacks to recognize include stolen or forged tickets and offline password guessing against service tickets; defenses include strong service-account passwords, limited privileges and monitoring of unusual ticket activity.",
   "Device authentication proves the identity of a machine rather than a person. Examples include computer accounts in a domain, digital certificates issued to laptops or servers, IEEE 802.1X network access control where a switch or wireless access point asks a RADIUS server to verify a device or user before granting network access, and hardware-backed keys stored in a Trusted Platform Module (TPM). Checking device identity and health (patched, encrypted, managed) before granting access is a core part of zero trust designs, and it allows policies such as 'only company-managed devices may reach the finance app'."
  ],
  "terms": [
   [
    "Single sign-on (SSO)",
    "Authenticating once to gain access to multiple systems without re-entering credentials."
   ],
   [
    "Key distribution center (KDC)",
    "The trusted Kerberos server, made up of the authentication service and ticket-granting service, that issues tickets."
   ],
   [
    "Ticket-granting ticket (TGT)",
    "A Kerberos ticket issued at login that the client uses to request service tickets without re-entering the password."
   ],
   [
    "802.1X",
    "An IEEE standard for port-based network access control that authenticates devices or users, usually via RADIUS, before allowing network access."
   ],
   [
    "Trusted Platform Module (TPM)",
    "A hardware chip that securely stores keys and measurements, used for device identity and integrity."
   ]
  ],
  "example": "Users in a branch office suddenly cannot access file shares, though their passwords are correct. The administrator finds that the branch's domain controller lost its time source and its clock drifted beyond the allowed Kerberos skew. After restoring NTP synchronization, ticket requests succeed again.",
  "tip": "Kerberos questions often hinge on time synchronization and the KDC as a single point of failure. If authentication fails with correct passwords, think clock skew.",
  "check": [
   [
    "Why does Kerberos require synchronized clocks?",
    "Tickets contain timestamps and lifetimes used to prevent replay; excessive clock skew causes tickets to be rejected."
   ],
   [
    "What is the main security drawback of SSO?",
    "One compromised credential can give access to every connected system, so the SSO account and service must be strongly protected."
   ],
   [
    "What does 802.1X provide?",
    "Port-based network access control that authenticates a device or user, typically through a RADIUS server, before granting network access."
   ]
  ]
 },
 {
  "t": "Federation and trust: SAML, OAuth 2.0, OpenID Connect, one-way/two-way and transitive trusts",
  "body": [
   "Single sign-on inside one organization is useful, but people also need to use partner portals, cloud applications and customer sites run by other organizations. Federation extends SSO across organizational boundaries. Instead of each application keeping its own password database, an identity provider (IdP) authenticates the user and vouches for them to relying parties, also called service providers (SP). The relying party trusts the IdP's assertion because the two have agreed to a trust relationship in advance, usually backed by exchanged certificates or keys.",
   "Security Assertion Markup Language (SAML) is a mature, XML-based federation standard widely used for enterprise web SSO. A common flow: the user visits a cloud application (the SP), which redirects the browser to the organization's IdP. The user authenticates at the IdP, which returns a digitally signed SAML assertion stating who the user is and, optionally, attributes such as department or role. The browser posts the assertion to the SP, which checks the signature and logs the user in. The signature is what lets the SP trust the assertion.",
   "OAuth 2.0 is an authorization framework, not an authentication protocol. It lets a user grant an application limited access to resources held by another service without sharing their password. For example, a scheduling app can be allowed to read your calendar. The authorization server issues an access token with a limited scope and lifetime, and the app presents the token to the resource server. OAuth answers the question 'what may this app do on the user's behalf', not 'who is this user'.",
   "OpenID Connect (OIDC) adds an authentication layer on top of OAuth 2.0. Besides the access token, the OpenID provider issues an ID token, a signed JSON Web Token (JWT) containing claims about the user, such as a unique subject identifier, the issuer, the audience and the time of authentication. OIDC is common for consumer 'sign in with' buttons and modern web and mobile apps because it uses lightweight JSON and works well with APIs. A quick way to remember: SAML and OIDC do authentication for SSO; OAuth alone does delegated authorization.",
   "Trust relationships also describe how domains or realms accept each other's identities. In a one-way trust, domain A trusts domain B, so users from B can be granted access to resources in A, but not the reverse. The direction of trust is opposite to the direction of access. In a two-way trust, each trusts the other. A transitive trust extends through chains: if A trusts B and B trusts C, then A trusts C. A non-transitive trust stops at the two parties that established it. Transitive trusts are convenient but can grant access more widely than intended, so the exam often favors non-transitive trusts where partners should not inherit each other's relationships.",
   "Federation shifts risk to the IdP: if it is compromised or misconfigured, every relying party is exposed. Protect signing keys, validate token signatures, audiences and expiry, and keep token lifetimes short."
  ],
  "terms": [
   [
    "Identity provider (IdP)",
    "The system that authenticates users and issues assertions or tokens about them to relying parties."
   ],
   [
    "SAML",
    "Security Assertion Markup Language, an XML-based standard for exchanging signed authentication and attribute assertions between an IdP and a service provider."
   ],
   [
    "OAuth 2.0",
    "An authorization framework that issues scoped access tokens so an application can act on a user's behalf without their password."
   ],
   [
    "OpenID Connect (OIDC)",
    "An identity layer on OAuth 2.0 that adds a signed ID token so applications can authenticate users."
   ],
   [
    "Transitive trust",
    "A trust that extends through a chain, so if A trusts B and B trusts C, A also trusts C."
   ]
  ],
  "example": "A company lets employees use a cloud HR system through SAML federation. When an employee is terminated, disabling the account at the company IdP immediately stops new logins to the HR system, because the HR system never held a password of its own. Separately, a mobile expense app uses OAuth 2.0 to read receipts from a storage service with a read-only scope.",
  "tip": "OAuth 2.0 is authorization (delegated access), not authentication. If the question needs to know who the user is, the answer is SAML or OpenID Connect.",
  "check": [
   [
    "What does OpenID Connect add to OAuth 2.0?",
    "An authentication layer, chiefly the ID token, a signed JWT with claims about the user."
   ],
   [
    "Domain A has a one-way trust of domain B. Whose users can access whose resources?",
    "Users in B can be granted access to resources in A; the trusting domain A holds the resources."
   ],
   [
    "Why can transitive trusts be risky?",
    "They can extend access through chains of trust to parties that were never directly approved."
   ]
  ]
 },
 {
  "t": "Internetwork trust: extranets, third-party connections, zero trust",
  "body": [
   "Organizations rarely work alone. Suppliers, customers, managed service providers, cloud vendors and partners all need some connection into your systems. Each connection extends your attack surface, and many serious breaches have started at a trusted third party. This topic covers how to connect with outside parties safely and the shift from trusting networks to verifying every request.",
   "An intranet is a private network for internal users. An extranet extends part of that network, or specific applications, to authorized outside parties such as suppliers or distributors. Extranets are typically placed in segmented zones, often a demilitarized zone or dedicated partner network, protected by firewalls, strong authentication and tightly scoped access, so partners can reach only the systems they need. An extranet user should never land on the flat internal network.",
   "Third-party connections take many forms: site-to-site virtual private networks (VPNs) between offices of two companies, dedicated circuits, remote support tools for vendors, application programming interface (API) integrations, and cloud services. Before connecting, perform due diligence on the partner's security: questionnaires, audit reports, and security requirements. Put the terms in writing. An interconnection security agreement (ISA) documents the technical requirements for the connection, such as encryption, authentication, allowed traffic and monitoring, and is often paired with a memorandum of understanding (MOU) or memorandum of agreement (MOA) describing each party's responsibilities. Service level agreements (SLAs) set performance expectations, and contracts should require breach notification and give you a right to audit.",
   "Operational controls for third parties include unique named accounts for each vendor person (never shared accounts), MFA, access limited to specific systems and time windows, session recording for privileged vendor access, logging reviewed by your team, and prompt removal of access when a contract ends. Review third-party connections periodically, just as you review internal access.",
   "Traditional network security assumed that anything inside the perimeter was trustworthy. That assumption fails once an attacker gets a foothold inside, and it fits poorly with cloud services, remote work and partners. Zero trust replaces it with 'never trust, always verify'. Every access request is authenticated and authorized explicitly based on identity, device health and context, regardless of network location. Access is least privilege and often granted per session. The environment is micro-segmented so that compromise of one system does not expose others, and activity is continuously monitored on the assumption that a breach may already have happened.",
   "Zero trust architecture, as described in NIST guidance, separates a control plane, where a policy engine and policy administrator decide on access, from a data plane, where a policy enforcement point allows or blocks the connection. You do not buy zero trust as a single product; it is a strategy built from identity, device management, segmentation and monitoring."
  ],
  "terms": [
   [
    "Extranet",
    "A controlled extension of an organization's network or applications to authorized external parties such as partners and suppliers."
   ],
   [
    "Interconnection security agreement (ISA)",
    "A document specifying the technical and security requirements for a connection between two organizations' systems."
   ],
   [
    "Zero trust",
    "A security model that grants no implicit trust based on network location and verifies every access request using identity, device and context."
   ],
   [
    "Policy enforcement point (PEP)",
    "The component in a zero trust architecture that allows, monitors or terminates connections based on policy decisions."
   ],
   [
    "Micro-segmentation",
    "Dividing a network into small isolated zones so access between workloads is tightly controlled."
   ]
  ],
  "example": "A heating and ventilation contractor needs to monitor a retailer's building systems. Instead of a VPN into the corporate network, the retailer places the building controllers on an isolated segment, gives the contractor named accounts with MFA through a remote access gateway that only reaches that segment, records sessions, and disables the accounts automatically when the contract ends.",
  "tip": "Zero trust means location grants no trust: being on the internal network is not a reason to allow access. Look for answers that verify identity and device for every request and apply least privilege.",
  "check": [
   [
    "What is an interconnection security agreement for?",
    "It documents the technical and security requirements, such as encryption, authentication and permitted traffic, for connecting two organizations' systems."
   ],
   [
    "What core assumption does zero trust reject?",
    "That users or devices inside the network perimeter can be trusted by default."
   ],
   [
    "Name two controls for vendor remote access.",
    "Unique named accounts with MFA, access restricted to specific systems and times, session recording, and prompt removal when the contract ends (any two)."
   ]
  ]
 },
 {
  "t": "Identity lifecycle: provisioning, proofing, maintenance, entitlement, deprovisioning",
  "body": [
   "Every account has a life: it is created, used, changed and eventually removed. Identity and access management (IAM) is largely about controlling that lifecycle so that people have the right access at the right time, and no access when they no longer need it. Mistakes at any stage, especially at the end, are a common cause of breaches and audit findings.",
   "Identity proofing comes first. Before an identity is created, the organization confirms that the person is who they claim to be. For employees this may mean checking government identification and employment paperwork with human resources; for customers it may mean verifying documents or information against trusted sources. The stronger the access being granted, the stronger the proofing should be. Guidance such as NIST SP 800-63 describes identity assurance levels for this purpose. Weak proofing lets an attacker establish a legitimate-looking account under a false identity.",
   "Provisioning (also called registration or enrollment when it covers credentials) creates the account and grants initial access. Good practice ties provisioning to an authoritative source, usually the HR system, so accounts are created when a hire is recorded and based on the person's role. Access should be requested, approved by the appropriate owner or manager, and recorded. Credentials are issued securely, and users are required to set their own password or enroll MFA at first login.",
   "Entitlement is the set of permissions, group memberships and application roles an identity holds. Entitlements should follow least privilege and are best assigned through roles or groups rather than individually, which makes them easier to review. Keeping an accurate record of who is entitled to what, and who approved it, is essential for audits.",
   "Maintenance covers everything during the account's life: password resets with proper verification, MFA device changes, attribute updates, and above all role changes. When someone moves departments, the new access should be granted and the old access removed. Failing to remove old rights on transfer leads to privilege creep, where long-serving employees accumulate far more access than any single role needs. This moment is often called 'mover' in the joiner, mover, leaver model.",
   "Deprovisioning removes access when it is no longer needed: termination, contract end, or long inactivity. It should be prompt, ideally automated from the HR event, and complete, covering the directory account, cloud and SaaS accounts, VPN, badges, tokens, and any shared secrets the person knew. For hostile terminations, access is disabled before or during the notification meeting. Accounts are commonly disabled first and deleted later, preserving audit history and data ownership. Periodically search for orphaned accounts, those with no active owner, since they are attractive targets."
  ],
  "terms": [
   [
    "Identity proofing",
    "Verifying that a person is who they claim to be before creating or binding an identity."
   ],
   [
    "Provisioning",
    "Creating accounts and granting initial access based on an approved request or authoritative source."
   ],
   [
    "Entitlement",
    "A specific permission, role or group membership assigned to an identity."
   ],
   [
    "Deprovisioning",
    "Disabling and removing an identity's access when it is no longer required."
   ],
   [
    "Orphaned account",
    "An account that no longer has a valid, active owner, such as one left behind after someone departs."
   ]
  ],
  "example": "A company links its HR system to its identity platform. When HR records a termination, the employee's directory account is disabled within minutes, which in turn cuts access to federated cloud apps, and a ticket is opened to collect the badge and laptop. A monthly report then flags any local or SaaS accounts not tied to an active HR record.",
  "tip": "Deprovisioning is where the exam finds most failures. The best answer is usually timely, automated removal triggered by HR, with accounts disabled first and deleted later.",
  "check": [
   [
    "What is the purpose of identity proofing?",
    "To confirm a person's real-world identity before creating an account or issuing credentials."
   ],
   [
    "What problem results from not removing old access when employees change roles?",
    "Privilege creep, where users accumulate excessive entitlements over time."
   ],
   [
    "Why disable an account before deleting it?",
    "It immediately blocks access while preserving audit trails and data ownership for investigation or handover."
   ]
  ]
 },
 {
  "t": "Access reviews, recertification and privilege creep",
  "body": [
   "Even with a good provisioning process, access drifts over time. People change projects, managers approve temporary exceptions that are never removed, applications create local accounts, and groups gain members nobody remembers adding. Access reviews are the detective control that catches this drift and returns entitlements to least privilege.",
   "Privilege creep, sometimes called access creep or entitlement creep, is the gradual accumulation of access rights beyond what a person's current job requires. It usually happens because new access is added when someone takes on new duties, but old access is not removed. A long-serving employee who has worked in finance, then procurement, then IT may hold rights from all three roles. Privilege creep undermines separation of duties and least privilege, and it increases the damage if that account is compromised or the employee acts maliciously.",
   "An access review, also called an entitlement review or user access review, is a periodic check of who has access to what and whether it is still appropriate. Recertification, or attestation, is the formal step in which a responsible person, usually the user's manager or the resource's data owner, confirms each entitlement is still needed or marks it for removal. The reviewer signs off, creating evidence for auditors. Reviews should cover privileged accounts more often than ordinary ones, for example quarterly for administrators and at least annually for standard users, depending on policy and regulation.",
   "An effective review follows a few steps. Extract a current, accurate list of accounts and entitlements from the systems themselves, not from a spreadsheet of what was supposedly granted. Present it to reviewers in a form they can understand, with role names and descriptions rather than cryptic group codes. Have reviewers approve or revoke each item within a deadline. Then actually remove the revoked access, and verify the removal. Track exceptions and escalate reviewers who do not respond.",
   "Watch for rubber-stamping, where managers approve everything to finish quickly. Countermeasures include highlighting risky or unusual entitlements, showing last-used dates so unused access stands out, and sampling decisions for quality. Also look for special cases: orphaned accounts, shared or generic accounts, service accounts, dormant accounts that have not logged in for a long time, and users whose entitlements conflict under separation-of-duties rules.",
   "Role-based access control makes reviews easier, because reviewers confirm role membership rather than hundreds of individual permissions. Identity governance tools can automate campaigns, reminders and removal, but the principle is the same in a spreadsheet: compare actual access with needed access, and fix the difference."
  ],
  "terms": [
   [
    "Privilege creep",
    "The gradual accumulation of access rights beyond what a user's current role requires, usually from unrevoked old access."
   ],
   [
    "Access review",
    "A periodic examination of accounts and entitlements to confirm they are still appropriate."
   ],
   [
    "Recertification",
    "The formal attestation by a manager or data owner that a user's access is still required."
   ],
   [
    "Dormant account",
    "An account that has not been used for an extended period and may no longer be needed."
   ]
  ],
  "example": "During a quarterly review, a finance manager sees that an analyst who moved from payables to reporting still has rights to create and approve vendor payments. Combined with her new reporting access, this breaks separation of duties. The manager revokes the payment rights, and the team adds a rule to remove old entitlements automatically on internal transfers.",
  "tip": "Access reviews are detective controls for privilege creep; the fix happens only when revoked access is actually removed and verified. The reviewer should be someone who knows the business need, usually the manager or data owner.",
  "check": [
   [
    "What typically causes privilege creep?",
    "Granting new access when a user's duties change without removing access from their previous role."
   ],
   [
    "Who should normally recertify a user's access?",
    "The user's manager or the data or resource owner who understands the business need."
   ],
   [
    "What is rubber-stamping in access reviews and one way to reduce it?",
    "Approving all access without real evaluation; reduce it by highlighting risky or unused entitlements, showing last-used dates, or sampling decisions."
   ]
  ]
 },
 {
  "t": "Privileged access management, service accounts",
  "body": [
   "Privileged accounts can change configurations, read any data, create other accounts and disable security controls. They include domain and local administrator accounts, root on Unix and Linux systems, database administrator accounts, cloud console owner accounts and network device admin logins. Because attackers who gain privileged access can do almost anything, these accounts deserve the strongest protections, and privileged access management (PAM) is the discipline and toolset that provides them.",
   "Core PAM practices start with separation. Administrators should use a standard account for email and browsing and a separate privileged account only for administrative work, so a phishing email opened in daily use does not run with admin rights. Privileged access should be granted on a least-privilege basis: a network engineer does not need database admin rights. Where possible, use just-in-time (JIT) access, where elevated rights are granted for a limited time after approval and then removed automatically, instead of standing privileges that exist all the time.",
   "PAM platforms commonly provide a password vault that stores privileged credentials, rotates them automatically, and checks them out to approved users, so admins may never know the actual password. They broker sessions through a jump server or bastion host, recording keystrokes or video for audit, and they alert on unusual activity. Privileged activity should always require MFA and be logged to a system the administrators themselves cannot alter. Built-in accounts such as the default administrator or root should be protected, renamed or disabled where appropriate, and emergency 'break-glass' accounts should be kept sealed, monitored and tested, with any use triggering review.",
   "Service accounts are non-human accounts used by applications, scheduled tasks and services to authenticate to other systems, for example a backup application that logs into servers or a web application that connects to a database. They are risky because they often have broad rights, passwords that never change, no MFA, and no clear owner. Attackers target them because compromising one gives quiet, persistent access.",
   "Good service account management includes: assigning a named human owner; documenting purpose and dependencies; granting only the permissions the service needs; denying interactive logon so the account cannot be used to sign in at a desktop; using long, random passwords or keys stored in a vault and rotated; preferring platform features that manage credentials automatically, such as managed service accounts in Active Directory or cloud workload identities, instead of static secrets embedded in code or configuration files; and monitoring for use outside expected hosts or times.",
   "Service accounts must be included in access reviews and removed when the application is retired. Hard-coded credentials found in scripts or source code should be treated as exposed and rotated."
  ],
  "terms": [
   [
    "Privileged access management (PAM)",
    "Policies and tools that control, monitor and audit the use of elevated accounts."
   ],
   [
    "Just-in-time access",
    "Granting elevated privileges only when needed, for a limited time, and removing them automatically."
   ],
   [
    "Password vault",
    "A secure repository that stores, rotates and checks out privileged credentials."
   ],
   [
    "Service account",
    "A non-human account used by an application or service to authenticate to other systems."
   ],
   [
    "Break-glass account",
    "A tightly controlled emergency account used only when normal administrative access is unavailable."
   ]
  ],
  "example": "An audit finds a service account used by a reporting tool that is a domain administrator, has a password unchanged for years and is stored in a configuration file. The team reduces its rights to read-only access on two databases, denies interactive logon, moves the credential into a vault with automatic rotation, and assigns an owner who reviews it quarterly.",
  "tip": "Administrators should never do daily work such as email with their privileged account. Look for answers that separate standard and admin accounts, require MFA and use time-limited elevation.",
  "check": [
   [
    "Why should administrators have separate standard and privileged accounts?",
    "So that everyday activities like email and browsing, which carry phishing and malware risk, do not run with elevated rights."
   ],
   [
    "What makes service accounts attractive to attackers?",
    "They often have broad privileges, non-expiring passwords, no MFA and little monitoring."
   ],
   [
    "What is just-in-time access?",
    "Granting elevated privileges only when needed for a limited time, then removing them automatically."
   ]
  ]
 },
 {
  "t": "Access control models: DAC, MAC, RBAC, rule-based, ABAC",
  "body": [
   "An access control model is the logic a system uses to decide whether a subject (a user or process) may perform an action on an object (a file, record or system). The exam expects you to identify each model from a description and to know when each fits.",
   "Discretionary access control (DAC) lets the owner of an object decide who can access it. When you create a file on a typical Windows or Linux system, you own it and can grant others read or write permission through access control lists or `chmod`. DAC is flexible and familiar, but it depends on users making good decisions, and malware running as the user inherits the user's discretion. Most commercial operating systems use DAC by default.",
   "Mandatory access control (MAC) is enforced by the system based on labels, not by owners. Objects carry a classification label, such as confidential or secret, and subjects carry a clearance. The system compares them, often together with compartments that implement need to know, and users cannot change the labels or share access at their discretion. MAC is associated with military and government environments and high-security systems. Security-enhanced Linux (SELinux) is a practical example of mandatory controls on Linux, where a policy constrains even processes running as root. MAC is strong and consistent but rigid and harder to administer.",
   "Role-based access control (RBAC) grants permissions to roles, such as nurse, payroll clerk or help desk technician, and assigns users to roles. When someone changes jobs, you change their role rather than dozens of individual permissions. RBAC fits organizations with well-defined job functions and simplifies access reviews. It supports separation of duties by preventing one user from holding conflicting roles.",
   "Rule-based access control applies global rules set by an administrator that apply to all subjects equally, regardless of identity. Firewall rules and router access control lists are the classic example: traffic from a given address to a given port is allowed or denied for everyone. A rule such as 'no logins between midnight and 5 a.m.' is also rule-based. Because both begin with R, the exam may abbreviate either as RBAC, so read the context: roles tied to job functions versus rules applied uniformly.",
   "Attribute-based access control (ABAC) makes decisions by evaluating attributes of the subject (department, clearance, employment type), the object (classification, owner), the action (read, write) and the environment (time, location, device health) against policies. For example: 'contractors may read project documents only from managed devices during business hours'. ABAC is the most granular and flexible model and suits cloud and zero trust environments, but its policies can be complex to design and test.",
   "A quick identification guide: owner decides is DAC; labels and clearances is MAC; job function is role-based; uniform administrator rules is rule-based; combinations of attributes and context is ABAC."
  ],
  "terms": [
   [
    "Discretionary access control (DAC)",
    "A model in which the object owner decides who can access the object."
   ],
   [
    "Mandatory access control (MAC)",
    "A model where the system enforces access by comparing subject clearances with object labels; users cannot override it."
   ],
   [
    "Role-based access control (RBAC)",
    "A model that assigns permissions to roles tied to job functions and places users in roles."
   ],
   [
    "Rule-based access control",
    "A model that applies administrator-defined rules uniformly to all subjects, such as firewall rules."
   ],
   [
    "Attribute-based access control (ABAC)",
    "A model that evaluates policies over subject, object, action and environmental attributes."
   ]
  ],
  "example": "A hospital lets nurses view records of patients on their ward during their shift from hospital workstations. Because the decision combines the user's role, the patient's ward assignment, the time and the device, it is attribute-based. The hospital's firewall, which blocks inbound traffic to the records database from the guest Wi-Fi for everyone, is rule-based.",
  "tip": "Labels and clearances point to MAC; owner discretion points to DAC; context such as time, location and device combined with user attributes points to ABAC. Firewall ACLs are rule-based, not role-based.",
  "check": [
   [
    "A user shares a file they created with a colleague by editing its permissions. Which model is this?",
    "Discretionary access control, because the owner decides access."
   ],
   [
    "Which model is most associated with classification labels and clearances?",
    "Mandatory access control."
   ],
   [
    "Why does RBAC simplify access management when employees change jobs?",
    "You change the user's role assignment instead of editing many individual permissions."
   ]
  ]
 },
 {
  "t": "Physical vs logical access controls",
  "body": [
   "Access control is about ensuring only authorized subjects reach protected resources. That applies to both the physical world, rooms, buildings and equipment, and the logical world, networks, systems and data. The SSCP exam expects you to tell the two apart, to see how they depend on each other, and to recognize when a scenario needs one or the other.",
   "Physical access controls restrict who can enter spaces or touch hardware. Examples include fences, gates, locks, badge readers, access control vestibules, guards, locked server racks, cable locks on laptops and locked wiring closets. Their supporting detective controls include cameras, intrusion alarms, door-held-open alerts and visitor logs. Physical controls protect against theft, tampering, direct console access and devices plugged into the network.",
   "Logical access controls, also called technical access controls, restrict access to digital resources. They include user accounts and passwords, MFA, access control lists on files and shares, firewall rules, database permissions, encryption, network access control such as 802.1X, and session timeouts. They are enforced by software and hardware and are what most of the access control domain focuses on.",
   "The two layers depend on each other. Physical access often defeats logical controls: someone with hands on a server can boot from removable media, remove drives, reset devices to factory defaults, or install a hardware keylogger. That is why full-disk encryption, BIOS or UEFI passwords, disabled unused network ports and locked racks matter even inside a secure building. Equally, logical controls protect physical systems: badge systems and building management systems are networked computers that need patching, strong admin passwords and network segmentation. A breach of the badge server can unlock every door.",
   "Both kinds of access follow the same principles: identification, authentication, authorization and accountability. A badge identifies you, a PIN at the reader authenticates you, the access system decides whether this door is authorized for you at this time, and the log provides accountability. The identity lifecycle should drive both: when an employee leaves, disabling the directory account and the badge should happen together, ideally from the same HR trigger. Many organizations integrate physical and logical systems so that, for example, a user cannot log in to a workstation if their badge shows they never entered the building.",
   "When choosing controls, match the threat. Preventing an outsider from reaching the server room is a physical problem; preventing an authorized employee from reading payroll files is a logical one. The best designs combine them in depth."
  ],
  "terms": [
   [
    "Physical access control",
    "A control that restricts entry to facilities, rooms or equipment, such as locks, badges and guards."
   ],
   [
    "Logical access control",
    "A control enforced by hardware or software that restricts access to systems and data, such as passwords, ACLs and firewalls."
   ],
   [
    "Accountability",
    "The ability to trace actions to a specific identity, typically through logging."
   ],
   [
    "Physical-logical integration",
    "Linking badge and building systems with IT identity systems so access is granted and revoked together."
   ]
  ],
  "example": "A contractor with a valid visitor badge is left alone in a meeting room and plugs a small device into an active network jack. Physical controls allowed him into the building, but the jack should have been disabled or protected by 802.1X network access control, which would have refused the unknown device. The company disables unused ports and enables port authentication.",
  "tip": "Physical access usually defeats logical protection, so answers that combine encryption and port controls with locked spaces tend to be best. Remember that badge systems are also IT systems needing logical security.",
  "check": [
   [
    "Give two examples each of physical and logical access controls.",
    "Physical: badge readers, locked server racks, guards, fences. Logical: passwords with MFA, file ACLs, firewall rules, 802.1X."
   ],
   [
    "Why is full-disk encryption valuable even in a secured building?",
    "If someone gains physical access and removes a drive or device, the data remains unreadable."
   ],
   [
    "How should physical and logical access be coordinated when an employee leaves?",
    "Both the directory account and the badge should be disabled together, ideally triggered from the same HR event."
   ]
  ]
 },
 {
  "t": "Risk terms: asset, threat, vulnerability, likelihood, impact",
  "body": [
   "Risk management runs through the whole SSCP, and it depends on a shared vocabulary. Many exam questions are really vocabulary questions in disguise: they describe a situation and ask whether it is a threat, a vulnerability or a risk. Get these definitions firmly in place.",
   "An asset is anything of value to the organization that needs protection: data, systems, applications, hardware, people, facilities, reputation and intellectual property. Assets are identified and valued first, because risk is always risk to something. Value can be measured in money (replacement cost, lost revenue) or in qualitative terms (critical, important, minor).",
   "A threat is any potential cause of an unwanted event that could harm an asset. Threats can be natural (floods, earthquakes), environmental (power failure, fire), accidental (an administrator deleting the wrong database) or deliberate (criminals, hacktivists, malicious insiders, nation-state groups). The person or thing that carries out a threat is the threat agent or threat actor, and the path or method used is the threat vector, such as phishing email or an exposed remote desktop port.",
   "A vulnerability is a weakness that a threat could exploit. It can be technical (an unpatched server, a default password, a misconfigured storage bucket), procedural (no process to remove leavers' access), physical (an unlocked side door) or human (untrained staff). A threat without a vulnerability to exploit, or a vulnerability no threat can reach, poses little risk. An exploit is the specific technique or code that takes advantage of a vulnerability.",
   "Likelihood, or probability, is how likely it is that a threat will exploit a vulnerability within a given period. It depends on the threat's capability and motivation, how exposed the vulnerability is, and the controls already in place. Impact, or consequence, is the harm that would result: financial loss, downtime, legal penalties, safety effects, and reputational damage. Risk combines the two; conceptually, risk is a function of likelihood and impact, often written risk = likelihood x impact, or as threat x vulnerability x asset value.",
   "Two more terms appear constantly. Exposure is being subject to possible loss because a vulnerability is reachable by a threat. A control, safeguard or countermeasure is anything that reduces risk, by lowering likelihood, lowering impact or both. Patching lowers likelihood; backups lower impact. Finally, remember that risk can never be reduced to zero. The goal is to bring it within the organization's risk appetite, the amount of risk leadership is willing to accept in pursuit of its goals.",
   "Practice by labeling: 'ransomware gang' is a threat actor; 'server missing a patch' is a vulnerability; 'customer database' is an asset; 'the chance the gang encrypts the database this year and the resulting cost' is risk."
  ],
  "terms": [
   [
    "Asset",
    "Anything of value to the organization that requires protection, such as data, systems, people or reputation."
   ],
   [
    "Threat",
    "A potential cause of an unwanted incident that could harm an asset, carried out by a threat agent."
   ],
   [
    "Vulnerability",
    "A weakness in a system, process, facility or person that a threat could exploit."
   ],
   [
    "Likelihood",
    "The probability that a given threat will exploit a given vulnerability within a period."
   ],
   [
    "Impact",
    "The magnitude of harm that would result if a threat exploited a vulnerability."
   ],
   [
    "Risk appetite",
    "The amount and type of risk an organization is willing to accept in pursuit of its objectives."
   ]
  ],
  "example": "A clinic's scheduling server (asset) runs remote desktop exposed to the internet with a weak password (vulnerability). Criminal groups scanning for such services (threat) are common, so likelihood is high, and the impact of losing scheduling for days is severe. Putting the service behind a VPN with MFA lowers the likelihood and therefore the risk.",
  "tip": "A vulnerability is a weakness you have; a threat is what could exploit it. Risk exists only where they meet, and controls reduce risk by lowering likelihood, impact or both.",
  "check": [
   [
    "An unpatched web server is an example of what?",
    "A vulnerability."
   ],
   [
    "How do backups reduce risk?",
    "They reduce the impact of an incident such as data loss or ransomware, rather than its likelihood."
   ],
   [
    "What two elements are combined to express risk?",
    "Likelihood (probability) and impact (consequence)."
   ]
  ]
 },
 {
  "t": "Qualitative vs quantitative analysis: SLE, ARO, ALE",
  "body": [
   "Once risks are identified, you need to analyze them so they can be ranked and treated. There are two main approaches, and most organizations use a blend of both.",
   "Qualitative analysis uses descriptive or ordinal ratings instead of money. Likelihood and impact are each rated on a scale such as low, medium and high, or 1 to 5, often by gathering the judgment of experienced people through interviews, workshops or the Delphi technique (anonymous rounds of expert opinion to avoid groupthink). The ratings are plotted on a risk matrix or heat map, which shows at a glance which risks are most severe. Qualitative analysis is fast, works when data is scarce and handles hard-to-price harms like reputation. Its weakness is subjectivity: different people rate the same risk differently, and it does not directly tell you whether a control is worth its cost.",
   "Quantitative analysis assigns monetary values and numeric probabilities to produce figures that can be compared with the cost of controls. The core formulas are simple and heavily tested. Asset value (AV) is what the asset is worth. Exposure factor (EF) is the percentage of the asset's value lost in a single occurrence of a threat, expressed as a fraction between 0 and 1. The single loss expectancy (SLE) is the expected loss from one occurrence: SLE = AV x EF. The annualized rate of occurrence (ARO) is how many times per year the event is expected to occur; once every ten years is 0.1, twice a year is 2. The annualized loss expectancy (ALE) is the expected loss per year: ALE = SLE x ARO.",
   "Work an example. A warehouse is worth 2,000,000. A flood would destroy 25 percent of it, so EF is 0.25 and SLE is 500,000. A flood is expected once every 20 years, so ARO is 0.05. ALE is 500,000 x 0.05 = 25,000 per year.",
   "The ALE lets you judge whether a safeguard is cost-justified. The value of a safeguard is ALE before the control, minus ALE after the control, minus the annual cost of the control. If flood barriers reduce the ALE from 25,000 to 5,000 and cost 8,000 a year to own and maintain, their value is 25,000 minus 5,000 minus 8,000, which is 12,000 a year, so they are worth buying. If they cost 30,000 a year, they would not be, and another treatment might make more sense. Remember to include the total cost of the control: purchase, installation, maintenance, staff time and any productivity loss.",
   "Quantitative analysis looks objective but depends on the quality of its inputs; guesses expressed as numbers are still guesses. It also takes more time and data. In practice, teams often screen all risks qualitatively and then quantify the few biggest ones to support investment decisions."
  ],
  "terms": [
   [
    "Single loss expectancy (SLE)",
    "Expected monetary loss from one occurrence of a risk event: asset value times exposure factor."
   ],
   [
    "Exposure factor (EF)",
    "The fraction of an asset's value lost in one occurrence of the event."
   ],
   [
    "Annualized rate of occurrence (ARO)",
    "The expected number of times the event occurs per year."
   ],
   [
    "Annualized loss expectancy (ALE)",
    "Expected yearly loss from a risk: SLE times ARO."
   ],
   [
    "Delphi technique",
    "A qualitative method that gathers anonymous expert opinions over several rounds to reach consensus."
   ]
  ],
  "example": "A laptop worth 1,500 including data recovery costs is fully lost when stolen (EF 1.0), so SLE is 1,500. The company expects 12 thefts a year, so ALE is 18,000. A tracking and full-disk encryption package costing 6,000 a year that cuts thefts' impact enough to lower ALE to 4,000 has a safeguard value of 18,000 minus 4,000 minus 6,000, or 8,000 a year.",
  "tip": "Memorize SLE = AV x EF and ALE = SLE x ARO, and convert frequencies carefully: once every 4 years means ARO 0.25. A control is justified when ALE reduction exceeds its annual cost.",
  "check": [
   [
    "A server worth 40,000 would lose 50 percent of its value in an incident that happens once every two years. What is the ALE?",
    "SLE = 40,000 x 0.5 = 20,000; ARO = 0.5; ALE = 20,000 x 0.5 = 10,000 per year."
   ],
   [
    "What is the main weakness of qualitative analysis?",
    "It is subjective and does not directly show whether a control's cost is justified."
   ],
   [
    "How do you calculate the annual value of a safeguard?",
    "ALE before the safeguard minus ALE after it, minus the annual cost of the safeguard."
   ]
  ]
 },
 {
  "t": "Risk treatment: avoid, mitigate, transfer, accept; residual risk and risk registers",
  "body": [
   "After analyzing a risk, the organization decides how to respond. This is risk treatment, sometimes called risk response. There are four classic options, and the exam will describe an action and ask which option it represents.",
   "Avoidance means eliminating the risk by not doing, or no longer doing, the activity that creates it. A company that decides not to store customer card numbers at all, or that retires an obsolete internet-facing application instead of securing it, is avoiding the risk. Avoidance is powerful but may also give up the benefit the activity would have brought.",
   "Mitigation, also called reduction, means applying controls that lower the likelihood or impact to an acceptable level. Patching, MFA, segmentation, encryption, backups and training are all mitigation. This is the most common treatment and the one where most security work happens.",
   "Transfer, also called sharing, moves some of the financial consequence to another party, most commonly through insurance or contracts. Cyber insurance pays some costs of a breach; an outsourcing contract may make a provider liable for certain failures. Transfer does not move accountability. If a cloud provider loses your customers' data, your customers and regulators still hold you responsible, and reputational damage stays with you.",
   "Acceptance means knowingly deciding to live with the risk, usually because it falls within risk appetite or because the cost of treating it outweighs the benefit. Acceptance must be a deliberate, documented decision by someone with the authority to accept that level of risk, typically the risk or asset owner or senior management, and it should be reviewed periodically. Simply ignoring a risk is not acceptance; it is sometimes called risk rejection or denial and is never correct on the exam.",
   "Residual risk is the risk that remains after treatment. Controls are never perfect, so there is always some. The relationship is often summarized as total risk minus controls equals residual risk. Management must formally accept the residual risk. If it is still above appetite, further treatment is needed. Inherent risk is the level before any controls are applied.",
   "A risk register records all this in one place. For each risk it typically lists a description, the affected asset, the risk owner, the likelihood and impact ratings, the inherent risk score, the chosen treatment and the controls, the residual risk, target dates, and status. The register makes risks visible to management, assigns accountability, tracks treatment progress and provides evidence for auditors. It is a living document: risks are added as they are discovered and ratings updated as conditions change. Many organizations roll individual registers up into an enterprise view."
  ],
  "terms": [
   [
    "Risk avoidance",
    "Eliminating a risk by not performing, or ceasing, the activity that creates it."
   ],
   [
    "Risk mitigation",
    "Reducing a risk's likelihood or impact through controls."
   ],
   [
    "Risk transfer",
    "Shifting financial consequences of a risk to another party, such as an insurer, while accountability stays with the organization."
   ],
   [
    "Risk acceptance",
    "A documented decision by an authorized person to tolerate a risk without further treatment."
   ],
   [
    "Residual risk",
    "The risk remaining after controls have been applied."
   ],
   [
    "Risk register",
    "A record of identified risks with their owners, ratings, treatments, residual risk and status."
   ]
  ],
  "example": "A retailer's risk register lists theft of card data from its web store as high risk. It mitigates by moving payment entry to a payment processor's hosted page, which also largely avoids storing card data, and buys cyber insurance to transfer some breach costs. The remaining low residual risk is formally accepted by the chief financial officer and scheduled for annual review.",
  "tip": "Insurance transfers financial loss, never accountability. And acceptance must be documented by someone with authority; ignoring a risk is not acceptance.",
  "check": [
   [
    "A company stops offering a risky legacy service. Which treatment is this?",
    "Risk avoidance."
   ],
   [
    "What is residual risk?",
    "The risk that remains after controls are applied, which management must accept or treat further."
   ],
   [
    "Does buying cyber insurance transfer responsibility for protecting customer data?",
    "No. It transfers some financial consequences, but the organization remains accountable."
   ]
  ]
 },
 {
  "t": "Frameworks: NIST RMF / SP 800-30, ISO 27005",
  "body": [
   "Risk frameworks give organizations a repeatable, defensible way to manage risk, and they give auditors and partners a common language. The SSCP expects you to recognize the main ones, what each is for and the order of their major steps.",
   "The NIST Risk Management Framework (RMF) is published by the US National Institute of Standards and Technology in Special Publication 800-37. It is required for US federal systems and widely used elsewhere. It describes a lifecycle for managing security and privacy risk to information systems in seven steps. Prepare: establish context, roles, risk strategy and priorities at organization and system levels. Categorize: determine the system's impact level based on the potential effects of a loss of confidentiality, integrity or availability, using companion guidance such as FIPS 199. Select: choose an appropriate baseline of controls from the NIST SP 800-53 catalog and tailor it. Implement: put the controls in place and document how. Assess: test whether the controls are implemented correctly, operating as intended and producing the desired outcome. Authorize: a senior official, the authorizing official, reviews the results and residual risk and decides whether to grant an authorization to operate (ATO). Monitor: continuously track controls, changes and threats, and report on security posture.",
   "NIST Special Publication 800-30, Guide for Conducting Risk Assessments, focuses on the assessment piece. Its process is to prepare for the assessment (purpose, scope, assumptions, sources of information and the risk model), conduct it (identify threat sources and events, identify vulnerabilities and predisposing conditions, determine likelihood, determine impact, and determine risk), communicate the results to decision makers, and maintain the assessment over time. It supports qualitative, semi-quantitative and quantitative approaches and can be applied at organization, mission or business process, and system tiers.",
   "ISO/IEC 27005 is the international standard giving guidance on information security risk management. It supports the risk management requirements of ISO/IEC 27001, the standard for an information security management system (ISMS). Its process runs through establishing the context (scope, criteria for evaluating and accepting risk), risk assessment made up of risk identification, risk analysis and risk evaluation, risk treatment (modify, retain, avoid or share, which correspond to mitigate, accept, avoid and transfer), and risk acceptance. Running alongside are continuous risk communication and consultation with stakeholders, and monitoring and review. The process is iterative: if treatment leaves unacceptable risk, you loop back.",
   "Recognizing the differences helps with questions. RMF is a full system lifecycle with a formal authorization decision; SP 800-30 is specifically about how to assess risk; ISO 27005 is international, tied to an ISO 27001 ISMS, and uses slightly different words for treatment options. Other frameworks you may meet include the NIST Cybersecurity Framework for organizational cybersecurity outcomes and ISO 31000 for general enterprise risk management."
  ],
  "terms": [
   [
    "NIST Risk Management Framework (RMF)",
    "A seven-step lifecycle (prepare, categorize, select, implement, assess, authorize, monitor) for managing risk to information systems."
   ],
   [
    "NIST SP 800-30",
    "NIST guidance for conducting risk assessments: prepare, conduct, communicate and maintain."
   ],
   [
    "ISO/IEC 27005",
    "International guidance for information security risk management supporting an ISO/IEC 27001 ISMS."
   ],
   [
    "Authorization to operate (ATO)",
    "A senior official's formal decision to accept a system's residual risk and allow it to operate."
   ],
   [
    "Categorization",
    "Determining a system's impact level from the potential harm of losing confidentiality, integrity or availability."
   ]
  ],
  "example": "A state agency deploys a new case-management system. It categorizes it as moderate impact, selects and tailors a moderate control baseline, implements and documents the controls, has an independent team assess them, and the authorizing official grants an ATO with a plan to fix two findings. Continuous monitoring then tracks changes and new vulnerabilities.",
  "tip": "Know the RMF order: prepare, categorize, select, implement, assess, authorize, monitor. Categorize comes before select, and assess comes before authorize.",
  "check": [
   [
    "Which RMF step produces an authorization to operate?",
    "Authorize, where the authorizing official accepts the residual risk."
   ],
   [
    "What are the main steps of the SP 800-30 process?",
    "Prepare for the assessment, conduct it, communicate results and maintain the assessment."
   ],
   [
    "ISO 27005 calls one treatment option 'retain'. What is its common equivalent?",
    "Risk acceptance."
   ]
  ]
 },
 {
  "t": "Legal and regulatory concerns: privacy laws, breach notification, data residency",
  "body": [
   "Security practitioners do not need to be lawyers, but they must understand how laws and regulations shape security requirements, and when to involve legal counsel. Rules vary by country, state and industry, and data often crosses borders, so the details change. Focus on the principles and the obligations they create.",
   "Privacy laws protect personal information, sometimes called personally identifiable information (PII) or personal data. The European Union's General Data Protection Regulation (GDPR) is the best-known broad example. It applies to organizations processing personal data of people in the EU, even if the organization is elsewhere, and it sets principles such as lawfulness and transparency, purpose limitation, data minimization, accuracy, storage limitation and security. It gives individuals rights, including access, correction and erasure, and distinguishes the controller, which decides why and how data is processed, from the processor, which processes it on the controller's behalf. Other laws are sector-specific. In the United States, for example, the Health Insurance Portability and Accountability Act (HIPAA) covers health information, and the Gramm-Leach-Bliley Act covers financial institutions. Many states and countries have their own privacy laws. Industry standards such as the Payment Card Industry Data Security Standard (PCI DSS) are contractual rather than laws, but they are enforced through agreements with card brands and banks.",
   "Breach notification laws require organizations to notify affected individuals, regulators, or both when certain personal data is compromised. Requirements differ in what counts as a breach, which data types are covered, who must be told and how quickly. GDPR, for example, requires notification to the supervisory authority without undue delay and, where feasible, within 72 hours of becoming aware of a qualifying breach. Many laws reduce or remove the duty to notify when stolen data was strongly encrypted and the key was not exposed, which is one more reason to encrypt. Incident response plans must include legal counsel, timelines and templates, because the clock may start when the organization becomes aware of the breach, not when the investigation ends.",
   "Data residency refers to the physical or geographic location where data is stored and processed. Some laws and contracts require certain data to stay within a country or region. Data sovereignty is the related idea that data is subject to the laws of the country where it is located, so storing data abroad can expose it to foreign legal demands. Cross-border transfer rules, such as those in GDPR, restrict sending personal data to countries without adequate protections unless safeguards like contractual clauses are used. With cloud services, you must know which regions your data and backups live in and configure services to comply.",
   "Other legal concerns include intellectual property, licensing, export controls on encryption, and evidence handling for investigations. When legal questions arise, the practitioner's job is to recognize the issue, preserve information and escalate to legal and compliance staff rather than decide alone."
  ],
  "terms": [
   [
    "Personally identifiable information (PII)",
    "Information that can identify a specific individual, alone or combined with other data."
   ],
   [
    "Breach notification",
    "A legal or contractual duty to inform regulators and affected people when protected data is compromised."
   ],
   [
    "Data residency",
    "The geographic location where data is stored and processed, which may be restricted by law or contract."
   ],
   [
    "Data sovereignty",
    "The principle that data is subject to the laws of the country in which it is located."
   ],
   [
    "Data controller",
    "The organization that determines the purposes and means of processing personal data; the processor acts on its behalf."
   ]
  ],
  "example": "A European retailer plans to move its customer database to a cloud provider. Before migrating, the security team confirms that the chosen region, including backups and disaster recovery copies, stays within the EU, reviews the provider's data processing agreement, and updates the incident response plan so a suspected breach triggers legal review quickly enough to meet the regulator's notification deadline.",
  "tip": "When a scenario raises a legal or regulatory question, the practitioner's best action is usually to preserve evidence and involve legal or compliance, not to decide or notify alone.",
  "check": [
   [
    "What is the difference between data residency and data sovereignty?",
    "Residency is where data is physically stored; sovereignty is the principle that data is governed by the laws of that location."
   ],
   [
    "Why can strong encryption reduce breach notification obligations?",
    "Many laws exempt or relax notification when compromised data was encrypted and the keys were not exposed, since the data is unreadable."
   ],
   [
    "Under GDPR, who decides the purposes of processing personal data?",
    "The data controller; the processor processes data on the controller's behalf."
   ]
  ]
 },
 {
  "t": "Security assessments: vulnerability scanning (credentialed vs non-credentialed), pen testing, audits",
  "body": [
   "Security assessments tell you whether your controls actually work and where your weaknesses are. The SSCP exam distinguishes several kinds, and a key theme is that any testing must be authorized in writing, with an agreed scope, before it starts.",
   "Vulnerability scanning uses automated tools to probe systems for known weaknesses: missing patches, vulnerable software versions, weak configurations, default credentials and exposed services. Scanners compare what they find with databases of known vulnerabilities and produce a report ranked by severity. Scans should run regularly, after significant changes and when major new vulnerabilities are announced. They are relatively low-risk and repeatable, but they can still disrupt fragile systems, so schedule them sensibly and exclude devices known to crash.",
   "Scans come in two main types. A non-credentialed (unauthenticated) scan examines systems from the network without logging in, seeing what an outside attacker would see: open ports, service banners and responses. It is faster to set up but can miss many issues and is more prone to false positives, because it must infer versions from limited information. A credentialed (authenticated) scan logs in to each system with an account provided for the purpose and inspects installed software, patch levels, registry or configuration files and local settings. It gives a far more accurate and complete picture and fewer false positives. Protect scanning credentials carefully and grant them only the rights the scanner needs. Scans can also be internal or external, and agent-based tools installed on hosts can report continuously.",
   "Penetration testing goes further. A skilled tester, acting with permission, tries to exploit vulnerabilities to show what an attacker could actually achieve, for example chaining a weak password and a misconfiguration to reach sensitive data. Pen tests are more thorough and realistic but also more expensive and riskier, so they need careful planning. Rules of engagement document scope, targets, excluded systems, permitted techniques, testing times, emergency contacts and how data will be handled. Tests can be black box (tester has no prior knowledge), white box (full knowledge, such as diagrams and source code) or gray box (partial knowledge). The phases usually run through planning, reconnaissance, discovery and scanning, exploitation attempts, and reporting with remediation advice.",
   "Audits are formal, systematic evaluations against defined criteria, such as a policy, a standard like ISO 27001, or a regulation. An auditor gathers evidence through interviews, document review, observation and testing, and reports findings on whether controls are designed and operating effectively. Internal audits are performed by the organization's own independent audit staff; external audits by independent third parties, whose reports carry more weight with customers and regulators. Auditors must be independent of the areas they audit.",
   "In short: scanning finds possible weaknesses, penetration testing proves which ones can be exploited, and audits check compliance with requirements."
  ],
  "terms": [
   [
    "Credentialed scan",
    "A vulnerability scan that logs in to systems to inspect installed software and configuration, giving more accurate results."
   ],
   [
    "Non-credentialed scan",
    "A scan performed without logging in, showing what an outside attacker could see."
   ],
   [
    "Penetration test",
    "An authorized simulated attack that attempts to exploit vulnerabilities to demonstrate real impact."
   ],
   [
    "Rules of engagement",
    "The written agreement defining a test's scope, permitted techniques, timing, contacts and limits."
   ],
   [
    "Audit",
    "A formal, independent evaluation of controls against defined criteria such as policy, standards or regulations."
   ]
  ],
  "example": "A non-credentialed scan of a file server reports only two medium issues. When the team repeats it as a credentialed scan, it finds fourteen missing patches and an outdated library that the external view could not see. The team schedules credentialed scans monthly and books an annual gray-box penetration test with written rules of engagement.",
  "tip": "Credentialed scans are more accurate with fewer false positives; non-credentialed scans show the attacker's outside view. Any test without written authorization and scope is never the right answer.",
  "check": [
   [
    "Why does a credentialed scan find more vulnerabilities?",
    "It logs in and inspects installed software, patch levels and local configuration instead of guessing from network responses."
   ],
   [
    "What is the main difference between a vulnerability scan and a penetration test?",
    "A scan identifies potential weaknesses automatically; a pen test attempts to exploit them to demonstrate real-world impact."
   ],
   [
    "What should rules of engagement include?",
    "Scope, targets and exclusions, permitted techniques, timing, emergency contacts and data handling."
   ]
  ]
 },
 {
  "t": "Vulnerability management: CVE/CVSS, prioritization, false positives, remediation tracking",
  "body": [
   "Scanning is only one part of vulnerability management. The full process is a continuous cycle: discover assets, identify vulnerabilities, analyze and prioritize them, remediate or mitigate, verify the fix, and report. The goal is to reduce exposure systematically, focusing effort where risk is highest.",
   "Common Vulnerabilities and Exposures (CVE) is a public catalog that gives each publicly disclosed vulnerability a unique identifier in the form CVE-year-number, along with a short description. The identifier lets scanners, vendors, advisories and teams refer unambiguously to the same flaw. CVE itself does not rate severity. Databases such as the US National Vulnerability Database (NVD) enrich CVE entries with severity scores, affected products and references.",
   "The Common Vulnerability Scoring System (CVSS) rates the severity of a vulnerability on a scale from 0.0 to 10.0. The base score reflects intrinsic characteristics: how it is exploited (attack vector, such as network or local), attack complexity, privileges required, whether user interaction is needed, and the impact on confidentiality, integrity and availability. Additional metric groups let you adjust for current threat conditions and for your own environment. Scores map to qualitative ratings: none (0.0), low (0.1 to 3.9), medium (4.0 to 6.9), high (7.0 to 8.9) and critical (9.0 to 10.0).",
   "Prioritization must go beyond the raw score. A critical CVSS score on an isolated test machine may matter less than a high score on an internet-facing server that holds customer data. Consider asset value and exposure, whether an exploit exists or the vulnerability is being actively exploited in the wild (lists of known exploited vulnerabilities help here), compensating controls already in place, and business impact. Many organizations set remediation deadlines by severity and asset criticality in policy, for example tighter timelines for critical, internet-facing issues.",
   "False positives are reported vulnerabilities that do not actually exist, for example when a scanner flags a service by version banner but the vendor has backported the fix. False negatives are real vulnerabilities the scanner missed, which are more dangerous because nobody knows to fix them. Reduce false positives with credentialed scans and updated plug-ins; validate suspicious findings manually; and document confirmed false positives so they can be suppressed in future reports with a justification and review date, instead of being silently ignored.",
   "Remediation means fixing the root cause, usually by patching, upgrading or reconfiguring. When a fix is not available or cannot be applied quickly, mitigation reduces risk in the meantime, for instance by disabling a feature, applying a firewall rule or isolating the system; that is a compensating control, and any remaining risk should be formally accepted. Track every finding in a ticketing system or vulnerability management tool with an owner, due date and status, route changes through change management, and rescan to verify closure. Metrics such as mean time to remediate and the number of overdue critical findings show whether the program is working."
  ],
  "terms": [
   [
    "CVE",
    "Common Vulnerabilities and Exposures: unique public identifiers for disclosed vulnerabilities."
   ],
   [
    "CVSS",
    "Common Vulnerability Scoring System: a 0.0 to 10.0 severity score based on exploitability and impact metrics."
   ],
   [
    "False positive",
    "A reported vulnerability or alert that is not actually present."
   ],
   [
    "False negative",
    "A real vulnerability or attack that a tool failed to detect."
   ],
   [
    "Mean time to remediate",
    "The average time from discovering a vulnerability to verifying its fix."
   ]
  ],
  "example": "A scan reports a critical vulnerability on an internal lab server and a high one on the public web portal. Because the portal flaw is listed as actively exploited and the server holds customer data, the team patches the portal first, within a day, and schedules the lab server for the next maintenance window. A rescan confirms both fixes before the tickets are closed.",
  "tip": "CVE identifies; CVSS scores. Prioritize by risk, combining severity with asset value, exposure and active exploitation, not by CVSS score alone. Always verify fixes with a rescan.",
  "check": [
   [
    "What is the difference between CVE and CVSS?",
    "CVE is a unique identifier for a vulnerability; CVSS is a scoring system that rates its severity."
   ],
   [
    "Why are false negatives more dangerous than false positives?",
    "They are real weaknesses that go undetected, so no one fixes them."
   ],
   [
    "A vendor patch is not yet available for a critical flaw. What should you do?",
    "Apply mitigating or compensating controls such as isolation or disabling the feature, document and accept the remaining risk, and track until a patch is applied and verified."
   ]
  ]
 },
 {
  "t": "Monitoring platforms: SIEM, log sources, time synchronization, log integrity",
  "body": [
   "Monitoring is how you notice that something is wrong: an attack in progress, a failing control or a policy violation. Individual systems each produce logs, but an analyst cannot read dozens of separate log files in real time. Monitoring platforms bring them together so events can be searched, correlated and turned into alerts.",
   "A security information and event management (SIEM) system collects logs and events from many sources, normalizes them into a common format, stores them, and correlates them using rules and analytics to raise alerts. For example, a single failed login is normal, but hundreds of failures across many accounts from one address, followed by a success, is a pattern a SIEM rule can flag as password spraying. SIEMs also provide dashboards, search for investigations, and reports for compliance. Related tools include security orchestration, automation and response (SOAR) platforms that automate response steps, and endpoint detection and response (EDR) tools that record detailed activity on hosts.",
   "Useful log sources include: authentication services and directories (logins, lockouts, group changes); operating system security logs, such as the Windows Security event log and Linux syslog and authentication logs; firewalls, VPNs and proxies (connections allowed and denied); intrusion detection and prevention systems; endpoint protection and EDR; DNS and DHCP servers, which link names and addresses to devices; web servers and applications; databases; cloud platform audit logs; email security gateways; and physical access systems. Collect what supports your use cases rather than everything, since volume adds cost and noise. Logs are usually forwarded by agents or by protocols such as syslog.",
   "Time synchronization is essential. To reconstruct what happened, events from different systems must line up on a single timeline. If a firewall's clock is four minutes off from a domain controller's, correlation rules miss connections and investigators draw wrong conclusions. All systems should synchronize with reliable internal time servers using the Network Time Protocol (NTP), which in turn reference trusted external sources. Record time zones consistently, commonly in Coordinated Universal Time (UTC). Accurate time also matters for Kerberos authentication and for evidence to be credible.",
   "Log integrity means logs are complete and have not been altered. Attackers who gain access often try to delete or modify logs to hide their tracks. Protections include forwarding logs promptly to a central server that administrators of the source systems cannot modify, restricting who can access or delete logs, using write-once or immutable storage, hashing or signing log files so tampering can be detected, encrypting logs in transit, and alerting when a source stops sending or a log is cleared. Retain logs for the period required by policy, regulation and investigation needs.",
   "Also monitor the monitoring. A SIEM that silently stopped receiving logs from a critical server gives false confidence, so set alerts for missing sources and review coverage regularly."
  ],
  "terms": [
   [
    "SIEM",
    "Security information and event management: a platform that collects, normalizes, correlates and alerts on logs from many sources."
   ],
   [
    "Correlation",
    "Linking related events from different sources to detect patterns that single events would not reveal."
   ],
   [
    "NTP",
    "Network Time Protocol, used to synchronize system clocks so logs from different sources align."
   ],
   [
    "Log integrity",
    "Assurance that log records are complete and unaltered, supported by central collection, access control, immutability and hashing."
   ],
   [
    "Normalization",
    "Converting logs from different formats into a common structure so they can be searched and correlated."
   ]
  ],
  "example": "Investigating a suspicious login, an analyst finds that the VPN appliance's timestamps are seven minutes behind the domain controller's, making it look as if the user authenticated before connecting. After pointing the appliance at the internal NTP servers, the timeline lines up and the SIEM's correlation rule for impossible travel starts firing correctly.",
  "tip": "Without synchronized clocks, correlation and evidence fall apart. And logs should be sent off the source system quickly, to storage its administrators cannot alter.",
  "check": [
   [
    "Why is sending logs to a central SIEM a log integrity control?",
    "An attacker who compromises the source system cannot easily alter copies already stored on a separate, protected platform."
   ],
   [
    "What is the role of NTP in monitoring?",
    "It keeps clocks synchronized so events from different systems can be correlated on one accurate timeline."
   ],
   [
    "Give three useful log sources for a SIEM.",
    "Any three of: authentication and directory logs, OS security logs, firewall and VPN logs, IDS/IPS, EDR, DNS and DHCP, web and application logs, cloud audit logs."
   ]
  ]
 },
 {
  "t": "Baselines, anomalies and alert tuning",
  "body": [
   "Detecting attacks often depends on knowing what normal looks like. A baseline, in the monitoring sense, is a documented picture of normal behavior for a system, network or user: typical traffic volumes, login times, running processes, resource use and communication patterns. Once you have a baseline, anything that differs significantly is an anomaly worth examining.",
   "Building a baseline starts with collecting data over a representative period, long enough to include normal cycles such as business hours, weekends, month-end processing and backup windows. You then record measures such as average and peak bandwidth, the usual set of hosts a server talks to, typical failed-login rates, the normal list of services and scheduled tasks, and the hours when each group of users works. Baselines must be updated when the business changes, for example after a new application launches, or they will generate false alarms.",
   "Anomaly-based detection, also called behavior-based detection, compares current activity with the baseline and flags significant deviations: a workstation suddenly sending gigabytes to an unfamiliar external address at 3 a.m., a service account logging in interactively, a user downloading far more files than usual. Its strength is that it can catch new attacks for which no signature exists. Its weakness is false positives, because unusual is not always malicious. Signature-based detection, by contrast, matches known patterns of attacks; it is precise for known threats but blind to new ones. Mature programs use both.",
   "Every alert rule has errors. A false positive is an alert on benign activity; a false negative is a missed real attack. A true positive is a correct alert; a true negative is correct silence. Too many false positives cause alert fatigue: analysts become overwhelmed, start ignoring or bulk-closing alerts, and eventually miss the real one. Too few alerts, from over-aggressive filtering, create false negatives.",
   "Alert tuning is the ongoing work of adjusting detection rules to reduce noise without losing important detections. Techniques include adjusting thresholds (for example, five failed logins in a minute instead of one), adding context such as asset criticality and user role, whitelisting or excluding known-good activity with documented justification, combining conditions so an alert fires only on a meaningful sequence, suppressing duplicates, and setting severity levels so the most important alerts reach people first. Every tuning change should be documented, reviewed and tested, because a careless exclusion can create a blind spot that attackers can hide in.",
   "Measure alert quality over time: the proportion of alerts that turn out to be true positives, the volume per analyst, and whether incidents were missed. Feed lessons from real incidents back into new or adjusted rules."
  ],
  "terms": [
   [
    "Baseline",
    "A documented record of normal behavior for a system, network or user, used to spot deviations."
   ],
   [
    "Anomaly-based detection",
    "Detection that flags activity deviating significantly from an established baseline."
   ],
   [
    "Signature-based detection",
    "Detection that matches activity against known patterns of attacks."
   ],
   [
    "Alert fatigue",
    "Desensitization caused by excessive alerts, especially false positives, leading analysts to miss real threats."
   ],
   [
    "Alert tuning",
    "Adjusting detection rules, thresholds and exclusions to reduce false positives without creating false negatives."
   ]
  ],
  "example": "A SIEM rule alerts on every after-hours login and produces hundreds of alerts each night, mostly from the overnight operations team. The analyst tunes it to exclude that team's accounts from their assigned workstations, documents the exclusion, and adds a separate rule for after-hours logins to finance systems. Alert volume drops sharply, and a real after-hours login with a stolen finance credential is caught the next week.",
  "tip": "Anomaly-based detection can catch new attacks but produces more false positives; signature-based detection is precise but misses the unknown. Tuning should reduce noise without creating blind spots, so exclusions must be narrow and documented.",
  "check": [
   [
    "Why must a baseline be collected over a representative period?",
    "So it includes normal cycles like weekends, month-end processing and backups; otherwise ordinary activity will look anomalous."
   ],
   [
    "What is alert fatigue and why is it dangerous?",
    "Analysts overwhelmed by many false alerts start ignoring them, increasing the chance of missing a real attack."
   ],
   [
    "Name two alert-tuning techniques.",
    "Adjusting thresholds, adding asset or user context, narrowly excluding known-good activity, combining conditions, or suppressing duplicates (any two)."
   ]
  ]
 },
 {
  "t": "Analyzing and reporting monitoring results; escalation",
  "body": [
   "Collecting logs and generating alerts is only valuable if someone analyzes the results, reaches sound conclusions and gets them to the right people in time. This topic covers the analyst's workflow from alert to report, and when and how to escalate.",
   "Analysis begins with triage of each alert: is it real, how severe is it, and what does it affect? The analyst gathers context: which asset is involved and how critical it is, which user account, what happened before and after the alert, whether other sources show related activity, and whether threat intelligence recognizes an indicator such as an address or file hash. The analyst compares activity against the baseline and against known-good explanations like scheduled jobs or change tickets. The outcome is a judgment: false positive (close with a note, and consider tuning), benign true positive (real but authorized, such as an approved scan), or suspicious or malicious activity that needs action.",
   "Good analysis is documented. Each alert or case should record what was observed, what was checked, the evidence, the conclusion and the reason for it, and any actions taken, with timestamps. This creates an audit trail, lets another analyst pick up the case, and provides material for trend analysis and lessons learned. When preserving evidence, avoid altering original data; work from copies where possible and note how evidence was collected.",
   "Escalation means passing an issue to someone with more expertise, authority or responsibility. Many security operations centers use tiers: tier 1 analysts triage alerts, tier 2 investigate deeper, and tier 3 or incident responders handle complex cases. Escalation criteria should be defined in advance in procedures and playbooks, for example: confirmed compromise of any system, any involvement of privileged accounts or sensitive data, activity on critical assets, potential legal or regulatory implications, or an issue the analyst cannot resolve within a set time. Escalate early when in doubt; a quick escalation that turns out benign costs far less than a late one. Know the escalation path, including after-hours contacts, and use the approved communication channels. If the normal channel may be compromised, such as corporate email during a suspected email breach, use an out-of-band method.",
   "Reporting turns monitoring into decisions. Operational reports for the security team cover alert volumes, true-positive rates, open cases and time to detect and respond. Management reports summarize significant events, trends, risk to the business and recommended actions in plain language, without drowning readers in raw data. Compliance reports show that required monitoring occurred. Tailor each report to its audience: technical detail for engineers, business impact for executives.",
   "Finally, feed results back: new detections, tuned rules, fixed vulnerabilities and updated baselines. Monitoring is a cycle, not a one-way pipe."
  ],
  "terms": [
   [
    "Triage",
    "Rapid assessment of an alert or event to determine validity, severity and priority."
   ],
   [
    "Escalation",
    "Passing an issue to someone with greater expertise or authority according to defined criteria."
   ],
   [
    "Benign true positive",
    "An alert that correctly detected real activity that turns out to be authorized or harmless."
   ],
   [
    "Out-of-band communication",
    "Using a separate channel, such as phone instead of corporate email, when the normal channel may be compromised."
   ]
  ],
  "example": "A tier 1 analyst sees an alert for a large outbound transfer from a database server at night. She checks for a related change ticket and finds none, sees the same server made DNS queries to a newly registered domain, and documents both findings. Because the server holds customer data, the playbook requires immediate escalation, so she calls the on-duty tier 2 responder and opens an incident case.",
  "tip": "When a scenario gives you doubt about severity, escalating according to the documented procedure is usually the correct answer. Analysts should not take drastic unilateral action beyond their authority.",
  "check": [
   [
    "What information should an analyst document for each alert?",
    "What was observed, what was checked, the evidence, the conclusion and reasoning, actions taken, and timestamps."
   ],
   [
    "Give two common escalation triggers.",
    "Confirmed compromise, privileged account involvement, sensitive data or critical assets affected, legal or regulatory implications, or inability to resolve within the set time (any two)."
   ],
   [
    "How should a report for executives differ from one for the SOC team?",
    "It should focus on business impact, trends, risk and recommended actions in plain language rather than technical detail."
   ]
  ]
 },
 {
  "t": "Incident lifecycle: preparation, detection & analysis, containment, eradication, recovery, lessons learned",
  "body": [
   "Incident response is the organized approach to handling security incidents so that damage, cost and recovery time are minimized. The widely used NIST incident handling model, described in Special Publication 800-61, groups the work into phases: preparation; detection and analysis; containment, eradication and recovery; and post-incident activity, often called lessons learned. The SSCP outline lists containment, eradication and recovery as separate steps, and you should know their order and purpose.",
   "Preparation happens before any incident. It includes writing the incident response policy and plan, forming and training the team, defining roles and contact lists, building playbooks for common incident types, deploying logging and monitoring, preparing tools such as forensic workstations and clean media, establishing communication channels, and running exercises. Preventive work such as patching and hardening also reduces how many incidents occur.",
   "Detection and analysis is recognizing that an incident may be happening and understanding it. Signs come from alerts, user reports, threat intelligence and external notifications. Analysts validate the event, determine its scope (which systems, accounts and data), identify the likely attack vector, prioritize by functional impact, information impact and recoverability, and document everything. Evidence should be preserved from the start, with a chain of custody, in case of legal action.",
   "Containment limits the damage and stops the incident from spreading. Short-term containment might isolate an infected host from the network, block a malicious address, or disable a compromised account. Long-term containment may involve temporary fixes that let business continue while a full solution is prepared. Containment strategies are chosen based on the damage risk, the need to preserve evidence, service availability and the resources required. Often you isolate rather than power off, because a running system keeps volatile evidence in memory.",
   "Eradication removes the cause: deleting malware, closing the exploited vulnerability, removing attacker accounts and persistence mechanisms, and resetting compromised credentials. Identify every affected system first; eradicating on one host while the attacker persists on another leads to reinfection.",
   "Recovery restores systems to normal operation: rebuilding from known-good images, restoring clean backups, applying patches and hardening, returning systems to production gradually, and monitoring them closely for signs the attacker has returned. Business owners confirm when services are working properly.",
   "Lessons learned happens after the incident closes, ideally within days while memories are fresh. The team reviews what happened, how well the response worked, what should change, and whether detection could have been faster. Outputs include updated plans, playbooks, controls and training, plus a report with metrics. This phase closes the loop back into preparation, which is why the model is drawn as a cycle."
  ],
  "terms": [
   [
    "Preparation",
    "Establishing the plan, team, tools, training and controls needed before an incident occurs."
   ],
   [
    "Containment",
    "Actions that limit the scope and damage of an incident, such as isolating hosts or disabling accounts."
   ],
   [
    "Eradication",
    "Removing the root cause and all attacker artifacts, such as malware, backdoors and compromised accounts."
   ],
   [
    "Recovery",
    "Restoring affected systems to normal, verified operation and monitoring for recurrence."
   ],
   [
    "Lessons learned",
    "A post-incident review that identifies improvements to plans, controls and training."
   ]
  ],
  "example": "A help desk ticket reports a pop-up demanding payment. The analyst confirms ransomware on one workstation (detection and analysis), disconnects it from the network and blocks the command-and-control domain (containment), finds and removes the malicious scheduled task on two other hosts (eradication), reimages and restores the user's files from backup (recovery), and a review a week later adds macro blocking to the email policy (lessons learned).",
  "tip": "Order matters: contain before you eradicate, and eradicate before you recover. Preparation is the phase most often neglected, and lessons learned feeds back into it.",
  "check": [
   [
    "Why is containment performed before eradication?",
    "To stop the incident spreading and limit damage while the full scope is understood, so eradication can then remove every foothold."
   ],
   [
    "Why might you isolate a compromised system instead of powering it off?",
    "Powering off destroys volatile evidence in memory; isolation stops spread while preserving it."
   ],
   [
    "What is the purpose of the lessons learned phase?",
    "To review the incident and response and feed improvements back into plans, controls, detection and training."
   ]
  ]
 },
 {
  "t": "Events vs incidents, triage and escalation",
  "body": [
   "Not every log entry or alert is an emergency. Security teams must distinguish ordinary events from genuine incidents quickly and consistently, or they will either waste effort on noise or react too slowly to real attacks. Clear definitions, triage criteria and escalation paths make this possible.",
   "An event is any observable occurrence in a system or network: a user logging in, a file being opened, a firewall permitting a connection, a server rebooting. Most events are normal. An adverse event is one with a negative consequence, such as a system crash, unauthorized use of privileges, or a flood of denied connections. A security incident is a violation or imminent threat of violation of security policies, acceptable use policies or standard security practices, or an event that actually or potentially jeopardizes the confidentiality, integrity or availability of information or systems. Every incident begins as one or more events, but only a small fraction of events become incidents. Some organizations also define a breach as an incident in which protected data is confirmed to have been disclosed to an unauthorized party, which may trigger legal notification duties.",
   "Triage is the process of sorting incoming events and alerts to decide which are incidents, how serious they are and what should happen next. It borrows the idea from emergency medicine: treat the most critical cases first. Triage looks at factors such as the functional impact on the business (none, low, medium or high), the information impact (was sensitive data accessed, changed or taken), the recoverability (can it be fixed with existing resources, or does it need outside help), the criticality of affected assets, and whether the activity is ongoing or spreading. The result is an incident category, such as malware, unauthorized access, denial of service or data loss, and a priority or severity level, often from one to four or low to critical, that determines response times and who gets involved.",
   "Escalation follows from triage. The incident response plan should state who must be notified at each severity level and within what time. A low-severity incident may be handled by the security operations team and reported in a weekly summary. A high-severity one may require the incident response manager to activate the full team and inform senior management, legal counsel, privacy officers and communications staff. Functional escalation moves the case to people with more technical expertise; hierarchical escalation moves it to people with more authority to make business decisions, such as taking a revenue-generating system offline.",
   "Consistency matters. Using defined criteria rather than gut feeling means similar incidents are handled the same way, response times are predictable, and metrics are meaningful. Severity can and should be re-evaluated as more facts emerge; an incident may be upgraded or downgraded. Every declared incident should get a tracking record with a unique identifier, timestamps and an owner."
  ],
  "terms": [
   [
    "Event",
    "Any observable occurrence in a system or network, most of which are normal."
   ],
   [
    "Adverse event",
    "An event with a negative consequence, such as a crash or unauthorized access attempt."
   ],
   [
    "Security incident",
    "A violation or imminent threat of violation of security policy or practice that jeopardizes confidentiality, integrity or availability."
   ],
   [
    "Triage",
    "Sorting and prioritizing events and incidents by impact and urgency to decide the response."
   ],
   [
    "Hierarchical escalation",
    "Raising an issue to people with greater authority to make business decisions, as opposed to functional escalation to greater technical expertise."
   ]
  ],
  "example": "The SOC sees 40 failed logins on one account over an hour: an event worth watching. Then one login succeeds from an unfamiliar country and the account creates a mail forwarding rule to an external address. Triage now classifies it as an unauthorized access incident with possible data loss, rates it high severity, and the analyst escalates to the incident response manager as the plan requires for that level.",
  "tip": "All incidents are events, but not all events are incidents. Severity should be based on defined criteria like business impact, data involved and recoverability, and it can change as facts emerge.",
  "check": [
   [
    "What is the difference between an event and an incident?",
    "An event is any observable occurrence; an incident is an event or set of events that violates or threatens security policy or jeopardizes CIA."
   ],
   [
    "Name three factors used to set incident severity.",
    "Functional impact, information impact, recoverability, asset criticality, and whether the activity is ongoing (any three)."
   ],
   [
    "What is the difference between functional and hierarchical escalation?",
    "Functional escalation goes to people with more technical expertise; hierarchical escalation goes to people with more authority to make business decisions."
   ]
  ]
 },
 {
  "t": "Incident response plan, roles and communications",
  "body": [
   "An incident is a stressful, fast-moving situation. Decisions made under pressure are better when the organization has agreed in advance who does what, how decisions are made and how information flows. The incident response plan (IRP) captures those agreements. It is prepared during the preparation phase, approved by senior management and tested regularly.",
   "A typical IRP includes: its purpose, scope and objectives; definitions of events, incidents and severity levels; the authority of the incident response team, including power to isolate systems or take them offline; roles and responsibilities; escalation and notification procedures with contact lists; communication guidelines; references to playbooks for specific incident types such as ransomware, phishing, data loss and lost devices; evidence handling and chain of custody requirements; metrics to collect; and how the plan is maintained, trained and tested. It should connect to related plans, including business continuity and disaster recovery, since a serious incident may trigger them.",
   "The computer security incident response team (CSIRT, or CIRT) is the group that handles incidents. Common roles include: the incident response manager or incident commander, who coordinates the response and makes or obtains decisions; security analysts and technical responders who investigate, contain and eradicate; forensic specialists who collect and analyze evidence; system and network administrators who know the affected systems; and a scribe who keeps the timeline. The extended team, involved as needed, includes senior management (for major business decisions and resources), legal counsel (regulatory obligations, law enforcement contact, evidence and liability), human resources (when employees are involved), public relations or corporate communications, the privacy officer, business unit owners, and external parties such as forensic firms, insurers and service providers. Each person should know their role and have a backup.",
   "Communication must be controlled and deliberate. Internally, share information on a need-to-know basis; an attacker, or an insider under investigation, may be watching. Use out-of-band channels such as phone bridges or separate messaging when corporate email or chat might be compromised. Externally, only authorized spokespeople, usually public relations with legal review, talk to the media, customers or the public; other staff should refer inquiries to them. Contact with law enforcement is typically coordinated by legal counsel or management according to the plan. Regulators and affected individuals must be notified according to legal requirements and timelines. Keep messages factual, avoid speculation, and do not share details that could help the attacker or harm an investigation.",
   "The plan only works if people have practiced it. Tabletop exercises walk the team through a scenario in discussion; functional exercises and simulations test specific procedures or the whole response. Update the plan after exercises, after real incidents, and when the organization, contacts or systems change."
  ],
  "terms": [
   [
    "Incident response plan (IRP)",
    "An approved document defining how the organization prepares for, detects, responds to and recovers from security incidents."
   ],
   [
    "CSIRT",
    "Computer security incident response team: the group responsible for handling security incidents."
   ],
   [
    "Incident commander",
    "The person who coordinates the response effort and decision making during an incident."
   ],
   [
    "Tabletop exercise",
    "A discussion-based walk-through of an incident scenario to test the plan and roles without affecting systems."
   ],
   [
    "Authorized spokesperson",
    "The designated person, usually in communications or PR, who speaks for the organization to media and the public."
   ]
  ],
  "example": "During a suspected email compromise, the incident commander moves team coordination to a phone bridge because attackers may be reading mailboxes. Legal counsel assesses notification duties, HR is briefed because an employee account is involved, and a reporter's call to the help desk is politely referred to the corporate communications team, which issues a short, factual statement.",
  "tip": "Only authorized spokespeople communicate externally, and when the normal channel may be compromised, the team uses out-of-band communication. Legal counsel usually decides on contacting law enforcement.",
  "check": [
   [
    "Why should incident communications use out-of-band channels at times?",
    "Because attackers may have access to normal channels like corporate email or chat and could monitor or interfere with the response."
   ],
   [
    "Who should speak to the media during an incident?",
    "Only the authorized spokesperson, typically public relations or corporate communications with legal review."
   ],
   [
    "What is a tabletop exercise?",
    "A discussion-based walk-through of an incident scenario that tests roles and the plan without affecting live systems."
   ]
  ]
 },
 {
  "t": "Forensics: order of volatility, evidence handling, chain of custody",
  "body": [
   "Digital forensics is the disciplined collection, preservation and analysis of electronic evidence so that what you find can be trusted, reproduced and, if needed, presented in court or to management. As an SSCP you are often the first responder: the person who notices the suspicious server or gets the call at 2 a.m. Your actions in the first hour decide whether evidence survives and whether it is admissible later. The guiding idea is simple: capture what disappears first, change as little as possible, and document everything.",
   "The order of volatility ranks data by how quickly it is lost. The classic sequence (from RFC 3227, Guidelines for Evidence Collection and Archiving) runs roughly: CPU registers and cache; memory (RAM), including the routing table, ARP cache, process table and kernel statistics; temporary file systems and swap; disk storage; remote logging and monitoring data; physical configuration and network topology; and finally archival media such as backup tapes. RAM can hold running malware, decryption keys, open network connections and command history that never touch the disk, so pulling the power cord first may destroy the most valuable evidence. That is why many teams capture memory with a trusted tool from external media before deciding whether to isolate or shut down a system.",
   "Evidence handling means following documented procedures so that you do not contaminate what you collect. Work from trusted tools on your own media, not from binaries on the suspect system, which may be tampered with. Photograph the scene and screens, note the system time and its offset from a reliable time source, and record every command you run. Wear gloves for physical items, bag and tag devices, and use anti-static bags for drives. Never analyze original media directly; make verified copies and work on those.",
   "Chain of custody is the written record showing who had the evidence, when, where, and why, from the moment it was collected until it is presented or disposed of. Each transfer is logged with names, signatures, dates, times and the purpose of the transfer, and evidence is stored in a locked, access-controlled location. A gap in the chain lets opposing counsel argue that evidence could have been altered, which can make it inadmissible even if it was never touched. Chain of custody forms usually also record a description of the item, serial numbers and hash values of any images.",
   "Remember the difference between the roles. First responders secure the scene and preserve evidence; they do not usually perform deep analysis. If an incident might lead to prosecution or litigation, involve legal counsel and trained forensic examiners early, and follow the organization's incident response plan rather than improvising."
  ],
  "terms": [
   [
    "Order of volatility",
    "The sequence for collecting evidence from most short-lived (CPU cache, RAM) to most persistent (archives, backups)."
   ],
   [
    "Chain of custody",
    "A documented, unbroken record of every person who handled evidence, when and why, from collection to presentation."
   ],
   [
    "Live acquisition",
    "Collecting data, especially memory, from a running system before it is powered down."
   ],
   [
    "Admissibility",
    "Whether evidence can be accepted in a legal proceeding, which depends on it being relevant, reliable and properly handled."
   ]
  ],
  "example": "A help desk analyst finds a server beaconing to an unknown IP. Instead of rebooting it, she calls the incident team, who capture RAM with a trusted tool from a USB drive, record network connections, then image the disk. Each item is bagged, labeled with a hash value and signed onto a chain of custody form before being locked in the evidence safe.",
  "tip": "When an exam question asks what to collect first, pick the most volatile source (memory before disk, disk before backups). If it asks what makes evidence inadmissible, a broken or missing chain of custody is the usual answer.",
  "check": [
   [
    "Why might shutting down a compromised host immediately be a mistake?",
    "It destroys volatile evidence in RAM such as running processes, network connections and encryption keys, which sit high on the order of volatility."
   ],
   [
    "What must a chain of custody record show at every transfer?",
    "Who handled the evidence, when, where it was, and the purpose of the transfer, so there are no unexplained gaps."
   ],
   [
    "Why should you use your own trusted tools on a suspect system?",
    "The system's own binaries may be modified by an attacker to hide activity or alter results."
   ]
  ]
 },
 {
  "t": "Forensic imaging, write blockers, hash verification",
  "body": [
   "Once volatile data is captured, the next step is to preserve storage media. The rule is that you never analyze the original. Instead you create a forensic image: a bit-for-bit copy of the entire device, including unallocated space, slack space and deleted file remnants, not just the visible files. A normal file copy misses this hidden data and changes metadata such as access times, so it is not good enough for an investigation.",
   "A write blocker is a device or software layer that lets a computer read from a storage device while preventing any writes to it. Simply connecting a drive to a running operating system can cause it to write: mounting a volume may update journal entries, timestamps or create system files. Hardware write blockers sit physically between the evidence drive and the forensic workstation and are generally preferred because they do not depend on the examiner's operating system being configured correctly. Software write blockers exist too, but they must be validated and are easier to get wrong.",
   "Imaging tools produce either raw images (often called dd images, after the Unix `dd` command) or forensic container formats such as E01, which can add compression, case metadata and built-in integrity checks. Examiners usually make two copies: a master image that is stored and a working copy that is analyzed. The original drive goes back into evidence storage under chain of custody.",
   "Hash verification proves that the image is identical to the original and that nobody has changed it since. You calculate a cryptographic hash (for example SHA-256) of the source device and of the image; if the values match, the copy is exact. You record the hash on the chain of custody form and recompute it whenever the evidence is used later. Any single changed bit produces a completely different hash, so a match is strong evidence of integrity. Older tools often record MD5 or SHA-1 as well; these are weak against deliberate collision attacks, so SHA-256 is the better primary choice, though multiple hashes are sometimes recorded together.",
   "```bash\nsha256sum /dev/sdb > source.sha256\nsha256sum evidence.img > image.sha256\n# the two hash values must match\n```",
   "In a lab you might image a small USB stick through a write blocker, hash both, then open the image in a free tool like Autopsy to explore deleted files. The skills the exam wants are the reasons behind each step: bit-level copy to capture everything, write blocking to avoid altering evidence, and hashing to prove integrity."
  ],
  "terms": [
   [
    "Forensic image",
    "A bit-for-bit copy of a storage device that includes unallocated and slack space, not just active files."
   ],
   [
    "Write blocker",
    "Hardware or software that permits reads from evidence media while blocking any writes to it."
   ],
   [
    "Hash verification",
    "Comparing cryptographic hash values of the original and copy to prove they are identical and unchanged."
   ],
   [
    "Working copy",
    "A duplicate of the master image used for analysis so the master and the original remain untouched."
   ]
  ],
  "example": "An investigator receives a laptop drive. She connects it through a hardware write blocker, creates an E01 image, and computes SHA-256 hashes of both the drive and the image. The values match, so she records them on the custody form, stores the original, and analyzes a second working copy.",
  "tip": "Hashing proves integrity, not confidentiality. If a question asks how to show an image has not been altered, the answer is matching hash values, and the tool that prevents alteration during acquisition is a write blocker.",
  "check": [
   [
    "Why is a normal file copy unsuitable for forensic purposes?",
    "It skips unallocated and slack space and deleted data, and it can alter metadata such as timestamps."
   ],
   [
    "What does a matching hash between the source drive and image demonstrate?",
    "That the image is an exact, unaltered copy of the source at the time of acquisition."
   ],
   [
    "Why are hardware write blockers usually preferred over software ones?",
    "They block writes independently of the examiner's operating system, so a misconfiguration cannot alter the evidence."
   ]
  ]
 },
 {
  "t": "Legal considerations in investigations",
  "body": [
   "Security investigations do not happen in a legal vacuum. The same technical steps can produce useful evidence or a lawsuit against your employer depending on whether you had authority, followed policy and respected privacy law. As a practitioner you are not expected to be a lawyer, but you must know when to stop and involve legal counsel, human resources and management.",
   "Investigations come in several types, and each has a different standard. Administrative (internal) investigations deal with policy violations and are handled by the organization; the outcome might be discipline or termination. Criminal investigations involve law enforcement and must meet the high standard of proof beyond a reasonable doubt. Civil investigations involve disputes between parties, such as breach of contract, and use the lower standard of preponderance of the evidence. Regulatory investigations are driven by a government agency or industry body checking compliance. An internal incident can escalate into any of these, which is why evidence should be handled to the highest standard from the start.",
   "Authority and privacy come first. Before monitoring employees or searching their devices, the organization needs a clear acceptable use policy and, often, login banners stating that users have no expectation of privacy on company systems. Without that, searches may violate privacy laws or labor agreements. Personal devices and cloud accounts are harder: you may need consent, a court order or the provider's cooperation. Jurisdiction matters too, because data and attackers often sit in other countries with different laws.",
   "Rules of evidence decide whether material can be used. Evidence should be relevant, reliable (properly collected and verified) and complete. Types include real evidence (physical objects), documentary evidence (logs, records), testimony, and demonstrative evidence (charts explaining facts). Logs are often treated as business records, which courts may accept if they were created in the normal course of business, so consistent logging and time synchronization help. Hearsay, meaning second-hand statements, is generally restricted.",
   "Other legal concepts appear on the exam. A legal hold (litigation hold) requires the organization to preserve all potentially relevant data once litigation is reasonably expected, suspending normal deletion schedules; destroying such data can lead to sanctions. eDiscovery is the process of identifying, collecting and producing electronic information for legal proceedings. Entrapment, where authorities induce someone to commit a crime they would not otherwise commit, is illegal; enticement, such as a honeypot that merely offers an opportunity, is generally acceptable. Finally, breach notification laws may require you to tell regulators or affected people within set deadlines, so legal must be looped in quickly."
  ],
  "terms": [
   [
    "Legal hold",
    "An instruction to preserve all data relevant to expected litigation, overriding normal retention and deletion policies."
   ],
   [
    "eDiscovery",
    "The process of identifying, preserving, collecting and producing electronically stored information for legal matters."
   ],
   [
    "Enticement vs entrapment",
    "Enticement offers an opportunity to someone already intent on wrongdoing (legal); entrapment induces someone to commit a crime they otherwise would not (illegal)."
   ],
   [
    "Preponderance of the evidence",
    "The civil-case standard: the claim is more likely true than not."
   ]
  ],
  "example": "A manager suspects an employee of leaking designs. The security team confirms the acceptable use policy and logon banner allow monitoring of company email, gets approval from HR and legal, places a legal hold on the employee's mailbox, and preserves evidence with chain of custody in case the matter goes to civil court.",
  "tip": "If a question asks the first thing to do when an investigation may involve legal action or employee privacy, the best answer is usually to involve legal counsel and follow policy, not to start collecting on your own authority.",
  "check": [
   [
    "What standard of proof applies to criminal cases versus civil cases?",
    "Criminal cases require proof beyond a reasonable doubt; civil cases use the lower preponderance of the evidence standard."
   ],
   [
    "What does a legal hold require?",
    "Preserving all potentially relevant data once litigation is anticipated, suspending normal deletion or rotation."
   ],
   [
    "Is a honeypot entrapment?",
    "Generally no; it is enticement because it offers an opportunity without inducing someone to commit a crime they otherwise would not."
   ]
  ]
 },
 {
  "t": "Business impact analysis: MTD, RTO, RPO",
  "body": [
   "A business impact analysis (BIA) is the study that tells an organization which business processes matter most and what happens to it when they stop. It is the foundation of both business continuity and disaster recovery planning: you cannot decide how much to spend on recovery until you know what an outage costs. The BIA looks at processes first, then maps them to the systems, people, facilities and suppliers they depend on.",
   "The typical BIA steps are: identify critical business functions, often by interviewing process owners; identify the resources each function depends on; estimate the impact of a disruption over time, both quantitative (lost revenue, fines, overtime) and qualitative (reputation, customer trust, safety); and set recovery objectives. The impacts usually grow the longer an outage lasts, so the BIA asks what happens after an hour, a day, a week.",
   "Maximum tolerable downtime (MTD), also called maximum tolerable period of disruption, is the longest a business function can be unavailable before the organization suffers unacceptable or irreversible harm. It is a business decision set by senior management. Recovery time objective (RTO) is the target time to restore a system or process after a disruption. RTO must be shorter than MTD, leaving margin for things that go wrong. Work recovery time (WRT) is the extra time after systems are restored to verify data, catch up on backlog and resume normal work; a common rule is RTO plus WRT must not exceed MTD.",
   "Recovery point objective (RPO) is different: it is measured in data, not downtime. RPO is the maximum acceptable amount of data loss, expressed as time before the incident. If the RPO is four hours, you must be able to restore data from no older than four hours before the failure, which drives how often you back up or replicate. An RPO near zero requires real-time replication; an RPO of 24 hours may be satisfied by nightly backups.",
   "Two maintenance metrics sometimes appear alongside these. Mean time between failures (MTBF) describes how long a component typically runs before failing, and mean time to repair (MTTR) describes how long it takes to fix. They help estimate reliability, but they are not recovery objectives.",
   "The BIA outputs a prioritized list of functions with their MTD, RTO and RPO. Those numbers drive the choice of recovery site, backup strategy and budget. Tighter objectives cost more, so management balances cost against impact."
  ],
  "terms": [
   [
    "MTD",
    "Maximum tolerable downtime: the longest a function can be down before the organization suffers unacceptable harm."
   ],
   [
    "RTO",
    "Recovery time objective: the target time to restore a system or process after a disruption; must be less than MTD."
   ],
   [
    "RPO",
    "Recovery point objective: the maximum acceptable data loss measured in time, which sets backup or replication frequency."
   ],
   [
    "WRT",
    "Work recovery time: time after technical recovery to verify data and resume normal operations."
   ]
  ],
  "example": "An online retailer's BIA finds that order processing can be down for at most 8 hours before losses become severe (MTD). IT sets an RTO of 4 hours, leaving time for verification, and an RPO of 15 minutes, so the order database is replicated continuously to a second site.",
  "tip": "Remember the units: RTO and MTD are about how long you are down; RPO is about how much data you can lose. RTO must always be less than or equal to MTD.",
  "check": [
   [
    "An RPO of one hour tells you what?",
    "Data must be recoverable to a point no more than one hour before the incident, so backups or replication must run at least hourly."
   ],
   [
    "Who sets the MTD?",
    "Senior management or business owners, because it reflects business tolerance for disruption, not a technical limit."
   ],
   [
    "What is the relationship between RTO, WRT and MTD?",
    "RTO plus WRT should not exceed MTD."
   ]
  ]
 },
 {
  "t": "BCP vs DRP; recovery sites: hot, warm, cold, cloud",
  "body": [
   "A business continuity plan (BCP) and a disaster recovery plan (DRP) are related but not the same. The BCP is the broad plan for keeping critical business functions running during and after a disruption: people, processes, facilities, communications, suppliers and technology. The DRP is a subset focused on restoring IT systems, data and infrastructure after a disaster. Put simply, the BCP keeps the business going; the DRP gets the technology back. Both rely on the business impact analysis for priorities and objectives.",
   "A BCP usually covers the scope and governance, roles and responsibilities, emergency response and life safety, communication plans for staff, customers and media, alternate work arrangements, and procedures for returning to normal operations. People's safety always comes first. A DRP covers declaration criteria (who can declare a disaster), the recovery team, step-by-step technical procedures, recovery site details, and failback to the primary site once it is repaired.",
   "Recovery sites are alternate locations where operations can resume. A hot site is a fully equipped facility with hardware, software, network connectivity and current or near-current data, able to take over within minutes to hours. It is the most expensive option and suits short RTOs. A warm site has space, power, network and some hardware but needs data restored and systems configured, so recovery takes hours to days. A cold site provides only basic space with power and environmental controls; equipment must be delivered and installed, so recovery can take days to weeks, but it is the cheapest.",
   "Other options appear on exams. A mobile site is a trailer or container with equipment that can be driven to a location. A reciprocal agreement is a deal with another organization to share facilities during a disaster; it is cheap but hard to enforce and often impractical because each party lacks spare capacity. A redundant or mirrored site runs in parallel with the primary and can fail over almost instantly.",
   "Cloud recovery, often sold as disaster recovery as a service (DRaaS), replicates systems and data to a cloud provider and brings up virtual machines there when needed. It can deliver warm or hot capabilities without owning a second data center, and you pay mostly for storage until you fail over. You still need to plan for identity, network routing, licensing and testing, and to understand the provider's own resilience and your shared responsibilities.",
   "Choosing a site is a cost versus recovery time decision. Short RTOs and small RPOs push you toward hot or cloud-based options; generous objectives may justify a cold site. Also consider geographic separation: a recovery site close enough to be hit by the same flood or power outage is not much help."
  ],
  "terms": [
   [
    "BCP",
    "Business continuity plan: keeps critical business functions operating during and after a disruption."
   ],
   [
    "DRP",
    "Disaster recovery plan: restores IT systems, data and infrastructure after a disaster; part of the broader continuity effort."
   ],
   [
    "Hot site",
    "A fully equipped, ready-to-run alternate facility that can take over within minutes to hours."
   ],
   [
    "Cold site",
    "An alternate facility with only space, power and environmental controls; slowest and cheapest to activate."
   ]
  ],
  "example": "A regional bank uses a hot site in another state for its core banking systems, which have a 2-hour RTO, and a cloud DRaaS arrangement for internal file servers with a 24-hour RTO. Its BCP also directs branch staff to work from other branches and sets out customer communication scripts.",
  "tip": "Match site type to RTO: hot for minutes to hours, warm for hours to days, cold for days to weeks. If a question says the organization wants the lowest cost and can tolerate a long outage, pick cold.",
  "check": [
   [
    "How does a DRP relate to a BCP?",
    "The DRP is a technology-focused component of business continuity; the BCP covers the whole business including people, facilities and communications."
   ],
   [
    "What does a warm site typically lack compared with a hot site?",
    "Current data and fully configured systems; data must be restored and systems set up before operations resume."
   ],
   [
    "What is the main weakness of a reciprocal agreement?",
    "It is hard to enforce, and the partner may not have spare capacity when a regional disaster hits both parties."
   ]
  ]
 },
 {
  "t": "Backup types (full, incremental, differential) and restore testing",
  "body": [
   "Backups are the last line of defense against hardware failure, accidental deletion, corruption and ransomware. The backup strategy has to meet the recovery point objective (how much data you can lose) and the recovery time objective (how fast you must be back). The three core backup types trade off backup time, storage space and restore time.",
   "A full backup copies all selected data every time. It is the simplest to restore, since you need only one backup set, but it takes the longest and uses the most storage. An incremental backup copies only data that has changed since the last backup of any kind (full or incremental). Incrementals are fast and small, but a restore needs the last full backup plus every incremental since, in order; losing one in the chain breaks the restore. A differential backup copies everything that has changed since the last full backup. Each differential grows larger through the week, but a restore needs only the last full plus the most recent differential.",
   "On Windows file systems, the archive bit shows whether a file changed since it was last backed up. Full and incremental backups clear the archive bit; differential backups do not, which is why each differential keeps capturing everything since the full. Modern backup software often tracks changes in other ways, but the concept still shows up on exams.",
   "Other terms you should know. A snapshot is a point-in-time image of a volume or virtual machine, useful for quick rollback but usually stored on the same system, so it is not a substitute for independent backups. A synthetic full combines a previous full and later incrementals into a new full without re-reading the source. The 3-2-1 rule recommends three copies of data, on two different media types, with one copy offsite. Many organizations add an offline or immutable copy that ransomware cannot encrypt or delete. Backups should be encrypted and access to them tightly controlled, because they contain everything an attacker wants.",
   "A backup you have never restored is a hope, not a control. Restore testing means regularly recovering files, databases or whole systems to confirm the data is complete and usable and that the process meets the RTO. Tests should include selecting random files, full system restores to an isolated environment, and checking application-level consistency such as whether a database actually starts. Document results and fix failures. Also monitor backup job logs daily; silent failures are common.",
   "Rotation schemes such as grandfather-father-son keep daily, weekly and monthly sets so that you can recover from problems discovered late, such as corruption that went unnoticed for weeks."
  ],
  "terms": [
   [
    "Incremental backup",
    "Copies data changed since the last backup of any type; fast to create, slower to restore because every increment is needed."
   ],
   [
    "Differential backup",
    "Copies data changed since the last full backup; restore needs only the last full and the latest differential."
   ],
   [
    "3-2-1 rule",
    "Keep three copies of data on two different media, with one copy offsite."
   ],
   [
    "Restore testing",
    "Periodically recovering data from backups to verify it is complete, usable and meets recovery objectives."
   ]
  ],
  "example": "A company runs a full backup every Sunday and differentials Monday to Saturday. When a server fails on Thursday, the admin restores Sunday's full and Wednesday night's differential, two sets in total. A quarterly restore test had already confirmed the process takes under three hours, within the four-hour RTO.",
  "tip": "Know the restore counts: full needs one set; differential needs the full plus the last differential; incremental needs the full plus every incremental since. Incremental is fastest to back up, full is fastest to restore.",
  "check": [
   [
    "With a full on Sunday and incrementals daily, what is needed to restore on Wednesday after Tuesday night's backup?",
    "Sunday's full plus Monday's and Tuesday's incrementals, applied in order."
   ],
   [
    "Why is a snapshot not a complete backup strategy?",
    "It usually lives on the same storage as the original, so a storage failure or ransomware can destroy both."
   ],
   [
    "What does restore testing prove that backup job success messages do not?",
    "That the data can actually be recovered, is complete and consistent, and that recovery meets the RTO."
   ]
  ]
 },
 {
  "t": "Plan testing: checklist, tabletop, simulation, parallel, full interruption",
  "body": [
   "An untested continuity or recovery plan will fail in ways nobody predicted: phone numbers change, staff leave, systems are upgraded, and assumptions turn out to be wrong. Testing finds these gaps while the stakes are low and trains people so they know their roles. The exam expects you to know the common test types in order from least to most disruptive, and what each one can and cannot prove.",
   "A checklist test, sometimes called a read-through or desk check, is the simplest. Copies of the plan go to team members, who review it for accuracy and completeness: are contacts current, are procedures for their area correct, are resources listed. It costs little and disturbs nothing but proves little about whether the plan works.",
   "A tabletop exercise, also known as a structured walk-through, brings the team together in a room to walk through a scenario, such as a ransomware outbreak or a data center flood. A facilitator describes events and injects new developments, and participants explain what they would do. It reveals coordination gaps, unclear decision authority and communication problems, without touching production systems.",
   "A simulation test goes further by acting out a scenario in more realistic conditions. Teams may travel to the recovery site or perform some real procedures, but they stop short of actually moving production operations. It exercises logistics and skills more deeply than a tabletop.",
   "A parallel test brings up systems at the recovery site and runs them alongside production, processing real or copied data, while the primary site continues to operate normally. Results are compared to confirm the recovery environment works. It is expensive but proves technical recovery without risking operations.",
   "A full interruption test (full-scale test) actually shuts down the primary site or systems and moves operations to the recovery site. It is the only test that fully proves the plan, but it carries real risk of an outage if recovery fails, so it needs senior management approval and is performed rarely, if at all, in many organizations.",
   "After every test, hold a debrief or after-action review, document what worked and what failed, update the plan and assign owners for fixes. Plans should also be reviewed after major changes such as new systems, reorganizations or real incidents. Plan maintenance, version control and training go hand in hand with testing."
  ],
  "terms": [
   [
    "Tabletop exercise",
    "A discussion-based walk-through of a scenario in which participants describe their responses without touching systems."
   ],
   [
    "Parallel test",
    "Recovery systems are brought up and run alongside production to verify they work, without stopping the primary site."
   ],
   [
    "Full interruption test",
    "Primary operations are actually shut down and moved to the recovery site; most realistic and most risky."
   ],
   [
    "After-action review",
    "A post-test or post-incident meeting that records lessons learned and drives plan updates."
   ]
  ],
  "example": "A hospital IT team runs a tabletop exercise on a ransomware attack. During the walk-through they discover nobody knows who can authorize shutting down the electronic health record system, and that the emergency contact list still has a former CIO. They update the plan and schedule a parallel test of the recovery site for next quarter.",
  "tip": "Memorize the order by disruption: checklist, tabletop, simulation, parallel, full interruption. If a question asks for the test that verifies recovery systems without affecting production, choose parallel.",
  "check": [
   [
    "Which test type is the only one that actually halts primary operations?",
    "The full interruption test."
   ],
   [
    "What is the main value of a tabletop exercise?",
    "It reveals gaps in roles, decisions and communication at low cost and without affecting systems."
   ],
   [
    "What should happen after any plan test?",
    "A debrief to capture lessons learned, followed by updates to the plan and assigned corrective actions."
   ]
  ]
 },
 {
  "t": "Why cryptography: confidentiality, integrity, authentication, non-repudiation; data at rest, in transit, in use",
  "body": [
   "Cryptography is the science of protecting information by transforming it with mathematical algorithms and secret values called keys. It is one of the few security controls that keeps working after other defenses fail: if an attacker steals an encrypted laptop or captures encrypted network traffic, the data is still protected as long as the keys are safe. Understanding what cryptography can and cannot do is the first step to choosing the right tool.",
   "Cryptography supports four main security goals. Confidentiality keeps information secret from unauthorized people; encryption provides it by turning readable plaintext into unreadable ciphertext. Integrity ensures data has not been altered; hashes, message authentication codes and digital signatures detect changes. Authentication proves the identity of a user, device or message origin, for example by showing possession of a private key or a shared secret. Non-repudiation means a sender cannot credibly deny having sent a message or signed a document; it requires a digital signature made with a private key that only the signer controls, backed by a trusted certificate. Note that symmetric techniques alone cannot give non-repudiation, because both parties share the same key and either could have produced the message.",
   "Cryptography does not provide availability. In fact, lost keys can make data permanently unavailable, and ransomware abuses encryption for exactly that reason. It also does not fix weak access control: if an authorized account is compromised, the attacker sees decrypted data just like the real user.",
   "Data exists in three states, and each needs protection. Data at rest is stored on disks, databases, backups and removable media; full-disk encryption, file or database encryption, and encrypted backups protect it, especially against theft of devices. Data in transit moves across networks; protocols such as TLS, SSH and IPsec encrypt it to prevent eavesdropping and tampering. Data in use is being processed in memory by an application, where it is normally decrypted. Protecting it is harder; approaches include strict access control, memory protections, secure enclaves or trusted execution environments that isolate processing in hardware, and emerging techniques such as homomorphic encryption that compute on encrypted data.",
   "Some basic vocabulary helps with every later lesson. An algorithm or cipher is the mathematical procedure; the key is the secret input that makes the output unique. Kerckhoffs's principle says a system should remain secure even if everything about it except the key is public, which is why well-studied public algorithms are preferred over secret, homemade ones. Key length matters because longer keys make brute-force guessing impractical. Work factor describes the time and effort needed to break a cryptosystem."
  ],
  "terms": [
   [
    "Non-repudiation",
    "Assurance that a sender cannot deny sending a message, provided by a digital signature from a private key only the sender holds."
   ],
   [
    "Data at rest",
    "Stored data, such as on disks, databases and backups, typically protected by storage encryption."
   ],
   [
    "Data in use",
    "Data being actively processed in memory, protected by access control and technologies like trusted execution environments."
   ],
   [
    "Kerckhoffs's principle",
    "A cryptosystem should be secure even if everything except the key is publicly known."
   ]
  ],
  "example": "A clinic encrypts its laptops with full-disk encryption (at rest), uses TLS for its patient portal (in transit), and runs its billing analytics on a cloud service that processes records inside a hardware-isolated enclave (in use). When a laptop is stolen from a car, no patient data is exposed.",
  "tip": "If a question asks which goal only asymmetric cryptography can provide, the answer is non-repudiation. Encryption gives confidentiality; hashing gives integrity; neither alone proves who sent a message.",
  "check": [
   [
    "Why can't a shared symmetric key provide non-repudiation?",
    "Both parties hold the same key, so either could have created the message; you cannot prove which one did."
   ],
   [
    "Which state of data is hardest to protect with encryption and why?",
    "Data in use, because it normally must be decrypted in memory to be processed."
   ],
   [
    "Which security goal does cryptography not directly provide?",
    "Availability; lost keys can even destroy access to data."
   ]
  ]
 },
 {
  "t": "Symmetric (AES) vs asymmetric (RSA, ECC) and hybrid key exchange",
  "body": [
   "Symmetric cryptography uses one shared secret key for both encryption and decryption. It is fast and efficient, which makes it the workhorse for encrypting large amounts of data such as disks, files and network sessions. The Advanced Encryption Standard (AES) is the dominant symmetric algorithm today; it is a block cipher that works on 128-bit blocks and supports 128, 192 and 256-bit keys. Older symmetric algorithms you may see named include DES, which is broken because its key is too short, and 3DES, which is deprecated. Symmetric ciphers can also be stream ciphers, such as ChaCha20, which encrypt data as a continuous stream.",
   "The big problem with symmetric cryptography is key distribution: both parties need the same secret key, and you must get it to them securely. It also scales poorly. For every pair of people who want to communicate privately you need a separate key, so a group of n people needs n(n-1)/2 keys. One hundred users would need 4,950 keys.",
   "Asymmetric (public key) cryptography uses a mathematically linked key pair. The public key can be shared with anyone; the private key is kept secret by its owner. What one key encrypts, only the other can decrypt. To send someone a confidential message, you encrypt with their public key and only their private key can decrypt it. To sign a message, the sender uses their own private key, and anyone can verify with the public key. Each user needs only one key pair, so n users need 2n keys. RSA relies on the difficulty of factoring large numbers. Elliptic curve cryptography (ECC) relies on a different mathematical problem and gives comparable strength with much shorter keys, which makes it attractive for mobile and embedded devices. Diffie-Hellman is an asymmetric key agreement method that lets two parties derive a shared secret over an insecure channel without sending the secret itself.",
   "Asymmetric algorithms are far slower than symmetric ones, so they are rarely used to encrypt bulk data. That is why real systems use a hybrid approach. The asymmetric part solves key exchange and authentication; the symmetric part protects the data. In a TLS connection, for example, the client and server use an asymmetric key exchange such as elliptic curve Diffie-Hellman to agree on a random session key, the server proves its identity with its certificate and private key, and then all application data is encrypted with a symmetric cipher such as AES using that session key. Email encryption and file encryption tools work the same way: a random symmetric key encrypts the content, and that key is encrypted with each recipient's public key.",
   "For the exam, keep the strengths straight: symmetric is fast, good for bulk data, but has key distribution and scalability problems and no non-repudiation. Asymmetric solves distribution and enables digital signatures and non-repudiation, but is slow. Hybrid systems get the best of both."
  ],
  "terms": [
   [
    "AES",
    "Advanced Encryption Standard: a symmetric block cipher with a 128-bit block and 128, 192 or 256-bit keys."
   ],
   [
    "Public/private key pair",
    "Two linked keys in asymmetric cryptography; the public key is shared, the private key is kept secret."
   ],
   [
    "ECC",
    "Elliptic curve cryptography: asymmetric cryptography offering strong security with shorter keys than RSA."
   ],
   [
    "Hybrid cryptography",
    "Using asymmetric methods to exchange or protect a symmetric session key, which then encrypts the bulk data."
   ]
  ],
  "example": "When you visit a banking website, your browser and the server run an elliptic curve Diffie-Hellman exchange to agree on a session key, verify the server's certificate, then encrypt the whole session with AES. The slow asymmetric step happens once; the fast symmetric cipher does the rest.",
  "tip": "Know the key counts: symmetric needs n(n-1)/2 keys, asymmetric needs 2n. And remember which key does what: encrypt for confidentiality with the recipient's public key; sign with the sender's private key.",
  "check": [
   [
    "How many symmetric keys are needed for 10 users to communicate privately in pairs?",
    "10 x 9 / 2 = 45 keys."
   ],
   [
    "Why do protocols like TLS use a hybrid approach?",
    "Asymmetric cryptography securely establishes and authenticates a session key, while fast symmetric encryption protects the bulk data."
   ],
   [
    "Alice wants to send Bob a confidential message using asymmetric encryption. Which key does she use?",
    "Bob's public key, so only Bob's private key can decrypt it."
   ]
  ]
 },
 {
  "t": "Hashing, salting, HMAC and digital signatures",
  "body": [
   "A cryptographic hash function takes input of any size and produces a fixed-size output called a digest or hash. It is one-way: you cannot feasibly recover the input from the digest. It is deterministic: the same input always yields the same digest. And a tiny change to the input produces a completely different output, which makes hashes ideal for detecting changes. A good hash must also be collision resistant, meaning it is infeasible to find two different inputs with the same digest. The SHA-2 family (such as SHA-256 and SHA-512) and SHA-3 are current choices. MD5 and SHA-1 have practical collision attacks and should not be used for security purposes, though you still see them used for non-security checksums.",
   "Hashing is not encryption. There is no key and no way to decrypt. Its job is integrity: you publish or store the hash, and anyone can recompute it later to confirm the data is unchanged. Software downloads, forensic images and file integrity monitoring tools all rely on this.",
   "Password storage is a special case. Systems should never store passwords in plaintext or with reversible encryption; they store a hash. But plain hashes are vulnerable: identical passwords produce identical hashes, and attackers use precomputed tables (rainbow tables) or fast guessing. A salt is a unique random value generated for each password and combined with it before hashing, then stored alongside the hash. Salts make every hash unique and defeat precomputed tables. Good practice also uses deliberately slow, purpose-built password hashing or key-stretching functions such as bcrypt, scrypt, Argon2 or PBKDF2, which make each guess expensive. A pepper is an additional secret value kept separately from the database.",
   "A hash alone proves integrity only if the hash itself is protected; an attacker who changes a message can simply recompute the hash. A hash-based message authentication code (HMAC) solves this by mixing a shared secret key into the hash calculation. Only someone with the key can produce a valid HMAC, so it provides both integrity and authentication of the message origin. Because the key is shared, however, HMAC does not provide non-repudiation. HMACs are used in protocols like TLS and IPsec and for API request signing.",
   "A digital signature provides integrity, authentication and non-repudiation. The sender hashes the message, then signs that hash with their private key. The recipient uses the sender's public key to verify the signature and compares it with their own hash of the received message. If they match, the message was not altered and was signed by the holder of the private key. Certificates from a trusted authority bind the public key to an identity. Note that a signature does not provide confidentiality; if secrecy is needed, the message must also be encrypted."
  ],
  "terms": [
   [
    "Salt",
    "A unique random value added to each password before hashing so identical passwords yield different hashes and rainbow tables fail."
   ],
   [
    "HMAC",
    "A hash computed with a shared secret key, providing integrity and origin authentication but not non-repudiation."
   ],
   [
    "Collision",
    "Two different inputs that produce the same hash digest; a good hash makes collisions infeasible to find."
   ],
   [
    "Digital signature",
    "A hash of a message signed with the sender's private key, giving integrity, authentication and non-repudiation."
   ]
  ],
  "example": "A software vendor publishes an installer with a SHA-256 hash and signs the file with its code-signing private key. Your operating system verifies the signature with the vendor's public key from its certificate, confirming both that the file is unchanged and that it truly came from that vendor.",
  "tip": "Map tool to goal: hash for integrity; HMAC for integrity plus authentication with a shared key; digital signature for integrity, authentication and non-repudiation. Salting defends against rainbow tables, not against a weak password.",
  "check": [
   [
    "Which key does a sender use to create a digital signature, and which does the recipient use to verify it?",
    "The sender signs with their private key; the recipient verifies with the sender's public key."
   ],
   [
    "What attack does salting defeat?",
    "Precomputed hash lookups such as rainbow tables, because each password hash becomes unique."
   ],
   [
    "Why doesn't HMAC provide non-repudiation?",
    "Both parties share the secret key, so either could have generated the HMAC."
   ]
  ]
 },
 {
  "t": "Key management: generation, distribution, storage, rotation, escrow, destruction; HSM and TPM",
  "body": [
   "Strong algorithms are worthless if keys are weak, exposed or lost. Most real-world cryptographic failures are key management failures: keys hard-coded into source code, private keys copied onto shared drives, certificates that expire unnoticed. Key management covers the whole lifecycle of a key, and the exam expects you to know each stage.",
   "Generation. Keys must be created with a cryptographically secure random number generator and at an appropriate length for the algorithm. Predictable randomness has broken real systems. Keys should be generated in a secure environment, ideally inside the hardware that will use them so the private key never leaves it.",
   "Distribution. Symmetric keys need a secure channel: out-of-band delivery, key wrapping (encrypting a key with another key), or an asymmetric key exchange such as Diffie-Hellman. Public keys can be distributed openly but must be bound to the right identity, which is the job of certificates and PKI.",
   "Storage and use. Keys should be stored encrypted and separate from the data they protect, with strict access control and logging. Split knowledge and dual control reduce insider risk: no single person holds a whole master key, and sensitive operations need two authorized people. Keys should also have a single purpose; do not reuse an encryption key for signing.",
   "Rotation and expiration. Every key has a cryptoperiod, the time it is authorized for use. Rotating keys limits how much data is exposed if one is compromised and how much ciphertext an attacker can collect. Keys should also be revoked immediately if compromise is suspected, and certificates must be renewed before expiry.",
   "Escrow and recovery. Key escrow means a copy of a key is held by a trusted third party or internal recovery function so encrypted data can be recovered if the owner leaves or loses the key, or when legally required. It must be tightly controlled because it is a concentrated target. Key recovery agents in enterprise encryption tools serve the same purpose. Destruction ends the lifecycle: keys that are retired must be securely erased from all storage, including backups, and crypto-shredding (destroying the key) can make encrypted data unrecoverable when disposing of it.",
   "Two hardware components come up often. A hardware security module (HSM) is a dedicated, tamper-resistant device, often a network appliance or cloud service, that generates, stores and uses keys for many applications, such as certificate authorities, payment systems and databases; keys are used inside the HSM and are designed not to leave it in plaintext. A trusted platform module (TPM) is a chip built into a single computer's motherboard that stores keys for that device, supports measured or secure boot by recording boot component measurements, and protects disk encryption keys, for example for BitLocker. Cloud providers also offer key management services (KMS) backed by HSMs."
  ],
  "terms": [
   [
    "Cryptoperiod",
    "The authorized time span during which a specific key may be used before it must be rotated or retired."
   ],
   [
    "Key escrow",
    "Storing a copy of a key with a trusted party so data can be recovered if the original key is lost or access is legally required."
   ],
   [
    "HSM",
    "Hardware security module: a tamper-resistant device that securely generates, stores and uses keys for many systems."
   ],
   [
    "TPM",
    "Trusted platform module: a chip on a single device that protects its keys and supports secure or measured boot and disk encryption."
   ]
  ],
  "example": "A company stores its certificate authority's signing key in an HSM that requires two administrators with separate smart cards to activate it (dual control). Employee laptops use BitLocker with keys sealed in each TPM, and recovery keys are escrowed in the directory so the help desk can unlock a drive if a laptop's hardware changes.",
  "tip": "HSM versus TPM: an HSM serves many systems and applications and is often a separate appliance; a TPM is built into one device (as a chip or firmware) and protects that device. Dual control and split knowledge are the answers for preventing a single person from misusing a master key.",
  "check": [
   [
    "Why rotate keys even if no compromise is suspected?",
    "It limits the amount of data exposed if a key is later compromised and reduces the ciphertext available for attack."
   ],
   [
    "What is crypto-shredding?",
    "Securely destroying the encryption key so data encrypted with it becomes unrecoverable."
   ],
   [
    "Which hardware component supports measured boot on a laptop?",
    "The TPM, which records measurements of boot components and can seal keys to a known-good state."
   ]
  ]
 },
 {
  "t": "Secure protocols: TLS, SSH, IPsec, S/MIME, SFTP",
  "body": [
   "Many older network protocols, such as Telnet, FTP, HTTP and plain SMTP, send data and often passwords in cleartext. Anyone on the path can read or alter them. Secure protocols wrap communications in encryption and authentication. The exam expects you to know which secure protocol replaces which insecure one, what layer it works at, and its typical port.",
   "Transport Layer Security (TLS) protects application traffic over TCP. It is the successor to SSL, which is deprecated; TLS 1.2 and TLS 1.3 are the versions in current use, while older versions should be disabled. During the handshake the server presents a certificate, the parties agree on algorithms and derive session keys, then data is encrypted and integrity-protected. HTTPS is HTTP over TLS on port 443. TLS also secures email transfer (SMTP with STARTTLS or implicit TLS), IMAPS (993), POP3S (995) and LDAPS (636). Mutual TLS adds a client certificate so both sides authenticate.",
   "Secure Shell (SSH) on TCP port 22 provides encrypted remote command-line access, replacing Telnet and rlogin. It authenticates the server with a host key; the first time you connect you are asked to confirm its fingerprint, and a later change produces a warning that could indicate an on-path attack. Users authenticate with passwords or, better, with key pairs. SSH also supports port forwarding (tunneling) and underpins file transfer tools.",
   "SSH File Transfer Protocol (SFTP) runs over SSH, typically on port 22, and replaces FTP. Do not confuse it with FTPS, which is FTP secured with TLS and uses different ports and certificates. SCP is an older SSH-based copy tool.",
   "IPsec secures traffic at the network layer, so it protects all IP traffic between two points regardless of application. It is widely used for site-to-site and remote access VPNs. It uses Internet Key Exchange (IKE, UDP 500, with UDP 4500 for NAT traversal) to negotiate security associations and keys, and it can provide authentication and integrity with Authentication Header (AH) or confidentiality plus integrity with Encapsulating Security Payload (ESP). A later lesson covers its modes.",
   "Secure/Multipurpose Internet Mail Extensions (S/MIME) protects email messages end to end rather than the connection. It uses X.509 certificates to digitally sign messages (integrity, authentication, non-repudiation) and to encrypt them with the recipient's public key (confidentiality). Because it protects the message itself, it stays protected on mail servers, unlike TLS between servers, which only protects each hop. PGP and OpenPGP offer similar message-level protection with a different trust model.",
   "Other secure replacements worth knowing: SNMPv3 instead of SNMPv1/v2c for authenticated and encrypted network management, DNS over HTTPS or TLS for private name resolution, and SRTP for voice and video media."
  ],
  "terms": [
   [
    "TLS",
    "Transport Layer Security: encrypts and authenticates application traffic over TCP; HTTPS uses it on port 443."
   ],
   [
    "SSH",
    "Secure Shell: encrypted remote administration on TCP 22, replacing Telnet."
   ],
   [
    "SFTP vs FTPS",
    "SFTP transfers files over SSH; FTPS is traditional FTP secured with TLS."
   ],
   [
    "S/MIME",
    "A standard for signing and encrypting individual email messages with X.509 certificates."
   ]
  ],
  "example": "An admin audit finds switches managed via Telnet, a vendor exchange using FTP, and HR emailing salary data unprotected. The fixes: move management to SSH, switch the vendor to SFTP with key-based logins, and issue S/MIME certificates so HR messages are signed and encrypted end to end.",
  "tip": "TLS and IPsec protect the channel; S/MIME and PGP protect the message itself. If a question asks for email protection that persists after the message is stored on a server, pick S/MIME.",
  "check": [
   [
    "Which protocol should replace Telnet, and on what port does it run?",
    "SSH, on TCP port 22."
   ],
   [
    "What is the difference between SFTP and FTPS?",
    "SFTP is a file transfer subsystem of SSH; FTPS is FTP with TLS encryption added."
   ],
   [
    "At which layer does IPsec operate and why does that matter?",
    "The network layer, so it protects all IP traffic between endpoints regardless of the application."
   ]
  ]
 },
 {
  "t": "Forward secrecy and cipher suite choices",
  "body": [
   "Imagine an attacker records all of your organization's encrypted traffic for a year, then later steals the web server's private key. If the session keys were derived in a way that depends only on that long-term key, the attacker could go back and decrypt the whole archive. Forward secrecy, often called perfect forward secrecy (PFS), prevents this. With forward secrecy, each session uses a fresh, temporary key pair that is discarded afterward, so compromising the long-term key later does not reveal past session keys.",
   "Forward secrecy is achieved with ephemeral Diffie-Hellman key exchange: DHE (finite-field) or, more commonly, ECDHE (elliptic curve). The word ephemeral is the clue; the key agreement values exist only for one session. The server's long-term private key is used only to sign the exchange and prove identity, not to encrypt the session key. By contrast, older TLS configurations used RSA key transport, where the client encrypted the session secret with the server's RSA public key. That does not provide forward secrecy, which is why TLS 1.3 removed RSA key transport entirely and uses ephemeral (EC)DHE key exchange for its certificate-based handshakes.",
   "A cipher suite is the named combination of algorithms a TLS connection uses. In TLS 1.2 a suite name such as `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384` lists four parts: the key exchange (ECDHE), the authentication or signature algorithm (RSA, from the server certificate), the bulk encryption cipher and mode (AES-256 in GCM), and the hash used for integrity or key derivation (SHA-384). TLS 1.3 simplified suites to just the symmetric cipher and hash, because key exchange is always ephemeral and negotiated separately.",
   "Good cipher choices favor authenticated encryption modes such as AES-GCM or ChaCha20-Poly1305, which provide confidentiality and integrity together, and ephemeral key exchange. Weak choices to disable include NULL ciphers (no encryption), export-grade ciphers, RC4, DES and 3DES, MD5-based integrity, anonymous key exchange (no authentication, which enables on-path attacks), and the SSL protocols and early TLS versions. Removing weak options also prevents downgrade attacks, in which an attacker tampers with negotiation to force both sides onto the weakest option they share.",
   "In practice, administrators configure an ordered list of allowed protocols and suites on servers and load balancers, test with a scanner such as `nmap --script ssl-enum-ciphers` or an online TLS checker, and revisit the configuration periodically as algorithms age. Compatibility with old clients is the usual reason weak suites linger; the security team should document and time-limit any such exception. Keep an eye on future changes too, since organizations are beginning to plan for post-quantum key exchange."
  ],
  "terms": [
   [
    "Forward secrecy",
    "A property ensuring that compromise of a long-term private key does not expose past session keys."
   ],
   [
    "Ephemeral key exchange",
    "Key agreement (DHE or ECDHE) using temporary keys generated fresh for each session and then discarded."
   ],
   [
    "Cipher suite",
    "The named set of algorithms for key exchange, authentication, bulk encryption and hashing in a TLS session."
   ],
   [
    "Downgrade attack",
    "An attack that manipulates negotiation so parties use a weaker protocol version or cipher."
   ]
  ],
  "example": "A scan of a company's web server shows it still accepts TLS 1.0 and RSA key exchange suites. The team disables old protocol versions and non-ephemeral suites, leaving TLS 1.2 with ECDHE and AES-GCM plus TLS 1.3. A rescan confirms all remaining suites support forward secrecy.",
  "tip": "If a question mentions ephemeral, DHE or ECDHE, think forward secrecy. Static RSA key exchange does not provide it. In a suite name, the first part after TLS_ is the key exchange.",
  "check": [
   [
    "Why doesn't RSA key transport provide forward secrecy?",
    "The session secret is encrypted with the server's long-term RSA key, so anyone who later steals that key can decrypt recorded sessions."
   ],
   [
    "In TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256, what does RSA refer to?",
    "The authentication or signature algorithm used with the server's certificate."
   ],
   [
    "Name two cipher suite components that should be disabled.",
    "Examples include NULL or export ciphers, RC4, DES/3DES, MD5, and anonymous key exchange."
   ]
  ]
 },
 {
  "t": "PKI: CAs, certificates, CSRs, chain of trust, CRL and OCSP",
  "body": [
   "Public key cryptography has one big question: how do you know a public key really belongs to the person or server that claims it? Public key infrastructure (PKI) answers that with trusted third parties, digital certificates and processes for issuing and revoking them. PKI includes the people, policies, hardware and software that manage certificates through their lifecycle.",
   "A digital certificate, usually in the X.509 format, binds a public key to an identity. It contains the subject (for example a domain name or a person), the public key, the issuer, a serial number, validity dates, allowed key uses and extensions such as Subject Alternative Names (SANs) listing additional host names. The whole certificate is digitally signed by the certificate authority (CA) that issued it, so anyone who trusts the CA can verify it.",
   "The certificate authority vouches for identities. A registration authority (RA) may handle identity verification on the CA's behalf. To get a certificate, you generate a key pair and create a certificate signing request (CSR), which contains your public key and identifying information and is signed with your private key. You send the CSR, never the private key, to the CA. After validating your identity or domain control, the CA signs and returns the certificate. Validation levels differ: domain validation proves control of a domain, while organization and extended validation involve more checks of the requesting organization.",
   "The chain of trust links certificates together. At the top is a root CA whose self-signed certificate is preinstalled in operating system and browser trust stores. Root CAs are usually kept offline and sign intermediate CA certificates, which in turn issue end-entity (leaf) certificates for servers and users. When your browser connects, the server sends its leaf certificate plus intermediates; the browser verifies each signature up to a trusted root, and checks names, dates and allowed usage. A missing intermediate is a common cause of certificate errors.",
   "Certificates sometimes must be revoked before expiry, for example when a private key is compromised or a server is decommissioned. A certificate revocation list (CRL) is a signed list of revoked serial numbers the CA publishes periodically; clients download it, which can be large and slightly out of date. The Online Certificate Status Protocol (OCSP) lets a client ask a responder about one certificate in real time. OCSP stapling has the server fetch a signed, time-stamped OCSP response and attach it to the TLS handshake, which improves performance and privacy.",
   "Other terms: wildcard certificates cover all first-level subdomains of a domain; certificate pinning makes an application accept only specific certificates or keys; and self-signed certificates are fine for testing or internal use but are not trusted by others automatically. Tracking expiration dates is an operational must, as expired certificates cause outages."
  ],
  "terms": [
   [
    "CSR",
    "Certificate signing request: a message containing a public key and identity details sent to a CA to obtain a certificate."
   ],
   [
    "Chain of trust",
    "The path of signatures from an end-entity certificate through intermediate CAs to a trusted root."
   ],
   [
    "CRL",
    "Certificate revocation list: a CA-published list of serial numbers of revoked certificates."
   ],
   [
    "OCSP",
    "Online Certificate Status Protocol: a real-time query to check whether a single certificate has been revoked."
   ]
  ],
  "example": "An admin generates a key pair on a web server, creates a CSR for shop.example.com with two SANs, and submits it to a public CA. After domain validation the CA returns the certificate and an intermediate. The admin installs both and enables OCSP stapling, and browsers now show the site as trusted.",
  "tip": "The CSR carries the public key, never the private key. For revocation checks, CRL is a downloaded list and OCSP is a real-time per-certificate query; stapling moves the OCSP query to the server.",
  "check": [
   [
    "Why are root CAs typically kept offline?",
    "To protect the root private key; if it were compromised, every certificate chaining to it would be untrustworthy."
   ],
   [
    "What does a certificate signing request contain?",
    "The requester's public key and identity information, signed with the matching private key."
   ],
   [
    "What advantage does OCSP have over a CRL?",
    "It gives near real-time status for a single certificate without downloading a large, possibly stale list."
   ]
  ]
 },
 {
  "t": "Web of trust vs hierarchical trust",
  "body": [
   "Every system that uses public keys needs a way to decide which keys to believe. There are two main trust models, and the exam asks you to tell them apart and to know where each is used.",
   "Hierarchical trust is the model used by X.509 PKI. Trust flows from the top down: a small number of root certificate authorities are trusted by default because their certificates are built into operating systems and browsers. Roots sign intermediate CAs, and intermediates sign end-entity certificates. You trust a server's certificate because it chains to a root you trust. The model is centralized and scales well to billions of users who have never met, and it supports formal policies, audits, revocation infrastructure and legal accountability. Its weakness is concentration: a compromised or careless CA can issue fraudulent certificates that everyone trusts, and every relying party depends on the CA's operations. Controls such as certificate transparency logs, which publicly record issued certificates, help detect misissuance.",
   "The web of trust is the decentralized model used by PGP and OpenPGP (for example GnuPG). There is no central authority. Each user generates their own key pair and other users sign each other's public keys to vouch that the key truly belongs to that person, often after checking identity in person. When you receive a new key, you look at who has signed it. If people you trust have signed it, you may accept it. Users assign trust levels to others to decide how much their signatures count. Key signing parties, where people meet and verify each other's identities and fingerprints, are a traditional part of this model.",
   "The web of trust avoids dependence on any single organization and works well in small, tightly connected communities. However, it scales poorly, requires users to make careful trust decisions, and revocation is awkward because there is no central list: users must publish revocation certificates and others must fetch them. New users with no signatures are hard to trust at all.",
   "Some other trust arrangements appear in practice. In a bridge or cross-certification model, two separate PKIs trust each other by having their CAs sign each other's certificates, which is common when organizations or government agencies need to interoperate. Trust on first use (TOFU) is the model SSH uses by default: the first time you connect you accept the host key, and later connections alert you if it changes. It is simple but relies on that first connection not being intercepted.",
   "When choosing, organizations nearly always use hierarchical PKI for websites, internal authentication, S/MIME and code signing, because it supports central management and policy. Web of trust is more common among individuals and open source communities, for signing software releases and encrypting email between people who know each other."
  ],
  "terms": [
   [
    "Hierarchical trust",
    "A centralized model in which trust flows from root CAs through intermediates to end-entity certificates."
   ],
   [
    "Web of trust",
    "A decentralized model, used by PGP, where users sign each other's keys to vouch for their authenticity."
   ],
   [
    "Cross-certification",
    "Two CAs from separate PKIs sign each other's certificates to establish mutual trust."
   ],
   [
    "Trust on first use",
    "Accepting a key the first time it is seen and alerting if it later changes, as SSH does."
   ]
  ],
  "example": "An open source project signs its release files with a maintainer's PGP key. Other long-time contributors have signed that key after meeting the maintainer, so users who trust those contributors can trust the release. The same project's website, however, uses a TLS certificate from a public CA under the hierarchical model.",
  "tip": "PGP means web of trust; X.509 and CAs mean hierarchical. If a question asks which model has no central authority, the answer is web of trust.",
  "check": [
   [
    "What is the main scalability weakness of the web of trust?",
    "Trust depends on personal key signing relationships, which do not scale to large populations of strangers, and revocation is not centralized."
   ],
   [
    "What is the key risk of the hierarchical model?",
    "Centralization: a compromised or careless CA can issue certificates that all relying parties will trust."
   ],
   [
    "Which trust model does SSH use by default when you first connect to a host?",
    "Trust on first use: you accept the host key and are warned if it changes later."
   ]
  ]
 },
 {
  "t": "OSI and TCP/IP models, common ports and protocols, IPv4/IPv6",
  "body": [
   "Network models break communication into layers so that each layer does one job and relies on the one below it. Knowing the layers helps you place protocols, devices and attacks, and security questions often ask where something operates. The Open Systems Interconnection (OSI) model has seven layers: 1 Physical (cables, radio, signals), 2 Data Link (frames, MAC addresses, switches, ARP, VLANs), 3 Network (IP addressing and routing, routers, ICMP, IPsec), 4 Transport (TCP and UDP, ports), 5 Session (setting up and managing sessions), 6 Presentation (data formatting, encoding, and conceptually encryption), and 7 Application (protocols users' software speaks, such as HTTP, DNS and SMTP). A common memory aid from layer 1 up is Please Do Not Throw Sausage Pizza Away.",
   "The TCP/IP model, which the internet actually uses, has four layers: Network Access or Link (OSI 1-2), Internet (OSI 3), Transport (OSI 4) and Application (OSI 5-7). Data is encapsulated on the way down: application data gets a TCP or UDP header to become a segment or datagram, an IP header to become a packet, and a frame header and trailer at the link layer.",
   "TCP is connection-oriented and reliable. It starts with a three-way handshake (SYN, SYN-ACK, ACK), numbers and acknowledges data, retransmits lost segments and closes with FIN or aborts with RST. UDP is connectionless and faster, with no handshake or delivery guarantee, and is used for DNS queries, streaming, VoIP and many discovery protocols. Ports identify the service: well-known ports are 0-1023.",
   "Common ports to memorize: FTP 20/21, SSH/SFTP 22, Telnet 23, SMTP 25 (587 for submission), DNS 53 (UDP and TCP), DHCP 67/68, TFTP 69, HTTP 80, Kerberos 88, POP3 110, NTP 123, IMAP 143, SNMP 161/162, LDAP 389, HTTPS 443, SMB 445, syslog 514, LDAPS 636, IMAPS 993, POP3S 995, RADIUS 1812/1813, RDP 3389. Seeing an unexpected service on one of these ports during a scan is often your first clue something is wrong.",
   "IPv4 uses 32-bit addresses written as four decimal octets, such as 192.168.1.10. Its address space is exhausted, so private ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) are used internally with network address translation (NAT) at the edge. NAT hides internal addresses but is not a security control by itself. IPv6 uses 128-bit addresses written in hexadecimal groups separated by colons, such as 2001:db8::1, where a double colon compresses consecutive zero groups. IPv6 removes broadcast in favor of multicast, uses Neighbor Discovery Protocol instead of ARP, supports stateless address autoconfiguration, and was designed with IPsec support. The loopback is ::1 and link-local addresses start with fe80::.",
   "A security point: many networks run IPv6 by default even if administrators think they only use IPv4. If firewalls, monitoring and policies ignore IPv6, attackers may use it to bypass controls. Tunneling mechanisms that carry IPv6 over IPv4 can also slip past filters. Treat both stacks equally."
  ],
  "terms": [
   [
    "Encapsulation",
    "Wrapping data with each layer's header as it moves down the stack, creating segments, packets and frames."
   ],
   [
    "Three-way handshake",
    "The SYN, SYN-ACK, ACK exchange that establishes a TCP connection."
   ],
   [
    "NAT",
    "Network address translation: mapping private internal addresses to public addresses at the network edge."
   ],
   [
    "IPv6",
    "The 128-bit successor to IPv4, written in hexadecimal and using Neighbor Discovery instead of ARP."
   ]
  ],
  "example": "Reviewing firewall logs, an analyst sees inbound connection attempts to TCP 3389 and TCP 23 from the internet. She recognizes RDP and Telnet, confirms neither should be exposed, and also discovers that the firewall policy has no IPv6 rules at all, so she adds matching IPv6 deny rules.",
  "tip": "Know which layer devices work at: switches at layer 2, routers at layer 3, and application proxies and WAFs at layer 7. ARP sits at layer 2 and is replaced by NDP in IPv6.",
  "check": [
   [
    "Which OSI layer handles logical addressing and routing?",
    "Layer 3, the Network layer."
   ],
   [
    "Which ports do SMB, RDP and LDAPS use?",
    "SMB uses TCP 445, RDP uses TCP 3389, and LDAPS uses TCP 636."
   ],
   [
    "Why can unmanaged IPv6 be a security risk on an IPv4-focused network?",
    "Hosts may communicate over IPv6 paths that firewalls and monitoring do not inspect, bypassing controls."
   ]
  ]
 },
 {
  "t": "Network attacks: ARP poisoning, DNS poisoning, DoS/DDoS, SYN flood, on-path, spoofing",
  "body": [
   "Many network attacks exploit protocols that were designed for trust, not hostility. As a practitioner you need to recognize the signs of each, understand the weakness it abuses, and know the matching defenses covered in the next lesson.",
   "Spoofing means faking an identity: a source IP address, MAC address, email sender or DNS response. IP spoofing is easy for one-way traffic such as UDP floods because the attacker does not need replies. MAC spoofing lets a device impersonate another on a switch or bypass MAC-based filters. Spoofing is often a building block for the other attacks below.",
   "ARP poisoning (ARP spoofing) targets the Address Resolution Protocol, which maps IP addresses to MAC addresses on a local network. ARP has no authentication, and hosts accept unsolicited replies. An attacker on the same network segment sends forged ARP replies claiming that the gateway's IP address belongs to the attacker's MAC address. Victims then send traffic to the attacker, who can read, alter or drop it before forwarding. Signs include duplicate MAC addresses for different IPs in ARP tables and alerts from tools that monitor ARP changes.",
   "DNS poisoning (cache poisoning) corrupts the answers a DNS resolver stores so that users asking for a legitimate domain are sent to an attacker's IP address. Attackers may race forged responses against the real ones, compromise a DNS server, or tamper with a host's local hosts file (sometimes called pharming when used to redirect to fake sites). Users see the correct name in the address bar but reach the wrong server, which is why certificate warnings matter.",
   "An on-path attack, formerly called man-in-the-middle, places the attacker between two parties so they can intercept or modify communications. ARP poisoning, DNS poisoning, rogue Wi-Fi access points and malicious proxies are common ways to get on path. SSL stripping downgrades a victim's HTTPS connection to HTTP. Replay attacks capture valid traffic, such as an authentication exchange, and resend it later.",
   "Denial of service (DoS) attacks aim at availability, exhausting bandwidth, connection tables, CPU or application resources. A distributed denial of service (DDoS) uses many sources, usually a botnet of compromised devices, which makes simple IP blocking ineffective. Amplification and reflection attacks spoof the victim's address in small requests to services such as open DNS resolvers or NTP servers, which send much larger replies to the victim. Application-layer floods send many expensive but legitimate-looking requests, such as searches.",
   "A SYN flood is a specific DoS against TCP. The attacker sends many SYN packets, often with spoofed source addresses, but never completes the handshake. The server allocates resources for each half-open connection and waits for the final ACK, until its backlog fills and real users cannot connect. The telltale sign is a large number of connections in the SYN_RECEIVED state, visible with `netstat` or `ss`."
  ],
  "terms": [
   [
    "ARP poisoning",
    "Sending forged ARP replies to link the attacker's MAC address with another host's IP, redirecting local traffic."
   ],
   [
    "DNS cache poisoning",
    "Inserting false records into a DNS resolver's cache so users are sent to attacker-controlled addresses."
   ],
   [
    "On-path attack",
    "An attacker positioned between two parties to intercept, read or modify their communications."
   ],
   [
    "SYN flood",
    "A DoS attack that sends many SYNs without completing the handshake, filling the server's half-open connection backlog."
   ]
  ],
  "example": "Users on one office floor report certificate warnings when visiting internal sites. An analyst checks a workstation's ARP table and finds the default gateway's IP mapped to the MAC address of an unknown laptop plugged into a meeting room port, a classic sign of ARP poisoning enabling an on-path attack.",
  "tip": "ARP attacks are local (same broadcast domain, layer 2); DNS poisoning can redirect users anywhere. Distributed and botnet point to DDoS; half-open connections point to SYN flood; spoofed small requests producing big replies point to amplification.",
  "check": [
   [
    "Why is ARP easy to poison?",
    "It has no authentication, and hosts accept unsolicited ARP replies and update their caches."
   ],
   [
    "What state would you see many connections in during a SYN flood?",
    "SYN_RECEIVED (half-open), waiting for the final ACK that never arrives."
   ],
   [
    "Why is blocking a single source IP ineffective against DDoS?",
    "The traffic comes from many distributed sources, often thousands of compromised devices."
   ]
  ]
 },
 {
  "t": "Countermeasures: DAI, DNSSEC, SYN cookies, rate limiting",
  "body": [
   "Each network attack from the previous lesson has specific countermeasures. The exam likes to pair an attack with its best technical fix, so learn the pairings and why they work, and remember that layered defenses (defense in depth) are better than any single control.",
   "Dynamic ARP Inspection (DAI) is a switch feature that defends against ARP poisoning. The switch intercepts ARP packets on untrusted ports and checks each IP-to-MAC binding against a trusted database, usually the DHCP snooping binding table, which the switch builds by watching DHCP leases. ARP packets that do not match are dropped and logged. DHCP snooping itself also blocks rogue DHCP servers by allowing DHCP offers only from trusted ports. For critical hosts, static ARP entries are a simpler but less scalable option, and port security limits which MAC addresses can appear on a port.",
   "DNSSEC (DNS Security Extensions) defends against DNS spoofing and cache poisoning by adding digital signatures to DNS records. Zone owners sign their records, and validating resolvers verify the signatures up a chain of trust to the signed root zone. A forged response will not have a valid signature, so the resolver rejects it. DNSSEC provides integrity and origin authentication for DNS data, but not confidentiality; queries are still visible unless you also use DNS over TLS or HTTPS. Other DNS defenses include randomizing source ports and query IDs, restricting recursion to internal clients, and keeping resolvers patched.",
   "SYN cookies defend against SYN floods. Instead of allocating memory for every incoming SYN, the server encodes the connection details into the initial sequence number of its SYN-ACK. It stores nothing until the client returns a valid ACK, from which the server can reconstruct the connection. Spoofed SYNs never return an ACK, so they consume no backlog space. Other SYN flood defenses include larger backlogs, shorter timeouts, and firewalls or load balancers that proxy the handshake.",
   "Rate limiting caps how many requests, connections or packets a source can send in a period. It is used on firewalls, routers, load balancers, web servers, APIs and login pages. It slows DoS floods, brute-force password attempts and scraping, while legitimate users stay below the limits. For large DDoS attacks, organizations add upstream scrubbing services or content delivery networks that absorb traffic before it reaches their link, plus ISP-level filtering.",
   "Anti-spoofing filtering supports all of these. Ingress filtering drops packets arriving from the internet with internal or impossible source addresses; egress filtering ensures traffic leaving your network carries only your own addresses, so your hosts cannot take part in spoofed attacks. Encrypting and authenticating traffic with TLS, SSH or IPsec reduces the value of on-path positions, since the attacker cannot read or silently alter protected sessions."
  ],
  "terms": [
   [
    "Dynamic ARP Inspection",
    "A switch feature that drops ARP packets whose IP-to-MAC bindings do not match the DHCP snooping table."
   ],
   [
    "DNSSEC",
    "Extensions that digitally sign DNS records so resolvers can verify their integrity and origin."
   ],
   [
    "SYN cookies",
    "A technique that encodes connection state into the SYN-ACK sequence number so no resources are held for half-open connections."
   ],
   [
    "Egress filtering",
    "Blocking outbound traffic with source addresses that do not belong to your network, preventing participation in spoofed attacks."
   ]
  ],
  "example": "After an ARP poisoning incident, the network team enables DHCP snooping and DAI on all access switches. Two weeks later the switch logs dropped ARP packets from a contractor's laptop that was running a misconfigured tool, and the security team contacts the contractor before any traffic is intercepted.",
  "tip": "Pairings to remember: ARP poisoning - DAI; DNS poisoning - DNSSEC; SYN flood - SYN cookies; floods and brute force - rate limiting. DNSSEC gives integrity, not confidentiality.",
  "check": [
   [
    "What table does DAI usually rely on to validate ARP packets?",
    "The DHCP snooping binding table of IP-to-MAC-to-port mappings."
   ],
   [
    "Does DNSSEC encrypt DNS queries?",
    "No. It signs records for integrity and authenticity; confidentiality requires DNS over TLS or HTTPS."
   ],
   [
    "How do SYN cookies prevent backlog exhaustion?",
    "The server keeps no state for a SYN until a valid ACK returns, reconstructing the connection from the cookie in the sequence number."
   ]
  ]
 },
 {
  "t": "Network access control: 802.1X, RADIUS/TACACS+, NAC posture checks, port security",
  "body": [
   "Network access control decides which devices and users may connect to a network and what they can reach once connected. Without it, anyone who plugs into a wall jack or learns a Wi-Fi password is on the inside. The main building blocks are 802.1X authentication, a central AAA server, posture checks and switch port security.",
   "IEEE 802.1X is port-based network access control, used on both wired switches and enterprise Wi-Fi. There are three roles. The supplicant is the software on the client device that requests access. The authenticator is the switch or wireless access point, which blocks all traffic except authentication messages until the client is approved. The authentication server, usually a RADIUS server, checks the credentials. Authentication messages use the Extensible Authentication Protocol (EAP); common methods include EAP-TLS, which uses certificates on both sides and is the strongest, and PEAP, which uses a server certificate and a password inside a protected tunnel. After success, the switch opens the port, and the server can assign a VLAN or access list.",
   "RADIUS (Remote Authentication Dial-In User Service) is an open standard AAA protocol that provides authentication, authorization and accounting. It runs over UDP (1812 for authentication, 1813 for accounting), combines authentication and authorization in one exchange, and encrypts only the password in the access request. It is the usual choice for network access: 802.1X, VPNs and Wi-Fi. TACACS+ (Terminal Access Controller Access-Control System Plus) was developed by Cisco and runs over TCP 49. It encrypts the entire payload and separates authentication, authorization and accounting, which allows fine-grained, per-command authorization. That makes it popular for administering network devices, where you want to control and log exactly which commands each admin runs. Diameter is a newer AAA protocol used mainly in mobile carrier networks.",
   "Network access control (NAC) products extend authentication with posture assessment: checking the health of a device before and during access. Checks can include whether antimalware is running and current, the operating system is patched, the disk is encrypted, and the host firewall is on. Compliant devices get normal access; non-compliant ones are placed in a quarantine or remediation VLAN where they can reach only update servers. NAC can use persistent agents installed on managed devices, dissolvable agents that run once, or agentless checks. Guest devices are usually sent to a separate guest network.",
   "Port security is a simpler switch-level control. It limits the number of MAC addresses allowed on a port, can learn and stick to specific addresses, and triggers an action such as shutdown or restrict if a violation occurs. It stops casual connection of unauthorized devices and MAC flooding, but MAC addresses can be spoofed, so it is weaker than 802.1X. Disabling unused ports and placing them in an unused VLAN is another basic hardening step."
  ],
  "terms": [
   [
    "802.1X",
    "Port-based network access control in which a supplicant authenticates through an authenticator to an authentication server before traffic is allowed."
   ],
   [
    "RADIUS",
    "An AAA protocol over UDP that combines authentication and authorization and encrypts only the password."
   ],
   [
    "TACACS+",
    "A Cisco-developed AAA protocol over TCP 49 that encrypts the full payload and separates authentication, authorization and accounting."
   ],
   [
    "Posture assessment",
    "Checking a device's security state, such as patches and antimalware, before granting network access."
   ]
  ],
  "example": "A university enables 802.1X with EAP-TLS on dorm and office switches. Managed laptops present certificates and pass NAC posture checks to join the staff VLAN; a laptop with outdated antimalware lands in a remediation VLAN until it updates. Network engineers log into switches through TACACS+, so every configuration command is authorized and recorded.",
  "tip": "RADIUS: UDP, combines authN and authZ, encrypts only the password, typical for user network access. TACACS+: TCP, encrypts everything, separates the three A's, typical for device administration.",
  "check": [
   [
    "Name the three roles in 802.1X.",
    "Supplicant (client), authenticator (switch or access point) and authentication server (usually RADIUS)."
   ],
   [
    "Why might an organization choose TACACS+ for router administration?",
    "It encrypts the whole session and supports per-command authorization and accounting."
   ],
   [
    "What happens to a device that fails a NAC posture check?",
    "It is typically placed in a quarantine or remediation network with access limited to what it needs to become compliant."
   ]
  ]
 },
 {
  "t": "Segmentation: VLANs, DMZ/screened subnets, micro-segmentation, zero trust",
  "body": [
   "Segmentation divides a network into smaller zones with controlled paths between them. The goal is to contain damage: if one area is compromised, the attacker cannot freely move laterally to everything else. Segmentation also makes monitoring easier and supports compliance, for example by isolating payment card systems to reduce audit scope.",
   "A virtual LAN (VLAN) logically separates devices on the same physical switches into different broadcast domains at layer 2. Devices in different VLANs cannot talk directly; traffic must pass through a router or layer 3 switch, where access control lists or a firewall can filter it. VLANs are cheap and flexible, but they are a separation mechanism, not a full security boundary on their own. VLAN hopping attacks, such as switch spoofing (tricking a port into trunking) and double tagging, can let traffic cross VLANs. Defenses include disabling automatic trunk negotiation on access ports, setting the native VLAN to an unused ID, and not placing user devices in the native VLAN.",
   "A DMZ, now often called a screened subnet, is a network zone between the internet and the internal network that hosts public-facing services such as web servers, mail relays and DNS. Firewalls allow the internet to reach only specific DMZ services, and allow the DMZ only tightly limited connections into the internal network. If a public server is compromised, the attacker is still outside the internal zone. Designs use either one firewall with three interfaces (internet, DMZ, internal) or two firewalls in sequence, ideally from different vendors for diversity. Other zone types include extranets for partners and isolated guest networks.",
   "Micro-segmentation applies policy at a much finer level, often per workload or even per application process, instead of per subnet. It is typically enforced by software: hypervisor-based distributed firewalls, host firewalls controlled centrally, or cloud security groups. Rules describe which workloads may talk to which, on which ports. It limits east-west traffic, the traffic between servers inside the data center, which traditional perimeter firewalls never saw.",
   "Zero trust is a security model built on the idea that no user, device or network location is trusted by default. Being inside the corporate network grants nothing. Every access request is authenticated, authorized and continuously evaluated based on identity, device health and context, and access is granted with least privilege to a specific resource rather than to a whole network. Common components include strong identity and multifactor authentication, a policy decision point and policy enforcement points, micro-segmentation, encryption everywhere, and extensive logging. Zero trust network access (ZTNA) products often replace broad VPN access with per-application access.",
   "In a lab you might create two VLANs on a switch or virtual switch, route between them with a firewall VM, and write rules that allow only specific traffic, observing that everything else is blocked."
  ],
  "terms": [
   [
    "VLAN",
    "A logical layer 2 broadcast domain that separates devices on shared switches; inter-VLAN traffic must be routed."
   ],
   [
    "Screened subnet (DMZ)",
    "A zone between the internet and internal network that hosts public-facing services behind firewall rules."
   ],
   [
    "Micro-segmentation",
    "Fine-grained, often workload-level, network policy that restricts east-west traffic between systems."
   ],
   [
    "Zero trust",
    "A model where no request is trusted based on network location; every access is verified with least privilege and continuous evaluation."
   ]
  ],
  "example": "A retailer places its web servers in a screened subnet, isolates point-of-sale terminals in their own VLAN reachable only by the payment servers, and uses micro-segmentation in its virtual data center so the HR database accepts connections only from the HR application servers on one port.",
  "tip": "East-west traffic is controlled by micro-segmentation; north-south traffic crosses the perimeter. Zero trust answers questions like never trust, always verify, or access decisions based on identity rather than network location.",
  "check": [
   [
    "Why are VLANs alone not a strong security boundary?",
    "They separate traffic logically, but misconfigurations allow VLAN hopping, and they do not filter traffic without routers or firewalls."
   ],
   [
    "What belongs in a screened subnet?",
    "Public-facing services such as web, mail relay and external DNS servers."
   ],
   [
    "What does zero trust say about devices on the internal network?",
    "They receive no implicit trust; each access must be authenticated, authorized and evaluated."
   ]
  ]
 },
 {
  "t": "VPNs and IPsec (AH vs ESP, tunnel vs transport)",
  "body": [
   "A virtual private network (VPN) creates an encrypted tunnel across an untrusted network, usually the internet, so that traffic is protected as if it traveled over a private link. Site-to-site VPNs connect whole networks, such as a branch office to headquarters, using gateways at each end; users are unaware of them. Remote access VPNs connect individual users' devices to the corporate network through client software. Common technologies include IPsec, TLS-based VPNs (often called SSL VPNs, which can work through a browser or client) and newer protocols such as WireGuard.",
   "A key design choice for remote access is split tunneling. In a full tunnel, all the user's traffic goes through the VPN, so corporate security controls inspect everything, at the cost of bandwidth. In a split tunnel, only traffic for corporate networks goes through the VPN and everything else goes directly to the internet, which is efficient but means internet traffic bypasses corporate controls. Always-on VPN connects automatically whenever the device has network access.",
   "IPsec is a suite of protocols at the network layer. It uses Internet Key Exchange (IKE, now IKEv2) to authenticate the peers, with pre-shared keys or certificates, and to negotiate security associations (SAs). An SA is a one-way agreement on algorithms and keys, so a two-way connection needs a pair. IKE runs on UDP 500, and NAT traversal encapsulates traffic in UDP 4500.",
   "IPsec has two protocols. Authentication Header (AH), IP protocol 51, provides integrity, data origin authentication and anti-replay protection, but no encryption. It also protects parts of the outer IP header, which means it breaks when NAT changes addresses. Encapsulating Security Payload (ESP), IP protocol 50, provides confidentiality through encryption, plus integrity, authentication and anti-replay. Because ESP does everything most organizations need and works with NAT traversal, it is by far the most commonly used; AH is rare in practice.",
   "IPsec also has two modes. Transport mode protects only the payload of the original IP packet and keeps the original IP header, so it is used for end-to-end protection between two hosts. Tunnel mode encrypts the entire original packet, header included, and wraps it in a new IP header with the gateways' addresses. That hides internal addresses and is used for site-to-site VPNs between gateways and for most remote access. Combining terms, a typical site-to-site VPN is ESP in tunnel mode.",
   "Operationally, VPN gateways are high-value targets exposed to the internet, so they need prompt patching, multifactor authentication for remote users, strong cipher configuration and logging of connections. Many organizations are adding zero trust network access alongside or instead of VPNs to limit what a connected user can reach."
  ],
  "terms": [
   [
    "AH",
    "Authentication Header: IPsec protocol providing integrity, origin authentication and anti-replay, without encryption."
   ],
   [
    "ESP",
    "Encapsulating Security Payload: IPsec protocol providing encryption plus integrity and authentication."
   ],
   [
    "Tunnel mode",
    "IPsec mode that encapsulates and protects the whole original packet inside a new IP header, used between gateways."
   ],
   [
    "Split tunneling",
    "Sending only corporate-bound traffic through the VPN while other traffic goes directly to the internet."
   ]
  ],
  "example": "A company links its three branch offices to headquarters with IPsec site-to-site VPNs using IKEv2 with certificates, ESP and tunnel mode on each firewall. Remote staff use an always-on client VPN with MFA and a full tunnel so their web browsing still passes through the corporate secure web gateway.",
  "tip": "AH authenticates but never encrypts; ESP encrypts. Transport mode protects the payload between hosts; tunnel mode protects the whole packet between gateways. If a question needs confidentiality, AH is never the answer.",
  "check": [
   [
    "Which IPsec protocol provides confidentiality?",
    "ESP; AH provides only integrity and authentication."
   ],
   [
    "Why is tunnel mode used for site-to-site VPNs?",
    "It encrypts the entire original packet, including internal addresses, and adds a new header addressed between the gateways."
   ],
   [
    "What is the security drawback of split tunneling?",
    "Internet-bound traffic bypasses corporate security controls such as web filtering and monitoring."
   ]
  ]
 },
 {
  "t": "Security devices: firewalls (packet, stateful, NGFW, WAF), IDS/IPS, proxies, load balancers",
  "body": [
   "Network security devices enforce policy and give visibility at key points in the network. The exam expects you to know what each device inspects, at which layer, and when to choose one over another.",
   "A packet-filtering firewall examines each packet on its own, checking header fields such as source and destination IP, protocol and port against an access control list. It is fast and simple but has no memory of connections, so it cannot tell whether an inbound packet is a legitimate reply, and it cannot see application content. Router ACLs are a common example. A stateful firewall tracks connection state in a state table. It knows that an inbound packet belongs to a session a trusted host started and allows it, while dropping unsolicited packets that do not match. Stateful inspection is the baseline for most firewalls today.",
   "A next-generation firewall (NGFW) adds deep packet inspection up to the application layer. It can identify applications regardless of port, apply rules per user or group by integrating with directory services, decrypt and inspect TLS traffic, and include intrusion prevention, URL filtering and threat intelligence. A web application firewall (WAF) is specialized for HTTP and HTTPS traffic to web applications. It sits in front of the web servers and inspects requests for attacks such as SQL injection, cross-site scripting and malicious bots, using signatures, rules and anomaly detection. A WAF protects applications; a network firewall protects networks.",
   "An intrusion detection system (IDS) monitors traffic and alerts on suspicious activity but does not block it. It is usually connected out of band, through a switch mirror port (SPAN) or network tap, so it cannot disrupt traffic. An intrusion prevention system (IPS) sits inline and can drop malicious traffic in real time, which means a false positive can block legitimate traffic and a failure can interrupt service, so you decide whether it fails open or closed. Both use signature-based detection, which matches known attack patterns and misses new ones, and anomaly or behavior-based detection, which compares traffic to a baseline and can catch novel attacks but produces more false positives. Host-based versions (HIDS/HIPS) run on individual systems.",
   "A proxy server acts on behalf of clients or servers. A forward proxy sits in front of users, making requests to the internet for them; it can filter URLs, cache content, scan downloads and log activity. A reverse proxy sits in front of servers, receiving requests from the internet and passing them to internal servers; it hides server details, can terminate TLS, and often provides WAF and caching functions. A transparent proxy intercepts traffic without client configuration.",
   "A load balancer distributes incoming requests across multiple servers to improve availability and performance. It performs health checks and removes failed servers from rotation, supports scheduling methods such as round-robin or least connections, and can maintain session persistence. Load balancers help absorb traffic spikes and some DoS, often terminate TLS, and are a natural place to enforce strong cipher suites. Active-active and active-passive pairs remove the load balancer itself as a single point of failure."
  ],
  "terms": [
   [
    "Stateful firewall",
    "A firewall that tracks connection state and allows return traffic only for established sessions."
   ],
   [
    "WAF",
    "Web application firewall: inspects HTTP/HTTPS requests to protect web applications from attacks like SQL injection and XSS."
   ],
   [
    "IDS vs IPS",
    "An IDS detects and alerts out of band; an IPS sits inline and can block traffic."
   ],
   [
    "Reverse proxy",
    "A server that accepts client requests on behalf of internal servers, hiding them and often terminating TLS."
   ]
  ],
  "example": "An e-commerce company routes internet traffic through an NGFW, then a load balancer that terminates TLS and spreads requests across four web servers behind a WAF. An IDS connected to a SPAN port watches internal traffic, while an inline IPS on the NGFW blocks known exploit signatures.",
  "tip": "Inline and blocks means IPS; passive and alerts means IDS. If the question is about protecting a web application from injection, choose a WAF rather than a generic firewall.",
  "check": [
   [
    "What can a stateful firewall do that a packet filter cannot?",
    "Track connection state and allow reply traffic only when it belongs to an established session."
   ],
   [
    "Why might an IPS cause an outage when an IDS would not?",
    "The IPS is inline and can block legitimate traffic on a false positive or interrupt traffic if it fails closed."
   ],
   [
    "What is the difference between a forward and a reverse proxy?",
    "A forward proxy acts for internal clients going out; a reverse proxy acts for servers receiving requests from outside."
   ]
  ]
 },
 {
  "t": "Firewall rule design and implicit deny",
  "body": [
   "A firewall is only as good as its rule base. Poorly designed rules, such as broad allow-all entries, forgotten temporary exceptions and conflicting rules, are one of the most common causes of exposure. Good rule design follows a few consistent principles.",
   "Implicit deny, also called default deny, means that any traffic not explicitly permitted is blocked. Most firewalls process rules from the top down and apply the first rule that matches. If nothing matches, the final rule, often invisible, denies the traffic. Many administrators add an explicit deny-all rule at the bottom anyway so that denied traffic is logged and the intent is obvious. The opposite approach, default allow with a list of blocked items, fails whenever you forget to block something new, which is why default deny is the secure choice. It is least privilege applied to the network.",
   "Because rules are evaluated in order, rule placement matters. More specific rules must come before broader ones; otherwise a general rule matches first and the specific one never takes effect, a condition called shadowing. For example, if an allow rule for the whole server subnet sits above a deny rule for one sensitive server, the deny will never be reached. Busy, frequently matched rules can be placed higher for performance, but only if doing so does not change the security outcome.",
   "Each rule should be as specific as possible: named source and destination addresses or groups, the exact protocol and port, and, on NGFWs, the application and user. Avoid `any` in source, destination or service fields unless there is a justified reason. Apply rules in both directions: ingress rules control what comes in, and egress rules control what leaves, which can stop malware from calling home and prevents data exfiltration over unexpected ports. For example, only the mail servers should send SMTP to the internet and only the DNS resolvers should send DNS.",
   "```text\n1 allow  tcp  any          -> 203.0.113.10  443   (public web)\n2 allow  tcp  10.1.5.0/24  -> 10.1.9.20     1433  (app to DB)\n3 allow  udp  10.1.1.53    -> any           53    (resolver out)\n4 deny   ip   any          -> any                 (log)\n```",
   "Rule management is as important as rule writing. Every rule should have a documented business owner, a justification and ideally a ticket number or change request in its comment. Changes go through change management. Review the rule base periodically to remove unused, redundant, shadowed or expired rules; many firewalls show hit counts that reveal rules nobody uses. Temporary rules should have expiration dates. Back up configurations and log denied traffic, and send logs to the SIEM so you can spot scanning and blocked exfiltration attempts."
  ],
  "terms": [
   [
    "Implicit deny",
    "The default behavior of blocking any traffic that no rule explicitly permits."
   ],
   [
    "First-match processing",
    "Rules are evaluated top down and the first matching rule decides the action."
   ],
   [
    "Shadowed rule",
    "A rule that never takes effect because a broader rule above it always matches first."
   ],
   [
    "Egress filtering",
    "Rules controlling outbound traffic to limit what internal hosts can send out."
   ]
  ],
  "example": "During a quarterly review, an analyst finds an allow rule from a finished vendor project that still permits RDP from any address to a file server, plus a deny rule for a finance server that is shadowed by a broader allow above it. She removes the stale rule, moves the deny above the broad allow, and adds expiry dates to remaining temporary rules.",
  "tip": "Order matters: specific before general, and the implicit deny sits at the end. If a question describes a rule that never triggers, think shadowing by an earlier, broader rule.",
  "check": [
   [
    "What happens to traffic that matches no rule on a default-deny firewall?",
    "It is blocked by the implicit (or explicit) deny at the end of the rule base."
   ],
   [
    "Why add an explicit deny-all rule when the firewall already denies implicitly?",
    "To log denied traffic and make the policy's intent clear."
   ],
   [
    "Why are egress rules important?",
    "They limit what compromised hosts can send out, such as malware callbacks and data exfiltration."
   ]
  ]
 },
 {
  "t": "Wireless security: WPA2/WPA3, enterprise vs personal, rogue APs and evil twins",
  "body": [
   "Wireless networks broadcast beyond walls, so anyone nearby can try to listen or connect. Wireless security therefore depends on strong encryption and authentication, plus monitoring for unauthorized access points. The exam covers the protocol generations, the two authentication modes and the main wireless attacks.",
   "Older protocols are broken. WEP (Wired Equivalent Privacy) used a flawed RC4 implementation with short initialization vectors and can be cracked quickly. WPA was an interim fix using TKIP and is also deprecated. WPA2 uses AES through CCMP (AES in CCM mode) for strong encryption and has been the long-running standard. Its main weakness in personal mode is that an attacker who captures the four-way handshake can run offline guessing attacks against the passphrase, so weak passphrases fall quickly. The KRACK vulnerability against the handshake was addressed by patches.",
   "WPA3 improves on WPA2. In personal mode it replaces the pre-shared key handshake with Simultaneous Authentication of Equals (SAE), which resists offline dictionary attacks and provides forward secrecy. It requires Protected Management Frames, which makes deauthentication attacks harder. WPA3-Enterprise offers an optional higher-strength 192-bit security mode, and Enhanced Open (Opportunistic Wireless Encryption) encrypts traffic on open networks such as cafes without a password. Transition modes allow WPA2 and WPA3 clients on the same network but keep some WPA2 weaknesses.",
   "Personal versus enterprise is about authentication. Personal mode (PSK or SAE) uses one shared passphrase for everyone. It is simple, suitable for homes and small offices, but everyone knows the key, and revoking one person's access means changing it for all. Enterprise mode uses 802.1X with a RADIUS server, so each user or device authenticates with its own credentials or certificate, access can be revoked individually, and each session gets its own keys. EAP-TLS with certificates is the strongest option. Organizations should use enterprise mode.",
   "A rogue access point is any unauthorized AP connected to the network, whether an employee's convenience router plugged into a desk jack or an attacker's device. It bypasses perimeter controls and often has weak security. An evil twin is a malicious AP that imitates a legitimate network by broadcasting the same SSID, often with a stronger signal, to trick clients into connecting so the attacker can perform on-path attacks or capture credentials through fake login portals. Attackers may send deauthentication frames to push clients off the real AP and onto the twin.",
   "Defenses include a wireless intrusion detection or prevention system (WIDS/WIPS) that scans for unknown APs and SSID impersonation, regular site surveys, 802.1X on wired ports so rogue APs cannot get network access, enterprise authentication with server certificate validation on clients (so they refuse a twin without the right certificate), protected management frames, and user training to use a VPN on untrusted networks. Also avoid WPS (Wi-Fi Protected Setup) PIN mode, which is vulnerable to brute force."
  ],
  "terms": [
   [
    "SAE",
    "Simultaneous Authentication of Equals: WPA3-Personal handshake that resists offline dictionary attacks."
   ],
   [
    "WPA2/WPA3-Enterprise",
    "Wi-Fi modes that authenticate each user or device through 802.1X and RADIUS rather than a shared passphrase."
   ],
   [
    "Rogue access point",
    "An unauthorized wireless access point connected to an organization's network."
   ],
   [
    "Evil twin",
    "A malicious access point that imitates a legitimate SSID to lure clients into connecting."
   ]
  ],
  "example": "A WIPS alert shows an access point broadcasting the corporate SSID from the parking lot, not in the managed AP inventory. Because laptops are configured for WPA3-Enterprise with EAP-TLS and validate the RADIUS server certificate, none of them connect to it, and security locates and removes the device.",
  "tip": "Shared passphrase means personal; per-user credentials through RADIUS means enterprise. An AP mimicking a known SSID is an evil twin; any unauthorized AP on your network is a rogue.",
  "check": [
   [
    "What WPA2-Personal weakness does WPA3-Personal's SAE address?",
    "Offline dictionary attacks against a captured handshake."
   ],
   [
    "Why is enterprise mode preferred for organizations?",
    "Each user or device has its own credentials, so access can be revoked individually and keys are unique per session."
   ],
   [
    "How does client-side certificate validation help against evil twins?",
    "Clients refuse to authenticate to a network whose server certificate does not match the trusted one."
   ]
  ]
 },
 {
  "t": "Converged networks and VoIP security",
  "body": [
   "A converged network carries voice, video, data and often building systems such as cameras and door controllers over a single IP infrastructure instead of separate specialized networks. Convergence saves money and adds features, but it also means that voice and video inherit IP network threats, and that an attack on the data network can take down phones, including emergency calling.",
   "Voice over IP (VoIP) splits into two kinds of traffic. Signaling sets up, manages and tears down calls; the Session Initiation Protocol (SIP) is the most common, traditionally on port 5060 for unencrypted and 5061 for SIP over TLS. H.323 is an older signaling suite. Media is the actual audio or video, carried by the Real-time Transport Protocol (RTP) over UDP on a dynamic range of ports. Call managers or IP PBXs control phones, and session border controllers (SBCs) sit at the edge between the internal voice network and service providers, acting like firewalls for VoIP.",
   "Key VoIP threats include eavesdropping on unencrypted RTP streams, which can be captured and replayed as audio; caller ID spoofing, used in vishing (voice phishing) and fraud; toll fraud, where attackers compromise a PBX or SIP account to place expensive calls; denial of service against call servers or by flooding SIP; registration hijacking, where an attacker registers as a legitimate phone; and SPIT, spam over internet telephony. Because voice is sensitive to delay and jitter, even modest network congestion or DoS degrades calls badly.",
   "Countermeasures follow the same layered approach as other systems. Place voice devices in a separate voice VLAN, with quality of service (QoS) prioritizing voice traffic and ACLs limiting what can reach call servers. Encrypt signaling with SIP over TLS and media with Secure RTP (SRTP). Use a session border controller at the network edge, harden and patch the IP PBX and phones, change default passwords and disable unused features such as remote administration. Restrict international and premium-rate dialing, monitor call records for unusual patterns such as overnight calls to unexpected countries, and require strong authentication for SIP accounts. Supply power over Ethernet from UPS-backed switches so phones keep working in an outage.",
   "Other converged elements need attention too. Video conferencing systems and collaboration tools should require meeting passwords or waiting rooms and encrypted sessions. Operational technology and building systems such as badge readers and CCTV that share the IP network should be segmented and monitored, since they are often hard to patch. Legacy analog lines for alarms or elevators may still exist and should be inventoried.",
   "In a lab you can capture SIP and RTP traffic from a softphone call in Wireshark, which has a built-in VoIP call analyzer; you will see why unencrypted media is a confidentiality problem and how SRTP changes the capture."
  ],
  "terms": [
   [
    "SIP",
    "Session Initiation Protocol: the common signaling protocol for setting up and ending VoIP calls."
   ],
   [
    "SRTP",
    "Secure Real-time Transport Protocol: encrypts and authenticates VoIP media streams."
   ],
   [
    "Toll fraud",
    "Unauthorized use of a phone system to place calls, usually expensive international or premium-rate calls, at the victim's expense."
   ],
   [
    "Session border controller",
    "An edge device that secures, controls and normalizes VoIP signaling and media between networks."
   ]
  ],
  "example": "A company's monthly phone bill spikes after its internet-facing IP PBX is accessed through a default admin password and used for thousands of overnight international calls. The fix: change credentials, place the PBX behind a session border controller, block premium-rate destinations and alert on after-hours call volume.",
  "tip": "Signaling (SIP) and media (RTP) are protected separately: TLS for SIP signaling, SRTP for the media. Voice VLANs plus QoS are the standard segmentation answer for converged networks.",
  "check": [
   [
    "Which protocol carries the audio in a VoIP call, and how is it secured?",
    "RTP carries the media; SRTP encrypts and authenticates it."
   ],
   [
    "What is toll fraud?",
    "Attackers abusing a compromised phone system or SIP account to place costly calls billed to the victim."
   ],
   [
    "Why are voice systems especially sensitive to DoS?",
    "Voice needs low latency and jitter, so even moderate congestion degrades or drops calls."
   ]
  ]
 },
 {
  "t": "Malware types: virus, worm, trojan, ransomware, rootkit, logic bomb, fileless",
  "body": [
   "Malware is any software designed to harm, exploit or gain unauthorized access to systems. Exam questions usually describe a behavior and ask you to name the type, so focus on how each one spreads, hides and what it does. Many real samples combine several types.",
   "A virus attaches itself to a legitimate host, such as a program file, document macro or boot sector, and needs a user or process to run the host before it executes and spreads. Variants include macro viruses in office documents, boot sector viruses, and polymorphic or metamorphic viruses that change their code to evade signature detection. A worm is self-replicating and spreads across networks on its own, typically by exploiting vulnerabilities in network services, without needing a host file or user action. Worms can spread extremely fast and consume bandwidth; famous outbreaks exploited unpatched SMB and database services.",
   "A trojan horse pretends to be useful or harmless software, such as a game, a cracked application or a fake update, while carrying a hidden malicious function. It does not replicate; it relies on tricking the user into installing it. A remote access trojan (RAT) gives the attacker ongoing remote control. Spyware and keyloggers are related categories that secretly collect information such as keystrokes and credentials.",
   "Ransomware encrypts files or entire systems and demands payment for the decryption key. Modern groups often use double extortion: they steal data first and threaten to publish it, so good backups alone do not remove the damage. Ransomware typically arrives through phishing, exposed remote access services or stolen credentials, and operators spend time moving laterally and deleting backups before encrypting.",
   "A rootkit hides its presence and that of other malware by modifying the operating system or lower layers. User-mode rootkits change system tools and libraries; kernel-mode rootkits alter the kernel itself; bootkits infect the boot process; and firmware rootkits reside in device firmware. Because a rootkit can lie to the operating system's own tools, detection may require booting from trusted external media or using integrity checks such as secure boot, and the safest remediation is usually to wipe and rebuild.",
   "A logic bomb is malicious code planted inside a legitimate program or script that stays dormant until a trigger condition is met, such as a date, an event or a specific user's account being removed. It is often associated with malicious insiders. Code reviews, separation of duties and change control help catch it.",
   "Fileless malware runs in memory and abuses legitimate built-in tools, such as PowerShell, WMI or scripting engines, rather than writing a traditional executable to disk. This living off the land approach evades file-based antivirus. Persistence may be kept in the registry or scheduled tasks. Detection relies on behavior monitoring, script logging and endpoint detection and response tools. Other types worth recognizing: bots that join a botnet under a command and control server, adware, and cryptominers (cryptojacking) that steal computing power."
  ],
  "terms": [
   [
    "Worm",
    "Self-replicating malware that spreads over networks without a host file or user action."
   ],
   [
    "Trojan",
    "Malware disguised as legitimate software that relies on the user installing it and does not self-replicate."
   ],
   [
    "Rootkit",
    "Malware that hides itself and other malicious activity by modifying the operating system, kernel, boot process or firmware."
   ],
   [
    "Fileless malware",
    "Malware that operates in memory using legitimate system tools, leaving few or no files on disk."
   ]
  ],
  "example": "A contractor's scheduled script, reviewed only after he left the company, contained code that would delete the payroll database if his account was ever disabled. It was a logic bomb. The same month, an unpatched server was hit by a worm scanning the network for the same vulnerable service on other hosts.",
  "tip": "Needs a host and user action: virus. Spreads by itself: worm. Disguised as something useful: trojan. Waits for a condition: logic bomb. Hides from the operating system: rootkit. Uses built-in tools in memory: fileless.",
  "check": [
   [
    "What distinguishes a worm from a virus?",
    "A worm self-propagates across networks without a host file or user action; a virus needs a host program and execution."
   ],
   [
    "Why is rebuilding often recommended after a kernel rootkit infection?",
    "The rootkit can subvert the operating system's own tools, so you cannot trust the system to report or remove it."
   ],
   [
    "Why does fileless malware evade traditional antivirus?",
    "It runs in memory and uses legitimate tools rather than writing malicious executables that file scanners examine."
   ]
  ]
 },
 {
  "t": "Malicious activity and indicators: beaconing, persistence, privilege escalation",
  "body": [
   "Detecting an attack usually means noticing behavior, not malware files. Indicators of compromise (IoCs) are artifacts that suggest a system has been breached: known bad IP addresses and domains, file hashes, unusual registry keys, strange processes or log entries. Indicators of attack focus on behaviors in progress. As an SSCP you will review alerts and logs, so you need to recognize the common patterns of attacker activity after initial access.",
   "Beaconing is regular communication from compromised hosts to an attacker's command and control (C2) server to check for instructions. Its signature is periodicity: connections at consistent intervals, such as every 60 seconds, often with similar packet sizes, to the same destination, sometimes with random jitter added. Attackers hide C2 in common protocols such as HTTPS, DNS queries (unusually long or high-volume subdomain lookups can indicate DNS tunneling) or legitimate cloud services. Other network indicators include connections to newly registered or algorithmically generated domains, traffic at odd hours, and large outbound transfers, which may signal data exfiltration. Analysts detect beaconing with proxy, DNS and firewall logs in a SIEM, looking for regular timing and rare destinations.",
   "Persistence is how an attacker keeps access across reboots, password changes and cleanup. Common mechanisms include registry run keys, startup folders, scheduled tasks or cron jobs, new services or modified existing services, WMI event subscriptions, web shells on web servers, new or altered user accounts, added SSH authorized keys, and malicious browser extensions. Indicators are new autostart entries, unexpected scheduled tasks, new local administrator accounts and services with odd names or paths. Tools such as Sysinternals Autoruns on Windows or reviewing `crontab -l` and systemd units on Linux help find them. File integrity monitoring can alert when these locations change.",
   "Privilege escalation is gaining higher rights than initially obtained. Vertical escalation moves from a normal user to administrator, root or SYSTEM, for example by exploiting an unpatched kernel flaw, a misconfigured service running with high privileges, weak file permissions or stored credentials. Horizontal escalation means accessing another account with similar privileges, such as another user's data. Indicators include unexpected additions to admin groups, use of `sudo` or run-as by unusual accounts, Windows event IDs for special privileges assigned at logon or for group membership changes, and processes spawned by services that normally do not start shells.",
   "Other activity to watch for: lateral movement (remote logins between workstations, use of remote administration tools, pass-the-hash techniques), credential dumping from memory, disabled security tools or cleared logs, and impossible travel logins. Mapping these behaviors to a framework such as MITRE ATT&CK helps analysts describe and hunt for them consistently.",
   "The response lesson applies: when you see indicators, validate, escalate per the incident response plan, and preserve evidence rather than just deleting the suspicious file."
  ],
  "terms": [
   [
    "Beaconing",
    "Periodic outbound communication from a compromised host to a command and control server."
   ],
   [
    "Persistence",
    "Techniques that let an attacker keep access across reboots and remediation, such as scheduled tasks or new services."
   ],
   [
    "Privilege escalation",
    "Gaining higher (vertical) or peer-level other-user (horizontal) access than originally obtained."
   ],
   [
    "Indicator of compromise",
    "An artifact, such as a malicious hash, domain or registry key, suggesting a system has been breached."
   ]
  ],
  "example": "A SIEM report shows a workstation contacting the same obscure domain every five minutes, day and night, with nearly identical request sizes. Investigating, the analyst finds a scheduled task running a PowerShell script at logon and a new member in the local Administrators group, pointing to beaconing, persistence and privilege escalation.",
  "tip": "Regular, periodic outbound connections point to beaconing. A new scheduled task, service or run key points to persistence. A standard account suddenly in an admin group points to privilege escalation.",
  "check": [
   [
    "What traffic pattern suggests beaconing?",
    "Repeated connections to the same destination at regular intervals with similar sizes, often at all hours."
   ],
   [
    "Name three common persistence mechanisms.",
    "Examples include registry run keys, scheduled tasks or cron jobs, new services, web shells and added accounts or SSH keys."
   ],
   [
    "What is the difference between vertical and horizontal privilege escalation?",
    "Vertical gains higher privileges such as admin; horizontal gains access to another account at a similar level."
   ]
  ]
 },
 {
  "t": "Countermeasures: antimalware, sandboxing, allow-listing, user training",
  "body": [
   "No single tool stops all malware, so organizations layer several countermeasures that cover different stages: stopping delivery, preventing execution, detecting activity and limiting damage. The exam focuses on how each works and its strengths and weaknesses.",
   "Antimalware (antivirus) software scans files, memory and sometimes network traffic. Signature-based detection compares code with a database of known malware patterns or hashes. It is accurate for known threats and produces few false positives, but it misses new or modified malware until signatures are updated, so updates must be frequent and automatic. Heuristic analysis looks for suspicious characteristics or code structures, and behavior-based detection watches what programs do, such as mass file encryption or code injection, which helps catch new variants at the cost of more false positives. Modern products often add machine learning and cloud reputation lookups. Antimalware should run on endpoints, servers, email gateways and web proxies, and be centrally managed so you can see which devices are unprotected or out of date.",
   "Sandboxing runs suspicious files or code in an isolated environment where they cannot affect production systems, and observes their behavior. Email and web security gateways often detonate attachments and downloads in a sandbox before delivering them. Browsers and applications also sandbox untrusted content internally. Sandboxes are powerful against unknown threats, but some malware checks whether it is in a virtual or analysis environment and stays dormant, or waits before acting, to evade detection.",
   "Application allow-listing (whitelisting) permits only approved applications to run, blocking everything else by default. Approval can be based on file hash, digital signature or publisher, or file path. It is highly effective against unknown malware and unauthorized software because new code simply cannot execute, and it is a strong fit for fixed-function systems such as kiosks, point-of-sale terminals and servers. Its drawbacks are administrative overhead and friction for users when legitimate software changes. Deny-listing (blacklisting) blocks known bad software and allows everything else; it is easier but misses anything not on the list. Path-based rules are weakest, because users or attackers may be able to write files into allowed paths.",
   "User training addresses the fact that many infections start with a person: opening a phishing attachment, enabling macros, installing pirated software or approving an unexpected MFA prompt. Training should teach recognition of phishing and social engineering, safe handling of attachments and downloads, and, crucially, how and when to report suspicious activity quickly without fear of blame. Phishing simulations and short, repeated lessons are more effective than an annual lecture.",
   "Supporting controls round out the layers: patching removes the vulnerabilities worms and exploits use; least privilege means malware running as a normal user can do less; disabling macros from the internet, email filtering and web filtering block delivery; and backups limit the impact of ransomware."
  ],
  "terms": [
   [
    "Signature-based detection",
    "Identifying malware by matching known patterns or hashes; accurate but blind to new variants."
   ],
   [
    "Sandbox",
    "An isolated environment for running untrusted code and observing its behavior safely."
   ],
   [
    "Application allow-listing",
    "Permitting only explicitly approved software to execute and blocking everything else."
   ],
   [
    "Heuristic analysis",
    "Detecting likely malware by suspicious characteristics or behavior rather than exact signatures."
   ]
  ],
  "example": "A manufacturer's point-of-sale terminals run with application allow-listing based on publisher signatures, so a malicious tool dropped by an attacker cannot run. Office staff get email attachments detonated in a sandbox before delivery and complete monthly five-minute phishing lessons; reports of suspicious emails double within a quarter.",
  "tip": "Allow-listing is the strongest answer for stopping unknown or zero-day malware on fixed-function systems. Signature-based antimalware is weakest against new variants; behavior-based detection and sandboxing help close that gap.",
  "check": [
   [
    "Why is allow-listing more effective than deny-listing against new malware?",
    "Anything not explicitly approved is blocked, so unknown malware cannot run even if no one has seen it before."
   ],
   [
    "What is a limitation of sandbox analysis?",
    "Malware can detect sandbox or virtual environments, or delay its activity, and appear benign."
   ],
   [
    "What behavior should user training emphasize besides spotting phishing?",
    "Reporting suspicious messages or activity quickly through the proper channel."
   ]
  ]
 },
 {
  "t": "Endpoint security: HIDS/HIPS, EDR, host firewalls, hardening, patch management",
  "body": [
   "Endpoints, meaning workstations, laptops, servers and similar hosts, are where users work and where attackers usually land first. Network controls cannot see everything, especially encrypted traffic and activity on laptops away from the office, so each endpoint needs its own layered protection.",
   "A host-based intrusion detection system (HIDS) runs on a single system and monitors its logs, file integrity, registry, processes and local network activity for signs of intrusion, generating alerts. A host-based intrusion prevention system (HIPS) can also block the activity, for example stopping a process from modifying protected system files. File integrity monitoring (FIM), which alerts when critical files change unexpectedly, is a common HIDS feature and a requirement in some compliance standards. Host-based tools can see what happens after network traffic is decrypted, which network IDS cannot.",
   "Endpoint detection and response (EDR) goes further. An EDR agent continuously records detailed endpoint telemetry, such as process creation, command lines, network connections, file and registry changes, and sends it to a central platform. It detects suspicious behavior using analytics and threat intelligence, and it gives responders tools to investigate timelines, hunt across all endpoints, and respond remotely by isolating a host from the network, killing processes or collecting files. Extended detection and response (XDR) correlates endpoint data with network, email, identity and cloud sources. EDR is particularly important against fileless attacks and living off the land techniques that signature antivirus misses.",
   "A host-based firewall filters traffic to and from the individual device, such as Windows Defender Firewall or `nftables`/`firewalld` on Linux. It protects the host even on untrusted networks like hotel Wi-Fi, and it limits lateral movement inside the corporate network by blocking inbound connections that workstations do not need, such as SMB or RDP from other workstations. Rules should be centrally managed through group policy or management tools.",
   "Hardening reduces the attack surface by removing or disabling everything a system does not need and securing what remains. Steps include removing unnecessary software, services and accounts; closing unused ports; changing default passwords; applying least privilege and removing local admin rights from users; enabling secure boot and full-disk encryption; configuring logging; and applying a secure configuration baseline such as the CIS Benchmarks or government security guides. Configuration management tools can then detect and correct drift from the baseline.",
   "Patch management keeps operating systems, applications and firmware updated against known vulnerabilities. A sound process: maintain an asset inventory; monitor vendor advisories; assess and prioritize patches by severity and exposure; test on representative systems; deploy in stages through a change management process; verify installation with scans or reports; and handle exceptions with compensating controls such as isolation. Emergency patches for actively exploited vulnerabilities may use an expedited change process. Unpatched, internet-facing systems are among the most common root causes of breaches, so reporting patch compliance is a key metric."
  ],
  "terms": [
   [
    "HIDS/HIPS",
    "Host-based intrusion detection or prevention: monitors a single system's activity and alerts (HIDS) or blocks (HIPS)."
   ],
   [
    "EDR",
    "Endpoint detection and response: records detailed endpoint telemetry for detection, investigation and remote response."
   ],
   [
    "Hardening",
    "Reducing a system's attack surface by removing unneeded components and applying a secure configuration baseline."
   ],
   [
    "Patch management",
    "The process of identifying, testing, deploying and verifying software updates that fix vulnerabilities."
   ]
  ],
  "example": "An EDR alert shows Word spawning PowerShell that connects to an unknown domain on a sales laptop. The analyst isolates the laptop through the EDR console, reviews the process tree, and finds a macro-laden attachment. The host firewall had already blocked the malware's attempt to reach other workstations over SMB.",
  "tip": "HIDS alerts, HIPS blocks, and EDR adds continuous recording plus remote investigation and containment such as host isolation. Patching and hardening are preventive; EDR and HIDS are primarily detective.",
  "check": [
   [
    "What can EDR do that traditional antivirus cannot?",
    "Record detailed behavior across endpoints, support investigation and threat hunting, and take remote response actions such as isolating a host."
   ],
   [
    "Why is a host firewall still valuable behind a network firewall?",
    "It protects the device on untrusted networks and limits lateral movement between internal hosts."
   ],
   [
    "What should happen when a patch cannot be applied to a critical system?",
    "Document an exception and apply compensating controls such as isolation, restricted access and extra monitoring."
   ]
  ]
 },
 {
  "t": "Mobile device management: MDM/UEM, BYOD vs COPE, containerization, remote wipe",
  "body": [
   "Smartphones and tablets carry email, files, authentication apps and access to cloud services, yet they are easily lost, stolen or connected to untrusted networks. Organizations need a way to apply security policy to them without hand-configuring each device. That is the job of mobile device management and its broader successors.",
   "Mobile device management (MDM) software enrolls devices and enforces policies centrally. Typical controls include requiring a screen lock with a PIN or biometric, forcing device encryption, setting minimum operating system versions, blocking jailbroken or rooted devices, restricting app installation, configuring Wi-Fi, VPN and email profiles, distributing certificates, and enabling location or remote lock. Mobile application management (MAM) focuses on managing and protecting specific corporate apps and their data rather than the whole device. Unified endpoint management (UEM) extends a single console across phones, tablets, laptops and desktops of different operating systems, so policies are consistent across all endpoints.",
   "Deployment models describe who owns the device and how much control the organization has. Bring your own device (BYOD) lets employees use personal devices. It saves money and users like it, but the organization has limited control, privacy concerns are significant, and devices vary widely. Corporate-owned, personally enabled (COPE) devices are owned and fully managed by the organization, but personal use is allowed. Corporate-owned, business only (COBO) devices are for work only, the most controlled model. Choose your own device (CYOD) lets users pick from an approved list of corporate devices. A clear acceptable use policy should state what the organization can monitor, what happens on loss or departure, and user responsibilities.",
   "Containerization (also called sandboxing or work profiles) separates corporate apps and data from personal content on the same device, using an encrypted, managed container. Policies apply to the container, such as blocking copy and paste from work apps to personal apps, while the organization has no visibility into personal photos or messages. This is the key technology that makes BYOD acceptable for both security and privacy. Storage segmentation is a related term.",
   "Remote wipe erases data from a lost, stolen or departed employee's device. A full wipe resets the whole device to factory settings, which is appropriate for corporate-owned devices. A selective or enterprise wipe removes only corporate data and apps from the container, leaving personal data intact, which is the usual choice for BYOD and should be spelled out in policy. Wipes only work if the device connects to the network, so encryption and strong screen locks remain essential; some policies also wipe after a number of failed unlock attempts.",
   "Other mobile concerns include sideloading apps from outside official stores, jailbreaking and rooting (which bypass built-in security), geofencing to apply policies by location, and carrier unlocking. Conditional access policies can require that a device be enrolled and compliant before it can reach corporate email or cloud apps."
  ],
  "terms": [
   [
    "UEM",
    "Unified endpoint management: a single platform to manage and secure mobile devices and computers across operating systems."
   ],
   [
    "COPE",
    "Corporate-owned, personally enabled: the organization owns and manages the device but allows personal use."
   ],
   [
    "Containerization",
    "Separating corporate apps and data into an encrypted, managed area isolated from personal data on a device."
   ],
   [
    "Selective wipe",
    "Removing only corporate data and apps from a device while leaving personal content intact."
   ]
  ],
  "example": "A consulting firm allows BYOD phones for email. Enrolled devices get a managed work profile, must have a PIN and be encrypted, and cannot copy work files to personal apps. When a consultant resigns, IT performs a selective wipe that removes the work profile but leaves her family photos untouched.",
  "tip": "For BYOD, the privacy-friendly answer is containerization plus selective wipe. Full wipe fits corporate-owned devices. A rooted or jailbroken device should be treated as non-compliant.",
  "check": [
   [
    "What is the main advantage of COPE over BYOD from a security view?",
    "The organization owns the device and can fully manage and wipe it, while still allowing personal use."
   ],
   [
    "Why is containerization important in BYOD programs?",
    "It isolates and protects corporate data while keeping the organization out of the user's personal data."
   ],
   [
    "When is a selective wipe preferred over a full wipe?",
    "On personally owned devices, where only corporate data should be removed."
   ]
  ]
 },
 {
  "t": "Cloud models and shared responsibility (IaaS, PaaS, SaaS)",
  "body": [
   "Cloud computing delivers computing resources on demand over a network. The widely used NIST definition lists five essential characteristics: on-demand self-service, broad network access, resource pooling (multi-tenancy), rapid elasticity and measured service (you pay for what you use). Understanding the service and deployment models is essential, because they decide who is responsible for which security controls.",
   "There are three main service models. Infrastructure as a service (IaaS) provides virtual machines, storage and networks; the customer manages the operating system, middleware, applications and data, while the provider manages the physical data center, hardware and virtualization layer. Platform as a service (PaaS) provides a managed platform such as a database service, application runtime or container platform; the provider also manages the operating system and runtime, and the customer manages the application code, configuration and data. Software as a service (SaaS) delivers complete applications, such as web email or CRM; the provider manages nearly everything, and the customer manages user accounts, access permissions, configuration settings and the data they put in. Newer terms such as function as a service (serverless) fit between PaaS and SaaS.",
   "The shared responsibility model describes how security duties are split. The provider is responsible for security of the cloud: physical facilities, hardware, the global network and the virtualization infrastructure. The customer is responsible for security in the cloud: what they build and configure on top. As you move from IaaS to PaaS to SaaS, the provider takes on more, but some duties always remain with the customer. The customer always owns their data, its classification and who can access it, identity and access management for their users, and the configuration of the services they use. Accountability for protecting regulated data cannot be outsourced, even though tasks can be.",
   "A practical way to think about it: in IaaS, if a VM's operating system is unpatched, that is your problem. In PaaS, the provider patches the database engine, but you choose whether it is exposed to the internet and who can log in. In SaaS, the provider secures the application, but if your administrator disables MFA or shares documents publicly, that is on you. Most cloud breaches come from customer-side misconfiguration and credential compromise, not provider failures.",
   "Deployment models describe who uses the infrastructure. Public cloud is shared by many customers on provider infrastructure. Private cloud is dedicated to one organization, on premises or hosted. Community cloud is shared by organizations with common requirements, such as government agencies. Hybrid cloud combines two or more, often on-premises systems with public cloud, connected so workloads and data can move between them. Multi-cloud means using several public providers.",
   "Before adopting a service, review the provider's contract and service level agreement, independent audit reports such as SOC 2 or ISO 27001 certification, data location, breach notification terms and exit options. The provider's documentation will include a responsibility matrix; read it rather than assuming."
  ],
  "terms": [
   [
    "IaaS",
    "Infrastructure as a service: the provider supplies virtualized compute, storage and networking; the customer manages OS and above."
   ],
   [
    "PaaS",
    "Platform as a service: the provider manages infrastructure, OS and runtime; the customer manages applications and data."
   ],
   [
    "SaaS",
    "Software as a service: the provider delivers a complete application; the customer manages users, settings and data."
   ],
   [
    "Shared responsibility model",
    "The division of security duties between cloud provider (security of the cloud) and customer (security in the cloud)."
   ]
  ],
  "example": "A startup runs its website on IaaS virtual machines, its database on a managed PaaS database service and its email on a SaaS suite. It patches the VMs' operating systems itself, relies on the provider to patch the database engine, and configures MFA and sharing restrictions in the SaaS admin console, because all three remain its responsibility.",
  "tip": "Data and identity are always the customer's responsibility in every model. The physical data center is always the provider's. Everything in between shifts toward the provider as you move from IaaS to SaaS.",
  "check": [
   [
    "Who patches the guest operating system in IaaS?",
    "The customer."
   ],
   [
    "In SaaS, name two responsibilities that remain with the customer.",
    "Managing user accounts and access, configuring security settings such as MFA and sharing, and protecting and classifying their data."
   ],
   [
    "What is a hybrid cloud?",
    "A combination of two or more deployment models, such as on-premises private infrastructure connected to a public cloud."
   ]
  ]
 },
 {
  "t": "Cloud security: IAM, encryption, CSPM, misconfigured storage, data residency",
  "body": [
   "Cloud environments change quickly and are managed entirely through APIs and web consoles, so identity and configuration become the main security perimeter. The same few failures cause most cloud incidents: stolen or overprivileged credentials, storage left open to the public, and settings that drift from policy without anyone noticing.",
   "Identity and access management (IAM) in the cloud controls who (users, groups, roles and service accounts) can do what to which resources. Good practice: protect the root or global administrator account with strong MFA and use it almost never; give people individual accounts, ideally federated from the corporate identity provider with single sign-on; require MFA; assign least-privilege permissions through roles and groups rather than directly to users; and prefer temporary credentials obtained by assuming roles over long-lived access keys. Never embed access keys in code or public repositories, since automated scanners find them within minutes. Review permissions regularly and remove unused ones, and log all API activity with the provider's audit logging service.",
   "Encryption protects data at rest and in transit. Most providers encrypt storage by default, but you choose who controls the keys. Provider-managed keys are simplest. Customer-managed keys in the provider's key management service (KMS) give you control over rotation, access policies and the ability to disable keys. Bring your own key and hold your own key options, sometimes using an external HSM, give still more control for strict regulatory needs, with more operational burden. Encrypt data in transit with TLS, including traffic between internal services. Remember that encryption does not help if an IAM policy grants an attacker the right to decrypt.",
   "Misconfigured storage is a classic cloud breach. Object storage buckets or containers set to allow public or anonymous access have exposed millions of records. Causes include testing shortcuts left in place, confusing permission models and missing guardrails. Defenses include account-level settings that block public access by default, policies that deny unencrypted or public resources, regular scans, and alerts on permission changes. Similar risks include databases open to the internet, overly permissive security groups allowing SSH or RDP from anywhere, and publicly shared snapshots.",
   "Cloud security posture management (CSPM) tools continuously scan cloud accounts against security benchmarks and compliance frameworks, detecting misconfigurations such as public storage, missing encryption, disabled logging or excessive permissions, and often fixing them automatically. Related tools include cloud workload protection platforms for workloads, and cloud access security brokers (CASB) that give visibility and control over SaaS use, including shadow IT. Infrastructure as code lets you review and scan configurations before deployment.",
   "Data residency refers to the physical or geographic location where data is stored and processed. Laws and regulations may require certain data, such as personal or government data, to stay within a country or region, and data sovereignty means data is subject to the laws of the place it resides. Cloud customers control residency by choosing regions and configuring replication and backups carefully, and by checking where the provider's support staff and subprocessors can access data."
  ],
  "terms": [
   [
    "Least privilege IAM",
    "Granting identities only the specific cloud permissions they need, preferably through roles and temporary credentials."
   ],
   [
    "CSPM",
    "Cloud security posture management: continuous scanning of cloud configurations against security and compliance policies."
   ],
   [
    "Customer-managed key",
    "An encryption key in a cloud KMS whose policies and rotation are controlled by the customer rather than the provider."
   ],
   [
    "Data residency",
    "The geographic location where data is stored and processed, often constrained by law or regulation."
   ]
  ],
  "example": "A CSPM alert flags a storage bucket that a developer made public while sharing test files, and it contains customer exports. The security team blocks public access at the account level, rotates an access key found in the same repository, and moves the European customer data to an EU region to meet residency requirements.",
  "tip": "Most cloud breaches are customer misconfigurations, not provider failures. For continuously detecting misconfigurations the answer is CSPM; for visibility into SaaS usage and shadow IT the answer is CASB.",
  "check": [
   [
    "Why are temporary role-based credentials preferred over long-lived access keys?",
    "They expire automatically, limiting the damage if they leak, and avoid keys being stored in code or on disks."
   ],
   [
    "What does CSPM do?",
    "Continuously checks cloud configurations against policies and benchmarks to detect and often remediate misconfigurations."
   ],
   [
    "How can an organization meet data residency requirements in the cloud?",
    "By choosing appropriate regions and controlling replication, backups and provider access so data stays in permitted locations."
   ]
  ]
 },
 {
  "t": "Virtualization: hypervisors, VM escape, VM sprawl, snapshots",
  "body": [
   "Virtualization lets one physical machine run many isolated virtual machines (VMs), each with its own operating system. It underpins data centers and cloud computing, improves hardware use and makes systems easy to copy and restore. It also introduces new risks, because many workloads now share one host and one management layer.",
   "The hypervisor, or virtual machine monitor, is the software that creates and runs VMs and allocates CPU, memory, storage and network to them. A Type 1 (bare-metal) hypervisor runs directly on the hardware with no general-purpose operating system beneath it; examples include VMware ESXi, Microsoft Hyper-V and KVM-based platforms. It has a smaller attack surface and better performance and is used in data centers and clouds. A Type 2 (hosted) hypervisor runs as an application on a normal operating system, such as VirtualBox or VMware Workstation, and is common for desktops and labs. Its security also depends on the host operating system. Containers are a related but different technology: they share the host kernel and isolate processes rather than virtualizing hardware, so they are lighter but offer weaker isolation than VMs.",
   "VM escape is an attack in which code running inside a guest VM breaks out of its isolation to interact with the hypervisor or other VMs on the same host. It is rare but severe, because compromising the hypervisor compromises every VM on it. Defenses include keeping hypervisors and VM tools patched, minimizing features such as shared folders, clipboard sharing and unnecessary virtual devices, separating workloads of different sensitivity onto different hosts or clusters, and closely protecting the management interface. The hypervisor management console, such as vCenter, is itself a prime target; it should be on an isolated management network with MFA and restricted admin accounts.",
   "VM sprawl happens when VMs are created so easily that the organization loses track of them. Forgotten VMs are not patched, monitored or backed up, may run outdated software with old credentials, and consume resources and licenses. Controls include a formal provisioning process tied to change management, tagging each VM with an owner and purpose, automated inventory and discovery, regular reviews and decommissioning of unused VMs, and expiry dates for test systems.",
   "Snapshots capture the state of a VM, its disk and optionally memory, at a point in time, so you can roll back quickly after a failed update or malware infection. They are useful before patching or testing. But snapshots are not backups: they usually live on the same storage as the VM and depend on the original disk, so storage failure or deletion can lose both. Long-lived snapshots also degrade performance and consume space. From a security view, snapshots can contain sensitive data from memory, including keys and passwords, so their access must be controlled, and rolling back a VM can reintroduce old vulnerabilities or reset security patches, so always re-patch after reverting.",
   "Other virtualization concerns include inter-VM traffic that never touches the physical network (so traditional network monitoring cannot see it without virtual switch controls), resource exhaustion by one VM affecting others, and securing VM images and templates so new systems start hardened."
  ],
  "terms": [
   [
    "Type 1 hypervisor",
    "A bare-metal hypervisor that runs directly on hardware, used in data centers for performance and security."
   ],
   [
    "Type 2 hypervisor",
    "A hosted hypervisor that runs as an application on a conventional operating system."
   ],
   [
    "VM escape",
    "An attack in which code in a guest VM breaks isolation to reach the hypervisor or other VMs."
   ],
   [
    "VM sprawl",
    "Uncontrolled growth of VMs that are no longer tracked, patched or managed."
   ]
  ],
  "example": "An audit of a virtualization cluster finds 40 VMs with no owner tag, including an old test web server still running an unpatched framework with the default admin password. The team introduces mandatory owner and expiry tags, decommissions abandoned VMs, and moves the vCenter management interface onto an isolated admin network with MFA.",
  "tip": "VM escape threatens the hypervisor and every co-hosted VM; the main defenses are patching and isolating sensitive workloads. Snapshots are for quick rollback, not a backup strategy.",
  "check": [
   [
    "Why is a Type 1 hypervisor generally considered more secure than Type 2?",
    "It runs directly on hardware with a smaller attack surface, without depending on a general-purpose host operating system."
   ],
   [
    "What risks does VM sprawl create?",
    "Forgotten VMs go unpatched, unmonitored and unbacked-up, creating vulnerable, unmanaged systems and wasted resources."
   ],
   [
    "What security issue can reverting a VM to an old snapshot cause?",
    "It can remove patches and restore old vulnerabilities or configurations, so the VM must be re-patched."
   ]
  ]
 },
 {
  "t": "Secure application basics: input validation, OWASP Top 10",
  "body": [
   "Applications, especially web applications, are exposed to anyone on the internet and handle valuable data. Most application attacks exploit the same root cause: the application trusts input that an attacker controls. As an SSCP you may not write code, but you need to recognize common vulnerability classes, understand the defenses, and work with developers and tools that find these flaws.",
   "Input validation means checking all input for type, length, format and range before using it. Treat everything from outside the trust boundary as untrusted: form fields, URLs, cookies, headers, uploaded files and API calls. Validation must happen on the server side; client-side validation in the browser improves usability but can be bypassed easily. Allow-list validation, which accepts only known good patterns (for example, a postal code of a specific length and characters), is stronger than trying to block known bad characters. Validation is paired with output encoding, which converts special characters so data displays as text rather than executing in the browser, and with parameterized queries, which keep data separate from database commands.",
   "The OWASP Top 10, published by the Open Worldwide Application Security Project, is a widely used awareness list of the most critical web application security risk categories. It is updated every few years and categories are renamed and reordered, so learn the concepts rather than the ranking. Categories that have appeared in recent editions include: broken access control (users acting outside their permissions, such as changing an ID in a URL to see another user's record); cryptographic failures (sensitive data not encrypted or weak algorithms); injection (untrusted data interpreted as commands, such as SQL injection or OS command injection); insecure design; security misconfiguration (default accounts, verbose errors, unnecessary features); vulnerable and outdated components; identification and authentication failures (weak passwords allowed, poor session handling); software and data integrity failures (untrusted updates or insecure deserialization); security logging and monitoring failures; and server-side request forgery (SSRF), where the server is tricked into making requests to internal resources. The 2025 edition, for example, folds SSRF into broken access control, broadens outdated components into software supply chain failures, and adds mishandling of exceptional conditions.",
   "Two classic attacks are worth understanding. SQL injection happens when an application builds a database query by concatenating user input, letting an attacker change the query's logic to read or modify data. The core fix is parameterized queries (prepared statements), plus least privilege for the database account. Cross-site scripting (XSS) happens when an application includes untrusted input in a page without encoding it, so the victim's browser runs attacker-supplied script, which can steal session cookies or act as the user. Defenses are output encoding, input validation, a content security policy and marking cookies HttpOnly. Cross-site request forgery (CSRF) tricks a logged-in user's browser into sending unwanted requests; anti-CSRF tokens and SameSite cookies defend against it.",
   "Secure development brings these together: threat modeling during design, secure coding standards, code review, static application security testing (SAST) of source code, dynamic testing (DAST) of running applications, software composition analysis for vulnerable libraries, and a web application firewall as a compensating control. Error messages should be generic to users while detailed information goes to logs."
  ],
  "terms": [
   [
    "Input validation",
    "Server-side checking that input matches expected type, length, format and range before it is used."
   ],
   [
    "Parameterized query",
    "A database query where user input is passed as data parameters, never interpreted as part of the SQL command."
   ],
   [
    "Cross-site scripting (XSS)",
    "A flaw that lets attacker-supplied script run in other users' browsers because output was not properly encoded."
   ],
   [
    "OWASP Top 10",
    "A periodically updated awareness list of the most critical web application security risk categories."
   ]
  ],
  "example": "A penetration test finds that changing the order number in a shop's URL shows other customers' orders (broken access control) and that the search box reflects input into the page unencoded (XSS). Developers add server-side authorization checks on every order lookup, encode output, and add a content security policy; the WAF gets a temporary rule while fixes deploy.",
  "tip": "The best fix for SQL injection is parameterized queries, not just input filtering or a WAF. Client-side validation is never sufficient on its own because attackers bypass the browser entirely.",
  "check": [
   [
    "Why must input validation be performed on the server?",
    "Client-side checks can be bypassed by sending requests directly or altering them, so only server-side validation is reliable."
   ],
   [
    "What is the primary defense against SQL injection?",
    "Parameterized queries (prepared statements), supported by input validation and least-privilege database accounts."
   ],
   [
    "A user changes an account ID in a URL and sees another user's data. What category is this?",
    "Broken access control."
   ]
  ]
 }
]);
