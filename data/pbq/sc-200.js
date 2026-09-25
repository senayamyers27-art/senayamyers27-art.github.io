CertHub.addPbqs("sc-200", [
  { id: "sentinel-rule-types", d: 1, type: "match", title: "Match Sentinel analytics rule types to their behavior",
    prompt: "Your SOC lead asks you to explain the analytics rule types available in Microsoft Sentinel. Match each rule type to the description that fits it.",
    pairs: [
      ["Scheduled", "Runs your own KQL query on an interval and lookback period you define, with thresholds, entity mapping and alert grouping"],
      ["Near-real-time (NRT)", "Runs a KQL query about once every minute for the fastest possible detection, with more limitations than the standard query-based type"],
      ["Microsoft security (incident creation)", "Creates Sentinel incidents from alerts raised by other Microsoft security products, filtered by product and severity"],
      ["Anomaly", "Built-in machine learning templates that write results to the Anomalies table; you can adjust parameters but not rewrite the logic"],
      ["Fusion", "Correlates many low-fidelity alerts and anomalies across products with machine learning to detect multistage attacks"]
    ],
    extra: ["Runs a search job against archived data and restores the results to a new table"],
    explain: "Scheduled rules are the workhorse: your KQL, your schedule and lookback. NRT rules trade flexibility for speed and run every minute. Microsoft security rules only turn existing product alerts into incidents (and are turned off when Sentinel is onboarded to the Defender portal, which correlates alerts itself). Anomaly rules are tunable ML templates, and Fusion correlates weak signals into high-confidence multistage incidents. Search jobs are a long-term data feature, not a rule type." },

  { id: "sentinel-roles-match", d: 1, type: "match", title: "Assign the right Microsoft Sentinel role",
    prompt: "Match each requirement in your SOC to the least-privileged built-in Microsoft Sentinel role that meets it.",
    pairs: [
      ["A manager needs to view incidents, workbooks and analytics rules but must not change anything", "Microsoft Sentinel Reader"],
      ["A Tier-1 analyst must assign, change status of and close incidents, but must not edit analytics rules", "Microsoft Sentinel Responder"],
      ["A detection engineer must create and edit analytics rules, workbooks and watchlists", "Microsoft Sentinel Contributor"],
      ["The Sentinel service itself needs permission on a resource group so automation rules can run playbooks there", "Microsoft Sentinel Automation Contributor"]
    ],
    extra: ["Owner", "Log Analytics Reader"],
    explain: "Reader is view-only, Responder adds incident management (assign, status, close), and Contributor adds creating and editing content such as analytics rules and workbooks. Automation Contributor is granted to the Sentinel service account so automation rules can attach and trigger playbooks; it is not meant for human users. Owner would work for several rows but violates least privilege." },

  { id: "asr-rollout-order", d: 1, type: "order", title: "Roll out an attack surface reduction rule safely",
    prompt: "You must enable the ASR rule 'Block Office applications from creating child processes' on 4,000 devices without breaking business macros. Put these steps in the correct order.",
    steps: [
      "Deploy the rule in audit mode to all target devices",
      "Let it run for a period of time and review audit events in the ASR report or advanced hunting (DeviceEvents, ActionType starting with 'Asr')",
      "Add narrow file or folder exclusions for legitimate line-of-business apps the rule would have blocked",
      "Switch the rule to block mode for a small pilot device group and monitor",
      "Expand block mode to the remaining device groups in stages"
    ],
    explain: "Audit mode logs what the rule would block without affecting users, so it always comes first. Reviewing the audit data tells you which legitimate apps need exclusions, and exclusions must be in place before blocking. A staged rollout (pilot, then broader rings) limits the blast radius if something was missed; warn mode is an optional middle step for user-facing rules." },

  { id: "windows-eventid-fill", d: 1, type: "fill", title: "Choose Windows Security event IDs for a DCR",
    prompt: "You are building a data collection rule (DCR) with a custom XPath filter so the Azure Monitor Agent sends only the Windows Security events your detections need. Fill in the event ID for each activity.",
    context: "DCR xPathQueries (partial)\n  \"Security!*[System[(EventID=????)]]\"\n\nRequired detections:\n  - Brute force: failed logons\n  - Suspicious process launches (with command line auditing enabled)\n  - Anti-forensics: someone cleared the Security log\n  - Persistence: new local or domain user created",
    fields: [
      { label: "An account failed to log on", answers: ["4625"] },
      { label: "A new process has been created", answers: ["4688"] },
      { label: "The audit (Security) log was cleared", answers: ["1102"] },
      { label: "A user account was created", answers: ["4720"] }
    ],
    explain: "4625 is a failed logon (4624 is the successful one), 4688 is process creation and includes the command line when that audit policy is enabled, 1102 records the Security log being cleared, and 4720 records a new user account. Filtering the DCR to just the IDs your rules use is the main way to keep the Windows Security Events connector affordable." },

  { id: "mfa-fatigue-select", d: 2, type: "select", title: "Spot an MFA fatigue attack in sign-in logs",
    prompt: "Microsoft Entra ID Protection flagged jlee@example.com. Review the SigninLogs extract and select every sign-in that is part of an MFA fatigue (push bombing) attack.",
    context: "TimeGenerated(UTC)  UserPrincipalName   IPAddress      Loc  ResultType  ResultDescription\n02:11:04  jlee@example.com   203.0.113.45   RO   500121  Authentication failed during strong authentication request (user declined)\n02:12:30  jlee@example.com   203.0.113.45   RO   500121  Authentication failed during strong authentication request (user declined)\n02:14:02  jlee@example.com   203.0.113.45   RO   500121  Authentication failed during strong authentication request (user declined)\n02:15:40  jlee@example.com   203.0.113.45   RO   0       Success (MFA completed in app)\n08:02:11  jlee@example.com   198.51.100.20  US   0       Success (MFA completed in app)\n08:31:55  mkim@example.com   198.51.100.20  US   50126   Invalid username or password\n08:32:20  mkim@example.com   198.51.100.20  US   0       Success (MFA completed in app)",
    options: [
      "02:11:04 jlee from 203.0.113.45, 500121 user declined",
      "02:12:30 jlee from 203.0.113.45, 500121 user declined",
      "02:14:02 jlee from 203.0.113.45, 500121 user declined",
      "02:15:40 jlee from 203.0.113.45, success",
      "08:02:11 jlee from 198.51.100.20, success",
      "08:31:55 mkim from 198.51.100.20, 50126 invalid password",
      "08:32:20 mkim from 198.51.100.20, success"
    ],
    answers: [0, 1, 2, 3],
    explain: "Error 500121 means the password was already correct and the sign-in failed at the MFA step, so repeated declines from an unfamiliar foreign IP at 2 a.m. show an attacker who knows the password spamming push prompts. The 02:15 success from the same IP is the user finally approving, which is the actual compromise. The 08:02 sign-in comes from the usual office IP during work hours, and mkim's single typo followed by success is normal behavior. Response: confirm user compromised, revoke sessions, reset the password and enable number matching." },

  { id: "mde-response-match", d: 2, type: "match", title: "Pick the right Defender for Endpoint response action",
    prompt: "During an incident you need to take several actions on devices in Microsoft Defender for Endpoint. Match each goal to the response action that achieves it.",
    pairs: [
      ["Cut the device off the network while keeping its connection to the Defender service", "Isolate device"],
      ["Allow only Microsoft-signed executables to run on the device", "Restrict app execution"],
      ["Gather autoruns, installed programs, network connections and event logs as a zip for offline analysis", "Collect investigation package"],
      ["Open a remote shell to run scripts and download a suspicious file from the device", "Initiate live response session"],
      ["Kill a malicious process and move its file to quarantine on this device", "Stop and quarantine file"]
    ],
    extra: ["Add file indicator (block)", "Run antivirus scan"],
    explain: "Isolation keeps the Defender sensor connected so you can still investigate and respond. Restrict app execution applies a code integrity policy that allows only Microsoft-signed files. The investigation package is a forensic snapshot, while live response gives interactive remote access for scripts and file collection. Stop and quarantine acts on the file on the affected device; a block indicator is the right choice to prevent the same hash running anywhere in the organization." },

  { id: "phish-removal-order", d: 2, type: "order", title: "Remove a delivered phishing email",
    prompt: "Users report a credential-phishing email that was delivered to many mailboxes. Using Defender for Office 365 Plan 2, put these steps in the correct order.",
    steps: [
      "Open Threat Explorer and filter on the sender, subject or URL from the reported message",
      "Select all delivered copies of the message in the results",
      "Choose Take action and submit a soft delete (move to Deleted Items) remediation",
      "Have an authorized approver approve the pending remediation in the Action center",
      "Confirm the action completed on the History tab of the Action center, then check which users clicked the URL"
    ],
    explain: "Threat Explorer is where you find every delivered copy using the indicators from the report. The remediation you choose there creates an action that must be approved in the Action center (unless you have permission to approve directly), and the History tab confirms it ran. Checking URL clicks afterwards finds users who may have entered credentials and need their sessions revoked and passwords reset." },

  { id: "mdi-alert-match", d: 2, type: "match", title: "Match identity attack evidence to the technique",
    prompt: "Microsoft Defender for Identity raised several alerts. Match each observed behavior to the attack technique it indicates.",
    pairs: [
      ["A workstation, not a domain controller, sent a directory replication request for account password data", "DCSync"],
      ["A Kerberos TGT was used with a lifetime far longer than the domain policy and a forged PAC", "Golden Ticket"],
      ["An NTLM hash stolen from one host was reused to authenticate to another host without the clear-text password", "Pass-the-hash"],
      ["A user account requested Kerberos service tickets for many SPNs in a short time", "Kerberoasting"]
    ],
    extra: ["Password spray", "AS-REP roasting"],
    explain: "DCSync abuses replication rights (DRSUAPI) so a non-DC can pull password hashes. A Golden Ticket is a TGT forged with the stolen KRBTGT hash, which is why the fix is resetting KRBTGT twice. Pass-the-hash reuses an NTLM hash directly, and Kerberoasting requests service tickets in bulk to crack service account passwords offline. Password spraying and AS-REP roasting leave different evidence: many accounts with one password, and pre-auth-disabled accounts, respectively." },

  { id: "kql-encoded-ps-fill", d: 3, type: "fill", title: "Complete an encoded PowerShell hunting query",
    prompt: "Complete the advanced hunting query so it finds PowerShell launched with an encoded command and counts executions per device and account, highest first. Fill in the missing operator for each blank.",
    context: "DeviceProcessEvents\n| where Timestamp > ago(7d)\n| where FileName =~ \"powershell.exe\"\n| where ProcessCommandLine ___1___ (\"-enc\", \"-EncodedCommand\")\n| ___2___ Executions = count() by DeviceName, AccountName\n| ___3___ Executions desc",
    fields: [
      { label: "Blank 1 (matches any term in the list)", answers: ["has_any"] },
      { label: "Blank 2 (aggregates rows)", answers: ["summarize"] },
      { label: "Blank 3 (sorts the results)", answers: ["order by", "sort by"] }
    ],
    explain: "has_any returns rows whose column contains any of the listed whole terms and is faster than contains because it uses the term index. summarize with count() by groups the rows and produces one count per device and account. order by (or its synonym sort by) with desc puts the most frequent executions first." },

  { id: "kql-operator-match", d: 3, type: "match", title: "Match KQL operators to their purpose",
    prompt: "A new hunter is learning KQL in Microsoft Sentinel. Match each operator or function to what it does.",
    pairs: [
      ["project", "Chooses, renames or reorders the columns to keep"],
      ["extend", "Adds a calculated column while keeping all existing columns"],
      ["mv-expand", "Turns each element of a dynamic array into its own row"],
      ["parse_json", "Converts a JSON string into a dynamic value you can index into"],
      ["bin", "Rounds timestamps down into fixed-size buckets for time-based aggregation"],
      ["let", "Binds a name to a value, list or subquery for reuse later in the query"]
    ],
    extra: ["Combines rows from two tables that share a key", "Returns an arbitrary sample of N rows"],
    explain: "project reshapes the column list, while extend only adds columns. mv-expand is used after parse_json when a column holds an array (for example, AdditionalFields or Entities) so each element becomes a row. bin(TimeGenerated, 1h) buckets time for summarize, and let defines reusable values such as dynamic IOC lists. The extras describe join and take." },

  { id: "custom-detection-order", d: 3, type: "order", title: "Turn a hunting query into a custom detection",
    prompt: "Your encoded PowerShell hunting query in Defender XDR advanced hunting returns good results. Put the steps to turn it into a custom detection rule in the correct order.",
    steps: [
      "Make sure the query returns Timestamp, ReportId and an entity column such as DeviceId, then run it successfully",
      "Select Create detection rule from the advanced hunting query editor",
      "Enter alert details: name, frequency, severity, category and MITRE techniques",
      "Choose the impacted entities (device, mailbox or user columns)",
      "Choose automated actions, such as isolating the device or collecting an investigation package",
      "Review the settings and create the rule"
    ],
    explain: "A custom detection rule needs the required columns (Timestamp, ReportId and at least one entity identifier) or the wizard will not let you save it, so you validate the query first. The wizard then walks through alert details, impacted entities and optional response actions before the final review. Frequency and the MITRE mapping in the alert details step control how often the query runs and how the alert is categorized." }
]);
