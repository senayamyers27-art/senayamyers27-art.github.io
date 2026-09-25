/* Lessons for ISC2 CISSP (2024 outline): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("cissp", [
 {
  "t": "Professional ethics: ISC2 Code of Ethics canons and organizational ethics",
  "body": [
   "Every CISSP agrees to follow the ISC2 Code of Ethics, and a proven violation can cost you the certification. The exam rarely asks you to recite the code. Instead it gives you a short dilemma, often with a manager pressuring you, and asks what the certified professional should do first or most appropriately. To answer, you need to know the four canons and, above all, the order in which they apply.",
   "The code starts with a preamble: the safety and welfare of society and the common good, duty to our principals, and duty to each other require that members adhere, and be seen to adhere, to the highest ethical standards. Strict adherence is a condition of certification. Note the phrase 'be seen to adhere'. Conduct that looks like a conflict of interest can be a problem even if you did nothing wrong.",
   "The four canons, in priority order, are: (1) protect society, the common good, necessary public trust and confidence, and the infrastructure; (2) act honorably, honestly, justly, responsibly and legally; (3) provide diligent and competent service to principals; (4) advance and protect the profession. A principal is whoever you serve: your employer, a client or a customer. When canons conflict, the higher one wins. If your employer asks you to conceal a flaw that endangers the public, canon one beats canon three. If a client asks you to cut a legal corner, canon two beats canon three.",
   "ISC2 runs a formal complaint process. Broadly, anyone can file a complaint about the first two canons, principals about the third, and other certified professionals about the fourth. Complaints must be written and specific, and they go to an ethics committee. Knowing that you may be obliged to report what you witness is part of acting as a professional rather than only as an employee.",
   "Organizational ethics is the second half of this topic. Your employer will have its own code of conduct, acceptable use policy and values statement, and a CISSP is expected to help build and model them. A good organizational ethics program has written expectations, training, a safe way to report concerns (often an anonymous hotline), protection against retaliation for good-faith reporters, and consistent enforcement from the top. Senior management sets the tone: if executives ignore the rules, no policy will survive.",
   "You may also meet older ethical guidance on the exam, such as the Internet Architecture Board's 'Ethics and the Internet', which labels activities like gaining unauthorized access, disrupting intended use of the internet and wasting resources as unethical. The theme is consistent: security professionals have extra access, so they carry extra responsibility not to misuse it."
  ],
  "terms": [
   [
    "Canon",
    "One of the four binding rules of the ISC2 Code of Ethics, applied in priority order when they conflict."
   ],
   [
    "Principal",
    "The employer, client or customer to whom you owe diligent and competent service under canon three."
   ],
   [
    "Preamble",
    "The opening of the code stating that members must adhere, and be seen to adhere, to high ethical standards as a condition of certification."
   ],
   [
    "Tone at the top",
    "The ethical example set by senior leadership, which largely determines whether an organizational ethics program is taken seriously."
   ]
  ],
  "example": "A product manager tells you to delay disclosure of a flaw in a medical device's firmware until after a sales quarter closes. Protecting public safety (canon one) outranks service to your employer (canon three), so you escalate internally through proper channels and insist on a responsible disclosure plan rather than staying silent.",
  "tip": "When answers pit the canons against each other, pick the one that serves the higher canon: society first, then honesty and legality, then principals, then the profession.",
  "check": [
   [
    "Your client asks you to falsify an audit finding so they pass. Which canon decides your response?",
    "Canon two (act honorably, honestly, justly, responsibly and legally), which outranks canon three's duty to serve the client."
   ],
   [
    "Why does the preamble say members must 'be seen to adhere'?",
    "Because public trust depends on appearances too; conduct that looks like a conflict of interest damages trust even if no rule was technically broken."
   ],
   [
    "Name two features of an effective organizational ethics program.",
    "Any two of: written code of conduct, training, a safe or anonymous reporting channel, protection against retaliation, consistent enforcement and visible leadership support."
   ]
  ]
 },
 {
  "t": "Security concepts: CIA triad, authenticity, non-repudiation",
  "body": [
   "Almost every CISSP question can be traced back to a small set of goals. The best known is the CIA triad: confidentiality, integrity and availability. When a scenario describes a control or an attack, ask which of these it protects or harms. That habit will help you eliminate wrong answers quickly across all eight domains.",
   "Confidentiality means information is disclosed only to authorized people, processes and devices. Controls include encryption, access control lists, classification and need-to-know. Threats include eavesdropping, shoulder surfing, misdirected email and stolen laptops. Integrity means data and systems are protected from unauthorized or accidental change, and that changes can be detected. Hashes, digital signatures, input validation, change control and least privilege support integrity. Availability means authorized users get timely, reliable access. Redundancy, backups, patching, capacity planning and denial-of-service protection support it.",
   "The goals trade off against each other. Strong encryption with a lost key can destroy availability. Making a system highly available by replicating it widely increases the number of places data can leak. Security design is about balancing these according to what the business values most. A hospital may rank availability of patient records above everything else, while a defense contractor may put confidentiality first.",
   "The triad is not the whole story. Authenticity means you can verify that data or a message really comes from its claimed source and has not been altered. Non-repudiation means a party cannot credibly deny having performed an action, such as sending a message or approving a payment. Non-repudiation usually requires a digital signature made with a private key that only the signer controls, plus reliable logging and timestamps. A shared secret, such as a symmetric key or a message authentication code, gives integrity and authentication between two parties, but not non-repudiation, because either party could have created it.",
   "Two related ideas appear often. The DAD triad (disclosure, alteration, destruction) is the attacker's view: each item is the opposite of one CIA goal. The Parkerian hexad adds possession (control), authenticity and utility to the triad. You do not need to memorize every model, but you should recognize these terms and map them back to the core goals.",
   "Finally, remember that these goals apply to data in all states (at rest, in transit and in use) and to the systems and people around the data. A threat to availability might be a flood in the server room just as easily as a botnet."
  ],
  "terms": [
   [
    "Confidentiality",
    "Ensuring information is disclosed only to authorized subjects."
   ],
   [
    "Integrity",
    "Protecting data and systems from unauthorized or accidental modification, and detecting changes when they occur."
   ],
   [
    "Availability",
    "Ensuring authorized users have timely and reliable access to information and systems."
   ],
   [
    "Non-repudiation",
    "Assurance that a party cannot deny having performed an action, typically provided by digital signatures and trustworthy logs."
   ],
   [
    "DAD triad",
    "Disclosure, alteration and destruction: the attacker-focused opposites of confidentiality, integrity and availability."
   ]
  ],
  "example": "A bank requires customers to sign high-value wire transfers with a private key stored on a hardware token. The signature proves the request came from the customer (authenticity), shows it was not altered (integrity) and prevents the customer from later claiming they never sent it (non-repudiation).",
  "tip": "If a question asks which control provides non-repudiation, look for a digital signature. Symmetric encryption, HMACs and hashes alone cannot provide it because more than one party holds the secret or anyone can compute the hash.",
  "check": [
   [
    "A ransomware attack encrypts a file server. Which CIA goal is most directly affected?",
    "Availability, because authorized users can no longer access the data; confidentiality may also be affected if data is stolen first."
   ],
   [
    "Why does an HMAC not provide non-repudiation?",
    "Both sender and receiver share the same secret key, so either could have produced the HMAC; a third party cannot prove which one did."
   ]
  ]
 },
 {
  "t": "Security governance: alignment with business strategy, roles, due care vs due diligence",
  "body": [
   "Security governance is the set of structures, responsibilities and processes by which senior leadership directs and controls security. The CISSP exam treats security as a business function, not a technical hobby. The right answer to a governance question is almost always the one that supports the organization's mission, goals and objectives and is driven from the top down.",
   "Alignment with business strategy works through planning horizons. A strategic plan is long-term, often three to five years, and ties security to the mission. A tactical plan covers roughly a year and turns strategy into projects such as deploying multifactor authentication. Operational plans are short-term and detailed: schedules, staffing and procedures. Security should be an enabler that lets the business take on opportunities safely, and it must be funded and prioritized like any other business function.",
   "Roles matter because accountability cannot be delegated away. Senior management, including the board and chief executive, holds ultimate responsibility for protecting the organization. The chief information security officer (CISO) leads the program and should report high enough, ideally outside the IT chain, to avoid conflicts of interest. A security steering committee brings business leaders together to set priorities. Data owners, usually senior business managers, decide classification and who gets access. Custodians, often IT staff, implement the owner's decisions day to day. Users follow policy, and auditors provide independent assurance that controls work.",
   "Governance is also shaped by acquisitions, divestitures and outsourcing. When companies merge, their security postures merge too, including hidden weaknesses. When a business unit is sold, data and access must be separated cleanly. Governance frameworks such as COBIT (for IT governance) and the ISO/IEC 27000 family (for information security management systems) help structure this work.",
   "Due care and due diligence are frequently tested. Due care is doing what a reasonable, prudent person would do in the same situation: implementing sensible controls, following policy and acting responsibly. Due diligence is the investigation and ongoing effort to know what is reasonable: researching risks, assessing vendors, monitoring controls and verifying that they still work. A common memory aid: due diligence is 'do detect' (research and verify), due care is 'do correct' (take the action). Failing to exercise due care can lead to a finding of negligence, which exposes the organization and its leaders to liability."
  ],
  "terms": [
   [
    "Security governance",
    "The leadership structures and processes that direct, control and hold people accountable for security in support of business objectives."
   ],
   [
    "Due care",
    "Taking the actions a reasonable, prudent person would take to protect assets; failing to do so can be negligence."
   ],
   [
    "Due diligence",
    "The research, assessment and ongoing verification that establishes what reasonable protection looks like and confirms it is working."
   ],
   [
    "Data owner",
    "A senior business role accountable for a data set's classification and access decisions."
   ],
   [
    "Custodian",
    "The role, usually in IT, that implements and maintains the protections the data owner specifies."
   ]
  ],
  "example": "Before signing a cloud payroll vendor, a company reviews the vendor's independent audit reports and security questionnaire answers (due diligence). After signing, it enforces multifactor authentication on the admin accounts and reviews access each quarter (due care).",
  "tip": "Ultimate responsibility for security always sits with senior management. If an answer says the CISO or IT team is ultimately responsible, it is probably a distractor.",
  "check": [
   [
    "Which role decides the classification of a customer database?",
    "The data owner, a business manager accountable for the data; the custodian only implements the resulting controls."
   ],
   [
    "Researching a vendor's security before signing a contract is an example of what?",
    "Due diligence, because it is investigation to determine what is reasonable; implementing and maintaining controls afterward is due care."
   ]
  ]
 },
 {
  "t": "Legal and regulatory issues: cybercrime, privacy law, intellectual property, transborder data flow",
  "body": [
   "A CISSP is expected to understand the legal environment well enough to know when to call counsel, what obligations apply and how laws shape controls. You are not expected to be a lawyer, and exam answers that suggest acting as one are usually wrong. Laws fall into three broad categories you should recognize: criminal law (offenses against society, punished by prison or fines, prosecuted by the government), civil law (disputes between parties, remedied by damages, such as contract breaches) and administrative or regulatory law (rules made by government agencies with the force of law).",
   "Cybercrime laws make unauthorized access, damage to systems and related acts illegal. In the United States the Computer Fraud and Abuse Act is the classic example. Other countries have their own statutes, and international efforts such as the Budapest Convention on Cybercrime try to harmonize definitions and cooperation. The practical challenges are jurisdiction (the attacker, victim and servers may be in different countries) and evidence gathering across borders.",
   "Privacy law protects personal information. The European Union's General Data Protection Regulation (GDPR) is the most influential: it defines personal data broadly, requires a lawful basis for processing, grants rights such as access and erasure, and requires breach notification to regulators within a short, defined window. In the United States privacy is largely sector-based: health data under HIPAA (Health Insurance Portability and Accountability Act), financial data under GLBA (Gramm-Leach-Bliley Act), children's data under COPPA, plus state laws. Payment card data is governed by PCI DSS, which is an industry contractual standard, not a law.",
   "Intellectual property (IP) comes in four main forms. Copyright protects original works of expression such as software code and documentation, arising automatically on creation. Trademarks protect names, logos and symbols that identify a brand. Patents protect novel, useful, non-obvious inventions for a limited term in exchange for public disclosure. Trade secrets protect valuable confidential information, such as a formula or algorithm, for as long as the owner takes reasonable steps to keep it secret, which is where security controls and non-disclosure agreements come in. Software licensing (end-user agreements, open-source licenses) is contract law layered on copyright.",
   "Transborder data flow is the movement of personal data across national borders. Many jurisdictions restrict exports to countries without adequate protection. GDPR, for example, allows transfers based on adequacy decisions or safeguards such as standard contractual clauses and binding corporate rules. Data localization or sovereignty laws may require certain data to stay in-country. Import and export controls also apply to technology itself, including some strong cryptography. For cloud and outsourcing decisions, knowing where data will physically reside is a governance requirement."
  ],
  "terms": [
   [
    "Criminal law",
    "Law protecting society as a whole, prosecuted by the government, with penalties including imprisonment."
   ],
   [
    "Trade secret",
    "Confidential business information protected only as long as the owner takes reasonable measures to keep it secret."
   ],
   [
    "Transborder data flow",
    "The transfer of data, especially personal data, across national borders, often subject to legal restrictions."
   ],
   [
    "GDPR",
    "The EU General Data Protection Regulation, which governs processing of personal data of people in the EU and restricts transfers outside it."
   ]
  ],
  "example": "A US retailer wants to move its European customer database to a data center in a country without an EU adequacy decision. Legal counsel advises using standard contractual clauses plus a transfer risk assessment, and the security team adds encryption with keys held in the EU to reduce exposure.",
  "tip": "Know which IP type fits: code is copyrighted, a logo is trademarked, a new invention is patented, and a secret recipe or algorithm kept confidential is a trade secret. Also remember PCI DSS is a contractual standard, not a law.",
  "check": [
   [
    "A company protects a proprietary algorithm without registering it anywhere. What IP protection is it relying on?",
    "Trade secret protection, which lasts only as long as reasonable secrecy measures such as NDAs and access controls are maintained."
   ],
   [
    "What is the main difference between criminal and civil law?",
    "Criminal law addresses offenses against society and is prosecuted by the government with possible imprisonment; civil law resolves disputes between parties, usually with monetary damages."
   ]
  ]
 },
 {
  "t": "Investigation types: administrative, criminal, civil, regulatory",
  "body": [
   "Not every investigation is the same. The type determines who runs it, what standard of proof applies, how carefully evidence must be handled and what the outcome can be. The exam expects you to match a scenario to the right investigation type and to know which requires the most rigor.",
   "Administrative (or operational) investigations are internal. They look at policy violations or operational problems, such as an employee misusing email or a root-cause analysis after an outage. They are run by the organization, often by HR and security, and the outcome is disciplinary action or process improvement. The standard of proof is the lowest: management just needs reasonable grounds. Even so, it is wise to handle evidence carefully because an internal matter can turn into a civil or criminal case.",
   "Criminal investigations involve alleged violations of criminal law and are conducted by law enforcement. The standard of proof is 'beyond a reasonable doubt', the highest, because liberty is at stake. Evidence must be collected under strict rules, with a documented chain of custody, and may require search warrants. Once you involve law enforcement, you lose some control over the timeline and publicity, which is why the decision to call them usually rests with senior management and legal counsel.",
   "Civil investigations support lawsuits between parties, such as a contract dispute or an intellectual property claim. The standard is 'preponderance of the evidence', meaning more likely than not. Discovery rules require parties to preserve and produce relevant information, which is where legal holds and electronic discovery (eDiscovery) come in. The Electronic Discovery Reference Model describes stages from information governance and identification through preservation, collection, processing, review, analysis, production and presentation.",
   "Regulatory investigations are conducted by government agencies or industry bodies to determine whether an organization has broken a regulation. The standard of proof varies with the regulator and the rule. Outcomes include fines, sanctions and required remediation. Industry-standard investigations, such as a payment card forensic investigation under PCI DSS rules, are similar in effect even though they flow from contracts rather than law.",
   "Across all types, good practice is the same: preserve evidence early, document every step, use write blockers and hashes when imaging media, limit who touches evidence and involve legal counsel early. Evidence must be relevant, reliable and admissible, and the best evidence rule prefers originals over copies where possible."
  ],
  "terms": [
   [
    "Beyond a reasonable doubt",
    "The criminal standard of proof, the highest, requiring no reasonable alternative explanation."
   ],
   [
    "Preponderance of the evidence",
    "The civil standard of proof: the claim is more likely true than not."
   ],
   [
    "Chain of custody",
    "Documentation of who collected, handled and stored evidence, when and how, proving it was not altered."
   ],
   [
    "Legal hold",
    "An instruction to preserve relevant information, suspending normal deletion, when litigation is reasonably anticipated."
   ]
  ],
  "example": "An internal review finds a staff member copied customer lists before resigning. It begins as an administrative investigation, but once the data appears at a competitor the company issues a legal hold and pursues a civil trade secret claim, and counsel considers referring the theft to law enforcement.",
  "tip": "Criminal cases need the most rigorous evidence handling and the highest standard of proof. If a scenario might become criminal, the best answer preserves evidence and involves legal counsel and senior management before calling police.",
  "check": [
   [
    "Which investigation type uses the preponderance-of-evidence standard?",
    "Civil investigations, where the claimant must show their case is more likely true than not."
   ],
   [
    "Why handle evidence carefully even in an administrative investigation?",
    "Because it may escalate into civil or criminal proceedings, where poorly handled evidence could be ruled inadmissible."
   ]
  ]
 },
 {
  "t": "Policies, standards, procedures, baselines and guidelines",
  "body": [
   "Security documentation forms a hierarchy, and the exam loves to ask which document type fits a description. Each layer answers a different question, and knowing whether it is mandatory or optional is often the key to the right answer.",
   "A policy is a high-level statement of management intent. It says what the organization wants and why, not how. Policies are approved by senior management, are mandatory and change rarely. The top document is often an organizational security policy that establishes the security program, assigns responsibilities and states the commitment of leadership. Beneath it sit issue-specific policies (acceptable use, email, remote work) and system-specific policies (rules for a particular application). Good policies are technology-neutral, so they survive product changes.",
   "A standard is a mandatory requirement that makes a policy measurable and consistent. Where the policy says 'sensitive data must be protected in transit', a standard says 'use TLS 1.2 or higher with approved cipher suites'. Standards often name specific technologies or configurations and are updated more often than policies.",
   "A baseline is a minimum level of security that a type of system must meet, usually written as a configuration. Examples include a hardened server build or a benchmark such as those published by the Center for Internet Security. Baselines are mandatory minimums; systems can exceed them. They make audits easier because you can compare a system against a known, approved state.",
   "A procedure is a detailed, step-by-step instruction for performing a task, such as how to create a user account or how to respond to a lost laptop report. Procedures are mandatory for the people who perform them and support consistency, training and evidence of due care. A guideline is a recommendation, not a requirement. It offers advice and best practices where flexibility is appropriate, such as tips for choosing a strong passphrase.",
   "The documents work together: policy states intent, standards and baselines define mandatory specifics, procedures tell people how, and guidelines help where judgment is needed. They should be reviewed on a regular schedule and after major changes, communicated to the people affected and backed by enforcement. Exceptions should be formally requested, risk-assessed, approved by the right authority and time-limited, so that one-off decisions do not quietly erode the program."
  ],
  "terms": [
   [
    "Policy",
    "A mandatory, high-level statement of management intent and direction, approved by senior leadership."
   ],
   [
    "Standard",
    "A mandatory, specific requirement, often naming technologies or settings, that supports a policy."
   ],
   [
    "Baseline",
    "A mandatory minimum security configuration for a class of systems."
   ],
   [
    "Procedure",
    "Detailed, mandatory step-by-step instructions for carrying out a task."
   ],
   [
    "Guideline",
    "An optional recommendation or best practice offering flexibility."
   ]
  ],
  "example": "A company's acceptable use policy says company devices must be protected from loss. A standard requires full-disk encryption on all laptops. A baseline defines the approved laptop image with encryption enabled. A procedure explains how the help desk enrolls a new laptop, and a guideline suggests travelers keep laptops in carry-on luggage.",
  "tip": "Guidelines are the only optional document in the hierarchy. If a question describes a recommendation or best practice that staff may choose to follow, the answer is guideline.",
  "check": [
   [
    "A document states that all servers must have a specific set of services disabled and logging settings enabled. What type is it?",
    "A baseline, because it defines a mandatory minimum configuration for a class of systems."
   ],
   [
    "Which document type should be technology-neutral and approved by senior management?",
    "A policy, which expresses intent and direction and should outlast specific technologies."
   ]
  ]
 },
 {
  "t": "Business continuity: BIA, RTO/RPO/MTD, BCP scope",
  "body": [
   "Business continuity planning (BCP) keeps critical business functions running, or restores them quickly, during and after a disruption. Disaster recovery (DR) is the narrower, more technical part focused on restoring IT systems and data. The CISSP exam treats BCP as a business-led effort: senior management must sponsor it, and the first priority in any disaster is the safety of people.",
   "The process starts with project scope and planning. You identify the organization's structure, form a BCP team that includes business unit representatives, legal, IT, facilities and communications, confirm resources and secure senior management approval. Scope defines which locations, business units and processes the plan covers. A plan that tries to cover everything at once usually fails, so scope is set deliberately and expanded over time.",
   "The business impact analysis (BIA) is the heart of BCP. It identifies critical business processes, the resources they depend on (people, systems, suppliers, facilities) and the impact of losing them over time, both financial and non-financial, such as reputation and regulatory penalties. The BIA is not a threat analysis; it focuses on the impact of losing a function regardless of the cause.",
   "From the BIA come three key time values. Maximum tolerable downtime (MTD), sometimes called maximum tolerable period of disruption, is the longest a process can be unavailable before the damage is unacceptable or the business may not survive. Recovery time objective (RTO) is the target time to restore the process or system after a disruption; it must be shorter than the MTD to leave a margin. Recovery point objective (RPO) is the maximum acceptable data loss measured in time: an RPO of four hours means backups or replication must capture data at least every four hours. A related metric, work recovery time (WRT), is the time needed after systems are restored to verify data and resume normal work, so RTO plus WRT should not exceed MTD.",
   "After the BIA, the team develops continuity strategies (alternate sites, manual workarounds, redundant suppliers), documents the plan, trains people and tests it. Tests range from read-throughs and tabletop walkthroughs to simulations, parallel tests and full interruption tests. The plan must be maintained as the business changes, or it quietly becomes useless.",
   "Recovery site choices follow directly from RTO and cost: hot sites are ready almost immediately but are expensive; warm sites have equipment but need data and configuration; cold sites provide only space and utilities. Cloud-based recovery and reciprocal agreements are other options, each with trade-offs."
  ],
  "terms": [
   [
    "Business impact analysis (BIA)",
    "An assessment of critical processes, their dependencies and the impact of their loss over time."
   ],
   [
    "Maximum tolerable downtime (MTD)",
    "The longest a business function can be unavailable before the harm becomes unacceptable."
   ],
   [
    "Recovery time objective (RTO)",
    "The target time to restore a function or system after a disruption, set shorter than the MTD."
   ],
   [
    "Recovery point objective (RPO)",
    "The maximum acceptable amount of data loss, measured as time since the last good copy."
   ]
  ],
  "example": "A small online retailer's BIA finds order processing has an MTD of 24 hours. The team sets an RTO of 8 hours and, since losing more than an hour of orders would be costly, an RPO of 1 hour, which leads them to replicate the order database hourly to a warm cloud environment.",
  "tip": "RPO is about data (how much you can lose); RTO is about time to restore. RTO must be less than MTD. If an answer sets RTO longer than MTD, it is wrong.",
  "check": [
   [
    "What does an RPO of 15 minutes require of your backup or replication strategy?",
    "Data must be captured at least every 15 minutes, so no more than 15 minutes of data is lost in a disruption."
   ],
   [
    "Is the BIA primarily a threat analysis?",
    "No. It focuses on the impact of losing critical functions over time, regardless of what causes the loss."
   ]
  ]
 },
 {
  "t": "Personnel security: screening, onboarding, transfers, termination, vendor agreements",
  "body": [
   "People are both the greatest asset and one of the largest sources of risk in any security program. Personnel security policies manage that risk across the whole employment lifecycle: before hiring, during employment, when roles change and when people leave. They also extend to contractors and vendors who get access to your systems.",
   "It starts before hiring. Job descriptions should state the security responsibilities and sensitivity of the role, which drives how much screening is needed. Screening can include identity verification, employment and education checks, reference checks, criminal background checks and, for some roles, credit checks or security clearances. Screening must follow local law and be applied consistently, because unequal treatment creates legal risk. Candidates typically sign a non-disclosure agreement (NDA) and acknowledge the acceptable use policy before receiving access.",
   "Onboarding turns a candidate into a trusted user. The new hire gets security awareness training, agrees to policies in writing and is provisioned with only the access their role needs. Identity and access should be created through a formal request and approval process, not a quick favor from IT.",
   "During employment, several controls reduce the chance that one person can cause serious harm undetected. Separation of duties splits critical tasks so no single person can complete them alone, such as requesting and approving a payment. Job rotation moves people between roles so that fraud is harder to hide and knowledge is spread. Mandatory vacations force someone else to perform a person's duties for a period, which often exposes ongoing fraud. Collusion, where two or more people cooperate to defeat these controls, is the risk they leave, so monitoring still matters.",
   "Transfers and promotions are a common source of privilege creep, where users accumulate access from every role they have held. When someone changes roles, their old access should be removed and new access granted based on the new role. Periodic access reviews catch what slips through.",
   "Termination should be planned and handled respectfully. For involuntary terminations, access is disabled at or just before the moment the person is notified, company property is collected, and an exit interview reminds them of ongoing obligations such as the NDA. Voluntary departures still need prompt, complete deprovisioning.",
   "Vendors, consultants and contractors need equivalent controls through contracts. Agreements should define security requirements, right to audit, breach notification duties, data handling and return or destruction at contract end. Service-level agreements (SLAs) define measurable performance commitments, and interconnection or data-sharing agreements govern links between organizations."
  ],
  "terms": [
   [
    "Separation of duties",
    "Dividing a critical task among multiple people so no single person can complete it alone."
   ],
   [
    "Job rotation",
    "Moving employees between roles periodically to deter fraud and spread knowledge."
   ],
   [
    "Mandatory vacation",
    "Requiring employees to take time off so others perform their duties, which can reveal hidden fraud."
   ],
   [
    "Privilege creep",
    "The gradual accumulation of access rights beyond what a user's current role needs."
   ]
  ],
  "example": "An accounts payable clerk transfers to the marketing team. The access review process removes her ability to create vendor payments and grants only marketing tools. Months later, a routine audit confirms she no longer holds finance permissions, preventing privilege creep.",
  "tip": "For hostile or involuntary terminations, disable access before or at the same time the employee is told. Answers that disable accounts days later, or after the exit interview, are wrong.",
  "check": [
   [
    "What control is best at revealing an ongoing fraud scheme that requires daily attention from the fraudster?",
    "Mandatory vacation, because someone else performs the duties while the employee is away and may notice the anomalies."
   ],
   [
    "What risk remains even with strong separation of duties?",
    "Collusion, where two or more people cooperate to bypass the control."
   ]
  ]
 },
 {
  "t": "Risk management: identification, assessment (qualitative and quantitative), response, frameworks",
  "body": [
   "Risk management is how an organization decides where to spend limited security resources. A risk is the likelihood that a threat will exploit a vulnerability, combined with the resulting impact on an asset. A threat is a potential cause of harm, such as a criminal group or a flood; a threat agent or actor is the one who carries it out. A vulnerability is a weakness, such as an unpatched server. Exposure is being susceptible to loss, and a safeguard or countermeasure reduces risk.",
   "Identification starts with an inventory of assets and their value to the business, then lists the threats and vulnerabilities that apply. Sources include threat intelligence, vulnerability scans, audits, incident history and interviews with the people who run the processes.",
   "Assessment comes in two flavors. Qualitative analysis uses ratings such as low, medium and high, often in a likelihood-by-impact matrix, and draws on expert judgment through workshops or the Delphi technique (anonymous rounds of expert input). It is fast and handles hard-to-quantify harms like reputation. Quantitative analysis puts dollar values on risk. Asset value (AV) times exposure factor (EF, the percentage of value lost in one incident) gives the single loss expectancy: SLE = AV x EF. The annualized rate of occurrence (ARO) is how often the event is expected per year. Annualized loss expectancy is ALE = SLE x ARO. Most organizations use a hybrid of both approaches.",
   "Quantitative results support cost-benefit decisions. The value of a safeguard is ALE before the control minus ALE after it, minus the annual cost of the control. If the result is positive, the control is justified financially. For example, a $200,000 asset with a 25 percent exposure factor has an SLE of $50,000; with an ARO of 0.5 the ALE is $25,000. A control costing $20,000 per year that cuts the ARO to 0.1 (ALE $5,000) saves $20,000 minus $20,000, which is break-even.",
   "Risk response options are: mitigate (reduce likelihood or impact with controls), transfer or share (insurance, outsourcing with contractual liability), avoid (stop the risky activity) and accept (formally acknowledge and live with it, with management sign-off). Ignoring or rejecting a risk is never acceptable. What is left after controls is residual risk; total risk is the risk before controls. Risk appetite and tolerance, set by leadership, guide which residual risks are acceptable.",
   "Frameworks give structure. The NIST Risk Management Framework (RMF) has steps to prepare, categorize, select, implement, assess, authorize and monitor. ISO/IEC 27005 and ISO 31000 provide risk management guidance, and the NIST Cybersecurity Framework organizes outcomes into functions. Continuous monitoring keeps the assessment current as threats and systems change."
  ],
  "terms": [
   [
    "Single loss expectancy (SLE)",
    "Expected loss from one occurrence of a risk: asset value times exposure factor."
   ],
   [
    "Annualized loss expectancy (ALE)",
    "Expected yearly loss from a risk: SLE times the annualized rate of occurrence."
   ],
   [
    "Residual risk",
    "The risk that remains after safeguards are applied."
   ],
   [
    "Risk transfer",
    "Shifting the financial impact of a risk to another party, such as through insurance."
   ],
   [
    "Delphi technique",
    "An anonymous, iterative method for gathering expert consensus in qualitative analysis."
   ]
  ],
  "example": "A laptop fleet worth $1,000,000 loses about 2 percent of value per theft incident (SLE $20,000) with about 5 incidents per year (ALE $100,000). Full-disk encryption costing $30,000 per year does not stop theft but removes breach costs, reducing EF so the new ALE is $20,000. Value of safeguard: $100,000 minus $20,000 minus $30,000 equals $50,000, so the control is justified.",
  "tip": "Memorize SLE = AV x EF and ALE = SLE x ARO, and that a safeguard is worth buying when (ALE before minus ALE after) exceeds its annual cost. The exam also expects you to know ignoring risk is not a valid response.",
  "check": [
   [
    "An asset worth $500,000 has an exposure factor of 40 percent and an ARO of 0.25. What is the ALE?",
    "SLE = $500,000 x 0.40 = $200,000; ALE = $200,000 x 0.25 = $50,000."
   ],
   [
    "Buying cyber insurance is which risk response?",
    "Risk transfer (sharing), because the financial impact is shifted to the insurer, though accountability stays with the organization."
   ]
  ]
 },
 {
  "t": "Threat modeling methodologies (STRIDE, PASTA) and supply chain risk management",
  "body": [
   "Threat modeling is a structured way to find and prioritize threats to a system, ideally during design when fixes are cheapest. It answers four questions: what are we building, what can go wrong, what are we going to do about it, and did we do a good job. You usually start by decomposing the system into a data flow diagram showing processes, data stores, data flows and trust boundaries, which are the points where data passes between areas of different trust.",
   "STRIDE, developed at Microsoft, is a mnemonic for six threat categories, each violating a security property. Spoofing (pretending to be someone else) violates authentication. Tampering (unauthorized modification) violates integrity. Repudiation (denying an action) violates non-repudiation. Information disclosure violates confidentiality. Denial of service violates availability. Elevation of privilege violates authorization. You walk each element of the diagram and ask which categories apply. STRIDE is attacker-agnostic and works well for developers.",
   "PASTA, the Process for Attack Simulation and Threat Analysis, is a seven-stage, risk-centric method. It starts with business objectives, defines the technical scope, decomposes the application, analyzes threats, analyzes vulnerabilities, models attacks and ends with risk and impact analysis that ties threats back to business impact. PASTA takes more effort but produces results that business leaders can prioritize. Other models you may see include DREAD (a scoring model rating damage, reproducibility, exploitability, affected users and discoverability), attack trees, VAST and the MITRE ATT&CK knowledge base of adversary tactics and techniques.",
   "Supply chain risk management (SCRM) extends threat thinking beyond your walls. Every hardware component, software library, cloud service and outsourced provider brings its own risk. Threats include counterfeit hardware, tampered firmware, compromised software updates, malicious or vulnerable open-source dependencies and a provider's own breach exposing your data.",
   "Good SCRM practices include assessing suppliers before contracting (questionnaires, independent audit reports, on-site assessments), requiring security clauses and a right to audit, using minimum security requirements and service-level agreements, maintaining a software bill of materials (SBOM) so you know what components you run, verifying the integrity of updates through code signing, and monitoring suppliers continuously rather than only at onboarding. Silicon root of trust and physically unclonable functions are hardware approaches to verifying component authenticity. Fourth-party risk, your suppliers' suppliers, matters too.",
   "Threat modeling and SCRM share a mindset: identify what you depend on, assume parts of it can fail or be hostile, and design controls that detect and limit the damage."
  ],
  "terms": [
   [
    "STRIDE",
    "Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege: a threat categorization model."
   ],
   [
    "PASTA",
    "Process for Attack Simulation and Threat Analysis, a seven-stage, risk-centric threat modeling methodology."
   ],
   [
    "Trust boundary",
    "A point in a system where data or control passes between components with different levels of trust."
   ],
   [
    "Software bill of materials (SBOM)",
    "An inventory of the components and dependencies that make up a piece of software."
   ]
  ],
  "example": "While designing a mobile banking API, a team draws a data flow diagram and applies STRIDE at the trust boundary between the app and the API. They identify spoofing (stolen tokens) and tampering (modified requests), and add token binding and request signing. Separately, they generate an SBOM and discover a vulnerable logging library, which they upgrade before release.",
  "tip": "Match each STRIDE letter to the property it violates: spoofing-authentication, tampering-integrity, repudiation-non-repudiation, information disclosure-confidentiality, denial of service-availability, elevation of privilege-authorization. PASTA is the risk-centric, business-aligned one.",
  "check": [
   [
    "An attacker modifies a price field in a web request. Which STRIDE category is this?",
    "Tampering, which violates integrity."
   ],
   [
    "Why is an SBOM useful for supply chain risk management?",
    "It shows which components you actually run, so when a vulnerability is announced in a library you can quickly find every affected product."
   ]
  ]
 },
 {
  "t": "Security awareness, education and training program effectiveness",
  "body": [
   "Technical controls fail when people do not understand their role. A security awareness, education and training program builds that understanding, and the CISSP exam expects you to know the difference between the three levels, the methods that work and how to measure whether the program is having an effect.",
   "Awareness is the broadest and lightest level. Its goal is to change attention and behavior by keeping security in people's minds: posters, short videos, newsletters, login banners and simulated phishing. It applies to everyone, including executives and contractors. Training teaches specific skills that people need for their jobs, such as how a developer validates input or how the help desk verifies a caller's identity before a password reset. Education is the deepest level, building understanding of why things work so people can handle new situations. It is usually aimed at security professionals and supports career development, such as degree programs or certification study.",
   "Effective programs are tailored. A finance team needs content on business email compromise and invoice fraud; system administrators need secure configuration and privileged access practices. Content should be refreshed regularly because threats change, and the program should run continuously rather than as a once-a-year compliance box. Methods that engage people, such as gamification, security champions embedded in teams, short microlearning modules and realistic social engineering exercises, tend to work better than long slide decks.",
   "Common topics include phishing and other social engineering, password and passphrase practices, multifactor authentication, safe handling of sensitive data, physical security such as tailgating and clean desk rules, remote work, and how and where to report incidents. Emerging topics include deepfake audio and video used for impersonation and misuse of generative AI tools with company data.",
   "Measuring effectiveness is essential, and the exam wants metrics tied to behavior, not just attendance. Useful measures include phishing simulation click rates and report rates over time, the number and speed of incidents reported by staff, audit findings about policy compliance, results of knowledge tests before and after training, and trends in incidents caused by human error. Completion rates show coverage, but a 100 percent completion rate with rising click rates means the program is not working.",
   "Program owners should review content at least annually and after major incidents, collect feedback and adjust. A good sign is a culture where reporting a mistake is encouraged rather than punished, because quick reporting shrinks the damage."
  ],
  "terms": [
   [
    "Awareness",
    "Activities that keep security top of mind and influence everyday behavior across the whole workforce."
   ],
   [
    "Training",
    "Instruction in specific, job-related security skills."
   ],
   [
    "Education",
    "In-depth learning that builds understanding of concepts and reasoning, usually for security professionals."
   ],
   [
    "Security champion",
    "A staff member embedded in a business or development team who promotes and supports security practices locally."
   ]
  ],
  "example": "After a year of quarterly phishing simulations, a company's click rate falls and, more importantly, the percentage of employees who report the simulated email rises sharply. The security team uses the report rate as its main metric and adds targeted training for the two departments that still click most often.",
  "tip": "Distinguish the three levels: awareness changes behavior for everyone, training teaches job skills, education builds deep understanding. For effectiveness, prefer behavior-based metrics such as reporting rates over attendance numbers.",
  "check": [
   [
    "Teaching help desk staff the exact steps to verify identity before resetting a password is which level?",
    "Training, because it builds a specific job-related skill."
   ],
   [
    "Why is course completion rate alone a weak measure of program effectiveness?",
    "It shows who sat through the content, not whether behavior changed; outcome metrics like phishing report rates are more meaningful."
   ]
  ]
 },
 {
  "t": "Identifying and classifying information and assets",
  "body": [
   "You cannot protect what you do not know you have, and you cannot protect everything equally. Asset identification and classification solve both problems. Identification builds an inventory of information and the assets that store, process or transmit it. Classification assigns each a level of sensitivity or criticality so that protection is proportional to value.",
   "Assets include data, hardware, software, cloud services, facilities and even people's knowledge. Information assets are often the most valuable and the hardest to track, because data is copied into email, spreadsheets, backups and third-party services. Discovery tools, data flow mapping and interviews with business owners help find where sensitive data actually lives.",
   "Classification is decided by the data owner, not by IT. The owner considers the value of the information, the impact if it were disclosed, altered or lost, legal and regulatory requirements, and its age or useful life. Government and military schemes commonly use levels such as Top Secret, Secret, Confidential and Unclassified, with harm to national security increasing at each higher level. Commercial schemes are chosen by the organization and often look like Confidential or Proprietary, Private, Sensitive and Public. The exact labels are less important than having a small, clear set that people can apply consistently.",
   "Classification drives everything else: who can access data, whether it must be encrypted, how it is labeled, where it may be stored, how long it is kept and how it is destroyed. Assets that hold classified information generally inherit the highest classification of the data on them. A server hosting one confidential database must be protected as confidential even if everything else on it is public.",
   "Data categorization is a related idea. For example, a system can be categorized by the potential impact (low, moderate, high) of losing confidentiality, integrity or availability, as in US federal practice. Privacy categories such as personally identifiable information (PII), protected health information (PHI) and payment card data also carry specific handling rules.",
   "Classification is not a one-time project. Data can be declassified or downgraded as it ages, such as financial results that become public after release, and reclassification should follow a formal process with owner approval. Periodic reviews keep the inventory and labels accurate, and classification decisions should be documented so they can be audited."
  ],
  "terms": [
   [
    "Classification",
    "Assigning information a sensitivity or criticality level that determines required protections."
   ],
   [
    "Data owner",
    "The business role accountable for classifying data and approving access."
   ],
   [
    "Asset inventory",
    "A maintained list of an organization's assets, their owners and their locations."
   ],
   [
    "Declassification",
    "Lowering or removing a classification when the information is no longer sensitive, following a formal process."
   ]
  ],
  "example": "A company's quarterly earnings report is classified Confidential while it is being prepared. Once the results are publicly announced, the data owner approves declassifying the final report to Public, while the underlying working papers keep their Confidential label.",
  "tip": "The data owner classifies data; custodians protect it. Systems take on the highest classification of any data they hold.",
  "check": [
   [
    "Who is responsible for deciding a data set's classification?",
    "The data owner, a business manager accountable for the data."
   ],
   [
    "A file server holds mostly public files and one confidential folder. How should the server be protected?",
    "At the confidential level, because an asset inherits the highest classification of the data it stores."
   ]
  ]
 },
 {
  "t": "Information and asset handling requirements (marking, labeling, storage)",
  "body": [
   "Classification only helps if people and systems can tell what level a piece of information has and know what to do with it. Handling requirements translate each classification level into concrete rules for marking, labeling, storing, transmitting, sharing and destroying information and the media that carries it.",
   "Marking and labeling are closely related, and the terms are sometimes used interchangeably. A common distinction is that labeling refers to the classification attached to media or systems, such as a sticker on a backup tape or hard drive, while marking refers to the classification shown within the information itself, such as a header and footer on each page of a document or a banner in an application. Electronic labels can also be stored as metadata, which lets systems like data loss prevention tools and access control mechanisms enforce rules automatically. Mandatory access control systems rely on these labels to make decisions.",
   "Unlabeled media is a real risk. If staff find an unlabeled drive, good practice is to treat it as if it holds data at the highest classification in use until proven otherwise. Otherwise a sensitive backup could be discarded or reused without proper sanitization.",
   "Handling rules cover every stage. For storage, higher classifications may require encryption, locked cabinets or safes, restricted server rooms and approved locations only (for example, not on personal devices or unapproved cloud services). For transmission, they may require encrypted channels, tracked courier services with signatures for physical media, and restrictions on emailing outside the organization. For use, rules may require clean desk practices, privacy screens and no printing on shared printers.",
   "Backups and copies inherit the classification of the original, so backup media must be protected at the same level, including at off-site storage facilities. Storage locations should have environmental controls, access logging and inventory tracking so that missing media is noticed quickly. Media transported off-site should be logged out and back in.",
   "Handling requirements must be documented in policy and standards, taught in training and checked in audits. They also need to be practical. If rules are too cumbersome, people find workarounds, such as emailing documents to personal accounts to work at home. Designing secure but usable handling processes, and providing approved tools that make the right choice easy, is part of the security professional's job."
  ],
  "terms": [
   [
    "Labeling",
    "Attaching a classification indicator to media or systems, such as a sticker on a drive or tape."
   ],
   [
    "Marking",
    "Displaying the classification within the information itself, such as page headers or on-screen banners."
   ],
   [
    "Handling requirements",
    "Rules that specify how information at each classification must be stored, transmitted, used and destroyed."
   ],
   [
    "Metadata label",
    "A classification stored electronically with a file so systems can enforce handling rules automatically."
   ]
  ],
  "example": "A research lab marks every page of its design documents 'Confidential - Internal Only' in the footer and stores the same classification in document metadata. The data loss prevention system reads the metadata and blocks attempts to email those files to outside addresses, while backup tapes carrying the files are labeled and shipped only by bonded courier.",
  "tip": "Backups and copies carry the same classification as the original data. Unlabeled media should be handled as the highest classification until its contents are verified.",
  "check": [
   [
    "An administrator finds an unlabeled USB drive in a secure area. How should it be treated?",
    "As if it contains the highest classification of data in use, until its contents are identified through a proper process."
   ],
   [
    "Why store classification labels as metadata in addition to visible markings?",
    "So automated tools such as DLP and access control systems can read and enforce the handling rules."
   ]
  ]
 },
 {
  "t": "Provisioning resources securely and asset inventory",
  "body": [
   "Every new laptop, server, cloud account or software license is a new asset to protect. Secure provisioning means bringing those resources into the environment in a known, approved and trackable state, and asset inventory means knowing at all times what you have, who owns it and where it is.",
   "An asset inventory should record each hardware and software asset with a unique identifier, owner, location, classification of data it handles, configuration and lifecycle status. Hardware inventories include endpoints, servers, network gear, mobile devices and removable media. Software inventories include installed applications, versions and licenses. Cloud resources such as virtual machines, storage buckets and serverless functions must be included too, and because they can be created in seconds, automated discovery through cloud provider APIs is essential. Configuration management databases (CMDBs) often hold this information.",
   "Inventory supports nearly every other security activity. Vulnerability management needs to know which systems run a vulnerable product. Incident response needs to know who owns an affected host. License compliance avoids legal risk. Unknown assets, often called shadow IT, are dangerous because nobody patches or monitors them.",
   "Secure provisioning starts with procurement. Buy from trusted suppliers, verify that hardware has not been tampered with, and check that software comes from legitimate sources with verified signatures. Security requirements should be part of the purchasing decision rather than added afterward. Before deployment, apply an approved baseline image, remove default accounts and passwords, disable unneeded services, install current patches and enroll the device in management and monitoring tools such as endpoint detection and mobile device management.",
   "Provisioning also applies to access. Accounts, licenses and cloud resources should be requested, approved by the owner, created with least privilege and recorded. Infrastructure as code templates help by making cloud builds repeatable and reviewable, so every environment starts from a secure, version-controlled definition.",
   "Asset management continues through the lifecycle. Changes should go through change management so the inventory stays accurate. Periodic reconciliation compares the inventory against network scans, cloud consoles and purchase records to find discrepancies. When assets are retired, they must be sanitized and removed from the inventory, with their disposal documented."
  ],
  "terms": [
   [
    "Asset inventory",
    "An authoritative, maintained record of hardware, software and cloud assets with owners and status."
   ],
   [
    "Shadow IT",
    "Technology used within an organization without the knowledge or approval of IT or security."
   ],
   [
    "Configuration management database (CMDB)",
    "A repository that stores information about assets and their configurations and relationships."
   ],
   [
    "Secure baseline image",
    "A pre-hardened, approved build used to deploy systems in a known secure state."
   ]
  ],
  "example": "A security team runs a weekly comparison between its CMDB and the list of virtual machines in its cloud accounts. It discovers several unmanaged instances a developer created for testing, which lack endpoint protection. The instances are either enrolled and tagged with an owner or shut down.",
  "tip": "Asset inventory is foundational: the exam often expects it as the first step before vulnerability management, classification or risk assessment can succeed.",
  "check": [
   [
    "Why is automated discovery especially important for cloud assets?",
    "Cloud resources can be created and removed in minutes, so manual inventories quickly go stale and miss unmanaged resources."
   ],
   [
    "Name two steps to take before deploying a new server.",
    "Any two of: apply the approved baseline, remove default accounts and passwords, disable unneeded services, patch it and enroll it in monitoring and management."
   ]
  ]
 },
 {
  "t": "Data lifecycle: create, store, use, share, archive, destroy",
  "body": [
   "Data has a life. It is created, lives in storage, gets used and shared, may be archived for years and eventually should be destroyed. Different risks and controls apply at each stage, and a CISSP should be able to say which controls fit where. A common model has six phases: create, store, use, share, archive and destroy.",
   "Create covers generating new data or acquiring it from outside, such as collecting customer details on a form. This is the best moment to classify the data and assign an owner, because classifying later is harder and often skipped. Collection should also be limited to what is needed, a privacy principle called data minimization.",
   "Store means committing the data to a repository such as a database, file share or cloud bucket. Controls include encryption at rest, access control lists, backups and secure configuration of the storage service. The classification assigned at creation decides the storage requirements.",
   "Use is when data is viewed, processed or changed. This is where data is often most exposed, because it must be decrypted to be worked with. Controls include least privilege, monitoring and logging of access, data loss prevention, and techniques such as masking so that users see only what they need. Emerging protections for data in use include confidential computing enclaves.",
   "Share means making data available to others, inside or outside the organization, through email, collaboration tools, APIs or partner connections. Controls include encryption in transit, digital rights management, data sharing agreements, DLP and checks that recipients are authorized. Transborder transfers bring legal requirements.",
   "Archive moves data that is no longer actively used into long-term storage, usually to meet legal, regulatory or business retention requirements. Archives must remain protected at the original classification and must remain readable: you need the hardware, software and keys to retrieve the data years later. Losing an encryption key effectively destroys the archive.",
   "Destroy means permanently removing data when it is no longer needed and retention periods have ended, unless a legal hold applies. Methods depend on media type and sensitivity, ranging from cryptographic erasure and overwriting to degaussing and physical shredding. Destruction should be documented, and data in backups and third-party copies must be included, or it will outlive its intended lifespan."
  ],
  "terms": [
   [
    "Data lifecycle",
    "The phases data passes through from creation to destruction, each with its own risks and controls."
   ],
   [
    "Data minimization",
    "Collecting and keeping only the data needed for a specified purpose."
   ],
   [
    "Archive",
    "Long-term storage of inactive data kept for legal, regulatory or business reasons."
   ],
   [
    "Cryptographic erasure",
    "Destroying data by securely deleting the encryption keys that protect it, leaving the ciphertext unreadable."
   ]
  ],
  "example": "A clinic collects patient intake forms (create), classifies them as PHI and stores them in an encrypted records system (store). Clinicians view them through role-based access (use), send referrals over encrypted messaging (share), move records of inactive patients to an archive for the legally required period (archive) and then securely destroy them unless under legal hold (destroy).",
  "tip": "Classification should happen at the create phase. Data in use is typically the hardest state to protect because it is decrypted for processing.",
  "check": [
   [
    "At which lifecycle phase should data ideally be classified?",
    "At creation, when the owner and purpose are known and before copies spread."
   ],
   [
    "What must you retain to keep an encrypted archive usable?",
    "The encryption keys and the hardware and software needed to read the format, for the entire retention period."
   ]
  ]
 },
 {
  "t": "Data roles: owner, controller, processor, custodian, steward, subject",
  "body": [
   "Knowing who is responsible for what is central to asset security, and the exam frequently describes a person's duties and asks which role they hold. The roles come from two overlapping vocabularies: organizational security (owner, custodian, steward, user) and privacy law (controller, processor, subject).",
   "The data owner, sometimes called the information owner, is a senior business person accountable for a data set. The owner classifies the data, decides who may access it, approves the protection requirements and is ultimately accountable if it is mishandled. Owners are usually business managers, such as the head of human resources for employee records, not IT staff.",
   "The data custodian implements and operates the protections the owner decides on. Custodians are typically IT or operations staff: they run backups, apply patches, configure access controls and maintain storage. They handle the data day to day but do not decide its classification or who should have access.",
   "The data steward focuses on the quality, meaning and proper business use of data. Stewards maintain data definitions, ensure accuracy and consistency, and help people use data correctly, often within a data governance program. Where the owner is accountable, the steward is the hands-on guardian of data quality and metadata.",
   "Privacy law adds three roles. The data subject is the individual the personal data is about, such as a customer or employee, and holds rights such as access and correction. The data controller is the organization (or person) that determines the purposes and means of processing personal data: it decides why and how the data is used and carries primary legal responsibility. The data processor processes personal data on behalf of the controller, following the controller's instructions; cloud providers, payroll services and marketing platforms are common examples. Under GDPR, processors also have direct obligations, and a contract must govern the relationship. A processor that starts using the data for its own purposes becomes a controller for that processing.",
   "Other roles you may see include the data user, who accesses data to do their job and must follow policy, the system owner, who is responsible for a system that processes data, and the data protection officer (DPO), who oversees privacy compliance in organizations where GDPR requires one. Being clear about roles avoids gaps where everyone assumes someone else is protecting the data."
  ],
  "terms": [
   [
    "Data controller",
    "The entity that determines the purposes and means of processing personal data."
   ],
   [
    "Data processor",
    "An entity that processes personal data on behalf of, and under instructions from, a controller."
   ],
   [
    "Data subject",
    "The identifiable individual whom personal data describes."
   ],
   [
    "Data steward",
    "A role responsible for the quality, definitions and appropriate business use of data."
   ],
   [
    "Data custodian",
    "The role that implements and maintains the technical protections specified by the owner."
   ]
  ],
  "example": "An online store decides to collect shoppers' email addresses for order updates and marketing, making it the controller. It uses a third-party email service to send newsletters on its instructions, which makes the email service a processor. The shoppers are the data subjects, and the store's IT team acts as custodian of the customer database.",
  "tip": "Controller decides why and how; processor acts on the controller's behalf. Owner is accountable and classifies; custodian implements. If a role 'determines purposes', it is a controller.",
  "check": [
   [
    "A payroll company processes employees' salary data according to an employer's instructions. What is its role?",
    "Data processor; the employer is the data controller."
   ],
   [
    "Who performs nightly backups of a database: the owner or the custodian?",
    "The custodian, who implements the protections the owner specifies."
   ]
  ]
 },
 {
  "t": "Data collection limitation, location and maintenance",
  "body": [
   "Every piece of data you hold is a liability as well as an asset. It must be protected, it can be breached, and it may be subject to legal requests and privacy rights. That is why modern privacy principles and the CISSP outline stress limiting what you collect, knowing where data lives and maintaining it properly.",
   "Collection limitation means collecting only the personal data needed for a specific, legitimate purpose, by lawful and fair means, and, where appropriate, with the knowledge or consent of the person. This idea goes back to the OECD privacy guidelines and appears in GDPR as data minimization and purpose limitation: data collected for one purpose should not be quietly reused for an unrelated one. Practical steps include reviewing forms and APIs to remove fields you do not need, avoiding collection of sensitive categories unless required and telling people clearly what you collect and why in a privacy notice.",
   "Data location matters for legal, security and operational reasons. Laws on data sovereignty and localization may require that certain data stay in a given country or region. Transborder transfer rules may restrict where personal data can go. Location also affects which government can compel access to data and which breach notification rules apply. In the cloud, you choose regions for storage and processing, and contracts should specify where data and backups may reside and where support staff who can access it are located. Knowing data location also supports incident response and eDiscovery, because you cannot preserve or produce data you cannot find.",
   "Data maintenance covers keeping data accurate, current and protected while it is retained. Privacy principles call for data quality: personal data should be accurate and kept up to date, and people should be able to request corrections. Maintenance also includes applying patches and secure configurations to the systems that hold the data, reviewing access rights, verifying backups and checking that data still has a valid purpose. Data that is no longer needed should move toward archive or destruction according to the retention schedule.",
   "These three ideas reinforce each other. Collect less and you have less to locate, maintain and protect. Know where your data is and you can enforce location and access rules. Maintain it well and it stays useful and trustworthy while you have it."
  ],
  "terms": [
   [
    "Collection limitation",
    "The principle that personal data should be collected only as needed, by lawful and fair means."
   ],
   [
    "Purpose limitation",
    "Using personal data only for the purposes for which it was collected, unless a new lawful basis exists."
   ],
   [
    "Data sovereignty",
    "The principle that data is subject to the laws of the country where it is located."
   ],
   [
    "Data quality",
    "The accuracy, completeness and currency of data, including the ability of individuals to correct it."
   ]
  ],
  "example": "A fitness app's sign-up form asked for date of birth, home address and phone number, although the service only needed an email and age range. After a privacy review, the company removed the extra fields, deleted previously collected addresses it had no use for and configured its cloud storage to keep European users' data in an EU region.",
  "tip": "The least risky data is data you never collected. When a scenario asks how to reduce privacy risk, limiting collection or deleting unneeded data often beats adding more controls.",
  "check": [
   [
    "What privacy principle is violated when data collected for billing is later used for unrelated marketing without a new basis?",
    "Purpose limitation, because the data is used for a purpose different from the one for which it was collected."
   ],
   [
    "Why should cloud contracts specify data location?",
    "Because location determines which laws apply, which authorities can demand access and whether transfer or localization rules are met."
   ]
  ]
 },
 {
  "t": "Data retention and end-of-life (EOL/EOS) assets",
  "body": [
   "Retention answers a simple question with complicated consequences: how long should we keep this? Keep data too briefly and you may break the law or lose information the business needs. Keep it too long and you increase breach exposure, storage cost and the volume of material that must be searched and produced in litigation.",
   "A retention policy sets how long each category of data must be kept and what happens at the end. Retention periods come from laws and regulations, contracts, industry standards and business needs. Examples include tax, employment and health records, each of which may have different required periods depending on jurisdiction. The policy is usually expressed as a retention schedule listing record types, retention periods, owners and the disposition method. When the period ends, data should be securely destroyed or, in some cases, anonymized.",
   "Legal holds override the retention schedule. When litigation or an investigation is reasonably anticipated, relevant data must be preserved even if it would normally be deleted. Destroying data under hold can lead to serious legal penalties. Retention processes must therefore be able to suspend deletion for specific data and resume it when the hold is lifted.",
   "Retention also covers where data is kept. Backups, archives, email systems, collaboration platforms and third-party services all hold copies, and a policy that deletes records from the main database but not from backups is incomplete. Data retained must remain readable for its whole retention period, which means keeping formats, software and encryption keys available.",
   "End-of-life (EOL) and end-of-support (EOS) apply to hardware and software. Vendors use these terms somewhat differently, but in general EOL means a product is no longer sold or developed, and EOS means the vendor no longer provides updates, security patches or technical support. After EOS, newly discovered vulnerabilities stay unpatched, which makes the asset an increasing risk. End-of-sale is a separate, earlier milestone that some vendors announce.",
   "A good asset management program tracks vendor lifecycle announcements, budgets for replacement well before EOS and plans migrations. If an unsupported system cannot yet be replaced, compensating controls should reduce the risk: isolate it on a segmented network, restrict access, add monitoring, and document the risk acceptance with an owner and a review date. When the asset is finally retired, its storage must be sanitized appropriately, and it must be removed from inventory, licensing and monitoring records."
  ],
  "terms": [
   [
    "Retention schedule",
    "A document listing record types, how long each must be kept, who owns them and how they are disposed of."
   ],
   [
    "Legal hold",
    "A requirement to preserve relevant data because of pending or anticipated litigation or investigation, overriding normal deletion."
   ],
   [
    "End-of-support (EOS)",
    "The point after which a vendor stops providing patches, updates and technical support for a product."
   ],
   [
    "Compensating control",
    "An alternative control that reduces risk when the primary control, such as patching, is not possible."
   ]
  ],
  "example": "A factory relies on a control workstation running an operating system that has reached end-of-support. Until a replacement is funded, the security team places it on an isolated network segment, allows only required connections, disables removable media and adds monitoring, and the plant manager formally accepts the residual risk with a replacement date.",
  "tip": "A legal hold always overrides the normal retention schedule. For unsupported (EOS) systems that cannot be replaced yet, the expected answer is isolation plus compensating controls and documented risk acceptance.",
  "check": [
   [
    "Why is keeping data longer than required a risk?",
    "It increases breach exposure, storage costs and eDiscovery burden without adding business value."
   ],
   [
    "What is the key security problem with an end-of-support operating system?",
    "The vendor no longer releases security patches, so new vulnerabilities remain permanently unfixed."
   ]
  ]
 },
 {
  "t": "Data remanence and sanitization: clearing, purging, destruction",
  "body": [
   "Data remanence is the data that remains on media after an attempt to erase it. Deleting a file usually removes only the pointer to it, leaving the contents on disk until overwritten. Formatting a drive often does little more. Anyone with recovery tools could read that residue, which is why sanitization must match the sensitivity of the data and the type of media.",
   "NIST Special Publication 800-88, Guidelines for Media Sanitization, is the reference framework, and it defines three levels. Clearing applies logical techniques to sanitize data in all user-addressable storage locations, protecting against simple, non-invasive recovery. Overwriting a drive with fixed patterns or using a device's standard reset is clearing. Cleared media can usually be reused within the organization.",
   "Purging applies physical or logical techniques that make recovery infeasible even with state-of-the-art laboratory methods. Examples include the drive's built-in secure erase commands, cryptographic erase and degaussing of magnetic media. Purged media may be reused or released outside the organization, depending on policy. Destruction renders the media unusable and the data unrecoverable: shredding, disintegrating, pulverizing, melting or incinerating. Destruction is the right choice for the most sensitive data or when media cannot be purged reliably.",
   "Media type changes the answer. Degaussing uses a strong magnetic field to erase magnetic media such as hard disk drives and tapes; it usually renders a modern hard drive unusable. It does nothing to solid-state drives (SSDs), flash memory or optical discs, because they do not store data magnetically. SSDs are also hard to overwrite reliably because of wear leveling, over-provisioned spare areas and remapped blocks, so simple overwriting may leave data behind. For SSDs, use the manufacturer's secure erase or sanitize commands, cryptographic erase if the drive was encrypted, or physical destruction.",
   "Cryptographic erase (crypto-shredding) works when data was encrypted from the start: destroying all copies of the key leaves only unreadable ciphertext. It is especially useful in the cloud, where you cannot physically touch the media. Cloud customers typically rely on provider assurances and crypto-shredding rather than physical destruction.",
   "Whatever the method, sanitization should be verified and documented, often with a certificate listing the media, method, date and who performed it. Some organizations sample-test sanitized media to confirm the process works. The decision flow is: classify the data, decide whether the media will leave organizational control, then choose clear, purge or destroy accordingly."
  ],
  "terms": [
   [
    "Data remanence",
    "Residual data left on storage media after deletion or erasure attempts."
   ],
   [
    "Clearing",
    "Logical sanitization that protects against simple recovery, such as overwriting user-addressable storage."
   ],
   [
    "Purging",
    "Sanitization that makes recovery infeasible even with laboratory techniques, such as secure erase, crypto-erase or degaussing."
   ],
   [
    "Degaussing",
    "Erasing magnetic media with a strong magnetic field; ineffective on SSDs and optical media."
   ]
  ],
  "example": "A company refreshing its laptops has encrypted SSDs. Because the drives will be sold to a reseller, it uses the drives' built-in cryptographic erase to purge them, verifies a sample, and records serial numbers in a sanitization log. Drives from a failed research server holding trade secrets are sent for physical shredding instead.",
  "tip": "Degaussing does not work on SSDs or flash. For SSDs, the best answers are manufacturer secure erase, cryptographic erase or physical destruction. Formatting and deleting are never adequate sanitization.",
  "check": [
   [
    "Why is overwriting unreliable for SSDs?",
    "Wear leveling and spare or remapped blocks mean some data locations are not addressable by normal writes, so old data can survive."
   ],
   [
    "Which NIST 800-88 level is appropriate when media will be released outside the organization but reused?",
    "Purging, which makes recovery infeasible even with laboratory techniques while leaving the media usable."
   ]
  ]
 },
 {
  "t": "Data security controls for data at rest, in transit and in use",
  "body": [
   "Data exists in three states, and each needs different protections. Data at rest is stored: on disks, in databases, on backup tapes or in cloud storage. Data in transit, also called data in motion, is moving across a network, whether inside a data center or across the internet. Data in use is being actively processed in memory by an application or viewed by a user. A strong program covers all three, because attackers go wherever protection is weakest.",
   "For data at rest, the main control is encryption. Options include full-disk encryption on laptops, volume or file encryption on servers, database encryption (including transparent database encryption and column-level encryption for especially sensitive fields) and server-side or client-side encryption in cloud storage. Encryption is only as strong as key management: keys should be stored separately from the data, ideally in a hardware security module or cloud key management service, with access tightly controlled and logged. Access controls, backups, integrity checking with hashes and physical security of storage media round out the protections.",
   "For data in transit, use encrypted protocols. Transport Layer Security (TLS) protects web traffic, APIs and many other application protocols. IPsec protects traffic at the network layer, commonly in site-to-site and remote access VPNs. SSH replaces insecure remote administration and file transfer protocols. Within data centers and cloud environments, encrypting internal traffic is increasingly expected, since zero trust assumes the internal network is not safe. Certificates must be validated, and weak protocol versions and cipher suites should be disabled.",
   "Data in use is the hardest state to protect because it usually has to be decrypted to be processed. Controls include strong authentication and least-privilege authorization, memory protections in the operating system, session timeouts, screen privacy filters, data masking so users see only partial values, and monitoring of user activity. Newer technologies help: trusted execution environments and confidential computing keep data encrypted in memory except inside a protected hardware enclave, and techniques such as homomorphic encryption allow some computation on encrypted data, though with significant performance costs.",
   "Tokenization and masking cut across states. Tokenization replaces a sensitive value, such as a card number, with a random token that has no mathematical relationship to the original; the real value is kept in a secured vault. Masking hides part of a value, such as showing only the last four digits. Both reduce how many systems handle real sensitive data, which shrinks the scope of compliance audits.",
   "Data loss prevention (DLP) tools monitor all three states, finding sensitive data at rest, inspecting it in transit and controlling actions like copying or printing on endpoints."
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
    "Data being actively processed in memory or displayed to a user."
   ],
   [
    "Tokenization",
    "Replacing sensitive data with a random surrogate value, with the mapping kept in a secure vault."
   ],
   [
    "Confidential computing",
    "Protecting data in use by processing it inside a hardware-based trusted execution environment."
   ]
  ],
  "example": "An online payment service encrypts its database at rest with keys held in a hardware security module, uses TLS for all API calls, tokenizes card numbers so most internal systems never see real values, and displays only the last four digits to customer service agents.",
  "tip": "Match the control to the state: encryption plus key management for rest, TLS/IPsec/SSH for transit, and access control, masking and trusted execution environments for use. Tokenization is not encryption; there is no key that mathematically reverses a token.",
  "check": [
   [
    "Why is data in use the hardest state to protect?",
    "Because it usually must be decrypted in memory to be processed, so encryption alone does not protect it."
   ],
   [
    "What is the difference between tokenization and encryption?",
    "Encryption transforms data with a key and can be reversed with that key; tokenization substitutes a random value and the original is recovered only by looking it up in a secured token vault."
   ]
  ]
 },
 {
  "t": "Scoping, tailoring and standards selection; DRM, DLP and CASB",
  "body": [
   "Frameworks and control catalogs, such as NIST SP 800-53, ISO/IEC 27001 Annex A or the CIS Controls, list far more controls than any one system needs. Standards selection, scoping and tailoring are how you turn a generic catalog into the right set of controls for your environment.",
   "Standards selection is choosing which frameworks or baselines to follow. The choice depends on legal and regulatory obligations (a card processor must meet PCI DSS; a US federal system follows NIST requirements), industry expectations, customer contracts and the organization's goals. Often several apply, and teams map them to each other so one control can satisfy multiple requirements.",
   "Scoping is reviewing the baseline controls and deciding which ones apply to the system at all. For example, wireless controls do not apply to a system with no wireless components. Tailoring is modifying the controls that do apply to fit the organization's mission and environment: adjusting parameters such as password length or log retention, adding compensating controls, or supplementing with extra controls for special risks. In short: scoping picks which controls are in, tailoring adjusts how they are applied. Both decisions should be documented and justified so auditors can follow the reasoning.",
   "Three technologies commonly appear with this topic. Digital rights management (DRM), and its enterprise form, information rights management, protects content even after it leaves your control. Protection travels with the file: the owner can restrict opening, copying, printing or forwarding, set expiration dates and revoke access later. DRM relies on encryption plus a licensing service that checks permissions when someone tries to open the content.",
   "Data loss prevention (DLP) detects and prevents unauthorized movement of sensitive data. It identifies sensitive content through pattern matching (such as card number formats), fingerprinting of known documents, keywords and classification labels. Network DLP inspects traffic leaving the organization, endpoint DLP controls actions on devices such as copying to USB or uploading, and storage or discovery DLP scans repositories to find where sensitive data sits. DLP can alert, block, quarantine or encrypt. It struggles with traffic it cannot decrypt, so it is often paired with TLS inspection.",
   "A cloud access security broker (CASB) sits between users and cloud services to enforce policy. It provides visibility into which cloud apps are used (including shadow IT), enforces access and data policies, applies DLP to cloud content and detects threats such as unusual downloads. CASBs work in inline proxy mode, which can block activity in real time, or through API integration with cloud services, which can scan stored data and act after the fact. CASB features are often bundled into secure access service edge platforms."
  ],
  "terms": [
   [
    "Scoping",
    "Deciding which controls from a baseline apply to a particular system or environment."
   ],
   [
    "Tailoring",
    "Modifying applicable controls, parameters or compensating controls to fit an organization's needs."
   ],
   [
    "Digital rights management (DRM)",
    "Technology that enforces usage restrictions on content, such as no copy or print, wherever the content goes."
   ],
   [
    "Data loss prevention (DLP)",
    "Tools that discover sensitive data and prevent its unauthorized transfer or disclosure."
   ],
   [
    "Cloud access security broker (CASB)",
    "A policy enforcement point between users and cloud services that provides visibility, data security and threat protection."
   ]
  ],
  "example": "A healthcare company adopts NIST controls, scopes out wireless controls for a lab system that has no wireless interfaces and tailors the log retention setting to match its regulatory requirement. It then uses DLP to block emails containing patient identifiers, a CASB to find unsanctioned file-sharing apps and DRM so shared research documents cannot be printed by partners.",
  "tip": "Scoping removes controls that do not apply; tailoring adjusts the ones that do. DRM protects content after it leaves your environment, DLP stops it leaving inappropriately, and a CASB governs cloud service use.",
  "check": [
   [
    "Removing controls for a technology the system does not use is an example of what?",
    "Scoping."
   ],
   [
    "Which tool can prevent a recipient from printing a document after it has been emailed outside the company?",
    "Digital rights management, because its protection travels with the document."
   ]
  ]
 },
 {
  "t": "Secure design principles: least privilege, defense in depth, secure defaults, fail securely, zero trust, privacy by design, SASE",
  "body": [
   "Secure design principles are the rules of thumb that architects apply before any code is written or product chosen. The CISSP outline lists a set of them, and the exam expects you to recognize each from a description and to pick the principle that a design violates.",
   "Least privilege gives every user, process and system only the access needed to perform its function, for only as long as needed. It limits the damage from mistakes and compromise. Related ideas include need-to-know for information and just-in-time access for administrators. Separation of duties splits critical tasks across people so no one can abuse them alone. Keep it simple (economy of mechanism) reduces complexity, since complex systems hide flaws.",
   "Defense in depth, or layered security, uses multiple independent controls so that if one fails, others still protect the asset. A web application might be protected by a firewall, a web application firewall, input validation, least-privilege database accounts, encryption and monitoring. The layers should be diverse (administrative, technical and physical) so a single weakness does not defeat them all.",
   "Secure defaults means systems ship and deploy in their most secure reasonable configuration: unnecessary services off, default passwords replaced, strict settings on. Users can loosen settings deliberately, but safety should not depend on them remembering to tighten them. Fail securely (fail safe or fail closed, in the security sense) means that when a component fails, it does so without leaving the system exposed: an access check that errors out should deny access, not grant it. Note the life-safety exception: a fire door must fail open so people can escape, because human safety always comes first.",
   "Zero trust drops the idea that anything inside the network perimeter is trusted. Every request is authenticated, authorized and encrypted based on identity, device health and context, regardless of network location. Key ideas are 'never trust, always verify', least privilege, micro-segmentation and assuming breach. NIST SP 800-207 describes zero trust architecture with a policy decision point that decides and a policy enforcement point that enforces access.",
   "Privacy by design builds privacy into systems from the start rather than adding it later. Its foundational principles include being proactive not reactive, privacy as the default setting, privacy embedded into design, full functionality (positive-sum, not trade-offs), end-to-end lifecycle protection, visibility and transparency, and respect for user privacy. The CISSP outline also lists trust but verify and shared responsibility as separate design principles: rely on others where appropriate but confirm with evidence, and be clear about which party secures which layer in cloud services.",
   "Secure access service edge (SASE) combines networking and security into a cloud-delivered service. It typically merges software-defined WAN with security functions such as secure web gateway, CASB, zero trust network access and firewall as a service, so users get consistent policy wherever they connect from."
  ],
  "terms": [
   [
    "Least privilege",
    "Granting only the minimum access needed to perform a task, for only as long as needed."
   ],
   [
    "Defense in depth",
    "Using multiple, diverse layers of controls so the failure of one does not expose the asset."
   ],
   [
    "Fail securely",
    "Designing failures to leave the system in a secure state, such as denying access when an authorization check fails."
   ],
   [
    "Zero trust",
    "An architecture that grants no implicit trust based on network location and verifies every request."
   ],
   [
    "SASE",
    "Secure access service edge: cloud-delivered convergence of SD-WAN and security services such as SWG, CASB and ZTNA."
   ]
  ],
  "example": "A company replaces its VPN with a zero trust access service. Staff reach each internal app only after identity and device checks, admins get elevated rights just in time, new servers deploy with a hardened default image, and the authorization service is coded so that if the policy engine is unreachable, requests are denied rather than allowed.",
  "tip": "Fail secure for data and systems, but fail safe (open) for doors on life-safety paths: human safety wins every time on the CISSP exam.",
  "check": [
   [
    "An application grants access when its authorization service times out. Which principle is violated?",
    "Fail securely, because a failure should result in denial rather than access."
   ],
   [
    "What is the core assumption that distinguishes zero trust from perimeter security?",
    "No user or device is trusted by default based on network location; every access request is verified."
   ]
  ]
 },
 {
  "t": "Security models: Bell-LaPadula, Biba, Clark-Wilson, Brewer-Nash",
  "body": [
   "Security models are formal descriptions of how a system should enforce a security policy. They are abstract, but the exam tests them in predictable ways: which property a model protects and what its rules forbid. Remember the subject is the active entity (a user or process) and the object is the passive resource (a file or record).",
   "Bell-LaPadula is a confidentiality model developed for military classification. Its simple security property is 'no read up': a subject cannot read an object at a higher classification. Its star (*) property is 'no write down': a subject cannot write information to a lower classification, which prevents leaking secrets downward, for example by copying Secret data into an Unclassified file. The strong star property says a subject can read and write only at its own level. Bell-LaPadula also uses a discretionary rule based on an access matrix. It ignores integrity and availability.",
   "Biba is an integrity model and inverts Bell-LaPadula. Its simple integrity property is 'no read down': a subject should not read lower-integrity data, which could corrupt its decisions. Its star integrity property is 'no write up': a subject cannot write to a higher-integrity object, so untrusted sources cannot contaminate trusted data. An invocation property prevents a subject from invoking a subject at higher integrity. A way to remember: Bell-LaPadula protects secrets flowing down; Biba protects clean data from dirty data flowing up.",
   "Clark-Wilson is a commercial integrity model. Users do not touch data directly; they must go through well-formed transactions, called transformation procedures (TPs), which operate on constrained data items (CDIs). Integrity verification procedures (IVPs) check that CDIs are in a valid state. Unconstrained data items (UDIs), such as raw user input, must be validated by a TP before becoming CDIs. The access control triple ties a user to specific TPs on specific CDIs. Clark-Wilson enforces well-formed transactions and separation of duties, and it addresses all three integrity goals: preventing unauthorized users from making changes, preventing authorized users from making improper changes and maintaining internal and external consistency.",
   "Brewer-Nash, also called the Chinese Wall model, prevents conflicts of interest. Access rights change dynamically based on what a subject has already accessed. A consultant who reads one bank's data is then blocked from reading data of competing banks in the same conflict-of-interest class, but can still access clients in other industries.",
   "You may also see other models: the state machine model (a system is secure if it always moves between secure states), information flow and noninterference models (actions at a high level should not be observable at a low level, closing covert channels), Graham-Denning and Harrison-Ruzzo-Ullman (rules for creating and deleting subjects and objects and assigning rights), and the lattice-based model that underlies mandatory access control."
  ],
  "terms": [
   [
    "Bell-LaPadula",
    "A confidentiality model enforcing no read up and no write down."
   ],
   [
    "Biba",
    "An integrity model enforcing no read down and no write up."
   ],
   [
    "Clark-Wilson",
    "A commercial integrity model using well-formed transactions, the access control triple and separation of duties."
   ],
   [
    "Brewer-Nash (Chinese Wall)",
    "A model that dynamically restricts access to prevent conflicts of interest."
   ]
  ],
  "example": "A consulting firm's document system uses a Chinese Wall policy. After an analyst opens files for one airline client, the system blocks her from opening files belonging to competing airlines, while still allowing access to clients in retail and manufacturing.",
  "tip": "Confidentiality: Bell-LaPadula (no read up, no write down). Integrity: Biba (no read down, no write up) and Clark-Wilson (transactions, separation of duties). Conflict of interest: Brewer-Nash. The word 'simple' always refers to read; 'star' always refers to write.",
  "check": [
   [
    "Under Bell-LaPadula, can a Secret-cleared user write to a Confidential file?",
    "No. The star property forbids writing down, because that could leak Secret information to a lower level."
   ],
   [
    "Which model requires users to modify data only through transformation procedures?",
    "Clark-Wilson."
   ]
  ]
 },
 {
  "t": "Controls based on system security requirements; evaluation criteria (Common Criteria)",
  "body": [
   "Choosing controls should start with requirements, not products. A system's security requirements come from its data classification, business function, laws and contracts, risk assessment and the organization's policies. Once you know what the system must achieve (for example, 'only authenticated clinicians can view patient records, and every access is logged'), you select controls that meet those requirements and later verify that they do.",
   "Controls can be categorized in two ways, and exam questions use both. By type: administrative (policies, procedures, training), technical or logical (encryption, firewalls, access control) and physical (locks, guards, fences). By function: preventive (stop an incident), detective (discover it), corrective (fix it after it happens), deterrent (discourage attempts), recovery (restore operations), directive (tell people what to do) and compensating (an alternative when the primary control is not feasible). A single control can be described both ways: a security camera is a physical, detective (and deterrent) control.",
   "After selecting controls, organizations need assurance that products actually deliver the claimed security. Product evaluation criteria provide that assurance through independent testing. Historically, the US used the Trusted Computer System Evaluation Criteria (TCSEC, the 'Orange Book'), and Europe used ITSEC. Both were replaced by the Common Criteria for Information Technology Security Evaluation, an international standard published as ISO/IEC 15408.",
   "Common Criteria has its own vocabulary. The target of evaluation (TOE) is the product or system being evaluated. A protection profile (PP) is an implementation-independent set of security requirements for a category of products, written by a customer group or government, for example for firewalls. A security target (ST) is the vendor's document describing the security properties of their specific product, often claiming conformance to a protection profile. Security functional requirements describe what the product does; security assurance requirements describe how thoroughly it was designed and tested.",
   "Evaluation assurance levels (EALs) range from EAL1 to EAL7. They measure how rigorously the product was evaluated, not how secure it is in absolute terms. EAL1 is functionally tested; EAL2 structurally tested; EAL3 methodically tested and checked; EAL4 methodically designed, tested and reviewed; EAL5 semiformally designed and tested; EAL6 semiformally verified design and tested; EAL7 formally verified design and tested. Many recent evaluations focus on conformance to protection profiles rather than high EALs.",
   "Certification and accreditation are the organizational counterparts. Certification (security assessment) is the technical evaluation of a system in its operating environment. Accreditation, now usually called authorization, is management's formal decision to accept the residual risk and allow the system to operate. An evaluated product still needs to be configured and deployed correctly to meet your requirements."
  ],
  "terms": [
   [
    "Common Criteria",
    "An international framework, ISO/IEC 15408, for evaluating the security of IT products."
   ],
   [
    "Protection profile (PP)",
    "An implementation-independent statement of security requirements for a type of product."
   ],
   [
    "Security target (ST)",
    "A vendor's statement of the security properties and claims of a specific product under evaluation."
   ],
   [
    "Evaluation assurance level (EAL)",
    "A rating from EAL1 to EAL7 indicating the depth and rigor of a Common Criteria evaluation."
   ],
   [
    "Authorization (accreditation)",
    "Management's formal acceptance of residual risk to allow a system to operate."
   ]
  ],
  "example": "A government agency needs a new firewall. It requires products certified against the relevant firewall protection profile, compares vendors' security targets, then deploys the chosen product, runs its own security assessment in the actual network and has the authorizing official formally approve operation.",
  "tip": "A higher EAL means the product was evaluated more rigorously, not that it is guaranteed secure. Customers write protection profiles; vendors write security targets.",
  "check": [
   [
    "What does EAL4 indicate about a product?",
    "That it was methodically designed, tested and reviewed; it describes evaluation rigor, not absolute security."
   ],
   [
    "Who makes the final decision to allow a system to operate with its residual risk?",
    "A senior management official (the authorizing official) through authorization, formerly called accreditation."
   ]
  ]
 },
 {
  "t": "Security capabilities of information systems: TPM, memory protection, HSM",
  "body": [
   "Modern hardware and operating systems include built-in security capabilities that software alone cannot provide. The CISSP exam expects you to know what each does and when to use it. Several of these capabilities rely on the idea of a hardware root of trust: a small, trusted component whose integrity everything else builds on.",
   "A Trusted Platform Module (TPM) is a secure cryptoprocessor, usually a chip on the motherboard or firmware built into the processor. It generates and stores keys that cannot easily be extracted, and it records measurements (hashes) of boot components in platform configuration registers. This supports measured boot and remote attestation, where a system proves to another party what software it booted. A TPM can seal a key so it is released only if the boot measurements match expected values, which is how full-disk encryption tools can protect a drive: if the boot chain has been tampered with, the key is not released. A TPM is tied to one device.",
   "A hardware security module (HSM) is a dedicated, tamper-resistant device, often a network appliance or a plug-in card, that generates, stores and uses cryptographic keys at high performance for many applications. Certificate authorities, payment systems and key management services use HSMs so private keys never leave protected hardware in plaintext. HSMs are often validated against standards such as FIPS 140, and cloud providers offer HSM-backed key services. The key distinction: a TPM protects one computer; an HSM serves keys for many systems and applications.",
   "Memory protection keeps processes from interfering with each other and with the operating system. Techniques include process isolation, where each process has its own virtual address space; protection rings, where the kernel runs in the most privileged ring (ring 0) and applications in a less privileged ring (ring 3); data execution prevention, which marks memory areas as non-executable so injected data cannot run as code; and address space layout randomization (ASLR), which randomizes where code and data load, making memory corruption attacks harder to exploit reliably.",
   "Other capabilities appear in the same objective. Secure boot checks digital signatures on boot components so only trusted code loads. Trusted execution environments and secure enclaves isolate sensitive processing even from the main operating system. Virtualization provides isolation between guest systems through the hypervisor. The trusted computing base (TCB) is the total set of hardware, firmware and software that enforces security; the reference monitor is the concept of an always-invoked, tamperproof, verifiable component that mediates every access, and the security kernel is its implementation.",
   "Encryption, interfaces and fault tolerance also count as system capabilities. Restricting interfaces, such as limiting which menu options a user sees, and building redundancy so failures do not compromise security both follow from the design principles covered earlier."
  ],
  "terms": [
   [
    "Trusted Platform Module (TPM)",
    "A device-bound secure cryptoprocessor that stores keys and boot measurements for sealing and attestation."
   ],
   [
    "Hardware security module (HSM)",
    "A tamper-resistant device that securely generates, stores and uses cryptographic keys for many applications."
   ],
   [
    "Reference monitor",
    "An abstract concept of a component that mediates all access between subjects and objects, is tamperproof and is verifiable."
   ],
   [
    "Address space layout randomization (ASLR)",
    "A memory protection that randomizes where code and data are loaded to hinder memory corruption exploits."
   ]
  ],
  "example": "A company encrypts laptops using keys sealed in each device's TPM, so if someone tampers with the bootloader, the drive stays locked. Its internal certificate authority keeps its root and issuing keys inside an HSM, so no administrator can copy the private key to a file.",
  "tip": "TPM equals one device, boot integrity and sealed disk keys; HSM equals centralized, high-volume key storage and crypto operations for many applications. The reference monitor must be tamperproof, always invoked and small enough to verify.",
  "check": [
   [
    "Which component would a certificate authority use to protect its signing keys?",
    "A hardware security module, which keeps private keys in tamper-resistant hardware and performs signing operations internally."
   ],
   [
    "What does data execution prevention stop?",
    "It stops code from running in memory regions marked as data, blocking many attacks that inject code into buffers."
   ]
  ]
 },
 {
  "t": "Vulnerabilities in architectures: client, server, database, cloud, IoT, ICS/OT, virtualization, containers, serverless",
  "body": [
   "Every architecture has characteristic weak spots. The exam describes an environment and expects you to recognize its typical vulnerabilities and the matching mitigations. The underlying lesson is to understand where trust lives and where attackers can abuse it.",
   "Client-based systems, such as desktops, browsers and mobile apps, face malicious downloads, unpatched software, insecure local data caching and applets or scripts that run with too much privilege. Mitigations include patching, endpoint protection, application allow-listing and never trusting client-side validation alone. Server-based systems face exposed services, misconfiguration and data flow control problems; harden them, minimize services and monitor them.",
   "Databases have specific issues. Aggregation is combining individually low-sensitivity data to reveal something more sensitive. Inference is deducing sensitive information from data you are allowed to see. Countermeasures include polyinstantiation (maintaining multiple records at different classification levels so lower-cleared users cannot infer hidden data), cell suppression, noise and perturbation, and database views that restrict what users see. Injection attacks and excessive privileges are common technical flaws.",
   "Cloud systems shift some responsibility to providers under a shared responsibility model: the provider secures the underlying infrastructure, while the customer secures what they configure, such as identities, data and access settings. The most common cloud failures are customer misconfigurations, like publicly exposed storage, overly broad permissions and leaked access keys. Multi-tenancy adds a risk of isolation failures between customers. Distributed and large-scale parallel systems add complexity in data consistency and trust between nodes.",
   "Internet of Things (IoT) devices often have weak default credentials, limited patching, insecure communication and long lifespans. Industrial control systems and operational technology (ICS/OT), such as SCADA systems, programmable logic controllers and distributed control systems, prioritize availability and safety, use legacy protocols designed without authentication and cannot be patched or rebooted easily. Mitigations include network segmentation (keeping OT separate from IT), strict remote access control, passive monitoring and compensating controls. Embedded systems share many of these concerns.",
   "Virtualized systems rely on the hypervisor for isolation. Risks include virtual machine escape (breaking out of a guest to reach the host or other guests), VM sprawl (unmanaged, unpatched VMs) and weak management interfaces. Containers share the host kernel, so a kernel flaw or privileged container can affect everything; risks also include vulnerable or untrusted images, secrets baked into images and overly permissive orchestration. Mitigations include minimal trusted images, image scanning, running as non-root and isolating workloads. Serverless (function as a service) removes server management, but introduces risks such as over-privileged function roles, event-data injection, insecure dependencies and reduced visibility for monitoring.",
   "Microservices, high-performance computing and edge or fog computing also appear in the outline. The common threads are: understand the trust boundaries, minimize privileges, harden configurations and keep visibility through logging and monitoring."
  ],
  "terms": [
   [
    "Aggregation",
    "Combining individually less sensitive data items to derive information of higher sensitivity."
   ],
   [
    "Inference",
    "Deducing sensitive information from data a user is authorized to access."
   ],
   [
    "Polyinstantiation",
    "Storing multiple versions of a record at different classification levels to prevent inference."
   ],
   [
    "VM escape",
    "An attack in which code in a virtual machine breaks out to access the hypervisor or other guests."
   ],
   [
    "Shared responsibility model",
    "The division of security duties between a cloud provider and its customer, varying by service model."
   ]
  ],
  "example": "A manufacturing company connects its factory PLCs to the corporate network for reporting. A risk review finds the controllers use an unauthenticated legacy protocol and cannot be patched quickly, so the team places them behind an industrial firewall in a separate zone, allows only one-way data flows to a reporting server and adds passive network monitoring.",
  "tip": "For ICS/OT the exam favors segmentation and availability-safe controls over patching or active scanning. For cloud, remember that customer misconfiguration is the most common failure under shared responsibility.",
  "check": [
   [
    "What database countermeasure prevents lower-cleared users from inferring the existence of classified data?",
    "Polyinstantiation, which maintains different versions of records for different classification levels."
   ],
   [
    "Why can a kernel vulnerability affect all containers on a host?",
    "Containers share the host operating system kernel, unlike virtual machines, which have their own kernels."
   ]
  ]
 },
 {
  "t": "Cryptographic solutions: symmetric, asymmetric, hashing, PKI, key management lifecycle",
  "body": [
   "Cryptography is a toolbox, and the CISSP exam cares less about the math than about choosing the right tool. Each tool provides different services: confidentiality, integrity, authentication and non-repudiation. The exam also expects you to understand how keys are managed, because weak key management breaks strong algorithms.",
   "Symmetric cryptography uses one shared secret key for both encryption and decryption. It is fast and suited to bulk data. The Advanced Encryption Standard (AES) is the modern standard, with 128-, 192- and 256-bit keys; older algorithms such as DES and 3DES are deprecated. Symmetric encryption provides confidentiality, but its challenge is key distribution: both parties need the key, and the number of keys grows quickly, n(n-1)/2 for n people communicating pairwise. It cannot provide non-repudiation, since both parties hold the same key. Modes matter too: authenticated modes such as GCM provide integrity as well as confidentiality, while ECB leaks patterns and should be avoided.",
   "Asymmetric (public key) cryptography uses a key pair: a public key that can be shared and a private key that must be kept secret. Encrypt with the recipient's public key for confidentiality; only their private key decrypts. Sign with your own private key; anyone with your public key can verify the signature, which provides authenticity, integrity and non-repudiation. Common algorithms are RSA, elliptic curve cryptography (ECC, which offers equivalent strength with shorter keys) and Diffie-Hellman for key agreement. Asymmetric operations are slow, so real systems use hybrid cryptography: asymmetric methods exchange or agree on a symmetric session key, which then encrypts the data. TLS works this way.",
   "Hashing turns input of any size into a fixed-length digest. Good hash functions are one-way and collision resistant. Hashes support integrity checks and password storage. SHA-2 and SHA-3 families are current; MD5 and SHA-1 are considered broken for collision resistance. For passwords, use a salt (random value per password) and a deliberately slow function such as bcrypt, scrypt, Argon2 or PBKDF2. A keyed hash (HMAC) adds authentication between parties who share a key.",
   "Public key infrastructure (PKI) binds public keys to identities using digital certificates in the X.509 format. A certificate authority (CA) signs certificates after a registration authority (RA) verifies the requester's identity. Trust flows from a root CA, often kept offline, through intermediate CAs. Revocation is checked through certificate revocation lists (CRLs) or the Online Certificate Status Protocol (OCSP), and OCSP stapling lets servers deliver fresh status themselves.",
   "The key management lifecycle covers generation (strong randomness, adequate length), distribution (secure out-of-band or key exchange), storage (HSMs, key vaults, never hard-coded), use (limit each key to its purpose), rotation (replace keys on a schedule or after suspected compromise), backup and escrow (so data can be recovered), revocation and, finally, destruction. Split knowledge and dual control ensure no single person can access a critical key alone. Cryptographic agility, the ability to change algorithms quickly, matters as quantum-resistant algorithms are adopted."
  ],
  "terms": [
   [
    "Symmetric encryption",
    "Encryption that uses the same secret key to encrypt and decrypt."
   ],
   [
    "Asymmetric encryption",
    "Encryption that uses a public and private key pair; what one key encrypts only the other can decrypt."
   ],
   [
    "Digital signature",
    "A hash of a message encrypted with the signer's private key, providing integrity, authenticity and non-repudiation."
   ],
   [
    "Certificate authority (CA)",
    "A trusted entity that issues and signs digital certificates binding public keys to identities."
   ],
   [
    "Salt",
    "A random value added to each password before hashing so identical passwords produce different hashes."
   ]
  ],
  "example": "When your browser connects to a bank, the bank's server presents an X.509 certificate signed by a trusted CA. The browser verifies the signature and revocation status, then the two sides use an ephemeral Diffie-Hellman exchange to agree on a symmetric AES session key, which encrypts the rest of the session efficiently.",
  "tip": "To send someone a confidential message, encrypt with THEIR public key. To sign, use YOUR private key. Know the key count formulas: symmetric needs n(n-1)/2 keys; asymmetric needs 2n.",
  "check": [
   [
    "How many symmetric keys are needed for 10 people to communicate pairwise?",
    "10 x 9 / 2 = 45 keys."
   ],
   [
    "Why do real protocols combine asymmetric and symmetric cryptography?",
    "Asymmetric solves key exchange and supports signatures but is slow; symmetric is fast for bulk data, so the hybrid gets both benefits."
   ]
  ]
 },
 {
  "t": "Cryptanalytic attacks: brute force, side channel, man-in-the-middle, pass the hash, ransomware",
  "body": [
   "Cryptanalytic attacks try to defeat cryptography or the systems around it. Most real attacks do not break the math; they exploit weak keys, poor implementations, leaked credentials or careless users. Understanding the attack categories helps you choose the right defenses.",
   "Brute force tries every possible key or password until one works. Its feasibility depends on key length and speed of guessing. Longer keys and passwords, slow password hashing functions, account lockout and rate limiting defeat it. Dictionary attacks try likely words first, and rainbow tables use precomputed hash chains to reverse unsalted password hashes quickly; salting defeats rainbow tables because each password needs its own table. Birthday attacks exploit the math of collisions: finding any two inputs with the same hash is much easier than matching a specific hash, which is why longer digests are needed.",
   "Analytic attacks target weaknesses in the algorithm itself. Known plaintext, chosen plaintext, chosen ciphertext and ciphertext-only attacks describe how much the attacker knows or controls. Frequency analysis breaks simple substitution ciphers. Implementation attacks exploit flaws in how cryptography is coded, such as weak random number generators, reused nonces or improper padding checks.",
   "Side-channel attacks gather information from the physical behavior of a system rather than its outputs: timing differences, power consumption, electromagnetic emissions, sound or even cache behavior. Fault injection deliberately causes errors, for example with voltage glitches, to reveal secrets. Defenses include constant-time implementations, shielding, tamper-resistant hardware such as HSMs and adding noise.",
   "An on-path attack, traditionally called man-in-the-middle, places the attacker between two parties to intercept or alter traffic, often by spoofing addresses, poisoning ARP or DNS caches or running a rogue wireless access point. Strong mutual authentication, certificate validation, certificate pinning where appropriate and authenticated key exchange defeat it. Replay attacks, where captured valid messages are resent later, are countered by timestamps, nonces and session tokens.",
   "Pass the hash abuses how some authentication protocols, notably NTLM in Windows, accept a password hash as proof of identity. An attacker who steals a hash from memory on a compromised machine can authenticate as that user without cracking it. Related techniques abuse Kerberos tickets. Defenses include limiting privileged logons to trusted systems, unique local administrator passwords, credential isolation features, disabling legacy protocols and monitoring for unusual authentication.",
   "Ransomware uses cryptography against its victims: it encrypts files and demands payment for the key, and modern variants also steal data and threaten to leak it (double extortion). The best defenses are offline or immutable backups that are tested regularly, patching, least privilege, email and endpoint protection, segmentation and a practiced incident response plan. Paying does not guarantee recovery and may carry legal issues, so decisions involve senior management and legal counsel."
  ],
  "terms": [
   [
    "Brute force attack",
    "Trying every possible key or password until the correct one is found."
   ],
   [
    "Side-channel attack",
    "An attack that extracts secrets from physical effects such as timing, power use or emissions."
   ],
   [
    "On-path attack",
    "An attacker positioned between two parties who intercepts or alters communications; also called man-in-the-middle."
   ],
   [
    "Pass the hash",
    "Authenticating with a stolen password hash instead of the plaintext password."
   ],
   [
    "Rainbow table",
    "Precomputed data used to reverse unsalted password hashes quickly."
   ]
  ],
  "example": "Investigators find that an attacker compromised one workstation, extracted a domain administrator's NTLM hash from memory and used it to log on to file servers without knowing the password. The organization responds by restricting admin logons to hardened admin workstations, deploying unique local admin passwords and alerting on NTLM use by privileged accounts.",
  "tip": "Salting defeats rainbow tables; key length and slow hashing defeat brute force; mutual authentication and certificate validation defeat on-path attacks; offline, tested backups are the key ransomware recovery control.",
  "check": [
   [
    "Which defense specifically makes rainbow tables ineffective?",
    "Salting each password hash with a unique random value."
   ],
   [
    "Why doesn't a strong password stop pass the hash?",
    "The attacker uses the stolen hash directly for authentication, so the password never has to be cracked."
   ]
  ]
 },
 {
  "t": "Secure site and facility design",
  "body": [
   "Physical security protects people, equipment and data from harm that no firewall can stop. The CISSP treats it as a design problem: the best time to secure a facility is before it is built or leased, and the first priority is always human safety.",
   "Site selection comes first. Consider natural disaster risk (flood plains, earthquake zones, severe weather), crime rates, proximity to emergency services, access to reliable power and telecommunications from diverse providers, neighbors that could create risk (such as chemical plants or high-profile targets) and visibility. A data center may benefit from a nondescript building that does not advertise what it holds.",
   "Crime Prevention Through Environmental Design (CPTED) uses the physical environment to discourage crime. It has three core strategies. Natural access control guides people through controlled entrances with landscaping, fencing and lighting. Natural surveillance arranges spaces so people can see and be seen, such as windows overlooking parking lots and clear sight lines. Territorial reinforcement makes ownership obvious through signage, walls and design that signal a space is cared for and monitored. Maintenance is often added as a fourth element, because neglected spaces invite crime.",
   "Facility design uses layered defenses from the outside in: perimeter (fencing, bollards to stop vehicles, lighting, gates), grounds, building exterior (hardened doors, limited entrances, few ground-floor windows), interior zones and finally the most sensitive rooms. Each layer should delay intruders and give detection systems and guards time to respond. The principle is deter, detect, delay, respond. Sensitive areas such as server rooms should be in the building's interior, away from exterior walls, not on the top floor (roof leaks) or in the basement (flooding), and not next to public areas.",
   "Entry points get special attention. Mantraps or access control vestibules allow only one person through at a time and prevent tailgating (following an authorized person through a door) and piggybacking (entering with the authorized person's consent). Badge readers, biometric readers and guards verify identity. Visitor management includes sign-in, badges, escorts and logs.",
   "Design also supports life safety. Exits must be clearly marked, doors on escape routes must allow egress during emergencies, and evacuation plans must be practiced. Security design should never block emergency exit. Wall construction, door strength, ceiling and floor spaces (which intruders might crawl through) and ducts must all match the protection level of the room they enclose, since the weakest barrier defines the real strength."
  ],
  "terms": [
   [
    "CPTED",
    "Crime Prevention Through Environmental Design: using natural access control, natural surveillance and territorial reinforcement to deter crime."
   ],
   [
    "Mantrap (access control vestibule)",
    "A small space with two interlocking doors that allows only one authenticated person through at a time."
   ],
   [
    "Tailgating",
    "An unauthorized person following an authorized person through a secured entrance without their knowledge."
   ],
   [
    "Bollard",
    "A short, sturdy post that prevents vehicles from approaching or ramming a building."
   ]
  ],
  "example": "A company building a new operations center chooses a site outside the local flood plain with two separate power feeds. The design places the data hall in the building's core, uses landscaping and fencing to route visitors to a single staffed entrance with a vestibule, and installs bollards in front of the lobby glass.",
  "tip": "Human safety comes first in every physical security answer. Server rooms belong in the center of the building, not on the top floor, basement or exterior walls.",
  "check": [
   [
    "Which CPTED strategy uses windows and lighting so that activity is visible to others?",
    "Natural surveillance."
   ],
   [
    "What control prevents tailgating at a secure entrance?",
    "A mantrap or access control vestibule, often combined with guards and awareness training."
   ]
  ]
 },
 {
  "t": "Site and facility controls: wiring closets, server rooms, utilities, HVAC, fire suppression, environmental",
  "body": [
   "Once a facility is designed, specific controls protect the rooms and systems inside it. The exam covers these practical details, especially fire suppression and environmental controls, because they directly affect availability and safety.",
   "Wiring closets (intermediate distribution facilities) and server rooms contain concentrated, valuable equipment. They should be locked, with access limited to those who need it and logged electronically. They should not double as storage rooms, and walls should extend from true floor to true ceiling so no one can climb over through a drop ceiling. Cameras, intrusion alarms and cable management protect against tampering. Media storage areas and evidence storage need similar protections plus inventory control.",
   "Utilities need resilience. Power problems include a fault (momentary loss), blackout (prolonged loss), sag (momentary low voltage), brownout (prolonged low voltage), spike (momentary high voltage), surge (prolonged high voltage), inrush (a surge when equipment is powered on) and noise (interference). Surge protectors and line conditioners handle quality issues; an uninterruptible power supply (UPS) bridges short outages and allows orderly shutdown or transfer; a generator provides long-term power but needs fuel contracts and regular testing. Redundant utility feeds from separate substations add resilience.",
   "Heating, ventilation and air conditioning (HVAC) keeps equipment within safe ranges. Too much heat damages equipment; too little humidity increases static electricity; too much causes condensation and corrosion. Hot aisle and cold aisle layouts improve cooling efficiency. Positive air pressure keeps dust and smoke out when doors open. HVAC should be on a separate controlled system for the data center, and its controls must be secured, since manipulating them could cause an outage.",
   "Fire needs three things (heat, fuel and oxygen), plus a chemical reaction in the fire tetrahedron. Suppression removes one. Fire classes in the US system are: A (common combustibles, suppress with water or foam), B (flammable liquids, use CO2, foam or dry chemical), C (energized electrical, use CO2 or non-conductive agents), D (combustible metals, dry powder) and K (cooking oils). Detection uses smoke (ionization or photoelectric), heat (fixed temperature or rate-of-rise) and flame detectors.",
   "Water sprinklers come in four types. Wet pipe systems are always full of water and discharge quickly when a head's fusible link melts, but they risk leaks. Dry pipe systems hold compressed air and fill only when triggered, suitable for freezing areas. Pre-action systems are the usual recommendation for data centers: the pipe fills only after a detector triggers, and water releases only when a head also opens, giving time to stop a false alarm. Deluge systems open all heads at once for high-hazard areas. Gas-based clean agent systems (such as FM-200 or inert gases) protect equipment without water damage; carbon dioxide is effective but dangerous to people. Halon is no longer produced because it depletes ozone.",
   "Environmental monitoring covers temperature, humidity, water leaks (sensors under raised floors), smoke and door status, with alerts sent to staff. Emergency lighting, emergency power off switches and trained personnel complete the picture."
  ],
  "terms": [
   [
    "Pre-action sprinkler",
    "A system whose pipes fill with water only after detection, releasing water when a sprinkler head also activates; preferred for data centers."
   ],
   [
    "Uninterruptible power supply (UPS)",
    "A battery-based device that provides short-term power during outages and conditions power quality."
   ],
   [
    "Brownout",
    "A prolonged period of low voltage."
   ],
   [
    "Clean agent",
    "A gaseous fire suppressant that leaves no residue and is safe for electronic equipment."
   ]
  ],
  "example": "A regional data center has an electrical fire risk, so it installs a pre-action sprinkler system with smoke detectors, a clean agent system for the main hall, water sensors under the raised floor, dual power feeds, a UPS sized for a clean transfer to a diesel generator and alarms that page on-call staff when humidity drifts out of range.",
  "tip": "Pre-action is the preferred sprinkler type for data centers. Electrical fires (class C in the US system) must not be fought with water until power is cut. Know the power terms: sag and brownout are low voltage; spike and surge are high.",
  "check": [
   [
    "Why is low humidity a problem in a server room?",
    "It increases the risk of static electricity discharge, which can damage components."
   ],
   [
    "What is the difference between a UPS and a generator?",
    "A UPS provides immediate, short-term battery power and power conditioning; a generator provides longer-term power after it starts."
   ]
  ]
 },
 {
  "t": "Information system lifecycle: stakeholder needs through retirement",
  "body": [
   "Security is cheapest and most effective when it is built in from the beginning and carried through to the end of a system's life. The CISSP outline describes an information system lifecycle, based on systems engineering practice such as ISO/IEC/IEEE 15288 and NIST SP 800-160, that runs from understanding stakeholder needs to retirement. The same logic applies to buying, building or configuring a system.",
   "It starts with stakeholder needs and requirements. Stakeholders include business owners, users, operators, regulators and security. Their needs, including security and privacy needs, are captured and turned into requirements. Next comes requirements analysis, where those needs are refined into specific, testable system requirements, such as 'all administrative access requires multifactor authentication'. Security requirements come from risk assessment, data classification, policy and law.",
   "Architectural design decides the high-level structure: components, interfaces, trust boundaries and how security principles such as least privilege and defense in depth apply. Threat modeling fits naturally here. Development or implementation then builds or acquires the components, following secure coding practices and configuration standards. Integration brings components together and checks that interfaces work securely.",
   "Verification and validation are distinct and often confused. Verification asks 'did we build the system right?', meaning does it meet the specified requirements. Validation asks 'did we build the right system?', meaning does it meet the stakeholders' actual needs in its intended environment. Security testing, code review and vulnerability assessment support both. Transition (deployment) moves the system into production, including training, documentation, secure configuration and formal authorization by management to operate.",
   "Operations and maintenance is usually the longest phase. It includes patching, configuration and change management, monitoring, vulnerability management, periodic reassessment, incident response and backup. Every change should go through change control so security is re-evaluated rather than eroded. When requirements change significantly, the lifecycle loops back to earlier stages.",
   "Retirement or disposal ends the lifecycle. Data must be migrated or archived according to retention requirements, media sanitized, licenses and accounts removed, and the system removed from inventory and monitoring. Retirement should be planned rather than improvised, especially for systems that hold sensitive data or have connections to other systems that must be cleanly severed. Security staff should be involved in every phase, not just at deployment."
  ],
  "terms": [
   [
    "Verification",
    "Confirming that a system meets its specified requirements: did we build it right?"
   ],
   [
    "Validation",
    "Confirming that a system meets stakeholders' real needs in its operating environment: did we build the right thing?"
   ],
   [
    "Requirements analysis",
    "Refining stakeholder needs into specific, testable system requirements."
   ],
   [
    "Change management",
    "A formal process for requesting, assessing, approving, implementing and reviewing changes to systems."
   ]
  ],
  "example": "A city builds a parking payment app. Stakeholder interviews produce a requirement to protect card data, which becomes tokenization in the design. Testing verifies tokenization works as specified, and a pilot with real drivers validates the app meets their needs. Years later, the app is retired: payment records are archived per the retention schedule and servers are sanitized.",
  "tip": "Security should be involved from the very first phase. When the exam asks when to address security in a system lifecycle, the answer is at the start, during requirements, not after deployment.",
  "check": [
   [
    "A system passes all tests against its specification but users find it cannot support their daily workflow. Did verification or validation fail?",
    "Validation, because the system meets its specification but not the stakeholders' real needs."
   ],
   [
    "Name two security tasks in the retirement phase.",
    "Any two of: archive or migrate data per retention requirements, sanitize media, remove accounts and licenses, sever interconnections and update the inventory."
   ]
  ]
 },
 {
  "t": "OSI and TCP/IP models and where controls apply",
  "body": [
   "Network models give you a shared map for talking about where a problem or control sits. The CISSP exam uses the seven-layer Open Systems Interconnection (OSI) model heavily, and you should also know how it lines up with the four-layer TCP/IP model used by real networks.",
   "The OSI layers, from bottom to top, are: 1 Physical (bits on the medium: cables, radio, voltage, connectors, hubs), 2 Data Link (frames and MAC addresses on the local network: switches, bridges, ARP, VLAN tagging), 3 Network (packets and logical addressing and routing: IP, ICMP, routers), 4 Transport (end-to-end delivery using segments or datagrams: TCP and UDP, with ports), 5 Session (establishing and managing sessions between applications), 6 Presentation (data formatting, character encoding, compression and, conceptually, encryption) and 7 Application (services the user's application relies on, such as HTTP, DNS, SMTP and FTP). A common mnemonic from the top is 'All People Seem To Need Data Processing'.",
   "The TCP/IP model compresses this into four layers: Network Access or Link (OSI 1 and 2), Internet (OSI 3), Transport (OSI 4) and Application (OSI 5 to 7). Encapsulation is the process by which each layer adds its header as data moves down the stack; the receiver removes them in reverse. TCP is connection-oriented, using a three-way handshake (SYN, SYN-ACK, ACK), sequence numbers and acknowledgments for reliable delivery. UDP is connectionless and lightweight, used where speed matters more than guaranteed delivery, such as DNS queries and streaming media.",
   "Controls map to layers, which helps you choose the right one. At layer 1: physical security of cabling, shielding and wireless signal management. At layer 2: port security, 802.1X port-based network access control, VLANs, dynamic ARP inspection and MACsec. At layer 3: routers with access control lists, packet-filtering firewalls, IPsec and anti-spoofing filters. At layer 4: stateful firewalls tracking connections and port filtering; TLS is often described as operating between layers 4 and 7. At layers 5 to 7: application-level gateways, proxies, web application firewalls, secure email and application authentication.",
   "Attacks map the same way. Wiretapping and jamming hit layer 1. MAC flooding, ARP spoofing and VLAN hopping hit layer 2. IP spoofing and ICMP-based attacks hit layer 3. SYN floods and port scans hit layer 4. Session hijacking sits at layer 5, and injection attacks, phishing and malicious content at layer 7.",
   "In practice, a single product may work at several layers. A next-generation firewall inspects packets at layers 3 and 4 and applications at layer 7. Knowing the layers lets you describe exactly what a control can and cannot see: a layer 3 packet filter cannot tell a legitimate HTTP request from a SQL injection attempt, but a layer 7 web application firewall can."
  ],
  "terms": [
   [
    "OSI model",
    "A seven-layer reference model: Physical, Data Link, Network, Transport, Session, Presentation, Application."
   ],
   [
    "Encapsulation",
    "Wrapping data with each layer's header (and sometimes trailer) as it moves down the stack."
   ],
   [
    "Three-way handshake",
    "The TCP connection setup sequence of SYN, SYN-ACK and ACK."
   ],
   [
    "802.1X",
    "A standard for port-based network access control that authenticates devices before granting network access."
   ]
  ],
  "example": "A security architect protects a web application with layered controls: 802.1X and port security on data center switches (layer 2), router ACLs and anti-spoofing filters (layer 3), a stateful firewall allowing only TCP 443 (layer 4), TLS for encryption, and a web application firewall that blocks injection attempts (layer 7).",
  "tip": "Know which devices and attacks belong to each layer: switches and ARP at 2, routers and IP at 3, TCP/UDP ports at 4, WAFs and proxies at 7. Stateful inspection is primarily a layer 4 capability.",
  "check": [
   [
    "At which OSI layer does ARP spoofing occur?",
    "Layer 2, the Data Link layer, because it abuses the mapping of IP addresses to MAC addresses on the local network."
   ],
   [
    "Which TCP/IP layer corresponds to OSI layers 5, 6 and 7?",
    "The Application layer."
   ]
  ]
 },
 {
  "t": "IPv4/IPv6, secure protocols (TLS, IPsec, SSH, SNMPv3) and their uses",
  "body": [
   "Internet Protocol (IP) addressing and the secure protocols that run over it are the plumbing of every network design question. You need to know how IPv4 and IPv6 differ in security-relevant ways, and which secure protocol fits which job.",
   "IPv4 uses 32-bit addresses written as four decimal numbers, such as 192.168.1.10. Address shortage led to private ranges (10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16) and network address translation (NAT), which lets many internal hosts share public addresses. NAT hides internal addressing but is not a security control by itself. IPv6 uses 128-bit addresses written in hexadecimal, such as 2001:db8::1, removing the shortage. It relies on neighbor discovery instead of ARP, supports stateless address autoconfiguration (SLAAC) and was designed with IPsec support. Security concerns with IPv6 include devices that have it enabled by default without being monitored, tunneling mechanisms that carry IPv6 inside IPv4 past filters, rogue router advertisements and firewalls configured only for IPv4. The practical rule is to secure and monitor IPv6 with the same care as IPv4, or disable it where not used.",
   "Transport Layer Security (TLS) protects application traffic such as HTTPS, secure email and APIs. The handshake authenticates the server (and optionally the client) with certificates, agrees on cipher suites and establishes symmetric session keys, ideally with forward secrecy so past sessions stay safe if a long-term key is later stolen. TLS 1.2 and 1.3 are current; SSL and early TLS versions are deprecated. TLS 1.3 removed many weak options and speeds up the handshake.",
   "IPsec protects traffic at the network layer and is widely used for virtual private networks (VPNs). Its Authentication Header (AH) provides integrity and origin authentication but no encryption; Encapsulating Security Payload (ESP) provides confidentiality plus integrity and is what most deployments use. Internet Key Exchange (IKE) negotiates security associations (SAs), which are one-way agreements on keys and algorithms. Transport mode encrypts only the payload and is used host to host; tunnel mode encrypts the entire original packet inside a new one and is used gateway to gateway for site-to-site VPNs.",
   "Secure Shell (SSH) replaces Telnet, rlogin and similar cleartext tools for remote administration. It also supports secure file transfer (SFTP and SCP) and port forwarding. Use key-based authentication, protect private keys and verify host keys on first connection to prevent on-path attacks.",
   "Simple Network Management Protocol (SNMP) monitors and manages network devices. Versions 1 and 2c authenticate with a community string sent in cleartext, which is effectively a shared password anyone sniffing can read. SNMPv3 adds user-based authentication, integrity and encryption, and should be used wherever SNMP is needed. Default community strings like 'public' and 'private' must be changed or disabled.",
   "Other secure replacements are also tested: HTTPS for HTTP, SFTP or FTPS for FTP, LDAPS for LDAP, DNSSEC for DNS integrity, S/MIME for email security and SRTP for voice media."
  ],
  "terms": [
   [
    "IPsec ESP",
    "Encapsulating Security Payload: the IPsec protocol providing confidentiality, integrity and authentication."
   ],
   [
    "Tunnel mode",
    "An IPsec mode that encrypts the entire original packet and adds a new header, typically used for site-to-site VPNs."
   ],
   [
    "Forward secrecy",
    "A property ensuring that compromise of a long-term key does not expose past session keys."
   ],
   [
    "SNMPv3",
    "The version of SNMP that adds authentication, integrity and encryption, replacing cleartext community strings."
   ],
   [
    "NAT",
    "Network address translation: mapping private internal addresses to public addresses."
   ]
  ],
  "example": "An audit finds network switches managed with SNMPv2c using the community string 'public' and Telnet. The team migrates to SNMPv3 with authentication and privacy enabled, replaces Telnet with SSH using key-based logins, and connects branch offices with IPsec tunnel-mode VPNs.",
  "tip": "AH gives integrity but no confidentiality; ESP gives both. SNMPv1 and v2c send community strings in cleartext; only SNMPv3 is secure. Transport mode is host-to-host, tunnel mode is gateway-to-gateway.",
  "check": [
   [
    "Which IPsec protocol should you choose if you need encryption?",
    "ESP (Encapsulating Security Payload), because AH does not provide confidentiality."
   ],
   [
    "Why can unmanaged IPv6 be a security risk on an IPv4-focused network?",
    "Hosts may communicate over IPv6 paths that firewalls and monitoring do not inspect, allowing traffic to bypass controls."
   ]
  ]
 },
 {
  "t": "Converged protocols: iSCSI, VoIP, InfiniBand, Fibre Channel over Ethernet",
  "body": [
   "Converged protocols carry specialized traffic, such as storage or voice, over standard IP or Ethernet networks instead of dedicated infrastructure. Convergence saves money and simplifies management, but it also means traffic that used to be physically isolated now shares the data network, bringing new security concerns.",
   "Internet Small Computer Systems Interface (iSCSI) carries SCSI storage commands over TCP/IP, letting servers use remote disks in a storage area network (SAN) as if they were local. Security concerns are that storage traffic can be intercepted or spoofed on the IP network. Mitigations include placing iSCSI on a dedicated, isolated VLAN or network, using CHAP authentication between initiators (servers) and targets (storage), and encrypting with IPsec where needed. Access control on the storage side (LUN masking) ensures servers see only their own volumes.",
   "Fibre Channel is a high-speed storage networking technology that traditionally runs on its own dedicated network. Fibre Channel over Ethernet (FCoE) encapsulates Fibre Channel frames directly in Ethernet frames, so it operates at layer 2 and is not routable over IP. It requires lossless Ethernet enhancements. Fibre Channel over IP (FCIP) tunnels Fibre Channel over IP networks to connect distant SANs. Security relies on zoning (controlling which devices can talk to each other), LUN masking and network isolation.",
   "InfiniBand is a high-bandwidth, low-latency interconnect used in high-performance computing clusters and some storage systems. It supports remote direct memory access (RDMA), which lets one system read or write another's memory without involving the remote CPU. That speed also raises security questions: RDMA access must be carefully controlled with partitioning (similar to VLANs) and trusted management, since misconfiguration could expose memory. InfiniBand networks are usually confined to data center fabrics.",
   "Voice over IP (VoIP) carries telephone calls over IP networks. Signaling commonly uses the Session Initiation Protocol (SIP), and media uses the Real-time Transport Protocol (RTP). Threats include eavesdropping on unencrypted calls, caller ID spoofing, toll fraud through compromised phone systems, denial of service that disrupts calls, and vishing (voice phishing). Mitigations include separate voice VLANs, SIP over TLS, Secure RTP (SRTP) for media, strong authentication on phones and private branch exchange (PBX) systems, and quality of service to protect availability. Also remember that emergency calling and power (phones may need power over Ethernet backed by UPS) are availability issues.",
   "Other converged or specialized protocols may appear: Multiprotocol Label Switching (MPLS), which forwards traffic using labels and is used by carriers to build private WAN services, and industrial protocols such as Modbus and DNP3 carried over IP. The shared lesson is to isolate converged traffic, authenticate endpoints and encrypt where the protocol allows."
  ],
  "terms": [
   [
    "iSCSI",
    "A protocol that carries SCSI storage commands over TCP/IP networks."
   ],
   [
    "FCoE",
    "Fibre Channel over Ethernet: Fibre Channel frames encapsulated in Ethernet, operating at layer 2 and not IP-routable."
   ],
   [
    "VoIP",
    "Voice over IP: transmitting voice calls over IP networks, typically using SIP for signaling and RTP for media."
   ],
   [
    "LUN masking",
    "A storage control that limits which hosts can see and access specific logical storage units."
   ]
  ],
  "example": "A company moves to VoIP and iSCSI storage on the same switches. It places phones on a voice VLAN with SIP over TLS and SRTP, isolates iSCSI traffic on a dedicated storage VLAN with CHAP authentication, and applies LUN masking so each server can reach only its own volumes.",
  "tip": "The standard answer for securing converged traffic is isolation (dedicated VLANs or networks) plus authentication and encryption. FCoE runs directly on Ethernet at layer 2 and cannot be routed over IP.",
  "check": [
   [
    "What protects VoIP media streams from eavesdropping?",
    "Secure Real-time Transport Protocol (SRTP), which encrypts and authenticates the RTP media."
   ],
   [
    "How does iSCSI differ from FCoE in terms of routing?",
    "iSCSI runs over TCP/IP and can be routed; FCoE runs directly over Ethernet at layer 2 and is not IP-routable."
   ]
  ]
 },
 {
  "t": "Micro-segmentation, SDN, VXLAN, VPC and software-defined perimeters",
  "body": [
   "Modern networks are increasingly defined in software rather than by physical cabling and hardware boxes. This lets security teams apply policy more precisely and consistently, which is central to zero trust. The exam expects you to understand what each technology does and how it helps limit an attacker's movement.",
   "Traditional segmentation divides a network into zones with VLANs and firewalls, such as separating user workstations from servers. Micro-segmentation goes further, applying security policy down to individual workloads or applications. Each server, virtual machine or container can have its own allowed flows, so a compromised web server cannot freely reach every other system in the same data center. Micro-segmentation is usually enforced by host-based firewalls, hypervisor-level firewalls or cloud security groups, and it is a key defense against lateral movement.",
   "Software-defined networking (SDN) separates the control plane (which decides where traffic should go) from the data plane (which forwards it). A centralized SDN controller programs network devices through southbound interfaces, and applications and orchestration tools talk to the controller through northbound APIs. Benefits include centralized, consistent policy and rapid automated changes. Risks include the controller becoming a single point of failure and a high-value target, so it must be hardened, authenticated, highly available and closely monitored, and its APIs protected. Software-defined WAN (SD-WAN) applies similar ideas to connecting branch sites over multiple links.",
   "Virtual Extensible LAN (VXLAN) is an overlay protocol that encapsulates layer 2 Ethernet frames inside UDP packets, letting virtual layer 2 networks stretch across a layer 3 routed infrastructure. It uses a 24-bit segment identifier, allowing around 16 million segments compared with about 4,000 VLANs, which suits large multi-tenant data centers. VXLAN itself does not provide encryption or strong authentication, so traffic may need protection with IPsec or MACsec, and endpoints must be controlled to prevent injection into overlays.",
   "A virtual private cloud (VPC) is a logically isolated section of a public cloud where a customer defines its own IP ranges, subnets, route tables, gateways and security controls. Security groups (stateful, attached to instances) and network access control lists (usually stateless, attached to subnets) filter traffic. Private subnets without internet gateways, private endpoints to cloud services and flow logs for monitoring are common good practices. Misconfigured route tables or overly open security groups are frequent cloud mistakes.",
   "A software-defined perimeter (SDP) hides applications from unauthorized users entirely. Users and devices must authenticate to a controller first, and only then is a connection brokered to the specific application they are authorized for. Until then, the application is effectively invisible, sometimes called a 'dark cloud'. SDP is a foundation of zero trust network access (ZTNA) and increasingly replaces broad-access VPNs."
  ],
  "terms": [
   [
    "Micro-segmentation",
    "Applying fine-grained security policy to individual workloads to restrict lateral movement."
   ],
   [
    "Software-defined networking (SDN)",
    "An architecture that separates the control plane from the data plane and centralizes control in software."
   ],
   [
    "VXLAN",
    "An overlay protocol that encapsulates layer 2 frames in UDP to extend virtual networks across layer 3 infrastructure."
   ],
   [
    "Virtual private cloud (VPC)",
    "A logically isolated, customer-controlled network within a public cloud."
   ],
   [
    "Software-defined perimeter (SDP)",
    "An approach that authenticates users and devices before revealing or connecting them to specific applications."
   ]
  ],
  "example": "After a breach in which malware spread from one server to many, a company applies micro-segmentation so web servers may talk only to their application servers on one port, and application servers only to their database. It also replaces its VPN with an SDP-based access service so contractors see only the one application they support.",
  "tip": "Micro-segmentation and SDP both support zero trust by limiting lateral movement and hiding resources. In SDN, the controller is the crown jewel: protect it and its APIs.",
  "check": [
   [
    "What is the main security benefit of micro-segmentation?",
    "It limits lateral movement, so compromising one workload does not give access to others."
   ],
   [
    "Which SDN component is the most critical to protect, and why?",
    "The SDN controller, because it programs the entire network; compromise or failure affects all traffic."
   ]
  ]
 },
 {
  "t": "Wireless networks: Wi-Fi security (WPA3), Bluetooth, Zigbee, cellular/5G",
  "body": [
   "Wireless networks broadcast into the air, so anyone within range can listen or try to connect. That makes authentication and encryption essential and physical boundaries less meaningful. The CISSP outline covers Wi-Fi, Bluetooth, Zigbee and cellular networks, each with its own risks.",
   "Wi-Fi is based on the IEEE 802.11 standards. Security has evolved through several generations. Wired Equivalent Privacy (WEP) is broken and must not be used. WPA (Wi-Fi Protected Access) with TKIP was an interim fix and is also deprecated. WPA2 uses AES in CCMP mode and remains widely deployed. WPA3 is current: WPA3-Personal replaces the pre-shared key handshake with Simultaneous Authentication of Equals (SAE), which resists offline dictionary attacks against captured handshakes and provides forward secrecy. WPA3-Enterprise offers an optional higher-strength mode for sensitive environments. Enhanced Open (Opportunistic Wireless Encryption) provides encryption on open networks without a password, though not authentication.",
   "Personal (pre-shared key) mode uses one shared passphrase, which is hard to revoke when someone leaves. Enterprise mode uses 802.1X with a RADIUS server and an Extensible Authentication Protocol (EAP) method, giving each user individual credentials. EAP-TLS, which uses certificates on both client and server, is the strongest common method; PEAP and EAP-TTLS protect password-based logins inside a TLS tunnel. Clients should be configured to validate the server certificate, or they can be tricked by an evil twin.",
   "Common Wi-Fi threats include rogue access points (unauthorized APs connected to the network), evil twins (attacker APs impersonating a legitimate network to capture credentials), deauthentication attacks that disconnect clients, jamming and war driving to find networks. Defenses include WPA3 or WPA2-Enterprise, wireless intrusion prevention systems, site surveys, careful antenna placement and power settings, protected management frames (required in WPA3), and user training. Hiding the SSID and MAC filtering are weak controls because both are easily bypassed.",
   "Bluetooth is a short-range personal area network technology. Threats include bluejacking (sending unsolicited messages), bluesnarfing (unauthorized data theft) and bluebugging (taking control of a device). Keep devices non-discoverable when not pairing, use secure pairing modes, patch firmware and disable Bluetooth when not needed. Zigbee is a low-power mesh protocol for IoT and building automation based on IEEE 802.15.4. It uses AES-based encryption, but security depends on key management; default or poorly distributed network keys weaken it.",
   "Cellular networks, including 4G LTE and 5G, provide wide-area connectivity. 5G improves on earlier generations, for example by encrypting the permanent subscriber identifier to hinder tracking by fake base stations, and supports network slicing, where logical networks share infrastructure. Risks include rogue base stations (IMSI catchers), SIM swapping and reliance on carrier security. Organizations using cellular for IoT or private 5G should apply the same segmentation and monitoring as any other network."
  ],
  "terms": [
   [
    "WPA3",
    "The current Wi-Fi security standard, using SAE for personal mode and requiring protected management frames."
   ],
   [
    "SAE",
    "Simultaneous Authentication of Equals: a WPA3 key exchange that resists offline dictionary attacks."
   ],
   [
    "Evil twin",
    "A rogue access point that impersonates a legitimate network to intercept traffic or credentials."
   ],
   [
    "EAP-TLS",
    "An 802.1X authentication method that uses certificates on both client and server."
   ],
   [
    "Bluesnarfing",
    "Unauthorized access to data on a device through Bluetooth."
   ]
  ],
  "example": "A hospital replaces its shared-password Wi-Fi with WPA3-Enterprise using EAP-TLS, issuing device certificates through its management system. A wireless intrusion prevention system alerts when an access point broadcasting the hospital's network name appears in the parking garage, which security identifies as an evil twin.",
  "tip": "For the strongest enterprise Wi-Fi answer, choose WPA3-Enterprise (or WPA2-Enterprise) with 802.1X and EAP-TLS. SSID hiding and MAC filtering are not real security controls.",
  "check": [
   [
    "What WPA3 feature protects personal networks from offline dictionary attacks on captured handshakes?",
    "Simultaneous Authentication of Equals (SAE)."
   ],
   [
    "Why is enterprise mode preferred over a pre-shared key for a large organization?",
    "Each user authenticates individually through 802.1X, so access can be revoked per user and activity attributed, rather than sharing one passphrase."
   ]
  ]
 },
 {
  "t": "Content distribution networks and traffic flows (north-south, east-west)",
  "body": [
   "Where traffic comes from and where it goes shapes where you place controls. This topic pairs two ideas: content distribution networks, which move content closer to users, and traffic flow directions, which describe how data moves into, out of and within data centers.",
   "A content distribution network (CDN), also called a content delivery network, is a geographically distributed set of servers, called edge servers or points of presence, that cache and serve content near users. Instead of every request traveling to the origin server, users reach a nearby edge, which reduces latency and load on the origin. CDNs serve static content like images and scripts, streaming media and increasingly dynamic content and APIs.",
   "CDNs bring security benefits. Their enormous, distributed capacity absorbs volumetric distributed denial-of-service (DDoS) attacks that would overwhelm a single site. Many provide web application firewalls, bot management, TLS termination at the edge and rate limiting. Hiding the origin server's real address behind the CDN reduces direct attacks, provided the origin accepts traffic only from the CDN.",
   "CDNs also bring risks. TLS is often terminated at the edge, so the CDN provider can see plaintext traffic, which is a trust and compliance consideration; traffic from the edge to the origin should be encrypted too. Caching misconfiguration can expose private content or allow cache poisoning. Third-party scripts loaded from CDNs can be tampered with, which subresource integrity checks help detect. The CDN becomes a supply chain dependency whose outage affects your availability. Contracts, logging access and understanding where data is cached matter for privacy and data location requirements.",
   "Traffic flow directions describe data center and cloud traffic. North-south traffic moves between the data center (or cloud environment) and the outside world, such as users on the internet reaching a web server, or servers calling external services. Traditional perimeter defenses, including edge firewalls, intrusion prevention, DDoS protection and web gateways, focus on north-south traffic. East-west traffic moves laterally between systems inside the data center, such as a web server querying an application server or database, or between virtual machines and containers.",
   "Modern applications generate far more east-west than north-south traffic, and attackers who breach the perimeter move east-west to reach valuable targets. Perimeter controls do not see this traffic. Securing east-west flows requires internal segmentation, micro-segmentation, distributed or host-based firewalls, internal encryption such as mutual TLS between services, and monitoring of internal flows with network detection tools. This shift is a major driver of zero trust architecture."
  ],
  "terms": [
   [
    "Content distribution network (CDN)",
    "A distributed network of edge servers that caches and delivers content close to users."
   ],
   [
    "North-south traffic",
    "Traffic entering or leaving a data center or cloud environment."
   ],
   [
    "East-west traffic",
    "Traffic moving laterally between systems within a data center or cloud environment."
   ],
   [
    "Origin server",
    "The authoritative server that holds the original content a CDN caches and delivers."
   ]
  ],
  "example": "An online retailer serves its site through a CDN that absorbs a large DDoS attack during a sale, while its origin accepts connections only from the CDN's address ranges. Internally, it adds micro-segmentation and mutual TLS so that if an attacker compromises the web tier, east-west movement to the payment database is blocked and logged.",
  "tip": "Perimeter firewalls mainly handle north-south traffic. When a question asks how to stop lateral movement, look for controls on east-west traffic such as micro-segmentation and internal monitoring.",
  "check": [
   [
    "Why does a CDN help defend against volumetric DDoS attacks?",
    "Its large, distributed capacity absorbs and filters attack traffic across many edge locations before it reaches the origin."
   ],
   [
    "Traffic from an application server to a database server in the same data center is which direction?",
    "East-west."
   ]
  ]
 },
 {
  "t": "Network components: firewalls, IDS/IPS, NAC, proxies, transmission media, endpoint security",
  "body": [
   "Network components are the building blocks of network defense. The exam expects you to know what each can see, where it belongs and how they differ, so you can pick the right one for a scenario.",
   "Firewalls filter traffic based on rules. Packet-filtering (static) firewalls check each packet's addresses, ports and protocol at layers 3 and 4, with no memory of prior packets. Stateful inspection firewalls track connection state, allowing return traffic only for sessions that were legitimately opened. Application-level gateways (proxy firewalls) understand specific application protocols and inspect content at layer 7. Circuit-level gateways, such as SOCKS, validate sessions without inspecting content. Next-generation firewalls combine stateful inspection with application awareness, user identity, intrusion prevention and threat intelligence. Web application firewalls protect web apps from attacks like injection. Firewalls are commonly arranged to create a screened subnet (formerly called a DMZ) for public-facing servers.",
   "Intrusion detection systems (IDS) monitor and alert; intrusion prevention systems (IPS) sit inline and can block. Network-based versions (NIDS/NIPS) watch traffic; host-based versions (HIDS/HIPS) watch a single system's activity and files. Detection methods include signature-based (matches known patterns, few false positives but misses new attacks) and anomaly or behavior-based (compares against a baseline, can catch novel attacks but produces more false positives). Tuning is essential to balance false positives against false negatives.",
   "Network access control (NAC) checks devices before and during network access. It can authenticate the user and device (often through 802.1X), assess posture such as patch level and antivirus status, and then allow, deny or quarantine to a remediation network. Pre-admission NAC checks before connection; post-admission monitors continuously.",
   "Proxies act as intermediaries. A forward proxy represents internal clients going out to the internet, enabling content filtering, caching and logging. A reverse proxy sits in front of servers, handling incoming requests, load balancing, TLS termination and shielding the servers. Transparent proxies intercept without client configuration.",
   "Transmission media affects security. Twisted pair copper is common but emits signals and can be tapped; shielded twisted pair reduces interference. Coaxial cable is more resistant to interference. Fiber optic cable does not emit electromagnetic signals, resists interference and is much harder to tap undetected, making it the most secure wired choice, and it supports long distances. Wireless media is the easiest to intercept. Physical protection of cabling, such as conduits and locked pathways, matters too.",
   "Endpoint security protects the devices at the edge: antimalware, endpoint detection and response (EDR) that records activity and supports investigation, host firewalls, application allow-listing, disk encryption, patch management and mobile device management. Since users and data now live outside the traditional perimeter, endpoints are often the front line."
  ],
  "terms": [
   [
    "Stateful inspection firewall",
    "A firewall that tracks the state of connections and allows traffic matching established sessions."
   ],
   [
    "IPS",
    "Intrusion prevention system: an inline device or software that detects and blocks malicious traffic."
   ],
   [
    "Network access control (NAC)",
    "Technology that authenticates and checks the posture of devices before and during network access."
   ],
   [
    "Reverse proxy",
    "A server that receives client requests on behalf of back-end servers, providing load balancing, TLS termination and protection."
   ],
   [
    "EDR",
    "Endpoint detection and response: tools that monitor endpoint activity to detect, investigate and respond to threats."
   ]
  ],
  "example": "A university deploys NAC so student laptops without current patches land in a remediation VLAN. A next-generation firewall protects the campus edge, a reverse proxy with a web application firewall fronts the student portal, and EDR on staff laptops detects a malicious script and isolates the machine automatically.",
  "tip": "IDS detects and alerts; IPS is inline and blocks. Signature-based detection misses zero-day attacks; anomaly-based detection catches novel behavior but has more false positives. Fiber is the most secure transmission medium against tapping and interference.",
  "check": [
   [
    "Which firewall type can inspect the contents of an HTTP request for an injection attack?",
    "An application-level gateway or web application firewall, which inspects at layer 7."
   ],
   [
    "What does NAC do when a device fails its posture check?",
    "It can deny access or place the device in a quarantine or remediation network until it complies."
   ]
  ]
 },
 {
  "t": "Secure communication channels: voice, video, remote access, data communications, third-party connectivity",
  "body": [
   "Organizations communicate through many channels, and each can leak data or let attackers in. The CISSP outline asks you to implement secure communication channels according to design, covering voice, video and collaboration, remote access, data communications and connections with third parties.",
   "Voice channels include traditional phone lines, private branch exchange (PBX) systems and VoIP. Risks include eavesdropping, toll fraud (attackers using your phone system to place expensive calls), caller ID spoofing and social engineering over the phone. Secure the PBX with strong administrative credentials, disable unused features such as remote access through direct inward system access, monitor call records for anomalies and encrypt VoIP signaling and media. Train staff to verify callers through a known number rather than trusting caller ID.",
   "Video and collaboration tools, such as conferencing and messaging platforms, carry sensitive discussions, screen shares and files. Controls include requiring authentication to join, waiting rooms or lobbies, meeting passcodes, host controls over screen sharing and recording, end-to-end encryption where appropriate, and policies about recording and retention. Uninvited participants disrupting meetings, leaked recordings and sensitive data posted in chat are common problems.",
   "Remote access lets users reach internal resources from elsewhere. Options include VPNs (IPsec or TLS-based), remote desktop services, and zero trust network access that grants access per application. Key controls are multifactor authentication, device posture checks, least privilege, encryption, session timeouts, and logging. Avoid exposing remote desktop directly to the internet. Split tunneling, where only corporate traffic uses the VPN while other traffic goes directly to the internet, improves performance but reduces visibility; full tunneling sends everything through corporate controls. Remote access authentication often uses RADIUS or TACACS+; TACACS+ encrypts the entire payload and separates authentication, authorization and accounting, while RADIUS encrypts only the password.",
   "Data communications include file transfers, APIs, email and backup replication. Use encrypted protocols such as SFTP, FTPS, HTTPS and TLS for email, authenticate both endpoints for machine-to-machine links (for example with mutual TLS or signed tokens), validate data integrity and monitor for unusual transfers. Email security adds SPF, DKIM and DMARC to reduce spoofing.",
   "Third-party connectivity links your network to partners, vendors, managed service providers and cloud services. Each connection is a potential path in, as many breaches through vendors have shown. Governance should include an interconnection security agreement or similar document defining the technical requirements, a memorandum of understanding or contract defining responsibilities, and risk assessment of the partner. Technically, restrict the connection to the minimum systems and ports, place it in a segmented zone, require MFA for vendor accounts, enable access only when needed and monitor all activity."
  ],
  "terms": [
   [
    "Toll fraud",
    "Unauthorized use of an organization's phone system to place calls, often to premium or international numbers."
   ],
   [
    "Split tunneling",
    "A VPN configuration that sends only corporate traffic through the tunnel while other traffic goes directly to the internet."
   ],
   [
    "TACACS+",
    "A remote authentication protocol that encrypts the full payload and separates authentication, authorization and accounting."
   ],
   [
    "Interconnection security agreement (ISA)",
    "A document specifying the technical security requirements for a connection between two organizations' systems."
   ]
  ],
  "example": "A managed service provider needs to support a client's servers. Instead of a permanent VPN, the client grants access through a zero trust gateway that requires MFA, allows connections only to the specific servers under contract, activates access only during approved maintenance windows and records every session.",
  "tip": "For remote access, the exam's best answers include MFA, encryption and least privilege. TACACS+ encrypts the whole payload; RADIUS encrypts only the password. Third-party connections need both contractual (ISA, contract) and technical (segmentation, monitoring) controls.",
  "check": [
   [
    "What is the security trade-off of split tunneling?",
    "It improves performance, but internet traffic bypasses corporate security controls and monitoring, reducing visibility and protection."
   ],
   [
    "Why should vendor remote access be enabled only when needed?",
    "Standing access creates a persistent entry point that attackers can abuse if vendor credentials or systems are compromised."
   ]
  ]
 },
 {
  "t": "Network attacks and mitigations: DDoS, spoofing, on-path, DNS attacks",
  "body": [
   "Recognizing network attacks by their symptoms and matching them to effective mitigations is a core CISSP skill. The goal here is defensive understanding: what the attack does, what it looks like and how to stop or limit it.",
   "A denial-of-service (DoS) attack tries to make a service unavailable; a distributed denial-of-service (DDoS) attack uses many sources, often a botnet of compromised devices. Categories include volumetric attacks that saturate bandwidth, protocol attacks that exhaust state tables in servers or firewalls (such as a SYN flood, which sends many connection requests without completing the handshake) and application-layer attacks that send expensive, legitimate-looking requests. Amplification and reflection attacks spoof the victim's address in small requests to services like open DNS resolvers or NTP servers, which send much larger responses to the victim. Mitigations include upstream scrubbing services and CDNs, rate limiting, SYN cookies, filtering spoofed traffic, closing open resolvers and reflectors, overprovisioning and a DDoS response plan with your internet provider.",
   "Spoofing means falsifying an identity. IP spoofing forges the source address, enabling reflection attacks and bypassing weak address-based trust. Ingress filtering (drop inbound packets claiming internal addresses) and egress filtering (drop outbound packets with non-internal sources), as described in BCP 38, reduce it. MAC spoofing defeats MAC filtering, and ARP spoofing sends false ARP replies to redirect local traffic; dynamic ARP inspection and port security help. Email spoofing is countered with SPF, DKIM and DMARC.",
   "On-path attacks, traditionally called man-in-the-middle, put the attacker between communicating parties to eavesdrop or alter traffic. They are often enabled by ARP spoofing, DNS manipulation, rogue access points or SSL stripping, which downgrades a user's HTTPS connection to HTTP. Defenses include encryption with proper certificate validation, HTTP Strict Transport Security (HSTS), mutual authentication, 802.1X and secure wireless configurations.",
   "DNS attacks target the name system that nearly everything depends on. DNS cache poisoning inserts false records into a resolver's cache, sending users to attacker-controlled addresses. DNS Security Extensions (DNSSEC) add digital signatures so resolvers can verify responses are authentic and unaltered, though DNSSEC does not encrypt queries. DNS over HTTPS and DNS over TLS provide query confidentiality. Other DNS threats include domain hijacking through compromised registrar accounts (use registrar locks and MFA), typosquatting, DNS tunneling to exfiltrate data or carry command-and-control traffic (detect with DNS monitoring for unusual query volume and long encoded names), and DDoS against DNS servers (use anycast and redundant providers).",
   "Across all of these, monitoring is essential: flow data, IDS/IPS alerts, DNS logs and baselines of normal traffic let you spot anomalies early. Incident response plans should include network-attack playbooks and contacts at your providers."
  ],
  "terms": [
   [
    "SYN flood",
    "A DoS attack that sends many TCP SYN requests without completing handshakes, exhausting server connection resources."
   ],
   [
    "Amplification attack",
    "A DDoS technique that sends small spoofed requests to services that reply with much larger responses to the victim."
   ],
   [
    "DNS cache poisoning",
    "Inserting forged records into a DNS resolver's cache to redirect users."
   ],
   [
    "DNSSEC",
    "DNS Security Extensions, which digitally sign DNS records to provide origin authentication and integrity."
   ],
   [
    "Ingress/egress filtering",
    "Dropping packets with source addresses that should not appear on a given side of the network border."
   ]
  ],
  "example": "A company's network team notices unusually long, random-looking subdomain queries leaving one workstation to a single external domain. DNS monitoring flags it as possible DNS tunneling, the host is isolated and investigated, and the company restricts internal hosts to its own resolvers, which log and filter queries.",
  "tip": "DNSSEC provides integrity and authenticity for DNS records, not confidentiality. SYN cookies mitigate SYN floods; ingress and egress filtering reduce IP spoofing; HSTS defends against SSL stripping.",
  "check": [
   [
    "What does DNSSEC protect against, and what does it not provide?",
    "It protects against forged or altered DNS responses such as cache poisoning; it does not encrypt DNS queries."
   ],
   [
    "Why are open DNS resolvers a DDoS concern even for organizations that are not the target?",
    "Attackers can use them as reflectors in amplification attacks, sending spoofed queries that cause large responses to flood a victim."
   ]
  ]
 },
 {
  "t": "Monitoring and management: network observability, capacity, logging",
  "body": [
   "You cannot protect a network you cannot see. Monitoring and management is the discipline of continuously collecting data about what the network is doing, deciding whether that behavior is normal, and keeping the infrastructure healthy enough to deliver the availability the business needs. For the CISSP exam this topic sits at the point where security meets operations: the same telemetry that tells a network team a link is saturated also tells a security team that a host is exfiltrating data at 3 a.m.",
   "Network observability goes beyond simple up/down monitoring. Traditional monitoring asks known questions (is the router reachable, is the interface error count rising). Observability means collecting rich enough data that you can answer questions you did not anticipate. The main sources are device logs sent over syslog; performance counters polled with SNMP (Simple Network Management Protocol), where SNMPv3 should be used because it adds authentication and encryption that v1 and v2c lack; flow records such as NetFlow or IPFIX, which summarize who talked to whom, on which ports, and how much; and full packet capture, which is the most detailed and the most expensive to store. Flow data is often the sweet spot for security: it is compact, it covers encrypted traffic by showing endpoints and volumes, and it reveals beaconing, lateral movement and large outbound transfers.",
   "Capacity management keeps availability, the A in the CIA triad, from quietly eroding. By trending bandwidth, CPU, memory, session tables and storage over time, you establish a baseline and can forecast when a resource will run out. A baseline also has a security use: a sudden deviation from normal volume may be a denial-of-service attack, a misconfiguration or malware rather than organic growth. Capacity planning should include headroom for failover, because a redundant pair running at 70 percent each cannot absorb the load if one member fails.",
   "Logging turns events into evidence. Good practice is to send logs off the device to a central, hardened collector as soon as possible so that an attacker who compromises a device cannot simply erase its history. Synchronize every device to a reliable time source using NTP (Network Time Protocol); without consistent timestamps you cannot correlate events across systems or build a credible timeline for an investigation. Protect log integrity with restricted access, write-once or append-only storage, and hashing where required, and set a retention period that satisfies legal, regulatory and investigative needs. Logs also contain sensitive data, so they need their own confidentiality controls.",
   "Management traffic itself must be protected. Put device administration on a separate out-of-band network or a dedicated management VLAN, require encrypted protocols such as SSH and HTTPS instead of Telnet and HTTP, use centralized authentication (for example TACACS+) so every administrative command is attributed to a person, and restrict which hosts may reach management interfaces. The exam likes to ask what to do first: usually the answer is to establish visibility and a baseline before tuning alerts or buying new tools."
  ],
  "terms": [
   [
    "NetFlow / IPFIX",
    "Flow-record formats that summarize network conversations (source, destination, ports, protocol, byte and packet counts) without storing payloads."
   ],
   [
    "SNMPv3",
    "The version of the Simple Network Management Protocol that adds user-based authentication and encryption, replacing insecure community strings."
   ],
   [
    "Baseline",
    "A measured picture of normal behavior or performance used to detect anomalies and plan capacity."
   ],
   [
    "Out-of-band management",
    "Administering network devices over a separate, dedicated path so management traffic is isolated from production traffic."
   ],
   [
    "NTP",
    "Network Time Protocol, used to synchronize clocks so logs from different systems can be correlated accurately."
   ]
  ],
  "example": "A company's flow collector shows a workstation sending about 2 GB to an unfamiliar external address every night at 2 a.m. The traffic is encrypted, so packet inspection shows nothing useful, but the flow records reveal the pattern, the volume and the destination. Because all devices are NTP-synchronized and send syslog to a central server, the analyst quickly matches the transfers to a scheduled task created the same day a phishing email was opened.",
  "tip": "Know which data source answers which question: flow data shows who talked to whom and how much, packet capture shows content, SNMP shows device health, and syslog shows events. Also remember SNMPv3 is the secure choice and that time synchronization is a prerequisite for meaningful log correlation.",
  "check": [
   [
    "Why is flow data valuable even when most traffic is encrypted?",
    "Flow records capture metadata such as endpoints, ports, timing and volume, which reveal patterns like beaconing or bulk exfiltration without needing to decrypt payloads."
   ],
   [
    "Why should logs be forwarded to a central collector quickly?",
    "So an attacker who compromises a device cannot delete or alter its local logs, and so events from many systems can be correlated in one place."
   ],
   [
    "What is the security benefit of capacity baselining?",
    "A baseline defines normal, so sudden deviations in traffic or resource use can be flagged as possible attacks or misconfigurations rather than growth."
   ]
  ]
 },
 {
  "t": "Controlling physical and logical access to information, systems, devices, facilities and applications",
  "body": [
   "Access control is the heart of Domain 5 and, in many ways, of security itself. Its purpose is to ensure that only authorized subjects can reach objects, and only in the ways they are permitted. A subject is an active entity such as a user, process or device that requests access; an object is the passive resource being accessed, such as a file, database, server, room or application. Every access decision answers the same question: may this subject perform this action on this object right now?",
   "The CISSP outline asks you to think about access across five kinds of assets. Information is the data itself, wherever it lives. Systems are servers, operating systems and platforms. Devices include laptops, phones, IoT sensors and network equipment. Facilities are buildings, data centers and rooms. Applications are the software that processes data. The same principles apply to all of them even though the mechanisms differ: a badge reader and a turnstile protect a data hall, while file permissions and database grants protect records.",
   "Physical access controls include fences, gates, locks, mantraps (access control vestibules that let one person through at a time), badge systems, guards, and CCTV. Logical (technical) access controls include passwords, tokens, certificates, access control lists, firewalls and encryption. The two are interdependent: an attacker with unsupervised physical access to a server can often bypass logical controls by booting from external media or removing the drive, which is why data centers combine locked racks, full-disk encryption and monitored entry.",
   "Controls are also classified by type and function. Types are administrative (policies, procedures, training, background checks), technical or logical (software and hardware mechanisms) and physical (tangible barriers). Functions are preventive (stop the event), detective (identify it), corrective (fix the damage), deterrent (discourage attempts), recovery (restore operations), directive (tell people what to do) and compensating (an alternative when the primary control is not feasible). A single control can be described on both axes: a security guard is a physical control that can be deterrent, preventive and detective.",
   "Several principles guide design. Least privilege grants the minimum access needed for a task. Need to know further limits access to information required for a specific duty even when someone holds sufficient clearance. Defense in depth layers physical, technical and administrative controls so one failure does not expose the asset. Default deny means anything not explicitly permitted is blocked. Finally, access control must be managed over time: rights granted for a project should be removed when it ends, and reviews confirm that what people hold still matches what they need."
  ],
  "terms": [
   [
    "Subject",
    "An active entity, such as a user, process or device, that requests access to an object."
   ],
   [
    "Object",
    "A passive resource, such as a file, system, room or application, that a subject wants to access."
   ],
   [
    "Access control vestibule (mantrap)",
    "A small space with two interlocking doors that allows only one authenticated person through at a time, preventing tailgating."
   ],
   [
    "Compensating control",
    "An alternative control used when a primary control is impractical, providing a similar level of protection."
   ],
   [
    "Default deny",
    "A stance in which access is blocked unless explicitly permitted."
   ]
  ],
  "example": "A hospital protects its pharmacy records with role-based application permissions, but also puts the medication room behind a badge reader and camera, and logs every dispense. When an auditor finds a shared pharmacy workstation that cannot enforce individual logins, the hospital adds a compensating control: a badge-tap sign-in plus daily review of dispense logs by a supervisor.",
  "tip": "Expect questions that ask you to classify a control by both type (administrative, technical, physical) and function (preventive, detective, corrective and so on). Read carefully: a camera that is monitored live is detective, while a visible dummy camera is only a deterrent.",
  "check": [
   [
    "In an access request, which is the subject and which is the object when a backup service reads a database?",
    "The backup service (a process) is the subject because it actively requests access; the database is the object because it is the passive resource."
   ],
   [
    "Why must physical and logical access controls be designed together?",
    "Physical access can bypass logical controls, for example by removing a disk or booting from external media, so each layer must support the other."
   ],
   [
    "What is the difference between least privilege and need to know?",
    "Least privilege limits the rights and permissions granted to the minimum needed; need to know limits access to specific information to what a duty requires, even for someone with a sufficient clearance."
   ]
  ]
 },
 {
  "t": "Identification, authentication and authorization; MFA and passwordless",
  "body": [
   "Access control follows a sequence that the exam expects you to know cold. Identification is the subject claiming an identity, such as typing a username or presenting a badge. Authentication is proving that claim. Authorization is deciding what the authenticated subject may do. Accountability, which relies on auditing, ties actions back to the individual. Together these are often summarized as IAAA. If identities are shared, accountability collapses, because you can no longer tell who did what.",
   "Authentication factors fall into categories. Something you know is a password, passphrase or PIN. Something you have is a smart card, hardware token, or a phone running an authenticator app. Something you are is a biometric such as a fingerprint, face or iris. Some references add somewhere you are (location) and something you do (behavioral traits like typing rhythm), but these are usually treated as contextual signals rather than primary factors. Multifactor authentication (MFA) requires factors from two or more different categories. A password plus a security question is still single-factor, because both are something you know.",
   "Not all second factors are equally strong. One-time codes sent by SMS can be intercepted through SIM swapping or relayed by a phishing site. Time-based one-time passwords (TOTP) from an app are better but can still be phished in real time. Push approvals can be abused through fatigue attacks, where an attacker spams prompts until the user taps approve; number matching reduces this. Phishing-resistant methods bind authentication to the legitimate site cryptographically, which is the key property of FIDO2 and smart-card based approaches.",
   "Passwordless authentication removes the shared secret entirely. With FIDO2, which combines the W3C WebAuthn standard and the CTAP protocol, the user's authenticator generates a unique public-private key pair for each website. The site stores only the public key. At login the site sends a challenge, the authenticator signs it with the private key after the user unlocks it locally with a PIN or biometric, and the site verifies the signature. Passkeys are FIDO credentials that can be synchronized across a user's devices. Because the credential is scoped to the site's origin, a lookalike phishing domain cannot obtain a valid signature, and because the server holds no reusable secret, a database breach exposes nothing an attacker can replay.",
   "Where passwords remain, current guidance favors length over forced complexity, screening new passwords against lists of known-compromised values, and avoiding routine forced expiration unless there is evidence of compromise. Store passwords only as salted, slow hashes using algorithms designed for the purpose, never in plaintext or with fast general-purpose hashes. Authorization then applies the access model covered in later lessons, and every step is logged for accountability."
  ],
  "terms": [
   [
    "Identification",
    "Claiming an identity, such as entering a username; it proves nothing by itself."
   ],
   [
    "Authentication",
    "Verifying a claimed identity using one or more factors."
   ],
   [
    "Authorization",
    "Determining what an authenticated subject is permitted to do."
   ],
   [
    "Multifactor authentication (MFA)",
    "Authentication that requires factors from at least two different categories: know, have, are."
   ],
   [
    "FIDO2 / passkey",
    "A passwordless standard using per-site public-key credentials unlocked locally, which resists phishing and server-side credential theft."
   ]
  ],
  "example": "An employee receives a convincing email linking to a fake sign-in page. Colleagues using SMS codes type both password and code into the fake page, and the attacker relays them to the real site within seconds. The employee using a security key is unaffected: the key sees that the requesting origin is not the real domain and never produces a valid signature.",
  "tip": "Two items from the same category are not MFA. Also know the order: identification comes before authentication, which comes before authorization, and accountability depends on unique identities plus auditing.",
  "check": [
   [
    "Is a PIN combined with a password multifactor authentication?",
    "No. Both are something you know, so it is single-factor authentication with two secrets."
   ],
   [
    "Why is FIDO2 considered phishing-resistant?",
    "The credential is bound to the legitimate site's origin and the authenticator signs a challenge only for that origin, so a lookalike site cannot obtain a usable response."
   ],
   [
    "What does accountability require?",
    "Unique identification of each subject plus logging and auditing so actions can be traced to an individual."
   ]
  ]
 },
 {
  "t": "Identity management implementation: groups, roles, AAA, session management, registration and proofing",
  "body": [
   "Identity management is the machinery that creates, maintains and retires digital identities and connects them to access. Doing it well means every person and service has exactly one trustworthy identity, gets access through manageable structures rather than one-off grants, and is tracked from the moment they log in until they log out.",
   "It starts with registration and identity proofing. Registration creates the account; proofing establishes that the person behind it is who they claim to be. Proofing strength should match risk. For a newsletter, an email confirmation is enough. For a payroll system or a government benefit, you might verify official documents, compare a live photo to an ID, check records with an authoritative source, or require an in-person visit. NIST SP 800-63 describes this with identity assurance levels (IAL), authenticator assurance levels (AAL) and federation assurance levels (FAL), a vocabulary worth recognizing. Weak proofing undermines everything downstream: strong MFA on an account created for an impostor still protects the impostor.",
   "Groups and roles make access manageable. A group is a collection of accounts, often mirroring a department or project, to which permissions can be assigned once. A role represents a job function and the set of permissions that function needs; users are assigned to roles, and the permissions follow. The practical rule is to grant permissions to groups or roles, never directly to individual accounts, so that when someone changes jobs you change their membership rather than hunting down scattered rights. Watch for role explosion, where too many narrowly defined roles become as hard to manage as individual grants.",
   "AAA stands for authentication, authorization and accounting. Centralized AAA servers, typically using RADIUS or TACACS+, let network devices, VPNs and wireless controllers hand off these decisions to one policy point. Accounting records who connected, when, for how long and, with TACACS+, which commands they ran. This gives consistent policy and a single audit trail rather than local accounts on every device.",
   "Session management protects the period after authentication. A session identifier or token represents the logged-in user, so it must be long, random, transmitted only over encrypted channels, protected with cookie flags such as Secure and HttpOnly, and regenerated after login to prevent session fixation. Sessions should end on logout and time out after inactivity and after an absolute maximum duration, with shorter limits for privileged sessions. Sensitive actions can require reauthentication. Screen locks on workstations are the physical-world equivalent. The goal is to limit how long a stolen or abandoned session remains useful."
  ],
  "terms": [
   [
    "Identity proofing",
    "Verifying that a person is who they claim to be before issuing credentials, with rigor proportional to risk."
   ],
   [
    "AAA",
    "Authentication, authorization and accounting, usually provided centrally by RADIUS or TACACS+."
   ],
   [
    "Role",
    "A named set of permissions representing a job function, assigned to users who perform that function."
   ],
   [
    "Session fixation",
    "An attack in which an attacker sets a known session ID for a victim and then uses it after the victim logs in; prevented by issuing a new ID at login."
   ],
   [
    "Session timeout",
    "Automatic termination of a session after inactivity or a maximum duration to limit misuse of unattended or stolen sessions."
   ]
  ],
  "example": "A bank lets customers open accounts online. Instead of trusting a typed name, it checks a government ID photo against a live selfie and verifies the address with a credit bureau. Once enrolled, the customer's web session expires after a short period of inactivity, and moving money to a new payee requires reauthentication even inside an active session.",
  "tip": "If a question asks how to make access easier to manage and audit as people change jobs, the answer is to assign permissions to groups or roles, not individuals. For sessions, remember: random IDs, regenerate at login, encrypt in transit, and time out.",
  "check": [
   [
    "Why does identity proofing matter even when strong MFA is used?",
    "MFA only proves possession of the enrolled authenticators; if the account was registered to an impostor, MFA faithfully authenticates the impostor."
   ],
   [
    "What does the accounting part of AAA provide?",
    "A record of who accessed what, when and for how long, supporting auditing, billing and investigations."
   ],
   [
    "Name two controls that reduce the risk of a stolen session token.",
    "Short inactivity and absolute timeouts, regenerating the session ID after login, Secure and HttpOnly cookie flags, and requiring reauthentication for sensitive actions."
   ]
  ]
 },
 {
  "t": "Federated identity with third parties: SAML, OAuth 2.0, OIDC",
  "body": [
   "Federated identity lets users authenticate once with their home organization and then access services run by other organizations without creating separate accounts there. The organizations agree to trust each other's identity assertions. This reduces password sprawl, centralizes deprovisioning (disable the home account and federated access stops) and moves authentication to the party best placed to do it well. The cost is a trust dependency: if the identity provider is compromised or misconfigured, every relying service is exposed.",
   "Two roles appear in every federation. The identity provider (IdP) authenticates the user and issues a signed statement about them. The service provider (SP), called the relying party (RP) in OpenID Connect, consumes that statement and grants access. Trust is established ahead of time by exchanging metadata, including the certificates used to sign assertions.",
   "SAML (Security Assertion Markup Language) 2.0 is an XML-based standard widely used for enterprise web single sign-on. In a typical SP-initiated flow, the user visits the SaaS application, is redirected to the corporate IdP, authenticates there, and is redirected back with a digitally signed SAML assertion containing the user's identity and attributes. The SP validates the signature, the intended audience and the validity period before creating a session. Assertions can also be encrypted. SAML is mature and common for workforce access to cloud applications.",
   "OAuth 2.0 is often misunderstood. It is an authorization framework, not an authentication protocol. It lets a resource owner grant a client application limited, delegated access to resources on a resource server, without sharing their password. An authorization server issues an access token with specific scopes, such as permission to read a calendar. The client presents that token to the API. The authorization code flow, strengthened with PKCE (Proof Key for Code Exchange), is the recommended pattern for most applications, while the older implicit flow is discouraged. Tokens should be short-lived and narrowly scoped.",
   "OpenID Connect (OIDC) adds an identity layer on top of OAuth 2.0. Along with the access token, the OpenID provider issues an ID token, a signed JSON Web Token (JWT) that states who the user is, who issued the token, which client it was issued for and when it expires. OIDC uses lightweight JSON and REST, which suits mobile apps and modern web applications, and it underpins the familiar sign in with a large provider buttons. The relying party must validate the ID token's signature, issuer, audience and expiry.",
   "When federating with third parties, manage the relationship like any supplier risk: define attribute release and data protection in the agreement, require strong authentication at the IdP, monitor for anomalous assertions, protect signing keys and rotate certificates before they expire."
  ],
  "terms": [
   [
    "Identity provider (IdP)",
    "The party that authenticates users and issues signed assertions or tokens about them."
   ],
   [
    "SAML assertion",
    "A signed XML statement from an IdP conveying authentication and attribute information to a service provider."
   ],
   [
    "OAuth 2.0",
    "An authorization framework for delegated access that issues scoped access tokens; it does not by itself authenticate users."
   ],
   [
    "OpenID Connect (OIDC)",
    "An authentication layer built on OAuth 2.0 that adds a signed ID token describing the user."
   ],
   [
    "JSON Web Token (JWT)",
    "A compact, signed JSON token format used for OIDC ID tokens and often for access tokens."
   ]
  ],
  "example": "A university uses SAML so staff sign in to a cloud HR system with their campus account. Separately, a student grants a study-planner app OAuth access to read, but not modify, their calendar. The planner also offers login through OIDC, receiving an ID token that tells it the student's identity without ever seeing the student's password.",
  "tip": "The classic exam distinction: SAML is XML-based and common for enterprise SSO; OAuth 2.0 is authorization (delegated access), not authentication; OIDC is authentication built on OAuth 2.0 using JSON tokens.",
  "check": [
   [
    "Which protocol would you use to let a third-party app read a user's photos without receiving the user's password?",
    "OAuth 2.0, which issues a scoped access token granting delegated access."
   ],
   [
    "What does OIDC add to OAuth 2.0?",
    "An ID token (a signed JWT) and standard identity claims so the client can authenticate the user, not just obtain delegated access."
   ],
   [
    "What must a SAML service provider check before trusting an assertion?",
    "The digital signature against the IdP's trusted certificate, the intended audience, and the validity time window, among other conditions."
   ]
  ]
 },
 {
  "t": "Credential management systems and single sign-on",
  "body": [
   "A credential is anything a subject uses to prove identity: a password, a private key and certificate, a token seed, an API key or a biometric template. Credential management covers how these are issued, stored, used, rotated, recovered and revoked. Weak credential management is behind a large share of breaches, whether through reused passwords, secrets hard-coded in source code, or accounts that were never disabled.",
   "Credential management systems take several forms. Enterprise password managers or vaults store secrets in encrypted form and let users generate unique, long passwords for each system. Privileged credential vaults check out administrative passwords, rotate them after use and record sessions. Secrets managers serve machine credentials, such as database passwords and API keys, to applications at runtime so they never appear in code or configuration files. A public key infrastructure (PKI) manages certificates for users, devices and services. Hardware security modules (HSMs) and trusted platform modules (TPMs) protect keys in tamper-resistant hardware. The common goals are strong generation, encrypted storage, controlled release, automatic rotation, and a full audit trail of who accessed which credential.",
   "Single sign-on (SSO) lets a user authenticate once and then access multiple systems without logging in again. Within an organization this is commonly provided by Kerberos in Windows domains, or by an identity platform using SAML or OIDC for web applications. Across organizations, SSO is delivered through federation. The benefits are real: fewer passwords to remember means users can adopt one strong passphrase with MFA, help desk resets drop, and disabling one account removes access everywhere at once.",
   "The drawback is equally important: SSO concentrates risk. If the single credential or the SSO service is compromised, the attacker reaches every connected system, and if the SSO service is down, users may be locked out of everything. Mitigate this with strong phishing-resistant MFA at the SSO point, high availability for the identity platform, short-lived tokens, monitoring for unusual sign-ins, and stepping up authentication for high-risk applications. This single-point-of-failure trade-off is a favorite exam theme.",
   "Do not confuse SSO with password synchronization or same sign-on. Password synchronization keeps the same password across separate systems, so the user still enters it repeatedly and each system still stores a copy. True SSO authenticates once and then passes tickets or tokens. Also distinguish credential recovery processes: self-service resets should require strong verification, because a weak reset flow becomes the easiest way to take over an account regardless of how strong the password is."
  ],
  "terms": [
   [
    "Single sign-on (SSO)",
    "Authenticating once to gain access to multiple systems without re-entering credentials."
   ],
   [
    "Password vault",
    "An encrypted store that generates, holds and releases credentials with access control and auditing."
   ],
   [
    "Secrets manager",
    "A service that delivers machine credentials such as API keys to applications at runtime and rotates them."
   ],
   [
    "Hardware security module (HSM)",
    "A tamper-resistant device that generates and protects cryptographic keys and performs crypto operations."
   ],
   [
    "Credential rotation",
    "Regularly or automatically replacing a credential so a stolen copy has limited useful life."
   ]
  ],
  "example": "A development team discovers a cloud database password committed to a public code repository. They revoke it immediately, move all application secrets into a secrets manager that injects them at deployment, and enable automatic rotation. Employees, meanwhile, sign in once through the company SSO portal with a security key and reach email, HR and the ticketing system without further prompts.",
  "tip": "When a question asks for the main risk of SSO, the answer is a single point of compromise (and of failure). The main mitigation is strong MFA at the SSO point plus availability and monitoring of the identity service.",
  "check": [
   [
    "What is the biggest security disadvantage of SSO?",
    "A single compromised credential or SSO service can grant access to every connected system, and an outage can block access to all of them."
   ],
   [
    "How does a secrets manager reduce risk compared with storing API keys in configuration files?",
    "Secrets are held encrypted, released only to authorized workloads at runtime, rotated automatically and audited, so they are not exposed in code or files."
   ],
   [
    "How does password synchronization differ from SSO?",
    "Password synchronization uses the same password on separate systems that each authenticate the user; SSO authenticates once and reuses a ticket or token."
   ]
  ]
 },
 {
  "t": "Just-in-time access and privileged access management",
  "body": [
   "Privileged accounts, such as domain administrators, root, database administrators, cloud owners and service accounts with broad rights, are the keys attackers want most. With them an intruder can disable defenses, create backdoor accounts, read any data and cover their tracks. Privileged access management (PAM) is the set of controls that discovers, secures, limits and monitors these accounts.",
   "The first step is discovery: you cannot protect privileged accounts you do not know exist. Inventory human admin accounts, built-in accounts, service accounts, local administrator accounts on endpoints, application and cloud keys. Then apply separation: administrators should use a normal account for email and browsing and a separate privileged account only for administration, ideally from a hardened privileged access workstation, so a phishing email cannot directly compromise admin credentials.",
   "A PAM platform typically provides a credential vault that holds privileged passwords and keys; checkout workflows that require a reason, a ticket number or approval; automatic rotation after each use so the credential is worthless once the session ends; session brokering, where the user connects through a proxy and never sees the actual password; and session recording and keystroke logging for accountability. These features directly support the principles of least privilege, separation of duties and accountability.",
   "Just-in-time (JIT) access tackles standing privilege, meaning rights that are always on whether or not they are being used. Under JIT, users hold no permanent administrative rights. When they need to perform a task, they request elevation, it is approved automatically by policy or by a person, and the rights are granted for a limited window and then removed. Some implementations create an ephemeral account for the session and delete it afterward. Related ideas include just-enough administration, which scopes elevation to only the specific commands or resources needed, and zero standing privilege as the end goal. The benefit is a dramatically smaller attack surface: a stolen admin account with no current rights is of little use.",
   "Break-glass (emergency) accounts are a deliberate exception for when normal systems fail, such as the identity provider being down during an outage. They should be few, protected with strong credentials stored securely (sometimes split between two custodians), excluded from dependencies that might be unavailable, heavily monitored, and reviewed after every use. Finally, review privileged access frequently, alert on any use outside approved windows, and send PAM logs to the security monitoring platform."
  ],
  "terms": [
   [
    "Privileged access management (PAM)",
    "Controls and tools that vault, broker, limit, rotate and monitor privileged credentials and sessions."
   ],
   [
    "Just-in-time (JIT) access",
    "Granting elevated rights only when needed and only for a limited time, then removing them automatically."
   ],
   [
    "Standing privilege",
    "Elevated rights that remain assigned continuously even when not in use."
   ],
   [
    "Break-glass account",
    "A tightly controlled emergency account used only when normal access paths fail, with its use closely monitored."
   ],
   [
    "Session recording",
    "Capturing the activity of a privileged session for review, investigation and deterrence."
   ]
  ],
  "example": "A cloud engineer needs to change a production firewall rule. She opens a request referencing a change ticket, the PAM system grants her the network-admin role for two hours, and she connects through a brokered session that is recorded. When the window closes, the role is revoked automatically and the vaulted password is rotated, so nothing reusable remains.",
  "tip": "If a question asks how to reduce the risk of compromised administrator accounts, look for answers that remove standing privilege (JIT), separate admin and daily-use accounts, and add vaulting, rotation and session monitoring.",
  "check": [
   [
    "What problem does just-in-time access solve?",
    "Standing privilege: accounts with permanent elevated rights that an attacker can abuse at any time. JIT grants rights only for an approved, limited window."
   ],
   [
    "Why should administrators have separate accounts for administration and daily work?",
    "So activities like email and browsing, which expose users to phishing and malware, never run with privileged credentials."
   ],
   [
    "What controls should apply to a break-glass account?",
    "Strong protected credentials, minimal number of accounts, independence from systems that may fail, alerting on use, and review after each use."
   ]
  ]
 },
 {
  "t": "Authorization mechanisms: RBAC, rule-based, MAC, DAC, ABAC, risk-based",
  "body": [
   "Once a subject is authenticated, an authorization mechanism decides what it may do. The CISSP exam tests several models, and questions usually hinge on who makes the access decision and what the decision is based on. Learn each model by those two questions.",
   "Discretionary access control (DAC) lets the owner of an object decide who can access it. When you create a file on a typical Windows or Linux system, you can grant others read or write access through access control lists (ACLs) or permission bits. DAC is flexible and familiar, but it is only as good as each owner's judgment, and it is vulnerable to malware running with the user's rights, because that malware can change permissions the user controls. Identity-based access through ACLs is the hallmark of DAC.",
   "Mandatory access control (MAC) takes the decision away from owners. The system enforces policy based on security labels: every subject has a clearance, and every object has a classification, often with compartments or categories. Access is allowed only when the subject's clearance dominates the object's label and the subject has need to know for the compartment. Users cannot change labels or share data outside the policy. MAC is associated with military and government systems and with the Bell-LaPadula confidentiality model, and it appears in hardened operating systems through features such as SELinux. It is strong but rigid and expensive to administer.",
   "Role-based access control (RBAC) assigns permissions to roles that represent job functions, and users receive permissions by being assigned to roles. It is non-discretionary: a central administrator, not the data owner, controls role definitions. RBAC scales well in organizations with stable job functions, simplifies audits and supports separation of duties, for example by preventing one person from holding both the create-vendor and approve-payment roles.",
   "Rule-based access control applies global rules to all subjects regardless of identity. A firewall rule set that allows or denies traffic by address and port is the classic example; so is a policy that blocks logins outside business hours. The acronym RBAC is sometimes used for both role-based and rule-based, so read the question context carefully.",
   "Attribute-based access control (ABAC) evaluates policies that combine attributes of the subject (department, clearance, device health), the object (classification, owner), the action (read, delete) and the environment (time, location, network). A policy might say that clinicians may read records of patients in their own ward from a managed device during their shift. ABAC is very fine-grained and suits cloud and zero trust architectures, at the cost of more complex policy management. Risk-based (adaptive) access control goes a step further, calculating a risk score in real time from signals like impossible travel, unfamiliar devices or threat intelligence, and then allowing, requiring step-up authentication, or denying accordingly."
  ],
  "terms": [
   [
    "Discretionary access control (DAC)",
    "A model where the object owner decides who has access, typically using ACLs."
   ],
   [
    "Mandatory access control (MAC)",
    "A model where the system enforces access by comparing subject clearances and object labels; users cannot override it."
   ],
   [
    "Role-based access control (RBAC)",
    "A non-discretionary model that grants permissions to roles and assigns users to roles based on job function."
   ],
   [
    "Attribute-based access control (ABAC)",
    "A model that evaluates policies over subject, object, action and environment attributes."
   ],
   [
    "Risk-based access control",
    "Adaptive authorization that adjusts decisions in real time using a calculated risk score from contextual signals."
   ]
  ],
  "example": "A pharmaceutical company uses RBAC so lab technicians automatically get access to the lab information system. For clinical trial data it adds ABAC rules: only staff assigned to that trial, on a managed laptop, from an approved country may view unblinded results. If a login arrives from a new device in an unusual location, the risk engine demands a security key before proceeding.",
  "tip": "Ask who decides. Owner decides: DAC. System labels decide: MAC. Job function decides: role-based RBAC. Global rules decide: rule-based. Many attributes decide: ABAC. Live risk score decides: risk-based.",
  "check": [
   [
    "A user shares a folder with a colleague by editing its permissions. Which model is in use?",
    "Discretionary access control, because the owner decides who gets access."
   ],
   [
    "Which model would best enforce 'only during business hours, from a managed device, for the user's own region'?",
    "Attribute-based access control, which evaluates subject, object and environmental attributes together."
   ],
   [
    "Why can't users in a MAC system simply share a classified file with a colleague?",
    "Access is determined by system-enforced labels and clearances, which users cannot change, so the colleague needs an adequate clearance and need to know."
   ]
  ]
 },
 {
  "t": "Identity and access provisioning lifecycle: account access review, provisioning and deprovisioning",
  "body": [
   "Identities are not static. People join, change jobs, take leave, become contractors and eventually depart, and systems and services come and go. The identity and access provisioning lifecycle manages access through all of these stages. Many organizations describe it as joiner, mover, leaver (JML), and the exam expects you to know the risks at each step.",
   "Provisioning happens when a new identity needs access. Access should be requested, approved by the appropriate authority (usually the manager and the data or system owner), granted according to the person's role, and documented. Automated provisioning driven by the human resources system as the authoritative source is preferred: when HR records a new hire, the identity platform creates accounts and applies role-based access, which reduces errors and delays. Provisioning should follow least privilege from day one rather than copying another employee's access, a habit that spreads excessive permissions.",
   "Movers are the most commonly mishandled stage. When someone transfers departments, new access is added promptly because they complain if it is missing, but old access is often left in place because nobody notices. Over years this creates privilege creep (also called access aggregation), where a long-serving employee holds far more rights than any single job requires and may be able to bypass separation of duties. The fix is to treat a transfer as a re-provisioning event: remove access tied to the old role and grant access for the new one.",
   "Deprovisioning disables or removes access when it is no longer needed. For a routine departure, disable accounts at the end of the last working day, revoke tokens and certificates, recover badges and devices, and transfer data ownership. For an involuntary or hostile termination, disable access before or at the moment the person is informed and escort them as policy dictates. Disabling first, then deleting after a retention period, preserves audit trails and data. Orphaned accounts, which belong to nobody current, and dormant accounts that have not been used in a long time are favored by attackers and should be found and removed.",
   "Account access reviews (also called recertification or attestation) periodically confirm that access is still appropriate. Managers and system owners review who has what and approve or revoke each entitlement. Privileged accounts should be reviewed more often than standard ones. Reviews are only valuable if reviewers actually examine access rather than approving everything, so provide clear reports, flag anomalies, and track revocations to completion. Service accounts need owners and reviews too, along with credential rotation and restricted interactive logon."
  ],
  "terms": [
   [
    "Joiner-mover-leaver (JML)",
    "The lifecycle stages of hiring, changing roles and departing, each of which requires access changes."
   ],
   [
    "Privilege creep",
    "Gradual accumulation of access beyond current job needs, usually from role changes where old access is not removed."
   ],
   [
    "Deprovisioning",
    "Disabling or removing accounts and access when they are no longer required."
   ],
   [
    "Orphaned account",
    "An account with no current owner, such as one left behind by a departed employee."
   ],
   [
    "Access recertification",
    "A periodic review in which managers or owners confirm or revoke each user's entitlements."
   ]
  ],
  "example": "During an annual review, an auditor finds that a payroll clerk who moved from accounts payable two years earlier can still create vendors and approve payments, a separation-of-duties violation. The company revokes the old rights, changes its transfer procedure so HR role changes automatically trigger removal of prior access, and moves to quarterly reviews of finance roles.",
  "tip": "Privilege creep is the risk most associated with transfers, and periodic access reviews are the control that detects it. For terminations, especially hostile ones, disable access promptly, ideally at the same moment the person is notified.",
  "check": [
   [
    "What is the main risk when an employee changes departments?",
    "Privilege creep: they receive new access while retaining old access, accumulating excessive rights."
   ],
   [
    "Why disable an account before deleting it?",
    "Disabling immediately stops access while preserving audit logs, data ownership and the ability to investigate; deletion can follow after a retention period."
   ],
   [
    "Which control detects accumulated or orphaned access over time?",
    "Periodic account access reviews (recertification) by managers and system owners."
   ]
  ]
 },
 {
  "t": "Authentication systems: Kerberos, RADIUS, TACACS+",
  "body": [
   "Centralized authentication systems let many services rely on one trusted authority rather than keeping separate account databases. The CISSP exam focuses on three: Kerberos for single sign-on inside an organization, and RADIUS and TACACS+ for AAA (authentication, authorization and accounting) on network access and device administration.",
   "Kerberos is a ticket-based protocol that uses symmetric-key cryptography and a trusted third party called the key distribution center (KDC). The KDC contains the authentication service (AS) and the ticket-granting service (TGS). The flow works like this: the user authenticates to the AS, which returns a ticket-granting ticket (TGT) encrypted with a key only the KDC knows, along with a session key protected with a key derived from the user's password. When the user wants to reach a file server, the client presents the TGT to the TGS and receives a service ticket for that server. The client then presents the service ticket to the server, which can decrypt it with its own key. The user's password never crosses the network, and the user signs on once. Microsoft Active Directory uses Kerberos as its primary domain authentication protocol.",
   "Kerberos has weaknesses you should recognize. The KDC is a single point of failure and a prime target: if its secret keys are stolen, an attacker can forge tickets (the golden ticket attack uses the key of the account that signs TGTs). Tickets carry timestamps, so clocks must be synchronized, typically within a few minutes, or authentication fails. Pass-the-ticket reuses a stolen ticket from memory, and Kerberoasting requests service tickets to crack weak service account passwords offline. Defenses include protecting domain controllers, long random service account passwords, monitoring ticket anomalies and limiting privileged logons.",
   "RADIUS (Remote Authentication Dial-In User Service) is an open standard used for network access: Wi-Fi with 802.1X, VPNs and remote access. A network device, the network access server, acts as the RADIUS client and forwards the user's credentials to the RADIUS server. RADIUS traditionally runs over UDP, combines authentication and authorization in one exchange, and encrypts only the password field of the access request, leaving other attributes readable. Carrying it inside a protected tunnel or using EAP methods with TLS addresses much of this.",
   "TACACS+ (Terminal Access Controller Access-Control System Plus) was developed by Cisco and is used mainly for administering network devices. It runs over TCP, encrypts the entire payload, and separates authentication, authorization and accounting into distinct functions. That separation allows per-command authorization, such as allowing a junior engineer to view configurations but not change routing, and detailed accounting of every command entered. Diameter, a successor to RADIUS used heavily in mobile carrier networks, may also appear as a distractor."
  ],
  "terms": [
   [
    "Key distribution center (KDC)",
    "The trusted Kerberos server containing the authentication service and ticket-granting service."
   ],
   [
    "Ticket-granting ticket (TGT)",
    "A Kerberos ticket obtained at logon and used to request service tickets without re-entering credentials."
   ],
   [
    "RADIUS",
    "An open AAA protocol, usually over UDP, that combines authentication and authorization and encrypts only the password."
   ],
   [
    "TACACS+",
    "A Cisco-developed AAA protocol over TCP that encrypts the whole payload and separates authentication, authorization and accounting."
   ],
   [
    "802.1X",
    "Port-based network access control that uses an authentication server, commonly RADIUS, before granting network access."
   ]
  ],
  "example": "A company's staff log on to their laptops each morning and reach file shares and intranet sites without further prompts, thanks to Kerberos tickets from the domain controllers. Their Wi-Fi uses 802.1X with a RADIUS server, while the network team logs in to routers through TACACS+, which allows junior engineers only read-only commands and records every configuration change.",
  "tip": "Classic comparison: RADIUS uses UDP, encrypts only the password, and combines authentication with authorization; TACACS+ uses TCP, encrypts the full body, and separates all three A's. Kerberos needs time synchronization and has the KDC as a single point of failure.",
  "check": [
   [
    "Why does Kerberos require synchronized clocks?",
    "Tickets and authenticators contain timestamps to prevent replay; if clocks differ by more than the allowed skew, authentication fails."
   ],
   [
    "Which protocol would you choose for granular per-command authorization on routers?",
    "TACACS+, because it separates authorization from authentication and supports command-level control and accounting."
   ],
   [
    "What part of a RADIUS access request is encrypted?",
    "Only the user's password; other attributes travel in the clear unless an additional protective tunnel is used."
   ]
  ]
 },
 {
  "t": "Access control attacks and biometrics: FAR, FRR, CER",
  "body": [
   "Understanding how attackers go after access controls helps you choose the right defenses. Password attacks are the most common. A brute-force attack tries every possible combination; a dictionary attack tries likely words and known passwords; password spraying tries a few common passwords against many accounts to avoid lockouts; credential stuffing replays username and password pairs leaked from other breaches, exploiting reuse. Offline attacks work against stolen password hashes, where rainbow tables (precomputed hash lookups) are defeated by salting, and slow hashing algorithms make each guess expensive. Defenses include MFA, unique salted hashes, account lockout or throttling, breached-password screening and monitoring for many failed logins across accounts.",
   "Other attacks target the process around credentials. Phishing and social engineering trick users into revealing credentials or approving logins. Pass-the-hash and pass-the-ticket reuse captured authentication material without knowing the password. Session hijacking steals an active session token. Shoulder surfing and keyloggers capture secrets as they are typed. Spoofing impersonates a trusted identity or device, and privilege escalation abuses a flaw to gain higher rights than granted. Physical attacks such as tailgating (following an authorized person through a door) are countered by mantraps, turnstiles and awareness.",
   "Biometrics authenticate by something you are. Physiological biometrics measure body characteristics: fingerprint, palm or hand geometry, face, iris, retina and vein patterns. Behavioral biometrics measure how you act: voice, signature dynamics and keystroke dynamics. Biometric systems first enroll a user by capturing reference samples and storing a template, then compare new samples to that template. Because samples vary, the system uses a threshold, and that leads to two kinds of error.",
   "A Type I error, the false rejection rate (FRR), is when a legitimate user is wrongly denied. A Type II error, the false acceptance rate (FAR), is when an impostor is wrongly accepted. FAR is the more dangerous from a security standpoint because it lets the wrong person in. Adjusting sensitivity trades one for the other: raising sensitivity lowers FAR but raises FRR, frustrating users. The crossover error rate (CER), also called the equal error rate, is the point where FAR equals FRR. A lower CER indicates a more accurate system and is the standard way to compare biometric products.",
   "Other practical factors include enrollment time, throughput (how many people per minute), user acceptance and privacy. Retina scanning is highly accurate but intrusive and poorly accepted; fingerprints are cheap and accepted but can be affected by injuries. Presentation attacks use fakes such as a printed photo or a molded fingerprint, countered by liveness detection. Remember too that a biometric cannot be reissued if its template is stolen, so templates must be protected carefully."
  ],
  "terms": [
   [
    "False rejection rate (FRR)",
    "Type I error: the rate at which legitimate users are incorrectly rejected."
   ],
   [
    "False acceptance rate (FAR)",
    "Type II error: the rate at which impostors are incorrectly accepted; the more serious security failure."
   ],
   [
    "Crossover error rate (CER)",
    "The point where FAR equals FRR; a lower CER means a more accurate biometric system."
   ],
   [
    "Password spraying",
    "Trying a few common passwords across many accounts to avoid triggering lockouts."
   ],
   [
    "Credential stuffing",
    "Automated reuse of username and password pairs leaked from other breaches."
   ]
  ],
  "example": "A data center evaluates two palm-vein readers. Vendor A reports a CER of 0.5 percent and Vendor B 2 percent, so A is more accurate overall. Because the vault room holds high-value equipment, the team tunes A for a very low FAR, accepting that staff will occasionally need a second scan, and adds liveness detection to resist fake samples.",
  "tip": "Memorize: Type I is false rejection (FRR), Type II is false acceptance (FAR), and the best biometric has the lowest CER. When security matters most, tune to minimize FAR even though FRR rises.",
  "check": [
   [
    "Which biometric error is more serious for security, and what type is it?",
    "The false acceptance rate, a Type II error, because it admits an impostor."
   ],
   [
    "How would you compare the accuracy of two biometric systems?",
    "Compare their crossover error rates; the lower CER is more accurate."
   ],
   [
    "What defense directly counters credential stuffing?",
    "Multifactor authentication, supported by breached-password screening and detection of automated login attempts, because stuffing relies on reused passwords alone."
   ]
  ]
 },
 {
  "t": "Designing and validating assessment, test and audit strategies (internal, external, third party)",
  "body": [
   "Security assessment and testing answers a simple question: do our controls actually work as intended? Domain 6 is about designing a program that answers it reliably and repeatedly, rather than running an occasional scan and hoping for the best. A good strategy starts from the organization's objectives, risks, regulatory obligations and the systems that matter most, and then chooses the right mix of activities, frequencies and assessors.",
   "Distinguish the main activities. A security test verifies that a specific control works, such as confirming that a firewall blocks an unauthorized port. A security assessment is a broader review of a system or environment, often combining tests, interviews and document review to identify risks and weaknesses. An audit is a formal, systematic evaluation against a defined standard or set of criteria, performed by someone independent, that results in an opinion or attestation. Audits are about proving compliance and control effectiveness to stakeholders; assessments are about finding and fixing problems.",
   "Who performs the work matters. Internal assessments are conducted by the organization's own staff, often an internal audit function that reports independently to the audit committee of the board. They are inexpensive, frequent and informed by deep knowledge of the environment, but they may lack independence or fresh perspective. External audits are performed by an outside firm engaged by the organization, providing independence and credibility, for example for financial reporting or certifications. Third-party audits are performed by or on behalf of another party, such as a customer, regulator or partner, to evaluate the organization, or conversely when your organization evaluates a vendor. The terminology varies by source, so focus on the concept: independence increases as you move away from the team that owns the controls.",
   "Designing the strategy involves defining scope (which systems, locations and processes), objectives (compliance, risk reduction, validation of new controls), methods (automated scanning, manual testing, configuration review, interviews, sampling), frequency based on risk and change rate, roles and authorization, and how results will be reported and tracked. Tie the strategy to frameworks the organization uses, such as NIST SP 800-53A for assessing controls, and to the risk register so testing effort goes where risk is highest.",
   "Validating the strategy means checking that it still fits. Are the right assets in scope after the cloud migration? Are tests producing actionable findings, and are those findings fixed? Do results reach management in a form that supports decisions? Review the program after significant changes and at least periodically, and use metrics such as coverage and time to remediate to show whether it works. Senior management owns the risk, so they must understand and endorse the strategy."
  ],
  "terms": [
   [
    "Security assessment",
    "A comprehensive review of a system's security, combining tests and other methods to identify risks."
   ],
   [
    "Security audit",
    "A formal, independent evaluation against defined criteria, typically resulting in an opinion or attestation."
   ],
   [
    "Internal audit",
    "Assessment by the organization's own staff, ideally reporting independently of the teams being audited."
   ],
   [
    "Third-party audit",
    "An audit performed by or for an outside party such as a customer, regulator or partner."
   ],
   [
    "Scope",
    "The defined boundaries of systems, locations, processes and time covered by an assessment or audit."
   ]
  ],
  "example": "A payment processor designs its testing strategy around risk: weekly automated vulnerability scans of internet-facing systems, quarterly internal configuration reviews, an annual external penetration test, and yearly external audits required by its card-industry obligations. Large customers also send third-party auditors, so the company maintains an evidence library to answer them efficiently.",
  "tip": "Know the independence ladder: internal teams are cheapest and most frequent, external and third-party auditors are most independent and credible. If a question emphasizes objectivity for stakeholders or regulators, choose an external or third-party audit.",
  "check": [
   [
    "What distinguishes an audit from an assessment?",
    "An audit is a formal, independent evaluation against defined criteria that produces an opinion, whereas an assessment is a broader review aimed at identifying and fixing weaknesses."
   ],
   [
    "Why should internal audit report to the board's audit committee rather than the IT manager?",
    "To preserve independence, so findings about IT cannot be suppressed by the people responsible for the controls."
   ],
   [
    "Name three elements of a well-designed assessment strategy.",
    "Examples: defined scope, objectives, methods, frequency based on risk, authorization and roles, and reporting and remediation tracking."
   ]
  ]
 },
 {
  "t": "Vulnerability assessment and penetration testing (rules of engagement, testing knowledge levels)",
  "body": [
   "Vulnerability assessment and penetration testing are related but different. A vulnerability assessment identifies, quantifies and prioritizes weaknesses, usually with automated scanners that compare systems against databases of known vulnerabilities, often using CVE (Common Vulnerabilities and Exposures) identifiers and CVSS (Common Vulnerability Scoring System) scores. It is broad, frequent and relatively safe. A penetration test goes further: skilled testers attempt to exploit weaknesses, chain them together and demonstrate real impact, such as reaching sensitive data. It is deeper, narrower, more expensive and carries more operational risk.",
   "Scans can be unauthenticated, seeing systems as an outside attacker would, or authenticated (credentialed), logging in to inspect installed software and configuration. Authenticated scans find far more, with fewer false positives. Remember the difference between a false positive, where a scanner reports a vulnerability that is not present, and a false negative, where a real vulnerability goes undetected; false negatives are more dangerous because they create false confidence.",
   "Penetration tests follow a methodology. A common structure is planning, where scope and rules are agreed; discovery or reconnaissance, where testers gather information and scan; attack or exploitation, where they attempt to gain access, escalate privileges and move laterally; and reporting, where they document findings, evidence, risk and remediation. Testers clean up tools and accounts they created and must avoid unauthorized damage.",
   "Rules of engagement (RoE) are the written agreement that makes testing legal and safe. They define scope (which IP ranges, applications and locations are in and out), testing windows, permitted techniques (for example whether social engineering or denial-of-service is allowed), emergency contacts and a stop procedure, how sensitive data found during testing will be handled, and reporting expectations. Most importantly, the test requires written authorization from someone with authority over the systems. Without it, the same actions can be a crime. For cloud-hosted systems, also check the provider's testing policy.",
   "Testing knowledge levels describe how much the testers know in advance. In a black-box or zero-knowledge test, testers start with little or no information, simulating an outside attacker; it is realistic but time is spent on discovery. In a white-box or full-knowledge test, testers receive architecture diagrams, source code and credentials, enabling thorough coverage efficiently. Gray-box or partial-knowledge testing sits in between, for example giving a normal user account. Separately, tests may be announced to staff or unannounced to also test detection and response. Double-blind means neither the testers know much nor the defenders know the test is happening. Red teams emulate adversaries, blue teams defend, and purple teaming combines them to improve detection collaboratively."
  ],
  "terms": [
   [
    "Vulnerability assessment",
    "Identifying and prioritizing known weaknesses, typically with automated scanning, without exploiting them."
   ],
   [
    "Penetration test",
    "An authorized simulated attack that attempts to exploit weaknesses to demonstrate real-world impact."
   ],
   [
    "Rules of engagement",
    "The written agreement defining scope, methods, timing, contacts and authorization for a test."
   ],
   [
    "Black-box / white-box / gray-box",
    "Zero, full and partial knowledge given to testers before the test."
   ],
   [
    "False negative",
    "A real vulnerability that a test fails to detect, creating false confidence."
   ]
  ],
  "example": "Before an external penetration test, a retailer signs rules of engagement with the testing firm: its public web servers are in scope, the payment gateway operated by a partner is out, testing runs overnight, denial-of-service is prohibited, and the CISO is the emergency contact. The testers receive a customer-level account (gray box) and discover that it can view other customers' orders by changing an ID in the URL.",
  "tip": "The single most important precondition for a penetration test is written authorization from someone with authority over the systems. Also match knowledge levels: zero knowledge is black box, full knowledge is white box.",
  "check": [
   [
    "What is the key difference between a vulnerability assessment and a penetration test?",
    "A vulnerability assessment identifies and prioritizes weaknesses; a penetration test actively attempts to exploit them to show impact."
   ],
   [
    "Which testing approach most realistically simulates an outside attacker with no insider information?",
    "A black-box (zero-knowledge) test."
   ],
   [
    "Why are authenticated scans generally preferred for internal vulnerability management?",
    "Logging in lets the scanner see installed software versions and configuration, finding more issues with fewer false positives."
   ]
  ]
 },
 {
  "t": "Log reviews, synthetic transactions and breach and attack simulation",
  "body": [
   "Testing is not only about hiring testers. A large share of assurance comes from continuously examining what your systems are already telling you and from exercising them in controlled ways. This topic covers three techniques: reviewing logs, running synthetic transactions, and breach and attack simulation (BAS).",
   "Log review examines records of events from operating systems, applications, network devices and security tools to find policy violations, errors and signs of attack. Manual review of everything is impossible at scale, so organizations centralize logs in a security information and event management (SIEM) platform, correlate events, and focus human attention on alerts and on regular reviews of high-value activity such as privileged logons, changes to security settings, and access to sensitive data. Sampling techniques help: statistical sampling selects records randomly so conclusions can be generalized, while clipping levels set a threshold below which events are not flagged, for example ignoring one or two failed logins but alerting at five within a few minutes. For logs to be reliable, clocks must be synchronized, logs must be protected from tampering, and retention must meet requirements. Review should also confirm that expected logs are actually arriving, because a silent source is itself a problem.",
   "Synthetic transactions are scripted actions that simulate a user interacting with a system, run on a schedule to verify functionality, performance and security behavior. For example, a script might log in to a web application every five minutes, add an item to a cart and check out, measuring response times and confirming each step succeeds. This is often called synthetic monitoring, and it differs from real user monitoring (RUM), which passively observes the experience of actual users. Synthetic transactions are proactive: they detect problems even when no real users are active and give consistent baselines. Security uses include confirming that a login still requires MFA, that an access control still blocks unauthorized paths, or that a web application firewall still blocks a known-bad test pattern.",
   "Breach and attack simulation tools automate the safe execution of attacker techniques against your environment to test whether your controls prevent, detect and alert on them. Agents or simulated traffic mimic behaviors such as credential dumping, lateral movement, command-and-control beacons or data exfiltration, commonly mapped to the MITRE ATT&CK framework. Unlike an annual penetration test, BAS can run continuously, showing when a configuration change or tool update silently breaks detection. It complements rather than replaces human testers, who find novel and business-logic weaknesses.",
   "The common thread is validation. Controls drift, tools are misconfigured and logs stop flowing without anyone noticing. These techniques give ongoing evidence that security is working, and they generate metrics management can track."
  ],
  "terms": [
   [
    "Synthetic transaction",
    "A scripted, scheduled simulation of user activity used to verify availability, performance and control behavior."
   ],
   [
    "Real user monitoring (RUM)",
    "Passive observation of actual users' interactions to measure performance and experience."
   ],
   [
    "Clipping level",
    "A threshold that filters out routine low-level events and flags activity only when it exceeds a set count."
   ],
   [
    "Breach and attack simulation (BAS)",
    "Automated, safe emulation of attacker techniques to test whether controls prevent and detect them."
   ],
   [
    "MITRE ATT&CK",
    "A knowledge base of adversary tactics and techniques used to map and measure detection coverage."
   ]
  ],
  "example": "After a firewall upgrade, a company's continuous BAS runs show that simulated command-and-control traffic over an unusual port is no longer being alerted. At the same time, a synthetic login transaction reveals that the new configuration also broke MFA prompts for one application. Both issues are fixed within a day, long before the next scheduled penetration test would have found them.",
  "tip": "Synthetic transactions are proactive and scripted; real user monitoring is passive. Clipping levels reduce noise by ignoring events below a threshold. BAS provides continuous validation of detection and prevention controls.",
  "check": [
   [
    "How does synthetic monitoring differ from real user monitoring?",
    "Synthetic monitoring runs scripted transactions on a schedule regardless of real usage; RUM passively measures actual users' sessions."
   ],
   [
    "What is the purpose of a clipping level in log review?",
    "To reduce noise by ignoring routine events below a threshold and flagging only activity that exceeds it."
   ],
   [
    "What advantage does breach and attack simulation have over an annual penetration test?",
    "It runs continuously and safely, quickly revealing when changes break prevention or detection controls."
   ]
  ]
 },
 {
  "t": "Code review and testing: static, dynamic, fuzzing, misuse case, test coverage, interface testing",
  "body": [
   "Software is where many vulnerabilities are born, so testing code is a core assessment activity. The CISSP exam expects you to know the major techniques, what each finds, and when in the lifecycle each applies. No single technique is enough; mature programs combine several.",
   "Code review is the examination of source code by people other than its author. It ranges from informal peer review during a pull request to formal inspection, such as the Fagan inspection process with defined roles (moderator, author, reader, reviewer) and stages (planning, overview, preparation, inspection, rework, follow-up). Manual review catches logic flaws, design weaknesses and misuse of security functions that tools miss, but it is slow and depends on reviewer skill.",
   "Static testing analyzes code without running it. Static application security testing (SAST) tools parse source code or compiled binaries to find patterns such as unsanitized input reaching a database query, hard-coded credentials or unsafe functions. Static testing can run early, even before the application is deployable, and points to the exact line of code, but it tends to produce false positives and cannot see runtime configuration. Dynamic testing evaluates the software while it runs. Dynamic application security testing (DAST) probes a running application from the outside, sending crafted requests and observing responses, which finds issues like misconfigurations and injection flaws as an attacker would see them, but it needs a working environment and does not show where in the code the bug lives.",
   "Fuzzing is a dynamic technique that feeds large volumes of invalid, unexpected or random input to a program to trigger crashes, hangs or memory errors that suggest vulnerabilities. Mutation (dumb) fuzzing modifies existing valid inputs, such as flipping bits in a sample file. Generation (intelligent) fuzzing builds inputs from a model of the expected format or protocol, reaching deeper code paths. Fuzzing is especially good at finding input-handling bugs such as buffer overflows.",
   "Misuse case testing, also called abuse case testing, flips the usual use case. Where a use case describes how a legitimate user achieves a goal, a misuse case describes how an attacker might abuse the system, such as submitting a negative quantity to receive a refund or skipping a step in a checkout workflow. Writing misuse cases from threat models helps testers verify that the application handles hostile behavior, not just the happy path.",
   "Test coverage analysis measures how much of the code has been exercised by tests, commonly expressed as a percentage: tested units divided by total units. Coverage can be measured by statements, branches, conditions, functions or paths. High coverage does not guarantee security, but low coverage shows untested territory. Interface testing checks the points where components connect: application programming interfaces (APIs), user interfaces, and physical interfaces. It verifies that each interface validates input, enforces authorization and handles errors correctly, since interfaces are where trust boundaries are crossed."
  ],
  "terms": [
   [
    "Static testing (SAST)",
    "Analyzing source or compiled code without executing it to find vulnerabilities early."
   ],
   [
    "Dynamic testing (DAST)",
    "Testing a running application from the outside to find vulnerabilities in its behavior."
   ],
   [
    "Fuzzing",
    "Supplying large volumes of malformed or random input to find crashes and input-handling flaws; mutation or generation based."
   ],
   [
    "Misuse case",
    "A scenario describing how an attacker could abuse a system, used to design security tests."
   ],
   [
    "Test coverage",
    "The proportion of code (statements, branches, paths) exercised by tests."
   ]
  ],
  "example": "A team building a file-upload service runs SAST on every commit, which flags a path built from user input. Before release, DAST against a staging copy finds a missing security header, and a generation fuzzer built from the image-format specification crashes the thumbnail parser. Testers also write a misuse case in which a user uploads a file named to overwrite another customer's files, and confirm the fix blocks it.",
  "tip": "Static equals code not running, early, exact line, more false positives. Dynamic equals running application, attacker's view, no line numbers. Fuzzing is dynamic and targets input handling. Misuse cases test what an attacker would do.",
  "check": [
   [
    "Which technique can be used before an application is deployable?",
    "Static testing (SAST or manual code review), because it does not require the code to run."
   ],
   [
    "What is the difference between mutation and generation fuzzing?",
    "Mutation fuzzing modifies existing valid inputs; generation fuzzing creates inputs from a model of the expected format or protocol."
   ],
   [
    "Does 100 percent test coverage mean the code is secure?",
    "No. It means all code was executed by tests, but tests may not check for security flaws or hostile inputs."
   ]
  ]
 },
 {
  "t": "Compliance checks",
  "body": [
   "Compliance checks verify that systems, processes and people conform to the requirements the organization must or has chosen to meet. Those requirements come from laws and regulations, contracts (such as the Payment Card Industry Data Security Standard for organizations handling card data), industry frameworks, and internal policies, standards and baselines. The goal is to produce evidence that the required controls exist and operate, and to find gaps before an auditor or an attacker does.",
   "It helps to separate compliance from security. Compliance means meeting a defined set of requirements; security means actually managing risk. An organization can be compliant and still insecure, because requirements set a minimum and may not address every threat. It can also be secure in some areas but noncompliant because it lacks documentation. The CISSP perspective is that compliance is necessary but not sufficient, and security programs should use compliance as a floor, not a ceiling.",
   "Technical compliance checks are often automated. Configuration compliance scanning compares systems to a baseline, such as CIS Benchmarks or an internal hardening standard, and reports deviations like an enabled guest account, weak TLS settings or missing audit policy. The Security Content Automation Protocol (SCAP) from NIST standardizes how such checks and results are expressed so tools can interoperate; components include XCCDF for checklists, OVAL for testing system state, and naming and scoring standards for vulnerabilities and platforms. In cloud environments, cloud security posture management (CSPM) tools continuously check accounts against policy, such as flagging a publicly readable storage bucket. Policy-as-code in deployment pipelines can block noncompliant changes before they reach production.",
   "Procedural compliance checks look at whether processes are followed: are access reviews completed on schedule, are changes approved before implementation, have all staff completed required training, are vendors assessed before onboarding? These checks rely on evidence such as tickets, sign-offs and training records, and on interviews and sampling.",
   "Good compliance programs map each requirement to the control that satisfies it and to the evidence that proves it, often in a control matrix. Mapping one control to several frameworks avoids duplicate work, since many frameworks overlap. Checks should be continuous or frequent rather than annual scrambles, and findings should feed the same remediation and exception processes used for other security issues. When a requirement cannot be met, document the gap, assess the risk, apply compensating controls where possible, and obtain formal risk acceptance from the appropriate authority."
  ],
  "terms": [
   [
    "Compliance",
    "Conformance with defined requirements from laws, regulations, contracts, standards or internal policy."
   ],
   [
    "Configuration baseline",
    "A documented, approved set of settings against which systems are checked."
   ],
   [
    "SCAP",
    "Security Content Automation Protocol, a NIST suite of specifications for automating configuration and vulnerability checks."
   ],
   [
    "Cloud security posture management (CSPM)",
    "Tools that continuously check cloud configurations against security and compliance policies."
   ],
   [
    "Control mapping",
    "Linking each requirement to the controls and evidence that satisfy it, often across multiple frameworks."
   ]
  ],
  "example": "A healthcare company runs weekly configuration scans against its hardened server baseline and a CSPM tool across its cloud accounts. One scan finds that a new file server has an outdated protocol enabled. The compliance dashboard links the deviation to the requirement it violates, opens a remediation ticket with a deadline, and records the fix as evidence for the next audit.",
  "tip": "Being compliant does not mean being secure. If a question asks what a compliance check verifies, the answer is adherence to a defined standard or requirement, typically through comparison with a baseline or checklist.",
  "check": [
   [
    "Why might a fully compliant organization still suffer a breach?",
    "Compliance requirements set minimum controls and may not address all current threats or the organization's specific risks."
   ],
   [
    "What does SCAP enable?",
    "Standardized, automated checking of system configurations and vulnerabilities, with interoperable content and results across tools."
   ],
   [
    "What should happen when a compliance requirement cannot be met?",
    "Document the gap, assess the risk, apply compensating controls if possible, and obtain formal risk acceptance from the appropriate authority."
   ]
  ]
 },
 {
  "t": "Collecting security process data: account management, management review, KPIs and KRIs, backup verification, training, DR/BC",
  "body": [
   "Technical tests show whether a firewall or application is secure, but many failures are process failures: accounts never removed, backups that cannot be restored, training nobody completed. Collecting security process data means gathering evidence about how well administrative and operational processes work, so management can make informed decisions and auditors can verify controls.",
   "Account management data shows whether identity processes are healthy. Useful measures include the number of accounts disabled within the required time after termination, orphaned and dormant accounts found, privileged account counts over time, access review completion rates, and exceptions granted. A sample-based check, such as comparing a list of recent leavers from HR against active directory accounts, is a classic audit test.",
   "Management review and approval is the evidence that leadership is actually governing security. It includes minutes of security steering committee meetings, sign-off of risk acceptances, approval of policies, and review of metrics and audit findings. Without management review, programs drift and accountability is unclear.",
   "Key performance indicators (KPIs) measure how well a process or control is performing against a goal, looking backward at results: percentage of critical patches applied within the target window, mean time to detect and to respond to incidents, percentage of staff who completed training. Key risk indicators (KRIs) are forward-looking signals that risk is increasing and may exceed the organization's appetite: a rising number of unpatched internet-facing systems, growth in phishing click rates, or increasing numbers of privileged accounts. Good metrics are specific, measurable, tied to a goal or threshold, and collected consistently. Present them to management in business terms, with trends, not raw counts.",
   "Backup verification data proves backups are usable. A backup that has never been restored is an assumption, not a control. Collect evidence of backup job success, but more importantly of periodic test restores, integrity checks, and restore times compared with recovery time objectives. Protect backups from tampering and ransomware, and record the results.",
   "Training and awareness data covers completion rates, assessment scores, phishing simulation results, and role-specific training for administrators and developers. The goal is evidence of behavior change, not just attendance. Disaster recovery and business continuity (DR/BC) data includes plan review dates, test and exercise results, identified gaps and their remediation, and whether recovery objectives were met during tests or real events. Together, these data sets tell management whether the security program is functioning as designed and where to invest."
  ],
  "terms": [
   [
    "Key performance indicator (KPI)",
    "A metric showing how well a process or control is achieving its goal, typically based on past performance."
   ],
   [
    "Key risk indicator (KRI)",
    "A forward-looking metric signaling rising risk that may exceed the organization's risk appetite."
   ],
   [
    "Backup verification",
    "Confirming through test restores and integrity checks that backups can actually recover data within objectives."
   ],
   [
    "Management review",
    "Documented oversight by leadership, such as approving policies, risk acceptances and reviewing metrics."
   ],
   [
    "Dormant account",
    "An account that has not been used for an extended period and should be reviewed or disabled."
   ]
  ],
  "example": "A CISO's quarterly board report shows three KPIs (patch compliance at 94 percent, mean time to contain incidents down to four hours, 98 percent training completion) and two KRIs (internet-facing assets without an owner rising from 3 to 11, and phishing click rate climbing). It also notes that a test restore of the ERP database took nine hours against a six-hour RTO, prompting a funding request.",
  "tip": "KPIs measure performance against a goal (how well are we doing); KRIs warn that risk is rising (what might go wrong). For backups, the only real proof is a successful test restore.",
  "check": [
   [
    "Is 'number of critical vulnerabilities on internet-facing servers is increasing' a KPI or a KRI?",
    "A KRI, because it signals growing risk exposure rather than measuring process performance against a target."
   ],
   [
    "What is the best evidence that backups are effective?",
    "Documented successful test restores within the recovery time objective, not just successful backup job logs."
   ],
   [
    "Give one account management metric an auditor might collect.",
    "Examples: time to disable accounts after termination, number of orphaned or dormant accounts, or access review completion rate."
   ]
  ]
 },
 {
  "t": "Analyzing test output and generating reports; exception handling and remediation",
  "body": [
   "Testing produces raw data, not answers. Scanners output thousands of findings, penetration testers produce evidence and notes, and logs produce alerts. Turning this into decisions requires analysis, prioritization and clear reporting, followed by a disciplined process to fix issues or formally accept them.",
   "Analysis starts with validating results. Remove false positives by confirming findings manually or with additional evidence, and consider false negatives, such as systems that were offline during a scan. Then prioritize. A severity score such as CVSS describes the technical characteristics of a vulnerability, but risk depends on context: how critical and exposed the asset is, whether an exploit is known to be used in the wild, what compensating controls exist, and what data could be affected. A medium-severity flaw on an internet-facing payment server may deserve action before a critical flaw on an isolated lab machine. Look for root causes and patterns too; fifty missing patches on one server may point to a broken patch process rather than fifty separate problems.",
   "Reports should be written for their audience. An executive summary explains overall risk, the most important findings and recommended decisions in business language, without jargon. The technical sections list each finding with description, affected assets, evidence, risk rating, and specific remediation steps, so engineers can reproduce and fix it. Include scope, methodology, dates and limitations so readers know what was and was not tested. Reports contain sensitive information about weaknesses, so classify them, restrict distribution and protect them in storage and transit.",
   "Remediation assigns each finding an owner and a deadline based on risk, often defined in policy as a service level, for example critical findings within a short window and lower findings over longer periods. Track remediation in a ticketing or vulnerability management system, and verify fixes by retesting rather than accepting a note that the issue was resolved.",
   "Exception handling covers findings that cannot be fixed as required, perhaps because a legacy medical device cannot be patched or a vendor fix is not available. The owner submits an exception request describing the issue, the business reason, compensating controls (such as network isolation or additional monitoring) and a proposed expiry date. An authority with the power to accept risk, not the person who wants the exception, approves or rejects it. Exceptions should be time-limited, recorded in the risk register and reviewed, so temporary acceptance does not quietly become permanent.",
   "Finally, ethical disclosure matters when tests reveal flaws in third-party products. Report them to the vendor responsibly, following the organization's policy and any legal guidance."
  ],
  "terms": [
   [
    "False positive",
    "A reported finding that is not actually a vulnerability; must be validated and removed."
   ],
   [
    "Executive summary",
    "A concise, non-technical overview of risk and recommendations for management."
   ],
   [
    "Remediation",
    "Fixing a finding by patching, reconfiguring, or changing code or process, then verifying the fix."
   ],
   [
    "Exception",
    "A formally approved, documented and time-limited deviation from a requirement, usually with compensating controls."
   ],
   [
    "Risk-based prioritization",
    "Ordering findings by severity combined with asset criticality, exposure and threat context."
   ]
  ],
  "example": "A scan of a factory network returns 1,200 findings. The analyst removes duplicates and false positives, then groups the rest: most are missing patches on workstations that the patch tool never reached, a single root cause. A programmable logic controller cannot be patched, so the plant manager requests an exception, the risk owner approves it for six months with the device isolated on its own segment and monitored, and it is logged in the risk register.",
  "tip": "Exceptions need approval from someone with authority to accept the risk, compensating controls, documentation and an expiry date. Remediation is not done until a retest verifies it.",
  "check": [
   [
    "Why isn't CVSS severity alone enough to prioritize remediation?",
    "It describes technical severity, but actual risk depends on asset value, exposure, active exploitation and existing controls."
   ],
   [
    "Who should approve a security exception?",
    "A person with authority to accept the risk on behalf of the organization, such as the asset or risk owner at an appropriate management level, not the requester alone."
   ],
   [
    "What should an executive summary contain?",
    "Overall risk posture, the most significant findings and recommended decisions, written in business terms without technical detail."
   ]
  ]
 },
 {
  "t": "Conducting or facilitating security audits: SOC 1/SOC 2/SOC 3, Type I vs Type II",
  "body": [
   "When an organization relies on a service provider, such as a payroll processor, cloud host or data center, it cannot audit that provider's controls itself in most cases. Instead, the provider engages an independent auditor to evaluate its controls and issue a report customers can rely on. In the United States and widely around the world, these are System and Organization Controls (SOC) reports, issued by certified public accountants under standards from the American Institute of Certified Public Accountants (AICPA). Internationally, similar attestations exist under ISAE 3402. The CISSP exam focuses on the SOC report types and on Type I versus Type II.",
   "SOC 1 reports address controls relevant to a customer's internal control over financial reporting. If your payroll provider's errors could misstate your financial statements, your financial auditors will want the provider's SOC 1. It is restricted in distribution to the service organization, its customers and their auditors.",
   "SOC 2 reports address controls relevant to security, availability, processing integrity, confidentiality and privacy, known as the Trust Services Criteria. Security (the common criteria) is always included; the others are added depending on the service. SOC 2 is the report most relevant to security professionals evaluating a SaaS or cloud provider. It contains detailed descriptions of the system, the controls, the auditor's tests and any exceptions found, so it is sensitive and typically shared only under a nondisclosure agreement.",
   "SOC 3 reports cover the same Trust Services Criteria as SOC 2 but are general-use summaries without the detailed control descriptions and test results. Providers often publish them on their websites or use them for marketing. They show that an audit occurred and the opinion, but give too little detail for a thorough vendor assessment.",
   "Type I and Type II describe what the auditor evaluated. A Type I report gives an opinion on the design of controls at a specific point in time: are the controls suitably designed and in place as of this date? A Type II report gives an opinion on design and operating effectiveness over a period of time, commonly six to twelve months: did the controls actually work throughout the period, based on testing samples? Type II provides far more assurance, and a Type I is often a first step for a provider that is new to audits. SOC 1 and SOC 2 come in both types.",
   "When reviewing a SOC 2, check the report period and whether it is current, the scope (which services, locations and criteria), the auditor's opinion (unqualified is clean), any exceptions and management's responses, and the complementary user entity controls, which are the controls your organization must operate for the provider's controls to be effective. Also note carved-out subservice organizations, such as the cloud platform the provider runs on, which may need their own reports."
  ],
  "terms": [
   [
    "SOC 1",
    "A report on a service organization's controls relevant to customers' financial reporting; restricted distribution."
   ],
   [
    "SOC 2",
    "A detailed, restricted report on controls against the Trust Services Criteria: security, availability, processing integrity, confidentiality, privacy."
   ],
   [
    "SOC 3",
    "A general-use summary report on the Trust Services Criteria, suitable for public distribution."
   ],
   [
    "Type I vs Type II",
    "Type I assesses control design at a point in time; Type II assesses design and operating effectiveness over a period."
   ],
   [
    "Complementary user entity controls",
    "Controls the customer must implement for the service provider's controls to achieve their objectives."
   ]
  ],
  "example": "A company choosing a cloud HR platform asks two finalists for audit reports. One offers only a SOC 3 from its website; the other provides a SOC 2 Type II covering the past twelve months under NDA, with two minor exceptions and management's remediation. The security team prefers the second and notes that the report requires customers to manage their own user provisioning and MFA settings.",
  "tip": "For evaluating a vendor's security controls, the best report is a SOC 2 Type II. SOC 1 is about financial reporting, SOC 3 is a public summary, and Type II covers effectiveness over a period while Type I is a point-in-time design review.",
  "check": [
   [
    "Which SOC report would a security team request to assess a SaaS provider's security controls in detail?",
    "A SOC 2 Type II, which covers the Trust Services Criteria and tests operating effectiveness over a period."
   ],
   [
    "What is the key difference between Type I and Type II?",
    "Type I evaluates control design at a single point in time; Type II evaluates design and operating effectiveness over a period, typically six to twelve months."
   ],
   [
    "Why is a SOC 3 of limited use for vendor due diligence?",
    "It is a high-level general-use summary without detailed control descriptions, tests or exceptions."
   ]
  ]
 },
 {
  "t": "Location of audits: on premises, cloud, hybrid",
  "body": [
   "Where systems live changes how you audit them. Traditional audits assumed the organization owned the building, the servers and the network, so auditors could walk the data center, inspect configurations and interview administrators directly. Cloud and hybrid environments split control between the organization and providers, and the audit approach must follow that split.",
   "On-premises audits give the organization full access and full responsibility. Auditors can examine physical security of facilities, environmental controls, hardware inventory, network devices, system configurations, logs and processes end to end. The challenge is breadth: every layer from the building to the application is the organization's to control and prove.",
   "Cloud audits are shaped by the shared responsibility model. The provider is responsible for security of the cloud: physical data centers, hardware, the virtualization layer and, depending on the service model, more. The customer is responsible for security in the cloud: its data, identities, configurations and, in infrastructure as a service, operating systems and applications. Responsibility shifts with the service model: in IaaS the customer manages much of the stack; in PaaS the provider manages the operating system and runtime; in SaaS the customer mostly manages users, access and data. Large providers do not allow individual customers to audit their data centers, both for security and scale reasons. Instead, customers rely on third-party attestations such as SOC 2 Type II reports, ISO/IEC 27001 certification and other industry programs, often obtained through the provider's compliance portal. The Cloud Security Alliance's Cloud Controls Matrix and its STAR registry help structure and compare provider assurance.",
   "For its own side of the model, the customer audits through the provider's management interfaces and APIs: identity and access configurations, logging settings, encryption and key management, network security groups and storage permissions. Cloud security posture management tools automate these checks continuously. Right-to-audit clauses in contracts, where negotiable, define what evidence the provider must supply. Data location, residency and jurisdiction are also audit concerns, because regulations may restrict where data is stored or processed.",
   "Hybrid environments combine on-premises and cloud, and audits must cover both plus the connections between them: VPNs or dedicated links, identity federation, synchronized directories and data flows. The seams are where gaps appear, such as an on-premises account disabled at termination while its synchronized cloud identity or long-lived API token remains active. A hybrid audit plan should map each control to who operates it, where evidence comes from and how consistency is verified across environments.",
   "In all cases, define scope clearly, identify responsibility for each control, and obtain evidence appropriate to the location."
  ],
  "terms": [
   [
    "Shared responsibility model",
    "The division of security duties between cloud provider and customer, varying by IaaS, PaaS or SaaS."
   ],
   [
    "Right-to-audit clause",
    "A contract term granting the customer rights to audit or obtain audit evidence from a provider."
   ],
   [
    "Attestation",
    "An independent third party's report or certification that a provider's controls meet defined criteria."
   ],
   [
    "Data residency",
    "Requirements concerning the geographic location where data is stored or processed."
   ],
   [
    "Hybrid environment",
    "An architecture combining on-premises and cloud resources connected by network and identity links."
   ]
  ],
  "example": "An insurer moving claims processing to a cloud platform cannot inspect the provider's data centers, so its auditors review the provider's SOC 2 Type II and ISO 27001 certificate for physical and infrastructure controls. They then audit the insurer's own responsibilities directly: IAM policies, logging, encryption keys and storage settings. The hybrid review also checks that directory synchronization removes cloud access when on-premises accounts are disabled.",
  "tip": "In the cloud you usually cannot audit the provider directly; you rely on third-party attestations for the provider's side and audit your own configurations for your side. Know how responsibility shifts across IaaS, PaaS and SaaS.",
  "check": [
   [
    "How does a customer gain assurance over a major cloud provider's physical data center security?",
    "By reviewing independent attestations such as SOC 2 Type II reports and ISO/IEC 27001 certification, since direct audits are generally not permitted."
   ],
   [
    "In a SaaS model, what does the customer typically remain responsible for?",
    "Its data, user identities and access management, and the configuration settings exposed to it."
   ],
   [
    "What unique area must a hybrid audit cover?",
    "The connections and integrations between environments, such as network links, identity synchronization and federation, and data flows."
   ]
  ]
 },
 {
  "t": "Investigations: evidence collection and handling, chain of custody, digital forensics tools and techniques",
  "body": [
   "Security operations teams are often the first to discover an incident that turns into an investigation. Whether the matter ends up as an internal disciplinary action, a civil lawsuit, a regulatory inquiry or a criminal prosecution, evidence must be collected and handled in a way that preserves its integrity and admissibility. Mistakes in the first hours can make evidence useless later.",
   "Start by understanding what makes evidence usable. It must be relevant (related to the facts), reliable (accurate and not altered), and legally obtained, and courts consider whether it is authentic and complete. Types of evidence include real evidence (physical objects such as a laptop), documentary evidence (records and logs), and testimonial evidence (witness statements). Computer logs are usually documentary evidence, and business records created in the normal course of operations are generally more readily accepted.",
   "Collection follows the order of volatility: capture the most fleeting data first. CPU and memory contents, running processes and network connections disappear at shutdown, so capture memory with a trusted tool before deciding whether to power off. Then capture temporary files, disk contents, remote logs and archived media. Photograph the scene and screens, note system time against a trusted clock, and document every action. Work on copies, not originals: create a bit-for-bit forensic image of storage using a write blocker, which prevents any change to the original media, and compute cryptographic hashes of the original and the image so you can prove they match.",
   "Chain of custody is the documented record of who collected, handled, transferred and stored each item of evidence, when and why. Every handoff is signed and dated, evidence is sealed in tamper-evident bags with labels, and it is stored in a secured location with controlled access. A gap in the chain gives the opposing side grounds to argue the evidence was altered.",
   "Forensic analysis uses specialized tools and techniques. Disk imaging and analysis suites recover deleted files, examine file system metadata and build timelines from timestamps. Memory analysis tools reveal injected code, hidden processes and encryption keys. Network forensics uses packet captures and flow data to reconstruct communications. Mobile and cloud forensics require their own tools and often provider cooperation. Analysts correlate these sources into a timeline, always on verified copies, and document methods so another examiner could reproduce the results.",
   "Know the legal backdrop: an investigation's type determines the burden of proof, from preponderance of the evidence in civil cases to beyond a reasonable doubt in criminal ones. Involve legal counsel early, consider when to engage law enforcement, respect privacy law and employee policies, and remember that entrapment (inducing someone to commit a crime) is prohibited while enticement (leaving an opportunity, as a honeypot does) is generally acceptable."
  ],
  "terms": [
   [
    "Chain of custody",
    "Documentation of every person who handled evidence, when, and for what purpose, proving it was not altered."
   ],
   [
    "Write blocker",
    "A hardware or software device that allows reading storage media while preventing any writes to it."
   ],
   [
    "Forensic image",
    "A bit-for-bit copy of storage media, verified with hashes, used for analysis instead of the original."
   ],
   [
    "Order of volatility",
    "The sequence for collecting evidence from most to least fleeting, starting with memory."
   ],
   [
    "Enticement vs entrapment",
    "Enticement offers an opportunity to someone already intending wrongdoing; entrapment induces someone to commit a crime they otherwise would not."
   ]
  ],
  "example": "An analyst suspects an employee of stealing designs. With HR and legal approval, she captures memory from the running workstation, then images the drive through a write blocker, recording SHA-256 hashes of both. She seals the drive in a labeled evidence bag, logs the transfer to the evidence locker on the chain-of-custody form, and performs all analysis on a verified copy.",
  "tip": "Always work from a verified copy, never the original, and keep an unbroken chain of custody. When asked what to collect first, choose the most volatile data, usually memory.",
  "check": [
   [
    "Why compute hashes of both the original media and the forensic image?",
    "Matching hashes prove the image is an exact copy and that neither has been altered, supporting integrity and admissibility."
   ],
   [
    "What is the risk of a gap in the chain of custody?",
    "The evidence can be challenged as possibly tampered with or unreliable, and may be excluded or given less weight."
   ],
   [
    "What should be collected first from a running compromised system?",
    "Volatile data such as memory contents, running processes and network connections, following the order of volatility."
   ]
  ]
 },
 {
  "t": "Logging and monitoring: SIEM, SOAR, continuous monitoring, UEBA, threat intelligence and hunting",
  "body": [
   "Logging records events; monitoring watches them for meaning. Together they are how a security operations center (SOC) detects attacks, supports investigations and demonstrates accountability. The CISSP exam expects you to know the tools that make this work at scale and how they fit together.",
   "A security information and event management (SIEM) system collects logs and events from many sources, such as servers, endpoints, firewalls, identity providers and cloud services, normalizes them into a common format, stores them for search and retention, and correlates them to detect patterns no single source would reveal. A correlation rule might combine a burst of failed logins, a successful login from a new country and a privilege change within ten minutes into one high-priority alert. SIEMs also provide dashboards and reporting for compliance. Their value depends on good inputs (the right sources, synchronized time, parsed fields) and on tuning to reduce false positives, because an overwhelmed analyst team suffers alert fatigue and misses real attacks.",
   "Security orchestration, automation and response (SOAR) platforms act on alerts. They integrate with other tools through APIs and run playbooks: for a phishing report, a playbook might extract links and attachments, check them against threat intelligence, search for other recipients, quarantine the message across mailboxes and open a ticket, asking a human to approve only the disruptive steps. SOAR reduces response time and repetitive work and makes responses consistent. The distinction to remember: SIEM aggregates and correlates to detect; SOAR orchestrates and automates the response.",
   "Continuous monitoring is the ongoing awareness of security posture, vulnerabilities and threats to support risk decisions, described in NIST guidance on information security continuous monitoring (ISCM). Rather than a point-in-time assessment every few years, controls, configurations and assets are checked continuously or at defined frequencies, and results feed risk management. Egress monitoring, watching data leaving the network through data loss prevention and outbound traffic analysis, is part of this.",
   "User and entity behavior analytics (UEBA) builds baselines of normal behavior for users, hosts and service accounts and flags deviations, such as an accountant downloading engineering files at midnight or a service account logging in interactively. UEBA helps detect insider threats and compromised credentials that rule-based detection misses.",
   "Threat intelligence is evidence-based knowledge about adversaries, their tools, techniques and indicators. It comes as strategic (trends for executives), operational (campaigns), tactical (techniques and procedures) and technical indicators of compromise (IOCs) such as malicious hashes, domains and addresses. Feeds are often shared in standard formats such as STIX over TAXII. Threat hunting is the proactive, human-led search for attackers who have evaded existing detections. Hunters form a hypothesis, often from intelligence or an ATT&CK technique, search the data to confirm or refute it, and convert findings into new automated detections. Hunting assumes compromise rather than waiting for an alert."
  ],
  "terms": [
   [
    "SIEM",
    "Security information and event management: collects, normalizes, stores and correlates logs to detect and report security events."
   ],
   [
    "SOAR",
    "Security orchestration, automation and response: integrates tools and runs playbooks to automate and coordinate responses."
   ],
   [
    "UEBA",
    "User and entity behavior analytics: baselines normal behavior and flags anomalies for users and devices."
   ],
   [
    "Indicator of compromise (IOC)",
    "An artifact such as a file hash, domain or IP address that suggests a system has been compromised."
   ],
   [
    "Threat hunting",
    "Proactive, hypothesis-driven searching for threats that have evaded automated detection."
   ]
  ],
  "example": "A UEBA alert flags a finance user accessing hundreds of files outside normal hours. The SIEM correlates this with a login from an unfamiliar device, and a SOAR playbook automatically disables the session, requires the user to reauthenticate with a security key, and opens an incident. Hunters then search for the same device fingerprint across other accounts and write a new detection rule from what they find.",
  "tip": "SIEM detects by collecting and correlating; SOAR responds through automation and orchestration. Threat hunting is proactive and human-driven, starting from a hypothesis, while monitoring waits for alerts.",
  "check": [
   [
    "What is the main difference between a SIEM and a SOAR platform?",
    "A SIEM aggregates and correlates events to detect incidents; a SOAR platform orchestrates tools and automates response actions through playbooks."
   ],
   [
    "What kind of threat is UEBA especially good at detecting?",
    "Insider threats and compromised accounts whose activity deviates from normal behavior but does not match known signatures."
   ],
   [
    "How does threat hunting differ from alert-driven monitoring?",
    "Hunting is proactive: analysts form hypotheses and search for undetected threats rather than waiting for automated alerts."
   ]
  ]
 },
 {
  "t": "Configuration management: provisioning, baselining, automation",
  "body": [
   "Configuration management (CM) keeps systems in a known, approved and secure state throughout their lives. Many breaches trace back to misconfigurations: default passwords left in place, unnecessary services running, storage made public by mistake, or one server that drifted away from the hardened standard. CM gives you consistency, which makes systems easier to secure, audit and recover.",
   "It starts with an accurate inventory. You need to know what assets exist, who owns them, and their configuration items (CIs), such as hardware, operating system version, installed software and settings. Many organizations record these in a configuration management database (CMDB), which also supports incident response and change management by showing dependencies.",
   "Provisioning is deploying new systems securely. Rather than building each server by hand, organizations use approved images or templates, sometimes called golden images, that are already hardened: unnecessary services disabled, default accounts removed or renamed, logging enabled, security agents installed and current patches applied. Provisioning should place the system into the right network segment, register it in inventory and monitoring, and assign an owner. In cloud environments this is done with infrastructure as code (IaC), where templates describe the desired resources and settings, making deployments repeatable and reviewable like software.",
   "Baselining defines the minimum security configuration that a type of system must meet. Baselines are often derived from sources such as CIS Benchmarks, vendor security guides or government configuration guides, then tailored to the organization. A baseline is also a snapshot used for comparison: after deployment, systems are scanned against it to detect drift, meaning unauthorized or accidental changes. Drift may indicate a lapse in process or an attacker's modification, so both need investigation. Baselines themselves are updated through change management as threats and software evolve.",
   "Automation makes CM reliable at scale. Configuration management tools can apply the desired state to thousands of machines and automatically correct drift. Group policy enforces settings on Windows domains. Immutable infrastructure goes further: instead of patching or changing a running server, you build a new one from an updated image and replace the old one, so production systems are never modified in place. Automation must itself be secured, because the automation server and its credentials can change everything; protect it with strong access control, code review of templates and audit logs.",
   "CM is closely tied to change management. Configuration management knows what the approved state is; change management controls how that state is modified. Together they ensure that every change is requested, assessed, approved, tested, implemented, documented and reflected in the baseline."
  ],
  "terms": [
   [
    "Baseline",
    "A documented, approved minimum security configuration used to build systems and detect deviations."
   ],
   [
    "Configuration drift",
    "Divergence of a system's actual configuration from its approved baseline over time."
   ],
   [
    "Golden image",
    "A pre-hardened, approved system template used to provision new systems consistently."
   ],
   [
    "Infrastructure as code (IaC)",
    "Defining infrastructure in machine-readable templates so it can be versioned, reviewed and deployed repeatably."
   ],
   [
    "Configuration item (CI)",
    "Any component under configuration management, recorded with its attributes in a CMDB."
   ]
  ],
  "example": "A retailer builds every web server from an IaC template and a hardened image. A nightly compliance scan finds that one server has an extra administrative account and remote desktop enabled, neither in the baseline and no change ticket exists. The configuration tool reverts the settings, and the security team treats the drift as a possible intrusion and investigates.",
  "tip": "A baseline is both the secure starting point and the yardstick for detecting drift. Unauthorized changes found by comparison should be investigated as potential incidents, not just corrected.",
  "check": [
   [
    "What is configuration drift and why does it matter?",
    "The gradual deviation of a system from its approved baseline; it weakens security and may indicate unauthorized or malicious changes."
   ],
   [
    "What advantage does immutable infrastructure offer?",
    "Systems are replaced from updated images rather than modified in place, so production stays consistent and unauthorized changes do not persist."
   ],
   [
    "How do configuration management and change management relate?",
    "Configuration management defines and tracks the approved state; change management controls and documents modifications to that state."
   ]
  ]
 },
 {
  "t": "Foundational operations concepts: need to know, least privilege, separation of duties, job rotation, SLAs",
  "body": [
   "Security operations rest on a handful of principles that limit what any one person or process can do and make misuse harder to hide. They show up throughout the exam, often in scenario questions where you must pick the principle a control enforces or the one that was violated.",
   "Need to know restricts access to specific information to those whose duties require it. Even a person with a top-level clearance or broad role does not automatically see everything at that level; they see only what their task demands. Least privilege is broader: subjects receive only the minimum permissions and rights, for the minimum time, needed to perform their function. A help desk technician can reset passwords but not modify firewall rules. Least privilege applies to service accounts and applications too, and it limits the damage from mistakes, malware and compromised accounts.",
   "Separation (or segregation) of duties divides a sensitive task among two or more people so that no single person can complete it alone and commit fraud or cause serious harm undetected. Classic examples are separating the person who creates a vendor from the one who approves payments, and the developer who writes code from the operator who deploys it to production. Related controls include two-person integrity (two people must be present, as in accessing a vault) and split knowledge, where no one person knows a complete secret, such as a key split between custodians. Separation of duties can be defeated by collusion, where people cooperate to commit fraud, so it is combined with monitoring and job rotation.",
   "Job rotation moves people through different roles periodically. It provides cross-training and resilience, since knowledge is not trapped with one person, and it helps detect fraud because a successor may notice irregularities. Mandatory vacations serve a similar detective purpose: requiring employees to take consecutive days off means someone else performs their duties and may uncover schemes that require constant attention to conceal. Privileged account monitoring completes the picture by watching those with elevated access most closely.",
   "Service level agreements (SLAs) are formal agreements between a service provider and customer defining expected service levels, such as availability percentage, response and resolution times for incidents, and penalties or remedies when targets are missed. Internally, operational level agreements (OLAs) set commitments between teams that support the SLA. Security-relevant SLA terms include incident notification times, patching windows and data return on termination. Monitor SLAs with metrics rather than assuming they are met, and ensure contracts give you the right to verify.",
   "These principles also connect to the information lifecycle and to managing privileged users through careful hiring, monitoring and prompt removal of access."
  ],
  "terms": [
   [
    "Need to know",
    "Access to specific information only when required for one's duties, regardless of clearance level."
   ],
   [
    "Least privilege",
    "Granting only the minimum rights and permissions needed for a task, for the minimum time."
   ],
   [
    "Separation of duties",
    "Dividing critical tasks among multiple people so no one can complete them alone; defeated only by collusion."
   ],
   [
    "Job rotation",
    "Periodically moving staff between roles to cross-train and to help detect fraud."
   ],
   [
    "Service level agreement (SLA)",
    "A contract defining expected service levels, measurement and remedies between provider and customer."
   ]
  ],
  "example": "At a credit union, one clerk can create new payees and another must approve transfers above a threshold. Tellers rotate branches every few months and must take two consecutive weeks of vacation each year. During one clerk's vacation, her replacement notices a pattern of small transfers to a payee with no supporting documents, uncovering fraud that separation of duties alone had not stopped because two employees colluded.",
  "tip": "Separation of duties is a preventive control defeated by collusion; job rotation and mandatory vacations are primarily detective controls for fraud. Need to know limits information; least privilege limits permissions.",
  "check": [
   [
    "What weakness of separation of duties do job rotation and mandatory vacations help address?",
    "Collusion and ongoing concealed fraud, because a different person performing the duties may detect irregularities."
   ],
   [
    "A system administrator with full server rights reads HR salary files she has no work reason to see. Which principle was violated?",
    "Need to know, and more broadly least privilege, since her duties did not require access to that information."
   ],
   [
    "What should a security-conscious organization include in an SLA with a managed service provider?",
    "Examples: availability targets, incident notification timeframes, response and resolution times, patching commitments, remedies for missed targets, and audit rights."
   ]
  ]
 },
 {
  "t": "Resource protection: media management, backups",
  "body": [
   "Resource protection covers the assets operations teams handle daily: hardware, software and especially the media that store information, including hard drives, solid-state drives, tapes, USB drives, optical discs, mobile devices and printed documents. Media carry data wherever they go, so they must be protected through their whole lifecycle from acquisition to destruction.",
   "Media management starts with labeling media with the classification of the data they hold, so handlers know the protection required. Store media in secured, environmentally appropriate locations, with access limited to authorized staff. Track media in an inventory, log check-in and check-out, and use tamper-evident containers and trusted couriers when transporting media offsite. Encrypt media, especially portable devices and backup media, so loss or theft does not become a breach. Restrict or control removable media on endpoints through device control policies, since USB drives are both a data loss path and a malware vector.",
   "Media sanitization prevents data remanence, the residual data that remains after deletion. NIST SP 800-88 describes three levels. Clearing uses logical techniques such as overwriting to protect against simple, non-invasive recovery and is suitable when media stay within the organization. Purging uses stronger methods, such as cryptographic erase or degaussing magnetic media, to protect against laboratory recovery, and is appropriate before media leave organizational control. Destruction physically renders the media unusable through shredding, disintegration, pulverizing or incineration. Solid-state drives complicate matters because wear leveling means overwriting may not reach all cells, so use built-in sanitize commands, cryptographic erase or destruction. Degaussing does not work on SSDs or optical media. Document sanitization with certificates or logs.",
   "Backups protect availability and integrity of data. A sound backup strategy considers what to back up, how often (driven by the recovery point objective, the acceptable amount of data loss), how quickly it must be restorable (driven by the recovery time objective), and where copies are kept. The widely cited 3-2-1 rule suggests at least three copies of data, on two different types of media, with one offsite. Modern guidance adds an immutable or offline copy that ransomware cannot encrypt or delete, since attackers now target backup systems deliberately.",
   "Protect backups as carefully as production data: encrypt them, restrict and monitor access to backup consoles, separate backup administrator credentials from domain administrator accounts, and keep retention aligned with legal and business requirements. Above all, test restores regularly; a backup that has not been restored is unproven. Backup media reaching end of life must be sanitized according to the same rules as any other media."
  ],
  "terms": [
   [
    "Data remanence",
    "Residual data remaining on media after deletion or formatting, which may be recoverable."
   ],
   [
    "Clearing / purging / destruction",
    "NIST SP 800-88 sanitization levels, from logical overwriting, to methods defeating laboratory recovery, to physical destruction."
   ],
   [
    "Degaussing",
    "Erasing magnetic media with a strong magnetic field; ineffective on SSDs and optical media."
   ],
   [
    "Cryptographic erase",
    "Sanitizing encrypted media by securely destroying the encryption keys, making the data unreadable."
   ],
   [
    "3-2-1 backup rule",
    "Keep three copies of data on two media types with one copy offsite; often extended with an immutable or offline copy."
   ]
  ],
  "example": "A law firm retires a batch of laptops with self-encrypting SSDs. Because the drives will leave the firm's control through a recycler, IT performs cryptographic erase, verifies the result, records serial numbers on sanitization certificates and physically shreds the few drives that failed verification. Meanwhile its backups go to an immutable cloud vault in addition to a local appliance, and restores are tested monthly.",
  "tip": "Match sanitization to where media go next: clearing for reuse inside the organization, purging before release outside, destruction when media are highly sensitive or cannot be reliably purged. Remember degaussing does not work on SSDs.",
  "check": [
   [
    "Why is overwriting not always reliable for SSDs?",
    "Wear leveling and over-provisioning mean some cells may not be overwritten, so sanitize commands, cryptographic erase or physical destruction are preferred."
   ],
   [
    "What backup practice most directly protects against ransomware destroying backups?",
    "Keeping an immutable or offline (air-gapped) copy that attackers cannot modify or delete, with separate backup credentials."
   ],
   [
    "Which sanitization level is appropriate for media being sold to the public?",
    "Purging (or destruction), because the media leave organizational control and must resist laboratory recovery."
   ]
  ]
 },
 {
  "t": "Incident management: detection, response, mitigation, reporting, recovery, remediation, lessons learned",
  "body": [
   "Incident management is the organized approach to handling security incidents so damage is limited, recovery is quick and the organization learns from each event. An event is any observable occurrence, such as a login or a file access. An incident is an event or series of events that actually or potentially jeopardizes confidentiality, integrity or availability, or violates policy. Not every event is an incident, and part of the process is making that call quickly and consistently.",
   "Preparation comes before any incident: an approved policy and plan, a defined incident response team with roles and authority, contact lists including legal, public relations, management and external parties, tools, playbooks for likely scenarios, and training and exercises. The CISSP outline then lists the phases in this order: detection, response, mitigation, reporting, recovery, remediation and lessons learned. Other frameworks, such as NIST SP 800-61, group similar steps as preparation; detection and analysis; containment, eradication and recovery; and post-incident activity.",
   "Detection identifies potential incidents through alerts from monitoring tools, user reports, or external notifications, and analysis confirms whether an incident is real and how serious it is. Triage assigns severity based on impact and scope. Response activates the team and begins handling the incident according to the plan, including preserving evidence in case it is needed later.",
   "Mitigation contains the incident to prevent further damage: isolating infected hosts from the network, disabling compromised accounts, blocking malicious domains. Containment decisions balance stopping harm against preserving evidence and business needs; unplugging a server may stop damage but destroy volatile evidence and disrupt customers. Reporting happens throughout: internal escalation to management, and external reporting to regulators, law enforcement, customers or partners as laws and contracts require, often within strict deadlines. Legal counsel should guide external notifications.",
   "Recovery restores affected systems to normal operation, such as rebuilding from known-good images, restoring data from clean backups and monitoring closely for signs of reinfection. Remediation addresses root causes so the incident cannot recur the same way, such as patching the exploited vulnerability, fixing the misconfiguration or improving a control. Eradication of the attacker's footholds, such as removing malware and backdoor accounts, must be complete before systems return to production.",
   "Lessons learned is the post-incident review, ideally held soon after the incident while details are fresh. The team examines what happened, what went well, what did not, and what should change in controls, plans, tools and training. It is blameless in spirit, focusing on process improvement. Outputs include an incident report, updated playbooks and tracked improvement actions. Skipping this step is the most common reason organizations suffer the same incident twice."
  ],
  "terms": [
   [
    "Event vs incident",
    "An event is any observable occurrence; an incident is an event that harms or threatens CIA or violates policy."
   ],
   [
    "Containment (mitigation)",
    "Actions that limit an incident's spread and damage, such as isolating hosts or disabling accounts."
   ],
   [
    "Remediation",
    "Fixing the root cause so the incident cannot recur in the same way."
   ],
   [
    "Triage",
    "Rapidly assessing and prioritizing an incident based on impact and urgency."
   ],
   [
    "Lessons learned",
    "A post-incident review that identifies improvements to controls, processes and plans."
   ]
  ],
  "example": "A ransomware alert fires on a file server at 6 a.m. The on-call analyst confirms encryption activity, isolates the server and the originating workstation, disables the compromised account and notifies the incident manager, who informs legal and executives. The team restores clean data from immutable backups, patches the exploited VPN appliance, meets the regulator's notification deadline and, a week later, holds a lessons-learned meeting that leads to MFA on all remote access.",
  "tip": "The first priority in most incident questions is containment to limit damage, after confirming it is an incident. Lessons learned is the phase organizations most often skip and the one that prevents recurrence.",
  "check": [
   [
    "What is the difference between recovery and remediation?",
    "Recovery restores systems and operations to normal; remediation fixes the underlying root cause so the incident does not recur."
   ],
   [
    "Why might an analyst avoid immediately powering off a compromised server?",
    "Powering off destroys volatile evidence such as memory contents, and may disrupt business; isolation from the network can contain it while preserving evidence."
   ],
   [
    "What is the purpose of the lessons-learned phase?",
    "To review the incident and response, identify what to improve, and update controls, plans and training to prevent recurrence and respond better."
   ]
  ]
 },
 {
  "t": "Detective and preventive measures: firewalls, IDS/IPS, allow and deny lists, sandboxing, honeypots, anti-malware, ML/AI tools",
  "body": [
   "Security operations deploy layers of controls that either stop malicious activity (preventive) or identify it so humans and systems can respond (detective). Many tools can do both depending on configuration. The exam expects you to know what each tool does, where it sits and its limitations.",
   "Firewalls enforce rules about which traffic may pass between network zones. Packet-filtering firewalls examine addresses, ports and protocols statelessly. Stateful inspection firewalls track connections, allowing return traffic for established sessions. Application-level proxies and next-generation firewalls understand application protocols and can identify applications and users, inspect content and integrate threat intelligence. Web application firewalls (WAFs) protect web applications from attacks such as injection. Firewalls are preventive, and their logs are a valuable detective source. A default-deny rule set with explicit allows is the secure stance.",
   "Intrusion detection systems (IDS) monitor traffic or host activity and alert on suspicious behavior; they are detective and passive. Intrusion prevention systems (IPS) sit inline and can block traffic, making them preventive, but a false positive can block legitimate business traffic. Both may be network-based (NIDS/NIPS) or host-based (HIDS/HIPS). Detection methods include signature-based, which matches known attack patterns and misses new attacks, and anomaly- or behavior-based, which compares activity to a baseline and can catch novel attacks but generates more false positives.",
   "Allow lists (whitelists) permit only approved items, such as applications, domains or addresses, and deny everything else; they are strong but require maintenance. Deny lists (blacklists) block known-bad items and allow everything else; they are easier but cannot stop unknown threats. Application allow listing on critical servers is one of the most effective controls against malware.",
   "Sandboxing runs suspicious code or files in an isolated environment to observe behavior safely, as email security gateways do with attachments. Honeypots are decoy systems with no legitimate use, so any interaction is suspicious; honeynets are networks of them, and honeytokens are decoy credentials or records. They provide early warning and intelligence, and as noted in investigations, they represent enticement, not entrapment. Isolate them so an attacker cannot pivot from them.",
   "Anti-malware software detects and removes malicious code using signatures, heuristics and behavior monitoring. Endpoint detection and response (EDR) extends this with continuous recording of endpoint activity, detection of attacker techniques and response actions such as isolating a host. Machine learning and artificial intelligence tools increasingly power detection by learning patterns of normal and malicious behavior across large data sets, helping find subtle anomalies and prioritize alerts. They still produce false positives and negatives, can be evaded or poisoned by adversaries, and need human oversight, quality training data and explainability for decisions that matter."
  ],
  "terms": [
   [
    "IDS vs IPS",
    "An IDS detects and alerts passively; an IPS sits inline and can block traffic actively."
   ],
   [
    "Signature-based detection",
    "Matching known attack patterns; accurate for known threats but blind to new ones."
   ],
   [
    "Anomaly-based detection",
    "Flagging deviations from a behavioral baseline; can catch novel attacks but produces more false positives."
   ],
   [
    "Allow list",
    "A list of explicitly approved items; everything not on it is denied."
   ],
   [
    "Honeypot",
    "A decoy system with no production purpose, used to detect and study attackers."
   ]
  ],
  "example": "A manufacturer places an IPS inline at its internet edge and a network IDS on an internal span port. It enforces application allow listing on the servers that control production lines, detonates email attachments in a sandbox, and deploys a few honeypot file servers. When a honeypot records a login attempt from an office laptop, EDR telemetry shows credential-dumping behavior, and the analyst isolates the laptop within minutes.",
  "tip": "IDS detects, IPS prevents. Signature detection misses zero-days; anomaly detection catches them but with more false positives. Allow listing is stronger than deny listing because it blocks the unknown.",
  "check": [
   [
    "Why might an organization deploy an IDS rather than an IPS on a sensitive network segment?",
    "An IDS cannot block legitimate traffic through false positives, so it avoids disrupting critical operations while still providing detection."
   ],
   [
    "What makes honeypot alerts high-fidelity?",
    "The honeypot has no legitimate use, so any interaction with it is suspicious."
   ],
   [
    "Which is more effective against unknown malware, an allow list or a deny list?",
    "An allow list, because anything not explicitly approved, including new malware, is blocked."
   ]
  ]
 },
 {
  "t": "Patch and vulnerability management; change management",
  "body": [
   "Vulnerabilities are discovered in software constantly, and attackers are quick to exploit them. Patch and vulnerability management is the continuous process of finding, prioritizing and fixing weaknesses. Change management is the discipline that ensures fixes and every other modification are made safely. The two are tightly linked: a patch is a change, and an unmanaged change can create new vulnerabilities or outages.",
   "Vulnerability management is broader than patching. It begins with an accurate asset inventory, because unknown systems are never scanned or patched. Systems are then scanned regularly, ideally with authenticated scans, and supplemented by vendor advisories and threat intelligence. Findings are prioritized by risk, combining severity (for example a CVSS score) with asset criticality, exposure to the internet, and whether the vulnerability is being actively exploited. Remediation options include applying a patch, changing a configuration, upgrading or replacing software, or applying compensating controls such as isolation when no fix exists. Finally, results are verified by rescanning, and metrics such as time to remediate are reported.",
   "Patch management is the process of acquiring, testing and deploying updates. A typical cycle is: evaluate each patch's applicability and urgency, test it in a non-production environment that mirrors production, approve it through change management, deploy it in stages (a pilot group first), verify success and monitor for problems, and have a rollback plan. Emergency patches for actively exploited critical flaws follow an expedited path but still require approval and documentation. Automated patch tools, reporting and audits confirm coverage. Zero-day vulnerabilities, which are exploited before a patch exists, require compensating controls and heightened monitoring until a fix is available.",
   "Change management provides structured control over modifications to systems, applications and infrastructure. The usual steps are: a change is requested with a description, justification and rollback plan; its impact and risk are assessed; a change advisory board (CAB) or designated authority approves or rejects it; it is scheduled, tested and implemented, often in a maintenance window; it is documented and the configuration baseline is updated; and it is reviewed afterward. Standard changes that are low risk and repeatable can be pre-approved. Emergency changes can be implemented quickly but must be documented and reviewed after the fact.",
   "The security goals of change management are to prevent unauthorized changes, reduce outages caused by poorly planned changes, and maintain an audit trail. Changes detected without a matching approved request should be investigated, because they may indicate an attacker or an insider bypassing controls. Separation of duties applies: the person who requests or develops a change should not be the only one to approve and deploy it."
  ],
  "terms": [
   [
    "Vulnerability management",
    "The ongoing cycle of discovering, prioritizing, remediating and verifying weaknesses across assets."
   ],
   [
    "Patch management",
    "The process of evaluating, testing, approving, deploying and verifying software updates."
   ],
   [
    "Change advisory board (CAB)",
    "A group that reviews and approves changes based on their risk and impact."
   ],
   [
    "Rollback plan",
    "Documented steps to reverse a change if it causes problems."
   ],
   [
    "Zero-day",
    "A vulnerability exploited before the vendor has released a fix."
   ]
  ],
  "example": "A critical remote-code-execution flaw in a VPN appliance is announced and threat intelligence shows active exploitation. The team opens an emergency change, tests the vendor's patch on a spare unit, gets emergency approval from the CAB chair, patches overnight with a rollback plan ready, rescans to confirm, and presents the change at the next CAB meeting for retrospective review.",
  "tip": "Patches should be tested before production deployment and go through change management; emergency changes are still documented and reviewed afterward. Prioritize vulnerabilities by risk (severity plus asset value, exposure and active exploitation), not by score alone.",
  "check": [
   [
    "Why must patches be tested before wide deployment?",
    "Patches can break applications or cause outages; testing in a representative environment reduces the risk to availability."
   ],
   [
    "What should happen when a scan detects a configuration change with no approved change request?",
    "It should be investigated as a potential security incident or policy violation, then corrected or retroactively reviewed."
   ],
   [
    "What can you do about a vulnerability for which no patch exists yet?",
    "Apply compensating controls such as isolation, disabling the vulnerable feature, WAF or IPS rules, and increased monitoring until a fix is available."
   ]
  ]
 },
 {
  "t": "Recovery strategies: backup types, recovery sites, resilience, high availability",
  "body": [
   "Recovery strategies determine how quickly and completely an organization can restore operations after disruption. They are driven by the business impact analysis: the recovery time objective (RTO) sets how fast a function must be restored, the recovery point objective (RPO) sets how much data loss is tolerable, and the maximum tolerable downtime (MTD) sets the outer limit before the organization suffers unacceptable harm. RTO must be shorter than MTD. Every strategy choice is a trade-off between cost and how well it meets these objectives.",
   "Backup types differ in what they copy and how they affect restore time. A full backup copies all selected data; it is simplest to restore but takes the most time and space. An incremental backup copies only data changed since the last backup of any kind and clears the archive bit; backups are fast and small, but a restore needs the last full plus every incremental since, in order. A differential backup copies all data changed since the last full backup and does not clear the archive bit; each differential grows over the week, but a restore needs only the last full plus the latest differential. Snapshots and continuous data replication can achieve very small RPOs. Electronic vaulting sends backups in batches to an offsite location, while remote journaling transmits transaction logs frequently so the database can be replayed.",
   "Recovery sites provide somewhere to run operations if the primary site is lost. A hot site is fully equipped with hardware, software, current data and connectivity, ready within hours or less; it is the most expensive. A warm site has infrastructure and some equipment but needs data restored and configuration, typically taking days. A cold site offers space, power and environmental controls but no equipment; it is cheapest and slowest, often taking weeks. A mirrored or redundant site runs in parallel with the primary for near-zero downtime. Other options include mobile sites, reciprocal (mutual assistance) agreements with another organization, which are cheap but hard to enforce, and cloud-based recovery, which can provide hot or warm capacity on demand. Locate recovery sites far enough away that a regional disaster does not affect both.",
   "Resilience is the ability to keep operating, perhaps in degraded form, during disruption and to recover quickly. It comes from eliminating single points of failure: redundant power with uninterruptible power supplies and generators, multiple network carriers, redundant components, and distributing services across failure domains such as availability zones.",
   "High availability (HA) designs keep services running despite component failure. Clustering links servers so another node takes over if one fails; active-active clusters share load all the time, while active-passive clusters keep a standby ready. Load balancers distribute traffic and route around failed nodes. RAID (redundant array of independent disks) protects against disk failure: RAID 1 mirrors disks, RAID 5 stripes data with distributed parity and survives one disk failure, RAID 6 survives two, and RAID 0 striping offers performance but no redundancy. Remember that RAID and replication are not backups: they faithfully replicate deletions and ransomware encryption. Fault tolerance goes further than HA, continuing without any interruption when a component fails."
  ],
  "terms": [
   [
    "Incremental backup",
    "Copies data changed since the last backup of any type; fast backups, slower restores needing every incremental."
   ],
   [
    "Differential backup",
    "Copies data changed since the last full backup; restore needs only the full plus the latest differential."
   ],
   [
    "Hot / warm / cold site",
    "Recovery sites ranging from fully ready (hot) to partially equipped (warm) to space and utilities only (cold)."
   ],
   [
    "High availability",
    "Design using redundancy, clustering and failover to minimize downtime."
   ],
   [
    "RAID",
    "Redundant array of independent disks, which protects against disk failure through mirroring or parity (except RAID 0)."
   ]
  ],
  "example": "An online retailer with a four-hour RTO for its order system runs an active-active cluster across two availability zones and replicates its database to a second region, which serves as a warm site. Nightly full backups and hourly incrementals go to immutable storage. When a storage array fails, the cluster fails over without customer impact; when ransomware later corrupts replicated data, the team restores from the immutable backups.",
  "tip": "Know restore requirements: incremental needs the full plus all incrementals; differential needs the full plus the last differential. Hot sites are fastest and costliest, cold sites slowest and cheapest. RAID and replication are availability controls, not backups.",
  "check": [
   [
    "A full backup runs Sunday and incrementals run Monday to Thursday. Failure occurs Friday morning. What is needed to restore?",
    "Sunday's full backup plus the Monday, Tuesday, Wednesday and Thursday incrementals, applied in order."
   ],
   [
    "Which recovery site is cheapest and slowest to bring online?",
    "A cold site, which provides space, power and environmental controls but no equipment or data."
   ],
   [
    "Why is RAID not a substitute for backups?",
    "RAID protects against disk failure but immediately reflects deletions, corruption or encryption, so it cannot restore earlier data."
   ]
  ]
 },
 {
  "t": "Disaster recovery processes and DR plan testing (read-through, walkthrough, simulation, parallel, full interruption)",
  "body": [
   "A disaster recovery plan (DRP) describes how to restore IT systems and data after a disruptive event, such as a fire, flood, major outage or cyberattack. Where the business continuity plan keeps critical business functions operating, the DRP focuses on the technology that supports them. A plan that has never been tested is little better than no plan, so DR testing is a major exam topic.",
   "The DR process begins with response: detecting the event, assessing damage and declaring a disaster according to predefined criteria and by an authorized person. Declaration triggers the plan and often contractual arrangements such as moving to a recovery site. The plan defines personnel and roles (a DR coordinator, technical recovery teams, a salvage team that assesses the primary site), communications to employees, customers, suppliers and regulators, and the sequence for restoring systems in priority order based on the business impact analysis. Assessment determines the extent of damage and whether to recover in place or move. Restoration brings systems back at the alternate site, and a later phase returns operations to the primary or a permanent new site. Moving back is itself risky, so it is often done starting with the least critical functions to test the restored environment, while the most critical remain at the recovery site until the primary is proven.",
   "Training and awareness ensure people know their roles, and the plan must be kept current as systems, staff and suppliers change. Store copies where they will be available during a disaster, not only on the systems that might fail.",
   "Testing proceeds in increasing realism and risk. A read-through, also called a checklist review, has team members review the plan individually to confirm it is accurate and complete, and that contact details and resources are current. A walkthrough, often a tabletop exercise, brings the team together to talk through a scenario step by step, discovering gaps in understanding and coordination. A simulation goes further, playing out a specific disaster scenario in more detail, possibly exercising some procedures and communications, but without actually moving production operations.",
   "A parallel test actually brings up systems at the recovery site and processes real or copied data there, while the primary site continues to run production. It validates that the alternate site works without risking business operations. A full-interruption test (full-scale test) shuts down the primary site and moves operations entirely to the recovery site. It is the most realistic and the only way to be fully sure, but it is also the most disruptive and risky, requiring senior management approval, and many organizations rarely or never perform it.",
   "After every test, document results, compare actual recovery times with RTOs and RPOs, identify gaps and update the plan. Maintenance is continuous: changes in systems or organization should trigger plan updates, and the plan should be reviewed at least annually."
  ],
  "terms": [
   [
    "Read-through (checklist) test",
    "Individual review of the DR plan for accuracy and completeness."
   ],
   [
    "Walkthrough (tabletop) test",
    "A group discussion of a scenario, stepping through the plan without taking action on systems."
   ],
   [
    "Simulation test",
    "Playing out a specific disaster scenario in detail, sometimes exercising procedures, without affecting production."
   ],
   [
    "Parallel test",
    "Bringing up recovery systems and processing at the alternate site while production continues at the primary site."
   ],
   [
    "Full-interruption test",
    "Shutting down the primary site and running operations entirely from the recovery site; most realistic and riskiest."
   ]
  ],
  "example": "A regional bank reviews its DR plan quarterly as a read-through and runs a tabletop walkthrough of a data center flood each spring. Each autumn it performs a parallel test, restoring core banking systems at the recovery site and reconciling a day of transactions there while the primary keeps running. The latest test showed restoration took seven hours against a five-hour RTO, leading to faster replication.",
  "tip": "Know the test order from least to most disruptive: read-through (checklist), walkthrough (tabletop), simulation, parallel, full interruption. Parallel keeps production running; full interruption does not and needs senior management approval.",
  "check": [
   [
    "Which DR test validates the recovery site with real processing but no risk to production?",
    "A parallel test, which runs systems at the recovery site while the primary site continues normal operations."
   ],
   [
    "Which is the most realistic but most risky test?",
    "The full-interruption test, because production actually moves to the recovery site."
   ],
   [
    "When returning from the alternate site, which functions typically move back first and why?",
    "The least critical functions, so problems in the restored primary environment are found before critical operations depend on it."
   ]
  ]
 },
 {
  "t": "Business continuity participation, physical security and personnel safety (travel, duress, emergency management)",
  "body": [
   "Security operations teams do not own business continuity, but they participate heavily in it. Business continuity planning (BCP) keeps critical business functions running during and after a disruption, based on the business impact analysis. Security staff contribute by identifying systems and data that critical functions depend on, ensuring recovery environments are as secure as production, maintaining backups and access controls during crises, supporting exercises, and bringing incident response and continuity plans into alignment so a cyberattack can trigger continuity measures smoothly.",
   "Physical security protects people, facilities and equipment. Think in layers from the outside in: perimeter controls such as fencing, lighting, bollards and landscaping that follows crime prevention through environmental design (CPTED) principles; building entry controls such as reception, badge readers, turnstiles and mantraps to prevent tailgating; internal zones with stronger controls for server rooms and sensitive areas; and monitoring through CCTV, alarms and guards. Visitor management includes sign-in, badges, escorts and logs. Physical security also covers environmental threats and fire safety, including detection, suppression and evacuation.",
   "The most important principle, and a favorite exam answer, is that human life and safety always come first. No asset justifies endangering people. Fire exits must not be locked in ways that trap people; systems designed to fail-safe (unlock on power loss) protect lives, while fail-secure (remain locked) protects assets, and doors on escape routes must allow egress. In an emergency, evacuate people before saving equipment or data.",
   "Personnel safety extends beyond the building. Travel security prepares employees going abroad: briefings on local risks, registering itineraries, using loaner laptops and phones with minimal data for high-risk destinations, encrypting devices, avoiding untrusted networks or using VPN, being cautious with public charging and devices left in hotel rooms, and knowing that some countries may inspect or compel access to devices at the border. Duress refers to situations where an employee is forced to act under threat. Duress systems let a person signal distress covertly, such as a special PIN that opens a door or disarms an alarm while silently alerting security, or a code word agreed in advance. Train staff to comply with an attacker's demands to protect their lives rather than resist.",
   "Emergency management covers planning for events that threaten safety, such as fire, severe weather, medical emergencies, active threats and pandemics. Elements include occupant emergency plans, evacuation routes and assembly points, floor wardens who account for staff, shelter-in-place procedures, mass notification systems, first aid and coordination with emergency services. Exercises such as fire drills test these plans. Crisis communication plans define who speaks for the organization and how staff, families and the public are informed."
  ],
  "terms": [
   [
    "Business continuity planning (BCP)",
    "Planning to keep critical business functions operating during and after a disruption."
   ],
   [
    "Fail-safe vs fail-secure",
    "Fail-safe unlocks or opens on failure to protect people; fail-secure stays locked to protect assets."
   ],
   [
    "Duress code",
    "A covert signal, such as an alternate PIN, that indicates a person is acting under threat."
   ],
   [
    "CPTED",
    "Crime prevention through environmental design: using layout, lighting and landscaping to deter crime."
   ],
   [
    "Occupant emergency plan",
    "Procedures for protecting building occupants during emergencies, including evacuation and shelter-in-place."
   ]
  ],
  "example": "A pharmaceutical executive traveling to a high-risk region receives a briefing, a loaner laptop with only the files needed for the trip and an encrypted phone. Back at headquarters, a night guard is confronted by an intruder and enters the duress PIN on the alarm panel, which appears to disarm normally while silently summoning police. Nobody is hurt, which is the plan's first objective.",
  "tip": "When any answer choice protects human life, it is almost always the correct one. Fail-safe protects people; fail-secure protects assets. Duress systems let people comply with an attacker while silently raising the alarm.",
  "check": [
   [
    "During a fire, should an administrator stay to shut down servers gracefully?",
    "No. Human safety comes first; people should evacuate immediately and systems can be recovered later."
   ],
   [
    "What is the purpose of a duress code?",
    "To let a person under threat appear to comply while covertly alerting security or authorities."
   ],
   [
    "What travel precaution reduces risk when devices might be inspected or seized abroad?",
    "Using a loaner laptop and phone that hold only the minimum necessary data, encrypted, and wiping or reviewing them on return."
   ]
  ]
 },
 {
  "t": "Security in the SDLC: waterfall, agile, DevOps, DevSecOps, scaled agile",
  "body": [
   "The software development lifecycle (SDLC) is the structured process for creating software, from idea to retirement. Its phases are commonly described as initiation and requirements, design, development (coding), testing, deployment and implementation, operations and maintenance, and disposal. The central security lesson is that security must be built in from the start, because fixing flaws late in the lifecycle is far more expensive and less effective than preventing them. In each phase, security has a job: security requirements and risk assessment during requirements; threat modeling and secure architecture during design; secure coding and code review during development; security testing before release; secure configuration and change control in deployment and operations; and secure data disposal at retirement. Certification and accreditation, a formal technical evaluation followed by management's authorization to operate, may occur before production use.",
   "Different development methodologies shape how security fits in. Waterfall is sequential: each phase completes before the next begins, with extensive documentation and formal reviews. Security activities fit neatly into phase gates, but requirements are fixed early, changes are costly, and security problems discovered late may be hard to fix. The spiral model iterates through planning, risk analysis, engineering and evaluation, emphasizing risk management in each loop.",
   "Agile development delivers software in short iterations (sprints), prioritizing working software, collaboration and responsiveness to change over heavy documentation. Frameworks include Scrum, with its product owner, scrum master and development team, and Kanban. Security challenges are that short cycles leave little time for traditional security reviews and documentation can be sparse. Adaptations include writing security requirements as user stories and acceptance criteria, including abuse cases, keeping a security backlog, making security part of the definition of done, and automating tests that run every sprint.",
   "DevOps combines development and operations teams and practices to deliver changes rapidly and reliably, relying on automation, continuous integration and continuous delivery or deployment (CI/CD), infrastructure as code and monitoring. Releases may happen many times a day. DevSecOps integrates security into that pipeline as a shared responsibility rather than a separate gate at the end. The phrase shift left means moving security earlier: threat modeling during design, secure coding training, automated SAST, software composition analysis and secrets scanning on each commit, DAST and container scanning in the pipeline, policy-as-code checks on infrastructure templates, and runtime monitoring in production. Security teams act as enablers who provide tools and guardrails.",
   "Scaled agile frameworks, such as the Scaled Agile Framework (SAFe) and others, coordinate many agile teams working on large products with shared planning increments, architectural runways and release trains. For security this creates opportunities to define enterprise-wide security requirements, shared components and common pipelines, and to coordinate security work across teams, while ensuring that consistency does not slow teams down."
  ],
  "terms": [
   [
    "Software development lifecycle (SDLC)",
    "The phases of creating software from requirements through design, coding, testing, deployment, operation and disposal."
   ],
   [
    "Waterfall",
    "A sequential development model in which each phase completes before the next begins."
   ],
   [
    "Agile",
    "An iterative approach delivering working software in short sprints with continuous feedback."
   ],
   [
    "DevSecOps",
    "Integrating security practices and automation throughout the DevOps pipeline as a shared responsibility."
   ],
   [
    "Shift left",
    "Moving security activities earlier in the development lifecycle to find and fix issues sooner and more cheaply."
   ]
  ],
  "example": "A fintech team using Scrum adds security acceptance criteria to every user story involving payments and invites the security champion to sprint planning. Their pipeline runs SAST, dependency scanning and secrets detection on each commit and blocks merges with critical findings. Infrastructure templates are checked against policy before deployment, and production logs feed the SOC.",
  "tip": "The exam favors building security in from the earliest phase: requirements and design. The cheapest place to fix a flaw is before code exists. DevSecOps means automation and shared responsibility, not a separate security gate at the end.",
  "check": [
   [
    "Why is fixing a security flaw during design cheaper than after deployment?",
    "Changes in design require no rework of code, testing, deployment or data; late fixes may require redesign, retesting and emergency patching."
   ],
   [
    "How can security be integrated into agile sprints?",
    "Through security user stories and abuse cases, security in the definition of done, automated security tests and a prioritized security backlog."
   ],
   [
    "What does 'shift left' mean?",
    "Performing security activities earlier in the SDLC, such as in requirements, design and coding, rather than only testing at the end."
   ]
  ]
 },
 {
  "t": "Maturity models: CMM, SAMM; operations, maintenance and change management",
  "body": [
   "Maturity models help organizations measure how well-developed and repeatable their processes are, and give them a roadmap for improvement. For software security, the exam focuses on the Capability Maturity Model (CMM) lineage and on the OWASP Software Assurance Maturity Model (SAMM), and it links them to the discipline of operating and changing software safely after release.",
   "The Capability Maturity Model, developed at Carnegie Mellon's Software Engineering Institute and later evolved into Capability Maturity Model Integration (CMMI), describes five levels. Level 1, Initial: processes are ad hoc and chaotic, and success depends on individual heroics. Level 2, Repeatable (called Managed in CMMI): basic project management processes are established so earlier successes can be repeated. Level 3, Defined: processes are documented, standardized and integrated across the organization. Level 4, Managed (Quantitatively Managed in CMMI): processes are measured and controlled with metrics. Level 5, Optimizing: the organization focuses on continuous process improvement. The key idea for security is that mature, defined and measured processes produce more predictable, higher-quality and more secure software.",
   "The Software Assurance Maturity Model (SAMM) is an open framework from OWASP specifically for software security. It organizes practices into business functions: Governance, Design, Implementation, Verification and Operations. Each function contains security practices, such as strategy and metrics, education and guidance, threat assessment, security requirements, secure build, secure deployment, defect management, security testing, incident management and environment management. Each practice is scored across maturity levels, typically from 1 to 3, allowing an organization to assess its current state, set target levels that fit its risk and resources, and plan improvements incrementally. Another model sometimes mentioned is BSIMM, the Building Security In Maturity Model, which is descriptive: it reports what many organizations actually do rather than prescribing what they should do.",
   "Operations and maintenance is the longest phase of most software's life. Security tasks include monitoring the application and its logs, handling vulnerability reports from users and researchers, applying patches to the application and its dependencies, managing secrets and certificates, and planning for end of life. Legacy software that no longer receives updates is a growing risk and needs compensating controls or replacement.",
   "Change management in software means that every modification, whether a feature, bug fix or dependency update, goes through a controlled process: a request, impact and security analysis, approval, development in version control, testing including regression tests to ensure nothing previously working broke, and controlled release with the ability to roll back. Configuration management tracks versions of code, builds and deployed components so you always know what is running where. Unapproved changes to production code are a warning sign of error or compromise."
  ],
  "terms": [
   [
    "Capability Maturity Model (CMM)",
    "A five-level model (initial, repeatable, defined, managed, optimizing) for measuring process maturity."
   ],
   [
    "SAMM",
    "OWASP Software Assurance Maturity Model, which assesses software security practices across business functions and maturity levels."
   ],
   [
    "BSIMM",
    "Building Security In Maturity Model, a descriptive model based on observed practices in real organizations."
   ],
   [
    "Regression testing",
    "Retesting after a change to confirm existing functionality and security controls still work."
   ],
   [
    "Optimizing level",
    "CMM level 5, where the organization continuously improves processes based on measurement."
   ]
  ],
  "example": "A software company assesses itself with SAMM and finds it scores well in secure build but lowest in threat assessment. It sets a target to reach level 2 in threat assessment within a year by training architects and requiring threat models for new services. Meanwhile its change process ensures every dependency upgrade passes regression and security tests before release.",
  "tip": "Memorize the CMM levels in order: initial, repeatable, defined, managed, optimizing. Level 5 is about continuous improvement. SAMM is prescriptive and specific to software security; BSIMM describes what organizations actually do.",
  "check": [
   [
    "At which CMM level are processes documented and standardized across the organization?",
    "Level 3, Defined."
   ],
   [
    "What distinguishes SAMM from BSIMM?",
    "SAMM is a prescriptive framework for assessing and improving software security practices; BSIMM is descriptive, based on observations of practices in real organizations."
   ],
   [
    "Why is regression testing part of software change management?",
    "To ensure that a change has not broken existing functionality or reintroduced security flaws."
   ]
  ]
 },
 {
  "t": "Integrated product teams and security in the development ecosystem",
  "body": [
   "Software is no longer built by a lone programming team handing finished code to operations. It is produced by an ecosystem of people, tools, services and suppliers, and security has to be woven into that whole system. The CISSP outline highlights integrated product teams (IPTs) as a way to do that.",
   "An integrated product team is a cross-functional group that brings together the disciplines needed to deliver a product: developers, testers, operations engineers, product owners, architects, and specialists such as security, privacy, legal, compliance and user experience. The concept originated in defense and systems engineering, and it overlaps with the DevOps idea of breaking down silos. The benefit for security is that requirements and risks are considered from the beginning by people who understand them, decisions are made together, and security is not treated as an outside auditor who arrives at the end to say no. A security representative in the IPT can shape architecture, help write abuse cases, choose secure components and interpret test results in context.",
   "Many organizations scale this with security champions: developers or engineers embedded in each product team who receive extra security training and act as the first point of contact for security questions, while the central security team provides expertise, tools and standards. This spreads knowledge without requiring a security specialist for every team.",
   "The development ecosystem extends beyond people. It includes source code repositories, build systems, package managers and third-party libraries, container registries, cloud services, CI/CD pipelines, developer workstations and integrated development environments, and external contractors. Each is part of the software supply chain, and attackers increasingly target these links, for example by compromising a popular open-source library, stealing a developer's credentials to push malicious code, or tampering with a build server so that legitimate-looking releases carry a backdoor. Securing the ecosystem therefore means applying security controls to development infrastructure with the same rigor as production.",
   "Practical measures include clear roles and responsibilities within the team, including who owns security decisions and risk acceptance; secure design standards and approved components; training appropriate to each role; threat modeling as a team activity; defined interfaces and contracts with external developers that include security requirements and the right to review; software bills of materials (SBOMs) that list the components in each product; and metrics shared across the team so security is part of how success is measured. Governance still matters: security policies and standards set expectations, and the IPT operates within them."
  ],
  "terms": [
   [
    "Integrated product team (IPT)",
    "A cross-functional team combining development, operations, security and business disciplines to deliver a product."
   ],
   [
    "Security champion",
    "A team member with extra security training who promotes secure practices within a development team."
   ],
   [
    "Software supply chain",
    "All components, tools, services and people involved in producing and delivering software."
   ],
   [
    "Software bill of materials (SBOM)",
    "An inventory of the components and dependencies included in a software product."
   ],
   [
    "Development ecosystem",
    "The combined people, tools, infrastructure and third parties that produce software."
   ]
  ],
  "example": "A medical device maker forms an IPT for a new insulin pump app, including developers, a clinical safety engineer, a privacy officer and an application security engineer. Together they threat-model the Bluetooth pairing process during design, choose a vetted cryptographic library, and require the outsourced firmware vendor to supply an SBOM and pass the same code scanning gates as internal teams.",
  "tip": "If a question asks how to ensure security is considered throughout development, look for including security personnel in cross-functional teams from the start, rather than adding a review at the end.",
  "check": [
   [
    "What is the main security benefit of an integrated product team?",
    "Security expertise participates from the start, so requirements, design and trade-offs account for security rather than being bolted on late."
   ],
   [
    "Why must development infrastructure be secured like production?",
    "Compromising repositories, build servers or developer credentials lets attackers insert malicious code into trusted software distributed to customers."
   ],
   [
    "What role does a security champion play?",
    "A team member with security training who guides peers, raises issues early and connects the team with the central security function."
   ]
  ]
 },
 {
  "t": "Development ecosystem controls: languages, libraries, toolsets, IDE, runtime, CI/CD, SCM, code repositories",
  "body": [
   "Every tool and component used to build software can introduce vulnerabilities or become an attack path. Development ecosystem controls apply security to each layer, from the language chosen to the pipeline that ships the code.",
   "Programming languages differ in security characteristics. Languages such as C and C++ give direct memory control, which enables performance but also memory-safety bugs such as buffer overflows and use-after-free. Memory-safe languages, including Java, C#, Go, Python and Rust, manage memory or enforce safety rules that eliminate many of those classes of bugs. Compiled languages turn source into machine code before running; interpreted languages are executed by an interpreter at runtime; many languages compile to bytecode run by a virtual machine. Strongly typed languages catch some errors earlier. Language choice is a security decision, and where unsafe languages are necessary, use safer functions, compiler protections and additional testing.",
   "Libraries and frameworks save enormous effort but bring their own flaws and licenses. Control them with software composition analysis (SCA) to find known vulnerabilities and license issues in dependencies, pinned versions and lock files, approved internal package mirrors, verification of package signatures or checksums, and prompt updates when vulnerabilities are announced. Watch for typosquatting and dependency confusion, where attackers publish malicious packages with names similar to legitimate ones or to internal packages.",
   "Toolsets and integrated development environments (IDEs) are where developers work. Keep them patched, restrict plug-ins and extensions to trusted sources since they run with the developer's privileges, and use security plug-ins that flag issues as code is written. Protect developer workstations with endpoint security and prevent secrets from living in local files.",
   "The runtime environment, such as a Java virtual machine, a .NET runtime, a container engine or a serverless platform, should be patched, hardened and configured for least privilege, for example running containers as non-root with minimal base images. Runtime application self-protection (RASP) can monitor and block attacks from inside the running application.",
   "Source code management (SCM) and code repositories hold the organization's intellectual property and the blueprint for its systems. Enforce strong authentication with MFA, least privilege access to repositories, branch protection that requires reviewed pull requests before merging to main branches, signed commits where appropriate, audit logging, and secret scanning to catch credentials accidentally committed. Keep public and private repositories clearly separated.",
   "Continuous integration and continuous delivery or deployment (CI/CD) pipelines automatically build, test and deploy code. They are powerful and therefore high-value targets. Secure them by isolating build agents, storing pipeline secrets in a secrets manager with short-lived credentials, requiring approvals for production deployments, signing build artifacts and verifying provenance, keeping pipeline definitions in version control with review, and inserting security gates such as SAST, SCA and container scanning that block releases with critical findings."
  ],
  "terms": [
   [
    "Memory-safe language",
    "A language that prevents classes of memory errors such as buffer overflows by design."
   ],
   [
    "Software composition analysis (SCA)",
    "Tools that inventory third-party components and flag known vulnerabilities and license issues."
   ],
   [
    "Branch protection",
    "Repository rules such as required reviews and status checks before code merges to protected branches."
   ],
   [
    "CI/CD pipeline",
    "Automated process that builds, tests and delivers or deploys code changes."
   ],
   [
    "Dependency confusion",
    "An attack where a public package with the same name as an internal one is pulled into a build instead of the intended package."
   ]
  ],
  "example": "A company's secret scanner flags that a developer pushed a cloud access key to a feature branch. Branch protection had already prevented the unreviewed code from merging to main, and the pipeline blocks the build. The key is revoked, and the team moves pipeline credentials into a secrets manager that issues short-lived tokens, while SCA gates stop builds using library versions with known critical vulnerabilities.",
  "tip": "Treat the build pipeline and repositories as production-grade assets. Common exam answers: SCA for third-party library risk, branch protection and code review for repository integrity, and secrets managers instead of hard-coded credentials.",
  "check": [
   [
    "Which tool type identifies known vulnerabilities in open-source libraries used by an application?",
    "Software composition analysis (SCA)."
   ],
   [
    "Name two controls that protect a code repository's integrity.",
    "Examples: MFA for access, least privilege permissions, branch protection with required reviews, signed commits, audit logs and secret scanning."
   ],
   [
    "Why are C and C++ associated with more memory-corruption vulnerabilities?",
    "They allow direct memory management without built-in bounds checking, so errors like buffer overflows are possible if developers make mistakes."
   ]
  ]
 },
 {
  "t": "Application security testing: SAST, DAST, SCA, IAST",
  "body": [
   "Application security testing tools automate the search for vulnerabilities in software. The CISSP exam expects you to know the four main categories, how each works, where it fits in the development lifecycle, and its strengths and blind spots. Mature programs use several together because each sees different problems.",
   "Static application security testing (SAST) analyzes source code, bytecode or binaries without executing the program. It traces how data flows from inputs (sources) to sensitive operations (sinks) and flags paths where untrusted input reaches a database query, command execution or HTML output without validation or encoding. SAST is a white-box technique that can run as soon as code is written, often inside the IDE or on each commit, and it points developers to the exact file and line. Its weaknesses are false positives, language-specific support, and no visibility into runtime configuration, deployed infrastructure or issues that only appear when components interact.",
   "Dynamic application security testing (DAST) tests a running application from the outside, as an attacker would, without access to the source. It crawls the application, sends crafted requests and analyzes responses to detect issues such as injection, cross-site scripting, authentication weaknesses, misconfigured headers and information leakage. DAST is a black-box technique, language-independent, and finds runtime and configuration problems that SAST cannot. However, it needs a deployed application, typically in a test or staging environment, runs later in the lifecycle, may miss code paths it cannot reach, and does not identify the line of code responsible.",
   "Software composition analysis (SCA) identifies third-party and open-source components in an application, including transitive dependencies (dependencies of dependencies), and compares them to databases of known vulnerabilities and licenses. Because most modern applications are largely composed of open-source code, SCA addresses a major share of risk. It can generate a software bill of materials, alert when a newly disclosed vulnerability affects a component already in production, and flag license obligations that could create legal risk. SCA does not find flaws in the organization's own code.",
   "Interactive application security testing (IAST) places an agent or sensors inside the running application, typically in a test environment, and observes code execution while functional tests or DAST scans exercise it. Because it sees both the incoming request and the internal data flow, IAST can confirm real vulnerabilities with fewer false positives and point to the responsible code. It depends on test coverage, since only exercised code is analyzed, and supports specific languages and frameworks. A related technology, runtime application self-protection (RASP), uses similar instrumentation in production to block attacks rather than just report them.",
   "In a DevSecOps pipeline, SAST and SCA typically run on each commit or pull request, DAST and IAST run against staging builds, and findings feed a common defect tracking process with severity thresholds that can block a release. Tool output still needs human triage to confirm and prioritize findings."
  ],
  "terms": [
   [
    "SAST",
    "Static application security testing: white-box analysis of code without executing it."
   ],
   [
    "DAST",
    "Dynamic application security testing: black-box testing of a running application through its interfaces."
   ],
   [
    "SCA",
    "Software composition analysis: identifying third-party components and their known vulnerabilities and licenses."
   ],
   [
    "IAST",
    "Interactive application security testing: instrumentation inside a running application that analyzes behavior during testing."
   ],
   [
    "RASP",
    "Runtime application self-protection: in-app instrumentation that detects and blocks attacks in production."
   ]
  ],
  "example": "A travel booking site's pipeline runs SAST and SCA on every pull request, catching an unsafe query construction and an outdated XML library. In staging, a nightly DAST scan finds a missing security header, while the IAST agent, observing the QA team's regression tests, confirms that a search parameter reaches the database unsanitized and identifies the exact method responsible.",
  "tip": "Match tool to situation: no running app yet and need exact code lines, SAST; running app, attacker's view, SAST not possible, DAST; open-source dependency risk, SCA; instrumented running app with low false positives, IAST.",
  "check": [
   [
    "Which testing type is best for finding vulnerable open-source libraries?",
    "Software composition analysis (SCA)."
   ],
   [
    "What can DAST find that SAST typically cannot?",
    "Runtime and configuration issues in the deployed application, such as server misconfigurations and missing security headers."
   ],
   [
    "Why does IAST usually produce fewer false positives than SAST?",
    "It observes actual execution with real requests inside the running app, confirming that tainted data reaches a vulnerable operation."
   ]
  ]
 },
 {
  "t": "Assessing effectiveness of software security: auditing, logging, risk analysis",
  "body": [
   "Deploying security tools and writing secure coding policies does not prove software is secure. Organizations need ways to assess whether their software security efforts are working, both for individual applications and for the development program as a whole. Three tools for this are auditing, logging and risk analysis.",
   "Auditing software security examines whether required practices are actually followed and whether controls in the software work. A process audit might check a sample of releases for evidence of threat models, code reviews, passed security scans and approved exceptions. A technical audit might review an application's access controls, cryptography, data handling and configuration against standards. Audits can be internal or independent, and they produce findings that feed remediation. Change audits compare what is running in production against approved change records, revealing unauthorized modifications. Auditing also applies to the development environment itself: who has access to repositories and pipelines, and whether that access is appropriate.",
   "Logging supports assessment in two ways. First, the application must generate adequate security logs: authentication successes and failures, authorization failures, input validation failures, administrative actions, changes to sensitive data and security configuration, and errors. Each entry should record what happened, when (with synchronized time), where, who or what initiated it and the outcome. Logs must not contain secrets such as passwords, session tokens or full payment card numbers, and log inputs should be encoded to prevent log injection. Logs should go to a protected central location for monitoring. Second, reviewing those logs shows whether attacks are occurring and whether controls block them, such as a spike in authorization failures indicating someone probing for access to other users' records. Insufficient logging and monitoring is itself a common weakness because it lets attacks proceed unnoticed.",
   "Risk analysis evaluates software risks in business terms, so resources go where they matter most. Threat modeling identifies what could go wrong; methodologies such as STRIDE classify threats into spoofing, tampering, repudiation, information disclosure, denial of service and elevation of privilege. Risk analysis then weighs likelihood and impact to prioritize vulnerabilities and decide whether to mitigate, transfer, avoid or accept each one. Residual risk after controls must be accepted by an appropriate owner. Revisit the analysis when the application, its data or the threat environment changes.",
   "Metrics tie these together: vulnerability density per application, mean time to remediate by severity, percentage of applications with current threat models, security test coverage, number of open exceptions, and recurrence of the same weakness types. Trends reveal whether training and tooling are reducing defects. Findings from incidents and penetration tests should feed back into requirements, coding standards and developer education, closing the loop."
  ],
  "terms": [
   [
    "Software security audit",
    "A review verifying that secure development practices were followed and that software controls work as required."
   ],
   [
    "Security logging",
    "Recording security-relevant events with context while excluding sensitive data such as passwords."
   ],
   [
    "Log injection",
    "Inserting crafted content into logs to forge entries or attack log viewers; prevented by encoding log inputs."
   ],
   [
    "STRIDE",
    "A threat classification: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege."
   ],
   [
    "Residual risk",
    "The risk remaining after controls are applied, which must be formally accepted by an owner."
   ]
  ],
  "example": "An insurer audits ten recent releases of its claims portal and finds that three skipped threat modeling. Log review shows repeated authorization failures from one customer account trying sequential claim numbers; the access control held, but the team adds alerting on the pattern. Risk analysis rates the portal's document upload feature as highest risk, so it receives focused penetration testing next quarter.",
  "tip": "Logs must capture enough to reconstruct events (who, what, when, where, outcome) but never sensitive secrets like passwords or session tokens. Risk analysis prioritizes by likelihood and impact, and residual risk needs formal acceptance.",
  "check": [
   [
    "Name three events an application should log for security purposes.",
    "Examples: authentication successes and failures, authorization failures, input validation failures, administrative actions, and changes to sensitive data or configuration."
   ],
   [
    "What should never be written to application logs?",
    "Secrets and highly sensitive data such as passwords, session tokens, encryption keys and full payment card numbers."
   ],
   [
    "How does a software security audit differ from security testing?",
    "An audit checks whether required processes and controls were followed and are effective against defined criteria; testing actively probes the software for vulnerabilities."
   ]
  ]
 },
 {
  "t": "Security impact of acquired software: COTS, open source, third party, managed services (SaaS, PaaS, IaaS)",
  "body": [
   "Most software an organization runs is not built in-house. It is bought, downloaded, contracted or consumed as a service. Each source brings different security risks and different levels of visibility and control, and the CISSP expects you to assess them before acquisition and manage them afterward.",
   "Commercial off-the-shelf (COTS) software is purchased from a vendor for general use. You usually cannot see or change the source code, so you rely on the vendor's development practices, testing and patching. Assess the vendor's security reputation, vulnerability disclosure and patching history, support lifecycle and end-of-support dates, and available certifications or independent evaluations such as Common Criteria. Configure the product securely because defaults often favor ease of use, test it before deployment, and plan for vendor failure, sometimes with a source code escrow agreement that releases code to you if the vendor goes out of business.",
   "Open-source software has publicly available source code, which allows review by anyone, but that does not guarantee anyone has reviewed it. Some projects are maintained by large communities, others by a single volunteer. Risks include unpatched vulnerabilities, abandoned projects, malicious packages or compromised maintainer accounts, and license obligations. Controls include software composition analysis, preferring well-maintained projects, pinning and verifying versions, tracking components in an SBOM, and contributing to or funding critical dependencies.",
   "Third-party developed software, such as custom code written by contractors or outsourced development firms, should be governed by contracts that specify security requirements, secure coding standards, testing obligations, ownership of code, right to audit, vulnerability remediation timelines, and liability. Review and test delivered code as if it were your own, and control contractor access to your repositories and environments.",
   "Managed services move software and infrastructure to providers, and the shared responsibility model defines who secures what. In infrastructure as a service (IaaS), the provider secures the physical facilities, hardware and virtualization, while the customer manages operating systems, middleware, applications, data and access. In platform as a service (PaaS), the provider also manages the operating system and runtime, and the customer secures its application code, data and configuration. In software as a service (SaaS), the provider runs the entire application, and the customer is responsible mainly for its data, user accounts, access settings and how the service is configured and integrated. Across all models, the customer always remains accountable for its data and for managing identities.",
   "Assess providers through due diligence: security questionnaires, SOC 2 Type II and ISO/IEC 27001 attestations, data location and residency, encryption and key management options, incident notification terms, availability commitments in SLAs, data return and deletion on exit, and subcontractors. Monitor ongoing performance and reassess periodically. Remember that you can outsource operations but not accountability."
  ],
  "terms": [
   [
    "COTS",
    "Commercial off-the-shelf software sold for general use, typically without source code access."
   ],
   [
    "Source code escrow",
    "An arrangement where a third party holds a vendor's source code for release to the customer under defined conditions such as vendor failure."
   ],
   [
    "Shared responsibility model",
    "The division of security duties between cloud provider and customer that varies across IaaS, PaaS and SaaS."
   ],
   [
    "Third-party software",
    "Software developed for the organization by an external contractor or firm under contract."
   ],
   [
    "Vendor due diligence",
    "Assessing a supplier's security posture, practices and attestations before and during the relationship."
   ]
  ],
  "example": "A city government moves permit processing to a SaaS platform. Due diligence covers the provider's SOC 2 Type II report, data residency in the city's country, encryption options and 72-hour exit data return. After go-live, a configuration review finds that the city itself had left anonymous access enabled on a report-sharing feature, a reminder that in SaaS the customer still owns user access and configuration.",
  "tip": "The organization remains accountable for its data regardless of model. In IaaS the customer manages the most; in SaaS the least, but always data, identities and configuration. For COTS, escrow protects against vendor failure.",
  "check": [
   [
    "In a PaaS model, who is typically responsible for patching the operating system?",
    "The provider; the customer secures its application code, data and configuration."
   ],
   [
    "What does a source code escrow agreement protect against?",
    "The risk that a vendor goes out of business or stops supporting the product, by releasing source code to the customer under agreed conditions."
   ],
   [
    "Why doesn't open-source availability guarantee security?",
    "Public code can be reviewed, but that doesn't mean it has been; projects may be under-maintained, contain unpatched flaws or be targeted with malicious contributions."
   ]
  ]
 },
 {
  "t": "Secure coding guidelines and standards: source code weaknesses, API security, secure coding practices",
  "body": [
   "Secure coding standards give developers concrete rules for writing software that resists attack. They turn broad principles into practices that can be taught, checked by tools and enforced in code review. Well-known references include the OWASP Top 10 (the most critical web application security risks), the OWASP Application Security Verification Standard (ASVS), the CWE (Common Weakness Enumeration) list of software weakness types and its Top 25 most dangerous weaknesses, the SEI CERT coding standards for specific languages, and the NIST Secure Software Development Framework (SSDF). Organizations typically adopt one or more of these and tailor them to their languages and platforms.",
   "Source code weaknesses often fall into recurring categories. Poor input validation lets untrusted data reach interpreters. Improper error handling reveals stack traces, versions or database details to users. Hard-coded credentials and keys end up in repositories. Weak or home-grown cryptography, predictable random numbers and outdated algorithms undermine confidentiality. Broken access control fails to check authorization on each request. Race conditions and unsafe memory handling create subtle flaws. Backdoors or maintenance hooks, sometimes left by developers for testing, bypass normal controls and must be removed before release. Dead code and debugging features left in production widen the attack surface.",
   "Core secure coding practices counter these weaknesses. Validate all input on the server side against an allow list of expected type, length, format and range; client-side checks are for usability only. Encode output for the context where it is used, such as HTML, JavaScript or URLs. Use parameterized queries or safe APIs rather than building commands by string concatenation. Enforce authentication and authorization centrally and check authorization for every request and object. Fail securely: on error, deny access and show generic messages while logging details internally. Use well-vetted cryptographic libraries and never invent algorithms. Manage secrets outside code. Apply least privilege to the application's own accounts. Keep dependencies updated. Log security events without sensitive data.",
   "Application programming interfaces (APIs) deserve special attention because they expose functionality and data directly to other programs, often without a user interface that might hide weaknesses. The OWASP API Security Top 10 highlights risks such as broken object-level authorization, where an API returns any record whose ID is supplied without checking ownership; broken authentication; exposing more object properties than the caller should see (listed as excessive data exposure in the 2019 edition); and unrestricted resource consumption, such as missing rate limits. Secure APIs by requiring strong authentication (for example OAuth 2.0 tokens with limited scopes), authorizing each object and function, validating input against a schema, returning only necessary fields, enforcing rate limits and quotas, using TLS, keeping an inventory of all API versions including old ones, and monitoring through an API gateway. REST APIs commonly use JSON and tokens; SOAP APIs use XML and WS-Security.",
   "Enforce standards through training, IDE plug-ins, SAST rules mapped to the standard, peer code review checklists, and pipeline gates. Measure recurring weakness types to target further training."
  ],
  "terms": [
   [
    "CWE",
    "Common Weakness Enumeration, a catalog of software and hardware weakness types."
   ],
   [
    "OWASP Top 10",
    "A widely referenced list of the most critical web application security risks."
   ],
   [
    "Input validation",
    "Checking that input matches expected type, length, format and range, preferably using an allow list, on the server side."
   ],
   [
    "Maintenance hook (backdoor)",
    "A hidden entry point left in code that bypasses normal security controls."
   ],
   [
    "Broken object-level authorization",
    "An API flaw where access to an object is granted by ID without verifying the caller is authorized for that object."
   ]
  ],
  "example": "During code review of a mobile banking API, a reviewer notices that the endpoint returning account statements takes an account ID parameter but only checks that the caller is logged in. Any authenticated user could request another customer's statements. The fix adds an ownership check, the team writes a SAST rule to flag similar endpoints, and the issue becomes a teaching example in developer training.",
  "tip": "Server-side input validation with allow lists and output encoding are the cornerstone answers for injection and XSS questions. For APIs, remember object-level authorization: verify the caller may access each specific record, not just that they are logged in.",
  "check": [
   [
    "Why is client-side input validation insufficient for security?",
    "Attackers can bypass the client and send requests directly, so validation must be enforced on the server."
   ],
   [
    "What should an application display to users when an error occurs?",
    "A generic error message, while logging detailed information internally, to avoid revealing implementation details."
   ],
   [
    "What is broken object-level authorization in an API?",
    "When an API grants access to an object based on a supplied identifier without checking that the caller is authorized for that specific object."
   ]
  ]
 },
 {
  "t": "Software-defined security",
  "body": [
   "Software-defined security means expressing security controls as software and code that can be deployed, changed and scaled automatically, rather than depending on physical appliances and manual configuration. It grew alongside cloud computing, virtualization, containers and software-defined networking (SDN), where infrastructure is created and destroyed through APIs in minutes and traditional perimeter hardware cannot keep up.",
   "The underlying idea is separation of the control plane from the data plane. In SDN, a central controller decides how traffic should flow (control plane) while switches and virtual network devices simply forward packets as instructed (data plane). Security policy can therefore be defined centrally and pushed everywhere at once. The same principle applies to security: policies are defined in a central management layer and enforced by distributed software agents, virtual firewalls or cloud-native controls close to each workload.",
   "Several practices fall under this umbrella. Micro-segmentation applies fine-grained firewall policy between individual workloads, based on identity and labels rather than IP addresses, limiting lateral movement. Security groups and network policies in cloud and container platforms are software-defined firewalls attached to resources. Infrastructure as code (IaC) defines networks, identities and security settings in version-controlled templates, and policy as code expresses security and compliance rules in machine-readable form so they can be tested automatically, for example rejecting any template that creates a storage bucket with public access or a virtual machine without encryption. Software-defined perimeters (SDP) hide services until a user and device are authenticated and authorized, creating per-session connections consistent with zero trust. Security automation and orchestration can respond to detected threats by changing policies instantly, such as quarantining a compromised container.",
   "The benefits are consistency, speed and scale. The same policy applies everywhere, changes are reviewed and tracked like code, drift is detected and corrected automatically, and security follows workloads as they move or scale. Controls can be tested in pipelines before deployment, shifting security left into infrastructure.",
   "The risks are concentrated and new. The central controller, management console, orchestration platform and pipeline become extremely high-value targets: whoever controls them controls every enforcement point. Protect them with strong authentication, least privilege, separation of duties, network isolation and audit logging. Errors propagate just as fast as correct policies, so a single bad template can expose thousands of resources; code review, automated testing and staged rollouts mitigate this. Teams also need skills in both security and software engineering, and visibility tools that understand dynamic, short-lived resources."
  ],
  "terms": [
   [
    "Software-defined security",
    "Security controls defined, deployed and managed as software through centralized, automated policy."
   ],
   [
    "Control plane vs data plane",
    "The control plane decides policy and routing; the data plane forwards or enforces according to those decisions."
   ],
   [
    "Micro-segmentation",
    "Fine-grained policy between individual workloads to limit lateral movement."
   ],
   [
    "Policy as code",
    "Security and compliance rules written in machine-readable form and enforced automatically."
   ],
   [
    "Software-defined perimeter (SDP)",
    "An approach that hides services and creates authenticated, per-session connections, supporting zero trust."
   ]
  ],
  "example": "A streaming company runs thousands of containers that scale up and down every hour. Instead of firewall appliances, it labels workloads and defines network policies so only the playback service can reach the license database. Policy-as-code checks in the pipeline reject any deployment that exposes a database publicly, and when EDR flags a compromised container, orchestration automatically isolates it by changing its policy.",
  "tip": "The strength of software-defined security is centralized, automated, consistent policy; its main risk is that the controller or management plane becomes a single high-value target, and mistakes propagate at machine speed.",
  "check": [
   [
    "What is the main security concern with a centralized SDN or security controller?",
    "It is a single high-value target; compromising it gives control over all enforcement points, so it needs strong protection."
   ],
   [
    "How does policy as code improve security?",
    "Rules are version-controlled, reviewed and automatically tested, so noncompliant configurations are blocked consistently before deployment."
   ],
   [
    "Why is micro-segmentation useful against attackers who have gained a foothold?",
    "It restricts communication between workloads, limiting lateral movement to only explicitly allowed paths."
   ]
  ]
 },
 {
  "t": "Common weaknesses: injection, XSS, CSRF, buffer overflow, race conditions, insecure deserialization",
  "body": [
   "A small number of weakness types account for a large share of software vulnerabilities. The CISSP expects you to recognize each one from a scenario, understand why it happens and name the primary defenses.",
   "Injection occurs when untrusted input is sent to an interpreter as part of a command or query, and the interpreter treats some of that input as code. SQL injection is the classic case: an application builds a database query by concatenating user input, and crafted input changes the query's logic to read or modify data. The same pattern affects operating system commands, LDAP queries and others. The primary defense is to keep code and data separate using parameterized queries (prepared statements) or safe APIs, supported by server-side input validation, least-privilege database accounts and careful error handling. A defensive example in Python:",
   "```python\n# Safe: the driver sends the value separately from the SQL text\ncursor.execute(\"SELECT name FROM users WHERE id = %s\", (user_id,))\n```",
   "Cross-site scripting (XSS) lets an attacker cause a victim's browser to run script in the context of a trusted site, allowing session theft, page defacement or actions as the user. Stored XSS saves the malicious content on the server (in a comment, for example); reflected XSS bounces it off a request parameter in a crafted link; DOM-based XSS happens entirely in client-side script. Defenses include context-aware output encoding, input validation, frameworks that auto-escape, a Content Security Policy (CSP) header, and HttpOnly cookies to keep session tokens out of script reach. Cross-site request forgery (CSRF) is different: it tricks a logged-in user's browser into sending an unwanted request to a site that trusts that browser, such as changing an email address, because the browser automatically attaches cookies. Defenses include anti-CSRF tokens tied to the session, SameSite cookie attributes, and reauthentication for sensitive actions. Remember: XSS abuses the user's trust in a site; CSRF abuses the site's trust in the user's browser.",
   "A buffer overflow occurs when a program writes more data into a memory buffer than it can hold, overwriting adjacent memory. This can crash the program or, when an attacker controls the overwritten data, redirect execution. It is most common in languages without automatic bounds checking, such as C and C++. Defenses include bounds checking and safe functions, memory-safe languages, and platform protections such as address space layout randomization (ASLR), data execution prevention (DEP) and stack canaries.",
   "Race conditions happen when the outcome depends on the timing of events. The time-of-check to time-of-use (TOCTOU) flaw is typical: a program checks a condition, such as file permissions or an account balance, and then acts on it, but the state changes in between. Defenses include atomic operations, proper locking and rechecking within a single transaction. Insecure deserialization occurs when an application reconstructs objects from untrusted serialized data, which may let an attacker manipulate application logic or trigger code execution. Avoid deserializing untrusted data, use simple data formats such as JSON with strict schemas, apply integrity checks such as digital signatures, and restrict which classes may be deserialized."
  ],
  "terms": [
   [
    "Injection",
    "Untrusted input interpreted as commands or queries; prevented chiefly by parameterized queries and input validation."
   ],
   [
    "Cross-site scripting (XSS)",
    "Injected script running in a victim's browser in a trusted site's context; prevented by output encoding and CSP."
   ],
   [
    "Cross-site request forgery (CSRF)",
    "Forcing an authenticated user's browser to submit unwanted requests; prevented by anti-CSRF tokens and SameSite cookies."
   ],
   [
    "Buffer overflow",
    "Writing beyond a buffer's bounds, corrupting memory; mitigated by bounds checking, memory-safe languages, ASLR and DEP."
   ],
   [
    "TOCTOU",
    "Time-of-check to time-of-use, a race condition where state changes between checking and using a resource."
   ],
   [
    "Insecure deserialization",
    "Reconstructing objects from untrusted data in a way that lets attackers alter logic or execute code."
   ]
  ],
  "example": "A penetration test of an online store finds three issues: product reviews render user-supplied HTML (stored XSS), the change-email form accepts requests without a token (CSRF), and two simultaneous gift-card redemptions both succeed because the balance is checked before, and deducted after, a delay (a race condition). The fixes are output encoding with a CSP, anti-CSRF tokens with SameSite cookies, and an atomic database transaction for redemptions.",
  "tip": "Distinguish XSS from CSRF: XSS runs attacker script in the victim's browser (user trusts the site); CSRF sends forged requests using the victim's session (site trusts the browser). Parameterized queries are the best single answer for SQL injection.",
  "check": [
   [
    "What is the most effective primary defense against SQL injection?",
    "Parameterized queries (prepared statements) that keep data separate from code, supported by input validation and least-privilege database accounts."
   ],
   [
    "Which weakness exploits a site's trust in an authenticated user's browser?",
    "Cross-site request forgery (CSRF)."
   ],
   [
    "What kind of flaw is a time-of-check to time-of-use problem, and how is it prevented?",
    "A race condition; prevent it with atomic operations, locking, or performing the check and use within a single transaction."
   ]
  ]
 }
], { reviewed: "2026-09-25" });
