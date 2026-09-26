/* Hands-on Azure PowerShell exercises for AZ-104 (Microsoft Azure Administrator).
   Checked by tools/check-data.js against the simulator in public/assets/pwsh.js. */
CertHub.addHandson("az-104", {
  tables: {},
  items: [
    {
      id: "az104-new-rg", kind: "pwsh", d: 1,
      title: "Create a resource group for a new project",
      prompt: "A new project needs its own container for resources.\n\nCreate a resource group named `rg-project1` in the `eastus` region with New-AzResourceGroup.",
      hint: "New-AzResourceGroup takes -Name and -Location. Use eastus for the location.",
      explain: "A resource group is the basic unit of organisation and lifecycle in Azure; every resource lives in exactly one. New-AzResourceGroup -Name -Location creates it in a chosen region, which sets where the group's metadata is stored. Grouping resources by project makes access control, cost tracking and clean-up straightforward, all core AZ-104 governance skills.",
      setup: { user: "admin", azResourceGroups: {} },
      checks: [
        { label: "The rg-project1 resource group exists", type: "azRg", name: "rg-project1", exists: true },
        { label: "You created it with New-AzResourceGroup", type: "ran", includes: "New-AzResourceGroup" }
      ],
      solution: ["New-AzResourceGroup -Name rg-project1 -Location eastus"]
    },
    {
      id: "az104-remove-rg", kind: "pwsh", d: 1,
      title: "Remove an unused resource group to control cost",
      prompt: "A cost review found an old resource group, `rg-old`, that is no longer needed. A second group, `rg-keep`, must stay.\n\nList the resource groups, then delete only `rg-old`.",
      hint: "Get-AzResourceGroup lists them. Remove-AzResourceGroup -Name deletes one; be sure to name rg-old, not rg-keep.",
      explain: "Deleting a resource group removes it and everything inside it, so it is a powerful clean-up tool and a dangerous one if you name the wrong group. Listing with Get-AzResourceGroup first confirms exactly what exists before you remove anything. Removing idle resources to control spend is a governance and cost-management task emphasised on AZ-104.",
      setup: { user: "admin", azResourceGroups: { "rg-old": { location: "westus" }, "rg-keep": { location: "eastus" } } },
      checks: [
        { label: "The rg-old resource group is gone", type: "azRg", name: "rg-old", exists: false },
        { label: "The rg-keep resource group still exists", type: "azRg", name: "rg-keep", exists: true }
      ],
      solution: ["Get-AzResourceGroup", "Remove-AzResourceGroup -Name rg-old"]
    },
    {
      id: "az104-storage-rg", kind: "pwsh", d: 2,
      title: "Set up a resource group and naming plan for storage",
      prompt: "You are about to deploy a storage account in East US.\n\nCreate a resource group `rg-storage-eus` in `eastus`, then record the intended storage account name in `C:\\Az\\storage-plan.txt`. The note must mention Storage account.",
      hint: "New-AzResourceGroup makes the group; Set-Content -Path -Value writes the naming note.",
      explain: "Storage account names must be globally unique and lowercase, so planning a name before deployment avoids failed commands. Placing the account in a region-specific resource group keeps related resources together and close to where they are used. AZ-104 storage tasks reward this kind of preparation: decide the group, region and name first, then deploy.",
      setup: { user: "admin", azResourceGroups: {} },
      checks: [
        { label: "The rg-storage-eus resource group exists", type: "azRg", name: "rg-storage-eus", exists: true },
        { label: "The plan records the storage account name", type: "file", path: "C:\\Az\\storage-plan.txt", includes: "Storage account" }
      ],
      solution: ["New-AzResourceGroup -Name rg-storage-eus -Location eastus", "Set-Content -Path C:\\Az\\storage-plan.txt -Value 'Storage account name: stprodeus001'"]
    },
    {
      id: "az104-compute-rg", kind: "pwsh", d: 3,
      title: "Prepare a resource group for virtual machines",
      prompt: "You will deploy several virtual machines and want them in their own group.\n\nCreate a resource group `rg-compute` in `eastus`, then list the existing virtual machines in the subscription with Get-AzVM.",
      hint: "New-AzResourceGroup creates the group. Get-AzVM lists the VMs already in the subscription.",
      explain: "Dedicating a resource group to compute keeps virtual machines, their disks and network interfaces together for easier management and clean-up. New-AzResourceGroup prepares the container, and Get-AzVM shows what already exists so you avoid duplicate or conflicting names. Deploying and organising VMs is a large part of the AZ-104 compute objective.",
      setup: { user: "admin", azResourceGroups: {}, azVMs: { web01: { rg: "rg-existing", size: "Standard_B2s", state: "VM running" } } },
      checks: [
        { label: "The rg-compute resource group exists", type: "azRg", name: "rg-compute", exists: true },
        { label: "You listed existing VMs with Get-AzVM", type: "ran", includes: "Get-AzVM" }
      ],
      solution: ["New-AzResourceGroup -Name rg-compute -Location eastus", "Get-AzVM"]
    },
    {
      id: "az104-network-rg", kind: "pwsh", d: 4,
      title: "Create a networking resource group and record the address space",
      prompt: "Networking resources for a new environment belong in their own group.\n\nCreate a resource group `rg-network` in `westeurope`, then record the planned virtual network address space in `C:\\Az\\vnet.txt`. The note must contain 10.10.0.0/16.",
      hint: "New-AzResourceGroup makes the group in westeurope; Set-Content writes the address space note.",
      explain: "Planning a virtual network's address space up front prevents overlaps that would block later peering or VPN connections. A 10.10.0.0/16 range gives room to carve out subnets. Creating the resource group in the target region and documenting the CIDR is the groundwork before deploying the VNet itself, which the AZ-104 networking objective builds on.",
      setup: { user: "admin", azResourceGroups: {} },
      checks: [
        { label: "The rg-network resource group exists", type: "azRg", name: "rg-network", exists: true },
        { label: "The note records the VNet address space", type: "file", path: "C:\\Az\\vnet.txt", includes: "10.10.0.0/16" }
      ],
      solution: ["New-AzResourceGroup -Name rg-network -Location westeurope", "Set-Content -Path C:\\Az\\vnet.txt -Value 'Planned VNet address space 10.10.0.0/16'"]
    },
    {
      id: "az104-export-inventory", kind: "pwsh", d: 5,
      title: "Export a resource group inventory for review",
      prompt: "For a monthly review you need a saved list of all resource groups.\n\nList the resource groups and send the output to `C:\\Az\\rg-list.txt` with Out-File. The saved file should include the group `rg-a`.",
      hint: "Pipe Get-AzResourceGroup into Out-File -FilePath. The output includes each group's name.",
      explain: "Capturing a point-in-time inventory supports monitoring, auditing and change tracking. Piping Get-AzResourceGroup into Out-File writes the formatted list to a file you can attach to a review or compare against later. Producing records like this from PowerShell is part of the AZ-104 monitoring and maintenance objective.",
      setup: { user: "admin", azResourceGroups: { "rg-a": { location: "eastus" }, "rg-b": { location: "westus" } } },
      checks: [
        { label: "The inventory file was created", type: "exists", path: "C:\\Az\\rg-list.txt" },
        { label: "The file lists resource group rg-a", type: "file", path: "C:\\Az\\rg-list.txt", includes: "rg-a" }
      ],
      solution: ["Get-AzResourceGroup | Out-File -FilePath C:\\Az\\rg-list.txt"]
    },
    {
      id: "az104-cli-rg-tags", kind: "az", d: 1,
      title: "Create a tagged resource group with the Azure CLI",
      prompt: "Your team reports cloud costs by tag.\n\nCreate a resource group named `rg-app-dev` in `eastus` with two tags: `env=dev` and `costCenter=1001`. Then list your resource groups as a table to confirm it's there.",
      hint: "az group create takes --name, --location and --tags. Tags are space-separated key=value pairs after a single --tags.",
      explain: "Tags are name-value pairs on resource groups and resources that feed cost analysis, automation and inventory queries. Tags on a resource group are not copied to the resources inside it automatically; Azure Policy (for example 'Inherit a tag from the resource group if missing') can do that. Note that --tags on create or update replaces the whole tag set, so to add one tag later use az tag update --operation Merge.",
      setup: {},
      checks: [
        { label: "rg-app-dev exists in eastus", type: "group", name: "rg-app-dev", location: "eastus" },
        { label: "The group is tagged env=dev", type: "group", name: "rg-app-dev", tag: "env=dev" },
        { label: "The group is tagged costCenter=1001", type: "group", name: "rg-app-dev", tag: "costCenter=1001" }
      ],
      solution: ["az group create --name rg-app-dev --location eastus --tags env=dev costCenter=1001", "az group list -o table"]
    },
    {
      id: "az104-cli-lock", kind: "az", d: 1,
      title: "Protect a production resource group with a delete lock",
      prompt: "The resource group `rg-prod-data` holds production storage, and someone nearly deleted it last week.\n\nAdd a lock named `prod-nodelete` that still lets the team change resources but blocks anyone from deleting them. Then list the locks on the group to confirm.",
      hint: "az lock create needs --name, --lock-type and --resource-group. One lock type blocks every change; the other only blocks deletes.",
      explain: "CanNotDelete lets authorized users read and modify resources but blocks deletion. ReadOnly blocks every write, which can break normal operations such as starting a VM or listing storage account keys. Locks apply to everyone, including Owners, and every resource in the group inherits them. To delete a locked resource, someone with Microsoft.Authorization/locks permissions (such as an Owner or User Access Administrator) must remove the lock first.",
      setup: { groups: { "rg-prod-data": { location: "eastus2" } }, storage: { accounts: { stproddata01: { group: "rg-prod-data" } } } },
      checks: [
        { label: "rg-prod-data has a CanNotDelete lock named prod-nodelete", type: "lock", group: "rg-prod-data", name: "prod-nodelete", level: "CanNotDelete" },
        { label: "You listed the locks to confirm", type: "ran", includes: "az lock list" }
      ],
      solution: ["az lock create --name prod-nodelete --lock-type CanNotDelete --resource-group rg-prod-data", "az lock list --resource-group rg-prod-data -o table"]
    },
    {
      id: "az104-cli-storage", kind: "az", d: 2,
      title: "Create a hardened storage account and a private container",
      prompt: "Create a storage account named `stcontosologs01` in `rg-storage` with:\n- zone-redundant storage (`Standard_ZRS`) and kind `StorageV2`\n- HTTPS-only traffic and a minimum TLS version of 1.2\n- anonymous blob access disabled\n\nThen create a container named `logs` in it, authorizing with your Microsoft Entra sign-in (`--auth-mode login`) rather than the account key.",
      hint: "Storage account names are 3 to 24 lowercase letters and digits. Look for --sku, --kind, --https-only, --min-tls-version and --allow-blob-public-access; the container command needs --account-name.",
      explain: "ZRS keeps three copies across availability zones in one region, so it survives a zone outage; LRS stays in one datacenter, while GRS and GZRS add an asynchronous copy in a secondary region. HTTPS-only, TLS 1.2 and disabled anonymous access are the secure baseline, and stating them explicitly documents intent. --auth-mode login uses your Entra identity and RBAC (reading and writing blobs needs a data role such as Storage Blob Data Contributor) instead of the all-powerful account key.",
      setup: { groups: { "rg-storage": { location: "eastus" } } },
      checks: [
        { label: "stcontosologs01 uses Standard_ZRS", type: "storage", name: "stcontosologs01", sku: "Standard_ZRS" },
        { label: "HTTPS only, TLS 1.2 and no anonymous blob access", type: "storage", name: "stcontosologs01", httpsOnly: true, minTls: "TLS1_2", publicAccess: false },
        { label: "The logs container exists", type: "container", account: "stcontosologs01", name: "logs" }
      ],
      solution: ["az storage account create --name stcontosologs01 --resource-group rg-storage --sku Standard_ZRS --kind StorageV2 --https-only true --min-tls-version TLS1_2 --allow-blob-public-access false", "az storage container create --account-name stcontosologs01 --name logs --auth-mode login"]
    },
    {
      id: "az104-cli-vm-resize", kind: "az", d: 3,
      title: "Right-size a VM and stop paying for idle compute",
      prompt: "The batch VM `vm-batch01` in `rg-compute` is oversized at `Standard_D4s_v5` and only runs at month end.\n\nResize it to `Standard_D2s_v5`, then shut it down so compute billing stops. Check its power state with `az vm show -d`.",
      hint: "az vm resize takes --size. az vm stop leaves the compute allocated and billed; a different command releases it.",
      explain: "Resizing restarts a running VM, and if the new size isn't available on the current hardware cluster you may need to deallocate it first. Shutting down from inside the OS, or with az vm stop, leaves the VM Stopped but still allocated, so compute charges continue. az vm deallocate releases the host and stops compute billing, although managed disks are still billed. A dynamic public IP is released on deallocation, which is one reason to use a static IP or a DNS name.",
      setup: { groups: { "rg-compute": { location: "eastus" } }, vms: { "vm-batch01": { group: "rg-compute", size: "Standard_D4s_v5" } } },
      checks: [
        { label: "vm-batch01 is size Standard_D2s_v5", type: "vm", name: "vm-batch01", size: "Standard_D2s_v5" },
        { label: "vm-batch01 is deallocated", type: "vm", name: "vm-batch01", state: "deallocated" }
      ],
      solution: ["az vm resize --resource-group rg-compute --name vm-batch01 --size Standard_D2s_v5", "az vm deallocate --resource-group rg-compute --name vm-batch01", "az vm show --resource-group rg-compute --name vm-batch01 -d --query powerState -o tsv"]
    },
    {
      id: "az104-cli-vm-private", kind: "az", d: 3,
      title: "Deploy a Linux VM with no public IP",
      prompt: "Deploy an Ubuntu VM named `vm-app01` into the existing subnet `snet-app` of `vnet-app` in `rg-compute`.\n\nUse the `Ubuntu2204` image, size `Standard_B2s`, admin user `azureuser` and SSH keys (no password). The VM must not get a public IP address, and because the subnet already has an NSG, don't create a NIC-level NSG either. Pass an empty string (`\"\"`) to the public IP and NSG options.",
      hint: "az vm create takes --image, --size, --admin-username, --generate-ssh-keys, --vnet-name and --subnet. Use --public-ip-address \"\" and --nsg \"\".",
      explain: "By default az vm create adds a public IP and a NIC-level NSG that opens SSH (22) or RDP (3389) to the internet. Passing empty strings leaves both out, so the VM is reachable only inside the virtual network, for example through Azure Bastion, a VPN or a jump host. SSH keys remove password guessing entirely. The subnet's NSG still filters traffic, and keeping rules at one level makes them easier to reason about.",
      setup: { groups: { "rg-compute": { location: "eastus" } }, nsgs: { "nsg-app": { group: "rg-compute" } }, vnets: { "vnet-app": { group: "rg-compute", addressPrefix: "10.20.0.0/16", subnets: { "snet-app": { prefix: "10.20.1.0/24", nsg: "nsg-app" } } } } },
      checks: [
        { label: "vm-app01 is running at size Standard_B2s", type: "vm", name: "vm-app01", state: "running", size: "Standard_B2s" },
        { label: "vm-app01 has no public IP address", type: "vm", name: "vm-app01", publicIp: false },
        { label: "vm-app01 sits in snet-app with no NIC-level NSG", type: "vm", name: "vm-app01", subnet: "snet-app", nsg: false }
      ],
      solution: ["az vm create --resource-group rg-compute --name vm-app01 --image Ubuntu2204 --size Standard_B2s --admin-username azureuser --generate-ssh-keys --vnet-name vnet-app --subnet snet-app --public-ip-address \"\" --nsg \"\""]
    },
    {
      id: "az104-cli-rbac", kind: "az", d: 1,
      title: "Replace a broad role assignment with least privilege",
      prompt: "Alex Kim (`alex@contoso.onmicrosoft.com`) only manages virtual machines in `rg-compute`, but someone gave him Contributor on the whole subscription.\n\nGive Alex the `Virtual Machine Contributor` role scoped to the `rg-compute` resource group, then remove his subscription-level Contributor assignment. List his assignments afterwards to confirm.",
      hint: "az account show --query id -o tsv prints the subscription ID. A resource group scope looks like /subscriptions/<id>/resourceGroups/<name>. Role names with spaces need quotes.",
      explain: "A role assignment is a security principal plus a role definition plus a scope, and permissions inherit downward from management group to subscription to resource group to resource. Assign the narrowest role at the narrowest scope that does the job: Virtual Machine Contributor manages VMs but not the virtual network or storage account they use, and neither it nor Contributor can grant access to others. Removing the old broad assignment matters as much as adding the new one.",
      setup: { groups: { "rg-compute": { location: "eastus" } }, users: [{ upn: "alex@contoso.onmicrosoft.com", displayName: "Alex Kim", jobTitle: "Server Administrator" }], roleAssignments: [{ assignee: "alex@contoso.onmicrosoft.com", role: "Contributor", scope: "subscription" }] },
      checks: [
        { label: "Alex has Virtual Machine Contributor on rg-compute", type: "role", assignee: "alex@contoso.onmicrosoft.com", role: "Virtual Machine Contributor", group: "rg-compute" },
        { label: "Alex no longer has Contributor on the subscription", type: "role", assignee: "alex@contoso.onmicrosoft.com", role: "Contributor", scope: "subscription", present: false }
      ],
      solution: ["az role assignment create --assignee alex@contoso.onmicrosoft.com --role \"Virtual Machine Contributor\" --scope /subscriptions/3f2a1b4c-5d6e-4f70-8a9b-0c1d2e3f4a5b/resourceGroups/rg-compute", "az role assignment delete --assignee alex@contoso.onmicrosoft.com --role Contributor --scope /subscriptions/3f2a1b4c-5d6e-4f70-8a9b-0c1d2e3f4a5b", "az role assignment list --assignee alex@contoso.onmicrosoft.com --all -o table"]
    },
    {
      id: "az104-cli-peering", kind: "az", d: 4,
      title: "Connect a spoke network to the hub with peering",
      prompt: "The hub network `vnet-hub` (10.10.0.0/16) already exists in `rg-network`.\n\nCreate `vnet-spoke` with address space 10.20.0.0/16 and a subnet `snet-web` (10.20.1.0/24) in the same group. Then peer the two networks in both directions: `hub-to-spoke` on the hub and `spoke-to-hub` on the spoke. A peering only shows Connected once both sides exist.",
      hint: "az network vnet create accepts --address-prefixes, --subnet-name and --subnet-prefixes. az network vnet peering create needs --vnet-name, --name and --remote-vnet, run once from each side.",
      explain: "VNet peering must be created from both sides; until the second link exists the first one shows Initiated. Peered address spaces can't overlap, which is why planning ranges such as 10.10.0.0/16 and 10.20.0.0/16 up front matters. Traffic between peered networks stays on the Microsoft backbone. Peering is not transitive, so two spokes can't reach each other through the hub unless you add routing through a firewall or network virtual appliance.",
      setup: { groups: { "rg-network": { location: "eastus" } }, vnets: { "vnet-hub": { group: "rg-network", addressPrefix: "10.10.0.0/16", subnets: { "snet-shared": "10.10.1.0/24" } } } },
      checks: [
        { label: "vnet-spoke has subnet snet-web (10.20.1.0/24)", type: "vnet", name: "vnet-spoke", prefix: "10.20.0.0/16", subnet: "snet-web", subnetPrefix: "10.20.1.0/24" },
        { label: "hub-to-spoke is Connected", type: "peering", vnet: "vnet-hub", name: "hub-to-spoke", remote: "vnet-spoke", state: "Connected" },
        { label: "spoke-to-hub is Connected", type: "peering", vnet: "vnet-spoke", name: "spoke-to-hub", remote: "vnet-hub", state: "Connected" }
      ],
      solution: ["az network vnet create --resource-group rg-network --name vnet-spoke --address-prefixes 10.20.0.0/16 --subnet-name snet-web --subnet-prefixes 10.20.1.0/24", "az network vnet peering create --resource-group rg-network --vnet-name vnet-hub --name hub-to-spoke --remote-vnet vnet-spoke --allow-vnet-access", "az network vnet peering create --resource-group rg-network --vnet-name vnet-spoke --name spoke-to-hub --remote-vnet vnet-hub --allow-vnet-access", "az network vnet peering list --resource-group rg-network --vnet-name vnet-hub -o table"]
    },
    {
      id: "az104-cli-cpu-alert", kind: "az", d: 5,
      title: "Alert the on-call team when CPU runs high",
      prompt: "Create an action group named `ag-oncall` in `rg-monitor` with the short name `oncall` that emails `oncall@contoso.com`.\n\nThen create a metric alert named `alert-cpu-high` in `rg-monitor` on the VM `vm-web01` (in `rg-web`). It should fire when average `Percentage CPU` is greater than 80 over a 5-minute window, with severity 2, and notify the action group.",
      hint: "Create the action group first (--action email NAME ADDRESS). The alert's --scopes needs the VM's full resource ID: az vm show --query id -o tsv prints it, and vmid=$(...) stores it for the next command.",
      explain: "An action group is a reusable list of who to notify and what to run (email, SMS, webhook, Logic App, runbook) that many alert rules can share. A metric alert checks a platform metric on a schedule (the evaluation frequency) over a look-back period (the window size) and compares it with a threshold. Severity runs from 0 (critical) to 4 (verbose). Platform metrics such as Percentage CPU need no agent; guest OS counters such as memory need the Azure Monitor agent and a data collection rule.",
      setup: { groups: { "rg-monitor": { location: "eastus" }, "rg-web": { location: "eastus" } }, vms: { "vm-web01": { group: "rg-web" } } },
      checks: [
        { label: "Action group ag-oncall emails oncall@contoso.com", type: "actionGroup", name: "ag-oncall", email: "oncall@contoso.com" },
        { label: "alert-cpu-high watches Percentage CPU with severity 2", type: "alert", name: "alert-cpu-high", metric: "Percentage CPU", severity: 2 },
        { label: "The alert notifies ag-oncall", type: "alert", name: "alert-cpu-high", actionGroup: "ag-oncall" }
      ],
      solution: ["az monitor action-group create --resource-group rg-monitor --name ag-oncall --short-name oncall --action email oncall oncall@contoso.com", "vmid=$(az vm show --resource-group rg-web --name vm-web01 --query id -o tsv)", "az monitor metrics alert create --resource-group rg-monitor --name alert-cpu-high --scopes $vmid --condition \"avg Percentage CPU > 80\" --window-size 5m --evaluation-frequency 1m --severity 2 --action ag-oncall"]
    }
  ]
});
