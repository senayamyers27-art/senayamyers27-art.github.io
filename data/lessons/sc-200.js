/* Lessons for Microsoft Certified: Security Operations Analyst Associate (SC-200): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("sc-200", [
 {
  "t": "Defender XDR settings: incident and alert email notifications, alert tuning (suppression) rules, portal RBAC and device groups",
  "body": [
   "Microsoft Defender XDR (extended detection and response) is the suite that joins Defender for Endpoint, Defender for Office 365, Defender for Identity, Defender for Cloud Apps and more into one portal, the Microsoft Defender portal. Before a security operations center (SOC) can use it well, someone has to configure a few tenant-wide settings: who gets told about incidents, which known-benign alerts are quieted, who can see and do what, and how devices are grouped. None of these settings detect anything by themselves, but together they decide whether the right analyst sees the right incident quickly and without drowning in noise. The exam treats them as the foundation of a working SOC.",
   "Email notifications live under Settings, Microsoft Defender XDR, Email notifications. There are separate rule types for incidents, for response actions and for threat analytics. An incident notification rule has a name, a list of recipients and filters, such as minimum severity, the source product (for example only Defender for Identity) or device group. You can also choose whether one email is sent per incident or per new alert added to it, and whether the email includes organization details. A common design is to email the on-call lead for every high-severity incident and nobody for low ones. Email is a supplement, not the queue: analysts still work incidents in the portal, and a notification rule never changes an incident's status.",
   "Alert tuning, previously called suppression rules, handles alerts you have already investigated and judged benign, such as a legitimate admin tool that always triggers the same detection. You find it under Settings, Microsoft Defender XDR, Alert tuning, or create a rule directly from an alert's page. You build a rule from conditions on the alert and its evidence (file name or hash, process command line, IP address, user, device) and choose a scope: every device or only selected ones. The action is either to hide the alert or to resolve it automatically. Tuning changes only alerting. Protection and data collection keep running, which is why tuning is safer than an allow indicator or an antivirus exclusion, both of which change what the product blocks or scans.",
   "Access in the portal is controlled in two ways. Microsoft Entra ID roles such as Global Administrator, Security Administrator, Security Operator and Security Reader apply across the whole tenant and every workload. Microsoft Defender XDR Unified role-based access control (RBAC) lets you build custom roles from permission groups (security operations, security posture, and authorization and settings) and assign them to users or groups for chosen data sources, such as endpoints only or email only. You activate unified RBAC per workload under Settings, Microsoft Defender XDR, Permissions. Least privilege means Tier-1 analysts get read and triage rights, while only a small group can change settings or run live response.",
   "Device groups are defined under Settings, Endpoints, Device groups. Each group has a rank, matching rules (device name, domain, tag or operating system), an automation level (from no automated response to full remediation) and a list of Microsoft Entra user groups that may access it. A device joins only the highest-ranked group whose rules it matches, and anything that matches nothing lands in the default ungrouped devices group. Device groups do three jobs: they scope who can see and act on devices, they set how much automated investigation and remediation (AIR) happens, and they can scope notifications, indicators and tuning rules. Tags, set manually or through a registry value or Intune, are the usual way to steer a device into a group.",
   "Consider a worked example. A hospital's backup software triggers a credential-access alert every night on two backup servers. The SOC lead confirms the behavior is expected by checking the process path and signer, then chooses Tune alert from the alert page. She sets conditions on the process file path and command line, scopes the rule to a device group containing only those two servers, and sets the action to resolve the alert. She also creates an EU-Servers device group, ranked above the general servers group, with semi-automated remediation and access for the EU analysts' Entra group only. Finally, an incident notification rule emails the on-call lead for high-severity incidents from any source.",
   "Common mistakes: using a tenant-wide allow indicator or exclusion to silence one noisy alert, which weakens protection everywhere; scoping a tuning rule to all devices when only two need it; assuming a lower-ranked device group wins because its rule is more specific (rank decides, not specificity); giving analysts Security Administrator when a custom unified RBAC role would do; and forgetting that devices in no group still need an owner and an automation level. Another trap is expecting an email rule to page someone reliably at night; integrate the incident queue with your on-call tooling if that matters.",
   "Exam questions are usually short scenarios. 'Stop a known-benign alert without reducing protection' points to alert tuning with a narrow scope. 'Analysts in one region must only see their region's devices' points to device groups with Entra user group access. 'Grant a custom set of permissions only for email data' points to Defender XDR unified RBAC. 'Notify a manager only for high-severity incidents' points to an incident email notification rule with a severity filter. 'A device matches two groups' is answered by rank."
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
    "Device group rank",
    "The order that decides which group a device joins when it matches several; the highest-ranked match wins."
   ],
   [
    "Incident notification rule",
    "A setting that emails chosen recipients when incidents matching filters such as severity or source are created or updated."
   ],
   [
    "Automation level",
    "The per-device-group setting that decides whether automated investigation remediates on its own or waits for approval."
   ]
  ],
  "example": "A hospital's backup software triggers a suspicious credential access alert every night on two backup servers. After confirming the behavior is expected, the SOC lead creates an alert tuning rule for that process path, scoped to those two servers, set to resolve the alert. The same detection still fires on any other device, and a new incident notification rule emails her only for high-severity incidents.",
  "tip": "To silence one known-benign alert while keeping protection, pick alert tuning scoped narrowly. To limit which devices an analyst can see, pick a device group with Entra group access, not a tenant-wide Entra role.",
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
   ],
   [
    "You need a role that lets a team triage only email alerts. Which feature do you use?",
    "A custom Defender XDR unified RBAC role with security operations permissions, assigned for the email and collaboration data source only."
   ]
  ]
 },
 {
  "t": "Defender for Endpoint configuration: onboarding, device groups, tamper protection, attack surface reduction rules (audit, warn, block), indicators and network protection, device discovery",
  "body": [
   "Microsoft Defender for Endpoint (MDE) is the endpoint detection and response (EDR) and protection product in Defender XDR. It uses sensors built into Windows and agents for macOS, Linux, iOS and Android to send telemetry to the cloud, where detections become alerts. It also manages Microsoft Defender Antivirus and a set of hardening features. Configuring it well decides whether your SOC sees attacks at all and whether common attack techniques are blocked before they start.",
   "Onboarding connects a device to your tenant. Methods include a local script (good for a handful of test machines), Group Policy, Microsoft Intune, Configuration Manager, scripts for non-persistent virtual desktops, and Defender for Cloud for servers. Each method uses an onboarding package downloaded from Settings, Endpoints, Onboarding, where you pick the operating system and deployment method. After onboarding, the same page offers a harmless detection test command that produces a test alert, which is how you confirm the device reports. You can also check the device's health state and last-seen time in the device inventory. Offboarding uses a separate package and is how you retire a device cleanly. Device discovery uses onboarded devices to find unmanaged devices on the same networks. Standard discovery, the default, actively probes found devices to learn more about them; basic discovery only listens passively to traffic the onboarded device already sees. Discovered devices appear in the device inventory with an onboarding status such as can be onboarded or unsupported, so you can close gaps attackers love.",
   "Device groups, covered in the previous lesson, control who can see and act on each device and the automated remediation level it gets. Tamper protection stops people, including local administrators and malware running with admin rights, from turning off real-time protection, cloud-delivered protection, behavior monitoring and other security settings. Attackers commonly try to disable antivirus before running ransomware, so tamper protection should be on everywhere. You turn it on tenant-wide under Settings, Endpoints, Advanced features, or manage it per device through Intune, and changes made locally, for example with `Set-MpPreference -DisableRealtimeMonitoring $true`, are then ignored.",
   "Attack surface reduction (ASR) rules block behaviors that attackers use and normal users rarely need: Office apps creating child processes, credential stealing from the Local Security Authority Subsystem Service (LSASS), obfuscated scripts, executable content from email and others. Each rule has a mode. Audit logs what would have been blocked without blocking it. Warn blocks but lets the user click through, and not every rule supports it. Block enforces the rule. The safe rollout is audit first, review the events in the ASR report or in advanced hunting, add narrow exclusions for legitimate line-of-business apps, then move to block in stages. Intune's endpoint security profiles are the usual place to set modes, and a quick hunting query looks like `DeviceEvents | where ActionType startswith \"Asr\"`.",
   "Indicators of compromise (IoCs) are your own allow or block entries, created under Settings, Endpoints, Indicators. File hash indicators can allow, audit, warn, block execution or block and remediate. IP address, URL and domain indicators and certificate indicators work similarly and can be scoped to device groups. For IP and URL indicators to block traffic from browsers other than Microsoft Edge and from other processes, network protection must be turned on in block mode, and the custom network indicators advanced feature must be enabled. Network protection extends SmartScreen-style reputation blocking to the whole operating system, so it also stops connections to known malicious or command-and-control sites. Like ASR, it has an audit mode for testing.",
   "Consider a worked example. An accounting firm wants to block Office macros from launching child processes. The admin sets that ASR rule to audit for two weeks, finds that a reporting add-in triggers it, adds a path exclusion for that add-in, then switches the rule to block for a pilot device group before rolling it out everywhere. Meanwhile device discovery shows three unmanaged laptops, which are onboarded through Intune.",
   "Common mistakes: jumping straight to block and breaking business apps; creating a URL block indicator and wondering why Chrome ignores it (network protection is off); turning tamper protection on through Intune for some devices but leaving others unmanaged; assuming audit mode protects anything (it only logs); using a broad folder exclusion that attackers can abuse; and thinking device discovery onboards devices automatically. It only finds them.",
   "Exam wording is usually direct. 'Test the impact of a rule without affecting users' means audit mode. 'Let users bypass with a warning' means warn mode. 'A local administrator or malware disabled antivirus' means tamper protection. 'Block a malicious domain for all browsers and processes' means an indicator plus network protection in block mode. 'Find devices that are not onboarded' means device discovery and the device inventory. 'Confirm onboarding works' means the detection test."
  ],
  "terms": [
   [
    "Onboarding package",
    "The script or configuration downloaded from the Defender portal that connects a device to your tenant through a chosen deployment method."
   ],
   [
    "Tamper protection",
    "A setting that prevents local changes to Defender security settings, even by administrators or malware with admin rights."
   ],
   [
    "ASR rule modes",
    "Audit logs only, Warn blocks but allows a user bypass, and Block enforces the rule."
   ],
   [
    "Indicator",
    "A custom allow, audit, warn or block entry for a file hash, IP address, URL, domain or certificate."
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
  "example": "An accounting firm wants to block Office macros from launching child processes. The admin sets that ASR rule to audit for two weeks, finds that a reporting add-in triggers it, adds an exclusion for that add-in's path, then switches the rule to block for a pilot group before rolling it out to all device groups. The same week, device discovery finds three unmanaged laptops, which the team onboards through Intune.",
  "tip": "Expect questions on the order of ASR rollout (audit before block) and on the dependency between custom IP or URL indicators and network protection. Tamper protection is the answer whenever someone with admin rights tries to switch off Defender.",
  "check": [
   [
    "A custom URL block indicator works in Edge but not in Chrome. What is missing?",
    "Network protection in block mode (with custom network indicators enabled). It enforces IP and URL indicators for other browsers and processes."
   ],
   [
    "What does warn mode do in an ASR rule?",
    "It blocks the action but shows the user a notice that lets them unblock it and continue, for rules that support warn."
   ],
   [
    "How can you find devices on your network that are not onboarded to Defender for Endpoint?",
    "Use device discovery; the unmanaged devices it finds appear in the device inventory for onboarding."
   ],
   [
    "How do you confirm a newly onboarded device is reporting?",
    "Run the detection test command from the onboarding page and check that a test alert appears and the device shows in the inventory."
   ]
  ]
 },
 {
  "t": "Defender for Cloud: foundational CSPM vs paid workload protection plans (Servers, Storage, Databases), connecting AWS and GCP accounts, Defender for Endpoint integration for servers",
  "body": [
   "Microsoft Defender for Cloud protects cloud resources in Azure, Amazon Web Services (AWS), Google Cloud Platform (GCP) and on-premises servers. It does two different jobs, and the exam expects you to keep them apart. Cloud security posture management (CSPM) looks for weaknesses in how resources are configured, such as a storage account open to the internet or a virtual machine (VM) missing updates. Cloud workload protection (the Defender plans) detects active threats against running workloads and raises security alerts. Posture is prevention and hygiene; workload protection is detection.",
   "Foundational CSPM is on by default at no extra charge. It gives you a secure score, security recommendations based on the Microsoft cloud security benchmark, asset inventory and regulatory compliance views for some standards. The paid Defender CSPM plan adds deeper posture features such as attack path analysis, the cloud security explorer, agentless scanning, data-aware posture and governance rules that assign owners and due dates to recommendations. Neither CSPM plan produces threat alerts about an attacker on a VM; that is the job of workload protection.",
   "Workload protection is enabled per plan and per subscription (or AWS account or GCP project) under Environment settings, then Defender plans. Defender for Servers protects Windows and Linux machines and comes in Plan 1 and Plan 2; Plan 2 adds more features such as agentless vulnerability scanning, file integrity monitoring and just-in-time (JIT) VM access. Defender for Storage detects threats against storage accounts, such as unusual access patterns and malware uploads, with optional malware scanning of new blobs. The databases plans cover Azure SQL, SQL servers on machines, open-source relational databases and Azure Cosmos DB, and alert on things like SQL injection attempts and brute-force logins. There are also plans for containers, App Service, Key Vault, Resource Manager and APIs.",
   "To protect AWS and GCP, you add an environment in Defender for Cloud's Environment settings. For AWS, you create a connector, choose plans, and deploy the provided CloudFormation template, which creates the roles Defender for Cloud assumes to read the account. For GCP, you run a provided script, typically in Cloud Shell, to create the workload identity federation, service accounts and permissions. You then choose which plans to turn on for that connector, such as Defender CSPM and Defender for Servers. Servers outside Azure, including on-premises machines, can be connected through Azure Arc so that Azure extensions can be deployed to them; multicloud connectors can auto-provision Arc for EC2 and Compute Engine instances.",
   "Defender for Servers includes a Defender for Endpoint license and integrates the two automatically. When the endpoint protection integration is on (in the plan's settings), Defender for Cloud deploys the Defender for Endpoint sensor to supported machines, onboards them to your Defender for Endpoint tenant, and shows Defender for Endpoint alerts in Defender for Cloud. The same machines appear in the Defender portal device inventory, so your endpoint analysts and cloud team see one set of detections. The integration also feeds vulnerability data from Microsoft Defender Vulnerability Management into Defender for Cloud recommendations.",
   "Consider a worked example. A retailer runs web servers on Azure VMs and AWS EC2. Secure score shows recommendations for both, but no alerts appear when a test detection runs on an EC2 instance. Checking Environment settings, the team sees the AWS connector has only foundational CSPM. They enable Defender for Servers Plan 2 on the connector, update the CloudFormation stack as prompted, and confirm Azure Arc onboards the instances. Within a few hours the Defender for Endpoint sensor is present, the machines appear in the device inventory, and a repeat test produces an alert in both Defender for Cloud and the Defender portal.",
   "Common mistakes: expecting foundational CSPM to raise alerts; confusing secure score (posture) with an alert count; enabling a plan on one subscription and assuming it covers the whole tenant; forgetting to update the AWS CloudFormation stack after adding plans, so new permissions are missing; and installing a separate Defender for Endpoint license for servers already covered by Defender for Servers. Another trap is thinking attack path analysis is free; it belongs to the paid Defender CSPM plan.",
   "A simple way to remember the split: posture tells you where the doors are unlocked, and workload protection tells you someone is walking through one. On the exam, 'secure score', 'recommendation' and 'compliance' point to CSPM; 'attack path' and 'cloud security explorer' point to Defender CSPM; 'suspicious process on a VM', 'malware uploaded to a blob' and 'SQL injection' point to a paid workload plan. 'Connect AWS' means a connector with a CloudFormation template; 'connect GCP' means a connector with a Cloud Shell script."
  ],
  "terms": [
   [
    "Foundational CSPM",
    "The free Defender for Cloud tier that provides secure score, recommendations and asset inventory."
   ],
   [
    "Defender CSPM",
    "The paid posture plan that adds attack path analysis, cloud security explorer, agentless scanning and governance."
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
    "Azure Arc",
    "The service that projects non-Azure servers into Azure so extensions and Defender plans can be applied to them."
   ],
   [
    "Defender for Endpoint integration",
    "The Defender for Servers feature that deploys and licenses the Defender for Endpoint sensor on protected servers."
   ]
  ],
  "example": "A retailer runs web servers on Azure VMs and AWS EC2. Secure score shows recommendations for both, but no alerts appear when a test detection runs on EC2. The team realizes they only have foundational CSPM on the AWS connector, so they enable Defender for Servers on it; the Defender for Endpoint sensor is then deployed and alerts start arriving in Defender for Cloud and in the Defender portal.",
  "tip": "If an option says foundational CSPM will produce threat alerts, it is wrong. Threat alerts need a Defender workload plan; attack path analysis needs the paid Defender CSPM plan.",
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
   ],
   [
    "Which plan do you need for alerts about malware uploaded to blob storage?",
    "Defender for Storage, ideally with malware scanning enabled; CSPM plans do not raise threat alerts."
   ]
  ]
 },
 {
  "t": "Defender for Identity sensors on domain controllers and AD FS/AD CS servers; Defender for Office 365 Safe Links and Safe Attachments",
  "body": [
   "Microsoft Defender for Identity (MDI) watches on-premises Active Directory (AD) for attacks such as reconnaissance, credential theft, lateral movement and domain dominance. It needs to see authentication and directory traffic, so it relies on sensors installed on the servers that handle identity: every domain controller, plus Active Directory Federation Services (AD FS) servers, Active Directory Certificate Services (AD CS) servers and Microsoft Entra Connect servers. Missing even one domain controller creates a blind spot, because an attacker's Kerberos requests may go to the unmonitored one.",
   "The sensor reads network traffic, Windows events and Event Tracing for Windows (ETW) data locally and sends parsed data to the cloud service. Setup steps you should know: create the MDI workspace in the Defender portal, configure a Directory Service account (a group managed service account, gMSA, is recommended) that the sensor uses to query AD, configure the required Windows advanced audit policies so the right events are logged, check network and firewall requirements, and install the sensor with the access key shown under Settings, Identities, Sensors. On domain controllers already onboarded to Defender for Endpoint, newer Windows Server versions can activate the identity sensor capability from the Defender portal without a separate installer.",
   "Sensor health matters as much as installation. Issues such as a stopped service, a sensor that cannot reach the cloud, or missing audit settings appear as health issues on the Sensors page, and you can have them emailed. The PowerShell module for Defender for Identity includes cmdlets such as `Get-MDIConfiguration` and `Set-MDIConfiguration` that check and apply the required audit policies, which is faster than hunting through Group Policy by hand.",
   "Microsoft Defender for Office 365 (MDO) protects email and collaboration tools. Two policies appear on the exam constantly. Safe Links checks URLs at the time of click rather than only on delivery. That matters because attackers often send a link that points to a clean page and weaponize it hours later. Safe Links can rewrite URLs in email, check links in Microsoft Teams and Office apps, track clicks for investigation (in the UrlClickEvents table), and optionally stop users from clicking through the warning page. You can list URLs that should not be rewritten.",
   "Safe Attachments opens attachments in a sandbox (detonation) to detect unknown malware that signature scanning misses. Its actions include Monitor (deliver and track results), Block (hold the message and quarantine it if malicious) and Dynamic Delivery (deliver the message body right away with a placeholder, then attach the file once it is scanned clean). A separate global setting turns on Safe Attachments for SharePoint, OneDrive and Teams, which blocks malicious files stored there. Both policies can be applied through preset security policies (Standard and Strict), which Microsoft maintains, or through custom policies scoped to users, groups or domains. Built-in protection gives baseline coverage to licensed users who are not covered by any other policy, and presets take precedence over custom policies when both apply.",
   "Consider a worked example. A law firm installed Defender for Identity sensors on four of its five domain controllers. A pass-the-ticket attack goes undetected because the attacker's requests hit the fifth. The SOC notices the gap on the Sensors page, installs the missing sensor, runs `Set-MDIConfiguration` to fix the audit policy health issue, and similar activity then raises alerts within minutes. The same month, a partner's shared link turns malicious two hours after delivery; Safe Links blocks the click with a warning page, and the analyst sees who clicked in the click data.",
   "Common mistakes: installing sensors only on domain controllers and forgetting AD FS, AD CS and Entra Connect; using a regular user account with a password that expires for the Directory Service account instead of a gMSA; ignoring health issues; mixing up Safe Links (URLs, time of click) and Safe Attachments (files, sandbox); and building a custom policy for a user who is already in a Strict preset, then wondering why the custom settings do not apply. Another trap is assuming Safe Attachments for email also covers SharePoint and OneDrive; that is a separate global setting.",
   "Exam questions use strong clue words. 'Every domain controller', 'certificate services' or 'federation server' point to MDI sensor placement. 'Account the sensor uses to query AD' points to the Directory Service account, preferably a gMSA. 'Clean at delivery, malicious later' or 'time of click' means Safe Links. 'Unknown malware in attachments', 'sandbox' or 'detonation' means Safe Attachments. 'Users complain about delayed attachments' means Dynamic Delivery. 'Custom policy seems ignored' often means a preset security policy applies first."
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
    "Group managed service account (gMSA)",
    "An AD account whose password is managed and rotated automatically by domain controllers, suited to services."
   ],
   [
    "Safe Links",
    "An MDO feature that checks URLs when they are clicked in email, Teams and Office apps."
   ],
   [
    "Safe Attachments",
    "An MDO feature that detonates attachments in a sandbox to find unknown malware before or during delivery."
   ],
   [
    "Dynamic Delivery",
    "A Safe Attachments action that delivers the email body immediately and adds the attachment after sandbox scanning."
   ],
   [
    "Preset security policies",
    "Microsoft-maintained Standard and Strict policy bundles that take precedence over custom policies."
   ]
  ],
  "example": "A law firm installed Defender for Identity sensors on four of its five domain controllers. A pass-the-ticket attack goes undetected because the attacker's requests hit the fifth. After installing the missing sensor and fixing the audit policies flagged in sensor health, similar activity raises alerts within minutes. The firm also enables Dynamic Delivery so lawyers get message bodies immediately while attachments are scanned.",
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
   ],
   [
    "Which account type is recommended for the Defender for Identity Directory Service account, and why?",
    "A group managed service account, because its password is rotated automatically and it cannot be used for interactive logon."
   ]
  ]
 },
 {
  "t": "Sentinel workspace design: Log Analytics workspace, Sentinel roles (Reader, Responder, Contributor, Automation Contributor), onboarding to the Defender portal",
  "body": [
   "Microsoft Sentinel is a cloud-native security information and event management (SIEM) and security orchestration, automation and response (SOAR) service. It does not have its own storage: you enable Sentinel on an Azure Monitor Log Analytics workspace, and all ingested data lands in tables in that workspace, such as SigninLogs, SecurityEvent and CommonSecurityLog. So the first design decision is how many workspaces you need, where they live, and who can see them.",
   "Microsoft's general advice is to use as few workspaces as possible, ideally one, because a single workspace makes correlation, rules and hunting simpler. Reasons to split include data residency laws that require data to stay in a region, separate billing or ownership for business units, and managed security service providers (MSSPs) that keep customers apart. When you have several workspaces you can still query across them with the `workspace()` function, and Azure Lighthouse lets providers manage many tenants from one place. Access to data inside one workspace can be narrowed with resource-context RBAC (users see only logs from resources they can access) or table-level RBAC.",
   "Sentinel has built-in Azure roles you assign at the resource group or workspace level. Microsoft Sentinel Reader can view data, incidents, workbooks and other content. Microsoft Sentinel Responder can do everything a Reader can plus manage incidents: assign, change status and severity, comment and close. Microsoft Sentinel Contributor can additionally create and edit content such as analytics rules, workbooks and watchlists. Microsoft Sentinel Automation Contributor is not for people; it is the role you grant to the Sentinel service on a resource group so automation rules can run playbooks stored there. Creating or editing playbooks also needs Logic App Contributor, and Microsoft Sentinel Playbook Operator lets someone list and run playbooks manually.",
   "Pick the least role that does the job. A Tier-1 analyst who triages and closes incidents needs Responder, not Contributor. A detection engineer who writes rules needs Contributor. Someone who installs Content hub solutions also needs Contributor on the resource group. If an automation rule cannot select a playbook's resource group, the usual fix is to open Settings, Playbook permissions in Sentinel, which grants the Sentinel service account the Automation Contributor role there. Assign roles to Entra groups rather than individuals, so onboarding a new analyst is a group membership change.",
   "Microsoft is moving Sentinel into the Microsoft Defender portal, often called the unified security operations platform. You connect a workspace from the Defender portal (Settings, Microsoft Sentinel), and one workspace is marked as primary. After onboarding, Sentinel incidents and Defender XDR incidents share one queue, and the Defender XDR correlation engine groups alerts from both. Some things change: Microsoft incident creation rules are no longer needed because Defender XDR creates incidents, Fusion's role is taken over by Defender XDR correlation, and advanced hunting can query Sentinel tables alongside Defender tables. Most Sentinel configuration pages appear in the Defender portal under Microsoft Sentinel. Microsoft has announced that Sentinel in the Azure portal will be retired in favor of the Defender portal, so new deployments should plan for the unified experience.",
   "Consider a worked example. A European insurer with offices in Germany and Canada must keep German logs in the EU. It creates two workspaces, one in an EU region and one in a Canadian region, and enables Sentinel on both. It onboards both to the Defender portal, marking the EU workspace as primary. Tier-1 analysts receive Responder on both through an Entra group, the detection engineering team receives Contributor, and the SOC lead uses Playbook permissions to grant Sentinel Automation Contributor on the playbooks resource group. Cross-workspace hunting uses `union workspace(\"ws-canada\").SigninLogs, SigninLogs`.",
   "Common mistakes: creating a workspace per data source (it fragments correlation for no benefit); granting Contributor to everyone for convenience; giving Automation Contributor to a person instead of the Sentinel service; forgetting that playbook authors need Logic App permissions too; and assuming onboarding to the Defender portal moves or copies data. It does not; the data stays in the Log Analytics workspace, and the portal simply works on top of it.",
   "Exam wording points to the answer. 'Data must stay in a country or region' means more than one workspace. 'Close and assign incidents but not change rules' means Responder. 'Create analytics rules, workbooks or watchlists' means Contributor. 'View only' means Reader. 'Automation rule cannot run a playbook in another resource group' means Automation Contributor for Sentinel. 'One queue for SIEM and XDR incidents' means onboarding to the Defender portal."
  ],
  "terms": [
   [
    "Log Analytics workspace",
    "The Azure Monitor data store that Sentinel is enabled on and where all its tables live."
   ],
   [
    "Microsoft Sentinel Reader",
    "The role that allows viewing data, incidents and content without changing anything."
   ],
   [
    "Microsoft Sentinel Responder",
    "The role that allows viewing data and managing incidents but not creating or editing content."
   ],
   [
    "Microsoft Sentinel Contributor",
    "The role that adds creating and editing content such as analytics rules, workbooks and watchlists."
   ],
   [
    "Microsoft Sentinel Automation Contributor",
    "A role granted to the Sentinel service on a resource group so automation rules can run playbooks there."
   ],
   [
    "Unified security operations platform",
    "Sentinel and Defender XDR working together in the Microsoft Defender portal with one incident queue."
   ],
   [
    "Primary workspace",
    "The Sentinel workspace designated in the Defender portal whose alerts are correlated with Defender XDR data."
   ]
  ],
  "example": "A European insurer with offices in Germany and Canada must keep German logs in the EU. It creates two workspaces, one per region, onboards both to the Defender portal, and gives Tier-1 analysts the Responder role on both. The detection engineering team receives Contributor, and Sentinel receives Automation Contributor on the playbooks resource group so automation rules can run the enrichment playbooks.",
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
   ],
   [
    "An automation rule cannot run a playbook stored in another resource group. What is the fix?",
    "Grant the Sentinel service the Automation Contributor role on that resource group, usually through Settings, Playbook permissions."
   ]
  ]
 },
 {
  "t": "Data retention and cost: analytics tier vs Sentinel data lake tier, table plans, summary rules, SOC optimization recommendations",
  "body": [
   "Sentinel is billed mainly on the data you ingest and how long you keep it, so a security operations analyst has to think about cost as well as coverage. Not every log deserves the same treatment. High-value security signals that feed detections, such as sign-in logs, endpoint alerts and identity events, should be fast to query. High-volume, low-value logs, such as verbose firewall, proxy or network flow traffic, are often kept mainly for investigations and compliance. Good design puts each kind of data in the tier that matches how you use it.",
   "The analytics tier is the premium, interactive store. Data there supports analytics rules, near-real-time (NRT) detections, workbooks, hunting and fast KQL (Kusto Query Language) queries. Sentinel includes a period of analytics retention at no extra charge, and you can extend interactive retention for longer at a cost. The Sentinel data lake tier is a lower-cost store for long-term and high-volume data. Data in the lake is kept in an open format and can be retained for years. You query it with KQL in data lake exploration, with KQL jobs, or with notebooks, and it is not meant for real-time detection. Exact retention limits and prices change, so check current documentation rather than memorizing numbers. Each Log Analytics table has a table plan, set under the workspace's Tables page or in the Sentinel table management view. The Analytics plan gives full features. The Basic plan is cheaper to ingest, with limited query features and a charge per query. The Auxiliary plan is cheapest and intended for verbose, rarely queried logs. With the data lake enabled, analytics tier data is also mirrored into the lake, and tables can be set to go to the data lake tier only. The key exam distinction is the trade-off: lower ingestion cost comes with fewer features, slower or billed queries, and no standard analytics rules.",
   "Summary rules bridge the tiers. A summary rule runs a KQL query on a schedule, aggregates detailed data from any table (including cheaper tiers), and writes the smaller results into an analytics-tier table. For example, you could keep raw firewall connections in a low-cost tier but summarize connection counts per source IP per hour into an analytics table that detections and workbooks can use. You lose the individual rows in the summary but keep the signal, and the raw data is still there for deep investigation. A summary query might look like this:",
   "```kusto\nCommonSecurityLog\n| where DeviceAction == \"deny\"\n| summarize Denies = count(), Ports = dcount(DestinationPort) by SourceIP, bin(TimeGenerated, 1h)\n```",
   "SOC optimization is a page in the Defender portal (and in Sentinel) that gives tailored recommendations. Data value recommendations point out tables you pay for that no rule or hunt uses, and suggest moving them to a cheaper plan or reducing ingestion. Coverage recommendations compare your detections with common attack scenarios mapped to MITRE ATT&CK and suggest rules or data sources to close gaps. Recommendations based on similar organizations suggest data sources that peers find useful. Each recommendation shows its expected effect and can be marked as completed or dismissed. Other cost levers include collecting only needed events with data collection rules (DCRs), using ingestion-time transformations to drop unneeded columns, and commitment tiers for predictable volumes.",
   "Consider a worked example. A university ingests several hundred gigabytes a day of network flow logs, but only one workbook uses them. SOC optimization flags the table as low value. The team moves raw flow logs to the data lake tier and adds a summary rule that writes hourly per-host connection counts to an analytics table, where a scheduled rule looks for sudden spikes. When an incident needs the raw flows from eight months ago, an analyst runs a KQL job against the lake.",
   "Common mistakes: putting everything in the analytics tier by default; moving a table that an active analytics rule depends on to a cheaper plan and silently breaking the rule; expecting summary rows to contain every original field; and ignoring SOC optimization because the recommendations look like sales advice rather than tuning data.",
   "Exam questions tend to describe a data type and a use. 'Real-time detection', 'analytics rule' or 'workbook' means the analytics tier. 'Keep for years cheaply', 'compliance' or 'rarely queried' means the data lake tier or a low-cost plan. 'Detect on aggregates of cheap data' means a summary rule. 'Which tables are we paying for but not using' or 'which ATT&CK techniques lack detections' means SOC optimization. 'Drop columns before they are stored' means a DCR transformation."
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
    "Table plan",
    "The per-table setting (Analytics, Basic or Auxiliary) that trades ingestion cost against query features."
   ],
   [
    "Summary rule",
    "A scheduled KQL query that aggregates detailed data and writes the results into an analytics-tier table."
   ],
   [
    "SOC optimization",
    "A page of recommendations on data value, detection coverage and peer-based data sources."
   ],
   [
    "Ingestion-time transformation",
    "A KQL statement in a DCR that filters or reshapes data before it is stored, reducing cost."
   ]
  ],
  "example": "A university ingests several hundred gigabytes a day of network flow logs, but only one workbook uses them. SOC optimization flags the table as low value. The team moves raw flow logs to the data lake tier and adds a summary rule that writes hourly per-host connection counts to an analytics table, where a scheduled rule looks for sudden spikes, while the raw flows stay available for investigations.",
  "tip": "When a scenario says 'keep verbose logs cheaply for years but still detect on aggregates', the answer combines a low-cost tier with a summary rule. Standard analytics rules need data in the analytics tier.",
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
   ],
   [
    "What is the main trade-off of the Basic and Auxiliary table plans?",
    "Cheaper ingestion in exchange for limited query features, billed or slower queries, and no standard analytics rules."
   ]
  ]
 },
 {
  "t": "Data connectors and Content hub solutions; Windows Security Events and CEF/Syslog through the Azure Monitor Agent and data collection rules (DCRs); the Logs Ingestion API for custom sources",
  "body": [
   "A security information and event management (SIEM) system is only as good as the data it receives. In Sentinel, data connectors bring logs from Microsoft services, other clouds, firewalls, servers and software-as-a-service (SaaS) apps into workspace tables. Connectors are delivered through Content hub, a catalog of solutions. A solution is a package that can include connectors, analytics rule templates, workbooks, hunting queries, parsers and playbooks for one product or scenario. You install the solution, then open its connector page (Configuration, Data connectors) and follow the steps it lists. Microsoft first-party sources, such as Microsoft Entra ID, Microsoft 365 and Defender XDR, usually connect with a few clicks because they are service-to-service. Servers need an agent. The Azure Monitor Agent (AMA) is the current agent for Windows and Linux; it replaced the older Log Analytics agent, which is retired. AMA is driven by data collection rules (DCRs), which define three things: the data sources to collect, an optional KQL transformation applied at ingestion time, and the destination workspace and table. One DCR can apply to many machines, and one machine can have several DCRs. Machines outside Azure are connected through Azure Arc so that AMA can be deployed to them.",
   "For Windows servers, the Windows Security Events via AMA connector writes to the SecurityEvent table. You choose an event set: All, Common, Minimal, or Custom using XPath queries to collect specific event IDs, for example 4624 (successful logon), 4625 (failed logon) and 4688 (process creation). Choosing a narrow set is the most effective way to control cost. Windows Forwarded Events is a related connector for events collected by Windows Event Forwarding, landing in the WindowsEvent table. A custom XPath query looks like this:",
   "```xml\nSecurity!*[System[(EventID=4624 or EventID=4625 or EventID=4688)]]\n```",
   "Many network devices send logs as Syslog or Common Event Format (CEF), a structured format carried over Syslog. They usually cannot run an agent, so you build a Linux log forwarder: a Linux machine running rsyslog or syslog-ng plus AMA. Devices send to the forwarder on the usual Syslog port, and DCRs tell AMA which facilities and severities to collect. Syslog goes to the Syslog table; CEF goes to the CommonSecurityLog table. The CEF via AMA and Syslog via AMA connectors walk you through creating these DCRs, and a transformation such as `source | where SeverityLevel != \"info\"` can drop noise before storage.",
   "For custom sources, such as an in-house app or a product with no connector, use the Logs Ingestion API. You create a custom table (its name ends in `_CL`), a DCR that describes the incoming data shape and any transformation, and a Microsoft Entra app registration or managed identity. The identity gets the Monitoring Metrics Publisher role on the DCR, and your code sends JSON to the DCR's ingestion endpoint (some setups also use a data collection endpoint, DCE). Microsoft also offers a codeless connector framework for building API-polling connectors without code. Always check data arrives: run `SecurityEvent | take 10`, or look at the connector's status and the table's last-received time.",
   "Consider a worked example. A manufacturer's firewalls can only send CEF over Syslog. The SOC deploys a small Linux VM with rsyslog and AMA, installs the vendor's Content hub solution, creates a DCR for the CEF via AMA connector, and points the firewalls at the VM. Within minutes, CommonSecurityLog fills and the solution's rule templates can be enabled.",
   "Common mistakes: installing a solution and assuming its connector is configured (you still have to set it up); sending CEF from the firewall straight to Sentinel with no forwarder; choosing the All event set on hundreds of servers and paying for noise; forgetting the Monitoring Metrics Publisher role, which makes Logs Ingestion API calls fail with an authorization error; and expecting a custom table without the `_CL` suffix.",
   "Exam questions often ask you to map a format to a table or pick the component that does a job. Windows events go to SecurityEvent, Syslog to Syslog, CEF to CommonSecurityLog, custom API data to a `_CL` table. 'Filter or transform before storage' means the DCR. 'Collect from an appliance that cannot run an agent' means a Linux forwarder with AMA. 'Package of connector, rules and workbooks' means a Content hub solution. 'Send data from our own app' means the Logs Ingestion API."
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
    "Common Event Format (CEF)",
    "A structured, key-value log format carried over Syslog that lands in the CommonSecurityLog table."
   ],
   [
    "Linux log forwarder",
    "A Linux machine running a Syslog daemon and AMA that receives logs from devices and sends them to the workspace."
   ],
   [
    "Logs Ingestion API",
    "A REST API for sending custom data into a workspace table through a DCR."
   ]
  ],
  "example": "A manufacturer's firewalls can only send CEF over Syslog. The SOC deploys a small Linux VM with rsyslog and AMA, installs the vendor's Content hub solution, creates a DCR for the CEF via AMA connector, and points the firewalls at the VM. Within minutes, CommonSecurityLog fills and the solution's analytics rules begin to run, while a DCR transformation drops informational messages to save cost.",
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
   ],
   [
    "How do you connect a firewall that cannot run an agent?",
    "Send its Syslog or CEF to a Linux forwarder running rsyslog or syslog-ng with AMA, controlled by a DCR."
   ]
  ]
 },
 {
  "t": "Analytics rules: scheduled, near-real-time (NRT), Microsoft incident creation, anomaly and Fusion; entity mapping, alert grouping, custom details",
  "body": [
   "Analytics rules are how Sentinel turns data into alerts and incidents. An alert is a single detection; an incident groups one or more alerts into the unit of work an analyst investigates. The exam expects you to know each rule type, when to use it, and the settings that make its alerts useful to analysts. You create rules under Configuration, Analytics, often starting from a template installed by a Content hub solution. Scheduled rules are the workhorse. You write a KQL query, choose how often it runs (query frequency) and how far back it looks (lookback), and set a threshold, such as generate an alert when the query returns more than zero results. The lookback should usually be at least as long as the frequency so events are not missed, and a little overlap covers ingestion delay. You also choose event grouping: one alert for all results, or one alert per result row. Near-real-time (NRT) rules run about every minute over a very short lookback, for high-priority detections where minutes matter, such as a break-glass account signing in. NRT rules have more limits on query complexity than scheduled rules.",
   "Microsoft security (incident creation) rules create Sentinel incidents from alerts produced by other Microsoft products, such as Defender for Cloud. When your workspace is onboarded to the Defender portal they are not used, because Defender XDR creates incidents. Anomaly rules use built-in machine learning to flag unusual behavior. You cannot edit their logic, but you can duplicate one, tune its parameters, and run the copy in flighting mode to compare. Anomalies go to the Anomalies table and are often used in hunting rather than as incidents. Fusion is Sentinel's multistage attack detection: it correlates low-fidelity alerts and anomalies from several products into high-fidelity incidents, such as a suspicious sign-in followed by mass file download. In the Defender portal, Defender XDR's correlation engine takes over this role.",
   "Entity mapping is what makes alerts useful. You map query columns to entity types such as Account, Host, IP, URL, File, Process and Mailbox, choosing identifiers like account name, UPN suffix or Microsoft Entra object ID. Mapped entities feed the investigation graph, entity pages, user and entity behavior analytics (UEBA) and correlation. Without them, analysts see text but have nothing to pivot on. Custom details surface specific event fields, such as a command line or a count, directly in the alert, so analysts do not need to rerun the query. Alert details let you set the alert name, description and severity dynamically from columns, for example `Failed logons for {{TargetAccount}}`.",
   "Alert grouping controls how alerts become incidents. By default each alert creates its own incident. You can group all alerts from the rule within a time window into one incident, group only alerts whose mapped entities all match, or group by selected entities and details. You can also choose whether a new alert reopens a closed incident. Good grouping prevents a brute-force rule from producing fifty separate incidents for the same account. A typical scheduled rule query:",
   "```kusto\nSecurityEvent\n| where EventID == 4625\n| summarize Failures = count() by TargetAccount, Computer\n| where Failures >= 5\n```",
   "Consider a worked example. A detection engineer turns that query into a scheduled rule that runs every 10 minutes with a 15-minute lookback. She maps TargetAccount to the Account entity and Computer to Host, adds Failures as a custom detail, sets the alert name to include the account, and groups alerts into one incident per account for 24 hours. A burst of attacks now produces one incident per victim account instead of dozens.",
   "Common mistakes: a lookback shorter than the frequency, leaving gaps; skipping entity mapping; using NRT for a heavy query it cannot run; expecting to edit an anomaly rule's model; and keeping Microsoft incident creation rules after moving to the Defender portal, which duplicates incidents.",
   "Exam clue words map neatly to answers. 'Within about a minute' or 'as soon as possible' points to NRT. 'Multistage attack across products' points to Fusion (or Defender XDR correlation in the unified portal). 'Create incidents from Defender for Cloud alerts in Sentinel' points to a Microsoft security rule. 'Machine learning baseline, cannot change the logic' points to anomaly rules. 'Too many incidents for the same user' points to alert grouping. 'Show the command line in the alert' points to custom details. 'Pivot on the user in the investigation graph' points to entity mapping."
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
    "Microsoft security rule",
    "A rule that creates Sentinel incidents from alerts raised by other Microsoft security products."
   ],
   [
    "Anomaly rule",
    "A built-in machine learning rule whose parameters, but not logic, can be tuned in a duplicate."
   ],
   [
    "Fusion",
    "Sentinel's machine-learning correlation that combines alerts and anomalies into multistage attack incidents."
   ],
   [
    "Entity mapping",
    "Mapping query columns to entity types such as Account, Host and IP so alerts carry structured evidence."
   ],
   [
    "Alert grouping",
    "Settings that decide which alerts are combined into one incident and for how long."
   ]
  ],
  "example": "A detection engineer writes a scheduled rule that runs every 10 minutes with a 15-minute lookback, alerting when one account has 5 or more failed logons. She maps Account and Host entities, adds the failure count as a custom detail, and groups alerts into one incident per account for 24 hours. A burst of attacks now produces one incident per victim account instead of dozens.",
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
    "No. You can duplicate it and adjust its parameters, and compare versions in flighting mode, but the underlying model is built in."
   ],
   [
    "How do you show a process command line directly in the alert without rerunning the query?",
    "Add the command line column as a custom detail in the analytics rule."
   ]
  ]
 },
 {
  "t": "Custom detection rules in Defender XDR advanced hunting; MITRE ATT&CK coverage of your rules",
  "body": [
   "Advanced hunting in the Defender portal lets you query up to 30 days of raw Defender XDR data with Kusto Query Language (KQL), and, when Sentinel is onboarded, Sentinel tables as well. A custom detection rule is a saved advanced hunting query that runs on a schedule and raises alerts, and optionally takes response actions, whenever it returns results. It is the Defender XDR counterpart of a Sentinel scheduled analytics rule, and its alerts join incidents in the same queue as built-in detections.",
   "To create one, you write and test a query under Investigation and response, Hunting, Advanced hunting, then choose Create detection rule. The query must return columns that let Defender identify the event and the affected asset. For most device tables that means Timestamp, DeviceId and ReportId; email and identity tables have their own identifier columns, such as NetworkMessageId and RecipientEmailAddress for email or AccountObjectId for identity. Rows need a Timestamp in the lookback window. If these columns are missing, the wizard will not let you save the rule, so it is common to project them explicitly at the end of the query:",
   "```kusto\nDeviceProcessEvents\n| where InitiatingProcessFileName in~ (\"winword.exe\", \"excel.exe\")\n| where FileName =~ \"powershell.exe\" and ProcessCommandLine has \"-enc\"\n| project Timestamp, DeviceId, ReportId, DeviceName, AccountName, ProcessCommandLine\n```",
   "The wizard then asks for alert details: name, frequency, severity, category, a description, recommended actions and MITRE ATT&CK techniques. Frequency options range from continuous (near-real-time, for supported queries) through every hour, every few hours and once a day; the lookback is tied to the frequency. Next you choose impacted entities, the columns that identify the device, mailbox or user. Finally, you can select automatic actions on those entities, such as isolate device, collect investigation package, run antivirus scan, restrict app execution, quarantine a file, soft-delete an email, or mark a user as compromised or disable the user. Use automatic actions only for high-confidence rules, because a false positive that isolates a server can cause an outage.",
   "MITRE ATT&CK is a public knowledge base of adversary tactics (the goal, such as persistence or credential access) and techniques (the method, such as T1003 OS credential dumping), with sub-techniques beneath them. Tagging every rule with its techniques lets you measure coverage: which techniques you detect and which you do not. In Sentinel, the MITRE ATT&CK page shows a matrix colored by the number of active rules, and can also show rules you could enable from templates (simulated coverage). SOC optimization coverage recommendations compare your rules against common attack scenarios. Coverage is about detections, not about blocking; a technique can be well prevented by attack surface reduction rules and still have no detection.",
   "Consider a worked example. An analyst writes the query above for encoded PowerShell launched by Office apps, confirms it returns Timestamp, DeviceId and ReportId, and runs it over the last 30 days to see how many alerts it would have produced: four, all from one test lab. She adds a filter excluding the lab device group, saves it as an hourly custom detection tagged with the command and scripting interpreter technique, sets DeviceId as the impacted device, and chooses collect investigation package as the automatic action. The Sentinel MITRE page now shows that technique covered.",
   "Common mistakes: forgetting ReportId, so the rule cannot be saved; choosing isolate device on a noisy rule; not testing the query over the full lookback period first; tagging a rule with a tactic but no technique, which gives you nothing useful in the matrix; and treating a colored MITRE cell as proof you are safe, when one weak rule can color a cell. Review rules regularly from the Detection rules page, where you can edit, turn off or run a rule on demand, and read the status and error of each run if a query times out or a table changes.",
   "Exam questions often hinge on a few phrases. 'The rule cannot be saved' points to missing required columns. 'Automatically isolate the device when the query matches' points to a custom detection with a response action. 'Which ATT&CK techniques lack detections' points to the MITRE ATT&CK coverage page or SOC optimization. 'Goal versus method' is tactic versus technique. 'Defender data plus Sentinel data in one detection' points to advanced hunting in the unified portal."
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
    "Impacted entity",
    "The device, user or mailbox column the rule marks as affected and targets for actions."
   ],
   [
    "MITRE ATT&CK",
    "A public framework of adversary tactics and techniques used to label detections and measure coverage."
   ],
   [
    "Tactic",
    "In MITRE ATT&CK, the adversary's goal at a stage of an attack, such as credential access or persistence."
   ],
   [
    "Technique",
    "In MITRE ATT&CK, the method used to achieve a tactic, identified by an ID such as T1003."
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
    "What is the difference between a tactic and a technique in MITRE ATT&CK?",
    "A tactic is the attacker's goal, such as credential access; a technique is how they achieve it, such as dumping LSASS memory."
   ],
   [
    "Does a well-colored MITRE ATT&CK matrix mean a technique is prevented?",
    "No. It shows detection rules mapped to techniques; prevention comes from controls such as ASR rules, and a single weak rule can still color a cell."
   ]
  ]
 },
 {
  "t": "Automation: automation rules vs Logic Apps playbooks, triggers, incident tasks; watchlists, workbooks, UEBA and threat intelligence connectors",
  "body": [
   "Sentinel has two automation layers. Automation rules are lightweight, built-in rules that run when incidents are created or updated, or when alerts are created. They can change status, severity or owner, add tags, add incident tasks and run playbooks. Rules have an order number (lower runs first), an optional expiration date, and conditions such as analytics rule name, severity, tag or entity values. They are ideal for triage: assign all phishing incidents to the email team, raise severity when a VIP account is involved, or close known-benign incidents automatically, perhaps for a limited time while a rule is fixed.",
   "Playbooks are Azure Logic Apps workflows. They handle anything that needs outside systems or multi-step logic: enriching an IP address from a reputation service, posting to Microsoft Teams, opening a ticket, disabling a user through Microsoft Graph, or asking an analyst for approval. Playbooks use the Microsoft Sentinel trigger, which comes in three kinds: incident, alert and entity. Incident-trigger playbooks can be run from automation rules and are the recommended type. Alert-trigger playbooks can also be run from automation rules that fire when an alert is created. Entity-trigger playbooks are run manually from an entity. Playbooks authenticate to Sentinel and other services, ideally with a managed identity, and Sentinel needs the Automation Contributor role on the playbook's resource group.",
   "Incident tasks are checklists inside an incident, such as Reset password or Check inbox rules. Automation rules or playbooks add them, so every analyst follows the same steps for a given incident type, and completing them is tracked. Watchlists are reference lists you upload, usually as CSV files: VIP users, known admin hosts, terminated employees, or approved IP ranges. Each has an alias and a search key column. In KQL, `_GetWatchlist('VIPUsers')` returns the list, which you join or filter against in rules and hunts. Watchlists help both to raise priority (alert when a VIP is involved) and to reduce noise (exclude known scanners).",
   "```kusto\nlet vips = _GetWatchlist('VIPUsers') | project SearchKey;\nSigninLogs\n| where ResultType != \"0\" and UserPrincipalName in (vips)\n```",
   "Workbooks are interactive dashboards built on Azure Monitor workbooks. Many come with Content hub solutions, and you can build your own with KQL-driven charts, grids and parameters. They are for visualization and reporting, not for alerting. User and entity behavior analytics (UEBA) builds baselines of normal behavior for users, hosts and other entities from sources such as sign-in logs, audit logs and Windows security events. It writes to tables such as BehaviorAnalytics, IdentityInfo and UserPeerAnalytics, and enriches entity pages with insights like first time this user accessed this resource. You enable UEBA in Sentinel settings, choose its data sources and sync it with Microsoft Entra ID. Threat intelligence connectors bring indicators of compromise into the workspace. Examples are the Threat Intelligence TAXII connector for Structured Threat Information Expression (STIX) and Trusted Automated Exchange of Intelligence Information (TAXII) feeds, the upload API connector for threat intelligence platforms, and the Microsoft Defender Threat Intelligence connector. Indicators are then used by threat intelligence matching analytics rules and in hunting.",
   "Consider a worked example. A SOC creates an automation rule that fires on incidents from its phishing rules: it assigns them to the email team, adds three incident tasks, and runs an incident-trigger playbook that looks up each URL's reputation and posts a summary to a Teams channel. A second automation rule, ordered after the first, raises severity to High when the VIPUsers watchlist matches a mapped account.",
   "Common mistakes: building a playbook for something an automation rule does natively, such as changing owner; attaching an alert-trigger playbook and expecting incident fields; forgetting Automation Contributor, so the playbook does not appear; misordering automation rules so a later rule undoes an earlier one; and using a workbook where a detection is needed.",
   "Exam questions separate the tools by what they touch. Choose an automation rule for in-Sentinel changes (owner, status, severity, tags, tasks). Choose a playbook when the scenario mentions an external system, enrichment API, email, Teams or ticketing. 'Consistent checklist for analysts' means incident tasks. 'List of VIPs or approved IPs used in queries' means a watchlist. 'Dashboard' means a workbook. 'First time this user did X' or 'peer baseline' means UEBA. 'STIX/TAXII feed' means the TAXII connector."
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
    "Incident task",
    "A checklist item inside an incident that standardizes and tracks investigation steps."
   ],
   [
    "Watchlist",
    "A reference list, queried with _GetWatchlist(), used to enrich or filter rules and hunts."
   ],
   [
    "Workbook",
    "An interactive KQL-driven dashboard for visualization and reporting."
   ],
   [
    "UEBA",
    "User and entity behavior analytics, which baselines normal activity and highlights anomalies on entity pages."
   ],
   [
    "STIX/TAXII",
    "A standard format (STIX) and transport protocol (TAXII) for sharing threat intelligence indicators."
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
   ],
   [
    "You need every new phishing incident assigned to the email team. Automation rule or playbook?",
    "An automation rule, because changing the owner is a native in-Sentinel action and needs no external system."
   ]
  ]
 },
 {
  "t": "Defender portal incident queue: triage, assignment, attack story, alert correlation, linking alerts and merging incidents, classification and determination",
  "body": [
   "An alert is a single detection. An incident is a collection of related alerts and the evidence behind them that together tell the story of one attack. Defender XDR (extended detection and response) automatically correlates alerts from endpoint, identity, email, cloud apps and, with Sentinel onboarded, security information and event management (SIEM) sources into incidents, based on shared entities such as the same user, device, file or IP address, and on timing. Working at the incident level saves time and shows the whole attack instead of fragments, which is why the security operations center (SOC) queue is built around incidents rather than alerts.",
   "The incident queue, under Investigation and response, Incidents and alerts, is your starting point. You filter and sort by severity, status, service source, detection source, tags, assigned to, device group or time, and you can save filters for your shift. Triage means deciding quickly which incidents need attention first: high severity, multiple sources, sensitive assets such as domain controllers or executives, or a tag such as Attack Disruption. Assign the incident to yourself or a colleague so work is not duplicated, and set the status to In progress. Incidents with many alerts from several products are usually more urgent than a single low-severity alert.",
   "Opening an incident shows the attack story: a timeline of the alerts, an incident graph of how users, devices, files and IP addresses connect, and details of each alert with its process tree. Other tabs list the assets (devices, users, mailboxes, apps), the automated investigations, and the evidence and response items with their verdicts. A summary panel shows the incident's scope and, where licensed, a Security Copilot summary. You can add comments and tags so later analysts see your reasoning, and the activity log records every change.",
   "Correlation is not always perfect. If an alert clearly belongs to another incident, you can link it to that incident from the alert page (Link alert to another incident), either an existing one or a new one. You can also merge incidents that turn out to be the same attack: select them in the queue and choose Merge, which moves their alerts into one incident and closes the others as merged. Conversely, you can move an unrelated alert out into a new incident. Keeping one incident per attack keeps metrics and response coherent and stops two analysts working the same attack in parallel.",
   "When you resolve an incident, set a classification and a determination. The classifications are True positive, Informational expected activity, and False positive. Determinations give the detail. For true positives, examples include multistage attack, malware, phishing, compromised account and malicious user activity. For informational expected activity, examples are security testing, line-of-business application and confirmed activity. For false positives, examples are not malicious and not enough data to validate. Sentinel in the Azure portal uses similar terms: true positive, benign positive (suspicious but expected), false positive and undetermined. Correct classification feeds tuning: many false positives from one rule means the rule needs work, while an authorized penetration test should not be marked false positive, because the detection worked correctly.",
   "Consider a worked example. Two incidents appear ten minutes apart: one for a phishing email delivered to a finance user, one for suspicious PowerShell on the same user's laptop. The Tier-1 analyst filters the queue by that user, sees the shared user and device, merges the two into one incident, assigns it to herself and sets it to In progress. The attack story shows the email, a click, a downloaded script and an outbound connection. She isolates the laptop, removes the email from all mailboxes, and after cleanup resolves the incident as True positive with a phishing determination, adding a comment summarizing the evidence.",
   "Common mistakes: working alerts one by one and missing that they are the same attack; leaving incidents unassigned so two people duplicate effort; marking a red-team exercise as false positive, which hides a working detection and pushes someone to weaken it; merging incidents that merely share a common server but are unrelated, which muddles scope; and closing without a determination or comment, which leaves nothing for metrics or the next analyst. Another trap is assuming severity alone sets priority; asset value and breadth matter too.",
   "Exam questions use the portal's own words. 'Alert belongs to a different incident' points to linking the alert. 'Two incidents are the same attack' points to merging. 'Approved penetration test detected' points to Informational expected activity with a security testing determination (benign positive in Sentinel). 'Detection logic was wrong' points to False positive. 'See how entities connect' points to the incident graph in the attack story. 'Avoid duplicate work' points to assignment."
  ],
  "terms": [
   [
    "Incident",
    "A group of correlated alerts and evidence that represents one attack or related activity."
   ],
   [
    "Alert correlation",
    "Automatic grouping of alerts into incidents based on shared entities and timing."
   ],
   [
    "Attack story",
    "The incident view that shows the alert timeline, an incident graph and alert details."
   ],
   [
    "Merge incidents",
    "Combining incidents that represent the same attack so their alerts sit in one incident."
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
  "example": "Two incidents appear ten minutes apart: one for a phishing email, one for suspicious PowerShell on the same user's laptop. The Tier-1 analyst sees the shared user and device, merges them into one incident, assigns it to herself, isolates the laptop, and after cleanup resolves it as a true positive with a phishing determination and a comment explaining the chain of events.",
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
   ],
   [
    "Why assign an incident and set it to In progress when you start work?",
    "It shows colleagues who owns it, prevents duplicate investigation and keeps queue metrics accurate."
   ]
  ]
 },
 {
  "t": "Defender for Endpoint response: isolate device, restrict app execution, run antivirus scan, collect investigation package, live response, stop and quarantine file, file indicators, device timeline",
  "body": [
   "When an endpoint is involved in an incident, Microsoft Defender for Endpoint (MDE) gives you response actions on the device page and on file pages. Knowing which one fits the situation is a core SC-200 skill, because each action trades containment against disruption to the user. Device actions appear in the top-right menu of the device page; file actions appear on the file page you reach from an alert, the device timeline or a search.",
   "Isolate device cuts the machine off from the network while keeping its connection to the Defender service, so you can still investigate and run actions. Full isolation blocks everything else; selective isolation allows Outlook, Teams and similar apps to keep working on supported platforms. Isolation stops lateral movement, data theft and command-and-control (C2) traffic. Restrict app execution is different: the device stays on the network, but only code signed by Microsoft can run. It suits a case where the user must keep working and the threat is an unsigned tool. Both actions are reversible from the device page and require a comment explaining why.",
   "Run antivirus scan starts a quick or full Microsoft Defender Antivirus scan remotely. Collect investigation package gathers forensic data into a zip file: running processes, network connections, scheduled tasks, services, autoruns, installed programs, prefetch files, security event logs and more. It is a fast way to capture a snapshot before the device is reimaged. Live response opens a remote shell session on the device from the portal. It must be turned on under Settings, Endpoints, Advanced features (servers have a separate toggle). Basic commands, which are read-only, let you list processes, view files and collect files with `getfile`. Advanced commands, which need the advanced live response permission in your role, let you upload files and scripts to the library with `putfile`, run library scripts with `run`, and remediate files; running unsigned scripts needs a separate setting. All commands are logged.",
   "```text\nprocesses\ngetfile \"C:\\Users\\Public\\invoice.js\"\nrun collect-logs.ps1\nremediate file \"C:\\Users\\Public\\invoice.js\"\n```",
   "For a malicious file, stop and quarantine file kills the running processes and moves the file to quarantine on the devices where it was seen. Add indicator creates a file hash indicator with an action such as block execution or block and remediate, so the file cannot run anywhere in the tenant or in the device groups you choose. You can also download the file for analysis or submit it for deep analysis in a sandbox. For IP and URL indicators, remember that network protection must be on. The device timeline shows the device's events in time order: process starts, network connections, file changes, logons and registry changes, with alerts marked. You can filter, search, flag events of interest and export. The same data lives in advanced hunting tables such as DeviceProcessEvents, which helps when you need to search across many devices. Every action you take appears in the Action center, where it can be reviewed and undone.",
   "Consider a worked example. A laptop shows ransomware-like file renames. The analyst isolates it immediately with full isolation, then collects an investigation package. The device timeline shows the encryptor arrived as an email attachment ten minutes before the alert and was launched by the user. She uses stop and quarantine file on the encryptor, which also finds and quarantines copies on two other laptops, and adds a block and remediate hash indicator so the file cannot run on any other device. Through live response she collects the ransom note with `getfile` for the incident record, then hands the laptop to desktop support for reimaging.",
   "Common mistakes: choosing restrict app execution when C2 traffic is active (the device can still talk out); isolating a critical server without coordinating with its owners; relying on quarantine on one device when the file is spreading (use an indicator); expecting live response to work when it is disabled or your role lacks advanced permissions; and reimaging before collecting an investigation package, which destroys evidence. Remember too that access to actions depends on your role and the device group, so a Tier-1 analyst may be able to run scans but not live response.",
   "Exam scenarios hinge on clue words. 'Stop lateral movement' or 'communicating with a C2 server' means isolate. 'User must keep working, block untrusted tools' means restrict app execution. 'Forensic snapshot before reimage' means collect investigation package. 'Run a custom script or retrieve a specific file' means live response. 'Block this file everywhere' means a file indicator. 'What happened on this machine before the alert' means the device timeline."
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
   ],
   [
    "Stop and quarantine file",
    "An action that kills a file's processes and quarantines it on the devices where it was seen."
   ],
   [
    "Device timeline",
    "A chronological view of a device's process, network, file, logon and registry events with alerts marked."
   ]
  ],
  "example": "A laptop shows ransomware-like file renames. The analyst isolates it immediately, collects an investigation package, uses stop and quarantine file on the encryptor, and adds a block and remediate hash indicator so the file cannot run on other devices. The device timeline shows the file arrived from an email attachment ten minutes before the alert, which leads her to purge the email from other mailboxes.",
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
   ],
   [
    "Why collect an investigation package before reimaging a device?",
    "Reimaging destroys evidence; the package preserves processes, connections, persistence and logs for later analysis."
   ]
  ]
 },
 {
  "t": "Action center: pending and completed remediation actions; automatic attack disruption of compromised users and devices",
  "body": [
   "The Action center in the Defender portal (Investigation and response, Actions and submissions, Action center) is one place to see remediation actions across Defender XDR, whether an analyst took them manually or automated investigation and response (AIR) proposed them. It has two tabs. Pending lists actions that are waiting for approval. History lists actions that were completed, failed, rejected or undone, with who approved them and when. It is the single answer to the question of what has been done, or is waiting to be done, to contain this attack.",
   "Why do actions wait? Each device group has an automation level. Full remediation means automated investigations fix threats automatically. Semi-automated levels require approval for some or all remediation, for example approval for any folders or approval only for core folders. No automated response means investigations do not run at all on those devices. In Defender for Office 365, email remediation found by automated investigations, such as soft-deleting a phishing message from many mailboxes, also waits in the Pending tab for approval. Reviewing Pending regularly matters because a threat is not contained until someone approves.",
   "From an action you can approve or reject it, open the related investigation to see the evidence graph and verdicts, and in History undo actions that can be undone, such as releasing a quarantined file or ending device isolation. Action types include quarantine file, remove persistence (for example a registry run key), stop process, isolate device, collect investigation package and soft delete email. The History tab also serves as an audit trail for who did what during an incident, and you can export it for a post-incident review.",
   "Automatic attack disruption is a Defender XDR capability for high-confidence, in-progress attacks such as human-operated ransomware, business email compromise (BEC) and adversary-in-the-middle (AiTM) phishing. It correlates signals across products, and when it is confident an attack is happening it contains assets automatically: containing a device so other onboarded devices stop talking to it, disabling a compromised user account in Active Directory through Defender for Identity, or containing a user so the account cannot be used for lateral movement. Suspending the user in Microsoft Entra ID and revoking sessions in cloud apps are other possible actions. The incident is tagged Attack Disruption so analysts spot it immediately.",
   "Attack disruption depends on the products being deployed and configured: for example, Defender for Endpoint onboarding with automated response allowed, and Defender for Identity for on-premises account disable. You can exclude specific users or devices, such as critical service accounts or core infrastructure, under the automated response exclusions settings. After the analyst has investigated and remediated, they release the contained device or re-enable the user from the Action center or the asset page. The value is speed: ransomware can spread in minutes, faster than any human SOC can respond. Attack disruption buys time; the analyst still investigates, removes the root cause and resets credentials.",
   "Consider a worked example. At 2 a.m., Defender XDR sees a compromised admin account pushing a suspicious binary to many servers. Attack disruption contains the source device and disables the account in Active Directory. When the on-call analyst logs in, the incident is tagged Attack Disruption. She reviews the attack story, finds two further servers where the binary landed, and sees in the Pending tab that an automated investigation wants to quarantine it on those servers because their device group is semi-automated. She approves both actions, works with the identity team to reset the admin password and revoke its sessions, removes the persistence the attacker created, and releases containment from the Action center.",
   "Common mistakes: assuming remediation happened when it is still sitting in Pending; setting sensitive device groups to no automated response and then wondering why investigations never remediate; forgetting to release containment after cleanup, which leaves users unable to work; not excluding break-glass or critical service accounts from automatic containment; and treating attack disruption as the end of the response rather than the start of the investigation.",
   "Exam wording is consistent. 'Remediation was proposed but not applied' or 'waiting for approval' points to the Pending tab and the device group's automation level. 'Who approved this action' or 'undo a quarantine' points to the History tab. 'Automatically contain a device and disable a user during ransomware without analyst action' points to automatic attack disruption. 'Stop a service account from being disabled automatically' points to an exclusion."
  ],
  "terms": [
   [
    "Action center",
    "The Defender portal page listing pending and completed remediation actions across Defender XDR."
   ],
   [
    "Automated investigation and response (AIR)",
    "Defender's automatic investigation of alerts that produces verdicts and proposed remediation actions."
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
    "Contain device",
    "An attack disruption action that stops other onboarded devices from communicating with a compromised device."
   ],
   [
    "Contain user",
    "An attack disruption action that stops a compromised account from being used to move laterally."
   ]
  ],
  "example": "At 2 a.m., Defender XDR sees a compromised admin account pushing a suspicious binary to many servers. Attack disruption contains the source device and disables the account in Active Directory. When the on-call analyst logs in, the incident is tagged Attack Disruption; after investigating, she approves pending quarantine actions, resets the account, removes the binary and releases containment from the Action center.",
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
   ],
   [
    "Where do you undo a quarantine or see who approved an action?",
    "In the Action center's History tab, which lists completed actions with approvers and allows undo where supported."
   ]
  ]
 },
 {
  "t": "Defender for Office 365: Threat Explorer, removing delivered phishing, user-reported messages and Submissions",
  "body": [
   "When a phishing campaign lands, the first questions are who received it, who clicked, and how to get it out of mailboxes. Microsoft Defender for Office 365 (MDO) answers these in the Defender portal. Speed matters, because every minute a phishing email sits in inboxes is another chance for someone to click, and a single credential entered can turn an email incident into an identity compromise.",
   "Threat Explorer (in MDO Plan 2) is an interactive tool, under Email and collaboration, Explorer, to search and act on email. Views include All email, Malware, Phish and Content malware, and you can filter by sender, sender domain, recipient, subject, URL, file hash, Network Message ID, delivery action and latest delivery location (inbox, junk, quarantine, deleted). A related Campaigns view groups messages that belong to the same coordinated attack. MDO Plan 1 has a simpler tool called Real-time detections that lacks some actions. Threat Explorer also shows URL click data from Safe Links, so you can see who clicked a malicious link and whether it was blocked.",
   "To remove delivered phishing, select the messages in Threat Explorer and choose Take action. Options include move to junk, move to deleted items, soft delete (the user can still recover it from Recoverable Items), hard delete (removed from the mailbox), move to inbox for false positives, and submit to Microsoft. You can also start an automated investigation. Remediation actions from Threat Explorer are recorded in the Action center, where they can be tracked and, where required, approved. Zero-hour auto purge (ZAP) does something similar automatically: when a message already delivered is later judged malicious, ZAP moves it to junk or quarantine, depending on policy. The same data is in advanced hunting, for example:",
   "```kusto\nEmailEvents\n| where Subject has \"payroll update\" and SenderFromDomain == \"contoso-pay.example\"\n| project Timestamp, RecipientEmailAddress, DeliveryLocation, NetworkMessageId\n```",
   "Users are an important sensor. With the built-in Report button in Outlook, users report messages as phishing, junk or not junk. The user reported settings decide where reports go: to Microsoft, to a reporting mailbox you choose, or both. Reported messages appear on the Submissions page under the User reported tab, where analysts review them, mark them, and optionally notify the user of the result. User reports can also trigger automated investigations. The Submissions page is also where admins submit items to Microsoft for analysis: emails, attachments, URLs, files and Teams messages. You submit a false negative (malicious mail that got through) or a false positive (good mail that was blocked), and Microsoft returns a verdict. For false positives you can create allow entries in the Tenant Allow/Block List, and for false negatives you can add block entries for senders, URLs or files.",
   "Consider a worked example. Forty employees receive a fake payroll email, and three report it with the Report button. The analyst opens the report on the Submissions page, pivots to Threat Explorer by subject and sender, and finds all forty copies, thirty-eight in inboxes. She soft deletes them, checks URL clicks and sees two users clicked through, blocks the sender domain and URL in the Tenant Allow/Block List, submits a sample to Microsoft as a false negative, and opens an identity investigation for the two users, starting with their sign-in logs after the click time.",
   "Common mistakes: deleting only the reported copies instead of every copy in the tenant; hard deleting when you might need the message as evidence or it could be a false positive; forgetting the click data, so a user who entered credentials is missed; assuming Plan 1 has Threat Explorer; and relying on ZAP alone, which depends on a later verdict and may not act on every message. Another trap is blocking a sender but not the URL, so a new sender with the same link gets through.",
   "Exam questions name the tool by its job. 'Find every copy and remove it' means Threat Explorer and Take action. 'Plan 1 equivalent' means Real-time detections. 'Recoverable by the user' means soft delete. 'Already-delivered mail later found malicious, removed automatically' means ZAP. 'Where do user reports appear' means Submissions, User reported. 'Tell Microsoft a verdict was wrong' means an admin submission. 'Block this sender or URL tenant-wide' means the Tenant Allow/Block List."
  ],
  "terms": [
   [
    "Threat Explorer",
    "An MDO Plan 2 tool for searching, analyzing and remediating email across the tenant."
   ],
   [
    "Real-time detections",
    "The simpler MDO Plan 1 email search tool, with fewer remediation actions than Threat Explorer."
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
   ],
   [
    "Tenant Allow/Block List",
    "A tenant-wide list of allow and block entries for senders, URLs and files."
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
    "Use Threat Explorer's URL click data (from Safe Links) filtered on that URL, or the UrlClickEvents table in advanced hunting."
   ],
   [
    "What is the difference between soft delete and hard delete?",
    "Soft delete moves the message to Recoverable Items, where the user can restore it; hard delete removes it completely."
   ],
   [
    "What does zero-hour auto purge do?",
    "It automatically moves already delivered messages to junk or quarantine when they are later judged malicious."
   ]
  ]
 },
 {
  "t": "Defender for Identity alerts: DCSync, Golden Ticket, pass-the-hash; lateral movement paths; KRBTGT reset",
  "body": [
   "Microsoft Defender for Identity (MDI) raises alerts for classic Active Directory (AD) attacks. You do not need to know how to perform them, but you must recognize them, understand what the attacker gained, and know the correct response. These alerts matter because they usually mean the attacker is already inside and working toward control of the whole domain, so they deserve high priority in the queue.",
   "DCSync abuses directory replication. Domain controllers legitimately replicate with each other using the Directory Replication Service (DRS) protocol. An attacker with an account holding replication rights (such as Domain Admins, or an account given the Replicating Directory Changes All permission) asks a domain controller to replicate password data from a machine that is not a domain controller. MDI raises Suspected DCSync attack (replication of directory services) because replication requests from a non-domain-controller are abnormal. The response is to find how the attacker got the privileged account, remove any unexpected replication permissions, reset affected credentials and treat any obtained hashes, possibly including KRBTGT, as compromised.",
   "A Golden Ticket is a forged Kerberos ticket-granting ticket (TGT). If an attacker steals the hash of the KRBTGT account, the account that signs all TGTs in the domain, they can create TGTs for any user, with any group memberships and long lifetimes, without ever touching a password. MDI detects signs of forged tickets, such as encryption downgrades, tickets for nonexistent accounts, time anomalies and forged authorization data. A Golden Ticket means the domain is fully compromised, and the response must be planned as a recovery, not a quick fix.",
   "Pass-the-hash uses a stolen NT LAN Manager (NTLM) password hash to authenticate as a user without knowing the password. Pass-the-ticket does the same with a stolen Kerberos ticket. MDI flags Suspected identity theft (pass-the-hash) or pass-the-ticket when a user's credentials appear on a device where that user is not logged on. Response: isolate the source device, reset the user's password, and investigate how the hash was stolen, often through credential dumping from the Local Security Authority Subsystem Service (LSASS) process. In advanced hunting, IdentityLogonEvents and DeviceLogonEvents help trace where the account was used.",
   "Lateral movement paths (LMPs) show how an attacker could get from a non-sensitive account to a sensitive one by chaining sessions and local admin rights. For example, a helpdesk user is local admin on a workstation where a domain admin has logged on, so compromising the helpdesk user could expose the domain admin's credentials. MDI shows LMPs on user and device pages and in reports. You reduce them by removing unnecessary local admin rights, using a tiered admin model and Windows Local Administrator Password Solution (LAPS), and stopping privileged accounts from signing in to ordinary workstations. Recovering from a Golden Ticket requires resetting the KRBTGT password twice. Active Directory keeps the current and previous KRBTGT password, and tickets signed with either remain valid, so one reset is not enough. Wait for replication across all domain controllers between the two resets, plan for the disruption to existing sessions, and first remove the attacker's access, or they will steal the new hash too.",
   "Consider a worked example. MDI raises Suspected DCSync attack from a workstation using a service account that someone granted replication rights years ago. The SOC isolates the workstation through Defender for Endpoint, removes the replication permissions from the service account, and resets it and all privileged passwords. Because the attacker could have replicated the KRBTGT hash, the identity team performs two KRBTGT resets separated by full replication, watches for Kerberos errors, and then reviews the lateral movement path report to remove the local admin rights that let the attacker reach that workstation.",
   "Common mistakes: resetting KRBTGT only once; resetting it twice in quick succession before replication, which can break authentication across the domain; resetting passwords while the attacker still has a foothold; treating pass-the-hash as solved by a password reset alone without finding the device where the hash was stolen; and ignoring lateral movement paths because no alert has fired yet. Another trap is thinking MDI detects these attacks without sensors on every domain controller.",
   "Exam questions give you the signature and expect the attack name or the fix. 'Replication request from a non-domain-controller' means DCSync. 'Forged TGT' or 'stolen KRBTGT hash' means Golden Ticket, fixed by a double KRBTGT reset with replication in between. 'Credentials used on a device where the user is not logged on' means pass-the-hash or pass-the-ticket. 'How could an attacker reach a domain admin from this user' means lateral movement paths, reduced with LAPS, tiering and fewer local admin rights."
  ],
  "terms": [
   [
    "DCSync",
    "An attack that impersonates a domain controller to request password data via directory replication."
   ],
   [
    "KRBTGT account",
    "The AD account whose key signs every Kerberos ticket-granting ticket in the domain."
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
   ],
   [
    "LAPS",
    "Local Administrator Password Solution, which gives each device a unique, rotated local admin password."
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
   ],
   [
    "What does a pass-the-hash alert tell you, and what is the first containment step?",
    "A user's NTLM hash was stolen and reused from another device; isolate the source device, then reset the password and find how the hash was taken."
   ]
  ]
 },
 {
  "t": "Microsoft Entra ID Protection: risky users and sign-ins, confirm user compromised, revoking sessions; MFA fatigue response",
  "body": [
   "Microsoft Entra ID Protection uses signals from Microsoft's identity systems to judge how likely it is that a sign-in or an account is compromised. It has two kinds of risk. Sign-in risk is the probability that a particular sign-in was not made by the account owner, for example from an anonymous IP address, an unfamiliar location, or a token that looks replayed. User risk is the probability that the account itself is compromised, for example because its credentials were found leaked, or because of a pattern of risky sign-ins. Risk levels are low, medium and high. Some detections are real-time, calculated during sign-in, and others are offline, calculated afterward.",
   "Analysts work from the Risky users, Risky sign-ins and Risk detections reports in the Microsoft Entra admin center (Protection, Identity Protection), and ID Protection alerts also flow into Defender XDR incidents. For a risky user you can see the detections behind the risk, their sign-in history and their risk state (at risk, confirmed compromised, remediated, dismissed). Full ID Protection features, including risk-based policies and the detailed reports, require Microsoft Entra ID P2 licensing. The same data can be sent to Sentinel in tables such as AADUserRiskEvents and AADRiskyUsers.",
   "Your actions give feedback to the system. Confirm user compromised sets the user risk to high, which triggers any risk-based policies and tells the model this pattern was real. Confirm sign-in compromised does the same for one sign-in. Confirm user safe or confirm sign-in safe tells the system it was a false positive. Dismiss user risk clears the risk without saying whether it was real, which is appropriate after remediation that happened outside the normal flow. A secure password reset by the user through a risk-based policy remediates user risk automatically.",
   "Resetting a password is not enough if the attacker holds a session token. Refresh tokens and session cookies can stay valid, so you must also revoke sessions. In the Entra admin center you choose Revoke sessions on the user; with Microsoft Graph PowerShell you run `Revoke-MgUserSignInSession -UserId user@contoso.com`. This forces the user, and the attacker, to authenticate again. In Defender XDR, marking a user as compromised or disabling the account are also available actions. Risk-based Conditional Access policies automate the response: for example, require multifactor authentication (MFA) when sign-in risk is medium or high, and require a secure password change or block access when user risk is high.",
   "MFA fatigue (also called MFA bombing or push spam) is when an attacker who already has a user's password sends repeated push approval requests, hoping the user taps Approve to make them stop. Defenses include number matching, where the user must type a number shown on the sign-in screen, and showing application name and location in the notification. When users receive unexpected prompts, they should deny and use Report suspicious activity, which marks the user as high risk in ID Protection. The SOC response is to treat the password as compromised: reset it, revoke sessions, review sign-ins and any MFA method changes, and move the user to phishing-resistant methods such as passkeys or FIDO2 security keys.",
   "Consider a worked example. A user reports twenty MFA prompts at midnight. ID Protection shows the account as high risk after the user chose Report suspicious activity, and the sign-in logs show the attempts came from an unfamiliar country with the correct password. The analyst confirms the user compromised, resets the password, revokes sessions, and finds in the audit logs that an hour earlier an MFA method was registered from the same IP address, so the attacker did get in once. She removes that method, checks the mailbox for new inbox rules and forwarding, and enrolls the user in a passkey before closing the incident.",
   "Common mistakes: resetting the password but not revoking sessions, leaving a stolen token alive; dismissing risk when the account really was compromised, which teaches the model nothing and hides the event; confirming a user safe without investigating; forgetting to check for MFA methods or app consents the attacker added; and blaming the user for approving a push rather than fixing the control with number matching and phishing-resistant MFA. Another trap is mixing up the risk types: an anonymous IP sign-in is sign-in risk, while leaked credentials are user risk.",
   "Exam questions test the vocabulary closely. 'Credentials found on the dark web' means leaked credentials, a user risk detection. 'Sign-in from an anonymizing network' is sign-in risk. 'Tell the system this was real and raise risk to high' is Confirm user compromised. 'Clear the risk after remediation' is Dismiss. 'Stolen token still works after reset' means revoke sessions. 'Repeated push notifications' means MFA fatigue, answered by number matching and phishing-resistant methods. 'Automatically require password change for high user risk' means a risk-based Conditional Access policy."
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
    "Confirm user compromised",
    "An analyst action that sets user risk to high, triggers policies and feeds back to the risk model."
   ],
   [
    "Revoke sessions",
    "Invalidating a user's refresh tokens and session cookies so all sessions must re-authenticate."
   ],
   [
    "MFA fatigue",
    "An attack that floods a user with push approval prompts hoping they approve one."
   ],
   [
    "Number matching",
    "An MFA push setting that requires typing a displayed number, defeating blind approvals in MFA fatigue attacks."
   ]
  ],
  "example": "A user reports twenty MFA prompts at midnight. ID Protection shows the account as high risk after the user chose Report suspicious activity. The analyst confirms the user compromised, resets the password, revokes sessions, removes an MFA method the attacker had added, and checks the mailbox for new inbox rules before closing the incident and moving the user to a passkey.",
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
   ],
   [
    "Is a leaked credentials detection sign-in risk or user risk?",
    "User risk, because it indicates the account itself is likely compromised rather than one specific sign-in."
   ]
  ]
 },
 {
  "t": "Defender for Cloud Apps: impossible travel and other anomaly alerts, OAuth app risk and revoking app consent",
  "body": [
   "Microsoft Defender for Cloud Apps is Microsoft's cloud access security broker (CASB). It connects to cloud services such as Microsoft 365 and other software-as-a-service (SaaS) apps through APIs (app connectors), discovers shadow IT from network logs, and applies policies to user activity. For the security operations center (SOC), its most important outputs are anomaly detection alerts and visibility into OAuth apps, both of which feed Defender XDR incidents. Anomaly detection policies are built in and turned on by default. They learn each user's normal behavior over an initial learning period, then alert on deviations. Impossible travel fires when the same user signs in from two locations so far apart that nobody could travel between them in the time elapsed, which suggests a stolen credential used from another country. It has known sources of false positives, such as VPNs and corporate proxies, so the policy's sensitivity can be tuned and known IP ranges can be tagged as corporate or VPN under the IP address range settings. Other anomaly alerts include activity from infrequent country, activity from anonymous IP addresses, activity from suspicious IP addresses, mass download, mass deletion, ransomware activity (many file uploads with unusual extensions), unusual file sharing, and suspicious inbox manipulation rules such as forwarding mail to an outside address or moving messages to hidden folders.",
   "Investigating means checking the user's activity log, sign-in details, IP address reputation, and what happened after the anomaly: new inbox rules, downloads, sharing links or app consents. In advanced hunting, the CloudAppEvents table holds this activity. Response options include suspending the user, requiring the user to sign in again, and confirming the user compromised in Microsoft Entra ID Protection. Policies you create yourself, such as activity policies and OAuth app policies, complement the built-in anomaly detections.",
   "OAuth is the protocol that lets an app access data on a user's behalf after the user (or an admin) grants consent. Attackers exploit this with consent phishing: they send a link that asks the user to grant a malicious app permissions such as reading mail or files. No password is stolen, so password resets do not remove the access; the app holds its own tokens. Defender for Cloud Apps, together with app governance, shows OAuth apps with their permission level, publisher, how many users consented and how common the app is in other organizations. Apps with high privileges, unverified publishers and few users are suspicious.",
   "To respond, you can ban the app in Defender for Cloud Apps (Cloud apps, OAuth apps), which revokes its permissions and prevents future consent, or revoke the consent and delete the service principal or enterprise application in Microsoft Entra ID. Also review what the app accessed using audit logs. To prevent recurrence, restrict user consent in Entra ID so users can only consent to apps from verified publishers requesting low-risk permissions, and use the admin consent workflow for everything else. A quick hunt for consent events looks like this:",
   "```kusto\nCloudAppEvents\n| where ActionType == \"Consent to application.\"\n| project Timestamp, AccountDisplayName, IPAddress, RawEventData\n```",
   "Consider a worked example. Defender for Cloud Apps shows that 12 users consented to an unverified app requesting full mailbox access, and one of them also has a suspicious inbox forwarding rule. The analyst bans the app, which revokes its permissions for all 12 users, removes the enterprise application in Entra ID, deletes the forwarding rule, and searches the audit log for what the app read. Finally she changes the tenant's user consent settings to verified publishers only.",
   "Common mistakes: resetting passwords and assuming the app is gone; closing every impossible travel alert as a VPN false positive without tagging the VPN ranges, so the noise never ends; ignoring apps with broad permissions because only one user consented; and forgetting to check what data the app already took.",
   "Exam questions tie clues to responses. 'Two sign-ins from distant countries minutes apart' means impossible travel. 'Alerts caused by our VPN' means tagging IP ranges or tuning the policy. 'Mail forwarded to an external address' means suspicious inbox manipulation rule. 'User granted a malicious app access to mail' means consent phishing. 'Remove the app's access for everyone and prevent new consent' means ban the app. 'Stop users consenting to risky apps' means restrict user consent and use the admin consent workflow."
  ],
  "terms": [
   [
    "Cloud access security broker (CASB)",
    "A service that gives visibility and control over the use of cloud apps; Defender for Cloud Apps is Microsoft's."
   ],
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
   ],
   [
    "Admin consent workflow",
    "An Entra ID feature that lets users request admin approval for apps they are not allowed to consent to."
   ]
  ],
  "example": "Defender for Cloud Apps shows that 12 users consented to an unverified app requesting full mailbox access, and one of them has a suspicious inbox forwarding rule. The analyst bans the app, removes the enterprise application in Entra ID, deletes the forwarding rule, and changes the tenant's user consent settings to verified publishers only.",
  "tip": "Resetting a password does not remove a malicious OAuth grant. The answer is to revoke consent or ban the app, then restrict user consent.",
  "check": [
   [
    "What is a common false-positive cause for impossible travel?",
    "VPNs or corporate proxies that make sign-ins appear from distant locations; tag those IP ranges to reduce noise."
   ],
   [
    "Why doesn't a password reset stop a malicious OAuth app?",
    "The app holds its own consented tokens, which remain valid until consent is revoked."
   ],
   [
    "How can you reduce future consent phishing?",
    "Restrict user consent to verified publishers and low-risk permissions and require admin consent for others."
   ],
   [
    "Which advanced hunting table holds Defender for Cloud Apps activity such as consents and inbox rule changes?",
    "CloudAppEvents."
   ]
  ]
 },
 {
  "t": "Microsoft Purview: DLP and insider risk alerts in the Defender portal; Purview Audit (unified audit log) searches",
  "body": [
   "Microsoft Purview is Microsoft's data security and compliance family. Two of its products produce alerts that security operations center (SOC) analysts handle in the Defender portal, and one of its tools, Audit, is a key source of evidence in almost every Microsoft 365 investigation. Knowing where each alert comes from and who is allowed to see its contents matters, because these alerts often involve sensitive data and people inside the organization. Data loss prevention (DLP) policies detect sensitive information, such as credit card numbers or files with a sensitivity label, being shared, emailed, uploaded or copied in ways the policy forbids. They can apply to Exchange, SharePoint, OneDrive, Teams, endpoints and more. When a policy match generates an alert, the alert appears on the Purview DLP alerts page and also in the Defender XDR incident queue, where it can be correlated with other alerts. For example, a DLP alert for mass upload of customer data can join an incident with an impossible travel alert for the same user. Analysts need the right Purview roles to view DLP alert content, because it may contain the sensitive data itself.",
   "Insider risk management detects risky activity by users inside the organization, such as a departing employee downloading large amounts of data or a user exfiltrating to personal cloud storage. It uses policy templates (for example data theft by departing users) and indicators, and it can use HR connector data such as resignation dates. Because insider cases are sensitive, user names are pseudonymized by default so investigators see an alias until authorized to reveal identity. Insider risk alerts can be shown in the Defender portal and correlated into incidents, and cases are managed with human resources and legal involvement.",
   "Purview Audit records user and admin activity across Microsoft 365 in the unified audit log: file access and sharing, mailbox actions, Entra ID changes, Teams events, admin configuration changes and more. Auditing is on by default for most organizations. Audit (Standard) keeps records for a standard retention period; Audit (Premium) adds longer retention, custom audit log retention policies and extra high-value events. MailItemsAccessed, which shows which mail items were read and matters in email compromise investigations, was once Premium-only but is now available with Audit (Standard) as well.",
   "You search the audit log in the Purview portal's Audit page by date range, activities, users, record types and workloads, then export the results. Searches run as jobs and can take some time to complete, so start them early in an investigation. Filter tightly by user, activity and date, because a broad search can return far more records than you can review, and note the record type so you know which workload produced each event. Administrators and scripts can also use Exchange Online PowerShell. Sentinel and Defender XDR receive much of this data through the Microsoft 365 connectors (the OfficeActivity and CloudAppEvents tables), but the unified audit log remains the broad, authoritative source.",
   "```powershell\nSearch-UnifiedAuditLog -StartDate 2026-09-01 -EndDate 2026-09-08 -UserIds user@contoso.com -Operations New-InboxRule,Set-InboxRule\n```",
   "Consider a worked example. A salesperson gives notice, and a week later an insider risk alert shows large downloads from SharePoint alongside a DLP alert for customer lists uploaded to a personal cloud drive. The analyst sees both correlated into one Defender incident, runs an audit log search on the user's FileDownloaded and FileUploaded events, exports the results, and hands the evidence to HR and legal under the insider risk case.",
   "Common mistakes: expecting every SOC analyst to see DLP content or real insider names without the right Purview roles; forgetting that audit searches take time; assuming audit data is kept forever (retention depends on licensing and policies); and searching mail activity without MailItemsAccessed, so you cannot say which messages an attacker read. Another trap is treating every DLP alert as proof of malice: many matches are honest mistakes, such as a user emailing a spreadsheet to a partner, and the right response may be education and a policy tip rather than an escalation.",
   "Exam questions separate the three tools. 'Sensitive data shared or uploaded against policy' means DLP. 'Departing employee taking data' or 'pseudonymized user' means insider risk management. 'Who did what, when' in Microsoft 365, such as who created an inbox rule or shared a file externally, means a Purview Audit search. 'Which emails did the attacker read' means the MailItemsAccessed event. 'Longer retention and extra events' means Audit (Premium). 'See DLP alerts next to other security alerts' means the Defender portal incident queue."
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
    "Pseudonymization",
    "Showing an alias instead of a user's real name in insider risk alerts until identity reveal is authorized."
   ],
   [
    "Unified audit log",
    "Purview Audit's record of user and admin activities across Microsoft 365 services."
   ],
   [
    "Audit (Premium)",
    "The Purview Audit tier that adds longer retention, custom retention policies and extra high-value events."
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
    "Search the unified audit log in Purview Audit (or with Search-UnifiedAuditLog) for inbox rule activities for that mailbox."
   ],
   [
    "Where can a SOC analyst see DLP alerts next to other security alerts?",
    "In the Defender portal incident queue, where DLP alerts are correlated into incidents."
   ],
   [
    "What does Audit (Premium) add over Audit (Standard)?",
    "Longer retention, custom audit log retention policies and additional high-value events."
   ]
  ]
 },
 {
  "t": "Defender for Cloud security alerts: alert details, the Take action tab, triggering automation",
  "body": [
   "When a Microsoft Defender for Cloud workload plan detects a threat, such as suspicious process execution on a virtual machine (VM), access to a storage account from a suspicious IP address, a SQL injection attempt or a suspicious Azure Resource Manager operation, it raises a security alert. Alerts appear on Defender for Cloud's Security alerts page and, through the integration with Defender XDR, in the Defender portal incident queue. They can also flow to Microsoft Sentinel through its Defender for Cloud connector. Remember that alerts come only from paid workload plans, not from posture management.",
   "Each alert has a severity (high, medium, low or informational), a status (active, in progress, resolved or dismissed), the affected resource, the MITRE ATT&CK tactics, the time, and a description. The alert details tab explains what was detected and shows related entities: the host, account, process command line, IP address, file or storage blob. Where alerts are linked, Defender for Cloud may group them as a security incident, and in the Defender portal they are correlated with endpoint, identity and email alerts.",
   "The Take action tab is the exam's favorite part. It is split into sections. Inspect resource context opens the resource's logs and activity around the time of the alert. Mitigate the threat gives manual remediation steps for this specific alert. Prevent future attacks lists security recommendations for the resource that would reduce the chance of recurrence, such as enabling endpoint protection or restricting network access. Trigger automated response lets you run a Logic App on this alert right now. Suppress similar alerts creates a suppression rule for alerts that are expected in your environment, with conditions and an expiration date.",
   "For automation at scale, Defender for Cloud has workflow automation (under Management, Workflow automation). You create a workflow automation that runs a Logic App when an alert, recommendation or regulatory compliance change matches conditions you set, such as alert severity or name, within a chosen scope. Typical uses are opening a ticket, emailing a resource owner, or isolating a VM. The Logic App needs a Defender for Cloud trigger (when an alert or recommendation is created or triggered). Alternatively, you continuously export alerts to Azure Event Hubs or a Log Analytics workspace and act on them from there, or let Sentinel automation handle them.",
   "Alert suppression rules in Defender for Cloud work like alert tuning in Defender XDR: they hide or auto-dismiss alerts that match conditions, and they should be narrow and time-limited. Dismissing an alert changes its status only; it does not fix the underlying problem. A good workflow is to read the alert details, inspect resource context, follow the mitigation steps, apply the prevention recommendations, and set the status to resolved with notes. If the alert was an authorized test, suppress narrowly rather than disabling the plan.",
   "Consider a worked example. Defender for Storage alerts on access to a storage account from a Tor exit node. The analyst reads the alert details, which list the blob container and the operations performed, then opens Take action. Inspect resource context shows the storage logs around the time, confirming several blobs were read using a shared access signature. She follows Mitigate the threat to rotate the account keys and revoke the signature, and under Prevent future attacks applies the recommendation to disable public network access. She then builds a workflow automation that runs a Logic App to email the storage owners for all high-severity storage alerts.",
   "Common mistakes: dismissing an alert and considering the job done; creating a broad suppression rule with no expiration that hides real attacks for months; using Trigger automated response when the requirement is to run automatically every time (that is workflow automation); disabling a whole Defender plan to stop noise from one test; and expecting foundational CSPM to raise these alerts. Another trap is forgetting that the Logic App needs permissions on the resources it changes, usually through a managed identity.",
   "Exam questions usually point to one Take action section or one automation feature. 'Recommendations to stop this recurring' means Prevent future attacks. 'Remediation steps for this alert' means Mitigate the threat. 'Look at logs around the alert time' means Inspect resource context. 'Run a Logic App on this one alert now' means Trigger automated response. 'Run it automatically for every matching alert' means workflow automation. 'Stream alerts to Event Hubs or a workspace' means continuous export. 'Expected alert from a scanner' means a suppression rule."
  ],
  "terms": [
   [
    "Security alert",
    "A Defender for Cloud detection of a threat against a protected workload, raised by a paid Defender plan."
   ],
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
   ],
   [
    "Dismiss",
    "An alert status change that hides the alert without remediating anything."
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
   ],
   [
    "How do you send all Defender for Cloud alerts to Event Hubs for a third-party SIEM?",
    "Configure continuous export of security alerts to an Event Hubs namespace."
   ]
  ]
 },
 {
  "t": "Sentinel incidents: investigation graph, entity pages and UEBA insights, running playbooks on demand, incident tasks, closing with the right classification",
  "body": [
   "A Microsoft Sentinel incident groups alerts from analytics rules together with their mapped entities. In the Azure portal you work incidents from the Incidents page; in the Defender portal, Sentinel incidents appear in the same unified queue as Defender XDR incidents. The steps are the same idea in both: assign, investigate, respond, document and close. The incident page shows a summary, the alerts, the entities, a timeline of alerts and bookmarks, similar incidents, and top insights from user and entity behavior analytics (UEBA). Comments and the activity log keep a record of everything done, and you can change severity, status and owner, and add tags.",
   "The investigation graph (in the Azure portal experience) is a visual map of the incident's entities: accounts, hosts, IP addresses, URLs, files and alerts. From any entity you can run exploration queries, such as related alerts or processes on this host, that add new nodes to the graph. The timeline shows the order of events. This is how you expand scope and find other affected assets. In the Defender portal, the incident graph and attack story serve the same purpose. The investigation graph only works well when analytics rules map entities; unmapped data does not appear at all.",
   "Entity pages show everything Sentinel knows about one entity: a timeline of alerts and activities, related entities, and UEBA insights. Insights include whether the user's activity is unusual compared to their own history or their peers, first-time actions, and sign-in patterns. If UEBA is enabled, the BehaviorAnalytics table scores each activity with an investigation priority, which helps you decide what to look at first. You can query it directly:",
   "```kusto\nBehaviorAnalytics\n| where UserPrincipalName == \"svc-backup@contoso.com\"\n| where InvestigationPriority > 5\n| project TimeGenerated, ActivityType, ActionType, ActivityInsights\n```",
   "You can run playbooks on demand. On the incident, choose Run playbook to launch any incident-trigger playbook, for example to enrich all IPs or to post the incident to a ticketing system. From an entity, you can run entity-trigger playbooks, such as disabling a user or blocking an IP on the firewall. From an alert, you can run alert-trigger playbooks. The analyst needs the Microsoft Sentinel Playbook Operator role, and Sentinel needs Automation Contributor on the playbook's resource group. Incident tasks show the checklist added by automation rules or playbooks, or you can add tasks manually; mark each complete as you go so others see progress. Close the incident with the right classification: true positive (suspicious activity), benign positive (suspicious but expected), false positive (incorrect alert logic or incorrect data) or undetermined, plus a comment.",
   "Consider a worked example. A Sentinel incident flags a service account logging on interactively to ten servers. The analyst assigns it to herself and opens the account's entity page, where UEBA shows this is the first time the account has logged on interactively and that its peers never do. In the investigation graph she runs the related alerts exploration on the account and finds a password spray alert from the same external IP address the day before. She runs an entity-trigger playbook to disable the account in Microsoft Entra ID, works through the incident tasks added by automation (reset credentials, check for new scheduled tasks, review firewall logs), and closes the incident as a true positive with a comment.",
   "Common mistakes: expecting hosts or IPs in the investigation graph when the analytics rule never mapped them; running a playbook and finding it missing from the list because Sentinel lacks Automation Contributor or the analyst lacks Playbook Operator; ignoring UEBA insights, which are often the fastest way to separate normal from abnormal; closing an authorized red-team test as false positive, which hides a working detection; and closing without a comment, which leaves nothing for tuning or reporting.",
   "Exam questions tend to test the fix or the right label. 'Graph shows no hosts' means add Host entity mapping to the rule. 'Disable one user from its page' means an entity-trigger playbook run on demand. 'Run a playbook for this whole incident now' means Run playbook with an incident trigger. 'Analyst can run but not edit playbooks' means Playbook Operator. 'Is this unusual for this user or their peers' means UEBA insights on the entity page. 'Correct detection of an approved test' means benign positive; 'rule logic or data was wrong' means false positive."
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
    "Investigation priority",
    "A UEBA score in BehaviorAnalytics that ranks how unusual an activity is, to guide triage."
   ],
   [
    "Playbook Operator",
    "A Sentinel role that allows listing and running playbooks manually."
   ],
   [
    "Benign positive",
    "A Sentinel classification for activity that was correctly detected but expected, such as an approved test."
   ],
   [
    "Incident task",
    "A checklist item in an incident, added manually or by automation, that tracks investigation steps."
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
   ],
   [
    "Which role lets an analyst run playbooks manually without editing them?",
    "Microsoft Sentinel Playbook Operator, with Sentinel holding Automation Contributor on the playbook's resource group."
   ]
  ]
 },
 {
  "t": "Microsoft Security Copilot embedded in the Defender portal: incident summaries, guided response, script analysis",
  "body": [
   "Microsoft Security Copilot is a generative artificial intelligence (AI) assistant for security teams. Besides its standalone portal, it is embedded directly into the Microsoft Defender portal, where it appears in a side panel on incidents, alerts, devices, users and hunting pages. It runs on capacity your organization provisions, measured in security compute units (SCUs), and users need appropriate access to both Copilot and the underlying Defender data. Copilot only sees data the signed-in user is allowed to see, so it cannot be used to get around role-based access control. Its value is speed: it turns a pile of alerts and raw evidence into readable language so an analyst can decide faster.",
   "Incident summaries are the most visible feature. When you open an incident, Copilot can produce a short narrative: what happened, in what order, which users, devices and mailboxes are involved, what attack stages (mapped to MITRE ATT&CK) were seen, and what has already been remediated. This saves a Tier-1 analyst the time of reading every alert and helps with handoffs between shifts. The summary is generated from the incident's current data, so after new alerts arrive you can regenerate it.",
   "Guided response gives recommended actions for the incident, grouped into categories such as triage, containment, investigation and remediation. Examples are classifying the incident, isolating a device, resetting a user's password, soft-deleting emails or reviewing similar incidents. Many recommendations have buttons that run the action directly, with the usual permissions. The analyst still decides; guided response suggests, it does not act on its own. That makes it different from automatic attack disruption, which does act without waiting.",
   "Script analysis explains suspicious command lines and scripts, such as obfuscated PowerShell, batch files or bash, found in alert evidence. It decodes and describes what the script tries to do, for example download a file, create persistence or disable security tools, and highlights indicators such as URLs and IP addresses. File analysis similarly summarizes a suspicious file's characteristics, such as its imports, signatures and detections. These features help analysts who are not malware specialists understand evidence quickly without running anything themselves, which is safer than pasting samples into an unknown tool.",
   "Other embedded capabilities include generating Kusto Query Language (KQL) queries from natural-language questions in advanced hunting, creating an incident report that documents the timeline and actions taken, and summarizing device or identity information on entity pages. Microsoft is also adding Security Copilot agents that do specific tasks under defined permissions, such as triaging user-reported phishing and explaining their verdicts. Because these capabilities change quickly, focus on what each one is for rather than on exact button names.",
   "Consider a worked example. A new analyst opens an incident with nine alerts and an obfuscated PowerShell command on a sales laptop. The Copilot pane summarizes the attack as a phishing email that led to a downloader, then an outbound connection. She selects the command in the evidence and runs script analysis, which decodes a base64 string and explains that it downloads a second-stage payload from a listed URL and runs it in memory. Guided response suggests isolating the device, blocking the URL and resetting the user's password. She verifies each point against the process tree and the email in Threat Explorer before taking the actions, then generates an incident report for the shift handoff.",
   "Common mistakes: trusting a summary without checking the evidence, when AI output can be wrong or incomplete; assuming guided response has already contained anything; pasting generated KQL straight into a detection rule without testing it; expecting Copilot to reveal data outside the user's permissions; and forgetting that usage consumes provisioned capacity, so heavy automated use needs planning. Treat Copilot as a capable assistant whose work you review, not as the decision maker; the analyst remains accountable for the verdict and every action.",
   "Exam questions map a need to a feature. 'Explain this obfuscated command' is script analysis. 'What should I do next' is guided response. 'Brief the next shift' or 'what happened in this incident' is the incident summary or incident report. 'Write a hunting query from a plain-language question' is natural-language to KQL. 'Analyst lacks permission to see data' means Copilot cannot see it either. 'Capacity for Copilot' refers to security compute units."
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
    "Script analysis",
    "A Copilot feature that decodes and explains suspicious scripts and command lines found in evidence."
   ],
   [
    "Incident report",
    "A Copilot-generated document of an incident's timeline, findings and actions taken."
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
   ],
   [
    "Why should you verify Copilot output before acting?",
    "Generative AI can be wrong or incomplete, and the analyst remains accountable for decisions and actions."
   ]
  ]
 },
 {
  "t": "KQL basics: where, project, extend, summarize, count, bin, ago(), order by, take, render",
  "body": [
   "Kusto Query Language (KQL) is the read-only query language used in Microsoft Sentinel, Azure Monitor Log Analytics and Defender XDR advanced hunting. A query starts with a table name and passes rows through a pipeline of operators separated by the pipe character. Each operator takes the rows from the previous one and returns a new set. Reading top to bottom is reading the order of processing, which makes KQL easy to build one step at a time. Because it cannot change data, you can experiment freely.",
   "`where` filters rows. Put time filters and the most selective filters first so less data flows down the pipeline. `ago()` returns a time relative to now, so `where TimeGenerated > ago(1d)` keeps the last day; units include `m`, `h` and `d`. Sentinel tables usually use `TimeGenerated`; Defender XDR advanced hunting tables use `Timestamp`. Comparison operators include `==` (case-sensitive equality), `=~` (case-insensitive equality) and `!=`, and you combine conditions with `and` and `or`. Text operators such as `has` and `startswith` are covered in the next lesson.",
   "`project` chooses and orders columns and can rename them, for example `project TimeGenerated, User = Account, Computer`; everything not listed is dropped. `extend` adds calculated columns while keeping all existing ones, for example `extend Hour = hourofday(TimeGenerated)`. `take` (or `limit`) returns an arbitrary set of rows and is useful for a quick look at a table's shape; it is not sorted and not the newest rows. `order by` (or `sort by`) sorts, descending by default, and `top 10 by Failures` sorts and limits in one step. `project-away` does the opposite of `project`: it drops the named columns and keeps the rest, which is handy when a table has one bulky column you do not need.",
   "`summarize` aggregates. It groups rows by the columns after `by` and computes functions such as `count()`, `dcount()` (distinct count), `min()`, `max()`, `make_set()` and `arg_max()`. The `count` operator on its own just returns the number of rows in the input. `bin()` rounds values into buckets, most often times, so `summarize count() by bin(TimeGenerated, 1h)` gives an hourly count. `render` draws a chart from the results, such as `render timechart` or `render barchart`, which is handy for spotting spikes and for workbooks. You can name aggregate columns, as in `Failures = count()`, and group by several columns at once; each unique combination of the `by` values becomes one output row. Rows removed earlier never reach summarize, which is another reason to filter first.",
   "```kusto\nSecurityEvent\n| where TimeGenerated > ago(1d)\n| where EventID == 4625\n| summarize Failures = count() by Account, bin(TimeGenerated, 1h)\n| where Failures >= 10\n| order by Failures desc\n```",
   "Consider a worked example. The query above finds accounts with ten or more failed Windows logons in any hour of the last day. Notice the pattern: filter by time, filter by event, aggregate, filter the aggregate, sort. Most detection queries follow it. An analyst suspecting password spraying applies the same pattern to SigninLogs: `where ResultType != \"0\"`, then `summarize Users = dcount(UserPrincipalName) by IPAddress, bin(TimeGenerated, 1h)`, then `where Users > 50`. One IP address has failed sign-ins against 300 different users in an hour. To see the shape over time, she removes the IP grouping and ends with `render timechart`, which shows a sharp spike at 03:00.",
   "Common mistakes: filtering on `Timestamp` in a Sentinel table or `TimeGenerated` in a Defender table (the column does not exist or is not what you expect); using `take 10` and assuming you saw the newest events; using `project` when you meant `extend` and losing columns later steps need; forgetting that `==` is case-sensitive, so `Account == \"admin\"` misses `ADMIN`; placing the time filter at the end so the query scans everything; and confusing `count()` (an aggregation inside summarize) with the `count` operator (total rows). Finally, `order by` without `asc` sorts descending, which surprises people who expect oldest-first. Practice by starting with `TableName | take 10` to see the columns, then add one line at a time.",
   "Exam questions often show a query with a blank or ask what a query returns. 'Keep only some columns' is `project`; 'add a calculated column' is `extend`; 'group and aggregate' is `summarize`; 'hourly buckets' is `bin(TimeGenerated, 1h)`; 'last seven days' is `ago(7d)`; 'draw a chart over time' is `render timechart`; 'highest N' is `top`; 'unsorted sample' is `take`. 'Distinct number of users' is `dcount()`."
  ],
  "terms": [
   [
    "where",
    "An operator that keeps only rows matching a condition."
   ],
   [
    "project",
    "An operator that keeps, orders and optionally renames only the listed columns."
   ],
   [
    "extend",
    "An operator that adds calculated columns while keeping the existing ones."
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
    "ago()",
    "A function that returns a time relative to now, such as ago(1d) for one day ago."
   ],
   [
    "render",
    "An operator that draws the query results as a chart, such as a timechart."
   ]
  ],
  "example": "An analyst suspects password spraying. She queries SigninLogs for the last day, filters failed results, summarizes distinct users per source IP per hour with dcount and bin, and sorts descending. One IP address has failed sign-ins against 300 different users in an hour, which she adds to an incident and blocks, then charts the attempts with render timechart for the report.",
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
   ],
   [
    "Why put the time filter near the top of a query?",
    "It reduces the data every later operator must process, making the query faster and cheaper."
   ]
  ]
 },
 {
  "t": "KQL for hunting: has vs contains, in and has_any, let statements and dynamic lists, join kinds, union, parse_json and mv-expand, make-series with anomaly functions",
  "body": [
   "Hunting queries need more than the basics. This lesson covers the Kusto Query Language (KQL) operators that make searches fast, reusable and able to combine data from several tables. String matching comes first. `has` looks for a whole term using the index that Kusto builds from words in text, so it is fast. `contains` looks for any substring and has to scan the text, so it is slower. `ProcessCommandLine has \"mimikatz\"` matches the word mimikatz; `contains \"katz\"` would match inside a longer word. Both are case-insensitive; `has_cs` and `contains_cs` are the case-sensitive forms. Use `has` whenever you are searching for a complete term, and `startswith` or `endswith` when position matters. For lists, `in` checks exact equality against a set of values, for example `FileName in (\"psexec.exe\", \"wmic.exe\")`, and `in~` does so case-insensitively. `has_any` checks whether a text column contains any of a list of terms, which suits command lines. `let` statements name a value, list or even a whole query so you can reuse it. A dynamic list looks like `let SuspiciousTools = dynamic([\"procdump\", \"rclone\"]);` and is then used in `where ProcessCommandLine has_any (SuspiciousTools)`. Let statements end with a semicolon and make queries easier to read and maintain.",
   "`join` combines two tables on matching columns. The default kind is innerunique, which removes duplicate left-side keys before matching and can surprise you. `inner` keeps all matching combinations, `leftouter` keeps every left row even without a match, `leftanti` keeps left rows with no match (useful for accounts that signed in but never completed MFA, or devices not on an approved list), and `leftsemi` keeps left rows that do have a match without adding right columns. Put the smaller table on the left for performance, and filter both sides by time first. `union` is different: it stacks rows from several tables, for example `union DeviceProcessEvents, DeviceNetworkEvents`, which is useful when the same indicator might appear in different sources.",
   "Many columns hold JavaScript Object Notation (JSON), such as `AdditionalFields` or `RawEventData`. `parse_json()` (also called `todynamic()`) turns a JSON string into a dynamic object whose properties you access with dot or bracket notation, such as `RawEventData.Parameters`. When a property is an array, `mv-expand` creates one row per array element, so you can filter or summarize individual items, such as each permission granted to an app or each parameter of an inbox rule.",
   "```kusto\nlet lookback = 14d;\nSigninLogs\n| where TimeGenerated > ago(lookback)\n| make-series Signins = count() default = 0 on TimeGenerated from ago(lookback) to now() step 1h by UserPrincipalName\n| extend (Anomalies, Score, Baseline) = series_decompose_anomalies(Signins)\n| mv-expand TimeGenerated to typeof(datetime), Signins to typeof(long), Anomalies to typeof(double)\n| where Anomalies > 0\n```",
   "`make-series` builds a time series per group, filling empty buckets with a default so the series is regular. Series functions then analyze it: `series_decompose_anomalies()` flags points that deviate from the expected pattern, taking seasonality and trend into account, and returns anomaly flags, scores and a baseline. The `mv-expand` line turns the arrays back into rows so you can see which hours were anomalous. This is how you find a user whose sign-in volume suddenly spikes.",
   "Consider a worked example. A hunter defines a let list of remote-access tool names, uses `has_any` against ProcessCommandLine in DeviceProcessEvents, and `leftanti` joins the results against a watchlist of approved admin hosts. Twelve devices remain. She then unions in DeviceNetworkEvents for those devices and finds two also connecting to a rare domain, which she bookmarks for an incident.",
   "Common mistakes: using `contains` for whole words and paying for slow scans; using `in` against a command line (it tests exact equality, so use `has_any`); forgetting the semicolon after a `let`; relying on the default innerunique join and silently losing duplicate left rows; joining two huge unfiltered tables; confusing `union` (more rows) with `join` (more columns); and reading `RawEventData.Parameters` without `parse_json()` when the column is a string. Another trap is expecting `make-series` output to be ordinary rows; it produces arrays until you expand them.",
   "Exam questions give a goal and ask for the operator. 'Records with no match in the other table' means `leftanti`. 'Fast search for a whole word' means `has`. 'Any of these terms in a command line' means `has_any`. 'Exact value in a list' means `in`. 'Reusable list or value' means `let` with `dynamic()`. 'Rows from several tables together' means `union`. 'One row per array element' means `mv-expand`. 'Spot unusual spikes over time' means `make-series` with `series_decompose_anomalies()`. 'Default join kind' is innerunique."
  ],
  "terms": [
   [
    "has vs contains",
    "has matches whole indexed terms quickly; contains matches any substring and is slower."
   ],
   [
    "has_any",
    "An operator that checks whether a text column contains any term from a list."
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
    "union",
    "An operator that stacks rows from several tables into one result."
   ],
   [
    "mv-expand",
    "An operator that turns each element of an array into its own row."
   ],
   [
    "make-series",
    "An operator that builds regular time series for analysis with functions such as series_decompose_anomalies()."
   ]
  ],
  "example": "A hunter defines a let list of remote-access tool names, uses has_any against ProcessCommandLine in DeviceProcessEvents, and leftanti joins the results against a watchlist of approved admin hosts. Twelve devices remain, and two of them also show outbound connections to a rare domain when she unions in DeviceNetworkEvents, so she bookmarks them and opens an incident.",
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
   ],
   [
    "Why use has_any rather than in to search command lines for tool names?",
    "in tests exact equality of the whole value, while has_any matches any listed term within the text."
   ]
  ]
 },
 {
  "t": "Advanced hunting schema: DeviceProcessEvents, DeviceNetworkEvents, DeviceLogonEvents, EmailEvents, EmailUrlInfo, IdentityLogonEvents, CloudAppEvents, AlertInfo and AlertEvidence",
  "body": [
   "Advanced hunting in the Defender portal exposes Defender XDR data as tables grouped by source. Knowing which table holds which kind of event, and how tables link, is the difference between a quick hunt and a frustrating one. The schema reference in the portal, on the left side of the advanced hunting page, lists every table and column with descriptions and sample queries. The time column in these tables is `Timestamp`, and advanced hunting keeps about 30 days of Defender data; for longer history, the data must be in Sentinel or the data lake. Device tables come from Defender for Endpoint. DeviceProcessEvents records process creation: FileName, FolderPath, ProcessCommandLine, the SHA256 hash, the account, and the parent through the InitiatingProcess columns such as InitiatingProcessFileName and InitiatingProcessCommandLine. It is where you hunt for encoded PowerShell, living-off-the-land binaries or Office apps spawning shells. DeviceNetworkEvents records network connections: RemoteIP, RemotePort, RemoteUrl, the ActionType (for example ConnectionSuccess or ConnectionFailed) and the initiating process. DeviceLogonEvents records logons to devices, with AccountName, LogonType (such as Interactive, Network or RemoteInteractive) and ActionType showing success or failure. Other device tables cover files (DeviceFileEvents), registry (DeviceRegistryEvents), images loaded and general events (DeviceEvents). The ActionType column appears in most tables and describes what kind of event each row is, so running `summarize count() by ActionType` is a good first step with any unfamiliar table.",
   "Email tables come from Defender for Office 365. EmailEvents has one row per message delivery, including SenderFromAddress, RecipientEmailAddress, Subject, DeliveryAction, DeliveryLocation and ThreatTypes. EmailUrlInfo lists URLs found in messages, and EmailAttachmentInfo lists attachments. They all share NetworkMessageId, the key you join on to connect a message to its URLs or files. UrlClickEvents records Safe Links clicks, and EmailPostDeliveryEvents records actions taken after delivery, such as zero-hour auto purge (ZAP) or admin remediation.",
   "IdentityLogonEvents records authentication activity seen by Defender for Identity on Active Directory and by Microsoft Entra ID, with the protocol (for example Kerberos or NTLM), the account, device and failure reason. It suits hunting for password spraying against on-premises accounts or legacy protocol use. Identity tables also include IdentityQueryEvents (such as LDAP and DNS queries) and IdentityDirectoryEvents (such as group membership changes). CloudAppEvents comes from Defender for Cloud Apps and records activity in cloud apps such as Exchange Online, SharePoint and Teams: ActionType, Application, account, IP address and a RawEventData column in JSON, which you parse for details such as inbox rule parameters.",
   "AlertInfo has one row per alert from any Defender product (and Sentinel when onboarded): AlertId, Title, Severity, Category, ServiceSource and DetectionSource. AlertEvidence has one row per entity attached to an alert: EntityType, EvidenceRole and entity columns such as DeviceId, AccountName, FileName or RemoteIP. Join them on AlertId to ask questions like which devices appeared in high-severity alerts this week. Because these two tables cover alerts from every product in one place, a single query can ask which users appeared in both an identity alert and an email alert on the same day. The email join pattern looks like this:",
   "```kusto\nEmailEvents\n| where Timestamp > ago(7d) and ThreatTypes has \"Phish\"\n| join kind=inner EmailUrlInfo on NetworkMessageId\n| project Timestamp, RecipientEmailAddress, Subject, Url\n```",
   "Consider a worked example. After a phishing incident, an analyst joins EmailEvents to EmailUrlInfo on NetworkMessageId to list every recipient of the malicious URL, then checks UrlClickEvents for that URL to see who clicked. For the two users who clicked, she queries DeviceProcessEvents on their devices for processes whose InitiatingProcessFileName is the browser in the hour after the click, and DeviceNetworkEvents for connections to the payload domain. One device shows a downloaded script running.",
   "Common mistakes: looking for command lines in DeviceNetworkEvents; hunting on-premises Kerberos logons in DeviceLogonEvents instead of IdentityLogonEvents; joining email tables on Subject instead of NetworkMessageId; forgetting that alert details and alert entities live in two tables; and querying for a year of data when advanced hunting holds about 30 days.",
   "Exam questions describe the evidence and expect a table. Process and command line means DeviceProcessEvents; parent process means its InitiatingProcess columns. Connection, remote IP or port means DeviceNetworkEvents. Logon to a device means DeviceLogonEvents. On-premises Kerberos or NTLM authentication means IdentityLogonEvents. Message delivery means EmailEvents; URLs in mail means EmailUrlInfo joined on NetworkMessageId. Mailbox rules or SharePoint activity means CloudAppEvents. Alert metadata means AlertInfo; alert entities means AlertEvidence, joined on AlertId."
  ],
  "terms": [
   [
    "DeviceProcessEvents",
    "The table of process creation events, including command lines and parent process details."
   ],
   [
    "DeviceNetworkEvents",
    "The table of network connections from devices, with remote IP, port, URL and initiating process."
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
    "CloudAppEvents",
    "Activity from cloud apps such as Exchange Online and SharePoint, with details in RawEventData."
   ],
   [
    "AlertEvidence",
    "One row per entity attached to an alert, joined to AlertInfo on AlertId."
   ]
  ],
  "example": "After a phishing incident, an analyst joins EmailEvents to EmailUrlInfo on NetworkMessageId to list every recipient of the malicious URL, then checks UrlClickEvents to see who clicked, then queries DeviceProcessEvents on those users' devices for processes launched by the browser in the next hour. One device shows a downloaded script running, so she isolates it.",
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
   ],
   [
    "Which table would show NTLM authentication against an on-premises domain controller?",
    "IdentityLogonEvents, populated by Defender for Identity."
   ]
  ]
 },
 {
  "t": "Turning a hunting query into a custom detection rule; Security Copilot help with writing KQL",
  "body": [
   "Hunting is exploratory: you form a hypothesis, query, and learn. When a hunt finds something worth watching for continuously, you promote it into a detection so the next occurrence raises an alert without a human remembering to look. In Defender XDR that means a custom detection rule; in Sentinel, a scheduled or near-real-time (NRT) analytics rule. The move from hunt to detection is how a security operations center (SOC) turns one analyst's insight into permanent coverage.",
   "Start by making the query detection-ready. Hunting queries often return aggregates or broad lists, while a detection should return specific events that an analyst can act on. Make sure it returns the required identifier columns, such as Timestamp, DeviceId and ReportId for device tables, and the columns for the impacted entity (device, user or mailbox). If you summarize, keep these columns with a function like `arg_max(Timestamp, *)` so each row still points to a real event. Remove `take` or `limit` statements, which would silently drop results, and remove `render`, which has no meaning in a rule.",
   "```kusto\nDeviceProcessEvents\n| where FileName =~ \"schtasks.exe\" and ProcessCommandLine has \"/create\"\n| where ProcessCommandLine has_any (\"-enc\", \"-encodedcommand\")\n| where DeviceName !startswith \"deploy-\"\n| summarize arg_max(Timestamp, *) by DeviceId\n| project Timestamp, DeviceId, ReportId, DeviceName, AccountName, ProcessCommandLine\n```",
   "Next, tune for noise. Run the query over the full lookback period you plan to use and count the results. If it returns hundreds of hits a day, add filters for known-good activity, perhaps using a watchlist in Sentinel or a let list of approved tools. A detection that fires constantly teaches analysts to ignore it. Then choose a frequency that matches the risk: continuous or hourly for active attack techniques, daily for slower signals. In advanced hunting, select Create detection rule. Give it a clear name and description, a severity, a category, MITRE ATT&CK techniques and recommended actions for analysts. Choose impacted entities and, only for high-confidence logic, automated actions such as isolating a device. After saving, monitor the rule's runs and alerts on the Detection rules page, and revisit it when it produces false positives.",
   "Security Copilot can help at several points. In advanced hunting, you can describe what you want in plain language, such as show devices where PowerShell ran with an encoded command in the last 7 days, and Copilot generates a Kusto Query Language (KQL) query using the right tables and columns. You can ask it to explain an existing query, fix an error, or adjust a query, for example to exclude certain hosts. This lowers the barrier for analysts who are still learning KQL and speeds up experienced hunters. Always review generated KQL before relying on it: check that it queries the right table, that filters match your intent, that time ranges are sensible, and that it returns the columns a detection needs. Then run it and inspect the results.",
   "Consider a worked example. A hunter asks Copilot for processes that created scheduled tasks with encoded commands in the last 7 days. She reviews the generated query, corrects a column name it guessed wrong, adds DeviceId and ReportId to the output, and excludes the known deployment servers whose names start with deploy-. Over 30 days the query returns about three hits a week, all worth a look. She saves it as a custom detection rule running every 3 hours, tagged with the scheduled task technique, with DeviceId as the impacted entity and no automatic action until it has proved reliable.",
   "Common mistakes: saving a query that returns only aggregates, so alerts have no entity to act on; leaving `take 100` in and missing events; skipping the noise test and flooding the queue; attaching isolate device to an untested rule; and trusting generated KQL that uses a wrong column or misses a condition. A subtle mistake in a detection means either silence during an attack or a flood of false alerts, and both erode trust in the SOC's rules.",
   "Exam questions usually describe a failure or a goal. 'The rule cannot be saved' or 'alerts lack entities' means missing required or entity columns. 'Rule misses events' may point to a leftover `take` or a too-short lookback. 'Keep one real event per device after summarizing' means `arg_max(Timestamp, *)`. 'Write KQL from a plain-language question' means Security Copilot's natural-language to KQL, and 'what must the analyst do with it' is validate and test before use."
  ],
  "terms": [
   [
    "Hypothesis-driven hunting",
    "Hunting that starts from a specific idea about attacker behavior and tests it with queries."
   ],
   [
    "Detection-ready query",
    "A query that returns specific events with required identifier and entity columns and acceptable noise."
   ],
   [
    "arg_max()",
    "An aggregation that returns the row with the maximum value of a column, keeping other columns."
   ],
   [
    "Noise testing",
    "Running a candidate detection over its full lookback to measure how often it would fire before saving it."
   ],
   [
    "Natural-language to KQL",
    "Security Copilot's ability to generate a KQL query from a plain-language request."
   ],
   [
    "Detection rules page",
    "The Defender portal page where custom detections are listed, edited, run and monitored."
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
   ],
   [
    "Why test a candidate detection over its full lookback before saving?",
    "To see how often it would fire and add filters for known-good activity, so the rule does not flood the queue."
   ]
  ]
 },
 {
  "t": "Sentinel hunting: hunting queries, hunts, bookmarks, livestream, notebooks with MSTICPy",
  "body": [
   "Proactive threat hunting assumes attackers may already be inside and undetected, and searches for them rather than waiting for an alert. Microsoft Sentinel provides a set of tools that support each step: finding ideas, running queries, saving evidence, watching for new activity, and doing advanced analysis. The overall flow is to pick a hypothesis, run hunting queries or write new Kusto Query Language (KQL), bookmark evidence, use livestream to watch for more, go deeper in a notebook if needed, then turn findings into incidents and new detections. The Hunting page (Threat management, Hunting) lists hunting queries. Many come from Content hub solutions and are mapped to MITRE ATT&CK tactics and techniques; you can also write your own. Each query shows how many results it returns and whether that number changed recently. You can run all queries at once, sort by result count or change, and filter by tactic or data source. A query that suddenly returns results it did not before deserves a look. Hunting queries do not create alerts on their own; they run when you run them.",
   "Hunts are a way to organize a hunting project end to end. You create a hunt with a hypothesis (for example, an attacker is using a remote management tool for persistence), add relevant queries, track status and findings, and collaborate with colleagues. When the hunt ends, you record the outcome and can create analytics rules or incidents from what you found. Hunts give managers a record of proactive work that did not come from an alert, which matters for measuring a SOC's maturity.",
   "Bookmarks save interesting rows from a query result with notes, tags and mapped entities. They keep evidence even after the underlying query or data changes. Bookmarks appear in the investigation graph and can be added to an existing incident or used to create a new incident; this is how a hunting finding enters the incident process. Bookmarks are stored in the HuntingBookmark table, so you can query them too. Livestream lets you run a hunting query continuously against new incoming data and get notified when results appear, without creating a full analytics rule. It suits watching for a specific indicator during an active investigation, such as a suspicious IP address reappearing. If a livestream session proves valuable, you can promote the query to an analytics rule.",
   "Notebooks give you the full power of Python. Sentinel integrates with Jupyter notebooks running in Azure Machine Learning, and with notebooks against the Sentinel data lake. MSTICPy (Microsoft Threat Intelligence Center Python security tools) is an open-source library built for this. It has query providers for Sentinel and Defender data, enrichment such as threat intelligence lookups and IP geolocation, data decoding (for example base64), and visualizations such as timelines, process trees and maps. Notebooks are ideal for machine learning, complex analysis, and repeatable investigation procedures that combine many sources. The compute used to run notebooks is billed separately from Sentinel.",
   "```python\nfrom msticpy.context import TILookup\nti = TILookup()\nresult = ti.lookup_ioc(\"203.0.113.50\")\nti.result_to_df(result)\n```",
   "Consider a worked example. During a hunt for credential dumping, an analyst creates a hunt with the hypothesis that an attacker is reading LSASS memory on servers. She runs the relevant hunting queries, finds three suspicious rows showing an unusual process opening LSASS, and bookmarks them with the host and account mapped. She creates an incident from the bookmarks, starts a livestream on the suspicious process hash so she hears about any new occurrence, and uses an MSTICPy notebook to build a process tree for each server and look up the hash in threat intelligence. At the end she records the outcome in the hunt and asks the detection engineer to turn the query into an analytics rule.",
   "Common mistakes: expecting hunting queries to alert on a schedule (that needs an analytics rule); keeping findings only in a query result that will change, instead of bookmarking them; leaving a livestream as a permanent substitute for a proper rule; forgetting that notebook compute costs extra; and hunting without a hypothesis, which turns into aimless browsing.",
   "On the exam, 'save evidence from a hunt' means a bookmark, 'watch for new matches without writing a rule' means livestream, 'Python, machine learning or complex enrichment' means a notebook with MSTICPy, 'organize a hunting project with a hypothesis' means a hunt, and 'turn a finding into an incident' means creating an incident from a bookmark."
  ],
  "terms": [
   [
    "Threat hunting",
    "Proactively searching for attackers who have evaded existing detections, usually starting from a hypothesis."
   ],
   [
    "Hunting query",
    "A saved KQL query for proactive searching, often mapped to MITRE ATT&CK, that does not create alerts."
   ],
   [
    "Hunt",
    "A Sentinel object that organizes a hunting project with a hypothesis, queries, status and findings."
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
   ],
   [
    "When is livestream a better choice than an analytics rule?",
    "During an active investigation, to watch new data for a specific indicator temporarily without building and tuning a full rule."
   ]
  ]
 },
 {
  "t": "Long-term data: search jobs, restore, Sentinel data lake KQL jobs",
  "body": [
   "Investigations often need data older than your interactive retention: a breach discovered months after the first intrusion, a new threat intelligence report about activity last year, or a legal request. Microsoft Sentinel keeps older data cheaply in long-term retention or the Sentinel data lake tier, but that data cannot be queried like interactive analytics data, and analytics rules cannot run on it. Three tools bring it back into reach, and the exam expects you to pick the right one for the job. A search job scans a table, including its long-term retained data, for records that match a query, and writes the matching records into a new table in the analytics tier. The results table name ends in `_SRCH`. Search jobs run asynchronously, so you can search very large volumes and come back later. They work on analytics tables and on lower-cost plans, and use a restricted set of Kusto Query Language (KQL) operators, essentially filters rather than joins. You pay for the data scanned and for the results stored. Use a search job when you need specific records, such as every event mentioning an IP address across the past year.",
   "Restore brings a whole time slice of a table's long-term data back into the analytics tier, into a table whose name ends in `_RST`. You can then run full KQL against it, including joins, hunting queries and workbooks, as if it were fresh data. Restore is for deep investigation of a period, such as all sign-in logs for the week a breach started. Restored data is billed for as long as it stays restored, so delete the restore when you finish.",
   "The Sentinel data lake changes the long-term story. Data in the lake tier can be queried directly with KQL in data lake exploration for interactive investigation. KQL jobs run a KQL query over data lake data, once or on a schedule, and write the results into an analytics-tier table. A scheduled KQL job can, for example, extract indicator matches from months of network logs every day, so detections and workbooks in the analytics tier can use them. KQL jobs can use richer KQL than search jobs, including joins across lake tables, within the limits the service sets. Notebooks can also query the lake with Python for larger analyses.",
   "Choosing between them comes down to the question. Need specific matching records from long-term data: use a search job. Need to work interactively on a full time range with every KQL feature: use restore. Data lives in the Sentinel data lake and you want results routinely promoted to the analytics tier: use a KQL job. Summary rules, covered earlier, are for regular aggregation into the analytics tier. Cost awareness is essential, because all these tools bill by data scanned or stored. Narrow the time range and filter as early as possible, test on small ranges first, and remove results tables you no longer need. A search job result is then queried like any table:",
   "```kusto\nDnsEvents_SRCH\n| summarize Lookups = count(), FirstSeen = min(TimeGenerated) by Computer, Name\n| order by FirstSeen asc\n```",
   "Consider a worked example. A threat report says an actor used a specific domain eleven months ago. The SOC runs a search job for that domain across DNS logs held in long-term storage, and the `DnsEvents_SRCH` table shows two hosts that resolved it. They then restore the full week of process and sign-in data around those dates, investigate with joins across the restored `_RST` tables, confirm one host ran a malicious installer, and delete the restore afterward. Finally, because the network logs now live in the data lake, they schedule a KQL job that checks new threat intelligence domains against the lake daily and writes matches to an analytics table where a rule alerts.",
   "Common mistakes: restoring a whole year when you only need a handful of records (use a search job); leaving a restore in place for weeks and paying for it; expecting to run joins inside a search job; pointing an analytics rule at raw data lake tables instead of at KQL job output; and starting a huge search without narrowing the time range.",
   "On the exam, 'find records matching X from last year' means search job; 'investigate everything in that week with full KQL' means restore; 'query the data lake on a schedule and send results to the analytics tier' means KQL job; and the suffixes `_SRCH` and `_RST` identify search and restore results."
  ],
  "terms": [
   [
    "Long-term retention",
    "Low-cost storage of data beyond interactive retention, not directly usable by analytics rules."
   ],
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
    "Data lake exploration",
    "Interactive KQL querying of data held in the Sentinel data lake tier."
   ],
   [
    "Results table",
    "The analytics-tier table created by a search job, restore or KQL job, which can be queried with normal KQL."
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
   ],
   [
    "You need every event mentioning one IP address over the past year. Search job or restore?",
    "A search job, because it finds specific matching records without restoring whole time ranges."
   ]
  ]
 },
 {
  "t": "Normalized hunting with ASIM parsers across vendors",
  "body": [
   "Most organizations have several firewalls, proxies, DNS servers and identity systems from different vendors. Each logs the same kind of event with different table names, column names and values. One firewall calls the source address SrcIP, another src_ip, a third puts it inside a Syslog message. One says allow, another accept, a third permit. Writing every detection and hunt once per vendor does not scale, and a new product would silently fall outside all of them. The Advanced Security Information Model (ASIM) solves this by normalizing data, usually at query time. ASIM defines schemas for common event types, including network session, DNS, web session, authentication, process event, file event, registry event, audit event, user management and Dynamic Host Configuration Protocol (DHCP). Each schema has standard column names and value formats, for example SrcIpAddr, DstIpAddr, DstPortNumber and EventResult with values such as Success or Failure, so a query written once means the same thing for every source.",
   "Parsers are Kusto Query Language (KQL) functions that read vendor-specific data and output rows in the ASIM schema. There are source-specific parsers, one per product, and unifying parsers that call all the source-specific parsers for a schema and union the results. When you query the unifying parser `_Im_NetworkSession`, you get network sessions from every supported source in one normalized result, without knowing which tables they came from. New sources are added by adding their parser; queries built on the unifying parser pick them up automatically.",
   "There are two flavors of unifying parser. Filtering parsers, named with the `_Im_` prefix, accept parameters such as `starttime`, `endtime`, and schema-specific filters like source IP address prefixes or domain names. The filters are pushed down into each source parser, so less data is processed and queries run faster. Parameter-less parsers, named with `_ASim_`, return everything and are handy for exploration. Built-in parsers are deployed with Sentinel and start with an underscore; workspace-deployed versions without the underscore exist for customization. The trade-off is that query-time parsing costs some performance and you rely on parsers existing for your products; for heavy use, ingestion-time normalization into ASIM tables is also possible.",
   "```kusto\n_Im_NetworkSession(starttime = ago(1d), endtime = now())\n| where DstPortNumber == 3389 and EventResult == \"Success\"\n| summarize Sessions = count() by SrcIpAddr, DstIpAddr\n```",
   "This single query finds Remote Desktop Protocol (RDP) sessions across every normalized firewall and network source. The same idea applies to detections: many Sentinel analytics rule templates are built on ASIM so they work across vendors, and Content hub solutions for third-party products often include the matching source-specific parsers. When hunting across vendors, reach for the ASIM unifying parser for the schema first, pass filters as parameters, and only drop to a raw vendor table when you need a field ASIM does not map. Because ASIM columns are consistent, you can also combine schemas: for example, join `_Im_Authentication` results with `_Im_NetworkSession` on the source IP address to see whether an address that failed many sign-ins also opened RDP sessions, whichever identity provider or firewall recorded each event.",
   "Consider a worked example. A company runs two different firewall brands after a merger. Instead of maintaining two versions of each hunt, the SOC rewrites its lateral movement hunts to use `_Im_NetworkSession` with time and port filters, and its DNS tunneling hunt to use `_Im_Dns`. When a third firewall is added and its ASIM parser installed from Content hub, the existing hunts and rules cover it with no changes.",
   "Common mistakes: querying `_ASim_` parsers over long ranges without filters and waiting for slow results; filtering after the parser call when a parameter would push the filter down; editing a built-in underscore parser instead of using a workspace copy; assuming every vendor has a parser; and comparing EventResult to a vendor value like accept instead of the normalized Success.",
   "Exam questions usually describe many vendors and one question. 'One query across different firewalls or DNS servers' means ASIM. 'Improve performance of a normalized query' means passing parameters to an `_Im_` filtering parser. 'Parser with no parameters' is `_ASim_`. 'Normalizes one product' is a source-specific parser; 'combines all sources for a schema' is a unifying parser. 'New source automatically included in existing hunts' is the benefit of building on the unifying parser."
  ],
  "terms": [
   [
    "ASIM",
    "The Advanced Security Information Model, which normalizes events from different sources into common schemas."
   ],
   [
    "ASIM schema",
    "A standard set of column names and values for one event type, such as network session or DNS."
   ],
   [
    "Source-specific parser",
    "An ASIM function that normalizes data from one product into a schema."
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
    "Query-time normalization",
    "Converting vendor data to a common schema when the query runs, rather than when data is ingested."
   ]
  ],
  "example": "A company runs two different firewall brands after a merger. Instead of maintaining two versions of each hunt, the SOC rewrites its lateral movement hunts to use _Im_NetworkSession with time filters. When a third firewall is added and its ASIM parser installed, the existing hunts cover it with no changes, and the SOC spends its time on new detections instead of rewrites.",
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
   ],
   [
    "What is the difference between a source-specific and a unifying parser?",
    "A source-specific parser normalizes one product; a unifying parser calls all source-specific parsers for a schema and unions the results."
   ]
  ]
 },
 {
  "t": "Threat intelligence: TI indicators, TAXII feeds, threat analytics reports in Defender XDR",
  "body": [
   "Threat intelligence (TI) is information about attackers: who they are, how they operate, and the traces they leave. For a security operations center (SOC) it comes in two main forms. Indicators of compromise (IoCs) are concrete observables such as IP addresses, domains, URLs, file hashes and email addresses associated with malicious activity. Finished intelligence is written analysis of threat actors, campaigns, vulnerabilities and techniques, which tells you what to look for and how to defend. Indicators are easy to match automatically but go stale quickly; finished intelligence lasts longer and shapes priorities. In Microsoft Sentinel, indicators are stored as Structured Threat Information Expression (STIX) objects and managed on the threat intelligence page, where you can view, search, tag, add and expire them. They are stored in workspace tables so you can query them, and Microsoft has moved to newer STIX-based tables alongside the older ThreatIntelligenceIndicator table. Indicators have properties such as confidence, valid-from and valid-until dates, threat types and source. Expiring old indicators matters: IP addresses change owners, and stale indicators cause false positives.",
   "Indicators get into Sentinel through connectors. Trusted Automated Exchange of Intelligence Information (TAXII) is a standard protocol for sharing STIX data. The Threat Intelligence TAXII connector pulls indicators from a TAXII server; you provide the API root, collection ID and credentials from the feed provider, and choose a polling frequency. Other routes are the upload API for threat intelligence platforms (TIPs), the Microsoft Defender Threat Intelligence connector for Microsoft's own indicators, and manual entry or file import. Remember the pairing: STIX is the format, TAXII is the transport.",
   "Using indicators is the point. Threat intelligence matching analytics rule templates, often called TI map rules, compare indicators with logs such as DNS, sign-in, firewall and email events and alert on matches. You can also join indicator tables in hunting queries. Defender XDR has its own custom indicators for endpoints (file, IP, URL, certificate), which block or alert on devices, as covered in the Defender for Endpoint lesson. A simple hunting join looks like this:",
   "```kusto\nlet iocs = ThreatIntelligenceIndicator\n| where ExpirationDateTime > now() and isnotempty(DomainName)\n| distinct DomainName;\nDnsEvents\n| where Name in (iocs)\n```",
   "Threat analytics in the Defender portal delivers finished intelligence from Microsoft security researchers. Each report covers an active threat actor, campaign, attack technique or vulnerability. Its tabs include an overview, the full analyst report with detection and hunting guidance, related incidents and alerts in your tenant, impacted assets, and exposure and mitigations, which shows whether your devices have the relevant patches and secure configurations. The dashboard highlights reports with the most impact on your organization, and you can set up email notifications for new or updated reports. Use it to prioritize: if a report shows ransomware-linked incidents in your tenant and unpatched devices, that is where to spend effort today, and the report's hunting queries check for undetected activity.",
   "Consider a worked example. An information sharing and analysis center (ISAC) shares indicators through a TAXII server. The SOC connects it with the Threat Intelligence TAXII connector and enables TI map rules for DNS and firewall logs. A week later a rule alerts that a server resolved a listed domain. Threat analytics shows the domain belongs to a campaign report, whose exposure and mitigations tab reveals four servers missing the patch the actor exploits. The team patches them, runs the report's hunting queries, and finds no further activity.",
   "Common mistakes: importing indicators with no expiration, so old IP addresses keep firing; confusing STIX and TAXII; ingesting indicators but never enabling a matching rule; treating every indicator match as confirmed compromise without checking confidence and context; and reading threat analytics only for news instead of acting on its exposure data.",
   "Exam questions separate the pieces. 'Pull indicators from a feed provider's server' means the TAXII connector with API root and collection ID. 'Push indicators from a TIP' means the upload API. 'Alert when logs contain a known malicious domain' means a TI map analytics rule. 'Report on an actor with related incidents, impacted assets and patch status in my tenant' means threat analytics. 'Block a hash on endpoints' means a Defender for Endpoint indicator. 'Stale indicators causing false positives' means set expiration dates."
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
    "TI map rule",
    "A threat intelligence matching analytics rule that alerts when indicators appear in logs."
   ],
   [
    "Threat analytics",
    "Defender portal reports on active threats, showing related incidents, impacted assets and mitigation status."
   ],
   [
    "Exposure and mitigations",
    "The threat analytics section showing whether your devices have the patches and settings that defend against a threat."
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
   ],
   [
    "How do imported indicators actually produce alerts in Sentinel?",
    "Through threat intelligence matching (TI map) analytics rules that compare indicators with log data."
   ]
  ]
 },
 {
  "t": "Graph-based hunting: Sentinel graph and hunting graphs with blast radius",
  "body": [
   "Tables and Kusto Query Language (KQL) are great for asking which events match a condition, but many security questions are about relationships: which users can reach this storage account, how could a compromised laptop lead to a domain admin, or what would an attacker holding this identity be able to touch. Graphs model data as nodes (users, devices, groups, cloud resources, applications) and edges (relationships such as member of, has permission to, logged on to or can authenticate as). Attackers think in graphs, moving from one foothold to the next, so defenders benefit from doing the same.",
   "Microsoft Sentinel graph builds a relationship model of your environment from data in the Sentinel data lake and Microsoft security products, covering identities, devices, cloud resources, permissions and activity. It powers several experiences in the Defender portal and is also available to tools and AI agents that need to reason about connections. Several of these features are recent and their exact names and capabilities may still change, so focus on the concepts: nodes, edges, paths and what can be reached from where.",
   "Hunting graphs let you explore these relationships visually during a hunt in the Defender portal. Instead of writing many joins, you start from an entity, such as a user or a device, and expand its connections to see paths toward sensitive assets. Predefined scenarios answer common questions, such as paths from a user to critical resources, and you can open nodes to see their details and pivot back into advanced hunting queries or incidents. The graph complements KQL rather than replacing it: you use the graph to find the path, and queries to check what actually happened along it.",
   "Blast radius analysis answers the question: if this node is compromised, what can the attacker reach from here? From an incident or an entity, it shows the paths from the compromised user or device to critical targets, for example key vaults, databases, privileged accounts or domain controllers, based on permissions, sessions and network exposure. This helps you prioritize containment: an infected kiosk that reaches nothing sensitive is less urgent than a laptop whose logged-on user administers production. It also helps scope an investigation, because the targets on those paths are where you should look for follow-on activity.",
   "Graph thinking also appears elsewhere in this course. Defender for Identity lateral movement paths are a graph of sessions and admin rights; Microsoft Security Exposure Management attack paths show chains of weaknesses toward critical assets, and its critical asset management marks which targets matter most; the incident graph shows how an incident's entities connect. Sentinel graph brings these ideas into hunting with your own data. Use graph findings on both sides. Operationally, contain the nodes on the most dangerous paths first and hunt along them. Preventively, break paths by removing unnecessary permissions and admin rights, fixing misconfigurations, and protecting critical assets, so that the next compromise has a smaller blast radius.",
   "Consider a worked example. A developer's laptop is flagged with a credential-stealing alert. Blast radius analysis from the incident shows the developer's account has a path through a group membership to a production key vault holding database secrets, and a second path through a cached session to a build server. The SOC contains the device, revokes the user's sessions, and rotates the key vault secrets. They then hunt along both paths with KQL, checking key vault access logs and build server logons for the last week, and find no access. Afterward the identity team removes the developer group's standing access to production and replaces it with just-in-time elevation, shrinking the blast radius for the next incident.",
   "Common mistakes: treating a path in the graph as proof that the attacker used it (it shows what is possible; logs show what happened); containing only the first device and ignoring the more dangerous identity attached to it; relying on graphs when the underlying data is missing, which leaves hidden edges; forgetting to mark critical assets, so blast radius cannot highlight what matters; and using the graph for questions that a simple KQL filter answers faster.",
   "Exam questions separate relationship questions from event questions. 'What could an attacker reach from this compromised identity or device' means blast radius or an attack path view. 'Explore connections from a user to sensitive resources during a hunt' means hunting graphs. 'How could a helpdesk account reach a domain admin' in Active Directory means Defender for Identity lateral movement paths. 'Which events match this condition' means a KQL query. 'Reduce future blast radius' means removing excess permissions and admin rights."
  ],
  "terms": [
   [
    "Graph",
    "A data model of nodes (entities) and edges (relationships) used to analyze connections."
   ],
   [
    "Node and edge",
    "A node is an entity such as a user or device; an edge is a relationship between two nodes, such as member of."
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
   ],
   [
    "Attack path",
    "A chain of relationships and weaknesses that could lead an attacker from an entry point to a critical asset."
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
   ],
   [
    "Does a path in a hunting graph prove the attacker used it?",
    "No. It shows what is possible; you confirm actual use by querying logs along the path."
   ]
  ]
 }
], { reviewed: "2026-09-30" });
