CertHub.addPbqs("az-900", [
  { id: "service-type-match", d: 1, type: "match", title: "Match scenarios to cloud service types",
    prompt: "A consulting firm has four new workloads. Match each scenario to the cloud service type that fits it best.",
    pairs: [
      ["Move 40 existing Windows servers to Azure unchanged, keeping full control of the OS", "Infrastructure as a service (IaaS)"],
      ["Developers deploy a web API from source control and never patch an operating system", "Platform as a service (PaaS)"],
      ["Staff need ready-to-use email, calendars and document sharing with no development", "Software as a service (SaaS)"],
      ["Resize each uploaded photo, running code only when a file arrives and paying per execution", "Serverless compute (Azure Functions)"]
    ],
    extra: ["Private cloud", "Azure Arc"],
    explain: "Lift-and-shift with full OS control is IaaS (Azure VMs). When developers want to focus on code while Microsoft manages the OS and runtime, that is PaaS, such as App Service. A finished application such as Microsoft 365 is SaaS. Event-driven code billed per execution is serverless, usually Azure Functions. Private cloud is a deployment model, not a service type, and Azure Arc manages resources outside Azure." },

  { id: "sla-composite-fill", d: 1, type: "fill", title: "Calculate SLA downtime and composite availability",
    prompt: "Use the architecture notes to fill in the values. Assume a 30-day month (43,200 minutes).",
    context: "Architecture notes: order-portal\n-----------------------------------------\nComponent            Service SLA (monthly)\nWeb front end        99.95%\nOrders database      99.99%\nBoth components must be available for an order to succeed.\nNo redundancy beyond each service's own SLA.",
    fields: [
      { label: "Allowed downtime per month at a 99.9% SLA (minutes, one decimal place)", answers: ["43.2", "43.2 minutes", "43.2 min"] },
      { label: "Allowed downtime per month at a 99.99% SLA (minutes, one decimal place)", answers: ["4.3", "4.3 minutes", "4.3 min"] },
      { label: "Composite SLA of order-portal (percent, two decimal places)", answers: ["99.94", "99.94%"] }
    ],
    explain: "Downtime is the month's minutes multiplied by the unavailable fraction: 43,200 x 0.001 = 43.2 minutes at 99.9%, and 43,200 x 0.0001 = 4.32 minutes at 99.99%. When an application needs every component to work, multiply the SLAs: 0.9995 x 0.9999 = 0.9994, or 99.94%. A composite SLA is always lower than the weakest individual SLA, which is why architects add redundancy to critical parts." },

  { id: "capex-opex-select", d: 1, type: "select", title: "Identify operational expenditure in a budget",
    prompt: "The finance team pasted last year's IT spending lines. Select every line that is operational expenditure (OpEx).",
    context: "IT spending review - FY2026\n-----------------------------------------------------------\nL1  Purchase of 12 rack servers, depreciated over 5 years\nL2  Monthly Azure invoice for VMs and storage (pay-as-you-go)\nL3  Construction of a new server room\nL4  Microsoft 365 per-user monthly subscription\nL5  Purchase of a storage array, depreciated over 4 years\nL6  Azure SQL Database billed per hour of use",
    options: ["L1 Rack servers purchase", "L2 Monthly Azure invoice", "L3 New server room", "L4 Microsoft 365 subscription", "L5 Storage array purchase", "L6 Azure SQL Database hourly billing"],
    answers: [1, 3, 5],
    explain: "OpEx is ongoing spending on services as they are consumed, such as a monthly cloud bill or a per-user subscription, and it is recorded in the period it is spent. Buying servers, storage arrays or building a server room is CapEx: up-front spending on owned assets that are depreciated over years. The cloud's consumption-based model shifts spending from CapEx to OpEx." },

  { id: "redundancy-match", d: 2, type: "match", title: "Choose storage redundancy for each requirement",
    prompt: "Match each storage requirement to the lowest-cost redundancy option that fully meets it.",
    pairs: [
      ["Test data that can be recreated; only protect against a disk or server failure", "LRS"],
      ["Stay available if one availability zone fails; no second region needed", "ZRS"],
      ["Survive a regional disaster; the secondary copy only needs to be readable after a failover", "GRS"],
      ["Survive a zone failure and a regional disaster, and allow reads from the secondary region at any time", "RA-GZRS"]
    ],
    extra: ["GZRS", "RA-GRS"],
    explain: "LRS keeps three copies in one datacenter, the cheapest option, protecting against hardware failure only. ZRS spreads three copies across availability zones in the primary region. GRS adds asynchronous replication to the paired region, readable only after failover. GZRS combines ZRS in the primary with a secondary region, and the RA- prefix adds read access to the secondary at all times, so a need for zone protection plus secondary reads calls for RA-GZRS. RA-GRS lacks zone redundancy in the primary, and plain GZRS lacks secondary read access." },

  { id: "hierarchy-order", d: 2, type: "order", title: "Order the Azure resource hierarchy",
    prompt: "An administrator is documenting where a policy assigned at the top is inherited. Put these levels in order from the top of the hierarchy to the bottom.",
    steps: ["Root management group", "Child management group (Production)", "Subscription (Sales-Prod)", "Resource group (rg-sales-web)", "Resource (a virtual machine)"],
    explain: "Every directory has one root management group at the top. Management groups can be nested and contain subscriptions; subscriptions contain resource groups; and every resource belongs to exactly one resource group. Policies and RBAC assignments made at a higher level are inherited by everything below, so a policy on the Production management group applies to the VM." },

  { id: "rbac-delete-select", d: 2, type: "select", title: "Find who can delete a VM",
    prompt: "Review the role assignments. Select every principal who can delete the virtual machine vm-web01 in resource group rg-prod. No resource locks exist.",
    context: "Subscription: Contoso-Prod\n  rg-prod contains: vm-web01, stprodlogs\n  rg-dev contains: vm-test01\n\nPrincipal   Role                              Scope\n---------   -------------------------------   ------------------------\nAlex        Owner                             Subscription Contoso-Prod\nBea         Reader                            rg-prod\nChen        Contributor                       rg-prod\nDana        Virtual Machine Contributor       rg-dev\nEli         Reader                            Subscription Contoso-Prod\nFarah       Contributor                       vm-web01 (resource)",
    options: ["Alex", "Bea", "Chen", "Dana", "Eli", "Farah"],
    answers: [0, 2, 5],
    explain: "Role assignments are inherited from the scope where they are made down to child scopes. Alex's Owner at the subscription and Chen's Contributor at rg-prod both reach vm-web01, and Farah's Contributor is assigned on the VM itself. Bea and Eli have Reader, which can view but not change or delete. Dana's Virtual Machine Contributor role would allow deleting VMs, but only in rg-dev, which does not include vm-web01." },

  { id: "blob-tier-fill", d: 2, type: "fill", title: "Pick blob access tiers",
    prompt: "A media company is setting access tiers for four data sets. For each, enter the tier (Hot, Cool, Cold or Archive) that gives the lowest total cost while meeting the stated needs.",
    context: "Data set              Access pattern                             Retention   Needs\n--------------------  -----------------------------------------  ----------  -----------------------------------\nThumbnails            Read thousands of times per day            Ongoing     Immediate reads\nWeekly backups        Restored perhaps once a month              45 days     Immediate reads, no early-deletion fee\nQuarterly reports     Opened a few times a year                  2 years     Immediate reads (no rehydration)\nLegal hold footage    Almost never read                          10 years    Can wait hours to read",
    fields: [
      { label: "Thumbnails", answers: ["Hot"] },
      { label: "Weekly backups", answers: ["Cool"] },
      { label: "Quarterly reports", answers: ["Cold"] },
      { label: "Legal hold footage", answers: ["Archive"] }
    ],
    explain: "Frequently read data belongs in Hot, which has the lowest access cost. Cool suits infrequently accessed data kept at least 30 days; the backups are kept 45 days, which would incur an early-deletion charge in Cold (90-day minimum). Cold is the cheapest online tier for rarely read data kept 90 days or more, so the reports stay readable without rehydration. Archive is offline, needs rehydration that can take hours, and has the lowest storage cost, so it fits the long legal hold." },

  { id: "connectivity-match", d: 2, type: "match", title: "Match connectivity requirements to Azure services",
    prompt: "Match each networking requirement to the Azure service or feature that meets it.",
    pairs: [
      ["A single remote employee's laptop must reach a VNet without an office VPN device", "Point-to-site VPN"],
      ["A branch office network must connect to a VNet through an encrypted tunnel over the internet", "Site-to-site VPN"],
      ["Datacenter traffic to Azure must not cross the public internet", "ExpressRoute"],
      ["Two VNets in different regions must communicate over Microsoft's backbone using private IPs", "VNet peering"],
      ["A storage account must be reachable only through a private IP address in the VNet", "Private endpoint"]
    ],
    extra: ["Azure DNS", "Network security group"],
    explain: "Point-to-site VPN connects individual devices with VPN client software, while site-to-site connects a whole on-premises network through a VPN device; both travel encrypted over the internet via VPN Gateway. ExpressRoute uses a private connection through a provider, not the public internet. VNet peering, including global peering across regions, links VNets over the Microsoft backbone. A private endpoint gives a PaaS service a private IP in your VNet so public access can be disabled. Azure DNS hosts name records and NSGs filter traffic, but neither creates these connections." },

  { id: "migrate-order", d: 2, type: "order", title: "Order an Azure Migrate server migration",
    prompt: "A company will move 60 on-premises VMware VMs to Azure with Azure Migrate. Put the high-level steps in the correct order.",
    steps: [
      "Create an Azure Migrate project in the Azure portal",
      "Deploy the Azure Migrate appliance on-premises to discover servers",
      "Run an assessment to check Azure readiness, sizing and estimated cost",
      "Start replicating the selected servers to Azure",
      "Run a test migration and validate the application",
      "Perform the final migration (cutover) and decommission the old servers"
    ],
    explain: "Azure Migrate is a hub: you first create a project, then discover servers with the lightweight appliance, and assess them for readiness, right-sizing and cost before moving anything. Replication copies the servers to Azure, a test migration lets you validate without affecting production, and only then do you cut over and retire the on-premises machines. Skipping the assessment is a common mistake that leads to oversized or incompatible VMs." },

  { id: "monitor-tools-match", d: 3, type: "match", title: "Match monitoring needs to Azure tools",
    prompt: "An operations team has several questions. Match each one to the Azure tool that answers it.",
    pairs: [
      ["Which underused VMs could we resize to save money?", "Azure Advisor"],
      ["Will planned maintenance affect the services we use in our regions?", "Service Health"],
      ["Is our VM vm-sql01 unavailable because of an Azure platform event?", "Resource Health"],
      ["Is any Azure service down anywhere in the world right now?", "Azure status"],
      ["Which database call makes our checkout page slow?", "Application Insights"],
      ["How many failed sign-ins per hour appear in our collected logs, using KQL?", "Log Analytics"]
    ],
    extra: ["Microsoft Purview", "Azure Arc"],
    explain: "Advisor gives personalized recommendations, including cost savings. Service Health is personalized to your services and regions and covers issues, planned maintenance and advisories, while Azure status is the public global view. Resource Health reports on a single resource. Application Insights traces requests and dependencies inside applications, and Log Analytics runs KQL queries over logs in a workspace. Purview governs data and Arc manages non-Azure resources." },

  { id: "governance-select", d: 3, type: "select", title: "Predict results under Policy and locks",
    prompt: "Priya is an Owner of the subscription. Using the governance settings shown, select every operation she attempts that will succeed.",
    context: "Subscription: Contoso-Main\nAzure Policy assignment (scope: subscription)\n  Definition: Allowed locations   Effect: Deny\n  Allowed: westeurope, northeurope\n\nResource locks\n  rg-app      CanNotDelete\n  rg-archive  ReadOnly\n\nExisting resources\n  rg-app:     vm-app01 (westeurope), stappdata (westeurope)\n  rg-archive: starchive (northeurope)",
    options: [
      "Create a storage account in rg-app in westeurope",
      "Create a VM in rg-app in eastus",
      "Resize vm-app01 to a larger size",
      "Delete stappdata",
      "Add the tag Env=Prod to vm-app01",
      "Change the redundancy setting of starchive",
      "View the properties of starchive"
    ],
    answers: [0, 2, 4, 6],
    explain: "Azure Policy's Deny effect blocks creating resources outside the allowed regions, even for Owners, so the eastus VM fails. A CanNotDelete lock on rg-app is inherited by its resources: they can be modified (resized, tagged) but not deleted, so deleting stappdata fails. The ReadOnly lock on rg-archive allows reading but blocks any update or deletion, so changing starchive's redundancy fails while viewing it succeeds. Locks apply to Owners too; they must be removed first." },

  { id: "tools-commands-fill", d: 3, type: "fill", title: "Complete Azure CLI and PowerShell commands",
    prompt: "An administrator is scripting a lab in Azure Cloud Shell. Fill in the missing words.",
    context: "# Azure CLI (Bash)\naz group ______ --name rg-lab --location westeurope\n\n# Azure PowerShell\n______-AzResourceGroup -Name rg-lab2 -Location westeurope\n\n# Azure CLI: protect rg-lab from deletion but still allow changes\naz lock create --name keep --resource-group rg-lab --lock-type ______",
    fields: [
      { label: "Azure CLI subcommand to create the resource group", answers: ["create"] },
      { label: "PowerShell verb to create the resource group", answers: ["New"] },
      { label: "Lock type that blocks deletion but allows modification", answers: ["CanNotDelete"] }
    ],
    explain: "Azure CLI commands start with az followed by a group and subcommand, so az group create makes a resource group. Azure PowerShell cmdlets follow a verb-noun pattern, and the verb for creating something is New, giving New-AzResourceGroup. The CanNotDelete lock type prevents deletion while allowing changes; ReadOnly would block changes as well. Both CLI and PowerShell are preinstalled in Cloud Shell." }
]);
