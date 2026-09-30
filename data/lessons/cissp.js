/* Lessons for ISC2 CISSP (2024 outline): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("cissp", [
 {
  "t": "Professional ethics: ISC2 Code of Ethics canons and organizational ethics",
  "body": [
   "Every Certified Information Systems Security Professional (CISSP) agrees to follow the ISC2 Code of Ethics, and a proven violation can cost you the certification. The exam rarely asks you to recite the code word for word. Instead it gives you a short dilemma, often with a manager, client or colleague pressuring you, and asks what the certified professional should do first or most appropriately. To answer well you need to know the four canons, and above all the order in which they apply when they pull in different directions.",
   "The code opens with a preamble: the safety and welfare of society and the common good, duty to our principals, and duty to each other require that members adhere, and be seen to adhere, to the highest ethical standards of behavior. Strict adherence is a condition of certification. Notice the phrase 'be seen to adhere'. Conduct that merely looks like a conflict of interest, such as quietly recommending a vendor that pays you a referral fee, can damage trust even if the recommendation was sound. Transparency and disclosure are part of ethical behavior, not optional extras.",
   "The four canons, in priority order, are: (1) protect society, the common good, necessary public trust and confidence, and the infrastructure; (2) act honorably, honestly, justly, responsibly and legally; (3) provide diligent and competent service to principals; (4) advance and protect the profession. A principal is whoever you serve professionally: your employer, a client or a customer. When canons conflict, the higher one wins. If your employer asks you to conceal a flaw that endangers the public, canon one outranks canon three. If a client asks you to cut a legal corner to save money, canon two outranks canon three. Serving the profession, canon four, never justifies harming the public or acting dishonestly.",
   "ISC2 runs a formal complaint process through an ethics committee. Broadly, anyone can file a complaint about a breach of the first two canons, only principals can complain about the third, and other certified or licensed professionals who subscribe to a code of ethics can complain about the fourth. Complaints must be written, specific and supported, and the accused member gets a chance to respond. Members are also expected to support the process, which means that knowingly staying silent about a serious violation can itself be a problem.",
   "Organizational ethics is the second half of this topic. Your employer will have its own code of conduct, acceptable use policy and values statement, and a CISSP is expected to help build and model them. A healthy ethics program has written expectations, training, a safe way to raise concerns (often an anonymous hotline), protection from retaliation for good-faith reporters, and consistent enforcement from the top. Senior management sets the tone: if executives ignore the rules, no policy will survive. You may also meet older guidance such as the Internet Architecture Board's 'Ethics and the Internet', which calls activities like seeking unauthorized access, disrupting intended use of the internet and wasting resources unethical. The common theme is that security professionals hold extra access and knowledge, so they carry extra responsibility not to misuse it.",
   "Consider a worked example. You are a consultant finishing a penetration test for a water utility. You find that a remote access gateway to the treatment plant's control network accepts a default password. The utility's IT director asks you to leave the finding out of the written report because the board meets next week and he does not want bad news. Canon three says to serve the client diligently, but canons one and two outrank it: the finding affects public safety, and omitting it would be dishonest. The right path is to report it accurately, explain the risk in business terms, recommend immediate compensating controls, and escalate to higher management if the director insists. You do not leak it to the press or post it online, because that would be neither honorable nor legal.",
   "Common mistakes: treating the canons as equal rather than ranked; assuming loyalty to the employer always comes first; picking the most dramatic answer, such as going straight to the media or law enforcement, when internal escalation is still available; and confusing the organization's code of conduct with the ISC2 code. Another trap is thinking ethics only covers big decisions. Using privileged access to peek at a colleague's salary file, or accepting a lavish gift from a vendor under evaluation, are everyday violations.",
   "On the exam, clue words such as 'public safety', 'critical infrastructure' or 'society' point to canon one. 'Lie', 'conceal', 'illegal' or 'falsify' point to canon two. 'Client', 'employer' or 'competent service' point to canon three, and 'mentoring', 'reputation of the profession' or 'unqualified practice' point to canon four. Think like a manager and a professional at the same time: choose the answer that is honest, lawful and protects people, raise concerns through proper channels first, and document what you did. The best answer is usually measured and principled rather than silent or explosive."
  ],
  "terms": [
   [
    "ISC2 Code of Ethics",
    "The preamble and four canons that every ISC2-certified member agrees to follow as a condition of certification."
   ],
   [
    "Canon",
    "One of the four ranked principles of the code; when two conflict, the higher-ranked canon takes priority."
   ],
   [
    "Principal",
    "The party you serve professionally, such as an employer, client or customer."
   ],
   [
    "Conflict of interest",
    "A situation where personal gain or divided loyalty could influence, or appear to influence, professional judgment."
   ],
   [
    "Code of conduct",
    "An organization's own written statement of expected behavior, values and consequences for violations."
   ],
   [
    "Ethics hotline",
    "A confidential or anonymous channel for staff to report suspected misconduct without fear of retaliation."
   ],
   [
    "Tone at the top",
    "The ethical climate set by senior leadership through its own behavior and enforcement."
   ]
  ],
  "example": "A security engineer at a medical device maker discovers that an insulin pump's wireless interface lacks authentication. Her manager wants to delay disclosure until after a product launch. She documents the risk, escalates to the chief information security officer and the product safety board, and pushes for coordinated disclosure with regulators and customers. She chooses protecting patients (canon one) and honesty (canon two) over the launch schedule, while still working through legitimate internal channels.",
  "tip": "When answers pit canons against each other, pick the one that serves the higher canon: society first, then honesty and legality, then principals, then the profession. Prefer internal escalation before dramatic external action.",
  "check": [
   [
    "What is the correct priority order of the four ISC2 canons?",
    "Protect society and infrastructure; act honorably, honestly, justly, responsibly and legally; serve principals diligently and competently; advance and protect the profession."
   ],
   [
    "Your employer asks you to hide a vulnerability that could endanger the public. Which canon governs your response?",
    "Canon one, protecting society and the common good, which outranks the duty to principals in canon three."
   ],
   [
    "Who may file an ethics complaint about a breach of canon three?",
    "Only principals, meaning the employers, clients or customers the member served."
   ],
   [
    "Why does the preamble say members must 'be seen to adhere' to high standards?",
    "Because the appearance of impropriety, such as an undisclosed conflict of interest, erodes public trust even when no actual harm occurred."
   ]
  ]
 },
 {
  "t": "Security concepts: CIA triad, authenticity, non-repudiation",
  "body": [
   "Almost every CISSP question can be traced back to a small set of security goals. The best known is the CIA triad: confidentiality, integrity and availability. When a scenario describes a control or an attack, ask which of these it protects or harms. That habit will help you eliminate wrong answers quickly across all eight domains, because a control that does not serve the goal the scenario is worried about is rarely the best answer.",
   "Confidentiality means information is disclosed only to authorized people, processes and devices. Controls include encryption, access control lists, data classification and need-to-know. Threats include eavesdropping, shoulder surfing, misdirected email, social engineering and stolen laptops. Integrity means data and systems are protected from unauthorized or accidental change, and that any change can be detected. Hashes, digital signatures, input validation, change control and least privilege support integrity. Availability means authorized users get timely, reliable access when they need it. Redundancy, backups, patching, capacity planning, fault tolerance and denial-of-service protection all support availability.",
   "The goals trade off against each other. Strong encryption with a lost key destroys availability. Replicating a system widely for availability increases the number of places data can leak. Strict change control protects integrity but can slow emergency fixes. Security design is about balancing these according to what the business values most. A hospital may rank availability of patient records above everything else, a bank may put integrity of balances first, and a defense contractor may put confidentiality first. The data owner's priorities, not the security team's preferences, decide the balance.",
   "The triad is not the whole story. Authenticity means you can verify that data or a message really comes from its claimed source and has not been altered along the way. Non-repudiation means a party cannot credibly deny having performed an action, such as sending a message or approving a payment. Non-repudiation usually requires a digital signature made with a private key that only the signer controls, backed by reliable logging and trusted timestamps. A shared secret, such as a symmetric key or a hash-based message authentication code (HMAC), gives integrity and authentication between two parties, but not non-repudiation, because either party could have produced it. A plain hash gives integrity only, because anyone can compute it.",
   "Two related models appear often. The DAD triad (disclosure, alteration, destruction) is the attacker's view: each item is the opposite of one CIA goal. The Parkerian hexad adds possession or control, authenticity and utility to the triad; for example, an encrypted backup tape that is stolen is a loss of possession even if confidentiality holds. You may also see the extended goals of authentication, authorization and accountability, often called AAA. Remember that all of these goals apply to data at rest, in transit and in use, and to the systems and people around the data. A threat to availability might be a flood in the server room just as easily as a botnet.",
   "Consider a worked example. A purchasing manager emails a supplier approving a large order, then later claims she never sent it. If the email was sent over an encrypted channel only, the company can prove confidentiality but not who wrote it. If both parties shared a secret key and used an HMAC, the supplier can show the message was not altered, but the manager can argue the supplier generated it. If the email was signed with the manager's private key, stored on a smart card that only she holds, and the signing event was logged with a trusted timestamp, the company has non-repudiation. Her denial is no longer credible.",
   "Common mistakes: thinking encryption provides integrity by itself (only authenticated encryption modes do); treating a hash as proof of origin; assuming availability is not a security concern; and forgetting that non-repudiation depends on the private key being under the sole control of its owner. If a private key is shared among a team or copied onto several servers, the signatures lose their non-repudiation value.",
   "Exam questions use clue words. 'Disclosure', 'eavesdropping' or 'leak' point to confidentiality. 'Modified', 'tampered' or 'unauthorized change' point to integrity. 'Outage', 'downtime' or 'flood' point to availability. 'Cannot deny', 'proof of origin' or 'legally binding' point to non-repudiation and digital signatures. Think like a manager: the best answer protects the goal the business cares about most in that scenario, at a reasonable cost, rather than maximizing every goal at once."
  ],
  "terms": [
   [
    "Confidentiality",
    "Assurance that information is disclosed only to authorized people, processes and devices."
   ],
   [
    "Integrity",
    "Assurance that data and systems are protected from unauthorized or accidental change, and that changes can be detected."
   ],
   [
    "Availability",
    "Assurance that authorized users have timely and reliable access to information and systems."
   ],
   [
    "Authenticity",
    "The property of being verifiably genuine, coming from the claimed source and unaltered."
   ],
   [
    "Non-repudiation",
    "Assurance that a party cannot credibly deny having performed an action, usually provided by digital signatures and logging."
   ],
   [
    "DAD triad",
    "Disclosure, alteration and destruction: the attacker-focused opposites of confidentiality, integrity and availability."
   ],
   [
    "Parkerian hexad",
    "A model that extends the CIA triad with possession or control, authenticity and utility."
   ]
  ],
  "example": "An online brokerage requires customers to confirm large trades with a signing key stored in a hardware token. Months later a customer disputes a trade, saying he never placed it. The brokerage produces the signed order, the certificate linking the public key to the customer, and timestamped logs. Because only the customer controlled the private key, the signature provides non-repudiation, which a password or shared secret could not.",
  "tip": "If a question asks which control provides non-repudiation, look for a digital signature. Symmetric encryption, HMACs and hashes alone cannot provide it, because more than one party holds the secret or anyone can compute the hash.",
  "check": [
   [
    "A ransomware attack encrypts a hospital's patient records. Which CIA goal is most directly harmed?",
    "Availability, because authorized clinicians can no longer access the records when needed, although confidentiality may also be at risk if data was stolen."
   ],
   [
    "Why does an HMAC not provide non-repudiation?",
    "Both parties share the same secret key, so either could have generated the HMAC and the sender can plausibly deny creating it."
   ],
   [
    "What is the attacker-oriented counterpart of the CIA triad?",
    "The DAD triad: disclosure, alteration and destruction."
   ],
   [
    "What condition must hold for a digital signature to provide non-repudiation?",
    "The signer's private key must be under the signer's sole control, supported by trustworthy certificates, logging and timestamps."
   ]
  ]
 },
 {
  "t": "Security governance: alignment with business strategy, roles, due care vs due diligence",
  "body": [
   "Security governance is the set of structures, responsibilities and processes through which senior leadership directs and controls security. The CISSP exam treats security as a business function, not a technical hobby. The right answer to a governance question is almost always the one that supports the organization's mission, goals and objectives, is sponsored by senior management and flows from the top down. A bottom-up approach, where the IT team decides security priorities on its own, tends to lack funding, authority and business support.",
   "Alignment with business strategy works through planning horizons. A strategic plan is long-term, often three to five years, and ties security to the mission and risk appetite. A tactical plan covers roughly a year and turns strategy into projects, such as deploying multifactor authentication or building a security operations center. Operational plans are short-term and detailed: schedules, staffing, budgets and procedures. Security should act as an enabler that lets the business pursue opportunities safely, and it must be funded and prioritized like any other business function, with metrics that leaders understand.",
   "Roles matter because accountability cannot be delegated away. Senior management, including the board and chief executive, holds ultimate responsibility for protecting the organization. The chief information security officer (CISO) leads the program and should report high enough, ideally outside the IT chain, to avoid a conflict of interest between delivering IT services quickly and securing them. A security steering committee brings business leaders together to set priorities and resolve conflicts. Data owners, usually senior business managers, decide classification and who gets access. Custodians, often IT staff, implement the owner's decisions day to day. Users follow policy, and auditors provide independent assurance that controls work as intended.",
   "Governance is also shaped by organizational processes such as acquisitions, divestitures and outsourcing. When companies merge, their security postures merge too, including hidden weaknesses, unknown accounts and incompatible policies, so due diligence before the deal matters. When a business unit is sold, data, identities and network access must be separated cleanly. Governance frameworks help structure this work: COBIT (Control Objectives for Information and Related Technologies) for IT governance, the ISO/IEC 27000 family for information security management systems, and the NIST Cybersecurity Framework, whose current version adds an explicit Govern function.",
   "Due care and due diligence are frequently tested. Due care is doing what a reasonable, prudent person would do in the same situation: implementing sensible controls, following policy and acting responsibly. Due diligence is the investigation and ongoing effort to know what is reasonable and to confirm it is working: researching risks, assessing vendors before signing, monitoring controls and auditing them. A common memory aid: due diligence is 'do detect' (research and verify), and due care is 'do correct' (take the action). The prudent person rule holds senior leaders to this standard, and failing to exercise due care can lead to a finding of negligence, exposing the organization and its leaders to liability.",
   "Consider a worked example. A retailer plans to acquire a smaller online competitor. Before signing, the CISO's team reviews the target's audit reports, breach history, payment card compliance status and third-party contracts. That review is due diligence. They discover the target stores card numbers unencrypted. The acquisition agreement then requires remediation, and after closing the retailer encrypts the data, removes unnecessary copies and brings the systems under its own policies. Those actions are due care. The steering committee tracks the work, and the board receives a summary of residual risk, because the board remains accountable.",
   "Common mistakes: saying the CISO or IT department is ultimately responsible for security; confusing governance (setting direction and oversight) with management (running the program day to day); mixing up due care and due diligence; and choosing technical fixes when the scenario really lacks senior management support or a policy. Another trap is placing the CISO under the chief information officer in every case. It can work, but independence is the principle the exam rewards.",
   "Exam wording gives clues. 'Ultimately responsible' or 'accountable' points to senior management or the board. 'Researched', 'investigated' or 'assessed before' points to due diligence, while 'implemented', 'acted' or 'reasonable person' points to due care. 'First step in building a program' usually points to gaining senior management support. Think like a manager: choose answers that align security with business goals, assign clear ownership and can be justified to a board."
  ],
  "terms": [
   [
    "Security governance",
    "The leadership structures, responsibilities and processes that direct and oversee an organization's security program."
   ],
   [
    "Strategic plan",
    "A long-term plan, often three to five years, that aligns security with the organization's mission and goals."
   ],
   [
    "Tactical plan",
    "A mid-term plan, around one year, that turns strategy into specific projects and initiatives."
   ],
   [
    "Due care",
    "Acting as a reasonable, prudent person would by implementing and maintaining appropriate controls."
   ],
   [
    "Due diligence",
    "The research, assessment and ongoing verification needed to know what controls are appropriate and whether they work."
   ],
   [
    "Chief information security officer (CISO)",
    "The executive who leads the security program and advises senior management on risk."
   ],
   [
    "Security steering committee",
    "A group of business and technical leaders that sets security priorities and resolves conflicts."
   ]
  ],
  "example": "After a costly breach at a peer company, a regional bank's board asks whether it could happen to them. The CISO, who reports to the chief risk officer rather than the CIO, presents a three-year strategic plan tied to the bank's growth goals, a one-year tactical roadmap and quarterly metrics. The board approves funding and formally accepts the residual risks listed, showing that accountability sits with senior leadership.",
  "tip": "Ultimate responsibility for security always sits with senior management. Due diligence is knowing and verifying (research, assess, monitor); due care is doing (implement and maintain reasonable controls).",
  "check": [
   [
    "Who holds ultimate responsibility for an organization's security?",
    "Senior management, including the board and chief executive; they can delegate tasks but not accountability."
   ],
   [
    "A company reviews a cloud provider's audit reports before signing a contract. Is this due care or due diligence?",
    "Due diligence, because it is research and assessment to determine what is reasonable before acting."
   ],
   [
    "Why should the CISO ideally report outside the IT chain?",
    "To avoid a conflict of interest between delivering IT services quickly and cheaply and securing them properly."
   ],
   [
    "What planning horizon covers a one-year project to roll out multifactor authentication?",
    "Tactical planning, which translates the long-term strategy into specific mid-term projects."
   ]
  ]
 },
 {
  "t": "Legal and regulatory issues: cybercrime, privacy law, intellectual property, transborder data flow",
  "body": [
   "A CISSP is expected to understand the legal environment well enough to know which obligations apply, how laws shape controls and when to call legal counsel. You are not expected to be a lawyer, and exam answers that suggest you act as one, such as deciding on your own whether a breach is legally reportable, are usually wrong. Laws fall into three broad categories you should recognize: criminal law (offenses against society, prosecuted by the government and punished by prison or fines), civil law (disputes between parties, remedied by damages, such as contract breaches) and administrative or regulatory law (rules made by government agencies that carry the force of law).",
   "Cybercrime laws make unauthorized access, damage to systems, fraud and related acts illegal. In the United States the Computer Fraud and Abuse Act is the classic example, and most countries have their own statutes. International efforts such as the Budapest Convention on Cybercrime try to harmonize definitions and cooperation between countries. The practical challenges are jurisdiction, because the attacker, victim and servers may sit in different countries, and gathering evidence across borders, which often depends on treaties and slow legal processes.",
   "Privacy law protects personal information. The European Union's General Data Protection Regulation (GDPR) is the most influential: it defines personal data broadly, requires a lawful basis for processing, grants rights such as access, correction and erasure, and generally requires notifying the supervisory authority of a qualifying breach within 72 hours of becoming aware of it. It applies to organizations outside the EU that offer goods or services to, or monitor, people in the EU. In the United States privacy is largely sector-based: health data under the Health Insurance Portability and Accountability Act (HIPAA), financial data under the Gramm-Leach-Bliley Act (GLBA), children's online data under the Children's Online Privacy Protection Act (COPPA), plus a growing set of state laws. The Payment Card Industry Data Security Standard (PCI DSS) governs card data, but it is an industry contractual standard, not a law.",
   "Intellectual property (IP) comes in four main forms. Copyright protects original works of expression, such as source code and documentation, and arises automatically when the work is created. Trademarks protect names, logos and symbols that identify a brand. Patents protect novel, useful and non-obvious inventions for a limited term in exchange for public disclosure. Trade secrets protect valuable confidential information, such as a formula or algorithm, for as long as the owner takes reasonable steps to keep it secret, which is where security controls and non-disclosure agreements come in. Software licensing, including end-user agreements and open-source licenses, is contract law layered on copyright.",
   "Transborder data flow is the movement of personal data across national borders. Many jurisdictions restrict transfers to countries without adequate protection. GDPR allows transfers based on adequacy decisions or on safeguards such as standard contractual clauses and binding corporate rules. Data localization or sovereignty laws may require certain data to stay in-country. Import and export controls also apply to technology itself, including some strong cryptography, and the Wassenaar Arrangement coordinates export controls among participating countries. For cloud and outsourcing decisions, knowing where data physically resides, and where support staff who can access it sit, is a governance requirement.",
   "Consider a worked example. A US software company launches a subscription app used by customers in France and Germany, stores data in a US cloud region and uses an offshore support team. Legal counsel identifies that GDPR applies, so the company documents a lawful basis, publishes a privacy notice, signs a data processing agreement with the cloud provider and uses an approved transfer mechanism. The security team builds a breach response plan that can meet the 72-hour notification window, protects the proprietary recommendation algorithm as a trade secret with access controls and NDAs, and registers the product name as a trademark.",
   "Common mistakes: calling PCI DSS a law; thinking copyright requires registration to exist; assuming a trade secret stays protected after the owner stops guarding it; believing GDPR applies only to European companies; and confusing a civil lawsuit with a criminal prosecution. Another error is having the security team decide legal questions alone rather than involving counsel.",
   "Exam clue words help. 'Prosecuted', 'jail' or 'beyond reasonable doubt' point to criminal law; 'damages' or 'contract' point to civil law; 'agency rule' or 'fine by regulator' point to administrative law. 'Logo' means trademark, 'invention' means patent, 'code' or 'book' means copyright, and 'kept confidential' means trade secret. Think like a manager: identify obligations early, involve legal counsel and privacy officers, and build compliance into design rather than reacting after a breach."
  ],
  "terms": [
   [
    "Criminal law",
    "Law addressing offenses against society, prosecuted by the government and punishable by fines or imprisonment."
   ],
   [
    "Civil law",
    "Law governing disputes between private parties, typically resolved through monetary damages or court orders."
   ],
   [
    "GDPR",
    "The European Union's General Data Protection Regulation, which governs processing of personal data about people in the EU."
   ],
   [
    "Copyright",
    "Protection for original works of expression, such as software code, that arises automatically when the work is created."
   ],
   [
    "Patent",
    "Time-limited protection for a novel, useful and non-obvious invention, granted in exchange for public disclosure."
   ],
   [
    "Trade secret",
    "Valuable confidential business information protected for as long as the owner takes reasonable steps to keep it secret."
   ],
   [
    "Transborder data flow",
    "The transfer of data, especially personal data, across national borders, often restricted by privacy and localization laws."
   ]
  ],
  "example": "A European retailer wants to move its customer analytics to a provider whose engineers work in several countries. Before signing, its privacy officer confirms which regions will store the data, requires standard contractual clauses for transfers, and adds contract terms on breach notification and sub-processors. The security team adds encryption with customer-managed keys so data stays unreadable to anyone the retailer has not authorized.",
  "tip": "Match the IP type to the asset: code is copyrighted, a logo is trademarked, an invention is patented, and a confidential recipe or algorithm is a trade secret. Remember PCI DSS is a contractual standard, not a law.",
  "check": [
   [
    "A company's secret pricing algorithm is protected only by NDAs and strict access controls. What form of IP protection is this?",
    "A trade secret, which lasts as long as the owner takes reasonable steps to keep it confidential."
   ],
   [
    "Why is jurisdiction a major challenge in cybercrime cases?",
    "Attackers, victims and infrastructure are often in different countries with different laws, so prosecution and evidence gathering require cross-border cooperation."
   ],
   [
    "Is PCI DSS a law? Explain.",
    "No. It is an industry standard enforced through contracts between merchants, banks and card brands, although some laws reference it."
   ],
   [
    "Name two mechanisms GDPR recognizes for transferring personal data out of the EU.",
    "Adequacy decisions and appropriate safeguards such as standard contractual clauses or binding corporate rules."
   ]
  ]
 },
 {
  "t": "Investigation types: administrative, criminal, civil, regulatory",
  "body": [
   "Not every investigation is the same. The type determines who runs it, what standard of proof applies, how carefully evidence must be handled and what the outcome can be. The exam expects you to match a scenario to the right investigation type, to know which one demands the most rigor, and to recognize that an investigation can change type as facts emerge. An internal policy review can become a criminal case the moment you find evidence of fraud.",
   "Administrative, sometimes called operational, investigations are internal. They look at policy violations or operational problems, such as an employee misusing company email or a root-cause analysis after an outage. They are run by the organization, often by human resources (HR) and security together, and the outcome is disciplinary action or process improvement. The standard of proof is the lowest: management needs reasonable grounds for its decision. Even so, it is wise to handle evidence carefully from the start, because you do not know yet whether the matter will escalate.",
   "Criminal investigations involve alleged violations of criminal law and are conducted by law enforcement. The standard of proof is 'beyond a reasonable doubt', the highest, because liberty is at stake. Evidence must be collected under strict rules, with a documented chain of custody, and search warrants may be required. Once you involve law enforcement, you lose some control over the timeline, the evidence and publicity, and systems may be seized. That is why the decision to call police usually rests with senior management on the advice of legal counsel, not with an individual analyst.",
   "Civil investigations support lawsuits between parties, such as a contract dispute, wrongful termination claim or intellectual property case. The standard is 'preponderance of the evidence', meaning more likely than not. Discovery rules require parties to preserve and produce relevant information, which is where legal holds and electronic discovery (eDiscovery) come in. The Electronic Discovery Reference Model (EDRM) describes the stages: information governance, identification, preservation, collection, processing, review, analysis, production and presentation.",
   "Regulatory investigations are conducted by government agencies, or by industry bodies acting under their authority, to determine whether an organization has broken a regulation. The standard of proof varies with the regulator and the rule. Outcomes include fines, sanctions, consent orders and required remediation. Industry-standard investigations, such as a forensic investigation required after a payment card breach, work similarly in practice even though they flow from contracts rather than law. Across all types, good practice is the same: preserve evidence early, document every step, image media with write blockers and verify copies with hashes, limit who touches evidence and involve legal counsel early. Evidence must be relevant, reliable and admissible, and the best evidence rule prefers original documents over copies where possible.",
   "Consider a worked example. A data loss prevention alert shows an engineer uploading design files to a personal cloud account. Security and HR open an administrative investigation and, on counsel's advice, preserve the laptop image and logs with a chain of custody. The review shows the engineer accepted a job at a competitor the week before. The company's lawyers now prepare a civil claim for trade secret misappropriation and issue a legal hold. Because the files include export-controlled technology, counsel also notifies the relevant authority, which may open a regulatory or criminal inquiry. Careful evidence handling at the first step keeps every one of those options open.",
   "Common mistakes: assuming internal investigations need no evidence discipline; confronting a suspect or tipping them off before evidence is secured; letting an analyst decide alone to call the police; mixing up 'preponderance of the evidence' with 'beyond a reasonable doubt'; and working on original media rather than verified forensic copies. Another trap is thinking regulatory and criminal matters are always the same thing. A regulator can fine an organization without anyone being charged with a crime.",
   "Exam questions give clues. 'Policy violation', 'HR' or 'root cause' point to administrative. 'Law enforcement', 'prosecution' or 'beyond reasonable doubt' point to criminal. 'Lawsuit', 'damages' or 'more likely than not' point to civil. 'Agency', 'compliance', 'regulator' or 'sanctions' point to regulatory. When asked what to do first in a potential criminal matter, think like a manager: preserve evidence, notify senior management and legal counsel, and let them decide on outside involvement."
  ],
  "terms": [
   [
    "Administrative investigation",
    "An internal inquiry into policy violations or operational issues, leading to discipline or process changes."
   ],
   [
    "Criminal investigation",
    "An inquiry by law enforcement into alleged crimes, requiring proof beyond a reasonable doubt."
   ],
   [
    "Civil investigation",
    "Fact-finding to support a lawsuit between parties, judged on the preponderance of the evidence."
   ],
   [
    "Regulatory investigation",
    "An inquiry by a government agency or authorized body into possible violations of regulations."
   ],
   [
    "Chain of custody",
    "Documentation of who collected, handled and stored evidence, when and how, from collection to court."
   ],
   [
    "Legal hold",
    "An instruction to preserve all information relevant to anticipated or current litigation, suspending normal deletion."
   ],
   [
    "eDiscovery",
    "The process of identifying, preserving, collecting, reviewing and producing electronically stored information for legal matters."
   ]
  ],
  "example": "A payment processor detects unusual database queries and suspects card data theft. Its incident team images affected servers, hashes each image and logs every transfer on chain-of-custody forms. Counsel notifies the card brands, which require an independent forensic investigator, and informs law enforcement after executive approval. Months later the same carefully handled evidence supports a criminal case, a regulatory review and a civil suit from a partner bank.",
  "tip": "Criminal cases need the most rigorous evidence handling and the highest standard of proof. If a scenario might become criminal, preserve evidence and involve legal counsel and senior management before anyone calls the police.",
  "check": [
   [
    "Which investigation type uses the standard 'preponderance of the evidence'?",
    "Civil investigations, where the claim must be shown to be more likely true than not."
   ],
   [
    "Why should even administrative investigations follow careful evidence handling?",
    "Because they can escalate into civil or criminal matters, and poorly handled evidence may then be inadmissible."
   ],
   [
    "Who should normally decide whether to involve law enforcement?",
    "Senior management, advised by legal counsel, since it affects control of evidence, timelines and publicity."
   ],
   [
    "What is the purpose of hashing a forensic image?",
    "To prove the copy is identical to the original and has not been altered since collection."
   ]
  ]
 },
 {
  "t": "Policies, standards, procedures, baselines and guidelines",
  "body": [
   "Security documentation forms a hierarchy, and the exam likes to ask which document type fits a description. Each layer answers a different question: why and what (policy), which specific requirements (standards and baselines), how, step by step (procedures) and what we recommend (guidelines). Knowing whether each document is mandatory or optional is often the key to the right answer, and knowing who approves each one tells you how hard it is to change.",
   "A policy is a high-level statement of management intent. It says what the organization wants and why, not how to achieve it. Policies are approved by senior management, are mandatory and change rarely. The top document is usually an organizational security policy, sometimes called a program policy, which establishes the security program, assigns responsibilities, states leadership's commitment and gives authority to the rest of the documents. Beneath it sit issue-specific policies (acceptable use, email, remote work, bring your own device) and system-specific policies (rules for a particular application or platform). Good policies are technology-neutral so they survive product changes.",
   "A standard is a mandatory requirement that makes a policy measurable and consistent. Where the policy says 'sensitive data must be protected in transit', a standard might say 'use Transport Layer Security (TLS) at version 1.2 or higher with approved cipher suites'. Standards often name specific technologies, products or configurations and are updated more often than policies as technology changes. A baseline is a minimum level of security that a type of system must meet, usually expressed as a configuration, such as a hardened server build or a benchmark from the Center for Internet Security (CIS). Baselines are mandatory minimums; systems may exceed them. They make audits easier because you can compare a system against a known, approved state.",
   "A procedure is a detailed, step-by-step instruction for performing a task, such as creating a user account, rotating a key or responding to a lost laptop report. Procedures are mandatory for the people who perform them and support consistency, training and evidence of due care. A guideline is a recommendation, not a requirement. It offers advice where flexibility is appropriate, such as tips for choosing a memorable passphrase or suggestions for securing a home router. The documents work together: policy states intent, standards and baselines set mandatory specifics, procedures explain how, and guidelines help where judgment is needed.",
   "Documents need a life cycle. They should be reviewed on a schedule, often annually, and after major changes such as a merger, a new law or a significant incident. They must be communicated to the people affected, acknowledged where appropriate and backed by enforcement. Exceptions should be formally requested, risk-assessed, approved by the right authority and time-limited, so one-off decisions do not quietly erode the program. Keeping policies short and stable, and putting details in lower-level documents, means you rarely need executive approval to update a configuration.",
   "Consider a worked example. A company's acceptable use policy, signed by the chief executive, states that company data may be accessed only from managed devices. The mobile device standard requires full-device encryption, a screen lock and a supported operating system version. The baseline for company laptops is a specific hardened image. The enrollment procedure walks the help desk through registering a new phone step by step. A guideline suggests that staff avoid public charging stations when traveling. When a new phone model arrives, only the standard and procedure change; the policy stays the same.",
   "Common mistakes: calling a baseline optional; putting product names or version numbers into a policy, which then needs executive approval every time technology changes; treating guidelines as mandatory; and confusing a procedure with a standard. Another frequent error is writing policies that no one enforces or approves, which makes them worthless as evidence of due care. Finally, remember that procedures are mandatory for the staff who perform them; they are detailed, but detail does not make them optional.",
   "Exam wording is usually precise. 'High-level statement of intent' or 'approved by senior management' points to policy. 'Mandatory specific technology or configuration' points to standard. 'Minimum security level' or 'hardened build' points to baseline. 'Step-by-step' points to procedure. 'Recommended', 'suggested' or 'best practice' points to guideline. Think like a manager: policies come first and come from the top, everything else supports them, and exceptions go through formal risk acceptance."
  ],
  "terms": [
   [
    "Policy",
    "A high-level, mandatory statement of management intent approved by senior leadership."
   ],
   [
    "Standard",
    "A mandatory, specific requirement, such as a technology or configuration, that makes a policy measurable."
   ],
   [
    "Baseline",
    "A mandatory minimum security configuration for a type of system that may be exceeded but not undercut."
   ],
   [
    "Procedure",
    "Detailed, mandatory step-by-step instructions for performing a specific task."
   ],
   [
    "Guideline",
    "An optional recommendation or best practice that allows discretion."
   ],
   [
    "Policy exception",
    "A formally requested, risk-assessed, approved and time-limited deviation from a policy or standard."
   ]
  ],
  "example": "An auditor asks how a healthcare provider protects laptops. The security manager shows the data protection policy approved by the board, the encryption standard naming approved algorithms, the laptop baseline image, the imaging procedure used by technicians and a travel guideline for staff. A temporary exception for a research laptop running old software is documented with compensating controls and an expiry date, showing the hierarchy is working.",
  "tip": "Guidelines are the only optional document in the hierarchy. Policies are high-level and technology-neutral; standards and baselines are specific and mandatory; procedures are step by step.",
  "check": [
   [
    "Which document type states 'all remote access must use multifactor authentication' without naming a product?",
    "A policy, because it is a high-level, technology-neutral statement of management intent."
   ],
   [
    "What is the difference between a standard and a baseline?",
    "A standard sets a specific mandatory requirement, while a baseline defines the minimum security configuration a type of system must meet."
   ],
   [
    "Why should product names be kept out of policies?",
    "Policies require senior approval and change rarely; product details belong in standards and procedures that can be updated more easily."
   ],
   [
    "How should a business unit that cannot meet a standard be handled?",
    "Through a formal exception: documented request, risk assessment, compensating controls, approval by the right authority and an expiry date."
   ]
  ]
 },
 {
  "t": "Business continuity: BIA, RTO/RPO/MTD, BCP scope",
  "body": [
   "Business continuity planning (BCP) keeps critical business functions running, or restores them quickly, during and after a disruption. Disaster recovery (DR) is the narrower, more technical part focused on restoring IT systems and data. The CISSP exam treats BCP as a business-led effort: senior management must sponsor it, business units must participate, and the first priority in any disaster is the safety of people. Systems and data always come after human life.",
   "The process starts with project scope and planning. You analyze the organization's structure, form a BCP team that includes business unit representatives, legal, IT, facilities, human resources and communications, confirm resources and obtain senior management approval. Scope defines which locations, business units, processes and threats the plan covers. A plan that tries to cover everything at once usually stalls, so scope is set deliberately and expanded over time. Legal and regulatory requirements, such as obligations to keep certain services running, also shape scope.",
   "The business impact analysis (BIA) is the heart of BCP. It identifies critical business processes, the resources they depend on (people, systems, suppliers, facilities, data) and the impact of losing them over time, both financial and non-financial, such as reputation damage, safety issues and regulatory penalties. The BIA focuses on the impact of losing a function regardless of the cause, which is what separates it from a risk assessment that looks at specific threats and their likelihood. The BIA also reveals dependencies: a payroll process may be critical only near pay dates, while an order system may be critical every hour.",
   "From the BIA come the key time values. Maximum tolerable downtime (MTD), also called the maximum tolerable period of disruption, is the longest a process can be unavailable before the damage becomes unacceptable or threatens the organization's survival. Recovery time objective (RTO) is the target time to restore the process or system after a disruption, and it must be shorter than the MTD. Recovery point objective (RPO) is the maximum acceptable data loss measured in time: an RPO of four hours means backups or replication must capture data at least every four hours. Work recovery time (WRT) is the time needed after systems are restored to verify data and resume normal work, so RTO plus WRT should not exceed MTD.",
   "After the BIA, the team selects continuity strategies such as alternate sites, manual workarounds, redundant suppliers and cross-trained staff, then documents the plan, trains people and tests it. Tests range from read-throughs and tabletop walkthroughs to simulations, parallel tests and full interruption tests, which carry the most risk. Recovery site choices follow from RTO and cost: hot sites are ready almost immediately but are expensive; warm sites have equipment but need current data and configuration; cold sites provide only space and utilities. Cloud recovery, mobile sites and reciprocal agreements are other options with their own trade-offs. The plan must be maintained as the business changes, or it quietly becomes useless.",
   "Consider a worked example. An online retailer's BIA shows that losing order processing costs a great deal per hour and that after 24 hours customers will defect in large numbers, so the MTD is 24 hours. The team sets an RTO of eight hours and estimates four hours of work recovery to reconcile orders, which fits inside the MTD. Because losing more than 15 minutes of orders is unacceptable, the RPO is 15 minutes, so nightly backups are not enough and the team adds database replication to a warm cloud environment. The email archive, by contrast, has an MTD of a week and uses cheaper daily backups.",
   "Common mistakes: setting an RTO longer than the MTD; confusing RPO (data loss) with RTO (restore time); treating BCP as an IT project; starting with technology choices before the BIA; and forgetting that people's safety comes first. Another trap is assuming a full interruption test is always best. It gives the most realistic results, but it can itself cause an outage and needs strong justification and management approval.",
   "Exam clues: 'how much data can we lose' points to RPO; 'how fast must it be back' points to RTO; 'longest the business can survive without it' points to MTD; 'identify critical processes and impact' points to the BIA. 'First step' in BCP usually means project scope and senior management support. Think like a manager: continuity strategy should be proportional to business impact, justified on cost, approved by leadership and tested regularly."
  ],
  "terms": [
   [
    "Business continuity planning (BCP)",
    "The process of keeping critical business functions operating during and after a disruption."
   ],
   [
    "Business impact analysis (BIA)",
    "An analysis that identifies critical processes, their dependencies and the impact of their loss over time."
   ],
   [
    "Maximum tolerable downtime (MTD)",
    "The longest a process can be unavailable before the damage becomes unacceptable."
   ],
   [
    "Recovery time objective (RTO)",
    "The target time to restore a process or system after a disruption, which must be less than the MTD."
   ],
   [
    "Recovery point objective (RPO)",
    "The maximum acceptable amount of data loss, measured as time since the last good copy."
   ],
   [
    "Work recovery time (WRT)",
    "The time needed after systems are restored to verify data and resume normal operations."
   ],
   [
    "Hot site",
    "A fully equipped alternate site with current data that can take over almost immediately."
   ]
  ],
  "example": "A regional hospital's BIA finds that its electronic health record system has an MTD of four hours because patient care depends on it. Leadership funds a hot standby in a second data center with continuous replication, giving an RTO of one hour and an RPO near zero. Less critical systems, such as the staff training portal, use a cold-site approach with weekly backups because the impact of losing them for days is low.",
  "tip": "RPO is about data (how much you can lose); RTO is about time to restore. RTO must be less than MTD, and RTO plus work recovery time should fit inside MTD. People's safety always comes first.",
  "check": [
   [
    "A process has an MTD of 12 hours. Is an RTO of 16 hours acceptable?",
    "No. The RTO must be shorter than the MTD, or the organization will suffer unacceptable damage before recovery completes."
   ],
   [
    "Backups run every night at midnight. What RPO does this support?",
    "Up to 24 hours of data loss; a shorter RPO would require more frequent backups or replication."
   ],
   [
    "How does a BIA differ from a risk assessment?",
    "A BIA measures the impact of losing a process regardless of cause, while a risk assessment evaluates specific threats, vulnerabilities and likelihood."
   ],
   [
    "Which type of BCP test carries the most operational risk?",
    "A full interruption test, because it actually shuts down primary operations to test recovery."
   ]
  ]
 },
 {
  "t": "Personnel security: screening, onboarding, transfers, termination, vendor agreements",
  "body": [
   "People are both the greatest asset and one of the largest sources of risk in any security program. Personnel security policies manage that risk across the whole employment life cycle: before hiring, during employment, when roles change and when people leave. They also extend to contractors, consultants and vendors who get access to your systems or data, because an outsider with credentials can do as much harm as an employee.",
   "It starts before hiring. Job descriptions should state the security responsibilities and sensitivity of each role, which drives how much screening is needed. Screening can include identity verification, employment and education checks, reference checks, criminal background checks and, for some roles, credit checks or government security clearances. Screening must follow local law, be proportional to the role and be applied consistently, because unequal treatment creates legal and ethical risk. Candidates typically sign a non-disclosure agreement (NDA) and acknowledge the acceptable use policy before receiving access.",
   "Onboarding turns a candidate into a trusted user. The new hire gets security awareness training, agrees to policies in writing and is provisioned with only the access their role needs. Accounts should be created through a formal request and approval process, ideally driven by the HR system of record, not as a quick favor from IT. During employment, several controls reduce the chance that one person can cause serious harm undetected. Separation of duties splits critical tasks so no single person can complete them alone, such as requesting and approving a payment. Job rotation moves people between roles so fraud is harder to hide and knowledge is spread. Mandatory vacations force someone else to perform a person's duties for a while, which often exposes ongoing fraud. Collusion, where two or more people cooperate to defeat these controls, is the risk that remains, so monitoring and audits still matter.",
   "Transfers and promotions are a common source of privilege creep, where users accumulate access from every role they have held. When someone changes roles, their old access should be removed and new access granted based on the new role, not simply added on top. Periodic access reviews by managers and data owners catch what slips through. Termination should be planned and handled respectfully. For involuntary terminations, access is disabled at or just before the moment the person is notified, company property is collected, and an exit interview reminds them of continuing obligations such as the NDA. Voluntary departures still need prompt, complete deprovisioning, including shared passwords the person knew and cloud services they used.",
   "Vendors, consultants and contractors need equivalent controls, applied through contracts. Agreements should define security requirements, background check expectations, right to audit, breach notification duties, data handling rules, and return or destruction of data at contract end. Service-level agreements (SLAs) set measurable performance commitments, while memoranda of understanding and interconnection security agreements govern links between organizations. Access for third parties should be time-limited, monitored and reviewed as carefully as employee access.",
   "Consider a worked example. A finance clerk moves to the procurement team. Her manager requests procurement access, but nobody removes her old ability to approve payments. She can now both create vendors in procurement and approve payments in finance, breaking separation of duties. A quarterly access review flags the conflict. The fix is to remove the old finance role, update the transfer procedure so the HR system triggers automatic removal of prior-role access, and add a report that detects toxic combinations of permissions.",
   "Common mistakes: disabling access days after a termination; treating contractors as outside the scope of personnel policy; running background checks inconsistently; forgetting shared or service account passwords the departing person knew; and assuming separation of duties prevents collusion. It only raises the bar by requiring more than one person to cooperate. Screening also is not a one-time event: people in sensitive roles may need periodic rechecks as their responsibilities grow.",
   "Exam clues: 'fraud discovered while an employee was away' points to mandatory vacation; 'no single person can complete a transaction' points to separation of duties; 'user has access from previous jobs' points to privilege creep and access reviews; 'contractor data obligations' points to contracts and SLAs. Think like a manager: balance security with fairness and legality, apply controls consistently and involve HR and legal counsel in screening and termination decisions."
  ],
  "terms": [
   [
    "Background screening",
    "Verification of a candidate's identity, history and suitability, proportional to the sensitivity of the role."
   ],
   [
    "Non-disclosure agreement (NDA)",
    "A contract obliging a person to keep specified information confidential, often beyond employment."
   ],
   [
    "Separation of duties",
    "Splitting a critical task among multiple people so no one person can complete it alone."
   ],
   [
    "Job rotation",
    "Moving staff between roles periodically to deter fraud and spread knowledge."
   ],
   [
    "Mandatory vacation",
    "Requiring employees to take time off so others perform their duties and irregularities surface."
   ],
   [
    "Privilege creep",
    "The gradual accumulation of access rights beyond what a user's current role requires."
   ],
   [
    "Service-level agreement (SLA)",
    "A contract defining measurable service commitments, such as availability and response times."
   ]
  ],
  "example": "A software company decides to dismiss a database administrator for misconduct. HR schedules the meeting for 10:00. At 09:55 the identity team disables his directory account, VPN token and cloud console access and rotates passwords for shared administrative accounts he knew. During the meeting security collects his laptop and badge, and HR reminds him in writing of his NDA obligations.",
  "tip": "For involuntary terminations, disable access before or at the same time the employee is told. Mandatory vacations and job rotation detect fraud; separation of duties prevents it but cannot stop collusion.",
  "check": [
   [
    "An employee's fraud is discovered while she is on a required two-week leave. Which control worked?",
    "Mandatory vacation, which forces someone else to perform the duties and exposes irregularities."
   ],
   [
    "What should happen to a user's existing access when they transfer to a new department?",
    "Access for the old role should be removed and new access granted for the new role, preventing privilege creep."
   ],
   [
    "Why must background screening be applied consistently?",
    "Inconsistent screening can be discriminatory and illegal, and it creates gaps that undermine the control."
   ],
   [
    "Name three security items a vendor contract should include.",
    "Security requirements, right to audit and breach notification duties; data return or destruction at contract end is another."
   ]
  ]
 },
 {
  "t": "Risk management: identification, assessment (qualitative and quantitative), response, frameworks",
  "body": [
   "Risk management is how an organization decides where to spend limited security resources. A risk is the likelihood that a threat will exploit a vulnerability, combined with the resulting impact on an asset. A threat is a potential cause of harm, such as a criminal group, an insider or a flood; the threat agent or actor is whoever or whatever carries it out. A vulnerability is a weakness, such as an unpatched server or an untrained employee. Exposure is being susceptible to loss, and a safeguard or countermeasure reduces risk. Keeping these terms straight is essential, because the exam uses them precisely.",
   "Identification starts with an inventory of assets and their value to the business, then lists the threats and vulnerabilities that apply. Sources include threat intelligence, vulnerability scans, penetration tests, audits, incident history and interviews with the people who run the processes. The result is often recorded in a risk register that names each risk, its owner, its rating and the planned response, so decisions are tracked over time.",
   "Assessment comes in two forms. Qualitative analysis uses ratings such as low, medium and high, often in a likelihood-by-impact matrix, and draws on expert judgment through workshops, interviews or the Delphi technique (anonymous rounds of expert input that avoid groupthink). It is fast and handles hard-to-price harms such as reputation. Quantitative analysis puts monetary values on risk. Asset value (AV) times exposure factor (EF, the percentage of value lost in one incident) gives single loss expectancy: SLE = AV x EF. The annualized rate of occurrence (ARO) is how often the event is expected per year. Annualized loss expectancy is ALE = SLE x ARO. Most organizations use a hybrid, quantifying where data exists and using judgment elsewhere.",
   "Quantitative results support cost-benefit decisions. The value of a safeguard is ALE before the control minus ALE after it, minus the annual cost of the control. If the result is positive, the control is financially justified. Risk response options are: mitigate (reduce likelihood or impact with controls), transfer or share (insurance, or outsourcing with contractual liability), avoid (stop the risky activity) and accept (formally acknowledge the risk, with management sign-off). Ignoring or rejecting a risk is never acceptable. Total risk is the risk before controls; residual risk is what remains after them. Risk appetite and tolerance, set by leadership, determine which residual risks are acceptable, and the risk owner, not the security team, signs the acceptance.",
   "Frameworks give structure. The NIST Risk Management Framework (RMF) has steps to prepare, categorize, select, implement, assess, authorize and monitor. ISO/IEC 27005 gives information security risk guidance, ISO 31000 covers enterprise risk management in general, and the NIST Cybersecurity Framework organizes outcomes into functions including Govern, Identify, Protect, Detect, Respond and Recover. Continuous monitoring keeps the assessment current as threats and systems change, and control assessments verify that safeguards still work.",
   "Consider a worked example. A $200,000 warehouse system faces a flood risk with a 25 percent exposure factor, so SLE = $200,000 x 0.25 = $50,000. Floods are expected once every two years, so ARO = 0.5 and ALE = $25,000. A flood barrier costing $20,000 a year would cut the ARO to 0.1, giving an ALE of $5,000. Its value is $25,000 minus $5,000 minus $20,000, which is zero: break-even. An insurance policy costing $8,000 a year that covers most of the loss might be the better choice, transferring the risk. Management reviews both, selects insurance and formally accepts the small residual risk.",
   "Common mistakes: confusing threat with vulnerability; multiplying the wrong values (EF is a percentage of AV, not of ALE); spending more on a control than the loss it prevents; thinking insurance transfers all consequences (reputation damage and legal accountability stay with you); and letting technical staff accept risk that belongs to a business owner. Another error is treating risk assessment as a one-time project rather than a continuous cycle.",
   "Exam wording helps. 'Anonymous expert rounds' points to Delphi; 'high, medium, low' points to qualitative; 'dollar value per year' points to ALE. 'Buy insurance' is transfer, 'stop offering the service' is avoid, and 'document and sign off' is accept. Think like a manager: choose the response that is cost-justified, owned by the right business leader and aligned with risk appetite, never the one that ignores the risk."
  ],
  "terms": [
   [
    "Risk",
    "The likelihood that a threat exploits a vulnerability, combined with the impact on an asset."
   ],
   [
    "Single loss expectancy (SLE)",
    "The expected monetary loss from one occurrence of a risk, calculated as asset value times exposure factor."
   ],
   [
    "Annualized rate of occurrence (ARO)",
    "The estimated number of times a risk event occurs in a year."
   ],
   [
    "Annualized loss expectancy (ALE)",
    "The expected yearly loss from a risk, calculated as SLE times ARO."
   ],
   [
    "Residual risk",
    "The risk that remains after safeguards have been applied."
   ],
   [
    "Risk transfer",
    "Shifting the financial impact of a risk to another party, such as through insurance or contracts."
   ],
   [
    "Delphi technique",
    "A qualitative method that gathers anonymous expert opinions over several rounds to reach consensus."
   ]
  ],
  "example": "A small online shop rates the risk of a web server outage as high likelihood and medium impact on its risk matrix. It moves the site to a managed platform with redundant hosting (mitigate), buys cyber insurance for breach costs (transfer), stops storing card numbers by using a payment processor (avoid) and has the owner sign off on the remaining risk of brief outages during upgrades (accept).",
  "tip": "Memorize SLE = AV x EF and ALE = SLE x ARO. A safeguard is justified when ALE before minus ALE after exceeds its annual cost. Ignoring risk is never a valid response, and business owners accept risk.",
  "check": [
   [
    "An asset worth $500,000 has an exposure factor of 40 percent and an ARO of 0.2. What is the ALE?",
    "SLE = $500,000 x 0.4 = $200,000; ALE = $200,000 x 0.2 = $40,000 per year."
   ],
   [
    "A company stops offering a risky product line to eliminate a risk. Which response is this?",
    "Risk avoidance, because the activity that creates the risk is removed."
   ],
   [
    "What is the difference between total risk and residual risk?",
    "Total risk exists before controls are applied; residual risk is what remains after controls."
   ],
   [
    "Who should formally accept a residual risk?",
    "The business owner or senior manager accountable for the asset, in line with the organization's risk appetite."
   ]
  ]
 },
 {
  "t": "Threat modeling methodologies (STRIDE, PASTA) and supply chain risk management",
  "body": [
   "Threat modeling is a structured way to find and prioritize threats to a system, ideally during design when fixes are cheapest. It answers four questions: what are we building, what can go wrong, what are we going to do about it, and did we do a good job. You usually start by decomposing the system into a data flow diagram showing external entities, processes, data stores, data flows and trust boundaries, which are the points where data passes between areas of different trust, such as from the internet into a web tier or from an application into a database.",
   "STRIDE, developed at Microsoft, is a mnemonic for six threat categories, each violating a security property. Spoofing (pretending to be someone or something else) violates authentication. Tampering (unauthorized modification) violates integrity. Repudiation (denying an action) violates non-repudiation. Information disclosure violates confidentiality. Denial of service violates availability. Elevation of privilege violates authorization. You walk each element of the diagram, especially where flows cross trust boundaries, and ask which categories apply. STRIDE is attacker-agnostic and works well for development teams because it maps directly to controls.",
   "PASTA, the Process for Attack Simulation and Threat Analysis, is a seven-stage, risk-centric method. It defines business objectives, defines the technical scope, decomposes the application, analyzes threats, analyzes vulnerabilities and weaknesses, models attacks and finishes with risk and impact analysis that ties threats back to business impact. PASTA takes more effort but produces results business leaders can prioritize. Other approaches you may see include DREAD (a scoring model rating damage, reproducibility, exploitability, affected users and discoverability), attack trees that break a goal into the ways it could be reached, VAST (Visual, Agile and Simple Threat modeling) for scaling across large organizations, and the MITRE ATT&CK knowledge base of real adversary tactics and techniques.",
   "Supply chain risk management (SCRM) extends threat thinking beyond your own walls. Every hardware component, software library, cloud service and outsourced provider brings its own risk. Threats include counterfeit hardware, tampered firmware, compromised software updates, malicious or vulnerable open-source dependencies, and a provider's own breach exposing your data. Fourth-party risk, meaning your suppliers' suppliers, matters too, because you rarely have direct contracts with them.",
   "Good SCRM practices include assessing suppliers before contracting (questionnaires, independent audit reports such as SOC 2, on-site assessments), requiring security clauses and a right to audit, setting minimum security requirements and service-level agreements, maintaining a software bill of materials (SBOM) so you know which components you run, verifying the integrity of updates through code signing, and monitoring suppliers continuously rather than only at onboarding. Hardware approaches include a silicon root of trust and physically unclonable functions (PUFs) that help verify component authenticity. Threat modeling and SCRM share one mindset: identify what you depend on, assume parts of it can fail or be hostile, and design controls that detect and limit the damage.",
   "Consider a worked example. A team is designing a mobile banking feature. Their data flow diagram shows the app, an API gateway, a payments service and a third-party fraud-scoring service. Walking STRIDE across the boundary between the app and the gateway, they note spoofing (stolen session tokens), tampering (altered transfer amounts) and repudiation (customers denying transfers). They add token binding, server-side validation of amounts and signed transaction logs. For the fraud-scoring vendor, SCRM kicks in: they review the vendor's audit report, require breach notification within a set time, limit data sent to the minimum needed and pin the vendor's software development kit to a verified, signed version listed in their SBOM.",
   "Common mistakes: mapping STRIDE letters to the wrong property (elevation of privilege is authorization, not authentication); treating threat modeling as a one-time exercise rather than updating it when the design changes; confusing PASTA's risk-centric, business-aligned approach with STRIDE's categorization; and assessing vendors only at contract signing. Another trap is thinking an SBOM fixes vulnerabilities. It only tells you what you have, so you can act quickly when a component is found to be flawed.",
   "Exam clues: 'six categories' or 'developer-focused' points to STRIDE; 'seven stages', 'risk-centric' or 'business objectives' points to PASTA; 'scoring' points to DREAD; 'list of components' points to SBOM; 'verify updates are genuine' points to code signing. Think like a manager: threat model early in the life cycle, prioritize threats by business impact, and manage suppliers through contracts, assessments and continuous monitoring."
  ],
  "terms": [
   [
    "Threat modeling",
    "A structured process for identifying, prioritizing and addressing threats to a system, ideally during design."
   ],
   [
    "Trust boundary",
    "A point in a system where data or execution passes between components with different levels of trust."
   ],
   [
    "STRIDE",
    "A threat categorization model: spoofing, tampering, repudiation, information disclosure, denial of service and elevation of privilege."
   ],
   [
    "PASTA",
    "The Process for Attack Simulation and Threat Analysis, a seven-stage, risk-centric threat modeling method."
   ],
   [
    "Supply chain risk management (SCRM)",
    "Identifying and reducing risks introduced by suppliers, components, services and their own suppliers."
   ],
   [
    "Software bill of materials (SBOM)",
    "An inventory of the components and dependencies that make up a piece of software."
   ],
   [
    "Fourth-party risk",
    "Risk arising from the suppliers and subcontractors of your own direct suppliers."
   ]
  ],
  "example": "After a widely used logging library was found to contain a critical flaw, a manufacturer with an up-to-date SBOM identified every affected product within hours and shipped signed updates. A competitor without an SBOM spent weeks searching its code base and supplier contracts, while customers asked whether they were exposed. The difference was supply chain visibility, not technical skill.",
  "tip": "Match each STRIDE letter to the property it violates: spoofing-authentication, tampering-integrity, repudiation-non-repudiation, information disclosure-confidentiality, denial of service-availability, elevation of privilege-authorization. PASTA is the risk-centric, business-aligned one.",
  "check": [
   [
    "Which STRIDE category describes an attacker gaining administrator rights from a normal user account?",
    "Elevation of privilege, which violates authorization."
   ],
   [
    "What distinguishes PASTA from STRIDE?",
    "PASTA is a seven-stage, risk-centric process that starts from business objectives and ends with business impact, while STRIDE categorizes threats against system elements."
   ],
   [
    "Why is an SBOM valuable in supply chain risk management?",
    "It lists software components and dependencies, so you can quickly find where a newly disclosed vulnerable component is used."
   ],
   [
    "When is threat modeling most cost-effective?",
    "During design, before code is written, because changes are cheapest then; it should be updated as the design evolves."
   ]
  ]
 },
 {
  "t": "Security awareness, education and training program effectiveness",
  "body": [
   "Technical controls fail when people do not understand their part. A security awareness, education and training program builds that understanding, and the CISSP exam expects you to know the difference between its three levels, the methods that work and how to measure whether the program is changing behavior. It is also one of the most cost-effective controls available, because a well-informed workforce stops many attacks before any technical control is needed.",
   "Awareness is the broadest and lightest level. Its goal is to change attention and behavior by keeping security in people's minds: posters, short videos, newsletters, login banners and simulated phishing campaigns. It applies to everyone, including executives, contractors and temporary staff. Training teaches specific skills people need for their jobs, such as how a developer validates input, how an administrator handles privileged credentials or how the help desk verifies a caller's identity before a password reset. Education is the deepest level, building understanding of why things work so people can handle new situations. It is usually aimed at security professionals and supports career development, such as degree programs or certification study.",
   "Effective programs are tailored to role and risk. A finance team needs content on business email compromise and invoice fraud, developers need secure coding, and executives need to understand targeted attacks aimed at them and their role in incident decisions. Content should be refreshed regularly because threats change, and the program should run continuously rather than as a once-a-year compliance exercise. Methods that engage people, such as gamification, security champions embedded in teams, short microlearning modules, just-in-time prompts and realistic social engineering exercises, tend to work better than long slide decks. Training should be delivered at onboarding, periodically afterward and when roles change.",
   "Common topics include phishing and other social engineering, passphrases and password managers, multifactor authentication, safe handling of sensitive data, physical security such as tailgating and clean desk rules, remote and travel security, and how and where to report incidents. Emerging topics include deepfake audio and video used for impersonation, and the risk of pasting company data into unapproved generative artificial intelligence (AI) tools.",
   "Measuring effectiveness is essential, and the exam wants metrics tied to behavior, not just attendance. Useful measures include phishing simulation click rates and report rates over time, the number and speed of incidents reported by staff, audit findings about policy compliance, knowledge test results before and after training, and trends in incidents caused by human error. Completion rates show coverage, but a 100 percent completion rate alongside rising click rates means the program is not working. Program owners should review content at least annually and after major incidents, collect feedback and adjust. A healthy sign is a culture where reporting a mistake is encouraged rather than punished, because quick reporting shrinks damage.",
   "Consider a worked example. A logistics company runs an annual one-hour video and reports 98 percent completion, yet two staff wire money to fraudsters in the same year. The new program adds monthly phishing simulations with instant feedback, a one-click report button, a short targeted module for accounts payable on verifying payment changes by calling a known number, and a champion in each department. Over the next year the click rate falls, the report rate rises and the median time from a real phishing email arriving to the first staff report drops from hours to minutes. Those behavior metrics, not attendance, show leadership the program is worth funding.",
   "Common mistakes: confusing awareness with training; measuring success only by completion; publicly shaming people who click simulations, which discourages reporting; using the same generic content for every role; and treating the program as the security team's job alone rather than something leadership visibly supports. Another trap is running simulations so tricky that staff lose trust in the program. Finally, do not forget third parties: contractors and vendors with access to your systems should meet the same awareness requirements, usually enforced through their contracts.",
   "Exam clues: 'everyone', 'posters' or 'reminders' point to awareness; 'job-specific skills' or 'hands-on' point to training; 'why', 'theory' or 'career' point to education. 'Best measure of effectiveness' usually points to a behavior metric, such as the phishing report rate or reduction in human-caused incidents. Think like a manager: tailor content to risk, secure executive sponsorship, measure outcomes and improve the program continuously."
  ],
  "terms": [
   [
    "Security awareness",
    "Activities that keep security top of mind and influence everyday behavior across the whole workforce."
   ],
   [
    "Security training",
    "Instruction that teaches specific skills people need to perform their jobs securely."
   ],
   [
    "Security education",
    "In-depth learning that builds understanding of principles so people can handle new situations."
   ],
   [
    "Phishing simulation",
    "A controlled, fake phishing campaign used to teach and measure how staff respond to suspicious messages."
   ],
   [
    "Security champion",
    "A staff member within a team who promotes good security practice and acts as a link to the security function."
   ],
   [
    "Report rate",
    "The proportion of staff who report a suspicious message, a key behavior metric for awareness programs."
   ]
  ],
  "example": "A university notices that most compromised accounts start with credential phishing. It adds a report button to email, sends short monthly lessons tailored to students, faculty and finance staff, and publishes anonymized results each quarter. Within a year, reports of real phishing reach the security team sooner and account takeovers fall, which leadership uses to justify expanding the program.",
  "tip": "Awareness changes behavior for everyone, training teaches job skills, education builds deep understanding. For effectiveness, prefer behavior-based metrics such as report rates and fewer human-error incidents over attendance numbers.",
  "check": [
   [
    "A help desk team learns a specific procedure for verifying callers before resetting passwords. Is this awareness, training or education?",
    "Training, because it teaches a specific job skill to a particular group."
   ],
   [
    "Why is course completion rate a weak measure of program effectiveness?",
    "It shows who attended, not whether behavior changed; click rates, report rates and incident trends measure real outcomes."
   ],
   [
    "What is a risk of punishing employees who fail phishing simulations?",
    "It discourages reporting of real mistakes, which slows incident response and increases damage."
   ],
   [
    "How often should a security awareness program be updated?",
    "Continuously, with a formal review at least annually and after major incidents or new threats."
   ]
  ]
 },
 {
  "t": "Identifying and classifying information and assets",
  "body": [
   "You cannot protect what you do not know you have, and you cannot afford to protect everything equally. Asset identification and classification solve both problems. Identification builds an inventory of information and of the assets that store, process or transmit it. Classification assigns each a level of sensitivity or criticality so that protection is proportional to value. Together they form the foundation of Domain 2, Asset Security, and feed into risk management, access control and incident response.",
   "Assets include data, hardware, software, cloud services, facilities, intellectual property and even the knowledge held by key people. Information assets are often the most valuable and the hardest to track, because data is copied into email, spreadsheets, backups, test environments and third-party services. Discovery tools, data flow mapping, data loss prevention scans and interviews with business owners help find where sensitive data actually lives, which is often somewhere nobody expected.",
   "Classification is decided by the data owner, not by IT. The owner considers the value of the information, the impact if it were disclosed, altered or lost, legal and regulatory requirements, and its age or useful life. Government and military schemes commonly use levels such as Top Secret, Secret, Confidential and Unclassified, with potential harm to national security increasing at each higher level. Commercial schemes are chosen by the organization and often look like Confidential or Proprietary, Private, Sensitive and Public. The exact labels matter less than having a small, clear set that people can apply consistently; too many levels confuse users and lead to mistakes.",
   "Classification drives everything else: who can access data, whether it must be encrypted, how it is labeled, where it may be stored, how long it is kept and how it is destroyed. Assets that hold classified information generally inherit the highest classification of the data on them. A server hosting one confidential database must be protected as confidential even if everything else on it is public. Data categorization is a related idea: a system can be categorized by the potential impact (low, moderate or high) of losing confidentiality, integrity or availability, as in United States federal practice. Privacy categories such as personally identifiable information (PII), protected health information (PHI) and payment card data also carry their own handling rules.",
   "Classification is not a one-time project. Data can be declassified or downgraded as it ages, such as quarterly financial results that become public after release, and reclassification should follow a formal process with owner approval. Periodic reviews keep the inventory and labels accurate, and classification decisions should be documented so they can be audited. Automated classification tools can suggest labels based on content, but a human owner remains accountable for the decision.",
   "Consider a worked example. A manufacturer starts a classification program. Discovery scans find product designs on engineering shares, customer PII in the customer relationship management system and in dozens of exported spreadsheets, and salary data in an HR folder shared too widely. The owners, the heads of engineering, sales and HR, classify designs as Confidential, customer PII as Private and salaries as Confidential. The spreadsheet copies are consolidated or deleted, the HR folder's access is restricted, and the file server holding designs is now protected at the Confidential level even though it also stores public brochures.",
   "Common mistakes: letting IT or the security team decide classification; over-classifying everything, which wastes money and teaches people to ignore labels; forgetting copies in backups and cloud services; and protecting a system at the level of its average data rather than its most sensitive data. Another trap is confusing classification (sensitivity level) with categorization by impact, although both guide the choice of controls. Remember, too, that classification is about the information, not the container: when data moves to a new system, its classification moves with it, and the receiving system must meet the same handling requirements. Ownership should be assigned before data is shared, so someone is always accountable for these decisions.",
   "Exam clues: 'who decides the classification' points to the data owner; 'first step in protecting data' often points to identifying and inventorying it; 'system holds mixed data' points to protecting at the highest level present. 'Too many levels' or 'users confused' points to simplifying the scheme. Think like a manager: classification is a business decision based on value and impact, and it should make protection proportional and cost-effective."
  ],
  "terms": [
   [
    "Asset inventory",
    "A maintained record of the information and assets an organization holds, with owners and locations."
   ],
   [
    "Classification",
    "Assigning information a sensitivity or criticality level that determines its required protections."
   ],
   [
    "Data owner",
    "The senior business person accountable for a data set, including deciding its classification."
   ],
   [
    "Declassification",
    "Formally lowering or removing a classification when information no longer needs its original protection."
   ],
   [
    "Categorization",
    "Rating a system by the potential impact of losing confidentiality, integrity or availability."
   ],
   [
    "Personally identifiable information (PII)",
    "Information that can identify an individual directly or when combined with other data."
   ]
  ],
  "example": "A government contractor stores a Secret design document and several Unclassified manuals on the same laptop. Although most files are unclassified, the laptop must be handled, encrypted, stored and eventually sanitized as a Secret asset. When the design is later moved to an approved secure system and the laptop is sanitized, it can be reissued for unclassified work.",
  "tip": "The data owner classifies data; custodians protect it. Systems and media take on the highest classification of any data they hold. Keep schemes simple enough that people apply them consistently.",
  "check": [
   [
    "Who is responsible for deciding a data set's classification?",
    "The data owner, typically a senior business manager accountable for that information."
   ],
   [
    "A server stores one confidential database and many public files. At what level should it be protected?",
    "At the confidential level, because assets inherit the highest classification of the data they hold."
   ],
   [
    "Why is it harmful to over-classify data?",
    "It raises cost, slows work and trains people to ignore labels, weakening protection for truly sensitive data."
   ],
   [
    "Give an example of a factor an owner considers when classifying information.",
    "The impact of disclosure, alteration or loss, including legal and regulatory requirements, value and the information's age."
   ]
  ]
 },
 {
  "t": "Information and asset handling requirements (marking, labeling, storage)",
  "body": [
   "Classification only helps if people and systems can tell what level a piece of information has and know what to do with it. Handling requirements translate each classification level into concrete rules for marking, labeling, storing, transmitting, sharing and destroying information and the media that carries it. Without them, a classification scheme is just a list of words on a policy page.",
   "Marking and labeling are closely related, and the terms are sometimes used interchangeably. A common distinction is that labeling refers to the classification attached to media or systems, such as a sticker on a backup tape or hard drive, while marking refers to the classification shown within the information itself, such as a header and footer on each page of a document, a watermark or a banner in an application. Electronic labels can also be stored as metadata, which lets systems like data loss prevention (DLP) tools, email gateways and access control mechanisms enforce rules automatically. Mandatory access control (MAC) systems rely on these labels to make every access decision.",
   "Unlabeled media is a real risk. If staff find an unlabeled drive, good practice is to treat it as if it holds data at the highest classification in use until its contents are verified. Otherwise a sensitive backup could be discarded, reused or handed to a recycler without proper sanitization. Labels should be durable, readable and applied at the moment the media is created, not later when someone remembers.",
   "Handling rules cover every stage. For storage, higher classifications may require encryption, locked cabinets or safes, restricted server rooms and approved locations only, for example not on personal devices or unapproved cloud services. For transmission, they may require encrypted channels, tracked courier services with signatures for physical media, two-person handling for the most sensitive items, and restrictions on emailing outside the organization. For use, rules may require clean desk practices, privacy screens and no printing on shared printers.",
   "Backups and copies inherit the classification of the original, so backup media must be protected at the same level, including at off-site storage facilities and in cloud backup services. Storage locations should have environmental controls, access logging and inventory tracking so missing media is noticed quickly. Media transported off-site should be logged out and back in. Handling requirements must be documented in policy and standards, taught in training and checked in audits. They also need to be practical. If rules are too cumbersome, people find workarounds, such as emailing documents to personal accounts to work at home, so providing approved tools that make the secure choice the easy one is part of the job.",
   "Consider a worked example. A law firm classifies client matter files as Confidential. Its handling standard says: documents carry a 'Confidential - Client Privileged' footer (marking), laptops and removable drives with client data carry an asset tag and label (labeling), files are stored only in the document management system with encryption at rest, external sharing uses the firm's secure portal rather than email attachments, and paper files are locked away at night. When a paralegal finds an unlabeled USB drive in a meeting room, she hands it to IT, which treats it as Confidential, identifies its owner and logs the incident.",
   "Common mistakes: protecting backups at a lower level than production data; relying only on visual labels when automated tools could enforce metadata labels; throwing away or reusing unlabeled media without checking it; and writing handling rules so strict that staff bypass them. Another trap is forgetting that handling rules apply to printouts and conversations, not just digital files. Labels on media should also avoid revealing more than necessary; an inventory number that maps to a protected register is often better than writing the project name on a tape that might be lost in transit. Finally, remember that the labels must be reviewed when data is reclassified, or old labels will mislead handlers.",
   "Exam clues: 'sticker on a tape' points to labeling; 'header and footer on a document' points to marking; 'metadata tag used by DLP' points to electronic labeling; 'found an unlabeled disk' points to treating it at the highest classification. 'Backup at off-site facility' points to protecting it at the same level as the original. Think like a manager: handling rules should be clear, proportional to classification, supported by tools and verified through audits."
  ],
  "terms": [
   [
    "Labeling",
    "Attaching a classification indicator to media or systems, such as a physical label on a drive or tape."
   ],
   [
    "Marking",
    "Displaying the classification within the information itself, such as headers, footers or banners."
   ],
   [
    "Metadata label",
    "A classification stored electronically with a file or record so systems can enforce handling rules."
   ],
   [
    "Handling requirements",
    "Rules that specify how information of each classification is stored, transmitted, used and destroyed."
   ],
   [
    "Mandatory access control (MAC)",
    "An access control model where the system enforces access based on labels and clearances, not owner discretion."
   ],
   [
    "Clean desk policy",
    "A rule requiring sensitive materials to be secured and desks cleared when unattended."
   ]
  ],
  "example": "A pharmaceutical company ships clinical trial backup tapes to an off-site vault. Each tape carries a durable label showing its classification and inventory number, travels in a locked case with a bonded courier, and is signed out and back in. When one tape fails to arrive, the tracking log shows it quickly, the courier locates it, and because the tapes are encrypted, the brief loss of custody does not become a data breach.",
  "tip": "Backups and copies carry the same classification as the original data. Unlabeled media should be handled at the highest classification until its contents are verified. Labeling is on the media; marking is in the content.",
  "check": [
   [
    "What should staff do with a found, unlabeled backup drive?",
    "Treat it as containing the highest classification in use until its contents are verified, and report it."
   ],
   [
    "What is the difference between marking and labeling?",
    "Labeling applies the classification to media or systems, while marking shows it within the information itself, such as document headers."
   ],
   [
    "Why should backup media be protected at the same level as production data?",
    "It contains the same information, so a lost or stolen backup exposes the data just as a production breach would."
   ],
   [
    "How can electronic labels improve protection?",
    "Stored as metadata, they let DLP, email gateways and access control systems enforce handling rules automatically."
   ]
  ]
 },
 {
  "t": "Provisioning resources securely and asset inventory",
  "body": [
   "Every new laptop, server, cloud account, container image or software license is a new asset to protect. Secure provisioning means bringing those resources into the environment in a known, approved and trackable state. Asset inventory means knowing at all times what you have, who owns it, where it is and what state it is in. Together they prevent the unknown, unmanaged systems that attackers love to find.",
   "An asset inventory should record each hardware and software asset with a unique identifier, owner, location, classification of the data it handles, configuration and life cycle status. Hardware inventories include endpoints, servers, network gear, mobile devices and removable media. Software inventories include installed applications, versions and licenses. Cloud resources such as virtual machines, storage buckets and serverless functions must be included too, and because they can be created in seconds, automated discovery through cloud provider application programming interfaces (APIs) is essential. A configuration management database (CMDB) often holds this information and links assets to their owners and dependencies.",
   "Inventory supports nearly every other security activity. Vulnerability management needs to know which systems run an affected product. Incident response needs to know who owns a compromised host and what data it holds. License compliance avoids legal risk. Unknown assets, often called shadow IT, are dangerous because nobody patches, monitors or backs them up. That is why asset inventory appears first in many control frameworks, including the CIS Critical Security Controls.",
   "Secure provisioning starts with procurement. Buy from trusted suppliers and authorized channels, verify that hardware has not been tampered with, and check that software comes from legitimate sources with verified signatures. Security requirements should be part of the purchasing decision rather than added afterward. Before deployment, apply an approved baseline image, remove or change default accounts and passwords, disable unneeded services, install current patches and enroll the device in management and monitoring tools such as endpoint detection and response (EDR) and mobile device management (MDM).",
   "Provisioning also applies to access and cloud resources. Accounts, licenses and cloud services should be requested, approved by the owner, created with least privilege and recorded. Infrastructure as code (IaC) templates make cloud builds repeatable and reviewable, so every environment starts from a secure, version-controlled definition that can be scanned before deployment. Asset management continues through the life cycle: changes go through change management so the inventory stays accurate, periodic reconciliation compares the inventory against network scans, cloud consoles and purchase records, and retired assets are sanitized, removed from the inventory and documented.",
   "Consider a worked example. A marketing team spins up a cloud virtual machine with a credit card to run a campaign tool. It never enters the CMDB, receives no patches and has an administrative port open to the internet. Months later a scan by the security team's cloud posture tool finds it. The organization responds by requiring all cloud accounts to sit under a central organization with guardrail policies, provisioning new resources only through reviewed IaC templates that apply tags for owner and data classification, and running automated discovery daily so untagged resources are flagged within hours.",
   "Common mistakes: treating inventory as a spreadsheet updated once a year; forgetting cloud, software and virtual assets; deploying devices with default credentials; skipping integrity checks on hardware and software from suppliers; and failing to remove assets from inventory and monitoring when they are retired, which hides gaps. Another trap is thinking provisioning ends at deployment. Configuration drift must be detected and corrected. Similarly, hardware purchased through unofficial channels or gray-market resellers may be counterfeit or tampered with, so procurement policy should name approved suppliers.",
   "Exam clues: 'first step before vulnerability management' or 'cannot patch what you do not know' points to asset inventory; 'unauthorized cloud service' points to shadow IT; 'repeatable, secure builds' points to baselines or infrastructure as code; 'default passwords' points to secure provisioning. Think like a manager: inventory is foundational, ownership must be assigned for every asset, and provisioning should be standardized so security is built in from the first day. When a question asks what enables fast response to a newly announced vulnerability, an accurate, automatically updated inventory is usually the answer, because it tells you exactly which systems are exposed and who must act."
  ],
  "terms": [
   [
    "Asset inventory",
    "A current record of hardware, software, cloud and data assets, including owners, locations and status."
   ],
   [
    "Configuration management database (CMDB)",
    "A repository of assets and their configurations, relationships and owners."
   ],
   [
    "Shadow IT",
    "Technology used or deployed without the knowledge or approval of the IT or security function."
   ],
   [
    "Secure provisioning",
    "Deploying resources in an approved, hardened and recorded state from the start."
   ],
   [
    "Infrastructure as code (IaC)",
    "Defining infrastructure in version-controlled templates so builds are repeatable and reviewable."
   ],
   [
    "Configuration drift",
    "Gradual divergence of a system's actual configuration from its approved baseline."
   ]
  ],
  "example": "When a critical flaw is announced in a popular virtual private network appliance, a company with an accurate inventory lists every affected device, its owner and firmware version within minutes and patches them that evening. A sister company without an inventory discovers a forgotten appliance only after an intrusion, which shows why inventory comes before almost every other control.",
  "tip": "Asset inventory is foundational: the exam often expects it as the first step before vulnerability management, classification or risk assessment can succeed. Every asset needs a named owner.",
  "check": [
   [
    "Why is asset inventory considered a foundational control?",
    "You cannot classify, patch, monitor or respond to incidents on assets you do not know exist."
   ],
   [
    "Name three steps in securely provisioning a new server.",
    "Apply an approved baseline image, change or remove default credentials and disable unneeded services; also patch it and enroll it in monitoring."
   ],
   [
    "How does infrastructure as code support secure provisioning?",
    "It makes builds repeatable, version-controlled and reviewable, so every environment starts from an approved secure definition."
   ],
   [
    "What should happen to an asset's inventory record when it is retired?",
    "It should be updated after the asset is sanitized and disposed of, with the disposal documented, and the asset removed from monitoring and licensing."
   ]
  ]
 },
 {
  "t": "Data lifecycle: create, store, use, share, archive, destroy",
  "body": [
   "Data has a life. It is created, lives in storage, gets used and shared, may be archived for years and eventually should be destroyed. Different risks and controls apply at each stage, and a CISSP should be able to say which controls fit where. A widely used model, popularized by the Cloud Security Alliance, has six phases: create, store, use, share, archive and destroy. Thinking in phases helps you spot gaps, such as data that is carefully encrypted in storage but freely emailed when shared, or data that is never destroyed at all.",
   "Create covers generating new data or acquiring it from outside, such as collecting customer details through a web form, importing a partner feed or producing a report. This is the best moment to classify the data and assign an owner, because classifying later is harder and often skipped. Collection should also be limited to what is needed, the privacy principle called data minimization. Store means committing the data to a repository such as a database, file share or cloud bucket, usually immediately after creation. Controls include encryption at rest, access control lists, backups and secure configuration of the storage service, all driven by the classification assigned at creation.",
   "Use is when data is viewed, processed or changed. This is where data is often most exposed, because it must usually be decrypted to be worked with. Controls include least privilege, monitoring and logging of access, data loss prevention (DLP) on endpoints, and masking so users see only what they need. Emerging protections for data in use include confidential computing, where processing happens inside hardware-protected enclaves. Share means making data available to others, inside or outside the organization, through email, collaboration tools, application programming interfaces (APIs) or partner connections. Controls include encryption in transit, digital rights management (DRM), data sharing agreements, DLP and checks that recipients are authorized. Transborder transfers bring legal requirements too.",
   "Archive moves data that is no longer actively used into long-term storage, usually to meet legal, regulatory or business retention requirements. Archives must stay protected at the original classification and must remain readable: you need the hardware, software, file formats and keys to retrieve the data years later. Losing an encryption key effectively destroys the archive, which is why key escrow and backup are part of archive planning. Destroy means permanently removing data when it is no longer needed and its retention period has ended, unless a legal hold applies. Methods depend on media type and sensitivity, from cryptographic erasure and overwriting to degaussing magnetic media and physical shredding.",
   "The phases are not always linear. Data can move back and forth between use and share many times, archived data can be restored for use, and copies can split off into new life cycles of their own. Each copy, including backups, test data and data held by third parties, needs its own owner and end point. Destruction should be documented, and it must reach every copy, or the data will outlive its intended lifespan and remain a liability.",
   "Consider a worked example. An insurer collects claim forms online (create), classifies them as Confidential with PII, and stores them encrypted in a claims database (store). Adjusters view them through an application that masks bank details unless a supervisor approves (use). Claims are shared with a repair network through a secure portal under a data sharing agreement (share). Closed claims move to lower-cost encrypted archive storage for the required retention period, with keys held in a managed key service (archive). When the period ends, a scheduled job deletes the records and the archive keys, and the portal partner confirms deletion of its copies in writing (destroy).",
   "Common mistakes: classifying data late or never; forgetting copies in backups, test environments and partner systems when destroying data; archiving data without keeping the keys or software needed to read it; assuming encryption at rest protects data in use; and destroying data that is subject to a legal hold. Another error is treating the life cycle as purely technical, when owners must make the retention and sharing decisions.",
   "Exam clues: 'when should data be classified' points to the create phase; 'most exposed' or 'decrypted for processing' points to use; 'readable for years' points to archive planning; 'no longer needed' points to destroy, after checking retention and legal holds. Think like a manager: every phase needs an owner, a policy and controls proportional to classification, and the cheapest data to protect is data you never kept longer than necessary."
  ],
  "terms": [
   [
    "Data life cycle",
    "The phases data passes through: create, store, use, share, archive and destroy."
   ],
   [
    "Data minimization",
    "Collecting and keeping only the data needed for a specific, legitimate purpose."
   ],
   [
    "Archive",
    "Long-term storage of data no longer in active use, kept to meet retention requirements."
   ],
   [
    "Masking",
    "Hiding part of a sensitive value, such as showing only the last four digits, so users see only what they need."
   ],
   [
    "Legal hold",
    "A requirement to preserve relevant data for litigation or investigation, overriding normal destruction."
   ],
   [
    "Cryptographic erasure",
    "Destroying data by securely deleting the encryption keys that protect it, leaving only unreadable ciphertext."
   ]
  ],
  "example": "A startup deletes customer accounts from its production database when users close them, but forgets that nightly backups are kept for three years and that the analytics team exported full tables to a separate warehouse. A regulator's audit finds data belonging to closed accounts in both places. The company redesigns its life cycle so deletion requests propagate to analytics, backups expire on a defined schedule and archives are encrypted with keys that are destroyed on time.",
  "tip": "Classification should happen at the create phase. Data in use is typically the hardest state to protect because it is decrypted for processing. Destruction must reach every copy, and legal holds override it.",
  "check": [
   [
    "At which life cycle phase should data ideally be classified, and why?",
    "At creation, because classification then drives every later control and is easy to skip if left until later."
   ],
   [
    "What must an organization keep available to read encrypted archives years later?",
    "The encryption keys, plus the software, formats and hardware needed to retrieve and interpret the data."
   ],
   [
    "Why is the use phase often the riskiest?",
    "Data is usually decrypted and accessible to people and applications while being processed, increasing exposure."
   ],
   [
    "What should stop scheduled destruction of data?",
    "A legal hold, which requires preserving relevant data for litigation or investigation."
   ]
  ]
 },
 {
  "t": "Data roles: owner, controller, processor, custodian, steward, subject",
  "body": [
   "Knowing who is responsible for what is central to asset security, and the exam frequently describes a person's duties and asks which role they hold. The roles come from two overlapping vocabularies. Organizational security uses owner, custodian, steward and user. Privacy law, especially the European Union's General Data Protection Regulation (GDPR), uses controller, processor and subject. One organization, or even one person, can hold roles from both vocabularies at once.",
   "The data owner, sometimes called the information owner, is a senior business person accountable for a data set. The owner classifies the data, decides who may access it, approves protection requirements and retention periods, and is ultimately accountable if it is mishandled. Owners are usually business managers, such as the head of human resources for employee records or the sales director for customer data, not IT staff. The data custodian implements and operates the protections the owner decides on. Custodians are typically IT or operations staff: they run backups, apply patches, configure access controls and maintain storage. They handle the data day to day but do not decide its classification or who should have access.",
   "The data steward focuses on the quality, meaning and proper business use of data. Stewards maintain data definitions and metadata, ensure accuracy and consistency, and help people use data correctly, often within a data governance program. Where the owner is accountable, the steward is the hands-on guardian of data quality. The data user accesses data to do their job and must follow policy. The system owner is responsible for a system that processes data, including its security plan and authorization, which is a different thing from owning the data inside it.",
   "Privacy law adds three roles. The data subject is the individual the personal data is about, such as a customer, patient or employee, and holds rights such as access, correction and, in some cases, erasure. The data controller is the organization or person that determines the purposes and means of processing personal data: it decides why and how the data is used and carries primary legal responsibility. The data processor processes personal data on behalf of the controller, following the controller's documented instructions; cloud providers, payroll services and email marketing platforms are common examples. Under GDPR, processors have direct obligations too, and a written contract, often called a data processing agreement, must govern the relationship. A processor that starts using data for its own purposes becomes a controller for that processing and takes on the controller's responsibilities.",
   "Some organizations must also appoint a data protection officer (DPO), who independently advises on and monitors privacy compliance and acts as the contact point for regulators and data subjects. The DPO should not also be the person deciding how data is processed, because that would be a conflict of interest. Clear, documented roles avoid gaps where everyone assumes someone else is protecting the data.",
   "Consider a worked example. A clinic uses a cloud-based scheduling service. The clinic decides to collect patient names, phone numbers and appointment reasons to manage bookings, so it is the controller. The cloud service stores and processes that data under contract and only on the clinic's instructions, so it is the processor. Patients are the data subjects. Inside the clinic, the practice manager is the data owner who approves who can see appointment reasons, the IT contractor who configures accounts and backups is the custodian, and the receptionist who books appointments is a user. If the scheduling company began selling appointment data to advertisers, it would become a controller for that use and would need its own lawful basis.",
   "Common mistakes: calling IT staff the data owner; confusing the controller (decides purpose and means) with the processor (acts on instructions); assuming a processor has no legal obligations; mixing up steward (quality and meaning) with custodian (technical protection); and thinking the system owner automatically owns all data on the system. Another trap is assuming accountability moves to a cloud provider because it holds the data. The controller remains accountable.",
   "Exam clues: 'determines purposes and means' points to controller; 'on behalf of' or 'follows instructions' points to processor; 'the individual the data describes' points to subject; 'classifies and approves access' points to owner; 'performs backups and patches' points to custodian; 'data quality and definitions' points to steward. Think like a manager: assign every data set an accountable owner, put processor relationships under contract and verify that custodians do what owners decide."
  ],
  "terms": [
   [
    "Data owner",
    "The senior business person accountable for a data set, who classifies it and approves access."
   ],
   [
    "Data custodian",
    "The person or team, often IT, that implements and operates the protections the owner specifies."
   ],
   [
    "Data steward",
    "The role responsible for data quality, definitions, metadata and proper business use."
   ],
   [
    "Data controller",
    "The entity that determines the purposes and means of processing personal data."
   ],
   [
    "Data processor",
    "An entity that processes personal data on behalf of, and on the instructions of, a controller."
   ],
   [
    "Data subject",
    "The identifiable individual to whom personal data relates."
   ],
   [
    "Data protection officer (DPO)",
    "An independent role that advises on and monitors compliance with data protection law."
   ]
  ],
  "example": "A retailer hires an email marketing platform to send newsletters. The retailer decides whom to email and why, making it the controller; the platform sends messages only as instructed, making it the processor. When a customer asks for a copy of her data, the request goes to the retailer, which must answer it and can require the platform's help under their data processing agreement.",
  "tip": "Controller decides why and how; processor acts on the controller's behalf. Owner is accountable and classifies; custodian implements; steward manages quality. If a role 'determines purposes', it is a controller.",
  "check": [
   [
    "A payroll company processes employee salary data strictly on a client's instructions. What privacy role does it hold?",
    "Data processor, because it processes personal data on behalf of the controller."
   ],
   [
    "Who decides the classification of a data set, the owner or the custodian?",
    "The owner; the custodian implements the protections the owner requires."
   ],
   [
    "What happens if a processor uses personal data for its own purposes?",
    "It becomes a controller for that processing and takes on the controller's legal obligations."
   ],
   [
    "Which role focuses on data quality and consistent definitions?",
    "The data steward."
   ]
  ]
 },
 {
  "t": "Data collection limitation, location and maintenance",
  "body": [
   "Every piece of data you hold is a liability as well as an asset. It must be protected, it can be breached, and it may be subject to legal requests and privacy rights. That is why modern privacy principles and the CISSP outline stress limiting what you collect, knowing where data lives and maintaining it properly while you hold it. These three ideas reduce risk more cheaply than almost any technical control.",
   "Collection limitation means collecting only the personal data needed for a specific, legitimate purpose, by lawful and fair means, and, where appropriate, with the knowledge or consent of the person. The idea goes back to the Organisation for Economic Co-operation and Development (OECD) privacy guidelines and appears in the European Union's General Data Protection Regulation (GDPR) as data minimization and purpose limitation: data collected for one purpose should not be quietly reused for an unrelated one. Practical steps include reviewing forms and application programming interfaces (APIs) to remove fields you do not need, avoiding sensitive categories unless required, and telling people clearly what you collect and why in a privacy notice.",
   "Data location matters for legal, security and operational reasons. Data sovereignty and localization laws may require certain data to stay in a given country or region. Transborder transfer rules may restrict where personal data can go. Location also affects which governments can compel access to data and which breach notification rules apply. In the cloud, you choose regions for storage and processing, and contracts should specify where data and backups may reside and where support staff who can access it are located. Knowing data location also supports incident response and electronic discovery (eDiscovery), because you cannot preserve or produce data you cannot find.",
   "Data maintenance covers keeping data accurate, current and protected while it is retained. Privacy principles call for data quality: personal data should be accurate and up to date, and people should be able to request corrections. Maintenance also includes patching and securely configuring the systems that hold the data, reviewing access rights, verifying backups and checking that the data still has a valid purpose. Data that is no longer needed should move toward archive or destruction according to the retention schedule, rather than sitting indefinitely in forgotten tables.",
   "These ideas reinforce each other. Collect less and you have less to locate, maintain and protect. Know where your data is and you can enforce location and access rules. Maintain it well and it stays useful and trustworthy while you have it. They also shrink the impact of a breach: an attacker cannot steal a field you never collected. Pseudonymization and anonymization can help when data is needed for analysis but identities are not, though truly anonymized data is harder to achieve than many assume.",
   "Consider a worked example. A fitness app asks new users for full name, date of birth, home address, phone number, precise location history and a photo of a government ID. A privacy review asks what each field is for. Account creation needs only an email address and a display name, age verification needs a yes-or-no confirmation, and route tracking needs location only during workouts. The team removes the ID photo and home address, keeps location only while a workout is active, stores European users' data in a European region as its contracts promise, and adds a quarterly job that flags inactive accounts for deletion. The attack surface and compliance burden both shrink.",
   "Common mistakes: collecting data 'just in case' it becomes useful; reusing data for a new purpose without checking the original notice or legal basis; not knowing which cloud regions hold backups and replicas; letting inaccurate data persist; and assuming that because storage is cheap, keeping everything is harmless. Another trap is believing that removing names makes data anonymous when other fields can still identify people.",
   "Exam clues: 'reduce privacy risk' often points to collecting less or deleting unneeded data; 'data must stay in-country' points to localization or sovereignty; 'using data for a new purpose' points to purpose limitation; 'customer asks to correct records' points to data quality and maintenance. Think like a manager: the least risky and cheapest data to protect is data you never collected, and every data set should have a documented purpose, location and owner."
  ],
  "terms": [
   [
    "Collection limitation",
    "The principle of collecting only the personal data needed for a specific, legitimate purpose by fair and lawful means."
   ],
   [
    "Purpose limitation",
    "Using personal data only for the purposes for which it was collected, unless a new lawful basis exists."
   ],
   [
    "Data sovereignty",
    "The concept that data is subject to the laws of the country where it is located."
   ],
   [
    "Data localization",
    "Legal requirements that certain data be stored or processed within a specific country or region."
   ],
   [
    "Data quality",
    "The principle that personal data should be accurate, complete and kept up to date."
   ],
   [
    "Pseudonymization",
    "Replacing direct identifiers with substitutes so data cannot be attributed to a person without additional, separately held information."
   ]
  ],
  "example": "A bank's cloud contract states that customer records and their backups stay in two named domestic regions. During an audit, the security team finds a disaster recovery replica configured in a foreign region by default. Because the bank knew its location obligations and monitored for them, it moved the replica, documented the fix and avoided a regulatory breach of its localization requirements.",
  "tip": "The least risky data is data you never collected. When a scenario asks how to reduce privacy risk, limiting collection or deleting unneeded data often beats adding more controls.",
  "check": [
   [
    "Which principle is violated when a company uses email addresses collected for receipts to build advertising profiles without a new basis?",
    "Purpose limitation, part of collection limitation and data minimization."
   ],
   [
    "Why does data location matter for security and compliance?",
    "Local laws, government access powers, transfer rules and breach notification duties depend on where data is stored and processed."
   ],
   [
    "What does data maintenance include from a privacy standpoint?",
    "Keeping data accurate and current, allowing corrections, protecting its systems and removing data that no longer has a valid purpose."
   ],
   [
    "Why is removing names not always enough to anonymize data?",
    "Other fields, such as location, birth date and postal code, can be combined to re-identify individuals."
   ]
  ]
 },
 {
  "t": "Data retention and end-of-life (EOL/EOS) assets",
  "body": [
   "Retention answers a simple question with complicated consequences: how long should we keep this? Keep data too briefly and you may break the law or lose information the business needs. Keep it too long and you increase breach exposure, storage cost and the volume of material that must be searched and produced in litigation. Good retention is a deliberate, documented decision made by data owners with legal advice, not an accident of storage capacity.",
   "A retention policy sets how long each category of data must be kept and what happens at the end. Retention periods come from laws and regulations, contracts, industry standards and business needs. Tax, employment and health records, for example, may each have different required periods depending on jurisdiction. The policy is usually expressed as a retention schedule listing record types, retention periods, owners and the disposition method. When the period ends, data should be securely destroyed or, in some cases, anonymized so it no longer relates to identifiable people.",
   "Legal holds override the retention schedule. When litigation or an investigation is reasonably anticipated, relevant data must be preserved even if it would normally be deleted. Destroying data under hold, called spoliation, can lead to serious legal penalties and adverse inferences in court. Retention processes must therefore be able to suspend deletion for specific data and resume it when counsel lifts the hold. Retention also covers where data is kept. Backups, archives, email systems, collaboration platforms and third-party services all hold copies, and a policy that deletes records from the main database but not from backups is incomplete. Retained data must remain readable for its whole retention period, which means keeping formats, software and encryption keys available.",
   "End-of-life (EOL) and end-of-support (EOS) apply to hardware and software. Vendors use these terms somewhat differently, but in general EOL means a product is no longer sold, manufactured or developed, and EOS means the vendor no longer provides updates, security patches or technical support. After EOS, newly discovered vulnerabilities stay unpatched, so the asset becomes an increasing risk over time. End-of-sale is a separate, earlier milestone that some vendors announce. You must read each vendor's own definitions and dates rather than assuming.",
   "A good asset management program tracks vendor life cycle announcements, budgets for replacement well before EOS and plans migrations. If an unsupported system cannot yet be replaced, perhaps because it runs a specialized machine or a legacy application, compensating controls should reduce the risk: isolate it on a segmented network, restrict and monitor access, remove unneeded services, and document the risk acceptance with an owner and a review date. Some vendors sell extended support for a fee, which can buy time. When the asset is finally retired, its storage must be sanitized appropriately, and it must be removed from inventory, licensing and monitoring records.",
   "Consider a worked example. A manufacturer's quality lab runs a measurement instrument controlled by a workstation whose operating system reached EOS two years ago. The instrument vendor will not certify a newer system until next year's model. The security team moves the workstation to an isolated network segment with no internet access, allows only file transfers to one server through a monitored channel, disables removable media, and records a risk acceptance signed by the lab director with a review in six months. Meanwhile, the lab's measurement records follow a retention schedule of seven years set by regulation and contract, and a pending customer dispute places a legal hold on one product line's records.",
   "Common mistakes: deleting data that is under legal hold; keeping everything forever because storage is cheap; forgetting backups and third-party copies when applying retention; running EOS systems on flat networks with full internet access; and leaving retired devices in inventory or disposing of them without sanitization. Another trap is assuming EOL and EOS always mean the same thing. They can differ by vendor.",
   "Exam clues: 'litigation expected' points to legal hold; 'how long to keep records' points to the retention schedule and legal requirements; 'no more security patches' points to EOS; 'cannot be replaced yet' points to isolation, compensating controls and documented risk acceptance. Think like a manager: retention and replacement decisions balance legal duty, cost and risk, and they belong to the business owner with advice from legal and security."
  ],
  "terms": [
   [
    "Retention policy",
    "A policy defining how long each category of data is kept and how it is disposed of."
   ],
   [
    "Retention schedule",
    "A list of record types with their retention periods, owners and disposition methods."
   ],
   [
    "Legal hold",
    "An instruction to preserve relevant information for litigation or investigation, suspending normal deletion."
   ],
   [
    "Spoliation",
    "The destruction or alteration of evidence that should have been preserved, which can bring legal penalties."
   ],
   [
    "End-of-life (EOL)",
    "The point at which a vendor stops selling or developing a product."
   ],
   [
    "End-of-support (EOS)",
    "The point after which a vendor no longer provides patches, updates or technical support."
   ],
   [
    "Compensating control",
    "An alternative control that reduces risk when the primary control is not feasible."
   ]
  ],
  "example": "A city government learns that its building access control software reaches end-of-support in nine months. It budgets for replacement, but procurement delays push the go-live date past the deadline. In the gap, the old server is moved to a restricted network segment, remote access is removed, logs are forwarded to the security operations center, and the facilities director signs a time-limited risk acceptance.",
  "tip": "A legal hold always overrides the normal retention schedule. For unsupported (EOS) systems that cannot be replaced yet, the expected answer is isolation plus compensating controls and documented risk acceptance.",
  "check": [
   [
    "What happens to scheduled deletion when a legal hold is issued?",
    "Deletion of the relevant data is suspended until legal counsel lifts the hold."
   ],
   [
    "Why is keeping data longer than necessary a risk?",
    "It increases breach exposure, storage cost and the volume of data subject to discovery in litigation."
   ],
   [
    "What is the main security concern with an end-of-support operating system?",
    "It no longer receives security patches, so newly discovered vulnerabilities remain exploitable."
   ],
   [
    "Name three compensating controls for an EOS system that must stay in service.",
    "Network isolation or segmentation, restricted and monitored access, and removal of unneeded services, with documented risk acceptance."
   ]
  ]
 },
 {
  "t": "Data remanence and sanitization: clearing, purging, destruction",
  "body": [
   "Data remanence is the data that remains on media after an attempt to erase it. Deleting a file usually removes only the pointer to it, leaving the contents on disk until they are overwritten. A quick format often does little more. Anyone with recovery tools could read that residue, which is why sanitization must match both the sensitivity of the data and the type of media. Remanence is a risk whenever media is reused, returned at the end of a lease, sent for repair, sold or thrown away.",
   "The National Institute of Standards and Technology (NIST) Special Publication 800-88, Guidelines for Media Sanitization, is the common reference, and it defines three levels. Clearing applies logical techniques to sanitize data in all user-addressable storage locations, protecting against simple, non-invasive recovery using standard tools. Overwriting a drive with a fixed pattern or using a device's standard factory reset are examples. Cleared media can usually be reused within the organization at a similar classification level.",
   "Purging applies physical or logical techniques that make recovery infeasible even with state-of-the-art laboratory methods. Examples include a drive's built-in sanitize or secure erase commands, cryptographic erase, and degaussing of magnetic media. Purged media may be reused or released outside the organization, depending on policy. Destruction renders the media unusable and the data unrecoverable: shredding, disintegrating, pulverizing, melting or incinerating. Destruction is the right choice for the most sensitive data, for damaged media that cannot be purged reliably, or when the cost of verification exceeds the value of the media.",
   "Media type changes the answer. Degaussing uses a strong magnetic field to erase magnetic media such as hard disk drives and tapes; it usually renders a modern hard drive unusable because it also destroys factory servo information. It does nothing to solid-state drives (SSDs), flash memory or optical discs, because they do not store data magnetically. SSDs are also hard to overwrite reliably because of wear leveling, over-provisioned spare areas and remapped blocks, so simple overwriting may leave data behind. For SSDs, use the manufacturer's sanitize or secure erase commands, cryptographic erase if the drive was encrypted from the start, or physical destruction with shred particles small enough for flash chips.",
   "Cryptographic erase, sometimes called crypto-shredding, works when data was encrypted from the beginning with a strong key: securely destroying every copy of the key leaves only unreadable ciphertext. It is fast and especially useful in the cloud, where you cannot physically touch the media. Cloud customers typically rely on crypto-shredding plus the provider's documented sanitization processes and audit reports rather than physical destruction. Whatever the method, sanitization should be verified and documented, often with a certificate listing the media, serial numbers, method, date and who performed it. The decision flow is: identify the classification, decide whether the media will leave organizational control, then choose clear, purge or destroy accordingly, and verify.",
   "Consider a worked example. A company is replacing 200 laptops with SSDs, returning 50 leased servers with hard drives, and closing a cloud project. The laptops were fully encrypted, so IT runs the drives' sanitize command and discards the keys, then samples ten drives with forensic tools to verify nothing is recoverable before donating them. The leased servers' hard drives held customer data and are leaving company control; the lease allows keeping drives, so they are degaussed and then shredded by a vendor that issues destruction certificates. In the cloud, the team deletes the storage and schedules deletion of the customer-managed keys.",
   "Common mistakes: believing delete or format sanitizes a drive; degaussing SSDs or flash drives; overwriting SSDs and assuming it reached every cell; forgetting media inside printers, copiers, network devices and phones; and failing to verify and document. Another trap is choosing clearing for media leaving the organization when the data is sensitive. Purge or destroy is expected. Finally, remember that sanitization is only as good as the inventory behind it: a drive that nobody knew existed is never sanitized at all.",
   "Exam clues: 'reuse internally' often points to clearing; 'release outside the organization' points to purging; 'most sensitive' or 'damaged media' points to destruction; 'cloud, no physical access' points to cryptographic erase; 'SSD' rules out degaussing. Think like a manager: match the method to data sensitivity, media type and destination, balance cost against risk, and keep evidence that it was done."
  ],
  "terms": [
   [
    "Data remanence",
    "Residual data that remains on media after attempts to erase or remove it."
   ],
   [
    "Clearing",
    "Logical sanitization of user-addressable storage that protects against simple, non-invasive recovery."
   ],
   [
    "Purging",
    "Sanitization that makes recovery infeasible even with advanced laboratory techniques."
   ],
   [
    "Destruction",
    "Physically rendering media unusable and data unrecoverable, such as by shredding or incineration."
   ],
   [
    "Degaussing",
    "Erasing magnetic media with a strong magnetic field; ineffective on SSDs, flash and optical media."
   ],
   [
    "Cryptographic erase",
    "Sanitizing encrypted media by securely destroying every copy of its encryption keys."
   ],
   [
    "Wear leveling",
    "An SSD technique that spreads writes across cells, which can leave old data in areas overwriting cannot reach."
   ]
  ],
  "example": "A hospital sends old multifunction printers back to the leasing company without checking them. A later review finds that each printer contained an internal drive holding thousands of scanned patient documents. The hospital now includes printers, copiers and network devices in its sanitization procedure, requires purge or destruction before any device leaves its control, and keeps a certificate for every drive.",
  "tip": "Degaussing does not work on SSDs or flash. For SSDs, the best answers are manufacturer sanitize or secure erase, cryptographic erase or physical destruction. Deleting and formatting are never adequate sanitization.",
  "check": [
   [
    "What are the three sanitization levels in NIST SP 800-88?",
    "Clear, purge and destroy."
   ],
   [
    "Why is degaussing ineffective for an SSD?",
    "SSDs store data electronically in flash cells rather than magnetically, so a magnetic field does not erase them."
   ],
   [
    "Which sanitization method suits cloud storage you cannot physically access?",
    "Cryptographic erase, destroying the encryption keys so the remaining ciphertext is unreadable."
   ],
   [
    "What should be recorded after sanitizing media?",
    "The media identifiers, method used, date, person who performed it and verification results, often on a certificate."
   ]
  ]
 },
 {
  "t": "Data security controls for data at rest, in transit and in use",
  "body": [
   "Data exists in three states, and each needs different protections. Data at rest is stored: on disks, in databases, on backup tapes or in cloud storage. Data in transit, also called data in motion, is moving across a network, whether inside a data center or across the internet. Data in use is being actively processed in memory by an application or viewed by a user. A strong program covers all three, because attackers go wherever protection is weakest, and the same record passes through every state many times a day.",
   "For data at rest, the main control is encryption. Options include full-disk encryption on laptops, volume or file encryption on servers, database encryption (such as transparent data encryption for whole databases and column-level encryption for especially sensitive fields) and server-side or client-side encryption in cloud storage. Encryption is only as strong as key management: keys should be stored separately from the data, ideally in a hardware security module (HSM) or cloud key management service, with access tightly controlled and logged. Access controls, backups, integrity checking with hashes and physical security of storage media complete the picture.",
   "For data in transit, use encrypted protocols. Transport Layer Security (TLS) protects web traffic, application programming interfaces (APIs) and many other application protocols. Internet Protocol Security (IPsec) protects traffic at the network layer, commonly in site-to-site and remote access virtual private networks (VPNs). Secure Shell (SSH) replaces insecure remote administration and file transfer protocols. Inside data centers and cloud environments, encrypting internal traffic is increasingly expected, since zero trust assumes the internal network is not safe. Certificates must be validated, and weak protocol versions and cipher suites should be disabled.",
   "Data in use is the hardest state to protect because it usually has to be decrypted to be processed. Controls include strong authentication and least-privilege authorization, operating system memory protections, session timeouts, privacy screens, data masking so users see only partial values, and monitoring of user activity. Newer technologies help: trusted execution environments and confidential computing keep data protected in memory except inside a hardware-isolated enclave, and homomorphic encryption allows some computation on encrypted data, though with significant performance costs.",
   "Tokenization and masking cut across states. Tokenization replaces a sensitive value, such as a card number, with a random token that has no mathematical relationship to the original; the real value is kept in a secured token vault. Masking hides part of a value, such as showing only the last four digits. Both reduce how many systems handle real sensitive data, which shrinks the scope of compliance audits. Data loss prevention (DLP) tools work across all three states, discovering sensitive data at rest, inspecting it in transit and controlling actions such as copying or printing on endpoints.",
   "Consider a worked example. An online retailer handles card payments. At rest, the order database uses transparent encryption, and the few fields that must keep card data use column-level encryption with keys in an HSM. In transit, the checkout page and internal service calls use TLS with modern cipher suites, and administrators connect over SSH through a bastion host. In use, customer service agents see only the last four digits, and refunds call a payment service that detokenizes internally. Most systems store only tokens, so they fall outside much of the payment card audit scope, and a database theft would yield tokens and ciphertext rather than usable card numbers.",
   "Common mistakes: assuming full-disk encryption protects data once the system is running and unlocked; storing encryption keys on the same server as the encrypted data; treating tokenization as a form of encryption; forgetting internal traffic when planning encryption in transit; and believing TLS protects data after it arrives at the server. Another error is ignoring backups, which are data at rest in another location.",
   "Exam clues: 'stolen laptop' points to full-disk encryption; 'eavesdropping on the network' points to TLS, IPsec or SSH; 'processed in memory' or 'untrusted cloud host' points to trusted execution environments or confidential computing; 'reduce compliance scope' points to tokenization; 'show only part of the value' points to masking. Think like a manager: choose controls by data classification and state, protect the keys at least as carefully as the data, and reduce the number of places sensitive data lives at all."
  ],
  "terms": [
   [
    "Data at rest",
    "Data stored on media such as disks, databases, backups or cloud storage."
   ],
   [
    "Data in transit",
    "Data moving across a network between systems or locations."
   ],
   [
    "Data in use",
    "Data being actively processed in memory or viewed by a user."
   ],
   [
    "Transport Layer Security (TLS)",
    "A protocol that encrypts and authenticates application traffic such as web and API connections."
   ],
   [
    "Tokenization",
    "Replacing a sensitive value with a random token that maps to the original only through a secure vault."
   ],
   [
    "Confidential computing",
    "Processing data inside hardware-protected enclaves so it stays protected even from the host operating system."
   ],
   [
    "Data loss prevention (DLP)",
    "Tools that discover, monitor and control the movement of sensitive data."
   ]
  ],
  "example": "A consulting firm's employee leaves an unlocked laptop in a taxi. Because the laptop was in sleep mode with the disk unlocked, full-disk encryption offers less protection than the firm assumed. The firm changes its standard so laptops hibernate and require pre-boot authentication after short idle periods, adds remote wipe through device management, and trains staff that encryption at rest protects data only when the device is locked or powered off.",
  "tip": "Match the control to the state: encryption plus key management for rest, TLS, IPsec or SSH for transit, and access control, masking and trusted execution environments for use. Tokenization is not encryption; no key mathematically reverses a token.",
  "check": [
   [
    "Which data state is typically hardest to protect, and why?",
    "Data in use, because it usually must be decrypted in memory to be processed."
   ],
   [
    "How does tokenization reduce compliance scope?",
    "Systems that store only tokens do not hold real sensitive values, so fewer systems fall within audit requirements."
   ],
   [
    "Why should encryption keys be stored separately from encrypted data?",
    "If both are stolen together, the attacker can decrypt the data, making the encryption useless."
   ],
   [
    "Which protocols protect data in transit?",
    "TLS for application traffic, IPsec for network-layer VPNs and SSH for remote administration and file transfer."
   ]
  ]
 },
 {
  "t": "Scoping, tailoring and standards selection; DRM, DLP and CASB",
  "body": [
   "Frameworks and control catalogs, such as NIST Special Publication (SP) 800-53, ISO/IEC 27001 Annex A or the CIS Critical Security Controls, list far more controls than any one system needs. Standards selection, scoping and tailoring are how you turn a generic catalog into the right set of controls for your environment. Done well, they save money, focus effort on real risks and give auditors a clear record of why each control is or is not in place.",
   "Standards selection is choosing which frameworks or baselines to follow. The choice depends on legal and regulatory obligations (a card processor must meet the Payment Card Industry Data Security Standard, PCI DSS; a United States federal system follows NIST requirements), industry expectations, customer contracts and the organization's goals. Often several apply, and teams map them to each other so one control can satisfy multiple requirements, reducing duplicated audits. Scoping is reviewing a baseline and deciding which controls apply to the system at all; wireless controls do not apply to a system with no wireless components. Tailoring is modifying the controls that do apply to fit the organization's mission and environment: setting parameters such as password length or log retention, substituting compensating controls, or supplementing with extra controls for special risks. In short, scoping picks which controls are in, and tailoring adjusts how they are applied. Both decisions should be documented and justified.",
   "Three technologies commonly appear with this topic. Digital rights management (DRM), and its enterprise form, information rights management (IRM), protects content even after it leaves your control. Protection travels with the file: the owner can restrict opening, editing, copying, printing or forwarding, set expiration dates and revoke access later. DRM relies on encryption plus a licensing service that checks permissions each time someone tries to open the content, so it needs the recipient's software to cooperate.",
   "Data loss prevention (DLP) detects and prevents unauthorized movement of sensitive data. It identifies sensitive content through pattern matching (such as card number formats), exact data matching, fingerprinting of known documents, keywords and classification labels. Network DLP inspects traffic leaving the organization, endpoint DLP controls actions on devices such as copying to USB storage or uploading, and storage or discovery DLP scans repositories to find where sensitive data sits. DLP can alert, block, quarantine or encrypt. It struggles with traffic it cannot decrypt, so it is often paired with TLS inspection, and it needs tuning to keep false positives manageable.",
   "A cloud access security broker (CASB) sits between users and cloud services to enforce policy. It gives visibility into which cloud apps are used, including shadow IT, enforces access and data policies, applies DLP to cloud content and detects threats such as unusual mass downloads. CASBs work in inline proxy mode, which can block activity in real time, or through API integration with cloud services, which can scan stored data and act after the fact. Many deployments use both, and CASB features are often bundled into secure access service edge (SASE) or security service edge platforms.",
   "Consider a worked example. A healthcare startup adopts NIST SP 800-53 moderate baseline because a government customer requires it, and maps it to HIPAA obligations. Scoping removes controls for mainframe and wireless technologies it does not use. Tailoring sets session lock to 10 minutes for clinical workstations and adds a supplemental control for medical device logging. To protect research documents shared with partners, it uses IRM so files expire when a partnership ends. Endpoint DLP blocks copying patient exports to USB drives, and a CASB in API mode finds patient files in an unapproved file-sharing service and quarantines them.",
   "Common mistakes: reversing scoping and tailoring; removing controls without documenting why; expecting DLP to protect data after it has left the organization (that is DRM's job); thinking a CASB replaces DLP rather than extending it to cloud services; and assuming DLP can inspect encrypted traffic without additional configuration. Another trap is picking a framework because it is popular rather than because obligations and business needs call for it.",
   "Exam clues: 'remove controls that do not apply' points to scoping; 'adjust a control's parameters' points to tailoring; 'protection that follows the file' or 'revoke access after sending' points to DRM or IRM; 'stop sensitive data leaving' points to DLP; 'visibility into cloud app usage' or 'shadow IT' points to a CASB. Think like a manager: start from obligations and risk, keep a documented rationale for every scoping and tailoring decision, and pick tools that close the specific gap the scenario describes."
  ],
  "terms": [
   [
    "Standards selection",
    "Choosing which frameworks, baselines and standards apply based on obligations, contracts and business goals."
   ],
   [
    "Scoping",
    "Determining which controls in a baseline apply to a given system or environment."
   ],
   [
    "Tailoring",
    "Adjusting applicable controls, parameters and compensating measures to fit the organization's needs."
   ],
   [
    "Digital rights management (DRM)",
    "Technology that enforces usage restrictions on content wherever it goes, using encryption and licensing."
   ],
   [
    "Data loss prevention (DLP)",
    "Tools that identify sensitive data and monitor or block its unauthorized movement."
   ],
   [
    "Cloud access security broker (CASB)",
    "A policy enforcement point between users and cloud services that provides visibility, data protection and threat detection."
   ]
  ],
  "example": "An engineering firm sends design drawings to a subcontractor under IRM protection that blocks printing and expires in 90 days. When the subcontract ends early, the firm revokes access, and the files no longer open even though they sit on the subcontractor's laptops. DLP on the firm's own network could not have done this, because the files had already left its control.",
  "tip": "Scoping removes controls that do not apply; tailoring adjusts the ones that do. DRM protects content after it leaves your environment, DLP stops it leaving inappropriately, and a CASB governs cloud service use.",
  "check": [
   [
    "A baseline includes controls for wireless networking, but the system has no wireless interfaces. What process removes them?",
    "Scoping, which determines which controls apply to the system."
   ],
   [
    "Which technology lets an owner revoke access to a document already emailed outside the company?",
    "Digital rights management or information rights management, because protection travels with the file."
   ],
   [
    "What are the two main CASB deployment modes?",
    "Inline proxy, which can block activity in real time, and API integration, which scans and acts on data stored in cloud services."
   ],
   [
    "Why is DLP often paired with TLS inspection?",
    "DLP cannot inspect content in encrypted traffic unless it is decrypted for inspection."
   ]
  ]
 },
 {
  "t": "Secure design principles: least privilege, defense in depth, secure defaults, fail securely, zero trust, privacy by design, SASE",
  "body": [
   "Secure design principles are the rules of thumb that architects apply before any code is written or product chosen. The CISSP outline lists a set of them, including threat modeling, least privilege, defense in depth, secure defaults, fail securely, segregation of duties, keep it simple, zero trust, trust but verify, privacy by design, shared responsibility and secure access service edge (SASE). The exam expects you to recognize each from a description and to pick the principle that a design follows or violates.",
   "Least privilege gives every user, process and system only the access needed to perform its function, for only as long as needed. It limits damage from mistakes and compromise. Related ideas include need-to-know for information and just-in-time access for administrators. Segregation (or separation) of duties splits critical tasks across people so no one can abuse them alone. Keep it simple, also called economy of mechanism, reduces complexity, since complex systems hide flaws and are harder to verify. Defense in depth, or layered security, uses multiple independent controls so that if one fails, others still protect the asset. The layers should be diverse, mixing administrative, technical and physical controls, so a single weakness does not defeat them all.",
   "Secure defaults means systems ship and deploy in their most secure reasonable configuration: unnecessary services off, default passwords replaced, strict settings on. Users can loosen settings deliberately, but safety should not depend on them remembering to tighten them. Fail securely, sometimes called fail closed, means that when a component fails it does so without leaving the system exposed: an access check that errors out should deny access, not grant it. There is a life-safety exception. Doors on emergency exit paths must fail open (fail safe) so people can escape, because human safety always comes first. Be careful with vocabulary: fail-safe in physical security means safe for people, while fail-secure means the lock stays locked.",
   "Zero trust drops the idea that anything inside the network perimeter is trusted. Every request is authenticated, authorized and encrypted based on identity, device health and context, regardless of network location. Key ideas are 'never trust, always verify', least privilege, micro-segmentation and assuming breach. NIST SP 800-207 describes zero trust architecture with a policy decision point that makes the access decision and a policy enforcement point that carries it out. Trust but verify means you may rely on others, such as a vendor or a component, but confirm with evidence such as audits and monitoring. Shared responsibility means being clear about which party secures which layer, especially in cloud services.",
   "Privacy by design builds privacy into systems from the start rather than adding it later. Its seven foundational principles are: proactive not reactive; privacy as the default setting; privacy embedded into design; full functionality (positive-sum, not zero-sum trade-offs); end-to-end security across the full life cycle; visibility and transparency; and respect for user privacy. Secure access service edge (SASE) combines networking and security into a cloud-delivered service. It typically merges software-defined wide area networking (SD-WAN) with security functions such as a secure web gateway, cloud access security broker (CASB), zero trust network access (ZTNA) and firewall as a service, so users get consistent policy wherever they connect from.",
   "Consider a worked example. A company designs a new expense system. Employees can submit but not approve their own claims (segregation of duties). The application's database account can read and write only expense tables (least privilege). The system is reachable only through the identity provider with device checks, not by being on the office network (zero trust). If the authorization service is unreachable, the application denies approvals rather than allowing them (fail securely). New users start with sharing disabled and minimal data collection (secure and privacy defaults). A web application firewall, input validation, encryption and monitoring provide layered protection (defense in depth).",
   "Common mistakes: confusing fail secure with fail safe; thinking defense in depth means buying several of the same product; treating zero trust as a single product rather than an architecture; equating privacy by design with simply encrypting data; and assuming SASE is only a VPN replacement. Another trap is granting broad access 'temporarily' and never removing it, which defeats least privilege.",
   "Exam clues: 'only what is needed' points to least privilege; 'multiple layers' points to defense in depth; 'shipped locked down' points to secure defaults; 'error grants access' points to a fail-securely violation; 'no implicit trust based on network location' points to zero trust; 'privacy from the start' points to privacy by design; 'cloud-delivered networking and security' points to SASE. Think like a manager: principles guide design before purchases, and human safety overrides every other consideration."
  ],
  "terms": [
   [
    "Least privilege",
    "Granting only the minimum access needed to perform a function, for only as long as needed."
   ],
   [
    "Defense in depth",
    "Using multiple, diverse, independent layers of controls so the failure of one does not expose the asset."
   ],
   [
    "Secure defaults",
    "Shipping and deploying systems in their most secure reasonable configuration."
   ],
   [
    "Fail securely",
    "Designing components so that failures leave the system in a secure state, such as denying access."
   ],
   [
    "Zero trust",
    "An architecture that grants no implicit trust based on network location and verifies every request."
   ],
   [
    "Privacy by design",
    "Embedding privacy into systems from the outset, with privacy as the default setting."
   ],
   [
    "Secure access service edge (SASE)",
    "A cloud-delivered model combining SD-WAN with security services such as ZTNA, CASB and secure web gateway."
   ]
  ],
  "example": "A data center's badge readers are configured so that if the access control server goes down, doors to the server hall stay locked (fail secure), but the emergency exit doors on the fire escape route unlock automatically when the fire alarm triggers (fail safe). Security staff hold keys for manual entry, which keeps the server hall protected without ever trapping people inside.",
  "tip": "Fail secure for data and systems, but fail safe (open) for doors on life-safety paths: human safety wins every time on the CISSP exam. Zero trust means no implicit trust from network location.",
  "check": [
   [
    "An authorization service crashes and the application lets everyone in. Which principle is violated?",
    "Fail securely; the failure should have resulted in denied access."
   ],
   [
    "What is the core idea of zero trust?",
    "No implicit trust based on network location; every request is authenticated, authorized and evaluated in context."
   ],
   [
    "Name three of the seven privacy by design principles.",
    "Proactive not reactive, privacy as the default setting and privacy embedded into design; others include full functionality, end-to-end security, visibility and transparency, and respect for user privacy."
   ],
   [
    "What does SASE combine?",
    "Networking, typically SD-WAN, with cloud-delivered security services such as secure web gateway, CASB, ZTNA and firewall as a service."
   ]
  ]
 },
 {
  "t": "Security models: Bell-LaPadula, Biba, Clark-Wilson, Brewer-Nash",
  "body": [
   "Security models are formal descriptions of how a system should enforce a security policy. They are abstract, but the exam tests them in predictable ways: which property a model protects and what its rules forbid. Before diving in, remember the vocabulary. The subject is the active entity, such as a user or process. The object is the passive resource, such as a file or record. A lattice-based model arranges security levels in order, with each subject and object assigned a level, and this lattice underlies mandatory access control (MAC).",
   "Bell-LaPadula is a confidentiality model developed for military classification. Its simple security property is 'no read up': a subject cannot read an object at a higher classification. Its star (*) property is 'no write down': a subject cannot write information to a lower classification, which prevents leaking secrets downward, for example by copying Secret data into an Unclassified file. The strong star property says a subject can read and write only at its own level. Bell-LaPadula also includes a discretionary security property based on an access matrix. It ignores integrity and availability entirely.",
   "Biba is an integrity model and inverts Bell-LaPadula. Its simple integrity property is 'no read down': a subject should not read lower-integrity data, which could corrupt its decisions. Its star integrity property is 'no write up': a subject cannot write to a higher-integrity object, so untrusted sources cannot contaminate trusted data. The invocation property prevents a subject from invoking, or requesting service from, a subject at higher integrity. A helpful memory aid: Bell-LaPadula keeps secrets from flowing down, while Biba keeps dirty data from flowing up. Biba addresses only the first integrity goal, preventing unauthorized users from making changes.",
   "Clark-Wilson is a commercial integrity model. Users do not touch data directly; they must go through well-formed transactions, called transformation procedures (TPs), which operate on constrained data items (CDIs). Integrity verification procedures (IVPs) check that CDIs are in a valid state. Unconstrained data items (UDIs), such as raw user input, must be validated by a TP before becoming CDIs. The access control triple binds a user to specific TPs on specific CDIs. Clark-Wilson enforces well-formed transactions and separation of duties, and it addresses all three integrity goals: preventing unauthorized users from making changes, preventing authorized users from making improper changes, and maintaining internal and external consistency.",
   "Brewer-Nash, also called the Chinese Wall model, prevents conflicts of interest. Access rights change dynamically based on what a subject has already accessed. A consultant who reads one bank's data is then blocked from reading data of competing banks in the same conflict-of-interest class, but can still access clients in other industries. Other models you may meet include the state machine model (a system is secure if it always moves between secure states), information flow and noninterference models (actions at a high level should not be observable at a lower level, which addresses covert channels), take-grant, and Graham-Denning and Harrison-Ruzzo-Ullman, which define rules for creating and deleting subjects and objects and assigning rights.",
   "Consider a worked example. In a defense system using Bell-LaPadula, a Secret-cleared analyst can read Confidential and Secret reports but not Top Secret ones (no read up), and her tools stop her from saving an excerpt of a Secret report into an Unclassified shared folder (no write down). In a hospital lab system inspired by Biba, a verified lab instrument can write to the patient record, but a patient's self-reported web form cannot write directly into the verified results table (no write up). In an accounting system using Clark-Wilson, clerks can post payments only through an approved posting transaction, and a nightly IVP checks that the ledger balances. In an investment bank, Brewer-Nash stops an analyst advising one airline from then viewing a rival airline's merger files.",
   "Common mistakes: swapping the Bell-LaPadula and Biba rules; thinking Bell-LaPadula addresses integrity; forgetting that 'simple' always refers to reading and 'star' to writing; confusing Brewer-Nash's dynamic, history-based rules with static access lists; and assuming Biba covers all three integrity goals when only Clark-Wilson does.",
   "Exam clues: 'confidentiality', 'military' or 'classification levels' point to Bell-LaPadula; 'integrity' with 'levels' points to Biba; 'well-formed transactions', 'commercial' or 'separation of duties' points to Clark-Wilson; 'conflict of interest' or 'competitors' points to Brewer-Nash; 'covert channel' points to noninterference or information flow. Think like a manager when asked which model fits a business: a bank ledger needs integrity, a government archive needs confidentiality, and a consultancy needs conflict-of-interest controls."
  ],
  "terms": [
   [
    "Bell-LaPadula",
    "A confidentiality model enforcing no read up (simple security) and no write down (star property)."
   ],
   [
    "Biba",
    "An integrity model enforcing no read down (simple integrity) and no write up (star integrity)."
   ],
   [
    "Clark-Wilson",
    "A commercial integrity model using well-formed transactions, access triples and separation of duties."
   ],
   [
    "Brewer-Nash",
    "The Chinese Wall model, which dynamically blocks access that would create a conflict of interest."
   ],
   [
    "Transformation procedure (TP)",
    "In Clark-Wilson, a certified program that is the only way to modify constrained data items."
   ],
   [
    "Noninterference model",
    "A model requiring that high-level actions cannot affect what lower-level subjects observe, limiting covert channels."
   ],
   [
    "Lattice-based access control",
    "Ordering security levels so each subject and object has a place, forming the basis of mandatory access control."
   ]
  ],
  "example": "An audit firm serves two competing pharmaceutical companies. Its document system implements Brewer-Nash: once an auditor opens files for the first client, the system silently blocks her access to the second client's workspace for the duration of the engagement, while still letting her work on clients in banking and retail. This protects both clients and the firm's reputation for independence.",
  "tip": "Confidentiality: Bell-LaPadula (no read up, no write down). Integrity: Biba (no read down, no write up) and Clark-Wilson (transactions, separation of duties). Conflict of interest: Brewer-Nash. 'Simple' means read; 'star' means write.",
  "check": [
   [
    "Which Bell-LaPadula rule prevents a Secret user from copying data into an Unclassified file?",
    "The star (*) property, no write down."
   ],
   [
    "Why does Biba forbid reading down?",
    "Reading lower-integrity data could contaminate the subject's decisions and then the higher-integrity data it writes."
   ],
   [
    "What Clark-Wilson element checks that data is in a valid state?",
    "The integrity verification procedure (IVP)."
   ],
   [
    "Which model changes a user's access based on what they have already accessed?",
    "Brewer-Nash, the Chinese Wall model."
   ]
  ]
 },
 {
  "t": "Controls based on system security requirements; evaluation criteria (Common Criteria)",
  "body": [
   "Choosing controls should start with requirements, not products. A system's security requirements come from its data classification, business function, laws and contracts, risk assessment and the organization's policies. Once you know what the system must achieve, for example 'only authenticated clinicians can view patient records, and every access is logged', you select controls that meet those requirements and later verify that they do. Starting from a favorite product instead often leaves real requirements unmet while spending money on features nobody needed.",
   "Controls can be categorized in two ways, and exam questions use both. By type: administrative or managerial (policies, procedures, training), technical or logical (encryption, firewalls, access control) and physical (locks, guards, fences). By function: preventive (stop an incident), detective (discover it), corrective (fix it after it happens), deterrent (discourage attempts), recovery (restore operations), directive (tell people what to do) and compensating (an alternative when the primary control is not feasible). A single control can be described both ways: a security camera is a physical control that is detective and also deterrent.",
   "After selecting controls, organizations need assurance that products actually deliver the security they claim. Product evaluation criteria provide that assurance through independent testing. Historically, the United States used the Trusted Computer System Evaluation Criteria (TCSEC, the 'Orange Book'), and Europe used the Information Technology Security Evaluation Criteria (ITSEC). Both were replaced by the Common Criteria for Information Technology Security Evaluation, an international standard published as ISO/IEC 15408, with mutual recognition of certificates among participating countries.",
   "Common Criteria has its own vocabulary. The target of evaluation (TOE) is the product or system being evaluated. A protection profile (PP) is an implementation-independent set of security requirements for a category of products, such as firewalls or smart cards, typically written by a customer group or government. A security target (ST) is the vendor's document describing the security properties of its specific product, often claiming conformance to a protection profile. Security functional requirements describe what the product does; security assurance requirements describe how thoroughly it was designed, documented and tested.",
   "Evaluation assurance levels (EALs) run from EAL1 to EAL7. They measure how rigorously the product was evaluated, not how secure it is in absolute terms. EAL1 is functionally tested; EAL2 structurally tested; EAL3 methodically tested and checked; EAL4 methodically designed, tested and reviewed; EAL5 semiformally designed and tested; EAL6 semiformally verified design and tested; EAL7 formally verified design and tested. Many recent evaluations focus on conformance to protection profiles rather than on high EALs. Certification and authorization are the organizational counterparts. Certification, or security assessment, is the technical evaluation of a system in its operating environment. Accreditation, now usually called authorization, is management's formal decision to accept the residual risk and allow the system to operate, often called an authorization to operate (ATO).",
   "Consider a worked example. A government agency needs a new firewall for a network carrying sensitive data. Its requirements include stateful filtering, strong administrator authentication and tamper-evident audit logs. The agency looks for products evaluated against a recognized network device or firewall protection profile and reads each vendor's security target to see exactly which configuration was evaluated. It chooses one, deploys it in the evaluated configuration, and then the agency's assessors test the whole system in place. Finally, the authorizing official reviews the assessment and residual risks and signs the authorization to operate. The evaluated product alone did not make the system secure; correct deployment and management acceptance did.",
   "Common mistakes: believing a higher EAL means a product is more secure rather than more rigorously evaluated; mixing up who writes protection profiles (customers or governments) and security targets (vendors); assuming an evaluated product is secure in any configuration; confusing certification (technical assessment) with accreditation or authorization (management acceptance); and classifying a control only by type when the question asks for its function.",
   "Exam clues: 'international standard for product evaluation' points to Common Criteria; 'customer requirements for a product class' points to a protection profile; 'vendor's claims for its product' points to a security target; 'formally verified' points to EAL7; 'management accepts risk and approves operation' points to accreditation or authorization. Think like a manager: derive controls from business and legal requirements, use independent evaluation as evidence, and remember that only management can accept residual risk."
  ],
  "terms": [
   [
    "Common Criteria",
    "An international framework (ISO/IEC 15408) for independently evaluating the security of IT products."
   ],
   [
    "Target of evaluation (TOE)",
    "The specific product or system being evaluated under Common Criteria."
   ],
   [
    "Protection profile (PP)",
    "An implementation-independent set of security requirements for a category of products, usually written by customers or governments."
   ],
   [
    "Security target (ST)",
    "A vendor's document describing the security properties and evaluated configuration of its product."
   ],
   [
    "Evaluation assurance level (EAL)",
    "A rating from EAL1 to EAL7 describing how rigorously a product was evaluated."
   ],
   [
    "Authorization (accreditation)",
    "Management's formal decision to accept residual risk and allow a system to operate."
   ],
   [
    "Compensating control",
    "An alternative control used when a primary control is not feasible, providing similar risk reduction."
   ]
  ],
  "example": "A bank buys a hardware appliance whose marketing highlights a high Common Criteria rating. The security architect reads the security target and finds that the evaluated configuration disabled the remote management feature the bank planned to use. The bank either deploys the appliance in the evaluated configuration or documents the deviation and its risk, rather than relying on the rating alone.",
  "tip": "A higher EAL means the product was evaluated more rigorously, not that it is guaranteed secure. Customers write protection profiles; vendors write security targets. Certification is technical; authorization is management accepting risk.",
  "check": [
   [
    "What is the difference between a protection profile and a security target?",
    "A protection profile states requirements for a product category from the customer's perspective; a security target describes a specific vendor product's security claims."
   ],
   [
    "Does an EAL7 product guarantee security?",
    "No. EAL7 means the design was formally verified and tested, but the product must still be deployed and managed correctly."
   ],
   [
    "Classify a security guard by type and function.",
    "A physical control that is preventive and deterrent, and also detective when observing incidents."
   ],
   [
    "Who grants authorization to operate a system?",
    "A senior manager or authorizing official who formally accepts the residual risk."
   ]
  ]
 },
 {
  "t": "Security capabilities of information systems: TPM, memory protection, HSM",
  "body": [
   "Modern hardware and operating systems include built-in security capabilities that software alone cannot provide. The CISSP exam expects you to know what each does and when to use it. Many of them rely on the idea of a hardware root of trust: a small, trusted component whose integrity everything else builds on. If the root is trustworthy, it can measure and verify the next layer, which verifies the next, forming a chain of trust up to the running applications.",
   "A Trusted Platform Module (TPM) is a secure cryptoprocessor, either a discrete chip on the motherboard or firmware built into the processor. It generates and stores keys that are hard to extract, and it records measurements (hashes) of boot components in platform configuration registers (PCRs). This supports measured boot and remote attestation, where a system proves to another party what software it booted. A TPM can seal a key so it is released only if the boot measurements match expected values, which is how full-disk encryption tools protect a drive: if the boot chain has been tampered with, the key is not released. A TPM is bound to one device.",
   "A hardware security module (HSM) is a dedicated, tamper-resistant device, often a network appliance or plug-in card, that generates, stores and uses cryptographic keys at high performance for many applications. Certificate authorities, payment systems and key management services use HSMs so private keys never leave protected hardware in plaintext. HSMs are commonly validated against the Federal Information Processing Standard (FIPS) 140 series, and cloud providers offer HSM-backed key services. The key distinction: a TPM protects one computer; an HSM serves keys and cryptographic operations for many systems.",
   "Memory protection keeps processes from interfering with each other and with the operating system. Techniques include process isolation, where each process has its own virtual address space; protection rings, where the kernel runs in the most privileged ring (ring 0) and applications in a less privileged ring (ring 3); data execution prevention (DEP), which marks memory areas such as the stack as non-executable so injected data cannot run as code; and address space layout randomization (ASLR), which randomizes where code and data load, making memory corruption attacks harder to exploit reliably. Secure boot, a related capability, checks digital signatures on boot components so only trusted code loads. Where secure boot blocks untrusted code, measured boot records what loaded so it can be attested.",
   "Other capabilities appear in the same objective. Trusted execution environments (TEEs) and secure enclaves isolate sensitive processing even from the main operating system. Virtualization isolates guest systems through the hypervisor. The trusted computing base (TCB) is the total set of hardware, firmware and software that enforces security; everything outside it is untrusted. The reference monitor is the concept of a component that mediates every access by subjects to objects, and it must be tamperproof, always invoked and small enough to verify. The security kernel is the implementation of the reference monitor inside the TCB. Encryption, restricted interfaces and fault tolerance also count as system capabilities.",
   "Consider a worked example. A company issues laptops with TPMs and enables full-disk encryption sealed to the TPM plus a user PIN. When a thief removes the drive and places it in another machine, the key is never released because the TPM is not present. When an attacker instead tampers with the bootloader on a stolen laptop, the boot measurements change and the TPM refuses to unseal the key. Separately, the company's internal certificate authority keeps its signing key in an HSM that requires two administrators with smart cards to authorize key operations, so no single person can misuse the key.",
   "Common mistakes: confusing a TPM with an HSM; thinking secure boot and measured boot are the same thing; believing DEP or ASLR alone prevents all memory attacks (they raise the difficulty, which is why layered defenses matter); forgetting that the reference monitor must be always invoked; and assuming the TCB includes every component on the system. Only components that enforce security belong in it, and a smaller TCB is easier to verify.",
   "Exam clues: 'chip on the motherboard', 'sealed keys' or 'attestation' point to TPM; 'centralized, high-volume key storage' or 'certificate authority private key' points to HSM; 'non-executable memory' points to DEP; 'randomized memory locations' points to ASLR; 'mediates all access' points to the reference monitor. Think like a manager: use hardware-backed protection for the most valuable keys and platforms, and choose between TPM and HSM by scope, one device or many services."
  ],
  "terms": [
   [
    "Trusted Platform Module (TPM)",
    "A secure cryptoprocessor bound to one device that stores keys and records boot measurements."
   ],
   [
    "Hardware security module (HSM)",
    "A tamper-resistant device that securely generates, stores and uses keys for many applications."
   ],
   [
    "Root of trust",
    "A trusted hardware or firmware component on which the security of the rest of the system depends."
   ],
   [
    "Address space layout randomization (ASLR)",
    "Randomizing memory locations of code and data to make memory corruption attacks harder to exploit."
   ],
   [
    "Data execution prevention (DEP)",
    "Marking memory regions as non-executable so data injected there cannot run as code."
   ],
   [
    "Trusted computing base (TCB)",
    "The combination of hardware, firmware and software components that enforce a system's security policy."
   ],
   [
    "Reference monitor",
    "An abstract component that mediates all access; it must be tamperproof, always invoked and verifiable."
   ]
  ],
  "example": "A payment processor handles thousands of card transactions per second. Its keys for encrypting PINs live in a cluster of HSMs validated to FIPS 140, and application servers send requests to them rather than handling keys directly. Each server also has a TPM that attests its boot state before the HSM cluster accepts its connections, combining device-level and service-level hardware protection.",
  "tip": "TPM equals one device, boot integrity and sealed disk keys; HSM equals centralized, high-volume key storage and crypto operations for many applications. The reference monitor must be tamperproof, always invoked and small enough to verify.",
  "check": [
   [
    "What does it mean for a TPM to seal a key?",
    "The key is released only if the platform's boot measurements match expected values, so tampering prevents access."
   ],
   [
    "When would you choose an HSM over a TPM?",
    "When many applications or servers need secure, high-performance key storage and cryptographic operations, such as a certificate authority or payment system."
   ],
   [
    "Which memory protection marks the stack as non-executable?",
    "Data execution prevention (DEP)."
   ],
   [
    "What are the three required properties of a reference monitor?",
    "It must be tamperproof, always invoked and small enough to be verified."
   ]
  ]
 },
 {
  "t": "Vulnerabilities in architectures: client, server, database, cloud, IoT, ICS/OT, virtualization, containers, serverless",
  "body": [
   "Every architecture has characteristic weak spots. The exam describes an environment and expects you to recognize its typical vulnerabilities and matching mitigations. The underlying lesson is to understand where trust lives, where trust boundaries sit and where attackers can abuse them. You will not be asked for exploit details; you will be asked which weakness fits the scenario and which control best reduces it.",
   "Client-based systems, such as desktops, browsers and mobile apps, face malicious downloads, unpatched software, insecure local data caching, and scripts or plugins that run with too much privilege. Mitigations include patching, endpoint protection, application allow-listing and never trusting client-side validation alone. Server-based systems face exposed services, misconfiguration, weak authentication and data flow control problems; harden them, minimize services and monitor them. Databases have their own issues. Aggregation is combining individually low-sensitivity data to reveal something more sensitive. Inference is deducing sensitive information from data you are allowed to see. Countermeasures include polyinstantiation (maintaining multiple records at different classification levels so lower-cleared users cannot infer hidden data), cell suppression, noise and perturbation, and database views that restrict what users see. Injection flaws and excessive privileges are common technical weaknesses.",
   "Cloud systems split responsibility under a shared responsibility model: the provider secures the underlying infrastructure, while the customer secures what it configures, such as identities, data and access settings, with the split varying across infrastructure, platform and software as a service. The most common cloud failures are customer misconfigurations, such as publicly exposed storage, overly broad permissions and leaked access keys. Multi-tenancy adds a risk of isolation failures between customers. Distributed and large-scale parallel systems add complexity in data consistency and trust between nodes, and edge and fog computing push processing to many less-protected locations.",
   "Internet of Things (IoT) devices often have weak default credentials, limited or no patching, insecure communication and long lifespans. Industrial control systems and operational technology (ICS/OT), such as supervisory control and data acquisition (SCADA) systems, programmable logic controllers (PLCs) and distributed control systems, prioritize availability and physical safety, use legacy protocols designed without authentication and cannot be patched or rebooted easily. Mitigations include network segmentation that separates OT from IT, tightly controlled remote access, passive monitoring rather than aggressive scanning, and compensating controls. Embedded systems share many of these concerns.",
   "Virtualized systems rely on the hypervisor for isolation. Risks include virtual machine escape (breaking out of a guest to reach the host or other guests), VM sprawl (unmanaged, unpatched VMs) and weakly protected management interfaces. Containers share the host kernel, so a kernel flaw or privileged container can affect everything on the host; other risks include vulnerable or untrusted images, secrets baked into images and overly permissive orchestration. Mitigations include minimal trusted images, image scanning, running as non-root and isolating workloads. Serverless, or function as a service, removes server management but introduces over-privileged function roles, injection through event data, insecure dependencies and reduced visibility for monitoring. Microservices multiply the number of APIs and service-to-service trust relationships that need authentication.",
   "Consider a worked example. A water utility connects its SCADA network to the corporate network so engineers can view dashboards from their desks. An assessment finds PLCs reachable from the office LAN, a vendor remote access tool with a shared password, and an unpatched historian server. Because the PLCs cannot be patched without downtime, the team places a firewall and demilitarized zone between IT and OT, moves the dashboards to a replicated historian in that zone, replaces vendor access with a monitored jump host using multifactor authentication and time-limited accounts, and deploys passive network monitoring that alerts on unexpected commands. Patching follows during planned maintenance.",
   "Common mistakes: recommending active vulnerability scanning or immediate patching of fragile OT devices; blaming the cloud provider for customer misconfigurations; treating containers as strongly isolated as virtual machines; confusing aggregation with inference; and assuming serverless means there is nothing to secure. Another trap is relying on client-side controls such as browser validation.",
   "Exam clues: 'combining harmless data reveals secrets' points to aggregation; 'deducing hidden data' points to inference; 'multiple records at different levels' points to polyinstantiation; 'public storage bucket' points to customer misconfiguration; 'guest breaks out to host' points to VM escape; 'shared kernel' points to containers; 'safety and availability first' points to ICS/OT. Think like a manager: fit controls to the architecture's priorities, especially safety in OT, and remember shared responsibility never shifts accountability for your data."
  ],
  "terms": [
   [
    "Aggregation",
    "Combining individually low-sensitivity data items to reveal more sensitive information."
   ],
   [
    "Inference",
    "Deducing sensitive information from data a user is authorized to access."
   ],
   [
    "Polyinstantiation",
    "Maintaining multiple versions of a record at different classification levels to prevent inference."
   ],
   [
    "Shared responsibility model",
    "The division of security duties between a cloud provider and its customer, varying by service model."
   ],
   [
    "ICS/OT",
    "Industrial control systems and operational technology that monitor and control physical processes."
   ],
   [
    "VM escape",
    "A compromise in which code in a virtual machine breaks isolation to reach the hypervisor or other guests."
   ],
   [
    "Serverless",
    "A cloud model where the provider runs functions on demand and the customer manages code, permissions and data."
   ]
  ],
  "example": "A retailer's developers deploy a serverless function to resize product images. The function's role grants full access to every storage bucket because it was quicker to set up. A later review scopes the role to one input and one output bucket, validates event data before processing, scans dependencies in the build pipeline and sends function logs to central monitoring.",
  "tip": "For ICS/OT the exam favors segmentation and availability-safe controls over patching or active scanning. For cloud, customer misconfiguration is the most common failure under shared responsibility. Containers share the host kernel.",
  "check": [
   [
    "A user learns a secret project exists by noticing unusual budget entries they are allowed to see. What vulnerability is this?",
    "Inference, deducing sensitive information from permitted data."
   ],
   [
    "Why are containers considered less isolated than virtual machines?",
    "Containers share the host operating system kernel, so a kernel flaw or privileged container can affect all containers on the host."
   ],
   [
    "What is the preferred first control for protecting legacy PLCs that cannot be patched?",
    "Network segmentation separating OT from IT, with tightly controlled remote access and passive monitoring."
   ],
   [
    "Under shared responsibility in infrastructure as a service, who secures access policies on customer storage?",
    "The customer, because it configures identities, permissions and data settings."
   ]
  ]
 },
 {
  "t": "Cryptographic solutions: symmetric, asymmetric, hashing, PKI, key management lifecycle",
  "body": [
   "Cryptography is a toolbox, and the CISSP exam cares less about the mathematics than about choosing the right tool. Each tool provides different services: confidentiality, integrity, authentication and non-repudiation. The exam also expects you to understand how keys are managed, because weak key management breaks strong algorithms. In practice most breaches involving cryptography come from poor key handling or outdated configurations, not from someone breaking the algorithm.",
   "Symmetric cryptography uses one shared secret key for both encryption and decryption. It is fast and suited to bulk data. The Advanced Encryption Standard (AES) is the modern standard, with 128-, 192- and 256-bit keys; older algorithms such as the Data Encryption Standard (DES) and Triple DES (3DES) are deprecated. Symmetric encryption provides confidentiality, but its challenge is key distribution: both parties need the key, and the number of keys grows quickly, n(n-1)/2 for n people communicating pairwise. It cannot provide non-repudiation, since both parties hold the same key. Modes matter: authenticated modes such as Galois/Counter Mode (GCM) provide integrity as well as confidentiality, while Electronic Codebook (ECB) leaks patterns and should be avoided.",
   "Asymmetric, or public key, cryptography uses a key pair: a public key that can be shared and a private key that must be kept secret. Encrypt with the recipient's public key for confidentiality; only their private key decrypts. Sign with your own private key; anyone with your public key can verify the signature, which provides authenticity, integrity and non-repudiation. Common algorithms are RSA (Rivest-Shamir-Adleman), elliptic curve cryptography (ECC, which offers equivalent strength with shorter keys) and Diffie-Hellman for key agreement. Asymmetric systems need only 2n keys for n people. Because asymmetric operations are slow, real systems use hybrid cryptography: asymmetric methods exchange or agree on a symmetric session key, which then encrypts the data. TLS works this way, and ephemeral key exchange provides forward secrecy.",
   "Hashing turns input of any size into a fixed-length digest. Good hash functions are one-way and collision resistant, and they support integrity checks, digital signatures and password storage. The SHA-2 and SHA-3 families are current; MD5 and SHA-1 are considered broken for collision resistance. For passwords, use a unique random salt per password and a deliberately slow function such as bcrypt, scrypt, Argon2 or PBKDF2. A keyed hash, the hash-based message authentication code (HMAC), adds authentication between parties who share a key, but not non-repudiation.",
   "Public key infrastructure (PKI) binds public keys to identities using X.509 digital certificates. A certificate authority (CA) signs certificates after a registration authority (RA) verifies the requester's identity. Trust flows from a root CA, often kept offline, through intermediate CAs. Revocation is checked through certificate revocation lists (CRLs) or the Online Certificate Status Protocol (OCSP), and OCSP stapling lets servers deliver fresh status themselves. The key management life cycle covers generation (strong randomness, adequate length), distribution (secure key exchange or out-of-band delivery), storage (hardware security modules, key vaults, never hard-coded), use (one purpose per key), rotation (on a schedule or after suspected compromise), backup and escrow, revocation and destruction. Split knowledge and dual control ensure no single person can access a critical key alone. Cryptographic agility, the ability to change algorithms quickly, matters as post-quantum algorithms are adopted.",
   "Consider a worked example. A company builds a secure document exchange. Each document is encrypted with a fresh AES-256 key in GCM mode (fast, with integrity). That document key is encrypted with each recipient's public key from their certificate (hybrid cryptography). The sender signs a SHA-256 hash of the document with her private key (non-repudiation). Recipients check the sender's certificate chain to a trusted root and check revocation status through OCSP. All private keys for the service's own certificates live in an HSM, rotate annually, and require two administrators for export to escrow.",
   "Common mistakes: encrypting with your own private key when you meant to provide confidentiality; thinking hashing is encryption; using fast unsalted hashes for passwords; forgetting that symmetric keys cannot give non-repudiation; hard-coding keys in source code; and ignoring revocation checks. Another trap is choosing ECB mode because it is simple.",
   "Exam clues: 'bulk data, fast' points to symmetric; 'no prior shared secret' points to asymmetric or Diffie-Hellman; 'fixed-length digest' points to hashing; 'proof of sender' points to a digital signature; 'check whether a certificate is still valid' points to CRL or OCSP; 'no single person holds the whole key' points to split knowledge and dual control. Think like a manager: choose proven, standard algorithms, protect and rotate keys through a documented life cycle, and plan for algorithm change."
  ],
  "terms": [
   [
    "Symmetric encryption",
    "Encryption using one shared secret key for both encryption and decryption."
   ],
   [
    "Asymmetric encryption",
    "Encryption using a mathematically related public and private key pair."
   ],
   [
    "Hash function",
    "A one-way function that produces a fixed-length digest from input of any size."
   ],
   [
    "Digital signature",
    "A hash of a message encrypted with the signer's private key, providing integrity, authenticity and non-repudiation."
   ],
   [
    "Public key infrastructure (PKI)",
    "The roles, policies and systems that issue, manage and revoke digital certificates."
   ],
   [
    "Online Certificate Status Protocol (OCSP)",
    "A protocol for checking the revocation status of an individual certificate in real time."
   ],
   [
    "Split knowledge and dual control",
    "Controls ensuring no single person knows or can use a whole critical key alone."
   ]
  ],
  "example": "A software vendor signs every update with a code-signing key held in an HSM. When a build server is compromised, the attackers cannot sign malicious updates because the key never leaves the HSM and signing requires two approvers. The vendor still rotates its build credentials, reviews recent signed releases and publishes updated verification guidance, showing why protecting keys matters as much as choosing algorithms.",
  "tip": "To send someone a confidential message, encrypt with their public key. To sign, use your own private key. Symmetric needs n(n-1)/2 keys; asymmetric needs 2n. Only digital signatures give non-repudiation.",
  "check": [
   [
    "Alice wants to send Bob a confidential message using asymmetric cryptography. Which key does she use?",
    "Bob's public key, so only Bob's private key can decrypt it."
   ],
   [
    "How many symmetric keys are needed for 10 people to communicate pairwise?",
    "10 x 9 / 2 = 45 keys."
   ],
   [
    "Why add a salt when hashing passwords?",
    "A unique random salt makes identical passwords hash differently and defeats precomputed lookup tables."
   ],
   [
    "What is the purpose of OCSP?",
    "To check in real time whether a specific certificate has been revoked."
   ]
  ]
 },
 {
  "t": "Cryptanalytic attacks: brute force, side channel, man-in-the-middle, pass the hash, ransomware",
  "body": [
   "Cryptanalytic attacks try to defeat cryptography or the systems built around it. The surprising lesson from decades of real incidents is that attackers rarely break the mathematics of a modern algorithm such as the Advanced Encryption Standard (AES). Instead they exploit weak keys, poor implementations, leaked credentials, careless users or the fact that data must eventually be decrypted to be used. The CISSP outline groups several of these together, and your job as a security professional is to recognize each category and match it to the defense that actually works.",
   "Brute force tries every possible key or password until one works. Its feasibility depends on the size of the key space and the speed of guessing, which is why every extra bit of key length doubles the work. Online guessing against a login page is slowed by account lockout, throttling and multifactor authentication (MFA); offline guessing against stolen password hashes is slowed by deliberately slow, salted hashing functions. Dictionary attacks try likely words and previously leaked passwords first. Rainbow tables use precomputed hash chains to reverse unsalted hashes quickly, and salting defeats them because each password would need its own table. Birthday attacks exploit collision mathematics: finding any two inputs with the same hash is far easier than matching one specific hash, so longer digests are needed for collision resistance.",
   "Analytic attacks target the algorithm or protocol itself. The attack models describe what the attacker knows or controls: ciphertext-only (the weakest position), known plaintext (some matching plaintext and ciphertext pairs), chosen plaintext (the attacker can get chosen messages encrypted) and chosen ciphertext (the attacker can get chosen ciphertexts decrypted). Frequency analysis breaks simple substitution ciphers because letter patterns survive encryption. Implementation attacks exploit flaws in how cryptography was coded, such as weak random number generators, reused nonces, hard-coded keys or error messages that leak whether padding was valid. Most practical breaks live here, which is why you should use vetted libraries rather than writing your own cryptography.",
   "Side-channel attacks gather information from the physical behavior of a system rather than its intended outputs: timing differences, power consumption, electromagnetic emissions, sound or processor cache behavior. Fault injection deliberately induces errors, for example with voltage or clock glitches, so that faulty outputs reveal key material. Defenses include constant-time code, shielding, noise, tamper-resistant hardware such as hardware security modules (HSMs) and smart cards, and physical access control. Separately, an on-path attack (traditionally called man-in-the-middle) places the attacker between two parties to read or alter traffic, often through Address Resolution Protocol (ARP) or Domain Name System (DNS) poisoning or a rogue access point. Mutual authentication, strict certificate validation and authenticated key exchange defeat it. Replay attacks resend captured valid messages and are countered by timestamps, nonces and sequence numbers.",
   "Pass the hash abuses authentication protocols, notably NT LAN Manager (NTLM) in Windows, that accept a password hash as proof of identity. An attacker who extracts a hash from memory on a compromised machine can authenticate as that user without ever cracking it. Pass the ticket is the Kerberos equivalent. Ransomware turns cryptography against its victims: it encrypts files and demands payment for the key, and modern variants also steal data first and threaten to publish it, which is called double extortion. Neither attack breaks an algorithm; both abuse legitimate cryptographic mechanisms after an initial compromise.",
   "Consider a worked example. A hospital finds that several workstations are encrypting shared drives. Investigation shows the attacker phished one user, dumped cached credential hashes from that laptop, and used pass the hash with a help desk account that had local administrator rights on every workstation. Recovery succeeds because the backup system was immutable and isolated, and restores had been tested quarterly. Afterward the hospital deploys unique local administrator passwords per machine, restricts privileged logons to hardened admin workstations, enables credential isolation features, disables NTLM where possible, and adds detection for unusual lateral authentication.",
   "Common mistakes: thinking longer keys fix a side-channel leak (they do not, because the leak is in the implementation); believing encryption alone stops an on-path attacker (without certificate validation you may be encrypting to the attacker); assuming salting slows brute force of a single strong guess (it defeats precomputation, while slow hashing is what raises the cost per guess); and treating ransom payment as a recovery plan. Payment does not guarantee a working key, may break sanctions law and encourages repeat attacks, so the decision belongs to senior management with legal counsel.",
   "Exam wording gives the category away. 'Precomputed table' points to rainbow tables and salting. 'Measured power draw' or 'timing differences' points to a side channel. 'Reused a captured hash without cracking it' is pass the hash. 'Resent a valid authentication message' is replay. 'Two different documents produce the same digest' is a collision, related to the birthday attack. For ransomware, think like a manager: the best answer is usually tested, offline or immutable backups plus an incident response plan, not paying or buying a single new tool."
  ],
  "terms": [
   [
    "Brute force attack",
    "Trying every possible key or password until the correct one is found, defeated by large key spaces, slow hashing and lockout."
   ],
   [
    "Rainbow table",
    "A precomputed set of hash chains used to reverse unsalted password hashes quickly, made useless by unique salts."
   ],
   [
    "Birthday attack",
    "An attack that exploits the relative ease of finding any two inputs with the same hash value."
   ],
   [
    "Side-channel attack",
    "An attack that extracts secrets from physical behavior such as timing, power use or emissions rather than from the algorithm."
   ],
   [
    "On-path attack",
    "An attacker positioned between two parties to intercept or modify their traffic, also called man-in-the-middle."
   ],
   [
    "Pass the hash",
    "Authenticating with a stolen password hash instead of the password, possible with protocols such as NTLM."
   ],
   [
    "Double extortion",
    "A ransomware tactic that both encrypts data and threatens to publish stolen copies of it."
   ]
  ],
  "example": "A payment terminal vendor learns that researchers recovered card keys by measuring tiny variations in power consumption while the device performed encryption. The algorithm was sound; the implementation leaked. The vendor moves key operations into a tamper-resistant secure element that uses constant-time routines and noise, and adds tamper detection that erases keys if the case is opened.",
  "tip": "Match the defense to the attack: salting stops rainbow tables, slow hashing and lockout slow brute force, constant-time and tamper-resistant hardware stop side channels, certificate validation stops on-path attacks, and tested offline backups are the key ransomware control.",
  "check": [
   [
    "Why does salting defeat rainbow tables?",
    "Each password gets a unique random salt before hashing, so a single precomputed table cannot cover all hashes; the attacker would need a separate table per salt."
   ],
   [
    "An attacker measures how long a smart card takes to respond to many operations and deduces the key. What type of attack is this?",
    "A side-channel (timing) attack, because it uses physical behavior rather than a weakness in the algorithm's mathematics."
   ],
   [
    "How does pass the hash differ from password cracking?",
    "Pass the hash reuses the stolen hash directly to authenticate, so the attacker never needs to recover the plaintext password."
   ],
   [
    "What is the most important control for recovering from ransomware?",
    "Offline or immutable backups that are tested regularly, combined with a practiced incident response plan, because they allow restoration without paying."
   ]
  ]
 },
 {
  "t": "Secure site and facility design",
  "body": [
   "Physical security protects people, equipment and data from harms that no firewall can stop: intruders, theft, vandalism, fire, flood and accidents. The CISSP treats it as a design problem rather than an afterthought. The cheapest and most effective moment to secure a facility is before it is built, bought or leased, because moving a server room or adding a second entrance later is expensive. Above every other consideration sits one rule: human safety comes first. No physical control is acceptable if it traps people during an emergency.",
   "Site selection comes first. Consider natural disaster exposure (flood plains, earthquake zones, severe weather), local crime rates, distance to police, fire and medical services, access to reliable power and telecommunications from diverse providers, and neighbors that could create risk, such as chemical plants, airports or high-profile targets. Visibility matters too. A data center often benefits from a nondescript building with no signs advertising what it holds, sometimes described as security through low profile. A site close to the main office may be convenient but can share the same regional disaster, which matters for backup locations.",
   "Crime Prevention Through Environmental Design (CPTED) uses the physical environment to discourage crime before any guard is involved. Natural access control guides people toward controlled entrances using landscaping, fencing, lighting and walkways. Natural surveillance arranges spaces so people can see and be seen, such as windows overlooking parking areas, low shrubs and clear sight lines. Territorial reinforcement makes ownership obvious through signs, walls, pavement changes and well-kept grounds that signal a space is cared for and watched. Maintenance is often added as a fourth element, because broken lights and neglected spaces invite crime.",
   "Facility design layers defenses from the outside in: the perimeter (fencing, gates, bollards that stop vehicles, lighting), the grounds, the building exterior (hardened doors, few entrances, limited ground-floor windows), interior zones and finally the most sensitive rooms. Each layer should delay an intruder long enough for detection and response, summarized as deter, detect, delay, respond. Sensitive rooms such as server rooms belong in the building's core, away from exterior walls, not on the top floor where roof leaks threaten them, not in a basement where flooding does, and not beside public areas. Walls around them should run from the true floor to the true ceiling, and doors, ducts and raised floors must match the strength of the walls, because the weakest barrier defines the real protection.",
   "Entry points get special attention. An access control vestibule, traditionally called a mantrap, lets only one person through at a time and prevents tailgating (following someone through without their knowledge) and piggybacking (entering with their consent). Badge readers, biometric readers, turnstiles and guards verify identity, and visitor management adds sign-in, temporary badges, escorts and logs. Life safety design is non-negotiable: exits are clearly marked, escape-route doors allow egress during emergencies (fail-safe for people, even where equipment locks fail-secure), and evacuation plans are practiced.",
   "Consider a worked example. Your company is choosing between two buildings for a new regional data center. Building A is a glass-fronted office on a busy street with the proposed server room on the ground floor along the outside wall. Building B is a plain two-story structure set back from the road, with an interior room on the upper floor that has no exterior walls, room for bollards along the driveway, and utility feeds from two substations. Applying CPTED and layered design, you recommend Building B, add perimeter lighting and cameras, place a vestibule at the single staff entrance, and confirm the fire exits meet code before any lock is installed.",
   "Common mistakes: putting the server room in the basement to keep it out of sight (flood risk) or on the top floor (roof leaks, harder evacuation); building walls only to the drop ceiling so someone can climb over; choosing fail-secure locks on doors people need for escape; and adding cameras without anyone monitoring or reviewing them. Another trap is designing only for intruders and forgetting accidents and natural disasters, which cause far more outages. Physical controls also need administrative support, such as badge revocation when staff leave.",
   "Exam questions often ask for the first or best consideration. When any option involves human life, choose it: evacuation, egress and safety outrank protecting equipment or data. Clue words map cleanly: 'people see and are seen' is natural surveillance, 'signs and landscaping show ownership' is territorial reinforcement, 'one person at a time' is a vestibule or mantrap, and 'following an employee through a door' is tailgating. Think like a manager: the best time to address physical risk is during site selection and design, not after construction."
  ],
  "terms": [
   [
    "CPTED",
    "Crime Prevention Through Environmental Design, using layout, lighting and landscaping to discourage crime."
   ],
   [
    "Natural surveillance",
    "The CPTED strategy of arranging spaces so activity is easily visible to others."
   ],
   [
    "Territorial reinforcement",
    "The CPTED strategy of using physical cues to show a space is owned and cared for."
   ],
   [
    "Access control vestibule",
    "A small space between two doors that admits one person at a time, also called a mantrap."
   ],
   [
    "Tailgating",
    "Following an authorized person through a controlled entrance without their knowledge."
   ],
   [
    "Piggybacking",
    "Entering a controlled area with an authorized person's consent but without your own authorization."
   ],
   [
    "Deter, detect, delay, respond",
    "The layered physical security sequence in which each barrier buys time for a response."
   ]
  ],
  "example": "A software company leases a new headquarters and asks security to review the plans before signing. The team finds that the planned server room shares an exterior wall with a loading dock and sits below a rooftop cooling unit. They negotiate an interior room on a middle floor, full-height walls, a single badge-controlled door with a camera, bollards at the dock, and confirmation that the emergency exits in the office area remain unlocked from the inside.",
  "tip": "Human safety always outranks protecting assets. Server rooms go in the building's interior, not the basement, top floor or along exterior walls.",
  "check": [
   [
    "What are the three core CPTED strategies?",
    "Natural access control, natural surveillance and territorial reinforcement, with maintenance often added as a fourth."
   ],
   [
    "Why should a server room not be placed in a basement?",
    "Basements are prone to flooding and water damage, which threatens availability of the equipment."
   ],
   [
    "What control prevents tailgating at a data center entrance?",
    "An access control vestibule (mantrap) or turnstile that admits one authenticated person at a time, backed by awareness training."
   ],
   [
    "A proposed door lock would prevent staff from leaving during a fire. What should you recommend?",
    "Reject or redesign it, because life safety takes priority; escape-route doors must allow egress in an emergency."
   ]
  ]
 },
 {
  "t": "Site and facility controls: wiring closets, server rooms, utilities, HVAC, fire suppression, environmental",
  "body": [
   "Once a facility is designed, specific controls protect the rooms and systems inside it. This lesson covers the practical details the exam likes to test: wiring closets and server rooms, power, heating and cooling, fire detection and suppression, and environmental monitoring. They matter because most of them protect availability, and some of them protect lives. A perfectly patched server is useless when the room it sits in overheats or floods.",
   "Wiring closets, also called intermediate distribution facilities, and server rooms concentrate valuable equipment and network connections. Keep them locked with access limited to those who need it and recorded electronically, not shared keys. They should not double as storage rooms full of cardboard, which adds fuel for fire. Walls should extend from true floor to true ceiling so nobody can climb over through a drop ceiling. Add cameras, intrusion alarms, locked racks and tidy, labeled cabling to deter and reveal tampering. Media storage and evidence storage need similar protection plus inventory control and a record of who accessed what.",
   "Utilities need resilience, and you must know the power vocabulary. A fault is a momentary loss of power and a blackout is a prolonged loss. A sag is momentary low voltage and a brownout is prolonged low voltage. A spike is momentary high voltage and a surge is prolonged high voltage. Inrush is the surge drawn when equipment powers on, and noise is electromagnetic or radio frequency interference on the line. Surge protectors and line conditioners handle quality problems. An uninterruptible power supply (UPS) bridges short outages and allows orderly shutdown or transfer to a generator. A generator supplies long-term power but needs fuel contracts and regular load testing. Separate utility feeds from different substations add another layer.",
   "Heating, ventilation and air conditioning (HVAC) keeps equipment within safe ranges. Too much heat shortens equipment life and causes shutdowns. Humidity that is too low increases static electricity; humidity that is too high causes condensation and corrosion. Hot aisle and cold aisle layouts keep exhaust and intake air separate for efficient cooling. Positive pressurization pushes air out when doors open, keeping dust and smoke out. The data center should have dedicated HVAC with secured controls, because an attacker who can change setpoints can cause an outage without touching a server.",
   "Fire needs heat, fuel and oxygen, plus a sustaining chemical reaction in the fire tetrahedron; suppression removes one of these. In the common United States classification, Class A is ordinary combustibles (water or foam), Class B is flammable liquids (carbon dioxide, foam or dry chemical), Class C is energized electrical equipment (non-conductive agents such as carbon dioxide or clean agents), Class D is combustible metals (dry powder) and Class K is cooking oils. Detection uses smoke detectors (ionization or photoelectric), heat detectors (fixed temperature or rate of rise) and flame detectors. Sprinklers come in four types. Wet pipe systems always hold water and discharge quickly but risk leaks. Dry pipe systems hold pressurized air and suit freezing areas. Pre-action systems fill the pipes only after a detector triggers, then release water only when a head also opens, which gives time to stop a false alarm and is the usual recommendation for data centers. Deluge systems open all heads at once for high-hazard areas. Clean agent gas systems protect equipment without water, though carbon dioxide is dangerous to people and Halon is no longer produced because it depletes ozone.",
   "Consider a worked example. A regional bank's server room has a wet pipe sprinkler system inherited from the office fit-out, a single UPS and no water sensors. You recommend converting to pre-action sprinklers with a clean agent system for the main racks, adding a generator with a fuel contract and monthly tests, placing leak sensors under the raised floor, setting humidity alarms, and installing an emergency power off switch by the exit with a cover to prevent accidental use.",
   "Common mistakes: confusing sag with brownout (both are low voltage, but sag is momentary) or spike with surge; assuming a UPS provides long-term power (it bridges the gap until the generator starts or systems shut down cleanly); fighting an electrical fire with water before power is cut; and forgetting that gas suppression systems need warning alarms and evacuation time so people are not harmed. Another error is buying monitoring sensors without assigning anyone to respond to alerts.",
   "Exam questions tend to describe a condition and ask for the right control or term. 'Prolonged low voltage' is a brownout. 'Momentary high voltage' is a spike. 'Water must not discharge on a false alarm' points to pre-action. 'Freezing warehouse' points to dry pipe. 'Static discharge damaging components' points to low humidity. Keep the manager's priorities in mind: when an option involves personnel safety, such as evacuation before gas release, it outranks equipment protection."
  ],
  "terms": [
   [
    "Brownout",
    "A prolonged period of low voltage on the power supply."
   ],
   [
    "Sag",
    "A momentary drop in voltage."
   ],
   [
    "Surge",
    "A prolonged period of high voltage, compared with a spike, which is momentary."
   ],
   [
    "Uninterruptible power supply (UPS)",
    "Battery-backed equipment that keeps systems running through short outages and allows clean shutdown or transfer."
   ],
   [
    "Pre-action sprinkler",
    "A system that fills pipes only after detection and releases water only when a head also opens, reducing accidental discharge."
   ],
   [
    "Clean agent",
    "A gaseous fire suppressant that extinguishes fire without leaving residue or damaging electronics."
   ],
   [
    "Positive pressurization",
    "Keeping air pressure higher inside a room so air flows out, not in, when doors open."
   ]
  ],
  "example": "During a summer heat wave a university's cooling unit fails overnight and the server room temperature climbs quickly. Because environmental sensors send alerts to the on-call engineer, staff arrive, open the backup portable cooling and gracefully shut down non-critical systems before hardware is damaged. The follow-up adds redundant cooling units and tests the alert path monthly.",
  "tip": "Pre-action is the preferred sprinkler for data centers. Sag and brownout are low voltage (momentary vs prolonged); spike and surge are high voltage (momentary vs prolonged). Never use water on energized electrical fires.",
  "check": [
   [
    "What is the difference between a spike and a surge?",
    "Both are high voltage, but a spike is momentary and a surge is prolonged."
   ],
   [
    "Why is pre-action preferred for data centers?",
    "It requires both a detection event and an opened sprinkler head before water flows, which reduces accidental water damage from false alarms or broken heads."
   ],
   [
    "What risk does very low humidity create in a server room?",
    "Increased static electricity, which can damage electronic components."
   ],
   [
    "What is the role of a UPS compared with a generator?",
    "A UPS bridges short outages and allows orderly shutdown or transfer; a generator supplies power for extended outages."
   ]
  ]
 },
 {
  "t": "Information system lifecycle: stakeholder needs through retirement",
  "body": [
   "Security is cheapest and most effective when it is built in from the start and carried through to the end of a system's life. The CISSP outline describes an information system lifecycle drawn from systems engineering practice, such as ISO/IEC/IEEE 15288 and the National Institute of Standards and Technology (NIST) Special Publication (SP) 800-160. It runs from understanding stakeholder needs through retirement. The same logic applies whether you build software in-house, buy a commercial product or configure a cloud service.",
   "The lifecycle begins with stakeholder needs and requirements. Stakeholders include business owners, users, operators, regulators, auditors and security. Their needs, including security and privacy needs, are captured in their own words. Requirements analysis then refines those needs into specific, testable system requirements, such as 'all administrative access requires multifactor authentication' or 'customer records are encrypted at rest'. Security requirements come from risk assessment, data classification, policy, contracts and law. A requirement that cannot be tested cannot be verified later. Traceability links each requirement back to the need it serves and forward to the design element and test that prove it, so nothing is lost or added without a reason.",
   "Architectural design decides the high-level structure: components, interfaces, data flows and trust boundaries, and how principles such as least privilege, defense in depth, secure defaults and fail-secure behavior apply. Threat modeling fits naturally here, because it is far cheaper to redesign a diagram than a deployed system. Development or implementation then builds or acquires the components using secure coding practices and hardened configuration baselines. Integration assembles components and checks that interfaces, authentication between services and error handling work securely together.",
   "Verification and validation are distinct, and the exam tests the difference. Verification asks 'did we build the system right?', meaning does it meet the specified requirements. Validation asks 'did we build the right system?', meaning does it meet stakeholders' actual needs in its intended environment. Code review, security testing and vulnerability assessment support both. Transition, or deployment, moves the system into production with training, documentation, secure configuration, data migration and formal authorization by management to operate, which means a senior official accepts the remaining risk.",
   "Operations and maintenance is usually the longest phase. It includes patching, configuration and change management, monitoring, vulnerability management, backups, incident response and periodic reassessment. Every change should pass through change control so its security impact is evaluated instead of silently eroding the original design. When requirements change significantly, the lifecycle loops back to earlier stages. Retirement or disposal ends it: data is migrated or archived according to retention rules, media is sanitized, accounts, certificates and firewall rules are removed, licenses are closed, and the system leaves the asset inventory and monitoring scope.",
   "Consider a worked example. A city plans a new online permit system. In the needs phase, residents want fast applications, clerks want easy review, and the legal team notes records must be kept for seven years. Requirements analysis turns these into items such as encryption of uploaded documents, role-based access for clerks and a seven-year archive. The architects threat-model the upload feature and isolate file processing. Testers verify each requirement, then a pilot with real clerks validates that the workflow fits their day. The city manager signs the authorization to operate. Years later, retirement follows a plan that archives records, wipes storage and closes external connections.",
   "Common mistakes: bringing security in only at deployment, when fixes are expensive and schedules are fixed; writing vague requirements such as 'the system shall be secure' that cannot be verified; confusing verification with validation; skipping formal authorization; and treating retirement as switching off a server. Forgotten systems left running after 'retirement' become unpatched entry points, and disks sold without sanitization leak data. Another mistake is assuming the lifecycle is strictly linear; changes in operations routinely loop back to requirements and design.",
   "Exam questions often ask when security should be involved; the answer is at the beginning, during needs and requirements, and throughout. 'Meets the specification' points to verification, while 'meets the user's real need' points to validation. 'Senior official accepts residual risk before go-live' is authorization. 'Data archived and media sanitized' signals retirement. Think like a manager: the cost of fixing a flaw rises sharply in later phases, so the risk-based answer front-loads security work and keeps it going through operations."
  ],
  "terms": [
   [
    "Stakeholder requirements",
    "The needs of everyone with an interest in a system, including security and privacy needs, captured before design."
   ],
   [
    "Requirements analysis",
    "Refining stakeholder needs into specific, testable system requirements."
   ],
   [
    "Verification",
    "Confirming the system was built correctly according to its specified requirements."
   ],
   [
    "Validation",
    "Confirming the system meets stakeholders' actual needs in its intended environment."
   ],
   [
    "Authorization to operate",
    "A formal management decision to accept residual risk and allow a system into production."
   ],
   [
    "Operations and maintenance",
    "The typically longest lifecycle phase, covering patching, monitoring, change control and reassessment."
   ],
   [
    "Retirement",
    "The planned end of a system's life, including data archiving, media sanitization and removal of access."
   ]
  ],
  "example": "A retailer rushes a mobile app to launch without security requirements. After release, testers find that customer tokens never expire and that the app stores card numbers locally. Fixing these requires redesigning the authentication service and re-releasing the app, at many times the cost of addressing them in requirements. The retailer then adds security requirements and threat modeling to its project templates for every new system.",
  "tip": "Security belongs in the first phase, requirements, not at deployment. Verification is 'built it right' against the specification; validation is 'built the right thing' for the stakeholders.",
  "check": [
   [
    "When should security requirements be defined in the lifecycle?",
    "At the beginning, during stakeholder needs and requirements analysis, because early fixes are far cheaper."
   ],
   [
    "A test confirms a system meets every written requirement, but users find it unusable for their job. Which activity was missing?",
    "Validation, which checks that the system meets real stakeholder needs in its operating environment."
   ],
   [
    "What happens during retirement from a security perspective?",
    "Data is archived or migrated per retention rules, media is sanitized, and accounts, connections and monitoring entries are removed."
   ],
   [
    "Who accepts residual risk before a system goes live?",
    "A senior management official, through a formal authorization to operate."
   ]
  ]
 },
 {
  "t": "OSI and TCP/IP models and where controls apply",
  "body": [
   "Network models give you a shared map for describing where a problem or a control sits. The CISSP exam uses the seven-layer Open Systems Interconnection (OSI) model heavily, and you should also know how it lines up with the four-layer TCP/IP model that real networks implement. Knowing the layer tells you what a device can see and therefore what it can and cannot stop.",
   "The OSI layers from bottom to top are: 1 Physical (bits on the medium: cables, radio, voltage, connectors, hubs); 2 Data Link (frames and Media Access Control (MAC) addresses on the local network: switches, bridges, Address Resolution Protocol (ARP) and VLAN tagging); 3 Network (packets, logical addressing and routing: Internet Protocol (IP), Internet Control Message Protocol (ICMP), routers); 4 Transport (end-to-end delivery with ports: Transmission Control Protocol (TCP) and User Datagram Protocol (UDP)); 5 Session (establishing, managing and ending sessions between applications); 6 Presentation (data formatting, character encoding, compression and, conceptually, encryption); and 7 Application (services applications rely on, such as HTTP, DNS, SMTP and FTP). A mnemonic from the top is 'All People Seem To Need Data Processing'.",
   "The TCP/IP model compresses this into four layers: Link or Network Access (OSI 1 and 2), Internet (OSI 3), Transport (OSI 4) and Application (OSI 5 to 7). Encapsulation is the process in which each layer adds its own header as data moves down the stack, turning data into segments, packets, frames and finally bits; the receiver strips headers in reverse. TCP is connection-oriented, using a three-way handshake (SYN, SYN-ACK, ACK), sequence numbers and acknowledgments for reliable, ordered delivery. UDP is connectionless and lightweight, used where speed matters more than guaranteed delivery, such as DNS queries, voice and streaming.",
   "Controls map to layers. At layer 1: physical protection of cabling, shielding and wireless signal management. At layer 2: port security, IEEE 802.1X port-based network access control, VLANs, dynamic ARP inspection and MACsec encryption. At layer 3: router access control lists (ACLs), packet-filtering firewalls, anti-spoofing filters and IPsec. At layer 4: stateful firewalls that track connections, and port filtering. Transport Layer Security (TLS) is usually described as sitting between layers 4 and 7. At layers 5 to 7: application proxies, web application firewalls (WAFs), secure email gateways and application authentication.",
   "Attacks map the same way. Wiretapping and jamming hit layer 1. MAC flooding, ARP spoofing and VLAN hopping hit layer 2. IP spoofing and ICMP floods hit layer 3. SYN floods and port scans hit layer 4. Session hijacking is associated with layer 5, and injection, cross-site scripting, phishing and malicious content live at layer 7. Knowing this lets you describe precisely what a control cannot see. A single product may span several layers: a next-generation firewall inspects addresses and ports at layers 3 and 4 and identifies applications at layer 7.",
   "Consider a worked example. Your web store suffers two problems in one week. First, an internal user's laptop starts receiving traffic meant for the gateway, and captures show forged ARP replies: a layer 2 attack, so you enable dynamic ARP inspection and port security on the access switches. Second, attackers send crafted form input attempting SQL injection. The perimeter packet filter passes it because it only checks that traffic is TCP port 443, so you place a layer 7 WAF in front of the application and fix the code with parameterized queries.",
   "Common mistakes: calling a switch a layer 3 device (a basic switch is layer 2, though multilayer switches also route); assuming a packet filter can see application content; placing encryption only at layer 6 when real protocols such as TLS and IPsec live elsewhere; and forgetting that UDP has no handshake, which is why spoofed UDP is used in reflection attacks. Also remember that 'segment', 'packet' and 'frame' are layer-specific words the exam uses deliberately.",
   "Exam questions often name a device, protocol or attack and ask for its layer, or describe a threat and ask which control can see it. Clue words: 'MAC address' or 'ARP' means layer 2, 'routing' or 'IP address' means layer 3, 'port number' or 'three-way handshake' means layer 4, 'HTTP request content' means layer 7. When asked for the best control, pick the one operating at the layer where the attack lives, and prefer layered defenses over any single device."
  ],
  "terms": [
   [
    "OSI model",
    "A seven-layer reference model describing network communication from physical transmission to application services."
   ],
   [
    "Encapsulation",
    "Each layer adding its own header to data as it moves down the stack, removed in reverse at the receiver."
   ],
   [
    "Three-way handshake",
    "The SYN, SYN-ACK, ACK exchange TCP uses to establish a connection."
   ],
   [
    "Frame",
    "The layer 2 unit of data, addressed with MAC addresses."
   ],
   [
    "Packet",
    "The layer 3 unit of data, addressed with IP addresses."
   ],
   [
    "Stateful inspection",
    "Firewall filtering that tracks connection state, a primarily layer 4 capability."
   ],
   [
    "Web application firewall (WAF)",
    "A layer 7 control that inspects HTTP traffic for attacks such as injection."
   ]
  ],
  "example": "A manufacturer separates its production floor from the office network with VLANs and a firewall. An engineer later plugs an unmanaged hub into a floor switch port and connects a personal laptop. Because 802.1X is enforced at layer 2, the switch port refuses the unknown device until it authenticates, and the attempt is logged for the security team.",
  "tip": "Switches and ARP are layer 2, routers and IP are layer 3, TCP/UDP ports are layer 4, WAFs and proxies are layer 7. A layer 3 packet filter cannot see an injection attack inside HTTP.",
  "check": [
   [
    "At which OSI layer do ARP spoofing and MAC flooding occur?",
    "Layer 2, the Data Link layer, which uses MAC addresses and frames."
   ],
   [
    "Which TCP/IP layer corresponds to OSI layers 5 through 7?",
    "The Application layer."
   ],
   [
    "Why can't a packet-filtering firewall stop SQL injection?",
    "It inspects only layer 3 and 4 information such as addresses and ports, not the application content where the injection sits."
   ],
   [
    "Is a SYN flood a layer 3 or layer 4 attack?",
    "Layer 4, because it abuses the TCP handshake by leaving many connections half open."
   ]
  ]
 },
 {
  "t": "IPv4/IPv6, secure protocols (TLS, IPsec, SSH, SNMPv3) and their uses",
  "body": [
   "Internet Protocol (IP) addressing and the secure protocols that run over it are the plumbing behind most network design questions. You need to know how IPv4 and IPv6 differ in security-relevant ways, and which secure protocol fits which job. The exam rarely asks you to calculate subnets; it asks you to choose the right protection for a described situation and to spot an insecure legacy protocol.",
   "IPv4 uses 32-bit addresses written as four decimal numbers, such as 192.168.1.10. Address shortage led to private ranges (10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16) and network address translation (NAT), which lets many internal hosts share public addresses. NAT hides internal addressing, but it is not a security control by itself; a firewall policy is. IPv6 uses 128-bit addresses written in hexadecimal, such as 2001:db8::1, which removes the shortage. It uses Neighbor Discovery Protocol instead of ARP, supports stateless address autoconfiguration (SLAAC) and was designed with IPsec support, although using IPsec is not automatic. Security concerns include hosts with IPv6 enabled by default but unmonitored, tunneling mechanisms that carry IPv6 inside IPv4 past filters, rogue router advertisements, and firewalls configured only for IPv4. The rule is to secure and monitor IPv6 as carefully as IPv4, or disable it where it is not used.",
   "Transport Layer Security (TLS) protects application traffic such as HTTPS, secure email and application programming interfaces (APIs). The handshake authenticates the server, and optionally the client, with certificates, agrees on a cipher suite and establishes symmetric session keys, ideally with forward secrecy so that past sessions remain safe even if a long-term private key is later stolen. TLS 1.2 and 1.3 are current; Secure Sockets Layer (SSL) and early TLS versions are deprecated. TLS 1.3 removed many weak options and shortened the handshake.",
   "IPsec protects traffic at the network layer and is widely used for virtual private networks (VPNs). The Authentication Header (AH) provides integrity and origin authentication but no encryption. Encapsulating Security Payload (ESP) provides confidentiality plus integrity and is what most deployments use. Internet Key Exchange (IKE) negotiates security associations (SAs), which are one-way agreements on keys and algorithms, so a two-way conversation needs a pair. Transport mode protects only the payload and is typically host to host; tunnel mode wraps the entire original packet inside a new one and is used gateway to gateway for site-to-site VPNs.",
   "Secure Shell (SSH) replaces Telnet, rlogin and other cleartext remote administration tools, and also provides secure file transfer (SFTP and SCP) and port forwarding. Use key-based authentication, protect private keys and verify host keys on first connection to prevent on-path attacks. Simple Network Management Protocol (SNMP) monitors and manages network devices. Versions 1 and 2c authenticate with a community string sent in cleartext, effectively a shared password anyone sniffing can read. SNMPv3 adds user-based authentication, integrity and encryption. Default community strings such as 'public' and 'private' must be changed or disabled. Other secure replacements you should know are HTTPS for HTTP, SFTP or FTPS for FTP, LDAPS for directory queries, DNSSEC for DNS integrity, S/MIME for signed and encrypted email, and SRTP for voice media.",
   "Consider a worked example. A retailer connects fifty stores to headquarters. You recommend IPsec tunnel mode with ESP between each store router and the headquarters VPN gateway, so every packet between sites is encrypted and authenticated. Store point-of-sale terminals call a payment API over TLS 1.2 or 1.3 with certificate validation. Network engineers manage routers with SSH using keys, and the monitoring platform polls devices with SNMPv3 in authPriv mode. Finally, you discover that store firewalls filter IPv4 but pass IPv6 freely, so you add equivalent IPv6 rules.",
   "Common mistakes: choosing AH when confidentiality is required (AH never encrypts); believing NAT is a firewall; assuming SNMPv2c is secure because it is newer than v1; thinking IPv6 is automatically encrypted; and forgetting that SSH host key warnings may indicate an on-path attack rather than a nuisance. Another trap is equating TLS with 'the padlock' and ignoring certificate validation in machine-to-machine connections, where applications sometimes silently accept any certificate.",
   "Exam clue words lead to answers. 'Integrity without confidentiality' at the network layer is AH. 'Site-to-site VPN' is IPsec tunnel mode. 'Community string in cleartext' is SNMPv1 or v2c, fixed by SNMPv3. 'Replace Telnet' is SSH. 'Protect past sessions if the server key is stolen' is forward secrecy. From a manager's view, the best answer usually replaces a cleartext protocol with its secure equivalent across the board rather than adding a compensating control around it."
  ],
  "terms": [
   [
    "NAT",
    "Network address translation, mapping private internal addresses to public ones; it hides addressing but is not a firewall."
   ],
   [
    "SLAAC",
    "Stateless address autoconfiguration, the IPv6 method by which hosts assign their own addresses from router advertisements."
   ],
   [
    "Forward secrecy",
    "A property of key exchange ensuring that compromise of a long-term key does not expose past session keys."
   ],
   [
    "Authentication Header (AH)",
    "The IPsec protocol that provides integrity and origin authentication without encryption."
   ],
   [
    "Encapsulating Security Payload (ESP)",
    "The IPsec protocol that provides confidentiality as well as integrity and authentication."
   ],
   [
    "Security association (SA)",
    "A one-way IPsec agreement on keys and algorithms, negotiated by IKE."
   ],
   [
    "SNMPv3",
    "The version of SNMP that adds authentication, integrity and encryption."
   ]
  ],
  "example": "An auditor at a hospital captures network traffic and finds the SNMP community string for every switch in cleartext, along with Telnet sessions from the network team. The hospital migrates device management to SSH with individual accounts backed by central authentication, reconfigures monitoring to SNMPv3 with authentication and privacy, and blocks Telnet and SNMPv1/v2c at the management VLAN boundary.",
  "tip": "AH gives integrity but no confidentiality; ESP gives both. Tunnel mode is gateway-to-gateway, transport mode is host-to-host. SNMPv1 and v2c send community strings in cleartext; only SNMPv3 is secure.",
  "check": [
   [
    "Which IPsec protocol should you choose when you need confidentiality?",
    "ESP, because AH provides integrity and authentication but no encryption."
   ],
   [
    "Which IPsec mode is typically used for a site-to-site VPN between two gateways?",
    "Tunnel mode, which encapsulates and protects the entire original packet."
   ],
   [
    "Why is NAT not considered a security control on its own?",
    "It translates addresses and incidentally hides internal ones, but it does not enforce an access policy the way a firewall does."
   ],
   [
    "What IPv6 risk often appears in networks that believe they only run IPv4?",
    "Hosts with IPv6 enabled by default, or IPv6 tunneled over IPv4, bypassing IPv4-only filters and monitoring."
   ]
  ]
 },
 {
  "t": "Converged protocols: iSCSI, VoIP, InfiniBand, Fibre Channel over Ethernet",
  "body": [
   "Converged protocols carry specialized traffic, such as storage or voice, over standard IP or Ethernet networks instead of on separate dedicated infrastructure. Convergence saves money, reduces cabling and simplifies management. The security cost is that traffic which used to be physically isolated now shares the data network, where it can be intercepted, spoofed or disrupted by problems elsewhere. The CISSP outline names several examples, and the common thread is how you restore the isolation and trust you lost.",
   "Internet Small Computer Systems Interface (iSCSI) carries SCSI storage commands over TCP/IP, letting servers use remote disks in a storage area network (SAN) as though they were local. Because it rides on IP, storage traffic can be sniffed or spoofed if it shares a general network. Mitigations include placing iSCSI on a dedicated, isolated VLAN or physical network, authenticating initiators (servers) to targets (storage arrays) with the Challenge-Handshake Authentication Protocol (CHAP), encrypting with IPsec where needed, and using logical unit number (LUN) masking so each server sees only its own volumes.",
   "Fibre Channel is a high-speed storage networking technology that traditionally runs on its own dedicated fabric. Fibre Channel over Ethernet (FCoE) encapsulates Fibre Channel frames directly inside Ethernet frames, so it operates at layer 2 and cannot be routed across IP networks; it also needs lossless Ethernet enhancements. Fibre Channel over IP (FCIP) is different: it tunnels Fibre Channel over IP to link distant SANs. Security for all of these relies on zoning (controlling which devices can talk to each other on the fabric), LUN masking and network isolation.",
   "InfiniBand is a high-bandwidth, low-latency interconnect used in high-performance computing clusters and some storage systems. It supports remote direct memory access (RDMA), which lets one system read or write another's memory without involving the remote processor. That speed raises security questions, because misconfigured RDMA access could expose memory contents. InfiniBand uses partitioning, similar in spirit to VLANs, and a trusted subnet manager; it is normally confined to data center fabrics rather than exposed widely.",
   "Voice over IP (VoIP) carries telephone calls over IP networks. Signaling commonly uses the Session Initiation Protocol (SIP), and the audio itself uses the Real-time Transport Protocol (RTP). Threats include eavesdropping on unencrypted calls, caller ID spoofing, toll fraud through compromised private branch exchange (PBX) systems, denial of service that disrupts calls, and vishing (voice phishing). Mitigations include separate voice VLANs, SIP over TLS, Secure RTP (SRTP) for media, strong credentials on phones and PBX administration, and quality of service to protect call quality. Remember availability too: phones powered over Ethernet need switch power backed by an uninterruptible power supply, and emergency calling must keep working. Other converged examples include Multiprotocol Label Switching (MPLS), which carriers use to forward traffic by labels and build private WAN services, and industrial protocols such as Modbus and DNP3 carried over IP, which often lack authentication entirely.",
   "Consider a worked example. A growing law firm replaces its separate phone system and storage array with converged equipment. Your design places VoIP phones on a voice VLAN with SIP over TLS and SRTP, and places iSCSI storage on its own non-routed VLAN reachable only by the virtualization hosts, with CHAP authentication and LUN masking. The switches that power the phones connect to a UPS. When a user's laptop is infected later, it cannot see storage traffic or reach the PBX management interface.",
   "Common mistakes: assuming FCoE can be routed like iSCSI (it is layer 2 only; FCIP is the IP-based option); letting storage traffic share the user VLAN for convenience; relying on the fact that VoIP 'sounds like a phone call' and leaving it unencrypted; and ignoring the availability dependency that converged voice has on the data network and its power. Another error is assuming industrial protocols were designed with security; many trust any device that can reach them.",
   "Exam questions usually ask for the best way to secure converged traffic, and the pattern is isolation plus authentication plus encryption where the protocol allows. Clue words: 'storage commands over TCP/IP' is iSCSI, 'Fibre Channel frames directly in Ethernet' is FCoE, 'memory access without the remote CPU' is RDMA over InfiniBand, 'signaling and media' is SIP and RTP. A manager should also weigh the savings of convergence against the new single points of failure it introduces."
  ],
  "terms": [
   [
    "Converged protocol",
    "A protocol that carries specialized traffic such as storage or voice over standard IP or Ethernet networks."
   ],
   [
    "iSCSI",
    "A protocol that transports SCSI storage commands over TCP/IP networks."
   ],
   [
    "FCoE",
    "Fibre Channel over Ethernet, which carries Fibre Channel frames directly in Ethernet at layer 2 and is not IP-routable."
   ],
   [
    "LUN masking",
    "Storage-side access control that limits which hosts can see which logical storage units."
   ],
   [
    "Zoning",
    "Fabric-level control of which storage devices and hosts can communicate."
   ],
   [
    "RDMA",
    "Remote direct memory access, letting one system access another's memory without involving its processor."
   ],
   [
    "SRTP",
    "Secure Real-time Transport Protocol, which encrypts and authenticates voice and video media streams."
   ]
  ],
  "example": "A call center finds unexplained international calls on its bill every weekend. Investigation shows attackers reached the PBX administration interface, which still used a default password and was reachable from the internet, and routed calls through it. The company moves the PBX behind the firewall, changes credentials, restricts international dialing by policy and sets alerts on unusual call volumes.",
  "tip": "The standard answer for converged traffic is isolation (dedicated VLANs or networks) plus authentication and encryption. FCoE runs at layer 2 and cannot be routed; FCIP and iSCSI run over IP.",
  "check": [
   [
    "How should iSCSI traffic be protected on a shared network?",
    "Isolate it on a dedicated VLAN or network, authenticate initiators and targets with CHAP, use LUN masking and encrypt with IPsec where needed."
   ],
   [
    "Why can FCoE not be routed across an IP WAN?",
    "It encapsulates Fibre Channel directly in Ethernet frames at layer 2 and has no IP header."
   ],
   [
    "Which protocols protect VoIP signaling and media?",
    "SIP over TLS protects signaling and SRTP protects the media stream."
   ],
   [
    "What is toll fraud?",
    "Misuse of an organization's phone system, often a compromised PBX, to place calls at the organization's expense."
   ]
  ]
 },
 {
  "t": "Micro-segmentation, SDN, VXLAN, VPC and software-defined perimeters",
  "body": [
   "Modern networks are increasingly defined in software rather than by physical cabling and hardware boxes. That shift lets security teams apply policy more precisely, more consistently and faster, which is central to zero trust, the idea that no traffic is trusted simply because of where it comes from. Because policy lives in software, it can follow a workload when it moves between hosts or clouds, and it can be version-controlled, reviewed and audited like code. The exam expects you to know what each of these technologies does and how it helps limit an attacker's movement.",
   "Traditional segmentation divides a network into zones with VLANs and firewalls, such as separating user workstations from servers. Micro-segmentation goes much further, applying policy down to individual workloads or applications. Each server, virtual machine or container gets its own allowed flows, so a compromised web server cannot freely reach every other system in the same data center. Micro-segmentation is usually enforced by host-based firewalls, hypervisor-level distributed firewalls or cloud security groups, and it is a key defense against lateral movement.",
   "Software-defined networking (SDN) separates the control plane, which decides where traffic should go, from the data plane, which actually forwards it. A centralized SDN controller programs network devices through southbound interfaces, while orchestration tools and applications talk to the controller through northbound application programming interfaces (APIs). Benefits include consistent central policy and rapid automated change. The main risk is that the controller becomes a high-value target and a potential single point of failure, so it must be hardened, strongly authenticated, highly available and closely monitored, and its APIs protected. Software-defined WAN (SD-WAN) applies similar ideas to connecting branches over multiple links, choosing paths by policy.",
   "Virtual Extensible LAN (VXLAN) is an overlay protocol that encapsulates layer 2 Ethernet frames inside UDP packets, so virtual layer 2 networks can stretch across a routed layer 3 infrastructure. Its 24-bit segment identifier allows roughly 16 million segments, compared with about 4,000 traditional VLANs, which suits large multi-tenant data centers. VXLAN itself provides neither encryption nor strong authentication, so traffic may need IPsec or MACsec protection, and the tunnel endpoints must be controlled to prevent injection into an overlay.",
   "A virtual private cloud (VPC) is a logically isolated section of a public cloud in which a customer defines its own IP ranges, subnets, route tables, gateways and security controls. Security groups are typically stateful and attached to instances; network access control lists are typically stateless and attached to subnets. Private subnets without internet gateways, private endpoints to cloud services and flow logs are common good practices. A software-defined perimeter (SDP) hides applications from unauthorized users entirely: users and devices authenticate to a controller first, and only then is a connection brokered to the specific application they may use. Until that point the application is effectively invisible. SDP underpins zero trust network access (ZTNA) and increasingly replaces broad-access VPNs.",
   "Consider a worked example. An online retailer runs web, application and database tiers in a VPC. Originally all instances sat in one subnet with a permissive security group. You redesign it with public subnets only for load balancers, private subnets for application and database servers, security groups that allow the web tier to reach the application tier on one port and the application tier to reach the database on one port, and flow logs sent to the monitoring platform. Administrators reach servers through an SDP broker after MFA instead of a VPN that exposed the whole network.",
   "Common mistakes: thinking VLANs alone equal micro-segmentation; assuming VXLAN encrypts traffic; leaving the SDN controller on a flat management network with default credentials; and confusing stateful security groups with stateless network ACLs, which need explicit rules for return traffic. Another trap is treating infrastructure-as-code templates as trustworthy without review, since one bad template can replicate an open rule everywhere. Also avoid believing a VPC is private by default in every respect; misconfigured route tables and overly open security groups are among the most common cloud exposures.",
   "Exam questions often describe a goal and ask which technology fits. 'Limit lateral movement between individual workloads' points to micro-segmentation. 'Separate control plane from data plane' is SDN. 'Extend layer 2 across layer 3 with millions of segments' is VXLAN. 'Application invisible until the user authenticates' is SDP or ZTNA. Think like a manager: in SDN, protecting the controller and its APIs is the priority, because compromising it compromises the whole network."
  ],
  "terms": [
   [
    "Micro-segmentation",
    "Applying security policy to individual workloads so each can talk only to explicitly permitted peers."
   ],
   [
    "Control plane",
    "The part of networking that decides where traffic should go."
   ],
   [
    "Data plane",
    "The part of networking that forwards traffic according to control plane decisions."
   ],
   [
    "SDN controller",
    "The centralized component that programs network devices in a software-defined network."
   ],
   [
    "VXLAN",
    "An overlay that carries layer 2 frames inside UDP across layer 3 networks with a 24-bit segment ID."
   ],
   [
    "Virtual private cloud (VPC)",
    "A logically isolated customer network within a public cloud."
   ],
   [
    "Software-defined perimeter (SDP)",
    "An architecture that keeps applications hidden until a user and device authenticate and are authorized."
   ]
  ],
  "example": "After ransomware spreads from one compromised file server to dozens of other servers in the same data center, a manufacturer deploys a distributed firewall at the hypervisor layer. Each workload now has rules allowing only the flows it needs. In a later incident, a compromised test server tries to reach production databases and the attempts are blocked and alerted, containing the damage to one machine.",
  "tip": "Micro-segmentation and SDP both support zero trust by limiting lateral movement and hiding resources. In SDN, the controller is the crown jewel: protect it and its APIs.",
  "check": [
   [
    "What does SDN separate, and why does that matter for security?",
    "It separates the control plane from the data plane, centralizing policy in a controller that then becomes a critical asset to protect."
   ],
   [
    "Does VXLAN encrypt the traffic it carries?",
    "No. It provides segmentation and encapsulation only, so encryption such as IPsec or MACsec must be added if needed."
   ],
   [
    "Which technology best limits lateral movement between servers in the same subnet?",
    "Micro-segmentation, enforced with host, hypervisor or cloud security group rules per workload."
   ],
   [
    "How does an SDP differ from a traditional VPN?",
    "An SDP grants access to specific authorized applications after authentication and keeps others invisible, whereas a VPN usually places the user on the network with broad reach."
   ]
  ]
 },
 {
  "t": "Wireless networks: Wi-Fi security (WPA3), Bluetooth, Zigbee, cellular/5G",
  "body": [
   "Wireless networks broadcast into the air, so anyone within range can listen or try to connect. That makes authentication and encryption essential and makes walls a weak boundary. The CISSP outline covers Wi-Fi, Bluetooth, Zigbee and cellular networks. Each has different range, uses and risks, but the defensive questions are the same: who can connect, is the traffic protected, and how would you notice an impostor. Because radio ignores property lines, assume an attacker can always receive your signal and design so that receiving it gains them nothing useful.",
   "Wi-Fi is based on the IEEE 802.11 standards, and its security evolved through generations. Wired Equivalent Privacy (WEP) is broken and must not be used. Wi-Fi Protected Access (WPA) with the Temporal Key Integrity Protocol (TKIP) was an interim fix and is also deprecated. WPA2 uses the Advanced Encryption Standard (AES) in CCMP mode and is still widely deployed. WPA3 is current. WPA3-Personal replaces the pre-shared key handshake with Simultaneous Authentication of Equals (SAE), which resists offline dictionary attacks against captured handshakes and provides forward secrecy. WPA3-Enterprise offers an optional higher-strength 192-bit security mode for sensitive environments, and WPA3 requires protected management frames. Enhanced Open, based on Opportunistic Wireless Encryption, encrypts open networks without a password but does not authenticate the network.",
   "Personal mode uses one shared passphrase, which is hard to revoke when someone leaves and gives no individual accountability. Enterprise mode uses IEEE 802.1X with a Remote Authentication Dial-In User Service (RADIUS) server and an Extensible Authentication Protocol (EAP) method, giving each user or device individual credentials. EAP-TLS, which uses certificates on both client and server, is the strongest common choice. PEAP and EAP-TTLS protect password-based logins inside a TLS tunnel, but only if clients are configured to validate the server certificate; otherwise an evil twin can harvest credentials.",
   "Common Wi-Fi threats include rogue access points (unauthorized APs plugged into the network), evil twins (attacker APs impersonating a legitimate network), deauthentication attacks that disconnect clients, jamming and war driving. Defenses include WPA3 or WPA2-Enterprise, wireless intrusion prevention systems, site surveys, sensible antenna placement and power levels, protected management frames and user training. Hiding the SSID and filtering by MAC address are weak controls because both are easily observed and spoofed. Bluetooth, a short-range personal area network, faces bluejacking (unsolicited messages), bluesnarfing (unauthorized data theft) and bluebugging (taking control of a device); keep devices non-discoverable when not pairing, use secure pairing modes, patch firmware and disable Bluetooth when not needed. Zigbee, a low-power mesh protocol for Internet of Things (IoT) and building automation based on IEEE 802.15.4, uses AES-based encryption, but its security depends on key management, and default or poorly distributed network keys undermine it.",
   "Cellular networks, including 4G Long-Term Evolution (LTE) and 5G, provide wide-area connectivity. 5G improves privacy by encrypting the permanent subscriber identifier, which hinders tracking by fake base stations, and supports network slicing, in which separate logical networks share infrastructure. Risks include rogue base stations, often called IMSI catchers, SIM swapping and dependence on the carrier's security. Organizations using cellular for IoT or private 5G should apply the same segmentation, authentication and monitoring as on any other network.",
   "Consider a worked example. A university still runs a single WPA2-Personal network whose passphrase has been shared with thousands of students over years. You recommend WPA3-Enterprise (or WPA2/WPA3 transition mode during migration) with 802.1X and EAP-TLS for managed devices, and PEAP with enforced server certificate validation through onboarding profiles for personal devices. A separate guest network uses Enhanced Open with client isolation. Wireless intrusion prevention sensors alert on rogue and look-alike access points.",
   "Common mistakes: treating SSID hiding or MAC filtering as real security; assuming WPA2-Personal with a strong passphrase gives per-user accountability; forgetting that PEAP without certificate validation is vulnerable to evil twins; confusing bluesnarfing (data theft) with bluejacking (messages); and assuming Zigbee is safe because it uses AES while ignoring default keys.",
   "Exam wording is fairly direct. 'Resist offline dictionary attacks on the handshake' is SAE in WPA3. 'Each user has individual credentials' means Enterprise mode with 802.1X. 'Strongest EAP method' is EAP-TLS. 'Attacker AP with the same name' is an evil twin; 'unauthorized AP plugged into the wired network' is a rogue AP. From a manager's perspective, the right answer removes shared secrets and ties access to individual, revocable identities."
  ],
  "terms": [
   [
    "WPA3",
    "The current Wi-Fi security generation, using SAE for personal networks and requiring protected management frames."
   ],
   [
    "SAE",
    "Simultaneous Authentication of Equals, a handshake that resists offline dictionary attacks and provides forward secrecy."
   ],
   [
    "802.1X",
    "Port-based network access control that authenticates users or devices, typically with RADIUS and EAP."
   ],
   [
    "EAP-TLS",
    "An EAP method using certificates on both client and server, the strongest common enterprise Wi-Fi option."
   ],
   [
    "Evil twin",
    "A malicious access point that impersonates a legitimate network to capture traffic or credentials."
   ],
   [
    "Rogue access point",
    "An unauthorized access point connected to an organization's network."
   ],
   [
    "Bluesnarfing",
    "Unauthorized access to data on a Bluetooth device."
   ]
  ],
  "example": "A hotel chain's guests report being prompted to re-enter their corporate credentials on a network with the hotel's name. A wireless survey finds a stronger look-alike access point broadcasting from a vehicle in the car park. Guests whose devices validated the enterprise certificate were protected; others were not. The chain adds wireless intrusion detection and publishes guidance, while corporate customers push profiles that enforce certificate validation.",
  "tip": "For the strongest enterprise Wi-Fi, choose WPA3-Enterprise (or WPA2-Enterprise) with 802.1X and EAP-TLS. SSID hiding and MAC filtering are not real security controls.",
  "check": [
   [
    "What does SAE in WPA3-Personal protect against?",
    "Offline dictionary attacks against a captured handshake, and it adds forward secrecy."
   ],
   [
    "Why is Enterprise mode preferred over Personal mode for staff Wi-Fi?",
    "It gives each user individual, revocable credentials through 802.1X, rather than one shared passphrase."
   ],
   [
    "What configuration prevents PEAP users from falling for an evil twin?",
    "Clients must validate the authentication server's certificate before sending credentials."
   ],
   [
    "Is MAC address filtering an effective wireless control?",
    "No. MAC addresses are visible in traffic and easy to spoof, so it only deters casual users."
   ]
  ]
 },
 {
  "t": "Content distribution networks and traffic flows (north-south, east-west)",
  "body": [
   "Where traffic comes from and where it goes shapes where you place controls. This topic pairs two ideas. Content distribution networks move content closer to users, changing both performance and your attack surface. Traffic flow directions, north-south and east-west, describe how data moves into, out of and within data centers and clouds, and they explain why perimeter defenses alone are no longer enough.",
   "A content distribution network (CDN), also called a content delivery network, is a geographically distributed set of servers, called edge servers or points of presence, that cache and serve content near users. Instead of every request traveling to the origin server, users reach a nearby edge, which reduces latency and load on the origin. CDNs serve static files such as images and scripts, streaming media and increasingly dynamic content and APIs.",
   "CDNs bring real security benefits. Their large, distributed capacity absorbs volumetric distributed denial-of-service (DDoS) attacks that would overwhelm a single site. Many include web application firewalls, bot management, rate limiting and TLS termination at the edge. Hiding the origin server's real address behind the CDN reduces direct attacks, provided the origin accepts traffic only from the CDN. They also bring risks. Because TLS is often terminated at the edge, the provider can see plaintext traffic, which is a trust and compliance question; edge-to-origin traffic should be encrypted too. Caching misconfiguration can expose private content or allow cache poisoning. Third-party scripts loaded from a CDN can be tampered with, which subresource integrity checks help detect. And the CDN becomes a supply chain dependency whose outage becomes your outage, so contracts, logging access and knowledge of where data is cached matter for privacy and data location rules.",
   "Traffic flow directions describe data center and cloud traffic. North-south traffic moves between the environment and the outside world: users on the internet reaching a web server, or servers calling external services. Traditional perimeter defenses, such as edge firewalls, intrusion prevention, DDoS protection and web gateways, focus on north-south traffic. East-west traffic moves laterally between systems inside the environment: a web server querying an application server, an application server reading a database, or containers calling each other.",
   "Cloud and hybrid designs blur these lines, since a call from one cloud service to another may cross the internet, but the question to ask stays the same: which controls see this flow? Modern applications generate far more east-west than north-south traffic, and attackers who breach the perimeter move east-west to reach valuable targets. Perimeter controls never see that movement. Securing east-west flows requires internal segmentation and micro-segmentation, distributed or host-based firewalls, internal encryption such as mutual TLS between services, and network detection that monitors internal flows. This shift is a major driver of zero trust architecture, which treats internal traffic with the same suspicion as external traffic.",
   "Consider a worked example. A news site suffers slowdowns during major stories and a DDoS attack during an election. You place the site behind a CDN with WAF and rate limiting, lock the origin firewall to accept only CDN address ranges, and require TLS from edge to origin. Months later, an attacker exploits a plugin on one web server and tries to reach the subscriber database. The CDN is irrelevant to that step, because it is east-west movement; the micro-segmentation rule that allows only the application tier to talk to the database blocks the attempt, and flow monitoring raises an alert.",
   "Common mistakes: assuming the CDN protects the origin if the origin still accepts traffic from anywhere; forgetting that TLS termination at the edge lets the provider see data; caching personalized pages publicly; and believing a strong perimeter firewall stops lateral movement. Another mistake is monitoring only internet egress and never looking at internal flows, which is exactly where an intruder spends most of their time. Finally, teams sometimes forget to review the CDN provider's own security posture and incident history as part of supplier risk management.",
   "Exam questions use direction words as clues. 'Traffic entering or leaving the data center' is north-south, handled by perimeter controls. 'Lateral movement between servers' is east-west, handled by segmentation, micro-segmentation and internal monitoring. 'Absorb a volumetric DDoS and reduce latency' points to a CDN. 'Provider can see decrypted content' is the CDN trust trade-off. Think like a manager: a CDN transfers some risk but adds a third-party dependency, so it needs contractual and monitoring controls too."
  ],
  "terms": [
   [
    "Content distribution network (CDN)",
    "A distributed set of edge servers that cache and serve content close to users."
   ],
   [
    "Edge server",
    "A CDN server near users that serves cached content and often applies security controls."
   ],
   [
    "Origin server",
    "The authoritative server that holds the original content a CDN caches."
   ],
   [
    "North-south traffic",
    "Traffic flowing between a data center or cloud environment and the outside world."
   ],
   [
    "East-west traffic",
    "Traffic flowing laterally between systems inside a data center or cloud environment."
   ],
   [
    "Cache poisoning",
    "Causing a cache to store and serve malicious or incorrect content."
   ],
   [
    "Mutual TLS",
    "TLS in which both client and server present certificates, often used to authenticate service-to-service traffic."
   ]
  ],
  "example": "An online game company uses a CDN for downloads and web pages. Attackers discover the origin server's real IP address in old DNS records and flood it directly, bypassing the CDN. The company moves the origin to a new address, restricts it to accept connections only from the CDN's published ranges with an authenticated header, and removes historical records that revealed it.",
  "tip": "Perimeter firewalls mainly handle north-south traffic. When a question asks how to stop lateral movement, choose east-west controls such as micro-segmentation and internal monitoring.",
  "check": [
   [
    "What is the main availability benefit of a CDN?",
    "Its distributed capacity absorbs volumetric DDoS attacks and reduces load and latency at the origin."
   ],
   [
    "What privacy concern arises when a CDN terminates TLS at the edge?",
    "The CDN provider can see decrypted traffic, so trust, contracts and edge-to-origin encryption must be addressed."
   ],
   [
    "Is a database query from an application server north-south or east-west traffic?",
    "East-west, because it stays inside the environment between internal systems."
   ],
   [
    "Why do perimeter firewalls fail to stop lateral movement?",
    "They inspect traffic crossing the perimeter, not traffic between internal systems, so east-west controls are needed."
   ]
  ]
 },
 {
  "t": "Network components: firewalls, IDS/IPS, NAC, proxies, transmission media, endpoint security",
  "body": [
   "Network components are the building blocks of network defense. The exam expects you to know what each component can see, where it belongs and how it differs from its neighbors, so you can pick the right one for a scenario. A useful habit is to ask two questions about any device: at which layer does it make decisions, and does it only watch or can it also block?",
   "Firewalls filter traffic based on rules. Packet-filtering (static) firewalls check each packet's addresses, ports and protocol at layers 3 and 4 with no memory of earlier packets. Stateful inspection firewalls track connection state, allowing return traffic only for sessions that were legitimately opened. Application-level gateways, or proxy firewalls, understand specific application protocols and inspect content at layer 7. Circuit-level gateways, such as SOCKS, validate sessions without inspecting content. Next-generation firewalls (NGFWs) combine stateful inspection with application awareness, user identity, intrusion prevention and threat intelligence. Web application firewalls (WAFs) protect web applications from attacks such as injection. Firewalls are commonly arranged to create a screened subnet, formerly called a demilitarized zone (DMZ), for public-facing servers.",
   "Intrusion detection systems (IDS) monitor and alert; intrusion prevention systems (IPS) sit inline and can block. Network-based versions (NIDS and NIPS) watch traffic on a segment; host-based versions (HIDS and HIPS) watch a single system's activity, logs and files. Signature-based detection matches known patterns, producing few false positives but missing new attacks. Anomaly or behavior-based detection compares activity against a baseline and can catch novel attacks at the cost of more false positives. Tuning balances false positives, which waste analyst time, against false negatives, which let attacks through unseen.",
   "Network access control (NAC) checks devices before and during network access. It can authenticate the user and device, often through IEEE 802.1X, assess posture such as patch level and antimalware status, and then allow, deny or quarantine the device to a remediation network. Pre-admission NAC checks before connection; post-admission NAC keeps monitoring. Proxies act as intermediaries. A forward proxy represents internal clients going out to the internet, enabling content filtering, caching and logging. A reverse proxy sits in front of servers, handling incoming requests, load balancing and TLS termination while shielding the servers. A transparent proxy intercepts traffic without client configuration.",
   "Transmission media affects security. Unshielded twisted pair copper is common but emits signals and can be tapped; shielded twisted pair reduces interference. Coaxial cable resists interference better. Fiber optic cable does not emit electromagnetic signals, resists interference and is much harder to tap undetected, making it the most secure wired choice as well as the best for long distances. Wireless is the easiest to intercept. Conduits and locked cable pathways protect the physical runs. Endpoint security protects the devices at the edge: antimalware, endpoint detection and response (EDR) that records activity for investigation, host firewalls, application allow-listing, disk encryption, patching and mobile device management (MDM). With users and data living outside the old perimeter, endpoints are often the front line.",
   "Consider a worked example. A clinic has one flat network, a basic packet filter and no visibility. You place its patient portal in a screened subnet behind an NGFW with a WAF in front of the portal, put a NIDS on a mirror port to watch internal traffic while you build a baseline, and later switch high-confidence signatures to inline IPS blocking. Staff laptops get EDR and disk encryption, and NAC quarantines any device missing patches. A contractor's unmanaged laptop plugged into a wall port lands on a guest VLAN with internet access only.",
   "Common mistakes: expecting an IDS to block (it alerts; the IPS blocks); putting an IPS inline without tuning and then blocking legitimate business traffic; assuming signature-based tools catch zero-day attacks; confusing forward and reverse proxies; and treating a WAF as a general network firewall. Remember also that an IPS failing closed can harm availability, so the fail-open or fail-closed choice is a risk decision.",
   "Exam wording tells you which tool is meant. 'Alerts only' or 'passive' means IDS; 'inline' or 'blocks' means IPS. 'New attack with no known pattern' favors anomaly-based detection. 'Checks device health before connecting' is NAC. 'Sits in front of web servers' is a reverse proxy or WAF. 'Hardest to tap' is fiber. Think like a manager: choose the control that addresses the stated risk with acceptable impact on the business, and layer components rather than relying on one box."
  ],
  "terms": [
   [
    "Stateful inspection firewall",
    "A firewall that tracks connection state and permits return traffic only for established sessions."
   ],
   [
    "Next-generation firewall (NGFW)",
    "A firewall combining stateful inspection with application awareness, user identity and intrusion prevention."
   ],
   [
    "IDS vs IPS",
    "An IDS detects and alerts on suspicious activity, while an IPS sits inline and can block it."
   ],
   [
    "Anomaly-based detection",
    "Detection that flags deviations from a learned baseline, able to catch new attacks but prone to false positives."
   ],
   [
    "Network access control (NAC)",
    "Controls that authenticate devices and check their posture before and during network access."
   ],
   [
    "Reverse proxy",
    "An intermediary in front of servers that receives client requests and forwards them, often adding load balancing and TLS termination."
   ],
   [
    "Endpoint detection and response (EDR)",
    "Endpoint software that records activity and supports detection, investigation and response."
   ]
  ],
  "example": "A retailer's anomaly-based NIDS alerts on a point-of-sale terminal sending small, regular connections to an unfamiliar external address at night. Signature tools had no match because the malware was new. Investigators confirm a compromise, isolate the terminal through NAC, and the team adds an egress rule on the NGFW allowing terminals to reach only the payment processor.",
  "tip": "IDS detects and alerts; IPS is inline and blocks. Signature-based detection misses zero-days; anomaly-based catches novel behavior with more false positives. Fiber is the most secure transmission medium against tapping and interference.",
  "check": [
   [
    "What is the key operational difference between an IDS and an IPS?",
    "An IDS monitors and alerts out of band, while an IPS sits inline and can drop malicious traffic."
   ],
   [
    "Which detection method is more likely to catch a previously unknown attack?",
    "Anomaly or behavior-based detection, because it looks for deviations from normal rather than known signatures."
   ],
   [
    "What does a NAC solution do when a laptop lacks required patches?",
    "It can deny access or quarantine the device to a remediation network until it is compliant."
   ],
   [
    "Why is fiber optic cable considered the most secure wired medium?",
    "It does not radiate electromagnetic signals and is difficult to tap without detection."
   ]
  ]
 },
 {
  "t": "Secure communication channels: voice, video, remote access, data communications, third-party connectivity",
  "body": [
   "Organizations communicate through many channels, and each one can leak data or let attackers in. The CISSP outline asks you to implement secure communication channels according to design, covering voice, video and collaboration, remote access, data communications and connections with third parties. The goal is that every channel has known endpoints, authenticated participants, protected content and a record of use. Channels are chosen in the design phase, so security requirements such as encryption strength, retention and who may join should be written down before tools are bought, not bolted on after staff are already using them.",
   "Voice channels include traditional phone lines, private branch exchange (PBX) systems and voice over IP (VoIP). Risks include eavesdropping, toll fraud (attackers using your phone system to place expensive calls), caller ID spoofing and social engineering by phone. Secure the PBX with strong administrative credentials, disable unused features such as remote dial-through access (direct inward system access), monitor call records for anomalies, and encrypt VoIP signaling and media. Train staff to verify unexpected requests by calling back on a known number rather than trusting caller ID.",
   "Video and collaboration tools, such as conferencing and messaging platforms, carry sensitive discussions, screen shares and files. Controls include requiring authentication to join, lobbies or waiting rooms, meeting passcodes, host control over screen sharing and recording, end-to-end encryption where appropriate, and policies on recording and retention. Typical problems are uninvited participants, leaked recordings and sensitive data pasted into chat or shared with external guests without review.",
   "Remote access lets users reach internal resources from elsewhere. Options include virtual private networks (VPNs) based on IPsec or TLS, remote desktop services behind a gateway, and zero trust network access (ZTNA) that grants access per application. Key controls are multifactor authentication (MFA), device posture checks, least privilege, encryption, session timeouts and logging. Never expose remote desktop directly to the internet. Split tunneling sends only corporate traffic through the VPN and improves performance but reduces visibility; full tunneling sends everything through corporate controls. Remote access authentication often uses Remote Authentication Dial-In User Service (RADIUS) or Terminal Access Controller Access-Control System Plus (TACACS+); TACACS+ encrypts the entire payload and separates authentication, authorization and accounting, while RADIUS encrypts only the password.",
   "Data communications include file transfers, APIs, email and backup replication. Use encrypted protocols such as SFTP, FTPS, HTTPS and TLS for email, authenticate both ends of machine-to-machine links with mutual TLS or signed tokens, validate integrity and monitor for unusual volumes. Email adds Sender Policy Framework (SPF), DomainKeys Identified Mail (DKIM) and Domain-based Message Authentication, Reporting and Conformance (DMARC) to reduce spoofing. Third-party connectivity links you to partners, vendors, managed service providers and cloud services, and each link is a potential path in. Governance should include an interconnection security agreement (ISA) defining technical requirements, a memorandum of understanding or contract defining responsibilities, and a risk assessment of the partner. Technically, restrict the connection to the minimum systems and ports, terminate it in a segmented zone, require MFA for vendor accounts, enable access only when needed and monitor everything.",
   "Consider a worked example. A heating and cooling vendor needs to maintain building controls at your headquarters. Rather than giving the vendor a permanent VPN account on the corporate network, you sign an ISA, place the building controllers on their own segment, and grant the vendor access through a ZTNA broker that requires MFA, reaches only those controllers, is enabled per maintenance ticket and records each session. Monthly, the facilities manager reviews the session log against work orders.",
   "Common mistakes: allowing vendors always-on access with shared credentials; permitting split tunneling for privileged users without compensating controls; trusting caller ID for password resets; confusing RADIUS and TACACS+ encryption; and relying only on a contract with a third party without any technical restriction, or only on technical controls without contractual obligations for notification and security standards.",
   "Exam questions typically describe a channel and a risk. 'Vendor needs access to one system' points to least privilege, segmentation, MFA and time-limited access. 'Encrypt the whole AAA exchange and authorize each command' is TACACS+. 'Staff tricked by a call appearing to come from the CEO' points to callback verification and training. 'Formal document of technical requirements for connecting two networks' is an ISA. Think like a manager: third-party risk needs both contractual and technical controls, and you remain accountable for your data even when a partner handles it."
  ],
  "terms": [
   [
    "Toll fraud",
    "Unauthorized use of an organization's phone system to place calls at its expense."
   ],
   [
    "Split tunneling",
    "A VPN configuration that sends only corporate traffic through the tunnel and other traffic directly to the internet."
   ],
   [
    "Zero trust network access (ZTNA)",
    "Remote access that grants authenticated users access to specific applications rather than the whole network."
   ],
   [
    "TACACS+",
    "A AAA protocol that runs over TCP, encrypts the full payload and separates authentication, authorization and accounting."
   ],
   [
    "Interconnection security agreement (ISA)",
    "A document that specifies the technical and security requirements for connecting two organizations' systems."
   ],
   [
    "DMARC",
    "An email policy mechanism that builds on SPF and DKIM to tell receivers how to handle unauthenticated mail from a domain."
   ],
   [
    "Mutual TLS",
    "TLS in which both parties present certificates, authenticating machine-to-machine connections."
   ]
  ],
  "example": "A finance clerk receives a video call from someone who looks and sounds like the finance director asking for an urgent wire transfer. Company policy requires any payment request made by voice or video to be verified by calling the requester back on a number from the internal directory. The callback reveals the director knew nothing about it, and the transfer is stopped.",
  "tip": "For remote access, the best answers include MFA, encryption and least privilege. TACACS+ encrypts the whole payload; RADIUS encrypts only the password. Third-party connections need both contractual (ISA, contract) and technical (segmentation, monitoring) controls.",
  "check": [
   [
    "What is the security trade-off of split tunneling?",
    "It improves performance but internet traffic bypasses corporate security controls and monitoring."
   ],
   [
    "How should a vendor's remote maintenance access be designed?",
    "Limited to the specific systems needed, in a segmented zone, with MFA, time-bound enablement, monitoring and a governing agreement."
   ],
   [
    "Which document defines the technical requirements for connecting two organizations' networks?",
    "An interconnection security agreement (ISA)."
   ],
   [
    "What defends against caller ID spoofing in social engineering?",
    "Verifying requests through a callback to a known, independently obtained number, supported by staff training."
   ]
  ]
 },
 {
  "t": "Network attacks and mitigations: DDoS, spoofing, on-path, DNS attacks",
  "body": [
   "Recognizing network attacks by their symptoms and matching them to effective mitigations is a core CISSP skill. The goal here is defensive understanding: what the attack does, what it looks like in your logs and monitoring, and how to prevent or limit it. The exam will not ask you to run an attack, but it will describe one and ask for the best control. Most network attacks exploit one of three things: finite capacity, protocols that trust unverified addresses, or users and systems that do not check who they are talking to.",
   "A denial-of-service (DoS) attack tries to make a service unavailable; a distributed denial-of-service (DDoS) attack uses many sources, often a botnet of compromised devices. Volumetric attacks saturate bandwidth. Protocol attacks exhaust state tables in servers, firewalls or load balancers; a SYN flood sends many connection requests without completing the TCP handshake. Application-layer attacks send expensive, legitimate-looking requests, such as repeated searches. Reflection and amplification attacks spoof the victim's address in small requests to services such as open DNS resolvers or Network Time Protocol (NTP) servers, which send much larger replies to the victim. Mitigations include upstream scrubbing services and content distribution networks (CDNs), rate limiting, SYN cookies, filtering spoofed traffic, closing open resolvers and reflectors, spare capacity and a DDoS response plan agreed with your internet provider.",
   "Spoofing means falsifying an identity. IP spoofing forges the source address, enabling reflection and bypassing weak address-based trust. Ingress filtering (dropping inbound packets that claim internal source addresses) and egress filtering (dropping outbound packets with non-internal sources), described in the best current practice document BCP 38, reduce it. MAC spoofing defeats MAC filtering, and ARP spoofing sends false Address Resolution Protocol replies to redirect local traffic; dynamic ARP inspection and port security help. Email spoofing is countered with SPF, DKIM and DMARC.",
   "On-path attacks, traditionally called man-in-the-middle, put the attacker between communicating parties to eavesdrop or alter traffic. They are often enabled by ARP spoofing, DNS manipulation, rogue access points or SSL stripping, which downgrades a user's HTTPS connection to plain HTTP. Defenses include encryption with proper certificate validation, HTTP Strict Transport Security (HSTS), which tells browsers to use only HTTPS for a site, mutual authentication, 802.1X and secure wireless configuration.",
   "DNS attacks target the name system nearly everything depends on. Cache poisoning inserts false records into a resolver's cache, sending users to attacker-controlled addresses. DNS Security Extensions (DNSSEC) add digital signatures so resolvers can verify that answers are authentic and unaltered, but DNSSEC does not encrypt queries; DNS over HTTPS (DoH) and DNS over TLS (DoT) provide confidentiality. Other threats include domain hijacking through a compromised registrar account (countered with registrar locks and MFA), typosquatting, DNS tunneling that hides data exfiltration or command-and-control traffic inside queries (detected by monitoring for unusual volumes and long encoded names), and DDoS against DNS servers (countered with anycast and redundant providers).",
   "Consider a worked example. On a Monday morning your online booking site becomes unreachable. Flow data shows a flood of large DNS responses arriving from thousands of resolvers you never queried: a reflection and amplification attack. You activate the scrubbing service in your DDoS plan, and your provider filters the traffic upstream. In the review you also find that one of your own DNS servers was an open resolver that could be abused against others, so you restrict recursion to internal clients and confirm egress filtering blocks spoofed source addresses leaving your network.",
   "Common mistakes: believing DNSSEC encrypts DNS (it provides integrity and authenticity only); trying to absorb a large volumetric DDoS at your own firewall, which is already behind the saturated link; confusing ingress and egress filtering; assuming HTTPS alone prevents SSL stripping without HSTS; and ignoring DNS logs, which are among the best sources for spotting tunneling and malware. Across all of these, monitoring and baselines are what let you spot trouble early.",
   "Exam clue words are consistent. 'Half-open connections' is a SYN flood, fixed with SYN cookies. 'Small request, large response to a spoofed victim' is amplification. 'Users sent to a fake site although they typed the right name' is DNS poisoning, fixed with DNSSEC. 'HTTPS downgraded to HTTP' is SSL stripping, fixed with HSTS. From a manager's view, DDoS resilience is mostly arranged in advance through providers and contracts, not improvised during the attack."
  ],
  "terms": [
   [
    "DDoS",
    "Distributed denial of service, an availability attack launched from many sources at once."
   ],
   [
    "SYN flood",
    "A protocol attack that sends many TCP connection requests without completing the handshake, exhausting state tables."
   ],
   [
    "Amplification attack",
    "Sending small spoofed requests to services that reply with much larger responses to the victim."
   ],
   [
    "Ingress and egress filtering",
    "Dropping inbound packets with internal source addresses and outbound packets with non-internal sources to reduce spoofing."
   ],
   [
    "DNSSEC",
    "Extensions that sign DNS records so resolvers can verify authenticity and integrity, without encrypting them."
   ],
   [
    "HSTS",
    "HTTP Strict Transport Security, a header that tells browsers to connect to a site only over HTTPS."
   ],
   [
    "DNS tunneling",
    "Hiding data or command traffic inside DNS queries and responses."
   ]
  ],
  "example": "A security analyst notices one workstation making thousands of DNS queries per hour for long, random-looking subdomains of a single unfamiliar domain. The pattern matches DNS tunneling used for data exfiltration. The team isolates the host, blocks the domain at the resolver, forces all DNS through monitored internal resolvers and adds an alert for abnormal query lengths and volumes.",
  "tip": "DNSSEC provides integrity and authenticity for DNS records, not confidentiality. SYN cookies mitigate SYN floods; ingress and egress filtering reduce IP spoofing; HSTS defends against SSL stripping.",
  "check": [
   [
    "What does DNSSEC protect, and what does it not protect?",
    "It protects the authenticity and integrity of DNS answers through signatures, but it does not encrypt queries or responses."
   ],
   [
    "Why is filtering at your own firewall usually insufficient against a large volumetric DDoS?",
    "The attack saturates the internet link before traffic reaches the firewall, so filtering must happen upstream at a provider or scrubbing service."
   ],
   [
    "Which control stops a network's hosts from being used to send spoofed traffic to others?",
    "Egress filtering that drops outbound packets whose source addresses do not belong to the network."
   ],
   [
    "What defense prevents SSL stripping?",
    "HSTS, which makes the browser insist on HTTPS for the site, combined with proper certificate validation."
   ]
  ]
 },
 {
  "t": "Monitoring and management: network observability, capacity, logging",
  "body": [
   "You cannot protect a network you cannot see. Monitoring and management is the discipline of continuously collecting data about what the network is doing, deciding whether that behavior is normal, and keeping the infrastructure healthy enough to deliver the availability the business needs. For the CISSP this topic sits where security meets operations: the same telemetry that tells a network team a link is saturated also tells a security team that a host is sending data out at 3 a.m.",
   "Network observability goes beyond simple up or down checks. Traditional monitoring asks known questions, such as whether a router is reachable or an interface error count is rising. Observability means collecting data rich enough to answer questions you did not anticipate. Main sources are device logs sent over syslog; performance counters polled with Simple Network Management Protocol (SNMP), where SNMPv3 should be used because it adds authentication and encryption that v1 and v2c lack; flow records such as NetFlow or IP Flow Information Export (IPFIX), which summarize who talked to whom, on which ports and how much; and full packet capture, the most detailed and most expensive to store. Flow data is often the sweet spot for security because it is compact, still works for encrypted traffic by showing endpoints and volumes, and reveals beaconing, lateral movement and large outbound transfers.",
   "Capacity management keeps availability, the A in the confidentiality, integrity and availability (CIA) triad, from quietly eroding. By trending bandwidth, processor, memory, session tables and storage, you establish a baseline and forecast when a resource will run out. A baseline has a security use too: a sudden deviation from normal volume may be a denial-of-service attack, a misconfiguration or malware rather than organic growth. Capacity planning must include headroom for failover, because a redundant pair each running at 70 percent cannot absorb the load if one member fails.",
   "Logging turns events into evidence. Send logs off the device to a central, hardened collector or security information and event management (SIEM) platform as soon as possible, so an attacker who compromises a device cannot simply erase its history. Synchronize every device to a reliable time source with Network Time Protocol (NTP); without consistent timestamps you cannot correlate events or build a credible timeline. Protect log integrity with restricted access, append-only or write-once storage and hashing where required, set retention that meets legal, regulatory and investigative needs, and remember that logs contain sensitive data needing their own confidentiality controls.",
   "Management traffic itself must be protected. Put device administration on a separate out-of-band network or dedicated management VLAN, require encrypted protocols such as SSH and HTTPS instead of Telnet and HTTP, use centralized authentication such as TACACS+ so every administrative command is attributed to a person, and restrict which hosts can reach management interfaces. Alert when an expected log source goes silent, because a missing feed can mean failure or tampering. Configuration management belongs here too: keep backups of device configurations, compare running configurations against approved baselines, and route every change through change control.",
   "Consider a worked example. A logistics company notices its internet link is busy every night. Flow records show a single file server sending several gigabytes to an unfamiliar cloud storage address between 1 and 3 a.m., well above its baseline. Because the file server's clock and the firewall's clock are both synchronized with NTP, analysts line up the firewall log, the server's authentication log and the flows into one timeline showing a compromised service account. Capacity reports had flagged the growth weeks earlier, but nobody compared it to the baseline.",
   "Common mistakes: keeping logs only on the device that generated them; allowing clocks to drift; using SNMPv1 or v2c for monitoring; capturing full packets everywhere and running out of storage while collecting nothing useful; and buying a new tool before defining what normal looks like. Another error is treating capacity as purely an operations concern when it directly supports availability.",
   "Exam questions often ask which data source answers a question or what to do first. 'Who talked to whom and how much' is flow data. 'Actual content' is packet capture. 'Device health counters' is SNMP. 'Events from a device' is syslog. 'Cannot correlate events across systems' points to missing time synchronization. Think like a manager: first establish visibility and a baseline, then tune alerts and invest, so decisions rest on evidence."
  ],
  "terms": [
   [
    "Observability",
    "Collecting telemetry rich enough to answer unanticipated questions about system behavior."
   ],
   [
    "Flow data",
    "Summaries such as NetFlow or IPFIX that record endpoints, ports, timing and volume of conversations without full content."
   ],
   [
    "Syslog",
    "A standard for sending event messages from devices to a central collector."
   ],
   [
    "Baseline",
    "A measured picture of normal behavior against which deviations are detected."
   ],
   [
    "NTP",
    "Network Time Protocol, used to synchronize clocks so events can be correlated."
   ],
   [
    "Capacity management",
    "Trending and forecasting resource use so services stay available."
   ],
   [
    "Out-of-band management",
    "Administering devices over a separate network isolated from production traffic."
   ]
  ],
  "example": "After an intrusion, investigators at a university cannot tell whether a firewall change came before or after a suspicious login because the firewall clock was eleven minutes behind the directory server. The university configures all devices to use internal NTP servers synchronized to a trusted source, sends logs to a central SIEM with restricted write access, and adds an alert when any device's time drifts.",
  "tip": "Flow data shows who talked to whom and how much, packet capture shows content, SNMP shows device health, syslog shows events. SNMPv3 is the secure choice, and time synchronization is a prerequisite for log correlation.",
  "check": [
   [
    "Why is flow data valuable for security even when traffic is encrypted?",
    "It still shows endpoints, ports, timing and volumes, revealing beaconing, lateral movement and large transfers."
   ],
   [
    "Why should logs be sent off the device promptly?",
    "So an attacker who compromises the device cannot delete or alter the only copy of its history."
   ],
   [
    "What problem does NTP solve for investigations?",
    "It keeps clocks consistent so events from different systems can be correlated into an accurate timeline."
   ],
   [
    "Why must capacity planning include failover headroom?",
    "If redundant components run near capacity, the survivor cannot carry the full load when one fails, causing an outage."
   ]
  ]
 },
 {
  "t": "Controlling physical and logical access to information, systems, devices, facilities and applications",
  "body": [
   "Access control is the heart of Domain 5 and, in many ways, of security itself. Its purpose is to ensure that only authorized subjects can reach objects, and only in the ways they are permitted. A subject is an active entity such as a user, process or device that requests access; an object is the passive resource being accessed, such as a file, database, server, room or application. Every access decision answers the same question: may this subject perform this action on this object right now?",
   "The CISSP outline asks you to control access across five kinds of assets. Information is the data itself, wherever it lives. Systems are servers, operating systems and platforms. Devices include laptops, phones, Internet of Things (IoT) sensors and network equipment. Facilities are buildings, data centers and rooms. Applications are the software that processes data. The principles are the same for all of them even though the mechanisms differ: a badge reader and a turnstile protect a data hall, while file permissions and database grants protect records.",
   "Physical access controls include fences, gates, locks, access control vestibules (mantraps) that admit one person at a time, badge systems, guards and closed-circuit television (CCTV). Logical, or technical, access controls include passwords, tokens, certificates, access control lists (ACLs), firewalls and encryption. The two depend on each other: an attacker with unsupervised physical access to a server can often bypass logical controls by booting from external media or removing the drive, which is why data centers combine locked racks, full-disk encryption and monitored entry.",
   "Controls are classified by type and by function. Types are administrative (policies, procedures, training, background checks), technical or logical (hardware and software mechanisms) and physical (tangible barriers). Functions are preventive (stop the event), detective (identify it), corrective (fix the immediate damage), deterrent (discourage attempts), recovery (restore operations), directive (tell people what to do) and compensating (an alternative when the primary control is not feasible). One control can be described on both axes: a security guard is a physical control that can deter, prevent and detect.",
   "Several principles guide design. Least privilege grants the minimum access needed for a task. Need to know further limits access to information required for a specific duty, even when someone holds a sufficient clearance. Separation of duties splits sensitive tasks so no single person can complete them alone. Defense in depth layers physical, technical and administrative controls so one failure does not expose the asset. Default deny, sometimes called implicit deny, blocks anything not explicitly permitted. Access control must also be managed over time: rights granted for a project are removed when it ends, and periodic reviews confirm that what people hold still matches what they need. Access control is also the foundation of accountability, since logs tie actions to identities.",
   "Consider a worked example. A research lab stores genetic data on servers in a small data room. Physical controls include a badge reader with PIN on the room door, a camera watched by the security desk, and locked racks. Technical controls include full-disk encryption, role-based permissions on the data share and MFA for administrators. Administrative controls include a data handling policy, background checks for technicians and quarterly access reviews. When a visiting researcher needs access to one dataset, she gets read-only rights to that folder for two weeks, reflecting least privilege and need to know, and her badge does not open the data room at all.",
   "Common mistakes: treating physical and logical controls as separate worlds; classifying a control only by type and forgetting its function; confusing least privilege (how much access) with need to know (which information); and assuming a clearance alone grants access to all data at that level. Another error is thinking a dummy camera is detective; it only deters because nobody records or watches anything.",
   "Exam questions frequently ask you to classify a control or pick the best principle. 'Minimum rights to do the job' is least privilege. 'Cleared but not assigned to the project' points to need to know. 'Alternative control because the system cannot support MFA' is compensating. 'Logs reviewed after the fact' is detective. 'Policy requiring badges be worn' is administrative and directive. Think like a manager: select controls proportionate to the asset's value and risk, and layer them so no single failure is catastrophic."
  ],
  "terms": [
   [
    "Subject",
    "An active entity, such as a user, process or device, that requests access to an object."
   ],
   [
    "Object",
    "A passive resource, such as a file, system or room, that a subject accesses."
   ],
   [
    "Least privilege",
    "Granting only the minimum access needed to perform an assigned task."
   ],
   [
    "Need to know",
    "Restricting access to information required for a specific duty, regardless of clearance level."
   ],
   [
    "Compensating control",
    "An alternative control used when the primary control is not feasible, providing comparable protection."
   ],
   [
    "Detective control",
    "A control that identifies that an event has occurred, such as log review or a monitored camera."
   ],
   [
    "Default deny",
    "A policy that blocks all access not explicitly permitted."
   ]
  ],
  "example": "A legacy manufacturing controller cannot support individual accounts or MFA. The plant places it on an isolated network segment reachable only from a hardened jump host that requires MFA and records sessions. This compensating control arrangement provides accountability and access restriction the controller cannot provide itself, and the risk owner signs off on the residual risk.",
  "tip": "Classify each control by both type (administrative, technical, physical) and function (preventive, detective, corrective and so on). A monitored camera is detective; an unmonitored or dummy camera is only a deterrent.",
  "check": [
   [
    "What is the difference between a subject and an object?",
    "A subject is the active entity requesting access; an object is the passive resource being accessed."
   ],
   [
    "An employee with a Secret clearance is denied access to a Secret file for a project she is not on. Which principle applies?",
    "Need to know, which limits access to information required for her specific duties despite sufficient clearance."
   ],
   [
    "Classify a background check by type and function.",
    "It is an administrative control with a preventive function, screening out unsuitable people before they gain access."
   ],
   [
    "Why do physical controls matter for logical security?",
    "Physical access to hardware can bypass logical controls, for example by booting from external media or removing drives."
   ]
  ]
 },
 {
  "t": "Identification, authentication and authorization; MFA and passwordless",
  "body": [
   "Access control follows a sequence that the exam expects you to know cold. Identification is the subject claiming an identity, such as typing a username or presenting a badge. Authentication is proving that claim. Authorization is deciding what the authenticated subject may do. Accountability, which depends on auditing, ties actions back to the individual. Together these are often summarized as IAAA. If identities are shared, accountability collapses, because you can no longer tell who did what, which is why unique user IDs matter as much as strong passwords.",
   "Authentication factors fall into categories. Something you know is a password, passphrase or personal identification number (PIN). Something you have is a smart card, hardware token or a phone running an authenticator app. Something you are is a biometric such as a fingerprint, face or iris. Some references add somewhere you are (location) and something you do (behavioral traits such as typing rhythm), usually treated as contextual signals rather than primary factors. Multifactor authentication (MFA) requires factors from two or more different categories. A password plus a security question is still single-factor, because both are something you know.",
   "Not all second factors are equally strong. One-time codes sent by Short Message Service (SMS) can be intercepted through SIM swapping or relayed in real time by a phishing site. Time-based one-time passwords (TOTP) from an authenticator app are better but can still be phished in real time. Push approvals can be abused through fatigue attacks, where an attacker triggers prompt after prompt until the user taps approve; number matching reduces this. Phishing-resistant methods bind authentication cryptographically to the legitimate site, which is the key property of FIDO2 and smart card approaches such as certificate-based login.",
   "Passwordless authentication removes the shared secret entirely. FIDO2 combines the World Wide Web Consortium (W3C) WebAuthn standard with the Client to Authenticator Protocol (CTAP). The user's authenticator creates a unique public-private key pair for each website, and the site stores only the public key. At login the site sends a challenge, the authenticator signs it with the private key after the user unlocks it locally with a PIN or biometric, and the site verifies the signature. Passkeys are FIDO credentials that can be synchronized across a user's devices. Because each credential is scoped to the site's origin, a look-alike phishing domain cannot obtain a valid signature, and because the server holds no reusable secret, a database breach exposes nothing an attacker can replay. Note that the local PIN or biometric never leaves the device.",
   "Where passwords remain, current guidance, such as that in NIST SP 800-63B, favors length over forced complexity, screening new passwords against lists of known-compromised values, allowing paste so password managers work, and avoiding routine forced expiration unless there is evidence of compromise. Store passwords only as salted hashes using slow algorithms designed for the purpose, never in plaintext or with fast general-purpose hashes. Authorization then applies the access model covered in later lessons, and each step is logged for accountability.",
   "Consider a worked example. An accounting firm uses passwords plus SMS codes. After a partner's phone number is hijacked through a SIM swap and an attacker reads client files, the firm reviews its options. It issues FIDO2 security keys and enables passkeys for all staff, removes SMS as a fallback for privileged roles, keeps TOTP only as a documented backup method, and turns on number matching for any remaining push approvals. Help desk recovery now requires identity verification in person or by video with a manager present, so the recovery process is not weaker than the login.",
   "Common mistakes: counting a password and a PIN as two factors; treating a username as authentication (it is identification); assuming any MFA is phishing-resistant; confusing authentication (who you are) with authorization (what you may do); and forgetting that account recovery is part of authentication. Another trap is believing biometrics are secrets; they are identifiers you cannot change, so they are best used to unlock a local key rather than sent to a server.",
   "Exam questions usually test the order of steps and the factor categories. 'User types a username' is identification. 'Proves identity' is authentication. 'Granted read access' is authorization. 'Logs tie actions to a person' is accountability. 'Which combination is true MFA?' needs two different categories, such as a smart card plus a PIN. 'Resistant to phishing' points to FIDO2, passkeys or certificate-based smart cards. Think like a manager: choose strength proportional to the risk of the account, with the strongest methods for privileged and remote access."
  ],
  "terms": [
   [
    "Identification",
    "Claiming an identity, for example by entering a username or presenting a badge."
   ],
   [
    "Authentication",
    "Proving a claimed identity with one or more factors."
   ],
   [
    "Authorization",
    "Determining what an authenticated subject is permitted to do."
   ],
   [
    "Accountability",
    "Tracing actions to a unique individual through identification and auditing."
   ],
   [
    "Multifactor authentication (MFA)",
    "Authentication using factors from two or more different categories."
   ],
   [
    "FIDO2",
    "A passwordless standard combining WebAuthn and CTAP that uses per-site key pairs and is phishing-resistant."
   ],
   [
    "Passkey",
    "A FIDO credential that can be synchronized across a user's devices and replaces a password."
   ]
  ],
  "example": "A software company is hit by an MFA fatigue attack: an attacker with a stolen password sends dozens of push prompts at midnight until a tired engineer taps approve. The company enables number matching, limits prompt frequency, alerts on repeated denials and moves engineers with production access to FIDO2 security keys, which cannot be approved on behalf of a phishing site.",
  "tip": "Two items from the same category are not MFA. The order is identification, then authentication, then authorization, and accountability depends on unique identities plus auditing.",
  "check": [
   [
    "Is a password plus a security question multifactor authentication?",
    "No. Both are something you know, so it is single-factor authentication."
   ],
   [
    "Why is FIDO2 considered phishing-resistant?",
    "The credential is bound to the legitimate site's origin, so a look-alike domain cannot get a valid signature, and no reusable secret is sent."
   ],
   [
    "Which step does typing a username represent?",
    "Identification, the claim of identity, which must then be proven by authentication."
   ],
   [
    "What current password guidance replaces forced periodic changes?",
    "Favor long passwords, screen against known-compromised lists and change passwords only when there is evidence of compromise."
   ]
  ]
 },
 {
  "t": "Identity management implementation: groups, roles, AAA, session management, registration and proofing",
  "body": [
   "Identity management is the machinery that creates, maintains and retires digital identities and connects them to access. Done well, it means every person and service has exactly one trustworthy identity, receives access through manageable structures rather than one-off grants, and is tracked from the moment they log in until they log out. Done poorly, it produces duplicate accounts, unexplained permissions and sessions that never end.",
   "It starts with registration and identity proofing. Registration creates the account; proofing establishes that the person behind it is who they claim to be. Proofing strength should match risk. For a newsletter, an email confirmation is enough. For a payroll system or a government benefit, you might verify official documents, compare a live photo to an ID, check records with an authoritative source, or require an in-person visit. NIST SP 800-63 describes this with identity assurance levels (IAL), authenticator assurance levels (AAL) and federation assurance levels (FAL), a vocabulary worth recognizing. Weak proofing undermines everything downstream: strong MFA on an account created for an impostor still protects the impostor.",
   "Groups and roles make access manageable. A group is a collection of accounts, often mirroring a department or project, to which permissions can be assigned once. A role represents a job function and the set of permissions that function needs; users are assigned to roles and the permissions follow. The practical rule is to grant permissions to groups or roles, never directly to individual accounts, so that when someone changes jobs you change their membership rather than hunting down scattered rights. Watch for role explosion, where too many narrowly defined roles become as hard to manage as individual grants, and review role definitions periodically so they do not accumulate extra rights.",
   "AAA stands for authentication, authorization and accounting. Centralized AAA servers, typically using Remote Authentication Dial-In User Service (RADIUS) or Terminal Access Controller Access-Control System Plus (TACACS+), let network devices, virtual private networks and wireless controllers hand these decisions to one policy point. Accounting records who connected, when and for how long, and with TACACS+ which commands they ran. The result is consistent policy and a single audit trail rather than local accounts scattered across every device. A directory service, such as one based on the Lightweight Directory Access Protocol (LDAP), usually sits behind these systems as the authoritative store of identities and group memberships.",
   "Session management protects the period after authentication. A session identifier or token represents the logged-in user, so it must be long and random, transmitted only over encrypted channels, protected with cookie flags such as Secure and HttpOnly, and regenerated after login to prevent session fixation, where an attacker plants a known session ID before the victim logs in. Sessions should end on logout and time out after inactivity and after an absolute maximum lifetime, with shorter limits for privileged sessions. Sensitive actions can require reauthentication. Screen locks on workstations are the physical-world equivalent. The aim is to limit how long a stolen or abandoned session stays useful.",
   "Consider a worked example. A regional health insurer launches a member portal. Registration requires matching a member number, date of birth and a code mailed to the address on file, reflecting moderate identity assurance. Staff access to claims data is granted through roles such as claims processor and claims supervisor, fed from the human resources system. Network devices authenticate administrators through TACACS+. The portal regenerates session IDs at login, expires idle sessions after a short period and asks members to reauthenticate before changing bank details.",
   "Common mistakes: granting permissions directly to individuals because it is quick; skipping proofing for high-value accounts; allowing session IDs in URLs where they leak through logs and referrer headers; keeping sessions alive indefinitely for convenience; and building so many roles that nobody understands them. Another error is relying on local device accounts that are never reviewed and cannot be tied to a person.",
   "Exam questions often describe a management headache and ask for the fix. 'Hard to adjust access when people change jobs' points to role or group-based assignment. 'Account created for someone pretending to be a customer' points to weak identity proofing. 'Attacker reused a session token after the user left' points to timeouts and session invalidation. 'Single audit trail of administrator commands' points to centralized AAA with TACACS+. Think like a manager: match proofing and session strength to the value of what the identity can reach."
  ],
  "terms": [
   [
    "Identity proofing",
    "Verifying that a person is who they claim to be before issuing credentials."
   ],
   [
    "Registration",
    "Creating an identity record and account in a system."
   ],
   [
    "Role",
    "A collection of permissions representing a job function, assigned to users who perform it."
   ],
   [
    "Role explosion",
    "An unmanageable proliferation of narrowly defined roles."
   ],
   [
    "AAA",
    "Authentication, authorization and accounting, often centralized with RADIUS or TACACS+."
   ],
   [
    "Session fixation",
    "An attack in which a victim is made to use a session ID the attacker already knows, prevented by regenerating IDs at login."
   ],
   [
    "Absolute session timeout",
    "A maximum session lifetime after which reauthentication is required regardless of activity."
   ]
  ],
  "example": "A university grants lab access by adding permissions to each student account individually. When a course ends, hundreds of stale permissions remain. The university creates a group per course, assigns lab permissions only to groups, and links group membership to enrollment data, so dropping or finishing a course removes access automatically and auditors can see access by course at a glance.",
  "tip": "To make access easier to manage and audit as people change jobs, assign permissions to groups or roles, not individuals. For sessions: random IDs, regenerate at login, encrypt in transit, and time out.",
  "check": [
   [
    "Why should proofing strength vary by system?",
    "Because the harm from issuing an account to an impostor varies; high-value systems need stronger evidence of identity."
   ],
   [
    "What prevents session fixation?",
    "Regenerating the session identifier after successful authentication."
   ],
   [
    "What does the accounting part of AAA provide?",
    "Records of who accessed what, when and for how long, and with TACACS+ the commands they ran."
   ],
   [
    "Why assign permissions to roles rather than users?",
    "It makes changes and reviews simple: moving a user between roles updates their access consistently and avoids scattered individual grants."
   ]
  ]
 },
 {
  "t": "Federated identity with third parties: SAML, OAuth 2.0, OIDC",
  "body": [
   "Federated identity lets users authenticate once with their home organization and then use services run by other organizations without creating separate accounts there. The organizations agree in advance to trust each other's identity assertions. This reduces password sprawl, centralizes deprovisioning (disable the home account and federated access stops) and moves authentication to the party best placed to do it well. The cost is a trust dependency: if the identity provider is compromised or misconfigured, every relying service is exposed.",
   "Two roles appear in every federation. The identity provider (IdP) authenticates the user and issues a signed statement about them. The service provider (SP), called the relying party (RP) in OpenID Connect, consumes that statement and grants access. Trust is established ahead of time by exchanging metadata, including the certificates used to sign assertions and the endpoints to redirect to. Just-in-time provisioning can create an account at the SP from the assertion's attributes on first login, while standards such as the System for Cross-domain Identity Management (SCIM) automate creating and removing accounts ahead of time.",
   "Security Assertion Markup Language (SAML) 2.0 is an XML-based standard widely used for enterprise web single sign-on. In a typical SP-initiated flow the user visits the software-as-a-service application, is redirected to the corporate IdP, authenticates there, and is redirected back with a digitally signed SAML assertion containing the user's identity and attributes. The SP validates the signature, intended audience and validity period before creating a session. Assertions can also be encrypted. SAML is mature and common for workforce access to cloud applications.",
   "OAuth 2.0 is often misunderstood. It is an authorization framework, not an authentication protocol. It lets a resource owner grant a client application limited, delegated access to resources on a resource server without sharing a password. An authorization server issues an access token with specific scopes, such as permission to read a calendar, and the client presents that token to the API. The authorization code flow with Proof Key for Code Exchange (PKCE) is the recommended pattern for most applications, while the older implicit flow is discouraged. Tokens should be short-lived and narrowly scoped, and refresh tokens need strong protection.",
   "OpenID Connect (OIDC) adds an identity layer on top of OAuth 2.0. Along with the access token, the OpenID provider issues an ID token, a signed JSON Web Token (JWT) stating who the user is, who issued the token, which client it was issued for and when it expires. OIDC uses lightweight JSON and REST, which suits mobile and modern web applications, and it underpins familiar sign-in-with buttons from large providers. The relying party must validate the ID token's signature, issuer, audience and expiry. When federating with third parties, manage the relationship like any supplier risk: define attribute release and data protection in the agreement, require strong authentication at the IdP, monitor for anomalous assertions, protect signing keys and rotate certificates before they expire.",
   "Consider a worked example. Your company adopts a cloud expense application. Employees sign in through SAML from the corporate IdP, which enforces phishing-resistant MFA, and SCIM removes accounts when HR records a departure. Separately, the expense app wants to read receipts from employees' cloud storage. That is delegated access, so it uses OAuth 2.0 with a scope limited to one receipts folder and read-only permission. The company's own mobile app uses OIDC to learn who the user is. The security team documents which attributes each partner receives and sets an alert for signing certificate expiry.",
   "Common mistakes: calling OAuth 2.0 an authentication protocol; accepting assertions or tokens without checking signature, audience and expiry; granting broad scopes like full mailbox access when read-only calendar access suffices; forgetting to deprovision at the SP when federation is not the only way in; and assuming federation removes the need for supplier due diligence. Another trap is thinking the SP ever sees the user's password; in proper federation it never does.",
   "Exam questions hinge on a few distinctions. 'XML assertions for enterprise SSO' is SAML. 'Allow an app to access my photos without giving it my password' is OAuth 2.0, which is authorization. 'Authentication layer on OAuth with an ID token in JSON' is OIDC. 'Party that authenticates the user' is the IdP; 'party that consumes the assertion' is the SP or RP. Think like a manager: federation concentrates trust in the IdP, so its security and availability become business-critical."
  ],
  "terms": [
   [
    "Identity provider (IdP)",
    "The system that authenticates users and issues signed identity assertions or tokens."
   ],
   [
    "Service provider (SP)",
    "The application that relies on the IdP's assertion to grant access, called a relying party in OIDC."
   ],
   [
    "SAML assertion",
    "A signed XML statement from an IdP about a user's identity and attributes."
   ],
   [
    "OAuth 2.0",
    "An authorization framework for granting applications delegated, scoped access without sharing passwords."
   ],
   [
    "Access token",
    "A credential issued under OAuth that a client presents to an API to exercise granted scopes."
   ],
   [
    "OpenID Connect (OIDC)",
    "An authentication layer built on OAuth 2.0 that issues a signed ID token."
   ],
   [
    "ID token",
    "A signed JWT in OIDC that tells the relying party who the user is and who issued the token."
   ]
  ],
  "example": "A university joins a research federation so its staff can use partner institutions' data portals with their home credentials. When a researcher leaves, disabling her university account immediately removes her access across every partner portal. The federation agreement specifies that only name, email and affiliation are released, satisfying the privacy office.",
  "tip": "SAML is XML-based and common for enterprise SSO; OAuth 2.0 is authorization (delegated access), not authentication; OIDC is authentication built on OAuth 2.0 using JSON tokens.",
  "check": [
   [
    "A photo printing site asks for permission to read your cloud photo album. Which standard is being used, and for what?",
    "OAuth 2.0, for delegated authorization to specific resources without sharing your password."
   ],
   [
    "What does OIDC add to OAuth 2.0?",
    "An identity layer: a signed ID token that tells the relying party who authenticated."
   ],
   [
    "What must an SP verify when it receives a SAML assertion?",
    "The signature, the intended audience, and the validity period, before trusting the identity and attributes."
   ],
   [
    "What is the main risk of federation?",
    "Dependence on the IdP: if it is compromised or unavailable, all relying services are affected."
   ]
  ]
 },
 {
  "t": "Credential management systems and single sign-on",
  "body": [
   "A credential is anything a subject uses to prove identity: a password, a private key and certificate, a token seed, an application programming interface (API) key or a biometric template. Credential management covers how credentials are issued, stored, used, rotated, recovered and revoked. Weak credential management is behind a large share of breaches, whether through reused passwords, secrets hard-coded in source code, or accounts that were never disabled. Treat every credential as having a lifecycle with an owner, an expiry or rotation schedule, and a documented way to revoke it quickly when something goes wrong.",
   "Credential management systems take several forms. Enterprise password managers, or vaults, store secrets encrypted and let users generate unique, long passwords for each system. Privileged credential vaults check out administrative passwords, rotate them after use and record sessions. Secrets managers serve machine credentials, such as database passwords and API keys, to applications at runtime so they never appear in code or configuration files. A public key infrastructure (PKI) manages certificates for users, devices and services. Hardware security modules (HSMs) and trusted platform modules (TPMs) protect keys in tamper-resistant hardware. The shared goals are strong generation, encrypted storage, controlled release, automatic rotation and a full audit trail of who accessed which credential.",
   "Single sign-on (SSO) lets a user authenticate once and then access multiple systems without logging in again. Inside an organization this is commonly provided by Kerberos in Windows domains or by an identity platform using SAML or OpenID Connect (OIDC) for web applications. Across organizations, SSO is delivered through federation. The benefits are real: with fewer passwords to remember, users can adopt one strong passphrase or passkey with multifactor authentication (MFA), help desk resets drop, and disabling one account removes access everywhere at once.",
   "The drawback is just as important: SSO concentrates risk. If the single credential or the SSO service is compromised, the attacker reaches every connected system, and if the SSO service is down, users may be locked out of everything. Mitigate this with phishing-resistant MFA at the SSO point, high availability for the identity platform, short-lived tokens, monitoring for unusual sign-ins, and step-up authentication for high-risk applications. This single-point-of-compromise and single-point-of-failure trade-off is a favorite exam theme.",
   "Do not confuse SSO with password synchronization, sometimes called same sign-on. Password synchronization keeps the same password across separate systems, so the user still types it repeatedly and every system stores its own copy, which multiplies the places it can be stolen. True SSO authenticates once and then passes tickets or tokens. Credential recovery also deserves attention: self-service resets must require strong verification, because a weak reset flow becomes the easiest way to take over an account regardless of how strong the password is. Revocation matters too; certificates need revocation checking and tokens need a way to be invalidated when a device is lost.",
   "Consider a worked example. A marketing agency's developers keep cloud API keys in a shared spreadsheet and in application configuration files committed to source control. After a key leaks through a public repository and is used to run unauthorized compute, the agency adopts a secrets manager: applications fetch short-lived credentials at startup, keys rotate automatically, and every retrieval is logged. Staff move to SSO with MFA for all business applications, and the service desk verifies identity through a manager callback before any reset. Automated scanning now blocks commits that contain secrets.",
   "Common mistakes: treating password synchronization as SSO; protecting the SSO login weakly because 'it is just one password'; leaving the identity platform without redundancy; storing machine secrets in code or scripts; and forgetting that recovery and revocation are part of the credential lifecycle. Another trap is assuming that an HSM makes a poorly governed key safe; hardware protects the key, but you still need access policies deciding who may use it.",
   "Exam questions typically ask about SSO's risk or the right storage for a secret. 'Main disadvantage of SSO' is a single point of compromise and failure. 'Best compensating control for SSO' is strong MFA at the SSO point. 'Application needs a database password without it appearing in code' is a secrets manager. 'Private keys in tamper-resistant hardware' is an HSM or TPM. Think like a manager: SSO usually improves security overall, as long as the organization invests in protecting and monitoring the identity service it now depends on."
  ],
  "terms": [
   [
    "Credential",
    "Anything a subject uses to prove identity, such as a password, key, token or certificate."
   ],
   [
    "Password vault",
    "A system that stores credentials encrypted and controls and logs their use."
   ],
   [
    "Secrets manager",
    "A service that supplies machine credentials to applications at runtime and rotates them."
   ],
   [
    "Hardware security module (HSM)",
    "Tamper-resistant hardware that generates, stores and uses cryptographic keys."
   ],
   [
    "Single sign-on (SSO)",
    "Authenticating once to gain access to multiple systems through tickets or tokens."
   ],
   [
    "Password synchronization",
    "Keeping the same password on multiple systems, which the user still enters separately on each."
   ],
   [
    "Step-up authentication",
    "Requiring additional authentication before a higher-risk action or application."
   ]
  ],
  "example": "A hospital enables SSO for its clinical systems so nurses stop writing passwords on sticky notes. To manage the concentrated risk, it requires badge-tap plus PIN at shared workstations, deploys the identity service in two data centers, and requires step-up authentication for prescribing controlled drugs. When the identity service has an outage, a documented break-glass procedure keeps critical systems reachable.",
  "tip": "The main risk of SSO is a single point of compromise and of failure. The main mitigation is strong MFA at the SSO point plus availability and monitoring of the identity service.",
  "check": [
   [
    "How does SSO differ from password synchronization?",
    "SSO authenticates once and passes tickets or tokens; password synchronization keeps the same password on many systems that each still prompt for it."
   ],
   [
    "What is the biggest security risk introduced by SSO?",
    "A single point of compromise: one stolen credential or compromised SSO service can expose every connected system."
   ],
   [
    "Where should application database passwords be kept?",
    "In a secrets manager or vault that supplies them at runtime and rotates them, not in code or configuration files."
   ],
   [
    "Why must password reset processes be strongly verified?",
    "A weak reset flow lets attackers take over accounts regardless of password strength."
   ]
  ]
 },
 {
  "t": "Just-in-time access and privileged access management",
  "body": [
   "Privileged accounts, such as domain administrators, root, database administrators, cloud owners and service accounts with broad rights, are the keys attackers want most. With them an intruder can disable defenses, create backdoor accounts, read any data and erase evidence. Privileged access management (PAM) is the set of processes and tools that discovers, secures, limits and monitors these accounts. Just-in-time access is one of its most effective techniques. PAM matters to auditors as well as defenders, because regulations and frameworks commonly require evidence that privileged use is approved, limited and reviewed.",
   "The first step is discovery: you cannot protect privileged accounts you do not know exist. Inventory human administrator accounts, built-in accounts, service accounts, local administrator accounts on endpoints, and application and cloud keys. Then separate duties by account: administrators use a normal account for email and browsing and a separate privileged account only for administration, ideally from a hardened privileged access workstation, so a phishing email cannot directly capture admin credentials.",
   "A PAM platform typically provides a vault that holds privileged passwords and keys; checkout workflows that require a reason, a ticket number or approval; automatic rotation after each use, so the credential is worthless once the session ends; session brokering, where the user connects through a proxy and never sees the actual password; and session recording and keystroke logging for accountability. These features directly support least privilege, separation of duties and accountability, and they give auditors evidence of who did what with elevated rights.",
   "Just-in-time (JIT) access tackles standing privilege, meaning rights that are always on whether or not they are being used. Under JIT, users hold no permanent administrative rights. When they need to perform a task they request elevation, which is approved automatically by policy or by a person, and the rights are granted for a limited window and then removed. Some implementations create an ephemeral account for the session and delete it afterward. Just-enough administration scopes elevation to only the specific commands or resources required, and zero standing privilege is the end goal. The payoff is a far smaller attack surface: a stolen admin account with no current rights is of little use.",
   "Break-glass, or emergency, accounts are a deliberate exception for when normal systems fail, such as the identity provider being down during an outage. They should be few, protected with strong credentials stored securely (sometimes split between two custodians so that no one person can use them alone), independent of systems that might be unavailable, heavily monitored and reviewed after every use. Finally, review privileged access frequently, alert on use outside approved windows, and send PAM logs to the security monitoring platform so misuse is spotted quickly.",
   "Consider a worked example. A cloud-first retailer has twelve engineers who are permanent owners of the production cloud subscription. You introduce a PAM process: engineers keep ordinary accounts, and when a change ticket is approved they request the owner role for two hours through the JIT tool, with MFA. Database credentials live in the vault and rotate after each checkout, and sessions to production servers go through a recording proxy. Two break-glass accounts with hardware keys sit in a safe, and any login triggers an alert to the security lead. Six months later, a phished engineer's account gives the attacker nothing, because it holds no standing rights.",
   "Common mistakes: letting administrators browse and read email with their privileged accounts; vaulting passwords but never rotating them; forgetting service accounts, which often have broad rights and passwords unchanged for years; creating break-glass accounts that depend on the same identity provider they are meant to bypass; and recording sessions without anyone reviewing them. Another error is believing JIT removes the need for approval and logging; it relies on both.",
   "Exam questions often ask how to reduce risk from administrator accounts. 'Rights exist all the time even when unused' describes standing privilege, fixed by JIT. 'Admin clicked a phishing link while logged in as domain admin' points to separate admin accounts and privileged access workstations. 'Password is worthless after the session' is automatic rotation. 'Emergency access when SSO is down' is break-glass. Think like a manager: privileged access is the highest-impact risk in most environments, so it warrants the strongest controls and the most frequent reviews."
  ],
  "terms": [
   [
    "Privileged access management (PAM)",
    "Processes and tools that discover, vault, limit and monitor privileged accounts."
   ],
   [
    "Standing privilege",
    "Elevated rights that remain assigned at all times whether or not they are in use."
   ],
   [
    "Just-in-time (JIT) access",
    "Granting elevated rights only when needed, for a limited time, and removing them automatically."
   ],
   [
    "Just-enough administration",
    "Limiting elevation to the specific commands or resources a task requires."
   ],
   [
    "Session brokering",
    "Connecting users to privileged systems through a proxy so they never see the underlying credential."
   ],
   [
    "Privileged access workstation",
    "A hardened device used only for administrative tasks."
   ],
   [
    "Break-glass account",
    "A tightly controlled emergency account used when normal access mechanisms fail."
   ]
  ],
  "example": "During an incident review, a bank finds that a service account used by a backup product had domain administrator rights and a password unchanged for six years. The bank moves the account into its PAM vault with automatic rotation, reduces its rights to only the backup permissions it needs, blocks interactive logon for it, and alerts on any use outside the backup window.",
  "tip": "To reduce the risk of compromised administrator accounts, remove standing privilege (JIT), separate admin and daily-use accounts, and add vaulting, rotation and session monitoring.",
  "check": [
   [
    "What problem does just-in-time access solve?",
    "Standing privilege; admin rights exist only briefly when approved and needed, so stolen accounts usually hold no elevated rights."
   ],
   [
    "Why should administrators have separate privileged and everyday accounts?",
    "So email, browsing and other risky activities do not expose privileged credentials to phishing or malware."
   ],
   [
    "What makes a vaulted privileged password useless after a session?",
    "Automatic rotation of the credential after each checkout."
   ],
   [
    "What controls should apply to break-glass accounts?",
    "Few accounts, strong securely stored credentials, independence from normal identity systems, alerts on use and review after every use."
   ]
  ]
 },
 {
  "t": "Authorization mechanisms: RBAC, rule-based, MAC, DAC, ABAC, risk-based",
  "body": [
   "Once a subject is authenticated, an authorization mechanism decides what it may do. The CISSP exam tests several models, and questions usually turn on two things: who makes the access decision, and what the decision is based on. If you learn each model by those two questions, most scenario questions become straightforward. Real organizations mix models, so expect scenarios where different layers of the same system use different ones.",
   "Discretionary access control (DAC) lets the owner of an object decide who can access it. When you create a file on a typical Windows or Linux system, you can grant others read or write access through access control lists (ACLs) or permission bits. DAC is flexible and familiar, but it is only as good as each owner's judgment, and it is vulnerable to malware running with the user's rights, because that malware can change any permissions the user controls. Identity-based access through ACLs is the hallmark of DAC.",
   "Mandatory access control (MAC) takes the decision away from owners. The system enforces policy based on security labels: every subject has a clearance and every object has a classification, often with compartments or categories. Access is allowed only when the subject's clearance dominates the object's label and the subject has need to know for the compartment. Users cannot change labels or share data outside the policy. MAC is associated with military and government systems and with the Bell-LaPadula confidentiality model, and it appears in hardened operating systems through features such as SELinux. It is strong but rigid and expensive to administer.",
   "Role-based access control (RBAC) assigns permissions to roles that represent job functions, and users receive permissions by being assigned to roles. It is considered non-discretionary: a central administrator, not the data owner, controls role definitions. RBAC scales well in organizations with stable job functions, simplifies audits and supports separation of duties, for example by preventing one person from holding both the create-vendor and approve-payment roles. Rule-based access control applies global rules to all subjects regardless of identity. A firewall rule set that allows or denies traffic by address and port is the classic example, as is a policy blocking logins outside business hours. Because the acronym RBAC is sometimes used for both, read the context carefully.",
   "Attribute-based access control (ABAC) evaluates policies that combine attributes of the subject (department, clearance, device health), the object (classification, owner), the action (read, delete) and the environment (time, location, network). A policy might say that clinicians may read records of patients in their own ward from a managed device during their shift. ABAC is very fine-grained and suits cloud and zero trust architectures, at the cost of more complex policy design and testing. Risk-based, or adaptive, access control goes a step further, calculating a risk score in real time from signals such as impossible travel, an unfamiliar device or threat intelligence, and then allowing access, requiring step-up authentication or denying accordingly.",
   "Consider a worked example. A hospital needs several controls at once. Staff get baseline application access through RBAC roles such as nurse, pharmacist and billing clerk. Within the records system, an ABAC policy limits nurses to patients on their assigned ward during their shift from hospital-managed devices. The network firewall applies rule-based filtering that blocks the records database from all subnets except the application servers. When a doctor signs in from a new country at 3 a.m., the risk-based engine requires a hardware key before allowing access. The research team's shared folders remain DAC, with each principal investigator deciding who can read their files.",
   "Common mistakes: calling firewall ACLs role-based (they are rule-based); thinking the file owner controls access under MAC (the system does); assuming RBAC and ABAC are the same because both are centrally managed; and forgetting DAC's weakness against malware and careless sharing. Another trap is believing ABAC is always better; its flexibility brings complexity, and a poorly tested policy can grant more than intended.",
   "Exam questions describe who decides and on what basis. Owner decides: DAC. System compares labels and clearances: MAC. Job function decides: role-based RBAC. Global conditions such as time or port decide for everyone: rule-based. Many attributes of user, resource and environment decide: ABAC. A live risk score decides: risk-based. Think like a manager: choose the simplest model that meets the confidentiality requirements and the organization's ability to administer it."
  ],
  "terms": [
   [
    "Discretionary access control (DAC)",
    "A model in which object owners decide who may access their objects, typically via ACLs."
   ],
   [
    "Mandatory access control (MAC)",
    "A model in which the system enforces access based on labels and clearances that users cannot change."
   ],
   [
    "Role-based access control",
    "A non-discretionary model that grants permissions through roles representing job functions."
   ],
   [
    "Rule-based access control",
    "A model that applies global rules, such as time or address conditions, to all subjects."
   ],
   [
    "Attribute-based access control (ABAC)",
    "A model that evaluates policies combining subject, object, action and environment attributes."
   ],
   [
    "Risk-based access control",
    "Adaptive authorization that adjusts decisions based on a real-time risk score."
   ],
   [
    "Security label",
    "A classification and compartment marking used by MAC to make access decisions."
   ]
  ],
  "example": "A defense contractor runs a system where documents are labeled Confidential, Secret or Top Secret with project compartments. An engineer with a Secret clearance cannot open a Secret document from another project, and cannot relabel his own Secret document as Confidential to email it. The system, not the engineer, enforces these decisions, which is mandatory access control.",
  "tip": "Ask who decides. Owner decides: DAC. System labels decide: MAC. Job function decides: role-based RBAC. Global rules decide: rule-based. Many attributes decide: ABAC. Live risk score decides: risk-based.",
  "check": [
   [
    "A user shares her own spreadsheet with a colleague by editing its permissions. Which model is this?",
    "Discretionary access control, because the owner decides who has access."
   ],
   [
    "Why is DAC vulnerable to malware?",
    "Malware runs with the user's rights and can change any permissions the user controls."
   ],
   [
    "A firewall denies all traffic to port 23 for everyone. Which model is this?",
    "Rule-based access control, a global rule that applies regardless of identity."
   ],
   [
    "What model would allow access only to nurses on their own ward, during their shift, from managed devices?",
    "Attribute-based access control, because it combines subject, object and environment attributes."
   ]
  ]
 },
 {
  "t": "Identity and access provisioning lifecycle: account access review, provisioning and deprovisioning",
  "body": [
   "Identities are not static. People join, change jobs, take leave, become contractors and eventually leave, and systems and services come and go too. The identity and access provisioning lifecycle manages access through all of these stages. Many organizations describe it as joiner, mover, leaver (JML), and the exam expects you to know the typical risk at each step and the control that addresses it.",
   "Provisioning happens when a new identity needs access. Access should be requested, approved by the appropriate authority (usually the manager and the data or system owner), granted according to the person's role and documented. Automated provisioning driven by the human resources (HR) system as the authoritative source is preferred: when HR records a new hire, the identity platform creates accounts and applies role-based access, reducing errors and delays. Provisioning should follow least privilege from day one rather than copying another employee's access, a habit that spreads excessive permissions. Contractors and temporary staff should get accounts with built-in expiry dates.",
   "Movers are the most commonly mishandled stage. When someone transfers departments, new access is added quickly because they complain if it is missing, but old access is often left in place because nobody notices. Over years this creates privilege creep, also called access aggregation, where a long-serving employee holds far more rights than any single job requires and may be able to bypass separation of duties. The fix is to treat a transfer as a re-provisioning event: remove access tied to the old role and grant access for the new one, with a short, deliberate overlap only if the handover requires it.",
   "Deprovisioning disables or removes access when it is no longer needed. For a routine departure, disable accounts at the end of the last working day, revoke tokens, sessions and certificates, recover badges and devices, and transfer ownership of data and mailboxes. For an involuntary or hostile termination, disable access before or at the moment the person is informed, and escort them as policy dictates. Disabling first and deleting after a retention period preserves audit trails and data. Orphaned accounts, which belong to nobody current, and dormant accounts unused for a long time are favored by attackers and should be found and removed. Service accounts need named owners, periodic review, credential rotation and restricted interactive logon.",
   "Account access reviews, also called recertification or attestation, periodically confirm that access is still appropriate. Managers and system owners review who has what and approve or revoke each entitlement. Privileged accounts should be reviewed more often than standard ones. Reviews only work if reviewers actually examine the access rather than approving everything, a problem called rubber-stamping, so provide clear reports in business language, highlight anomalies such as access unused for months, and track revocations to completion. Reviews are detective controls; good provisioning is the preventive control, and you need both.",
   "Consider a worked example. An auditor at a mid-sized bank samples twenty employees and finds that a loan officer who moved to the treasury team two years ago can still approve loans and can now also initiate wire transfers, a separation of duties conflict. Three accounts belong to people who left months ago, one of which logged in last week. The bank connects its identity platform to the HR system so joiners, movers and leavers trigger automatic changes, adds a transfer checklist that removes old-role access, disables leavers' accounts within hours, and starts quarterly manager reviews with monthly reviews for privileged roles. The account used after its owner left is escalated as a security incident.",
   "Common mistakes: copying a colleague's access for a new hire; adding access for movers without removing the old; deleting accounts immediately and losing audit history; forgetting cloud and SaaS accounts that are not connected to the central directory; letting reviewers approve lists they do not understand; and leaving service accounts without owners. Another trap is disabling the network account but not revoking active sessions, tokens or VPN certificates, leaving a window of access.",
   "Exam questions describe symptoms. 'Long-serving employee has access from several previous jobs' is privilege creep, detected by access reviews and prevented by proper mover processes. 'Account of a former employee used after departure' points to deprovisioning failure. 'Hostile termination' means disable access at or before notification. 'Manager confirms quarterly that staff still need access' is recertification. Think like a manager: data owners are accountable for approving access to their data, and HR is the authoritative trigger for lifecycle events."
  ],
  "terms": [
   [
    "Joiner, mover, leaver (JML)",
    "The lifecycle stages of hiring, transfer and departure that drive access changes."
   ],
   [
    "Provisioning",
    "Creating accounts and granting approved access to a new or changed identity."
   ],
   [
    "Deprovisioning",
    "Disabling or removing access when it is no longer needed."
   ],
   [
    "Privilege creep",
    "Gradual accumulation of excess access as people change roles without old rights being removed."
   ],
   [
    "Access review (recertification)",
    "A periodic check by managers or owners that each person's access is still appropriate."
   ],
   [
    "Orphaned account",
    "An account with no current owner, such as one belonging to a departed employee."
   ],
   [
    "Authoritative source",
    "The system of record, often HR, that triggers identity lifecycle changes."
   ]
  ],
  "example": "A software company learns that a developer fired on Friday afternoon was still able to push code on Saturday because his source code platform account was not linked to the corporate directory. The company brings all SaaS applications under SSO with automated deprovisioning, adds a termination checklist that includes revoking personal access tokens, and reviews all accounts on external platforms monthly.",
  "tip": "Privilege creep is the risk most associated with transfers, and periodic access reviews are the control that detects it. For hostile terminations, disable access at the same moment the person is notified.",
  "check": [
   [
    "What is privilege creep and when does it usually occur?",
    "The accumulation of unnecessary access, usually when employees change roles and old access is not removed."
   ],
   [
    "When should access be disabled for an involuntary termination?",
    "Before or at the moment the person is informed, so they cannot retaliate using existing access."
   ],
   [
    "Why disable an account before deleting it?",
    "Disabling preserves audit trails, data and ownership records for a retention period while removing access immediately."
   ],
   [
    "Who should approve access to a sensitive data set?",
    "The data or system owner, typically alongside the requester's manager."
   ]
  ]
 },
 {
  "t": "Authentication systems: Kerberos, RADIUS, TACACS+",
  "body": [
   "Centralized authentication systems let many services rely on one trusted authority rather than keeping separate account databases. The CISSP exam focuses on three: Kerberos for single sign-on inside an organization, and Remote Authentication Dial-In User Service (RADIUS) and Terminal Access Controller Access-Control System Plus (TACACS+) for AAA (authentication, authorization and accounting) on network access and device administration. Each has characteristic strengths and weaknesses that the exam compares directly.",
   "Kerberos is a ticket-based protocol that uses symmetric-key cryptography and a trusted third party called the key distribution center (KDC). The KDC contains the authentication service (AS) and the ticket-granting service (TGS). The user authenticates to the AS, which returns a ticket-granting ticket (TGT) encrypted with a key only the KDC knows, along with a session key protected by a key derived from the user's password. When the user wants to reach a file server, the client presents the TGT to the TGS and receives a service ticket for that server. The client presents the service ticket to the server, which decrypts it with its own long-term key. The user's password never crosses the network, and the user signs on once. Microsoft Active Directory uses Kerberos as its primary domain authentication protocol.",
   "Kerberos weaknesses are worth recognizing. The KDC is a single point of failure and a prime target: if its secret keys are stolen, an attacker can forge tickets, which is what a golden ticket attack does with the key of the account that signs TGTs. Tickets carry timestamps, so clocks must be synchronized, typically within a few minutes, or authentication fails. Pass the ticket reuses a stolen ticket from memory, and Kerberoasting requests service tickets in order to crack weak service account passwords offline. Defenses include protecting and monitoring domain controllers, long random service account passwords or managed service accounts, detecting ticket anomalies and limiting where privileged users log on.",
   "RADIUS is an open standard used for network access, including Wi-Fi with IEEE 802.1X, virtual private networks and other remote access. A network device, the network access server, acts as the RADIUS client and forwards the user's credentials to the RADIUS server. RADIUS traditionally runs over the User Datagram Protocol (UDP), combines authentication and authorization in one exchange, and encrypts only the password field, leaving other attributes readable. Carrying it inside a protected tunnel, or using Extensible Authentication Protocol (EAP) methods based on TLS, addresses much of this. Diameter, a successor used heavily in mobile carrier networks, may appear as a distractor.",
   "TACACS+ was developed by Cisco and is used mainly for administering network devices. It runs over the Transmission Control Protocol (TCP), encrypts the entire payload, and separates authentication, authorization and accounting into distinct functions. That separation enables per-command authorization, such as letting a junior engineer view configurations but not change routing, and detailed accounting of every command entered. Organizations commonly use both: RADIUS for users joining the network and TACACS+ for administrators managing the network.",
   "Consider a worked example. A university wants staff and students to use their directory credentials for Wi-Fi, lets network engineers manage switches without local accounts, and gives campus users single sign-on to file shares. You deploy 802.1X Wi-Fi with RADIUS and EAP-TLS for managed devices. Switches and routers authenticate administrators through TACACS+, with read-only command sets for help desk staff and full rights for senior engineers, and every command logged. File shares and internal web apps use Kerberos through the campus directory. Because Kerberos depends on time, all servers and domain controllers synchronize with the same Network Time Protocol (NTP) sources, and domain controllers get the strongest physical and logical protection on campus.",
   "Common mistakes: saying RADIUS encrypts the whole session; forgetting that Kerberos uses symmetric, not public-key, cryptography at its core; ignoring time synchronization; assuming the KDC can be treated like any other server; and choosing RADIUS when the requirement is per-command authorization for administrators. Another error is thinking Kerberos sends the password to the server; it sends tickets.",
   "Exam questions compare these directly. 'UDP, password-only encryption, authentication and authorization combined' is RADIUS. 'TCP, full encryption, separate AAA, command authorization' is TACACS+. 'Tickets, KDC, TGT, time synchronization' is Kerberos. 'Authentication fails after a server's clock drifts' points to Kerberos time skew. 'Attacker forges tickets after stealing the signing key' is a golden ticket. Think like a manager: centralizing authentication improves control and auditing, but it creates critical assets that must be highly available and heavily protected."
  ],
  "terms": [
   [
    "Key distribution center (KDC)",
    "The trusted Kerberos authority that contains the authentication service and ticket-granting service."
   ],
   [
    "Ticket-granting ticket (TGT)",
    "A Kerberos ticket issued at login and used to obtain service tickets without re-entering credentials."
   ],
   [
    "Service ticket",
    "A Kerberos ticket that authenticates a user to a specific service."
   ],
   [
    "Golden ticket",
    "A forged TGT created with a stolen KDC signing key, granting broad access."
   ],
   [
    "RADIUS",
    "A UDP-based AAA protocol for network access that encrypts only the password field."
   ],
   [
    "TACACS+",
    "A TCP-based AAA protocol that encrypts the full payload and separates authentication, authorization and accounting."
   ],
   [
    "Time skew",
    "Clock difference between systems, which can cause Kerberos authentication to fail."
   ]
  ],
  "example": "After a virtualization host loses its time source, users suddenly cannot open file shares hosted on it, although they can still log in elsewhere. The event logs show Kerberos errors caused by a clock several minutes ahead of the domain controllers. Restoring NTP synchronization fixes the problem, and monitoring is added to alert on clock drift across servers.",
  "tip": "RADIUS uses UDP, encrypts only the password and combines authentication with authorization; TACACS+ uses TCP, encrypts the full body and separates all three A's. Kerberos needs time synchronization and has the KDC as a single point of failure.",
  "check": [
   [
    "Why must clocks be synchronized in a Kerberos environment?",
    "Tickets carry timestamps to prevent replay, so excessive clock skew causes authentication to fail."
   ],
   [
    "Which protocol would you choose to authorize individual commands for network administrators?",
    "TACACS+, because it separates authorization and supports per-command authorization and accounting."
   ],
   [
    "What part of a RADIUS access request is encrypted?",
    "Only the password field; other attributes are sent in cleartext unless protected by another mechanism."
   ],
   [
    "What is the main single point of failure in Kerberos?",
    "The KDC; if it is unavailable users cannot obtain tickets, and if its keys are stolen tickets can be forged."
   ]
  ]
 },
 {
  "t": "Access control attacks and biometrics: FAR, FRR, CER",
  "body": [
   "Understanding how attackers go after access controls helps you choose the right defenses. The CISSP focuses on recognizing each attack and the control that defeats it, and then on biometrics, including the error rates used to compare biometric systems. This is a lesson where a few precise definitions, especially Type I and Type II errors, earn easy marks.",
   "Password attacks are the most common. A brute-force attack tries every possible combination; a dictionary attack tries likely words and previously leaked passwords; password spraying tries a few common passwords against many accounts to avoid lockouts; credential stuffing replays username and password pairs leaked from other breaches, exploiting reuse. Offline attacks work against stolen password hashes, where rainbow tables (precomputed hash lookups) are defeated by salting and slow hashing makes each guess expensive. Defenses include multifactor authentication (MFA), unique salted hashes, account lockout or throttling, screening against breached-password lists and monitoring for failed logins spread across many accounts.",
   "Other attacks target the process around credentials. Phishing and social engineering trick users into revealing credentials or approving logins. Pass the hash and pass the ticket reuse captured authentication material without knowing the password. Session hijacking steals an active session token. Shoulder surfing and keyloggers capture secrets as they are typed. Spoofing impersonates a trusted identity or device, and privilege escalation abuses a flaw to gain higher rights than granted. Physical attacks such as tailgating are countered by access control vestibules, turnstiles and awareness.",
   "Biometrics authenticate by something you are. Physiological biometrics measure body characteristics: fingerprint, palm or hand geometry, face, iris, retina and vein patterns. Behavioral biometrics measure how you act: voice, signature dynamics and keystroke dynamics. A system first enrolls a user by capturing reference samples and storing a template, then compares new samples against it. Because samples always vary a little, the system uses a matching threshold, and that creates two kinds of error.",
   "A Type I error, measured by the false rejection rate (FRR), occurs when a legitimate user is wrongly denied. A Type II error, measured by the false acceptance rate (FAR), occurs when an impostor is wrongly accepted. FAR is more dangerous from a security standpoint because it lets the wrong person in. Adjusting sensitivity trades one for the other: raising sensitivity lowers FAR but raises FRR, frustrating users. The crossover error rate (CER), also called the equal error rate, is the point where FAR equals FRR, and a lower CER indicates a more accurate system; it is the standard way to compare biometric products. Other factors include enrollment time, throughput, user acceptance and privacy. Retina scans are highly accurate but intrusive and poorly accepted; fingerprints are cheap and familiar but affected by injuries. Presentation attacks use fakes such as a printed photo or a molded fingerprint and are countered by liveness detection. A biometric cannot be reissued if its template is stolen, so templates must be protected carefully.",
   "Consider a worked example. A research lab compares two iris systems for its vault door. Vendor A has a CER of 1 in 500; Vendor B has a CER of 1 in 5,000. You choose Vendor B because its lower CER means it is more accurate overall. Since the vault protects highly sensitive samples, you then tune the threshold to minimize false acceptance, accepting that staff will occasionally need a second scan. Meanwhile, the lab's web portal sees many failed logins, each account tried once or twice with the same seasonal password: password spraying. You enable MFA, block common passwords and alert on distributed failures.",
   "Common mistakes: swapping Type I and Type II; assuming the CER is the setting you should always use (it is for comparing systems, and high-security sites tune toward low FAR); treating spraying as brute force against one account, so lockout alone does not stop it; thinking salting slows online guessing; and storing biometric templates without strong protection. Another trap is choosing the most accurate biometric without considering user acceptance, which affects whether people will use it properly.",
   "Exam questions use precise wording. 'Legitimate user denied' is Type I, FRR. 'Impostor accepted' is Type II, FAR. 'Best way to compare biometric systems' is CER, lower is better. 'Few passwords against many accounts' is spraying. 'Leaked credentials from another site' is credential stuffing, countered by MFA and breached-password checks. Think like a manager: the right sensitivity setting depends on the value of what is protected and the cost of inconvenience to legitimate users."
  ],
  "terms": [
   [
    "Password spraying",
    "Trying a few common passwords across many accounts to avoid lockout thresholds."
   ],
   [
    "Credential stuffing",
    "Replaying username and password pairs leaked from other breaches against new sites."
   ],
   [
    "False rejection rate (FRR)",
    "The Type I error rate at which legitimate users are wrongly denied."
   ],
   [
    "False acceptance rate (FAR)",
    "The Type II error rate at which impostors are wrongly accepted."
   ],
   [
    "Crossover error rate (CER)",
    "The point where FAR equals FRR, used to compare biometric accuracy; lower is better."
   ],
   [
    "Liveness detection",
    "Techniques that confirm a biometric sample comes from a live person rather than a fake."
   ],
   [
    "Biometric template",
    "The stored mathematical representation of enrolled biometric features."
   ]
  ],
  "example": "An online retailer sees a spike in successful logins from unfamiliar networks, each using a correct password on the first attempt. The passwords match a list published from another company's breach. The retailer forces resets for affected accounts, screens new passwords against breach corpuses, adds MFA for checkout and saved payment methods, and rate-limits logins by device and network.",
  "tip": "Type I is false rejection (FRR); Type II is false acceptance (FAR). The best biometric has the lowest CER. When security matters most, tune to minimize FAR even though FRR rises.",
  "check": [
   [
    "What is a Type II biometric error?",
    "A false acceptance, where an impostor is wrongly accepted; it is measured by the FAR."
   ],
   [
    "How do you compare the accuracy of two biometric systems?",
    "Compare their crossover error rates; the lower CER is more accurate."
   ],
   [
    "Why does account lockout not stop password spraying well?",
    "Spraying tries only a few passwords per account, staying below lockout thresholds while targeting many accounts."
   ],
   [
    "What control defeats a presentation attack using a photo of a face?",
    "Liveness detection, which checks that the sample comes from a live person."
   ]
  ]
 },
 {
  "t": "Designing and validating assessment, test and audit strategies (internal, external, third party)",
  "body": [
   "Security assessment and testing answers a simple question: do our controls actually work as intended? Domain 6 is about designing a program that answers it reliably and repeatedly, rather than running an occasional scan and hoping for the best. A good strategy starts from the organization's objectives, risks, regulatory obligations and most important systems, and then chooses the right mix of activities, frequencies and assessors. It is a management activity as much as a technical one, and its output is evidence that decision makers can rely on.",
   "Distinguish the main activities. A security test verifies that a specific control works, such as confirming a firewall blocks an unauthorized port. A security assessment is a broader review of a system or environment, often combining tests, interviews and document review to identify risks and weaknesses. An audit is a formal, systematic evaluation against a defined standard or set of criteria, performed by someone independent, resulting in an opinion or attestation. Audits prove compliance and control effectiveness to stakeholders; assessments find and fix problems.",
   "Who performs the work matters. Internal assessments and audits are conducted by the organization's own staff, often an internal audit function that reports independently to the board's audit committee. They are inexpensive, frequent and informed by deep knowledge of the environment, but may lack independence or fresh perspective. External audits are performed by an outside firm the organization engages, providing independence and credibility, for example for financial reporting or certifications. Third-party audits are performed by or on behalf of another party, such as a customer, regulator or partner, to evaluate the organization, or when your organization evaluates a vendor. Terminology varies between sources, so focus on the concept: independence increases as you move away from the team that owns the controls. Service organization reports, such as System and Organization Controls (SOC) reports, are a common way vendors share independent audit results with customers.",
   "Designing the strategy involves defining scope (which systems, locations and processes), objectives (compliance, risk reduction, validation of new controls), methods (automated scanning, manual testing, configuration review, interviews, sampling), frequency based on risk and rate of change, roles and authorization, and how results will be reported and tracked. Tie it to frameworks the organization uses, such as NIST SP 800-53A for assessing security and privacy controls, and to the risk register so testing effort goes where risk is highest.",
   "Validating the strategy means checking that it still fits. Are the right assets in scope after the cloud migration? Are tests producing actionable findings, and are those findings actually fixed? Do results reach management in a form that supports decisions? Review the program after significant changes and at least periodically, and use metrics such as coverage and time to remediate to show whether it works. Senior management owns the risk, so they must understand and endorse the strategy and its budget.",
   "Consider a worked example. A payments company must satisfy card industry requirements, reassure enterprise customers and manage its own risk. Its strategy combines monthly internal vulnerability scans and quarterly configuration reviews by the security team, an annual penetration test by an outside firm, an internal audit of access reviews every six months, and an annual external audit that produces a SOC 2 report for customers. It also sends security questionnaires and requests audit reports from its own critical vendors. When the company moves its data platform to the cloud, the program is revalidated and the new environment is added to every activity's scope.",
   "Common mistakes: using internal staff when the question stresses independence for regulators; confusing an assessment with an audit; testing what is easy rather than what is risky; running tests without written authorization; producing findings that nobody tracks to closure; and never revisiting scope after major changes. Another error is assuming an external audit replaces internal testing; they serve different purposes and cadences.",
   "Exam questions often ask which assessor or activity fits a goal. 'Objective opinion for shareholders or regulators' points to an external or third-party audit. 'Frequent, low-cost, deep knowledge' points to internal assessment. 'Customer evaluates your controls' is a third-party audit. 'Formal evaluation against a standard' is an audit. Think like a manager: align testing with business risk and obligations, ensure independence where credibility matters, and make sure results drive remediation decisions."
  ],
  "terms": [
   [
    "Security test",
    "A procedure that verifies whether a specific control works as intended."
   ],
   [
    "Security assessment",
    "A broad review of a system or environment to identify risks and weaknesses."
   ],
   [
    "Audit",
    "A formal, independent evaluation against defined criteria that results in an opinion or attestation."
   ],
   [
    "Internal audit",
    "Assessment by the organization's own staff, ideally reporting independently to the audit committee."
   ],
   [
    "External audit",
    "An audit performed by an outside firm engaged by the organization."
   ],
   [
    "Third-party audit",
    "An audit performed by or on behalf of another party, such as a customer or regulator."
   ],
   [
    "SOC report",
    "A System and Organization Controls report in which an independent auditor attests to a service organization's controls."
   ]
  ],
  "example": "A hospital's internal team has run its own quarterly security reviews for years. A new regulation requires independent assurance, and a large insurer asks for evidence before renewing a contract. The hospital keeps internal reviews for frequent coverage, hires an external audit firm for an annual attestation, and answers the insurer's third-party assessment with the audit report and its remediation tracking.",
  "tip": "Know the independence ladder: internal teams are cheapest and most frequent, while external and third-party auditors are most independent and credible. When a question emphasizes objectivity for stakeholders or regulators, choose an external or third-party audit.",
  "check": [
   [
    "What distinguishes an audit from an assessment?",
    "An audit is a formal, independent evaluation against defined criteria resulting in an opinion; an assessment is a broader review aimed at finding and fixing weaknesses."
   ],
   [
    "Which type of audit offers the greatest independence for regulators?",
    "An external or third-party audit, performed by parties outside the team that owns the controls."
   ],
   [
    "How should testing frequency be determined?",
    "By risk, criticality and rate of change of the systems, along with regulatory requirements."
   ],
   [
    "Why must a test strategy be revalidated after a cloud migration?",
    "Scope, risks and controls change, so the strategy must be checked to ensure new assets are covered and methods still fit."
   ]
  ]
 },
 {
  "t": "Vulnerability assessment and penetration testing (rules of engagement, testing knowledge levels)",
  "body": [
   "Vulnerability assessment and penetration testing are related but different. A vulnerability assessment identifies, quantifies and prioritizes weaknesses, usually with automated scanners that compare systems against databases of known vulnerabilities identified by Common Vulnerabilities and Exposures (CVE) numbers and scored with the Common Vulnerability Scoring System (CVSS). It is broad, frequent and relatively safe. A penetration test goes further: skilled testers attempt to exploit weaknesses, chain them together and demonstrate real impact, such as reaching sensitive data. It is deeper, narrower, more expensive and carries more operational risk.",
   "Scans can be unauthenticated, seeing systems as an outside attacker would, or authenticated (credentialed), logging in to inspect installed software and configuration. Authenticated scans find far more with fewer false positives. Know the difference between a false positive, where the scanner reports a vulnerability that is not present, and a false negative, where a real vulnerability goes undetected; false negatives are more dangerous because they create false confidence. Scan results must be prioritized by severity, exploitability and asset value, then fed into remediation with deadlines.",
   "Penetration tests follow a methodology. A common structure is planning, where scope and rules are agreed; discovery or reconnaissance, where testers gather information and scan; attack or exploitation, where they attempt to gain access, escalate privileges and move laterally; and reporting, where they document findings, evidence, risk and remediation. Testers clean up any tools and accounts they created and must avoid unauthorized damage. The report should give executives a clear risk summary and technical staff enough detail to fix and retest.",
   "Rules of engagement (RoE) are the written agreement that makes testing legal and safe. They define scope (which address ranges, applications and locations are in and out), testing windows, permitted techniques (for example whether social engineering or denial-of-service testing is allowed), emergency contacts and a stop procedure, how sensitive data found during testing will be handled, and reporting expectations. Most importantly, the test requires written authorization from someone with authority over the systems; without it, the same actions can be a crime. For cloud-hosted or third-party systems, also check the provider's testing policy and obtain any needed permission.",
   "Testing knowledge levels describe how much testers know in advance. In a black-box, or zero-knowledge, test they start with little or no information, simulating an outside attacker; it is realistic but spends time on discovery. In a white-box, or full-knowledge, test they receive diagrams, source code and credentials, enabling thorough coverage efficiently. Gray-box, or partial-knowledge, testing sits between, for example providing a normal user account. Separately, a test may be announced to staff, or unannounced to test detection and response as well. Double-blind means the testers have little knowledge and the defenders do not know the test is happening. Red teams emulate adversaries, blue teams defend, and purple teaming combines them to improve detection together.",
   "Consider a worked example. An online insurer wants to know whether an outsider could reach policyholder data. The chief information security officer signs rules of engagement authorizing a gray-box test of the customer portal and its APIs over two weeks, excluding denial-of-service and the payment processor's systems, with a named emergency contact and a stop word. Testers receive one customer account. They find that changing an ID in an API request reveals another customer's policy, confirm impact with test accounts only, and report immediately under the critical-finding clause. The insurer fixes the authorization check and the testers retest before the final report.",
   "Common mistakes: calling a vulnerability scan a penetration test; starting testing on a verbal go-ahead; testing systems outside scope, such as a vendor's servers; relying only on unauthenticated scans; and treating the report as the finish line instead of remediation and retest. Another error is confusing knowledge levels with announcement: a white-box test can still be unannounced to the security operations team.",
   "Exam questions often ask for the first step or the most important document. 'Before any testing begins' points to written authorization and agreed rules of engagement. 'Testers given source code and diagrams' is white box; 'no prior information' is black box; 'user-level credentials' is gray box. 'Scanner misses a real flaw' is a false negative. 'Defenders unaware and testers uninformed' is double-blind. Think like a manager: testing must be authorized, scoped to business risk and followed by tracked remediation."
  ],
  "terms": [
   [
    "Vulnerability assessment",
    "Identifying and prioritizing known weaknesses, usually with automated scanning."
   ],
   [
    "Penetration test",
    "An authorized attempt to exploit weaknesses to demonstrate real impact."
   ],
   [
    "Credentialed scan",
    "A scan that logs in to systems to inspect software and configuration more accurately."
   ],
   [
    "False negative",
    "A real vulnerability that a test fails to detect."
   ],
   [
    "Rules of engagement (RoE)",
    "The written agreement defining a test's scope, methods, timing, contacts and data handling."
   ],
   [
    "Black-box test",
    "A zero-knowledge test in which testers start with little or no information about the target."
   ],
   [
    "White-box test",
    "A full-knowledge test in which testers receive documentation, code and credentials."
   ]
  ],
  "example": "A hosting company's quarterly vulnerability scans show a clean result for its web servers, but an unannounced penetration test finds an outdated component the scanner missed because scans were unauthenticated. The company switches to credentialed scanning, which surfaces dozens of issues, and adds the penetration test's finding to its remediation tracker with a retest date.",
  "tip": "The single most important precondition for a penetration test is written authorization from someone with authority over the systems. Match knowledge levels: zero knowledge is black box, partial is gray box, full is white box.",
  "check": [
   [
    "How does a vulnerability assessment differ from a penetration test?",
    "An assessment identifies and prioritizes known weaknesses broadly; a penetration test attempts to exploit and chain them to demonstrate impact."
   ],
   [
    "What must be in place before a penetration test starts?",
    "Written authorization from an appropriate authority and agreed rules of engagement defining scope, methods and contacts."
   ],
   [
    "Why are false negatives more dangerous than false positives?",
    "They hide real vulnerabilities and create false confidence that systems are secure."
   ],
   [
    "Testers receive a standard user account but no documentation. What knowledge level is this?",
    "Gray box, or partial knowledge."
   ]
  ]
 },
 {
  "t": "Log reviews, synthetic transactions and breach and attack simulation",
  "body": [
   "Testing is not only about hiring testers once a year. Much of your assurance comes from continuously examining what systems already tell you and from exercising them in controlled ways. This topic covers three techniques: reviewing logs, running synthetic transactions and using breach and attack simulation (BAS). Together they give ongoing evidence that controls still work between formal assessments.",
   "Log review examines records from operating systems, applications, network devices and security tools to find policy violations, errors and signs of attack. Manual review of everything is impossible at scale, so organizations centralize logs in a security information and event management (SIEM) platform, correlate events, and focus human attention on alerts and on regular review of high-value activity such as privileged logons, changes to security settings and access to sensitive data. Statistical sampling selects records randomly so conclusions can be generalized. Clipping levels set a threshold below which events are not flagged, for example ignoring one or two failed logins but alerting at five within a few minutes. For logs to be trustworthy, clocks must be synchronized, logs protected from tampering and retention set to meet requirements. Reviews should also confirm that expected logs are arriving, because a silent source is a problem in itself.",
   "Synthetic transactions are scripted actions that simulate a user interacting with a system, run on a schedule to verify functionality, performance and security behavior. A script might log in to a web application every few minutes, add an item to a cart and check out, measuring response times and confirming each step succeeds. This is called synthetic monitoring, and it differs from real user monitoring (RUM), which passively observes the experience of actual users. Synthetic transactions are proactive: they detect problems even when no real users are active and provide consistent baselines. Security uses include confirming that a login still requires multifactor authentication, that an access control still blocks an unauthorized path, or that a web application firewall still blocks a harmless test pattern.",
   "Breach and attack simulation tools automate the safe execution of attacker techniques in your environment to test whether controls prevent, detect and alert on them. Agents or simulated traffic mimic behaviors such as credential dumping, lateral movement, command-and-control beaconing or data exfiltration, commonly mapped to the MITRE ATT&CK framework of adversary tactics and techniques. Unlike an annual penetration test, BAS can run continuously, revealing when a configuration change or tool update silently breaks detection. It complements rather than replaces human testers, who find novel and business-logic weaknesses that automation cannot.",
   "The common thread is validation. Controls drift, tools are misconfigured and logs stop flowing without anyone noticing. These techniques also produce metrics management can track, such as the percentage of simulated techniques detected, mean time to detect, and the number of log sources reporting as expected. Related techniques you may see alongside them include code review, misuse case testing and interface testing, but log review, synthetic transactions and BAS are the ones focused on continuous operational assurance.",
   "Consider a worked example. A bank's SIEM shows no alerts for a month, which the operations manager initially celebrates. A weekly BAS run reveals that simulated credential dumping on three servers produced no alerts at all. Investigation finds an endpoint agent update broke log forwarding from a whole server group, so the SIEM simply stopped receiving data. The team restores forwarding, adds an alert for any source that goes silent for an hour, and adds a synthetic transaction that attempts a blocked admin page every hour and verifies both the block and the resulting log entry.",
   "Common mistakes: equating no alerts with no attacks; setting clipping levels so high that real attacks hide below them; confusing synthetic monitoring with real user monitoring; running BAS without change control or agreement from system owners; and assuming BAS replaces penetration testing. Another error is reviewing logs only after an incident, when regular review would have revealed the problem earlier.",
   "Exam questions use tell-tale phrases. 'Scripted, scheduled, simulated user activity' is synthetic transactions. 'Passively observing actual users' is real user monitoring. 'Threshold below which events are ignored' is a clipping level. 'Automated, continuous testing of whether controls detect attacker techniques' is BAS. 'Random selection of records' is statistical sampling. Think like a manager: continuous validation provides evidence that security investments are still working, which is exactly what leadership needs between audits."
  ],
  "terms": [
   [
    "Log review",
    "Examining event records to identify policy violations, errors and signs of attack."
   ],
   [
    "SIEM",
    "Security information and event management, a platform that centralizes and correlates logs and alerts."
   ],
   [
    "Clipping level",
    "A threshold of activity below which events are not flagged, used to reduce noise."
   ],
   [
    "Statistical sampling",
    "Selecting records randomly so that conclusions about the whole set can be drawn."
   ],
   [
    "Synthetic transaction",
    "A scripted, scheduled simulation of user activity used to verify function, performance and security behavior."
   ],
   [
    "Real user monitoring (RUM)",
    "Passive observation of the experience of actual users."
   ],
   [
    "Breach and attack simulation (BAS)",
    "Automated, continuous safe execution of attacker techniques to validate prevention and detection."
   ]
  ],
  "example": "An e-commerce company runs a synthetic transaction every five minutes that logs in with a test account, places a small order and checks that the admin page returns access denied. One night the script reports that the admin page loaded. A deployment had disabled an authorization check. The team rolls back within minutes, before any real customer or attacker noticed, and adds the check to its release tests.",
  "tip": "Synthetic transactions are proactive and scripted; real user monitoring is passive. Clipping levels reduce noise by ignoring events below a threshold. BAS provides continuous validation of detection and prevention controls.",
  "check": [
   [
    "How do synthetic transactions differ from real user monitoring?",
    "Synthetic transactions are scripted, scheduled simulations that run even with no users; RUM passively observes actual user activity."
   ],
   [
    "What is a clipping level?",
    "A threshold below which events are not flagged, such as alerting only after several failed logins in a short period."
   ],
   [
    "What does breach and attack simulation provide that an annual penetration test does not?",
    "Continuous, automated validation that shows when controls or detections stop working between tests."
   ],
   [
    "Why is a sudden absence of log entries a concern?",
    "It may indicate a failed or tampered log source, leaving activity unmonitored."
   ]
  ]
 },
 {
  "t": "Code review and testing: static, dynamic, fuzzing, misuse case, test coverage, interface testing",
  "body": [
   "Software is where many vulnerabilities are born, so testing code is a core assessment activity in the Security Assessment and Testing domain. The exam expects you to know the major techniques, what kind of flaw each one finds, and where in the software development lifecycle (SDLC) each fits. No single technique catches everything. A mature program layers several of them so that the blind spots of one are covered by another, and it starts testing as early as possible, because a flaw found in design or code costs far less to fix than one found in production.",
   "Code review is the examination of source code by people other than its author. It ranges from informal peer review on a pull request to formal inspection, such as the Fagan inspection, which uses defined roles (moderator, author, reader, reviewer) and stages (planning, overview, preparation, inspection meeting, rework and follow-up). Manual review catches logic flaws, design weaknesses, missing authorization checks and misuse of security functions that tools rarely understand. Its costs are time and dependence on reviewer skill, so organizations usually reserve deep manual review for high-risk code such as authentication, payment and cryptographic modules.",
   "Static testing analyzes code without running it. Static application security testing (SAST) tools parse source code, bytecode or binaries and look for patterns such as untrusted input reaching a database query, hard-coded credentials or calls to unsafe functions. Static testing can run early, even before the application can be deployed, and it points to the exact file and line, but it produces false positives and cannot see runtime configuration. Dynamic testing evaluates software while it runs. Dynamic application security testing (DAST) probes a running application from the outside and observes responses, finding injection flaws, misconfigurations and weak session handling as an attacker would see them, but it needs a working environment and cannot tell you which line of code is at fault.",
   "Fuzzing is a dynamic technique that feeds large volumes of invalid, unexpected or random input to a program and watches for crashes, hangs, memory errors or unhandled exceptions. Mutation fuzzing (sometimes called dumb fuzzing) modifies existing valid samples, for instance by flipping bits in a known-good file. Generation fuzzing (intelligent fuzzing) builds inputs from a model of the expected file format or protocol, so it reaches deeper code paths. Fuzzing is especially good at finding input-handling bugs such as buffer overflows and parser errors, and it is often automated to run for hours or days.",
   "Misuse case testing, also called abuse case testing, flips the ordinary use case. A use case describes how a legitimate user reaches a goal; a misuse case describes how someone might abuse the system, such as entering a negative quantity to trigger a refund or skipping a step in a checkout workflow. Misuse cases are usually derived from threat modeling, and they make testers check hostile behavior rather than only the happy path. Test coverage analysis measures how much of the code the tests actually exercised, usually as a percentage: units tested divided by total units. Coverage can be counted by statements, branches, conditions, functions or paths. Interface testing checks the points where components connect, including application programming interfaces (APIs), user interfaces and physical interfaces, verifying that each validates input, enforces authorization and handles errors safely, because interfaces are where trust boundaries are crossed.",
   "Consider a worked example. A bank is building a mobile loan application. Developers run SAST in their pipeline and fix a flagged SQL query before the code ever runs. A security engineer writes misuse cases from the threat model, including an attempt to change the loan amount after approval, and testers confirm the server rejects it. The team fuzzes the document upload parser and finds a crash on malformed image headers. Before release, DAST scans the staging build and flags a missing security header, interface tests confirm the partner API rejects requests without valid tokens, and coverage reports show the fraud-check module was only partially tested, so more tests are added.",
   "Common mistakes: believing high test coverage means the code is secure (coverage only shows what ran, not whether the tests checked the right things); thinking fuzzing is a static technique (it requires execution); expecting DAST to point to the vulnerable line; and treating misuse cases as the same thing as regular functional tests. Another trap is assuming automated tools replace code review. Tools find known patterns quickly, while human reviewers find business logic flaws that no signature describes.",
   "Exam questions usually describe a situation and ask which technique fits. Clue words such as \"without executing\", \"early in development\" or \"source code available\" point to static testing or SAST. \"Running application\", \"attacker's perspective\" or \"no source code\" point to dynamic testing or DAST. \"Random or malformed input\" means fuzzing, \"how an attacker might abuse a feature\" means misuse case testing, and \"percentage of code exercised\" means test coverage analysis. When asked what a manager should do first, favor the answer that builds testing into the lifecycle early and combines methods rather than relying on one tool."
  ],
  "terms": [
   [
    "Static application security testing (SAST)",
    "Analysis of source code, bytecode or binaries for vulnerabilities without running the program."
   ],
   [
    "Dynamic application security testing (DAST)",
    "Testing a running application from the outside by sending requests and analyzing responses."
   ],
   [
    "Fuzzing",
    "Supplying large volumes of malformed or random input to a running program to trigger crashes and errors that reveal flaws."
   ],
   [
    "Misuse case",
    "A scenario describing how an attacker or careless user could abuse a feature, used to design negative tests."
   ],
   [
    "Test coverage analysis",
    "Measurement of how much code, such as statements or branches, was exercised by tests."
   ],
   [
    "Interface testing",
    "Testing the connection points between components, such as APIs and user interfaces, for input handling, authorization and error handling."
   ],
   [
    "Fagan inspection",
    "A formal, structured code review process with defined roles and stages."
   ]
  ],
  "example": "An online retailer fuzzes its new image resizing service over a weekend and discovers that certain malformed image headers crash the process. The developers fix the parser's length checks. Separately, a misuse case written from the threat model, entering a coupon code twice in parallel requests, reveals that the discount is applied twice, a business logic flaw that neither SAST nor DAST had reported.",
  "tip": "Static means the code is not running, can happen early and points to the exact line; dynamic means the application is running and shows the attacker's view. Fuzzing is dynamic and targets input handling, and misuse cases test what an attacker would try.",
  "check": [
   [
    "A team has source code but no deployable build yet. Which testing approach can it use now?",
    "Static testing such as SAST or manual code review, because static analysis does not require the program to run."
   ],
   [
    "What is the difference between mutation and generation fuzzing?",
    "Mutation fuzzing alters existing valid inputs, while generation fuzzing builds new inputs from a model of the expected format, which lets it reach deeper code paths."
   ],
   [
    "Why does 95 percent test coverage not prove an application is secure?",
    "Coverage shows how much code the tests executed, not whether the tests checked for security flaws or hostile input."
   ],
   [
    "A tester documents how a user might submit a negative quantity to get a refund. What technique is this?",
    "Misuse (abuse) case testing, which models how a feature could be abused rather than used as intended."
   ]
  ]
 },
 {
  "t": "Compliance checks",
  "body": [
   "Compliance checks verify that systems, processes and people conform to the requirements an organization must meet or has chosen to meet. Those requirements come from laws and regulations, contracts such as the Payment Card Industry Data Security Standard (PCI DSS) for organizations that handle card data, industry frameworks, and the organization's own policies, standards and baselines. The purpose is to produce evidence that required controls exist and operate as intended, and to find gaps before an auditor, a regulator or an attacker does.",
   "It helps to separate compliance from security. Compliance means meeting a defined set of requirements; security means actually managing risk to an acceptable level. An organization can be compliant and still insecure, because requirements set a minimum and may not address every threat it faces. It can also be well protected in some area yet noncompliant because it lacks the required documentation. The CISSP perspective is that compliance is necessary but not sufficient: treat it as a floor, not a ceiling, and let risk drive decisions above that floor.",
   "Technical compliance checks are often automated. Configuration compliance scanning compares systems to a baseline, such as the Center for Internet Security (CIS) Benchmarks or an internal hardening standard, and reports deviations like an enabled guest account, weak Transport Layer Security (TLS) settings or a missing audit policy. The Security Content Automation Protocol (SCAP), maintained by the National Institute of Standards and Technology (NIST), standardizes how these checks and results are expressed so tools can interoperate. Its components include the Extensible Configuration Checklist Description Format (XCCDF) for checklists, the Open Vulnerability and Assessment Language (OVAL) for testing system state, and naming and scoring standards such as CVE, CPE and CVSS.",
   "Cloud environments add their own tooling. Cloud security posture management (CSPM) tools continuously compare cloud accounts to policy, flagging things like a publicly readable storage bucket or logging turned off. Policy as code in deployment pipelines can block a noncompliant change before it reaches production. Procedural compliance checks look at whether processes are followed: are access reviews completed on schedule, are changes approved before implementation, has every employee completed required training, are vendors assessed before onboarding? These checks rely on evidence such as tickets, sign-offs and training records, gathered through interviews, document review and sampling.",
   "Good compliance programs map each requirement to the control that satisfies it and to the evidence that proves it, often in a control matrix. Mapping one control to several frameworks avoids duplicate work, since many frameworks overlap heavily. Checks should be continuous or frequent rather than an annual scramble before the auditor arrives, and findings should flow into the same remediation and exception processes used for other security issues. When a requirement cannot be met, document the gap, assess the risk, apply compensating controls where possible, and obtain formal risk acceptance from an authority empowered to accept it.",
   "Consider a worked example. A regional retailer must comply with PCI DSS. The security team builds a control matrix listing each requirement, the control that addresses it, the owner and the evidence. SCAP-based scanners run weekly against the card data environment and report two point-of-sale servers with an outdated TLS configuration. Procedural checks sample ten recent new hires and find one who has not completed security awareness training. Both findings become tickets with owners and due dates, and the scans and training records are retained as evidence for the next assessment.",
   "Common mistakes: equating a passed audit with being secure; treating compliance as a once-a-year event; confusing a compliance check (does the system match the defined standard) with a vulnerability scan (does the system have known weaknesses), even though the two often run in the same tool; and letting the person who owns a gap approve their own exception. Another error is collecting evidence only for technical controls and forgetting that auditors want proof that processes were actually followed.",
   "Exam questions often signal compliance with words like \"adherence\", \"baseline\", \"checklist\", \"standard\" or \"regulatory requirement\". If a question asks what a compliance check verifies, the answer is conformity to a defined requirement, typically through comparison with a baseline. If a scenario shows an organization that passed an audit but was breached, the lesson is that compliance does not equal security. Think like a manager: the best answer usually ties compliance to risk management, uses automation for continuous checking, and routes gaps into documented remediation or formal risk acceptance."
  ],
  "terms": [
   [
    "Compliance",
    "Conformity with a defined set of requirements from laws, regulations, contracts, frameworks or internal policy."
   ],
   [
    "Configuration compliance scan",
    "An automated comparison of a system's settings against an approved baseline or benchmark."
   ],
   [
    "Security Content Automation Protocol (SCAP)",
    "A NIST suite of specifications that standardizes how security checks, configurations and results are expressed."
   ],
   [
    "Cloud security posture management (CSPM)",
    "Tools that continuously check cloud accounts and resources against security and compliance policy."
   ],
   [
    "Control matrix",
    "A mapping of each requirement to the control that satisfies it, its owner and the evidence that proves it."
   ],
   [
    "Compensating control",
    "An alternative control that reduces risk when a required control cannot be implemented as specified."
   ]
  ],
  "example": "A healthcare provider passes its annual compliance assessment, yet months later attackers enter through an internet-facing server that met every checklist item but had a newly disclosed flaw. The post-incident review concludes that compliance scans confirmed the baseline, but nobody was tracking new threats between assessments. Leadership adds continuous vulnerability management and threat intelligence alongside the compliance program.",
  "tip": "Compliant does not mean secure. A compliance check verifies adherence to a defined requirement or baseline; when a requirement cannot be met, expect documentation, compensating controls and formal risk acceptance.",
  "check": [
   [
    "What does a configuration compliance scan compare a system against?",
    "An approved baseline or benchmark, such as CIS Benchmarks or an internal hardening standard, reporting any deviations."
   ],
   [
    "Why can an organization be compliant but still insecure?",
    "Compliance requirements set a minimum and may not cover every threat or change quickly enough, so meeting them does not guarantee risk is managed."
   ],
   [
    "What should happen when a requirement cannot be met?",
    "Document the gap, assess the risk, apply compensating controls, and obtain formal risk acceptance from an authorized owner."
   ],
   [
    "Which SCAP component is used to express checklists?",
    "XCCDF, the Extensible Configuration Checklist Description Format."
   ]
  ]
 },
 {
  "t": "Collecting security process data: account management, management review, KPIs and KRIs, backup verification, training, DR/BC",
  "body": [
   "Technical tests show whether a firewall or an application is sound, but many security failures are process failures: accounts never removed, backups that cannot be restored, training nobody completed. Collecting security process data means gathering evidence about how well administrative and operational processes actually work. That evidence lets management make informed decisions, lets auditors verify controls, and lets the security team see where the program is drifting before an incident exposes it.",
   "Account management data shows whether identity processes are healthy. Useful measures include the number of accounts disabled within the required time after termination, orphaned accounts (with no current owner) and dormant accounts found, the count of privileged accounts over time, access review completion rates, and exceptions granted. A classic audit test is sampling: take a list of recent leavers from human resources and check whether their accounts are still active in the directory and in cloud applications. Another is comparing each user's actual permissions with what their role should allow.",
   "Management review and approval is the evidence that leadership is actually governing security. It includes minutes of security steering committee meetings, signed risk acceptances, policy approvals, and records that leadership reviewed metrics and audit findings and assigned actions. Without management review, programs drift, accountability blurs, and auditors will note that senior management cannot show it exercised due care. Collecting this evidence is not bureaucracy for its own sake: it is how the board demonstrates that security decisions were made deliberately, by the right people, with the information available at the time.",
   "Key performance indicators (KPIs) measure how well a process or control is performing against a goal. They look backward at results: the percentage of critical patches applied within the target window, mean time to detect and mean time to respond to incidents, or the percentage of staff who completed training. Key risk indicators (KRIs) are forward-looking signals that risk is rising and may exceed the organization's risk appetite: a growing number of unpatched internet-facing systems, rising phishing click rates, or an increase in privileged accounts. Good metrics are specific, measurable, tied to a goal or threshold, and collected the same way each time. Present them to management in business terms and as trends, not as raw counts. A KPI can look healthy while a related KRI is worsening, so the two are most useful when reported side by side.",
   "Backup verification data proves backups are usable. A backup that has never been restored is an assumption, not a control. Collect evidence of backup job success, but more importantly of periodic test restores, integrity checks, and restore times compared with the recovery time objective (RTO). Training and awareness data covers completion rates, assessment scores, phishing simulation results and role-specific training for administrators and developers, with the aim of showing behavior change rather than attendance. Disaster recovery and business continuity (DR/BC) data includes plan review dates, exercise results, gaps found and their remediation, and whether recovery objectives were met during tests or real events.",
   "Consider a worked example. A chief information security officer (CISO) prepares a quarterly report. Account data shows 97 percent of leavers were disabled within one day, but a sample finds three contractor accounts still active. The KPI for critical patching is on target, yet the KRI for internet-facing systems with known exploited vulnerabilities has doubled, signaling rising risk. Backup jobs report success, but a test restore of the finance database took twice the RTO. The CISO presents these as trends, recommends actions, and the steering committee minutes record the decisions.",
   "Common mistakes: confusing KPIs with KRIs; counting successful backup jobs as proof of recoverability; measuring training by attendance alone; and reporting large raw numbers, such as ten thousand blocked attacks, that tell management nothing about risk. Another error is collecting data without anyone reviewing it, which produces reports but no decisions.",
   "Exam questions often ask which metric or evidence best demonstrates a control. \"Measure performance against a target\" points to a KPI; \"early warning that risk is increasing\" points to a KRI. \"Prove backups work\" points to a successful test restore, not job logs. \"Show leadership oversight\" points to management review records. Think like a manager: the best answer gives decision makers meaningful, trended information in business terms and connects each metric to a goal or risk threshold."
  ],
  "terms": [
   [
    "Key performance indicator (KPI)",
    "A metric showing how well a process or control is performing against a defined goal."
   ],
   [
    "Key risk indicator (KRI)",
    "A forward-looking metric that warns when risk is rising toward or beyond the organization's appetite."
   ],
   [
    "Orphaned account",
    "An account whose owner has left or can no longer be identified, but which remains active."
   ],
   [
    "Management review",
    "Documented oversight by leadership of security metrics, risks, findings and decisions."
   ],
   [
    "Test restore",
    "Recovering data from backup to confirm it is complete, usable and restorable within the required time."
   ],
   [
    "Recovery time objective (RTO)",
    "The target time within which a system or function must be restored after disruption."
   ]
  ],
  "example": "An auditor asks a manufacturer to prove its backups work. The IT team shows months of successful job logs, but the auditor asks for restore evidence. None exists. A test restore of the engineering file server then fails because the backup excluded a newly added volume. The company adds quarterly test restores with documented results and tracks restore time against the RTO as a KPI.",
  "tip": "KPIs measure how well you are doing against a goal; KRIs warn that risk is increasing. For backups, the only real proof is a successful test restore, not a report that the job completed.",
  "check": [
   [
    "The number of internet-facing servers with unpatched critical flaws is climbing each month. Is this a KPI or a KRI?",
    "A KRI, because it is a forward-looking signal that risk is increasing."
   ],
   [
    "What is the best evidence that backups are effective?",
    "Documented, successful test restores within the recovery time objective, not just backup job success logs."
   ],
   [
    "How would an auditor test whether terminated employees lose access promptly?",
    "Sample recent leavers from HR records and check whether their accounts were disabled within the required time in each system."
   ],
   [
    "Why present metrics to management as trends in business terms?",
    "Trends and business context let leaders judge risk and make decisions, while raw technical counts do not."
   ]
  ]
 },
 {
  "t": "Analyzing test output and generating reports; exception handling and remediation",
  "body": [
   "Testing produces raw data, not answers. Vulnerability scanners output thousands of findings, penetration testers produce evidence and notes, and monitoring tools produce alerts. Turning that into decisions requires analysis, prioritization and clear reporting, followed by a disciplined process to fix issues or formally accept them. The value of any test is realized only when its results change something.",
   "Analysis starts with validating results. Remove false positives by confirming findings manually or with additional evidence, and think about false negatives, such as systems that were offline during a scan or credentials that failed so the scan saw only the surface. Then prioritize. A severity score such as the Common Vulnerability Scoring System (CVSS) describes a vulnerability's technical characteristics, but risk depends on context: how critical and exposed the asset is, whether the flaw is known to be exploited in the wild, what compensating controls exist and what data could be affected. A medium-severity flaw on an internet-facing payment server can deserve action before a critical flaw on an isolated lab machine.",
   "Look for root causes and patterns. Fifty missing patches on one server probably point to a broken patch process, not fifty separate problems, and the same injection flaw across several applications points to a training or framework issue. Addressing the root cause fixes today's findings and prevents tomorrow's. Trend analysis across several test cycles is equally useful, because it shows whether the overall number of serious findings is shrinking and whether particular teams or asset types keep reappearing.",
   "Reports should be written for their audience. An executive summary explains overall risk, the most important findings and the decisions needed, in business language without jargon. Technical sections list each finding with a description, affected assets, evidence, risk rating and specific remediation steps, so engineers can reproduce and fix it. Include scope, methodology, dates and limitations so readers know what was and was not tested. Reports describe weaknesses in detail, so classify them, restrict distribution, and protect them in storage and transit.",
   "Remediation assigns each finding an owner and a deadline based on risk, often set in policy as a service level, for example critical findings within a short window and lower findings over longer periods. Track remediation in a ticketing or vulnerability management system, and verify fixes by retesting rather than accepting a note that says resolved. Exception handling covers findings that cannot be fixed as required, perhaps because a legacy medical device cannot be patched or no vendor fix exists. The owner submits a request describing the issue, the business reason, compensating controls such as network isolation or extra monitoring, and a proposed expiry date. Someone with authority to accept the risk, not the person asking for the exception, approves or rejects it. Approved exceptions are recorded in the risk register, reviewed periodically and allowed to expire. When tests reveal flaws in a third-party product, follow ethical disclosure: report them to the vendor responsibly, in line with policy and legal guidance.",
   "Consider a worked example. A quarterly scan reports 2,400 findings. The analyst removes duplicates and false positives, leaving 600, then ranks them using CVSS, asset criticality and known exploitation. Twelve are urgent, all on internet-facing systems. The executive summary highlights those twelve and a pattern of outdated web server builds. One urgent finding is on a laboratory instrument whose vendor forbids patching, so its owner requests an exception with network isolation as a compensating control. The business unit leader who owns the risk approves it for six months, and the retest after remediation confirms the other eleven are fixed.",
   "Common mistakes: prioritizing by CVSS score alone; sending the raw scanner export to executives; closing a finding because someone said it was fixed without retesting; letting exceptions run indefinitely; and letting the requester approve their own exception. Another is forgetting that the report itself is sensitive, since it is effectively a map of the organization's weaknesses.",
   "Exam questions in this area test process and accountability. \"Who approves the exception?\" points to the risk or asset owner with authority, usually senior management, not the security team or the requester. \"How do you know remediation worked?\" points to retesting. \"What should the executive summary contain?\" points to business risk and decisions, not technical detail. Think like a manager: findings are prioritized by business risk, fixed by accountable owners on a schedule, and any residual risk is accepted formally, documented and time-limited."
  ],
  "terms": [
   [
    "False positive",
    "A finding that reports a vulnerability or problem that does not actually exist."
   ],
   [
    "False negative",
    "A real vulnerability or problem that the test failed to report."
   ],
   [
    "Common Vulnerability Scoring System (CVSS)",
    "A standard for rating the technical severity of vulnerabilities on a numeric scale."
   ],
   [
    "Executive summary",
    "The part of a report that states overall risk, key findings and needed decisions in business language."
   ],
   [
    "Exception",
    "A formal, documented, time-limited approval to operate without meeting a requirement, usually with compensating controls."
   ],
   [
    "Remediation",
    "The action taken to fix a finding, verified by retesting."
   ],
   [
    "Risk register",
    "A record of identified risks, their owners, ratings, treatments and accepted exceptions."
   ]
  ],
  "example": "A penetration test report for a hospital lists an unpatchable imaging workstation. Instead of ignoring it, the owner files an exception: the workstation is moved to an isolated network segment, only the imaging server can reach it, and its traffic is monitored. The chief medical officer, who owns the clinical risk, approves the exception for one year, and it is logged in the risk register with a review date.",
  "tip": "Exceptions need approval from someone with authority to accept the risk, compensating controls, documentation and an expiry date. Remediation is not complete until a retest verifies it, and prioritization uses business context, not the CVSS score alone.",
  "check": [
   [
    "Why should a medium-severity flaw on an internet-facing payment server sometimes be fixed before a critical flaw on an isolated lab system?",
    "Because risk depends on exposure, asset value and exploitability, not only on the technical severity score."
   ],
   [
    "What four elements should an exception request include?",
    "The issue, the business justification, compensating controls and an expiry or review date."
   ],
   [
    "How is a remediation verified?",
    "By retesting or rescanning to confirm the finding no longer exists."
   ],
   [
    "Who should approve a risk exception?",
    "An individual with authority to accept that risk, such as the asset or business owner, not the person requesting it."
   ]
  ]
 },
 {
  "t": "Conducting or facilitating security audits: SOC 1/SOC 2/SOC 3, Type I vs Type II",
  "body": [
   "When an organization relies on a service provider such as a payroll processor, cloud host or data center, it usually cannot audit that provider's controls itself. It would be impractical for thousands of customers to send auditors to the same provider. Instead, the provider engages an independent auditor to evaluate its controls and issue a report that customers can rely on. These are System and Organization Controls (SOC) reports, issued by certified public accountants under attestation standards from the American Institute of Certified Public Accountants (AICPA). Internationally, a similar attestation exists under the ISAE 3402 standard. The exam focuses on the three SOC report types and on Type I versus Type II.",
   "SOC 1 reports address controls relevant to a customer's internal control over financial reporting (ICFR). If errors at your payroll provider could misstate your financial statements, your financial auditors will want the provider's SOC 1. It is a restricted-use report, shared with the service organization, its customers and their auditors.",
   "SOC 2 reports address controls relevant to five Trust Services Criteria: security, availability, processing integrity, confidentiality and privacy. Security, also called the common criteria, is always included; the others are added depending on the service. SOC 2 is the report most relevant to security professionals evaluating a software as a service (SaaS) or cloud provider. It contains a detailed description of the system, the controls, the auditor's tests and any exceptions found, so it is sensitive and typically shared only under a nondisclosure agreement.",
   "SOC 3 reports cover the same Trust Services Criteria as SOC 2 but are general-use summaries without detailed control descriptions or test results. Providers often publish them openly. They show that an audit took place and state the opinion, but they give too little detail for a thorough vendor assessment. Type I and Type II describe what the auditor evaluated. A Type I report gives an opinion on the design of controls at a specific point in time. A Type II report gives an opinion on both design and operating effectiveness over a period, commonly six to twelve months, based on testing samples throughout that period. SOC 1 and SOC 2 each come in both types.",
   "When you review a SOC 2, check the report period and whether it is recent enough, the scope (which services, locations and criteria), the auditor's opinion (an unqualified opinion is clean; a qualified one notes problems), exceptions and management's responses, and the complementary user entity controls (CUECs), which are controls your organization must operate for the provider's controls to work. Note carved-out subservice organizations, such as the cloud platform the provider runs on, which may need their own reports. If you are the organization being audited, facilitating means scoping the audit, preparing evidence, giving auditors access, and tracking remediation of findings.",
   "Consider a worked example. Your company is choosing a SaaS human resources platform that will hold employee personal data. The vendor offers a public SOC 3 and, under nondisclosure agreement, a SOC 2 Type II covering security, availability and confidentiality for the last twelve months. You read the SOC 2 and find one exception in access reviews that management has since fixed. You also note a CUEC requiring customers to review their own administrator accounts quarterly, so you add that task to your own control set. The hosting provider is carved out, so you also obtain its SOC 2.",
   "Common mistakes: choosing SOC 1 for a security assessment because it is the first number; accepting a SOC 3 as sufficient due diligence; treating a Type I as proof that controls operated over time; ignoring CUECs, which leaves gaps on your side; and not checking whether the report period is current. Another trap is forgetting that the SOC report covers only what is in scope, so services outside the scope carry no assurance.",
   "Exam questions usually give you a need and ask which report fits. \"Financial reporting\" or \"financial statement auditors\" points to SOC 1. \"Security controls of a cloud provider\" points to SOC 2, and \"operating effectiveness over time\" or \"most assurance\" points to Type II. \"Publicly available\" or \"marketing\" points to SOC 3, and \"point in time\" or \"design only\" points to Type I. Think like a manager: you can outsource the service but not the accountability, so the best answer is the report that gives enough evidence to make a risk-based decision, usually a current SOC 2 Type II."
  ],
  "terms": [
   [
    "SOC 1",
    "An attestation report on a service organization's controls relevant to customers' internal control over financial reporting."
   ],
   [
    "SOC 2",
    "A detailed, restricted-use attestation report on controls for security, availability, processing integrity, confidentiality and privacy."
   ],
   [
    "SOC 3",
    "A general-use summary report on the same Trust Services Criteria as SOC 2, without detailed test results."
   ],
   [
    "Type I report",
    "An opinion on the design of controls at a specific point in time."
   ],
   [
    "Type II report",
    "An opinion on the design and operating effectiveness of controls over a period of time."
   ],
   [
    "Trust Services Criteria",
    "The AICPA criteria of security, availability, processing integrity, confidentiality and privacy used in SOC 2 and SOC 3."
   ],
   [
    "Complementary user entity controls (CUECs)",
    "Controls the customer must operate for the service provider's controls to be effective."
   ]
  ],
  "example": "A startup offering payment analytics wins its first large bank customer, which asks for a SOC 2 Type II. The startup has never been audited, so it first obtains a Type I report to show controls are designed properly, then runs a nine-month observation period and receives a Type II. The bank accepts the Type I temporarily with extra contractual commitments, then requires the Type II at renewal.",
  "tip": "For evaluating a vendor's security controls, choose SOC 2 Type II. SOC 1 is about financial reporting, SOC 3 is a public summary, Type I is design at a point in time and Type II is operating effectiveness over a period.",
  "check": [
   [
    "Your finance auditors need assurance about a payroll provider. Which report fits?",
    "SOC 1, because it addresses controls relevant to internal control over financial reporting."
   ],
   [
    "Why does a Type II report provide more assurance than a Type I?",
    "Type II tests whether controls actually operated effectively over a period, while Type I only evaluates design at a single point in time."
   ],
   [
    "Why is a SOC 3 usually insufficient for vendor due diligence?",
    "It is a high-level public summary without detailed control descriptions, tests or exceptions."
   ],
   [
    "What are complementary user entity controls?",
    "Controls the customer must perform, such as reviewing its own user access, for the provider's controls to be effective."
   ]
  ]
 },
 {
  "t": "Location of audits: on premises, cloud, hybrid",
  "body": [
   "Where systems live changes how you audit them. Traditional audits assumed the organization owned the building, the servers and the network, so auditors could walk the data center, inspect configurations and interview the administrators directly. Cloud and hybrid environments split control between the organization and one or more providers, and the audit approach has to follow that split. The core question in every location is the same: who operates this control, and where does the evidence that it works come from?",
   "On-premises audits give the organization full access and full responsibility. Auditors can examine physical security of facilities, environmental controls such as power and cooling, hardware inventory, network devices, system configurations, logs and processes from end to end. The strength of this model is direct observation; the challenge is breadth, because every layer from the building to the application belongs to the organization, and it must both operate and prove each control.",
   "Cloud audits are shaped by the shared responsibility model. The provider is responsible for security of the cloud: physical data centers, hardware, the virtualization layer and, depending on the service model, more of the stack. The customer is responsible for security in the cloud: its data, identities, configurations and, in infrastructure as a service (IaaS), the operating systems and applications. In platform as a service (PaaS) the provider also manages the operating system and runtime, and in software as a service (SaaS) the customer mostly manages users, access settings and data. Large providers do not let individual customers audit their data centers, for both security and scale reasons, so customers rely on third-party attestations such as SOC 2 Type II reports and ISO/IEC 27001 certification, usually downloaded from the provider's compliance portal. The Cloud Security Alliance's Cloud Controls Matrix (CCM) and its Security, Trust, Assurance and Risk (STAR) registry help structure and compare provider assurance.",
   "For its own side of the model, the customer audits through the provider's management consoles and application programming interfaces (APIs): identity and access configurations, logging settings, encryption and key management, network security groups and storage permissions. Cloud security posture management (CSPM) tools automate these checks continuously. Right-to-audit clauses in contracts, where they can be negotiated, define what evidence the provider must supply. Data location, residency and jurisdiction are also audit concerns, because regulations may restrict where data is stored or processed and which laws apply to it.",
   "Hybrid environments combine on-premises and cloud, so the audit must cover both plus the connections between them: virtual private networks (VPNs) or dedicated links, identity federation, synchronized directories and data flows. The seams are where gaps appear. An on-premises account may be disabled at termination while its synchronized cloud identity or a long-lived API token stays active, or logs may be collected on premises but not from the cloud tenant. A hybrid audit plan should map each control to who operates it, where evidence comes from and how consistency is verified across environments.",
   "Consider a worked example. A manufacturer runs its enterprise resource planning system on premises, email in a SaaS suite, and a customer portal on IaaS. The audit team inspects the on-premises data center directly. For the SaaS suite and the IaaS provider it collects current SOC 2 Type II reports and reviews complementary user entity controls. It then audits the company's own cloud configuration with a CSPM tool and finds a storage bucket with public read access and logging disabled on one account. Finally, it tests the seam by sampling recent leavers and finds two whose federated cloud sessions persisted for days after their directory accounts were disabled.",
   "Common mistakes: assuming the cloud provider is responsible for customer data or identity configuration; asking a major provider for permission to inspect its data center rather than using its attestations; auditing on premises and cloud separately and ignoring the links between them; and forgetting data residency. Another error is assuming responsibility is fixed. It shifts with the service model, so the same control may belong to the customer in IaaS and to the provider in SaaS.",
   "Exam questions in this area test responsibility and evidence. \"How can a customer obtain assurance about a cloud provider's physical controls?\" points to third-party attestations such as SOC 2 Type II or ISO/IEC 27001, not an on-site visit. \"Misconfigured storage bucket\" points to the customer's side of the shared responsibility model. \"Gaps between environments\" points to hybrid seams such as identity synchronization. Think like a manager: the organization can outsource operations but remains accountable for its data and compliance, so the best answer defines scope clearly, assigns every control an owner, and gets the right evidence for each location."
  ],
  "terms": [
   [
    "Shared responsibility model",
    "The division of security duties between a cloud provider and its customer, which shifts across IaaS, PaaS and SaaS."
   ],
   [
    "Third-party attestation",
    "An independent auditor's report or certification, such as SOC 2 or ISO/IEC 27001, that customers rely on instead of auditing a provider themselves."
   ],
   [
    "Right-to-audit clause",
    "A contract term defining the customer's right to audit or receive evidence of a provider's controls."
   ],
   [
    "Cloud security posture management (CSPM)",
    "Tooling that continuously checks cloud configurations against security policy."
   ],
   [
    "Data residency",
    "The requirement or practice of storing and processing data in specific geographic locations or jurisdictions."
   ],
   [
    "Cloud Controls Matrix (CCM)",
    "A Cloud Security Alliance framework of cloud security controls used to assess and compare providers."
   ]
  ],
  "example": "An insurer moving claims processing to a PaaS provider asks to audit the provider's data center. The provider declines and offers its ISO/IEC 27001 certificate and SOC 2 Type II report instead. The insurer's auditors accept those for the physical and platform layers, then focus their own testing on application access controls, encryption settings and log forwarding in the insurer's tenant, which remain the insurer's responsibility.",
  "tip": "In the cloud you usually cannot audit the provider directly; rely on third-party attestations for the provider's side and audit your own configuration for your side. Know how responsibility shifts across IaaS, PaaS and SaaS, and that accountability for data never moves.",
  "check": [
   [
    "How does a customer typically gain assurance about a large cloud provider's physical security?",
    "By reviewing third-party attestations such as a SOC 2 Type II report or ISO/IEC 27001 certification."
   ],
   [
    "In SaaS, what does the customer remain responsible for?",
    "Its data, user accounts, access settings and how the service is configured."
   ],
   [
    "Why are hybrid environments harder to audit?",
    "Controls must be verified in both environments and across the connections between them, such as identity synchronization, where gaps often appear."
   ],
   [
    "Why is data residency an audit concern in the cloud?",
    "Regulations may restrict where data is stored or processed, and location determines which laws apply."
   ]
  ]
 },
 {
  "t": "Investigations: evidence collection and handling, chain of custody, digital forensics tools and techniques",
  "body": [
   "Security operations teams are often the first to discover an incident that becomes an investigation. The matter might end as an internal disciplinary action, a civil lawsuit, a regulatory inquiry or a criminal prosecution, and you rarely know which at the start. Evidence therefore must be collected and handled from the first minute in a way that preserves its integrity and admissibility. Mistakes made in the first hours, such as browsing files on a suspect laptop, can make evidence useless later.",
   "Start with what makes evidence usable. It must be relevant (related to the facts), reliable (accurate and unaltered) and legally obtained, and courts consider whether it is authentic and complete. Types of evidence include real evidence (physical objects such as a laptop), documentary evidence (records and logs), and testimonial evidence (witness statements). The best evidence rule prefers original documents over copies, although verified forensic images and properly maintained business records created in the normal course of operations are generally accepted. Investigation types carry different standards: administrative (internal) investigations, civil cases decided on a preponderance of the evidence, criminal cases requiring proof beyond a reasonable doubt, and regulatory investigations.",
   "Collection follows the order of volatility: capture the most fleeting data first. Processor registers, cache, memory contents, running processes and network connections disappear when a system shuts down, so capture memory with a trusted tool before deciding whether to power off. Then capture temporary files, disk contents, remote logs and archived media. Photograph the scene and screens, note the system time against a trusted clock, and document every action you take. Work on copies, not originals: create a bit-for-bit forensic image using a write blocker, which prevents any change to the original media, and compute cryptographic hashes of the original and the image to prove they match.",
   "Chain of custody is the documented record of who collected, handled, transferred and stored each item of evidence, when and why. Every handoff is signed and dated, evidence is sealed in tamper-evident bags with labels, and it is kept in a secured location with controlled access. A gap in the chain gives the opposing side grounds to argue the evidence was altered, even if it was not.",
   "Forensic analysis uses specialized tools and techniques. Disk imaging and analysis suites recover deleted files, examine file system metadata and build timelines from timestamps. Memory analysis reveals injected code, hidden processes, network connections and sometimes encryption keys. Network forensics uses packet captures and flow data to reconstruct communications. Mobile and cloud forensics need their own tools and often provider cooperation, since you cannot image a cloud provider's disks. Analysts correlate all sources into a timeline, always on verified copies, and document methods so another examiner could reproduce the results.",
   "Consider a worked example. An alert shows an employee's workstation sending large archives to an unknown external site. The responder photographs the screen, captures memory with a trusted tool, then isolates the machine from the network. The disk is imaged through a write blocker, and hashes of the original and the image match. Each item is bagged, labeled and logged on a chain of custody form, then handed to the forensic analyst, who signs for it. Legal counsel is consulted before HR interviews the employee, and analysis is performed only on the image.",
   "Common mistakes: powering off a running system before capturing memory; examining the original drive instead of a verified image; leaving gaps in the custody log; failing to involve legal counsel early; and confusing entrapment with enticement. Entrapment, inducing someone to commit a crime they would not otherwise commit, is prohibited, while enticement, such as a honeypot that offers an opportunity to someone already intent on wrongdoing, is generally acceptable. Also remember privacy law and employee policies: monitoring and searches should be backed by policy and consent banners.",
   "Exam questions often ask what to do first or what protects admissibility. \"First step when collecting evidence from a running system\" usually points to capturing volatile data, typically memory. \"Prove the image matches the original\" points to hashing. \"Prevent changes during imaging\" points to a write blocker. \"Show who handled evidence\" points to chain of custody. Think like a manager: involve legal counsel and follow policy, preserve evidence before remediation destroys it, and choose the action that keeps every legal option open."
  ],
  "terms": [
   [
    "Chain of custody",
    "The documented record of every person who handled evidence, when, and for what purpose, from collection to presentation."
   ],
   [
    "Order of volatility",
    "The practice of collecting the most short-lived data, such as memory, before more persistent data such as disk contents."
   ],
   [
    "Write blocker",
    "A hardware or software device that allows reading from storage media while preventing any writes to it."
   ],
   [
    "Forensic image",
    "A bit-for-bit copy of storage media, verified by hash, used for analysis instead of the original."
   ],
   [
    "Best evidence rule",
    "A legal principle that prefers original documents over copies as evidence."
   ],
   [
    "Enticement",
    "Offering an opportunity to someone already inclined to commit an offense, which is generally legal, unlike entrapment."
   ]
  ],
  "example": "During an internal fraud investigation, an administrator copies suspicious files from the suspect's computer to a USB drive to show a manager. Later, when the case goes to court, the defense shows that file access times changed and there is no custody record for the USB drive. The evidence is challenged. The company revises its procedure so that only trained responders collect evidence, using write blockers, hashing and custody forms.",
  "tip": "Always work from a verified copy, never the original, and keep an unbroken chain of custody. When asked what to collect first, choose the most volatile data, usually memory.",
  "check": [
   [
    "Why capture memory before shutting down a compromised system?",
    "Memory is volatile, so running processes, network connections and possibly keys are lost when power is removed."
   ],
   [
    "How do you prove a forensic image matches the original drive?",
    "Compute cryptographic hashes of both and show they are identical."
   ],
   [
    "What does a gap in the chain of custody allow the opposing side to argue?",
    "That the evidence could have been altered or substituted, which can make it inadmissible or less credible."
   ],
   [
    "What burden of proof applies in a criminal case?",
    "Beyond a reasonable doubt, which is higher than the preponderance of the evidence used in civil cases."
   ]
  ]
 },
 {
  "t": "Logging and monitoring: SIEM, SOAR, continuous monitoring, UEBA, threat intelligence and hunting",
  "body": [
   "Logging records events; monitoring watches them for meaning. Together they are how a security operations center (SOC) detects attacks, supports investigations and demonstrates accountability. Without logs you cannot reconstruct what happened, and without monitoring, logs are just storage costs. The exam expects you to know the tools that make this work at scale, how they fit together, and the difference between waiting for an alert and actively looking for trouble.",
   "A security information and event management (SIEM) system collects logs and events from many sources, such as servers, endpoints, firewalls, identity providers and cloud services. It normalizes them into a common format, stores them for search and retention, and correlates them to detect patterns no single source would reveal. A correlation rule might combine a burst of failed logins, a successful login from a new country and a privilege change within ten minutes into one high-priority alert. SIEMs also provide dashboards and compliance reporting. Their value depends on good inputs, meaning the right sources, synchronized time and correctly parsed fields, and on tuning to reduce false positives, because an overwhelmed team suffers alert fatigue and misses real attacks.",
   "Security orchestration, automation and response (SOAR) platforms act on alerts. They integrate with other tools through application programming interfaces (APIs) and run playbooks. For a reported phishing email, a playbook might extract links and attachments, check them against threat intelligence, search for other recipients, quarantine the message across mailboxes and open a ticket, asking a human to approve only the disruptive steps. SOAR reduces response time and repetitive work and makes responses consistent. The distinction to remember is that a SIEM aggregates and correlates to detect, while SOAR orchestrates and automates the response.",
   "Continuous monitoring is ongoing awareness of security posture, vulnerabilities and threats to support risk decisions, described in NIST guidance on information security continuous monitoring (ISCM). Rather than a point-in-time assessment every few years, controls, configurations and assets are checked continuously or at defined frequencies, and results feed risk management. Egress monitoring, which watches data leaving the network through data loss prevention (DLP) and outbound traffic analysis, is part of this. User and entity behavior analytics (UEBA) builds baselines of normal behavior for users, hosts and service accounts and flags deviations, such as an accountant downloading engineering files at midnight or a service account logging in interactively. UEBA helps detect insider threats and stolen credentials that rule-based detection misses.",
   "Threat intelligence is evidence-based knowledge about adversaries, their tools, techniques and indicators. It is often grouped as strategic (trends for executives), operational (specific campaigns), tactical (tactics, techniques and procedures) and technical indicators of compromise (IOCs), such as malicious file hashes, domains and addresses. Feeds are commonly shared in the Structured Threat Information Expression (STIX) format over the Trusted Automated Exchange of Intelligence Information (TAXII) protocol. Threat hunting is the proactive, human-led search for attackers who have evaded existing detections. Hunters form a hypothesis, often from intelligence or a technique in the MITRE ATT&CK knowledge base, search the data to confirm or refute it, and turn findings into new automated detections. Hunting assumes compromise rather than waiting for an alert.",
   "Consider a worked example. Threat intelligence reports that a group targeting your industry uses scheduled tasks for persistence. A hunter hypothesizes that such tasks might exist on your servers, queries endpoint data in the SIEM and finds one unusual task on a file server. It calls out to a domain listed in a new intelligence feed. The team writes a correlation rule for the pattern, and a SOAR playbook now automatically isolates any host that matches and opens an incident ticket for an analyst.",
   "Common mistakes: expecting a SIEM to respond on its own, which is the role of SOAR; collecting every log without tuning, which buries real alerts; forgetting time synchronization, which ruins correlation; protecting production data but not the logs themselves, which attackers try to delete; and treating threat hunting as the same thing as reviewing alerts. Hunting starts from a hypothesis, not from an alert.",
   "Exam questions use clear clue words. \"Aggregate and correlate logs from many sources\" points to a SIEM. \"Automate playbooks\" or \"orchestrate response across tools\" points to SOAR. \"Deviation from a user's normal behavior\" points to UEBA. \"Proactively search for undetected attackers\" points to threat hunting, and \"ongoing awareness to support risk decisions\" points to continuous monitoring. Think like a manager: logging and monitoring exist to support timely risk decisions, so the best answer balances coverage, tuning and retention requirements, and protects log integrity."
  ],
  "terms": [
   [
    "Security information and event management (SIEM)",
    "A system that collects, normalizes, stores and correlates logs from many sources to detect security events."
   ],
   [
    "Security orchestration, automation and response (SOAR)",
    "A platform that runs automated playbooks across security tools to speed and standardize response."
   ],
   [
    "User and entity behavior analytics (UEBA)",
    "Analytics that baseline normal behavior of users and devices and flag anomalies."
   ],
   [
    "Continuous monitoring",
    "Ongoing observation of controls, configurations and threats to support risk-based decisions."
   ],
   [
    "Indicator of compromise (IOC)",
    "An observable artifact, such as a file hash or malicious domain, that suggests a system has been compromised."
   ],
   [
    "Threat hunting",
    "A proactive, hypothesis-driven search for attackers who have evaded existing detections."
   ],
   [
    "Alert fatigue",
    "Desensitization of analysts caused by excessive, often false, alerts, leading to missed real incidents."
   ]
  ],
  "example": "A retailer's SIEM generates hundreds of low-value alerts a day and analysts start ignoring them. After tuning rules, the team adds UEBA, which flags a service account that suddenly logs in interactively at night. A SOAR playbook disables the account and notifies the on-call analyst, who confirms the credentials had been stolen from a misconfigured script.",
  "tip": "SIEM detects by collecting and correlating; SOAR responds through automation and orchestration. Threat hunting is proactive and human-driven, starting from a hypothesis, while ordinary monitoring waits for alerts.",
  "check": [
   [
    "What does a SIEM do that individual log sources cannot?",
    "It correlates events across many sources to reveal patterns, such as failed logins followed by a privilege change."
   ],
   [
    "How does SOAR differ from a SIEM?",
    "SOAR automates and orchestrates response actions through playbooks, while a SIEM aggregates and correlates data to detect events."
   ],
   [
    "Which tool best detects a legitimate account behaving unusually?",
    "UEBA, because it compares activity to a baseline of normal behavior for that user or entity."
   ],
   [
    "What starts a threat hunt?",
    "A hypothesis about attacker activity, often based on threat intelligence, rather than an existing alert."
   ]
  ]
 },
 {
  "t": "Configuration management: provisioning, baselining, automation",
  "body": [
   "Configuration management (CM) keeps systems in a known, approved and secure state throughout their lives. Many breaches trace back to misconfiguration: default passwords left in place, unnecessary services running, storage made public by mistake, or one server that drifted away from the hardened standard. CM gives you consistency, and consistency makes systems easier to secure, audit, troubleshoot and recover. It is a core security operations responsibility, not just an IT convenience.",
   "It starts with an accurate inventory. You need to know what assets exist, who owns them, and their configuration items (CIs), such as hardware, operating system version, installed software and settings. Many organizations record these in a configuration management database (CMDB), which also supports incident response and change management by showing dependencies between systems. You cannot protect, patch or baseline what you do not know exists. Inventory should be kept current automatically, for example through discovery scans and agent reporting, because a CMDB updated by hand falls out of date within weeks.",
   "Provisioning is deploying new systems securely. Rather than building each server by hand, organizations use approved images or templates, often called golden images, that are already hardened: unnecessary services disabled, default accounts removed or renamed, logging enabled, security agents installed and current patches applied. Provisioning should also place the system in the right network segment, register it in inventory and monitoring, and assign an owner. In cloud environments this is done with infrastructure as code (IaC), where templates describe the desired resources and settings, making deployments repeatable and reviewable like software.",
   "Baselining defines the minimum security configuration a type of system must meet. Baselines are often derived from sources such as the Center for Internet Security (CIS) Benchmarks, vendor security guides or government configuration guides, then tailored to the organization. A baseline is also a snapshot used for comparison: after deployment, systems are scanned against it to detect drift, meaning unauthorized or accidental changes. Drift may reflect a lapse in process or an attacker's modification, so it should be investigated, not simply reverted. Baselines themselves are updated through change management as threats and software evolve.",
   "Automation makes CM reliable at scale. Configuration management tools apply a desired state to thousands of machines and can correct drift automatically, and Group Policy enforces settings across Windows domains. Immutable infrastructure goes further: instead of patching or changing a running server, you build a new one from an updated image and replace the old one, so production systems are never modified in place. Automation must itself be secured, because the automation server and its credentials can change everything. Protect it with strong access control, code review of templates, separation of duties and audit logging. Configuration management is tightly bound to change management: CM knows what the approved state is, and change management controls how that state is modified.",
   "Consider a worked example. A company provisions web servers from a golden image built from a CIS Benchmark. A nightly compliance scan compares every server to the baseline. One morning it reports that a server has a new local administrator account and remote desktop enabled, with no matching change ticket. Rather than silently reverting the change, the team opens an incident, finds that an attacker used a stolen credential, contains the server, and rebuilds it from the golden image. The review also tightens access to the automation platform.",
   "Common mistakes: treating the baseline as a one-time build document instead of a living standard used for comparison; automatically correcting drift without asking why it occurred; forgetting to update golden images, so every new system starts out missing patches; and leaving the automation platform less protected than the systems it controls. Another error is confusing configuration management, which tracks and enforces the approved state, with change management, which governs how that state is allowed to change.",
   "Exam questions often describe inconsistency or unexpected settings. \"Systems differ from the approved standard\" points to baselining and drift detection. \"Deploy many identical secure systems quickly\" points to golden images, templates or infrastructure as code. \"Replace rather than modify servers\" points to immutable infrastructure. \"Unauthorized change discovered\" points to investigating it as a possible incident. Think like a manager: the best answer builds security into the standard, enforces it automatically, and routes every change through an approval process that keeps the baseline current."
  ],
  "terms": [
   [
    "Configuration management (CM)",
    "The process of establishing and maintaining systems in a known, approved and secure state."
   ],
   [
    "Configuration item (CI)",
    "A component tracked under configuration management, such as a server, application or setting."
   ],
   [
    "Configuration management database (CMDB)",
    "A repository of configuration items, their attributes and their relationships."
   ],
   [
    "Baseline",
    "The approved minimum secure configuration for a type of system, also used as a reference to detect drift."
   ],
   [
    "Golden image",
    "A hardened, approved system image used to provision new systems consistently."
   ],
   [
    "Configuration drift",
    "Divergence of a system's actual configuration from its approved baseline."
   ],
   [
    "Immutable infrastructure",
    "An approach in which running systems are replaced from updated images rather than modified in place."
   ]
  ],
  "example": "A cloud team defines its virtual networks, firewall rules and servers in infrastructure as code stored in version control. Every change requires a peer-reviewed pull request, and the pipeline rejects templates that open administrative ports to the internet. When an engineer changes a firewall rule directly in the console during an outage, the drift detection job flags it the next morning, and the team either codifies the change through review or reverts it.",
  "tip": "A baseline is both the secure starting point and the yardstick for detecting drift. Unauthorized changes found by comparison should be investigated as potential incidents, not just quietly corrected.",
  "check": [
   [
    "What is a golden image?",
    "A hardened, approved system image used as the template to provision new systems consistently and securely."
   ],
   [
    "A scan shows a server no longer matches its baseline and there is no approved change. What should happen?",
    "Investigate the drift as a possible incident, then restore the approved configuration through a controlled process."
   ],
   [
    "What is immutable infrastructure?",
    "Replacing systems from updated images instead of modifying running systems, so production is never changed in place."
   ],
   [
    "How do configuration management and change management differ?",
    "Configuration management defines and maintains the approved state, while change management controls how that state may be modified."
   ]
  ]
 },
 {
  "t": "Foundational operations concepts: need to know, least privilege, separation of duties, job rotation, SLAs",
  "body": [
   "Security operations rest on a handful of principles that limit what any one person or process can do and make misuse harder to hide. They appear throughout the exam, often in scenario questions where you must identify the principle a control enforces or the one that was violated. Learn each principle's purpose and its limits, because the answer often hinges on which weakness a control addresses.",
   "Need to know restricts access to specific information to those whose duties require it. Even a person with a high clearance or broad role does not automatically see everything at that level; they see only what their current task demands. Least privilege is broader: subjects receive only the minimum permissions and rights, for the minimum time, needed to perform their function. A help desk technician can reset passwords but not modify firewall rules. Least privilege applies to service accounts and applications too, and it limits the damage from mistakes, malware and compromised accounts. Practices that support it include just-in-time privileged access, separate administrative accounts, and regular access reviews that catch privilege creep, the gradual accumulation of rights as people change roles.",
   "Separation of duties (also called segregation of duties) divides a sensitive task among two or more people so that no single person can complete it alone and commit fraud or cause serious harm undetected. Classic examples are separating the person who creates a vendor from the one who approves payments, and the developer who writes code from the operator who deploys it to production. Related controls include two-person integrity, where two people must be present, as when opening a vault, and split knowledge, where no one person holds a complete secret, such as a key divided among custodians. Separation of duties is preventive, but it can be defeated by collusion, where people cooperate to commit fraud, so it is combined with monitoring and rotation.",
   "Job rotation moves people through different roles periodically. It provides cross-training and resilience, since knowledge is not trapped with one person, and it helps detect fraud because a successor may notice irregularities. Mandatory vacations serve a similar detective purpose: requiring employees to take consecutive days off means someone else performs their duties and may uncover schemes that need constant attention to conceal. Privileged account monitoring completes the picture by watching those with elevated access most closely, since they can do the most harm.",
   "Service level agreements (SLAs) are formal agreements between a service provider and a customer that define expected service levels, such as availability percentage, response and resolution times for incidents, and remedies when targets are missed. Internally, operational level agreements (OLAs) set commitments between teams that support the SLA, and a memorandum of understanding (MOU) records a less formal agreement. Security-relevant SLA terms include incident notification times, patching windows, and data return and deletion when the contract ends. Monitor SLAs with metrics rather than assuming they are met, and make sure contracts give you the right to verify.",
   "Consider a worked example. An accounts payable clerk at a distributor could both add new vendors and release payments. Over two years, the clerk created a fictitious vendor and paid it regularly. The fraud surfaced only when the clerk was on a mandatory two-week vacation and a colleague questioned an invoice. The remediation splits vendor creation and payment approval between different roles (separation of duties), restricts the clerk's system access to what the role needs (least privilege), and adds periodic rotation within the finance team.",
   "Common mistakes: using need to know and least privilege as synonyms (need to know limits which information you can see; least privilege limits what actions and rights you have); thinking separation of duties stops collusion; calling job rotation primarily preventive when its main security value is detective; and signing an SLA without the metrics or audit rights to check it. Remember also that least privilege includes time: rights no longer needed should be removed.",
   "Exam questions give scenarios and ask for the principle. \"One person could both create and approve\" points to a separation of duties failure. \"Fraud discovered while the employee was away\" points to mandatory vacation. \"User has access beyond current job needs after several role changes\" points to privilege creep and a need for access reviews under least privilege. \"Two employees cooperated to bypass a control\" points to collusion. Think like a manager: combine preventive controls such as separation of duties with detective controls such as rotation, vacations and monitoring, and measure providers against written SLAs."
  ],
  "terms": [
   [
    "Need to know",
    "Restricting access to specific information to people whose current duties require it."
   ],
   [
    "Least privilege",
    "Granting only the minimum rights and permissions, for the minimum time, needed to perform a function."
   ],
   [
    "Separation of duties",
    "Dividing a sensitive task among multiple people so no single person can complete it alone."
   ],
   [
    "Collusion",
    "Two or more people cooperating to bypass controls such as separation of duties."
   ],
   [
    "Job rotation",
    "Periodically moving staff between roles to cross-train and to help detect fraud."
   ],
   [
    "Privilege creep",
    "The gradual accumulation of access rights as a person changes roles without old rights being removed."
   ],
   [
    "Service level agreement (SLA)",
    "A formal agreement defining the level of service a provider commits to and the remedies if targets are missed."
   ]
  ],
  "example": "A cloud provider's SLA promises a monthly availability target and incident notification within a set time. After a multi-hour outage, the customer checks its own monitoring data against the SLA, confirms the target was missed, and claims the service credits defined in the contract. The review also reveals the contract lacked a clause on data return at termination, which is added at renewal.",
  "tip": "Separation of duties is a preventive control defeated by collusion; job rotation and mandatory vacations are mainly detective controls for fraud. Need to know limits information; least privilege limits permissions and rights.",
  "check": [
   [
    "What weakness defeats separation of duties?",
    "Collusion, where two or more people cooperate to bypass the split control."
   ],
   [
    "Why do mandatory vacations help detect fraud?",
    "Someone else performs the employee's duties and may notice irregularities that required constant attention to hide."
   ],
   [
    "How does need to know differ from least privilege?",
    "Need to know limits access to specific information based on duties, while least privilege limits all rights and permissions to the minimum needed."
   ],
   [
    "What is an operational level agreement (OLA)?",
    "An internal agreement between teams that defines the support commitments needed to meet an external SLA."
   ]
  ]
 },
 {
  "t": "Resource protection: media management, backups",
  "body": [
   "Resource protection covers the assets operations teams handle every day: hardware, software and especially the media that store information, including hard drives, solid-state drives (SSDs), tapes, USB drives, optical discs, mobile devices and printed documents. Media carry data wherever they go, so they must be protected through their whole lifecycle, from acquisition through use, storage, transport and reuse to final destruction. A single lost backup tape or discarded drive can be a reportable breach.",
   "Media management starts with labeling media with the classification of the data they hold, so anyone handling them knows the protection required. Store media in secured, environmentally appropriate locations with access limited to authorized staff. Track media in an inventory, log check-in and check-out, and use tamper-evident containers and trusted couriers when moving media offsite. Encrypt media, especially portable devices and backup media, so that loss or theft does not become a breach. Control removable media on endpoints through device control policies, since USB drives are both a data loss path and a malware vector. Media should be handled according to the highest classification of data they have ever held.",
   "Media sanitization prevents data remanence, the residual data that remains after files are deleted or a drive is formatted. NIST Special Publication 800-88 describes three levels. Clearing uses logical techniques such as overwriting to protect against simple, non-invasive recovery, and suits media that stay inside the organization. Purging uses stronger methods, such as cryptographic erase, block erase or degaussing magnetic media, to protect against laboratory recovery, and is appropriate before media leave organizational control. Destruction physically renders media unusable through shredding, disintegration, pulverizing or incineration. SSDs complicate matters because wear leveling means overwriting may not reach every cell, so use the drive's built-in sanitize commands, cryptographic erase or destruction. Degaussing does not work on SSDs or optical media. Document every sanitization with logs or certificates.",
   "Backups protect the availability and integrity of data. A sound strategy decides what to back up, how often (driven by the recovery point objective, or RPO, the acceptable amount of data loss), how quickly data must be restorable (driven by the recovery time objective, or RTO), and where copies are kept. The widely cited 3-2-1 rule suggests at least three copies of data on two different types of media with one copy offsite. Modern guidance adds an immutable or offline copy that ransomware cannot encrypt or delete, because attackers now deliberately target backup systems before launching encryption.",
   "Protect backups as carefully as production data. Encrypt them, restrict and monitor access to backup consoles, keep backup administrator credentials separate from domain administrator accounts, and align retention with legal and business requirements, including legal holds that suspend deletion. Above all, test restores regularly; a backup that has never been restored is unproven. Backup media reaching end of life must be sanitized under the same rules as any other media.",
   "Consider a worked example. A law firm replaces its file servers. The old hard drives held privileged client data and will be sent to a recycler, so the firm purges them with cryptographic erase and then has them shredded, keeping a certificate of destruction. The firm's backups follow 3-2-1: nightly backups to a local appliance, a copy on encrypted tape stored at a secure offsite vault, and a third copy in an immutable cloud storage tier. When ransomware later encrypts a file server and the local appliance, the firm restores from the immutable copy and loses only a day of work, within its RPO.",
   "Common mistakes: believing that deleting files or formatting a drive removes data; degaussing SSDs or optical discs; using clearing when the media will leave the organization; keeping every backup online and reachable with the same administrator credentials attackers will steal; and treating backup job success as proof of recoverability. Another error is forgetting paper, which also needs labeling, secure storage and shredding.",
   "Exam questions often ask which sanitization method fits a situation. \"Reuse within the organization\" points to clearing. \"Media leaving the organization\" or \"resist laboratory recovery\" points to purging. \"Highly sensitive\" or \"media damaged and cannot be purged\" points to destruction, which is the most certain method. \"SSD\" plus \"degaussing\" is a trap. For backups, \"ransomware\" points to offline or immutable copies, and \"prove backups work\" points to test restores. Think like a manager: pick the method whose cost is justified by the sensitivity of the data and where the media are going next."
  ],
  "terms": [
   [
    "Data remanence",
    "Residual data that remains on media after deletion or formatting and may be recoverable."
   ],
   [
    "Clearing",
    "Sanitization using logical techniques such as overwriting, protecting against simple non-invasive recovery."
   ],
   [
    "Purging",
    "Sanitization using stronger methods, such as cryptographic erase or degaussing, that protect against laboratory recovery."
   ],
   [
    "Destruction",
    "Physically rendering media unusable through shredding, disintegration, pulverizing or incineration."
   ],
   [
    "Degaussing",
    "Erasing magnetic media with a strong magnetic field; it does not work on SSDs or optical media."
   ],
   [
    "3-2-1 backup rule",
    "Keeping at least three copies of data on two types of media with one copy offsite."
   ],
   [
    "Immutable backup",
    "A backup copy that cannot be modified or deleted for a set period, protecting it from ransomware."
   ]
  ],
  "example": "A hospital leases multifunction printers that contain internal hard drives storing scanned patient records. When the lease ends, the vendor plans to resell the devices. The hospital's media policy requires the drives to be removed and destroyed, or purged with a documented certificate, before the printers leave the building, preventing patient data from leaking through a device few people think of as storage.",
  "tip": "Match sanitization to where media go next: clearing for reuse inside the organization, purging before release outside, destruction when media are highly sensitive or cannot be reliably purged. Degaussing does not work on SSDs.",
  "check": [
   [
    "Drives holding sensitive data will be returned to a leasing company. Which sanitization level is appropriate at minimum?",
    "Purging, because the media are leaving organizational control and must resist laboratory recovery."
   ],
   [
    "Why is overwriting unreliable for SSDs?",
    "Wear leveling can leave data in cells the overwrite never reaches, so built-in sanitize commands, cryptographic erase or destruction are preferred."
   ],
   [
    "What does the 3-2-1 rule recommend?",
    "At least three copies of data, on two different media types, with one copy offsite."
   ],
   [
    "Why keep an offline or immutable backup?",
    "Ransomware operators target reachable backups, and an offline or immutable copy cannot be encrypted or deleted by them."
   ]
  ]
 },
 {
  "t": "Incident management: detection, response, mitigation, reporting, recovery, remediation, lessons learned",
  "body": [
   "Incident management is the organized approach to handling security incidents so damage is limited, recovery is quick and the organization learns from each event. An event is any observable occurrence, such as a login or a file access. An incident is an event or series of events that actually or potentially jeopardizes confidentiality, integrity or availability, or violates policy. Not every event is an incident, and part of the process is making that call quickly and consistently.",
   "Preparation comes before any incident: an approved policy and plan, a defined incident response team with roles and authority, contact lists including legal, public relations, management and external parties, tools, playbooks for likely scenarios, and training and exercises. The CISSP outline then lists the steps as detection, response, mitigation, reporting, recovery, remediation and lessons learned. Other frameworks, such as NIST Special Publication 800-61, group similar work as preparation; detection and analysis; containment, eradication and recovery; and post-incident activity. The labels differ, but the flow is the same.",
   "Detection identifies potential incidents through alerts from monitoring tools, user reports or external notifications, and analysis confirms whether an incident is real and how serious it is. Triage assigns severity based on impact and scope. Response activates the team and begins handling the incident according to the plan, including preserving evidence in case it is needed later. Mitigation contains the incident to prevent further damage: isolating infected hosts, disabling compromised accounts, blocking malicious domains. Containment decisions balance stopping harm against preserving evidence and business needs; pulling the plug on a server may stop damage but destroy volatile evidence and disrupt customers.",
   "Reporting happens throughout, not only at the end. It includes internal escalation to management and external notification to regulators, law enforcement, customers or partners as laws and contracts require, often within strict deadlines. Legal counsel should guide external notifications. Recovery restores affected systems to normal operation, such as rebuilding from known-good images, restoring data from clean backups and monitoring closely for signs of reinfection. Remediation addresses root causes so the incident cannot recur the same way, such as patching the exploited vulnerability, fixing the misconfiguration or improving a control. Eradication of the attacker's footholds, such as malware and backdoor accounts, must be complete before systems return to production.",
   "Lessons learned is the post-incident review, held soon after the incident while details are fresh. The team examines what happened, what went well, what did not and what should change in controls, plans, tools and training. It should be blameless, focusing on process improvement rather than punishment. Outputs include an incident report, updated playbooks and tracked improvement actions. Skipping this step is a common reason organizations suffer the same incident twice.",
   "Consider a worked example. On a Monday morning, the endpoint detection tool alerts that a finance laptop is encrypting files on a shared drive. The analyst confirms it is an incident and rates it high severity. The team isolates the laptop from the network, disables the user's account, and blocks the command-and-control domain at the firewall. Management and legal counsel are notified. The shared drive is restored from the previous night's immutable backup, the laptop is reimaged, and monitoring watches for recurrence. Root cause analysis finds a phishing email that bypassed filtering and a macro setting that should have been disabled; both are fixed. The lessons-learned meeting updates the ransomware playbook and schedules targeted phishing training.",
   "Common mistakes: treating every event as an incident, which exhausts the team; jumping to recovery before containment, which lets the attacker keep working; wiping systems before evidence is preserved; confusing recovery (getting back to normal operation) with remediation (fixing the root cause); and skipping lessons learned once the pressure is off. Another error is having the technical team make external notifications without legal and management involvement.",
   "Exam questions often ask what to do first or next. After confirming an incident, the usual first priority is containment to limit damage. \"Prevent this from happening again\" points to remediation or lessons learned. \"Restore normal operations\" points to recovery. \"Notify regulators within a deadline\" points to reporting, guided by legal counsel. When human safety is involved, protecting people always comes first. Think like a manager: follow the approved plan, involve the right stakeholders, preserve evidence while limiting harm, and feed lessons back into controls."
  ],
  "terms": [
   [
    "Event",
    "Any observable occurrence in a system or network."
   ],
   [
    "Incident",
    "An event or series of events that actually or potentially harms confidentiality, integrity or availability, or violates policy."
   ],
   [
    "Triage",
    "Rapid assessment of an incident to determine its validity, severity and priority."
   ],
   [
    "Containment (mitigation)",
    "Actions that limit the spread and impact of an incident, such as isolating hosts or disabling accounts."
   ],
   [
    "Recovery",
    "Restoring affected systems and data to normal operation."
   ],
   [
    "Remediation",
    "Fixing the root cause so the incident cannot recur the same way."
   ],
   [
    "Lessons learned",
    "A post-incident review that identifies improvements to controls, plans and training."
   ]
  ],
  "example": "A software company detects an attacker using a stolen developer token to access its source repository. The team revokes all tokens and rotates secrets (containment), notifies leadership and counsel, and informs affected customers as contracts require (reporting). It rebuilds the build servers from clean images (recovery) and enforces short-lived tokens with hardware-backed multifactor authentication (remediation). The lessons-learned review adds token monitoring to the SIEM.",
  "tip": "After confirming an incident, the first priority in most questions is containment to limit damage. Recovery restores operations; remediation fixes the root cause; lessons learned is the step most often skipped and the one that prevents recurrence.",
  "check": [
   [
    "What distinguishes an incident from an event?",
    "An incident actually or potentially harms confidentiality, integrity or availability, or violates policy; an event is any observable occurrence."
   ],
   [
    "Why must containment decisions consider evidence?",
    "Actions such as powering off a system can destroy volatile evidence needed for investigation or legal action."
   ],
   [
    "What is the difference between recovery and remediation?",
    "Recovery restores normal operations; remediation addresses the root cause so the incident does not recur."
   ],
   [
    "What is the main output of the lessons-learned phase?",
    "An incident report and tracked improvements to controls, playbooks, tools and training."
   ]
  ]
 },
 {
  "t": "Detective and preventive measures: firewalls, IDS/IPS, allow and deny lists, sandboxing, honeypots, anti-malware, ML/AI tools",
  "body": [
   "Security operations deploy layers of controls that either stop malicious activity (preventive) or identify it so people and systems can respond (detective). Many tools can do both depending on how they are placed and configured. The exam expects you to know what each tool does, where it sits, what it cannot do, and how the pieces combine into defense in depth.",
   "Firewalls enforce rules about which traffic may pass between network zones. Packet-filtering firewalls examine addresses, ports and protocols statelessly, one packet at a time. Stateful inspection firewalls track connections and allow return traffic for established sessions. Application-level proxies and next-generation firewalls (NGFWs) understand application protocols, can identify applications and users, inspect content and use threat intelligence. Web application firewalls (WAFs) protect web applications from attacks such as injection. Firewalls are preventive, and their logs are a valuable detective source. A default-deny rule set with explicit allows is the secure stance.",
   "Intrusion detection systems (IDS) monitor traffic or host activity and alert on suspicious behavior; they are detective and passive, often fed from a network tap or mirrored port. Intrusion prevention systems (IPS) sit inline and can block traffic, making them preventive, but a false positive can block legitimate business traffic. Both may be network-based (NIDS and NIPS) or host-based (HIDS and HIPS). Signature-based detection matches known attack patterns and misses new ones. Anomaly-based or behavior-based detection compares activity to a baseline and can catch novel attacks but produces more false positives.",
   "Allow lists permit only approved items, such as applications, domains or addresses, and deny everything else; they are strong but require maintenance. Deny lists block known-bad items and allow everything else; they are easier to run but cannot stop unknown threats. Application allow listing on critical servers is one of the most effective controls against malware. Sandboxing runs suspicious code or files in an isolated environment to observe behavior safely, as email security gateways do with attachments. Honeypots are decoy systems with no legitimate use, so any interaction with them is suspicious; honeynets are networks of honeypots, and honeytokens are decoy credentials or records. They provide early warning and intelligence, represent enticement rather than entrapment, and must be isolated so an attacker cannot pivot from them.",
   "Anti-malware software detects and removes malicious code using signatures, heuristics and behavior monitoring. Endpoint detection and response (EDR) extends this with continuous recording of endpoint activity, detection of attacker techniques, and response actions such as isolating a host. Machine learning (ML) and artificial intelligence (AI) tools increasingly power detection by learning patterns of normal and malicious behavior across large data sets, finding subtle anomalies and prioritizing alerts. They still produce false positives and negatives, can be evaded or have their training data poisoned by adversaries, and need human oversight, good training data and explainable decisions where the stakes are high.",
   "Consider a worked example. A company receives a phishing email with a document attachment. The email gateway detonates the attachment in a sandbox, sees it try to launch a script and blocks it. A variant that slipped through lands on a laptop, where application allow listing prevents the unknown executable it downloads from running, and EDR records the attempt. Meanwhile an attacker probing from another foothold touches a honeypot file server, generating a high-confidence alert. The NGFW blocks the outbound command-and-control connection, and its logs help the team scope the incident.",
   "Common mistakes: calling an IDS preventive; assuming an IPS has no downside, when false positives can cause outages; thinking signature-based tools catch zero-day attacks; believing deny lists offer strong protection against unknown malware; placing a honeypot where it can reach production systems; and trusting ML output without tuning or review. Another error is treating any single layer as sufficient; these controls work because they overlap.",
   "Exam clue words map closely to answers. \"Alert only\" or \"passive\" points to IDS; \"inline\" or \"block\" points to IPS. \"New, unknown attack\" favors anomaly-based detection, while \"lowest false positives for known attacks\" favors signatures. \"Only approved software may run\" points to allow listing. \"Execute a suspicious file safely\" points to sandboxing, and \"decoy\" points to a honeypot. Think like a manager: choose layered controls proportionate to risk, and weigh the business impact of blocking legitimate activity against the risk of letting attacks through."
  ],
  "terms": [
   [
    "Stateful inspection firewall",
    "A firewall that tracks connection state and allows return traffic for established sessions."
   ],
   [
    "Intrusion detection system (IDS)",
    "A passive, detective control that monitors activity and alerts on suspected attacks."
   ],
   [
    "Intrusion prevention system (IPS)",
    "An inline, preventive control that can block traffic it identifies as malicious."
   ],
   [
    "Allow list",
    "A list of explicitly approved items, with everything else denied by default."
   ],
   [
    "Sandbox",
    "An isolated environment for safely running and observing suspicious code."
   ],
   [
    "Honeypot",
    "A decoy system with no legitimate use, so any interaction signals suspicious activity."
   ],
   [
    "Endpoint detection and response (EDR)",
    "Endpoint software that records activity, detects attacker techniques and supports response actions."
   ]
  ],
  "example": "A water utility cannot patch the old operating systems on its control workstations, so it applies application allow listing that permits only the control software to run. It places a network IDS on a mirrored port to watch control traffic without risking disruption from an inline device. When an engineer's infected USB drive is plugged in, the unknown executable is blocked by the allow list and the IDS alerts on a scan attempt.",
  "tip": "IDS detects, IPS prevents. Signature detection misses zero-day attacks; anomaly detection can catch them but with more false positives. Allow listing is stronger than deny listing because it blocks the unknown.",
  "check": [
   [
    "What is the main risk of deploying an IPS inline?",
    "A false positive can block legitimate business traffic and cause an outage."
   ],
   [
    "Why is anomaly-based detection better than signature-based detection against new attacks?",
    "It flags deviations from a baseline rather than needing a known pattern, although it generates more false positives."
   ],
   [
    "Why is any interaction with a honeypot considered suspicious?",
    "A honeypot has no legitimate business use, so no authorized user should be accessing it."
   ],
   [
    "Name two limitations of ML and AI detection tools.",
    "They still produce false positives and negatives, and adversaries can evade them or poison their training data, so human oversight is needed."
   ]
  ]
 },
 {
  "t": "Patch and vulnerability management; change management",
  "body": [
   "Vulnerabilities are discovered in software constantly, and attackers move quickly to exploit them. Patch and vulnerability management is the continuous process of finding, prioritizing and fixing weaknesses. Change management is the discipline that ensures fixes, and every other modification, are made safely. The two are tightly linked: a patch is a change, and an unmanaged change can create new vulnerabilities or outages.",
   "Vulnerability management is broader than patching. It begins with an accurate asset inventory, because unknown systems are never scanned or patched. Systems are then scanned regularly, ideally with authenticated (credentialed) scans that see installed software and settings, supplemented by vendor advisories and threat intelligence. Findings are prioritized by risk, combining severity, for example a Common Vulnerability Scoring System (CVSS) score, with asset criticality, internet exposure and whether the vulnerability is being actively exploited. Remediation options include applying a patch, changing a configuration, upgrading or replacing software, or applying compensating controls such as isolation when no fix exists. Results are verified by rescanning, and metrics such as time to remediate are reported to management.",
   "Patch management is the process of acquiring, testing and deploying updates. A typical cycle is: evaluate each patch's applicability and urgency; test it in a non-production environment that mirrors production; approve it through change management; deploy it in stages, starting with a pilot group; verify success and monitor for problems; and keep a rollback plan ready. Emergency patches for actively exploited critical flaws follow an expedited path but still need approval and documentation. Automated patch tools, compliance reports and audits confirm coverage. Zero-day vulnerabilities, exploited before a patch exists, require compensating controls and heightened monitoring until a fix is available.",
   "Change management provides structured control over modifications to systems, applications and infrastructure. A change is requested with a description, justification and rollback plan; its impact and risk are assessed; a change advisory board (CAB) or designated authority approves or rejects it; it is scheduled, tested and implemented, often in a maintenance window; it is documented and the configuration baseline is updated; and it is reviewed afterward. Standard changes that are low risk and repeatable can be pre-approved. Emergency changes can be implemented quickly but must be documented and reviewed after the fact.",
   "The security goals of change management are to prevent unauthorized changes, reduce outages from poorly planned changes, and maintain an audit trail. A change discovered without a matching approved request should be investigated, because it may indicate an attacker or an insider bypassing controls. Separation of duties applies: the person who requests or develops a change should not be the only one to approve and deploy it. Comparing configuration scans against approved change tickets is a simple way to catch changes that bypassed the process.",
   "Consider a worked example. A vendor releases a patch for a remote code execution flaw in your virtual private network (VPN) appliance, and threat intelligence reports active exploitation. Your inventory shows four appliances, all internet facing. The team classifies the change as an emergency, obtains approval from the designated emergency approver, tests the patch on a lab unit, and deploys it that night to one appliance, then the rest after confirming stability. Until the patch is applied, extra monitoring watches the appliances' logs. The CAB reviews the emergency change at its next meeting, the baseline is updated, and a rescan confirms the vulnerability is gone.",
   "Common mistakes: prioritizing strictly by CVSS score and ignoring exposure and active exploitation; deploying patches straight to production without testing; assuming emergency changes need no documentation; treating vulnerability management as a quarterly scan rather than a continuous cycle; and forgetting that the organization can only patch what its inventory knows about. Another error is letting a developer approve and deploy their own change.",
   "Exam questions often test sequence and priority. \"What should happen before deploying a patch to production?\" points to testing in a non-production environment and change approval. \"Which vulnerability to fix first?\" points to the one with the highest risk considering exposure, asset value and active exploitation. \"No patch exists\" points to compensating controls. \"Unauthorized change found\" points to investigation and a change management failure. Think like a manager: balance the risk of the vulnerability against the risk of the change, and keep every change approved, tested, documented and reversible."
  ],
  "terms": [
   [
    "Vulnerability management",
    "The continuous cycle of discovering, prioritizing, remediating and verifying weaknesses."
   ],
   [
    "Authenticated scan",
    "A vulnerability scan that logs in to systems to see installed software and settings, giving more accurate results."
   ],
   [
    "Patch management",
    "The process of acquiring, testing, approving, deploying and verifying software updates."
   ],
   [
    "Zero-day vulnerability",
    "A flaw that is exploited before a vendor fix is available."
   ],
   [
    "Change advisory board (CAB)",
    "The group that reviews and approves or rejects significant changes."
   ],
   [
    "Emergency change",
    "A change implemented quickly to address an urgent issue, documented and reviewed after the fact."
   ],
   [
    "Rollback plan",
    "Documented steps to return a system to its previous state if a change fails."
   ]
  ],
  "example": "A hospital pushes an operating system patch to all workstations at once without testing. It conflicts with a clinical charting application, and nurses cannot document care for hours. The post-incident review adds a test lab that mirrors clinical workstations, staged rollouts starting with IT staff machines, and a mandatory rollback plan in every patch change request.",
  "tip": "Patches should be tested before production deployment and go through change management; emergency changes are still documented and reviewed afterward. Prioritize vulnerabilities by risk, meaning severity plus asset value, exposure and active exploitation, not by score alone.",
  "check": [
   [
    "Why is an accurate asset inventory the first step in vulnerability management?",
    "Systems that are not known are never scanned or patched, so they remain exposed."
   ],
   [
    "What should an organization do when a vulnerability has no patch yet?",
    "Apply compensating controls such as isolation or configuration changes and increase monitoring until a fix is available."
   ],
   [
    "How are emergency changes handled differently from normal changes?",
    "They are approved and implemented quickly through an expedited path, then fully documented and reviewed after the fact."
   ],
   [
    "Why should a change be investigated if no approved request matches it?",
    "It may indicate an attacker or insider bypassing controls, not just a process lapse."
   ]
  ]
 },
 {
  "t": "Recovery strategies: backup types, recovery sites, resilience, high availability",
  "body": [
   "Recovery strategies determine how quickly and completely an organization can restore operations after a disruption. They are driven by the business impact analysis (BIA). The recovery time objective (RTO) sets how fast a function must be restored, the recovery point objective (RPO) sets how much data loss is tolerable, and the maximum tolerable downtime (MTD) sets the outer limit before the organization suffers unacceptable harm. The RTO must be shorter than the MTD. Every strategy choice is a trade-off between cost and how well it meets those objectives, and management decides the balance.",
   "Backup types differ in what they copy and how they affect restore time. A full backup copies all selected data; it is simplest to restore but takes the most time and space. An incremental backup copies only data changed since the last backup of any kind and clears the archive bit; backups are fast and small, but a restore needs the last full backup plus every incremental since, in order. A differential backup copies all data changed since the last full backup and does not clear the archive bit; each differential grows through the week, but a restore needs only the last full plus the latest differential. Snapshots and continuous replication can achieve very small RPOs. Electronic vaulting transfers backups in bulk to an offsite location, while remote journaling transmits transaction logs frequently so a database can be brought up to date by replaying them.",
   "Recovery sites provide somewhere to run operations if the primary site is lost. A hot site is fully equipped with hardware, software, current data and connectivity, ready within hours or less; it is the most expensive. A warm site has infrastructure and some equipment but needs data restored and configuration completed, typically taking days. A cold site offers space, power and environmental controls but no equipment; it is cheapest and slowest, often taking weeks. A mirrored or redundant site runs in parallel with the primary for near-zero downtime. Other options include mobile sites, reciprocal agreements with another organization, which are cheap but hard to enforce and may lack capacity when both need it, and cloud-based recovery, which can provide hot or warm capacity on demand. Locate recovery sites far enough away that a regional disaster does not affect both.",
   "Resilience is the ability to keep operating, perhaps in degraded form, during disruption and to recover quickly. It comes from eliminating single points of failure: redundant power with uninterruptible power supplies (UPS) and generators, multiple network carriers, redundant components, and services spread across failure domains such as separate data centers or cloud availability zones.",
   "High availability (HA) designs keep services running despite component failure. Clustering links servers so another node takes over if one fails; active-active clusters share load all the time, while active-passive clusters keep a standby ready. Load balancers distribute traffic and route around failed nodes. Redundant array of independent disks (RAID) protects against disk failure: RAID 1 mirrors disks, RAID 5 stripes data with distributed parity and survives one disk failure, RAID 6 survives two, and RAID 0 striping improves performance with no redundancy. Fault tolerance goes further than HA, continuing without any interruption when a component fails. RAID and replication are not backups, because they faithfully copy deletions and ransomware encryption.",
   "Consider a worked example. An online retailer's BIA sets an MTD of eight hours and an RTO of four hours for order processing, with an RPO of fifteen minutes. A cold site cannot meet four hours, and a mirrored site is beyond budget, so management chooses a warm standby in a second cloud region with database replication every few minutes, plus nightly full and hourly incremental backups to immutable storage. Web servers run active-active behind load balancers across two availability zones. When a storage failure takes down the primary region, the team fails over within three hours and loses about ten minutes of orders.",
   "Common mistakes: mixing up incremental and differential restore requirements; treating RAID or replication as a backup; choosing a site whose recovery time exceeds the RTO; setting an RTO longer than the MTD; and relying on a reciprocal agreement for a critical function. Another trap is picking the most capable option regardless of cost, when the right answer is the least costly option that meets the business objectives.",
   "Exam questions give objectives and ask for a strategy. \"Restore in minutes\" or \"near-zero downtime\" points to a hot or mirrored site; \"weeks acceptable, lowest cost\" points to a cold site. \"Fastest backups, slower restores\" is incremental; \"faster restores, growing backups\" is differential. \"Survive two disk failures\" is RAID 6. Think like a manager: the BIA drives the choice, and the best answer meets the RTO and RPO at the lowest reasonable cost."
  ],
  "terms": [
   [
    "Recovery time objective (RTO)",
    "The target time within which a function or system must be restored after disruption."
   ],
   [
    "Recovery point objective (RPO)",
    "The maximum acceptable amount of data loss, measured as time since the last good copy."
   ],
   [
    "Maximum tolerable downtime (MTD)",
    "The longest a function can be unavailable before the organization suffers unacceptable harm."
   ],
   [
    "Incremental backup",
    "A backup of data changed since the last backup of any type, which clears the archive bit."
   ],
   [
    "Differential backup",
    "A backup of data changed since the last full backup, which does not clear the archive bit."
   ],
   [
    "Hot site",
    "A fully equipped alternate site with current data that can take over within hours or less."
   ],
   [
    "Remote journaling",
    "Frequently transmitting transaction logs offsite so a database can be restored by replaying them."
   ]
  ],
  "example": "A small accounting firm runs a full backup every Sunday and incremental backups on weekdays. When its server fails on Friday morning, it must restore Sunday's full backup and then Monday through Thursday's incrementals in order. The restore takes most of the day. The firm switches to differentials so a restore needs only Sunday's full plus Thursday's differential, accepting larger nightly backups for a faster recovery.",
  "tip": "Incremental restores need the full plus every incremental; differential restores need the full plus only the last differential. Hot sites are fastest and costliest, cold sites slowest and cheapest. RAID and replication are availability controls, not backups.",
  "check": [
   [
    "A full backup ran Sunday and differentials ran Monday to Thursday. What is needed to restore on Friday?",
    "Sunday's full backup and Thursday's differential."
   ],
   [
    "Why must the RTO be shorter than the MTD?",
    "The MTD is the point of unacceptable harm, so recovery must be completed before it is reached."
   ],
   [
    "Why is RAID not a substitute for backups?",
    "RAID protects against disk failure but copies deletions, corruption and ransomware encryption instantly across disks."
   ],
   [
    "What is the main weakness of a reciprocal agreement?",
    "It is hard to enforce and the partner may not have capacity when both organizations are affected or busy."
   ]
  ]
 },
 {
  "t": "Disaster recovery processes and DR plan testing (read-through, walkthrough, simulation, parallel, full interruption)",
  "body": [
   "A disaster recovery plan (DRP) describes how to restore IT systems and data after a disruptive event such as a fire, flood, major outage or cyberattack. Where the business continuity plan (BCP) keeps critical business functions operating, the DRP focuses on the technology that supports them. A plan that has never been tested is little better than no plan, because contact lists go stale, systems change and people forget their roles. That is why DR testing is a major exam topic.",
   "The DR process begins with response: detecting the event, assessing damage and declaring a disaster according to predefined criteria, by a person with the authority to do so. Declaration triggers the plan and often contractual arrangements such as moving to a recovery site. The plan defines personnel and roles, such as a DR coordinator, technical recovery teams and a salvage team that assesses and restores the primary site. It defines communications to employees, customers, suppliers, regulators and the media, and the sequence for restoring systems in priority order based on the business impact analysis (BIA).",
   "Assessment determines the extent of damage and whether to recover in place or move to the alternate site. Restoration brings systems back at the alternate site, and a later phase returns operations to the primary or a permanent new site. Moving back is itself risky, so it usually starts with the least critical functions, which tests the restored environment while the most critical functions remain safely at the recovery site until the primary is proven. Training and awareness make sure people know their roles, and copies of the plan must be available during a disaster, not only on the systems that might fail.",
   "Testing proceeds in increasing realism and risk. A read-through, also called a checklist review, has team members review the plan individually to confirm it is accurate and complete, and that contacts and resources are current. A walkthrough, often run as a tabletop exercise, brings the team together to talk through a scenario step by step, exposing gaps in understanding and coordination. A simulation plays out a specific disaster scenario in more detail, perhaps exercising some procedures and communications, but without moving production operations.",
   "A parallel test actually brings up systems at the recovery site and processes real or copied data there, while the primary site continues to run production. It proves the alternate site works without risking business operations. A full-interruption test, also called a full-scale test, shuts down the primary site and moves operations entirely to the recovery site. It is the most realistic and the only way to be fully certain, but it is also the most disruptive and risky, requires senior management approval, and many organizations rarely or never run it. After every test, document results, compare actual recovery times and data loss with the recovery time objective (RTO) and recovery point objective (RPO), identify gaps and update the plan. Review the plan at least annually and whenever systems or the organization change significantly.",
   "Consider a worked example. A regional bank updates its DRP after moving core banking to a new data center. In the spring, each team lead does a read-through and finds three outdated phone numbers. In the summer, a tabletop walkthrough of a data center fire reveals that nobody knew who could authorize the declaration after hours. In the autumn, a parallel test brings core banking up at the recovery site using replicated data while production continues; recovery takes six hours against a four-hour RTO, so the team automates database recovery. A full-interruption test is proposed, but management declines because of customer risk.",
   "Common mistakes: confusing a walkthrough with a simulation; thinking a parallel test disrupts production (it does not); running a full-interruption test without senior management approval; returning the most critical systems to the primary site first; and failing to update the plan after a test. Another mistake is storing the only copy of the DRP on a file server in the data center that the plan is meant to recover.",
   "Exam questions often ask which test fits a constraint. \"Least disruptive\" or \"review documents individually\" points to a read-through. \"Team discusses a scenario around a table\" points to a walkthrough or tabletop. \"Activate the alternate site without affecting production\" points to a parallel test. \"Most realistic\" or \"shut down the primary\" points to full interruption. Think like a manager: choose the test that gives enough assurance at acceptable business risk, get approval for disruptive tests, and use every result to improve the plan."
  ],
  "terms": [
   [
    "Disaster recovery plan (DRP)",
    "The documented procedures for restoring IT systems and data after a disruptive event."
   ],
   [
    "Read-through (checklist) test",
    "Individual review of the plan to confirm it is accurate, complete and current."
   ],
   [
    "Walkthrough (tabletop) test",
    "A group discussion of a disaster scenario, stepping through the plan to find gaps."
   ],
   [
    "Simulation test",
    "A more detailed scenario exercise that may practice procedures without moving production."
   ],
   [
    "Parallel test",
    "Bringing up systems at the recovery site and processing data while the primary site continues production."
   ],
   [
    "Full-interruption test",
    "Shutting down the primary site and moving operations entirely to the recovery site."
   ],
   [
    "Salvage team",
    "The team responsible for assessing and restoring the primary site after a disaster."
   ]
  ],
  "example": "A university runs a tabletop walkthrough of a ransomware attack that disables its student information system during enrollment week. The discussion shows that the recovery priority list puts email ahead of enrollment, and that backups are restored by an administrator whose account would be disabled in such an attack. The plan is revised, and a parallel test the following term confirms enrollment can be restored at the recovery site within its RTO.",
  "tip": "Know the test order from least to most disruptive: read-through (checklist), walkthrough (tabletop), simulation, parallel, full interruption. Parallel keeps production running; full interruption does not and needs senior management approval.",
  "check": [
   [
    "Which DR test brings up the recovery site without affecting production?",
    "A parallel test, which processes data at the alternate site while the primary continues normal operations."
   ],
   [
    "Why are the least critical functions moved back to the primary site first?",
    "To test the restored environment with low-risk work before moving critical functions back."
   ],
   [
    "What is the main drawback of a full-interruption test?",
    "It is highly disruptive and risky to real operations, so it needs senior management approval and is rarely performed."
   ],
   [
    "What should happen after every DR test?",
    "Document results, compare them to RTO and RPO, identify gaps and update the plan."
   ]
  ]
 },
 {
  "t": "Business continuity participation, physical security and personnel safety (travel, duress, emergency management)",
  "body": [
   "Security operations teams do not own business continuity, but they participate heavily in it. Business continuity planning (BCP) keeps critical business functions running during and after a disruption, based on the business impact analysis (BIA). Security staff contribute by identifying systems and data that critical functions depend on, ensuring recovery environments are as secure as production, maintaining backups and access controls during a crisis, supporting exercises, and aligning incident response with continuity plans so a cyberattack can trigger continuity measures smoothly. Security must not be switched off in an emergency; attackers often exploit the confusion.",
   "Physical security protects people, facilities and equipment. Think in layers from the outside in. Perimeter controls include fencing, lighting, bollards and landscaping that follows crime prevention through environmental design (CPTED) principles. Building entry controls include reception, badge readers, turnstiles and mantraps (access control vestibules) that prevent tailgating. Internal zones apply stronger controls to server rooms and sensitive areas, and monitoring uses closed-circuit television (CCTV), alarms and guards. Visitor management includes sign-in, badges, escorts and logs. Physical security also covers environmental threats and fire safety, including detection, suppression and evacuation.",
   "The most important principle, and a favorite exam answer, is that human life and safety always come first. No asset justifies endangering people. Doors on escape routes must allow people to get out. A fail-safe (sometimes called fail-open) lock unlocks on power loss and protects people, while a fail-secure lock stays locked and protects assets. In an emergency, evacuate people before saving equipment or data. Fire suppression choices follow the same logic: systems that displace oxygen need warnings and delays so people can leave before discharge, and the safety of occupants outranks protecting the hardware.",
   "Personnel safety extends beyond the building. Travel security prepares employees going abroad with briefings on local risks, itinerary registration, loaner laptops and phones holding minimal data for high-risk destinations, encrypted devices, caution with untrusted networks and public charging, and awareness that some countries may inspect or compel access to devices at the border. Duress refers to situations where an employee is forced to act under threat. Duress systems let a person signal distress covertly, such as a special personal identification number (PIN) that opens a door or disarms an alarm while silently alerting security, or a code word agreed in advance. Train staff to comply with an attacker's demands to protect their lives rather than resist.",
   "Emergency management covers planning for events that threaten safety, such as fire, severe weather, medical emergencies, active threats and pandemics. Elements include occupant emergency plans, evacuation routes and assembly points, floor wardens who account for staff, shelter-in-place procedures, mass notification systems, first aid and coordination with emergency services. Drills test these plans. Crisis communication plans define who speaks for the organization and how staff, families and the public are informed.",
   "Consider a worked example. A fire alarm sounds in a data center building at night. The badge-controlled doors on the escape route fail safe and unlock, the floor warden sweeps the floor and reports everyone present at the assembly point, and nobody returns for equipment. The mass notification system tells day staff not to come in. The next morning, the business continuity team activates the alternate site; the security team confirms that access controls, logging and backups are working there before customer systems are brought online, and it arranges guards for the damaged building to prevent theft of drives.",
   "Common mistakes: choosing an answer that protects equipment or data over people; confusing fail-safe with fail-secure; assuming business continuity is only an IT matter; relaxing security controls during recovery; and teaching employees under duress to resist. Another error is forgetting travel risk: a laptop full of sensitive data taken to a high-risk destination can be copied without the owner knowing.",
   "Exam questions in this area are often easy points if you remember priorities. Any answer that protects human life is almost always correct. \"Door must open during a power failure\" points to fail-safe; \"server room must stay locked\" points to fail-secure, with safe egress still provided. \"Signal distress while appearing to comply\" points to a duress code. \"Traveling to a high-risk country\" points to loaner devices with minimal data. Think like a manager: safety first, then continuity of critical functions, with security maintained throughout."
  ],
  "terms": [
   [
    "Business continuity planning (BCP)",
    "Planning to keep critical business functions operating during and after a disruption."
   ],
   [
    "Crime prevention through environmental design (CPTED)",
    "Using building and landscape design, such as lighting and sight lines, to deter crime."
   ],
   [
    "Mantrap (access control vestibule)",
    "A small space with two interlocking doors that allows only one authorized person through at a time."
   ],
   [
    "Fail-safe",
    "A design in which a failure leaves a system in a state that protects people, such as doors unlocking on power loss."
   ],
   [
    "Fail-secure",
    "A design in which a failure leaves a system locked or closed to protect assets."
   ],
   [
    "Duress code",
    "A covert signal, such as a special PIN, that lets a person under threat alert security while appearing to comply."
   ],
   [
    "Occupant emergency plan",
    "A plan describing how building occupants evacuate or shelter during an emergency."
   ]
  ],
  "example": "A bank teller is forced at gunpoint to open the vault. Following training, the teller complies and enters a duress PIN instead of the normal one. The vault opens as usual, but a silent alarm alerts security and police without the attacker knowing. Nobody is hurt, and the response begins immediately.",
  "tip": "When an answer choice protects human life, it is almost always correct. Fail-safe protects people and fail-secure protects assets. Duress systems let people comply with an attacker while silently raising the alarm.",
  "check": [
   [
    "During a power failure, should emergency exit doors fail safe or fail secure?",
    "Fail safe, so they unlock and allow people to escape, because life safety comes first."
   ],
   [
    "How does a duress code protect an employee?",
    "It lets them comply with an attacker's demands while covertly alerting security, avoiding confrontation."
   ],
   [
    "What is a sensible device practice for travel to a high-risk country?",
    "Carry a loaner laptop and phone with minimal data, encrypt them, and treat them as untrusted on return."
   ],
   [
    "What is a mantrap designed to prevent?",
    "Tailgating and piggybacking, by allowing only one authenticated person through at a time."
   ]
  ]
 },
 {
  "t": "Security in the SDLC: waterfall, agile, DevOps, DevSecOps, scaled agile",
  "body": [
   "The software development lifecycle (SDLC) is the structured process for creating software, from idea to retirement. Its phases are commonly described as initiation and requirements, design, development (coding), testing, deployment and implementation, operations and maintenance, and disposal. The central security lesson is that security must be built in from the start, because fixing flaws late in the lifecycle is far more expensive and less effective than preventing them. A design flaw found in production can require rearchitecting; the same flaw found in a design review costs a meeting.",
   "Each phase has a security job. During requirements, define security and privacy requirements and assess risk. During design, perform threat modeling and choose a secure architecture. During development, follow secure coding standards and perform code review. Before release, run security testing. During deployment and operations, apply secure configuration, change control, monitoring and patching. At retirement, dispose of data securely and decommission systems cleanly. Certification and accreditation, a formal technical evaluation followed by management's authorization to operate, may occur before production use.",
   "Different methodologies shape how security fits in. Waterfall is sequential: each phase finishes before the next begins, with extensive documentation and formal reviews. Security activities fit neatly into phase gates, but requirements are fixed early, changes are costly, and security problems discovered late are hard to fix. The spiral model iterates through planning, risk analysis, engineering and evaluation, emphasizing risk management in each loop, which makes it attractive for large, high-risk projects.",
   "Agile development delivers software in short iterations, called sprints, prioritizing working software, collaboration and responsiveness to change over heavy documentation. Frameworks include Scrum, with its product owner, scrum master and development team, and Kanban, which manages continuous flow. Security challenges are that short cycles leave little time for traditional reviews and documentation can be sparse. Adaptations include writing security requirements as user stories and acceptance criteria, including abuse cases, keeping a security backlog, making security part of the definition of done, and automating security tests that run every sprint.",
   "DevOps combines development and operations teams and practices to deliver changes rapidly and reliably, using automation, continuous integration and continuous delivery or deployment (CI/CD), infrastructure as code and monitoring. Releases may happen many times a day. DevSecOps integrates security into that pipeline as a shared responsibility rather than a separate gate at the end. Shift left means moving security earlier: threat modeling in design, secure coding training, automated static analysis, software composition analysis and secrets scanning on each commit, dynamic testing and container scanning in the pipeline, policy-as-code checks on infrastructure templates, and runtime monitoring in production. Security teams act as enablers who provide tools and guardrails. Scaled agile frameworks, such as the Scaled Agile Framework (SAFe), coordinate many agile teams through shared planning increments and release trains, which creates a natural place to define enterprise-wide security requirements, shared components and common pipelines.",
   "Consider a worked example. A government agency is building a benefits portal. Under its old waterfall process, a penetration test just before launch found an authorization flaw that delayed release by three months. For the new project, the team uses agile sprints within a scaled agile program. A security architect joins program planning, security stories sit in every backlog, the definition of done includes passing automated static and dependency scans, and threat modeling happens whenever a new feature touches personal data. The final penetration test finds only minor issues, and the authorizing official signs off on schedule.",
   "Common mistakes: assuming agile means no documentation or no security; treating DevSecOps as a new security team rather than a shared responsibility; placing all security testing at the end of the pipeline; and forgetting the disposal phase, where data remanence and orphaned accounts become risks. Another error is thinking automation replaces design-time activities such as threat modeling; tools catch code-level issues, not architectural mistakes.",
   "Exam questions strongly favor early integration. \"When should security be considered?\" points to the earliest phase, requirements or initiation. \"Most cost-effective time to fix a flaw\" points to requirements or design. \"Security in rapid, automated releases\" points to DevSecOps and shift left. \"Sequential phases with formal gates\" points to waterfall, and \"iterations with risk analysis in each loop\" points to spiral. Think like a manager: build security into every phase and methodology rather than bolting it on before release."
  ],
  "terms": [
   [
    "Software development lifecycle (SDLC)",
    "The structured process for planning, building, testing, deploying, operating and retiring software."
   ],
   [
    "Waterfall",
    "A sequential development model in which each phase is completed before the next begins."
   ],
   [
    "Spiral model",
    "An iterative model that repeats planning, risk analysis, engineering and evaluation in each loop."
   ],
   [
    "Agile",
    "An iterative approach that delivers working software in short sprints and adapts to change."
   ],
   [
    "DevSecOps",
    "Integrating security practices and automation into DevOps as a shared responsibility."
   ],
   [
    "Shift left",
    "Moving security activities earlier in the development lifecycle."
   ],
   [
    "Definition of done",
    "The agreed criteria, which can include security checks, that work must meet to be considered complete."
   ]
  ],
  "example": "A fintech startup deploys dozens of times a day. Instead of a weekly manual security review that could not keep up, it adds automated secrets scanning and dependency checks on every commit, static analysis on every pull request, and a policy check that blocks infrastructure templates exposing databases to the internet. Security engineers write reusable pipeline components that every team adopts.",
  "tip": "The exam favors building security in from the earliest phase, requirements and design, because that is where flaws are cheapest to fix. DevSecOps means automation and shared responsibility, not a separate security gate at the end.",
  "check": [
   [
    "In which SDLC phase should security requirements first be defined?",
    "Initiation and requirements, the earliest phase, because fixing issues later costs far more."
   ],
   [
    "How can security fit into agile sprints?",
    "Through security user stories and abuse cases, a security backlog, security criteria in the definition of done, and automated tests each sprint."
   ],
   [
    "What does shift left mean?",
    "Performing security activities earlier in the lifecycle, such as threat modeling in design and automated scans on each commit."
   ],
   [
    "What distinguishes the spiral model?",
    "It iterates through planning, risk analysis, engineering and evaluation, with risk analysis in every cycle."
   ]
  ]
 },
 {
  "t": "Maturity models: CMM, SAMM; operations, maintenance and change management",
  "body": [
   "Maturity models measure how well developed and repeatable an organization's processes are, and they give a roadmap for improvement. For software security, the exam focuses on the Capability Maturity Model (CMM) lineage and on the OWASP Software Assurance Maturity Model (SAMM), and it links them to the discipline of operating and changing software safely after release. The core idea is that mature, defined and measured processes produce more predictable, higher-quality and more secure software than heroic individual effort.",
   "The Capability Maturity Model was developed at Carnegie Mellon University's Software Engineering Institute (SEI) and later evolved into Capability Maturity Model Integration (CMMI). It describes five levels. Level 1, Initial: processes are ad hoc and chaotic, and success depends on individual heroics. Level 2, Repeatable (called Managed in CMMI): basic project management is established so earlier successes can be repeated. Level 3, Defined: processes are documented, standardized and integrated across the organization. Level 4, Managed (Quantitatively Managed in CMMI): processes are measured and controlled with metrics. Level 5, Optimizing: the organization focuses on continuous process improvement. Some texts also describe the IDEAL model (initiating, diagnosing, establishing, acting, learning) as a way to run the improvement effort itself.",
   "The Software Assurance Maturity Model is an open framework from the Open Worldwide Application Security Project (OWASP) built specifically for software security. It organizes practices into five business functions: Governance, Design, Implementation, Verification and Operations. Each function contains security practices, such as strategy and metrics, education and guidance, threat assessment, security requirements, secure build, secure deployment, defect management, security testing, incident management and environment management. Each practice is scored across maturity levels, typically one to three, so an organization can assess its current state, set target levels that fit its risk and resources, and plan improvements step by step. The Building Security In Maturity Model (BSIMM) is sometimes mentioned alongside SAMM; it is descriptive, reporting what many organizations actually do, whereas SAMM is prescriptive.",
   "Operations and maintenance is the longest phase of most software's life. Security tasks include monitoring the application and its logs, handling vulnerability reports from users and researchers, patching the application and its dependencies, managing secrets and certificates before they expire, and planning for end of life. Legacy software that no longer receives updates is a growing risk and needs compensating controls or replacement.",
   "Change management in software means that every modification, whether a feature, a bug fix or a dependency update, goes through a controlled process: a request, impact and security analysis, approval, development in version control, testing including regression tests to confirm nothing that previously worked is broken, and a controlled release with the ability to roll back. Configuration management tracks versions of code, builds and deployed components so you always know what is running where. Unapproved changes to production code signal either error or compromise.",
   "Consider a worked example. A software company's security lead runs a SAMM assessment and finds the organization scores well in Verification because it runs automated scans, but poorly in Design, with no threat modeling, and in Operations, with no defined process for handling vulnerability reports. With management, she sets targets for the next year: level two in threat assessment and level two in incident management. The company also realizes its development process sits at CMM level 2, since projects succeed but each team works differently, and it begins documenting a standard secure development process to reach level 3.",
   "Common mistakes: mixing up the order of CMM levels 2 through 4; assuming Managed is level 2 in the original CMM (it is level 4; CMMI renamed level 2 as Managed); thinking the goal is to reach the highest level in every practice regardless of risk; confusing prescriptive SAMM with descriptive BSIMM; and forgetting regression testing in change management. Another error is treating maintenance as outside the security program, when most of a system's exposure happens there.",
   "Exam questions often describe an organization and ask for its level. \"Ad hoc, depends on individuals\" is Initial. \"Standardized across the organization\" is Defined. \"Measured with metrics\" is Managed. \"Continuous improvement\" is Optimizing. \"Open software security framework with business functions\" points to SAMM. Think like a manager: use a maturity model to measure the current state, set realistic targets based on risk, and improve incrementally, while keeping every production change controlled and reversible."
  ],
  "terms": [
   [
    "Capability Maturity Model (CMM)",
    "A five-level model describing process maturity from initial to optimizing."
   ],
   [
    "Capability Maturity Model Integration (CMMI)",
    "The successor to CMM that integrates process improvement across disciplines."
   ],
   [
    "Software Assurance Maturity Model (SAMM)",
    "An open OWASP framework for assessing and improving software security practices across five business functions."
   ],
   [
    "Building Security In Maturity Model (BSIMM)",
    "A descriptive model reporting the software security activities organizations actually perform."
   ],
   [
    "Optimizing level",
    "The highest CMM level, focused on continuous process improvement."
   ],
   [
    "Regression testing",
    "Testing after a change to confirm that previously working functions still work."
   ]
  ],
  "example": "After a failed release breaks customer logins, a payments company reviews its process and finds that developers deploy fixes directly to production with no regression tests. It introduces a change process with version-controlled builds, required regression and security tests, approval before release, and a one-click rollback. Six months later, change-related incidents have dropped sharply, and the company records this metric as part of moving toward a quantitatively managed process.",
  "tip": "Memorize the CMM levels in order: initial, repeatable, defined, managed, optimizing. Level 5 is continuous improvement. SAMM is prescriptive and specific to software security; BSIMM describes what organizations actually do.",
  "check": [
   [
    "An organization's processes are documented and standardized across all teams. Which CMM level is this?",
    "Level 3, Defined."
   ],
   [
    "What characterizes CMM level 4?",
    "Processes are measured and controlled quantitatively with metrics."
   ],
   [
    "What are SAMM's five business functions?",
    "Governance, Design, Implementation, Verification and Operations."
   ],
   [
    "Why is regression testing part of software change management?",
    "It confirms that a change did not break functions, including security controls, that previously worked."
   ]
  ]
 },
 {
  "t": "Integrated product teams and security in the development ecosystem",
  "body": [
   "Software is no longer built by a lone programming team that hands finished code to operations. It is produced by an ecosystem of people, tools, services and suppliers, and security has to be woven into that whole system. The CISSP outline highlights integrated product teams (IPTs) as one way to do it: bring security into the group that builds the product rather than keeping it outside as a reviewer.",
   "An integrated product team is a cross-functional group that brings together the disciplines needed to deliver a product: developers, testers, operations engineers, product owners and architects, plus specialists such as security, privacy, legal, compliance and user experience. The concept originated in defense acquisition and systems engineering, and it overlaps with the DevOps idea of breaking down silos. For security, the benefit is that requirements and risks are considered from the beginning by people who understand them, decisions are made together, and security is not an outside auditor who arrives at the end to say no. A security representative in the IPT can shape architecture, help write abuse cases, choose secure components and interpret test results in context.",
   "Many organizations scale this with security champions: developers or engineers embedded in each product team who receive extra security training and act as the first point of contact for security questions, while the central security team provides expertise, tools and standards. This spreads knowledge without requiring a dedicated security specialist on every team, and it builds a culture in which developers own the security of what they build.",
   "The development ecosystem extends beyond people. It includes source code repositories, build systems, package managers and third-party libraries, container registries, cloud services, continuous integration and continuous delivery (CI/CD) pipelines, developer workstations and integrated development environments (IDEs), and external contractors. Each is a link in the software supply chain, and attackers increasingly target these links, for example by compromising a popular open-source library, stealing a developer's credentials to push malicious code, or tampering with a build server so that legitimate-looking releases carry a backdoor. Securing the ecosystem means applying controls to development infrastructure with the same rigor as production.",
   "Practical measures include clear roles and responsibilities, including who owns security decisions and risk acceptance; secure design standards and approved components; training appropriate to each role; threat modeling as a team activity; contracts with external developers that include security requirements and the right to review; software bills of materials (SBOMs) that list the components in each product; and shared metrics so security is part of how success is measured. Governance still matters: security policies and standards set the expectations, and the IPT operates within them.",
   "Consider a worked example. A medical device maker forms an IPT for a new connected insulin pump, with firmware engineers, a clinical safety lead, a regulatory specialist, a privacy officer and a product security engineer. In the first week the team threat-models the Bluetooth pairing process and the mobile app together. The regulatory specialist notes premarket cybersecurity expectations, and the security engineer proposes signed firmware updates and an SBOM. Because these requirements were agreed before design, they cost little to implement; in a previous product, similar changes discovered during final testing had delayed launch by months.",
   "Common mistakes: treating security as a separate approval step at the end; assuming an IPT removes the need for policies and governance; securing production but leaving build servers and repositories loosely controlled; forgetting that contractors and third-party code are part of the ecosystem; and naming security champions without giving them training, time or support. Another error is unclear ownership: when everyone is responsible, a risk decision may end up owned by no one, so the IPT must know who can accept risk.",
   "Exam questions usually ask how to ensure security is considered throughout development. The best answer typically includes security personnel in cross-functional teams from the start, rather than adding a review at the end. \"Compromised library\" or \"tampered build\" points to supply chain controls such as SBOMs, dependency scanning and build integrity. \"Spread security knowledge across many teams\" points to security champions. Think like a manager: integrate security into the team and the tooling early, set clear accountability, and govern the whole ecosystem, not just the finished product."
  ],
  "terms": [
   [
    "Integrated product team (IPT)",
    "A cross-functional team that includes all disciplines needed to deliver a product, including security."
   ],
   [
    "Security champion",
    "A team member with extra security training who acts as the team's first point of contact for security."
   ],
   [
    "Software supply chain",
    "All the components, tools, services and people involved in producing and delivering software."
   ],
   [
    "Software bill of materials (SBOM)",
    "An inventory of the components and dependencies that make up a piece of software."
   ],
   [
    "Threat modeling",
    "A structured analysis of how a system could be attacked and which controls are needed."
   ],
   [
    "Development ecosystem",
    "The people, tools, infrastructure and suppliers used to build and deliver software."
   ]
  ],
  "example": "A retailer's mobile app team is compromised when an attacker phishes a developer and pushes a malicious commit that sends payment data to an outside server. The code is caught in review only because the team's security champion notices an unfamiliar network call. Afterward, the company requires hardware-based multifactor authentication for repository access, signed commits and mandatory reviews on protected branches.",
  "tip": "If a question asks how to ensure security is considered throughout development, look for including security personnel in cross-functional teams from the start rather than adding a review at the end. Development infrastructure is part of the attack surface.",
  "check": [
   [
    "What is the main security benefit of an integrated product team?",
    "Security requirements and risks are considered from the beginning by the team making decisions, rather than reviewed only at the end."
   ],
   [
    "What role does a security champion play?",
    "A trained team member who promotes secure practices and is the first point of contact for security questions, supported by the central security team."
   ],
   [
    "Give two examples of software supply chain attacks.",
    "Compromising a popular open-source library, or tampering with a build server so releases carry malicious code."
   ],
   [
    "What does an SBOM provide?",
    "A list of the components and dependencies in a product, so known vulnerabilities and licenses can be tracked."
   ]
  ]
 },
 {
  "t": "Development ecosystem controls: languages, libraries, toolsets, IDE, runtime, CI/CD, SCM, code repositories",
  "body": [
   "Every tool and component used to build software can introduce vulnerabilities or become an attack path. Development ecosystem controls apply security to each layer, from the programming language chosen to the pipeline that ships the code. The guiding idea is simple: the systems that build production are as sensitive as production itself, because whoever controls them controls what runs there.",
   "Programming languages differ in security characteristics. Languages such as C and C++ give direct memory control, which enables performance but also memory-safety bugs such as buffer overflows and use-after-free errors. Memory-safe languages, including Java, C#, Go, Python and Rust, manage memory or enforce safety rules that eliminate many of those bug classes. Compiled languages turn source into machine code before running; interpreted languages are executed by an interpreter at runtime; many compile to bytecode run by a virtual machine. Strongly typed languages catch some errors earlier. Language choice is a security decision, and where unsafe languages are necessary, use safer library functions, compiler protections and extra testing.",
   "Libraries and frameworks save enormous effort but bring their own flaws and licenses. Control them with software composition analysis (SCA) to find known vulnerabilities and license issues, pinned versions and lock files, approved internal package mirrors, verification of package signatures or checksums, and prompt updates when vulnerabilities are announced. Watch for typosquatting, where malicious packages use names similar to popular ones, and dependency confusion, where a public package is published with the same name as an internal one so that the build tool fetches the wrong one.",
   "Toolsets and integrated development environments (IDEs) are where developers work. Keep them patched, restrict plug-ins and extensions to trusted sources, since they run with the developer's privileges, and use security plug-ins that flag issues as code is written. Protect developer workstations with endpoint security and keep secrets out of local files. The runtime environment, such as a Java virtual machine, a .NET runtime, a container engine or a serverless platform, should be patched, hardened and configured for least privilege, for example running containers as non-root users with minimal base images. Runtime application self-protection (RASP) can monitor and block attacks from inside the running application.",
   "Source code management (SCM) systems and code repositories hold the organization's intellectual property and the blueprint of its systems. Enforce strong authentication with multifactor authentication (MFA), least-privilege access, branch protection that requires reviewed pull requests before merging to main branches, signed commits where appropriate, audit logging, and secret scanning to catch credentials committed by mistake. Continuous integration and continuous delivery or deployment (CI/CD) pipelines automatically build, test and deploy code, so they are high-value targets. Secure them by isolating build agents, storing pipeline secrets in a secrets manager with short-lived credentials, requiring approvals for production deployments, signing build artifacts and verifying their provenance, keeping pipeline definitions in version control with review, and inserting security gates such as static analysis, SCA and container scanning that block releases with critical findings.",
   "Consider a worked example. A developer at an online travel company accidentally commits a cloud access key to a public repository. Secret scanning alerts within minutes, the key is revoked and rotated, and logs show no misuse. The review leads to several changes: pipelines now pull credentials from a secrets manager at build time, branch protection requires two reviewers for the main branch, the build pulls packages only from an internal mirror to prevent dependency confusion, and release artifacts are signed so production deployment verifies they came from the approved pipeline.",
   "Common mistakes: treating build servers and repositories as internal tools that need little protection; hard-coding secrets in code or pipeline files; trusting every public package by default; allowing any IDE extension; and letting a single developer merge and deploy to production without review. Another error is assuming a memory-safe language removes all vulnerabilities; it removes some classes of bugs, not logic flaws or injection.",
   "Exam questions tend to map a risk to a control. \"Vulnerable third-party library\" points to SCA. \"Unauthorized code merged\" points to branch protection and mandatory review. \"Credentials found in source code\" points to a secrets manager and secret scanning. \"Tampered build\" points to artifact signing and provenance verification. \"Buffer overflows\" points to memory-safe languages or bounds checking. Think like a manager: secure the pipeline and repositories as production-grade assets, and choose controls that prevent problems early and automatically."
  ],
  "terms": [
   [
    "Memory-safe language",
    "A language that prevents or manages memory errors such as buffer overflows by design."
   ],
   [
    "Software composition analysis (SCA)",
    "Tooling that identifies third-party components and their known vulnerabilities and licenses."
   ],
   [
    "Dependency confusion",
    "An attack in which a public package with the same name as an internal one is fetched by the build instead."
   ],
   [
    "Branch protection",
    "Repository rules that require reviews or checks before changes are merged into important branches."
   ],
   [
    "Secrets manager",
    "A service that stores and issues credentials and keys securely instead of embedding them in code."
   ],
   [
    "Continuous integration and continuous delivery (CI/CD)",
    "Automated pipelines that build, test and deploy code changes."
   ],
   [
    "Artifact signing",
    "Digitally signing build outputs so their origin and integrity can be verified before deployment."
   ]
  ],
  "example": "An engineering team discovers that a popular logging library it uses has a critical vulnerability. Because its SCA tool maintains an inventory of dependencies for every application, the team identifies all 37 affected services within an hour, updates the library through the pipeline, and redeploys. Teams without such inventory elsewhere in the industry spent weeks searching their codebases.",
  "tip": "Treat the build pipeline and repositories as production-grade assets. Common exam answers: SCA for third-party library risk, branch protection and code review for repository integrity, and a secrets manager instead of hard-coded credentials.",
  "check": [
   [
    "Which control best identifies known vulnerabilities in open-source dependencies?",
    "Software composition analysis (SCA)."
   ],
   [
    "What is dependency confusion?",
    "An attack in which a malicious public package shares a name with an internal package, causing the build tool to fetch it."
   ],
   [
    "How can an organization prevent a single developer from pushing unreviewed code to production?",
    "Branch protection requiring reviewed pull requests, plus approval gates in the CI/CD pipeline."
   ],
   [
    "Why should IDE extensions be restricted?",
    "They run with the developer's privileges and can access source code and secrets, so a malicious extension can compromise the ecosystem."
   ]
  ]
 },
 {
  "t": "Application security testing: SAST, DAST, SCA, IAST",
  "body": [
   "Application security testing tools automate the search for vulnerabilities in software. The exam expects you to know the four main categories, how each works, where it fits in the development lifecycle, and its strengths and blind spots. Mature programs use several together because each sees a different slice of the problem: your own code at rest, your application in motion, and the third-party components you did not write.",
   "Static application security testing (SAST) analyzes source code, bytecode or binaries without executing the program. It traces how data flows from inputs (sources) to sensitive operations (sinks) and flags paths where untrusted input reaches a database query, command execution or HTML output without validation or encoding. SAST is a white-box technique that can run as soon as code exists, often inside the integrated development environment (IDE) or on each commit, and it points developers to the exact file and line. Its weaknesses are false positives, language-specific support, and no visibility into runtime configuration, deployed infrastructure or issues that only appear when components interact.",
   "Dynamic application security testing (DAST) tests a running application from the outside, as an attacker would, without access to the source. It crawls the application, sends crafted requests and analyzes responses to detect injection, cross-site scripting, authentication weaknesses, missing security headers and information leakage. DAST is a black-box technique, independent of programming language, and it finds runtime and configuration problems SAST cannot see. However, it needs a deployed application, usually in a test or staging environment, runs later in the lifecycle, may miss code paths it cannot reach, and does not identify the responsible line of code.",
   "Software composition analysis (SCA) identifies the third-party and open-source components in an application, including transitive dependencies (the dependencies of your dependencies), and compares them with databases of known vulnerabilities and licenses. Because most modern applications are largely assembled from open-source code, SCA addresses a major share of risk. It can generate a software bill of materials (SBOM), alert when a newly disclosed vulnerability affects a component already in production, and flag license obligations that create legal risk. SCA does not find flaws in the organization's own code.",
   "Interactive application security testing (IAST) places an agent or sensors inside the running application, typically in a test environment, and observes code execution while functional tests or DAST scans exercise it. Because it sees both the incoming request and the internal data flow, IAST can confirm real vulnerabilities with fewer false positives and point to the responsible code. It depends on test coverage, since only exercised code is analyzed, and it supports specific languages and frameworks. A related technology, runtime application self-protection (RASP), uses similar instrumentation in production to block attacks rather than just report them. In a DevSecOps pipeline, SAST and SCA typically run on each commit or pull request, DAST and IAST run against staging builds, and findings feed a common defect process with severity thresholds that can block a release.",
   "Consider a worked example. An insurance company builds a customer claims portal. SAST in the pull request flags a query built by string concatenation, and the developer switches to a parameterized query before merging. SCA reports that a document-parsing library has a known critical vulnerability and a newer fixed version, so the dependency is updated. In staging, DAST finds that the session cookie lacks the Secure attribute, a configuration issue invisible to SAST, and IAST, running during automated functional tests, confirms that a file upload path writes user input to disk without validation, pointing to the exact method. Each finding is triaged, fixed and retested before release.",
   "Common mistakes: expecting SAST to find server misconfigurations; expecting DAST to report the vulnerable line of code; thinking SCA scans your own code for flaws; assuming IAST analyzes code that tests never execute; and treating tool output as final without human triage. Another error is running every tool only at the end of the project, which throws away the main advantage of static and composition analysis: finding problems early and cheaply.",
   "Exam questions match a tool to a situation. \"No running application yet\" or \"exact line of code\" points to SAST. \"Running application\", \"black box\" or \"source code not available\" points to DAST. \"Open-source components\", \"known vulnerable library\" or \"license compliance\" points to SCA. \"Agent inside the application\" or \"low false positives during testing\" points to IAST, and \"block attacks in production from inside the app\" points to RASP. Think like a manager: layer these tools across the pipeline so each covers the others' blind spots, and back them with a process for triage and remediation."
  ],
  "terms": [
   [
    "Static application security testing (SAST)",
    "White-box analysis of source code, bytecode or binaries without running the program."
   ],
   [
    "Dynamic application security testing (DAST)",
    "Black-box testing of a running application by sending requests and analyzing responses."
   ],
   [
    "Software composition analysis (SCA)",
    "Identification of third-party components and their known vulnerabilities and licenses."
   ],
   [
    "Interactive application security testing (IAST)",
    "Instrumentation inside a running application that observes execution during testing to confirm vulnerabilities."
   ],
   [
    "Runtime application self-protection (RASP)",
    "Instrumentation in a production application that detects and blocks attacks from within."
   ],
   [
    "Transitive dependency",
    "A component your application depends on indirectly, through another dependency."
   ],
   [
    "Source and sink",
    "In data-flow analysis, the point where untrusted input enters and the sensitive operation it may reach."
   ]
  ],
  "example": "A company buys a web application from a vendor that will not share source code. The security team cannot run SAST, so it runs DAST against a staging deployment and finds a reflected cross-site scripting flaw and verbose error messages revealing server versions. It reports both to the vendor under the contract's remediation terms and adds a web application firewall rule as a temporary compensating control.",
  "tip": "Match tool to situation: no running app yet and need exact code lines, SAST; running app, attacker's view, source unavailable, DAST; open-source dependency risk, SCA; instrumented running app with low false positives, IAST.",
  "check": [
   [
    "Which testing type can find a vulnerable open-source library that the organization did not write?",
    "Software composition analysis (SCA)."
   ],
   [
    "Why can DAST find issues that SAST misses?",
    "It tests the running application, so it sees runtime configuration and environment issues that are not visible in source code."
   ],
   [
    "What limits IAST's findings?",
    "It only analyzes code that is actually exercised by tests, so coverage determines what it can find."
   ],
   [
    "How does RASP differ from IAST?",
    "RASP runs in production and blocks attacks, while IAST runs in testing and reports vulnerabilities."
   ]
  ]
 },
 {
  "t": "Assessing effectiveness of software security: auditing, logging, risk analysis",
  "body": [
   "Deploying security tools and writing secure coding policies does not prove software is secure. Organizations need ways to assess whether their software security efforts are actually working, both for individual applications and for the development program as a whole. Three tools for this are auditing, logging and risk analysis, tied together by metrics that show trends over time and feed improvements back into the process.",
   "Auditing software security examines whether required practices are really followed and whether controls in the software work. A process audit might check a sample of releases for evidence of threat models, code reviews, passed security scans and approved exceptions. A technical audit might review an application's access controls, cryptography, data handling and configuration against standards. Audits can be internal or independent, and they produce findings that feed remediation. Change audits compare what is running in production against approved change records, revealing unauthorized modifications. Auditing also covers the development environment: who has access to repositories and pipelines, and whether that access is still appropriate.",
   "Logging supports assessment in two ways. First, the application must generate adequate security logs: authentication successes and failures, authorization failures, input validation failures, administrative actions, changes to sensitive data and security settings, and errors. Each entry should record what happened, when (using synchronized time), where, who or what initiated it and the outcome. Logs must not contain secrets such as passwords, session tokens or full payment card numbers, and logged input should be encoded to prevent log injection. Logs should flow to a protected central location for monitoring and be retained according to policy.",
   "Second, reviewing those logs shows whether attacks are occurring and whether controls stop them. A spike in authorization failures, for example, may show someone probing for access to other users' records. Insufficient logging and monitoring is itself a recognized weakness, because it lets attacks proceed unnoticed and leaves investigators with nothing to reconstruct. Logs also support accountability and non-repudiation, which is why their integrity must be protected.",
   "Risk analysis evaluates software risks in business terms so resources go where they matter most. Threat modeling identifies what could go wrong; methodologies such as STRIDE classify threats as spoofing, tampering, repudiation, information disclosure, denial of service and elevation of privilege. Risk analysis then weighs likelihood and impact to prioritize vulnerabilities and decide whether to mitigate, transfer, avoid or accept each one. Residual risk after controls must be accepted by an appropriate owner, and the analysis should be revisited when the application, its data or the threat environment changes. Metrics connect all of this: vulnerability density per application, mean time to remediate by severity, the percentage of applications with current threat models, security test coverage, open exceptions, and recurrence of the same weakness types.",
   "Consider a worked example. A bank's internal audit samples twenty releases of its mobile banking app and finds that four went live without the required static analysis scan, because an emergency release path skipped the pipeline gate. Log review shows the app records full account numbers in debug logs, which violates policy. The application security team updates its risk analysis: the missing scans raise the likelihood of undetected flaws, and the logged account numbers raise the impact of a log server breach. Management approves fixes to the emergency release path and log masking, and tracks both as metrics in the next quarter.",
   "Common mistakes: equating the number of tools deployed with security effectiveness; logging so little that incidents cannot be reconstructed, or so much that secrets end up in logs; failing to protect log integrity; performing risk analysis once at design and never revisiting it; and letting developers accept residual risk that belongs to a business owner. Another error is collecting metrics without acting on them, so the same weakness types recur release after release.",
   "Exam questions often focus on what logs should contain and who accepts risk. \"What should a security log record?\" points to who, what, when, where and outcome, with no secrets. \"Attacks went unnoticed for months\" points to insufficient logging and monitoring. \"Verify secure development practices are followed\" points to auditing, often by sampling. \"Prioritize application vulnerabilities\" points to risk analysis using likelihood and impact. Think like a manager: measure effectiveness with evidence and trends, and make sure residual risk is formally accepted by someone with the authority to do so."
  ],
  "terms": [
   [
    "Process audit",
    "A review of whether required development and security practices were actually followed, often by sampling."
   ],
   [
    "Security log",
    "A record of security-relevant events capturing who, what, when, where and outcome."
   ],
   [
    "Log injection",
    "Inserting crafted input into logs to forge entries or mislead analysis, prevented by encoding logged input."
   ],
   [
    "STRIDE",
    "A threat classification: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege."
   ],
   [
    "Residual risk",
    "The risk that remains after controls are applied, which must be formally accepted by an owner."
   ],
   [
    "Vulnerability density",
    "The number of vulnerabilities relative to the size of the codebase or application, used to compare and trend quality."
   ]
  ],
  "example": "An online store is breached through credential stuffing, but investigators cannot tell which accounts were accessed because the application logged only errors, not successful logins. The remediation adds logging of authentication events with source addresses and outcomes, sends logs to the SIEM with alerting on unusual login rates, and adds a risk analysis step to every new feature to decide what must be logged.",
  "tip": "Logs must capture enough to reconstruct events (who, what, when, where, outcome) but never secrets like passwords or session tokens. Risk analysis prioritizes by likelihood and impact, and residual risk needs formal acceptance by an owner.",
  "check": [
   [
    "Name three things a security log entry should record.",
    "Any three of: what happened, when, where, who or what initiated it, and the outcome."
   ],
   [
    "Why should passwords and session tokens never appear in logs?",
    "Anyone who can read the logs could reuse them to impersonate users, turning logs into a source of compromise."
   ],
   [
    "What does STRIDE help you do?",
    "Classify threats during threat modeling into spoofing, tampering, repudiation, information disclosure, denial of service and elevation of privilege."
   ],
   [
    "Who should accept residual risk for an application?",
    "The business or system owner with authority to accept risk, not the developer or security tester."
   ]
  ]
 },
 {
  "t": "Security impact of acquired software: COTS, open source, third party, managed services (SaaS, PaaS, IaaS)",
  "body": [
   "Most software an organization runs is not built in-house. It is bought, downloaded, contracted or consumed as a service. Each source brings different security risks and different levels of visibility and control, and the CISSP expects you to assess those risks before acquisition and manage them afterward. The constant across every source is accountability: you can outsource the work, but not responsibility for protecting your data.",
   "Commercial off-the-shelf (COTS) software is purchased from a vendor for general use. You usually cannot see or change the source code, so you depend on the vendor's development practices, testing and patching. Assess the vendor's security reputation, vulnerability disclosure and patching history, support lifecycle and end-of-support dates, and available certifications or independent evaluations such as Common Criteria. Configure the product securely because defaults often favor ease of use, test it before deployment, and plan for vendor failure, sometimes with a source code escrow agreement that releases code to you if the vendor goes out of business or stops supporting the product.",
   "Open-source software has publicly available source code, which allows review by anyone, but that does not guarantee anyone has reviewed it. Some projects are maintained by large, well-funded communities, others by a single volunteer. Risks include unpatched vulnerabilities, abandoned projects, malicious packages, compromised maintainer accounts and license obligations. Controls include software composition analysis (SCA), preferring well-maintained projects, pinning and verifying versions, tracking components in a software bill of materials (SBOM), and contributing to or funding critical dependencies.",
   "Third-party developed software, such as custom code written by contractors or outsourced firms, should be governed by contracts that specify security requirements, secure coding standards, testing obligations, ownership of code, the right to audit, vulnerability remediation timelines and liability. Review and test delivered code as if it were your own, and control contractor access to your repositories and environments with least privilege and prompt removal at the end of the engagement.",
   "Managed services move software and infrastructure to providers, and the shared responsibility model defines who secures what. In infrastructure as a service (IaaS), the provider secures the physical facilities, hardware and virtualization, while the customer manages operating systems, middleware, applications, data and access. In platform as a service (PaaS), the provider also manages the operating system and runtime, and the customer secures its application code, data and configuration. In software as a service (SaaS), the provider runs the entire application, and the customer is responsible mainly for its data, user accounts, access settings and how the service is configured and integrated. Assess providers through due diligence: security questionnaires, SOC 2 Type II reports and ISO/IEC 27001 certification, data location and residency, encryption and key management options, incident notification terms, availability commitments in service level agreements (SLAs), data return and deletion at exit, and subcontractors. Monitor performance and reassess periodically.",
   "Consider a worked example. A marketing department wants to adopt a SaaS customer analytics tool. Before signing, security reviews the provider's SOC 2 Type II, confirms data is stored in an approved region, negotiates breach notification within a defined time and data deletion at contract end, and requires single sign-on with multifactor authentication. The tool's browser plug-in uses several open-source libraries, which SCA checks. After go-live, a quarterly access review finds that departed contractors still had accounts in the SaaS tool, a customer-side responsibility, and the team automates deprovisioning through the identity provider.",
   "Common mistakes: assuming the SaaS provider handles user access management; believing open source is secure because anyone can review it; accepting COTS default configurations; skipping contract security terms with outsourced developers; and thinking IaaS makes the provider responsible for patching guest operating systems. Another error is doing due diligence once at purchase and never reassessing, even as the provider changes subcontractors or suffers incidents.",
   "Exam questions often test responsibility and contract protections. \"Vendor goes out of business\" points to source code escrow. \"Who patches the guest operating system in IaaS?\" points to the customer. \"Who is accountable for data in the cloud?\" is always the customer. \"Assess a provider's controls\" points to SOC 2 Type II or ISO/IEC 27001 plus contract terms. \"Unknown vulnerabilities in open-source components\" points to SCA and an SBOM. Think like a manager: perform due diligence before acquisition, write security into contracts, and keep monitoring, because accountability never transfers."
  ],
  "terms": [
   [
    "Commercial off-the-shelf (COTS)",
    "Software bought from a vendor for general use, typically without access to source code."
   ],
   [
    "Source code escrow",
    "An arrangement in which a third party holds a vendor's source code for release to the customer under agreed conditions, such as vendor failure."
   ],
   [
    "Shared responsibility model",
    "The division of security duties between a cloud provider and customer, varying across IaaS, PaaS and SaaS."
   ],
   [
    "Infrastructure as a service (IaaS)",
    "A cloud model providing virtual compute, storage and networks, with the customer managing operating systems and above."
   ],
   [
    "Platform as a service (PaaS)",
    "A cloud model providing a managed platform and runtime on which the customer deploys its code."
   ],
   [
    "Software as a service (SaaS)",
    "A cloud model providing a complete application, with the customer managing data, users and configuration."
   ],
   [
    "Due diligence",
    "The investigation and assessment performed before and during a relationship to understand and manage its risks."
   ]
  ],
  "example": "A hospital buys a COTS scheduling system whose vendor is a small startup. The contract includes source code escrow and a clause requiring security patches within a defined period. Two years later the vendor is acquired and the product discontinued. The escrow agent releases the source code to the hospital, which contracts another firm to maintain the system until a replacement is in place.",
  "tip": "The organization remains accountable for its data regardless of model. In IaaS the customer manages the most; in SaaS the least, but always data, identities and configuration. For COTS, escrow protects against vendor failure.",
  "check": [
   [
    "In IaaS, who is responsible for patching the guest operating system?",
    "The customer, because the provider manages only the physical infrastructure and virtualization layer."
   ],
   [
    "What does source code escrow protect against?",
    "The vendor going out of business or ending support, by releasing the source code to the customer under agreed conditions."
   ],
   [
    "Why is open-source software not automatically trustworthy?",
    "Public code can be reviewed but may not have been, and projects can be abandoned, compromised or carry license obligations."
   ],
   [
    "What should a customer always manage in SaaS?",
    "Its data, user identities and access, and the configuration of the service."
   ]
  ]
 },
 {
  "t": "Secure coding guidelines and standards: source code weaknesses, API security, secure coding practices",
  "body": [
   "Secure coding standards give developers concrete rules for writing software that resists attack. They turn broad principles into practices that can be taught, checked by tools and enforced in code review. Well-known references include the OWASP Top 10 (the most critical web application security risks), the OWASP Application Security Verification Standard (ASVS), the Common Weakness Enumeration (CWE) list of software weakness types and its Top 25 most dangerous weaknesses, the SEI CERT coding standards for specific languages, and the NIST Secure Software Development Framework (SSDF). Organizations usually adopt one or more and tailor them to their languages and platforms.",
   "Source code weaknesses fall into recurring categories. Poor input validation lets untrusted data reach interpreters. Improper error handling reveals stack traces, versions or database details to users. Hard-coded credentials and keys end up in repositories. Weak or home-grown cryptography, predictable random numbers and outdated algorithms undermine confidentiality. Broken access control fails to check authorization on each request. Race conditions and unsafe memory handling create subtle flaws. Backdoors or maintenance hooks, sometimes left by developers for testing, bypass normal controls and must be removed before release. Dead code and debugging features left in production widen the attack surface.",
   "Core secure coding practices counter these weaknesses. Validate all input on the server side against an allow list of expected type, length, format and range; client-side checks are for usability only, since an attacker controls the client. Encode output for the context where it is used, such as HTML, JavaScript or URLs. Use parameterized queries or safe APIs rather than building commands by string concatenation. Enforce authentication and authorization centrally and check authorization for every request and object. Fail securely: on error, deny access and show generic messages while logging details internally. Use well-vetted cryptographic libraries and never invent algorithms. Keep secrets outside code. Apply least privilege to the application's own accounts, keep dependencies updated, and log security events without sensitive data.",
   "Application programming interfaces (APIs) deserve special attention because they expose functionality and data directly to other programs, without a user interface that might hide weaknesses. The OWASP API Security Top 10 highlights risks such as broken object-level authorization (BOLA), where an API returns any record whose identifier is supplied without checking ownership; broken authentication; exposing more object properties than the caller should see; and unrestricted resource consumption, such as missing rate limits. Secure APIs by requiring strong authentication, for example OAuth 2.0 access tokens with limited scopes; authorizing each object and function; validating input against a schema; returning only necessary fields; enforcing rate limits and quotas; using Transport Layer Security (TLS); keeping an inventory of all API versions, including old ones; and monitoring through an API gateway. REST APIs commonly use JSON and tokens, while SOAP APIs use XML and can use WS-Security.",
   "Enforce standards through training, IDE plug-ins, static analysis rules mapped to the standard, peer code review checklists and pipeline gates. Measure which weakness types recur, and target training at them. A standard that exists only as a document changes nothing; one built into tools and reviews changes code.",
   "Consider a worked example. A fitness app exposes an endpoint that returns a user's workout history when given a user identifier. A security review finds that any logged-in user can change the identifier in the request and see anyone else's data, a textbook BOLA flaw. The fix checks, on the server, that the requested record belongs to the caller's authenticated identity. The review also finds that error responses include full stack traces and that the API has no rate limit. The team adds generic error messages with internal logging, rate limiting at the gateway, and a static analysis rule and code review checklist item for object-level authorization.",
   "Common mistakes: relying on client-side validation for security; using deny lists of bad characters instead of allow lists of expected input; assuming a logged-in user is authorized for every object; showing detailed errors to users; writing custom encryption; and leaving old API versions running without monitoring. Another trap is thinking HTTPS alone secures an API; TLS protects data in transit but does nothing for authorization flaws.",
   "Exam questions usually point from a symptom to a practice. \"Injection\" points to parameterized queries and server-side validation. \"Script runs in users' browsers\" points to output encoding. \"User can view other users' records by changing an ID\" points to object-level authorization. \"Detailed errors reveal database structure\" points to secure error handling. \"Credentials found in source\" points to a secrets manager. \"Developer left a hidden entry point\" points to a maintenance hook that code review should catch. Think like a manager: adopt a recognized standard, enforce it with tools and reviews, and measure recurring weaknesses to target training."
  ],
  "terms": [
   [
    "Common Weakness Enumeration (CWE)",
    "A catalog of software and hardware weakness types, including a list of the most dangerous."
   ],
   [
    "Input validation",
    "Checking that input matches expected type, length, format and range, ideally against an allow list on the server."
   ],
   [
    "Output encoding",
    "Converting data so it is treated as data, not code, in the context where it is displayed or used."
   ],
   [
    "Parameterized query",
    "A database query in which user input is passed separately from the SQL text, preventing injection."
   ],
   [
    "Broken object-level authorization (BOLA)",
    "An API flaw in which the server returns objects without checking that the caller may access them."
   ],
   [
    "Maintenance hook",
    "An undocumented entry point left in code that bypasses normal security controls."
   ],
   [
    "Fail securely",
    "Designing errors to deny access by default and reveal minimal information."
   ]
  ],
  "example": "During code review, a reviewer notices a developer's comment reading 'temporary admin bypass for testing' next to a check that grants administrator rights when a special header is present. The code is removed before release, a static analysis rule is added to flag similar patterns, and the team's release checklist gains an item confirming no debug or bypass features remain.",
  "tip": "Server-side input validation with allow lists and context-aware output encoding are the cornerstone answers for injection and XSS questions. For APIs, remember object-level authorization: verify the caller may access each specific record, not just that they are logged in.",
  "check": [
   [
    "Why is client-side input validation insufficient for security?",
    "The attacker controls the client and can bypass it, so validation must be enforced on the server."
   ],
   [
    "A user changes an account number in an API request and sees another customer's data. What weakness is this?",
    "Broken object-level authorization, because the API did not verify that the caller owns the requested record."
   ],
   [
    "What does failing securely mean for error handling?",
    "Deny access on error and show a generic message to users, while logging details internally."
   ],
   [
    "What is a maintenance hook and why is it dangerous?",
    "An undocumented entry point left by developers that bypasses normal controls and can be discovered and abused."
   ]
  ]
 },
 {
  "t": "Software-defined security",
  "body": [
   "Software-defined security means expressing security controls as software and code that can be deployed, changed and scaled automatically, rather than depending on physical appliances and manual configuration. It grew alongside cloud computing, virtualization, containers and software-defined networking (SDN), where infrastructure is created and destroyed through application programming interfaces (APIs) in minutes and traditional perimeter hardware cannot keep up. If servers exist for only an hour, their firewall rules have to be created and removed with them.",
   "The underlying idea is separating the control plane from the data plane. In SDN, a central controller decides how traffic should flow (the control plane), while switches and virtual network devices simply forward packets as instructed (the data plane). Security policy can therefore be defined centrally and pushed everywhere at once. The same principle applies to security generally: policies are defined in a central management layer and enforced by distributed software agents, virtual firewalls or cloud-native controls close to each workload.",
   "Several practices fall under this umbrella. Micro-segmentation applies fine-grained firewall policy between individual workloads, based on identity and labels rather than IP addresses, which limits lateral movement. Security groups and network policies in cloud and container platforms are software-defined firewalls attached to resources. Infrastructure as code (IaC) defines networks, identities and security settings in version-controlled templates, and policy as code expresses security and compliance rules in machine-readable form so they can be tested automatically, for example rejecting any template that creates a publicly readable storage bucket or an unencrypted virtual machine. A software-defined perimeter (SDP) hides services until a user and device are authenticated and authorized, creating per-session connections consistent with zero trust. Security orchestration can respond to threats by changing policy instantly, such as quarantining a compromised container.",
   "The benefits are consistency, speed and scale. The same policy applies everywhere, changes are reviewed and tracked like code, drift is detected and corrected automatically, and security follows workloads as they move or scale. Controls can be tested in pipelines before deployment, which shifts infrastructure security left, and version history provides an audit trail of exactly who changed which policy and when.",
   "The risks are concentrated and new. The central controller, management console, orchestration platform and pipeline become extremely high-value targets: whoever controls them controls every enforcement point. Protect them with strong authentication, least privilege, separation of duties, network isolation and audit logging. Errors propagate as fast as correct policies, so a single bad template can expose thousands of resources; code review, automated testing and staged rollouts reduce this. Teams also need skills in both security and software engineering, and visibility tools that understand dynamic, short-lived resources.",
   "Consider a worked example. A streaming company runs thousands of containers that scale up and down with demand. Instead of maintaining firewall rules by IP address, it labels workloads by function and writes network policies such as allowing only the payment service to reach the payment database. Policies live in a repository, and a policy-as-code check in the pipeline blocks any change that opens the database to other services. When monitoring detects a compromised container, an automated playbook applies a quarantine label, and the platform immediately isolates it. A later review finds that too many engineers had administrative rights to the orchestration platform, so access is reduced and changes now require two approvers.",
   "Common mistakes: assuming software-defined controls are automatically secure because they are automated; protecting workloads but leaving the controller or pipeline weakly defended; pushing policy changes everywhere at once without testing; relying on IP-based rules in environments where addresses change constantly; and confusing SDN (programmable networking in general) with software-defined security (using that programmability for security policy). Another error is forgetting that policy as code still needs review, just like application code.",
   "Exam questions typically ask about benefits or the main risk. \"Consistent policy across dynamic cloud workloads\" points to software-defined security, micro-segmentation or policy as code. \"Separate decision making from forwarding\" points to the SDN control and data planes. \"Hide services until authenticated\" points to a software-defined perimeter. \"Biggest risk of centralized control\" points to compromise of the controller or management plane. Think like a manager: gain speed and consistency, but treat the control plane as your most sensitive asset and put change control around policy code."
  ],
  "terms": [
   [
    "Software-defined networking (SDN)",
    "An architecture that separates the network control plane from the data plane so traffic is managed centrally through software."
   ],
   [
    "Control plane",
    "The layer that makes decisions about policy and traffic flow."
   ],
   [
    "Data plane",
    "The layer that forwards traffic according to the control plane's instructions."
   ],
   [
    "Micro-segmentation",
    "Fine-grained security policy between individual workloads to limit lateral movement."
   ],
   [
    "Policy as code",
    "Security and compliance rules written in machine-readable form so they can be versioned and tested automatically."
   ],
   [
    "Software-defined perimeter (SDP)",
    "An approach that hides services until users and devices are authenticated and authorized, creating per-session access."
   ]
  ],
  "example": "A cloud engineer merges a template change that accidentally allows inbound traffic from anywhere to every database security group. Because the change is deployed automatically across all regions, hundreds of databases are exposed within minutes. The drift detection and policy checks catch it, and the change is reverted. Afterward, the team adds a policy-as-code rule that blocks such templates in the pipeline and requires staged rollout across regions.",
  "tip": "The strength of software-defined security is centralized, automated, consistent policy; its main risk is that the controller or management plane becomes a single high-value target, and mistakes propagate at machine speed.",
  "check": [
   [
    "What does separating the control plane from the data plane allow?",
    "Security and traffic policy can be defined centrally and pushed to many enforcement points at once."
   ],
   [
    "Why is micro-segmentation effective against lateral movement?",
    "It restricts communication between individual workloads, so a compromised system cannot freely reach others."
   ],
   [
    "What is the main risk of centralized software-defined control?",
    "Compromise of or errors in the controller or pipeline affect every enforcement point at once."
   ],
   [
    "What does policy as code enable?",
    "Automatic, repeatable testing and enforcement of security rules, such as blocking noncompliant templates before deployment."
   ]
  ]
 },
 {
  "t": "Common weaknesses: injection, XSS, CSRF, buffer overflow, race conditions, insecure deserialization",
  "body": [
   "A small number of weakness types account for a large share of software vulnerabilities. The exam expects you to recognize each one from a scenario, understand why it happens and name the primary defenses. You do not need to know how to exploit them; you need to know how they arise, how to spot them in a description, and which control addresses each root cause.",
   "Injection occurs when untrusted input is sent to an interpreter as part of a command or query and the interpreter treats some of that input as code. SQL injection is the classic case: an application builds a database query by concatenating user input, and crafted input changes the query's logic to read or modify data. The same pattern affects operating system commands, Lightweight Directory Access Protocol (LDAP) queries and others. The primary defense is keeping code and data separate with parameterized queries (prepared statements) or safe APIs, supported by server-side input validation, least-privilege database accounts and careful error handling. In the defensive example below, the database driver sends the value separately from the SQL text, so it can never change the query's structure.",
   "```python\n# Safe: the driver sends the value separately from the SQL text\ncursor.execute(\"SELECT name FROM users WHERE id = %s\", (user_id,))\n```",
   "Cross-site scripting (XSS) lets an attacker cause a victim's browser to run script in the context of a trusted site, enabling session theft, page defacement or actions as the user. Stored XSS saves the malicious content on the server, in a comment for example; reflected XSS bounces it off a request parameter in a crafted link; DOM-based XSS happens entirely in client-side script. Defenses include context-aware output encoding, input validation, frameworks that escape output automatically, a Content Security Policy (CSP) header, and the HttpOnly cookie attribute so script cannot read session tokens. Cross-site request forgery (CSRF) is different: it tricks a logged-in user's browser into sending an unwanted request, such as changing an email address, to a site that trusts that browser, because the browser attaches cookies automatically. Defenses include anti-CSRF tokens tied to the session, the SameSite cookie attribute, and reauthentication for sensitive actions. XSS abuses the user's trust in a site; CSRF abuses the site's trust in the user's browser.",
   "A buffer overflow occurs when a program writes more data into a memory buffer than it can hold, overwriting adjacent memory. This can crash the program or, when an attacker controls the overwritten data, redirect execution. It is most common in languages without automatic bounds checking, such as C and C++. Defenses include bounds checking and safe functions, memory-safe languages, and platform protections such as address space layout randomization (ASLR), data execution prevention (DEP) and stack canaries. Race conditions happen when the outcome depends on the timing of events. The time-of-check to time-of-use (TOCTOU) flaw is typical: a program checks a condition, such as file permissions or an account balance, then acts on it, but the state changes in between. Defenses include atomic operations, proper locking and rechecking within a single transaction. Insecure deserialization occurs when an application rebuilds objects from untrusted serialized data, which may let an attacker manipulate application logic or even trigger code execution. Avoid deserializing untrusted data, prefer simple data formats such as JSON with strict schemas, apply integrity checks such as digital signatures, and restrict which classes may be deserialized.",
   "Consider a worked example. A banking app lets users transfer money. A review finds that two simultaneous transfer requests can both pass the balance check before either deducts funds, a TOCTOU race, so the fix performs the check and deduction in one locked database transaction. The same review finds that the transfer form lacks an anti-CSRF token, and that the app stores user preferences as serialized objects in a cookie, which is replaced with signed JSON.",
   "Common mistakes: mixing up XSS and CSRF; relying on input filtering alone instead of parameterized queries for injection; thinking HTTPS prevents XSS or CSRF (it protects transport, not application logic); believing ASLR and DEP eliminate buffer overflows rather than making exploitation harder; and treating a race condition as a performance issue rather than a security flaw. Another error is assuming serialized data from your own cookie is trustworthy, when the user can modify it.",
   "Exam questions describe symptoms. \"Input changes a database query\" points to injection and parameterized queries. \"Script runs in other users' browsers\" points to XSS and output encoding. \"Logged-in user's browser performs an action they did not intend\" points to CSRF and anti-CSRF tokens. \"Writing past the end of memory\" points to buffer overflow and bounds checking. \"Check and use happen at different times\" points to TOCTOU and atomic operations. \"Rebuilding objects from untrusted data\" points to insecure deserialization. Think like a manager: fix root causes through secure coding standards, frameworks and training rather than patching symptoms one by one."
  ],
  "terms": [
   [
    "Injection",
    "A flaw where untrusted input is interpreted as part of a command or query."
   ],
   [
    "Cross-site scripting (XSS)",
    "A flaw that lets attacker-supplied script run in a victim's browser in the context of a trusted site."
   ],
   [
    "Cross-site request forgery (CSRF)",
    "An attack that makes an authenticated user's browser send an unwanted request to a trusting site."
   ],
   [
    "Buffer overflow",
    "Writing more data into a memory buffer than it can hold, overwriting adjacent memory."
   ],
   [
    "Time-of-check to time-of-use (TOCTOU)",
    "A race condition where a condition changes between being checked and being used."
   ],
   [
    "Insecure deserialization",
    "Rebuilding objects from untrusted serialized data in a way that allows manipulation or code execution."
   ],
   [
    "Content Security Policy (CSP)",
    "A browser security header that restricts where scripts and other content may load from, limiting XSS impact."
   ]
  ],
  "example": "A community forum lets users post comments containing formatting. An attacker posts a comment containing script, and every visitor who views the thread runs it, sending their session cookies elsewhere. The forum fixes the stored XSS by encoding output with a templating framework that escapes by default, adds a Content Security Policy, and marks session cookies HttpOnly so script cannot read them.",
  "tip": "Distinguish XSS from CSRF: XSS runs attacker script in the victim's browser (the user trusts the site); CSRF sends forged requests using the victim's session (the site trusts the browser). Parameterized queries are the best single answer for SQL injection.",
  "check": [
   [
    "What is the best primary defense against SQL injection?",
    "Parameterized queries (prepared statements), which keep user data separate from the SQL code."
   ],
   [
    "How does CSRF differ from XSS?",
    "CSRF forges requests from an authenticated user's browser to a trusting site, while XSS runs attacker script in the victim's browser."
   ],
   [
    "What is a TOCTOU flaw and how is it prevented?",
    "A race where a condition changes between check and use; prevent it with atomic operations, locking or rechecking in one transaction."
   ],
   [
    "Name two platform protections that make buffer overflows harder to exploit.",
    "Address space layout randomization (ASLR) and data execution prevention (DEP), along with stack canaries."
   ]
  ]
 }
], { reviewed: "2026-09-30" });
