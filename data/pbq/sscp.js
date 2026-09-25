CertHub.addPbqs("sscp", [
  { id: "control-types-match", d: 1, type: "match", title: "Classify security controls by type",
    prompt: "A security practitioner is documenting controls for an audit. Match each control to its PRIMARY control type.",
    pairs: [
      ["Badge-controlled turnstile at the data center entrance", "Preventive"],
      ["SIEM alert on repeated failed logins to the payroll server", "Detective"],
      ["Restoring a tampered web page from a known-good backup", "Corrective"],
      ["\"Premises monitored by CCTV\" signs on the fence", "Deterrent"],
      ["Isolated VLAN and jump host for a controller that cannot support MFA", "Compensating"],
      ["Acceptable use policy that states how staff must handle customer data", "Directive"]
    ],
    extra: ["Recovery"],
    explain: "Preventive controls stop an event before it happens (the turnstile), detective controls discover it while or after it happens (the SIEM alert), and corrective controls fix the damage (restoring the page). Signs are deterrent because they discourage an attacker without physically stopping anyone. The isolated VLAN is compensating because it stands in for a primary control (MFA) that cannot be implemented, and a policy telling people what to do is directive. Recovery controls restore full operations after a major disruption, which none of these specifically do." },

  { id: "change-mgmt-order", d: 1, type: "order", title: "Process a standard change request",
    prompt: "An administrator wants to enable TLS 1.3 and disable TLS 1.0 on a production web server. Put the change management steps in the correct order.",
    steps: [
      "Submit a change request describing the change, its reason and the systems affected",
      "Analyze impact and risk, and document a tested backout plan",
      "Obtain approval from the change advisory board",
      "Implement the change during the approved maintenance window",
      "Verify the change, update the configuration baseline and close the request"
    ],
    explain: "Change management starts with a documented request so there is a record of what and why. Impact analysis and a backout plan come before approval, because the approvers need that information to decide. Only an approved change is implemented, in the agreed window, and the process ends by verifying the result and updating the baseline and documentation so configuration records match reality." },

  { id: "access-review-select", d: 2, type: "select", title: "Quarterly access recertification",
    prompt: "You are running the quarterly access review against the policy shown. Select every account that must be flagged for remediation.",
    context: "Policy:\n - Disable accounts with no logon for more than 90 days\n - Disable accounts the same day HR records a termination\n - No account may hold both AP-Create-Vendor and AP-Approve-Payment\n - Every account must have a named individual owner\n\nReview date: 2026-06-30\n\nAccount   Owner       HR status             Enabled  Last logon   Groups\njlee      J. Lee      Active                Yes      2026-06-29   AP-Create-Vendor\nmortiz    M. Ortiz    Terminated 2026-05-12  Yes      2026-05-11   Sales-RO\nkpatel    K. Patel    Active                Yes      2026-06-28   AP-Create-Vendor, AP-Approve-Payment\ntemp01    (none)      n/a                   Yes      2026-06-15   Warehouse-RW\nswong     S. Wong     Active                Yes      2026-06-30   AP-Approve-Payment\nrdiaz     R. Diaz     Active                Yes      2026-02-10   Engineering-RW",
    options: ["jlee", "mortiz", "kpatel", "temp01", "swong", "rdiaz"],
    answers: [1, 2, 3, 5],
    explain: "mortiz was terminated in May but is still enabled, so deprovisioning failed. kpatel holds both accounts-payable groups, which breaks separation of duties. temp01 has no named owner, so nobody is accountable for its use. rdiaz last logged on in February, more than 90 days before the review, so the account should be disabled. jlee and swong each hold only one of the two AP roles and are active, so they comply." },

  { id: "access-models-match", d: 2, type: "match", title: "Identify the access control model",
    prompt: "Match each access decision described to the access control model it uses.",
    pairs: [
      ["The file's creator grants a coworker read access to it", "Discretionary (DAC)"],
      ["A Secret-cleared user is denied a Top Secret document based on labels", "Mandatory (MAC)"],
      ["Everyone in the Nurse role can view patient charts on their ward", "Role-based (RBAC)"],
      ["Access is allowed only if department=Finance, device is managed and time is 08:00-18:00", "Attribute-based (ABAC)"],
      ["A router ACL permits any host to reach TCP 443 on the web server", "Rule-based"]
    ],
    explain: "In DAC the owner decides who gets access. MAC compares system-enforced labels (clearance vs classification) and users cannot override it. RBAC assigns permissions to job roles rather than individuals. ABAC evaluates several attributes of the subject, object and environment together. Rule-based access applies the same global rules to everyone, such as firewall or router ACLs, regardless of who the user is." },

  { id: "ale-fill", d: 3, type: "fill", title: "Quantitative risk: is the safeguard worth it?",
    prompt: "A customer database is valued at $200,000. A breach would destroy 25% of its value and is expected once every 5 years. A proposed control costs $15,000 per year and would reduce the expected frequency to once every 20 years. Fill in the values (whole dollars).",
    fields: [
      { label: "Single loss expectancy (SLE)", answers: ["50000", "50,000", "$50,000", "$50000"] },
      { label: "Annualized loss expectancy (ALE) before the control", answers: ["10000", "10,000", "$10,000", "$10000"] },
      { label: "ALE after the control", answers: ["2500", "2,500", "$2,500", "$2500"] },
      { label: "Annual net value of the control (negative if it costs more than it saves)", answers: ["-7500", "-7,500", "-$7,500", "-$7500", "$-7,500", "$-7500"] }
    ],
    explain: "SLE = asset value x exposure factor = $200,000 x 0.25 = $50,000. ARO for once every 5 years is 0.2, so ALE = $50,000 x 0.2 = $10,000. With the control, ARO becomes 0.05, so ALE = $2,500. The control's value is ALE before - ALE after - annual cost = $10,000 - $2,500 - $15,000 = -$7,500, so on cost alone it is not justified and a cheaper control, transfer or acceptance should be considered." },

  { id: "spray-log-select", d: 3, type: "select", title: "Spot password spraying in an auth log",
    prompt: "Review the SSH authentication log from a Linux server. Select every line that is part of a password-spraying attempt.",
    context: "Jun 10 09:14:02 srv01 sshd[811]: Failed password for alice from 203.0.113.7 port 51022\nJun 10 09:14:05 srv01 sshd[812]: Failed password for bob from 203.0.113.7 port 51030\nJun 10 09:14:09 srv01 sshd[813]: Failed password for carol from 203.0.113.7 port 51041\nJun 10 09:15:30 srv01 sshd[820]: Accepted publickey for deploy from 10.0.2.15 port 40112\nJun 10 09:16:01 srv01 sshd[824]: Failed password for dave from 203.0.113.7 port 51077\nJun 10 09:20:11 srv01 sshd[830]: Failed password for erin from 192.168.1.40 port 60210\nJun 10 09:20:40 srv01 sshd[831]: Accepted password for erin from 192.168.1.40 port 60215",
    options: [
      "Line 1: failed password for alice from 203.0.113.7",
      "Line 2: failed password for bob from 203.0.113.7",
      "Line 3: failed password for carol from 203.0.113.7",
      "Line 4: accepted publickey for deploy from 10.0.2.15",
      "Line 5: failed password for dave from 203.0.113.7",
      "Line 6: failed password for erin from 192.168.1.40",
      "Line 7: accepted password for erin from 192.168.1.40"
    ],
    answers: [0, 1, 2, 4],
    explain: "Password spraying tries one or a few common passwords against many different accounts from the same source, staying under per-account lockout thresholds. The four failures from external address 203.0.113.7 against alice, bob, carol and dave fit that pattern. The deploy key login is normal automation from an internal host, and erin's single failure followed by success from an internal address looks like an ordinary typo, not an attack." },

  { id: "ir-ransomware-order", d: 4, type: "order", title: "Respond to ransomware on a file server",
    prompt: "EDR raises an alert that files on a departmental file server are being renamed with a new extension. Put the incident response activities in the correct order.",
    steps: [
      "Maintain the IR plan, contact list and offline backups before any incident occurs",
      "Validate the alert and determine the scope of affected systems",
      "Isolate the file server and affected endpoints from the network",
      "Remove the malware and close the initial access vector",
      "Restore data from clean backups and monitor for reinfection",
      "Hold a lessons-learned review and update the plan"
    ],
    explain: "This follows the incident lifecycle: preparation, detection and analysis, containment, eradication, recovery, and post-incident activity. You must confirm and scope the incident before containing it, and contain it before eradication so it cannot spread further. Restoring before eradication risks reinfection, and the lessons-learned step feeds improvements back into preparation." },

  { id: "backup-restore-fill", d: 4, type: "fill", title: "Backup restore sets and data loss",
    prompt: "Backups run nightly at 23:00. A full backup runs every Sunday. The file server fails on Thursday at 15:00. Fill in the values.",
    fields: [
      { label: "Backup sets needed to restore if Mon-Sat nights use DIFFERENTIAL backups", answers: ["2", "two"] },
      { label: "Backup sets needed to restore if Mon-Sat nights use INCREMENTAL backups", answers: ["4", "four"] },
      { label: "Maximum hours of data lost (since the last backup)", answers: ["16", "16 hours", "sixteen"] }
    ],
    explain: "A differential contains everything changed since the last full backup, so you need Sunday's full plus only Wednesday night's differential: 2 sets. An incremental contains only changes since the previous backup of any kind, so you need Sunday's full plus Monday, Tuesday and Wednesday incrementals: 4 sets. The last backup ran Wednesday at 23:00, so up to 16 hours of changes are lost; if that exceeds the RPO, backups must run more often." },

  { id: "crypto-purpose-match", d: 5, type: "match", title: "Pick the right cryptographic tool",
    prompt: "Match each cryptographic algorithm or construction to the job it is best suited for.",
    pairs: [
      ["AES-256-GCM", "Encrypting large volumes of data at rest or in transit"],
      ["SHA-256", "Producing a fixed-length digest to check file integrity"],
      ["HMAC-SHA256", "Verifying integrity and authenticity with a shared secret key"],
      ["ECDHE", "Agreeing on a session key with forward secrecy"],
      ["RSA signature with the sender's private key", "Providing non-repudiation for a signed document"]
    ],
    extra: ["Storing user passwords with a slow, salted hash"],
    explain: "AES is a fast symmetric cipher suited to bulk encryption, and GCM mode also authenticates the data. SHA-256 alone gives integrity but anyone can recompute it, so it does not prove who created the data; HMAC adds a shared secret key for authenticity. Ephemeral Diffie-Hellman (ECDHE) creates per-session keys that are discarded, giving forward secrecy. Only a digital signature with a private key provides non-repudiation, because a shared HMAC key could have been used by either party. Password storage calls for bcrypt, scrypt, Argon2 or PBKDF2, none of which is listed." },

  { id: "fw-rule-review", d: 6, type: "select", title: "Review a perimeter firewall rule set",
    prompt: "Review the firewall rules against the stated policy. Select every rule that violates the policy.",
    context: "Policy:\n - From the internet, the DMZ web server 198.51.100.10 accepts HTTPS only\n - Remote administration is allowed only from the management subnet 10.0.99.0/24 using SSH\n - The database 10.0.10.15 is reachable only from the app subnet 10.0.5.0/24 on TCP 1433\n - Internal hosts may use DNS only via the internal resolver 10.0.1.53\n - Everything else is denied\n\nRule  Source          Destination      Service    Action\n1     any             198.51.100.10    tcp/443    allow\n2     any             198.51.100.10    tcp/80     allow\n3     any             198.51.100.20    tcp/3389   allow\n4     10.0.5.0/24     10.0.10.15       tcp/1433   allow\n5     any             any              tcp/23     allow\n6     10.0.0.0/8      any              udp/53     allow\n7     10.0.99.0/24    10.0.0.0/8       tcp/22     allow\n8     any             any              any        deny",
    options: ["Rule 1", "Rule 2", "Rule 3", "Rule 4", "Rule 5", "Rule 6", "Rule 7", "Rule 8"],
    answers: [1, 2, 4, 5],
    explain: "Rule 2 allows plain HTTP to the web server when the policy permits HTTPS only. Rule 3 exposes RDP to the entire internet instead of restricting administration to SSH from the management subnet. Rule 5 allows cleartext Telnet between any hosts. Rule 6 lets every internal host query any DNS server, which bypasses the internal resolver and enables DNS tunneling; the source should be 10.0.1.53 only. Rules 1, 4 and 7 match the policy, and rule 8 is the explicit deny-all that implements implicit deny." },

  { id: "subnet-fill", d: 6, type: "fill", title: "Calculate subnet boundaries",
    prompt: "A new VLAN for badge readers is assigned 10.20.30.140/27. A technician must configure the DHCP scope and a firewall object. Fill in the values.",
    fields: [
      { label: "Subnet mask (dotted decimal)", answers: ["255.255.255.224"] },
      { label: "Network address", answers: ["10.20.30.128"] },
      { label: "Broadcast address", answers: ["10.20.30.159"] },
      { label: "Number of usable host addresses", answers: ["30"] }
    ],
    explain: "A /27 leaves 5 host bits, so the block size is 32 and the mask is 255.255.255.224. Subnets in the last octet start at 0, 32, 64, 96, 128 and 160, so .140 falls in the block starting at 10.20.30.128. The broadcast is the last address in that block, 128 + 31 = .159, and usable hosts are 2^5 - 2 = 30 (.129 to .158)." },

  { id: "sshd-hardening-select", d: 7, type: "select", title: "Harden an SSH server configuration",
    prompt: "The hardening standard requires key-based authentication only, no direct root login and limited authentication attempts. Select every line in this sshd_config that violates the standard.",
    context: "# /etc/ssh/sshd_config (excerpt) on app01.example.com\nPort 22\nPermitRootLogin yes\nPubkeyAuthentication yes\nPasswordAuthentication yes\nPermitEmptyPasswords no\nMaxAuthTries 3\nX11Forwarding no\nLoginGraceTime 30",
    options: [
      "PermitRootLogin yes",
      "PubkeyAuthentication yes",
      "PasswordAuthentication yes",
      "PermitEmptyPasswords no",
      "MaxAuthTries 3",
      "X11Forwarding no"
    ],
    answers: [0, 2],
    explain: "PermitRootLogin yes allows direct root logins, which removes individual accountability and gives attackers a known account to target; it should be no (or prohibit-password where policy allows). PasswordAuthentication yes permits password logins, so the standard of key-only access is not met; it should be no. The remaining lines already harden the server: keys are enabled, empty passwords are refused, attempts are limited and X11 forwarding is off." }
]);
