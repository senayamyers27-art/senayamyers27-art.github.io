/* Hands-on Azure CLI exercises for AZ-900 (Microsoft Azure Fundamentals).
   Checked by tools/check-data.js against the simulator in public/assets/azcli.js. */
CertHub.addHandson("az-900", {
  items: [
    {
      id: "az900-cli-rg", kind: "az", d: 2,
      title: "Create your first resource group",
      prompt: "Resource groups are the containers that hold related Azure resources.\n\nCreate a resource group named `rg-learn` in the `westeurope` region, then list all resource groups as a table.",
      hint: "Use az group create with --name and --location, then az group list -o table.",
      explain: "Every Azure resource lives in exactly one resource group, and a group usually holds resources that share a lifecycle, such as one app's VMs, storage and network. The group's location only says where its metadata is stored; the resources inside can be in other regions. Deleting a resource group deletes everything in it, which makes cleanup easy and is also why locks exist.",
      setup: {},
      checks: [
        { label: "rg-learn exists in westeurope", type: "group", name: "rg-learn", location: "westeurope" },
        { label: "You listed the resource groups", type: "ran", includes: "az group list" }
      ],
      solution: ["az group create --name rg-learn --location westeurope", "az group list -o table"]
    },
    {
      id: "az900-cli-deallocate", kind: "az", d: 1,
      title: "Stop paying for an idle virtual machine",
      prompt: "The test VM `vm-test01` in `rg-learn` isn't needed until next week. With pay-as-you-go pricing you pay for compute while the VM is allocated.\n\nShut the VM down so compute charges stop, but keep it (don't delete it). Then check its power state.",
      hint: "There's a difference between stopped and deallocated. Look at az vm deallocate, then az vm show -d --query powerState.",
      explain: "The cloud's consumption-based model means you pay for what you use, an operational expense (OpEx) instead of buying hardware up front (CapEx). A deallocated VM releases its compute, so compute billing stops, while its disks remain and are still billed at a much lower rate. A VM that is only stopped from inside the operating system stays allocated and keeps costing money.",
      setup: { groups: { "rg-learn": { location: "westeurope" } }, vms: { "vm-test01": { group: "rg-learn", size: "Standard_B2s" } } },
      checks: [
        { label: "vm-test01 is deallocated", type: "vm", name: "vm-test01", state: "deallocated" },
        { label: "vm-test01 still exists", type: "vm", name: "vm-test01" }
      ],
      solution: ["az vm deallocate --resource-group rg-learn --name vm-test01", "az vm show --resource-group rg-learn --name vm-test01 -d --query powerState -o tsv"]
    },
    {
      id: "az900-cli-scale-up", kind: "az", d: 1,
      title: "Scale a VM up when it needs more power",
      prompt: "The app on `vm-app01` in `rg-learn` has outgrown its `Standard_B1s` size.\n\nScale the VM up to `Standard_B2ms`, then show its details as a table to confirm the new size.",
      hint: "az vm resize changes the size with --size. az vm show -o table shows the result.",
      explain: "Scaling up (vertical scaling) gives one VM more CPU and memory; scaling out (horizontal scaling) adds more instances, for example with Virtual Machine Scale Sets. Scalability is being able to add capacity, and elasticity is adding and removing it automatically as demand changes. In the cloud a resize takes minutes rather than a hardware purchase, though resizing a running VM restarts it.",
      setup: { groups: { "rg-learn": { location: "westeurope" } }, vms: { "vm-app01": { group: "rg-learn", size: "Standard_B1s" } } },
      checks: [
        { label: "vm-app01 is size Standard_B2ms", type: "vm", name: "vm-app01", size: "Standard_B2ms" },
        { label: "vm-app01 is running", type: "vm", name: "vm-app01", state: "running" }
      ],
      solution: ["az vm resize --resource-group rg-learn --name vm-app01 --size Standard_B2ms", "az vm show --resource-group rg-learn --name vm-app01 -o table"]
    },
    {
      id: "az900-cli-grs", kind: "az", d: 2,
      title: "Create a geo-redundant storage account",
      prompt: "Your backups must survive the loss of a whole Azure region.\n\nCreate a storage account named `stlearngrs01` in `rg-learn` using geo-redundant storage (`Standard_GRS`). Then show the account's SKU.",
      hint: "az storage account create takes --name, --resource-group and --sku. Storage account names are lowercase letters and digits only.",
      explain: "Locally redundant storage (LRS) keeps three copies in one datacenter, and zone-redundant storage (ZRS) spreads three copies across availability zones in one region. Geo-redundant storage (GRS) adds an asynchronous copy in the paired secondary region, protecting against a regional outage; RA-GRS also lets you read from the secondary. GZRS combines zone redundancy in the primary region with a geo copy.",
      setup: { groups: { "rg-learn": { location: "westeurope" } } },
      checks: [
        { label: "stlearngrs01 uses Standard_GRS", type: "storage", name: "stlearngrs01", sku: "Standard_GRS" },
        { label: "stlearngrs01 only accepts HTTPS", type: "storage", name: "stlearngrs01", httpsOnly: true }
      ],
      solution: ["az storage account create --name stlearngrs01 --resource-group rg-learn --sku Standard_GRS", "az storage account show --name stlearngrs01 --query sku.name -o tsv"]
    },
    {
      id: "az900-cli-tags", kind: "az", d: 3,
      title: "Tag resources for cost reporting",
      prompt: "Finance wants costs grouped by cost center.\n\nAdd the tag `costCenter=4410` to the resource group `rg-learn` and to the VM `vm-app01`, without removing the tags they already have (the VM is tagged `env=test`). Use `az tag update` with the Merge operation.",
      hint: "az tag update needs --resource-id, --operation Merge and --tags. Get IDs with az group show --query id -o tsv and az vm show --query id -o tsv, stored in variables such as rgid=$(...).",
      explain: "Tags are name-value pairs that let you group costs, find resources and drive automation. Cost Management can filter and group spending by tag. az tag update --operation Merge adds or changes the tags you name and keeps the rest; Replace swaps the whole set and Delete removes the named tags. Azure Policy can require tags or copy them from the resource group so they stay consistent.",
      setup: { groups: { "rg-learn": { location: "westeurope", tags: { owner: "training" } } }, vms: { "vm-app01": { group: "rg-learn", tags: { env: "test" } } } },
      checks: [
        { label: "rg-learn is tagged costCenter=4410", type: "group", name: "rg-learn", tag: "costCenter=4410" },
        { label: "vm-app01 is tagged costCenter=4410", type: "tag", resource: "vm-app01", tag: "costCenter=4410" },
        { label: "vm-app01 kept its env=test tag", type: "tag", resource: "vm-app01", tag: "env=test" }
      ],
      solution: ["rgid=$(az group show --name rg-learn --query id -o tsv)", "az tag update --resource-id $rgid --operation Merge --tags costCenter=4410", "vmid=$(az vm show --resource-group rg-learn --name vm-app01 --query id -o tsv)", "az tag update --resource-id $vmid --operation Merge --tags costCenter=4410"]
    },
    {
      id: "az900-cli-guardrails", kind: "az", d: 3,
      title: "Add governance guardrails: a lock and a policy",
      prompt: "Put two guardrails on `rg-learn`:\n1. A `CanNotDelete` lock named `learn-nodelete`.\n2. An assignment of the built-in policy **Allowed locations** named `allowed-locations`, scoped to `rg-learn`, that allows only `westeurope` and `northeurope`.\n\nFind the policy definition's name (a GUID) with `az policy definition list` and a `--query` filter on displayName.",
      hint: "az policy definition list --query \"[?displayName=='Allowed locations'].name\" -o tsv prints the GUID. The assignment needs --policy, --resource-group and --params with a listOfAllowedLocations value.",
      explain: "Resource locks stop accidental deletion or change, whoever is signed in. Azure Policy evaluates resource properties: Allowed locations denies new resources outside the listed regions, which helps with data residency rules. RBAC decides who can act, Policy decides what is allowed, and locks protect what already exists; together they are core Azure governance tools.",
      setup: { groups: { "rg-learn": { location: "westeurope" } } },
      checks: [
        { label: "rg-learn has a CanNotDelete lock named learn-nodelete", type: "lock", group: "rg-learn", name: "learn-nodelete", level: "CanNotDelete" },
        { label: "Allowed locations is assigned to rg-learn as allowed-locations", type: "policyAssignment", name: "allowed-locations", policy: "Allowed locations", group: "rg-learn" }
      ],
      solution: ["az lock create --name learn-nodelete --lock-type CanNotDelete --resource-group rg-learn", "az policy definition list --query \"[?displayName=='Allowed locations'].name\" -o tsv", "az policy assignment create --name allowed-locations --resource-group rg-learn --policy e56962a6-4747-49cd-b67b-bf8b01975c4c --params '{\"listOfAllowedLocations\":{\"value\":[\"westeurope\",\"northeurope\"]}}'"]
    }
  ]
});
