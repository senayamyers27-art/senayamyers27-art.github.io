/* Performance-based simulations for CompTIA Security+ (SY0-701). */
CertHub.addPbqs("security-plus", [
  { id: "control-types-match", d: 1, type: "match", title: "Classify controls by type",
    prompt: "A small retailer lists the controls it has in place. Match each control to its control type.",
    pairs: [
      ["Login banner warning that unauthorized access will be prosecuted", "Deterrent"],
      ["IDS alert raised when a port scan hits the DMZ", "Detective"],
      ["Restoring the file server from last night's backup after ransomware", "Corrective"],
      ["Firewall rule that drops inbound SMB from the internet", "Preventive"],
      ["Extra monitoring and network isolation for a legacy POS terminal that cannot be patched", "Compensating"],
      ["Acceptable use policy telling staff not to install unapproved software", "Directive"]
    ],
    explain: "Deterrent controls discourage an attacker but do not physically stop them (a banner). Detective controls identify that something happened (IDS alert), corrective controls restore after an incident (backup restore) and preventive controls block the action outright (firewall drop). A compensating control substitutes when the primary control (patching) is not possible, and a directive control tells people what to do, usually through policy." },

  { id: "crypto-concepts-match", d: 1, type: "match", title: "Match cryptographic techniques to goals",
    prompt: "Match each requirement from a development team to the technique that best meets it.",
    pairs: [
      ["Make two users with the same password end up with different stored hashes", "Salting"],
      ["Make each password guess slower to compute, e.g. 600,000 PBKDF2 iterations", "Key stretching"],
      ["Replace a card number with a random value that maps back to it only in a secure vault", "Tokenization"],
      ["Prove a contract PDF has not changed and who signed it", "Digital signature"],
      ["Hide a message inside the pixel data of an image", "Steganography"]
    ],
    extra: ["Data masking", "Symmetric encryption"],
    explain: "A salt is a unique random value added to each password before hashing, so identical passwords yield different hashes and precomputed rainbow tables fail. Key stretching (PBKDF2, bcrypt) repeats the work to slow brute force. Tokenization swaps sensitive data for a token with the mapping held in a vault, whereas masking only hides part of the value (****1234). A digital signature (hash encrypted with the signer's private key) gives integrity, authentication and non-repudiation, and steganography conceals data inside another file." },

  { id: "web-log-sqli", d: 2, type: "select", title: "Spot SQL injection in a web log",
    prompt: "Review the web server access log. Select every request that is a SQL injection attempt.",
    context: "203.0.113.45 - - [12/Mar/2026:10:02:11] \"GET /products.php?id=42 HTTP/1.1\" 200 5120\n203.0.113.45 - - [12/Mar/2026:10:02:19] \"GET /products.php?id=42' OR '1'='1 HTTP/1.1\" 200 98304\n198.51.100.9 - - [12/Mar/2026:10:03:02] \"GET /search?q=<script>alert(1)</script> HTTP/1.1\" 200 2210\n203.0.113.45 - - [12/Mar/2026:10:03:40] \"GET /products.php?id=42 UNION SELECT username,password FROM users-- HTTP/1.1\" 500 312\n198.51.100.23 - - [12/Mar/2026:10:04:15] \"GET /download?file=../../../../etc/passwd HTTP/1.1\" 403 199\n192.0.2.10 - - [12/Mar/2026:10:04:51] \"POST /login HTTP/1.1\" 302 0\n203.0.113.45 - - [12/Mar/2026:10:05:30] \"GET /products.php?id=42;WAITFOR DELAY '0:0:5'-- HTTP/1.1\" 200 5120",
    options: [
      "Line 1: GET /products.php?id=42",
      "Line 2: GET /products.php?id=42' OR '1'='1",
      "Line 3: GET /search?q=<script>alert(1)</script>",
      "Line 4: GET /products.php?id=42 UNION SELECT username,password FROM users--",
      "Line 5: GET /download?file=../../../../etc/passwd",
      "Line 6: POST /login",
      "Line 7: GET /products.php?id=42;WAITFOR DELAY '0:0:5'--"
    ],
    answers: [1, 3, 6],
    explain: "Lines 2, 4 and 7 inject SQL syntax into the id parameter: a tautology (' OR '1'='1) that returned a much larger response, a UNION query trying to pull credentials, and a time-based blind test (WAITFOR DELAY). Line 3 is cross-site scripting, line 5 is directory traversal, and lines 1 and 6 are normal traffic. Parameterized queries and input validation are the primary fixes, with a WAF as an extra layer." },

  { id: "attack-indicators-match", d: 2, type: "match", title: "Match indicators to attacks",
    prompt: "A SOC analyst documents several observations. Match each observation to the most likely attack.",
    pairs: [
      ["400 different accounts each have one failed login using the password Winter2026!", "Password spraying"],
      ["One account records 5,000 failed logins in ten minutes", "Brute force"],
      ["Many logins using username and password pairs that appeared in another site's breach dump", "Credential stuffing"],
      ["A user authenticates from Chicago and then from Singapore 20 minutes later", "Impossible travel"],
      ["An industry forum the target's engineers visit is compromised to serve malware", "Watering hole"],
      ["Someone registers examp1e.com, one character off the company's domain", "Typosquatting"]
    ],
    extra: ["Pharming", "Vishing"],
    explain: "Password spraying tries one or a few common passwords across many accounts to stay under lockout thresholds, while brute force hammers a single account. Credential stuffing reuses real pairs stolen elsewhere, which is why password reuse is dangerous. Impossible travel is an account-compromise indicator, a watering hole compromises a site the victims already trust, and typosquatting relies on look-alike domains. Pharming redirects users through DNS or hosts-file poisoning, and vishing is voice phishing." },

  { id: "firewall-rule-review", d: 3, type: "select", title: "Review a firewall rule base",
    prompt: "You are reviewing the perimeter firewall for a three-zone network (internet, DMZ 10.0.10.0/24, internal). Select every rule that violates least privilege or allows an insecure service and should be removed or tightened.",
    context: "Rule  Action  Source          Destination   Port/Proto  Comment\n1     ALLOW   any             10.0.10.20    443/tcp     Public web server (DMZ)\n2     ALLOW   any             10.0.10.20    22/tcp      Admin SSH to web server\n3     ALLOW   10.0.50.0/24    10.0.20.15    1433/tcp    App servers to SQL DB\n4     ALLOW   any             10.0.20.15    3389/tcp    Vendor remote support to DB\n5     ALLOW   10.0.30.0/24    any           23/tcp      Legacy switch management\n6     ALLOW   10.0.99.5       10.0.20.15    22/tcp      Jump host to DB server\n7     DENY    any             any           any         Implicit deny",
    options: [
      "Rule 1: any to web server on 443/tcp",
      "Rule 2: any to web server on 22/tcp",
      "Rule 3: app subnet to database on 1433/tcp",
      "Rule 4: any to database on 3389/tcp",
      "Rule 5: management subnet to any on 23/tcp",
      "Rule 6: jump host to database on 22/tcp",
      "Rule 7: deny all"
    ],
    answers: [1, 3, 4],
    explain: "Rule 2 exposes SSH on the web server to the entire internet; admin access should come only from the jump host or a VPN. Rule 4 is worse, exposing RDP on an internal database server to anyone, and vendor access should go through a VPN or jump host with MFA. Rule 5 permits Telnet, which sends credentials in cleartext, to any destination; replace it with SSH to the specific switch addresses. Rules 1, 3 and 6 are scoped to the needed source, destination and port, and the final deny-all is exactly what an implicit deny should be." },

  { id: "backup-restore-fill", d: 3, type: "fill", title: "Calculate backup restore sets and data loss",
    prompt: "Backups run nightly at 23:00: a full backup on Sunday and incremental backups Monday through Saturday. The file server fails on Thursday at 15:00. Fill in:",
    fields: [
      { label: "Backup sets needed to restore (incremental scheme)", answers: ["4", "four"] },
      { label: "Backup sets needed if differential backups were used instead", answers: ["2", "two"] },
      { label: "Hours of data lost since the last backup", answers: ["16", "16 hours", "16h"] }
    ],
    explain: "Thursday's 23:00 backup has not run yet, so the last good backup is Wednesday night. With incrementals you restore Sunday's full plus Monday, Tuesday and Wednesday incrementals (4 sets), because each incremental only holds changes since the previous backup. A differential holds everything since the last full, so you need only Sunday's full plus Wednesday's differential (2 sets). Wednesday 23:00 to Thursday 15:00 is 16 hours of lost data; if the RPO is shorter than that, backups must run more often." },

  { id: "ransomware-ir-order", d: 4, type: "order", title: "Order a ransomware incident response",
    prompt: "Put these incident response activities for a ransomware event in the correct order.",
    steps: [
      "Maintain the IR plan, contact list and a tested offline backup set",
      "EDR alerts on mass file renames with a .lock extension on file server FS01",
      "Review logs to confirm ransomware, scope affected hosts and find the first infected machine",
      "Isolate FS01 and the infected workstation from the network",
      "Remove the malware and disable the compromised account used to spread it",
      "Restore files from clean backups and monitor the hosts before returning them to production",
      "Hold a post-incident review and update the ransomware playbook"
    ],
    explain: "The SY0-701 process is preparation, detection, analysis, containment, eradication, recovery and lessons learned. Containment comes before eradication so the malware cannot keep spreading while you clean up, and recovery restores from backups you have verified are clean. The lessons-learned meeting feeds improvements back into preparation, closing the loop." },

  { id: "ssh-spray-log", d: 4, type: "select", title: "Find password spraying in an auth log",
    prompt: "Review the SSH authentication log from a Linux server. Select every line that is part of a password-spraying attempt.",
    context: "Mar 12 09:14:02 web01 sshd[811]: Failed password for alice from 203.0.113.7 port 50122 ssh2\nMar 12 09:14:05 web01 sshd[812]: Failed password for bob from 203.0.113.7 port 50131 ssh2\nMar 12 09:14:07 web01 sshd[815]: Accepted publickey for deploy from 10.0.5.20 port 40211 ssh2\nMar 12 09:14:09 web01 sshd[816]: Failed password for carol from 203.0.113.7 port 50140 ssh2\nMar 12 09:14:12 web01 sshd[818]: Failed password for dave from 10.0.8.44 port 51002 ssh2\nMar 12 09:14:14 web01 sshd[819]: Failed password for erin from 203.0.113.7 port 50155 ssh2\nMar 12 09:14:20 web01 sshd[821]: Accepted password for dave from 10.0.8.44 port 51010 ssh2",
    options: [
      "Line 1: Failed password for alice from 203.0.113.7",
      "Line 2: Failed password for bob from 203.0.113.7",
      "Line 3: Accepted publickey for deploy from 10.0.5.20",
      "Line 4: Failed password for carol from 203.0.113.7",
      "Line 5: Failed password for dave from 10.0.8.44",
      "Line 6: Failed password for erin from 203.0.113.7",
      "Line 7: Accepted password for dave from 10.0.8.44"
    ],
    answers: [0, 1, 3, 5],
    explain: "One external address (203.0.113.7) fails once against each of several different accounts within seconds, which is the signature of password spraying: many users, few attempts each, to avoid lockout. Dave's single failure followed by a success from an internal address looks like a typo, and the deploy key login is normal automation. Mitigations include MFA, blocking the source, disabling SSH password logins in favor of keys, and alerting on failures across many accounts from one IP." },

  { id: "secure-protocols-match", d: 4, type: "match", title: "Replace insecure protocols",
    prompt: "An audit flagged insecure protocols. Match each insecure protocol or need to its secure replacement.",
    pairs: [
      ["Telnet for remote shell access", "SSH"],
      ["FTP for file transfers", "SFTP"],
      ["HTTP for the customer portal", "HTTPS"],
      ["LDAP on port 389 for directory queries", "LDAPS"],
      ["SNMPv2c with community strings", "SNMPv3"],
      ["DNS responses that can be forged or poisoned", "DNSSEC"]
    ],
    extra: ["TFTP", "SSL 3.0"],
    explain: "SSH (22) encrypts remote shell sessions that Telnet sends in cleartext, and SFTP runs file transfer over SSH. HTTPS wraps HTTP in TLS, LDAPS wraps LDAP in TLS on port 636, and SNMPv3 adds authentication and encryption instead of plaintext community strings. DNSSEC signs DNS records so resolvers can verify integrity and origin, though it does not encrypt queries. TFTP has no authentication at all and SSL 3.0 is deprecated, so neither is a secure choice." },

  { id: "ale-calc-fill", d: 5, type: "fill", title: "Calculate annualized loss expectancy",
    prompt: "A customer database is valued at $120,000. A breach would expose 25% of its value, and one is expected every two years. A proposed DLP control costs $20,000 per year and would reduce the expected rate to once every ten years. Fill in:",
    fields: [
      { label: "Single loss expectancy (SLE) in dollars", answers: ["30000", "30,000", "$30000", "$30,000"] },
      { label: "Annualized rate of occurrence (ARO)", answers: ["0.5", ".5", "1/2"] },
      { label: "Annualized loss expectancy (ALE) in dollars", answers: ["15000", "15,000", "$15000", "$15,000"] },
      { label: "Is the DLP control cost-justified? (yes or no)", answers: ["no"] }
    ],
    explain: "SLE = asset value x exposure factor = $120,000 x 0.25 = $30,000. Once every two years is an ARO of 0.5, so ALE = $30,000 x 0.5 = $15,000. With the control, ARO drops to 0.1 and ALE to $3,000, saving $12,000 a year, which is less than the $20,000 annual cost, so the control is not cost-justified on these numbers. The organization might accept the risk, transfer it with insurance, or find a cheaper mitigation." },

  { id: "agreements-match", d: 5, type: "match", title: "Match third-party agreements",
    prompt: "A company is onboarding a managed service provider. Match each need to the agreement type that covers it.",
    pairs: [
      ["Guarantee 99.9% monthly uptime, with service credits if it is missed", "SLA"],
      ["List the deliverables, timeline and cost for one migration project", "SOW"],
      ["Set the overall legal terms that will govern all future work orders", "MSA"],
      ["Record a mutual intent to cooperate that is generally not legally binding", "MOU"],
      ["Forbid the provider from disclosing the company's confidential information", "NDA"]
    ],
    extra: ["BPA", "MOA"],
    explain: "A service-level agreement defines measurable performance targets and penalties. A master service agreement sets the umbrella terms once, and each statement of work under it describes a specific project's scope, deliverables and cost. A memorandum of understanding expresses intent without strong legal obligation (a memorandum of agreement is more formal and binding), and a non-disclosure agreement protects confidential data. A business partners agreement covers partnership terms like profit sharing, not these needs." }
]);
