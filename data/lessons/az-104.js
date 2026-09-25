/* Lessons for Microsoft Certified: Azure Administrator Associate (AZ-104): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("az-104", [
 {
  "t": "Microsoft Entra users and groups: create, bulk create, security vs Microsoft 365 groups, assigned vs dynamic membership",
  "body": [
   "Microsoft Entra ID (formerly Azure Active Directory) is the identity service behind every Azure subscription. Every person who signs in to the Azure portal, and every group you use to grant access, lives in an Entra tenant. As an Azure administrator you will spend a lot of time creating users and groups, because good group design is what keeps access manageable: you grant permissions to groups, then add and remove people from groups as their jobs change.",
   "You can create a user in the portal (Microsoft Entra ID > Users > New user), with the Azure CLI (`az ad user create`), with Microsoft Graph PowerShell (`New-MgUser`) or by inviting an external user. A cloud user needs a display name, a user principal name (UPN) such as `ana@contoso.com` whose domain suffix is a verified domain in the tenant, and an initial password. Users synchronized from on-premises Active Directory with Microsoft Entra Connect are managed on-premises, so you change most of their properties there, not in the portal.",
   "For many users at once, use Bulk operations > Bulk create on the Users page. You download a CSV template, fill in one row per user (name, UPN, initial password and optional properties), upload it, and the portal runs the job and lets you download a results file showing which rows succeeded or failed. The same area offers bulk invite for guests and bulk delete. Groups have bulk import and bulk remove of members from a CSV, too.",
   "Entra ID has two group types. A security group is used to grant access to resources: Azure RBAC role assignments, app assignments, licenses and policies. Its members can be users, devices, service principals and other groups (nesting). A Microsoft 365 group is a collaboration group: it comes with a shared mailbox, calendar, SharePoint site and can back a Microsoft Teams team. Its members can only be users, it cannot contain other groups, and it can be mail-enabled with an address. If the question is about granting Azure permissions to a set of administrators, the answer is a security group.",
   "Each group also has a membership type. Assigned means an administrator or group owner adds and removes members by hand. Dynamic user means Entra ID evaluates a rule against user attributes and keeps membership up to date automatically, for example `(user.department -eq \"Sales\") -and (user.country -eq \"US\")`. Dynamic device does the same with device attributes such as `device.deviceOSType`, and it is only available for security groups. You cannot add or remove members of a dynamic group by hand; you change the rule or the user's attributes instead.",
   "Dynamic membership needs a Microsoft Entra ID P1 license (or a product that includes it) for the users who are members of dynamic groups. You can switch a group between assigned and dynamic, but switching to dynamic replaces the existing members with whoever the rule matches. Rule processing is not instant, so a new hire may take some time to appear in the group."
  ],
  "terms": [
   [
    "User principal name (UPN)",
    "The sign-in name of an Entra user in email-address format, whose suffix must be a verified domain of the tenant."
   ],
   [
    "Security group",
    "An Entra group used to grant access to resources; it can contain users, devices, service principals and other groups."
   ],
   [
    "Microsoft 365 group",
    "A collaboration group with a shared mailbox, calendar, SharePoint site and optional Teams team; members can only be users."
   ],
   [
    "Dynamic membership",
    "Group membership calculated automatically from a rule on user or device attributes instead of being maintained by hand."
   ]
  ],
  "example": "A company hires 40 seasonal support agents. The administrator fills in the bulk create CSV template to create the accounts in one upload, sets each user's department to 'Support', and relies on a dynamic user group with the rule (user.department -eq \"Support\") that already holds the Reader role on the support resource group, so the new agents get access without any further steps.",
  "tip": "Watch for the member type. Devices can only go in security groups, dynamic device rules only work for security groups, and Microsoft 365 groups cannot contain nested groups. Dynamic groups also need Entra ID P1 licensing.",
  "check": [
   [
    "You need a group that automatically contains every Windows device in the tenant. Which group type and membership type do you choose?",
    "A security group with dynamic device membership. Microsoft 365 groups cannot contain devices, and dynamic device rules are only supported on security groups."
   ],
   [
    "A group has dynamic user membership, and a manager asks you to add one extra person by hand. What happens?",
    "You cannot add members by hand to a dynamic group. Either change the user's attributes so the rule matches, change the rule, or use a separate assigned group."
   ],
   [
    "What is the fastest portal method to create 200 cloud users?",
    "Bulk create on the Users page: download the CSV template, fill in one row per user, upload it and review the results file."
   ]
  ]
 },
 {
  "t": "User and group properties, licenses (including group-based licensing), external (B2B guest) users and self-service password reset",
  "body": [
   "A user object in Microsoft Entra ID carries more than a name and password. Properties such as job title, department, manager, office location and usage location are used by dynamic group rules, by the address book and by licensing. You edit them on the user's Properties page, in bulk with Microsoft Graph PowerShell, or, for synchronized users, in on-premises Active Directory. Groups have properties too: name, description, owners (who can manage membership without being administrators), membership type, and whether the group can be assigned Entra roles, a choice you can only make when you create it.",
   "Licenses for products such as Microsoft 365 or Entra ID P1 and P2 are assigned per user. Before a license can be assigned, the user must have a usage location set, because some services are not available in every country; assignment fails without it. You can assign a license directly on the user's Licenses page, but at scale that becomes hard to track.",
   "Group-based licensing solves that: you assign the license to a group, and every member receives it, with the option to turn off individual service plans inside the product. When a user joins the group they get the license; when they leave it is removed. Combine this with a dynamic group and licensing follows HR data automatically. Group-based licensing needs Entra ID P1 or a product that includes it. If assignment fails, for example because there are not enough licenses or a usage location is missing, the group shows the users in an error state so you can fix them.",
   "External collaboration uses Microsoft Entra B2B. You invite a partner by email address (Users > New user > Invite external user), and a guest user object is created in your tenant with a user type of Guest. The partner signs in with their own identity from their home organization, a Microsoft account or a one-time passcode, so you never manage their password. After they accept the invitation you can put guests in groups and give them RBAC roles like any other user. External collaboration settings control who can invite guests and how much guests can see of your directory, and you can allow or block specific partner domains.",
   "Self-service password reset (SSPR) lets users reset a forgotten password without calling the help desk. You enable it under Password reset for None, Selected (one group) or All users, choose which authentication methods are allowed (for example the Microsoft Authenticator app, mobile phone, email or security questions), and set how many methods are required to reset: one or two. Users must register methods before they can use SSPR, and you can require registration at sign-in. For users synchronized from on-premises, password writeback through Microsoft Entra Connect or Cloud Sync is needed so the new password is written back to Active Directory. Administrator accounts always use a stricter built-in policy that requires two methods and does not allow security questions."
  ],
  "terms": [
   [
    "Usage location",
    "The country property on a user that must be set before a license can be assigned."
   ],
   [
    "Group-based licensing",
    "Assigning a license to a group so that all members inherit it and lose it when they leave the group."
   ],
   [
    "B2B guest user",
    "An external identity invited into your tenant with user type Guest who signs in with credentials from their own organization or account."
   ],
   [
    "Self-service password reset (SSPR)",
    "A feature that lets registered users reset their own password using verified authentication methods."
   ],
   [
    "Password writeback",
    "A sync feature that writes passwords reset in the cloud back to on-premises Active Directory."
   ]
  ],
  "example": "An engineering firm adds a dynamic group for all users in the Engineering department and assigns the Microsoft 365 license to it. When a new engineer's account is created with a usage location of Canada and department Engineering, the license arrives automatically. A contractor from a partner firm is invited as a B2B guest and added to a project group, and signs in with their own company account.",
  "tip": "If a license assignment fails, check the usage location first. For SSPR questions, remember the scope options are None, Selected (a single group) and All, and that on-premises users need password writeback.",
  "check": [
   [
    "A license assignment to a new user fails with an error. The tenant has spare licenses. What is the most likely cause?",
    "The user's usage location is not set; it is required before a license can be assigned."
   ],
   [
    "How does a B2B guest authenticate to your tenant?",
    "With their own identity from their home organization, a Microsoft account or a one-time passcode; your tenant does not store their password."
   ],
   [
    "You enable SSPR for synchronized users, but reset passwords do not work on-premises. What is missing?",
    "Password writeback through Microsoft Entra Connect or Cloud Sync, which writes the new password back to Active Directory."
   ]
  ]
 },
 {
  "t": "Azure RBAC: built-in roles (Owner, Contributor, Reader, User Access Administrator), assigning roles at different scopes and interpreting access",
  "body": [
   "Azure role-based access control (RBAC) decides what a signed-in identity can do to Azure resources. Every grant is a role assignment made of three parts: a security principal (a user, group, service principal or managed identity), a role definition (a list of allowed operations) and a scope (where the grant applies). If you remember 'who, what, where', you can read any assignment.",
   "The four fundamental built-in roles appear on nearly every exam. Owner has full access to manage resources and can also assign roles to others. Contributor can create, change and delete every kind of resource but cannot grant access to anyone. Reader can view resources but change nothing. User Access Administrator can manage role assignments (grant and remove access) but cannot manage the resources themselves. There are also hundreds of service-specific roles, such as Virtual Machine Contributor or Network Contributor, and the Role Based Access Control Administrator role, which can manage assignments and can be limited with conditions to certain roles.",
   "A role definition is a JSON document with `Actions` (allowed control-plane operations such as `Microsoft.Compute/virtualMachines/start/action`), `NotActions` (operations subtracted from Actions), `DataActions` and `NotDataActions` for the data plane, and `AssignableScopes`. Contributor, for instance, is `*` in Actions with `Microsoft.Authorization/*/Write` and `Microsoft.Authorization/*/Delete` in NotActions, which is exactly why it cannot assign roles. When no built-in role fits, you can create a custom role from JSON or by cloning an existing role in the portal.",
   "Scopes form a hierarchy: management group, subscription, resource group, then individual resource. An assignment at a scope is inherited by everything below it. Reader on a subscription means Reader on every resource group and resource in it. You cannot remove an inherited permission at a lower scope; you would have to remove the assignment where it was made.",
   "RBAC is additive. A user's effective access is the union of every role assigned to them directly and through any group, at any scope above the resource. If Ana has Reader on the subscription and Contributor on one resource group, she can change resources in that resource group and only view everything else. The only thing that overrides an allow is a deny assignment, which you cannot create yourself; they are created by Azure features such as deployment stacks and managed applications.",
   "To check access, open the resource's Access control (IAM) blade. Check access shows what a particular user can do there, Role assignments lists every assignment at that scope including inherited ones, and Roles lets you view each role's permissions. In a lab, assign a group Reader on a resource group, sign in as a member and try to create a resource: the portal will refuse with an authorization error."
  ],
  "terms": [
   [
    "Role assignment",
    "The binding of a security principal to a role definition at a specific scope."
   ],
   [
    "Scope",
    "The level at which access applies: management group, subscription, resource group or resource; lower levels inherit it."
   ],
   [
    "NotActions",
    "Operations removed from the Actions list of a role definition; it is not a deny and can be granted back by another role."
   ],
   [
    "User Access Administrator",
    "A built-in role that can manage role assignments but cannot manage the resources themselves."
   ]
  ],
  "example": "A help desk team needs to restart virtual machines in the Production resource group but must not delete them or change networking. Rather than Contributor, the administrator assigns the Virtual Machine Contributor built-in role, or a custom role with only the start, restart and read actions, to the help desk security group at the Production resource group scope.",
  "tip": "Contributor cannot assign roles, and User Access Administrator cannot create resources; only Owner can do both. Permissions add up across all assignments, and NotActions is not a deny.",
  "check": [
   [
    "A user has Reader on the subscription and Contributor on resource group RG1. Can they delete a VM in RG2? In RG1?",
    "Not in RG2, where they only inherit Reader. Yes in RG1, where Contributor applies; RBAC permissions are additive."
   ],
   [
    "Which built-in role lets a person grant others access to a subscription without letting them create resources?",
    "User Access Administrator (or Role Based Access Control Administrator)."
   ],
   [
    "Why can a Contributor not add a role assignment?",
    "The Contributor definition lists Microsoft.Authorization write and delete operations in NotActions, so role assignment operations are not included."
   ]
  ]
 },
 {
  "t": "Entra roles vs Azure RBAC roles, and data-plane roles such as Storage Blob Data Reader",
  "body": [
   "Azure has two separate role systems, and exam questions often test whether you know which one applies. Microsoft Entra roles control what someone can do in the directory itself: create users, reset passwords, manage groups, register applications and configure tenant settings. Examples are Global Administrator, User Administrator, Groups Administrator, Helpdesk Administrator and Application Administrator. Their scope is the whole tenant or an administrative unit, and you assign them in Microsoft Entra ID > Roles and administrators.",
   "Azure RBAC roles control what someone can do to Azure resources: virtual machines, storage accounts, networks. Their scopes are management groups, subscriptions, resource groups and resources, and you assign them on a resource's Access control (IAM) blade. The two systems are independent. A Global Administrator does not automatically have any access to subscriptions, and a subscription Owner cannot create users in Entra ID unless they also hold a suitable Entra role.",
   "There is one bridge. A Global Administrator can turn on 'Access management for Azure resources' in the tenant properties. That gives them the User Access Administrator role at root scope (`/`), above all management groups and subscriptions, so they can grant themselves or others access to any subscription. This is meant for recovery, such as when the only subscription owner has left, and it should be switched off again afterwards.",
   "Azure RBAC itself splits into two planes. The control plane (management plane) is the Azure Resource Manager API: creating a storage account, changing its firewall, reading its properties. The data plane is the data inside the resource: blobs, queue messages, table entities, Key Vault secrets. Owner, Contributor and Reader are control-plane roles. They do not contain `DataActions`, so by themselves they do not grant reading a blob through Microsoft Entra authorization.",
   "Data-plane roles fill that gap. Storage Blob Data Reader lets a principal read and list blobs; Storage Blob Data Contributor adds write and delete; Storage Blob Data Owner also allows setting ACLs (access control lists) in Data Lake Storage. There are matching roles for queues (Storage Queue Data Contributor), tables and Azure Files over REST, and for Key Vault (Key Vault Secrets User, Key Vault Administrator). Assign them at the storage account or container scope for least privilege.",
   "A common surprise: a Contributor can still read blobs in the portal. That is because Contributor has the control-plane action `listKeys`, so the portal can fetch the storage account key and use Shared Key authorization. If you disable shared key access on the account, or switch the portal's authentication method to 'Microsoft Entra user account', only data-plane roles work. A Reader, who cannot list keys, sees the account but gets an error when opening a container unless they also have a data role."
  ],
  "terms": [
   [
    "Microsoft Entra role",
    "A directory role, such as User Administrator, that controls management of Entra objects and tenant settings."
   ],
   [
    "Control plane",
    "Management operations on Azure resources through Azure Resource Manager, governed by Actions in RBAC roles."
   ],
   [
    "Data plane",
    "Operations on the data inside a resource, such as reading blobs, governed by DataActions in RBAC roles."
   ],
   [
    "Storage Blob Data Reader",
    "A built-in data-plane role that allows reading and listing blob containers and blobs using Entra authorization."
   ]
  ],
  "example": "An analytics app runs with a managed identity and needs to read files from one container. The administrator assigns Storage Blob Data Reader on that container only. Giving it Reader on the storage account would not work, because Reader has no data actions and cannot list the keys, and Contributor would give it far more power than it needs.",
  "tip": "Directory tasks (users, groups, passwords) point to Entra roles; resource tasks point to Azure RBAC. If the question is about reading blob contents with Entra ID, look for a 'Storage Blob Data' role, not Reader or Contributor.",
  "check": [
   [
    "A user is Owner of a subscription. Can they reset another user's password in Entra ID?",
    "Not because of that role. Owner is an Azure RBAC role; resetting passwords needs an Entra role such as Helpdesk Administrator or User Administrator."
   ],
   [
    "A user with Reader on a storage account gets an authorization error when opening a container in the portal. Which role fixes this with least privilege?",
    "Storage Blob Data Reader at the container or account scope, which grants data-plane read access."
   ],
   [
    "How can a Global Administrator regain access to a subscription whose only Owner left?",
    "Enable 'Access management for Azure resources' to receive User Access Administrator at root scope, grant the needed role, then turn it off."
   ]
  ]
 },
 {
  "t": "Azure Policy: definitions, initiatives, assignments, scopes and exclusions, effects (Deny, Audit, Modify, DeployIfNotExists) and remediation tasks",
  "body": [
   "Azure Policy enforces rules about what resources may look like, while RBAC controls who may act. RBAC answers 'can Ana create a VM?'; Policy answers 'is this VM, in this region, with these tags, allowed to exist?'. Policy applies even to Owners, which is what makes it a governance tool.",
   "A policy definition is a JSON rule with an `if` condition and a `then` effect, for example 'if the resource location is not in the allowed list, then Deny'. Hundreds of built-in definitions exist, such as Allowed locations, Allowed virtual machine size SKUs and Require a tag on resources, and you can write custom ones. An initiative (policy set definition) groups several definitions so you can assign them together and track them as one compliance goal; the Microsoft cloud security benchmark is a built-in initiative.",
   "Nothing happens until you create an assignment. You assign a definition or initiative to a scope (management group, subscription or resource group), fill in its parameters (such as the list of allowed regions) and optionally add exclusions, which are child scopes the assignment should skip. Exemptions are a separate object that exempts a specific scope or resource for a documented reason, such as a waiver or a mitigation, often with an expiry date. Assignments are inherited by all child scopes, just like RBAC.",
   "The effect decides what happens when a resource matches. Deny blocks the create or update request, so the deployment fails with a policy error. Audit allows the request but marks the resource non-compliant in the Compliance view. AuditIfNotExists and DeployIfNotExists look for a related resource after the main one is created, such as a diagnostic setting or an antimalware extension; AuditIfNotExists only reports, while DeployIfNotExists deploys the missing resource with an ARM template. Modify adds, replaces or removes properties or tags on the request, for example adding a CostCenter tag. Append adds fields, and Disabled turns the rule off, which is handy as a parameter value.",
   "New and updated resources are evaluated at request time. Existing resources are evaluated in periodic compliance scans and after assignment, and they are not changed by Deny; they are simply reported as non-compliant. To fix existing resources for Modify and DeployIfNotExists policies, you create a remediation task. Because these effects change resources, the assignment needs a managed identity with the roles listed in the definition, which the portal creates for you when you assign the policy.",
   "In the portal, Policy > Compliance shows each assignment's compliance percentage and lets you drill into non-compliant resources. In a lab, assign Allowed locations to a resource group with only one region, then try to create a storage account in another region and read the 'disallowed by policy' error."
  ],
  "terms": [
   [
    "Policy definition",
    "A JSON rule with a condition and an effect that describes an allowed or required resource configuration."
   ],
   [
    "Initiative",
    "A policy set definition that groups multiple policy definitions to be assigned and tracked together."
   ],
   [
    "Exclusion",
    "A child scope listed on an assignment that the assignment does not evaluate."
   ],
   [
    "DeployIfNotExists",
    "An effect that deploys a related resource when it is missing, using a managed identity for the assignment."
   ],
   [
    "Remediation task",
    "A job that brings existing non-compliant resources into compliance for Modify and DeployIfNotExists policies."
   ]
  ],
  "example": "A company must keep data in two European regions. The administrator assigns the built-in Allowed locations definition to the root management group with those two regions as parameters, and excludes the sandbox subscription. When a developer tries to deploy to East US, the deployment fails with a RequestDisallowedByPolicy error, and existing out-of-region resources appear as non-compliant.",
  "tip": "Deny and Audit do not change existing resources. If a question asks how to fix resources that already exist, the answer involves a Modify or DeployIfNotExists policy and a remediation task, with a managed identity.",
  "check": [
   [
    "You assign a policy with the Deny effect. What happens to resources that already violate it?",
    "They keep running and are shown as non-compliant; Deny only blocks new create and update requests."
   ],
   [
    "Which effect should you use to automatically add a missing tag to new resources?",
    "Modify, which can add or replace tags during the request; use a remediation task for existing resources."
   ],
   [
    "What is the difference between an initiative and an assignment?",
    "An initiative is a grouping of policy definitions; an assignment applies a definition or initiative to a scope with parameters and exclusions."
   ]
  ]
 },
 {
  "t": "Resource locks: CanNotDelete vs ReadOnly, inheritance and who can remove them",
  "body": [
   "Resource locks protect important resources from accidental changes, including by people who have full permissions. RBAC might let an Owner delete a production database, but a lock stops the delete until someone deliberately removes the lock first. Locks are a safety catch, not an access-control system.",
   "There are two lock levels. CanNotDelete (shown as Delete in the portal) lets authorized users read and modify a resource but not delete it. ReadOnly lets authorized users read a resource but not delete or update it, which is roughly like giving everyone the Reader role for that resource. You can apply a lock to a subscription, a resource group or an individual resource from its Locks blade, or with `az lock create` or `New-AzResourceLock`.",
   "Locks are inherited. A lock on a resource group applies to every resource in it, including resources added later, and a lock on a subscription applies to everything in the subscription. If several locks apply, the most restrictive one wins. A CanNotDelete lock on a resource group also means the resource group itself cannot be deleted, although you can still add new resources to it.",
   "Locks act on the control plane, meaning operations sent to Azure Resource Manager at `management.azure.com`. They do not stop data-plane operations. A CanNotDelete lock on a storage account stops someone deleting the account but does not stop them deleting blobs inside it. A ReadOnly lock on a SQL server stops the server being deleted or reconfigured but not rows being changed in the database.",
   "ReadOnly locks have side effects that exam questions like to test, because some 'read' actions in the portal are really POST requests. A ReadOnly lock on a storage account blocks the list keys operation, so users who rely on account keys cannot open data in the portal. A ReadOnly lock on a resource group containing a VM blocks starting, stopping or resizing it. A ReadOnly lock on an App Service blocks things like viewing the log stream or Visual Studio Server Explorer. Many teams therefore prefer CanNotDelete for production and reserve ReadOnly for resources that truly never change.",
   "To create or delete a lock you need `Microsoft.Authorization/locks/*` permissions. Among built-in roles, only Owner and User Access Administrator have them; Contributor does not, so a Contributor cannot remove a lock and therefore cannot delete a locked resource. Removing a lock is a normal operation for an Owner: delete the lock, perform the change, then add the lock back."
  ],
  "terms": [
   [
    "CanNotDelete lock",
    "A lock that allows reading and modifying a resource but blocks deleting it."
   ],
   [
    "ReadOnly lock",
    "A lock that allows reading a resource but blocks both updates and deletion."
   ],
   [
    "Lock inheritance",
    "The rule that a lock on a subscription or resource group applies to all resources beneath it, including ones created later."
   ],
   [
    "Control plane",
    "Management operations through Azure Resource Manager, which is the only layer locks protect."
   ]
  ],
  "example": "An administrator puts a CanNotDelete lock on the resource group holding a company's production virtual network and firewall. Months later a Contributor runs a cleanup script that tries to delete everything with an old tag; the network resources survive, the script logs errors, and the team can review the change calmly instead of rebuilding the network.",
  "tip": "Only Owner and User Access Administrator (among built-in roles) can remove locks. ReadOnly can break normal operations such as listing storage keys or starting VMs, and locks never protect the data inside a resource.",
  "check": [
   [
    "A resource group has a CanNotDelete lock. Can a Contributor create a new VM in it? Delete the VM later?",
    "Yes, they can create it; no, they cannot delete it, because the inherited lock blocks deletion and a Contributor cannot remove locks."
   ],
   [
    "Does a CanNotDelete lock on a storage account stop a user from deleting blobs?",
    "No. Locks apply to control-plane operations; deleting blobs is a data-plane operation. Use soft delete or immutability for data protection."
   ],
   [
    "Why might users be unable to browse a storage account's containers after a ReadOnly lock is applied?",
    "Listing account keys is a POST operation that the ReadOnly lock blocks, so Shared Key access through the portal fails."
   ]
  ]
 },
 {
  "t": "Tags: applying tags, why tags are not inherited, and enforcing or inheriting tags with policy",
  "body": [
   "Tags are name and value pairs, such as `CostCenter = 1234` or `Environment = Production`, that you attach to subscriptions, resource groups and resources. They do not change how a resource works. Instead they add business metadata you can filter, report and automate on: who owns the resource, which project pays for it, whether it may be shut down at night. Cost analysis can group spending by tag, which is often the main reason organizations adopt them.",
   "You apply tags on a resource's Tags blade, when creating it in the portal, in ARM or Bicep templates with the `tags` property, or from the command line with `az tag update --operation merge` or `Update-AzTag -Operation Merge`. Watch the operation: Merge adds or updates the tags you name, while Replace removes every existing tag and leaves only the new set. Tag names are not case-sensitive, and each resource has a limit on how many tags it can carry. Not every resource type supports tags, and a few only accept them through certain tools.",
   "To edit tags you need write access to the resource, which Contributor provides. The built-in Tag Contributor role lets someone manage tags on resources without giving them access to the resources themselves, which suits a finance or governance team.",
   "The key exam fact: tags are not inherited. If you tag a resource group `CostCenter = 1234`, the VMs, disks and NICs inside it do not get that tag. The same is true for subscriptions. People are often surprised when cost analysis grouped by tag shows most spending as 'untagged', even though every resource group is tagged. (Cost Management has its own tag inheritance setting that copies tags onto usage records for reporting, but it does not tag the resources themselves.)",
   "Azure Policy closes the gap. Built-in definitions include 'Require a tag on resources' and 'Require a tag and its value on resource groups', which use the Deny effect so untagged deployments fail. 'Add or replace a tag on resources' and 'Inherit a tag from the resource group if missing' use the Modify effect, so Azure adds the tag automatically as resources are created or updated. For resources that already exist, run a remediation task on the Modify assignment, and it will tag them in bulk using the assignment's managed identity.",
   "A good pattern combines both: require a CostCenter tag on resource groups with Deny, and assign 'Inherit a tag from the resource group if missing' for the same tag at the subscription or management group, then remediate existing resources once. After that, every new resource gets the tag without developers having to remember it."
  ],
  "terms": [
   [
    "Tag",
    "A name and value pair of metadata attached to a subscription, resource group or resource."
   ],
   [
    "Merge vs Replace",
    "Tag update operations: Merge adds or changes the named tags, Replace overwrites the whole tag set."
   ],
   [
    "Tag Contributor",
    "A built-in role that allows managing tags on entities without granting access to the entities themselves."
   ],
   [
    "Inherit a tag from the resource group",
    "A built-in Modify policy that copies a tag from the parent resource group onto resources that lack it."
   ]
  ],
  "example": "Finance reports that 70 percent of last month's spending is untagged, although every resource group has a CostCenter tag. The administrator assigns the built-in 'Inherit a tag from the resource group if missing' policy for CostCenter at the subscription, creates a remediation task to tag existing resources, and next month's cost analysis grouped by CostCenter shows almost no untagged spend.",
  "tip": "Tags are never inherited automatically. If a question asks how resources can get their resource group's tags, the answer is an Azure Policy with the Modify effect (plus remediation for existing resources), not a lock or RBAC.",
  "check": [
   [
    "You tag a resource group Environment = Test. Does a storage account created in it later have that tag?",
    "No. Tags are not inherited; you need a Modify policy such as 'Inherit a tag from the resource group if missing' to copy it."
   ],
   [
    "Which policy effect stops users from creating resources without a required tag?",
    "Deny, as used by the built-in 'Require a tag on resources' definition."
   ],
   [
    "What happens if you update tags with the Replace operation and only specify Owner = Ana?",
    "All existing tags are removed and the resource ends up with only the Owner tag."
   ]
  ]
 },
 {
  "t": "Resource groups: create, move resources between groups and subscriptions",
  "body": [
   "A resource group is a logical container for resources that share a lifecycle: you deploy them together, manage access to them together and usually delete them together. Every resource must belong to exactly one resource group, and resource groups cannot be nested. Group by lifecycle and ownership, for example one resource group per application environment, rather than by resource type.",
   "You create a resource group with a name and a region, in the portal, with `az group create --name rg-app --location westeurope` or with `New-AzResourceGroup`. The region only says where the group's metadata (the list of resources and deployment history) is stored. Resources inside can be in any region. If the group's region has an outage you may not be able to update resources through it, which is why some organizations keep the metadata region close to the resources.",
   "Deleting a resource group deletes everything in it, which makes cleanup easy in a lab and dangerous in production. That is one reason to put CanNotDelete locks on important resource groups. RBAC, policy and locks applied to a resource group are inherited by the resources in it.",
   "You can move resources to another resource group in the same subscription, or to a resource group in another subscription, as long as both subscriptions trust the same Microsoft Entra tenant. In the portal select the resources and choose Move, or use `az resource move --destination-group rg-new --ids <resource-id>` or `Move-AzResource`. The portal first validates the move. During the move both the source and the target resource group are locked against writes and deletes, but the resources keep running.",
   "Several rules decide whether a move succeeds. Not every resource type supports moving, and some only support moving within a subscription; Microsoft publishes a support table per type. Dependent resources must move together: a VM with its disks and network interface, or an App Service app with its plan. The target subscription must have the needed resource providers registered and enough quota. The region does not change in a move; to change regions you redeploy or use Azure Resource Mover or Site Recovery. Moving to a different tenant requires transferring the whole subscription instead.",
   "After a move the resource ID changes, because it includes the subscription ID and resource group name. Scripts, templates or monitoring that referenced the old ID must be updated. Role assignments made directly on the resource do not move with it; the resource now inherits assignments and policies from its new resource group and subscription, so check access after moving."
  ],
  "terms": [
   [
    "Resource group",
    "A logical container for Azure resources that share a lifecycle; every resource belongs to exactly one."
   ],
   [
    "Resource group location",
    "The region where the group's metadata is stored; it does not restrict where its resources are deployed."
   ],
   [
    "Move validation",
    "A check Azure runs before a move to confirm the resource types, dependencies and target are supported."
   ],
   [
    "Resource ID",
    "The full path of a resource, including subscription and resource group, which changes when the resource is moved."
   ]
  ],
  "example": "A project finishes its pilot, and its web app, App Service plan and storage account must move from the Dev subscription to Production. The administrator confirms both subscriptions are in the same tenant, registers Microsoft.Web in the target, selects all three resources together and runs Move. Afterwards they update a deployment pipeline that referenced the old resource IDs and re-create a role assignment that had been set directly on the web app.",
  "tip": "Moving resources never changes their region and does not carry resource-level role assignments. Both subscriptions must be in the same Entra tenant, and dependent resources must move together.",
  "check": [
   [
    "A resource group is in West US. Can it contain a VM in East Asia?",
    "Yes. The resource group location only stores metadata; resources can be in any region."
   ],
   [
    "After moving a storage account to another subscription, an automation script fails with 'resource not found'. Why?",
    "The resource ID changed because it includes the subscription and resource group, so the script is using the old ID."
   ],
   [
    "Can you move a VM to a resource group in another region with a move operation?",
    "The resource group can be anywhere, but the VM's own region does not change; relocating the VM to another region needs Resource Mover, Site Recovery or redeployment."
   ]
  ]
 },
 {
  "t": "Subscriptions and management groups: hierarchy, inheritance of policy and RBAC",
  "body": [
   "Azure organizes resources in a four-level hierarchy: management groups contain subscriptions, subscriptions contain resource groups, and resource groups contain resources. Understanding the hierarchy is essential because RBAC role assignments and Azure Policy assignments made at any level flow down to everything beneath it.",
   "A subscription is a billing and management boundary. Each one has its own invoice line, its own quotas (such as how many vCPUs you can run per region), and trusts exactly one Microsoft Entra tenant for identities. A tenant can have many subscriptions. Organizations often separate subscriptions by environment (production versus development), by business unit or by billing owner, so that limits and costs are isolated and access can be granted per subscription.",
   "Management groups sit above subscriptions and let you manage many subscriptions as one. Every tenant has a single root management group, shown as the Tenant Root Group, and all other management groups and subscriptions sit under it. You can nest management groups several levels deep to mirror your organization, for example Root > Corp > Europe > Production. Each management group and each subscription has exactly one parent. New subscriptions land in a default management group, which is the root unless you change the default in the hierarchy settings.",
   "Inheritance is the point. If you assign the Reader role to the Auditors group on the Corp management group, auditors can read every subscription and resource under Corp, including subscriptions added next year. If you assign an Allowed locations policy there, every child subscription is restricted too. A child scope cannot remove what it inherits: a subscription Owner cannot delete a policy assignment made on a parent management group, although exclusions and exemptions can be set by someone with rights at the assignment's scope.",
   "Moving a subscription to a different management group changes what it inherits immediately: it loses the old parent's assignments and gains the new ones. To move a subscription you need rights on the subscription (such as Owner) and on the target parent management group (such as Management Group Contributor), and you need to be able to write to the old parent too. Creating management groups is available to any user in the tenant by default unless hierarchy protection settings require a permission.",
   "A practical design: put company-wide guardrails (security baseline initiative, allowed regions, central logging) on a top management group, business-unit rules one level down, and give application teams Contributor on their own subscriptions or resource groups. This landing zone pattern lets teams move fast while the platform team keeps control through inheritance."
  ],
  "terms": [
   [
    "Management group",
    "A container above subscriptions used to apply policy and RBAC to many subscriptions at once."
   ],
   [
    "Tenant Root Group",
    "The single top-level management group in every tenant, from which all management groups and subscriptions descend."
   ],
   [
    "Subscription",
    "A billing, quota and management boundary for Azure resources that trusts one Entra tenant."
   ],
   [
    "Inheritance",
    "The flow of RBAC and policy assignments from a parent scope to all child scopes."
   ]
  ],
  "example": "A retailer has 30 subscriptions and must keep all data in the EU. Instead of assigning Allowed locations 30 times, the administrator builds a management group called Retail, moves the subscriptions under it and assigns the policy once. When a new subscription is created and moved into Retail, it is compliant from day one.",
  "tip": "Assignments flow down, never up or sideways. To apply a rule to many subscriptions with the least effort, assign it at their common management group. A subscription trusts one tenant, and each subscription has one parent management group.",
  "check": [
   [
    "You assign Contributor to a group on a management group. Do members have Contributor on resource groups in subscriptions under it?",
    "Yes. Role assignments are inherited by all child management groups, subscriptions, resource groups and resources."
   ],
   [
    "What is the minimal way to apply the same policy to 12 subscriptions?",
    "Place them under a common management group and assign the policy once at that management group."
   ],
   [
    "What happens to inherited policies when a subscription is moved to a different management group?",
    "It stops inheriting the old parent's assignments and immediately inherits the new parent's."
   ]
  ]
 },
 {
  "t": "Cost management: cost analysis, budgets and budget alerts, Azure Advisor cost recommendations, reservations",
  "body": [
   "Azure is billed on consumption, so costs can grow quietly. Microsoft Cost Management, available in the portal at no extra charge for Azure resources, gives you the tools to see where money goes, warn you before overspending and find savings. An administrator is expected to set these up, not just read the invoice.",
   "Cost analysis is the reporting view. You pick a scope (management group, subscription or resource group), a date range and a view such as accumulated costs, daily costs or cost by service. Then you group and filter by resource group, service name, location, meter or tag. Grouping by tag is how you do chargeback to departments, which is why tagging matters. You can also see forecasted cost for the rest of the month and save views or schedule exports to a storage account for further analysis. Cost data is updated several times a day rather than in real time.",
   "A budget sets a spending threshold for a scope over a reset period (monthly, quarterly or annually). You attach alert conditions as percentages of the budget, based on actual cost or forecasted cost, for example 50 percent actual, 90 percent actual and 100 percent forecasted. When a condition is met, Azure emails the listed recipients and can trigger an action group, which can run an automation runbook, a Logic App or a function, for instance to shut down development VMs. Budgets never stop resources or spending by themselves; they only notify, and any stopping has to be done by the automation you attach.",
   "Azure Advisor analyzes your usage and gives recommendations in categories including Cost, Security, Reliability, Operational Excellence and Performance. Cost recommendations include shutting down or resizing underused virtual machines, deleting unattached disks and idle public IP addresses, and buying reservations or savings plans for steady workloads. Each recommendation shows the estimated savings; you can act on it, postpone it or dismiss it.",
   "Azure Reservations give a discount in exchange for committing to a specific resource type, such as a VM size family in a region, for one or three years. The reservation is a billing discount applied automatically to matching running resources; it does not create or reserve a VM for you. Scope a reservation to a single resource group, a single subscription, a management group or shared across the billing account so that any matching usage benefits. Azure savings plans for compute are a related option that commit to an hourly spend across services and regions, trading a smaller discount for more flexibility.",
   "Other savings levers you may meet: Azure Hybrid Benefit, which lets you use existing Windows Server or SQL Server licenses with Software Assurance; Spot VMs for interruptible workloads; auto-shutdown for dev VMs; and right-sizing. Tags plus budgets per resource group are a simple way to give each team visibility of its own spending."
  ],
  "terms": [
   [
    "Cost analysis",
    "The Cost Management view for exploring actual and forecasted costs by scope, grouped and filtered by dimensions such as tag."
   ],
   [
    "Budget",
    "A spending threshold for a scope and period with alert conditions; it notifies but does not stop spending."
   ],
   [
    "Action group",
    "A reusable set of notification and automation actions that budgets and alerts can trigger."
   ],
   [
    "Reservation",
    "A one- or three-year commitment to a resource type in exchange for a billing discount on matching usage."
   ]
  ],
  "example": "A development team keeps running over its budget. The administrator creates a monthly budget on the team's resource group with email alerts at 80 percent actual and 100 percent forecasted, and links an action group to a runbook that stops tagged dev VMs. Advisor also flags three idle disks and a VM running at low CPU, which the team deletes and resizes.",
  "tip": "Budgets alert; they do not enforce. If a question asks how to automatically stop resources when spending reaches a threshold, the answer is a budget with an action group that runs automation. Reservations are billing discounts, not capacity.",
  "check": [
   [
    "A budget reaches 100 percent. Do resources stop?",
    "No. Budgets only send alerts or trigger action groups; stopping resources requires automation connected to the action group."
   ],
   [
    "Where do you find a recommendation to resize an underused VM?",
    "Azure Advisor, Cost category (also surfaced in Cost Management)."
   ],
   [
    "How do you show costs per department in cost analysis?",
    "Tag resources with a department tag and group cost analysis by that tag."
   ]
  ]
 },
 {
  "t": "Storage account types and redundancy: LRS, ZRS, GRS, RA-GRS, GZRS and RA-GZRS",
  "body": [
   "A storage account is the top-level container for Azure Storage services: blobs, files, queues and tables. When you create one you choose a globally unique name (lowercase letters and numbers only, which becomes part of endpoints such as `name.blob.core.windows.net`), a region, a performance tier and a redundancy option. Performance and redundancy are the two decisions the exam tests most.",
   "Standard general-purpose v2 is the recommended account type for most workloads: it supports all four services, all access tiers and all redundancy options, and runs on hard-disk based storage. Premium accounts use solid-state storage for low latency and come in three kinds, each for one service: premium block blobs, premium file shares and premium page blobs. Premium accounts support only LRS and ZRS, so if a question needs geo-redundancy, it needs a standard account.",
   "Redundancy options keep multiple copies of your data. Locally redundant storage (LRS) keeps three copies within a single datacenter in the primary region. It is the cheapest and protects against disk and server failures, but not a datacenter-wide outage. Zone-redundant storage (ZRS) keeps three copies spread across three availability zones in the primary region, so data stays available if one zone fails. Use it for high availability within a region.",
   "Geo-redundant storage (GRS) keeps three copies with LRS in the primary region and replicates them asynchronously to the paired secondary region, where another three LRS copies are kept. Geo-zone-redundant storage (GZRS) uses ZRS in the primary and LRS in the secondary, combining zone and region protection. Because replication is asynchronous, a region failover can lose the most recent writes; the Last Sync Time property tells you how current the secondary is.",
   "With plain GRS and GZRS the secondary copy cannot be read until a failover happens. Read-access versions, RA-GRS and RA-GZRS, let applications read from a secondary endpoint (the account name with `-secondary` appended) at any time, which is useful for read-heavy apps that must keep working during a primary outage. Failover to the secondary region can be initiated by the customer from the account's redundancy settings; after failover the account becomes LRS in the new primary until you reconfigure geo-redundancy.",
   "You can change redundancy after creation. Moving between LRS and GRS or RA-GRS is a simple setting change. Moving to or from zone redundancy, such as LRS to ZRS, requires a conversion that Azure performs in the background. Some features have restrictions, for example the Archive access tier is only available on LRS, GRS and RA-GRS accounts. Choose the cheapest option that meets the stated requirement: zone failure means ZRS, region failure means GRS or GZRS, and reading during a regional outage means an RA option."
  ],
  "terms": [
   [
    "LRS",
    "Locally redundant storage: three synchronous copies in one datacenter in the primary region."
   ],
   [
    "ZRS",
    "Zone-redundant storage: three synchronous copies across three availability zones in the primary region."
   ],
   [
    "GRS / GZRS",
    "Geo-redundant options that replicate asynchronously to the paired secondary region, using LRS or ZRS in the primary respectively."
   ],
   [
    "RA-GRS / RA-GZRS",
    "Read-access geo-redundant options that allow reads from the secondary endpoint at any time."
   ],
   [
    "Last Sync Time",
    "A property showing the point up to which data has been replicated to the secondary region."
   ]
  ],
  "example": "A news site stores images in a storage account and must keep serving them even if the entire primary region goes down, without waiting for a failover, and must survive a single zone failure without disruption. RA-GZRS meets both: ZRS protects against a zone failure in the primary, and read access to the secondary endpoint keeps images available during a regional outage.",
  "tip": "Map requirements to options: datacenter failure = ZRS minimum; region failure = GRS or GZRS; must read during a regional outage = RA-GRS or RA-GZRS. Premium accounts do not offer geo-redundancy.",
  "check": [
   [
    "Which is the cheapest option that keeps data available if one availability zone fails?",
    "ZRS, which stores three copies across three zones in the primary region."
   ],
   [
    "An app must read data from the secondary region without a failover. Which options qualify?",
    "RA-GRS or RA-GZRS, which expose a read-only secondary endpoint."
   ],
   [
    "You need a premium block blob account replicated to another region. Is that possible?",
    "Not with built-in account redundancy; premium accounts support only LRS or ZRS. Use a standard account or replicate data yourself, for example with object replication."
   ]
  ]
 },
 {
  "t": "Storage firewalls and virtual network rules, trusted Microsoft services, private endpoints for storage",
  "body": [
   "By default a new storage account accepts connections from any network, and it relies on authorization (keys, SAS or Entra ID) to keep data safe. The storage firewall adds a network layer: even a request with a valid key is refused if it does not come from an allowed network. Configure it under the account's Networking blade, where public network access can be enabled from all networks, enabled from selected virtual networks and IP addresses, or disabled.",
   "When you choose selected networks, the account denies everything except what you list. IP network rules allow specific public IP addresses or ranges in CIDR notation, such as your office's internet address. They only work for public addresses; you cannot use them for private address ranges inside a virtual network. Virtual network rules allow specific subnets. For a subnet to be added, it must have a service endpoint for `Microsoft.Storage` enabled, which the portal can turn on for you. With a service endpoint, traffic from the subnet travels to storage over the Azure backbone and carries the subnet's identity, so the firewall can recognize it, but the storage account keeps its public IP address.",
   "Blocking all public traffic can break Azure services that need to reach your account, such as Azure Backup, Azure Monitor diagnostic logs, Azure Event Grid or Azure Site Recovery. The exception 'Allow Azure services on the trusted services list to access this storage account' lets those specific first-party services through, using strong authentication. There are also resource instance rules, which allow a particular resource, such as a specific Azure Synapse workspace, to reach the account through its managed identity.",
   "A private endpoint is the strongest option. It creates a network interface in one of your subnets with a private IP address from that subnet, connected by Azure Private Link to one sub-resource of the storage account, such as `blob`, `file`, `queue`, `table`, `web` or `dfs`. Clients in the virtual network, peered networks or on-premises networks connected by VPN or ExpressRoute reach the account over that private IP. You can then set public network access to Disabled so the account has no internet exposure at all. You need one private endpoint per sub-resource you use.",
   "Private endpoints depend on DNS. The account name must resolve to the private IP for clients that should use the endpoint. The portal offers to integrate with a private DNS zone such as `privatelink.blob.core.windows.net`, linked to your virtual network, so `name.blob.core.windows.net` resolves via a CNAME to the private address. On-premises clients need DNS forwarding to Azure to get the same answer.",
   "Summary for the exam: IP rules for known public addresses, virtual network rules plus service endpoints for subnets reaching the public endpoint over the backbone, private endpoints when data must stay on private addresses or public access must be disabled, and the trusted services exception for Azure platform services."
  ],
  "terms": [
   [
    "Storage firewall",
    "Network rules on a storage account that allow only listed public IP ranges, subnets and exceptions to connect."
   ],
   [
    "Service endpoint",
    "A subnet setting that routes traffic to a service over the Azure backbone and identifies the subnet so it can be allowed by virtual network rules."
   ],
   [
    "Trusted Microsoft services",
    "A firewall exception that lets specific Azure platform services access the account even when public access is restricted."
   ],
   [
    "Private endpoint",
    "A network interface with a private IP in your subnet that connects to a specific storage sub-resource through Private Link."
   ]
  ],
  "example": "A finance team's storage account must not be reachable from the internet, but VMs in the Hub virtual network and the on-premises office over VPN need to read blobs. The administrator creates a private endpoint for the blob sub-resource in a Hub subnet, integrates it with the privatelink.blob.core.windows.net private DNS zone, configures on-premises DNS forwarding, and sets public network access to Disabled. The trusted services exception is enabled so Azure Backup still works.",
  "tip": "Service endpoints keep the public endpoint and only work from Azure subnets; private endpoints give a private IP usable from peered and on-premises networks. IP rules cannot contain private addresses. Private endpoints need correct DNS.",
  "check": [
   [
    "You add a subnet to a storage firewall, but the portal says a service endpoint is required. Which one?",
    "Microsoft.Storage on that subnet."
   ],
   [
    "After restricting a storage account to selected networks, Azure Backup can no longer write to it. What should you enable?",
    "The exception that allows trusted Microsoft services to access the storage account."
   ],
   [
    "On-premises users connected by VPN must reach a storage account using a private IP address. Service endpoint or private endpoint?",
    "A private endpoint; service endpoints only apply to traffic from Azure subnets and still use the public endpoint."
   ]
  ]
 },
 {
  "t": "Shared access signatures: account, service and user delegation SAS; stored access policies; access keys and key rotation",
  "body": [
   "Every storage account has two access keys, key1 and key2. Either key gives full control of all data in the account, like a root password, which is why sharing keys with applications or partners is risky. Shared access signatures (SAS) exist so you can hand out limited, time-bound access instead.",
   "A SAS is a URI with a set of query parameters and a signature. The parameters describe what is allowed: which services and resources, which permissions (read, write, delete, list and so on), start and expiry times, optionally allowed IP addresses and whether only HTTPS is permitted. The signature proves the token was created by someone with a secret. Anyone holding the URI can use it until it expires, so treat it like a password, use short expiry times and require HTTPS.",
   "There are three kinds of SAS. An account SAS is signed with an account key and can grant access to one or more services (blob, file, queue, table) and to service-level operations such as listing containers. A service SAS is also signed with an account key but covers resources in just one service, such as a single container or blob. A user delegation SAS is signed with a user delegation key that you request using Microsoft Entra credentials, and it works only for Blob Storage (including Data Lake Storage). Its permissions are limited to what the Entra identity that requested it can do. Microsoft recommends user delegation SAS where possible because no account key is involved and access can be audited to an identity.",
   "A stored access policy is defined on a container, file share, queue or table and holds the start time, expiry and permissions. A service SAS can reference the policy instead of carrying those values itself. The benefit is revocation: to cancel every SAS tied to the policy, you change its expiry or delete the policy. Only service SAS can use stored access policies; an account SAS cannot.",
   "Without a stored access policy, the only way to revoke a key-signed SAS before it expires is to regenerate the account key that signed it, which also breaks everything else using that key. A user delegation SAS is revoked by revoking the user delegation keys or removing the identity's permissions.",
   "Two keys exist so you can rotate without downtime. The usual sequence: update applications to use key2, regenerate key1, move applications back to key1 (or leave them on key2), then regenerate key2 next time. You can set a key expiration policy so Azure reminds you when keys are older than a set number of days, and store keys or connection strings in Azure Key Vault. For the strongest posture, disable 'Allow storage account key access' so that only Entra ID authorization works, and with it only user delegation SAS."
  ],
  "terms": [
   [
    "Account key",
    "One of two secrets that give full access to a storage account's data and are used to sign account and service SAS."
   ],
   [
    "Service SAS",
    "A SAS signed with an account key that grants access to resources in a single storage service."
   ],
   [
    "User delegation SAS",
    "A blob SAS signed with a key obtained through Microsoft Entra credentials, limited by that identity's permissions."
   ],
   [
    "Stored access policy",
    "A named set of SAS constraints on a container, share, queue or table that lets you revoke linked service SAS tokens."
   ]
  ],
  "example": "A partner needs to upload files to one container for the next week. The administrator creates a stored access policy on the container with write and list permissions and a seven-day expiry, and issues a service SAS that references it. When the partnership ends early, the administrator deletes the policy and the partner's SAS stops working, while other applications using the account keys are unaffected.",
  "tip": "To revoke a SAS without affecting others, use a stored access policy. Account SAS cannot use one, so revoking it means regenerating the signing key. User delegation SAS is blob-only and does not use account keys.",
  "check": [
   [
    "Which SAS type is recommended for blob access because it avoids account keys?",
    "User delegation SAS, signed with a key obtained using Microsoft Entra credentials."
   ],
   [
    "A leaked account SAS must be invalidated immediately. What must you do?",
    "Regenerate the account key that signed it, since account SAS cannot be tied to a stored access policy."
   ],
   [
    "Why does a storage account have two access keys?",
    "So you can switch applications to one key while regenerating the other, rotating keys without downtime."
   ]
  ]
 },
 {
  "t": "Identity-based access for Azure Files (AD DS, Entra Domain Services, Entra Kerberos) with share-level RBAC and NTFS permissions",
  "body": [
   "Azure Files offers file shares over SMB (Server Message Block), the same protocol Windows file servers use. You can mount a share with the storage account key, but that gives everyone who knows the key full access, like being administrator on the file server. For real file-server replacement you want users to sign in with their own identities and receive only the access they should have. That is identity-based authentication.",
   "Azure Files supports three identity sources for SMB, and a storage account can use only one of them at a time. On-premises Active Directory Domain Services (AD DS): you join the storage account to your domain as a computer or service logon account, typically with the AzFilesHybrid PowerShell module, and users must be synchronized to Microsoft Entra ID with Entra Connect. Clients need line of sight to a domain controller. Microsoft Entra Domain Services: a managed domain in Azure; you enable it on the storage account, and clients joined to that managed domain use Kerberos against it. Microsoft Entra Kerberos: Entra ID itself issues Kerberos tickets, so clients that are Microsoft Entra joined or hybrid joined can access shares without a line of sight to domain controllers, which suits remote workers. It targets hybrid user identities synced from AD.",
   "Access is then checked at two levels, and both must allow the action. Share-level permissions are Azure RBAC roles assigned to Entra users or groups on the share or storage account. Storage File Data SMB Share Reader gives read access, Storage File Data SMB Share Contributor gives read, write and delete, and Storage File Data SMB Share Elevated Contributor additionally lets the user change NTFS permissions. You can also set a default share-level permission that applies to all authenticated identities, which saves assigning roles if you want NTFS to do all the fine-grained work.",
   "Directory and file level permissions are ordinary Windows NTFS access control lists. To set them, an administrator mounts the share, commonly with the storage account key for full control, and uses File Explorer or `icacls` to grant, for example, Modify on the Finance folder to the Finance group. These ACLs travel with the files and work just as they did on the old file server.",
   "The effective access is the more restrictive of the two layers. A user with Share Contributor but only Read on a folder's NTFS ACL can only read that folder. A user with Full Control in NTFS but no share-level role, and no default share permission, cannot open the share at all.",
   "Remember that SMB uses TCP port 445. Identity configuration does not help if the client's network blocks outbound 445, which many internet service providers and corporate firewalls do."
  ],
  "terms": [
   [
    "AD DS authentication",
    "Azure Files authentication where the storage account is joined to on-premises Active Directory and users present AD Kerberos tickets."
   ],
   [
    "Microsoft Entra Kerberos",
    "An Azure Files option where Entra ID issues Kerberos tickets for hybrid identities, so clients need no domain controller line of sight."
   ],
   [
    "Share-level permission",
    "An Azure RBAC role, such as Storage File Data SMB Share Contributor, that controls access to a whole file share."
   ],
   [
    "NTFS permissions",
    "Windows access control lists on directories and files in the share that provide fine-grained access."
   ]
  ],
  "example": "A company retires its on-premises file server and moves data to an Azure file share. The storage account is joined to the existing AD DS domain, the default share-level permission is set to Storage File Data SMB Share Contributor, and the NTFS ACLs copied from the old server continue to control who can open each department folder. Users map the drive with their normal domain credentials.",
  "tip": "Two layers: share-level RBAC first, NTFS second, and the stricter one wins. Only one identity source can be enabled per storage account. Elevated Contributor is the share role that allows changing NTFS ACLs.",
  "check": [
   [
    "A user has Storage File Data SMB Share Reader on a share and Full Control NTFS permission on a folder. Can they create files in the folder?",
    "No. Share-level Reader limits them to read-only, and the more restrictive layer applies."
   ],
   [
    "Which identity option lets Entra-joined laptops outside the office reach Azure Files with Kerberos without contacting a domain controller?",
    "Microsoft Entra Kerberos authentication."
   ],
   [
    "How do you usually set the initial NTFS permissions on a new share?",
    "Mount the share with administrative access (for example the storage account key) and use File Explorer or icacls to set the ACLs."
   ]
  ]
 },
 {
  "t": "Encryption: Microsoft-managed vs customer-managed keys in Key Vault, infrastructure encryption, encryption scopes",
  "body": [
   "All data written to Azure Storage is encrypted at rest automatically with 256-bit AES (Advanced Encryption Standard) encryption, a process called Storage Service Encryption. You cannot turn it off, and it costs nothing extra. Encryption and decryption are transparent: applications read and write data normally. What you choose is who manages the keys and whether to add more layers.",
   "By default, Microsoft-managed keys are used. Microsoft generates, stores and rotates the keys, and you have nothing to configure. This meets most requirements. Some organizations have compliance rules that demand control over the encryption key, the ability to rotate it on their schedule, or the ability to make data unreadable by revoking the key. For them there are customer-managed keys.",
   "With customer-managed keys (CMK), you create an RSA key in Azure Key Vault or Azure Key Vault Managed HSM, and the storage account uses it to wrap (encrypt) the account's data encryption keys. The storage account needs a managed identity, system-assigned or user-assigned, with permission on the key, for example the Key Vault Crypto Service Encryption User role, or get, wrap key and unwrap key access policies. The key vault must have soft delete and purge protection enabled so the key cannot be permanently lost by accident. If you specify the key without a version, Azure Storage automatically picks up new key versions when you rotate it. If you disable or delete the key or remove the identity's access, the data becomes inaccessible until access is restored, which is both the point and the risk.",
   "Infrastructure encryption adds a second layer of encryption at the infrastructure level, with a different algorithm mode and different keys, so data is encrypted twice. It exists for strict compliance scenarios that require double encryption. It must be enabled when you create the storage account and cannot be enabled or disabled afterwards.",
   "Encryption scopes let you use different keys within one account for Blob Storage. You create a scope on the storage account, backed by either a Microsoft-managed key or a customer-managed key, and then set it as the default for a container or specify it when writing individual blobs. You can require that all blobs in a container use the container's default scope. This is useful for multi-tenant applications where each customer's data must be protected with a separate key in the same account.",
   "Do not confuse storage encryption with disk encryption features for VMs, such as encryption at host or Azure Disk Encryption, which are covered with virtual machines. Encryption in transit is a separate setting too: enable 'Secure transfer required' and a minimum TLS version so clients must use HTTPS or encrypted SMB."
  ],
  "terms": [
   [
    "Storage Service Encryption",
    "Automatic, always-on AES-256 encryption of data at rest in Azure Storage."
   ],
   [
    "Customer-managed key (CMK)",
    "A key you control in Key Vault or Managed HSM that protects a storage account's data encryption keys."
   ],
   [
    "Infrastructure encryption",
    "An optional second layer of encryption at the infrastructure level that must be enabled at account creation."
   ],
   [
    "Encryption scope",
    "A named key configuration within a storage account that can be applied to containers or individual blobs."
   ]
  ],
  "example": "A healthcare company must be able to cut off access to patient documents instantly if a contract ends. The administrator creates a key in a Key Vault with purge protection, gives the storage account's system-assigned managed identity the Key Vault Crypto Service Encryption User role and switches the account to customer-managed keys. Disabling the key would make the data unreadable, and rotating it only requires adding a new key version.",
  "tip": "Infrastructure encryption can only be set when creating the account. CMK needs a managed identity and a key vault with soft delete and purge protection. Encryption at rest cannot be disabled.",
  "check": [
   [
    "Can you enable infrastructure encryption on an existing storage account?",
    "No. It must be enabled when the account is created."
   ],
   [
    "What does the storage account need in order to use a customer-managed key in Key Vault?",
    "A managed identity with permission to get, wrap and unwrap the key, and a key vault with soft delete and purge protection enabled."
   ],
   [
    "Two customers' blobs share one storage account, and each must be encrypted with a different key. What feature helps?",
    "Encryption scopes, each backed by a different key and set as the default on each customer's container."
   ]
  ]
 },
 {
  "t": "Object replication, and data movement with AzCopy and Azure Storage Explorer",
  "body": [
   "Moving data into, out of and between storage accounts is a routine job. Azure offers an automatic, policy-based option (object replication) and tools you run yourself: AzCopy on the command line and Azure Storage Explorer as a desktop application.",
   "Object replication asynchronously copies block blobs from a container in a source storage account to a container in a destination account, which can be in another region or even another subscription. Typical uses are keeping a copy close to users in another region, feeding a separate analytics account, or reducing latency for reads. You configure a replication policy with one or more rules, each pairing a source container with a destination container, optionally filtered by blob name prefix and a minimum creation time so only new blobs are copied.",
   "Object replication has prerequisites that are tested often: blob versioning must be enabled on both the source and destination accounts, and change feed must be enabled on the source account. It works with block blobs only, and the destination container becomes effectively read-only for replicated data while the policy exists. It does not replace geo-redundancy: it is per-container, asynchronous, and you choose what to replicate, whereas GRS replicates the entire account to the paired region and you cannot read or choose the target.",
   "AzCopy is a free command-line tool for copying data to and from Blob Storage and Azure Files. You authenticate with `azcopy login` (Microsoft Entra ID, which needs a data-plane role such as Storage Blob Data Contributor) or by appending a SAS token to the URL. Common commands:",
   "```bash\n# <container-url> = the container's full URL on the account's blob endpoint\nazcopy login\nazcopy copy \"C:\\data\\*\" \"<container-url>\" --recursive\nazcopy sync \"C:\\data\" \"<container-url>\" --recursive\nazcopy copy \"<source-container-url>?<SAS>\" \"<destination-container-url>?<SAS>\" --recursive\n```",
   "`azcopy copy` copies everything you point it at; `azcopy sync` compares source and destination and copies only new or changed files, optionally deleting extra files at the destination with `--delete-destination`. Account-to-account copies run server to server, so data does not pass through your machine. AzCopy is the tool of choice for scripted, large or repeatable transfers.",
   "Azure Storage Explorer is a free graphical application for Windows, macOS and Linux. You connect with your Entra account, an account key, a connection string or a SAS URL, then browse containers, file shares, queues and tables, upload and download files, manage access tiers, create SAS tokens and set access policies. Behind the scenes it uses AzCopy for transfers. It suits one-off tasks and people who prefer a GUI (graphical user interface). For very large offline transfers, where the network is too slow, Azure Data Box devices are the alternative."
  ],
  "terms": [
   [
    "Object replication",
    "Asynchronous, policy-based copying of block blobs from a source container to a destination container in another account."
   ],
   [
    "Change feed",
    "An ordered log of changes to blobs in an account, required on the source account for object replication."
   ],
   [
    "AzCopy",
    "A command-line tool for copying and synchronizing data with Blob Storage and Azure Files."
   ],
   [
    "Azure Storage Explorer",
    "A free desktop GUI for browsing and managing storage accounts that uses AzCopy for transfers."
   ]
  ],
  "example": "A media company produces videos in West Europe but has many viewers in East US. The administrator enables versioning on two accounts and change feed on the source, then creates an object replication policy from the source 'published' container to a container in East US. Separately, an editor uses Storage Explorer to upload a few files, while a nightly scheduled task runs azcopy sync to push the render server's output folder.",
  "tip": "Object replication needs versioning on both accounts and change feed on the source, and it only handles block blobs. Use azcopy sync for incremental updates and azcopy copy for full copies.",
  "check": [
   [
    "Object replication setup fails. Which features must be enabled on the source and destination accounts?",
    "Blob versioning on both, and change feed on the source."
   ],
   [
    "Which AzCopy command copies only new or changed files from a local folder to a container?",
    "azcopy sync, run with --recursive for subfolders."
   ],
   [
    "An AzCopy command authenticated with azcopy login fails with a permission error, although the user is Contributor. Why?",
    "Entra authentication to blob data needs a data-plane role such as Storage Blob Data Contributor; Contributor is a control-plane role."
   ]
  ]
 },
 {
  "t": "Blob containers and access tiers: Hot, Cool, Cold and Archive; rehydration from Archive",
  "body": [
   "Blob Storage stores unstructured data such as documents, images, backups and logs. Blobs live in containers, which are like top-level folders in a storage account. There are three blob types: block blobs for most files, append blobs for data that is only ever added to, such as logs, and page blobs for random read and write access, used by VM disks. Access tiers apply to block blobs.",
   "Each container has an anonymous access level: Private (no anonymous access, the default), Blob (anonymous read of blobs if you know the URL) or Container (anonymous read and list). Anonymous access only works if the storage account setting 'Allow blob anonymous access' is enabled; keep it disabled unless you are deliberately publishing public content.",
   "Access tiers trade storage cost against access cost. Hot is for frequently accessed data, with the highest storage price and lowest access price. Cool is for infrequently accessed data kept at least 30 days, such as short-term backups. Cold is for rarely accessed data kept at least 90 days that still needs to be read quickly. Archive is for data rarely if ever read and kept at least 180 days, such as compliance records, with the lowest storage price and the highest cost and delay to read. If you delete or move a blob out of Cool, Cold or Archive before its minimum period, an early deletion charge applies for the remaining days.",
   "Hot, Cool and Cold are online tiers: data can be read immediately. Archive is offline: you cannot read or modify the blob's content, only its metadata. The storage account has a default access tier used for blobs without an explicit tier, while an individual blob can be set to any tier. Archive can only be set on individual blobs, not as the account default, and it is not available on ZRS, GZRS or RA-GZRS accounts.",
   "To read an archived blob, you rehydrate it to an online tier. There are two ways. Change the blob's tier with Set Blob Tier, which changes the original blob in place. Or copy it to a new blob in an online tier with Copy Blob, which leaves the archived original in place, useful if you only need the data briefly. Each rehydration has a priority. Standard priority can take up to 15 hours. High priority is faster, often under an hour for smaller blobs, and costs more. You can use an Event Grid event on completion instead of polling.",
   "In a lab, upload a file, change its tier to Archive, then try to download it: the portal refuses. Change the tier back to Hot and note that the blob shows a rehydrate pending status for hours with Standard priority."
  ],
  "terms": [
   [
    "Access tier",
    "The Hot, Cool, Cold or Archive setting of a block blob that determines storage and access costs."
   ],
   [
    "Archive tier",
    "An offline tier for rarely accessed data; blobs must be rehydrated before they can be read."
   ],
   [
    "Rehydration",
    "Moving an archived blob back to an online tier, by changing its tier or copying it, with Standard or High priority."
   ],
   [
    "Early deletion charge",
    "A fee for removing or re-tiering a blob before the tier's minimum retention period ends."
   ]
  ],
  "example": "A law firm must keep scanned case files for seven years but almost never opens them. The files are set to Archive after the case closes. When an old case is reopened, a clerk copies the needed files to the Hot tier with High priority so they can be read the same day, leaving the archived originals untouched.",
  "tip": "Archive is offline and must be rehydrated first; Standard priority can take up to 15 hours. Minimum durations are 30 days for Cool, 90 for Cold and 180 for Archive. Archive cannot be the account default tier.",
  "check": [
   [
    "A user needs to read an archived blob within the hour. What should you do?",
    "Rehydrate it with High priority, either by changing its tier or by copying it to an online tier."
   ],
   [
    "Which tier is cheapest for storage but cannot be read directly?",
    "Archive, which is offline until rehydrated."
   ],
   [
    "A blob in the Cool tier is deleted after 10 days. What cost applies?",
    "An early deletion charge for the remaining 20 days of the 30-day minimum."
   ]
  ]
 },
 {
  "t": "Lifecycle management policies that tier or delete blobs by age",
  "body": [
   "Setting access tiers by hand does not scale when a storage account holds millions of blobs. Lifecycle management lets you define rules that Azure runs automatically, moving blobs to cooler tiers as they age and deleting them when they are no longer needed. It is the standard way to keep storage costs in line with how data is actually used.",
   "A lifecycle management policy is a JSON document of rules, attached to a storage account (general-purpose v2, premium block blob or legacy Blob Storage accounts) under Data management > Lifecycle management. Each rule has filters that select blobs and actions that say what to do. Filters include `blobTypes` (such as `blockBlob`), `prefixMatch` (a container name followed by an optional path, such as `logs/app1`) and `blobIndexMatch` (blob index tags). Actions apply to the current version of blobs (base blobs), and separately to previous versions and snapshots.",
   "Actions include `tierToCool`, `tierToCold`, `tierToArchive` and `delete`, each with a condition. Conditions are based on age: days since the blob was last modified (`daysAfterModificationGreaterThan`), days since creation, or days since last access (`daysAfterLastAccessTimeGreaterThan`), which requires last access time tracking to be enabled on the account. With last access time you can also use `enableAutoTierToHotFromCool` to move a blob back to Hot when it is read again.",
   "```json\n{\n  \"rules\": [{\n    \"name\": \"age-logs\",\n    \"enabled\": true,\n    \"type\": \"Lifecycle\",\n    \"definition\": {\n      \"filters\": { \"blobTypes\": [\"blockBlob\"], \"prefixMatch\": [\"logs/\"] },\n      \"actions\": { \"baseBlob\": {\n        \"tierToCool\":    { \"daysAfterModificationGreaterThan\": 30 },\n        \"tierToArchive\": { \"daysAfterModificationGreaterThan\": 90 },\n        \"delete\":        { \"daysAfterModificationGreaterThan\": 365 }\n      } }\n    }\n  }]\n}\n```",
   "The policy above moves blobs in the logs container to Cool after 30 days without modification, to Archive after 90 and deletes them after a year. The portal's list view builds the same JSON for you through a wizard, and the code view shows it. Azure runs the policy about once a day, and after you create or change a policy it can take up to 24 hours before actions start, so do not expect blobs to move immediately in a lab.",
   "Design points: order actions so tiers only get cooler over time, remember minimum retention periods (moving from Cool to Archive before 30 days incurs early deletion charges), and use a separate rule with `version` or `snapshot` actions to clean up old versions if versioning is on, otherwise old versions keep costing money."
  ],
  "terms": [
   [
    "Lifecycle management policy",
    "A set of JSON rules on a storage account that automatically tier or delete blobs based on conditions."
   ],
   [
    "prefixMatch",
    "A rule filter that limits a rule to blobs whose names start with a container name and optional path."
   ],
   [
    "daysAfterModificationGreaterThan",
    "A condition that triggers an action when a blob has not been modified for more than the given number of days."
   ],
   [
    "Last access time tracking",
    "An account setting that records blob reads so rules can act on days since last access."
   ]
  ],
  "example": "An IoT platform writes diagnostic files to a telemetry container. Engineers read them for a few weeks, auditors occasionally ask for older data, and nothing older than two years is needed. A lifecycle rule tiers telemetry blobs to Cool at 30 days, to Archive at 180 days and deletes them at 730 days, cutting storage cost without any scripts.",
  "tip": "Lifecycle rules act on age since modification, creation or last access; last-access rules need access tracking enabled. Changes can take up to 24 hours to apply, and versions and snapshots need their own actions.",
  "check": [
   [
    "You want blobs moved to Cool if nobody has read them for 60 days. What must be enabled?",
    "Last access time tracking on the storage account, then a rule with daysAfterLastAccessTimeGreaterThan 60."
   ],
   [
    "Which filter restricts a lifecycle rule to one container?",
    "prefixMatch with the container name (optionally followed by a path)."
   ],
   [
    "You created a lifecycle rule an hour ago and nothing has changed. Is something wrong?",
    "Not necessarily; policies run about once a day and can take up to 24 hours to take effect."
   ]
  ]
 },
 {
  "t": "Data protection: blob and container soft delete, versioning, snapshots, change feed",
  "body": [
   "Resource locks stop someone deleting a storage account, but they do nothing to protect the data inside it from an accidental delete, an overwrite by a buggy application or ransomware encrypting files. Blob Storage has its own data protection features, found under the account's Data management > Data protection blade. You usually combine several of them.",
   "Blob soft delete keeps deleted blobs, and blob snapshots, for a retention period you choose (from 1 to 365 days). During that time a deleted blob is hidden but can be restored with Undelete, in the portal by showing deleted blobs, or through the API. After the period ends it is permanently removed. Soft delete also protects against overwrites of snapshots. Container soft delete works the same way for whole containers: if someone deletes a container, you can restore it with all its blobs within the retention period. Neither protects against deleting the storage account itself; use a lock for that.",
   "Blob versioning automatically keeps the previous state of a blob every time it is overwritten or deleted. Each version has a version ID, the current version is the live blob, and you can promote any previous version back to current. Versioning is the strongest protection against accidental overwrites, and it is a prerequisite for object replication and point-in-time restore. Versions cost storage, so pair versioning with a lifecycle rule that deletes old versions after a while.",
   "A snapshot is a read-only copy of a blob at the moment you take it, created manually or by an application. Snapshots share unchanged data with the base blob, so you pay mainly for differences. The difference from versioning is control: snapshots only exist when someone creates them, whereas versioning captures every change automatically. Microsoft recommends versioning for new designs.",
   "The change feed is an ordered, durable log of every create, modify and delete event on blobs in the account, stored as blobs in a special container named `$blobchangefeed`. It is used for auditing, for rebuilding state in other systems, and as a prerequisite for object replication (on the source) and point-in-time restore. Point-in-time restore uses versioning, change feed and soft delete together to roll block blobs in chosen containers back to a state from a past date and time, such as just before a ransomware attack.",
   "For data that must not be changed at all, immutable storage adds WORM (write once, read many) policies: time-based retention or legal holds on containers or versions. In a lab, enable blob soft delete and versioning, upload a file, overwrite it and then delete it, and practise restoring both the previous version and the deleted blob."
  ],
  "terms": [
   [
    "Blob soft delete",
    "A setting that retains deleted blobs and snapshots for a set number of days so they can be undeleted."
   ],
   [
    "Container soft delete",
    "A setting that retains deleted containers and their contents for a set number of days."
   ],
   [
    "Blob versioning",
    "Automatic retention of a blob's previous state each time it is modified or deleted."
   ],
   [
    "Snapshot",
    "A manually created read-only point-in-time copy of a blob."
   ],
   [
    "Change feed",
    "A durable, ordered log of blob changes stored in the $blobchangefeed container."
   ]
  ],
  "example": "A developer's script accidentally overwrites 5,000 product images with blank files and then deletes a container of old catalogs. Because versioning, blob soft delete and container soft delete were enabled, the administrator restores the container within its retention period and promotes the previous version of each image, with no need to restore from backup.",
  "tip": "Soft delete protects against deletion; versioning protects against overwrites; snapshots are manual. Object replication and point-in-time restore both need versioning and change feed. None of these protect the storage account itself.",
  "check": [
   [
    "An application overwrites a blob with bad data. Which feature lets you recover the old content automatically, without anyone having taken a copy first?",
    "Blob versioning, which keeps the previous version on each overwrite."
   ],
   [
    "Which feature restores a deleted container with all its blobs?",
    "Container soft delete, within its retention period."
   ],
   [
    "What is the change feed used for?",
    "It records blob changes in order for auditing and processing, and it is required for object replication and point-in-time restore."
   ]
  ]
 },
 {
  "t": "Azure Files: create and configure file shares, snapshots, soft delete, and SMB port 445 considerations",
  "body": [
   "Azure Files provides fully managed file shares in the cloud that clients mount like a network drive, using SMB (Server Message Block) or, for premium shares, NFS (Network File System). Windows, Linux and macOS can all connect, and the shares can replace or extend on-premises file servers. Azure File Sync can cache a share on local Windows Servers for fast access in branch offices.",
   "You create a file share inside a storage account. A standard general-purpose v2 account hosts standard shares on hard-disk storage, with tiers such as transaction optimized, hot and cool that trade storage cost against transaction cost. A premium FileStorage account hosts premium shares on solid-state storage for low latency and high IOPS (input/output operations per second), and is the only option for NFS shares. Each share has a size quota or provisioned size, which in premium shares also determines performance. In the portal: storage account > File shares > + File share; with the CLI, `az storage share-rm create`.",
   "To mount a share on Windows, the portal's Connect button generates a script that essentially runs `net use Z: \\\\<account>.file.core.windows.net\\<share>` with credentials, either the storage account key or, better, identity-based authentication. On Linux you mount with the `cifs` file system type. The share's UNC path always uses the account's file endpoint.",
   "SMB uses TCP port 445. Clients outside Azure connect across the internet, and many internet service providers and corporate networks block outbound port 445 because of old SMB worms. If a mount fails from an office, test with PowerShell: `Test-NetConnection -ComputerName <account>.file.core.windows.net -Port 445`. If TcpTestSucceeded is false, options are to open the port on the firewall, connect over a site-to-site VPN, point-to-site VPN or ExpressRoute (usually with a private endpoint), or use Azure File Sync so users talk to a local server. Connections from outside the Azure region require SMB 3.x with encryption, so old SMB clients cannot connect across the internet.",
   "Share snapshots capture a read-only, point-in-time copy of an entire file share. They are incremental, so only changes since the previous snapshot use space. Users on Windows can open Previous Versions on a folder in the mounted share to restore files themselves. Azure Backup for Azure Files uses share snapshots under the hood and adds scheduling and retention.",
   "Soft delete for file shares keeps a deleted share, including its snapshots, for a retention period you set, so you can undelete it from the File shares list with 'Show deleted shares'. It is enabled by default on new storage accounts. Soft delete works at the share level; to recover an individual file you use snapshots or backup."
  ],
  "terms": [
   [
    "Azure file share",
    "A managed SMB or NFS share hosted in a storage account that clients mount like a network drive."
   ],
   [
    "Share snapshot",
    "An incremental, read-only point-in-time copy of a whole file share."
   ],
   [
    "File share soft delete",
    "A setting that retains deleted file shares for a period so they can be undeleted."
   ],
   [
    "Port 445",
    "The TCP port SMB uses, often blocked by ISPs and firewalls, which prevents mounting Azure file shares from outside."
   ]
  ],
  "example": "Staff in a branch office cannot map a new Azure file share, although it works from an Azure VM. The administrator runs Test-NetConnection to the share's endpoint on port 445 from the office and sees it fail because the ISP blocks the port. The fix is to route access over the existing site-to-site VPN to a private endpoint for the storage account.",
  "tip": "If a share mounts from Azure VMs but not from on-premises, suspect blocked port 445 first. Soft delete protects whole shares; snapshots or Azure Backup restore individual files. NFS requires a premium account.",
  "check": [
   [
    "Which PowerShell command checks whether a client can reach an Azure file share over SMB?",
    "Test-NetConnection -ComputerName <account>.file.core.windows.net -Port 445."
   ],
   [
    "A user deletes one file from a share. Which feature lets them restore it themselves in Windows?",
    "Share snapshots, through the Previous Versions tab (Azure Backup also uses snapshots for this)."
   ],
   [
    "Which account type do you need for an NFS file share?",
    "A premium FileStorage account."
   ]
  ]
 },
 {
  "t": "ARM templates and Bicep files: interpret and modify, deploy, export a deployment as a template, convert ARM JSON to Bicep",
  "body": [
   "Infrastructure as code means describing Azure resources in files and letting Azure Resource Manager (ARM) create them, instead of clicking through the portal. The files are repeatable, reviewable and version-controlled. Azure's native formats are ARM templates, written in JSON, and Bicep, a simpler language that compiles to ARM JSON. The exam expects you to read both, change a value and deploy.",
   "An ARM template has a fixed structure: `$schema` and `contentVersion`, then `parameters` (values supplied at deployment time, such as a VM name), `variables` (values computed inside the template), `resources` (what to deploy, each with a `type`, `apiVersion`, `name`, `location` and `properties`), and `outputs` (values returned after deployment). Expressions in square brackets call template functions, for example `[resourceGroup().location]` or `[parameters('storageName')]`. `dependsOn` states ordering between resources.",
   "Bicep expresses the same things with less syntax. Here is a storage account with a parameter and an output:",
   "```bicep\nparam storageName string\nparam location string = resourceGroup().location\n\nresource sa 'Microsoft.Storage/storageAccounts@2023-01-01' = {\n  name: storageName\n  location: location\n  sku: { name: 'Standard_LRS' }\n  kind: 'StorageV2'\n}\n\noutput blobEndpoint string = sa.properties.primaryEndpoints.blob\n```",
   "Read it top down: `param` declares inputs (with an optional default), `resource` declares a resource with a symbolic name (`sa`), a type and API version, and `output` returns a value. Bicep works out dependencies automatically when one resource references another's symbolic name. To change the redundancy, you would edit `Standard_LRS` to `Standard_GRS`. Reusable pieces go in modules (`module net './network.bicep' = { ... }`). Parameter values can come from a parameters file (`.json` or `.bicepparam`) so the same template deploys dev and production with different values.",
   "You can get a template from existing resources. In the portal, a resource group or a resource has Export template under Automation, which generates a template of the current resources; a past deployment in the resource group's Deployments list also offers its original template. Exported templates are a starting point: they often hard-code values, include read-only properties and may not support every resource type, so you parameterize and clean them up before reusing them.",
   "Converting between formats is done with the Bicep CLI, included with the Azure CLI. `az bicep decompile --file main.json` converts an ARM JSON template to a Bicep file as a best effort, which you then review and fix any warnings. `az bicep build --file main.bicep` compiles Bicep to ARM JSON. You rarely need to build manually, because `az deployment group create` and `New-AzResourceGroupDeployment` accept `.bicep` files directly. The portal's Deploy a custom template page accepts ARM JSON and lets you edit it before deploying."
  ],
  "terms": [
   [
    "ARM template",
    "A JSON file that declares Azure resources, parameters, variables and outputs for Azure Resource Manager to deploy."
   ],
   [
    "Bicep",
    "A domain-specific language for Azure that compiles to ARM JSON with simpler syntax and automatic dependencies."
   ],
   [
    "Parameter",
    "A value supplied at deployment time so one template can be reused with different inputs."
   ],
   [
    "Decompile",
    "Converting an ARM JSON template to Bicep with az bicep decompile."
   ]
  ],
  "example": "An administrator built a working web app environment by hand in the portal and wants to recreate it for a test team. They use Export template on the resource group, decompile the JSON to Bicep, replace hard-coded names with parameters, and deploy it to a new resource group with a test parameters file.",
  "tip": "Know where values come from: parameters are supplied at deployment, variables are computed in the template, outputs are returned afterwards. az bicep decompile converts JSON to Bicep; az bicep build goes the other way.",
  "check": [
   [
    "Which template section would you edit so that the VM size can be chosen at deployment time?",
    "Add a parameter for the size in the parameters section (param in Bicep) and reference it in the VM resource."
   ],
   [
    "How do you convert an existing ARM JSON template to Bicep?",
    "Run az bicep decompile --file template.json and review the result."
   ],
   [
    "Where can you get a template of resources that were created manually in the portal?",
    "Export template on the resource group or resource (under Automation), then clean up and parameterize it."
   ]
  ]
 },
 {
  "t": "Deployment modes (incremental vs complete) and deploying with `az deployment group create` or `New-AzResourceGroupDeployment`",
  "body": [
   "When you deploy a template to a resource group, Azure Resource Manager compares what the template declares with what already exists. The deployment mode decides what happens to resources that are in the resource group but not in the template. This single setting can decide whether a deployment is safe or destroys production, so the exam tests it.",
   "Incremental mode is the default. Resources in the template are created if missing or updated to match the template if they exist. Resources that exist in the resource group but are not in the template are left alone. Note that for resources in the template, the properties you specify are applied as written, so a property you omit may be reset to its default rather than kept.",
   "Complete mode makes the resource group match the template exactly. Resources in the template are created or updated as in incremental mode, and any resource in the resource group that is not in the template is deleted. Complete mode only applies to resource group deployments. It is useful when a resource group is owned entirely by one template, but dangerous if other people also deploy resources there. A CanNotDelete lock on a resource prevents complete mode from deleting it, and the deployment fails. For new designs Microsoft recommends deployment stacks, which track the resources they manage, as a safer way to clean up removed resources.",
   "Before deploying, preview the changes with what-if. It lists resources that will be created, modified, deleted or ignored, without changing anything:",
   "```bash\n# Azure CLI: preview, then deploy in complete mode\naz deployment group what-if --resource-group rg-web --template-file main.bicep --parameters @prod.parameters.json --mode Complete\naz deployment group create  --resource-group rg-web --template-file main.bicep --parameters @prod.parameters.json --mode Complete\n\n# Azure PowerShell equivalent (incremental is the default if -Mode is omitted)\nNew-AzResourceGroupDeployment -ResourceGroupName rg-web -TemplateFile main.bicep -TemplateParameterFile prod.parameters.json -Mode Complete -WhatIf\nNew-AzResourceGroupDeployment -ResourceGroupName rg-web -TemplateFile main.bicep -TemplateParameterFile prod.parameters.json\n```",
   "Parameters can be passed inline (`--parameters storageName=stcontoso01` in the CLI, or as named arguments like `-storageName stcontoso01` in PowerShell) or from a parameters file. The resource group must exist first (`az group create` or `New-AzResourceGroup`). Other scopes use different commands: `az deployment sub create` or `New-AzSubscriptionDeployment` to deploy at subscription level (for example to create resource groups or assign policies), plus management group and tenant variants.",
   "Each deployment is recorded under the resource group's Deployments blade with its template, parameters, operations and any error. If a deployment fails, open that entry to see which resource failed and why, fix the template and redeploy. Because templates are idempotent, redeploying the same template in incremental mode brings resources back to the declared state without creating duplicates."
  ],
  "terms": [
   [
    "Incremental mode",
    "The default deployment mode that creates or updates template resources and leaves other resources in the group untouched."
   ],
   [
    "Complete mode",
    "A deployment mode that also deletes resources in the resource group that are not declared in the template."
   ],
   [
    "What-if",
    "A preview operation that shows what a deployment would create, change or delete without making changes."
   ],
   [
    "Idempotent",
    "Producing the same result no matter how many times it is run, which is how template deployments behave."
   ]
  ],
  "example": "A resource group contains a VM, a storage account and a key vault. A template that declares only the VM and storage account is deployed in complete mode. The what-if output lists the key vault as Delete, and the administrator stops, adds the key vault to the template, and only then runs az deployment group create.",
  "tip": "Incremental is the default and never deletes; complete deletes whatever is in the resource group but not in the template. Always run what-if before a complete-mode deployment.",
  "check": [
   [
    "A resource group has three resources and you deploy a template containing one of them in incremental mode. What happens to the other two?",
    "Nothing; incremental mode leaves resources not in the template unchanged."
   ],
   [
    "Which PowerShell parameter makes New-AzResourceGroupDeployment delete resources that are not in the template?",
    "-Mode Complete."
   ],
   [
    "How can you see the effect of a deployment before running it?",
    "Use what-if: az deployment group what-if, or New-AzResourceGroupDeployment with -WhatIf."
   ]
  ]
 },
 {
  "t": "Create virtual machines: images, sizes, OS and data disks, disk types (Standard HDD to Ultra), encryption at host and Azure Disk Encryption",
  "body": [
   "Azure Virtual Machines give you full control of an operating system in the cloud, which also means you are responsible for patching, configuring and securing it. Creating one involves a set of choices on the Create a virtual machine page: subscription and resource group, name, region and availability options, security type, image, size, administrator account, inbound ports, disks, networking and management settings.",
   "The image is the template for the OS disk. Azure Marketplace images include Windows Server, Windows client (for some uses), and Linux distributions such as Ubuntu, Red Hat Enterprise Linux and SUSE. You can also build your own generalized images and share them through an Azure Compute Gallery so teams deploy a standard, hardened build. The image also sets the generation (Gen 1 or Gen 2), and Gen 2 is needed for features such as Trusted Launch.",
   "The size sets the vCPUs, memory, temporary storage, maximum number of data disks and network bandwidth. Sizes are grouped by purpose: B-series burstable for light workloads, D-series general purpose, E-series memory optimized, F-series compute optimized, L-series storage optimized and N-series with GPUs (graphics processing units). Not every size is available in every region or zone, and your subscription has vCPU quotas per region and family.",
   "Every VM has an OS disk, and most sizes also include a temporary disk (drive D: on Windows) that lives on the host and is lost when the VM is deallocated or moved, so use it only for scratch data such as page files. Persistent application data goes on data disks, which are managed disks you attach and then initialize inside the OS. Managed disk types, from cheapest to fastest: Standard HDD for backups and non-critical data; Standard SSD for web servers and light production; Premium SSD for production and performance-sensitive workloads; Premium SSD v2 and Ultra Disk, where you set capacity, IOPS and throughput independently for the most demanding databases. Premium SSD v2 and Ultra Disk can only be data disks, not OS disks, and have regional and zone restrictions.",
   "Managed disks are always encrypted at rest by server-side encryption with platform-managed keys, and you can switch to customer-managed keys through a disk encryption set linked to Key Vault. Encryption at host goes further: data on the temporary disk and the OS and data disk caches is encrypted on the VM's host before it flows to storage, so the data is encrypted end to end. It must be registered as a feature for the subscription and enabled per VM.",
   "Azure Disk Encryption (ADE) encrypts inside the guest OS using BitLocker on Windows or DM-Crypt on Linux, with keys stored in Azure Key Vault. It was the traditional way to meet 'OS-level encryption' requirements. Microsoft has announced the retirement of ADE and recommends encryption at host for new deployments, and the two cannot be combined on one VM. Expect exam questions to contrast them: ADE works inside the OS with a key vault that must be enabled for disk encryption; encryption at host works at the platform level with no agent in the VM."
  ],
  "terms": [
   [
    "VM size",
    "The combination of vCPUs, memory, temporary storage and disk and network limits for a VM."
   ],
   [
    "Temporary disk",
    "Non-persistent local storage on the VM host that is lost when the VM is deallocated or moved."
   ],
   [
    "Ultra Disk",
    "The highest-performance managed disk type, with independently adjustable IOPS and throughput, usable only as a data disk."
   ],
   [
    "Encryption at host",
    "A platform feature that encrypts the temporary disk and disk caches on the host, providing end-to-end encryption."
   ],
   [
    "Azure Disk Encryption",
    "In-guest volume encryption using BitLocker or DM-Crypt with keys in Azure Key Vault."
   ]
  ],
  "example": "A team deploys a SQL Server VM. They choose an E-series memory-optimized size, a Premium SSD OS disk, Premium SSD v2 data disks for data and logs with IOPS set to match the workload, keep tempdb on the local temporary disk, and enable encryption at host with a customer-managed key in a disk encryption set to satisfy the security team.",
  "tip": "Ultra Disk and Premium SSD v2 cannot be OS disks. The temporary disk loses data on deallocation. Encryption at host is platform-level and needs no agent; ADE is in-guest with Key Vault and is being retired.",
  "check": [
   [
    "Which disk types can be used for a VM's OS disk?",
    "Standard HDD, Standard SSD and Premium SSD; Premium SSD v2 and Ultra Disk are data-disk only."
   ],
   [
    "A VM's application wrote files to drive D: and they disappeared after the VM was stopped and deallocated. Why?",
    "Drive D: on Azure Windows VMs is the temporary disk, which is not persistent."
   ],
   [
    "Which option encrypts a VM's temporary disk and caches without installing anything in the guest OS?",
    "Encryption at host."
   ]
  ]
 },
 {
  "t": "Resize VMs, move VMs between resource groups, subscriptions and regions, manage disks",
  "body": [
   "Workloads change after deployment, so administrators often resize VMs, relocate them and adjust disks. Knowing which of these need a restart or a deallocation, and which tools handle which kind of move, is what the exam tests.",
   "To resize, open the VM's Size blade, or run `az vm resize --size Standard_D4s_v5` or `Update-AzVM` after changing the size in the VM object. Resizing a running VM restarts it. The list of sizes shown depends on the hardware cluster currently hosting the VM. If the size you want is not listed, stop (deallocate) the VM first; then every size available in the region can be chosen, and Azure places the VM on suitable hardware when it starts. Resizing can change the number of data disks and NICs the VM supports, so check those limits when moving to a smaller size.",
   "Moving a VM to another resource group or subscription uses the ordinary resource move operation. Move the VM together with its dependent resources, such as its disks, network interfaces and public IP addresses, because they must end up in compatible locations. The VM does not change region, and the move does not stop it, but its resource ID changes. Both subscriptions must be in the same Microsoft Entra tenant, and some configurations, such as VMs with certain marketplace plans or reserved resources, have extra restrictions.",
   "Moving a VM to a different region is not a move operation; it is a relocation that creates a copy in the target region. Azure Resource Mover orchestrates moving VMs and related resources such as virtual networks, NSGs and load balancers across regions, checking dependencies and letting you prepare, move, then commit or discard. Azure Site Recovery can also replicate a VM to another region and fail it over permanently. Either way, you should expect new IP addresses and some downtime at cutover.",
   "Managing disks: you can attach new or existing data disks on the VM's Disks blade while the VM runs, then initialize and format them in the OS (Disk Management on Windows, or partition and mount on Linux). You can increase a disk's size but never shrink it; depending on disk type and configuration an expansion may need the VM deallocated, and after expanding you extend the partition inside the OS. Changing a disk's type, such as Standard SSD to Premium SSD, is typically done with the VM deallocated or the disk detached. The VM size must support Premium storage (sizes with an 's' in the name) to use Premium disks.",
   "Disk snapshots capture a full or incremental copy of a managed disk at a point in time, useful before risky changes or to create a new disk. Detaching a data disk keeps the disk and its data as a separate resource, and deleting the VM does not necessarily delete its disks, so look for orphaned unattached disks, which still cost money."
  ],
  "terms": [
   [
    "Deallocate",
    "Stopping a VM so it releases its host hardware and stops compute billing, allowing it to be placed on different hardware."
   ],
   [
    "Azure Resource Mover",
    "A service that moves VMs and related resources between Azure regions with dependency checks and commit steps."
   ],
   [
    "Disk snapshot",
    "A point-in-time copy of a managed disk, which can be incremental."
   ],
   [
    "Unattached disk",
    "A managed disk not connected to any VM, which still incurs storage cost."
   ]
  ],
  "example": "A reporting VM needs more memory for month-end jobs. The desired E-series size is not in the list, so the administrator deallocates the VM during a maintenance window, selects the new size and starts it again. Later, the business wants the VM in another region, so the administrator uses Azure Resource Mover to move it together with its virtual network and network security group.",
  "tip": "If a size is missing from the resize list, deallocate the VM first. Moving between resource groups or subscriptions never changes a VM's region; use Resource Mover or Site Recovery for regions. Disks can grow, not shrink.",
  "check": [
   [
    "You want to resize a VM, but the size is not available in the list. What should you do?",
    "Stop (deallocate) the VM, then choose from all sizes available in the region."
   ],
   [
    "Which service moves a VM and its network resources to another Azure region?",
    "Azure Resource Mover (Azure Site Recovery can also be used)."
   ],
   [
    "Can you reduce a managed data disk from 256 GiB to 128 GiB?",
    "No. Managed disks can be expanded but not shrunk; you would copy the data to a new, smaller disk."
   ]
  ]
 },
 {
  "t": "Availability sets (fault and update domains) vs availability zones and their SLAs",
  "body": [
   "A single VM will eventually be interrupted, by a hardware failure, a host update or a datacenter problem. Azure gives you two ways to spread several VMs so one event cannot take them all down: availability sets within a datacenter, and availability zones across datacenters. Each comes with a different service level agreement (SLA), the uptime Microsoft commits to for VM connectivity.",
   "An availability set is a logical grouping of VMs that Azure spreads across fault domains and update domains. A fault domain is a group of hardware that shares a power source and network switch, similar to a rack; if it fails, only the VMs in that fault domain go down. Regions support up to three fault domains for availability sets (two in some regions). An update domain is a group of hosts that Azure may reboot at the same time during planned platform maintenance; only one update domain is rebooted at a time, and you can configure up to 20, with 5 as the default. VMs in the set are assigned to domains round robin, so with two web servers they land in different fault and update domains.",
   "An availability zone is a physically separate location within a region, with independent power, cooling and networking; regions that support zones have at least three. When you create a VM you can pin it to zone 1, 2 or 3 (a zonal deployment). Placing VMs in two or more zones protects against the failure of a whole datacenter, which an availability set cannot. Some services, such as zone-redundant storage, Standard load balancers and Standard public IPs, can be zone-redundant, spanning all zones automatically.",
   "The published VM SLAs map directly to these choices: 99.99 percent connectivity for two or more VMs deployed across two or more availability zones in the same region; 99.95 percent for two or more VMs in the same availability set; and 99.9 percent for a single VM when all its disks are Premium SSD, Premium SSD v2 or Ultra Disk (lower for standard disks). Higher tiers of protection require at least two instances, which is why you always pair them with a load balancer that sends traffic only to healthy VMs.",
   "Key rules for exam scenarios. A VM can be added to an availability set only when it is created; to move an existing VM into a set you must recreate it (keeping its disks). A VM cannot be in both an availability set and an availability zone. Availability sets are free; you pay only for the VMs. Zones are only available in some regions and for some sizes, so a requirement to survive a datacenter failure rules out regions without zones. For large, elastic groups, Virtual Machine Scale Sets in Flexible orchestration can spread instances across zones and fault domains for you."
  ],
  "terms": [
   [
    "Fault domain",
    "A group of hardware sharing power and network that can fail together, like a rack."
   ],
   [
    "Update domain",
    "A group of hosts that may be rebooted together during planned maintenance; only one is updated at a time."
   ],
   [
    "Availability set",
    "A grouping that spreads VMs across fault and update domains within one datacenter."
   ],
   [
    "Availability zone",
    "A physically separate datacenter location within a region with independent power, cooling and networking."
   ],
   [
    "SLA",
    "Service level agreement: Microsoft's committed uptime percentage for a configuration."
   ]
  ],
  "example": "An online shop runs two web VMs behind a load balancer. The business asks for protection against a full datacenter outage in the region. An availability set would only protect against rack and maintenance failures, so the administrator redeploys the VMs into zones 1 and 2 behind a zone-redundant Standard load balancer, moving the design to the 99.99 percent SLA.",
  "tip": "Datacenter failure = availability zones (99.99 percent); rack or maintenance protection = availability set (99.95 percent); single VM with premium disks = 99.9 percent. Availability sets are chosen at creation only.",
  "check": [
   [
    "What is the difference between a fault domain and an update domain?",
    "A fault domain is shared hardware that can fail together (unplanned); an update domain is a group rebooted together during planned maintenance."
   ],
   [
    "Can you add an existing running VM to an availability set?",
    "No. The set must be chosen at creation, so you would recreate the VM, for example from its existing disks."
   ],
   [
    "What SLA applies to two VMs in different availability zones?",
    "99.99 percent VM connectivity."
   ]
  ]
 },
 {
  "t": "Virtual Machine Scale Sets: orchestration modes, autoscale rules, scale-in",
  "body": [
   "A Virtual Machine Scale Set (VMSS) manages a group of load-balanced VMs as one resource. Instead of creating each VM by hand, you describe the model once (image, size, network, extensions) and tell the scale set how many instances to run. It can add and remove instances automatically based on demand, spread them across availability zones and fault domains, and roll out updates. Scale sets are the standard answer for stateless tiers such as web front ends and batch workers.",
   "Scale sets have two orchestration modes, chosen at creation. Uniform orchestration uses identical instances created from one model; you manage them mainly through the scale set's APIs, which suits large stateless workloads. Flexible orchestration, the recommended mode for new deployments, manages standard Azure VMs that you can also manage individually with normal VM commands. It lets you mix VM sizes and Spot and regular capacity, spreads instances across fault domains and zones for high availability, and can even take VMs added manually. If an exam question requires mixing sizes or treating instances as ordinary VMs, the answer is Flexible.",
   "Autoscale is configured on the scale set's Scaling blade, using Azure Monitor autoscale. You set a minimum, maximum and default instance count, then add rules. A scale-out rule might say: when average CPU percentage across instances is greater than 70 percent over 10 minutes, increase the count by 2. A scale-in rule is the mirror: when average CPU is below 30 percent over 10 minutes, decrease the count by 1. Each rule has a cool down period during which no further scaling happens, so the metric can settle. Always create scale-in rules alongside scale-out rules; otherwise the set grows and never shrinks. Schedule-based profiles change the limits at set times, for example a higher minimum during business hours, and predictive autoscale can scale ahead of recurring load patterns.",
   "Autoscale uses the minimum as a floor even if rules say otherwise, and the default count is used when metrics are not available. Rules can use host metrics such as CPU, network and disk, or guest metrics and Application Insights metrics.",
   "When scaling in, the scale-in policy decides which instances are removed. The Default policy first balances instances across availability zones and fault domains, then deletes the instance with the highest instance ID. NewestVM removes the most recently created instances first, and OldestVM removes the oldest, both still balancing across zones. Instance protection lets you mark a VM 'protect from scale-in' so autoscale never removes it, or 'protect from scale set actions' so it is also excluded from upgrades and other scale set operations.",
   "The upgrade policy controls how changes to the model reach existing instances: Manual (you update instances yourself), Automatic (all instances updated in no guaranteed order, with possible downtime) or Rolling (batches, with health checks between them). Pair a scale set with a load balancer or Application Gateway and a health probe or the Application Health extension so traffic only reaches healthy instances."
  ],
  "terms": [
   [
    "Virtual Machine Scale Set",
    "A resource that deploys and manages a group of load-balanced VMs from a common model, with automatic scaling."
   ],
   [
    "Flexible orchestration",
    "The recommended scale set mode that manages standard VMs, allows mixed sizes and spreads instances across fault domains and zones."
   ],
   [
    "Autoscale rule",
    "A condition on a metric, over a time window, that adds or removes instances by a count or percentage."
   ],
   [
    "Scale-in policy",
    "The rule (Default, NewestVM or OldestVM) that decides which instances are deleted when scaling in."
   ],
   [
    "Instance protection",
    "A setting that excludes a specific instance from scale-in or from all scale set actions."
   ]
  ],
  "example": "A ticketing site sees heavy traffic when sales open. The administrator creates a Flexible scale set across three zones with minimum 2, maximum 20 instances, a rule to add 3 instances when average CPU exceeds 70 percent for 5 minutes, a rule to remove 1 when it drops below 25 percent for 15 minutes, and a schedule profile that raises the minimum to 8 on sale days.",
  "tip": "Always pair scale-out with scale-in rules. The Default scale-in policy balances zones and fault domains, then removes the highest instance ID; use instance protection to keep a specific VM. Mixed VM sizes require Flexible orchestration.",
  "check": [
   [
    "A scale set scales out under load but never scales back in. What is the likely cause?",
    "There is no scale-in rule (or its threshold is never met); autoscale needs an explicit rule to decrease the count."
   ],
   [
    "Which instance is removed first under the Default scale-in policy in a single-zone set with balanced fault domains?",
    "The instance with the highest instance ID, after balancing across fault domains."
   ],
   [
    "How do you stop autoscale from removing one VM that holds debugging data?",
    "Enable instance protection 'protect from scale-in' on that instance."
   ]
  ]
 },
 {
  "t": "Azure Container Registry tiers and image management",
  "body": [
   "A container image packages an application with everything it needs to run. Azure Container Registry (ACR) is a private registry for storing those images and related artifacts, such as Helm charts, close to where you run them: Azure Container Instances, Container Apps, App Service or Azure Kubernetes Service. It is the Azure equivalent of a private Docker Hub.",
   "ACR comes in three service tiers, and all offer the same core API. Basic is the entry point for development and learning, with the lowest included storage and throughput. Standard increases storage and throughput for most production workloads. Premium adds the enterprise features: geo-replication (one registry replicated to several regions so pulls are local and survive a regional outage), private endpoints through Private Link and network firewall rules, zone redundancy, customer-managed keys for encryption, higher throughput, connected registries and retention policies for untagged manifests. If a scenario mentions geo-replication or private endpoints for a registry, the answer is Premium. You can change tiers later.",
   "Each registry has a login server name like `contosoacr.azurecr.io`, and images are referenced as `loginserver/repository:tag`. A typical manual workflow with the Docker CLI:",
   "```bash\naz acr login --name contosoacr\ndocker tag webapp:1.0 contosoacr.azurecr.io/shop/webapp:1.0\ndocker push contosoacr.azurecr.io/shop/webapp:1.0\naz acr repository list --name contosoacr --output table\n```",
   "You do not even need Docker locally: ACR Tasks can build an image in Azure from a Dockerfile with `az acr build --registry contosoacr --image shop/webapp:1.1 .`, and tasks can rebuild automatically on source code commits or when a base image is updated, which helps keep images patched. `az acr import` copies images from another registry, such as a public one, without pulling them to your machine.",
   "Authentication options: individual Entra sign-in with `az acr login`; service principals and managed identities with RBAC roles such as AcrPull (pull only) and AcrPush (pull and push); repository-scoped tokens for limited access; and the admin user, a single shared username and password that is disabled by default and should stay that way except for quick tests. For a service pulling images, give its managed identity AcrPull on the registry.",
   "Image management keeps the registry tidy and cheap. Tags such as `latest` can be moved, so production deployments should use specific version tags or image digests. Untagged manifests accumulate when tags are overwritten; you can delete them with `az acr repository delete` or `az acr run` with the purge command on a schedule, and Premium registries can apply a retention policy for untagged manifests. You can also lock an image or tag to prevent deletion or overwrite."
  ],
  "terms": [
   [
    "Azure Container Registry",
    "A managed private registry for container images and related artifacts."
   ],
   [
    "Geo-replication",
    "A Premium ACR feature that replicates a registry to multiple regions for local pulls and resilience."
   ],
   [
    "AcrPull",
    "A built-in role that allows pulling images from a registry, typically assigned to a managed identity."
   ],
   [
    "ACR Tasks",
    "A registry feature that builds and patches container images in Azure, triggered manually, by commits or by base image updates."
   ]
  ],
  "example": "A company runs containers in West Europe and Southeast Asia and must keep the registry reachable only from its virtual networks. It upgrades its registry to Premium, adds a geo-replica in Southeast Asia, creates private endpoints in both regions and disables public access. Container Apps in each region pull images through their managed identities, which have the AcrPull role.",
  "tip": "Geo-replication, private endpoints and customer-managed keys point to the Premium tier. Use AcrPull for identities that only pull, and keep the admin user disabled.",
  "check": [
   [
    "Which ACR tier do you need to replicate one registry to several regions?",
    "Premium."
   ],
   [
    "An App Service app must pull images from ACR with least privilege. What do you configure?",
    "A managed identity for the app with the AcrPull role on the registry."
   ],
   [
    "How can you build an image from a Dockerfile without Docker installed on your workstation?",
    "Use ACR Tasks, for example az acr build, which builds the image in Azure and pushes it to the registry."
   ]
  ]
 },
 {
  "t": "Azure Container Instances (container groups, restart policies) and Azure Container Apps (revisions, ingress, scale rules)",
  "body": [
   "Azure offers several ways to run containers without managing VMs. Two are in scope for this exam: Azure Container Instances (ACI) for running containers quickly and simply, and Azure Container Apps for running microservices and web apps with scaling, revisions and ingress. Neither requires you to operate a Kubernetes cluster.",
   "ACI starts a container in seconds and bills per second for the vCPU and memory it uses. The unit of deployment is a container group: one or more containers that are scheduled on the same host and share a lifecycle, a local network (they reach each other on localhost), an optional public IP address with a DNS name label, and mounted volumes such as an Azure file share. It is similar to a Kubernetes pod. Multi-container groups are supported for Linux containers and are usually deployed from a YAML file or ARM template, for example an app container plus a logging sidecar. A container group can also be deployed into a virtual network subnet for private access.",
   "ACI restart policies control what happens when a container exits. Always (the default) restarts the containers whenever they stop, which suits long-running services. OnFailure restarts only if the process exits with an error, which suits jobs that should retry. Never runs the containers once, which suits one-off tasks such as a build or data transformation. If you run a batch job with Always, it restarts endlessly and keeps billing.",
   "Azure Container Apps is a serverless platform built on Kubernetes and open-source components such as KEDA (Kubernetes Event-driven Autoscaling), Dapr and Envoy, with the complexity hidden. Apps run in a Container Apps environment, which provides a shared network boundary and log destination for a set of apps. You configure the image, CPU and memory, secrets, environment variables and how the app scales and receives traffic.",
   "A revision is an immutable snapshot of a container app version. Changing revision-scoped settings, such as the image or scale rules, creates a new revision; changing application-scoped settings, such as secrets or ingress, does not. In single revision mode, the new revision replaces the old one. In multiple revision mode, several revisions run at once and you split traffic by percentage between them, for blue-green or canary releases, and roll back by moving traffic.",
   "Ingress controls how traffic reaches the app. It can be disabled, internal (reachable only within the environment or its virtual network) or external (reachable from the internet), for HTTP or TCP, on a target port you specify. Scale rules define how many replicas run between a minimum and maximum: HTTP rules scale on concurrent requests, TCP rules on connections, and custom rules use KEDA scalers such as queue length in Azure Service Bus or Storage queues. With a minimum of zero replicas, an app scales to zero when idle and you pay nothing for compute until traffic arrives."
  ],
  "terms": [
   [
    "Container group",
    "An ACI deployment of one or more containers that share a host, lifecycle, network and volumes."
   ],
   [
    "Restart policy",
    "The ACI setting Always, OnFailure or Never that decides whether containers restart after exiting."
   ],
   [
    "Revision",
    "An immutable snapshot of a Container Apps version, created when revision-scoped settings change."
   ],
   [
    "Ingress",
    "The Container Apps setting that exposes an app internally or externally over HTTP or TCP."
   ],
   [
    "Scale rule",
    "A Container Apps rule based on HTTP, TCP or KEDA event sources that sets the number of replicas."
   ]
  ],
  "example": "A nightly job converts invoices to PDF and must run once and stop. The administrator deploys it to ACI with restart policy Never. The customer portal, by contrast, runs on Container Apps with external HTTPS ingress, an HTTP scale rule from 0 to 10 replicas, and multiple revision mode so a new version can receive 10 percent of traffic before full rollout.",
  "tip": "Batch jobs in ACI should use Never or OnFailure, not the default Always. In Container Apps, traffic splitting needs multiple revision mode, and a minimum replica count of zero allows scale to zero.",
  "check": [
   [
    "Two containers must share localhost networking and a volume in ACI. What do you deploy?",
    "A multi-container group (Linux), usually from a YAML file or ARM template."
   ],
   [
    "You want to send 20 percent of traffic to a new version of a container app. What is required?",
    "Multiple revision mode, with traffic weights set between the old and new revisions."
   ],
   [
    "A container app should only be reachable by other apps in its environment. How do you set ingress?",
    "Enable ingress with internal visibility (not external)."
   ]
  ]
 },
 {
  "t": "App Service plans: tiers, scaling up vs scaling out, autoscale",
  "body": [
   "Azure App Service hosts web apps, REST APIs and mobile back ends without you managing servers. Every app runs in an App Service plan, which defines the compute resources: region, operating system, pricing tier, instance size and number of instances. All apps in the same plan share those instances, so a busy app can slow its neighbours, and you pay for the plan whether one app or ten run on it.",
   "Pricing tiers fall into groups. Free and Shared run your app on infrastructure shared with other customers, with CPU quotas, no scale-out and limited features; they are for trying things out. Basic provides dedicated instances with manual scale-out, suitable for low-traffic apps and development. Standard adds autoscale, deployment slots, daily backups and traffic manager integration, the usual starting point for production. Premium (current generations are Premium v3 and higher) adds faster hardware, more instances and slots, and automatic scaling managed by the platform. Isolated (App Service Environment) runs your apps on dedicated infrastructure inside your own virtual network for maximum isolation and scale. Exact instance limits and slot counts differ per tier and change over time, so learn the order of features rather than numbers.",
   "Scaling up (vertical scaling) means changing the plan to a higher tier or a larger instance size: more CPU, memory and disk per instance, plus the features of that tier. You do it on the plan's Scale up blade, and it takes effect quickly without redeploying the app. Scaling up is how you get access to a feature such as deployment slots or autoscale.",
   "Scaling out (horizontal scaling) means increasing the number of instances running your apps, with the built-in load balancer spreading requests across them. On Basic you set the count manually. On Standard and above you can configure rule-based autoscale on the plan's Scale out blade, which uses the same Azure Monitor autoscale engine as scale sets: a default profile with minimum, maximum and default instance counts, metric rules such as 'CPU percentage above 70 over 10 minutes, increase by 1' with a matching scale-in rule, and schedule-based profiles. Premium plans also offer automatic scaling, where the platform adds instances based on HTTP traffic without rules.",
   "Choosing correctly on exam questions: slow responses because each instance is overloaded on memory might call for scaling up; more total users call for scaling out; a missing feature calls for scaling up to the tier that includes it. Because all apps share the plan, move a resource-hungry app to its own plan so it can scale independently. Moving an app between plans is possible in the same resource group and region (the same deployment unit), otherwise you clone or redeploy it."
  ],
  "terms": [
   [
    "App Service plan",
    "The set of compute resources (region, OS, tier, size, instance count) that one or more App Service apps run on."
   ],
   [
    "Scale up",
    "Moving to a higher tier or larger instance size for more resources and features per instance."
   ],
   [
    "Scale out",
    "Increasing the number of instances that run the apps in a plan."
   ],
   [
    "Autoscale",
    "Rule-based or scheduled automatic adjustment of instance count, available in Standard and higher tiers."
   ]
  ],
  "example": "A marketing site on a Basic plan crashes under campaign traffic, and the team wants it to grow automatically. The administrator scales up the plan to Standard to unlock autoscale, then configures a scale-out rule at 70 percent CPU and a scale-in rule at 30 percent, with a minimum of 2 and a maximum of 8 instances.",
  "tip": "Scale up for more power or features; scale out for more instances. Rule-based autoscale needs Standard or higher, and deployment slots also start at Standard. All apps in a plan share and scale together.",
  "check": [
   [
    "An app on the Basic tier needs deployment slots and autoscale. What must you do?",
    "Scale up the plan to Standard or higher."
   ],
   [
    "Traffic doubles every afternoon, but each instance is comfortably sized. Scale up or scale out?",
    "Scale out, ideally with autoscale rules or a schedule, to add instances during the busy period."
   ],
   [
    "Two apps share a plan, and one uses most of the CPU. How do you let each scale independently?",
    "Move the busy app to its own App Service plan."
   ]
  ]
 },
 {
  "t": "App Service: TLS certificates, custom DNS names, backups, networking (VNet integration, private endpoints) and deployment slots",
  "body": [
   "Every App Service app gets a default host name, `<app-name>.azurewebsites.net`, with HTTPS already working through a Microsoft certificate. Production apps usually need a custom domain, their own TLS (Transport Layer Security) certificate, backups, private networking and a safe way to release updates. These settings are all on the app's blades in the portal.",
   "To add a custom domain, go to Custom domains > Add custom domain. App Service asks you to prove you own the domain with a TXT record named `asuid.<subdomain>` containing the app's domain verification ID, and to map the name: a CNAME record pointing `www` to `<app-name>.azurewebsites.net`, or, for a root (apex) domain like `contoso.com`, an A record pointing to the app's IP address. After validation the name is added to the app. Custom domains are not available on the Free tier.",
   "For HTTPS on the custom name, bind a certificate. Options include a free App Service managed certificate (for non-wildcard custom domains, automatically renewed), an App Service certificate you buy through Azure, a certificate imported from Azure Key Vault, or an uploaded private certificate file (`.pfx`). Bindings are usually SNI (Server Name Indication) SSL, which lets many certificates share an IP address; IP-based SSL gives a dedicated address. Turn on 'HTTPS Only' so HTTP requests redirect to HTTPS, and set the minimum TLS version.",
   "Backups copy the app's content and configuration, and optionally a connected database. In supported tiers the platform takes automatic backups; custom backups let you set your own schedule, retention and a storage account destination, and you can restore to the same app, a different app or a deployment slot. Backups are not a replacement for source control, but they help recover from a bad change.",
   "Networking has two directions, and the exam checks you do not mix them up. Inbound: a private endpoint gives the app a private IP address in your virtual network, so clients reach it privately, and you can then disable public access; access restrictions provide IP- or service-endpoint-based allow and deny rules. Outbound: VNet integration lets the app call resources inside a virtual network, such as a database with a private IP, through a dedicated, delegated subnet. VNet integration does not make the app privately reachable; a private endpoint does not let the app reach into the network.",
   "Deployment slots (Standard tier and above) are live apps with their own host names, such as `<app-name>-staging.azurewebsites.net`. You deploy to the staging slot, test it and warm it up, then swap it with production; the swap switches routing without downtime, and swapping back is an instant rollback. App settings and connection strings move with the code during a swap unless you mark them as 'deployment slot setting' (sticky), which keeps them with the slot, for example a staging database connection string. You can also route a percentage of production traffic to a slot for testing, and enable auto swap after deployment."
  ],
  "terms": [
   [
    "Custom domain verification",
    "Proving domain ownership to App Service with an asuid TXT record before mapping a CNAME or A record."
   ],
   [
    "App Service managed certificate",
    "A free, automatically renewed TLS certificate for a non-wildcard custom domain on an app."
   ],
   [
    "VNet integration",
    "An outbound feature that lets an app reach resources inside a virtual network through a delegated subnet."
   ],
   [
    "Private endpoint (App Service)",
    "An inbound feature that gives the app a private IP in a virtual network so clients can reach it privately."
   ],
   [
    "Deployment slot setting",
    "A sticky app setting or connection string that stays with its slot during a swap."
   ]
  ],
  "example": "A team deploys version 2 of an API to the staging slot, which has a sticky connection string pointing to a test database. After smoke tests pass, they swap staging into production; the new code now uses production's sticky connection string. When a bug appears an hour later, they swap again to roll back instantly.",
  "tip": "VNet integration is outbound only; a private endpoint is inbound only. Slot swaps move settings unless they are marked as deployment slot settings. Root domains use an A record; subdomains typically a CNAME, both with an asuid TXT record for verification.",
  "check": [
   [
    "An app must call a SQL Server VM that has only a private IP in a virtual network. Which feature?",
    "VNet integration, which provides outbound access from the app into the virtual network."
   ],
   [
    "After a slot swap, production is using the staging database. What went wrong?",
    "The connection string was not marked as a deployment slot setting, so it swapped along with the code."
   ],
   [
    "Which DNS records do you need to map www.contoso.com to an app?",
    "A CNAME from www to the app's azurewebsites.net name and a TXT record asuid.www with the verification ID."
   ]
  ]
 },
 {
  "t": "Virtual networks and subnets: address space planning, the 5 reserved IPs per subnet",
  "body": [
   "An Azure virtual network (VNet) is your private network in the cloud. Resources such as VMs, private endpoints and internal load balancers get private IP addresses from it and can talk to each other, to the internet (outbound by default) and, through peering or VPN, to other networks. A VNet belongs to one region and one subscription, and it automatically spans all availability zones in that region.",
   "When you create a VNet you give it one or more address spaces in CIDR (Classless Inter-Domain Routing) notation, normally from the private ranges defined in RFC 1918: 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16. The most important planning rule is to avoid overlap. Two VNets with overlapping address spaces cannot be peered, and a VNet that overlaps your on-premises network cannot be connected to it by VPN or ExpressRoute. Large organizations therefore keep an IP address plan and give each VNet its own non-overlapping block, with room to grow. You can add further address spaces to a VNet later.",
   "You divide the address space into subnets, for example 10.1.0.0/24 for web servers and 10.1.1.0/24 for databases. Subnets are where you apply network security groups, route tables, service endpoints and delegations, so group resources by the security and routing they need. Some services require a dedicated subnet with a specific name: `GatewaySubnet` for VPN and ExpressRoute gateways, `AzureBastionSubnet` for Azure Bastion and `AzureFirewallSubnet` for Azure Firewall. Others, such as App Service VNet integration, need a subnet delegated to them.",
   "Azure reserves five IP addresses in every subnet, and exam questions frequently ask how many usable addresses a subnet has. In 10.1.0.0/24 the reserved addresses are: 10.1.0.0, the network address; 10.1.0.1, reserved for the default gateway; 10.1.0.2 and 10.1.0.3, reserved to map Azure DNS IP addresses to the VNet; and 10.1.0.255, the network broadcast address. So a /24 subnet has 256 minus 5, or 251, usable addresses. The first address you can assign is x.x.x.4.",
   "The smallest supported IPv4 subnet is /29, which has 8 addresses minus the 5 reserved, leaving 3 usable. A /28 leaves 11, a /27 leaves 27 and a /26 leaves 59. Remember to size subnets for scale: a scale set or App Service integration may need many addresses, and some services recommend a minimum subnet size.",
   "You can create VNets in the portal, with `az network vnet create --address-prefixes 10.1.0.0/16 --subnet-name web --subnet-prefixes 10.1.0.0/24`, or in Bicep. Changing a subnet's range is only possible if no resources use addresses outside the new range, so plan generously from the start. By default, VMs in a VNet use Azure-provided DNS, reached at the virtual IP 168.63.129.16, unless you set custom DNS servers on the VNet."
  ],
  "terms": [
   [
    "Virtual network (VNet)",
    "A private, isolated network in one Azure region in which resources get private IP addresses."
   ],
   [
    "Address space",
    "The CIDR range or ranges assigned to a VNet, which must not overlap networks you want to connect to."
   ],
   [
    "Subnet",
    "A range within a VNet's address space where resources are placed and where NSGs and route tables are applied."
   ],
   [
    "Reserved addresses",
    "The five addresses Azure keeps in every subnet: network, default gateway, two for Azure DNS, and broadcast."
   ]
  ],
  "example": "An administrator must plan a subnet for 25 VMs and some room to grow. A /27 gives 32 addresses minus 5 reserved, 27 usable, which is too tight. They choose a /26 (59 usable) from a VNet address space of 10.20.0.0/16 that does not overlap the 10.0.0.0/16 range used on-premises, so a VPN can be added later.",
  "tip": "Usable addresses = total minus 5. The first usable address is .4. Overlapping address spaces block peering and VPN connections, and special services need specially named subnets.",
  "check": [
   [
    "How many usable IP addresses does a /28 subnet have in Azure?",
    "11: sixteen addresses minus the five Azure reserves."
   ],
   [
    "In subnet 192.168.5.0/24, which is the first address Azure can assign to a VM?",
    "192.168.5.4; .0 through .3 and .255 are reserved."
   ],
   [
    "Why can't VNet-A (10.0.0.0/16) be peered with VNet-B (10.0.128.0/17)?",
    "Their address spaces overlap, and peering requires non-overlapping ranges."
   ]
  ]
 },
 {
  "t": "Virtual network peering: non-transitive, gateway transit and use remote gateways, global peering",
  "body": [
   "Virtual network peering connects two VNets so resources in them communicate using private IP addresses, as if they were one network. Traffic travels over the Microsoft backbone, never the public internet, with low latency and no gateway in the path. Peering VNets in the same region is regional peering; peering VNets in different regions is global peering, which works the same way. VNets can be in different subscriptions, and even in different Microsoft Entra tenants with the right permissions.",
   "A peering is really two links, one from each side. In the portal, creating a peering on one VNet can create both links at once; with the CLI or PowerShell you create both yourself (`az network vnet peering create` on each side). The peering status shows Initiated when only one side exists and Connected when both do. The VNets must not have overlapping address spaces. Peering traffic is charged for data in and out, with higher rates for global peering.",
   "Peering is non-transitive. If VNet A is peered with VNet B, and B is peered with C, A cannot reach C through B. This is the most tested fact about peering. In a hub-and-spoke design, where spokes peer only with a central hub, spokes cannot talk to each other by default. To allow spoke-to-spoke traffic, you either peer the spokes directly, or route traffic through a network virtual appliance or Azure Firewall in the hub using user-defined routes, with 'Allow forwarded traffic' enabled on the peerings. Azure Virtual Network Manager and Azure Virtual WAN can also build connected topologies for you.",
   "Each peering link has settings. Allow access to the remote VNet (on by default) permits communication. Allow forwarded traffic accepts traffic that did not originate in the peer VNet, such as traffic routed through an appliance. Allow gateway transit, set on the hub side, lets peered VNets use the hub's VPN or ExpressRoute gateway. Use remote gateways, set on the spoke side, tells the spoke to use the peer's gateway instead of its own.",
   "Gateway transit is how a hub-and-spoke network shares one VPN gateway. The hub has the gateway and enables Allow gateway transit; each spoke enables Use remote gateways. Spokes can then reach on-premises through the hub gateway, and on-premises learns routes to the spokes. A spoke that already has its own gateway cannot use remote gateways, and a VNet can use remote gateways from only one peering. Gateway transit works with global peering as well as regional peering.",
   "Troubleshooting peering usually comes down to three checks: are both links Connected, do the address spaces overlap, and do network security groups or route tables block the traffic? Network Watcher's effective routes on a VM's NIC show whether a 'VNet peering' route to the remote address space exists."
  ],
  "terms": [
   [
    "VNet peering",
    "A private, backbone connection between two VNets that lets resources communicate by private IP."
   ],
   [
    "Global peering",
    "Peering between VNets in different Azure regions."
   ],
   [
    "Non-transitive",
    "The property that peering connects only the two VNets involved, not VNets peered to either of them."
   ],
   [
    "Gateway transit",
    "A peering option letting peered VNets use the hub VNet's VPN or ExpressRoute gateway, paired with Use remote gateways on the spoke."
   ]
  ],
  "example": "A company has a hub VNet with a VPN gateway to its headquarters and three spoke VNets for applications. The hub peerings allow gateway transit and each spoke uses remote gateways, so all spokes reach headquarters through one gateway. When Spoke1 needs to reach Spoke2, the administrator adds user-defined routes pointing through Azure Firewall in the hub, because peering is not transitive.",
  "tip": "Peering is non-transitive: A-B and B-C does not give A-C. Allow gateway transit goes on the VNet that has the gateway; Use remote gateways goes on the VNet that borrows it. Address spaces must not overlap.",
  "check": [
   [
    "Spoke1 and Spoke2 are each peered with Hub. Can a VM in Spoke1 reach a VM in Spoke2?",
    "Not by default, because peering is non-transitive; peer the spokes or route via an appliance in the hub."
   ],
   [
    "Which setting do you enable on a spoke so it uses the hub's VPN gateway?",
    "Use remote gateways (with Allow gateway transit enabled on the hub side)."
   ],
   [
    "A peering shows the status Initiated. What does that mean?",
    "Only one side of the peering has been created; create the link from the other VNet."
   ]
  ]
 },
 {
  "t": "Public IP addresses: Standard SKU, static allocation, zones",
  "body": [
   "A public IP address is a separate Azure resource that you associate with something that must be reachable from, or appear from, the internet: a VM's network interface, a public load balancer, a VPN gateway, Application Gateway, Azure Bastion, Azure Firewall or a NAT gateway. Because it is its own resource, you can keep the address when you delete or replace the resource it was attached to.",
   "Public IPs come in SKUs (stock-keeping units). Standard is the SKU to use. Microsoft has retired the older Basic SKU, so new designs, and exam answers, should assume Standard. Standard public IPs have three properties that matter. First, they always use static allocation: the address is assigned when you create the resource and does not change until you delete it. Second, they are secure by default: inbound traffic is blocked unless a network security group explicitly allows it. Third, they support availability zones. A Standard public IP must be paired with Standard SKU load balancers, and the SKUs of a load balancer and its public IP must match.",
   "Static versus dynamic allocation is a classic exam topic. With the old Basic SKU, a dynamic address was assigned when the resource started and could change when a VM was stopped and deallocated. A static address never changes, which is what you need for DNS records, firewall allow-lists and TLS certificates. Standard addresses are always static.",
   "Zone settings are chosen when you create the IP and cannot be changed later. A zone-redundant IP is served from all zones in the region and survives the failure of any single zone; this is the default in regions with zones. A zonal IP is pinned to one zone (1, 2 or 3) and fails if that zone does, which suits a zonal VM. No zone is the option for regions without zones. Match the IP to your design: a zone-redundant load balancer front end should use a zone-redundant public IP.",
   "Other properties you will see in the portal: IP version (IPv4 or IPv6), tier (Regional, or Global for a cross-region load balancer), an optional DNS name label that creates a name like `myapp.westeurope.cloudapp.azure.com`, routing preference (Microsoft network or internet) and idle timeout. A public IP prefix reserves a contiguous block of static public addresses, useful when partners must allow-list a predictable range.",
   "For outbound-only internet access from private VMs, a NAT gateway with a Standard public IP or prefix is the recommended approach, rather than giving each VM its own public IP. Fewer public IPs mean a smaller attack surface; administrators should reach VMs through Azure Bastion or VPN instead of public RDP or SSH."
  ],
  "terms": [
   [
    "Standard SKU public IP",
    "The current public IP SKU: always static, closed to inbound by default, and zone-aware."
   ],
   [
    "Static allocation",
    "An IP assignment that does not change for the life of the public IP resource."
   ],
   [
    "Zone-redundant IP",
    "A public IP served from all availability zones in a region, surviving a single zone failure."
   ],
   [
    "Public IP prefix",
    "A reserved contiguous range of static public IP addresses."
   ]
  ],
  "example": "A partner firewall only accepts traffic from a fixed address. The administrator creates a Standard, zone-redundant public IP, attaches it to a NAT gateway on the application subnet, and gives the partner that address. Because Standard IPs are static, VM restarts and scale events never change the source address the partner sees.",
  "tip": "Standard public IPs are always static, zone-aware and closed to inbound traffic until an NSG allows it. The zone choice is fixed at creation. Load balancer and public IP SKUs must match.",
  "check": [
   [
    "You associate a Standard public IP with a VM, but you cannot RDP to it. What is the likely cause?",
    "Standard public IPs are secure by default; an NSG must allow the inbound RDP traffic (better, use Bastion)."
   ],
   [
    "Can you change a zonal public IP to zone-redundant?",
    "No. The zone configuration is set at creation; create a new zone-redundant public IP."
   ],
   [
    "Which public IP setting ensures the address never changes when the VM is deallocated?",
    "Static allocation, which Standard SKU public IPs always use."
   ]
  ]
 },
 {
  "t": "User-defined routes: route tables, next hop types (virtual appliance, virtual network gateway, internet, none) and forced tunneling",
  "body": [
   "Azure routes traffic automatically with system routes, which you cannot delete. Each subnet gets a route for the VNet's own address space (next hop Virtual network), a default route 0.0.0.0/0 to the Internet, routes for peered VNets and routes learned from gateways. Certain private and reserved ranges not used in the VNet get next hop None, so traffic to them is dropped. This works well until you want traffic to go somewhere else, most often through a firewall.",
   "User-defined routes (UDRs) let you override system routes. You create a route table resource, add routes to it, and associate the route table with one or more subnets. A route table affects traffic leaving resources in the subnets it is associated with; it is never associated with a NIC or a whole VNet, and each subnet can have at most one route table. The route table must be in the same region and subscription as the VNet.",
   "Each route has an address prefix (destination) and a next hop type. Virtual appliance sends traffic to the private IP of a network virtual appliance (NVA) such as Azure Firewall or a third-party firewall VM; you must enter that next hop IP address. Virtual network gateway sends traffic to the VPN gateway, typically toward on-premises. Virtual network routes traffic within the VNet, useful to override a broader rule for a specific range. Internet sends traffic to the internet directly. None drops the traffic, a simple way to block a destination.",
   "When several routes match a destination, Azure picks the longest prefix match: a /24 route wins over a /16 route. If routes with the same prefix come from different sources, a UDR wins over a BGP (Border Gateway Protocol) route learned from a gateway, which wins over a system route. The route table also has a 'Propagate gateway routes' setting; turning it off stops routes learned by the VPN or ExpressRoute gateway from being added to the subnet.",
   "An NVA forwards traffic that is not addressed to itself, so on its network interface you must enable IP forwarding in Azure (and routing inside its OS). Forgetting this is a common reason traffic disappears after adding a UDR. A typical hub-and-spoke rule is a UDR on each spoke subnet: 0.0.0.0/0 next hop Virtual appliance 10.0.1.4 (the firewall), so all outbound and spoke-to-spoke traffic is inspected.",
   "Forced tunneling means sending all internet-bound traffic back to on-premises for inspection instead of letting it leave Azure directly. With a VPN gateway, you create a UDR for 0.0.0.0/0 with next hop Virtual network gateway (and configure the default site on the route-based gateway); with ExpressRoute, on-premises advertises a default route over BGP. Use Network Watcher's effective routes or next hop tool to confirm which route a VM's traffic actually takes."
  ],
  "terms": [
   [
    "System route",
    "A default route Azure creates automatically for each subnet, such as the VNet range and 0.0.0.0/0 to the internet."
   ],
   [
    "Route table",
    "A resource holding user-defined routes that is associated with subnets to control outbound traffic."
   ],
   [
    "Virtual appliance next hop",
    "A route next hop that forwards traffic to the private IP of a network virtual appliance such as a firewall."
   ],
   [
    "Forced tunneling",
    "Routing all internet-bound traffic back to on-premises through a VPN or ExpressRoute connection."
   ],
   [
    "IP forwarding",
    "A NIC setting that lets a VM forward traffic not addressed to it, required for NVAs."
   ]
  ],
  "example": "Security requires that all traffic from application subnets to the internet passes through Azure Firewall at 10.0.1.4. The administrator creates a route table with 0.0.0.0/0 next hop Virtual appliance 10.0.1.4 and associates it with each application subnet. A test with Network Watcher's next hop tool shows the firewall's IP as next hop for an internet destination.",
  "tip": "Route tables are associated with subnets, not NICs. The longest prefix wins; on a tie, UDR beats BGP beats system routes. Virtual appliance needs a next hop IP and IP forwarding on the NVA's NIC. None drops traffic.",
  "check": [
   [
    "Which next hop type drops traffic to a destination?",
    "None."
   ],
   [
    "A UDR sends traffic to a firewall VM, but traffic never arrives at its destination. What NIC setting should you check on the firewall VM?",
    "IP forwarding, which must be enabled for a VM to forward traffic not addressed to itself."
   ],
   [
    "How do you force all internet-bound traffic from Azure subnets back to on-premises over a site-to-site VPN?",
    "Add a UDR for 0.0.0.0/0 with next hop Virtual network gateway (forced tunneling), with a default site on the route-based VPN gateway."
   ]
  ]
 },
 {
  "t": "Network security groups and application security groups: rule priority, default rules, subnet vs NIC association, effective security rules",
  "body": [
   "A network security group (NSG) filters traffic to and from Azure resources in a virtual network with a list of allow and deny rules. Each rule matches on source, source port, destination, destination port and protocol (TCP, UDP, ICMP or any) and has a direction (inbound or outbound), an action and a priority. NSGs are stateful: if an inbound connection is allowed, the return traffic is allowed automatically without an outbound rule.",
   "Priority is a number from 100 to 4096. Rules are processed in order from the lowest number to the highest, and processing stops at the first rule that matches. So a Deny at priority 100 beats an Allow at 200 for the same traffic, and an Allow at 100 beats a Deny at 200. Leave gaps between priorities, such as 100, 200, 300, so you can insert rules later.",
   "Every NSG includes default rules with priorities 65000 and above, which you cannot delete but can override with lower-numbered rules. Inbound: AllowVnetInBound (65000) allows traffic from within the VNet and connected networks, AllowAzureLoadBalancerInBound (65001) allows Azure load balancer health probes, and DenyAllInBound (65500) blocks everything else, including the internet. Outbound: AllowVnetOutBound (65000), AllowInternetOutBound (65001) and DenyAllOutBound (65500). Source and destination can use service tags such as `VirtualNetwork`, `Internet`, `AzureLoadBalancer` or `Storage` instead of IP ranges, and Azure keeps their address lists up to date.",
   "You can associate an NSG with a subnet, with a network interface (NIC), or with both, and one NSG can be reused on many. When both exist, traffic must be allowed by both. For inbound traffic the subnet NSG is evaluated first, then the NIC NSG. For outbound traffic the NIC NSG is evaluated first, then the subnet NSG. If either denies, the traffic is dropped. Many teams apply NSGs to subnets only, for simplicity.",
   "Application security groups (ASGs) let you group NICs by role and use the group name in rules instead of IP addresses. You create ASGs such as `asg-web` and `asg-db`, assign each VM's NIC to the right ASG, then write a rule like 'allow TCP 1433 from asg-web to asg-db'. When you add a new web server, you only add its NIC to `asg-web`; no rule changes are needed. The NICs in an ASG must be in the same VNet.",
   "When traffic is blocked unexpectedly, look at effective security rules: on the VM's NIC, open Effective security rules (or use Network Watcher) to see the combined rules from both the subnet and NIC NSGs, including default rules and expanded service tags. Network Watcher's IP flow verify tells you exactly which rule allows or denies a specific packet."
  ],
  "terms": [
   [
    "Network security group (NSG)",
    "A stateful set of prioritized allow and deny rules that filters traffic for subnets and NICs."
   ],
   [
    "Priority",
    "A number from 100 to 4096; lower numbers are evaluated first and processing stops at the first match."
   ],
   [
    "Service tag",
    "A named group of IP prefixes for an Azure service or scope, such as Internet or Storage, maintained by Microsoft."
   ],
   [
    "Application security group (ASG)",
    "A named group of NICs that can be used as the source or destination in NSG rules."
   ],
   [
    "Effective security rules",
    "The combined rules from all NSGs applied to a NIC, as actually enforced."
   ]
  ],
  "example": "A three-tier app has web, app and database VMs in one subnet. The administrator creates ASGs asg-web, asg-app and asg-db, then an NSG with rules allowing 443 from Internet to asg-web (priority 100), 8080 from asg-web to asg-app (110), 1433 from asg-app to asg-db (120) and a Deny from VirtualNetwork to asg-db (200). Web servers cannot reach the database directly, and new VMs only need the right ASG.",
  "tip": "Lowest priority number wins and processing stops at the first match. Inbound: subnet NSG then NIC NSG; outbound: NIC then subnet; both must allow. The default DenyAllInBound blocks internet traffic unless you add an Allow.",
  "check": [
   [
    "Rule 100 denies TCP 3389 from Internet; rule 200 allows TCP 3389 from Internet. Is RDP allowed?",
    "No. Rule 100 matches first and processing stops."
   ],
   [
    "The subnet NSG allows port 80 inbound, but the NIC NSG has no rule for it. Is port 80 from the internet allowed?",
    "No. The NIC NSG's default DenyAllInBound blocks it; both NSGs must allow the traffic."
   ],
   [
    "How do you allow SQL traffic only from web servers without listing their IP addresses?",
    "Put the web server NICs in an application security group and use it as the source in the NSG rule."
   ]
  ]
 },
 {
  "t": "Azure Bastion: AzureBastionSubnet, SKUs, browser and native client access",
  "body": [
   "Opening RDP (Remote Desktop Protocol, port 3389) or SSH (Secure Shell, port 22) to the internet exposes VMs to constant scanning and password-guessing attacks. Azure Bastion is a managed service that lets you connect to your VMs over RDP and SSH without giving them public IP addresses. You connect to Bastion over TLS on port 443, from the Azure portal or a native client, and Bastion opens the RDP or SSH session to the VM's private IP inside the VNet.",
   "A dedicated Bastion deployment lives in its own subnet, which must be named exactly `AzureBastionSubnet` and be at least a /26. The Bastion host gets a Standard public IP address. You deploy it in a VNet, often a hub, and with the Basic SKU and above it can reach VMs in that VNet and in peered VNets, so one Bastion can serve a whole hub-and-spoke network. Target VMs need no public IP and no agent. NSGs on the VMs' subnets must allow RDP or SSH from the Bastion subnet's address range, and if you place an NSG on AzureBastionSubnet it must allow the specific inbound and outbound traffic Bastion needs.",
   "Bastion comes in several SKUs, and features grow with each. Developer is a free, lower-cost option for development and test that uses shared infrastructure, supports one connection at a time to VMs in the same VNet and does not need AzureBastionSubnet; it is only available in some regions. Basic is a dedicated deployment with portal-based RDP and SSH and a fixed capacity. Standard adds host scaling (you choose the number of instances for more concurrent sessions), native client support, IP-based connection (connect to a private IP, including on-premises machines reachable from the VNet), shareable links, custom ports and file transfer. Premium adds features such as session recording and private-only deployment without a public IP. You can upgrade a SKU, for example Basic to Standard, but not downgrade.",
   "Browser access is the simplest: open the VM in the portal, choose Connect > Bastion, enter credentials (a username and password, an SSH private key or a key stored in Key Vault), and the session opens in a browser tab. Copy and paste of text works; file transfer does not in the browser.",
   "Native client access (Standard and Premium) lets you use your local Remote Desktop client or SSH client, which supports features like file transfer and multiple monitors. You sign in with the Azure CLI and run commands such as `az network bastion rdp --name bas-hub --resource-group rg-hub --target-resource-id <vm-id>` or `az network bastion ssh ... --auth-type AAD`. Native client support must be enabled in the Bastion configuration first.",
   "For the exam, remember the subnet name and minimum size, that the VMs do not need public IPs, and which features require Standard or higher: native client, scaling, shareable links and IP-based connection."
  ],
  "terms": [
   [
    "Azure Bastion",
    "A managed service providing RDP and SSH access to VMs over TLS without exposing the VMs' ports or public IPs."
   ],
   [
    "AzureBastionSubnet",
    "The dedicated subnet, of at least /26, required for a Bastion deployment."
   ],
   [
    "Native client support",
    "A Standard or Premium Bastion feature that lets you connect with your local RDP or SSH client through the Azure CLI."
   ],
   [
    "Host scaling",
    "Adding Bastion instances in the Standard or Premium SKU to support more concurrent sessions."
   ]
  ],
  "example": "Auditors flag VMs with RDP open to the internet. The administrator removes the VMs' public IPs, deploys Azure Bastion Standard into a /26 AzureBastionSubnet in the hub VNet, enables native client support, and updates spoke NSGs to allow 3389 and 22 only from the Bastion subnet range. Admins now connect with az network bastion rdp from their laptops.",
  "tip": "The subnet must be named AzureBastionSubnet and be /26 or larger. Native client, host scaling, shareable links and IP-based connection need Standard or higher. VMs need no public IP.",
  "check": [
   [
    "What subnet name and minimum size does a dedicated Bastion deployment require?",
    "AzureBastionSubnet, at least /26."
   ],
   [
    "An admin wants to use their local RDP client with multiple monitors through Bastion. Which SKU and setting?",
    "Standard or Premium, with native client support enabled."
   ],
   [
    "Do the target VMs need a public IP address to be reached through Bastion?",
    "No. Bastion connects to their private IP addresses inside the VNet."
   ]
  ]
 },
 {
  "t": "Service endpoints vs private endpoints, and private DNS zones for private link",
  "body": [
   "Many Azure platform services, such as Azure Storage, Azure SQL Database and Key Vault, are reached by default through public endpoints on the internet. Two features let VNet resources reach them more securely: service endpoints and private endpoints. They sound alike but work very differently, and choosing between them is a frequent exam scenario.",
   "A service endpoint is a setting on a subnet, such as `Microsoft.Storage` or `Microsoft.Sql`. Once enabled, traffic from that subnet to the service travels over the Azure backbone and carries the subnet's identity. The service's firewall can then allow that specific subnet (a virtual network rule) and deny everything else. The service still uses its public IP address, and the VM keeps connecting to the public name. Service endpoints are free, quick to set up, only work for traffic originating in Azure subnets (not from on-premises over VPN), and allow access to every instance of that service type, unless you add a service endpoint policy (available for Storage) that limits which accounts can be reached.",
   "A private endpoint is a network interface placed in your subnet with a private IP address, connected through Azure Private Link to one specific resource, such as the blob service of one storage account or one SQL server. Clients connect to that private IP. Because it is a real address in your VNet, it is reachable from peered VNets and from on-premises over VPN or ExpressRoute, and you can then disable public network access on the resource entirely. Because it maps to one resource instance, it also helps prevent data exfiltration to other accounts. Private endpoints are billed per hour and per gigabyte processed.",
   "Private endpoints only work if clients resolve the service's normal name to the private IP. When you create a private endpoint, the public DNS name, such as `contoso.blob.core.windows.net`, gets a CNAME to a `privatelink` name, such as `contoso.privatelink.blob.core.windows.net`. You create an Azure private DNS zone with that privatelink name, link it to your VNets, and add an A record for the private IP. The portal does this for you when you choose 'Integrate with private DNS zone', by attaching a DNS zone group to the endpoint so records are maintained automatically. Examples: `privatelink.blob.core.windows.net` for blobs, `privatelink.file.core.windows.net` for files, `privatelink.database.windows.net` for Azure SQL, `privatelink.vaultcore.azure.net` for Key Vault.",
   "In a hub-and-spoke network, keep the privatelink zones in one place and link them to every VNet that needs resolution. On-premises DNS servers must forward queries for those zones into Azure, usually to an Azure DNS Private Resolver inbound endpoint, because on-premises machines cannot query Azure DNS at 168.63.129.16 directly. A classic symptom of broken DNS: `nslookup` returns a public IP instead of the private one, and the connection is refused because public access is disabled.",
   "Rule of thumb: service endpoint for a simple, free way to lock a service to Azure subnets; private endpoint when you need a private IP, on-premises access, per-resource scope or public access disabled."
  ],
  "terms": [
   [
    "Service endpoint",
    "A subnet setting that sends traffic to an Azure service over the backbone with the subnet's identity, while the service keeps its public IP."
   ],
   [
    "Private endpoint",
    "A NIC with a private IP in your VNet that connects to one specific resource through Private Link."
   ],
   [
    "Private DNS zone",
    "An Azure DNS zone resolvable only from linked VNets, used to map privatelink names to private IPs."
   ],
   [
    "Service endpoint policy",
    "A policy that restricts service endpoint traffic to specific Azure Storage accounts."
   ]
  ],
  "example": "A SQL database must be reachable only from an app subnet in Azure and from an on-premises reporting server over VPN, with public access disabled. A service endpoint cannot serve the on-premises server, so the administrator creates a private endpoint, integrates it with the privatelink.database.windows.net zone linked to the VNet, and configures on-premises DNS to forward that zone to a DNS Private Resolver inbound endpoint.",
  "tip": "On-premises access, disabling public access or scoping to one resource instance means private endpoint. If a private endpoint connection fails, check DNS first: the name must resolve to the private IP through a privatelink zone.",
  "check": [
   [
    "Which option gives an Azure SQL database a private IP address in your VNet?",
    "A private endpoint."
   ],
   [
    "After creating a private endpoint, a VM's nslookup still returns a public IP. What is missing?",
    "A private DNS zone (such as privatelink.database.windows.net) linked to the VM's VNet with an A record for the endpoint."
   ],
   [
    "Which is free and configured on a subnet: service endpoint or private endpoint?",
    "Service endpoint."
   ]
  ]
 },
 {
  "t": "Azure DNS: public zones, delegation, record sets, alias records; private DNS zones with auto-registration",
  "body": [
   "Azure DNS hosts DNS (Domain Name System) zones on Microsoft's global network of name servers, so you manage your records with the same tools, RBAC and templates as the rest of Azure. It does not register domain names for you; you buy a domain from a registrar and then host its zone in Azure DNS. There are two kinds of zones: public zones answer queries from the internet, and private zones answer only for virtual networks you link to them.",
   "Creating a public zone such as `contoso.com` gives it an SOA (start of authority) record and an NS record set listing four Azure name servers assigned to that zone, with names under `azure-dns.com`, `azure-dns.net`, `azure-dns.org` and `azure-dns.info`. The zone does nothing until you delegate the domain: at your registrar, replace the domain's name server entries with those four Azure name servers. After the change propagates, internet resolvers ask Azure DNS for your records. You can check with `nslookup -type=NS contoso.com`.",
   "Delegating a subdomain works the same way inside DNS. To host `dev.contoso.com` as its own zone, perhaps managed by another team, create the child zone, then in the parent `contoso.com` zone add an NS record set named `dev` containing the child zone's name servers.",
   "Records are organized in record sets: all records with the same name and type form one set, with a single TTL (time to live) that says how long resolvers may cache the answer. For example, the A record set `www` can contain several IP addresses. Supported types include A, AAAA, CNAME, MX, NS, PTR, SOA, SRV, TXT and CAA. A CNAME record set can contain only one record, and you cannot create a CNAME at the zone apex (`contoso.com` itself), which is a DNS standard rule.",
   "Alias records solve two problems. An alias record set of type A, AAAA or CNAME points to an Azure resource instead of a fixed value: a public IP address, a Traffic Manager profile, an Azure Front Door or CDN endpoint, or another record set in the same zone. When the resource's IP changes, the alias updates automatically, so you never have dangling records pointing to an old address. And because an A alias can sit at the apex, you can point `contoso.com` at a Traffic Manager profile or Front Door, which a CNAME cannot do.",
   "A private DNS zone, such as `corp.contoso.com`, works only inside Azure. You link it to VNets with virtual network links; VMs in linked VNets can resolve its records through Azure-provided DNS. When you create a link you can enable auto-registration, and Azure then automatically creates and removes A records for the VMs in that VNet as they are created, change IP or are deleted. A VNet can be linked to many private zones for resolution, but only one of them can have auto-registration enabled for that VNet. Private zones are also what makes private endpoints resolve to their private IPs."
  ],
  "terms": [
   [
    "DNS zone",
    "A container for the DNS records of a domain, hosted by Azure DNS as public or private."
   ],
   [
    "Delegation",
    "Pointing a domain or subdomain to the name servers that host its zone, using NS records at the registrar or in the parent zone."
   ],
   [
    "Record set",
    "All DNS records with the same name and type in a zone, sharing one TTL."
   ],
   [
    "Alias record",
    "An A, AAAA or CNAME record set that references an Azure resource and updates automatically when it changes."
   ],
   [
    "Auto-registration",
    "A private DNS zone link option that automatically maintains A records for VMs in the linked VNet."
   ]
  ],
  "example": "A company moves contoso.com to Azure DNS. The administrator creates the public zone, copies the four assigned Azure name servers into the registrar's settings, and adds an apex A alias record pointing to the public IP of an Application Gateway. For internal names, a private zone corp.contoso.com is linked to the hub VNet with auto-registration so every new VM gets a record automatically.",
  "tip": "A zone does nothing until the registrar's NS records point to Azure's name servers. Use an alias record for the zone apex and to track Azure resources. Only one auto-registration private zone per VNet.",
  "check": [
   [
    "You created a public zone in Azure DNS, but internet users still get old records. What step is missing?",
    "Delegation: update the domain's name servers at the registrar to the four Azure DNS name servers."
   ],
   [
    "How can you point contoso.com (the apex) at an Azure Front Door endpoint?",
    "Create an alias A record at the apex that references the Front Door resource; a CNAME is not allowed at the apex."
   ],
   [
    "How do VMs get DNS records in a private zone without manual work?",
    "Link the zone to their VNet with auto-registration enabled."
   ]
  ]
 },
 {
  "t": "Azure Load Balancer: public vs internal, Standard SKU, backend pools, health probes, load-balancing and inbound NAT rules",
  "body": [
   "Azure Load Balancer distributes incoming network traffic across a group of healthy VMs or scale set instances. It works at layer 4 of the OSI model, the transport layer, so it balances TCP and UDP flows based on IP addresses and ports, without looking at HTTP content. For URL-based routing or a web application firewall you would use Application Gateway, a layer 7 service, instead.",
   "A load balancer is public or internal according to its front-end IP configuration. A public load balancer has a public IP address as its front end and balances internet traffic to VMs, and it can also provide outbound internet connectivity for them. An internal load balancer has a private IP address from a subnet as its front end and balances traffic inside a VNet or from connected networks, for example between a web tier and an application tier.",
   "Use the Standard SKU. Microsoft has retired the Basic SKU, and Standard has the features the exam focuses on: it supports availability zones (zone-redundant or zonal front ends), has an SLA, supports larger backend pools, HTTPS health probes and HA ports, and is secure by default, meaning inbound traffic is blocked unless a network security group on the backend VMs' subnets or NICs allows it. A Standard load balancer must use Standard public IPs, and its backend pool members must be in one VNet.",
   "The main building blocks are these. The backend pool is the set of VM NICs or IP addresses that receive traffic. A health probe checks each backend on a protocol and port, TCP, HTTP or HTTPS, at an interval; an instance that fails is taken out of rotation until it passes again. HTTP probes expect a 200 response from a path such as `/health`. Probes come from the Azure platform address 168.63.129.16, which the default NSG rule AllowAzureLoadBalancerInBound permits, so do not block it.",
   "A load-balancing rule ties it together: front-end IP and port, back-end pool and port, protocol, health probe, and session persistence. By default the load balancer uses a five-tuple hash (source IP, source port, destination IP, destination port, protocol), so different connections from one client may land on different VMs. Session persistence set to Client IP or Client IP and protocol keeps a client on the same VM. On an internal Standard load balancer, an HA ports rule balances all ports and protocols at once, which is handy for network virtual appliances.",
   "An inbound NAT rule forwards traffic arriving at a specific front-end port to a specific VM and port, rather than balancing it. For example, front-end port 50001 to VM1 port 3389 and 50002 to VM2 port 3389 lets you reach each VM individually through the load balancer's single public IP. Outbound rules control how backend VMs share the front-end IPs for outbound internet access, although a NAT gateway is now the recommended way to provide outbound connectivity."
  ],
  "terms": [
   [
    "Public load balancer",
    "A load balancer with a public front-end IP that distributes internet traffic to backend VMs."
   ],
   [
    "Internal load balancer",
    "A load balancer with a private front-end IP that distributes traffic inside a VNet or connected networks."
   ],
   [
    "Health probe",
    "A periodic TCP, HTTP or HTTPS check that removes unhealthy backend instances from rotation."
   ],
   [
    "Load-balancing rule",
    "A mapping of a front-end IP and port to a backend pool and port, with a probe and session persistence setting."
   ],
   [
    "Inbound NAT rule",
    "A rule that forwards a specific front-end port to one specific backend VM and port."
   ]
  ],
  "example": "Three web VMs sit behind a public Standard load balancer. A rule maps port 443 on the front end to port 443 in the backend pool with an HTTPS probe on /health. When VM2's web service crashes, the probe fails and traffic goes only to VM1 and VM3. Because Standard is secure by default, the administrator also added an NSG rule allowing 443 from the Internet to the web subnet.",
  "tip": "Standard load balancers block inbound traffic until an NSG allows it. Load-balancing rules spread traffic; inbound NAT rules map a port to one VM. Layer 7 needs (URL paths, WAF) point to Application Gateway, not Load Balancer.",
  "check": [
   [
    "A new Standard load balancer is configured correctly, but clients cannot connect to backend VMs. What should you check first?",
    "That an NSG allows the inbound traffic, because Standard load balancers and public IPs are secure by default."
   ],
   [
    "How do you RDP to a specific VM in the backend pool through the load balancer's public IP?",
    "Create an inbound NAT rule mapping a front-end port (such as 50001) to that VM's port 3389 (or use Bastion instead)."
   ],
   [
    "Users lose their shopping cart because each request goes to a different VM. Which setting helps?",
    "Session persistence set to Client IP (or Client IP and protocol) on the load-balancing rule."
   ]
  ]
 },
 {
  "t": "Troubleshooting connectivity with Network Watcher: IP flow verify, next hop, connection troubleshoot, effective routes",
  "body": [
   "When a VM cannot reach something, the cause is usually one of three things: a network security group rule blocks the traffic, a route sends it somewhere unexpected, or the destination itself is not listening or is unreachable. Azure Network Watcher provides tools that test each possibility from the Azure platform's point of view. Network Watcher is enabled automatically per region when you create a VNet, and its tools are in the portal under Network Watcher or on a VM's Help and Connect troubleshoot blades.",
   "IP flow verify checks whether a specific packet would be allowed or denied to or from a VM. You specify the VM and NIC, direction (inbound or outbound), protocol (TCP or UDP), local IP and port, and remote IP and port. The result is Access allowed or Access denied, plus the name of the NSG rule that made the decision, such as `DenyAllInBound` or a custom rule. This is the fastest way to prove or rule out an NSG problem.",
   "Next hop tells you where Azure would send a packet from a VM to a destination IP. It returns the next hop type, such as Internet, VirtualNetwork, VirtualAppliance, VirtualNetworkGateway or None, the next hop IP address if there is one, and the ID of the route table containing the matching user-defined route. If traffic to the internet unexpectedly goes to a firewall, or to None, next hop shows it immediately.",
   "Effective routes, found on a VM's network interface (Help > Effective routes), list every route that applies to the NIC: system routes, routes from route tables (UDRs), routes learned over BGP from gateways, and peering routes, with their source, state and next hop. Where next hop answers 'where does this one packet go?', effective routes shows the whole routing table so you can spot an overly broad UDR or a missing peering route. Effective security rules is the matching view for combined NSG rules.",
   "Connection troubleshoot tests an actual connection from a source, such as a VM, a scale set instance or an Application Gateway, to a destination VM, FQDN, URI or IP address on a port. It reports whether the connection succeeded, latency, the hops along the path, and problems it found, such as an NSG denying the traffic, a route to None, or the destination port not responding. For VMs it relies on the Network Watcher agent VM extension, which the portal can install.",
   "A practical order when a VM cannot connect: run connection troubleshoot for an overall verdict; if it points to a rule, use IP flow verify to name the NSG rule; if it points to routing, use next hop and effective routes. If Azure's view says traffic is allowed and routed correctly, look inside the VM (firewall, service not running) or at the destination. Packet capture and NSG flow logs (or VNet flow logs) help for intermittent problems."
  ],
  "terms": [
   [
    "IP flow verify",
    "A Network Watcher tool that says whether a specific packet is allowed or denied and which NSG rule decided."
   ],
   [
    "Next hop",
    "A Network Watcher tool that shows the next hop type, IP and route table for traffic from a VM to a destination."
   ],
   [
    "Effective routes",
    "The complete set of system, user-defined, BGP and peering routes applied to a network interface."
   ],
   [
    "Connection troubleshoot",
    "A Network Watcher tool that tests an end-to-end connection and reports reachability, latency, hops and issues."
   ]
  ],
  "example": "A VM cannot reach a partner API at 203.0.113.10 on port 443. Connection troubleshoot reports the connection as unreachable. Next hop from the VM to that address returns VirtualAppliance 10.0.1.4 from route table rt-spokes, showing traffic goes to the firewall, where the administrator finds a missing allow rule for the partner address.",
  "tip": "Blocked by an NSG? IP flow verify names the rule. Wrong path? Next hop shows the next hop and route table; effective routes shows the full table. End-to-end test with latency and hops? Connection troubleshoot.",
  "check": [
   [
    "Which tool tells you the exact NSG rule denying RDP to a VM?",
    "IP flow verify."
   ],
   [
    "Which tool shows that traffic to the internet is being sent to a virtual appliance by a user-defined route?",
    "Next hop (effective routes on the NIC also shows the route)."
   ],
   [
    "What does connection troubleshoot need on a source VM?",
    "The Network Watcher agent VM extension."
   ]
  ]
 },
 {
  "t": "Azure Monitor metrics vs logs, and diagnostic settings that send resource logs to a Log Analytics workspace",
  "body": [
   "Azure Monitor is the platform service that collects, stores and analyzes telemetry from Azure resources, operating systems and applications. Almost everything it does rests on two kinds of data: metrics and logs. Knowing which is which, and what is collected automatically, answers a large share of monitoring questions.",
   "Metrics are numeric values sampled at regular intervals and stored as a time series, such as Percentage CPU for a VM, Transactions for a storage account or Data Path Availability for a load balancer. Platform metrics are collected automatically for Azure resources with no setup, are lightweight and near real time, which makes them ideal for charts and fast alerts. You explore them in Metrics explorer, choosing a resource, a metric, an aggregation (average, minimum, maximum, sum, count) and optionally splitting by a dimension. Platform metrics are kept for a limited period (93 days); send them to a workspace if you need longer retention or want to query them with other data.",
   "Logs are records of events or observations with many properties, such as a sign-in, an HTTP request, a Windows event or a performance counter reading with its computer name. They are stored in a Log Analytics workspace, where you query them with KQL (Kusto Query Language), correlate data from many sources and keep it for a configurable retention period. Logs are richer but take a little longer to arrive than metrics.",
   "Three log sources matter at the Azure level. The activity log records control-plane events for a subscription: who created, changed or deleted which resource and when, plus service health events. It is collected automatically and kept for 90 days in the portal. Resource logs record what happens inside a resource, such as Key Vault access requests, storage read and write operations or NSG events. They are not collected at all until you create a diagnostic setting. Guest OS logs and performance counters from inside VMs need the Azure Monitor Agent, covered separately.",
   "A diagnostic setting is configured per resource (Monitoring > Diagnostic settings). You pick the log categories or category groups (such as `allLogs` or `audit`) and optionally AllMetrics, then one or more destinations: a Log Analytics workspace for querying and alerting, a storage account for cheap long-term archival, an event hub for streaming to a third-party SIEM (security information and event management) system, or a partner solution. The activity log also has diagnostic settings at the subscription level so it can be sent to a workspace for longer retention and cross-subscription queries.",
   "Because each resource needs its own diagnostic setting, organizations use Azure Policy with the DeployIfNotExists effect, such as built-in definitions that configure diagnostic settings to a Log Analytics workspace, to create them automatically for every new resource."
  ],
  "terms": [
   [
    "Metrics",
    "Numeric time-series data sampled at regular intervals, collected automatically for Azure resources."
   ],
   [
    "Logs",
    "Event and observation records with many properties, stored in a Log Analytics workspace and queried with KQL."
   ],
   [
    "Activity log",
    "The subscription-level record of control-plane operations and service health events."
   ],
   [
    "Resource logs",
    "Logs of operations inside a resource, collected only when a diagnostic setting is configured."
   ],
   [
    "Diagnostic setting",
    "A per-resource configuration that sends selected logs and metrics to a workspace, storage account, event hub or partner."
   ]
  ],
  "example": "Security wants every Key Vault access recorded and searchable for a year. The administrator creates a Log Analytics workspace with one-year retention and assigns a DeployIfNotExists policy that adds a diagnostic setting sending the audit category of every Key Vault to that workspace, then runs a remediation task for existing vaults.",
  "tip": "Metrics and the activity log are automatic; resource logs require a diagnostic setting. Choose the destination by purpose: workspace to query and alert, storage account to archive cheaply, event hub to stream to external tools.",
  "check": [
   [
    "Storage account read operations do not appear in Log Analytics. What must you configure?",
    "A diagnostic setting on the storage account's blob service sending its logs to the workspace."
   ],
   [
    "Which is better for an alert that must fire within a minute of high CPU: metrics or logs?",
    "Metrics, which are near real time and lightweight."
   ],
   [
    "Where do you find who deleted a virtual network last week?",
    "In the activity log, which records control-plane operations with the caller."
   ]
  ]
 },
 {
  "t": "Querying logs with basic KQL (where, summarize, project, render)",
  "body": [
   "Kusto Query Language (KQL) is the read-only query language used by Log Analytics, Azure Monitor log alerts, Microsoft Sentinel and Azure Resource Graph. You open it in a workspace's Logs blade or a resource's Logs blade. A query starts with a table name and passes the data through a pipeline of operators separated by the pipe character `|`, each one transforming the result of the previous step. If you know a handful of operators, you can answer most exam questions and real troubleshooting needs.",
   "`where` filters rows. `project` chooses and renames columns. `extend` adds calculated columns. `sort by` (or `order by`) orders results, and `take` or `limit` returns a sample of rows. Time is always important: most tables have a `TimeGenerated` column, and `ago()` expresses relative time, so `where TimeGenerated > ago(1h)` keeps the last hour. Comparison operators include `==`, `!=`, `>`, `contains`, `has` and `in`. String comparisons with `==` are case sensitive; `=~` is case insensitive.",
   "`summarize` aggregates rows into groups, much like GROUP BY in SQL. Aggregation functions include `count()`, `avg()`, `max()`, `min()`, `sum()` and `dcount()` (distinct count), followed by `by` and the grouping columns. To build time series, group by `bin(TimeGenerated, 5m)`, which rounds timestamps into five-minute buckets. `render` turns the result into a chart, such as `timechart`, `barchart`, `piechart` or `columnchart`.",
   "```kusto\n// Computers that have not sent a heartbeat in 15 minutes\nHeartbeat\n| summarize LastSeen = max(TimeGenerated) by Computer\n| where LastSeen < ago(15m)\n\n// Average CPU per computer in 5-minute bins over the last day, as a chart\nPerf\n| where TimeGenerated > ago(1d)\n| where ObjectName == \"Processor\" and CounterName == \"% Processor Time\"\n| summarize AvgCPU = avg(CounterValue) by bin(TimeGenerated, 5m), Computer\n| render timechart\n\n// Who deleted resources in the last week\nAzureActivity\n| where TimeGenerated > ago(7d) and OperationNameValue endswith \"DELETE\"\n| project TimeGenerated, Caller, ResourceGroup, OperationNameValue\n| sort by TimeGenerated desc\n```",
   "Read each query from top to bottom. In the first, all heartbeat records are reduced to one row per computer with its latest time, then filtered to those older than 15 minutes: a classic 'which agents stopped reporting' query that can back a log alert. Note that the order of operators matters: filtering with `where` early makes queries faster, and a `project` that removes a column prevents later operators from using it.",
   "Common tables you will meet: `Heartbeat` (agent check-ins), `Perf` (performance counters), `Event` (Windows event logs), `Syslog` (Linux), `AzureActivity` (activity log), `AzureDiagnostics` and resource-specific tables such as `StorageBlobLogs` (resource logs), and `InsightsMetrics` (VM insights). In exam questions, look for which operator produces the requested shape: filtering is `where`, counting per group is `summarize count() by`, choosing columns is `project`, and a chart is `render`."
  ],
  "terms": [
   [
    "KQL",
    "Kusto Query Language, the read-only pipeline query language used in Log Analytics and Azure Monitor."
   ],
   [
    "where",
    "An operator that filters rows by a condition."
   ],
   [
    "summarize",
    "An operator that aggregates rows with functions such as count() or avg(), grouped by columns."
   ],
   [
    "project",
    "An operator that selects, renames or reorders the output columns."
   ],
   [
    "bin()",
    "A function that rounds values, typically timestamps, into fixed-size buckets for time series."
   ]
  ],
  "example": "After a weekend outage, an administrator needs to know which VMs stopped reporting and when. They run Heartbeat | where TimeGenerated > ago(3d) | summarize count() by bin(TimeGenerated, 1h), Computer | render timechart, and the chart shows two VMs whose heartbeats dropped to zero at 02:00 on Saturday, matching a failed host update.",
  "tip": "Map the question to the operator: filter = where, aggregate per group = summarize ... by, pick columns = project, chart = render. Time filters use ago(), and time series use bin().",
  "check": [
   [
    "Which operator would you use to count failed sign-ins per user?",
    "summarize count() by the user column, after a where that filters to failures."
   ],
   [
    "What does | project Computer, CounterValue do?",
    "Keeps only the Computer and CounterValue columns in the output."
   ],
   [
    "How do you turn a summarized time series into a line chart?",
    "Add | render timechart at the end of the query."
   ]
  ]
 },
 {
  "t": "Alert rules (metric, log search, activity log), action groups and alert processing rules",
  "body": [
   "Alerts in Azure Monitor tell you when something needs attention, and can start automatic responses. An alert rule has three parts: the scope (which resources it watches), the condition (what triggers it) and the actions (what happens when it fires, through action groups). Each rule also has a severity from 0 (critical) to 4 (verbose) and a name and description that appear in notifications.",
   "Metric alert rules evaluate a platform or custom metric at a regular frequency over a look-back window, for example 'average Percentage CPU greater than 85 over the last 5 minutes, checked every minute'. Thresholds can be static or dynamic, where machine learning learns the metric's normal pattern and alerts on deviations. One metric alert rule can monitor many resources of the same type in a region, such as all VMs in a subscription. Metric alerts are stateful: they fire once, then resolve automatically when the condition clears.",
   "Log search alert rules run a KQL query against a Log Analytics workspace or Application Insights on a schedule, for example every 5 minutes over the last 15 minutes, and fire when the result meets a condition, such as the number of rows being greater than zero or an aggregated value crossing a threshold. They suit conditions only visible in logs: a particular Windows event, a missing heartbeat, or a pattern across several resources. They have more delay and cost than metric alerts.",
   "Activity log alert rules fire on events in the subscription's activity log: administrative operations (for example, 'someone deleted a virtual network' or 'a role assignment was created'), service health events (Azure incidents and planned maintenance affecting your regions and services) and resource health events (a specific VM became unavailable). They are the way to be told about changes and platform issues rather than performance.",
   "An action group is a reusable list of notifications and actions, shared by many alert rules. Notifications include email, SMS, Azure mobile app push and voice calls, and email to Azure Resource Manager roles such as Owner. Actions include Azure Automation runbooks, Azure Functions, Logic Apps, webhooks, event hubs and IT service management (ITSM) connectors. Create action groups per team or response, such as 'ops-oncall', and attach them to rules.",
   "Alert processing rules modify fired alerts without editing the alert rules. You scope a processing rule to a subscription, resource group or resource and optional filters (severity, alert rule, monitor service), and choose either to suppress action groups, for example during a planned maintenance window on a schedule, or to add action groups to all matching alerts, for example sending every Sev0 alert in production to the on-call team. Suppression stops notifications, but the alerts still fire and are recorded, so you keep the history.",
   "In the portal, Monitor > Alerts shows fired alerts with their state; you can change a user response to Acknowledged or Closed as you work on them."
  ],
  "terms": [
   [
    "Metric alert",
    "An alert rule that evaluates a metric against a static or dynamic threshold at a regular frequency."
   ],
   [
    "Log search alert",
    "An alert rule that runs a KQL query on a schedule and fires when the results meet a condition."
   ],
   [
    "Activity log alert",
    "An alert rule that fires on administrative, service health or resource health events in the activity log."
   ],
   [
    "Action group",
    "A reusable set of notifications and automated actions triggered by alerts."
   ],
   [
    "Alert processing rule",
    "A rule that suppresses or adds action groups for fired alerts matching a scope and filters, optionally on a schedule."
   ]
  ],
  "example": "Operations wants a text message when any production VM's CPU stays above 90 percent, an email when anyone deletes a resource group, and no notifications during Saturday patching. The administrator creates a multi-resource metric alert and an activity log alert, attaches the ops-oncall action group to both, and adds an alert processing rule that suppresses action groups for the production subscription every Saturday from 01:00 to 05:00.",
  "tip": "Performance thresholds = metric alert; KQL condition = log search alert; 'someone deleted', service health or resource health = activity log alert. To silence notifications during maintenance without disabling rules, use an alert processing rule.",
  "check": [
   [
    "You must be notified when a virtual network is deleted. Which alert type?",
    "An activity log alert on the delete virtual network administrative operation."
   ],
   [
    "How can you stop alert emails during a planned maintenance window without editing 20 alert rules?",
    "Create an alert processing rule that suppresses action groups for that scope on a schedule."
   ],
   [
    "Where do you configure an SMS to the on-call engineer and a runbook that restarts a service?",
    "In an action group, which alert rules then reference."
   ]
  ]
 },
 {
  "t": "Azure Monitor insights: VM insights, storage and network insights, Azure Monitor Agent and data collection rules",
  "body": [
   "Insights are curated monitoring experiences in Azure Monitor for a particular kind of resource. They combine metrics, logs and workbooks into ready-made dashboards, so you do not have to design charts and queries yourself. You find them under Monitor > Insights, and many also appear on the resource's own Insights blade.",
   "VM insights monitors the performance and health of virtual machines and scale sets, both Azure VMs and servers connected through Azure Arc. The Performance view shows charts of CPU, memory, disk and network across all monitored machines, and helps find the busiest or most constrained ones. The Map view, which needs the Dependency agent in addition, shows processes on each VM and their network connections to other machines and services, useful for discovering dependencies before a migration. VM insights stores its data in a Log Analytics workspace, mostly in the `InsightsMetrics` table, and you enable it from the VM's Insights blade, which installs the agent and creates a data collection rule for you.",
   "Storage insights gives a unified view of capacity, transactions, availability and latency across your storage accounts, drawn from platform metrics, so it works without extra setup. It is quick to spot an account with rising errors or unexpected growth. Network insights shows the health and metrics of network resources, such as load balancers, gateways and public IPs, with a topology view, and it links to Network Watcher tools such as Connection Monitor.",
   "Guest-level data from inside a VM, such as Windows event logs, Linux syslog and OS performance counters, is collected by the Azure Monitor Agent (AMA). AMA is installed as a VM extension (and on Arc-enabled servers), uses a managed identity, and replaced the older Log Analytics agent, which has been retired. Unlike the old agent, AMA does not decide on its own what to collect or where to send it; that is defined in data collection rules.",
   "A data collection rule (DCR) is an Azure resource that describes what data to collect, how to transform it, and where to send it. For VMs, a DCR might collect the '% Processor Time' and 'Available MBytes' counters every 60 seconds plus Warning and Error events from the System and Application logs, and send them to a Log Analytics workspace (performance counters can also go to Azure Monitor Metrics). You associate the DCR with VMs through data collection rule associations. One VM can have several DCRs, and one DCR can apply to many VMs, so you might have a baseline DCR for all servers and an extra DCR for SQL servers. Transformations written in KQL can filter or modify data before it is stored, which reduces cost.",
   "To deploy at scale, use Azure Policy initiatives that install AMA and associate DCRs automatically. If data is missing, check the three links in the chain: the agent extension is installed and healthy, the VM is associated with the DCR, and the DCR's destination workspace is correct."
  ],
  "terms": [
   [
    "VM insights",
    "An Azure Monitor experience showing VM performance and, with the Dependency agent, process and connection maps."
   ],
   [
    "Azure Monitor Agent (AMA)",
    "The current agent that collects guest OS data from Azure VMs and Arc-enabled servers, configured by data collection rules."
   ],
   [
    "Data collection rule (DCR)",
    "A resource that defines which data to collect, optional transformations and the destinations."
   ],
   [
    "DCR association",
    "The link between a data collection rule and a machine or resource that tells the agent to apply the rule."
   ]
  ],
  "example": "An administrator must collect Windows System and Application errors from 200 servers into one workspace. They create a DCR with those event log sources and the workspace as destination, and assign a built-in policy initiative that installs the Azure Monitor Agent and associates the DCR with every Windows VM in the subscription, including future ones.",
  "tip": "AMA collects nothing until a data collection rule is associated with the machine. Map view in VM insights needs the Dependency agent. Storage insights uses platform metrics and needs no agent.",
  "check": [
   [
    "The Azure Monitor Agent is installed on a VM, but no event logs arrive in the workspace. What is likely missing?",
    "A data collection rule defining the event logs and workspace, associated with the VM."
   ],
   [
    "Which VM insights feature shows connections between processes and other servers, and what extra agent does it need?",
    "The Map feature, which needs the Dependency agent."
   ],
   [
    "Where do you configure which performance counters a VM sends and how often?",
    "In a data collection rule."
   ]
  ]
 },
 {
  "t": "Network Watcher and Connection Monitor",
  "body": [
   "Azure Network Watcher is the regional service that provides monitoring, diagnostic and logging tools for resources in Azure virtual networks, such as VMs, VPN gateways and application gateways. It is enabled automatically in each region when you create or update a VNet there, and appears in the portal as a resource called NetworkWatcher_<region> in a resource group named NetworkWatcherRG. It monitors the network path and configuration, not the application running on your VMs.",
   "Its tools fall into three groups. Monitoring: Topology, which draws the resources in a VNet and how they connect, and Connection Monitor, for continuous checks. Network diagnostic tools, used for one-off investigations: IP flow verify, NSG diagnostics, next hop, effective security rules, connection troubleshoot, packet capture (captures traffic to and from a VM into a file for analysis) and VPN troubleshoot (diagnoses a VPN gateway or connection). Traffic: flow logs, which record the IP traffic flowing through NSGs or virtual networks, and traffic analytics, which processes flow logs in a Log Analytics workspace to show traffic patterns, top talkers and unusual flows. VNet flow logs are the successor to the older NSG flow logs.",
   "Connection Monitor provides continuous, end-to-end monitoring of connectivity between endpoints. Where connection troubleshoot answers 'can I connect right now?', Connection Monitor answers 'has this connection been healthy all week, and how fast was it?'. It is the tool for tracking latency and packet loss between an application's tiers, between Azure and on-premises, or from Azure to an external endpoint such as a partner API.",
   "You build a connection monitor from test groups. Each test group has sources, such as Azure VMs or scale sets with the Network Watcher agent extension, or on-premises and Arc-enabled machines with the Azure Monitor Agent; destinations, such as Azure VMs, IP addresses, URLs or fully qualified domain names; and test configurations. A test configuration sets the protocol (TCP, HTTP or ICMP), port, test frequency and success thresholds, for example 'checks failed less than 5 percent and round-trip time below 100 milliseconds'. Connection Monitor runs the tests continuously and stores results in a Log Analytics workspace.",
   "Results appear in the Connection Monitor dashboard, with the state of each source and destination pair, charts of round-trip time and checks failed, and a hop-by-hop topology showing where along the path a problem occurs, such as a dropped packet at a firewall or high latency at an ISP hop. Connection Monitor emits metrics, so you can create metric alert rules on them, for example to alert when checks failed exceeds a threshold, and route the alerts through action groups.",
   "For exam scenarios: one-time 'why can't this VM connect' questions point to IP flow verify, next hop or connection troubleshoot; ongoing monitoring of reachability and latency points to Connection Monitor; analysis of who talked to whom points to flow logs and traffic analytics; a failed site-to-site tunnel points to VPN troubleshoot."
  ],
  "terms": [
   [
    "Network Watcher",
    "A regional Azure service providing network monitoring, diagnostic and logging tools for resources in VNets."
   ],
   [
    "Connection Monitor",
    "A Network Watcher feature that continuously tests connectivity and latency between sources and destinations."
   ],
   [
    "Test group",
    "A Connection Monitor component combining sources, destinations and test configurations."
   ],
   [
    "Flow logs",
    "Records of IP traffic through NSGs or virtual networks, used for auditing and traffic analytics."
   ],
   [
    "Packet capture",
    "A Network Watcher tool that records packets to and from a VM for detailed analysis."
   ]
  ],
  "example": "Users in a branch office complain that an internal web app is slow every afternoon. The administrator sets up Connection Monitor with an Arc-enabled branch server as source and the app's load balancer as destination, testing HTTP every 30 seconds. After two days the dashboard shows round-trip time spiking at 15:00 at the on-premises edge hop, pointing to a saturated branch internet link.",
  "tip": "Connection Monitor is for continuous monitoring with history and alerts; connection troubleshoot is a one-off test. Azure VM sources need the Network Watcher agent extension, and results are stored in Log Analytics.",
  "check": [
   [
    "You need to track latency between two VMs over several weeks and alert when it rises. Which tool?",
    "Connection Monitor, with a metric alert on its round-trip time or checks-failed metric."
   ],
   [
    "Which Network Watcher tool records the packets a VM sends and receives for later analysis?",
    "Packet capture."
   ],
   [
    "Which feature shows the top talkers and traffic patterns across your VNets?",
    "Traffic analytics, built on flow logs in a Log Analytics workspace."
   ]
  ]
 },
 {
  "t": "Recovery Services vault vs Backup vault and what each protects",
  "body": [
   "Azure Backup protects data by taking backups on a schedule and storing them in a vault, a storage entity managed by Azure that holds recovery points and backup policies. Azure has two kinds of vault, and each supports a different set of workloads. Picking the right vault for a data source is a classic exam question, because you cannot back up, for example, an Azure VM into a Backup vault.",
   "A Recovery Services vault is the original vault type. It protects: Azure virtual machines (Windows and Linux, the whole VM including all disks); SQL Server and SAP HANA databases running inside Azure VMs; Azure Files shares; on-premises files, folders and system state through the MARS (Microsoft Azure Recovery Services) agent; and on-premises workloads through Microsoft Azure Backup Server (MABS) or System Center Data Protection Manager. A Recovery Services vault is also where Azure Site Recovery replication is configured, so the same vault type serves both backup and disaster recovery.",
   "A Backup vault is the newer vault type, used by newer data sources. It protects Azure managed disks (Azure Disk Backup, using incremental snapshots), Azure Blobs (operational backup and vaulted backup), Azure Database for PostgreSQL and Azure Kubernetes Service clusters, among others. If a question asks where to back up individual managed disks on a schedule or blob data, the answer is a Backup vault.",
   "Some rules apply to both. The vault should be in the same region as the resources it protects (for Azure VM backup it must be). You choose the vault's backup storage redundancy, locally redundant, zone-redundant or geo-redundant, and you should set it before protecting the first item, because it cannot be changed after items are protected. Geo-redundant storage is needed if you want cross-region restore. Both vault types support soft delete, immutability and RBAC roles such as Backup Contributor, Backup Operator and Backup Reader.",
   "You manage everything from one place: the Business Continuity Center in the portal (the successor to Backup center) gives a single view of protected items, jobs, policies and vaults across both vault types, subscriptions and regions. You can also configure backup directly from a resource, for example on a VM's Backup blade, where you pick or create a vault and a policy.",
   "A simple memory aid: Recovery Services vault for 'servers and what runs in them', meaning VMs, databases in VMs, file shares, on-premises machines and Site Recovery; Backup vault for 'newer PaaS and storage data sources' such as disks, blobs, PostgreSQL and AKS. When Microsoft adds a new data source, check which vault type it uses rather than assuming."
  ],
  "terms": [
   [
    "Recovery Services vault",
    "A vault that protects Azure VMs, SQL and SAP HANA in VMs, Azure Files, on-premises data via MARS or MABS, and hosts Site Recovery."
   ],
   [
    "Backup vault",
    "A newer vault type that protects data sources such as managed disks, blobs, Azure Database for PostgreSQL and AKS."
   ],
   [
    "MARS agent",
    "The Microsoft Azure Recovery Services agent that backs up files, folders and system state from Windows machines to a Recovery Services vault."
   ],
   [
    "Backup storage redundancy",
    "The LRS, ZRS or GRS setting of a vault's storage, which should be chosen before items are protected."
   ]
  ],
  "example": "An administrator must protect three things: production VMs, a set of managed disks attached to a clustered application, and a blob container of contracts. They create a geo-redundant Recovery Services vault for the VMs, and a Backup vault in the same region for Azure Disk Backup of the managed disks and vaulted backup of the blob container, and monitor all of it from the Business Continuity Center.",
  "tip": "Azure VMs, Azure Files, SQL in VMs, MARS and Site Recovery = Recovery Services vault. Managed disks, blobs, PostgreSQL and AKS = Backup vault. Set storage redundancy before the first item is protected.",
  "check": [
   [
    "Which vault type do you need to back up an Azure VM?",
    "A Recovery Services vault, in the same region as the VM."
   ],
   [
    "Which vault type supports Azure Disk Backup of individual managed disks?",
    "A Backup vault."
   ],
   [
    "You want to back up files from an on-premises Windows server directly to Azure. What do you use?",
    "The MARS agent on the server, backing up to a Recovery Services vault."
   ]
  ]
 },
 {
  "t": "Backup policies (standard and enhanced), on-demand backup, soft delete and cross-region restore",
  "body": [
   "A backup policy defines when backups run and how long recovery points are kept. You attach one policy to many protected items, so changing the policy updates them all. The default policy for Azure VMs takes one backup a day and keeps it for 30 days, but you will normally create your own.",
   "For Azure VMs there are two policy types. The standard policy allows one scheduled backup per day (or per week) at a set time, with retention rules for daily, weekly, monthly and yearly recovery points, for example keep dailies for 30 days, Sunday weeklies for 12 weeks and first-of-month monthlies for 12 months. The enhanced policy allows multiple backups per day, such as every 4 hours, for workloads needing a lower recovery point objective (RPO), and it is required for some VMs, including Trusted Launch VMs and VMs with Premium SSD v2 or Ultra disks. Both policies keep recent recovery points as snapshots for a configurable period (instant restore), so restores from recent points are fast, while older points come from the vault.",
   "An on-demand backup ('Backup now') takes an extra backup outside the schedule, for example before an upgrade. You specify how long to keep it (a retain-until date), separately from the policy's retention rules. The first backup of a newly protected VM is often run on demand so you have protection straight away.",
   "Soft delete protects backups from accidental or malicious deletion. When backup data is deleted, for example by stopping protection and choosing to delete data, it is kept in a soft-deleted state for 14 days by default at no charge for that period, and can be undeleted and protection resumed. Enhanced soft delete lets you choose a longer retention period and make soft delete always-on so it cannot be turned off, which defends against ransomware operators who compromise an admin account. Related protections include immutable vaults, which prevent operations that could lose recovery points, and multi-user authorization with Resource Guard, which requires a second person's approval for critical operations.",
   "Cross-region restore (CRR) lets you restore Azure VMs (and some other data sources) in the Azure paired secondary region using backup data replicated there. It needs a vault with geo-redundant storage and the cross-region restore setting enabled. You can use it at any time, for a real regional outage or a drill, without waiting for Microsoft to declare a disaster. Restores in the secondary region use recovery points that were replicated there, which lag slightly behind the primary.",
   "In a lab, protect a small VM with a custom policy, run an on-demand backup, then stop protection with delete data and observe the item appear as soft-deleted; undelete it and resume protection."
  ],
  "terms": [
   [
    "Backup policy",
    "A schedule and set of retention rules applied to protected items in a vault."
   ],
   [
    "Enhanced policy",
    "A VM backup policy type that supports multiple backups per day and is required for some VM types, such as Trusted Launch."
   ],
   [
    "On-demand backup",
    "An ad hoc backup outside the schedule, retained until a date you choose."
   ],
   [
    "Soft delete",
    "Retention of deleted backup data, 14 days by default, so it can be recovered."
   ],
   [
    "Cross-region restore",
    "Restoring from backup data replicated to the paired secondary region, available on GRS vaults with the feature enabled."
   ]
  ],
  "example": "A finance app needs backups every 4 hours on weekdays, dailies kept for 30 days and year-end points kept for 7 years, and must survive a regional outage. The administrator uses a geo-redundant Recovery Services vault with cross-region restore enabled, an enhanced policy with a 4-hour schedule and yearly retention, enables always-on enhanced soft delete, and takes an on-demand backup before each quarterly upgrade.",
  "tip": "More than one backup a day, Trusted Launch VMs or Premium SSD v2/Ultra disks need the enhanced policy. Cross-region restore requires GRS plus the CRR setting. Soft-deleted backups are kept 14 days by default.",
  "check": [
   [
    "A VM must be backed up every 4 hours. Which policy type?",
    "An enhanced backup policy."
   ],
   [
    "What must be true of a vault to restore a VM in the paired region?",
    "The vault must use geo-redundant storage and have cross-region restore enabled."
   ],
   [
    "An administrator stopped protection and deleted backup data by mistake yesterday. Can it be recovered?",
    "Yes, if soft delete is enabled (it is by default): undelete the item within the retention period, 14 days by default, and resume protection."
   ]
  ]
 },
 {
  "t": "Restoring VMs, disks and individual files",
  "body": [
   "A backup is only as good as your ability to restore it. Azure Backup offers several restore types for Azure VMs, and each fits a different situation. You start a restore from the vault's backup item or the VM's Backup blade, choose a recovery point (crash-consistent, file-system consistent or application-consistent, with the most recent ones often available as instant restore snapshots) and then choose a restore type.",
   "Create new virtual machine builds a new VM from the recovery point in a region, virtual network and subnet you choose, with a new name. It is the quickest way to get a working machine back with basic settings. Because it offers limited customization, it is not suited to every configuration.",
   "Restore disks creates managed disks from the recovery point in a target resource group, using a staging storage account, and also produces a template you can customize to create the VM. Use it when you need to change settings the quick restore cannot handle, such as a specific size, availability set or extensions, or when you only want the disks, for example to attach one to another VM and copy data off it.",
   "Replace existing restores the disks over those of the existing VM, keeping the VM's configuration such as its name and network settings. The VM must still exist, and Azure takes a snapshot of the current disks before replacing them so you can go back. This is the natural choice when a VM is intact but its data is corrupted, for example after a failed update.",
   "Cross-region restore performs the same operations in the paired secondary region, for vaults configured with geo-redundant storage and cross-region restore. Restoring a VM is also how you recover to a point in time before a ransomware infection, which is why soft delete and immutability matter.",
   "Often you do not need the whole VM, just a few files. File recovery lets you mount a recovery point as local drives: you select File Recovery, pick the recovery point, and download a script (an executable for Windows, a Python script for Linux). Running it on a machine, the original VM or another one with a compatible OS, connects the recovery point's disks as volumes over iSCSI (Internet Small Computer Systems Interface). You browse them, copy the files you need, then unmount the disks from the portal. The connection is only kept for a limited time, and you should unmount when finished.",
   "Other data sources restore differently. Azure Disk Backup in a Backup vault restores a snapshot as a new managed disk, which you attach to a VM. Azure Files backups can restore the whole share or individual files and folders, to the original location (overwriting or skipping conflicts) or to an alternate share. SQL Server in a VM can be restored to a point in time using log backups."
  ],
  "terms": [
   [
    "Create new virtual machine",
    "A restore type that builds a new VM from a recovery point with basic settings."
   ],
   [
    "Restore disks",
    "A restore type that creates managed disks and a template, allowing a customized VM or data recovery."
   ],
   [
    "Replace existing",
    "A restore type that replaces the disks of an existing VM after snapshotting its current disks."
   ],
   [
    "File recovery",
    "Mounting a recovery point's disks on a machine with a downloaded script to copy individual files."
   ]
  ],
  "example": "A user deletes a folder of reports on a file server VM, and a separate update corrupts an application VM. For the file server, the administrator uses File Recovery, runs the script on the VM, copies the folder back from the mounted recovery volume and unmounts. For the application VM, they use Replace existing with last night's recovery point, keeping the VM's name, IP and configuration.",
  "tip": "Need a few files: File Recovery script. VM exists but data is bad: Replace existing. Need custom VM settings or only the disks: Restore disks. Quick new VM: Create new. Disk backups in a Backup vault restore as new disks.",
  "check": [
   [
    "A VM's OS is corrupted but you want to keep the same VM resource and network settings. Which restore type?",
    "Replace existing."
   ],
   [
    "You need to restore a VM into an availability set with a specific size. Which restore type gives you that control?",
    "Restore disks, then create the VM from the disks or the generated template."
   ],
   [
    "How do you recover a single deleted file from an Azure VM backup?",
    "Use File Recovery: download and run the script to mount the recovery point as drives, copy the file, then unmount."
   ]
  ]
 },
 {
  "t": "Azure Site Recovery: replication to a secondary region, test failover, failover, commit and failback",
  "body": [
   "Backup protects data so you can restore it later; disaster recovery keeps whole workloads running when a region or site fails. Azure Site Recovery (ASR) continuously replicates VMs to a secondary location so you can fail over to it with a recovery point objective (RPO, how much data you can lose) of minutes and a recovery time objective (RTO, how long recovery takes) that depends mostly on how fast VMs start. ASR supports Azure VMs replicating to another Azure region, and on-premises Hyper-V, VMware and physical servers replicating to Azure.",
   "To protect an Azure VM, open its Disaster recovery blade or a Recovery Services vault and enable replication. The vault must be in a different region from the source VMs, typically the target region. You choose the target region, resource group, virtual network, and the replication policy, which sets how long recovery points are retained and how often application-consistent snapshots are taken. Azure installs the Mobility service extension on the VM, uses a cache storage account in the source region to stage changes, and creates replica managed disks in the target region. Initial replication copies the full disks; after that only changes are sent. The VM shows as Protected when replication is healthy.",
   "A test failover is the safe way to prove it works. It creates VMs in the target region from a chosen recovery point, in a virtual network you choose, which should be isolated from production so the test copies do not conflict with the running systems. Replication continues and production is unaffected. After checking the application, you run Cleanup test failover to delete the test VMs. Regular test failovers are how you prove your DR plan to auditors.",
   "A failover is the real thing. Planned failovers are for expected events and can avoid data loss by shutting down the source first; unplanned failovers are for outages. You choose a recovery point: latest (lowest RPO, processes all pending data first, slower), latest processed (fastest RTO), latest application-consistent, or a custom point. ASR creates the VMs in the target region. Recovery plans let you fail over many VMs in order, such as databases first, then application servers, then web servers, with scripts or Automation runbooks between groups.",
   "After failover, the VMs keep a list of recovery points for a while, so you can switch to a different point with Change recovery point. When you are satisfied, you Commit the failover, which finalizes it and removes the other recovery points. Commit is what makes the failover permanent.",
   "The VMs now run in the secondary region without protection. Re-protect reverses replication so the secondary VMs replicate back to the primary region. When the primary region is healthy, you fail over again from secondary to primary (failback), commit, and re-protect once more to restore the original direction. Remember the cycle: enable replication, test failover and cleanup, failover, commit, re-protect, failback, re-protect."
  ],
  "terms": [
   [
    "Azure Site Recovery",
    "A disaster recovery service that continuously replicates VMs to a secondary location and orchestrates failover."
   ],
   [
    "Test failover",
    "A failover drill that creates VMs in an isolated network without affecting replication or production."
   ],
   [
    "Commit",
    "The step that finalizes a failover and discards the other recovery points."
   ],
   [
    "Re-protect",
    "Reversing replication after failover so the running VMs replicate back to the original region."
   ],
   [
    "Recovery plan",
    "An ordered grouping of VMs, with optional scripts, that fails over together."
   ]
  ],
  "example": "A company's order system runs in East US. The administrator enables ASR replication to West US using a vault in West US, builds a recovery plan that starts the database VM before the app and web VMs, and runs a test failover into an isolated VNet every quarter. During a real East US outage they run an unplanned failover to the latest processed point, commit it, and later re-protect and fail back.",
  "tip": "Test failover uses an isolated network and does not affect replication; always clean it up. After failover you commit, then re-protect before failing back. The vault must be in a different region from the source VMs.",
  "check": [
   [
    "How do you verify a DR plan without impacting production or replication?",
    "Run a test failover into an isolated virtual network, then clean up the test failover."
   ],
   [
    "After failing over to the secondary region, what must you do before you can fail back?",
    "Commit the failover, then re-protect so the VMs replicate back to the primary region."
   ],
   [
    "Which recovery point option gives the fastest failover?",
    "Latest processed, because it uses a point already processed and does not wait for pending data."
   ]
  ]
 },
 {
  "t": "Backup reports and alerts",
  "body": [
   "Taking backups is not enough; you must know they are succeeding, how much they cost and when something goes wrong. Azure Backup provides reports for trends and governance and alerts for events that need action. Both are managed through Azure Monitor and surfaced in the Business Continuity Center (formerly Backup center).",
   "Backup reports are built on Azure Monitor workbooks and read data from a Log Analytics workspace. To use them, you first configure diagnostic settings on each Recovery Services vault and Backup vault to send backup data to a workspace, using the resource-specific tables such as `CoreAzureBackup`, `AddonAzureBackupJobs`, `AddonAzureBackupPolicy` and `AddonAzureBackupStorage`. An Azure Policy definition can configure these diagnostic settings for all vaults in a scope automatically. After data starts flowing, which can take several hours, open Backup reports and select the workspace or workspaces, even across subscriptions and tenants.",
   "The reports have tabs for different questions. Summary gives a high-level view of backup items, jobs and storage. Backup Items lists protected items and their storage consumption. Usage shows billed instances and storage trends, useful for chargeback. Jobs shows success and failure trends and failure reasons. Policies lists policies and the items using them. Optimize finds savings, such as inactive items still being billed, retention that seems too long, or databases that could use cheaper backup options. Policy adherence shows which items had a successful backup every day. You can filter by time range, subscription, vault and workload type, and export results.",
   "Backup alerts use Azure Monitor alerts. Built-in alerts are generated automatically for important scenarios, such as backup or restore job failures and security-relevant events like deleting backup data, disabling soft delete or stopping protection with data deletion. They appear in the Business Continuity Center and in Monitor > Alerts. By default these alerts are recorded but no one is notified; to get emails or trigger automation, create an alert processing rule that routes backup alerts to an action group, or configure notifications in the vault's alert settings. The older classic backup alerts have been replaced by these Azure Monitor alerts.",
   "For custom conditions, use Azure Monitor capabilities directly: metric alerts on the backup health metrics exposed by vaults, or log search alerts that run KQL against the backup tables, for example any failed job for a critical VM in the last day:",
   "```kusto\nAddonAzureBackupJobs\n| where TimeGenerated > ago(1d)\n| where JobOperation == \"Backup\" and JobStatus == \"Failed\"\n| project TimeGenerated, BackupItemUniqueId, JobFailureCode\n```",
   "Put it together: diagnostic settings to a workspace power reports and custom log alerts; built-in alerts plus an alert processing rule and action group notify people; and the Business Continuity Center gives one place to check jobs, alerts and protection status across all vaults."
  ],
  "terms": [
   [
    "Backup reports",
    "Azure Monitor workbook-based reports on backup items, jobs, usage, policies and optimization, fed from Log Analytics."
   ],
   [
    "Resource-specific tables",
    "Dedicated Log Analytics tables such as AddonAzureBackupJobs used by backup diagnostic settings and reports."
   ],
   [
    "Built-in backup alerts",
    "Azure Monitor alerts automatically generated for backup job failures and critical security operations."
   ],
   [
    "Business Continuity Center",
    "The portal experience for managing and monitoring backup and disaster recovery across vaults, subscriptions and regions."
   ]
  ],
  "example": "A manager asks for a monthly view of backup success rates and storage per department, and operations wants an email whenever a production backup fails. The administrator assigns a policy that adds diagnostic settings to every vault, pointing to a central workspace, uses the Jobs and Usage tabs of Backup reports for the manager, and creates an alert processing rule that sends backup job failure alerts to the ops action group.",
  "tip": "Backup reports need vault diagnostic settings sending to a Log Analytics workspace; no workspace, no reports. Built-in backup alerts do not notify anyone until you connect an action group, usually through an alert processing rule.",
  "check": [
   [
    "Backup reports show no data. What is the most likely cause?",
    "The vaults have no diagnostic settings sending backup data to a Log Analytics workspace (or data has not arrived yet)."
   ],
   [
    "Built-in backup alerts appear in the portal, but nobody receives emails. What should you add?",
    "An alert processing rule (or vault notification settings) that routes the alerts to an action group with email notifications."
   ],
   [
    "Which report tab helps find backups that are costing money without adding value?",
    "Optimize, which highlights inactive resources and retention or policy savings."
   ]
  ]
 }
]);
