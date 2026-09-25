/* Performance-based practice items (PBQs) for AZ-104. Self-contained text simulations answered in the browser. */
CertHub.addPbqs("az-104", [
  { id: "rbac-role-match", d: 1, type: "match", title: "Match requirements to built-in Azure roles",
    prompt: "Each requirement describes what one person must be able to do, following least privilege. Match each requirement to the built-in role you should assign.",
    pairs: [
      ["Create and manage every resource in RG-Web, but never grant access to anyone else", "Contributor"],
      ["Manage role assignments on the subscription without creating or changing resources", "User Access Administrator"],
      ["Read blob contents in one storage account with Entra ID sign-in, without managing the account", "Storage Blob Data Reader"],
      ["Create, resize and restart VMs, but not manage the virtual network or storage accounts they use", "Virtual Machine Contributor"],
      ["View every resource and its settings in the subscription and change nothing", "Reader"]
    ],
    extra: ["Owner", "Storage Account Contributor"],
    explain: "Contributor manages resources but has no Microsoft.Authorization write rights, so it cannot assign roles; User Access Administrator is the opposite, managing access only. Storage Blob Data Reader is a data-plane role, while Reader and Storage Account Contributor act on the management plane. Virtual Machine Contributor covers VMs but not the VNet or storage account they connect to. Owner would satisfy several rows but breaks least privilege because it can both manage resources and grant access."
  },
  { id: "rbac-effective-delete", d: 1, type: "select", title: "Read role assignments to find effective access",
    prompt: "VM vm-web01 is in resource group RG-Prod in subscription Sub-Prod, which sits under management group mg-corp. There are no locks or deny assignments. Select every user who can delete vm-web01 with their current role assignments.",
    context: "Principal  Role                                   Scope\n---------  -------------------------------------  -----------------------------------------------\nalice      Reader                                 /subscriptions/Sub-Prod\nbob        Contributor                            /subscriptions/Sub-Prod/resourceGroups/RG-Prod\ncarol      Owner                                  /subscriptions/Sub-Prod/resourceGroups/RG-Dev\ndave       Virtual Machine Contributor            /providers/Microsoft.Management/managementGroups/mg-corp\nerin       Virtual Machine Administrator Login    .../RG-Prod/providers/Microsoft.Compute/virtualMachines/vm-web01\nfrank      User Access Administrator              /subscriptions/Sub-Prod\ngrace      Storage Account Contributor            /subscriptions/Sub-Prod/resourceGroups/RG-Prod\nheidi      Owner                                  /subscriptions/Sub-Prod",
    options: ["alice", "bob", "carol", "dave", "erin", "frank", "grace", "heidi"],
    answers: [1, 3, 7],
    explain: "Role assignments are inherited down the hierarchy (management group, subscription, resource group, resource), so bob (Contributor on RG-Prod), dave (Virtual Machine Contributor on the parent management group) and heidi (Owner on the subscription) can all delete the VM. carol's Owner role is scoped to a different resource group, alice only reads, and erin's role is a data action for signing in to the VM. frank could grant himself a role, but with his current assignment he can only manage access, and grace's role covers storage accounts only."
  },
  { id: "policy-effect-fill", d: 1, type: "fill", title: "Choose the Azure Policy effect",
    prompt: "The governance team wrote five requirements. For each one, type the Azure Policy effect you would put in the policy definition's \"then\" block.",
    context: "1. New VMs must be blocked if they use a size outside the approved list.\n2. Storage accounts that allow anonymous blob access must be reported as non-compliant, but nothing may be blocked.\n3. Every Key Vault without a diagnostic setting must automatically get one that sends logs to law-central.\n4. A CostCenter tag must be added or corrected on existing resources through a remediation task.\n5. Resources tagged protect=true must not be deletable, even by Owners.",
    fields: [
      { label: "Requirement 1", answers: ["Deny"] },
      { label: "Requirement 2", answers: ["Audit"] },
      { label: "Requirement 3", answers: ["DeployIfNotExists", "Deploy If Not Exists", "DINE"] },
      { label: "Requirement 4", answers: ["Modify"] },
      { label: "Requirement 5", answers: ["DenyAction", "Deny Action"] }
    ],
    explain: "Deny rejects a create or update request that breaks the rule, while Audit only records non-compliance. DeployIfNotExists deploys a related resource, such as a diagnostic setting, when it is missing. Modify adds, replaces or removes tags and can fix existing resources through a remediation task; Append cannot remediate existing resources. DenyAction is the effect that blocks actions such as delete on matching resources, whereas Deny evaluates create and update requests."
  },
  { id: "sas-token-read", d: 2, type: "select", title: "Interpret a SAS token",
    prompt: "A developer shares this SAS token, which is appended to requests for storage account stcontosodata. Select every statement that is true about it.",
    context: "?sv=2022-11-02&ss=b&srt=co&sp=rl&st=2026-09-25T09:00:00Z&se=2026-10-01T18:00:00Z&spr=https&sip=198.51.100.0-198.51.100.255&sig=<signature>",
    options: [
      "It is an account SAS, because it contains the ss and srt parameters",
      "It grants read and list permissions",
      "It allows clients to upload new blobs",
      "It can be used over plain HTTP as well as HTTPS",
      "It only works for clients whose source IP is in 198.51.100.0-198.51.100.255",
      "It can be revoked by deleting a stored access policy on the container",
      "It also grants access to Azure Files shares in the account",
      "It stops working at 18:00 UTC on October 1, 2026"
    ],
    answers: [0, 1, 4, 7],
    explain: "ss (signed services) and srt (signed resource types) appear only in an account SAS; ss=b limits it to Blob storage, so Files is not included. sp=rl grants read and list, with no write or create permission for uploads, and spr=https forbids plain HTTP. sip restricts the client IP range and se sets the expiry in UTC. Account SAS tokens cannot be tied to a stored access policy, so the only ways to revoke this one early are to regenerate the key that signed it or wait for it to expire."
  },
  { id: "lifecycle-policy-fill", d: 2, type: "fill", title: "Predict lifecycle management results",
    prompt: "The storage account's default access tier is Hot, and blobs were uploaded without setting a tier. After the lifecycle policy below has run, fill in the access tier of each block blob.",
    context: "{\n  \"rules\": [{\n    \"name\": \"logs-tiering\",\n    \"enabled\": true,\n    \"type\": \"Lifecycle\",\n    \"definition\": {\n      \"filters\": { \"blobTypes\": [\"blockBlob\"], \"prefixMatch\": [\"logs/\"] },\n      \"actions\": { \"baseBlob\": {\n        \"tierToCool\":    { \"daysAfterModificationGreaterThan\": 30 },\n        \"tierToArchive\": { \"daysAfterModificationGreaterThan\": 180 },\n        \"delete\":        { \"daysAfterModificationGreaterThan\": 365 }\n      } }\n    }\n  }]\n}",
    fields: [
      { label: "logs/app/2026-09-05.log, last modified 20 days ago", answers: ["Hot"] },
      { label: "logs/app/2026-08-11.log, last modified 45 days ago", answers: ["Cool"] },
      { label: "logs/app/2026-03-09.log, last modified 200 days ago", answers: ["Archive"] },
      { label: "images/banner.png, last modified 400 days ago", answers: ["Hot"] }
    ],
    explain: "prefixMatch starts with the container name, so the rule only applies to blobs in the logs container. A logs blob stays Hot until it is more than 30 days old, moves to Cool after 30 days and to Archive after 180 days, and is deleted after 365 days. The blob in the images container does not match the filter, so it keeps the account default tier, Hot, however old it is."
  },
  { id: "slot-swap-order", d: 3, type: "order", title: "Release a web app through a staging slot",
    prompt: "A web app runs on a Basic App Service plan. You must release a new version with no downtime and be able to roll back quickly. Put the steps in the correct order.",
    steps: [
      "Scale the App Service plan up to the Standard tier",
      "Add a deployment slot named staging to the web app",
      "Deploy the new build to the staging slot",
      "Browse to the staging slot's own host name and run smoke tests",
      "Swap the staging slot with production",
      "If errors appear, swap the slots again to restore the previous version"
    ],
    explain: "Deployment slots need the Standard tier or higher, so the plan must be scaled up before a slot can exist. You deploy to the slot and test it at its own host name, then swap, which warms up the instances before production traffic moves. Because the previous version is now in the staging slot, swapping again is the quick rollback."
  },
  { id: "vm-billing-select", d: 3, type: "select", title: "Find VMs that still incur compute charges",
    prompt: "Finance asks which VMs are still billed for compute. Using the output below, select every VM that still incurs compute charges.",
    context: "$ az vm list -d --query \"[].{Name:name, PowerState:powerState}\" -o table\nName        PowerState\n----------  --------------\nvm-web01    VM running\nvm-web02    VM stopped\nvm-app01    VM deallocated\nvm-db01     VM running\nvm-jump01   VM stopped\nvm-test01   VM deallocated",
    options: ["vm-web01", "vm-web02", "vm-app01", "vm-db01", "vm-jump01", "vm-test01"],
    answers: [0, 1, 3, 4],
    explain: "A VM that is shut down from inside the guest OS, or stopped without deallocating, shows 'VM stopped' and still holds its compute allocation, so it is still billed. Only 'VM deallocated' (portal Stop, az vm deallocate or Stop-AzVM) releases the hardware and stops compute billing. Managed disks, and any static public IPs, are billed in every state."
  },
  { id: "avset-domains-fill", d: 3, type: "fill", title: "Work out availability set impact",
    prompt: "Twelve identical VMs are deployed into one availability set configured with 3 fault domains and 5 update domains. Azure spreads the VMs evenly (round robin) across the domains. Fill in:",
    fields: [
      { label: "Largest number of VMs rebooted at the same time during planned maintenance of one update domain", answers: ["3"] },
      { label: "Number of VMs lost if the hardware in one fault domain fails", answers: ["4"] },
      { label: "VM connectivity SLA for two or more VMs in an availability set (percent)", answers: ["99.95", "99.95%"] }
    ],
    explain: "Twelve VMs over 5 update domains gives 3, 3, 2, 2 and 2, so planned maintenance of one update domain takes at most 3 VMs offline at once. Twelve VMs over 3 fault domains puts 4 in each, so a rack failure removes 4 of them. Availability sets carry a 99.95% SLA; spreading VMs across availability zones raises it to 99.99% and also protects against losing a whole datacenter."
  },
  { id: "nsg-flow-select", d: 4, type: "select", title: "Evaluate NSG rules for inbound flows",
    prompt: "VNet-Prod uses 10.10.0.0/16. The NSG below is associated with subnet 10.10.2.0/24, and the VM at 10.10.2.4 has no NIC-level NSG. Select every inbound flow that will be ALLOWED to reach 10.10.2.4.",
    context: "Priority  Name                  Port  Protocol  Source          Destination     Action\n100       Allow-HTTPS           443   TCP       Internet        Any             Allow\n200       Deny-RDP              3389  TCP       Any             Any             Deny\n300       Allow-RDP-Admins      3389  TCP       203.0.113.0/24  Any             Allow\n400       Allow-SQL-From-Web    1433  TCP       10.10.1.0/24    10.10.2.0/24    Allow\n65000     AllowVnetInBound      Any   Any       VirtualNetwork  VirtualNetwork  Allow\n65001     AllowAzureLoadBalancerInBound Any Any AzureLoadBalancer Any           Allow\n65500     DenyAllInBound        Any   Any       Any             Any             Deny",
    options: [
      "TCP 443 from 198.51.100.20",
      "TCP 3389 from 203.0.113.10",
      "TCP 1433 from 10.10.1.5",
      "TCP 22 from 10.10.3.7",
      "TCP 22 from 198.51.100.20",
      "TCP 80 from 198.51.100.20",
      "TCP 1433 from 10.10.3.7"
    ],
    answers: [0, 2, 3, 6],
    explain: "Rules are processed from the lowest priority number, and processing stops at the first match. HTTPS from the internet matches rule 100, and RDP from the admin range is denied by rule 200 before rule 300 is ever evaluated. SQL from 10.10.1.5 matches rule 400. Traffic from 10.10.3.7 is inside the VNet, so AllowVnetInBound at 65000 allows both SSH and SQL from it, because rule 400 allows traffic but denies nothing. SSH and HTTP from the internet fall through to DenyAllInBound."
  },
  { id: "subnet-azure-fill", d: 4, type: "fill", title: "Plan addresses in an Azure subnet",
    prompt: "You create subnet snet-app with the prefix 10.20.4.0/26 in a VNet that uses 10.20.0.0/16. Fill in the values as Azure assigns them.",
    fields: [
      { label: "First IP address that can be assigned to a VM", answers: ["10.20.4.4"] },
      { label: "Last IP address that can be assigned to a VM", answers: ["10.20.4.62"] },
      { label: "Number of usable addresses in the subnet", answers: ["59"] },
      { label: "Smallest prefix allowed for AzureBastionSubnet", answers: ["/26", "26"] }
    ],
    explain: "A /26 has 64 addresses, 10.20.4.0 to 10.20.4.63. Azure reserves five in every subnet: the network address (.0), the default gateway (.1), two for Azure DNS (.2 and .3) and the broadcast address (.63). That leaves .4 through .62, which is 59 usable addresses. Azure Bastion requires a subnet named AzureBastionSubnet with a prefix of /26 or larger."
  },
  { id: "netwatcher-match", d: 4, type: "match", title: "Match troubleshooting needs to Network Watcher tools",
    prompt: "Match each troubleshooting need to the Azure tool that answers it most directly.",
    pairs: [
      ["Which NSG rule allows or denies TCP 1433 from VM1 to VM2", "IP flow verify"],
      ["Which route table and next hop type are used for traffic from VM1 to 0.0.0.0/0", "Next hop"],
      ["The combined rules from the subnet NSG and NIC NSG applied to a network interface", "Effective security rules"],
      ["Latency and reachability between a VM and an endpoint, tracked continuously over days", "Connection monitor"],
      ["A capture file of the traffic on one VM for analysis in Wireshark", "Packet capture"],
      ["Charts of top talkers and blocked flows built from flow log data", "Traffic analytics"]
    ],
    extra: ["Azure Advisor", "Activity log"],
    explain: "IP flow verify tests one 5-tuple and names the NSG rule that decided it, while Next hop reports the route in effect and its next hop type, so it shows why traffic misses a firewall. Effective security rules merge subnet and NIC NSGs for one NIC. Connection monitor watches reachability and latency over time, packet capture records raw packets, and traffic analytics summarizes flow logs. Advisor gives best-practice recommendations and the Activity log records control-plane operations; neither diagnoses packet flow."
  },
  { id: "asr-dr-order", d: 5, type: "order", title: "Run the Site Recovery disaster recovery lifecycle",
    prompt: "Put these Azure Site Recovery tasks for protecting Azure VMs in another region in the correct order, from first setup to returning to the primary region.",
    steps: [
      "Enable replication of the VMs to the secondary region",
      "Run a test failover into an isolated virtual network",
      "Clean up the test failover",
      "During a primary region outage, fail over the VMs to the secondary region",
      "Commit the failover",
      "Re-protect the VMs so replication runs from the secondary region back to the primary",
      "Fail back to the primary region"
    ],
    explain: "Replication must reach a protected state before any failover. A test failover proves the plan without touching production or replication, and cleaning it up removes the test VMs. In a real outage you fail over and then commit, which confirms the recovery point you chose. Re-protect reverses the direction of replication, which is required before you can fail back to the original region."
  },
  { id: "kql-heartbeat-fill", d: 5, type: "fill", title: "Complete a KQL query for missing heartbeats",
    prompt: "You need to list computers that sent a heartbeat in the last 24 hours but have not reported in the last 15 minutes. Fill in the three blanks in the query.",
    context: "Heartbeat\n| ____(1)____ TimeGenerated > ago(24h)\n| ____(2)____ LastSeen = ____(3)____(TimeGenerated) by Computer\n| where LastSeen < ago(15m)\n| order by LastSeen asc",
    fields: [
      { label: "Blank 1 (filter rows)", answers: ["where"] },
      { label: "Blank 2 (group and aggregate)", answers: ["summarize"] },
      { label: "Blank 3 (aggregation function)", answers: ["max"] }
    ],
    explain: "where filters rows, so the first line keeps only the last 24 hours of heartbeats. summarize with max(TimeGenerated) by Computer returns one row per computer with its most recent heartbeat, and the next where keeps computers whose latest heartbeat is older than 15 minutes. Using min would return the oldest heartbeat instead, and count would not tell you when a machine last reported."
  }
]);
