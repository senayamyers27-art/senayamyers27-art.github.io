/* Lessons for CompTIA Project+ (PK0-005): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("project-plus", [
 {
  t: "Project basics: projects vs operations and programs, the triple constraint, and project roles (sponsor, project manager, PMO, team, stakeholders)",
  body: [
   "A project is a temporary effort with a defined start and end that creates a unique product, service or result. Moving a company's email to a cloud service, building a new branch office network or rolling out a new ticketing tool are projects. Running the help desk every day, patching servers each month and answering password-reset calls are operations: they are ongoing and repetitive, and they keep the business running. Projects often end by handing something over to operations, which is why the two groups need to work together from the start.",
   "Projects can be grouped. A program is a set of related projects managed together because coordinating them brings benefits you would not get managing them separately, for example a digital workplace program with separate projects for laptops, collaboration tools and training. A portfolio is the collection of all projects and programs an organization is funding, chosen and balanced to meet its strategy.",
   "Every project is shaped by the triple constraint: scope (what will be delivered), time (the schedule) and cost (the budget). Quality sits in the middle, and many modern texts add risk and resources. The key idea is that the constraints are linked. If the sponsor adds scope, time or cost must usually grow, or quality suffers. When an exam question describes a change to one constraint, ask what happens to the others.",
   "The Project+ exam expects you to know who does what. The sponsor champions the project, provides funding, approves the charter and major changes, and helps remove organizational obstacles. The project manager plans, coordinates and controls the work day to day and is accountable for delivering the agreed objectives. The project management office (PMO) sets standards, templates and governance for projects across the organization and may provide coaching or reporting. The project team does the work, often led by subject matter experts. Stakeholders are anyone affected by or able to influence the project: users, customers, department heads, vendors, regulators. A project coordinator or scheduler supports the project manager with documentation, scheduling and logistics but usually has less decision authority."
  ],
  terms: [
   ["Project", "A temporary endeavor with a defined beginning and end that produces a unique product, service or result."],
   ["Program", "A group of related projects managed in a coordinated way to obtain benefits not available from managing them individually."],
   ["Triple constraint", "The linked limits of scope, time and cost; changing one usually affects the others and quality."],
   ["Sponsor", "The person or group who funds the project, approves the charter and major changes, and champions it in the organization."],
   ["Project management office (PMO)", "A group that standardizes project processes, templates and governance across an organization."]
  ],
  example: "A hospital IT department runs its service desk as an ongoing operation. When the CIO funds a six-month project to replace the old ticketing tool, the CIO acts as sponsor, a project manager is assigned, the PMO supplies the charter template and status report format, and the service desk manager is a key stakeholder who will own the new tool once the project hands it over.",
  tip: "If a question asks who approves the charter, provides funding or resolves an issue beyond the project manager's authority, the answer is usually the sponsor. If it asks who sets templates and standards across all projects, think PMO.",
  check: [
   ["Is upgrading every server's firmware each quarter a project or operations?", "Operations. It is a recurring, ongoing activity, not a temporary effort with a unique result."],
   ["The sponsor wants to add features without extending the deadline. Which constraint is most likely to be affected?", "Cost (more people or overtime) or quality. The triple constraint means added scope must be paid for in time, cost or quality."]
  ]
 },
 {
  t: "Change control process: change requests, impact assessment, change control board, approval, implementation and communicating changes",
  body: [
   "Change is normal on projects: requirements become clearer, business priorities shift and problems appear. What matters is that changes are controlled. Change control is the formal process for proposing, evaluating, approving or rejecting and then implementing changes to the project's approved baselines for scope, schedule and cost. Without it, small untracked changes accumulate and the project drifts away from what was agreed.",
   "The process usually follows the same steps. First, someone identifies the need and submits a change request, a written description of what should change and why. Second, the project manager logs it in the change log so it can be tracked. Third, the project manager and team perform an impact assessment: what the change will do to scope, schedule, cost, quality, resources and risk, and what happens if it is not made. Fourth, the change goes to the decision maker named in the change management plan, often a change control board (CCB) made up of the sponsor and key stakeholders. The CCB approves, rejects or defers it.",
   "If the change is approved, the project manager updates the affected baselines and documents (scope statement, WBS, schedule, budget, risk register) and then implements the change like any other work. Finally, the decision is communicated to everyone affected, including the person who asked for it. Rejected and deferred changes are also recorded, with the reason, so the same request does not keep reappearing.",
   "Some organizations let the project manager approve small changes within agreed tolerances, for example up to two days or a small dollar amount, and send larger ones to the CCB. The change management plan written during planning defines these thresholds, the forms to use and who sits on the board. Notice that the project manager rarely approves significant changes alone and never simply tells the team to start work on an unapproved request."
  ],
  terms: [
   ["Change request", "A formal proposal to modify a project's scope, schedule, cost or other baseline."],
   ["Impact assessment", "Analysis of how a proposed change would affect scope, schedule, cost, quality, resources and risk."],
   ["Change control board (CCB)", "The group authorized to approve, reject or defer project change requests."],
   ["Change log", "A record of every change request with its status, decision and date."]
  ],
  example: "A marketing manager asks for a new mobile view in a web portal project. The project manager records the request in the change log, the team estimates three extra weeks and $12,000, and the CCB approves it. The project manager updates the scope statement, schedule and budget baselines, adds the work to the plan and sends an update to all stakeholders explaining the new go-live date.",
  tip: "The first step when someone asks for a change is almost never 'do it' or 'refuse it'. It is to document the request and assess its impact. After approval, the next step is updating baselines and communicating.",
  check: [
   ["Who normally approves a change that affects the project's cost baseline beyond the project manager's tolerance?", "The change control board or the authority named in the change management plan, often including the sponsor."],
   ["A change was approved yesterday. What two things must the project manager do before or while the team implements it?", "Update the affected baselines and project documents, and communicate the decision to stakeholders."]
  ]
 },
 {
  t: "Types of change: scope creep, gold plating, timeline, budget, resource, requirements and emergency changes",
  body: [
   "Not all changes look the same, and the exam expects you to recognize the common types. A scope change adds, removes or modifies deliverables. Scope creep is the uncontrolled version: features are added bit by bit without going through change control, often because users ask developers directly. Each addition looks small, but together they consume time and budget that were never approved. Gold plating is similar but comes from inside the team: someone adds extra features or polish the customer did not ask for, believing it adds value. Both are problems because the extra work is unplanned, untested against requirements and may introduce risk.",
   "A timeline (schedule) change moves dates, for example because a vendor delivery slipped or the business wants an earlier launch. A budget change increases or decreases funding. A resource change adds, removes or swaps people or equipment, such as when a key engineer is reassigned to another project. A requirements change alters what the product must do, often after users see an early version and refine their needs. Each of these can ripple through the triple constraint, so each is assessed through the same change control process.",
   "Some changes are forced on the project from outside: a new regulation, a merger, a security vulnerability or a change in company strategy. Emergency changes must be made quickly to prevent serious harm, such as patching an actively exploited flaw in a system the project is deploying. Many organizations allow an expedited path where a smaller group or an on-call authority approves the change first and the full paperwork is completed afterward. The change is still documented and reviewed; only the timing differs.",
   "The best defenses against scope creep and gold plating are a clear, signed-off scope statement, a WBS that shows exactly what is in scope, an easy way for people to submit change requests, and a team that knows to redirect informal requests into the process. In agile projects, new ideas go into the product backlog, where the product owner prioritizes them instead of adding them mid-sprint."
  ],
  terms: [
   ["Scope creep", "Uncontrolled growth of project scope through additions that bypass change control."],
   ["Gold plating", "The team adding features or extras that the customer did not request."],
   ["Emergency change", "A change that must be made urgently to prevent harm, approved through an expedited path and documented afterward."],
   ["Requirements change", "A modification to what the product must do, often after users review early work."]
  ],
  example: "During a portal build, users email the developer small requests, like an extra column in a report or a new filter, and he adds them to be helpful. Separately, a designer adds animated charts nobody asked for. After two months the testing phase is three weeks behind. The first behavior is scope creep and the second is gold plating; the project manager fixes both by routing requests through change control and reminding the team to build to the approved scope.",
  tip: "Scope creep comes from requests that skip the process; gold plating comes from the team adding unrequested extras. Both are unapproved, and the fix is the same: enforce change control against a clear scope baseline.",
  check: [
   ["A developer adds a dark mode that no requirement mentions because he thinks users will like it. What is this called?", "Gold plating, because the team added an unrequested feature."],
   ["A critical security flaw must be fixed in a system the day before go-live. How is this change handled?", "As an emergency change through the expedited approval path, with documentation and review completed afterward."]
  ]
 },
 {
  t: "Risk management activities: identification, qualitative and quantitative analysis, risk register, probability and impact matrix",
  body: [
   "A risk is an uncertain event or condition that, if it happens, affects at least one project objective. Most risks are threats, but some are opportunities, such as a vendor releasing a faster product early. Risk management means finding these uncertainties early and planning for them, instead of reacting when they turn into problems. Once a risk actually happens, it becomes an issue.",
   "The work starts with risk identification. Common techniques include brainstorming with the team, interviewing experts, reviewing lessons learned from similar projects, checklists, assumption analysis (every unproven assumption is a possible risk) and SWOT analysis. Every identified risk goes into the risk register, which records a description, category, probability, impact, a score or rank, the risk owner, triggers (warning signs), the planned response and its status. The register is a living document, reviewed throughout the project.",
   "Next comes analysis. Qualitative analysis is quick and subjective: the team rates each risk's probability and impact on a scale such as low, medium and high, or 1 to 5, and multiplies or combines them into a score. Plotting the results on a probability and impact matrix, often colored as a heat map, shows which risks need attention first. Quantitative analysis puts numbers on the risk: expected monetary value (probability multiplied by impact in money), decision trees, sensitivity analysis or Monte Carlo simulations that model many possible outcomes. Quantitative analysis takes more effort and is usually reserved for the high-priority risks the qualitative pass has identified.",
   "After analysis, the team plans responses, assigns owners and then monitors risks: watching triggers, reassessing scores, closing risks that can no longer happen and adding new ones. Risk review is a standing agenda item in status meetings on well-run projects. Remember that the project manager coordinates risk management but each risk should have an owner, the person best placed to watch it and carry out the response."
  ],
  terms: [
   ["Risk register", "The document listing each identified risk with its probability, impact, score, owner, trigger and response."],
   ["Qualitative risk analysis", "Prioritizing risks with subjective ratings of probability and impact."],
   ["Quantitative risk analysis", "Numerically estimating the effect of risks, for example with expected monetary value or Monte Carlo simulation."],
   ["Risk trigger", "A warning sign that a risk is about to occur or has occurred."],
   ["Probability and impact matrix", "A grid that combines likelihood and impact ratings to rank risks, often shown as a heat map."]
  ],
  example: "For a data center move, the team brainstorms 25 risks. Using a 1 to 5 scale, 'core switch damaged in transit' scores probability 2 and impact 5, while 'parking shortage on move day' scores 3 and 1. The heat map puts the switch risk in the red zone, so the team runs expected monetary value on it and assigns the network lead as risk owner.",
  tip: "Qualitative means rating (high, medium, low; 1 to 5). Quantitative means numbers with money or time (EMV, Monte Carlo). A risk that has already happened is an issue and goes in the issue log.",
  check: [
   ["The team assigns each risk a 1 to 5 score for probability and impact. Which analysis is this?", "Qualitative risk analysis."],
   ["What information should a risk register entry include?", "A description, probability, impact, score or priority, owner, triggers, planned response and current status."]
  ]
 },
 {
  t: "Risk responses: avoid, mitigate, transfer, accept, escalate, exploit, enhance and share; contingency and management reserves",
  body: [
   "Once risks are analyzed, each high-priority risk gets a planned response. For threats (negative risks) there are four classic strategies. Avoid removes the threat by changing the plan: dropping an unproven product, extending the schedule or cutting risky scope. Mitigate reduces the probability or the impact: running a pilot, adding redundancy, rehearsing a migration or training users. Transfer shifts the financial impact to a third party through insurance, warranties, or a fixed-price contract; the risk still exists, but someone else pays if it happens. Accept means acknowledging the risk and not taking action in advance, either passively (deal with it if it happens) or actively by setting aside a contingency reserve.",
   "A fifth response, escalate, applies when the risk is outside the project's scope or beyond the project manager's authority, for example a risk to the whole company's network that the project only noticed. It is handed to the right owner, such as the sponsor or a program manager, and is then no longer managed by the project.",
   "Opportunities (positive risks) have mirror-image responses. Exploit makes sure the opportunity happens, for example by assigning your best engineer so a task finishes early. Enhance increases its probability or impact. Share gives part of it to a partner better able to capture it, such as a joint venture. Accept means you will take the benefit if it arrives but will not chase it.",
   "Reserves are money or time set aside for risk. The contingency reserve covers identified risks that were accepted, the known unknowns, and is usually controlled by the project manager as part of the cost baseline. The management reserve covers unidentified risks, the unknown unknowns; it sits outside the cost baseline and using it normally requires management or sponsor approval. A fallback plan is what you do if the primary response fails, and a workaround is an unplanned response to a risk that nobody planned for. Residual risk is what remains after a response; secondary risks are new risks created by the response itself."
  ],
  terms: [
   ["Mitigate", "Reduce a threat's probability or impact, for example with testing, redundancy or training."],
   ["Transfer", "Shift a threat's financial impact to a third party, for example through insurance or a fixed-price contract."],
   ["Contingency reserve", "Budget or time set aside for identified, accepted risks; part of the cost baseline."],
   ["Management reserve", "Budget held for unidentified risks, outside the cost baseline and released by management."],
   ["Exploit", "A response that makes sure a positive risk (opportunity) happens."]
  ],
  example: "A branch network project identifies three threats. Shipping damage to equipment is transferred with insurance. Configuration errors at cutover are mitigated by staging and testing every switch beforehand. Rain delaying outdoor cabling is accepted, with three days of contingency added to the schedule. When the vendor offers an early upgrade that would speed deployment, the team exploits it by committing to the vendor's early-adopter program.",
  tip: "Match the verb to the effect: removes the risk = avoid; lowers probability or impact = mitigate; someone else pays = transfer; do nothing now = accept. Known risks draw on contingency reserve; surprises draw on management reserve.",
  check: [
   ["A team buys an extended warranty for new storage arrays. Which response is this?", "Transfer, because the vendor bears the cost of failure."],
   ["Which reserve would pay for a completely unforeseen problem, and who usually approves using it?", "The management reserve, released by management or the sponsor because it sits outside the cost baseline."]
  ]
 },
 {
  t: "Communication management: communication plan, synchronous vs asynchronous methods, audience, frequency and tailoring",
  body: [
   "Many project failures are really communication failures: the sponsor was surprised by a delay, users did not know a system was going down, or two teams worked from different versions of a document. Communication management is planning who needs what information, when, in what format and through which channel, and then making sure it happens.",
   "The communication plan is the key document. For each audience it lists the information they need (status, risks, decisions, schedule changes), the method (meeting, email, report, dashboard, chat), the frequency (daily, weekly, at milestones), the owner who sends it and any escalation path. It also notes constraints such as time zones, languages, confidentiality or accessibility needs. The plan is built during planning from the stakeholder register and is updated whenever stakeholders or their needs change.",
   "Methods are often described as synchronous or asynchronous. Synchronous communication happens in real time with everyone present: meetings, phone and video calls, instant conversations. It is best for complex discussion, negotiation, sensitive topics and quick decisions. Asynchronous communication lets people read and respond when they are available: email, shared documents, project boards, recorded videos and chat threads. It suits routine updates and teams spread across time zones. Another useful distinction is push (sending to recipients, such as email), pull (people fetch it themselves, such as an intranet dashboard) and interactive (two-way, such as a meeting).",
   "Tailoring means adjusting the message to the audience. Executives want short summaries: overall status, key risks, decisions needed. The technical team needs detail. End users need to know what changes for them and when. Consider the channel as well: bad news or a conflict should be delivered in person or by call, not in a mass email. Because the number of communication channels grows quickly with team size (n times n minus 1, divided by 2), larger projects need more structure, such as a single source of truth for documents and a clear meeting cadence."
  ],
  terms: [
   ["Communication plan", "The document that defines who receives what project information, when, how, how often and from whom."],
   ["Synchronous communication", "Real-time communication where participants interact at the same time, such as meetings and calls."],
   ["Asynchronous communication", "Communication that recipients read and answer on their own schedule, such as email or a project board."],
   ["Communication channels", "The number of possible two-way links between people, n(n - 1) / 2."]
  ],
  example: "A project spans teams in Chicago, Dublin and Bangalore. The communication plan sets an asynchronous daily update in a shared channel, a weekly 45-minute video call scheduled at a time that is reasonable for all three sites, a one-page status report for the sponsor every Friday and a user newsletter two weeks before each rollout wave.",
  tip: "When a stakeholder complains about too much, too little or the wrong kind of information, the answer is to update the communication plan. For global teams, favor asynchronous tools; for conflict or sensitive news, favor synchronous, personal methods.",
  check: [
   ["How many communication channels exist on a team of 6 people?", "15, because 6 x 5 / 2 = 15."],
   ["What should a communication plan specify for each audience?", "The information they need, the method or channel, the frequency, who sends it and any special requirements."]
  ]
 },
 {
  t: "Stakeholder management: stakeholder register, power/interest grid, engagement and managing expectations",
  body: [
   "A stakeholder is any person, group or organization that can affect, be affected by or believe they are affected by the project. For an IT project that includes the sponsor and team, but also end users, department managers, the service desk that will support the result, security and compliance teams, vendors, and sometimes regulators or customers. Stakeholders you miss early tend to appear late with new requirements or objections, which is expensive.",
   "Identification starts in initiating and continues through the project. The results go into the stakeholder register, which lists each stakeholder's name, role, contact details, requirements and expectations, level of influence and interest, current attitude (supportive, neutral, resistant) and the desired level of engagement. Because it may contain frank notes about people, the register is often treated as sensitive.",
   "A power/interest grid helps decide how much attention each stakeholder needs. High power, high interest: manage closely, involving them in decisions and keeping them in regular contact. High power, low interest: keep satisfied, giving them enough to stay comfortable without flooding them with detail. Low power, high interest: keep informed with regular updates, since they can still be valuable allies or sources of requirements. Low power, low interest: monitor with minimal effort. Other models use influence and impact, or a salience model that adds urgency and legitimacy, but the idea is the same.",
   "Engagement is ongoing. The project manager builds trust, listens to concerns, shares progress honestly and involves stakeholders at the right moments, such as requirements workshops, demos and acceptance testing. Managing expectations means making sure what people expect matches what the project will actually deliver: confirm scope in writing, explain trade-offs openly, share bad news early with options, and never promise features or dates that have not been agreed through change control."
  ],
  terms: [
   ["Stakeholder", "Anyone who can affect or is affected by the project or its outcome."],
   ["Stakeholder register", "The document recording stakeholders' roles, interests, influence, expectations and engagement strategy."],
   ["Power/interest grid", "A 2x2 model that sorts stakeholders by power and interest to choose an engagement strategy."],
   ["Expectation management", "Keeping stakeholders' understanding of scope, schedule and outcomes aligned with the approved plan."]
  ],
  example: "In a payroll system replacement, the CFO has high power and high interest, so the project manager meets her every two weeks. The CEO has high power but little interest and receives a monthly one-line summary. Payroll clerks have low power but high interest and are invited to demos and training. The building facilities team is simply monitored.",
  tip: "Learn the four quadrants: manage closely (high/high), keep satisfied (high power, low interest), keep informed (low power, high interest), monitor (low/low). A resistant high-power stakeholder needs personal attention, not more email.",
  check: [
   ["Where would you record that the head of finance is resistant to the project?", "In the stakeholder register, along with the planned engagement strategy."],
   ["What strategy fits a stakeholder with low power and high interest?", "Keep informed with regular updates."]
  ]
 },
 {
  t: "Resource management: resource types, allocation, leveling vs smoothing, shared resources and RACI charts",
  body: [
   "Resources are everything the project needs to do its work: people (human resources), equipment such as laptops and test servers, facilities such as a training room, materials, software licenses and money. Resources can be dedicated to the project full time or shared with operations or other projects. Shared resources are a frequent source of conflict: a network engineer who also handles outages may be pulled away at the worst moment, so the project manager negotiates availability with functional managers and records it in a resource calendar.",
   "Resource planning estimates what is needed for each activity, then allocates specific resources to tasks. When a person is assigned more work than they can do in a period, they are over-allocated. Two techniques fix this. Resource leveling adjusts start and finish dates to resolve over-allocation, and it can move the project end date, often because a critical resource simply is not available. Resource smoothing moves work only within the float available, so the end date and critical path do not change, but it may not remove every conflict.",
   "Clear roles avoid confusion over who does what. A responsibility assignment matrix (RAM) maps work to people; the most common form is the RACI chart. Responsible: does the work. Accountable: owns the result, approves it and answers for it; there must be exactly one per task. Consulted: gives input before or during the work, two-way. Informed: kept up to date, one-way. A task with no A has no owner; a task with several A's has confusion.",
   "Other resource concerns on the exam include organizational structure (in a functional organization the functional manager controls people, in a projectized one the project manager does, and matrix organizations fall between), onboarding and offboarding team members (accounts, access, equipment), training gaps, and keeping a skills inventory. Removing access when someone leaves the project is also a security task."
  ],
  terms: [
   ["Resource leveling", "Adjusting activity dates to resolve over-allocation, which may change the project end date."],
   ["Resource smoothing", "Adjusting activities within their float to even out resource use without changing the end date."],
   ["RACI chart", "A matrix showing who is Responsible, Accountable, Consulted and Informed for each task."],
   ["Shared resource", "A person or asset split between the project and other work, which can cause availability conflicts."]
  ],
  example: "A migration plan assigns the only Linux administrator 60 hours of work in week 5. Smoothing within float moves some of it to week 6 but still leaves 48 hours. The project manager then levels the schedule, pushing one critical task out a week, and asks the sponsor to approve a contractor to protect the end date.",
  tip: "Leveling can change the end date; smoothing cannot. In RACI questions, look for 'exactly one Accountable per task'. If people are confused about approvals, the fix is usually a RACI chart.",
  check: [
   ["Why might resource leveling extend a project?", "Because it delays activities until the needed resources are available, even if they are on the critical path."],
   ["Two managers both believe they sign off a deliverable. What tool clears this up?", "A RACI chart that names a single Accountable person for the deliverable."]
  ]
 },
 {
  t: "Schedule development: activity sequencing, dependencies (FS, SS, FF, SF), critical path, float, milestones, crashing and fast-tracking",
  body: [
   "A schedule turns the WBS into dated activities. The project manager lists the activities needed to produce each work package, estimates their durations, then sequences them. Sequencing is drawn as a network diagram, usually with the precedence diagramming method, where boxes are activities and arrows are dependencies.",
   "There are four logical relationships. Finish-to-start (FS), the most common: B cannot start until A finishes (testing starts after development). Start-to-start (SS): B cannot start until A starts (documentation begins once coding begins). Finish-to-finish (FF): B cannot finish until A finishes (editing finishes after writing finishes). Start-to-finish (SF), the rarest: B cannot finish until A starts (the old system stays running until the new one starts). Dependencies are also classified: mandatory (hard logic, required by the nature of the work), discretionary (preferred practice), external (outside the project, such as a landlord finishing electrical work) and internal. Lead time lets a successor start early; lag adds a wait, such as three days for concrete to cure.",
   "The critical path is the longest path through the network, and it sets the shortest possible project duration. Activities on it have zero total float, so any delay to them delays the project. Float (slack) is how long an activity can slip without delaying the project end (total float) or the next activity (free float). To find it, add durations along every path; the longest is critical and each other path's float equals the critical length minus its own length. Milestones are zero-duration checkpoints marking significant events, such as 'design approved'.",
   "When the schedule is too long, two compression techniques apply. Crashing adds resources, such as overtime or contractors, to critical path activities; it costs more. Fast-tracking runs activities in parallel that were planned in sequence; it costs little money but raises risk and rework. Only compressing critical path work shortens the project, and after compression a different path may become critical."
  ],
  terms: [
   ["Critical path", "The longest sequence of dependent activities, which determines the shortest project duration and has zero float."],
   ["Total float", "The time an activity can be delayed without delaying the project finish date."],
   ["Crashing", "Shortening the schedule by adding resources to critical path activities, at extra cost."],
   ["Fast-tracking", "Shortening the schedule by performing sequential activities in parallel, which increases risk."],
   ["Milestone", "A significant point or event in the schedule, with zero duration."]
  ],
  example: "Paths through a rollout network are A-B-E = 9 days and A-C-D-E = 10 days. The critical path is A-C-D-E, so the project takes 10 days and task B has 1 day of float. To finish in 9 days, the team crashes task D by adding a second installer, and after that both paths are critical.",
  tip: "Crashing costs money; fast-tracking adds risk. The critical path is the longest path, not the shortest, and adding up every task's duration is a classic wrong answer because it ignores parallel work.",
  check: [
   ["Documentation can begin once coding begins. Which dependency type is this?", "Start-to-start."],
   ["Why does shortening a non-critical activity not shorten the project?", "Because the project length is set by the critical path; the non-critical activity simply gains more float."]
  ]
 },
 {
  t: "Agile methodology: Scrum roles, events and artifacts, user stories, backlog refinement, velocity and Kanban",
  body: [
   "Agile approaches deliver value in small, frequent increments and adapt as they learn, instead of fixing all requirements up front. They suit work where requirements are expected to change, such as new software or a customer-facing portal. The Agile Manifesto values individuals and interactions, working software, customer collaboration and responding to change.",
   "Scrum is the most common agile framework. It has three accountabilities. The product owner owns the product backlog, orders it by value and accepts completed work. The scrum master coaches the team and organization in Scrum, facilitates events and removes impediments. The developers are a small, cross-functional, self-managing group who build the increment. Work happens in sprints, fixed timeboxes of one to four weeks. The events are sprint planning (choose backlog items and form a sprint goal), the daily scrum or standup (a short daily check on progress toward the goal and blockers), the sprint review (show the increment to stakeholders and gather feedback) and the sprint retrospective (improve how the team works). The artifacts are the product backlog, the sprint backlog and the increment, which must meet the team's definition of done.",
   "Backlog items are often written as user stories: 'As a <role>, I want <capability> so that <benefit>', with acceptance criteria. Large stories are called epics and are split into smaller ones. Backlog refinement (grooming) is the ongoing work of clarifying, estimating and ordering upcoming items. Teams usually estimate in story points, a relative measure of effort. Velocity is the number of points a team completes per sprint; averaged over several sprints, it forecasts how many sprints the remaining backlog will take. It is a planning tool for that team only, not a performance score to compare teams.",
   "Kanban is a flow-based method with no fixed sprints. Work items move across a board with columns such as To do, In progress, Review and Done. Work-in-progress (WIP) limits cap how many items can sit in a column, which exposes bottlenecks and reduces multitasking. Kanban fits continuous, unpredictable work such as support and operations. Metrics include lead time and cycle time, and the cumulative flow diagram."
  ],
  terms: [
   ["Product owner", "The Scrum role that owns and orders the product backlog to maximize value."],
   ["Scrum master", "The Scrum role that coaches the team, facilitates events and removes impediments."],
   ["Sprint", "A fixed timebox, usually one to four weeks, in which the team builds a usable increment."],
   ["Velocity", "The amount of work, often in story points, a team completes per sprint."],
   ["WIP limit", "A cap on how many work items can be in a Kanban column at one time."]
  ],
  example: "A team runs two-week sprints on an internal HR portal. In sprint planning they pull 32 points of user stories. At the daily standup a developer reports she cannot reach the test database, and the scrum master escalates it to the infrastructure team. At the review, HR staff try the new leave request screen and ask for changes, which the product owner adds to the backlog. At the retrospective, the team agrees to write acceptance criteria before planning.",
  tip: "Review = product and stakeholders; retrospective = process and team. The product owner sets priority; the scrum master removes blockers and does not assign work. Continuous incoming work with WIP limits points to Kanban.",
  check: [
   ["A team's last three sprints delivered 20, 24 and 22 points. About how many sprints will 110 points take?", "About 5 sprints, since average velocity is 22 points."],
   ["What is the purpose of a WIP limit?", "To stop too many items being in progress at once, which exposes bottlenecks and improves flow."]
  ]
 },
 {
  t: "Other methodologies: waterfall (predictive), hybrid, PRINCE2, Lean and Six Sigma (DMAIC), and choosing an approach",
  body: [
   "Agile is not the only way to run a project, and Project+ expects you to choose the right approach for the situation. Waterfall, also called predictive or plan-driven, moves through phases in order: requirements, design, build, test, deploy. Scope, schedule and cost are planned in detail up front and controlled against baselines, and each phase is usually signed off before the next starts. It suits projects with stable, well-understood requirements, fixed contracts, heavy regulation or physical work that is hard to change later, such as cabling a building or installing a data center.",
   "A hybrid approach mixes the two. A common pattern is predictive for infrastructure, procurement and overall milestones, with agile sprints for the software parts. Another is using agile practices such as daily standups or Kanban boards inside a traditionally governed project. Hybrid is very common in real IT organizations.",
   "PRINCE2 (Projects IN Controlled Environments) is a process-based method widely used in the UK and Europe. It emphasizes a continued business justification, defined roles, management by stages (the project is divided into stages and the board authorizes one at a time), management by exception using tolerances for time, cost and scope, and a focus on products (deliverables). A project board, including an executive, senior user and senior supplier, makes key decisions.",
   "Lean comes from manufacturing and aims to maximize customer value by eliminating waste: waiting, rework, unnecessary handoffs, overproduction and so on. Value stream mapping is a typical Lean tool. Six Sigma aims to reduce variation and defects using data. Its improvement cycle is DMAIC: Define the problem, Measure current performance, Analyze causes, Improve the process and Control it so the gains last. Lean Six Sigma combines both.",
   "To choose, look at requirement stability, customer availability for feedback, regulatory and contractual constraints, team experience, and organizational culture. Fixed, known requirements with formal sign-offs favor predictive; evolving requirements and frequent feedback favor agile; process improvement with measurable defects points to Six Sigma or Lean."
  ],
  terms: [
   ["Waterfall (predictive)", "A sequential approach where requirements, design, build, test and deploy happen in order with detailed up-front planning."],
   ["Hybrid approach", "A combination of predictive and agile practices within one project."],
   ["PRINCE2", "A process-based project method built on business justification, stages, tolerances and management by exception."],
   ["DMAIC", "Six Sigma's improvement cycle: Define, Measure, Analyze, Improve, Control."]
  ],
  example: "A bank opens a new branch. The building fit-out, network cabling and hardware procurement are planned predictively with fixed milestones. The customer-facing appointment booking app is built in two-week sprints with branch staff reviewing each increment. Leadership reports on the whole effort through a single milestone plan, making it a hybrid project.",
  tip: "Watch the clues: 'requirements well defined, formal sign-off, regulated' means waterfall; 'requirements evolving, frequent feedback' means agile; 'reduce defects with data' means Six Sigma; 'eliminate waste' means Lean; 'stages and tolerances' means PRINCE2.",
  check: [
   ["What does management by exception mean in PRINCE2?", "The project manager works within agreed tolerances and escalates to the project board only when a tolerance is forecast to be exceeded."],
   ["Name the five DMAIC phases.", "Define, Measure, Analyze, Improve, Control."]
  ]
 },
 {
  t: "Team dynamics and conflict resolution: team development stages, conflict techniques, motivation and running effective meetings",
  body: [
   "Projects are delivered by people, and new teams go through predictable stages. Bruce Tuckman's model describes them: forming (members are polite, unsure of roles and depend on the leader), storming (disagreements over roles, approaches and priorities surface), norming (the team agrees on ways of working and builds trust), performing (the team works effectively with little supervision) and adjourning (the work ends and the team disbands). Teams can slip back, for example into storming when a new member joins, so the project manager adapts: more direction when forming, facilitation while storming, delegation when performing.",
   "Conflict is normal and can even improve decisions if handled well. Common sources are schedules, priorities, resources, technical opinions, procedures, costs and personalities. Five techniques are widely taught. Collaborating (problem-solving) works through the issue openly to find a win-win solution, and usually gives lasting results. Compromising (reconciling) has each side give something up. Smoothing (accommodating) emphasizes agreement and downplays differences, which preserves relationships but may leave the root cause. Forcing (directing) imposes one view, fast but damaging if overused; it fits emergencies or safety issues. Withdrawing (avoiding) postpones the issue, which can be useful to let emotions cool but does not solve it.",
   "Motivation matters too. People are motivated by recognition, meaningful work, growth, autonomy and fair rewards, not only money. Theories such as Maslow's hierarchy of needs and Herzberg's hygiene and motivating factors are sometimes referenced. Practical tools include recognizing good work publicly, providing training and removing obstacles.",
   "Meetings take a lot of project time, so run them well. Send an agenda in advance with the purpose and topics, invite only the people needed, start and end on time, use a timekeeper and a facilitator, stay on topic by parking unrelated items, and close by confirming decisions and action items with owners and due dates. Distribute minutes promptly. Ground rules, such as one conversation at a time and cameras on for key decisions, help virtual teams."
  ],
  terms: [
   ["Tuckman model", "Team development stages: forming, storming, norming, performing and adjourning."],
   ["Collaborating", "A conflict technique that works through differences to reach a win-win, lasting solution."],
   ["Forcing", "A conflict technique that imposes one party's view; fast but can damage relationships."],
   ["Smoothing", "A conflict technique that emphasizes agreement and downplays differences."]
  ],
  example: "Two senior engineers argue about whether to use a vendor's managed firewall or build their own, and the team has stalled. The project manager runs a session where both present requirements and evidence, and together they agree on the managed service with a custom logging add-on. This collaborative approach resolves the conflict and helps the team move from storming to norming.",
  tip: "Collaborating (problem-solving) is usually the best long-term answer on the exam. Forcing is right only for urgent or safety situations, and withdrawing only postpones the problem.",
  check: [
   ["A team agrees on working rules and starts to trust each other. Which Tuckman stage is this?", "Norming."],
   ["What should close every project meeting?", "A recap of decisions and action items with owners and due dates, followed by distributed minutes."]
  ]
 },
 {
  t: "Discovery and concept preparation: business case, feasibility, ROI and payback period, and preliminary scope",
  body: [
   "Before a project exists, someone has an idea or a problem: the file server is out of space, customers want online ordering, a regulation requires new controls. The discovery or concept preparation phase decides whether that idea is worth turning into a project. Project+ treats it as the first phase of the life cycle, before initiating.",
   "The central document is the business case. It describes the problem or opportunity, the options considered (including doing nothing), the recommended option, the expected costs and benefits, key risks, and how the project supports the organization's strategy. Leadership uses it to decide whether to fund the project and to compare it with other requests competing for the same money. The business case is revisited throughout the project; if the justification disappears, the project should be stopped.",
   "A feasibility study checks whether the idea can actually work: technically (can the existing network support VoIP?), operationally (can the service desk support it?), financially (can we afford it?) and legally or in terms of schedule. It may include a proof of concept or a pilot. Financial measures help compare options. Return on investment (ROI) compares net benefit with cost, typically (benefit minus cost) divided by cost. The payback period is how long it takes for savings to repay the investment: cost divided by annual savings, so $120,000 at $40,000 per year pays back in three years. Net present value (NPV) and internal rate of return (IRR) account for the time value of money; a positive NPV is favorable. Cost-benefit analysis lists and compares all costs and benefits, including intangible ones.",
   "Discovery also produces a preliminary scope: a first view of what is in and out, major deliverables, high-level requirements, known constraints and assumptions, and a rough order of magnitude (ROM) estimate, often given with a wide range such as minus 25 to plus 75 percent. Current-state and future-state analysis, gap analysis and interviews with key stakeholders feed into this. The output goes forward to initiating, where the charter formalizes it."
  ],
  terms: [
   ["Business case", "A document that justifies a proposed project by comparing its costs, benefits, options and risks."],
   ["Feasibility study", "An assessment of whether a proposed project is technically, operationally and financially viable."],
   ["Payback period", "The time needed for a project's savings or returns to repay its initial cost."],
   ["Return on investment (ROI)", "Net benefit divided by cost, showing how much value the investment returns."],
   ["Rough order of magnitude (ROM)", "A very early, wide-range estimate used before details are known."]
  ],
  example: "A retailer considers replacing paper stock counts with handheld scanners. The business case shows a cost of $90,000 and savings of $45,000 a year in labor, a two-year payback. A feasibility study confirms the warehouse Wi-Fi covers every aisle and a two-week pilot in one store works. The executive committee approves the project and it moves to initiating.",
  tip: "If a question asks which document justifies the investment or compares options before approval, the answer is the business case, not the charter. Payback = cost / annual savings; shorter is better.",
  check: [
   ["A project costs $60,000 and saves $20,000 a year. What is the payback period?", "Three years."],
   ["What should happen if the business case is no longer valid mid-project?", "The project should be reviewed and possibly cancelled, because it no longer has a justification."]
  ]
 },
 {
  t: "Initiating: project charter, sponsor authorization, high-level scope, assumptions, constraints and success criteria",
  body: [
   "Initiating turns an approved idea into an official project. Its most important output is the project charter, a short document that formally authorizes the project, names the project manager and gives them authority to apply organizational resources. The sponsor, or another person with authority, signs it. Until the charter is signed, the project does not formally exist, and a project manager who starts spending money without one is taking a real risk.",
   "A charter typically contains the project's purpose and business justification (often summarized from the business case), measurable objectives, high-level scope and requirements, major deliverables, summary milestones, a summary budget, key stakeholders, high-level risks, assumptions, constraints, success and acceptance criteria, the project manager's name and authority level, and the sponsor's approval. It is intentionally high level; the detail comes in planning.",
   "Assumptions and constraints are easy to confuse. An assumption is something the team believes to be true for planning but has not proven, such as 'the vendor will deliver in 30 days' or 'users will be available for testing in March'. Each assumption is a potential risk and should be recorded in an assumption log and validated. A constraint is a known limit the project must work within: a fixed deadline, a budget cap, a mandated technology, a regulation or limited staff.",
   "Success criteria define how everyone will know the project succeeded. Good criteria are measurable, for example 'all 400 users migrated with no more than 1 percent help desk tickets in the first week' or 'go-live by June 30 within $250,000'. Agreeing on them early prevents arguments at closing. Some organizations also include objectives written using SMART (specific, measurable, achievable, relevant, time-bound) and note what is explicitly out of scope, which is one of the best defenses against later scope creep."
  ],
  terms: [
   ["Project charter", "The document that formally authorizes the project and gives the project manager authority to use resources."],
   ["Assumption", "A factor believed to be true for planning purposes without proof; a potential source of risk."],
   ["Constraint", "A limitation, such as a fixed date, budget or required technology, that the project must work within."],
   ["Success criteria", "Measurable conditions that define whether the project achieved its objectives."]
  ],
  example: "The charter for a VPN replacement lists the objective 'replace the legacy VPN for 1,200 remote users by September 30', a budget of $180,000, the constraint that the new solution must support the existing MFA provider, the assumption that the vendor's licenses arrive within two weeks, and the success criterion of fewer than 20 connection tickets per week after cutover. The CIO signs it as sponsor.",
  tip: "Charter = authorization and the project manager's authority; business case = justification. 'Believed true but not confirmed' = assumption; 'must' or 'cannot exceed' = constraint.",
  check: [
   ["Who signs the project charter?", "The sponsor or another person with the authority to fund and authorize the project."],
   ["'The budget cannot exceed $50,000.' Is this an assumption or a constraint?", "A constraint, because it is a fixed limit."]
  ]
 },
 {
  t: "Initiating: identifying stakeholders, assigning the project manager, and holding the kickoff meeting",
  body: [
   "Alongside the charter, initiating identifies the people involved. The project manager is assigned as early as possible, ideally while the charter is being written, so they understand the reasoning behind the project and can help shape it. The charter records their authority: for example, whether they can approve spending up to a limit, choose team members or approve small changes.",
   "Stakeholder identification begins here. The project manager reviews the charter, business case, organizational chart and lessons learned from similar projects, and interviews the sponsor and key managers to find everyone who will be affected. The results go into the stakeholder register with each person's role, interests, influence and expectations. Early identification lets the project manager plan engagement before surprises happen. Stakeholders are also asked who else should be involved, since a single missing department can derail requirements later.",
   "Initiating is also when the team starts to take shape. The project manager works with functional managers to get key people committed, requests accounts, equipment and access, and makes sure the team has the tools it will need, such as a project workspace or ticket queue. On many projects, a responsibility assignment matrix is sketched at this stage so everyone knows who owns which area.",
   "The kickoff meeting formally launches the project with the sponsor, team and key stakeholders. Its purpose is shared understanding: the project's goals and business reason, high-level scope and what is out of scope, milestones, roles and responsibilities, how communication and decisions will work, the change control process, known risks and immediate next steps. The sponsor often opens it to show support. Some organizations hold an internal kickoff with the team and a separate external one with the customer. After the meeting, the project manager distributes minutes so everyone has the same record."
  ],
  terms: [
   ["Kickoff meeting", "The meeting that launches the project, aligning stakeholders and team on goals, roles, communication and next steps."],
   ["Stakeholder identification", "Finding everyone who affects or is affected by the project and recording them in the stakeholder register."],
   ["Project manager authority", "The level of decision-making power granted to the project manager in the charter."]
  ],
  example: "After the charter for a new learning management system is signed, the project manager interviews HR, IT security, the training team and two regional managers, and adds them to the stakeholder register. At the kickoff, the HR director (sponsor) explains why the project matters, the project manager walks through the milestones, RACI and weekly status routine, and the team agrees on a change request form.",
  tip: "The kickoff meeting happens after the charter is approved and stakeholders are identified, and before detailed execution. Its goal is alignment on objectives, roles and communication, not detailed technical design.",
  check: [
   ["Why should the project manager be assigned before the charter is finalized?", "So they understand the project's background and can help shape its scope, objectives and constraints."],
   ["Name four topics a kickoff meeting should cover.", "Goals and business reason, scope and exclusions, milestones, roles and responsibilities, communication, change control and next steps (any four)."]
  ]
 },
 {
  t: "Planning: requirements gathering, scope statement, work breakdown structure (WBS) and WBS dictionary",
  body: [
   "Planning turns the charter's high-level view into a plan the team can follow. It begins with requirements: the conditions or capabilities the product must have. Business requirements describe why the organization needs it; functional requirements describe what the product must do ('users can reset their own password'); non-functional requirements describe qualities such as performance, availability, security and accessibility. Requirements are gathered through interviews, workshops, focus groups, surveys and questionnaires (good for many or dispersed people), observation or job shadowing, prototypes, and document analysis. A requirements traceability matrix links each requirement to its source, the deliverable that satisfies it and the test that verifies it.",
   "The scope statement describes the project and product scope in detail: deliverables, acceptance criteria, exclusions (what is explicitly not included), assumptions and constraints. Clear exclusions prevent later arguments, for example 'mobile app support is out of scope'.",
   "The work breakdown structure (WBS) is a hierarchical decomposition of the total scope into smaller, manageable pieces. The top level is the project, the next level is usually major deliverables or phases, and the lowest level is the work package, small enough to estimate, assign and track. The 100 percent rule says the WBS must include all of the work, and only the work, of the project; if something is not in the WBS, it is not in scope. A WBS is organized around deliverables (nouns), not activities (verbs); activities are derived from work packages when building the schedule.",
   "The WBS dictionary provides details for each element: description, owner, acceptance criteria, estimated cost and duration, dependencies and resources. Together, the scope statement, WBS and WBS dictionary form the scope baseline, which is approved and then changed only through change control. In agile projects, the prioritized product backlog plays a similar role, with epics and user stories instead of a formal WBS."
  ],
  terms: [
   ["Work breakdown structure (WBS)", "A hierarchical decomposition of the project's total scope into deliverables and work packages."],
   ["Work package", "The lowest level of the WBS, small enough to estimate, assign and control."],
   ["WBS dictionary", "A document with detailed information about each WBS element, such as description, owner and acceptance criteria."],
   ["Scope baseline", "The approved scope statement, WBS and WBS dictionary, changed only through change control."],
   ["Requirements traceability matrix", "A table linking each requirement to its source, deliverable and test."]
  ],
  example: "For an office move, the WBS top levels are Network, End-user equipment, Telephony and Training. Network breaks down into Cabling, Switching, Wireless and Testing. The WBS dictionary entry for Wireless lists the vendor as owner, 22 access points, a coverage survey as the acceptance criterion and an estimate of four days.",
  tip: "The WBS shows deliverables and work packages, not dates. If a question asks for the details of one work package, the answer is the WBS dictionary. If work is not in the WBS, it is not in scope.",
  check: [
   ["What is the 100 percent rule?", "The WBS must include all the work of the project, and nothing outside it."],
   ["Which requirements-gathering technique suits 500 users in many countries?", "An online survey or questionnaire."]
  ]
 },
 {
  t: "Planning: estimating time and cost (analogous, parametric, three-point/PERT, bottom-up) and setting baselines",
  body: [
   "Once work packages and activities are known, the team estimates how long each will take and what it will cost. Estimates are best made by the people who will do the work, and they should state their assumptions and a range, because every estimate is uncertain. Accuracy usually improves as the project progresses, which is why early estimates are rough and later ones are refined.",
   "Analogous (top-down) estimating uses the actual duration or cost of a similar past project, adjusted for known differences. It is fast and useful early, but only as accurate as the similarity. Parametric estimating multiplies a unit rate by the quantity of work: if configuring one switch takes 1.5 hours, 40 switches take 60 hours. It is accurate when the unit rate is reliable and the work scales linearly. Bottom-up estimating estimates each work package or activity in detail and adds them up; it is the most accurate and the most time-consuming. Expert judgment draws on experienced people and is often combined with the others.",
   "Three-point estimating accounts for uncertainty using an optimistic (O), most likely (M) and pessimistic (P) value. The PERT or beta formula weights the most likely value: (O + 4M + P) / 6. The simple triangular average is (O + M + P) / 3. For O = 4, M = 6, P = 14 days, PERT gives 7 days and the triangular average gives 8. A rough standard deviation is (P - O) / 6, which helps express confidence. Estimating can also include reserves for risk.",
   "When the estimates, schedule and budget are agreed, they are approved as baselines: the scope baseline, the schedule baseline and the cost baseline (the time-phased budget, which includes contingency reserve but not management reserve). Baselines are the yardstick for measuring performance during execution. They change only through formal change control; rebaselining to hide poor performance is not acceptable. Agile teams estimate in story points and use velocity for release forecasts instead of a detailed baseline."
  ],
  terms: [
   ["Analogous estimating", "Estimating from the actual values of a similar past project; fast but less accurate."],
   ["Parametric estimating", "Estimating by multiplying a unit rate by the quantity of work."],
   ["Three-point (PERT) estimate", "A weighted estimate using optimistic, most likely and pessimistic values: (O + 4M + P) / 6."],
   ["Bottom-up estimating", "Estimating each work package in detail and summing them; the most accurate method."],
   ["Baseline", "The approved scope, schedule or cost plan used to measure performance, changed only through change control."]
  ],
  example: "Early in a laptop refresh, the project manager tells the sponsor 'about 10 weeks, based on last year's refresh' (analogous). In planning, the technicians time a single laptop build at 45 minutes and multiply by 600 laptops (parametric). For the uncertain data migration, they give 5, 8 and 17 days, which PERT turns into 9 days. The final plan is approved as the schedule and cost baselines.",
  tip: "Past similar project = analogous; rate times quantity = parametric; sum of detailed pieces = bottom-up (most accurate). Memorize PERT: (O + 4M + P) / 6.",
  check: [
   ["O = 2, M = 5, P = 14 days. What is the PERT estimate?", "(2 + 20 + 14) / 6 = 6 days."],
   ["Which estimating technique is fastest but least accurate?", "Analogous (top-down) estimating."]
  ]
 },
 {
  t: "Planning: budget development and procurement (make vs buy, RFI, RFP, RFQ, statement of work, contract types)",
  body: [
   "The project budget is built by adding up the cost estimates for activities and work packages, then adding the contingency reserve for identified risks. That total, spread over time, is the cost baseline. The management reserve for unknown risks is added on top to form the total project budget, but it is held by management. Budgets include labor, hardware, software licenses, cloud subscriptions, facilities, training, travel and vendor costs. It is important to distinguish capital expenses (CapEx, such as buying servers, often depreciated over years) from operating expenses (OpEx, such as monthly cloud or SaaS fees), because organizations fund them differently. Funding may also be released in stages, which the project manager must plan around.",
   "Procurement planning starts with a make-or-buy analysis: should the team build or do the work internally, or buy a product or service? Factors include cost, internal skills and capacity, time, control, intellectual property and long-term support. Once buying is chosen, the project issues solicitation documents. A request for information (RFI) gathers general information about what the market offers. A request for proposal (RFP) asks vendors to propose a solution and price for a need, when the approach is open. A request for quote (RFQ) asks for prices on something already fully specified. Vendors are then evaluated against weighted criteria such as price, experience, technical approach and support.",
   "The statement of work (SOW) describes the work the vendor will perform: deliverables, timeline, location, standards, acceptance criteria and reporting. It becomes part of the contract. Contract types allocate risk differently. In a firm fixed price (FFP) contract, the seller delivers a well-defined scope for a set price and carries the cost risk. Fixed price incentive fee and fixed price with economic price adjustment are variations. In cost-reimbursable contracts (cost plus fixed fee, cost plus incentive fee, cost plus award fee), the buyer pays actual costs plus a fee and carries more risk; they suit uncertain scope. Time and materials (T&M) pays an hourly rate plus materials and suits staff augmentation or short, unclear work, but needs a not-to-exceed cap to control cost.",
   "Other procurement terms include the purchase order (PO), which formally commits the organization to buy, and pre-qualified or preferred vendor lists, which speed up buying."
  ],
  terms: [
   ["Request for proposal (RFP)", "A solicitation asking vendors to propose a solution and price for a defined need."],
   ["Request for quote (RFQ)", "A solicitation asking vendors for prices on a fully specified product or service."],
   ["Statement of work (SOW)", "A description of the work, deliverables, schedule and acceptance criteria a vendor will provide."],
   ["Firm fixed price contract", "A contract with a set price for a defined scope, where the seller carries cost risk."],
   ["Time and materials contract", "A contract paying an hourly rate plus materials, suited to uncertain or short-term work."]
  ],
  example: "A school district needs classroom Wi-Fi. It issues an RFI to learn what vendors offer, then an RFP asking for a full design and price. After choosing a vendor, it signs a firm fixed price contract with an SOW listing 120 access points, a coverage survey and acceptance testing. Later, it uses an RFQ to buy 300 identical Chromebooks from three suppliers.",
  tip: "RFI = learn, RFP = propose a solution, RFQ = price for a known item. Fixed price puts risk on the seller; cost-reimbursable puts it on the buyer; T&M suits staff augmentation.",
  check: [
   ["Which contract type is riskiest for the buyer when scope is uncertain?", "A cost-reimbursable contract, because the buyer pays actual costs plus a fee."],
   ["What is the difference between an SOW and an RFP?", "The RFP asks vendors to propose; the SOW describes the work the chosen vendor will perform and becomes part of the contract."]
  ]
 },
 {
  t: "Planning: subsidiary plans for quality, risk, communication, transition and release",
  body: [
   "The project management plan is not one document but a collection: the baselines plus subsidiary plans that describe how each area will be managed. On a small project they may be a page each; on a large one they may be substantial. Writing them forces the team to think through how the project will run before problems arise.",
   "The quality management plan defines the quality standards the deliverables must meet (for example, page load under two seconds, zero critical defects at go-live), the metrics used, how quality assurance and quality control will be performed, who is responsible, and which tools and tests will be used. The risk management plan describes how risks will be identified, analyzed and reviewed, the probability and impact scales, risk categories, roles and how reserves are handled; the risk register is the separate working document. The communication plan sets audiences, messages, methods and frequency. Other subsidiary plans include scope, schedule, cost, resource, procurement, stakeholder engagement and change management plans.",
   "IT projects also need a transition plan: how the finished product will be handed over to operations and users. It covers support staff training, knowledge transfer, documentation and runbooks, the service desk's readiness, service level agreements, monitoring, warranty or hypercare periods, and when the project team steps back. Planning transition early avoids the common problem of a system going live with nobody ready to support it.",
   "A release plan describes how the product will be delivered to users: whether in one big-bang cutover, in phases by location or department, or as a pilot followed by wider rollout. It lists release dates and contents, deployment steps, go/no-go criteria, rollback plans, communication to users and training timing. In agile projects, release planning groups backlog items into releases using the team's velocity. Both transition and release plans connect to the organization's operational change management, since deployments to production must go through the change advisory board."
  ],
  terms: [
   ["Project management plan", "The integrated set of baselines and subsidiary plans that describe how the project will be executed, monitored and closed."],
   ["Quality management plan", "The plan that defines quality standards, metrics, and how quality assurance and control will be performed."],
   ["Transition plan", "The plan for handing the finished product over to operations, including training, documentation and support readiness."],
   ["Release plan", "The plan for how and when deliverables are deployed to users, including rollout approach and go/no-go criteria."]
  ],
  example: "For a new expense system, the quality plan sets a target of no severity-1 defects and 95 percent of test cases passing before UAT sign-off. The release plan pilots the system with finance in May and rolls out to all departments in June. The transition plan trains four service desk analysts, delivers a runbook and schedules two weeks of hypercare with the vendor on call.",
  tip: "The risk management plan says how risk will be managed; the risk register lists the actual risks. If a question describes support staff unready at go-live, the missing piece is the transition plan.",
  check: [
   ["What is the difference between the communication plan and a status report?", "The communication plan defines what, how and when information is shared; a status report is one of the communications it schedules."],
   ["Name three items a transition plan should cover.", "Training for support staff, documentation or runbooks, support readiness and SLAs, hypercare period and handover date (any three)."]
  ]
 },
 {
  t: "Executing: directing the work, managing vendors, quality assurance vs quality control, and deliverable acceptance",
  body: [
   "Executing is where most of the project's time and money are spent. The project manager directs and manages the work defined in the plan: assigning tasks, coordinating teams and vendors, running meetings, removing obstacles, managing the team's development and keeping stakeholders engaged. Approved changes are implemented, and work performance data (what was actually done, when and at what cost) is collected for monitoring.",
   "Vendor management is a big part of execution on IT projects. The project manager tracks each vendor's progress against the SOW and contract milestones, reviews deliverables, approves invoices only for accepted work, holds regular vendor meetings and handles disputes through the contract's process. Changes to vendor scope go through change orders, not informal requests. Performance against any service level agreement is measured and recorded.",
   "Quality assurance (QA) and quality control (QC) are often confused. QA is process-focused and preventive: it checks that the team is following the right processes and standards, through audits, process reviews, peer reviews of methods and training. QC is product-focused and detective: it inspects and tests the actual deliverables to find defects, through testing, inspections, walkthroughs and measurements, and compares results with the quality standards. A quality audit asking 'are we following our testing procedure?' is QA; running the test cases on a build is QC.",
   "Deliverables that pass QC still need acceptance. The customer or sponsor reviews each deliverable against the agreed acceptance criteria and formally accepts it, often by signing an acceptance form or approving it in a tool. This is sometimes called validating scope. User acceptance testing (UAT) is a common way for business users to confirm the product meets their needs before sign-off. Deliverables that fail acceptance are corrected, or a change request is raised if the criteria themselves need to change. Accepted deliverables later feed into project closing."
  ],
  terms: [
   ["Quality assurance (QA)", "Process-focused activities, such as audits, that make sure the right methods are followed to prevent defects."],
   ["Quality control (QC)", "Product-focused activities, such as testing and inspection, that find defects in deliverables."],
   ["User acceptance testing (UAT)", "Testing by business users to confirm the product meets their needs before formal acceptance."],
   ["Change order", "A formal, agreed modification to a vendor contract's scope, price or schedule."]
  ],
  example: "During a phone system rollout, the PMO's auditor checks that the team is documenting each site test as the quality plan requires (QA). The technicians place test calls and check call quality at every site (QC). The facilities director then walks through the acceptance checklist and signs off each site, and only then does the project manager approve the vendor's invoice for that site.",
  tip: "QA = process, prevention, audits. QC = product, detection, testing and inspection. Passing internal tests is not acceptance; the customer must formally accept against the criteria.",
  check: [
   ["A reviewer checks whether code reviews are being performed for every change. Is this QA or QC?", "QA, because it checks that a process is being followed."],
   ["Why should the project manager tie vendor invoices to accepted deliverables?", "So the organization pays only for work that meets the contract's acceptance criteria."]
  ]
 },
 {
  t: "Monitoring and controlling: tracking progress against baselines, variance analysis, issue management and escalation",
  body: [
   "Monitoring and controlling runs alongside execution for the whole project. The project manager compares actual performance with the baselines, identifies variances, decides on corrective or preventive actions and makes sure changes go through change control. Without it, the team may be busy but heading in the wrong direction.",
   "Progress is tracked with work performance data from the team, timesheets, the project tool and vendor reports. Useful measures include percent complete, milestones met or missed, budget spent against plan, earned value metrics (schedule and cost variance, SPI and CPI), defect counts and, for agile teams, burndown charts and velocity. A variance is the difference between planned and actual. Variance analysis asks why it happened and whether it is within tolerance. Small variances within tolerance may simply be watched; larger ones need corrective action (to fix a current problem) or preventive action (to stop a future one). Only when the plan itself must change, such as a new end date, does a change request go to the change control board.",
   "Issues are problems happening now, as opposed to risks, which might happen. Each issue is recorded in the issue log with a description, date raised, priority, owner, due date, actions and status. The project manager makes sure owners work on their issues and reviews the log at status meetings. Some issues come from risks that occurred; the risk register is then updated too.",
   "Escalation moves an issue or decision to a higher authority when it exceeds the project manager's authority, tolerance or ability to resolve: needing more budget than allowed, a resource conflict between departments, or a vendor dispute. The escalation path, defined in the communication or governance plan, usually goes from project manager to sponsor to steering committee. Escalate with facts: the issue, its impact, options and a recommendation. Escalation is not failure; hiding problems is."
  ],
  terms: [
   ["Variance", "The difference between planned and actual performance for scope, schedule or cost."],
   ["Corrective action", "An action taken to bring current performance back in line with the plan."],
   ["Issue log", "A record of current problems with owners, priorities, actions and status."],
   ["Escalation path", "The defined chain of authority, such as sponsor then steering committee, for decisions beyond the project manager's authority."]
  ],
  example: "Week 8 status shows the data migration 40 percent complete against a planned 60 percent. Variance analysis finds the source database is slower than expected. The project manager adds a corrective action to run migration jobs overnight, logs the performance problem as an issue owned by the DBA, and, when it becomes clear the go-live must slip a week, submits a change request to the CCB.",
  tip: "When a variance is found, first analyze the cause and options; do not immediately rebaseline or add people. When a decision exceeds your authority, escalate through the defined path with options and a recommendation.",
  check: [
   ["What is the difference between corrective and preventive action?", "Corrective action fixes current deviation from the plan; preventive action reduces the chance of a future problem."],
   ["When should a project manager escalate an issue?", "When it exceeds their authority or tolerance, or they cannot resolve it, following the defined escalation path."]
  ]
 },
 {
  t: "Closing: formal acceptance, transition to operations, contract closure, releasing resources, lessons learned and archiving",
  body: [
   "Closing formally ends the project or a phase. It happens when all work is done and accepted, but also when a project is cancelled or terminated early. In both cases, an orderly close protects the organization: it records what was achieved, frees people and money, and preserves knowledge for future projects. Skipping closure leaves loose ends such as open contracts, unused licenses and unanswered questions about ownership.",
   "The first step is confirming formal acceptance: the sponsor or customer confirms in writing that the final deliverables meet the acceptance criteria. Next comes transition to operations, the handoff of the product to the people who will run and support it. This includes documentation, runbooks, training, support contacts, warranty details and any service level agreements, followed by a hypercare or warranty period where the project team is still on call.",
   "Contract (procurement) closure confirms that each vendor has delivered everything in the contract, open claims are settled, final invoices are paid and procurement records are archived. A procurement audit may review what went well in the buying process. The budget is reconciled so final costs are known, and unused funds are returned.",
   "Resources are released: team members return to their functional managers or move to new projects, with feedback on their performance, and equipment, facilities and temporary accounts are returned or removed. Removing project-specific access is also a security step. The lessons learned session, held while people still remember, captures what went well, what did not and what to do differently, and the results are stored in the organization's lessons learned repository. Finally, the project manager prepares a closure report comparing results with objectives, archives all project documents according to the retention policy, communicates closure to stakeholders and, often, celebrates with the team.",
   "If a project is cancelled early, the same steps apply to the work completed: document status, capture lessons, close contracts, release resources and archive."
  ],
  terms: [
   ["Formal acceptance", "Written confirmation from the sponsor or customer that deliverables meet the acceptance criteria."],
   ["Transition to operations", "Handing the finished product over to the teams who will run and support it."],
   ["Contract closure", "Confirming vendor obligations are met, settling payments and claims, and archiving procurement records."],
   ["Lessons learned", "Documented knowledge from the project about what worked, what did not and what to change next time."]
  ],
  example: "After a new HR system goes live, the HR director signs the acceptance form. The service desk receives runbooks and training, and the vendor provides four weeks of hypercare. The project manager confirms the vendor's final milestone, pays the last invoice, holds a lessons learned workshop, removes temporary admin accounts, archives the documents and sends a closure announcement.",
  tip: "Lessons learned should be captured before the team is released. A cancelled project still goes through closing. Contract closure is about vendors; formal acceptance is about the customer.",
  check: [
   ["The sponsor cancels a project. What should the project manager do?", "Follow the closing process: document status, capture lessons learned, close contracts, release resources and archive records."],
   ["Why remove project-specific accounts and access at closing?", "To follow least privilege and avoid leaving unused accounts that could be misused."]
  ]
 },
 {
  t: "Project management software: scheduling tools, Gantt charts, Kanban boards, ticketing systems and dashboards",
  body: [
   "Project managers rely on software to plan, track and report. Scheduling tools, whether desktop programs or cloud services, let you enter tasks, durations, dependencies and resources, then calculate start and finish dates, the critical path and resource loading. They can save a baseline and later show the variance between baseline and actual dates. Free and open-source options such as ProjectLibre and GanttProject are good for practice; many organizations use commercial or cloud-based tools with the same concepts.",
   "The most familiar schedule view is the Gantt chart: tasks listed down the left side, a calendar across the top and a horizontal bar for each task showing its start, duration and finish. Arrows show dependencies, diamonds show milestones and a line often marks today's date. A Gantt chart is excellent for communicating the timeline and spotting overlaps, but a large one can become hard to read, so executives usually get a summary milestone chart instead.",
   "Kanban boards visualize work as cards moving across columns such as Backlog, To do, In progress, Review and Done. They make it easy to see what everyone is working on and where work is piling up, especially with work-in-progress limits. Many teams use them for agile projects or for operations work alongside a project. Ticketing systems, the tools a service desk uses to log incidents and requests, are also used on IT projects to track tasks, defects and change requests, because they provide an audit trail, assignment and status history. A defect found in testing becomes a ticket with a severity, owner and resolution.",
   "Dashboards pull data from these tools into a one-screen view of project health: milestones, percent complete, budget used, open risks and issues, and red, amber and green (RAG) status indicators. A good dashboard is tailored to its audience; executives want a few indicators and trends, while the team wants task-level detail. Whatever tool is used, the data is only as good as the updates the team provides, so agree on who updates what and how often."
  ],
  terms: [
   ["Gantt chart", "A bar chart that shows tasks against a calendar, with durations, dependencies and milestones."],
   ["Kanban board", "A visual board of cards moving through workflow columns, often with WIP limits."],
   ["Dashboard", "A one-screen visual summary of project health indicators such as schedule, budget, risks and RAG status."],
   ["Ticketing system", "A tool for logging, assigning and tracking tasks, defects, incidents or requests with a history."]
  ],
  example: "A project manager keeps the master schedule in a scheduling tool and shares a Gantt chart with the team each week. Developers track daily work on a Kanban board, testers log defects as tickets and the sponsor opens a dashboard showing that the project is green on schedule but amber on budget.",
  tip: "Timeline with bars, dependencies and milestones = Gantt chart. Visual workflow columns with WIP limits = Kanban board. At-a-glance health for executives = dashboard.",
  check: [
   ["What does a diamond usually represent on a Gantt chart?", "A milestone, which has zero duration."],
   ["Why do IT projects often track defects in a ticketing system?", "It gives each defect an owner, severity, status and history, providing traceability and an audit trail."]
  ]
 },
 {
  t: "Collaboration tools: real-time vs asynchronous communication, shared workspaces, file sharing and document version control",
  body: [
   "Modern project teams are often spread across offices, homes and time zones, so collaboration tools are central to getting work done. Project+ groups them by how they are used rather than by product names. Real-time (synchronous) tools include video conferencing, voice calls, screen sharing, virtual whiteboards used live and instant chat conversations. They are best for discussions, workshops, decisions, troubleshooting together and sensitive conversations.",
   "Asynchronous tools let people contribute on their own schedule: email, discussion threads or channels, shared documents with comments, wikis and knowledge bases, recorded meetings and project boards. They create a written record, respect time zones and reduce meeting load, but they can be slower for decisions and are easy to overlook if there are too many channels. A team charter or communication plan should say which tool is used for what, for example 'decisions are recorded in the project wiki, urgent issues go to the on-call chat'.",
   "Shared workspaces and file sharing give everyone access to the same documents. The key risk is version confusion: two people editing different copies, or someone working from an outdated plan. Document version control addresses this. Cloud document platforms keep a version history and let you restore earlier versions. Formal documents use version numbers (1.0 for the approved baseline, 1.1 for a minor update) and a revision history table recording what changed, who changed it and when. Check-in and check-out features prevent two people editing at once. For source code, dedicated version control systems such as Git track every change.",
   "Security and access matter too. Apply least privilege to shared folders, use the organization's approved tools rather than personal accounts, avoid sharing sensitive data through public links and remove access when people leave the project. Consider accessibility (captions, screen readers) and cultural and language differences so everyone can participate fully."
  ],
  terms: [
   ["Real-time collaboration", "Tools used by participants at the same time, such as video calls and live whiteboards."],
   ["Asynchronous collaboration", "Tools that people use on their own schedule, such as email, threads and shared documents."],
   ["Version control", "Tracking document or code changes with versions and history so the current copy is clear and earlier ones can be restored."],
   ["Shared workspace", "A central location where the team stores, edits and finds project documents."]
  ],
  example: "Two analysts accidentally edit separate copies of the requirements document and the developers build from the wrong one. The project manager moves all documents into a shared workspace with version history, sets the approved baseline as version 1.0, adds a revision history table and asks the team to comment in the document instead of emailing attachments.",
  tip: "Time zones and written records point to asynchronous tools; complex or sensitive discussions point to real-time tools. Confusion over which document is current is solved by version control and a single shared repository.",
  check: [
   ["What information should a revision history table contain?", "The version number, date, author and a description of what changed."],
   ["Why should a team avoid sharing project files through personal accounts?", "They bypass the organization's security and access controls and the files can be lost or exposed."]
  ]
 },
 {
  t: "Quality charts: Pareto, histogram, run and control charts, scatter diagrams and fishbone (Ishikawa) diagrams",
  body: [
   "Quality tools help a team understand problems with data instead of opinions. The exam expects you to recognize which chart fits which question.",
   "A histogram is a bar chart showing how often values fall into ranges or categories, for example how many tickets took 0 to 1 hour, 1 to 2 hours and so on. It shows the distribution and shape of data. A Pareto chart is a special histogram sorted from most to least frequent, with a line showing the cumulative percentage. It applies the Pareto principle, the idea that roughly 80 percent of problems come from 20 percent of causes, and tells you which few categories to fix first.",
   "A run chart plots a measure over time, such as defects found each week, to show trends and patterns. A control chart is a run chart with a center line (the mean) and upper and lower control limits calculated from the process data. Points outside the limits, or unusual patterns such as seven points in a row on one side of the mean, signal that the process may be out of control and should be investigated. Control limits describe what the process actually does; specification limits describe what the customer requires, and the two are different.",
   "A scatter diagram plots pairs of values for two variables to show whether they are related, such as response time against number of concurrent users. Points clustering along a rising line suggest a positive correlation; a falling line, a negative one; a random cloud, none. Correlation does not prove causation, but it shows where to look.",
   "A fishbone diagram, also called an Ishikawa or cause-and-effect diagram, puts the problem at the head and possible causes along the bones, grouped into categories such as people, process, technology, materials, environment and measurement. It supports brainstorming and root cause analysis. The five whys technique, asking why repeatedly until the underlying cause appears, is often used with it. Flowcharts, which map the steps of a process, and checksheets, which tally occurrences, are also common quality tools."
  ],
  terms: [
   ["Pareto chart", "A sorted bar chart with a cumulative line that shows the few categories causing most problems."],
   ["Control chart", "A time-based chart with a mean and upper and lower control limits that shows whether a process is stable."],
   ["Scatter diagram", "A plot of paired values for two variables that shows whether they are correlated."],
   ["Fishbone (Ishikawa) diagram", "A cause-and-effect diagram grouping possible causes of a problem into categories."],
   ["Histogram", "A bar chart showing how often values fall into ranges or categories."]
  ],
  example: "After a new laptop build process launches, help desk tickets rise. A Pareto chart shows that driver problems and missing software cause 75 percent of them. The team holds a fishbone session and traces missing software to an outdated image checklist. A control chart of daily tickets then shows the process returning within its limits after the fix.",
  tip: "Rank the biggest causes = Pareto. Is the process stable over time within limits = control chart. Are two variables related = scatter. Brainstorm causes by category = fishbone. Distribution of values = histogram.",
  check: [
   ["Which chart shows whether a process is within its upper and lower limits over time?", "A control chart."],
   ["What does the cumulative line on a Pareto chart show?", "The running percentage of the total, so you can see how many categories account for, say, 80 percent of problems."]
  ]
 },
 {
  t: "Agile reporting: burndown and burnup charts, velocity charts and cumulative flow diagrams",
  body: [
   "Agile teams use simple visual charts, often called information radiators, to show progress without heavy status reports. They are updated frequently, usually daily, from the team's board or tool.",
   "A burndown chart shows the work remaining (in story points, tasks or hours) on the vertical axis against time on the horizontal axis. An ideal line runs from the total at the start of the sprint to zero at the end. If the actual line is above the ideal line, more work remains than planned and the team is behind; if it is below, the team is ahead. A flat stretch means nothing is being completed, perhaps because of a blocker or because items are not being closed. A line that rises means work was added. Sprint burndowns track one sprint; release burndowns track remaining work across sprints.",
   "A burnup chart shows work completed rising over time, with a separate line for total scope. The gap between them is the remaining work. Because scope has its own line, a burnup makes scope changes visible: if stakeholders add stories, the scope line steps up. That makes burnups useful for conversations about scope growth and release dates.",
   "A velocity chart shows the story points completed in each sprint, often next to the points committed. Over several sprints it gives an average velocity for forecasting, such as 'at about 30 points per sprint, the remaining 150 points need about five sprints'. Velocity varies naturally, is specific to one team and should not be used to compare teams or as a productivity target, because that encourages inflating estimates.",
   "A cumulative flow diagram (CFD), common with Kanban, shows the number of items in each workflow state over time as stacked bands. Widening bands reveal bottlenecks, for example a growing Review band means work is waiting for review. The horizontal distance across the bands approximates lead time, and the vertical thickness shows work in progress."
  ],
  terms: [
   ["Burndown chart", "A chart of work remaining over time compared with an ideal line toward zero."],
   ["Burnup chart", "A chart of work completed over time with a separate total-scope line."],
   ["Velocity chart", "A chart of story points completed per sprint, used to forecast future sprints."],
   ["Cumulative flow diagram", "A stacked area chart of items in each workflow state over time that reveals bottlenecks."]
  ],
  example: "On day 6 of a 10-day sprint, the burndown shows 40 points left against an ideal of 24, so the team is behind. The scrum master learns two stories are blocked by a missing API key. Meanwhile, the release burnup shows the scope line rising twice in a month, which the product owner uses to explain to stakeholders why the release date is moving.",
  tip: "Burndown: actual above ideal = behind. Burnup: best for seeing scope changes. Velocity: forecasting for one team, not comparing teams. CFD: widening band = bottleneck.",
  check: [
   ["A burndown line goes up on day 4. What probably happened?", "Work was added to the sprint or estimates were increased."],
   ["Which chart best shows stakeholders that scope growth is delaying a release?", "A burnup chart, because it has a separate total-scope line."]
  ]
 },
 {
  t: "Earned value management: PV, EV, AC, CV, SV, CPI, SPI, EAC and ETC, and interpreting the results",
  body: [
   "Earned value management (EVM) combines scope, schedule and cost into one set of measures, so you can tell not just how much has been spent but whether the spending bought the planned progress. It needs three numbers at a point in time. Planned value (PV) is the budgeted cost of the work scheduled to be done by now. Earned value (EV) is the budgeted cost of the work actually completed. Actual cost (AC) is what was really spent on that work. Budget at completion (BAC) is the total planned budget.",
   "Variances show the size of a problem in money. Cost variance CV = EV - AC. Schedule variance SV = EV - PV. Negative means bad: over budget or behind schedule. Positive means good. Performance indexes show efficiency as a ratio. Cost performance index CPI = EV / AC. Schedule performance index SPI = EV / PV. Above 1 is good, 1 is on plan and below 1 is bad. A CPI of 0.8 means you get 80 cents of value for every dollar spent.",
   "Forecasts estimate the end result. Estimate at completion (EAC) is the expected total cost. If current cost performance is expected to continue, EAC = BAC / CPI. If the variance was a one-time event and the rest will go to plan, EAC = AC + (BAC - EV). Estimate to complete (ETC) is how much more money is needed: ETC = EAC - AC. Variance at completion VAC = BAC - EAC shows the expected overrun or underrun. To-complete performance index (TCPI) is the efficiency needed on the remaining work to meet a target.",
   "Work an example. BAC is $200,000. At month 4, PV is $100,000, EV is $80,000 and AC is $100,000. CV = 80,000 - 100,000 = -$20,000 and CPI = 0.8, so the project is over budget. SV = 80,000 - 100,000 = -$20,000 and SPI = 0.8, so it is behind schedule. EAC = 200,000 / 0.8 = $250,000, ETC = 250,000 - 100,000 = $150,000 and VAC = -$50,000. Always start with EV: it appears in every variance and index, and it is the value of work done, never money spent."
  ],
  terms: [
   ["Earned value (EV)", "The budgeted value of the work actually completed to date."],
   ["Planned value (PV)", "The budgeted value of the work scheduled to be completed to date."],
   ["Actual cost (AC)", "The money actually spent on the work completed to date."],
   ["Cost performance index (CPI)", "EV / AC; below 1 means over budget."],
   ["Estimate at completion (EAC)", "The forecast total cost of the project, often BAC / CPI."]
  ],
  example: "A migration project's report shows PV $60,000, EV $66,000 and AC $55,000. SPI = 1.1 (ahead of schedule) and CPI = 1.2 (under budget). The project manager reports good performance but checks that the cost savings are real and not just unbilled vendor invoices.",
  tip: "Every formula starts with EV. Variances subtract (EV - AC, EV - PV); indexes divide (EV / AC, EV / PV). Negative variance or index below 1 is bad. EAC with continuing performance = BAC / CPI.",
  check: [
   ["PV $50,000, EV $40,000, AC $45,000. Is the project over budget, behind schedule, or both?", "Both: CPI = 40 / 45 = 0.89 and SPI = 40 / 50 = 0.8."],
   ["BAC is $120,000 and CPI is 1.2. What is the EAC if performance continues?", "$100,000, because 120,000 / 1.2 = 100,000."]
  ]
 },
 {
  t: "Core project documents: project management plan, schedule, RACI, risk register, issue log, change log and assumption log",
  body: [
   "Project+ expects you to know which document holds which information, because many questions describe a need and ask where to look or what to update. Documents fall into two broad groups: plans that describe how the project will be run, and logs and registers that track what is happening.",
   "The project management plan brings together the baselines (scope, schedule, cost) and subsidiary plans (communication, risk, quality, procurement, change management and so on). The project schedule lists activities with dates, durations, dependencies and resources and is often shown as a Gantt chart or milestone list. The RACI chart, a type of responsibility assignment matrix, shows who is Responsible, Accountable, Consulted and Informed for each deliverable or task. The charter, business case, scope statement, WBS and WBS dictionary also belong in the core set.",
   "The working logs are updated throughout the project. The risk register lists each risk with probability, impact, score, owner, trigger and response. The issue log records current problems with priority, owner, due date, actions and status. The change log records every change request with its description, requester, date, impact, decision and status. The assumption log records assumptions and constraints and whether each has been validated; an assumption proven false often becomes a risk or issue. The stakeholder register lists stakeholders and their interests and influence. The lessons learned register captures insights throughout the project, not only at the end. Some organizations also keep a decision log so it is clear who decided what and why.",
   "Keep the documents consistent: an approved change should update the change log, the affected baselines and the schedule; a risk that occurs should update the risk register and create an entry in the issue log. Store them in a shared repository with version control and access appropriate to their sensitivity."
  ],
  terms: [
   ["Issue log", "A record of current problems with owners, priorities, due dates and status."],
   ["Change log", "A record of all change requests, their impact, decisions and status."],
   ["Assumption log", "A record of project assumptions and constraints and whether each has been validated."],
   ["Project schedule", "The list of activities with dates, durations, dependencies and resources, often shown as a Gantt chart."]
  ],
  example: "An auditor asks why the go-live moved from May to June. The project manager opens the change log to show the approved change request and its CCB decision, the updated schedule baseline showing the new date, and the issue log entry for the delayed vendor delivery that triggered the change.",
  tip: "Future uncertainty = risk register. Current problem = issue log. Requested modification = change log. Unproven belief = assumption log. Who owns a task = RACI.",
  check: [
   ["An assumption turns out to be false and is now blocking work. Which documents should be updated?", "The assumption log, and the issue log (and the risk register if related risks change)."],
   ["Where would you find the decision made on last month's request to add a reporting module?", "In the change log."]
  ]
 },
 {
  t: "Meeting and status documentation: agendas, minutes, action items, status reports and executive summaries",
  body: [
   "A large part of a project manager's job is keeping everyone informed, and much of that happens through meetings and reports. Good documentation makes meetings shorter and decisions clearer.",
   "An agenda is sent before a meeting. It states the purpose, date and time, location or link, attendees, topics with time allocations and any pre-reading. It lets people prepare and helps the facilitator keep the meeting on track. Meeting minutes are sent after the meeting. They record attendees, key discussion points, decisions made and action items. An action item is a specific task with a single owner and a due date, such as 'Priya to confirm the switch delivery date with the vendor by Thursday'. Action items are tracked, often in an action item log, until closed, and open ones are reviewed at the next meeting.",
   "Status reports summarize progress for a period. A typical report includes overall status (often red, amber or green), accomplishments since the last report, planned work for the next period, schedule and budget status, milestones, top risks and issues, changes and decisions needed. Keep it honest and specific. Status meetings review the same information interactively and are a good place to address blockers.",
   "Executive summaries and dashboards are tailored for senior leaders, who have little time and need the big picture: are we on track, what are the main risks and what do you need from me? One page or one screen is ideal, with detail available on request. Different audiences need different reports: the team wants task detail, the sponsor wants status and decisions, and end users want to know what changes for them and when. The communication plan defines who gets which report and how often.",
   "Other useful records include a decision log, a meeting schedule and a project calendar, and sign-in or attendance records for formal reviews such as phase gates."
  ],
  terms: [
   ["Agenda", "A document sent before a meeting listing its purpose, topics, time allocations and attendees."],
   ["Meeting minutes", "The written record of a meeting's attendees, discussion, decisions and action items."],
   ["Action item", "A specific task arising from a meeting, with one owner and a due date."],
   ["Status report", "A periodic summary of progress, schedule and budget status, risks, issues and next steps."],
   ["Executive summary", "A brief, high-level overview for senior leaders focused on status, risks and decisions needed."]
  ],
  example: "Every Friday the project manager sends a one-page status report: overall status amber, three milestones met, one vendor delay logged as an issue, budget 4 percent under plan, and one decision needed from the sponsor on a training date. The same afternoon she sends minutes from the design review listing two decisions and five action items with owners and dates.",
  tip: "Before the meeting = agenda; after the meeting = minutes with decisions and action items. Executives get summaries or dashboards, not raw logs. Every action item needs one owner and a due date.",
  check: [
   ["What three things should every action item include?", "A clear task, a single owner and a due date."],
   ["What is the main purpose of an agenda?", "To tell attendees the meeting's purpose and topics in advance so they can prepare and the meeting stays focused."]
  ]
 },
 {
  t: "Vendor and procurement documents: NDA, MOU, SLA, SOW, purchase orders, invoices and change orders",
  body: [
   "IT projects rarely deliver everything with internal staff, so project managers regularly handle vendor documents. Knowing what each one does helps you pick the right tool and protect the organization.",
   "A non-disclosure agreement (NDA) is a legal contract in which one or both parties agree to keep shared information confidential. It is signed before sharing designs, network details, source code or business plans with a vendor, often during evaluation. A memorandum of understanding (MOU) records the intent of two or more parties to work together and their general responsibilities. It is usually not legally binding in the way a contract is, and it is common between departments, universities or partner organizations. A memorandum of agreement (MOA) is similar but more specific.",
   "A statement of work (SOW) defines the work a vendor will perform: scope, deliverables, schedule, location, acceptance criteria, standards and reporting. It becomes part of the contract. A service level agreement (SLA) defines measurable service levels for an ongoing service, such as 99.9 percent availability, response and resolution times by severity, and the remedies, often service credits, if they are missed. A master services agreement (MSA) sets general legal terms for a long-term relationship, with individual SOWs for each project. An operating level agreement (OLA) is an internal agreement between teams supporting an SLA.",
   "A purchase order (PO) is the buyer's formal document authorizing a purchase, listing items, quantities, prices and terms; once accepted by the vendor it is binding. An invoice is the vendor's request for payment. The project manager or finance team matches it against the PO and confirmation that goods or services were received and accepted, often called a three-way match, before approving payment. A change order is a formal amendment to a contract or PO that changes scope, price or schedule; it follows the project's change control and must be signed by both parties. Warranties, licensing agreements and end-user license agreements (EULAs) may also be part of a project's vendor paperwork."
  ],
  terms: [
   ["Non-disclosure agreement (NDA)", "A contract that legally requires parties to keep shared information confidential."],
   ["Memorandum of understanding (MOU)", "A document stating the intent of parties to cooperate, usually not legally binding like a contract."],
   ["Service level agreement (SLA)", "An agreement defining measurable service levels, such as uptime and response times, and remedies if they are missed."],
   ["Purchase order (PO)", "The buyer's formal authorization to purchase specific items at agreed prices and terms."],
   ["Change order", "A signed amendment to a contract or PO that changes its scope, price or schedule."]
  ],
  example: "Before sharing its network diagrams, a company has three cloud vendors sign NDAs. It selects one, signs an MSA, an SOW for the migration project and an SLA guaranteeing 99.9 percent availability with credits for misses. When it later needs 20 more virtual desktops, a change order updates the price and scope, and the new invoices are matched against the amended PO before payment.",
  tip: "Confidentiality = NDA; intent to cooperate, non-binding = MOU; measurable service targets = SLA; work to be performed = SOW; authorization to buy = PO; contract amendment = change order.",
  check: [
   ["A vendor misses the agreed four-hour response time for a critical incident. Which document sets the remedy?", "The SLA."],
   ["What should an invoice be matched against before payment?", "The purchase order and confirmation that the goods or services were received and accepted."]
  ]
 },
 {
  t: "Decision-making tools: SWOT, cost-benefit analysis, decision trees and expected monetary value, brainstorming and root cause analysis",
  body: [
   "Projects involve constant decisions, and structured tools make them more objective and easier to explain. SWOT analysis lists Strengths and Weaknesses (internal to the organization or project) and Opportunities and Threats (external). It is useful in discovery for evaluating an idea and in risk identification, since weaknesses and threats suggest risks and opportunities suggest positive risks.",
   "Cost-benefit analysis compares the total expected costs of an option with its expected benefits, including tangible ones like reduced labor and intangible ones like better customer satisfaction. It supports business cases, make-or-buy decisions and change requests. Weighted scoring models or decision matrices go further by scoring options against several criteria, each with a weight, which is common in vendor selection.",
   "Expected monetary value (EMV) is probability multiplied by impact. A risk with a 20 percent chance of costing $50,000 has an EMV of -$10,000; an opportunity with a 30 percent chance of saving $20,000 has an EMV of +$6,000. A decision tree maps a decision, its options and the uncertain outcomes of each, with probabilities and values on the branches. You calculate the EMV of each option, including its cost, and choose the best. For example, option A costs $40,000 with a 10 percent chance of a $100,000 failure (expected total $50,000), while option B costs $55,000 with no failure risk; A has the lower expected cost.",
   "Brainstorming generates many ideas quickly in a group without criticizing them at first; the nominal group technique adds silent idea generation and voting so quieter members contribute, and the Delphi technique collects anonymous expert opinions over several rounds to reach consensus without group pressure. Root cause analysis finds the underlying reason for a problem rather than the symptom. Techniques include the five whys, fishbone diagrams and Pareto analysis. Fixing the root cause prevents recurrence, while fixing the symptom often means the problem returns."
  ],
  terms: [
   ["SWOT analysis", "A review of internal strengths and weaknesses and external opportunities and threats."],
   ["Expected monetary value (EMV)", "Probability multiplied by impact, used to compare risks and options."],
   ["Decision tree", "A diagram of choices and uncertain outcomes with probabilities and values, used to pick the option with the best expected value."],
   ["Root cause analysis", "Techniques, such as the five whys, that find the underlying cause of a problem."],
   ["Delphi technique", "Gathering anonymous expert opinions over several rounds to reach consensus."]
  ],
  example: "A team must choose between upgrading an old storage array or buying a new one. A decision tree shows the upgrade costs $30,000 with a 40 percent chance of a $50,000 failure (expected $50,000), while replacement costs $45,000 with little risk. The team chooses replacement and records the analysis in the decision log.",
  tip: "EMV = probability x impact. In decision trees, add each option's cost to its expected risk cost and pick the lowest total (or highest value). Delphi = anonymous experts; five whys and fishbone = root cause.",
  check: [
   ["A risk has a 25 percent chance of costing $40,000. What is its EMV?", "$10,000 (as a negative value, since it is a threat)."],
   ["In SWOT, which two factors are external?", "Opportunities and threats."]
  ]
 },
 {
  t: "Security concepts for IT projects: CIA triad, least privilege, access reviews and building security requirements in from the start",
  body: [
   "Every IT project touches security, even when security is not its goal. A new app may store personal data, a network upgrade may open new paths into the company, and a vendor may need access to internal systems. Project+ does not expect deep technical security skills, but it does expect a project manager to recognize security needs and involve the right people early.",
   "The CIA triad summarizes what security protects. Confidentiality means only authorized people can see information, achieved with access controls and encryption. Integrity means information is accurate and not altered without authorization, supported by hashing, change control and audit logs. Availability means systems and data are there when needed, supported by redundancy, backups and capacity planning. A project's requirements should state which of these matter most; a public website may prioritize availability and integrity, while an HR system prioritizes confidentiality.",
   "Least privilege means people and systems get only the access they need to do their job, for only as long as they need it. On projects, this applies to team members, contractors and service accounts: request specific, time-limited access, avoid shared accounts so actions can be traced to individuals, and remove access when the work ends. Access reviews periodically confirm that each person's access is still appropriate. Separation of duties, such as the person who writes code not being the only one who approves its deployment, reduces the risk of errors and fraud. Multifactor authentication should protect administrative and remote access.",
   "Building security in from the start (often called security by design or shifting left) is far cheaper than bolting it on later. Include the security team in requirements gathering, write security and compliance requirements alongside functional ones, plan time for security reviews, vulnerability scanning and penetration testing by authorized testers, and include security sign-off in go-live criteria. Vendors should be assessed for their security practices before contracts are signed. Security incidents during the project, such as a lost laptop with project data, must be reported through the organization's incident process."
  ],
  terms: [
   ["CIA triad", "Confidentiality, integrity and availability, the three core goals of information security."],
   ["Least privilege", "Granting only the minimum access needed, for only as long as it is needed."],
   ["Access review", "A periodic check that each user's access is still appropriate for their role."],
   ["Separation of duties", "Splitting critical tasks among different people so no one person can complete them alone."]
  ],
  example: "A project to launch a customer portal includes the security architect in the first requirements workshop. Requirements include MFA for customers, encryption of stored data and logging of administrative actions. Contractors receive named accounts with access to the test environment only, expiring at the end of their contracts, and go-live requires a clean vulnerability scan and security sign-off.",
  tip: "When a question asks what access to give a contractor or team member, choose the narrowest, time-limited, individually named option. Security requirements belong in planning, not after testing.",
  check: [
   ["A payment outage harms which part of the CIA triad?", "Availability."],
   ["Why avoid shared project accounts?", "Actions cannot be traced to an individual, which weakens accountability and makes access hard to revoke."]
  ]
 },
 {
  t: "Data privacy and compliance: PII, PHI, data classification, retention, GDPR, HIPAA, PCI DSS and audits",
  body: [
   "Many IT projects collect, move or store data about people, and that brings legal and contractual obligations. Personally identifiable information (PII) is any information that can identify a person, alone or combined with other data: names, addresses, government ID numbers, email addresses, dates of birth and so on. Protected health information (PHI) is health-related information linked to an individual, such as diagnoses and treatment records. Cardholder data includes payment card numbers and related details.",
   "Several regulations and standards appear on the exam. The General Data Protection Regulation (GDPR) is an EU law that applies to organizations processing personal data of people in the EU, wherever the organization is located. It requires a lawful basis for processing, data minimization, transparency, rights such as access and erasure, and breach notification. The Health Insurance Portability and Accountability Act (HIPAA) is a U.S. law protecting PHI handled by healthcare providers, insurers and their business associates. The Payment Card Industry Data Security Standard (PCI DSS) is an industry standard, enforced through contracts with card brands and banks, for anyone who stores, processes or transmits cardholder data. Other examples include state privacy laws and sector rules for finance or government; the key skill is recognizing that regulated data drives requirements.",
   "Data classification labels data by sensitivity so the right controls are applied, commonly public, internal, confidential and restricted or regulated. Classification drives encryption, access, sharing rules and where data may be stored, including whether it can go to a particular cloud region. Data retention policies say how long records must be kept and when they must be securely deleted; project documents and migrated data must follow them, and legal holds can override normal deletion. Data sovereignty or residency rules may require that data stay in a particular country.",
   "Audits check compliance. Projects should plan for audit requirements from the start: keep evidence of approvals, testing and access decisions, and involve the compliance or privacy team. A privacy impact assessment early in the project identifies privacy risks. Using real personal data in test environments is a common mistake; masked or synthetic data is safer."
  ],
  terms: [
   ["PII", "Personally identifiable information: data that can identify an individual."],
   ["PHI", "Protected health information: health data linked to an individual, protected in the U.S. by HIPAA."],
   ["GDPR", "The EU regulation governing the processing of personal data of people in the EU."],
   ["PCI DSS", "The payment card industry standard for protecting cardholder data."],
   ["Data retention policy", "Rules for how long data must be kept and when it must be securely disposed of."]
  ],
  example: "A clinic chain migrates patient records to a new cloud system. The project classifies the records as PHI, confirms the vendor will sign a HIPAA business associate agreement, requires encryption in transit and at rest, uses masked data in the test environment and keeps evidence of access approvals for the auditors.",
  tip: "Health records = PHI and HIPAA. Card numbers = PCI DSS. Personal data of people in the EU = GDPR, even if the company is elsewhere. Test with masked data, not real personal data.",
  check: [
   ["A U.S. company collects email addresses from customers in Spain. Which regulation applies?", "GDPR, because it covers personal data of people in the EU."],
   ["Why classify data at the start of a project?", "Classification determines the security, storage, sharing and retention controls the project must build in."]
  ]
 },
 {
  t: "IT infrastructure basics: servers, networks, storage and endpoints, and how infrastructure changes affect projects",
  body: [
   "A project manager does not need to configure a router, but they do need to understand the parts of IT infrastructure well enough to plan work, ask the right questions and see how changes ripple across the organization.",
   "Servers provide services such as email, file storage, databases and applications. They may be physical machines, virtual machines running on a hypervisor, or cloud instances. Networks connect everything: local area networks (LANs) inside buildings, wide area networks (WANs) between sites, wireless networks, firewalls that filter traffic, and internet connections. Storage holds data: disks inside servers, network-attached storage (NAS) shared over the network, storage area networks (SANs) for high-performance block storage, and cloud object storage. Endpoints are the devices people use: desktops, laptops, phones, tablets and printers. Supporting services such as directory services (for accounts and authentication), DNS and DHCP tie them together.",
   "Infrastructure changes affect projects in several ways. They often require downtime, so they must be scheduled in maintenance windows and approved through operational change management. They create dependencies: a new application cannot go live until the servers, network rules and accounts exist. Capacity matters: a new video system may need more bandwidth, and a data migration needs enough storage and time to copy the data. Compatibility issues arise when older systems cannot run new software, and end-of-life hardware or software may force a project to happen. Hardware has lead times for ordering and shipping, which belong in the schedule.",
   "Other practical considerations include licensing (per user, per device or per core), vendor support contracts, monitoring so operations can see problems, documentation such as network diagrams and asset inventories, and the impact on users: new devices need imaging, training and help desk readiness. Asking infrastructure teams early about capacity, lead times and change windows prevents many late surprises."
  ],
  terms: [
   ["Server", "A physical or virtual computer that provides services such as applications, files or databases."],
   ["Endpoint", "A user device such as a laptop, desktop, phone or printer that connects to the network."],
   ["Storage area network (SAN)", "A dedicated high-speed network that provides block-level storage to servers."],
   ["Lead time", "The time between ordering an item and receiving it, which must be planned in the schedule."]
  ],
  example: "A project to deploy a new video training platform discovers late that branch offices have limited WAN bandwidth. After consulting the network team, the project adds a work package to upgrade two branch links, orders equipment with a six-week lead time, and schedules the cutover in the network team's Saturday maintenance window.",
  tip: "Infrastructure questions usually test impact: downtime needs a maintenance window and change approval, new systems create dependencies and capacity needs, and hardware lead times belong in the schedule.",
  check: [
   ["Why should hardware lead times appear in the project schedule?", "Because ordering and shipping can take weeks, and dependent work cannot start until the hardware arrives."],
   ["Name two ways an infrastructure change can affect users.", "Downtime during the change, new devices or procedures to learn, performance changes, or compatibility issues (any two)."]
  ]
 },
 {
  t: "Cloud and deployment models: on-premises, IaaS, PaaS, SaaS, public, private and hybrid cloud, and their trade-offs",
  body: [
   "Many projects today involve the cloud, either moving existing systems there or adopting new cloud services. The choice of model changes the work, the costs, the risks and who is responsible for what.",
   "On-premises means the organization owns and runs the hardware and software in its own facilities. It offers maximum control but requires capital spending, staff, space, power and cooling, and it takes time to add capacity. Cloud service models share the work with a provider. In infrastructure as a service (IaaS), the provider supplies virtual machines, storage and networking; the customer manages the operating system, middleware, applications and data. In platform as a service (PaaS), the provider also manages the OS and runtime, and the customer deploys code and manages data. In software as a service (SaaS), the provider runs the whole application; the customer configures it and manages users and data. This division is often called the shared responsibility model: the customer is always responsible for its data and user access.",
   "Deployment models describe who uses the cloud. A public cloud is run by a provider for many customers over the internet. A private cloud is dedicated to one organization, either on-premises or hosted. A hybrid cloud combines on-premises or private resources with public cloud, often connected so workloads and data can move between them. A community cloud is shared by organizations with common requirements, such as government agencies. Multicloud means using services from more than one provider.",
   "For a project manager, the trade-offs show up in several places. Costs shift from capital expense to operating expense, paid monthly by usage or subscription, so budgets must include ongoing fees and a plan to control them. Speed usually improves because resources can be provisioned in minutes. Risks include vendor lock-in, data residency and compliance, reliance on internet connectivity and changes in the provider's service. SaaS projects focus on configuration, integration, data migration and training rather than building. Contracts and SLAs with the provider become key documents, and exit plans should be considered from the start."
  ],
  terms: [
   ["IaaS", "Infrastructure as a service: the provider supplies virtual machines, storage and networking; the customer manages the OS and above."],
   ["PaaS", "Platform as a service: the provider manages infrastructure, OS and runtime; the customer manages its code and data."],
   ["SaaS", "Software as a service: the provider runs the entire application; the customer configures it and manages users and data."],
   ["Hybrid cloud", "A combination of on-premises or private resources with public cloud services."],
   ["Shared responsibility model", "The split of security and management duties between the cloud provider and the customer."]
  ],
  example: "A company replaces its on-premises email servers with a SaaS email service. The project no longer includes buying servers or patching; instead it covers migrating mailboxes, configuring security settings, integrating the directory, training users and budgeting for a monthly per-user subscription. A legacy accounting system that needs a specific OS moves to IaaS virtual machines instead.",
  tip: "Least customer management = SaaS; control of OS = IaaS; deploy your own code without managing servers = PaaS. Cloud moves spending from CapEx to OpEx, and the customer always remains responsible for its data and access.",
  check: [
   ["A team wants to deploy its own web app without managing servers or the OS. Which model fits?", "PaaS."],
   ["What is a hybrid cloud?", "A mix of on-premises or private cloud resources with public cloud services, typically connected to work together."]
  ]
 },
 {
  t: "Software development life cycle and DevOps: CI/CD, development, test, staging and production environments, and release management",
  body: [
   "When a project builds or changes software, it follows a software development life cycle (SDLC). A common form has these phases: planning, requirements analysis, design, development (coding), testing, deployment and maintenance. The SDLC can be run in a waterfall style, with each phase completed before the next, or iteratively and incrementally as in agile, where every sprint includes a little of each phase.",
   "Software moves through separate environments to protect live users. The development environment is where developers write and unit test code. The test or QA environment is where testers run functional, integration and regression tests. The staging (pre-production) environment mirrors production as closely as possible and is used for final validation, performance testing and user acceptance testing (UAT). Production is the live environment used by real users with real data. Keeping these separate prevents untested changes from breaking the business, and access to production should be tightly controlled. Test environments should use masked or synthetic data, not real personal data.",
   "DevOps is a culture and set of practices that brings development and operations together to deliver changes faster and more reliably. Continuous integration (CI) means developers merge code into a shared repository frequently, and each merge triggers an automated build and tests, so problems are caught early. Continuous delivery means every change that passes the pipeline is ready to release with a manual approval; continuous deployment releases it automatically. Infrastructure as code, automated monitoring and fast feedback loops are other DevOps practices. DevSecOps adds security into the pipeline, for example automated code and dependency scanning.",
   "Release management plans and controls how changes reach production: what goes into each release, its version number, release notes, deployment schedule, go/no-go decision, communication to users and rollback plan. Even with automation, production releases usually still pass through the organization's change management process. Deployment strategies such as phased rollouts, pilots and blue-green deployments (switching traffic between two identical environments) reduce risk."
  ],
  terms: [
   ["SDLC", "Software development life cycle: planning, requirements, design, development, testing, deployment and maintenance."],
   ["Continuous integration (CI)", "Merging code frequently with automated builds and tests on every change."],
   ["Staging environment", "A pre-production environment that mirrors production for final testing and UAT."],
   ["Release management", "Planning, scheduling and controlling the deployment of software releases to production."],
   ["DevSecOps", "DevOps practices with security built into the pipeline and every stage of delivery."]
  ],
  example: "A team building a booking app runs a CI pipeline that builds and tests every commit. Passing builds deploy automatically to the test environment. At the end of each sprint, a release candidate goes to staging, where business users perform UAT. After the change advisory board approves, the release is deployed to production on Tuesday evening with release notes and a rollback plan.",
  tip: "UAT happens in staging or test, never first in production. CI = automated build and test on every commit. Automated pipelines still follow change management for production releases.",
  check: [
   ["What is the difference between continuous delivery and continuous deployment?", "Continuous delivery keeps every passing change ready to release with a manual approval; continuous deployment releases it to production automatically."],
   ["Why should staging mirror production closely?", "So tests and UAT reveal the same problems that would occur in production, without affecting live users."]
  ]
 },
 {
  t: "Operational change management: change advisory board, maintenance windows, change freezes, rollback plans and downtime",
  body: [
   "Project change control manages changes to the project's plan. Operational change management manages changes to the organization's live IT environment, whether they come from projects or daily operations. Projects that deploy anything into production must follow it, and ignoring it is a quick way to cause outages and lose trust.",
   "A change request for production typically includes a description and reason, affected systems and users, risk and impact assessment, implementation steps, a test plan, the proposed schedule, a rollback (backout) plan, a communication plan and the people responsible. The change advisory board (CAB) reviews significant changes, looking at risk, conflicts with other changes and timing, and approves, rejects or asks for more information. Changes are often categorized: standard changes are low-risk, pre-approved and repeatable (such as adding a user to a group); normal changes go through the full review; emergency changes are urgent and use an expedited process, often an emergency CAB, with documentation completed afterward.",
   "Maintenance windows are agreed periods, often nights or weekends, when changes with potential downtime can be made with the least business impact. Users should be notified in advance of planned downtime, with the expected duration and who to contact. A change freeze (or blackout period) blocks non-emergency changes during critical times such as year-end financial close, peak retail seasons or major events. Project schedules must be built around freezes; a go-live cannot simply be squeezed in.",
   "Every production change needs a rollback plan: the steps to restore the previous working state if the change fails, and the criteria for deciding to roll back, such as 'if validation tests fail by 2 a.m.'. Backups or snapshots are taken before the change. After implementation, the change is validated, users are informed and the change record is closed, sometimes with a post-implementation review. A failed change becomes an incident and a lesson learned."
  ],
  terms: [
   ["Change advisory board (CAB)", "The group that reviews and approves changes to the production IT environment."],
   ["Maintenance window", "An agreed time period for making changes that may cause downtime, chosen to minimize business impact."],
   ["Change freeze", "A period when non-emergency changes to production are not allowed."],
   ["Rollback (backout) plan", "The steps to return a system to its previous state if a change fails."],
   ["Standard change", "A low-risk, pre-approved, repeatable change that does not need individual CAB review."]
  ],
  example: "A project needs to upgrade the database behind the order system. The change request lists a two-hour outage, a full backup beforehand and a rollback plan to restore it if validation fails. The CAB approves it for the Sunday 1 a.m. maintenance window, but only after moving it out of the December change freeze. Customers see a banner about the planned downtime a week in advance.",
  tip: "Production changes need CAB approval, a maintenance window, user notification and a rollback plan. During a change freeze, non-urgent project work waits; do not relabel it as an emergency.",
  check: [
   ["What should a rollback plan include?", "The steps to restore the previous state, the backup or snapshot to use and the criteria and time for deciding to roll back."],
   ["What is a standard change?", "A low-risk, pre-approved, repeatable change that can be made without individual CAB review."]
  ]
 },
 {
  t: "Physical and environmental considerations: facility access, power and cooling, asset tracking and secure disposal",
  body: [
   "IT projects do not happen only in software. Office moves, data center work, new network closets and hardware refreshes all involve physical spaces, and those bring their own planning needs, risks and dependencies on facilities teams and landlords.",
   "Facility access must be planned. Contractors and team members may need badges, escorts or visitor logs to enter server rooms and data centers, and access should be limited to those who need it and removed when the work ends. Physical security controls such as locked racks, cameras and mantraps protect equipment. Work in shared buildings may need landlord approval, and some work, such as drilling or cabling, may have to happen outside business hours.",
   "Power and cooling are easy to overlook. New equipment adds electrical load and heat. The project should confirm that circuits, uninterruptible power supplies (UPS), power distribution units (PDUs) and generators can support it, and that cooling can remove the extra heat. Environmental monitoring for temperature, humidity and water leaks, and appropriate fire suppression, protect the investment. Rack space, weight limits and cable management also need planning, often with a rack diagram.",
   "Asset tracking keeps an accurate inventory of hardware and software: what was bought, where it is, who has it, its serial number, warranty and license details. New equipment is tagged and recorded when received; moved equipment is updated. Accurate records support budgeting, support contracts, audits and security.",
   "Secure disposal applies when old equipment is retired. Drives and other media that held data must be sanitized using approved wiping methods, degaussed or physically destroyed, depending on the media and the data's sensitivity. A certificate of destruction or sanitization, often from a certified vendor, provides evidence for audits. Simply deleting files or reformatting a drive can leave recoverable data. Environmental rules for electronic waste also apply, so use approved recyclers. Update the asset inventory when items are disposed of, and consider license transfers or cancellations for retired software."
  ],
  terms: [
   ["UPS", "Uninterruptible power supply: a battery system that keeps equipment running briefly during power loss."],
   ["Asset inventory", "A record of hardware and software assets with location, owner, serial numbers, warranties and licenses."],
   ["Media sanitization", "Removing data from storage media so it cannot be recovered, by wiping, degaussing or destruction."],
   ["Certificate of destruction", "Documentation proving that media or equipment was securely destroyed."]
  ],
  example: "A project replacing a company's server room finds the existing UPS cannot support the new blade chassis. The project adds a UPS upgrade to the plan, arranges escorted after-hours access for the cabling vendor, tags every new device into the asset inventory, and sends the old drives to a certified vendor for shredding, filing the certificates of destruction with the project records.",
  tip: "Old drives with sensitive data need sanitization or destruction with documentation; reformatting is not enough. New hardware may need more power, cooling and rack space, which belong in the plan.",
  check: [
   ["Why is reformatting a drive not enough before disposal?", "Data can often still be recovered after reformatting; approved sanitization or destruction is needed."],
   ["What should happen to the asset inventory when equipment is retired?", "It should be updated to record the disposal, with the destruction evidence."]
  ]
 },
 {
  t: "Governance: PMO standards, phase gate reviews, organizational change management, training and user adoption",
  body: [
   "Governance is the framework of rules, roles and decision processes that make sure projects stay aligned with organizational goals and are run consistently. It answers questions such as who can approve spending, what documents every project needs and when a project must be reviewed before continuing.",
   "The project management office (PMO) often leads project governance. Depending on the organization, a PMO may be supportive (providing templates, training and best practices), controlling (requiring compliance with standards and reviewing projects) or directive (managing projects directly). PMO standards might require a charter template, a risk register, weekly status reports in a set format and a closure report. Governance also includes steering committees that oversee large projects or portfolios, and policies such as spending authority limits and procurement rules. Compliance with external rules, from regulators or auditors, sits within governance too.",
   "Phase gate reviews (also called stage gates, tollgates or kill points) are formal checkpoints at the end of a phase. A governance body reviews the project's progress, deliverables, business case, risks and readiness for the next phase, then decides to continue, continue with conditions, redo work or stop the project. Gates ensure money is not spent on projects that no longer make sense. In PRINCE2, similar reviews happen at the end of each management stage.",
   "Organizational change management (OCM) deals with the people side of change, which is different from project change control and from operational change management. A technically perfect system fails if people do not use it. OCM includes explaining why the change is happening, involving users early, identifying champions or super users in each department, addressing resistance, providing training at the right time and in the right format, and offering support after go-live. Models such as ADKAR (Awareness, Desire, Knowledge, Ability, Reinforcement) describe the stages people move through. Training can include classroom sessions, e-learning, quick reference guides and floor support. Adoption is measured with usage data, help desk tickets and surveys, and the project's success criteria should include it."
  ],
  terms: [
   ["Governance", "The framework of policies, roles and decision processes that directs and controls projects."],
   ["Phase gate review", "A formal checkpoint at the end of a phase where governance decides whether the project continues."],
   ["Organizational change management (OCM)", "Managing the people side of change so users understand, accept and adopt it."],
   ["Super user (champion)", "A trained user in a department who supports colleagues during and after a rollout."]
  ],
  example: "At the design phase gate for a new CRM, the steering committee sees that costs have risen but the business case still holds, and approves the build phase with a condition to cut one integration. Before go-live, the project trains two super users in each sales team, runs short workshops, publishes quick reference guides and tracks logins in the first month to spot teams that need extra help.",
  tip: "Three different 'change' ideas: project change control (changes to the plan), operational change management (changes to production, via the CAB) and organizational change management (helping people adopt the change). Low adoption points to OCM and training.",
  check: [
   ["What decisions can be made at a phase gate review?", "Continue, continue with conditions, redo work in the current phase, or stop the project."],
   ["Users resist a new system that works correctly. What should the project address?", "Organizational change management: communication, involvement, training and support to drive adoption."]
  ]
 },
 {
  t: "Business continuity for IT projects: backups, disaster recovery, RTO and RPO, and testing before go-live",
  body: [
   "When a project delivers a new system, the organization will soon depend on it. Business continuity planning makes sure the business can keep running if that system fails, and disaster recovery (DR) is the technical part: how IT restores systems and data after an outage, cyberattack or disaster. These requirements must be planned and tested during the project, not after go-live.",
   "Two metrics drive DR design. The recovery time objective (RTO) is the maximum acceptable time a system can be down before it must be restored, for example four hours. The recovery point objective (RPO) is the maximum acceptable amount of data loss, measured in time, for example one hour, which means backups or replication must happen at least every hour. Shorter RTOs and RPOs cost more, so they should be set by the business based on a business impact analysis. Related terms include mean time to repair (MTTR), the average time to fix a failure, and mean time between failures (MTBF), the average time a component runs before failing.",
   "Backups are the foundation. Common types are full (everything), incremental (changes since the last backup of any type) and differential (changes since the last full backup). Good practice includes keeping copies offsite or in a separate cloud region, protecting some copies from modification (immutable or offline backups help against ransomware) and, most importantly, testing restores regularly. A backup that has never been restored is not proven. Recovery sites range from hot sites (ready to take over almost immediately) to warm sites (partly equipped) to cold sites (space and power only), with cost rising as recovery time falls. Cloud services add options such as replication across regions.",
   "Before go-live, the project should confirm backups are running, test a restore, document recovery procedures, include the system in the DR plan and, where appropriate, run a failover test or tabletop exercise. Monitoring, support contacts and escalation procedures should be in place. These items belong in the transition plan and go-live checklist, and the go/no-go decision should consider them."
  ],
  terms: [
   ["Recovery time objective (RTO)", "The maximum acceptable time to restore a system after an outage."],
   ["Recovery point objective (RPO)", "The maximum acceptable data loss, measured in time, which drives backup frequency."],
   ["Hot site", "A fully equipped recovery site that can take over operations almost immediately."],
   ["Incremental backup", "A backup of data changed since the last backup of any type."],
   ["Business impact analysis", "An assessment of how disruption to processes and systems would affect the business, used to set RTO and RPO."]
  ],
  example: "A new order system has an RTO of two hours and an RPO of 15 minutes. The project configures database replication to a second region every few minutes, nightly full backups with immutable copies and a documented failover runbook. Two weeks before go-live, the team performs a restore test and a failover exercise, and both results are reviewed at the go/no-go meeting.",
  tip: "RPO = how much data you can lose (backup frequency). RTO = how long you can be down (restore speed). Untested backups are not reliable; restore testing belongs before go-live.",
  check: [
   ["The business can tolerate losing no more than 30 minutes of data. Which metric is this?", "The recovery point objective (RPO)."],
   ["Why test a restore before go-live?", "To prove that backups work and that the team can meet the RTO before the business depends on the system."]
  ]
 }
], { reviewed: "2026-09-25" });
