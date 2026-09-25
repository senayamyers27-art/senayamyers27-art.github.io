CertHub.addPbqs("sc-500", [
  {
    id: "policy-effects-match", d: 1, type: "match",
    title: "Match Azure Policy effects to their behavior",
    prompt: "Match each Azure Policy effect to what it does when a resource is evaluated.",
    pairs: [
      ["Deny", "Blocks a create or update request that violates the rule"],
      ["Audit", "Marks a non-compliant resource but still allows the change"],
      ["DeployIfNotExists", "Deploys a related resource when it is missing, using a remediation managed identity"],
      ["Modify", "Adds, updates or removes properties such as tags on the resource itself"]
    ],
    extra: ["Encrypts the resource's data with a customer-managed key", "Grants a user a role assignment at the resource scope"],
    explain: "Deny stops non-compliant writes while existing resources are only flagged; Audit permits the change and records non-compliance. DeployIfNotExists and Modify both need a managed identity on the assignment: DeployIfNotExists provisions a separate resource (for example a diagnostic setting), while Modify changes properties on the evaluated resource. Neither policy encrypts data nor grants RBAC roles."
  },
  {
    id: "pim-eligible-select", d: 1, type: "select",
    title: "Identify true statements about PIM eligible assignments",
    prompt: "Select every statement that is true about a Privileged Identity Management eligible role assignment.",
    options: [
      "The user must activate the role before they can use its permissions",
      "Activation can be gated with MFA, a written justification and approval",
      "Activation grants the role only for a limited, time-boxed window",
      "An eligible assignment gives standing, permanent access with no activation",
      "Being eligible removes the need for the user to authenticate at all"
    ],
    answers: [0, 1, 2],
    explain: "Eligible assignments hold no standing privilege: the user activates the role on demand, and activation can require MFA, justification and approval for a limited duration. That is the opposite of an active assignment, which grants the role permanently or for a set window with no action. Eligibility never removes authentication; if anything it adds MFA at activation."
  },
  {
    id: "net-services-match", d: 2, type: "match",
    title: "Match Azure network security features to their role",
    prompt: "Match each Azure networking feature to what it does.",
    pairs: [
      ["Application security group", "Groups VM NICs by role so NSG rules can reference them instead of IP addresses"],
      ["Private endpoint", "Gives a PaaS resource a private IP inside your virtual network"],
      ["Service tag", "Represents a Microsoft service's address ranges and updates automatically"],
      ["User-defined route", "Overrides system routes to send traffic to a next hop such as a firewall"],
      ["Network security group", "Filters traffic with allow and deny rules processed in priority order"]
    ],
    extra: ["Decrypts outbound TLS and applies IDPS signatures"],
    explain: "Application security groups label NICs by workload role so rules stay IP-free, while service tags stand in for Microsoft-managed ranges. A private endpoint projects a PaaS service into the VNet on a private IP, a UDR forces traffic (for example 0.0.0.0/0) to a firewall next hop, and the NSG evaluates 5-tuple rules by priority. TLS inspection and IDPS are Azure Firewall Premium features, not any of these."
  },
  {
    id: "sql-private-order", d: 2, type: "order",
    title: "Lock Azure SQL down to a private endpoint",
    prompt: "Put these steps in the correct order to make an Azure SQL Database reachable only over a private endpoint.",
    steps: [
      "Create a private endpoint for the SQL logical server in the application subnet",
      "Create a privatelink.database.windows.net private DNS zone",
      "Link the private DNS zone to the virtual network",
      "Disable public network access on the SQL logical server",
      "Verify the server name now resolves to the private IP with nslookup"
    ],
    explain: "Create the private endpoint first so the server has a private IP, then stand up and link the privatelink.database.windows.net zone so the name resolves privately across the VNet and peered or on-premises networks. Only after the private path works should you disable public network access, otherwise you can lock yourself out. A final nslookup confirms the FQDN returns the private IP rather than the public one."
  },
  {
    id: "nsg-eval-select", d: 2, type: "select",
    title: "Read the NSG rules and pick the allowed flows",
    prompt: "Given the inbound NSG rules below, select every flow that is ALLOWED.",
    context: "Priority 100  Allow  TCP 443   Source: Internet          Dest: web ASG\nPriority 200  Allow  TCP 1433  Source: web ASG           Dest: db ASG\nPriority 300  Deny   TCP 3389  Source: Internet          Dest: web ASG\nPriority 4096 Deny   *         Source: any (DenyAllInBound default)",
    options: [
      "HTTPS (TCP 443) from the Internet to a web server",
      "SQL (TCP 1433) from a web server to a database server",
      "RDP (TCP 3389) from the Internet to a web server",
      "SSH (TCP 22) from the Internet to a database server",
      "SQL (TCP 1433) from the Internet to a database server"
    ],
    answers: [0, 1],
    explain: "NSG rules are evaluated by ascending priority and the first match wins. Rule 100 permits inbound 443 to the web tier and rule 200 permits web-to-db on 1433, so those two flows are allowed. RDP is explicitly denied by rule 300, and the SSH and Internet-to-db flows match nothing until the DenyAllInBound default at 4096 drops them."
  },
  {
    id: "subnet-fill", d: 2, type: "fill",
    title: "Subnet a /26 for a database tier",
    prompt: "A database VM is assigned 198.51.100.130/26. Fill in the addressing details.",
    fields: [
      { label: "Network address", answers: ["198.51.100.128"] },
      { label: "Broadcast address", answers: ["198.51.100.191"] },
      { label: "First usable host address", answers: ["198.51.100.129"] },
      { label: "Number of usable host addresses", answers: ["62"] }
    ],
    explain: "A /26 has 6 host bits, so blocks are 64 addresses wide: .0, .64, .128, .192. The address .130 falls in the .128 block, making 198.51.100.128 the network and 198.51.100.191 the broadcast. Usable hosts are the 62 in between (64 minus the network and broadcast), the first being 198.51.100.129."
  },
  {
    id: "vm-protection-match", d: 3, type: "match",
    title: "Match compute protections to what they do",
    prompt: "Match each VM or compute security feature to the protection it provides.",
    pairs: [
      ["Trusted launch", "Provides secure boot, a vTPM and boot integrity monitoring"],
      ["Encryption at host", "Encrypts temp disks and caches at the host with no in-guest agent"],
      ["Azure Bastion", "Brokers RDP and SSH over TLS without a public IP on the VM"],
      ["Just-in-time VM access", "Keeps management ports closed and opens them temporarily on approved request"],
      ["Azure Disk Encryption", "Uses BitLocker or DM-Crypt inside the guest operating system"]
    ],
    extra: ["Scans container images for vulnerabilities before they run"],
    explain: "Trusted launch hardens the boot chain against rootkits, while the two encryption options differ by layer: encryption at host is agentless and covers temp disks and caches, whereas Azure Disk Encryption runs BitLocker or DM-Crypt inside the guest. Bastion removes the need for public management IPs, and JIT keeps ports closed until an approved, time-limited request opens them. Image scanning belongs to Defender for Containers."
  },
  {
    id: "secure-ai-select", d: 3, type: "select",
    title: "Secure an internet-facing Foundry chatbot",
    prompt: "A generative AI chatbot built on Microsoft Foundry is exposed to the internet. Select every appropriate control to secure it.",
    options: [
      "Enable Defender for AI services threat protection to alert on jailbreak and prompt-injection attempts",
      "Apply Azure AI Content Safety content filters and Prompt Shields on the deployment",
      "Front the model with an API Management AI gateway using managed-identity auth and token limits",
      "Disable all logging so prompts and completions are never recorded",
      "Embed the model's API key in the client-side JavaScript so the browser can call it directly"
    ],
    answers: [0, 1, 2],
    explain: "Defender for AI services surfaces jailbreak and prompt-injection alerts, content filters and Prompt Shields screen prompts and outputs, and an APIM AI gateway centralizes authentication and enforces per-consumer token limits. Disabling logging destroys the audit trail you need to detect and investigate attacks. Exposing an API key in client-side code hands the credential to every user and must never be done."
  },
  {
    id: "spray-vs-brute-select", d: 4, type: "select",
    title: "Distinguish password spraying in the sign-in logs",
    prompt: "Select every log characteristic that indicates PASSWORD SPRAYING rather than a brute-force attack on a single account.",
    context: "09:01:02 UPN=alice@example.com IP=203.0.113.50 Result=50126 (invalid username or password)\n09:01:05 UPN=bob@example.com   IP=203.0.113.50 Result=50126\n09:01:09 UPN=carol@example.com IP=203.0.113.50 Result=50126\n09:01:14 UPN=dave@example.com  IP=203.0.113.50 Result=50126\n(50+ distinct accounts, 1-2 failures each, all from 203.0.113.50)",
    options: [
      "Many distinct usernames are targeted from a single source address",
      "Only one or two attempts hit each account, staying under lockout thresholds",
      "Hundreds of attempts land against one username within seconds",
      "A single common weak password appears to be tried once across all the accounts",
      "Successful sign-in events (Result 0) dominate the log"
    ],
    answers: [0, 1, 3],
    explain: "Password spraying trades depth for breadth: it tries a few common passwords across many accounts, so the log shows one source hitting dozens of distinct users with only one or two failures each to dodge lockout. High-volume attempts against a single username are the brute-force pattern instead, and a log dominated by successes would signal a different problem, not spraying."
  },
  {
    id: "ir-order", d: 4, type: "order",
    title: "Handle a Sentinel account-compromise incident",
    prompt: "A Sentinel incident flags a compromised user account. Put these response steps in the correct order.",
    steps: [
      "Triage the incident and confirm it is a true positive",
      "Contain the threat by disabling the compromised account and revoking its sessions",
      "Eradicate persistence and reset the account's credentials",
      "Recover affected resources and restore normal operations",
      "Document lessons learned and tune the analytics rule to cut future noise"
    ],
    explain: "Incident response runs triage first to confirm a real detection, then containment to stop the spread by disabling the account and revoking tokens before the attacker acts further. Eradication removes persistence and resets credentials, recovery returns services to normal, and the post-incident review captures lessons learned and tunes the rule. Skipping straight to recovery without containment lets the attacker keep working."
  }
]);
