/* Performance-based practice simulations for ISC2 CC (2026 outline). */
CertHub.addPbqs("isc2-cc", [
  { id: "control-functions", d: 1, type: "match", title: "Match controls to their function",
    prompt: "A small clinic lists the controls below in its risk register. Match each control to the function it primarily serves.",
    pairs: [
      ["Badge reader that keeps the server room door locked", "Preventive"],
      ["IDS alert raised when a host scans the internal network", "Detective"],
      ["Restoring encrypted files from last night's backup", "Corrective"],
      ["Sign at the entrance: 'Premises monitored, trespassers prosecuted'", "Deterrent"]
    ],
    explain: "Preventive controls stop an event from happening (the locked door). Detective controls notice an event in progress or after it occurs (the IDS alert). Corrective controls restore normal operation after harm is done (restoring from backup). Deterrent controls discourage an attacker from trying at all, which is what a warning sign does; it does not physically stop anyone, so it is not preventive." },

  { id: "ale-calc", d: 1, type: "fill", title: "Calculate SLE and ALE",
    prompt: "A file server holding design drawings is valued at $200,000. A flood in the basement server room would destroy 25% of its value (exposure factor), and such a flood is expected once every two years. Fill in the values (whole dollars, digits only is fine).",
    context: "Asset value (AV):        $200,000\nExposure factor (EF):    25%\nAnnualized rate (ARO):   1 event every 2 years",
    fields: [
      { label: "Annualized rate of occurrence (ARO)", answers: ["0.5", ".5", "1/2", "0.50"] },
      { label: "Single loss expectancy (SLE) in dollars", answers: ["50000", "50,000", "$50,000", "$50000"] },
      { label: "Annualized loss expectancy (ALE) in dollars", answers: ["25000", "25,000", "$25,000", "$25000"] }
    ],
    explain: "SLE = AV x EF = $200,000 x 0.25 = $50,000, the loss from one flood. Once every two years is an ARO of 0.5, so ALE = SLE x ARO = $50,000 x 0.5 = $25,000 per year. Quantitative analysis like this lets you compare the yearly cost of a control (for example, moving the server upstairs) against the ALE it removes." },

  { id: "mfa-combos", d: 1, type: "select", title: "Identify true multi-factor logins",
    prompt: "An auditor is reviewing login methods across the company. Select every method that is genuine multi-factor authentication.",
    context: "Factor types: something you know | something you have | something you are",
    options: [
      "Password plus a 4-digit PIN",
      "Password plus a one-time code from an authenticator app on a registered phone",
      "Smart card plus a fingerprint scan",
      "Password plus the answer to a security question",
      "Door badge plus a PIN typed on the keypad",
      "Fingerprint scan plus facial recognition"
    ],
    answers: [1, 2, 4],
    explain: "MFA requires factors from at least two different types. A password with an authenticator code (know + have), a smart card with a fingerprint (have + are) and a badge with a PIN (have + know) all qualify. A password with a PIN or a security question is two things you know, and fingerprint plus face is two things you are, so those are single-factor even though two checks are made." },

  { id: "policy-docs", d: 2, type: "match", title: "Classify governance documents",
    prompt: "Each excerpt below comes from a company's security document library. Match each excerpt to the type of document it belongs to.",
    pairs: [
      ["Company information must be protected in line with its classification. Management is accountable for compliance.", "Policy"],
      ["All laptops must use AES-256 full-disk encryption using the approved endpoint product.", "Standard"],
      ["1. Open the admin console. 2. Select the device. 3. Click 'Revoke' and confirm. 4. Record the ticket number.", "Procedure"],
      ["Windows 11 build: host firewall on, SMBv1 disabled, screen lock after 10 minutes idle.", "Baseline"],
      ["Consider using a passphrase of four or more random words; it is easier to remember than a complex short password.", "Guideline"]
    ],
    explain: "Policies are high-level, mandatory statements of intent approved by leadership. Standards make a policy concrete with specific mandatory technologies or values. Procedures are step-by-step instructions for doing a task. Baselines define the minimum security configuration for a type of system. Guidelines are recommendations, signalled by words like 'consider' or 'should', and are not mandatory." },

  { id: "kri-dashboard", d: 2, type: "select", title: "Spot KRIs outside tolerance",
    prompt: "The CISO's monthly dashboard lists key risk indicators with the tolerance leadership approved. Select every indicator that is currently outside tolerance and must be escalated.",
    context: "KRI                                          Tolerance      Current\n1 Systems with critical patches > 30 days    <= 5 systems   12 systems\n2 Phishing simulation click rate             <= 8%          6%\n3 Leaver accounts not disabled within 24 h   0              3\n4 Backup jobs failing verification           <= 2%          1.5%\n5 Vendors without a current assessment       <= 10%         10%\n6 Mean time to detect incidents              <= 24 hours    31 hours",
    options: [
      "KRI 1: critical patches older than 30 days",
      "KRI 2: phishing click rate",
      "KRI 3: leaver accounts not disabled",
      "KRI 4: backup verification failures",
      "KRI 5: vendors without current assessment",
      "KRI 6: mean time to detect"
    ],
    answers: [0, 2, 5],
    explain: "Risk tolerance is the acceptable deviation leadership has approved, so anything beyond it needs escalation to the risk owner. KRIs 1, 3 and 6 exceed their thresholds. KRI 5 sits exactly at the 10% limit, which is still within a '<= 10%' tolerance, and KRIs 2 and 4 are comfortably inside. Trending KRI 5 upward would still be worth watching, but it is not yet a breach." },

  { id: "access-models", d: 3, type: "match", title: "Match scenarios to access control models",
    prompt: "Match each scenario to the access control model it describes.",
    pairs: [
      ["A file owner right-clicks a spreadsheet and grants a colleague edit rights", "Discretionary (DAC)"],
      ["A user cleared for Secret cannot open a Top Secret document, and cannot change its label", "Mandatory (MAC)"],
      ["Every new nurse automatically gets chart access because of the job title assigned in HR", "Role-based (RBAC)"],
      ["A system blocks all logins to the payroll app between 20:00 and 06:00 for every user", "Rule-based"]
    ],
    explain: "In DAC the owner decides who gets access. In MAC the system enforces labels and clearances and users cannot override them. RBAC grants permissions through job roles rather than to individuals. Rule-based access applies global rules (such as time-of-day or firewall rules) to everyone regardless of identity or role. Watch out for the shared 'RBAC' abbreviation: role-based is about job function, rule-based is about system-wide conditions." },

  { id: "access-review", d: 3, type: "select", title: "Find problems in a quarterly access review",
    prompt: "You are performing the quarterly access review below. Select every account that violates least privilege, separation of duties or the identity lifecycle and needs remediation.",
    context: "User      Dept / status                         Access\njlee      Accounts Payable, active              Create vendors; Approve payments\nmpatel    HR, terminated 2026-08-30             HR portal (last login 2026-09-12)\nkwong     Sales, active                         CRM standard user\nrdiaz     IT helpdesk, active                   Daily account rdiaz is in Domain Admins\ntnguyen   Marketing (moved from Finance in June) Marketing share; Finance ledger write\nasmith    IT servers, active                    asmith: standard user; asmith-adm: Server Admins",
    options: [
      "jlee",
      "mpatel",
      "kwong",
      "rdiaz",
      "tnguyen",
      "asmith"
    ],
    answers: [0, 1, 3, 4],
    explain: "jlee can both create a vendor and pay it, a classic separation-of-duties conflict that enables fraud. mpatel was terminated yet the account still works and was used after departure, a deprovisioning failure that should also be investigated. rdiaz uses a daily account with domain admin rights instead of a separate privileged account. tnguyen kept Finance write access after a transfer, which is privilege creep. kwong has only what the job needs, and asmith correctly separates a standard account from an admin account." },

  { id: "ports-match", d: 4, type: "match", title: "Match services to default ports",
    prompt: "A firewall change request lists these services. Match each one to its default TCP port.",
    pairs: [["SSH", "22"], ["SMTP", "25"], ["DNS", "53"], ["HTTP", "80"], ["HTTPS", "443"], ["RDP", "3389"]],
    extra: ["21", "23", "110"],
    explain: "SSH uses 22 for encrypted remote shell access, SMTP 25 for mail transfer between servers, DNS 53 (UDP for most queries, TCP for zone transfers and large responses), HTTP 80 and HTTPS 443 for web traffic, and RDP 3389 for Windows remote desktop. Common distractors: 21 is FTP control, 23 is unencrypted Telnet and 110 is POP3." },

  { id: "dmz-rules", d: 4, type: "select", title: "Review perimeter firewall rules",
    prompt: "The company has a DMZ (203.0.113.0/24) holding a public web server and mail server, and an internal LAN (10.0.0.0/16). Select every rule that should be removed because it exposes internal or management services directly to the internet.",
    context: "#  Action  Source           Destination        Port/Proto\n1  allow   any              203.0.113.10       443/tcp   (web)\n2  allow   any              203.0.113.10       3389/tcp\n3  allow   any              203.0.113.25       25/tcp    (mail)\n4  allow   203.0.113.10     10.0.20.5          1433/tcp  (app DB)\n5  allow   any              10.0.20.0/24       any\n6  allow   10.0.10.0/24     203.0.113.10       22/tcp    (IT admin VLAN)\n7  allow   any              203.0.113.25       23/tcp\n8  deny    any              any                any",
    options: [
      "Rule 1", "Rule 2", "Rule 3", "Rule 4", "Rule 5", "Rule 6", "Rule 7", "Rule 8"
    ],
    answers: [1, 4, 6],
    explain: "Rule 2 publishes RDP to the whole internet, a frequent ransomware entry point; management should come only from the admin VLAN or a VPN. Rule 5 lets anyone on the internet reach the entire internal server subnet on every port, defeating the DMZ. Rule 7 exposes unencrypted Telnet on the mail server. Rules 1 and 3 are the intended public services, rule 4 is a narrow web-to-database path, rule 6 restricts SSH to the admin VLAN, and rule 8 is the required default deny." },

  { id: "cloud-models", d: 4, type: "match", title: "Match cloud service and deployment models",
    prompt: "Match each scenario to the cloud service model or deployment model it describes.",
    pairs: [
      ["The company rents virtual machines and must patch the guest operating systems itself", "IaaS"],
      ["Developers upload code to a managed runtime; the provider patches the OS and runtime", "PaaS"],
      ["Staff use a hosted email and office suite through a browser; the company only manages users and data", "SaaS"],
      ["Several regional hospitals share one cloud built to meet their common health-privacy rules", "Community cloud"],
      ["HR stays in an on-premises private cloud while the web store bursts into a public provider at peak times", "Hybrid cloud"]
    ],
    extra: ["Public cloud"],
    explain: "Under the shared responsibility model the customer's share shrinks from IaaS (customer patches the OS and apps) to PaaS (customer manages code and data) to SaaS (customer manages accounts, configuration and data). A community cloud is shared by organizations with common requirements, and a hybrid cloud combines private or on-premises resources with public cloud. In every model the customer stays responsible for its data and who can access it." },

  { id: "ransomware-ir", d: 5, type: "order", title: "Order the incident response lifecycle",
    prompt: "A ransomware incident hits a file server. Put the team's actions in the order the incident response lifecycle calls for.",
    steps: [
      "Maintain the IR plan, contact list and tested offline backups before any incident occurs",
      "Investigate a SIEM alert for mass file renames, confirm ransomware and scope the affected hosts",
      "Disconnect infected hosts from the network and disable the compromised account",
      "Remove the malware and patch the VPN flaw used for initial access",
      "Restore files from clean backups and monitor the hosts closely before returning to service",
      "Hold a post-incident review and update the ransomware playbook"
    ],
    explain: "The lifecycle runs preparation, detection and analysis, containment, eradication, recovery, and lessons learned. Containment comes before eradication so the damage stops spreading while you work, and eradication (including closing the entry point) must come before recovery or the restored systems would be re-infected. The lessons-learned review feeds back into preparation for the next incident." },

  { id: "backup-rpo", d: 5, type: "fill", title: "Check backups against RPO and RTO",
    prompt: "Read the backup schedule and BIA targets for the order database, then fill in the values. The server fails at 15:30.",
    context: "Backup schedule (order database)\n  01:00  full backup\n  05:00, 09:00, 13:00, 17:00, 21:00  incremental backups\nBIA targets\n  RPO: 6 hours\n  RTO: 2 hours\nTested restore time (full + incrementals): 3 hours",
    fields: [
      { label: "Most recent point the data can be restored to (HH:MM)", answers: ["13:00", "1300", "1:00 pm", "1:00pm", "1 pm", "1pm"] },
      { label: "Worst-case data loss with this schedule, in hours", answers: ["4", "4 hours", "four"] },
      { label: "Does the schedule meet the RPO? (yes/no)", answers: ["yes", "y"] },
      { label: "Does the restore time meet the RTO? (yes/no)", answers: ["no", "n"] }
    ],
    explain: "The last backup before a 15:30 failure is the 13:00 incremental, so 2.5 hours of orders are lost this time. Backups run every 4 hours, so the worst case is just under 4 hours of loss, inside the 6-hour RPO. The RTO is about downtime, and a 3-hour tested restore exceeds the 2-hour target, so the business needs a faster option such as a warm standby or replication." }
]);
