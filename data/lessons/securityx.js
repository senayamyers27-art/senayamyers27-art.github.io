/* Lessons for CompTIA SecurityX (CAS-005): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("securityx", [
 {
  t: "Security governance components: policies, standards, procedures, guidelines and governance frameworks",
  body: [
   "Governance is how an organization decides what security should achieve, who is accountable, and how it will know whether it is working. At the SecurityX level you are expected to think like the person who designs that structure, not only the person who follows it. The written parts of governance form a hierarchy, and exam questions often turn on putting a requirement at the right level.",
   "A policy is a short, high-level, mandatory statement of management intent, approved by senior leadership or the board. For example: 'All sensitive data must be encrypted at rest and in transit.' Policies change rarely because they need executive approval. A standard makes the policy measurable and specific, such as 'Use AES-256 for data at rest and TLS 1.2 or later for data in transit.' Standards are mandatory too, but the security team can update them as technology changes without going back to the board.",
   "A procedure is the step-by-step instruction for carrying out a task in a consistent way, such as how to request and approve a firewall change or how to rotate a service account key. A guideline is recommended, optional advice, for example suggested ways to build a strong passphrase. A baseline is a minimum configuration for a class of systems, often derived from a benchmark such as a CIS Benchmark.",
   "Governance frameworks tie these documents to a program. They define oversight bodies (a security steering committee, a risk committee of the board), charters that grant the security function authority, and a cycle of setting objectives, measuring and reviewing. Frameworks such as ISO/IEC 27001, the NIST Cybersecurity Framework and COBIT give a structure so you do not invent the program from scratch.",
   "Good governance documents have an owner, a review cycle (commonly annual), version control, an exception process with expiry dates and compensating controls, and a clear link to the risks or regulations they address. Without an exception process, people route around policy informally, and you lose visibility into the real risk."
  ],
  terms: [
   ["Policy", "A high-level, mandatory statement of management intent approved by senior leadership."],
   ["Standard", "A mandatory, specific and measurable requirement that supports a policy, such as a required algorithm or setting."],
   ["Procedure", "Step-by-step instructions for performing a task consistently."],
   ["Guideline", "Recommended but optional advice that helps people meet a policy."],
   ["Policy exception", "A documented, time-limited approval to deviate from a requirement, usually with compensating controls."]
  ],
  example: "A bank's board approves a policy requiring strong authentication for remote access. The security team publishes a standard requiring phishing-resistant MFA (FIDO2) for administrators and app-based MFA for other staff, and a procedure for enrolling new security keys. When a legacy app cannot support MFA, the owner files an exception that expires in six months and adds IP restrictions as a compensating control.",
  tip: "If a question asks where a specific technical value (algorithm, key length, password length) belongs, the answer is usually a standard, not a policy. Policies state intent; standards state measurable requirements.",
  check: [
   ["Where should the requirement 'TLS 1.2 or later' be documented?", "In a standard, because it is a specific, measurable requirement that supports a higher-level encryption policy and may change over time."],
   ["Why does a policy exception process matter?", "It gives controlled, documented, time-limited deviations with compensating controls, so risk is visible instead of people bypassing policy informally."]
  ]
 },
 {
  t: "Security program management: roles and responsibilities (RACI), awareness training, metrics and reporting to leadership",
  body: [
   "A security program is the ongoing set of people, processes and technology that carries out governance. Managing it well means everyone knows who does what, people are trained for the risks they actually face, and leadership receives information it can act on.",
   "Roles begin at the top. The board and executives own risk and set appetite. The chief information security officer (CISO) leads the program and advises leadership. Data owners (usually business leaders) decide how their data is classified and who may access it. Data custodians or system administrators implement the controls. Data stewards maintain data quality and definitions, and users follow policy. A privacy officer or data protection officer (DPO) handles privacy obligations where regulations require one.",
   "A RACI matrix removes ambiguity for specific activities. For each task it names who is Responsible (does the work), Accountable (approves and answers for the outcome, only one per task), Consulted (gives input before) and Informed (told afterward). For example, for firewall rule changes the network team is Responsible, the network manager Accountable, security Consulted and the service desk Informed.",
   "Awareness training should be role-based and continuous rather than a single yearly slideshow. Everyone needs basics such as phishing recognition and reporting; developers need secure coding; administrators need privileged account hygiene; executives need training on targeted fraud such as business email compromise. Phishing simulations are useful when they teach rather than shame, and the key measure is the reporting rate, not only the click rate.",
   "Metrics turn the program into evidence. Key performance indicators (KPIs) measure how well a process runs, such as mean time to patch critical vulnerabilities. Key risk indicators (KRIs) warn that risk is rising, such as the number of internet-facing systems with known exploited vulnerabilities. Reports to leadership should be short, trend-based and tied to business impact and risk appetite, not a list of raw alert counts."
  ],
  terms: [
   ["RACI matrix", "A chart assigning Responsible, Accountable, Consulted and Informed roles for each activity."],
   ["Data owner", "The business leader accountable for a data set's classification and access decisions."],
   ["Data custodian", "The person or team that implements and operates the controls protecting data."],
   ["KPI", "Key performance indicator: a measure of how well a process is performing."],
   ["KRI", "Key risk indicator: a measure that signals increasing exposure to a risk."]
  ],
  example: "A CISO replaces a 40-page monthly report of alert counts with a one-page dashboard: patch SLA compliance for critical systems, phishing report rate, number of overdue risk exceptions and progress on the top five risks. The board can now see that exceptions are growing and asks business owners to close them.",
  tip: "In a RACI, only one party is Accountable for a task. When a question asks who owns the decision about data classification or access, the answer is the data owner, not the administrator who configures the system.",
  check: [
   ["Who decides how a customer database is classified: the database administrator or the head of sales?", "The head of sales as the data owner; the DBA is a custodian who implements the controls."],
   ["Give one KPI and one KRI for vulnerability management.", "KPI: percentage of critical vulnerabilities fixed within SLA. KRI: count of internet-facing assets with known exploited vulnerabilities open."]
  ]
 },
 {
  t: "Change, configuration and asset management governance, including CMDB and data inventory",
  body: [
   "You cannot secure what you do not know you have, and you cannot keep it secure if it changes without anyone noticing. Asset, configuration and change management are the governance processes that answer three questions: what do we own, how should it be configured, and who approved each change.",
   "Asset management keeps an inventory of hardware, software, cloud resources and data, each with an owner, a location, a criticality and a life-cycle status. Discovery tools, endpoint agents and cloud APIs feed the inventory so it stays current. Software inventory should include versions so that newly announced vulnerabilities can be matched quickly. Assets reaching end of life or end of support need a plan: upgrade, replace, isolate or formally accept the risk.",
   "A configuration management database (CMDB) stores configuration items (CIs) and the relationships between them: which servers support which application, which application depends on which database. Those relationships make impact analysis possible. A security baseline defines the approved configuration of a CI type, and configuration management tools apply it and report drift.",
   "Change management makes changes deliberate. A change request describes what will change, why, the risk and impact, the test plan and the back-out plan. A change advisory board (CAB) reviews normal changes; standard changes are pre-approved low-risk routines; emergency changes are fast-tracked but documented and reviewed afterward. Security should be consulted on changes that alter exposure, such as firewall rules or new internet-facing services.",
   "A data inventory, sometimes called a data map, records what data you hold, its classification, where it lives, who owns it, how long it is kept and where it flows, including to third parties. It is essential for privacy regulations (records of processing), data loss prevention, breach impact analysis and secure disposal."
  ],
  terms: [
   ["CMDB", "Configuration management database: a record of configuration items and their relationships."],
   ["Configuration item (CI)", "Any component managed under configuration control, such as a server, application or network device."],
   ["Change advisory board (CAB)", "The group that reviews and approves normal changes based on risk and impact."],
   ["Back-out plan", "The documented steps to reverse a change if it fails."],
   ["Data inventory", "A record of data sets, their classification, location, owner, retention and flows."]
  ],
  example: "When a critical vulnerability is announced in a web server package, a retailer queries its CMDB for all CIs running the affected version, sees which customer-facing applications depend on them, and files emergency changes for those first. The data inventory shows which of those apps store cardholder data, so the compliance team knows the potential scope.",
  tip: "Expect questions where the root cause is an unapproved or undocumented change. The fix is usually process: route changes through change management with testing and back-out plans, and detect drift against the baseline.",
  check: [
   ["What does a CMDB add beyond a simple asset list?", "Relationships between configuration items, so you can analyze the impact of a change or an outage on dependent services."],
   ["How are emergency changes handled?", "They are approved quickly by a designated authority, implemented, then documented and reviewed by the CAB afterward."]
  ]
 },
 {
  t: "Risk management activities: impact analysis, risk assessment, risk appetite and tolerance, risk treatment and risk registers",
  body: [
   "Risk is the chance that a threat will exploit a vulnerability and cause harm to an asset, weighed by the impact if it happens. Risk management is the repeating cycle of identifying risks, assessing them, deciding what to do, and monitoring the result. SecurityX expects you to lead this cycle and communicate it to leadership.",
   "Risk assessment can be qualitative, quantitative or a mix. Qualitative assessment rates likelihood and impact on scales such as low, medium and high, often in a heat map; it is fast and suits most risks. Quantitative assessment uses money: single loss expectancy (SLE) is asset value times exposure factor; annualized rate of occurrence (ARO) is how often per year; annualized loss expectancy (ALE) is SLE times ARO. A control is cost-justified when it reduces ALE by more than it costs per year.",
   "Inherent risk is the level before controls; residual risk is what remains after controls. Leadership sets risk appetite, the amount of risk it is willing to accept to pursue its goals, and risk tolerance, the acceptable variation around that appetite. When residual risk exceeds appetite, it must be treated further or formally accepted by someone with the authority to do so.",
   "There are four treatment options. Mitigate by adding controls. Transfer by shifting financial impact, for example with insurance or contracts; accountability stays with you. Avoid by stopping the activity. Accept by documenting the decision, usually for low risks or where treatment costs more than the potential loss.",
   "A risk register records each risk with a description, owner, likelihood, impact, inherent and residual scores, treatment, due dates and status. It is a living document reviewed regularly, and key risk indicators help show when a risk is growing. Impact analysis in change management and business continuity feeds the register with the consequences of losing a system or process."
  ],
  terms: [
   ["Annualized loss expectancy (ALE)", "Expected yearly loss from a risk: single loss expectancy multiplied by annualized rate of occurrence."],
   ["Risk appetite", "The amount and type of risk an organization is willing to accept in pursuit of its objectives."],
   ["Residual risk", "The risk that remains after controls have been applied."],
   ["Risk transference", "Shifting part of a risk's financial impact to another party, such as an insurer."],
   ["Risk register", "A documented list of risks with owners, scores, treatments and status."]
  ],
  example: "A company estimates that a laptop theft exposing customer data would cost $200,000 (SLE) and expects it once every four years (ARO 0.25), for an ALE of $50,000. Full-disk encryption across the fleet costs $15,000 a year and would reduce the exposure factor to near zero, so the control is clearly justified and the risk register is updated with the lower residual score.",
  tip: "Buying insurance is transference, not mitigation; it does not change the likelihood of the event. And only a person with appropriate authority can accept risk above appetite, not the analyst who assessed it.",
  check: [
   ["An outage costs $30,000 per event and happens three times a year. What is the ALE?", "$90,000 (SLE $30,000 multiplied by ARO 3)."],
   ["What must happen when residual risk exceeds appetite?", "Apply more treatment, or have an executive with authority formally accept it and document the decision."]
  ]
 },
 {
  t: "Third-party and supply chain risk management: vendor assessments, SBOMs, contracts and right to audit",
  body: [
   "Much of your risk now sits with other companies: cloud providers, SaaS vendors, managed service providers, software suppliers and the open-source components inside your own code. A supply chain compromise can reach thousands of customers at once, so third-party risk management is a core senior responsibility.",
   "Start by tiering vendors. A vendor that stores regulated data or has network access to production is high risk and gets deep assessment; a vendor that supplies office furniture does not. Due diligence for high-risk vendors includes security questionnaires, independent evidence such as a SOC 2 Type II report or ISO/IEC 27001 certificate, penetration test summaries, financial stability, and where they store data and which subprocessors they use.",
   "A SOC 2 Type I report assesses the design of controls at a point in time; a Type II report tests whether they operated effectively over a period, which is stronger evidence. A self-completed questionnaire is useful for scoping but is not independently verified.",
   "Contracts turn expectations into obligations. Important clauses include security requirements, breach notification timelines, right to audit (or to receive audit reports), data ownership and return or destruction at the end of the contract, subprocessor approval, service level agreements, liability and insurance. A master service agreement (MSA) sets overall terms; a data processing agreement (DPA) covers privacy obligations; memoranda of understanding (MOUs) and interconnection security agreements (ISAs) are common between organizations sharing systems.",
   "For software, a software bill of materials (SBOM) lists every component and version in a product, often in SPDX or CycloneDX format. With SBOMs, you can answer in minutes whether a newly disclosed library flaw affects you. Other supply chain controls include code signing, verifying hashes and signatures of downloads, provenance attestations for builds, and monitoring vendors continuously rather than only at onboarding. Offboarding matters too: revoke access and confirm data destruction when the relationship ends."
  ],
  terms: [
   ["SOC 2 Type II", "An independent auditor's report on whether a service organization's controls operated effectively over a period of time."],
   ["SBOM", "Software bill of materials: an inventory of components and versions in a software product."],
   ["Right to audit", "A contract clause allowing the customer to audit, or obtain audit evidence of, the vendor's controls."],
   ["Subprocessor", "A third party that a vendor uses to process the customer's data."],
   ["Vendor tiering", "Classifying vendors by the risk they pose so assessment effort matches the risk."]
  ],
  example: "Before signing with a payroll SaaS provider, a company reviews its SOC 2 Type II report, notes an exception about delayed access reviews, and requires a contract clause for 48-hour breach notification and annual evidence that access reviews are fixed. Months later, a vulnerable open-source library is announced; the vendor's SBOM shows the product does not include it, and the risk team closes the question the same day.",
  tip: "Type II beats Type I because it covers operating effectiveness over time. When a question asks how to find which products contain a vulnerable component quickly, think SBOM.",
  check: [
   ["Why is a vendor's security questionnaire alone weak evidence?", "The vendor answers it about itself; it is not independently verified the way a SOC 2 Type II report or certification is."],
   ["Name three contract clauses important for a vendor that will hold customer data.", "Breach notification timeline, right to audit, and data return or destruction at contract end (also subprocessor approval and security requirements)."]
  ]
 },
 {
  t: "Business continuity and disaster recovery planning: BIA, RTO, RPO and plan testing",
  body: [
   "Business continuity (BC) keeps critical business functions running during a disruption; disaster recovery (DR) restores the technology those functions depend on. Both begin with a business impact analysis (BIA), which identifies critical processes, the systems and people they depend on, and how quickly losing them causes unacceptable harm.",
   "The BIA sets recovery targets. Maximum tolerable downtime (MTD) is how long a process can be unavailable before the damage is unacceptable. The recovery time objective (RTO) is the target time to restore a system, and it must be shorter than the MTD. The recovery point objective (RPO) is the maximum acceptable data loss measured in time; a 15-minute RPO requires backups or replication at least that often. Work recovery time (WRT) is the time needed after restoration to verify data and resume work.",
   "Targets drive design and cost. A short RTO and RPO may need synchronous replication and a hot site or active-active deployment; longer targets may be met by restoring backups to a warm or cold site. Backups should follow a rule such as 3-2-1 (three copies, two media types, one off-site) with at least one immutable or offline copy to survive ransomware, and restores must be tested.",
   "Plans need testing, from least to most disruptive: a checklist review, a tabletop exercise (discussion of a scenario), a walkthrough or simulation, a parallel test (bring up the recovery environment alongside production) and a full interruption test (actually fail over). Each test should produce findings and updates to the plan.",
   "Plans must also cover people and communication: who declares a disaster, call trees, alternate work locations, dependencies on vendors, and how to communicate with customers and regulators. Keep copies of the plan available when primary systems are down."
  ],
  terms: [
   ["Business impact analysis (BIA)", "An analysis of critical processes, their dependencies and the impact of their loss over time."],
   ["RTO", "Recovery time objective: the target time to restore a system or process after a disruption."],
   ["RPO", "Recovery point objective: the maximum acceptable amount of data loss, measured in time."],
   ["MTD", "Maximum tolerable downtime: the longest a process can be down before the harm is unacceptable."],
   ["Tabletop exercise", "A discussion-based walkthrough of a scenario to test roles, decisions and communication."]
  ],
  example: "An online retailer's BIA shows the order system has an MTD of four hours. The team sets an RTO of two hours and an RPO of 15 minutes, replicates the database to a second region every few seconds, and keeps immutable daily backups. A tabletop exercise reveals nobody knew who could authorize failover, so the plan is updated with a named decision-maker and deputy.",
  tip: "Do not mix up RTO (time to restore) and RPO (data loss tolerance). Tabletop exercises are discussion only; parallel and full interruption tests touch real systems, and a full interruption test is the most disruptive.",
  check: [
   ["If the MTD is 8 hours, can the RTO be 10 hours?", "No. The RTO must be shorter than the MTD, or the business will suffer unacceptable harm before recovery completes."],
   ["Which DR test runs the recovery site alongside production without switching over?", "A parallel test."]
  ]
 },
 {
  t: "Compliance and regulatory impacts: GDPR, HIPAA, PCI DSS, SOX, data sovereignty and industry frameworks",
  body: [
   "Compliance means meeting obligations set by laws, regulations, contracts and industry standards. Security architects must know which obligations apply, because they shape where data may be stored, what controls are mandatory and how quickly incidents must be reported. Being compliant is not the same as being secure, but failing to comply brings fines, lost contracts and loss of trust.",
   "The EU General Data Protection Regulation (GDPR) protects the personal data of people in the EU and applies to organizations anywhere that process it. It requires a lawful basis for processing, data minimization, security appropriate to the risk, records of processing, data protection impact assessments for high-risk processing, breach notification to the supervisory authority within 72 hours where required, and rights for individuals such as access and erasure.",
   "In the US, HIPAA governs protected health information (PHI) held by covered entities and their business associates, with administrative, physical and technical safeguards and breach notification rules. The Sarbanes-Oxley Act (SOX) requires public companies to maintain internal controls over financial reporting, which affects IT general controls such as access management and change management on financial systems. PCI DSS is an industry standard from the card brands for any organization that stores, processes or transmits cardholder data; reducing scope through segmentation and tokenization is a common architecture goal.",
   "Data sovereignty means data is subject to the laws of the country where it is located. Some countries add data localization rules requiring certain data to stay in-country. This affects cloud region choice, backup locations, support access from other countries and cross-border transfers, which under GDPR need a transfer mechanism such as an adequacy decision or standard contractual clauses.",
   "Industry and sector frameworks add further requirements, such as the NERC CIP standards for the North American bulk electric system, CMMC for US defense contractors and various national critical infrastructure rules. A practical approach is to build one control set mapped to all applicable requirements so a single control satisfies several obligations."
  ],
  terms: [
   ["GDPR", "EU regulation protecting personal data, with rights for individuals and duties such as breach notification."],
   ["PHI", "Protected health information regulated by HIPAA in the US."],
   ["PCI DSS", "Payment Card Industry Data Security Standard for organizations handling cardholder data."],
   ["Data sovereignty", "The principle that data is subject to the laws of the country where it is stored."],
   ["Data localization", "A legal requirement to keep certain data within a country's borders."]
  ],
  example: "A healthcare startup expanding into Europe must handle both HIPAA for US patients and GDPR for EU patients. The architect keeps EU patient data in an EU cloud region, restricts support access from outside the region, signs data processing agreements with subprocessors, and maps encryption, logging and access review controls to both sets of requirements so audits reuse the same evidence.",
  tip: "Match the regulation to the data: card data means PCI DSS, US health data means HIPAA, EU personal data means GDPR, public company financial reporting means SOX. Location requirements point to data sovereignty or localization.",
  check: [
   ["A US public company's auditors examine access controls on the general ledger system. Which law drives this?", "SOX, which requires internal controls over financial reporting, including IT general controls."],
   ["How can architecture reduce PCI DSS scope?", "Segment the cardholder data environment and use tokenization or outsourced payment processing so fewer systems store or touch card numbers."]
  ]
 },
 {
  t: "Security frameworks and standards: NIST CSF, NIST SP 800-53, ISO/IEC 27001, CIS Controls and CSA CCM",
  body: [
   "Frameworks give structure to a security program so you are not inventing requirements from scratch. They fall into a few types: outcome frameworks that describe what a program should achieve, control catalogs that list specific safeguards, and management system standards that define how to run and improve the program. SecurityX questions ask you to pick the one that fits a situation.",
   "The NIST Cybersecurity Framework (CSF) 2.0 organizes outcomes into six functions: Govern, Identify, Protect, Detect, Respond and Recover. It is voluntary, sector-neutral and good for communicating maturity to leadership using current and target profiles. It points to control catalogs for detail rather than listing every control itself.",
   "NIST SP 800-53 is a large catalog of security and privacy controls grouped into families such as Access Control (AC), Audit and Accountability (AU), Configuration Management (CM) and Incident Response (IR). US federal systems select baselines from it, and NIST SP 800-37, the Risk Management Framework, describes the process of categorizing, selecting, implementing, assessing, authorizing and monitoring controls.",
   "ISO/IEC 27001 specifies requirements for an information security management system (ISMS): scope, risk assessment, a statement of applicability, internal audit, management review and continual improvement. Organizations can be certified against it by accredited bodies. ISO/IEC 27002 provides guidance for implementing the controls, and ISO/IEC 27701 extends the ISMS to privacy.",
   "The CIS Critical Security Controls are a prioritized list of safeguards grouped into implementation groups, useful for organizations that want a practical starting point. The Cloud Security Alliance Cloud Controls Matrix (CSA CCM) is a control framework for cloud computing, and the CSA STAR registry lets providers publish assessments against it. Mapping frameworks to each other lets one control satisfy several obligations."
  ],
  terms: [
   ["NIST CSF", "A voluntary outcome framework with six functions: Govern, Identify, Protect, Detect, Respond, Recover."],
   ["NIST SP 800-53", "A catalog of security and privacy controls organized into families, used heavily by US federal systems."],
   ["ISMS", "Information security management system: the policies, processes and controls used to manage security risk, as defined by ISO/IEC 27001."],
   ["Statement of applicability", "An ISO/IEC 27001 document listing which controls apply, whether they are implemented and why."],
   ["CSA CCM", "The Cloud Security Alliance's control framework for cloud computing."]
  ],
  example: "A mid-sized SaaS company wins a European enterprise customer that requires ISO/IEC 27001 certification. The company builds its ISMS, uses the CIS Controls to prioritize technical work, maps its controls to the CSA CCM for cloud-specific requirements, and reports progress to its board using NIST CSF current and target profiles.",
  tip: "If the question needs certification by an accredited auditor, choose ISO/IEC 27001. If it needs a detailed control catalog for federal systems, choose NIST SP 800-53. If it needs a high-level way to describe and communicate program maturity, choose NIST CSF.",
  check: [
   ["Which ISO standard can an organization be certified against, 27001 or 27002?", "ISO/IEC 27001; 27002 is implementation guidance and is not certifiable."],
   ["What function did NIST CSF 2.0 add to the original five?", "Govern, which covers strategy, roles, policy and oversight of cybersecurity risk."]
  ]
 },
 {
  t: "Legal and privacy considerations: data subject rights, breach notification, e-discovery and legal holds",
  body: [
   "Security leaders work closely with legal counsel and privacy teams, because many security decisions carry legal consequences. The exam expects you to recognize when a situation has legal implications and to take the step that preserves the organization's position.",
   "Privacy laws give individuals, called data subjects under GDPR, rights over their personal data: to be informed, to access it, to correct it, to have it erased in some circumstances, to restrict or object to processing, and to data portability. Supporting these rights requires knowing where personal data lives (a data inventory), verifying the requester's identity, and responding within legal deadlines. Privacy by design means building these capabilities in from the start rather than bolting them on.",
   "Breach notification rules vary by law and jurisdiction. GDPR requires notifying the supervisory authority within 72 hours of becoming aware of a qualifying personal data breach, and affected individuals when the risk to them is high. US states and sector rules such as HIPAA have their own timelines and thresholds. Contracts often require notifying customers faster. Incident response plans should include legal counsel early so notification decisions are made correctly and on time.",
   "Electronic discovery (e-discovery) is the process of identifying, preserving, collecting and producing electronically stored information for litigation or investigations. When litigation is reasonably anticipated, the organization must preserve relevant data. A legal hold suspends normal retention and deletion for the relevant custodians and systems. Destroying relevant data after that point, even through routine auto-deletion, is spoliation and can lead to court sanctions.",
   "Other legal considerations include the jurisdiction of data and of cloud providers, export controls on some encryption technologies, employee monitoring laws that require notice or consent, and working through counsel so that some investigation findings may be covered by legal privilege."
  ],
  terms: [
   ["Data subject", "The individual whom personal data is about."],
   ["Right to erasure", "A GDPR right allowing individuals to request deletion of their personal data in certain circumstances."],
   ["Legal hold", "An instruction to preserve relevant data and suspend normal deletion because of litigation or investigation."],
   ["E-discovery", "Identifying, preserving, collecting and producing electronic information for legal proceedings."],
   ["Spoliation", "Destruction or alteration of evidence that should have been preserved."]
  ],
  example: "A company learns that a former sales manager may sue after being dismissed. Counsel issues a legal hold, and IT suspends the email retention policy for the manager's mailbox, their manager's mailbox and a shared drive. Six months later the data is still intact when the lawsuit is filed, and the company can respond to discovery requests without accusations of destroying evidence.",
  tip: "When litigation is anticipated, the first action is to preserve data with a legal hold, not to delete, copy it around by email or alter it. When a breach involves EU personal data, remember the 72-hour authority notification window.",
  check: [
   ["What is the risk of letting a normal 90-day email deletion policy run after litigation is expected?", "Relevant evidence could be destroyed, which is spoliation and can lead to sanctions; a legal hold must suspend deletion."],
   ["What must you have before you can reliably answer data subject access requests?", "An accurate data inventory showing where each person's data is stored and processed, plus an identity verification process."]
  ]
 },
 {
  t: "Threat modeling methods: STRIDE, PASTA, attack trees, MITRE ATT&CK and attack surface analysis",
  body: [
   "Threat modeling is a structured way to ask what could go wrong with a system and what you will do about it, ideally during design when changes are cheapest. A simple loop works for any method: model the system, identify threats, decide on mitigations, and validate that the mitigations work.",
   "Most models start with a data flow diagram showing external entities, processes, data stores, data flows and trust boundaries. Trust boundaries, where data crosses from less trusted to more trusted zones, are where threats concentrate, for example between the internet and a web tier or between an app and its database.",
   "STRIDE is a mnemonic for six threat categories: Spoofing (pretending to be someone else, countered by authentication), Tampering (modifying data, countered by integrity controls), Repudiation (denying an action, countered by logging and signatures), Information disclosure (countered by encryption and access control), Denial of service (countered by availability controls) and Elevation of privilege (countered by authorization and least privilege). You apply it to each element of the diagram.",
   "PASTA (Process for Attack Simulation and Threat Analysis) is a seven-stage, risk-centric method that starts from business objectives and ends with risk and impact analysis, so it suits teams that need to tie threats to business impact. Attack trees break an attacker goal into branches of alternative and required sub-steps, which helps find the cheapest path an attacker could take and where one control blocks many branches.",
   "MITRE ATT&CK is a knowledge base of real adversary tactics (goals such as persistence or lateral movement) and techniques (how they achieve them). It helps threat models reflect how attackers actually behave and maps directly to detection coverage. Attack surface analysis lists all the entry points an attacker could use, such as exposed ports, APIs, user inputs, third-party integrations and people, and aims to reduce them."
  ],
  terms: [
   ["Trust boundary", "A point in a system where data or control passes between areas with different levels of trust."],
   ["STRIDE", "Threat categories: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege."],
   ["PASTA", "A seven-stage, risk-centric threat modeling process linking threats to business impact."],
   ["Attack tree", "A diagram breaking an attacker's goal into alternative and required sub-steps."],
   ["Attack surface", "The sum of all points where an attacker could try to enter or extract data from a system."]
  ],
  example: "A team designing a mobile banking API draws a data flow diagram with a trust boundary between the app and the API gateway. Using STRIDE, they identify spoofing of the device (mitigated with device-bound tokens), tampering with transfer requests (mitigated with request signing) and repudiation of transfers (mitigated with signed audit logs). They check ATT&CK for techniques banks have seen, such as valid account abuse, and add detections.",
  tip: "STRIDE is a per-element category checklist used at design time; ATT&CK describes observed real-world adversary behavior; PASTA is risk-centric with seven stages. Match the method to the wording of the question.",
  check: [
   ["Which STRIDE category does detailed, tamper-evident audit logging address?", "Repudiation, because it provides evidence of who performed an action."],
   ["When would you choose an attack tree?", "When you want to break an attacker's goal into alternative paths to find the easiest route and the controls that block the most branches."]
  ]
 },
 {
  t: "AI adoption challenges: AI governance, data privacy, prompt injection, model poisoning and acceptable use",
  body: [
   "Organizations are adopting artificial intelligence, especially generative AI and large language models (LLMs), faster than they can govern it. SecurityX expects you to help the business use AI safely rather than simply block it. That means governance, data protection and defenses against AI-specific attacks.",
   "AI governance starts with an inventory of AI systems and tools in use, an acceptable use policy that names approved tools and what data may be entered into them, and a review process for new AI use cases that considers privacy, bias, legal and security risk. Frameworks such as the NIST AI Risk Management Framework and ISO/IEC 42001 provide structure. Human oversight should be required for high-impact decisions, and outputs should be treated as untrusted until checked.",
   "Data privacy is a major concern. Employees may paste confidential data into public tools, and some services may retain prompts or use them for training depending on their terms. Controls include enterprise agreements with clear data handling terms, data classification rules, DLP and CASB policies that detect sensitive data going to AI services, and minimizing personal data used in training or retrieval.",
   "Prompt injection happens when input causes a model to ignore its instructions. Direct injection comes from the user's own prompt; indirect injection hides instructions in content the model processes, such as a web page, document or email. Because a model cannot reliably separate instructions from data, defenses are layered: limit the model's permissions and tool access, keep sensitive actions behind human approval, isolate untrusted content, filter inputs and outputs, and monitor for abuse.",
   "Model and data poisoning corrupt training or fine-tuning data so the model learns harmful or biased behavior or a hidden trigger. Defenses include verifying data provenance, controlling who can change training data and models, and testing models before deployment. Other risks include model theft, model inversion (reconstructing training data from outputs), insecure output handling where model output is passed to other systems without validation, and overreliance on output that may be inaccurate."
  ],
  terms: [
   ["Prompt injection", "Input crafted so a language model follows attacker instructions instead of its intended ones."],
   ["Indirect prompt injection", "Prompt injection delivered through content the model processes, such as a document or web page."],
   ["Data poisoning", "Corrupting training data so a model learns incorrect, biased or hidden behaviors."],
   ["Model inversion", "Using a model's outputs to infer information about its training data."],
   ["AI acceptable use policy", "Rules on which AI tools may be used, for what purposes and with what data."]
  ],
  example: "A company deploys an internal assistant that can read tickets and send emails. The security architect limits the assistant to read-only ticket access, requires human approval before any email is sent, strips hidden text from ticket content, and logs all prompts and actions. When a malicious ticket later tells the model to email customer data outside the company, the action is blocked at the approval step.",
  tip: "Instructions hidden in data the model reads is indirect prompt injection; corrupting training data is poisoning. For employees leaking data into public AI tools, the first answer is governance (acceptable use policy with approved tools) backed by technical controls such as DLP.",
  check: [
   ["Why are layered controls needed against prompt injection?", "Models cannot reliably separate instructions from data, so you limit permissions and tool access, require approval for sensitive actions and filter inputs and outputs."],
   ["What is the difference between model poisoning and model inversion?", "Poisoning corrupts training data to change model behavior; inversion extracts information about training data from the model's outputs."]
  ]
 },
 {
  t: "Resilient system design: high availability, redundancy, load balancing, geographic dispersion and graceful degradation",
  body: [
   "Availability is part of security, and senior architects design systems that keep working when parts fail. Resilience goes beyond having spare parts: it means removing single points of failure, failing in predictable ways, recovering automatically and proving all of this through testing.",
   "High availability (HA) is usually expressed as a percentage of uptime, such as 99.9 percent, and is achieved with redundancy at every layer: multiple power feeds and UPS units, redundant network paths and devices, clustered or replicated servers and databases, and more than one person who knows how to operate the system. Redundancy only helps when the redundant parts do not share a failure, so ask what they have in common, such as a rack, a data center, a region, a vendor or a certificate that expires on the same day.",
   "Load balancers spread requests across healthy instances and remove failed ones using health checks. Active-active designs run all nodes at once and share load; active-passive designs keep a standby ready to take over. Horizontal scaling adds more instances and suits stateless tiers; vertical scaling makes one instance bigger but keeps it a single point of failure.",
   "Geographic dispersion places components in separate locations, such as multiple availability zones or regions, so that a local disaster or regional cloud outage does not take everything down. Data must be replicated to match the recovery point objective, and failover, often DNS-based or through a global load balancer, must be automated or well rehearsed.",
   "Graceful degradation means a system sheds non-essential features under stress so its core function continues, for example disabling recommendations while keeping checkout working. Related ideas include circuit breakers that stop calling a failing dependency, rate limiting, and deciding whether a security control should fail open (allow traffic when it fails, favoring availability) or fail closed (block traffic, favoring security). Chaos engineering and failover tests confirm the design really works."
  ],
  terms: [
   ["High availability", "Design that keeps a service running with minimal downtime, typically through redundancy and automatic failover."],
   ["Active-active", "A configuration where all redundant nodes serve traffic at the same time."],
   ["Geographic dispersion", "Placing redundant components in separate physical locations to survive local or regional disasters."],
   ["Graceful degradation", "Keeping core functions working by reducing or disabling non-essential features under stress."],
   ["Fail closed", "A failure mode where a control blocks access when it fails, favoring security over availability."]
  ],
  example: "A ticketing company runs its web tier active-active across three availability zones behind a load balancer and replicates its database to a second region. During a big concert sale it switches off seat-map animations and recommendation widgets so that checkout stays fast. A regional outage later triggers DNS failover to the second region within the RTO.",
  tip: "Redundancy inside one zone or region does not survive a regional outage; look for geographic dispersion. Vertical scaling adds capacity but not redundancy.",
  check: [
   ["Why can two redundant servers still fail together?", "They may share a dependency such as the same power, rack, zone, region, configuration or certificate, so one event takes both down."],
   ["Should a firewall protecting a payment system fail open or closed, and why?", "Usually fail closed, because allowing all traffic during a failure would expose sensitive systems; availability is kept with redundant firewalls instead."]
  ]
 },
 {
  t: "Secure network architecture: segmentation, microsegmentation, screened subnets, NAC and software-defined networking",
  body: [
   "Network architecture decides how far an attacker can move after gaining a foothold. Flat networks let one compromised laptop reach everything; segmented networks force traffic through control points where it can be filtered and logged.",
   "Segmentation divides the network into zones by trust level and function, such as user workstations, servers, management, OT and guest networks, using VLANs, subnets, firewalls and access control lists. Traffic between zones is allowed only when needed, following least privilege. A screened subnet, traditionally called a DMZ, holds public-facing services between an external and an internal firewall so a compromised web server does not sit on the internal network.",
   "Microsegmentation applies policy down to the individual workload, often using host-based firewalls, hypervisor-level controls or cloud security groups tied to workload identity or tags rather than IP addresses. It controls east-west traffic, the server-to-server traffic inside a data center or cloud network, which perimeter firewalls never see. It is a core technique in zero trust architectures.",
   "Network access control (NAC) decides whether a device may connect and where it lands. Using IEEE 802.1X, the switch or access point acts as the authenticator, passing credentials or certificates to a RADIUS server. NAC can also check posture, such as patch level and EDR status, and place noncompliant devices in a remediation VLAN. Agentless checks and MAC authentication bypass handle devices like printers that cannot run 802.1X, but MAC addresses can be spoofed, so those devices should get restricted access.",
   "Software-defined networking (SDN) separates the control plane, which decides where traffic goes, from the data plane, which forwards it, with a central controller programming devices through APIs. SDN makes segmentation policy consistent and automatable, but the controller becomes a high-value target that must be hardened, access-controlled and monitored. SD-WAN applies similar ideas to wide area links between sites."
  ],
  terms: [
   ["Screened subnet", "A network zone between external and internal firewalls for public-facing services, also called a DMZ."],
   ["Microsegmentation", "Fine-grained policy that controls traffic between individual workloads, even within one subnet."],
   ["East-west traffic", "Traffic moving laterally between systems inside a network or data center."],
   ["802.1X", "An IEEE standard for port-based network access control using an authenticator and an authentication server."],
   ["SDN", "Software-defined networking: separating the control plane into a central controller that programs network devices."]
  ],
  example: "After an intrusion spread from one web server to a dozen others, a company applies microsegmentation so web servers may only talk to the application tier on one port and not to each other. It also enables 802.1X with posture checks so that unpatched laptops are placed in a remediation VLAN until they update.",
  tip: "Perimeter firewalls handle north-south traffic; microsegmentation handles east-west. MAC filtering alone is weak because MAC addresses are easy to spoof.",
  check: [
   ["Why is a public web server placed in a screened subnet rather than the internal network?", "If it is compromised, the attacker is still separated from internal systems by the inner firewall."],
   ["What are the three roles in 802.1X?", "The supplicant (client), the authenticator (switch or access point) and the authentication server (usually RADIUS)."]
  ]
 },
 {
  t: "Zero trust architecture: policy decision and enforcement points, continuous verification and least privilege",
  body: [
   "Zero trust is a security model that removes implicit trust based on network location. Being inside the corporate network no longer means a request is trusted; every access request is evaluated on identity, device and context, and access is granted with the least privilege needed, for as short a time as practical. NIST SP 800-207 describes the reference architecture.",
   "The logical components are the policy engine (PE), which decides whether to grant access; the policy administrator (PA), which carries out the decision by setting up or tearing down the session; and the policy enforcement point (PEP), which sits in the data path in front of the resource and allows or blocks traffic. Together the PE and PA are called the policy decision point (PDP). The PDP draws on signals such as identity and group membership, device health from endpoint management, threat intelligence, activity logs and data classification.",
   "Continuous verification means trust is not granted once at login and assumed forever. Sessions are re-evaluated when context changes, such as a device falling out of compliance, a user suddenly signing in from another country or a risky action being attempted. Access can be reduced, step-up authentication required or the session ended.",
   "Least privilege and microsegmentation limit what any single identity or workload can reach. Just-in-time and just-enough access for administrators removes standing privilege. Encryption of all traffic, even internal, and strong authentication of both users and services are expected.",
   "Common building blocks include an identity provider with MFA and conditional access, device management and posture checks, zero trust network access (ZTNA) instead of broad VPN access, microsegmentation, and detailed logging feeding analytics. Zero trust is a journey rather than a single product; organizations usually start with identity and their most critical applications."
  ],
  terms: [
   ["Policy engine", "The zero trust component that decides whether to grant access based on policy and signals."],
   ["Policy enforcement point", "The component in the data path that enables, monitors and ends connections according to the decision."],
   ["Implicit trust zone", "An area where entities are trusted by location; zero trust aims to shrink these to the smallest possible."],
   ["Continuous verification", "Re-evaluating trust throughout a session as context changes, rather than only at login."],
   ["Just-in-time access", "Granting privileges only when needed and for a limited time."]
  ],
  example: "A contractor signs in to a project management app. The policy engine checks their identity, MFA result and that their laptop is managed and compliant, then the enforcement point allows access only to that app. Halfway through the day the laptop's EDR agent stops reporting; the next request is re-evaluated, and access is blocked until the device is healthy again.",
  tip: "Know the roles: the policy engine decides, the policy administrator executes the decision, and the policy enforcement point allows or blocks traffic in front of the resource. Zero trust never grants access just because a request comes from the internal network.",
  check: [
   ["Which component sits in the data path in front of the resource?", "The policy enforcement point (PEP)."],
   ["Give two signals a policy engine might use.", "User identity and authentication strength, device compliance, location, time, threat intelligence and the sensitivity of the requested resource."]
  ]
 },
 {
  t: "Security in the software development life cycle: requirements, secure design reviews, SAST, DAST, SCA and CI/CD pipeline security",
  body: [
   "Fixing a security flaw in design costs far less than fixing it in production, so security belongs in every phase of the software development life cycle (SDLC). This approach is often called shifting left, and in DevSecOps security checks are automated in the pipeline so they run on every change.",
   "It starts with security requirements, such as authentication strength, logging, encryption and input validation, drawn from sources like OWASP ASVS (Application Security Verification Standard), regulations and threat models. Abuse cases describe how a feature could be misused. Secure design reviews and threat modeling examine the architecture before code is written.",
   "Testing uses several complementary tools. Static application security testing (SAST) analyzes source code without running it and fits into pull requests. Software composition analysis (SCA) inventories third-party and open-source libraries, flags known vulnerabilities and license problems, and can produce an SBOM. Dynamic application security testing (DAST) probes a running application from the outside, like an attacker would, in a test environment. Interactive testing (IAST) instruments the running app during tests. Fuzzing sends malformed or random input to find crashes. Secret scanning catches keys and passwords committed to repositories. Manual code review and penetration tests find logic flaws tools miss.",
   "The CI/CD pipeline itself must be protected, because an attacker who controls the build can ship malicious code that is signed and trusted. Controls include branch protection with required reviews, least-privilege pipeline credentials stored in a secrets manager, ephemeral and isolated build runners, pinned and verified dependencies, signed commits and artifacts, and build provenance attestations such as those described by the SLSA framework.",
   "Security gates should be tuned so that critical findings block a release while lower findings create tickets; overly noisy gates get bypassed. Metrics such as time to remediate by severity show whether the program is working."
  ],
  terms: [
   ["SAST", "Static application security testing: analyzing source code or binaries without executing them."],
   ["DAST", "Dynamic application security testing: testing a running application from the outside."],
   ["SCA", "Software composition analysis: identifying third-party components and their known vulnerabilities and licenses."],
   ["Build provenance", "Verifiable metadata describing how, where and from what sources an artifact was built."],
   ["Shift left", "Moving security activities earlier in the development life cycle."]
  ],
  example: "A fintech team adds SAST and secret scanning to pull requests, SCA to the build, and DAST against its staging environment nightly. After a supply chain attack in the news, it moves builds to ephemeral runners, requires two reviewers for pipeline file changes, and signs container images with provenance so the deployment system rejects anything not built by the official pipeline.",
  tip: "SAST needs code and no running app; DAST needs a running app and no code. Vulnerable open-source libraries are found by SCA. A backdoor inserted in the build is addressed by pipeline integrity controls, not by more testing after release.",
  check: [
   ["Which tool would detect a known vulnerable version of a JSON library in your build?", "Software composition analysis (SCA)."],
   ["Why is code signing alone not enough to stop a compromised build server?", "The build server signs whatever it builds, so malicious code inserted during the build is signed as legitimate; the build process itself must be protected and attested."]
  ]
 },
 {
  t: "Integrating security controls and troubleshooting: firewalls, WAF, proxies, IDS/IPS, SIEM and log collection",
  body: [
   "Security controls only protect you when they are placed correctly, configured precisely and producing useful data. SecurityX includes scenarios where a control is causing a problem or missing an attack, and you must find the targeted fix rather than turning protection off.",
   "Network firewalls filter traffic by address, port and protocol, and next-generation firewalls add application awareness, user identity and threat prevention. Rules are processed in order, usually top down with an implicit deny at the end, so a broad allow rule placed above a specific deny will override it. Web application firewalls (WAFs) inspect HTTP requests for attacks such as injection and cross-site scripting. Forward proxies control and log outbound web access; reverse proxies sit in front of servers to terminate TLS, balance load and hide internal structure.",
   "Intrusion detection systems (IDS) alert on suspicious traffic, while intrusion prevention systems (IPS) sit inline and can block it. Signature-based detection finds known patterns; anomaly-based detection flags deviations from a baseline and produces more false positives. Placement matters: a sensor that cannot see decrypted traffic or east-west traffic will miss attacks there.",
   "When a control blocks legitimate traffic (a false positive), tune the specific rule with a narrowly scoped exception, such as excluding one form field from one WAF rule, and document it. When a control misses attacks (a false negative), check placement, visibility into encrypted traffic, rule currency and whether the log source is actually being collected. TLS inspection may break applications that use certificate pinning, which is usually handled with targeted bypasses.",
   "A security information and event management (SIEM) system collects, normalizes and correlates logs. Common issues include missing log sources, parsing errors that leave fields empty, time drift between sources that breaks correlation (fix with NTP and consistent time zones), and license or storage limits causing dropped events. Log collection should be reliable, protected from tampering and retained according to policy."
  ],
  terms: [
   ["Implicit deny", "The default rule at the end of a firewall rule base that blocks anything not explicitly allowed."],
   ["WAF", "Web application firewall: a control that inspects and filters HTTP requests to web applications."],
   ["False positive", "An alert or block triggered by legitimate activity."],
   ["False negative", "Malicious activity that a control fails to detect or block."],
   ["Log normalization", "Converting logs from different sources into a common format and field names for analysis."]
  ],
  example: "After a new firewall rule set is deployed, internal monitoring stops receiving syslog from the DMZ. The engineer reviews rule order and finds that a new deny-all rule for the DMZ was placed above the rule allowing syslog to the collector. Moving the specific allow rule above the deny restores logging without opening anything else.",
  tip: "The right answer to a false positive is precise tuning, not disabling the control or switching to detection-only mode. If events appear out of order in the SIEM, check time synchronization first.",
  check: [
   ["A specific deny rule is placed below a broad allow rule. What happens?", "The broad allow matches first, so the traffic is permitted and the deny never takes effect."],
   ["What is the main difference between an IDS and an IPS?", "An IDS detects and alerts, usually out of band; an IPS sits inline and can block traffic."]
  ]
 },
 {
  t: "Data security architecture: classification, labeling, DLP, data lifecycle, tokenization and masking",
  body: [
   "Data is usually what attackers want, so data security architecture decides how data is classified, protected and eventually destroyed. Controls should follow the data wherever it goes, not just protect the network around it.",
   "Classification assigns a sensitivity level, such as public, internal, confidential and restricted, based on the harm if the data were disclosed or altered. Data owners decide the classification. Labeling makes the classification visible and machine-readable through document labels, metadata or tags, so other controls can act on it. Automatic classification can scan content for patterns like card numbers or national ID numbers.",
   "Data loss prevention (DLP) inspects data in motion (email, web uploads), at rest (file shares, cloud storage) and in use (endpoints: copy to USB, print, paste) and applies policy: log, warn, block, encrypt or quarantine. DLP works best with labels plus content inspection, and needs tuning to avoid blocking legitimate work.",
   "The data lifecycle runs from creation or collection through storage, use, sharing, archiving and destruction. Each stage needs controls: minimize what you collect, encrypt at rest and in transit, restrict and log access, apply retention schedules, and destroy data securely at the end, for example with crypto-shredding (destroying the encryption keys) in the cloud or physical destruction of media.",
   "Several techniques reduce exposure while keeping data useful. Tokenization replaces a sensitive value with a random token and stores the mapping in a secured vault, so only authorized systems can recover the original; it is common for card numbers and can reduce PCI DSS scope. Data masking hides all or part of a value, such as showing only the last four digits, or creates realistic but fake data for testing. Static masking changes a copy of the data permanently; dynamic masking hides values at query time based on the user. Anonymization removes the ability to identify individuals, while pseudonymization replaces identifiers but can be reversed with additional information. Hashing is one-way but must be salted when the input space is small."
  ],
  terms: [
   ["Data classification", "Assigning a sensitivity level to data based on the impact of its compromise."],
   ["DLP", "Data loss prevention: tools and policies that detect and stop unauthorized movement of sensitive data."],
   ["Tokenization", "Replacing sensitive data with a random token, with the mapping held in a secured vault."],
   ["Dynamic data masking", "Hiding data values at query or display time based on the viewer's permissions."],
   ["Crypto-shredding", "Rendering encrypted data unrecoverable by securely destroying its encryption keys."]
  ],
  example: "An insurer labels claim files as Confidential automatically when they contain policy numbers and medical terms. DLP blocks those files from being emailed to personal addresses and logs the attempt. Its analytics team works on a tokenized copy of the claims database, and developers use statically masked test data, so neither group handles real identifiers.",
  tip: "Tokenization is reversible through the vault and keeps values consistent for correlation; masking typically hides or permanently alters values. Base64 and unsalted fast hashes are not protection for card numbers.",
  check: [
   ["Why does DLP work better when data is labeled?", "Labels give a reliable, machine-readable signal of sensitivity, so policies can act consistently without relying only on content pattern matching."],
   ["What is the difference between anonymization and pseudonymization?", "Anonymized data cannot be linked back to a person; pseudonymized data replaces identifiers but can be re-identified with additional information held separately."]
  ]
 },
 {
  t: "Identity and access architecture: federation (SAML, OIDC, OAuth 2.0), SSO, conditional access and privileged access management",
  body: [
   "Identity is the main control plane in modern environments, where users and applications are spread across data centers, clouds and SaaS. Identity architecture decides how people and services prove who they are, how that proof is trusted across organizations, and how privileges are granted and limited.",
   "Single sign-on (SSO) lets a user authenticate once with an identity provider (IdP) and access many applications, called service providers or relying parties. Federation extends that trust across organizations or cloud services. SAML 2.0 uses signed XML assertions passed through the browser and is common for enterprise SaaS. OpenID Connect (OIDC) is an identity layer on top of OAuth 2.0 that issues an ID token, a signed JSON Web Token (JWT) describing the user, and is common for modern web and mobile apps.",
   "OAuth 2.0 is an authorization framework, not an authentication protocol. It lets a client obtain an access token to call an API on a user's behalf with limited scopes, without handling the user's password. For web and mobile apps, the authorization code flow with PKCE (Proof Key for Code Exchange) is the recommended pattern; the older implicit flow is discouraged. The client credentials flow is used for service-to-service calls.",
   "Conditional access policies evaluate signals at sign-in and during a session, such as user and group, device compliance, location, application sensitivity and sign-in risk, then allow, require MFA, limit the session or block. Phishing-resistant MFA, such as FIDO2 security keys or passkeys and certificate-based authentication, should protect administrators and sensitive apps.",
   "Privileged access management (PAM) protects the accounts that can do the most damage. Practices include vaulting privileged credentials and rotating them automatically, just-in-time elevation with approval and time limits, session recording, separate administrator accounts, privileged access workstations, and regular access reviews. Identity governance adds joiner-mover-leaver processes and certification of access rights so permissions do not accumulate over time."
  ],
  terms: [
   ["Identity provider (IdP)", "The system that authenticates users and issues assertions or tokens to applications."],
   ["SAML 2.0", "An XML-based standard for exchanging authentication assertions between an IdP and service providers."],
   ["OpenID Connect", "An authentication layer on top of OAuth 2.0 that issues ID tokens."],
   ["PKCE", "Proof Key for Code Exchange: an OAuth 2.0 extension that protects the authorization code flow for public clients."],
   ["Privileged access management", "Controls that secure, limit, monitor and audit privileged accounts."]
  ],
  example: "A company connects 60 SaaS apps to its identity provider using SAML and OIDC, so leavers lose access everywhere when their one account is disabled. Conditional access requires compliant devices for finance apps, and administrators must request just-in-time elevation through PAM, which records their sessions and removes the rights after two hours.",
  tip: "OAuth 2.0 is for authorization (access tokens for APIs); OIDC adds authentication (ID tokens); SAML uses XML assertions. Standing admin rights are the problem that just-in-time PAM solves.",
  check: [
   ["A partner app needs to read a user's files through your API without seeing their password. Which standard fits?", "OAuth 2.0, which issues a scoped access token; with OIDC if the app also needs to know who the user is."],
   ["Name three PAM controls.", "Credential vaulting with rotation, just-in-time elevation with approval, and session recording (also separate admin accounts and privileged access workstations)."]
  ]
 },
 {
  t: "Cloud security architecture: shared responsibility, CASB, SASE, cloud workload protection and CSPM",
  body: [
   "Cloud computing changes who is responsible for which controls and how fast infrastructure changes. Most cloud breaches come from customer misconfiguration and weak identity controls rather than provider failures, so architects focus on configuration, identity and visibility.",
   "The shared responsibility model divides duties. The provider always secures the physical data centers, hardware and core infrastructure. In infrastructure as a service (IaaS), the customer manages the guest operating system, applications, network configuration such as security groups, identity and data. In platform as a service (PaaS), the provider also manages the OS and runtime. In software as a service (SaaS), the customer mainly manages users, access settings and data. The customer is always responsible for its data and for who has access.",
   "Cloud security posture management (CSPM) continuously checks cloud accounts against policies and benchmarks and flags risky settings such as public storage buckets, management ports open to the internet, disabled logging or unencrypted databases. Many tools can also fix issues automatically. Cloud workload protection platforms (CWPP) protect the workloads themselves, including virtual machines, containers and serverless functions, with vulnerability scanning, runtime protection and integrity monitoring. Cloud-native application protection platforms (CNAPP) combine these capabilities.",
   "A cloud access security broker (CASB) gives visibility and control over SaaS use: discovering shadow IT, enforcing DLP on uploads, controlling risky sharing and detecting unusual activity. It works through API integration with SaaS platforms or inline as a proxy.",
   "Secure access service edge (SASE) combines wide area networking (SD-WAN) with cloud-delivered security services, which together are called security service edge (SSE): secure web gateway, CASB, zero trust network access and firewall as a service. Users and branches connect to the nearest provider point of presence, so policy is the same wherever they work. Other cloud architecture concerns include logging every account to a central, protected location, separating environments into different accounts or subscriptions, and using infrastructure as code so configurations can be reviewed and scanned."
  ],
  terms: [
   ["Shared responsibility model", "The division of security duties between a cloud provider and its customer, varying by service model."],
   ["CSPM", "Cloud security posture management: continuous detection of risky cloud configurations."],
   ["CWPP", "Cloud workload protection platform: security for VMs, containers and serverless workloads."],
   ["CASB", "Cloud access security broker: visibility and policy enforcement for cloud and SaaS use."],
   ["SASE", "Secure access service edge: SD-WAN combined with cloud-delivered security services."]
  ],
  example: "A company with 80 cloud accounts deploys CSPM and finds 14 storage buckets readable by anyone and several security groups allowing SSH from the whole internet. It fixes them, adds policy-as-code checks to its infrastructure pipeline so the same mistakes are blocked before deployment, and uses a CASB to stop employees from sharing confidential files publicly from the corporate SaaS drive.",
  tip: "In IaaS, the customer patches the guest OS. Public buckets and open ports across accounts point to CSPM; controlling SaaS usage and shadow IT points to CASB; converged networking plus security as a cloud service points to SASE.",
  check: [
   ["In PaaS, who patches the operating system?", "The cloud provider; the customer is responsible for its application code, data, identities and configuration."],
   ["What does CSPM do that a CWPP does not?", "CSPM checks the configuration of cloud accounts and services; CWPP protects the workloads running in them."]
  ]
 },
 {
  t: "Container and serverless security: image scanning, orchestration hardening, secrets management and API gateways",
  body: [
   "Containers and serverless functions let teams deploy quickly, but they create new places for vulnerabilities and secrets to hide. Security has to be built into the image, the orchestrator and the way services talk to each other.",
   "A container image is built from a base image plus application layers. Use minimal, trusted base images from verified sources, pin versions, and rebuild regularly to pick up patches. Scan images for known vulnerabilities and embedded secrets in the pipeline and in the registry, sign images, and let the cluster admit only signed images from approved registries. Containers should run as a non-root user with a read-only file system where possible, and without extra Linux capabilities.",
   "Orchestration platforms such as Kubernetes need their own hardening. Restrict access to the API server, use role-based access control (RBAC) with least-privilege service accounts, keep workloads in separate namespaces, apply network policies so pods only talk to what they need, and enforce pod security standards that block privileged containers and host mounts. Keep the control plane patched, encrypt stored secrets and enable audit logging.",
   "Secrets such as API keys, passwords and certificates must never be baked into images or source code, because anyone who pulls the image or clones the repo gets them. Use a secrets manager or the platform's secrets mechanism with encryption and access control, inject secrets at run time, prefer short-lived credentials and workload identities over static keys, and rotate any secret that has been exposed.",
   "Serverless functions remove server management, but you still own the code, its dependencies, its permissions and its triggers. Give each function a narrowly scoped role, validate every event input, and watch for over-permissive triggers. API gateways sit in front of services and functions to enforce authentication, authorization, rate limiting, input validation and logging in one place. Service meshes can add mutual TLS and policy between microservices."
  ],
  terms: [
   ["Base image", "The starting image on which a container image is built, such as a minimal OS layer."],
   ["Admission control", "A Kubernetes mechanism that checks or blocks workloads, such as unsigned images or privileged pods, before they run."],
   ["Network policy", "A Kubernetes rule that limits which pods can communicate with each other."],
   ["Secrets manager", "A service that stores, controls access to and rotates secrets, delivering them at run time."],
   ["API gateway", "A front door for APIs that enforces authentication, rate limiting and other policies."]
  ],
  example: "A security review finds a cloud access key in an environment file inside a production container image. The team revokes and rotates the key, rebuilds the image without it, switches the service to a workload identity that gets short-lived credentials, and adds secret scanning to the build so any image containing a key fails the pipeline.",
  tip: "Every image layer can be extracted, so a secret anywhere in an image is exposed; encoding does not hide it. For limiting blast radius in Kubernetes, think network policies, least-privilege service accounts and no privileged pods.",
  check: [
   ["Why should containers not run as root?", "If the application is compromised, root inside the container gives the attacker more power and makes container escape to the host more damaging."],
   ["What can an API gateway enforce in one place?", "Authentication, authorization, rate limiting, input validation and logging for all the services behind it."]
  ]
 },
 {
  t: "Hybrid and multicloud design: connectivity, key management, consistent policy and cloud-to-on-premises integration",
  body: [
   "Most large organizations run a mix of on-premises data centers and more than one public cloud. Each environment has its own tools, identity model and defaults, so the architect's job is to connect them securely and keep policy consistent so that gaps do not open between them.",
   "Connectivity options include site-to-site IPsec VPNs over the internet and dedicated private connections offered by cloud providers, which give more predictable performance. Traffic should be encrypted even on private links where required, routes should be limited to what each side needs, and on-premises networks should not simply be flattened into cloud networks. Hub-and-spoke or transit designs centralize inspection and shared services.",
   "Identity should be unified. Federating every cloud with one identity provider gives single sign-on, consistent MFA and conditional access, and one place to remove access when someone leaves. Workloads should use each cloud's native workload identity where possible rather than long-lived keys copied between environments.",
   "Key management needs special attention. Each cloud offers its own key management service, but auditors expect consistent key policies, rotation and separation of duties across all environments. Options include using an external key manager or HSM that integrates with several clouds, bring your own key (BYOK), where you generate keys and import them, and hold your own key (HYOK), where keys never leave your control. The more control you keep, the more operational responsibility you take on.",
   "Consistent policy comes from policy as code, a common tagging and classification scheme, central logging from all environments into one SIEM, and posture management tools that cover every cloud. Watch for data egress costs and data residency rules when replicating between clouds, and plan for the different ways each provider names and implements similar controls."
  ],
  terms: [
   ["Hybrid cloud", "An environment combining on-premises infrastructure with one or more public clouds."],
   ["Multicloud", "Using services from more than one public cloud provider."],
   ["BYOK", "Bring your own key: generating keys under your control and importing them into a cloud key service."],
   ["HYOK", "Hold your own key: keeping keys in your own systems so the provider never holds them."],
   ["Policy as code", "Defining security and compliance rules in machine-readable code that is versioned and automatically enforced."]
  ],
  example: "An insurer runs claims processing on premises, analytics in one cloud and customer portals in another. It federates both clouds with its corporate IdP, sends all logs to one SIEM, uses an external HSM-backed key manager integrated with both clouds so key policy and rotation are identical, and enforces the same tagging and encryption rules through policy as code in every pipeline.",
  tip: "Inconsistent controls across environments point to centralization: one identity provider, central key management, central logging and policy as code. Sharing one static key across environments is never the right answer.",
  check: [
   ["What is the trade-off of HYOK compared with provider-managed keys?", "HYOK gives maximum control and keeps keys from the provider, but you carry the operational burden and some cloud services may not work with it."],
   ["Why federate all clouds with a single identity provider?", "It gives consistent authentication, MFA and conditional access, and one place to disable access for leavers."]
  ]
 },
 {
  t: "Secure architecture for remote access and collaboration: VPN, ZTNA, VDI and secure email gateways",
  body: [
   "Remote and hybrid work means employees, contractors and partners connect from networks and devices you do not control. Remote access architecture must verify users and devices, limit what they can reach and protect data on unmanaged endpoints.",
   "Traditional remote access VPNs, using IPsec or TLS, create an encrypted tunnel that places the user on the internal network. A full-tunnel VPN sends all traffic through the corporate network for inspection; a split tunnel sends only corporate traffic through the tunnel and lets internet traffic go directly, which reduces load but reduces visibility. The main weakness of VPNs is broad network access: once connected, a compromised device may reach far more than it needs.",
   "Zero trust network access (ZTNA) instead brokers connections to individual applications after checking identity, MFA and device posture. Users never join the network, applications are not exposed directly to the internet, and access is re-evaluated continuously. ZTNA is a core part of security service edge offerings.",
   "Virtual desktop infrastructure (VDI) and published applications keep data in the data center or cloud and send only screen images to the user's device. This suits contractors and unmanaged devices, especially when combined with controls on clipboard, printing and file transfer. Jump servers or bastion hosts give administrators a controlled, monitored entry point to sensitive networks.",
   "Collaboration tools need controls too. Secure email gateways filter inbound mail for spam, malware and phishing, sandbox attachments, rewrite and check links, and apply DLP and encryption to outbound mail. Email authentication with SPF, DKIM and DMARC protects your domain from spoofing. For chat and file sharing platforms, manage external sharing, guest access, retention and DLP policies, and remember that meetings and recordings may contain sensitive data."
  ],
  terms: [
   ["Split tunneling", "Sending only corporate traffic through a VPN tunnel while other traffic goes directly to the internet."],
   ["ZTNA", "Zero trust network access: per-application access brokered after identity and device checks, without network-level access."],
   ["VDI", "Virtual desktop infrastructure: hosting desktops centrally and delivering them remotely."],
   ["Bastion host", "A hardened, monitored server used as the controlled entry point for administrative access."],
   ["Secure email gateway", "A service that filters email for threats and enforces policies such as DLP and encryption."]
  ],
  example: "A company replaces its VPN for 300 contractors with ZTNA that grants each contractor access only to the two applications in their contract, and only from devices that pass a posture check. Contractors who need to handle customer data use a virtual desktop with clipboard and download disabled, so data never lands on their personal laptops.",
  tip: "When the requirement is access to specific apps without putting users on the network, choose ZTNA over VPN. When data must never reach an unmanaged device, VDI is the strongest fit.",
  check: [
   ["What is the security trade-off of split tunneling?", "It reduces bandwidth on the corporate link but the organization can no longer inspect or filter the user's internet traffic."],
   ["Why might VDI suit contractors on personal laptops?", "Data stays in the hosted environment and only screen images reach the device, especially with clipboard, printing and download restrictions."]
  ]
 },
 {
  t: "Troubleshooting IAM: authentication failures, federation trust issues, certificate-based auth and MFA problems",
  body: [
   "Identity problems lock people out of their work, and rushed fixes often weaken security. SecurityX expects you to diagnose the real cause from symptoms and logs, then fix it without creating new holes. A good habit is to ask what changed, who is affected (one user, one app, everyone) and which component in the chain is failing.",
   "Plain authentication failures are often caused by expired or locked accounts, disabled accounts after an HR change, wrong user principal names, or password changes not yet synchronized from on-premises directories. Kerberos is sensitive to time: if a client's clock differs from the domain controller's by more than the allowed skew (five minutes by default in Active Directory), tickets are rejected. Duplicate or missing service principal names (SPNs) cause Kerberos failures for specific services.",
   "Federation problems usually show up as errors for one application while others work. The service provider validates assertions against the identity provider's signing certificate, so when the IdP rotates that certificate, every service provider that has not been updated with the new certificate or metadata fails with signature errors. Other causes include mismatched entity IDs or reply URLs, clock skew making assertions appear expired or not yet valid, and missing or wrongly named attribute claims that the app needs to map the user.",
   "Certificate-based authentication, such as smart cards or device certificates for Wi-Fi and VPN, depends on the full chain. Check that the certificate is within its validity dates, that the issuing and root CAs are trusted by the verifier, that the certificate has the right key usage and extended key usage (for example client authentication), and that revocation checking can reach the CRL distribution point or OCSP responder. If revocation checking is required and unreachable, validation fails for everyone.",
   "MFA problems include time drift on servers validating time-based one-time passwords (TOTP), users who replaced phones without re-enrolling, push fatigue attacks where users approve prompts they did not start, and conditional access policies that block legitimate sign-ins. Sign-in logs from the IdP usually show the exact failure reason and which policy applied; read them before changing anything."
  ],
  terms: [
   ["Clock skew", "A difference between system clocks that can cause time-sensitive tokens, tickets and codes to be rejected."],
   ["Signing certificate", "The certificate an IdP uses to sign assertions; service providers must trust the current one."],
   ["Extended key usage", "A certificate field that limits what the certificate may be used for, such as client or server authentication."],
   ["CRL distribution point", "The location in a certificate where verifiers download the certificate revocation list."],
   ["MFA fatigue", "An attack that floods a user with push prompts hoping they approve one."]
  ],
  example: "On Monday morning, users can sign in to email and chat but get an invalid signature error in the HR SaaS app. The IdP team rotated its token-signing certificate over the weekend and updated most apps' metadata, but the HR app was configured manually. Uploading the new certificate to the HR app restores access for everyone.",
  tip: "When one federated app fails and the rest work, suspect that app's trust configuration, especially an outdated IdP signing certificate. When time-based things fail on one server only, check NTP.",
  check: [
   ["What causes a certificate that is still in date to be rejected when the CA's CRL server is removed?", "The verifier cannot confirm revocation status; if revocation checking is required, validation fails closed."],
   ["Where should you look first to understand why a user's sign-in was blocked?", "The identity provider's sign-in logs, which show the failure reason and any conditional access policy applied."]
  ]
 },
 {
  t: "Endpoint and server hardening: secure baselines, application allow lists, EDR, host firewalls and patching",
  body: [
   "Hardening reduces the attack surface of each system and makes attacks that do get in easier to detect. At scale, hardening is not about clicking through settings on each machine; it is about defining a baseline once, applying it automatically and proving compliance continuously.",
   "A secure baseline is the approved minimum configuration for a class of systems, often built from CIS Benchmarks or vendor security baselines. It covers removing unnecessary software and services, disabling legacy protocols (such as SMBv1 and older TLS versions), enforcing strong authentication, configuring logging and audit policies, and setting file and registry permissions. Configuration management tools and group policy apply it; compliance scans detect drift.",
   "Application allow listing permits only approved software to run, based on publisher signatures, file paths or hashes. It is especially effective on fixed-function systems such as point-of-sale terminals, kiosks and servers, and blocks unknown malware that signature-based antivirus would miss. Block lists do the opposite and are weaker, because they only stop what is already known.",
   "Endpoint detection and response (EDR) records detailed activity such as process creation, command lines, network connections and file changes, detects suspicious behavior, and lets responders isolate a host, kill processes or collect evidence remotely. Extended detection and response (XDR) correlates endpoint data with other sources such as email, identity and network. Host-based firewalls restrict inbound and outbound connections per host, which limits lateral movement even inside a trusted subnet. Host-based intrusion prevention and file integrity monitoring add further protection.",
   "Patching closes known vulnerabilities. A mature process maintains an inventory, subscribes to vendor advisories, prioritizes by exploitation and exposure, tests patches on a representative group before broad rollout, and has a way to handle systems that cannot be patched, such as isolation or compensating controls. Firmware, drivers and third-party applications need patching too, not only the operating system. Other hardening steps include full-disk encryption, disabling unused ports and interfaces, local administrator password management and secure boot."
  ],
  terms: [
   ["Secure baseline", "The approved minimum security configuration for a type of system."],
   ["Application allow list", "A control that permits only approved applications to run."],
   ["EDR", "Endpoint detection and response: tools that record endpoint activity, detect threats and support response actions."],
   ["Configuration drift", "Divergence of a system's actual configuration from its approved baseline."],
   ["Host-based firewall", "A firewall running on an individual system that controls its own network connections."]
  ],
  example: "A retailer's point-of-sale terminals are infected by memory-scraping malware that its antivirus did not recognize. After the incident, the retailer enables application allow listing so only its signed point-of-sale software can run, applies a CIS-based baseline through configuration management, and deploys EDR to alert on unusual process behavior.",
  tip: "For fixed-function devices, application allow listing is usually the strongest answer. EDR's advantage over traditional antivirus is behavioral detection and response, not better signatures.",
  check: [
   ["Why is allow listing stronger than block listing?", "Allow listing blocks everything not approved, including unknown malware, while block listing only stops software already known to be bad."],
   ["How do you prove that 500 servers still match their baseline?", "Run automated compliance scans against the baseline and report drift, with configuration management reapplying the approved state."]
  ]
 },
 {
  t: "Hardware security: TPM, HSM, secure boot, measured boot, secure enclaves and firmware integrity",
  body: [
   "Software controls are only as trustworthy as the hardware and firmware beneath them. If an attacker controls the boot process or firmware, they can hide from the operating system and every security tool running on it. Hardware security features establish a root of trust that the rest of the system builds on.",
   "A Trusted Platform Module (TPM) is a small chip, or firmware equivalent, on a device. It securely generates and stores keys that cannot be exported, protects disk encryption keys (for example, BitLocker can release its key only when boot measurements match), and records measurements of boot components in platform configuration registers (PCRs). A TPM belongs to one device.",
   "A hardware security module (HSM) is a dedicated, tamper-resistant appliance, card or cloud service built to generate, store and use many keys at high speed for many applications. HSMs back certificate authorities, payment processing, code signing and cloud key management services, and are often validated against FIPS 140. Keys can be used inside the HSM without ever being exposed in plaintext to the application.",
   "UEFI Secure Boot checks the digital signature of each boot component, such as the bootloader and kernel, against trusted keys stored in firmware, and refuses to run anything unsigned or untrusted. Measured boot does not block anything; it records a hash of each component into the TPM. Remote attestation then sends a signed report of those measurements to a verifier, such as a device health service or network access control, which decides whether the device is trustworthy.",
   "Secure enclaves and trusted execution environments isolate code and data in a protected area of the processor so that even the operating system or hypervisor cannot read them, protecting data in use. Confidential computing in the cloud builds on this. Firmware integrity also matters: use signed firmware updates from the vendor, protect firmware settings with passwords, keep firmware patched, and monitor for unexpected changes. Supply chain checks, such as verifying hardware provenance, reduce the risk of tampered devices."
  ],
  terms: [
   ["TPM", "Trusted Platform Module: a device-bound chip that stores keys and boot measurements."],
   ["HSM", "Hardware security module: a tamper-resistant device or service for high-volume key management and cryptographic operations."],
   ["Secure Boot", "A UEFI feature that allows only signed, trusted boot components to run."],
   ["Measured boot", "Recording hashes of boot components into the TPM so the boot state can be verified later."],
   ["Remote attestation", "Sending signed measurements of a device's state to a verifier that decides whether to trust it."]
  ],
  example: "A company requires laptops to pass a device health check before accessing internal apps. Each laptop uses Secure Boot to block untrusted bootloaders and measured boot to record its boot chain in the TPM. The device health service verifies the TPM-signed measurements, and the conditional access policy blocks any laptop whose attestation fails.",
  tip: "Secure Boot blocks untrusted code; measured boot records what ran so it can be attested. A TPM is per device; an HSM serves many applications at high volume.",
  check: [
   ["Which component would a certificate authority use to protect its signing key?", "An HSM, which stores the key in tamper-resistant hardware and performs signing without exposing it."],
   ["What problem does a secure enclave address?", "Protecting data and code while in use, even from a compromised operating system or hypervisor."]
  ]
 },
 {
  t: "Specialized and legacy systems: OT/ICS/SCADA, IoT, embedded systems and compensating controls",
  body: [
   "Not every system can be patched monthly or run an EDR agent. Operational technology (OT), industrial control systems (ICS), building systems, medical devices, IoT and old line-of-business servers often run outdated software, have long lifespans and have strict availability or safety requirements. Security architects protect them mainly by surrounding them with controls.",
   "ICS include supervisory control and data acquisition (SCADA) systems that monitor and control geographically spread assets such as pipelines and power grids, distributed control systems (DCS) for plants, programmable logic controllers (PLCs) that run physical processes, and human-machine interfaces (HMIs) that operators use. Industrial protocols such as Modbus and DNP3 were designed for reliability, often without authentication or encryption.",
   "In OT, safety and availability usually come before confidentiality, because an outage or unexpected command can hurt people or damage equipment. That changes security practice: active scans can crash fragile devices, patches need vendor approval and planned outages, and changes go through strict engineering change control. Passive network monitoring that learns normal industrial traffic is preferred for detection.",
   "Segmentation is the main defense. The Purdue model describes levels from physical process up to enterprise IT, and ISA/IEC 62443 uses zones and conduits: group assets with similar security needs into zones and tightly control the communication paths (conduits) between them. An industrial DMZ separates IT and OT, and unidirectional gateways, or data diodes, allow data to flow out of OT while physically preventing anything flowing back in. Remote vendor access should go through a monitored jump host with MFA and time-limited approval.",
   "IoT and embedded devices often ship with default credentials, rarely receive updates and have limited processing power. Controls include changing defaults, placing devices on isolated networks, blocking unnecessary internet access, monitoring behavior, and requiring secure update support in procurement. For legacy systems that cannot be upgraded, compensating controls such as isolation, strict access control, application allow listing and extra monitoring reduce risk until they can be replaced, and the residual risk should be formally accepted."
  ],
  terms: [
   ["SCADA", "Supervisory control and data acquisition: systems that monitor and control distributed industrial assets."],
   ["PLC", "Programmable logic controller: an industrial computer that controls a physical process."],
   ["Zones and conduits", "An ISA/IEC 62443 approach grouping assets into security zones and controlling the paths between them."],
   ["Data diode", "A unidirectional gateway that physically allows data to flow in only one direction."],
   ["Compensating control", "An alternative control that reduces risk when the primary control cannot be applied."]
  ],
  example: "A water treatment plant cannot patch the Windows systems running its HMIs because the vendor has not certified the updates. The team places them in a dedicated OT zone, allows only required industrial protocols through the conduit to the PLCs, sends historian data to the corporate network through a data diode, and requires vendors to connect through a recorded jump host with MFA.",
  tip: "In OT questions, prefer answers that preserve availability and safety: segmentation, passive monitoring and controlled remote access. Answers that run aggressive scans or install new agents on controllers are usually wrong.",
  check: [
   ["Why are active vulnerability scans risky in OT networks?", "Fragile controllers and old protocol stacks can crash or behave unpredictably, disrupting physical processes."],
   ["What does a data diode guarantee?", "Data can flow only in one direction, so nothing can be sent back into the protected network through it."]
  ]
 },
 {
  t: "Security automation: scripting (PowerShell, Python, Bash), SOAR playbooks, infrastructure as code and configuration drift",
  body: [
   "Security teams face more alerts, systems and changes than people can handle by hand. Automation makes routine work fast and consistent, frees analysts for judgment calls and reduces human error. It also amplifies mistakes, so it needs the same care as any production code.",
   "Scripting is the everyday tool. PowerShell automates Windows and Microsoft cloud administration, such as querying event logs or disabling accounts. Python is widely used for API integrations, log parsing and data analysis. Bash automates Linux tasks and chains command-line tools. SecurityX may show a short script and ask what it does or what is wrong with it, so be able to read loops, conditions and API calls. Good practice includes storing scripts in version control, peer review, running with the least privilege needed, handling errors, logging actions, and testing with a dry-run mode before production.",
   "Security orchestration, automation and response (SOAR) platforms run playbooks that connect many tools through their APIs. A phishing playbook might extract URLs and attachments from a reported email, check their reputation, search all mailboxes for the same message, quarantine matches, block the sender and open a ticket. Human approval steps can be kept for high-impact actions such as isolating a server.",
   "Infrastructure as code (IaC) defines servers, networks and cloud resources in files, using tools such as Terraform, CloudFormation, Bicep or Ansible, so environments are built repeatably from reviewed code. Security benefits include peer review of changes, scanning templates for misconfigurations before deployment (policy as code), and the ability to rebuild quickly after an incident.",
   "Configuration drift happens when the real environment differs from what the code or baseline declares, often because someone made a manual change. Drift detection compares actual state with desired state and reports differences; the fix is to reapply the declared state and route future changes through the pipeline. Immutable infrastructure, where servers are replaced rather than changed in place, largely avoids drift."
  ],
  terms: [
   ["SOAR", "Security orchestration, automation and response: platforms that run playbooks across security tools."],
   ["Playbook", "A defined, often automated sequence of steps for handling a specific type of event."],
   ["Infrastructure as code", "Defining and provisioning infrastructure through machine-readable files instead of manual steps."],
   ["Policy as code", "Security and compliance rules written as code and enforced automatically, for example in a pipeline."],
   ["Immutable infrastructure", "An approach where systems are replaced with new builds instead of being modified in place."]
  ],
  example: "A SOC receives about 200 reported phishing emails a week. A SOAR playbook now extracts indicators, checks reputation, removes matching messages from every mailbox and closes obvious spam automatically, while suspicious cases go to an analyst with all the evidence gathered. Analyst time per report drops from 20 minutes to about 3.",
  tip: "Manual changes that differ from Terraform or the baseline are configuration drift; the fix is detection and reapplying the declared state. For automation safety, look for testing, dry runs, peer review and least privilege.",
  check: [
   ["Name two security benefits of infrastructure as code.", "Changes are peer-reviewed and versioned, and templates can be scanned for misconfigurations before deployment; environments can also be rebuilt consistently."],
   ["Why keep a human approval step in some SOAR playbooks?", "High-impact actions, like isolating a production server, can cause outages if the automation is wrong, so a person confirms them."]
  ]
 },
 {
  t: "Advanced cryptographic concepts: post-quantum cryptography, key stretching, forward secrecy, homomorphic encryption and envelope encryption",
  body: [
   "SecurityX goes beyond knowing that AES is symmetric and RSA is asymmetric. You need to understand the design ideas behind modern cryptographic systems and when each one solves a real problem.",
   "Post-quantum cryptography (PQC) addresses the threat that a large, fault-tolerant quantum computer could break today's public key algorithms, including RSA, Diffie-Hellman and elliptic curve cryptography, using Shor's algorithm. Symmetric ciphers and hashes are affected much less; larger key sizes such as AES-256 are considered adequate. NIST has published post-quantum standards, including ML-KEM for key establishment and ML-DSA and SLH-DSA for digital signatures. Because attackers can record encrypted traffic now and decrypt it later (harvest now, decrypt later), organizations should inventory where they use cryptography, build crypto agility so algorithms can be swapped, and plan migrations, often starting with hybrid schemes that combine classical and post-quantum algorithms.",
   "Key stretching makes weak secrets, like passwords, expensive to guess. Functions such as PBKDF2, bcrypt, scrypt and Argon2 apply many iterations and, for scrypt and Argon2, large amounts of memory, combined with a unique salt per password. Salts defeat precomputed rainbow tables; the work factor slows each guess.",
   "Forward secrecy (often called perfect forward secrecy) ensures that compromising a server's long-term private key does not expose past session keys. It uses ephemeral Diffie-Hellman key exchange (DHE or ECDHE), generating fresh key material for each session and discarding it afterward. TLS 1.3 only allows forward-secret key exchanges.",
   "Homomorphic encryption allows computation on encrypted data without decrypting it, so a third party can process data it cannot read. It is still slow and used for specialized cases. Envelope encryption encrypts data with a data encryption key (DEK) and then encrypts the DEK with a key encryption key (KEK) stored in a KMS or HSM. The master key never leaves the key service, bulk data is encrypted locally, and rotating the KEK only requires re-wrapping the small DEKs. Other concepts to know include authenticated encryption (such as AES-GCM), which provides confidentiality and integrity together, and elliptic curve cryptography, which gives equivalent strength with smaller keys than RSA."
  ],
  terms: [
   ["Post-quantum cryptography", "Algorithms designed to resist attacks from quantum computers, such as ML-KEM and ML-DSA."],
   ["Crypto agility", "The ability to change cryptographic algorithms and keys without redesigning systems."],
   ["Key stretching", "Deriving keys from passwords with slow, salted functions to resist guessing."],
   ["Forward secrecy", "A property where compromise of long-term keys does not reveal past session keys."],
   ["Envelope encryption", "Encrypting data with a data key, then encrypting that data key with a master key in a KMS or HSM."]
  ],
  example: "A healthcare records provider must keep patient data confidential for decades. Its security team inventories every system using RSA and ECDH, prioritizes long-lived data flows, enables hybrid post-quantum key exchange where its TLS libraries support it, and stores documents with envelope encryption so it can rotate master keys in the KMS without re-encrypting terabytes of files.",
  tip: "Harvest now, decrypt later points to post-quantum planning; stolen server key and past sessions points to forward secrecy; computing on encrypted data points to homomorphic encryption; data key wrapped by a master key points to envelope encryption.",
  check: [
   ["Why are symmetric algorithms less affected by quantum computing than RSA?", "Known quantum attacks (Grover's algorithm) only roughly halve symmetric key strength, which larger keys offset, while Shor's algorithm breaks RSA and ECC entirely."],
   ["What two things make bcrypt or Argon2 good for password storage?", "A unique salt per password and a configurable work factor that makes each guess slow."]
  ]
 },
 {
  t: "Cryptographic use cases: data at rest, in transit and in use, code signing, digital signatures and secure key exchange",
  body: [
   "Choosing the right cryptographic control starts with the goal: confidentiality, integrity, authentication, non-repudiation, or a combination. Then consider the state of the data: at rest, in transit or in use.",
   "Data at rest is protected with symmetric encryption such as AES, at several possible layers: full-disk encryption protects lost or stolen devices; file or object encryption protects individual items; database encryption, including transparent data encryption, protects database files; and application-level or field-level encryption protects specific values even from database administrators. The higher the layer, the more targeted the protection and the more work to implement. Key management decides how strong any of these really is.",
   "Data in transit is protected with protocols such as TLS for web and API traffic, IPsec for network tunnels, and SSH for administration. Current practice is TLS 1.2 or 1.3 with strong cipher suites, certificate validation and, for internal service-to-service traffic, often mutual TLS. Data in use is the hardest to protect; options include secure enclaves, confidential computing and, for specialized cases, homomorphic encryption.",
   "Digital signatures use asymmetric cryptography: the signer hashes the data and signs the hash with a private key, and anyone with the public key can verify it. Signatures provide integrity, authentication of the signer and non-repudiation. Code signing applies this to software, so operating systems and users can confirm the publisher and that the code has not changed since signing; the signing keys must be protected, ideally in an HSM, because a stolen code-signing key lets attackers sign malware.",
   "Secure key exchange lets two parties agree on a shared secret over an untrusted network. Diffie-Hellman and its elliptic curve form (ECDH), used in ephemeral mode, are standard and give forward secrecy. The exchanged secret then keys fast symmetric encryption, which is why hybrid designs, asymmetric for exchange and symmetric for bulk data, are everywhere. Hashes such as SHA-256 provide integrity checks, and HMAC adds a secret key so only parties with the key can create a valid tag."
  ],
  terms: [
   ["Data in use", "Data being processed in memory or by the CPU, as opposed to stored or transmitted."],
   ["Field-level encryption", "Encrypting specific fields within a record so they stay protected in the database and backups."],
   ["Digital signature", "A value created with a private key over a hash of data, verifiable with the matching public key."],
   ["Non-repudiation", "Assurance that a party cannot credibly deny having performed an action, such as signing a document."],
   ["HMAC", "Hash-based message authentication code: a keyed hash that proves integrity and origin to key holders."]
  ],
  example: "A software company signs every installer and update with a code-signing key held in an HSM, so customers' systems reject tampered files. Its customer portal uses TLS 1.3, its database uses field-level encryption for bank account numbers so even DBAs see ciphertext, and its internal microservices authenticate each other with mutual TLS.",
  tip: "Signatures are created with the sender's private key and verified with the public key; encryption for confidentiality uses the recipient's public key. Proving the publisher of software points to code signing.",
  check: [
   ["Which key does a recipient use to verify a digital signature?", "The signer's public key."],
   ["When would you choose field-level encryption over full-disk encryption?", "When specific sensitive values must stay protected from database administrators, applications without need, and backups, not just from physical theft."]
  ]
 },
 {
  t: "PKI engineering: certificate lifecycle, CA hierarchy, OCSP and CRLs, certificate pinning and mutual TLS",
  body: [
   "Public key infrastructure (PKI) binds public keys to identities through certificates issued by certificate authorities (CAs). Senior engineers design the hierarchy, automate the lifecycle and troubleshoot trust failures. Outages from expired certificates are among the most common and avoidable incidents in IT.",
   "A typical enterprise hierarchy has an offline root CA, which is powered on only to sign intermediate certificates and revocation lists, and one or more online intermediate (issuing) CAs that issue certificates to users, devices and servers. If an issuing CA is compromised, the root revokes it and a new intermediate is created without rebuilding trust everywhere. Protect CA keys in HSMs and control who can approve certificate templates.",
   "The certificate lifecycle includes key generation, a certificate signing request (CSR), validation and issuance, installation, monitoring, renewal and revocation. Automation with protocols such as ACME, together with a certificate inventory and expiry alerts, prevents outages. Certificates should include the correct subject alternative names (SANs), because modern clients match hostnames against SANs, and appropriate key usage and extended key usage values.",
   "Revocation tells relying parties that a certificate should no longer be trusted, for example after key compromise. A certificate revocation list (CRL) is a signed list published periodically; clients download it from the CRL distribution point. The Online Certificate Status Protocol (OCSP) lets a client ask about one certificate. OCSP stapling has the server attach a recent signed OCSP response to the TLS handshake, which is faster and more private. If revocation information is unreachable, clients either fail open or fail closed depending on configuration.",
   "Certificate pinning makes a client accept only a specific certificate or public key for a service, which defeats rogue or intercepting certificates but breaks TLS inspection and requires careful key rotation planning. Mutual TLS (mTLS) requires both client and server to present certificates, giving strong two-way authentication for service-to-service traffic, APIs and device access. Other items to know are wildcard certificates (convenient but a single key exposed across many hosts), certificate transparency logs, and the difference between self-signed and CA-issued certificates."
  ],
  terms: [
   ["Intermediate CA", "A CA whose certificate is signed by the root and which issues end-entity certificates."],
   ["CSR", "Certificate signing request: a message containing a public key and identity details sent to a CA for signing."],
   ["OCSP stapling", "A server including a recent signed OCSP response in its TLS handshake."],
   ["Certificate pinning", "Configuring a client to accept only specific certificates or public keys for a service."],
   ["Mutual TLS", "TLS in which both client and server authenticate with certificates."]
  ],
  example: "A company's customer portal goes down on a Saturday because its certificate expired; the only reminder went to an engineer who had left. The PKI team builds a certificate inventory, enables automated renewal through ACME for web servers, sets alerts 30 days before expiry, and moves its root CA offline with two intermediate CAs so a compromise of one issuing CA can be contained.",
  tip: "The offline root plus online intermediates design limits damage from a CA compromise. OCSP stapling improves revocation checking performance and privacy. Pinning breaks TLS inspection proxies.",
  check: [
   ["Why keep the root CA offline?", "It greatly reduces the chance of root key compromise; if an online issuing CA is compromised, the root can revoke it and issue a new one."],
   ["A browser shows a name mismatch though the certificate's CN looks right. What should you check?", "The subject alternative name list, because modern clients match hostnames against SANs rather than the CN."]
  ]
 },
 {
  t: "Email and DNS security engineering: SPF, DKIM, DMARC, DNSSEC and S/MIME",
  body: [
   "Email and DNS are old protocols built without strong authentication, and attackers abuse them for phishing, spoofing and redirection. Several DNS-published standards add the missing checks, and SecurityX expects you to know how they fit together and roll them out safely.",
   "Sender Policy Framework (SPF) is a TXT record listing the servers allowed to send mail for a domain; receivers check the connecting server's IP against it. SPF checks the envelope sender (the return path), not the From address users see, and it breaks when mail is forwarded. DomainKeys Identified Mail (DKIM) signs outgoing messages with a private key; the public key is published in DNS under a selector, and receivers verify the signature, which survives most forwarding.",
   "Domain-based Message Authentication, Reporting and Conformance (DMARC) ties them together. It requires that SPF or DKIM passes and that the passing domain aligns with the visible From domain, then tells receivers what to do when that fails: p=none (monitor only), p=quarantine (send to spam) or p=reject. DMARC also sends aggregate reports so domain owners can see who is sending as them. A safe rollout starts at p=none, fixes legitimate senders found in reports, then moves to quarantine and reject. Domains that never send mail should publish a reject policy too.",
   "DNS Security Extensions (DNSSEC) add digital signatures to DNS records. Validating resolvers follow a chain of trust from the root through each zone's DS and DNSKEY records, which prevents forged answers such as cache poisoning. DNSSEC provides integrity and authenticity, not confidentiality. DNS over HTTPS (DoH) and DNS over TLS (DoT) encrypt queries between client and resolver for privacy, which is a different goal, and they can reduce enterprise visibility if clients bypass corporate resolvers.",
   "S/MIME (Secure/Multipurpose Internet Mail Extensions) uses certificates to sign and encrypt individual email messages end to end, proving the sender and protecting content even on the mail servers. It requires certificates for users and key management for recovery. Transport encryption between mail servers with TLS protects messages in transit but not at rest on servers."
  ],
  terms: [
   ["SPF", "A DNS record listing servers authorized to send mail for a domain."],
   ["DKIM", "A method of signing email with a domain key published in DNS."],
   ["DMARC", "A policy that requires aligned SPF or DKIM results and tells receivers how to handle failures, with reporting."],
   ["DNSSEC", "Extensions that add digital signatures to DNS data so resolvers can verify authenticity."],
   ["S/MIME", "A standard for signing and encrypting individual email messages with certificates."]
  ],
  example: "Attackers send invoices that appear to come from a manufacturer's domain. The manufacturer already has SPF and DKIM but no DMARC. It publishes a DMARC record with p=none and a reporting address, discovers a marketing platform sending on its behalf without DKIM, fixes it, and three months later moves to p=reject. Spoofed invoices using its exact domain are now rejected by major receivers.",
  tip: "Only DMARC tells receivers to reject spoofed mail and provides reports; SPF and DKIM alone do not set a policy. DNSSEC gives authenticity of DNS answers; DoH and DoT give privacy.",
  check: [
   ["Why can a message pass SPF but still fail DMARC?", "SPF may pass for the envelope sender domain, but DMARC also requires that domain to align with the visible From domain."],
   ["Does DNSSEC encrypt DNS queries?", "No. It signs DNS data for integrity and authenticity; DoH and DoT provide encryption."]
  ]
 },
 {
  t: "Mobile and endpoint management: MDM/UEM, containerization, device attestation and BYOD controls",
  body: [
   "Phones, tablets and laptops carry corporate data everywhere, often on devices that also hold personal content. Mobile and endpoint management lets an organization set security policy, protect corporate data and prove device health without taking over employees' personal lives.",
   "Mobile device management (MDM) enrolls devices and enforces policies such as screen lock and passcode rules, encryption, OS version minimums, Wi-Fi and VPN profiles, app installation and remote lock or wipe. Unified endpoint management (UEM) extends the same approach to laptops, desktops and other endpoints from one console. Mobile application management (MAM) manages policies at the app level, which works even on devices that are not fully enrolled.",
   "Deployment models shape what controls are acceptable. Corporate-owned, business-only (COBO) devices can be fully managed. Corporate-owned, personally enabled (COPE) devices allow some personal use. Choose your own device (CYOD) lets employees pick from approved models. Bring your own device (BYOD) uses personal devices and requires a lighter touch to respect privacy.",
   "Containerization, often called a work profile, separates corporate apps and data from personal ones on the same device. Policies can prevent copying data from corporate to personal apps, require a separate PIN for the work container, and allow a selective or enterprise wipe that removes only corporate data when the employee leaves or the device is lost. A full device wipe is usually unacceptable on BYOD.",
   "Device attestation proves that a device is genuine and has not been tampered with, for example not rooted or jailbroken, using hardware-backed checks provided by the platform. Conditional access can then allow corporate apps only on compliant, attested devices. Other mobile risks to address include sideloaded apps, malicious profiles, lost devices, insecure public Wi-Fi and SMS-based phishing. Policies should also cover keeping devices updated and removing access promptly when devices fall out of compliance."
  ],
  terms: [
   ["MDM", "Mobile device management: enrolling devices and enforcing security policies on them."],
   ["UEM", "Unified endpoint management: one platform managing mobile devices, laptops and desktops."],
   ["Containerization", "Separating corporate apps and data from personal content on a device."],
   ["Selective wipe", "Removing only corporate data and apps from a device, leaving personal content."],
   ["Device attestation", "Hardware-backed proof that a device is genuine and not compromised, such as rooted or jailbroken."]
  ],
  example: "A consultancy lets staff read email on personal phones. It deploys app-level management with a work profile: corporate email and files live in the managed container, copying to personal apps is blocked, and access requires a compliant, attested device. When a consultant leaves, IT issues a selective wipe that removes the work profile while personal photos and apps remain untouched.",
  tip: "For BYOD, look for containerization and selective wipe rather than full device wipe. Rooted or jailbroken devices are detected through attestation and blocked through conditional access.",
  check: [
   ["What is the main difference between MDM and MAM?", "MDM manages the whole device through enrollment; MAM applies policies to specific apps and their data, which suits unmanaged personal devices."],
   ["Why is a full device wipe a problem for BYOD?", "It erases the employee's personal data, which raises privacy and legal concerns; a selective wipe removes only corporate data."]
  ]
 },
 {
  t: "Secrets and key management: vaults, key rotation, KMS, hardware-backed keys and separation of duties",
  body: [
   "Encryption is only as strong as the protection of its keys, and applications are only as secure as the credentials they use. Secrets such as passwords, API keys, tokens and private keys leak through source code, configuration files, logs and images. Key and secrets management keeps them out of those places and under control.",
   "A secrets vault stores secrets encrypted, controls access with fine-grained policies, logs every access and delivers secrets to applications at run time through APIs. Advanced vaults issue dynamic secrets, such as database credentials created on request with a short lifetime, so there is nothing long-lived to steal. Workload identities, where the platform proves an application's identity to the vault or cloud service, remove the need for a bootstrap secret in the code.",
   "A key management service (KMS) manages cryptographic keys: creating them, controlling who can use them, logging use and rotating them. Cloud KMS services typically keep master keys in HSMs and never release them; applications send data keys to be wrapped or unwrapped, as in envelope encryption. Key hierarchies separate master keys from data keys so that compromise of one data key has limited impact.",
   "Key rotation replaces keys on a schedule and immediately after suspected compromise. Rotation limits how much data one key protects and how long a stolen key remains useful. Plan how old data will be decrypted after rotation, for example by keeping previous key versions available for decryption only. Secrets exposed anywhere, such as a key pushed to a public repository, must be revoked and rotated at once; deleting the commit is not enough.",
   "Separation of duties ensures no single person controls a key end to end. For example, key administrators can manage key policies but cannot use keys to decrypt data, while application owners can use keys but not change their policies. Split knowledge and dual control, such as requiring several custodians to present key shares, protect the most sensitive operations, such as a root CA ceremony. Hardware-backed keys, stored in HSMs, TPMs or secure elements, prevent keys from being copied off the device."
  ],
  terms: [
   ["Secrets vault", "A system that stores, controls and audits access to secrets and delivers them at run time."],
   ["Dynamic secret", "A credential generated on request with a short lifetime and revoked automatically."],
   ["Key rotation", "Replacing cryptographic keys on a schedule or after compromise."],
   ["Dual control", "Requiring two or more people to act together to perform a sensitive operation."],
   ["Split knowledge", "Dividing a secret so no single person knows it completely."]
  ],
  example: "A developer accidentally pushes a cloud access key to a public repository, and automated scanners find it within minutes. The team revokes the key, reviews the audit logs for any use, and moves the application to a workload identity that receives short-lived credentials from the cloud platform. A pipeline secret scanner now blocks commits that contain credentials.",
  tip: "An exposed secret must be revoked and rotated; removing it from the code does not undo the exposure. Separation of duties means key administrators should not be able to use keys to read data.",
  check: [
   ["Why are dynamic secrets safer than static database passwords?", "They are created on demand with a short lifetime, so a stolen credential expires quickly and each use is individually logged."],
   ["What does dual control add to a root CA key ceremony?", "No single person can perform the operation alone, which protects against insider misuse and mistakes."]
  ]
 },
 {
  t: "Secure configuration of network infrastructure: SNMPv3, SSH, management plane protection and secure routing",
  body: [
   "Routers, switches, firewalls and wireless controllers are high-value targets: whoever controls them controls where traffic goes. Hardening network infrastructure focuses on who can manage the devices, how they are monitored, and whether the routing information they exchange can be trusted.",
   "Network devices have three logical planes. The data plane forwards user traffic. The control plane runs routing protocols and builds forwarding tables. The management plane is how administrators and monitoring systems access the device, through SSH, web interfaces, APIs and SNMP. Protecting the management plane means allowing management only from a dedicated management network or jump hosts, using out-of-band management where possible, and applying access lists to management services.",
   "Use secure protocols. SSH version 2 replaces Telnet, HTTPS replaces HTTP for web management, and SCP or SFTP replace TFTP and FTP for file transfer. SNMPv1 and v2c send community strings in clear text and should be replaced by SNMPv3, which adds user-based authentication and encryption; the authPriv security level provides both. Centralize administrator authentication with TACACS+ or RADIUS so each person uses their own account and commands can be authorized and logged, and keep a local emergency account in a vault.",
   "Control plane protection includes rate-limiting traffic sent to the device's CPU, so floods cannot overwhelm routing processes, and authenticating routing protocol neighbors. OSPF and BGP support authentication so that only trusted routers can form adjacencies. On the internet, BGP route hijacks and leaks are real risks; Resource Public Key Infrastructure (RPKI) and route origin validation let networks check that an announced prefix comes from an authorized autonomous system, and prefix filters limit what neighbors may announce.",
   "Other practices include disabling unused services and ports, keeping firmware updated from signed images, backing up configurations and detecting unauthorized changes, sending logs to a central collector with accurate time from NTP, displaying legal warning banners, and using switch security features such as DHCP snooping, dynamic ARP inspection and port security at the access layer."
  ],
  terms: [
   ["Management plane", "The functions and interfaces used to configure, monitor and administer a network device."],
   ["SNMPv3 authPriv", "The SNMPv3 security level providing both authentication and encryption."],
   ["TACACS+", "A protocol for centralized administrator authentication, authorization and accounting on network devices."],
   ["RPKI", "Resource Public Key Infrastructure: cryptographic validation that a network is authorized to announce an IP prefix."],
   ["Control plane policing", "Rate limiting traffic destined to a device's CPU to protect routing processes."]
  ],
  example: "An audit finds routers managed over Telnet from any internal address, SNMPv2c with the community string public, and one shared admin account. The network team moves management to a dedicated management VLAN reachable only from jump hosts, enables SSHv2, switches monitoring to SNMPv3 authPriv, and ties logins to TACACS+ so every command is logged against the individual administrator.",
  tip: "SNMPv3 with authPriv is the secure answer for monitoring; changing the community string or port does not add encryption. Centralized AAA with TACACS+ gives per-command authorization and accounting for administrators.",
  check: [
   ["Why is SNMPv2c insecure?", "Community strings, which act as passwords, are sent in clear text and there is no encryption of the data."],
   ["What does RPKI route origin validation protect against?", "Announcements of prefixes from autonomous systems not authorized to originate them, such as accidental or malicious BGP hijacks."]
  ]
 },
 {
  t: "Monitoring and response data: SIEM correlation, log aggregation, event parsing, baselines and alert tuning",
  body: [
   "Detection depends on having the right data, understanding it and turning it into alerts people can act on. At the SecurityX level you are expected to judge whether monitoring is working and improve it, not just read alerts.",
   "Log aggregation collects events from endpoints, servers, network devices, identity providers, cloud platforms and applications into a central platform, usually a SIEM or a data lake. Collection should be reliable (with buffering so events are not lost), protected in transit and at rest, and tamper-evident. Accurate, synchronized time from NTP is essential, since correlation depends on ordering events correctly across sources.",
   "Parsing and normalization extract fields, such as user, source IP, host and action, and map them to a common schema so one query works across vendors. Parsing failures are a silent killer: if a field is empty, rules depending on it never fire. Enrichment adds context such as asset criticality, user department, geolocation and threat intelligence, which makes triage faster and scoring more accurate.",
   "Correlation rules combine events across sources and time. A single failed login means little; many failures across many accounts from one source followed by a success, then a new mailbox forwarding rule, strongly suggests compromise. Baselines describe normal behavior, such as usual login hours, data volumes and processes, so anomalies stand out. User and entity behavior analytics (UEBA) automates this per user and device.",
   "Alert tuning keeps the SOC effective. Too many false positives cause alert fatigue, and real alerts get missed. Tune with narrowly scoped, documented exceptions (a specific scanner during its scan window, not all sources), adjust thresholds based on data, and retire rules that never produce useful results. Measure true- and false-positive rates, mean time to detect and mean time to respond, and review whether important log sources have gone quiet. Dashboards and reports should show trends that help leaders decide, not raw event counts."
  ],
  terms: [
   ["Log aggregation", "Collecting logs from many sources into a central platform for analysis."],
   ["Normalization", "Mapping fields from different log formats to a common schema."],
   ["Correlation rule", "A detection that combines multiple events across sources or time to identify suspicious patterns."],
   ["Enrichment", "Adding context such as asset value, identity details or threat intelligence to events."],
   ["Alert fatigue", "Desensitization of analysts caused by high volumes of low-value alerts."]
  ],
  example: "A SOC receives 3,000 alerts a day, and analysts ignore most of them. The team finds that half come from one rule firing on an authorized vulnerability scanner, adds an exception for the scanner's IP during its scheduled window, fixes a parser that left the user field empty in VPN logs, and adds asset criticality to scoring. Daily alerts fall to 400, and a real VPN brute-force attempt is caught the following week.",
  tip: "Fix noise with precise, documented exceptions and better context, never by disabling a rule or dropping log sources. When correlation breaks, check time synchronization and parsing before anything else.",
  check: [
   ["Why is enrichment with asset criticality useful?", "It lets the same event be scored higher on a critical server than on a test machine, so analysts work on the most important alerts first."],
   ["A detection rule depending on the destination port never fires. What should you check?", "Whether the log source is being parsed correctly so the port field is populated, and whether the source is sending logs at all."]
  ]
 },
 {
  t: "Threat intelligence: sources, STIX/TAXII, indicators of compromise, TTPs and intelligence sharing",
  body: [
   "Threat intelligence is information about adversaries, their capabilities and their behavior, analyzed so that it supports decisions. Raw feeds of indicators are data; intelligence tells you which threats matter to your organization and what to do about them.",
   "Intelligence comes in levels. Strategic intelligence informs leaders about trends and threat actors targeting their sector. Operational intelligence describes specific campaigns and how they unfold. Tactical intelligence provides TTPs and indicators for defenders and detection engineers. Sources include open-source intelligence (OSINT), commercial providers, government agencies, sector Information Sharing and Analysis Centers (ISACs), vendor reports, and your own incidents, which are often the most relevant source of all.",
   "Indicators of compromise (IoCs) are artifacts that suggest an intrusion, such as file hashes, IP addresses, domain names, URLs and registry keys. They are easy to use in blocking and searching but short-lived, because attackers change them cheaply. Tactics, techniques and procedures (TTPs) describe how an adversary operates, for example phishing with malicious documents, dumping credentials from memory or using remote management tools for lateral movement. The Pyramid of Pain shows that detections based on TTPs cost attackers much more to evade than those based on hashes or IPs.",
   "Structured Threat Information Expression (STIX) is a standard language for describing threat intelligence objects, such as indicators, malware, threat actors, attack patterns and the relationships between them. Trusted Automated Exchange of Intelligence Information (TAXII) is the protocol for sharing STIX data over HTTPS. A threat intelligence platform (TIP) collects, deduplicates, scores and distributes intelligence to the SIEM, firewalls and EDR.",
   "Sharing follows rules. The Traffic Light Protocol (TLP) marks how widely information may be shared: TLP:RED (named recipients only), TLP:AMBER and AMBER+STRICT (limited within organizations), TLP:GREEN (community) and TLP:CLEAR (public). Intelligence quality depends on relevance, timeliness, accuracy and confidence, and old indicators should expire so they do not generate false positives."
  ],
  terms: [
   ["IoC", "Indicator of compromise: an artifact such as a hash, IP or domain associated with malicious activity."],
   ["TTP", "Tactics, techniques and procedures: the patterns of behavior an adversary uses."],
   ["STIX", "Structured Threat Information Expression: a standard format for describing threat intelligence."],
   ["TAXII", "A protocol for exchanging STIX intelligence over HTTPS."],
   ["Traffic Light Protocol", "A labeling system that sets how widely shared information may be distributed."]
  ],
  example: "A regional bank joins its sector ISAC and connects to its TAXII feed. When the ISAC shares a STIX report describing a group that targets banks with fake remote support calls followed by remote access tool installation, the bank blocks the listed domains and, more usefully, writes a detection for unapproved remote access tools launched by users, which still works after the group changes its infrastructure.",
  tip: "STIX is the format; TAXII is the transport. When asked which detections last longer, choose behavior (TTPs) over hashes and IPs.",
  check: [
   ["Why do IP address indicators lose value quickly?", "Attackers can change infrastructure cheaply and often, and IPs may later be reassigned to legitimate users."],
   ["Who may receive information marked TLP:RED?", "Only the specific named recipients; it must not be shared further."]
  ]
 },
 {
  t: "Threat hunting: hypothesis-driven hunts, behavioral analytics, UEBA and hunting in endpoint telemetry",
  body: [
   "Threat hunting is the proactive search for threats that have evaded existing detections. Instead of waiting for an alert, hunters assume a breach may already have happened and look for evidence. Hunting is analyst-driven, but its best results become automated detections so the same threat is caught next time without a hunt.",
   "Most hunts start with a hypothesis: a testable statement based on threat intelligence, MITRE ATT&CK techniques, a recent incident or a known gap. For example: 'An attacker with a foothold may be using scheduled tasks for persistence on servers.' The hunter identifies the data needed (task creation events, process creation with command lines), queries for anomalies, investigates what is found and records the outcome, whether malicious, benign or a data gap.",
   "Other approaches include intelligence-driven hunts using indicators or TTPs from a new report, and data-driven or situational hunts that look for outliers, such as rare processes, unusual parent-child relationships or hosts making connections nobody else makes. Stacking, or frequency analysis, counts occurrences of a value across the environment; the rare ones deserve a look.",
   "Behavioral analytics and user and entity behavior analytics (UEBA) build baselines of normal behavior for users, hosts and service accounts, then score deviations, such as an account logging in at unusual times, accessing systems it never used, or downloading far more data than usual. They help find insider threats and compromised accounts that use valid credentials, which signature-based tools miss.",
   "Endpoint telemetry from EDR, Sysmon or similar sources is rich hunting ground: process creation with command lines and hashes, network connections by process, file and registry changes, loaded modules and script execution. Useful hunts look for Office applications spawning script interpreters, encoded PowerShell commands, credential access against the LSASS process, legitimate admin tools used in unusual ways (living off the land), and persistence mechanisms such as new services, run keys and scheduled tasks. Document each hunt so it can be repeated, and feed gaps back into logging and detection engineering."
  ],
  terms: [
   ["Threat hunting", "Proactive, analyst-driven searching for threats that evaded existing detections."],
   ["Hypothesis", "A testable statement about possible attacker activity that guides a hunt."],
   ["UEBA", "User and entity behavior analytics: detecting deviations from baselines of normal behavior."],
   ["Stacking", "Counting how often values occur across many systems to find rare outliers."],
   ["Living off the land", "Attackers using legitimate built-in tools to avoid detection."]
  ],
  example: "After reading a report that a ransomware group uses a legitimate remote management tool for persistence, a hunter stacks all installed remote management software across 5,000 endpoints. Three servers run a tool the IT team never approved. Investigation confirms an intrusion at an early stage, and the hunter turns the query into a scheduled detection for unapproved remote access tools.",
  tip: "A hunt that starts from a report or ATT&CK technique is hypothesis- or intelligence-driven. Legitimate access does not rule out misuse; UEBA flags behavior that departs from a user's own baseline.",
  check: [
   ["What should happen when a hunt finds a repeatable malicious pattern?", "Turn it into an automated detection rule so it is caught without a manual hunt next time, and fix any logging gaps found."],
   ["Why is stacking useful in large environments?", "Legitimate software and behavior are common across many hosts, so rare values stand out as candidates for investigation."]
  ]
 },
 {
  t: "Vulnerability management: scanning, CVSS and EPSS prioritization, false positives and remediation tracking",
  body: [
   "Vulnerability management is the continuous cycle of discovering assets, finding weaknesses, prioritizing them, fixing them and verifying the fix. Organizations always have more vulnerabilities than time, so the senior skill is prioritization based on real risk.",
   "Scanning comes in several forms. Network scans probe hosts from the outside; credentialed (authenticated) scans log in and read installed software and settings, giving far more accurate results; agent-based scanning works for laptops that are often off the network. Cloud and container scanners check images, registries and configurations, and application scanners test web apps. Scans should cover every asset in the inventory, which is why asset discovery comes first.",
   "The Common Vulnerability Scoring System (CVSS) rates severity from 0 to 10 using base metrics such as attack vector, complexity, privileges required and impact. CVSS base score alone does not say how likely exploitation is or how important the affected system is. The Exploit Prediction Scoring System (EPSS) estimates the probability that a vulnerability will be exploited in the near future, and the CISA Known Exploited Vulnerabilities (KEV) catalog lists vulnerabilities with confirmed exploitation. Good prioritization combines severity, exploitation evidence, exposure (internet-facing or internal), asset criticality, data sensitivity and compensating controls.",
   "False positives happen, especially with unauthenticated or version-based checks. Linux distributions often backport security fixes without changing the upstream version number, so a scanner may report a vulnerable version that is actually patched. Verify with vendor advisories or package changelogs and document exceptions. False negatives happen too, when scans lack credentials or miss assets.",
   "Remediation is tracked through tickets with owners and service level agreements by priority, such as critical internet-facing issues within days. When patching is not possible, apply mitigations such as configuration changes, segmentation or virtual patching with a WAF or IPS, and record risk acceptance with an expiry date. Rescan to confirm fixes, and report trends such as mean time to remediate and SLA compliance to leadership."
  ],
  terms: [
   ["Credentialed scan", "A vulnerability scan that logs in to systems for accurate software and configuration data."],
   ["CVSS", "Common Vulnerability Scoring System: a 0 to 10 severity rating for vulnerabilities."],
   ["EPSS", "Exploit Prediction Scoring System: an estimate of the probability a vulnerability will be exploited."],
   ["KEV catalog", "CISA's list of vulnerabilities known to be exploited in the wild."],
   ["Virtual patching", "Blocking exploitation of a vulnerability with a control such as a WAF or IPS rule until a real fix is applied."]
  ],
  example: "A scan reports 12,000 findings. Instead of sorting by CVSS alone, the team filters for vulnerabilities in the KEV catalog or with high EPSS scores on internet-facing or critical systems, which gives 60 findings. Those get a 7-day SLA, and a VPN appliance flaw at the top of the list is patched within 48 hours, days before attackers begin mass exploitation of it.",
  tip: "A known exploited flaw on an exposed system beats a higher CVSS score on an isolated one. When a scanner flags an old version that the distribution has backported a fix for, verify and document it as a false positive.",
  check: [
   ["Why are credentialed scans more accurate?", "They read installed packages, patches and settings directly instead of inferring them from network responses."],
   ["What does EPSS add that CVSS does not?", "An estimate of the likelihood of exploitation in the near future, rather than only the severity if exploited."]
  ]
 },
 {
  t: "Analyzing vulnerabilities and attacks: injection, deserialization, race conditions, memory safety and misconfigurations",
  body: [
   "SecurityX expects you to recognize common vulnerability classes from code snippets, logs or descriptions, explain why they are dangerous and choose the right fix. The focus is on root causes and defensive design, not on exploitation.",
   "Injection flaws happen when untrusted input is interpreted as code or commands. SQL injection comes from building queries by concatenating input; the fix is parameterized queries (prepared statements), with input validation and least-privilege database accounts as extra layers. Command injection, LDAP injection and XML external entity (XXE) processing follow the same pattern: keep data separate from code, avoid calling shells with user input, and disable dangerous parser features. Cross-site scripting (XSS) injects script into pages viewed by others and is prevented with context-aware output encoding and a content security policy.",
   "Insecure deserialization occurs when an application rebuilds objects from untrusted serialized data. Some languages run code during object reconstruction, so crafted input can trigger dangerous behavior. Prefer simple data formats such as JSON with schema validation, never deserialize untrusted native objects, restrict deserialization to allow-listed types and sign serialized data when it must round-trip through clients.",
   "Race conditions arise when the outcome depends on the timing of concurrent operations. Time-of-check to time-of-use (TOCTOU) flaws check a condition, such as a balance or file permission, and act on it later, letting another request change things in between. Fixes include atomic operations, database transactions with proper isolation and locking.",
   "Memory safety flaws, common in C and C++, include buffer overflows, use-after-free and integer overflows, which can lead to crashes or code execution. Mitigations include memory-safe languages such as Rust, Go, Java or C#, compiler protections, address space layout randomization (ASLR), data execution prevention (DEP), fuzzing and careful code review. Misconfigurations are just as common and often easier to exploit: default credentials, verbose error messages, open cloud storage, unnecessary services, missing security headers and overly broad permissions. Other classes to recognize include server-side request forgery (SSRF), broken access control such as insecure direct object references, and cross-site request forgery (CSRF)."
  ],
  terms: [
   ["Parameterized query", "A database query where user input is passed as data parameters, never as part of the SQL code."],
   ["Insecure deserialization", "Reconstructing objects from untrusted data in a way that can trigger unintended behavior."],
   ["TOCTOU", "Time-of-check to time-of-use: a race condition between checking a condition and acting on it."],
   ["Use-after-free", "A memory flaw where a program uses memory after it has been released."],
   ["SSRF", "Server-side request forgery: tricking a server into making requests to unintended destinations, such as internal services."]
  ],
  example: "A code review of a refund service finds that it checks whether an order is eligible, then issues the refund in a separate database call. Testing with concurrent requests shows the same order can be refunded several times. The team wraps the check and the refund in one database transaction with a row lock, and adds a unique constraint on refunds per order.",
  tip: "Match the fix to the root cause: parameterized queries for SQL injection, output encoding for XSS, atomic transactions for race conditions, data-only formats and allow lists for deserialization, memory-safe languages and fuzzing for memory corruption.",
  check: [
   ["Why is blocking keywords like SELECT a poor fix for SQL injection?", "Blocklists are easy to evade with encoding and variations and can block legitimate input; parameterized queries remove the root cause."],
   ["What makes a TOCTOU flaw possible?", "A gap between checking a condition and using the result, during which another process or request changes the state."]
  ]
 },
 {
  t: "Malware and indicator analysis: static vs dynamic analysis, sandboxing, YARA rules and file hashing",
  body: [
   "When a suspicious file, script or email attachment turns up, analysts need to know what it does, whether it is malicious, and which indicators will find it elsewhere. Malware analysis must be done safely so the sample cannot spread or tip off attackers.",
   "Static analysis examines a sample without running it. Analysts calculate file hashes, check them against threat intelligence, identify the file type, look at readable strings (URLs, IP addresses, commands), inspect headers, imported functions, digital signatures and packing or obfuscation. Static analysis is safe and quick but can be defeated by packing and encryption.",
   "Dynamic analysis runs the sample in a controlled environment and watches its behavior: processes created, files written, registry changes, persistence attempts and network connections. Sandboxes automate this in isolated virtual machines, often with simulated internet services so the sample reveals what it tries to contact. Some malware detects sandboxes, waits before acting or requires user interaction, so results can be incomplete. Analysis environments must be isolated from production networks, and samples should never be uploaded to public services when they may contain sensitive data.",
   "Hashes identify files exactly. Cryptographic hashes such as SHA-256 give a unique fingerprint, useful for searching and blocking, but any change to the file changes the hash. Fuzzy hashing, such as ssdeep, and import hashing can group similar files. MD5 and SHA-1 still appear in threat feeds for identification but are unsuitable where collision resistance matters.",
   "YARA rules describe malware families with strings, byte patterns and conditions, such as 'file is a Windows executable and contains at least two of these three distinctive strings'. They catch variants that exact hashes miss and can scan files, memory and repositories. Good rules balance specificity against false positives and are tested against known good files. Analysis results feed the incident: indicators go to the SIEM and EDR for sweeping, and behavior goes to detection engineering."
  ],
  terms: [
   ["Static analysis", "Examining a sample without executing it, for example hashes, strings and headers."],
   ["Dynamic analysis", "Running a sample in a controlled environment to observe its behavior."],
   ["Sandbox", "An isolated environment for safely executing and observing suspicious code."],
   ["YARA", "A rule language for identifying and classifying files by patterns and conditions."],
   ["Fuzzy hashing", "Hashing that produces similar values for similar files, helping group variants."]
  ],
  example: "A user reports an invoice attachment. The analyst hashes it and finds no match in threat feeds, so she checks strings, which show an obfuscated script. In a sandbox, the file launches PowerShell and contacts a domain registered two days earlier. She blocks the domain, sweeps EDR for the hash and the domain, and writes a YARA rule for the script's distinctive structure, which later catches three variants with different hashes.",
  tip: "Exact hashes miss rebuilt variants; YARA rules catch shared patterns. Always analyze samples in an isolated sandbox, not on a production workstation, and avoid uploading sensitive samples to public sites.",
  check: [
   ["Why might a sample show no malicious behavior in a sandbox?", "It may detect the virtual environment, wait for a delay, need user interaction or depend on a command server that is unreachable."],
   ["What is one limitation of static analysis?", "Packing, encryption and obfuscation can hide the real code and strings from inspection."]
  ]
 },
 {
  t: "Incident response process: preparation, detection, containment, eradication, recovery and lessons learned",
  body: [
   "Incident response (IR) is the organized approach to handling security incidents so that damage, cost and recovery time are kept low. NIST SP 800-61 describes a widely used life cycle: preparation; detection and analysis; containment, eradication and recovery; and post-incident activity. The latest revision of 800-61 maps these activities to the NIST CSF functions, but the underlying steps are the same.",
   "Preparation happens before any incident: an incident response plan and policy, defined roles and an incident response team, playbooks for common scenarios such as ransomware and business email compromise, contact lists including legal, PR, insurers and regulators, logging and tools in place, and regular exercises. Retainers with IR firms and a pre-approved decision on who may take systems offline save hours when time matters.",
   "Detection and analysis confirms whether an event is an incident, determines scope and severity, and starts documentation. Analysts correlate alerts, identify affected systems and accounts, and gather indicators. Prioritization depends on functional impact, data impact and recoverability.",
   "Containment stops the spread: isolating hosts from the network (often with EDR), disabling compromised accounts, blocking malicious domains and IPs, and segmenting affected systems. Short-term containment acts fast; long-term containment keeps business running safely while a full fix is prepared. Evidence should be preserved before destructive actions where possible. Eradication removes the attacker's presence: malware, persistence mechanisms, backdoor accounts, and the vulnerability or weakness that let them in. Recovery restores systems from known-good sources, validates they are clean and patched, returns them to production in stages and monitors closely for reinfection.",
   "Post-incident activity, or lessons learned, reviews what happened, what worked and what did not, and turns findings into improvements: new detections, patched gaps, updated playbooks and training. A blameless review encourages honesty. Communication runs throughout, including legal review of notification obligations and coordinated internal and external messaging."
  ],
  terms: [
   ["Playbook", "A documented procedure for handling a specific type of incident."],
   ["Containment", "Actions that limit the spread and impact of an incident."],
   ["Eradication", "Removing the cause of an incident, including malware, persistence and the exploited weakness."],
   ["Recovery", "Restoring systems to normal operation and verifying they are clean."],
   ["Lessons learned", "A post-incident review that identifies improvements to prevent or better handle future incidents."]
  ],
  example: "EDR alerts show ransomware encrypting files on two file servers. The team isolates both servers and the patient-zero laptop, disables the compromised service account and blocks the command server domain (containment). It removes the attacker's scheduled tasks and patches the exploited VPN flaw (eradication), restores files from immutable backups after verifying them (recovery), and a week later holds a review that leads to MFA on all service accounts with interactive logon rights.",
  tip: "Order matters: after detection and analysis comes containment, then eradication, then recovery, and lessons learned come last. Restoring before containment and root cause analysis risks reinfection.",
  check: [
   ["Why preserve evidence before wiping a compromised system?", "Evidence is needed to understand scope and root cause, support legal action and meet notification obligations; wiping destroys it."],
   ["What should recovery include besides restoring from backup?", "Validating the restored system is clean and patched, returning it to service in stages and monitoring closely for signs of reinfection."]
  ]
 },
 {
  t: "Digital forensics: order of volatility, chain of custody, memory and disk acquisition, and timeline analysis",
  body: [
   "Digital forensics collects and analyzes evidence in a way that preserves its integrity, so findings can be trusted by the organization, regulators and, if needed, a court. Even when legal action is unlikely, forensic discipline produces better investigations.",
   "The order of volatility guides collection: capture the most short-lived evidence first. Roughly, that is CPU registers and cache, then memory (RAM) including running processes, network connections and logged-in users, then temporary file systems and swap, then disk, then remote logs and monitoring data, then archival media such as backups. Pulling the power or rebooting a system destroys memory evidence, including malware that exists only in memory and encryption keys.",
   "Memory acquisition uses trusted tools run from external media to dump RAM to an external drive, minimizing changes to the system. Memory analysis tools can then list processes, network connections, loaded modules, injected code and command history. Disk acquisition creates a bit-for-bit forensic image, often using a write blocker so the original is not modified. Cloud and virtual environments offer snapshots of disks and sometimes memory, which should be taken early and protected.",
   "Integrity is shown with cryptographic hashes calculated at acquisition and recalculated whenever the evidence is examined; matching hashes show the evidence is unchanged. Chain of custody documents every person who handled the evidence, when, where and why, from collection to presentation. Analysts work on copies, never the original. Legal holds, privacy rules and jurisdiction may affect what can be collected.",
   "Timeline analysis brings events from file system metadata (created, modified, accessed times), logs, registry, browser history and memory into one chronological view. It shows how the attacker got in, what they did and what data they touched. Watch for time zone differences and timestamp tampering (timestomping). Findings should be written up in a clear report that separates facts from interpretation."
  ],
  terms: [
   ["Order of volatility", "The sequence for collecting evidence from most to least short-lived."],
   ["Chain of custody", "Documentation of who handled evidence, when and why, from collection onward."],
   ["Write blocker", "A device or software that prevents changes to storage media during acquisition."],
   ["Forensic image", "A bit-for-bit copy of storage media used for analysis."],
   ["Timeline analysis", "Arranging events from many sources in time order to reconstruct an incident."]
  ],
  example: "A server is suspected of running fileless malware. The responder first captures RAM to an external drive and records the SHA-256 hash, then takes a disk image through a write blocker and hashes it too. Both hashes and each handoff are logged on the chain of custody form. Memory analysis reveals injected code in a legitimate process, and a timeline from logs and file metadata shows the attacker first logged in through a stolen VPN account three days earlier.",
  tip: "Memory before disk, disk before backups. Hashes prove integrity; chain of custody proves handling. Analysts examine copies, not the original evidence.",
  check: [
   ["Why capture memory before shutting down a suspected compromised server?", "Memory holds running processes, network connections, fileless malware and keys that are lost when power is removed."],
   ["How do you show a forensic image was not altered?", "Compare its current hash with the hash recorded at acquisition, and present the chain of custody records."]
  ]
 },
 {
  t: "Attack surface management and exposure reduction: asset discovery, external scanning and penetration test findings",
  body: [
   "Your attack surface is every point an attacker could use to get in: internet-facing systems, cloud services, APIs, remote access, third-party connections, user accounts and even people who can be phished. Attack surface management (ASM) continuously discovers that surface from the attacker's point of view and works to shrink it.",
   "External attack surface discovery starts with what the organization owns: domains and subdomains (from DNS, certificate transparency logs and registrar data), IP ranges, cloud accounts and SaaS tenants. It then finds what is exposed: open ports and services, login pages, test and staging sites, forgotten marketing sites, exposed storage and leaked credentials. Mergers, acquisitions and shadow IT often add assets nobody in security knows about. Every discovered asset should get an owner in the inventory, or be shut down.",
   "Exposure reduction removes what is not needed and protects what is. Typical actions include decommissioning unused systems, putting administrative interfaces behind VPN or ZTNA, removing direct internet access to databases and remote desktop, closing unnecessary ports, removing default and orphaned accounts, patching exposed services first and tightening cloud storage permissions. Internal attack surface matters too: excessive permissions, flat networks and stale accounts make lateral movement easy.",
   "Penetration tests simulate real attacks with permission, within a written scope and rules of engagement, to show what an attacker could actually achieve. Red team exercises test detection and response against a realistic adversary, sometimes with purple teaming where attackers and defenders work together to improve detections. Bug bounty programs invite external researchers to report issues under defined rules.",
   "The value of a test is in acting on its findings. Validate each finding, prioritize by risk rather than tester severity alone, assign owners and deadlines, look for root causes (for example, a missing hardening standard rather than one misconfigured server) and retest to confirm fixes. Track repeat findings across tests, because they show a process that is not working."
  ],
  terms: [
   ["Attack surface management", "Continuous discovery, inventory and reduction of assets exposed to attackers."],
   ["Certificate transparency", "Public logs of issued TLS certificates, useful for discovering an organization's hostnames."],
   ["Rules of engagement", "The agreed scope, methods, timing and limits for a penetration test."],
   ["Purple teaming", "Collaboration between attackers (red) and defenders (blue) to improve detection and response."],
   ["Shadow IT", "Systems and services used without the knowledge or approval of IT and security."]
  ],
  example: "After acquiring two smaller companies, a manufacturer runs external attack surface discovery and finds 40 internet-facing hosts missing from its inventory, including a remote desktop server with no MFA and an old customer portal on an unsupported web server. It shuts down the portal, moves remote desktop behind ZTNA, assigns owners to the remaining hosts and adds the acquired domains to continuous monitoring.",
  tip: "You cannot protect assets you do not know about, so discovery comes first. Penetration test findings should be fixed at the root cause and retested.",
  check: [
   ["How can certificate transparency logs help asset discovery?", "They list certificates issued for your domains, revealing hostnames and subdomains that may not be in your inventory."],
   ["Why must a penetration test have written rules of engagement?", "They define scope, allowed methods, timing and contacts, giving legal authorization and preventing harm to systems outside the agreed boundaries."]
  ]
 },
 {
  t: "Detection engineering: writing and testing detection rules, Sigma, MITRE ATT&CK coverage mapping and deception technologies",
  body: [
   "Detection engineering treats detections like software: they are designed from threat knowledge, written in code, tested, reviewed, deployed through a controlled process and maintained over time. This produces detections that are reliable, understandable and measurable.",
   "A good detection starts with a clear purpose: which adversary behavior it targets, which data source it needs and what an analyst should do when it fires. Behavior-based detections, such as a Microsoft Office process launching a command shell, or a new service installed from a temporary directory, last longer than detections based on a single hash or IP. Each rule should include documentation, severity, known false-positive sources, the relevant ATT&CK technique and a response playbook.",
   "Sigma is an open, vendor-neutral format for writing log-based detection rules in YAML. A Sigma rule describes the log source and the conditions to match, and converters translate it into the query language of a specific SIEM. This lets teams share and reuse detections across platforms. Related formats include YARA for files and Snort or Suricata rules for network traffic.",
   "Testing is essential. Validate rules against historical data to estimate false-positive rates, and against simulated attacker activity in a lab, using safe adversary emulation or unit-test frameworks, to confirm they fire. Store rules in version control, review changes and deploy them through a pipeline so a broken rule does not silently stop working.",
   "MITRE ATT&CK coverage mapping shows which techniques you can detect, partly detect or cannot see, based on your data sources and rules. Prioritize gaps using threat intelligence about groups likely to target you. Deception technologies add high-confidence detections: honeypots are decoy systems, honeytokens are fake credentials, files or records, and canary tokens alert when touched. Because legitimate users have no reason to interact with decoys, any interaction is a strong signal, which makes deception valuable for catching lateral movement and insider activity."
  ],
  terms: [
   ["Detection engineering", "Designing, building, testing and maintaining detections as managed code."],
   ["Sigma", "A vendor-neutral YAML format for log-based detection rules that can be converted into SIEM queries."],
   ["Coverage mapping", "Showing which ATT&CK techniques existing detections and data sources can observe."],
   ["Honeytoken", "A fake credential, file or record that should never be used, so any use signals compromise."],
   ["Adversary emulation", "Safely reproducing known adversary behaviors to test defenses."]
  ],
  example: "A detection team maps its SIEM rules to ATT&CK and finds no coverage for credential dumping. It writes a Sigma rule for suspicious access to the LSASS process, converts it for its SIEM, tests it in a lab with a safe emulation tool and tunes out a backup agent that also reads LSASS memory. It also plants a honeytoken administrator account in Active Directory; any logon attempt with it raises a critical alert.",
  tip: "Sigma is for log events across SIEMs; YARA is for files; Snort and Suricata are for network packets. Deception alerts are high-fidelity because legitimate users never touch decoys.",
  check: [
   ["Why store detection rules in version control and deploy them through a pipeline?", "Changes are reviewed and tested, history is kept, and broken or noisy rules can be caught or rolled back before they create blind spots."],
   ["Why do honeytokens produce few false positives?", "They have no legitimate use, so any interaction with them is suspicious by definition."]
  ]
 }
], { reviewed: "2026-09-25" });
