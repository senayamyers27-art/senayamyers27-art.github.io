CertHub.addPbqs("az-802", [
  { id: "fsmo-match", d: 1, type: "match", title: "Match FSMO roles to their responsibilities",
    prompt: "Your junior admin is documenting the contoso.example.com forest. Match each operations master (FSMO) role to the job it performs.",
    pairs: [
      ["Schema master", "Processes all changes to the AD schema (one per forest)"],
      ["Domain naming master", "Adds and removes domains and application partitions in the forest"],
      ["RID master", "Hands out pools of relative IDs so DCs can create security principals"],
      ["PDC emulator", "Domain time source and first stop for urgent password changes"],
      ["Infrastructure master", "Updates references to objects in other domains"]
    ],
    extra: ["Holds the only writable copy of the global catalog", "Authorizes DHCP servers in Active Directory"],
    explain: "Schema master and domain naming master are forest-wide roles; RID master, PDC emulator and infrastructure master exist once per domain. The PDC emulator is the root of the domain time hierarchy and receives password changes urgently, which is why bad-password checks go there. The global catalog is not a FSMO role (any DC can be a GC), and DHCP authorization is done by Enterprise Admins, not a role holder."
  },
  { id: "gmsa-order", d: 1, type: "order", title: "Deploy a group managed service account",
    prompt: "An IIS app pool on WEB01 must run as a group managed service account (svc-web) in a forest that has never used gMSAs. Put the steps in the correct order.",
    steps: [
      "Create the KDS root key with Add-KdsRootKey and let it become effective and replicate",
      "Run New-ADServiceAccount svc-web with -DNSHostName and -PrincipalsAllowedToRetrieveManagedPassword naming WEB01 (or a group containing it)",
      "On WEB01, install the AD PowerShell module and run Install-ADServiceAccount svc-web",
      "Run Test-ADServiceAccount svc-web on WEB01 and confirm it returns True",
      "Set the app pool identity to CONTOSO\\svc-web$ with a blank password"
    ],
    explain: "gMSA passwords are derived from the KDS root key, so the key must exist first (it is effective 10 hours after creation unless you backdate it in a lab). The account is then created and scoped to the hosts allowed to retrieve its password; the host installs and tests it, and only then is the service configured. The trailing $ and blank password are required because Windows fetches and rotates the password automatically."
  },
  { id: "hybrid-tools-match", d: 2, type: "match", title: "Pick the right hybrid or migration tool",
    prompt: "Match each requirement from the Contoso hybrid project plan to the Microsoft tool that fulfils it.",
    pairs: [
      ["Move shares, data and the identity of a Windows Server 2012 R2 file server to a new Windows Server 2025 VM", "Storage Migration Service"],
      ["Apply Azure Policy and VM extensions to physical servers in the on-premises datacenter", "Azure Arc-enabled servers"],
      ["Assess sizing and cost, then rehost 40 VMware VMs as Azure VMs", "Azure Migrate"],
      ["Manage servers and failover clusters from a browser without RDP", "Windows Admin Center"],
      ["Move users and groups from a legacy forest while keeping access via SID history", "Active Directory Migration Tool (ADMT)"]
    ],
    extra: ["Azure File Sync", "Entra Cloud Sync"],
    explain: "Storage Migration Service inventories, transfers and cuts over a file server, including taking over its name and IP. Azure Arc projects non-Azure machines into Azure Resource Manager so Policy, Defender and extensions apply. Azure Migrate provides discovery, assessment and replication for rehosting. Windows Admin Center is the browser-based management tool, and ADMT migrates AD objects with SID history. Azure File Sync caches Azure file shares on servers, and Cloud Sync synchronizes identities to Entra ID; neither migrates forests or servers."
  },
  { id: "hv-replica-order", d: 3, type: "order", title: "Configure Hyper-V Replica between two hosts",
    prompt: "HV01 (primary) and HV02 (replica) are domain-joined standalone Hyper-V hosts. Put the steps to protect VM APP01 with Hyper-V Replica using Kerberos over HTTP in the correct order.",
    steps: [
      "On HV02, enable it as a Replica server (Kerberos/HTTP, port 80), authorize HV01 with a storage path, and enable the Hyper-V Replica HTTP Listener firewall rule",
      "On HV01, run Enable Replication for APP01, choose HV02, the replication frequency and the recovery points to keep",
      "Choose the initial replication method (over the network, external media or an existing VM) and start initial replication",
      "Confirm replication health is Normal with Measure-VMReplication",
      "Run a Test Failover on HV02 to validate the replica without interrupting APP01"
    ],
    explain: "The replica side must accept replication before the primary can target it, and the inbound firewall rule is not enabled by default. After initial replication completes, check health, then use Test Failover, which boots a disposable copy of the replica on an isolated network while production keeps running. Planned failover and unplanned failover are for real events, not validation."
  },
  { id: "azure-subnet-fill", d: 4, type: "fill", title: "Azure subnet addressing for a hybrid DC",
    prompt: "You are adding subnet snet-identity 10.20.4.0/27 to an Azure virtual network for domain controllers. Fill in the values Azure will allow.",
    context: "Virtual network: vnet-hub  address space 10.20.0.0/16\nNew subnet:      snet-identity  10.20.4.0/27\nRequirement:     give DC01 the first address a VM can receive, as a static private IP",
    fields: [
      { label: "Number of addresses usable by VMs", answers: ["27"] },
      { label: "First address assignable to a VM (DC01)", answers: ["10.20.4.4"] },
      { label: "Address Azure uses as the subnet's default gateway", answers: ["10.20.4.1"] },
      { label: "Last address assignable to a VM", answers: ["10.20.4.30"] }
    ],
    explain: "A /27 has 32 addresses and Azure reserves five in every subnet: the network address (.0), the default gateway (.1), two addresses mapping Azure DNS (.2 and .3), and the broadcast address (.31). That leaves 32 - 5 = 27 usable, from .4 to .30. Set the DC's IP as static on the Azure NIC rather than inside the guest OS."
  },
  { id: "storage-tech-match", d: 5, type: "match", title: "Match storage requirements to features",
    prompt: "Match each file-services requirement to the Windows Server or Azure feature that meets it.",
    pairs: [
      ["Block-level synchronous replication of a volume to a server in a second building", "Storage Replica"],
      ["Multi-master, file-level replication of a namespace folder between branch servers", "DFS Replication"],
      ["Keep hot files on the local server and tier cold files to an Azure file share", "Azure File Sync"],
      ["Save space on a VDI library volume by storing identical chunks once", "Data Deduplication"],
      ["Pool local NVMe and SSD drives from four cluster nodes into shared storage", "Storage Spaces Direct"],
      ["Block users from saving .mp4 files and enforce a 5 GB folder quota", "File Server Resource Manager"]
    ],
    extra: ["BranchCache", "Volume Shadow Copy Service"],
    explain: "Storage Replica works below the file system, replicating blocks synchronously or asynchronously for disaster recovery. DFS-R replicates files and handles changes at multiple sites. Azure File Sync adds cloud tiering and multi-site sync with an Azure file share. Deduplication removes duplicate chunks within a volume, S2D builds software-defined storage from local disks, and FSRM provides quotas and file screens. BranchCache caches WAN content for clients and VSS provides snapshots, so neither meets these requirements."
  },
  { id: "share-ntfs-fill", d: 5, type: "fill", title: "Work out effective share and NTFS access",
    prompt: "Using the permissions below on FS01, answer Yes or No for each access question.",
    context: "Share \\\\FS01\\Finance  (path D:\\Finance)\n  Share permissions:  Everyone = Read ; FIN-Staff = Change\n\nNTFS permissions on D:\\Finance\n  FIN-Staff   = Modify (Allow)\n  Auditors    = Read & execute (Allow)\n  Contractors = Write (Deny)\n\nAlice: member of FIN-Staff\nBob:   member of Auditors\nDave:  member of FIN-Staff and Contractors",
    fields: [
      { label: "Can Alice edit a spreadsheet through \\\\FS01\\Finance? (Yes/No)", answers: ["Yes", "Y"] },
      { label: "Can Bob edit a spreadsheet through \\\\FS01\\Finance? (Yes/No)", answers: ["No", "N"] },
      { label: "Can Dave edit a spreadsheet through \\\\FS01\\Finance? (Yes/No)", answers: ["No", "N"] },
      { label: "Signed in locally on FS01, can Bob open files in D:\\Finance? (Yes/No)", answers: ["Yes", "Y"] }
    ],
    explain: "Over the network the effective access is the more restrictive of the combined share and combined NTFS permissions. Alice gets Change on the share and Modify in NTFS, so she can edit. Bob only has Read on both, and Dave's explicit NTFS Deny Write overrides his Modify allow. Locally, share permissions do not apply, so Bob's Read & execute lets him open files."
  },
  { id: "spray-events-select", d: 6, type: "select", title: "Spot password spraying in DC security logs",
    prompt: "These events were collected from domain controllers. Select every event that is part of a password-spraying attempt.",
    context: "Time (UTC)           EventID  Account      Client address  Detail\n2026-03-02 02:14:05  4771     a.baker      203.0.113.45    Kerberos pre-auth failed, code 0x18\n2026-03-02 02:14:06  4771     c.diaz       203.0.113.45    Kerberos pre-auth failed, code 0x18\n2026-03-02 02:14:06  4771     e.fong       203.0.113.45    Kerberos pre-auth failed, code 0x18\n2026-03-02 02:14:07  4771     svc-backup   203.0.113.45    Kerberos pre-auth failed, code 0x18\n2026-03-02 07:58:11  4771     j.smith      10.10.4.22      Kerberos pre-auth failed, code 0x18\n2026-03-02 07:58:40  4624     j.smith      10.10.4.22      Logon type 3 succeeded\n2026-03-02 09:02:13  4740     m.lee        WS-114          Account locked out",
    options: [
      "02:14:05 4771 a.baker from 203.0.113.45",
      "02:14:06 4771 c.diaz from 203.0.113.45",
      "02:14:06 4771 e.fong from 203.0.113.45",
      "02:14:07 4771 svc-backup from 203.0.113.45",
      "07:58:11 4771 j.smith from 10.10.4.22",
      "07:58:40 4624 j.smith from 10.10.4.22",
      "09:02:13 4740 m.lee locked out from WS-114"
    ],
    answers: [0, 1, 2, 3],
    explain: "Password spraying tries one or a few passwords against many accounts from the same source, staying under the lockout threshold. The four 0x18 (bad password) failures for different accounts from one external address within two seconds match that pattern. j.smith's single failure followed by a success from his own subnet is a typo, and one lockout from a workstation usually means stale saved credentials. Defend with smart lockout, MFA, banned-password lists and alerting on many-accounts-per-source failures."
  },
  { id: "authoritative-restore-order", d: 7, type: "order", title: "Recover a deleted OU without the Recycle Bin",
    prompt: "The Sales OU was deleted in contoso.example.com and the AD Recycle Bin was never enabled. Put the steps for an authoritative restore on DC02 in the correct order.",
    steps: [
      "Restart DC02 into Directory Services Restore Mode (DSRM) and sign in with the DSRM password",
      "Restore the system state from a backup taken before the deletion (wbadmin start systemstaterecovery)",
      "In ntdsutil, run activate instance ntds, then authoritative restore: restore subtree \"OU=Sales,DC=contoso,DC=example,DC=com\"",
      "Restart DC02 normally so the objects replicate out with their raised version numbers",
      "Import the LDIF file ntdsutil generated (ldifde -i) to restore back-links such as group memberships",
      "Verify with repadmin /showrepl and check the OU exists on other DCs"
    ],
    explain: "A system state restore alone is non-authoritative, so replication partners would delete the restored OU again. Marking the subtree authoritative in ntdsutil before the first normal boot raises the objects' version numbers so they win replication. Group memberships held in other domains' or groups' back-links are fixed afterward with the generated LDIF file. With the Recycle Bin enabled, Restore-ADObject would make this unnecessary."
  },
  { id: "perfmon-bottleneck-select", d: 7, type: "select", title: "Find the bottleneck in Performance Monitor data",
    prompt: "Users report that FS02 (32 GB RAM, file server) is slow. Select every counter value that indicates a resource bottleneck.",
    context: "Counter                                      Average over 30 min\nProcessor(_Total)\\% Processor Time           22 %\nSystem\\Processor Queue Length                 1\nMemory\\Available MBytes                      180\nMemory\\Pages/sec                             1450\nLogicalDisk(C:)\\Avg. Disk sec/Read           0.004\nLogicalDisk(D:)\\Avg. Disk sec/Read           0.048\nNetwork Interface(Ethernet)\\Output Queue Length  0",
    options: [
      "% Processor Time = 22 %",
      "Processor Queue Length = 1",
      "Available MBytes = 180",
      "Pages/sec = 1450",
      "C: Avg. Disk sec/Read = 0.004",
      "D: Avg. Disk sec/Read = 0.048",
      "Output Queue Length = 0"
    ],
    answers: [2, 3, 5],
    explain: "Only 180 MB free on a 32 GB server combined with sustained paging of 1450 pages/sec shows memory pressure. A read latency of 48 ms on D: is well above the usual 20-25 ms guideline, while 4 ms on C: is healthy. CPU at 22 % with a queue of 1 and an empty network output queue are normal. Check what is consuming memory before buying faster disks, because paging adds disk load."
  }
]);
