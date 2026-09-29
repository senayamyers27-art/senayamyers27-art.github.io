/* Lessons for ISACA CISM (2026 exam content outline): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("cism", [
 {
  "t": "Enterprise governance and the role of the information security manager",
  "body": [
   "Governance is the system by which an organization is directed and controlled. The board and executive management set direction, decide what risks are acceptable, and make sure resources are used responsibly. Information security governance is the part of enterprise governance that deals with protecting information and the systems that handle it. CISM treats security as a business function first and a technical function second, and nearly every exam question is written from that point of view.",
   "It helps to separate governance from management. Governance sets direction and oversees results: it answers 'are we doing the right things?' Management plans, builds, runs and monitors activities within that direction: it answers 'are we doing things right?' The board approves strategy and risk appetite; the information security manager turns them into a program, runs it and reports back. COBIT, ISACA's governance framework, draws the same line between evaluate-direct-monitor (governance) and plan-build-run-monitor (management).",
   "The information security manager, often titled CISO, sits between the two. The role is to understand business objectives, identify the information risks that threaten them, propose a strategy and program to manage those risks, and give leadership the information it needs to decide. The manager is responsible for the program but is not the owner of business risk. Business managers own the risks in their processes; the board and executives remain accountable for the organization's overall exposure.",
   "Good governance produces a handful of outcomes that ISACA lists again and again: strategic alignment with business objectives, risk management that keeps exposure within appetite, value delivery (security spending that supports the business efficiently), resource management, performance measurement and assurance that controls work. When an exam option talks about one of these outcomes, it is usually stronger than an option about a single tool or task.",
   "The exam's mindset follows from this. When a question asks what the manager should do first, look for the answer that gathers business context, informs decision-makers or follows an agreed process. Options where the manager acts unilaterally, such as blocking a business initiative, accepting risk on management's behalf, or buying technology before understanding the need, are usually wrong. You advise, facilitate and report; senior management decides."
  ],
  "terms": [
   [
    "Governance",
    "Direction and oversight by the board and executives: setting objectives, risk appetite and accountability, and monitoring results."
   ],
   [
    "Management",
    "Planning, building, running and monitoring activities within the direction set by governance."
   ],
   [
    "Accountability",
    "The obligation to answer for an outcome; it cannot be delegated, even when responsibility for the work is."
   ],
   [
    "Strategic alignment",
    "Security goals and spending are derived from, and support, the organization's business objectives."
   ]
  ],
  "example": "A hospital board approves a strategy to expand telehealth. The information security manager does not decide whether telehealth is too risky; she identifies the risks to patient data and service availability, proposes controls and costs, and presents the residual risk so the executive sponsor can decide whether to proceed.",
  "tip": "CISM answers favor the manager who advises and informs decision-makers over the one who acts alone. If an option has security making a business decision, it is almost always a distractor.",
  "check": [
   [
    "Who is ultimately accountable for information security?",
    "The board and executive management. The CISO is responsible for running the program, but accountability stays with leadership."
   ],
   [
    "What is the difference between governance and management?",
    "Governance sets direction and monitors whether the organization is doing the right things; management plans and runs activities to do things right within that direction."
   ]
  ]
 },
 {
  "t": "Organizational culture and its effect on security behavior",
  "body": [
   "Culture is the set of shared beliefs, habits and unwritten rules that shape how people actually behave at work. It matters to security because most controls depend on people: they must report suspicious emails, follow change procedures, lock screens and refuse to share passwords. A strong written policy that clashes with culture will be bypassed quietly, while a modest policy that fits the culture can be followed well.",
   "Security culture has several visible signs. Do people report mistakes and incidents quickly, or hide them for fear of blame? Do leaders follow the same rules as everyone else? Is security seen as a partner that helps the business get things done, or as the department of 'no'? Are security requirements considered early in projects, or added at the end? These signs tell you how much of your program will actually operate as designed.",
   "Culture is shaped mostly from the top. When executives visibly support security, use multifactor authentication themselves, fund training and ask about risk in business meetings, employees take it seriously. When they grant themselves exceptions, employees conclude that security is optional. That is why CISM places so much weight on senior management commitment: without it, even well-designed controls erode.",
   "An information security manager influences culture by understanding it first. Before rolling out a new control, learn how work gets done, which teams feel the most friction and why people take shortcuts. Then design controls that meet the control objective with the least disruption, explain the reason behind rules, recognize good behavior, and make reporting easy and blame-free. Awareness programs, discussed later, are one tool, but culture change also comes from process design and leadership example.",
   "Organizational culture also differs between regions and business units. A control that works in a highly regulated head office may be resisted in a fast-moving sales team or in a country with different expectations about monitoring and privacy. The manager should expect this and adapt communication and implementation while keeping the control objective the same."
  ],
  "terms": [
   [
    "Security culture",
    "The shared attitudes and habits that determine whether people behave securely when no one is checking."
   ],
   [
    "Tone at the top",
    "The example and priorities set by senior leaders, which strongly shape employee behavior."
   ],
   [
    "Blame-free reporting",
    "A practice where people can report mistakes and incidents without fear of punishment, so problems surface early."
   ]
  ],
  "example": "A software company requires code review for every change, but developers routinely approve their own pull requests under deadline pressure. Instead of adding penalties, the security manager works with engineering leads to add a second-reviewer rotation and automated checks, and the CTO publicly follows the same rule. Self-approvals drop within a month.",
  "tip": "When a question describes a policy that people ignore, look for the answer that addresses the cause, such as culture, leadership support or impractical design, rather than more enforcement or monitoring.",
  "check": [
   [
    "Why can a technically sound policy still fail?",
    "If it clashes with the organization's culture or lacks visible leadership support, people will work around it."
   ],
   [
    "What is the most powerful influence on security culture?",
    "Senior management's visible commitment and example, often called the tone at the top."
   ]
  ]
 },
 {
  "t": "Legal, regulatory and contractual requirements",
  "body": [
   "Every organization operates under external obligations. Laws and regulations, such as data protection laws, sector rules for health or finance, and breach notification requirements, set minimum expectations and carry penalties. Contracts with customers, partners and card brands add more, for example the Payment Card Industry Data Security Standard (PCI DSS) for anyone who handles payment cards. The information security manager must know which obligations apply and make sure the program addresses them.",
   "The first step is identification. Work with legal counsel and compliance to build a register of obligations: the source (law, regulation, contract), what it requires, which business processes and data it touches, and who owns compliance. Requirements change, so the register needs a periodic review and a way to capture new laws, new markets and new contracts. When the business expands into a new country or signs a major customer, the manager's first move is to understand the new requirements before choosing controls.",
   "Some requirements are specific, such as encrypting cardholder data or reporting certain breaches within a fixed number of hours. Others are principle-based, such as 'appropriate technical and organizational measures'. For principle-based rules, the organization must show that its controls are reasonable for its risks, which links compliance directly to risk assessment. Compliance is a floor, not a ceiling: meeting the law does not mean risk is within appetite.",
   "Conflicts happen. A global policy may say logs are kept for one year while a local law requires a different period, or a data localization law may require certain data to stay in-country. The right response is not to ignore either side informally. Document the conflict, get legal advice, and approve a formal local standard or exception with its risk understood.",
   "Contracts also flow outward. When you outsource processing, your obligations do not disappear; you must pass requirements to the provider through contract clauses such as security requirements, breach notification, right to audit and limits on subcontracting. Regulators generally hold the organization accountable for its vendors' handling of its data."
  ],
  "terms": [
   [
    "Regulatory requirement",
    "An obligation imposed by a law or regulator, usually with penalties for noncompliance."
   ],
   [
    "Contractual requirement",
    "An obligation the organization accepts in an agreement, such as PCI DSS through card brand contracts."
   ],
   [
    "Data localization",
    "A legal requirement that certain data be stored or processed within a specific country."
   ],
   [
    "Compliance register",
    "A maintained list of applicable obligations, what they require, where they apply and who owns them."
   ]
  ],
  "example": "A payroll company wins a contract with a bank that requires notification of any security incident within 24 hours and an annual independent audit. The security manager adds both to the compliance register, updates the incident response plan's notification steps and schedules a SOC 2 assessment.",
  "tip": "When a new law or market appears in a question, the first step is to identify the requirements and their impact, not to jump to a specific control or data move.",
  "check": [
   [
    "Does compliance with the law mean risk is acceptable?",
    "No. Compliance is a minimum; the organization may still carry risk above its appetite and need further controls."
   ],
   [
    "What should happen when local law conflicts with group policy?",
    "Document the conflict, take legal advice and approve a formal, risk-assessed local standard or exception."
   ]
  ]
 },
 {
  "t": "Organizational structures, roles and responsibilities (board, steering committee, CISO, data owners)",
  "body": [
   "Security works only when people know who decides, who does the work and who checks it. CISM expects you to know the standard roles and where accountability sits. The board of directors sets overall direction and risk appetite and oversees management; it is ultimately accountable for protecting the organization's assets. Executive management turns that direction into strategy and funds it.",
   "A security steering committee brings together senior representatives from the major business units, IT, legal, human resources, risk and compliance. Its job is to prioritize security initiatives, resolve conflicts between business needs and security requirements, approve policies for executive sign-off, and keep security aligned with business goals. A committee made only of technical staff cannot make business trade-offs, which is why exam answers favor cross-functional membership.",
   "The chief information security officer (CISO) or information security manager designs and runs the program, advises leadership and reports on risk. Reporting line matters: a CISO who reports to the head of IT operations can face a conflict of interest when security findings criticize IT's own work. Reporting to the CEO, chief risk officer or another executive outside IT operations gives more independence, though many organizations still place security under the CIO.",
   "Data and system owners are senior business managers accountable for specific information assets. They classify their data, approve who gets access, and accept or reject the risk to their assets. Custodians, usually IT staff, implement and operate the controls owners decide on, such as backups and access configuration. Users follow policy. Internal audit gives independent assurance to the board, and must not run the controls it audits.",
   "A RACI chart (responsible, accountable, consulted, informed) is a simple way to document these roles for each security process. Only one party should be accountable for each activity. Clear roles prevent both gaps, where no one owns a risk, and overlaps, where teams argue over decisions during an incident."
  ],
  "terms": [
   [
    "Steering committee",
    "A cross-functional group of senior leaders that prioritizes and oversees security initiatives."
   ],
   [
    "Data owner",
    "A business manager accountable for an information asset, including its classification and access approvals."
   ],
   [
    "Data custodian",
    "The person or team, often IT, that implements and operates the controls the owner has chosen."
   ],
   [
    "RACI",
    "A matrix showing who is responsible, accountable, consulted and informed for each activity."
   ]
  ],
  "example": "At a logistics firm, the head of sales owns the customer database and approves access requests. The database team, as custodian, applies the approved access and runs backups. When audit finds excessive access, the finding goes to the sales head as owner, not to the database team.",
  "tip": "Watch for independence problems: auditors should not run controls, and security findings about IT should not be filtered through IT operations. Owners are business managers, not IT staff.",
  "check": [
   [
    "Who classifies a customer database?",
    "Its business data owner; custodians and security advise and implement."
   ],
   [
    "Why might a CISO reporting to the IT operations manager be a problem?",
    "It creates a conflict of interest when security needs to report weaknesses in IT's own work."
   ]
  ]
 },
 {
  "t": "Information security strategy: current state, desired state and gap analysis",
  "body": [
   "A strategy is a plan to reach long-term goals. An information security strategy describes how the security program will support business objectives over the next few years, and it starts from the business, not from technology. The manager needs the business strategy, risk appetite, legal obligations and major initiatives in hand before writing anything.",
   "The core method is simple. First, describe the current state: which capabilities, controls, processes and skills exist today and how mature they are. Useful inputs include risk assessments, audit findings, maturity assessments against a framework, incident history and interviews with business leaders. Second, define the desired state: the capabilities and risk position the organization needs to support its goals within appetite, often expressed as target maturity levels, control objectives or framework profiles. NIST CSF 2.0 calls these current and target profiles.",
   "Third, analyze the gap between the two. Each gap is a reason for work: a missing capability, a weak process, a skill shortage or an unacceptable risk. Gaps are then prioritized by the business risk they represent, the effort to close them and dependencies between them. The result is a roadmap of initiatives over time, each with an owner, cost, benefit and measure of success.",
   "A strategy also identifies constraints: budget, staff, culture, legal limits, technology and time. Ignoring them produces a plan no one can execute. Good strategies state assumptions and include metrics so leadership can see progress, such as target maturity reached or risk reduced for key processes.",
   "Finally, the strategy must be approved by senior management and revisited when the business changes. A merger, new market or major outsourcing decision can change the desired state, so the strategy is a living document. On the exam, remember the order: business objectives, current state, desired state, gap, roadmap, approval."
  ],
  "terms": [
   [
    "Current state",
    "A documented picture of today's security capabilities, controls and maturity."
   ],
   [
    "Desired state",
    "The target capabilities and risk position needed to support business objectives within appetite."
   ],
   [
    "Gap analysis",
    "A comparison of current and desired state that identifies what must change."
   ],
   [
    "Roadmap",
    "A sequenced, resourced plan of initiatives that closes the prioritized gaps."
   ]
  ],
  "example": "An insurer scores itself at maturity level 1 for asset management and level 2 for incident response, but its plan to launch online claims needs level 3 in both. The gap becomes two roadmap initiatives, a CMDB project and a formal incident response program, each with a budget and a quarterly milestone.",
  "tip": "Gap analysis needs a desired state, and the desired state comes from business objectives. An answer that starts with a framework gap assessment before understanding the business is usually premature.",
  "check": [
   [
    "What is the purpose of defining the desired state?",
    "It provides the target that the current state is compared with, so gaps can be identified and prioritized."
   ],
   [
    "What should drive the priority of strategy initiatives?",
    "The business risk each gap represents, balanced against cost, effort and dependencies."
   ]
  ]
 },
 {
  "t": "Governance frameworks and standards: COBIT, ISO/IEC 27001, NIST CSF 2.0",
  "body": [
   "Frameworks give you a proven structure and common vocabulary so you do not have to invent a program from scratch. CISM does not test framework details deeply, but you must know what each major framework is for and when you would choose it.",
   "COBIT, published by ISACA, is a framework for the governance and management of enterprise information and technology. It separates governance objectives (evaluate, direct and monitor) from management objectives (align, plan and organize; build, acquire and implement; deliver, service and support; monitor, evaluate and assess). Its goals cascade links stakeholder needs to enterprise goals and then to alignment goals for IT. Use COBIT when you need to show how IT and security governance serve enterprise goals.",
   "ISO/IEC 27001 specifies requirements for an information security management system (ISMS): scoping, leadership commitment, risk assessment and treatment, a statement of applicability, internal audit, management review and continual improvement. Organizations can be certified against it by an accredited body. ISO/IEC 27002 is the companion catalog of controls with implementation guidance; you use it to pick and implement controls, but you are not certified against it.",
   "The NIST Cybersecurity Framework (CSF) 2.0, released in 2024, organizes outcomes into six functions: Govern, Identify, Protect, Detect, Respond and Recover. Govern was added in 2.0 to cover organizational context, risk management strategy, roles, policy, oversight and supply chain risk. The CSF uses profiles to describe current and target states, which fits strategy work well. It is voluntary and there is no official certification.",
   "Other frameworks you may meet include NIST SP 800-53 (a detailed control catalog), the CIS Critical Security Controls (a prioritized set of technical safeguards), ITIL (IT service management) and the NIST Risk Management Framework (SP 800-37). No framework guarantees security. Organizations select one or more, tailor them to their risk, and often map controls between them to satisfy several obligations with one set of controls."
  ],
  "terms": [
   [
    "COBIT",
    "ISACA's framework for governance and management of enterprise information and technology."
   ],
   [
    "ISMS",
    "Information security management system: the policies, processes and controls used to manage information security risk, as defined by ISO/IEC 27001."
   ],
   [
    "Statement of applicability",
    "An ISO/IEC 27001 document listing which controls apply, whether they are implemented and why any are excluded."
   ],
   [
    "NIST CSF 2.0",
    "A voluntary framework of cybersecurity outcomes organized into Govern, Identify, Protect, Detect, Respond and Recover."
   ]
  ],
  "example": "A software company selling to European enterprises pursues ISO/IEC 27001 certification because customers ask for it in contracts, uses ISO/IEC 27002 to implement controls, and reports progress to its board using NIST CSF 2.0 current and target profiles because they are easy for executives to read.",
  "tip": "Certification questions point to ISO/IEC 27001, not 27002 or NIST CSF. Enterprise IT governance and goal alignment point to COBIT. The 'Govern' function is new in CSF 2.0.",
  "check": [
   [
    "Can an organization be certified against ISO/IEC 27002?",
    "No. Certification is against ISO/IEC 27001; 27002 provides supporting control guidance."
   ],
   [
    "Name the six functions of NIST CSF 2.0.",
    "Govern, Identify, Protect, Detect, Respond and Recover."
   ]
  ]
 },
 {
  "t": "Strategic planning: business cases, budgets and resource allocation",
  "body": [
   "A strategy is only real once it is funded and staffed. The information security manager competes for money and people with every other part of the business, so CISM expects you to argue in business terms. The main tool is the business case: a document that explains a problem, the options for addressing it, their costs and benefits, and a recommendation that leadership can approve or reject.",
   "A strong security business case starts with the business problem, not the technology. For example: 'Our customer portal is our largest revenue channel and credential stuffing attacks are causing account takeovers and support costs.' It then describes options, including doing nothing, with cost, expected risk reduction, effect on operations and implementation time for each. Where possible it quantifies benefits, such as reduced expected loss, avoided fines, lower support costs or enabling a new product. It ends with the decision needed and how success will be measured.",
   "Budgeting follows the strategy's roadmap. Security budgets include capital expenses (one-time purchases and projects) and operating expenses (subscriptions, staff, managed services). The size of the budget should reflect the value at risk and the organization's appetite, not simply last year's figure or a peer benchmark. Benchmarks are useful context but ignore your specific assets and threats.",
   "Resource allocation covers people as well as money. The manager decides which skills to build internally, which to hire, and which to buy as services. Outsourcing can bring expertise quickly, but responsibility for managing the risk stays with the organization. Staff time is also a resource: a roadmap that assumes the same small team can deliver ten projects at once will fail.",
   "Return on security investment (ROSI) is one way to express value: the reduction in annualized loss expectancy minus the annual cost of the control, divided by that cost. Numbers like these are estimates, so present them honestly with their assumptions. Executives respond better to clear, honest ranges than to precise-looking figures they cannot trust."
  ],
  "terms": [
   [
    "Business case",
    "A document that justifies an investment by comparing options, costs, benefits and risks, and states the decision needed."
   ],
   [
    "Capital expense (CapEx)",
    "A one-time investment in assets or projects, such as buying hardware or building a system."
   ],
   [
    "Operating expense (OpEx)",
    "Ongoing costs such as subscriptions, salaries and managed services."
   ],
   [
    "Return on security investment (ROSI)",
    "An estimate of value: the reduction in expected loss, minus the control's cost, relative to that cost."
   ]
  ],
  "example": "A security manager asks for $120,000 a year for managed detection and response. Her business case shows current detection takes 30 days on average, estimates the expected annual loss from late detection at $400,000 falling to $150,000, compares hiring three analysts, and asks the CFO to approve a two-year contract with quarterly metrics.",
  "tip": "Business cases that win on the exam emphasize risk to business objectives relative to cost. Technical features, fear from competitors' breaches or vulnerability counts are weaker justifications.",
  "check": [
   [
    "What should a security business case emphasize most?",
    "How the investment reduces risk to business objectives, or enables them, relative to its cost."
   ],
   [
    "Why is a peer benchmark not enough to set a security budget?",
    "It ignores the organization's own assets, threats and risk appetite."
   ]
  ]
 },
 {
  "t": "Risk appetite, risk tolerance and aligning security with business objectives",
  "body": [
   "Risk appetite is the amount and type of risk an organization is willing to pursue or accept to achieve its objectives. It is set by the board and senior management, not by the security team. A bank might have a very low appetite for fraud losses but a moderate appetite for risk in launching new digital products. Appetite statements can be qualitative ('we will not accept risks that could cause a regulatory sanction') or quantitative ('no more than $2 million expected annual loss from cyber events').",
   "Risk tolerance is the acceptable variation around the appetite for a particular objective or measure. If appetite says critical systems must be highly available, tolerance might say that up to four hours of unplanned downtime per quarter is acceptable. Tolerances turn broad appetite into thresholds you can monitor, often through key risk indicators. Some organizations also use risk capacity, the maximum risk the organization could absorb before failing, which appetite should stay well below.",
   "Appetite drives the security program in practical ways. It tells you which risks must be treated, how far residual risk must be reduced, which exceptions can be approved and at what level, and where to spend limited budget. A low appetite for customer data exposure means controls around customer data get priority. A higher appetite for risk in internal tools may allow lighter controls there.",
   "Alignment means security decisions are made in this business context. The manager translates security risks into business impact, compares them with appetite and tolerance, and presents options to the risk owner. If residual risk after treatment still exceeds appetite, it goes to senior management for further treatment or formal acceptance by someone with authority. The security team does not quietly accept risk or quietly lower ratings to make them fit.",
   "Appetite should be reviewed as strategy and conditions change. A company that becomes publicly listed, enters a regulated market or suffers a major incident may lower its appetite in some areas. The information security manager should prompt that review when conditions change, because an outdated appetite leads to outdated priorities."
  ],
  "terms": [
   [
    "Risk appetite",
    "The amount and type of risk the organization is willing to accept in pursuit of its objectives, set by senior leadership."
   ],
   [
    "Risk tolerance",
    "The acceptable deviation from appetite for a specific objective, often expressed as a measurable threshold."
   ],
   [
    "Risk capacity",
    "The maximum risk an organization can absorb before it can no longer meet its obligations or survive."
   ],
   [
    "Residual risk",
    "The risk that remains after controls are applied."
   ]
  ],
  "example": "An online retailer's board sets a low appetite for payment data exposure and a tolerance of zero unencrypted card numbers in storage. When a scan finds card numbers in a log file, the finding breaches tolerance and is escalated immediately, even though the volume is small.",
  "tip": "Appetite is set by senior management. If residual risk exceeds it, the answer is escalation for a decision, never self-acceptance by the security manager or changing the rating.",
  "check": [
   [
    "Who sets risk appetite?",
    "The board and senior management."
   ],
   [
    "How does risk tolerance differ from risk appetite?",
    "Appetite is the broad level of acceptable risk; tolerance is the acceptable variation around it for a specific objective, often a measurable threshold."
   ]
  ]
 },
 {
  "t": "Emerging risk and the threat landscape",
  "body": [
   "The threat landscape is the changing set of threat actors, their motives and the techniques they use. An information security manager must keep an informed view of it, because a risk assessment that was accurate last year may be wrong today. New attack methods, new technologies adopted by the business and changes in geopolitics all shift the likelihood of different events.",
   "Threat actors are usually grouped by motive and capability: financially motivated criminals (ransomware groups, fraud rings), nation-state actors seeking espionage or disruption, hacktivists seeking attention for a cause, insiders who are malicious or simply careless, and opportunists using freely available tools. Each group tends to prefer certain techniques and targets. Knowing which ones are interested in your industry helps you focus.",
   "Emerging risk comes from both outside and inside. Outside, examples include new ransomware extortion tactics, attacks on software supply chains, abuse of artificial intelligence to scale phishing, and weaknesses in widely used products. Inside, the business itself creates new risk when it adopts cloud services, connects operational technology, launches AI features, or relies on a new outsourcing partner. The manager should be involved early in those business changes.",
   "Threat intelligence is the input that keeps this view current. Strategic intelligence (trends and actor motives) informs executives and strategy. Operational and tactical intelligence (campaigns, techniques mapped to frameworks such as MITRE ATT&CK) helps defenders tune controls. Sources include government advisories, industry sharing groups (ISACs), vendor reports and your own incident data. Intelligence is only useful if it changes decisions.",
   "When new threat information arrives, the right first step is to assess relevance and exposure: does the threat target our industry, do we use the affected technology, and would our current controls detect or stop the technique? Only then decide whether to change controls, priorities or the risk register. Buying a product or disconnecting systems on the strength of a headline, without that analysis, is the reaction CISM questions want you to avoid."
  ],
  "terms": [
   [
    "Threat landscape",
    "The current set of threat actors, their motives, capabilities and techniques relevant to an organization."
   ],
   [
    "Threat intelligence",
    "Analyzed information about threats that supports decisions, from strategic trends to specific indicators."
   ],
   [
    "ISAC",
    "Information Sharing and Analysis Center: an industry group where members share threat information."
   ],
   [
    "Emerging risk",
    "A new or changing risk whose likelihood or impact is not yet well understood."
   ]
  ],
  "example": "A regional credit union receives an ISAC alert about attackers abusing a popular remote-support tool. The security manager confirms two branches use that tool, checks that MFA and logging are enabled, finds one branch without MFA, and adds a risk register entry with a two-week remediation deadline.",
  "tip": "New threat information triggers assessment of exposure first. Answers that buy tools, notify customers or cut connectivity before assessing are usually wrong.",
  "check": [
   [
    "What should you do first with a new threat report?",
    "Assess whether it is relevant and whether the organization is exposed to the techniques it describes."
   ],
   [
    "Give two internal sources of emerging risk.",
    "Adopting new technologies (for example cloud or AI) and new business relationships such as outsourcing partners."
   ]
  ]
 },
 {
  "t": "Vulnerability and control deficiency analysis",
  "body": [
   "A vulnerability is a weakness that a threat could exploit. It may be technical, such as missing patches or misconfigurations, or non-technical, such as an untrained team, a weak process or a single person holding critical knowledge. Risk exists where a relevant threat meets a vulnerability in an asset that matters. Vulnerability analysis finds these weaknesses so the risk can be assessed and treated.",
   "Technical vulnerability information comes from scanning, penetration tests, configuration reviews, code analysis and vendor advisories. Scores such as the Common Vulnerability Scoring System (CVSS) rate technical severity, but they are not business risk. A critical flaw on an isolated test server may matter less than a medium flaw on the internet-facing payment system. The manager's job is to add business context: asset value, exposure, exploitability in your environment and compensating controls.",
   "Control deficiency analysis looks at your defenses instead of at weaknesses in systems. It compares the controls that should exist, as required by policy, regulation or the risk assessment, with the controls that actually exist and work. A deficiency can be one of design (the control, even if it runs perfectly, would not meet the objective) or one of operation (the control is well designed but is not performed consistently). Audit findings, control testing and incident post-mortems are common sources.",
   "Both analyses feed the risk register. Each significant vulnerability or deficiency should be linked to the risks it increases, rated in business terms, and assigned to an owner for treatment. When a weakness cannot be fixed directly, for example a legacy system that cannot be patched, the next step is to analyze the risk and consider compensating controls such as network isolation, stricter access and extra monitoring, and then let the business owner decide.",
   "Remember that absence of evidence is not evidence of absence. A clean scan may mean the scanner could not authenticate or did not reach a segment. Validate coverage before reporting that a weakness does not exist."
  ],
  "terms": [
   [
    "Vulnerability",
    "A weakness in an asset, process or control that a threat could exploit."
   ],
   [
    "Control deficiency",
    "A gap where a required control is missing, poorly designed or not operating effectively."
   ],
   [
    "CVSS",
    "Common Vulnerability Scoring System: a standard way to rate the technical severity of vulnerabilities."
   ],
   [
    "Compensating control",
    "An alternative control that meets the intent of a required control that cannot be implemented."
   ]
  ],
  "example": "An audit finds that quarterly access reviews for the finance system are documented but reviewers approve every account without checking. The control is well designed but not operating effectively. The manager rates the deficiency, assigns the finance director as owner, and adds spot checks of reviewer decisions.",
  "tip": "Technical severity is not business risk. When a question gives a tester's 'critical' rating, the best answer adds business context such as asset value and exploitability.",
  "check": [
   [
    "What is the difference between a design deficiency and an operating deficiency?",
    "A design deficiency means the control would not meet its objective even if performed perfectly; an operating deficiency means a well-designed control is not performed consistently."
   ],
   [
    "What should happen when a vulnerability cannot be fixed?",
    "Analyze the resulting risk, evaluate compensating controls, and present options to the business owner."
   ]
  ]
 },
 {
  "t": "Risk assessment methods: qualitative, quantitative and semi-quantitative",
  "body": [
   "Risk assessment identifies risks, analyzes their likelihood and impact, and evaluates them against the organization's criteria so they can be prioritized. The purpose is to choose and fund controls in proportion to risk. There are three broad ways to analyze risk, and the CISM exam expects you to know when each fits.",
   "Qualitative analysis uses descriptive scales such as low, medium and high for likelihood and impact, often combined in a heat map. It is quick, easy to explain and useful when reliable numbers are not available. Its weakness is subjectivity: two people may rate the same risk differently, and 'high' does not tell an executive how much money is at stake.",
   "Quantitative analysis uses numbers. The classic formulas are single loss expectancy (SLE) = asset value (AV) x exposure factor (EF), and annualized loss expectancy (ALE) = SLE x annualized rate of occurrence (ARO). An asset worth $500,000 with a 40% exposure factor has an SLE of $200,000; if the event happens once every 20 years, ARO is 0.05 and ALE is $10,000. A control is financially justified when the reduction in ALE is greater than its annual cost. More advanced methods, such as Factor Analysis of Information Risk (FAIR) and Monte Carlo simulation, work with ranges instead of single values.",
   "Semi-quantitative analysis sits between them. It assigns numbers to qualitative categories, for example likelihood and impact each scored from 1 to 5, and multiplies or adds them to rank risks. It is common in risk registers because it is consistent and sortable. Remember that the numbers are ordinal: a score of 20 is not 'twice as risky' as 10 in dollar terms.",
   "Whatever the method, a good assessment defines its scope, identifies assets and their value, threats, vulnerabilities and existing controls, estimates likelihood and impact, and records the results with owners. It is repeated periodically and whenever significant change occurs. Choose quantitative analysis when you need cost-benefit decisions and have credible data; choose qualitative when you need fast prioritization or data is scarce."
  ],
  "terms": [
   [
    "Single loss expectancy (SLE)",
    "Expected loss from one occurrence: asset value multiplied by exposure factor."
   ],
   [
    "Annualized rate of occurrence (ARO)",
    "How many times per year an event is expected; once every 20 years is 0.05."
   ],
   [
    "Annualized loss expectancy (ALE)",
    "Expected yearly loss: SLE multiplied by ARO."
   ],
   [
    "Semi-quantitative analysis",
    "Assigning numeric scores to qualitative categories so risks can be ranked consistently."
   ]
  ],
  "example": "A retailer estimates that a point-of-sale outage costs $80,000 per occurrence and happens about twice a year, giving an ALE of $160,000. A redundant network link costing $30,000 a year would cut the ARO to 0.5, lowering ALE to $40,000, so the control saves $120,000 in expected loss for $30,000.",
  "tip": "Practice the arithmetic: SLE = AV x EF, ALE = SLE x ARO, and an event every N years has ARO = 1/N. Distractors often use the SLE as the answer or multiply by N instead of dividing.",
  "check": [
   [
    "An asset worth $100,000 has an EF of 30% and an ARO of 0.5. What is the ALE?",
    "SLE = 30,000; ALE = 30,000 x 0.5 = $15,000."
   ],
   [
    "When is qualitative analysis the better choice?",
    "When reliable data on losses and frequency is not available or a quick prioritization is needed."
   ]
  ]
 },
 {
  "t": "Risk scenarios, likelihood and impact",
  "body": [
   "A risk scenario is a short, realistic description of how a loss could happen. It connects the pieces of risk into a story that business managers can understand: a threat (who or what), acting through a vulnerability (how), against an asset (what is affected), with a business consequence (why it matters). 'A criminal group phishes a finance employee, uses the stolen credentials to change a supplier's bank details, and diverts a $250,000 payment' is a scenario. 'Phishing' by itself is not.",
   "Scenarios can be built top-down, starting from business objectives and asking what events would threaten them, or bottom-up, starting from known threats and vulnerabilities and asking what they could affect. Using both catches more. Good scenarios are specific enough to estimate and treat, but not so narrow that you need thousands of them. Many organizations maintain a library of 20 to 50 scenarios that cover their main exposures.",
   "Likelihood is the chance the scenario occurs in a given period. It depends on threat motivation and capability, how exposed the vulnerability is, and how effective existing controls are. Impact is the consequence if it occurs: financial loss, operational disruption, legal and regulatory penalties, reputational damage and harm to people. Impact should be expressed in business terms and often has several dimensions, so organizations use impact tables that define what 'minor', 'moderate' and 'severe' mean for each.",
   "It is useful to distinguish inherent risk, the level before considering controls, from residual risk, after existing controls. The difference shows how much the organization depends on its controls, which helps decide what to test and monitor. If a control fails, risk moves back toward the inherent level.",
   "Scenarios make risk discussions productive. Instead of arguing about whether 'cloud risk' is high, managers can discuss one clear event, its causes and consequences, and the options to reduce it."
  ],
  "terms": [
   [
    "Risk scenario",
    "A description of a plausible event in which a threat exploits a vulnerability in an asset and causes a business impact."
   ],
   [
    "Likelihood",
    "The probability or frequency that a scenario will occur within a defined period."
   ],
   [
    "Impact",
    "The consequence of the scenario for the organization, expressed in financial, operational, legal, reputational or safety terms."
   ],
   [
    "Inherent risk",
    "The level of risk before controls are considered."
   ]
  ],
  "example": "A manufacturer writes the scenario: 'Ransomware enters through a contractor's remote access, encrypts production scheduling servers, and halts two plants for five days, costing $3 million in lost output.' Managers can then evaluate remote access controls, backups and recovery time directly against that story.",
  "tip": "A complete scenario has a threat, a vulnerability, an asset and a business consequence. Options that mention only a tool or only a date are incomplete.",
  "check": [
   [
    "What four elements should a risk scenario include?",
    "A threat, the vulnerability it exploits, the affected asset and the business consequence."
   ],
   [
    "What is the difference between inherent and residual risk?",
    "Inherent risk ignores controls; residual risk is what remains after existing controls are applied."
   ]
  ]
 },
 {
  "t": "Risk treatment options: mitigate, transfer, avoid, accept",
  "body": [
   "Once a risk has been assessed and compared with appetite, the owner chooses how to respond. There are four classic options, and CISM expects you to recognize them from scenarios.",
   "Mitigation (also called reduction or modification) applies controls that lower likelihood, impact or both. Examples include multifactor authentication to reduce account takeover, backups to reduce the impact of ransomware, or segmentation to limit spread. Mitigation is the most common response, and the goal is to bring residual risk within appetite at a reasonable cost, not to reach zero.",
   "Transfer (or sharing) moves some of the financial impact to another party, usually through insurance or contracts. Cyber insurance can pay for forensic work, legal costs and some losses. Outsourcing can shift some operational burden to a provider. But transfer never moves accountability: the organization still owns its data, still answers to regulators and customers, and still suffers reputational damage. Insurers also usually require baseline controls.",
   "Avoidance means stopping or not starting the activity that creates the risk: not entering a market, not collecting a type of data, retiring a risky system. It removes the risk entirely but also the benefit of the activity, so it is chosen when the risk clearly outweighs the value. Acceptance means consciously deciding to bear the risk, typically because it is within appetite or because treatment costs more than the expected loss. Acceptance must be an informed, documented decision by someone with authority, with a review date. Ignoring a risk is not acceptance.",
   "Treatment choices are usually combined. A company may mitigate ransomware with backups and endpoint detection, transfer part of the residual financial impact through insurance, and accept what remains. After treatment, residual risk is compared with appetite again; if it is still too high, the owner must choose more treatment or escalate for formal acceptance at a higher level."
  ],
  "terms": [
   [
    "Risk mitigation",
    "Applying controls to reduce the likelihood or impact of a risk."
   ],
   [
    "Risk transfer",
    "Shifting some financial consequences to a third party, such as an insurer, without transferring accountability."
   ],
   [
    "Risk avoidance",
    "Eliminating a risk by not performing the activity that causes it."
   ],
   [
    "Risk acceptance",
    "An informed, documented decision by an authorized owner to bear a risk."
   ]
  ],
  "example": "A clinic stores old patient images on a server that cannot be secured affordably. The owner decides to delete images beyond the legal retention period (avoidance), encrypt and restrict the rest (mitigation), buy a cyber policy (transfer) and formally accept the small remaining risk, with a review in twelve months.",
  "tip": "Insurance transfers financial impact, not accountability or legal responsibility. And the security manager never accepts risk on the owner's behalf.",
  "check": [
   [
    "A business owner declines a control because it costs more than the expected loss. Which response is this?",
    "Risk acceptance, which must be documented and approved by someone with the authority."
   ],
   [
    "Does buying cyber insurance reduce the likelihood of a breach?",
    "No. It affects financial impact after an event, not the probability of the event."
   ]
  ]
 },
 {
  "t": "Risk and control ownership",
  "body": [
   "Every risk needs an owner, and every control needs an owner, but they are usually not the same person. Getting ownership right is one of the most tested ideas in CISM because it decides who makes which decisions.",
   "A risk owner is the person accountable for managing a particular risk. That is normally the business manager responsible for the process or asset affected, because they have the authority to accept trade-offs and fund treatment. The owner decides the response, approves treatment plans, accepts residual risk within their authority and escalates when risk exceeds it. The information security manager identifies risks, analyzes them and advises, but does not become the owner simply by finding a risk.",
   "A control owner is responsible for making a specific control work: designing it, operating it, maintaining it and providing evidence that it is effective. Control owners are often in IT, security or operations. For example, the head of online sales owns the risk of fraudulent orders; the fraud analytics team owns the transaction-monitoring control; the IT team owns the web application firewall.",
   "Clear ownership prevents two failures. Without a risk owner, no one feels authorized to accept or fund treatment and risks drift. Without control owners, controls decay because no one is checking that they still run. The risk register should name both, and control owners should report control health to risk owners so decisions rest on accurate information.",
   "Ownership should sit at the right level. A risk that could cost millions or threaten regulatory standing needs an owner with matching authority; a junior manager cannot accept it. Many organizations define acceptance limits: for example, managers can accept risks rated low, directors medium, and only executives high. When residual risk is above an owner's limit, escalation is required."
  ],
  "terms": [
   [
    "Risk owner",
    "The person accountable for a risk, with authority to decide its treatment and accept residual risk."
   ],
   [
    "Control owner",
    "The person responsible for designing, operating and evidencing a specific control."
   ],
   [
    "Acceptance authority",
    "The defined level of management permitted to accept risks of a given rating."
   ]
  ],
  "example": "A payroll process risk is rated high. The payroll manager, the risk owner, can accept only medium risks, so she escalates to the CFO. The IT access team, as control owner for payroll system access reviews, reports that reviews are 95% complete, which the CFO uses to decide on extra treatment.",
  "tip": "Identifying a risk does not make security its owner. Look for the business manager accountable for the affected process, and remember that control owners and risk owners have different jobs.",
  "check": [
   [
    "Who should own a risk affecting the online ordering process?",
    "The business manager accountable for that process."
   ],
   [
    "What does a control owner do?",
    "Designs, operates and maintains a specific control and provides evidence that it works."
   ]
  ]
 },
 {
  "t": "Risk registers, key risk indicators and risk monitoring",
  "body": [
   "A risk register is the central record of an organization's identified risks. Each entry typically includes a unique ID, the risk scenario, the risk owner, inherent likelihood and impact, existing controls, residual rating, the chosen response, treatment actions with owners and due dates, status and the next review date. It lets the organization see its exposure in one place, track treatment and report consistently.",
   "A register is a living tool. Risks change as the business, threats and controls change, so entries need regular review, and new risks must be added when projects, vendors or incidents reveal them. Many organizations review high risks monthly and the rest quarterly. A register that is filled in once for an audit and then ignored gives false comfort.",
   "Key risk indicators (KRIs) are metrics that signal changes in risk exposure, ideally before a loss happens. Good KRIs are linked to specific risks, measurable, available regularly and have thresholds that trigger action. Examples include the percentage of critical systems with overdue patches, the number of privileged accounts without recent review, failed backup jobs for critical data, or the number of vendors with expired assessments. When a KRI crosses its threshold, the risk owner is alerted and the risk is reassessed.",
   "KRIs differ from key performance indicators (KPIs). A KPI measures how well a process is performing against its target, such as the percentage of incidents closed within SLA. A KRI tells you risk is rising. The same data can sometimes serve both, but ask which question the metric answers.",
   "Risk monitoring combines the register, KRIs, control testing results, audit findings, incident data and threat intelligence to keep leadership's view accurate. The outcome is timely decisions: tightening controls when KRIs worsen, closing treatment actions that are done, and revisiting acceptance decisions when their review dates arrive."
  ],
  "terms": [
   [
    "Risk register",
    "A maintained record of identified risks with owners, ratings, responses and status."
   ],
   [
    "Key risk indicator (KRI)",
    "A metric with thresholds that signals increasing risk exposure."
   ],
   [
    "Key performance indicator (KPI)",
    "A metric showing how well a process or control performs against its target."
   ],
   [
    "Threshold",
    "The KRI value at which a predefined action or escalation is triggered."
   ]
  ],
  "example": "A university sets a KRI for 'privileged accounts not reviewed in 90 days' with an amber threshold of 5 and a red threshold of 15. After a system migration the count jumps to 22, the CIO as risk owner is alerted automatically, and a review is completed within two weeks.",
  "tip": "KRIs look forward and signal rising exposure; KPIs measure performance. Counts of tools, staff certifications or rules are rarely good KRIs.",
  "check": [
   [
    "What is the primary purpose of a risk register?",
    "To record identified risks with owners, ratings, responses and status in one place for monitoring and reporting."
   ],
   [
    "Give an example of a KRI.",
    "The percentage of critical systems missing patches beyond the policy deadline."
   ]
  ]
 },
 {
  "t": "Reporting risk to senior management and the board",
  "body": [
   "Risk information is only useful if it reaches the people who can act on it, in a form they can use. Boards and executives have limited time and are not security specialists, so the information security manager must translate technical findings into business language and focus on what needs attention or decision.",
   "An effective board-level risk report is short. It shows the top risks in business terms, the trend for each since the last report, whether exposure is within appetite, the status of major treatment programs and any decisions needed. A one-page dashboard with a heat map, trend arrows and a few KRIs often works better than a long document. Detailed vulnerability lists, tool architectures or the full risk register are appropriate for operational teams, not the board.",
   "Frame each risk by its effect on objectives: 'A prolonged outage of the order platform could halt online revenue of about $200,000 per day; current recovery capability is three days against a two-day tolerance.' That tells directors why it matters and what gap exists. Where uncertainty is large, say so honestly and give a range.",
   "Reporting should also be regular and predictable, with defined escalation for urgent issues. Significant new risks, KRIs crossing red thresholds or incidents with material impact should not wait for the next quarterly meeting. The escalation criteria should be agreed in advance so no one debates whether something is serious enough during a crisis.",
   "Finally, reporting is two-way. Board questions reveal what leadership cares about and whether appetite needs adjustment. Record board decisions, such as formal acceptance of a risk or approval of extra funding, and feed them back into the register and strategy."
  ],
  "terms": [
   [
    "Risk dashboard",
    "A concise visual summary of top risks, trends, appetite status and key indicators."
   ],
   [
    "Escalation criteria",
    "Predefined conditions that require a risk or event to be reported to a higher level immediately."
   ],
   [
    "Material risk",
    "A risk significant enough to affect the organization's objectives, finances or reputation in a way leadership must know about."
   ]
  ],
  "example": "Each quarter a CISO gives the audit and risk committee a single page: five top risks with trend arrows, two KRIs in red, a note that third-party risk now exceeds appetite, and one decision request for funding a vendor monitoring service. Detailed metrics go in an appendix.",
  "tip": "For the board, choose answers about top risks in business terms, trends and appetite. Technical detail and complete lists belong elsewhere.",
  "check": [
   [
    "What should a board risk report emphasize?",
    "Top risks in business terms, trends, position against appetite and decisions needed."
   ],
   [
    "Why agree escalation criteria in advance?",
    "So urgent risks reach leadership immediately without debate about whether they are serious enough."
   ]
  ]
 },
 {
  "t": "Program resources: people, processes, tools and technology",
  "body": [
   "An information security program is the organized set of activities, resources and controls that carries out the security strategy. It turns intentions into daily work: policies are maintained, access is reviewed, vulnerabilities are fixed, staff are trained and incidents are handled. Building it means deciding what resources are needed and where they come from.",
   "People come first. A program needs leadership (the CISO or manager), specialists such as security architects, analysts, engineers and GRC (governance, risk and compliance) staff, and security responsibilities spread across IT, human resources, legal and business units. The key question is not headcount but skills: does the organization have the capabilities the strategy requires? Gaps can be closed by hiring, training existing staff, or buying services such as managed detection and response, penetration testing or virtual CISO support.",
   "Processes are the repeatable ways work gets done: risk assessment, change management, access management, vulnerability management, incident response, vendor management, awareness and reporting. Well-defined processes make results consistent even when people change, and they are what maturity models measure.",
   "Tools and technology support people and processes. They include identity and access management, endpoint protection, logging and SIEM, email security, data protection and GRC platforms. Technology should be chosen to meet control objectives from the strategy, integrated with existing systems and supported by people who can run it. A powerful tool that no one has time to tune gives little protection.",
   "Outsourcing and cloud services are part of resource planning. They can provide scale and expertise, but the organization keeps accountability for the risk, so outsourced functions need clear contracts, service levels and oversight. Budget, staff capacity and the organization's culture all limit what can be done at once, which is why the strategy's roadmap sequences initiatives realistically."
  ],
  "terms": [
   [
    "Information security program",
    "The organized activities, resources and controls that implement the security strategy."
   ],
   [
    "GRC",
    "Governance, risk and compliance: the functions that manage policy, risk and regulatory obligations."
   ],
   [
    "Managed security service",
    "An outsourced security function, such as monitoring or detection, run by a provider under contract."
   ]
  ],
  "example": "A 400-person firm lacks round-the-clock monitoring skills. Instead of hiring five analysts, the security manager contracts a managed detection and response provider, assigns one internal engineer to manage the provider and tune alerts, and defines monthly service reviews.",
  "tip": "Resource questions turn on skills that match the strategy, not on raw headcount or a single certification. Outsourcing can provide skills but never transfers accountability.",
  "check": [
   [
    "What are the four main categories of program resources?",
    "People, processes, tools and technology (plus the budget that funds them)."
   ],
   [
    "What stays with the organization when a security function is outsourced?",
    "Accountability for the risk and for overseeing the provider."
   ]
  ]
 },
 {
  "t": "Information asset identification, valuation and classification",
  "body": [
   "You cannot protect what you do not know you have. Asset identification builds an inventory of information assets, such as databases, file shares, applications, documents and the systems and services that hold them, together with each asset's owner, location and purpose. The inventory is the foundation for classification, risk assessment and incident response.",
   "Valuation estimates how important each asset is. Value can be measured by the cost to replace it, the revenue it supports, legal obligations attached to it, and the harm that would follow if it were disclosed, altered or unavailable. For information, the most useful measure is usually business impact on confidentiality, integrity and availability. A business impact analysis contributes availability values; legal and privacy teams contribute confidentiality requirements.",
   "Classification groups assets into levels so they can be protected consistently. A typical scheme has three to five levels, such as public, internal, confidential and restricted. Each level has handling rules for storage, transmission, sharing, retention and disposal. The information security manager designs the scheme with the business; data owners assign each asset's level. Classifying by business impact, not by who created the data or how many people use it, keeps protection proportionate.",
   "Keep the scheme simple. Too many levels confuse users and lead to over- or under-classification. Labels should be visible where practical, for example in document headers or metadata, so tools such as data loss prevention (DLP) and people can apply the right handling. Classification must also be reviewed, because value changes: a product plan is highly sensitive before launch and public afterward.",
   "The order matters on the exam: inventory with owners first, then classification by owners using the scheme, then handling controls such as encryption and DLP. Buying a DLP tool before assets are identified and classified puts the tool ahead of the program."
  ],
  "terms": [
   [
    "Asset inventory",
    "A maintained list of information assets with owners, locations and purposes."
   ],
   [
    "Classification scheme",
    "A defined set of sensitivity levels with handling rules for each."
   ],
   [
    "Handling requirements",
    "Rules for storing, transmitting, sharing, retaining and disposing of information at each classification level."
   ],
   [
    "Data loss prevention (DLP)",
    "Tools that detect and block unauthorized movement of sensitive data, usually relying on classification labels or content rules."
   ]
  ],
  "example": "A law firm inventories its document management system, email archive and billing database, names a partner as owner of each, and applies a four-level scheme. Client matter files become 'restricted', which requires encryption, need-to-know access and secure shredding, while the firm's published articles are 'public'.",
  "tip": "Classification is based on business impact of loss of confidentiality, integrity or availability, and the data owner assigns it. The inventory comes first.",
  "check": [
   [
    "What should be completed first when building a classification program?",
    "An inventory of information assets with identified owners."
   ],
   [
    "Who assigns a classification level to an asset?",
    "The asset's data owner, using the scheme designed with the security manager."
   ]
  ]
 },
 {
  "t": "Industry standards and control frameworks for building the program",
  "body": [
   "A control framework is a structured catalog of controls, organized by topic, that an organization can select from and tailor. Using one avoids reinventing controls, provides a common language for auditors and partners, and makes it easier to show regulators that the program is reasonable. CISM expects you to know the major options and how to use them, not to memorize control numbers.",
   "ISO/IEC 27002 provides controls grouped into organizational, people, physical and technological themes, with guidance for each. It supports ISO/IEC 27001, whose Annex A lists the same controls; organizations choose which apply and record the choice in a statement of applicability. NIST SP 800-53 is a large, detailed catalog used heavily by US federal agencies and their suppliers, with baselines for low, moderate and high impact systems. The CIS Critical Security Controls are a shorter, prioritized list of technical safeguards grouped into implementation groups by organization size and maturity.",
   "Sector and topic standards add to these. PCI DSS applies to payment card data; the NIST Privacy Framework and privacy laws shape privacy controls; cloud-specific frameworks such as the Cloud Security Alliance Cloud Controls Matrix map cloud responsibilities. Many organizations must satisfy several at once.",
   "The key practice is tailoring. The risk assessment determines which controls are needed and how strong they must be. A framework is a menu, not a mandate to implement every item. Controls that do not apply are excluded with a documented reason; extra controls are added where the organization's risks demand them.",
   "Control mapping links one internal control to the requirements of several frameworks, for example one access review process satisfying ISO/IEC 27001, SOC 2 and a regulator's rule. This 'test once, comply many' approach reduces duplicated effort. Remember that no framework guarantees security and adopting one never transfers liability; it gives structure to a risk-based program."
  ],
  "terms": [
   [
    "Control framework",
    "A structured catalog of controls that organizations select and tailor to their risks."
   ],
   [
    "Tailoring",
    "Adjusting a framework's controls to an organization's specific risks, excluding or adding controls with documented reasons."
   ],
   [
    "Control mapping",
    "Linking internal controls to requirements in multiple frameworks so one control satisfies several obligations."
   ],
   [
    "CIS Critical Security Controls",
    "A prioritized set of technical safeguards grouped into implementation groups."
   ]
  ],
  "example": "A fintech startup must meet PCI DSS, pass SOC 2 audits and answer customer questionnaires based on ISO/IEC 27001. The security manager builds one internal control set, maps each control to all three, and schedules testing so each control is tested once with evidence reused across audits.",
  "tip": "Frameworks are chosen and tailored based on risk assessment; they never replace it and never guarantee that breaches will not occur.",
  "check": [
   [
    "Why adopt a recognized control framework?",
    "To use a proven structured set of controls and common language, tailored to the organization's risks."
   ],
   [
    "What is control mapping used for?",
    "To show one internal control satisfies requirements in several frameworks, reducing duplicated effort."
   ]
  ]
 },
 {
  "t": "Enterprise architecture and information security architecture",
  "body": [
   "Enterprise architecture (EA) describes how an organization's business processes, information, applications and technology fit together, both today and in a planned future state. It is a planning discipline that helps leaders make consistent technology decisions that support strategy. ISACA's 2026 update to the CISM outline adds enterprise architecture and information security architecture as content areas, reflecting the expectation that security managers understand the technology they are responsible for.",
   "EA is usually described in layers: business architecture (capabilities and processes), data or information architecture (what information exists and how it flows), application architecture (systems and how they interact) and technology architecture (infrastructure, networks and platforms). Frameworks such as TOGAF provide methods for developing EA; the Sherwood Applied Business Security Architecture (SABSA) framework is a well-known method for deriving security architecture from business requirements.",
   "Information security architecture is the part of EA that describes how security controls and services are structured across those layers: identity and access services, network segmentation, encryption and key management, logging and monitoring, and secure application patterns. Its purpose is consistency. Instead of each project inventing its own security, the architecture offers approved patterns and shared services that meet the organization's control objectives.",
   "Several principles guide modern security architecture. Defense in depth layers different controls so one failure does not expose everything. Least privilege limits access to what is needed. Secure by default and secure by design build protection in from the start. Zero trust removes implicit trust based on network location and verifies identity, device and context on every access request. Segmentation limits how far an attacker can move.",
   "For the manager, architecture is a governance tool. Security review in the architecture process lets you influence designs early, when changes are cheap, and to check that new projects use approved patterns. It also exposes technical debt and shadow IT, which feed the risk register."
  ],
  "terms": [
   [
    "Enterprise architecture",
    "A description of how business processes, information, applications and technology fit together, now and in a target state."
   ],
   [
    "Security architecture",
    "The structure of security controls and services across the enterprise architecture layers."
   ],
   [
    "Zero trust",
    "An approach that grants no implicit trust based on network location and verifies every access request."
   ],
   [
    "Defense in depth",
    "Layering multiple independent controls so that the failure of one does not expose the asset."
   ]
  ],
  "example": "A retailer's architecture board requires every new application to use the central identity provider for sign-on, send logs to the SIEM and store secrets in the approved vault. A team proposing its own login system is redirected to the standard pattern before development begins, avoiding a costly redesign later.",
  "tip": "Architecture questions reward answers that build security into design consistently and early. Zero trust means verify every request regardless of network location.",
  "check": [
   [
    "What is the main security benefit of enterprise architecture?",
    "It builds security consistently into how business processes, data, applications and technology fit together, instead of adding it piece by piece."
   ],
   [
    "Which model verifies users and devices on every request regardless of network location?",
    "Zero trust."
   ]
  ]
 },
 {
  "t": "Information security policies, standards, procedures and guidelines",
  "body": [
   "Governance documents form a hierarchy, and the exam often asks which document a statement belongs in. At the top is the policy: a short, high-level statement of management intent and direction, such as 'information must be protected according to its classification'. Policies are mandatory, approved by senior management or the board, and change rarely because they do not name technologies.",
   "Standards make policies concrete. They are mandatory and specific: 'confidential data at rest must be encrypted with AES-256', 'passwords must be at least 14 characters', 'servers must meet the approved baseline'. Standards change more often as technology changes. A baseline is a kind of standard that defines the minimum security configuration for a particular platform.",
   "Procedures are step-by-step instructions for performing a task consistently, such as how to create a user account or how to respond to a lost laptop. They are written for the people who do the work and are mandatory in the sense that the task must be done that way. Guidelines are recommendations: helpful, optional advice such as tips for choosing a strong passphrase. Because they are optional, a requirement never belongs in a guideline.",
   "Good policy management includes clear ownership, a defined approval path, communication to affected staff, acknowledgment where needed, an exception process and review at planned intervals (commonly yearly) and after significant change. Exceptions should be requested formally, risk-assessed, approved by the right authority, time-limited and tracked.",
   "Policies must be enforceable and fit the organization. The information security manager drafts and maintains them, working with legal, human resources and business units, but senior management approval gives them authority. If people keep bypassing a standard, the manager should find out why and redesign it to meet the objective with less friction rather than simply adding enforcement."
  ],
  "terms": [
   [
    "Policy",
    "A high-level, mandatory statement of management intent, approved by senior management."
   ],
   [
    "Standard",
    "A mandatory, specific requirement that supports a policy, such as a required algorithm or setting."
   ],
   [
    "Procedure",
    "Step-by-step instructions for performing a task consistently."
   ],
   [
    "Guideline",
    "Optional, recommended practice that supports policies and standards."
   ]
  ],
  "example": "A remote access policy says access must be secure and authorized. The supporting standard requires VPN with MFA and managed devices. A procedure explains how the help desk enrolls a new laptop in MFA. A guideline suggests employees avoid public Wi-Fi when possible.",
  "tip": "Specific mandatory settings go in standards, not policies. Guidelines are never mandatory. Policies need senior management approval.",
  "check": [
   [
    "Where would 'encrypt confidential data with AES-256' be written?",
    "In a standard."
   ],
   [
    "Who approves the information security policy?",
    "Senior management or the board."
   ]
  ]
 },
 {
  "t": "Information security program metrics: KPIs, KRIs and maturity",
  "body": [
   "Metrics tell you and your stakeholders whether the security program is working. Without them, the program cannot show value, justify budget or spot problems early. The challenge is choosing measures that answer real questions for each audience.",
   "It helps to think in three layers. Operational metrics serve the security team: patch latency, alert volumes, mean time to respond, scan coverage. Management metrics serve IT and business managers: control effectiveness, compliance with standards, progress on the roadmap. Strategic metrics serve executives and the board: risk trends for critical business processes, position against appetite, and whether security is supporting business goals. Sending operational counts to the board wastes their time.",
   "Key performance indicators (KPIs) show whether processes and controls perform to target, such as '95% of critical patches applied within 14 days'. Key risk indicators (KRIs) signal rising exposure, such as 'critical systems with overdue patches'. Key goal indicators, used in some frameworks, show whether a goal has been achieved. Good metrics are specific, measurable, attainable, relevant and timely (SMART), have a target or threshold, and are collected consistently so trends are meaningful.",
   "Maturity models measure how well processes are defined and managed over time. Capability or maturity levels typically run from initial or ad hoc, through repeatable and defined, to managed and optimized. Assessing against a model such as the CMMI-style scales used in COBIT, or NIST CSF implementation tiers, gives a baseline and lets you show improvement. Maturity is not the same as effectiveness: a well-documented process can still fail, so combine maturity with outcome metrics.",
   "Beware of vanity metrics, which look impressive but support no decision, like the number of blocked spam emails. Before adopting a metric, ask who will use it, what decision it supports and what action a bad value would trigger."
  ],
  "terms": [
   [
    "KPI",
    "Key performance indicator: a measure of how well a process or control performs against a target."
   ],
   [
    "KRI",
    "Key risk indicator: a measure that signals increasing risk exposure."
   ],
   [
    "Maturity model",
    "A scale describing how well processes are defined, managed and improved, from ad hoc to optimized."
   ],
   [
    "Vanity metric",
    "A measure that looks impressive but does not support a decision."
   ]
  ],
  "example": "A CISO replaces a board slide showing '2 million attacks blocked' with three measures: the trend in residual risk for the top five business processes, the percentage of critical vendors assessed this year, and time to contain serious incidents compared with target.",
  "tip": "For senior management, pick metrics that tie to business risk and appetite. Activity counts such as blocked spam or rule changes are operational, not strategic.",
  "check": [
   [
    "What is the difference between a KPI and a KRI?",
    "A KPI measures performance against target; a KRI signals changing risk exposure."
   ],
   [
    "How can an organization show that its security processes are improving over time?",
    "Assess them against a maturity model and track the levels over time, combined with outcome metrics."
   ]
  ]
 },
 {
  "t": "Control design and selection: types, categories and control objectives",
  "body": [
   "A control is any measure that modifies risk: a policy, process, device, practice or other action. A control objective is the statement of what the control must achieve, such as 'only authorized users can access payroll data'. Controls are selected to meet control objectives, which in turn come from the risk assessment. Starting with objectives keeps you from picking controls because they are familiar or cheap.",
   "Controls are described in two ways. By category (how they are implemented): administrative or managerial controls such as policies, training and background checks; technical or logical controls such as encryption, access control lists and MFA; and physical controls such as locks, badges and cameras. By function (what they do): preventive controls stop an event; detective controls find it during or after; corrective controls limit damage and fix the problem; deterrent controls discourage attempts; recovery controls restore operations; and directive controls tell people what to do.",
   "Compensating controls are alternatives used when the preferred control cannot be implemented, such as a jump host with MFA and session recording for a legacy system that cannot support MFA itself. A compensating control must meet the intent of the original requirement and be documented and approved.",
   "Good control design considers several factors: effectiveness against the risk, cost compared with the risk reduction, impact on business operations and users, how well it integrates with existing controls, whether it can be monitored and tested, and whether it creates a single point of failure. Layering preventive, detective and corrective controls gives defense in depth, so the failure of one does not leave the asset exposed.",
   "Automated controls are usually more consistent than manual ones but need monitoring to confirm they keep running. Manual controls rely on people and need clear procedures, training and review."
  ],
  "terms": [
   [
    "Control objective",
    "A statement of the result a control must achieve, derived from risk."
   ],
   [
    "Preventive control",
    "A control that stops an unwanted event from happening."
   ],
   [
    "Detective control",
    "A control that identifies an event during or after it occurs."
   ],
   [
    "Corrective control",
    "A control that limits damage and restores the affected system or process after an event."
   ]
  ],
  "example": "To meet the objective 'prevent unauthorized payments', a company uses dual approval in the payment system (preventive, technical), a weekly exception report reviewed by finance (detective, administrative) and a documented procedure to recall fraudulent transfers with the bank (corrective).",
  "tip": "Classify a control by what it does: finding a change after it happens is detective; an alternative when the preferred control is impossible is compensating. Selection starts from risk-based control objectives.",
  "check": [
   [
    "What should drive control selection for a new application?",
    "The risk assessment and the control objectives derived from it."
   ],
   [
    "Give an example of a compensating control.",
    "A jump host that enforces MFA and records sessions for a legacy system that cannot support MFA directly."
   ]
  ]
 },
 {
  "t": "Control implementation, integration and change management",
  "body": [
   "A well-designed control only reduces risk once it is implemented, integrated with the environment and kept running. This topic covers how the program moves controls from design to production without disrupting the business.",
   "Implementation is a project in its own right: defined scope, owner, plan, testing, training and a rollback option. Many controls need changes to business processes as well as technology. A new access request workflow, for instance, affects managers who approve access and the help desk that provisions it. Involve those groups early, communicate the reason for the change, and pilot before a wide rollout.",
   "All changes to production, including new security controls, should go through change management. That process records the change, assesses its risk and impact, requires testing and approval, schedules it to limit disruption, and records the result. Bypassing change management to move faster is a common mistake; an untested firewall rule or endpoint agent can cause outages as damaging as an attack, and uncontrolled changes weaken the control environment auditors rely on.",
   "Integration means controls work together and with operations. Logs from new controls should feed the SIEM, alerts should reach the right team, identity controls should connect to the central directory, and ownership for operating and maintaining the control must be assigned. A control without an operator decays quickly.",
   "Security should also be built into the system development life cycle (SDLC) and into procurement. Defining security requirements early, reviewing designs, testing before release and including security in purchasing decisions are much cheaper than fixing problems after deployment. Configuration management keeps systems aligned with approved baselines, and any drift is detected and corrected."
  ],
  "terms": [
   [
    "Change management",
    "The process that records, assesses, tests, approves and schedules changes to production."
   ],
   [
    "Configuration management",
    "Maintaining systems in known, approved configurations and detecting drift from baselines."
   ],
   [
    "Secure SDLC",
    "Integrating security activities into each phase of system development, from requirements to retirement."
   ]
  ],
  "example": "The security team wants to enforce stricter email filtering. They submit a change request, test the new rules on a pilot group for two weeks, find that a partner's invoices are being blocked, adjust the rule, get change board approval and roll out on a weekend with a rollback plan.",
  "tip": "Even urgent security changes go through change management, using the emergency change path if needed. Integrating security early in the SDLC is cheaper and more effective than retrofitting.",
  "check": [
   [
    "What must happen before a new security control goes live in production?",
    "It must pass through change management, including testing and approval."
   ],
   [
    "Why integrate security into the SDLC?",
    "Security addressed early is more effective and costs less than fixing it after deployment."
   ]
  ]
 },
 {
  "t": "Control testing and evaluation",
  "body": [
   "Controls must be checked to confirm they work. Testing answers two questions: is the control designed to meet its objective (design effectiveness), and does it actually operate as designed over time (operating effectiveness)? A control can be perfectly designed on paper and never performed, or performed faithfully but unable to address the risk.",
   "Testing methods range in strength. Inquiry, asking the control owner how it works, is the weakest and needs corroboration. Observation, watching the control being performed, is stronger but only shows one moment. Inspection of evidence, such as reviewing signed access reviews or system logs, is stronger still. Reperformance, where the tester independently executes the control and compares results, is the strongest. For operating effectiveness, testers usually sample evidence across a period, such as a quarter.",
   "Different parties test controls. Control owners perform self-assessments, which build ownership and catch problems between audits but lack independence. Internal audit provides independent assurance to the board. External auditors and assessors provide third-party assurance, for example ISO/IEC 27001 certification audits or SOC 2 reports. Technical testing, such as vulnerability scanning, penetration testing and configuration compliance checks, evaluates technical controls. Continuous control monitoring automates some checks so failures are seen quickly.",
   "Results are evaluated and reported. Deficiencies are rated by the risk they create, assigned to owners with remediation dates and tracked to closure. Repeated failures of the same control suggest a design or resourcing problem rather than individual error. Testing results feed the risk register, because a failing control means residual risk is higher than assumed.",
   "The information security manager plans testing based on risk: critical controls protecting high-value assets are tested more often and more rigorously than low-risk ones."
  ],
  "terms": [
   [
    "Design effectiveness",
    "Whether a control, if performed as intended, would meet its objective."
   ],
   [
    "Operating effectiveness",
    "Whether a control actually operates as designed consistently over a period."
   ],
   [
    "Reperformance",
    "A testing method where the tester independently performs the control to confirm its results."
   ],
   [
    "Control self-assessment",
    "A review performed by the people who own and operate controls."
   ]
  ],
  "example": "To test quarterly access reviews, internal audit selects a sample of 25 accounts across the year, checks that each was reviewed by the correct manager, and reperforms the review for five of them. Two removed employees still had access, so the control is rated as not operating effectively.",
  "tip": "Documentation proves design, not operation. Inquiry alone is weak evidence. Self-assessments complement but never replace independent audits.",
  "check": [
   [
    "What best confirms a control is operating effectively?",
    "Testing it against its objective with evidence collected over a period, such as samples."
   ],
   [
    "Why are control self-assessments useful if they are not independent?",
    "They build ownership and let control owners find and fix issues between audits."
   ]
  ]
 },
 {
  "t": "Security awareness and training programs",
  "body": [
   "People are both a common path for attacks and a strong layer of defense. Awareness and training programs aim to change behavior so that employees act securely in their daily work: recognizing phishing, protecting data, following procedures and reporting problems quickly.",
   "It is useful to separate three levels. Awareness reaches everyone and focuses on attention and recognition, through short modules, reminders, posters and simulated phishing. Training builds specific skills for specific roles, such as secure coding for developers, privileged access practices for administrators or fraud recognition for finance staff. Education builds deep understanding over time, such as professional certifications for security staff. Each audience needs the right mix.",
   "A good program is based on risk and on the audience. Use incident data and risk assessments to choose topics; tailor content to roles; keep it short, frequent and practical; and explain why rules exist. New employees should get security onboarding before or when they receive access, and training should repeat at intervals and when policies or threats change. Executives need targeted briefings too, because they are frequent targets and set the tone.",
   "Measure outcomes, not just activity. Completion rates show reach but not change. Better measures include phishing simulation click rates falling and report rates rising, the time between a suspicious email arriving and the first report, the number of policy violations, and incidents caused by user error. Report rate is especially valuable because it turns employees into sensors.",
   "The program should never be used to shift blame. People who click a simulation should get immediate, supportive coaching. A culture where people fear punishment for mistakes will hide incidents, which is worse than the original error."
  ],
  "terms": [
   [
    "Security awareness",
    "Activities that help everyone recognize security issues and know how to respond."
   ],
   [
    "Role-based training",
    "Training tailored to the security responsibilities of specific jobs."
   ],
   [
    "Phishing simulation",
    "A controlled fake phishing campaign used to train staff and measure behavior."
   ],
   [
    "Report rate",
    "The share of recipients who report a suspicious or simulated phishing email."
   ]
  ],
  "example": "After an invoice fraud attempt, a manufacturer adds a short scenario-based module for its finance team, requires phone call-back verification of bank detail changes, and runs quarterly simulations. Over a year, click rates fall from 18% to 5% and report rates rise from 10% to 55%.",
  "tip": "The goal of awareness is behavior change. The best measure combines falling click rates with rising report rates, not completion or quiz scores.",
  "check": [
   [
    "What is the main goal of a security awareness program?",
    "To change behavior so people act securely in their daily work."
   ],
   [
    "Why is phishing report rate a valuable metric?",
    "It shows employees recognizing and reporting threats, which turns them into an early detection layer."
   ]
  ]
 },
 {
  "t": "Managing external services: vendors, cloud providers and fourth parties",
  "body": [
   "Most organizations depend on outside providers for software, cloud infrastructure, payroll, customer support and many other services. Each provider that handles your data or connects to your systems extends your attack surface. Outsourcing transfers work, not accountability: regulators, customers and courts still hold you responsible for your data.",
   "Third-party risk management follows the relationship's life cycle. Before selection, classify the vendor by the data and services involved, then perform due diligence proportionate to that risk: questionnaires, review of certifications and independent reports such as SOC 2 Type II or ISO/IEC 27001 certificates, financial stability and, where justified, on-site assessments. Never test a provider's systems without its written permission.",
   "The contract is the main control. Important clauses include specific security requirements, the right to audit or to receive independent assurance reports, breach notification within a defined time, data location and handling rules, restrictions and flow-down obligations for subcontractors, service level agreements (SLAs), cooperation during incidents, and return or deletion of data at the end. In cloud services, a shared responsibility model divides security duties between provider and customer; the contract and documentation should make that division explicit.",
   "During the relationship, monitor the vendor: review assurance reports annually, track SLA and security metrics, reassess when services or risks change, and watch for incidents. At the end, ensure access is removed and data returned or destroyed with evidence.",
   "Fourth parties are your vendors' vendors, such as the hosting company your SaaS provider uses. You rely on their controls but have no direct contract, so require your vendors to disclose key subcontractors, impose equivalent obligations on them, and notify you of changes. Shadow IT, where business units adopt services without review, bypasses all of this; the first response is to assess the risk of the service and its data, then decide whether to approve, add controls or migrate."
  ],
  "terms": [
   [
    "Third-party risk management",
    "The process of assessing, contracting, monitoring and offboarding vendors according to their risk."
   ],
   [
    "Right to audit",
    "A contract clause allowing the customer to audit, or receive independent assurance on, the provider's controls."
   ],
   [
    "Fourth party",
    "A subcontractor of your vendor that handles your data or services without a direct contract with you."
   ],
   [
    "Shared responsibility model",
    "The division of security duties between a cloud provider and its customer."
   ]
  ],
  "example": "Before signing with a customer support SaaS, a retailer reviews its SOC 2 Type II report, finds that it uses a subcontractor in another country for overnight support, and negotiates clauses requiring 48-hour breach notification, disclosure of subcontractors, equivalent obligations on them and data deletion within 30 days of termination.",
  "tip": "Assess before you sign, write requirements into the contract, and monitor throughout. Never pen-test a provider without permission, and remember accountability stays with you.",
  "check": [
   [
    "What should happen first before contracting a cloud provider?",
    "Assess its security controls against the organization's requirements (due diligence)."
   ],
   [
    "What is fourth-party risk?",
    "Risk from your vendors' subcontractors, who handle your data without a direct contract with you."
   ]
  ]
 },
 {
  "t": "Program communications and reporting to stakeholders",
  "body": [
   "The information security program serves many stakeholders: the board, executives, business unit leaders, IT, audit, regulators, employees, customers and partners. Each needs different information, at a different level of detail and frequency. Communicating well is how the manager builds support, secures resources and keeps the program aligned with the business.",
   "Start by identifying stakeholders and what they need. The board wants a concise view of top risks, trends and decisions needed. Executives want progress on strategic initiatives, risk to their objectives and resource needs. Business managers want to know how security affects their processes and what they must do. IT teams need technical detail, standards and priorities. Auditors and regulators need evidence of controls. Employees need clear, practical guidance.",
   "Tailor the message to the audience. Use business language for business audiences: impact on revenue, operations, customers and compliance, rather than protocol names and CVE numbers. Lead with the key point and any decision required. Use visuals such as dashboards and trend charts where they help. Keep a consistent format so trends are easy to follow from one report to the next.",
   "Reporting should be regular and planned: for example, monthly operational reports, quarterly executive and committee reports, and an annual program review against the strategy. Alongside the schedule, define triggers for immediate escalation, such as significant incidents or risks crossing tolerance.",
   "Communication also flows in. Listening to business leaders reveals new initiatives, pain points and changing priorities that the program must respond to. Building relationships before a crisis makes it much easier to get cooperation during one. A program that only reports when something goes wrong is seen as a cost center; one that shows how it enables the business earns support."
  ],
  "terms": [
   [
    "Stakeholder",
    "Anyone who affects or is affected by the security program, such as the board, managers, staff, auditors or customers."
   ],
   [
    "Communication plan",
    "A plan describing which stakeholders receive what information, how and how often."
   ],
   [
    "Escalation trigger",
    "A predefined condition that requires immediate reporting outside the normal schedule."
   ]
  ],
  "example": "A security manager creates a communication plan: a one-page quarterly board summary, a monthly steering committee pack with roadmap status and risk changes, a weekly technical report for IT, and a short monthly newsletter for staff. Major incidents trigger an executive briefing within two hours.",
  "tip": "Match the message to the audience and link it to business objectives and risk. One detailed technical report for everyone, or reporting only after incidents, is the wrong answer.",
  "check": [
   [
    "What is the best approach when reporting program status to executives?",
    "Tailor the message to them and link progress to business objectives and risk."
   ],
   [
    "Why should communication with business leaders be two-way?",
    "Listening reveals new initiatives and changing priorities the program must support, and builds trust before a crisis."
   ]
  ]
 },
 {
  "t": "Incident response plan and incident management team structure",
  "body": [
   "An incident is an event that threatens the confidentiality, integrity or availability of information or systems, or violates security policy. Incident management is the capability to prepare for, detect, respond to and recover from incidents in a way that limits harm to the business. The incident response plan (IRP) is the document that makes this capability repeatable.",
   "A good IRP defines scope and objectives, what counts as an incident, severity levels, roles and responsibilities, the phases of response, communication and escalation paths, contact lists (internal, legal, regulators, law enforcement, insurers, key vendors), decision authorities and links to related plans such as business continuity and disaster recovery. It is approved by senior management, stored where it can be reached when systems are down, and kept current.",
   "The phases are usually described as preparation, identification (detection and analysis), containment, eradication, recovery and lessons learned. NIST describes a similar cycle and, in its 2025 revision of SP 800-61, aligns incident response with the CSF 2.0 functions. The exact names matter less than the logic: be ready, confirm what is happening, stop it spreading, remove the cause, restore safely and improve.",
   "The incident management team combines technical responders with business functions. A typical structure has an incident manager or commander who coordinates, technical leads for investigation and remediation, and representatives from legal, communications, human resources, privacy, business owners and senior management as needed. Some organizations have a permanent computer security incident response team (CSIRT); others assemble a virtual team when needed, often with support from an external incident response retainer.",
   "Decision authority should be clear in advance. The plan should say who can take a revenue-generating system offline, who approves external communication, and who decides on law enforcement involvement or notification. Deciding these things during a crisis wastes time and invites conflict."
  ],
  "terms": [
   [
    "Incident",
    "An event that compromises or threatens information or systems, or violates security policy, and requires a response."
   ],
   [
    "Incident response plan (IRP)",
    "The approved document defining how the organization prepares for, detects, responds to and recovers from incidents."
   ],
   [
    "CSIRT",
    "Computer security incident response team: the group responsible for handling security incidents."
   ],
   [
    "Incident commander",
    "The person who coordinates the response and makes or routes decisions during an incident."
   ]
  ],
  "example": "A regional bank's IRP names the head of security operations as incident commander, the general counsel as the approver for any external statement, and the COO as the only person who can shut down online banking. During a suspected intrusion, the team follows those lines without debate.",
  "tip": "The main purpose of the IRP is a timely, coordinated response that limits business impact. Incident teams include legal, communications, HR and business owners, not only technical staff.",
  "check": [
   [
    "List the incident response phases in order.",
    "Preparation, identification, containment, eradication, recovery and lessons learned."
   ],
   [
    "Why should decision authority be defined in the plan?",
    "So critical choices, such as shutting down a system or notifying outsiders, are made quickly by the right person without debate during the crisis."
   ]
  ]
 },
 {
  "t": "Business impact analysis: critical processes, RTO, RPO and MTD",
  "body": [
   "A business impact analysis (BIA) identifies the organization's critical business processes, what they depend on and how the impact of disrupting them grows over time. It is the foundation of continuity and recovery planning: you cannot set recovery targets or choose recovery strategies until you know what matters most and how quickly.",
   "The BIA is usually done through interviews and questionnaires with process owners. For each process it records the resources it depends on (people, applications, data, facilities, suppliers), the financial, operational, legal and reputational impact of an outage over intervals such as one hour, one day and one week, and the point at which the impact becomes unacceptable. Senior management should review and approve the results, because they drive spending.",
   "Several time values come out of the BIA. Maximum tolerable downtime (MTD), also called maximum tolerable period of disruption, is the longest a process can be unavailable before the organization suffers unacceptable harm. The recovery time objective (RTO) is the target time to restore the process after disruption, and it must be shorter than the MTD. The recovery point objective (RPO) is the maximum acceptable data loss, measured as time: an RPO of one hour means backups or replication must capture data at least hourly. Some organizations also track work recovery time, the time to verify and catch up after systems return.",
   "These targets drive cost. Short RTOs and RPOs need expensive solutions such as hot sites or real-time replication; longer ones allow cheaper options. The BIA lets management balance the cost of recovery capability against the cost of downtime.",
   "A BIA differs from a risk assessment. The risk assessment asks how likely threats are and what controls reduce them; the BIA assumes the disruption happens and asks how bad it would be and how fast recovery must be. Both feed the continuity program."
  ],
  "terms": [
   [
    "Business impact analysis (BIA)",
    "An analysis of critical processes, their dependencies and the impact of disruption over time."
   ],
   [
    "Maximum tolerable downtime (MTD)",
    "The longest a process can be unavailable before causing unacceptable harm."
   ],
   [
    "Recovery time objective (RTO)",
    "The target time to restore a process or system after a disruption; it must be less than the MTD."
   ],
   [
    "Recovery point objective (RPO)",
    "The maximum acceptable amount of data loss, expressed as time before the disruption."
   ]
  ],
  "example": "An online travel agency's BIA finds that its booking engine loses $50,000 per hour when down and becomes unacceptable after 6 hours. Management sets an RTO of 4 hours and, because bookings cannot be re-created, an RPO of 5 minutes, which justifies database replication to a second region.",
  "tip": "The BIA comes before setting RTOs and choosing recovery sites. RTO is about time to restore; RPO is about data loss. RTO must be less than MTD.",
  "check": [
   [
    "What must be completed before RTOs can be set?",
    "A business impact analysis."
   ],
   [
    "A process can lose at most 30 minutes of data. What does that define?",
    "The RPO of 30 minutes."
   ]
  ]
 },
 {
  "t": "Business continuity plan (BCP) development",
  "body": [
   "A business continuity plan (BCP) describes how the organization will keep critical business functions running, or restore them quickly, during and after a significant disruption. Disruptions include cyberattacks, but also power failures, pandemics, supplier failures, natural disasters and loss of key staff. The BCP focuses on the business; the disaster recovery plan, covered next, focuses on restoring technology.",
   "BCP development follows a clear sequence. Senior management sponsors the program and approves its policy and scope. The BIA identifies critical processes and recovery targets. A risk assessment identifies threats to those processes and preventive controls. Continuity strategies are selected for each critical process, such as alternate work locations, remote working, manual workarounds, alternate suppliers or cross-trained staff. The plan is then written, tested, and maintained.",
   "A usable BCP includes activation criteria (who can declare a continuity event and when), roles and teams, contact lists, the procedures for each critical process, the resources needed, communication plans for staff, customers and regulators, and the steps for returning to normal operations. It should be concise and action-oriented, because people will read it under stress.",
   "The BCP must connect with other plans. The incident response plan handles security incidents; if an incident escalates into a major disruption, continuity actions should start smoothly, so the triggers and handoffs between plans must be defined. The DRP restores the IT services the BCP depends on, so the RTOs in both must match.",
   "Plans are kept current through regular review and after significant changes, such as new systems, relocations, reorganizations or new suppliers. An out-of-date contact list or procedure can make an otherwise good plan fail when it is needed."
  ],
  "terms": [
   [
    "Business continuity plan (BCP)",
    "A plan to sustain or quickly resume critical business functions during and after a disruption."
   ],
   [
    "Continuity strategy",
    "The chosen approach for keeping a critical process running, such as an alternate site or manual workaround."
   ],
   [
    "Activation criteria",
    "Predefined conditions and authority for declaring a continuity event and invoking the plan."
   ]
  ],
  "example": "When a fire closes a call center, the BCP's activation criteria are met, the continuity manager declares an event, calls are rerouted to agents working from home using pre-issued laptops, and customers see a short website notice. Normal operations resume from a temporary office after ten days.",
  "tip": "The BCP keeps business functions running; the DRP restores IT. The BCP program starts with management support and the BIA, not with picking an alternate site.",
  "check": [
   [
    "What is the main difference between a BCP and a DRP?",
    "The BCP sustains critical business functions; the DRP restores the IT systems and infrastructure they depend on."
   ],
   [
    "Why should the incident response plan and the BCP be aligned?",
    "So that an incident that escalates into a major disruption triggers continuity actions smoothly."
   ]
  ]
 },
 {
  "t": "Disaster recovery plan (DRP) and recovery site strategies",
  "body": [
   "A disaster recovery plan (DRP) describes how the organization restores IT systems, data and infrastructure after a disruption, in time to meet the RTOs and RPOs set in the BIA. It is usually owned by IT and supports the business continuity plan.",
   "The DRP identifies the systems in scope and their priority, the recovery strategy for each, the order of restoration (dependencies such as identity services, networks and databases come before the applications that need them), detailed recovery procedures, the recovery team and contacts, and how to return operations to the primary site when it is ready.",
   "Recovery site options trade speed for cost. A hot site is fully equipped with current hardware, software and data, and can take over in minutes to hours; it is the most expensive. A warm site has infrastructure and some equipment but needs data restoration and configuration, so it takes hours to days. A cold site provides space, power and cooling only; equipment must be delivered and installed, so recovery takes days to weeks, but it is cheap. A mirrored site runs in parallel with production for near-zero downtime. Reciprocal agreements with another organization are inexpensive but hard to rely on. Cloud-based disaster recovery can provide hot or warm capacity that is paid for mainly when used.",
   "Data protection underpins every strategy. Backups (full, incremental and differential), replication and snapshots must meet the RPO, be stored separately from production, and be protected against ransomware, for example with offline or immutable copies. A backup that has never been restored is an assumption, not a capability; regular restore tests prove that data is recoverable and show how old it will be.",
   "Recovery sites must be far enough from the primary site that a regional event does not affect both, and they must have equivalent security controls. A recovery environment with weaker controls becomes an attractive target."
  ],
  "terms": [
   [
    "Disaster recovery plan (DRP)",
    "A plan to restore IT systems, data and infrastructure after a disruption within agreed targets."
   ],
   [
    "Hot site",
    "A fully equipped, current recovery site that can take over quickly; the fastest and most expensive option."
   ],
   [
    "Warm site",
    "A partially equipped site that needs data and configuration before use."
   ],
   [
    "Cold site",
    "A site with space and utilities only; equipment must be installed, so recovery is slow but cheap."
   ]
  ],
  "example": "A hospital needs its electronic health record system back within two hours, so it replicates to a hot site in another region. Its HR system can wait three days, so it is restored from immutable cloud backups into a warm environment. Quarterly restore tests confirm both targets.",
  "tip": "Match the site to the RTO: hot for fastest and most expensive, cold for slowest and cheapest. Verify backups with actual restore tests, not job success messages.",
  "check": [
   [
    "Which recovery site offers the fastest recovery at the highest cost?",
    "A hot site."
   ],
   [
    "How do you verify that backups can meet the RPO?",
    "Perform regular test restores and check the age of the recovered data."
   ]
  ]
 },
 {
  "t": "Incident classification, categorization and severity",
  "body": [
   "Not every event is an incident, and not every incident is equally serious. Classification sorts what the organization detects so that each case gets the right level of attention. Without it, teams either treat everything as a crisis and burn out, or treat serious incidents as routine and respond too slowly.",
   "It helps to separate terms. An event is any observable occurrence, such as a login or a firewall block. An alert is an event that a tool flags as potentially significant. An incident is a confirmed or strongly suspected event that threatens information or systems or violates policy. A breach is an incident in which data is confirmed to have been accessed or disclosed without authorization, which may trigger legal notification duties.",
   "Categorization describes the type of incident, for example malware, unauthorized access, denial of service, data loss, insider misuse, phishing or third-party compromise. Categories help route incidents to the right playbook and team, and support trend analysis. Severity describes how serious it is, and should be based mainly on business impact: which processes are affected, the sensitivity and volume of data involved, the number of users or customers affected, the legal or regulatory implications and whether the incident is spreading.",
   "A severity matrix defines levels, such as low, medium, high and critical, with clear criteria and the response expected for each: who is notified, how quickly, which team leads and whether senior management or the crisis team is involved. Predefined levels make prioritization, escalation and resourcing consistent and fast.",
   "Severity can change during an incident. A single infected laptop may start as low, then become critical when investigators find the attacker has domain administrator credentials. The plan should require regular reassessment and allow upgrades or downgrades as facts emerge."
  ],
  "terms": [
   [
    "Event",
    "Any observable occurrence in a system or network."
   ],
   [
    "Incident",
    "An event that threatens information or systems or violates policy and needs a response."
   ],
   [
    "Breach",
    "An incident in which data is confirmed to have been accessed or disclosed without authorization."
   ],
   [
    "Severity matrix",
    "A table defining incident severity levels, their criteria and the required response for each."
   ]
  ],
  "example": "A university's matrix rates an incident 'critical' if it affects student records for more than 1,000 people, halts teaching systems or involves ransomware. A phishing email reported by one user and blocked is 'low', handled by the service desk; the ransomware case pages the CISO and president's office within 30 minutes.",
  "tip": "Classification criteria should be based on business impact, data sensitivity and scope, not on the malware family, detection time or alert count.",
  "check": [
   [
    "Why define severity levels in advance?",
    "So incidents get consistent prioritization, escalation and resources without delay."
   ],
   [
    "What is the difference between an incident and a breach?",
    "A breach is an incident where unauthorized access to or disclosure of data is confirmed."
   ]
  ]
 },
 {
  "t": "Incident management training, testing and exercises",
  "body": [
   "A plan that has never been practiced is likely to fail in a real incident. People forget their roles, contact lists are out of date, dependencies are missed and decisions take too long. Training, testing and exercises turn a document into a capability.",
   "Training prepares each participant for their role: responders learn tools and procedures, managers learn decision points and communication duties, and all staff learn how to recognize and report incidents. Training should be repeated when people join, when roles change and when the plan changes.",
   "Tests and exercises range from low to high disruption. A checklist or desk check reviews the plan's contents for accuracy. A walkthrough has team members step through the plan together. A tabletop exercise presents a realistic scenario, often with timed 'injects' that add new information, and participants discuss what they would do without touching systems; it is the most common way to test decision-making and communication. A simulation or functional exercise has teams carry out some actions in a controlled environment. For continuity and recovery, a parallel test brings up recovery systems alongside production, and a full interruption test actually fails over from production, which is the most realistic but the most risky.",
   "Every exercise should have objectives, a scenario that reflects current threats, an observer who records what happens, and an after-action report with specific improvements, owners and dates. The value comes from finding gaps safely; an exercise where everything goes perfectly probably was not challenging enough.",
   "Test regularly, at least yearly for most plans, and after significant changes in systems, staff, suppliers or the threat landscape. Results and improvements should be reported to management, because gaps in readiness are risks."
  ],
  "terms": [
   [
    "Tabletop exercise",
    "A discussion-based exercise in which participants talk through their response to a simulated scenario."
   ],
   [
    "Inject",
    "A new piece of scenario information introduced during an exercise to prompt decisions."
   ],
   [
    "Parallel test",
    "A recovery test that brings up recovery systems alongside production without interrupting it."
   ],
   [
    "Full interruption test",
    "A test that shuts down or fails over production to the recovery environment; the most realistic and most disruptive."
   ]
  ],
  "example": "A retailer runs a two-hour tabletop on a payment card breach during the holiday season. Injects include a reporter's call and a card brand inquiry. The exercise reveals that no one knows who approves the public statement, so the plan is updated to name the general counsel.",
  "tip": "Tabletop means discussion without touching systems; full interruption is the most disruptive. Test regularly and after major changes, not only when auditors ask.",
  "check": [
   [
    "Which exercise has team members discuss actions in a simulated scenario without affecting systems?",
    "A tabletop exercise."
   ],
   [
    "What should every exercise produce?",
    "An after-action report with specific improvements, owners and due dates."
   ]
  ]
 },
 {
  "t": "Incident management tools and techniques: SIEM, SOAR and playbooks",
  "body": [
   "Detecting and handling incidents at scale depends on tools that collect data, spot suspicious activity and help responders act consistently. The information security manager does not need to configure them, but must understand what each provides and how they fit together.",
   "Logging is the foundation: systems, applications, network devices, identity providers and cloud services must generate the right logs, with accurate timestamps, and send them to central storage with appropriate retention. A security information and event management (SIEM) system collects and normalizes those logs, correlates events across sources and raises alerts when rules or analytics detect suspicious patterns, such as logins from two countries within minutes.",
   "Endpoint detection and response (EDR) tools monitor activity on laptops and servers and can isolate a device remotely. Extended detection and response (XDR) platforms combine endpoint, email, identity and cloud signals. Network detection tools watch traffic, and user and entity behavior analytics (UEBA) look for unusual behavior compared with a baseline. Threat intelligence feeds enrich alerts with context about known malicious indicators.",
   "Security orchestration, automation and response (SOAR) platforms connect these tools and run playbooks. A playbook is a documented, step-by-step response for a specific incident type, such as phishing, ransomware or a lost device. Automation handles repetitive steps, like enriching an alert, checking a file hash, opening a ticket or disabling an account after approval, so analysts can focus on judgment. Automation supports people; it does not replace them.",
   "Tools only help if alerts are triaged properly. The first step on any alert is validation: is this a real incident or a false positive? Only then escalate or contain. Metrics such as mean time to detect (MTTD) and mean time to respond or contain (MTTR) show whether tools and processes are working."
  ],
  "terms": [
   [
    "SIEM",
    "Security information and event management: a system that centralizes, correlates and alerts on log data."
   ],
   [
    "SOAR",
    "Security orchestration, automation and response: a platform that automates response steps and runs playbooks across tools."
   ],
   [
    "Playbook",
    "A documented step-by-step response procedure for a specific type of incident."
   ],
   [
    "EDR",
    "Endpoint detection and response: tools that monitor endpoints and can investigate and isolate them."
   ]
  ],
  "example": "When a user reports a phishing email, the SOAR playbook automatically extracts the links and attachments, checks them against threat intelligence, searches for the same email in other mailboxes, and presents the analyst with a one-click option to remove all copies. Handling time falls from 40 minutes to 5.",
  "tip": "SOAR speeds and standardizes response; it does not replace staff or log collection. When an alert fires, validate it before taking drastic action.",
  "check": [
   [
    "What is the primary benefit of SOAR?",
    "Automating repetitive response steps so analysts act faster and more consistently."
   ],
   [
    "What should an analyst do first with a new SIEM alert?",
    "Validate whether it represents a real incident."
   ]
  ]
 },
 {
  "t": "Incident investigation, evaluation and evidence handling",
  "body": [
   "Once an incident is confirmed, investigation establishes what happened, how, when, which systems and data were affected, and whether the attacker is still present. Evaluation uses those facts to assess business impact, confirm or change severity, and guide containment, notification and recovery decisions.",
   "Investigators gather information from logs, endpoint telemetry, network data, affected systems, cloud audit trails and interviews. They build a timeline from initial access to discovery and identify indicators of compromise (IOCs), such as malicious files, domains or accounts, that can be used to search for other affected systems. The scope often grows as the investigation proceeds.",
   "Evidence handling matters because an incident may lead to legal action, regulatory inquiry, insurance claims or disciplinary proceedings, often months later. The principle is to preserve evidence and change it as little as possible. Volatile data, such as memory contents and active network connections, should be captured first because it disappears on shutdown; this is the order of volatility. Disks are copied with forensic tools to create bit-for-bit images, and cryptographic hashes are computed so anyone can later verify the copy is identical to the original. Analysis is done on the copy, never on the original.",
   "Chain of custody documents who collected each item of evidence, when, how it was stored and every transfer between people. Gaps in the chain allow evidence to be challenged as altered. Actions such as browsing the original disk, running antivirus on it or reimaging the system destroy or change evidence and should be avoided until evidence is preserved, unless business safety requires otherwise.",
   "Legal counsel should be involved early when litigation, law enforcement or regulators are likely. Many organizations engage an outside forensic firm through counsel. The information security manager ensures the plan and team know these requirements before an incident, not during it."
  ],
  "terms": [
   [
    "Chain of custody",
    "A documented record of who handled evidence, when, and how it was stored and transferred."
   ],
   [
    "Forensic image",
    "A bit-for-bit copy of storage media used for analysis so the original is preserved."
   ],
   [
    "Order of volatility",
    "The principle of collecting the most short-lived evidence, such as memory, before more persistent evidence."
   ],
   [
    "Indicator of compromise (IOC)",
    "An observable artifact, such as a file hash or domain, that suggests a system was compromised."
   ]
  ],
  "example": "After detecting data theft from a file server, responders capture memory, image the disk and record SHA-256 hashes of both. Each evidence bag is logged with time, collector and storage location. Months later, when a former contractor is sued, the hashes and custody log let the evidence be admitted.",
  "tip": "Preserve first: create a forensic image, hash it, analyze the copy and keep chain of custody. Options that browse, scan or reimage the original destroy evidence.",
  "check": [
   [
    "Why is chain of custody important?",
    "It shows evidence was handled properly so it can be relied on, including in legal proceedings."
   ],
   [
    "What should be done to preserve a compromised disk's evidence?",
    "Create a forensic image, hash it and analyze the copy, not the original."
   ]
  ]
 },
 {
  "t": "Incident containment, eradication and recovery",
  "body": [
   "Containment limits the damage an incident can do. It is usually the first priority once an incident is confirmed, especially for fast-spreading threats such as ransomware. Short-term containment actions include isolating infected hosts from the network, disabling compromised accounts, blocking malicious domains and addresses, and segmenting affected networks. Longer-term containment may involve temporary fixes that let the business keep running while a permanent solution is built.",
   "Containment decisions involve business trade-offs. Shutting down a revenue-generating system stops an attack but also stops sales. Routine technical actions, such as blocking a known malicious address or quarantining a file, can be pre-authorized for the technical team, while disruptive actions should involve the business owner, ideally with authority defined in the plan. Containment should also preserve evidence where possible and avoid tipping off an attacker before the team is ready to act everywhere at once.",
   "Eradication removes the cause: malware, backdoors, persistence mechanisms, unauthorized accounts and the vulnerability or weakness that allowed entry. If the root cause is not fixed, the attacker can return. Eradication often involves rebuilding systems from known-good images, resetting credentials broadly, patching, and hardening configurations. Root cause analysis is essential when the same kind of incident recurs.",
   "Recovery restores systems and business processes to normal operation. Before restoring, confirm that backups are clean and predate the compromise, and that the exploited weakness has been closed. Restore in priority order based on the BIA, validate that systems work correctly, and monitor them closely for signs of reinfection. Business owners confirm when their processes are back to normal.",
   "The phases overlap in practice, but the order of priorities matters: contain first, then eradicate, then recover. Restoring from backup before containing a spreading threat, or paying a ransom instead of containing, usually makes things worse. Whether to pay a ransom is a business and legal decision, not a containment method."
  ],
  "terms": [
   [
    "Containment",
    "Actions that limit the spread and impact of an incident."
   ],
   [
    "Eradication",
    "Removing the cause of an incident, including malware, attacker access and the exploited weakness."
   ],
   [
    "Recovery",
    "Restoring systems and processes to normal, validated operation and monitoring for recurrence."
   ],
   [
    "Root cause analysis",
    "Identifying the underlying reason an incident occurred so it can be fixed permanently."
   ]
  ],
  "example": "Ransomware appears on two file servers. The team isolates the server VLAN and disables the compromised service account (containment), finds the entry point was an unpatched VPN appliance, patches it and rebuilds the servers (eradication), then restores files from immutable backups taken before infection and monitors for a week (recovery).",
  "tip": "Order matters: contain before restoring. Before recovery, verify backups are clean and the vulnerability is fixed. Disruptive containment needs business owner input.",
  "check": [
   [
    "What is the first priority when ransomware is spreading?",
    "Contain it by isolating affected systems."
   ],
   [
    "What is the main goal of eradication?",
    "Remove the root cause and every trace of the attacker so the incident cannot recur."
   ]
  ]
 },
 {
  "t": "Incident communications: escalation, notification and regulatory reporting",
  "body": [
   "How an organization communicates during an incident can matter as much as the technical response. Poor communication leads to delays, contradictory messages, legal exposure and lost trust. The incident response plan should define communication in advance: who is told what, when, by whom and through which channels.",
   "Internal escalation moves information up and across the organization. Severity levels determine who must be informed and how fast; for example, critical incidents may require notifying the CISO within 15 minutes and executive leadership within an hour. Contact lists with backups must be current and available offline. Because an attacker may be watching email or chat, the plan should include out-of-band channels for sensitive incident communication.",
   "External notification covers customers, regulators, business partners, law enforcement, insurers and the media. Many laws and regulations set deadlines for reporting certain incidents or breaches, some within days or even hours of determining that a reportable incident occurred; contracts may add their own deadlines. Because these obligations vary by jurisdiction and sector, legal counsel must be involved, and the decision to notify is made by senior management on legal advice, following the plan. Cyber insurance policies often require prompt notice to the insurer too.",
   "Public communication should go through designated spokespeople only. Staff should know to refer media and outside inquiries to the communications team rather than answering themselves. Messages should be accurate, consistent and reviewed by legal; they should acknowledge what is known, avoid speculation and say what the organization is doing. Denying a real incident or releasing unverified details damages trust further.",
   "Documentation is part of communication. Record key decisions, notifications made and their timing. Regulators and courts may later ask when the organization knew about the incident and what it did."
  ],
  "terms": [
   [
    "Escalation",
    "Moving incident information and decisions to higher levels of authority according to predefined criteria."
   ],
   [
    "Breach notification",
    "The legal or contractual duty to inform regulators, affected individuals or customers about certain incidents within set timeframes."
   ],
   [
    "Out-of-band communication",
    "Communication through channels separate from potentially compromised systems, such as phones or a separate platform."
   ],
   [
    "Designated spokesperson",
    "The person authorized to speak for the organization externally during an incident."
   ]
  ],
  "example": "During a customer data breach, a help desk agent receives a call from a journalist and follows training by referring the caller to the communications office. Meanwhile, the general counsel confirms which regulators must be notified and by when, and the CEO approves the notification and customer email drafted by legal and communications.",
  "tip": "Notification decisions are made by senior management with legal counsel, following the plan. Employees refer outside inquiries to the designated contact.",
  "check": [
   [
    "Who normally decides when to notify regulators and customers of a breach?",
    "Senior management, advised by legal counsel, as defined in the incident response plan."
   ],
   [
    "Why document escalation paths before an incident?",
    "So the right people are reached quickly and without confusion during the incident."
   ]
  ]
 },
 {
  "t": "Post-incident review and lessons learned",
  "body": [
   "The post-incident review, also called lessons learned or an after-action review, is the last phase of incident response and one of the most valuable. Its purpose is to improve: to find what worked, what did not, and what should change so that similar incidents are less likely or less harmful in future.",
   "The review should happen soon after the incident is closed, while memories are fresh, and include everyone who played a significant role, from technical responders to legal, communications and business owners. A facilitator guides discussion through a timeline of the incident and asks questions: How was the incident detected, and could it have been detected sooner? Were roles and decisions clear? Did tools and playbooks work? Was communication timely and accurate? What was the root cause, and why did existing controls not prevent it?",
   "A blameless approach is essential. If people fear punishment, they will hide mistakes and the organization will miss the systemic causes, such as unclear procedures, missing tools or unrealistic workloads, that allowed the incident. Individual accountability still exists for deliberate misconduct, but that is handled through separate processes.",
   "The output is a written report with findings and specific improvement actions, each with an owner and due date. Actions might include updating the incident response plan or playbooks, adding detection rules, fixing control gaps, changing architecture, providing training or updating the risk register. Metrics from the incident, such as time to detect, time to contain and total cost, are recorded so trends can be tracked across incidents.",
   "Finally, the manager tracks actions to completion and reports significant lessons to senior management. Repeated incidents of the same type are a warning sign that earlier lessons were not acted on and that root causes remain."
  ],
  "terms": [
   [
    "Post-incident review",
    "A structured review after an incident to identify improvements to controls and the response process."
   ],
   [
    "Blameless review",
    "A review focused on systemic causes and improvement rather than on punishing individuals."
   ],
   [
    "After-action report",
    "The written output of a review, listing findings and improvement actions with owners and dates."
   ]
  ],
  "example": "After a business email compromise, the review finds that the finance team had no call-back verification step and that the SIEM did not alert on new mailbox forwarding rules. Actions: add a verification procedure (finance manager, two weeks) and a detection rule (SOC lead, one week). Both are tracked in the risk register.",
  "tip": "The purpose of lessons learned is improvement, not blame. Repeated incidents of the same kind point to an unfixed root cause.",
  "check": [
   [
    "What is the primary purpose of a post-incident review?",
    "To identify improvements to controls and the response process."
   ],
   [
    "What should the review produce?",
    "A report with findings and specific improvement actions, each with an owner and due date, tracked to completion."
   ]
  ]
 }
], { reviewed: "2026-09-29" });
