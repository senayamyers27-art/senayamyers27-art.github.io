/* Lessons for CompTIA Project+ (PK0-005): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("project-plus", [
 {
  "t": "Project basics: projects vs operations and programs, the triple constraint, and project roles (sponsor, project manager, PMO, team, stakeholders)",
  "body": [
   "A project is a temporary effort with a defined start and end that creates a unique product, service or result. Moving a company's email to a cloud service, building a new branch office network or rolling out a new ticketing tool are projects. Running the help desk every day, patching servers each month and answering password-reset calls are operations: they are ongoing and repetitive, and they keep the business running. Temporary does not mean short; it means the effort ends when its objectives are met, or when it is clear they cannot or should not be met. Projects often end by handing something over to operations, which is why the two groups need to work together from the start.",
   "Projects can be grouped. A program is a set of related projects managed together because coordinating them brings benefits you would not get managing them separately, for example a digital workplace program with separate projects for laptops, collaboration tools and training. The program manager watches the dependencies between those projects and the combined benefit. A portfolio is the collection of all projects, programs and even some operational work an organization is funding, chosen and balanced to meet its strategy. Portfolio managers decide which efforts get money at all; project managers deliver the efforts that were chosen.",
   "Every project is shaped by the triple constraint: scope (what will be delivered), time (the schedule) and cost (the budget). Quality sits in the middle, and many modern texts add risk and resources as further constraints. The key idea is that the constraints are linked. If the sponsor adds scope, time or cost must usually grow, or quality suffers. If the budget is cut, scope or quality usually shrinks. When an exam question describes a change to one constraint, ask what happens to the others, and remember that the project manager's job is to show those trade-offs to the people who decide, not to absorb them silently.",
   "The Project+ exam expects you to know who does what. The sponsor champions the project, provides or secures funding, approves the charter and major changes, and helps remove organizational obstacles the project manager cannot move alone. The project manager plans, coordinates and controls the work day to day and is accountable for delivering the agreed objectives. The project management office (PMO) sets standards, templates, methods and governance for projects across the organization and may provide coaching, tools or portfolio reporting. The project team does the work, often including subject matter experts (SMEs) who bring specialist knowledge. Stakeholders are anyone affected by or able to influence the project: users, customers, department heads, vendors, regulators.",
   "A few supporting roles also appear on the exam. A project coordinator or project scheduler supports the project manager with documentation, meeting logistics, schedule updates and status tracking, but usually has less decision authority. A product owner, on agile projects, owns the backlog and represents the customer. A functional manager (the line manager of a department) owns people and may lend them to the project. Knowing whose authority applies is often the whole question: the sponsor approves funding, the functional manager releases staff, the project manager directs project work.",
   "Consider a worked example. A regional hospital wants to replace its nurse call system. The chief nursing officer, who asked for it and controls the budget, is the sponsor and signs the charter. The PMO provides the charter template and requires monthly status reports in its standard format. A project manager from IT is assigned; a coordinator keeps the schedule and minutes. The team includes network engineers, the vendor's installers and two nurses acting as SMEs. Stakeholders include every ward manager, the facilities team, the service desk and the patients who press the buttons. When the vendor quotes more rooms than planned, the project manager shows the sponsor the options: more money, more time, or fewer rooms in phase one.",
   "Common mistakes: calling a monthly patch cycle a project (it repeats forever, so it is operations); treating a program as just a big project rather than a group of related projects; assuming the project manager approves the budget or the charter (the sponsor does); and thinking the PMO manages each project directly. Another frequent error is treating stakeholders as only the people in meetings. The service desk that will support the result and the users who will change how they work are stakeholders even if they never attend.",
   "Exam questions are usually written as short scenarios. 'Ongoing, repetitive work' points to operations; 'temporary, unique result' points to a project; 'several related projects coordinated for combined benefit' is a program; 'selected to meet strategic goals' is a portfolio. 'Who provides funding and signs the charter' is the sponsor. 'Who sets templates and standards across projects' is the PMO. 'The customer wants more features but the date is fixed' is a triple constraint question: the answer involves more cost, reduced quality or a formal trade-off decision."
  ],
  "terms": [
   [
    "Project",
    "A temporary endeavor with a defined beginning and end that creates a unique product, service or result."
   ],
   [
    "Operations",
    "Ongoing, repetitive work that keeps the business running, such as help desk support and routine patching."
   ],
   [
    "Program",
    "A group of related projects managed in a coordinated way to obtain benefits not available from managing them separately."
   ],
   [
    "Portfolio",
    "All the projects, programs and related work an organization funds, selected and balanced to meet strategic goals."
   ],
   [
    "Triple constraint",
    "The linked limits of scope, time and cost, with quality at the center, where changing one affects the others."
   ],
   [
    "Sponsor",
    "The senior person who champions the project, provides funding, signs the charter and approves major changes."
   ],
   [
    "Project management office (PMO)",
    "The group that sets project standards, templates and governance across the organization."
   ]
  ],
  "example": "A retailer launches a program to modernize its stores, with separate projects for new point-of-sale terminals, in-store Wi-Fi and staff training. The operations director sponsors the program and approves each project charter. The PMO provides a standard status report. When the Wi-Fi vendor's lead time slips by six weeks, the Wi-Fi project manager raises it, and the program manager moves the training project's dates so staff are not trained on a network that does not exist yet.",
  "tip": "Separate the sponsor from the project manager: the sponsor funds, authorizes and approves major changes; the project manager plans and runs the work. Ongoing work is operations, not a project.",
  "check": [
   [
    "Is monthly server patching a project or operations?",
    "Operations, because it is ongoing and repetitive rather than a temporary effort producing a unique result."
   ],
   [
    "The sponsor adds three new features but will not move the deadline. What is most likely to change?",
    "Cost (more resources) or quality, because the triple constraint links scope, time and cost."
   ],
   [
    "What distinguishes a program from a portfolio?",
    "A program groups related projects for coordinated benefits; a portfolio is all funded work selected to meet the organization's strategy, related or not."
   ],
   [
    "Who typically provides templates and governance standards for all projects?",
    "The project management office (PMO)."
   ]
  ]
 },
 {
  "t": "Change control process: change requests, impact assessment, change control board, approval, implementation and communicating changes",
  "body": [
   "Change is normal on projects: requirements become clearer, business priorities shift and problems appear. What matters is that changes are controlled. Change control is the formal process for proposing, evaluating, approving or rejecting and then implementing changes to the project's approved baselines for scope, schedule and cost. Without it, small untracked changes accumulate and the project drifts away from what was agreed, and nobody can explain later why it went over budget. Change control does not exist to say no; it exists to make sure every yes is a conscious decision with known consequences.",
   "The process usually follows the same steps. First, someone identifies the need and submits a change request, a written description of what should change and why. A request can come from anyone: the sponsor, a user, a vendor or a team member. Second, the project manager logs it in the change log with an ID, date, requester and status so it can be tracked. Third, the project manager and team perform an impact assessment: what the change will do to scope, schedule, cost, quality, resources and risk, and what happens if it is not made. Fourth, the change goes to the decision maker named in the change management plan, often a change control board (CCB) made up of the sponsor and key stakeholders. The CCB approves, rejects or defers it.",
   "If the change is approved, the project manager updates the affected baselines and documents (scope statement, work breakdown structure or WBS, schedule, budget, risk register) and then implements the change like any other work. The change is validated to confirm it was delivered as approved. Finally, the decision is communicated to everyone affected, including the person who asked for it, using the channels in the communication plan. Rejected and deferred changes are also recorded, with the reason, so the same request does not keep reappearing and there is an audit trail.",
   "Some organizations let the project manager approve small changes within agreed tolerances, for example up to two days of schedule impact or a small amount of money, and send larger ones to the CCB. The change management plan written during planning defines these thresholds, the forms or ticket types to use, and who sits on the board. Notice that the project manager rarely approves significant changes alone and never simply tells the team to start work on an unapproved request. Also separate the project CCB from the organization's change advisory board (CAB), which approves changes to production IT systems; a project deployment may need both.",
   "The order matters, and exam questions test it. The correct sequence is: identify and document the request, log it, assess impact, get a decision, update the plan and baselines, implement, validate, and communicate. A version of this can be pictured as a simple workflow.",
   "```text\nRequest -> Log -> Impact assessment -> CCB decision\n  approved -> update baselines -> implement -> validate -> communicate\n  rejected/deferred -> record reason -> communicate\n```",
   "Consider a worked example. Halfway through a customer portal project, the marketing director asks a developer to add a live chat feature. The developer redirects her to the project manager, who asks her to submit a change request. The impact assessment shows three extra weeks, a new software subscription and a security review. The CCB meets, weighs the benefit against the delay, and approves it for a second release instead of the current one. The project manager updates the release plan and backlog, logs the decision and emails the director and team explaining what was decided and why.",
   "Common mistakes: implementing a change first and documenting it later (outside a true emergency path); skipping impact assessment because the change 'looks small'; letting the requester or the project manager approve beyond their authority; and forgetting to communicate rejections. Another trap is updating the schedule without updating the budget and risk register, which leaves baselines inconsistent. Exam wording usually asks for the next step or the first thing to do. 'A stakeholder asks for a new feature' means the first step is a formal change request, not starting work or refusing outright. 'A change was requested; what next?' is impact assessment. 'Who decides?' is the CCB or the authority named in the change management plan. 'The change was approved; what next?' is update baselines and communicate."
  ],
  "terms": [
   [
    "Change control",
    "The formal process for evaluating and approving or rejecting changes to project baselines."
   ],
   [
    "Change request",
    "A formal written proposal to modify scope, schedule, cost or another baseline."
   ],
   [
    "Change log",
    "A record of all change requests with their status, decisions and dates."
   ],
   [
    "Impact assessment",
    "An analysis of how a proposed change would affect scope, schedule, cost, quality, resources and risk."
   ],
   [
    "Change control board (CCB)",
    "The group authorized to approve, reject or defer project change requests."
   ],
   [
    "Change management plan",
    "The planning document defining the change process, forms, approval thresholds and board membership."
   ]
  ],
  "example": "During an office relocation project, the facilities manager emails the project manager asking for two extra conference rooms to be wired. The project manager logs a change request, estimates the extra cabling, labor and a four-day delay, and presents it to the CCB. The board approves it, the project manager updates the scope statement, schedule and budget, and a note goes out to the cabling vendor, the facilities manager and the team.",
  "tip": "When a question asks what to do first after someone requests a change, the answer is to document it as a formal change request and assess its impact, not to implement it or refuse it.",
  "check": [
   [
    "A user asks a developer directly for a new report. What should happen?",
    "The request should be redirected into a formal change request, logged and assessed before any work begins."
   ],
   [
    "What is the step between logging a change request and the CCB decision?",
    "The impact assessment on scope, schedule, cost, quality, resources and risk."
   ],
   [
    "Why record rejected change requests?",
    "To keep an audit trail and stop the same request resurfacing without context."
   ],
   [
    "After a change is approved, what must the project manager update?",
    "The affected baselines and documents, such as the scope statement, schedule, budget and risk register, and then communicate the decision."
   ]
  ]
 },
 {
  "t": "Types of change: scope creep, gold plating, timeline, budget, resource, requirements and emergency changes",
  "body": [
   "Not all changes look the same, and the Project+ exam expects you to recognize the common types and how each should be handled. The idea behind all of them is the same: any change to what the project delivers, when it delivers or what it costs should pass through change control so the trade-offs are visible. What differs is where the change comes from, how urgent it is and which constraint it hits first.",
   "A scope change adds, removes or modifies deliverables. Scope creep is the uncontrolled version: features are added bit by bit without going through change control, often because users ask developers directly. Each addition looks small, but together they consume time and budget that were never approved. Gold plating is similar but comes from inside the team: someone adds extra features or polish the customer did not ask for, believing it adds value. Both are problems because the extra work is unplanned, untested against requirements and may introduce risk, including security risk from code nobody reviewed.",
   "A timeline (schedule) change moves dates, for example because a vendor delivery slipped or the business wants an earlier launch. A budget change increases or decreases funding, perhaps after a fiscal-year cut. A resource change adds, removes or swaps people or equipment, such as when a key engineer is reassigned to another project. A requirements change alters what the product must do, often after users see an early version and refine their needs. Each of these can ripple through the triple constraint, so each is assessed through the same change control process even if the request looks purely administrative.",
   "Some changes are forced on the project from outside: a new regulation, a merger, a vendor going out of business, a security vulnerability or a change in company strategy. These are sometimes called external or mandatory changes because the project has no real choice; the decision is how, not whether. Emergency changes must be made quickly to prevent serious harm, such as patching an actively exploited flaw in a system the project is deploying. Many organizations allow an expedited path where a smaller group or an on-call authority approves the change first and the full paperwork and review are completed afterward. The change is still documented and reviewed; only the timing differs.",
   "The best defenses against scope creep and gold plating are a clear, signed-off scope statement, a WBS (work breakdown structure) that shows exactly what is in scope, explicit exclusions, an easy way for people to submit change requests, and a team that knows to redirect informal requests into the process. Regular review of deliverables against requirements catches extras before they ship. In agile projects, new ideas go into the product backlog, where the product owner prioritizes them instead of adding them mid-sprint, which keeps change welcome but controlled.",
   "Consider a worked example. On a warehouse scanning project, three things happen in one month. Floor supervisors keep asking the developer for small screen tweaks, and he quietly adds them: scope creep. A tester, proud of the app, builds an animated dashboard nobody requested: gold plating. Then a critical vulnerability is announced in the scanner firmware, and the security team orders an immediate update before go-live: an emergency change. The project manager stops the informal tweaks and asks for change requests, has the dashboard removed or formally proposed, and follows the emergency path for the firmware, filing the paperwork the next day and reporting it to the CCB (change control board).",
   "Common mistakes: confusing scope creep with gold plating (the difference is the source: customers or users drive creep, the team drives gold plating); thinking gold plating is harmless because the customer gets more; treating emergency changes as exempt from documentation; and assuming that an external or regulatory change can skip impact assessment because it is mandatory. It still needs to be assessed so the schedule and budget can be adjusted honestly.",
   "Exam questions describe behavior and ask you to name it. 'Users keep asking for small additions that are not formally approved' is scope creep. 'A developer adds features he thinks the customer will like' is gold plating. 'A key resource is reassigned' is a resource change. 'A new law requires a change' is an external or mandatory change. 'A critical flaw must be fixed immediately' is an emergency change using an expedited approval path. When the question asks how to prevent creep, choose a clear scope baseline and enforced change control."
  ],
  "terms": [
   [
    "Scope creep",
    "Uncontrolled growth in scope through small additions that bypass change control."
   ],
   [
    "Gold plating",
    "Team members adding features or extras the customer did not request."
   ],
   [
    "Timeline change",
    "A change to planned dates or durations, such as a delayed delivery or an earlier deadline."
   ],
   [
    "Resource change",
    "Adding, removing or replacing people, equipment or other resources on a project."
   ],
   [
    "Requirements change",
    "A change to what the product must do, often after stakeholders refine their needs."
   ],
   [
    "Emergency change",
    "An urgent change approved through an expedited path to prevent serious harm, documented and reviewed afterward."
   ]
  ],
  "example": "Users of a new HR portal keep emailing the developers for small extra fields, and each is added without approval; three weeks later the project is behind schedule. The project manager reminds everyone that requests must go through change control, adds a simple request form to the project site, and reviews the backlog of informal additions with the CCB. Some are approved for release two, some are removed, and the schedule is rebaselined only for the approved ones.",
  "tip": "Scope creep comes from customers or users bypassing change control; gold plating comes from the team adding unrequested extras. Both are unapproved scope, and both are prevented by a clear baseline and enforced change control.",
  "check": [
   [
    "A programmer adds a feature the customer did not request because he thinks it is useful. What is this?",
    "Gold plating, because the addition comes from the team rather than the customer."
   ],
   [
    "Users keep requesting small changes directly from developers. What is this and how is it prevented?",
    "Scope creep, prevented by a clear scope baseline and routing every request through change control."
   ],
   [
    "How is an emergency change handled differently?",
    "It is approved quickly through an expedited path, but it is still documented and reviewed afterward."
   ],
   [
    "A new regulation requires extra reporting in the system. Does it still need impact assessment?",
    "Yes; the change is mandatory, but its effect on schedule, cost and risk must still be assessed and approved."
   ]
  ]
 },
 {
  "t": "Risk management activities: identification, qualitative and quantitative analysis, risk register, probability and impact matrix",
  "body": [
   "A risk is an uncertain event or condition that, if it happens, affects at least one project objective. Most risks are threats, but some are opportunities, such as a vendor releasing a faster product early. Risk management means finding these uncertainties early and planning for them, instead of reacting when they turn into problems. Once a risk actually happens, it becomes an issue, which is tracked in the issue log and handled now rather than planned for. That distinction, risk as future and uncertain versus issue as present and certain, is one of the most tested ideas on the exam.",
   "The work is described in the risk management plan, which sets the probability and impact scales, risk categories, roles and how often risks are reviewed. It then starts with risk identification. Common techniques include brainstorming with the team, interviewing experts, the Delphi technique (anonymous expert rounds that avoid groupthink), reviewing lessons learned from similar projects, checklists, assumption analysis (every unproven assumption is a possible risk) and SWOT analysis (strengths, weaknesses, opportunities, threats). Identification is not a one-time event; new risks appear throughout the project.",
   "Every identified risk goes into the risk register, which records a description, category, probability, impact, a score or rank, the risk owner, triggers (warning signs that the risk is about to happen), the planned response and its status. The register is a living document, reviewed throughout the project. A good description names cause and effect, for example 'because the vendor has one certified installer, installation may be delayed, which would delay go-live'.",
   "Next comes analysis. Qualitative analysis is quick and subjective: the team rates each risk's probability and impact on a scale such as low, medium and high, or 1 to 5, and multiplies or combines them into a score. Plotting the results on a probability and impact matrix, often colored as a heat map, shows which risks need attention first. Quantitative analysis puts numbers on the risk: expected monetary value (EMV, probability multiplied by impact in money), decision trees, sensitivity analysis or Monte Carlo simulations that model many possible outcomes. Quantitative analysis takes more effort and is usually reserved for the high-priority risks the qualitative pass has identified.",
   "```text\nEMV = probability x impact\nThreat: 20% x -$50,000 = -$10,000\nOpportunity: 30% x +$20,000 = +$6,000\n```",
   "After analysis, the team plans responses, assigns owners and then monitors risks: watching triggers, reassessing scores, closing risks that can no longer happen and adding new ones. Risk review is a standing agenda item in status meetings on well-run projects. The project manager coordinates risk management, but each risk should have an owner, the person best placed to watch it and carry out the response. Risk appetite and tolerance, set by the organization, decide how much risk is acceptable before action is required. A conservative bank will act on risks that a startup would simply accept. Keep the register honest: a risk rated low six months ago may be high today because the environment changed, and a register nobody updates gives false comfort to the sponsor reading the status report.",
   "Consider a worked example. A team migrating 300 laptops to a new operating system holds a risk workshop. They log that legacy accounting software may not run (probability 4, impact 5, score 20), that the vendor's imaging tool may arrive late (3 by 3, score 9), and that users may be unavailable during month-end (2 by 4, score 8). The heat map puts the accounting software in the red zone, so they run quantitative analysis: a 40 percent chance of a $30,000 remediation gives an EMV of $12,000. The finance manager is named owner, and the trigger is a failed compatibility test in the pilot.",
   "Common mistakes: logging issues as risks; assigning every risk to the project manager; rating risks once and never reviewing them; confusing qualitative (ranked, subjective) with quantitative (numeric, money or time); and forgetting opportunities. Exam wording follows patterns. 'Rank risks quickly using high, medium, low' is qualitative analysis. 'Calculate the expected monetary value' or 'Monte Carlo' is quantitative. 'Where are risks, owners and responses recorded' is the risk register. 'A warning sign that a risk is about to occur' is a trigger. 'The risk has now happened' means it is an issue and belongs in the issue log."
  ],
  "terms": [
   [
    "Risk",
    "An uncertain event or condition that, if it occurs, affects a project objective positively or negatively."
   ],
   [
    "Issue",
    "A risk or problem that has actually occurred and must be dealt with now."
   ],
   [
    "Risk register",
    "The living document listing each risk with its probability, impact, score, owner, triggers and response."
   ],
   [
    "Qualitative risk analysis",
    "Ranking risks by subjective probability and impact ratings to set priorities."
   ],
   [
    "Quantitative risk analysis",
    "Numerical analysis of risk effects, such as expected monetary value or Monte Carlo simulation."
   ],
   [
    "Expected monetary value (EMV)",
    "Probability multiplied by impact in money, used to compare and size risks."
   ],
   [
    "Risk trigger",
    "A warning sign indicating that a risk is about to occur or has occurred."
   ],
   [
    "Probability and impact matrix",
    "A grid that combines probability and impact ratings to prioritize risks, often shown as a heat map."
   ]
  ],
  "example": "Before a data center move, a project team brainstorms risks and adds them to the register. The risk that the new racks arrive late is rated high probability and high impact, so it lands in the red area of the heat map. The team runs a quantitative estimate of the cost of a two-week delay, assigns the procurement lead as owner, and sets the trigger as no shipping confirmation 30 days before the move date.",
  "tip": "A risk is uncertain and in the future; an issue has already happened. Qualitative analysis ranks with scales; quantitative analysis calculates with numbers such as EMV.",
  "check": [
   [
    "What is the difference between a risk and an issue?",
    "A risk is an uncertain future event; an issue is something that has already happened and must be handled now."
   ],
   [
    "Which analysis would you use to quickly prioritize 50 risks?",
    "Qualitative analysis, rating probability and impact on a scale and plotting them on a matrix."
   ],
   [
    "A risk has a 25 percent chance of costing $40,000. What is its EMV?",
    "0.25 x $40,000 = $10,000 of negative expected value."
   ],
   [
    "Where is the risk owner recorded?",
    "In the risk register, alongside the risk's description, scores, triggers and planned response."
   ]
  ]
 },
 {
  "t": "Risk responses: avoid, mitigate, transfer, accept, escalate, exploit, enhance and share; contingency and management reserves",
  "body": [
   "Once risks are analyzed, each high-priority risk gets a planned response. The response should fit the size of the risk, be affordable, be owned by one person and be agreed in advance, so that when the trigger appears nobody has to invent a plan under pressure. Project+ expects you to match a scenario to the right response and to know which responses apply to threats and which to opportunities.",
   "For threats (negative risks) there are four classic strategies. Avoid removes the threat by changing the plan: dropping an unproven product, extending the schedule or cutting risky scope. Mitigate reduces the probability or the impact: running a pilot, adding redundancy, rehearsing a migration or training users. Transfer shifts the financial impact or responsibility to a third party through insurance, warranties, outsourcing or a fixed-price contract; the risk still exists, but someone else pays or manages it if it happens. Accept means acknowledging the risk and not taking action in advance, either passively (deal with it if it happens) or actively by setting aside a contingency reserve of time or money.",
   "A fifth response, escalate, applies when the risk is outside the project's scope or beyond the project manager's authority, for example a risk to the whole company's network that the project only noticed. It is handed to the right owner, such as the sponsor, a program manager or the security team, and is then no longer managed by the project, though the project should confirm the handover was accepted.",
   "Opportunities (positive risks) have mirror-image responses. Exploit makes sure the opportunity happens, for example by assigning your best engineer so a task finishes early. Enhance increases its probability or impact, such as adding a tester to raise the chance of finishing ahead of schedule. Share gives part of it to a partner better able to capture it, such as a joint venture or a shared-savings clause with a vendor. Accept means you will take the benefit if it arrives but will not chase it. Escalate can apply to opportunities too, when the benefit belongs to the wider organization.",
   "Reserves are money or time set aside for risk. The contingency reserve covers identified risks that were accepted, the known unknowns, and is usually controlled by the project manager as part of the cost baseline. The management reserve covers unidentified risks, the unknown unknowns; it sits outside the cost baseline and using it normally requires management or sponsor approval. A fallback plan is what you do if the primary response fails, and a workaround is an unplanned response to a risk nobody planned for. Residual risk is what remains after a response; secondary risks are new risks created by the response itself, such as a new vendor dependency after transferring work.",
   "Consider a worked example. A team is deploying a new payroll system. Risk one: the chosen database version is new and unproven, so they avoid it by using the previous, supported version. Risk two: data conversion errors, so they mitigate with two rehearsal migrations. Risk three: hardware failure during the warranty year, which they transfer through a vendor support contract. Risk four: a minor delay in printed user guides, which they accept passively. They also spot an opportunity: the vendor offers early access to a feature that would cut training time, so they exploit it by scheduling their trainer into the early-access program. A contingency reserve of two weeks covers the migration risk, and the sponsor holds a management reserve.",
   "Common mistakes: thinking transfer removes the risk (it moves the consequences, and often creates secondary risks such as vendor dependency); confusing avoid (eliminate the cause) with mitigate (reduce likelihood or impact); treating accept as doing nothing when active acceptance means setting a reserve; and assuming the project manager can spend management reserve freely. Another trap is using exploit and enhance for threats; they apply to opportunities.",
   "Exam questions are scenario-based, so match clue words to responses. 'Buy insurance', 'fixed-price contract' or 'outsource' means transfer. 'Remove the risky feature' or 'change the approach entirely' means avoid. 'Add redundancy', 'test first', 'train users' means mitigate. 'The cost of responding is higher than the impact' points to accept. 'Beyond the project manager's authority' points to escalate. 'Assign the best resource to make sure the benefit happens' is exploit. 'Unknown unknowns' is management reserve; 'known unknowns' is contingency reserve. 'Something unplanned happened and the team improvised' is a workaround."
  ],
  "terms": [
   [
    "Avoid",
    "Changing the plan to eliminate a threat or its cause entirely."
   ],
   [
    "Mitigate",
    "Taking action to reduce the probability or impact of a threat."
   ],
   [
    "Transfer",
    "Shifting the impact of a threat to a third party, such as through insurance or a contract."
   ],
   [
    "Escalate",
    "Handing a risk to someone outside the project who has the authority or scope to manage it."
   ],
   [
    "Exploit",
    "Acting to make sure a positive risk definitely occurs."
   ],
   [
    "Contingency reserve",
    "Time or money in the baseline for identified, accepted risks (known unknowns), controlled by the project manager."
   ],
   [
    "Management reserve",
    "Budget outside the baseline for unidentified risks (unknown unknowns), released with management approval."
   ],
   [
    "Residual risk",
    "The risk that remains after a response has been applied."
   ]
  ],
  "example": "A project to open a new branch office depends on an internet circuit that the carrier might deliver late. The team mitigates by ordering early and escalating weekly with the carrier, and adds a fallback plan: a temporary cellular router if the circuit is not live a week before opening. The cost of cellular service is covered from the contingency reserve. When the circuit arrives three days late, the fallback is used and the office opens on time.",
  "tip": "Transfer moves the consequences to someone else but does not eliminate the risk. Contingency reserve is for known unknowns in the baseline; management reserve is for unknown unknowns outside it.",
  "check": [
   [
    "A team buys insurance against equipment damage. Which response is this?",
    "Transfer, because the financial impact shifts to the insurer."
   ],
   [
    "What response would you choose to make sure a positive opportunity definitely happens?",
    "Exploit."
   ],
   [
    "Which reserve covers unidentified risks, and who approves its use?",
    "The management reserve, outside the cost baseline, released by management or the sponsor."
   ],
   [
    "What is a secondary risk?",
    "A new risk that arises as a direct result of implementing a risk response."
   ]
  ]
 },
 {
  "t": "Communication management: communication plan, synchronous vs asynchronous methods, audience, frequency and tailoring",
  "body": [
   "Many project failures are really communication failures: the sponsor was surprised by a delay, users did not know a system was going down, or two teams worked from different versions of a document. Communication management is planning who needs what information, when, in what format and through which channel, and then making sure it happens. Project managers are often said to spend most of their time communicating, which is why the exam gives it so much attention. Good communication is also about listening: status meetings, surveys and one-on-one conversations tell you how stakeholders really see the project, which a report you send cannot.",
   "The communication plan (also called the communication management plan) is the key document. For each audience it lists the information they need (status, risks, decisions, schedule changes), the method (meeting, email, report, dashboard, chat), the frequency (daily, weekly, at milestones), the owner who sends it and any escalation path. It also notes constraints such as time zones, languages, confidentiality, security classification or accessibility needs. The plan is built during planning from the stakeholder register and is updated whenever stakeholders or their needs change, for example when a new department joins the rollout.",
   "Methods are often described as synchronous or asynchronous. Synchronous communication happens in real time with everyone present: meetings, phone and video calls, live instant messaging. It is best for complex discussion, negotiation, sensitive topics, conflict and quick decisions. Asynchronous communication lets people read and respond when they are available: email, shared documents, project boards, recorded videos, wikis and chat threads. It suits routine updates, reference information and teams spread across time zones, and it leaves a written record. Another useful distinction is push (sending to recipients, such as email or a newsletter), pull (people fetch it themselves, such as an intranet dashboard or shared repository) and interactive (two-way, such as a meeting or call).",
   "Tailoring means adjusting the message to the audience. Executives want short summaries: overall status, often as a red, amber or green indicator, key risks and decisions needed. The technical team needs detail. End users need to know what changes for them and when. Consider the channel as well: bad news or a conflict should be delivered in person or by call, not in a mass email, and confidential information such as layoffs or security findings must go only to authorized people through secure channels. Formal communication (reports, contracts, charter) differs from informal (hallway chats, quick messages), and important decisions made informally should be confirmed in writing. Accessibility matters too: captions on recorded videos and readable documents widen who can follow the project.",
   "The number of communication channels grows quickly with team size, which is why larger projects need more structure, such as a single source of truth for documents and a clear meeting cadence. The formula counts every possible two-person link.",
   "```text\nchannels = n x (n - 1) / 2\n5 people: 5 x 4 / 2 = 10\n6 people: 6 x 5 / 2 = 15  (one person added, five new channels)\n```",
   "Consider a worked example. A project is rolling out a new phone system across offices in London, Chicago and Singapore. The communication plan sends the steering committee a one-page status report every other Monday and holds a monthly synchronous review. The technical team uses a shared board and a short daily call scheduled at a time that works for two of the three regions, with recorded notes for the third. End users get an email two weeks and two days before their office cuts over, plus a pull-style intranet page with guides. When the Singapore cutover slips, the project manager phones the regional director first and then updates the written plan.",
   "Common mistakes: sending the same detailed report to everyone; relying only on email for bad news; forgetting remote or non-native-language stakeholders; and treating the communication plan as a one-time document. Exam questions often use clue words. 'Real time', 'immediate feedback' or 'sensitive discussion' points to synchronous. 'Different time zones', 'reference later' or 'routine update' points to asynchronous. 'Stakeholders access it when they need it' is pull. 'Who needs what, when and how' is the communication plan. 'Team grows from 5 to 8, how many channels are added' is a formula question: 28 minus 10, so 18 new channels."
  ],
  "terms": [
   [
    "Communication plan",
    "The document that defines who receives what information, when, how, how often and from whom."
   ],
   [
    "Synchronous communication",
    "Real-time exchange with participants present at the same time, such as meetings and calls."
   ],
   [
    "Asynchronous communication",
    "Communication people read and respond to on their own schedule, such as email and shared documents."
   ],
   [
    "Push communication",
    "Information sent to specific recipients, such as emails, memos or reports."
   ],
   [
    "Pull communication",
    "Information placed where recipients retrieve it themselves, such as a dashboard or intranet site."
   ],
   [
    "Communication channels",
    "The number of possible two-person links, calculated as n x (n - 1) / 2."
   ],
   [
    "Tailoring",
    "Adjusting content, detail and channel to fit a particular audience."
   ]
  ],
  "example": "A project team spans three time zones. The communication plan uses a shared project board and written daily updates for routine progress (asynchronous), a weekly video call for decisions (synchronous), and a one-page monthly summary for executives. When a vendor delay threatens the go-live date, the project manager calls the sponsor directly before sending the written update, so the sponsor hears the bad news personally and can ask questions.",
  "tip": "Synchronous means real time and suits complex or sensitive topics; asynchronous suits routine updates and distributed teams. Deliver bad news through an interactive channel, then confirm in writing.",
  "check": [
   [
    "How many communication channels exist on a team of 10?",
    "10 x 9 / 2 = 45 channels."
   ],
   [
    "Is an intranet dashboard push, pull or interactive?",
    "Pull, because stakeholders retrieve the information when they need it."
   ],
   [
    "Which method best suits a sensitive schedule slip that needs a decision from the sponsor?",
    "A synchronous, interactive method such as a call or meeting, followed by written confirmation."
   ],
   [
    "Where are audience, frequency and method for each stakeholder group recorded?",
    "In the communication plan."
   ]
  ]
 },
 {
  "t": "Stakeholder management: stakeholder register, power/interest grid, engagement and managing expectations",
  "body": [
   "A stakeholder is any person, group or organization that can affect, be affected by or believe they are affected by the project. For an IT project that includes the sponsor and team, but also end users, department managers, the service desk that will support the result, security and compliance teams, vendors, labor unions, and sometimes regulators or customers. Stakeholders you miss early tend to appear late with new requirements or objections, which is expensive because the design may already be built.",
   "Identification starts in initiating and continues through the project. The project manager reviews the charter, business case, organization charts, contracts and lessons learned, and asks each stakeholder who else should be involved. The results go into the stakeholder register, which lists each stakeholder's name, role, contact details, requirements and expectations, level of influence and interest, current attitude (supportive, neutral, resistant) and the desired level of engagement. Because it may contain frank notes about people, the register is often treated as sensitive and shared only with those who need it.",
   "A power/interest grid helps decide how much attention each stakeholder needs. High power, high interest: manage closely, involving them in decisions and keeping them in regular contact. High power, low interest: keep satisfied, giving them enough to stay comfortable without flooding them with detail. Low power, high interest: keep informed with regular updates, since they can still be valuable allies or sources of requirements. Low power, low interest: monitor with minimal effort. Other models use influence and impact, or a salience model that adds urgency and legitimacy, but the idea is the same: spend engagement effort where it matters most. Stakeholders can move between quadrants, so revisit the grid at each phase.",
   "Engagement is ongoing. The project manager builds trust, listens to concerns, shares progress honestly and involves stakeholders at the right moments, such as requirements workshops, demos and user acceptance testing. A stakeholder engagement assessment compares each person's current attitude with the desired one: if a department head is resistant but needs to be supportive, the plan names actions to close that gap, such as a one-on-one meeting or involving her team in the pilot. Resistant stakeholders are not enemies; their objections often reveal real risks. Record what you learn in the register and adjust the communication plan, because engagement that worked in planning may need to change as the project moves toward go-live.",
   "Managing expectations means making sure what people expect matches what the project will actually deliver. Confirm scope in writing, explain trade-offs openly, share bad news early with options, and never promise features or dates that have not been agreed through change control. Unmanaged expectations are a quiet cause of failure: a project can deliver exactly what was approved and still be seen as a failure because a powerful stakeholder expected something else.",
   "Consider a worked example. A university is replacing its student information system. The provost (sponsor, high power, high interest) is managed closely with fortnightly briefings. The chief financial officer has high power but little day-to-day interest, so she gets a short monthly summary and is consulted before budget decisions: keep satisfied. Registrar staff who will use the system daily have lower power but very high interest, so they are kept informed through newsletters and invited to demos. The campus parking office is barely affected and is monitored. When the registrar's team pushes for a feature that is out of scope, the project manager acknowledges the need, explains the change process and logs a request instead of promising it.",
   "Common mistakes: identifying stakeholders only at the start; treating the stakeholder register as a public contact list; giving every stakeholder the same level of attention; and managing expectations by saying yes to keep people happy. Another trap is ignoring low-power, high-interest groups, which can become a loud source of resistance at go-live.",
   "Exam questions usually give a stakeholder's position and ask for a strategy. 'High power, high interest' is manage closely. 'Executive with authority who rarely engages' is keep satisfied. 'End users who care a lot but have little authority' is keep informed. 'Where are attitudes and influence recorded' is the stakeholder register. 'A stakeholder is surprised by what was delivered' points to failed expectation management, and 'a new stakeholder appears late' points to incomplete identification."
  ],
  "terms": [
   [
    "Stakeholder",
    "Anyone who can affect, be affected by or perceive themselves affected by the project."
   ],
   [
    "Stakeholder register",
    "The document listing stakeholders with their roles, interests, influence, attitude and expectations."
   ],
   [
    "Power/interest grid",
    "A four-quadrant model used to classify stakeholders and choose an engagement strategy."
   ],
   [
    "Manage closely",
    "The strategy for high-power, high-interest stakeholders: involve them actively and communicate often."
   ],
   [
    "Keep satisfied",
    "The strategy for high-power, low-interest stakeholders: meet their needs without excessive detail."
   ],
   [
    "Engagement assessment",
    "A comparison of each stakeholder's current and desired engagement levels to guide actions."
   ],
   [
    "Expectation management",
    "Keeping stakeholders' expectations aligned with the agreed scope, schedule and outcomes."
   ]
  ],
  "example": "A hospital's chief medical officer has strong influence but little involvement in an electronic records upgrade. Nurses, who have low formal power, care intensely because the change affects their daily work. The project manager keeps the chief medical officer satisfied with short monthly briefings and keeps the nurses informed through weekly updates and hands-on demos, inviting two senior nurses to join acceptance testing so their concerns shape the final configuration.",
  "tip": "High power and high interest means manage closely; high power and low interest means keep satisfied. Do not confuse the stakeholder register (who and how they feel) with the communication plan (what, when and how to send).",
  "check": [
   [
    "Which quadrant receives the most active engagement on a power/interest grid?",
    "High power, high interest: manage closely."
   ],
   [
    "Why is the stakeholder register often treated as sensitive?",
    "It can contain candid notes about individuals' attitudes, influence and resistance."
   ],
   [
    "A powerful executive shows little interest in the project. What strategy fits?",
    "Keep satisfied: provide enough information to keep them comfortable without overloading them."
   ],
   [
    "What is the best way to manage expectations about a requested feature that is out of scope?",
    "Acknowledge it, explain the scope and change process, and log a change request rather than promising it."
   ]
  ]
 },
 {
  "t": "Resource management: resource types, allocation, leveling vs smoothing, shared resources and RACI charts",
  "body": [
   "Resources are everything the project needs to do its work: people (human resources), equipment such as laptops and test servers, facilities such as a training room, materials, software licenses and money. Physical resources need ordering, storing and tracking; human resources need skills, availability and motivation. Resources can be dedicated to the project full time or shared with operations or other projects. Shared resources are a frequent source of conflict: a network engineer who also handles outages may be pulled away at the worst moment, so the project manager negotiates availability with functional managers and records it in a resource calendar that shows when each person or asset is available.",
   "Resource planning estimates what is needed for each activity, then allocates specific resources to tasks. A resource histogram, a bar chart of hours per person per week, makes over-allocation easy to see. When a person is assigned more work than they can do in a period, they are over-allocated. Two techniques fix this. Resource leveling adjusts start and finish dates to resolve over-allocation, and it can move the project end date and change the critical path, often because a critical resource simply is not available. Resource smoothing moves work only within the float available, so the end date and critical path do not change, but it may not remove every conflict.",
   "Clear roles avoid confusion over who does what. A responsibility assignment matrix (RAM) maps work to people; the most common form is the RACI chart. Responsible: does the work. Accountable: owns the result, approves it and answers for it; there must be exactly one per task. Consulted: gives input before or during the work, two-way. Informed: kept up to date, one-way. A task with no A has no owner; a task with several A's has confusion. The same person can be both responsible and accountable on a small task.",
   "```text\nTask              PM   DBA  Security  Sponsor\nMigrate database  A    R    C         I\nApprove go-live   R    C    C         A\n```",
   "Other resource concerns on the exam include organizational structure. In a functional organization the functional manager controls people and the project manager has little authority; in a projectized one the project manager does; matrix organizations fall between, described as weak, balanced or strong depending on how much power the project manager holds. Also expect onboarding and offboarding team members (accounts, access, equipment, badges), training gaps, keeping a skills inventory, and handling benched resources who are idle between tasks. Removing access when someone leaves the project is also a security task that belongs on the offboarding checklist. Contractors and vendor staff need the same treatment, with accounts that expire on their contract end date rather than lingering for months.",
   "Consider a worked example. A project to upgrade 40 branch firewalls depends on Priya, the only engineer certified on the platform. The histogram shows her at 70 hours in week six because two branch cutovers and a design review overlap. The review has float, so the project manager first tries smoothing and moves it to week seven with no effect on the end date. That is not enough, so he levels: one cutover moves back a week, which extends the project by five days. He also asks Priya's functional manager to cover her on-call duty that week and notes in the RACI chart that she is responsible for cutovers while the network lead is accountable.",
   "Common mistakes: confusing leveling (may extend the schedule) with smoothing (stays within float); putting two A's on one RACI row; assuming the project manager controls people in a functional organization; and forgetting non-human resources such as test labs and licenses. Another trap is thinking Informed means two-way; consulted people give input, informed people only receive updates.",
   "Exam wording gives these away. 'Resolve over-allocation even if the end date moves' is leveling. 'Without changing the critical path or end date' is smoothing. 'Who approves and answers for the deliverable' is the A in RACI. 'Who must be asked for input' is C. 'Project manager has little authority and staff report to department heads' is a functional or weak matrix organization. 'A shared engineer keeps getting pulled into operational incidents' points to negotiating with the functional manager and updating the resource calendar."
  ],
  "terms": [
   [
    "Resource leveling",
    "Adjusting activity dates to resolve over-allocation, which can extend the project end date."
   ],
   [
    "Resource smoothing",
    "Adjusting activities only within available float so the end date and critical path do not change."
   ],
   [
    "Resource histogram",
    "A bar chart showing resource usage over time, used to spot over-allocation."
   ],
   [
    "Resource calendar",
    "A calendar showing when people and physical resources are available to the project."
   ],
   [
    "RACI chart",
    "A responsibility matrix marking who is Responsible, Accountable, Consulted and Informed for each task."
   ],
   [
    "Shared resource",
    "A person or asset split between the project and other projects or operations."
   ],
   [
    "Matrix organization",
    "A structure where staff report to both a functional manager and a project manager."
   ]
  ],
  "example": "A database administrator is assigned 60 hours of project work in one week while also supporting production. The project manager first moves a non-critical task within its float (smoothing), but the conflict remains, so she delays another task by a week (leveling), which pushes go-live back three days. She updates the RACI chart so the DBA is responsible for the migration and the infrastructure lead is accountable, and agrees the DBA's reduced on-call rota with her manager.",
  "tip": "Leveling can change the end date; smoothing never does. In a RACI chart each task has exactly one Accountable person, and Consulted is two-way while Informed is one-way.",
  "check": [
   [
    "Which technique resolves over-allocation even if the project finish date slips?",
    "Resource leveling."
   ],
   [
    "How many people should be Accountable for one task in a RACI chart?",
    "Exactly one."
   ],
   [
    "What is the difference between Consulted and Informed?",
    "Consulted people give input in two-way communication; Informed people only receive updates."
   ],
   [
    "In which organizational structure does the project manager have the least authority over staff?",
    "A functional organization, where functional managers control resources."
   ]
  ]
 },
 {
  "t": "Schedule development: activity sequencing, dependencies (FS, SS, FF, SF), critical path, float, milestones, crashing and fast-tracking",
  "body": [
   "A schedule turns the WBS (work breakdown structure) into dated activities. The project manager lists the activities needed to produce each work package, identifies milestones, estimates durations, then sequences them and finally assigns dates and resources. Sequencing is drawn as a network diagram, usually with the precedence diagramming method (PDM), where boxes (nodes) are activities and arrows are dependencies. The finished schedule is often shown as a Gantt chart, a bar chart of activities against a calendar, which is easier for stakeholders to read.",
   "There are four logical relationships. Finish-to-start (FS), the most common: B cannot start until A finishes (testing starts after development). Start-to-start (SS): B cannot start until A starts (documentation begins once coding begins). Finish-to-finish (FF): B cannot finish until A finishes (editing finishes after writing finishes). Start-to-finish (SF), the rarest: B cannot finish until A starts (the old system stays running until the new one starts). Dependencies are also classified: mandatory (hard logic, required by the nature of the work), discretionary (soft logic, preferred practice), external (outside the project, such as a landlord finishing electrical work) and internal. Lead time lets a successor start early; lag adds a wait, such as three days for concrete to cure.",
   "The critical path is the longest path through the network, and it sets the shortest possible project duration. Activities on it have zero total float, so any delay to them delays the project. Float (slack) is how long an activity can slip without delaying the project end (total float) or without delaying the next activity's early start (free float). To find it, add durations along every path; the longest is critical and each other path's float equals the critical length minus its own length. Milestones are zero-duration checkpoints marking significant events, such as 'design approved' or 'go-live'.",
   "```text\nPath A-B-D: 3 + 5 + 4 = 12 days  <- critical\nPath A-C-D: 3 + 2 + 4 =  9 days  (float 3 days on C)\n```",
   "When the schedule is too long, two compression techniques apply. Crashing adds resources, such as overtime or contractors, to critical path activities; it costs more, and you crash the cheapest activity per day saved first. Fast-tracking runs activities in parallel that were planned in sequence, usually by overlapping discretionary dependencies; it costs little money but raises risk and rework. Only compressing critical path work shortens the project, and after compression a different path may become critical, so recalculate after every change. Scheduling software does these calculations for you, but you still need to understand them to spot a wrong dependency, an unrealistic lag or a path that has quietly become critical after a vendor slip.",
   "Consider a worked example. A team is building a new branch network. Activities: order equipment (A, 10 days), survey the site (B, 4 days), install cabling (C, 6 days, after B), configure devices (D, 5 days, after A), install devices (E, 3 days, after C and D). Path A-D-E takes 18 days; path B-C-E takes 13. The critical path is A-D-E, and B and C share 5 days of float. The sponsor wants it done in 15 days. Crashing the survey would not help because it is not critical. Instead, the team pays for expedited shipping (crashing A to 7 days), which brings A-D-E to 15. Both paths are now checked again: 15 and 13, so the critical path is unchanged.",
   "Common mistakes: calling the critical path the shortest path (it is the longest); crashing or fast-tracking non-critical activities; confusing lag (waiting time) with lead (overlap); treating milestones as activities with duration; and forgetting that fast-tracking increases risk even though it saves money. Another trap is assuming total float and free float are the same.",
   "Exam questions often provide a small network and ask for the critical path, the float of an activity or the effect of a delay. Add each path carefully. Clue words help too. 'Add resources at extra cost' is crashing. 'Perform in parallel', 'overlap' or 'increased risk of rework' is fast-tracking. 'Activity can be delayed without affecting the finish date' is float. 'Old system must keep running until the new one starts' is start-to-finish. 'Wait two days after pouring' is lag. 'Zero duration, marks an event' is a milestone."
  ],
  "terms": [
   [
    "Critical path",
    "The longest sequence of dependent activities, which determines the shortest possible project duration."
   ],
   [
    "Total float",
    "How long an activity can be delayed without delaying the project finish date."
   ],
   [
    "Free float",
    "How long an activity can be delayed without delaying the early start of its successor."
   ],
   [
    "Finish-to-start (FS)",
    "The most common dependency: the successor cannot start until the predecessor finishes."
   ],
   [
    "Lag",
    "A required waiting time added between dependent activities."
   ],
   [
    "Crashing",
    "Shortening the schedule by adding resources to critical path activities, at extra cost."
   ],
   [
    "Fast-tracking",
    "Shortening the schedule by performing sequential activities in parallel, at increased risk."
   ],
   [
    "Milestone",
    "A zero-duration marker for a significant point or event in the schedule."
   ]
  ],
  "example": "A software release has two paths: design, build and test (20 days) and write documentation and review it (12 days). The first path is critical. When the sponsor asks for delivery five days earlier, the project manager fast-tracks by starting testing on completed modules while the rest are still being built, and crashes by paying a contract tester. He accepts the extra cost and rework risk, updates the risk register and rechecks which path is now critical.",
  "tip": "The critical path is the longest path and has zero float. Crashing adds cost; fast-tracking adds risk. Compressing activities that are not on the critical path does not shorten the project.",
  "check": [
   [
    "Path 1 is 14 days and path 2 is 10 days. What is the float on path 2?",
    "4 days, the difference between the critical path and path 2."
   ],
   [
    "Which compression technique increases cost, and which increases risk?",
    "Crashing increases cost; fast-tracking increases risk of rework."
   ],
   [
    "Which dependency type is most common?",
    "Finish-to-start."
   ],
   [
    "What happens to the project if a critical path activity slips by two days?",
    "The project end date slips by two days, because critical activities have zero float."
   ]
  ]
 },
 {
  "t": "Agile methodology: Scrum roles, events and artifacts, user stories, backlog refinement, velocity and Kanban",
  "body": [
   "Agile approaches deliver value in small, frequent increments and adapt as they learn, instead of fixing all requirements up front. They suit work where requirements are expected to change, such as new software or a customer-facing portal, and where users can give regular feedback. The Agile Manifesto values individuals and interactions over processes and tools, working software over comprehensive documentation, customer collaboration over contract negotiation, and responding to change over following a plan. The items on the right still matter; the items on the left matter more.",
   "Scrum is the most common agile framework. It has three accountabilities. The product owner owns the product backlog, orders it by value and accepts completed work; this is one person, not a committee. The scrum master is a servant leader who coaches the team and organization in Scrum, facilitates events and removes impediments, but does not assign tasks. The developers are a small, cross-functional, self-managing group who decide how to build the increment. Work happens in sprints, fixed timeboxes of one to four weeks that are not extended when work is unfinished.",
   "The Scrum events are sprint planning (choose backlog items and form a sprint goal), the daily scrum or standup (a short daily check, typically fifteen minutes, on progress toward the goal and blockers), the sprint review (show the increment to stakeholders and gather feedback) and the sprint retrospective (improve how the team works). The artifacts are the product backlog, the sprint backlog and the increment, which must meet the team's definition of done, a shared checklist such as 'code reviewed, tested, documented and deployable'. Progress is often shown on a burndown chart, which plots work remaining against time.",
   "Backlog items are often written as user stories: 'As a <role>, I want <capability> so that <benefit>', with acceptance criteria that say when the story is complete. Large stories are called epics and are split into smaller ones. Backlog refinement (grooming) is the ongoing work of clarifying, estimating and ordering upcoming items. Teams usually estimate in story points, a relative measure of effort and complexity, often using planning poker. Velocity is the number of points a team completes per sprint; averaged over several sprints, it forecasts how many sprints the remaining backlog will take. It is a planning tool for that team only, not a performance score to compare teams.",
   "Kanban is a flow-based method with no fixed sprints or prescribed roles. Work items move across a board with columns such as To do, In progress, Review and Done. Work-in-progress (WIP) limits cap how many items can sit in a column, which exposes bottlenecks and reduces multitasking. Kanban fits continuous, unpredictable work such as support and operations. Metrics include lead time (from request to delivery), cycle time (from work starting to delivery), throughput and the cumulative flow diagram, which shows where work piles up.",
   "Consider a worked example. A team is building a self-service password reset portal. The product owner writes 'As an employee, I want to reset my password with a code sent to my phone so that I do not have to call the service desk', with acceptance criteria covering lockout and logging. In sprint planning the team selects stories worth 30 points, close to its average velocity of 28. Midway, the security lead asks to add a new login screen; the scrum master directs the request to the product owner, who puts it in the product backlog for a later sprint. At the review, stakeholders try the portal; at the retrospective, the team agrees to write tests earlier.",
   "Common mistakes: thinking the scrum master is a project manager who assigns work; letting the sprint length change when work runs late; comparing velocity between teams; adding work mid-sprint without the product owner; and assuming agile means no documentation or planning. Another trap is mixing up the review (the product, with stakeholders) and the retrospective (the process, with the team).",
   "Exam clue words map neatly. 'Prioritizes the backlog' or 'accepts the work' is the product owner. 'Removes impediments' or 'servant leader' is the scrum master. 'What did I do, what will I do, what blocks me' is the daily standup. 'Demonstrate to stakeholders' is the sprint review; 'improve the process' is the retrospective. 'Points completed per sprint' is velocity. 'Limit items in progress', 'continuous flow' or 'no timeboxes' is Kanban."
  ],
  "terms": [
   [
    "Product owner",
    "The person accountable for maximizing value by owning and ordering the product backlog."
   ],
   [
    "Scrum master",
    "The servant leader who coaches the team in Scrum, facilitates events and removes impediments."
   ],
   [
    "Sprint",
    "A fixed timebox, usually one to four weeks, in which the team produces a usable increment."
   ],
   [
    "User story",
    "A short requirement written from a user's view, with acceptance criteria."
   ],
   [
    "Definition of done",
    "The shared quality checklist an increment must meet to be considered complete."
   ],
   [
    "Velocity",
    "The amount of work, usually in story points, a team completes per sprint, used for forecasting."
   ],
   [
    "WIP limit",
    "A cap on how many work items may be in a Kanban column at one time."
   ]
  ],
  "example": "An IT operations team handling unpredictable requests switches from two-week sprints to Kanban. They set a WIP limit of three items in Review and soon see work piling up there, revealing that only one person approves changes. They train a second reviewer, and average cycle time drops. Meanwhile the development team building a new portal keeps Scrum, using its average velocity of 25 points to forecast that the remaining 150 points need about six sprints.",
  "tip": "The product owner decides what and in what order; the scrum master coaches and removes impediments but does not assign work. Velocity forecasts one team's work and must not be used to compare teams.",
  "check": [
   [
    "Who orders the product backlog in Scrum?",
    "The product owner."
   ],
   [
    "A team's velocity averages 20 points and 120 points remain. How many sprints are needed?",
    "About six sprints."
   ],
   [
    "What is the purpose of a WIP limit in Kanban?",
    "To cap work in progress so bottlenecks become visible and multitasking drops."
   ],
   [
    "What is the difference between the sprint review and the sprint retrospective?",
    "The review inspects the product with stakeholders; the retrospective improves the team's process."
   ]
  ]
 },
 {
  "t": "Other methodologies: waterfall (predictive), hybrid, PRINCE2, Lean and Six Sigma (DMAIC), and choosing an approach",
  "body": [
   "Agile is not the only way to run a project, and Project+ expects you to choose the right approach for the situation. Waterfall, also called predictive or plan-driven, moves through phases in order: requirements, design, build, test, deploy. Scope, schedule and cost are planned in detail up front and controlled against baselines, and each phase is usually signed off at a phase gate before the next starts. It suits projects with stable, well-understood requirements, fixed-price contracts, heavy regulation or physical work that is hard to change later, such as cabling a building or installing a data center. Its weakness is that users may not see the product until late, when changes are expensive.",
   "A hybrid approach mixes the two. A common pattern is predictive for infrastructure, procurement and overall milestones, with agile sprints for the software parts. Another is using agile practices such as daily standups or Kanban boards inside a traditionally governed project, or running a predictive plan with iterative releases. Hybrid is very common in real IT organizations because budgets and contracts are often set annually while software work benefits from feedback.",
   "PRINCE2 (Projects IN Controlled Environments) is a process-based method widely used in the UK and Europe. It emphasizes a continued business justification, defined roles and responsibilities, learning from experience, management by stages (the project is divided into stages and the project board authorizes one at a time), management by exception using tolerances for time, cost, scope, quality, risk and benefits, a focus on products (deliverables), and tailoring to the environment. A project board, with an executive, a senior user and a senior supplier, makes key decisions, and the project manager escalates only when a tolerance is forecast to be exceeded.",
   "Lean comes from manufacturing and aims to maximize customer value by eliminating waste: waiting, rework and defects, unnecessary handoffs and motion, overproduction, excess inventory and unused talent. Value stream mapping, which draws every step from request to delivery and marks which steps add value, is a typical Lean tool, and Kanban grew out of Lean thinking. Six Sigma aims to reduce variation and defects using statistical data. Its improvement cycle is DMAIC: Define the problem, Measure current performance, Analyze root causes, Improve the process and Control it so the gains last. Lean Six Sigma combines both, removing waste and reducing variation.",
   "To choose, look at requirement stability, how available the customer is for feedback, regulatory and contractual constraints, risk, team size and experience, and organizational culture. Fixed, known requirements with formal sign-offs favor predictive. Evolving requirements and frequent feedback favor agile. A mix of hardware and software, or a governance model that demands fixed milestones, points to hybrid. Process improvement with measurable defects points to Six Sigma, and removing delays and handoffs points to Lean. Organizations required to show stage-by-stage justification may use PRINCE2.",
   "Consider a worked example. A regional bank has three initiatives. The first is building a new data center room: power, cooling, racks and cabling have fixed designs and inspections, so a predictive plan fits. The second is a mobile banking app whose features will change as customers react, so Scrum fits. The third is a loan approval process where 12 percent of applications are sent back with errors; the goal is fewer defects, so the team runs a DMAIC project, measuring the error rate, finding that a form field is ambiguous, fixing it and adding a control chart to watch the rate. A fourth, a branch network refresh with fixed hardware deliveries and an iterative configuration portal, is run as a hybrid.",
   "Common mistakes: assuming agile is always better; thinking waterfall forbids any change (it controls change through change control); mixing up Lean (waste) with Six Sigma (variation and defects); forgetting the order of DMAIC; and describing PRINCE2 as an agile framework. Another trap is thinking hybrid means no structure; a good hybrid defines clearly which parts are predictive and which are iterative.",
   "Exam clue words point to the approach. 'Requirements are well defined and unlikely to change', 'regulatory sign-off at each phase' or 'fixed-price contract' is waterfall. 'Customer wants to see working features often' is agile. 'Hardware delivery plus iterative software' is hybrid. 'Eliminate waste' or 'value stream' is Lean. 'Reduce defects and variation', 'statistical' or 'DMAIC' is Six Sigma. 'Management by exception', 'tolerances' or 'project board with senior user and senior supplier' is PRINCE2."
  ],
  "terms": [
   [
    "Waterfall (predictive)",
    "A sequential approach that plans scope, schedule and cost up front and moves through phases in order."
   ],
   [
    "Hybrid approach",
    "A mix of predictive and agile practices within one project or program."
   ],
   [
    "Phase gate",
    "A review at the end of a phase where approval is required to continue."
   ],
   [
    "PRINCE2",
    "A process-based method built on business justification, management by stages and management by exception."
   ],
   [
    "Lean",
    "An approach that maximizes customer value by eliminating waste in a process."
   ],
   [
    "Six Sigma",
    "A data-driven approach to reducing variation and defects in a process."
   ],
   [
    "DMAIC",
    "The Six Sigma cycle: Define, Measure, Analyze, Improve, Control."
   ]
  ],
  "example": "A company must meet a regulatory deadline for new data retention controls, with fixed requirements and an auditor's sign-off at each stage, so it runs the work as a waterfall project. At the same time its web team adds features to the customer portal in two-week sprints. The infrastructure upgrade that supports both uses a hybrid plan: predictive for hardware delivery and installation, agile for configuring the self-service dashboards users will test and refine.",
  "tip": "Stable, well-defined requirements and formal sign-offs point to predictive; changing requirements and frequent feedback point to agile. Lean removes waste; Six Sigma reduces variation with DMAIC.",
  "check": [
   [
    "Which approach suits a project with fixed regulatory requirements and phase sign-offs?",
    "Waterfall (predictive)."
   ],
   [
    "What does DMAIC stand for?",
    "Define, Measure, Analyze, Improve, Control."
   ],
   [
    "What does management by exception mean in PRINCE2?",
    "The project manager works within agreed tolerances and escalates to the project board only when a tolerance is forecast to be exceeded."
   ],
   [
    "A team wants to cut delays and handoffs in a request process. Which method fits best?",
    "Lean, which focuses on removing waste such as waiting and unnecessary handoffs."
   ]
  ]
 },
 {
  "t": "Team dynamics and conflict resolution: team development stages, conflict techniques, motivation and running effective meetings",
  "body": [
   "Projects are delivered by people, and new teams go through predictable stages. Bruce Tuckman's model describes them: forming (members are polite, unsure of roles and depend on the leader), storming (disagreements over roles, approaches and priorities surface), norming (the team agrees on ways of working and builds trust), performing (the team works effectively with little supervision) and adjourning (the work ends and the team disbands). Teams can slip back, for example into storming when a new member joins or priorities change, so the project manager adapts: more direction when forming, facilitation and coaching while storming, support when norming, and delegation when performing.",
   "Conflict is normal and can even improve decisions if handled well. Common sources on projects, in rough order of frequency, are schedules, priorities, resources, technical opinions, procedures, costs and personalities. Personality clashes are rarely the real root cause; they usually sit on top of a disagreement about work. The project manager should address conflict early, privately where possible, and focus on the issue rather than the person.",
   "Five techniques are widely taught. Collaborating (problem-solving, confronting) works through the issue openly to find a win-win solution that meets everyone's real needs, and usually gives lasting results; it is generally the preferred approach when there is time. Compromising (reconciling) has each side give something up, a lose-lose or partial win that is useful when both sides have equal power. Smoothing (accommodating) emphasizes agreement and downplays differences, which preserves relationships but may leave the root cause. Forcing (directing, competing) imposes one view, fast but damaging if overused; it fits emergencies, safety or security issues and legal requirements. Withdrawing (avoiding) postpones the issue, which can be useful to let emotions cool or when the issue is trivial, but does not solve it.",
   "Motivation matters too. People are motivated by recognition, meaningful work, growth, autonomy and fair rewards, not only money. Maslow's hierarchy of needs says people seek basic needs, then safety, belonging, esteem and self-actualization. Herzberg's two-factor theory separates hygiene factors (pay, working conditions, job security), whose absence causes dissatisfaction, from motivators (achievement, recognition, responsibility), which actually drive performance. Practical tools include recognizing good work publicly, providing training, giving people ownership of meaningful tasks and removing obstacles. Emotional intelligence, the ability to understand and manage your own emotions and read others', helps the project manager lead all of this.",
   "Meetings take a lot of project time, so run them well. Send an agenda in advance with the purpose and topics, invite only the people needed, start and end on time, use a timekeeper and a facilitator, stay on topic by moving unrelated items to a parking lot, and close by confirming decisions and action items with owners and due dates. Distribute minutes promptly. Ground rules, such as one conversation at a time and cameras on for key decisions, help virtual teams, as do rotating meeting times across time zones.",
   "Consider a worked example. Two weeks into a network refresh, the security engineer and the network lead argue in every meeting about whether to allow a legacy protocol during the migration. The team is storming. The project manager meets them together, lays out the requirement (the old printers need it for three months) and the risk (it is weak), and asks them to find an option that satisfies both. They agree to allow it only on an isolated printer segment with an end date: collaborating. Later, when a vendor technician wants to skip a mandatory safety step in the data center, the project manager simply says no: forcing, appropriate because safety is not negotiable.",
   "Common mistakes: treating withdrawal as a solution; using forcing as a default; assuming compromise is the best outcome (collaboration is usually better when time allows); thinking a performing team never goes back to storming; and believing money is the strongest long-term motivator. Also, confusing smoothing, which downplays differences, with collaborating, which resolves them.",
   "Exam questions describe behavior. 'Team members are polite and wait for direction' is forming. 'Arguments about roles and approach' is storming. 'Work through the issue together for a win-win' is collaborating. 'Each party gives something up' is compromising. 'Focus on areas of agreement' is smoothing. 'Project manager makes the decision immediately' is forcing, and 'postpone the discussion' is withdrawing. 'Salary and working conditions' are hygiene factors; 'recognition and achievement' are motivators."
  ],
  "terms": [
   [
    "Tuckman model",
    "A model of team development: forming, storming, norming, performing and adjourning."
   ],
   [
    "Collaborating",
    "Conflict resolution by working openly together toward a solution that meets everyone's needs."
   ],
   [
    "Compromising",
    "Conflict resolution where each side gives up something to reach agreement."
   ],
   [
    "Smoothing",
    "Conflict resolution that emphasizes agreement and downplays differences."
   ],
   [
    "Forcing",
    "Conflict resolution by imposing one decision, used for emergencies and non-negotiable issues."
   ],
   [
    "Withdrawing",
    "Avoiding or postponing a conflict, which does not resolve it."
   ],
   [
    "Hygiene factors",
    "Elements such as pay and working conditions whose absence causes dissatisfaction but which do not motivate on their own."
   ]
  ],
  "example": "Two developers disagree about whether to use a vendor's API or build an in-house integration, and progress stalls. The project manager brings them together with the requirements and the risk register, and they agree to use the API for release one with a documented plan to review it after six months. The agenda for the follow-up meeting is sent a day early, the meeting ends ten minutes early, and action items with owners are posted in the team channel.",
  "tip": "Collaborating is usually the best long-term technique when time allows; forcing fits emergencies and safety or legal issues; withdrawing only delays the problem. Storming is where conflict appears.",
  "check": [
   [
    "A new team is polite and relies heavily on the project manager for direction. Which stage is it in?",
    "Forming."
   ],
   [
    "Which conflict technique seeks a win-win outcome?",
    "Collaborating (problem-solving)."
   ],
   [
    "When is forcing an appropriate technique?",
    "In emergencies or when safety, security or legal requirements leave no room for negotiation."
   ],
   [
    "What should close every effective meeting?",
    "A summary of decisions and action items with owners and due dates, followed by minutes."
   ]
  ]
 },
 {
  "t": "Discovery and concept preparation: business case, feasibility, ROI and payback period, and preliminary scope",
  "body": [
   "Before a project exists, someone has an idea or a problem: the file server is out of space, customers want online ordering, a regulation requires new controls. The discovery or concept preparation phase decides whether that idea is worth turning into a project at all. Project+ treats it as the first phase of the life cycle, before initiating, and it matters because the cheapest time to stop a bad idea is before any money has been committed.",
   "The central document is the business case. It describes the problem or opportunity, the options considered (including doing nothing), the recommended option, the expected costs and benefits, key risks, and how the project supports the organization's strategy. Leadership uses it to decide whether to fund the project and to compare it with other requests competing for the same money. The business case is revisited throughout the project; if the justification disappears, for example because the business unit is sold, the project should be stopped.",
   "A feasibility study checks whether the idea can actually work: technically (can the existing network support voice over IP?), operationally (can the service desk support it?), financially (can we afford it?), legally and in terms of schedule. It may include a proof of concept (PoC), a small test showing that the technology works in principle, or a pilot with real users. Current-state and future-state analysis describe where the organization is and where it wants to be, and gap analysis identifies what must change to get there. Interviews with key stakeholders and a review of existing systems feed into this.",
   "Financial measures help compare options. Return on investment (ROI) compares net benefit with cost: `ROI = (benefit - cost) / cost`, so a $100,000 project returning $150,000 has an ROI of 50 percent. The payback period is how long it takes for savings to repay the investment: `payback = cost / annual savings`, so $120,000 at $40,000 per year pays back in three years. Simple ROI and payback ignore when the money arrives. Net present value (NPV) and internal rate of return (IRR) account for the time value of money, meaning a dollar today is worth more than a dollar in five years; a positive NPV is favorable, and a higher IRR is better. Cost-benefit analysis lists and compares all costs and benefits, including intangible ones such as morale or reputation.",
   "Discovery also produces a preliminary scope: a first view of what is in and out, major deliverables, high-level requirements, known constraints and assumptions, and a rough order of magnitude (ROM) estimate, often given with a wide range such as minus 25 to plus 75 percent. The ROM is deliberately rough; it will be refined into budget and definitive estimates later. The output goes forward to initiating, where the charter formalizes it.",
   "Consider a worked example. A manufacturer's help desk takes 2,000 password-reset calls a month. The business case compares three options: do nothing, hire another technician, or buy a self-service reset tool. The feasibility study confirms the tool integrates with the existing directory and that a pilot with 50 users works. The tool costs $60,000 up front and is expected to save $30,000 a year in help desk time, so the payback period is two years. Over three years the benefit is $90,000, an ROI of 50 percent. The preliminary scope includes all office staff but excludes factory kiosks, and the ROM is $50,000 to $100,000. Leadership approves the idea and moves it to initiating.",
   "Common mistakes: confusing the business case (why and whether) with the charter (formal authorization); leaving 'do nothing' out of the options; treating a ROM as a commitment; preferring a longer payback period (shorter is better); and forgetting that NPV considers the time value of money while simple payback does not. Another trap is doing the feasibility study after the project is approved, when the decision it was meant to inform has already been made.",
   "Exam questions tend to use clue words. 'justifies the investment' or 'compares options' is the business case. 'Can it be done' is feasibility. 'How long until the savings cover the cost' is payback period. 'Accounts for the time value of money' is NPV or IRR. 'Early, wide-range estimate' is ROM. When comparing projects, choose the higher NPV, higher ROI or shorter payback."
  ],
  "terms": [
   [
    "Business case",
    "The document that justifies a proposed project by comparing options, costs, benefits and risks."
   ],
   [
    "Feasibility study",
    "An assessment of whether a proposed project is technically, operationally, financially and legally workable."
   ],
   [
    "Return on investment (ROI)",
    "Net benefit divided by cost, expressed as a percentage."
   ],
   [
    "Payback period",
    "The time needed for savings or benefits to repay the initial investment."
   ],
   [
    "Net present value (NPV)",
    "The value today of future cash flows minus the investment; positive NPV is favorable."
   ],
   [
    "Rough order of magnitude (ROM)",
    "An early, wide-range estimate used to decide whether to proceed."
   ],
   [
    "Gap analysis",
    "A comparison of the current state with the desired future state to identify what must change."
   ]
  ],
  "example": "A school district considers replacing aging classroom projectors. The business case compares doing nothing, repairing units as they fail, and buying interactive displays. A feasibility study tests three displays in one school. The chosen option costs $200,000 and saves $50,000 a year in lamp replacements and repair calls, a four-year payback period. The superintendent approves it based on the business case, and the project moves to initiating with a preliminary scope and a ROM estimate.",
  "tip": "The business case justifies whether to do the project; the charter authorizes it. When comparing options, prefer higher NPV, higher ROI and a shorter payback period.",
  "check": [
   [
    "A project costs $90,000 and saves $30,000 a year. What is its payback period?",
    "Three years ($90,000 divided by $30,000 per year)."
   ],
   [
    "Which financial measure accounts for the time value of money?",
    "Net present value (NPV), and also internal rate of return (IRR)."
   ],
   [
    "What question does a feasibility study answer?",
    "Whether the idea can realistically work technically, operationally, financially, legally and on schedule."
   ],
   [
    "Why should 'do nothing' appear in a business case?",
    "It gives a baseline for comparing the costs and benefits of every other option."
   ]
  ]
 },
 {
  "t": "Initiating: project charter, sponsor authorization, high-level scope, assumptions, constraints and success criteria",
  "body": [
   "Initiating turns an approved idea into an official project. Its most important output is the project charter, a short document that formally authorizes the project, names the project manager and gives them authority to apply organizational resources to the work. The sponsor, or another person with authority outside the project, signs it. Until the charter is signed, the project does not formally exist, and a project manager who starts spending money or booking people without one is taking a real risk.",
   "A charter typically contains the project's purpose and business justification (often summarized from the business case), measurable objectives, high-level scope and requirements, major deliverables, summary milestones, a summary budget, key stakeholders, high-level risks, assumptions, constraints, success and acceptance criteria, exit criteria, the project manager's name and authority level, and the sponsor's approval. It is intentionally high level; the detail comes in planning. A charter rarely changes after signing, and when it does, the sponsor approves the change.",
   "Assumptions and constraints are easy to confuse. An assumption is something the team believes to be true for planning but has not proven, such as 'the vendor will deliver in 30 days' or 'users will be available for testing in March'. Each assumption is a potential risk and should be recorded in an assumption log and validated as the project proceeds. A constraint is a known limit the project must work within: a fixed deadline, a budget cap, a mandated technology, a regulation, limited staff or a blackout period when changes are not allowed. Assumptions can turn out false; constraints are given.",
   "Success criteria define how everyone will know the project succeeded. Good criteria are measurable, for example 'all 400 users migrated with no more than 1 percent help desk tickets in the first week' or 'go-live by June 30 within $250,000'. Agreeing on them early prevents arguments at closing. Many organizations write objectives using SMART (specific, measurable, achievable, relevant, time-bound) and note what is explicitly out of scope, which is one of the best defenses against later scope creep. Key performance indicators (KPIs) may be named so that benefits can be measured after handover.",
   "The charter also connects to governance. It tells the PMO (project management office) that the project exists, sets the reporting line to the sponsor or steering committee, and states what the project manager may decide alone, for example approving spending up to a threshold. That authority matters later: when a vendor or functional manager questions a decision, the charter is the reference. The charter also becomes an input to nearly every planning document: the scope statement expands its high-level scope, the schedule expands its milestones, and the budget expands its summary figure. If those later documents contradict the charter, either the plan is wrong or the charter needs the sponsor's formal update.",
   "Consider a worked example. A logistics company approves the business case for a new warehouse management system. The project manager drafts the charter: purpose (reduce picking errors), objectives (errors below 0.5 percent within three months of go-live), high-level scope (two warehouses, not the returns center), milestones, a budget of $400,000, and the key stakeholders. She lists assumptions (handheld scanners will arrive by April, warehouse supervisors can attend two days of training) and constraints (go-live must avoid the holiday peak, the solution must integrate with the existing finance system). The chief operating officer signs it, and the project begins.",
   "Common mistakes: letting the project manager sign their own charter; filling the charter with detailed task lists; treating assumptions as facts and never checking them; writing vague success criteria such as 'users are happy'; and starting work before authorization. Another trap is confusing the charter with the project management plan, which is the detailed how and comes later in planning.",
   "Exam wording is consistent. 'Formally authorizes the project' or 'gives the project manager authority' is the charter. 'Who signs it' is the sponsor. 'Believed true but not verified' is an assumption. 'Fixed deadline', 'budget cap' or 'mandated tool' is a constraint. 'How will we measure success' points to success criteria. If a question asks what the project manager should do first when assigned a new project without a charter, the answer is to get the charter created and signed."
  ],
  "terms": [
   [
    "Project charter",
    "The document that formally authorizes a project and gives the project manager authority to use resources."
   ],
   [
    "Assumption",
    "A factor considered true for planning without proof, which should be logged and validated."
   ],
   [
    "Constraint",
    "A known limit the project must work within, such as a deadline, budget or mandated technology."
   ],
   [
    "Assumption log",
    "A record of assumptions and constraints, reviewed and validated throughout the project."
   ],
   [
    "Success criteria",
    "Measurable conditions that define whether the project has achieved its objectives."
   ],
   [
    "SMART objectives",
    "Objectives that are specific, measurable, achievable, relevant and time-bound."
   ]
  ],
  "example": "A charter for a VPN replacement names the project manager, sets a budget limit and a deadline before the old VPN's support contract ends (constraints), and states the assumption that all laptops support the new client. Early testing shows 60 older laptops do not, so the assumption becomes a risk, then an issue: a change request adds hardware replacement for those laptops, approved by the sponsor who signed the charter.",
  "tip": "An assumption is believed true but unverified and is a potential risk; a constraint is a known limit. The charter is signed by the sponsor, not the project manager, and formally authorizes the project.",
  "check": [
   [
    "Who normally signs the project charter?",
    "The sponsor or another authority outside the project."
   ],
   [
    "'Users will be available for testing in March' is an example of what?",
    "An assumption, because it is believed true but not yet confirmed."
   ],
   [
    "'The project must go live before the end of the fiscal year' is an example of what?",
    "A constraint, a fixed limit the project must work within."
   ],
   [
    "Why are measurable success criteria important in the charter?",
    "They define how success will be judged and prevent disputes at closing."
   ]
  ]
 },
 {
  "t": "Initiating: identifying stakeholders, assigning the project manager, and holding the kickoff meeting",
  "body": [
   "Alongside the charter, initiating identifies the people involved. The project manager is assigned as early as possible, ideally while the charter is being written, so they understand the reasoning behind the project and can help shape it. The charter records their authority: for example, whether they can approve spending up to a limit, choose team members or approve small changes. A project manager assigned only after planning is finished inherits commitments they never agreed to.",
   "Stakeholder identification begins here. The project manager reviews the charter, business case, organizational chart, contracts and lessons learned from similar projects, and interviews the sponsor and key managers to find everyone who will be affected. Techniques include brainstorming, questionnaires and asking each stakeholder who else should be involved, since a single missing department can derail requirements later. The results go into the stakeholder register with each person's role, interests, influence and expectations. Early identification lets the project manager plan engagement before surprises happen, and the register is revisited throughout the project as people change roles. Frank notes about attitude and influence make the register sensitive, so share it only with those who need it.",
   "Initiating is also when the team starts to take shape. The project manager works with functional managers to get key people committed, requests accounts, equipment and access, and makes sure the team has the tools it will need, such as a project workspace, document repository or ticket queue. On many projects, a responsibility assignment matrix is sketched at this stage so everyone knows who owns which area. Access should follow least privilege, giving each person only what their role requires, from the start.",
   "The kickoff meeting formally launches the project with the sponsor, team and key stakeholders. Its purpose is shared understanding and commitment: the project's goals and business reason, high-level scope and what is out of scope, milestones, roles and responsibilities, how communication and decisions will work, the change control process, known risks and immediate next steps. The sponsor often opens it to show support and confirm the project's priority. Some organizations hold an internal kickoff with the team and a separate external one with the customer or vendor. After the meeting, the project manager distributes minutes and the presentation so everyone has the same record.",
   "Timing of the kickoff varies by source and organization: some treat it as the last step of initiating, others as the first event of planning or execution once the plan is ready. For Project+, remember what it is for rather than debating exactly when: it happens once the project is authorized and the team is known, and it launches the project with a shared understanding. It is not the meeting where detailed requirements are gathered or the charter is approved. Keep it focused and reasonably short; an agenda sent in advance, a clear owner for each topic and time for questions make it far more useful than a long slide presentation.",
   "Consider a worked example. A city government authorizes a project to put building permits online. The IT director (sponsor) assigns a project manager while the charter is drafted. The project manager interviews the permits office, finance, legal, the web team, the contractor association and the call center, and discovers that the fire department reviews certain permits, a group nobody had listed. She adds them to the register. The kickoff agenda covers purpose, scope (residential permits first, commercial later), roles, a meeting cadence, the change process and key risks. The sponsor opens by explaining why it matters to citizens, and minutes go out the next morning.",
   "Common mistakes: assigning the project manager late; identifying stakeholders only from the org chart; holding a kickoff without the sponsor; using the kickoff to argue about detailed requirements; and not sending minutes. Another trap is thinking the kickoff authorizes the project; the signed charter does that.",
   "Exam questions follow patterns. 'Meeting to align everyone on goals, roles and communication at the start' is the kickoff meeting. 'A department appears late with new requirements' points to incomplete stakeholder identification. 'Where are stakeholders' interests and influence recorded' is the stakeholder register. 'What gives the project manager authority' is the charter. 'Who should open the kickoff to show support' is the sponsor. 'What should happen right after the kickoff' is distributing minutes and action items."
  ],
  "terms": [
   [
    "Kickoff meeting",
    "The meeting that formally launches the project and aligns the sponsor, team and stakeholders on goals, roles and processes."
   ],
   [
    "Stakeholder identification",
    "The ongoing process of finding everyone who affects or is affected by the project."
   ],
   [
    "Stakeholder register",
    "The document recording stakeholders with their roles, interests, influence and expectations."
   ],
   [
    "Project manager authority",
    "The decision rights granted to the project manager, documented in the charter."
   ],
   [
    "Functional manager",
    "The manager of a department who controls staff that may be assigned to the project."
   ],
   [
    "Least privilege",
    "Granting each person only the access their role requires."
   ]
  ],
  "example": "At the kickoff for a new payroll system, the sponsor explains why the change is needed, the project manager presents scope, milestones and the RACI chart, and the vendor explains the implementation method. The HR director mentions that the union must be consulted on shift pay rules, a stakeholder nobody had listed. The project manager adds the union representative to the stakeholder register, schedules a meeting and includes the decision in the minutes sent the next day.",
  "tip": "The charter authorizes the project; the kickoff launches it and builds shared understanding. A stakeholder surfacing late with new demands points to incomplete stakeholder identification.",
  "check": [
   [
    "What is the main purpose of the kickoff meeting?",
    "To align the sponsor, team and key stakeholders on goals, scope, roles, communication and next steps."
   ],
   [
    "Why should the project manager be assigned early?",
    "So they understand the reasoning behind the project and can help shape the charter before commitments are made."
   ],
   [
    "Where should a newly discovered stakeholder be recorded?",
    "In the stakeholder register."
   ],
   [
    "Does the kickoff meeting authorize the project?",
    "No; the signed charter authorizes it, and the kickoff launches the work."
   ]
  ]
 },
 {
  "t": "Planning: requirements gathering, scope statement, work breakdown structure (WBS) and WBS dictionary",
  "body": [
   "Planning turns the charter's high-level view into a plan the team can follow, and scope planning comes first because everything else, the schedule, budget and risk register, is built on it. It begins with requirements: the conditions or capabilities the product must have. Business requirements describe why the organization needs it ('reduce password-reset calls by half'); functional requirements describe what the product must do ('users can reset their own password'); non-functional requirements describe qualities such as performance, availability, security, usability and accessibility ('the reset page loads in under two seconds and supports multifactor authentication'). Missing non-functional requirements are a classic cause of systems that work in a demo but fail in production.",
   "Requirements are gathered through several techniques, each suited to a situation. Interviews give depth with key individuals. Workshops and joint application design (JAD) sessions bring cross-functional groups together to agree quickly. Focus groups gather opinions from a representative group. Surveys and questionnaires reach many or dispersed people. Observation or job shadowing reveals what people actually do, which may differ from what they say. Prototypes and mockups let users react to something concrete. Document analysis reviews existing procedures, contracts and system documentation. A requirements traceability matrix (RTM) links each requirement to its source, the deliverable that satisfies it and the test that verifies it, so nothing is lost and nothing unrequested sneaks in.",
   "The scope statement describes the project and product scope in detail: a description of the product, the deliverables, acceptance criteria, exclusions (what is explicitly not included), assumptions and constraints. Clear exclusions prevent later arguments, for example 'mobile app support is out of scope' or 'data older than seven years will not be migrated'. The scope statement is more detailed than the charter's high-level scope and is the reference for deciding whether a request is a change.",
   "The work breakdown structure (WBS) is a hierarchical decomposition of the total scope into smaller, manageable pieces. The top level is the project, the next level is usually major deliverables or phases, and the lowest level is the work package, small enough to estimate, assign and track, often described with a rule of thumb of no more than a couple of weeks of effort. The 100 percent rule says the WBS must include all of the work, and only the work, of the project, including project management itself; if something is not in the WBS, it is not in scope. A WBS is organized around deliverables (nouns), not activities (verbs); activities are derived from work packages when building the schedule.",
   "The WBS dictionary provides details for each element: a code of accounts identifier, description, owner, acceptance criteria, estimated cost and duration, dependencies and resources. Together, the scope statement, WBS and WBS dictionary form the scope baseline, which is approved and then changed only through change control. In agile projects, the prioritized product backlog plays a similar role, with epics and user stories instead of a formal WBS, and the scope evolves sprint by sprint within a fixed timebox and budget.",
   "Consider a worked example. A project will move a company's file shares to a cloud collaboration service. The analyst interviews department heads, runs a workshop with power users, shadows the legal team (who turn out to need a retention hold feature) and reviews the current permissions report. The scope statement lists deliverables and excludes personal drives. The WBS has level-two elements for Planning and management, Tenant configuration, Migration, Training and Support handover. Under Migration, the work packages are Finance data, HR data and Engineering data. Each gets a dictionary entry with an owner and acceptance criteria such as 'all files present and permissions verified by the department head'.",
   "Common mistakes: writing WBS elements as tasks ('configure tenant') instead of deliverables ('configured tenant'); leaving project management work out of the WBS, which breaks the 100 percent rule; forgetting non-functional and security requirements; skipping exclusions; and confusing the WBS (what) with the schedule (when). Another trap is gathering requirements from managers only; the people who will use the system daily often know the real needs.",
   "Exam clue words point to the answer. 'Hierarchical decomposition of deliverables' is the WBS. 'Lowest level of the WBS' is the work package. 'Details such as owner and acceptance criteria for each element' is the WBS dictionary. 'Links requirements to tests and sources' is the traceability matrix. 'Many geographically dispersed users' points to surveys; 'users cannot explain what they do' points to observation; 'users need to see it before they can say' points to prototyping. 'Scope statement plus WBS plus WBS dictionary' is the scope baseline."
  ],
  "terms": [
   [
    "Functional requirement",
    "A statement of what the product must do, such as a feature or function."
   ],
   [
    "Non-functional requirement",
    "A quality the product must have, such as performance, availability or security."
   ],
   [
    "Requirements traceability matrix",
    "A table linking each requirement to its source, deliverable and test."
   ],
   [
    "Scope statement",
    "A detailed description of deliverables, acceptance criteria, exclusions, assumptions and constraints."
   ],
   [
    "Work breakdown structure (WBS)",
    "A hierarchical decomposition of the total project scope into deliverables and work packages."
   ],
   [
    "Work package",
    "The lowest level of the WBS, small enough to estimate, assign and control."
   ],
   [
    "WBS dictionary",
    "A document giving detailed information about each WBS element."
   ],
   [
    "Scope baseline",
    "The approved scope statement, WBS and WBS dictionary, changed only through change control."
   ]
  ],
  "example": "For a new intranet, the project team runs workshops with department heads, sends a survey to all 800 staff, and builds a clickable prototype. The scope statement lists deliverables and excludes a mobile app. The WBS breaks the work into Design, Content migration, Search, Integrations, Training and Project management, each decomposed into work packages. When a manager later asks for a mobile app, the exclusion in the scope statement makes it clear this is a change request.",
  "tip": "The WBS decomposes deliverables (nouns), not activities (verbs), and the 100 percent rule means everything in scope is in the WBS. The work package is the lowest level.",
  "check": [
   [
    "What is the lowest level of the WBS called?",
    "The work package."
   ],
   [
    "What makes up the scope baseline?",
    "The approved scope statement, WBS and WBS dictionary."
   ],
   [
    "Which requirements technique suits 1,000 users across many locations?",
    "Surveys or questionnaires."
   ],
   [
    "What does the 100 percent rule require?",
    "That the WBS includes all of the project's work and nothing outside its scope."
   ]
  ]
 },
 {
  "t": "Planning: estimating time and cost (analogous, parametric, three-point/PERT, bottom-up) and setting baselines",
  "body": [
   "Once work packages and activities are known, the team estimates how long each will take and what it will cost. Estimates are best made by the people who will do the work, and they should state their assumptions and a range, because every estimate is uncertain. Accuracy usually improves as the project progresses, which is why early estimates are rough (a rough order of magnitude, or ROM) and later ones are refined into budget and definitive estimates. This is called progressive elaboration. Present an estimate as a range, such as 8 to 10 weeks, rather than a single date whenever you can, so stakeholders understand the uncertainty instead of treating a guess as a promise.",
   "Analogous (top-down) estimating uses the actual duration or cost of a similar past project, adjusted for known differences. It is fast, cheap and useful early when detail is limited, but only as accurate as the similarity. Parametric estimating multiplies a unit rate by the quantity of work: if configuring one switch takes 1.5 hours, 40 switches take 60 hours. It is accurate when the unit rate is reliable and the work scales linearly. Bottom-up estimating estimates each work package or activity in detail and adds them up; it is the most accurate and the most time-consuming, and it needs a complete WBS (work breakdown structure). Expert judgment draws on experienced people and is often combined with the others.",
   "Three-point estimating accounts for uncertainty using an optimistic (O), most likely (M) and pessimistic (P) value. The PERT (program evaluation and review technique) or beta formula weights the most likely value four times. The simple triangular average treats all three equally. A rough standard deviation shows how spread out the estimate is, which helps express confidence.",
   "```text\nPERT (beta)  = (O + 4M + P) / 6\nTriangular   = (O + M + P) / 3\nStd dev      = (P - O) / 6\nO=4, M=6, P=14 -> PERT 7 days, triangular 8 days, std dev about 1.67 days\n```",
   "When the estimates, schedule and budget are agreed, they are approved as baselines: the scope baseline, the schedule baseline and the cost baseline (the time-phased budget, which includes contingency reserve but not management reserve). Baselines are the yardstick for measuring performance during execution; earned value and variance reports compare actual progress against them. They change only through formal change control; rebaselining to hide poor performance is not acceptable. Agile teams estimate in story points and use velocity for release forecasts instead of a detailed baseline, though the budget and timebox are still fixed.",
   "Consider a worked example. A team must deploy a new endpoint security agent to 900 devices. Early on, the project manager uses an analogous estimate: the last agent rollout to 600 devices took 6 weeks, so she suggests about 8 to 10 weeks. Once the pilot shows each device takes 20 minutes including checks, she uses a parametric estimate: 900 times 20 minutes is 300 hours of technician time. For the risky integration with the security operations console, the engineer gives three points: 3 days optimistic, 5 most likely, 13 pessimistic, a PERT estimate of 6 days. After the detailed WBS is complete, a bottom-up estimate confirms the numbers, and the sponsor approves the schedule and cost baselines.",
   "Common mistakes: confusing analogous (based on a similar past project) with parametric (based on a unit rate); forgetting to multiply M by 4 in PERT; dividing PERT by 3; assuming bottom-up is the fastest (it is the slowest and most accurate); padding estimates secretly instead of using visible reserves; and changing the baseline without approval. Another trap is having the project manager estimate alone rather than the people doing the work.",
   "Exam questions give clues. 'Based on a similar previous project', 'quick' or 'little detail available' is analogous. 'Cost per unit times number of units' or 'historical rate' is parametric. 'Roll up estimates from each work package', 'most accurate' or 'most time-consuming' is bottom-up. 'Optimistic, most likely and pessimistic' is three-point; if weighted, use PERT. 'Approved version used to measure performance' is a baseline. If asked what to do when actual costs exceed the baseline, the answer is to analyze the variance and take corrective action or submit a change request, not to quietly rebaseline."
  ],
  "terms": [
   [
    "Analogous estimating",
    "Estimating from the actual values of a similar past project; quick but less accurate."
   ],
   [
    "Parametric estimating",
    "Estimating by multiplying a unit rate by the quantity of work."
   ],
   [
    "Bottom-up estimating",
    "Estimating each work package in detail and summing the results; most accurate and slowest."
   ],
   [
    "Three-point estimate",
    "An estimate using optimistic, most likely and pessimistic values to reflect uncertainty."
   ],
   [
    "PERT estimate",
    "A weighted three-point estimate calculated as (O + 4M + P) / 6."
   ],
   [
    "Baseline",
    "The approved version of scope, schedule or cost used to measure performance, changed only through change control."
   ],
   [
    "Progressive elaboration",
    "Refining plans and estimates in more detail as more information becomes available."
   ]
  ],
  "example": "A team must estimate installing a new wireless network in 25 offices. Early on, the project manager uses the last rollout of 15 offices as an analogous estimate. Once the site surveys show about 12 access points per office at two hours each, he uses a parametric estimate: 25 x 12 x 2 = 600 hours. For uncertain building permits, he uses three-point estimates. After approval, the schedule and cost become baselines for tracking progress.",
  "tip": "Analogous uses a similar past project; parametric uses a unit rate times quantity; bottom-up sums detailed estimates and is most accurate. PERT is (O + 4M + P) / 6, not divided by 3.",
  "check": [
   [
    "O = 2, M = 5, P = 14 days. What is the PERT estimate?",
    "(2 + 20 + 14) / 6 = 6 days."
   ],
   [
    "Which estimating technique is most accurate but most time-consuming?",
    "Bottom-up estimating."
   ],
   [
    "If each server build takes 3 hours, how long will 50 builds take, and which technique is this?",
    "150 hours; parametric estimating."
   ],
   [
    "Does the cost baseline include the management reserve?",
    "No; it includes contingency reserve, while management reserve is held outside it."
   ]
  ]
 },
 {
  "t": "Planning: budget development and procurement (make vs buy, RFI, RFP, RFQ, statement of work, contract types)",
  "body": [
   "The project budget is built by adding up the cost estimates for activities and work packages, then adding the contingency reserve for identified risks. That total, spread over time, is the cost baseline, often drawn as an S-curve because spending starts slowly, speeds up during execution and tails off at the end. The management reserve for unknown risks is added on top to form the total project budget, but it is held by management. Budgets include labor, hardware, software licenses, cloud subscriptions, facilities, training, travel and vendor costs. It is important to distinguish capital expenses (CapEx, such as buying servers, often depreciated over years) from operating expenses (OpEx, such as monthly cloud or software as a service, SaaS, fees), because organizations fund and account for them differently. Funding may also be released in stages or tied to fiscal years, which the project manager must plan around.",
   "Procurement planning starts with a make-or-buy analysis: should the team build or do the work internally, or buy a product or service? Factors include total cost of ownership, internal skills and capacity, time to deliver, control, intellectual property, security and data handling, and long-term support. Once buying is chosen, the project issues solicitation documents. A request for information (RFI) gathers general information about what the market offers and which vendors exist. A request for proposal (RFP) asks vendors to propose a solution and price for a need, when the approach is open. A request for quote (RFQ) asks for prices on something already fully specified, such as 200 of a named laptop model. Vendors are then evaluated against weighted criteria such as price, experience, technical approach, security posture and support.",
   "Before the formal solicitation, vendors may sign a non-disclosure agreement (NDA) so the organization can share sensitive details. After selection, the relationship is formalized. A master service agreement (MSA) sets general terms for an ongoing relationship, under which individual pieces of work are ordered. The statement of work (SOW) describes the specific work the vendor will perform: deliverables, timeline, location, standards, acceptance criteria and reporting. It becomes part of the contract, and a vague SOW is a common source of disputes. A purchase order (PO) formally commits the organization to buy, and a service level agreement (SLA) defines measurable service targets.",
   "Contract types allocate risk differently. In a firm fixed price (FFP) contract, the seller delivers a well-defined scope for a set price and carries the cost risk. Fixed price incentive fee and fixed price with economic price adjustment are variations. In cost-reimbursable contracts (cost plus fixed fee, cost plus incentive fee, cost plus award fee), the buyer pays actual costs plus a fee and carries more risk; they suit uncertain scope. Time and materials (T&M) pays an hourly rate plus materials and suits staff augmentation or short, unclear work, but needs a not-to-exceed cap to control cost. Pre-qualified or preferred vendor lists speed up buying by limiting bids to vendors already vetted.",
   "Consider a worked example. A college needs a new learning management system. The make-or-buy analysis shows the IT team lacks the developers to build one, so it will buy. An RFI to the market returns eight vendors; an RFP goes to five, asking for a solution, implementation approach and price. Proposals are scored: 35 percent functionality, 25 percent price, 20 percent security, 20 percent support. The winner signs a firm fixed price contract with a detailed SOW for implementation, and a subscription (an OpEx cost) for the software. Separately, 60 staff laptops of a known model are bought through an RFQ to three resellers, a CapEx purchase.",
   "Common mistakes: confusing RFP (solution and price, approach open) with RFQ (price for a defined item); thinking cost-plus contracts put risk on the seller (the buyer carries it); using T&M without a cap; treating the SOW as optional detail; and counting management reserve in the cost baseline. Another trap is choosing the lowest price automatically; weighted criteria usually matter more.",
   "Exam wording gives clear signals. 'Learn what solutions exist' is an RFI. 'Vendors propose how they would solve it' is an RFP. 'Price for a specific, defined product' is an RFQ. 'Describes the vendor's work, deliverables and acceptance criteria' is the SOW. 'Scope well defined, seller carries cost risk' is firm fixed price. 'Scope unclear, buyer pays actual costs' is cost-reimbursable. 'Hourly rate for extra staff' is time and materials. 'Monthly cloud fees' is OpEx; 'buying servers' is CapEx."
  ],
  "terms": [
   [
    "Cost baseline",
    "The approved, time-phased budget including contingency reserve but excluding management reserve."
   ],
   [
    "Make-or-buy analysis",
    "Deciding whether to produce work internally or purchase it from an outside vendor."
   ],
   [
    "Request for proposal (RFP)",
    "A solicitation asking vendors to propose a solution and price for a stated need."
   ],
   [
    "Request for quote (RFQ)",
    "A solicitation asking vendors for prices on a clearly specified product or service."
   ],
   [
    "Statement of work (SOW)",
    "A description of the vendor's deliverables, timeline, standards and acceptance criteria that forms part of the contract."
   ],
   [
    "Firm fixed price contract",
    "A contract with a set price for defined scope, where the seller carries the cost risk."
   ],
   [
    "Time and materials contract",
    "A contract paying an hourly rate plus materials, usually with a not-to-exceed cap."
   ],
   [
    "CapEx vs OpEx",
    "Capital expenses buy long-lived assets; operating expenses are ongoing costs such as subscriptions."
   ]
  ],
  "example": "A company needs a new backup solution. It sends an RFI to learn what the market offers, then an RFP to four vendors asking for a proposed design and price. Proposals are scored on price, security, support and references. The winner signs a firm fixed price contract with a detailed SOW covering installation, configuration, knowledge transfer and acceptance testing, while the ongoing storage subscription is budgeted as an operating expense.",
  "tip": "RFI gathers information, RFP asks for a solution and price, RFQ asks for a price on a defined item. Fixed price puts cost risk on the seller; cost-reimbursable puts it on the buyer.",
  "check": [
   [
    "Which solicitation asks vendors to propose how they would meet a need?",
    "A request for proposal (RFP)."
   ],
   [
    "Which contract type puts the most cost risk on the seller?",
    "Firm fixed price."
   ],
   [
    "What document describes the specific work, deliverables and acceptance criteria for a vendor?",
    "The statement of work (SOW)."
   ],
   [
    "Is a monthly SaaS subscription CapEx or OpEx?",
    "OpEx, because it is an ongoing operating cost rather than the purchase of an asset."
   ]
  ]
 },
 {
  "t": "Planning: subsidiary plans for quality, risk, communication, transition and release",
  "body": [
   "The project management plan is not one document but a collection: the baselines for scope, schedule and cost plus subsidiary plans that describe how each area will be managed. On a small project they may be a page each; on a large one they may be substantial. Writing them forces the team to think through how the project will run before problems arise, and it gives new team members and auditors a single place to see how decisions are made. Like the baselines, the plan is approved and then updated through change control.",
   "The quality management plan defines the quality standards the deliverables must meet (for example, page load under two seconds, zero critical defects at go-live), the metrics used, how quality assurance and quality control will be performed, who is responsible, and which tools and tests will be used. It may reference organizational or industry standards the project must follow. The risk management plan describes how risks will be identified, analyzed and reviewed, the probability and impact scales, risk categories, roles, reporting and how reserves are handled; the risk register is the separate working document that lists the actual risks.",
   "The communication plan sets audiences, messages, methods, owners and frequency. Other subsidiary plans include scope, requirements, schedule, cost, resource, procurement, stakeholder engagement and change management plans. Each answers the question 'how will we manage this area?', not 'what are the tasks?'. On the exam, when a scenario asks where a process or rule is defined, such as who can approve changes or how often risks are reviewed, the answer is usually the relevant subsidiary plan.",
   "IT projects also need a transition plan: how the finished product will be handed over to operations and users. It covers support staff training, knowledge transfer, documentation and runbooks, the service desk's readiness, service level agreements (SLAs), monitoring and alerting, access handover, warranty or hypercare periods (a short period of extra support right after go-live), and when the project team steps back. It also names who owns the system afterward, so there is no gap between the project closing and operations taking responsibility. Planning transition early avoids the common problem of a system going live with nobody ready to support it.",
   "A release plan describes how the product will be delivered to users: whether in one big-bang cutover, in phases by location or department, as a parallel run where old and new systems operate together for a period, or as a pilot followed by wider rollout. It lists release dates and contents, deployment steps, go/no-go criteria, rollback plans, communication to users and training timing. In agile projects, release planning groups backlog items into releases using the team's velocity. Both transition and release plans connect to the organization's operational change management, since deployments to production must usually be approved by the change advisory board (CAB).",
   "Consider a worked example. A project will replace a company's expense reporting system. The quality plan says every release must pass automated tests, have no open critical defects and be accepted by finance. The risk plan uses a 1 to 5 scale and reviews risks weekly. The release plan pilots the system with the IT department for two weeks, then rolls out by region, with a go/no-go meeting before each wave and a rollback to the old system if error rates exceed an agreed threshold. The transition plan trains the service desk, writes runbooks, agrees an SLA with the application support team and defines four weeks of hypercare before the project team is released.",
   "Common mistakes: thinking the project management plan is just the schedule; confusing the risk management plan (the method) with the risk register (the list of risks); leaving transition planning until the week before go-live; and releasing without a rollback plan or go/no-go criteria. Another trap is forgetting that a project deployment still needs operational change approval even though the project CCB approved the scope.",
   "Exam clue words are useful here. 'Defines standards, metrics, QA and QC approach' is the quality management plan. 'Defines scales, categories and how risks are handled' is the risk management plan. 'Handover to operations, support training, runbooks, hypercare' is the transition plan. 'Phased rollout, pilot, go/no-go, rollback' is the release plan. 'Old and new systems run side by side' is a parallel run; 'switch everyone at once' is big bang."
  ],
  "terms": [
   [
    "Project management plan",
    "The collection of baselines and subsidiary plans describing how the project will be executed, monitored and controlled."
   ],
   [
    "Quality management plan",
    "The plan defining quality standards, metrics, responsibilities and QA and QC activities."
   ],
   [
    "Risk management plan",
    "The plan defining how risk management will be performed, including scales, categories and roles."
   ],
   [
    "Transition plan",
    "The plan for handing the finished product over to operations and support."
   ],
   [
    "Release plan",
    "The plan for how and when the product is delivered to users, including rollout approach and rollback."
   ],
   [
    "Hypercare",
    "A short period of intensified support immediately after go-live."
   ],
   [
    "Go/no-go criteria",
    "Predefined conditions checked before a release to decide whether to proceed."
   ]
  ],
  "example": "Before launching a new service desk tool, the team's release plan pilots it with one department for two weeks, with go/no-go criteria based on ticket resolution times. The transition plan trains the support team, writes runbooks, agrees an SLA and defines a four-week hypercare period in which developers remain available. After the pilot meets its criteria, the change advisory board approves the full rollout.",
  "tip": "The risk management plan describes how risk will be managed; the risk register lists the actual risks. Transition planning covers handover to operations and should begin early, not at go-live.",
  "check": [
   [
    "Which plan describes handover to operations, support training and runbooks?",
    "The transition plan."
   ],
   [
    "What is the difference between the risk management plan and the risk register?",
    "The plan defines the method, scales and roles; the register lists the specific risks and their responses."
   ],
   [
    "What should a release plan include in case a deployment fails?",
    "A rollback plan and go/no-go criteria."
   ],
   [
    "Is the project management plan a single document?",
    "No; it is a collection of baselines and subsidiary plans."
   ]
  ]
 },
 {
  "t": "Executing: directing the work, managing vendors, quality assurance vs quality control, and deliverable acceptance",
  "body": [
   "Executing is where most of the project's time and money are spent. The project manager directs and manages the work defined in the plan: assigning tasks, coordinating teams and vendors, running meetings, removing obstacles, managing the team's development, acquiring remaining resources and keeping stakeholders engaged. Approved changes are implemented, issues are logged in the issue log and resolved, and work performance data (what was actually done, when and at what cost) is collected so monitoring and controlling can compare it with the baselines.",
   "Vendor management is a big part of execution on IT projects. The project manager tracks each vendor's progress against the statement of work (SOW) and contract milestones, reviews deliverables, approves invoices only for accepted work, holds regular vendor meetings and handles disputes through the contract's process. Changes to vendor scope go through formal change orders, not informal requests; a verbal 'can you also add this' can become an unbudgeted invoice. Performance against any service level agreement (SLA) is measured and recorded, and vendor access to systems is limited to what the work requires and removed when it ends.",
   "Quality assurance (QA) and quality control (QC) are often confused. QA is process-focused and preventive: it checks that the team is following the right processes and standards, through audits, process reviews, peer reviews of methods and training, so defects are less likely to be created. QA also looks for lessons: if the same kind of defect keeps appearing, the process that lets it through is improved rather than only the product being fixed. QC is product-focused and detective: it inspects and tests the actual deliverables to find defects, through testing, inspections, walkthroughs and measurements, and compares results with the quality standards. A quality audit asking 'are we following our testing procedure?' is QA; running the test cases on a build is QC. Both follow the quality management plan.",
   "QC often uses simple tools. A Pareto chart ranks causes of defects so the team fixes the few causes behind most problems. A control chart shows whether a process stays within limits over time. A cause-and-effect (fishbone or Ishikawa) diagram helps find root causes. Checklists make inspections consistent. In IT, QC includes unit, integration, system, regression, performance and security testing before the product reaches users.",
   "Deliverables that pass QC still need acceptance. The customer or sponsor reviews each deliverable against the agreed acceptance criteria and formally accepts it, often by signing an acceptance form or approving it in a tool. This is sometimes called validating scope. User acceptance testing (UAT) is a common way for business users to confirm the product meets their needs before sign-off. Deliverables that fail acceptance are corrected, or a change request is raised if the criteria themselves need to change. Accepted deliverables later feed into project closing and final sign-off.",
   "Consider a worked example. A vendor is implementing a new customer relationship management (CRM) system. The project manager holds weekly vendor meetings, compares progress to the SOW milestones and holds back payment for the data migration milestone until it is accepted. A process audit finds the vendor is skipping code reviews, a QA finding, so the project manager requires them to be restored. The test team then runs 400 test cases and logs 12 defects, a QC activity, and a Pareto chart shows most come from one integration. After fixes, the sales team runs UAT against the acceptance criteria, and the sales director signs the acceptance form.",
   "Common mistakes: calling testing QA (it is QC); calling a process audit QC (it is QA); assuming a deliverable that passes testing is automatically accepted; paying vendor invoices for work not yet accepted; and letting vendor scope change through emails rather than change orders. Another trap is confusing validation (customer accepts the deliverable) with verification or control (the team checks it meets the specification).",
   "Exam wording uses reliable clues. 'Audit', 'process', 'prevent' and 'are we following the standard' point to QA. 'Inspect', 'test', 'measure the deliverable' and 'find defects' point to QC. 'Customer formally signs off the deliverable' is acceptance or validating scope. 'Business users test before go-live' is UAT. 'Vendor asks to change the scope' calls for a change order through change control. 'Vendor invoice arrives for an unfinished milestone' means do not approve payment until the deliverable is accepted."
  ],
  "terms": [
   [
    "Quality assurance (QA)",
    "Process-focused, preventive activities that confirm the team follows the right standards and procedures."
   ],
   [
    "Quality control (QC)",
    "Product-focused, detective activities that inspect and test deliverables to find defects."
   ],
   [
    "User acceptance testing (UAT)",
    "Testing by business users to confirm the product meets their needs before sign-off."
   ],
   [
    "Acceptance criteria",
    "The agreed conditions a deliverable must meet to be formally accepted."
   ],
   [
    "Change order",
    "A formal, approved change to a vendor contract's scope, price or schedule."
   ],
   [
    "Issue log",
    "A record of current problems with owners, status and resolution."
   ],
   [
    "Pareto chart",
    "A ranked bar chart showing which causes account for most defects."
   ]
  ],
  "example": "During a website rebuild, a quality auditor reviews whether developers follow the coding standard and peer review process (QA). Testers then run automated and manual tests on each build and log defects (QC). When the build meets the acceptance criteria, the marketing department runs UAT and the marketing director signs off the deliverable. Only then does the project manager approve the vendor's invoice for that milestone.",
  "tip": "QA checks the process and prevents defects; QC checks the product and detects defects. Passing QC is not the same as customer acceptance, which requires formal sign-off against acceptance criteria.",
  "check": [
   [
    "An auditor checks that the team follows the testing procedure. Is this QA or QC?",
    "QA, because it examines the process."
   ],
   [
    "Running test cases against a new build is an example of what?",
    "Quality control (QC), because it inspects the product for defects."
   ],
   [
    "Who formally accepts a deliverable?",
    "The customer or sponsor, against the agreed acceptance criteria."
   ],
   [
    "A vendor asks by email to change the scope of its work. What should happen?",
    "The request goes through change control and, if approved, is documented as a formal change order."
   ]
  ]
 },
 {
  "t": "Monitoring and controlling: tracking progress against baselines, variance analysis, issue management and escalation",
  "body": [
   "Monitoring and controlling is not a phase that waits until execution is over. It runs alongside execution for the whole life of the project. The project manager compares actual performance with the approved baselines for scope, schedule and cost, identifies variances, decides on corrective or preventive actions, and makes sure that any change to the plan itself goes through change control. Without it, a team can be very busy and still be heading in the wrong direction, and nobody notices until the deadline or the budget is already gone.",
   "The raw material is work performance data: what the team reports in status meetings, timesheets, updates in the scheduling tool, vendor progress reports and test results. You turn that data into work performance information by comparing it with the plan. Useful measures include percent complete, milestones met or missed, budget spent against plan, earned value metrics such as schedule variance (SV), cost variance (CV), the schedule performance index (SPI) and the cost performance index (CPI), defect counts and, for agile teams, burndown charts and velocity. The information then goes out in status reports and dashboards so stakeholders see the same picture you do.",
   "A variance is the difference between planned and actual. Variance analysis asks three questions: how big is it, why did it happen, and is it within tolerance? Tolerances are agreed thresholds, for example plus or minus five percent on cost, set in the project management plan or by the sponsor. A small variance inside tolerance may simply be watched. A larger one needs action. Corrective action fixes a problem that is already happening, such as adding overtime to recover a slipping task. Preventive action stops a future problem, such as ordering hardware early because the vendor has warned of delays. Only when the plan itself must change, such as a new end date, extra budget or different scope, does a change request go to the change control board (CCB). Rebaselining is a formal decision, never a quiet way to make a variance disappear.",
   "Issues are problems happening now, as opposed to risks, which might happen. Each issue goes into the issue log with a description, the date raised, priority, owner, due date, planned actions and status. The project manager makes sure each owner works on their issue and reviews the open log at status meetings, closing items only when they are actually resolved. Some issues come from risks that occurred; when that happens, you update the risk register too and record that the response was triggered. Others are brand new and may show a gap in risk identification worth noting for lessons learned.",
   "Escalation moves an issue or decision to a higher authority when it exceeds the project manager's authority, tolerance or ability to resolve. Typical triggers are needing more budget than you may approve, a resource conflict between two departments, a vendor dispute or a decision that changes business outcomes. The escalation path is defined in the communication plan or governance plan and usually runs from project manager to sponsor to steering committee. Escalate with facts: the issue, its impact, the options you considered and your recommendation. Escalation is not failure; hiding problems until they are too late to fix is.",
   "Consider a worked example. A network refresh has a baseline of 12 weeks and a budget of $300,000. At week 6 the switches are two weeks late because the vendor missed a shipment, and SPI has dropped to 0.85, outside the agreed tolerance of 0.9. You analyze the cause, confirm the vendor's new date, and find that installation at two sites can be resequenced so crews stay busy (corrective action). You also add a weekly vendor check-in to catch future delays (preventive action). Even so, the finish date will slip one week, which exceeds your authority, so you escalate to the sponsor with the impact, two options and a recommendation. The sponsor approves a change request, the schedule is rebaselined and the issue log and risk register are updated.",
   "Common mistakes: jumping straight to rebaselining or adding people before analyzing the cause; treating every small variance as a crisis instead of using tolerances; confusing an issue (happening now) with a risk (might happen); leaving issues without a single named owner and due date; and escalating without options or a recommendation, or bypassing the defined path by going straight to the steering committee.",
   "On the exam, 'actual differs from the plan' means variance analysis, and the first step is usually to find the cause. 'Fix a current problem' is corrective action; 'stop it happening later' is preventive action. 'A problem is occurring now' belongs in the issue log. 'Beyond the project manager's authority' or 'resource conflict between managers' points to escalation through the defined path, typically the sponsor first. 'The end date or budget must change' points to a change request, not a quiet update."
  ],
  "terms": [
   [
    "Baseline",
    "The approved version of the scope, schedule or cost plan that actual performance is measured against."
   ],
   [
    "Variance",
    "The difference between what was planned and what actually happened."
   ],
   [
    "Tolerance",
    "An agreed threshold of variance that can be accepted before action or escalation is required."
   ],
   [
    "Corrective action",
    "An action taken to bring current performance back in line with the plan."
   ],
   [
    "Preventive action",
    "An action taken to reduce the chance that a future problem affects the project."
   ],
   [
    "Issue log",
    "A record of current problems with owner, priority, due date, actions and status."
   ],
   [
    "Escalation path",
    "The defined route for raising issues beyond the project manager's authority, usually to the sponsor and then the steering committee."
   ]
  ],
  "example": "An ERP (enterprise resource planning) rollout is 8 percent over budget after the data migration took far longer than planned. The project manager analyzes the cause, finds that source data quality was worse than assumed, and adds a data-cleansing step (corrective action) plus a sample-data review for the remaining modules (preventive action). Because the overrun exceeds her tolerance, she escalates to the sponsor with options and a recommendation, and a change request adjusts the cost baseline.",
  "tip": "When a variance appears, the first step is to analyze its cause and options, not to rebaseline or add staff. Corrective fixes the present, preventive protects the future, and anything beyond your authority is escalated with options and a recommendation.",
  "check": [
   [
    "A task is running late and you add overtime to catch up. Is that corrective or preventive action?",
    "Corrective action, because it fixes a problem that is already affecting the schedule."
   ],
   [
    "What is the difference between an issue and a risk?",
    "An issue is a problem happening now and goes in the issue log; a risk is an uncertain future event and goes in the risk register."
   ],
   [
    "Two functional managers both claim the same engineer for the same week and you cannot resolve it. What should you do?",
    "Escalate through the defined escalation path, usually to the sponsor, with the impact, options and a recommendation."
   ],
   [
    "Your cost variance is small and inside the agreed tolerance. What is the usual response?",
    "Monitor it and report it; action or escalation is needed only when the variance exceeds tolerance or is trending worse."
   ]
  ]
 },
 {
  "t": "Closing: formal acceptance, transition to operations, contract closure, releasing resources, lessons learned and archiving",
  "body": [
   "Closing formally ends a project or a phase. It happens when all the work is done and accepted, but also when a project is cancelled or terminated early. In both cases an orderly close protects the organization: it records what was achieved, frees people and money for other work, and preserves knowledge for future projects. Skipping closure leaves loose ends such as open contracts, unpaid or disputed invoices, unused licenses, active accounts nobody owns and unanswered questions about who supports the new system.",
   "The first step is formal acceptance. The sponsor or customer confirms, in writing, that the final deliverables meet the acceptance criteria defined in the scope statement. A signed acceptance form or approval recorded in the project tool is the evidence. This is different from validating individual deliverables during the project; formal acceptance is the final sign-off for the whole thing. Without it, the customer can keep asking for 'one more thing' and the project never really ends. If some items are still open at the end, they are listed in the acceptance record with owners and dates, so everyone agrees exactly what remains and who will finish it.",
   "Next comes transition to operations, the handoff of the product to the people who will run and support it day to day. A good transition package includes documentation, runbooks (step-by-step operating procedures), training for support staff and users, support contacts and escalation paths, warranty details, license records and any service level agreements (SLAs). Many organizations use a hypercare or warranty period of a few weeks after go-live, when the project team stays on call to fix early problems before operations takes full ownership.",
   "Contract closure, also called procurement closure, confirms that each vendor has delivered everything in the contract, that open claims or disputes are settled, that final invoices are paid, and that procurement records are archived. A procurement audit may review what went well and badly in the buying process. The budget is reconciled so final costs are known, remaining purchase orders are closed, and unused funds are returned to the organization. Financial closure also means closing the project's cost codes so no new charges can be booked against it after the work ends.",
   "Resources are then released. Team members return to their functional managers or move to new projects, ideally with feedback on their performance. Equipment, facilities and temporary accounts are returned or removed; removing project-specific access, such as contractor logins and shared test credentials, is also a security step. The lessons learned session is held before people scatter, while memories are fresh. It captures what went well, what did not and what to do differently, and the results go into the organization's lessons learned repository. Finally, the project manager writes a closure report comparing results with objectives, archives all project documents according to the retention policy, communicates closure to stakeholders and, often, recognizes the team's work.",
   "Consider a worked example. A help desk platform goes live on schedule. The sponsor signs the acceptance form after reviewing the acceptance test results. The operations team receives runbooks and admin training, and the project team provides two weeks of hypercare. The implementation vendor's final milestone is verified and its invoice paid, and the contract is closed. Contractor accounts are disabled, the team holds a lessons learned session that notes the value of early data-migration rehearsals, and the closure report and documents are archived. A month later a similar project reuses those lessons.",
   "Common mistakes: releasing the team before holding lessons learned; confusing contract closure (about vendors) with formal acceptance (about the customer); forgetting that a cancelled project still needs closing; leaving contractor access active; and archiving documents in personal drives rather than the official repository. If a project is cancelled early, the same steps apply to whatever work was completed: document status, capture lessons, close contracts, release resources and archive.",
   "Exam questions often list closing activities and ask which comes first or which was missed. 'Customer signs off on deliverables' is formal acceptance, and it normally comes before the other steps. 'Handover to the support team' is transition to operations. 'Vendor final payment and settlement of claims' is contract closure. 'The team has already moved on and nobody remembers what happened' points to lessons learned done too late. 'The project was terminated' still means you perform closing activities."
  ],
  "terms": [
   [
    "Formal acceptance",
    "Written confirmation from the sponsor or customer that the deliverables meet the acceptance criteria."
   ],
   [
    "Transition to operations",
    "The handoff of the finished product, documentation and support duties to the operations team."
   ],
   [
    "Hypercare",
    "A short period after go-live when the project team gives extra support before operations takes full ownership."
   ],
   [
    "Contract closure",
    "Confirming vendor deliverables, settling claims, paying final invoices and archiving procurement records."
   ],
   [
    "Lessons learned",
    "Documented insights about what worked, what did not and what to change on future projects."
   ],
   [
    "Closure report",
    "The final project report comparing results with objectives and summarizing performance and outstanding items."
   ]
  ],
  "example": "A retailer cancels a loyalty app project halfway through because of a merger. The project manager still runs closing: she documents what was completed, pays the design agency for accepted work and closes its contract, disables the agency's access to the code repository, holds a lessons learned session, and archives the requirements and designs so the merged company can reuse them later.",
  "tip": "Lessons learned must be captured before the team is released, and a cancelled project still goes through closing. Contract closure concerns vendors; formal acceptance concerns the customer or sponsor.",
  "check": [
   [
    "Which closing activity confirms that the customer agrees the deliverables meet the acceptance criteria?",
    "Formal acceptance, usually a written sign-off by the sponsor or customer."
   ],
   [
    "Why hold the lessons learned session before releasing resources?",
    "Because once people move to other work their memories fade and they are harder to gather, so valuable insights are lost."
   ],
   [
    "A project is terminated early. Does it need closing?",
    "Yes. Completed work is documented, contracts are closed, resources released, lessons captured and records archived."
   ],
   [
    "Why is removing contractor accounts part of closing?",
    "Leftover access is a security risk; releasing resources includes removing project-specific access and credentials."
   ]
  ]
 },
 {
  "t": "Project management software: scheduling tools, Gantt charts, Kanban boards, ticketing systems and dashboards",
  "body": [
   "Project managers rely on software to plan work, track it and report on it. The exam does not test particular products; it tests whether you know what each type of tool is for and which view answers which question. The main categories are scheduling tools, Gantt charts, Kanban boards, ticketing systems and dashboards, and many modern platforms combine several of them.",
   "Scheduling tools, whether desktop programs or cloud services, let you enter tasks, durations, dependencies and resources. The tool then calculates start and finish dates, the critical path (the longest chain of dependent tasks, which sets the shortest possible project duration) and resource loading, and it can flag people who are over-allocated. You save a baseline when the plan is approved, and later the tool shows the variance between baseline and actual dates. Free and open-source tools such as ProjectLibre and GanttProject are fine for practice; organizations use commercial or cloud tools built on the same concepts. A typical lab step is to link two tasks with a finish-to-start dependency and watch the successor's dates move.",
   "The best-known schedule view is the Gantt chart. Tasks are listed down the left, a calendar runs across the top, and each task is a horizontal bar showing its start, duration and finish. Arrows between bars show dependencies, diamonds mark milestones (zero-duration events such as 'design approved'), summary bars roll up groups of tasks, and a vertical line often marks today. A tracking Gantt shows baseline bars beside actual bars. Gantt charts are excellent for communicating the timeline and spotting overlaps, but a big one is hard to read, so executives usually get a milestone chart instead.",
   "Kanban boards show work as cards moving across columns such as Backlog, To do, In progress, Review and Done. Everyone can see what is being worked on and where work is piling up. Work-in-progress (WIP) limits cap how many cards may sit in a column, which exposes bottlenecks and encourages finishing before starting. Kanban suits agile teams and continuous operations work. Ticketing systems, the tools a service desk uses to log incidents and requests, are also used on IT projects to track tasks, defects and change requests, because every ticket has an owner, priority, status history and audit trail. A defect found in testing becomes a ticket with a severity, an assignee and a resolution.",
   "Dashboards pull data from these tools into a one-screen view of project health: milestones, percent complete, budget used, open risks and issues, and red, amber and green (RAG) status indicators. A good dashboard is tailored to its audience. Executives want a few indicators and trends; the team wants task-level detail. Whatever the tool, the data is only as good as the updates behind it, so agree on who updates what and how often, and make updating part of the team's routine rather than a scramble before the status meeting.",
   "Consider a worked example. You are running a data center migration. You build the plan in a scheduling tool, set dependencies, and the tool shows that the network cutover is on the critical path. You share a Gantt chart with the technical leads, and the sponsor sees a milestone view on a dashboard with RAG status. The server team tracks its daily work on a Kanban board with a WIP limit of three per engineer, and defects from migration testing are logged as tickets. When the Review column keeps growing, you see a bottleneck and add a second reviewer.",
   "Common mistakes: sending a huge Gantt chart to executives instead of a summary; confusing a Kanban board (workflow and WIP) with a Gantt chart (timeline and dependencies); treating the dashboard as the source of truth when its data is stale; and forgetting to save a baseline, which makes variance reporting impossible. Another trap is thinking the tool manages the project; it only calculates and displays what people enter.",
   "Exam wording is usually about purpose. 'Timeline with bars, dependencies and milestones' means a Gantt chart. 'Visualize workflow, limit work in progress, see bottlenecks' means a Kanban board. 'Track defects or requests with an audit trail and assignment' means a ticketing system. 'At-a-glance health for executives' or 'RAG indicators' means a dashboard. 'Calculate the critical path or resource over-allocation' means the scheduling tool."
  ],
  "terms": [
   [
    "Gantt chart",
    "A bar chart showing tasks against a calendar, with dependencies and milestones."
   ],
   [
    "Critical path",
    "The longest sequence of dependent tasks, which determines the shortest possible project duration."
   ],
   [
    "Kanban board",
    "A visual board of cards moving through workflow columns, often with work-in-progress limits."
   ],
   [
    "Work-in-progress (WIP) limit",
    "A cap on how many items may be in a workflow stage at once, used to expose bottlenecks."
   ],
   [
    "Ticketing system",
    "A tool that logs and tracks requests, incidents or defects with owners, status and history."
   ],
   [
    "Dashboard",
    "A one-screen summary of key project indicators, often using red, amber and green status."
   ]
  ],
  "example": "A software team keeps its sprint work on a Kanban board and logs bugs from user acceptance testing as tickets. The project manager maintains the overall schedule in a scheduling tool, shows the technical leads a Gantt chart of the release, and gives the steering committee a dashboard with milestone status, budget used and the top three risks in red, amber and green.",
  "tip": "Timeline with bars, dependencies and milestones is a Gantt chart. Workflow columns with WIP limits is a Kanban board. At-a-glance health for executives is a dashboard, and an audit trail of defects or requests is a ticketing system.",
  "check": [
   [
    "Which tool view best shows task dependencies and milestones over time?",
    "A Gantt chart, because it shows bars on a calendar with dependency arrows and milestone markers."
   ],
   [
    "What does a work-in-progress limit on a Kanban board help reveal?",
    "Bottlenecks, because cards pile up in a column that has reached its limit, and it encourages finishing work before starting more."
   ],
   [
    "Why would a project track testing defects in a ticketing system?",
    "It gives each defect an owner, priority, status and history, providing an audit trail until it is resolved."
   ],
   [
    "The sponsor has two minutes to see whether the project is on track. What should you give them?",
    "A dashboard or summary with key indicators and RAG status, not a detailed Gantt chart or task list."
   ]
  ]
 },
 {
  "t": "Collaboration tools: real-time vs asynchronous communication, shared workspaces, file sharing and document version control",
  "body": [
   "Modern project teams are often spread across offices, homes and time zones, so collaboration tools are central to getting work done. Project+ groups these tools by how they are used rather than by product names, so focus on the categories: real-time communication, asynchronous communication, shared workspaces and file sharing, and document version control. The skill being tested is choosing the right tool for the situation.",
   "Real-time, or synchronous, tools need people present at the same moment: video conferencing, voice calls, screen sharing, live virtual whiteboards and instant chat conversations when both people are active. They are best for discussions that need back-and-forth, workshops, decisions, troubleshooting together, conflict resolution and sensitive conversations such as performance feedback. Their weaknesses are scheduling across time zones, meeting fatigue and the lack of a written record unless someone takes minutes or the session is recorded.",
   "Asynchronous tools let people contribute on their own schedule: email, discussion threads or channels, shared documents with comments, wikis and knowledge bases, recorded meetings and project boards. They create a written record, respect time zones and reduce meeting load. They can be slower for decisions, and important messages get lost when there are too many channels. That is why the team charter or communication plan should say which tool is used for what, for example 'decisions are recorded in the project wiki, status updates go in the weekly thread, urgent production issues go to the on-call chat channel and a phone call'.",
   "Shared workspaces and file sharing give everyone access to the same documents in one place. The main risk is version confusion: two people editing separate copies, or someone building from an outdated plan attached to an old email. Document version control addresses this. Cloud document platforms keep a version history and let you restore earlier versions. Formal documents use version numbers, for example 0.x for drafts, 1.0 for the approved baseline and 1.1 for a minor update, plus a revision history table recording what changed, who changed it and when. Check-in and check-out features lock a file so two people cannot overwrite each other. For source code and configuration files, a dedicated version control system such as Git tracks every change, for example `git log` shows the history and `git diff` shows exactly what changed.",
   "Security and access also matter. Apply least privilege to shared folders, so people get only the access they need. Use the organization's approved tools rather than personal accounts, avoid sharing sensitive files through public 'anyone with the link' access, and remove access when people leave the project. Consider accessibility, such as captions and screen reader support, and cultural and language differences, so that everyone can participate. Recording meetings may need consent and must follow retention rules. Chat and file-sharing tools also hold project records, so the organization's retention and legal hold rules apply to them just as they do to email.",
   "Consider a worked example. Your team has developers in three time zones and keeps missing decisions made in calls some members could not attend. You change the communication plan: a short weekly video call for discussion at a time that rotates fairly, a recorded summary, and all decisions written into a decision log on the project wiki. Requirements move from emailed attachments to a single shared document with version history and a revision table. Within a sprint, the arguments about 'which version is current' stop.",
   "Common mistakes: using email attachments as the document store; relying only on meetings for a globally distributed team; creating so many chat channels that nobody knows where to look; giving everyone edit rights to everything; and assuming a recorded meeting replaces written decisions. Another error is treating chat as the official record; important decisions belong in a controlled document or log. Finally, watch for 'shadow IT': a team member who sets up an unapproved file-sharing account to move faster may put sensitive data outside the organization's control, so point people to the approved alternative instead.",
   "Exam clues are usually about fit. 'Team members in different time zones' or 'need a written record' points to asynchronous tools. 'Complex, sensitive or urgent discussion' points to real-time tools such as a call or video meeting. 'People are working from different versions' points to version control and a single shared repository. 'Sensitive document shared too widely' points to access control and least privilege."
  ],
  "terms": [
   [
    "Synchronous (real-time) communication",
    "Communication where participants interact at the same time, such as a video call."
   ],
   [
    "Asynchronous communication",
    "Communication where people contribute at different times, such as email, threads or shared comments."
   ],
   [
    "Shared workspace",
    "A central online location where the team stores and works on project documents together."
   ],
   [
    "Version control",
    "Tracking changes to a document or file over time so the current version is clear and earlier ones can be restored."
   ],
   [
    "Revision history",
    "A table or log recording each version of a document, what changed, who changed it and when."
   ],
   [
    "Check-in/check-out",
    "A file-locking feature that stops two people editing the same document at the same time."
   ]
  ],
  "example": "A project spanning teams in Europe and Asia struggles with meetings at awkward hours. The project manager moves routine status to an asynchronous weekly thread, keeps one short real-time meeting a week for decisions and blockers, and stores the plan in a shared workspace with version history. The revision table on the scope document now shows who approved each change, ending disputes about which copy is current.",
  "tip": "Time zones and the need for a written record point to asynchronous tools; complex, urgent or sensitive discussions point to real-time tools. Confusion over which document is current is solved by version control in a single shared repository.",
  "check": [
   [
    "A decision is needed today on a disputed design with strong opinions on both sides. Which kind of tool fits best?",
    "A real-time tool such as a video call, because it allows immediate back-and-forth discussion; the outcome should then be recorded in writing."
   ],
   [
    "Why is asynchronous communication helpful for teams across time zones?",
    "People can contribute when they are working, and it creates a written record without forcing anyone into late or early meetings."
   ],
   [
    "Two analysts updated different copies of the requirements. What prevents this?",
    "A single shared repository with version control, version history and check-in/check-out or controlled editing."
   ],
   [
    "What does version 1.0 usually signify on a formal project document?",
    "The first approved, baselined version, as opposed to 0.x drafts."
   ]
  ]
 },
 {
  "t": "Quality charts: Pareto, histogram, run and control charts, scatter diagrams and fishbone (Ishikawa) diagrams",
  "body": [
   "Quality tools help a team understand problems using data instead of opinions. On the exam you will usually be given a situation, or a description of a chart, and asked which tool fits. So for each chart, learn the question it answers: how values are distributed, which causes matter most, whether a process is stable over time, whether two variables are related, or what might be causing a problem.",
   "A histogram is a bar chart showing how often values fall into ranges or categories, for example how many help desk tickets took 0 to 1 hour, 1 to 2 hours, 2 to 4 hours and so on. It shows the distribution and shape of the data: centered, skewed or spread out. A Pareto chart is a special histogram sorted from the most frequent category to the least, with a line showing the cumulative percentage. It applies the Pareto principle, also called the 80/20 rule, the idea that roughly 80 percent of problems come from about 20 percent of causes. It tells you which few categories to fix first to get the biggest improvement.",
   "A run chart plots a measure over time, such as defects found each week, so you can see trends, cycles and shifts. A control chart is a run chart with a center line, usually the mean, and upper and lower control limits calculated from the process data, commonly about three standard deviations from the mean. Points outside the limits, or unusual patterns such as the 'rule of seven' (seven or more consecutive points on one side of the mean), suggest the process is out of control and should be investigated. Control limits describe what the process actually does; specification limits describe what the customer requires. A process can be in control yet still fail to meet specification.",
   "A scatter diagram plots pairs of values for two variables to show whether they are related, such as application response time against the number of concurrent users. Points clustered along a rising line suggest a positive correlation, a falling line a negative one, and a random cloud no correlation. Correlation does not prove causation, but it tells you where to look. A fishbone diagram, also called an Ishikawa or cause-and-effect diagram, places the problem at the head and possible causes along the bones, grouped into categories such as people, process, technology, materials, environment and measurement. It structures brainstorming and root cause analysis, often combined with the five whys, where you keep asking why until the underlying cause appears. Flowcharts, which map process steps, and check sheets, which tally occurrences as they happen, are also common quality tools, and check sheets often provide the data for histograms and Pareto charts.",
   "These tools work well together in a sequence. You collect data with a check sheet, find the biggest category with a Pareto chart, brainstorm its causes with a fishbone diagram, test a suspected cause with a scatter diagram, and then use a control chart to confirm the fix keeps the process stable.",
   "Consider a worked example. After a laptop rollout, the service desk logs 400 tickets in a month. A Pareto chart shows that 'VPN will not connect' and 'printer mapping' make up almost 70 percent. The team runs a fishbone session on the VPN problem and suspects the client configuration. A scatter diagram of failures against the image version shows a strong link to one build. After fixing that image, a control chart of daily VPN tickets shows the count falling and then staying inside the control limits, so the process is stable again.",
   "Common mistakes: confusing a plain histogram with a Pareto chart (Pareto is sorted and has a cumulative line); treating control limits as customer requirements; assuming correlation on a scatter diagram proves cause; and using a fishbone diagram as proof rather than as a structured list of possible causes to investigate. Another trap is reacting to every point on a control chart; variation inside the limits is normal and usually does not need action.",
   "Exam wording maps closely to the tools. 'Prioritize', 'focus on the vital few' or '80/20' points to Pareto. 'Is the process stable', 'within limits' or 'rule of seven' points to a control chart. 'Relationship between two variables' points to a scatter diagram. 'Brainstorm possible causes by category' or 'cause and effect' points to a fishbone. 'Frequency or distribution of values' points to a histogram, and 'trend over time without limits' points to a run chart."
  ],
  "terms": [
   [
    "Histogram",
    "A bar chart showing how frequently values fall into ranges or categories."
   ],
   [
    "Pareto chart",
    "A histogram sorted from most to least frequent with a cumulative percentage line, used to prioritize causes."
   ],
   [
    "Run chart",
    "A line chart plotting a measure over time to show trends and patterns."
   ],
   [
    "Control chart",
    "A run chart with a mean and upper and lower control limits, used to judge whether a process is stable."
   ],
   [
    "Scatter diagram",
    "A plot of paired values for two variables showing whether they are correlated."
   ],
   [
    "Fishbone (Ishikawa) diagram",
    "A cause-and-effect diagram grouping possible causes of a problem into categories."
   ],
   [
    "Rule of seven",
    "Seven or more consecutive points on one side of the mean, suggesting a non-random shift in the process."
   ]
  ],
  "example": "A web team's daily count of failed deployments is plotted on a control chart. For weeks the points bounce randomly inside the limits, then eight days in a row sit above the mean. Although none exceed the upper limit, the rule of seven tells the team something changed. A fishbone session traces it to a new test environment that differs from production, and fixing it brings the failures back to normal.",
  "tip": "Rank the biggest causes: Pareto. Is the process stable within limits over time: control chart. Are two variables related: scatter diagram. Brainstorm causes by category: fishbone. Distribution of values: histogram.",
  "check": [
   [
    "Which chart helps you choose the few defect categories that cause most of the problems?",
    "A Pareto chart, because it sorts categories by frequency and shows the cumulative percentage."
   ],
   [
    "Seven points in a row fall above the mean on a control chart, but all are inside the limits. What does that suggest?",
    "The process may be out of control because of a non-random shift, so it should be investigated."
   ],
   [
    "A scatter diagram shows response time rising as user count rises. Does this prove users cause the slowdown?",
    "No. It shows a positive correlation, which suggests where to investigate but does not prove causation."
   ],
   [
    "What is the difference between control limits and specification limits?",
    "Control limits come from the process's actual performance; specification limits are the customer's requirements."
   ]
  ]
 },
 {
  "t": "Agile reporting: burndown and burnup charts, velocity charts and cumulative flow diagrams",
  "body": [
   "Agile teams report progress with simple visual charts rather than long written status reports. These charts are often called information radiators, because they sit where everyone can see them, on a wall or a shared screen, and 'radiate' the team's status without anyone having to ask. They are updated frequently, usually daily, straight from the team's board or tool, so they show reality with very little extra effort. The exam expects you to read four of them: burndown, burnup, velocity and the cumulative flow diagram.",
   "A burndown chart shows the work remaining on the vertical axis, measured in story points, tasks or hours, against time on the horizontal axis. An ideal line runs straight from the total at the start of the sprint down to zero on the last day. You then plot the actual remaining work each day. If the actual line is above the ideal line, more work remains than planned and the team is behind; if it is below, the team is ahead. A flat stretch means nothing is being completed, perhaps because of a blocker or because finished items are not being moved to Done. A line that goes up means work was added during the sprint. A sprint burndown tracks one sprint; a release burndown tracks remaining work across several sprints toward a release.",
   "A burnup chart turns the picture around. It shows work completed rising over time, with a separate line for total scope. The gap between the two lines is the remaining work, and the project is finished when the lines meet. Because scope has its own line, a burnup makes scope changes obvious: if stakeholders add stories, the scope line steps up, while the completed line keeps climbing at its normal rate. On a burndown the same change would just look like the team slowing down. That makes burnups very useful for conversations with stakeholders about scope growth and release dates.",
   "A velocity chart shows the story points completed in each sprint, often as bars next to the points the team committed to. Over several sprints it gives an average velocity for forecasting. For example, if the team averages about 30 points per sprint and 150 points remain in the backlog, you can forecast roughly five more sprints. Velocity varies naturally from sprint to sprint, and it is specific to one team, because each team sizes story points differently. It should not be used to compare teams or as a productivity target, because that encourages inflating estimates, which makes the forecast worthless.",
   "A cumulative flow diagram (CFD), common with Kanban, shows how many items are in each workflow state over time, drawn as stacked colored bands such as To do, In progress, Review and Done. Healthy flow shows bands of fairly steady thickness, with Done growing smoothly. A band that widens reveals a bottleneck; for example, a growing Review band means work is waiting for review. The vertical thickness of the in-progress bands at any date shows work in progress (WIP), and the horizontal distance across them approximates lead time, how long an item takes from start to finish. Flat Done means nothing is being delivered.",
   "Consider a worked example. Mid-sprint, your burndown shows the actual line well above the ideal line and flat for three days. At the daily stand-up, the team explains that two stories are blocked waiting for test data. You remove the blocker, and the line starts falling again. Later in the release, the sponsor asks why the date keeps moving. You show a burnup chart: the completed line has climbed steadily, but the scope line has stepped up four times as new stories were added. The conversation shifts from 'the team is slow' to 'do we cut scope or move the date'.",
   "Common mistakes: reading a burndown backward (above the ideal line is behind, not ahead); using a burndown to discuss scope creep when a burnup shows it much better; comparing the velocity of two teams; setting velocity targets; and ignoring a widening band on a CFD because the total number of items looks fine. Another is treating the ideal line as a promise; it is only a reference for comparison.",
   "Exam questions usually describe a chart and ask what it means. 'Actual line above the ideal line' means behind schedule. 'Line goes flat' suggests a blocker or unclosed work. 'Stakeholders keep adding work and you need to show it' points to a burnup chart. 'Forecast how many sprints remain' points to velocity. 'Band getting wider on a CFD' means a bottleneck in that stage. 'Compare team A with team B' using velocity is the trap answer."
  ],
  "terms": [
   [
    "Information radiator",
    "A highly visible chart or board that shows team status without anyone needing to ask."
   ],
   [
    "Burndown chart",
    "A chart of work remaining over time compared with an ideal line down to zero."
   ],
   [
    "Burnup chart",
    "A chart of work completed rising toward a separate total-scope line, making scope changes visible."
   ],
   [
    "Velocity",
    "The amount of work, usually in story points, a team completes in a sprint."
   ],
   [
    "Cumulative flow diagram (CFD)",
    "A stacked-band chart of how many items are in each workflow state over time."
   ],
   [
    "Lead time",
    "The elapsed time from when work on an item starts or is requested until it is delivered."
   ]
  ],
  "example": "A Kanban team's cumulative flow diagram shows the Testing band growing thicker every week while Done grows slowly. The project manager sees that testing is the bottleneck, sets a WIP limit on the development column so developers help with testing instead of starting new work, and within two weeks the bands even out and more items reach Done.",
  "tip": "On a burndown, actual above ideal means behind. A burnup is best for showing scope changes. Velocity is for forecasting one team's work, never for comparing teams. On a CFD a widening band is a bottleneck.",
  "check": [
   [
    "The sprint burndown line has been flat for three days. What might that indicate?",
    "Work is not being completed, perhaps because of a blocker or because finished items are not being marked done."
   ],
   [
    "Which chart best shows stakeholders that scope has grown during the release?",
    "A burnup chart, because total scope has its own line that steps up when work is added."
   ],
   [
    "A team averages 25 points per sprint and 100 points remain. What is the forecast?",
    "About four more sprints, based on average velocity."
   ],
   [
    "Why should velocity not be used to compare two teams?",
    "Each team sizes story points differently, so the numbers are not comparable, and targets encourage inflated estimates."
   ]
  ]
 },
 {
  "t": "Earned value management: PV, EV, AC, CV, SV, CPI, SPI, EAC and ETC, and interpreting the results",
  "body": [
   "Earned value management (EVM) combines scope, schedule and cost into one set of measures. Looking only at money spent tells you very little: spending half the budget is fine if half the work is done, and alarming if only a quarter is. EVM answers the real questions: are we getting the planned value for our money, and are we doing the work as fast as planned? It needs three numbers measured at the same point in time, plus the total budget.",
   "Planned value (PV) is the budgeted cost of the work scheduled to be done by now. Earned value (EV) is the budgeted cost of the work actually completed, usually budget at completion multiplied by percent complete. Actual cost (AC) is what was really spent on the work done. Budget at completion (BAC) is the total planned budget for the project. Keep EV straight in your head: it is the value of the work finished, measured in budget terms, never the money spent.",
   "Variances show the size of a problem in money. Cost variance CV = EV - AC. Schedule variance SV = EV - PV. Negative means bad, over budget or behind schedule; positive means good; zero means on plan. Performance indexes show efficiency as a ratio. The cost performance index CPI = EV / AC and the schedule performance index SPI = EV / PV. Above 1 is good, exactly 1 is on plan and below 1 is bad. A CPI of 0.8 means you get 80 cents of planned value for every dollar spent. An SPI of 1.1 means work is progressing 10 percent faster than planned.",
   "```text\nCV  = EV - AC          SV  = EV - PV\nCPI = EV / AC          SPI = EV / PV\nEAC = BAC / CPI        (current cost performance continues)\nEAC = AC + (BAC - EV)  (variance was a one-off)\nETC = EAC - AC         VAC = BAC - EAC\nTCPI = (BAC - EV) / (BAC - AC)",
   "Forecasts estimate the end result. Estimate at completion (EAC) is the expected total cost. If current cost performance is expected to continue, EAC = BAC / CPI, the most common exam formula. If the variance was a one-time event and the rest of the work will go to plan, EAC = AC + (BAC - EV). Estimate to complete (ETC) is how much more money is needed from now: ETC = EAC - AC. Variance at completion VAC = BAC - EAC shows the expected overrun (negative) or underrun (positive). The to-complete performance index (TCPI) is the cost efficiency needed on the remaining work to finish on the original budget; a TCPI well above 1 means the target is probably unrealistic.",
   "Consider a worked example. BAC is $200,000. At month 4, PV is $100,000, the team has completed 40 percent of the work so EV is $80,000, and AC is $100,000. CV = 80,000 - 100,000 = -$20,000 and CPI = 0.8, so the project is over budget. SV = 80,000 - 100,000 = -$20,000 and SPI = 0.8, so it is behind schedule. EAC = 200,000 / 0.8 = $250,000, ETC = 250,000 - 100,000 = $150,000 and VAC = 200,000 - 250,000 = -$50,000. TCPI = 120,000 / 100,000 = 1.2, meaning the team would need to become 20 percent more efficient to finish on the original budget, which is unlikely. The project manager analyzes the cause and reports the forecast honestly to the sponsor.",
   "Common mistakes: subtracting in the wrong order (always start with EV); treating AC as EV; reading a positive variance as bad; forgetting that SPI tends toward 1 at the end of a project, because all the planned work is eventually earned, so late in a project SPI can look fine even when the finish date slipped; and choosing the wrong EAC formula when the question says the problem was a one-off. Also remember that SV is measured in money, not days.",
   "Exam questions give you numbers and ask for a calculation, or give you an index and ask for an interpretation. 'CPI less than 1' means over budget; 'SPI less than 1' means behind schedule; 'CPI 1.2' means under budget. 'How much will the project cost in total' is EAC; 'how much more will we spend' is ETC; 'how much over or under the budget will we end' is VAC. 'If current trends continue' signals BAC / CPI; 'atypical' or 'one-time' signals AC + (BAC - EV)."
  ],
  "terms": [
   [
    "Planned value (PV)",
    "The budgeted cost of the work scheduled to be completed by a given date."
   ],
   [
    "Earned value (EV)",
    "The budgeted cost of the work actually completed by a given date."
   ],
   [
    "Actual cost (AC)",
    "The money actually spent on the work completed by a given date."
   ],
   [
    "Cost performance index (CPI)",
    "EV divided by AC; below 1 means over budget."
   ],
   [
    "Schedule performance index (SPI)",
    "EV divided by PV; below 1 means behind schedule."
   ],
   [
    "Estimate at completion (EAC)",
    "The forecast total cost of the project, often BAC divided by CPI."
   ],
   [
    "Estimate to complete (ETC)",
    "The forecast additional cost to finish the remaining work, EAC minus AC."
   ]
  ],
  "example": "A 10-month server migration has a BAC of $500,000. At month 5 the plan called for $250,000 of work, the team has completed work worth $275,000 and spent $300,000. SPI is 1.1, so it is ahead of schedule, but CPI is about 0.92, so it is over budget. The project manager finds that overtime is being used to stay ahead, discusses the trade-off with the sponsor and reduces overtime to protect the budget.",
  "tip": "Every formula starts with EV. Variances subtract (EV - AC, EV - PV) and indexes divide (EV / AC, EV / PV). A negative variance or an index below 1 is bad. When performance is expected to continue, EAC = BAC / CPI.",
  "check": [
   [
    "EV is $40,000 and AC is $50,000. What is CPI and what does it mean?",
    "CPI = 40,000 / 50,000 = 0.8, so the project is over budget, earning 80 cents of value per dollar spent."
   ],
   [
    "EV is $60,000 and PV is $50,000. Is the project ahead or behind schedule?",
    "Ahead: SV = +$10,000 and SPI = 1.2."
   ],
   [
    "BAC is $100,000 and CPI is 0.8. What is EAC if performance continues?",
    "EAC = 100,000 / 0.8 = $125,000."
   ],
   [
    "What does ETC tell you, and how is it calculated?",
    "How much more money is needed to finish the project: ETC = EAC - AC."
   ]
  ]
 },
 {
  "t": "Core project documents: project management plan, schedule, RACI, risk register, issue log, change log and assumption log",
  "body": [
   "Project+ expects you to know which document holds which information, because many exam questions describe a need and ask where to look or what to update. Project documents fall into two broad groups. Plans describe how the project will be run and what the targets are. Logs and registers track what is actually happening and are updated continuously. Knowing the difference, and knowing which log owns which kind of entry, lets you answer quickly.",
   "The project management plan brings together the baselines (scope, schedule and cost) and the subsidiary plans that describe how each area will be managed: communication, risk, quality, procurement, resource, stakeholder engagement and change management. It is approved during planning and changes only through change control. The project schedule lists activities with start and finish dates, durations, dependencies, milestones and assigned resources, and is often shown as a Gantt chart or milestone list. Other core documents include the charter, business case, scope statement, work breakdown structure (WBS) and WBS dictionary.",
   "The RACI chart is a type of responsibility assignment matrix (RAM). It lists deliverables or tasks down one side and people or roles across the top, and marks each cell as Responsible (does the work), Accountable (owns the outcome and signs off; exactly one per task), Consulted (gives input before or during the work, two-way) or Informed (kept up to date, one-way). A RACI prevents the classic problems of 'I thought you were doing that' and 'why was I not told'.",
   "```text\nTask              PM   Net Eng   Security   Sponsor\nFirewall design   A    R         C          I\nGo-live approval  R    C         C          A",
   "The working logs are updated throughout the project. The risk register lists each risk with its description, probability, impact, score, owner, trigger and planned response. The issue log records current problems with priority, owner, due date, actions and status. The change log records every change request with its description, requester, date, impact analysis, decision and status, including rejected ones. The assumption log records assumptions (things believed true without proof) and constraints (limits such as a fixed date or budget) and whether each has been validated; an assumption proven false often becomes a risk or an issue. The stakeholder register lists stakeholders with their interests, influence and engagement approach. The lessons learned register captures insights throughout the project, not only at the end, and some organizations keep a decision log so it is clear who decided what and why. Keep the documents consistent with each other. An approved change should update the change log, the affected baselines and the schedule. A risk that occurs should update the risk register and create an entry in the issue log. A new stakeholder may need a line in the RACI and the communication plan. Store all documents in a shared repository with version control and access that matches their sensitivity. A risk register that names security weaknesses, for example, should not be readable by everyone in the company.",
   "Consider a worked example. During a CRM (customer relationship management) rollout, the team assumed the old database used a single customer ID format. In testing, three formats turn up. You mark the assumption as invalid in the assumption log, log an issue for the failed data load with an owner and due date, and add a risk that other assumptions about data quality may be wrong. The fix needs two extra weeks, so a change request goes into the change log. Once the CCB approves it, you update the schedule baseline and inform the stakeholders listed as Informed in the RACI.",
   "Common mistakes: putting a current problem in the risk register; recording only approved changes in the change log; giving a task two Accountable people; treating the project management plan as the schedule (the schedule is one part of it); and letting logs go stale so they no longer reflect reality.",
   "Exam questions are usually 'where would you record this' or 'where would you look'. Future uncertainty goes in the risk register, a current problem in the issue log, a requested modification in the change log and an unproven belief in the assumption log. 'Who owns this task' or 'who signs off' points to the RACI, 'when is this due' to the schedule, and 'how will we manage communication' to the project management plan."
  ],
  "terms": [
   [
    "Project management plan",
    "The approved document combining the baselines and subsidiary plans that describe how the project will be run."
   ],
   [
    "RACI chart",
    "A responsibility matrix showing who is Responsible, Accountable, Consulted and Informed for each task."
   ],
   [
    "Risk register",
    "A log of identified risks with probability, impact, owner, trigger and response."
   ],
   [
    "Issue log",
    "A log of current problems with owner, priority, actions, due date and status."
   ],
   [
    "Change log",
    "A record of all change requests with their impact, decision and status."
   ],
   [
    "Assumption log",
    "A record of assumptions and constraints and whether each has been validated."
   ],
   [
    "Stakeholder register",
    "A list of stakeholders with their interests, influence and engagement approach."
   ]
  ],
  "example": "A project manager joins a struggling project and asks for four documents on day one: the RACI to see who owns what, the issue log to see current problems, the risk register to see what might go wrong next, and the change log to understand why the schedule no longer matches the original charter. Together they show that three approved changes were never reflected in the schedule baseline.",
  "tip": "Future uncertainty is the risk register; a current problem is the issue log; a requested modification is the change log; an unproven belief is the assumption log. Who owns a task is the RACI, and every task has exactly one Accountable person.",
  "check": [
   [
    "A vendor has just told you the hardware will arrive two weeks late. Where do you record it?",
    "In the issue log, because it is a problem happening now; the risk register is updated if it was an identified risk."
   ],
   [
    "How many people should be Accountable for a single task in a RACI chart?",
    "Exactly one, so there is no confusion about who owns the outcome."
   ],
   [
    "A change request was rejected. Should it appear in the change log?",
    "Yes. The change log records every request and its decision, including rejections."
   ],
   [
    "An assumption turns out to be false. Which documents are likely to change?",
    "The assumption log, and usually the risk register or issue log, plus any plan affected by the new information."
   ]
  ]
 },
 {
  "t": "Meeting and status documentation: agendas, minutes, action items, status reports and executive summaries",
  "body": [
   "A large part of a project manager's job is keeping people informed, and much of that happens through meetings and reports. Good documentation makes meetings shorter, decisions clearer and follow-up reliable. Poor documentation leads to repeated discussions, forgotten tasks and arguments about what was agreed. The exam tests whether you know which document is used when, what each should contain and how to tailor reporting to different audiences.",
   "An agenda is sent before a meeting. It states the purpose, date and time, location or video link, attendees, the topics with time allocations and presenter, and any pre-reading. A clear agenda lets people prepare, lets invitees decide whether they really need to attend, and helps the facilitator keep the meeting on track. A good habit is to put decisions needed near the top, so they are not squeezed out at the end.",
   "Meeting minutes are sent after the meeting, ideally within a day. They record attendees and absentees, key discussion points, decisions made and action items. An action item is a specific task with a single owner and a due date, such as 'Priya to confirm the switch delivery date with the vendor by Thursday'. Items without an owner or date tend not to happen. Action items are tracked, often in an action item log, until they are closed, and open items are reviewed at the start of the next meeting. Minutes should be factual and brief, not a transcript.",
   "Status reports summarize progress for a reporting period. A typical report includes overall status, often shown as red, amber or green (RAG); accomplishments since the last report; planned work for the next period; schedule and budget status, perhaps with SPI and CPI; milestone status; top risks and issues; approved or pending changes; and decisions or help needed. Keep it honest and specific. A report that shows green for months and then suddenly turns red has failed its readers. Status meetings review the same information interactively and are a good place to remove blockers.",
   "Executive summaries and dashboards are written for senior leaders, who have little time and need the big picture: are we on track, what are the main risks, and what do you need from me? One page or one screen is ideal, with detail available on request. Different audiences need different reports. The team wants task-level detail, the sponsor wants status, trends and decisions, and end users want to know what is changing for them and when. The communication plan defines who gets which report, in what format, how often and from whom. Other useful records include a decision log, a meeting schedule, a project calendar and attendance records for formal reviews such as phase gates.",
   "Consider a worked example. Your weekly project meeting keeps overrunning and the same topics come up every week. You start sending an agenda two days ahead with timed topics and the decisions needed. During the meeting, you capture each decision and assign every action to one named person with a date. Minutes go out the same afternoon. The next week you open by reviewing the action items, and most are done. Meanwhile, the steering committee receives a one-page executive summary with RAG status, the top three risks and one decision needed, rather than the 20-page status pack they had stopped reading.",
   "Common mistakes: sending minutes that record discussion but no decisions or actions; assigning an action to 'the team' or to two people; sending executives raw logs or detailed Gantt charts; hiding bad news with green status until it is too late; and holding a status meeting for information that could have gone in a written update. Another mistake is not reviewing open action items, which quietly teaches everyone that they do not matter. Finally, avoid distributing minutes so late that people have already forgotten the meeting; a short, prompt record beats a perfect one sent a week later.",
   "Exam wording is usually straightforward. 'Before the meeting, so attendees can prepare' is the agenda. 'After the meeting, recording decisions and assignments' is the minutes. 'Task with an owner and due date' is an action item. 'Regular summary of progress, risks and issues' is a status report. 'Senior leadership with limited time' points to an executive summary or dashboard. 'Who receives which report and how often' points to the communication plan."
  ],
  "terms": [
   [
    "Agenda",
    "A document sent before a meeting listing its purpose, topics, timings and attendees."
   ],
   [
    "Meeting minutes",
    "A written record, sent after a meeting, of attendees, key points, decisions and action items."
   ],
   [
    "Action item",
    "A specific task arising from a meeting, assigned to one owner with a due date."
   ],
   [
    "Status report",
    "A periodic summary of progress, schedule, budget, risks, issues and upcoming work."
   ],
   [
    "RAG status",
    "A red, amber or green indicator showing whether a project or area is on track."
   ],
   [
    "Executive summary",
    "A brief, high-level report for senior leaders focused on status, key risks and decisions needed."
   ]
  ],
  "example": "After a steering committee meeting, the project manager sends minutes within two hours listing three decisions and four action items, each with one owner and a date. One action, the security team's review of the vendor contract, is still open a week later; because it is on the action log reviewed at the next meeting, the delay is noticed and escalated before it affects the go-live.",
  "tip": "Before the meeting comes the agenda; after it, minutes with decisions and action items. Every action item needs one owner and a due date. Executives get summaries or dashboards, not raw logs.",
  "check": [
   [
    "What three things must a well-formed action item include?",
    "A specific task, a single owner and a due date."
   ],
   [
    "When is an agenda sent, and why?",
    "Before the meeting, so attendees can prepare, know the purpose and topics, and decide whether to attend."
   ],
   [
    "What should an executive summary emphasize?",
    "Overall status, key risks or issues, trends and any decisions or support needed from leadership, in a short format."
   ],
   [
    "Which document defines who receives the weekly status report and in what format?",
    "The communication plan."
   ]
  ]
 },
 {
  "t": "Vendor and procurement documents: NDA, MOU, SLA, SOW, purchase orders, invoices and change orders",
  "body": [
   "IT projects rarely deliver everything with internal staff. Hardware, software, cloud services and specialist skills are bought from vendors, so project managers regularly handle vendor documents. You are not expected to be a lawyer; legal and procurement teams draft and approve contracts. But you do need to know what each document does, when it is used and which one fits a situation, because using the wrong one can leave the organization unprotected.",
   "A non-disclosure agreement (NDA) is a legal contract in which one or both parties agree to keep shared information confidential. A one-way (unilateral) NDA protects one party's information; a mutual NDA protects both. It is signed before you share designs, network diagrams, source code or business plans with a vendor, often during evaluation before any purchase. A memorandum of understanding (MOU) records the intent of two or more parties to work together and their general responsibilities. It is usually not legally binding in the way a contract is and is common between departments, universities, agencies or partner organizations. A memorandum of agreement (MOA) is similar but more specific about each party's commitments.",
   "A statement of work (SOW) defines the work a vendor will perform: scope, deliverables, schedule, location, acceptance criteria, standards and reporting. It becomes part of the contract, and a vague SOW is a leading cause of disputes. A service level agreement (SLA) defines measurable service levels for an ongoing service, such as availability targets, response and resolution times by severity, and the remedies, often service credits, if they are missed. A master services agreement (MSA) sets general legal terms, such as liability, payment and confidentiality, for a long-term relationship, with a separate SOW for each piece of work. An operating level agreement (OLA) is an internal agreement between teams that supports an SLA. Related documents include a request for proposal (RFP), which asks vendors to propose solutions and prices, a request for quote (RFQ) for pricing on a defined item, and a request for information (RFI) to learn what the market offers.",
   "A purchase order (PO) is the buyer's formal document authorizing a purchase, listing items, quantities, prices, delivery dates and terms. Once the vendor accepts it, it is binding. An invoice is the vendor's request for payment. The project manager or finance team checks it against the PO and confirmation that the goods or services were received and accepted, known as a three-way match, before approving payment. A change order is a formal amendment to a contract or PO that changes scope, price or schedule. It follows the project's change control process and must be signed by both parties. Warranties, licensing agreements and end-user license agreements (EULAs) may also be part of a project's vendor paperwork.",
   "The documents usually appear in a sequence. An RFI or RFP starts the search, an NDA protects information shared during evaluation, the chosen vendor signs an MSA and SOW (and an SLA if they will run a service), a PO authorizes the spend, invoices are matched and paid as work is accepted, and change orders handle any changes along the way.",
   "Consider a worked example. Your organization wants a managed security monitoring service. Before sharing network diagrams with three shortlisted vendors, you have each sign an NDA. The winner signs an MSA plus a SOW for onboarding and an SLA committing to response times for critical alerts. Finance issues a PO. Two months in, you add monitoring for a new office, so a change order adjusts scope and monthly price. When an invoice arrives for the full onboarding fee but only half the onboarding is accepted, the three-way match catches it and you pay only for accepted work.",
   "Common mistakes: sharing sensitive information before an NDA is signed; treating an MOU as an enforceable contract; confusing a SOW (what work will be done) with an SLA (what service level will be maintained); paying invoices without checking receipt and acceptance; and letting a vendor start extra work on a verbal request instead of a signed change order.",
   "Exam clues map directly to documents. 'Keep information confidential' is an NDA. 'Intent to cooperate, not legally binding' is an MOU. 'Uptime and response-time targets with penalties' is an SLA. 'Detailed description of work and deliverables' is a SOW. 'Authorize the purchase' is a PO. 'Vendor requests payment' is an invoice. 'Formally change the contract's scope or price' is a change order."
  ],
  "terms": [
   [
    "Non-disclosure agreement (NDA)",
    "A contract that obliges one or both parties to keep shared information confidential."
   ],
   [
    "Memorandum of understanding (MOU)",
    "A document recording parties' intent to cooperate, usually not legally binding."
   ],
   [
    "Statement of work (SOW)",
    "A document defining the work, deliverables, schedule and acceptance criteria for a vendor."
   ],
   [
    "Service level agreement (SLA)",
    "An agreement defining measurable service targets and remedies if they are missed."
   ],
   [
    "Purchase order (PO)",
    "The buyer's formal authorization to purchase specified goods or services on stated terms."
   ],
   [
    "Three-way match",
    "Checking an invoice against the purchase order and proof of receipt before paying."
   ],
   [
    "Change order",
    "A formal, signed amendment to a contract or purchase order changing scope, price or schedule."
   ]
  ],
  "example": "A hospital IT department contracts a vendor to install a new nurse-call system. The SOW lists every ward, the deliverables and acceptance tests; the PO authorizes the spend; and a separate SLA covers support after go-live with four-hour response for critical faults. When the hospital adds a new wing mid-project, the vendor refuses to begin until a signed change order updates the scope and price, which protects both sides.",
  "tip": "Confidentiality is an NDA; intent to cooperate without binding terms is an MOU; measurable service targets are an SLA; the work to be performed is a SOW; authorization to buy is a PO; a signed contract amendment is a change order.",
  "check": [
   [
    "You must share network diagrams with a prospective vendor. What should be signed first?",
    "An NDA, so the vendor is legally obliged to keep the information confidential."
   ],
   [
    "What is the difference between a SOW and an SLA?",
    "A SOW defines the project work and deliverables; an SLA defines measurable ongoing service levels and remedies."
   ],
   [
    "What is a three-way match?",
    "Comparing the invoice with the purchase order and proof that goods or services were received and accepted before paying."
   ],
   [
    "Midway through a contract you need extra deliverables from the vendor. What document is required?",
    "A change order signed by both parties, processed through change control."
   ]
  ]
 },
 {
  "t": "Decision-making tools: SWOT, cost-benefit analysis, decision trees and expected monetary value, brainstorming and root cause analysis",
  "body": [
   "Projects involve a constant stream of decisions: which option to fund, which vendor to pick, how to respond to a risk, why a problem keeps coming back. Structured decision tools make those choices more objective, easier to explain to stakeholders and easier to defend later. The exam tests whether you can match each tool to its purpose and, for expected monetary value, do the arithmetic.",
   "SWOT analysis lists Strengths and Weaknesses, which are internal to the organization or project, and Opportunities and Threats, which are external. It is drawn as a two-by-two grid. SWOT is useful during discovery to evaluate an idea, and during risk identification, because weaknesses and threats suggest negative risks while strengths and opportunities point to positive risks worth pursuing. A common exam trap is placing a competitor's move under Weaknesses; anything outside the organization belongs under Opportunities or Threats.",
   "Cost-benefit analysis compares the total expected costs of an option with its expected benefits. Costs include purchase, implementation, training and ongoing support; benefits include tangible ones such as reduced labor or avoided license fees and intangible ones such as better customer satisfaction. It supports business cases, make-or-buy decisions and change requests, and is often summarized with measures such as payback period, return on investment (ROI) or net present value (NPV). A weighted scoring model, or decision matrix, goes further by scoring each option against several criteria, each given a weight, and adding up the results. It is the usual tool for vendor selection.",
   "Expected monetary value (EMV) is probability multiplied by impact. A risk with a 20 percent chance of costing $50,000 has an EMV of -$10,000; an opportunity with a 30 percent chance of saving $20,000 has an EMV of +$6,000. The EMV of a set of risks is the sum of their individual EMVs, which helps size a contingency reserve. A decision tree maps a decision, its options and the uncertain outcomes of each, with probabilities and values on the branches. You calculate each option's expected cost or value, including the option's own cost, and choose the best.",
   "Brainstorming generates many ideas quickly in a group, without criticizing them at first, so that quantity leads to quality. The nominal group technique adds silent individual idea generation and then voting, so quieter members contribute and a few loud voices do not dominate. The Delphi technique collects anonymous expert opinions over several rounds, with a facilitator sharing a summary between rounds, to reach consensus without group pressure. Root cause analysis (RCA) finds the underlying reason for a problem rather than the symptom. Techniques include the five whys, fishbone diagrams and Pareto analysis. Fixing the root cause prevents recurrence; fixing only the symptom means the problem usually returns.",
   "Consider a worked example. You must choose between two ways to migrate a database. Option A uses in-house staff and costs $40,000, but there is a 10 percent chance of a failure that would cost $100,000 to recover. Its expected cost is 40,000 + (0.10 x 100,000) = $50,000. Option B hires a specialist vendor for $55,000 with a negligible chance of failure, so its expected cost is $55,000. On EMV alone, Option A is better by $5,000. Before recommending it, you run a quick SWOT on the in-house team, noting a weakness in migration experience, and present both the numbers and the risk appetite question to the sponsor, who decides.",
   "Common mistakes: forgetting to include an option's own cost in a decision tree; using the wrong sign (threats are negative, opportunities positive); placing external factors in Strengths or Weaknesses; treating brainstorming as a place to evaluate ideas immediately; and stopping root cause analysis at the first symptom, such as 'the server crashed', instead of asking why until you reach a process or design cause. Another error is thinking EMV removes judgment; it informs the decision but the organization's risk tolerance still matters.",
   "Exam questions use clear clue words. 'Internal and external factors' is SWOT. 'Compare costs and benefits' or 'justify the investment' is cost-benefit analysis. 'Several criteria with weights to choose a vendor' is a weighted scoring model. 'Probability times impact' is EMV, and 'branches with probabilities for each option' is a decision tree. 'Anonymous experts, several rounds' is the Delphi technique. 'Quiet team members, silent ideas then voting' is the nominal group technique. 'Keep asking why' or 'prevent it happening again' is root cause analysis."
  ],
  "terms": [
   [
    "SWOT analysis",
    "A grid of internal Strengths and Weaknesses and external Opportunities and Threats."
   ],
   [
    "Cost-benefit analysis",
    "Comparing an option's total expected costs with its expected benefits to judge if it is worthwhile."
   ],
   [
    "Weighted scoring model",
    "A decision matrix that scores options against weighted criteria, often used for vendor selection."
   ],
   [
    "Expected monetary value (EMV)",
    "Probability multiplied by impact, used to compare risks and options in money terms."
   ],
   [
    "Decision tree",
    "A diagram of a decision's options and their uncertain outcomes, with probabilities and values on each branch."
   ],
   [
    "Delphi technique",
    "Gathering anonymous expert opinions over several rounds to reach consensus without group pressure."
   ],
   [
    "Root cause analysis",
    "Identifying the underlying cause of a problem so it can be fixed permanently."
   ]
  ],
  "example": "A project team must decide whether to buy extended hardware support. There is a 25 percent chance of a major failure costing $80,000, so the EMV of going without support is -$20,000, while support costs $12,000. The decision tree shows buying support has the lower expected cost, and the project manager records the analysis in the business case so the choice can be explained later.",
  "tip": "EMV is probability times impact. In a decision tree, add each option's own cost to its expected risk cost and pick the lowest total or the highest value. Delphi means anonymous experts; the five whys and fishbone diagrams mean root cause analysis.",
  "check": [
   [
    "A risk has a 40 percent chance of causing a $25,000 loss. What is its EMV?",
    "0.40 x 25,000 = $10,000, expressed as -$10,000 because it is a threat."
   ],
   [
    "In SWOT, where does 'a competitor is launching a similar product' belong?",
    "Threats, because it is an external factor that could harm the project or organization."
   ],
   [
    "Why would you use the Delphi technique instead of an open meeting?",
    "To get independent expert opinions without group pressure or dominant personalities, since responses are anonymous."
   ],
   [
    "A server keeps failing and the team restarts it each time. What should they do instead?",
    "Root cause analysis, such as the five whys, to find and fix the underlying cause so the failure stops recurring."
   ]
  ]
 },
 {
  "t": "Security concepts for IT projects: CIA triad, least privilege, access reviews and building security requirements in from the start",
  "body": [
   "Every IT project touches security, even when security is not its goal. A new application may store personal data, a network upgrade may open new paths into the company, and a vendor may need access to internal systems. Project+ does not expect deep technical security skills, but it does expect a project manager to recognize security needs, involve the security team early and plan the work and time that security requires.",
   "The CIA triad summarizes what security protects. Confidentiality means only authorized people can see information; it is achieved with access controls, authentication and encryption. Integrity means information is accurate and not altered without authorization; it is supported by hashing, digital signatures, change control and audit logs. Availability means systems and data are there when needed; it is supported by redundancy, backups, capacity planning and protection against denial-of-service attacks. A project's requirements should state which of the three matters most for the system being built. A public website may prioritize availability and integrity, while a human resources (HR) system prioritizes confidentiality.",
   "Least privilege means people and systems get only the access they need to do their job, and only for as long as they need it. On projects, this applies to team members, contractors, vendors and service accounts. Request specific, time-limited access; avoid shared or generic accounts so every action can be traced to an individual; give administrative rights only to those who need them, ideally through separate admin accounts; and remove access when the work ends. Access reviews, sometimes called access recertification, periodically confirm that each person's access is still appropriate, and the owner of the system signs off on the result. Separation of duties means no single person controls a whole sensitive process; for example, the developer who writes code is not the only one who approves and deploys it. Multifactor authentication (MFA), which requires two or more kinds of proof such as a password plus an authenticator app, should protect administrative and remote access.",
   "Building security in from the start, often called security by design or 'shifting left', is far cheaper than bolting it on later. In practice this means including the security team in requirements gathering; writing security and compliance requirements alongside functional ones, such as 'all administrative access requires MFA' or 'data at rest is encrypted'; budgeting time for threat modeling, security reviews, vulnerability scanning and penetration testing by authorized testers; and making security sign-off part of the go-live criteria. Vendors should be assessed for their security practices before contracts are signed. Security incidents during the project, such as a lost laptop holding project data, must be reported through the organization's incident response process.",
   "Security also shows up in project documents. The risk register should contain security risks with owners. The RACI should show who is consulted from security and who approves. The change log should record security-related changes, and test plans should include security testing, not just functional testing.",
   "Consider a worked example. Your project brings in an external developer to build a customer portal. Instead of sharing a team admin password, you request a named account with access only to the development environment, expiring at the end of the contract, protected by MFA. Requirements include encrypting customer data and logging administrative actions. The security team reviews the design in week three, a vulnerability scan runs before user acceptance testing, and go-live requires the security lead's sign-off. At closing, the developer's account is removed and an access review confirms nothing was left behind.",
   "Common mistakes: giving contractors broad or permanent access 'to save time'; using shared accounts; scheduling security testing after the go-live date is fixed, so findings cannot be addressed; treating security as the security team's problem only; and forgetting to remove access at closing. Another is thinking encryption alone solves everything; it protects confidentiality but does not provide availability.",
   "Exam questions usually ask what access to grant or when to involve security. Choose the narrowest, time-limited, individually named option. 'Prevent one person from both creating and approving' points to separation of duties. 'Confirm people still need their access' points to an access review. 'Data must not be read by unauthorized people' is confidentiality; 'data must not be changed' is integrity; 'system must stay up' is availability. 'When should security requirements be defined' is during planning and requirements, not after testing."
  ],
  "terms": [
   [
    "CIA triad",
    "The three core security goals: confidentiality, integrity and availability."
   ],
   [
    "Least privilege",
    "Giving users and systems only the minimum access needed, for only as long as needed."
   ],
   [
    "Access review",
    "A periodic check that each person's access rights are still appropriate, approved by the system owner."
   ],
   [
    "Separation of duties",
    "Splitting sensitive tasks so no single person controls an entire process."
   ],
   [
    "Multifactor authentication (MFA)",
    "Authentication that requires two or more different types of proof of identity."
   ],
   [
    "Security by design",
    "Building security requirements and testing into a project from the start rather than adding them later."
   ]
  ],
  "example": "An audit after a CRM (customer relationship management) project finds that ten former contractors still have accounts, two sharing an administrator password. The next project changes its approach: named, time-limited accounts with MFA, a quarterly access review signed by the system owner, and account removal as a formal closing task. Security requirements are now written during planning, and a security sign-off is a go-live criterion.",
  "tip": "When asked what access to give a contractor or team member, choose the narrowest, time-limited, individually named option. Security requirements belong in planning and requirements, not after testing.",
  "check": [
   [
    "Which part of the CIA triad does encryption of stored data mainly protect?",
    "Confidentiality, because it stops unauthorized people from reading the data."
   ],
   [
    "Why avoid shared accounts on a project?",
    "Actions cannot be traced to an individual, and access cannot be removed for one person without affecting others."
   ],
   [
    "What is the purpose of an access review?",
    "To confirm periodically that each person's access is still needed and appropriate, and to remove what is not."
   ],
   [
    "When should a project define its security requirements?",
    "Early, during planning and requirements gathering, alongside functional requirements, with the security team involved."
   ]
  ]
 },
 {
  "t": "Data privacy and compliance: PII, PHI, data classification, retention, GDPR, HIPAA, PCI DSS and audits",
  "body": [
   "Many IT projects collect, move or store data about people, and that brings legal, regulatory and contractual obligations. A project manager does not need to be a lawyer, but must recognize regulated data when it appears, involve the privacy and compliance teams early, and plan the extra requirements, reviews and time that compliance adds. Getting this wrong can lead to fines, breach notifications, lost customer trust and a system that cannot go live.",
   "Personally identifiable information (PII) is any information that can identify a person, alone or combined with other data: names, addresses, government identification numbers, email addresses, phone numbers, dates of birth and so on. Protected health information (PHI) is health-related information linked to an individual, such as diagnoses, treatment records and insurance details. Cardholder data includes payment card numbers and related details such as the cardholder name and expiry date. Each of these is sensitive, and each is covered by different rules.",
   "Several regulations and standards appear on the exam. The General Data Protection Regulation (GDPR) is a European Union (EU) law that applies to organizations processing personal data of people in the EU, wherever the organization is located. It requires a lawful basis for processing, data minimization, transparency, individual rights such as access and erasure, privacy by design and timely breach notification. The Health Insurance Portability and Accountability Act (HIPAA) is a United States law protecting PHI handled by healthcare providers, health plans and their business associates, such as a vendor hosting patient records. The Payment Card Industry Data Security Standard (PCI DSS) is an industry standard, enforced through contracts with card brands and banks, for anyone who stores, processes or transmits cardholder data. Other examples include state privacy laws and sector rules for finance or government; the key skill is recognizing that regulated data drives requirements.",
   "Data classification labels data by sensitivity so the right controls are applied, commonly public, internal, confidential and restricted or regulated. Classification drives encryption, access, sharing rules and where data may be stored, including which cloud region may be used. Data retention policies say how long records must be kept and when they must be securely deleted; project documents and migrated data must follow them, and a legal hold overrides normal deletion when litigation is expected. Data sovereignty and residency rules may require data to stay in a particular country. Data minimization, collecting only what is needed, reduces both risk and compliance effort.",
   "Audits check compliance, either internally or by external auditors or assessors. Projects should plan for audits from the start: keep evidence of approvals, testing, risk decisions and access reviews, and involve the compliance or privacy team. A privacy impact assessment (PIA), called a data protection impact assessment (DPIA) under GDPR for high-risk processing, identifies privacy risks early. Using real personal data in test environments is a common mistake; masked, anonymized or synthetic data is safer.",
   "Consider a worked example. A clinic network is replacing its patient scheduling system. The data includes names and appointment reasons, so it is PHI under HIPAA. The project adds the privacy officer to the stakeholder register, runs a privacy impact assessment, requires the vendor to sign a business associate agreement, and specifies encryption and access logging. Test environments use synthetic patients. The old system's data is migrated according to the retention policy, and records past their retention period are securely deleted. Evidence of each step is kept for the next audit.",
   "Common mistakes: thinking GDPR applies only to EU companies; confusing HIPAA (a law about health data) with PCI DSS (an industry standard for card data); copying production data into test systems; ignoring retention rules during a migration, either by deleting records that must be kept or by keeping data longer than allowed; storing regulated data in an unapproved region; and leaving compliance review until just before go-live.",
   "On the exam, 'health records' or 'patient data' points to PHI and HIPAA. 'Credit card numbers' points to PCI DSS. 'Personal data of people in the EU' points to GDPR, even if the company is based elsewhere. 'How long must records be kept' is retention; 'label data by sensitivity' is classification; 'data must remain in the country' is data sovereignty or residency. 'Testing needs realistic data' points to masked or synthetic data, never live personal data."
  ],
  "terms": [
   [
    "Personally identifiable information (PII)",
    "Information that can identify a specific person, alone or combined with other data."
   ],
   [
    "Protected health information (PHI)",
    "Health-related information that is linked to an identifiable individual."
   ],
   [
    "GDPR",
    "The EU's General Data Protection Regulation, which governs processing of personal data of people in the EU."
   ],
   [
    "HIPAA",
    "A United States law protecting health information held by healthcare organizations and their business associates."
   ],
   [
    "PCI DSS",
    "The Payment Card Industry Data Security Standard for organizations that handle cardholder data."
   ],
   [
    "Data classification",
    "Labeling data by sensitivity so appropriate security controls are applied."
   ],
   [
    "Data retention policy",
    "Rules for how long records must be kept and when they must be securely deleted."
   ]
  ],
  "example": "An online retailer based outside Europe launches a website for EU customers. Because it will process personal data of people in the EU, GDPR applies, so the project adds a consent mechanism, a way for customers to request their data or its deletion, and a breach notification procedure. Card payments go through a payment provider to reduce PCI DSS scope, and developers test with synthetic customer data.",
  "tip": "Health records mean PHI and HIPAA. Card numbers mean PCI DSS. Personal data of people in the EU means GDPR, even if the company is elsewhere. Test with masked or synthetic data, never real personal data.",
  "check": [
   [
    "A company in North America sells online to customers in France. Does GDPR apply?",
    "Yes. GDPR applies to processing personal data of people in the EU, regardless of where the company is located."
   ],
   [
    "Which standard applies to a system that stores payment card numbers?",
    "PCI DSS, the industry standard for protecting cardholder data."
   ],
   [
    "Why should test environments not use real personal data?",
    "Test systems usually have weaker controls and wider access, so real data there risks a breach; masked or synthetic data avoids that."
   ],
   [
    "What overrides normal deletion under a retention policy?",
    "A legal hold, which requires data to be preserved when litigation or an investigation is expected."
   ]
  ]
 },
 {
  "t": "IT infrastructure basics: servers, networks, storage and endpoints, and how infrastructure changes affect projects",
  "body": [
   "A project manager does not need to configure a router or build a server, but they do need to understand the parts of IT infrastructure well enough to plan the work, ask the right questions, estimate realistically and see how changes ripple across the organization. Many project delays come from infrastructure surprises: hardware that takes weeks to arrive, a firewall change nobody requested, or a storage system that is already full.",
   "Servers provide services such as email, file storage, databases, authentication and business applications. They may be physical machines, virtual machines (VMs) running on a hypervisor that lets one physical host run many VMs, or instances in the cloud. Networks connect everything: local area networks (LANs) inside buildings, wide area networks (WANs) between sites, wireless networks, switches and routers that move traffic, firewalls that filter it, virtual private networks (VPNs) for remote access, and internet connections. Supporting services tie it together: directory services for user accounts and authentication, the Domain Name System (DNS) to translate names into addresses, and the Dynamic Host Configuration Protocol (DHCP) to hand out IP addresses automatically.",
   "Storage holds the organization's data. It can be disks inside servers (direct-attached storage), network-attached storage (NAS) that shares files over the network, a storage area network (SAN) that provides high-performance block storage to servers over a dedicated network, or cloud object storage. Endpoints are the devices people use: desktops, laptops, phones, tablets, printers and increasingly Internet of Things (IoT) devices. Endpoints need imaging (installing a standard configuration), management tools, security software and support.",
   "Infrastructure changes affect projects in several predictable ways. They often require downtime, so they must be scheduled in maintenance windows and approved through operational change management. They create dependencies: a new application cannot go live until the servers, network rules, DNS entries and service accounts exist, and those tasks belong on the schedule with owners. Capacity matters: a new video system may need more bandwidth, and a data migration needs enough storage and enough time to copy the data. Compatibility issues arise when older systems cannot run new software, and end-of-life (EOL) hardware or software, no longer supported by the vendor, may force a project to happen at all.",
   "Other practical considerations include procurement lead times for ordering and shipping hardware, which belong in the schedule; licensing, which may be per user, per device or per processor core; vendor support contracts; monitoring so operations can see problems; documentation such as network diagrams and asset inventories; and the impact on users, since new devices need imaging, training and a help desk that is ready for questions. Asking infrastructure teams early about capacity, lead times and change windows prevents many late surprises. A simple infrastructure checklist reviewed during planning, covering hardware, network, storage, accounts, certificates and monitoring, catches most of the forgotten tasks.",
   "Consider a worked example. A department wants a new document management system in three months. When you meet the infrastructure team, you learn that the servers need eight weeks to arrive, the SAN has limited free space, a firewall rule is needed for the vendor's support connection, and the only available maintenance windows are on Sunday mornings. You add hardware ordering as an early task on the critical path, raise a risk about storage, submit a change request for the firewall rule, and plan the cutover for a Sunday window. The schedule becomes realistic before anyone commits to a date.",
   "Common mistakes: assuming infrastructure is 'just there' and free; leaving hardware ordering until the design is final; forgetting DNS, certificates, accounts and firewall rules on the task list; skipping capacity planning for storage and bandwidth; ignoring end-of-life systems that the new solution must connect to; and scheduling cutovers in business hours without change approval. Another error is forgetting the endpoints: a new application may need client software installed on hundreds of laptops.",
   "Exam questions about infrastructure usually test impact rather than technology. 'Change requires downtime' points to a maintenance window and change approval. 'Application depends on new servers' is a dependency to schedule. 'Hardware takes weeks to arrive' is lead time and belongs in the schedule, often on the critical path. 'Vendor no longer supports the system' is end of life and is a driver or risk. 'Users receive new laptops' points to imaging, training and help desk readiness."
  ],
  "terms": [
   [
    "Server",
    "A computer, physical or virtual, that provides services such as applications, files or databases to other devices."
   ],
   [
    "Virtual machine (VM)",
    "A software-based computer running on a hypervisor, sharing a physical host with other VMs."
   ],
   [
    "Endpoint",
    "A device people use directly, such as a laptop, desktop, phone or printer."
   ],
   [
    "Storage area network (SAN)",
    "A dedicated network that provides high-performance block storage to servers."
   ],
   [
    "Lead time",
    "The time between ordering something and receiving it, which must be built into the schedule."
   ],
   [
    "End of life (EOL)",
    "The point at which a vendor stops supporting a product, often forcing an upgrade or replacement."
   ]
  ],
  "example": "A school district plans to roll out new wireless access points over the summer. The project manager learns that the access points have a long lead time, the network switches need upgrades to power them, and the firewall must be updated for a new controller. Ordering is moved to the first week, switch upgrades are scheduled in maintenance windows, and the help desk is briefed before students return.",
  "tip": "Infrastructure questions usually test impact: downtime needs a maintenance window and change approval, new systems create dependencies and capacity needs, and hardware lead times belong in the schedule, often on the critical path.",
  "check": [
   [
    "Why should hardware lead times be added to the project schedule early?",
    "Because delivery can take weeks, and dependent tasks cannot start until the hardware arrives, so it may be on the critical path."
   ],
   [
    "A new application needs firewall rules and DNS entries before go-live. What are these from a scheduling point of view?",
    "Dependencies, which must be tasks with owners and dates, often requiring change approval."
   ],
   [
    "What is the difference between NAS and a SAN?",
    "NAS shares files over the regular network; a SAN provides high-performance block storage to servers over a dedicated network."
   ],
   [
    "A critical system runs on software the vendor no longer supports. How does that affect projects?",
    "End-of-life software is a risk and often a driver for a project to upgrade or replace it."
   ]
  ]
 },
 {
  "t": "Cloud and deployment models: on-premises, IaaS, PaaS, SaaS, public, private and hybrid cloud, and their trade-offs",
  "body": [
   "Many projects today involve the cloud, either moving existing systems there or adopting new cloud services. The model chosen changes the work to be done, the costs and how they are paid, the risks, and who is responsible for what. The exam tests the service models, the deployment models and the trade-offs a project manager must plan for.",
   "On-premises means the organization owns and runs the hardware and software in its own facilities. It gives maximum control and can suit strict regulatory or latency needs, but it requires capital spending, staff, space, power and cooling, and adding capacity takes time because hardware must be bought and installed. Cloud service models share the work with a provider. In infrastructure as a service (IaaS), the provider supplies virtual machines, storage and networking; the customer manages the operating system (OS), middleware, applications and data. In platform as a service (PaaS), the provider also manages the OS and runtime, and the customer deploys code and manages data. In software as a service (SaaS), the provider runs the whole application; the customer configures it and manages users and data.",
   "This division is called the shared responsibility model. The more the provider manages, the less the customer does, but the customer is always responsible for its data, for who has access, and for configuring the service securely. A misconfigured storage bucket or an account without MFA is the customer's problem, not the provider's. A simple way to remember the service models is by what you manage: with IaaS you patch the OS; with PaaS you deploy code; with SaaS you just use and configure the application.",
   "Deployment models describe who uses the cloud and where it runs. A public cloud is run by a provider and shared by many customers over the internet. A private cloud is dedicated to one organization, either in its own data center or hosted by a provider. A hybrid cloud combines on-premises or private resources with public cloud, connected so workloads and data can move between them, which is common during a migration or when some data must stay on-premises. A community cloud is shared by organizations with common requirements, such as government agencies. Multicloud means using services from more than one public cloud provider, which can reduce dependence on one vendor but adds complexity.",
   "For a project manager, the trade-offs appear in several places. Costs shift from capital expenditure (CapEx), large upfront purchases, to operating expenditure (OpEx), ongoing monthly fees based on usage or subscriptions, so budgets must include recurring costs and a way to monitor and control them. Speed usually improves because resources can be provisioned in minutes and scaled up or down as needed (elasticity). Risks include vendor lock-in, data residency and compliance, dependence on internet connectivity, and changes to the provider's service or pricing. SaaS projects focus on configuration, integration, data migration and training rather than building. Contracts and SLAs with the provider become key documents, and an exit plan for getting data back should be considered from the start.",
   "Consider a worked example. A company's email servers are nearing end of life. Replacing them on-premises would mean a large hardware purchase, installation and ongoing patching. Moving to a SaaS email service changes the project: no hardware to order, a monthly per-user subscription added to the operating budget, a migration plan for mailboxes, a hybrid period where both systems run, MFA enabled for all users, retention settings configured to meet policy, and user training. The project manager reviews the provider's SLA and confirms where the data will be stored to meet residency requirements.",
   "Common mistakes: assuming the provider is responsible for data security in SaaS; forgetting ongoing subscription costs in the budget; confusing a private cloud (dedicated to one organization) with on-premises (which may or may not be cloud-style); treating hybrid and multicloud as the same thing; and ignoring the exit strategy until the contract is ending.",
   "Exam clues are usually about responsibility and control. 'Least customer management' or 'use the application as-is' is SaaS. 'Customer manages the OS' is IaaS. 'Deploy code without managing servers' is PaaS. 'On-premises combined with public cloud' is hybrid; 'more than one provider' is multicloud; 'shared by organizations with common needs' is community. 'Move spending from CapEx to OpEx' points to cloud adoption, and 'who is always responsible for data and access' is the customer."
  ],
  "terms": [
   [
    "Infrastructure as a service (IaaS)",
    "A cloud model where the provider supplies compute, storage and networking and the customer manages the OS and above."
   ],
   [
    "Platform as a service (PaaS)",
    "A cloud model where the provider manages the infrastructure, OS and runtime, and the customer deploys code and manages data."
   ],
   [
    "Software as a service (SaaS)",
    "A cloud model where the provider runs the whole application and the customer configures it and manages users and data."
   ],
   [
    "Shared responsibility model",
    "The division of security and management duties between the cloud provider and the customer."
   ],
   [
    "Hybrid cloud",
    "A combination of on-premises or private resources with public cloud services that work together."
   ],
   [
    "Multicloud",
    "Using cloud services from more than one provider."
   ],
   [
    "CapEx vs OpEx",
    "Capital expenditure is upfront investment in assets; operating expenditure is ongoing spending such as subscriptions."
   ]
  ],
  "example": "A startup builds its web application on a PaaS offering so developers can deploy code without patching servers, stores backups in public cloud object storage, and uses SaaS tools for email and ticketing. Its finance team plans monthly OpEx instead of buying servers, and the project manager adds a quarterly review of cloud spending and access permissions because the company, not the provider, is responsible for its data and user access.",
  "tip": "Least customer management is SaaS; control of the OS is IaaS; deploying your own code without managing servers is PaaS. Cloud shifts spending from CapEx to OpEx, and the customer always remains responsible for its data and access.",
  "check": [
   [
    "In which service model does the customer patch the operating system?",
    "IaaS, because the provider supplies only the infrastructure and the customer manages the OS and everything above it."
   ],
   [
    "A company keeps sensitive databases on-premises but runs its web front end in a public cloud, connected together. Which deployment model is this?",
    "Hybrid cloud."
   ],
   [
    "Under the shared responsibility model, who is responsible for user access in a SaaS application?",
    "The customer, who manages its users, permissions and data even though the provider runs the application."
   ],
   [
    "How does moving to the cloud usually change a project's budget?",
    "It shifts costs from upfront capital expenditure to ongoing operating expenditure, so recurring fees must be budgeted and monitored."
   ]
  ]
 },
 {
  "t": "Software development life cycle and DevOps: CI/CD, development, test, staging and production environments, and release management",
  "body": [
   "When a project builds or changes software, it follows a software development life cycle (SDLC), a structured sequence of activities from idea to retirement. A common form has these phases: planning, requirements analysis, design, development (coding), testing, deployment and maintenance. The SDLC can be run in a waterfall style, with each phase completed before the next starts, or iteratively and incrementally as in agile, where each sprint includes a little requirements work, design, coding and testing. Knowing the phases helps a project manager plan the right activities, reviews and sign-offs.",
   "Software moves through separate environments to protect live users. The development (dev) environment is where developers write code and run unit tests. The test or quality assurance (QA) environment is where testers run functional, integration and regression tests; regression testing checks that new changes have not broken existing features. The staging, or pre-production, environment mirrors production as closely as possible and is used for final validation, performance testing and often user acceptance testing (UAT), where business users confirm the system meets their needs. Production (prod) is the live environment used by real users with real data. Keeping these separate prevents untested changes from breaking the business, and access to production should be tightly limited. Test environments should use masked or synthetic data, not real personal data.",
   "DevOps is a culture and set of practices that brings development and operations teams together to deliver changes faster and more reliably, with shared responsibility for the running system. Continuous integration (CI) means developers merge code into a shared repository frequently, often several times a day, and each merge automatically triggers a build and a set of tests, so problems are caught within minutes rather than weeks. Continuous delivery means every change that passes the pipeline is ready to release, with a manual approval step before production. Continuous deployment goes one step further and releases every passing change to production automatically. Together these are called CI/CD, and the automated sequence of stages is the pipeline.",
   "```text\ncommit -> build -> unit tests -> deploy to test -> integration tests\n       -> deploy to staging -> UAT / approval -> deploy to production",
   "Other DevOps practices include infrastructure as code (IaC), where servers and networks are defined in version-controlled files and created automatically; automated monitoring and alerting; and fast feedback loops so teams learn from production. DevSecOps builds security into the pipeline, for example automated code scanning, dependency checks for vulnerable libraries and secret detection, so security is continuous rather than a final gate. Release management plans and controls how changes reach production: what goes into each release, its version number, release notes, the deployment schedule, the go/no-go decision, communication to users and the rollback plan. Even with automation, production releases usually still pass through the organization's change management process, often as pre-approved standard changes when the pipeline is proven. Deployment strategies reduce risk: a phased rollout or pilot releases to a small group first; a canary release sends a small share of traffic to the new version; a blue-green deployment switches traffic between two identical environments so rollback is just switching back.",
   "Consider a worked example. A team building a mobile banking feature commits code several times a day. Each commit triggers the CI pipeline, which builds the app, runs unit tests and a security scan, and deploys to the test environment. When a sprint's work is complete, the release is deployed to staging, where business users run UAT with synthetic customer data. The release manager prepares release notes, the change is approved, and a blue-green deployment moves users to the new version on a Tuesday evening. When monitoring shows an error spike, traffic is switched back to the old environment within minutes while the team fixes the defect.",
   "Common mistakes: testing for the first time in production; using real customer data in dev or test; assuming continuous delivery and continuous deployment mean the same thing; skipping change management because 'the pipeline is automated'; giving developers unrestricted access to production; and releasing without a rollback plan. Another is treating DevOps as only a tool set; it is mainly a culture of collaboration and shared ownership.",
   "Exam wording often turns on environment and automation terms. 'Automated build and test on every commit' is continuous integration. 'Ready to release with manual approval' is continuous delivery; 'released automatically' is continuous deployment. 'Mirror of production for final testing' is staging. 'Business users confirm requirements' is UAT, done before production. 'Plan what goes in each release, notes and go/no-go' is release management. 'Security checks inside the pipeline' is DevSecOps."
  ],
  "terms": [
   [
    "Software development life cycle (SDLC)",
    "The structured phases software goes through, from planning and requirements to deployment and maintenance."
   ],
   [
    "Continuous integration (CI)",
    "Frequently merging code into a shared repository, with automated builds and tests on each merge."
   ],
   [
    "Continuous delivery",
    "Keeping every tested change ready to release, with a manual approval before production."
   ],
   [
    "Continuous deployment",
    "Automatically releasing every change that passes the pipeline to production."
   ],
   [
    "Staging environment",
    "A pre-production environment that mirrors production for final testing and validation."
   ],
   [
    "Release management",
    "Planning, scheduling and controlling the deployment of software releases into production."
   ],
   [
    "DevSecOps",
    "Integrating automated security practices into the DevOps pipeline."
   ]
  ],
  "example": "An online retailer's developers push a pricing change that passes unit tests in CI but has never been tested with the payment system. Because the release process requires integration tests in the test environment and UAT in staging, the defect is found before production. The release is delayed by two days instead of causing failed orders on the live site.",
  "tip": "UAT happens in staging or test, never first in production. CI means automated build and test on every commit. Continuous delivery keeps a manual approval; continuous deployment does not. Automated pipelines still follow change management for production.",
  "check": [
   [
    "What is the purpose of a staging environment?",
    "To mirror production as closely as possible so final testing, performance checks and UAT can be done safely before release."
   ],
   [
    "What is the difference between continuous delivery and continuous deployment?",
    "Continuous delivery keeps changes ready to release with a manual approval; continuous deployment releases them automatically."
   ],
   [
    "Why should test environments use masked or synthetic data?",
    "They usually have weaker controls and wider access than production, so real personal data there creates privacy and security risk."
   ],
   [
    "How does a blue-green deployment reduce risk?",
    "Traffic moves between two identical environments, so if the new version fails you switch back to the old one quickly."
   ]
  ]
 },
 {
  "t": "Operational change management: change advisory board, maintenance windows, change freezes, rollback plans and downtime",
  "body": [
   "Project change control manages changes to the project's plan: its scope, schedule and budget. Operational change management manages changes to the organization's live IT environment, whether they come from projects or from daily operations. Any project that deploys anything into production must follow it. Ignoring it is a quick way to cause outages, collide with other teams' changes and lose the trust of the operations staff who will support your system after you leave.",
   "A production change request, often called a request for change (RFC), typically includes a description and reason, affected systems and users, a risk and impact assessment, implementation steps, a test plan, the proposed schedule, a rollback (backout) plan, a communication plan and the people responsible. The change advisory board (CAB), a group of representatives from operations, security, application owners and the business, reviews significant changes. It looks at risk, conflicts with other changes and timing, then approves, rejects or asks for more information. The CAB approves; technicians or the implementing team carry out the change.",
   "Changes are usually categorized. Standard changes are low-risk, pre-approved and repeatable, following a documented procedure, such as adding a user to a group or applying a routine patch. Normal changes go through the full assessment and CAB review. Emergency changes are urgent, for example fixing an outage or closing an actively exploited vulnerability; they use an expedited process, often an emergency CAB (ECAB), with documentation completed afterward, but they are still recorded and reviewed.",
   "Maintenance windows are agreed periods, often nights or weekends, when changes that may cause downtime can be made with the least business impact. Planned downtime should be announced to users in advance, stating the expected duration, what will be unavailable and who to contact. A change freeze, also called a blackout period or moratorium, blocks non-emergency changes during critical times such as year-end financial close, peak retail seasons or major events. Project schedules must be built around freezes; a go-live cannot simply be squeezed in, and relabeling ordinary work as an emergency to dodge a freeze undermines the process.",
   "Every production change needs a rollback plan: the steps to restore the previous working state if the change fails, and the criteria for deciding to roll back, such as 'if validation tests have not passed by 02:00, roll back'. The decision point matters, because a rollback also takes time and must finish inside the window. Backups, configuration exports or VM snapshots are taken before the change. After implementation, the change is validated, users are told the service is back, and the change record is closed, sometimes after a post-implementation review (PIR). A failed change becomes an incident and a lesson learned.",
   "Consider a worked example. Your project must migrate the payroll database to new servers. You submit an RFC with the steps, a test plan, a 03:00 rollback decision point and a communication plan. The CAB notices a network change scheduled the same night and moves yours to the following Saturday, 22:00 to 04:00, which is also outside the payroll freeze at month end. Users get notice a week ahead. On the night, a snapshot is taken, the migration runs, validation passes at 01:30 and the change is closed. Had validation failed, the team would have restored the old servers and rescheduled.",
   "Common mistakes: thinking project change control approval covers production changes (it does not; the CAB is a separate process); deploying during business hours without approval; having no rollback plan or no decision point; failing to notify users of downtime; scheduling a go-live during a freeze; and abusing the emergency process for convenience. Another is treating the CAB as the team that performs the change; it only reviews and approves. A further trap is skipping the post-implementation review after a problem change, which is exactly when the lessons are most valuable.",
   "Exam questions usually describe a situation and ask what is needed or what went wrong. 'Deploy to production' points to an RFC and CAB approval. 'Low-risk, repeatable, pre-approved' is a standard change. 'Critical outage, must fix now' is an emergency change. 'Least business impact' is a maintenance window. 'No changes during year-end close' is a change freeze. 'Change failed and service could not be restored quickly' points to a missing rollback plan. 'Users were surprised by an outage' points to missing downtime communication."
  ],
  "terms": [
   [
    "Change advisory board (CAB)",
    "The group that reviews and approves or rejects significant changes to the production environment."
   ],
   [
    "Request for change (RFC)",
    "A formal request describing a proposed production change, its risk, plan and rollback."
   ],
   [
    "Standard change",
    "A low-risk, repeatable change that is pre-approved and follows a documented procedure."
   ],
   [
    "Emergency change",
    "An urgent change handled through an expedited approval process, documented afterward."
   ],
   [
    "Maintenance window",
    "An agreed period when changes may be made with the least impact on the business."
   ],
   [
    "Change freeze",
    "A period when non-emergency changes are not allowed, such as during peak business times."
   ],
   [
    "Rollback (backout) plan",
    "The documented steps and decision criteria for restoring the previous state if a change fails."
   ]
  ],
  "example": "A retail company declares a change freeze from mid-November to early January. A project team wants to launch a new checkout feature on 1 December. The CAB refuses to treat it as an emergency, so the project manager replans the launch for the second week of January, uses the freeze period for extra testing and training, and informs stakeholders of the new date.",
  "tip": "Production changes need an RFC, CAB approval, a maintenance window, user notification and a rollback plan with a decision point. During a change freeze, non-urgent project work waits; it must not be relabeled as an emergency.",
  "check": [
   [
    "How does operational change management differ from project change control?",
    "Project change control governs changes to the project plan; operational change management governs changes to the live production environment through the CAB."
   ],
   [
    "Which category of change is pre-approved and low risk?",
    "A standard change."
   ],
   [
    "Why should a rollback plan include a decision time?",
    "So the team rolls back early enough to finish restoring service within the maintenance window."
   ],
   [
    "Your go-live date falls in a change freeze. What should you do?",
    "Reschedule the go-live outside the freeze and update stakeholders, rather than forcing it through as an emergency change."
   ]
  ]
 },
 {
  "t": "Physical and environmental considerations: facility access, power and cooling, asset tracking and secure disposal",
  "body": [
   "IT projects do not happen only in software. Office moves, data center work, new network closets, hardware refreshes and branch openings all involve physical spaces, and those bring their own planning needs, risks and dependencies on facilities teams, landlords, electricians and security staff. The exam expects you to recognize these considerations and include them in the plan, not discover them on installation day.",
   "Facility access must be planned. Contractors and team members may need badges, escorts or visitor logs to enter server rooms and data centers, and access should be limited to those who need it, for the time they need it, and removed when the work ends, the physical version of least privilege. Physical security controls such as badge readers, locked racks and cages, security cameras (CCTV), guards and access control vestibules (sometimes called mantraps, two-door entries that allow one person through at a time) protect equipment. Work in shared or leased buildings may need landlord approval, and noisy or disruptive work such as drilling or cabling may have to happen outside business hours.",
   "Power and cooling are easy to overlook. New equipment adds electrical load and heat. The project should confirm that circuits, uninterruptible power supplies (UPS), which bridge short outages and allow clean shutdowns, power distribution units (PDUs) in the racks and backup generators can support the extra load, and that cooling can remove the extra heat. Environmental monitoring for temperature, humidity and water leaks, plus appropriate fire suppression, protects the investment. Rack space, floor weight limits, cable management and labeling also need planning, usually with a rack elevation diagram showing exactly where each device goes.",
   "Asset tracking keeps an accurate inventory of hardware and software: what was bought, where it is, who has it, its serial number, asset tag, warranty and license details. New equipment is tagged and recorded when received, moved equipment is updated, and loaned devices are signed out and back in. Accurate records support budgeting, support contracts, audits, license compliance and security, because you cannot protect or patch devices you do not know exist.",
   "Secure disposal applies when old equipment is retired. Drives and other media that held data must be sanitized using approved methods: overwriting or cryptographic erasure for media that will be reused, degaussing for magnetic media, or physical destruction such as shredding for the most sensitive data. The method depends on the media type and the data's sensitivity. Simply deleting files or quick-formatting a drive can leave recoverable data. A certificate of destruction or sanitization, often from a certified vendor, provides evidence for audits. Environmental rules for electronic waste also apply, so use approved recyclers. Update the asset inventory when items are disposed of, and cancel or transfer licenses for retired software.",
   "Consider a worked example. Your project replaces 40 servers in a small data center. A facilities survey shows the existing UPS is near capacity and one room's cooling is marginal, so a UPS upgrade and an extra cooling unit become early tasks with lead times. Contractors receive time-limited badges and are escorted in the server room. Each new server is asset-tagged and recorded, and the rack elevation diagram is updated. The old servers' drives are removed and shredded by a certified vendor, who provides a certificate of destruction, and the inventory is updated to show them as disposed.",
   "Common mistakes: assuming reformatting makes drives safe to sell or donate; forgetting that new hardware may exceed power, cooling or weight limits; leaving contractor badges active after the work; not recording new assets on arrival; throwing electronics into general waste; and forgetting that facilities work often has its own approvals and lead times. Another trap is not involving the facilities team until the week of installation. Finally, remember that shipping boxes, packing material and old equipment need somewhere to go; a staging area and removal plan save a lot of disruption on installation day.",
   "Exam questions usually describe a situation and ask what was missed. 'Old laptops being donated' or 'drives being retired' points to sanitization or destruction with a certificate. 'New servers keep shutting down from heat' points to cooling capacity. 'Short power outage caused a crash' points to UPS. 'Contractors wandering in the data center' points to access control and escorts. 'Cannot find which devices are under warranty' points to asset tracking and inventory."
  ],
  "terms": [
   [
    "Uninterruptible power supply (UPS)",
    "A battery-backed device that keeps equipment running through short power outages and allows clean shutdowns."
   ],
   [
    "Power distribution unit (PDU)",
    "A device in a rack that distributes electrical power to the equipment."
   ],
   [
    "Access control vestibule",
    "A secured entry with two doors that lets only one authorized person through at a time."
   ],
   [
    "Asset inventory",
    "A record of hardware and software assets with location, owner, serial number, warranty and license details."
   ],
   [
    "Media sanitization",
    "Removing data from storage media so it cannot be recovered, by overwriting, degaussing or destruction."
   ],
   [
    "Certificate of destruction",
    "A document confirming that media or equipment was securely destroyed, used as audit evidence."
   ]
  ],
  "example": "A company donates 200 old laptops to a charity after only reformatting the drives. Months later, a recipient recovers files containing employee payroll data. The next refresh project adds secure disposal to the plan: drives are wiped with an approved tool or shredded by a certified vendor, a certificate of sanitization is kept for each batch, and the asset inventory is updated before any device leaves the building.",
  "tip": "Old drives with sensitive data need sanitization or destruction with documentation; reformatting is not enough. New hardware may need more power, cooling and rack space, and those belong in the plan with their own lead times.",
  "check": [
   [
    "Why is reformatting a drive not enough before disposal?",
    "Data can often still be recovered; approved sanitization or physical destruction is needed."
   ],
   [
    "What evidence shows auditors that retired drives were properly destroyed?",
    "A certificate of destruction or sanitization, often from a certified disposal vendor."
   ],
   [
    "A project adds several high-power servers to an existing rack. What should be checked?",
    "Power capacity (circuits, PDUs, UPS), cooling, rack space and weight limits."
   ],
   [
    "Why is asset tracking a security concern as well as a financial one?",
    "You cannot patch, protect or recover devices you do not know about, and lost or unrecorded devices may hold sensitive data."
   ]
  ]
 },
 {
  "t": "Governance: PMO standards, phase gate reviews, organizational change management, training and user adoption",
  "body": [
   "Governance is the framework of rules, roles and decision processes that keeps projects aligned with organizational goals and run consistently. It answers questions such as who may approve spending, which documents every project must have, who decides when priorities conflict, and when a project must be reviewed before it continues. Good governance is not bureaucracy for its own sake; it protects the organization's money and makes sure effort goes to the work that matters most.",
   "The project management office (PMO) often leads project governance. Depending on the organization, a PMO may be supportive, providing templates, training and best practices with little control; controlling, requiring compliance with standards and reviewing projects; or directive, managing projects directly with its own project managers. PMO standards might require a charter template, a risk register, weekly status reports in a set format and a closure report. Governance also includes steering committees that oversee large projects or portfolios, policies such as spending authority limits and procurement rules, and compliance with external requirements from regulators and auditors.",
   "Phase gate reviews, also called stage gates, tollgates or kill points, are formal checkpoints at the end of a phase. A governance body, such as the sponsor or steering committee, reviews progress, deliverables, the business case, risks and readiness for the next phase, then decides to continue, continue with conditions, redo work or stop the project. Gates make sure money is not spent on projects that no longer make sense, for example because costs have grown or the business need has changed. In PRINCE2 (Projects in Controlled Environments), similar reviews happen at the end of each management stage.",
   "Organizational change management (OCM) deals with the people side of change. It is different from project change control, which manages changes to the plan, and from operational change management, which manages changes to production systems. A technically perfect system still fails if people do not use it. OCM includes explaining why the change is happening, involving users early, identifying champions or super users in each department, addressing resistance, providing training at the right time and in the right format, and offering support after go-live. The ADKAR model (Awareness, Desire, Knowledge, Ability, Reinforcement) describes the stages individuals move through; Kotter's steps describe leading change at an organizational level.",
   "Training should be timed close to go-live, so people do not forget it, and matched to the audience. Options include instructor-led sessions, e-learning, quick reference guides, videos, sandbox environments for practice and floor support ('floor walkers') during the first days. Adoption is measured with usage data, help desk ticket trends and surveys, and the project's success criteria should include adoption, not just delivery. Reinforcement, such as recognizing early adopters and removing the old system, keeps people from slipping back to old habits.",
   "Consider a worked example. A new expense system is technically ready, but a pilot shows many managers still email spreadsheets. At the phase gate before full rollout, the steering committee approves continuing only with conditions: an OCM plan. The project names a super user in each department, runs 30-minute role-based training a week before each department's go-live, publishes a one-page guide and sets a date after which spreadsheet claims will not be accepted. Adoption is tracked weekly, and usage rises above the target within two months.",
   "Common mistakes: confusing the three kinds of change management; scheduling training months before go-live; treating a phase gate as a formality that always says 'continue'; measuring success only by on-time delivery while nobody uses the system; and ignoring PMO templates, then failing a governance review. Another is assuming resistance means people are difficult, when it often means they do not yet understand why the change helps them. Listening to resisters often reveals real problems with the design or the rollout plan that are cheaper to fix before go-live than after.",
   "Exam questions often hinge on which kind of change is meant. 'Changes to scope, schedule or budget' is project change control. 'Changes to production systems approved by the CAB' is operational change management. 'Users are not adopting the new system' or 'resistance' points to OCM, training and super users. 'Formal review to decide whether to continue' is a phase gate. 'Templates and standards across projects' points to the PMO, and 'supportive, controlling or directive' describes PMO types."
  ],
  "terms": [
   [
    "Governance",
    "The framework of rules, roles and decision processes that directs and controls projects."
   ],
   [
    "Project management office (PMO)",
    "A group that sets standards and supports, controls or directly manages projects."
   ],
   [
    "Phase gate review",
    "A formal checkpoint at the end of a phase where a governance body decides whether the project continues."
   ],
   [
    "Organizational change management (OCM)",
    "Managing the people side of change so users understand, accept and adopt it."
   ],
   [
    "Super user (champion)",
    "A trained user in a department who helps colleagues adopt a new system."
   ],
   [
    "ADKAR",
    "A change model of Awareness, Desire, Knowledge, Ability and Reinforcement."
   ]
  ],
  "example": "At a phase gate after design, the steering committee learns that the cost estimate has doubled and the business unit that requested the system is being merged. Rather than continuing on momentum, the committee stops the project, the team closes it formally, and the funds are redirected. The gate did its job by preventing further spending on a project that no longer made business sense.",
  "tip": "There are three different 'change' ideas: project change control (changes to the plan), operational change management (changes to production through the CAB) and organizational change management (helping people adopt the change). Low adoption points to OCM and training.",
  "check": [
   [
    "What decisions can a phase gate review make?",
    "Continue, continue with conditions, redo work or stop the project."
   ],
   [
    "A new system launched on time but few people use it. Which discipline was likely neglected?",
    "Organizational change management, including communication, training and super user support."
   ],
   [
    "What is the difference between a supportive and a directive PMO?",
    "A supportive PMO provides templates and guidance with little control; a directive PMO manages projects directly."
   ],
   [
    "Why should training happen close to go-live?",
    "So users remember what they learned when they start using the system."
   ]
  ]
 },
 {
  "t": "Business continuity for IT projects: backups, disaster recovery, RTO and RPO, and testing before go-live",
  "body": [
   "When a project delivers a new system, the organization will soon depend on it. Business continuity planning (BCP) makes sure the business can keep operating if that system or the site it runs in fails. Disaster recovery (DR) is the technical part of that: how IT restores systems and data after an outage, a cyberattack such as ransomware, or a disaster such as a fire or flood. These requirements must be defined, built and tested during the project, not left for operations to discover after go-live.",
   "Two metrics drive DR design. The recovery time objective (RTO) is the maximum acceptable time a system can be down before it must be restored, for example four hours. The recovery point objective (RPO) is the maximum acceptable amount of data loss, measured in time, for example one hour, which means backups or replication must happen at least every hour. Shorter RTOs and RPOs cost more, so the business should set them based on a business impact analysis (BIA), which identifies critical processes and the impact of losing them over time. Related terms include mean time to repair (MTTR), the average time to fix a failed component, and mean time between failures (MTBF), the average time a component runs before failing.",
   "Backups are the foundation. A full backup copies everything. An incremental backup copies changes since the last backup of any type, so it is fast to run but a restore needs the last full backup plus every incremental since. A differential backup copies changes since the last full backup, so it grows each day but a restore needs only the full plus the latest differential. Good practice is often summarized as the 3-2-1 rule: three copies of data, on two different types of media, with one copy offsite or in a separate cloud region. Immutable or offline copies, which cannot be changed or deleted for a set period, help protect against ransomware. Most importantly, test restores regularly; a backup that has never been restored is not proven.",
   "Recovery sites range from hot sites, ready to take over almost immediately with current data, to warm sites, partly equipped and needing some setup and data restoration, to cold sites, which provide space and power but little else. Cost rises as recovery time falls. Cloud services add options such as replication between regions and restoring into cloud infrastructure on demand. High availability features, such as clustering and load balancing, reduce downtime from single failures but do not replace backups, because they will faithfully copy corrupted or deleted data too.",
   "Before go-live, the project should confirm that backups are scheduled and running, perform and document a test restore, write recovery procedures (runbooks), add the system to the organization's DR plan, and, where the system is critical, run a failover test or a tabletop exercise, a discussion-based walk-through of a disaster scenario. Monitoring, support contacts and escalation procedures should be in place. These items belong in the transition plan and the go-live checklist, and the go/no-go decision should consider them.",
   "Consider a worked example. A new online ordering system has a business-agreed RTO of two hours and RPO of 15 minutes. Nightly backups alone would allow up to 24 hours of data loss, so the design adds database replication to a second region every few minutes, plus nightly full backups kept as immutable copies. Two weeks before go-live, the team restores the database into a test environment and performs a failover to the second region, measuring 90 minutes to recover. The results are documented, and the go/no-go meeting approves the launch.",
   "Common mistakes: mixing up RTO and RPO; setting recovery targets without asking the business; assuming replication or RAID (redundant array of independent disks) is a backup; storing all backups in the same location or network as the system; never testing a restore; and leaving DR planning until after launch. Another is forgetting that a restore needs people, credentials and documentation, not just data.",
   "Exam questions usually test the definitions and the timing. 'How much data can we afford to lose' or 'how often to back up' is RPO. 'How long can the system be down' is RTO. 'Changes since the last full backup' is differential; 'since the last backup of any kind' is incremental. 'Ready immediately' is a hot site; 'space and power only' is a cold site. 'Confirm backups work before go-live' points to a restore test, and 'walk through a disaster scenario in discussion' is a tabletop exercise."
  ],
  "terms": [
   [
    "Recovery time objective (RTO)",
    "The maximum acceptable time a system can be unavailable before it must be restored."
   ],
   [
    "Recovery point objective (RPO)",
    "The maximum acceptable data loss measured in time, which sets how often data must be backed up or replicated."
   ],
   [
    "Business impact analysis (BIA)",
    "An analysis of critical business processes and the impact of losing them over time."
   ],
   [
    "Incremental backup",
    "A backup of changes since the last backup of any type."
   ],
   [
    "Differential backup",
    "A backup of all changes since the last full backup."
   ],
   [
    "Hot site",
    "A fully equipped recovery site that can take over almost immediately."
   ],
   [
    "Tabletop exercise",
    "A discussion-based walk-through of how the team would respond to a disaster scenario."
   ]
  ],
  "example": "A small accounting firm's new file server went live with nightly backups to a drive in the same room, and nobody tested a restore. When ransomware encrypted both the server and the attached backup drive, weeks of work were lost. The rebuild project added offsite, immutable cloud backups, a documented restore procedure and a quarterly restore test, and made a successful restore test a go-live criterion for future systems.",
  "tip": "RPO is how much data you can lose, which sets backup frequency. RTO is how long you can be down, which sets restore speed. Untested backups are not reliable, so a restore test belongs before go-live.",
  "check": [
   [
    "The business can accept losing at most 30 minutes of data. Which metric is this?",
    "The recovery point objective (RPO)."
   ],
   [
    "Which backup type needs only the last full backup and the latest backup to restore: incremental or differential?",
    "Differential, because each differential contains all changes since the last full backup."
   ],
   [
    "Why is replication not a replacement for backups?",
    "Replication copies deletions and corruption to the replica too, so you still need point-in-time backups to recover."
   ],
   [
    "What should a project do with backups before go-live?",
    "Confirm they are running, perform and document a test restore, and include the system in the disaster recovery plan."
   ]
  ]
 }
], { reviewed: "2026-09-30" });
