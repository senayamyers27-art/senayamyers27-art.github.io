/* Performance-based practice items for CompTIA Project+ (PK0-005). */
CertHub.addPbqs("project-plus", [
  { id: "critical-path-fill", d: 1, type: "fill", title: "Find the critical path and float",
    prompt: "Use the activity list for a branch office network rollout to fill in the values. Durations are in working days and all dependencies are finish-to-start.",
    context: "Activity | Duration | Predecessor(s)\nA  Site survey            | 4 | -\nB  Order and receive gear | 6 | A\nC  Run new cabling        | 3 | A\nD  Install patch panels   | 4 | C\nE  Stage and configure    | 2 | B\nF  Install and test       | 3 | D, E",
    fields: [
      { label: "Shortest possible project duration (days)", answers: ["15", "15 days"] },
      { label: "Critical path (activity letters in order, e.g. A-X-Y)", answers: ["A-B-E-F", "ABEF", "A B E F", "A,B,E,F", "A, B, E, F", "A>B>E>F", "A->B->E->F"] },
      { label: "Total float of activity C (days)", answers: ["1", "1 day"] }
    ],
    explain: "There are two paths: A-B-E-F = 4 + 6 + 2 + 3 = 15 days and A-C-D-F = 4 + 3 + 4 + 3 = 14 days. The longest path is the critical path and sets the minimum duration of 15 days. Activities C and D are on the 14-day path, so each can slip 15 - 14 = 1 day without delaying the project. Adding every duration (22 days) is a common mistake because it ignores work done in parallel." },

  { id: "risk-response-match", d: 1, type: "match", title: "Match risk scenarios to response strategies",
    prompt: "A data center migration team has planned a response for each risk. Match each planned action to the risk response strategy it represents.",
    pairs: [
      ["Buy transit insurance for servers being shipped to the new site", "Transfer"],
      ["Run two full rehearsal migrations in a test environment", "Mitigate"],
      ["Drop an untested storage product from scope and use the proven model", "Avoid"],
      ["Note a small chance of parking problems on move day and take no action", "Accept"],
      ["Assign the most experienced engineer so a task that could finish early does", "Exploit"]
    ],
    extra: ["Escalate", "Share"],
    explain: "Insurance shifts the financial impact to a third party (transfer). Rehearsals reduce the probability and impact of failure (mitigate). Removing the risky product removes the threat entirely (avoid). A low-priority risk left without action is accepted and watched on the register. Making sure an opportunity happens is exploit, a positive-risk response; share would give part of the opportunity to a partner, and escalate hands a risk outside the project's authority to someone else." },

  { id: "change-control-order", d: 1, type: "order", title: "Order the change control process",
    prompt: "A department head asks for an extra reporting feature partway through a project. Put the change control steps in the correct order.",
    steps: [
      "Receive the request and record it as a formal change request",
      "Log the request in the change log",
      "Assess the impact on scope, schedule, cost, quality and risk",
      "Submit the request and impact assessment to the change control board",
      "Update the affected baselines and project documents after approval",
      "Communicate the decision to the requester and stakeholders"
    ],
    explain: "A change must first be documented and logged so it can be tracked. The team then analyzes its impact so the decision makers understand the trade-offs. The change control board approves, rejects or defers it. Only after approval are baselines and documents updated and the work scheduled, and the decision is communicated so everyone works from the same plan. Starting the work before approval is scope creep." },

  { id: "procurement-docs-match", d: 2, type: "match", title: "Choose the right procurement document",
    prompt: "A school district is buying technology for a new building. Match each situation to the procurement document it needs.",
    pairs: [
      ["Learn what classroom audio-visual products exist before defining needs", "Request for information (RFI)"],
      ["Ask vendors to propose a Wi-Fi design, approach and price for the building", "Request for proposal (RFP)"],
      ["Get prices for 300 laptops of an exact, already chosen model", "Request for quote (RFQ)"],
      ["Describe the deliverables, schedule and acceptance criteria the chosen installer must meet", "Statement of work (SOW)"],
      ["Formally commit to buy the laptops at the agreed price", "Purchase order (PO)"]
    ],
    extra: ["Memorandum of understanding (MOU)", "Service level agreement (SLA)"],
    explain: "An RFI gathers market information when the need is still vague. An RFP asks vendors to propose a solution when the buyer knows the problem but not the best approach. An RFQ asks for prices when the item is fully specified. The SOW defines the work the selected vendor will perform and becomes part of the contract, and the purchase order is the buyer's formal authorization to buy. An SLA would set ongoing service targets, which none of these situations describe." },

  { id: "pert-estimate-fill", d: 2, type: "fill", title: "Calculate three-point (PERT) estimates",
    prompt: "The team gave three-point estimates, in days, for two sequential activities in an email migration. Use the PERT (beta) formula to fill in the values.",
    context: "Activity                  | Optimistic | Most likely | Pessimistic\nMailbox pilot migration   |     4      |      6      |     14\nBulk mailbox migration    |     2      |      5      |     14",
    fields: [
      { label: "PERT estimate for the pilot migration (days)", answers: ["7", "7 days", "7.0"] },
      { label: "PERT estimate for the bulk migration (days)", answers: ["6", "6 days", "6.0"] },
      { label: "Total expected duration of both activities (days)", answers: ["13", "13 days", "13.0"] }
    ],
    explain: "The PERT formula is (O + 4M + P) / 6. Pilot: (4 + 24 + 14) / 6 = 42 / 6 = 7 days. Bulk: (2 + 20 + 14) / 6 = 36 / 6 = 6 days. Because the activities are sequential, the total is 13 days. The simple triangular average, (O + M + P) / 3, would give 8 and 7 days, which gives less weight to the most likely value." },

  { id: "closing-select", d: 2, type: "select", title: "Pick the closing activities",
    prompt: "The customer has just accepted the final deliverable of a ticketing system project. Select every activity from the project manager's to-do list that belongs in the closing phase.",
    context: "To-do list, Friday\n1. Get the sponsor's signature on the final acceptance form\n2. Hold the lessons learned workshop with the team\n3. Build the work breakdown structure for phase 2 ideas\n4. Return contractors and staff to their managers\n5. Schedule the project kickoff meeting\n6. Archive project records per the retention policy\n7. Issue an RFP for a new monitoring tool\n8. Confirm vendor deliverables and pay the final invoice",
    options: [
      "Get the sponsor's signature on the final acceptance form",
      "Hold the lessons learned workshop with the team",
      "Build the work breakdown structure for phase 2 ideas",
      "Return contractors and staff to their managers",
      "Schedule the project kickoff meeting",
      "Archive project records per the retention policy",
      "Issue an RFP for a new monitoring tool",
      "Confirm vendor deliverables and pay the final invoice"
    ],
    answers: [0, 1, 3, 5, 7],
    explain: "Closing covers formal acceptance, lessons learned, releasing resources, archiving records and contract closure (confirming vendor obligations and final payment). Building a WBS and issuing an RFP are planning activities, and a kickoff meeting belongs to initiating; if phase 2 goes ahead, it would start as a new project or phase with its own initiating and planning." },

  { id: "evm-fill", d: 3, type: "fill", title: "Calculate earned value metrics",
    prompt: "Use the month 6 status data for a desktop refresh project to calculate the earned value metrics. Assume current cost performance will continue.",
    context: "Budget at completion (BAC): $400,000\nPlanned value (PV):         $200,000\nEarned value (EV):          $180,000\nActual cost (AC):           $225,000",
    fields: [
      { label: "Cost variance (CV) in dollars", answers: ["-45000", "-45,000", "-$45,000", "$-45,000", "-$45000"] },
      { label: "Cost performance index (CPI)", answers: ["0.8", "0.80", ".8"] },
      { label: "Schedule performance index (SPI)", answers: ["0.9", "0.90", ".9"] },
      { label: "Estimate at completion (EAC) in dollars", answers: ["500000", "500,000", "$500,000", "$500000"] }
    ],
    explain: "CV = EV - AC = 180,000 - 225,000 = -$45,000, so the project is over budget. CPI = EV / AC = 180,000 / 225,000 = 0.8 and SPI = EV / PV = 180,000 / 200,000 = 0.9, so it is also behind schedule. With current cost performance continuing, EAC = BAC / CPI = 400,000 / 0.8 = $500,000, a $100,000 overrun. Every formula starts with EV, the value of work actually completed." },

  { id: "quality-tools-match", d: 3, type: "match", title: "Match each need to the right chart or tool",
    prompt: "A service desk improvement project has several questions to answer. Match each question to the chart or tool that best answers it.",
    pairs: [
      ["Which few ticket categories cause most of the incidents?", "Pareto chart"],
      ["What are the possible causes of failed laptop builds, grouped by people, process and tools?", "Fishbone (Ishikawa) diagram"],
      ["Is ticket resolution time staying within its upper and lower limits each week?", "Control chart"],
      ["Does resolution time rise as the number of open tickets per analyst rises?", "Scatter diagram"],
      ["How much work is done, and how much has total scope grown, in the release?", "Burnup chart"],
      ["When does each rollout task start and finish, and which depend on others?", "Gantt chart"]
    ],
    extra: ["Histogram", "RACI chart"],
    explain: "Pareto charts rank categories with a cumulative line to reveal the vital few. Fishbone diagrams organize possible causes by category for root cause analysis. Control charts show whether a process stays within control limits over time. Scatter diagrams show correlation between two variables. Burnup charts show completed work against a separate scope line, so scope growth is visible. Gantt charts show tasks, dates and dependencies on a timeline. A histogram shows a distribution without ranking or time, and a RACI chart shows responsibilities." },

  { id: "cab-review-select", d: 4, type: "select", title: "Review a production change request",
    prompt: "You sit on the change advisory board. Read the change request and select every problem that should cause the CAB to send it back before approval.",
    context: "Change request CR-2291\nTitle: Upgrade order database to new major version\nRequested by: ERP project team\nScheduled: Friday, December 12, 14:00-16:00\nOrganization calendar: change freeze Nov 20 - Jan 5 (emergency changes only)\nClassification: Normal change\nImpact: Order entry unavailable for about 2 hours\nTesting: Completed in staging; results attached\nBackup: Full backup scheduled 13:30 the same day\nRollback plan: None - vendor says upgrade cannot fail\nUser communication: Not planned\nApprovers: Database owner, ERP project manager",
    options: [
      "The change is scheduled during business hours instead of a maintenance window",
      "The date falls inside the change freeze and the change is not an emergency",
      "Testing was done in the staging environment",
      "There is no rollback plan",
      "No communication to affected users is planned for the downtime",
      "A full backup is taken before the change"
    ],
    answers: [0, 1, 3, 4],
    explain: "A normal change with two hours of downtime should run in an approved maintenance window, not Friday afternoon, and it cannot go ahead during a change freeze unless it is a genuine emergency. Every production change needs a rollback plan, whatever the vendor promises, and users must be told about planned downtime in advance. Testing in staging and taking a full backup first are good practice, not problems." },

  { id: "cloud-model-match", d: 4, type: "match", title: "Match scenarios to cloud models",
    prompt: "An IT steering committee is reviewing five proposals. Match each proposal to the cloud service or deployment model it describes.",
    pairs: [
      ["Rent virtual machines and manage the operating system for a legacy application", "Infrastructure as a service (IaaS)"],
      ["Deploy the team's own web code while the provider manages servers, OS and runtime", "Platform as a service (PaaS)"],
      ["Subscribe to a finished email and calendar application and only manage users and settings", "Software as a service (SaaS)"],
      ["Keep the on-premises data center and connect it to a public cloud for extra capacity", "Hybrid cloud"],
      ["Run a cloud environment dedicated to a single organization", "Private cloud"]
    ],
    extra: ["Community cloud", "Function as a service (FaaS)"],
    explain: "IaaS leaves the OS and everything above it to the customer, so it fits a legacy app needing OS control. PaaS hides servers and the OS so developers only deploy code and manage data. SaaS delivers a complete application; the customer configures it and manages users and data. Hybrid cloud combines on-premises or private resources with public cloud, and a private cloud serves one organization only. A community cloud is shared by several organizations with common requirements." }
]);
