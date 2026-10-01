/* Lessons for ISACA CISA (2024 job practice): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("cisa", [
 {
  "t": "IS audit standards, guidelines and the ISACA Code of Professional Ethics",
  "body": [
   "An information systems (IS) auditor gives other people confidence that information systems are controlled. That confidence is only worth something if the audit is done to a recognized standard by someone who is honest, competent and independent. ISACA publishes the IT Audit Framework (ITAF), which contains mandatory standards, guidelines that explain how to apply them, and tools and techniques that give practical help. The Certified Information Systems Auditor (CISA) exam expects you to think like someone who follows these standards by default, so many questions are really asking 'what would a standards-compliant auditor do next?'",
   "The standards fall into three groups. General standards set the ground rules for the audit function and the auditor: the audit charter, organizational independence, auditor objectivity, reasonable expectation that the engagement can be completed, due professional care, proficiency, assertions and the criteria the subject matter is measured against. Performance standards govern how the work is done: risk assessment in planning, audit scheduling, performance and supervision, materiality, evidence, using the work of other experts, and irregularities and illegal acts. Reporting standards cover the report itself and follow-up activities. Standards are mandatory. Guidelines are not, but an auditor who departs from them should be able to justify and document why.",
   "The audit charter is the starting point in practice. It is a document approved by the board or audit committee that states the audit function's purpose, authority, responsibility and accountability, including unrestricted access to records, systems and people. When an auditee later refuses access, the charter is what gives the auditor the right to escalate. An engagement letter plays a similar role for an external or one-off engagement, but the charter is the ongoing mandate for internal audit.",
   "Independence has two parts, and the exam tests the difference. Organizational independence means the audit function reports to a level, usually the audit committee of the board, that lets it work without interference; a function that reports only to the chief information officer (CIO) whose area it audits is not independent. Independence in fact and appearance means the individual auditor has no conflicting interest or role, and that a reasonable outsider would not doubt their objectivity. Typical threats are self-review (auditing a control you designed), management participation (making decisions that belong to management), familiarity (long, close relationships with the auditee) and personal interest. Auditors may advise on controls, but the decision and the implementation stay with management. When independence is impaired, the auditor discloses the impairment to the appropriate parties rather than quietly carrying on.",
   "The ISACA Code of Professional Ethics asks members to support the implementation of, and encourage compliance with, appropriate standards and controls; perform duties objectively, with due diligence and professional care; serve stakeholders lawfully while maintaining high standards of conduct and not discrediting the profession; maintain the privacy and confidentiality of information obtained in the course of work unless disclosure is required by legal authority; maintain competence and undertake only work they can reasonably complete; inform appropriate parties of the results of work, revealing all significant facts known; and support the professional education of stakeholders. Failure to comply can lead to an investigation and disciplinary action, including losing the certification.",
   "Consider a worked example. You are an internal IS auditor assigned to review the identity and access management platform. Last year, before joining audit, you were the engineer who designed its role model. That is a self-review threat. The standards-compliant response is to tell the audit manager before fieldwork starts, document the issue, and either have someone else perform the review or, if that is impossible, disclose the impairment in the report. Later in the same audit, the CIO asks you to leave out a finding about shared administrator accounts because 'it will be fixed soon'. Due professional care and the ethics requirement to reveal all significant facts mean the finding stays in the report, with management's response and planned date recorded beside it.",
   "Common mistakes: treating guidelines as mandatory or standards as optional; believing that disclosing an impairment is optional if you are confident you can stay objective; thinking confidentiality means never sharing findings (it means not disclosing outside proper channels, while still reporting results to those entitled to them); and assuming that giving advice always breaks independence. Advice is fine; taking ownership of the decision or operating the control is what crosses the line. Another trap is assuming the auditor must detect all fraud. The standards require the auditor to consider the risk of irregularities and report indicators, not to guarantee detection.",
   "Exam questions are usually short scenarios. 'The auditor previously designed the system' or 'the auditor's spouse manages the area' points to an independence impairment, and the answer is to disclose it to audit management or the audit committee. 'Management asks the auditor to omit a finding' points to reporting honestly with management's response included. 'Which document gives the audit function its authority?' is the audit charter. 'Must an auditor follow this guideline?' calls for recognizing that departures are allowed but must be justified. When in doubt, choose the option that reports honestly through the proper channel and preserves objectivity."
  ],
  "terms": [
   [
    "ITAF",
    "ISACA's IT Audit Framework: mandatory standards, supporting guidelines, and tools and techniques for IS audit and assurance work."
   ],
   [
    "Audit charter",
    "A board- or audit committee-approved document that sets out the audit function's purpose, authority, responsibility and access rights."
   ],
   [
    "Organizational independence",
    "A reporting line for the audit function, usually to the audit committee, that lets it work without interference from the areas it audits."
   ],
   [
    "Independence in appearance",
    "The absence of circumstances that would lead a reasonable third party to doubt the auditor's objectivity."
   ],
   [
    "Due professional care",
    "Applying the skill and diligence that a prudent, competent auditor would use in the same circumstances."
   ],
   [
    "Self-review threat",
    "The risk that an auditor will not critically evaluate work they performed or designed themselves."
   ],
   [
    "Code of Professional Ethics",
    "ISACA's set of conduct principles that members and certification holders agree to follow, enforced through disciplinary procedures."
   ]
  ],
  "example": "A bank's internal audit team is asked to review a new payments platform. One team member helped select the vendor and configure its approval workflow. The audit manager records the self-review threat, assigns that person to a different engagement and staffs the review with auditors who had no role in the project. The audit charter, approved by the audit committee, is cited when the vendor initially refuses to share its administrator logs, and access is granted after escalation.",
  "tip": "When a question involves an independence problem, the answer is almost always to disclose it to audit management or the audit committee, not to carry on quietly or narrow the scope without telling anyone.",
  "check": [
   [
    "Which ITAF element is mandatory: standards, guidelines, or tools and techniques?",
    "Standards are mandatory; guidelines explain how to apply them and departures must be justified, and tools and techniques are practical aids."
   ],
   [
    "An auditor discovers that they designed a control they are now testing. What should they do?",
    "Disclose the self-review threat to audit management so the work can be reassigned or the impairment disclosed, because independence in fact and appearance is at risk."
   ],
   [
    "What document grants the internal audit function its authority and access rights?",
    "The audit charter, approved by the board or audit committee."
   ],
   [
    "Does the Code of Ethics allow an auditor to drop a significant finding at management's request?",
    "No; the code requires informing appropriate parties of the results and revealing all significant facts, so the finding stays with management's response."
   ]
  ]
 },
 {
  "t": "Types of audits, assessments and reviews: IS, compliance, financial, operational, integrated, forensic",
  "body": [
   "Not every audit asks the same question. Before you plan any work, you need to know what kind of engagement it is, because that decides the objective, the criteria, the evidence you need and who will rely on the result. The CISA exam often describes an engagement in a sentence or two and expects you to recognize its type, then choose the approach that fits it.",
   "A financial audit gives an opinion on whether financial statements are fairly presented in accordance with an accounting framework. IS auditors support it by testing the IT general controls (ITGCs) and application controls behind financial systems, because if those controls fail, the numbers cannot be trusted. A compliance audit tests whether the organization follows specific laws, regulations, contracts or internal policies, for example a payment card security standard or a data protection law; its criteria are the requirements themselves. An operational audit evaluates whether a process is efficient and effective and achieves its objectives, such as whether the service desk resolves tickets within agreed times. An IS audit evaluates the controls over information systems: general IT controls such as access, change management and operations, and application controls inside a system. An integrated audit combines financial, operational and IS work on one process so the auditor sees the whole control picture instead of disconnected slices.",
   "A forensic audit or investigation is different in purpose. It gathers and analyzes evidence about suspected fraud, misconduct or crime in a way that could stand up in court or a disciplinary hearing. Evidence handling becomes critical: the auditor preserves original media, works on verified copies (for example, comparing hash values before and after imaging), and keeps a chain of custody that records every person who handled the evidence and when. Forensic work often involves legal counsel from the start. Specialized reviews include administrative audits, which look at the efficiency of administrative processes, and third-party or service organization reviews, such as reading a System and Organization Controls (SOC) report on a cloud provider.",
   "Assessments and reviews are not always audits, and the difference is the level of assurance. A control self-assessment (CSA) has the process owners evaluate their own controls, usually in facilitated workshops or through questionnaires. It builds ownership, spreads control awareness and can surface risks early, but it does not replace independent audit because the people assessing are not independent. A risk assessment identifies and rates risks rather than testing controls. A review gives limited, negative-form assurance ('nothing came to our attention') rather than the reasonable assurance of an audit. An agreed-upon procedures engagement reports factual findings from specific procedures and gives no overall opinion at all.",
   "Consider a worked example. A retailer asks internal audit for three things in one quarter. The finance director wants comfort that the enterprise resource planning (ERP) system produces reliable revenue figures for year-end; that is IS audit work supporting a financial audit, focused on ITGCs and revenue application controls. The compliance officer wants to know whether card data handling meets the card industry standard the acquiring bank requires; that is a compliance audit with the standard as criteria. Separately, a manager reports that a buyer may be steering contracts to a relative's company; that becomes a forensic investigation, run with legal counsel, where email and purchasing records are preserved and imaged before anyone is interviewed.",
   "Common mistakes: treating a CSA as a substitute for audit; confusing operational audits (efficiency and effectiveness) with compliance audits (following rules); starting a forensic investigation by confronting the suspect or examining original disks directly, which can destroy evidence; and assuming an integrated audit simply means several separate audits on the same day. Integration means one engagement with shared objectives and a combined conclusion. Another frequent error is relying on a review report as if it gave the same assurance as an audit opinion.",
   "Match the assurance to the need. If a board or regulator will rely on the conclusion, an independent audit with reasonable assurance is usually required. If management wants to improve awareness and ownership across many teams cheaply, CSA fits. If the goal is to prove what happened for legal action, the forensic approach with chain of custody is needed.",
   "Exam questions often hinge on a clue word. 'Efficiency', 'effectiveness' or 'economy' points to an operational audit. 'Laws', 'regulations', 'contract' or 'policy adherence' points to compliance. 'Fairly presented financial statements' is financial. 'Combines financial and IS procedures' is integrated. 'Suspected fraud', 'admissible' or 'chain of custody' is forensic. 'Process owners evaluate their own controls' is CSA, and the correct statement about CSA is that it supplements, not replaces, independent audit."
  ],
  "terms": [
   [
    "Integrated audit",
    "An audit that combines financial, operational and IS audit work to evaluate all the controls over a process or system together."
   ],
   [
    "Control self-assessment (CSA)",
    "A technique in which process owners and staff evaluate their own controls, usually in facilitated workshops."
   ],
   [
    "Forensic audit",
    "An engagement to collect and analyze evidence about suspected fraud or crime for possible legal or disciplinary use."
   ],
   [
    "Compliance audit",
    "An audit that tests adherence to specific laws, regulations, contracts or internal policies."
   ],
   [
    "Operational audit",
    "An audit that evaluates the efficiency, effectiveness and economy of a process or function."
   ],
   [
    "Chain of custody",
    "A documented record of who collected, handled and stored evidence, and when, showing it was not altered."
   ],
   [
    "Reasonable assurance",
    "A high but not absolute level of assurance, which is the level an audit opinion provides."
   ]
  ],
  "example": "A hospital's audit committee asks whether its new electronic health record system is being used securely and in line with health privacy rules. Audit plans an integrated engagement: IS auditors test access provisioning and audit logging, compliance specialists compare practices with the privacy regulation, and operational auditors check whether clinicians' workarounds, such as shared logins at nursing stations, are slowing care or bypassing controls. One report gives the committee a single view of risk across all three angles.",
  "tip": "Control self-assessment does not replace audit. If an answer suggests CSA removes the need for independent testing, it is wrong; CSA supplements audit and improves ownership.",
  "check": [
   [
    "An engagement checks whether IT help desk processes are efficient and meet their objectives. What type is it?",
    "An operational audit, because it evaluates efficiency and effectiveness rather than rule compliance or financial statements."
   ],
   [
    "What is the main benefit of control self-assessment, and its main limitation?",
    "It builds control ownership and awareness among process owners, but it is not independent, so it cannot replace independent audit."
   ],
   [
    "Why is chain of custody central to a forensic audit?",
    "Evidence may be used in legal or disciplinary proceedings, so the organization must show who handled it and that it was not altered."
   ],
   [
    "What distinguishes an integrated audit from separate financial and IS audits?",
    "It combines the work into one engagement with shared objectives, giving a single conclusion about all controls over the process."
   ]
  ]
 },
 {
  "t": "Risk-based audit planning: audit universe, risk assessment, annual plan and engagement scope",
  "body": [
   "No audit function can review everything every year. Risk-based audit planning is how you decide where limited audit hours will do the most good. ISACA's standards require the IS auditor to use an appropriate risk assessment approach when planning, and the exam consistently rewards answers that start with understanding the business and its risks before choosing tests or tools.",
   "Planning happens at two levels. At the annual (or rolling) level, the audit function lists its audit universe, meaning every auditable area: business processes, applications, infrastructure platforms, projects, third parties and cloud services. It then rates each area for risk using factors such as financial impact, regulatory exposure, data sensitivity, complexity, recent changes (a new system or a merger), time since last audit, past findings and management's own risk assessments. The highest-risk areas are audited more often and more deeply. The resulting plan is approved by the audit committee and revised during the year when risks change, for example after a major incident or acquisition.",
   "At the engagement level, the auditor first gains an understanding of the business process, its objectives, the systems that support it and the key risks. Useful sources include process documentation, prior audit reports, risk registers, organization charts, interviews with process owners and walkthroughs. From that understanding the auditor sets the engagement objectives (what question the audit answers) and scope (which systems, locations, processes and period are included), identifies the key controls that address the key risks, and decides the nature, timing and extent of testing. The scope and objectives are communicated to the auditee, often in an engagement memo, so that expectations match.",
   "The audit risk model links these steps. Inherent risk is the risk of a material error or loss before considering any controls; payment processing has higher inherent risk than a cafeteria menu system. Control risk is the chance that controls will not prevent or detect that error in time. Detection risk is the chance that the auditor's own procedures miss it. Audit risk, the chance of reaching a wrong conclusion, is the combination of all three. The auditor cannot change inherent or control risk; they can only change detection risk, by doing more, better or better-timed testing when inherent and control risks are high.",
   "Materiality also shapes planning. In IS audit, materiality is not only a monetary threshold. A weakness can be material because of what it could allow, such as a flaw that lets someone bypass approvals across all transactions, expose sensitive personal data or disrupt a critical service. A small-dollar error that reveals a systemic control failure may be more significant than a large one-off error.",
   "Consider a worked example. An audit function has capacity for twenty engagements but sixty areas in its universe. The payroll system was replaced last quarter, handles personal data and has never been audited; the data center's physical controls were audited last year with no findings. Risk scoring puts payroll near the top and the data center near the bottom. For the payroll engagement, the auditor reads the project documents, interviews the payroll manager and walks one pay run through the system. Key risks are unauthorized changes to pay rates and ghost employees. The scope becomes employee master data changes and pay-run approvals over the six months since go-live, with a data analytics test comparing payroll records against the human resources system.",
   "Common mistakes: choosing audits by rotation alone or by what was done last year; letting the auditee define scope to exclude the riskiest part; starting fieldwork before understanding the process; believing the auditor can lower inherent or control risk; and treating materiality as purely a dollar figure. Another trap is failing to update the plan: a plan approved in January that ignores a ransomware incident in May is no longer risk-based.",
   "Exam wording gives this away. 'What should the auditor do first?' in a planning scenario is almost always 'understand the business' or 'perform a risk assessment', not 'select a sample' or 'run a tool'. 'Which risk can the auditor control?' is detection risk. 'High inherent and control risk' implies more substantive testing. 'The audit plan should be based primarily on' points to risk. 'Who approves the annual audit plan?' is the audit committee."
  ],
  "terms": [
   [
    "Audit universe",
    "The complete list of auditable areas in the organization, used as the starting point for risk-based planning."
   ],
   [
    "Inherent risk",
    "The risk of an error or loss before considering any controls."
   ],
   [
    "Control risk",
    "The risk that an error will not be prevented or detected in time by the organization's controls."
   ],
   [
    "Detection risk",
    "The risk that the auditor's procedures fail to detect a material error; the only part of audit risk the auditor controls."
   ],
   [
    "Materiality",
    "The significance of a weakness or error, judged by its potential effect on decisions or objectives, not only its monetary value."
   ],
   [
    "Engagement scope",
    "The boundaries of a specific audit: the systems, processes, locations and time period included."
   ]
  ],
  "example": "After a company moves its customer database to a cloud platform, the chief audit executive reruns the risk assessment of the audit universe. The migration raises the risk scores for identity management, data protection and third-party oversight, so the audit committee approves swapping a planned printing-services review for a cloud configuration and access audit. The engagement starts with interviews and architecture diagrams to understand the new design before any testing is chosen.",
  "tip": "If asked what the auditor should do first when planning, choose understanding the business and assessing risk. Choosing tests, samples or tools comes later.",
  "check": [
   [
    "Which component of audit risk can the auditor directly influence?",
    "Detection risk, by changing the nature, timing and extent of audit procedures."
   ],
   [
    "What is the audit universe used for?",
    "It lists every auditable area so each can be risk-rated and the highest-risk areas prioritized in the audit plan."
   ],
   [
    "Why might a low-dollar error still be material in an IS audit?",
    "Because it may reveal a systemic control failure, such as bypassed approvals, that could affect all transactions or expose sensitive data."
   ],
   [
    "A new regulation significantly changes the organization's risk profile mid-year. What should happen to the audit plan?",
    "It should be reassessed and revised with audit committee approval, because a risk-based plan must reflect current risks."
   ]
  ]
 },
 {
  "t": "Types of controls: preventive, detective, corrective, compensating; general vs application controls",
  "body": [
   "A control is any policy, procedure, practice or technical mechanism that management puts in place to give reasonable assurance that objectives will be met and that risks stay within acceptable limits. Auditors classify controls so they can judge whether the mix is sensible and decide how to test each one. The same control can be described in several ways at once: by its function, its scope and whether it is manual or automated.",
   "By function, preventive controls stop a problem before it happens: segregation of duties, input validation, access controls, approval workflows and encryption. Detective controls find problems after they occur: reconciliations, log reviews, exception reports, hash totals and intrusion detection alerts. Corrective controls fix the problem and reduce its impact: restoring from backup, incident response procedures, patching after a flaw is found and contingency plans. Deterrent controls discourage bad behavior, such as warning banners or visible cameras, and directive controls tell people what to do, such as policies and procedures. A compensating control is an alternative that reduces risk to an acceptable level when the ideal control is not practical, for example independent supervisory review of logs when a small team cannot fully segregate duties.",
   "By scope, IT general controls (ITGCs) apply across many systems: logical access management, program change management, program development and acquisition, IT operations (job scheduling, monitoring, incident handling), and backup and recovery. Application controls are built into a specific application and cover input, processing and output, such as edit checks, calculation checks, matching and output reconciliation. The dependency is the key exam idea. Application controls can only be relied on if the general controls around them work. If anyone can change the program code without approval, a perfect edit check today may be gone tomorrow, and if administrators share one account, you cannot tell who changed a configuration.",
   "Controls can also be manual, automated or IT-dependent manual. Automated controls behave consistently, so once they are tested and protected by effective change management, a test of one instance per configuration (combined with evidence that the configuration has not changed) can support reliance. Manual controls depend on people, vary more, and need larger samples across the period. An IT-dependent manual control is a person acting on a system-generated report, such as a manager reviewing an exception report; you must test both the review and the completeness and accuracy of the report itself.",
   "Auditors also distinguish control design from operating effectiveness. Design asks whether the control, if it worked as described, would address the risk. Operating effectiveness asks whether it actually worked consistently throughout the period. A well-designed control that is not performed gives no assurance, and a diligently performed control that is poorly designed does not either. You usually evaluate design first through inquiry and walkthrough, then test operation.",
   "Consider a worked example. In an accounts payable system, a three-way match between purchase order, goods receipt and invoice blocks payment of unmatched invoices; that is a preventive, automated application control. A weekly report of manually overridden matches, reviewed by the finance controller, is a detective, IT-dependent manual control. Restoring the vendor master file from backup after a corruption is corrective. When you plan testing, you first check the ITGCs: who can change the matching configuration, and were changes approved? Only if those are sound do you test the match itself with a single well-chosen transaction set, rather than a large sample.",
   "Common mistakes: calling a log review preventive (it detects); treating a policy as sufficient evidence that a control operates; relying on automated application controls without testing change management and access around them; and labeling any second-best control compensating even when it does not really reduce the same risk. A compensating control must address the specific risk left by the missing control, and it should be performed by someone independent of the conflict it compensates for.",
   "Exam questions often ask you to classify or prioritize. 'Stops', 'blocks' or 'before it occurs' means preventive. 'Identifies', 'reconciles', 'reviews after' means detective. 'Restores', 'recovers', 'remediates' means corrective. 'Small team cannot separate duties' points to a compensating control such as independent review. 'What should the auditor test first before relying on automated controls?' is usually change management or other ITGCs. When asked which control is best, prevention usually beats detection if it is practical and cost-effective."
  ],
  "terms": [
   [
    "Preventive control",
    "A control designed to stop an error or irregularity from occurring."
   ],
   [
    "Detective control",
    "A control that identifies errors or irregularities after they have occurred."
   ],
   [
    "Corrective control",
    "A control that fixes a problem and limits its impact once it has been detected."
   ],
   [
    "Compensating control",
    "An alternative control that reduces risk to an acceptable level when the primary control cannot be implemented."
   ],
   [
    "IT general control (ITGC)",
    "A control over the IT environment, such as access or change management, that supports all applications running in it."
   ],
   [
    "Application control",
    "A control inside a specific application that ensures complete, accurate and authorized input, processing and output."
   ],
   [
    "Operating effectiveness",
    "Whether a control actually functioned as designed, consistently, throughout the period under review."
   ]
  ],
  "example": "A small credit union has only two IT staff, so the same person who administers the core banking database also runs backups. Full segregation is impossible, so management adds compensating controls: database activity logs are sent to a system the administrators cannot alter, and the operations manager reviews privileged-activity reports weekly and signs off. The auditor tests both the completeness of the log feed and evidence of the weekly reviews before concluding the risk is acceptably reduced.",
  "tip": "Weak general controls undermine application controls. If a question asks what to test before relying on automated application controls, IT general controls such as change management come first.",
  "check": [
   [
    "Is a daily reconciliation of bank transactions preventive, detective or corrective?",
    "Detective, because it identifies discrepancies after the transactions have occurred."
   ],
   [
    "Why can an automated control sometimes be tested with a single instance?",
    "Because it behaves consistently, provided change management and access controls show the configuration was not altered during the period."
   ],
   [
    "What must a compensating control do to be acceptable?",
    "It must reduce the same specific risk left by the missing control to an acceptable level, and usually be performed by someone independent."
   ],
   [
    "What is the difference between control design and operating effectiveness?",
    "Design asks whether the control would address the risk if performed as described; operating effectiveness asks whether it actually worked consistently over the period."
   ]
  ]
 },
 {
  "t": "Audit project management: objectives, audit program, fieldwork, resourcing and independence",
  "body": [
   "Every audit engagement is a small project with a scope, a timeline, staff and deliverables. The CISA outline expects you to apply project management discipline to audits so the work finishes on time, stays in scope, uses the right skills and produces conclusions that a reviewer can trust. Poorly managed audits drift: fieldwork runs long, testing wanders away from the key risks, and the report arrives too late to matter.",
   "An engagement usually moves through recognizable phases. In planning, you understand the area, assess risk, and set objectives and scope. You then develop the audit program, which lists the procedures to test each key control, the evidence expected and who will do each step. In fieldwork you perform tests, collect evidence and record it in workpapers. Reporting follows, with an exit meeting and a final report, and then follow-up on agreed actions. An engagement letter or memo confirms scope, timing, access, contacts and deliverables with the auditee, so nobody is surprised later.",
   "The audit program is the bridge between risk and evidence. A good program ties each procedure to a control objective, states whether the step is a test of design, a test of operating effectiveness or a substantive test, and names the population and sample approach. Workpapers record what was done, by whom, when, what evidence was obtained and what was concluded, with enough detail that an experienced auditor with no prior involvement could re-trace the reasoning. Workpapers are reviewed and signed off by a more senior auditor, and they are retained and protected according to the audit function's retention policy because they may be needed later by regulators or external auditors.",
   "Resourcing means making sure the team has the skills the scope requires, and enough hours to do the job. If the audit covers a container platform or a machine learning model and nobody on the team understands it, the audit manager must train staff, borrow a guest auditor or use an outside expert. ISACA's standard on using the work of other experts requires the auditor to evaluate that expert's professional competence, independence and objectivity, the scope of their work and whether the results are adequate before relying on them. The IS auditor still owns the conclusion. Time budgets, milestones and status meetings let the manager spot overruns early and decide whether to re-plan.",
   "Independence must be protected throughout the project, not only at the start. Auditors can advise, but should not make management decisions, design or operate controls, or approve transactions in the area they are auditing. If a scope limitation is imposed, such as being refused access to a system or given only a partial data extract, the auditor documents it, tries to resolve it with the auditee, and reports it to audit management and, if needed, the audit committee. If it cannot be resolved, the report states the limitation and its effect on the conclusion.",
   "Consider a worked example. You lead a four-week audit of a company's cloud identity platform. In planning you identify three key risks: excessive privileged access, orphaned accounts after staff leave, and weak multifactor authentication enforcement. Your audit program maps each risk to procedures, such as extracting the list of global administrators and comparing it with approved role requests, and matching active accounts against the human resources termination list. In week two the platform owner says the audit role cannot be granted until next quarter. You record the date and request in your workpapers, escalate to the audit manager, who contacts the CIO, and read-only access is granted within days. At the end, the audit manager reviews and signs every workpaper before the draft report goes out.",
   "Common mistakes: starting fieldwork without an approved audit program; using a vendor's or consultant's report without assessing their competence and independence; letting a scope limitation silently shrink the audit; and writing workpapers so thin that only their author understands them. Another trap is an auditor helping the team fix a control mid-audit and then testing the fixed control. Advising is acceptable; building or operating the control creates a self-review threat.",
   "Exam questions tend to ask about sequence and responses. 'What should the auditor do before relying on an external specialist's work?' is evaluate their competence, independence and the adequacy of the work. 'The auditee refuses access to key data' calls for documenting and escalating, then reporting the scope limitation. 'What is the primary purpose of workpapers?' is supporting the conclusions and allowing review. 'Which document lists the detailed procedures for the engagement?' is the audit program, while scope and access terms belong in the engagement letter."
  ],
  "terms": [
   [
    "Audit program",
    "A step-by-step list of audit procedures designed to meet the objectives of a specific engagement."
   ],
   [
    "Workpapers",
    "The documented record of audit planning, procedures, evidence and conclusions, reviewed by a senior auditor."
   ],
   [
    "Engagement letter",
    "A document that confirms the scope, objectives, timing, responsibilities and access for an audit."
   ],
   [
    "Scope limitation",
    "A restriction on the auditor's access or procedures that prevents gathering sufficient evidence."
   ],
   [
    "Fieldwork",
    "The phase of an audit in which tests are performed and evidence is gathered."
   ],
   [
    "Guest auditor",
    "A subject matter expert from another part of the organization or outside who joins an engagement to supply missing skills."
   ]
  ],
  "example": "An audit team is scheduled to review an industrial control system at a manufacturing plant, but none of the auditors knows the operational technology protocols in use. The audit manager engages an outside specialist, first checking the specialist's qualifications, confirming they have no contract with the plant's vendor, and agreeing the scope of their work in writing. The specialist's findings are reviewed by the lead auditor, who integrates them into the workpapers and signs the conclusions.",
  "tip": "If an auditee refuses access or restricts scope, the right answer is to document it and escalate through audit management, not to drop the objective or proceed as if nothing happened.",
  "check": [
   [
    "What must an auditor check before relying on another expert's work?",
    "The expert's competence, independence and objectivity, and whether the scope and results of their work are adequate for the audit objectives."
   ],
   [
    "What is the main purpose of workpaper review by a senior auditor?",
    "To ensure procedures were performed properly and the evidence supports the conclusions, as part of supervision and quality."
   ],
   [
    "During fieldwork, the auditee delays access to a critical system indefinitely. What should the auditor do?",
    "Document the scope limitation, escalate to audit management and, if unresolved, report it and its effect on the conclusion."
   ],
   [
    "Is it acceptable for an auditor to recommend how a control could be improved?",
    "Yes; giving advice is acceptable, but designing, implementing or operating the control would impair independence."
   ]
  ]
 },
 {
  "t": "Audit testing and sampling: compliance vs substantive tests, statistical and non-statistical sampling",
  "body": [
   "Auditors rarely test every item, so they need to know which kind of test answers their question and how to pick a sample they can defend. The CISA exam tests both ideas regularly, often in the same question: first recognize whether the objective is about a control or about the data, then choose a sampling method that fits.",
   "A compliance test, also called a test of controls, checks whether a control is operating as designed. Examples include checking that a sample of production changes had documented approval before deployment, or that a sample of new user accounts had manager sign-off. A substantive test checks the data or transactions themselves for errors or misstatement, such as recalculating interest on loan accounts, confirming balances with third parties, or comparing inventory records with a physical count. The two are linked. When compliance testing shows controls are strong, the auditor can reduce substantive testing; when controls are weak, the auditor extends substantive testing to find out whether errors actually occurred.",
   "Sampling can be statistical or non-statistical. Statistical sampling uses random or systematic selection and probability theory, so the auditor can state a confidence level and project results objectively to the whole population. Non-statistical, or judgmental, sampling relies on auditor judgment, for example choosing all transactions above a threshold or those processed by a new clerk. It can be efficient and targeted, but the auditor cannot measure sampling risk objectively or project results with stated precision. Selection methods include random selection, systematic selection (every nth item after a random start), and haphazard selection, which has no conscious bias but is not truly random.",
   "Different methods suit different questions. Attribute sampling estimates the rate at which a characteristic occurs, such as the percentage of changes without approval, so it suits compliance testing. Variable sampling estimates a quantity such as a monetary amount, so it suits substantive testing; monetary unit sampling (also called probability-proportional-to-size sampling) gives larger items a higher chance of selection. Stop-or-go sampling lets the auditor stop early when few or no errors appear, avoiding excessive testing when controls look strong. Discovery sampling is designed to find at least one instance of a rare but critical event, such as fraud, when the expected error rate is very low.",
   "A few terms control sample size. The confidence coefficient (or confidence level) is how sure you want to be; higher confidence needs a larger sample. The tolerable error rate is the maximum deviation rate you can accept and still rely on the control; a lower tolerable rate needs a larger sample. The expected error rate also matters: expecting more errors requires more samples. Precision is the acceptable range between the sample result and the true population value; tighter precision needs a larger sample. Stratification splits a population into groups, for example by transaction value, so that each group can be sampled appropriately and overall sample size can often be reduced. Sampling risk is the chance that the sample is not representative, so the conclusion differs from what testing everything would show.",
   "Consider a worked example. A population of 4,000 program changes was deployed during the year. Your objective is to know whether the change approval control operated, so you use attribute sampling with a confidence level set by your audit methodology and a low tolerable deviation rate. You select changes randomly from the full change log, which you first reconcile to the deployment records to confirm completeness. You find two unapproved changes, which pushes the deviation rate above tolerable, so you conclude the control is not effective. You then shift to substantive work: you review the unapproved changes to see what they did and extend testing to see whether any caused unauthorized data changes.",
   "Common mistakes: using variable sampling to measure how often a control fails; drawing a sample from an incomplete population (the sample can only represent what was in the list); calling a judgmental sample statistical because it was large; and ignoring the link between compliance results and the amount of substantive testing. Another trap is thinking a larger sample always helps. If a data analytics tool can test the whole population, that is often better than any sample.",
   "Exam clues map neatly to answers. 'Whether the control is working' or 'rate of deviation' means compliance testing and attribute sampling. 'Dollar value of misstatement' means substantive testing and variable or monetary unit sampling. 'Find at least one occurrence' or 'suspected fraud with very low expected rate' means discovery sampling. 'Stop testing early if no errors are found' is stop-or-go. 'What increases sample size?' is higher confidence, lower tolerable error or higher expected error."
  ],
  "terms": [
   [
    "Compliance test",
    "A test of whether a control operates as designed, such as checking approvals on a sample of changes."
   ],
   [
    "Substantive test",
    "A test of the data or transactions themselves to detect errors or misstatement."
   ],
   [
    "Attribute sampling",
    "A method that estimates the rate at which a characteristic, such as a control failure, occurs in a population."
   ],
   [
    "Variable sampling",
    "A method that estimates a monetary amount or other quantity in a population, used for substantive testing."
   ],
   [
    "Discovery sampling",
    "A form of attribute sampling designed to find at least one instance of a rare event, such as fraud."
   ],
   [
    "Tolerable error rate",
    "The maximum rate of deviation the auditor is willing to accept and still rely on the control."
   ],
   [
    "Stratification",
    "Dividing a population into subgroups with similar characteristics so each can be sampled appropriately."
   ]
  ],
  "example": "An auditor reviewing expense reimbursements stratifies the claims into three bands by value. Every claim over a high threshold is examined in full, a statistical sample is drawn from the middle band, and a small random sample from the low band. Attribute testing shows managers approve claims consistently, so the auditor limits substantive recalculation. A discovery sample focused on duplicate receipts finds one repeated hotel invoice, which is referred to management for investigation.",
  "tip": "Match the method to the question: attribute sampling for how often a control fails, variable or monetary unit sampling for how much money is wrong, discovery sampling for proving a rare event exists.",
  "check": [
   [
    "An auditor wants to know what percentage of user access requests lacked approval. Which sampling method fits?",
    "Attribute sampling, because the question is about the rate of a control deviation."
   ],
   [
    "If compliance tests show a control is weak, what happens to substantive testing?",
    "It is extended, because the auditor can no longer rely on the control and must test the data directly for errors."
   ],
   [
    "Name two changes that increase the required sample size.",
    "A higher confidence level and a lower tolerable error rate; a higher expected error rate also increases it."
   ],
   [
    "What is the key limitation of judgmental sampling?",
    "Sampling risk cannot be measured objectively, so results cannot be projected to the population with stated confidence."
   ]
  ]
 },
 {
  "t": "Audit evidence collection: sufficiency, reliability, relevance; inquiry, observation, inspection, reperformance",
  "body": [
   "Audit conclusions are only as good as the evidence behind them. ISACA's evidence standard requires the IS auditor to obtain sufficient and appropriate evidence to draw reasonable conclusions, and appropriate evidence is both reliable and relevant. Many CISA questions present several pieces of evidence and ask which is best, so you need a clear mental ranking.",
   "Sufficient means there is enough of it, for example an adequate sample size or coverage of the whole period under review. Relevant means it actually addresses the audit objective. Evidence that a password policy exists is relevant to whether a policy was issued, but not to whether it is enforced; for enforcement you need the system's configured settings. Reliable depends on the source, the method and the conditions under which it was produced. Timeliness matters too: evidence must relate to the period the conclusion covers.",
   "Several rules of thumb help rank reliability. Evidence from an independent outside source, such as a bank confirmation, is more reliable than evidence from the auditee. Evidence the auditor obtains directly, such as running a query or viewing a configuration live, is more reliable than evidence handed over by staff. Documentary evidence beats oral statements. Original documents beat photocopies or screenshots. Evidence produced by a system with strong controls is more reliable than evidence from a weakly controlled one. The qualifications of the person providing evidence also count: an explanation from the system's database administrator carries more weight on database settings than a guess from a business user.",
   "The main collection techniques each have strengths and limits. Inquiry, meaning interviews and questionnaires, is essential for understanding but weak alone and always needs corroboration. Observation shows a process at one moment, such as watching a backup being taken or a visitor being badged, but people may behave differently when watched and it proves nothing about other days. Inspection examines documents, records, configurations and physical assets. Reperformance means the auditor independently executes the control or calculation, for example recalculating a sample of payroll deductions or re-running a reconciliation, which gives strong evidence. Recalculation checks mathematical accuracy. Confirmation obtains a direct response from a third party. Walkthroughs trace one transaction end to end to confirm understanding of the design. Computer-assisted techniques extract and analyze data directly.",
   "Electronic evidence needs extra care. The auditor should obtain it directly from the system where possible, using read-only access, and record the query or command used, for example a saved SQL statement such as `SELECT user_id, last_login FROM accounts WHERE status = 'ACTIVE';` along with the run date. Record counts and control totals should be reconciled to the source so the extract is known to be complete. For sensitive or investigative evidence, the auditor can compute a hash of the file when collected and keep read-only copies to show it was not changed. All evidence is documented in workpapers with its source, date, how it was obtained and what it shows, and it is protected from alteration or loss.",
   "Consider a worked example. You are testing whether terminated employees lose system access promptly. The IT manager tells you accounts are disabled the same day (inquiry). You observe one termination being processed (observation). Neither is enough. You obtain the termination list directly from the human resources system and the account status list directly from the directory, both with dates, reconcile the record counts, and match them yourself. Twelve leavers still have active accounts weeks later. This independently obtained, reperformed evidence contradicts the inquiry and supports a finding.",
   "Common mistakes: accepting an auditee's screenshot as proof of a current configuration; relying on a single interview; treating observation as evidence of consistent operation over a year; and forgetting to verify the completeness of a data extract before testing it. Another trap is thinking more evidence is always better. Evidence that is not relevant to the objective adds work without adding assurance.",
   "Exam wording often asks 'which provides the best evidence?' or 'most reliable evidence'. Rank options using the rules: independent third party over internal, auditor-obtained over auditee-provided, documentary or system-generated over oral, reperformance over inquiry, original over copy. If a question asks what to do after an interview, the answer is to corroborate. If it asks whether evidence is 'relevant', check that it actually answers the objective described."
  ],
  "terms": [
   [
    "Sufficient evidence",
    "Enough evidence, in quantity and coverage, to support the audit conclusion."
   ],
   [
    "Reliable evidence",
    "Evidence whose source, method and conditions of production make it trustworthy."
   ],
   [
    "Relevant evidence",
    "Evidence that logically relates to and addresses the specific audit objective."
   ],
   [
    "Reperformance",
    "The auditor independently executing a control or calculation to confirm it produces the correct result."
   ],
   [
    "Corroboration",
    "Obtaining additional evidence to confirm information gathered through inquiry or other weaker sources."
   ],
   [
    "Walkthrough",
    "Tracing a single transaction through a process to confirm the auditor's understanding of controls."
   ],
   [
    "Confirmation",
    "Evidence obtained directly from an independent third party, such as a bank or vendor, in response to the auditor's request."
   ]
  ],
  "example": "An auditor reviewing firewall management is given a printed rule set by the network team. Instead of relying on it, the auditor watches an engineer export the current configuration directly from the firewall management console, records a hash of the exported file, and compares it with the approved rule baseline. Three rules in the live configuration do not appear in the printed copy or any change ticket, which becomes a finding supported by auditor-obtained, system-generated evidence.",
  "tip": "When ranking evidence, prefer independent over internal, auditor-obtained over auditee-provided, and documentary or reperformed over oral statements.",
  "check": [
   [
    "Which is more reliable: a bank's confirmation sent directly to the auditor, or a bank statement provided by the auditee?",
    "The direct confirmation, because it comes from an independent source straight to the auditor."
   ],
   [
    "What should an auditor do after an interview reveals how a control works?",
    "Corroborate it with stronger evidence such as inspection, reperformance or system data."
   ],
   [
    "Why is observation limited as evidence of operating effectiveness?",
    "It shows only one moment, and people may act differently when observed, so it does not prove the control worked throughout the period."
   ],
   [
    "Before analyzing a data extract, what must the auditor confirm?",
    "That the extract is complete and accurate, for example by reconciling record counts and control totals to the source system."
   ]
  ]
 },
 {
  "t": "Audit data analytics and CAATs, continuous auditing and continuous monitoring",
  "body": [
   "Modern organizations process millions of transactions, and sampling a few dozen can miss patterns that only appear across the whole population. Data analytics and computer-assisted audit techniques (CAATs) let the auditor test entire populations quickly, precisely and repeatably. They also free up time for judgment, because the software does the counting and the auditor investigates the exceptions.",
   "Generalized audit software and data analysis tools, including spreadsheets, Structured Query Language (SQL) and scripting languages such as Python, let an auditor import data and run tests such as finding duplicate payments, gaps or duplicates in invoice numbers, transactions posted on weekends or by unusual users, vendors sharing bank accounts or addresses with employees, and orders split just below an approval limit. A simple duplicate test in SQL looks like `SELECT vendor_id, invoice_no, amount, COUNT(*) FROM payments GROUP BY vendor_id, invoice_no, amount HAVING COUNT(*) > 1;`. Other techniques include stratification, aging, Benford's law analysis of leading digits, and joins between systems, such as matching payroll to the human resources employee list.",
   "Some CAATs test program logic rather than data. Test data means running a set of dummy transactions, including invalid ones, through the program to see whether it processes and rejects them correctly; it tests only the paths you think to try, and it must not contaminate live data. Parallel simulation means the auditor reprocesses real production data with their own program and compares the results with the production output. An integrated test facility (ITF) creates fictitious entities, such as a dummy department, in the production system so test transactions flow alongside real ones; the fictitious data must be removed or excluded from real reporting. Code review and tracing are also possible but require specialist skill.",
   "Continuous auditing moves audit testing close to real time. Techniques include embedded audit modules, also called system control audit review files (SCARF), which are code inside an application that flags transactions meeting audit criteria as they are processed; snapshots, which capture the state of a transaction at points in processing; audit hooks, which flag suspicious transactions for immediate attention; and continuous and intermittent simulation (CIS), which simulates processing of transactions that meet criteria. These are most useful in high-volume, paperless environments. Continuous monitoring, in contrast, is a management responsibility: management uses automated tools to watch its own controls and key indicators. Auditors may rely on well-designed continuous monitoring and test it, but it is still management's control.",
   "Analytics brings its own controls. The auditor must confirm that the data extracted is complete and accurate, for example by reconciling record counts and totals to the source system, and must understand the data fields before drawing conclusions. The auditor should use read-only access or copies so the audit cannot change production data, protect sensitive data during analysis (masking where possible), and document scripts so another auditor could rerun them. Evaluating automated and decision-making systems, including artificial intelligence (AI) models, also falls here: the auditor asks how training data was chosen, how outputs are validated and monitored for drift and bias, and who is accountable for decisions.",
   "Consider a worked example. An auditor of a distribution company extracts a year of vendor payments and the vendor master file. After reconciling the total paid to the general ledger, the auditor runs scripts that find 37 possible duplicate payments, 5 vendors whose bank account matches an employee's payroll account, and a cluster of purchase orders just under the manager approval limit, all raised by one buyer. Instead of a sample of 60, the whole population was tested, and the exceptions become targeted follow-up work with management.",
   "Common mistakes: trusting an extract without verifying completeness; running analytics with write access to production; confusing test data (dummy transactions through the real program) with parallel simulation (real data through the auditor's program); treating continuous monitoring as an audit activity; and reporting every exception as a finding before investigating it. Exceptions are leads, not conclusions.",
   "Exam clues are distinctive. 'Auditor's own program processes production data and compares results' is parallel simulation. 'Dummy entity in the live system' is ITF. 'Code in the application captures transactions meeting criteria' is an embedded audit module or SCARF. 'Early detection in a high-volume online system' points to continuous auditing. 'Management's tool to watch its own controls' is continuous monitoring. 'What should the auditor do first with extracted data?' is verify completeness and accuracy, and 'biggest advantage of CAATs' is the ability to test the whole population."
  ],
  "terms": [
   [
    "CAAT",
    "Computer-assisted audit technique: using software to extract and analyze data or test system logic as part of an audit."
   ],
   [
    "Parallel simulation",
    "Reprocessing production data with auditor-controlled software and comparing the results with the production output."
   ],
   [
    "Test data",
    "Dummy transactions, valid and invalid, run through a program to check that it processes and rejects them correctly."
   ],
   [
    "Integrated test facility (ITF)",
    "A technique that creates fictitious entities in a live system so auditor test transactions are processed alongside real ones."
   ],
   [
    "Embedded audit module",
    "Code inside an application that selects transactions meeting audit criteria as they are processed."
   ],
   [
    "Continuous auditing",
    "Audit testing performed automatically and frequently, close to when transactions occur."
   ],
   [
    "Continuous monitoring",
    "Management's ongoing, automated oversight of controls and key indicators."
   ]
  ],
  "example": "A telecom company processes millions of billing events a day, so annual sampling is ineffective. Internal audit works with IT to add an embedded audit module that flags any manual credit above a threshold or any rate change made outside the change window. Flagged items feed an audit dashboard reviewed weekly. Separately, the billing manager runs automated control dashboards as continuous monitoring, and audit tests those dashboards' logic and completeness before deciding how much it can rely on them.",
  "tip": "Before trusting any analytics result, verify the completeness and accuracy of the extracted data. And remember that continuous monitoring belongs to management, while continuous auditing belongs to audit.",
  "check": [
   [
    "What distinguishes parallel simulation from test data?",
    "Parallel simulation runs real production data through the auditor's own program; test data runs dummy transactions through the production program."
   ],
   [
    "What is a key risk of using an integrated test facility?",
    "Fictitious test transactions could contaminate real records or reports if they are not isolated and removed."
   ],
   [
    "Who owns continuous monitoring?",
    "Management; the auditor may evaluate and rely on it, but it is a management control, not an audit procedure."
   ],
   [
    "What is the main advantage of using data analytics instead of sampling?",
    "The auditor can test the entire population, reducing sampling risk and revealing patterns a sample would miss."
   ]
  ]
 },
 {
  "t": "Audit reporting, follow-up and quality assurance of the audit function",
  "body": [
   "An audit only changes things when its results are communicated clearly and acted on. Reporting, follow-up and quality assurance close the loop: the report tells the right people what is wrong and why it matters, follow-up confirms that fixes actually happened, and quality assurance keeps the audit function itself credible. The CISA exam tests each of these, and especially the boundaries of the auditor's role.",
   "A well-written finding has five parts. The condition is what the auditor found. The criteria are what should be, such as a policy, standard, regulation or contract. The cause explains why the gap exists, which is what a lasting fix must address. The effect states the risk or impact in business terms. The recommendation proposes what management should do. Findings are rated by significance so readers can see what matters most. Findings are discussed with the auditee before the report is final, usually at an exit meeting, to confirm facts and obtain management responses that name corrective actions, owners and target dates.",
   "Disagreement is handled on evidence. If management disputes a finding, the auditor rechecks the evidence and considers any new information. If the finding is wrong, it is corrected; if it still stands, it stays in the report alongside management's view. The report states the objectives, scope, period covered, criteria, an overall conclusion or opinion, significant findings and any scope limitations or restrictions on use. It is distributed according to the audit charter, typically to the audit committee and appropriate levels of management. Minor issues may go into a separate management letter, but anything significant must not be downgraded to avoid discomfort. Timing matters too. If the auditor finds something urgent during fieldwork, such as evidence of an active compromise, a critical control failure or an illegal act, they do not wait for the final report. They communicate promptly to the appropriate level of management, and, where management may be involved, to the audit committee. Interim reporting keeps the risk from growing while the audit finishes.",
   "Follow-up verifies that agreed actions were actually implemented and are effective. The audit function tracks open findings, often in a tracking system, and tests the fixes when owners report them complete; management's statement that something is done is not enough evidence. If management chooses to accept a risk that the auditor considers unacceptable, the auditor discusses it with senior management and, if it remains unresolved, reports it to the audit committee or board. Risk acceptance is management's decision, but the governing body should know. The auditor never implements the fix, because that would impair independence in any later review.",
   "Quality assurance and improvement cover the audit function itself. They include supervision and review of workpapers, ongoing internal monitoring, periodic self-assessments against standards, and independent external quality assessments. Feedback surveys from auditees help, as do metrics such as audit plan completion, time from fieldwork end to report, percentage of recommendations implemented by due date, and staff certification and training. The results are reported to the audit committee so it can oversee audit performance.",
   "Consider a worked example. An audit of backup and recovery finds that restores have not been tested for the customer database for over a year (condition), while policy requires quarterly restore tests (criteria), because the only trained administrator left and no one was assigned (cause), meaning the organization might not recover within its required time after an outage (effect). The recommendation is to assign an owner, perform a restore test and schedule quarterly tests. At the exit meeting the infrastructure manager agrees and commits to a date. Three months later, the auditor does not accept an email saying 'done'; they review the restore test log and the recovered data verification record before closing the finding.",
   "Common mistakes: removing a supported finding because management objects; closing findings on management's word alone; the auditor offering to perform the fix; waiting until the final report to raise a critical, active risk; and writing findings that describe the condition but not the effect, so readers cannot judge importance.",
   "Exam wording signals the answer. 'Management disagrees with a finding' means re-examine the evidence, and if it stands, report it with management's response. 'Best way to confirm corrective action' is follow-up testing. 'Management accepts a high risk' means escalate to senior management or the audit committee. 'What part of a finding explains why it happened?' is the cause."
  ],
  "terms": [
   [
    "Condition",
    "The part of a finding that states what the auditor actually observed."
   ],
   [
    "Criteria",
    "The standard, policy or expectation that the condition is measured against."
   ],
   [
    "Cause",
    "The underlying reason the condition differs from the criteria, which a lasting fix must address."
   ],
   [
    "Effect",
    "The actual or potential impact or risk that results from the condition."
   ],
   [
    "Exit meeting",
    "A meeting at the end of fieldwork where findings are discussed with management before the report is finalized."
   ],
   [
    "Follow-up",
    "Audit procedures that verify whether agreed corrective actions were implemented and effective."
   ],
   [
    "External quality assessment",
    "An independent review of the audit function's conformance with standards and its effectiveness."
   ]
  ],
  "example": "During an audit of a web application, an auditor discovers that the production database is reachable from the internet with a default administrator password. Instead of waiting for the report, the auditor informs the IT director and the chief audit executive the same day, and the exposure is closed within hours. The finding still appears in the final report with its cause, a missing hardening checklist for new database builds, and follow-up later confirms the checklist is in use.",
  "tip": "Auditors report and verify; they do not fix. Any option where the auditor implements the corrective action or quietly drops a supported finding is wrong.",
  "check": [
   [
    "Management strongly disagrees with a finding the auditor believes is well supported. What should the auditor do?",
    "Re-examine the evidence; if the finding stands, keep it in the report and include management's response."
   ],
   [
    "How does the auditor confirm that a finding has been fixed?",
    "By performing follow-up procedures that test the corrective action, not by relying on management's statement."
   ],
   [
    "What should an auditor do on discovering a critical, active risk mid-audit?",
    "Communicate it promptly to appropriate management, and the audit committee if needed, instead of waiting for the final report."
   ],
   [
    "Why must the auditor not implement recommended fixes?",
    "Doing so would create a self-review threat and impair independence when the area is audited again."
   ]
  ]
 },
 {
  "t": "Laws, regulations and industry standards affecting the organization",
  "body": [
   "Organizations operate under a web of legal and contractual obligations: privacy and data protection laws, financial reporting rules, sector regulations for health care, banking or critical infrastructure, breach notification laws, export controls, e-discovery and records retention rules, and industry standards such as the Payment Card Industry Data Security Standard (PCI DSS). An IS auditor must understand which of these apply, because they become the criteria against which controls are judged, and non-compliance can bring fines, lawsuits, loss of licenses or loss of the right to process card payments.",
   "The auditor does not need to be a lawyer, but should know how the organization identifies and manages its obligations. A mature organization keeps a register of applicable laws, regulations and contractual requirements, assigns an owner to each, assesses the gap between requirements and current controls, tracks remediation, and monitors for new or changed requirements. Legal counsel and a compliance function usually own this process. IT translates requirements into technical and procedural controls such as encryption, access control, retention schedules, logging and incident notification procedures.",
   "Order matters. When a new requirement appears, the first step is for management to identify it and assess its applicability and impact on the business, then plan, implement and monitor controls. Specific measures, such as buying tools, rewriting contracts or changing retention settings, should follow that assessment rather than precede it. The auditor's first question in such a review is therefore whether management has identified and assessed the requirements, not which product was purchased.",
   "Requirements can conflict. One country's law may require financial records to be kept for years while a privacy law requires personal data to be deleted when no longer needed; one jurisdiction may require local data storage while the business wants a single global cloud region. Cross-border data transfers are a frequent source of tension. The organization must resolve these conflicts with legal advice, document its decisions and apply them consistently, for example by keeping the minimum personal data needed within records that must be retained.",
   "Industry standards and frameworks, such as ISO/IEC 27001 for information security management systems or publications from the United States National Institute of Standards and Technology (NIST), are usually voluntary unless a law, regulator or contract makes them mandatory. They remain valuable as audit criteria and as a way to structure controls. Contracts can impose obligations that are as binding in practice as law: PCI DSS, for example, is imposed through agreements with card brands and acquiring banks rather than by statute in most places, yet failure to comply can end a merchant's ability to take cards.",
   "Consider a worked example. A software company that has only sold to domestic customers signs its first contracts with customers in another region that has a strict data protection law. An IS auditor reviewing the expansion asks whether legal counsel identified the new law, whether a gap assessment was done against how customer data is collected, stored and transferred, and whether owners and deadlines were assigned. The auditor finds the sales team already committed to data residency in contracts but engineering was never told. The finding is about the missing requirements-identification process, not the choice of cloud region.",
   "Common mistakes: assuming a framework such as ISO/IEC 27001 is automatically mandatory; assuming compliance with a standard equals security; jumping to technical fixes before the requirements are assessed; and forgetting contractual obligations, including those passed down from customers to suppliers. Another trap is thinking IT owns compliance. IT implements controls, but accountability for meeting legal obligations sits with senior management, advised by legal and compliance.",
   "Exam questions tend to ask 'what should the auditor review first?' when a regulation changes; the answer is management's identification and assessment of the requirements, often a compliance register or gap analysis. 'Conflicting legal requirements across countries' points to legal counsel and a documented decision. 'Industry standard imposed by a customer contract' reminds you that it is binding through the contract. 'Best way to ensure ongoing compliance' points to a process that monitors regulatory changes and assigns owners, not a one-time project. And if a question describes compliance with a standard being treated as proof of security, remember that compliance sets a minimum and the auditor still evaluates whether controls address the organization's actual risks."
  ],
  "terms": [
   [
    "Regulatory compliance",
    "Meeting the requirements imposed by laws and regulations that apply to the organization."
   ],
   [
    "Compliance register",
    "A maintained list of applicable legal, regulatory and contractual requirements with owners and status."
   ],
   [
    "Gap assessment",
    "A comparison of current controls and practices against a set of requirements to identify shortfalls."
   ],
   [
    "Breach notification",
    "A legal requirement to inform regulators or affected people when certain data is compromised."
   ],
   [
    "Industry standard",
    "A requirement set developed by an industry body, such as for card payments, which may become binding through contracts."
   ],
   [
    "Data residency",
    "A requirement that certain data be stored or processed within a specific country or region."
   ]
  ],
  "example": "A regional health insurer learns that a new regulation shortens the deadline for reporting data breaches to the regulator. The compliance team adds it to the compliance register, assigns the chief information security officer as owner, and runs a gap assessment. They find that the incident response plan's escalation steps take longer than the new deadline allows. The plan is revised, the legal team is added to the first notification step, and a tabletop exercise confirms the timeline is achievable.",
  "tip": "The first audit question about a new law is whether management has identified and assessed the requirements. Controls and tools come after that assessment.",
  "check": [
   [
    "A new privacy regulation affects the organization. What should the IS auditor look for first?",
    "Evidence that management identified the regulation and assessed its applicability and impact, such as a compliance register entry and gap analysis."
   ],
   [
    "Is ISO/IEC 27001 always mandatory?",
    "No; it is voluntary unless a law, regulator or contract requires it, though it is useful as audit criteria."
   ],
   [
    "How should conflicting legal requirements between countries be handled?",
    "With legal counsel's advice, resulting in a documented decision that is applied consistently."
   ],
   [
    "Why can an industry standard be binding without being a law?",
    "Because contracts, such as merchant agreements with card brands and banks, can require compliance and impose penalties."
   ]
  ]
 },
 {
  "t": "IT governance, organizational structure and IT strategy: board, steering committee, business alignment",
  "body": [
   "IT governance is how an organization makes sure its use of technology supports its goals, delivers value, manages risk and uses resources responsibly. It is part of enterprise governance, not a separate IT project. Governance is different from management. Governance evaluates options, sets direction, makes high-level decisions and monitors performance; management plans, builds, runs and monitors activities within that direction. The CISA exam returns to this split often: when a question asks who is ultimately accountable, it is usually a governance body.",
   "The board of directors is ultimately accountable for governance, including IT governance. Boards often work through committees. The audit committee oversees internal control, financial reporting and the audit function. A board-level IT strategy committee may advise the board on technology direction, major investments and IT risk. At management level, an IT steering committee of senior business and IT leaders prioritizes projects, approves investments within delegated limits, monitors major programs and resolves conflicts over resources. The chief information officer (CIO) leads IT delivery. A chief information security officer (CISO) leads security, ideally with enough independence to raise risks without being overruled by delivery pressure. A chief risk officer and data protection officer may also play roles.",
   "IT strategy should flow from business strategy. A good IT strategic plan states where the business is going, what IT must deliver to support it, which capabilities and investments come first, how risks will be managed and how success will be measured. It usually covers several years and is refreshed as the business changes. Shorter-term tactical and operational plans then turn the strategy into projects and budgets. The auditor asks whether the plan exists, whether business leaders took part, whether it links to business goals and whether projects in progress actually trace back to it.",
   "Signs of poor alignment are recognizable. Projects are approved only by IT, business sponsors are unclear or missing, the steering committee meets rarely or never makes decisions, IT measures itself only on technical metrics such as server uptime, and business units buy their own cloud services outside any governance (shadow IT). Each of these means technology spend may not be producing the value the organization needs, and risk decisions may be made by people without authority to make them.",
   "Organizational structure matters for control. Reporting lines should avoid conflicts: if security reports to the head of infrastructure whose systems it must challenge, concerns may be suppressed. Audit should report functionally to the audit committee and administratively to a senior executive, never to the IT function it audits. Within IT, duties such as development, operations, security administration and database administration should be structured so that incompatible functions are separated. Clear roles and responsibilities, often expressed in a RACI chart (responsible, accountable, consulted, informed), help everyone know who decides what.",
   "Consider a worked example. An auditor reviewing IT governance at a logistics firm reads the IT steering committee charter, which says the committee meets monthly to prioritize projects. The minutes show it met twice in the year and approved no projects. Interviews reveal the CIO approves projects alone, and the largest current project, a new warehouse system, has no business sponsor. The strategic plan is three years old and does not mention the company's recent expansion into e-commerce. The auditor reports a governance weakness: investment decisions are not aligned with business strategy and lack business ownership, and recommends that the steering committee operate as chartered and the strategy be refreshed with business input.",
   "Common mistakes: placing ultimate accountability with the CIO; confusing the audit committee (oversees controls and audit) with the IT steering committee (prioritizes IT investments); assuming that having a charter proves a committee functions; and treating IT strategy as a technology roadmap written without the business. The auditor reviews governance by examining committee charters, minutes, strategic plans, investment decisions and how decisions are actually made, not just what documents say.",
   "Exam clue words: 'ultimate responsibility' or 'accountable for governance' points to the board. 'Prioritizes projects and resolves resource conflicts' is the IT steering committee. 'Advises the board on IT strategy' is the IT strategy committee. 'Best indicator of business alignment' is business participation in IT planning and decisions. 'What should the auditor review first to understand IT's direction?' is usually the IT strategic plan and its link to the business plan."
  ],
  "terms": [
   [
    "IT governance",
    "The leadership, structures and processes that ensure IT supports the organization's strategy and objectives."
   ],
   [
    "IT steering committee",
    "A management committee of business and IT leaders that prioritizes, approves and monitors IT investments."
   ],
   [
    "IT strategy committee",
    "A board-level committee that advises the board on the strategic direction of IT."
   ],
   [
    "Business alignment",
    "The degree to which IT plans and investments support the organization's strategic goals."
   ],
   [
    "IT strategic plan",
    "A multi-year plan describing how IT will support business goals, including priorities, investments and measures."
   ],
   [
    "Shadow IT",
    "Technology acquired or used by business units without the knowledge or approval of IT governance."
   ],
   [
    "RACI chart",
    "A matrix showing who is responsible, accountable, consulted and informed for each activity or decision."
   ]
  ],
  "example": "A university's departments each subscribe to their own cloud file-sharing services, creating duplicate costs and scattered student data. The board asks the CIO to bring a proposal to a new IT steering committee that includes deans and the finance director. The committee agrees a single approved platform aligned with the university's digital learning strategy, sets a migration priority, and requires any new technology purchase above a threshold to be reviewed by the committee.",
  "tip": "Governance is the board's job; management executes. If an answer places ultimate accountability with the CIO or IT department, look for the board instead.",
  "check": [
   [
    "Who is ultimately accountable for IT governance?",
    "The board of directors, which may delegate oversight to committees but keeps accountability."
   ],
   [
    "What is the main role of an IT steering committee?",
    "To prioritize and approve IT investments, monitor major projects and resolve resource conflicts, with business and IT leaders participating."
   ],
   [
    "What is the best evidence that IT strategy is aligned with the business?",
    "IT plans that trace to business objectives and decisions made with active business participation, such as sponsors and steering committee approval."
   ],
   [
    "Why should the security function not report to the head of infrastructure?",
    "It creates a conflict of interest that can suppress security concerns about the systems infrastructure manages."
   ]
  ]
 },
 {
  "t": "IT policies, standards, procedures and governance frameworks such as COBIT",
  "body": [
   "Policies turn governance intentions into rules. A clear document hierarchy lets everyone know what is required and gives auditors concrete criteria to test against. Without it, controls depend on individual habits and cannot be enforced consistently.",
   "At the top, a policy is a high-level statement of management intent and direction, approved by senior management or the board, such as requiring that all information be protected according to its classification. Policies should be short, technology-neutral and stable. Standards make policies specific and mandatory, for example requiring multifactor authentication for all remote access or setting minimum encryption requirements. Procedures give step-by-step instructions for carrying out a task, such as how to provision a new user account. Guidelines are recommended but optional practices. Baselines define minimum secure configurations for a particular platform, such as a hardened server build. Policies may be organized top-down (derived from corporate strategy) or bottom-up (derived from risk assessments of specific areas); top-down is generally preferred because it ensures alignment with business objectives.",
   "The policy lifecycle matters as much as the content. Policies should be approved, communicated to everyone they apply to (often with acknowledgment), enforced, and reviewed regularly, at least annually or after a significant change in the business, law or technology. Exceptions should be requested formally, risk-assessed, approved by an appropriate owner, time-limited and tracked. An auditor looks for approval, currency, communication, enforcement and evidence that practice matches the written word.",
   "Governance frameworks give structure to the whole system. COBIT, developed by ISACA, is a framework for the governance and management of enterprise information and technology. It separates one governance domain, Evaluate, Direct and Monitor (EDM), from four management domains: Align, Plan and Organize (APO); Build, Acquire and Implement (BAI); Deliver, Service and Support (DSS); and Monitor, Evaluate and Assess (MEA). COBIT uses design factors, such as enterprise strategy, risk profile and threat landscape, to tailor a governance system to each organization, and it uses capability levels to rate how well individual processes are performed. It also describes components of a governance system, including processes, organizational structures, policies, information flows, culture, people and services.",
   "Other frameworks complement COBIT rather than compete with it. ITIL provides practices for IT service management, such as incident, problem and change management. ISO/IEC 27001 specifies requirements for an information security management system (ISMS) that can be certified, and ISO/IEC 27002 gives guidance on security controls. The NIST Cybersecurity Framework organizes cybersecurity outcomes into functions such as identify, protect, detect, respond and recover, with governance added as a function in its current version. An organization often uses COBIT as the umbrella for governance and maps the others beneath it.",
   "Consider a worked example. An auditor reviewing access management finds a policy saying 'access is granted on a least-privilege basis', a standard requiring quarterly access reviews for critical systems, and a procedure describing how to run a review. The policy was approved two years ago but not reviewed since, despite a move to cloud services. The standard is sound, but for two of five critical systems no reviews happened in the last three quarters, and no exception was requested. The auditor reports that the policy is out of date and that practice does not meet the standard, with the missing exception process as a contributing cause.",
   "Common mistakes: putting technical detail in policies, which makes them change constantly; treating guidelines as mandatory; assuming COBIT is a security framework only (it covers all enterprise IT governance and management); thinking a framework must be adopted wholesale rather than tailored; and accepting a documented policy as evidence of an operating control. A policy that does not reflect reality is a risk, and so is a reality that has no policy, so the auditor always tests both the document and the practice it describes.",
   "Exam questions often ask about the hierarchy and approval. 'What does the auditor review first to understand management's intent?' is the policy. 'Mandatory, specific requirement' is a standard. 'Step-by-step instructions' is a procedure. 'Who approves the information security policy?' is senior management or the board. 'COBIT governance objectives' map to EDM, while the management domains are APO, BAI, DSS and MEA. 'Policy not followed in practice' means compare practice with policy and report the gap, and check whether exceptions were formally approved."
  ],
  "terms": [
   [
    "Policy",
    "A high-level, management-approved statement of intent and direction."
   ],
   [
    "Standard",
    "A mandatory, specific requirement that supports a policy."
   ],
   [
    "Procedure",
    "Detailed, step-by-step instructions to perform a task."
   ],
   [
    "Guideline",
    "Recommended but optional advice on how to meet a policy or standard."
   ],
   [
    "Baseline",
    "A minimum required configuration or security level for a specific platform or system."
   ],
   [
    "COBIT",
    "ISACA's framework for governance and management of enterprise information and technology."
   ],
   [
    "Policy exception",
    "A formally requested, risk-assessed and approved deviation from a policy or standard, usually time-limited."
   ]
  ],
  "example": "A manufacturing company adopts COBIT to organize its IT governance. The board approves a short information security policy; the CISO issues standards for passwords, encryption and logging; operations teams write procedures for each platform; and a baseline build is defined for servers. When an old production machine cannot meet the logging standard, the plant manager files an exception, compensating network monitoring is added, and the exception is set to expire when the machine is replaced.",
  "tip": "Policies are approved by senior management and state intent; they should not contain technical detail. If a question asks what the auditor reviews first to understand management's intent, pick the policy.",
  "check": [
   [
    "Which document type is mandatory and specific, such as requiring multifactor authentication for remote access?",
    "A standard, which makes a policy specific and mandatory."
   ],
   [
    "Which COBIT domain represents governance rather than management?",
    "Evaluate, Direct and Monitor (EDM); the management domains are APO, BAI, DSS and MEA."
   ],
   [
    "Why is a top-down approach to policy development generally preferred?",
    "It ensures policies are aligned with business objectives and strategy set by senior management."
   ],
   [
    "A system cannot meet a standard. What should happen?",
    "A formal exception should be requested, risk-assessed, approved by an appropriate owner, time-limited and tracked, ideally with compensating controls."
   ]
  ]
 },
 {
  "t": "Enterprise architecture and enterprise risk management (ERM)",
  "body": [
   "Enterprise architecture (EA) is the blueprint of how an organization's business processes, information, applications and technology fit together, both today and in the target future state. It helps leaders see duplication, gaps and dependencies so that investments move the organization toward a coherent design instead of adding disconnected systems one project at a time. Enterprise risk management (ERM) is the organization-wide discipline for understanding and handling the risks to its objectives. The two meet because architecture decisions create or reduce risk, and risk priorities should shape architecture.",
   "EA frameworks such as The Open Group Architecture Framework (TOGAF) or the Zachman Framework describe the enterprise from several views: business architecture (capabilities and processes), data architecture (information and its flows), application architecture (systems and how they interact) and technology architecture (infrastructure, networks and platforms). A typical EA effort documents the current state, defines the target state, analyzes the gap and produces a roadmap of projects to close it. An architecture review board often checks new projects against the target architecture and agreed standards before they are approved.",
   "For auditors, EA matters for three reasons. Well-governed architecture reduces complexity, and complexity is a source of risk: every extra integration, duplicate database or unsupported platform is another thing to secure, patch and recover. Architecture decisions, such as which systems hold sensitive data and how they connect, determine where controls are needed and how data can leak. And an architecture roadmap is evidence that investments are coordinated rather than ad hoc. An auditor may review whether projects are assessed against the architecture, whether exceptions are recorded, and whether legacy systems have a retirement plan.",
   "ERM is the organization-wide process of identifying, assessing, responding to, monitoring and reporting risks to objectives. IT risk is one category within ERM, alongside strategic, financial, operational, compliance and reputational risk, and it should be assessed with the same scales so the board can compare risks across the enterprise. Key ideas include risk appetite, the amount and type of risk the organization is willing to pursue or retain to achieve its goals; risk tolerance, the acceptable variation around specific objectives; risk capacity, the maximum risk it can absorb without failing; risk owners, who are accountable for particular risks; and the risk register, which records risks, ratings, owners, responses and status.",
   "There are four classic risk responses. Mitigate (reduce) means applying controls to lower likelihood or impact. Transfer (share) means moving some of the financial impact to another party, for example through insurance or contracts, though accountability stays with the organization. Avoid means stopping the activity that creates the risk. Accept means knowingly retaining the risk, which must be done by an owner with appropriate authority and documented. Inherent risk is the level before controls; residual risk is what remains after responses, and residual risk must be within appetite or formally accepted. Key risk indicators (KRIs) help monitor whether risk is rising.",
   "Consider a worked example. A retailer's ERM report to the board rates a cyber attack on the online store as high. The IT risk register, however, uses a different scale and rates the same scenario medium, and the online store runs on a legacy platform the architecture roadmap marked for retirement two years ago. An auditor reviewing risk management finds that IT risk is not integrated with ERM, that the risk owner for the online store is not named, and that the architecture exception has no expiry. The recommendations are to align IT risk scoring with ERM, assign an accountable business owner, and link the retirement project to the risk response.",
   "Common mistakes: treating transfer as removing accountability (insurance pays some costs, but the organization still answers to customers and regulators); letting IT accept business risks it does not own; assuming risk appetite is a single number rather than a set of statements by risk category; and confusing enterprise architecture with network diagrams. EA covers business and data views, not only technology. The auditor evaluates whether IT risks are identified and assessed consistently with ERM, whether owners are assigned, whether responses are implemented and whether reporting reaches the board. The auditor does not own, rate for management or accept risks.",
   "Exam wording is usually direct. 'Who should accept residual risk?' is the business or risk owner with authority, within appetite. 'Purchasing cyber insurance' is risk transfer. 'Discontinuing a risky service' is avoidance. 'The level of risk an organization is willing to accept in pursuit of objectives' is risk appetite. 'Blueprint of current and target business, data, application and technology' is enterprise architecture. 'Best way to ensure IT risk is considered at board level' is integration of IT risk into ERM."
  ],
  "terms": [
   [
    "Enterprise architecture",
    "A structured description of business processes, information, applications and technology and how they should evolve."
   ],
   [
    "Enterprise risk management (ERM)",
    "The organization-wide process for identifying, assessing, responding to, monitoring and reporting risks to objectives."
   ],
   [
    "Risk appetite",
    "The amount and type of risk an organization is willing to pursue or retain to achieve its objectives."
   ],
   [
    "Risk tolerance",
    "The acceptable level of variation around a specific objective or risk appetite."
   ],
   [
    "Residual risk",
    "The risk remaining after controls and other responses are applied."
   ],
   [
    "Risk owner",
    "The person accountable for managing a particular risk and deciding on its response."
   ],
   [
    "Risk transfer",
    "Shifting some of the financial impact of a risk to another party, such as an insurer, while keeping accountability."
   ]
  ],
  "example": "A bank plans to launch a mobile lending app. The architecture review board notices the design copies customer data into a new database instead of using the existing customer data service, creating a second store of sensitive data. The ERM team rates the resulting privacy and fraud risks, and the head of retail lending, as risk owner, chooses to mitigate by using the existing service and adding fraud monitoring. The remaining residual risk is recorded in the register and accepted in writing within the bank's stated appetite.",
  "tip": "Risk acceptance belongs to a business owner with authority, within the risk appetite. Auditors identify and report risks; they never accept them, and transferring risk never transfers accountability.",
  "check": [
   [
    "What is the difference between risk appetite and risk tolerance?",
    "Appetite is the overall amount and type of risk the organization is willing to pursue; tolerance is the acceptable variation around specific objectives within that appetite."
   ],
   [
    "Buying cyber insurance is an example of which risk response, and what does it not transfer?",
    "Risk transfer; it does not transfer accountability to customers, regulators or the board."
   ],
   [
    "Why should IT risk be assessed on the same scale as other enterprise risks?",
    "So the board can compare and prioritize IT risks alongside strategic, financial and operational risks within ERM."
   ],
   [
    "How does enterprise architecture help reduce risk?",
    "By reducing complexity and duplication and making data flows and dependencies visible so controls can be placed where needed."
   ]
  ]
 },
 {
  "t": "Privacy programs and privacy principles",
  "body": [
   "Privacy is about the proper handling of personal information: how it is collected, used, shared, retained and disposed of, and what rights individuals have over it. Security protects data from unauthorized access; privacy decides what the organization should do with personal data in the first place and whether it is allowed to at all. You can have perfectly secure data that is still collected unlawfully or used for a purpose people never agreed to. A privacy program brings these decisions under governance so they are made consistently and can be demonstrated to regulators.",
   "Widely accepted privacy principles, reflected in laws and frameworks around the world, include: lawfulness, fairness and transparency, so people are told what is collected, why and on what legal basis; purpose limitation, so data is used only for the purposes stated; data minimization, collecting only what is needed; accuracy, keeping data correct and up to date; storage limitation, keeping it no longer than necessary; integrity and confidentiality, protecting it appropriately; individual rights such as access, correction, deletion and objection; and accountability, meaning the organization can demonstrate compliance, not just claim it. Consent is one possible legal basis, but not the only one, and where it is relied on it must be informed and freely given.",
   "A privacy program typically has an accountable leader such as a privacy officer or data protection officer (DPO); a privacy policy and privacy notices for customers and staff; an inventory of personal data and a map of where it flows, including to third parties and other countries; privacy impact assessments (PIAs) for new systems and significant changes; procedures for responding to individuals' requests within legal deadlines; contracts that bind processors and vendors to privacy obligations; retention schedules and secure disposal; breach response procedures that include regulatory and individual notification; and training. Privacy by design and by default means building these considerations into systems from the start, with the most privacy-protective settings as the default.",
   "Some techniques reduce privacy risk while keeping data useful. Pseudonymization replaces direct identifiers with tokens, so data can be linked back only with a separately protected key; it lowers risk but the data is still personal data. Anonymization removes the ability to identify individuals at all, which is harder to achieve than it looks because combining fields such as postcode, birth date and gender can re-identify people. Data masking hides values in test and training environments.",
   "Consider a worked example. A fitness app company wants to share user activity data with an insurance partner for a new discount program. A privacy impact assessment is run before any data moves. It finds that users were told activity data would be used only to provide the app's features, so the new use needs a new legal basis and clear notice; that health-related data may be considered sensitive with stricter rules; and that the partner contract lacks limits on onward use. The program is redesigned so users opt in explicitly, only summary scores are shared, and the contract restricts use and requires deletion when a user leaves.",
   "Auditors review whether the program exists and works in practice. Is there a current data inventory? Are PIAs done before launch, and do their recommendations get implemented? Are individual requests handled on time, with identity verification? Are retention schedules actually applied, including in backups and logs? Are third parties bound by appropriate terms and monitored? Are privacy notices consistent with what systems really collect? Evidence comes from request logs, PIA records, contract samples, system configurations and data discovery scans.",
   "Common mistakes: equating privacy with encryption; reusing data for a new purpose because it is already on hand; collecting fields 'in case they are useful later'; keeping data forever because storage is cheap; assuming pseudonymized data is no longer personal data; and running the PIA after the system is built, when changes are expensive. Another error is thinking the privacy officer owns every privacy decision. Business owners remain accountable for the processing their processes perform.",
   "Exam questions usually give a scenario and ask which principle is at stake or what should happen first. 'Using data for a new purpose' is purpose limitation. 'Collecting more than needed' is data minimization. 'Keeping data longer than necessary' is storage limitation. 'Before implementing a new system that processes personal data' points to a privacy impact assessment. 'Demonstrate compliance' is accountability. If the options include both encryption and a privacy principle, check whether the scenario is about protection or about whether the processing should happen at all."
  ],
  "terms": [
   [
    "Purpose limitation",
    "The principle that personal data is used only for the specific purposes for which it was collected."
   ],
   [
    "Data minimization",
    "Collecting and keeping only the personal data that is necessary for the stated purpose."
   ],
   [
    "Storage limitation",
    "Keeping personal data in identifiable form no longer than necessary for its purpose."
   ],
   [
    "Privacy impact assessment (PIA)",
    "An evaluation of how a new system or change affects personal data and privacy risk, done before it is implemented."
   ],
   [
    "Privacy by design",
    "Building privacy protections into systems and processes from the start, with protective settings as the default."
   ],
   [
    "Pseudonymization",
    "Replacing direct identifiers with tokens so data can be re-linked only using separately protected information."
   ],
   [
    "Data protection officer (DPO)",
    "A person responsible for overseeing an organization's privacy compliance and advising on data protection obligations."
   ]
  ],
  "example": "A retailer's marketing team exports the full customer database, including birth dates and home addresses, to a spreadsheet to plan a birthday campaign. A privacy review finds only first names, email addresses and birth month are needed. The team deletes the export, a restricted view with just those fields is created, and the privacy officer adds a rule that any new marketing use of customer data requires a short privacy assessment before data is extracted.",
  "tip": "Security and privacy overlap but differ. A question about using data for a new purpose, collecting too much or keeping it too long is about privacy principles, not encryption.",
  "check": [
   [
    "A company wants to use customer support recordings to train a new sales model. Which principle is most at stake?",
    "Purpose limitation, because the data was collected for support, not for sales model training."
   ],
   [
    "When should a privacy impact assessment be performed?",
    "Before a new system or significant change that processes personal data is implemented, so risks can be addressed in the design."
   ],
   [
    "Is pseudonymized data still personal data?",
    "Yes, because it can be re-linked to individuals using the separately held key, so privacy obligations still apply."
   ],
   [
    "What does the accountability principle require?",
    "That the organization can demonstrate compliance with privacy principles through documentation, assessments and evidence, not just assert it."
   ]
  ]
 },
 {
  "t": "Data governance and data classification",
  "body": [
   "Data governance defines who is accountable for data, how its quality and protection are managed, and how decisions about it are made. Without it, nobody owns data quality, sensitive records spread across uncontrolled copies and spreadsheets, reports disagree with each other, and controls are applied inconsistently. With it, each important data set has an owner, agreed definitions, a known sensitivity level and rules for how it is handled throughout its life.",
   "Key roles recur on the exam. The data owner is a business manager accountable for a set of data, such as the head of human resources for employee records. The owner decides its classification, approves who may access it, and sets requirements for retention and quality. The data custodian, often IT, implements and operates the controls the owner specifies, such as backups, access settings and encryption. Data stewards look after data quality, definitions and metadata day to day. Users access data according to their authorized role and must follow handling rules. Many organizations also have a data governance council or committee that sets policy, resolves disputes about definitions and ownership, and prioritizes data initiatives.",
   "Data classification assigns data to categories, for example public, internal, confidential and restricted, based on its sensitivity, value and legal requirements. Each level has handling rules for storage, transmission, sharing, labeling, retention and disposal. For example, restricted data might require encryption at rest and in transit, access only through approved roles, no storage on personal devices, and certified destruction. Classification lets protection be proportionate: expensive controls go where they matter most, and low-risk data is not burdened with unnecessary restrictions. It also underpins data loss prevention (DLP) rules, encryption requirements, cloud storage decisions and access reviews.",
   "Classification is a lifecycle, not a one-time label. Data should be classified when it is created or collected, and the classification should be reviewed over time because data can become more or less sensitive; quarterly results are highly sensitive before publication and public afterwards. Aggregation also matters: several individually low-sensitivity fields combined can become sensitive. Declassification and disposal should follow defined procedures, and retention schedules should say how long each category is kept and how it is destroyed.",
   "Data quality is part of governance too. Accurate, complete, consistent, valid and timely data supports reliable decisions and reports. Quality is managed by defining rules (for example, every customer record needs a valid postal code), measuring against them, and fixing problems at the source rather than repeatedly in downstream reports. A data dictionary or business glossary records agreed definitions so that 'active customer' means the same thing in every report. Data lineage shows where data came from and how it was transformed, which helps auditors trust reports.",
   "Consider a worked example. An auditor asks a company for its data inventory and finds none. Customer data exists in the customer relationship management system, a marketing platform, three analytics databases and many spreadsheets on shared drives. Nobody can say who approves access to the analytics copies, and the classification policy exists but files are not labeled. The auditor recommends assigning business owners for each key data set, building an inventory, applying classification labels with handling rules, and using discovery tools to find and remove unmanaged copies. The owners, not IT, then review who has access.",
   "Common mistakes: making IT the data owner because IT runs the servers; letting the custodian decide who gets access; creating too many classification levels for people to apply consistently; classifying data once and never reviewing it; and ignoring copies in test environments, exports and backups. Auditors review whether owners are assigned, whether a data inventory exists, whether classification is applied and matched by controls, and whether quality issues are measured and fixed. They also check that classification labels actually drive technical controls, for example that files labeled restricted are in fact encrypted and excluded from broad sharing, because a label with no enforcement gives little protection.",
   "Exam clues are consistent. 'Who is responsible for classifying data?' or 'who approves access?' is the data owner. 'Who performs backups and implements access settings?' is the custodian. 'Who maintains definitions and quality?' is the data steward. 'The first step in protecting data' is usually knowing what you have, meaning an inventory and classification. 'Why classify data?' is to apply protection proportionate to sensitivity and value."
  ],
  "terms": [
   [
    "Data owner",
    "The business manager accountable for a data set, who decides its classification and approves access."
   ],
   [
    "Data custodian",
    "The party, often IT, that implements and maintains controls over data on the owner's behalf."
   ],
   [
    "Data steward",
    "A person responsible for the quality, definitions and proper use of data day to day."
   ],
   [
    "Data classification",
    "Assigning data to sensitivity levels that determine how it must be handled and protected."
   ],
   [
    "Data inventory",
    "A catalog of the organization's data sets, where they reside, their owners and their classification."
   ],
   [
    "Data lineage",
    "A record of where data originated and how it has been moved and transformed."
   ],
   [
    "Data loss prevention (DLP)",
    "Tools and processes that detect and block unauthorized movement of sensitive data based on its classification."
   ]
  ],
  "example": "A law firm labels documents as public, internal, confidential or client-privileged. The head of each practice group owns its client files and approves access; IT, as custodian, configures the document management system to enforce those approvals, encrypt privileged files and block them from being emailed outside the firm through DLP rules. When a case closes, the owner reviews the classification and applies the retention schedule, and IT performs certified deletion at the end of the retention period.",
  "tip": "The owner decides and is accountable; the custodian implements. When asked who classifies data or approves access, choose the business owner, not IT or security.",
  "check": [
   [
    "Who should approve a request for access to payroll data?",
    "The data owner, typically the business manager responsible for payroll, not IT."
   ],
   [
    "What does a data custodian do?",
    "Implements and operates the controls the owner specifies, such as backups, access configuration and encryption."
   ],
   [
    "Why should classification be reviewed periodically?",
    "Because data sensitivity changes over time and through aggregation, so protection must be adjusted to remain proportionate."
   ],
   [
    "What is typically the first step in a data protection program?",
    "Identifying and inventorying data and assigning owners, so it can be classified and protected appropriately."
   ]
  ]
 },
 {
  "t": "IT resource management: segregation of duties, staffing, budgeting and portfolio management",
  "body": [
   "IT resources include people, money, infrastructure, applications and information. Managing them well means having the right skills in the right roles, spending wisely, choosing the right investments and organizing duties so no single person can cause and conceal a serious error or fraud. The CISA exam focuses heavily on segregation of duties, but it also tests personnel controls and how IT investments are selected and tracked.",
   "Segregation of duties (SoD) separates incompatible functions. In business terms, the classic four are authorizing a transaction, recording it, having custody of the related asset, and reconciling or reviewing it. In IT terms, common incompatible pairs include developing code and moving it to production; security administration and system administration; database administration and approving one's own access; operating computer systems and changing application programs; and requesting and approving access. Where full SoD is not possible, such as in a small team, compensating controls reduce the risk: independent review of activity logs, supervisory approval, reconciliations performed by someone else, and alerts on privileged actions. Auditors often build an SoD matrix, listing roles or permissions on both axes and marking conflicts, and then compare it with actual user access.",
   "People controls cover the whole employment lifecycle. At hiring, background checks appropriate to the role, clear job descriptions and signed confidentiality and acceptable use agreements. During employment, training, performance reviews, mandatory vacations and job rotation, which reduce dependence on individuals and can uncover fraud that requires constant attention to conceal. Succession planning and cross-training avoid key-person dependency. At termination or transfer, prompt removal or adjustment of access and return of assets, coordinated between human resources and IT. When contractors, consultants or temporary staff are used, the same controls must apply, along with contract terms covering confidentiality and intellectual property.",
   "Financial management ensures IT spending is planned and controlled. IT budgets should link to the strategic plan, and actual spending should be tracked against budget with variances explained. Cost allocation models help business units see the cost of the IT they consume: chargeback actually bills units, while showback reports costs without billing. Both can encourage responsible demand. Cloud services make cost management more dynamic, because consumption-based charges can grow quickly without governance, so tagging resources by owner and reviewing usage matter.",
   "Portfolio management evaluates all proposed and running IT investments together, rather than one at a time. Investments are ranked by business value, risk, cost and alignment with strategy, and the portfolio is balanced across goals such as growth, compliance and keeping existing systems running. Decisions include which to fund, continue, change or stop. Each investment should have a documented business case, and value realization should be reviewed after delivery. Program management coordinates related projects that together deliver a larger outcome.",
   "Consider a worked example. An auditor extracts the permissions of all users in an enterprise resource planning (ERP) system and compares them with the SoD matrix. Fourteen users can both create vendors and approve payments, which would let one person set up a fictitious supplier and pay it. Three are developers who also have production access. Management explains that the finance team is small. The auditor recommends removing developer production access entirely, splitting vendor creation from payment approval where possible, and, for the remaining finance conflicts, a monthly independent review of new vendors and payments above a threshold by someone outside the team.",
   "Common mistakes: assuming SoD is only about business roles and forgetting IT roles such as development and operations; accepting a compensating control performed by the same person who has the conflict; ignoring contractors in personnel controls; confusing chargeback with showback; and approving investments one by one without comparing them across the portfolio. Another trap is thinking job rotation and mandatory vacation are only about staff wellbeing; for auditors they are detective and deterrent fraud controls.",
   "Exam clue words: 'same person develops and deploys code' is the classic IT SoD conflict. 'Small organization cannot separate duties' points to compensating controls such as independent log review. 'Uncover fraud that requires the perpetrator's continuous presence' is mandatory vacation or job rotation. 'Rank and balance all IT investments' is portfolio management. 'Business units see IT costs without being billed' is showback. 'First thing to do when a user leaves' is revoking access promptly."
  ],
  "terms": [
   [
    "Segregation of duties",
    "Dividing incompatible duties among different people so that no single person can commit and conceal errors or fraud."
   ],
   [
    "SoD matrix",
    "A table of roles or permissions that marks which combinations are incompatible, used to detect conflicts."
   ],
   [
    "Compensating control",
    "An alternative control that reduces risk when the ideal control, such as full segregation of duties, cannot be applied."
   ],
   [
    "Job rotation",
    "Periodically moving staff between roles, which reduces dependence on individuals and can reveal irregularities."
   ],
   [
    "Mandatory vacation",
    "Requiring staff in sensitive roles to take consecutive leave so others perform their duties and irregularities surface."
   ],
   [
    "Portfolio management",
    "Managing a set of IT investments together to maximize value and alignment within available resources."
   ],
   [
    "Chargeback",
    "A cost allocation model that bills business units for the IT services they consume."
   ]
  ],
  "example": "At a regional utility, one systems administrator maintained the billing application, applied changes and ran its database. When she took a mandatory two-week vacation, her colleague covering the role noticed scheduled jobs that altered a few customer accounts each month. Investigation showed unauthorized credits to relatives' accounts. The utility separated database administration from application support, required approval for all scheduled job changes and added monthly independent review of manual account adjustments.",
  "tip": "The classic IT SoD conflict is the same person developing and moving code to production. If full separation is impossible, look for a compensating detective control performed by someone independent.",
  "check": [
   [
    "Which combination of IT duties is the most common SoD conflict?",
    "Developing program code and moving it into production, because one person could introduce and deploy unauthorized changes."
   ],
   [
    "A small team cannot separate security administration and system administration. What should management do?",
    "Implement compensating controls, such as logging privileged activity to a protected system and having someone independent review it regularly."
   ],
   [
    "How do mandatory vacations help control fraud?",
    "Someone else performs the duties during the absence, which can reveal irregularities that need constant concealment."
   ],
   [
    "What is the difference between chargeback and showback?",
    "Chargeback bills business units for IT consumption; showback reports the costs to them without billing."
   ]
  ]
 },
 {
  "t": "IT vendor management: outsourcing, contracts, right to audit and SOC reports",
  "body": [
   "Organizations increasingly rely on vendors for software, cloud services, managed operations and whole outsourced business processes. Outsourcing moves the work but not the accountability. If a payroll provider leaks employee data, the employer still answers to its staff and regulators. Vendor management, sometimes called third-party risk management, is how the organization keeps control of risks it no longer directly operates, across the whole relationship from selection to exit.",
   "The lifecycle starts with planning and due diligence. The organization defines its requirements and the risk of the service, then assesses candidate vendors: financial stability, security and privacy posture, control environment, certifications and independent reports, locations where data will be stored and processed, reliance on subcontractors (fourth parties), and business continuity capability. The depth of due diligence should match the risk; a vendor handling sensitive customer data or a critical process deserves far more scrutiny than an office supplies provider.",
   "The contract then sets enforceable expectations. Key terms include the scope of services; service level agreements (SLAs) with measurable targets, reporting and remedies such as service credits; security and privacy requirements; data ownership, location and permitted use; breach notification timelines; a right-to-audit clause or an obligation to provide independent assurance reports; limits on subcontracting and a requirement that subcontractors meet the same obligations; business continuity and disaster recovery commitments; insurance; and exit terms covering transition assistance and return or certified destruction of data. Source code escrow, where a third party holds the vendor's source code for release if the vendor fails or stops supporting the product, protects customers who depend on specialized software.",
   "During the relationship, the organization monitors performance against SLAs, reviews security and assurance reports, tracks issues and incidents, holds regular governance meetings and reassesses risk periodically or when something changes, such as an acquisition of the vendor. A named relationship owner inside the organization is accountable for this monitoring. Contracts should be reviewed before renewal against current requirements.",
   "System and Organization Controls (SOC) reports, issued by independent auditors under attestation standards, are a common assurance source. SOC 1 covers controls at a service organization relevant to its customers' internal control over financial reporting. SOC 2 covers controls relevant to the trust services criteria: security, availability, processing integrity, confidentiality and privacy; security is always included and the others are chosen by scope. SOC 3 is a general-use summary of SOC 2 without detailed test results. A Type 1 report gives an opinion on the design of controls at a point in time. A Type 2 report also tests operating effectiveness over a period, commonly several months to a year, and is far more useful for reliance. Readers must check the period covered, the scope (which services, locations and systems), whether any subservice organizations were carved out, the exceptions found, the auditor's opinion, and the complementary user entity controls (CUECs), which are controls the customer must operate itself for the service organization's controls to work.",
   "Consider a worked example. You are auditing a company that uses a cloud payroll provider. The provider supplies a SOC 1 Type 2 report. You check that the period overlaps your audit period, that the payroll processing service your company uses is in scope, and that the hosting provider underneath was carved out, so you ask for its report too. Two exceptions relate to access reviews at the provider; you assess whether they affect your company. Then you look at the CUECs, which say customers must review and approve payroll change reports and remove leavers' access to the portal. Your company does neither consistently, which becomes your finding.",
   "Common mistakes: treating a Type 1 report as evidence that controls operated over time; reading only the opinion and ignoring exceptions and CUECs; accepting a report whose period ended long ago without asking for a bridge letter or newer report; assuming the vendor's certification covers every service you use; skipping the exit plan until the relationship ends; and believing outsourcing transfers accountability. Another trap is relying solely on a right-to-audit clause that the organization never actually uses.",
   "Exam clues map to answers. 'Accountability for outsourced data' stays with the customer organization. 'Controls over a service provider relevant to financial reporting' is SOC 1; 'security and availability of a cloud service' is SOC 2. 'Design only, at a point in time' is Type 1; 'operating effectiveness over a period' is Type 2. 'Controls the customer must perform' are complementary user entity controls. 'Protect against vendor bankruptcy for custom software' is source code escrow. 'First step before selecting a vendor' is defining requirements and performing due diligence."
  ],
  "terms": [
   [
    "Right-to-audit clause",
    "A contract term allowing the customer, or its auditors, to audit the vendor's controls."
   ],
   [
    "Service level agreement (SLA)",
    "A contract section defining measurable service targets, how they are reported and the remedies if they are missed."
   ],
   [
    "SOC 1",
    "An independent report on a service organization's controls relevant to customers' internal control over financial reporting."
   ],
   [
    "SOC 2 Type 2",
    "An independent report on a service organization's controls over the trust services criteria, including testing of operating effectiveness over a period."
   ],
   [
    "Complementary user entity controls",
    "Controls that the customer must perform for the service organization's controls to be effective."
   ],
   [
    "Source code escrow",
    "An arrangement where a third party holds a vendor's source code, released to the customer if the vendor fails."
   ],
   [
    "Carve-out method",
    "A SOC reporting approach that excludes a subservice organization's controls from the report's scope."
   ]
  ],
  "example": "A hospital outsources its patient appointment system to a software-as-a-service vendor. Before signing, the hospital reviews the vendor's SOC 2 Type 2 report, questionnaire answers and breach history. The contract requires breach notification within a defined short period, data stored only in approved regions, annual assurance reports, and full data return in a standard format at exit. Two years later, when the vendor is acquired, the hospital reassesses the relationship and confirms the new owner accepts the same terms.",
  "tip": "Type 1 means design only at one point; Type 2 adds operating effectiveness over time. An auditor relying on a vendor's controls normally wants Type 2, and must still check scope, exceptions and complementary user entity controls.",
  "check": [
   [
    "When a service is outsourced, who remains accountable for the data?",
    "The customer organization; outsourcing transfers the work, not the accountability."
   ],
   [
    "What does a SOC 2 Type 2 report provide that a Type 1 does not?",
    "Testing of whether the controls operated effectively over a period, not just whether they were designed appropriately at a point in time."
   ],
   [
    "Why must an auditor review complementary user entity controls?",
    "Because the vendor's controls rely on the customer performing them, so gaps at the customer can undermine the whole control set."
   ],
   [
    "What contract term protects a customer if a niche software vendor goes out of business?",
    "A source code escrow arrangement that releases the code to the customer under defined conditions."
   ]
  ]
 },
 {
  "t": "IT performance monitoring, reporting and quality management: KPIs, balanced scorecard, maturity",
  "body": [
   "Governance needs feedback. Leaders cannot direct IT well unless they know whether it is delivering what was promised, at what cost and with what risk. Performance monitoring provides that feedback through meaningful measures and regular reporting, and quality management makes sure processes and products meet requirements consistently rather than by luck. The CISA exam tests whether you can tell a useful metric from a vanity metric, and whether you know the tools used to structure measurement.",
   "Key performance indicators (KPIs) measure how well a process is achieving its goals, such as percentage of changes causing incidents, mean time to restore service, or project delivery on time and budget. Key goal indicators, a term from earlier frameworks, describe whether the outcome was achieved, while KPIs are often leading measures of whether it is likely to be. Key risk indicators (KRIs) signal rising risk, such as the number of unpatched critical systems or accounts with excessive privileges. Good metrics are linked to objectives, measurable from reliable data, have targets and thresholds, and are reported to people who can act on them. An auditor should also check how the underlying data is produced, because a metric calculated from incomplete ticket data can make performance look better than it is.",
   "The IT balanced scorecard organizes measures into four perspectives adapted from the business version: business contribution (how management views IT, for example value delivered and cost control), user or customer orientation (how users view IT, such as satisfaction and service levels), operational excellence or internal processes (how effective and efficient IT processes are), and future orientation or learning and growth (whether IT is ready for future challenges, such as skills and innovation). It prevents IT from judging itself only on technical metrics and links IT measures to business goals. Before implementing a balanced scorecard, the organization needs clear business and IT objectives to measure against.",
   "Service level management turns expectations into agreements. Service level agreements (SLAs) with customers, operational level agreements (OLAs) between internal teams, and underpinning contracts with suppliers should fit together, so an internal team can actually meet the targets promised externally. Performance against SLAs should be reported regularly and missed targets investigated.",
   "Quality management ensures IT processes and products meet requirements. Quality assurance defines and checks processes to prevent defects, while quality control inspects outputs to find them. Standards such as ISO 9001 for quality management and ISO/IEC 20000 for IT service management provide structure. Capability and maturity models rate processes on a scale from incomplete or ad hoc to optimized. COBIT uses capability levels for processes and maturity levels for focus areas, and the Capability Maturity Model Integration (CMMI) is another widely known model. These help organizations identify the gap between current and target capability and plan improvement; the target is not always the highest level, since each level costs more to reach and maintain.",
   "Consider a worked example. An auditor reviews the monthly IT dashboard presented to the executive team. It shows tickets closed, servers online and lines of code delivered, all trending upward. None of the measures relate to business objectives, there are no targets, and no one can say what action a bad number would trigger. User satisfaction is not measured, and the incident data excludes tickets logged by phone. The auditor recommends redesigning the dashboard around a balanced scorecard tied to business goals, adding targets and owners for each metric, and fixing the data source so metrics are complete.",
   "Common mistakes: measuring activity instead of outcomes; setting metrics without targets or owners; trusting metrics without validating the data behind them; aiming every process at the highest maturity level regardless of business need; and confusing quality assurance (process) with quality control (output). Another trap is reporting KRIs and KPIs only to IT management, when the risks and outcomes they describe belong to business leaders too.",
   "Exam wording signals the answer. 'Best way to show IT's contribution to the business' is usually a balanced scorecard. 'Early warning that a risk is increasing' is a KRI. 'Measures whether a process meets its goal' is a KPI. 'Prerequisite for a balanced scorecard' is defined business and IT objectives. 'Determines the gap between current and desired process capability' is a capability or maturity assessment. 'Agreement between internal IT teams supporting an SLA' is an OLA."
  ],
  "terms": [
   [
    "Key performance indicator (KPI)",
    "A measure of how well a process or activity is achieving its objective."
   ],
   [
    "Key risk indicator (KRI)",
    "A metric that signals increasing exposure to a particular risk."
   ],
   [
    "Balanced scorecard",
    "A performance tool that measures IT across business contribution, user orientation, operational excellence and future orientation perspectives."
   ],
   [
    "Operational level agreement (OLA)",
    "An agreement between internal teams that defines the support needed to meet an external service level agreement."
   ],
   [
    "Capability level",
    "A rating of how well a process is performed and managed, from incomplete to optimized."
   ],
   [
    "Quality assurance",
    "Activities that define and check processes to prevent defects, as opposed to inspecting outputs."
   ],
   [
    "Maturity model",
    "A staged model describing how processes evolve from ad hoc to optimized, used to assess and plan improvement."
   ]
  ],
  "example": "A city government's IT department reports only system uptime. After a citizen portal outage during tax season, the city council asks for better reporting. IT adopts a balanced scorecard with measures such as percentage of online services available during peak periods, citizen satisfaction scores, cost per transaction, and staff trained in cloud skills. Each measure has a target and an owner, and a KRI tracking unpatched internet-facing servers is added to the risk report.",
  "tip": "Look for measures that show value and outcomes, not just activity. A balanced scorecard that links IT to business goals is usually the best answer for showing IT's contribution.",
  "check": [
   [
    "What is the difference between a KPI and a KRI?",
    "A KPI measures how well a process achieves its goal; a KRI signals increasing exposure to a risk."
   ],
   [
    "What must exist before an IT balanced scorecard can be implemented effectively?",
    "Clearly defined business and IT objectives that the measures can be linked to."
   ],
   [
    "Should every process aim for the highest capability level?",
    "No; the target level should reflect business need and cost, since higher levels require more investment."
   ],
   [
    "An IT dashboard shows only tickets closed and servers online. What is the main weakness?",
    "The measures track activity rather than outcomes linked to business objectives, and lack targets that drive action."
   ]
  ]
 },
 {
  "t": "Project governance and management: roles, steering, earned value and project risk",
  "body": [
   "Many IT failures are project failures: systems delivered late, over budget, missing key controls or not delivering the benefits promised in the business case. Project governance makes sure projects are justified, directed and monitored by the right people, and project management delivers them. The IS auditor checks that both work, often during the project rather than after, when problems are still cheap to fix. Key roles include the project sponsor, a senior business leader who owns the business case, provides funding and direction and is accountable for realizing benefits; the project steering committee, which makes major decisions and approves changes to scope, budget or schedule beyond the project manager's authority; the project manager, who plans and runs day-to-day work and reports status; the project management office (PMO), which sets methods and standards and tracks the portfolio of projects; and users and system owners, who define requirements and accept the result. Quality assurance, security and risk staff advise on standards and controls. An IS auditor may participate to advise on controls, but must not take a decision-making role that would compromise independence later.",
   "Planning tools help structure the work. A work breakdown structure (WBS) breaks deliverables into manageable work packages. The critical path method (CPM) identifies the longest sequence of dependent tasks, which sets the minimum project duration; any delay on the critical path delays the whole project, while tasks with slack can slip without doing so. Gantt charts show tasks against time. Program evaluation and review technique (PERT) estimates duration from optimistic, most likely and pessimistic estimates, typically weighted as (O + 4M + P) / 6. Timeboxing fixes the time and adjusts scope to fit. Function point analysis estimates the size of software based on inputs, outputs, inquiries, files and interfaces.",
   "Monitoring needs objective measures, and earned value analysis provides them. Planned value (PV) is the budgeted cost of work scheduled to date. Earned value (EV) is the budgeted cost of the work actually completed. Actual cost (AC) is what was spent. From these you calculate the following, where negative variances and indexes below 1 are unfavorable.",
   "```text\nCost variance      CV  = EV - AC   (negative = over budget)\nSchedule variance  SV  = EV - PV   (negative = behind schedule)\nCost perf. index   CPI = EV / AC   (below 1 = over budget)\nSchedule perf.     SPI = EV / PV   (below 1 = behind schedule)\n```",
   "Project risk management identifies risks early, such as unclear requirements, scope creep, key staff leaving, dependency on a vendor, or new technology, and tracks responses in a risk register. Scope changes should go through formal change control with impact analysis on cost, schedule and risk, approved by the steering committee. Status reporting should be honest; a project that reports green every week until it suddenly turns red is a governance warning. At closure, lessons learned are captured and a post-implementation review later checks whether benefits were achieved.",
   "Consider a worked example. A project planned to have completed work worth 500,000 by now (PV). Work actually completed was budgeted at 400,000 (EV), and 480,000 has been spent (AC). CV is 400,000 minus 480,000, or negative 80,000, so it is over budget. SV is 400,000 minus 500,000, or negative 100,000, so it is behind schedule. CPI is about 0.83 and SPI is 0.8. The status report, however, says the project is on track. The auditor reports that status reporting does not reflect earned value data and recommends the steering committee review the forecast, scope and business case.",
   "Common mistakes: confusing the sponsor (business accountability and funding) with the project manager (daily delivery); mixing up the formulas, especially using AC in the schedule variance; assuming the critical path is the task list with the most activities rather than the longest duration; and approving scope changes informally. A further error is treating a steering committee that only receives reports as effective governance; it must actually make decisions, challenge optimistic status and stop work that no longer makes sense.",
   "Exam wording tells you which to apply: 'value of work actually performed' is earned value; 'behind schedule' calls for SV or SPI; 'over budget' calls for CV or CPI. 'Who is accountable for the business case and benefits?' is the sponsor. 'Who approves significant scope changes?' is the steering committee. 'Which tasks determine the earliest completion date?' is the critical path."
  ],
  "terms": [
   [
    "Project sponsor",
    "The senior business leader who owns the business case, funds the project and is accountable for its benefits."
   ],
   [
    "Project steering committee",
    "A group of senior stakeholders that directs the project and approves major changes to scope, budget and schedule."
   ],
   [
    "Earned value",
    "The budgeted cost of the work actually completed at a point in time."
   ],
   [
    "Cost performance index (CPI)",
    "Earned value divided by actual cost; below 1 means the project is over budget."
   ],
   [
    "Critical path",
    "The longest sequence of dependent tasks, which determines the shortest possible project duration."
   ],
   [
    "Work breakdown structure (WBS)",
    "A hierarchical decomposition of project deliverables into manageable work packages."
   ],
   [
    "Scope creep",
    "Uncontrolled growth in project scope without matching changes in budget, time or approval."
   ]
  ],
  "example": "A government agency's new case management project keeps absorbing extra features requested by different departments, each approved informally by the project manager. Six months later the budget is nearly spent and core modules are unfinished. An IS auditor recommends a formal change control process where every scope change is assessed for cost and schedule impact and approved by the steering committee, and earned value reporting so the committee sees problems early.",
  "tip": "Know the formulas: CV = EV - AC, SV = EV - PV, CPI = EV / AC, SPI = EV / PV. Negative variances or indexes below 1 mean trouble.",
  "check": [
   [
    "If EV is 200 and AC is 250, what is the cost variance and what does it mean?",
    "CV = EV - AC = -50, so the project is over budget for the work completed."
   ],
   [
    "Who is accountable for the project's business case and benefits?",
    "The project sponsor, a senior business leader, not the project manager."
   ],
   [
    "What happens if a task on the critical path is delayed?",
    "The whole project's completion date is delayed, because the critical path has no slack."
   ],
   [
    "How should scope changes be handled in a well-governed project?",
    "Through formal change control with impact analysis and approval by the steering committee."
   ]
  ]
 },
 {
  "t": "Business case and feasibility analysis",
  "body": [
   "Before an organization spends money on a new system, it should understand why. The business case documents the problem or opportunity, the options considered, the costs, benefits and risks of each, and the recommended solution with its expected return. It is the reference point for deciding whether to start, continue, change or stop a project, and it names the sponsor who is accountable for delivering the benefits. For an auditor, a missing or weak business case means there is no objective yardstick for judging the project.",
   "Feasibility analysis examines whether a solution is practical from several angles. Technical feasibility asks whether the technology exists, is mature enough and fits the current environment and architecture. Economic feasibility compares costs with benefits. Operational feasibility asks whether people and processes can adopt it and whether it will be supported. Legal and compliance feasibility checks regulatory, contractual and privacy constraints. Schedule feasibility considers whether it can be delivered when the business needs it. A feasibility study is usually the first phase of a traditional system development life cycle and ends with a decision to proceed or not.",
   "Economic analysis uses several measures. Return on investment (ROI) compares net benefit with cost. Net present value (NPV) discounts future cash flows to today's value, so a benefit received in five years counts for less than one received now; a positive NPV means the investment is expected to add value. Payback period is how long until cumulative benefits cover the cost, which is simple but ignores later benefits and the time value of money. Total cost of ownership (TCO) includes all costs over the solution's life: acquisition, implementation, licenses or subscriptions, infrastructure, support, training, upgrades and eventual retirement, not just the purchase price. Benefits can be tangible, such as reduced processing cost, or intangible, such as better customer experience; intangible benefits should still be described and, where possible, measured.",
   "Options usually include doing nothing (the baseline for comparison), improving the current system, buying a commercial product, subscribing to a cloud service, or building a custom system. A buy decision leads to a structured selection: defining and weighting requirements, issuing a request for information or request for proposal (RFP), evaluating vendors against the weighted criteria, checking references and financial stability, running demonstrations or a proof of concept, and negotiating contracts. A build decision leads into a development methodology and requires the organization to have or acquire the skills to maintain the result.",
   "The business case is a living document. It should be revisited at major milestones and whenever costs, benefits, risks or business priorities change significantly. If a project's justification no longer holds, stopping or reshaping it is a legitimate outcome. Money already spent is a sunk cost and should not by itself justify continuing; only future costs and benefits matter to the decision. After implementation, the post-implementation review checks whether the promised benefits were realized and feeds lessons into future business cases.",
   "Consider a worked example. A logistics company's business case for a new route optimization system promised fuel savings from year one and cost a set amount to build. Halfway through, the vendor's price for the mapping data triples and a competitor product becomes available as a subscription. An IS auditor reviewing the project finds that nobody has updated the business case; the steering committee keeps approving funds because 'we have spent too much to stop'. The auditor recommends revisiting the business case with current costs, comparing the subscription option, and letting the sponsor and steering committee decide on that basis.",
   "Common mistakes: comparing only purchase prices instead of TCO; treating the business case as paperwork to get funding and never reviewing it; letting IT write the business case without a business sponsor; ignoring the do-nothing option; and continuing a failing project because of sunk costs. Another trap is selecting a vendor before requirements are defined, which lets the product define the requirements.",
   "Exam clue words: 'justify the investment' or 'basis for the decision to proceed' is the business case. 'All costs over the life of the system' is TCO. 'Time value of money' points to NPV. 'Costs have risen significantly mid-project' means re-evaluate the business case. 'First step in selecting a software package' is defining requirements. 'Whether the organization can support the system after it goes live' is operational feasibility. 'Were the benefits achieved?' is answered by the post-implementation review."
  ],
  "terms": [
   [
    "Business case",
    "A document that justifies an investment by comparing options, costs, benefits and risks."
   ],
   [
    "Feasibility study",
    "An analysis of whether a proposed solution is technically, economically, operationally, legally and schedule-wise practical."
   ],
   [
    "Total cost of ownership (TCO)",
    "All costs of a solution over its life, including acquisition, operation, support and retirement."
   ],
   [
    "Net present value (NPV)",
    "The value today of future cash inflows minus outflows, discounted to account for the time value of money."
   ],
   [
    "Payback period",
    "The time it takes for cumulative benefits to equal the initial investment."
   ],
   [
    "Request for proposal (RFP)",
    "A formal document inviting vendors to propose solutions against stated requirements and evaluation criteria."
   ],
   [
    "Sunk cost",
    "Money already spent that cannot be recovered and should not drive future decisions."
   ]
  ],
  "example": "A school district compares keeping its aging student information system, buying a new on-premises product and subscribing to a cloud service. The feasibility study shows the on-premises product has the lowest purchase price but the highest TCO once servers, staff time and upgrades over the expected life are included. Operational feasibility favors the cloud option because the district has few IT staff. The board approves the cloud option with a business case that names the assistant superintendent as sponsor and sets measurable benefits.",
  "tip": "When a project's costs rise or benefits fall, the best answer is usually to re-evaluate the business case, not to continue because of money already spent.",
  "check": [
   [
    "Why is total cost of ownership better than purchase price for comparing options?",
    "It includes all costs over the solution's life, such as support, licensing, training and retirement, which can outweigh the purchase price."
   ],
   [
    "What should happen when a project's expected benefits drop significantly?",
    "The business case should be revisited and the sponsor and steering committee should decide whether to continue, change or stop the project."
   ],
   [
    "What does operational feasibility examine?",
    "Whether people and processes can adopt, operate and support the proposed solution."
   ],
   [
    "What is the first step in selecting a commercial software package?",
    "Defining and prioritizing the business and control requirements before evaluating vendors."
   ]
  ]
 },
 {
  "t": "System development methodologies: SDLC, agile, DevOps, prototyping and RAD",
  "body": [
   "A system development methodology is the structured way an organization turns requirements into working software. Auditors do not need to prefer one method, but they must understand where controls sit in each, what evidence to expect and what risks each method brings. The CISA exam frequently presents an agile or DevOps team and asks what the auditor should look for, so you need to recognize controls even when they look different from traditional sign-off documents.",
   "The traditional system development life cycle (SDLC), often called the waterfall model, moves through phases in sequence: feasibility study, requirements definition, design, development (build), testing, implementation and post-implementation review. Each phase ends with defined deliverables and formal sign-off before the next begins, which makes control points easy to identify and gives auditors clear evidence. Its weakness is inflexibility: requirements are fixed early, users see working software late, and problems found in testing are expensive to fix. The V-model is a variant that pairs each development phase with a matching test phase, such as requirements with acceptance testing and design with integration testing.",
   "Agile methods, such as Scrum, deliver working software in short, fixed-length iterations called sprints. Requirements are captured as user stories in a prioritized product backlog, each with acceptance criteria. Roles include the product owner, who represents the business and prioritizes the backlog; the development team, which is cross-functional and self-organizing; and the Scrum master, who facilitates the process and removes obstacles. Ceremonies include sprint planning, daily stand-ups, sprint reviews that demonstrate working software, and retrospectives. Documentation is lighter but still exists. Auditors look for security and control requirements written into the backlog as stories or acceptance criteria, a definition of done that includes testing and security checks, evidence of testing within each sprint, product owner acceptance, and controlled release to production.",
   "DevOps extends agile by joining development and operations, using automated continuous integration and continuous delivery or deployment (CI/CD) pipelines to build, test and release changes frequently. Controls then become automated gates: mandatory peer code review before merge, automated unit and security tests, static and dependency scanning, protected branches, and approval before production deployment for higher-risk changes. DevSecOps emphasizes building security into these pipelines from the start rather than testing at the end. A typical pipeline rule might require that `main` is a protected branch, merges need at least one approving reviewer other than the author, and the deploy job runs only after all tests pass. Segregation of duties is still achieved, but through pipeline permissions and review requirements rather than separate teams.",
   "Prototyping builds quick working models to clarify requirements with users. It is excellent for discovering what users really need, but the risk is that a prototype, built without proper controls, documentation or security, is pushed into production because it 'already works'. Rapid application development (RAD) uses prototypes, reusable components, joint application design workshops and timeboxing to deliver quickly, which risks weaker controls and documentation if not governed. Other approaches include object-oriented and component-based development, low-code platforms used by business users, and reverse engineering of existing software.",
   "Consider a worked example. An auditor reviews a retail company's mobile app team, which uses two-week sprints and deploys daily through a pipeline. There are no traditional sign-off documents, and a manager worries that means no control. The auditor finds that the backlog includes security stories such as enforcing session timeouts, the definition of done requires passing automated tests and a peer review, and the pipeline blocks deployment when tests fail. However, the auditor also finds that two senior developers can bypass branch protection and deploy directly. The finding is about that bypass capability, not about the use of agile.",
   "Common mistakes: assuming agile means no documentation or controls; expecting agile teams to produce waterfall-style sign-off documents; overlooking who can change or bypass pipeline configurations; letting prototypes become production systems without hardening; and assuming automated tests are adequate without checking what they cover. Whatever the method, the auditor checks that requirements include controls, that testing is adequate, that changes to production are authorized and traceable, and that the business accepts what is delivered.",
   "Exam clue words: 'phases completed in sequence with formal sign-off' is waterfall SDLC. 'Short iterations, backlog, product owner' is agile. 'Automated build, test and deploy pipeline' is DevOps and CI/CD. 'Greatest risk of prototyping' is the prototype going into production without controls. 'Where should security requirements appear in agile?' is in the backlog and acceptance criteria. 'Best control over code promoted in a DevOps pipeline' is usually mandatory independent review plus restricted deployment permissions."
  ],
  "terms": [
   [
    "Waterfall (SDLC)",
    "A sequential development approach where each phase is completed and signed off before the next begins."
   ],
   [
    "Product backlog",
    "A prioritized list of features and requirements, usually written as user stories, used in agile development."
   ],
   [
    "Definition of done",
    "The agreed criteria, such as passing tests and review, that a work item must meet before it is considered complete."
   ],
   [
    "DevOps",
    "Practices that combine development and operations with automation to deliver changes quickly and reliably."
   ],
   [
    "CI/CD pipeline",
    "An automated sequence that builds, tests and releases code changes, often with gates for review and approval."
   ],
   [
    "Prototyping",
    "Building an early working model of a system to refine requirements with users."
   ],
   [
    "Rapid application development (RAD)",
    "A method that uses prototypes, reusable components and timeboxing to deliver systems quickly."
   ]
  ],
  "example": "An insurance company's claims team builds a prototype web form in a low-code tool to show business users how online claims might work. Users like it, and a manager asks to launch it next week. The IS auditor points out that the prototype has no input validation, stores claimant data without encryption and was never tested for load. The company treats the prototype as a requirements tool, and the production version is built through the normal pipeline with security requirements in the backlog.",
  "tip": "Agile and DevOps do not mean no controls. Look for controls in different places: backlog acceptance criteria, definition of done, automated tests and pipeline approval gates.",
  "check": [
   [
    "What is the main control risk of prototyping?",
    "That an uncontrolled prototype is moved into production without proper security, documentation and testing."
   ],
   [
    "In an agile project, where should security requirements be captured?",
    "In the product backlog as user stories or acceptance criteria, and in the definition of done."
   ],
   [
    "How is segregation of duties achieved in a DevOps pipeline?",
    "Through controls such as mandatory independent code review, protected branches and restricted deployment permissions."
   ],
   [
    "Why does the waterfall model make control points easy to audit?",
    "Each phase ends with defined deliverables and formal sign-off before the next begins."
   ]
  ]
 },
 {
  "t": "Control identification and design: input, processing and output application controls",
  "body": [
   "Controls are cheapest and most effective when designed into a system rather than added after go-live. During requirements and design, the project team, with advice from security, risk and audit, should identify the risks in the business process and build in application controls to address them. The auditor can review and advise on what controls are needed, but should not design them, to protect independence when the system is audited later. Application controls aim to ensure that data is complete, accurate, valid, authorized and that processing is timely and traceable.",
   "Input controls ensure data entering the system is authorized, complete and accurate. Authorization of source transactions comes first. Edit and validation checks then catch bad values: a validity check accepts only permitted values such as valid department codes; a range check requires values between limits; a limit check sets an upper bound, such as no single payment above a threshold; a reasonableness check compares with expected patterns; a format or field check ensures the right data type; an existence check confirms a value exists in master data, such as a valid customer ID; a check digit, calculated from the other digits, detects transcription errors in account numbers; a completeness check ensures required fields are filled; duplicate checks reject repeated transactions; and logical relationship checks compare related fields, such as a hire date after a birth date.",
   "Batch controls confirm that a group of transactions was entered completely. A record count compares the number of items; a control total sums a meaningful amount field such as invoice value; a hash total sums a field that is not meaningful as a total, such as account numbers, and will change if any item is altered or missing. Error handling matters as much as detection: rejected items should go to a suspense file or error queue, be corrected and resubmitted by authorized staff, and be tracked so none are lost.",
   "Processing controls ensure data is processed completely and accurately. Examples include run-to-run totals that carry control figures from one processing step to the next, recalculation and reasonableness checks, matching (such as the three-way match of purchase order, receipt and invoice), exception reports for items that fail rules, limit checks on calculated amounts, and controls to prevent duplicate processing. Data file controls protect master and transaction files: logging and reviewing changes to sensitive master data such as vendor bank details, before-and-after images, file labels and version checks, and transaction logs that allow recovery.",
   "Output controls ensure results are complete, accurate and delivered only to authorized recipients. They include reconciling output totals with input and processing totals, balancing and review of reports by users, controlled distribution of sensitive reports and printed forms such as checks, logging of output delivery, retention rules and secure disposal. Audit trails that record who did what and when support both detection and investigation. The auditor checks that controls match the risks, are tested, cannot be bypassed by users or administrators, and are supported by effective IT general controls.",
   "Consider a worked example. A company is designing a new vendor payment module. The risks are payment to fictitious vendors, payment of wrong amounts, duplicate payments and diversion of funds. Controls designed in response include: vendor creation approved by someone other than payment staff (authorization), changes to vendor bank details logged, verified by call-back and reported weekly (data file control), a three-way match before payment (processing), duplicate invoice number detection (input), a limit check requiring a second approver above a threshold (input), and reconciliation of the payment file total to the bank's confirmation (output). The IS auditor reviews the design and confirms each key risk has at least one preventive and one detective control.",
   "Common mistakes: choosing a check digit to find missing batch items (it detects transcription errors in a single number); confusing a hash total with a control total; relying on input edits when users can override them without logging; forgetting error correction so rejected items vanish; and testing application controls without confirming that change management protects their configuration. Another trap is the auditor designing the controls; advising is fine, designing is not.",
   "Exam questions usually describe an error and ask which control would catch it. 'Transposed digits in an account number' is a check digit. 'Invalid code entered' is a validity check. 'Amount outside an allowed range' is a range or limit check. 'An item missing or altered in a batch' is a record count or hash total. 'Totals lost between processing steps' is run-to-run totals. 'Output delivered to the wrong person' is distribution control. 'Best time to build controls' is during design."
  ],
  "terms": [
   [
    "Validity check",
    "An edit check that accepts only values that are permitted for a field, such as real dates or valid codes."
   ],
   [
    "Check digit",
    "A calculated digit appended to a number that detects transcription errors when the number is entered."
   ],
   [
    "Hash total",
    "A total of a non-financial field, such as account numbers, used to detect changes or missing items in a batch."
   ],
   [
    "Control total",
    "A total of a meaningful amount field, such as invoice value, compared before and after processing."
   ],
   [
    "Run-to-run totals",
    "Control totals carried from one processing step to the next to confirm nothing was lost or added."
   ],
   [
    "Suspense file",
    "A holding area for rejected transactions until they are corrected and resubmitted by authorized staff."
   ],
   [
    "Audit trail",
    "A chronological record of system activity showing who did what and when, supporting detection and investigation."
   ]
  ],
  "example": "A payroll clerk accidentally types an employee number with two digits swapped, which would send one person's salary to another. The check digit on the employee number fails and the system rejects the entry. Later, a batch of timesheets is uploaded with one file missing; the record count and hash total of employee numbers do not match the control sheet, so the batch is held in suspense until the missing file is found and processed.",
  "tip": "Match the control to the error: validity or range checks for bad individual values, check digits for transcription errors, record counts and hash totals for missing or altered batch items, reconciliations for completeness of output.",
  "check": [
   [
    "Which control detects a transposition error in an account number at data entry?",
    "A check digit, which is calculated from the other digits and fails when digits are swapped."
   ],
   [
    "What is the difference between a hash total and a control total?",
    "A control total sums a meaningful amount such as value; a hash total sums a non-meaningful field such as account numbers purely to detect changes or omissions."
   ],
   [
    "What should happen to transactions rejected by input edits?",
    "They should go to a suspense file or error queue, be corrected and resubmitted by authorized staff, and be tracked until cleared."
   ],
   [
    "Why should application controls be designed during system design rather than after go-live?",
    "They are cheaper and more effective when built in, and retrofitting them often leaves gaps or bypasses."
   ]
  ]
 },
 {
  "t": "System readiness and implementation testing: unit, integration, system, UAT and regression",
  "body": [
   "Testing shows whether a system does what it should, including its controls, before it is trusted with real work. A system that goes live untested can corrupt data, expose information or stop business operations, and fixing problems after go-live costs far more than finding them earlier. The IS auditor's job is to confirm that testing was planned, performed at the right levels, documented and signed off by the right people, and that serious defects were resolved before implementation.",
   "Testing happens at several levels, usually in this order. Unit testing checks individual modules or functions in isolation, usually by the developers who wrote them, often with automated test frameworks. Integration testing checks that modules and interfaces work together and pass data correctly, including interfaces with other systems. System testing checks the whole system against functional and non-functional requirements. Non-functional testing covers performance, load and stress (behavior at and beyond expected volumes), security, recovery (can the system recover from failure), usability and volume. User acceptance testing (UAT) lets business users confirm the system meets their requirements in realistic scenarios; the system owner signs off. Final acceptance may also include quality assurance review and security testing such as vulnerability scans or penetration tests performed by authorized testers.",
   "Regression testing reruns earlier tests after any change, fix or upgrade to confirm that functions that previously worked still work. It is essential in agile and DevOps environments where changes are frequent, and it is usually automated. Other terms appear on the exam: alpha testing is done by internal users before release, beta testing by a limited group of external users; pilot testing runs the system in one area first; sociability testing confirms the new system works in the target environment alongside other systems without harming them; and interface testing focuses on data exchanges between systems.",
   "Testing techniques differ in what they see. Black-box testing checks outputs for given inputs without looking at code, and suits functional and acceptance testing. White-box testing examines internal logic, paths and conditions, and suits unit testing. Gray-box testing combines both. Test cases should cover valid, invalid and boundary values; for a field that accepts 1 to 100, you test 0, 1, 100 and 101. Test data should not use real personal data unless it is masked or anonymized, because test environments usually have weaker controls. Tests should run in a separate test environment that mirrors production, so tests cannot damage live data, and developers should not have uncontrolled access to production.",
   "Readiness goes beyond software. Before go-live the organization should confirm complete and accurate data conversion from the old system, with record counts and control totals reconciled; up-to-date user and operations documentation; trained users and support staff; configured backup, recovery and monitoring; security settings hardened; and a rollback plan in case implementation fails. Go/no-go criteria agreed in advance make the final decision objective.",
   "Consider a worked example. A bank is about to launch a new loan origination system. The IS auditor reviews the test plan and results. Unit and integration testing are well documented, but UAT was performed by IT analysts rather than loan officers, and sign-off came from the IT project manager. The defect log shows three open high-severity defects, one affecting interest calculation, with no formal acceptance by the business owner. The test environment was loaded with a full copy of real customer data without masking. The auditor recommends that loan officers perform UAT, the business owner sign off, the interest defect be fixed and retested, and test data be masked.",
   "Common mistakes: letting IT sign off UAT; skipping regression testing after late fixes; testing only valid inputs; using production personal data unmasked in test; testing in production; and going live with open critical defects that the business owner has not formally accepted. Another trap is confusing integration testing (modules and interfaces within the new system) with sociability testing (coexistence with other systems in the environment).",
   "Exam wording gives clues. 'Developers test individual modules' is unit testing. 'Business users confirm requirements are met' is UAT. 'After a change, confirm nothing previously working is broken' is regression testing. 'Behavior under peak or excessive load' is stress or load testing. 'Testing without knowledge of internal code' is black-box. 'Who should sign off acceptance?' is the business or system owner. 'Biggest concern with production data in test' is privacy and confidentiality, so it should be masked."
  ],
  "terms": [
   [
    "Unit testing",
    "Testing individual program modules in isolation, usually by developers."
   ],
   [
    "Integration testing",
    "Testing that modules and interfaces work together and pass data correctly."
   ],
   [
    "User acceptance testing (UAT)",
    "Testing by business users to confirm the system meets their requirements before go-live."
   ],
   [
    "Regression testing",
    "Rerunning previous tests after a change to confirm existing functions still work."
   ],
   [
    "Black-box testing",
    "Testing functionality by checking outputs for given inputs without examining internal code."
   ],
   [
    "Stress testing",
    "Testing system behavior at and beyond expected peak loads to find breaking points."
   ],
   [
    "Data masking",
    "Replacing sensitive values in test data with realistic but fictitious values to protect privacy."
   ]
  ],
  "example": "An online retailer fixes a bug in its checkout discount logic two days before a holiday sale. The fix passes its own unit test, but the automated regression suite reveals that it also broke tax calculation for one region. The team fixes the tax issue, reruns the full regression suite and a load test at expected peak volume, and the business owner signs off the release based on the test results.",
  "tip": "UAT sign-off belongs to the business users and system owner, not IT. And production data used in testing should be masked to protect privacy.",
  "check": [
   [
    "Who should perform and sign off user acceptance testing?",
    "Business users and the system owner, because they confirm the system meets business requirements."
   ],
   [
    "What is the purpose of regression testing?",
    "To confirm that changes or fixes have not broken functions that previously worked."
   ],
   [
    "Why should production personal data be masked before use in test environments?",
    "Test environments usually have weaker controls, so unmasked data creates privacy and confidentiality risk."
   ],
   [
    "What is the difference between integration testing and sociability testing?",
    "Integration testing checks modules and interfaces within the system work together; sociability testing checks the system coexists with other systems in the target environment without harming them."
   ]
  ]
 },
 {
  "t": "Implementation configuration and release management; changeover approaches",
  "body": [
   "Going live is one of the riskiest moments in a system's life. Implementation planning, configuration management and release management reduce the chance that the wrong version, a bad setting, incomplete data or an untested change reaches production. The IS auditor checks both the process and the evidence: what was approved, what was tested and what was actually deployed.",
   "Configuration management identifies and records the approved configuration of each component, called a configuration item (CI), such as software versions, settings, dependencies and infrastructure, usually in a configuration management database (CMDB). It establishes baselines, controls changes to them, and verifies that what is running matches what is recorded. Version control systems track every change to code and configuration files, with who made it and why; commands such as `git log --oneline` show that history, and tags such as `git tag v2.3.0` mark the exact version that was released. Infrastructure as code extends the same discipline to servers and networks.",
   "Release management packages tested changes into releases, schedules them, and moves them to production through a controlled process with authorization, communication, deployment steps, verification and rollback plans. Segregation of duties matters here: developers should not move their own code into production, and production libraries and environments should be protected from direct changes. Ideally, the exact build that passed testing is the one deployed, identified by version number or checksum, so nothing is rebuilt or altered in between. Emergency releases follow an expedited path but are still logged and reviewed afterward.",
   "Data conversion or migration often accompanies implementation. Controls include cleansing data before migration, mapping old fields to new, running trial conversions, reconciling record counts, control totals and hash totals between old and new systems, having users verify samples, and keeping the old data available until the new system is proven. Incomplete or inaccurate conversion is one of the most common causes of implementation failure.",
   "Changeover, or cutover, approaches differ in risk and cost. Parallel changeover runs old and new systems together for a period and compares results; it is the safest because the old system remains a fallback, but the most expensive because users do double work. Phased changeover introduces the new system module by module or function by function, spreading risk but creating temporary interfaces between old and new. Pilot changeover runs the new system in one location or group first, then rolls out to the rest. Direct or abrupt changeover, sometimes called big bang or plunge, switches everything at once; it is the cheapest and quickest but the riskiest, because there is no easy fallback if something goes wrong.",
   "Consider a worked example. A manufacturer is replacing its inventory system across five warehouses. Running both systems in parallel everywhere would need staff it does not have, and a direct cutover risks halting shipments. The team chooses a pilot at the smallest warehouse for one month, with go/no-go criteria such as inventory counts matching within an agreed tolerance and order processing times no worse than before. The auditor confirms the release deployed was the tested version by comparing checksums, reviews the conversion reconciliation, and checks that a rollback plan to the old system was documented and rehearsed before the pilot began.",
   "Common mistakes: letting developers deploy their own code; rebuilding code for production instead of deploying the tested artifact; skipping data conversion reconciliation; choosing direct cutover for a critical system without a tested fallback; failing to update the CMDB after release; and assuming parallel running is always best, when its cost and workload may be unjustified for low-risk systems. After implementation, a post-implementation review assesses whether objectives and benefits were met and captures lessons learned. It should be done after the system has run long enough for results to be measurable, and by people independent enough to report problems honestly.",
   "Exam clue words: 'lowest risk' or 'results compared between old and new' is parallel changeover. 'Highest risk', 'no fallback' or 'all at once' is direct cutover. 'One location first' is pilot. 'Module by module' is phased. 'Ensure the version deployed is the one tested' points to configuration and release management with version control. 'Record counts and control totals between old and new' is data conversion verification. 'Who moves code to production?' is someone independent of development, such as operations or an automated pipeline with approval."
  ],
  "terms": [
   [
    "Configuration management",
    "Identifying, recording and controlling the approved configuration of system components and verifying it matches what is running."
   ],
   [
    "Configuration management database (CMDB)",
    "A repository that records configuration items, their attributes and relationships."
   ],
   [
    "Release management",
    "The process of planning, packaging, approving and deploying tested changes into production."
   ],
   [
    "Parallel changeover",
    "Running the old and new systems at the same time and comparing results before switching fully."
   ],
   [
    "Pilot changeover",
    "Implementing the new system in one location or group first before rolling it out more widely."
   ],
   [
    "Direct cutover",
    "Switching from the old system to the new one at a single point in time with no parallel running."
   ],
   [
    "Rollback plan",
    "A prepared procedure to return to the previous state if a release fails."
   ]
  ],
  "example": "A credit union replacing its core banking system decides to run the old and new systems in parallel for a full month-end cycle. Staff enter transactions in both, and daily reconciliations compare balances and interest calculations. Two discrepancies in fee calculation are found and fixed before the old system is switched off. The extra staff overtime is significant, but management judges it justified because errors in member balances would be far more costly.",
  "tip": "Parallel is lowest risk and highest cost; direct cutover is highest risk and lowest cost. Phased and pilot sit in between. Always confirm the deployed version is the one that was tested.",
  "check": [
   [
    "Which changeover approach carries the highest risk, and why?",
    "Direct cutover, because everything switches at once with no easy fallback if the new system fails."
   ],
   [
    "How can an auditor confirm the deployed release is the version that was tested?",
    "By comparing version identifiers or checksums of the deployed build with the tested build, using configuration and release management records."
   ],
   [
    "What controls verify data conversion accuracy?",
    "Reconciling record counts, control totals and hash totals between old and new systems, plus user verification of samples."
   ],
   [
    "Why should developers not deploy their own code to production?",
    "It breaks segregation of duties and allows unauthorized or untested changes to reach production undetected."
   ]
  ]
 },
 {
  "t": "System migration, infrastructure deployment and data conversion",
  "body": [
   "Moving to a new system usually means moving data and often infrastructure too, for example from on-premises servers to a cloud platform. It is one of the riskiest moments in a system's life. Migrations fail when data is lost, altered, duplicated or mismapped on the way across, or when the new environment goes live without the security configuration the old one had. For a Certified Information Systems Auditor (CISA), the questions are simple to state: is the data in the new system complete and accurate, and is the new environment at least as well controlled as the one it replaces?",
   "Data conversion follows a planned sequence. First, identify the source data and its owners, because only the business owner can say what 'correct' means. Next, clean the data, removing duplicates and fixing known errors before they are copied. Then map each field from the old format to the new one, write conversion rules (for example how an old six-character branch code becomes a new ten-character one), and run trial conversions in a test environment. Each trial is reconciled, exceptions are investigated and fixed, and only then is the final conversion performed, often over a weekend cutover window.",
   "Reconciliation is the key control, and the exam returns to it again and again. Record counts confirm that the same number of records arrived as left. Control totals, such as the sum of all account balances, confirm that monetary amounts were not changed. Hash totals, a sum of a field that has no meaning on its own such as account numbers, detect records that were swapped or altered even when the count and amount still match. The team also compares a detailed sample of individual records field by field. The data owner then signs off that the converted data is complete and accurate. Until the new system is verified and retention rules are satisfied, the old data and system should be kept in read-only form so that anything missed can still be recovered.",
   "Controls during conversion protect the data while it is in motion. Only authorized people should be able to run conversion programs, every run should be logged, and manual corrections should be recorded with who made them and why. Sensitive data in staging areas and in transit needs the same protection, such as encryption and access control, as it has in production. Developers should not change production data directly to fix conversion errors; fixes go through the conversion rules or an approved, logged correction process. Cutover strategies also matter: a parallel run operates old and new systems together and compares outputs, a phased approach moves one unit at a time, and a direct (big bang) cutover switches everything at once with the highest risk and a well-rehearsed fallback plan.",
   "Infrastructure deployment needs its own controls. New servers, networks and cloud accounts should be built to approved, hardened configuration standards. Infrastructure as code (IaC), where environments are defined in files such as Terraform or CloudFormation templates, should be reviewed, version-controlled and approved like application code, because a single template error can expose every server it creates. Network segmentation, backups, logging and monitoring should be working before go-live, not added afterwards, and capacity should be sized for expected load. In cloud migrations, the organization must understand the shared responsibility model: the provider secures the underlying platform, while the customer still configures identity, encryption, storage permissions and logging.",
   "Consider a worked example. A credit union migrates 200,000 member accounts to a new core banking platform. After the second trial run, the record counts match exactly, but the control total of balances differs by 1,240 in the currency. Investigation finds that accounts with negative balances were mapped to an unsigned field, so overdrafts were loaded as positive amounts. The mapping rule is corrected, the trial is rerun and reconciled to zero difference, a sample of 50 accounts is checked field by field, and the finance director, as data owner, signs off before the final conversion. The old system stays available read-only for six months.",
   "Common mistakes: treating matching record counts as proof of accuracy (counts say nothing about amounts or field values); letting the IT project team sign off instead of the data owner; deleting or decommissioning the old system before reconciliation is complete; skipping trial conversions to save time; and assuming a cloud provider will configure logging and access control for you. Another trap is fixing errors directly in the new database without a record, which destroys the audit trail the auditor needs.",
   "Exam questions usually describe a symptom and ask for the best control or the auditor's greatest concern. 'Ensure data was transferred completely and accurately' points to reconciliation of counts, control totals and hash totals. 'Who should approve the converted data' points to the data owner or user management. 'Greatest risk in a direct cutover' points to having no fallback, so a tested backout plan is the answer. 'Old system retired before verification' is a finding. If the stem mentions templates, scripts or automated builds, the answer usually involves reviewing IaC through change management."
  ],
  "terms": [
   [
    "Data conversion",
    "Transforming and moving data from an old system's format into a new system's format."
   ],
   [
    "Data mapping",
    "Defining which field in the source system corresponds to which field in the target system, with any transformation rules."
   ],
   [
    "Control total",
    "A total of a meaningful value, such as amounts, compared before and after processing to detect loss or alteration."
   ],
   [
    "Hash total",
    "A total of a field with no business meaning, such as account numbers, used only to detect changed or substituted records."
   ],
   [
    "Parallel run",
    "Operating the old and new systems at the same time and comparing their results before relying on the new one."
   ],
   [
    "Infrastructure as code (IaC)",
    "Defining servers, networks and cloud resources in version-controlled files that tools use to build environments automatically."
   ],
   [
    "Shared responsibility model",
    "The division of security duties between a cloud provider and its customer, which varies by service model."
   ]
  ],
  "example": "A hospital moves its patient billing system to a software as a service platform. The project team runs three trial conversions, reconciling record counts, total outstanding balances and a hash total of patient numbers after each run. The third trial shows a small hash total difference, traced to 14 patients whose identifiers contained a leading zero that the new system dropped. The mapping is fixed, the billing manager signs off the final reconciliation, and the old system is kept read-only until year-end audit.",
  "tip": "Matching record counts alone do not prove a conversion was accurate. The strongest evidence is reconciliation of counts, control totals and hash totals plus a detailed sample, signed off by the data owner, with the old data retained until verification is complete.",
  "check": [
   [
    "What is the most important control to confirm that data conversion was complete and accurate?",
    "Reconciliation of record counts, control totals and hash totals between source and target, reviewed and signed off by the data owner, because it directly compares what left with what arrived."
   ],
   [
    "Why is a hash total useful even when record counts and amount totals match?",
    "It can reveal records that were altered or substituted, such as wrong account numbers, which counts and amount totals would not detect."
   ],
   [
    "Who should sign off on converted data, and why not the project team?",
    "The data owner or business user management, because they are accountable for the data and know what correct looks like; the project team has an interest in going live."
   ],
   [
    "An organization plans to decommission its old system the day after cutover. What should the auditor recommend?",
    "Keep the old system and data in read-only form until the new system and converted data are verified and retention requirements are met, so errors can still be investigated and corrected."
   ]
  ]
 },
 {
  "t": "Post-implementation review and benefits realization",
  "body": [
   "A project is not truly finished when the system goes live. The post-implementation review (PIR) asks whether the project achieved what it set out to do, whether the system and its controls work as intended, and what the organization can learn for next time. It closes the loop with the business case, the document that justified spending the money in the first place. Without a PIR, management cannot tell whether an investment paid off or whether the same mistakes will be repeated on the next project.",
   "Timing is the first thing the exam tests. A PIR is performed after the system has been in production long enough for results to be measured, often several months, and after early stabilization problems have settled. Doing it the day after go-live measures only the launch, and doing it before go-live is simply testing. Some organizations hold a short project closure review soon after go-live to capture lessons while memories are fresh, and a fuller PIR later to measure benefits.",
   "A PIR follows a clear set of steps. It compares actual costs, schedule and benefits with the business case. It checks whether user requirements are met and whether users are satisfied, often through surveys and help desk statistics. It checks whether controls are working as designed: input validation, interfaces, audit trails, segregation of duties, access rights and backups. It reviews outstanding defects, open change requests and any workarounds users have adopted. Finally it records lessons learned about estimation, requirements, testing and vendor management, and assigns actions for them. The PIR may be performed by the project team, quality assurance or an independent party, and an internal auditor may participate or review the results. Independence adds credibility, because the project team has an interest in declaring success.",
   "Benefits realization is the discipline of planning, tracking and confirming the benefits promised in the business case. Benefits should be stated in measurable terms, with a baseline, a target, an owner and a date, for example reducing average invoice processing time from five days to two within twelve months. Benefits often arrive after the project team has disbanded, so accountability must sit with a business benefit owner, not the project manager. Benefits are tracked through regular reporting, and if they are not being realized the organization investigates why and decides on corrective action, such as further training, process changes or additional functions.",
   "Consider a worked example. Six months after launching a customer self-service portal, the PIR compares results with the business case, which promised a 30 percent drop in call center volume. Actual volume fell by 18 percent. Analysis of the remaining calls shows that two of the most common requests, changing a delivery address and downloading a tax statement, were left out of scope to meet the deadline. The PIR also finds that portal access logs are not being reviewed. The benefit owner adds the two functions to the backlog, the security team schedules log review, and the lessons learned note that call data should shape requirements on future projects.",
   "For auditors, the PIR is also a source of evidence about how well the organization manages projects. The auditor checks that a PIR was planned, performed at a sensible time and by suitably independent people; that it measured benefits against the approved business case rather than a revised, easier target; that findings were assigned owners and tracked to closure; and that lessons learned actually reached later projects. A missing PIR is itself a finding.",
   "Common mistakes: performing the PIR immediately after go-live, before benefits can be measured; letting the project manager, who will move on, own the benefits; measuring only whether the project was on time and on budget while ignoring whether benefits and controls were delivered; comparing results with a quietly revised business case; and filing lessons learned where no future project team will read them. Another trap is assuming the PIR is only about finance, when control effectiveness is a core part of it.",
   "Exam questions tend to ask about timing, reference point and ownership. 'When should a PIR be performed' points to after the system has operated long enough for benefits to be measured. 'Primary objective of a PIR' points to determining whether the project met its objectives and business case, including controls. 'Who is accountable for realizing benefits' points to the business owner or sponsor, not the project manager. If the stem says benefits were never measured, the answer usually involves defining measurable benefits with owners and tracking them."
  ],
  "terms": [
   [
    "Post-implementation review (PIR)",
    "A review after a system has operated for a while to assess whether it met its objectives, delivers expected benefits and has effective controls."
   ],
   [
    "Business case",
    "The document that justifies a project by setting out expected costs, benefits, risks and alternatives."
   ],
   [
    "Benefits realization",
    "Planning, tracking and confirming that the benefits promised in the business case are actually achieved."
   ],
   [
    "Benefit owner",
    "The business manager accountable for delivering a specific benefit after the project closes."
   ],
   [
    "Lessons learned",
    "Documented insights from a project about what worked and what did not, intended to improve future projects."
   ],
   [
    "Baseline",
    "The measured starting value of a metric, used to show how much a project changed it."
   ]
  ],
  "example": "A logistics company replaces its warehouse management system, promising a 20 percent reduction in picking errors. Nine months later an independent PIR finds errors have fallen by 22 percent, but the promised reduction in overtime has not appeared because staff still run a manual stock check they no longer need. The operations director, as benefit owner, retires the manual check and the PIR notes that process changes should be planned alongside system changes.",
  "tip": "The PIR happens after the system has run long enough to measure results, not right after go-live and not before. Its reference point is the approved business case, and benefits belong to a business owner, not the project manager.",
  "check": [
   [
    "Why should a PIR not be performed immediately after go-live?",
    "Benefits and steady-state performance cannot yet be measured, and early stabilization issues would distort the results."
   ],
   [
    "What document is the main reference point for a PIR?",
    "The approved business case, because the PIR checks whether the promised costs, benefits and objectives were achieved."
   ],
   [
    "Who should be accountable for realizing benefits once the project closes?",
    "A business benefit owner or sponsor, because the project team disbands and benefits often arrive later."
   ],
   [
    "Besides benefits, what should a PIR check about the new system?",
    "Whether controls such as access, audit trails, interfaces and segregation of duties work as designed, and whether user requirements are met."
   ]
  ]
 },
 {
  "t": "IT components and IT asset management: hardware, software, inventory and licensing",
  "body": [
   "IT operations rest on many components: servers, storage, network devices such as routers and switches, end-user devices, operating systems, databases, middleware and applications, whether they sit on premises or in the cloud. An auditor does not need to configure them, but must understand what each does and what can go wrong, because risks and controls follow from the technology. A database holds valuable data, middleware passes it between systems, network devices decide who can reach what, and every one of them needs an owner, patches and a place in the inventory.",
   "IT asset management (ITAM) keeps track of those components through their whole life: request, approval, procurement, receipt and tagging, deployment, maintenance, and finally retirement with secure disposal. The foundation is an accurate inventory, often held in a configuration management database (CMDB) or dedicated asset register. For each asset it records an owner, location, configuration, criticality, support status and the classification of the data it holds. You cannot patch, monitor, license, back up or protect assets you do not know about, so an incomplete inventory weakens nearly every other control.",
   "Keeping the inventory accurate takes more than a spreadsheet updated by hand. Automated discovery tools scan the network and query endpoints to find devices and software that were never recorded. A quick look at a Windows endpoint's installed software, for example, can come from `Get-Package` in PowerShell, and on a Linux server from `dpkg -l` or `rpm -qa`; enterprise tools do the same at scale. The inventory should then be reconciled with purchase records, network data and cloud account listings, and differences investigated. Cloud resources deserve special attention, because they can be created in minutes with a credit card and never reach the register.",
   "Software asset management (SAM) compares installed and used software with purchased licenses. Using more copies than licensed creates legal and financial exposure during a vendor audit, while buying far more than needed wastes money. License models vary, such as per user, per device, per processor core, concurrent users or subscriptions, so the organization must understand the terms of each agreement. Controls include restricting who can install software, maintaining a list of approved software, periodic license reconciliation, and tracking of software as a service subscriptions. Assets that reach end of life (EOL) and no longer receive vendor security updates are a real security concern and should be replaced, upgraded or isolated with compensating controls.",
   "Disposal completes the lifecycle. Storage media must be sanitized using methods suited to the media type and data sensitivity: overwriting, cryptographic erase (destroying the encryption key so the data becomes unreadable), degaussing for magnetic media, or physical destruction such as shredding. Solid-state drives do not always respond reliably to simple overwriting, so cryptographic erase or destruction is often preferred. Each disposal should produce evidence, such as a certificate of destruction from a vendor, linked to the asset record. Leased equipment returned to a vendor needs the same care.",
   "Consider a worked example. An auditor compares the asset inventory with a network discovery scan and finds 40 devices on the network that are not in the register. One is an old file server running an unsupported operating system that nobody was patching and that still holds payroll exports. The auditor also finds that the organization has 500 licenses for a design tool but 612 installations. She reports an incomplete inventory, an unmanaged EOL system holding sensitive data and a license compliance gap, and recommends automated discovery with regular reconciliation, isolation and replacement of the old server, and removal or purchase of excess installations.",
   "Common mistakes: assuming the inventory is complete because a register exists; testing completeness by picking items from the register and finding them on the floor (this proves existence, not completeness); forgetting cloud and virtual assets; treating license compliance as a purely financial issue rather than a legal one; and accepting disposal without evidence of sanitization. Another trap is thinking EOL systems are fine as long as they still work.",
   "Exam questions often ask about direction of testing and first steps. To test completeness, start from the physical or network evidence (discovery scans, purchase records) and trace to the register; to test existence, start from the register and find the asset. 'First step in protecting assets' or 'basis for patch management' points to an accurate inventory. 'More installations than licenses' points to software asset management and license reconciliation. 'Unsupported operating system' points to EOL risk and replacement or isolation."
  ],
  "terms": [
   [
    "IT asset management (ITAM)",
    "Tracking and controlling IT assets from request and procurement through use to retirement and disposal."
   ],
   [
    "Configuration management database (CMDB)",
    "A repository of IT components and their relationships, used to support change, incident and asset management."
   ],
   [
    "Software asset management (SAM)",
    "Managing software installations and use against purchased licenses to stay compliant and avoid waste."
   ],
   [
    "End of life (EOL)",
    "The point after which a vendor no longer supports a product with fixes or security updates."
   ],
   [
    "Automated discovery",
    "Tools that scan networks and systems to find devices and software, including ones missing from the inventory."
   ],
   [
    "Cryptographic erase",
    "Sanitizing encrypted media by securely destroying the encryption key so the stored data cannot be read."
   ],
   [
    "Media sanitization",
    "Removing data from storage media so it cannot be recovered, using methods suited to the media and sensitivity."
   ]
  ],
  "example": "A university receives a vendor license audit notice. Its SAM team runs discovery across all managed endpoints and finds that a statistics package is installed on 900 machines while only 650 licenses were purchased, mostly on lab computers imaged from an old template. The team removes the software from images where it is not needed, buys the remaining shortfall, and adds a quarterly reconciliation so the gap cannot quietly grow again before the vendor's review.",
  "tip": "To test inventory completeness, trace from the real world (discovery scans, purchase records) to the register. Tracing from the register to the asset only proves the recorded items exist.",
  "check": [
   [
    "Why is an accurate asset inventory considered the foundation of IT operations and security?",
    "Because patching, monitoring, licensing, backup and protection all depend on knowing which assets exist, who owns them and what data they hold."
   ],
   [
    "How should an auditor test whether the asset register is complete?",
    "Start from independent evidence such as network discovery scans or purchase records and check that each item appears in the register."
   ],
   [
    "What risk does an end-of-life operating system present, and what are the options?",
    "It no longer receives security updates, so known vulnerabilities stay open; it should be upgraded, replaced or isolated with compensating controls."
   ],
   [
    "What evidence should exist when a hard drive is disposed of?",
    "A record of the sanitization or destruction method used, such as a certificate of destruction, linked to the asset record."
   ]
  ]
 },
 {
  "t": "Job scheduling, production process automation and system interfaces",
  "body": [
   "Much IT processing happens without anyone pressing a button. Batch jobs run overnight to post transactions, calculate interest, apply payments or produce reports, and interfaces move data between systems all day. If these automated processes fail, run twice, run out of order or are altered, the damage can be large and quiet, because nobody is watching each step. Auditors care because many financial and operational controls rely on these jobs running correctly and completely.",
   "Job scheduling software runs jobs in the right order at the right time and handles dependencies, such as not running payroll before timesheets have loaded. On a single Linux server a schedule might be a crontab line such as `0 2 * * * /opt/finance/post_gl.sh`, meaning run the posting script at 02:00 every day; enterprises use central schedulers that manage thousands of jobs across platforms. Automated scheduling reduces human error compared with operators starting jobs by hand, but only if the schedule itself is protected, because whoever can change a job can change what the business runs.",
   "Scheduling controls follow directly from that risk. Access to add, change or delete scheduled jobs should be restricted to authorized operations staff, and developers should be kept out of production scheduling. Changes to the schedule go through change management like any other production change. Jobs run under service accounts with least privilege. Operators monitor job completion, failures and abnormal run times, and exception and rerun logs are reviewed, because a rerun can post transactions twice. Restart and recovery procedures should be documented so a failed job is restarted from a safe point rather than improvised.",
   "System interfaces move data between applications, either in batch files or in real time through application programming interfaces (APIs). Each interface is a point where data can be lost, duplicated, altered or exposed. Completeness and accuracy controls include record counts and control totals compared at the sending and receiving ends, sequence numbers to detect missing or duplicate transmissions, validation of formats and values on receipt, and error handling with exception queues that someone actually reviews. Security controls include authentication between systems, encryption in transit, integrity checks and logging. Every interface should be inventoried with a business and technical owner, so it is clear who investigates when a reconciliation fails.",
   "Production process automation, including robotic process automation (RPA) bots that mimic user actions in applications, needs the same discipline. Each bot should have its own named service account with least privilege, not a copy of a human's account. Changes to bot logic go through change control and testing, credentials are stored in a vault rather than in scripts, and bot outputs are monitored and reconciled. A bot that silently fails, or keeps running after the process it automates has changed, can corrupt data at machine speed.",
   "Consider a worked example. Each night an interface sends approved invoices from procurement to accounts payable. A reconciliation report compares the count and total amount at both ends. One morning it shows 412 invoices sent but 409 received. The accounts payable supervisor holds the payment run and investigates the exception queue, finding three invoices rejected because of a new supplier code format. The formats are corrected, the three invoices are reprocessed through the normal path, the reconciliation balances and payments go ahead. Without the reconciliation, three suppliers would simply not have been paid, and nobody would have known why.",
   "Common mistakes: assuming that because a job is automated it is controlled; letting developers edit production schedules to fix problems quickly; ignoring rerun logs, which is how duplicate postings slip through; treating encryption as a completeness control (it protects confidentiality, not whether all records arrived); leaving exception queues unowned; and running bots under shared or personal accounts, which destroys accountability. A quieter mistake is monitoring only whether jobs finished, not whether they finished with the right results, so a job that processed zero records reports success.",
   "Exam questions usually describe a symptom. 'Ensure all records sent were received' points to reconciliation of record counts and control totals between systems. 'Detect missing or duplicate transmissions' points to sequence numbers. 'Unauthorized change to a batch job' points to restricted scheduler access plus change management. 'Transactions posted twice after a failure' points to controlled restart procedures and rerun log review. 'Bot shares an employee's credentials' points to a dedicated, least-privilege bot account."
  ],
  "terms": [
   [
    "Job scheduler",
    "Software that runs batch jobs automatically in a defined order and time, handling dependencies between them."
   ],
   [
    "Batch processing",
    "Processing groups of transactions together at scheduled times rather than one at a time as they occur."
   ],
   [
    "System interface",
    "A connection that transfers data between two applications, in batches or in real time."
   ],
   [
    "Application programming interface (API)",
    "A defined way for one program to request data or services from another."
   ],
   [
    "Sequence number",
    "A number assigned to each transmission or record so gaps and duplicates can be detected."
   ],
   [
    "Robotic process automation (RPA)",
    "Software bots that perform repetitive tasks by interacting with applications the way a user would."
   ],
   [
    "Rerun log",
    "A record of jobs that were restarted or run again, reviewed to detect duplicate or unauthorized processing."
   ]
  ],
  "example": "A bank's interest calculation job fails halfway through one night. The operator, without a documented restart procedure, reruns it from the start, and 30,000 accounts receive interest twice. The next morning's control total comparison with the general ledger reveals the difference. The bank reverses the duplicates, writes restart-from-checkpoint procedures and requires a supervisor to approve and review every rerun before the next business day.",
  "tip": "For interfaces, the best completeness control is reconciliation of counts and totals between sending and receiving systems, plus sequence numbers for gaps and duplicates. Encryption protects confidentiality but does not prove completeness.",
  "check": [
   [
    "What control best confirms that an interface transferred all records?",
    "Reconciliation of record counts and control totals at the sending and receiving ends, with differences investigated before the data is used."
   ],
   [
    "Why should developers not have access to the production job scheduler?",
    "They could change or add jobs outside change management, bypassing segregation of duties and introducing unauthorized processing."
   ],
   [
    "What risk does reviewing rerun logs address?",
    "Duplicate or unauthorized processing, such as transactions posted twice after a failed job was restarted incorrectly."
   ],
   [
    "How should an RPA bot's access be set up?",
    "With its own dedicated service account granted least privilege, credentials held in a vault and changes to its logic controlled."
   ]
  ]
 },
 {
  "t": "End-user computing and shadow IT",
  "body": [
   "End-user computing (EUC) means applications built or managed by business users rather than the IT function: spreadsheets with complex formulas and macros, desktop databases, reporting tools, scripts and low-code or no-code apps. EUC is valuable because it is flexible and fast, and business users know their needs best. The risk is that EUC often supports important decisions, pricing and financial reports without any of the controls applied to formal systems, such as testing, change control, access control and backup.",
   "Typical EUC risks follow from that gap. Formulas contain errors that nobody tests; there is no version control, so nobody knows which copy is current; there is no documentation, and only one person understands the tool; access is not restricted, so anyone with the file share can change it; data is copied out of controlled systems and manipulated by hand; and files are saved on local drives that are never backed up. A single wrong cell reference in a spreadsheet used for pricing, reserves or financial reporting can cause a material error that passes straight into published figures.",
   "A good EUC program starts with an inventory of EUC tools that support important processes, then rates each by risk. Risk depends on how the output is used (financial reporting or regulatory submissions are high), complexity (macros, links and many formulas) and the amount of data or money involved. Controls are then applied in proportion: store files in a controlled location with backup, restrict edit access, lock formula cells, keep version history, require independent review and testing of changes, reconcile outputs to source systems, and document purpose, inputs and logic. The highest-risk tools may be candidates for moving into a properly developed application.",
   "Shadow IT is technology acquired or used without the IT function's knowledge or approval. The most common form today is cloud software subscribed to with a corporate card, but it also includes personal file-sharing accounts used for work, unapproved browser extensions and devices plugged into the network. Shadow IT can introduce unvetted vendors, data stored in unknown locations or countries, weak authentication without single sign-on, licensing and contract issues, and data that is not backed up or covered by retention and legal hold rules. It usually appears because users have needs that IT is not meeting quickly enough, which is itself useful information.",
   "The best first step with shadow IT is discovery: finding what is actually in use. Sources include expense reports and card statements, firewall and proxy logs, identity provider records of third-party app sign-ins, and a cloud access security broker (CASB), a tool that sits between users and cloud services to discover, monitor and apply policy to cloud use. After discovery comes risk assessment. Useful services can be brought under governance with contracts, single sign-on and data protection, risky ones replaced with approved alternatives, and the approval process made fast enough that people actually use it. Blanket bans usually push shadow IT further out of sight.",
   "Consider a worked example. Finance calculates quarterly revenue in a workbook with 30 linked tabs and several macros, maintained by one analyst. The auditor finds no version history, no review of changes and edit access for the whole finance department. At the same time, a proxy log review shows the marketing team uploading customer lists to an unapproved online survey tool. The auditor recommends adding the workbook to the EUC inventory as high risk, locking formulas, storing it with version control, and requiring a second person to review and test changes each quarter. For the survey tool, she recommends a risk assessment and either a contract with data protection terms or migration to the approved survey platform.",
   "Common mistakes: assuming spreadsheets are too small to matter; applying heavy controls to every file instead of focusing on high-risk EUC; responding to shadow IT with a ban before knowing what is in use; forgetting that SaaS subscriptions paid by card are still contracts that hold company data; and relying on the single expert who built the tool as the only reviewer.",
   "Exam questions often ask for the first or best action. 'Auditor discovers business units using unapproved cloud services' points to discovery and risk assessment before blocking. 'Critical spreadsheet with no controls' points to inventory, risk rating and proportionate controls such as change review, access restriction and backup. 'Greatest risk of EUC' is usually undetected errors or unauthorized changes feeding important decisions. 'Tool to identify cloud usage' points to a CASB."
  ],
  "terms": [
   [
    "End-user computing (EUC)",
    "Applications such as spreadsheets, desktop databases and low-code tools built or managed by business users rather than IT."
   ],
   [
    "Shadow IT",
    "Technology, especially cloud services, acquired or used without the knowledge or approval of the IT function."
   ],
   [
    "EUC inventory",
    "A register of end-user tools that support important processes, with owners and risk ratings."
   ],
   [
    "Cloud access security broker (CASB)",
    "A tool that discovers cloud service use and applies security policies between users and cloud providers."
   ],
   [
    "Proportionate control",
    "A control whose strength matches the risk of the process or tool it protects."
   ],
   [
    "Key person dependency",
    "Reliance on one individual who alone understands or can maintain a process or tool."
   ]
  ],
  "example": "An insurer's actuarial team calculates claims reserves in a large spreadsheet model. During a review, a second actuary notices that a range reference stops two rows short after new product lines were added, understating reserves. The error is caught before the figures are published. The insurer adds the model to its EUC inventory as critical, moves it to a controlled repository with version history, locks formula cells and requires documented peer review and testing whenever the structure changes.",
  "tip": "For shadow IT, the best first step is discovery and risk assessment, not blocking everything. For EUC, the key risks are missing change control, testing, access control and backup on tools that feed important decisions.",
  "check": [
   [
    "What is the first step in managing shadow IT?",
    "Discover what services are in use, for example through expense records, proxy logs or a CASB, and then assess their risk."
   ],
   [
    "Why can a spreadsheet be a significant audit risk?",
    "It may feed financial or operational decisions while lacking testing, change control, access restriction and backup, so errors go undetected."
   ],
   [
    "How should an organization decide how many controls to apply to an EUC tool?",
    "By rating its risk based on how its output is used, its complexity and the value involved, then applying proportionate controls."
   ],
   [
    "Why do blanket bans on shadow IT often fail?",
    "Users still have unmet needs, so they find less visible workarounds, which hides the risk instead of managing it."
   ]
  ]
 },
 {
  "t": "Systems availability and capacity management",
  "body": [
   "Users expect systems to be there when needed and to respond quickly. Availability management plans and monitors the ability of IT services to perform their agreed function when required. Capacity management makes sure resources such as processing power, memory, storage and network bandwidth meet current and future demand at an acceptable cost. The two are linked: many outages are not caused by broken hardware but by a disk that filled up or a server that could not handle a peak in demand.",
   "Availability is shaped by three qualities. Reliability is how rarely components fail. Maintainability is how quickly they can be restored when they do. Resilience is how well the service keeps running when parts fail. Common measures include availability as a percentage of agreed service time, mean time between failures (MTBF), the average time a component runs before failing, and mean time to repair (MTTR), the average time to restore it. Higher MTBF and lower MTTR both improve availability. As a rough guide, 99.9 percent availability allows under nine hours of downtime a year, and each extra nine cuts that by a factor of ten, usually at sharply rising cost.",
   "Techniques to improve availability include redundant components so no single failure stops the service, clustering and failover so a standby takes over, load balancing to spread traffic and remove unhealthy nodes, proactive maintenance, spare parts and support contracts with suitable response times, and monitoring that alerts before users notice. Planned maintenance should happen in agreed windows, and whether planned downtime counts against the availability target must be defined in the service level agreement (SLA).",
   "Capacity management is proactive by nature. It relies on monitoring current utilization, analyzing trends and forecasting demand from business plans, such as a product launch, a merger, seasonal peaks or a new regulatory report. On a server you might check disk use with `df -h` or processor load with `top`; enterprise monitoring tools collect these metrics continuously and chart them over months. When forecasts show resources will run out, management plans upgrades, tuning or scaling before performance suffers. Performance tuning, archiving old data and scheduling heavy batch work outside peak hours can make better use of existing capacity. In cloud environments, auto-scaling can add capacity automatically, but it needs sensible limits and cost monitoring so that a fault or attack does not scale spending without bound. Capacity management usually works at three levels. Business capacity management translates business plans into future IT demand. Service capacity management checks that each service meets its performance targets. Component capacity management watches individual resources such as processors, storage and links. A capacity plan, reviewed regularly, brings these together with forecasts, thresholds and planned actions.",
   "Consider a worked example. Storage on an order database grows about 8 percent a month and currently has 25 percent free space. Capacity reports forecast that, at this rate, it will fill in roughly three months, and marketing plans a promotion that will add volume. The infrastructure team schedules a storage expansion in next month's maintenance window and asks the application owner to archive orders older than seven years in line with the retention policy. The auditor reviewing this finds exactly what good practice looks like: a threshold, a trend, a forecast linked to business plans and a planned action.",
   "Auditors check whether availability and capacity requirements are defined, usually in SLAs; whether monitoring covers critical systems and components; whether thresholds generate alerts that someone reviews; whether trends and forecasts are produced and acted on; and whether incidents caused by capacity shortages are analyzed through problem management.",
   "Common mistakes: treating capacity management as buying hardware after a failure; monitoring that exists but whose alerts nobody reads; ignoring business plans when forecasting; assuming cloud auto-scaling removes the need for capacity planning or cost limits; and measuring availability in a way that hides outages, such as excluding every incident as planned.",
   "Exam questions usually test the proactive nature of capacity management and the meaning of the metrics. 'Best way to prevent performance problems as the business grows' points to capacity planning based on utilization trends and business forecasts. 'Metric showing how quickly service is restored' is MTTR; 'how long between failures' is MTBF. 'Single component failure stops the service' points to missing redundancy. If the stem says monitoring exists but outages still surprise staff, the answer is usually review of and response to alerts and trends."
  ],
  "terms": [
   [
    "Availability",
    "The proportion of agreed service time during which a system or service is able to perform its function."
   ],
   [
    "Capacity management",
    "Ensuring IT resources meet current and forecast demand at acceptable cost and performance."
   ],
   [
    "Mean time between failures (MTBF)",
    "The average operating time between failures of a component, a measure of reliability."
   ],
   [
    "Mean time to repair (MTTR)",
    "The average time taken to restore a component or service after a failure, a measure of maintainability."
   ],
   [
    "Resilience",
    "The ability of a service to keep operating, possibly at a reduced level, when some components fail."
   ],
   [
    "Capacity plan",
    "A document that forecasts resource demand and sets out thresholds and planned actions to meet it."
   ],
   [
    "Auto-scaling",
    "Automatically adding or removing cloud resources in response to demand, within defined limits."
   ]
  ],
  "example": "An online ticketing site crashes each year when popular events go on sale. The post-incident review shows that monitoring captured the load but no capacity forecast linked sales calendars to demand. The company adds the events calendar to its capacity plan, load-tests before major sales, configures auto-scaling with an upper cost limit and adds a queueing page so that peak demand slows gracefully instead of taking the site down.",
  "tip": "Capacity management is proactive: it uses utilization trends and business forecasts to act before resources run out. Answers that wait for a failure or only react to user complaints are wrong.",
  "check": [
   [
    "What is the difference between MTBF and MTTR?",
    "MTBF measures how long a component typically runs between failures (reliability); MTTR measures how long it takes to restore it after a failure (maintainability)."
   ],
   [
    "What inputs should a capacity forecast use besides current utilization?",
    "Historical trends and business plans such as growth, launches, seasonal peaks and new regulatory demands."
   ],
   [
    "Why does cloud auto-scaling still need oversight?",
    "Without limits and cost monitoring, a fault or attack could scale resources and spending without bound, and it does not replace planning."
   ],
   [
    "An auditor finds monitoring tools in place but repeated outages from full disks. What is the likely weakness?",
    "Thresholds and trend reports are not being reviewed and acted on, so capacity management is reactive rather than proactive."
   ]
  ]
 },
 {
  "t": "Problem and incident management",
  "body": [
   "When something goes wrong in IT operations, two related but different processes handle it. Incident management restores normal service as quickly as possible, even with a temporary workaround. Problem management finds and removes the underlying cause so the same incidents do not keep happening. The CISA exam regularly tests the difference, and a common finding is an organization that is very good at restarting things and very poor at stopping them from breaking again.",
   "An incident is any unplanned interruption or reduction in the quality of an IT service. The incident process has clear steps. Detection and logging come first: every incident gets a ticket, whether reported by a user, raised by monitoring or found by staff. Classification and prioritization follow, based on impact (how many users or how critical the service) and urgency (how quickly it must be fixed). Initial diagnosis happens at the service desk, often using a knowledge base. Functional escalation passes the incident to specialist teams, and hierarchical escalation informs management when a serious incident needs decisions or resources. Resolution often uses a workaround, and closure happens after confirming with the user that service is restored.",
   "Every incident should be recorded, even if fixed in two minutes, because complete records allow trends to be analyzed and problems to be spotted. Defined escalation rules and response targets, usually linked to service level agreements (SLAs), make sure serious incidents reach the right people quickly. A major incident procedure handles the most severe cases with a dedicated coordinator and regular communication.",
   "A problem is the unknown underlying cause of one or more incidents. Problem management analyzes incident trends, performs root cause analysis using techniques such as the five whys (repeatedly asking why until the real cause appears), fishbone or Ishikawa diagrams (grouping possible causes into categories), or fault tree analysis. Once the cause is understood but not yet fixed, the problem becomes a known error, recorded with its workaround in a known error database (KEDB) so the service desk can resolve future incidents faster. The permanent fix is raised as a change request and goes through change management. Problem management can be reactive, after incidents occur, or proactive, spotting weaknesses in trends, capacity data or vendor advisories before they cause incidents.",
   "Security incidents follow a specialized response process with evidence handling and legal considerations, but the general incident process should recognize when an incident might be security-related, such as unexplained account lockouts or unusual file changes, and hand it to the security team promptly. Service desk staff need guidance on those indicators. Incident records also feed other processes: availability reporting, capacity analysis and, when a vendor product is at fault, supplier management. Metrics such as first-contact resolution rate, average time to resolve by priority and the number of reopened tickets tell management whether the process is working, and the auditor can recalculate them from the ticket data rather than trusting a summary.",
   "Consider a worked example. A web portal crashes every Monday morning and the service desk restarts it each time, closing each ticket as resolved within the SLA. On paper incident management looks excellent. An auditor sampling tickets notices eleven identical incidents in three months and no problem record. Problem management is engaged, the five whys trace the crash to a weekend batch job that fills a log partition, and a change is raised to rotate and compress logs. The known error and its workaround are recorded until the change is deployed, after which the Monday crashes stop.",
   "Common mistakes: confusing incidents with problems; closing incidents without user confirmation; not logging incidents fixed quickly, which hides trends; treating the workaround as the permanent fix; letting problem records stay open indefinitely without owners or target dates; and deploying the fix outside change management because it seems urgent. Auditors check that incidents are logged completely, prioritized consistently, escalated according to rules and resolved within agreed times, and that recurring incidents lead to problem records, root cause analysis and approved changes.",
   "Exam questions usually give a symptom. 'Same incident keeps recurring' points to missing problem management or root cause analysis. 'Primary goal of incident management' is restoring service quickly and minimizing business impact, not finding root cause. 'Primary goal of problem management' is identifying and eliminating root causes. 'Ensure serious incidents reach management' points to escalation procedures. 'Service desk cannot identify trends' points to incomplete incident logging."
  ],
  "terms": [
   [
    "Incident",
    "An unplanned interruption or reduction in the quality of an IT service."
   ],
   [
    "Problem",
    "The unknown underlying cause of one or more incidents."
   ],
   [
    "Root cause analysis",
    "A structured investigation, using techniques such as the five whys, to find the fundamental cause of a problem."
   ],
   [
    "Known error",
    "A problem whose root cause is identified and documented, often with a workaround, but not yet permanently fixed."
   ],
   [
    "Known error database (KEDB)",
    "A repository of known errors and workarounds that helps the service desk resolve incidents faster."
   ],
   [
    "Workaround",
    "A temporary way to reduce or remove the impact of an incident without fixing its root cause."
   ],
   [
    "Escalation",
    "Passing an incident to more specialized teams (functional) or to management (hierarchical) when needed."
   ]
  ],
  "example": "A retailer's point-of-sale terminals in several stores freeze intermittently. The service desk logs each case and reboots the terminals as a workaround. Problem management correlates the tickets and finds all affected terminals received the same driver update. The vendor confirms a defect, the known error is recorded with the reboot workaround, and a change to roll back the driver is approved and deployed, ending the freezes.",
  "tip": "Incident management restores service fast, even with a workaround. Problem management finds and fixes the root cause through change management. Repeated identical incidents point to missing problem management.",
  "check": [
   [
    "What is the main objective of incident management?",
    "To restore normal service as quickly as possible and minimize business impact, even if the root cause is not yet known."
   ],
   [
    "What is a known error?",
    "A problem whose root cause has been identified and documented, usually with a workaround, but which has not yet been permanently fixed."
   ],
   [
    "Why should even quickly fixed incidents be logged?",
    "Complete records allow trend analysis, which reveals recurring issues that problem management should investigate."
   ],
   [
    "How should the permanent fix for a problem be implemented?",
    "Through a change request that passes through normal change management, including testing and approval."
   ]
  ]
 },
 {
  "t": "IT change, configuration, release and patch management",
  "body": [
   "Changes are one of the most common causes of outages and control failures. Change management ensures that changes to production systems are requested, assessed, approved, tested, implemented and reviewed in a controlled way. It is one of the IT general controls (ITGCs), the baseline controls over IT that support every application, and auditors test it more often than almost anything else, because an uncontrolled change can undo every other control.",
   "A typical change process records a request describing what will change and why, assesses impact and risk, obtains approval from the system owner or a change advisory board (CAB), tests the change in a non-production environment with user acceptance where relevant, schedules it into a maintenance window, implements it with a documented rollback (backout) plan, and reviews it afterward. Standard changes are low-risk, pre-approved and repeatable, such as adding a user to a known group. Emergency changes can bypass some steps to fix urgent issues, but must still be logged, use controlled emergency access and be reviewed and approved retrospectively as soon as possible.",
   "Segregation of duties is central. The person who develops a change should not be the one who approves it or moves it into production. In many organizations a separate operations or release team, or an automated pipeline with enforced approvals, performs the migration. Where a small team makes segregation impractical, compensating controls such as independent review of production change logs are needed. Access controls support this: developers should have read-only or no access to production, and any privileged production access they need for support should be temporary, approved and logged.",
   "Configuration management maintains accurate records of configuration items (CIs), meaning any component that needs to be managed, such as servers, software versions and network devices, and their relationships, usually in a configuration management database (CMDB). This lets teams judge the impact of a change and detect configuration drift, when a system's actual settings no longer match its approved baseline. Release management bundles approved changes into releases and deploys them in an orderly, tested way, with version control identifying exactly which code is in production.",
   "Patch management keeps systems updated against known vulnerabilities and defects. It tracks vendor releases and advisories, assesses urgency based on severity and exposure, tests patches, deploys them within defined timeframes based on risk (critical internet-facing systems first), and verifies installation, for example through vulnerability scans or reports such as `Get-HotFix` on Windows or the package manager's history on Linux. Systems that cannot be patched need documented exceptions and compensating controls. Patching is itself a change and follows the change process, often as a standard change. A mature process also keeps an up-to-date inventory so that no system is forgotten, and reports patch compliance, such as the percentage of critical patches installed within the target time, to management.",
   "Consider a worked example. An auditor extracts every production deployment for a quarter from the pipeline logs and version control, then traces a sample of 25 back to change tickets. Three deployments have no ticket at all, and one ticket was approved by the same developer who wrote and deployed the code. She also finds two emergency changes never reviewed afterward. She reports unauthorized changes, a segregation-of-duties weakness and a gap in emergency change review, and recommends that the pipeline block deployments without an approved ticket from someone other than the author.",
   "Common mistakes: sampling only from the list of approved tickets, which can never reveal changes that had no ticket; accepting approval dated after implementation; letting emergency changes stay unreviewed; treating a CMDB that is never reconciled with reality as accurate; and deploying patches straight to production without testing. Another trap is forgetting that configuration changes, not just code, need change control. Auditors also check that post-implementation review of changes actually happens, because a failed or partially successful change that nobody reviews is likely to be repeated.",
   "Exam questions usually test the direction of sampling and segregation. 'Best way to detect unauthorized changes' points to sampling from system logs or version control and tracing to approvals. 'Developer has access to migrate code to production' points to a segregation-of-duties weakness. 'Emergency change bypassed approval' is acceptable only if it is logged and reviewed afterward. 'System settings differ from baseline' is configuration drift. 'Patch deployment priority' follows risk: severity and exposure."
  ],
  "terms": [
   [
    "Change advisory board (CAB)",
    "A group that reviews and approves or rejects significant changes to production systems."
   ],
   [
    "Emergency change",
    "An urgent change that follows an expedited path but must still be logged and reviewed and approved afterward."
   ],
   [
    "Standard change",
    "A low-risk, pre-approved, repeatable change that follows a defined procedure."
   ],
   [
    "Configuration item (CI)",
    "Any component that is managed and recorded, such as a server, application version or network device."
   ],
   [
    "Configuration drift",
    "Divergence of a system's actual settings from its approved configuration baseline."
   ],
   [
    "Release management",
    "Planning, packaging and deploying approved changes to production in a controlled way."
   ],
   [
    "Patch management",
    "Identifying, testing, prioritizing, deploying and verifying vendor updates that fix vulnerabilities and defects."
   ]
  ],
  "example": "A payment processor's quarterly vulnerability scan shows that 15 percent of servers are missing a critical patch released six weeks earlier, against a policy of 14 days for critical patches. The auditor finds the patch was tested and approved, but deployment failed silently on servers in one data center and nobody verified installation. The team fixes the deployment tool, adds post-deployment scan verification and reports patch compliance monthly to the IT risk committee.",
  "tip": "To find unauthorized changes, sample from what actually changed in production (system logs, version control, deployment records) and trace back to approvals. Sampling only from approved tickets cannot reveal changes that never had one.",
  "check": [
   [
    "Why should the developer of a change not migrate it to production?",
    "It breaks segregation of duties, letting one person introduce unauthorized or unreviewed code without independent control."
   ],
   [
    "What makes an emergency change acceptable from a control perspective?",
    "It is logged, uses controlled access and is reviewed and formally approved as soon as possible after implementation."
   ],
   [
    "What is configuration drift and how is it detected?",
    "Divergence of actual settings from the approved baseline, detected by comparing systems with the baseline or CMDB using automated tools."
   ],
   [
    "How should an organization confirm that patches were actually installed?",
    "Verify with independent evidence such as vulnerability scans or system patch reports, not just deployment job status."
   ]
  ]
 },
 {
  "t": "Operational log management and IT service level management",
  "body": [
   "Logs are the memory of IT operations. They record what systems did, who did it and when, which supports troubleshooting, performance analysis, security monitoring, investigations and audit. Logs only help if the right events are captured, kept long enough, protected from alteration and actually reviewed. IT service level management, the second half of this topic, is about agreeing what level of service IT will provide and proving whether it was delivered, and that proof usually comes from logs and monitoring data. The two topics meet in one question the auditor keeps asking: can the evidence be trusted?",
   "Log management starts with deciding what to log based on risk and requirements. Typical events include successful and failed logins, use of privileged accounts, changes to configurations, security settings and user rights, access to sensitive data, system start-up and shutdown, and application errors. Each entry should say who, what, when, where and whether it succeeded. Clocks on every system must be synchronized, usually with the network time protocol (NTP), so that events from different systems can be put in the right order during an investigation.",
   "Logs should then be forwarded to a central store that the administrators of the source systems cannot alter or delete, for example a log server or security information and event management (SIEM) platform. On Linux, a line in the rsyslog configuration such as `*.* @@logserver.example.internal:514` forwards all messages to a central collector over TCP; on Windows, event forwarding does the same job. Logs are retained for the period required by policy, contracts or regulation, and access to them is restricted, because logs may contain personal data or clues useful to an attacker. A common weakness is local logs that overwrite themselves after a few days, so evidence disappears before anyone looks.",
   "Review is where many organizations fall short. Nobody can read millions of lines by hand, so review relies on automated alerts for high-risk events plus periodic human review of specific reports, such as privileged activity or failed access to critical systems. Evidence of review, such as sign-offs or ticket references, lets an auditor confirm that it happened. The activity of the people who review logs, and of administrators, must also be logged and seen by someone independent.",
   "IT service level management defines, agrees, monitors and reports the level of service IT provides. A service catalog describes the services available. Service level agreements (SLAs) set measurable targets with customers, such as availability, response time, incident resolution time and support hours. Operational level agreements (OLAs) are internal agreements between IT teams that support an SLA, for example the network team promising to respond to the service desk within 30 minutes. Underpinning contracts bind external suppliers to commitments that match the SLA. Targets should be realistic, measurable, linked to business needs and supported by reliable measurement. The process includes regular reporting of actual performance against targets, review meetings with customers, and service improvement plans when targets are missed.",
   "Consider a worked example. An SLA promises 99.9 percent monthly availability for online banking, and the provider's monthly reports show every month met. The auditor obtains independent monitoring data from the bank's own external probes and compares it with the reports. Two outages of several hours appear in the monitoring but not in the reports, because the provider had classified them as planned maintenance without customer agreement. Reported performance cannot be relied on, so the auditor recommends that SLA reports be based on independent monitoring and that the SLA define exactly what counts as planned downtime.",
   "Common mistakes: logging everything but reviewing nothing; storing logs only on the system that produced them, where an intruder or administrator can erase them; forgetting time synchronization; keeping logs for less time than regulations require; writing SLAs with vague targets such as 'reasonable response'; accepting supplier self-reported metrics without verification; and signing SLAs that promise more than the supplier contracts behind them support.",
   "Exam questions look for trustworthy evidence. 'Best evidence that SLA targets were met' points to reliable, independent measurement compared with targets, not the provider's own summary. 'Internal agreement between IT teams' is an OLA. 'Correlating events across systems' requires time synchronization. 'Administrator can delete logs' points to forwarding logs to a protected central store with restricted access. 'Logs overwritten before review' points to retention settings and central collection."
  ],
  "terms": [
   [
    "Log retention",
    "The period for which logs must be kept, set by policy, contract or regulation."
   ],
   [
    "Time synchronization",
    "Keeping system clocks aligned, usually with NTP, so events from different systems can be correlated."
   ],
   [
    "Centralized logging",
    "Forwarding logs to a separate, protected store so they cannot be altered by the source system's administrators."
   ],
   [
    "Service level agreement (SLA)",
    "An agreement between an IT service provider and its customer that sets measurable service targets."
   ],
   [
    "Operational level agreement (OLA)",
    "An internal agreement between IT teams that supports delivery of an SLA."
   ],
   [
    "Underpinning contract",
    "A contract with an external supplier that supports the service targets in an SLA."
   ],
   [
    "Service catalog",
    "A list of the IT services offered, with their descriptions, owners and service levels."
   ]
  ],
  "example": "During an investigation into a suspected data leak, the security team finds that the file server's local security log only held four days of events and had already overwritten the relevant week. The company configures all servers to forward logs to a central SIEM retained for twelve months, restricts deletion rights to the security team, synchronizes clocks with NTP and adds a monthly review of privileged activity with documented sign-off.",
  "tip": "The best evidence of SLA performance is reliable, independent measurement compared with agreed targets. For logs, the key concerns are completeness, protection from alteration, adequate retention and evidence of actual review.",
  "check": [
   [
    "Why should logs be sent to a central store rather than kept only on the source system?",
    "So that administrators or intruders on the source system cannot alter or delete them, and so events can be correlated and retained."
   ],
   [
    "What is the difference between an SLA and an OLA?",
    "An SLA is with the customer and sets service targets; an OLA is an internal agreement between IT teams that supports meeting the SLA."
   ],
   [
    "Why is time synchronization important for logs?",
    "Without aligned clocks, events from different systems cannot be put in the correct order during investigation or correlation."
   ],
   [
    "What should an auditor use to verify reported SLA performance?",
    "Independent, reliable monitoring data compared with the reports and the SLA definitions, rather than relying on the provider's self-reporting."
   ]
  ]
 },
 {
  "t": "Database management: DBMS controls, integrity, normalization and DBA duties",
  "body": [
   "Databases hold the organization's most valuable data, so they deserve focused audit attention. A database management system (DBMS) is the software that stores data and controls access to it, enforces integrity rules, manages many users working at the same time, and supports backup and recovery. Application controls such as approval workflows can be excellent, but if someone can change the data directly in the database, those controls are bypassed. That is why the database layer and the people who administer it are a frequent audit focus.",
   "Relational databases organize data into tables of rows and columns linked by keys. A primary key uniquely identifies each row, such as a customer number. A foreign key in one table points to a primary key in another, such as a customer number stored on each order. Entity integrity requires every row to have a unique, non-null primary key. Referential integrity requires every foreign key to point to a record that exists, so there are no orders for a customer who does not exist and a customer with open orders cannot simply be deleted. These rules are defined in the schema, for example `FOREIGN KEY (customer_id) REFERENCES customers(id)`, and the DBMS enforces them automatically, which is stronger than relying on every program to check.",
   "Normalization organizes tables so each fact is stored once, reducing redundancy and the update anomalies that occur when the same fact is changed in one place but not another. Denormalization deliberately adds some redundancy, usually for reporting performance, and must be controlled so copies stay consistent. Transactions follow the ACID properties: atomicity (all steps complete or none do), consistency (rules are never broken), isolation (concurrent transactions do not interfere) and durability (committed changes survive failures). A funds transfer that debits one account must credit the other, or neither happens. Concurrency controls such as locking stop two users overwriting each other's changes.",
   "The database administrator (DBA) has powerful access: defining structures, tuning performance, managing backups and recovery, and often granting access. Because DBA privileges can bypass application controls and even alter audit tables, compensating controls are essential. Limit the number of DBAs; give each a named account rather than a shared administrator login; log DBA activity to a store the DBAs cannot modify; have someone independent review those logs; put schema changes through change management; and separate DBA duties from application development and from security administration where possible. Direct changes to production data outside the application, often called data fixes, should be rare, approved by the data owner, logged and reviewed.",
   "Other database controls include granting users access through roles and views that show only the data they need, removing default accounts and changing default passwords, encrypting sensitive fields or whole databases with keys managed separately, database activity monitoring (DAM) tools that watch and alert on unusual queries, and tested backups that include transaction logs so the database can be recovered to a specific point in time. Data dictionaries document what each field means and who owns it.",
   "Consider a worked example. An auditor reviewing a financial database finds three DBAs sharing one administrator account, database logs stored where the DBAs can delete them, and a monthly habit of fixing errors with direct updates such as `UPDATE invoices SET status='PAID' WHERE ...` without tickets. Nobody can tell who ran which command. She recommends named accounts for each DBA, forwarding database audit logs to the security team's system, requiring data owner approval and a ticket for every data fix, and a monthly independent review of direct data changes.",
   "Common mistakes: relying on application controls while ignoring direct database access; confusing entity integrity (unique primary keys) with referential integrity (valid foreign keys); assuming normalization is a security control rather than a data quality design technique; letting DBAs review their own activity logs; and testing backups without testing point-in-time restores.",
   "Exam questions usually describe a risk and ask for the best control. 'DBAs can change data without detection' points to logging DBA activity to a protected location with independent review. 'Orders exist for nonexistent customers' points to missing referential integrity. 'Same data updated in one table but not another' points to redundancy and normalization. 'Transaction partially applied after a crash' points to atomicity and transaction logs. 'Users see more data than needed' points to views and role-based access."
  ],
  "terms": [
   [
    "Database management system (DBMS)",
    "Software that stores and manages data, controlling access, integrity, concurrency and recovery."
   ],
   [
    "Referential integrity",
    "A rule that every foreign key value must match an existing primary key in the related table."
   ],
   [
    "Entity integrity",
    "A rule that every row has a unique, non-null primary key."
   ],
   [
    "Normalization",
    "Organizing tables so each fact is stored once, reducing redundancy and update anomalies."
   ],
   [
    "ACID",
    "Atomicity, consistency, isolation and durability: the properties that make database transactions reliable."
   ],
   [
    "Database activity monitoring (DAM)",
    "Tools that record and analyze database activity, alerting on unusual or unauthorized actions."
   ],
   [
    "Data fix",
    "A direct change to production data outside the normal application, which should be approved, logged and reviewed."
   ]
  ],
  "example": "A payroll system's application requires two approvals for salary changes, but an internal investigation finds one employee's salary was raised with no approval record. Database audit logs, forwarded to the security team, show a direct update made by a DBA account late at night. Because the logs were protected and reviewed, the change was detected within a week. The company tightens DBA access, adds just-in-time elevation for production and alerts on direct changes to salary tables.",
  "tip": "DBAs can bypass application controls. The best answers involve named accounts, logging DBA activity to a location they cannot modify, and independent review of those logs, plus approval and logging of any direct data fixes.",
  "check": [
   [
    "What does referential integrity prevent?",
    "Foreign keys that point to records that do not exist, such as orders linked to a customer who is not in the customer table."
   ],
   [
    "Why is DBA access a significant audit concern?",
    "DBAs can change data and structures directly, bypassing application controls and potentially altering audit trails."
   ],
   [
    "What is the purpose of normalization?",
    "To store each fact once, reducing redundancy and preventing update anomalies where copies of data become inconsistent."
   ],
   [
    "What does atomicity guarantee in a transaction?",
    "That all steps of the transaction complete or none do, so the database is never left with a partial update."
   ]
  ]
 },
 {
  "t": "Business impact analysis: criticality, RTO, RPO and MTD",
  "body": [
   "Business resilience starts by understanding what the organization cannot do without. The business impact analysis (BIA) identifies critical business processes, the resources they depend on, and the impact of losing them over time. Every later decision about continuity and recovery, from backup frequency to the type of recovery site, depends on its results. Without a BIA, recovery plans are guesses, and money is often spent protecting the wrong systems.",
   "A BIA typically gathers information through interviews, questionnaires and workshops with process owners, supported by financial data. For each process it identifies dependencies such as applications, data, people, facilities, equipment and suppliers, including upstream and downstream processes. It estimates the impact of an outage over time, in financial, operational, legal, regulatory, contractual and reputational terms, often showing how impact grows after an hour, a day and a week. It then ranks processes by criticality. Senior management should review and approve the results, because they reflect business priorities rather than IT preferences, and disagreements between departments about what is critical need a management decision.",
   "The BIA sets the key recovery measures. The maximum tolerable downtime (MTD), also called the maximum tolerable period of disruption, is the longest a process can be unavailable before the damage becomes unacceptable or threatens the organization's survival. The recovery time objective (RTO) is the target time within which a system or process must be restored after a disruption, and it must be shorter than the MTD to leave room for detection, decision-making and verification. The recovery point objective (RPO) is the maximum acceptable data loss, measured as time back from the incident; an RPO of 15 minutes means the business accepts losing up to 15 minutes of transactions. The service delivery objective (SDO) is the reduced level of service acceptable during recovery, and the maximum tolerable outage for alternate processing may also be defined.",
   "These measures drive cost. RPO drives how often data must be backed up or replicated: a 24-hour RPO may be met by nightly backups, while a near-zero RPO needs synchronous replication. RTO drives the recovery strategy and site: a few hours usually needs a hot site or cloud failover, while several days may allow a warm or cold site. Low RTOs and RPOs are expensive; higher ones allow cheaper options. The BIA helps balance the cost of recovery capability against the impact of disruption, and where the two curves meet is the sensible investment point. The BIA should be updated when the business, its processes or its systems change significantly, and reviewed at least periodically.",
   "Criticality classification often uses tiers. Critical processes cannot be performed manually and must be restored within a very short time. Vital processes can be performed manually for a brief period. Sensitive processes can be done manually at tolerable cost for longer. Nonsensitive processes can be interrupted for extended periods at little or no cost. This four-tier scale of critical, vital, sensitive and nonsensitive is the one CISA study material uses. The classification links each process to its RTO and RPO and to the IT systems that must be recovered first.",
   "Consider a worked example. An online retailer's BIA finds that order processing starts losing significant revenue after two hours, and that after eight hours customers move to competitors and contractual penalties with marketplaces begin, so management sets the MTD at eight hours. Losing more than 15 minutes of orders would mean lost sales and unhappy customers who paid but have no order record. The retailer sets an RTO of four hours and an RPO of 15 minutes. Nightly backups alone cannot meet that RPO, so it adds database replication to a second region and keeps nightly backups for longer-term recovery.",
   "Common mistakes: letting IT set RTOs and RPOs without business input; confusing RTO (time) with RPO (data); setting an RTO longer than the MTD; choosing a recovery site before completing the BIA; ignoring dependencies such as a supplier or a shared authentication service; and never updating the BIA after reorganizations or new systems.",
   "Exam questions test sequence and meaning. 'First step in developing a business continuity plan' is the BIA, often after or alongside a risk assessment. 'Maximum acceptable data loss' is RPO, and it drives backup or replication frequency. 'Target time to restore' is RTO, and it drives recovery site choice. 'Who should approve criticality and recovery objectives' is senior business management. If a stem shows an RTO longer than the MTD, the plan is inadequate."
  ],
  "terms": [
   [
    "Business impact analysis (BIA)",
    "An analysis that identifies critical processes, their dependencies and the impact of disruption over time."
   ],
   [
    "Maximum tolerable downtime (MTD)",
    "The longest a process can be unavailable before the impact becomes unacceptable to the organization."
   ],
   [
    "Recovery time objective (RTO)",
    "The target time within which a system or process must be restored after a disruption."
   ],
   [
    "Recovery point objective (RPO)",
    "The maximum acceptable amount of data loss, measured as time before the disruption."
   ],
   [
    "Service delivery objective (SDO)",
    "The level of service that must be achieved during the recovery period."
   ],
   [
    "Criticality",
    "The relative importance of a process or system, based on the impact of its loss."
   ],
   [
    "Dependency",
    "A resource, such as a system, supplier or facility, that a process needs in order to operate."
   ]
  ],
  "example": "A hospital's BIA shows that the electronic medication record can be replaced by paper charts for about six hours before patient safety risk rises sharply, and that losing more than five minutes of medication entries is unacceptable. Management approves an MTD of six hours, an RTO of three hours and an RPO of five minutes, which leads the IT team to replicate the database continuously to a second data center and rehearse the paper-chart fallback twice a year.",
  "tip": "RPO is about data loss and drives backup or replication frequency; RTO is about time to restore and drives the recovery site choice. The RTO must be shorter than the MTD, and the BIA comes before choosing strategies or sites.",
  "check": [
   [
    "What does the RPO determine in practice?",
    "How often data must be backed up or replicated, because it sets the maximum acceptable data loss."
   ],
   [
    "Why must the RTO be shorter than the MTD?",
    "The MTD is the absolute limit of tolerable downtime; the RTO needs a margin for detection, decisions and verification before that limit is reached."
   ],
   [
    "Who should approve the results of a BIA?",
    "Senior business management, because criticality and recovery objectives reflect business priorities and risk appetite."
   ],
   [
    "Why do low RTOs and RPOs increase cost?",
    "They require faster recovery capability and more frequent data protection, such as hot sites, redundancy and continuous replication."
   ]
  ]
 },
 {
  "t": "System resiliency and data backup, storage and restoration",
  "body": [
   "Resilience means keeping services running, or restoring them quickly, when components fail or disasters strike. It combines two ideas. The first is design that avoids single points of failure, so that one broken disk, power supply or server does not stop the service. The second is backup, so that when data is lost, corrupted or encrypted by ransomware, it can be recovered to an acceptable point. Redundancy handles hardware failure well, but it faithfully copies mistakes and malicious changes too, which is why backups are still needed even in highly redundant systems.",
   "Resilient designs use redundancy at several levels. Redundant array of independent disks (RAID) protects against disk failure: RAID 0 only stripes data across disks for speed and has no redundancy, so one failure loses everything; RAID 1 mirrors data onto a second disk; RAID 5 uses distributed parity and survives one disk failure; RAID 6 uses double parity and survives two; RAID 10 combines mirroring and striping for performance and resilience. Beyond disks, organizations use redundant power supplies and network paths, clustered servers that fail over to each other, load balancers that spread traffic and remove failed nodes, and replication of data to another site or cloud region. Uninterruptible power supplies (UPS) bridge short power losses and generators handle long ones.",
   "Two terms are often confused. Fault tolerance keeps a service running through a failure with no interruption, usually through fully duplicated components. High availability minimizes downtime through quick failover, but a brief interruption may occur. Replication can be synchronous, where a write is confirmed only after both sites have it (near-zero data loss, but distance and latency are limited), or asynchronous, where the second site lags slightly behind (some data loss possible, but it works over long distances).",
   "Backups protect against data loss from failure, human error, corruption and ransomware. A full backup copies everything selected. An incremental backup copies only changes since the last backup of any type, so backups are fast and small, but a restore needs the last full backup plus every incremental since. A differential backup copies all changes since the last full backup, so each differential grows over the week, but a restore needs only the full backup and the latest differential. Backup frequency follows the recovery point objective (RPO). A common guideline is the 3-2-1 approach: three copies of data, on two different types of media, with one copy offsite. At least one copy should be offline or immutable, meaning it cannot be changed or deleted for a set period, so ransomware or a malicious administrator cannot destroy it. Backups also need encryption, access control, documented retention and a catalog so the right copy can be found. Storage and media rotation matter too. Offsite copies must be far enough away not to share the same disaster, and the transport and storage provider must be trusted and secure. Rotation schemes such as grandfather-father-son keep daily, weekly and monthly copies to balance storage cost against the ability to go back in time.",
   "Restoration is what really matters. Organizations should regularly test restores of individual files, whole systems and complete applications, including dependencies such as databases and directories, to prove backups are complete and usable within the recovery time objective (RTO).",
   "Consider a worked example. A law firm backs up nightly to a disk in the same server room, and the backup software reports success every day. Ransomware encrypts both file servers and the attached backup disk, and recovery takes weeks from an old tape. The new design keeps daily backups in a separate cloud account with immutability enabled, a monthly offline copy, and a documented restore test each month that times how long a full file server restore takes.",
   "Common mistakes: treating a successful backup job log as proof that data can be restored; keeping all backups online with the same credentials as production; storing backups in the same building as the servers; relying on RAID or replication as a backup; confusing incremental with differential; and never testing restoration of a complete application. The auditor reviews backup schedules against RPOs, job logs and failure handling, offsite and immutable storage, access to backup systems, and evidence of successful restore tests.",
   "Exam questions often hinge on a few distinctions. 'Best evidence that backups are effective' is a successful restore test. 'Fastest restore' points to full or differential; 'fastest backup and least storage' points to incremental. 'Protect backups from ransomware' points to offline or immutable copies with separate credentials. 'RAID level with no redundancy' is RAID 0. 'Backup frequency determined by' is the RPO."
  ],
  "terms": [
   [
    "Single point of failure",
    "A component whose failure alone stops the whole service."
   ],
   [
    "Redundant array of independent disks (RAID)",
    "A method of combining disks for performance, redundancy or both, with levels such as 1, 5, 6 and 10."
   ],
   [
    "Incremental backup",
    "A backup of changes since the last backup of any type; fast to create but slower to restore."
   ],
   [
    "Differential backup",
    "A backup of all changes since the last full backup; a restore needs only the full backup and the latest differential."
   ],
   [
    "Immutable backup",
    "A backup copy that cannot be modified or deleted for a defined period, protecting it from ransomware."
   ],
   [
    "Fault tolerance",
    "The ability of a system to continue operating without interruption when a component fails."
   ],
   [
    "Synchronous replication",
    "Replication in which writes are confirmed only after both sites store them, giving near-zero data loss."
   ]
  ],
  "example": "A manufacturer's backups show green status every night for a year. An auditor asks for evidence of a full restore test and learns none has ever been done. A test restore of the production planning system fails because the database backups were taken while the database was running, without the agent needed for a consistent copy. The company fixes the backup method, schedules quarterly full application restores and reports the results to the IT steering committee.",
  "tip": "A successful backup job does not prove recoverability. Periodic restore tests are the best evidence that backups work, and at least one copy should be offsite and offline or immutable to survive ransomware.",
  "check": [
   [
    "What is needed to restore from differential backups?",
    "The last full backup and the most recent differential backup."
   ],
   [
    "Why is RAID not a substitute for backups?",
    "RAID protects against disk failure but copies deletions, corruption and ransomware encryption instantly, so it cannot restore earlier data."
   ],
   [
    "What is the best evidence that an organization can recover its data?",
    "Documented, successful restore tests of files, systems and applications within the required recovery time."
   ],
   [
    "How can backups be protected against ransomware?",
    "Keep at least one copy offline or immutable, stored separately with different credentials, so an attacker in production cannot encrypt or delete it."
   ]
  ]
 },
 {
  "t": "Business continuity and disaster recovery plans: recovery sites, testing and maintenance",
  "body": [
   "A business continuity plan (BCP) describes how the organization keeps critical business processes going during and after a disruption, whether that is a fire, a pandemic, a supplier failure or a cyberattack. A disaster recovery plan (DRP) is the IT part of that effort: how systems, data, networks and infrastructure are restored. Both depend on the business impact analysis (BIA), which sets priorities and recovery objectives, and on senior management support, because continuity costs money and requires decisions only management can make.",
   "Building the plans follows a sequence. After the BIA, the organization chooses recovery strategies that meet the recovery time objective (RTO) and recovery point objective (RPO) at acceptable cost, then writes the plans. A good plan defines scope and assumptions; roles and responsibilities; activation criteria and who has authority to declare a disaster; communication plans for staff, customers, regulators and media; up-to-date contact lists; recovery procedures in priority order; manual workarounds; and arrangements with suppliers. Teams usually include incident or crisis management, damage assessment, emergency operations, recovery and business resumption roles. Copies of the plan must be available when primary systems and buildings are not, for example printed copies or a copy in a separate cloud service.",
   "Recovery site options balance cost against speed. A hot site is fully equipped with hardware, connectivity and current data and can take over within hours. A warm site has some equipment and connectivity but needs systems configured and data restored, typically taking days. A cold site offers only space, power and cooling, so equipment must be delivered and installed, taking weeks. A mirrored site runs in parallel with the primary and can take over with near-zero downtime, at the highest cost. Mobile sites are trailers that can be delivered and equipped. Cloud-based disaster recovery can provide hot or warm capacity on demand. Reciprocal agreements with other organizations to share facilities are cheap but hard to enforce and test, and the partner may be hit by the same disaster. For any external site, the contract should cover availability during regional disasters, the number of subscribers sharing it, testing rights and security.",
   "Testing proves the plan works and trains people. In increasing order of realism and disruption, tests include checklist reviews, in which plan owners check the plan is complete and current; tabletop or structured walk-through exercises, in which the team talks through a scenario; simulations, which act out a scenario without moving production; parallel tests, which bring up recovery systems at the alternate site and process real data without stopping production; and full interruption tests, which actually shut down primary operations. Full interruption tests carry real business risk and should only be done when earlier tests have succeeded and management has approved. Tests should have defined objectives, be observed, and be followed by a documented report, a gap list and a retest.",
   "Maintenance keeps the plan useful. Plans must be updated after organizational changes, new systems, new suppliers, staff changes and lessons from tests or real incidents, and reviewed at least annually. Training makes sure people know their roles without reading the plan for the first time during a crisis. An untested or outdated plan is one of the most common audit findings.",
   "Consider a worked example. An insurer's DR test restores its policy administration system at a warm site. The test takes 30 hours against a 12-hour RTO, mainly because firewall and routing changes made in production over the past year were never added to the recovery runbook. The team documents the gaps, adds pre-staged network configuration at the site, links network changes to plan updates through change management, and passes a retest in 10 hours. The auditor checks that the test report, action list and retest evidence all exist.",
   "Common mistakes: writing the plan before the BIA; keeping the only copy of the plan on the file server that the plan is meant to recover; testing only with checklists; declaring a test a success without measuring against the RTO; not updating the plan after system changes; and relying on a reciprocal agreement that has never been tested. The auditor also checks that the DRP covers cyberattack scenarios, including restoring from clean backups.",
   "Exam questions usually test order and fit. 'First step' is the BIA. 'RTO of a few hours at lowest cost' points to a hot site or cloud failover; 'RTO of weeks' allows a cold site. 'Test that verifies recovery without disrupting production' is a parallel test. 'Least disruptive test' is a checklist review or tabletop exercise. 'After a failed test' means update the plan and retest. 'Plan not reviewed since a major system change' is a key finding."
  ],
  "terms": [
   [
    "Business continuity plan (BCP)",
    "A plan for keeping critical business processes running during and after a disruption."
   ],
   [
    "Disaster recovery plan (DRP)",
    "The part of continuity planning that restores IT systems, data and infrastructure."
   ],
   [
    "Hot site",
    "A fully equipped alternate site with current data that can take over within hours."
   ],
   [
    "Warm site",
    "An alternate site with some equipment and connectivity that needs configuration and data restoration before use."
   ],
   [
    "Cold site",
    "An alternate site providing only space, power and environmental controls, with equipment to be installed."
   ],
   [
    "Tabletop exercise",
    "A discussion-based test in which the team walks through a scenario to check roles and procedures."
   ],
   [
    "Parallel test",
    "A test that brings up recovery systems and processes data at the alternate site without stopping production."
   ],
   [
    "Full interruption test",
    "A test that actually shuts down primary operations and runs from the recovery site."
   ]
  ],
  "example": "A regional bank relied on a reciprocal agreement with a nearby bank to share computer room space. During a BCP review, the auditor notes that both banks sit on the same flood plain, the agreement has never been tested and neither bank has spare capacity. The bank replaces it with a contracted warm site in another region and cloud-based recovery for its online banking, then runs a parallel test to confirm it meets its RTOs.",
  "tip": "The BIA comes first, then strategy, plan, testing and maintenance. After a failed test, update the plan and retest; after major changes, update the plan. A parallel test proves recovery without stopping production.",
  "check": [
   [
    "What is the difference between a BCP and a DRP?",
    "A BCP covers keeping business processes running; a DRP is the IT component focused on restoring systems, data and infrastructure."
   ],
   [
    "Which recovery site suits an RTO of a few hours?",
    "A hot site or equivalent cloud failover, because it is already equipped with current data and can take over quickly."
   ],
   [
    "Why are reciprocal agreements considered weak?",
    "They are hard to enforce and test, the partner may lack capacity, and both parties may be affected by the same disaster."
   ],
   [
    "What should happen after a DR test fails to meet the RTO?",
    "Document the gaps, update the plan and procedures, fix the causes and retest to confirm the RTO can be met."
   ]
  ]
 },
 {
  "t": "Information asset security policies, frameworks, standards and guidelines",
  "body": [
   "Protecting information assets starts with clear direction. An information security program sets out what must be protected, how much protection it needs and who is responsible. It also gives auditors something to test against: without an approved policy or standard, an auditor can only offer opinions, but with one, she can measure the organization against what it agreed to do. This topic is about the hierarchy of documents, the frameworks that shape them, and the roles that make them work.",
   "The documents form a hierarchy. The information security policy sits at the top. It is short, approved by senior management or the board, and states objectives, scope, roles and management's commitment to protect information. Supporting policies cover specific areas such as acceptable use, access control, data classification, encryption, remote work, third parties and incident response. Standards set mandatory specifics that implement the policies, such as minimum password length, required encryption algorithms or approved operating systems. Security baselines, also called hardening standards, define minimum secure configurations for each platform, often based on recognized benchmarks such as those from the Center for Internet Security (CIS). Procedures describe step by step how to perform a task, such as onboarding a user. Guidelines offer recommended, non-mandatory practice. The key distinction: policies, standards and procedures are mandatory, while guidelines are advisory.",
   "Documents must be kept alive. Each should have an owner, a review date and a version history, and should be reviewed regularly and after major changes. Policies must be communicated so staff know them, often with acknowledgment during onboarding and annual training. Where a system or team cannot comply, a formal exception should be requested, risk-assessed, approved by an appropriate owner, given compensating controls and an expiry date, and tracked in a register. Exceptions without expiry dates quietly become permanent holes.",
   "Frameworks give structure and a common language. ISO/IEC 27001 specifies requirements for an information security management system (ISMS), a management process for identifying risks, selecting controls and improving continuously, and an organization can be certified against it. ISO/IEC 27002 gives guidance on implementing controls. The National Institute of Standards and Technology (NIST) Cybersecurity Framework organizes outcomes into six functions: govern, identify, protect, detect, respond and recover. The CIS Critical Security Controls give a prioritized list of technical safeguards. COBIT (Control Objectives for Information and Related Technologies), ISACA's governance framework, connects security to overall IT governance and management objectives. Many organizations map their controls to several frameworks at once so one control satisfies multiple requirements.",
   "Roles matter as much as documents. Senior management and the board are accountable and set risk appetite. The chief information security officer (CISO) or information security manager runs the program. Data owners, usually business managers, decide classification and who should have access. Data custodians, often IT, implement and operate the controls. Users follow policy, and internal audit provides independent assurance. A frequent exam point is that owners decide and custodians implement.",
   "Consider a worked example. An auditor uses a configuration scanning tool to compare 30 production servers with the company's Linux hardening standard. The standard prohibits remote root login, so she checks for the line `PermitRootLogin no` in each server's SSH configuration. Six servers allow remote root login and have extra services running, and no approved exceptions exist. She reports the deviation, asks for remediation or formal exceptions with compensating controls, and recommends continuous configuration monitoring so drift is caught without waiting for an audit.",
   "Common mistakes: treating guidelines as mandatory or standards as optional; writing policies full of technical detail that belongs in standards; approving policy at too low a level of management; having policies nobody has read; allowing exceptions with no owner or end date; and assuming certification to a framework guarantees that every control works. A quieter trap is keeping several conflicting versions of a policy on different intranet pages, so staff cannot tell which one applies.",
   "Exam questions test the hierarchy and roles. 'Mandatory, specific requirement such as minimum key length' is a standard. 'Step-by-step instructions' is a procedure. 'Recommended but optional' is a guideline. 'Who approves the security policy' is senior management or the board. 'Who determines classification and access' is the data owner. 'Best way to verify policy compliance on servers' is comparing actual configurations with the baseline."
  ],
  "terms": [
   [
    "Information security policy",
    "A high-level, management-approved statement of security objectives, scope, roles and commitment."
   ],
   [
    "Standard",
    "A mandatory, specific requirement that implements a policy, such as minimum encryption strength."
   ],
   [
    "Guideline",
    "Recommended, non-mandatory advice on good practice."
   ],
   [
    "Security baseline",
    "The minimum secure configuration required for a type of system, used to harden and assess it."
   ],
   [
    "Information security management system (ISMS)",
    "A management process, defined in ISO/IEC 27001, for managing information security risks and improving controls."
   ],
   [
    "Policy exception",
    "A formally approved, time-limited deviation from a policy or standard, with assessed risk and compensating controls."
   ],
   [
    "Data owner",
    "The business manager accountable for a data set, who decides its classification and who may access it."
   ]
  ],
  "example": "A company's encryption standard requires full-disk encryption on all laptops. The sales director asks for an exception for demo laptops because encryption slowed a demo. The security team assesses the risk, approves a 60-day exception limited to five devices that hold no customer data, records it with an owner and expiry date, and works with the vendor on a fix. When the expiry arrives, encryption is enabled and the exception is closed.",
  "tip": "Policies, standards and procedures are mandatory; guidelines are advisory. Owners decide protection needs and custodians implement them. Exceptions must be formal, approved, risk-assessed and time-limited.",
  "check": [
   [
    "What is the difference between a policy and a standard?",
    "A policy states high-level objectives and direction; a standard sets mandatory, specific requirements that implement the policy."
   ],
   [
    "Who should approve the information security policy?",
    "Senior management or the board, because it expresses the organization's commitment and risk appetite."
   ],
   [
    "What makes a policy exception well controlled?",
    "It is formally requested, risk-assessed, approved by an appropriate owner, has compensating controls and an expiry date, and is tracked."
   ],
   [
    "How can an auditor test compliance with a hardening baseline?",
    "Compare actual system settings with the baseline, ideally with automated configuration scanning, and check deviations against approved exceptions."
   ]
  ]
 },
 {
  "t": "Physical and environmental controls",
  "body": [
   "Logical controls are useless if someone can walk out with a server, plug a device into a network port in an empty office, or if a flood destroys the data center. Physical and environmental controls protect facilities, equipment, media and the people who work there. They matter for confidentiality and integrity, because physical access often means full access, and above all for availability, because power, heat, water and fire cause many outages. Even when services run in the cloud, the organization still has offices, network closets, laptops and paper records to protect, and it relies on its providers' physical controls, which it assures through contracts and independent reports.",
   "Physical access controls work in layers, an approach often called defense in depth. The site perimeter uses fences, gates, lighting and landscaping that removes hiding places. Building entrances have guards or receptionists and badge readers. Internal secure areas, such as data centers, network closets and cash rooms, have stronger controls again. Access methods include badges or smart cards, personal identification numbers (PINs), biometrics such as fingerprint or palm readers, and traditional or electronic locks, often combined for multifactor physical access. Access should be granted by need, approved by the area owner, and reviewed regularly so that leavers and people who changed roles lose it.",
   "Several specific controls appear on the exam. A mantrap, now often called an access control vestibule, is a small space with two interlocking doors that lets one person through at a time and stops tailgating (following an authorized person through a door) and piggybacking (entering with their consent). Visitors should be identified, registered, badged, escorted and signed out. Closed-circuit television (CCTV) and intrusion alarms detect and record events, and access logs support investigations, but only if someone monitors or reviews them. Data centers should have minimal external signage revealing their purpose. Equipment and media leaving the site should need authorization, and unattended workstations should lock automatically.",
   "Environmental controls protect equipment from power problems, temperature, humidity, water and fire. Power protection includes uninterruptible power supplies (UPS), which bridge short outages and condition power to smooth spikes and sags, and generators with fuel supply contracts for longer outages. Both need regular load testing. Heating, ventilation and air conditioning (HVAC) keeps temperature and humidity within the equipment's range; too humid risks condensation and corrosion, too dry increases static discharge. Water detection sensors under raised floors and near pipes warn of leaks. Equipment should be located away from hazards such as floors below water tanks or basements prone to flooding.",
   "Fire protection combines detection, such as smoke and heat detectors, often with very early smoke detection in data centers, with suppression. Wet-pipe sprinklers hold water in the pipes and discharge as soon as a head's heat link breaks; they are simple and reliable but risk water damage from leaks. Dry-pipe systems keep pressurized air in the pipes and admit water only when a head opens, useful where pipes might freeze. Pre-action systems need two events, typically detection of smoke followed by a head opening, before water flows, which reduces accidental discharge and is common in staffed data centers. Gas-based clean agent systems suppress fire without water and without damaging equipment, but they need safety procedures and alarms, and carbon dioxide systems are dangerous to people in occupied rooms. Hand-held extinguishers of the right class should be available, and emergency power-off switches should be clearly marked and protected from accidental use.",
   "Consider a worked example. During a data center walkthrough, an auditor sees staff holding the secure door open for colleagues and finds that 12 people on the access list left the company last year. The UPS maintenance log shows the last battery test was 20 months ago, and a water sensor under the raised floor reports a fault that nobody has cleared. She recommends a mantrap, a quarterly access list review by the facilities owner, awareness training on tailgating, a scheduled UPS load test and a maintenance contract that covers sensor faults.",
   "Common mistakes: assuming that cameras prevent entry (they deter and record, but do not stop anyone); relying on a sign-in sheet as an access control; forgetting network closets and wiring in shared buildings; installing generators without testing them under load or securing fuel; choosing carbon dioxide suppression for an occupied room; and treating physical access lists as static instead of reviewing them. The auditor inspects facilities in person, reviews access lists and logs, and checks maintenance and test records for UPS, generators, HVAC and suppression systems.",
   "Exam questions often ask which control prevents, detects or deters. 'Prevent tailgating' is a mantrap or vestibule, not a camera. 'Best suppression for a staffed data center balancing safety and water damage' is usually a pre-action system. 'Protect against short power outages and spikes' is a UPS; 'long outages' is a generator. 'Access list includes former staff' points to periodic access review by the area owner. 'Danger to personnel' points away from carbon dioxide systems."
  ],
  "terms": [
   [
    "Mantrap (access control vestibule)",
    "A space with two interlocking doors that admits one authorized person at a time."
   ],
   [
    "Tailgating",
    "Following an authorized person through a secured door without authorization."
   ],
   [
    "Uninterruptible power supply (UPS)",
    "A battery-based device that supplies and conditions power during short outages and fluctuations."
   ],
   [
    "Pre-action sprinkler",
    "A sprinkler system that fills its pipes with water only after detection, then discharges when a head opens."
   ],
   [
    "Dry-pipe sprinkler",
    "A sprinkler system whose pipes hold pressurized air until a head opens, used where pipes could freeze."
   ],
   [
    "Clean agent suppression",
    "A gas-based fire suppression system that leaves no residue and does not damage electronic equipment."
   ],
   [
    "Defense in depth",
    "Layering several controls so that the failure of one does not expose the protected asset."
   ]
  ],
  "example": "A company's head office has a small server room behind a keypad lock whose code has not changed in five years. An audit finds that cleaners, former contractors and several departed IT staff know the code. The company replaces the keypad with badge access tied to the HR leaver process, adds a camera over the door with footage retained for 90 days, and has the IT manager review the access list every quarter.",
  "tip": "A camera or sign-in sheet detects or deters; a mantrap prevents tailgating. For staffed data centers, pre-action sprinklers balance life safety with water damage risk, and a UPS covers short outages while generators cover long ones.",
  "check": [
   [
    "Which physical control best prevents tailgating into a data center?",
    "A mantrap or access control vestibule, because it physically allows only one authorized person through at a time."
   ],
   [
    "Why is a pre-action system often preferred in data centers?",
    "It needs detection before the pipes fill with water, reducing the risk of accidental discharge while still using water to fight fire."
   ],
   [
    "What is the role of a UPS compared with a generator?",
    "A UPS bridges short outages and conditions power instantly; a generator supplies power for longer outages once started."
   ],
   [
    "What evidence should an auditor seek for environmental controls?",
    "Maintenance and test records for UPS, generators, HVAC, detection and suppression systems, plus physical inspection of the facility."
   ]
  ]
 },
 {
  "t": "Identity and access management: authentication, authorization, provisioning and access reviews",
  "body": [
   "Identity and access management (IAM) ensures that the right people and systems have the right access to the right resources, for the right reasons, and no more. Access control failures, such as leavers with active accounts, excessive privileges and shared administrator logins, are among the most common audit findings, so this topic is heavily tested. Every other control depends on it: segregation of duties, audit trails and data protection all assume that access is granted correctly and removed on time.",
   "The process has distinct stages. Identification is claiming an identity, such as a user ID. Authentication proves the claim using one or more factors: something you know (a password or PIN), something you have (a token, smartphone app or hardware security key) or something you are (a biometric such as a fingerprint). Multifactor authentication (MFA) combines different factor types; two passwords are still one factor type, and a password plus a security question is still only something you know. Phishing-resistant methods, such as hardware security keys, give stronger protection than codes sent by text message. Authorization then decides what an authenticated identity may do, and accountability ties actions back to a unique person through logging, which is why shared accounts are a finding.",
   "Authorization follows principles and models. Least privilege gives only the access needed for the job, and need to know limits access to information to those who require it. Role-based access control (RBAC) attaches permissions to job roles, so a new accounts payable clerk receives the accounts payable role rather than a custom set. Attribute-based access control (ABAC) uses rules that consider attributes such as department, location or time. Discretionary access control lets data owners grant access, while mandatory access control enforces labels set centrally. Roles should be designed to respect segregation of duties, so no single role can, for example, both create a supplier and approve payments to it.",
   "Provisioning follows the joiner, mover, leaver cycle. Joiners receive access from an approved request, ideally through predefined roles. Movers should lose old access when they gain new, avoiding privilege creep, the gradual build-up of rights across jobs. Leavers must be disabled promptly, best done by linking HR termination events to automated deprovisioning. Privileged accounts, such as domain or database administrators, need extra controls through privileged access management (PAM): separate admin accounts, MFA, just-in-time elevation, password vaulting, session recording and frequent review. Service accounts need owners and should not allow interactive login. Single sign-on (SSO) and federation using protocols such as Security Assertion Markup Language (SAML) or OpenID Connect reduce password sprawl, but make the identity provider critical, so it must be very well protected.",
   "Periodic access reviews, also called recertifications, have data or application owners confirm that each user's access is still appropriate. The owner, not IT, is the right reviewer, because only the owner knows whether the access is needed. Reviews must lead to action: revoked access should actually be removed, and the auditor checks that it was.",
   "Consider a worked example. Comparing the HR leaver list with active directory accounts, an auditor finds 14 former staff still enabled, and the login history shows two of them signed in after leaving. On a Windows domain, a query such as `Search-ADAccount -AccountInactive -UsersOnly` helps find stale accounts, but it does not replace the HR comparison. The root cause is a manual, email-based leaver process. She recommends automated deprovisioning triggered by the HR system, a monthly reconciliation of leavers to accounts, and investigation of the two post-departure logins as potential security incidents.",
   "Common mistakes: counting two passwords as MFA; letting IT administrators perform access reviews instead of owners; reviews that are rubber-stamped with no removals ever; granting movers new access without removing old; using named accounts for daily work and admin tasks alike; and forgetting service, vendor and cloud accounts. Auditors test by comparing HR leavers to active accounts, sampling new and changed access for approval, reviewing privileged account lists and checking that review results are acted on.",
   "Exam questions look for specific clues. 'Access accumulated across roles' is privilege creep. 'Best control over leavers' is automated deprovisioning linked to HR, supported by reviews. 'Who should review access' is the data or application owner. 'Strongest authentication' combines different factor types, ideally phishing-resistant. 'Shared administrator account' points to loss of accountability, fixed with named accounts and PAM."
  ],
  "terms": [
   [
    "Least privilege",
    "Granting users only the access they need to perform their job, and no more."
   ],
   [
    "Multifactor authentication (MFA)",
    "Authentication that requires two or more different factor types, such as knowledge, possession and inherence."
   ],
   [
    "Role-based access control (RBAC)",
    "An authorization model in which permissions are assigned to roles and users receive roles."
   ],
   [
    "Privilege creep",
    "The gradual accumulation of access rights as users change roles without losing old access."
   ],
   [
    "Access recertification",
    "A periodic review in which owners confirm or remove each user's access."
   ],
   [
    "Privileged access management (PAM)",
    "Tools and processes that control, monitor and limit administrator and other high-risk accounts."
   ],
   [
    "Single sign-on (SSO)",
    "A system that lets users authenticate once and access multiple applications, relying on a trusted identity provider."
   ]
  ],
  "example": "An access review of a finance application shows that a treasury analyst, previously in accounts payable, can still create suppliers and also release payments. Neither the manager nor IT had noticed because the review template listed access by technical group names nobody understood. The company rewrites roles in business terms, removes the old access, adds a segregation-of-duties rule that blocks the combination, and trains owners on how to perform meaningful reviews.",
  "tip": "Owners review access; administrators implement it. For leavers, the best control links HR terminations to automatic account removal, supported by periodic owner reviews. Two of the same factor type is not MFA.",
  "check": [
   [
    "Is a password plus a security question multifactor authentication?",
    "No, because both are something you know; MFA requires different factor types."
   ],
   [
    "What is privilege creep and how is it prevented?",
    "The build-up of access as users change roles; it is prevented by removing old access on role changes and by periodic owner reviews."
   ],
   [
    "Who should perform user access reviews and why?",
    "The data or application owner, because they know what access is needed for the business; IT only implements the decisions."
   ],
   [
    "What is the most effective control to remove leavers' access promptly?",
    "Automated deprovisioning triggered by HR termination events, backed by regular reconciliation of leavers against active accounts."
   ]
  ]
 },
 {
  "t": "Network and endpoint security: firewalls, segmentation, IDS/IPS, remote access and EDR",
  "body": [
   "Networks connect everything, which also lets attackers move from one system to another once they get a foothold. Network and endpoint security aim to limit who can reach what, detect malicious activity early and protect the devices people actually use. For an auditor, the question is whether these controls are designed around real risks, configured to policy and actually operated, with someone reviewing rules and responding to alerts.",
   "Firewalls filter traffic based on rules. Packet-filtering firewalls look at addresses, ports and protocols in each packet. Stateful inspection firewalls track connections, so return traffic for a session started inside is allowed automatically. Next-generation firewalls (NGFW) add application awareness, user identity and content inspection. Web application firewalls (WAF) sit in front of web applications and block attacks such as injection. Rules are processed in order, usually top to bottom, and the first match wins, so a broad allow rule near the top defeats everything below it. A sound rule set denies by default and allows only what is needed, as in `deny ip any any` at the end of a router access list. Each rule should have a documented business owner and purpose, important traffic should be logged, and rules should be reviewed periodically to remove unused, overly broad or shadowed rules (rules that never match because an earlier rule catches their traffic). Changes to rules go through change management.",
   "Segmentation divides the network into zones so that a compromise in one zone cannot easily spread. A demilitarized zone (DMZ) holds internet-facing servers between the external and internal firewalls. Payment card systems, industrial control systems and Internet of Things (IoT) devices often sit in their own segments, and administrators use restricted management networks or jump hosts. Microsegmentation applies fine-grained rules between individual workloads. Zero trust takes the idea further by verifying every request based on identity, device health and context rather than trusting anything because it is inside the network.",
   "Intrusion detection systems (IDS) monitor network traffic or host activity and alert on suspicious patterns; intrusion prevention systems (IPS) sit inline and can block traffic as well. Detection can be signature-based, matching known attack patterns, or anomaly-based, flagging deviations from normal behavior, which can find new attacks but produces more false positives. Both need tuning and, above all, people who act on alerts. Remote access should use encrypted connections such as virtual private networks (VPN) or zero trust network access (ZTNA), with multifactor authentication (MFA) and posture checks that confirm a device is patched and protected before it connects. Remote access accounts for suppliers should be limited to the systems they support, enabled only when needed and logged.",
   "Endpoints include laptops, desktops, servers and mobile devices. Controls include hardened configurations, timely patching, host firewalls, anti-malware, full-disk encryption, application allow listing so only approved programs run, removal of local administrator rights, and endpoint detection and response (EDR) tools that record process, file and network behavior so analysts can investigate and contain threats, for example by isolating a laptop from the network remotely.",
   "Consider a worked example. Reviewing a perimeter firewall, an auditor finds an allow-any rule added during an outage two years ago and never removed, 60 rules with no owner, and logging disabled on the rule that permits remote desktop from a supplier's network. The EDR console also shows 8 percent of laptops have not reported in for over 30 days. She recommends removing the broad rule through change management, assigning owners, enabling logging, scheduling semiannual rule reviews and reconciling EDR coverage with the asset inventory.",
   "Common mistakes: assuming an IDS blocks attacks; trusting everything on the internal network; allowing rules to accumulate without owners; installing EDR without anyone watching its alerts; relying on a VPN alone without MFA or device checks; and leaving flat networks where a workstation can reach every database. The auditor reviews rule sets and change records, segmentation diagrams, alert handling, remote access configuration and endpoint coverage reports.",
   "Exam questions test these distinctions. 'Detects and alerts' is an IDS; 'inline and blocks' is an IPS. 'Limit spread of a compromise' points to segmentation. 'Internet-facing web server placement' is a DMZ. 'Best first control for a rule set' is deny by default. 'Investigate and contain a compromised laptop' points to EDR. 'Rule that never matches' is a shadowed rule."
  ],
  "terms": [
   [
    "Stateful inspection",
    "Firewall filtering that tracks the state of connections and allows return traffic for established sessions."
   ],
   [
    "Network segmentation",
    "Dividing a network into zones with controlled traffic between them to limit the spread of compromise."
   ],
   [
    "Demilitarized zone (DMZ)",
    "A network segment that hosts internet-facing services, separated from both the internet and the internal network."
   ],
   [
    "Intrusion prevention system (IPS)",
    "An inline system that detects and blocks malicious traffic, unlike an IDS, which only alerts."
   ],
   [
    "Endpoint detection and response (EDR)",
    "Endpoint software that records behavior, detects threats and lets analysts investigate and contain devices."
   ],
   [
    "Zero trust",
    "A security model that verifies every access request based on identity and context rather than network location."
   ],
   [
    "Shadowed rule",
    "A firewall rule that never takes effect because an earlier rule matches the same traffic."
   ]
  ],
  "example": "A hospital's medical imaging devices run an old operating system that cannot be patched. Rather than leave them on the general network, the hospital places them in a dedicated segment whose firewall rules allow only the imaging archive server to connect on the required ports, monitors the segment with an IDS tuned for those devices, and records the arrangement as an approved exception with compensating controls reviewed each year.",
  "tip": "IDS detects and alerts; IPS sits inline and blocks. Firewall rule sets should deny by default, and a broad allow rule near the top defeats everything below it. Segmentation limits how far a compromise spreads.",
  "check": [
   [
    "What is the key difference between an IDS and an IPS?",
    "An IDS monitors and alerts on suspicious activity, while an IPS sits inline and can block the traffic."
   ],
   [
    "Why does the order of firewall rules matter?",
    "Rules are usually evaluated in order and the first match applies, so a broad allow rule placed early overrides more restrictive rules below it."
   ],
   [
    "What is the purpose of a DMZ?",
    "To host internet-facing services in a separate segment so that a compromise of those servers does not give direct access to the internal network."
   ],
   [
    "What does EDR add beyond traditional anti-malware?",
    "Continuous recording of endpoint behavior that lets analysts detect, investigate and contain threats, such as by isolating a device."
   ]
  ]
 },
 {
  "t": "Data loss prevention and data encryption",
  "body": [
   "Data can leave an organization by mistake or on purpose: an email sent to the wrong person, a spreadsheet uploaded to personal cloud storage, a lost laptop, a misconfigured storage bucket or a deliberate theft by an insider. Data loss prevention (DLP) and encryption are two of the main technical defenses. DLP watches where sensitive data goes and can stop it; encryption makes data unreadable to anyone without the key, so that if it does escape, it is useless. Both depend on knowing which data is sensitive, which is why data classification comes first.",
   "DLP tools identify sensitive data in several ways: patterns such as payment card numbers or national identifiers (often checked with validation rules to reduce false matches), keywords, fingerprints of specific documents or database records, machine learning classifiers, and classification labels applied by users or tools. Once found, the tool can log, warn the user, encrypt, quarantine or block. Network DLP inspects traffic leaving the organization, such as email and web uploads. Endpoint DLP controls actions on devices, such as copying to USB drives, printing or pasting into web forms. Cloud DLP scans data stored in cloud services and collaboration tools. Data at rest scanning finds sensitive files sitting in the wrong places.",
   "DLP needs careful operation. Rules must be tuned to avoid floods of false positives that users and analysts learn to ignore. Many deployments sensibly start in monitor-only mode to learn normal patterns, then move to blocking for the highest-risk cases. Someone must review alerts and follow up, and exceptions need approval. A DLP tool whose alerts nobody reviews gives little real protection, and one that cannot see encrypted traffic or unmanaged devices has blind spots the auditor should identify.",
   "Encryption turns readable plaintext into ciphertext that only key holders can read. Symmetric encryption, such as the Advanced Encryption Standard (AES), uses one shared key for both encryption and decryption; it is fast, so it is used for bulk data. Asymmetric encryption, such as RSA (named after its inventors Rivest, Shamir and Adleman) or elliptic curve cryptography (ECC), uses a mathematically linked public and private key pair; it is slower, so it is used for key exchange and digital signatures. In practice the two are combined: asymmetric cryptography protects or agrees a symmetric session key, which then encrypts the data. Data at rest is protected with full-disk, database, file or field-level encryption; data in transit with protocols such as Transport Layer Security (TLS) and virtual private networks. Hashing, for example with SHA-256, is a one-way function that proves integrity but is not encryption, because it cannot be reversed. Tokenization and masking replace sensitive values with substitutes and are useful where systems do not need the real data.",
   "Encryption is only as strong as key management. Keys must be generated securely, stored separately from the data they protect, for example in a hardware security module (HSM) or a cloud key management service (KMS), with access limited to those who need it and dual control for the most sensitive keys. Keys should be rotated according to policy, backed up so that data is not lost if a key is, and securely destroyed at end of life. Algorithms and key lengths must be current; outdated algorithms and protocol versions should be retired.",
   "Consider a worked example. An auditor finds that a customer database is encrypted, but the encryption key sits in a configuration file on the same server, readable by application administrators and copied into every backup. Anyone who steals the server or a backup gets both the lock and the key. She reports that encryption provides little real protection and recommends moving keys to a KMS or HSM with restricted access, logging key use, and rotating the existing key. She also finds that endpoint DLP is in monitor-only mode two years after deployment with no alert reviews, and recommends a tuning plan and a move to blocking for card data.",
   "Common mistakes: calling hashing encryption; storing keys next to the data; assuming encryption in transit protects data at rest, or the reverse; deploying DLP without classification; leaving DLP in monitor mode forever; and forgetting that encryption does not stop an authorized user from misusing data, which is where DLP and access control help.",
   "Exam questions test these pairings. 'Prevent sensitive data from being emailed externally' points to network DLP. 'Block copying to USB' is endpoint DLP. 'Fast bulk encryption' is symmetric. 'Key exchange or digital signatures' is asymmetric. 'Greatest risk to encrypted data' is usually poor key management. 'Verify a file has not changed' is hashing. 'First step before DLP' is data classification."
  ],
  "terms": [
   [
    "Data loss prevention (DLP)",
    "Tools and processes that detect sensitive data and monitor or block its unauthorized movement."
   ],
   [
    "Symmetric encryption",
    "Encryption that uses the same secret key to encrypt and decrypt, fast enough for bulk data."
   ],
   [
    "Asymmetric encryption",
    "Encryption that uses a public and private key pair, used for key exchange and digital signatures."
   ],
   [
    "Hashing",
    "A one-way function that produces a fixed-length value used to verify integrity; it cannot be reversed to recover data."
   ],
   [
    "Key management",
    "The secure generation, storage, distribution, rotation, backup and destruction of cryptographic keys."
   ],
   [
    "Hardware security module (HSM)",
    "A tamper-resistant device that generates, stores and uses cryptographic keys securely."
   ],
   [
    "Tokenization",
    "Replacing sensitive data with a non-sensitive substitute value, with the real data held in a secure vault."
   ]
  ],
  "example": "A sales manager about to leave a company tries to upload the full customer list to a personal file-sharing site. Endpoint DLP recognizes the document fingerprint of the customer export, blocks the upload, and alerts the security team, who review the event with HR and legal. The laptop's full-disk encryption also means that when the manager's second, older laptop is found missing, the data on it cannot be read.",
  "tip": "Encryption is only as good as its key management; a key stored next to the data it protects is a common finding. Hashing proves integrity but is not encryption, and DLP depends on data classification.",
  "check": [
   [
    "Why is symmetric encryption used for bulk data?",
    "It is much faster than asymmetric encryption, so it is practical for large volumes; asymmetric methods protect the symmetric key."
   ],
   [
    "What is the difference between hashing and encryption?",
    "Encryption is reversible with the key and protects confidentiality; hashing is one-way and is used to verify integrity."
   ],
   [
    "Why is storing an encryption key on the same server as the encrypted data a problem?",
    "Anyone who obtains the server or its backups gets both the data and the key, so encryption gives little protection."
   ],
   [
    "Which type of DLP would stop copying sensitive files to a USB drive?",
    "Endpoint DLP, because it controls actions on the device itself."
   ]
  ]
 },
 {
  "t": "Public key infrastructure (PKI) and digital signatures",
  "body": [
   "Asymmetric cryptography gives everyone a public key that anyone can use and a private key only the owner holds. That raises a trust problem: how do you know a public key really belongs to your bank, your supplier or a colleague, and not to an impostor? Public key infrastructure (PKI) solves it with digital certificates issued by trusted certificate authorities, plus the policies, people and systems needed to issue, manage and revoke them. Every secure website connection and most signed software rely on it.",
   "A digital certificate binds a public key to an identity, such as a website name, a person or a device, and is digitally signed by a certificate authority (CA). Following the X.509 standard, it contains the subject, the subject's public key, the issuer, validity dates, a serial number and the permitted key uses. A registration authority (RA) verifies identities before the CA issues certificates. CAs form a chain of trust: a root CA sits at the top, is usually kept offline and heavily protected, and signs intermediate or issuing CAs that sign day-to-day certificates. Browsers and operating systems trust a set of root certificates, and a certificate is trusted if it chains back to one of them. You can inspect a site's chain with a command such as `openssl s_client -connect example.com:443 -showcerts`.",
   "Certificates can be revoked before they expire, for example when a private key is compromised, an employee leaves or a certificate was issued in error. Relying parties check revocation through certificate revocation lists (CRLs), signed lists published by the CA, or the online certificate status protocol (OCSP), which answers queries about a single certificate in real time. A certificate policy and a certification practice statement (CPS) describe how the CA operates and how much trust its certificates deserve, which an auditor reviews when relying on a CA.",
   "Digital signatures provide integrity, authentication of origin and non-repudiation. The signer computes a hash of the message and encrypts that hash with their private key; the result is the signature. The recipient decrypts the signature using the signer's public key, computes a fresh hash of the message, and compares the two. A match proves the message was not changed and that only the holder of the private key could have signed it. Because only one party holds the private key, the signer cannot credibly deny signing, which is non-repudiation. Symmetric keys cannot provide this, because both parties hold the same key.",
   "Confidentiality is a separate service. To send a secret message, you encrypt it with the recipient's public key, so only the recipient's private key can decrypt it; in practice a symmetric session key is protected that way and used for the data. To both sign and encrypt, the sender signs with their own private key and then encrypts for the recipient. Keeping these directions straight is one of the most tested points in this area. Private keys must be protected, ideally on smart cards, hardware tokens or hardware security modules (HSMs), because a stolen private key lets an attacker sign as its owner.",
   "Consider a worked example. A company signs electronic purchase orders with employees' private keys stored on smart cards. A supplier later disputes an order, claiming the company changed the quantity after sending. The company verifies the signature using the employee's certificate: the hash matches, the certificate chains to the company's CA and was not revoked at signing time. This proves the order came from that card and was not altered. The auditor reviewing the scheme checks that smart cards are issued only after identity checks, that lost cards trigger revocation, and that the CA's own keys are protected in an HSM.",
   "Common mistakes: thinking you sign with the recipient's public key; thinking encryption alone gives non-repudiation; forgetting to check revocation status; letting certificates expire unnoticed and cause outages, which a certificate inventory and expiry monitoring prevent; and keeping a root CA online. The auditor reviews CA controls, certificate inventories and expiry monitoring, revocation processes and private key protection.",
   "Exam questions usually test the key directions. 'Ensure the sender cannot deny sending' is a digital signature with the sender's private key. 'Verify the signature' uses the sender's public key. 'Keep the message confidential' means encrypt with the recipient's public key. 'Check whether a certificate is still valid in real time' is OCSP. 'Entity that verifies identity before issuance' is the RA."
  ],
  "terms": [
   [
    "Public key infrastructure (PKI)",
    "The policies, roles and systems used to issue, manage and revoke digital certificates."
   ],
   [
    "Certificate authority (CA)",
    "A trusted entity that issues and digitally signs certificates binding public keys to identities."
   ],
   [
    "Registration authority (RA)",
    "The entity that verifies the identity of certificate applicants before the CA issues certificates."
   ],
   [
    "Digital signature",
    "A hash of a message encrypted with the signer's private key, providing integrity, origin authentication and non-repudiation."
   ],
   [
    "Certificate revocation list (CRL)",
    "A signed list, published by a CA, of certificates revoked before their expiry dates."
   ],
   [
    "Online certificate status protocol (OCSP)",
    "A protocol for checking the revocation status of a single certificate in real time."
   ],
   [
    "Non-repudiation",
    "Assurance that a party cannot credibly deny having sent or signed a message."
   ]
  ],
  "example": "An online payment service's website suddenly shows security warnings to every customer on a Saturday morning. The TLS certificate had expired overnight, because renewal reminders went to an engineer who had left. The company restores service with a new certificate, builds an inventory of all certificates with owners and expiry dates, sets up automated renewal where possible, and adds alerts 60 and 30 days before expiry to a shared team mailbox.",
  "tip": "Sign with your own private key; others verify with your public key. Encrypt for confidentiality with the recipient's public key. Symmetric keys cannot give non-repudiation because both sides hold them.",
  "check": [
   [
    "Which key does a sender use to create a digital signature, and which key verifies it?",
    "The sender's private key creates it; anyone verifies it with the sender's public key."
   ],
   [
    "Which key should be used to encrypt a message so only the recipient can read it?",
    "The recipient's public key, because only the recipient's private key can decrypt it."
   ],
   [
    "What is the role of a registration authority?",
    "It verifies the identity of certificate applicants before the certificate authority issues certificates."
   ],
   [
    "How can a relying party check whether a certificate has been revoked?",
    "By consulting the CA's certificate revocation list or querying an OCSP responder."
   ]
  ]
 },
 {
  "t": "Cloud, virtualized, mobile, wireless and IoT environments",
  "body": [
   "Modern IT runs on shared and distributed platforms: virtual machines, containers, cloud services, phones, wireless networks and connected devices. Each changes where data lives, who operates the controls and how quickly things can be created or lost. The auditor does not need to be an engineer in each platform, but must understand the specific risks and who is responsible for managing them, because the same control objectives, such as access, change, logging and data protection, still apply.",
   "Virtualization runs many virtual machines (VMs) on one physical host through a hypervisor. It improves efficiency and makes recovery easier, but it concentrates risk: a compromise of the hypervisor or its management console affects every guest, and VMs can be created, copied or moved quickly without proper approval, a problem called VM sprawl. Controls include hardening and patching hypervisors, restricting and logging access to management consoles, separating workloads of different sensitivity onto different hosts or clusters, controlling and patching images and templates, and protecting VM snapshots, which may contain sensitive data. Containers package an application with its dependencies and share the host's operating system kernel. They need trusted, scanned images, a controlled registry, least-privilege settings and secure orchestration platforms such as Kubernetes.",
   "Cloud services follow a shared responsibility model. In infrastructure as a service (IaaS), the provider secures the physical data centers, hardware and hypervisor, while the customer secures operating systems, applications, network settings, identities and data. In platform as a service (PaaS), the provider also manages the operating system and runtime. In software as a service (SaaS), the provider runs the whole application while the customer still manages users, access, configuration and data. In every model the customer remains accountable for its data and for meeting its own legal obligations. Common cloud findings are misconfigured storage exposed to the public, excessive permissions, unused access keys, missing logs and resources created outside governance.",
   "Assurance over the provider comes from contracts that cover security, audit rights, data location, breach notification and exit; from independent reports such as System and Organization Controls (SOC) 2 reports and certifications such as ISO/IEC 27001; and from reviewing the complementary user entity controls the provider expects the customer to operate. Assurance over the customer's own side comes from configuration monitoring, often called cloud security posture management, and from the customer's normal identity and access management, change and logging controls.",
   "Mobile devices are easily lost, mix personal and business use and connect from anywhere. Mobile device management (MDM) enforces screen locks, encryption, operating system versions, app controls and remote wipe; with bring your own device (BYOD), a separate work container or profile lets the organization protect and wipe business data without touching personal data. Wireless networks should use current protection such as Wi-Fi Protected Access 3 (WPA3) or WPA2-Enterprise with individual authentication, guest networks should be separated from internal ones, and rogue access points should be detected. Internet of Things (IoT) devices, such as cameras, sensors and building controls, often ship with weak default credentials, receive few updates and stay in service for years, so they should be inventoried, have defaults changed, be placed in isolated network segments and be monitored for unusual traffic.",
   "Consider a worked example. An auditor reviewing a company's cloud account finds a storage bucket of customer exports configured for public read access, created by a developer testing an integration. The provider's physical and platform controls are fine; the misconfiguration is entirely the customer's responsibility. She also finds that the provider's SOC 2 report lists user entity controls, such as reviewing administrator access, that the company does not perform. She recommends blocking public storage by policy, posture monitoring that alerts on public resources, and a mapping of the complementary controls to owners.",
   "Common mistakes: believing the cloud provider is responsible for customer data and configuration; relying on a provider's report without reading its scope, exceptions and user entity controls; treating VMs as free to create without approval; allowing personal devices without MDM; using a single shared Wi-Fi password for staff; and connecting IoT devices to the main corporate network.",
   "Exam questions test responsibility and fit. 'Who is responsible for data and access in SaaS' is the customer. 'Greatest risk of virtualization' is hypervisor compromise affecting all guests. 'Protect data on lost phones' points to MDM with encryption and remote wipe. 'Weak default credentials and no patching' points to IoT segmentation. 'Assurance about a cloud provider's controls' points to independent reports such as SOC 2 plus contract rights."
  ],
  "terms": [
   [
    "Hypervisor",
    "Software that creates and runs virtual machines, sharing physical hardware among them."
   ],
   [
    "Shared responsibility model",
    "The division of security duties between cloud provider and customer, varying across IaaS, PaaS and SaaS."
   ],
   [
    "Infrastructure as a service (IaaS)",
    "A cloud model providing virtual compute, storage and networking, with the customer managing operating systems and above."
   ],
   [
    "Software as a service (SaaS)",
    "A cloud model in which the provider runs the complete application and the customer manages users, configuration and data."
   ],
   [
    "Mobile device management (MDM)",
    "Tools that enforce security settings, manage apps and allow remote wipe on mobile devices."
   ],
   [
    "Internet of Things (IoT)",
    "Network-connected devices such as sensors, cameras and controllers, often with limited built-in security."
   ],
   [
    "Complementary user entity controls",
    "Controls a service provider's report assumes the customer operates for the overall control objectives to be met."
   ]
  ],
  "example": "A retail chain installs internet-connected thermostats in every store. A security review finds they all use the manufacturer's default password and sit on the same network as the point-of-sale terminals. The chain changes the credentials, moves the devices into an isolated segment that can only reach the vendor's management service, adds them to the asset inventory and monitors their traffic for anything unusual.",
  "tip": "In the cloud, the customer always keeps accountability for its data, identities and configuration. Most cloud breaches come from customer misconfiguration, not provider failure, and a provider's SOC report assumes the customer performs its own complementary controls.",
  "check": [
   [
    "In a SaaS arrangement, what remains the customer's responsibility?",
    "Managing users and access, configuring the application securely and protecting and governing its own data."
   ],
   [
    "Why is hypervisor security so important?",
    "A compromise of the hypervisor or its console can affect every virtual machine running on that host."
   ],
   [
    "What controls should apply to IoT devices?",
    "Inventory, changing default credentials, network isolation, updating where possible and monitoring for unusual traffic."
   ],
   [
    "What should an auditor check when relying on a cloud provider's SOC 2 report?",
    "The report's scope, period and exceptions, and whether the customer performs the complementary user entity controls it lists."
   ]
  ]
 },
 {
  "t": "Security awareness training and information system attack methods",
  "body": [
   "People are both a target and a defense. Many attacks start by tricking someone into clicking a link, sharing a password or approving a payment, and trained staff who spot and report attempts stop many of them before technology is ever tested. Understanding how attacks work also helps the auditor judge whether an organization's controls address real threats rather than theoretical ones. The goal here is recognition and prevention, not attack technique.",
   "Social engineering manipulates people rather than technology. Phishing sends deceptive emails to steal credentials or deliver malware. Spear phishing targets specific people with personalized details, and whaling targets senior executives. Vishing uses voice calls and smishing uses text messages. Business email compromise (BEC) uses a spoofed or hijacked executive or supplier mailbox to request payments, bank detail changes or sensitive data, and it is one of the most costly fraud types because no malware is needed. Pretexting invents a believable story, such as a help desk call from a 'new manager' who needs a password reset. Tailgating exploits courtesy to enter secure areas, and baiting leaves infected media where someone will plug it in.",
   "Technical attacks come in several families. Malware includes ransomware, which encrypts data and demands payment and increasingly steals data first to threaten publication; trojans disguised as useful software; worms that spread by themselves; and spyware and keyloggers. Password attacks include brute force, dictionary attacks and credential stuffing, which reuses passwords leaked from other sites. Denial-of-service (DoS) and distributed denial-of-service (DDoS) attacks overwhelm systems with traffic. On-path attacks, formerly called man-in-the-middle, intercept or alter communications. Web application attacks such as SQL injection and cross-site scripting (XSS) exploit poor input validation, and the defense is secure coding with parameterized queries, output encoding and input validation. Advanced persistent threats (APTs) are well-resourced attackers who stay hidden in a network for long periods. Insider threats come from employees or contractors, whether malicious or careless. Supply chain attacks compromise a trusted vendor or software update to reach its customers.",
   "A security awareness program gives all staff regular, role-appropriate training: an introduction at onboarding, periodic refreshers and short, timely messages about current threats. High-risk roles, such as finance, executives, help desk staff and administrators, get extra targeted training. Phishing simulations let people practice, and a simple, well-publicized way to report suspicious messages, such as a report button in the email client, turns staff into sensors. Messages from leadership show the program matters. Training should not shame people who click; the aim is to build reporting habits.",
   "Effectiveness is measured by behavior, not attendance. Useful measures include phishing simulation click rates and, more importantly, report rates over time, the time it takes staff to report a real phishing email, the number of security incidents caused by human error, and results of social engineering tests. A 100 percent completion rate for an annual video says little about whether anyone behaves differently. Training is also only one layer: process controls such as call-back verification for payment changes, and technical controls such as email filtering, multifactor authentication (MFA) and endpoint protection, catch what people miss.",
   "Consider a worked example. An accounts payable clerk receives an email from a real supplier's address, which an attacker has compromised, asking to change the bank account for future payments. The email references a genuine recent invoice. Following training and procedure, she does not reply to the email but calls the supplier on the phone number already held in the vendor master file. The supplier confirms it sent no such request. She reports the message through the report button, the security team alerts the supplier, and the change is blocked. The auditor later notes the call-back control as a key compensating control for BEC.",
   "Common mistakes: measuring training only by completion; running one generic annual session for everyone; punishing staff who fall for simulations, which discourages reporting; relying on training alone for payment fraud instead of adding a call-back process; and calling back on the phone number provided in the suspicious email itself.",
   "Exam questions usually test recognition and best control. 'Email from a spoofed executive requesting urgent transfer' is BEC, and the best control is independent verification. 'Targeted email to a chief financial officer' is whaling. 'Attacker reuses passwords from another breach' is credential stuffing, countered by MFA. 'Best measure of awareness program effectiveness' is behavior change such as click and report trends. 'Best defense against SQL injection' is parameterized queries and input validation."
  ],
  "terms": [
   [
    "Phishing",
    "A deceptive message designed to trick recipients into revealing information, clicking malicious links or opening malware."
   ],
   [
    "Business email compromise (BEC)",
    "Fraud using spoofed or hijacked business email accounts to request payments or sensitive data."
   ],
   [
    "Social engineering",
    "Manipulating people into breaking security practices or revealing information."
   ],
   [
    "Ransomware",
    "Malware that encrypts data, and often steals it, to extort payment from the victim."
   ],
   [
    "Credential stuffing",
    "Using usernames and passwords leaked from one site to try to log in to other sites."
   ],
   [
    "SQL injection",
    "An attack that inserts malicious database commands through poorly validated input fields."
   ],
   [
    "Advanced persistent threat (APT)",
    "A skilled, well-resourced attacker that maintains long-term hidden access to a target network."
   ]
  ],
  "example": "A company runs quarterly phishing simulations. In the first quarter 22 percent of staff click and only 5 percent report. After short, targeted training for repeat clickers, a one-click report button and monthly updates showing real attacks that staff caught, the click rate falls to 6 percent within a year and the report rate climbs to 55 percent. The security team now learns about real phishing campaigns within minutes from staff reports.",
  "tip": "Measure awareness by behavior change, such as phishing simulation click and report trends, rather than training attendance. For payment fraud, independent call-back verification using known contact details is a strong process control.",
  "check": [
   [
    "What is the best measure of a security awareness program's effectiveness?",
    "Changes in behavior over time, such as falling phishing click rates and rising report rates, rather than completion numbers."
   ],
   [
    "What control best prevents payment fraud from business email compromise?",
    "Independent verification of payment or bank detail changes by calling the requester on contact details already on file."
   ],
   [
    "What is the difference between phishing and spear phishing?",
    "Phishing is broad and untargeted; spear phishing is tailored to specific people or roles using personal details."
   ],
   [
    "How does credential stuffing work, and what control helps most?",
    "Attackers try passwords leaked from other breaches on new sites; multifactor authentication stops a reused password alone from working."
   ]
  ]
 },
 {
  "t": "Security testing tools and techniques: vulnerability scanning, penetration testing and configuration review",
  "body": [
   "Security testing finds weaknesses before attackers do and gives evidence about whether controls actually work. An auditor may perform some tests directly, rely on tests performed by others such as an internal security team or an external firm, or review the organization's own testing program. In every case, the questions are whether testing is risk-based, performed by qualified and suitably independent people, properly authorized, and followed by timely remediation.",
   "Vulnerability scanning uses automated tools to identify known weaknesses such as missing patches, weak configurations, default credentials and exposed services. Authenticated or credentialed scans log in to systems and can see installed software and settings, so they give more complete and accurate results than unauthenticated scans, which only see what is exposed on the network. Scanners rate findings using scoring systems such as the Common Vulnerability Scoring System (CVSS), but the organization should prioritize by both severity and exposure: a critical flaw on an internet-facing server matters more than the same flaw on an isolated test machine. Scans should run regularly and after significant changes. Findings are assigned to owners, fixed within defined timeframes, and confirmed by rescanning. Scanners produce false positives, so results need validation, and false negatives mean a clean scan is not proof of security.",
   "Penetration testing goes further. Skilled testers try to exploit weaknesses and chain them together to show what an attacker could actually achieve, such as reaching a payment database from the internet. Tests can be external or internal, and testers may be given no knowledge (black box), partial knowledge (gray box) or full knowledge (white box) of the environment. Black box tests simulate an outside attacker but may miss issues; white box tests are more thorough for the time spent. Red team exercises simulate a real adversary over a longer period to test detection and response as well as prevention, often with a blue team defending and sometimes a purple team approach where both work together to improve detection.",
   "Authorization is the non-negotiable control. Before any penetration test there must be written approval from management with authority over the systems, an agreed scope, and rules of engagement covering timing, targets, exclusions, permitted techniques, emergency contacts, how findings and sensitive data will be handled, and how to stop the test if something breaks. Third-party systems, such as a cloud provider's platform or a supplier's network, need their owners' permission too. Testing without authorization is both dangerous and potentially illegal, even when well-intentioned.",
   "Other techniques round out the toolkit. Configuration review compares system settings with hardening baselines, often with automated compliance tools that check hundreds of settings at once. Application security testing includes static application security testing (SAST), which analyzes source code, and dynamic application security testing (DAST), which tests a running application. Social engineering tests, wireless assessments and, with approval, password strength testing against stored password hashes reveal weaknesses that network scans cannot.",
   "Consider a worked example. A quarterly scan finds 40 critical vulnerabilities on internet-facing servers. The auditor checks the remediation tracker and finds 15 still open after 90 days against a 30-day policy, with no approved exceptions. She also learns the scans are unauthenticated, so they probably understate the problem, and that the last penetration test was scoped to exclude the customer portal, the most exposed system. She reports the remediation gap, recommends authenticated scanning and asks that the next penetration test scope be driven by risk rather than convenience.",
   "Common mistakes: treating a vulnerability scan as a penetration test; starting a test on verbal approval; letting the team that runs a system choose to exclude it from testing; reporting findings with no follow-up or retesting; relying on unauthenticated scans for internal systems; and assuming a clean scan means no vulnerabilities. The auditor also checks the qualifications and independence of testers, and that test reports, which describe weaknesses in detail, are stored and shared securely.",
   "Exam questions usually test these differences. 'Identify known vulnerabilities across many systems' is a vulnerability scan. 'Demonstrate what an attacker could achieve' is a penetration test. 'Most important step before testing' is written authorization with agreed scope and rules of engagement. 'Tester given full information' is white box. 'Test detection and response' is a red team exercise. 'More accurate scan results' come from authenticated scans."
  ],
  "terms": [
   [
    "Vulnerability scan",
    "An automated check of systems for known weaknesses such as missing patches and misconfigurations."
   ],
   [
    "Authenticated scan",
    "A vulnerability scan that logs in to systems, giving more complete and accurate results."
   ],
   [
    "Penetration test",
    "An authorized attempt to exploit weaknesses to demonstrate real-world impact."
   ],
   [
    "Rules of engagement",
    "The agreed terms for a security test, including scope, timing, methods, contacts and data handling."
   ],
   [
    "Black box testing",
    "Testing with no prior knowledge of the target environment, simulating an outside attacker."
   ],
   [
    "Red team exercise",
    "A realistic, often extended simulation of an adversary to test prevention, detection and response."
   ],
   [
    "Static application security testing (SAST)",
    "Analysis of application source code for security flaws without running the program."
   ]
  ],
  "example": "A retailer hires an external firm for an annual penetration test. The rules of engagement exclude the payment systems during the holiday period and set emergency contacts. The testers gain access to an internal server through a default administrator password on a forgotten management interface and show they could reach the customer database. The retailer changes the password, removes the interface from the network, adds default credential checks to its authenticated scans and schedules a retest to confirm.",
  "tip": "A vulnerability scan identifies weaknesses; a penetration test exploits them to prove impact. No penetration test should start without written authorization and agreed rules of engagement, and findings mean little without tracked remediation.",
  "check": [
   [
    "What is the main difference between a vulnerability scan and a penetration test?",
    "A scan identifies known weaknesses automatically; a penetration test attempts to exploit them to show what an attacker could actually achieve."
   ],
   [
    "What must be in place before a penetration test begins?",
    "Written authorization from appropriate management, an agreed scope and rules of engagement covering targets, timing, exclusions and contacts."
   ],
   [
    "Why are authenticated scans preferred for internal systems?",
    "They can inspect installed software and settings, giving more complete and accurate results than scans that only see the network surface."
   ],
   [
    "After vulnerabilities are fixed, how should the fix be confirmed?",
    "By rescanning or retesting to verify the weakness is actually gone."
   ]
  ]
 },
 {
  "t": "Security monitoring: logs, SIEM and alert management",
  "body": [
   "Preventive controls eventually fail. A password is phished, a patch is late, a trusted insider misuses access. Organizations must therefore be able to detect attacks and misuse quickly, because the longer an attacker stays unnoticed, the more damage they do. Security monitoring collects and analyzes events from across the environment and turns them into alerts that people investigate. For the auditor, the question is not whether a monitoring tool has been bought, but whether it sees the right things and whether anyone acts on what it finds.",
   "Monitoring draws on many sources: firewalls, intrusion detection and prevention systems, endpoint detection and response (EDR) tools, servers, directory services, databases, business applications, cloud platform audit logs, email security gateways and physical access systems. A security information and event management (SIEM) system collects these logs centrally, normalizes them into a common format, correlates events across sources and applies rules or analytics to raise alerts. A classic correlation rule looks for many failed logins followed by a success for the same account from an unusual country, or a new administrator account created outside business hours followed by large data transfers.",
   "Other tools add depth. User and entity behavior analytics (UEBA) builds a baseline of normal behavior for users and devices and flags deviations, such as an accountant suddenly downloading engineering files. Security orchestration, automation and response (SOAR) tools automate routine steps through playbooks, such as enriching an alert with threat intelligence, disabling an account or isolating a device, so analysts spend their time on judgment rather than copying data between screens. Threat intelligence feeds provide known malicious addresses and indicators to match against.",
   "Monitoring only works if it is designed and operated well. Important events must actually be logged and forwarded, clocks synchronized, and logs protected from tampering and retained as required. Use cases, meaning the specific threats the organization wants to detect, should be chosen based on risk, often mapped to a catalog of attacker techniques such as MITRE ATT&CK. Rules need continuous tuning: too many false positives cause alert fatigue, and real attacks get lost in the noise, while rules that are too loose miss attacks entirely (false negatives). A security operations center (SOC), internal or outsourced, triages alerts according to documented procedures and severity levels, documents what it did, and escalates confirmed incidents to incident response. Metrics such as mean time to detect (MTTD) and mean time to respond (MTTR) show whether performance is improving.",
   "Coverage must be checked against reality. A SIEM that receives logs from 70 percent of critical systems gives a false sense of security about the other 30 percent. Log source health monitoring alerts when a source stops sending, which catches both technical failures and attackers who disable logging. Privileged users, including security staff and SIEM administrators themselves, must also be monitored, and changes to detection rules should go through change control.",
   "Consider a worked example. An auditor compares the SIEM's list of active log sources with the asset inventory and finds that the payroll database and two domain controllers send no logs; they were rebuilt six months ago and never reconnected, and no health alert fired. She then samples 20 high-severity alerts and finds five closed as false positives without investigation notes, and one that was never opened. She recommends log source health monitoring, reconciliation of sources with the inventory each quarter, mandatory closure notes, and quality review of a sample of closed alerts by a SOC lead.",
   "Common mistakes: treating the purchase of a SIEM as the control; logging everything without defining use cases; never tuning rules, so analysts drown in alerts; closing alerts without evidence; forgetting cloud and software as a service logs; failing to notice when a log source goes silent; and letting SOC staff monitor everyone except themselves. The auditor checks log source coverage against the asset inventory, reviews use cases and tuning records, samples alerts to see whether they were investigated and closed appropriately, and checks that privileged activity is monitored.",
   "Exam questions look for coverage, tuning and response. 'Correlates events from many sources' is a SIEM. 'Automates response steps' is SOAR. 'Analysts ignoring alerts due to volume' is alert fatigue, fixed by tuning. 'Greatest weakness of a SIEM deployment' is often missing log sources or unreviewed alerts. 'Detects unusual behavior of a user' points to UEBA. 'Evidence monitoring works' is sampled alerts showing timely, documented investigation."
  ],
  "terms": [
   [
    "Security information and event management (SIEM)",
    "A system that collects, normalizes and correlates logs from many sources to detect and alert on security events."
   ],
   [
    "Correlation rule",
    "Logic in a SIEM that links related events across sources to identify suspicious patterns."
   ],
   [
    "Alert fatigue",
    "Desensitization caused by too many alerts, especially false positives, leading to real threats being missed."
   ],
   [
    "Security operations center (SOC)",
    "The team and function that monitors, triages and escalates security alerts."
   ],
   [
    "Security orchestration, automation and response (SOAR)",
    "Tools that automate and coordinate response actions using predefined playbooks."
   ],
   [
    "User and entity behavior analytics (UEBA)",
    "Analytics that baseline normal behavior of users and devices and flag deviations."
   ],
   [
    "Use case",
    "A defined threat scenario the monitoring program is designed to detect, with the data and rules needed."
   ]
  ],
  "example": "An attacker who has stolen a contractor's credentials logs in through the virtual private network at 03:00 from an unfamiliar country and starts querying the customer database. The SIEM correlates the unusual location, the off-hours login and the query volume, UEBA flags the contractor's behavior as abnormal, and a SOAR playbook disables the account and alerts the on-call analyst, who confirms the incident and hands it to incident response within 20 minutes.",
  "tip": "A SIEM with missing log sources or unreviewed alerts gives false comfort. Coverage checked against the asset inventory, continuous tuning and documented evidence that alerts are investigated are what make monitoring effective.",
  "check": [
   [
    "What does a SIEM do that individual system logs cannot?",
    "It centralizes and normalizes logs and correlates events across many sources to detect patterns no single log shows."
   ],
   [
    "What causes alert fatigue and how is it reduced?",
    "Too many alerts, especially false positives; it is reduced by tuning rules, prioritizing use cases by risk and automating routine triage."
   ],
   [
    "How can an auditor test SIEM coverage?",
    "Compare the list of active log sources with the asset inventory, focusing on critical systems, and check that silent sources trigger alerts."
   ],
   [
    "What evidence shows that alerts are properly handled?",
    "A sample of alerts with documented triage, investigation notes, timely closure or escalation according to procedures."
   ]
  ]
 },
 {
  "t": "Security incident response management, evidence collection and forensics",
  "body": [
   "Even strong defenses will sometimes fail. Incident response management limits damage, restores operations and learns from each event. An organization that prepares in advance, with a plan, a team and practice, responds faster and more consistently than one that improvises while systems are down and executives are asking questions. For the auditor, preparation is the most important thing to test, because by the time an incident happens it is too late to write the plan.",
   "Incident response follows a lifecycle, and the exam expects you to know the order. Preparation includes an approved policy and plan, a response team with defined roles and authority, contact lists covering legal, communications, management, insurers, law enforcement and regulators, tools and playbooks for common scenarios such as ransomware or account compromise, and regular exercises. Detection and analysis confirm that an incident has occurred and assess its scope, severity and the data involved. Containment stops the spread, for example by isolating hosts from the network, blocking addresses or disabling compromised accounts. Eradication removes the cause, such as malware, backdoors and attacker accounts, and closes the vulnerability used. Recovery restores systems, for example from known clean backups, and monitors closely for reinfection. The post-incident review, or lessons learned, captures what happened, what worked and what must change.",
   "Legal and regulatory requirements must be built into the plan. Many laws and contracts require notification of personal data breaches to regulators, customers or partners within set timeframes, so the plan should define who decides whether notification is needed and who communicates. Legal counsel should be involved early, both for notification and to protect the organization's position. Communication should go through designated spokespeople, and response teams should use out-of-band channels if the attacker may be reading email.",
   "Evidence collection supports investigation, insurance claims, disciplinary action and possible prosecution. Evidence should be collected in order of volatility, starting with the most volatile: processor registers and cache, memory, running processes and network connections, then temporary files, then disk contents, and finally remote logs and archived backups. Shutting a machine down too early destroys memory evidence, which is why response teams often isolate the network connection rather than pull the power. Forensic copies should be bit-for-bit images, verified by calculating a hash of the original and the copy, for example with `sha256sum disk.img`, and showing they match. Analysis is done on verified copies, never on the original, and write blockers prevent changes when disks are read.",
   "Chain of custody documentation records who collected each item, when and where, and every transfer, storage location and access afterward, so it can be shown in court or to a regulator that evidence was not altered. Forensic work requires trained staff or specialist firms, often arranged in advance through a retainer, because an untrained person trying to help can easily destroy or contaminate evidence.",
   "Consider a worked example. Ransomware encrypts a file server on a Monday morning. The team isolates the server from the network rather than shutting it down, captures memory, images the disk and records hashes and chain of custody forms. Analysis finds the attacker entered through a remote access account without multifactor authentication (MFA) and created two hidden administrator accounts. The team removes those accounts, resets credentials, confirms the last backups predate the intrusion and are clean, and only then restores. Legal counsel assesses whether personal data was taken. The lessons-learned review leads to MFA on all remote access and a new ransomware playbook.",
   "Common mistakes: restoring from backup before removing the attacker's access, so the attacker simply returns; wiping and rebuilding systems before collecting evidence; working on original media; missing notification deadlines because nobody owned the decision; failing to hold a lessons-learned review; and having a plan that has never been exercised. The auditor reviews whether the plan exists, is approved, tested and current; whether incidents are logged and classified; whether lessons learned lead to changes; and whether evidence handling procedures are defined.",
   "Exam questions often test order. 'First action on discovering an active incident' is usually containment after confirming it, not eradication or public announcement. 'Collect memory before disk' is order of volatility. 'Prove evidence was not altered' points to hashes and chain of custody. 'Analyze evidence' means on a verified copy. 'Most important phase for an auditor to review' is often preparation. 'Final phase' is the post-incident review."
  ],
  "terms": [
   [
    "Incident response plan",
    "An approved document defining roles, procedures and communications for handling security incidents."
   ],
   [
    "Containment",
    "Actions that limit the spread and impact of an incident, such as isolating systems or disabling accounts."
   ],
   [
    "Eradication",
    "Removing the cause of an incident, such as malware and attacker access, and closing the exploited weakness."
   ],
   [
    "Order of volatility",
    "The sequence for collecting evidence from most volatile, such as memory, to least volatile, such as archives."
   ],
   [
    "Chain of custody",
    "Documentation of who collected, handled, transferred and stored evidence, proving it was not altered."
   ],
   [
    "Forensic image",
    "A bit-for-bit copy of storage media, verified by hash values, used for analysis instead of the original."
   ],
   [
    "Write blocker",
    "A device or software that prevents any changes to media while it is being copied or examined."
   ]
  ],
  "example": "An employee reports that a colleague seems to be copying design files to a personal drive before resigning. HR and legal involve the security team, who image the laptop using a write blocker, record hashes and start a chain of custody form. Endpoint logs show hundreds of files copied to USB storage. Because the evidence was handled properly, the company can support its legal action, and the lessons-learned review leads to endpoint data loss prevention on design workstations.",
  "tip": "Collect evidence in order of volatility, work only on hash-verified copies and keep chain of custody. Before restoring after ransomware, make sure the attacker's access is removed and the backups are clean.",
  "check": [
   [
    "What are the main phases of the incident response lifecycle?",
    "Preparation, detection and analysis, containment, eradication, recovery and post-incident review."
   ],
   [
    "Why is memory collected before disk contents?",
    "Memory is more volatile and is lost when the system is powered off, so it must be captured first under the order of volatility."
   ],
   [
    "How is it shown that a forensic image matches the original?",
    "By computing hash values of the original and the image and showing they are identical, supported by chain of custody records."
   ],
   [
    "Why should the attacker's access be removed before restoring systems?",
    "Otherwise the attacker can use the same access to compromise the restored systems again."
   ]
  ]
 }
], { reviewed: "2026-09-30" });
