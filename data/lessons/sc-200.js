/* Lessons for Microsoft Certified: Security Operations Analyst Associate (SC-200): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("sc-200", [
 {
  "t": "Defender XDR settings: incident and alert email notifications, alert tuning (suppression) rules, portal RBAC and device groups",
  "body": [
   "Microsoft Defender XDR (extended detection and response) is the suite that joins Defender for Endpoint, Defender for Office 365, Defender for Identity, Defender for Cloud Apps and more into one portal, the Microsoft Defender portal. Before a security operations center (SOC) can use it well, someone has to configure a few tenant-wide settings: who gets told about incidents, which known-benign alerts are quieted, who can see what, and how devices are grouped. The exam treats these as the foundation of a working SOC.",
   "Email notifications live under Settings, Microsoft Defender XDR, Email notifications. There are separate rule types for incidents, for response actions and for threat analytics. An incident notification rule has a name, recipients and filters, such as minimum severity, source product or device group. A common design is to email the on-call lead for every high-severity incident and nobody for low ones. Email is a supplement, not the queue: analysts still work incidents in the portal.",
   "Alert tuning, previously called suppression rules, handles alerts you have already investigated and judged benign, such as a legitimate admin tool that always triggers the same detection. You build a rule from conditions on the alert and its evidence (file name or hash, process command line, IP address, user, device) and choose a scope: every device or only selected ones. The action is either to hide the alert or to resolve it automatically. Tuning changes only alerting. Protection and data collection keep running, which is why tuning is safer than an allow indicator or an exclusion, both of which change what the product blocks.",
   "Access in the portal is controlled in two ways. Microsoft Entra ID roles such as Security Administrator, Security Operator and Security Reader apply across the whole tenant. Microsoft Defender XDR Unified role-based access control (RBAC) lets you build custom roles from permission groups (security operations, security posture, authorization and settings) and assign them to users or groups for chosen data sources, such as endpoints only. Least privilege means Tier-1 analysts get read and triage rights, while only a small group can change settings.",
   "Device groups are defined in the Defender for Endpoint settings. Each group has a rank, matching rules (device name, domain, tag or operating system), an automation level and a list of Microsoft Entra user groups that may access it. A device joins the highest-ranked group whose rules it matches. Device groups do three jobs: they scope who can see and act on devices, they set how much automated remediation happens, and they can scope notifications, indicators and tuning rules. If your EU analysts should work only EU devices, you create an EU device group and give only their Entra group access to it."
  ],
  "terms": [
   [
    "Alert tuning rule",
    "A rule, formerly called a suppression rule, that hides or auto-resolves alerts matching chosen conditions without changing protection."
   ],
   [
    "Unified RBAC",
    "Defender XDR's role-based access control model, where custom roles combine permission groups and are assigned per data source."
   ],
   [
    "Device group",
    "A ranked set of devices, defined by matching rules, that controls access, automation level and scope for other settings."
   ],
   [
    "Incident notification rule",
    "A setting that emails chosen recipients when incidents matching filters such as severity are created or updated."
   ]
  ],
  "example": "A hospital's backup software triggers a 'suspicious credential access' alert every night on two backup servers. After confirming the behavior is expected, the SOC lead creates an alert tuning rule for that process path, scoped to those two servers, set to resolve the alert. The same detection still fires on any other device, and a new incident notification rule emails her only for high-severity incidents.",
  "tip": "When a question asks how to silence one known-benign alert while keeping protection, pick alert tuning scoped narrowly. When it asks how to limit which devices an analyst can see, pick a device group with Entra group access, not a tenant-wide Entra role.",
  "check": [
   [
    "Why is an alert tuning rule usually safer than a tenant-wide allow indicator for a noisy admin tool?",
    "Tuning only hides or resolves the alert; the tool is still monitored and protection is unchanged. An allow indicator changes prevention for every device in the tenant."
   ],
   [
    "A device matches the rules of two device groups. Which one does it join?",
    "The one with the higher rank. Devices join only the highest-ranked group whose matching rules they meet."
   ],
   [
    "What filters can an incident email notification rule use?",
    "Filters such as minimum severity, the source product and device groups, along with the list of recipients."
   ]
  ]
 },
 {
  "t": "Defender for Endpoint configuration: onboarding, device groups, tamper protection, attack surface reduction rules (audit, warn, block), indicators and network protection, device discovery",
  "body": [
   "Microsoft Defender for Endpoint (MDE) is the endpoint detection and response (EDR) and protection product in Defender XDR. It uses sensors built into Windows and agents for macOS, Linux, iOS and Android to send telemetry to the cloud, where detections become alerts. Configuring it well decides whether your SOC sees attacks and whether common attack techniques are blocked before they start.",
   "Onboarding connects a device to your tenant. Methods include a local script (good for a handful of test machines), Group Policy, Microsoft Intune, Configuration Manager, virtual desktop scripts, and Defender for Cloud for servers. Each method runs an onboarding package downloaded from Settings, Endpoints, Onboarding. After onboarding, the onboarding page offers a harmless detection test command that produces a test alert, which is how you confirm the device reports.",
   "Tamper protection stops people, including local administrators and malware running with admin rights, from turning off real-time protection, cloud-delivered protection and other security settings. Attackers commonly try to disable antivirus before running ransomware, so tamper protection should be on everywhere and managed centrally.",
   "Attack surface reduction (ASR) rules block behaviors that attackers use and normal users rarely need: Office apps creating child processes, credential theft from the Local Security Authority Subsystem Service (LSASS), obfuscated scripts, executable content from email and others. Each rule has a mode. Audit logs what would have been blocked without blocking it. Warn blocks but lets the user click through, and not every rule supports it. Block enforces the rule. The safe rollout is audit first, review the audit events in the ASR report or advanced hunting, add narrow exclusions for legitimate line-of-business apps, then move to block in stages.",
   "Indicators of compromise (IoCs) are your own allow or block entries. File hash indicators can allow, audit, warn, block execution or block and remediate. IP address, URL and domain indicators and certificate indicators work similarly. For IP and URL indicators to block traffic from browsers other than Microsoft Edge and from other processes, network protection must be turned on in block mode. Network protection extends SmartScreen-style reputation blocking to the whole operating system, so it also stops connections to known malicious or command-and-control sites.",
   "Device discovery uses onboarded devices to find unmanaged devices on the same networks. Standard discovery, the default, actively probes found devices to learn more about them; basic discovery only listens passively. Discovered devices appear in the device inventory so you can onboard them, which closes gaps attackers love. Device groups, covered in the previous lesson, then control who can see and act on each device and the automated remediation level it gets."
  ],
  "terms": [
   [
    "Tamper protection",
    "A setting that prevents local changes to Defender security settings, even by administrators or malware with admin rights."
   ],
   [
    "ASR rule modes",
    "Audit logs only, Warn blocks but allows a user bypass, and Block enforces the rule."
   ],
   [
    "Network protection",
    "An operating-system-wide filter that blocks connections to malicious domains and IPs and enforces custom IP and URL indicators outside Edge."
   ],
   [
    "Device discovery",
    "The feature that uses onboarded devices to find unmanaged devices on the network, in basic (passive) or standard (active) mode."
   ]
  ],
  "example": "An accounting firm wants to block Office macros from launching child processes. The admin sets that ASR rule to audit for two weeks, finds that a reporting add-in triggers it, adds an exclusion for that add-in's path, then switches the rule to block for a pilot group before rolling it out to all device groups.",
  "tip": "Expect questions that test the order of ASR rollout (audit before block) and the dependency between custom IP or URL indicators and network protection. Tamper protection is the answer whenever someone with admin rights tries to switch off Defender.",
  "check": [
   [
    "A custom URL block indicator works in Edge but not in Chrome. What is missing?",
    "Network protection in block mode. It enforces IP and URL indicators for other browsers and processes."
   ],
   [
    "What does warn mode do in an ASR rule?",
    "It blocks the action but shows the user a notice that lets them unblock it and continue, for rules that support warn."
   ],
   [
    "How can you find devices on your network that are not onboarded to Defender for Endpoint?",
    "Use device discovery; the unmanaged devices it finds appear in the device inventory for onboarding."
   ]
  ]
 },
 {
  "t": "Defender for Cloud: foundational CSPM vs paid workload protection plans (Servers, Storage, Databases), connecting AWS and GCP accounts, Defender for Endpoint integration for servers",
  "body": [
   "Microsoft Defender for Cloud protects cloud resources in Azure, Amazon Web Services (AWS), Google Cloud Platform (GCP) and on-premises servers. It does two different jobs, and the exam expects you to keep them apart. Cloud security posture management (CSPM) looks for weaknesses in how resources are configured. Cloud workload protection (the Defender plans) detects active threats against running workloads and raises security alerts.",
   "Foundational CSPM is on by default at no extra charge. It gives you a secure score, security recommendations based on the Microsoft cloud security benchmark, asset inventory and regulatory compliance views for some standards. The paid Defender CSPM plan adds deeper posture features such as attack path analysis, the cloud security explorer, agentless scanning and governance rules. Neither CSPM plan produces threat alerts about an attacker on a virtual machine; that is the job of workload protection.",
   "Workload protection is enabled per plan and per subscription (or AWS account or GCP project). Defender for Servers protects Windows and Linux machines, and comes in Plan 1 and Plan 2, with Plan 2 adding more features such as agentless vulnerability scanning, file integrity monitoring and just-in-time VM access. Defender for Storage detects threats against storage accounts, such as unusual access patterns and malware uploads, with optional malware scanning of new blobs. The databases plans cover Azure SQL, SQL servers on machines, open-source relational databases and Azure Cosmos DB, and alert on things like SQL injection attempts and brute-force logins. There are also plans for containers, App Service, Key Vault, Resource Manager and APIs.",
   "To protect AWS and GCP, you add an environment in Defender for Cloud's Environment settings. For AWS, you create a connector and deploy the provided CloudFormation template, which creates the roles Defender for Cloud needs to read the account. For GCP, you run a provided script, typically in Cloud Shell, to create the service accounts and permissions. You then choose which plans to turn on for that connector, such as Defender CSPM and Defender for Servers. Servers outside Azure may be connected through Azure Arc so that Azure extensions can be deployed to them.",
   "Defender for Servers includes a Defender for Endpoint license and integrates the two automatically. When the integration is on, Defender for Cloud deploys the Defender for Endpoint sensor to supported machines, onboards them to your Defender for Endpoint tenant, and shows Defender for Endpoint alerts in Defender for Cloud. The same machines appear in the Defender portal device inventory, so your endpoint analysts and cloud team see one set of detections.",
   "A simple way to remember it: posture tells you where the doors are unlocked, and workload protection tells you someone is walking through one. Secure score and recommendations come from CSPM. Alerts such as 'suspicious process executed' on a VM come from a paid Defender plan."
  ],
  "terms": [
   [
    "Foundational CSPM",
    "The free Defender for Cloud tier that provides secure score, recommendations and asset inventory."
   ],
   [
    "Cloud workload protection",
    "The paid Defender plans (Servers, Storage, Databases and others) that detect threats and raise security alerts."
   ],
   [
    "Multicloud connector",
    "The Defender for Cloud connection to an AWS account or GCP project, created with a CloudFormation template or a GCP script."
   ],
   [
    "Defender for Endpoint integration",
    "The Defender for Servers feature that deploys and licenses the Defender for Endpoint sensor on protected servers."
   ]
  ],
  "example": "A retailer runs web servers on Azure VMs and AWS EC2. Secure score shows recommendations for both, but no alerts appear when a test detection runs on EC2. The team realizes they only have foundational CSPM on the AWS connector, so they enable Defender for Servers on it; the Defender for Endpoint sensor is then deployed and alerts start arriving.",
  "tip": "If an option says foundational CSPM will produce threat alerts, it is wrong. Threat alerts need a Defender workload plan; attack path analysis needs Defender CSPM.",
  "check": [
   [
    "Which tier gives secure score at no extra charge?",
    "Foundational CSPM, which is enabled by default."
   ],
   [
    "How do you connect an AWS account to Defender for Cloud?",
    "Create an AWS connector in Environment settings and deploy the CloudFormation template it generates, then choose the plans to enable."
   ],
   [
    "What does the Defender for Endpoint integration in Defender for Servers do?",
    "It deploys and onboards the Defender for Endpoint sensor on supported servers and brings its EDR detections into Defender for Cloud and the Defender portal."
   ]
  ]
 },
 {
  "t": "Defender for Identity sensors on domain controllers and AD FS/AD CS servers; Defender for Office 365 Safe Links and Safe Attachments",
  "body": [
   "Microsoft Defender for Identity (MDI) watches on-premises Active Directory (AD) for attacks such as reconnaissance, credential theft, lateral movement and domain dominance. It needs to see authentication and directory traffic, so it relies on sensors installed on the servers that handle identity: every domain controller, plus Active Directory Federation Services (AD FS) servers, Active Directory Certificate Services (AD CS) servers and Microsoft Entra Connect servers. Missing even one domain controller creates a blind spot, because an attacker's Kerberos requests may go to the unmonitored one.",
   "The sensor reads network traffic, Windows events and Event Tracing for Windows data locally and sends parsed data to the cloud service. Setup steps you should know: create the MDI workspace in the Defender portal, configure a Directory Service account (a group managed service account, gMSA, is recommended) that the sensor uses to query AD, configure the required Windows advanced audit policies so the right events are logged, check network requirements, and install the sensor with the access key from the portal. On domain controllers already onboarded to Defender for Endpoint, newer Windows Server versions can activate the identity sensor capability from the Defender portal without a separate installer. Sensor health issues, such as a stopped service or missing audit settings, appear as health alerts in the settings page.",
   "Microsoft Defender for Office 365 (MDO) protects email and collaboration tools. Two policies appear on the exam constantly. Safe Links checks URLs at the time of click rather than only on delivery. That matters because attackers often send a link that points to a clean page and weaponize it hours later. Safe Links can rewrite URLs in email, check links in Microsoft Teams and Office apps, track clicks for investigation, and optionally stop users from clicking through a warning page. You can list URLs that should not be rewritten.",
   "Safe Attachments opens attachments in a sandbox (detonation) to detect unknown malware that signature scanning misses. Its actions include Monitor (deliver and track results), Block (hold the message and quarantine it if malicious) and Dynamic Delivery (deliver the message body right away with a placeholder, then attach the file once it is scanned clean). A separate global setting turns on Safe Attachments for SharePoint, OneDrive and Teams, which blocks malicious files stored there.",
   "Both policies can be applied through preset security policies (Standard and Strict), which Microsoft maintains, or through custom policies scoped to users, groups or domains. Built-in protection gives baseline Safe Links and Safe Attachments coverage to everyone with the right licenses. Presets win over custom policies when both apply, so a custom policy may seem to be ignored."
  ],
  "terms": [
   [
    "Defender for Identity sensor",
    "Software installed on domain controllers and AD FS, AD CS and Entra Connect servers that collects identity traffic and events for detection."
   ],
   [
    "Directory Service account",
    "The account, ideally a gMSA, that Defender for Identity uses to query Active Directory."
   ],
   [
    "Safe Links",
    "An MDO feature that checks URLs when they are clicked in email, Teams and Office apps."
   ],
   [
    "Dynamic Delivery",
    "A Safe Attachments action that delivers the email body immediately and adds the attachment after sandbox scanning."
   ]
  ],
  "example": "A law firm installed Defender for Identity sensors on four of its five domain controllers. A pass-the-ticket attack goes undetected because the attacker's requests hit the fifth. After installing the missing sensor and fixing audit policies flagged in sensor health, similar activity raises alerts within minutes.",
  "tip": "Know the server list for MDI sensors: all domain controllers plus AD FS, AD CS and Entra Connect. For MDO, time-of-click checking means Safe Links; sandbox detonation means Safe Attachments.",
  "check": [
   [
    "Why must every domain controller have a Defender for Identity sensor?",
    "Authentication can go to any domain controller; one without a sensor is a blind spot where attacks are missed."
   ],
   [
    "A user receives a link that was clean on delivery but turned malicious later. Which feature protects them?",
    "Safe Links, because it checks the URL again at the time of click."
   ],
   [
    "Users complain that attachments delay their mail. Which Safe Attachments action helps?",
    "Dynamic Delivery, which delivers the message body at once and attaches the file after scanning."
   ]
  ]
 },
 {
  "t": "Sentinel workspace design: Log Analytics workspace, Sentinel roles (Reader, Responder, Contributor, Automation Contributor), onboarding to the Defender portal",
  "body": [
   "Microsoft Sentinel is a cloud-native security information and event management (SIEM) and security orchestration, automation and response (SOAR) service. It does not have its own storage: you enable Sentinel on an Azure Monitor Log Analytics workspace, and all ingested data lands in tables in that workspace. So the first design decision is how many workspaces you need.",
   "Microsoft's general advice is to use as few workspaces as possible, ideally one, because a single workspace makes correlation, rules and hunting simpler. Reasons to split include data residency laws that require data to stay in a region, separate billing or ownership for business units, and managed security service providers who keep customers apart. When you have several workspaces you can still query across them, and Azure Lighthouse helps providers manage many tenants. Access to data inside one workspace can be narrowed with resource-context RBAC (users see only logs from resources they can access) or table-level RBAC.",
   "Sentinel has built-in Azure roles you assign at the resource group or workspace level. Microsoft Sentinel Reader can view data, incidents, workbooks and other content. Microsoft Sentinel Responder can do everything a Reader can plus manage incidents: assign, change status and severity, comment and close. Microsoft Sentinel Contributor can additionally create and edit content such as analytics rules, workbooks and watchlists. Microsoft Sentinel Automation Contributor is not for people; it is the role you grant to the Sentinel service on a resource group so automation rules can run playbooks stored there. Creating or editing playbooks also needs Logic App Contributor, and Microsoft Sentinel Playbook Operator lets someone run playbooks manually.",
   "Pick the least role that does the job. A Tier-1 analyst who triages and closes incidents needs Responder, not Contributor. A detection engineer who writes rules needs Contributor. If an automation rule cannot select a playbook's resource group, the usual fix is to grant Sentinel the Automation Contributor role there.",
   "Microsoft is moving Sentinel into the Microsoft Defender portal, often called the unified security operations platform. You connect a workspace from the Defender portal, and one workspace is marked as primary. After onboarding, Sentinel incidents and Defender XDR incidents share one queue, and the Defender XDR correlation engine groups alerts from both. Some things change: Microsoft incident creation rules are no longer needed because Defender XDR creates incidents, and advanced hunting can query Sentinel tables alongside Defender tables. Most Sentinel configuration pages appear in the Defender portal under Microsoft Sentinel. Microsoft has announced that Sentinel in the Azure portal will be retired in favor of the Defender portal, so new deployments should plan for the unified experience."
  ],
  "terms": [
   [
    "Log Analytics workspace",
    "The Azure Monitor data store that Sentinel is enabled on and where all its tables live."
   ],
   [
    "Microsoft Sentinel Responder",
    "The role that allows viewing data and managing incidents but not creating or editing content."
   ],
   [
    "Microsoft Sentinel Automation Contributor",
    "A role granted to the Sentinel service on a resource group so automation rules can run playbooks there."
   ],
   [
    "Unified security operations platform",
    "Sentinel and Defender XDR working together in the Microsoft Defender portal with one incident queue."
   ]
  ],
  "example": "A European insurer with offices in Germany and Canada must keep German logs in the EU. It creates two workspaces, one per region, onboards both to the Defender portal, and gives Tier-1 analysts the Responder role on both. The detection engineering team receives Contributor, and Sentinel receives Automation Contributor on the playbooks resource group.",
  "tip": "Responder versus Contributor is a favorite question: managing incidents only means Responder; editing rules, watchlists or workbooks means Contributor. Automation Contributor is granted to Sentinel, not to a user.",
  "check": [
   [
    "What is the most common valid reason to create more than one Sentinel workspace?",
    "Data residency or sovereignty requirements that force data to stay in specific regions; other reasons include separate billing or tenant isolation."
   ],
   [
    "Which role lets an analyst close incidents but not edit analytics rules?",
    "Microsoft Sentinel Responder."
   ],
   [
    "What happens to Microsoft incident creation rules when a workspace is onboarded to the Defender portal?",
    "They are no longer used, because Defender XDR creates and correlates incidents for the unified queue."
   ]
  ]
 },
 {
  "t": "Data retention and cost: analytics tier vs Sentinel data lake tier, table plans, summary rules, SOC optimization recommendations",
  "body": [
   "Sentinel is billed mainly on the data you ingest and how long you keep it, so a security operations analyst has to think about cost as well as coverage. Not every log deserves the same treatment. High-value security signals that feed detections should be fast to query. High-volume, low-value logs, such as verbose firewall or proxy traffic, are often kept mainly for investigations and compliance.",
   "The analytics tier is the premium, interactive store. Data there supports analytics rules, near-real-time detections, workbooks, hunting and fast KQL (Kusto Query Language) queries. Sentinel includes a period of analytics retention at no extra charge, and you can extend interactive retention for longer at a cost. The Sentinel data lake tier is a lower-cost store for long-term and high-volume data. Data in the lake is kept in an open format and can be retained for years, up to a long total retention limit. You query it with KQL in data lake exploration, with KQL jobs, or with notebooks, and it is not meant for real-time detection.",
   "Each Log Analytics table has a table plan. The Analytics plan gives full features. The Basic plan is cheaper to ingest, with limited query features and a query charge. The Auxiliary plan is cheapest and intended for verbose, rarely queried logs. With the data lake enabled, analytics tier data is also mirrored into the lake, and tables can be set to go to the data lake tier only. The key exam distinction is the trade-off: lower ingestion cost comes with fewer features, slower or billed queries, and no standard analytics rules.",
   "Summary rules bridge the tiers. A summary rule runs a KQL query on a schedule, aggregates detailed data from any table (including cheaper tiers), and writes the smaller results into an analytics table. For example, you could keep raw firewall connections in a low-cost tier but summarize connection counts per source IP per hour into an analytics table that detections and workbooks can use. You lose the individual rows in the summary but keep the signal, and the raw data is still there for deep investigation.",
   "SOC optimization is a page in the Defender portal (and in Sentinel) that gives tailored recommendations. Data value recommendations point out tables you pay for that no rule or hunt uses, and suggest moving them to a cheaper plan or reducing ingestion. Coverage recommendations compare your detections with common attack scenarios mapped to MITRE ATT&CK and suggest rules or data sources to close gaps. Recommendations based on similar organizations suggest data sources that peers find useful. Each recommendation can be marked as completed or dismissed, and it shows its expected effect.",
   "Other cost levers include ingesting only needed events with data collection rules, using ingestion-time transformations to drop unneeded columns, commitment tiers for predictable volumes, and budgets and alerts in Azure Cost Management for labs."
  ],
  "terms": [
   [
    "Analytics tier",
    "The interactive, higher-cost storage tier that supports analytics rules, workbooks and fast hunting queries."
   ],
   [
    "Sentinel data lake tier",
    "Low-cost long-term storage for high-volume data, queried with KQL jobs, exploration queries or notebooks."
   ],
   [
    "Summary rule",
    "A scheduled KQL query that aggregates detailed data and writes the results into an analytics-tier table."
   ],
   [
    "SOC optimization",
    "A page of recommendations on data value, detection coverage and peer-based data sources."
   ]
  ],
  "example": "A university ingests several hundred gigabytes a day of network flow logs, but only one workbook uses them. SOC optimization flags the table as low value. The team moves raw flow logs to the data lake tier and adds a summary rule that writes hourly per-host connection counts to an analytics table, where a scheduled rule looks for sudden spikes.",
  "tip": "When a scenario says 'keep verbose logs cheaply for years but still detect on aggregates', the answer combines a low-cost tier with a summary rule. Analytics rules need data in the analytics tier.",
  "check": [
   [
    "Why can't you point a standard scheduled analytics rule at raw data that lives only in the data lake tier?",
    "Scheduled rules run on analytics-tier data; lake data is for long-term queries, KQL jobs and notebooks, so you summarize or promote it first."
   ],
   [
    "What does a summary rule write, and where?",
    "Aggregated query results, written on a schedule into an analytics-tier table."
   ],
   [
    "Name two kinds of SOC optimization recommendations.",
    "Data value recommendations about unused or costly tables, and coverage recommendations about detection gaps against attack techniques."
   ]
  ]
 },
 {
  "t": "Data connectors and Content hub solutions; Windows Security Events and CEF/Syslog through the Azure Monitor Agent and data collection rules (DCRs); the Logs Ingestion API for custom sources",
  "body": [
   "A SIEM is only as good as the data it receives. In Sentinel, data connectors bring logs from Microsoft services, other clouds, firewalls, servers and software-as-a-service apps into workspace tables. Connectors are delivered through Content hub, a catalog of solutions. A solution is a package that can include connectors, analytics rules, workbooks, hunting queries, parsers and playbooks for one product or scenario. You install the solution, then open its connector page and follow the configuration steps.",
   "Microsoft first-party sources, such as Microsoft Entra ID, Microsoft 365 and Defender XDR, usually connect with a few clicks because they are service-to-service. Servers need an agent. The Azure Monitor Agent (AMA) is the current agent for Windows and Linux; it replaced the older Log Analytics agent. AMA is driven by data collection rules (DCRs), which define three things: the data sources to collect, an optional KQL transformation applied at ingestion time, and the destination workspace and table. Machines outside Azure are connected through Azure Arc so that AMA can be deployed to them.",
   "For Windows servers, the Windows Security Events via AMA connector writes to the SecurityEvent table. You choose an event set: All, Common, Minimal, or Custom using XPath queries to collect specific event IDs, for example 4624 (successful logon), 4625 (failed logon) and 4688 (process creation). Choosing a narrow set is the most effective way to control cost. Windows Forwarded Events is a related connector for events collected by Windows Event Forwarding.",
   "Many network devices send logs as Syslog or Common Event Format (CEF), a structured format carried over Syslog. They usually cannot run an agent, so you build a Linux log forwarder: a Linux machine running rsyslog or syslog-ng plus AMA. Devices send to the forwarder, and DCRs tell AMA which facilities and severities to collect. Syslog goes to the Syslog table; CEF goes to the CommonSecurityLog table. The CEF via AMA and Syslog via AMA connectors walk you through creating these DCRs.",
   "For custom sources, such as an in-house app or a product with no connector, use the Logs Ingestion API. You create a custom table (its name ends in _CL), a DCR that describes the incoming data shape and any transformation, and a Microsoft Entra app registration or managed identity. The identity gets the Monitoring Metrics Publisher role on the DCR, and your code or tool sends JSON to the DCR's ingestion endpoint. Some setups also use a data collection endpoint (DCE). Microsoft also offers a codeless connector framework for building API-polling connectors without code.",
   "Always check data arrives: run a query like SecurityEvent | take 10 or look at the connector's status and the table's last-received time."
  ],
  "terms": [
   [
    "Content hub",
    "Sentinel's catalog of solutions that package connectors, rules, workbooks, parsers and playbooks."
   ],
   [
    "Azure Monitor Agent (AMA)",
    "The current agent for Windows and Linux that collects data according to data collection rules."
   ],
   [
    "Data collection rule (DCR)",
    "A configuration that defines sources, an optional ingestion-time transformation and the destination table."
   ],
   [
    "Logs Ingestion API",
    "A REST API for sending custom data into a workspace table through a DCR."
   ]
  ],
  "example": "A manufacturer's firewalls can only send CEF over Syslog. The SOC deploys a small Linux VM with rsyslog and AMA, installs the vendor's Content hub solution, creates a DCR for the CEF via AMA connector, and points the firewalls at the VM. Within minutes, CommonSecurityLog fills and the solution's analytics rules begin to run.",
  "tip": "Map formats to tables: Windows events to SecurityEvent, Syslog to Syslog, CEF to CommonSecurityLog, custom API data to a _CL table. Filtering and transformation happen in the DCR.",
  "check": [
   [
    "Which table receives CEF logs collected by AMA?",
    "CommonSecurityLog."
   ],
   [
    "How do you collect only event IDs 4624, 4625 and 4688 from Windows servers?",
    "Use the Windows Security Events via AMA connector with a custom XPath event set in the DCR."
   ],
   [
    "What does an app need to send data through the Logs Ingestion API?",
    "A custom table, a DCR describing the data, and an Entra identity with the Monitoring Metrics Publisher role on the DCR."
   ]
  ]
 },
 {
  "t": "Analytics rules: scheduled, near-real-time (NRT), Microsoft incident creation, anomaly and Fusion; entity mapping, alert grouping, custom details",
  "body": [
   "Analytics rules are how Sentinel turns data into alerts and incidents. The exam expects you to know each rule type, when to use it, and the settings that make its alerts useful to analysts.",
   "Scheduled rules are the workhorse. You write a KQL query, choose how often it runs (query frequency) and how far back it looks (lookback), and set a threshold, such as generate an alert when the query returns more than zero results. The lookback should usually be at least as long as the frequency so events are not missed. You also choose event grouping: one alert for all results, or one alert per result row. Near-real-time (NRT) rules run about every minute over a very short lookback, for high-priority detections where minutes matter, such as a break-glass account signing in. NRT rules have more limits on query complexity than scheduled rules.",
   "Microsoft security (incident creation) rules create Sentinel incidents from alerts produced by other Microsoft products, such as Defender for Cloud. When your workspace is onboarded to the Defender portal they are not used, because Defender XDR creates incidents. Anomaly rules use built-in machine learning to flag unusual behavior. You cannot edit their logic, but you can duplicate one and tune its parameters, and run it in flighting mode to compare. Anomalies go to the Anomalies table and are often used in hunting rather than as incidents. Fusion is Sentinel's multistage attack detection: it correlates low-fidelity alerts and anomalies from several products into high-fidelity incidents, such as a suspicious sign-in followed by mass file download. In the Defender portal, Defender XDR's correlation engine takes over this role.",
   "Entity mapping is what makes alerts useful. You map query columns to entity types such as Account, Host, IP, URL, File and Process, choosing identifiers like account name and UPN. Mapped entities feed the investigation graph, entity pages, UEBA and correlation. Without them, analysts see text but have nothing to pivot on.",
   "Alert grouping controls how alerts become incidents. By default each alert creates its own incident. You can group all alerts from the rule within a time window into one incident, group only alerts whose mapped entities all match, or group by selected entities and details. You can also choose whether a new alert reopens a closed incident. Good grouping prevents a brute-force rule from producing fifty separate incidents for the same account.",
   "Custom details surface specific event fields, such as a command line or a count, directly in the alert, so analysts do not need to rerun the query. Alert details let you set the alert name, description and severity dynamically from columns, for example 'Failed logons for {{Account}}'."
  ],
  "terms": [
   [
    "Scheduled rule",
    "A KQL-based analytics rule that runs on a set frequency over a set lookback and alerts when a threshold is met."
   ],
   [
    "NRT rule",
    "A near-real-time rule that runs about every minute for urgent detections."
   ],
   [
    "Fusion",
    "Sentinel's machine-learning correlation that combines alerts and anomalies into multistage attack incidents."
   ],
   [
    "Entity mapping",
    "Mapping query columns to entity types such as Account, Host and IP so alerts carry structured evidence."
   ]
  ],
  "example": "A detection engineer writes a scheduled rule that runs every 10 minutes with a 10-minute lookback, alerting when one account has 5 or more failed logons. She maps Account and Host entities, adds the failure count as a custom detail, and groups alerts into one incident per account for 24 hours. A burst of attacks now produces one incident per victim account instead of dozens.",
  "tip": "Words like 'within about a minute' point to NRT. 'Multistage attack across products' points to Fusion (or Defender XDR correlation in the unified portal). 'Too many incidents for the same user' points to alert grouping.",
  "check": [
   [
    "Why should a scheduled rule's lookback usually be at least as long as its frequency?",
    "Otherwise events that occur between runs fall outside every lookback window and are never evaluated."
   ],
   [
    "What do you gain by mapping entities in an analytics rule?",
    "Structured evidence that powers the investigation graph, entity pages, UEBA, alert grouping and correlation."
   ],
   [
    "Can you edit an anomaly rule's logic?",
    "No. You can duplicate it and adjust its parameters, and compare versions, but the underlying model is built in."
   ]
  ]
 },
 {
  "t": "Custom detection rules in Defender XDR advanced hunting; MITRE ATT&CK coverage of your rules",
  "body": [
   "Advanced hunting in the Defender portal lets you query up to 30 days of raw Defender XDR data with KQL, and, when Sentinel is onboarded, Sentinel tables as well. A custom detection rule is a saved advanced hunting query that runs on a schedule and raises alerts, and optionally takes response actions, whenever it returns results. It is the Defender XDR counterpart of a Sentinel scheduled analytics rule.",
   "To create one, you write and test a query in advanced hunting, then choose Create detection rule. The query must return columns that let Defender identify the event and the affected asset. For most device tables that means Timestamp, DeviceId and ReportId; email and identity tables have their own required identifier columns. Rows need a Timestamp in the lookback window. If these columns are missing, the wizard will not save the rule, so it is common to project them explicitly at the end of the query.",
   "The wizard then asks for alert details: name, frequency, severity, category, a description, recommended actions and MITRE ATT&CK techniques. Frequency options range from continuous (near-real-time, for supported queries) through every hour, every few hours and once a day; the lookback is tied to the frequency. Next you choose impacted entities, which column identifies the device, mailbox or user. Finally, you can select automatic actions on those entities, such as isolate device, collect investigation package, run antivirus scan, restrict app execution, quarantine a file, or mark a user as compromised or disable the user. Use automatic actions only for high-confidence rules, because a false positive that isolates a server can cause an outage.",
   "MITRE ATT&CK is a public knowledge base of adversary tactics (the goal, such as persistence or credential access) and techniques (the method, such as T1003 OS credential dumping). Tagging every rule with its techniques lets you measure coverage: which techniques you detect and which you do not. In Sentinel, the MITRE ATT&CK page shows a matrix colored by the number of active rules, and can also show rules you could enable from templates (simulated coverage). SOC optimization coverage recommendations compare your rules against common attack scenarios. Coverage is about detections, not about blocking; a technique can be well prevented by ASR rules and still have no detection.",
   "Good practice: test the query over the full lookback period to see how many alerts it would create, add filters for known-benign activity, and review rules regularly. Custom detections can be edited, turned off and run on demand from the Detection rules page, and each run's status is visible there. If a rule fails because the query timed out or a table changed, you see the error on the rule's details."
  ],
  "terms": [
   [
    "Custom detection rule",
    "A scheduled advanced hunting query in Defender XDR that creates alerts and can trigger automated response actions."
   ],
   [
    "Required columns",
    "Identifier columns, such as Timestamp, DeviceId and ReportId, that a custom detection query must return."
   ],
   [
    "MITRE ATT&CK",
    "A public framework of adversary tactics and techniques used to label detections and measure coverage."
   ],
   [
    "Impacted entity",
    "The device, user or mailbox column the rule marks as affected and targets for actions."
   ]
  ],
  "example": "An analyst writes a query for encoded PowerShell launched by Office apps in DeviceProcessEvents, confirms it returns Timestamp, DeviceId and ReportId, and saves it as an hourly custom detection tagged with the command and scripting interpreter technique. The Sentinel MITRE page now shows that technique covered, and the rule collects an investigation package automatically when it fires.",
  "tip": "If a question says the rule cannot be saved, check for missing required columns. If it asks how to see which ATT&CK techniques lack detections, choose the MITRE ATT&CK coverage view or SOC optimization coverage recommendations.",
  "check": [
   [
    "What columns must a custom detection query on DeviceProcessEvents return?",
    "Timestamp, DeviceId and ReportId, so Defender can identify the event and the device."
   ],
   [
    "Why be careful with automatic actions in custom detections?",
    "They act on every match; a false positive could isolate or disable critical devices or users."
   ],
   [
    "What does the difference between a tactic and a technique mean in MITRE ATT&CK?",
    "A tactic is the attacker's goal, such as credential access; a technique is how they achieve it, such as dumping LSASS memory."
   ]
  ]
 },
 {
  "t": "Automation: automation rules vs Logic Apps playbooks, triggers, incident tasks; watchlists, workbooks, UEBA and threat intelligence connectors",
  "body": [
   "Sentinel has two automation layers. Automation rules are lightweight, built-in rules that run when incidents or alerts are created or updated. They can change status, severity or owner, add tags, add incident tasks and run playbooks. Rules have an order number, an optional expiration date, and conditions such as analytics rule name, severity, tag or entity. They are ideal for triage: assign all phishing incidents to the email team, raise severity when a VIP account is involved, or close known-benign incidents automatically.",
   "Playbooks are Azure Logic Apps workflows. They handle anything that needs outside systems or multi-step logic: enriching an IP address from a reputation service, posting to Microsoft Teams, opening a ticket, disabling a user through Microsoft Graph, or asking an analyst for approval. Playbooks use the Microsoft Sentinel trigger, which comes in three kinds: incident, alert and entity. Incident-trigger playbooks can be run from automation rules and are the recommended type. Alert-trigger playbooks can also be run from automation rules that fire when an alert is created (older setups attached them directly to analytics rules). Entity-trigger playbooks are run manually from an entity. Playbooks authenticate to Sentinel and other services, ideally with a managed identity. Remember that Sentinel needs the Automation Contributor role on the playbook's resource group.",
   "Incident tasks are checklists inside an incident, such as 'Reset password' or 'Check inbox rules'. Automation rules or playbooks add them, so every analyst follows the same steps for a given incident type, and completing them is tracked.",
   "Watchlists are reference lists you upload, usually as CSV files: VIP users, known admin hosts, terminated employees, or approved IP ranges. Each has an alias and a search key column. In KQL, _GetWatchlist('VIPUsers') returns the list, which you join or filter against in rules and hunts. Watchlists help both to raise priority (alert when a VIP is involved) and to reduce noise (exclude known scanners).",
   "Workbooks are interactive dashboards built on Azure Monitor workbooks. Many come with Content hub solutions, and you can build your own with KQL-driven charts, grids and parameters. They are for visualization and reporting, not for alerting.",
   "User and entity behavior analytics (UEBA) builds baselines of normal behavior for users, hosts and other entities from sources such as sign-in logs, audit logs and Windows security events. It writes to tables such as BehaviorAnalytics, IdentityInfo and UserPeerAnalytics, and enriches entity pages with insights like 'first time this user accessed this resource'. You enable UEBA in Sentinel settings and choose its data sources.",
   "Threat intelligence connectors bring indicators of compromise into the workspace. Examples are the Threat Intelligence TAXII connector for STIX/TAXII feeds, the upload API connector for threat intelligence platforms, and the Microsoft Defender Threat Intelligence connector. Indicators are then used by threat intelligence matching analytics rules and in hunting."
  ],
  "terms": [
   [
    "Automation rule",
    "A built-in Sentinel rule that acts on incidents or alerts when they are created or updated, including running playbooks."
   ],
   [
    "Playbook",
    "An Azure Logic Apps workflow triggered by a Sentinel incident, alert or entity for enrichment or response."
   ],
   [
    "Watchlist",
    "A reference list, queried with _GetWatchlist(), used to enrich or filter rules and hunts."
   ],
   [
    "UEBA",
    "User and entity behavior analytics, which baselines normal activity and highlights anomalies on entity pages."
   ]
  ],
  "example": "A SOC creates an automation rule that fires on incidents from its phishing rules: it assigns them to the email team, adds three incident tasks, and runs a playbook that looks up each URL's reputation and posts a summary to a Teams channel. A watchlist of executives raises severity to High whenever one of them is a mapped entity.",
  "tip": "Choose an automation rule for in-Sentinel changes (owner, status, severity, tags, tasks). Choose a playbook when the scenario mentions an external system, enrichment API, email, Teams or ticketing. Automation rules are often what runs the playbook.",
  "check": [
   [
    "Which playbook trigger type is recommended so the playbook can be run from automation rules?",
    "The Microsoft Sentinel incident trigger."
   ],
   [
    "How do you use a watchlist named VIPUsers in a query?",
    "Call _GetWatchlist('VIPUsers') and join or filter on its search key column."
   ],
   [
    "What does enabling UEBA add to investigations?",
    "Behavioral baselines, anomaly insights on entity pages and tables such as BehaviorAnalytics and IdentityInfo."
   ]
  ]
 },
 {
  "t": "Defender portal incident queue: triage, assignment, attack story, alert correlation, linking alerts and merging incidents, classification and determination",
  "body": [
   "An alert is a single detection. An incident is a collection of related alerts and the evidence behind them that together tell the story of one attack. Defender XDR automatically correlates alerts from endpoint, identity, email, cloud apps and, with Sentinel onboarded, SIEM sources into incidents, based on shared entities such as the same user, device, file or IP address, and on timing. Working at the incident level saves time and shows the whole attack instead of fragments.",
   "The incident queue is your starting point. You filter and sort by severity, status, service source, tags, assigned to, or time. Triage means deciding quickly which incidents need attention first: high severity, multiple sources, sensitive assets, or a tag such as attack disruption. Assign the incident to yourself or a colleague so work is not duplicated, and set the status to In progress.",
   "Opening an incident shows the attack story: a timeline of the alerts, an incident graph of how users, devices, files and IP addresses connect, and details of each alert with its process tree. Other tabs list the assets (devices, users, mailboxes, apps), the automated investigations, and the evidence and response items with their verdicts. A summary panel shows the incident's scope and, where licensed, a Security Copilot summary. You can add comments and tags so later analysts see your reasoning.",
   "Correlation is not always perfect. If an alert clearly belongs to another incident, you can link it to that incident from the alert page. You can also merge incidents that turn out to be the same attack, which moves their alerts into one incident and closes the others. Conversely, you can move an unrelated alert out into a new incident. Keeping one incident per attack keeps metrics and response coherent.",
   "When you resolve an incident, set a classification and a determination. The classifications are True positive, Informational expected activity, and False positive. Determinations give the detail. For true positives, examples include multistage attack, malware, phishing, compromised account and malicious user activity. For informational expected activity, examples are security testing, line-of-business application and confirmed activity. For false positives, examples are not malicious and not enough data to validate. Sentinel in the Azure portal uses similar terms: true positive, benign positive (suspicious but expected), false positive and undetermined.",
   "Correct classification matters. It feeds tuning: many false positives from one rule means the rule needs work, while expected activity such as an authorized penetration test should not be marked false positive, because the detection worked correctly. Classifications also help Microsoft improve detections and your team report honest metrics."
  ],
  "terms": [
   [
    "Incident",
    "A group of correlated alerts and evidence that represents one attack or related activity."
   ],
   [
    "Attack story",
    "The incident view that shows the alert timeline, an incident graph and alert details."
   ],
   [
    "Classification",
    "The resolution verdict: true positive, informational expected activity or false positive."
   ],
   [
    "Determination",
    "The detailed reason under a classification, such as phishing, security testing or not malicious."
   ]
  ],
  "example": "Two incidents appear ten minutes apart: one for a phishing email, one for suspicious PowerShell on the same user's laptop. The Tier-1 analyst sees the shared user and device, merges them into one incident, assigns it to herself, isolates the laptop, and after cleanup resolves it as a true positive with a phishing determination.",
  "tip": "An authorized penetration test or red-team exercise is informational expected activity with a security testing determination (benign positive in Sentinel), not a false positive. False positive means the detection logic or data was wrong.",
  "check": [
   [
    "What do you do when an alert in one incident clearly belongs to another incident?",
    "Link it to the correct incident from the alert page, or merge the incidents if they are the same attack."
   ],
   [
    "How should a detection of an approved admin tool be classified?",
    "Informational expected activity with a determination such as line-of-business application or confirmed activity."
   ],
   [
    "Why does Defender XDR group alerts into incidents?",
    "So analysts see a whole attack in one place, based on shared entities and timing, instead of chasing separate alerts."
   ]
  ]
 },
 {
  "t": "Defender for Endpoint response: isolate device, restrict app execution, run antivirus scan, collect investigation package, live response, stop and quarantine file, file indicators, device timeline",
  "body": [
   "When an endpoint is involved in an incident, Defender for Endpoint gives you response actions on the device page and on file pages. Knowing which one fits the situation is a core SC-200 skill.",
   "Isolate device cuts the machine off from the network while keeping its connection to the Defender service, so you can still investigate and run actions. Full isolation blocks everything else; selective isolation allows Outlook, Teams and similar apps to keep working for some platforms. Isolation stops lateral movement, data theft and command-and-control. Restrict app execution is different: the device stays on the network, but only code signed by Microsoft can run. It suits a case where the user must keep working and the threat is an unsigned tool. Both actions are reversible from the device page.",
   "Run antivirus scan starts a quick or full Microsoft Defender Antivirus scan remotely. Collect investigation package gathers forensic data into a zip file: running processes, network connections, scheduled tasks, services, autoruns, installed programs, security event logs and more. It is a fast way to get a snapshot before the device is reimaged.",
   "Live response opens a remote shell session on the device from the portal. Live response must be turned on in the advanced features settings (servers have a separate toggle). Basic commands, which are read-only, let you list processes, view files and collect files with getfile. Advanced commands, which need the advanced live response permission in your role, let you upload files and scripts to the library with putfile, run library scripts with run, and remediate files; running unsigned scripts needs a separate setting. All commands are logged. Use live response when you need detail no standard action gives you, such as pulling a specific log.",
   "For a malicious file, stop and quarantine file kills the running processes and moves the file to quarantine on the devices where it was seen. Add indicator creates a file hash indicator with an action such as block execution or block and remediate, so the file cannot run anywhere in the tenant. You can also download the file for analysis or submit it for deep analysis in a sandbox. For network indicators, remember that network protection must be on.",
   "The device timeline shows the device's events in time order: process starts, network connections, file changes, logons and registry changes, with alerts marked. You can filter, search, and flag events of interest. It is where you reconstruct what happened before and after an alert. The same data is in advanced hunting tables such as DeviceProcessEvents, which helps when you need to search across many devices.",
   "Actions you take appear in the Action center, so they can be reviewed and undone. Access to these actions depends on your role and the device group, so a Tier-1 analyst may be able to run scans but not live response."
  ],
  "terms": [
   [
    "Isolate device",
    "Disconnects a device from the network except for the Defender service connection."
   ],
   [
    "Restrict app execution",
    "Allows only Microsoft-signed code to run on a device while it stays connected."
   ],
   [
    "Investigation package",
    "A zip of forensic data (processes, connections, autoruns, logs) collected remotely from a device."
   ],
   [
    "Live response",
    "A remote shell session into a device for collecting files and running approved scripts."
   ]
  ],
  "example": "A laptop shows ransomware-like file renames. The analyst isolates it immediately, collects an investigation package, uses stop and quarantine file on the encryptor, and adds a block and remediate hash indicator so the file cannot run on other devices. The device timeline shows the file arrived from an email attachment ten minutes before the alert.",
  "tip": "Isolation versus restrict app execution is a classic pair: active spread or command-and-control means isolate; user must keep working and the tool is unsigned means restrict app execution. A tenant-wide block is a file indicator, not quarantine on one device.",
  "check": [
   [
    "Which action keeps a device on the network but allows only Microsoft-signed code to run?",
    "Restrict app execution."
   ],
   [
    "What must be enabled to run your own uploaded scripts in live response?",
    "Live response turned on in settings, a role with advanced live response permissions to upload (putfile) and run scripts, plus the unsigned script execution setting if the scripts are unsigned."
   ],
   [
    "How do you stop a malicious file from running on every device in the tenant?",
    "Create a file hash indicator with block execution or block and remediate."
   ]
  ]
 },
 {
  "t": "Action center: pending and completed remediation actions; automatic attack disruption of compromised users and devices",
  "body": [
   "The Action center in the Defender portal is one place to see remediation actions across Defender XDR, whether an analyst took them manually or automated investigation and response (AIR) proposed them. It has two tabs. Pending lists actions that are waiting for approval. History lists actions that were completed, failed, rejected or undone, with who approved them and when.",
   "Why do actions wait? Each device group has an automation level. Full remediation means automated investigations fix threats automatically. Semi-automated levels require approval for some or all remediation, for example approval for any folders or approval only for core folders. No automated response means investigations do not run remediation. In Defender for Office 365, email remediation found by automated investigations, such as soft-deleting a phishing message from many mailboxes, also waits in the Pending tab for approval. Reviewing Pending regularly matters because a threat is not contained until someone approves.",
   "From an action you can approve or reject it, open the related investigation to see the evidence, and in History undo actions that can be undone, such as releasing a quarantined file or ending device isolation. Action types include quarantine file, remove persistence, stop process, isolate device, soft delete email, and more. The History tab also serves as an audit trail for who did what during an incident.",
   "Automatic attack disruption is a Defender XDR capability for high-confidence, in-progress attacks such as human-operated ransomware, business email compromise and adversary-in-the-middle phishing. It correlates signals across products, and when it is confident an attack is happening it contains assets automatically, for example by containing a device so other devices stop talking to it, disabling a compromised user account in Active Directory through Defender for Identity, or containing a user so the account cannot be used for lateral movement. Suspending session activity in cloud apps is another possible action. The incident is tagged Attack Disruption so analysts spot it immediately.",
   "Attack disruption depends on the products being deployed and configured: for example, Defender for Endpoint with automated response, and Defender for Identity for account disable. You can exclude specific users or devices, such as critical service accounts, from automatic containment. After the analyst has investigated and remediated, they release the contained device or re-enable the user from the Action center or the asset page.",
   "The value is speed: ransomware can spread in minutes, faster than any human SOC can respond. Attack disruption buys time; the analyst still investigates, remediates the root cause and resets credentials."
  ],
  "terms": [
   [
    "Action center",
    "The Defender portal page listing pending and completed remediation actions across Defender XDR."
   ],
   [
    "Automation level",
    "A device group setting that decides whether remediation runs automatically or waits for approval."
   ],
   [
    "Automatic attack disruption",
    "High-confidence automatic containment of compromised devices and users during an active attack."
   ],
   [
    "Contain user",
    "An attack disruption action that stops a compromised account from being used to move laterally."
   ]
  ],
  "example": "At 2 a.m., Defender XDR sees a compromised admin account pushing a suspicious binary to many servers. Attack disruption contains the source device and disables the account in Active Directory. When the on-call analyst logs in, the incident is tagged Attack Disruption; after investigating, she resets the account, removes the binary and releases containment from the Action center.",
  "tip": "If remediation 'did not happen', check the Pending tab: the device group's automation level probably required approval. Attack disruption is automatic and high-confidence; it does not wait for approval.",
  "check": [
   [
    "Where do you approve an automated investigation's pending remediation?",
    "In the Action center's Pending tab."
   ],
   [
    "Name two containment actions automatic attack disruption can take.",
    "Contain a device, and disable or contain a compromised user account."
   ],
   [
    "How do you prevent a critical service account from being disabled by attack disruption?",
    "Add it to the automated response exclusions for attack disruption."
   ]
  ]
 },
 {
  "t": "Defender for Office 365: Threat Explorer, removing delivered phishing, user-reported messages and Submissions",
  "body": [
   "When a phishing campaign lands, the first questions are who received it, who clicked, and how to get it out of mailboxes. Defender for Office 365 (MDO) answers these in the Defender portal.",
   "Threat Explorer (in MDO Plan 2) is an interactive tool to search and act on email. Views include All email, Malware, Phish and Content malware, and you can filter by sender, sender domain, recipient, subject, URL, file hash, delivery action and delivery location (inbox, junk, quarantine, deleted). A related Campaigns view groups messages that belong to the same coordinated attack. MDO Plan 1 has a simpler tool called Real-time detections that lacks some actions. Threat Explorer also shows URL click data from Safe Links, so you can see who clicked a malicious link and whether it was blocked.",
   "To remove delivered phishing, select the messages in Threat Explorer and choose Take action. Options include move to junk, move to deleted items, soft delete (the user can still recover it from Recoverable Items), hard delete (removed from the mailbox), move to inbox for false positives, and submit to Microsoft. You can also start an automated investigation. Remediation actions from Threat Explorer are recorded in the Action center, where they can be tracked and approved. Zero-hour auto purge (ZAP) does something similar automatically: when a message already delivered is later judged malicious, ZAP moves it to junk or quarantine.",
   "Users are an important sensor. With the built-in Report button in Outlook, users report messages as phishing, junk or not junk. The user reported settings decide where reports go: to Microsoft, to a reporting mailbox you choose, or both. Reported messages appear on the Submissions page under the User reported tab, where analysts review them, mark them, and optionally notify the user of the result. User reports can also trigger automated investigations.",
   "The Submissions page is also where admins submit items to Microsoft for analysis: emails, email attachments, URLs, files and Teams messages. You submit a false negative (malicious mail that got through) or a false positive (good mail that was blocked), and Microsoft returns a verdict. For false positives you can also create allow entries in the Tenant Allow/Block List, and for false negatives you can add block entries for senders, URLs or files.",
   "A good phishing response sequence: find all copies in Threat Explorer, check URL clicks, remove the messages, block the sender and URL, submit samples, and check whether any recipient entered credentials, which turns the incident into an identity investigation."
  ],
  "terms": [
   [
    "Threat Explorer",
    "An MDO Plan 2 tool for searching, analyzing and remediating email across the tenant."
   ],
   [
    "Soft delete",
    "Removing a message from the mailbox into Recoverable Items, where it can still be restored."
   ],
   [
    "Submissions",
    "The Defender portal page for user-reported messages and admin submissions of email, files and URLs to Microsoft."
   ],
   [
    "Zero-hour auto purge (ZAP)",
    "Automatic removal of already delivered messages later found to be malicious."
   ]
  ],
  "example": "Forty employees receive a fake payroll email, and three report it with the Report button. The analyst opens the report on the Submissions page, pivots to Threat Explorer by subject and sender, finds all forty copies, soft deletes them, sees two users clicked the link, blocks the sender domain in the Tenant Allow/Block List, and opens an identity investigation for the two users.",
  "tip": "Threat Explorer is Plan 2; Real-time detections is Plan 1. The remediation you take from Threat Explorer shows up in the Action center. Soft delete is recoverable; hard delete is not.",
  "check": [
   [
    "Where do messages users report with the Report button appear for analysts?",
    "On the Submissions page, under the User reported tab, and in the reporting mailbox if configured."
   ],
   [
    "How do you find which users clicked a malicious URL?",
    "Use Threat Explorer's URL click data (from Safe Links) filtered on that URL."
   ],
   [
    "What is the difference between soft delete and hard delete?",
    "Soft delete moves the message to Recoverable Items, where the user can restore it; hard delete removes it completely."
   ]
  ]
 },
 {
  "t": "Defender for Identity alerts: DCSync, Golden Ticket, pass-the-hash; lateral movement paths; KRBTGT reset",
  "body": [
   "Defender for Identity (MDI) raises alerts for classic Active Directory attacks. You don't need to know how to perform them, but you must recognize them, understand what the attacker gained, and know the correct response.",
   "DCSync abuses directory replication. Domain controllers legitimately replicate with each other using the Directory Replication Service (DRS) protocol. An attacker with an account holding replication rights (such as Domain Admins, or an account given the 'Replicating Directory Changes All' permission) asks a domain controller to replicate password data, from a machine that is not a domain controller. MDI alerts on 'Suspected DCSync attack (replication of directory services)' because replication requests from a non-DC are abnormal. The response is to find how the attacker got the privileged account, remove any unexpected replication permissions, reset affected credentials and treat any obtained hashes as compromised.",
   "A Golden Ticket is a forged Kerberos ticket-granting ticket (TGT). If an attacker steals the hash of the KRBTGT account, the account that signs all TGTs in the domain, they can create TGTs for any user, with any group memberships and long lifetimes, without ever touching a password. MDI detects signs of forged tickets, such as encryption downgrades, tickets for nonexistent accounts, time anomalies and forged authorization data. A Golden Ticket means the domain is fully compromised.",
   "Pass-the-hash uses a stolen NTLM password hash to authenticate as a user without knowing the password. Pass-the-ticket does the same with a stolen Kerberos ticket. MDI flags 'Suspected identity theft (pass-the-hash)' or pass-the-ticket when a user's credentials appear on a device where that user is not logged on. Response: isolate the source device, reset the user's password, and investigate how the hash was stolen, often through credential dumping from LSASS.",
   "Lateral movement paths (LMPs) show how an attacker could get from a non-sensitive account to a sensitive one by chaining sessions and local admin rights. For example, a helpdesk user is local admin on a workstation where a domain admin has logged on, so compromising the helpdesk user could expose the domain admin's credentials. MDI shows LMPs on user and device pages and in reports. You reduce them by removing unnecessary local admin rights, using tiered admin models and Local Administrator Password Solution (LAPS), and stopping privileged accounts from signing in to ordinary workstations.",
   "Recovering from a Golden Ticket requires resetting the KRBTGT password twice. Active Directory keeps the current and previous KRBTGT password, and tickets signed with either remain valid, so one reset is not enough. Wait for replication across all domain controllers between the two resets, and plan the resets carefully because they can break existing sessions. First remove the attacker's access, or they will steal the new hash too."
  ],
  "terms": [
   [
    "DCSync",
    "An attack that impersonates a domain controller to request password data via directory replication."
   ],
   [
    "Golden Ticket",
    "A forged Kerberos TGT created with the stolen KRBTGT hash, granting access as any user."
   ],
   [
    "Pass-the-hash",
    "Authenticating with a stolen NTLM hash instead of the password."
   ],
   [
    "Lateral movement path",
    "A chain of sessions and admin rights that lets an attacker move from a low-value account to a sensitive one."
   ]
  ],
  "example": "MDI raises 'Suspected DCSync attack' from a workstation using a service account that someone granted replication rights years ago. The SOC isolates the workstation, removes the replication permissions, resets the service account and all privileged passwords, and, because the KRBTGT hash may have been taken, performs two KRBTGT resets separated by full replication.",
  "tip": "KRBTGT is reset twice because AD accepts tickets signed with the current or the previous password. DCSync is recognized by replication requests coming from a machine that is not a domain controller.",
  "check": [
   [
    "Why is a single KRBTGT reset not enough after a Golden Ticket attack?",
    "Tickets signed with the previous KRBTGT password remain valid, so you reset twice, allowing replication in between."
   ],
   [
    "What makes replication traffic suspicious enough for a DCSync alert?",
    "It comes from a device that is not a domain controller using an account with replication rights."
   ],
   [
    "How do you reduce lateral movement paths?",
    "Remove unnecessary local admin rights, use LAPS and tiered administration, and keep privileged accounts off ordinary workstations."
   ]
  ]
 },
 {
  "t": "Microsoft Entra ID Protection: risky users and sign-ins, confirm user compromised, revoking sessions; MFA fatigue response",
  "body": [
   "Microsoft Entra ID Protection uses signals from Microsoft's identity systems to judge how likely it is that a sign-in or an account is compromised. It has two kinds of risk. Sign-in risk is the probability that a particular sign-in was not made by the account owner, for example from an anonymous IP address, an unfamiliar location, or a token that looks replayed. User risk is the probability that the account itself is compromised, for example because its credentials were found leaked, or because of a pattern of risky sign-ins. Risk levels are low, medium and high. Some detections are real-time, calculated during sign-in, and others are offline, calculated afterward.",
   "Analysts work from the Risky users, Risky sign-ins and Risk detections reports in the Microsoft Entra admin center, and ID Protection alerts also flow into Defender XDR incidents. For a risky user you can see the detections behind the risk, their sign-in history and their risk state. Full ID Protection features require Microsoft Entra ID P2 licensing.",
   "Your actions give feedback to the system. Confirm user compromised sets the user risk to high, which triggers any risk-based policies and tells the model this pattern was real. Confirm sign-in compromised does the same for one sign-in. Confirm user safe or confirm sign-in safe tells the system it was a false positive. Dismiss user risk clears the risk without saying whether it was real, which is appropriate after remediation such as a password reset. A secure password reset by the user through a risk-based policy also remediates user risk automatically.",
   "Resetting a password is not enough if the attacker holds a session token. Refresh tokens and session cookies can stay valid, so you must also revoke sessions. In the Entra admin center you choose Revoke sessions on the user; with PowerShell you use the Microsoft Graph revoke sign-in sessions command. This forces the user, and the attacker, to authenticate again. In Defender XDR, marking a user as compromised or disabling the account are also available actions.",
   "Risk-based Conditional Access policies automate the response: for example, require multifactor authentication (MFA) when sign-in risk is medium or high, and require a secure password change or block access when user risk is high.",
   "MFA fatigue (also called MFA bombing or push spam) is when an attacker who already has a user's password sends repeated push approval requests, hoping the user taps Approve to make them stop. Defenses include number matching, where the user must type a number shown on the sign-in screen, and showing application name and location in the notification. When users receive unexpected prompts, they should deny and use Report suspicious activity, which marks the user as high risk in ID Protection. The SOC response is to treat the password as compromised: reset it, revoke sessions, review sign-ins and MFA method changes, and move the user to phishing-resistant methods such as passkeys or FIDO2 security keys."
  ],
  "terms": [
   [
    "Sign-in risk",
    "The likelihood that a specific sign-in was not performed by the legitimate user."
   ],
   [
    "User risk",
    "The likelihood that the account itself is compromised, such as from leaked credentials."
   ],
   [
    "Revoke sessions",
    "Invalidating a user's refresh tokens and session cookies so all sessions must re-authenticate."
   ],
   [
    "Number matching",
    "An MFA push setting that requires typing a displayed number, defeating blind approvals in MFA fatigue attacks."
   ]
  ],
  "example": "A user reports twenty MFA prompts at midnight. ID Protection shows the account as high risk after the user chose Report suspicious activity. The analyst confirms the user compromised, resets the password, revokes sessions, removes an MFA method the attacker had added, and checks the mailbox for new inbox rules before closing the incident.",
  "tip": "Password reset plus revoke sessions is the usual correct answer for token theft. Confirm compromised raises risk to high and trains the model; dismiss only clears risk.",
  "check": [
   [
    "Why revoke sessions after resetting a compromised user's password?",
    "Existing refresh tokens and session cookies may still be valid; revoking forces re-authentication."
   ],
   [
    "What does Confirm user compromised do?",
    "It sets user risk to high, triggers risk-based policies and feeds back to the detection model."
   ],
   [
    "What control most directly defeats MFA fatigue?",
    "Number matching in the authenticator push, along with moving users to phishing-resistant MFA."
   ]
  ]
 },
 {
  "t": "Defender for Cloud Apps: impossible travel and other anomaly alerts, OAuth app risk and revoking app consent",
  "body": [
   "Microsoft Defender for Cloud Apps is Microsoft's cloud access security broker (CASB). It connects to cloud services such as Microsoft 365 and other software-as-a-service apps through APIs, discovers shadow IT from network logs, and applies policies to user activity. For the SOC, its most important outputs are anomaly detection alerts and visibility into OAuth apps.",
   "Anomaly detection policies are built in and turned on by default. They learn each user's normal behavior over an initial learning period, then alert on deviations. Impossible travel fires when the same user signs in from two locations so far apart that nobody could travel between them in the time elapsed, which suggests a stolen credential used from another country. It has known sources of false positives, such as VPNs and corporate proxies, so the policy can be tuned and known IP ranges can be tagged as corporate. Other anomaly alerts include activity from infrequent country, activity from anonymous IP addresses, activity from suspicious IP addresses, mass download, mass deletion, ransomware activity (many file uploads with unusual extensions), unusual file sharing, and suspicious inbox manipulation rules such as forwarding mail to an outside address or moving messages to hidden folders.",
   "These alerts feed Defender XDR incidents. Investigating means checking the user's activity log, sign-in details, IP address reputation, and what happened after the anomaly: new inbox rules, downloads, sharing links or app consents. Response options include suspending the user, requiring re-sign-in, and confirming the user compromised in ID Protection.",
   "OAuth is the protocol that lets an app access data on a user's behalf after the user (or an admin) grants consent. Attackers exploit this with consent phishing: they send a link that asks the user to grant a malicious app permissions such as reading mail. No password is stolen, so password resets do not remove the access. Defender for Cloud Apps, with app governance, shows OAuth apps with their permission level, publisher, how many users consented and community use. Apps with high privileges, unverified publishers and few users are suspicious.",
   "To respond, you can ban the app in Defender for Cloud Apps, which revokes its permissions and prevents future consent, or revoke the consent and delete the service principal or enterprise application in Microsoft Entra ID. Also review what the app accessed using audit logs. To prevent recurrence, restrict user consent in Entra ID so users can only consent to apps from verified publishers with low-risk permissions, and use the admin consent workflow for everything else.",
   "Policies you create yourself, such as activity policies and OAuth app policies, complement the built-in anomaly detections."
  ],
  "terms": [
   [
    "Impossible travel",
    "An anomaly alert for sign-ins from distant locations within a time that makes physical travel impossible."
   ],
   [
    "OAuth app consent",
    "Permission a user or admin grants an app to access data on their behalf."
   ],
   [
    "Consent phishing",
    "Tricking users into granting a malicious app OAuth permissions, bypassing password controls."
   ],
   [
    "Ban app",
    "A Defender for Cloud Apps action that revokes an OAuth app's permissions and blocks new consent."
   ]
  ],
  "example": "Defender for Cloud Apps shows that 12 users consented to an unverified app requesting full mailbox access, and one of them has a suspicious inbox forwarding rule. The analyst bans the app, removes the enterprise application in Entra ID, deletes the forwarding rule, and changes the tenant's user consent settings to verified publishers only.",
  "tip": "Resetting a password does not remove a malicious OAuth grant. The answer is to revoke consent or ban the app, then restrict user consent.",
  "check": [
   [
    "What is a common false-positive cause for impossible travel?",
    "VPNs or corporate proxies that make sign-ins appear from distant locations."
   ],
   [
    "Why doesn't a password reset stop a malicious OAuth app?",
    "The app holds its own consented tokens, which remain valid until consent is revoked."
   ],
   [
    "How can you reduce future consent phishing?",
    "Restrict user consent to verified publishers and low-risk permissions and require admin consent for others."
   ]
  ]
 },
 {
  "t": "Microsoft Purview: DLP and insider risk alerts in the Defender portal; Purview Audit (unified audit log) searches",
  "body": [
   "Microsoft Purview is Microsoft's data security and compliance family. Two of its products produce alerts that SOC analysts handle in the Defender portal, and one of its tools, Audit, is a key source of evidence in almost every Microsoft 365 investigation.",
   "Data loss prevention (DLP) policies detect sensitive information, such as credit card numbers or files with a sensitivity label, being shared, emailed, uploaded or copied in ways the policy forbids. They can apply to Exchange, SharePoint, OneDrive, Teams, endpoints and more. When a policy match generates an alert, the alert appears in the Purview DLP alerts page and also in the Defender XDR incident queue, where it can be correlated with other alerts. For example, a DLP alert for mass upload of customer data can join an incident with an impossible travel alert for the same user. Analysts need the right Purview roles to view DLP alert content, because it may contain sensitive data.",
   "Insider risk management detects risky activity by users inside the organization, such as a departing employee downloading large amounts of data or a user exfiltrating to personal cloud storage. It uses policy templates (for example data theft by departing users) and indicators. Because insider cases are sensitive, user names are pseudonymized by default so investigators see an alias until authorized to reveal identity. Insider risk alerts can be shown in the Defender portal and correlated into incidents, and cases are managed with human resources and legal involvement.",
   "Purview Audit records user and admin activity across Microsoft 365 in the unified audit log: file access and sharing, mailbox actions, Entra ID changes, Teams events, admin configuration changes and more. Auditing is on by default for most organizations. Audit (Standard) keeps records for a standard retention period; Audit (Premium) adds longer retention, custom audit log retention policies and extra high-value events. MailItemsAccessed, which shows which mail items were read and matters in email compromise investigations, was once Premium-only but Microsoft has since made it available with Audit (Standard) as well.",
   "You search the audit log in the Purview portal's Audit page by date range, activities, users, record types and workloads, then export the results. Searches run as jobs and can take some time to complete. Administrators and scripts can also use the Search-UnifiedAuditLog cmdlet in Exchange Online PowerShell. Common SOC questions answered by audit searches: who created this inbox forwarding rule, when was this file shared externally, which admin changed this setting, and which messages did the attacker read.",
   "Sentinel and Defender XDR can also receive much of this data through the Microsoft 365 and Office 365 connectors, but the unified audit log remains the authoritative, broad source."
  ],
  "terms": [
   [
    "Data loss prevention (DLP)",
    "Purview policies that detect and control sharing of sensitive information across services and endpoints."
   ],
   [
    "Insider risk management",
    "Purview capability that detects risky user activity such as data theft by departing employees."
   ],
   [
    "Unified audit log",
    "Purview Audit's record of user and admin activities across Microsoft 365 services."
   ],
   [
    "MailItemsAccessed",
    "A mailbox audit event, now available in Audit (Standard) as well as Premium, that shows which mailbox items were accessed."
   ]
  ],
  "example": "A salesperson gives notice, and a week later an insider risk alert shows large downloads from SharePoint alongside a DLP alert for customer lists uploaded to a personal cloud drive. The analyst sees both correlated into one Defender incident, runs an audit log search on the user's FileDownloaded and FileUploaded events, and hands the evidence to HR and legal under the insider risk case.",
  "tip": "Questions asking 'who did what, when' in Microsoft 365 point to a Purview Audit search. 'Which emails did the attacker read' points to the MailItemsAccessed audit event.",
  "check": [
   [
    "Why are users pseudonymized in insider risk alerts?",
    "To protect privacy until an authorized investigator needs to reveal identity."
   ],
   [
    "How do you find who created a malicious inbox rule?",
    "Search the unified audit log in Purview Audit for inbox rule activities for that mailbox."
   ],
   [
    "Where can a SOC analyst see DLP alerts next to other security alerts?",
    "In the Defender portal incident queue, where DLP alerts are correlated into incidents."
   ]
  ]
 },
 {
  "t": "Defender for Cloud security alerts: alert details, the Take action tab, triggering automation",
  "body": [
   "When a Defender for Cloud workload plan detects a threat, such as suspicious process execution on a VM, anonymous access to a storage account, a SQL injection attempt or a suspicious Resource Manager operation, it raises a security alert. Alerts appear in Defender for Cloud's Security alerts page and, through the integration with Defender XDR, in the Defender portal incident queue. They can also flow to Sentinel through its Defender for Cloud connector.",
   "Each alert has severity (high, medium, low or informational), a status (active, in progress, resolved or dismissed), the affected resource, the MITRE ATT&CK tactics, the time, and a description. The alert details tab explains what was detected and shows related entities: the host, account, process command line, IP address, file or storage blob. Where alerts are linked, Defender for Cloud may group them as a security incident.",
   "The Take action tab is the exam's favorite part. It is split into sections. Inspect resource context opens the resource's logs and activity around the time of the alert. Mitigate the threat gives manual remediation steps for this specific alert. Prevent future attacks lists security recommendations for the resource that would reduce the chance of recurrence, such as enabling endpoint protection or restricting network access. Trigger automated response lets you run a Logic App on this alert right now. Suppress similar alerts creates a suppression rule for alerts that are expected in your environment, with conditions and an expiration date.",
   "For automation at scale, Defender for Cloud has workflow automation. You create a workflow automation that runs a Logic App when an alert, recommendation or regulatory compliance change matches conditions you set, such as alert severity or name. Typical uses are opening a ticket, emailing a resource owner, or isolating a VM. The Logic App needs a trigger from the Defender for Cloud connector (for alerts or recommendations). Alternatively, you continuously export alerts to Event Hubs or a Log Analytics workspace and act on them from there, or let Sentinel automation handle them.",
   "Alert suppression rules in Defender for Cloud work like alert tuning in Defender XDR: they hide or auto-dismiss alerts that match conditions, and should be narrow and time-limited. Dismissing an alert changes its status only; it does not fix the underlying problem.",
   "A good workflow: read the alert details, inspect resource context, follow the mitigation steps, apply the prevention recommendations, and set the status to resolved with notes. If the alert was an authorized test, suppress narrowly rather than disabling the plan."
  ],
  "terms": [
   [
    "Take action tab",
    "The alert tab with sections to inspect context, mitigate, prevent recurrence, trigger automation and suppress similar alerts."
   ],
   [
    "Workflow automation",
    "A Defender for Cloud feature that runs a Logic App automatically when alerts or recommendations match conditions."
   ],
   [
    "Suppression rule",
    "A rule that hides or dismisses expected alerts matching conditions, with an optional expiration."
   ],
   [
    "Continuous export",
    "Streaming Defender for Cloud alerts and recommendations to Event Hubs or a Log Analytics workspace."
   ]
  ],
  "example": "Defender for Storage alerts on access to a storage account from a Tor exit node. The analyst opens Take action, inspects the storage logs around the time, follows the mitigation to regenerate the account keys, and under Prevent future attacks applies the recommendation to disable public network access. She then builds a workflow automation that emails the storage owners for all high-severity storage alerts.",
  "tip": "Run a Logic App on one alert now: Trigger automated response on the Take action tab. Run it every time automatically: workflow automation. Stop expected alerts: suppression rule.",
  "check": [
   [
    "Which Take action section lists recommendations to stop the alert recurring?",
    "Prevent future attacks."
   ],
   [
    "How do you automatically run a Logic App for every high-severity Defender for Cloud alert?",
    "Create a workflow automation with a severity condition that triggers the Logic App."
   ],
   [
    "Does dismissing an alert remediate the threat?",
    "No. It only changes the status; you must still mitigate and fix the underlying issue."
   ]
  ]
 },
 {
  "t": "Sentinel incidents: investigation graph, entity pages and UEBA insights, running playbooks on demand, incident tasks, closing with the right classification",
  "body": [
   "A Sentinel incident groups alerts from analytics rules together with their mapped entities. In the Azure portal you work incidents from the Incidents page; in the Defender portal, Sentinel incidents appear in the same unified queue as Defender XDR incidents. The steps are the same idea: assign, investigate, respond, document and close.",
   "The incident page shows a summary, the alerts, the entities, a timeline of alerts and bookmarks, similar incidents, and top insights from UEBA. Comments and activity log keep a record of everything done. You can change severity, status and owner, and add tags.",
   "The investigation graph (in the Azure portal experience) is a visual map of the incident's entities: accounts, hosts, IPs, URLs, files and alerts. From any entity you can run exploration queries, such as 'related alerts' or 'processes on this host', that add new nodes to the graph. The timeline lets you see the order of events. This is how you expand scope and find other affected assets. In the Defender portal, the incident graph and attack story serve the same purpose. The investigation graph only works well when analytics rules map entities; unmapped data does not appear.",
   "Entity pages show everything Sentinel knows about one entity: a timeline of alerts and activities, related entities, and UEBA insights. Insights include things like whether the user's activity is unusual compared to themselves or their peers, first-time actions, and sign-in patterns. If UEBA is enabled, the BehaviorAnalytics table scores each activity with an investigation priority, which helps you decide what to look at first.",
   "You can run playbooks on demand. On the incident, choose Run playbook to launch any incident-trigger playbook, for example to enrich all IPs or to post the incident to a ticketing system. From an entity, you can run entity-trigger playbooks, such as disabling a user or blocking an IP on the firewall. From an alert, you can run alert-trigger playbooks. The analyst needs the Playbook Operator role, and Sentinel needs Automation Contributor on the playbook's resource group.",
   "Incident tasks show the checklist added by automation rules or playbooks, or you can add tasks manually. Mark each complete as you go so others see progress.",
   "Close the incident with the right classification. In Sentinel the options are true positive (suspicious activity), benign positive (suspicious but expected), false positive (incorrect alert logic or incorrect data) and undetermined, plus a comment. Accurate classification helps tune rules and produces meaningful SOC metrics, such as how many incidents were real attacks."
  ],
  "terms": [
   [
    "Investigation graph",
    "A visual map of an incident's entities where exploration queries add related entities and alerts."
   ],
   [
    "Entity page",
    "A page that shows an entity's alerts, activity timeline, related entities and UEBA insights."
   ],
   [
    "Benign positive",
    "A Sentinel classification for activity that was correctly detected but expected, such as an approved test."
   ],
   [
    "Playbook Operator",
    "A Sentinel role that allows running playbooks manually."
   ]
  ],
  "example": "A Sentinel incident flags a service account logging on interactively to ten servers. The analyst opens the account's entity page, where UEBA shows this is the first time the account has done so. In the investigation graph she explores 'related alerts' and finds a password spray alert from the same IP. She runs a playbook to disable the account, completes the incident tasks and closes it as a true positive.",
  "tip": "If entities are missing from the investigation graph, the fix is entity mapping in the analytics rule. For an authorized test, close as benign positive; false positive means the rule or data was wrong.",
  "check": [
   [
    "Why might an incident's investigation graph show no hosts?",
    "The analytics rule did not map any Host entities."
   ],
   [
    "Which playbook trigger lets you disable one user from its entity page?",
    "An entity trigger playbook run on demand."
   ],
   [
    "What Sentinel classification fits a red team exercise that the rule correctly detected?",
    "Benign positive."
   ]
  ]
 },
 {
  "t": "Microsoft Security Copilot embedded in the Defender portal: incident summaries, guided response, script analysis",
  "body": [
   "Microsoft Security Copilot is a generative AI assistant for security teams. Besides its standalone portal, it is embedded directly into the Microsoft Defender portal, where it appears in a side panel on incidents, alerts, devices, users and hunting pages. It runs on capacity your organization provisions, measured in security compute units (SCUs), and users need appropriate access to both Copilot and the underlying Defender data. Copilot only sees data the signed-in user is allowed to see.",
   "Incident summaries are the most visible feature. When you open an incident, Copilot can produce a short narrative: what happened, in what order, which users, devices and mailboxes are involved, what attack stages (mapped to MITRE ATT&CK) were seen, and what has already been remediated. This saves a Tier-1 analyst the time of reading every alert and helps with handoffs between shifts.",
   "Guided response gives recommended actions for the incident, grouped into categories such as triage, containment, investigation and remediation. Examples are classifying the incident, isolating a device, resetting a user's password or reviewing similar incidents. Many recommendations have buttons that run the action directly, with the usual permissions. The analyst still decides; guided response suggests, it does not act on its own.",
   "Script analysis explains suspicious command lines and scripts, such as obfuscated PowerShell, batch files or bash, found in alert evidence. It decodes and describes what the script tries to do, for example download a file, create persistence or disable security tools, and highlights indicators such as URLs and IP addresses. File analysis similarly summarizes a suspicious file's characteristics. These features help analysts who are not malware specialists understand evidence quickly.",
   "Other embedded capabilities include generating KQL queries from natural-language questions in advanced hunting, creating an incident report that documents actions and timeline, and summarizing device or identity information. Microsoft is also adding Security Copilot agents that do specific tasks autonomously under defined permissions, such as triaging user-reported phishing and explaining their verdicts.",
   "Use Copilot responsibly. Treat its output as a helpful draft: verify facts against the evidence, check generated KQL before using it in a detection, and remember that AI can be wrong or incomplete. The exam expects you to know where Copilot helps (summaries, guided response, script and file analysis, query generation, reports) and that the analyst remains accountable for decisions."
  ],
  "terms": [
   [
    "Security Copilot",
    "Microsoft's generative AI assistant for security operations, embedded in the Defender portal."
   ],
   [
    "Incident summary",
    "A Copilot-generated narrative of an incident's timeline, entities, attack stages and status."
   ],
   [
    "Guided response",
    "Copilot's recommended triage, containment, investigation and remediation actions for an incident."
   ],
   [
    "Security compute unit (SCU)",
    "The unit of capacity an organization provisions to run Security Copilot."
   ]
  ],
  "example": "A new analyst opens an incident with nine alerts and an obfuscated PowerShell command. The Copilot pane summarizes the attack as a phishing email leading to a downloader, script analysis decodes the command as a download of a second-stage payload from a listed URL, and guided response suggests isolating the device and blocking the URL. She verifies each point in the evidence and takes the actions.",
  "tip": "Map the need to the feature: 'explain this obfuscated command' is script analysis, 'what should I do next' is guided response, 'brief the next shift' is the incident summary or incident report.",
  "check": [
   [
    "Which embedded Copilot feature decodes an obfuscated PowerShell command?",
    "Script analysis."
   ],
   [
    "Does guided response take actions automatically?",
    "No. It recommends actions; the analyst chooses whether to run them."
   ],
   [
    "Can Copilot show a user data they are not permitted to see?",
    "No. It works within the signed-in user's permissions."
   ]
  ]
 },
 {
  "t": "KQL basics: where, project, extend, summarize, count, bin, ago(), order by, take, render",
  "body": [
   "Kusto Query Language (KQL) is the read-only query language used in Sentinel, Log Analytics and Defender XDR advanced hunting. A query starts with a table name and passes rows through a pipeline of operators separated by the pipe character. Each operator takes the rows from the previous one and returns a new set. Reading top to bottom is reading the order of processing.",
   "`where` filters rows. Put time filters and the most selective filters first so less data flows down the pipeline. `ago()` returns a time relative to now, so `where TimeGenerated > ago(1d)` keeps the last day. Sentinel tables usually use `TimeGenerated`; Defender XDR advanced hunting tables use `Timestamp`. Comparison operators include `==` (case-sensitive equality), `=~` (case-insensitive equality) and `!=`.",
   "`project` chooses and orders columns and can rename them. `extend` adds calculated columns while keeping all existing ones, for example `extend Hour = hourofday(TimeGenerated)`. `take` (or `limit`) returns an arbitrary set of rows and is useful for a quick look at a table's shape; it is not sorted. `order by` (or `sort by`) sorts, descending by default, and `top 10 by Count` sorts and limits in one step.",
   "`summarize` aggregates. It groups rows by the columns after `by` and computes functions such as `count()`, `dcount()` (distinct count), `min()`, `max()`, `make_set()` and `arg_max()`. The `count` operator on its own just returns the number of rows. `bin()` rounds values into buckets, most often times, so `summarize count() by bin(TimeGenerated, 1h)` gives an hourly count. `render` draws a chart from the results, such as `render timechart` or `render barchart`.",
   "```kql\nSecurityEvent\n| where TimeGenerated > ago(1d)\n| where EventID == 4625\n| summarize Failures = count() by Account, bin(TimeGenerated, 1h)\n| where Failures >= 10\n| order by Failures desc\n```",
   "This query finds accounts with ten or more failed Windows logons in any hour of the last day. Notice the pattern: filter by time, filter by event, aggregate, filter the aggregate, sort. Most detection queries follow it. To chart failures over time, remove the Account grouping and end with `render timechart`.",
   "Practice in the free Log Analytics demo environment. Start with `TableName | take 10` to see the columns, then build your query one line at a time, running it after each step so you understand what each operator changed."
  ],
  "terms": [
   [
    "where",
    "An operator that keeps only rows matching a condition."
   ],
   [
    "summarize",
    "An operator that groups rows and computes aggregates such as count() or dcount()."
   ],
   [
    "bin()",
    "A function that rounds values, usually timestamps, into fixed-size buckets for grouping."
   ],
   [
    "extend",
    "An operator that adds calculated columns while keeping the existing ones."
   ]
  ],
  "example": "An analyst suspects password spraying. She runs SigninLogs for the last day, filters failed results, summarizes distinct users per source IP per hour with dcount and bin, and sorts descending. One IP address has failed sign-ins against 300 different users in an hour, which she adds to an incident and blocks.",
  "tip": "Know the difference between project (keep only listed columns) and extend (add columns, keep all), and between take (unsorted sample) and top (sorted and limited). Remember Timestamp in Defender tables and TimeGenerated in Sentinel tables.",
  "check": [
   [
    "How do you count events per hour for the last seven days?",
    "Filter with where TimeGenerated > ago(7d), then summarize count() by bin(TimeGenerated, 1h)."
   ],
   [
    "Does take return the newest rows?",
    "No. It returns an arbitrary set of rows; use top or order by for sorted results."
   ],
   [
    "What is the difference between == and =~?",
    "== is case-sensitive equality; =~ is case-insensitive equality."
   ]
  ]
 },
 {
  "t": "KQL for hunting: has vs contains, in and has_any, let statements and dynamic lists, join kinds, union, parse_json and mv-expand, make-series with anomaly functions",
  "body": [
   "Hunting queries need more than the basics. This lesson covers the operators that make searches fast, reusable and able to combine data.",
   "String matching first. `has` looks for a whole term using the index that Kusto builds from words in text, so it is fast. `contains` looks for any substring and has to scan the text, so it is slower. `ProcessCommandLine has \"mimikatz\"` matches the word mimikatz; `contains \"katz\"` would match inside a longer word. Both are case-insensitive; `has_cs` and `contains_cs` are the case-sensitive forms. Use `has` whenever you are searching for a complete word, and `startswith` or `endswith` when position matters.",
   "For lists, `in` checks exact equality against a set of values, for example `FileName in (\"psexec.exe\", \"wmic.exe\")`, and `in~` does so case-insensitively. `has_any` checks whether a text column contains any of a list of terms, which suits command lines. `let` statements name a value, list or even a whole query so you can reuse it. A dynamic list looks like `let SuspiciousTools = dynamic([\"procdump\", \"rclone\"]);` and is then used in `where ProcessCommandLine has_any (SuspiciousTools)`. Let statements end with a semicolon and make queries easier to read and maintain.",
   "`join` combines two tables on matching columns. The default kind is innerunique, which removes duplicate left-side keys before matching and can surprise you. `inner` keeps all matching combinations, `leftouter` keeps every left row even without a match, `leftanti` keeps left rows with no match (great for 'accounts that logged on but never passed MFA'), and `leftsemi` keeps left rows that do have a match without adding right columns. Put the smaller table on the left for performance, and filter both sides by time first. `union` is different: it stacks rows from several tables, for example `union DeviceProcessEvents, DeviceNetworkEvents`, which is useful when the same indicator might appear in different sources.",
   "Many columns hold JSON, such as `AdditionalFields` or `RawEventData`. `parse_json()` (also called `todynamic()`) turns a JSON string into a dynamic object whose properties you access with dot or bracket notation. When a property is an array, `mv-expand` creates one row per array element, so you can filter or summarize individual items, such as each permission granted to an app.",
   "```kql\nlet lookback = 14d;\nSigninLogs\n| where TimeGenerated > ago(lookback)\n| make-series Signins = count() default = 0 on TimeGenerated from ago(lookback) to now() step 1h by UserPrincipalName\n| extend (Anomalies, Score, Baseline) = series_decompose_anomalies(Signins)\n```",
   "`make-series` builds a time series per group, filling empty buckets with a default so the series is regular. Series functions then analyze it: `series_decompose_anomalies()` flags points that deviate from the expected pattern, taking seasonality and trend into account, and returns anomaly flags, scores and a baseline. You typically `mv-expand` the result to see which hours were anomalous. This is how you find a user whose sign-in volume suddenly spikes."
  ],
  "terms": [
   [
    "has vs contains",
    "has matches whole indexed terms quickly; contains matches any substring and is slower."
   ],
   [
    "let",
    "A statement that names a value, list or query for reuse later in the query."
   ],
   [
    "leftanti join",
    "A join that returns left-side rows with no match on the right."
   ],
   [
    "make-series",
    "An operator that builds regular time series for analysis with functions such as series_decompose_anomalies()."
   ]
  ],
  "example": "A hunter defines a let list of remote-access tool names, uses has_any against ProcessCommandLine in DeviceProcessEvents, and leftanti joins the results against a watchlist of approved admin hosts. Twelve devices remain, and two of them also show outbound connections to a rare domain when she unions in DeviceNetworkEvents.",
  "tip": "The exam likes asking which join kind finds records without a match (leftanti) and why has is preferred over contains (performance on whole terms). Remember the default join kind is innerunique.",
  "check": [
   [
    "Which operator turns each element of an array column into its own row?",
    "mv-expand."
   ],
   [
    "What is the difference between union and join?",
    "union stacks rows from several tables; join combines columns from two tables where key values match."
   ],
   [
    "Which function flags unusual points in a time series built with make-series?",
    "series_decompose_anomalies()."
   ]
  ]
 },
 {
  "t": "Advanced hunting schema: DeviceProcessEvents, DeviceNetworkEvents, DeviceLogonEvents, EmailEvents, EmailUrlInfo, IdentityLogonEvents, CloudAppEvents, AlertInfo and AlertEvidence",
  "body": [
   "Advanced hunting in the Defender portal exposes Defender XDR data as tables grouped by source. Knowing which table holds which kind of event, and how tables link, is the difference between a quick hunt and a frustrating one. The schema reference in the portal lists every column; here are the tables SC-200 focuses on.",
   "Device tables come from Defender for Endpoint. DeviceProcessEvents records process creation: FileName, FolderPath, ProcessCommandLine, the SHA256 hash, the account, and the parent through the InitiatingProcess columns such as InitiatingProcessFileName. It is where you hunt for encoded PowerShell, living-off-the-land binaries or Office apps spawning shells. DeviceNetworkEvents records network connections: RemoteIP, RemotePort, RemoteUrl, the ActionType (for example successful or failed connection) and the initiating process. DeviceLogonEvents records logons to devices, with AccountName, LogonType (such as interactive, network or remote interactive) and ActionType showing success or failure. Other device tables cover files, registry, images loaded and general events.",
   "Email tables come from Defender for Office 365. EmailEvents has one row per message delivery, including SenderFromAddress, RecipientEmailAddress, Subject, DeliveryAction, DeliveryLocation and ThreatTypes. EmailUrlInfo lists URLs found in messages, and EmailAttachmentInfo lists attachments. They all share NetworkMessageId, the key you join on to connect a message to its URLs or files. UrlClickEvents records Safe Links clicks, and EmailPostDeliveryEvents records actions such as ZAP after delivery.",
   "IdentityLogonEvents records authentication activity seen by Defender for Identity on Active Directory and by Microsoft Entra ID, with the protocol (for example Kerberos or NTLM), the account, device and failure reason. It suits hunting for password spraying against on-premises accounts or legacy protocol use. Identity tables also include IdentityQueryEvents and IdentityDirectoryEvents. CloudAppEvents comes from Defender for Cloud Apps and records activity in cloud apps such as Exchange Online, SharePoint and Teams: ActionType, Application, account, IP address and a RawEventData column in JSON, which you parse for details such as inbox rule parameters.",
   "AlertInfo has one row per alert from any Defender product (and Sentinel when onboarded): AlertId, Title, Severity, Category, ServiceSource and DetectionSource. AlertEvidence has one row per entity attached to an alert: EntityType, EvidenceRole and entity columns such as DeviceId, AccountName, FileName or RemoteIP. Join them on AlertId to ask questions like 'which devices appeared in high-severity alerts this week'.",
   "```kql\nEmailEvents\n| where Timestamp > ago(7d) and ThreatTypes has \"Phish\"\n| join kind=inner EmailUrlInfo on NetworkMessageId\n| project Timestamp, RecipientEmailAddress, Subject, Url\n```",
   "Remember the time column in these tables is Timestamp, and advanced hunting keeps about 30 days of Defender data. For longer history, the data must be in Sentinel."
  ],
  "terms": [
   [
    "DeviceProcessEvents",
    "The table of process creation events, including command lines and parent process details."
   ],
   [
    "NetworkMessageId",
    "The email identifier that links EmailEvents with EmailUrlInfo, EmailAttachmentInfo and related tables."
   ],
   [
    "IdentityLogonEvents",
    "Authentication events from Defender for Identity (on-premises AD) and Microsoft Entra ID."
   ],
   [
    "AlertEvidence",
    "One row per entity attached to an alert, joined to AlertInfo on AlertId."
   ]
  ],
  "example": "After a phishing incident, an analyst joins EmailEvents to EmailUrlInfo on NetworkMessageId to list every recipient of the malicious URL, then joins UrlClickEvents to see who clicked, then queries DeviceProcessEvents on those users' devices for processes launched by the browser in the next hour. One device shows a downloaded script running.",
  "tip": "Match question wording to tables: process and command line means DeviceProcessEvents; connection or remote IP means DeviceNetworkEvents; on-premises Kerberos or NTLM logons means IdentityLogonEvents; mailbox rules in Exchange Online usually means CloudAppEvents.",
  "check": [
   [
    "Which column joins EmailEvents to EmailUrlInfo?",
    "NetworkMessageId."
   ],
   [
    "Where would you look for the parent process of a suspicious PowerShell launch?",
    "In DeviceProcessEvents, using the InitiatingProcess columns such as InitiatingProcessFileName."
   ],
   [
    "How do you list the entities in high-severity alerts?",
    "Join AlertInfo (filtered on Severity) with AlertEvidence on AlertId."
   ]
  ]
 },
 {
  "t": "Turning a hunting query into a custom detection rule; Security Copilot help with writing KQL",
  "body": [
   "Hunting is exploratory: you form a hypothesis, query, and learn. When a hunt finds something worth watching for continuously, you promote it into a detection so the next occurrence raises an alert without a human remembering to look. In Defender XDR that means a custom detection rule; in Sentinel, a scheduled or NRT analytics rule.",
   "Start by making the query detection-ready. Hunting queries often return aggregates or broad lists, while a detection should return specific events that an analyst can act on. Make sure it returns the required identifier columns, such as Timestamp, DeviceId and ReportId for device tables, and the columns for the impacted entity (device, user or mailbox). If you summarize, keep these columns with a function like `arg_max(Timestamp, *)` so each row still points to a real event. Remove `take` or `limit` statements, which would silently drop results.",
   "Next, tune for noise. Run the query over the full lookback period you plan to use and count the results. If it returns hundreds of hits a day, add filters for known-good activity, perhaps using a watchlist in Sentinel or a let list of approved tools. A detection that fires constantly teaches analysts to ignore it. Then choose a frequency that matches the risk: continuous or hourly for active attack techniques, daily for slower signals.",
   "Then, in advanced hunting, select Create detection rule. Give it a clear name and description, a severity, a category and MITRE ATT&CK techniques, and recommended actions for analysts. Choose impacted entities and, only for high-confidence logic, automated actions such as isolating a device. After saving, monitor the rule's runs and alerts on the Detection rules page, and revisit it when it produces false positives.",
   "Security Copilot can help at several points. In advanced hunting, you can describe what you want in plain language, such as 'show devices where PowerShell ran with an encoded command in the last 7 days', and Copilot generates a KQL query using the right tables and columns. You can ask it to explain an existing query, fix an error, or adjust a query, for example to exclude certain hosts. This lowers the barrier for analysts who are still learning KQL and speeds up experienced hunters.",
   "Always review generated KQL before relying on it. Check that it queries the right table, that filters match your intent, that time ranges are sensible, and that it returns the columns a detection needs. Run it and inspect the results. Generated queries can use the wrong column or miss a condition, and a subtle mistake in a detection means either silence during an attack or a flood of false alerts."
  ],
  "terms": [
   [
    "Hypothesis-driven hunting",
    "Hunting that starts from a specific idea about attacker behavior and tests it with queries."
   ],
   [
    "arg_max()",
    "An aggregation that returns the row with the maximum value of a column, keeping other columns."
   ],
   [
    "Detection-ready query",
    "A query that returns specific events with required identifier and entity columns and acceptable noise."
   ],
   [
    "Natural-language to KQL",
    "Security Copilot's ability to generate a KQL query from a plain-language request."
   ]
  ],
  "example": "A hunter asks Copilot for 'processes that created scheduled tasks with encoded commands in the last 7 days'. She reviews the generated query, corrects a column name, adds DeviceId and ReportId to the output, and excludes a known deployment server. The query returns three hits a week, so she saves it as a custom detection rule running every 3 hours, tagged with the scheduled task technique.",
  "tip": "If a scenario says the rule can't be saved or alerts lack entities, the query is missing required or entity columns. Generated KQL is a starting point that the analyst must validate.",
  "check": [
   [
    "Why remove take from a query before turning it into a detection?",
    "take limits results arbitrarily, so the rule could miss matching events."
   ],
   [
    "How can a summarized query still work as a detection?",
    "Keep event identifiers and entity columns, for example with arg_max(Timestamp, *)."
   ],
   [
    "What should you check in KQL that Copilot generates?",
    "The tables, columns, filters, time range and output columns, then run it and inspect results."
   ]
  ]
 },
 {
  "t": "Sentinel hunting: hunting queries, hunts, bookmarks, livestream, notebooks with MSTICPy",
  "body": [
   "Proactive threat hunting assumes attackers may already be inside and undetected, and searches for them. Sentinel provides a set of tools that support each step: finding ideas, running queries, saving evidence, watching for new activity, and doing advanced analysis.",
   "The Hunting page lists hunting queries. Many come from Content hub solutions and are mapped to MITRE ATT&CK tactics and techniques; you can also write your own. Each query shows how many results it returns and whether that number changed recently. You can run all queries at once, sort by result count or change, and filter by tactic or data source. A query that suddenly returns results it did not before deserves a look. Hunting queries do not create alerts on their own.",
   "Hunts are a way to organize a hunting project end to end. You create a hunt with a hypothesis (for example 'an attacker is using a remote management tool for persistence'), add relevant queries, track status and findings, and collaborate with colleagues. When the hunt ends, you record the outcome and can create analytics rules or incidents from what you found.",
   "Bookmarks save interesting rows from a query result with notes, tags and mapped entities. They keep evidence even after the underlying query or data changes. Bookmarks appear in the investigation graph and can be added to an existing incident or used to create a new incident. This is how a hunting finding enters the incident process. Bookmarks are stored in the HuntingBookmark table.",
   "Livestream lets you run a hunting query continuously against new incoming data and get notified when results appear, without creating a full analytics rule. It suits watching for a specific indicator during an active investigation, such as a suspicious IP reappearing. If a livestream session proves valuable, you can promote the query to an analytics rule.",
   "Notebooks give you the full power of Python. Sentinel integrates with Jupyter notebooks running in Azure Machine Learning, and with notebooks against the Sentinel data lake. MSTICPy (Microsoft Threat Intelligence Center Python security tools) is an open-source library built for this. It has query providers for Sentinel and Defender data, enrichment such as threat intelligence lookups and IP geolocation, data decoding (for example base64), and visualizations such as timelines, process trees and maps. Notebooks are ideal for machine learning, complex analysis, and repeatable investigation playbooks that combine data from many sources. Remember that the compute used to run notebooks is billed separately.",
   "The overall flow: pick a hypothesis, run hunting queries or write new KQL, bookmark evidence, use livestream to watch for more, go deeper in a notebook if needed, then turn findings into incidents and new detections."
  ],
  "terms": [
   [
    "Hunting query",
    "A saved KQL query for proactive searching, often mapped to MITRE ATT&CK, that does not create alerts."
   ],
   [
    "Bookmark",
    "Saved query results with notes, tags and entities that can be added to or create an incident."
   ],
   [
    "Livestream",
    "A session that runs a hunting query continuously on new data and notifies you of matches."
   ],
   [
    "MSTICPy",
    "An open-source Python library for security investigations in notebooks, with data queries, enrichment and visualization."
   ]
  ],
  "example": "During a hunt for credential dumping, an analyst runs the relevant hunting queries, finds three suspicious rows, and bookmarks them with the host and account mapped. She creates an incident from the bookmarks, starts a livestream on the suspicious process hash, and uses an MSTICPy notebook to build a process tree and look up the hash in threat intelligence.",
  "tip": "Save evidence from a hunt: bookmark. Watch for new matches without writing a rule: livestream. Python, machine learning or complex enrichment: notebook with MSTICPy.",
  "check": [
   [
    "How does a hunting finding become an incident?",
    "Bookmark the results, then create a new incident from the bookmark or add it to an existing one."
   ],
   [
    "Do hunting queries generate alerts on a schedule?",
    "No. They are run manually; to alert on schedule you create an analytics rule."
   ],
   [
    "What is MSTICPy used for?",
    "Querying security data, enriching it with threat intelligence and geolocation, and visualizing it in notebooks."
   ]
  ]
 },
 {
  "t": "Long-term data: search jobs, restore, Sentinel data lake KQL jobs",
  "body": [
   "Investigations often need data older than your interactive retention: a breach discovered months after the first intrusion, a new threat intelligence report about activity last year, or a legal request. Sentinel keeps older data cheaply in long-term retention or the data lake tier, but that data cannot be queried like interactive data. Three tools bring it back into reach.",
   "A search job scans a table, including its long-term retained data, for records that match a query, and writes the matching records into a new table in the analytics tier. The results table name ends in _SRCH. Search jobs run asynchronously, so you can search very large volumes and come back later. They work on analytics tables and on lower-cost plans, and use a restricted set of KQL operators. You pay for the data scanned and for the results stored. Use a search job when you need specific records, such as every event mentioning an IP address across the past year.",
   "Restore brings a whole time slice of a table's long-term data back into the analytics tier, into a table whose name ends in _RST. You can then run full KQL against it, including joins, hunting queries and workbooks, as if it were fresh data. Restore is for deep investigation of a period, such as all sign-in logs for the week a breach started. Restored data is billed for as long as it stays restored, so delete the restore when you finish.",
   "The Sentinel data lake changes the long-term story. Data in the lake tier can be queried directly with KQL in data lake exploration for interactive investigation. KQL jobs run a KQL query over data lake data, once or on a schedule, and write the results into an analytics-tier table. A scheduled KQL job can, for example, extract indicator matches from months of network logs every day, so detections and workbooks in the analytics tier can use them. KQL jobs can use richer KQL than search jobs, including joins across lake tables, within the limits the service sets. Notebooks can also query the lake with Python for larger analyses.",
   "Choosing between them: need specific matching records from long-term data, use a search job. Need to work interactively on a full time range with every KQL feature, use restore. Data lives in the Sentinel data lake and you want results routinely promoted to the analytics tier, use a KQL job. Summary rules, covered earlier, are for regular aggregation into the analytics tier.",
   "Cost awareness is essential, because all these tools bill by data scanned or stored. Narrow the time range and filter as early as possible, and try on small ranges first."
  ],
  "terms": [
   [
    "Search job",
    "An asynchronous search of long-term data whose matching records are written to a _SRCH table."
   ],
   [
    "Restore",
    "Bringing a time range of long-term data back to the analytics tier in a _RST table for full querying."
   ],
   [
    "KQL job",
    "A one-time or scheduled KQL query over the Sentinel data lake that writes results to an analytics-tier table."
   ],
   [
    "Long-term retention",
    "Low-cost storage of data beyond interactive retention, not directly usable by analytics rules."
   ]
  ],
  "example": "A threat report says an actor used a specific domain eleven months ago. The SOC runs a search job for that domain across DNS logs held in long-term storage, and the _SRCH table shows two hosts that resolved it. They then restore the full week of process and sign-in data around those dates to investigate with joins, and delete the restore afterward.",
  "tip": "Look for these clues: 'find records matching X from last year' means search job; 'investigate everything in that week with full KQL' means restore; 'query the data lake on a schedule and send results to the analytics tier' means KQL job.",
  "check": [
   [
    "What table name suffix identifies search job results?",
    "_SRCH."
   ],
   [
    "Why delete a restore when the investigation ends?",
    "Restored data is billed for as long as it remains restored."
   ],
   [
    "Where do KQL job results go?",
    "Into a table in the analytics tier, where detections, workbooks and hunting can use them."
   ]
  ]
 },
 {
  "t": "Normalized hunting with ASIM parsers across vendors",
  "body": [
   "Most organizations have several firewalls, proxies, DNS servers and identity systems from different vendors. Each logs the same kind of event with different table names, column names and values. One firewall calls the source address SrcIP, another src_ip, a third puts it in a Syslog message. Writing every detection and hunt once per vendor does not scale.",
   "The Advanced Security Information Model (ASIM) solves this by normalizing data at query time. ASIM defines schemas for common event types, including network session, DNS, web session, authentication, process event, file event, registry event, audit event, user management and DHCP. Each schema has standard column names and value formats, for example SrcIpAddr, DstIpAddr, DstPortNumber and EventResult with values such as Success or Failure.",
   "Parsers are KQL functions that read vendor-specific data and output rows in the ASIM schema. There are source-specific parsers, one per product, and unifying parsers that call all the source-specific parsers for a schema and union the results. When you query the unifying parser `_Im_NetworkSession`, you get network sessions from every supported source in one normalized result, without knowing which tables they came from. New sources are added by adding their parser; queries built on the unifying parser pick them up automatically.",
   "There are two flavors of unifying parser. Filtering parsers, named with the `_Im_` prefix, accept parameters such as `starttime`, `endtime`, and schema-specific filters like source IP address prefixes or domain names. The filters are pushed down into each source parser, so less data is processed and queries run faster. Parameter-less parsers, named with `_ASim_`, return everything and are handy for exploration. Built-in parsers are deployed with Sentinel and start with an underscore; workspace-deployed versions without the underscore exist for customization.",
   "```kql\n_Im_NetworkSession(starttime = ago(1d), endtime = now())\n| where DstPortNumber == 3389 and EventResult == \"Success\"\n| summarize Sessions = count() by SrcIpAddr, DstIpAddr\n```",
   "This single query finds Remote Desktop Protocol sessions across every normalized firewall and network source. The same idea applies to detections: many Sentinel analytics rule templates are built on ASIM so they work across vendors. The trade-off is that query-time parsing costs some performance and you rely on parsers existing for your products. For heavy use, ingestion-time normalization into ASIM tables is also possible.",
   "When hunting across vendors, reach for the ASIM unifying parser for the schema first, pass filters as parameters, and only drop to a raw vendor table when you need a field ASIM does not map."
  ],
  "terms": [
   [
    "ASIM",
    "The Advanced Security Information Model, which normalizes events from different sources into common schemas."
   ],
   [
    "Unifying parser",
    "An ASIM function that combines all source-specific parsers for a schema into one normalized result."
   ],
   [
    "Filtering parser",
    "An _Im_ parser that accepts parameters such as time and IP filters to improve performance."
   ],
   [
    "Source-specific parser",
    "An ASIM function that normalizes data from one product into a schema."
   ]
  ],
  "example": "A company runs two different firewall brands after a merger. Instead of maintaining two versions of each hunt, the SOC rewrites its lateral movement hunts to use _Im_NetworkSession with time filters. When a third firewall is added and its ASIM parser installed, the existing hunts cover it with no changes.",
  "tip": "One query across many vendors for the same event type means ASIM. Use the _Im_ filtering parsers with parameters for performance; _ASim_ parsers take no parameters.",
  "check": [
   [
    "What is the benefit of querying _Im_NetworkSession instead of each firewall's table?",
    "One normalized query covers every supported source, and new sources are included automatically."
   ],
   [
    "Why pass starttime and endtime to a filtering parser?",
    "The filters are applied inside each source parser, reducing processed data and speeding up the query."
   ],
   [
    "Name three ASIM schemas.",
    "Examples: network session, DNS, authentication, process event, web session, file event."
   ]
  ]
 },
 {
  "t": "Threat intelligence: TI indicators, TAXII feeds, threat analytics reports in Defender XDR",
  "body": [
   "Threat intelligence (TI) is information about attackers: who they are, how they operate, and the traces they leave. For a SOC it comes in two main forms. Indicators of compromise (IoCs) are concrete observables such as IP addresses, domains, URLs, file hashes and email addresses associated with malicious activity. Finished intelligence is written analysis of threat actors, campaigns, vulnerabilities and techniques, which tells you what to look for and how to defend.",
   "In Sentinel, indicators are stored as Structured Threat Information Expression (STIX) objects and managed on the threat intelligence page, where you can view, search, tag, add and expire them. They are stored in workspace tables so you can query them, and Microsoft has moved to newer STIX-based tables alongside the older indicator table. Indicators have properties such as confidence, valid-from and valid-until dates, threat types and source. Expiring old indicators matters: IP addresses change owners, and stale indicators cause false positives.",
   "Indicators get into Sentinel through connectors. Trusted Automated Exchange of Intelligence Information (TAXII) is a standard protocol for sharing STIX data. The Threat Intelligence TAXII connector pulls indicators from a TAXII server; you provide the API root, collection ID and credentials from the feed provider, and choose a polling frequency. Other routes are the upload API for threat intelligence platforms, the Microsoft Defender Threat Intelligence connector for Microsoft's own indicators, and manual entry or file import.",
   "Using indicators is the point. Threat intelligence matching analytics rule templates, often called TI map rules, compare indicators with logs such as DNS, sign-in, firewall and email events and alert on matches. You can also join indicator tables in hunting queries. Defender XDR has its own custom indicators for endpoints (file, IP, URL, certificate), which block or alert on devices, as covered in the Defender for Endpoint lesson.",
   "Threat analytics in the Defender portal delivers finished intelligence from Microsoft security researchers. Each report covers an active threat actor, campaign, attack technique or vulnerability. Its tabs include an overview, the full analyst report with detection and hunting guidance, related incidents and alerts in your tenant, impacted assets, and exposure and mitigations, which shows whether your devices have the relevant patches and secure configurations. The dashboard highlights reports with the most impact on your organization, and you can set up email notifications for new or updated reports.",
   "Use threat analytics to prioritize: if a report shows ransomware-linked incidents in your tenant and unpatched devices, that is where to spend effort today. Use the report's hunting queries to check for undetected activity."
  ],
  "terms": [
   [
    "Indicator of compromise (IoC)",
    "An observable such as an IP, domain, URL or hash associated with malicious activity."
   ],
   [
    "STIX",
    "Structured Threat Information Expression, a standard format for describing threat intelligence."
   ],
   [
    "TAXII",
    "Trusted Automated Exchange of Intelligence Information, a protocol for sharing STIX data between servers and clients."
   ],
   [
    "Threat analytics",
    "Defender portal reports on active threats, showing related incidents, impacted assets and mitigation status."
   ]
  ],
  "example": "An ISAC shares indicators through a TAXII server. The SOC connects it with the Threat Intelligence TAXII connector and enables TI map rules for DNS and firewall logs. A week later a rule alerts that a server resolved a listed domain. Threat analytics shows the domain belongs to a campaign report, whose exposure tab reveals four servers missing the patch the actor exploits.",
  "tip": "TAXII is the transport and STIX the format. Written reports on actors with exposure and mitigation status in your tenant means threat analytics; matching indicators against logs means TI map analytics rules.",
  "check": [
   [
    "What do you need from a provider to configure the TAXII connector?",
    "The TAXII API root URL, the collection ID, and credentials if required."
   ],
   [
    "Why set expiration dates on indicators?",
    "Indicators, especially IPs, go stale, and expired ones would cause false positives."
   ],
   [
    "Which threat analytics tab shows whether your devices have the relevant patches?",
    "The exposure and mitigations section."
   ]
  ]
 },
 {
  "t": "Graph-based hunting: Sentinel graph and hunting graphs with blast radius",
  "body": [
   "Tables and KQL are great for asking 'which events match this condition', but many security questions are about relationships: which users can reach this storage account, how could a compromised laptop lead to a domain admin, or what would an attacker holding this identity be able to touch. Graphs model data as nodes (users, devices, groups, cloud resources, applications) and edges (relationships such as 'member of', 'has permission to', 'logged on to' or 'can authenticate as'). Attackers think in graphs, so defenders benefit from doing the same.",
   "Microsoft Sentinel graph builds a relationship model of your environment from data in the Sentinel data lake and Microsoft security products, covering identities, devices, cloud resources, permissions and activity. It powers several experiences in the Defender portal and is also available to tools and AI agents that need to reason about connections. Several of these features are recent and their exact names and capabilities may still change, so focus on the concepts.",
   "Hunting graphs let you explore these relationships visually during a hunt in the Defender portal. Instead of writing many joins, you start from an entity, such as a user or a device, and expand its connections to see paths toward sensitive assets. Predefined scenarios answer common questions, such as paths from a user to critical resources, and you can open nodes to see their details and pivot back into advanced hunting queries or incidents.",
   "Blast radius analysis answers 'if this node is compromised, what can the attacker reach from here?'. From an incident or an entity, it shows the paths from the compromised user or device to critical targets, for example key vaults, databases, privileged accounts or domain controllers, based on permissions, sessions and network exposure. This helps you prioritize containment: an infected kiosk that reaches nothing sensitive is less urgent than a laptop whose logged-on user administers production. It also helps scope an investigation, because the targets on those paths are where you should look for follow-on activity.",
   "Graph thinking also appears elsewhere in this course. Defender for Identity lateral movement paths are a graph of sessions and admin rights; Microsoft Security Exposure Management attack paths show chains of weaknesses toward critical assets; the incident graph shows how an incident's entities connect. Sentinel graph brings these ideas into hunting with your own data.",
   "Use graph findings to act on both sides. Operationally, contain the nodes on the most dangerous paths first and hunt along them. Preventively, break paths by removing unnecessary permissions and admin rights, fixing misconfigurations, and protecting critical assets, so that the next compromise has a smaller blast radius."
  ],
  "terms": [
   [
    "Graph",
    "A data model of nodes (entities) and edges (relationships) used to analyze connections."
   ],
   [
    "Sentinel graph",
    "A relationship model of identities, devices, resources and activity built on Sentinel data lake and Microsoft security data."
   ],
   [
    "Hunting graph",
    "A visual, interactive exploration of entity relationships during a hunt in the Defender portal."
   ],
   [
    "Blast radius",
    "The set of assets an attacker could reach from a compromised user or device, shown as paths to critical targets."
   ]
  ],
  "example": "A developer's laptop is flagged with a credential-stealing alert. Blast radius analysis shows the developer's account has a path through a group membership to a production key vault holding database secrets. The SOC contains the device, revokes the user's sessions, rotates the key vault secrets, and hunts along that path for any access in the last week.",
  "tip": "When a question asks what an attacker could reach from a compromised identity or device, the answer is blast radius or an attack path view; when it asks which events match a condition, it is a KQL query.",
  "check": [
   [
    "What question does blast radius analysis answer?",
    "Which critical assets an attacker could reach from a compromised user or device, and by what paths."
   ],
   [
    "Why are graphs useful for hunting compared with tables alone?",
    "They show multi-step relationships such as permissions and sessions directly, instead of requiring many joins."
   ],
   [
    "How do graph findings improve prevention?",
    "They reveal paths you can break by removing excess permissions and admin rights and fixing misconfigurations."
   ]
  ]
 }
]);
