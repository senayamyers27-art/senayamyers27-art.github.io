/* Lessons for ISACA CISM (2026 exam content outline): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("cism", [
 {
  "t": "Enterprise governance and the role of the information security manager",
  "body": [
   "Governance is the system by which an organization is directed and controlled. The board and executive management set direction, decide what risks are acceptable, and make sure resources are used responsibly. Information security governance is the part of enterprise governance that deals with protecting information and the systems that handle it. The Certified Information Security Manager (CISM) exam treats security as a business function first and a technical function second, and nearly every question is written from that point of view. If you keep asking 'what would a senior manager who serves the business do here?', you will pick the right answer far more often than if you ask 'what is the strongest technical control?'",
   "It helps to separate governance from management. Governance sets direction and oversees results: it answers 'are we doing the right things?' Management plans, builds, runs and monitors activities within that direction: it answers 'are we doing things right?' The board approves strategy and risk appetite; the information security manager turns them into a program, runs it and reports back. COBIT (Control Objectives for Information and Related Technologies), ISACA's governance framework, draws the same line: governance is evaluate, direct and monitor (EDM), while management is plan, build, run and monitor.",
   "In practice governance works as a loop. First, leadership evaluates the business context: objectives, legal obligations, threats and the current state of security. Second, it directs by approving a strategy, a risk appetite, top-level policies and a budget, and by assigning accountability. Third, it monitors through regular reports, metrics, audit results and escalations, then adjusts direction. The information security manager feeds every stage of that loop with analysis and recommendations, but the decisions at each stage belong to leadership. Typical governance artifacts you will meet are a board-approved security policy, a charter for a security steering committee, a risk appetite statement and a reporting calendar.",
   "The information security manager, often titled chief information security officer (CISO), sits between governance and management. The role is to understand business objectives, identify the information risks that threaten them, propose a strategy and program to manage those risks, and give leadership the information it needs to decide. The manager is responsible for the program but is not the owner of business risk. Business managers own the risks in their processes; the board and executives remain accountable for the organization's overall exposure. Accountability cannot be delegated, even though responsibility for doing the work can be.",
   "Good governance produces a handful of outcomes that ISACA lists again and again: strategic alignment with business objectives, risk management that keeps exposure within appetite, value delivery (security spending that supports the business efficiently), resource management, performance measurement and assurance that controls work. When an exam option talks about one of these outcomes, it is usually stronger than an option about a single tool or task. The strongest single indicator that governance is working is senior management commitment, shown by approved strategy, funding and leaders who follow the same rules they set.",
   "Consider a worked example. A hospital board approves a strategy to expand telehealth. The information security manager does not decide whether telehealth is too risky, and does not quietly approve it either. She meets the executive sponsor to understand the goals, identifies risks to patient data and service availability, estimates the controls needed and their cost, and presents the residual risk in business terms. The executive committee decides to proceed with a phased launch, the risk owner signs off the residual risk, and the manager adds progress on the new controls to her quarterly board report. Each party did its own job: leadership decided, the manager advised and executed, and reporting closed the loop.",
   "Common mistakes: confusing responsibility with accountability; assuming the CISO owns every security risk because the CISO found it; treating governance as a document set rather than a decision-and-oversight process; and picking answers where security blocks a business initiative, accepts risk on management's behalf, or buys technology before understanding the need. Another frequent error is thinking that a strong technical team means strong governance. Without leadership direction and oversight, a skilled team can still work hard on the wrong priorities.",
   "Exam questions often ask what the manager should do 'first', 'best' or 'most'. Clue words such as 'gain support', 'align' and 'business objectives' point to understanding business context and involving senior management. 'Ultimately accountable' points to the board or senior management. 'Most important factor for a successful program' usually points to senior management commitment. When an answer has the manager acting alone on a business decision, treat it as a distractor. You advise, facilitate and report; senior management decides."
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
    "Responsibility",
    "The duty to carry out a task or operate a control, which can be assigned to others."
   ],
   [
    "Strategic alignment",
    "Security goals and spending are derived from, and support, the organization's business objectives."
   ],
   [
    "Value delivery",
    "Achieving security outcomes at a cost that is justified by the business benefit they provide."
   ],
   [
    "Senior management commitment",
    "Visible leadership support through approved strategy, funding and personal example, the key success factor for a security program."
   ]
  ],
  "example": "A retail chain's new CEO asks the CISO to 'make us secure'. Instead of launching a tool purchase, the CISO interviews business unit heads about their objectives, presents a short risk picture to the executive committee, and asks the board to approve a risk appetite statement and a steering committee charter. With direction agreed, she builds a two-year program and reports progress against it every quarter, so leadership can adjust priorities when the business changes.",
  "tip": "CISM answers favor the manager who advises and informs decision-makers over the one who acts alone. Accountability stays with the board and senior management; the CISO is responsible for running the program.",
  "check": [
   [
    "Who is ultimately accountable for information security?",
    "The board and executive management. The CISO is responsible for running the program, but accountability stays with leadership and cannot be delegated."
   ],
   [
    "What is the difference between governance and management?",
    "Governance sets direction and monitors whether the organization is doing the right things; management plans and runs activities to do things right within that direction."
   ],
   [
    "What is the most important factor for a successful information security program?",
    "Senior management commitment, because it provides direction, funding and the example that makes controls stick."
   ],
   [
    "A business unit wants to launch a product the CISO considers risky. What should the CISO do?",
    "Analyze and communicate the risk and options in business terms to the decision-makers; the business, not security, decides whether to proceed."
   ]
  ]
 },
 {
  "t": "Organizational culture and its effect on security behavior",
  "body": [
   "Culture is the set of shared beliefs, habits and unwritten rules that shape how people actually behave at work. It matters to security because most controls depend on people: they must report suspicious emails, follow change procedures, lock screens and refuse to share passwords. A strong written policy that clashes with culture will be bypassed quietly, while a modest policy that fits the culture can be followed well. For the information security manager, culture is not a soft extra; it decides how much of the program actually operates as designed.",
   "Security culture has several visible signs. Do people report mistakes and incidents quickly, or hide them for fear of blame? Do leaders follow the same rules as everyone else? Is security seen as a partner that helps the business get things done, or as the department of 'no'? Are security requirements considered early in projects, or added at the end? How many exceptions are requested, and why? These signs tell you where controls are likely to erode and where your program can rely on people doing the right thing without supervision.",
   "You can assess culture in a structured way. Useful sources include short anonymous surveys about attitudes and pressures, interviews with team leads, the number and speed of incident reports, phishing simulation results over time, exception and policy-violation trends, and audit findings that show workarounds. Look for patterns by business unit rather than a single company-wide score, because culture differs between a regulated finance team and a fast-moving product group. Measure again after changes, so you know whether an intervention helped.",
   "Culture is shaped mostly from the top. When executives visibly support security, use multifactor authentication (MFA) themselves, fund training and ask about risk in business meetings, employees take it seriously. When they grant themselves exceptions, employees conclude that security is optional. That is why CISM places so much weight on senior management commitment, often described as the tone at the top. Middle managers matter too: they translate priorities into daily pressure, and a manager who rewards speed at any cost will undo a year of awareness training.",
   "An information security manager influences culture by understanding it first. Before rolling out a new control, learn how work gets done, which teams feel the most friction and why people take shortcuts. Then design controls that meet the control objective with the least disruption, explain the reason behind rules, recognize good behavior, and make reporting easy and blame-free. Security champions, volunteers in each team who receive extra training and act as a link to the security function, spread good habits faster than central announcements. Awareness programs are one tool, but lasting change also comes from process design and leadership example. Culture also differs between regions, so adapt communication and implementation while keeping the control objective the same.",
   "Consider a worked example. A software company requires code review for every change, but developers routinely approve their own pull requests under deadline pressure. A survey shows they see review as a bottleneck, not a safeguard. Instead of adding penalties, the security manager works with engineering leads to add a second-reviewer rotation, automated checks that block self-approval, and a short explanation of two past incidents that review would have caught. The chief technology officer (CTO) publicly follows the same rule. Self-approvals drop sharply within a month, and review time falls because the rotation spreads the load.",
   "Common mistakes: responding to widespread non-compliance with more monitoring and punishment before finding the cause; assuming an annual awareness module changes culture on its own; measuring culture only by training completion rates; and designing one control for the whole organization without checking how different units work. Another trap is treating culture as fixed. It changes, slowly, through consistent leadership behavior, practical processes and recognition of good choices.",
   "On the exam, a question that describes a policy people ignore, a control that is routinely bypassed or incidents that are hidden is usually testing culture. Clue words such as 'employees routinely work around', 'reluctant to report' or 'security is seen as an obstacle' point to answers about understanding the cause, involving leadership, redesigning the control to fit the business or building a blame-free reporting culture. Answers that jump straight to disciplinary action, more logging or a new technical product are usually distractors."
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
   ],
   [
    "Security champion",
    "A volunteer in a business or technical team who receives extra training and promotes secure practices locally."
   ],
   [
    "Workaround",
    "An unofficial way of getting work done that bypasses a control, often a sign the control does not fit how work happens."
   ],
   [
    "Culture assessment",
    "A structured review of attitudes and behavior, using surveys, interviews and metrics, to find where controls may erode."
   ]
  ],
  "example": "A bank's branch staff keep sharing a single login to the teller system because each new login takes several minutes. Punishing staff would not fix the cause. The security manager works with operations to introduce badge-tap sign-in, the regional director explains the fraud risk at staff meetings, and a champion in each branch collects feedback. Shared logins fall to almost zero within a quarter.",
  "tip": "When a question describes a policy people ignore, look for the answer that addresses the cause, such as culture, leadership support or impractical design, rather than more enforcement or monitoring.",
  "check": [
   [
    "Why can a technically sound policy still fail?",
    "If it clashes with the organization's culture or lacks visible leadership support, people will work around it."
   ],
   [
    "What is the most powerful influence on security culture?",
    "Senior management's visible commitment and example, often called the tone at the top."
   ],
   [
    "Staff hide minor security mistakes. What should the manager encourage?",
    "A blame-free reporting culture, so mistakes are reported early and can be contained and learned from."
   ],
   [
    "What should a manager do before rolling out a control likely to cause friction?",
    "Understand how the affected teams work and why they might take shortcuts, then design the control to meet its objective with the least disruption."
   ]
  ]
 },
 {
  "t": "Legal, regulatory and contractual requirements",
  "body": [
   "Every organization operates under external obligations. Laws and regulations, such as data protection laws, sector rules for health or finance, and breach notification requirements, set minimum expectations and carry penalties. Contracts with customers, partners and card brands add more, for example the Payment Card Industry Data Security Standard (PCI DSS) for anyone who stores, processes or transmits payment card data. The information security manager must know which obligations apply and make sure the program addresses them, working closely with legal counsel and compliance rather than interpreting the law alone.",
   "The first step is identification. Work with legal counsel and compliance to build a register of obligations: the source (law, regulation, contract), what it requires, which business processes and data it touches, and who owns compliance. Requirements change, so the register needs a periodic review and a way to capture new laws, new markets and new contracts. When the business expands into a new country or signs a major customer, the manager's first move is to understand the new requirements and their impact before choosing controls.",
   "The next steps turn requirements into action. Map each obligation to the controls that satisfy it, noting where one control covers several obligations. Assess gaps, rate the risk of noncompliance in business terms (fines, lost contracts, reputational harm), and add remediation to the roadmap with owners and dates. Then collect evidence, such as policies, logs, test results and audit reports, so you can show compliance when a regulator or customer asks. A simple register row might read: source, requirement, scope, mapped controls, owner, evidence location, last reviewed.",
   "Some requirements are specific, such as encrypting cardholder data or reporting certain breaches within a fixed number of hours. Others are principle-based, such as 'appropriate technical and organizational measures'. For principle-based rules, the organization must show that its controls are reasonable for its risks, which links compliance directly to risk assessment. Compliance is a floor, not a ceiling: meeting the law does not mean risk is within appetite. Keep in mind the difference between a law, which is mandatory, and a contract, which is voluntarily accepted but still binding once signed. The exam also expects you to know that legal and regulatory requirements are an input to strategy and risk decisions, not a replacement for them.",
   "Conflicts happen. A global policy may say logs are kept for one year while a local law requires a different period, or a data localization law may require certain data to stay in-country. The right response is not to ignore either side informally. Document the conflict, get legal advice, and approve a formal local standard or exception with its risk understood. Contracts also flow outward. When you outsource processing, your obligations do not disappear; you pass requirements to the provider through contract clauses such as security requirements, breach notification, right to audit and limits on subcontracting. Regulators generally hold the organization accountable for its vendors' handling of its data.",
   "Consider a worked example. A payroll company wins a contract with a bank that requires notification of any security incident within 24 hours and an annual independent audit. The security manager adds both to the compliance register, confirms with legal what counts as an incident under the contract, updates the incident response plan's notification steps and contact list, and schedules an independent assessment such as a System and Organization Controls (SOC) 2 report. She also checks the company's own cloud provider contract, because the 24-hour clock is hard to meet if the provider can take longer to tell her about an incident.",
   "Common mistakes: treating compliance as the goal of the program; assuming that outsourcing transfers legal responsibility; letting the security team interpret complex law without legal counsel; and forgetting that contracts create obligations just as binding as regulations. Another trap is responding to a new regulation by immediately buying a product. The regulation tells you what outcome is required; the risk assessment and existing control set tell you what, if anything, needs to change.",
   "Exam questions in this area often begin with a change: 'the organization is expanding into a new region', 'a new privacy law takes effect', or 'a major customer requires'. The clue points to identifying the requirements and assessing their impact first. 'Local law conflicts with corporate policy' points to legal advice and a documented, approved exception or local standard. 'The organization outsourced processing' points to contract clauses and oversight, because accountability stays with the organization."
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
   ],
   [
    "Right to audit",
    "A contract clause allowing the customer or its auditors to verify a provider's controls."
   ],
   [
    "Principle-based requirement",
    "A rule that states an outcome, such as appropriate security, and leaves the organization to justify its controls by risk."
   ]
  ],
  "example": "A European online retailer decides to sell in a new country with strict data localization rules. Before touching any system, the security manager and legal counsel list the new obligations, discover that customer records must be stored locally, and estimate the cost of a local hosting region. The executive committee compares that cost with the market opportunity and approves the launch with a documented plan and a compliance owner.",
  "tip": "When a new law or market appears in a question, the first step is to identify the requirements and their impact, not to jump to a specific control or data move. Compliance is a minimum, not proof that risk is acceptable.",
  "check": [
   [
    "Does compliance with the law mean risk is acceptable?",
    "No. Compliance is a minimum; the organization may still carry risk above its appetite and need further controls."
   ],
   [
    "What should happen when local law conflicts with group policy?",
    "Document the conflict, take legal advice and approve a formal, risk-assessed local standard or exception."
   ],
   [
    "When processing is outsourced, how are the organization's obligations handled?",
    "They are passed to the provider through contract clauses and oversight, but accountability remains with the organization."
   ],
   [
    "What is the first step when the business enters a new jurisdiction?",
    "Identify the legal and regulatory requirements that apply there and assess their impact on the program."
   ]
  ]
 },
 {
  "t": "Organizational structures, roles and responsibilities (board, steering committee, CISO, data owners)",
  "body": [
   "Security works only when people know who decides, who does the work and who checks it. CISM expects you to know the standard roles and where accountability sits. The board of directors sets overall direction and risk appetite and oversees management; it is ultimately accountable for protecting the organization's assets. Executive management, led by the chief executive officer (CEO), turns that direction into strategy, funds it and makes sure the organization carries it out. Board committees, such as an audit committee or a risk committee, often receive security reports on the board's behalf.",
   "A security steering committee brings together senior representatives from the major business units, IT, legal, human resources, risk and compliance. Its job is to prioritize security initiatives, resolve conflicts between business needs and security requirements, review policies before executive sign-off, and keep security aligned with business goals. A committee made only of technical staff cannot make business trade-offs, which is why exam answers favor cross-functional membership. A written charter should state the committee's purpose, members, decision rights, meeting frequency and how it reports upward. The committee does not replace the board: it coordinates and recommends, while formal approval of strategy, appetite and top-level policy still rests with executive management and the board. Its value is that decisions reach leadership already discussed by the people who will have to live with them.",
   "The chief information security officer (CISO) or information security manager designs and runs the program, advises leadership and reports on risk. Reporting line matters: a CISO who reports to the head of IT operations can face a conflict of interest when security findings criticize IT's own work. Reporting to the CEO, chief risk officer or another executive outside IT operations gives more independence, though many organizations still place security under the chief information officer (CIO). If that is the case, a separate reporting channel to the board or a risk committee can reduce the conflict.",
   "Data and system owners are senior business managers accountable for specific information assets. They classify their data, approve who gets access, and accept or reject the risk to their assets within their authority. Custodians, usually IT staff, implement and operate the controls owners decide on, such as backups and access configuration. Users follow policy and report problems. Internal audit gives independent assurance to the board, usually reporting to the audit committee, and must not run the controls it audits. Other roles you may meet include the chief privacy officer or data protection officer, legal counsel and human resources, which handles screening, onboarding and disciplinary processes. A RACI chart (responsible, accountable, consulted, informed) is a simple way to document these roles for each security process. Only one party should be accountable for each activity, as in this small extract:",
   "```text\nActivity                  | Data owner | CISO | IT custodian | Internal audit\nClassify customer data    | A          | C    | I            | I\nApprove access request    | A          | I    | R            | -\nConfigure access control  | I          | C    | A/R          | -\nReview access (quarterly) | A/R        | C    | C            | I\nTest access controls      | I          | I    | C            | A/R\n```",
   "Consider a worked example. At a logistics firm, the head of sales owns the customer database and approves access requests. The database team, as custodian, applies the approved access and runs backups. When audit finds excessive access, the finding goes to the sales head as owner, not to the database team, because the owner approved the access and decides what level is acceptable. The CISO helps design a better quarterly review, and the steering committee tracks the fix until audit confirms it is closed.",
   "Common mistakes: making IT the owner of business data because IT runs the system; letting internal audit design or operate controls, which destroys its independence; staffing the steering committee only with technical people; and giving two parties accountability for the same activity.",
   "Exam questions test these roles with clue words. 'Who should classify' or 'who approves access' points to the data owner. 'Who implements backups' points to the custodian. 'Independent assurance' points to internal audit. 'Resolve conflicts between business units' or 'prioritize initiatives' points to the steering committee. 'Conflict of interest' in the reporting line points to moving the CISO outside IT operations."
  ],
  "terms": [
   [
    "Board of directors",
    "The body that sets overall direction and risk appetite and is ultimately accountable for the organization."
   ],
   [
    "Steering committee",
    "A cross-functional group of senior leaders that prioritizes and oversees security initiatives."
   ],
   [
    "Chief information security officer (CISO)",
    "The executive responsible for designing and running the information security program and reporting on risk."
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
   ],
   [
    "Internal audit",
    "An independent function that gives the board assurance that controls are designed and operating effectively."
   ]
  ],
  "example": "A mid-sized insurer places its CISO under the IT operations director. When the CISO reports that IT has left dozens of servers unpatched, the finding is softened before it reaches executives. After a near miss, the board moves the CISO to report to the chief risk officer with a direct line to the risk committee, and the steering committee begins tracking patch compliance by business unit.",
  "tip": "Watch for independence problems: auditors should not run controls, and security findings about IT should not be filtered through IT operations. Owners are business managers, not IT staff.",
  "check": [
   [
    "Who classifies a customer database?",
    "Its business data owner; custodians and security advise and implement."
   ],
   [
    "Why might a CISO reporting to the IT operations manager be a problem?",
    "It creates a conflict of interest when security needs to report weaknesses in IT's own work."
   ],
   [
    "Why should a security steering committee be cross-functional?",
    "Because it must make business trade-offs and resolve conflicts between units, which requires senior business, legal, HR and IT views, not only technical ones."
   ],
   [
    "Why must internal audit not operate the controls it audits?",
    "Doing so would remove its independence, so its assurance to the board could no longer be trusted."
   ]
  ]
 },
 {
  "t": "Information security strategy: current state, desired state and gap analysis",
  "body": [
   "A strategy is a plan to reach long-term goals. An information security strategy describes how the security program will support business objectives over the next few years, and it starts from the business, not from technology. The manager needs the business strategy, risk appetite, legal obligations and major initiatives in hand before writing anything. A strategy that could belong to any company, full of generic goals such as 'improve security posture', usually means this step was skipped.",
   "The core method is simple. First, describe the current state: which capabilities, controls, processes and skills exist today and how mature they are. Useful inputs include risk assessments, audit findings, maturity assessments against a framework, incident history, metrics and interviews with business leaders. Second, define the desired state: the capabilities and risk position the organization needs to support its goals within appetite, often expressed as target maturity levels, control objectives or framework profiles. The National Institute of Standards and Technology Cybersecurity Framework (NIST CSF) 2.0 calls these current and target profiles.",
   "Maturity models are a common way to describe both states. A capability maturity model scores processes on a scale, often from 0 (nonexistent) through initial, repeatable, defined and managed to 5 (optimized). The target is not always the highest level: an optimized process is expensive, and the right level is the one the business needs for its risk. A small internal tool may be fine at 'repeatable' while payment processing needs 'managed'. Whatever scale you use, apply it consistently and record the evidence behind each score, so the next assessment measures real progress rather than a change of opinion.",
   "Third, analyze the gap between the two. Each gap is a reason for work: a missing capability, a weak process, a skill shortage or an unacceptable risk. Gaps are prioritized by the business risk they represent, the effort to close them and dependencies between them; for example, you cannot run a good access review until you have an accurate asset inventory. The result is a roadmap of initiatives over time, each with an owner, cost, benefit and measure of success. A strategy also identifies constraints: budget, staff, culture, legal limits, technology and time. Ignoring them produces a plan no one can execute. Good strategies state assumptions and include metrics so leadership can see progress.",
   "Finally, the strategy must be approved by senior management and revisited when the business changes. A merger, new market or major outsourcing decision can change the desired state, so the strategy is a living document. The order to remember is: business objectives, current state, desired state, gap analysis, roadmap, approval, then monitoring against the roadmap.",
   "Consider a worked example. An insurer scores itself at maturity level 1 for asset management and level 2 for incident response, but its plan to launch online claims in eighteen months needs level 3 in both, because regulators expect prompt breach reporting and the claims platform will hold sensitive health data. The gap analysis produces two initiatives: a configuration management database (CMDB) project to build a reliable asset inventory, and a formal incident response program with trained staff and tested playbooks. The asset project goes first because incident response depends on knowing what systems exist. Each initiative gets a budget, an owner and quarterly milestones, and the executive committee approves the roadmap.",
   "Common mistakes: starting with a framework gap assessment before understanding what the business needs; setting every target to the highest maturity level; writing a roadmap without owners or funding; treating the strategy as a one-time document; and describing the desired state only in technical terms that executives cannot connect to their goals. Another mistake is confusing a strategy with a policy. The strategy says where the program is going and why; policies state the rules that people must follow along the way.",
   "Exam questions often ask what should be done 'first' when developing a strategy. Clue words such as 'new CISO', 'develop a strategy' or 'program lacks direction' point to understanding business objectives and the current state. 'Most important input to the strategy' points to business strategy and objectives. 'Basis for prioritizing initiatives' points to business risk. 'Strategy no longer fits after an acquisition' points to reassessing the desired state and updating the roadmap with senior management approval."
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
   ],
   [
    "Maturity model",
    "A scale that rates how well defined, managed and improved a process is, used to express current and target states."
   ],
   [
    "Constraint",
    "A limit on the strategy, such as budget, staff, culture, law or time, that shapes what can be achieved."
   ]
  ],
  "example": "A new CISO at a university is asked for a three-year plan. She first meets the provost and research leaders to learn their goals, then reviews audit reports and incident logs to score current maturity. Research data protection is at level 1 but grant funders now require level 3. That gap tops her roadmap, while a costly upgrade the IT team wanted drops lower because it supports no current business goal.",
  "tip": "Gap analysis needs a desired state, and the desired state comes from business objectives. An answer that starts with a framework gap assessment before understanding the business is usually premature.",
  "check": [
   [
    "What is the purpose of defining the desired state?",
    "It provides the target that the current state is compared with, so gaps can be identified and prioritized."
   ],
   [
    "What should drive the priority of strategy initiatives?",
    "The business risk each gap represents, balanced against cost, effort and dependencies."
   ],
   [
    "Should the desired state always be the highest maturity level?",
    "No. It should be the level the business needs for its risk and objectives, since higher maturity costs more."
   ],
   [
    "What should happen to the strategy after a major acquisition?",
    "Reassess the desired state and gaps in light of the new business, update the roadmap and get senior management approval."
   ]
  ]
 },
 {
  "t": "Governance frameworks and standards: COBIT, ISO/IEC 27001, NIST CSF 2.0",
  "body": [
   "Frameworks give you a proven structure and common vocabulary so you do not have to invent a program from scratch. They help you explain your program to auditors, customers and regulators, and they make it easier to compare yourself with others. CISM does not test framework details deeply, but you must know what each major framework is for and when you would choose it.",
   "COBIT, published by ISACA, is a framework for the governance and management of enterprise information and technology. It separates governance objectives, grouped under evaluate, direct and monitor (EDM), from management objectives in four domains: align, plan and organize (APO); build, acquire and implement (BAI); deliver, service and support (DSS); and monitor, evaluate and assess (MEA). Its goals cascade links stakeholder needs to enterprise goals and then to alignment goals for IT. COBIT uses capability levels to rate processes. Use COBIT when you need to show how IT and security governance serve enterprise goals and who decides what.",
   "ISO/IEC 27001, from the International Organization for Standardization and International Electrotechnical Commission, specifies requirements for an information security management system (ISMS). The main clauses cover context and scope, leadership commitment, planning with risk assessment and risk treatment, support such as resources and awareness, operation, performance evaluation through monitoring, internal audit and management review, and continual improvement. A key document is the statement of applicability (SoA), which lists the Annex A controls, whether each applies and why. Organizations can be certified against ISO/IEC 27001 by an accredited certification body. ISO/IEC 27002 is the companion catalog of controls with implementation guidance; you use it to pick and implement controls, but you are not certified against it.",
   "The NIST Cybersecurity Framework (CSF) 2.0, released in 2024 by the US National Institute of Standards and Technology, organizes outcomes into six functions: Govern, Identify, Protect, Detect, Respond and Recover. Govern was added in 2.0 to cover organizational context, risk management strategy, roles and responsibilities, policy, oversight and cybersecurity supply chain risk management. Each function breaks into categories and subcategories of outcomes. The CSF uses profiles to describe current and target states and tiers to describe how rigorous risk governance is, which fits strategy work well. It is voluntary, applies to organizations of any size or sector, and has no official certification.",
   "The distinctions the exam tests are about purpose. Enterprise governance of IT, decision rights and alignment point to COBIT. A certifiable management system and customer demands for certification point to ISO/IEC 27001. Communicating current and target posture in outcome language, especially to executives, points to NIST CSF 2.0. Other frameworks you may meet include NIST Special Publication (SP) 800-53, a detailed control catalog; the CIS Critical Security Controls, a prioritized set of technical safeguards; ITIL for IT service management; and the NIST Risk Management Framework in SP 800-37. No framework guarantees security. Organizations select one or more, tailor them to their risk, and often map controls between them.",
   "Consider a worked example. A software company selling to European enterprises finds that nearly every large customer asks for ISO/IEC 27001 certification in contracts. The security manager scopes an ISMS around the product platform, runs a risk assessment, uses ISO/IEC 27002 guidance to implement controls, and records choices in the statement of applicability. She reports progress to the board using NIST CSF 2.0 current and target profiles because directors find the six functions easy to follow. The chief information officer separately uses COBIT to clarify decision rights between IT and the business units. Each framework serves a different audience and purpose.",
   "Common mistakes: believing you can be certified against ISO/IEC 27002 or NIST CSF; treating a framework as a checklist to implement in full regardless of risk; assuming adoption of a framework transfers liability or guarantees protection; and forgetting that Govern is the function added in CSF 2.0. Another trap is choosing a framework because it is popular rather than because it meets the organization's need, such as customer certification requirements or regulatory expectations.",
   "Exam questions usually give you a need and ask which framework fits. 'Certification', 'certified ISMS' or 'statement of applicability' point to ISO/IEC 27001. 'Implementation guidance for controls' points to ISO/IEC 27002. 'Governance and management of enterprise IT' or 'goals cascade' points to COBIT. 'Six functions', 'Govern function', 'current and target profile' point to NIST CSF 2.0. When the question asks what should drive framework selection, the answer is business needs and risk, not the framework's popularity."
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
    "ISO/IEC 27002",
    "A catalog of information security controls with implementation guidance that supports ISO/IEC 27001 but is not certifiable."
   ],
   [
    "NIST CSF 2.0",
    "A voluntary framework of cybersecurity outcomes organized into Govern, Identify, Protect, Detect, Respond and Recover."
   ],
   [
    "Profile",
    "In NIST CSF, a description of current or target cybersecurity outcomes used to find and prioritize gaps."
   ]
  ],
  "example": "A healthcare software vendor loses two deals because it cannot show an independent certification. The security manager recommends ISO/IEC 27001 certification scoped to its hosted service, while keeping NIST CSF 2.0 profiles for board reporting. Within a year the vendor passes its certification audit, and sales teams can answer customer questionnaires with the certificate and statement of applicability instead of long custom responses.",
  "tip": "Certification questions point to ISO/IEC 27001, not 27002 or NIST CSF. Enterprise IT governance and goal alignment point to COBIT. The Govern function is new in CSF 2.0.",
  "check": [
   [
    "Can an organization be certified against ISO/IEC 27002?",
    "No. Certification is against ISO/IEC 27001; 27002 provides supporting control guidance."
   ],
   [
    "Name the six functions of NIST CSF 2.0.",
    "Govern, Identify, Protect, Detect, Respond and Recover."
   ],
   [
    "Which framework separates governance objectives (evaluate, direct, monitor) from management objectives?",
    "COBIT, ISACA's framework for governance and management of enterprise information and technology."
   ],
   [
    "What should drive the choice of a framework?",
    "The organization's business needs, obligations and risks, such as customer demand for certification, rather than popularity."
   ]
  ]
 },
 {
  "t": "Strategic planning: business cases, budgets and resource allocation",
  "body": [
   "A strategy is only real once it is funded and staffed. The information security manager competes for money and people with every other part of the business, so CISM expects you to argue in business terms. The main tool is the business case: a document that explains a problem, the options for addressing it, their costs and benefits, and a recommendation that leadership can approve or reject. A business case also creates a record against which the investment can later be judged.",
   "A strong security business case starts with the business problem, not the technology. For example: 'Our customer portal is our largest revenue channel and credential stuffing attacks are causing account takeovers and support costs.' It then describes options, including doing nothing, with cost, expected risk reduction, effect on operations and implementation time for each. Where possible it quantifies benefits, such as reduced expected loss, avoided fines, lower support costs or enabling a new product. It ends with the decision needed, the risks of the recommended option and how success will be measured. A typical outline is: problem and link to objectives, options, cost-benefit analysis, recommendation, implementation plan, metrics.",
   "Budgeting follows the strategy's roadmap. Security budgets include capital expenditure (CapEx), one-time purchases and projects, and operating expenditure (OpEx), such as subscriptions, staff and managed services. Remember the total cost of ownership (TCO): a tool's purchase price is often smaller than the cost of licenses, integration, tuning, training and the people who run it over its life. The size of the budget should reflect the value at risk and the organization's appetite, not simply last year's figure or a peer benchmark. Benchmarks are useful context but ignore your specific assets and threats.",
   "Resource allocation covers people as well as money. The manager decides which skills to build internally, which to hire, and which to buy as services. Outsourcing can bring expertise quickly, but responsibility for managing the risk stays with the organization. Staff time is also a resource: a roadmap that assumes the same small team can deliver ten projects at once will fail. Prioritize by risk reduction per unit of cost and effort, and sequence projects that depend on each other. Keep some capacity in reserve for unplanned work such as incidents, audit findings and urgent regulatory changes, because a plan that allocates every hour in advance breaks the first time something unexpected happens. Review allocations at least yearly, and whenever the strategy changes, so money and people follow current priorities rather than last year's. Return on security investment (ROSI) is one way to express value. A common form is shown below; the figures are estimates, so present them honestly with their assumptions. Executives respond better to clear, honest ranges than to precise-looking figures they cannot trust.",
   "```text\nROSI = (ALE before - ALE after - annual cost of control) / annual cost of control\nExample: (400,000 - 150,000 - 120,000) / 120,000 = 1.08, about 108%\nALE = annualized loss expectancy (expected yearly loss)\n```",
   "Consider a worked example. A security manager asks for 120,000 a year for managed detection and response (MDR). Her business case shows current detection takes weeks on average, estimates the expected annual loss from late detection at about 400,000 falling to about 150,000, and compares the option of hiring three analysts, which costs more and cannot cover nights and weekends. She states assumptions openly, asks the chief financial officer (CFO) to approve a two-year contract, and commits to quarterly metrics on detection time and incident cost. The CFO approves because the case ties spending to a business loss the company already experiences. A year later the manager reports the actual detection times against the promised metrics, which builds credibility for her next request.",
   "Common mistakes: leading with product features; using fear from a competitor's breach as the main argument; presenting a single precise number without assumptions; ignoring operating costs and staff time; and assuming a larger budget automatically means better security.",
   "On the exam, clue words such as 'obtain funding', 'justify' or 'gain approval' point to a business case framed in risk to business objectives relative to cost. 'Most important element of a business case' is usually its link to business objectives or value. 'Budget based on' points to risk and strategy, not benchmarks alone."
  ],
  "terms": [
   [
    "Business case",
    "A document that justifies an investment by comparing options, costs, benefits and risks, and states the decision needed."
   ],
   [
    "Capital expenditure (CapEx)",
    "A one-time investment in assets or projects, such as buying hardware or building a system."
   ],
   [
    "Operating expenditure (OpEx)",
    "Ongoing costs such as subscriptions, salaries and managed services."
   ],
   [
    "Total cost of ownership (TCO)",
    "The full cost of a control over its life, including purchase, integration, operation, staff and retirement."
   ],
   [
    "Return on security investment (ROSI)",
    "An estimate of value: the reduction in expected loss, minus the control's cost, relative to that cost."
   ],
   [
    "Resource allocation",
    "Deciding how money, staff time and skills are distributed across initiatives according to priority."
   ]
  ],
  "example": "A manufacturer's security team wants a privileged access management tool. The first request, full of product features, is rejected. The manager rewrites it around a business problem: shared administrator passwords on plant control systems could halt production. She shows the cost of a day's outage, compares three options including better process only, includes staff and licensing costs over three years, and the steering committee approves a phased rollout.",
  "tip": "Business cases that win on the exam emphasize risk to business objectives relative to cost. Technical features, fear from competitors' breaches or vulnerability counts are weaker justifications.",
  "check": [
   [
    "What should a security business case emphasize most?",
    "How the investment reduces risk to business objectives, or enables them, relative to its cost."
   ],
   [
    "Why is a peer benchmark not enough to set a security budget?",
    "It ignores the organization's own assets, threats and risk appetite."
   ],
   [
    "Why should a business case consider total cost of ownership?",
    "Because ongoing costs for staff, licenses, integration and tuning often exceed the purchase price and affect whether the investment is worthwhile."
   ],
   [
    "A control costs 50,000 a year and reduces ALE from 200,000 to 100,000. What is the ROSI?",
    "(200,000 - 100,000 - 50,000) / 50,000 = 1, or 100 percent, meaning the control returns its cost plus an equal amount in reduced expected loss."
   ]
  ]
 },
 {
  "t": "Risk appetite, risk tolerance and aligning security with business objectives",
  "body": [
   "Risk appetite is the amount and type of risk an organization is willing to pursue or accept to achieve its objectives. It is set by the board and senior management, not by the security team. A bank might have a very low appetite for fraud losses but a moderate appetite for risk in launching new digital products. Appetite statements can be qualitative ('we will not accept risks that could cause a regulatory sanction') or quantitative ('no more than a defined amount of expected annual loss from cyber events'). Appetite is not the same everywhere in the business: it is usually stated per category of risk, such as financial, regulatory, operational and reputational.",
   "Risk tolerance is the acceptable variation around the appetite for a particular objective or measure. If appetite says critical systems must be highly available, tolerance might say that up to four hours of unplanned downtime per quarter is acceptable. Tolerances turn broad appetite into thresholds you can monitor, often through key risk indicators (KRIs). Some organizations also use risk capacity, the maximum risk the organization could absorb before failing, which appetite should stay well below. Think of three nested levels: capacity is the outer limit of survival, appetite is the chosen target zone inside it, and tolerance is the measurable band of acceptable deviation for each objective.",
   "Turning appetite into practice follows a sequence. Leadership agrees an appetite statement, often with help from the chief risk officer and the information security manager. The manager translates it into tolerances and criteria the program can use: for example, which risk ratings require treatment, how fast critical vulnerabilities must be fixed, and which management level may accept each rating. These criteria go into policy and the risk management procedure. Risks are then assessed, compared with the criteria, and either treated, accepted by the right authority, or escalated.",
   "Appetite drives the security program in practical ways. It tells you which risks must be treated, how far residual risk must be reduced, which exceptions can be approved and at what level, and where to spend limited budget. A low appetite for customer data exposure means controls around customer data get priority. A higher appetite for risk in internal tools may allow lighter controls there. Alignment means security decisions are made in this business context. The manager translates security risks into business impact, compares them with appetite and tolerance, and presents options to the risk owner. If residual risk after treatment still exceeds appetite, it goes to senior management for further treatment or formal acceptance by someone with authority. The security team does not quietly accept risk or quietly lower ratings to make them fit.",
   "Appetite should be reviewed as strategy and conditions change. A company that becomes publicly listed, enters a regulated market or suffers a major incident may lower its appetite in some areas; a company chasing rapid growth may raise it in others. The information security manager should prompt that review when conditions change, because an outdated appetite leads to outdated priorities.",
   "Consider a worked example. An online retailer's board sets a low appetite for payment data exposure and a tolerance of zero unencrypted card numbers in storage. When a routine data discovery scan finds card numbers in a debug log file, the volume is small, but the finding breaches tolerance, so it is escalated at once to the risk owner, the head of e-commerce. The team purges the logs, fixes the logging configuration and adds a scan to the release pipeline. At the same time, the board accepts a moderate risk of short outages during a rapid expansion into new markets, so the security manager does not demand the same rigor for a new marketing site.",
   "Common mistakes: believing the security team sets appetite; using appetite and tolerance as synonyms; treating tolerance as permission to ignore a deviation rather than a threshold that triggers action; lowering a risk rating so it fits within appetite; and assuming appetite should be as low as possible everywhere. An organization with near-zero appetite for every risk cannot innovate, and a security program that ignores the business's willingness to take risk will be seen as an obstacle.",
   "Exam questions use clear clue words. 'Who determines the level of acceptable risk' points to senior management or the board. 'Acceptable deviation' or 'measurable threshold' points to tolerance. 'Maximum the organization can bear' points to capacity. 'Residual risk exceeds appetite' points to escalation to senior management for a decision on more treatment or formal acceptance. 'Security investment should be based on' points to the organization's risk appetite and business objectives rather than technical best practice alone."
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
   ],
   [
    "Risk acceptance criteria",
    "Defined rules stating which risk levels may be accepted and by which level of management."
   ],
   [
    "Escalation",
    "Referring a risk that exceeds someone's authority or the appetite to a higher level for decision."
   ]
  ],
  "example": "A hospital's board states a very low appetite for risks that could harm patients and a moderate appetite for administrative system outages. When a vulnerability is found in both an infusion pump network and the staff scheduling system, the security manager treats the medical device issue as urgent and funds network isolation immediately, while scheduling the administrative fix into the next maintenance cycle, with both decisions recorded against the appetite statement.",
  "tip": "Appetite is set by senior management. If residual risk exceeds it, the answer is escalation for a decision, never self-acceptance by the security manager or changing the rating.",
  "check": [
   [
    "Who sets risk appetite?",
    "The board and senior management."
   ],
   [
    "How does risk tolerance differ from risk appetite?",
    "Appetite is the broad level of acceptable risk; tolerance is the acceptable variation around it for a specific objective, often a measurable threshold."
   ],
   [
    "Residual risk after treatment still exceeds appetite. What should the security manager do?",
    "Escalate to senior management so they can decide on further treatment or formally accept the risk at the appropriate level."
   ],
   [
    "Why should appetite be reviewed periodically?",
    "Because business strategy, regulation and threats change, and an outdated appetite leads to outdated security priorities."
   ]
  ]
 },
 {
  "t": "Emerging risk and the threat landscape",
  "body": [
   "The threat landscape is the changing set of threat actors, their motives and the techniques they use. An information security manager must keep an informed view of it, because a risk assessment that was accurate last year may be wrong today. New attack methods, new technologies adopted by the business and changes in geopolitics all shift the likelihood of different events. Emerging risk is a new or changing risk whose likelihood or impact is not yet well understood, which means estimates will be uncertain and need regular revisiting.",
   "Threat actors are usually grouped by motive and capability: financially motivated criminals (ransomware groups, fraud rings, sellers of stolen access), nation-state actors seeking espionage or disruption, hacktivists seeking attention for a cause, insiders who are malicious or simply careless, and opportunists using freely available tools. Each group tends to prefer certain techniques and targets. Knowing which ones are interested in your industry helps you focus limited resources on the threats most likely to reach you.",
   "Emerging risk comes from both outside and inside. Outside, examples include new ransomware extortion tactics such as data theft plus encryption, attacks on software supply chains and managed service providers, abuse of artificial intelligence (AI) to scale convincing phishing and voice fraud, and weaknesses in widely used products. Inside, the business itself creates new risk when it adopts cloud services, connects operational technology (OT), launches AI features, allows personal devices, or relies on a new outsourcing partner. The manager should be involved early in those business changes, because that is when security requirements are cheapest to add.",
   "Threat intelligence is the input that keeps this view current. Strategic intelligence (trends and actor motives) informs executives and strategy. Operational intelligence describes specific campaigns and their timing. Tactical intelligence covers techniques, often mapped to frameworks such as MITRE ATT&CK (Adversarial Tactics, Techniques and Common Knowledge), and technical indicators of compromise (IOCs) such as malicious domains or file hashes, which help defenders tune detection. Sources include government advisories, industry sharing groups called Information Sharing and Analysis Centers (ISACs), vendor reports and your own incident data. Intelligence is only useful if it changes decisions.",
   "When new threat information arrives, work through a short sequence. First, assess relevance: does the threat target our industry, region or type of organization? Second, assess exposure: do we use the affected technology, and where? Third, assess control effectiveness: would our current controls prevent or detect the technique? Only then decide whether to change controls, priorities or the risk register, and communicate to risk owners in business terms. Buying a product or disconnecting systems on the strength of a headline, without that analysis, is the reaction CISM questions want you to avoid. Many organizations also run a periodic horizon scan, a structured review of trends over the next one to three years, and feed its output into strategy.",
   "Consider a worked example. A regional credit union receives an ISAC alert about attackers abusing a popular remote-support tool to reach bank networks. The security manager confirms that two branches use that tool, checks the configuration, and finds that one branch has MFA (multifactor authentication) disabled and no logging to the central security information and event management (SIEM) system. She updates the risk register entry for third-party remote access, assigns the branch operations manager as risk owner, sets a two-week remediation deadline, and reports the change in exposure at the next risk committee. No new product was needed; existing controls were applied consistently.",
   "Common mistakes: reacting to headlines instead of assessing exposure; treating threat intelligence as a feed of indicators only, without strategic analysis for leadership; ignoring internal sources of emerging risk such as new business initiatives; and leaving the risk register unchanged after significant new threat information. Another mistake is assuming a threat is irrelevant because the organization is small. Opportunistic attackers scan widely and do not choose targets by size.",
   "Exam questions often start with 'a new threat has been reported' or 'the organization plans to adopt a new technology'. The first clue points to assessing relevance and exposure before acting. The second points to involving security early and performing a risk assessment of the new technology. 'Best source of information about industry-specific threats' often points to an ISAC. 'Inform executives about long-term trends' points to strategic intelligence, while 'tune detection rules' points to tactical intelligence."
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
   ],
   [
    "Indicator of compromise (IOC)",
    "A technical artifact, such as a malicious domain or file hash, that suggests a system may be compromised."
   ],
   [
    "Horizon scanning",
    "A periodic structured review of trends that could create new risks over the coming years."
   ]
  ],
  "example": "A logistics company plans to let staff use a public generative AI service to draft customer emails. The security manager joins the project early, identifies the risk that customer data could be pasted into an external service, and recommends an approved enterprise tool with data retention controls plus clear usage guidance. The business owner accepts the approach, and the new risk is added to the register with a review in six months.",
  "tip": "New threat information triggers assessment of relevance and exposure first. Answers that buy tools, notify customers or cut connectivity before assessing are usually wrong.",
  "check": [
   [
    "What should you do first with a new threat report?",
    "Assess whether it is relevant and whether the organization is exposed to the techniques it describes."
   ],
   [
    "Give two internal sources of emerging risk.",
    "Adopting new technologies (for example cloud or AI) and new business relationships such as outsourcing partners."
   ],
   [
    "Which type of threat intelligence is most useful for the board?",
    "Strategic intelligence, because it describes trends and actor motives in terms that inform strategy and investment."
   ],
   [
    "When should security be involved in a plan to adopt a new technology?",
    "Early, during planning, so risks are assessed and requirements built in when changes are cheapest."
   ]
  ]
 },
 {
  "t": "Vulnerability and control deficiency analysis",
  "body": [
   "A vulnerability is a weakness that a threat could exploit. It may be technical, such as missing patches, default credentials or misconfigured cloud storage, or non-technical, such as an untrained team, a weak process or a single person holding critical knowledge. Risk exists where a relevant threat meets a vulnerability in an asset that matters. Vulnerability analysis finds these weaknesses so the risk can be assessed and treated, and it is one of the main inputs to the risk register.",
   "Technical vulnerability information comes from scanning, penetration tests, configuration reviews against a baseline, code analysis and vendor advisories. Each published vulnerability usually has a Common Vulnerabilities and Exposures (CVE) identifier, and the Common Vulnerability Scoring System (CVSS) rates its technical severity. CVSS scores are useful, but they are not business risk. A critical flaw on an isolated test server may matter less than a medium flaw on the internet-facing payment system. The manager's job is to add business context: asset value, exposure to attackers, whether the flaw is being actively exploited, and compensating controls already in place.",
   "A vulnerability management process works as a cycle. Maintain an asset inventory so you know what should be scanned. Scan and test on a schedule and after significant changes, using authenticated scans where possible. Analyze and prioritize findings with business context. Assign remediation to owners with deadlines set by policy, for example shorter deadlines for critical findings on exposed systems. Verify fixes with a rescan. Report trends such as overdue findings and mean time to remediate. Findings that cannot be fixed on time go through a documented exception process with risk owner approval.",
   "Control deficiency analysis looks at your defenses instead of at weaknesses in systems. It compares the controls that should exist, as required by policy, regulation or the risk assessment, with the controls that actually exist and work. A deficiency can be one of design (the control, even if it runs perfectly, would not meet the objective) or one of operation (the control is well designed but is not performed consistently). Audit findings, control self-assessments, control testing and incident post-mortems are common sources. Both analyses feed the risk register: each significant weakness is linked to the risks it increases, rated in business terms and assigned to an owner.",
   "When a weakness cannot be fixed directly, for example a legacy system that cannot be patched, the next step is to analyze the risk and consider compensating controls such as network isolation, stricter access and extra monitoring, and then let the business owner decide. Remember also that absence of evidence is not evidence of absence. A clean scan may mean the scanner could not authenticate or did not reach a network segment. Validate coverage before reporting that a weakness does not exist.",
   "Consider a worked example. An audit finds that quarterly access reviews for the finance system are documented, but reviewers approve every account without checking; one reviewer approved 400 accounts in four minutes. The control is well designed but not operating effectively. The manager rates the deficiency high because the finance system handles payments, assigns the finance director as owner, and agrees on changes: reviewers receive shorter lists showing each user's role and last login, and security performs spot checks of reviewer decisions. Separately, a scan of the same system shows a medium-severity flaw, but it is reachable only from an isolated admin network, so it is scheduled normally rather than as an emergency.",
   "Common mistakes: equating CVSS severity with business risk; treating a clean scan as proof of security without checking coverage; fixing symptoms without asking why a control failed; confusing a design deficiency with an operating deficiency; and letting the security team decide alone that an unfixable vulnerability is acceptable. Another trap is focusing only on technical weaknesses. People and process gaps, such as no second approver for payments, often create larger risks than a missing patch.",
   "On the exam, 'a penetration test reports a critical vulnerability' usually leads to an answer that adds business context or assesses the risk before acting. 'The vulnerability cannot be patched' points to compensating controls and a risk decision by the owner. 'The control exists but was not performed' points to an operating deficiency; 'the control would not work even if performed' points to a design deficiency. 'Most important factor in prioritizing remediation' points to business impact and exposure rather than raw scores."
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
    "CVE",
    "Common Vulnerabilities and Exposures: a public identifier assigned to a specific known vulnerability."
   ],
   [
    "Compensating control",
    "An alternative control that meets the intent of a required control that cannot be implemented."
   ],
   [
    "Design deficiency",
    "A weakness where a control would not meet its objective even if performed perfectly."
   ],
   [
    "Operating deficiency",
    "A weakness where a well-designed control is not performed consistently or correctly."
   ]
  ],
  "example": "A factory runs a production controller on an operating system the vendor no longer supports, and upgrading would require replacing a machine line. The security manager documents the vulnerability, proposes isolating the controller on its own network segment with a jump host, strict access and monitoring, and presents the residual risk to the plant director, who accepts it for two years while a replacement is budgeted.",
  "tip": "Technical severity is not business risk. When a question gives a tester's 'critical' rating, the best answer adds business context such as asset value, exposure and exploitability.",
  "check": [
   [
    "What is the difference between a design deficiency and an operating deficiency?",
    "A design deficiency means the control would not meet its objective even if performed perfectly; an operating deficiency means a well-designed control is not performed consistently."
   ],
   [
    "What should happen when a vulnerability cannot be fixed?",
    "Analyze the resulting risk, evaluate compensating controls, and present options to the business owner for a decision."
   ],
   [
    "Why is a CVSS score alone not enough to prioritize remediation?",
    "It rates technical severity but ignores asset value, exposure, active exploitation and existing controls in your environment."
   ],
   [
    "A vulnerability scan comes back clean. What should you confirm before reporting it?",
    "That the scan had full coverage and could authenticate, since a clean result may reflect missed systems rather than no weaknesses."
   ]
  ]
 },
 {
  "t": "Risk assessment methods: qualitative, quantitative and semi-quantitative",
  "body": [
   "Risk assessment identifies risks, analyzes their likelihood and impact, and evaluates them against the organization's criteria so they can be prioritized. The purpose is to choose and fund controls in proportion to risk. There are three broad ways to analyze risk: qualitative, quantitative and semi-quantitative. The CISM exam expects you to know how each works, its strengths and weaknesses, and when each fits. Whatever the method, a good assessment follows the same steps: define scope and criteria; identify assets and their value, threats, vulnerabilities and existing controls; estimate likelihood and impact; evaluate the results against appetite; and record them with owners. It is repeated periodically and whenever significant change occurs.",
   "Qualitative analysis uses descriptive scales such as low, medium and high for likelihood and impact, often combined in a heat map, a grid that colors each combination. It is quick, easy to explain, involves business managers readily and is useful when reliable numbers are not available. Its weakness is subjectivity: two people may rate the same risk differently, and 'high' does not tell an executive how much money is at stake. Clear definitions for each level, such as 'high impact means a loss above a set amount or a regulatory sanction', reduce that problem.",
   "Quantitative analysis uses numbers. The classic formulas are single loss expectancy (SLE) = asset value (AV) x exposure factor (EF), and annualized loss expectancy (ALE) = SLE x annualized rate of occurrence (ARO). The exposure factor is the percentage of the asset's value lost in one event, and ARO is how many times per year the event is expected, so an event every 20 years has an ARO of 1/20 = 0.05. A control is financially justified when the reduction in ALE is greater than its annual cost.",
   "```text\nAV  = 500,000   EF = 40%\nSLE = 500,000 x 0.40 = 200,000\nARO = once every 20 years = 0.05\nALE = 200,000 x 0.05 = 10,000 per year\nControl value = ALE before - ALE after - annual control cost\n```",
   "More advanced methods work with ranges instead of single values. Factor Analysis of Information Risk (FAIR) breaks risk into loss event frequency and loss magnitude, and Monte Carlo simulation runs thousands of random trials using those ranges to produce a distribution of possible annual losses. These give executives a realistic spread, such as 'a 10 percent chance of losing more than a given amount this year', but they need credible data and skilled analysts. Semi-quantitative analysis sits between the approaches. It assigns numbers to qualitative categories, for example likelihood and impact each scored from 1 to 5, and multiplies or adds them to rank risks. It is common in risk registers because it is consistent and sortable. Remember that the numbers are ordinal: a score of 20 is not 'twice as risky' as 10 in money terms.",
   "Consider a worked example. A retailer estimates that a point-of-sale outage costs 80,000 per occurrence and happens about twice a year, giving an ALE of 160,000. A redundant network link costing 30,000 a year would cut the ARO to 0.5, lowering ALE to 40,000. The control removes 120,000 of expected loss for 30,000 a year, a clear case. For its dozens of other risks, where loss data is thin, the same retailer uses a 5x5 semi-quantitative scale to rank them quickly and saves detailed quantitative work for the top few.",
   "Common mistakes: using SLE when the question asks for ALE; multiplying by the number of years instead of dividing (an event every 4 years has ARO 0.25, not 4); treating semi-quantitative scores as real money; presenting quantitative results as precise when the inputs are guesses; and believing qualitative analysis is useless. In practice most organizations combine methods, using qualitative or semi-quantitative ranking for breadth and quantitative analysis for the decisions that need cost-benefit justification.",
   "Exam questions word this area in predictable ways. 'Cost-benefit', 'justify the investment' or 'express in monetary terms' point to quantitative analysis. 'Limited data', 'quick prioritization' or 'subjective' point to qualitative. 'Numeric scores for ranking' points to semi-quantitative. 'Greatest weakness of qualitative analysis' is subjectivity; 'greatest weakness of quantitative analysis' is dependence on reliable data and the effort to gather it. Always check units: ARO is per year, and ALE is a yearly amount."
  ],
  "terms": [
   [
    "Single loss expectancy (SLE)",
    "Expected loss from one occurrence: asset value multiplied by exposure factor."
   ],
   [
    "Exposure factor (EF)",
    "The percentage of an asset's value expected to be lost in a single event."
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
    "Heat map",
    "A grid showing likelihood against impact, colored to show risk levels, used in qualitative analysis."
   ],
   [
    "Semi-quantitative analysis",
    "Assigning numeric scores to qualitative categories so risks can be ranked consistently."
   ],
   [
    "FAIR",
    "Factor Analysis of Information Risk: a quantitative model that estimates risk as ranges of loss frequency and magnitude."
   ]
  ],
  "example": "An insurer's board asks whether to spend 250,000 a year on a data loss prevention program. The risk team uses FAIR with ranges from industry data and internal incidents, finds the expected annual loss from data leakage falls from about 900,000 to about 400,000, and shows a range of outcomes. The board approves because the analysis states its assumptions and the reduction clearly exceeds the cost.",
  "tip": "Practice the arithmetic: SLE = AV x EF, ALE = SLE x ARO, and an event every N years has ARO = 1/N. Distractors often use the SLE as the answer or multiply by N instead of dividing.",
  "check": [
   [
    "An asset worth 100,000 has an EF of 30% and an ARO of 0.5. What is the ALE?",
    "SLE = 30,000; ALE = 30,000 x 0.5 = 15,000 per year."
   ],
   [
    "When is qualitative analysis the better choice?",
    "When reliable data on losses and frequency is not available or a quick prioritization is needed."
   ],
   [
    "What is the main weakness of semi-quantitative scores?",
    "They are ordinal rankings, so arithmetic on them does not represent real monetary differences in risk."
   ],
   [
    "When is a control financially justified in quantitative terms?",
    "When the reduction in ALE it produces is greater than its annual cost."
   ]
  ]
 },
 {
  "t": "Risk scenarios, likelihood and impact",
  "body": [
   "A risk scenario is a short, realistic description of how a loss could happen. It connects the pieces of risk into a story that business managers can understand: a threat (who or what), acting through a vulnerability (how), against an asset (what is affected), with a business consequence (why it matters). 'A criminal group phishes a finance employee, uses the stolen credentials to change a supplier's bank details, and diverts a 250,000 payment' is a scenario. 'Phishing' by itself is not; it is only a threat technique. Scenarios are the bridge between technical findings and business decisions.",
   "Scenarios can be built top-down, starting from business objectives and asking what events would threaten them, or bottom-up, starting from known threats and vulnerabilities and asking what they could affect. Top-down scenarios keep the focus on what matters to leadership; bottom-up scenarios make sure technical realities are not missed. Using both catches more. Good scenarios are specific enough to estimate and treat, but not so broad that they cover everything or so narrow that you need thousands of them. Many organizations maintain a library of a few dozen scenarios that cover their main exposures, reviewed each year.",
   "Writing a scenario follows a simple pattern. Name the actor and motive, the method and weakness exploited, the asset or process affected, the effect on confidentiality, integrity or availability, and the business consequence with a rough size. Then list the existing controls that reduce likelihood or impact. A useful template reads: 'Actor, through method, exploits weakness in asset, causing effect, leading to business consequence.' Workshops with process owners are the best way to fill it in, because they know the real consequences and workarounds.",
   "Likelihood is the chance the scenario occurs in a given period. It depends on threat motivation and capability, how exposed the vulnerability is, and how effective existing controls are. Sources include incident history, industry data, threat intelligence and expert judgment. Impact is the consequence if it occurs: financial loss, operational disruption, legal and regulatory penalties, reputational damage and harm to people. Impact should be expressed in business terms and often has several dimensions, so organizations use impact tables that define what 'minor', 'moderate' and 'severe' mean for each dimension. When dimensions disagree, the highest rating usually drives the overall impact.",
   "It is useful to distinguish inherent risk, the level before considering controls, from residual risk, after existing controls. The difference shows how much the organization depends on its controls, which helps decide what to test and monitor. If a key control fails, risk moves back toward the inherent level, so a scenario with high inherent and low residual risk deserves strong control assurance. Scenarios also make risk discussions productive. Instead of arguing about whether 'cloud risk' is high, managers can discuss one clear event, its causes and consequences, and the options to reduce it.",
   "Consider a worked example. A manufacturer writes the scenario: 'A ransomware group gains entry through a contractor's remote access account without MFA, encrypts production scheduling servers, and halts two plants for five days, costing about 3 million in lost output and late delivery penalties.' Inherent likelihood is rated high because the industry is heavily targeted. Existing controls, such as daily backups, cut impact somewhat, but restore tests show recovery would take four days. Managers can now evaluate specific options against that story: enforcing MFA on contractor access, segmenting the plant network and speeding up recovery, and compare their cost with the loss.",
   "Common mistakes: writing scenarios that name only a threat or only a tool; expressing impact in technical terms, such as 'server encrypted', instead of business terms; ignoring existing controls, which overstates residual risk; estimating likelihood without any evidence; and building so many scenarios that none are maintained. Another trap is rating impact only on direct financial loss and forgetting regulatory, safety and reputational consequences.",
   "Exam questions test scenarios through their parts. 'Most useful for communicating risk to business managers' points to risk scenarios. 'Level of risk before controls' points to inherent risk; 'after controls' points to residual risk. 'Factor that most affects likelihood' is often threat capability combined with exposure and control effectiveness. 'Impact should be expressed in' points to business terms. When an option describes a complete event with threat, vulnerability, asset and consequence, it is usually the strongest scenario."
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
   ],
   [
    "Residual risk",
    "The level of risk that remains after existing controls are taken into account."
   ],
   [
    "Impact table",
    "A defined scale explaining what each impact level means for each consequence type, used to rate impact consistently."
   ]
  ],
  "example": "A charity's risk workshop replaces the vague entry 'cyber attack' with three scenarios: a donor database leak through a misconfigured cloud bucket, a payment redirection fraud by email, and a website outage during a major appeal. Each has an owner, a likelihood, an impact in donations and reputation, and listed controls, so trustees can see which one needs funding first.",
  "tip": "A complete scenario has a threat, a vulnerability, an asset and a business consequence. Options that mention only a tool, only a threat or only a technical effect are incomplete.",
  "check": [
   [
    "What four elements should a risk scenario include?",
    "A threat, the vulnerability it exploits, the affected asset and the business consequence."
   ],
   [
    "What is the difference between inherent and residual risk?",
    "Inherent risk ignores controls; residual risk is what remains after existing controls are applied."
   ],
   [
    "Why are risk scenarios useful when talking to business managers?",
    "They describe risk as a concrete event with business consequences, which managers can understand, estimate and decide on."
   ],
   [
    "A scenario has high inherent risk but low residual risk. What does that tell you?",
    "The organization relies heavily on its controls, so those controls need strong assurance and monitoring."
   ]
  ]
 },
 {
  "t": "Risk treatment options: mitigate, transfer, avoid, accept",
  "body": [
   "Once a risk has been assessed and compared with appetite, the owner chooses how to respond. There are four classic options: mitigate, transfer, avoid and accept. CISM expects you to recognize them from scenarios, to know who chooses among them, and to understand that treatment is a business decision informed by security advice, not a technical decision made by the security team.",
   "Mitigation (also called reduction or modification) applies controls that lower likelihood, impact or both. Examples include multifactor authentication to reduce account takeover, backups to reduce the impact of ransomware, or segmentation to limit spread. Controls can be preventive, detective, corrective, deterrent or compensating, and they can be administrative, technical or physical. Mitigation is the most common response, and the goal is to bring residual risk within appetite at a reasonable cost, not to reach zero. When choosing controls, compare their full cost, including staff time and effect on operations, with the reduction in expected loss, and prefer controls that address several risks at once. A mitigation plan is not complete until the control is implemented and verified to work, because an approved control that never operates leaves the risk exactly where it was.",
   "Transfer (or sharing) moves some of the financial impact to another party, usually through insurance or contracts. Cyber insurance can pay for forensic work, legal costs, notification and some losses. Contract clauses such as indemnities shift some costs to suppliers. Outsourcing can shift operational burden to a provider. But transfer never moves accountability: the organization still owns its data, still answers to regulators and customers, and still suffers reputational damage. Insurers also usually require baseline controls and may refuse claims if stated controls were not in place.",
   "Avoidance means stopping or not starting the activity that creates the risk: not entering a market, not collecting a type of data, retiring a risky system. It removes the risk entirely but also the benefit of the activity, so it is chosen when the risk clearly outweighs the value. Acceptance means consciously deciding to bear the risk, typically because it is within appetite or because treatment costs more than the expected loss. Acceptance must be an informed, documented decision by someone with authority, with a review date. Ignoring a risk is not acceptance. Accepted risks should be recorded in the register, monitored, and revisited on their review date or sooner if conditions change.",
   "Treatment follows a sequence. The security manager presents options with cost, effort and expected residual risk. The risk owner selects the response. A treatment plan records actions, owners, deadlines and the expected residual rating. After implementation, residual risk is compared with appetite again; if it is still too high, the owner must choose more treatment or escalate for formal acceptance at a higher level. Treatment choices are usually combined: a company may mitigate ransomware with backups and endpoint detection, transfer part of the residual financial impact through insurance, and accept what remains.",
   "Consider a worked example. A clinic stores old patient images on a server that cannot be secured affordably. The security manager lays out options and costs. The clinic director, as risk owner, decides to delete images beyond the legal retention period (avoidance for that data), encrypt and restrict access to the rest (mitigation), confirm the cyber insurance policy covers breach notification costs (transfer), and formally accept the small remaining risk in writing, with a review in twelve months. The decision and its rationale go into the risk register.",
   "Common mistakes: believing insurance reduces the likelihood of an incident; believing outsourcing or insurance transfers accountability; letting the security manager accept risk on the owner's behalf; recording 'accepted' for risks nobody formally reviewed; and choosing avoidance without considering the business value lost. Another trap is treating mitigation as the automatic answer. If the cost of a control exceeds the value it protects, acceptance may be the right, well-documented choice.",
   "Exam questions usually describe an action and ask which response it is. 'Purchase insurance' or 'contractual indemnity' points to transfer. 'Discontinue the service' or 'do not collect the data' points to avoidance. 'Implement a control' points to mitigation. 'Cost of the control exceeds the expected loss and management signs off' points to acceptance. 'Who decides the treatment' points to the risk owner, and 'residual risk still above appetite' points to escalation to senior management."
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
   ],
   [
    "Treatment plan",
    "A record of the chosen response, actions, owners, deadlines and expected residual risk."
   ],
   [
    "Cyber insurance",
    "A policy that covers some financial costs of security incidents, such as forensics, legal fees and notification."
   ]
  ],
  "example": "An online travel agency finds that storing card numbers for repeat bookings creates heavy compliance and breach risk. The business owner decides to stop storing card data and use a payment provider's tokens instead, avoiding most of the risk, while mitigating the rest with strong access controls on the booking system and accepting the small residual risk in writing.",
  "tip": "Insurance transfers financial impact, not accountability or legal responsibility. And the security manager never accepts risk on the owner's behalf.",
  "check": [
   [
    "A business owner declines a control because it costs more than the expected loss. Which response is this?",
    "Risk acceptance, which must be documented and approved by someone with the authority."
   ],
   [
    "Does buying cyber insurance reduce the likelihood of a breach?",
    "No. It affects financial impact after an event, not the probability of the event."
   ],
   [
    "A company stops offering a product because its risk is too high. Which response is this?",
    "Risk avoidance, which removes the risk along with the benefit of the activity."
   ],
   [
    "Who selects the risk treatment option?",
    "The risk owner, based on options and analysis provided by the information security manager."
   ]
  ]
 },
 {
  "t": "Risk and control ownership",
  "body": [
   "Every risk needs an owner, and every control needs an owner, but they are usually not the same person. Getting ownership right is one of the most tested ideas in CISM because it decides who makes which decisions. When ownership is unclear, risks drift without treatment and controls decay without anyone noticing.",
   "A risk owner is the person accountable for managing a particular risk. That is normally the business manager responsible for the process or asset affected, because they have the authority to accept trade-offs and fund treatment. The owner decides the response, approves treatment plans, accepts residual risk within their authority and escalates when risk exceeds it. The information security manager identifies risks, analyzes them and advises, but does not become the owner simply by finding a risk. The CISO owns risks only in areas the CISO actually runs, such as the security operations function itself.",
   "A control owner is responsible for making a specific control work: designing it, operating it, maintaining it and providing evidence that it is effective. Control owners are often in IT, security or operations, but can be business staff too, such as a finance manager who performs payment approvals. For example, the head of online sales owns the risk of fraudulent orders; the fraud analytics team owns the transaction-monitoring control; the IT team owns the web application firewall. A control can reduce several risks, and a risk usually relies on several controls, so the relationship is many-to-many, and the register should show those links clearly.",
   "Ownership is assigned and maintained through a clear process. When a risk is identified, the security or risk function proposes an owner based on which process it affects, and the owner confirms. The risk register records the owner by role, not only by name, so ownership survives staff changes. Control owners attest to control operation on a schedule and supply evidence for testing. When people change jobs or reorganizations happen, ownership is reassigned explicitly. A small register extract might show: risk ID, scenario, risk owner (head of online sales), key controls with their owners (fraud analytics lead, IT infrastructure manager), residual rating and next review.",
   "Ownership should sit at the right level. A risk that could cost millions or threaten regulatory standing needs an owner with matching authority; a junior manager cannot accept it. Many organizations define acceptance limits: for example, managers can accept risks rated low, directors medium, and only executives high, with anything above appetite going to the executive committee or board. When residual risk is above an owner's limit, escalation is required. Clear ownership prevents two failures: without a risk owner, no one feels authorized to accept or fund treatment; without control owners, no one checks that controls still run. Ownership also makes reporting meaningful, because each line in a risk report points to a person who can answer for it.",
   "Consider a worked example. A payroll process risk, 'an insider changes employee bank details to divert salaries', is rated high. The payroll manager, the risk owner, can accept only medium risks, so she escalates to the chief financial officer (CFO). The IT access team, as control owner for payroll system access reviews, reports that reviews are only 70 percent complete this quarter, and the payroll supervisor, owner of the second-approver control on bank detail changes, reports it is working. The CFO uses this information to fund automated access reviews rather than accept the risk as it stands.",
   "Common mistakes: making the CISO the owner of every security risk; assigning risk ownership to IT because the affected system is technical; leaving ownership to a committee, which spreads accountability so thin that no one acts; failing to update owners after reorganizations; and letting control owners report control health only to security, not to the risk owners who rely on those controls.",
   "Exam questions test ownership with simple wording. 'Who should decide whether to accept' or 'who is accountable for the risk' points to the business risk owner. 'Who should provide evidence the control works' points to the control owner. 'Risk above the owner's authority' points to escalation. 'Most important element of a risk register entry' is often the assigned owner, because without one no one acts. Identifying a risk never makes security its owner."
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
   ],
   [
    "Attestation",
    "A control owner's formal confirmation, usually periodic, that a control operated as designed."
   ],
   [
    "Escalation",
    "Referring a risk to a higher level of management when it exceeds the current owner's authority."
   ],
   [
    "Role-based ownership",
    "Assigning ownership to a job role rather than only a named person, so it survives staff changes."
   ]
  ],
  "example": "After a reorganization, a university's research data risks still list a dean who left a year ago as owner. Nobody has reviewed them since. The security manager raises this at the risk committee, the provost assigns ownership to the new vice-provost for research by role, and each risk is reassessed within a month, uncovering two expired exceptions.",
  "tip": "Identifying a risk does not make security its owner. Look for the business manager accountable for the affected process, and remember that control owners and risk owners have different jobs.",
  "check": [
   [
    "Who should own a risk affecting the online ordering process?",
    "The business manager accountable for that process."
   ],
   [
    "What does a control owner do?",
    "Designs, operates and maintains a specific control and provides evidence that it works."
   ],
   [
    "A risk owner's residual risk exceeds her acceptance authority. What should happen?",
    "She escalates it to the level of management with authority to accept it or fund further treatment."
   ],
   [
    "Why should risk ownership be assigned by role rather than only by name?",
    "So ownership continues when people change jobs, preventing orphaned risks."
   ]
  ]
 },
 {
  "t": "Risk registers, key risk indicators and risk monitoring",
  "body": [
   "A risk register is the central record of an organization's identified risks. It lets the organization see its exposure in one place, track treatment and report consistently. Without one, risks live in scattered spreadsheets, audit reports and people's memories, and leadership cannot tell whether exposure is rising or falling. The register is also the evidence that risk management actually happens, which auditors and regulators often ask to see. Each entry typically includes a unique ID, the risk scenario, the risk owner, inherent likelihood and impact, existing controls and their owners, residual rating, the chosen response, treatment actions with owners and due dates, status, linked KRIs and the next review date. A simplified entry might look like this:",
   "```text\nID: R-017   Scenario: Ransomware via unpatched VPN halts order processing\nRisk owner: Head of operations   Inherent: High   Residual: Medium\nControls: MFA on VPN (IT), patch SLA 14 days (IT), offline backups (IT)\nResponse: Mitigate   Action: Replace legacy VPN by Q3 (owner: IT manager)\nKRI: % critical VPN patches overdue (amber > 0, red > 2 days late)\nNext review: monthly\n```",
   "A register is a living tool. Risks change as the business, threats and controls change, so entries need regular review, and new risks must be added when projects, vendors or incidents reveal them. Many organizations review high risks monthly and the rest quarterly. Closed risks stay in the history so trends can be seen. A register that is filled in once for an audit and then ignored gives false comfort. Keep it at a useful level of detail: individual vulnerabilities belong in the vulnerability management system and are linked to the register risks they affect, rather than listed one by one.",
   "Key risk indicators (KRIs) are metrics that signal changes in risk exposure, ideally before a loss happens. Good KRIs are linked to specific risks, measurable, available regularly, cost-effective to collect and have thresholds that trigger action. Examples include the percentage of critical systems with overdue patches, the number of privileged accounts without recent review, failed backup jobs for critical data, or the number of vendors with expired assessments. When a KRI crosses its threshold, the risk owner is alerted and the risk is reassessed. KRIs differ from key performance indicators (KPIs). A KPI measures how well a process is performing against its target, such as the percentage of incidents closed within the service level agreement (SLA). A KRI tells you risk is rising. The same data can sometimes serve both, but ask which question the metric answers.",
   "Risk monitoring combines the register, KRIs, control testing results, audit findings, incident data and threat intelligence to keep leadership's view accurate. The outcome is timely decisions: tightening controls when KRIs worsen, closing treatment actions that are done, revisiting acceptance decisions when their review dates arrive, and adding new risks when the business changes. Monitoring also checks that treatment actually worked: if a control was added but the KRI does not improve, the treatment needs another look.",
   "Consider a worked example. A university sets a KRI for 'privileged accounts not reviewed in 90 days' with an amber threshold of 5 and a red threshold of 15. After a system migration the count jumps to 22. The governance, risk and compliance (GRC) tool alerts the chief information officer (CIO), who is the risk owner, and the register entry is flagged for reassessment. A review is completed within two weeks, eight accounts are removed, and the migration checklist is updated so reviews carry over automatically.",
   "Common mistakes: treating the register as a compliance document rather than a management tool; listing risks without owners or review dates; choosing KRIs that are easy to count but not linked to risk, such as the number of firewalls; setting thresholds with no defined action; and confusing lagging measures of past losses with leading indicators of rising exposure.",
   "Exam questions in this area often ask for the 'primary purpose' of the register (to record and track risks with owners in one place for monitoring and reporting) or for the 'best KRI' among options. Choose the metric that is linked to a specific risk, predictive and threshold-driven. 'Process performance against a target' points to a KPI. 'Early warning' or 'leading indicator' points to a KRI. 'Most important attribute of a KRI' is often its relevance to a specific risk, or its ability to predict change. 'KRI crossed its threshold' points to alerting the owner and reassessing the risk."
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
   ],
   [
    "Leading indicator",
    "A metric that changes before a loss occurs, giving early warning."
   ],
   [
    "Lagging indicator",
    "A metric that reports what has already happened, such as losses or incidents in the last quarter."
   ],
   [
    "Risk monitoring",
    "Ongoing tracking of risks, indicators, controls and events so that decisions stay current."
   ]
  ],
  "example": "A payments company tracks a KRI for 'vendors with access to card data whose security assessment has expired'. The threshold is zero. When two vendors lapse after a procurement backlog, the KRI turns red, the head of procurement as risk owner is notified automatically, and both assessments are completed within a month while the vendors' access is restricted to essential functions.",
  "tip": "KRIs look forward and signal rising exposure; KPIs measure performance. Counts of tools, staff certifications or rules are rarely good KRIs.",
  "check": [
   [
    "What is the primary purpose of a risk register?",
    "To record identified risks with owners, ratings, responses and status in one place for monitoring and reporting."
   ],
   [
    "Give an example of a KRI.",
    "The percentage of critical systems missing patches beyond the policy deadline."
   ],
   [
    "What is the difference between a KRI and a KPI?",
    "A KRI signals that risk exposure is changing; a KPI measures how well a process performs against its target."
   ],
   [
    "A KRI crosses its red threshold. What should happen?",
    "The risk owner is alerted, the risk is reassessed and predefined actions or escalation are triggered."
   ]
  ]
 },
 {
  "t": "Reporting risk to senior management and the board",
  "body": [
   "Risk information is only useful if it reaches the people who can act on it, in a form they can use. Boards and executives have limited time and are not security specialists, so the information security manager must translate technical findings into business language and focus on what needs attention or decision. Good reporting lets leadership fulfil its governance duty: to know the organization's exposure, compare it with appetite, and direct resources accordingly.",
   "Different audiences need different reports. The board or its audit and risk committee needs a strategic view: top risks, trends, position against appetite, major program status and decisions needed. Executive management needs somewhat more detail to allocate resources and hold owners to account. Risk owners need their own risks, KRIs and overdue actions. Operational teams need detailed findings, such as vulnerability lists and control test results. Sending the same report to everyone either overwhelms the board or starves the engineers.",
   "An effective board-level risk report is short. It shows the top risks in business terms, the trend for each since the last report, whether exposure is within appetite, the status of major treatment programs and any decisions needed. A one-page dashboard with a heat map, trend arrows and a few KRIs often works better than a long document. Detailed vulnerability lists, tool architectures or the full risk register are appropriate for operational teams, not the board. Frame each risk by its effect on objectives: 'A prolonged outage of the order platform could halt online revenue of about 200,000 per day; current recovery capability is three days against a two-day tolerance.' That tells directors why it matters and what gap exists. Where uncertainty is large, say so honestly and give a range.",
   "Building a board report follows a repeatable process. Start from the risk register and select the handful of risks that are material or moving. Check each against appetite and tolerance. Summarize the trend and the reason for it, such as a new threat, a completed control or a business change. State the actions under way, their owners and dates. End with the decisions or support needed from the board. Test the draft on a non-technical executive before it goes out: if they cannot say what they are being asked to decide, rewrite it.",
   "Reporting should also be regular and predictable, with defined escalation for urgent issues. Significant new risks, KRIs crossing red thresholds or incidents with material impact should not wait for the next quarterly meeting. The escalation criteria should be agreed in advance so no one debates whether something is serious enough during a crisis. Reporting is also two-way. Board questions reveal what leadership cares about and whether appetite needs adjustment. Record board decisions, such as formal acceptance of a risk or approval of extra funding, and feed them back into the register and strategy.",
   "Consider a worked example. Each quarter a CISO gives the audit and risk committee a single page: five top risks with trend arrows, two KRIs in red, a note that third-party risk now exceeds appetite because several critical suppliers have not been assessed, and one decision request for funding a vendor monitoring service. Detailed metrics sit in an appendix for anyone who wants them. The committee asks why the supplier backlog grew, learns procurement bypassed the assessment step, approves the funding and directs procurement to fix its process. The decision is minuted and reflected in the register the next week.",
   "Common mistakes: presenting technical metrics such as blocked attacks or scanned hosts that do not show risk; delivering long reports with no clear decision request; reporting only good news, which destroys credibility when an incident occurs; filtering security findings through a unit that has a conflict of interest; and waiting for a scheduled meeting to report an urgent, material risk. Numbers without context, such as '3,000 vulnerabilities', mean little to a board; explain what they mean for objectives and whether the trend is acceptable.",
   "Exam questions usually ask what to include in a report to the board, or which metric is most useful to senior management. Clue words such as 'board', 'executive' or 'senior management' point to answers about top risks in business terms, trends, appetite and decisions. 'Most effective way to communicate risk' points to business impact language, often with scenarios or dashboards. 'Urgent risk discovered between meetings' points to escalation under agreed criteria. Options about detailed vulnerability counts, tool metrics or full register exports are usually meant for operational audiences."
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
   ],
   [
    "Audit and risk committee",
    "A board committee that oversees internal control, audit and risk on the board's behalf."
   ],
   [
    "Decision request",
    "A clear statement in a report of the approval or direction needed from leadership."
   ],
   [
    "Risk trend",
    "The direction a risk has moved since the last report, with the reason for the change."
   ]
  ],
  "example": "A retailer's CISO used to send the board a forty-page report of scan results and firewall statistics. Directors rarely read it. She replaces it with one page showing six business risks, whether each is within appetite, trend arrows and two decisions needed. At the next meeting the board spends twenty minutes on the risks, approves a recovery project for the e-commerce platform and asks for a deeper briefing on supplier risk.",
  "tip": "For the board, choose answers about top risks in business terms, trends and appetite. Technical detail and complete lists belong elsewhere.",
  "check": [
   [
    "What should a board risk report emphasize?",
    "Top risks in business terms, trends, position against appetite and decisions needed."
   ],
   [
    "Why agree escalation criteria in advance?",
    "So urgent risks reach leadership immediately without debate about whether they are serious enough."
   ],
   [
    "Why is the number of blocked attacks a poor board metric?",
    "It shows activity, not risk to business objectives or whether exposure is within appetite."
   ],
   [
    "What should happen after the board makes a risk decision?",
    "The decision is recorded and fed back into the risk register and strategy, with owners and actions updated."
   ]
  ]
 },
 {
  "t": "Program resources: people, processes, tools and technology",
  "body": [
   "An information security program is the organized set of activities, resources and controls that carries out the security strategy. It turns intentions into daily work: policies are maintained, access is reviewed, vulnerabilities are fixed, staff are trained and incidents are handled. Building it means deciding what resources are needed and where they come from. CISM expects you to plan resources from the strategy and its risk priorities, not from a wish list of products or a target headcount.",
   "People come first. A program needs leadership (the CISO or manager), specialists such as security architects, analysts, engineers and GRC (governance, risk and compliance) staff, and security responsibilities spread across IT, human resources, legal and business units. The key question is not headcount but skills: does the organization have the capabilities the strategy requires? A skills inventory, listing the capabilities each role needs and who currently has them, shows the gaps. Gaps can be closed by hiring, training existing staff, rotating people into security roles, or buying services such as managed detection and response (MDR), penetration testing or virtual CISO support. Plan for succession too, so no critical capability depends on one person.",
   "Processes are the repeatable ways work gets done: risk assessment, change management, access management, vulnerability management, incident response, vendor management, awareness and reporting. Well-defined processes make results consistent even when people change, and they are what maturity models measure. Each process should have an owner, documented steps, inputs and outputs, and metrics. Processes also connect the program to the rest of the business, for example security review inside the project approval process or security checks inside procurement.",
   "Tools and technology support people and processes. They include identity and access management (IAM), endpoint detection and response (EDR), logging and security information and event management (SIEM), email security, data protection and GRC platforms. Technology should be chosen to meet control objectives from the strategy, integrated with existing systems and supported by people who can run it. A powerful tool that no one has time to tune gives little protection, so every tool purchase should come with the staff time and process to operate it. Evaluate tools on how well they meet requirements, their total cost of ownership, and how they fit the architecture.",
   "Outsourcing and cloud services are part of resource planning. They can provide scale and expertise, but the organization keeps accountability for the risk, so outsourced functions need clear contracts, service levels, reporting and oversight by someone internal who understands the service. Budget, staff capacity and the organization's culture all limit what can be done at once, which is why the strategy's roadmap sequences initiatives realistically. A practical planning sequence is: list the capabilities the strategy needs, assess current people, processes and tools against them, decide build, buy or borrow for each gap, estimate cost and time, and put the result into the roadmap and budget.",
   "Consider a worked example. A 400-person firm's strategy calls for round-the-clock detection of attacks, but it has two security engineers and no night coverage. Hiring and training five analysts would take a year and cost more than the budget allows. The security manager contracts an MDR provider, assigns one internal engineer to manage the provider and tune alerts to the firm's environment, writes an escalation procedure so the provider knows whom to call at night, and defines monthly service reviews with metrics such as time to detect and time to escalate. The firm keeps accountability and knowledge in-house while buying the capacity it lacks.",
   "Common mistakes: equating more staff or more tools with a better program; buying technology before defining the process it supports; outsourcing a function without anyone internal able to oversee it; ignoring the security work done by staff outside the security team; and planning resources without linking them to strategy and risk. Another trap is assuming that certifications prove capability. They help, but the real question is whether people can perform the tasks the program needs.",
   "Exam questions about resources often ask what to do 'first' or 'best' when a skill or capacity gap appears. Clue words like 'lacks expertise' or 'insufficient staff' point to assessing required skills against the strategy, then choosing training, hiring or outsourcing based on cost, time and risk. 'Tool not providing value' points to process, staffing and tuning rather than buying another tool. 'Outsourced service' points to contracts, service levels and oversight, because accountability stays with the organization."
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
   ],
   [
    "Skills inventory",
    "A record of the capabilities each role needs and who has them, used to find skill gaps."
   ],
   [
    "Service level agreement (SLA)",
    "A contract term defining the measurable service a provider must deliver, such as response times."
   ],
   [
    "Succession planning",
    "Preparing backup people for critical roles so capabilities do not depend on one person."
   ]
  ],
  "example": "A hospital group buys an expensive SIEM but has no one to write rules or review alerts, and six months later it detects almost nothing. The security manager pauses further purchases, defines a monitoring process, trains two IT staff as analysts, and brings in a partner for out-of-hours coverage. Within a quarter the same tool is producing useful alerts, because people and process now support it.",
  "tip": "Resource questions turn on skills that match the strategy, not on raw headcount or a single certification. Outsourcing can provide skills but never transfers accountability.",
  "check": [
   [
    "What are the main categories of program resources?",
    "People, processes, tools and technology, plus the budget that funds them."
   ],
   [
    "What stays with the organization when a security function is outsourced?",
    "Accountability for the risk and for overseeing the provider."
   ],
   [
    "A new tool is producing little value. What is the most likely cause to examine first?",
    "Whether there are defined processes and skilled staff with time to operate and tune it."
   ],
   [
    "What should drive decisions about which security skills to build or buy?",
    "The capabilities required by the security strategy and risk priorities, weighed against cost and time."
   ]
  ]
 },
 {
  "t": "Information asset identification, valuation and classification",
  "body": [
   "You cannot protect what you do not know you have. Asset identification builds an inventory of information assets, such as databases, file shares, applications, documents, cloud services and the systems that hold them, together with each asset's owner, location, purpose and the business processes that depend on it. The inventory is the foundation for classification, risk assessment, business continuity planning and incident response. When something goes wrong, responders need to know quickly what a system holds and who owns it.",
   "Building the inventory combines several sources: interviews with business process owners, application lists from IT, configuration management databases (CMDBs), cloud account listings, procurement records and data discovery tools that scan for sensitive data. Shadow IT, services adopted by business units without IT involvement, is a common blind spot, so check expense records and network traffic too. Each entry needs an accountable owner, and the inventory must be maintained through change management and procurement, or it will quickly go out of date.",
   "Valuation estimates how important each asset is. Value can be measured by the cost to replace it, the revenue it supports, legal obligations attached to it, and the harm that would follow if it were disclosed, altered or unavailable. For information, the most useful measure is usually business impact on confidentiality, integrity and availability, often called the CIA triad. A business impact analysis (BIA) contributes availability values, such as how long a process can be down; legal and privacy teams contribute confidentiality requirements. The owner confirms the valuation because the owner understands the business consequence.",
   "Classification groups assets into levels so they can be protected consistently. A typical scheme has three to five levels, such as public, internal, confidential and restricted. Each level has handling rules for labeling, storage, transmission, sharing, retention and disposal. The information security manager designs the scheme with the business; data owners assign each asset's level. Classifying by business impact, not by who created the data or how many people use it, keeps protection proportionate. A handling rule might read: 'Restricted: encrypt at rest and in transit, access by named approval only, no external sharing without owner approval, secure destruction at end of retention.'",
   "Keep the scheme simple. Too many levels confuse users and lead to over- or under-classification. Over-classification wastes money and slows the business; under-classification leaves sensitive data exposed. Labels should be visible where practical, for example in document headers or metadata, so tools such as data loss prevention (DLP) and people can apply the right handling. Classification must also be reviewed, because value changes: a product plan is highly sensitive before launch and public afterward. Where data from different levels is combined, the result usually takes the highest level of its parts.",
   "Consider a worked example. A law firm inventories its document management system, email archive, billing database and a file-sharing service one practice group adopted on its own. It names a partner as owner of each and applies a four-level scheme. Client matter files become 'restricted', which requires encryption, need-to-know access and secure shredding; internal policies are 'internal'; the firm's published articles are 'public'. The unapproved file-sharing service is found to hold restricted files, so the owner moves them to the approved system. Only then does the firm configure DLP rules, using the new labels to block restricted files from leaving by email.",
   "Common mistakes: letting IT or security assign classification instead of the business owner; creating an elaborate scheme with many levels that nobody applies; classifying everything at the highest level to be safe; buying a DLP tool before assets are identified and classified; and treating classification as a one-time project. Another trap is valuing an asset only by its hardware cost. The information on a cheap laptop can be worth far more than the device.",
   "The order matters on the exam: inventory with owners first, then valuation and classification by owners using the approved scheme, then handling controls such as encryption and DLP. Clue words such as 'first step in protecting information' point to identifying and inventorying assets. 'Who determines classification' points to the data owner. 'Basis for classification' points to business value or impact of loss of confidentiality, integrity or availability. 'Protection is inconsistent across departments' points to a common classification scheme with handling rules."
  ],
  "terms": [
   [
    "Asset inventory",
    "A maintained list of information assets with owners, locations and purposes."
   ],
   [
    "Asset valuation",
    "Estimating an asset's importance by the business impact of losing its confidentiality, integrity or availability."
   ],
   [
    "Classification scheme",
    "A defined set of sensitivity levels with handling rules for each."
   ],
   [
    "Handling requirements",
    "Rules for labeling, storing, transmitting, sharing, retaining and disposing of information at each classification level."
   ],
   [
    "Data loss prevention (DLP)",
    "Tools that detect and block unauthorized movement of sensitive data, usually relying on classification labels or content rules."
   ],
   [
    "Shadow IT",
    "Systems or services adopted by business units without the knowledge or approval of IT and security."
   ],
   [
    "Business impact analysis (BIA)",
    "A study of how disruption to processes and assets would affect the business over time, used to set availability requirements."
   ]
  ],
  "example": "A regional bank's data discovery scan finds customer account numbers in a marketing team's cloud spreadsheet. The inventory had no record of it. The head of marketing is named owner, the data is classified 'confidential' under the bank's scheme, the spreadsheet is moved to an approved system with restricted access, and the procurement process is updated so new cloud services are added to the inventory before use.",
  "tip": "Classification is based on business impact of loss of confidentiality, integrity or availability, and the data owner assigns it. The inventory comes first, and tools like DLP come after classification.",
  "check": [
   [
    "What should be completed first when building a classification program?",
    "An inventory of information assets with identified owners."
   ],
   [
    "Who assigns a classification level to an asset?",
    "The asset's data owner, using the scheme designed with the security manager."
   ],
   [
    "Why keep a classification scheme to a small number of levels?",
    "Too many levels confuse users, causing inconsistent and incorrect classification."
   ],
   [
    "What is the main basis for an asset's classification?",
    "The business impact if its confidentiality, integrity or availability were compromised."
   ]
  ]
 },
 {
  "t": "Industry standards and control frameworks for building the program",
  "body": [
   "A control framework is a structured catalog of controls, organized by topic, that an organization can select from and tailor. Using one avoids reinventing controls, provides a common language for auditors and partners, and makes it easier to show regulators that the program is reasonable. It also helps you spot gaps: if a framework covers supplier security and you have nothing there, you know where to look. CISM expects you to know the major options and how to use them, not to memorize control numbers.",
   "ISO/IEC 27002 provides controls grouped into four themes, organizational, people, physical and technological, with guidance for each. It supports ISO/IEC 27001, whose Annex A lists the same controls; organizations choose which apply and record the choice and reasons in a statement of applicability. NIST SP 800-53, a US National Institute of Standards and Technology Special Publication, is a large, detailed catalog used heavily by US federal agencies and their suppliers, with baselines for low, moderate and high impact systems. The CIS Critical Security Controls, from the Center for Internet Security, are a shorter, prioritized list of technical safeguards grouped into implementation groups by organization size and maturity.",
   "Sector and topic standards add to these. The Payment Card Industry Data Security Standard (PCI DSS) applies to payment card data. The NIST Privacy Framework and privacy laws shape privacy controls. Cloud-specific frameworks such as the Cloud Security Alliance Cloud Controls Matrix (CCM) map cloud controls and responsibilities between provider and customer. Assurance reports such as SOC 2 (System and Organization Controls), based on trust services criteria, are how many service providers demonstrate their controls to customers. Many organizations must satisfy several of these at once.",
   "The key practice is tailoring. The risk assessment determines which controls are needed and how strong they must be. A framework is a menu, not a mandate to implement every item. Controls that do not apply are excluded with a documented reason; extra controls are added where the organization's risks demand them. A practical sequence is: identify the obligations and customer demands that apply, choose a primary framework as the backbone, run the risk assessment, select and tailor controls, document the decisions, then implement and test.",
   "Control mapping links one internal control to the requirements of several frameworks, for example one quarterly access review process satisfying ISO/IEC 27001, SOC 2 and a regulator's rule. This 'test once, comply many' approach reduces duplicated effort and audit fatigue. A mapping table typically lists the internal control, its owner and the matching requirement in each framework, plus where the evidence is stored. Remember that no framework guarantees security and adopting one never transfers liability; it gives structure to a risk-based program.",
   "Consider a worked example. A fintech startup must meet PCI DSS, pass annual SOC 2 audits and answer customer questionnaires based on ISO/IEC 27001. Instead of running three separate compliance projects, the security manager chooses ISO/IEC 27002 as the backbone, builds one internal control set tailored by risk, maps each control to all three sources, and assigns control owners. Testing is scheduled so each control is tested once, with evidence stored centrally and reused across audits. When a regulator later issues new guidance on third-party risk, the manager maps it to existing vendor controls and finds only two gaps to close.",
   "Common mistakes: implementing every control in a framework without regard to risk; running separate, duplicated programs for each standard; assuming certification or a clean audit means the organization is secure; choosing a framework only because a competitor uses it; and forgetting to document why controls were excluded. Another trap is confusing standards with laws: most frameworks are voluntary unless a law, regulation or contract makes them mandatory, as card brand contracts do with PCI DSS.",
   "Exam questions usually test purpose and process. 'Basis for selecting controls' points to the risk assessment, with frameworks as a source. 'Reduce duplicated compliance effort' points to control mapping. 'Excluded controls must be justified' points to tailoring and the statement of applicability. 'Prioritized technical safeguards for smaller organizations' points to the CIS Controls. 'Detailed catalog for US federal systems' points to NIST SP 800-53. When an option claims that adopting a framework guarantees protection or removes liability, treat it as a distractor."
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
   ],
   [
    "NIST SP 800-53",
    "A detailed catalog of security and privacy controls with baselines for low, moderate and high impact systems."
   ],
   [
    "SOC 2",
    "An independent assurance report on a service organization's controls, based on trust services criteria."
   ]
  ],
  "example": "A small nonprofit with three IT staff wants a practical starting point. Rather than attempt a full ISO/IEC 27001 program, the security manager uses the first CIS Controls implementation group to prioritize asset inventory, secure configuration, account management and backups. Each control is tailored to the nonprofit's cloud-based setup, and progress is reported to trustees as the percentage of priority safeguards in place.",
  "tip": "Frameworks are chosen and tailored based on risk assessment; they never replace it and never guarantee that breaches will not occur.",
  "check": [
   [
    "Why adopt a recognized control framework?",
    "To use a proven structured set of controls and common language, tailored to the organization's risks."
   ],
   [
    "What is control mapping used for?",
    "To show one internal control satisfies requirements in several frameworks, reducing duplicated effort."
   ],
   [
    "What should determine which framework controls an organization implements?",
    "Its risk assessment, along with legal, regulatory and contractual obligations."
   ],
   [
    "Is PCI DSS a law?",
    "No. It is an industry standard made mandatory through contracts with card brands and payment processors."
   ]
  ]
 },
 {
  "t": "Enterprise architecture and information security architecture",
  "body": [
   "Enterprise architecture (EA) describes how an organization's business processes, information, applications and technology fit together, both today and in a planned future state. It is a planning discipline that helps leaders make consistent technology decisions that support strategy. The CISM outline expects security managers to understand enterprise and security architecture, because security built into the architecture is cheaper and stronger than security added project by project afterward.",
   "EA is usually described in layers: business architecture (capabilities and processes), data or information architecture (what information exists and how it flows), application architecture (systems and how they interact) and technology architecture (infrastructure, networks and platforms). Frameworks such as TOGAF (The Open Group Architecture Framework) provide methods for developing EA, and the Zachman Framework offers a way to classify architecture views. The Sherwood Applied Business Security Architecture (SABSA) framework is a well-known method for deriving security architecture from business requirements, starting with business attributes such as 'available' or 'confidential' and tracing them down to specific controls.",
   "Information security architecture is the part of EA that describes how security controls and services are structured across those layers: identity and access services, network segmentation, encryption and key management, logging and monitoring, and secure application patterns. Its purpose is consistency. Instead of each project inventing its own security, the architecture offers approved reference patterns and shared services that meet the organization's control objectives. For example, a pattern for an internet-facing application might require single sign-on through the central identity provider, a web application firewall, secrets in the approved vault, and logs forwarded to the SIEM (security information and event management system).",
   "Several principles guide modern security architecture. Defense in depth layers different controls so one failure does not expose everything. Least privilege limits access to what is needed. Secure by default and secure by design build protection in from the start. Zero trust removes implicit trust based on network location and verifies identity, device and context on every access request. Segmentation limits how far an attacker can move. Simplicity matters too: complex designs are harder to secure and to audit. In cloud environments, the shared responsibility model divides security duties between provider and customer, so the architecture must show clearly which side handles each control.",
   "For the manager, architecture is a governance tool. Security review inside the architecture process lets you influence designs early, when changes are cheap, and check that new projects use approved patterns. A typical process has an architecture review board that includes security, which reviews designs at set points in the project life cycle, approves deviations as documented exceptions with risk owner sign-off, and updates patterns as technology changes. Architecture work also exposes technical debt, such as unsupported systems and one-off integrations, and shadow IT, both of which feed the risk register.",
   "Consider a worked example. A retailer's architecture board requires every new application to use the central identity provider for sign-on, send logs to the SIEM and store secrets in the approved vault. A team building a loyalty app proposes its own login system with a separate password database to save time. At the design review, security explains that this would create a second set of customer credentials to protect and bypass MFA. The team is redirected to the standard pattern before development begins, which takes a week of effort instead of the months a later redesign would cost. The review also reveals that an older app still has its own login, which is added to the risk register with a migration plan.",
   "Common mistakes: treating security architecture as a list of products rather than a structure of controls and services; reviewing designs only after they are built; assuming zero trust is a single product rather than an approach; allowing undocumented exceptions to patterns; and ignoring data architecture, even though knowing where sensitive data flows is essential to protecting it.",
   "Exam questions about architecture reward answers that build security in consistently and early. Clue words such as 'new system being designed' or 'project in planning' point to involving security in architecture review. 'Ensure consistent security across projects' points to reference architectures and approved patterns. 'Verify every request regardless of network location' points to zero trust. 'Derive security requirements from business attributes' points to SABSA. 'Layered controls' points to defense in depth."
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
    "Reference architecture",
    "An approved, reusable design pattern that projects follow to meet security and other requirements consistently."
   ],
   [
    "Zero trust",
    "An approach that grants no implicit trust based on network location and verifies every access request."
   ],
   [
    "Defense in depth",
    "Layering multiple independent controls so that the failure of one does not expose the asset."
   ],
   [
    "SABSA",
    "Sherwood Applied Business Security Architecture: a method that derives security architecture from business requirements."
   ],
   [
    "Shared responsibility model",
    "The division of security duties between a cloud provider and its customer."
   ]
  ],
  "example": "A hospital plans to connect new imaging devices to its clinical network. Through the architecture review board, the security manager requires the devices to sit in a dedicated segment, reach only the imaging archive, authenticate through the central identity service for administration, and send logs to the SIEM. The design is approved before purchase, so vendor contracts include those requirements rather than discovering the gaps after installation.",
  "tip": "Architecture questions reward answers that build security into design consistently and early. Zero trust means verify every request regardless of network location.",
  "check": [
   [
    "What is the main security benefit of enterprise architecture?",
    "It builds security consistently into how business processes, data, applications and technology fit together, instead of adding it piece by piece."
   ],
   [
    "Which model verifies users and devices on every request regardless of network location?",
    "Zero trust."
   ],
   [
    "Why should security take part in architecture review early in a project?",
    "Design changes are cheapest before development, and early review ensures projects use approved security patterns."
   ],
   [
    "How should a project that cannot follow an approved security pattern be handled?",
    "Through a documented exception with risk analysis and approval by the risk owner, recorded for later review."
   ]
  ]
 },
 {
  "t": "Information security policies, standards, procedures and guidelines",
  "body": [
   "Governance documents form a hierarchy, and the Certified Information Security Manager (CISM) exam often asks which document a statement belongs in. The hierarchy exists because different readers need different things: the board needs to state intent once and have it last, engineers need precise settings, and the people doing daily work need exact steps. Putting each kind of statement in the right document keeps the top layer stable while the lower layers change as technology and processes change.",
   "At the top is the policy: a short, high-level statement of management intent and direction, such as 'information must be protected according to its classification'. Policies are mandatory, approved by senior management or the board, and change rarely because they do not name technologies or products. An organization usually has an overarching information security policy plus a small set of topic policies, such as acceptable use, access control, data classification and incident management, each traceable to the overall policy and to business objectives.",
   "Standards make policies concrete. They are mandatory and specific: 'confidential data at rest must be encrypted with AES-256', 'passwords must be at least 14 characters', 'servers must meet the approved baseline'. AES stands for Advanced Encryption Standard. Standards change more often than policies because technology changes. A baseline is a kind of standard that defines the minimum security configuration for a particular platform, such as a hardened build for a Windows server or a cloud account; it is often expressed as configuration settings that can be checked automatically, for example a line such as `PermitRootLogin no` in an SSH server configuration file.",
   "Procedures are step-by-step instructions for performing a task consistently, such as how to create a user account or how to respond to a lost laptop. They are written for the people who do the work and are mandatory in the sense that the task must be done that way. Guidelines are recommendations: helpful, optional advice such as tips for choosing a strong passphrase or suggested ways to meet a standard. Because they are optional, a requirement never belongs in a guideline. The quick test is this: intent goes in a policy, a measurable mandatory rule goes in a standard, steps go in a procedure, and advice goes in a guideline.",
   "Good policy management covers the whole life cycle. Each document needs a clear owner, a defined approval path, communication to affected staff, acknowledgment where needed, an exception process and review at planned intervals (commonly yearly) and after significant change such as a merger, a new regulation or a major incident. Exceptions should be requested formally, risk-assessed, approved by an authority at the right level (usually the business owner of the risk, not the requester), time-limited and tracked in a register so they are revisited rather than forgotten. The information security manager drafts and maintains the documents, working with legal, human resources and business units, but senior management approval is what gives them authority.",
   "Consider a worked example. A new security manager finds a 40-page 'security policy' that mixes intent, product names, firewall port numbers and helpful tips. Staff ignore it because it is out of date every time a product changes. The manager splits it: a two-page policy approved by the executive committee states that systems must be protected in line with data classification; a set of standards, owned by IT and security, lists required encryption, password and hardening settings; procedures describe how the service desk grants access; and a guideline offers tips for secure remote working. Now a technology change updates one standard without reopening the board-approved policy.",
   "Common mistakes: putting specific technical settings in a policy, which forces senior management to re-approve routine changes; writing a requirement as a guideline, which makes it unenforceable; publishing policies without communicating them or collecting acknowledgment; and granting open-ended exceptions. Another trap is responding to repeated non-compliance only with more enforcement. If people keep bypassing a standard, first find out why. The standard may be impractical, and redesigning it to meet the same objective with less friction usually works better than punishment.",
   "Exam questions usually describe a statement and ask where it belongs, or describe a problem and ask for the best action. Clue words such as 'management intent', 'direction' or 'high-level' point to a policy. A specific, mandatory value or technology points to a standard. 'Step-by-step' or 'how to' points to a procedure. 'Recommended', 'suggested' or 'optional' points to a guideline. If a question asks what gives a policy authority, the answer is senior management approval. If it asks what to do about frequent requests to bypass a control, look for the answer that analyzes the business need and risk rather than the one that simply grants or refuses."
  ],
  "terms": [
   [
    "Policy",
    "A high-level, mandatory statement of management intent and direction, approved by senior management."
   ],
   [
    "Standard",
    "A mandatory, specific requirement, such as a technology, setting or measurable value, that implements a policy."
   ],
   [
    "Baseline",
    "A standard defining the minimum security configuration for a particular platform or system type."
   ],
   [
    "Procedure",
    "Mandatory step-by-step instructions for carrying out a task consistently."
   ],
   [
    "Guideline",
    "Optional, recommended advice that helps people meet policies and standards."
   ],
   [
    "Policy exception",
    "A formally approved, risk-assessed and time-limited deviation from a policy or standard, tracked in a register."
   ]
  ],
  "example": "A hospital's access control policy says clinical systems must use strong authentication. The supporting standard requires multi-factor authentication for all remote access. A procedure explains how the service desk enrolls a clinician's token, and a guideline suggests using the authenticator app rather than text messages. When a legacy imaging system cannot support multi-factor authentication, the business owner requests an exception, which is risk-assessed, approved for six months with compensating network restrictions, and logged for review.",
  "tip": "Specific mandatory settings go in standards, not policies. Guidelines are never mandatory. Policies get their authority from senior management approval, and exceptions must be risk-assessed, approved at the right level and time-limited.",
  "check": [
   [
    "'All laptops must use full-disk encryption with AES-256.' Which document should contain this statement?",
    "A standard, because it is a specific, mandatory technical requirement that may change as technology changes."
   ],
   [
    "Why should policies avoid naming specific products or settings?",
    "Policies express long-lived management intent and need senior approval; product details change often and belong in standards, which can be updated without re-approving the policy."
   ],
   [
    "Staff frequently bypass a password standard. What should the security manager do first?",
    "Investigate why the standard is being bypassed and whether it meets business needs, then adjust it or its controls to achieve the objective with less friction."
   ],
   [
    "What are the key elements of a sound policy exception process?",
    "A formal request, a risk assessment, approval by the appropriate risk owner, a time limit, any compensating controls, and tracking in a register for review."
   ]
  ]
 },
 {
  "t": "Information security program metrics: KPIs, KRIs and maturity",
  "body": [
   "Metrics tell you and your stakeholders whether the information security program is working. Without them, the program cannot show value, justify budget or spot problems early, and decisions are made on opinion rather than evidence. The challenge is not collecting numbers, which security tools produce in huge volumes, but choosing measures that answer real questions for each audience and lead to action.",
   "It helps to think in three layers. Operational metrics serve the security team: patch latency, alert volumes, mean time to respond, vulnerability scan coverage. Management or tactical metrics serve IT and business managers: control effectiveness, compliance with standards, progress on the roadmap, exceptions outstanding. Strategic metrics serve executives and the board: risk trends for critical business processes, position against risk appetite, and whether security is supporting business goals. Sending operational counts to the board wastes their time and hides the message they need.",
   "Key performance indicators (KPIs) show whether processes and controls perform to target, such as '95% of critical patches applied within 14 days'. Key risk indicators (KRIs) are forward-looking signals of rising exposure, such as 'number of critical internet-facing systems with overdue patches' or 'privileged accounts not reviewed this quarter'; each KRI should have thresholds that trigger escalation before risk exceeds appetite. Key goal indicators (KGIs), used in some frameworks, show whether a goal has been achieved after the fact. Good metrics are specific, measurable, attainable, relevant and timely (SMART), have a target or threshold, have an owner, and are collected the same way every time so trends are meaningful.",
   "Building a metric follows a simple path. Start with the question or decision: for example, 'are we reducing the risk of ransomware on critical systems?'. Identify the data source, such as the endpoint management console or the vulnerability scanner. Define the calculation exactly, including what counts and what is excluded. Set a target and thresholds, often shown as green, amber and red. Agree the reporting frequency and audience, and name the action a red value will trigger. Automate collection where you can, because manual spreadsheets drift and are expensive to maintain.",
   "Maturity models measure how well processes are defined and managed over time. Capability or maturity levels typically run from initial or ad hoc, through repeatable and defined, to managed (measured) and optimized. Assessing against a scale such as the capability levels used in COBIT, or the implementation tiers of the National Institute of Standards and Technology Cybersecurity Framework (NIST CSF), gives a baseline, lets you set a target state agreed with management, and lets you show improvement. Maturity is not the same as effectiveness: a well-documented process can still fail, so combine maturity ratings with outcome metrics.",
   "Consider a worked example. A chief information security officer is asked by the board whether a large investment in endpoint protection has paid off. The team offers a slide showing millions of blocked events. The manager replaces it with a KRI showing the percentage of critical servers without current endpoint protection, falling from 18 percent to 2 percent against a threshold of 5 percent, a KPI showing mean time to contain endpoint incidents falling from days to hours, and a maturity assessment showing endpoint management moving from 'repeatable' to 'defined'. The board can now link spending to reduced risk.",
   "Common mistakes: reporting vanity metrics that look impressive but support no decision, such as blocked spam counts; using the same dashboard for every audience; confusing a KPI (performance against target) with a KRI (early warning of exposure); treating a high maturity score as proof that controls work; and collecting metrics with no owner or threshold, so a bad value triggers nothing. Before adopting any metric, ask who will use it, what decision it supports and what action a bad value would trigger.",
   "Exam questions often ask which metric is 'most useful to senior management' or 'best indicates' something. Clue words such as 'board', 'executive' or 'business' point to metrics tied to business risk, appetite and objectives rather than activity counts. 'Early warning', 'exposure' or 'trend toward tolerance' points to a KRI. 'Achieving target' or 'efficiency of a process' points to a KPI. 'Process capability', 'repeatable' or 'optimized' points to maturity. When asked what should come first when designing metrics, choose understanding stakeholder needs and business objectives, not choosing a tool."
  ],
  "terms": [
   [
    "Key performance indicator (KPI)",
    "A measure of whether a process or control is performing to its target."
   ],
   [
    "Key risk indicator (KRI)",
    "A forward-looking measure that signals rising exposure, with thresholds that trigger escalation."
   ],
   [
    "Key goal indicator (KGI)",
    "A measure showing whether a defined goal has been achieved."
   ],
   [
    "SMART metric",
    "A metric that is specific, measurable, attainable, relevant and timely."
   ],
   [
    "Maturity model",
    "A scale that rates how well processes are defined, managed and improved, from ad hoc to optimized."
   ],
   [
    "Vanity metric",
    "A number that looks impressive but does not support any decision or action."
   ],
   [
    "Threshold",
    "A predefined value at which a metric changes status and triggers review or escalation."
   ]
  ],
  "example": "A retailer's security manager reports to the audit committee each quarter. Instead of firewall rule counts, the report shows three KRIs against appetite: third-party vendors handling card data without a current assessment, critical systems with overdue patches and privileged accounts not reviewed. One KRI turns red after a merger adds unassessed vendors, and the committee approves extra assessment resources at the meeting.",
  "tip": "For senior management, pick metrics that tie to business risk and appetite. A KRI warns of rising exposure; a KPI measures performance against target. Activity counts such as blocked spam or rule changes are operational, not strategic.",
  "check": [
   [
    "Which is a KRI: 'patches applied within 14 days' or 'critical systems with patches overdue by more than 30 days'?",
    "The second, because it signals growing exposure that could push risk beyond appetite; the first measures process performance, which is a KPI."
   ],
   [
    "Why is 'number of spam emails blocked' a poor metric for the board?",
    "It is an activity count that does not relate to business risk or support any decision the board must make."
   ],
   [
    "What should the security manager do before choosing program metrics?",
    "Understand stakeholder needs and business objectives so each metric answers a real question and supports a decision."
   ],
   [
    "Why should maturity ratings be combined with outcome metrics?",
    "A mature, well-documented process can still fail to reduce risk, so outcomes show whether controls are actually effective."
   ]
  ]
 },
 {
  "t": "Control design and selection: types, categories and control objectives",
  "body": [
   "A control is any measure that modifies risk: a policy, process, device, practice or other action. A control objective is the statement of what the control must achieve, such as 'only authorized users can access payroll data'. Controls are selected to meet control objectives, which in turn come from the risk assessment and the organization's risk appetite. Starting with objectives keeps you from picking controls because they are familiar, fashionable or cheap, and it gives testers something clear to test against later.",
   "Controls are described in two ways, and the exam uses both. By category, meaning how they are implemented: administrative or managerial controls such as policies, training, segregation of duties and background checks; technical or logical controls such as encryption, access control lists and multi-factor authentication (MFA); and physical controls such as locks, badges and cameras. By function, meaning what they do: preventive controls stop an event; detective controls find it during or after; corrective controls limit damage and fix the problem; deterrent controls discourage attempts; recovery controls restore operations; and directive controls tell people what to do. One control has both a category and a function: a file integrity monitor is a technical detective control, while a visible guard is a physical deterrent and also preventive.",
   "Compensating controls are alternatives used when the preferred control cannot be implemented, such as a jump host with MFA and session recording in front of a legacy system that cannot support MFA itself. A compensating control must meet the intent of the original requirement, give a comparable level of protection, and be documented, approved by the risk owner and reviewed periodically. It is a considered substitute, not a way to avoid effort.",
   "Selecting controls follows a sequence. First confirm the risk and the control objective. Then identify candidate controls, often from a framework such as ISO/IEC 27001 Annex A, the NIST SP 800-53 catalog or the Center for Internet Security (CIS) Controls. Evaluate each option on effectiveness against the risk, cost compared with the risk reduction (a control should not cost more than the loss it prevents), impact on business operations and users, how well it integrates with existing controls, whether it can be monitored and tested, and whether it creates a single point of failure. Finally, gain approval from the risk owner and record the decision.",
   "Layering preventive, detective and corrective controls gives defense in depth, so the failure of one does not leave the asset exposed. Automated controls are usually more consistent than manual ones and scale better, but they need monitoring to confirm they keep running; a disabled log forwarder silently turns a detective control off. Manual controls rely on people and need clear procedures, training and review. Control strength also depends on design details such as whether a control is preventive at the point of entry or relies on someone reviewing a report later.",
   "Consider a worked example. A risk assessment finds that fraudulent supplier payments are a high risk. The control objective is 'payments are made only to verified suppliers for approved invoices'. The manager selects a preventive administrative control (segregation of duties between creating suppliers and approving payments), a preventive technical control (the finance system requires two approvers above a set amount), a detective control (a weekly report of new or changed supplier bank details reviewed by someone independent) and a corrective control (a documented procedure to recall payments and notify the bank). Each maps back to the objective and can be tested.",
   "Common mistakes: choosing a control before defining the objective; classifying a control by its technology rather than its function; assuming a policy alone prevents anything (it is directive); accepting a compensating control that does not meet the original intent; and selecting a control whose cost exceeds the risk it reduces. Another frequent error is relying on a single strong preventive control with nothing to detect its failure.",
   "Exam questions typically describe a control and ask its type, or describe a situation and ask what should drive selection. 'Finds', 'identifies' or 'after the fact' points to detective; 'stops' or 'blocks' points to preventive; 'restores' or 'fixes' points to corrective or recovery; 'cannot implement the required control' points to compensating. When asked what should come first in selecting controls, choose the risk assessment and control objectives. When asked the best basis for choosing between options, choose cost-effectiveness relative to risk and alignment with business objectives."
  ],
  "terms": [
   [
    "Control",
    "Any measure, such as a policy, process, device or practice, that modifies risk."
   ],
   [
    "Control objective",
    "A statement of what a control or set of controls must achieve to address a risk."
   ],
   [
    "Preventive control",
    "A control that stops an unwanted event from occurring."
   ],
   [
    "Detective control",
    "A control that identifies an event while it is happening or after it has occurred."
   ],
   [
    "Corrective control",
    "A control that limits the impact of an event and fixes the underlying problem."
   ],
   [
    "Compensating control",
    "An alternative control that meets the intent of a requirement when the preferred control cannot be used."
   ],
   [
    "Defense in depth",
    "Layering multiple independent controls so the failure of one does not expose the asset."
   ]
  ],
  "example": "A manufacturer's production line runs on controllers that cannot be patched or given modern authentication. The security manager cannot apply the standard controls, so she designs compensating controls: the controllers sit on an isolated network segment, all access passes through a monitored jump host with MFA, and network monitoring alerts on any unexpected traffic. The plant manager, as risk owner, approves the arrangement and it is reviewed yearly.",
  "tip": "Classify a control by what it does: finding a change after it happens is detective, stopping it is preventive, fixing it is corrective. An alternative used when the preferred control is impossible is compensating. Selection starts from risk-based control objectives.",
  "check": [
   [
    "A daily review of firewall logs for unauthorized changes is which function of control?",
    "Detective, because it identifies unauthorized changes after they occur rather than stopping them."
   ],
   [
    "What should drive the selection of security controls?",
    "Control objectives derived from the risk assessment, weighed against cost, business impact and risk appetite."
   ],
   [
    "What makes a compensating control acceptable?",
    "It meets the intent of the original requirement with comparable protection and is documented, approved by the risk owner and reviewed."
   ],
   [
    "Why layer preventive, detective and corrective controls?",
    "So that if a preventive control fails, the event is still detected and its impact limited, which is defense in depth."
   ]
  ]
 },
 {
  "t": "Control implementation, integration and change management",
  "body": [
   "A well-designed control only reduces risk once it is implemented, integrated with the environment and kept running. This topic covers how the information security program moves controls from design into production without disrupting the business, and how it keeps them effective as systems change around them. For a manager, the key idea is that implementation is as much about people and processes as about technology.",
   "Implementation is a project in its own right: defined scope, an accountable owner, a plan, testing, training, communication and a rollback option. Many controls need changes to business processes as well as technology. A new access request workflow, for instance, affects managers who approve access and the service desk that provisions it. Involve those groups early, explain the reason for the change in business terms, pilot with a small group, measure the effect, and then roll out widely. A control that users do not understand is a control they will work around.",
   "All changes to production, including new security controls, should go through change management. That process records the change, assesses its risk and impact, requires testing and approval (often by a change advisory board, or CAB), schedules it to limit disruption, provides a backout plan and records the result. Standard, low-risk changes can be pre-approved, and urgent changes use an emergency change path with review afterward, but they are never simply skipped. Bypassing change management to move faster is a common mistake: an untested firewall rule or endpoint agent can cause outages as damaging as an attack, and uncontrolled changes weaken the control environment auditors rely on.",
   "Integration means controls work together and with operations. Logs from new controls should feed the security information and event management (SIEM) system, alerts should reach a team that will act on them, identity controls should connect to the central directory, and ownership for operating and maintaining each control must be assigned and written down. A control without an operator decays quickly: signatures go stale, exceptions pile up and nobody notices when it stops working. Integration also means documenting the control so it can be tested and audited.",
   "Security should be built into the system development life cycle (SDLC) and into procurement rather than bolted on afterwards. Defining security requirements early, reviewing designs, testing before release and including security criteria in purchasing and contracts are much cheaper than fixing problems after deployment. Configuration management keeps systems aligned with approved baselines; tools can compare a system's settings to the baseline and flag drift, which is then corrected through change management. In cloud environments, infrastructure as code lets baseline settings be reviewed like software before they are applied.",
   "Consider a worked example. The security team wants to enforce device compliance checks before users can reach email. They raise a change request describing affected users, dependencies and business impact. Testing in a pilot group shows that some sales staff use unmanaged tablets, so the design is adjusted to give those devices web-only access. The CAB approves a phased rollout with a backout plan to disable the policy. Help desk scripts and user guidance are prepared in advance, compliance alerts are routed to the operations team, and ownership of the policy is assigned to the identity team. After rollout, the result is recorded and the baseline documentation updated.",
   "Common mistakes: deploying security controls outside change management because 'security changes are urgent'; forgetting the business process side of a control; leaving a new control without an assigned operator; failing to send new logs to monitoring; and retrofitting security late in a project, when changes are most expensive. Another trap is treating implementation as finished at go-live; controls need ongoing monitoring and periodic testing to stay effective.",
   "Exam questions often ask what should happen 'first' or 'best' when introducing a control, or what went wrong when one failed. 'Outage after a security change' points to missing change management or testing. 'Control stopped working and nobody noticed' points to missing ownership or monitoring. 'Security added late in a project at high cost' points to not integrating security into the SDLC. For urgent fixes, the answer is the emergency change process, not skipping change control. When asked the most effective time to address security in a new system, choose the requirements and design phases."
  ],
  "terms": [
   [
    "Change management",
    "The formal process for requesting, assessing, approving, testing, implementing and recording changes to production."
   ],
   [
    "Change advisory board (CAB)",
    "The group that reviews and approves significant changes."
   ],
   [
    "Emergency change",
    "An urgent change made through an expedited approval path and reviewed afterward."
   ],
   [
    "System development life cycle (SDLC)",
    "The phases a system goes through from requirements and design to operation and retirement."
   ],
   [
    "Configuration management",
    "The practice of keeping systems aligned with approved baselines and detecting and correcting drift."
   ],
   [
    "Control owner",
    "The person accountable for operating and maintaining a control so it stays effective."
   ],
   [
    "Backout plan",
    "Documented steps to return to the previous state if a change fails."
   ]
  ],
  "example": "After a ransomware scare, an administrator pushes a new endpoint agent to every server on a Friday afternoon without a change ticket. The agent conflicts with the payroll application and payroll misses its run. The review finds no testing, no approval and no backout plan. The organization reinforces that security changes follow change management, with an emergency path for genuine urgency, and adds security staff to the CAB so they can move quickly within the process.",
  "tip": "Even urgent security changes go through change management, using the emergency change path if needed. Integrating security early in the SDLC is cheaper and more effective than retrofitting, and every control needs an owner and monitoring.",
  "check": [
   [
    "A critical patch must be applied tonight. How should it be handled?",
    "Through the emergency change process, with expedited approval, a backout plan and documentation reviewed afterward, not by bypassing change management."
   ],
   [
    "Why must each security control have an assigned owner?",
    "Without an owner, nobody maintains, monitors or tunes the control, so it decays and may stop working unnoticed."
   ],
   [
    "When is it most cost-effective to address security in a new application?",
    "In the requirements and design phases of the SDLC, before code is written and deployed."
   ],
   [
    "What does integration of a new control with operations include?",
    "Feeding its logs to monitoring, routing alerts to a responsible team, connecting it to central services such as identity, and documenting ownership."
   ]
  ]
 },
 {
  "t": "Control testing and evaluation",
  "body": [
   "Controls must be checked to confirm they work. Testing answers two questions: is the control designed to meet its objective (design effectiveness), and does it actually operate as designed over time (operating effectiveness)? A control can be perfectly designed on paper and never performed, or performed faithfully but unable to address the risk. The information security manager needs both answers to know whether residual risk is where management believes it is.",
   "Testing methods range in strength. Inquiry, asking the control owner how the control works, is the weakest and always needs corroboration. Observation, watching the control being performed, is stronger but only shows one moment, and people may behave differently when watched. Inspection of evidence, such as reviewing signed access reviews, change tickets or system logs, is stronger still. Reperformance, where the tester independently executes the control and compares results, is the strongest. Design effectiveness is often assessed by walkthrough and inspection of documentation; operating effectiveness needs evidence sampled across a period, such as a quarter, because one good day proves little.",
   "A typical test follows clear steps. Define the control objective and what 'working' means. Choose the method and the population, such as all user access changes this quarter. Select a sample, for example 25 changes chosen at random. Gather evidence for each sample item, such as the approval ticket and the matching entry in the directory. Record exceptions, decide whether they are isolated or systemic, and conclude whether the control is effective. For technical controls, tests may include running a configuration compliance scan against the baseline, attempting a login without MFA in a test account, or confirming that logs from a system actually arrive in the SIEM.",
   "Different parties test controls. Control owners perform self-assessments, which build ownership and catch problems between audits but lack independence. Internal audit provides independent assurance to the board and audit committee. External auditors and assessors provide third-party assurance, for example ISO/IEC 27001 certification audits or System and Organization Controls (SOC) 2 reports. Technical testing, such as vulnerability scanning, penetration testing and configuration checks, evaluates technical controls. Continuous control monitoring automates some checks so failures are seen within hours rather than at the next audit.",
   "Results are evaluated and reported. Deficiencies are rated by the risk they create, assigned to owners with remediation dates and tracked to closure. Repeated failures of the same control suggest a design or resourcing problem rather than individual error. Testing results feed the risk register, because a failing control means residual risk is higher than assumed. The manager plans testing based on risk: critical controls protecting high-value assets are tested more often and more rigorously than low-risk ones. Reports to management should summarize which key controls are effective, which are not, what risk the gaps create and when they will be fixed, rather than listing every test step. Where a gap cannot be closed quickly, the risk owner decides whether to accept it temporarily or add a compensating control.",
   "Consider a worked example. A company's standard requires quarterly access reviews for the finance system. The control owner says reviews are always done (inquiry). The tester inspects the review records and finds signed reports for all four quarters (inspection), which suggests the control operates. But when the tester reperforms one review by comparing the signed list with the actual accounts, three leavers still have active access. The reviews were being signed without checking against the live system. The design is fixed by generating the review list directly from the system and requiring managers to confirm each account.",
   "Common mistakes: accepting policy documentation as proof a control operates; relying on inquiry alone; testing a single instance and concluding the control works all year; treating self-assessment as a substitute for independent assurance; and fixing individual exceptions without asking why the control failed. Another mistake is testing everything equally rather than focusing effort on the controls that protect the most important assets.",
   "Exam questions often ask for the 'best evidence' or 'most reliable' way to confirm a control. Reperformance and independent inspection beat inquiry and observation. 'Documented and approved' points to design, not operation. 'Over a period' or 'consistently' points to operating effectiveness and sampling. 'Independent' points to internal or external audit. When a question says a control failed testing, the next step is usually to assess the risk and assign remediation, and to update the risk register."
  ],
  "terms": [
   [
    "Design effectiveness",
    "Whether a control, as designed, is capable of meeting its objective."
   ],
   [
    "Operating effectiveness",
    "Whether a control actually operates as designed, consistently, over a period."
   ],
   [
    "Inquiry",
    "Asking people how a control works; the weakest form of evidence on its own."
   ],
   [
    "Reperformance",
    "The tester independently executing a control to confirm it produces the correct result; the strongest method."
   ],
   [
    "Sampling",
    "Testing a selected subset of items from a population to draw a conclusion about the whole."
   ],
   [
    "Continuous control monitoring",
    "Automated, ongoing checks that detect control failures quickly between formal tests."
   ],
   [
    "Deficiency",
    "A gap in the design or operation of a control that leaves a risk less well managed than intended."
   ]
  ],
  "example": "A payments company prepares for its SOC 2 audit. Its own testing shows that firewall change approvals exist for most changes, but sampling across six months finds several emergency changes with no after-the-fact review. The manager treats this as an operating deficiency, assigns the network lead to add a weekly review of emergency changes, updates the risk register and retests the following quarter before the auditors arrive.",
  "tip": "Documentation proves design, not operation. Inquiry alone is weak evidence and reperformance is the strongest. Self-assessments complement but never replace independent audits, and failed tests mean residual risk is higher than assumed.",
  "check": [
   [
    "Which testing method provides the strongest evidence that a control works?",
    "Reperformance, because the tester independently executes the control and verifies the result."
   ],
   [
    "A control owner shows a well-written procedure. What does this prove?",
    "Only that the control appears to be designed; it does not show the control operates consistently over time."
   ],
   [
    "Why sample evidence across a period rather than test once?",
    "Operating effectiveness means the control works consistently, which one instance cannot demonstrate."
   ],
   [
    "What should happen after a critical control fails testing?",
    "Rate the deficiency by risk, assign an owner and remediation date, update the risk register and retest after the fix."
   ]
  ]
 },
 {
  "t": "Security awareness and training programs",
  "body": [
   "People are both a common path for attacks and a strong layer of defense. Phishing, pretexting phone calls, business email compromise and simple mistakes such as sending a file to the wrong person all depend on human behavior. Awareness and training programs aim to change that behavior so employees act securely in their daily work: recognizing suspicious messages, protecting data, following procedures and reporting problems quickly. For the information security manager, the program is a control like any other, with objectives, owners and measures.",
   "It is useful to separate three levels. Awareness reaches everyone and focuses on attention and recognition, through short modules, reminders, posters, newsletters and simulated phishing. Training builds specific skills for specific roles, such as secure coding for developers, privileged access practices for administrators, payment verification for finance staff or data handling for customer service. Education builds deep understanding over time, such as degree courses or professional certifications for security staff. Each audience needs the right mix, and a one-size program that gives everyone the same annual video rarely changes behavior.",
   "Building the program follows a sequence. Start with a needs analysis: use incident data, risk assessments, audit findings and phishing results to choose topics and identify high-risk roles. Set objectives in behavioral terms, such as 'finance staff verify any change to supplier bank details by phone using a known number'. Design content that is short, frequent, practical and relevant to each role, and explain why rules exist, because people follow rules they understand. Deliver it through several channels. Measure results, report them, and adjust the program each year or when threats change.",
   "Timing matters. New employees should get security onboarding before or when they receive access, including acceptable use and how to report incidents. Training should repeat at intervals and whenever policies, systems or threats change significantly. Executives need targeted briefings too, because they are frequent targets of impersonation and whaling attacks, and because their visible support sets the tone for everyone else. Contractors and third parties with access should be included, often through contract requirements.",
   "Measure outcomes, not just activity. Completion rates show reach but not change, and quiz scores show short-term recall. Better measures include phishing simulation click rates falling and report rates rising, the time between a suspicious email arriving and the first report, the number of policy violations, and incidents caused by user error. Report rate is especially valuable because it turns employees into sensors: a real phishing campaign reported within minutes can be contained before most people open it. A simple 'report phish' button in the email client makes reporting easy and measurable.",
   "Consider a worked example. A logistics company sees three business email compromise attempts in a quarter, one of which nearly succeeded. The security manager reviews the incidents and finds finance staff were not trained on payment fraud. She adds a role-based module for finance, runs targeted simulations that mimic supplier change requests, and introduces a call-back verification step in the payment procedure. Over six months, finance click rates fall, report rates rise sharply, and two real fraud attempts are reported and blocked. She presents these results to management as risk reduction rather than as training completions.",
   "Common mistakes: treating an annual compliance video as a complete program; measuring only completion rates; using the same content for every role; punishing people who click simulations, which teaches them to hide mistakes; and running simulations so tricky or frequent that staff become cynical. The program should never be used to shift blame. People who click a simulation should get immediate, supportive coaching, and repeated clickers may need extra help. A culture where people fear punishment will hide incidents, which is worse than the original error.",
   "Exam questions usually ask for the 'primary objective' of awareness or the 'best indicator' of its effectiveness. The objective is behavior change that reduces risk, not compliance paperwork. The best indicator combines falling click rates with rising report rates, or fewer user-caused incidents. 'Specific job function' points to role-based training rather than general awareness. When asked the best time for initial training, choose before or when access is granted. When asked what most improves program effectiveness, look for tailoring to roles and risks and visible management support."
  ],
  "terms": [
   [
    "Security awareness",
    "Activities that help everyone recognize security risks and know how to respond."
   ],
   [
    "Role-based training",
    "Training that builds the specific security skills required for a particular job function."
   ],
   [
    "Security education",
    "Longer-term learning that builds deep understanding, often for security professionals."
   ],
   [
    "Phishing simulation",
    "A controlled, harmless test email used to measure and improve how staff recognize and report phishing."
   ],
   [
    "Report rate",
    "The percentage of recipients who report a suspicious or simulated message to the security team."
   ],
   [
    "Security culture",
    "The shared attitudes and habits that shape how people in an organization treat security."
   ]
  ],
  "example": "A university gives every new staff member a 20-minute security onboarding module before their account is activated, then sends short monthly tips and quarterly phishing simulations. Research administrators, who handle grant payments, get extra fraud training. The dashboard for leadership shows the simulation report rate rising from 12 to 55 percent over a year, and the median time to first report of real phishing falling to under ten minutes.",
  "tip": "The goal of awareness is behavior change that reduces risk. The best measure combines falling click rates with rising report rates, not completion counts or quiz scores, and training should be tailored to roles.",
  "check": [
   [
    "What is the primary objective of a security awareness program?",
    "To change behavior so people act securely and report problems, reducing risk, not simply to complete training records."
   ],
   [
    "Which metric best shows an awareness program is working?",
    "A rising report rate together with a falling click rate in phishing simulations, or fewer user-caused incidents."
   ],
   [
    "How does training differ from awareness?",
    "Awareness reaches everyone and focuses on recognition; training builds specific skills needed by particular roles."
   ],
   [
    "Why should staff who click simulations not be punished?",
    "Punishment makes people hide mistakes and discourages reporting, which delays detection of real incidents."
   ]
  ]
 },
 {
  "t": "Managing external services: vendors, cloud providers and fourth parties",
  "body": [
   "Most organizations depend on outside providers for software, cloud infrastructure, payroll, customer support and many other services. Each provider that handles your data or connects to your systems extends your attack surface, and several major breaches have started at a supplier. Outsourcing transfers work, not accountability: regulators, customers and courts still hold you responsible for your data and services. Third-party risk management (TPRM) is how the information security program manages that exposure.",
   "Third-party risk management follows the relationship's life cycle. Before selection, classify the vendor by the data and services involved, for example critical, high, medium or low, based on data sensitivity, access to your network and how essential the service is. Then perform due diligence proportionate to that risk: security questionnaires, review of certifications and independent reports such as a SOC 2 Type II report or an ISO/IEC 27001 certificate (checking that its scope covers the service you are buying), financial stability, and, where justified, on-site or remote assessments. Never test a provider's systems without its written permission.",
   "The contract is the main control, because after signing your leverage drops. Important clauses include specific security requirements, the right to audit or to receive independent assurance reports, breach notification within a defined time, data location and handling rules, restrictions on and flow-down obligations for subcontractors, service level agreements (SLAs), cooperation during incidents, business continuity commitments, and return or deletion of data at the end with evidence. Security and legal teams should be involved before the contract is signed, not asked to review it afterward.",
   "Cloud services add the shared responsibility model, which divides security duties between provider and customer. The provider typically secures the physical data centers and underlying infrastructure; the customer remains responsible for its data, identities, access configuration and, depending on the service model, operating systems and applications. The split shifts with the model: in infrastructure as a service (IaaS) the customer manages much more than in software as a service (SaaS). The contract and provider documentation should make the division explicit, and the customer must still configure its own settings securely, since many cloud incidents come from customer misconfiguration.",
   "During the relationship, monitor the vendor: review assurance reports annually, track SLA and security metrics, reassess when services or risks change, watch for incidents and news, and keep an up-to-date inventory of vendors and the data they hold. At the end, ensure accounts and network connections are removed and data is returned or destroyed with evidence. Fourth parties are your vendors' vendors, such as the hosting company your SaaS provider uses. You rely on their controls but have no direct contract, so require your vendors to disclose key subcontractors, impose equivalent obligations on them, and notify you of changes.",
   "Consider a worked example. Marketing wants to sign up for an online survey tool that will collect customer email addresses and preferences. The security manager classifies it as medium risk, reviews the provider's SOC 2 Type II report and notes it relies on a large cloud host as a fourth party. The contract adds breach notification, data deletion at termination, and a right to receive annual assurance reports. The manager also confirms that single sign-on and MFA will be enabled on the customer side. A year later, the renewal triggers a reassessment and a fresh review of the assurance report.",
   "Common mistakes: assuming a provider's certification covers everything (check the scope and the report's exceptions); assessing vendors only once at onboarding; signing contracts before security review; assuming the cloud provider handles all security; and ignoring shadow IT, where business units adopt services without review, bypassing all of these steps. The first response to discovered shadow IT is to assess the risk of the service and the data it holds, then decide with the business whether to approve, add controls or migrate, rather than blocking it without understanding the business need.",
   "Exam questions often ask what the 'best' or 'most important' step is when engaging a provider. 'Before signing' points to due diligence and contract requirements. 'Right to audit' or 'assurance report' points to contractual provisions for ongoing oversight. 'Vendor's subcontractor' points to fourth-party risk and flow-down clauses. 'Who is accountable after outsourcing?' is always your organization. If an option involves testing the provider's systems without permission, it is wrong. For cloud questions, look for the answer that clarifies responsibilities under the shared responsibility model."
  ],
  "terms": [
   [
    "Third-party risk management (TPRM)",
    "The process of identifying, assessing, contracting for and monitoring risks from external providers."
   ],
   [
    "Due diligence",
    "Investigation of a provider's security, stability and suitability before entering a relationship."
   ],
   [
    "Right to audit",
    "A contract clause allowing the customer to audit the provider or receive independent assurance reports."
   ],
   [
    "SOC 2 Type II report",
    "An independent auditor's report on the design and operating effectiveness of a service organization's controls over a period."
   ],
   [
    "Shared responsibility model",
    "The division of security duties between a cloud provider and its customer, which varies by service model."
   ],
   [
    "Fourth party",
    "A subcontractor or supplier of your vendor, on which you depend without a direct contract."
   ],
   [
    "Shadow IT",
    "Technology or services adopted by business units without the knowledge or approval of IT and security."
   ]
  ],
  "example": "A health insurer outsources claims scanning to a document processing firm. Due diligence finds strong controls, but the firm stores scans with a separate archiving company. The insurer's contract requires the processor to disclose and bind that fourth party to equivalent security terms, notify breaches within a defined period, and delete data on termination. Annual reviews of both companies' assurance reports are added to the vendor management calendar.",
  "tip": "Assess before you sign, write requirements into the contract, and monitor throughout the relationship. Never test a provider without written permission, and remember accountability for your data always stays with you.",
  "check": [
   [
    "When should security requirements be included in a vendor relationship?",
    "Before the contract is signed, through due diligence and specific contract clauses, since leverage is lowest afterward."
   ],
   [
    "A SaaS provider's hosting company suffers a breach. What type of risk is this?",
    "Fourth-party risk, managed by requiring vendors to disclose subcontractors and flow down equivalent security obligations."
   ],
   [
    "Does moving a service to the cloud transfer accountability for data protection?",
    "No. The organization remains accountable; the shared responsibility model divides tasks, and the customer still secures its data, identities and configuration."
   ],
   [
    "What is the first step when a business unit is found using an unapproved cloud service?",
    "Assess the risk of the service and the data involved, then work with the business to approve, add controls or migrate."
   ]
  ]
 },
 {
  "t": "Program communications and reporting to stakeholders",
  "body": [
   "The information security program serves many stakeholders: the board, executives, business unit leaders, IT, audit, legal, regulators, employees, customers and partners. Each needs different information, at a different level of detail and frequency. Communicating well is how the information security manager builds support, secures resources and keeps the program aligned with the business. A technically excellent program that nobody understands will lose funding and influence.",
   "Start by identifying stakeholders and what they need. The board wants a concise view of top risks, trends against risk appetite and any decisions it must make. Executives want progress on strategic initiatives, risk to their objectives and resource needs. Business managers want to know how security affects their processes and what they must do. IT teams need technical detail, standards and priorities. Auditors and regulators need evidence of controls and compliance. Employees need clear, practical guidance. A simple stakeholder map listing each group, its interests, its influence and the right channel helps plan communication deliberately.",
   "Tailor the message to the audience. Use business language for business audiences: impact on revenue, operations, customers, safety and compliance, rather than protocol names and Common Vulnerabilities and Exposures (CVE) numbers. Lead with the key point and any decision required, then give supporting detail. Use visuals such as dashboards, heat maps and trend charts where they help, and keep a consistent format so trends are easy to follow from one report to the next. A good board report often fits on a page or two, with appendices for those who want more.",
   "Reporting should be regular and planned. A typical rhythm is monthly operational reports for IT and security teams, quarterly reports to executives and the audit or risk committee, and an annual program review against the strategy that also informs the next year's budget. Alongside the schedule, define triggers for immediate escalation, such as significant incidents, risks crossing tolerance or major control failures, so important news does not wait for the next scheduled report. A steering committee with business representatives is a common forum for two-way discussion and decisions.",
   "Communication also flows in. Listening to business leaders reveals new initiatives, pain points and changing priorities that the program must respond to, such as a planned acquisition or a new product launch that needs security early. Building relationships before a crisis makes it much easier to get cooperation during one. Honesty matters too: reporting bad news promptly, with a plan, builds credibility, while hiding problems until they become incidents destroys it. Employees are an audience as well: short, regular messages about what the program is doing and why, such as a note explaining a new sign-in requirement before it arrives, reduce resistance and support tickets far more than a policy published without explanation.",
   "Consider a worked example. A security manager's quarterly report to the executive committee used to list vulnerability counts by severity and firewall statistics, and executives stopped reading it. She rebuilds it around three questions: what are our top five risks and are they moving, what has the program delivered against the approved roadmap, and what decisions do we need from you. The top risk, unsupported systems in the customer billing platform, is expressed as potential customer impact and regulatory exposure, with two funding options. The committee approves one option in the meeting, and the technical detail goes to the IT operations report instead.",
   "Common mistakes: sending one detailed technical report to everyone; reporting only after incidents, which makes security look like a cost center; using fear to win budget instead of risk-based reasoning; presenting problems without options or recommendations; and failing to explain how security enables business goals such as entering new markets or winning customer trust. Another mistake is treating communication as one-way broadcasting and missing what the business is planning.",
   "Exam questions often ask what 'most effectively' gains senior management support or what a report to the board should contain. Clue words such as 'board', 'executives' or 'senior management' point to concise, business-focused reporting on risk, trends against appetite and decisions needed. 'Technical team' points to detailed operational metrics. When asked how to gain support for a program or budget, choose linking security to business objectives and risk, not citing threat statistics or industry fear. When asked what to do when a significant risk exceeds tolerance, choose escalating promptly rather than waiting for the next scheduled report."
  ],
  "terms": [
   [
    "Stakeholder",
    "Any person or group affected by, or able to influence, the information security program."
   ],
   [
    "Stakeholder map",
    "A list of stakeholder groups with their interests, influence and preferred communication channels."
   ],
   [
    "Steering committee",
    "A cross-functional group of business and IT leaders that guides and supports the security program."
   ],
   [
    "Escalation trigger",
    "A predefined condition that requires immediate reporting outside the normal schedule."
   ],
   [
    "Security dashboard",
    "A visual summary of key metrics and risks tailored to a particular audience."
   ],
   [
    "Business alignment",
    "Ensuring security activities and messages support the organization's goals and priorities."
   ]
  ],
  "example": "A bank's information security manager learns in a steering committee meeting that the retail division plans to launch a mobile payments service in six months. Because she hears about it early, she arranges security requirements and a threat model in the design phase. Her next board report shows the initiative as a strategic enabler, lists the residual risks and the controls planned, and asks the board to confirm the risk appetite for the new service.",
  "tip": "Match the message to the audience and link it to business objectives and risk. One detailed technical report for everyone, or reporting only after incidents, is the wrong answer. Boards want risk, trends and decisions.",
  "check": [
   [
    "What should a board-level security report focus on?",
    "Top risks and trends against appetite, program progress in business terms and any decisions the board must make."
   ],
   [
    "What is the most effective way to gain executive support for the security program?",
    "Show how it supports business objectives and manages risk to them, using business language rather than technical detail."
   ],
   [
    "A key risk crosses its tolerance two weeks after the quarterly report. What should the manager do?",
    "Escalate promptly according to the defined escalation triggers rather than waiting for the next scheduled report."
   ],
   [
    "Why is listening to business leaders part of program communication?",
    "It reveals new initiatives and changing priorities early, so security can be built in and the program stays aligned."
   ]
  ]
 },
 {
  "t": "Incident response plan and incident management team structure",
  "body": [
   "An incident is an event that threatens the confidentiality, integrity or availability of information or systems, or violates security policy. Incident management is the capability to prepare for, detect, respond to and recover from incidents in a way that limits harm to the business. The incident response plan (IRP) is the document that makes this capability repeatable, so that under pressure people know what to do, who decides and whom to call. In CISM terms, the main purpose of the plan is a timely, coordinated response that minimizes business impact.",
   "A good IRP defines scope and objectives, what counts as an incident, severity levels, roles and responsibilities, the phases of response, communication and escalation paths, contact lists (internal staff, legal counsel, regulators, law enforcement, insurers, key vendors and an incident response retainer), decision authorities, evidence handling requirements and links to related plans such as business continuity and disaster recovery. It is approved by senior management, stored where it can be reached when systems are down (including printed or offline copies), and reviewed at least yearly and after significant incidents or changes. Detailed playbooks for common incident types sit underneath the plan.",
   "The phases are usually described as preparation, identification (detection and analysis), containment, eradication, recovery and lessons learned. NIST describes a similar cycle, and its 2025 revision of Special Publication (SP) 800-61 aligns incident response with the six functions of the Cybersecurity Framework (CSF) 2.0: govern, identify, protect, detect, respond and recover. The exact names matter less than the logic: be ready, confirm what is happening, stop it spreading, remove the cause, restore safely and improve.",
   "The incident management team combines technical responders with business functions. A typical structure has an incident manager or commander who coordinates and keeps the timeline, technical leads for investigation and remediation, and representatives from legal, communications, human resources, privacy, the affected business owners and senior management as needed. Some organizations have a permanent computer security incident response team (CSIRT); others use a virtual team assembled when needed, or a hybrid with a small core team and external support through a retainer. The right model depends on size, risk and budget, but every model needs named people, backups and clear authority.",
   "Decision authority should be clear in advance. The plan should say who can declare an incident and at what severity, who can take a revenue-generating system offline, who approves external communication, who decides on law enforcement involvement or regulatory notification, and who can authorize spending on outside help. Deciding these things during a crisis wastes time and invites conflict. Pre-authorizing routine containment actions, such as disabling a compromised account, lets responders act fast while reserving business-affecting decisions for the right level.",
   "Consider a worked example. At 02:00 the security operations center sees ransomware encrypting file shares. The on-call analyst follows the plan: she declares a high-severity incident, isolates affected servers under pre-authorized containment, and pages the incident manager. The incident manager convenes the team on an out-of-band conference line, bringing in the IT operations lead, legal counsel, communications and the business owner of the affected systems. Because the plan names the chief operating officer as the authority to shut down the order system, that decision is made in ten minutes rather than debated for hours.",
   "Common mistakes: writing a plan that covers only technical steps; storing the only copy on the network that may be encrypted; leaving decision authority vague; failing to include legal and communications; not keeping contact lists current; and never testing the plan. Another mistake is building a plan in isolation from business continuity, so a major incident has no smooth handoff into continuity arrangements.",
   "Exam questions often ask for the 'primary purpose' of the IRP, the 'most important' element, or who should be on the team. The purpose is a timely, coordinated response that limits business impact, not catching attackers or assigning blame. 'Senior management approval' is what gives the plan authority. 'Who should be on the incident team?' includes legal, communications, HR and business owners, not only technical staff. 'Response was slow because nobody could decide' points to undefined decision authority. When asked what comes first in developing incident management, look for management support and defining objectives and scope."
  ],
  "terms": [
   [
    "Incident",
    "An event that threatens the confidentiality, integrity or availability of information or systems, or violates security policy."
   ],
   [
    "Incident response plan (IRP)",
    "The approved document defining how the organization prepares for, detects, responds to and recovers from incidents."
   ],
   [
    "Incident manager",
    "The person who coordinates the response, makes or escalates decisions and keeps the timeline."
   ],
   [
    "Computer security incident response team (CSIRT)",
    "A team with defined responsibility for handling security incidents."
   ],
   [
    "Playbook",
    "A detailed, step-by-step procedure for responding to a specific type of incident."
   ],
   [
    "Incident response retainer",
    "A pre-arranged contract with an external firm to provide response support quickly when needed."
   ],
   [
    "Out-of-band communication",
    "A communication channel separate from potentially compromised systems, used during incidents."
   ]
  ],
  "example": "A mid-sized insurer has no full-time CSIRT, so its plan defines a virtual team: the security manager as incident manager, two system administrators, the privacy officer, in-house counsel and the head of communications, each with a named deputy. An external firm on retainer provides forensic support. Printed copies of the plan and contact list are kept at two sites, and the team runs a tabletop exercise each year.",
  "tip": "The main purpose of the IRP is a timely, coordinated response that limits business impact. Incident teams include legal, communications, HR and business owners, not only technical staff, and decision authority must be defined before an incident.",
  "check": [
   [
    "What is the primary purpose of an incident response plan?",
    "To enable a timely, coordinated response that minimizes the impact of incidents on the business."
   ],
   [
    "Why should decision authority be defined in the plan?",
    "So critical decisions, such as taking systems offline or notifying regulators, are made quickly by the right people instead of debated during a crisis."
   ],
   [
    "Which non-technical functions belong on the incident management team?",
    "Legal, communications, human resources, privacy, affected business owners and senior management as needed."
   ],
   [
    "Why keep offline copies of the IRP and contact lists?",
    "Because an incident may make network systems, email or file shares unavailable when the plan is needed most."
   ]
  ]
 },
 {
  "t": "Business impact analysis: critical processes, RTO, RPO and MTD",
  "body": [
   "A business impact analysis (BIA) identifies the organization's critical business processes, what they depend on and how the impact of disrupting them grows over time. It is the foundation of continuity and recovery planning: you cannot set recovery targets or choose recovery strategies until you know what matters most and how quickly it must come back. The BIA also informs incident severity, asset classification and where to spend on resilience.",
   "The BIA is usually done through interviews, workshops and questionnaires with process owners, supported by financial and operational data. For each process it records the resources it depends on (people, applications, data, facilities, suppliers and other processes), the financial, operational, legal, regulatory and reputational impact of an outage over intervals such as one hour, one day and one week, and the point at which the impact becomes unacceptable. Upstream and downstream dependencies matter: a payroll process may look independent until you notice it relies on the identity system and a third-party bank file transfer. Senior management should review and approve the results, because they drive spending.",
   "Several time values come out of the BIA. Maximum tolerable downtime (MTD), also called the maximum tolerable period of disruption (MTPD), is the longest a process can be unavailable before the organization suffers unacceptable harm. The recovery time objective (RTO) is the target time to restore the process or system after disruption, and it must be shorter than the MTD. The recovery point objective (RPO) is the maximum acceptable data loss, measured as time: an RPO of one hour means backups or replication must capture data at least hourly. Some organizations also track work recovery time (WRT), the time to verify data and catch up after systems return; RTO plus WRT should fit within the MTD.",
   "Another useful concept is the service delivery objective (SDO), the level of service that must be provided during an alternate or degraded mode of operation until normal service resumes. A contact center might accept handling 60 percent of normal call volume during recovery, for example. Together, RTO, RPO and SDO tell the recovery teams how fast, how complete and how capable recovery must be.",
   "These targets drive cost. Short RTOs and RPOs need expensive solutions such as hot sites, clustering or real-time replication; longer ones allow cheaper options such as warm or cold sites and nightly backups. The BIA lets management balance the cost of recovery capability against the cost of downtime. The point where the rising cost of faster recovery meets the falling cost of shorter outages is often shown as a curve, and the sensible target lies near where the two lines cross.",
   "Consider a worked example. An online retailer's BIA finds that the order processing system loses significant revenue per hour and that customers begin switching to competitors after about eight hours, so the MTD is set at eight hours. Management sets an RTO of four hours to leave time for verification, and an RPO of 15 minutes because lost orders cannot be recreated. The marketing analytics platform, by contrast, can be down for a week with modest impact, so it gets an RTO of five days and nightly backups. The recovery budget is focused on order processing.",
   "Common mistakes: choosing a recovery site before completing the BIA; letting IT set RTOs without business owners; confusing RTO (time to restore) with RPO (data loss); setting an RTO longer than the MTD; ignoring dependencies such as identity services, networks and suppliers; and failing to update the BIA after major business changes. A BIA also differs from a risk assessment. The risk assessment asks how likely threats are and what controls reduce them; the BIA assumes the disruption happens and asks how bad it would be and how fast recovery must be. Both feed the continuity program.",
   "Exam questions often ask what should be done 'first' in continuity planning or which value a scenario describes. 'Identify critical processes' or 'determine impact over time' points to the BIA, which comes before strategy selection. 'How much data can we lose' points to RPO; 'how quickly must it be restored' points to RTO; 'longest the business can survive without it' points to MTD. 'Who should determine criticality?' is business process owners with senior management approval, not IT alone. If an answer sets RTO longer than MTD, it is wrong."
  ],
  "terms": [
   [
    "Business impact analysis (BIA)",
    "An analysis that identifies critical processes, their dependencies and the impact of disruption over time."
   ],
   [
    "Maximum tolerable downtime (MTD)",
    "The longest a process can be unavailable before causing unacceptable harm to the organization."
   ],
   [
    "Recovery time objective (RTO)",
    "The target time to restore a process or system after a disruption; it must be less than the MTD."
   ],
   [
    "Recovery point objective (RPO)",
    "The maximum acceptable amount of data loss, measured as time before the disruption."
   ],
   [
    "Work recovery time (WRT)",
    "The time needed after systems are restored to verify data and resume normal work."
   ],
   [
    "Service delivery objective (SDO)",
    "The minimum level of service that must be provided during alternate or degraded operations."
   ],
   [
    "Dependency",
    "A resource, such as a system, supplier or person, that a process needs in order to operate."
   ]
  ],
  "example": "A regional hospital runs a BIA and finds that its electronic health record system can be unavailable for no more than four hours before patient safety is at risk, even with paper downtime procedures. Clinicians confirm they can re-enter up to 15 minutes of lost notes. The hospital sets an RTO of two hours and an RPO of 15 minutes, which justifies continuous replication to a second data center, while the staff rota system gets a 48-hour RTO.",
  "tip": "The BIA comes before setting recovery strategies and choosing recovery sites. RTO is about time to restore; RPO is about how much data can be lost. RTO must be less than MTD, and business owners, not IT alone, determine criticality.",
  "check": [
   [
    "What must be completed before choosing a recovery site strategy?",
    "The business impact analysis, which identifies critical processes and sets the RTO and RPO the strategy must meet."
   ],
   [
    "A process can lose no more than 30 minutes of data. Which objective is this?",
    "The recovery point objective (RPO), which measures acceptable data loss in time."
   ],
   [
    "Why must the RTO be shorter than the MTD?",
    "If restoration takes longer than the maximum tolerable downtime, the organization suffers unacceptable harm before recovery completes."
   ],
   [
    "How does a BIA differ from a risk assessment?",
    "A risk assessment looks at likelihood of threats and controls; a BIA assumes disruption occurs and measures its impact and required recovery speed."
   ]
  ]
 },
 {
  "t": "Business continuity plan (BCP) development",
  "body": [
   "A business continuity plan (BCP) describes how the organization will keep critical business functions running, or restore them quickly, during and after a significant disruption. Disruptions include cyberattacks, but also power failures, pandemics, supplier failures, natural disasters, loss of a building and loss of key staff. The BCP focuses on the business: people, processes, locations and suppliers. The disaster recovery plan (DRP), covered in the next lesson, focuses on restoring technology. Both sit inside a wider business continuity management program that is owned by senior management.",
   "BCP development follows a clear sequence, and the exam often tests the order. First, senior management sponsors the program and approves its policy, scope and objectives; without that support, plans lack resources and authority. Second, the business impact analysis (BIA) identifies critical processes and recovery targets such as the recovery time objective (RTO) and recovery point objective (RPO). Third, a risk assessment identifies threats to those processes and preventive controls that reduce the chance of disruption. Fourth, continuity strategies are selected for each critical process. Fifth, the plan is written. Finally, it is tested, people are trained, and the plan is maintained.",
   "Continuity strategies are chosen to meet the recovery targets at a sensible cost. Options include alternate work locations, remote working, manual workarounds such as paper forms, alternate or dual suppliers, cross-trained staff to avoid dependence on one person, reduced service levels during the disruption, and reciprocal arrangements with other sites. For each process the plan should state which strategy applies, what resources it needs and who activates it. Strategies for people deserve attention: if staff cannot reach a building or are themselves affected, the best technical arrangements still fail.",
   "A usable BCP includes activation criteria (who can declare a continuity event and when), roles and teams with deputies, contact lists, the procedures for each critical process, the resources needed, communication plans for staff, customers, suppliers and regulators, and the steps for returning to normal operations. It should be concise and action-oriented, with checklists rather than long prose, because people will read it under stress. Copies must be available when normal systems and buildings are not.",
   "The BCP must connect with other plans. The incident response plan handles security incidents; if an incident escalates into a major disruption, continuity actions should start smoothly, so the triggers and handoffs between plans must be defined. The DRP restores the IT services the BCP depends on, so the recovery targets in both must match: a business process with a four-hour RTO cannot depend on an application the DRP will restore in two days. Crisis management and communication plans sit above both and coordinate the executive response. Plans are kept current through regular review, typically at least yearly, and after significant changes such as new systems, relocations, reorganizations, mergers or new suppliers. An out-of-date contact list or procedure can make an otherwise good plan fail when it is needed. Each plan section should have a named owner responsible for keeping it accurate, and version control should make sure everyone uses the current copy.",
   "Consider a worked example. An insurance company's BIA shows claims handling must resume within one day and customer phone lines within four hours. The BCP team selects strategies: contact center staff switch to working from home using cloud telephony, claims staff can use a partner office in another city, and a manual claims log is available if the claims system is down. The plan names the operations director as the person who can declare a continuity event. When a flood closes the head office, the director activates the plan, phone lines are running from homes within three hours, and the DRP team restores the claims application at the secondary data center in parallel.",
   "Common mistakes: starting by picking an alternate site before the BIA; letting IT write the BCP alone without business owners; writing a plan nobody has tested; ignoring people and supplier dependencies; and failing to align BCP and DRP recovery targets. Another mistake is treating continuity as a one-off project rather than an ongoing program with owners, budget and testing.",
   "Exam questions often ask for the 'first step' in developing a BCP, the 'most important' factor for success, or the difference between BCP and DRP. The first step is obtaining senior management support and defining scope; within the analysis, the BIA comes first. 'Keep the business operating' points to the BCP; 'restore IT systems and data' points to the DRP. 'Who should own the BCP?' is business management, supported by IT and security. When asked what most often makes a plan fail, look for answers such as lack of testing, outdated contents or lack of management support."
  ],
  "terms": [
   [
    "Business continuity plan (BCP)",
    "A plan for keeping critical business functions operating or restoring them quickly during and after a disruption."
   ],
   [
    "Business continuity management (BCM)",
    "The ongoing program of governance, analysis, planning, testing and maintenance for continuity."
   ],
   [
    "Continuity strategy",
    "The approach chosen to keep a critical process running, such as an alternate site, remote work or manual workaround."
   ],
   [
    "Activation criteria",
    "The conditions and authority under which a continuity plan is declared and put into action."
   ],
   [
    "Manual workaround",
    "A temporary non-automated way of performing a process while systems are unavailable."
   ],
   [
    "Crisis management",
    "The executive-level coordination of the organization's response to a major disruption, including communications."
   ]
  ],
  "example": "A food distributor's BCP relies on a single refrigerated warehouse management system and one logistics supplier. A review after a supplier strike reveals the dependency, so the company signs a standby agreement with a second carrier, trains warehouse staff on a paper picking process, and updates the plan and contact lists. The next test simulates the system being down for a day and confirms orders still ship.",
  "tip": "The BCP keeps business functions running; the DRP restores IT. The BCP program starts with senior management support and the BIA, not with picking an alternate site, and BCP and DRP recovery targets must match.",
  "check": [
   [
    "What is the first step in developing a business continuity program?",
    "Obtaining senior management support and approval of scope and policy, followed by the business impact analysis."
   ],
   [
    "How does a BCP differ from a DRP?",
    "The BCP keeps critical business processes running; the DRP restores the IT systems and data those processes depend on."
   ],
   [
    "Why must BCP and DRP recovery targets be aligned?",
    "If IT restores a system more slowly than the business process requires, the continuity plan cannot meet its objectives."
   ],
   [
    "Why must the BCP be reviewed after a reorganization or new supplier?",
    "Changes in people, processes and dependencies can make contacts, procedures and strategies out of date, causing the plan to fail."
   ]
  ]
 },
 {
  "t": "Disaster recovery plan (DRP) and recovery site strategies",
  "body": [
   "A disaster recovery plan (DRP) describes how the organization restores IT systems, data and infrastructure after a disruption, in time to meet the recovery time objectives (RTOs) and recovery point objectives (RPOs) set in the business impact analysis (BIA). It is usually owned by IT and supports the business continuity plan (BCP). Where the BCP asks 'how does the business keep working?', the DRP asks 'how do we get the technology back, in the right order, with the right data?'.",
   "The DRP identifies the systems in scope and their priority, the recovery strategy for each, the order of restoration, detailed recovery procedures, the recovery team and contacts, and how to return operations to the primary site when it is ready (failback). Order matters because of dependencies: networks, identity services, name resolution and databases usually come before the applications that need them. A recovery procedure should be specific enough that a competent administrator who did not build the system could follow it, including where backups are, how to restore them and how to confirm the system works.",
   "Recovery site options trade speed for cost. A hot site is fully equipped with current hardware, software and data, and can take over in minutes to hours; it is the most expensive of the traditional options. A warm site has infrastructure and some equipment but needs data restoration and configuration, so it takes hours to days. A cold site provides space, power, cooling and connectivity only; equipment must be delivered and installed, so recovery takes days to weeks, but it is cheap. A mirrored or active-active site runs in parallel with production for near-zero downtime and is the costliest. Mobile sites can be delivered to a location. Reciprocal agreements with another organization are inexpensive but hard to rely on, because the partner may lack capacity or be affected by the same event. Cloud-based disaster recovery can provide hot or warm capacity that is paid for mainly when used.",
   "Data protection underpins every strategy. Full backups copy everything; incremental backups copy changes since the last backup of any kind, so they are fast to take but need the full backup plus every incremental to restore; differential backups copy changes since the last full backup, so they grow each day but need only the full plus the latest differential. Replication and snapshots can meet tighter RPOs. Copies must be stored separately from production and protected against ransomware, for example with offline or immutable copies and separate credentials. A backup that has never been restored is an assumption, not a capability; regular restore tests prove that data is recoverable and show how long it takes.",
   "Recovery sites must be far enough from the primary site that a regional event, such as a flood or power grid failure, does not affect both, and they must have security controls equivalent to production. A recovery environment with weaker controls becomes an attractive target, and data restored there is just as sensitive as it was in production. Contracts with recovery providers should state capacity, how quickly the site is available and what happens if several customers declare a disaster at once.",
   "Consider a worked example. A logistics firm's BIA sets a four-hour RTO and a 15-minute RPO for its dispatch system, and a three-day RTO with a 24-hour RPO for its reporting platform. The DRP uses database replication to a warm environment in a cloud region hundreds of kilometers away for dispatch, with pre-built server images that can be started quickly, and nightly immutable backups for reporting. The restore order puts directory services and networking first, then the dispatch database, then the dispatch application. A quarterly test brings dispatch up in the cloud in under three hours.",
   "Common mistakes: choosing a recovery site without a BIA; placing the recovery site in the same flood plain or power grid; trusting backup job success messages without restore tests; keeping backups online where ransomware can encrypt them; forgetting dependencies such as identity and licensing; and giving the recovery environment weaker security. Another mistake is planning failover but not failback, leaving the organization stuck at the recovery site.",
   "Exam questions often give an RTO and cost constraint and ask which site fits. 'Minutes to hours' or 'most critical' points to hot; 'lowest cost' and 'days to weeks acceptable' points to cold; a middle ground points to warm. 'Best way to confirm backups' is a restore test, not reviewing logs. 'Recovery site affected by the same event' points to insufficient geographic separation. 'Restoration failed because the directory was not available' points to ignoring dependencies in the restoration order. When asked what determines the DRP strategy, choose the RTO and RPO from the BIA."
  ],
  "terms": [
   [
    "Disaster recovery plan (DRP)",
    "A plan for restoring IT systems, data and infrastructure after a disruption to meet recovery targets."
   ],
   [
    "Hot site",
    "A fully equipped recovery site with current systems and data that can take over within minutes to hours."
   ],
   [
    "Warm site",
    "A partly equipped recovery site that needs data restoration and configuration, taking hours to days."
   ],
   [
    "Cold site",
    "A recovery site providing only space, power and cooling, requiring days to weeks to become operational."
   ],
   [
    "Incremental backup",
    "A backup of changes since the last backup of any kind; restores need the full backup plus every incremental."
   ],
   [
    "Differential backup",
    "A backup of all changes since the last full backup; restores need the full backup plus the latest differential."
   ],
   [
    "Immutable backup",
    "A backup copy that cannot be altered or deleted for a set period, protecting it from ransomware."
   ],
   [
    "Failback",
    "Returning operations from the recovery site to the primary site once it is ready."
   ]
  ],
  "example": "A council's backups reported success every night for two years. During a ransomware incident, staff discover the backup server shared the same administrator credentials and was encrypted too, and older tapes had never been restore-tested. After recovery, the council adopts immutable backups with separate credentials, stores copies offline, and runs monthly restore tests that measure how long recovery takes against the RTO.",
  "tip": "Match the site to the RTO: hot for fastest and most expensive, cold for slowest and cheapest, warm in between. Verify backups with actual restore tests, not job success messages, and restore dependencies such as identity and networks first.",
  "check": [
   [
    "An organization needs recovery within hours but cannot afford a hot site. Which option fits best?",
    "A warm site, or cloud-based warm capacity, which balances recovery time against cost."
   ],
   [
    "What is the best way to confirm backups can meet the RPO and RTO?",
    "Perform regular restore tests and measure the recovered data's age and the time taken."
   ],
   [
    "Why must a recovery site be geographically separate from the primary site?",
    "So a regional event such as a flood or grid failure does not disable both sites at once."
   ],
   [
    "Which backup type needs only the last full backup and one other set to restore?",
    "A differential backup, which contains all changes since the last full backup."
   ]
  ]
 },
 {
  "t": "Incident classification, categorization and severity",
  "body": [
   "Not every event is an incident, and not every incident is equally serious. Classification sorts what the organization detects so that each case gets the right level of attention, the right team and the right speed of response. Without it, teams either treat everything as a crisis and burn out, or treat serious incidents as routine and respond too slowly. Classification is defined in the incident response plan before anything happens, so responders are applying agreed criteria rather than improvising.",
   "It helps to separate terms. An event is any observable occurrence, such as a login or a firewall block. An alert is an event that a tool flags as potentially significant. An incident is a confirmed or strongly suspected event that threatens information or systems or violates policy. A breach is an incident in which data is confirmed to have been accessed or disclosed without authorization, which may trigger legal notification duties. Most events are harmless, many alerts are false positives, and only a fraction become incidents; triage is the step that makes these decisions.",
   "Categorization describes the type of incident, for example malware, ransomware, unauthorized access, denial of service, data loss or leakage, insider misuse, phishing, account compromise or third-party compromise. Categories help route incidents to the right playbook and team, and support trend analysis: if account compromise is the most frequent category, that shapes investment in identity controls. A consistent taxonomy, defined in the plan and used in the ticketing system, makes reporting across months and years meaningful. An incident can belong to more than one category, and the plan should say which one is recorded as primary.",
   "Severity describes how serious the incident is, and it should be based mainly on business impact. Typical criteria include which business processes are affected and how critical they are according to the business impact analysis, the sensitivity and volume of data involved, the number of users or customers affected, legal, regulatory or contractual implications, safety implications, and whether the incident is contained or spreading. Technical details such as the malware family or the number of alerts are inputs to understanding, but they are not the basis for severity.",
   "A severity matrix defines levels, such as low, medium, high and critical, with clear criteria and the response expected for each: who is notified, how quickly, which team leads, what response time is expected and whether senior management or the crisis team is involved. Predefined levels make prioritization, escalation and resourcing consistent and fast. For example, a critical incident might require the incident manager to convene the full team immediately and brief executives, while a low-severity incident is handled by the security operations team within normal working hours.",
   "Consider a worked example. An analyst sees an endpoint alert for a known credential-stealing tool on one laptop. Initially this is classified as malware, low severity: one device, no sensitive data known to be affected. During investigation, the team finds the attacker used stolen credentials to log in to the customer database server. The category becomes unauthorized access, and severity is upgraded to critical because customer personal data may be exposed and notification laws may apply. The upgrade triggers escalation to the incident manager, legal counsel and the privacy officer as the matrix requires. Severity can change during any incident in this way, so the plan should require regular reassessment and allow upgrades or downgrades as facts emerge, with the reason and time of each change recorded in the incident log.",
   "Common mistakes: basing severity on technical indicators instead of business impact; classifying once and never revisiting; letting each analyst use personal judgment without criteria; confusing an incident with a breach, which has specific legal meaning; and not linking severity to the BIA, so a minor-looking outage of a critical process is underrated.",
   "Exam questions often ask what 'should primarily determine' incident severity or priority. The answer is business impact: criticality of affected processes, data sensitivity and scope. 'Most important factor in prioritizing incidents' points to business impact, not the time of detection, the attacker's identity or the number of alerts. 'Confirmed unauthorized disclosure of data' points to a breach. 'Severity was wrong once more facts emerged' points to the need for ongoing reassessment. When asked the purpose of predefined severity levels, choose consistent, timely escalation and allocation of resources."
  ],
  "terms": [
   [
    "Event",
    "Any observable occurrence in a system or network."
   ],
   [
    "Alert",
    "An event flagged by a tool as potentially significant, which requires triage."
   ],
   [
    "Incident",
    "A confirmed or strongly suspected event that threatens information or systems or violates policy."
   ],
   [
    "Breach",
    "An incident in which data is confirmed to have been accessed or disclosed without authorization."
   ],
   [
    "Categorization",
    "Labeling an incident by type, such as malware or unauthorized access, to route it and support trend analysis."
   ],
   [
    "Severity matrix",
    "A table defining severity levels, their criteria and the required response and escalation for each."
   ],
   [
    "Triage",
    "The initial assessment that decides whether an alert is an incident and how it should be prioritized."
   ]
  ],
  "example": "A university's help desk receives reports that a department website is showing an unauthorized message. The security team categorizes it as defacement, and because the site holds no personal data and is not critical to teaching, rates it medium severity. When investigation shows the attacker also reached a server holding student records, the severity is raised to critical, and the privacy officer and legal counsel are brought in under the plan.",
  "tip": "Classification criteria should be based on business impact, data sensitivity and scope, not on the malware family, detection time or alert count. Severity is reassessed as facts emerge.",
  "check": [
   [
    "What should primarily determine the severity of an incident?",
    "Its business impact, including the criticality of affected processes, the sensitivity of data involved and the scope."
   ],
   [
    "What distinguishes a breach from other incidents?",
    "A breach involves confirmed unauthorized access to or disclosure of data, which may trigger legal notification requirements."
   ],
   [
    "Why use predefined severity levels?",
    "To make prioritization, escalation and resource allocation consistent and fast rather than improvised."
   ],
   [
    "An incident rated low is found to involve domain administrator credentials. What should happen?",
    "Reassess and upgrade the severity, triggering the escalation and response required for the higher level."
   ]
  ]
 },
 {
  "t": "Incident management training, testing and exercises",
  "body": [
   "A plan that has never been practiced is likely to fail in a real incident. People forget their roles, contact lists are out of date, dependencies are missed, tools do not work as expected and decisions take too long. Training, testing and exercises turn a document into a capability. They also give management evidence that the organization can respond, which matters for auditors, regulators, insurers and customers.",
   "Training prepares each participant for their role. Responders learn tools, playbooks and evidence handling; incident managers learn coordination and decision points; executives learn their decision authority and communication duties; and all staff learn how to recognize and report incidents. Training should be repeated when people join, when roles change and when the plan changes. Backups for key roles need the same training as primary holders, because incidents rarely happen when everyone is available.",
   "Tests and exercises range from low to high disruption. A checklist or desk check reviews the plan's contents for accuracy, such as confirming contact numbers still work. A structured walkthrough has team members step through the plan together to confirm it makes sense. A tabletop exercise presents a realistic scenario, often with timed 'injects' that add new information, and participants discuss what they would do without touching systems; it is the most common way to test decision-making and communication. A simulation or functional exercise has teams carry out some actions in a controlled environment, such as restoring a system in a test lab. For continuity and recovery, a parallel test brings up recovery systems alongside production without affecting it, and a full interruption test actually fails over from production, which is the most realistic but also the most risky and needs senior management approval.",
   "Each exercise follows a clear cycle. Define objectives, such as 'test the decision to notify regulators' or 'confirm backups can be restored within the RTO'. Design a scenario that reflects current threats and the organization's real systems. Brief participants on rules and scope. Run the exercise with a facilitator and observers who record timings, decisions and problems. Hold a debrief immediately, while memories are fresh. Then write an after-action report with specific improvements, owners and due dates, and track them to completion. An exercise where everything goes perfectly probably was not challenging enough.",
   "Test regularly, at least yearly for most plans, and after significant changes in systems, staff, suppliers or the threat landscape. Increase realism over time: start with walkthroughs for a new plan, then tabletops, then functional tests. Results and improvements should be reported to management, because gaps in readiness are risks. Some organizations also include key vendors, such as a cloud provider or incident response retainer firm, in exercises to test the handoffs.",
   "Consider a worked example. A retailer runs a tabletop exercise on a ransomware scenario. Injects reveal that the plan does not say who can approve paying for an outside forensic firm, that the communications lead's phone number is wrong, and that nobody knows the insurer's notification deadline. The after-action report assigns the finance director to define spending authority, the security manager to update contacts and add insurer requirements, and legal to brief the team. Three months later, a functional test confirms the fixes and times a restore of the point-of-sale database against its RTO.",
   "Common mistakes: running an exercise without objectives; using an unrealistic scenario; involving only technical staff; skipping the after-action report; not tracking improvements; and testing only when an auditor asks. Another mistake is starting with a full interruption test on an immature plan, which risks causing the very outage the plan is meant to handle. Training only the primary role holders and not their deputies is another common gap.",
   "Exam questions often describe an exercise and ask its type, or ask which is 'least disruptive' or 'most realistic'. 'Discussion', 'scenario' and 'no systems affected' point to a tabletop. 'Reviewing the plan document' points to a checklist or walkthrough. 'Recovery systems run alongside production' is a parallel test. 'Production is shut down and operations move to the recovery site' is a full interruption test, the most disruptive. When asked the most important output of an exercise, choose identified gaps with assigned improvements. When asked when to test, choose regularly and after significant change."
  ],
  "terms": [
   [
    "Checklist review",
    "A desk check of the plan's contents, such as contacts and procedures, for accuracy and completeness."
   ],
   [
    "Walkthrough",
    "A session in which team members step through the plan together to confirm it is workable."
   ],
   [
    "Tabletop exercise",
    "A discussion-based exercise using a realistic scenario, without touching live systems."
   ],
   [
    "Inject",
    "New information introduced during an exercise to change the scenario and test decisions."
   ],
   [
    "Parallel test",
    "A recovery test that brings up recovery systems alongside production without interrupting it."
   ],
   [
    "Full interruption test",
    "A test that actually shuts down production and fails over to recovery, the most realistic and disruptive type."
   ],
   [
    "After-action report",
    "A written record of what happened in an exercise or incident, with improvements, owners and dates."
   ]
  ],
  "example": "A bank runs quarterly tabletop exercises for its incident management team, rotating scenarios among ransomware, insider data theft and a third-party outage. Each year it also runs a parallel test of its disaster recovery environment. In one tabletop, the team realizes its out-of-band conference bridge requires corporate single sign-on, which would be unavailable in a directory compromise, so a separate bridge is procured.",
  "tip": "Tabletop means discussion without touching systems; full interruption is the most disruptive and realistic. Test regularly and after major changes, not only when auditors ask, and the key output is tracked improvements.",
  "check": [
   [
    "Which test type exercises decision-making without affecting any systems?",
    "A tabletop exercise, in which participants discuss their response to a realistic scenario."
   ],
   [
    "Which recovery test carries the most risk to operations?",
    "A full interruption test, because production is actually shut down and operations move to the recovery site."
   ],
   [
    "What is the most valuable output of an incident exercise?",
    "Identified gaps with specific improvement actions, owners and due dates that are tracked to completion."
   ],
   [
    "When should incident response plans be tested beyond the regular schedule?",
    "After significant changes in systems, staff, suppliers, the plan itself or the threat landscape."
   ]
  ]
 },
 {
  "t": "Incident management tools and techniques: SIEM, SOAR and playbooks",
  "body": [
   "Detecting and handling incidents at scale depends on tools that collect data, spot suspicious activity and help responders act consistently. The information security manager does not need to configure them, but must understand what each provides, how they fit together, what resources they need and how to judge whether they are working. Tools are part of a capability that also needs skilled people and sound processes.",
   "Logging is the foundation. Systems, applications, network devices, identity providers and cloud services must generate the right logs, with accurate, synchronized timestamps (usually through the Network Time Protocol, NTP), and send them to central storage with retention that meets investigation and legal needs. A logging standard should say which events to record, such as successful and failed logins, privilege changes and administrative actions. Without the right logs, no tool can detect or investigate an incident.",
   "A security information and event management (SIEM) system collects and normalizes those logs, correlates events across sources and raises alerts when rules or analytics detect suspicious patterns, such as logins from two countries within minutes, or many failed logins followed by a success. Rules must be tuned to the environment: too sensitive and analysts drown in false positives, too loose and real attacks pass unnoticed. Endpoint detection and response (EDR) tools monitor activity on laptops and servers and can isolate a device remotely. Extended detection and response (XDR) platforms combine endpoint, email, identity and cloud signals. Network detection tools watch traffic, and user and entity behavior analytics (UEBA) look for unusual behavior compared with a baseline. Threat intelligence feeds enrich alerts with context about known malicious indicators.",
   "Security orchestration, automation and response (SOAR) platforms connect these tools and run playbooks. A playbook is a documented, step-by-step response for a specific incident type, such as phishing, ransomware or a lost device; a runbook is often used for the detailed technical steps within it. Automation handles repetitive steps, like enriching an alert with threat intelligence, checking a file hash, opening a ticket, or disabling an account after approval, so analysts can focus on judgment. Automation supports people; it does not replace them, and high-impact actions usually keep a human approval step.",
   "Tools only help if alerts are triaged properly. The first step on any alert is validation: is this a real incident or a false positive? Only then classify, escalate or contain. Metrics such as mean time to detect (MTTD) and mean time to respond or contain (MTTR) show whether tools and processes are improving. These averages should be tracked over time and broken down by incident category, because a single overall number can hide a weak area. Other useful measures include the false positive rate, the percentage of critical systems sending logs, and the percentage of alert types covered by a playbook.",
   "Consider a worked example. An employee reports a suspicious email using the report button. The SOAR playbook for phishing starts automatically: it extracts links and attachments, checks them against threat intelligence and a sandbox, searches the mail system for other copies, and opens a ticket. The verdict is malicious, so after an analyst approves, the playbook removes all copies from mailboxes, blocks the sender domain and checks the SIEM for anyone who clicked. One user did; the analyst resets that user's credentials and reviews sign-in logs. The whole process takes minutes instead of hours, and every step is recorded.",
   "Common mistakes: buying a SIEM without defining use cases or staffing it; failing to send logs from critical systems; not synchronizing time, which makes correlation and timelines unreliable; leaving rules untuned so analysts ignore alerts; automating disruptive actions without approval steps; and assuming a tool replaces the need for trained analysts. Another mistake is taking drastic action, such as shutting down a server, on an unvalidated alert.",
   "Exam questions often ask which tool 'correlates' or 'aggregates' logs (SIEM), which 'automates response' or 'runs playbooks' (SOAR), and which 'isolates an endpoint' (EDR). 'Consistent response to a common incident type' points to a playbook. 'First step when an alert fires' is validation or triage. 'Timeline cannot be reconstructed across systems' points to missing time synchronization or logging. When asked about the main benefit of SOAR, choose faster, more consistent response with less manual effort, not replacing staff. When asked what a new SIEM needs first, choose defining requirements, log sources and use cases."
  ],
  "terms": [
   [
    "Security information and event management (SIEM)",
    "A system that collects, normalizes and correlates logs from many sources and raises alerts."
   ],
   [
    "Security orchestration, automation and response (SOAR)",
    "A platform that connects security tools and automates playbook steps."
   ],
   [
    "Endpoint detection and response (EDR)",
    "Software that monitors endpoints for malicious activity and can contain affected devices."
   ],
   [
    "User and entity behavior analytics (UEBA)",
    "Analytics that detect unusual behavior by comparing activity to a learned baseline."
   ],
   [
    "Playbook",
    "A documented, step-by-step response procedure for a specific type of incident."
   ],
   [
    "False positive",
    "An alert that indicates malicious activity when none has occurred."
   ],
   [
    "Mean time to detect (MTTD)",
    "The average time between an incident starting and the organization detecting it."
   ]
  ],
  "example": "A manufacturer's SIEM produced thousands of alerts a day and analysts ignored most of them. The security manager led a tuning project: rules were mapped to the top risks, noisy rules were adjusted or retired, and SOAR playbooks automated enrichment for the five most common alert types. Within a quarter the false positive rate fell sharply, mean time to respond improved, and analysts had time to hunt for threats.",
  "tip": "SOAR speeds and standardizes response; it does not replace staff or log collection. A SIEM correlates logs; EDR contains endpoints. When an alert fires, validate it before taking drastic action.",
  "check": [
   [
    "What is the main function of a SIEM?",
    "To collect and normalize logs from many sources, correlate events and raise alerts on suspicious patterns."
   ],
   [
    "What is the primary benefit of SOAR?",
    "Faster, more consistent response by automating repetitive playbook steps, freeing analysts for judgment-based work."
   ],
   [
    "What should an analyst do first when a high-priority alert fires?",
    "Validate the alert to confirm whether it is a real incident before escalating or taking containment actions."
   ],
   [
    "Why is time synchronization important for incident tools?",
    "Accurate, consistent timestamps are needed to correlate events across systems and build a reliable incident timeline."
   ]
  ]
 },
 {
  "t": "Incident investigation, evaluation and evidence handling",
  "body": [
   "Once an incident is confirmed, investigation establishes what happened, how, when, which systems and data were affected, and whether the attacker is still present. Evaluation uses those facts to assess business impact, confirm or change severity, and guide containment, notification and recovery decisions. Good investigation answers the questions management, regulators and customers will ask, and it identifies the root cause so the incident does not recur.",
   "Investigators gather information from many sources: logs in the security information and event management (SIEM) system, endpoint telemetry, network data, affected systems, cloud audit trails, email records and interviews. They build a timeline from initial access to discovery and identify indicators of compromise (IOCs), such as malicious files, domains, IP addresses or unauthorized accounts, that can be used to search for other affected systems. The scope often grows as the investigation proceeds, so findings are shared with the incident manager regularly and severity is reassessed.",
   "Evidence handling matters because an incident may lead to legal action, regulatory inquiry, insurance claims or disciplinary proceedings, often months later. The principle is to preserve evidence and change it as little as possible. Volatile data, such as memory contents, running processes and active network connections, should be captured first because it disappears on shutdown; this is the order of volatility, from most to least volatile: CPU registers and cache, memory, network state and running processes, temporary files, disk, then remote logs and archived media. Disks are copied with forensic tools and write blockers to create bit-for-bit images, and cryptographic hashes are computed so anyone can later verify the copy is identical to the original.",
   "```text\n$ sha256sum evidence_disk01.img\n<hash value>  evidence_disk01.img\n# Record the hash, time, collector and storage location in the chain of custody form.\n# Analyze a working copy; re-hash later to prove the image has not changed.\n```",
   "Chain of custody documents who collected each item of evidence, when, how it was stored and every transfer between people. Gaps in the chain allow evidence to be challenged as altered. Analysis is done on verified copies, never on the original. Actions such as browsing the original disk, running antivirus on it or reimaging the system destroy or change evidence and should be avoided until evidence is preserved, unless business safety requires otherwise. Legal counsel should be involved early when litigation, law enforcement or regulators are likely, and many organizations engage an outside forensic firm through counsel so that work may be protected by legal privilege where the law allows.",
   "Consider a worked example. A finance manager's account sends unusual payment instructions. The team captures memory from the manager's laptop before shutting it down, images the disk with a write blocker, hashes the image and logs each step on a chain of custody form. Mailbox audit logs show a forwarding rule created from an unfamiliar location. Searching the SIEM for that location reveals two more compromised accounts. Evaluation shows no customer data was accessed but one fraudulent payment was made, so the incident stays high severity, the bank is contacted to recall the payment and legal counsel advises on reporting to law enforcement.",
   "Common mistakes: rebooting or reimaging a system before capturing volatile data; letting well-meaning staff browse the original disk; skipping hashing, so integrity cannot be proven; losing track of who handled evidence; using personal devices or unapproved tools; and involving legal counsel only after evidence has already been handled poorly. Another mistake is investigating only the first system found and missing the wider scope. The information security manager's job is to make sure the plan, tools, retainers and training cover these requirements before an incident, not during it.",
   "Exam questions often ask what to do 'first' with a compromised system that may be needed as evidence. Look for answers that preserve evidence: isolate the system from the network rather than powering it off, capture volatile data, create a forensic image and hash it. 'Proves the evidence was not altered' points to hashing and chain of custody. 'Evidence was ruled inadmissible' points to a broken chain of custody or analysis of the original. 'Which data to collect first' points to the most volatile. When asked who should be involved if prosecution is possible, choose legal counsel, and possibly law enforcement on counsel's advice."
  ],
  "terms": [
   [
    "Indicator of compromise (IOC)",
    "An observable artifact, such as a file hash, domain or account, that suggests a system has been compromised."
   ],
   [
    "Order of volatility",
    "The principle of collecting the most short-lived evidence, such as memory, before more persistent evidence such as disk."
   ],
   [
    "Forensic image",
    "A bit-for-bit copy of storage media made with forensic tools so the original remains unchanged."
   ],
   [
    "Write blocker",
    "A device or software that allows data to be read from media while preventing any writes to it."
   ],
   [
    "Hash",
    "A cryptographic fingerprint of data used to prove a copy is identical to the original and unaltered."
   ],
   [
    "Chain of custody",
    "Documentation of who collected, handled, stored and transferred each item of evidence, and when."
   ],
   [
    "Root cause",
    "The underlying weakness or failure that allowed an incident to happen."
   ]
  ],
  "example": "An employee leaving for a competitor is suspected of copying customer lists. Human resources and legal ask the security team to investigate. The team preserves the employee's laptop and cloud file activity logs, creates hashed forensic images, and records each transfer on a chain of custody form. The analysis on copies shows large downloads the night before resignation, and because evidence was preserved correctly, the company can rely on it in legal proceedings.",
  "tip": "Preserve first: capture volatile data, create a forensic image, hash it, analyze the copy and keep chain of custody. Options that browse, scan, reboot or reimage the original destroy evidence.",
  "check": [
   [
    "Why is memory captured before a disk image?",
    "Memory is volatile and lost when the system is powered off, so it must be collected first according to the order of volatility."
   ],
   [
    "What proves a forensic image is identical to the original?",
    "Matching cryptographic hashes calculated from the original and the image, supported by chain of custody records."
   ],
   [
    "A technician runs antivirus on a compromised server's original disk. What is the problem?",
    "It can alter or delete evidence, undermining its integrity and its usefulness in legal or regulatory proceedings."
   ],
   [
    "When should legal counsel be involved in an investigation?",
    "Early, whenever litigation, regulatory reporting or law enforcement involvement is possible."
   ]
  ]
 },
 {
  "t": "Incident containment, eradication and recovery",
  "body": [
   "Containment limits the damage an incident can do. It is usually the first priority once an incident is confirmed, especially for fast-spreading threats such as ransomware or worms. Short-term containment actions include isolating infected hosts from the network (many endpoint detection and response tools can do this with one action), disabling compromised accounts, revoking active sessions and tokens, blocking malicious domains and IP addresses, and segmenting affected networks. Longer-term containment may involve temporary fixes, such as extra filtering or monitoring, that let the business keep running while a permanent solution is built.",
   "Containment decisions involve business trade-offs. Shutting down a revenue-generating system stops an attack but also stops sales. Routine technical actions, such as blocking a known malicious address or quarantining a file, can be pre-authorized for the technical team, while disruptive actions should involve the business owner, ideally with authority defined in the incident response plan. Containment should also preserve evidence where possible, for example isolating a machine rather than powering it off, and avoid tipping off an attacker before the team is ready to act everywhere at once. Against a capable attacker, coordinated containment across all known footholds at the same moment works better than piecemeal blocking.",
   "Eradication removes the cause: malware, backdoors, persistence mechanisms such as scheduled tasks or new services, unauthorized accounts, and the vulnerability or weakness that allowed entry. If the root cause is not fixed, the attacker can return. Eradication often involves rebuilding systems from known-good images rather than trying to clean them, resetting credentials broadly (including service accounts and, after a directory compromise, highly privileged keys), patching, and hardening configurations. Root cause analysis is essential when the same kind of incident recurs.",
   "Recovery restores systems and business processes to normal operation. Before restoring, confirm that backups are clean and predate the compromise, and that the exploited weakness has been closed. Restore in priority order based on the business impact analysis (BIA), bringing up dependencies such as identity and networking first. Validate that systems work correctly and that data is complete, then monitor closely for signs of reinfection, because attackers often try to return. Business owners confirm when their processes are back to normal, and the incident is formally closed only then.",
   "The phases overlap in practice, but the order of priorities matters: contain first, then eradicate, then recover. Restoring from backup before containing a spreading threat simply gives it fresh systems to infect. Paying a ransom is not a containment method; whether to pay is a business and legal decision made by senior management with legal advice, considering laws and sanctions, insurance terms and the fact that payment does not guarantee recovery or deletion of stolen data.",
   "Consider a worked example. Ransomware begins encrypting servers in one office. The security team uses EDR to isolate affected servers, disables the compromised administrator account and blocks the attacker's command-and-control domains, all pre-authorized. The incident manager asks the operations director to approve disconnecting the office's network link to headquarters, which stops the spread. Investigation finds the attacker entered through an unpatched remote access gateway. Eradication patches the gateway, rebuilds affected servers from clean images and resets privileged credentials. Recovery restores data from immutable backups taken before the first sign of compromise, in BIA priority order, and the servers are watched closely for two weeks.",
   "Common mistakes: restoring before containment; cleaning a compromised system instead of rebuilding it; resetting passwords for a few users while the attacker still holds privileged access; restoring backups that already contain the malware; skipping the root cause fix so the attacker returns through the same door; and taking disruptive action without the business owner. Another mistake is declaring the incident over as soon as systems are running, without enhanced monitoring or business confirmation.",
   "Exam questions often ask what to do 'first' or 'next' after an incident is confirmed. For spreading threats, the answer is containment, such as isolating affected systems. 'Before restoring from backup' points to verifying backups are clean and the vulnerability is fixed. 'Attacker returned after cleanup' points to incomplete eradication or an unfixed root cause. 'Who approves taking a critical system offline?' is the business owner or authority named in the plan. If an answer involves paying a ransom as a technical step, or restoring before containing, it is usually wrong."
  ],
  "terms": [
   [
    "Containment",
    "Actions that limit the spread and impact of an incident, such as isolating systems or disabling accounts."
   ],
   [
    "Eradication",
    "Removing the cause of an incident, including malware, persistence mechanisms and the exploited weakness."
   ],
   [
    "Recovery",
    "Restoring systems and business processes to normal operation and confirming they work correctly."
   ],
   [
    "Persistence mechanism",
    "A method an attacker uses to keep access, such as a scheduled task, new service or hidden account."
   ],
   [
    "Known-good image",
    "A trusted, verified system build used to rebuild compromised systems."
   ],
   [
    "Pre-authorized action",
    "A response action the technical team may take without further approval because the plan allows it."
   ]
  ],
  "example": "A software company finds an attacker in its cloud environment using a stolen access key. The team revokes the key, disables the affected identity and restricts outbound access from compromised workloads. Investigation shows a developer's key was committed to a code repository. Eradication removes the key, rotates all related secrets and rebuilds the affected workloads from infrastructure templates. Secret scanning is added to the build pipeline, and the environment is monitored closely for a month.",
  "tip": "Order matters: contain before restoring. Before recovery, verify backups are clean and the vulnerability is fixed. Disruptive containment needs business owner input, and paying a ransom is a business and legal decision, not containment.",
  "check": [
   [
    "What is usually the first priority after a ransomware incident is confirmed?",
    "Containment, such as isolating affected systems and disabling compromised accounts, to stop the spread."
   ],
   [
    "What must be checked before restoring systems from backup?",
    "That backups are clean and predate the compromise, and that the exploited vulnerability has been fixed."
   ],
   [
    "Why rebuild compromised systems from known-good images rather than cleaning them?",
    "Cleaning may miss hidden persistence mechanisms, while a rebuild from a trusted image removes them."
   ],
   [
    "An attacker regains access a week after cleanup. What most likely went wrong?",
    "Eradication was incomplete or the root cause was not fixed, for example an unpatched entry point or unreset credentials."
   ]
  ]
 },
 {
  "t": "Incident communications: escalation, notification and regulatory reporting",
  "body": [
   "How an organization communicates during an incident can matter as much as the technical response. Poor communication leads to delays, contradictory messages, legal exposure and lost trust. The incident response plan should define communication in advance: who is told what, when, by whom and through which channels. That way responders can concentrate on the incident rather than debating who to call.",
   "Internal escalation moves information up and across the organization. Severity levels determine who must be informed and how fast; for example, a plan might require critical incidents to be reported to the chief information security officer (CISO) within minutes and to executive leadership within an hour. Contact lists with named backups must be current and available offline. Because an attacker may be watching email or chat, the plan should include out-of-band channels, such as a separate conference bridge or phone tree, for sensitive incident communication. Regular status updates at set intervals keep leaders informed without constant interruptions to responders.",
   "External notification covers customers, regulators, business partners, law enforcement, insurers and the media. Many laws and regulations set deadlines for reporting certain incidents or breaches; under the European Union General Data Protection Regulation (GDPR), for example, personal data breaches must generally be reported to the supervisory authority within 72 hours of becoming aware of them where they pose a risk, and some sector rules require even faster early warnings. Contracts may add their own deadlines, and cyber insurance policies often require prompt notice to the insurer. Because these obligations vary by jurisdiction and sector, the plan should include a regulatory notification matrix prepared with legal counsel in advance.",
   "Deciding whether and when to notify follows a sequence. Responders establish the facts: what data or systems were affected and for whom. Legal counsel and the privacy officer assess which obligations apply and whether thresholds are met. Senior management makes the decision on legal advice, following the plan. Communications prepares messages, and the designated person sends them within deadlines. Notification often has to begin before the investigation is complete, so initial reports state what is known and are updated as facts emerge.",
   "Public communication should go through designated spokespeople only. Staff should know to refer media and outside inquiries to the communications team rather than answering themselves, including on social media. Messages should be accurate, consistent and reviewed by legal; they should acknowledge what is known, avoid speculation, say what the organization is doing and tell affected people what they can do to protect themselves. Denying a real incident or releasing unverified details damages trust further. Prepared templates for common scenarios save time. Customer-facing staff, such as the contact center, need a short script and a route to escalate difficult questions, so that what they say matches the official statement.",
   "Consider a worked example. A retailer discovers that an attacker accessed a database holding customer names and addresses. The security manager escalates to the CISO and the incident manager convenes legal, privacy, communications and the business owner by a separate conference line. Legal determines that regulators in two jurisdictions must be notified within their deadlines and that customers should be informed. The chief executive approves the notifications on legal advice. Communications issues a customer notice with guidance on phishing risks, and the contact center receives a script. Every notification and its time is recorded in the incident log.",
   "Common mistakes: letting technical staff contact regulators or media on their own; missing deadlines because the clock was misunderstood; using compromised email for incident discussions; waiting for a complete investigation before any notification; making inconsistent statements across channels; forgetting to notify the insurer or key partners; and failing to document decisions. Documentation is part of communication: regulators and courts may later ask when the organization knew about the incident and what it did.",
   "Exam questions often ask who should decide on external notification or how employees should handle outside inquiries. Notification decisions are made by senior management with legal counsel, following the plan, not by the security team alone. 'Journalist calls an employee' points to referring the call to the designated spokesperson. 'Attacker may be monitoring email' points to out-of-band communication. 'Regulatory deadline' points to legal involvement and a prepared notification process. When asked what should be defined before an incident, choose escalation paths, notification criteria and authorized spokespeople."
  ],
  "terms": [
   [
    "Escalation",
    "Moving information about an incident to higher levels of management or other teams according to predefined criteria."
   ],
   [
    "Notification",
    "Informing external parties, such as regulators, customers or insurers, about an incident as required or appropriate."
   ],
   [
    "Regulatory notification matrix",
    "A prepared table of which laws and contracts require notification, to whom, under what conditions and by when."
   ],
   [
    "Out-of-band communication",
    "Communication through channels separate from potentially compromised systems."
   ],
   [
    "Designated spokesperson",
    "The person authorized to speak publicly for the organization about an incident."
   ],
   [
    "General Data Protection Regulation (GDPR)",
    "The European Union data protection law that includes personal data breach notification requirements."
   ]
  ],
  "example": "During a ransomware incident, a local news reporter phones a warehouse supervisor asking whether customer data was stolen. Following training, the supervisor politely refers the reporter to the communications office. Meanwhile, the incident team coordinates on a separate phone bridge because corporate email is affected, and legal counsel prepares the regulatory notification with the facts confirmed so far, noting that updates will follow.",
  "tip": "Notification decisions are made by senior management with legal counsel, following the plan. Employees refer outside inquiries to the designated contact, and sensitive incident communication uses out-of-band channels.",
  "check": [
   [
    "Who should decide whether to notify regulators of a breach?",
    "Senior management, advised by legal counsel and following the incident response plan."
   ],
   [
    "An employee receives a call from a journalist about an ongoing incident. What should they do?",
    "Refer the journalist to the designated spokesperson or communications team without commenting."
   ],
   [
    "Why use out-of-band channels during an incident?",
    "Attackers may be monitoring email or chat, and normal systems may be unavailable."
   ],
   [
    "Should notification wait until the investigation is complete?",
    "Not necessarily; legal deadlines may require initial notification based on known facts, followed by updates."
   ]
  ]
 },
 {
  "t": "Post-incident review and lessons learned",
  "body": [
   "The post-incident review, also called lessons learned or an after-action review, is the last phase of incident response and one of the most valuable. Its purpose is to improve: to find what worked, what did not, and what should change so that similar incidents are less likely or less harmful in future. An incident is expensive; the review is how the organization gets some value back from that cost.",
   "The review should happen soon after the incident is closed, typically within days or a couple of weeks, while memories are fresh, and include everyone who played a significant role, from technical responders to legal, communications, business owners and relevant vendors. A facilitator, ideally someone not directly responsible for the outcome, guides discussion through a timeline of the incident built from logs, tickets and notes. For long incidents, interim reviews may be held while details are still clear. The review should also look at what went well, such as a fast report from an employee or a playbook that worked, so those practices are kept and shared rather than lost. Its findings are compared with previous incidents to spot patterns.",
   "The facilitator asks structured questions. How was the incident detected, and could it have been detected sooner? Were roles, decision authorities and escalation paths clear? Did tools and playbooks work? Was evidence handled correctly? Was communication timely, accurate and consistent? What was the root cause, and why did existing controls not prevent or detect it? Techniques such as asking 'why' repeatedly help move from the immediate trigger, such as a user clicking a link, to the underlying cause, such as missing multi-factor authentication (MFA) on the system the stolen password opened.",
   "A blameless approach is essential. If people fear punishment, they will hide mistakes and the organization will miss the systemic causes, such as unclear procedures, missing tools, poor alert tuning or unrealistic workloads, that allowed the incident. Individual accountability still exists for deliberate misconduct or negligence, but that is handled through separate human resources processes, not in the review meeting.",
   "The output is a written report with findings and specific improvement actions, each with an owner and due date. Actions might include updating the incident response plan or playbooks, adding detection rules, fixing control gaps, changing architecture, providing training, adjusting third-party contracts or updating the risk register and business impact analysis. Metrics from the incident, such as time to detect, time to contain, time to recover and total cost including business losses, are recorded so trends can be tracked across incidents and used to justify investment.",
   "Consider a worked example. After a phishing-led compromise of a sales executive's mailbox, the review timeline shows the attacker created a forwarding rule on Monday, but the alert was not examined until Thursday because the SIEM rule sent it to an unmonitored queue. The phishing email itself was reported by two users within minutes, but no playbook existed to search for other copies. Actions are assigned: the security operations lead reroutes and tunes the alert, the automation engineer builds a phishing playbook, the identity team enforces phishing-resistant MFA for executives, and the security manager updates the risk register and reports the key lessons to the risk committee.",
   "Common mistakes: skipping the review for 'small' incidents or because everyone is tired; holding it months later when details are lost; focusing on who made the error instead of why the system allowed it; writing vague actions such as 'improve monitoring' with no owner or date; and never checking whether actions were completed. Repeated incidents of the same type are a warning sign that earlier lessons were not acted on and that root causes remain. The manager tracks actions to completion and reports significant lessons and trends to senior management.",
   "Exam questions often ask for the 'primary purpose' of a post-incident review or the 'best' next step after closing an incident. The purpose is improvement of controls, processes and the plan, not assigning blame or satisfying auditors. 'Same type of incident keeps recurring' points to an unaddressed root cause and failure to implement lessons learned. 'Who should attend?' includes all key participants, not only technical staff. When asked what the review should produce, choose specific, owned, dated actions and updates to the plan and risk register."
  ],
  "terms": [
   [
    "Post-incident review",
    "A structured meeting and report after an incident to identify what worked, what did not and what to improve."
   ],
   [
    "Blameless review",
    "A review approach that focuses on systemic causes rather than punishing individuals, encouraging honest reporting."
   ],
   [
    "Root cause analysis",
    "A method for finding the underlying reason an incident happened, beyond the immediate trigger."
   ],
   [
    "Five whys",
    "A technique of repeatedly asking why to move from symptoms to root causes."
   ],
   [
    "Improvement action",
    "A specific change arising from a review, with an owner and due date, tracked to completion."
   ],
   [
    "Mean time to contain",
    "The average time from detecting an incident to stopping its spread."
   ]
  ],
  "example": "A city government suffers its third account compromise in a year through password reuse. The post-incident review notes that earlier reviews recommended MFA for remote access but the action had no owner and was never funded. The security manager presents the pattern to the executive committee with the cost of the three incidents, gains approval and a named owner, and MFA is deployed within the quarter. No further compromises of this type occur.",
  "tip": "The purpose of lessons learned is improvement, not blame. Every finding needs an owner and due date, and repeated incidents of the same kind point to an unfixed root cause.",
  "check": [
   [
    "What is the primary purpose of a post-incident review?",
    "To identify improvements to controls, processes and the response plan so similar incidents are less likely or less harmful."
   ],
   [
    "Why should post-incident reviews be blameless?",
    "Fear of blame makes people hide mistakes, so systemic causes go unfound and uncorrected."
   ],
   [
    "The same type of incident happens three times in a year. What does this suggest?",
    "The root cause has not been fixed and lessons from earlier reviews were not implemented."
   ],
   [
    "What makes a lessons-learned action effective?",
    "It is specific, has an owner and a due date, and is tracked to completion and reported."
   ]
  ]
 }
], { reviewed: "2026-09-30" });
