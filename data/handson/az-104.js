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
    }
  ]
});
