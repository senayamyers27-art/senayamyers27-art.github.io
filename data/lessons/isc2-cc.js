/* Lessons for ISC2 Certified in Cybersecurity (2026 outline): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("isc2-cc", [
 {
  "t": "Cybersecurity concepts: confidentiality, integrity, availability",
  "body": [
   "Almost every security decision you will study for the CC exam traces back to three goals, known together as the CIA triad: confidentiality, integrity and availability. When you are unsure what a control is for, ask which of these three it protects. When you are unsure how bad an incident is, ask which of the three was lost. The triad gives you a shared vocabulary for describing both problems and solutions.",
   "Confidentiality means information is disclosed only to people, processes and devices that are authorized to see it. You protect it with access controls, encryption, data classification and training that teaches staff not to leave sensitive files in public places. Confidentiality is lost when a database is stolen, when someone reads a screen over your shoulder, or when an email with customer records goes to the wrong address. A closely related idea is sensitivity: the more harm disclosure would cause, the more protection the data needs.",
   "Integrity means information and systems are accurate, complete and changed only in authorized ways. It covers data integrity (the payroll figures have not been altered), system integrity (the operating system has not been tampered with) and, in some texts, the integrity of the people and processes that handle data. Hashing lets you detect that a file changed, digital signatures show who produced it, and change management plus access control stop unauthorized edits in the first place. An attacker who changes a bank account number on an invoice has attacked integrity even if nothing was disclosed.",
   "Availability means authorized users can get timely and reliable access to information and systems when they need them. Threats include denial-of-service attacks, hardware failure, power outages, ransomware that locks files and simple mistakes such as deleting the wrong virtual machine. Defenses include redundancy, backups, spare capacity, uninterruptible power supplies and tested recovery plans. Availability is judged against business need: a hospital record system that is down for ten minutes may be critical, while a marketing archive can wait a day.",
   "The three goals can pull against each other. Encrypting everything and requiring several approvals improves confidentiality and integrity, but makes data slower to reach. Keeping many copies of data improves availability but creates more places it can leak. Good security finds the balance the business needs rather than maximizing one goal. The exam often describes a scenario and asks which principle is most affected, so practice naming the primary loss: leaked data is confidentiality, altered data is integrity, and unreachable data is availability.",
   "You will also meet the opposite of CIA, sometimes called DAD: disclosure, alteration and destruction (or denial). It is simply the attacker's view of the same triad and can help you classify an attack quickly."
  ],
  "terms": [
   [
    "Confidentiality",
    "Keeping information from being disclosed to unauthorized people, processes or devices."
   ],
   [
    "Integrity",
    "Assurance that data and systems are accurate, complete and changed only in authorized ways."
   ],
   [
    "Availability",
    "Timely and reliable access to information and systems for authorized users."
   ],
   [
    "Sensitivity",
    "A measure of how much harm would result from unauthorized disclosure of information."
   ],
   [
    "DAD triad",
    "Disclosure, alteration and destruction or denial: the attacker-side opposites of confidentiality, integrity and availability."
   ]
  ],
  "example": "A clinic's patient portal is hit three ways in one month: a misconfigured storage bucket exposes scanned records (confidentiality), a bug lets patients edit their own lab results (integrity), and a ransomware attack takes the scheduling system offline for two days (availability). Each incident needs different controls: access settings and encryption, input validation and change control, and offline backups with a recovery plan.",
  "tip": "When a question asks which principle is affected, pick the one that was lost first and most directly. Ransomware that only encrypts files is primarily an availability problem; ransomware that also steals data adds a confidentiality loss.",
  "check": [
   [
    "An attacker changes the destination account number on a pending wire transfer. Which part of the CIA triad is primarily affected?",
    "Integrity, because the data was altered without authorization; nothing was necessarily disclosed or made unavailable."
   ],
   [
    "Which control mainly supports availability: encryption at rest, redundant power supplies, or file hashing?",
    "Redundant power supplies, because they keep systems running when one component fails. Encryption supports confidentiality and hashing supports integrity."
   ],
   [
    "Why can maximizing confidentiality hurt availability?",
    "Extra layers such as encryption, approvals and strict access make it slower or harder for legitimate users to reach data, so controls must be balanced against business need."
   ]
  ]
 },
 {
  "t": "Authentication, authorization and accounting (AAA), non-repudiation, privacy",
  "body": [
   "Beyond the CIA triad, the CC exam expects you to know a set of supporting ideas that describe how systems decide who can do what, and how they prove it later. The most common grouping is AAA: authentication, authorization and accounting. Many texts put identification in front of it, because a system must first be told who you claim to be.",
   "Authentication is proving a claimed identity. You type a username (identification) and then a password, a code from an app, or a fingerprint (authentication). Authorization happens next and answers a different question: now that the system knows who you are, what are you allowed to do? File permissions, roles and access control lists are authorization mechanisms. Accounting, sometimes called auditing, records what authenticated users actually did, such as logins, file access and configuration changes, so that actions can be reviewed and traced back to a person. On the exam, watch the order: identify, authenticate, authorize, then account.",
   "Non-repudiation means a person cannot credibly deny having performed an action, such as sending a message or approving a payment. It depends on strong authentication plus trustworthy records. Digital signatures are the classic technical example: a message signed with someone's private key could only have been signed by the holder of that key, so the signer cannot easily say it was forged. Shared accounts destroy non-repudiation because you cannot tell which of several people used the login. Detailed, tamper-resistant logs support it.",
   "Privacy is the right of individuals to control how information about them is collected, used, shared and kept. It overlaps with confidentiality but is not the same thing. Confidentiality is a property of data that an organization protects; privacy is about people's rights and expectations, and it is often defined by law. An organization can keep data perfectly confidential and still violate privacy, for example by collecting more personal information than it needs or using it for a purpose the person never agreed to. Personally identifiable information (PII) is any information that can identify a specific person, such as a name combined with a date of birth or a national ID number.",
   "These concepts work together. Authentication ties actions to identities, authorization limits those actions, accounting records them, non-repudiation makes the records meaningful, and privacy rules decide what personal data should be handled at all. In a lab you will see accounting in practice when you open the Windows Event Viewer security log or a Linux authentication log and find entries showing which account logged in and when."
  ],
  "terms": [
   [
    "Authentication",
    "Verifying that a claimed identity is genuine, for example with a password, token or biometric."
   ],
   [
    "Authorization",
    "Deciding what an authenticated identity is permitted to access or do."
   ],
   [
    "Accounting",
    "Recording the actions of authenticated users so they can be reviewed and traced; also called auditing."
   ],
   [
    "Non-repudiation",
    "Assurance that someone cannot credibly deny having performed an action, commonly provided by digital signatures and reliable logs."
   ],
   [
    "Privacy",
    "An individual's right to control the collection, use and sharing of information about them."
   ],
   [
    "PII",
    "Personally identifiable information: data that can identify a specific individual."
   ]
  ],
  "example": "A finance team shares one login for the payment system. When an unauthorized transfer appears, the logs show only the shared account, so nobody can be held responsible. After the review, each person gets an individual account, payments require a digitally signed approval, and every action is logged, restoring accountability and non-repudiation.",
  "tip": "Do not confuse authentication (who are you?) with authorization (what may you do?). Also remember that shared or generic accounts break accountability and non-repudiation, a favorite exam scenario.",
  "check": [
   [
    "A user logs in successfully but receives an 'access denied' message when opening a payroll folder. Which AAA element blocked them?",
    "Authorization. Authentication succeeded, but the permissions did not allow access to that folder."
   ],
   [
    "Which technology most directly provides non-repudiation for an email?",
    "A digital signature created with the sender's private key, because only the key holder could have produced it."
   ],
   [
    "How can an organization keep data confidential and still violate privacy?",
    "By collecting or using personal data beyond what is needed or agreed, even if that data is never disclosed to outsiders."
   ]
  ]
 },
 {
  "t": "Authentication factors and multi-factor authentication",
  "body": [
   "Authentication is only as strong as the evidence a person presents. Security professionals group that evidence into factor types, and the CC exam expects you to classify any method quickly. The three core factors are something you know, something you have and something you are.",
   "Something you know is a knowledge factor: a password, passphrase, personal identification number (PIN) or answer to a security question. It is cheap and familiar but can be guessed, reused, phished or stolen from a breached database. Something you have is a possession factor: a smart card, a hardware security key, a phone running an authenticator app that generates time-based one-time passwords, or a phone that receives a code by text message. Something you are is an inherence factor, meaning biometrics such as fingerprints, face geometry, iris patterns or voice. Some texts add context factors such as somewhere you are (location) or something you do (typing rhythm), which are usually used to adjust risk rather than as a main factor.",
   "Multi-factor authentication (MFA) requires evidence from two or more different factor types. The word different is the key. A password plus a PIN is still single-factor, because both are something you know. A password plus a code from an authenticator app is two-factor, because it combines knowing and having. MFA works because an attacker who steals one factor, such as a phished password, still lacks the other. That is why enabling MFA is one of the most effective controls against account takeover.",
   "Not all MFA is equally strong. Codes sent by text message can be intercepted or redirected if an attacker convinces a phone carrier to move the victim's number to a new SIM card. Push notifications can be abused through fatigue attacks, where an attacker triggers repeated prompts hoping the user approves one to make them stop. Phishing-resistant methods, such as hardware security keys and passkeys that use public-key cryptography bound to the real website, resist fake login pages because the credential will not work on the wrong site.",
   "Biometrics bring their own trade-offs. They are measured with two error rates. The false rejection rate (Type I error) is how often a legitimate user is wrongly refused; the false acceptance rate (Type II error) is how often an impostor is wrongly accepted. Tuning the sensor to lower one raises the other, and the point where they are equal is the crossover error rate, a common way to compare devices. For high-security uses, false acceptance is the more dangerous error. Biometrics also cannot be changed if compromised, so the templates must be carefully protected."
  ],
  "terms": [
   [
    "Knowledge factor",
    "Something you know, such as a password or PIN."
   ],
   [
    "Possession factor",
    "Something you have, such as a smart card, hardware key or authenticator app."
   ],
   [
    "Inherence factor",
    "Something you are, meaning a biometric trait such as a fingerprint or face."
   ],
   [
    "Multi-factor authentication (MFA)",
    "Authentication that requires evidence from two or more different factor types."
   ],
   [
    "False acceptance rate",
    "How often a biometric system accepts an impostor; also called a Type II error."
   ],
   [
    "Crossover error rate",
    "The point where false acceptance and false rejection rates are equal, used to compare biometric systems."
   ]
  ],
  "example": "An attacker phishes an employee's password and tries to log in to email. The account requires a hardware security key as a second factor, and the key refuses to respond to the fake site. The attacker is stopped, and the security team sees a failed login from an unusual location in the logs and resets the password.",
  "tip": "Count factor types, not steps. Password plus security question is one factor used twice. Password plus fingerprint, or smart card plus PIN, is true multi-factor authentication.",
  "check": [
   [
    "A login requires a password and a four-digit PIN. Is this multi-factor authentication?",
    "No. Both are something you know, so it is single-factor authentication with two knowledge items."
   ],
   [
    "Which biometric error is more dangerous for a high-security door, false acceptance or false rejection?",
    "False acceptance (Type II), because it lets an unauthorized person in. False rejection only inconveniences a legitimate user."
   ],
   [
    "Why are hardware security keys considered phishing-resistant?",
    "They use public-key cryptography tied to the genuine site's identity, so a credential will not be produced for, or accepted by, a look-alike phishing site."
   ]
  ]
 },
 {
  "t": "Risk terms: asset, threat, vulnerability, likelihood, impact",
  "body": [
   "Security exists to manage risk, so you need precise words for the pieces of a risk. The CC exam uses these terms carefully and will test whether you can tell them apart in a short scenario.",
   "An asset is anything of value to the organization that needs protection: data, hardware, software, people, facilities, processes and reputation. You cannot protect what you have not identified, so risk work starts with an asset inventory and a sense of each asset's value. Value can be measured in money, but also in how critical the asset is to operations or how sensitive its data is.",
   "A threat is anything that could cause harm to an asset. Threats can be people (a criminal gang, a careless employee, a disgruntled insider), natural events (flood, fire, earthquake) or technical events (a failed disk, a power outage). The person or thing that carries out the threat is called a threat actor or threat agent, and the path it uses is sometimes called a threat vector, such as email, a USB drive or an exposed remote access port.",
   "A vulnerability is a weakness that a threat could exploit. Examples include an unpatched server, a weak password policy, an unlocked server room, a lack of backups or staff who have never been trained to spot phishing. An exploit is the actual method or tool that takes advantage of a vulnerability. The key insight is that a threat without a matching vulnerability causes no harm, and a vulnerability that no threat can reach is low risk. Risk exists where threats, vulnerabilities and valuable assets meet.",
   "Likelihood (also called probability) is how probable it is that a threat will exploit a vulnerability within a given time. Impact is how much harm would result if it did: lost money, downtime, legal penalties, safety issues or damaged reputation. Risk is commonly described as a combination of the two, often summarized as risk equals likelihood times impact. A likely event with trivial impact and a rare event with catastrophic impact can both deserve attention, for different reasons.",
   "Organizations track risks in a risk register, a table listing each risk with its asset, threat, vulnerability, likelihood, impact, owner and chosen treatment. In the domain lab you will build a small one. Keeping these terms straight helps: you usually cannot control threats (you cannot stop criminals existing), but you can reduce vulnerabilities, lower impact through backups and redundancy, and protect assets with controls."
  ],
  "terms": [
   [
    "Asset",
    "Anything of value to an organization that needs protection, such as data, systems, people or reputation."
   ],
   [
    "Threat",
    "Any potential cause of harm to an asset, whether human, natural or technical."
   ],
   [
    "Vulnerability",
    "A weakness that a threat could exploit."
   ],
   [
    "Likelihood",
    "The probability that a threat will exploit a vulnerability in a given period."
   ],
   [
    "Impact",
    "The magnitude of harm that would result if a risk were realized."
   ],
   [
    "Risk register",
    "A document listing identified risks with their details, owners and treatments."
   ]
  ],
  "example": "A small accounting firm stores client tax files (asset) on a laptop without disk encryption (vulnerability). Laptops are often stolen from cars (threat, with high likelihood), and losing the files would trigger breach notification and lost clients (high impact). Turning on full-disk encryption does nothing about thieves but removes the vulnerability, sharply lowering the risk.",
  "tip": "Exam scenarios often mix up threat and vulnerability. Ask: is this something that could cause harm (threat) or a weakness that lets harm happen (vulnerability)? A hacker is a threat; a missing patch is a vulnerability.",
  "check": [
   [
    "A server is missing a critical security update. Is that a threat, a vulnerability or an asset?",
    "A vulnerability, because it is a weakness that could be exploited. The server itself is the asset."
   ],
   [
    "Which two factors are combined to describe the level of a risk?",
    "Likelihood (how probable it is) and impact (how much harm it would cause)."
   ],
   [
    "Why is a vulnerability that no threat can reach usually low risk?",
    "Risk requires a threat able to exploit the weakness; if nothing can reach it, the likelihood of harm is very low."
   ]
  ]
 },
 {
  "t": "Risk assessment (qualitative vs quantitative) and treatment: avoid, mitigate, transfer, accept",
  "body": [
   "Risk management is a cycle: identify risks, assess them, decide how to treat them, then monitor and repeat. Assessment tells you how big each risk is so you can spend limited money and time on the ones that matter most. There are two broad ways to assess, and four ways to treat what you find.",
   "Qualitative assessment uses descriptive ratings such as low, medium and high, or a scale from one to five, for likelihood and impact. The results are often shown in a heat map, a grid with likelihood on one axis and impact on the other. Qualitative methods are fast, work when you lack good numbers and let people use expert judgment, but they are subjective: two analysts might rate the same risk differently.",
   "Quantitative assessment puts money values on risks. The classic formulas are worth memorizing. Asset value (AV) is what the asset is worth. Exposure factor (EF) is the percentage of that value lost in one incident. Single loss expectancy is SLE = AV x EF. Annualized rate of occurrence (ARO) is how many times per year the event is expected. Annualized loss expectancy is ALE = SLE x ARO. For example, a 100,000 dollar asset that loses 40 percent of its value per incident has an SLE of 40,000 dollars; if that happens once every four years (ARO 0.25), the ALE is 10,000 dollars a year. A control costing more than that each year is hard to justify on money alone. Quantitative methods feel objective, but good data is hard to get. Most organizations blend the two approaches.",
   "Once a risk is assessed, you choose a treatment. Avoidance means stopping the activity that creates the risk, such as not launching a risky product or retiring an unsupported system. Mitigation (also called reduction) means applying controls to lower likelihood or impact, such as patching, MFA or backups; this is the most common choice. Transference (sharing) means shifting the financial burden to another party, usually through insurance or a contract with a service provider. Note that you can transfer the cost, but not the accountability; if customer data is breached, your organization still answers to customers and regulators. Acceptance means consciously deciding to live with the risk, usually because it falls within risk appetite or treatment would cost more than the expected loss.",
   "Treatment rarely removes risk entirely. What remains after controls are applied is residual risk, and leadership must formally accept it. Inherent risk is the level before any controls. Ignoring a risk without a decision is not acceptance; it is negligence, and the exam treats it that way."
  ],
  "terms": [
   [
    "Qualitative assessment",
    "Rating risks with descriptive scales such as low, medium and high, based on judgment."
   ],
   [
    "Quantitative assessment",
    "Rating risks in monetary terms using values such as SLE, ARO and ALE."
   ],
   [
    "Annualized loss expectancy (ALE)",
    "Expected yearly loss from a risk, calculated as SLE multiplied by ARO."
   ],
   [
    "Risk transference",
    "Shifting the financial impact of a risk to another party, for example through insurance."
   ],
   [
    "Residual risk",
    "The risk that remains after controls have been applied."
   ]
  ],
  "example": "A retailer rates card-data theft as high likelihood and high impact on its heat map. It mitigates by encrypting card data and segmenting the payment network, transfers part of the remaining financial exposure by buying cyber insurance, avoids a planned feature that would have stored card numbers, and management signs off to accept the small residual risk.",
  "tip": "Buying insurance is transference, not mitigation. Doing nothing because the cost of a control exceeds the ALE is acceptance, and it must be a documented decision by someone with authority.",
  "check": [
   [
    "An asset worth 50,000 dollars loses 20 percent of its value per incident, and incidents occur twice a year. What is the ALE?",
    "SLE = 50,000 x 0.20 = 10,000 dollars; ALE = 10,000 x 2 = 20,000 dollars per year."
   ],
   [
    "A company decides to stop offering a service because its risk cannot be reduced affordably. Which treatment is this?",
    "Risk avoidance, because the activity creating the risk is eliminated."
   ],
   [
    "What is the main weakness of qualitative risk assessment?",
    "It is subjective; ratings depend on individual judgment and can vary between assessors."
   ]
  ]
 },
 {
  "t": "Security controls: administrative, technical, physical; preventive, detective, corrective, deterrent",
  "body": [
   "A security control, also called a safeguard or countermeasure, is anything that reduces risk. The CC exam classifies controls two ways at once: by how they are implemented (their type) and by what they do (their function). A single control always has one of each, so practice labelling both.",
   "By type there are three categories. Administrative controls, also called managerial controls, are policies, procedures, training, background checks, hiring practices and risk assessments. They direct how people behave. Technical controls, also called logical controls, are implemented in hardware or software: firewalls, encryption, access control lists, MFA, antivirus and logging. Physical controls protect the tangible world: locks, fences, badges, guards, lighting, cameras and fire suppression.",
   "By function, the four you must know are preventive, detective, corrective and deterrent. Preventive controls stop an incident before it happens, such as a firewall rule that blocks traffic, a locked door or a policy that forbids sharing passwords. Detective controls identify an incident while it is happening or afterward, such as intrusion detection systems, log review, motion sensors and camera footage that someone monitors. Corrective controls fix things after an incident and restore normal operation, such as restoring from backup, reimaging an infected laptop or patching the exploited flaw. Deterrent controls discourage an attacker from trying at all, such as warning signs, visible cameras, guard dogs or a login banner warning that activity is monitored.",
   "Some frameworks add more functions. Compensating controls are alternatives used when the preferred control is not feasible, such as extra monitoring on a legacy system that cannot be patched. Recovery controls restore systems after a disaster, such as backups and alternate sites, and overlap with corrective controls. Directive controls tell people what to do, like policies and signs.",
   "Because one control can serve more than one function, exam questions ask for the best or primary fit. A visible security camera deters, and recorded footage detects, but a camera cannot physically stop someone, so it is not preventive. A guard can deter, prevent and detect. When you classify a control, ask what it mainly does in the scenario given.",
   "Strong programs layer all three types and several functions. This is defense in depth, which you will see again in the networking domain. If a preventive control fails, detective controls notice and corrective controls limit the damage. A policy on its own is weak without technical enforcement, and technology is weak without people trained to use it."
  ],
  "terms": [
   [
    "Administrative control",
    "A policy, procedure or practice that directs people's behavior, such as training or background checks."
   ],
   [
    "Technical control",
    "A control implemented in hardware or software, such as a firewall or encryption."
   ],
   [
    "Physical control",
    "A control that protects facilities and equipment, such as locks, fences or guards."
   ],
   [
    "Preventive control",
    "A control that stops an incident from occurring."
   ],
   [
    "Detective control",
    "A control that identifies an incident during or after its occurrence."
   ],
   [
    "Compensating control",
    "An alternative control used when the primary control cannot be implemented."
   ]
  ],
  "example": "A data center uses a mantrap-style entrance (physical, preventive), CCTV monitored by staff (physical, detective), signs warning of prosecution (physical, deterrent), an access policy approved by management (administrative, preventive) and nightly backups that can be restored after an attack (technical, corrective).",
  "tip": "Always separate the two classification axes. 'Administrative, technical, physical' describes how a control is built; 'preventive, detective, corrective, deterrent' describes what it does. A question may ask for either one.",
  "check": [
   [
    "How would you classify security awareness training by type and function?",
    "Administrative by type and mainly preventive by function, because it aims to stop people from making security mistakes."
   ],
   [
    "Is an intrusion detection system preventive or detective?",
    "Detective. It identifies suspicious activity and raises alerts but does not block it; an intrusion prevention system would be preventive."
   ],
   [
    "Restoring a server from backup after ransomware is which control function?",
    "Corrective (and recovery), because it fixes the damage and returns the system to normal operation."
   ]
  ]
 },
 {
  "t": "ISC2 Code of Ethics: preamble and four canons",
  "body": [
   "Every ISC2 member, including anyone who earns the CC, agrees to follow the ISC2 Code of Ethics. It is short, but the exam tests it directly, usually with a scenario where you must decide which duty comes first. Violating the code can lead to losing your certification, and any member who knows of a violation can file a formal complaint.",
   "The preamble explains why the code exists. In paraphrase, it says that the safety and welfare of society and the common good, duty to our principals, and duty to each other require that members adhere, and be seen to adhere, to the highest ethical standards of behavior. It ends by stating that strict adherence to the code is a condition of certification. Notice the phrase be seen to adhere: appearances matter, because public trust in the profession depends on it.",
   "The four canons, in order, are: first, protect society, the common good, necessary public trust and confidence, and the infrastructure. Second, act honorably, honestly, justly, responsibly and legally. Third, provide diligent and competent service to principals. Fourth, advance and protect the profession. Principals means the people and organizations you work for, such as your employer or clients.",
   "The order is important. When canons conflict, the earlier canon generally takes priority. Your duty to society comes before your duty to your employer, and acting legally and honestly comes before pleasing a client. For example, if your manager asks you to hide a data breach from affected customers and regulators, the first and second canons outweigh the third. On the other hand, the fourth canon, protecting the profession, does not justify breaking the law or harming the public to defend a colleague.",
   "Each canon has practical meaning. Protecting society includes discouraging unsafe practices and being careful about spreading fear or unverified claims. Acting honorably includes telling the truth, keeping commitments, giving prudent advice and avoiding conflicts of interest. Diligent and competent service means doing the job well, keeping skills current, respecting confidentiality and not taking on work you are not qualified to do. Advancing the profession includes sharing knowledge, mentoring and not associating professionally with people who damage the field's reputation.",
   "Organizations often have their own codes of conduct as well, and many laws impose ethical duties. The ISC2 code does not replace those; it sits on top as a professional standard. When a question offers several ethical-sounding answers, choose the one that best protects the public and stays honest and legal, then consider duty to your employer."
  ],
  "terms": [
   [
    "Preamble",
    "The introduction to the ISC2 Code of Ethics stating that members must adhere, and be seen to adhere, to the highest ethical standards as a condition of certification."
   ],
   [
    "Canon",
    "One of the four core principles of the ISC2 Code of Ethics, listed in priority order."
   ],
   [
    "Principal",
    "The employer, client or other party a professional serves."
   ],
   [
    "Ethics complaint",
    "A formal report to ISC2 alleging that a member violated the Code of Ethics."
   ]
  ],
  "example": "A consultant discovers that a client's water-treatment control system is exposed to the internet with a default password. The client asks her to leave it out of the report to avoid bad news before a board meeting. Following the canons in order, she includes the finding and urges immediate action, because protecting society and the infrastructure outranks her duty to keep the client happy.",
  "tip": "Memorize the four canons in order: society, honorable and legal, principals, profession. When canons conflict, the one higher on the list usually wins.",
  "check": [
   [
    "Which canon takes priority if your employer's instructions would put the public at risk?",
    "The first canon, protecting society, the common good, public trust and the infrastructure, outranks the third canon's duty to principals."
   ],
   [
    "What does 'be seen to adhere' in the preamble emphasize?",
    "That professionals must not only behave ethically but also avoid the appearance of unethical behavior, because public trust depends on it."
   ],
   [
    "Which canon covers keeping your skills current and doing competent work for a client?",
    "The third canon: provide diligent and competent service to principals."
   ]
  ]
 },
 {
  "t": "CIA applied to AI systems: data poisoning, transparency and bias",
  "body": [
   "Artificial intelligence (AI) systems, and especially machine learning (ML) models that learn patterns from data, are now part of ordinary business: chat assistants, fraud scoring, resume screening and security tools. They are still information systems, so the CIA triad applies, but they bring new ways to lose each goal and new concerns such as transparency and bias.",
   "Integrity is the most discussed AI risk. A model is only as trustworthy as the data it learned from. Data poisoning is an attack where an adversary slips misleading or malicious records into training data so that the model learns wrong behavior. The goal may be to reduce overall accuracy or to plant a hidden trigger, so the model behaves normally until it sees a specific input. Defenses include controlling and validating data sources, tracking where training data came from (data provenance), limiting who can change datasets, testing models against known-good benchmarks and monitoring outputs for drift after deployment.",
   "Confidentiality matters because models can leak what they learned. A model trained on customer records might reveal fragments of that data in its answers, and users may paste confidential information into public AI tools that keep or reuse it. Prompt injection, where crafted input tricks a language model into ignoring its instructions, can expose data or trigger unintended actions if the model is connected to other systems. Controls include data minimization, classification rules for what may be entered into AI tools, access controls on model interfaces and treating model output as untrusted input.",
   "Availability applies too. AI services can be overwhelmed by expensive queries, and business processes that depend on a single external model fail when that service is down. Normal resilience practices, such as rate limiting, fallbacks and vendor risk review, still apply.",
   "Transparency and explainability mean people can understand how an AI system reaches its outputs and what data and logic it relies on. This matters for trust, troubleshooting and law: if a model denies a loan, the organization may need to explain why. A model that cannot be explained is harder to audit for poisoning or error. Accountability requires that a named human owner remains responsible for decisions the system supports.",
   "Bias occurs when a model produces systematically unfair results for certain groups, often because the training data reflected past unfairness or underrepresented some people. Bias is partly an integrity problem (the output is not accurate for everyone) and partly an ethics and privacy problem. Organizations reduce it with diverse and reviewed training data, testing outcomes across groups, human review of high-impact decisions and governance policies for acceptable AI use."
  ],
  "terms": [
   [
    "Data poisoning",
    "Deliberately corrupting a model's training data so it learns incorrect or malicious behavior."
   ],
   [
    "Data provenance",
    "Records of where data came from and how it has been changed, used to trust training data."
   ],
   [
    "Prompt injection",
    "Crafted input that manipulates a language model into ignoring its instructions or revealing data."
   ],
   [
    "Explainability",
    "The ability to describe in understandable terms how an AI system reached a particular output."
   ],
   [
    "Algorithmic bias",
    "Systematic unfairness in a model's outputs toward certain groups, often inherited from training data."
   ]
  ],
  "example": "A bank's fraud model starts approving a pattern of suspicious transactions. Investigation shows an attacker had submitted thousands of mislabeled reports through a public feedback form that fed the training pipeline. The bank restricts training data to verified sources, logs data provenance, retrains from a known-good dataset and adds human review for large approvals.",
  "tip": "Map AI risks to the triad: poisoning and bias are integrity problems, data leakage through models or prompts is confidentiality, and overloaded or single-source AI services are availability.",
  "check": [
   [
    "Which part of the CIA triad does data poisoning primarily attack?",
    "Integrity, because it corrupts the data and therefore the model's outputs."
   ],
   [
    "Why is explainability important from a security and governance point of view?",
    "It lets people audit, troubleshoot and justify AI decisions, making errors, poisoning and bias easier to detect and meeting legal expectations."
   ],
   [
    "Name two controls that reduce data poisoning risk.",
    "Restricting and validating training data sources with provenance tracking, and testing models against known-good benchmarks while monitoring outputs for drift."
   ]
  ]
 },
 {
  "t": "Governance, risk and compliance (GRC) and the role of leadership",
  "body": [
   "Security is not only a technical job. Someone has to decide what the organization is trying to protect, how much risk it will accept, and how it will prove it is following the rules. That work is called governance, risk and compliance, or GRC.",
   "Governance is the system by which an organization is directed and controlled. In security terms it means setting direction, assigning responsibility and making sure security supports business goals. Governance produces the security strategy, the policy framework, the roles and the decision rights. It answers questions such as who approves exceptions and who owns each system. Good governance aligns security with the mission rather than treating it as a separate IT project.",
   "Risk management, which you studied in the first domain, is the ongoing process of identifying, assessing, treating and monitoring risks. In a GRC program it is formalized: there is a risk register, a methodology everyone uses, and regular reporting so leaders can see the organization's risk position and make informed decisions.",
   "Compliance means meeting the obligations that apply to the organization: laws, regulations, contracts, industry standards and internal policies. Compliance is proven with evidence such as audit reports, logs and signed approvals. An important distinction is that compliance is not the same as security. An organization can pass an audit and still be breached, because requirements set a minimum and may not cover every risk. Security aims to reduce real risk; compliance shows you meet specific external or internal expectations.",
   "Leadership is the foundation of all of this. Senior management and the board of directors are ultimately accountable for protecting the organization, including its information. They set the tone at the top, approve policy, fund the program and accept residual risk. Common security leadership roles include a chief information security officer (CISO), who runs the security program and advises executives, and data or system owners, who are business leaders accountable for particular assets. Custodians, often IT staff, implement and operate the controls owners decide on. Users follow policy.",
   "Two legal ideas often appear with governance. Due care is doing what a reasonable person would do to protect assets, such as applying patches and training staff. Due diligence is the ongoing effort to investigate, verify and keep those protections working, such as assessing a vendor before signing a contract or auditing controls. Leaders who fail at either can be found negligent. Put simply, due diligence is knowing what you should do; due care is doing it."
  ],
  "terms": [
   [
    "Governance",
    "The structures and processes by which leadership directs and controls the organization, including its security program."
   ],
   [
    "Compliance",
    "Meeting and being able to prove adherence to laws, regulations, contracts, standards and policies."
   ],
   [
    "Chief information security officer (CISO)",
    "The senior leader responsible for an organization's information security program."
   ],
   [
    "Due care",
    "Taking the reasonable protective actions a prudent person would take."
   ],
   [
    "Due diligence",
    "The ongoing investigation and verification that protections are appropriate and working."
   ],
   [
    "Data owner",
    "A business leader accountable for a set of data, including its classification and who may access it."
   ]
  ],
  "example": "A regional hospital passes its annual compliance audit, yet suffers a ransomware attack through an unmonitored vendor connection that the audit did not cover. The board responds by making the CISO report to it quarterly, adopting a formal risk register that includes vendor access and requiring leadership sign-off on all accepted risks.",
  "tip": "Senior management is always ultimately accountable for security, even when tasks are delegated. And remember: being compliant does not mean being secure.",
  "check": [
   [
    "Who holds ultimate accountability for protecting an organization's information?",
    "Senior management and the board of directors; they can delegate tasks but not accountability."
   ],
   [
    "Explain the difference between due diligence and due care.",
    "Due diligence is investigating and verifying what protections are needed and that they work; due care is actually carrying out those reasonable protections."
   ],
   [
    "Why can a compliant organization still be insecure?",
    "Compliance requirements set minimum expectations for specific obligations and may not cover all real risks the organization faces."
   ]
  ]
 },
 {
  "t": "Policies, standards, procedures, baselines and guidelines",
  "body": [
   "Governance decisions only take effect when they are written down in a form people can follow. Security programs use a hierarchy of documents, and the CC exam frequently asks you to identify which kind of document a statement belongs to. The key is to look at how specific it is and whether it is mandatory.",
   "A policy is a high-level statement of management intent. It says what the organization will do and why, but not how. Policies are approved by senior leadership, change rarely and are mandatory. For example: all company data must be protected according to its classification, or users must not share their credentials. Policies give the authority for everything below them.",
   "A standard makes a policy measurable by specifying mandatory requirements, often naming technologies or values. For example: all laptops must use full-disk encryption with AES, or passwords must be at least a set minimum length. Standards are still mandatory but more specific than policies and change more often as technology changes. Organizations also adopt external standards, such as those published by national standards bodies, as a basis for their own.",
   "A procedure is a detailed, step-by-step set of instructions for carrying out a task in a consistent way. For example: how to create a new user account, or the exact steps to restore a server from backup. Procedures are mandatory for the people who perform them, and they are the most detailed and most frequently updated documents in the hierarchy.",
   "A baseline is a minimum level of security configuration that every system of a given type must meet, such as a hardened configuration for all web servers or a list of required settings for desktop computers. Baselines are mandatory and are often published as configuration templates or checklists, which connects to the configuration management and hardening topics later in the course.",
   "A guideline is a recommendation or best-practice advice. Guidelines are not mandatory; they help people make good decisions where rules do not cover every case. For example: consider using a password manager, or tips for recognizing phishing. If a sentence uses words like should or recommended, it is probably a guideline; if it uses must or shall, it is probably a policy, standard, baseline or procedure.",
   "Together, these form a chain: the policy sets intent, standards and baselines define measurable requirements, procedures describe how to meet them, and guidelines offer helpful advice. Regulations and laws come from outside the organization and sit above all of these, because internal documents must comply with them."
  ],
  "terms": [
   [
    "Policy",
    "A high-level, mandatory statement of management intent approved by senior leadership."
   ],
   [
    "Standard",
    "A mandatory, specific requirement that supports a policy, often naming technologies or values."
   ],
   [
    "Procedure",
    "Detailed, step-by-step instructions for performing a task consistently."
   ],
   [
    "Baseline",
    "A mandatory minimum security configuration for a type of system."
   ],
   [
    "Guideline",
    "A non-mandatory recommendation or best-practice suggestion."
   ]
  ],
  "example": "A company's acceptable use policy states that all remote access must be secured. The remote access standard requires MFA and an approved VPN client. The baseline defines the VPN client settings for every laptop. A help-desk procedure lists the steps to enroll a new user in MFA, and a guideline suggests staff avoid public Wi-Fi when possible.",
  "tip": "The only non-mandatory document in the hierarchy is the guideline. Policies are broad and set by leadership; procedures are the most detailed.",
  "check": [
   [
    "'All servers must have the approved hardened configuration applied before going into production.' Which document type is this most likely from?",
    "A baseline (or a standard referencing it), because it defines a mandatory minimum configuration for a type of system."
   ],
   [
    "Which document type is optional?",
    "A guideline, because it offers recommendations rather than requirements."
   ],
   [
    "Who normally approves a security policy?",
    "Senior management, because policies express the organization's intent and authority."
   ]
  ]
 },
 {
  "t": "Laws, regulations and contractual requirements (e.g. GDPR, HIPAA, PCI DSS)",
  "body": [
   "Organizations do not choose all of their security requirements. Many come from outside, and failing to meet them can bring fines, lawsuits, lost contracts or even criminal charges. The CC exam does not expect you to be a lawyer, but you should understand the kinds of requirements that exist and recognize a few well-known examples.",
   "Laws are passed by legislatures. Regulations are detailed rules issued by government agencies to carry out laws, and they carry legal force. Both are mandatory for those they cover. Contractual requirements are obligations an organization agrees to in a contract, such as a customer requiring certain security controls or a card brand requiring a payment standard. They are not laws, but breaking them has real consequences, such as penalties or losing the right to do business. Industry standards and frameworks are often voluntary unless a law, regulator or contract makes them mandatory.",
   "The General Data Protection Regulation (GDPR) is a European Union regulation protecting the personal data of people in the EU. It applies to organizations anywhere in the world that offer goods or services to, or monitor the behavior of, people in the EU. It gives individuals rights such as access to their data, correction and erasure, requires a lawful basis for processing, promotes data minimization and privacy by design, and requires timely notification of certain personal data breaches to regulators. Its fines can be very large.",
   "The Health Insurance Portability and Accountability Act (HIPAA) is a United States law protecting health information. It applies to covered entities such as healthcare providers, health plans and clearinghouses, and to their business associates who handle protected health information (PHI) on their behalf. Its rules require administrative, physical and technical safeguards for PHI and notification after breaches.",
   "The Payment Card Industry Data Security Standard (PCI DSS) is not a law. It is a contractual standard created by the major card brands through the PCI Security Standards Council. Any organization that stores, processes or transmits payment card data must comply, and the requirement is enforced through contracts with banks and card brands. It covers areas such as network security, protecting stored cardholder data, encryption in transit, access control, logging and regular testing.",
   "Other requirements you may encounter include breach notification laws in many countries and states, privacy laws, and sector rules for finance or government. A useful concept is jurisdiction: which laws apply depends on where the organization operates, where the data subjects are and where data is stored. The security team works with legal and compliance staff to identify these obligations and map controls to them."
  ],
  "terms": [
   [
    "Regulation",
    "A detailed rule issued by a government agency that has the force of law."
   ],
   [
    "GDPR",
    "The EU General Data Protection Regulation, protecting the personal data of people in the EU."
   ],
   [
    "HIPAA",
    "A US law that protects health information held by healthcare organizations and their business associates."
   ],
   [
    "PCI DSS",
    "The Payment Card Industry Data Security Standard, a contractual standard for protecting payment card data."
   ],
   [
    "Jurisdiction",
    "The legal authority that applies based on location of the organization, data or people involved."
   ]
  ],
  "example": "An online shop based in Canada sells to customers in Germany and accepts credit cards. It must meet GDPR for its EU customers' personal data, PCI DSS through its contract with its payment processor, and Canadian privacy law at home. Its security team builds one control set, such as encryption, access logging and breach response, and maps it to all three.",
  "tip": "PCI DSS is enforced by contract, not by law. GDPR applies based on whose data is processed, not where the company is headquartered.",
  "check": [
   [
    "Is PCI DSS a law?",
    "No. It is an industry standard enforced through contracts with card brands and banks, though some laws may reference it."
   ],
   [
    "A US company with no EU office sells products online to people in France. Could GDPR apply?",
    "Yes. GDPR can apply to organizations outside the EU that offer goods or services to people in the EU."
   ],
   [
    "What type of information does HIPAA protect?",
    "Protected health information (PHI) held by covered entities and their business associates."
   ]
  ]
 },
 {
  "t": "Risk appetite, risk tolerance and ownership of risk",
  "body": [
   "Every organization takes risks to achieve its goals. A startup racing to launch a product will accept more uncertainty than a nuclear plant. Governance needs a way to express how much risk is acceptable so that people across the organization make consistent decisions. Three concepts do this job: risk appetite, risk tolerance and risk ownership.",
   "Risk appetite is the broad amount and type of risk an organization is willing to pursue or retain in order to meet its objectives. It is set by senior leadership and the board and is usually expressed in general statements, such as: we have a low appetite for risks that could harm patient safety, and a moderate appetite for risks in trying new marketing technology. Appetite reflects strategy, culture, regulation and financial strength.",
   "Risk tolerance is the acceptable variation around that appetite for a specific objective or risk, usually stated in measurable terms. If appetite says we have a low appetite for service outages, tolerance might say the customer portal may be unavailable for no more than a set number of hours per month. Tolerance turns a broad attitude into thresholds that managers can monitor. When a risk exceeds tolerance, it must be escalated and treated. Some frameworks also use risk capacity, the maximum risk an organization could absorb before failing, which should always be greater than appetite.",
   "Risk ownership means every risk has a named person who is accountable for it. The risk owner is usually a business manager who owns the related process or asset, not the security team. The owner decides on treatment, within the limits of appetite and tolerance, funds the controls and accepts residual risk. Security professionals advise, assess and implement controls, but they should not accept risk on behalf of the business. If nobody owns a risk, nobody decides, and the risk is effectively ignored.",
   "These ideas show up in the risk register. Each entry has an owner, a current rating, a target rating within tolerance and a treatment plan. Reports compare current risk against appetite and tolerance so leaders can see where the organization is over-exposed. Exceptions to policy are also a risk decision: when a business unit asks to skip a control, the risk owner must formally accept the resulting risk, usually for a limited time.",
   "On the exam, remember that appetite is broad and strategic, tolerance is specific and measurable, and ownership sits with the business leader accountable for the asset or process."
  ],
  "terms": [
   [
    "Risk appetite",
    "The overall amount and type of risk an organization is willing to pursue or retain to meet its objectives."
   ],
   [
    "Risk tolerance",
    "The acceptable, usually measurable, variation around risk appetite for a specific objective."
   ],
   [
    "Risk owner",
    "The person accountable for managing a particular risk, including accepting residual risk."
   ],
   [
    "Risk capacity",
    "The maximum amount of risk an organization can absorb before it can no longer meet its obligations."
   ],
   [
    "Risk exception",
    "A formally approved and documented deviation from a policy or control, with the risk accepted by its owner."
   ]
  ],
  "example": "A bank's board states a very low appetite for loss of customer data. The retail banking director, as risk owner, sets a tolerance of zero unencrypted customer records outside the data center. When a team wants to use an unapproved cloud file-sharing tool, the security team assesses it, and the director declines to accept the risk because it would exceed tolerance.",
  "tip": "The security team advises on risk; the business owner accepts it. If an exam answer has the security analyst accepting risk for a business unit, it is usually wrong.",
  "check": [
   [
    "What is the difference between risk appetite and risk tolerance?",
    "Appetite is the broad level of risk the organization is willing to take; tolerance is the specific, measurable acceptable deviation for a particular objective."
   ],
   [
    "Who should normally own the risk of a payroll system being unavailable?",
    "The business leader accountable for payroll, such as the finance or HR director, not the IT or security team."
   ],
   [
    "What should happen when a risk exceeds tolerance?",
    "It should be escalated to the risk owner and leadership and treated to bring it back within tolerance, or formally accepted by someone with authority."
   ]
  ]
 },
 {
  "t": "Third-party and vendor risk",
  "body": [
   "Almost no organization runs everything itself. Cloud providers host data, payroll companies process salaries, contractors maintain buildings and software comes from dozens of suppliers. Each of these third parties can introduce risk, and many serious breaches began at a supplier rather than at the victim. Third-party risk management is the process of identifying, assessing and controlling those risks throughout the relationship.",
   "The core principle is that you can outsource a task but not accountability. If a vendor loses your customers' data, regulators and customers will hold your organization responsible. That is why due diligence before signing a contract matters so much. Typical steps include classifying the vendor by how critical it is and what data it will access, sending a security questionnaire, reviewing independent audit reports or certifications, checking the vendor's financial stability and breach history, and, for critical vendors, visiting or testing.",
   "Contracts are the main control over a third party. Security expectations should be written in: required controls, breach notification timelines, the right to audit, data ownership and return or destruction at the end of the relationship, where data may be stored and whether the vendor may use subcontractors. A service level agreement (SLA) defines measurable performance promises, such as uptime and response times, and the remedies if they are missed. Other agreements include a non-disclosure agreement (NDA) to protect confidential information and, in some settings, a data processing agreement that sets out privacy obligations.",
   "Risk does not end when the contract is signed. Ongoing monitoring includes periodic reassessment, reviewing the vendor's updated audit reports, watching for news of breaches, checking SLA performance and reviewing what access the vendor still has. Vendor accounts should follow least privilege and be removed promptly when no longer needed. Offboarding a vendor means revoking access, recovering or destroying data and confirming it in writing.",
   "Supply chain risk is a related idea. It covers the risk that hardware, software or services you buy have been tampered with or contain weaknesses before they reach you, for example malicious code inserted into a software update, or components from an untrusted source. Defenses include buying from reputable suppliers, verifying software integrity with hashes and signatures, keeping an inventory of components used in software (sometimes called a software bill of materials) and limiting what any single supplier's product can reach on your network.",
   "Fourth parties, meaning your vendors' vendors, extend the chain further. You rarely have a contract with them, so you rely on your direct vendor to manage them, which is another reason to ask about subcontractors."
  ],
  "terms": [
   [
    "Third-party risk",
    "Risk arising from vendors, suppliers, contractors and other external parties an organization relies on."
   ],
   [
    "Service level agreement (SLA)",
    "A contract section defining measurable service levels, such as uptime, and remedies if they are not met."
   ],
   [
    "Right to audit",
    "A contract clause allowing the customer to review or test the vendor's security controls."
   ],
   [
    "Supply chain attack",
    "An attack that compromises a trusted supplier's product or service to reach its customers."
   ],
   [
    "Non-disclosure agreement (NDA)",
    "A contract in which parties agree to protect each other's confidential information."
   ]
  ],
  "example": "A retailer hires a heating and ventilation contractor that needs remote access to building systems. Because the vendor's account is given broad network access and nobody reviews it, attackers who compromise the contractor use that path to reach the retailer's payment network. A proper assessment would have limited the account to a segmented building-management network and required MFA.",
  "tip": "Outsourcing transfers work, not accountability. Expect the exam to favor answers that put security requirements, breach notification and right to audit into the contract before the relationship begins.",
  "check": [
   [
    "When should security requirements be added to a vendor contract?",
    "Before it is signed, during due diligence and negotiation, because leverage and clarity are greatest then."
   ],
   [
    "If a cloud vendor loses your customer data, who is accountable to your customers?",
    "Your organization remains accountable, even though the vendor performed the service and may share liability under the contract."
   ],
   [
    "Give two activities of ongoing vendor monitoring.",
    "Periodic reassessment and review of updated audit reports, and reviewing the vendor's access rights and SLA performance."
   ]
  ]
 },
 {
  "t": "Security awareness training and cybersecurity culture",
  "body": [
   "Technology can block many attacks, but people still open email, answer phones, choose passwords and hold doors. Many incidents begin with a human action, such as clicking a phishing link or approving a fraudulent payment. Security awareness training aims to change behavior so that people become a strong layer of defense rather than the easiest way in.",
   "It helps to distinguish three levels. Awareness is the broad goal of making everyone recognize security issues, delivered through short modules, posters, newsletters and reminders. Training teaches specific skills to people who need them, such as how developers write secure code or how help-desk staff verify callers before resetting passwords. Education builds deeper understanding over time, like the study you are doing now for a certification. Awareness is for everyone; training is role-based.",
   "Good programs cover the threats people actually face. Social engineering is manipulating people into breaking security. Phishing uses fraudulent email; spear phishing targets a specific person with tailored details; whaling targets senior executives; smishing uses text messages; vishing uses voice calls. Pretexting is inventing a believable story, such as posing as IT support, and business email compromise tricks staff into sending money or data by impersonating a trusted executive or supplier. Other topics include password hygiene and MFA, handling sensitive data, safe use of removable media, physical security like tailgating, and how to report incidents.",
   "Training works best when it is frequent, short and relevant. New hires should receive it before or as they get access, with refreshers at least annually and whenever threats change. Simulated phishing campaigns let people practice spotting fake messages in a safe way. The goal is learning, not punishment, so follow-up should explain the cues people missed. Measure results with metrics such as phishing click rates, report rates and time to report, and remember that a rising report rate is a very good sign.",
   "Culture is the shared attitudes that make secure behavior normal. In a strong security culture, leaders visibly follow the rules, people feel safe reporting mistakes quickly without fear of blame, security is seen as helping the business, and there are easy ways to ask questions. A punitive culture tends to make people hide errors, which delays response. Security champions, volunteers in each team who promote good practice, can spread culture beyond the security department.",
   "Remember that training is an administrative, preventive control. It lowers the likelihood of human error but never removes it, so it must be backed by technical controls like email filtering and MFA."
  ],
  "terms": [
   [
    "Social engineering",
    "Manipulating people into revealing information or taking actions that weaken security."
   ],
   [
    "Spear phishing",
    "A phishing attack tailored to a specific individual or small group."
   ],
   [
    "Business email compromise",
    "Fraud in which attackers impersonate a trusted party by email to trick staff into sending money or data."
   ],
   [
    "Pretexting",
    "Creating a false scenario or identity to persuade a victim to share information or grant access."
   ],
   [
    "Security culture",
    "The shared values and behaviors that make secure practices normal throughout an organization."
   ]
  ],
  "example": "An accounts clerk receives an urgent email appearing to come from the CEO asking for a same-day transfer to a new supplier. Remembering her training, she notices the sender's domain is slightly misspelled, calls the CEO on a known number to verify, and reports the message. The security team blocks the domain and warns other staff within the hour.",
  "tip": "Awareness is general and for everyone; training is job-specific. A strong security culture encourages fast reporting of mistakes rather than punishing people who admit them.",
  "check": [
   [
    "What is the difference between phishing and spear phishing?",
    "Phishing is sent broadly to many people; spear phishing is tailored to a specific person or small group using details about them."
   ],
   [
    "Why might an increase in the number of reported suspicious emails be good news?",
    "It shows staff are recognizing and reporting threats, which helps the security team respond faster."
   ],
   [
    "What type and function of control is security awareness training?",
    "An administrative, preventive control."
   ]
  ]
 },
 {
  "t": "Measuring the program: metrics, key risk indicators (KRIs), dashboards and reports",
  "body": [
   "Leaders cannot manage what they cannot see. A security program needs measurements to show whether controls are working, where risk is growing and whether investments are paying off. The CC exam expects you to understand the main kinds of measurement and how they are communicated.",
   "A metric is any measurement tracked over time, such as the number of phishing reports per month or the percentage of laptops with full-disk encryption. Good metrics are specific, measurable, repeatable and tied to a goal. A raw number like 10,000 blocked attacks sounds impressive but says little about risk; the percentage of critical vulnerabilities patched within the target time says much more, because it measures whether the organization meets its own standard.",
   "A key performance indicator (KPI) measures how well a process or control is performing against a target, looking at what has already happened. Examples include mean time to detect incidents, mean time to respond, patch compliance percentage and training completion rate. A key risk indicator (KRI) is an early warning sign that risk is rising toward or beyond tolerance, looking ahead. Examples include the number of unpatched internet-facing systems, the count of accounts with admin rights, the number of overdue access reviews or a rise in failed logins from unfamiliar countries. Each KRI should have thresholds, often shown as green, amber and red, linked to risk tolerance, so that crossing a threshold triggers action.",
   "A dashboard presents key metrics visually on one screen, often with trend lines and color coding, so people can see status at a glance. Operational dashboards, such as those in a security operations center, update in near real time and show alerts and open incidents. Executive dashboards summarize a few meaningful indicators and trends over months. Reports add explanation: what changed, why it matters, what is being done and what decisions are needed.",
   "Always tailor measurement to the audience. Technical teams need detail to act. Senior leaders and the board need business language: how risk compares to appetite, which risks are above tolerance, progress on major initiatives and what investments or risk acceptances they must decide on. Too many metrics, or metrics without context, lead to confusion. A useful habit is to pair every number with a so-what statement.",
   "Measurements also support compliance, because auditors ask for evidence that controls operate over time, and continuous improvement, because trends reveal where the program should focus next."
  ],
  "terms": [
   [
    "Metric",
    "A quantifiable measurement tracked over time to evaluate some aspect of security."
   ],
   [
    "Key performance indicator (KPI)",
    "A measure of how well a process or control is performing against a target."
   ],
   [
    "Key risk indicator (KRI)",
    "A forward-looking measure that warns when risk is rising toward or beyond tolerance."
   ],
   [
    "Dashboard",
    "A visual display summarizing key metrics and their status for quick review."
   ],
   [
    "Mean time to detect (MTTD)",
    "The average time between an incident starting and the organization detecting it."
   ]
  ],
  "example": "A small business's monthly one-page dashboard shows three metrics (training completion 96 percent, critical patches applied within 14 days 88 percent, backups tested successfully 4 of 4) and two KRIs: accounts with admin rights has risen from 6 to 11, turning amber, and laptops without encryption stays green at zero. The report asks the owner to approve an admin account cleanup.",
  "tip": "KPIs look back at performance; KRIs look ahead at rising risk. Reports to executives should use business terms and compare risk with appetite and tolerance, not list raw technical counts.",
  "check": [
   [
    "Is 'number of internet-facing servers missing critical patches' better described as a KPI or a KRI?",
    "A KRI, because it is a forward-looking signal that the risk of compromise is increasing."
   ],
   [
    "Why is 'number of attacks blocked by the firewall' a weak metric for executives?",
    "It lacks context about risk or goals; it does not show whether the organization is meeting targets or how exposed it is."
   ],
   [
    "What should a KRI threshold be tied to?",
    "The organization's risk tolerance, so crossing it triggers escalation or action."
   ]
  ]
 },
 {
  "t": "Identification, authentication, authorization and accounting",
  "body": [
   "Identity and access management (IAM) is the set of processes and technologies that make sure the right people and systems get the right access to the right resources at the right time. Every access decision passes through the same four steps, and the CC exam expects you to know them in order and tell them apart: identification, authentication, authorization and accounting.",
   "Identification is claiming an identity. When you type a username, swipe a badge or present an email address, you are telling the system who you say you are. Identification alone proves nothing; anyone can type someone else's username. Each identity should be unique so that actions can be tied to one person. A subject is the active entity requesting access, such as a user, a process or a device, while an object is the passive resource being accessed, such as a file, a database or a printer.",
   "Authentication is proving the claim. The subject presents credentials such as a password, a one-time code, a certificate or a fingerprint, and the system checks them against what it has stored. Stronger authentication combines factors of different types, as you learned in the first domain. Authentication should fail safely: after several wrong attempts, accounts may be temporarily locked, and error messages should not reveal whether it was the username or the password that was wrong.",
   "Authorization is deciding what an authenticated subject may do. The system checks permissions, roles, group memberships or rules and then allows or denies the request. Authorization should follow least privilege, giving only the access needed for the job. It is also continuous: each time you open a new file or perform an action, the system checks again whether you are allowed.",
   "Accounting, also called auditing, records what subjects did: logins and logouts, failed attempts, files accessed, changes made and privileges used. Logs make accountability possible, meaning individuals can be held responsible for their actions. They support investigations, detect misuse and provide compliance evidence. Logs must be protected from alteration and kept long enough to be useful, and clocks must be synchronized so events on different systems line up.",
   "In a lab, you can see all four steps on a Linux machine. You type your username (identification) and password (authentication), try to read a file owned by another user and get permission denied (authorization), then view the authentication log to see your login recorded (accounting). On Windows, the same story appears in the Security event log."
  ],
  "terms": [
   [
    "Identification",
    "Claiming an identity, for example by entering a username."
   ],
   [
    "Subject",
    "An active entity, such as a user or process, that requests access to a resource."
   ],
   [
    "Object",
    "A passive resource, such as a file or database, that a subject wants to access."
   ],
   [
    "Accountability",
    "The ability to trace actions to a specific individual, supported by unique IDs and logging."
   ],
   [
    "Account lockout",
    "Temporarily disabling an account after repeated failed authentication attempts."
   ]
  ],
  "example": "A nurse taps her badge at a workstation (identification), enters her PIN (authentication), opens only the records of patients on her ward because her role allows it (authorization), and every record she views is logged. When a patient later asks who viewed their file, the privacy officer can answer precisely from the logs (accounting).",
  "tip": "Identification is the claim; authentication is the proof. If a question describes typing a username only, that is identification, not authentication.",
  "check": [
   [
    "Put these in order: authorization, identification, accounting, authentication.",
    "Identification, authentication, authorization, accounting."
   ],
   [
    "Why must every user have a unique identity?",
    "So that actions recorded in logs can be traced to one individual, providing accountability and non-repudiation."
   ],
   [
    "In an access request, is a database table a subject or an object?",
    "An object, because it is the passive resource being accessed."
   ]
  ]
 },
 {
  "t": "Least privilege, need to know and separation of duties",
  "body": [
   "Once a system knows who you are, it must decide how much access to give you. Three principles guide that decision and appear constantly on the CC exam: least privilege, need to know and separation of duties. They all limit the damage any one account or person can cause, whether through mistakes, malice or a stolen password.",
   "Least privilege means every user, program and process gets only the minimum access required to perform its function, and only for as long as it is needed. A receptionist does not need access to the payroll database; a web server process does not need administrator rights on the operating system. When access is minimal, a compromised account can do less harm and malware running as that user can reach less. Least privilege also applies to time: temporary elevated access that expires is better than permanent rights.",
   "Need to know is a narrower idea often used with classified or sensitive information. Even if someone has the right clearance or role, they should see specific information only if their current task requires it. A doctor may be authorized to use the hospital's record system, yet need to know limits her to the patients she is treating. Least privilege is about permissions in general; need to know is about access to particular information.",
   "Separation of duties (also called segregation of duties) divides a critical task among two or more people so that no single person can complete it alone. The classic example is finance: one person creates a new supplier, another approves payments. In IT, the developer who writes code should not be the person who approves and deploys it to production, and the administrator who manages logs should not be able to delete records of their own actions. Separation of duties prevents fraud and catches errors, because a dishonest act would need collusion, meaning two or more people cooperating.",
   "Related controls strengthen these principles. Two-person integrity (or dual control) requires two people to act together, such as two keys to open a safe. Job rotation moves people between roles periodically so that hidden fraud is more likely to be discovered and knowledge is spread. Mandatory vacations require people to take time off, during which someone else performs their duties and may notice irregularities.",
   "In practice, these principles are enforced through role design, group memberships, approval workflows and periodic access reviews. They cost some convenience, so the aim is to apply them in proportion to the sensitivity of the task."
  ],
  "terms": [
   [
    "Least privilege",
    "Granting only the minimum access needed to perform a job, for only as long as it is needed."
   ],
   [
    "Need to know",
    "Restricting access to specific information to people whose current task requires it."
   ],
   [
    "Separation of duties",
    "Dividing a sensitive task among multiple people so no one person can complete it alone."
   ],
   [
    "Collusion",
    "Two or more people cooperating to bypass controls such as separation of duties."
   ],
   [
    "Job rotation",
    "Periodically moving staff between roles to reduce fraud risk and spread knowledge."
   ]
  ],
  "example": "At a small company, the same employee could add vendors, enter invoices and approve payments. Over a year she paid a fake vendor she controlled. After the fraud was discovered during her vacation, the company split vendor creation, invoice entry and payment approval among three people and began quarterly reviews of vendor changes.",
  "tip": "Separation of duties counters fraud by one person but is defeated by collusion. Job rotation and mandatory vacations help detect collusion and hidden fraud.",
  "check": [
   [
    "A database administrator has read access to all tables but should only view customer records for tickets she is assigned. Which principle is that?",
    "Need to know, because it limits access to specific information based on the current task."
   ],
   [
    "Why should a developer not deploy their own code to production?",
    "Separation of duties: an independent person reviewing and deploying reduces the risk of errors or malicious code going live unchecked."
   ],
   [
    "Which control helps reveal fraud that depends on one person always doing a task?",
    "Mandatory vacations or job rotation, because someone else performs the duties and may spot irregularities."
   ]
  ]
 },
 {
  "t": "Identity lifecycle: provisioning, role changes, deprovisioning, privilege creep",
  "body": [
   "An identity is not created once and forgotten. People join, change jobs, take leave and leave the organization, and their access must change at every stage. Managing this is called the identity lifecycle, and weak lifecycle management is one of the most common causes of excessive access and insider risk.",
   "Provisioning is creating an account and granting initial access. It should start from a verified identity, usually triggered by human resources when a hire is confirmed, and go through an approval step where the manager or data owner authorizes the access. Access should be based on the person's role, following least privilege, rather than copying another employee's account, which tends to copy extra rights as well. The person should receive credentials securely, be required to change initial passwords, enroll in MFA, and sign any agreements such as the acceptable use policy.",
   "Role changes, sometimes called moves or transfers, are where many problems start. When someone moves from sales to marketing, they need new access. If old access is not removed at the same time, rights accumulate. This build-up of unnecessary permissions over time is called privilege creep. A long-serving employee may end up with access to many systems that none of their current duties require, which violates least privilege and increases the damage if their account is compromised.",
   "Deprovisioning is removing access when it is no longer needed, most importantly when someone leaves. For a normal departure, accounts should be disabled on the last day. For an involuntary termination, access should be disabled at or before the moment the person is told, because an upset employee with working credentials is a serious risk. Deprovisioning also means recovering badges, laptops and tokens, removing remote access and shared passwords the person knew, and transferring ownership of files. Many organizations disable accounts first and delete them later, so records remain for investigation and the account identifier is not reused.",
   "Automation helps. When the HR system is the authoritative source, a new hire, transfer or termination record can automatically trigger account creation, changes or disabling. This is often summarized as the joiner, mover, leaver process.",
   "The lifecycle also covers non-human identities such as service accounts, application credentials and vendor accounts. They need owners, least privilege, periodic review and removal when the system or contract ends. Orphaned accounts, meaning active accounts with no current owner, are a favorite target for attackers."
  ],
  "terms": [
   [
    "Provisioning",
    "Creating an identity and granting approved initial access."
   ],
   [
    "Deprovisioning",
    "Disabling or removing an identity's access when it is no longer needed."
   ],
   [
    "Privilege creep",
    "The gradual accumulation of unnecessary access rights as a person changes roles."
   ],
   [
    "Orphaned account",
    "An active account with no current owner, such as one left behind by a former employee."
   ],
   [
    "Joiner, mover, leaver",
    "A common name for the lifecycle process covering new hires, role changes and departures."
   ]
  ],
  "example": "An engineer who moved to project management three years ago still has administrator access to production databases. An access review flags it as privilege creep. Months later, when a contractor leaves, the HR system automatically disables his account, and the review confirms no orphaned accounts remain.",
  "tip": "For an involuntary termination, disable access before or at the moment the person is informed. Role changes should remove old access, not just add new access.",
  "check": [
   [
    "What is privilege creep and how does it usually happen?",
    "The build-up of unnecessary access over time, usually when people change roles and gain new access without losing the old."
   ],
   [
    "Why do many organizations disable departing users' accounts rather than delete them immediately?",
    "Disabling blocks access while keeping the account's records and ownership for investigations, audits and file transfer."
   ],
   [
    "Why is copying an existing user's access for a new hire a poor practice?",
    "It can grant the new hire excess rights the original user accumulated, violating least privilege."
   ]
  ]
 },
 {
  "t": "Access models: DAC, MAC, RBAC and rule-based",
  "body": [
   "An access control model is the overall approach a system uses to decide who can access what. The CC exam focuses on four: discretionary, mandatory, role-based and rule-based. The question to ask about each is: who or what makes the decision?",
   "Discretionary access control (DAC) lets the owner of a resource decide who else can access it. When you create a file on your Windows laptop or share a document from your cloud drive, you can grant access to others at your discretion. Most everyday operating systems use DAC through access control lists (ACLs), lists attached to each object that name which users or groups have which permissions, such as read, write or execute. DAC is flexible and easy, but it depends on owners making good choices, and malware running as the owner can change permissions or share data.",
   "Mandatory access control (MAC) takes the decision away from owners. The system enforces access based on security labels. Every object is assigned a classification, such as Confidential, Secret or Top Secret, and every subject has a clearance. Access is allowed only when the subject's clearance and need to know match the object's label, and users cannot change labels or share around the rules. MAC is strict and centrally controlled, so it is used in military and government systems and in hardened operating system features, but it is complex to administer.",
   "Role-based access control (RBAC) assigns permissions to roles that match job functions, and then assigns users to roles. A hospital might have roles for nurse, physician, billing clerk and pharmacist, each with a defined set of permissions. When someone joins or changes jobs, you change their role membership rather than editing individual permissions. RBAC scales well in organizations with clear job functions, supports least privilege and makes access reviews simpler. The main risk is role explosion, where too many narrowly defined roles become hard to manage.",
   "Rule-based access control applies global rules set by an administrator that apply to everyone, regardless of identity. A firewall is the classic example: rules allow or deny traffic based on addresses, ports and protocols. Other examples include rules that allow logins only during business hours or only from company networks. Be careful: the abbreviation RBAC is sometimes used for both role-based and rule-based, so read the full name in each question.",
   "You may also see attribute-based access control (ABAC), which evaluates many attributes together, such as the user's department, the data's classification, the device's health and the time of day, in a policy. ABAC is very flexible and underpins many zero trust designs. In practice, real systems combine models: a file server may use RBAC through groups, DAC through owner-managed ACLs, and rule-based limits on where users can connect from."
  ],
  "terms": [
   [
    "Discretionary access control (DAC)",
    "A model in which the resource owner decides who may access it."
   ],
   [
    "Mandatory access control (MAC)",
    "A model in which the system enforces access by comparing subject clearances with object labels; owners cannot override it."
   ],
   [
    "Role-based access control (RBAC)",
    "A model that grants permissions to job roles and assigns users to those roles."
   ],
   [
    "Rule-based access control",
    "A model that applies administrator-defined rules to all subjects, such as firewall rules or time-of-day limits."
   ],
   [
    "Access control list (ACL)",
    "A list attached to an object that specifies which subjects have which permissions."
   ]
  ],
  "example": "In a lab, you create a group called Auditors, give it read-only permission on a Reports folder and add a test user to the group. That is RBAC using groups. When you, as the folder owner, also give a colleague direct write access, that is DAC. A firewall rule blocking the file server from the internet is rule-based.",
  "tip": "Ask who decides: the owner (DAC), the system using labels and clearances (MAC), the job role (RBAC) or global administrator rules (rule-based). MAC is the most restrictive; DAC is the most flexible.",
  "check": [
   [
    "Which model is most suitable for a government system handling classified information?",
    "Mandatory access control, because access is enforced centrally using labels and clearances that users cannot change."
   ],
   [
    "A company grants all nurses the same chart-viewing permissions through a Nurse group. Which model is this?",
    "Role-based access control."
   ],
   [
    "Why is a firewall considered rule-based access control?",
    "It applies administrator-defined rules to all traffic regardless of the identity of the user sending it."
   ]
  ]
 },
 {
  "t": "Privileged access management and separate admin accounts",
  "body": [
   "Some accounts can do far more than others. Administrator and root accounts can install software, change security settings, create users, read any file and erase logs. Service accounts may run critical applications with broad rights. These are privileged accounts, and attackers target them because controlling one often means controlling the whole environment. Privileged access management (PAM) is the set of practices and tools that protect, limit and monitor these accounts.",
   "The first practice is separating privileged and everyday accounts. An administrator should have a normal user account for email, web browsing and documents, and a separate admin account used only for administrative tasks. If the admin reads email or browses the web while logged in with full rights, a single malicious attachment or website can run with those rights. With separate accounts, the everyday account can be phished without handing over the keys to the kingdom. Admin accounts should also be clearly named, require strong MFA and be used from secured workstations where possible.",
   "The second practice is minimizing standing privilege. Instead of keeping permanent admin rights, users can request elevation for a specific task and time, which is called just-in-time access. Built-in and default accounts should be renamed or disabled where possible, and default passwords must always be changed. On Linux you will see this idea with `sudo`, which lets an ordinary user run individual commands with elevated rights and logs each use, rather than logging in as root. On Windows, User Account Control prompts before actions that need admin rights.",
   "PAM tools add further controls. A password vault stores privileged credentials, rotates them automatically and checks them out to approved users, so admins never need to know long-lived passwords. Session management can record privileged sessions for later review. Approval workflows can require a second person to approve high-risk access, supporting separation of duties. Emergency access, sometimes called break-glass accounts, provides a way in if normal systems fail, but those credentials are tightly protected and every use is investigated.",
   "Monitoring completes the picture. Privileged activity should be logged to a place administrators cannot alter, and alerts should fire for unusual events, such as a new admin account being created or an admin logging in at an odd hour. The number of privileged accounts is also a useful key risk indicator: if it keeps growing, least privilege is slipping.",
   "Remember that service accounts are privileged too. They should have only the rights their application needs, should not be used for interactive logins, and should have owners and rotated credentials."
  ],
  "terms": [
   [
    "Privileged account",
    "An account with elevated rights, such as administrator, root or a powerful service account."
   ],
   [
    "Privileged access management (PAM)",
    "Practices and tools for controlling, limiting and monitoring privileged accounts."
   ],
   [
    "Just-in-time access",
    "Granting elevated privileges only when needed for a specific task and removing them afterward."
   ],
   [
    "Password vault",
    "A secure system that stores, rotates and controls check-out of privileged credentials."
   ],
   [
    "Break-glass account",
    "A tightly controlled emergency account used only when normal access methods fail."
   ]
  ],
  "example": "An IT technician normally logs in as j.lee for email and tickets. When she needs to change a server setting, she checks out the credentials for her separate admin account from the vault, approves an MFA prompt and does the work. The session is recorded, the password rotates afterward, and a phishing email she opened earlier that day could not reach admin rights.",
  "tip": "Administrators should never use their privileged account for daily tasks like email and web browsing. Separate accounts plus MFA and logging is the expected best answer.",
  "check": [
   [
    "Why should administrators have a separate account for administrative work?",
    "So that everyday activities like email and browsing, which are exposed to phishing and malware, do not run with full privileges."
   ],
   [
    "What does a password vault do in a PAM solution?",
    "It securely stores privileged credentials, controls who can check them out, and rotates them automatically."
   ],
   [
    "What is the security benefit of just-in-time access?",
    "It reduces standing privilege, so elevated rights exist only briefly and are less available to attackers."
   ]
  ]
 },
 {
  "t": "Single sign-on and federation basics",
  "body": [
   "People now use dozens of applications at work. If each had its own username and password, users would reuse weak passwords, write them down or constantly reset them, and administrators would struggle to remove access when someone left. Single sign-on and federation solve this by centralizing authentication.",
   "Single sign-on (SSO) lets a user authenticate once and then access many applications without logging in again. Behind the scenes, a central service called an identity provider (IdP) verifies the user, often with MFA, and then vouches for them to each application. The applications that trust the IdP are called service providers or relying parties. The benefits are real: users have fewer passwords to manage, strong MFA can be enforced in one place, logs of authentication are centralized, and disabling one account removes access to everything connected to it.",
   "The main drawback is concentration. If the SSO account is compromised, the attacker can reach every connected application, and if the identity provider is unavailable, nobody can log in. This is why SSO accounts must have strong MFA, the identity provider must be highly available, and sessions should time out appropriately. SSO is a single point of failure that must be engineered carefully.",
   "Federation extends SSO across organizational boundaries. It is an agreement between separate organizations to trust each other's identities. For example, a university might let staff from partner universities use their home credentials to access a shared research portal, or a company might let employees log in to a software-as-a-service application using their corporate account. The home organization authenticates the user; the other organization trusts that assertion and applies its own authorization. No passwords are shared between organizations, which is a major security advantage.",
   "Several standards make this work, and you should recognize their names. Security Assertion Markup Language (SAML) is an XML-based standard in which the identity provider sends a signed assertion to the service provider; it is common for enterprise web SSO. OAuth is an authorization framework that lets a user grant an application limited access to their resources on another service without sharing their password, for example letting a scheduling app read your calendar. OpenID Connect adds an identity layer on top of OAuth, and it powers many 'sign in with' buttons on websites. Inside a single network, Kerberos is a ticket-based protocol that provides SSO in many enterprise directory environments.",
   "For the exam, focus on the concepts: SSO is one login for many systems, federation is trust between organizations, and both depend on a trusted identity provider issuing tokens or assertions."
  ],
  "terms": [
   [
    "Single sign-on (SSO)",
    "Authenticating once to gain access to multiple applications without logging in again."
   ],
   [
    "Identity provider (IdP)",
    "The trusted service that authenticates users and issues assertions or tokens about them."
   ],
   [
    "Federation",
    "A trust relationship that lets identities from one organization be used to access another's resources."
   ],
   [
    "SAML",
    "Security Assertion Markup Language, an XML-based standard for exchanging signed authentication assertions."
   ],
   [
    "OAuth",
    "An authorization framework that lets users grant applications limited access to their resources without sharing passwords."
   ]
  ],
  "example": "A marketing agency connects its email, file storage, design tools and HR system to one identity provider with MFA. When a designer resigns, IT disables her single account and she instantly loses access to all of them. The agency also federates with a client's portal, so staff use their agency login there instead of a separate client password.",
  "tip": "SSO improves security by centralizing strong authentication, but it is also a single point of failure and a high-value target. Federation means trust between different organizations; the passwords stay with the home organization.",
  "check": [
   [
    "What is the main security risk of SSO?",
    "A compromised SSO credential can give access to every connected application, and an outage of the identity provider can block all logins."
   ],
   [
    "How does federation differ from SSO within one company?",
    "Federation establishes trust across separate organizations, so a user authenticated by their home organization can access another organization's resources."
   ],
   [
    "Which standard is designed for delegating limited access to resources rather than authenticating a user?",
    "OAuth, which is an authorization framework; OpenID Connect adds authentication on top of it."
   ]
  ]
 },
 {
  "t": "Physical access controls: badges, access control vestibules, guards, CCTV, tailgating",
  "body": [
   "Logical security means little if someone can walk into the server room and carry out a disk. Physical access controls protect buildings, rooms and equipment, and they follow the same principles as digital controls: identify people, authorize them for specific areas, and log where they went.",
   "Physical security is designed in layers from the outside in. The perimeter may have fences, gates, lighting and bollards that stop vehicles. The building has controlled entrances, a reception desk and visitor procedures. Inside, sensitive areas such as data centers and records rooms have their own stronger controls. Each layer slows an intruder and creates chances for detection, another form of defense in depth.",
   "Badges are the most common physical credential. A badge identifies the holder with a photo and name, and an electronic badge, such as a proximity card or smart card, is read at doors to authenticate and authorize entry to specific areas at specific times. The badge system logs every use, providing accounting. Badges can be lost or cloned, so sensitive areas may combine a badge with a PIN or biometric scan for multi-factor physical access. Visitors should receive distinct temporary badges, sign in and be escorted.",
   "Tailgating is when an unauthorized person follows an authorized person through a secured door without using their own credential. Piggybacking is the same act done with the authorized person's knowledge or consent, such as politely holding the door for someone carrying boxes. Both defeat badge systems. Defenses include training staff not to hold doors, turnstiles that admit one person at a time, guards watching entrances and access control vestibules.",
   "An access control vestibule, historically called a mantrap, is a small space with two doors where the second door will not open until the first has closed and the person has been authenticated. It lets only one person through at a time and can trap an intruder between doors until security arrives.",
   "Guards are the most flexible control because they can use judgment, respond to unusual situations, check identification and deter, detect and prevent. They are also expensive and can be deceived by social engineering. Closed-circuit television (CCTV) cameras mostly deter and detect; they record events for later investigation and allow live monitoring, but they cannot stop anyone on their own. Other controls include alarms and motion sensors (detective), locks (preventive), and environmental protections for equipment such as fire suppression and climate control.",
   "Always consider life safety first. Doors on emergency exits must allow people out during a fire, a design called fail-safe, while locks that stay secured when power fails are called fail-secure. Protecting people always outranks protecting assets."
  ],
  "terms": [
   [
    "Tailgating",
    "An unauthorized person following an authorized person through a secured entrance without their knowledge."
   ],
   [
    "Piggybacking",
    "An unauthorized person entering with the knowledge or consent of an authorized person."
   ],
   [
    "Access control vestibule",
    "A two-door entry space that admits one authenticated person at a time; formerly called a mantrap."
   ],
   [
    "CCTV",
    "Closed-circuit television cameras used to deter, monitor and record activity."
   ],
   [
    "Fail-safe",
    "A design that defaults to an open or safe state for people when a failure occurs, such as exit doors unlocking during a fire."
   ]
  ],
  "example": "An intruder in a delivery uniform waits by the side door of an office and walks in behind an employee. After a review of CCTV footage, the company converts the side door into an exit-only door, installs an access control vestibule at the data center, and runs awareness training reminding staff to challenge or report anyone without a visible badge.",
  "tip": "CCTV is primarily detective and deterrent, not preventive. Human safety always comes first, so emergency exits must be fail-safe even if that weakens security.",
  "check": [
   [
    "What control is specifically designed to stop tailgating into a data center?",
    "An access control vestibule (mantrap) or turnstile that admits only one authenticated person at a time."
   ],
   [
    "Which physical control can deter, detect and prevent while exercising judgment?",
    "A security guard."
   ],
   [
    "What is the difference between tailgating and piggybacking?",
    "In tailgating the authorized person is unaware; in piggybacking they knowingly let the unauthorized person in."
   ]
  ]
 },
 {
  "t": "Periodic access reviews",
  "body": [
   "Even with good provisioning and deprovisioning, access drifts. People change roles, projects end, emergency access is granted and never removed, and service accounts outlive the systems they supported. Periodic access reviews, also called access recertifications or entitlement reviews, are the detective control that catches this drift and brings access back in line with least privilege.",
   "In an access review, the right person looks at a list of who has access to a system or dataset and confirms that each entry is still appropriate. The right person is usually the data owner or the user's manager, not the IT department, because they know who needs access for their work. IT's job is to produce accurate reports and remove access the reviewers reject. Each item is marked approve, modify or revoke, and the decisions are recorded as evidence.",
   "How often you review depends on risk. Privileged accounts and access to highly sensitive data are often reviewed quarterly or more often, while general access may be reviewed annually. Reviews should also happen after events such as reorganizations, mergers or a security incident. Many regulations and audit standards expect regular, documented reviews, so the records you keep also support compliance.",
   "A good review looks for specific problems. Privilege creep shows up as users with rights from previous jobs. Orphaned accounts belong to people who have left or have no owner. Dormant accounts have not been used for a long time and may no longer be needed. Excessive privileges include admin rights where standard access would do. Separation of duties conflicts show one person holding two roles that should be split, such as creating and approving payments. Shared or generic accounts undermine accountability. Service and vendor accounts need owners too.",
   "The most common failure is rubber-stamping, where reviewers approve everything without checking because the lists are long and confusing. You reduce it by showing reviewers clear, business-friendly descriptions of each permission, highlighting risky items, keeping lists short through role-based access, and holding managers accountable for their approvals. Automation in identity governance tools can send review campaigns, collect decisions and remove revoked access automatically.",
   "Access reviews close the loop on the identity lifecycle. Provisioning grants access, changes adjust it, deprovisioning removes it, and reviews verify that the whole process actually worked."
  ],
  "terms": [
   [
    "Access review",
    "A periodic check by owners or managers to confirm that users' access is still appropriate."
   ],
   [
    "Recertification",
    "Formally re-approving a user's existing access as part of a review."
   ],
   [
    "Dormant account",
    "An account that has not been used for an extended period."
   ],
   [
    "Rubber-stamping",
    "Approving access in a review without genuinely evaluating it."
   ],
   [
    "Entitlement",
    "A specific permission or access right granted to an identity."
   ]
  ],
  "example": "During a quarterly review of the finance system, the controller notices that a former accounts payable clerk, now in sales, still has payment approval rights, and a contractor account unused for eight months is still active. She revokes both, and the review record is saved as evidence for the annual audit.",
  "tip": "Access reviews are a detective control, and the business owner or manager should approve access, not the IT administrator who granted it.",
  "check": [
   [
    "Who is best placed to decide whether a user still needs access to a sales database?",
    "The data owner or the user's manager, because they understand the business need; IT supplies reports and implements changes."
   ],
   [
    "Name three problems an access review is designed to find.",
    "Privilege creep, orphaned or dormant accounts, and separation of duties conflicts or excessive privileges."
   ],
   [
    "What is rubber-stamping and why is it a problem?",
    "Approving access without real evaluation; it makes the review useless because inappropriate access stays in place."
   ]
  ]
 },
 {
  "t": "OSI and TCP/IP models, IP addressing, common ports (22, 25, 53, 80, 443, 3389)",
  "body": [
   "To secure a network you need a mental map of how data moves. Network models divide communication into layers, each with its own job, so you can reason about where a problem or a control sits.",
   "The Open Systems Interconnection (OSI) model has seven layers. From bottom to top: 1 Physical (cables, radio signals, bits), 2 Data Link (frames and MAC addresses on the local network; switches work here), 3 Network (IP addresses and routing between networks; routers work here), 4 Transport (end-to-end delivery with TCP or UDP and port numbers), 5 Session (setting up and managing conversations), 6 Presentation (formatting, encoding and often encryption) and 7 Application (protocols users' programs speak, such as HTTP or DNS). A memory aid from the bottom is: Please Do Not Throw Sausage Pizza Away. The TCP/IP model is the practical model the internet uses, with four layers: Network Access (or Link), Internet, Transport and Application. Its Application layer combines OSI layers 5 to 7, and Network Access combines 1 and 2.",
   "At the Transport layer, Transmission Control Protocol (TCP) is connection-oriented and reliable: it starts with a three-way handshake (SYN, SYN-ACK, ACK), numbers data and retransmits lost pieces. User Datagram Protocol (UDP) is connectionless and faster but offers no delivery guarantee, which suits DNS queries, streaming and voice.",
   "Every device on an IP network needs an address. IPv4 addresses are 32 bits written as four decimal numbers, such as 192.168.1.20. A subnet mask or prefix, such as /24, says which part identifies the network and which the host. Private ranges, 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16, are used inside organizations and are not routed on the internet; network address translation (NAT) lets them share public addresses. IPv6 uses 128-bit addresses written in hexadecimal, such as 2001:db8::1, and was created because IPv4 addresses ran out. In a lab, `ipconfig` on Windows or `ip addr` on Linux shows your address.",
   "Ports identify which service on a host should receive traffic. Memorize these for the exam:",
   "```text\n22   SSH    Secure Shell, encrypted remote command line (also SFTP)\n25   SMTP   Simple Mail Transfer Protocol, email between servers\n53   DNS    Domain Name System, name to IP lookups (UDP and TCP)\n80   HTTP   Unencrypted web traffic\n443  HTTPS  Web traffic encrypted with TLS\n3389 RDP    Remote Desktop Protocol, Windows remote desktop\n```",
   "Security meaning comes from these details. Port 80 sends data in clear text, so sensitive sites should use 443. Telnet on port 23 is the insecure predecessor of SSH and should be replaced. RDP on 3389 exposed to the internet is a frequent target for password-guessing attacks and should be reached through a VPN or gateway with MFA. When you scan your own machine with a tool such as Nmap, each open port you find is a service you should recognize and justify."
  ],
  "terms": [
   [
    "OSI model",
    "A seven-layer reference model describing network communication from physical signals to applications."
   ],
   [
    "TCP",
    "Transmission Control Protocol, a connection-oriented, reliable transport protocol that uses a three-way handshake."
   ],
   [
    "UDP",
    "User Datagram Protocol, a connectionless transport protocol that is fast but does not guarantee delivery."
   ],
   [
    "Port",
    "A number that identifies a specific service or application on a host."
   ],
   [
    "Private IP address",
    "An address from reserved ranges used inside networks and not routed on the public internet."
   ],
   [
    "NAT",
    "Network address translation, which maps private internal addresses to public addresses."
   ]
  ],
  "example": "Capturing a DNS lookup in Wireshark, you see your laptop at 192.168.1.20 send a UDP packet from a random high source port to destination port 53 on the resolver, and receive a response with the site's IP. Your browser then opens a TCP connection to port 443, completes the three-way handshake and begins a TLS session.",
  "tip": "Know the port numbers cold: 22 SSH, 25 SMTP, 53 DNS, 80 HTTP, 443 HTTPS, 3389 RDP. Routers and IP addresses live at layer 3; switches and MAC addresses at layer 2.",
  "check": [
   [
    "Which port and protocol should replace Telnet for secure remote command-line access?",
    "SSH on port 22, because it encrypts the session including credentials."
   ],
   [
    "At which OSI layer do routers and IP addresses operate?",
    "Layer 3, the Network layer."
   ],
   [
    "Is 10.4.8.2 a public or private IPv4 address?",
    "Private, because it falls in the 10.0.0.0/8 range reserved for internal networks."
   ]
  ]
 },
 {
  "t": "Network threats: DoS/DDoS, man-in-the-middle, malware, spoofing, side-channel",
  "body": [
   "Networks connect everything, which makes them the path most attacks travel. The CC exam expects you to recognize the main categories of network threats, know which part of the CIA triad each attacks and name typical defenses. The goal here is recognition and prevention, not attack technique.",
   "A denial-of-service (DoS) attack tries to make a system or network unavailable to legitimate users by exhausting a resource such as bandwidth, memory, connections or processing power. A distributed denial-of-service (DDoS) attack does the same from many sources at once, usually a botnet, which is a large group of compromised devices controlled by an attacker. Examples include floods of traffic and attacks that open many half-finished TCP connections (a SYN flood). DoS attacks target availability. Defenses include DDoS protection services from providers, rate limiting, spare capacity, load balancing and filtering at the network edge.",
   "A man-in-the-middle (MITM) attack, also called an on-path attack, places the attacker between two parties so they can read or change traffic while both sides believe they are talking directly. It can happen on an untrusted Wi-Fi network, through a rogue access point, or by poisoning address resolution on a local network. MITM threatens confidentiality and integrity. The main defense is strong encryption with authentication, such as TLS with valid certificates and VPNs, plus user awareness about certificate warnings.",
   "Malware is malicious software. Types include viruses, which attach to files and need a user action to spread; worms, which spread by themselves across networks; Trojans, which pretend to be legitimate programs; ransomware, which encrypts data and demands payment; spyware and keyloggers, which steal information; and rootkits, which hide deep in a system to avoid detection. Defenses include antivirus and endpoint detection tools, patching, application allow-listing, least privilege, email filtering and user training.",
   "Spoofing means faking an identity to gain trust. IP spoofing forges the source address of packets, email spoofing forges the sender address, MAC spoofing changes a device's hardware address and DNS spoofing returns false name lookups to redirect users to malicious sites. Defenses include ingress and egress filtering on routers, email authentication checks, DNS security extensions and strong authentication that does not rely on addresses alone.",
   "A side-channel attack gathers information from the physical behavior of a system rather than attacking the algorithm directly. Examples include measuring timing differences, power consumption, electromagnetic emissions or even sound to infer secrets such as encryption keys, and processor flaws that let one process infer data from another sharing the same hardware. Side-channel attacks usually target confidentiality. Defenses include applying vendor firmware and microcode updates, using well-tested cryptographic libraries that run in constant time, shielding and isolating sensitive workloads."
  ],
  "terms": [
   [
    "DDoS",
    "Distributed denial of service: an attack from many sources that overwhelms a target to make it unavailable."
   ],
   [
    "Botnet",
    "A network of compromised devices controlled by an attacker, often used for DDoS or spam."
   ],
   [
    "On-path (man-in-the-middle) attack",
    "An attack in which the attacker secretly intercepts and possibly alters communication between two parties."
   ],
   [
    "Worm",
    "Malware that replicates and spreads across networks without user action."
   ],
   [
    "Spoofing",
    "Falsifying an identity such as an IP address, email sender or MAC address to gain trust."
   ],
   [
    "Side-channel attack",
    "An attack that infers secrets from physical characteristics like timing, power use or emissions."
   ]
  ],
  "example": "A traveler connects to a free airport Wi-Fi network named like the real one but run by an attacker. Because her company's laptop automatically starts an always-on VPN and every site uses HTTPS with valid certificates, the attacker sees only encrypted traffic. A colleague who ignored a browser certificate warning on the same network had his webmail session captured.",
  "tip": "Match each threat to the CIA element it mainly hits: DoS and DDoS to availability, MITM to confidentiality and integrity, spoofing to authentication and integrity, side-channel to confidentiality.",
  "check": [
   [
    "What distinguishes a worm from a virus?",
    "A worm spreads by itself across networks without user action; a virus attaches to files and relies on a user or program to spread it."
   ],
   [
    "What is the most effective general defense against man-in-the-middle attacks?",
    "Strong encryption with authentication, such as TLS with verified certificates or a VPN, so intercepted traffic cannot be read or altered undetected."
   ],
   [
    "Which CIA goal does a DDoS attack target?",
    "Availability."
   ]
  ]
 },
 {
  "t": "Defenses: firewalls, IDS/IPS, antivirus, VPN",
  "body": [
   "Knowing the threats, you now need the standard defensive tools. The CC exam expects you to know what each one does, where it sits and what it cannot do.",
   "A firewall controls traffic between networks or into a host according to rules. Each rule typically matches source and destination addresses, ports and protocols, and then allows or denies the traffic. A good firewall policy ends in an implicit deny: anything not explicitly allowed is blocked. Packet-filtering firewalls inspect individual packets' headers and are fast but simple. Stateful firewalls track connections, so return traffic for a conversation started inside is allowed automatically while unsolicited inbound traffic is blocked. Application-level firewalls and next-generation firewalls inspect traffic up to the application layer and can recognize specific applications or users. A web application firewall (WAF) protects web applications from attacks such as injection. Host-based firewalls, like the one built into Windows, protect a single machine.",
   "An intrusion detection system (IDS) monitors traffic or host activity and raises alerts when it sees something suspicious; it is a detective control. An intrusion prevention system (IPS) sits inline in the traffic path and can block or drop malicious traffic automatically; it is preventive. Both can be network-based (NIDS, NIPS), watching traffic on a segment, or host-based (HIDS, HIPS), watching a single system. They detect in two main ways: signature-based detection matches known attack patterns and is accurate for known threats but misses new ones; anomaly-based (behavior-based) detection learns normal behavior and flags deviations, which can catch new attacks but produces more false positives. A false positive is an alert on harmless activity; a false negative is a missed attack, which is the more dangerous error.",
   "Antivirus, or anti-malware, software runs on endpoints and scans files and behavior for malicious software, mostly using signatures plus heuristics. Signatures must be updated frequently. Modern endpoint detection and response (EDR) tools go further, recording endpoint activity so analysts can investigate and respond, for example by isolating an infected laptop from the network.",
   "A virtual private network (VPN) creates an encrypted tunnel across an untrusted network, such as the internet, protecting confidentiality and integrity of traffic in transit. Remote-access VPNs connect individual users to the organization's network; site-to-site VPNs connect entire offices. Common technologies include IPsec and TLS-based VPNs. A VPN protects the path, not the endpoint: if the laptop is infected, the VPN will faithfully carry the attacker's traffic into the network, which is why VPN access should require MFA and healthy devices.",
   "No single tool is enough. A firewall cannot see inside encrypted traffic it is not configured to inspect, an IDS only alerts, antivirus misses new malware and a VPN trusts whatever connects. Layered together, they form part of defense in depth."
  ],
  "terms": [
   [
    "Stateful firewall",
    "A firewall that tracks connections and allows return traffic for established sessions."
   ],
   [
    "Implicit deny",
    "A default rule that blocks any traffic not explicitly allowed."
   ],
   [
    "IDS",
    "Intrusion detection system: monitors for suspicious activity and generates alerts."
   ],
   [
    "IPS",
    "Intrusion prevention system: sits inline and can automatically block malicious traffic."
   ],
   [
    "False negative",
    "A failure to detect actual malicious activity."
   ],
   [
    "VPN",
    "Virtual private network: an encrypted tunnel that protects data crossing an untrusted network."
   ]
  ],
  "example": "A company places a stateful firewall at its internet edge with implicit deny, a network IPS behind it that drops traffic matching known exploit signatures, endpoint anti-malware with EDR on every laptop and a VPN requiring MFA for remote staff. When a new malware strain slips past signatures, the EDR notices unusual behavior and isolates the laptop.",
  "tip": "IDS detects and alerts (passive, out of band); IPS blocks (active, inline). Signature-based detection misses new attacks; anomaly-based produces more false positives.",
  "check": [
   [
    "What is the key difference between an IDS and an IPS?",
    "An IDS only detects and alerts, while an IPS sits inline and can actively block malicious traffic."
   ],
   [
    "Which is more dangerous for a security team, a false positive or a false negative?",
    "A false negative, because a real attack goes unnoticed."
   ],
   [
    "Why doesn't a VPN protect the organization from an infected remote laptop?",
    "A VPN only encrypts the connection; it will carry malicious traffic from a compromised device into the network."
   ]
  ]
 },
 {
  "t": "Network design: segmentation, VLANs, DMZ, micro-segmentation, defense in depth",
  "body": [
   "Tools like firewalls work best when the network itself is designed to contain problems. A flat network, where every device can talk to every other device, lets an attacker who compromises one laptop move freely to servers and databases. Good design divides the network so that each part can be protected according to its risk.",
   "Segmentation means splitting a network into separate zones with controlled paths between them. Typical segments include user workstations, servers, management interfaces, guest Wi-Fi, payment systems and industrial or building-control devices. Traffic between segments passes through firewalls or access control lists that allow only what is needed. Segmentation limits lateral movement, meaning an attacker's movement from one system to another after the first compromise, and it limits the spread of worms and ransomware. It can also reduce compliance scope, for example by isolating card-processing systems.",
   "A virtual local area network (VLAN) is a common way to segment at layer 2. Switches tag traffic so that devices on the same physical switch belong to different logical networks and cannot talk directly. Communication between VLANs must pass through a router or layer 3 device, where rules can be enforced. VLANs are cheaper and more flexible than separate physical networks, but they are only as good as the switch configuration and the rules between them.",
   "A demilitarized zone (DMZ), also called a screened subnet, is a segment that sits between the untrusted internet and the trusted internal network. Public-facing servers such as web, email relays and DNS go there. Firewalls allow the internet to reach specific services in the DMZ, and allow very limited, specific traffic from the DMZ to the internal network. If a DMZ server is compromised, the attacker still faces another barrier before reaching internal systems.",
   "Micro-segmentation takes the idea further, applying fine-grained policies to individual workloads or applications rather than to whole subnets. It is often implemented in software, for example in virtualized data centers and cloud environments, where each virtual machine or container can have its own allowed connections. It is a key technique for zero trust architecture.",
   "Defense in depth is the principle behind all of this: use multiple, overlapping layers of controls so that the failure of one does not lead to a breach. Layers include physical security, perimeter firewalls, segmentation, host hardening, endpoint protection, application security, data encryption, monitoring, and people and policies. An attacker who gets through one layer should meet another, and each layer offers another chance to detect them. Other related network controls include network access control (NAC), which checks devices before letting them join the network, and keeping Internet of Things (IoT) devices on their own segments."
  ],
  "terms": [
   [
    "Segmentation",
    "Dividing a network into zones with controlled traffic between them to limit the spread of attacks."
   ],
   [
    "VLAN",
    "Virtual local area network: a logical network created on switches to separate traffic at layer 2."
   ],
   [
    "DMZ (screened subnet)",
    "A network zone between the internet and the internal network that hosts public-facing services."
   ],
   [
    "Micro-segmentation",
    "Fine-grained, often software-defined, isolation of individual workloads with their own access policies."
   ],
   [
    "Lateral movement",
    "An attacker moving from one compromised system to others within a network."
   ],
   [
    "Defense in depth",
    "Using multiple overlapping layers of security controls so one failure does not cause a breach."
   ]
  ],
  "example": "A small hospital places its public website in a DMZ, puts clinical devices on their own VLAN reachable only from the clinical application servers, isolates guest Wi-Fi from everything internal, and applies micro-segmentation in its virtual server cluster. When a receptionist's PC is infected with ransomware, the firewall rules between segments stop it from reaching the medical devices.",
  "tip": "Public-facing servers belong in the DMZ, never on the internal network. Segmentation's main security value is limiting lateral movement.",
  "check": [
   [
    "Where should an organization place its public web server?",
    "In a DMZ (screened subnet), separated by firewalls from both the internet and the internal network."
   ],
   [
    "How do devices in two different VLANs communicate?",
    "Through a router or layer 3 device, where access rules can control the traffic."
   ],
   [
    "Why does segmentation reduce the impact of ransomware?",
    "It limits lateral movement, so malware on one segment cannot freely reach systems on others."
   ]
  ]
 },
 {
  "t": "Zero trust: never trust, always verify",
  "body": [
   "Traditional network security followed a castle-and-moat model: a strong perimeter kept outsiders out, and anything inside was trusted. That model breaks down when staff work from home, applications run in the cloud, partners connect in, and attackers who get past the perimeter with one stolen password can roam freely. Zero trust is the response.",
   "Zero trust is a security model built on the idea that no user, device or network location is automatically trusted, whether inside or outside the traditional perimeter. Its motto is never trust, always verify. Every access request is authenticated, authorized and encrypted, based on as much context as possible, and trust is granted for a specific resource and session, not for the whole network.",
   "Several principles make this work. Verify explicitly: use strong identity (MFA), check device health (is it managed, patched, running endpoint protection?), and consider location, time and behavior before allowing access. Use least privilege: give just enough access, just in time, to the specific application rather than the whole network. Assume breach: design as if an attacker is already inside, so segment tightly, encrypt internal traffic and monitor continuously to detect and contain problems.",
   "In a common zero trust architecture, a policy decision point evaluates each request against policy, and a policy enforcement point, such as a gateway or proxy in front of the application, allows or blocks the connection accordingly. Micro-segmentation keeps workloads isolated so that even an approved connection reaches only what it should. Continuous monitoring can revoke access during a session if risk changes, for example if a device suddenly shows signs of infection.",
   "Zero trust changes the role of the network. Being on the office network no longer grants access by itself. Instead of a broad VPN that drops users onto the internal network, zero trust network access (ZTNA) connects a verified user on a verified device directly to a single application. This limits lateral movement and makes remote and office access work the same way.",
   "Zero trust is a strategy and a journey, not a single product. Organizations adopt it gradually, starting with strong identity and MFA, a good inventory of devices and applications, segmentation of critical assets and better logging. It connects many topics you have already studied: least privilege, access models, segmentation, defense in depth and monitoring. On the exam, when a scenario describes checking identity and device posture for every request regardless of network location, the answer is zero trust."
  ],
  "terms": [
   [
    "Zero trust",
    "A security model that grants no implicit trust based on network location and verifies every access request."
   ],
   [
    "Assume breach",
    "A zero trust principle of designing defenses as if attackers are already inside the environment."
   ],
   [
    "Device posture",
    "The security state of a device, such as patch level and endpoint protection, used in access decisions."
   ],
   [
    "Policy enforcement point",
    "The component that allows or blocks a connection based on a policy decision."
   ],
   [
    "ZTNA",
    "Zero trust network access: granting verified users on verified devices access to specific applications rather than the whole network."
   ]
  ],
  "example": "An employee opens the HR application from a café. The access gateway checks her identity with MFA, confirms her laptop is company-managed and fully patched, and allows access only to the HR app, not the wider network. The next day she tries from a personal tablet; the request is denied because the device is unmanaged, even though her password is correct.",
  "tip": "In zero trust, network location grants nothing. Being inside the corporate network does not make a request trusted; every request is verified.",
  "check": [
   [
    "What assumption of the perimeter model does zero trust reject?",
    "That users and devices inside the network perimeter can be trusted by default."
   ],
   [
    "Name three principles of zero trust.",
    "Verify explicitly, use least-privilege access, and assume breach."
   ],
   [
    "How does ZTNA differ from a traditional remote-access VPN?",
    "ZTNA connects verified users and devices only to specific applications, whereas a traditional VPN typically places the user onto the internal network with broad access."
   ]
  ]
 },
 {
  "t": "Cloud characteristics (on-demand, elasticity, measured service) and service models (IaaS, PaaS, SaaS)",
  "body": [
   "Cloud computing is a way of delivering computing resources as a service over a network instead of buying and running everything yourself. The widely used definition from the US National Institute of Standards and Technology (NIST) lists essential characteristics and service models, and the CC exam uses this vocabulary.",
   "On-demand self-service means a customer can provision resources, such as a new server or storage, whenever needed through a web console or API, without calling the provider. Broad network access means services are reachable over the network from many kinds of devices. Resource pooling means the provider serves many customers, called tenants, from shared physical resources, assigning capacity dynamically; this is multi-tenancy, and it is why isolation between customers matters. Rapid elasticity means capacity can scale out and in quickly, often automatically, to match demand, so an online shop can add servers for a holiday sale and remove them afterward. Measured service means usage is metered, like electricity, so customers pay for what they use and both sides can monitor consumption.",
   "Cloud services are offered in three main service models, which differ in how much the provider manages. Infrastructure as a Service (IaaS) provides virtual machines, storage and networks. The provider runs the physical data center, hardware and virtualization layer; the customer installs and manages the operating system, applications, data and most security settings. IaaS gives the most control and the most responsibility.",
   "Platform as a Service (PaaS) provides a managed platform for building and running applications, such as a managed database or an application runtime. The provider also manages the operating system and platform software, including patching it, while the customer manages their application code, data, configurations and user access. PaaS lets developers focus on code.",
   "Software as a Service (SaaS) provides a complete application over the internet, such as web email, office suites or customer relationship management tools. The provider manages almost everything, and the customer is responsible mainly for their data, user accounts, access permissions and how they configure the application's settings. SaaS gives the least control and the least operational effort.",
   "Security implications follow from these models. Elasticity and on-demand provisioning are powerful but can create unmanaged resources if not governed, and misconfiguration by customers is a leading cause of cloud breaches, such as storage left open to the public. Measured service makes cost visible but also means an attacker who hijacks an account to run workloads can create a large bill. In every model, the customer remains responsible for its data and for who can access it."
  ],
  "terms": [
   [
    "Rapid elasticity",
    "The ability to scale cloud resources out or in quickly, often automatically, to match demand."
   ],
   [
    "Measured service",
    "Metering of cloud resource usage so customers pay for what they consume."
   ],
   [
    "Multi-tenancy",
    "Serving multiple customers from shared infrastructure while keeping them logically isolated."
   ],
   [
    "IaaS",
    "Infrastructure as a Service: virtual servers, storage and networks where the customer manages the OS and above."
   ],
   [
    "PaaS",
    "Platform as a Service: a managed runtime or platform where the customer manages applications and data."
   ],
   [
    "SaaS",
    "Software as a Service: a complete application managed by the provider; the customer manages data and access."
   ]
  ],
  "example": "A startup runs its web email and accounting on SaaS, builds its customer app on a PaaS runtime with a managed database, and keeps one legacy tool on an IaaS virtual machine. Only on the IaaS server does its team patch the operating system; for all three, it manages user accounts, MFA and who can see customer data.",
  "tip": "Order the models by customer responsibility: IaaS (most), PaaS (middle), SaaS (least). In every model, the customer is responsible for its data and access management.",
  "check": [
   [
    "A company rents virtual machines and installs its own operating system. Which service model is this?",
    "Infrastructure as a Service (IaaS)."
   ],
   [
    "Which cloud characteristic lets resources grow automatically during a traffic spike and shrink afterward?",
    "Rapid elasticity."
   ],
   [
    "In SaaS, what security responsibilities does the customer keep?",
    "Its data, user accounts and access permissions, and how it configures the application's security settings."
   ]
  ]
 },
 {
  "t": "Deployment models: public, private, community, hybrid",
  "body": [
   "Service models describe what you get from the cloud; deployment models describe who shares the underlying infrastructure and who controls it. The four you need for the CC exam are public, private, community and hybrid. Each involves trade-offs between cost, control, flexibility and security.",
   "A public cloud is owned and operated by a provider and made available to the general public or many organizations over the internet. Customers share the provider's infrastructure through multi-tenancy, with logical isolation between them. Public clouds offer huge scale, rapid elasticity, pay-as-you-go pricing and no hardware to buy. The trade-offs are less direct control over the physical environment, dependence on the provider's security and availability, and questions about where data is stored, which can matter for laws that restrict data location. Security in public cloud relies heavily on the customer configuring identities, networks and storage correctly.",
   "A private cloud is cloud infrastructure used exclusively by a single organization. It may be hosted in the organization's own data center or by a third party, and it may be managed by the organization or by a provider. It offers cloud features such as self-service and elasticity, but with dedicated resources. Private cloud gives more control and customization and can make compliance easier for sensitive workloads, but it costs more, scales only as far as the owner invests, and the organization carries more of the operational and security burden.",
   "A community cloud is shared by several organizations with common concerns, such as similar missions, security requirements, policies or compliance obligations. Examples include clouds serving government agencies, universities or healthcare groups. Costs and responsibility are shared among members, and the environment can be tailored to their common requirements. The members must agree on governance, and a problem affecting one member's trust can affect all.",
   "A hybrid cloud combines two or more distinct deployment models, such as a private cloud or on-premises data center connected to a public cloud, with technology that allows data and applications to move between them. A common pattern is keeping sensitive data on-premises or in a private cloud while using public cloud for customer-facing applications or for extra capacity during peaks, sometimes called cloud bursting. Hybrid offers flexibility but adds complexity: consistent identity management, network connections, monitoring and policy must span every environment.",
   "Many organizations also use several public cloud providers, known as multi-cloud, to avoid depending on one vendor. Whatever the model, the security questions stay the same: who controls the infrastructure, who can access the data, where the data lives, and how responsibilities are divided, which is the subject of the next lesson."
  ],
  "terms": [
   [
    "Public cloud",
    "Cloud infrastructure owned by a provider and shared by many customers over the internet."
   ],
   [
    "Private cloud",
    "Cloud infrastructure dedicated to a single organization, hosted on-premises or by a third party."
   ],
   [
    "Community cloud",
    "Cloud infrastructure shared by several organizations with common requirements or missions."
   ],
   [
    "Hybrid cloud",
    "A combination of two or more deployment models connected so data and applications can move between them."
   ],
   [
    "Multi-cloud",
    "Using services from more than one public cloud provider."
   ]
  ],
  "example": "A state health department keeps patient records in a private cloud in its own data center, joins a community cloud shared with other state agencies for a common case-management system, and uses a public cloud for its public information website. Together these form a hybrid environment, so its team uses one identity provider and one monitoring platform across all three.",
  "tip": "Community cloud is the model for several organizations with shared concerns; hybrid means combining different models. Private does not always mean on-premises; a third party can host a private cloud.",
  "check": [
   [
    "Several universities share cloud infrastructure built for their common research compliance needs. Which deployment model is this?",
    "Community cloud."
   ],
   [
    "Does a private cloud have to be located in the organization's own building?",
    "No. It can be hosted by a third party, as long as the infrastructure is dedicated to one organization."
   ],
   [
    "What is a key security challenge of a hybrid cloud?",
    "Maintaining consistent identity, policy, monitoring and secure connectivity across different environments."
   ]
  ]
 },
 {
  "t": "Shared responsibility model and on-premises data center considerations",
  "body": [
   "When you move to the cloud, security does not become the provider's job. It becomes a shared job, and many cloud incidents happen because a customer assumed the provider was handling something that was actually the customer's responsibility. The shared responsibility model spells out who does what.",
   "The general rule is often summarized as: the provider is responsible for security of the cloud, and the customer is responsible for security in the cloud. The provider always handles the physical data centers, hardware, power, cooling, physical network and the virtualization layer. The customer always keeps responsibility for its data, its classification, who can access it (identities and permissions) and, ultimately, accountability for compliance. Between those, the split depends on the service model.",
   "In IaaS, the customer manages the guest operating system, including patching and hardening, network configuration such as virtual firewalls, applications, data and identities. In PaaS, the provider takes over the operating system and platform, so the customer handles its application code and configuration, data and access. In SaaS, the provider manages almost everything, and the customer manages user accounts, access rights, data and the security settings the application offers, such as enabling MFA or restricting sharing. A simple rule: the further up the stack you go from IaaS to SaaS, the more the provider does, but data and access always stay with you.",
   "Contracts and provider documentation define the exact split, and customers should review the provider's independent audit reports rather than relying on marketing. The customer also needs to plan for leaving: how data will be exported, and how the provider will securely delete it.",
   "On-premises data centers put all of these responsibilities on the organization. That includes power (utility feeds, uninterruptible power supplies for short outages and generators for long ones), heating, ventilation and air conditioning (HVAC) to keep equipment within safe temperature and humidity ranges, fire detection and suppression suitable for electronics (often gas-based or carefully designed sprinkler systems), physical security layers, redundant network connections, and staff to run everything around the clock. Organizations must also protect against water leaks, plan for hardware lifecycle and securely dispose of old equipment.",
   "The trade-off is control versus effort. On-premises gives complete control and visibility, which some organizations need for regulatory or technical reasons, but it requires capital investment and specialized skills. Cloud reduces the operational burden and adds elasticity, but requires trust in the provider and careful configuration. Many organizations use both, and a clear responsibility matrix for every system, stating who patches, who monitors, who backs up and who manages access, prevents dangerous gaps."
  ],
  "terms": [
   [
    "Shared responsibility model",
    "The division of security duties between a cloud provider and its customer, which varies by service model."
   ],
   [
    "Security of the cloud",
    "The provider's responsibility for physical facilities, hardware and the virtualization layer."
   ],
   [
    "Security in the cloud",
    "The customer's responsibility for its data, identities, access and configurations."
   ],
   [
    "UPS",
    "Uninterruptible power supply: a battery-based device that keeps equipment running during short power interruptions."
   ],
   [
    "HVAC",
    "Heating, ventilation and air conditioning, which keeps data center temperature and humidity within safe ranges."
   ]
  ],
  "example": "A company stores customer files in a public cloud storage service and assumes the provider keeps them private. An employee sets a folder to public for a quick share, and the files are indexed by search engines. The provider's infrastructure was never breached; the customer failed at its part of the shared responsibility model, which covers access configuration.",
  "tip": "Whatever the service model, the customer is always responsible for its data and for access management. The provider is always responsible for physical security of its data centers.",
  "check": [
   [
    "In IaaS, who patches the guest operating system?",
    "The customer."
   ],
   [
    "In SaaS, name one security responsibility the customer always keeps.",
    "Managing user accounts and access permissions to its data (also protecting the data itself and configuring available security settings such as MFA)."
   ],
   [
    "What is the purpose of a generator versus a UPS in a data center?",
    "A UPS provides immediate short-term battery power during an interruption; a generator supplies power for longer outages once started."
   ]
  ]
 },
 {
  "t": "Data security: classification, labeling, retention and secure destruction",
  "body": [
   "Data moves through a lifecycle: it is created or collected, stored, used, shared, archived and finally destroyed. At every stage it needs protection matching its value and sensitivity. Classification, labeling, retention and secure destruction are the practices that make that possible.",
   "Classification means grouping data into levels according to its sensitivity and the harm that would result from disclosure, alteration or loss. The data owner decides the classification. A common business scheme uses levels such as Public, Internal, Confidential and Restricted; government schemes use levels such as Confidential, Secret and Top Secret. Each level has handling rules: who may access it, whether it must be encrypted, whether it may leave the building or be stored in the cloud. Classification lets you spend protection where it matters instead of treating everything as top secret, which is expensive, or as public, which is dangerous. Classifications should be reviewed, because sensitivity can change over time.",
   "Labeling (or marking) makes the classification visible so people and systems handle data correctly. Documents can carry headers and footers, emails can carry tags, and files can carry metadata labels. Physical media such as backup tapes and printed reports should be labeled too. Automated tools such as data loss prevention (DLP) systems can read labels and block, for example, a Restricted file from being emailed outside the company.",
   "Retention defines how long data is kept. Retention periods come from laws, regulations, contracts and business needs; some records must be kept for years, while privacy principles say personal data should not be kept longer than necessary. A retention policy lists data types, how long each is kept and what happens at the end. Keeping data too long increases breach impact and storage cost; deleting it too early can break legal obligations. A legal hold suspends normal deletion when data may be needed for litigation or investigation.",
   "Secure destruction ensures data cannot be recovered when it is no longer needed. Simply deleting a file or formatting a drive usually leaves recoverable data behind; recoverable leftover data is called data remanence. Methods include clearing (overwriting with patterns so data cannot be recovered by normal tools), purging (stronger techniques such as degaussing magnetic media or cryptographic erase, where the encryption key is destroyed so the encrypted data becomes unreadable) and physical destruction (shredding, crushing, pulverizing or incinerating). Degaussing works on magnetic media, not on solid-state drives. Paper should be cross-cut shredded or pulped. Choose the method based on classification, and record destruction with a certificate, especially when a vendor performs it.",
   "These practices tie together: classification sets handling rules, labels communicate them, retention sets the timeline and secure destruction closes the lifecycle safely."
  ],
  "terms": [
   [
    "Data classification",
    "Assigning data to sensitivity levels that determine how it must be protected."
   ],
   [
    "Labeling",
    "Marking data or media with its classification so it is handled correctly."
   ],
   [
    "Retention policy",
    "Rules stating how long each type of data must be kept and how it is disposed of."
   ],
   [
    "Data remanence",
    "Residual data that remains on media after deletion or formatting."
   ],
   [
    "Degaussing",
    "Erasing magnetic media with a strong magnetic field; ineffective on solid-state drives."
   ],
   [
    "Cryptographic erase",
    "Sanitizing encrypted media by securely destroying its encryption keys."
   ]
  ],
  "example": "A law firm labels client files as Confidential, keeps them for the period set in its retention policy, then destroys them. Paper goes to a shredding vendor that returns a certificate of destruction; old laptop SSDs, which were encrypted, are cryptographically erased and then physically shredded. Files under a legal hold are excluded until the hold is lifted.",
  "tip": "The data owner, not IT, decides classification. Deleting or formatting does not remove data; for SSDs, degaussing does not work, so use cryptographic erase or physical destruction.",
  "check": [
   [
    "Who is responsible for deciding a dataset's classification?",
    "The data owner."
   ],
   [
    "Why is degaussing a poor choice for solid-state drives?",
    "SSDs store data in flash memory, not magnetically, so a magnetic field does not reliably erase them."
   ],
   [
    "What should happen to data subject to a legal hold when its retention period ends?",
    "It must be preserved and not destroyed until the legal hold is released."
   ]
  ]
 },
 {
  "t": "Encryption (symmetric vs asymmetric) and hashing",
  "body": [
   "Cryptography is the main technical tool for protecting confidentiality and integrity of data, whether it is stored (data at rest), moving across a network (data in transit) or being processed (data in use). The CC exam focuses on the concepts: symmetric encryption, asymmetric encryption and hashing, and when to use each.",
   "Encryption transforms readable plaintext into unreadable ciphertext using an algorithm and a key; decryption reverses it. The security depends on keeping keys secret, not the algorithm. Longer keys are generally harder to break by trying every possibility, known as a brute-force attack.",
   "Symmetric encryption uses the same secret key to encrypt and decrypt. It is fast and efficient, so it is used for encrypting large amounts of data, such as full disks, databases and bulk network traffic. The Advanced Encryption Standard (AES) is the widely used symmetric algorithm. The challenge is key distribution: both parties need the same key, and it must be shared securely. The number of keys also grows quickly: every pair of people who want to communicate privately needs their own key, so a group of n people needs n(n-1)/2 keys.",
   "Asymmetric encryption, also called public-key cryptography, uses a mathematically related key pair: a public key that can be shared with anyone and a private key that the owner keeps secret. Data encrypted with someone's public key can only be decrypted with their private key, which provides confidentiality. Data signed with someone's private key can be verified by anyone with their public key, which provides authenticity, integrity and non-repudiation; this is a digital signature. Common asymmetric algorithms include RSA and elliptic curve cryptography. Asymmetric encryption is much slower, so in practice it is used to exchange or protect a symmetric key, and the symmetric key then encrypts the data. HTTPS uses exactly this hybrid approach. Digital certificates, issued by certificate authorities as part of a public key infrastructure (PKI), bind a public key to an identity.",
   "Hashing is different: it is a one-way function that turns input of any size into a fixed-size output called a hash or digest. It cannot be reversed to recover the input, and changing even one character of the input produces a completely different hash. Hashing protects integrity: compare the hash of a downloaded file with the published value to confirm it was not altered. SHA-256 is a common modern hash algorithm; MD5 and SHA-1 are considered weak because collisions, two inputs producing the same hash, can be created. Systems store password hashes rather than passwords, adding a random value called a salt to each password before hashing so identical passwords do not produce identical hashes.",
   "```bash\nsha256sum report.txt        # Linux or macOS\nGet-FileHash .\\report.txt    # Windows PowerShell, SHA-256 by default\n```"
  ],
  "terms": [
   [
    "Symmetric encryption",
    "Encryption that uses the same secret key to encrypt and decrypt; fast and used for bulk data."
   ],
   [
    "Asymmetric encryption",
    "Encryption using a public and private key pair; slower, used for key exchange and digital signatures."
   ],
   [
    "Hashing",
    "A one-way function producing a fixed-size digest used to verify integrity."
   ],
   [
    "Digital signature",
    "A hash of data encrypted with the signer's private key, proving origin and integrity."
   ],
   [
    "Salt",
    "A random value added to a password before hashing so identical passwords yield different hashes."
   ],
   [
    "PKI",
    "Public key infrastructure: the certificate authorities, certificates and processes that bind public keys to identities."
   ]
  ],
  "example": "When you visit a banking site over HTTPS, your browser checks the site's certificate, uses asymmetric cryptography to agree on a symmetric session key, then encrypts the session with a fast symmetric cipher such as AES. Separately, you download the bank's app installer and compare its SHA-256 hash with the value published by the bank to confirm it has not been tampered with.",
  "tip": "Encryption is two-way and protects confidentiality; hashing is one-way and protects integrity. To encrypt a message for Bob, use Bob's public key; to sign a message, use your own private key.",
  "check": [
   [
    "Alice wants to send Bob a message only Bob can read. Which key does she use to encrypt it?",
    "Bob's public key; only Bob's private key can decrypt it."
   ],
   [
    "Why do most secure protocols use both asymmetric and symmetric encryption?",
    "Asymmetric solves key distribution but is slow, so it is used to exchange a symmetric key, which then efficiently encrypts the bulk data."
   ],
   [
    "Why can't you recover a password from its hash?",
    "Hashing is a one-way function; it is not designed to be reversed, so systems verify passwords by hashing the input and comparing digests."
   ]
  ]
 },
 {
  "t": "Logging, monitoring and SIEM; event triage",
  "body": [
   "Preventive controls eventually fail, so organizations must be able to notice when something goes wrong. Logging records what happens, monitoring watches those records, and a security information and event management (SIEM) system brings them together so analysts can spot and investigate incidents.",
   "A log is a record of events produced by a system or application. Security-relevant sources include operating systems (logins, privilege use, process starts), firewalls and IDS/IPS (allowed and blocked connections, alerts), authentication services, VPNs, web servers, databases, cloud platforms and endpoint protection tools. A useful log entry answers who, what, when, where and whether it succeeded: which account, which action, a timestamp, the source and destination, and the result. For timestamps to line up across systems, all devices should synchronize time with a common source using the Network Time Protocol (NTP).",
   "Logs must be protected. Attackers often try to delete or alter logs to hide their tracks, so logs should be sent to a central server as they are generated, access to them should be restricted and separate from the administrators whose actions they record, and integrity protections such as write-once storage or hashing should be used where possible. Retention periods come from policy and regulation. Logging everything at maximum detail creates cost and noise, so organizations decide which events matter.",
   "A SIEM collects logs from many sources, normalizes them into a common format, stores them and correlates them to find patterns no single log would show. A correlation rule might combine several failed logins followed by a success from a new country and then a large file download into one high-priority alert. SIEMs provide dashboards, search, alerting and reporting for compliance. They are typically operated by a security operations center (SOC), a team that monitors and responds to security events. Some organizations add security orchestration, automation and response (SOAR) tools to automate routine responses.",
   "An event is any observable occurrence, such as a user logging in. An alert is a notification that an event or pattern may be a problem. An incident is an event that actually threatens or harms confidentiality, integrity or availability, or violates policy. Most events are harmless and most alerts are not incidents.",
   "Event triage is the process of quickly evaluating alerts to decide which are real, how serious they are and what to do first. An analyst checks the context: Is the affected system critical? Is the account privileged? Does the activity match known normal behavior, such as a scheduled scan? Is there corroborating evidence in other logs? The analyst then classifies the alert as a false positive (close it and tune the rule if needed), a benign true positive or a real incident, assigns a severity and escalates according to the incident response plan. Good triage prevents alert fatigue, where so many low-value alerts arrive that analysts miss the important ones."
  ],
  "terms": [
   [
    "Log",
    "A record of events generated by a system, application or device."
   ],
   [
    "SIEM",
    "Security information and event management: a system that collects, normalizes, correlates and alerts on log data."
   ],
   [
    "Correlation",
    "Linking related events from different sources to identify patterns that suggest an attack."
   ],
   [
    "Event triage",
    "Rapidly assessing alerts to determine their validity, severity and priority for response."
   ],
   [
    "Alert fatigue",
    "Desensitization caused by excessive alerts, leading analysts to miss real threats."
   ],
   [
    "NTP",
    "Network Time Protocol, used to synchronize clocks so logs from different systems line up."
   ]
  ],
  "example": "At 02:14 the SIEM raises an alert: twenty failed logins on a finance user's account, then a success from an unfamiliar country, then a mailbox rule that forwards all mail externally. The analyst checks the HR calendar (the user is not traveling), confirms the logins were not from the company VPN, classifies it as a real incident, disables the account and escalates to the incident response team.",
  "tip": "Not every event is an incident. Triage decides which alerts are real and how urgent they are. Central, protected log collection with synchronized time is essential for investigation.",
  "check": [
   [
    "Why should logs be forwarded to a central server rather than kept only on each system?",
    "So attackers who compromise a system cannot easily delete or alter the evidence, and so logs can be correlated across systems."
   ],
   [
    "What does a SIEM add beyond simply storing logs?",
    "Normalization, correlation across sources, alerting, dashboards and reporting."
   ],
   [
    "What is the difference between an event and an incident?",
    "An event is any observable occurrence; an incident is an event that actually harms or threatens confidentiality, integrity or availability or violates policy."
   ]
  ]
 },
 {
  "t": "System hardening, configuration management, patching and change management",
  "body": [
   "Many successful attacks exploit ordinary weaknesses: default passwords, unnecessary services, missing updates and unreviewed changes. Four related practices close these gaps: hardening, configuration management, patch management and change management.",
   "System hardening means reducing a system's attack surface, the total set of points where an attacker could try to get in. Typical steps include removing or disabling unneeded software, services and ports; changing default passwords and disabling default accounts; enforcing least privilege; enabling host firewalls and endpoint protection; turning on logging; and applying secure settings such as disk encryption and screen locks. Organizations usually follow published hardening guides or benchmarks from reputable bodies and vendors, adapted into their own baselines.",
   "Configuration management keeps systems in a known, approved state. It starts with an inventory of hardware and software, because you cannot secure what you do not know you have. A secure baseline is defined for each type of system, new systems are built from it, often using images or automation, and systems are regularly checked for configuration drift, meaning unauthorized or accidental differences from the baseline. Tools can report and correct drift automatically. Good configuration management also makes recovery faster, because a known-good configuration can be rebuilt.",
   "Patch management is the process of identifying, testing, deploying and verifying software updates that fix vulnerabilities and bugs. A typical cycle is: learn about available patches from vendors, assess how critical each is for your environment, test it on non-production systems, deploy it in a planned window, and verify that it installed and nothing broke. Critical patches for internet-facing systems should be applied quickly because attackers often exploit known vulnerabilities soon after they are published. Systems that can no longer be patched because the vendor has ended support (end of life) need compensating controls such as isolation, or replacement.",
   "Change management is the formal process for proposing, reviewing, approving, implementing and documenting changes to systems. A change request describes what will change, why, the risks, a test plan and a rollback plan. A change advisory board (CAB) or designated approver reviews significant changes. Standard, low-risk changes can be pre-approved, and emergency changes, such as urgently patching an actively exploited flaw, can follow a faster path but must still be documented and reviewed afterward. Change management protects availability and integrity by preventing unplanned outages and unauthorized modifications, and it supports separation of duties.",
   "These practices depend on each other. Hardening defines the secure baseline, configuration management keeps systems on it, patching keeps it current, and change management makes sure every modification is deliberate, tested and recorded."
  ],
  "terms": [
   [
    "Hardening",
    "Reducing a system's attack surface by removing unneeded components and applying secure settings."
   ],
   [
    "Attack surface",
    "All the points where an attacker could attempt to enter or extract data from a system."
   ],
   [
    "Configuration drift",
    "Gradual, unapproved divergence of a system's settings from its approved baseline."
   ],
   [
    "Patch management",
    "The process of identifying, testing, deploying and verifying software updates."
   ],
   [
    "Change advisory board (CAB)",
    "A group that reviews and approves significant changes to IT systems."
   ],
   [
    "Rollback plan",
    "Steps to restore the previous state if a change fails."
   ]
  ],
  "example": "A vendor releases a critical update for a web server flaw that is being exploited. The team files an emergency change, tests the patch on a staging server for an hour, deploys it that evening with a rollback plan ready, and verifies the version afterward. The next morning the CAB reviews the emergency change, and the configuration tool confirms all web servers match the updated baseline.",
  "tip": "Test patches before production and always have a rollback plan. Emergency changes skip some steps but must still be documented and reviewed after the fact.",
  "check": [
   [
    "What is configuration drift and how is it detected?",
    "Unapproved divergence from a system's baseline; it is detected by regularly comparing systems against the baseline, often with automated tools."
   ],
   [
    "Name three hardening actions for a new server.",
    "Disable unneeded services and ports, change default passwords or disable default accounts, and apply secure configuration such as host firewall and logging."
   ],
   [
    "Why does a change request include a rollback plan?",
    "So the system can be quickly restored to its previous working state if the change causes problems."
   ]
  ]
 },
 {
  "t": "Vulnerability management and security testing basics",
  "body": [
   "New vulnerabilities are discovered in software and devices constantly. Vulnerability management is the continuous process of finding, prioritizing, fixing and verifying weaknesses before attackers can use them. Security testing gives you the evidence to do that well.",
   "The cycle usually runs like this. First, maintain an asset inventory, because unknown systems never get scanned or patched. Second, identify vulnerabilities, mainly with automated vulnerability scanners that probe systems and compare what they find with databases of known issues. Third, prioritize, because there will be more findings than time to fix them. Fourth, remediate by patching, changing configuration or applying a compensating control, or formally accept the risk. Fifth, verify with a rescan that the fix worked, and report progress.",
   "Publicly known vulnerabilities are identified with Common Vulnerabilities and Exposures (CVE) identifiers, which give each one a unique name so tools and people can refer to it consistently. The Common Vulnerability Scoring System (CVSS) rates severity on a scale from 0 to 10. Severity is only a starting point for priority: a critical issue on an isolated test machine may matter less than a high-severity issue on an internet-facing server holding customer data. Good prioritization also considers whether the flaw is being actively exploited and how valuable the asset is. A zero-day is a vulnerability that is exploited before the vendor has released a fix.",
   "Scans can be credentialed, where the scanner logs in to the system to inspect installed software and settings in detail, or non-credentialed, which see only what is exposed on the network, as an outside attacker would. Credentialed scans find more and produce fewer false positives. Scanners also report false positives, so analysts must validate findings.",
   "A vulnerability scan identifies potential weaknesses but does not try to exploit them. A penetration test goes further: authorized testers actively attempt to exploit weaknesses to show real impact, such as whether they can reach sensitive data. Penetration tests require written authorization and a defined scope, called rules of engagement, stating which systems may be tested, when and how. Testing without permission is illegal. Tests may be black box (testers have no prior knowledge), white box (full knowledge) or gray box (partial knowledge).",
   "Other forms of testing include security audits against a standard, configuration reviews, code reviews and application testing, and social engineering tests such as phishing simulations. In a lab, running `nmap -sT localhost` against your own machine is a simple safe exercise that shows which ports are open; only scan systems you own or are explicitly authorized to test."
  ],
  "terms": [
   [
    "Vulnerability scan",
    "An automated check that identifies known weaknesses without exploiting them."
   ],
   [
    "Penetration test",
    "An authorized, scoped attempt to exploit vulnerabilities to demonstrate real risk."
   ],
   [
    "CVE",
    "Common Vulnerabilities and Exposures: unique public identifiers for known vulnerabilities."
   ],
   [
    "CVSS",
    "Common Vulnerability Scoring System: a 0 to 10 scale describing a vulnerability's severity."
   ],
   [
    "Credentialed scan",
    "A scan that logs in to systems to inspect them in detail, producing more accurate results."
   ],
   [
    "Rules of engagement",
    "The written scope, timing and limits that authorize and govern a security test."
   ]
  ],
  "example": "A monthly credentialed scan finds 400 issues. The team prioritizes a critical, actively exploited flaw on the VPN gateway first, patches it within days and rescans to confirm. A medium issue on an isolated lab server is scheduled for next month. Once a year, an external firm runs a penetration test under signed rules of engagement to see whether the combination of remaining weaknesses could reach customer data.",
  "tip": "A vulnerability scan finds weaknesses; a penetration test exploits them to prove impact. Penetration tests always require written authorization and a defined scope.",
  "check": [
   [
    "What is the main difference between a vulnerability scan and a penetration test?",
    "A scan identifies possible vulnerabilities without exploiting them; a penetration test actively exploits them with authorization to demonstrate real impact."
   ],
   [
    "Why should CVSS score alone not decide remediation priority?",
    "Priority also depends on asset value, exposure such as internet facing, and whether the vulnerability is actively exploited."
   ],
   [
    "What must be in place before a penetration test begins?",
    "Written authorization and agreed rules of engagement defining scope, timing and methods."
   ]
  ]
 },
 {
  "t": "Incident response lifecycle: preparation, detection and analysis, containment, eradication, recovery, lessons learned",
  "body": [
   "No matter how good its defenses, every organization will eventually face a security incident. Incident response (IR) is the organized approach to handling one so that damage, cost and recovery time are minimized. The CC exam follows a lifecycle closely based on NIST guidance, and you should know the phases in order and what happens in each.",
   "Preparation comes first and happens before any incident. It includes writing an incident response policy and plan, forming an incident response team (often called a CSIRT, computer security incident response team) with clear roles, setting up communication channels and contact lists including legal, management, public relations and law enforcement, deploying logging and monitoring tools, preparing playbooks for common incident types and practicing through tabletop exercises. Preparation also includes preventive controls that reduce the number of incidents.",
   "Detection and analysis is recognizing that an incident may be occurring and understanding it. Signs come from SIEM alerts, antivirus, user reports, unusual system behavior or outside notifications. Analysts validate whether it is a real incident, determine its scope (which systems, accounts and data are involved), assess severity and prioritize. Documentation starts immediately: a timeline of what was observed and done. Evidence should be preserved carefully, with a chain of custody recording who handled it, in case it is needed for legal action.",
   "Containment limits the damage and stops the incident from spreading. Short-term containment might disconnect an infected laptop from the network, disable a compromised account or block a malicious IP address at the firewall. Longer-term containment might move systems to an isolated network while a fix is prepared. Containment decisions balance stopping harm against preserving evidence and keeping the business running; for example, isolating a system is usually better than powering it off, because powering off destroys volatile memory evidence.",
   "Eradication removes the cause of the incident: deleting malware, closing the exploited vulnerability through patching or configuration changes, removing attacker accounts and resetting compromised credentials. Recovery restores affected systems to normal operation, for example rebuilding from known-good images, restoring data from clean backups, and then monitoring closely to confirm the attacker has not returned. Systems are returned to production carefully and in stages. NIST's long-standing incident handling guide (SP 800-61 Rev. 2) groups containment, eradication and recovery into one phase, because teams cycle through them as they learn more.",
   "Lessons learned, also called post-incident activity, happens after the incident is closed. The team meets, ideally within several days of closing the incident, to review what happened, what worked, what did not and what should change. Outputs include updates to the IR plan, new or improved controls, additional training and metrics such as time to detect and time to contain. This phase is often skipped, but it is how the organization gets better. It feeds directly back into preparation, making the lifecycle a loop."
  ],
  "terms": [
   [
    "Incident response plan",
    "A documented approach defining roles, procedures and communication for handling security incidents."
   ],
   [
    "CSIRT",
    "Computer security incident response team: the group responsible for responding to incidents."
   ],
   [
    "Containment",
    "Actions that limit the spread and impact of an incident."
   ],
   [
    "Eradication",
    "Removing the root cause of an incident, such as malware or an exploited vulnerability."
   ],
   [
    "Chain of custody",
    "Documentation of who collected, handled and stored evidence, and when, to preserve its integrity."
   ],
   [
    "Tabletop exercise",
    "A discussion-based walkthrough of a simulated incident used to test plans and roles."
   ]
  ],
  "example": "An employee reports a ransom note on her screen. The SOC confirms ransomware (detection and analysis), isolates her laptop and the file server from the network and disables her account (containment), removes the malware and patches the exploited remote access flaw (eradication), restores files from last night's offline backup and monitors closely (recovery), and a few days later holds a lessons-learned meeting that leads to MFA on all remote access.",
  "tip": "Know the order: preparation, detection and analysis, containment, eradication, recovery, lessons learned. Contain before you eradicate, and prefer isolating a system over powering it off to preserve evidence.",
  "check": [
   [
    "Which phase includes writing playbooks and running tabletop exercises?",
    "Preparation."
   ],
   [
    "A compromised server is disconnected from the network to stop data exfiltration. Which phase is this?",
    "Containment."
   ],
   [
    "What is the main purpose of the lessons-learned phase?",
    "To review the incident and improve plans, controls and training so future incidents are prevented or handled better."
   ]
  ]
 },
 {
  "t": "Business continuity and disaster recovery: BIA, RTO, RPO, backups and alternate sites",
  "body": [
   "Incident response handles security events; business continuity and disaster recovery make sure the organization survives major disruptions of any kind, from ransomware to fires, floods, pandemics and long power outages. These topics protect availability, and the CC exam tests their vocabulary closely.",
   "A business continuity plan (BCP) focuses on keeping critical business functions running during and after a disruption, which may include manual workarounds, alternate staff and alternate locations. A disaster recovery plan (DRP) is narrower and more technical: it focuses on restoring IT systems, data and infrastructure after a disaster. The DRP supports the BCP. Both need senior management sponsorship, clear roles, communication plans and regular testing.",
   "Planning starts with a business impact analysis (BIA). The BIA identifies critical business functions and the systems and resources they depend on, and estimates the impact over time if each is disrupted: lost revenue, legal penalties, safety risks and reputational damage. From this come key recovery objectives. Maximum tolerable downtime (MTD) is the longest a function can be unavailable before the damage is unacceptable. Recovery time objective (RTO) is the target time to restore a system after a disruption, and it must be shorter than MTD. Recovery point objective (RPO) is the maximum acceptable amount of data loss measured in time; an RPO of four hours means backups or replication must occur at least every four hours. Remember: RTO is about time to get running again; RPO is about how much data you can afford to lose.",
   "Backups make recovery possible. A full backup copies all selected data; it is simplest to restore but slowest to make. An incremental backup copies only data changed since the last backup of any type; it is fast to create, but a restore needs the last full plus every incremental since. A differential backup copies data changed since the last full backup; it grows each day, but a restore needs only the last full plus the latest differential. A widely taught guideline is the 3-2-1 rule: keep three copies of data, on two different types of media, with one copy offsite. Offline or immutable copies protect against ransomware, and backups must be tested by actually restoring them.",
   "Alternate sites let operations move if the primary site is lost. A hot site is fully equipped with hardware, current data and connectivity and can take over within minutes to hours; it is the most expensive. A warm site has hardware and connectivity but needs data restored and configuration, so recovery takes hours to days. A cold site provides space, power and cooling but little or no equipment; it is cheapest but may take weeks. Cloud-based recovery offers flexible options between these. Choose the site type whose recovery time meets the RTO.",
   "Plans must be tested and maintained. Test types range from checklist reviews and tabletop walkthroughs to simulations, parallel tests where the alternate site runs alongside production, and full interruption tests, which are the most realistic and the most risky."
  ],
  "terms": [
   [
    "Business impact analysis (BIA)",
    "An analysis identifying critical functions and the impact of their disruption over time."
   ],
   [
    "Recovery time objective (RTO)",
    "The target time within which a system must be restored after a disruption."
   ],
   [
    "Recovery point objective (RPO)",
    "The maximum acceptable data loss, measured as time since the last good copy."
   ],
   [
    "Incremental backup",
    "A backup of data changed since the last backup of any type."
   ],
   [
    "Differential backup",
    "A backup of all data changed since the last full backup."
   ],
   [
    "Hot site",
    "A fully equipped alternate site with current data that can take over almost immediately."
   ]
  ],
  "example": "An online retailer's BIA shows that order processing can be down for at most eight hours. It sets an RTO of four hours and an RPO of 15 minutes, replicates its order database continuously to a warm standby in another region, takes nightly full and hourly incremental backups with one immutable offsite copy, and runs a failover test every quarter.",
  "tip": "RTO is how fast you must recover; RPO is how much data you can lose. A lower RPO requires more frequent backups or replication. Hot sites are fastest and most expensive; cold sites are slowest and cheapest.",
  "check": [
   [
    "A company can tolerate losing no more than one hour of transactions. Which objective does this define?",
    "The recovery point objective (RPO) of one hour."
   ],
   [
    "Which backup type requires the last full backup plus only the most recent backup of its type to restore?",
    "Differential backup."
   ],
   [
    "Which alternate site type best supports an RTO of a few minutes?",
    "A hot site, because it is fully equipped with current data and ready to take over."
   ]
  ]
 },
 {
  "t": "Best-practice policies (AUP, BYOD, password, privacy) and security awareness",
  "body": [
   "Earlier you learned how policies, standards and procedures fit together. The CC exam also expects you to know several specific policies that almost every organization has, what they typically contain and how awareness programs make them effective. Users usually acknowledge these policies when they join and periodically afterward, which creates accountability.",
   "An acceptable use policy (AUP) defines how employees and other users may use the organization's systems, networks, devices and data. It typically states that company resources are for business use with limited personal use allowed, prohibits illegal activity, harassment, installing unapproved software and bypassing security controls, and explains that activity may be monitored and that users have limited expectation of privacy on company systems. Users sign or accept the AUP before getting access, and violations can lead to disciplinary action. The AUP is often the first policy a new hire sees.",
   "A bring your own device (BYOD) policy governs the use of personally owned phones, tablets and laptops for work. It balances convenience against the risk of company data on devices the company does not own. Typical requirements include a screen lock and passcode, up-to-date operating systems, encryption, enrolling in mobile device management (MDM) or installing an app that keeps work data in a separate managed container, the right to remotely wipe company data if the device is lost or the person leaves, and restrictions on jailbroken or rooted devices. A good BYOD policy clearly explains what the organization can and cannot see or do on a personal device, respecting employee privacy.",
   "A password policy sets rules for creating and protecting credentials. Current best practice, reflected in modern NIST guidance, favors longer passwords or passphrases over complex but short ones, checking new passwords against lists of known compromised or common passwords, not forcing periodic changes without a reason but requiring a change when compromise is suspected, never reusing passwords across systems, using password managers and enabling MFA wherever possible. Policies also forbid sharing passwords and require changing all default passwords.",
   "A privacy policy has two faces. An external privacy notice tells customers and the public what personal data the organization collects, why, how it is used and shared, how long it is kept and what rights people have, as required by privacy laws. An internal privacy policy tells staff how to handle personal data: collect only what is needed, use it only for stated purposes, protect it according to its classification and report suspected breaches promptly.",
   "Policies only work if people know and follow them. Security awareness connects the two: onboarding sessions explain the AUP and password rules, regular reminders reinforce them, and simulated phishing and short scenario-based training show how the rules apply in daily work. Policies should be reviewed at least annually and whenever laws, technology or the business change, and exceptions should be approved and documented by the risk owner."
  ],
  "terms": [
   [
    "Acceptable use policy (AUP)",
    "A policy defining permitted and prohibited uses of organizational systems and data."
   ],
   [
    "BYOD",
    "Bring your own device: allowing personally owned devices to access organizational resources under set rules."
   ],
   [
    "Mobile device management (MDM)",
    "Software that enforces security settings on mobile devices and can remotely lock or wipe them."
   ],
   [
    "Passphrase",
    "A long password made of several words, easier to remember and harder to guess than a short complex password."
   ],
   [
    "Privacy notice",
    "A public statement explaining how an organization collects, uses, shares and protects personal data."
   ]
  ],
  "example": "A new sales hire signs the AUP on day one, learns in onboarding that she must use a passphrase with MFA and a password manager, and enrolls her personal phone under the BYOD policy, which places company email in a managed container. When she later loses the phone, IT remotely wipes only the work container, leaving her personal photos untouched.",
  "tip": "The AUP is typically signed before access is granted and warns that activity may be monitored. Modern password guidance favors length, breached-password checks and MFA over forced periodic changes.",
  "check": [
   [
    "What is the main purpose of an acceptable use policy?",
    "To define what users may and may not do with the organization's systems and data, and to set expectations such as monitoring, before access is granted."
   ],
   [
    "Name two typical BYOD policy requirements.",
    "Enrollment in MDM or a managed work container, and device encryption with a screen lock (also remote wipe of company data)."
   ],
   [
    "According to current best practice, when should users be required to change their passwords?",
    "When there is evidence or suspicion of compromise, rather than on an arbitrary fixed schedule."
   ]
  ]
 }
]);
