/* Lessons for Microsoft Certified: Windows Server Administrator Associate (exam AZ-802: Administering Windows Server) (AZ-802): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("az-802", [
 {
  "t": "Deploying domain controllers: Install-ADDSForest / Install-ADDSDomainController, install from media (IFM), read-only DCs, DCs on Azure VMs (static private IP on the NIC, NTDS on a data disk with host caching off)",
  "body": [
   "A domain controller (DC) is a Windows Server that holds a writable or read-only copy of the Active Directory Domain Services (AD DS) database, authenticates users and computers with Kerberos, and replicates changes with other DCs. Almost everything else in a Windows environment depends on DCs being healthy, so how you deploy them matters. Deployment is a two-step process: first you install the role binaries with `Install-WindowsFeature AD-Domain-Services -IncludeManagementTools`, then you promote the server, which creates or joins a domain.",
   "Promotion uses one of three PowerShell cmdlets from the ADDSDeployment module. `Install-ADDSForest` creates a brand-new forest and its first (root) domain; you supply `-DomainName`, `-DomainNetbiosName`, forest and domain modes, and a Directory Services Restore Mode (DSRM) password. `Install-ADDSDomainController` adds another DC to an existing domain, which is how you get redundancy. `Install-ADDSDomain` creates a new child or tree domain in an existing forest. Each cmdlet has a `Test-` twin (for example `Test-ADDSDomainControllerInstallation`) that runs the prerequisite checks without changing anything, and Server Manager's wizard can export the exact PowerShell it would run.",
   "Install from media (IFM) solves a bandwidth problem. A new DC normally pulls the whole database over the network during its first replication. With IFM you run `ntdsutil` on an existing DC (`activate instance ntds`, `ifm`, `create sysvol full C:\\IFM`) to produce a copy of the database and SYSVOL, carry it to the remote site, and promote with `-InstallationMediaPath`. Only changes made since the media was created then replicate across the WAN. Media from a writable DC can build a writable DC or an RODC; media created as RODC media can only build an RODC. Treat IFM media as highly sensitive, because it contains password hashes.",
   "A read-only domain controller (RODC) is designed for branch offices with weak physical security. It holds a read-only copy of the directory, does not cache passwords by default, and only caches credentials for accounts you allow in its Password Replication Policy (the Allowed and Denied RODC Password Replication Groups). You can delegate local administration of an RODC to a branch technician without making them a Domain Admin. Before you can add the first RODC, the forest must have a writable DC running a supported OS, and historically you needed `adprep /rodcprep`; modern promotion runs the required preparation automatically.",
   "Running DCs as Azure virtual machines extends your domain into the cloud, but Azure has specific rules. Give the VM a static private IP address on its network interface (NIC) in Azure, not inside the guest OS; the guest keeps using DHCP and Azure always hands it the same address. Point the virtual network's DNS servers at your DCs. Put the AD database (NTDS.dit), logs and SYSVOL on a separate managed data disk with host caching set to None, because the OS disk uses write caching, which can let AD believe data is written when it is not and risk corruption. Spread DCs across availability zones or an availability set, and define an AD site for the Azure subnet.",
   "```powershell\nInstall-WindowsFeature AD-Domain-Services -IncludeManagementTools\nInstall-ADDSDomainController -DomainName corp.contoso.com -InstallDns `\n  -DatabasePath F:\\NTDS -LogPath F:\\NTDS -SysvolPath F:\\SYSVOL `\n  -Credential (Get-Credential)\n```"
  ],
  "terms": [
   [
    "DSRM",
    "Directory Services Restore Mode: a special boot mode for offline AD maintenance, protected by a local password set during promotion."
   ],
   [
    "IFM",
    "Install from media: promoting a DC from an ntdsutil-created copy of the database so initial replication does not cross the WAN."
   ],
   [
    "RODC",
    "Read-only domain controller: holds a read-only directory copy and caches only passwords allowed by its Password Replication Policy."
   ],
   [
    "Password Replication Policy",
    "The allow and deny lists that decide which accounts' credentials an RODC may cache."
   ],
   [
    "Host caching",
    "An Azure disk setting (None, ReadOnly, ReadWrite); DC data disks holding NTDS should use None."
   ]
  ],
  "example": "A retailer adds a DC at a store with a slow link. The admin runs ntdsutil IFM on a hub DC, ships the encrypted media on a USB drive, and promotes an RODC with -InstallationMediaPath. Only a few megabytes of recent changes replicate, and only the store staff's passwords are cached locally.",
  "tip": "For Azure DCs, the static IP is set on the Azure NIC, not in the guest, and NTDS goes on a data disk with caching None. Answers that suggest setting a static IP inside Windows or keeping NTDS on the OS disk are the traps.",
  "check": [
   [
    "Which cmdlet creates the first DC of a new forest, and which adds a DC to an existing domain?",
    "Install-ADDSForest creates a new forest; Install-ADDSDomainController adds a DC to an existing domain."
   ],
   [
    "Why should NTDS.dit on an Azure VM live on a data disk with host caching set to None?",
    "The OS disk uses write-back caching, which can break AD's assumption that writes are durable and risks database corruption; a data disk with caching None avoids that."
   ],
   [
    "What limits which user passwords an RODC stores?",
    "Its Password Replication Policy, managed through the Allowed and Denied RODC Password Replication Groups and per-RODC settings."
   ]
  ]
 },
 {
  "t": "FSMO roles (schema master, domain naming master, RID master, PDC emulator, infrastructure master): placement, transfer vs seize",
  "body": [
   "Active Directory is multi-master: any writable DC can accept most changes. A few operations cannot safely happen in two places at once, so AD assigns them to single DCs called Flexible Single Master Operations (FSMO) role holders, also called operations masters. There are five roles. Two are forest-wide (one per forest) and three are domain-wide (one per domain).",
   "The forest-wide roles are the schema master, the only DC that can modify the schema (for example when installing Exchange or raising the forest to add new attributes), and the domain naming master, which controls adding and removing domains and application partitions. The domain-wide roles are the RID master, which hands out pools of relative identifiers (RIDs) to each DC so every new security principal gets a unique security identifier (SID); the PDC emulator, which is the authoritative time source for the domain (the forest root PDC should sync with an external time source), receives urgent password changes, processes account lockouts, and is the default target for Group Policy editing; and the infrastructure master, which updates references to objects in other domains.",
   "Placement guidance follows from what each role does. In a small environment it is fine to keep all five on one well-connected, well-protected DC. The PDC emulator should sit on a powerful DC in a central site because clients and other DCs contact it often. The RID master is usually placed with the PDC emulator. The classic rule says not to put the infrastructure master on a global catalog server unless every DC in the domain is a global catalog or the AD Recycle Bin is enabled, because a GC already holds all objects and the infrastructure master would never see stale references. Use `netdom query fsmo` or `Get-ADDomain` and `Get-ADForest` to see where roles live.",
   "Moving a role has two forms. A transfer is a graceful move while both the current and new holder are online: they replicate, hand over, and nothing is lost. You do this before planned maintenance or decommissioning. A seizure forces the new DC to take the role when the old holder is permanently gone. After a seizure, the old DC must never come back online as it was; you clean up its metadata and, if you ever recover it, rebuild it. Seizing the RID master in particular risks duplicate RID pools if the old holder reappears.",
   "```powershell\n# Transfer (both DCs online)\nMove-ADDirectoryServerOperationMasterRole -Identity DC2 -OperationMasterRole PDCEmulator,RIDMaster\n# Seize (old holder is dead)\nMove-ADDirectoryServerOperationMasterRole -Identity DC2 -OperationMasterRole SchemaMaster -Force\n```",
   "The same cmdlet does both jobs: without `-Force` it attempts a transfer; with `-Force` it seizes if a transfer fails. The older `ntdsutil` tool also offers `transfer` and `seize` commands under `roles`. Brief outages of most role holders go unnoticed, but losing the PDC emulator quickly shows up as time drift, lockout problems and password-change delays."
  ],
  "terms": [
   [
    "FSMO role",
    "A single-master operation in AD assigned to one DC per forest or domain."
   ],
   [
    "RID master",
    "Allocates pools of relative IDs to DCs so each new user, group or computer gets a unique SID."
   ],
   [
    "PDC emulator",
    "Domain-wide role handling time synchronization, urgent password changes, lockouts and GPO editing by default."
   ],
   [
    "Transfer",
    "A graceful role move while both the old and new holders are online."
   ],
   [
    "Seize",
    "A forced role takeover when the old holder is permanently unavailable; the old DC must not return."
   ]
  ],
  "example": "DC1, holding all five roles, suffers a failed motherboard and will be rebuilt from scratch. The admin seizes all roles to DC2 with Move-ADDirectoryServerOperationMasterRole -Force, runs metadata cleanup for DC1, and later promotes the rebuilt hardware as a new DC with a new name.",
  "tip": "Know which roles are per forest (schema, domain naming) and which are per domain (RID, PDC emulator, infrastructure). A forest with three domains therefore has 2 + (3 x 3) = 11 FSMO roles in total.",
  "check": [
   [
    "Which FSMO role is the authoritative time source for a domain and handles account lockouts?",
    "The PDC emulator."
   ],
   [
    "When should you seize rather than transfer a role?",
    "Only when the current holder is permanently offline and cannot be recovered; otherwise transfer so both DCs hand over cleanly."
   ],
   [
    "How many FSMO roles exist in a single-domain forest?",
    "Five: schema master and domain naming master (forest-wide) plus RID master, PDC emulator and infrastructure master (domain-wide)."
   ]
  ]
 },
 {
  "t": "Sites, subnets, site links, link cost and bridging; replication health with repadmin and dcdiag",
  "body": [
   "Active Directory sites describe your physical network so AD can make sensible decisions. A site is a set of well-connected IP subnets, typically one office or datacenter. Sites control two things: which DC a client talks to (clients prefer DCs in their own site for logon, a process called site coverage and DC locator), and how replication flows. Inside a site, DCs replicate quickly and uncompressed, triggered by change notification within seconds. Between sites, replication is compressed and runs on a schedule to save WAN bandwidth.",
   "To make this work, you create subnet objects (for example 10.20.0.0/16) and associate each with a site in Active Directory Sites and Services or with `New-ADReplicationSubnet`. A client's IP address is matched to a subnet, which tells it its site. A subnet that is missing from AD means clients in that range may authenticate against a distant DC, which is a common cause of slow logons.",
   "Site links connect sites and carry three important settings. The cost is a relative number: when there are multiple paths, AD chooses the path with the lowest total cost, so give fast links low costs and slow or backup links high costs. The replication interval (default 180 minutes, minimum 15) sets how often replication happens across the link. The schedule restricts when it may happen. The default site link, DEFAULTIPSITELINK, contains every site until you design your own.",
   "Site link bridging controls transitivity. By default, Bridge all site links is enabled, meaning that if Site A links to B and B links to C, AD can calculate a path from A to C by adding the costs. On networks that are not fully routed (for example, a firewall prevents A from reaching C directly), you disable that setting and create explicit site link bridges only where they reflect real connectivity. The Knowledge Consistency Checker (KCC) runs on every DC and builds the replication topology automatically; in each site, one DC acts as the Inter-Site Topology Generator (ISTG) and picks bridgehead servers for inter-site replication.",
   "Two tools check replication health. `repadmin` inspects and drives replication: `repadmin /replsummary` shows failures and largest deltas per DC, `repadmin /showrepl` lists inbound partners and last results, `repadmin /syncall /AdeP` forces a push across all partitions and sites, and `repadmin /queue` shows pending work. `dcdiag` runs a battery of tests on a DC: connectivity, advertising, services, SYSVOL, FSMO checks and more; `dcdiag /test:dns` focuses on DNS registration, which underlies most replication problems. PowerShell equivalents include `Get-ADReplicationFailure` and `Get-ADReplicationPartnerMetadata`.",
   "When repadmin reports errors, check DNS first (can each DC resolve its partner's GUID-based CNAME in _msdcs?), then network ports and time skew. A DC that has not replicated for longer than the tombstone lifetime is at risk of lingering objects and should usually be demoted and rebuilt rather than forced back into replication."
  ],
  "terms": [
   [
    "Site",
    "An AD object representing a set of well-connected subnets, used for client DC selection and replication scheduling."
   ],
   [
    "Site link cost",
    "A relative value AD sums along paths; the lowest total cost path is preferred."
   ],
   [
    "Site link bridge",
    "A way to make site links transitive; the default Bridge all site links setting makes all links transitive."
   ],
   [
    "KCC",
    "Knowledge Consistency Checker: the process on each DC that builds the replication topology automatically."
   ],
   [
    "repadmin /replsummary",
    "A command that summarizes replication status, failures and largest deltas for all DCs."
   ]
  ],
  "example": "Users in a new branch report slow logons. dcdiag passes, but the branch subnet 10.44.0.0/16 was never added in Sites and Services, so clients use a DC across the WAN. Creating the subnet and linking it to the Branch site fixes DC selection immediately.",
  "tip": "Lower cost wins. If a question gives two paths between sites, add the site link costs along each and pick the smaller. Remember inter-site replication follows the schedule and interval, while intra-site replication uses change notification.",
  "check": [
   [
    "What happens to clients whose IP address is not in any AD subnet?",
    "They cannot be mapped to a site and may use any DC, often a distant one, causing slow logons."
   ],
   [
    "When would you disable Bridge all site links?",
    "When the network is not fully routed, so AD should not assume every site can replicate to every other site transitively."
   ],
   [
    "Which command gives a quick summary of replication failures across all DCs?",
    "repadmin /replsummary."
   ]
  ]
 },
 {
  "t": "Forest, external, shortcut and realm trusts; transitivity and direction; selective authentication; SID filtering",
  "body": [
   "A trust is a relationship that lets users in one domain authenticate to resources in another. Trust vocabulary is directional and easy to mix up, so learn it precisely. The trusting domain holds the resources; the trusted domain holds the accounts. Access flows opposite to the trust direction: if Domain A trusts Domain B, users in B can be granted access to resources in A. A two-way trust is simply two one-way trusts. Inside a forest, every domain automatically has two-way transitive parent-child and tree-root trusts, so you only create trusts manually for other forests, other domains outside the forest, or non-Windows Kerberos realms.",
   "Transitivity means trust extends through chains. If A trusts B and B trusts C transitively, A effectively trusts C. There are four manual trust types. A forest trust links the root domains of two forests and is transitive across all domains in both forests (but not onward to a third forest). It requires both forests at a Windows Server 2003 forest functional level or higher and working DNS resolution in both directions, usually via conditional forwarders. An external trust links two specific domains in different forests, or a Windows NT style domain; it is non-transitive and uses NTLM-era mechanics. A shortcut trust is created between two domains in the same forest to shorten the Kerberos referral path in deep trees; it is transitive. A realm trust links a Windows domain to a non-Windows Kerberos v5 realm, such as a UNIX MIT Kerberos realm, and can be transitive or non-transitive.",
   "Selective authentication narrows who can cross a forest or external trust. With forest-wide (or domain-wide) authentication, any user in the trusted forest can authenticate to any computer in the trusting forest, then normal permissions apply. With selective authentication, users from the trusted side are denied by default, and you must grant the Allowed to authenticate permission on each specific computer object they may reach. This is the choice for partner and acquisition scenarios where you only want a few servers exposed.",
   "SID filtering protects the trusting side from SID history abuse. A user's access token can carry extra SIDs in its sIDHistory attribute (used during migrations). A malicious admin in a trusted forest could inject a privileged SID, such as your Domain Admins SID, into an account's history. SID filtering, also called quarantine, strips SIDs that do not belong to the trusted domain. It is on by default for external and forest trusts. You may temporarily relax it during a migration so migrated users keep access through SID history, using `netdom trust ... /quarantine:no` or `/enablesidhistory:yes` for forest trusts, and you should re-enable it afterwards.",
   "You create trusts in Active Directory Domains and Trusts or with `netdom trust`, and you validate them with the same tools or `Get-ADTrust`. Most trust failures come down to DNS: each side must be able to find the other's DCs, so set up conditional forwarders or stub zones first."
  ],
  "terms": [
   [
    "Trusting domain",
    "The domain holding resources that accepts authentication from another domain."
   ],
   [
    "Forest trust",
    "A transitive trust between two forest root domains covering every domain in both forests."
   ],
   [
    "Shortcut trust",
    "A manual transitive trust inside one forest that shortens Kerberos referral paths between distant domains."
   ],
   [
    "Selective authentication",
    "A trust setting requiring the Allowed to authenticate permission on each computer before trusted users can reach it."
   ],
   [
    "SID filtering",
    "Removing foreign SIDs, including sIDHistory values, from tokens crossing a trust to block privilege escalation."
   ]
  ],
  "example": "Contoso acquires Fabrikam. They build conditional forwarders, create a two-way forest trust, and enable selective authentication on the Contoso side so Fabrikam staff can reach only the three file servers granted Allowed to authenticate, while migrations with ADMT proceed in the background.",
  "tip": "Access flows opposite the trust arrow: 'A trusts B' means B's users can use A's resources. Forest and shortcut trusts are transitive; external trusts are not; realm trusts can be either.",
  "check": [
   [
    "Domain A trusts Domain B one-way. Whose users can access whose resources?",
    "Users in B (trusted) can be granted access to resources in A (trusting)."
   ],
   [
    "Which trust type would you use to connect to a UNIX MIT Kerberos realm?",
    "A realm trust."
   ],
   [
    "What does SID filtering protect against?",
    "A trusted domain injecting privileged SIDs, for example through sIDHistory, into tokens used in the trusting domain."
   ]
  ]
 },
 {
  "t": "Users, groups (domain local, global, universal), OUs and delegation of control; group managed service accounts and the KDS root key",
  "body": [
   "Users, computers and groups are the everyday objects of AD. Organizational units (OUs) are containers you create to organize those objects. OUs matter for two reasons: you link Group Policy Objects (GPOs) to them, and you delegate administrative control over them. The built-in Users and Computers containers are not OUs, so you cannot link GPOs to them; most organizations build an OU structure by location, department or object type and move objects into it.",
   "Groups have a type and a scope. Security groups can be used in permissions; distribution groups are only for email. Scope decides what a group can contain and where it can be used. A domain local group can contain accounts and groups from any trusted domain but can only be assigned permissions in its own domain, so it is ideal for resource permissions. A global group can contain only members from its own domain but can be used anywhere in the forest or trusting domains, so it is ideal for grouping people by role. A universal group can contain members from any domain in the forest and be used anywhere in the forest; its membership is stored in the global catalog, so keep universal membership stable.",
   "Microsoft's recommended nesting strategy is AGDLP: put Accounts in Global groups, put global groups in Domain Local groups, and assign Permissions to the domain local groups. In multi-domain forests, AGUDLP adds universal groups in the middle. This keeps permissions on resources short and lets you change who has access by changing global group membership.",
   "Delegation of control lets you give limited rights without making someone a Domain Admin. Right-click an OU, choose Delegate Control, pick a group (for example Helpdesk) and a task such as reset user passwords and force password change at next logon. The wizard writes access control entries on the OU. Always delegate to groups, not individuals, and review the result on the OU's Security tab under Advanced.",
   "Services often run under accounts with passwords that never change, which is a security risk. A group managed service account (gMSA) fixes this. AD generates and rotates a complex password automatically (every 30 days by default), and only the computers you list may retrieve it. Before creating the first gMSA, the domain needs a Key Distribution Services (KDS) root key, which DCs use to derive gMSA passwords. `Add-KdsRootKey -EffectiveImmediately` still waits up to 10 hours for replication; in a single-DC lab you can backdate it with `-EffectiveTime ((Get-Date).AddHours(-10))`, but do not do that in production.",
   "```powershell\nNew-ADServiceAccount -Name svcWeb -DNSHostName svcWeb.corp.contoso.com `\n  -PrincipalsAllowedToRetrieveManagedPassword WebServers\n# On a member of WebServers:\nInstall-ADServiceAccount svcWeb\nTest-ADServiceAccount svcWeb\n```\nThen set the service to log on as `CORP\\svcWeb$` with a blank password."
  ],
  "terms": [
   [
    "Domain local group",
    "A group whose permissions apply only in its own domain but which can contain members from any trusted domain."
   ],
   [
    "Global group",
    "A group containing members only from its own domain that can be used for permissions across the forest."
   ],
   [
    "Universal group",
    "A group with members from any domain in the forest, usable anywhere, with membership replicated to the global catalog."
   ],
   [
    "gMSA",
    "Group managed service account: a service identity whose password AD rotates and releases only to authorized hosts."
   ],
   [
    "KDS root key",
    "The domain key that Key Distribution Services uses to generate gMSA passwords; required once before the first gMSA."
   ]
  ],
  "example": "The helpdesk needs to unlock accounts and reset passwords for the Sales OU only. The admin runs Delegate Control on OU=Sales, grants the Helpdesk-Sales group Reset user passwords, and confirms that helpdesk staff cannot modify group memberships or other OUs.",
  "tip": "If New-ADServiceAccount fails with a key-related error, the answer is almost always that the KDS root key is missing or not yet effective. For group scope questions, remember AGDLP.",
  "check": [
   [
    "Which group scope should receive NTFS permissions on a file share in the AGDLP model?",
    "A domain local group."
   ],
   [
    "What must exist in the domain before you can create a gMSA?",
    "A KDS root key created with Add-KdsRootKey and effective (normally after replication)."
   ],
   [
    "Why can you not link a GPO to the default Users container?",
    "It is a container, not an OU; GPOs can only link to sites, domains and OUs."
   ]
  ]
 },
 {
  "t": "Default Domain Policy vs fine-grained password policies (PSOs); AD Recycle Bin",
  "body": [
   "Every domain needs a password and account lockout policy for its user accounts. For domain accounts, that policy comes from Group Policy settings under Computer Configuration, Policies, Windows Settings, Security Settings, Account Policies, and it only takes effect when the GPO is linked at the domain level. By convention it lives in the Default Domain Policy. If you link a GPO with password settings to an OU, it affects only the local accounts on computers in that OU, not domain users. That is the classic limitation: one password policy per domain.",
   "Fine-grained password policies remove that limitation. A Password Settings Object (PSO) holds the same settings (minimum length, complexity, history, maximum and minimum age, reversible encryption, lockout threshold, duration and observation window) and is applied directly to users or to global security groups. PSOs live in the Password Settings Container under System and require a domain functional level of Windows Server 2008 or higher. You create them most easily in Active Directory Administrative Center (ADAC) or with `New-ADFineGrainedPasswordPolicy`, and you link them with `Add-ADFineGrainedPasswordPolicySubject`.",
   "When more than one PSO could apply, precedence decides. Each PSO has a precedence number, and the lowest number wins. A PSO linked directly to a user always beats PSOs that reach the user through group membership. If no PSO applies, the domain policy from Group Policy applies. To see what a user actually gets, run `Get-ADUserResultantPasswordPolicy -Identity alice`. A PSO linked to an OU does nothing, because PSOs apply to users and groups only; the workaround is a shadow group that contains the OU's users.",
   "Deleted objects are the other half of this topic. Without the AD Recycle Bin, deleting an object strips most of its attributes (group memberships, for example) and turns it into a tombstone; getting it back fully means an authoritative restore from backup with the DC booted into Directory Services Restore Mode. The AD Recycle Bin, available at the Windows Server 2008 R2 forest functional level and higher, keeps deleted objects with all their attributes for the deleted object lifetime (by default the same as the tombstone lifetime, 180 days in modern forests), so you can restore them online.",
   "Enabling the Recycle Bin is a one-way change: once on, it cannot be turned off. You enable it in ADAC or with PowerShell, and it must replicate to all DCs before objects deleted afterwards are protected; objects deleted before you enabled it are not recoverable this way.",
   "```powershell\nEnable-ADOptionalFeature 'Recycle Bin Feature' -Scope ForestOrConfigurationSet -Target corp.contoso.com\nGet-ADObject -Filter 'samaccountname -eq \"jdoe\"' -IncludeDeletedObjects | Restore-ADObject\n```",
   "If a whole OU was deleted, restore the OU first and then its children, because a child cannot be restored into a parent that is still deleted. ADAC shows a Deleted Objects container where you can choose Restore or Restore To, which is often easier than PowerShell in a lab."
  ],
  "terms": [
   [
    "PSO",
    "Password Settings Object: a fine-grained password and lockout policy applied to users or global security groups."
   ],
   [
    "Precedence",
    "The PSO attribute that resolves conflicts; the lowest value wins, and a directly linked PSO beats group-linked ones."
   ],
   [
    "Resultant password policy",
    "The single policy that actually applies to a user, shown by Get-ADUserResultantPasswordPolicy."
   ],
   [
    "AD Recycle Bin",
    "An optional forest feature that preserves all attributes of deleted objects so they can be restored online."
   ],
   [
    "Tombstone",
    "A deleted object stripped of most attributes, kept only so the deletion can replicate before garbage collection."
   ]
  ],
  "example": "Security requires 16-character passwords for administrators while everyone else keeps 12. The admin creates a PSO with precedence 10 and minimum length 16, links it to the Tier0-Admins global group, and confirms with Get-ADUserResultantPasswordPolicy that admins get the PSO and regular users still get the Default Domain Policy.",
  "tip": "Password policy linked to an OU does not affect domain users, and PSOs cannot be linked to OUs. Also remember the Recycle Bin needs the 2008 R2 forest functional level and cannot be disabled once enabled.",
  "check": [
   [
    "Two PSOs with precedence 5 and 20 apply to a user through groups. Which wins?",
    "The PSO with precedence 5, because the lowest number wins (unless another PSO is linked directly to the user)."
   ],
   [
    "A PSO is linked to the Sales OU but has no effect. Why?",
    "PSOs apply only to users and global security groups, not OUs; use a shadow group containing the OU's users."
   ],
   [
    "What must you restore first when an entire OU and its users were deleted?",
    "The OU itself, then the child objects inside it."
   ]
  ]
 },
 {
  "t": "Hybrid identity: Entra Connect Sync (including staging mode) vs Entra Cloud Sync; password hash sync, pass-through authentication, seamless SSO",
  "body": [
   "Hybrid identity means one set of user identities used both on-premises (in AD DS) and in the cloud (in Microsoft Entra ID, formerly Azure AD). A synchronization engine copies users, groups and optionally devices from AD DS to Entra ID, and a sign-in method decides where passwords are checked. Microsoft offers two sync tools, and the exam expects you to know when to choose each.",
   "Microsoft Entra Connect Sync is the traditional tool: a full application installed on a domain-joined Windows Server, with a local SQL database and a sync engine you configure through a wizard and the Synchronization Service Manager. It supports the widest feature set, including pass-through authentication, federation with AD FS, device writeback, Exchange hybrid writeback and complex attribute filtering and rules. Only one Connect Sync server can actively export to a tenant. For resilience you install a second server in staging mode: it imports and synchronizes, building a full copy of the data, but does not export changes. If the active server fails, you switch the staging server to active. Staging mode is also how you safely preview a configuration change or an upgrade before it touches Entra ID.",
   "Microsoft Entra Cloud Sync moves the configuration and engine to the cloud. On-premises you install only lightweight provisioning agents, and you manage scoping (for example, one OU) and attribute mapping in the Entra admin center. Multiple agents give high availability automatically, and it handles disconnected forests (such as after a merger) well because each forest just needs an agent. It supports password hash sync and password writeback but does not offer the full list of Connect Sync features, so check requirements such as pass-through authentication or device writeback before choosing it. The two tools can coexist, for example Cloud Sync for a newly acquired forest while Connect Sync serves the main forest.",
   "Sign-in methods are the second decision. Password hash synchronization (PHS) syncs a hash of the AD password hash to Entra ID, so Entra ID validates sign-ins itself. It is the simplest option, keeps working if on-premises is down, and enables leaked credential detection. Pass-through authentication (PTA) keeps validation on-premises: lightweight agents make outbound connections and check each password against AD DS in real time, which enforces on-premises account states such as lockout, disabled accounts and logon hours immediately. Deploy several PTA agents for availability. Federation with AD FS hands authentication entirely to an on-premises federation farm and is chosen only for requirements the other methods cannot meet.",
   "Seamless single sign-on (Seamless SSO) is an add-on that works with PHS or PTA. It creates a computer account named AZUREADSSOACC in AD, and domain-joined devices on the corporate network get a Kerberos ticket for Entra ID so users are signed in without typing a password. Rotate that account's Kerberos decryption key periodically.",
   "A common design recommendation is to enable PHS even when you use PTA or federation, as a backup sign-in method and for leaked credential reports."
  ],
  "terms": [
   [
    "Entra Connect Sync",
    "An on-premises sync server with the full hybrid feature set; one active server per tenant."
   ],
   [
    "Staging mode",
    "A Connect Sync server that imports and syncs but does not export, used for failover and testing changes."
   ],
   [
    "Entra Cloud Sync",
    "Sync configured in the cloud using lightweight on-premises provisioning agents; suits multiple or disconnected forests."
   ],
   [
    "Pass-through authentication",
    "Sign-in method where on-premises agents validate passwords against AD DS in real time."
   ],
   [
    "Seamless SSO",
    "Kerberos-based automatic sign-in to Entra ID for domain-joined devices on the corporate network, using the AZUREADSSOACC account."
   ]
  ],
  "example": "A company must block cloud sign-in the moment an account is disabled on-premises and must honor logon hours. They choose pass-through authentication with three agents, keep password hash sync enabled as a fallback, and run a second Connect Sync server in staging mode for disaster recovery.",
  "tip": "If a scenario needs on-premises lockout, logon hours or disabled state enforced instantly at sign-in, the answer is PTA. If it needs sign-in to survive an on-premises outage with the least infrastructure, the answer is PHS. Disconnected forests with minimal footprint points to Cloud Sync.",
  "check": [
   [
    "What does a Connect Sync server in staging mode do?",
    "It imports and synchronizes data but does not export to Entra ID or AD, so it can take over on failure or be used to test changes."
   ],
   [
    "Which sign-in method keeps working if every on-premises server is offline?",
    "Password hash synchronization, because Entra ID validates the password itself."
   ],
   [
    "Which AD object does Seamless SSO create?",
    "A computer account named AZUREADSSOACC."
   ]
  ]
 },
 {
  "t": "Group Policy processing (LSDOU), Enforced and Block Inheritance, security filtering, loopback processing, Central Store, backup and restore",
  "body": [
   "Group Policy delivers settings to computers and users from Group Policy Objects (GPOs) linked to sites, domains and OUs. Understanding the order in which GPOs apply is the key to predicting results. The order is LSDOU: Local policy first, then Site, then Domain, then OUs from the top of the tree down to the OU that contains the object. Later GPOs overwrite earlier ones when settings conflict, so the GPO linked closest to the object normally wins. When several GPOs link to the same container, the one with link order 1 has the highest precedence and applies last.",
   "Two switches change normal inheritance. Block Inheritance is set on a domain or OU and stops GPOs linked higher up from flowing down to it. Enforced (formerly No Override) is set on a GPO link and does two things: that GPO cannot be blocked by Block Inheritance, and its settings win over conflicting settings from GPOs linked lower down. Enforced beats Block Inheritance. Use both sparingly; they make troubleshooting harder.",
   "Security filtering controls who a GPO applies to within its scope. By default a GPO applies to Authenticated Users. To target a group, remove Authenticated Users from the Security Filtering list and add the group. Since a security update in 2016, computers read GPOs in the computer's own security context, so if you remove Authenticated Users you must still grant Read (not Apply) to Authenticated Users or Domain Computers on the Delegation tab, or the GPO silently fails for everyone. WMI filters add conditions such as OS version, evaluated on the client.",
   "Loopback processing handles a special case. Normally user settings come from GPOs linked to the user's OU. On kiosks, lab PCs or Remote Desktop Session Hosts you want user settings based on the computer's location. Enabling the computer setting Configure user Group Policy loopback processing mode in a GPO linked to the computers' OU does this. Replace mode uses only the user settings from the computer's GPOs; Merge mode applies the user's normal settings and then the computer's user settings on top, so the computer's side wins conflicts.",
   "The Central Store is a folder, `\\\\corp.contoso.com\\SYSVOL\\corp.contoso.com\\Policies\\PolicyDefinitions`, holding ADMX and ADML administrative template files. Once it exists, every admin's Group Policy Management Editor uses the same templates instead of each workstation's local copy, and it replicates to all DCs with SYSVOL. Copy newer ADMX files there when you add templates for a new Windows or Office release.",
   "Back up GPOs in the Group Policy Management Console (GPMC) or with `Backup-GPO -All -Path D:\\GPOBackup`. `Restore-GPO` returns a GPO to a backed-up state, keeping its GUID. `Import-GPO` copies settings from a backup into a different or new GPO, which is how you move GPOs between domains or forests, optionally with a migration table to translate paths and security principals. Backups contain settings, not links, so record links separately. On clients, `gpupdate /force` refreshes policy and `gpresult /r` or `gpresult /h report.html` shows what applied and why."
  ],
  "terms": [
   [
    "LSDOU",
    "Group Policy application order: Local, Site, Domain, OU; later GPOs win conflicts."
   ],
   [
    "Enforced",
    "A GPO link option that prevents blocking and makes the GPO win over lower-level GPOs."
   ],
   [
    "Block Inheritance",
    "An OU or domain setting that stops non-enforced GPOs from parent containers applying."
   ],
   [
    "Loopback processing",
    "Applying user settings based on the computer's GPOs, in Replace or Merge mode."
   ],
   [
    "Central Store",
    "The PolicyDefinitions folder in SYSVOL that provides shared ADMX templates to all admins."
   ]
  ],
  "example": "Kiosk PCs in the Kiosks OU must give any user the same locked-down desktop. The admin links a GPO with lockdown user settings to the Kiosks OU and enables loopback processing in Replace mode, so users' normal OU policies are ignored when they sign in to a kiosk.",
  "tip": "Enforced wins over Block Inheritance every time. If a filtered GPO stopped applying after removing Authenticated Users, the fix is to give Authenticated Users or Domain Computers Read permission.",
  "check": [
   [
    "A domain GPO is Enforced and an OU has Block Inheritance. Does the domain GPO apply to objects in the OU?",
    "Yes. Enforced links cannot be blocked."
   ],
   [
    "What is the difference between loopback Replace and Merge?",
    "Replace uses only user settings from GPOs linked to the computer; Merge applies the user's normal settings then the computer's user settings, which win conflicts."
   ],
   [
    "Which cmdlet copies settings from a GPO backup into a GPO in another domain?",
    "Import-GPO (optionally with a migration table)."
   ]
  ]
 },
 {
  "t": "Migrating AD objects between domains and forests with ADMT and SID history; domain and forest functional levels when upgrading DCs",
  "body": [
   "Mergers, acquisitions and cleanups often require moving users, groups and computers from one domain or forest to another. The Active Directory Migration Tool (ADMT) is Microsoft's free tool for this. It is an older tool that has not been actively developed for years, but it remains the reference answer for restructuring migrations on the exam. ADMT runs on a member server in the target domain, needs a SQL Server instance for its database, and requires a trust between source and target so it can read the source and write to the target.",
   "The central problem is access. A migrated user gets a new SID in the target domain, but files, shares and ACLs in the source still reference the old SID. SID history solves this: ADMT copies the old SID into the new account's sIDHistory attribute, so the user's access token contains both SIDs and old permissions keep working during the transition. For SID history migration, auditing must be enabled in both domains, a local group named after the source domain with three dollar signs (for example `SOURCE$$$`) must exist in the source domain (ADMT can create it), and SID filtering must be relaxed on the trust. Remove SID history and restore SID filtering when migration is done.",
   "Passwords do not migrate by default. To keep users' existing passwords, you install the Password Export Server (PES) service on a DC in the source domain with a key generated by ADMT; otherwise ADMT sets new complex passwords and writes them to a file.",
   "A typical order is: migrate groups first (with SID history), then users (so ADMT can update group memberships as it goes), then service accounts, then computers, and finally run security translation, which rewrites ACLs, local profiles and group memberships on member servers to reference the new SIDs instead of the old ones. Migrating computers requires a reboot to join the target domain.",
   "Functional levels are the other half of this topic. The domain functional level (DFL) and forest functional level (FFL) set which AD features are available and which DC operating systems are allowed. A level can only be as high as the oldest DC in scope, so you raise it after all older DCs are gone. For example, fine-grained password policies need at least the 2008 DFL and the Recycle Bin needs the 2008 R2 FFL. Windows Server 2025 introduced a new functional level for the first time in years, while several recent releases reused the Windows Server 2016 level. Newer DC versions also require the existing forest to be at a minimum level before they can be promoted, so check that before you start.",
   "The usual upgrade path is not an in-place OS upgrade of DCs. Instead, add new DCs running the new version (promotion runs adprep schema and domain preparation automatically if you use an account in Schema Admins and Enterprise Admins), move FSMO roles to them, update DNS and DHCP settings that point at old DCs, demote the old DCs, and then raise the DFL and FFL with `Set-ADDomainMode` and `Set-ADForestMode`. Before adding modern DCs, SYSVOL must already replicate with DFS Replication rather than the old File Replication Service (FRS)."
  ],
  "terms": [
   [
    "ADMT",
    "Active Directory Migration Tool: migrates users, groups, computers and service accounts between domains or forests."
   ],
   [
    "SID history",
    "The sIDHistory attribute holding an account's previous SIDs so old resource permissions keep working after migration."
   ],
   [
    "Security translation",
    "ADMT step that replaces old SIDs with new ones in ACLs, profiles and group memberships on resources."
   ],
   [
    "Password Export Server",
    "A service installed on a source DC that lets ADMT migrate user passwords."
   ],
   [
    "Functional level",
    "Domain- or forest-wide setting that unlocks AD features and limits which DC OS versions may be present."
   ]
  ],
  "example": "After acquiring Fabrikam, Contoso creates a forest trust, relaxes SID filtering, installs PES on a Fabrikam DC and uses ADMT to migrate groups, then users with SID history and passwords. Users keep access to Fabrikam file servers until security translation updates the ACLs, after which SID history is cleared and filtering is re-enabled.",
  "tip": "SID history keeps access working; security translation makes it permanent. Functional levels depend on the oldest DC, and raising them is normally one-way, so questions about 'can we still add a Server 2012 R2 DC' turn on the current level.",
  "check": [
   [
    "Why migrate groups before users with ADMT?",
    "So that when users move, ADMT can add them to the already migrated target groups and preserve membership."
   ],
   [
    "What three prerequisites support SID history migration?",
    "Auditing enabled in both domains, the SOURCE$$$ local group in the source domain, and SID filtering relaxed on the trust (plus admin rights in both)."
   ],
   [
    "You still have one Windows Server 2012 R2 DC. Can you raise the domain functional level to Windows Server 2016?",
    "No. The level cannot exceed the version of the oldest DC in the domain; demote or upgrade that DC first."
   ]
  ]
 },
 {
  "t": "Windows Admin Center: desktop vs gateway mode, extensions, Kerberos constrained delegation, Windows Admin Center for Azure VMs and Arc-enabled servers",
  "body": [
   "Windows Admin Center (WAC) is Microsoft's browser-based management tool for Windows Server, failover clusters, hyperconverged clusters and Windows clients. It replaces many classic MMC consoles with one web interface and talks to managed nodes over PowerShell remoting and WMI over WinRM, so the managed servers need no agent. It is free with Windows Server licensing.",
   "WAC has two deployment shapes. In desktop mode you install it on a Windows client and only the local user uses it, typically by browsing to localhost on a port you choose. In gateway mode you install it on a Windows Server, and many administrators connect to it from their browsers over HTTPS; the gateway then connects on to managed servers. Gateway mode is what you use in production, often with a trusted TLS certificate, high availability on a failover cluster, and access control that restricts who may use the gateway and whether they are gateway administrators.",
   "Functionality is delivered by extensions. Core tools (Server Manager, Hyper-V, Storage, Certificates, Firewall, Events and so on) ship as built-in extensions, and Microsoft and partners publish more to a feed. A gateway administrator installs and updates them under Settings, Extensions. Hardware vendors often publish extensions for firmware and health monitoring.",
   "Authentication creates the classic double-hop problem. When you sign in to a gateway and it tries to use your credentials to reach a managed server, Kerberos does not by default let the gateway pass your identity on. You can type credentials for each server, but the better fix is resource-based Kerberos constrained delegation: on each managed node, allow the gateway computer account to delegate to it. After that, single sign-on flows from the browser through the gateway to the node.",
   "```powershell\n$gw = Get-ADComputer WAC01\nGet-ADComputer SRV01 | Set-ADComputer -PrincipalsAllowedToDelegateToAccount $gw\n```",
   "Windows Admin Center is also available from the Azure portal. For Azure VMs running Windows Server, you enable Windows Admin Center on the VM's blade, which deploys a VM extension; you then open it in the portal, signing in with Microsoft Entra ID, and access is controlled by Azure role-based access control (RBAC), using a role such as Windows Admin Center Administrator Login. The VM needs a network path for the connection, typically an inbound rule for the WAC port from the portal's service. For Azure Arc-enabled servers, the same portal experience works for on-premises or other-cloud machines through the Arc Connected Machine agent, with no need to open inbound ports to the internet, because the connection is brokered through Azure Arc.",
   "In a lab you will see the connection list, add servers by name, choose Manage as to supply credentials, and open tools from the left pane. If connections fail, check WinRM (`Test-WSMan SRV01`), firewall rules for WinRM over HTTP (5985) and the delegation settings."
  ],
  "terms": [
   [
    "Gateway mode",
    "WAC installed on Windows Server and shared by multiple administrators through their browsers."
   ],
   [
    "Desktop mode",
    "WAC installed on a Windows client for a single local user."
   ],
   [
    "Extension",
    "A plug-in that adds a tool or solution to Windows Admin Center, managed from the extension feed."
   ],
   [
    "Resource-based constrained delegation",
    "Kerberos setting on a target computer allowing a named account, such as the WAC gateway, to delegate to it."
   ],
   [
    "WAC in the Azure portal",
    "Managing Azure VMs or Arc-enabled servers through Windows Admin Center from the portal, with Entra ID sign-in and Azure RBAC."
   ]
  ],
  "example": "Admins complain they are prompted for credentials for every server when using the WAC gateway. The team runs Set-ADComputer -PrincipalsAllowedToDelegateToAccount on each managed server, naming the gateway's computer account, and single sign-on now flows through the gateway.",
  "tip": "Repeated credential prompts through a WAC gateway point to Kerberos constrained delegation. For on-premises servers you want to manage from the Azure portal without opening inbound internet ports, the answer is Azure Arc plus Windows Admin Center.",
  "check": [
   [
    "Which WAC mode should you choose so a team of admins can share one installation?",
    "Gateway mode on Windows Server."
   ],
   [
    "How do you prevent double-hop credential prompts through a WAC gateway?",
    "Configure resource-based Kerberos constrained delegation on managed nodes so the gateway computer account may delegate to them."
   ],
   [
    "What controls who can use Windows Admin Center for an Azure VM from the portal?",
    "Azure RBAC role assignments, such as Windows Admin Center Administrator Login, with Entra ID sign-in."
   ]
  ]
 },
 {
  "t": "PowerShell remoting: Enter-PSSession vs Invoke-Command, Just Enough Administration (JEA) role capability and session configuration files",
  "body": [
   "PowerShell remoting lets you run commands on other computers over Windows Remote Management (WinRM), which listens on TCP 5985 for HTTP and 5986 for HTTPS. On Windows Server it is enabled by default; on clients you run `Enable-PSRemoting`. In a domain, Kerberos authenticates the connection and the WinRM traffic is encrypted even over HTTP. Outside a domain you typically use HTTPS or add hosts to the TrustedHosts list.",
   "There are two main ways to use it. `Enter-PSSession -ComputerName SRV01` opens an interactive one-to-one session: your prompt changes to `[SRV01]: PS>` and everything you type runs remotely until `Exit-PSSession`. It is ideal for hands-on troubleshooting of one server. `Invoke-Command -ComputerName SRV01,SRV02,SRV03 -ScriptBlock { Get-Service Spooler }` is one-to-many: it runs a script block on many machines in parallel (32 at a time by default, adjustable with `-ThrottleLimit`) and returns deserialized objects tagged with a PSComputerName property. It suits automation and fan-out tasks. `New-PSSession` creates persistent sessions you can reuse with either cmdlet, keeping variables alive between commands.",
   "Returned objects are deserialized snapshots: you get property values but not live methods. And remoting has the second-hop problem: from inside a remote session you cannot use your Kerberos credentials to reach a third machine, such as a file share, unless you configure resource-based Kerberos constrained delegation or CredSSP. CredSSP works but sends reusable credentials to the remote host, so prefer delegation.",
   "Just Enough Administration (JEA) uses remoting to enforce least privilege. Instead of making helpdesk staff local administrators, you publish a constrained endpoint where they can run only the commands you allow, and those commands execute under a privileged temporary virtual account or a group managed service account. JEA has two files.",
   "The role capability file (`.psrc`, created with `New-PSRoleCapabilityFile`) defines what a role can do: `VisibleCmdlets` (optionally with allowed parameters and values), `VisibleFunctions`, `VisibleExternalCommands` and `VisibleProviders`. It must sit in a `RoleCapabilities` folder inside a PowerShell module on the target server, and its file name becomes the role name. The session configuration file (`.pssc`, created with `New-PSSessionConfigurationFile`) defines the endpoint: `SessionType = 'RestrictedRemoteServer'`, `RunAsVirtualAccount = $true` or `GroupManagedServiceAccount`, `TranscriptDirectory` for auditing, and `RoleDefinitions`, which map AD groups to role capabilities.",
   "```powershell\nNew-PSSessionConfigurationFile -Path .\\Helpdesk.pssc -SessionType RestrictedRemoteServer `\n  -RunAsVirtualAccount -TranscriptDirectory C:\\JEA\\Transcripts `\n  -RoleDefinitions @{ 'CORP\\Helpdesk' = @{ RoleCapabilities = 'ServiceOperator' } }\nRegister-PSSessionConfiguration -Name Helpdesk -Path .\\Helpdesk.pssc\n# User connects with:\nEnter-PSSession -ComputerName SRV01 -ConfigurationName Helpdesk\n```",
   "Connected users run in NoLanguage mode and see only the allowed commands; `Get-PSSessionCapability -ConfigurationName Helpdesk -Username CORP\\alice` shows what a given user will get. Test with `Test-PSSessionConfigurationFile` before registering."
  ],
  "terms": [
   [
    "WinRM",
    "Windows Remote Management: the service and protocol that carries PowerShell remoting on ports 5985 and 5986."
   ],
   [
    "Invoke-Command",
    "Runs a script block on one or many remote computers in parallel and returns the results."
   ],
   [
    "Role capability file",
    "A .psrc file defining the cmdlets, functions and commands a JEA role may use."
   ],
   [
    "Session configuration file",
    "A .pssc file defining a JEA endpoint: session type, run-as identity, transcripts and group-to-role mappings."
   ],
   [
    "Virtual account",
    "A temporary local administrator identity created for a JEA session and discarded when it ends."
   ]
  ],
  "example": "Helpdesk staff need to restart the print spooler on file servers but must not be admins. The admin creates a ServiceOperator.psrc allowing Restart-Service only with -Name Spooler, maps CORP\\Helpdesk to it in a .pssc, and registers the endpoint on each server with Invoke-Command.",
  "tip": "Interactive with one server means Enter-PSSession; many servers at once means Invoke-Command. For JEA, the .psrc says what (commands) and the .pssc says who and how (groups, run-as account, transcripts).",
  "check": [
   [
    "Which JEA file maps an AD group to a role?",
    "The session configuration file (.pssc), in its RoleDefinitions entry."
   ],
   [
    "Where must a role capability file be placed for JEA to find it?",
    "In a RoleCapabilities subfolder of a PowerShell module in a module path on the target server."
   ],
   [
    "You need to run the same command on 200 servers. Which cmdlet fits?",
    "Invoke-Command, which fans out in parallel with a throttle limit."
   ]
  ]
 },
 {
  "t": "Azure Arc-enabled servers: Connected Machine agent (azcmagent), at-scale onboarding with a service principal, extensions, tags and RBAC",
  "body": [
   "Azure Arc extends Azure's management plane to machines that are not Azure VMs: physical servers and VMs on-premises, in branch offices or in other clouds. Once a server is Arc-enabled, it appears in the Azure portal as a resource of type `Microsoft.HybridCompute/machines`, in a subscription and resource group you choose. You can then apply the same tools you use for Azure VMs: tags, Azure RBAC, Azure Policy, Update Manager, Azure Monitor, Microsoft Defender for Cloud and VM extensions.",
   "The bridge is the Azure Connected Machine agent, installed on each server. It includes the Hybrid Instance Metadata Service, the guest configuration (machine configuration) agent and the extension manager. It communicates only outbound over HTTPS (TCP 443) to Azure, optionally through a proxy or private endpoint, so you do not open inbound ports. Each Arc server gets a system-assigned managed identity that it can use to authenticate to Azure services. The subscription needs resource providers such as Microsoft.HybridCompute, Microsoft.GuestConfiguration and Microsoft.HybridConnectivity registered.",
   "The command-line tool is `azcmagent`. `azcmagent connect` links the machine to Azure, `azcmagent show` displays status and resource details, `azcmagent check` tests network connectivity to the required endpoints, `azcmagent disconnect` removes the connection, and `azcmagent config` controls local settings such as which extensions are allowed. For one or two servers, the portal generates a script that installs the agent and signs you in interactively.",
   "For many servers you onboard at scale with a service principal, an Entra ID identity for automation. Create one (the portal's Arc onboarding page can do it) and grant it the Azure Connected Machine Onboarding role, which allows it to onboard machines but not to manage them afterward. Then run the generated script through Configuration Manager, Group Policy, Ansible or your own tooling. It calls `azcmagent connect --service-principal-id <id> --service-principal-secret <secret> --resource-group ... --tenant-id ... --location ... --subscription-id ...`. Protect the secret, scope the role to one resource group, and give it a short expiry.",
   "Extensions add capabilities after onboarding, just as on Azure VMs. Common ones are the Azure Monitor Agent for logs and metrics, the Custom Script Extension, Microsoft Defender for Endpoint integration and the Key Vault extension for certificate sync. You can deploy extensions manually, or automatically with Azure Policy.",
   "Tags are name/value pairs you apply to the Arc resource (for example `Environment=Prod`, `Owner=Finance`) to filter, report costs and target policy. RBAC controls who may manage the Arc resource: Azure Connected Machine Resource Administrator can manage machines and extensions, Reader views them, and the Virtual Machine User Login and Virtual Machine Administrator Login roles can govern Entra ID sign-in where supported. Remember that Azure RBAC governs actions in Azure, while local Windows accounts and AD still govern who can sign in to the server itself."
  ],
  "terms": [
   [
    "Connected Machine agent",
    "The agent installed on non-Azure servers that connects them to Azure Arc over outbound HTTPS."
   ],
   [
    "azcmagent",
    "The command-line tool for connecting, checking and configuring the Arc agent."
   ],
   [
    "Service principal",
    "An Entra ID application identity used by scripts to onboard servers without interactive sign-in."
   ],
   [
    "Azure Connected Machine Onboarding",
    "A built-in role that allows onboarding Arc machines but not managing them."
   ],
   [
    "VM extension",
    "A small add-on application Azure deploys and manages on a VM or Arc-enabled server."
   ]
  ],
  "example": "A company with 400 on-premises Windows servers creates a service principal with the Azure Connected Machine Onboarding role scoped to the rg-arc-onprem resource group, pushes the onboarding script through Configuration Manager, tags each server by site, and uses Azure Policy to deploy the Azure Monitor Agent to all of them.",
  "tip": "Onboarding many servers without interactive sign-in points to a service principal with the Azure Connected Machine Onboarding role. Arc needs only outbound 443; if a question suggests opening inbound ports for Arc, it is wrong.",
  "check": [
   [
    "Which azcmagent command verifies that a server can reach the required Azure endpoints?",
    "azcmagent check."
   ],
   [
    "What least-privilege role should an onboarding service principal have?",
    "Azure Connected Machine Onboarding, scoped to the target resource group."
   ],
   [
    "Which network direction does the Connected Machine agent require?",
    "Outbound HTTPS (443) only; no inbound ports."
   ]
  ]
 },
 {
  "t": "Azure Policy and machine configuration for Arc-enabled and Azure servers; audit vs deploy effects",
  "body": [
   "Azure Policy evaluates Azure resources against rules and reports or enforces compliance. A policy definition is a JSON rule with a condition and an effect. An initiative (policy set) groups related definitions, such as a security baseline. An assignment applies a definition or initiative to a scope: a management group, subscription or resource group, with optional exclusions and parameters. Because Arc-enabled servers are Azure resources, the same assignments cover them alongside Azure VMs.",
   "The effect decides what happens when a resource matches. Audit logs non-compliance but changes nothing. AuditIfNotExists flags a resource when a related resource, such as an extension, is missing. Deny blocks create or update requests that violate the rule. Modify adds, changes or removes tags and certain properties. Append adds fields. DeployIfNotExists (DINE) deploys a related resource, for example installing the Azure Monitor Agent extension, when it is missing. Disabled turns the policy off, which is useful for testing.",
   "DINE and Modify are the deploy effects. They act automatically on new or updated resources, but existing non-compliant resources need a remediation task. Because the policy itself makes changes, its assignment needs a managed identity with the right RBAC roles; the portal creates it when you assign. A common rollout pattern is to assign in Audit first to measure impact, then switch to DeployIfNotExists and run remediation.",
   "Azure Policy by itself checks Azure Resource Manager properties, the outside of the machine. Machine configuration (formerly Azure Policy guest configuration) looks inside the operating system: installed applications, registry settings, password policy, certificates, services. It uses a small agent that is built into the Arc Connected Machine agent and is installed on Azure VMs as the machine configuration extension (Microsoft.GuestConfiguration), plus a system-assigned managed identity. Built-in policies can deploy both prerequisites for Azure VMs.",
   "Machine configuration assignments have their own modes. Audit only reports whether the OS matches. ApplyAndMonitor applies the configuration once and then reports drift. ApplyAndAutoCorrect applies it and corrects drift whenever it is detected. Configurations are packaged from PowerShell Desired State Configuration (DSC) and published for policy to reference, and Microsoft supplies built-in ones such as the Windows security baseline audit.",
   "Compliance appears on the Policy Compliance blade, per assignment and per resource, and evaluation runs periodically as well as when resources change. You can trigger an on-demand scan with `Start-AzPolicyComplianceScan`. For the exam, focus on choosing the right effect and remembering that existing resources need remediation."
  ],
  "terms": [
   [
    "Policy assignment",
    "The binding of a policy definition or initiative to a scope with parameters and exclusions."
   ],
   [
    "Initiative",
    "A group of policy definitions assigned and tracked together."
   ],
   [
    "DeployIfNotExists",
    "A policy effect that deploys a related resource when it is missing; needs a managed identity and remediation for existing resources."
   ],
   [
    "Remediation task",
    "A job that applies DeployIfNotExists or Modify changes to resources that already existed when the policy was assigned."
   ],
   [
    "Machine configuration",
    "Azure Policy's in-guest auditing and configuration of OS settings on Azure VMs and Arc-enabled servers."
   ]
  ],
  "example": "Compliance requires the Azure Monitor Agent on every server. The admin assigns a built-in DeployIfNotExists initiative at the subscription, which installs the agent on new Azure VMs and Arc servers automatically, then creates a remediation task to fix the 120 existing servers.",
  "tip": "Audit reports, Deny blocks, DINE and Modify change things. If a question says new resources are compliant but old ones are not, the missing step is a remediation task. Anything about settings inside Windows needs machine configuration.",
  "check": [
   [
    "Which effect should you use to install a missing extension automatically?",
    "DeployIfNotExists."
   ],
   [
    "Why does a DINE assignment need a managed identity?",
    "The policy deploys resources on your behalf and needs RBAC permissions to do so."
   ],
   [
    "Which machine configuration mode fixes drift every time it is detected?",
    "ApplyAndAutoCorrect."
   ]
  ]
 },
 {
  "t": "Azure Update Manager: assessments, one-time updates, maintenance configurations; hotpatching for Windows Server",
  "body": [
   "Azure Update Manager is Azure's unified service for Windows and Linux updates on Azure VMs and Azure Arc-enabled servers. It replaced the older Automation Update Management solution, which depended on the Log Analytics agent. Update Manager is built into Azure, needs no Automation account or Log Analytics workspace, and works through a VM extension that it installs when needed. You see all machines in one view, grouped by pending updates and compliance.",
   "Assessment is the first job. An assessment checks each machine for missing updates and reports them by classification (critical, security, update rollup and so on). You can run Check for updates on demand, or enable periodic assessment, which rechecks automatically about every 24 hours; a built-in Azure Policy can turn on periodic assessment across a subscription so new machines are covered.",
   "Installing updates happens in two ways. A one-time update (Update now or one-time install) lets you pick machines, classifications, included or excluded KB numbers, a maximum duration and reboot behavior, and run it immediately. It is ideal for an urgent patch. For routine patching you create a maintenance configuration: a schedule (start time, recurrence, time zone), a maintenance window length, the updates to include and the reboot setting. You then attach machines either statically or through dynamic scopes that pick machines by subscription, resource group, location, OS type or tags. Pre- and post-maintenance events can trigger scripts, such as draining a node from a load balancer.",
   "For Azure VMs, scheduled patching requires the VM's patch orchestration mode to be Customer Managed Schedules, which sets the patch mode to AutomaticByPlatform and allows your schedule to take control. If you leave Windows Update's own automatic settings in charge, your maintenance configuration may not apply as expected.",
   "Hotpatching installs security updates by patching code in memory of running processes, so most months need no reboot. It works on a cycle: a baseline month installs a full cumulative update and requires a restart, followed by hotpatch months that deliver security fixes without restarting. Baselines come quarterly, so a hotpatch-enabled server typically reboots about four times a year for planned updates, plus any unplanned baseline Microsoft releases for an urgent fix. Hotpatching is available for Windows Server Datacenter: Azure Edition on Azure (including Azure Local), and for Windows Server 2025 on-premises machines connected through Azure Arc as a paid subscription option that requires virtualization-based security. You manage hotpatch settings and see which months are baselines in Update Manager.",
   "When troubleshooting, look at update history for each machine, the extension status on the machine's Extensions blade, and the Windows event logs for Windows Update. Arc-enabled servers must be connected and have outbound access for the extension to work."
  ],
  "terms": [
   [
    "Periodic assessment",
    "Automatic recurring check (about every 24 hours) for missing updates on a machine."
   ],
   [
    "One-time update",
    "An immediate, ad hoc update installation on selected machines."
   ],
   [
    "Maintenance configuration",
    "A scheduled update policy with window, recurrence, update selection and reboot settings, applied to machines or dynamic scopes."
   ],
   [
    "Dynamic scope",
    "Rule-based machine selection for a maintenance configuration using subscription, resource group, location, OS or tags."
   ],
   [
    "Hotpatching",
    "Applying security updates in memory without a reboot, between quarterly baseline cumulative updates."
   ]
  ],
  "example": "An admin creates a maintenance configuration for the second Saturday of every month, 01:00 to 04:00, with dynamic scope tag PatchGroup=Web. Every Azure VM and Arc server with that tag is patched in that window, and a new web server is picked up automatically once it is tagged.",
  "tip": "Scheduled patching on an Azure VM will not work unless the patch orchestration is Customer Managed Schedules. Urgent single fixes point to one-time update; recurring windows point to a maintenance configuration.",
  "check": [
   [
    "What must you set on an Azure VM before a maintenance configuration can patch it on your schedule?",
    "Patch orchestration set to Customer Managed Schedules (patch mode AutomaticByPlatform with schedule bypass)."
   ],
   [
    "In a hotpatch cycle, which months require a reboot?",
    "Baseline months, when the full cumulative update is installed (roughly quarterly), plus any unplanned baseline."
   ],
   [
    "How can new machines be included in a patch schedule automatically?",
    "Use a dynamic scope on the maintenance configuration, for example based on tags."
   ]
  ]
 },
 {
  "t": "Azure Automation runbooks and hybrid runbook workers",
  "body": [
   "Azure Automation is a cloud service for running scripts, called runbooks, on a schedule or on demand. Everything lives in an Automation account, which holds runbooks, schedules, modules, and shared assets. Runbooks let you automate repetitive administration: shutting down test VMs at night, rotating keys, cleaning up old files or responding to alerts.",
   "Several runbook types exist. PowerShell runbooks run standard PowerShell scripts and are the most common. Python runbooks run Python scripts. Graphical runbooks are built by dragging activities onto a canvas. PowerShell Workflow runbooks are an older type based on Windows Workflow Foundation and are rarely chosen for new work. A runbook has a draft version you edit and test, and a published version that schedules and webhooks run. Publish after every change or your fix will not be used.",
   "Runbooks start in several ways: manually in the portal, from a schedule linked to the runbook, from a webhook (an HTTPS URL that starts the runbook, useful for alerts and external systems; the URL is shown only once when created, so store it securely), from an Azure Monitor alert, or from PowerShell with `Start-AzAutomationRunbook`. Shared assets keep secrets and settings out of code: credentials, variables (optionally encrypted), certificates and connections. To reach Azure resources, runbooks authenticate with the account's managed identity (`Connect-AzAccount -Identity`), which replaced the retired Run As accounts; grant that identity RBAC roles on what it must manage.",
   "By default runbooks run in an Azure sandbox, a Microsoft-hosted environment that cannot see your on-premises network. A hybrid runbook worker solves that. It is a Windows or Linux machine you designate, on-premises, in another cloud or in Azure, that pulls runbook jobs from Azure Automation over outbound HTTPS and runs them locally. That lets a runbook manage AD, file servers or anything else reachable from the worker. Workers belong to hybrid worker groups; when you start a runbook you choose Run on: Azure or a specific hybrid worker group, and any available worker in the group picks up the job, which gives you resilience.",
   "The current model is extension-based hybrid workers, installed as a VM extension on Azure VMs or Azure Arc-enabled servers. The older agent-based model relied on the Log Analytics agent, which is retired, so migrate to the extension-based model. Arc is therefore the usual path for on-premises workers: Arc-enable the server, then add it to a hybrid worker group.",
   "On a worker, jobs run as Local System by default. For tasks needing domain rights, set hybrid worker credentials on the group from a credential asset, or have the runbook use a credential asset itself. Modules a runbook needs must be installed on the worker machine, not only in the Automation account."
  ],
  "terms": [
   [
    "Automation account",
    "The Azure resource that holds runbooks, schedules, modules and shared assets."
   ],
   [
    "Runbook",
    "A PowerShell, Python or graphical script run by Azure Automation; only the published version runs in production."
   ],
   [
    "Webhook",
    "An HTTPS URL that starts a specific runbook when called, shown only once at creation."
   ],
   [
    "Hybrid runbook worker",
    "A machine you manage that runs Automation jobs locally so runbooks can reach on-premises resources."
   ],
   [
    "Hybrid worker group",
    "A set of hybrid workers; jobs targeted to the group run on any available member."
   ]
  ],
  "example": "Every night a runbook must disable AD accounts inactive for 90 days. The sandbox cannot reach the domain, so the admin Arc-enables two member servers, adds them to a hybrid worker group with a credential that has delegated rights, installs the ActiveDirectory module on both and schedules the runbook to run on that group.",
  "tip": "If a runbook must touch on-premises resources, the answer is a hybrid runbook worker. If a runbook change seems ignored, it was probably never published. For authenticating to Azure, choose the managed identity, not Run As.",
  "check": [
   [
    "Why can a runbook running in Azure not reach an on-premises file server?",
    "It runs in a Microsoft-hosted sandbox with no connectivity to your network; use a hybrid runbook worker."
   ],
   [
    "What is the recommended way to deploy a hybrid runbook worker on an on-premises server today?",
    "Arc-enable the server and deploy the extension-based hybrid worker to it."
   ],
   [
    "Which identity should a runbook use to manage Azure resources?",
    "The Automation account's managed identity, granted the needed RBAC roles."
   ]
  ]
 },
 {
  "t": "Storage Migration Service: inventory, transfer and cut over of file servers, including identity takeover",
  "body": [
   "Old file servers are among the hardest workloads to retire: they have years of data, share permissions, local groups and, worst of all, a server name and IP address that users, scripts and mapped drives depend on. Storage Migration Service (SMS) is a Windows Server feature that moves all of that to a new server in a guided, repeatable way, and it can make the new server take over the old one's identity so clients do not notice.",
   "SMS has three parts. The orchestrator is a Windows Server (2019 or later) running the Storage Migration Service feature; it coordinates the job and you drive it from Windows Admin Center's Storage Migration Service tool or PowerShell. The source is the old server, which can be a much older Windows Server release or even a Samba-based Linux server or NAS. The destination is the new Windows Server, on-premises or an Azure VM; installing the Storage Migration Service Proxy on a 2019-or-later destination speeds transfers. The account you use needs administrator rights on source, destination and orchestrator, and the firewalls must allow SMB, RPC and WMI traffic (the File and Printer Sharing, Netlogon and WMI rule groups).",
   "A migration job runs in three phases. Inventory connects to the source and records its shares, share settings, files and folders, security, local users and groups, and network configuration. You review the results in WAC before moving anything. Transfer copies data, shares and permissions to the destination volumes you map, and migrates local users and groups. You can run a transfer again later to copy only the files that changed, which keeps the final outage short. A validation option can check the destination before transfer.",
   "Cut over is the phase that makes SMS special. It moves the source's computer name and its IP addresses to the destination: the destination is renamed to the source's name, takes over its AD computer account identity and IP configuration, and the source is renamed to a new random or chosen name and given a different IP so it no longer conflicts. Both servers restart during this phase. Clients, DFS links and mapped drives that reference the old name or address simply start using the new server. Cut over is optional; you can stop after transfer if you prefer to change clients yourself.",
   "Plan for a maintenance window for cutover, confirm that you have local administrator credentials for both servers in case of domain trust issues during renames, and keep the old server offline but intact until users confirm everything works. Reports in WAC show per-file errors, typically files in use or path problems, so review them after each transfer.",
   "SMS can also migrate to Azure: WAC can create an Azure VM as the destination during the job, and you can combine SMS with Azure File Sync if you want a cloud-tiered file server afterwards. On the exam, SMS is the answer when the goal is to replace a file server while keeping its name, shares and permissions."
  ],
  "terms": [
   [
    "Orchestrator",
    "The Windows Server running Storage Migration Service that coordinates inventory, transfer and cutover."
   ],
   [
    "Inventory",
    "The SMS phase that collects shares, files, security and configuration from the source server."
   ],
   [
    "Transfer",
    "The SMS phase that copies data, shares, permissions and local accounts to the destination, repeatable for deltas."
   ],
   [
    "Cut over",
    "The SMS phase that moves the source's name and IP addresses to the destination and renames the source."
   ],
   [
    "SMS Proxy",
    "An optional service on the destination that improves transfer performance."
   ]
  ],
  "example": "A 2012 R2 file server FS01 must be replaced by a Windows Server 2025 VM. The admin runs inventory from WAC, does a first transfer on Monday and a delta transfer on Friday night, then runs cut over: the new VM becomes FS01 with the old IP, the old server is renamed, and users' mapped drives keep working on Monday.",
  "tip": "If a scenario wants a new file server to keep the old server's name and IP with minimal client changes, the answer is Storage Migration Service with cut over. Remember the orchestrator must be Windows Server 2019 or later.",
  "check": [
   [
    "Name the three phases of a Storage Migration Service job.",
    "Inventory, transfer and cut over."
   ],
   [
    "What happens to the source server during cut over?",
    "It is renamed and given a different IP address so the destination can take over its original name and IP."
   ],
   [
    "How do you keep the final downtime short when data changes constantly?",
    "Run an initial transfer early and a final delta transfer just before cut over."
   ]
  ]
 },
 {
  "t": "Azure Migrate: discovery and assessment, server migration of Hyper-V, VMware and physical servers to Azure",
  "body": [
   "Azure Migrate is a hub in the Azure portal for planning and executing moves to Azure. You create an Azure Migrate project, which stores the discovered inventory, assessments and migration state. Inside it are two main tools: Discovery and assessment, which tells you what you have and what it would take to run in Azure, and Migration and modernization (formerly Server Migration), which moves the servers.",
   "Discovery uses the Azure Migrate appliance, a lightweight VM or server you deploy on-premises from a downloaded template or installer script. You register it with the project and give it credentials: vCenter credentials for VMware, Hyper-V host or cluster credentials for Hyper-V, and server credentials for physical servers or other clouds. The appliance discovers servers agentlessly and collects configuration and performance data continuously. It can also inventory installed software, SQL Server instances and web apps, and run agentless dependency analysis to show which servers talk to which, so you can group servers that must move together. If you cannot deploy an appliance, you can import a CSV inventory for a rough assessment.",
   "An assessment evaluates a group of servers against Azure. For Azure VM assessments it reports readiness (ready, ready with conditions, not ready, unknown) with reasons such as unsupported OS or disk size, recommends VM sizes and disk types, and estimates monthly compute and storage cost. You choose sizing criteria: performance-based sizing uses collected utilization data, with a comfort factor for headroom, to right-size VMs; as on-premises sizing matches the current allocated cores and memory. Assessment settings include target region, reserved instances, Azure Hybrid Benefit and VM series. There are also assessment types for Azure SQL, Azure App Service and Azure VMware Solution.",
   "Migration works differently per source. For VMware, the agentless method uses the same appliance to replicate VM disks using vSphere snapshots; an agent-based method is also available. For Hyper-V, migration is agentless from the VM's point of view: you install the Azure Site Recovery provider and Recovery Services agent on the Hyper-V hosts or cluster nodes, and they replicate VM disks to Azure. For physical servers and VMs in other clouds, you deploy a replication appliance and install the Mobility service agent on each server, which is the agent-based method.",
   "The migration workflow is the same for all: enable replication and let initial replication and deltas run; do a test migration into an isolated Azure virtual network to confirm the VM boots and apps work; then migrate, which shuts down the source (optionally), performs a final sync and creates the Azure VM; finally choose Complete migration to stop replication and clean up. Afterwards you install the Azure VM agent if needed, adjust networking and DNS, and decommission the source.",
   "Azure Migrate itself is included with Azure; you pay for the resources you create. Check the current pricing page for details such as dependency analysis limits rather than memorizing numbers."
  ],
  "terms": [
   [
    "Azure Migrate project",
    "The container in Azure that holds discovered servers, assessments and migration status."
   ],
   [
    "Azure Migrate appliance",
    "An on-premises VM or server that discovers servers agentlessly and collects performance and dependency data."
   ],
   [
    "Performance-based sizing",
    "Assessment sizing from measured utilization rather than allocated resources."
   ],
   [
    "Mobility service",
    "The agent installed on physical or other-cloud servers for agent-based replication."
   ],
   [
    "Test migration",
    "Creating a copy of the migrated VM in an isolated network to validate before the real cutover."
   ]
  ],
  "example": "A company runs 150 Hyper-V VMs. They deploy the Azure Migrate appliance, run a month of performance collection, use dependency analysis to group a three-tier app, and create a performance-based assessment. They then install the replication provider on the Hyper-V hosts, replicate the group, test-migrate it into an isolated VNet and cut over on a weekend.",
  "tip": "Physical servers and other-cloud VMs need the agent-based method with the Mobility service. Hyper-V uses a provider installed on the hosts, not agents in guests. Always do a test migration before the real one.",
  "check": [
   [
    "Which sizing option right-sizes Azure VMs using actual utilization?",
    "Performance-based sizing."
   ],
   [
    "What must you install on Hyper-V hosts to migrate their VMs with Azure Migrate?",
    "The replication provider and Recovery Services agent (the Azure Site Recovery provider)."
   ],
   [
    "Which migration approach is used for physical servers?",
    "Agent-based migration through a replication appliance and the Mobility service installed on each server."
   ]
  ]
 },
 {
  "t": "Upgrading and migrating server roles (in-place upgrade paths, migrating DHCP, print and IIS workloads)",
  "body": [
   "When a Windows Server release approaches end of support you either upgrade in place or migrate. An in-place upgrade runs Setup on the existing server, keeping its name, roles, settings and data. A migration builds a new server and moves roles and data to it. Microsoft generally recommends migration (a clean install) for important workloads, because it avoids carrying old configuration forward and gives you an easy rollback: the old server still exists.",
   "In-place upgrade has rules. Historically you could jump at most two releases at a time, and recent releases support longer jumps, so always check the official upgrade matrix for your source and target. You cannot switch installation options (Server Core to Desktop Experience or the reverse) during an upgrade, and you cannot move from Datacenter to Standard. You can convert an evaluation edition to a licensed retail edition with `DISM /Online /Set-Edition`. Before upgrading: take a backup, check application and driver support, remove unsupported roles, and gather system information. Domain controllers have extra considerations, which is why adding new DCs and demoting old ones is the usual path. Azure VMs running Windows Server can also be upgraded in place using upgrade media attached as a data disk.",
   "DHCP is simple to migrate with PowerShell. On the old server, `Export-DhcpServer -File C:\\dhcp.xml -Leases` exports scopes, options, reservations and active leases. On the new server install the role, then `Import-DhcpServer -File C:\\dhcp.xml -BackupPath C:\\dhcpbak -Leases`. Authorize the new server in AD (`Add-DhcpServerInDC`), stop and unauthorize the old one, and update any DHCP relay (IP helper) addresses on routers. If you use DHCP failover, reconfigure the relationship on the new servers.",
   "Print servers migrate with the Printer Migration Wizard in Print Management or the command-line tool `printbrm`. `printbrm -b -s \\\\OLDPRINT -f C:\\print.printerExport` backs up queues, ports, drivers and settings, and `printbrm -r -s \\\\NEWPRINT -f C:\\print.printerExport` restores them. Drivers must suit the new OS architecture (64-bit), and you then redeploy printers via Group Policy or change the DNS alias.",
   "IIS web workloads move with Web Deploy (`msdeploy`), which can sync sites, application pools, configuration and content from one server to another, or package them to a file. Remember to export and import TLS certificates with private keys, recreate any service accounts (ideally as gMSAs), and install the same IIS role services and features. For farms, IIS shared configuration and a load balancer let you add new servers and drain old ones without downtime.",
   "Whatever the role, the pattern is the same: inventory, build new, move configuration and data, test, switch clients (DNS, DHCP relay, GPO), keep the old server as rollback, then decommission. File servers use Storage Migration Service; AD uses new DCs plus FSMO moves."
  ],
  "terms": [
   [
    "In-place upgrade",
    "Upgrading the OS on the existing server while keeping roles, settings and data."
   ],
   [
    "Export-DhcpServer",
    "PowerShell cmdlet exporting DHCP configuration and optionally leases to an XML file."
   ],
   [
    "Add-DhcpServerInDC",
    "Authorizes a DHCP server in AD so it may hand out leases in the domain."
   ],
   [
    "printbrm",
    "Command-line printer backup and restore tool used for print server migration."
   ],
   [
    "Web Deploy",
    "Microsoft tool (msdeploy) that syncs or packages IIS sites, configuration and content between servers."
   ]
  ],
  "example": "An admin replaces an old DHCP server with a new VM: Export-DhcpServer with -Leases on the old box, Import-DhcpServer on the new one, Add-DhcpServerInDC for the new server, then updates the IP helper addresses on the core switches and unauthorizes the old server.",
  "tip": "A new DHCP server that will not hand out leases in a domain usually has not been authorized in AD. For in-place upgrades, watch for edition changes and Server Core to Desktop Experience switches, which are not allowed.",
  "check": [
   [
    "Which switch makes Export-DhcpServer include active leases?",
    "-Leases."
   ],
   [
    "Can an in-place upgrade change a server from Server Core to Desktop Experience?",
    "No. The installation option cannot change during upgrade; you would need a clean install."
   ],
   [
    "Which tool backs up and restores print queues, ports and drivers?",
    "printbrm (or the Printer Migration Wizard in Print Management)."
   ]
  ]
 },
 {
  "t": "Hyper-V VM configuration: generation 1 vs 2, dynamic memory, integration services, enhanced session mode, Secure Boot and virtual TPM",
  "body": [
   "When you create a Hyper-V virtual machine, the first and permanent choice is its generation. Generation 1 VMs emulate a traditional BIOS PC: they boot from an IDE controller, can use legacy network adapters for PXE, and support 32-bit guest operating systems. Generation 2 VMs use UEFI firmware, boot from SCSI disks, PXE boot with the standard synthetic network adapter, and support Secure Boot and a virtual TPM. Generation 2 has no IDE or legacy devices at all. You cannot change a VM's generation after creation, so choose generation 2 for any modern 64-bit Windows or Linux guest, and generation 1 only for old or 32-bit guests or if you must reuse an old VHD boot disk.",
   "Dynamic memory lets Hyper-V adjust a VM's RAM while it runs. You set startup memory (what the VM gets at boot), minimum memory (how low Hyper-V may reclaim), maximum memory (the ceiling), a memory buffer (the percentage of extra memory Hyper-V tries to keep available to the VM) and memory weight (priority when the host is short). The guest needs integration services to cooperate, via a memory ballooning driver. Startup memory can be higher than minimum because many OSes need more to boot than to idle. Some workloads, such as certain database servers, should use static memory per vendor guidance.",
   "Integration services are drivers and services in the guest that talk to the host over the VMBus. They include operating system shutdown (clean shutdown from the host), time synchronization, data exchange (key-value pairs between host and guest), heartbeat, backup (Volume Shadow Copy integration for application-consistent backups and production checkpoints) and guest service interface (lets `Copy-VMFile` push files into the guest). Modern Windows guests receive integration components through Windows Update. You enable or disable each service per VM with `Enable-VMIntegrationService`. Time sync is usually disabled for DCs so they follow the domain time hierarchy instead of the host.",
   "Enhanced session mode makes Virtual Machine Connection (VMConnect) use a Remote Desktop Protocol session over the VMBus. You get clipboard sharing, resizable displays, audio and redirection of local drives, printers and USB devices, even when the VM has no network connection. It must be allowed in the host's Hyper-V settings and supported by the guest.",
   "Secure Boot, available on generation 2 VMs, verifies that the boot loader and early components are signed by trusted keys, blocking bootkits. The template matters: Microsoft Windows for Windows guests, Microsoft UEFI Certificate Authority for most Linux distributions. A Linux VM that will not boot often has the wrong template. A virtual TPM (vTPM) gives the guest a TPM 2.0 device for BitLocker, Windows 11 requirements, Credential Guard and measured boot. Enabling it requires a key protector, which in a lab you create locally.",
   "```powershell\nSet-VMKeyProtector -VMName APP01 -NewLocalKeyProtector\nEnable-VMTPM -VMName APP01\nSet-VMFirmware -VMName LNX01 -SecureBootTemplate MicrosoftUEFICertificateAuthority\n```\nIn production, shielded VMs protected by a Host Guardian Service store keys centrally so VMs run only on approved hosts."
  ],
  "terms": [
   [
    "Generation 2 VM",
    "A UEFI-based Hyper-V VM with SCSI boot, Secure Boot and vTPM support; generation cannot be changed later."
   ],
   [
    "Dynamic memory",
    "Hyper-V feature that adjusts VM RAM between minimum and maximum based on demand, with startup memory and buffer settings."
   ],
   [
    "Integration services",
    "Guest components such as shutdown, time sync, heartbeat, data exchange, backup and guest services that communicate over VMBus."
   ],
   [
    "Enhanced session mode",
    "VMConnect sessions over RDP through the VMBus, adding clipboard, drives and device redirection."
   ],
   [
    "Virtual TPM",
    "An emulated TPM 2.0 device for a generation 2 VM, protected by a key protector."
   ]
  ],
  "example": "A new Ubuntu generation 2 VM stops at a Secure Boot violation message. The admin changes the Secure Boot template to Microsoft UEFI Certificate Authority with Set-VMFirmware, and the VM boots normally.",
  "tip": "32-bit guest or legacy PXE means generation 1. BitLocker in the guest, Secure Boot or Windows 11 means generation 2 with vTPM. Generation cannot be converted after creation.",
  "check": [
   [
    "Which dynamic memory value controls how much RAM a VM has at boot?",
    "Startup memory."
   ],
   [
    "Which integration service is needed for Copy-VMFile?",
    "Guest service interface."
   ],
   [
    "A Linux generation 2 VM fails Secure Boot. What is the likely fix?",
    "Change the Secure Boot template to Microsoft UEFI Certificate Authority (or disable Secure Boot if the distro is unsigned)."
   ]
  ]
 },
 {
  "t": "Nested virtualization requirements; PowerShell Direct",
  "body": [
   "Nested virtualization means running Hyper-V inside a Hyper-V virtual machine, so that VM can host its own VMs. It is used for labs and training, testing Hyper-V clusters without extra hardware, running Windows containers with Hyper-V isolation inside a VM, and building environments in Azure. Performance is lower than on bare metal, so it is generally used for development, test and training rather than heavy production.",
   "Requirements come on both levels. The physical host needs a CPU with hardware virtualization and second-level address translation: Intel VT-x with EPT, or AMD-V with RVI on processors and Windows versions that support nested virtualization on AMD (support arrived later for AMD than for Intel). The host and the VM that will run Hyper-V must be recent Windows Server or Windows versions, and the VM should use a recent configuration version. The VM must be turned off when you enable the feature.",
   "```powershell\nSet-VMProcessor -VMName HV-NESTED -ExposeVirtualizationExtensions $true\nSet-VMMemory -VMName HV-NESTED -DynamicMemoryEnabled $false -StartupBytes 8GB\nGet-VMNetworkAdapter -VMName HV-NESTED | Set-VMNetworkAdapter -MacAddressSpoofing On\n```",
   "Each line solves a known issue. Exposing virtualization extensions passes the CPU features into the VM so Hyper-V can install there. Dynamic memory is not supported for a VM running nested Hyper-V, so give it static memory with enough RAM for its own VMs. Networking for the inner VMs needs either MAC address spoofing enabled on the outer VM's adapter (so frames from inner VMs with their own MAC addresses are allowed out) or a NAT virtual switch inside the outer VM. Some other features, such as checkpoints or live migration of the nested host, have been restricted in some versions, so check the documentation for your release. In Azure, only VM sizes that support nested virtualization can run Hyper-V inside, and many current general-purpose and memory-optimized sizes do.",
   "PowerShell Direct is a different feature that also uses the host-to-guest channel. It lets you run PowerShell inside a VM from its Hyper-V host over the VMBus, without any network connectivity, remote management configuration or firewall rules in the guest. That is invaluable when a VM's network is misconfigured, it is on an isolated or private switch, or you are automating the first configuration of a freshly deployed VM.",
   "You use the familiar remoting cmdlets but target the VM instead of a computer: `Enter-PSSession -VMName DC01`, `Invoke-Command -VMName DC01 -ScriptBlock { ... }`, or `-VMId` with the VM's GUID. You can also create a session with `New-PSSession -VMName` and copy files with `Copy-Item -ToSession`. Requirements: you must run the command on the Hyper-V host that runs the VM, as a Hyper-V administrator; the VM must be running and the guest OS must be Windows 10 or Windows Server 2016 or later; and you must supply credentials valid inside the guest, because PowerShell Direct does not pass host credentials into the VM."
  ],
  "terms": [
   [
    "Nested virtualization",
    "Running Hyper-V inside a VM so that VM can host its own VMs."
   ],
   [
    "ExposeVirtualizationExtensions",
    "Set-VMProcessor parameter that passes hardware virtualization features into a VM."
   ],
   [
    "MAC address spoofing",
    "Allowing a VM adapter to send frames with MAC addresses other than its own, needed for inner VM networking."
   ],
   [
    "PowerShell Direct",
    "Running PowerShell in a VM from its Hyper-V host over VMBus with no network required."
   ],
   [
    "VMBus",
    "The high-speed channel between a Hyper-V host and its guests used by integration services and PowerShell Direct."
   ]
  ],
  "example": "A trainer builds a two-node failover cluster lab on a single laptop. She creates two VMs, turns them off, exposes virtualization extensions, gives each 8 GB static memory, enables MAC spoofing, installs Hyper-V inside both and configures them with Invoke-Command -VMName before their networking is even set up.",
  "tip": "Nested Hyper-V fails to install inside a VM when ExposeVirtualizationExtensions is not set (and the VM must be off to set it). Inner VMs with no network usually point to missing MAC address spoofing. PowerShell Direct needs guest credentials and must run on the same host.",
  "check": [
   [
    "What must be true of the VM before you run Set-VMProcessor -ExposeVirtualizationExtensions $true?",
    "It must be turned off."
   ],
   [
    "Why enable MAC address spoofing on a VM that hosts nested VMs?",
    "So network frames from the inner VMs, which use their own MAC addresses, are allowed through the outer VM's adapter."
   ],
   [
    "Can you use PowerShell Direct from your admin workstation to a VM on a remote host?",
    "No. It works only from the Hyper-V host running the VM (though you could remote to the host first)."
   ]
  ]
 },
 {
  "t": "Virtual disks: VHD vs VHDX, fixed, dynamic and differencing disks; shared VHDX / VHD Set",
  "body": [
   "A Hyper-V virtual hard disk is a file on the host that the VM sees as a physical disk. There are two formats. VHD is the original format, limited to about 2 TB (2,040 GB) and 512-byte sectors; it survives mainly for compatibility with older systems and some tools. VHDX, introduced with Windows Server 2012, supports disks up to 64 TB, 4 KB logical sectors that match modern physical disks, an internal metadata log that protects against corruption after a power failure, and TRIM/UNMAP so freed space can be returned to the storage. Generation 2 VMs boot only from VHDX. Use VHDX unless you have a specific reason not to.",
   "Each disk also has a type. A fixed-size disk allocates all its space up front: a 100 GB fixed disk is a 100 GB file immediately. It gives predictable performance and cannot run the host out of space later, which is why it is often preferred for production databases. A dynamically expanding disk starts small and grows as data is written, up to its maximum size. It saves space, and with VHDX its performance is close to fixed, but you must monitor the host volume because overcommitted dynamic disks can fill it and pause VMs.",
   "A differencing disk is a child disk that records only the changes relative to a read-only parent disk. Many VMs can share one parent (for example a sysprepped base image), each with its own small child. Rules: never modify the parent, or every child breaks; keep parent and child reachable; and understand that a long chain slows I/O. You can merge a child into its parent with `Merge-VHD` when you no longer need the separation. Checkpoints use the same mechanism with AVHDX files.",
   "Useful cmdlets: `New-VHD -Path D:\\VMs\\data.vhdx -SizeBytes 200GB -Dynamic` (or `-Fixed`, or `-ParentPath` for differencing), `Convert-VHD` to change format or type (the VM must be off for that disk), `Resize-VHD` to grow or shrink (VHDX attached to a SCSI controller can be resized while the VM runs), `Optimize-VHD` to compact a dynamic disk, and `Mount-VHD` to attach a disk to the host for offline servicing.",
   "Guest clustering, where two or more VMs form a failover cluster, needs a disk that all nodes can use at once. Shared VHDX, introduced in Windows Server 2012 R2, allowed a VHDX to be attached to several VMs. It had limits: no online resize, no host-level backup and no Hyper-V Replica. Windows Server 2016 introduced the VHD Set (a `.vhds` file plus a backing `.avhdx` file) as its replacement. VHD Sets support online resizing, host-based backup and Hyper-V Replica, and they are the choice for new guest clusters. Store them on Cluster Shared Volumes or a Scale-Out File Server SMB share, attach them to each VM's SCSI controller, and enable persistent reservations. You can convert an existing shared VHDX to a VHD Set with `Convert-VHD` while the VMs are off."
  ],
  "terms": [
   [
    "VHDX",
    "Hyper-V disk format supporting up to 64 TB, 4 KB sectors, corruption-resistant metadata and TRIM."
   ],
   [
    "Fixed-size disk",
    "A virtual disk that allocates its full size at creation for predictable performance."
   ],
   [
    "Dynamically expanding disk",
    "A virtual disk that grows as data is written, up to its configured maximum."
   ],
   [
    "Differencing disk",
    "A child disk storing only changes relative to a read-only parent."
   ],
   [
    "VHD Set",
    "A .vhds shared disk format for guest clusters supporting online resize, host backup and Hyper-V Replica."
   ]
  ],
  "example": "A training lab needs 20 identical Windows Server VMs on limited storage. The admin generalizes one VM with Sysprep, marks its VHDX read-only as a parent and creates 20 small differencing disks from it, saving hundreds of gigabytes. For a separate two-node guest SQL cluster, he uses a VHD Set on a CSV.",
  "tip": "Guest cluster shared storage that must support online resize, host backup or replica is a VHD Set, not shared VHDX. Disks over 2 TB or for generation 2 boot must be VHDX.",
  "check": [
   [
    "What is the maximum size of a VHDX disk?",
    "64 TB (VHD is limited to about 2 TB)."
   ],
   [
    "What happens to differencing children if their parent disk is modified?",
    "They become invalid, because each child records changes relative to the parent's exact original state."
   ],
   [
    "Which shared disk option should you use for a new guest cluster on Windows Server 2016 or later?",
    "A VHD Set (.vhds)."
   ]
  ]
 },
 {
  "t": "Checkpoints: production vs standard; why checkpoints are not backups",
  "body": [
   "A Hyper-V checkpoint (called a snapshot in older versions) captures a VM's state at a point in time so you can return to it later. It is perfect for short-term safety nets: before installing an update, testing a configuration change, or during a lab exercise. When you take a checkpoint, Hyper-V stops writing to the current virtual disk and creates a differencing disk (an `.avhdx` file) for all new writes; the original disk becomes a read-only parent.",
   "There are two types. A standard checkpoint captures the disk and the full memory and device state of a running VM, like pausing and saving it. Applying it returns the VM exactly where it was, even with applications open. The downside is that applications inside, such as databases or domain controllers, did not know a checkpoint happened, so returning to one can confuse replication or transactions. A production checkpoint uses the Volume Shadow Copy Service (VSS) inside Windows guests, or a file system freeze in Linux guests, to create an application-consistent point in time. It does not include memory, so applying it starts the VM from a clean boot, as if restored from backup. Production checkpoints need the backup integration service.",
   "Production is the default for new VMs, with fallback to standard if a production checkpoint cannot be taken. You change the behavior per VM in its settings or with `Set-VM -CheckpointType Production`, `ProductionOnly` (fail rather than fall back), `Standard` or `Disabled`. You manage checkpoints with `Checkpoint-VM -Name APP01 -SnapshotName BeforePatch`, `Restore-VMCheckpoint` and `Remove-VMCheckpoint`. When you delete a checkpoint, Hyper-V merges its AVHDX changes back into the parent in the background. Never delete AVHDX files manually in File Explorer; that breaks the chain and can lose data.",
   "Checkpoints are not backups, and exam questions frequently test why. They live on the same storage as the VM, so a failed volume or ransomware on the host destroys both. They depend on the parent disk chain; if the base VHDX is lost or corrupted, every checkpoint is useless. They cannot be moved off-host or kept on a retention schedule. And they hurt performance and consume space as the chain grows, so they are meant to be temporary, measured in hours or days, not months.",
   "Real backups copy data to separate storage, ideally off-site, with retention and verified restores: Windows Server Backup, Azure Backup, the Microsoft Azure Recovery Services (MARS) agent, Azure Backup Server or third-party products. Those products often use production checkpoints internally to get a consistent point in time, then copy the data elsewhere and remove the checkpoint.",
   "Domain controllers deserve a note. Since Windows Server 2012, virtualization-aware DCs use the VM-GenerationID to detect that they have been reverted and protect themselves against update sequence number rollback. Even so, reverting DCs with checkpoints is discouraged; use proper AD backups."
  ],
  "terms": [
   [
    "Standard checkpoint",
    "Captures disk plus memory and device state; restores the VM exactly as it was, but not application-consistent."
   ],
   [
    "Production checkpoint",
    "Uses VSS or a file system freeze for an application-consistent point in time without memory; restores to a cold boot."
   ],
   [
    "AVHDX",
    "The differencing disk file created for each checkpoint to hold new writes."
   ],
   [
    "Checkpoint merge",
    "Background process that folds AVHDX changes into the parent when a checkpoint is deleted."
   ],
   [
    "VM-GenerationID",
    "A value that lets a virtualized DC detect it has been rolled back and protect AD replication."
   ]
  ],
  "example": "Before a risky application update, an admin takes a production checkpoint of APP01. The update fails, so she applies the checkpoint and the VM boots cleanly with a consistent database. After a week of stability she deletes the checkpoint so the AVHDX merges back, relying on nightly Azure Backup for real protection.",
  "tip": "If the question needs an application-consistent restore point, choose a production checkpoint. If it asks how to protect against host storage failure or keep 30 days of history, the answer is a backup, never a checkpoint.",
  "check": [
   [
    "Which checkpoint type includes the VM's memory state?",
    "Standard checkpoint."
   ],
   [
    "Why should you not delete AVHDX files manually?",
    "They are part of a differencing chain; removing one without a merge breaks the chain and can lose data."
   ],
   [
    "Give two reasons checkpoints are not backups.",
    "They live on the same storage as the VM and depend on the parent disk chain, so a storage failure destroys both; they also lack retention and off-host copies and degrade performance over time."
   ]
  ]
 },
 {
  "t": "Hyper-V virtual switches (external, internal, private) and Switch Embedded Teaming",
  "body": [
   "A Hyper-V virtual switch is a software layer 2 switch inside the host that connects VMs' virtual network adapters to each other and, optionally, to the outside world. You create switches in Hyper-V Manager's Virtual Switch Manager or with `New-VMSwitch`. There are three types, and choosing the right one is a common exam question.",
   "An external switch is bound to a physical network adapter, so VMs can reach the physical network and beyond. When you create it, the option Allow management operating system to share this network adapter creates a host virtual NIC on the switch, so the host keeps network access through the same physical port. If you clear that option, the physical NIC is dedicated to VM traffic. An internal switch connects VMs to each other and to the host, but not to the physical network. It is useful for host-to-VM communication and, combined with `New-NetNat`, for giving VMs outbound NAT through the host. A private switch connects VMs only to each other; even the host cannot talk on it. It suits isolated labs and test networks, such as a malware analysis segment or an isolated test failover network.",
   "VM network adapters also carry settings: VLAN ID (`Set-VMNetworkAdapterVlan -VMName APP01 -Access -VlanId 20`), bandwidth management, DHCP guard and router guard (which drop rogue DHCP or router advertisement messages from a VM), MAC address spoofing, port mirroring and, on generation 2 VMs, PXE boot with the standard adapter.",
   "Hosts need redundancy and bandwidth, which traditionally came from NIC teaming (LBFO, load balancing and failover) configured in Windows, with a virtual switch built on the team. Switch Embedded Teaming (SET), introduced in Windows Server 2016, builds teaming directly into the Hyper-V virtual switch instead. SET is the recommended approach for Hyper-V hosts and is required for software-defined networking features and for converged designs using RDMA (Remote Direct Memory Access) for storage and live migration traffic. Building a new virtual switch on an LBFO team is deprecated and blocked by default on recent Windows Server versions, so use SET.",
   "SET has specific rules. It supports up to eight physical adapters, and they should be identical: same manufacturer, model, firmware and driver. It works only in switch-independent mode, so the physical switches need no special configuration such as LACP. It offers two load-balancing modes, Hyper-V Port (each VM's traffic is tied to one team member) and Dynamic (outbound traffic is balanced by flows).",
   "```powershell\nNew-VMSwitch -Name SETswitch -NetAdapterName 'NIC1','NIC2' -EnableEmbeddedTeaming $true -AllowManagementOS $true\nSet-VMSwitchTeam -Name SETswitch -LoadBalancingAlgorithm HyperVPort\nAdd-VMNetworkAdapter -ManagementOS -Name LiveMigration -SwitchName SETswitch\n```\nThe last line adds a host virtual NIC for live migration traffic on the same converged team."
  ],
  "terms": [
   [
    "External switch",
    "A virtual switch bound to a physical NIC so VMs can reach the physical network."
   ],
   [
    "Internal switch",
    "A virtual switch connecting VMs and the host, with no physical network access."
   ],
   [
    "Private switch",
    "A virtual switch connecting only VMs to each other; the host is excluded."
   ],
   [
    "Switch Embedded Teaming",
    "NIC teaming built into the Hyper-V virtual switch, up to eight identical adapters, switch-independent."
   ],
   [
    "DHCP guard",
    "A VM adapter setting that blocks DHCP server messages from unauthorized VMs."
   ]
  ],
  "example": "A lab needs three VMs that can talk to each other but must never reach the host or corporate network. The admin creates a private switch and connects all three to it. Later, for production hosts with two 25 GbE RDMA NICs, the team builds a SET switch with host vNICs for management, storage and live migration.",
  "tip": "Host access but no physical network means internal; VMs only means private. For teaming on modern Hyper-V hosts, choose SET, which uses switch-independent mode and needs identical NICs, not LBFO.",
  "check": [
   [
    "Which virtual switch type lets VMs talk to the host but not the physical network?",
    "Internal."
   ],
   [
    "What teaming mode does SET support?",
    "Switch-independent only; no LACP or static teaming."
   ],
   [
    "What is the maximum number of physical adapters in a SET team?",
    "Eight, and they should be identical."
   ]
  ]
 },
 {
  "t": "Live migration and storage migration between Hyper-V hosts; Kerberos vs CredSSP authentication",
  "body": [
   "Live migration moves a running VM from one Hyper-V host to another with no noticeable downtime. Hyper-V copies the VM's memory to the destination while the VM keeps running, repeatedly sends pages that changed, then briefly pauses the VM to transfer the final state and resumes it on the destination. Users typically lose at most a packet or two. It is how you patch or replace hosts without outages.",
   "There are three forms. Live migration within a failover cluster moves the VM's memory and state while its disks stay on shared storage such as a Cluster Shared Volume; you start it in Failover Cluster Manager or with `Move-ClusterVirtualMachineRole`. Shared-nothing live migration moves a running VM between stand-alone hosts, or between clusters, including its storage, over the network, with no shared storage required; you use `Move-VM -DestinationStoragePath`. Storage migration moves only a running VM's virtual disks and configuration files to a different location, such as a new volume or SMB share, without changing hosts: `Move-VMStorage -VMName APP01 -DestinationStoragePath E:\\VMs\\APP01`.",
   "For non-clustered live migration, both hosts must have live migration enabled (`Enable-VMMigration`), be in the same domain or trusted domains, use the same processor manufacturer (Intel to Intel, AMD to AMD), and have networks configured for migration traffic. If processor generations differ, enable processor compatibility mode on the VM while it is off. You can choose performance options: TCP/IP, Compression (the default, which uses spare CPU to reduce data) or SMB, which can use SMB Direct (RDMA) and SMB Multichannel for the fastest transfers on capable networks. You also set how many simultaneous migrations a host allows.",
   "Authentication is the heart of this topic. With CredSSP (Credential Security Support Provider), the default, no extra configuration is needed, but you must be signed in locally, or by Remote Desktop, to the source host when you start the migration, because your credentials are delegated from that session. Starting a migration from Hyper-V Manager on your workstation will fail. With Kerberos, you can start migrations remotely from any management computer, but you must first configure constrained delegation on each host's computer account in AD, allowing it to present delegated credentials to the other hosts for two services: `cifs` (for storage) and `Microsoft Virtual System Migration Service`.",
   "```powershell\nSet-VMHost -VirtualMachineMigrationAuthenticationType Kerberos `\n  -VirtualMachineMigrationPerformanceOption SMB\n```\nIn Active Directory Users and Computers, on HV01's Delegation tab, choose Trust this computer for delegation to specified services only and add the cifs and Microsoft Virtual System Migration Service entries for HV02, then do the same in reverse.",
   "Inside a failover cluster, the cluster service handles authentication for clustered live migration, so this delegation question applies mainly to stand-alone hosts and shared-nothing migrations."
  ],
  "terms": [
   [
    "Live migration",
    "Moving a running VM between Hyper-V hosts with no noticeable downtime."
   ],
   [
    "Shared-nothing live migration",
    "Live migration of a VM and its storage between hosts without shared storage."
   ],
   [
    "Storage migration",
    "Moving a running VM's disks and files to new storage on the same host."
   ],
   [
    "CredSSP",
    "Default live migration authentication; requires signing in to the source host to start the move."
   ],
   [
    "Kerberos constrained delegation",
    "AD setting allowing hosts to delegate for cifs and Microsoft Virtual System Migration Service, enabling remote migration starts."
   ]
  ],
  "example": "An admin tries to live-migrate a VM from HV01 to HV02 using Hyper-V Manager on his laptop and gets an authentication error. The hosts use CredSSP. He configures constrained delegation for cifs and Microsoft Virtual System Migration Service between the hosts, switches both to Kerberos, and remote migrations now succeed.",
  "tip": "Migration fails when started from a remote console: CredSSP is in use; either sign in to the source host or switch to Kerberos with constrained delegation. Moving only disks on the same host is storage migration.",
  "check": [
   [
    "Which two services must be added to constrained delegation for Kerberos live migration?",
    "cifs and Microsoft Virtual System Migration Service."
   ],
   [
    "What limitation does CredSSP authentication impose?",
    "You must start the migration while signed in to the source host."
   ],
   [
    "How do you move a running VM's VHDX files to a new volume without moving the VM to another host?",
    "Use storage migration, for example Move-VMStorage."
   ]
  ]
 },
 {
  "t": "Hyper-V Replica: primary and replica servers, replication frequency, recovery points, planned and unplanned failover, test failover",
  "body": [
   "Hyper-V Replica is a built-in disaster recovery feature that asynchronously copies a VM from one Hyper-V host (the primary server) to another (the replica server), often in a different site. The replica VM stays off and receives changes; if the primary site fails, you start it. No shared storage, special hardware or cluster is required, and hosts can be in different domains when you use certificate authentication.",
   "Setup has two sides. On the replica server, open Hyper-V Settings, Replication Configuration, and enable it as a replica server. Choose authentication: Kerberos over HTTP (port 80, data not encrypted in transit, domain-joined hosts) or certificate-based over HTTPS (port 443, encrypted, works across untrusted domains or workgroups). Then choose to accept replication from any authenticated server or only from listed servers with their storage locations, and enable the matching inbound firewall rule, which is not enabled automatically. If the replica is a failover cluster, you configure the Hyper-V Replica Broker cluster role instead of a single host. On the primary, right-click the VM and choose Enable Replication, or use `Enable-VMReplication`.",
   "Replication frequency is how often changes are sent: 30 seconds, 5 minutes or 15 minutes. Shorter frequency means less possible data loss but more bandwidth and a need for a better link. Initial replication can go over the network immediately or on a schedule, be exported to external media and shipped, or use an existing VM restored at the replica site. You can exclude disks, such as a page file disk, to save bandwidth.",
   "Recovery points determine what you can fail over to. By default only the latest recovery point is kept. You can keep additional hourly recovery points (up to 24 hours of history), and optionally make some of them application-consistent using VSS snapshots at an interval you set. Extended replication lets the replica server replicate onward to a third site.",
   "Failover comes in three kinds, and the distinctions are tested. A test failover runs on the replica server: it creates a temporary copy of the replica VM (named with Test appended) connected to a network you choose, ideally isolated, without interrupting replication. You stop the test when finished and the copy is deleted. A planned failover starts on the primary when you have warning, such as a scheduled datacenter outage: you shut the primary VM down, run Planned Failover, remaining changes are sent so no data is lost, the replica starts, and replication can be reversed. An unplanned failover runs on the replica server after the primary is lost: you choose a recovery point, accept possible data loss back to the last replicated change, and start the VM. Later you use Reverse Replication to protect the VM back toward the original site once it is repaired.",
   "Monitor health with Replication, View Replication Health in Hyper-V Manager or `Measure-VMReplication`, which shows state, last replication time and pending size."
  ],
  "terms": [
   [
    "Replica server",
    "The Hyper-V host that receives replicated VM changes and can run the VM after failover."
   ],
   [
    "Replication frequency",
    "How often changes are sent: every 30 seconds, 5 minutes or 15 minutes."
   ],
   [
    "Recovery point",
    "A saved point in time on the replica that you can fail over to; additional hourly points can be kept."
   ],
   [
    "Planned failover",
    "Failover initiated from the primary with the VM shut down, sending all changes so no data is lost."
   ],
   [
    "Hyper-V Replica Broker",
    "Failover cluster role that allows a cluster to act as a replica server."
   ]
  ],
  "example": "A branch office replicates its file server VM to headquarters every 5 minutes with certificate authentication. Each quarter, the admin runs a test failover at headquarters on an isolated switch to prove the VM boots. When the branch power fails for days, she performs an unplanned failover to the latest recovery point.",
  "tip": "Test failover never interrupts replication. Planned failover starts on the primary and loses no data; unplanned failover starts on the replica and can lose data. Cross-domain or workgroup hosts need certificate-based authentication.",
  "check": [
   [
    "Which authentication method should you use if the primary and replica hosts are in untrusted domains?",
    "Certificate-based authentication over HTTPS."
   ],
   [
    "Where do you start a planned failover, and what must you do first?",
    "On the primary server, after shutting down the primary VM."
   ],
   [
    "What are the three replication frequency options?",
    "30 seconds, 5 minutes and 15 minutes."
   ]
  ]
 },
 {
  "t": "Azure Site Recovery for Hyper-V and Azure VMs: recovery plans, test failover, RPO and failback",
  "body": [
   "Azure Site Recovery (ASR) is Azure's disaster recovery as a service. It continuously replicates machines to a secondary location and orchestrates failover when disaster strikes. For this exam, two scenarios matter: on-premises Hyper-V VMs replicating to Azure, and Azure VMs replicating from one Azure region to another. Everything is managed from a Recovery Services vault, which also hosts Azure Backup.",
   "Two terms frame every DR design. The recovery point objective (RPO) is the maximum acceptable data loss, measured in time: an RPO of 15 minutes means you can lose at most the last 15 minutes of changes. The recovery time objective (RTO) is the maximum acceptable downtime until service is restored. Replication frequency drives RPO; automation such as recovery plans drives RTO.",
   "For Hyper-V to Azure, you create a vault, define a Hyper-V site (or use System Center Virtual Machine Manager clouds if VMM manages the hosts), and install the Azure Site Recovery Provider and the Microsoft Azure Recovery Services agent on each host. They connect outbound over HTTPS. You then create a replication policy (copy frequency, recovery point retention and app-consistent snapshot frequency), associate it with the site, and enable replication for VMs, choosing the target subscription, resource group, storage and virtual network. Changes flow to managed disks in Azure; no Azure VM exists until failover.",
   "For Azure to Azure, no on-premises components are needed. When you enable replication for a VM, ASR installs the Site Recovery Mobility extension automatically, creates target resources such as a resource group and virtual network in the paired or chosen target region, plus a cache storage account in the source region that stages changes before they are sent, and begins replicating. Crash-consistent recovery points are created frequently, and app-consistent points on the schedule in the replication policy.",
   "Recovery plans turn individual VM failovers into an orchestrated runbook. You add machines and arrange them into groups that fail over in order, for example database servers in group 1, application servers in group 2 and web servers in group 3. You can insert Azure Automation runbooks as scripted pre- or post-actions (updating DNS, attaching a load balancer) and manual actions that pause for a human. Recovery plans are the main tool for meeting an RTO.",
   "Test failover is how you prove DR without disrupting production: you pick a recovery point and fail over into an isolated virtual network, check that applications work, then run Cleanup test failover to delete the test resources. Replication continues throughout. A real failover (planned when you have warning, unplanned during an outage) creates the VMs in the target; you then Commit the failover. After the primary site is repaired, you Reprotect (reverse replication from the recovery site back toward the original) and then fail back with another failover in the reverse direction, to the original location or an alternate one. For Hyper-V, failback to on-premises is a planned failover from Azure, and you can choose to sync only changes to minimize downtime.",
   "The key difference from Hyper-V Replica is the target: Hyper-V Replica needs a second site with your own hosts; ASR uses Azure as the second site and adds orchestration."
  ],
  "terms": [
   [
    "RPO",
    "Recovery point objective: the maximum tolerable data loss, measured as time."
   ],
   [
    "RTO",
    "Recovery time objective: the maximum tolerable time to restore service."
   ],
   [
    "Recovery Services vault",
    "The Azure resource that stores Site Recovery and Backup configuration and data."
   ],
   [
    "Recovery plan",
    "An ordered set of machine groups with scripts and manual steps that fail over together."
   ],
   [
    "Reprotect",
    "Reversing replication after failover so the VM is protected back toward the original site before failback."
   ]
  ],
  "example": "A company protects a three-tier app on Hyper-V with ASR to Azure. A recovery plan fails over the SQL VM first, then the app servers, then web servers, with a runbook that updates public DNS. Twice a year they run a test failover into an isolated VNet, verify the app, and clean up.",
  "tip": "Test failover uses an isolated network and does not stop replication. Order of operations after a real failover: commit, reprotect, then fail back. Hyper-V hosts need the ASR provider and the Recovery Services agent.",
  "check": [
   [
    "What components are installed on Hyper-V hosts for Hyper-V to Azure replication?",
    "The Azure Site Recovery Provider and the Microsoft Azure Recovery Services agent."
   ],
   [
    "Which ASR feature orders VMs into groups and runs scripts during failover?",
    "A recovery plan."
   ],
   [
    "What must you do before failing back to the original site?",
    "Reprotect the VMs so replication runs from the recovery site back to the original site."
   ]
  ]
 },
 {
  "t": "Azure VMs running Windows Server: Azure Hybrid Benefit, Sysprep and Azure Compute Gallery, extensions, Azure Edition hotpatching",
  "body": [
   "Running Windows Server in Azure VMs is a core hybrid skill. Several features are specific to Windows Server on Azure: licensing with Azure Hybrid Benefit, building custom images with Sysprep and Azure Compute Gallery, extending VMs with extensions, and the Azure Edition of Windows Server with hotpatching.",
   "By default an Azure Windows VM's price includes the Windows Server license. Azure Hybrid Benefit lets you bring eligible on-premises Windows Server licenses (Standard or Datacenter core licenses with active Software Assurance, or qualifying subscription licenses) and pay only the base compute rate, which can save substantially. You enable it when creating the VM, later on the VM's configuration blade, or by setting the license type to `Windows_Server` with PowerShell or the Azure CLI. Licensing rules decide how many cores you must cover, so check them for your agreement, and remember you are responsible for compliance. Azure Hybrid Benefit also applies to Arc-enabled servers for some services.",
   "To create a standard image, you customize a Windows VM and then generalize it with Sysprep, which removes machine-specific information such as the computer SID and name so each deployment is unique. Run `C:\\Windows\\System32\\Sysprep\\sysprep.exe /generalize /oobe /shutdown`, wait for the VM to stop, then capture it. After generalizing, the source VM cannot be used again. Captures go into an Azure Compute Gallery (formerly Shared Image Gallery). The gallery contains image definitions (the logical image, such as Win2025-Web, with its OS type, generation and whether it is generalized or specialized) and image versions (the actual images, numbered like 1.0.0). You can replicate versions to multiple regions, keep several replicas for scale, and share the gallery with RBAC or across tenants. A specialized image skips Sysprep and keeps the original machine identity, suited to cloning a VM rather than mass deployment.",
   "Extensions are small applications installed and managed by Azure through the Azure VM agent inside the VM. Common Windows examples are the Custom Script Extension (download and run a script after deployment), the PowerShell DSC extension, the Azure Monitor Agent, Microsoft Antimalware, the Key Vault extension for certificate rotation and the machine configuration extension. Run Command is a related feature for running one-off scripts through the agent without network access to the VM. You can deploy extensions in the portal, in templates, with `Set-AzVMExtension`, or automatically with Azure Policy.",
   "Windows Server Datacenter: Azure Edition is a special edition available only on Azure (and on Azure Local). Its signature feature is hotpatching, which applies monthly security updates in memory without restarting, with quarterly baseline updates that do need a reboot. Hotpatching needs a supported Azure Edition image and is managed with Azure Update Manager. Azure Edition has also introduced features ahead of other editions, such as SMB over QUIC in its early releases. You cannot in-place convert a normal Datacenter VM into Azure Edition for hotpatching; deploy from an Azure Edition image."
  ],
  "terms": [
   [
    "Azure Hybrid Benefit",
    "Using eligible on-premises Windows Server licenses in Azure to pay only the base compute rate."
   ],
   [
    "Sysprep /generalize",
    "Removes machine-specific data such as the SID so an image can be deployed many times."
   ],
   [
    "Azure Compute Gallery",
    "A service that stores image definitions and versions, replicates them across regions and shares them."
   ],
   [
    "Image definition",
    "The logical grouping in a gallery that describes an image (OS, generation, generalized or specialized)."
   ],
   [
    "Azure Edition",
    "Windows Server Datacenter: Azure Edition, available on Azure, supporting hotpatching."
   ]
  ],
  "example": "An organization with Datacenter licenses and Software Assurance migrates 50 VMs and enables Azure Hybrid Benefit on each. It builds a hardened web server image, runs Sysprep with /generalize /oobe /shutdown, captures it as version 1.0.0 of a gallery image definition replicated to two regions, and deploys new servers from it with the Custom Script Extension finishing app setup.",
  "tip": "Paying for Windows licenses twice is the Azure Hybrid Benefit trap. A captured VM that will be deployed many times must be generalized with Sysprep. No-reboot monthly security patching in Azure points to Azure Edition with hotpatching.",
  "check": [
   [
    "What does Sysprep /generalize remove, and why?",
    "Machine-specific information such as the SID and computer name, so every VM deployed from the image is unique."
   ],
   [
    "In Azure Compute Gallery, what is the difference between an image definition and an image version?",
    "The definition describes the image logically (OS, generation, generalized or specialized); versions are the actual deployable images."
   ],
   [
    "Which Windows Server edition provides hotpatching on Azure VMs?",
    "Windows Server Datacenter: Azure Edition."
   ]
  ]
 },
 {
  "t": "DNS zones: primary, secondary, stub and AD-integrated; replication scope; secure dynamic updates",
  "body": [
   "A DNS zone is the portion of the namespace a DNS server is responsible for, such as corp.contoso.com. Windows Server DNS supports several zone types, and which one you choose determines where data is stored, who can change it and how copies stay in sync. You can create forward lookup zones (names to IP addresses) and reverse lookup zones (IP addresses to names, using in-addr.arpa for IPv4).",
   "A primary zone holds the writable master copy of the zone. A standard (file-based) primary zone stores its data in a text file under `%windir%\\System32\\dns`, and only that one server can accept changes. A secondary zone is a read-only copy obtained from a master server by zone transfer: a full transfer (AXFR) or incremental transfer (IXFR). The master must allow the transfer on the zone's Zone Transfers tab, ideally only to listed servers, and can notify secondaries when changes occur. Secondaries add redundancy and spread query load, including on non-Windows DNS servers.",
   "A stub zone contains only the records needed to find the authoritative servers for another zone: the SOA record, NS records and the glue A records for those name servers. It stays up to date automatically as the other zone's name servers change, which makes it useful for pointing to a partner's or child domain's DNS servers. Compared with a conditional forwarder, a stub zone learns the authoritative servers dynamically, while a conditional forwarder uses a list you maintain by hand.",
   "An Active Directory-integrated zone stores its data in AD rather than a file. It can be created only on a DNS server that is also a domain controller. AD replication carries changes, so every DC hosting the zone has a writable copy (multi-master), no separate zone transfer configuration is needed between those DCs, and zone data benefits from AD security. A primary or stub zone can be AD-integrated; a secondary zone cannot.",
   "The replication scope decides which DCs receive an AD-integrated zone: To all DNS servers running on domain controllers in this forest (stored in the ForestDnsZones application partition, typical for the _msdcs zone), To all DNS servers running on domain controllers in this domain (DomainDnsZones, the default), To all domain controllers in this domain (the domain partition, for compatibility with very old DCs), or a custom application directory partition you create to target specific DCs. With PowerShell: `Add-DnsServerPrimaryZone -Name corp.contoso.com -ReplicationScope Domain`.",
   "Dynamic updates let clients and DHCP servers register their own A and PTR records. Options are None, Nonsecure and secure, and Secure only. Secure only, available only on AD-integrated zones, allows updates only from authenticated domain members and records who owns each record through its access control list, so a rogue device cannot overwrite a server's record. It is the recommended setting. Pair dynamic updates with aging and scavenging so stale records are removed automatically."
  ],
  "terms": [
   [
    "Primary zone",
    "A zone holding the writable copy of DNS data, in a file or in AD."
   ],
   [
    "Secondary zone",
    "A read-only copy of a zone kept current by zone transfers from a master server."
   ],
   [
    "Stub zone",
    "A zone holding only SOA, NS and glue A records to locate another zone's authoritative servers."
   ],
   [
    "Replication scope",
    "The set of DCs that receive an AD-integrated zone: forest, domain, domain partition or a custom partition."
   ],
   [
    "Secure dynamic updates",
    "Dynamic registration allowed only by authenticated domain members, available only on AD-integrated zones."
   ]
  ],
  "example": "Contoso needs its DNS servers to always know Fabrikam's current name servers after a merger, even as Fabrikam adds DCs. The admin creates an AD-integrated stub zone for fabrikam.com with forest-wide replication scope, so every Contoso DC learns Fabrikam's NS records automatically.",
  "tip": "Secure only dynamic updates require an AD-integrated zone. Secondary zones can never be AD-integrated. A stub zone tracks name server changes automatically; a conditional forwarder does not.",
  "check": [
   [
    "Which zone type contains only SOA, NS and glue A records?",
    "A stub zone."
   ],
   [
    "Which replication scope is the default for a new AD-integrated zone?",
    "All DNS servers running on domain controllers in this domain (DomainDnsZones)."
   ],
   [
    "Why can you not select Secure only updates on a standard primary zone?",
    "Secure updates rely on AD authentication and record ACLs, so they are available only on AD-integrated zones."
   ]
  ]
 },
 {
  "t": "Forwarders, conditional forwarders and root hints; DNS policies and zone scopes",
  "body": [
   "When a Windows DNS server receives a query for a name it is not authoritative for and has not cached, it must find the answer somewhere. It has three tools: forwarders, conditional forwarders and root hints. Choosing among them controls how your internal DNS reaches the internet, partners and Azure.",
   "Forwarders are server-wide: you list one or more upstream DNS servers (for example an ISP resolver, a security filtering service or a central datacenter DNS), and the server sends every query it cannot answer locally to them. This centralizes internet resolution and caching, and lets branch DNS servers avoid direct internet access. Conditional forwarders apply only to a specific domain name: queries for fabrikam.com go to Fabrikam's DNS servers, while everything else follows the normal path. Conditional forwarders are the standard way to support trusts and partner connectivity, and to resolve Azure private endpoint names by forwarding privatelink zones to an Azure DNS Private Resolver inbound endpoint. On a DC, you can store a conditional forwarder in AD and replicate it to all DNS servers in the domain or forest, instead of configuring each server.",
   "Root hints are a list of the internet's root name servers. If no forwarder is configured, or forwarders fail and the Use root hints if no forwarders are available option is set, the server performs iterative resolution itself: it asks a root server, follows the referral to the top-level domain servers, then to the domain's authoritative servers. Root hints ship with Windows and rarely change. If you disable recursion on a server, it will answer only for its own zones, which is appropriate for internet-facing authoritative servers.",
   "Resolution order is: local zones, then cache, then a matching conditional forwarder, then server forwarders, then root hints. The most specific conditional forwarder wins over general forwarders.",
   "DNS policies, introduced in Windows Server 2016, let the server answer differently depending on who is asking and how. Policies match criteria such as client subnet, transport protocol, server interface, FQDN, query type and time of day, then take an action (allow, deny or ignore) or direct the query to a zone scope. Query resolution policies control answers, recursion policies control which clients may use recursion, and zone transfer policies control transfers. Policies are configured with PowerShell per DNS server.",
   "A zone scope is an additional set of records within one zone. The zone can have a default scope plus scopes such as Europe or Internal, each holding different records for the same name. Combined with client subnets and policies, this enables geo-location based routing, split-brain DNS (internal clients get private addresses, internet clients get public addresses from the same zone) and time-of-day load distribution.",
   "```powershell\nAdd-DnsServerClientSubnet -Name EUSubnet -IPv4Subnet 10.50.0.0/16\nAdd-DnsServerZoneScope -ZoneName contoso.com -Name EUScope\nAdd-DnsServerResourceRecord -ZoneName contoso.com -A -Name www -IPv4Address 10.50.1.10 -ZoneScope EUScope\nAdd-DnsServerQueryResolutionPolicy -Name EUPolicy -Action ALLOW -ClientSubnet 'eq,EUSubnet' -ZoneScope 'EUScope,1' -ZoneName contoso.com\n```"
  ],
  "terms": [
   [
    "Forwarder",
    "An upstream DNS server that receives all queries the local server cannot resolve itself."
   ],
   [
    "Conditional forwarder",
    "A rule sending queries for one specific domain to designated DNS servers."
   ],
   [
    "Root hints",
    "The list of root name servers used for iterative resolution when forwarders are absent or unavailable."
   ],
   [
    "DNS policy",
    "A rule that allows, denies, ignores or redirects queries based on criteria such as client subnet or time of day."
   ],
   [
    "Zone scope",
    "An alternate set of records within a zone, selected by DNS policies."
   ]
  ],
  "example": "Contoso's DCs must resolve private endpoint names for Azure SQL. The admin creates an AD-stored conditional forwarder for the Azure privatelink zone pointing to the DNS Private Resolver inbound endpoint IP, replicated to all DNS servers in the forest, and leaves internet names going to the corporate forwarders.",
  "tip": "One partner domain means conditional forwarder; everything else means forwarder. Returning different answers to different client subnets from the same zone means DNS policies with zone scopes.",
  "check": [
   [
    "When does a Windows DNS server use root hints?",
    "When no forwarder is configured, or forwarders are unavailable and the option to use root hints is enabled."
   ],
   [
    "How can a conditional forwarder be made available on every DC's DNS server without configuring each one?",
    "Store it in Active Directory and choose a forest or domain replication scope."
   ],
   [
    "Which feature lets one zone give internal clients private IPs and external clients public IPs?",
    "DNS policies with zone scopes (split-brain DNS)."
   ]
  ]
 },
 {
  "t": "DNSSEC signing, trust anchors and the Name Resolution Policy Table (NRPT)",
  "body": [
   "Classic DNS has no way to prove that an answer is genuine, so attackers who can inject forged responses (cache poisoning or spoofing) can redirect users to malicious servers. DNS Security Extensions (DNSSEC) fix this by adding digital signatures to zone data. A resolver that validates DNSSEC can confirm that an answer really came from the zone's owner and was not altered, and can prove that a name does not exist. DNSSEC does not encrypt queries; it provides authenticity and integrity.",
   "Signing a zone adds new record types. RRSIG records hold the signature for each set of records. DNSKEY records publish the zone's public keys. NSEC or NSEC3 records provide authenticated denial of existence, with NSEC3 hashing names so attackers cannot simply walk the zone to list every name. DS (delegation signer) records live in the parent zone and hold a hash of the child's key, linking the chain of trust from parent to child. Two kinds of keys are normally used: the key signing key (KSK) signs only the DNSKEY record set, and the zone signing key (ZSK) signs the rest of the zone. Keeping them separate lets you roll the frequently changed ZSK without updating the parent.",
   "In Windows Server DNS you sign a zone with DNS Manager (right-click the zone, DNSSEC, Sign the Zone) or `Invoke-DnsServerZoneSign`. One DNS server is the Key Master for the zone; it generates and manages keys and handles automatic key rollover. For AD-integrated zones, signed data replicates through AD, and dynamic updates continue to work because the servers sign records online as they change. Check the result with `Resolve-DnsName www.corp.contoso.com -DnssecOk`, which returns the RRSIG records.",
   "Validation needs a starting point you trust, called a trust anchor. It is typically a DNSKEY or DS record for a zone, configured on the validating DNS server; the server then follows the chain of signatures downward. On the internet the root zone's key serves as the anchor. For internal zones, you add trust anchors for your own signed zones to your resolvers. Windows can distribute trust anchors for a signed AD-integrated zone to all DNS servers in the forest automatically, an option in the signing wizard, and they appear in the Trust Points folder of DNS Manager.",
   "Windows clients are non-validating stub resolvers: they rely on their DNS server to validate and report the result. The Name Resolution Policy Table (NRPT) tells clients how to treat specific namespaces. Configured through Group Policy (Computer Configuration, Policies, Windows Settings, Name Resolution Policy), an NRPT rule for a suffix such as `.corp.contoso.com` can require DNSSEC validation: the client asks the server and accepts the answer only if the server indicates it validated successfully. Otherwise the client treats the name as unresolved. NRPT rules can also direct queries for a namespace to specific DNS servers, which DirectAccess and some VPN designs use. View applied rules with `Get-DnsClientNrptPolicy`.",
   "Roll out in stages: sign the zone, distribute trust anchors, confirm validation on servers, and only then enforce validation with NRPT on clients, or failed validation will break name resolution for users."
  ],
  "terms": [
   [
    "DNSSEC",
    "Extensions that add digital signatures to DNS data so resolvers can verify authenticity and integrity."
   ],
   [
    "RRSIG",
    "A record containing the signature over a set of DNS records."
   ],
   [
    "Trust anchor",
    "A preconfigured public key or DS record a resolver trusts as the start of a DNSSEC validation chain."
   ],
   [
    "Key Master",
    "The DNS server responsible for generating and rolling over keys for a signed zone."
   ],
   [
    "NRPT",
    "Name Resolution Policy Table: client rules, delivered by Group Policy, that require DNSSEC validation or direct queries for specific namespaces."
   ]
  ],
  "example": "After a phishing incident, Contoso signs corp.contoso.com, distributes trust anchors to all forest DNS servers, and verifies with Resolve-DnsName -DnssecOk. Once validation is confirmed on the servers, a GPO adds an NRPT rule requiring DNSSEC for .corp.contoso.com on all clients.",
  "tip": "Signing is done on the authoritative zone; validation is done by resolvers using trust anchors; the NRPT is what makes Windows clients require validation. DNSSEC gives integrity, not confidentiality.",
  "check": [
   [
    "What does the KSK sign, and what does the ZSK sign?",
    "The KSK signs the DNSKEY record set; the ZSK signs the other records in the zone."
   ],
   [
    "How do Windows clients enforce DNSSEC validation for a namespace?",
    "Through an NRPT rule, usually deployed by Group Policy, requiring DNSSEC validation for that suffix."
   ],
   [
    "Which record type provides authenticated denial of existence while hindering zone walking?",
    "NSEC3."
   ]
  ]
 },
 {
  "t": "Azure DNS private zones, virtual network links and auto-registration; Azure DNS Private Resolver",
  "body": [
   "When you move Windows Servers into Azure, name resolution has to work in three directions: between Azure VMs, from Azure to on-premises, and from on-premises into Azure. Azure gives every virtual network (VNet) a built-in resolver at the special address `168.63.129.16`, but that resolver only answers for names Azure knows about. Azure DNS private zones and Azure DNS Private Resolver are the two services that let you extend it cleanly.",
   "An Azure DNS private zone is a DNS zone, such as `corp.contoso.internal`, that is only resolvable from VNets you choose. You connect a zone to a VNet with a virtual network link. Any VM in a linked VNet that uses Azure-provided DNS can then resolve records in the zone. A link can optionally have auto-registration turned on: Azure then creates and maintains A records for the VMs in that VNet automatically, updating them when VMs are created, change IP or are deleted. A VNet can be linked to many private zones for resolution, but auto-registration can be enabled for only one private zone per VNet. Private zones are also how private endpoints work: a zone such as `privatelink.file.core.windows.net` holds the private IP of a storage account so the normal public name resolves to a private address inside your network.",
   "The catch is that on-premises servers cannot send queries to `168.63.129.16`; that address is only reachable from inside Azure. Before Private Resolver existed, you deployed DNS forwarder VMs in Azure. Azure DNS Private Resolver replaces those VMs with a managed service deployed into your VNet. It has two kinds of endpoints, each in its own dedicated subnet delegated to the service. An inbound endpoint gets a private IP address in the VNet; on-premises DNS servers create a conditional forwarder for your Azure zones pointing at that IP, and queries arrive over VPN or ExpressRoute. An outbound endpoint, combined with a DNS forwarding ruleset, sends queries from Azure to other DNS servers, for example forwarding `contoso.local` to your on-premises domain controllers.",
   "The exam likes to ask which piece solves which direction. On-premises clients resolving Azure private names need the inbound endpoint plus a conditional forwarder on the on-premises DNS servers. Azure VMs resolving on-premises Active Directory names need the outbound endpoint and a forwarding rule, with the ruleset linked to the VNets that should use it. VMs that must register their own names automatically need a private zone link with auto-registration. Note that domain-joined VMs that use your domain controllers as their DNS servers (a custom DNS setting on the VNet) bypass Azure-provided DNS, so the DCs themselves must forward Azure private zone queries to `168.63.129.16`.",
   "In a lab you will see these as separate resources in the portal: the private DNS zone, its Virtual network links blade with an Enable auto registration checkbox, and the DNS private resolver with Inbound endpoints, Outbound endpoints and linked forwarding rulesets. Testing is done from a VM with `Resolve-DnsName vm1.corp.contoso.internal`."
  ],
  "terms": [
   [
    "Private DNS zone",
    "An Azure DNS zone that resolves only from virtual networks linked to it, not from the internet."
   ],
   [
    "Virtual network link",
    "The connection between a private zone and a VNet that lets the VNet resolve the zone and optionally auto-register VM records."
   ],
   [
    "Auto-registration",
    "A link setting that makes Azure create and maintain A records for VMs in the linked VNet; allowed for only one private zone per VNet."
   ],
   [
    "Inbound endpoint",
    "A Private Resolver IP address in the VNet that on-premises DNS servers forward queries to for Azure private names."
   ],
   [
    "Outbound endpoint and forwarding ruleset",
    "The Private Resolver components that forward queries for chosen domains from Azure to other DNS servers, such as on-premises DCs."
   ]
  ],
  "example": "Contoso moves an app tier into Azure. The VMs auto-register in the private zone azure.contoso.internal. On-premises DNS servers get a conditional forwarder for that zone to the Private Resolver inbound endpoint, and a forwarding ruleset sends contoso.local queries from Azure back to the on-premises DCs over the site-to-site VPN. No forwarder VMs are needed.",
  "tip": "Match direction to component: on-premises to Azure uses the inbound endpoint and a conditional forwarder; Azure to on-premises uses the outbound endpoint and a forwarding ruleset. Only one auto-registration zone per VNet.",
  "check": [
   [
    "Why can't an on-premises DNS server simply forward queries to 168.63.129.16?",
    "That address is only reachable from inside Azure. On-premises servers need a reachable private IP, which the Private Resolver inbound endpoint (or a forwarder VM) provides."
   ],
   [
    "A VNet already auto-registers in zone A. Can you enable auto-registration for zone B on the same VNet?",
    "No. A VNet can be linked to multiple zones for resolution, but auto-registration is allowed for only one private zone per VNet."
   ],
   [
    "Which resource lets Azure VMs resolve contoso.local names hosted on on-premises DCs without custom DNS servers?",
    "An Azure DNS Private Resolver outbound endpoint with a forwarding ruleset containing a rule for contoso.local that points to the on-premises DNS servers, linked to the VNet."
   ]
  ]
 },
 {
  "t": "DHCP scopes, reservations, options and relay; authorization in AD",
  "body": [
   "The Dynamic Host Configuration Protocol (DHCP) hands out IP addresses and settings so you don't configure each client by hand. A client gets a lease through four messages, often remembered as DORA: Discover (a broadcast asking for any DHCP server), Offer, Request and Acknowledge. Because Discover is a broadcast, it normally stays on the local subnet, which matters when you design where servers live.",
   "A scope is a range of addresses for one subnet, such as 10.1.20.10 to 10.1.20.250 with mask 255.255.255.0, plus a lease duration. Inside a scope you add exclusion ranges for addresses you assign statically (printers, servers) and reservations. A reservation ties a specific address to a client's MAC address (for IPv4) so the device always gets the same IP while still receiving options from DHCP. In PowerShell you use `Add-DhcpServerv4Scope`, `Add-DhcpServerv4ExclusionRange` and `Add-DhcpServerv4Reservation`.",
   "Options carry settings beyond the address. The ones you will see most are 003 Router (default gateway), 006 DNS Servers and 015 DNS Domain Name. Options can be set at the server level (apply to all scopes), the scope level, and the reservation level, and the more specific level wins, so a reservation option overrides a scope option, which overrides a server option. DHCP policies can also assign options or address ranges based on criteria such as vendor class or MAC prefix. Set options with `Set-DhcpServerv4OptionValue`.",
   "Because clients broadcast, a DHCP server can only hear clients on its own subnet unless something forwards the request. A DHCP relay agent does that: usually the router interface (often called an IP helper address) or the Routing and Remote Access relay agent on a Windows server. The relay converts the broadcast into a unicast to the DHCP server and fills in the gateway address field (giaddr) with the address of the interface that received it. The server uses giaddr to pick the scope for that subnet. If clients in a remote subnet get no address, check the relay first and then whether a matching scope exists and is active.",
   "In an Active Directory domain, a Windows DHCP server that is a domain member must be authorized in AD before it will lease addresses. Authorization stops a rogue or test server from handing out wrong settings. Authorizing requires Enterprise Admins membership by default (or delegated rights), because the list lives in the forest configuration partition. You authorize with the DHCP console or `Add-DhcpServerInDC -DnsName dhcp1.contoso.com -IPAddress 10.1.0.5`, and list authorized servers with `Get-DhcpServerInDC`. A standalone, non-domain server checks whether an authorized server exists on the subnet and stops leasing if it finds one.",
   "In your lab, after installing the role with `Install-WindowsFeature DHCP -IncludeManagementTools`, the console still shows a red down arrow on the server until you authorize it. Also run the post-install step that creates the DHCP Administrators and DHCP Users security groups."
  ],
  "terms": [
   [
    "Scope",
    "A range of IP addresses for one subnet, with a subnet mask, lease duration and options, from which DHCP leases addresses."
   ],
   [
    "Reservation",
    "A scope entry that always gives the same IP address to a client identified by its MAC address."
   ],
   [
    "Exclusion range",
    "Addresses inside a scope that DHCP will never lease, used for statically configured devices."
   ],
   [
    "DHCP relay agent",
    "A router feature or service that forwards broadcast DHCP requests from a remote subnet to a DHCP server as unicast."
   ],
   [
    "Authorization",
    "Registering a domain-member DHCP server in AD so it is allowed to lease addresses; requires Enterprise Admins rights by default."
   ]
  ],
  "example": "A branch VLAN 10.3.40.0/24 gets no addresses after a new scope is created on the central DHCP server. The admin finds the scope is fine but the branch router has no IP helper configured. After adding the relay pointing to the DHCP server, clients receive leases from the right scope because the router stamps giaddr 10.3.40.1.",
  "tip": "Know the option precedence (reservation over scope over server) and that authorization needs Enterprise Admins by default. If a server is installed but hands out nothing, suspect authorization.",
  "check": [
   [
    "A scope sets DNS option 006 to 10.0.0.10, but one reservation sets 006 to 10.0.0.20. Which does the reserved client get?",
    "10.0.0.20, because reservation-level options override scope-level and server-level options."
   ],
   [
    "How does a DHCP server know which scope to use for a request that came through a relay agent?",
    "It reads the giaddr field the relay filled in with its receiving interface address and picks the scope whose subnet contains that address."
   ],
   [
    "A new domain-member DHCP server is installed and has an active scope but leases no addresses. What is the likely cause?",
    "It hasn't been authorized in Active Directory; authorize it with the console or Add-DhcpServerInDC using an account with Enterprise Admins rights."
   ]
  ]
 },
 {
  "t": "DHCP high availability: failover in load balance and hot standby modes; IPAM",
  "body": [
   "If your only DHCP server goes down, clients keep working until their leases expire, then fail to renew and lose connectivity. Older designs split each scope between two servers (the 80/20 split scope), but each server only knew about its own half. DHCP failover, built into Windows Server, is the modern answer: two servers share full lease information for the same scopes and keep it synchronized.",
   "A failover relationship links exactly two DHCP servers for one or more IPv4 scopes (failover does not cover IPv6 scopes). The servers replicate lease data to each other, authenticated with an optional shared secret. You create it in the DHCP console with Configure Failover on a scope, or with `Add-DhcpServerv4Failover`, and check it with `Get-DhcpServerv4Failover`. Scope settings such as options and reservations are not continuously synchronized after creation, so after you change them you replicate with Replicate Scope or `Invoke-DhcpServerv4FailoverReplication`.",
   "There are two modes. Load balance mode is the default: both servers actively serve clients, splitting requests by a percentage (50/50 unless you change it). This fits servers in the same site. Hot standby mode has one active server and one standby. The standby keeps a reserve percentage of addresses (5 percent by default) that it can hand out immediately if the active server stops responding, and takes over fully after the partner is declared down. Hot standby fits a hub and branch design where a central server backs up several branch servers, since a single server can be standby partner in several relationships.",
   "Two timers matter. The Maximum Client Lead Time (MCLT) is how far a server may extend a lease beyond what its partner knows about; after a partner is marked down, the surviving server waits for the MCLT before it can take over the whole address pool. The state switchover interval, if set, moves a server automatically from communication interrupted to partner down after that time; if it's not set, an administrator must declare partner down manually. These settings explain why takeover is not instant.",
   "IP Address Management (IPAM) is a Windows Server feature that centrally discovers and manages DHCP servers, DNS servers and your IP address space. From one console you can see scope utilization, find free address blocks, manage DHCP scopes and failover, manage DNS zones and records, and audit which user or device had an address at a given time using lease and logon events. Managed servers are configured either by Group Policy provisioning, where `Invoke-IpamGpoProvisioning` creates GPOs granting the IPAM server access, or by manual configuration of the same permissions and firewall rules. Install IPAM on a member server; installing it on a domain controller is not supported.",
   "For the exam, remember: failover is IPv4 only and exactly two servers per relationship; load balance for active-active in one site; hot standby for active-passive and branch backup; IPAM for central visibility and auditing, not for providing redundancy itself."
  ],
  "terms": [
   [
    "DHCP failover",
    "A relationship between two DHCP servers that replicate IPv4 lease information so either can serve the same scopes."
   ],
   [
    "Load balance mode",
    "The default failover mode in which both servers actively lease addresses, split by a configurable percentage."
   ],
   [
    "Hot standby mode",
    "A failover mode with one active and one standby server; the standby holds a reserve percentage of addresses for immediate use."
   ],
   [
    "MCLT",
    "Maximum Client Lead Time: the period a server can extend leases beyond its partner's knowledge, and the wait before full takeover after partner down."
   ],
   [
    "IPAM",
    "IP Address Management: a Windows Server feature that centrally discovers, monitors, manages and audits DHCP, DNS and IP address space."
   ]
  ],
  "example": "A company has DHCP servers in five branches and one in the datacenter. Each branch server is the active server in a hot standby relationship with the datacenter server, which holds a 5 percent reserve for each scope. When a branch server fails, clients renewing over the WAN get addresses from the reserve immediately, and after the partner is marked down the datacenter server can use the full pool.",
  "tip": "Load balance equals active-active in the same site; hot standby equals active-passive, typical for a central server backing up branches. Failover never covers IPv6 and never more than two servers per relationship.",
  "check": [
   [
    "You change the DNS server option on a scope that is in a failover relationship. What else must you do?",
    "Replicate the scope to the partner (Replicate Scope or Invoke-DhcpServerv4FailoverReplication), because configuration changes are not synchronized automatically."
   ],
   [
    "Which failover mode suits one datacenter server backing up several branch DHCP servers?",
    "Hot standby, with each branch server active and the datacenter server as standby holding a reserve of addresses."
   ],
   [
    "Can you install IPAM on a domain controller?",
    "No. Installing the IPAM server feature on a domain controller is not supported; use a member server."
   ]
  ]
 },
 {
  "t": "Azure VNet addressing and static private IPs set on the NIC",
  "body": [
   "An Azure virtual network (VNet) is your private network in Azure. When you create it, you give it one or more address spaces written in CIDR (Classless Inter-Domain Routing) notation, such as `10.20.0.0/16`, normally from the private ranges defined in RFC 1918 (10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16). You then carve that space into subnets, such as `10.20.1.0/24` for servers and `10.20.2.0/24` for management. Every VM network interface card (NIC) lives in one subnet.",
   "Plan address space before you build. VNets that you will connect by peering, or connect to on-premises by VPN or ExpressRoute, must not overlap with each other or with your on-premises ranges, because routing cannot tell two identical prefixes apart. Leave room to grow, and remember that some services need dedicated subnets with specific names or delegations, such as `GatewaySubnet` for a VPN or ExpressRoute gateway, or delegated subnets for DNS Private Resolver endpoints.",
   "Azure reserves five addresses in every subnet: the network address, the first three host addresses (used for the default gateway and Azure DNS mapping) and the broadcast address. So a /24 gives you 251 usable addresses, not 254, and the first address you can assign in `10.20.1.0/24` is `10.20.1.4`. The smallest subnet you can create is a /29, which leaves only three usable addresses. Exam questions often test this arithmetic.",
   "Each NIC IP configuration has a private IP that is either dynamic or static. With dynamic, Azure picks the next free address in the subnet. With static, you choose an address from the subnet (or promote the current one) and Azure guarantees it stays with that NIC until you change it or delete the NIC. Servers that other machines point to by IP, above all domain controllers and DNS servers, should use static assignment. You set it in the portal on the NIC's IP configurations blade, or with PowerShell by setting `PrivateIpAllocationMethod` to Static on the IP configuration and running `Set-AzNetworkInterface`.",
   "The key rule: in Azure you set the static IP on the NIC, not inside Windows. The guest operating system should stay on DHCP, and Azure's DHCP will always hand it the address you configured on the NIC. If you type a static address in the Windows adapter settings and it doesn't match, or later the NIC changes, the VM can lose network connectivity and you will need tools such as Run Command or the Serial Console to recover. The same idea applies to DNS servers: set custom DNS servers on the VNet (or on a NIC to override) rather than in the guest, so that every VM picks them up through DHCP.",
   "A typical hybrid pattern is to deploy two DC VMs with static private IPs on their NICs, then set the VNet's DNS servers to those two addresses and restart the other VMs so they receive the new DNS settings."
  ],
  "terms": [
   [
    "Address space",
    "The CIDR range or ranges assigned to a VNet, from which its subnets are allocated."
   ],
   [
    "Reserved addresses",
    "The five addresses Azure keeps in every subnet: the network address, the first three host addresses and the broadcast address."
   ],
   [
    "Static private IP",
    "A NIC IP configuration setting that pins a chosen private address to the NIC so it never changes until you change it."
   ],
   [
    "Custom DNS servers",
    "DNS server addresses configured on a VNet or NIC that Azure's DHCP gives to VMs instead of Azure-provided DNS."
   ]
  ],
  "example": "An admin builds DC1 in subnet 10.50.1.0/24 and sets its NIC to static 10.50.1.4. Inside Windows the adapter stays on DHCP. The VNet's DNS servers are changed to 10.50.1.4 and 10.50.1.5, and after restarting the app servers they resolve contoso.com through the DCs and can join the domain.",
  "tip": "If an answer choice says to configure a static IP in the guest OS network adapter of an Azure VM, it's the trap. Set static on the NIC in Azure; keep the guest on DHCP. Also remember 5 reserved addresses per subnet.",
  "check": [
   [
    "How many usable addresses does a /27 subnet in Azure provide?",
    "27 usable. A /27 has 32 addresses and Azure reserves 5."
   ],
   [
    "You need a DC VM in Azure to keep 10.0.1.10 permanently. Where do you set it?",
    "On the VM NIC's IP configuration in Azure as a static private IP; leave the Windows adapter set to obtain an address automatically."
   ],
   [
    "Why must a VNet's address space not overlap your on-premises network if you plan a site-to-site VPN?",
    "Routing cannot distinguish two identical prefixes, so traffic to overlapping addresses would not reach the correct side."
   ]
  ]
 },
 {
  "t": "Hybrid connectivity: site-to-site and point-to-site VPN, ExpressRoute, Azure Network Adapter",
  "body": [
   "Hybrid Windows Server designs need a private path between your datacenter and Azure VNets so domain controllers can replicate, clients can reach apps and admins can manage servers without exposing ports to the internet. Azure offers four options you must be able to compare: site-to-site VPN, point-to-site VPN, ExpressRoute and the Azure Network Adapter in Windows Admin Center.",
   "A site-to-site (S2S) VPN connects a whole on-premises network to a VNet through an encrypted IPsec/IKE tunnel over the internet. On the Azure side you deploy a VPN gateway into a subnet that must be named `GatewaySubnet`. You create a local network gateway resource that represents your site: the public IP of your on-premises VPN device and the on-premises address prefixes. A connection resource then ties the two together using a shared key. Most designs use route-based gateways, which support dynamic routing, multiple sites and point-to-site together; policy-based gateways are for older devices. Deploying a gateway takes a long time, often half an hour or more, and it is billed per hour.",
   "A point-to-site (P2S) VPN connects individual computers, not networks. Each client runs a VPN client and authenticates with a certificate, Microsoft Entra ID or RADIUS, using protocols such as OpenVPN, IKEv2 or SSTP. P2S suits remote admins or a handful of servers that need to reach a VNet without touching the corporate router.",
   "ExpressRoute is a private, dedicated connection from your network to Microsoft through a connectivity provider. Traffic does not cross the public internet, so you get more predictable latency, higher bandwidth options and an SLA. Private peering connects to your VNets through an ExpressRoute gateway, and Microsoft peering reaches Microsoft public services. Understand that ExpressRoute is private but not encrypted by default; if you need encryption you add it, for example with IPsec over the circuit or MACsec on direct ports. A common resilient design keeps a site-to-site VPN as a failover path for ExpressRoute.",
   "Azure Network Adapter is a Windows Admin Center feature for connecting one Windows Server to a VNet quickly. From the server's Networking tool you choose Add Azure Network Adapter, pick a VNet, and Windows Admin Center deploys (or reuses) a VPN gateway and configures a point-to-site connection with certificate authentication on that server. It is ideal when a single on-premises server needs to reach Azure resources and you don't want to reconfigure the edge firewall, but it's not a way to connect a whole site.",
   "When choosing: many users or servers at a site with internet access means S2S VPN; highest reliability, bandwidth or compliance needs mean ExpressRoute; individual laptops or admins mean P2S; one server managed in Windows Admin Center means Azure Network Adapter."
  ],
  "terms": [
   [
    "Site-to-site VPN",
    "An IPsec/IKE tunnel over the internet between an on-premises VPN device and an Azure VPN gateway, connecting entire networks."
   ],
   [
    "Local network gateway",
    "An Azure resource describing the on-premises VPN device's public IP and the on-premises address prefixes."
   ],
   [
    "Point-to-site VPN",
    "A VPN from an individual computer to a VNet, authenticated by certificate, Entra ID or RADIUS."
   ],
   [
    "ExpressRoute",
    "A private connection to Microsoft through a connectivity provider that bypasses the public internet; not encrypted by default."
   ],
   [
    "Azure Network Adapter",
    "A Windows Admin Center feature that connects a single Windows Server to a VNet using a point-to-site VPN it sets up for you."
   ]
  ],
  "example": "Fabrikam runs its main site over ExpressRoute private peering to a hub VNet, with a site-to-site VPN on the same gateway subnet as backup. A small lab server that must reach an Azure file share is connected separately by Azure Network Adapter from Windows Admin Center, avoiding changes to the lab's firewall.",
  "tip": "Watch for the word 'encrypted': ExpressRoute alone is private, not encrypted. And the gateway subnet must be named GatewaySubnet. Azure Network Adapter is always one server, point-to-site.",
  "check": [
   [
    "Which Azure resource stores the public IP of your on-premises VPN device and your on-premises address ranges?",
    "The local network gateway."
   ],
   [
    "A compliance team requires that hybrid traffic never crosses the public internet. Which option meets this?",
    "ExpressRoute, because it uses a private connection through a connectivity provider rather than the internet; add encryption if also required."
   ],
   [
    "What does Azure Network Adapter configure under the hood?",
    "A point-to-site VPN connection from the single Windows Server to an Azure VPN gateway on the chosen VNet, using certificate authentication."
   ]
  ]
 },
 {
  "t": "Azure File Sync: sync groups, cloud and server endpoints, cloud tiering policies",
  "body": [
   "Azure File Sync lets you keep using Windows file servers that users know, while Azure Files becomes the central, authoritative copy of the data. Each file server acts like a fast local cache. That gives you branch-office performance, easy disaster recovery (a new server can re-sync from the cloud) and, with cloud tiering, far less local disk.",
   "The pieces fit together in a fixed hierarchy. In Azure you create a Storage Sync Service resource. On each Windows Server you install the Azure File Sync agent and register the server with that Storage Sync Service; a server can be registered with only one Storage Sync Service at a time. Inside the service you create sync groups. A sync group defines one set of data that stays in sync, and it contains exactly one cloud endpoint and one or more server endpoints.",
   "The cloud endpoint is an Azure file share in a storage account. A server endpoint is a path on a registered server, such as `D:\\Shares\\Sales`. Every endpoint in the group syncs with every other through the cloud endpoint, so a change in a branch server flows to Azure and on to the other branches. One registered server can host server endpoints for several different sync groups, but two server endpoints in the same sync group cannot be on the same server, and endpoints in different groups must not overlap on the same volume path.",
   "Cloud tiering is an optional server endpoint setting. When on, the agent keeps frequently used files fully on the local disk and replaces rarely used ones with tiered files: stubs, implemented as reparse points, that keep the name, attributes and ACL but whose content lives only in Azure. When a user opens a tiered file, the content is recalled transparently. Two policies control tiering. The volume free space policy tells the agent to keep a percentage of the whole volume free, tiering the coldest files first to achieve it. The date policy tiers files not accessed within a set number of days, regardless of free space. When both are set, the volume free space policy wins if space is tight. You can recall files manually with `Invoke-StorageSyncFileRecall`, which helps before taking a server offline.",
   "Some rules the exam checks: cloud tiering is not supported on the system volume; changes made directly in the Azure file share (not through a server) are detected by a scheduled change detection job that runs about once a day, so they appear on servers with a delay; and backups should target the Azure file share (for example with Azure Backup snapshots) rather than tiered server copies. Antivirus and backup software on the server must respect the offline attribute, or they will trigger mass recalls.",
   "In the lab you will register a server, see it under Registered servers in the portal, add a server endpoint with the Cloud Tiering toggle and a free space percentage, then watch files in Explorer show the offline attribute once they tier."
  ],
  "terms": [
   [
    "Storage Sync Service",
    "The top-level Azure resource that registered servers join and that holds sync groups."
   ],
   [
    "Sync group",
    "A definition of one synchronized data set, made of one cloud endpoint and one or more server endpoints."
   ],
   [
    "Cloud endpoint",
    "The Azure file share that acts as the central copy in a sync group; each group has exactly one."
   ],
   [
    "Server endpoint",
    "A path on a registered Windows Server that participates in a sync group."
   ],
   [
    "Cloud tiering",
    "A server endpoint feature that keeps hot files local and replaces cold files with stubs that recall content from Azure on access."
   ]
  ],
  "example": "A firm with three branch offices creates one sync group per department share, with a cloud endpoint in Azure Files and server endpoints on each branch server. Cloud tiering keeps 20 percent of each branch's data volume free and tiers files untouched for 60 days, so small branch disks hold only current projects while every file stays available.",
  "tip": "Exactly one cloud endpoint per sync group; one Storage Sync Service per registered server; no cloud tiering on the system volume. If free space and date policies disagree, free space wins.",
  "check": [
   [
    "Can a sync group contain two Azure file shares?",
    "No. A sync group has exactly one cloud endpoint, which is one Azure file share; it can have multiple server endpoints."
   ],
   [
    "A user opens a file that shows the offline attribute on a cloud-tiering server. What happens?",
    "The Azure File Sync agent transparently recalls the file content from the Azure file share, and the file opens after the download."
   ],
   [
    "You copy files directly into the Azure file share through the portal. Why don't they appear on the servers immediately?",
    "Direct changes to the Azure share are found by a change detection job that runs roughly every 24 hours, not in real time."
   ]
  ]
 },
 {
  "t": "Azure Files with AD DS authentication; share-level RBAC vs NTFS permissions",
  "body": [
   "By default you mount an Azure file share with the storage account key, which is like a single all-powerful password. For real file server use you want users to connect with their normal domain identity and get per-user permissions. Azure Files supports identity-based access over SMB with on-premises Active Directory Domain Services (AD DS), Microsoft Entra Domain Services, or Microsoft Entra Kerberos for hybrid identities. This lesson focuses on AD DS.",
   "Enabling AD DS authentication means creating an identity for the storage account in your domain. You typically use the AzFilesHybrid PowerShell module and run `Join-AzStorageAccount` from a domain-joined machine, which creates a computer account (or a service logon account) representing the storage account in an OU you choose and configures the storage account with your domain information. The users who will access the share must be synced to Microsoft Entra ID by Entra Connect (or Cloud Sync), because share permissions are assigned in Azure to Entra identities. Clients need to reach the storage account on TCP port 445 and must be able to get Kerberos tickets from a DC.",
   "Access is then checked in two layers, just like a traditional Windows share. The first layer is share-level permissions, set with Azure role-based access control (RBAC). The built-in roles are Storage File Data SMB Share Reader (read), Storage File Data SMB Share Contributor (read, write, delete) and Storage File Data SMB Share Elevated Contributor (also change NTFS permissions). You can assign them to users or groups on the share, or configure a default share-level permission that applies to all authenticated identities, which is handy when you want NTFS to do all the fine-grained work.",
   "The second layer is directory and file-level permissions: ordinary Windows NTFS access control lists (ACLs). You set them by mounting the share and using File Explorer or `icacls`, just as on a Windows server. Initial configuration is often done by mounting once with the storage account key, which acts as a superuser, or by a user with the Elevated Contributor role. Azure File Sync preserves these ACLs too.",
   "Effective access is the most restrictive combination of the two layers. A user with Share Contributor but only Read in NTFS can only read; a user with Full Control in NTFS but no share role cannot connect at all. Note the difference from normal Azure data roles such as Storage Blob Data Contributor or the management role Owner: management-plane roles like Owner or Contributor let you configure the storage account but do not grant SMB data access by themselves.",
   "When troubleshooting, check in order: port 445 reachable, the storage account joined to AD with the right domain, the user synced to Entra ID, a share-level role (or default permission), then the NTFS ACL. The `Debug-AzStorageAccountAuth` cmdlet in AzFilesHybrid runs many of these checks."
  ],
  "terms": [
   [
    "AD DS authentication for Azure Files",
    "A configuration that represents the storage account as an AD object so domain users can access SMB shares with Kerberos."
   ],
   [
    "Share-level permissions",
    "Azure RBAC roles assigned on a file share that control whether an identity can connect and with what maximum access."
   ],
   [
    "Storage File Data SMB Share Elevated Contributor",
    "The share role that allows read, write, delete and modifying NTFS permissions."
   ],
   [
    "NTFS permissions",
    "Directory and file ACLs enforced inside the share, set with Explorer or icacls just as on a Windows file server."
   ]
  ],
  "example": "An admin joins a storage account to contoso.com with Join-AzStorageAccount, gives the synced group Finance-Users the Storage File Data SMB Share Contributor role on the finance share, then mounts it and uses icacls so Finance-Users can modify only the Reports folder and read the rest. A finance user maps the share with their own sign-in and no key.",
  "tip": "Both layers apply and the most restrictive wins. Share access is Azure RBAC on synced Entra identities; fine-grained control is NTFS. Owner or Contributor on the storage account does not give SMB data access.",
  "check": [
   [
    "Why must users be synced to Microsoft Entra ID when Azure Files uses AD DS authentication?",
    "Share-level permissions are Azure RBAC role assignments, which are granted to Entra identities; Kerberos then validates the matching AD account."
   ],
   [
    "A user has Full Control in NTFS on a folder but no share-level role and no default share permission. What access do they get?",
    "None; without share-level permission they cannot access the share, because both layers must allow access."
   ],
   [
    "Which share role lets a user change NTFS permissions on files?",
    "Storage File Data SMB Share Elevated Contributor."
   ]
  ]
 },
 {
  "t": "SMB security: encryption, signing, SMB over QUIC, removing SMBv1",
  "body": [
   "Server Message Block (SMB) is the protocol behind Windows file shares, and it carries sensitive data and credentials. Attackers target it to read traffic, tamper with it, relay authentication and exploit old protocol versions. Windows Server gives you four main controls: encryption, signing, SMB over QUIC and removing SMB version 1.",
   "SMB encryption, available in SMB 3.0 and later, encrypts data end to end between client and server using AES (Advanced Encryption Standard) modes such as AES-128-GCM and, on newer versions, AES-256. You can enable it per share with `Set-SmbShare -Name Finance -EncryptData $true` or for the whole server with `Set-SmbServerConfiguration -EncryptData $true`. By default, an encrypted share rejects clients that cannot encrypt (older SMB 2 clients); the `RejectUnencryptedAccess` setting controls that. Encryption protects confidentiality on untrusted networks without deploying IPsec or special hardware.",
   "SMB signing adds a cryptographic signature to each message so the receiver can detect tampering and so a man-in-the-middle cannot relay a session. Signing does not hide the data, it proves integrity and authenticity. You require it with Group Policy settings such as Microsoft network server: Digitally sign communications (always), or `Set-SmbServerConfiguration -RequireSecuritySignature $true`. Domain controllers have long required signing for SYSVOL and NETLOGON, and recent Windows versions, including Windows Server 2025, require signing more broadly by default. If a connection is encrypted, signing is not also needed, since encryption already provides integrity.",
   "SMB over QUIC lets clients reach file shares over the internet without a VPN. QUIC is a transport that runs over UDP port 443 and always uses TLS 1.3, so the whole SMB session, including authentication, is encrypted. The server needs a certificate that clients trust, mapped with `New-SmbServerCertificateMapping`, and you can restrict which clients may connect with client access control. In Windows Server 2022 this was limited to the Azure Edition; Windows Server 2025 brings it to its regular editions. It is a good fit for mobile users and branch devices where TCP port 445 is blocked, which it often is on public networks.",
   "SMB version 1 is decades old, lacks modern protections and was abused by worms such as WannaCry. It is not installed by default on current Windows Server versions, but upgraded or older systems may still have it. First audit who uses it with `Set-SmbServerConfiguration -AuditSmb1Access $true` and read the Microsoft-Windows-SMBServer/Audit log. Then disable it with `Set-SmbServerConfiguration -EnableSMB1Protocol $false` and remove the feature with `Uninstall-WindowsFeature FS-SMB1`. Anything that still needs SMBv1, such as an old scanner, should be upgraded or isolated.",
   "Use `Get-SmbConnection` on a client to see the dialect in use and `Get-SmbSession` on a server to see connected clients."
  ],
  "terms": [
   [
    "SMB encryption",
    "An SMB 3.x feature that encrypts file traffic end to end, enabled per share or server-wide."
   ],
   [
    "SMB signing",
    "Cryptographic signing of SMB messages that detects tampering and blocks relay attacks, without hiding content."
   ],
   [
    "SMB over QUIC",
    "SMB carried over QUIC on UDP 443 with TLS 1.3, allowing secure file access over the internet without a VPN."
   ],
   [
    "SMBv1",
    "The original SMB dialect, insecure and deprecated, which should be audited, disabled and removed."
   ]
  ],
  "example": "A legal firm enables encryption on its Contracts share so traffic crossing a shared branch link is unreadable, requires signing domain-wide via Group Policy, and turns on SMBv1 auditing for two weeks. The audit log shows one old copier using SMBv1; after replacing it, the admin runs Uninstall-WindowsFeature FS-SMB1 on every file server.",
  "tip": "Signing equals integrity and anti-relay; encryption equals confidentiality plus integrity. SMB over QUIC means UDP 443, TLS 1.3 and a certificate. Audit SMBv1 before removing it.",
  "check": [
   [
    "What port and protocol does SMB over QUIC use?",
    "UDP port 443, using QUIC with TLS 1.3 encryption."
   ],
   [
    "Does SMB signing prevent someone sniffing the network from reading file contents?",
    "No. Signing only proves integrity and authenticity; you need SMB encryption to hide the content."
   ],
   [
    "How can you find out which clients still use SMBv1 before disabling it?",
    "Enable SMB1 access auditing with Set-SmbServerConfiguration -AuditSmb1Access $true and review the Microsoft-Windows-SMBServer/Audit event log."
   ]
  ]
 },
 {
  "t": "File Server Resource Manager quotas and file screens; DFS Namespaces and DFS Replication",
  "body": [
   "File Server Resource Manager (FSRM) is a role service that helps you control what gets stored on file servers. Two features appear most on the exam: quotas and file screens. Distributed File System (DFS) is a separate pair of role services, DFS Namespaces and DFS Replication, that give users one path to shares spread across servers and keep copies in sync.",
   "FSRM quotas limit space on a folder or volume, unlike NTFS quotas which work per user per volume. A hard quota blocks writes once the limit is reached. A soft quota never blocks, only notifies, which is useful for monitoring. Quota templates let you define a limit plus thresholds (for example at 85 and 100 percent) with actions: send email, write an event, run a command or generate a storage report. An auto apply quota applies a template to every existing and new subfolder of a path, ideal for home folders.",
   "File screens block or monitor file types by name pattern, grouped into file groups such as Audio and Video Files or Executable Files. An active screen blocks the save; a passive screen allows it but notifies. File screen exceptions allow specific file groups inside a screened folder. Remember that screens match file names and extensions, not content, so a renamed file bypasses them. FSRM also offers file classification and storage reports; manage it with the FSRM console or cmdlets such as `New-FsrmQuota` and `New-FsrmFileScreen`.",
   "DFS Namespaces (DFS-N) create a virtual folder tree, such as `\\\\contoso.com\\Files\\Sales`, whose folders point to real shares called folder targets. A domain-based namespace is stored in AD, is reachable by the domain name and can have several namespace servers for availability; a stand-alone namespace lives on one server, reachable by its name. When a client opens a folder with multiple targets, it gets a referral listing them, ordered with targets in the client's own AD site first, so users automatically use the nearest server. You can then move shares between servers without changing user paths.",
   "DFS Replication (DFSR) keeps folders synchronized between servers using a multi-master model: changes on any member replicate to others. You create a replication group of member servers, replicated folders, and connections that define topology, such as hub and spoke or full mesh. DFSR uses remote differential compression (RDC) to send only changed blocks, a staging folder to prepare files, and a bandwidth schedule. During initial replication, the primary member's copy is authoritative. Conflicts are resolved by last writer wins, and losing versions go to the ConflictAndDeleted folder. DFSR does not lock files across servers, so it suits read-mostly or single-site-writer data, not files edited by many users in different places at once.",
   "The usual design combines them: a namespace folder with targets on two servers, kept in sync by DFSR, so users reach the local copy and survive a server loss."
  ],
  "terms": [
   [
    "Hard vs soft quota",
    "A hard quota blocks writes at the limit; a soft quota only sends notifications."
   ],
   [
    "Active vs passive file screen",
    "An active screen blocks saving matching files; a passive screen allows it but notifies or logs."
   ],
   [
    "Domain-based namespace",
    "A DFS namespace stored in AD, accessed via the domain name and hosted on one or more namespace servers."
   ],
   [
    "Referral",
    "The list of folder targets a DFS namespace returns to a client, ordered by site cost so the closest target is tried first."
   ],
   [
    "DFS Replication",
    "A multi-master engine that replicates folders between servers using remote differential compression and a staging area."
   ]
  ],
  "example": "A university applies an auto apply quota template of 5 GB with email alerts to the Students home folder root, and an active file screen blocking video files there. Departmental shares are published as \\\\uni.edu\\Dept with targets in two campuses kept in sync by DFSR, so each campus reads its local copy.",
  "tip": "Hard blocks, soft warns; active blocks, passive warns. DFSR has no distributed file locking, so beware answers that use it for files edited simultaneously at multiple sites.",
  "check": [
   [
    "You want every new user home folder under D:\\Home to get a 2 GB limit automatically. What do you configure?",
    "An FSRM auto apply quota on D:\\Home using a 2 GB hard quota template."
   ],
   [
    "How does a DFS namespace send a user to the nearest copy of a share?",
    "It returns a referral that orders folder targets by AD site cost, with targets in the client's site first."
   ],
   [
    "During initial DFSR replication, which copy wins if files differ?",
    "The primary member's copy is authoritative for the initial sync."
   ]
  ]
 },
 {
  "t": "Storage Spaces resiliency and provisioning; ReFS vs NTFS; Data Deduplication",
  "body": [
   "Storage Spaces is software-defined storage built into Windows Server. It lets you group ordinary disks into a storage pool, then create virtual disks (called storage spaces) from the pool with the resiliency you choose. It replaces the need for a hardware RAID controller on a single server and is the foundation for Storage Spaces Direct in clusters.",
   "Resiliency types trade capacity for protection. Simple stripes data with no redundancy; fast but any disk failure loses data, so use it only for scratch data. Mirror keeps copies: a two-way mirror stores two copies and survives one disk failure (at least two disks), and a three-way mirror stores three copies and survives two failures (at least five disks on a single server). Parity stores data plus parity information, like RAID 5 or 6, using capacity more efficiently but with slower writes; it suits archival or sequential data. Columns set how many disks a virtual disk stripes across, affecting performance and how many disks you add at a time when expanding.",
   "Provisioning can be fixed or thin. Fixed provisioning allocates all the space up front. Thin provisioning lets you create a virtual disk larger than the pool's current free space, allocating only as data is written; you must monitor the pool and add disks before it fills. You can also mark disks as hot spares or rely on pool-level rebuild. In PowerShell, `New-StoragePool`, `New-VirtualDisk -ResiliencySettingName Mirror -ProvisioningType Thin` and `Get-PhysicalDisk -CanPool $true` are the core commands; a failed disk shows the pool as degraded while data stays online.",
   "Resilient File System (ReFS) and NTFS are the two main file systems. ReFS is designed for large volumes and integrity: it checksums metadata (and data when integrity streams are on), can automatically repair corruption from a mirror copy in Storage Spaces, offers block cloning that makes VHDX checkpoint merges very fast, and uses sparse valid data length so creating or expanding fixed VHDX files is nearly instant. That's why ReFS is recommended for Hyper-V and Storage Spaces Direct volumes. NTFS remains the general-purpose choice and supports features ReFS lacks, such as booting Windows, NTFS file compression, Encrypting File System (EFS) and per-user disk quotas. You cannot convert between them in place; you reformat and copy.",
   "Data Deduplication finds repeated chunks of data across files on a volume and stores each chunk once, which can save a lot of space on file shares, VDI (virtual desktop) VHDX files and backup targets. It works post-process: files are written normally and a scheduled optimization job later chunks them into a chunk store, leaving reparse points. Other jobs, garbage collection and integrity scrubbing, clean up and verify. Enable it per volume with `Enable-DedupVolume -Volume E: -UsageType Default` (general file server), `HyperV` (VDI) or `Backup`. Dedup is not supported on system or boot volumes and skips files newer than a configurable minimum age. It works on NTFS and, on current versions, on ReFS."
  ],
  "terms": [
   [
    "Storage pool",
    "A group of physical disks from which Storage Spaces virtual disks are created."
   ],
   [
    "Two-way vs three-way mirror",
    "Mirror resiliency keeping two copies (tolerates one disk failure) or three copies (tolerates two)."
   ],
   [
    "Thin provisioning",
    "Creating a virtual disk larger than available space and allocating capacity only as data is written."
   ],
   [
    "ReFS",
    "Resilient File System, which checksums metadata (and data with integrity streams), self-repairs with Storage Spaces mirrors and supports fast block cloning."
   ],
   [
    "Data Deduplication",
    "A post-process feature that stores duplicate data chunks once per volume, with usage types Default, HyperV and Backup."
   ]
  ],
  "example": "An admin building a VDI host pools six SSDs, creates a thin-provisioned two-way mirror space formatted ReFS for the virtual desktop VHDX files, and enables deduplication with the HyperV usage type. The many near-identical desktop images shrink dramatically, and a disk failure leaves the pool degraded but online until the disk is replaced.",
  "tip": "Know what NTFS has that ReFS doesn't (boot, compression, EFS, disk quotas), and never pick dedup for the system volume. Thin provisioning can run out of real space, so it needs monitoring.",
  "check": [
   [
    "Which resiliency type gives the best capacity efficiency with protection, and what is its downside?",
    "Parity; it uses capacity efficiently but has slower random writes, so it suits archival or sequential workloads."
   ],
   [
    "Why is ReFS recommended for Hyper-V VHDX storage?",
    "Block cloning makes checkpoint merges fast, sparse valid data length makes fixed VHDX creation fast, and checksums with automatic repair protect large volumes."
   ],
   [
    "Which deduplication usage type fits a volume storing virtual desktop VHDX files?",
    "HyperV, the usage type designed for VDI workloads."
   ]
  ]
 },
 {
  "t": "Failover clustering: validation, cluster networks, quorum models and witnesses (disk, file share, cloud), Cluster-Aware Updating",
  "body": [
   "A failover cluster is a group of Windows Servers (nodes) that together keep clustered roles, such as a file server, Hyper-V VMs or SQL Server, running. If a node fails, the cluster restarts its roles on a surviving node. Clustering handles hardware and OS failures and planned maintenance; it is not a backup and does not protect against data corruption.",
   "Before creating a cluster you run validation with the Validate a Configuration wizard or `Test-Cluster -Node N1,N2`. It tests inventory, network, storage and system configuration and produces a report. Microsoft supports a cluster only if its configuration passes validation, and you should rerun it after significant changes. Warnings, such as a single network path, deserve attention; failures must be fixed. You then create the cluster with `New-Cluster -Name CLU1 -Node N1,N2 -StaticAddress 10.0.0.50`, which creates a cluster name object (CNO) computer account in AD.",
   "Cluster networks are the networks the cluster detects on node adapters. Each gets a role: cluster communication only (for heartbeats and internal traffic), cluster and client (also carries client traffic), or none (the cluster ignores it, typical for iSCSI storage networks). Having at least two networks between nodes avoids a single point of failure for heartbeats, and live migration can be given a preferred network.",
   "Quorum is how a cluster avoids split brain, where two halves both think they are in charge. Each node gets a vote and a witness can add one more; the cluster keeps running only while more than half of the votes are present. Models you should know: node majority (no witness, best with an odd number of nodes), node and disk majority, node and file share majority, and node majority with a cloud witness. Windows Server also uses dynamic quorum, adjusting votes as nodes leave so the cluster can survive down to the last node in sequential failures, and dynamic witness, which gives the witness a vote only when it helps make the total odd. Microsoft's guidance is to always configure a witness.",
   "Witness types differ. A disk witness is a small shared clustered disk that also stores a copy of the cluster database, so it needs shared storage. A file share witness is an SMB share on another server; it stores no cluster database, just a small log, and suits multi-site clusters or clusters without shared disks. A cloud witness uses an Azure Storage account blob as the tie-breaker, needs only outbound HTTPS from the nodes and is ideal when you lack a third site. Configure it with `Set-ClusterQuorum -CloudWitness -AccountName <name> -AccessKey <key>`.",
   "Cluster-Aware Updating (CAU) patches nodes one at a time: it drains roles from a node, installs updates, restarts it, brings roles back and moves on, keeping services online. In self-updating mode a CAU clustered role runs on the cluster itself on a schedule. In remote-updating mode you trigger an updating run from a separate computer with the CAU tools. Before enabling CAU, make sure the cluster can tolerate one node being down."
  ],
  "terms": [
   [
    "Validation",
    "The Test-Cluster checks of hardware and configuration; a passing report is required for a supported cluster."
   ],
   [
    "Quorum",
    "The majority of votes (nodes plus witness) a cluster needs to stay running, preventing split brain."
   ],
   [
    "Disk witness",
    "A small shared clustered disk that holds a vote and a copy of the cluster database."
   ],
   [
    "Cloud witness",
    "An Azure Storage blob used as the quorum tie-breaker, needing only a storage account and outbound HTTPS."
   ],
   [
    "Cluster-Aware Updating",
    "A feature that updates cluster nodes one at a time while roles move, in self-updating or remote-updating mode."
   ]
  ],
  "example": "A two-node Hyper-V cluster spans two server rooms with no third site. Using a disk witness would put the tie-breaker in one room, so the admin configures a cloud witness. When the network link between rooms fails, the node that can still reach the Azure storage account keeps quorum and runs the VMs, while the other stops its roles.",
  "tip": "Two-node or even-node clusters need a witness. No shared storage or multi-site means file share or cloud witness; only the disk witness stores the cluster database. CAU self-updating runs on the cluster, remote-updating from another machine.",
  "check": [
   [
    "Why is a witness important in a two-node cluster?",
    "With two votes, losing one node or the link leaves exactly half, which isn't a majority; the witness provides the tie-breaking third vote."
   ],
   [
    "Which witness type stores a copy of the cluster database?",
    "The disk witness. File share and cloud witnesses store no copy of the cluster database."
   ],
   [
    "What is the difference between CAU self-updating and remote-updating mode?",
    "Self-updating adds a CAU clustered role that updates the cluster on a schedule by itself; remote-updating is started on demand from a separate management computer."
   ]
  ]
 },
 {
  "t": "Storage Spaces Direct: minimum nodes, cache, resiliency; Scale-Out File Server for application data",
  "body": [
   "Storage Spaces Direct (S2D) builds highly available storage from the local drives inside each cluster node, with no shared SAN or JBOD enclosure. The nodes pool their drives over the network, usually with RDMA (remote direct memory access) network adapters for low latency, and present Cluster Shared Volumes (CSVs) that every node can use. It is a Datacenter edition feature.",
   "An S2D cluster needs at least two nodes and supports up to sixteen. Each node needs a supported set of local drives (not the boot drive), and all servers should be similar. You enable it after creating the cluster with `Enable-ClusterStorageSpacesDirect`, which claims eligible drives into one pool automatically. S2D can be deployed hyper-converged, where the same nodes run Hyper-V VMs and the storage, or converged (disaggregated), where the S2D cluster serves storage over SMB to separate compute hosts.",
   "The cache is built automatically from the fastest drive type present. With NVMe plus SSD, or SSD plus HDD, the faster drives become cache and the slower ones capacity; each cache drive is bound to capacity drives. For hybrid systems with HDD capacity the cache handles both reads and writes; when capacity is SSD, the cache handles writes only, because reading from SSD is already fast. An all-same-type system, such as all NVMe, can run with no cache. Cache drives do not add usable capacity.",
   "Resiliency is decided when you create each volume. A two-way mirror keeps two copies across servers, uses 50 percent efficiency and needs at least two nodes. A three-way mirror keeps three copies, tolerates two simultaneous failures, uses about 33 percent efficiency and needs at least three nodes; it's the recommended choice for performance-sensitive workloads. Dual parity needs at least four nodes and gives better efficiency that improves with more nodes. Mirror-accelerated parity combines a mirror tier for writes with a parity tier for capacity. Two-node clusters can use nested resiliency to survive a drive failure and a node failure at the same time. Create volumes with `New-Volume -FriendlyName VM01 -FileSystem CSVFS_ReFS -StoragePoolFriendlyName S2D* -Size 2TB`.",
   "Scale-Out File Server (SOFS) is a clustered file server role designed for application data such as Hyper-V VHDX files and SQL Server databases. Its shares live on CSVs and are active on all nodes simultaneously, so clients connect to any node and capacity and bandwidth scale out. Shares use continuous availability, so SMB transparent failover keeps open handles alive when a node fails. SOFS is paired with S2D in the converged model. It is not recommended for general user file shares, which create many metadata operations such as opening, closing and renaming small files; use the File Server for general use role for those.",
   "When exam questions describe VM or database files on SMB with no downtime during node failure, think SOFS; when they describe user home drives and departmental shares on a cluster, think File Server for general use."
  ],
  "terms": [
   [
    "Storage Spaces Direct",
    "Software-defined storage that pools local drives across 2 to 16 cluster nodes into highly available volumes."
   ],
   [
    "Cache tier",
    "The fastest drives in an S2D node, automatically used to cache writes (and reads too when capacity drives are HDDs) for the slower capacity drives."
   ],
   [
    "Cluster Shared Volume",
    "A clustered volume that all nodes can read and write at the same time, used by Hyper-V and SOFS."
   ],
   [
    "Nested resiliency",
    "A two-node S2D option that survives a node failure and a drive failure simultaneously."
   ],
   [
    "Scale-Out File Server",
    "An active-active clustered file server role on CSVs for application data, using continuously available SMB shares."
   ]
  ],
  "example": "A company builds a four-node hyper-converged S2D cluster with NVMe cache and SSD capacity. Critical SQL VMs go on a three-way mirror volume; a large archive volume uses dual parity. Later, a separate compute cluster is attached through a Scale-Out File Server so its Hyper-V hosts store VHDX files on continuously available shares.",
  "tip": "Minimums: 2 nodes for S2D and two-way mirror, 3 for three-way mirror, 4 for dual parity. SOFS is for application data, never the default answer for user home folders.",
  "check": [
   [
    "What is the minimum number of nodes for a three-way mirror volume in S2D?",
    "Three nodes."
   ],
   [
    "In an S2D node with NVMe and HDD drives, which drives become the cache?",
    "The NVMe drives, because S2D automatically uses the fastest drive type as cache for the slower capacity drives."
   ],
   [
    "Why isn't Scale-Out File Server recommended for user home folders?",
    "User workloads generate many metadata operations on small files, which SOFS handles poorly; it is optimized for large, long-open application files like VHDX and databases."
   ]
  ]
 },
 {
  "t": "Storage Replica: synchronous vs asynchronous, server-to-server and stretch cluster; guest clustering with shared VHDX",
  "body": [
   "Storage Replica is a Windows Server feature that replicates volumes at the block level to another server or cluster, mainly for disaster recovery. Because it works below the file system, it replicates everything on the volume, including open files, and it is unaware of which application wrote the blocks. It uses SMB 3 as its transport.",
   "Each replicated volume needs a matching log volume on both sides; writes go to the log first, then to the data volume. The source and destination data partitions must be the same size, and the destination volume is dismounted and not accessible while it is a replication target. Before configuring, run `Test-SRTopology` to measure the network and disk performance and get a report on whether your link can keep up. You create a partnership with `New-SRPartnership`, naming the source and destination computers, replication groups, and data and log volumes.",
   "Storage Replica runs in two modes. In synchronous mode, a write is only acknowledged to the application after it has been written to the log on both source and destination. This gives a recovery point objective (RPO) of zero: no committed data is lost if the source fails. The price is that every write waits for the round trip, so synchronous replication needs a fast, low-latency link, typically a metropolitan distance with a round trip of a few milliseconds. In asynchronous mode, the write is acknowledged once it hits the source log, and data is sent to the destination afterwards. It tolerates higher latency and longer distances but the RPO is not zero; a failure can lose the most recent writes.",
   "There are three scenarios. Server-to-server replicates between two standalone servers. Cluster-to-cluster replicates between two separate failover clusters. A stretch cluster is one failover cluster whose nodes are split across two sites, each site with its own storage, and Storage Replica keeps the storage in sync so the cluster can fail over automatically between sites. Stretch clusters are the only scenario with automatic failover; the others require you to switch direction manually, for example with `Set-SRPartnership`. Windows Server Standard edition includes Storage Replica with limits on the number and size of volumes, while Datacenter has no such limits.",
   "Guest clustering is a different high availability idea: you build a failover cluster from virtual machines, so an application is protected even if a VM's guest OS fails or needs patching. The guests need shared storage, and on Hyper-V the preferred way is a shared virtual hard disk using the VHD Set format (a `.vhds` file). You add it to each guest VM on a SCSI controller with sharing enabled. The VHD Set must live on a Cluster Shared Volume or a Scale-Out File Server share. Compared with the older shared `.vhdx`, VHD Sets support online resizing, host-level backup and Hyper-V Replica. Alternatives for guest shared storage are in-guest iSCSI and virtual Fibre Channel."
  ],
  "terms": [
   [
    "Storage Replica",
    "Block-level volume replication over SMB 3 between servers or clusters, requiring data and log volumes on both sides."
   ],
   [
    "Synchronous replication",
    "Writes are acknowledged only after reaching both sites, giving zero RPO but requiring low latency."
   ],
   [
    "Asynchronous replication",
    "Writes are acknowledged at the source and sent later, allowing long distances with a non-zero RPO."
   ],
   [
    "Stretch cluster",
    "One failover cluster split across two sites with replicated storage, supporting automatic failover between sites."
   ],
   [
    "VHD Set",
    "The .vhds shared virtual disk format for guest clusters, stored on CSV or SOFS and supporting online resize and host backup."
   ]
  ],
  "example": "A hospital with two datacenters 10 km apart builds a stretch cluster with Storage Replica in synchronous mode so no patient record write is lost. It also replicates to a third site 800 km away using a separate cluster-to-cluster partnership in asynchronous mode, accepting a few seconds of possible data loss for regional disasters.",
  "tip": "Zero data loss equals synchronous and short distance; long distance equals asynchronous. Automatic failover only in a stretch cluster. Shared VHDX for guest clusters goes on CSV or SOFS, attached via SCSI.",
  "check": [
   [
    "What is the RPO of synchronous Storage Replica and why?",
    "Zero, because the application gets an acknowledgment only after the write is logged on both source and destination."
   ],
   [
    "Can users read the destination volume while Storage Replica is replicating to it?",
    "No, the destination volume is dismounted and inaccessible while it is a replication target."
   ],
   [
    "Where must a VHD Set used for a Hyper-V guest cluster be stored?",
    "On a Cluster Shared Volume or on a Scale-Out File Server SMB share."
   ]
  ]
 },
 {
  "t": "Security baselines: OSConfig on Windows Server 2025, Microsoft Security Compliance Toolkit baselines, drift control",
  "body": [
   "A security baseline is a group of recommended configuration settings, such as password rules, audit policy, user rights, services and protocol hardening, that Microsoft has tested to balance security and compatibility. Applying a baseline gives every server a known, hardened starting point, and checking against it shows where servers have drifted. You need to know two ways to apply them: the Security Compliance Toolkit and, new in Windows Server 2025, OSConfig.",
   "The Microsoft Security Compliance Toolkit (SCT) is a free download containing baselines for Windows Server, Windows client, Microsoft Edge and other products. Each baseline comes as Group Policy object backups, documentation spreadsheets, and scripts to install them into local policy. The toolkit also includes Policy Analyzer, which compares GPOs and the local effective policy against a baseline and highlights conflicts or differences, and LGPO.exe, a command-line tool that imports settings into the local Group Policy of non-domain machines. In a domain you import the baseline GPO backups into new GPOs and link them to the OUs holding your member servers and domain controllers.",
   "OSConfig is a security configuration platform built into Windows Server 2025 and managed with the Microsoft.OSConfig PowerShell module (install it with `Install-Module -Name Microsoft.OSConfig`). It ships baseline scenarios for the server's role: domain controller, member server and workgroup member, plus a Secured-core scenario. You apply one with a single command, for example `Set-OSConfigDesiredConfiguration -Scenario SecurityBaseline/WS2025/MemberServer -Default`, and a restart may be needed. You check compliance with `Get-OSConfigDesiredConfiguration -Scenario SecurityBaseline/WS2025/MemberServer`, which shows each setting and whether it is compliant. The same baselines can be applied at scale to Azure Arc-enabled servers through Azure machine configuration and Azure Policy, or viewed from Windows Admin Center.",
   "Drift control is what makes OSConfig more than a one-time script. Once a baseline is applied, OSConfig periodically checks the settings and automatically returns any that have been changed to the desired value. That means an admin who weakens a setting locally, or a tool that changes it, doesn't leave the server permanently out of compliance. You can customize individual settings (for example to allow a legacy protocol a line-of-business app needs) and they remain your desired value under drift control. To stop managing a scenario, remove it with `Remove-OSConfigDesiredConfiguration`.",
   "Choosing between them: Group Policy with SCT baselines suits domain environments with existing GPO management and older Windows Server versions. OSConfig suits Windows Server 2025, including non-domain servers and hybrid servers managed through Azure Arc, and adds built-in drift remediation. Avoid managing the same setting with both a GPO and OSConfig, since competing tools make troubleshooting confusing.",
   "Before applying any baseline in production, test it on a lab or pilot server. Baselines disable older protocols and change rights, which can break applications."
  ],
  "terms": [
   [
    "Security baseline",
    "A Microsoft-recommended set of security configuration settings for a product and role."
   ],
   [
    "Security Compliance Toolkit",
    "A free set of baselines as GPO backups plus tools such as Policy Analyzer and LGPO.exe."
   ],
   [
    "OSConfig",
    "A Windows Server 2025 security configuration platform, managed with PowerShell, that applies role-based baselines."
   ],
   [
    "Drift control",
    "OSConfig's periodic check that automatically resets changed baseline settings to their desired values."
   ],
   [
    "Policy Analyzer",
    "An SCT tool that compares GPOs or local policy against baselines and flags differences and conflicts."
   ]
  ],
  "example": "A team deploying new Windows Server 2025 member servers applies the OSConfig MemberServer baseline during build. Weeks later a technician disables a hardening setting while troubleshooting and forgets to revert it; drift control resets it at the next check, and the compliance report stays clean.",
  "tip": "OSConfig is Windows Server 2025 with drift control; SCT is GPO backups plus Policy Analyzer and LGPO for any supported version. Choose the scenario matching the server's role (DC, member or workgroup).",
  "check": [
   [
    "What does drift control do in OSConfig?",
    "It periodically checks the applied baseline settings and automatically reverts any that were changed back to the desired values."
   ],
   [
    "Which SCT tool compares your current GPOs against a Microsoft baseline?",
    "Policy Analyzer."
   ],
   [
    "How would you apply a baseline to a non-domain Windows Server 2019 machine using the SCT?",
    "Use LGPO.exe (or the baseline's local install script) to import the baseline settings into local Group Policy."
   ]
  ]
 },
 {
  "t": "Credential Guard and virtualization-based security; LSA protection",
  "body": [
   "Attackers who get administrator rights on a server often dump credentials from the memory of the Local Security Authority Subsystem Service (LSASS), then reuse NTLM hashes or Kerberos tickets to move to other machines, known as pass-the-hash and pass-the-ticket. Windows Server has two defenses that protect LSASS: Credential Guard, built on virtualization-based security, and LSA protection.",
   "Virtualization-based security (VBS) uses the Hyper-V hypervisor to create an isolated region of memory, called Virtual Secure Mode, that even the normal Windows kernel cannot read. Security-critical code runs there. Features built on VBS include Credential Guard and memory integrity, also called hypervisor-protected code integrity (HVCI), which checks kernel code before it runs. VBS requires a 64-bit CPU with virtualization extensions and second-level address translation, UEFI firmware with Secure Boot, and ideally a TPM (Trusted Platform Module) to protect its keys. Check status in `msinfo32` under Virtualization-based security.",
   "Credential Guard moves the secrets LSASS protects, such as NTLM password hashes and Kerberos ticket-granting tickets, into an isolated process called LSAIso inside Virtual Secure Mode. LSASS talks to it by remote procedure call but never holds the raw secrets, so tools that dump LSASS memory get nothing reusable. You enable it with Group Policy (Computer Configuration, Administrative Templates, System, Device Guard, Turn On Virtualization Based Security) or via registry and management tools, choosing whether to use a UEFI lock that prevents remote disabling. Limitations the exam likes: Credential Guard is not supported on domain controllers, because it cannot protect the AD database; it blocks NTLMv1, unconstrained Kerberos delegation and saved credentials delegation for protected accounts, which can break old apps; and it doesn't stop keyloggers or attacks on credentials typed into other apps.",
   "LSA protection runs LSASS itself as a Protected Process Light (PPL). Only code signed appropriately can then load into LSASS or open its memory, so non-protected processes, even running as administrator, cannot inject code or read memory. You enable it by setting the registry value `RunAsPPL` under `HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa` (1 with a UEFI variable lock, 2 without), or with Group Policy on newer versions, then restarting. Before enforcing, you can audit which plug-ins and drivers would fail to load; related events appear in the CodeIntegrity log. Unlike Credential Guard, LSA protection doesn't need VBS and can be used on domain controllers.",
   "The two stack well: LSA protection hardens the LSASS process, and Credential Guard removes the most valuable secrets from it altogether. Neither replaces good privileged access practices such as tiered administration and not logging on to servers with domain admin accounts."
  ],
  "terms": [
   [
    "Virtualization-based security",
    "Hyper-V-backed isolation that creates a secure memory region the normal OS kernel cannot access."
   ],
   [
    "Credential Guard",
    "A VBS feature that stores NTLM hashes and Kerberos TGTs in the isolated LSAIso process to defeat credential dumping."
   ],
   [
    "LSA protection",
    "Running LSASS as a Protected Process Light so unsigned or non-protected code cannot read its memory or inject into it."
   ],
   [
    "HVCI (memory integrity)",
    "A VBS feature that validates kernel-mode code integrity inside the secure environment before it runs."
   ]
  ],
  "example": "After a phishing incident, a security team enables Credential Guard on all member servers and LSA protection on all servers including domain controllers. In a later red team exercise, an attacker with local admin on an app server dumps LSASS memory but finds no reusable NTLM hashes or TGTs, so lateral movement fails.",
  "tip": "Credential Guard needs VBS (UEFI, Secure Boot, virtualization extensions) and is not supported on DCs; LSA protection (RunAsPPL) works on DCs and doesn't need VBS.",
  "check": [
   [
    "Where do NTLM hashes and Kerberos TGTs live when Credential Guard is enabled?",
    "In the LSAIso process inside Virtual Secure Mode, isolated from the normal OS and LSASS."
   ],
   [
    "You want to protect LSASS on domain controllers. Which feature can you use?",
    "LSA protection (RunAsPPL), because Credential Guard is not supported on domain controllers."
   ],
   [
    "Name two platform requirements for VBS.",
    "Any two of: 64-bit CPU with virtualization extensions and SLAT, UEFI with Secure Boot, and ideally a TPM."
   ]
  ]
 },
 {
  "t": "App Control for Business (WDAC) policies and audit mode; AppLocker differences",
  "body": [
   "Application control means allowing only approved code to run, instead of trying to detect every piece of bad code. On a server, where the set of needed software is small and stable, it is one of the strongest defenses against ransomware and attacker tools. Windows offers two technologies: App Control for Business, formerly called Windows Defender Application Control (WDAC), and the older AppLocker.",
   "App Control for Business works through the Windows code integrity engine. A policy, written in XML and compiled to a binary file, lists rules that allow or deny code, and Windows checks every driver, executable, DLL and script host against it, including kernel-mode drivers. Rules can be based on the signer (publisher certificate, optionally product name and version), a file hash, a file path, a managed installer (software deployed by a trusted tool such as Configuration Manager is allowed automatically), or reputation from the Intelligent Security Graph. Policy rule options control behavior, such as whether audit mode is on or whether script enforcement applies.",
   "You build a policy from one of the example templates, such as the default Windows mode that allows Windows and Microsoft-signed code, using the App Control Policy Wizard or cmdlets like `New-CIPolicy`, `Set-RuleOption` and `ConvertFrom-CIPolicy`. Current Windows versions support multiple policies at once: base policies and supplemental policies that expand a base, which lets different teams add their apps. You deploy with Group Policy, Intune, Configuration Manager, or the `CiTool.exe` command on supported versions.",
   "Always start in audit mode. In audit mode nothing is blocked; instead, every time code would have been blocked, Windows logs an event (event ID 3076) in the Microsoft-Windows-CodeIntegrity/Operational log, and script or MSI events in the AppLocker logs. You run the server's normal workload for a while, review the events, add rules for legitimate software, and only then switch to enforced mode, where blocks are logged as event ID 3077. Keep a rollback path, like a VM checkpoint in a lab, because an overly strict policy on boot drivers can stop a server from starting.",
   "AppLocker is the older feature. Its rules are also publisher, path or hash based, but it only controls user-mode code, applies rules to specific users or groups, and requires the Application Identity service to be running. It is configured in Group Policy under Application Control Policies, with rule collections for executables, Windows Installer files, scripts, packaged apps and DLLs, and has an audit only mode with events like 8003 (would have been blocked) and 8004 (blocked).",
   "Key differences for the exam: App Control applies to the whole device, including kernel drivers, and is the security boundary Microsoft recommends and keeps improving; AppLocker is considered defense in depth and receives no new features. Choose AppLocker (possibly alongside App Control) only when you need different rules for different users on the same machine, such as a Remote Desktop Session Host."
  ],
  "terms": [
   [
    "App Control for Business",
    "The Windows code integrity based application control feature, formerly WDAC, that governs drivers and user-mode code device-wide."
   ],
   [
    "Audit mode",
    "A policy mode that logs what would be blocked (event 3076) without blocking, used to test policies before enforcing."
   ],
   [
    "Supplemental policy",
    "An App Control policy that extends a base policy to allow additional applications."
   ],
   [
    "Managed installer",
    "A trusted deployment tool whose installed software App Control automatically allows."
   ],
   [
    "AppLocker",
    "An older user-mode application control feature with per-user or per-group rules, requiring the Application Identity service."
   ]
  ],
  "example": "An admin creates an App Control policy from the default Windows template in audit mode and deploys it to a pilot file server. After a week, the CodeIntegrity log shows event 3076 for the backup agent and a monitoring tool; the admin adds signer rules for both vendors, removes the audit option, redeploys, and now unapproved executables such as a copied-in admin tool are blocked with event 3077.",
  "tip": "Need to block drivers or apply to everyone on the device: App Control. Need rules per user or group: AppLocker. Always audit first, reading event 3076 before enforcing.",
  "check": [
   [
    "Which event ID in the CodeIntegrity log shows code that would have been blocked by an App Control policy in audit mode?",
    "Event ID 3076; event ID 3077 indicates an actual block in enforced mode."
   ],
   [
    "What service must be running for AppLocker rules to be enforced?",
    "The Application Identity service (AppIDSvc)."
   ],
   [
    "A Remote Desktop server needs different allowed apps for two user groups. Which technology fits?",
    "AppLocker, because it can apply rules to specific users or groups, whereas App Control policies apply to the whole device."
   ]
  ]
 },
 {
  "t": "Windows LAPS: backing up local admin passwords to AD DS or Entra ID, rotation and retrieval permissions",
  "body": [
   "If every server shares the same local Administrator password, one compromised server gives an attacker the key to all of them. Windows Local Administrator Password Solution (Windows LAPS) fixes this by giving every device a unique, random, regularly rotated local admin password and storing it securely in a directory where authorized people can retrieve it. Windows LAPS is built into supported Windows and Windows Server versions through updates; you don't install an agent. It replaces the older, separately installed legacy Microsoft LAPS, and uses different AD attributes.",
   "Each device backs up its password to one directory, chosen by policy: Active Directory Domain Services or Microsoft Entra ID, not both at once. Entra ID backup suits Entra-joined and hybrid-joined devices, and is typically configured with Intune. AD DS backup suits domain-joined servers and is typically configured with Group Policy under Computer Configuration, Administrative Templates, System, LAPS. On domain controllers, Windows LAPS can also back up the Directory Services Restore Mode (DSRM) password, but only to AD DS.",
   "Setting up AD DS backup takes a few steps. First, extend the schema with `Update-LapsADSchema`, which adds the new msLAPS attributes to computer objects. Second, give computers permission to write their own password with `Set-LapsADComputerSelfPermission -Identity \"OU=Servers,DC=contoso,DC=com\"`. Third, configure the policy: the backup directory, the managed account name if not the built-in Administrator, password complexity and length, and the password age after which it rotates. You can also enable password encryption, which encrypts the password in AD so only a chosen group (Domain Admins by default) can decrypt it; this requires a domain functional level of Windows Server 2016 or higher. Encryption also allows keeping a password history.",
   "Retrieval permissions are separate from write permissions. In AD, you grant a group the right to read passwords on an OU with `Set-LapsADReadPasswordPermission -Identity <OU> -AllowedPrincipals CONTOSO\\HelpDesk`, and if encryption is on, that group must also be an authorized decryptor. Retrieve with `Get-LapsADPassword -Identity SRV01 -AsPlainText` or the LAPS tab on the computer object in Active Directory Users and Computers. In Entra ID, retrieval is governed by Entra roles or custom roles with the local credential read permission, and passwords appear on the device in the Entra admin center or Intune.",
   "Rotation happens automatically when the password reaches its maximum age. You can force it early: run `Reset-LapsPassword` on the device, or set the expiration time in AD with `Set-LapsADPasswordExpirationTime` so the device rotates at its next policy processing. Post-authentication actions can automatically reset the password, and optionally sign out or restart, after the managed account is used and a grace period expires, so a retrieved password is not usable for long. Troubleshoot with the Microsoft-Windows-LAPS/Operational event log and `Invoke-LapsPolicyProcessing`."
  ],
  "terms": [
   [
    "Windows LAPS",
    "A built-in Windows feature that sets unique, rotated local admin passwords and backs them up to AD DS or Entra ID."
   ],
   [
    "Update-LapsADSchema",
    "The cmdlet that extends the AD schema with the Windows LAPS attributes."
   ],
   [
    "Set-LapsADComputerSelfPermission",
    "Grants computers in an OU permission to write their own LAPS password to AD."
   ],
   [
    "Password encryption",
    "An AD backup option that encrypts stored passwords so only authorized decryptors can read them; needs Windows Server 2016 DFL."
   ],
   [
    "Post-authentication actions",
    "Automatic reset, sign-out or restart after the managed account is used and a grace period passes."
   ]
  ],
  "example": "A help desk technician needs local admin on a server that lost its domain trust. Because the HelpDesk group was granted read permission on the Servers OU, the technician runs Get-LapsADPassword -Identity SRV07 -AsPlainText, signs in locally and repairs the trust. Two hours later, the post-authentication action resets the password automatically.",
  "tip": "A device backs up to AD DS or Entra ID, never both. Remember the three AD setup cmdlets in order: schema, computer self permission, read permission. DSRM password backup is AD only.",
  "check": [
   [
    "Which cmdlet lets the help desk group read LAPS passwords for computers in an OU?",
    "Set-LapsADReadPasswordPermission with the OU as -Identity and the group as -AllowedPrincipals."
   ],
   [
    "Can Windows LAPS back up a DC's DSRM password to Microsoft Entra ID?",
    "No. DSRM password backup is supported only to AD DS."
   ],
   [
    "How can you make a server rotate its LAPS password right away?",
    "Run Reset-LapsPassword on the server, or set its expiration time in AD with Set-LapsADPasswordExpirationTime and trigger policy processing."
   ]
  ]
 },
 {
  "t": "Hardening domain controllers: tiered administration, Protected Users, privileged access workstations, restricting who can log on to DCs",
  "body": [
   "Domain controllers hold every account's password hash, so whoever controls a DC controls the domain. Hardening DCs is less about one setting and more about keeping powerful credentials away from places where they can be stolen. The exam expects you to know four ideas: tiered administration, the Protected Users group, privileged access workstations and logon restrictions.",
   "Tiered administration separates systems and admin accounts by how much control they have. Tier 0 is identity: domain controllers, AD itself, and anything that controls them, such as Entra Connect servers, certificate authorities and the tools that manage DCs. Tier 1 is servers and applications. Tier 2 is user workstations and devices. The rule is that a higher-tier credential must never be used on a lower-tier system, because a compromised lower-tier machine could capture it. A domain admin should never sign in to a file server or a help desk laptop. Microsoft's newer enterprise access model describes the same idea as a control plane, management plane and data or workload plane, but the principle is identical.",
   "Protected Users is a built-in global security group that applies extra protections to its members when they sign in. Members cannot authenticate with NTLM, only Kerberos; Kerberos cannot use weak DES or RC4 encryption for preauthentication; their credentials are not cached, so offline sign-in doesn't work; their accounts cannot be delegated; and their Kerberos ticket-granting tickets have a short, non-renewable lifetime (four hours by default). Add human admin accounts, not service accounts or computer accounts, which would break. Test first, because apps that need NTLM or delegation will fail for members.",
   "A privileged access workstation (PAW) is a dedicated, hardened device used only for administrative tasks, with no email or web browsing, strong application control and tight network restrictions. Tier 0 admins manage DCs from a Tier 0 PAW, often through Remote Server Administration Tools, so their credentials are never typed on an internet-facing workstation. Combine this with separate admin accounts for each tier, distinct from the user's daily account.",
   "Restricting logons enforces the tiers. On DCs, the default Allow log on locally and Allow log on through Remote Desktop Services rights should be limited to Tier 0 admins. On Tier 1 and Tier 2 machines, a GPO should add Domain Admins, Enterprise Admins and other Tier 0 groups to Deny log on locally, Deny log on through Remote Desktop Services, Deny access to this computer from the network, Deny log on as a batch job and Deny log on as a service. Authentication policies and silos, available at domain functional level 2012 R2 and above, can go further by allowing Tier 0 accounts to get Kerberos tickets only from specified hosts. Also mark admin accounts Account is sensitive and cannot be delegated.",
   "Round this out with basic DC hygiene: install no extra roles or apps, don't browse the web on DCs, disable the Print Spooler service where not needed, keep the number of Domain Admins small, and use read-only DCs in branches with weak physical security."
  ],
  "terms": [
   [
    "Tier 0",
    "The identity tier: domain controllers, AD and systems that control them; its credentials must never be exposed on lower tiers."
   ],
   [
    "Protected Users",
    "A global group whose members cannot use NTLM, DES or RC4, cached credentials or delegation, and get short-lived TGTs."
   ],
   [
    "Privileged access workstation",
    "A dedicated hardened device used only for administration of sensitive systems."
   ],
   [
    "Authentication policy silo",
    "An AD object that limits where members of a silo can obtain Kerberos tickets, restricting privileged accounts to specified hosts."
   ]
  ],
  "example": "After an audit finds Domain Admins signing in to file servers, the company creates separate Tier 0 accounts added to Protected Users, issues Tier 0 PAWs to three admins, and links a GPO to the server and workstation OUs that denies local, RDP, network, batch and service logon to Domain Admins and Enterprise Admins.",
  "tip": "Protected Users is for human admin accounts only; never add service or computer accounts. Deny-logon rights for Tier 0 groups go on lower-tier machines, not on DCs.",
  "check": [
   [
    "Why shouldn't a domain admin sign in interactively to a member file server?",
    "If that server is compromised, the admin's credentials could be captured from its memory, giving the attacker Tier 0 control; higher-tier credentials must not touch lower tiers."
   ],
   [
    "Name three effects of adding a user to Protected Users.",
    "Any three: no NTLM, no DES or RC4 Kerberos preauthentication, no cached credentials, no delegation, short non-renewable TGTs."
   ],
   [
    "Which user rights would you configure with a GPO on member servers to keep Domain Admins off them?",
    "Deny log on locally, Deny log on through Remote Desktop Services, Deny access to this computer from the network, and Deny log on as a batch job and as a service."
   ]
  ]
 },
 {
  "t": "Windows Defender Firewall profiles, rules and connection security (IPsec) rules",
  "body": [
   "Windows Defender Firewall with Advanced Security is a host-based stateful firewall on every Windows Server. It filters inbound and outbound traffic per server, which limits lateral movement even inside a trusted network. It also hosts connection security rules, which use IPsec to authenticate and optionally encrypt traffic between computers.",
   "The firewall has three profiles, and each network adapter uses one depending on the network it detects through Network Location Awareness. The Domain profile applies when the computer can authenticate to a domain controller on that network. Private applies to networks an admin marked as private. Public applies to everything else and should be the most restrictive. Each profile has its own state and default actions, which by default are block inbound (unless a rule allows) and allow outbound. Check them with `Get-NetFirewallProfile`. A common troubleshooting clue is a server stuck on the Public profile because it couldn't reach a DC at startup.",
   "Firewall rules match traffic by program, port and protocol, predefined service groups (such as File and Printer Sharing), or custom combinations, scoped to local and remote IP addresses, profiles and interface types. Each rule's action is allow, block, or allow the connection if it is secure, which requires IPsec protection. Block rules take precedence over allow rules, so an explicit block wins even if another rule allows the same traffic; the exception is an allow-if-secure rule with the override block rules option, used for authorized scanners. Create rules in the console or with PowerShell, for example `New-NetFirewallRule -DisplayName \"SQL 1433\" -Direction Inbound -Protocol TCP -LocalPort 1433 -RemoteAddress 10.0.5.0/24 -Action Allow -Profile Domain`. In a domain, deploy rules by GPO; the rule merging setting decides whether local admins' rules also apply. Logging to `pfirewall.log` records dropped packets for troubleshooting.",
   "Connection security rules tell Windows when to use IPsec (Internet Protocol security) between hosts. Rule types are isolation (require authentication for traffic based on domain membership or health), authentication exemption (skip IPsec for hosts that can't do it, such as DCs or DHCP servers), server-to-server (protect traffic between specific endpoints), tunnel (between gateway computers) and custom. For each, you choose whether to request or require authentication for inbound and outbound connections, and an authentication method: Kerberos V5 computer (and optionally user) authentication for domain members, computer certificates for non-domain or cross-forest hosts, or a preshared key, which is weak and meant only for testing. IPsec negotiates security associations in main mode (authenticating the peers) and quick mode (protecting the data); you can view active ones under Monitoring, Security Associations.",
   "The typical domain isolation design is: a GPO with an isolation rule set to request authentication while you pilot, then require inbound; exemptions for infrastructure servers; and firewall allow-if-secure rules on sensitive servers so only authenticated domain computers, or members of a specific group, can connect."
  ],
  "terms": [
   [
    "Firewall profile",
    "Domain, Private or Public: a set of firewall settings chosen per network adapter based on the detected network."
   ],
   [
    "Allow the connection if it is secure",
    "A rule action that allows traffic only when protected by IPsec authentication and optionally encryption."
   ],
   [
    "Connection security rule",
    "A rule telling Windows when and how to use IPsec between computers, such as isolation or server-to-server."
   ],
   [
    "Authentication exemption",
    "A connection security rule that exempts listed hosts from IPsec requirements."
   ],
   [
    "Main mode and quick mode",
    "The IPsec negotiation phases: main mode authenticates peers, quick mode sets up protection for data."
   ]
  ],
  "example": "A finance app server should accept connections only from domain computers in the Finance-PCs group. The admin creates a domain isolation rule requiring Kerberos computer authentication inbound, then an inbound firewall rule on the app port with the action allow if secure and authorized computers set to Finance-PCs. A non-domain laptop on the same subnet can no longer connect.",
  "tip": "Block rules beat allow rules, except allow-if-secure with override block rules. Preshared key is for testing only. Domain profile needs the machine to authenticate to a DC on that network.",
  "check": [
   [
    "An inbound allow rule and an inbound block rule both match the same traffic. What happens?",
    "The traffic is blocked, because block rules take precedence over allow rules (unless an allow-if-secure rule has override block rules set)."
   ],
   [
    "Which IPsec authentication method suits two non-domain servers in a production DMZ?",
    "Computer certificates, because Kerberos requires domain membership and preshared keys are weak and meant only for testing."
   ],
   [
    "A domain server's adapter shows the Public profile. What should you check?",
    "Whether the server could reach and authenticate to a domain controller on that network, for example DNS settings or connectivity at startup."
   ]
  ]
 },
 {
  "t": "Microsoft Defender for Servers via Defender for Cloud: onboarding Arc and Azure servers, recommendations, just-in-time VM access",
  "body": [
   "Microsoft Defender for Cloud is Azure's cloud security posture management and workload protection service. For Windows Servers, whether they run in Azure, on-premises or in another cloud, it tells you what is misconfigured, how to fix it, and alerts you to threats. The paid Defender for Servers plan adds workload protection features on top of the free foundational posture management.",
   "Defender for Servers comes in two plans. Plan 1 focuses on endpoint protection through integration with Microsoft Defender for Endpoint, which provides antivirus, endpoint detection and response, and vulnerability findings. Plan 2 includes everything in Plan 1 and adds features such as just-in-time VM access, file integrity monitoring, agentless machine scanning and other advanced server protections. When exam questions mention JIT or file integrity monitoring, the answer requires Plan 2.",
   "Onboarding Azure VMs is simple: enable Defender for Servers on the subscription (in Environment settings) and all VMs in it are covered, with extensions such as the Defender for Endpoint integration deployed automatically. On-premises and other-cloud servers are onboarded through Azure Arc. Once you install the Azure Connected Machine agent and the server appears as an Arc-enabled server resource in a subscription where the plan is on, Defender for Cloud treats it much like an Azure VM, provisioning Defender for Endpoint and assessing it. This is why Arc is the standard answer for bringing hybrid servers under Defender for Cloud.",
   "Recommendations are the heart of posture management. Defender for Cloud continuously assesses resources against its security benchmark and lists findings such as missing system updates, endpoint protection not installed, management ports open to the internet or vulnerabilities found. Each has a severity, affected resources and remediation steps; some offer a Fix button that remediates automatically. Recommendations roll up into a secure score, so fixing high-impact ones raises the score most. You can also exempt resources where a recommendation doesn't apply.",
   "Just-in-time (JIT) VM access reduces exposure of management ports such as RDP on TCP 3389 and SSH on TCP 22 for Azure VMs. When you enable JIT on a VM, Defender for Cloud adds deny rules for those ports to the VM's network security group (or Azure Firewall). When an admin needs access, they request it in the portal or via API, specifying the port, their source IP and a time window up to the configured maximum. If their Azure role-based access control permissions allow, Defender for Cloud temporarily adds an allow rule for that source IP, then removes it when the window ends. Every request is logged in the activity log. JIT works for Azure VMs protected by an NSG or Azure Firewall; it doesn't apply to on-premises Arc servers, which are protected by your own firewalls.",
   "In practice, look at the Inventory and Recommendations pages to spot unprotected servers, and the Workload protections page to configure JIT."
  ],
  "terms": [
   [
    "Defender for Cloud",
    "Azure's security posture management and workload protection service for Azure, hybrid and multicloud resources."
   ],
   [
    "Defender for Servers Plan 2",
    "The server protection plan that adds features such as JIT VM access and file integrity monitoring to Plan 1."
   ],
   [
    "Recommendation",
    "A Defender for Cloud finding describing a security weakness on a resource and how to remediate it."
   ],
   [
    "Secure score",
    "A measure of security posture that rises as you remediate recommendations."
   ],
   [
    "Just-in-time VM access",
    "A feature that blocks management ports by default and opens them only for approved requests, source IPs and time windows."
   ]
  ],
  "example": "An organization enables Defender for Servers Plan 2 on its production subscription and onboards 40 on-premises servers through Azure Arc. The recommendations list shows RDP open to the internet on two Azure VMs; the admin enables JIT, and from then on engineers request three-hour RDP access from their office IP, which closes automatically.",
  "tip": "On-premises servers reach Defender for Cloud through Azure Arc. JIT and file integrity monitoring mean Plan 2, and JIT applies to Azure VMs via NSG or Azure Firewall rules.",
  "check": [
   [
    "How do you bring an on-premises Windows Server under Defender for Servers?",
    "Onboard it to Azure Arc with the Connected Machine agent in a subscription where Defender for Servers is enabled."
   ],
   [
    "What does JIT change on the VM's network security group?",
    "It adds deny rules for the protected management ports and, on approved requests, temporarily adds allow rules for the requester's IP and time window."
   ],
   [
    "Which Defender for Servers plan is needed for just-in-time VM access?",
    "Plan 2."
   ]
  ]
 },
 {
  "t": "Encryption: BitLocker on servers and Azure VM disk encryption options; SMB signing and encryption",
  "body": [
   "Encryption protects data in two states: at rest on disks and in transit across the network. For Windows Server you should know BitLocker for on-premises disks, the several ways Azure encrypts VM disks, and SMB signing and encryption for file traffic.",
   "BitLocker Drive Encryption encrypts whole volumes so that a stolen disk or server is unreadable. On Windows Server it is an optional feature you add with `Install-WindowsFeature BitLocker -IncludeAllSubFeature -IncludeManagementTools`, followed by a restart. The OS volume is normally protected by the TPM (Trusted Platform Module), which releases the key only if the boot components are unchanged; data volumes can use auto-unlock. Always create a recovery password protector and back it up, for example to AD DS through Group Policy, so you can recover if the TPM measurements change. Commands include `Enable-BitLocker -MountPoint C: -TpmProtector`, `Add-BitLockerKeyProtector -RecoveryPasswordProtector` and `manage-bde -status`. Servers in a datacenter that must restart unattended with a PIN-protected setup can use BitLocker Network Unlock, which releases the key when the server boots on the trusted corporate network. BitLocker also supports Cluster Shared Volumes and is valuable for branch office servers with weak physical security.",
   "Azure VM disks are encrypted in several layers. Server-side encryption (SSE) is always on for managed disks, encrypting data at rest in Azure storage with platform-managed keys by default. You can switch to customer-managed keys stored in Azure Key Vault through a disk encryption set, when policy requires you to control and rotate the key. Encryption at host extends protection so that the VM's temporary disk and the OS and data disk caches on the physical host are encrypted too, with data encrypted before it flows to storage. Azure Disk Encryption (ADE) is the older option that runs BitLocker inside the Windows guest, with keys kept in Key Vault; Microsoft has announced its retirement and recommends encryption at host for new deployments. Confidential VMs add confidential disk encryption that binds keys to the VM's TPM.",
   "Distinguish them by where encryption happens: SSE encrypts in the storage service, encryption at host encrypts on the Hyper-V host before storage, and ADE encrypts inside the guest OS. SSE with platform keys needs no action at all; questions about controlling your own keys point to customer-managed keys; questions about temp disk and cache point to encryption at host.",
   "For data in transit between Windows machines, SMB offers two protections you met in the SMB security lesson. SMB signing adds a signature to each message, protecting integrity and preventing relay attacks, but traffic is still readable. SMB encryption (SMB 3.x) encrypts the payload, giving confidentiality and integrity, and can be required per share with `Set-SmbShare -EncryptData $true` or server-wide. Newer Windows versions require signing by default in more cases, and signing is unnecessary on a connection that is already encrypted.",
   "A complete design for a sensitive file server might be: BitLocker on the server's volumes, SMB encryption on its shares, and, if it runs in Azure, customer-managed keys plus encryption at host on its disks."
  ],
  "terms": [
   [
    "BitLocker",
    "Windows full-volume encryption, usually protected by a TPM, with recovery passwords that should be backed up to AD DS."
   ],
   [
    "BitLocker Network Unlock",
    "A feature that automatically unlocks BitLocker-protected servers at boot when they are on the trusted wired corporate network."
   ],
   [
    "Server-side encryption",
    "Always-on encryption of Azure managed disks at rest, with platform-managed or customer-managed keys."
   ],
   [
    "Encryption at host",
    "Azure encryption performed on the VM's host, covering temp disks and disk caches as well as data flowing to storage."
   ],
   [
    "Azure Disk Encryption",
    "The older option using BitLocker inside the guest with keys in Key Vault, announced for retirement."
   ]
  ],
  "example": "A regulated company requires control of its own encryption keys and encryption of every byte on the VM host. For its Azure file servers it creates a disk encryption set pointing to a key in Key Vault for customer-managed SSE, enables encryption at host on the VMs, and requires SMB encryption on the shares. On-premises branch servers use BitLocker with recovery passwords backed up to AD DS.",
  "tip": "Where the encryption happens is the key: SSE in storage (always on), encryption at host on the host (covers temp disk and cache), ADE inside the guest via BitLocker. Customer control of keys means customer-managed keys in Key Vault.",
  "check": [
   [
    "Which Azure option encrypts a VM's temporary disk and disk caches without running anything inside the guest?",
    "Encryption at host."
   ],
   [
    "What should you always do after enabling BitLocker on a server's OS volume?",
    "Create a recovery password protector and back it up, for example to AD DS, so the volume can be recovered if TPM validation fails."
   ],
   [
    "Are Azure managed disks encrypted if you configure nothing?",
    "Yes. Server-side encryption with platform-managed keys is always on for managed disks."
   ]
  ]
 },
 {
  "t": "Performance Monitor counters and data collector sets; baselines; Resource Monitor",
  "body": [
   "When users say a server is slow, you need data, not guesses. Windows Server includes Performance Monitor for measuring and recording performance over time and Resource Monitor for a live, per-process view. Used together with a baseline, they let you find the real bottleneck: processor, memory, disk or network.",
   "Performance Monitor (`perfmon`) reads performance counters. Each counter is named as object, instance and counter, such as `Processor(_Total)\\% Processor Time`. You add counters to a live graph, or better, record them. The counters you should recognize are: `Processor\\% Processor Time` (sustained high values suggest a CPU bottleneck) and `System\\Processor Queue Length` (threads waiting for CPU); `Memory\\Available MBytes` (low values mean memory pressure) and `Memory\\Pages/sec` (heavy paging); `PhysicalDisk\\Avg. Disk sec/Read` and `Avg. Disk sec/Write` (latency per operation) and `Avg. Disk Queue Length`; and `Network Interface\\Bytes Total/sec` compared with the adapter's bandwidth. Rules of thumb exist, but what counts as high depends on the hardware and workload, which is why baselines matter.",
   "Data collector sets (DCS) record data over time into log files, usually binary `.blg` files you can open later in Performance Monitor. A DCS can combine performance counters, event trace data and system configuration information. Windows includes system data collector sets such as System Performance and System Diagnostics that produce a ready-made report. A user-defined DCS lets you choose your own counters, sample interval, duration, schedule and stop conditions. You can also create a performance counter alert, which triggers an action, such as logging an event or starting another DCS, when a counter crosses a threshold. From the command line, `logman` creates and starts collectors and `relog` converts or trims logs.",
   "A baseline is a recording of normal performance. Capture it when the server is healthy, at typical and peak times, and repeat it after major changes. Later, when there's a complaint, you compare current data with the baseline: if disk latency doubled while CPU stayed the same, you know where to look. Baselines also support capacity planning, showing trends before they become outages.",
   "Resource Monitor (`resmon`) shows real-time CPU, memory, disk and network usage broken down by process, service and even file or TCP connection. It answers questions such as which process is writing to disk, which process holds a network port or who is using memory. On the CPU tab you can search associated handles to find which process has a file locked, and use Analyze Wait Chain to see what a hung process is waiting on. Task Manager is lighter; Resource Monitor goes deeper but only shows the present, not history.",
   "In your lab, create a user-defined DCS with CPU, memory, disk and network counters, start a load, stop it, then open the report under Reports, User Defined. Look for the resource that is saturated while the others are idle."
  ],
  "terms": [
   [
    "Performance counter",
    "A named measurement (object, instance, counter) such as Processor(_Total)\\% Processor Time."
   ],
   [
    "Data collector set",
    "A saved configuration that records counters, traces and configuration data to log files on demand or on a schedule."
   ],
   [
    "Baseline",
    "A recording of normal performance used as a reference for troubleshooting and capacity planning."
   ],
   [
    "Performance counter alert",
    "A DCS type that takes an action when a counter crosses a defined threshold."
   ],
   [
    "Resource Monitor",
    "A real-time tool showing CPU, memory, disk and network usage per process, with handle search and wait chain analysis."
   ]
  ],
  "example": "Users report slow reports from a SQL server every morning. The admin compares a morning data collector set with the baseline: CPU and memory are normal, but Avg. Disk sec/Read on the data volume is several times higher than baseline. Resource Monitor's Disk tab during the slow period shows a backup job reading the same volume, so the backup is moved to the evening.",
  "tip": "For history and trends use Performance Monitor with data collector sets; for which process is doing it right now use Resource Monitor. Disk latency counters (Avg. Disk sec/Read or Write) are the clearest disk bottleneck signal.",
  "check": [
   [
    "Which two counters best indicate memory pressure?",
    "Memory\\Available MBytes being low and Memory\\Pages/sec being consistently high."
   ],
   [
    "Why capture a baseline when the server is healthy?",
    "So you have normal values to compare against during problems and can spot trends for capacity planning."
   ],
   [
    "Which tool helps you find which process has a file locked?",
    "Resource Monitor, using Associated Handles search on the CPU tab."
   ]
  ]
 },
 {
  "t": "Event logs, custom views and event subscriptions (Windows Event Forwarding)",
  "body": [
   "Windows records what happens on a server in event logs, and they are often the first place to look when something breaks or when you investigate a security incident. As a server administrator you need to navigate logs efficiently, filter them into custom views and collect events from many servers in one place with Windows Event Forwarding.",
   "Event Viewer groups logs into Windows Logs and Applications and Services Logs. Windows Logs include Application (events from apps), Security (audit events such as logons, controlled by audit policy), Setup, System (drivers and Windows components) and Forwarded Events (events collected from other computers). Applications and Services Logs hold per-component logs such as Directory Service, DNS Server, DFS Replication and many under Microsoft, Windows. Each event has a level (Critical, Error, Warning, Information, or audit success and failure in Security), a source, an event ID and a timestamp. Useful security IDs include 4624 (successful logon), 4625 (failed logon) and 4740 (account locked out).",
   "Custom views are saved filters that can span multiple logs. You filter by level, log, source, event ID, keywords, user or computer, or write an XPath query in the XML tab. Server Manager creates Server Roles custom views automatically for installed roles. Custom views can be exported and imported as XML to share with colleagues. In PowerShell, `Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625}` does the same filtering efficiently. You can also attach a scheduled task to an event, for example to send a notification or run a script when a specific ID appears.",
   "Windows Event Forwarding (WEF) sends selected events from source computers to a collector, where they land in Forwarded Events by default. It uses Windows Remote Management (WinRM) for transport and the Windows Event Collector service on the collector; run `wecutil qc` on the collector and make sure WinRM is enabled on sources (`winrm quickconfig`, or Group Policy). A subscription defines which events to collect, from where and how.",
   "There are two subscription types. In a collector-initiated subscription, you list the source computers in the subscription and the collector pulls events from them; it suits a small, fixed set of servers. The account the collector uses must be able to read the logs, typically by adding it (or the collector's computer account) to the Event Log Readers group on each source. In a source-initiated subscription, sources push events to the collector; you configure them with the Group Policy setting Configure target Subscription Manager, pointing to the collector's subscription manager address, and allow computers by group in the subscription. It scales well to many or changing computers. For the Security log, the Network Service account on each source needs read access to that log.",
   "Delivery options control how fast events arrive: Normal, Minimize Bandwidth and Minimize Latency. Check subscription health with `wecutil gr <subscription>` or the Runtime Status in the collector's Subscriptions node."
  ],
  "terms": [
   [
    "Custom view",
    "A saved Event Viewer filter across one or more logs, exportable as XML."
   ],
   [
    "Windows Event Forwarding",
    "A built-in feature that forwards selected events from source computers to a collector over WinRM."
   ],
   [
    "Collector-initiated subscription",
    "A subscription in which the collector pulls events from computers listed in the subscription."
   ],
   [
    "Source-initiated subscription",
    "A subscription in which sources, configured by Group Policy, push events to the collector; best for many computers."
   ],
   [
    "Event Log Readers",
    "A built-in local group whose members can read event logs, used to grant a collector access."
   ]
  ],
  "example": "A security team wants every failed logon from 200 member servers in one place. They configure a source-initiated subscription on a collector for Security event 4625, deploy a GPO that sets the target subscription manager and grants Network Service read access to the Security log, and create a custom view on the collector that shows only 4625 events sorted by account name.",
  "tip": "Collector-initiated equals pull from a listed set; source-initiated equals push configured by Group Policy, better for many computers. WEF rides on WinRM, and forwarded events arrive in the Forwarded Events log.",
  "check": [
   [
    "Which subscription type suits hundreds of servers that are added and removed regularly?",
    "Source-initiated, because sources are configured by Group Policy to push events and new computers join automatically."
   ],
   [
    "Where do forwarded events appear on the collector by default?",
    "In the Forwarded Events log under Windows Logs."
   ],
   [
    "What protocol does Windows Event Forwarding use?",
    "Windows Remote Management (WinRM), which is based on WS-Management."
   ]
  ]
 },
 {
  "t": "Windows Admin Center alerts and System Insights predictive capacity",
  "body": [
   "Monitoring should warn you before a problem hurts users. Windows Admin Center (WAC) gives you a browser-based dashboard for servers and clusters, with health information and the ability to connect to Azure alerting, and System Insights adds on-box predictive analytics that forecast when capacity will run out.",
   "Windows Admin Center is a free, locally deployed management tool that you open in a browser. For a server it shows an Overview with CPU, memory and network charts, plus tools for events, performance, storage, updates and more. For failover clusters and Azure Local (hyper-converged) clusters, the dashboard shows Health Service faults, such as a failed drive or a node down, as alerts you can drill into. Because WAC does not continuously monitor servers when nobody has it open, for real alerting you integrate with Azure Monitor. From a server's Azure hybrid services or Azure Monitor tool, WAC can connect the server (typically through Azure Arc), install the Azure Monitor agent and set up alert rules with email notifications for conditions such as high CPU, low disk space or a server that stops sending heartbeats.",
   "System Insights is a Windows Server feature (Windows Server 2019 and later) that runs machine learning models locally on the server, using performance and event data the server already collects. No data is sent to the cloud. Install it with `Install-WindowsFeature System-Insights -IncludeManagementTools`, and optionally the System Insights extension in Windows Admin Center for a graphical view.",
   "System Insights ships with capabilities, each of which forecasts one resource: CPU capacity forecasting, networking capacity forecasting, total storage consumption forecasting and volume consumption forecasting. Each capability runs on a schedule (by default, periodically) and returns a status: OK, Warning, Critical, Error or None. Warning and Critical mean the model predicts the resource will exceed its capacity within the forecast horizon, Critical being sooner. Error and None usually mean the capability failed or does not yet have enough history to predict, so give a newly installed server time to gather data.",
   "You manage it with PowerShell. `Get-InsightsCapability` lists capabilities and whether they are enabled; `Invoke-InsightsCapability -Name \"CPU capacity forecasting\"` runs a prediction on demand; `Get-InsightsCapabilityResult` shows the latest result and history; and `Set-InsightsCapabilitySchedule` changes when it runs. With `Set-InsightsCapabilityAction` you attach a PowerShell script that runs automatically when a capability returns a particular status, for example running a disk cleanup script when volume consumption turns Warning. Results are also written to the event log, so you can forward them or alert on them through Azure Monitor.",
   "Keep the roles straight: Windows Admin Center is the console and can wire servers into Azure Monitor alerts; System Insights is a local prediction engine; Azure Monitor is where centralized, always-on alerting happens."
  ],
  "terms": [
   [
    "Windows Admin Center",
    "A browser-based, locally deployed tool for managing servers, clusters and hybrid services."
   ],
   [
    "System Insights",
    "A Windows Server feature that runs local machine learning models to forecast resource capacity."
   ],
   [
    "Capability",
    "A System Insights prediction module, such as CPU capacity forecasting or volume consumption forecasting."
   ],
   [
    "Capability action",
    "A script attached with Set-InsightsCapabilityAction that runs automatically when a capability returns a given status."
   ]
  ],
  "example": "An admin installs System Insights on a busy file server and attaches a cleanup script to volume consumption forecasting for the Warning status. Three weeks later the forecast turns Warning for volume E:, the script deletes old temp exports automatically, and the event is also sent to Azure Monitor, which emails the storage team to order more disk.",
  "tip": "System Insights predicts locally and returns OK, Warning, Critical, Error or None; None or Error often just means not enough data yet. WAC alone is not a 24x7 alerting system; pair it with Azure Monitor.",
  "check": [
   [
    "Does System Insights send server data to Azure for analysis?",
    "No. Its machine learning models run locally on the server using data the server already collects."
   ],
   [
    "Which cmdlet makes a script run automatically when a System Insights forecast becomes Critical?",
    "Set-InsightsCapabilityAction."
   ],
   [
    "Name the four default System Insights capabilities.",
    "CPU capacity forecasting, networking capacity forecasting, total storage consumption forecasting and volume consumption forecasting."
   ]
  ]
 },
 {
  "t": "Azure Monitor agent, data collection rules, VM insights and Log Analytics queries for hybrid servers",
  "body": [
   "Azure Monitor gives you one place to collect logs and metrics from Azure VMs and on-premises servers, query them and alert on them. For Windows Server the pieces are the Azure Monitor agent, data collection rules, a Log Analytics workspace, VM insights and Kusto Query Language (KQL) queries.",
   "The Azure Monitor agent (AMA) is the current agent for collecting guest OS data. It replaced the legacy Log Analytics agent, also called the Microsoft Monitoring Agent (MMA), which is retired, so migration questions point to AMA. On Azure VMs, AMA is installed as a VM extension. On-premises and other-cloud servers must first be connected to Azure Arc, because AMA is installed as an extension on the Arc-enabled server; you cannot install AMA on a non-Arc on-premises machine for this purpose. Deployment at scale is typically done through Azure Policy.",
   "What AMA collects is defined by data collection rules (DCRs). A DCR is an Azure resource that states the data sources, such as specific Windows event logs and levels (optionally filtered with XPath queries, for example only Security event 4625), performance counters and their sample rates, or text logs, and the destinations, usually a Log Analytics workspace and optionally Azure Monitor Metrics. You associate a DCR with machines, and one machine can have several DCRs, so a security team and an operations team can each collect what they need. Filtering in the DCR saves ingestion cost, because Log Analytics bills by data ingested.",
   "VM insights is a ready-made monitoring experience. When you enable it, a DCR collects a standard set of performance counters into the `InsightsMetrics` table, and workbooks show CPU, memory, disk and network trends across all your VMs and Arc servers. Its optional Map feature uses the Dependency agent to show processes and network connections between machines, which helps plan migrations and troubleshoot dependencies.",
   "Data in a Log Analytics workspace is queried with KQL. Common tables for servers are `Event` (Windows events), `Perf` (performance counters), `Heartbeat` (agent check-ins) and `InsightsMetrics`. A KQL query flows from a table through pipes:",
   "```kusto\nPerf\n| where ObjectName == \"Processor\" and CounterName == \"% Processor Time\"\n| summarize avg(CounterValue) by Computer, bin(TimeGenerated, 15m)\n| render timechart\n\nHeartbeat\n| summarize LastSeen = max(TimeGenerated) by Computer\n| where LastSeen < ago(15m)\n```",
   "The second query finds servers that stopped reporting. You turn such queries into log search alert rules, and alerts send notifications or run automation through action groups. Metric alerts on platform metrics, such as Azure VM CPU, react faster and need no agent."
  ],
  "terms": [
   [
    "Azure Monitor agent",
    "The current agent that collects guest OS logs and performance data, deployed as an extension on Azure VMs and Arc servers."
   ],
   [
    "Data collection rule",
    "An Azure resource defining what data to collect from associated machines and where to send it."
   ],
   [
    "Log Analytics workspace",
    "The Azure Monitor data store for logs, queried with KQL and billed mainly by ingestion."
   ],
   [
    "VM insights",
    "A prebuilt Azure Monitor solution showing VM and Arc server performance, with an optional dependency map."
   ],
   [
    "Action group",
    "A reusable set of notifications and actions triggered by Azure Monitor alerts."
   ]
  ],
  "example": "A company onboards 60 on-premises servers to Azure Arc, uses Azure Policy to install AMA, and creates one DCR sending System and Application errors plus key performance counters to a workspace, and a second DCR collecting only Security events 4625 and 4740 for the SOC. A log alert on the Heartbeat query emails the on-call admin when any server stops reporting for 15 minutes.",
  "tip": "Hybrid servers need Azure Arc before AMA. DCRs decide what is collected; filter there to control cost. MMA is legacy; any answer that installs it for new work is wrong.",
  "check": [
   [
    "What must you do before installing the Azure Monitor agent on an on-premises Windows Server?",
    "Connect it to Azure Arc, because AMA is deployed as an extension on the Arc-enabled server resource."
   ],
   [
    "How do you collect only failed logon events instead of the whole Security log?",
    "Create a data collection rule with an XPath filter for Security event ID 4625 and associate it with the servers."
   ],
   [
    "Which Log Analytics table shows when each agent last checked in?",
    "The Heartbeat table."
   ]
  ]
 },
 {
  "t": "Troubleshooting connectivity and name resolution (Test-NetConnection, Resolve-DnsName, ipconfig /flushdns)",
  "body": [
   "Most 'the server is down' tickets are really network or name resolution problems. A disciplined approach saves time: start with the local configuration, then test reachability, then the specific port, then name resolution, and change one thing at a time. Windows Server gives you PowerShell cmdlets and classic commands for each step.",
   "Start with the local IP configuration. `ipconfig /all` or `Get-NetIPConfiguration` shows the address, mask, default gateway and DNS servers for each adapter. Red flags include an address starting with 169.254 (APIPA, Automatic Private IP Addressing, meaning DHCP failed), a missing default gateway, or DNS servers pointing to a public resolver on a domain member, which breaks AD name lookups. On Azure VMs, remember the guest should use DHCP and the settings come from the NIC and VNet.",
   "Next, test reachability. `Test-NetConnection` combines several tools. With just a name, `Test-NetConnection srv01` resolves the name and pings it. With a port, `Test-NetConnection srv01 -Port 445` tells you whether a TCP connection succeeds (`TcpTestSucceeded : True`), which is far more useful than ping because many servers block ICMP (Internet Control Message Protocol) while the service port is open. `-TraceRoute` shows the path, and `-CommonTCPPort RDP` or `SMB` saves typing. If ping fails but the TCP test succeeds, ICMP is simply blocked; if both fail, check routing, firewalls and network security groups. `tracert` and `pathping` are the classic path tools, and `Get-NetTCPConnection` or `netstat -ano` show which ports a server is listening on.",
   "For name resolution, `Resolve-DnsName` is the preferred cmdlet. `Resolve-DnsName srv01.contoso.com` uses the normal client path; `-Server 10.0.0.10` queries a specific DNS server, which lets you compare servers; `-Type SRV` or `-Type MX` looks up other record types, such as `_ldap._tcp.dc._msdcs.contoso.com` to find domain controllers; `-DnsOnly` skips other methods like LLMNR and NetBIOS; and `-NoHostsFile` ignores the hosts file. Remember `nslookup` always queries a DNS server directly, bypassing the client cache and hosts file, so it can disagree with what applications actually see.",
   "The DNS client cache stores recent answers, including negative answers (name not found), for the record's time to live. After you fix a record, a client may keep using the old or negative answer until it expires. `ipconfig /displaydns` or `Get-DnsClientCache` shows the cache, and `ipconfig /flushdns` or `Clear-DnsClientCache` empties it. `ipconfig /registerdns` makes the client re-register its own A and PTR records, useful when a server's record is missing. Also check the hosts file in `C:\\Windows\\System32\\drivers\\etc`, which overrides DNS, and name resolution policy table (NRPT) rules with `Get-DnsClientNrptPolicy`, which can send certain namespaces to specific servers.",
   "A good order to remember: configuration, ping or TCP test by IP, TCP test by name, then Resolve-DnsName against each DNS server. If it works by IP but not by name, it's DNS; if it fails by IP too, it's network or firewall."
  ],
  "terms": [
   [
    "Test-NetConnection",
    "A PowerShell cmdlet that tests ping, TCP port connectivity and route tracing to a host."
   ],
   [
    "Resolve-DnsName",
    "A PowerShell cmdlet for DNS lookups that can target a specific server, record type or DNS-only resolution."
   ],
   [
    "DNS client cache",
    "Locally stored DNS answers, including negative ones, kept until their TTL expires; cleared with ipconfig /flushdns."
   ],
   [
    "APIPA",
    "Automatic Private IP Addressing: a 169.254.x.x address Windows assigns when DHCP fails."
   ],
   [
    "Hosts file",
    "A local file mapping names to IPs that takes priority over DNS queries in the client resolution path."
   ]
  ],
  "example": "Users can't open \\\\files01\\share after the server was moved to a new IP. Test-NetConnection to the new IP on port 445 succeeds, but Resolve-DnsName files01 on a client returns the old IP. Resolve-DnsName -Server against each DC shows one DNS server still has the old record; after fixing replication and running ipconfig /flushdns on clients, access returns.",
  "tip": "Works by IP but not by name means DNS. Ping failing does not prove a service is down; test the port. nslookup bypasses the client cache and hosts file, so use Resolve-DnsName to see what apps see.",
  "check": [
   [
    "How do you check whether a remote server accepts connections on TCP 3389?",
    "Run Test-NetConnection <server> -Port 3389 and check TcpTestSucceeded."
   ],
   [
    "A DNS record was corrected, but one client still gets 'name not found'. Why and how do you fix it?",
    "The client cached the negative answer; run ipconfig /flushdns (or Clear-DnsClientCache) to clear it."
   ],
   [
    "How can you ask a specific DNS server for SRV records that locate domain controllers?",
    "Resolve-DnsName _ldap._tcp.dc._msdcs.contoso.com -Type SRV -Server <DNS server IP>."
   ]
  ]
 },
 {
  "t": "Windows Update, time service (w32tm) and Kerberos troubleshooting; Arc agent and extension troubleshooting (azcmagent check)",
  "body": [
   "This lesson groups four common troubleshooting areas: updates that fail, clocks that drift, Kerberos authentication failures (often caused by clocks) and Azure Arc agents that stop reporting.",
   "When Windows Update fails, first read the error code in Settings or in Azure Update Manager, then look at the logs. `Get-WindowsUpdateLog` merges the update trace files into a readable `WindowsUpdate.log` on your desktop. The System log and the WindowsUpdateClient operational log also record installs and failures. Confirm the Windows Update (wuauserv) and Background Intelligent Transfer Service (BITS) services can run and that the server can reach its update source, whether Microsoft Update or a WSUS server set by Group Policy. If component store corruption is suspected, run `DISM /Online /Cleanup-Image /RestoreHealth` followed by `sfc /scannow`. As a last resort, stop the update services and rename the SoftwareDistribution folder so Windows rebuilds its download cache.",
   "Time matters because Kerberos rejects requests when client and server clocks differ by more than the maximum tolerance, five minutes by default. In an AD forest, time flows down a hierarchy: members sync from a DC in their domain, DCs sync from the PDC emulator of their domain, and the PDC emulator of the forest root domain is the authoritative source, which you configure to sync with a reliable external source, for example `w32tm /config /manualpeerlist:\"time.example.org\" /syncfromflags:manual /reliable:yes /update`. Useful checks are `w32tm /query /status` and `w32tm /query /source` (where am I syncing from), `w32tm /resync` and `w32tm /stripchart /computer:dc01` (offset to another computer). A classic mistake is a virtualized DC syncing time from its Hyper-V host through the time synchronization integration service instead of the domain hierarchy; if a DC's source shows the VM host, fix it.",
   "For Kerberos problems, check time first, then DNS (clients must find DCs through SRV records), then service principal names (SPNs). `klist` shows the tickets a user holds and `klist purge` clears them so you can retest after changes, such as new group membership. Duplicate or missing SPNs cause authentication failures or fallback to NTLM; find duplicates with `setspn -X` and query with `setspn -Q`. On DCs, Security events 4768 (TGT requested), 4769 (service ticket requested) and 4771 (pre-authentication failed) reveal failure codes.",
   "Azure Arc-enabled servers run the Connected Machine agent, whose command-line tool is `azcmagent`. `azcmagent show` reports the agent status, resource ID and whether it is Connected or Disconnected. `azcmagent check` tests network connectivity to the Azure endpoints the agent and extensions need, which quickly exposes a firewall or proxy block. `azcmagent logs` collects the logs into a zip for analysis. Agent logs live under `C:\\ProgramData\\AzureConnectedMachineAgent\\Log` (for example `himds.log` and `azcmagent.log`), and extension logs under `C:\\ProgramData\\GuestConfig\\extension_logs`. Check that the services Azure Hybrid Instance Metadata Service (himds), Guest Configuration Arc Service and Guest Configuration Extension Service are running. If the server uses a proxy, set it with `azcmagent config set proxy.url` followed by your proxy address. A failed extension, such as the Azure Monitor agent, often just needs to be removed and reinstalled from the portal after the underlying issue is fixed."
  ],
  "terms": [
   [
    "Get-WindowsUpdateLog",
    "A cmdlet that converts Windows Update trace files into a readable WindowsUpdate.log."
   ],
   [
    "PDC emulator (forest root)",
    "The authoritative time source for an AD forest, which should sync with a reliable external time source."
   ],
   [
    "w32tm",
    "The command-line tool for configuring, querying and resyncing the Windows Time service."
   ],
   [
    "klist",
    "A command that lists or purges the Kerberos tickets cached for the current logon session."
   ],
   [
    "azcmagent check",
    "An Arc agent command that tests connectivity to the Azure endpoints required by the agent and its extensions."
   ]
  ],
  "example": "Users on one site can't access file shares and see Kerberos errors. On their DC, w32tm /query /source shows 'VM IC Time Synchronization Provider' and the clock is seven minutes off. The admin turns off the Hyper-V time synchronization integration service for that DC VM, resyncs to the domain hierarchy with w32tm /resync, and after klist purge on a client, access works.",
  "tip": "Kerberos failure plus clock skew over 5 minutes is a classic exam scenario; the fix is the time hierarchy anchored on the forest root PDC emulator. For Arc disconnected status, run azcmagent show and azcmagent check first.",
  "check": [
   [
    "Which DC should sync time from an external source in an AD forest?",
    "The PDC emulator of the forest root domain."
   ],
   [
    "An Arc server shows Disconnected in the portal. Which command tests whether it can reach the required Azure endpoints?",
    "azcmagent check."
   ],
   [
    "A user was added to a group but still can't access a resource. What quick Kerberos step helps without logging off?",
    "Run klist purge to clear cached tickets so new tickets with the updated group membership are requested."
   ]
  ]
 },
 {
  "t": "Azure VM troubleshooting: boot diagnostics, Serial Console, Run Command, redeploy",
  "body": [
   "With a physical server you can walk up to the console. With an Azure VM you can't, so Azure gives you remote equivalents. When a Windows Server VM won't start properly or you can't connect with RDP (Remote Desktop Protocol), you should know which tool to reach for: boot diagnostics, Serial Console, Run Command or redeploy.",
   "Boot diagnostics captures a screenshot of the VM's screen and the serial log output during boot, stored in a storage account (a Microsoft-managed one is the simple default). In the portal, the VM's Boot diagnostics blade shows the screenshot, so you can see a blue stop error, a Windows update stuck at a percentage, a CHKDSK run or a 'Preparing Windows' screen. That tells you whether the problem is the OS not booting or the network or RDP layer. It is the first thing to look at when a VM is running but unreachable, and it must be enabled for Serial Console to work.",
   "Serial Console gives you a text console connected to the VM's serial port, independent of the VM's network. On Windows it connects to the Special Administration Console (SAC), where you type `cmd`, then `ch -si 1` to open a command channel and sign in with a local account that has a password. From there you can run `ipconfig`, fix firewall rules with `netsh`, re-enable RDP in the registry, reset network settings or start services. It needs boot diagnostics enabled and appropriate Azure permissions (VM Contributor or higher). Serial Console is ideal when you can't get in over the network at all.",
   "Run Command executes scripts inside the VM through the Azure VM agent, with no network access or RDP needed. The portal offers built-in commands for Windows such as `RunPowerShellScript`, `EnableRemotePS`, `ResetRDPCert`, `IPConfig` and `EnableAdminAccount`, or you can run your own PowerShell script. It requires the VM agent to be installed and healthy, and only one command can run at a time. For RDP issues there's also Reset password and Reset configuration only (which resets RDP settings) on the VM's Help blade, both using the VMAccess extension.",
   "Redeploy moves the VM to a new Hyper-V host in the Azure infrastructure and powers it on again, keeping its disks and configuration. Use it when you suspect an issue with the underlying host, such as a VM that won't start or can't be reached even though the OS looks fine. Know the side effects: data on the temporary disk (usually D:) is lost, and dynamic IP addresses associated with the network interface may be updated. Reapply is a gentler option that re-runs the VM's provisioning state to fix a failed state without moving it.",
   "When none of these work, the fallback is to attach a copy of the OS disk to a rescue VM (the az vm repair commands automate this) and fix it offline. And don't forget the network side: Network Watcher's IP flow verify and effective security rules show whether a network security group is blocking RDP."
  ],
  "terms": [
   [
    "Boot diagnostics",
    "A feature that captures the VM's screenshot and serial log during boot for troubleshooting."
   ],
   [
    "Serial Console",
    "A text console to the VM's serial port, reaching the Windows Special Administration Console without networking."
   ],
   [
    "Run Command",
    "A feature that runs scripts inside the VM through the Azure VM agent, without network access."
   ],
   [
    "Redeploy",
    "Moving a VM to a new Azure host while keeping its disks; temporary disk data is lost."
   ],
   [
    "SAC",
    "Special Administration Console: the Windows text-mode console reachable through Serial Console."
   ]
  ],
  "example": "After an admin tightened Windows Firewall rules, nobody can RDP to an Azure DC VM. Boot diagnostics shows a normal sign-in screen, so the OS is fine. The admin uses Run Command with RunPowerShellScript to add an inbound rule for TCP 3389 from the management subnet, and RDP works again without a restart.",
  "tip": "Look at boot diagnostics first to split OS problems from network problems. Serial Console needs boot diagnostics and a local password; Run Command needs a healthy VM agent; redeploy loses the temp disk.",
  "check": [
   [
    "What must be enabled before you can use Serial Console on an Azure VM?",
    "Boot diagnostics."
   ],
   [
    "What data do you lose when you redeploy an Azure VM?",
    "Data on the temporary disk; dynamic IP addresses on the NIC may also change, while OS and data disks are kept."
   ],
   [
    "The VM agent is not running on a VM. Which tool can still get you a command prompt?",
    "Serial Console, because it uses the serial port and SAC instead of the VM agent."
   ]
  ]
 },
 {
  "t": "AD DS recovery: Directory Services Restore Mode, authoritative vs non-authoritative restore, authoritative SYSVOL (DFSR) restore",
  "body": [
   "Sooner or later someone deletes an OU full of users, or a DC's database becomes corrupted. To recover, you need a good system state backup and an understanding of how AD replication treats restored data. The central question is whether you want the restored data to be overwritten by replication partners, or to overwrite them.",
   "The AD database (`ntds.dit`) cannot be restored while AD DS is running on that DC. Directory Services Restore Mode (DSRM) is a special boot mode in which the DC starts without AD DS, and you sign in with the DSRM administrator account, a local account whose password was set during promotion and can be reset with `ntdsutil` using the 'set dsrm password' command. You enter DSRM by setting the boot option with `bcdedit /set safeboot dsrepair` and restarting (remove it afterwards with `bcdedit /deletevalue safeboot`), or through the advanced startup options. For offline maintenance such as defragmenting the database, you can instead stop the Active Directory Domain Services service, known as restartable AD DS.",
   "A non-authoritative restore brings back the DC's AD database from backup; when the DC restarts normally, replication partners send it every change made since the backup, including deletions. It's the right choice when a DC's database is damaged but the rest of the domain is fine; the DC simply catches up. It will not bring back deleted objects, because partners will replicate the deletion again.",
   "An authoritative restore is how you recover deleted objects from backup. After the non-authoritative restore, and before restarting, you run `ntdsutil`, activate the instance with `activate instance ntds`, enter `authoritative restore` and run `restore subtree \"OU=Sales,DC=contoso,DC=com\"` or `restore object` for a single object. Ntdsutil raises the version numbers of those objects' attributes by a large amount (by default 100,000 for each day since the backup), so after reboot they win replication and are copied back to all DCs. Ntdsutil also writes LDIF files for back-linked attributes, such as the objects' memberships in groups outside the subtree, which you import with `ldifde` to restore group membership. Backups older than the tombstone lifetime (commonly 180 days) must not be used. If the AD Recycle Bin is enabled, prefer `Restore-ADObject` or the Active Directory Administrative Center, which recovers objects with all attributes and no downtime.",
   "SYSVOL, which holds Group Policy templates and logon scripts, is replicated by DFS Replication, not by AD replication, so restoring AD doesn't fix it. For a single broken DC, a non-authoritative SYSVOL sync is enough: set `msDFSR-Enabled` to FALSE on that DC's SYSVOL subscription object, replicate, then set it to TRUE, and it pulls a fresh copy. If SYSVOL is broken everywhere, you perform an authoritative SYSVOL restore. On the DC with the good copy you set `msDFSR-Enabled` to FALSE and `msDFSR-Options` to 1 on its SYSVOL subscription object (under CN=SYSVOL Subscription in its DFSR-LocalSettings), and set `msDFSR-Enabled` to FALSE on all other DCs. After forcing AD replication with `repadmin /syncall`, you restart DFSR on the authoritative DC and set its `msDFSR-Enabled` back to TRUE, watching for event 4602, then re-enable the others, which sync from it.",
   "In short: DSRM is the tool, non-authoritative repairs one DC, authoritative wins against the others, and SYSVOL has its own DFSR procedure."
  ],
  "terms": [
   [
    "DSRM",
    "Directory Services Restore Mode: a DC boot mode without AD DS running, used for database restores with a local DSRM password."
   ],
   [
    "Non-authoritative restore",
    "Restoring a DC's AD database that then receives newer changes from replication partners."
   ],
   [
    "Authoritative restore",
    "Marking restored objects with higher version numbers via ntdsutil so they replicate out and overwrite partners."
   ],
   [
    "Tombstone lifetime",
    "How long deleted objects are kept as tombstones; backups older than this must not be restored."
   ],
   [
    "msDFSR-Options",
    "The SYSVOL subscription attribute set to 1 on the DC chosen as authoritative in a DFSR SYSVOL restore."
   ]
  ],
  "example": "An admin accidentally deletes the Sales OU, and the AD Recycle Bin is not enabled. On DC2 they restart into DSRM, restore last night's system state with wbadmin, run ntdsutil authoritative restore on the Sales subtree, restart, and import the generated LDIF file with ldifde to restore the users' memberships in groups in other OUs.",
  "tip": "Deleted objects need authoritative restore (or the Recycle Bin); a corrupt DC needs non-authoritative. SYSVOL is DFSR, restored separately with msDFSR-Enabled and msDFSR-Options on the subscription objects.",
  "check": [
   [
    "Why won't a non-authoritative restore bring back a deleted OU?",
    "When the DC restarts, replication partners send the more recent deletion, which removes the restored objects again."
   ],
   [
    "What does ntdsutil do to objects during an authoritative restore?",
    "It increases their attribute version numbers so the restored versions win replication and overwrite the copies on other DCs."
   ],
   [
    "In an authoritative SYSVOL restore, which attributes do you set on the authoritative DC?",
    "msDFSR-Enabled to FALSE and msDFSR-Options to 1 on its SYSVOL subscription object, then later msDFSR-Enabled back to TRUE."
   ]
  ]
 },
 {
  "t": "Backup: Windows Server Backup, bare-metal and system state backup, Azure Backup with the MARS agent and MABS",
  "body": [
   "Backups are your last line of defense against deletion, corruption, ransomware and site loss. High availability features like clustering and replication copy mistakes instantly, so they are not backups. For Windows Server you need to know the built-in Windows Server Backup and the two Azure Backup options for on-premises servers: the MARS agent and Microsoft Azure Backup Server (MABS).",
   "Windows Server Backup is a feature you add with `Install-WindowsFeature Windows-Server-Backup`. It uses the Volume Shadow Copy Service (VSS) to take consistent block-level backups while the server runs. You can back up the full server, selected volumes, files and folders, system state or bare-metal recovery (BMR). Targets are a dedicated disk (formatted and used exclusively by backup, which keeps multiple versions), a volume, or a network share, which keeps only the latest backup because each run overwrites it. Scheduling allows one schedule per server. Manage it in the console or with `wbadmin`, for example `wbadmin start systemstatebackup -backupTarget:E:` and `wbadmin get versions`.",
   "Know the difference between the backup types. A system state backup includes the registry, boot files, COM+ class registration and, depending on roles, the AD DS database, SYSVOL, certificate services database and cluster database; it's what you restore in DSRM to recover AD. A bare-metal recovery backup includes system state plus all volumes needed to boot the OS, so you can rebuild a server onto new hardware or a blank disk by booting Windows Recovery Environment from installation media and choosing System Image Recovery. A full server backup includes BMR plus all data volumes.",
   "The Microsoft Azure Recovery Services (MARS) agent backs up a Windows machine directly to a Recovery Services vault in Azure, with no extra server. It protects files and folders, volumes and system state, can run up to three times a day, and uses incremental transfers. You download vault credentials from the portal to register the agent. You must set an encryption passphrase, which Microsoft never sees; if you lose it you cannot restore, so store it securely. MARS is not application-aware, so it doesn't back up SQL Server or Exchange databases in a consistent way, and it is not the tool for whole VMs.",
   "Microsoft Azure Backup Server (MABS) is a free-to-download server application, based on System Center Data Protection Manager (DPM), that you install on a dedicated on-premises Windows Server. It protects workloads across your datacenter, including Hyper-V and VMware VMs, SQL Server, Exchange, SharePoint, file servers and system state or BMR, using agents on protected servers. It stores recent recovery points on local disk for fast restores (disk-to-disk) and sends longer-term copies to a Recovery Services vault (disk-to-disk-to-cloud). Unlike DPM, MABS doesn't support tape and doesn't need a System Center license.",
   "Choose by scope: one server's files or system state to Azure means MARS; application-consistent backups of many workloads with local fast restore plus Azure retention means MABS; a quick local system state or BMR backup, such as before promoting a DC, means Windows Server Backup. Azure Backup's soft delete keeps deleted backup data recoverable for a period, a key defense against ransomware operators who try to delete backups."
  ],
  "terms": [
   [
    "Windows Server Backup",
    "The built-in VSS-based backup feature for full server, volumes, files, system state and bare-metal recovery."
   ],
   [
    "System state backup",
    "A backup of the registry, boot files and role databases such as AD DS and SYSVOL, used to recover AD."
   ],
   [
    "Bare-metal recovery",
    "A backup containing system state and all volumes required to boot, used to rebuild a server on new hardware."
   ],
   [
    "MARS agent",
    "The Azure Recovery Services agent that backs up files, folders and system state from a Windows machine directly to a Recovery Services vault."
   ],
   [
    "MABS",
    "Microsoft Azure Backup Server: a DPM-based on-premises backup server with local disk storage and Azure retention for application workloads."
   ]
  ],
  "example": "A company's two DCs get nightly system state backups with Windows Server Backup to a dedicated disk. File servers use the MARS agent to send their data volumes to a Recovery Services vault twice a day. Their SQL and Hyper-V hosts are protected by MABS, which keeps two weeks of recovery points on local disk for fast restores and a year of monthly copies in Azure.",
  "tip": "MARS equals files, folders and system state direct to Azure, not app-aware. MABS equals app-aware workloads plus local disk, no tape. A network share target in Windows Server Backup keeps only one version.",
  "check": [
   [
    "Which backup type do you need to restore a failed server onto new hardware?",
    "A bare-metal recovery backup, restored by booting into Windows Recovery Environment and using System Image Recovery."
   ],
   [
    "You need application-consistent backups of SQL Server with fast local restores and long-term Azure retention. MARS or MABS?",
    "MABS, because it is application-aware and stores recovery points on local disk before sending them to Azure; MARS is not app-aware."
   ],
   [
    "What happens if you lose the MARS agent encryption passphrase?",
    "You cannot restore the data, because Microsoft doesn't store the passphrase; keep it somewhere secure outside the protected server."
   ]
  ]
 }
]);
